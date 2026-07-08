"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/mixpanel";
import { useNavigatingLink } from "@/hooks/useNavigatingLink";

const MAX_DESC = 150;

function trim(text: string, max: number = MAX_DESC) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

export default function PostItem({
  slug,
  title,
  description,
  category,
  date,
  lift = 0,
  shadow = "none",
  delay = 0,
  source = "unknown",
  onHoverStart,
  onHoverEnd,
}: {
  slug: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  date: string;
  lift?: number;
  shadow?: string;
  delay?: number;
  source?: "homepage" | "blog_index" | "unknown";
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  const href = `/blog/${slug}`;
  const { isPending, navigate, prefetch } = useNavigatingLink(href);

  return (
    <li
      onMouseEnter={() => {
        onHoverStart?.();
        prefetch();
      }}
      onMouseLeave={onHoverEnd}
      style={{
        transform: `translateY(-${lift}px)`,
        boxShadow: shadow,
        transitionDelay: `${delay}ms`,
      }}
      className="relative transition-[transform,box-shadow] duration-500 ease-out will-change-transform"
    >
      <Link
        href={href}
        prefetch
        onClick={(e) => {
          trackEvent("blog_post_clicked", {
            slug,
            title,
            category,
            source,
          });
          navigate(e);
        }}
        aria-busy={isPending}
        className={`group flex items-start gap-4 bg-white py-3 pr-4 ${
          isPending ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <div className="flex min-w-0 flex-1 flex-col wrap-break-words">
          <h3 className="font-mono text-base font-medium text-black transition-[font-weight] duration-300 ease-out group-hover:font-bold">
            {title}
          </h3>
          <p className="font-mono text-sm font-light text-black/60">
            {trim(description)}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-between self-stretch pl-2 text-right">
          <span className="rounded-full border border-black/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-black/70">
            {category}
          </span>
          <time className="font-mono text-[10px] font-light text-black/40">
            {date}
          </time>
        </div>
      </Link>
      {isPending ? (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-black/40">
          loading…
        </span>
      ) : null}
    </li>
  );
}
