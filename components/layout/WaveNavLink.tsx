"use client";

import { useCallback } from "react";
import type { NavItem } from "@/components/layout/navItems";
import { navWaveShift } from "@/components/layout/navWave";

interface WaveNavLinkProps {
  item: NavItem;
  globalOffset: number;
  hoveredGlobal: number | null;
  registerLetterRef: (globalIndex: number, el: HTMLSpanElement | null) => void;
}

export default function WaveNavLink({
  item,
  globalOffset,
  hoveredGlobal,
  registerLetterRef,
}: WaveNavLinkProps) {
  const letters = Array.from(item.label);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (item.href.startsWith("http")) return;

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

      const firstPanel = document.getElementById("1st-panel");

      if (firstPanel?.contains(target)) {
        const stickyParent = target.closest<HTMLElement>('[class*="sticky"]');

        // Scroll-driven sticky sections (e.g. reviews) live inside the target.
        if (stickyParent && target.contains(stickyParent)) {
          const revealPoint = firstPanel.offsetHeight;
          const offsetInPanel = target.offsetTop - stickyParent.offsetTop;
          window.scrollTo({
            top: revealPoint + offsetInPanel,
            behavior: "smooth",
          });
          return;
        }

        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }

      if (firstPanel) {
        const stickyParent = target.closest<HTMLElement>('[class*="sticky"]');
        const offsetInSticky = stickyParent
          ? target.getBoundingClientRect().top -
            stickyParent.getBoundingClientRect().top
          : 0;

        window.scrollTo({
          top: firstPanel.offsetHeight + offsetInSticky,
          behavior: "smooth",
        });
        return;
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
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="font-mono text-xs font-regular text-black w-fit cursor-pointer inline-flex"
    >
      {letters.map((char, i) => {
        const globalIndex = globalOffset + i;
        const shift = navWaveShift(globalIndex, hoveredGlobal);
        return (
          <span
            key={i}
            ref={(el) => registerLetterRef(globalIndex, el)}
            style={{
              display: "inline-block",
              transform: `translateY(-${shift}px)`,
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
