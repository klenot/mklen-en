"use client";

import { useCallback, useRef, useState } from "react";
import { NAV_ITEMS } from "@/components/layout/navItems";
import { navWaveHoveredGlobal } from "@/components/layout/navWave";
import WaveNavLink from "@/components/layout/WaveNavLink";
import ViewToggle from "@/components/layout/ViewToggle";

export default function Navbar() {
  const [hoveredGlobal, setHoveredGlobal] = useState<number | null>(null);
  const letterRefs = useRef<Map<number, HTMLSpanElement>>(new Map());

  const offsets = NAV_ITEMS.reduce<number[]>((acc, _item, index) => {
    const start =
      index === 0 ? 0 : acc[index - 1] + NAV_ITEMS[index - 1].label.length;
    acc.push(start);
    return acc;
  }, []);

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

  const mobileItems = NAV_ITEMS.slice(0, 3);

  return (
    <nav
      id="navbar"
      className="flex w-full flex-col items-center gap-2 bg-white px-4 py-2 md:flex-row md:items-center md:pl-12 md:pr-4"
    >
      <div className="flex shrink-0 justify-center md:order-2 md:ml-auto">
        <ViewToggle />
      </div>
      <div
        className="flex w-full items-center justify-center gap-4 md:order-1 md:w-auto md:justify-start md:gap-6"
        onMouseMove={handleWaveMouseMove}
        onMouseLeave={() => setHoveredGlobal(null)}
      >
        {/* Mobile: first three links only */}
        <div className="flex items-center gap-4 md:hidden">
          {mobileItems.map((item, i) => (
            <WaveNavLink
              key={item.label}
              item={item}
              globalOffset={offsets[i]}
              hoveredGlobal={hoveredGlobal}
              registerLetterRef={registerLetterRef}
            />
          ))}
        </div>
        {/* Desktop: all links */}
        <div className="hidden items-center gap-6 md:flex">
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
      </div>
    </nav>
  );
}
