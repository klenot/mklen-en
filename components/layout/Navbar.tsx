"use client";

import { useCallback, useRef, useState } from "react";
import { NAV_ITEMS } from "@/components/layout/navItems";
import { navWaveHoveredGlobal } from "@/components/layout/navWave";
import WaveNavLink from "@/components/layout/WaveNavLink";
import ViewToggle from "@/components/layout/ViewToggle";

export default function Navbar() {
  const [hoveredGlobal, setHoveredGlobal] = useState<number | null>(null);
  const letterRefs = useRef<Map<number, HTMLSpanElement>>(new Map());

  let offset = 0;
  const offsets = NAV_ITEMS.map((item) => {
    const start = offset;
    offset += item.label.length;
    return start;
  });

  const registerLetterRef = useCallback(
    (globalIndex: number, el: HTMLSpanElement | null) => {
      if (el) letterRefs.current.set(globalIndex, el);
      else letterRefs.current.delete(globalIndex);
    },
    [],
  );

  const handleWaveMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const letters = Array.from(letterRefs.current.entries()).map(
        ([index, el]) => {
          const rect = el.getBoundingClientRect();
          return { index, centerX: rect.left + rect.width / 2 };
        },
      );
      setHoveredGlobal(navWaveHoveredGlobal(e.clientX, letters));
    },
    [],
  );

  return (
    <nav
      id="navbar"
      className="flex w-full items-center bg-white py-2 pl-12 pr-4"
    >
      <div
        className="flex items-center gap-6"
        onMouseMove={handleWaveMouseMove}
        onMouseLeave={() => setHoveredGlobal(null)}
      >
        {NAV_ITEMS.map((item, i) => (
          <WaveNavLink
            key={item.label}
            item={item}
            globalOffset={offsets[i]}
            hoveredGlobal={hoveredGlobal}
            registerLetterRef={registerLetterRef}
          />
        ))}
      </div>
      <div className="ml-auto shrink-0">
        <ViewToggle />
      </div>
    </nav>
  );
}
