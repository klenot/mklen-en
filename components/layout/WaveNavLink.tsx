"use client";

import { useState, useCallback } from "react";
import type { NavItem } from "@/components/layout/navItems";

const MAX_LIFT = 6;
const FALLOFF = 0.55;

export default function WaveNavLink({ item }: { item: NavItem }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const letters = Array.from(item.label);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      const id = item.href.replace("#", "");

      // Contact is fixed-positioned — scroll to bottom to reveal it
      if (id === "contact") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        return;
      }

      const target = document.getElementById(id);
      if (!target) return;

      // Elements inside the sticky 2nd panel (projects, blog) report their
      // stuck visual position via getBoundingClientRect — not useful for scroll.
      // Scroll to where the first panel ends (revealing the 2nd panel) plus
      // the target's offset within the sticky container.
      const stickyParent = target.closest<HTMLElement>(
        '[class*="sticky"]'
      );
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
    [item.href]
  );

  return (
    <a
      href={item.href}
      onClick={handleClick}
      onMouseLeave={() => setHovered(null)}
      className="font-mono text-xs font-medium text-black w-fit px-4"
    >
      {letters.map((char, i) => {
        const lift =
          hovered === null
            ? 0
            : MAX_LIFT * Math.pow(FALLOFF, Math.abs(i - hovered));
        return (
          <span
            key={i}
            onMouseEnter={() => setHovered(i)}
            style={{
              display: "inline-block",
              transform: `translateY(-${lift}px)`,
              transition: "transform 150ms ease-out",
            }}
          >
            {char}
          </span>
        );
      })}
    </a>
  );
}
