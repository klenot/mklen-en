"use client";

import { useCallback } from "react";
import type { NavItem } from "@/components/layout/navItems";

const MAX_LIFT = 12;
const FALLOFF = 0.6;

interface WaveNavLinkProps {
  item: NavItem;
  globalOffset: number;
  hoveredGlobal: number | null;
  onLetterHover: (localIndex: number | null) => void;
}

export default function WaveNavLink({
  item,
  globalOffset,
  hoveredGlobal,
  onLetterHover,
}: WaveNavLinkProps) {
  const letters = Array.from(item.label);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      const id = item.href.replace("#", "");

      if (id === "contact") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        return;
      }

      const target = document.getElementById(id);
      if (!target) return;

      const stickyParent = target.closest<HTMLElement>('[class*="sticky"]');
      if (stickyParent) {
        const firstPanel = document.getElementById("1st-panel");
        if (firstPanel) {
          const revealPoint = firstPanel.offsetHeight;
          const offsetInPanel = target.offsetTop - stickyParent.offsetTop;
          window.scrollTo({
            top: revealPoint + offsetInPanel,
            behavior: "smooth",
          });
          return;
        }
      }

      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [item.href],
  );

  return (
    <a
      href={item.href}
      onClick={handleClick}
      onMouseLeave={() => onLetterHover(null)}
      className="font-mono text-xs font-regular text-black w-fit px-4 cursor-pointer flex flex-col items-center"
    >
      {letters.map((char, i) => {
        const globalIndex = globalOffset + i;
        const shift =
          hoveredGlobal === null
            ? 0
            : MAX_LIFT * Math.pow(FALLOFF, Math.abs(globalIndex - hoveredGlobal));
        return (
          <span
            key={i}
            onMouseEnter={() => onLetterHover(i)}
            style={{
              display: "block",
              transform: `translateX(${shift}px)`,
              transition: "transform 150ms ease-out",
              lineHeight: 1.1,
            }}
          >
            {char}
          </span>
        );
      })}
    </a>
  );
}
