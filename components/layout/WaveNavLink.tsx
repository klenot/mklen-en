"use client";

import { useState } from "react";
import type { NavItem } from "@/components/layout/navItems";

const MAX_LIFT = 6;
const FALLOFF = 0.55;

export default function WaveNavLink({ item }: { item: NavItem }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const letters = Array.from(item.label);

  return (
    <a
      href={item.href}
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
