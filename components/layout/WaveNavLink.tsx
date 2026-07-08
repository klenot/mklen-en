"use client";

import { useCallback } from "react";
import type { NavItem } from "@/components/layout/navItems";
import { navWaveShift } from "@/components/layout/navWave";
import { scrollToSection } from "@/lib/scrollToSection";

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
      scrollToSection(item.href.replace("#", ""));
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
