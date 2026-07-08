"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { BlogHeading } from "@/lib/blog-headings";

type TocHeading = Pick<BlogHeading, "id" | "text">;

type Props = {
  headings: TocHeading[];
};

const EMPTY_HEADINGS: TocHeading[] = [];
const EMPTY_POSITIONS: (number | null)[] = [];

function discoverHeadings(): TocHeading[] {
  const root = document.querySelector(".blog-content");
  if (!root) return EMPTY_HEADINGS;

  return Array.from(root.querySelectorAll<HTMLElement>("h1, h2, h3"))
    .map((el, index) => {
      if (!el.id) el.id = `heading-${index}`;
      return { id: el.id, text: el.textContent?.trim() ?? "" };
    })
    .filter((h) => h.text.length > 0);
}

function discoverHeadingsCached(): TocHeading[] {
  const found = discoverHeadings();
  return found.length === 0 ? EMPTY_HEADINGS : found;
}

function headingsEqual(a: TocHeading[], b: TocHeading[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((h, i) => h.id === b[i].id && h.text === b[i].text);
}

function positionsEqual(a: (number | null)[], b: (number | null)[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}

function compactFallbackPosition(index: number, count: number): number {
  if (count <= 1) return 0.5;
  const span = Math.min(0.35, (count - 1) * 0.04);
  const start = 0.5 - span / 2;
  return start + (index / (count - 1)) * span;
}

function measurePositions(headings: TocHeading[]): (number | null)[] {
  const scrollRange = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight,
  );

  return headings.map(({ id }) => {
    const el = document.getElementById(id);
    if (!el) return null;
    return Math.min(1, Math.max(0, el.offsetTop / scrollRange));
  });
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function useDiscoveredHeadings(enabled: boolean) {
  const cache = useRef<TocHeading[]>(EMPTY_HEADINGS);

  return useSyncExternalStore(
    (onStoreChange) => {
      if (!enabled) return () => {};

      window.addEventListener("resize", onStoreChange);
      window.addEventListener("load", onStoreChange, true);
      const t = window.setTimeout(onStoreChange, 100);

      const root = document.querySelector(".blog-content");
      const ro = root ? new ResizeObserver(onStoreChange) : null;
      if (root && ro) ro.observe(root);

      return () => {
        window.clearTimeout(t);
        window.removeEventListener("resize", onStoreChange);
        window.removeEventListener("load", onStoreChange, true);
        ro?.disconnect();
      };
    },
    () => {
      if (!enabled) return EMPTY_HEADINGS;
      const next = discoverHeadingsCached();
      if (headingsEqual(cache.current, next)) return cache.current;
      cache.current = next;
      return next;
    },
    () => EMPTY_HEADINGS,
  );
}

function useHeadingPositions(headings: TocHeading[]) {
  const cache = useRef<(number | null)[]>(EMPTY_POSITIONS);
  const serverCache = useRef<(number | null)[]>(EMPTY_POSITIONS);

  return useSyncExternalStore(
    (onStoreChange) => {
      if (headings.length === 0) return () => {};

      window.addEventListener("resize", onStoreChange);
      window.addEventListener("load", onStoreChange, true);
      const t = window.setTimeout(onStoreChange, 100);
      const ro = new ResizeObserver(onStoreChange);
      ro.observe(document.documentElement);

      return () => {
        window.clearTimeout(t);
        window.removeEventListener("resize", onStoreChange);
        window.removeEventListener("load", onStoreChange, true);
        ro.disconnect();
      };
    },
    () => {
      if (headings.length === 0) return EMPTY_POSITIONS;
      const next = measurePositions(headings);
      if (positionsEqual(cache.current, next)) return cache.current;
      cache.current = next;
      return next;
    },
    () => {
      if (headings.length === 0) return EMPTY_POSITIONS;
      if (serverCache.current.length !== headings.length) {
        serverCache.current = headings.map(() => null);
      }
      return serverCache.current;
    },
  );
}

export default function BlogTableOfContents({ headings: initialHeadings }: Props) {
  const isClient = useIsClient();
  const discoveredHeadings = useDiscoveredHeadings(initialHeadings.length === 0);
  const headings =
    initialHeadings.length > 0 ? initialHeadings : discoveredHeadings;
  const positions = useHeadingPositions(headings);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (!isClient || headings.length === 0) return null;

  const rail = (
    <nav
      aria-label="Table of contents"
      className="pointer-events-none fixed inset-y-0 left-0 z-50 w-[min(32rem,calc(100vw-3rem))] py-28 max-md:hidden"
    >
      <div className="relative h-full">
        {headings.map((heading, i) => {
          const top =
            (positions[i] ?? compactFallbackPosition(i, headings.length)) * 100;

          return (
            <button
              key={heading.id}
              type="button"
              onClick={() => scrollTo(heading.id)}
              style={{ top: `${top}%` }}
              className="group pointer-events-auto absolute left-0 flex -translate-y-1/2 cursor-pointer items-center pl-5 text-left"
              aria-label={`Jump to ${heading.text}`}
            >
              <span className="block h-0.5 w-4 shrink-0 bg-black/10 transition-all duration-200 group-hover:w-6 group-hover:bg-black/40" />
              <span className="ml-3 whitespace-nowrap rounded-sm bg-white px-2 py-1 font-mono text-[11px] text-black/90 opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
                {heading.text}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );

  return createPortal(rail, document.body);
}
