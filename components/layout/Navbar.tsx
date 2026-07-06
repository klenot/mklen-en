"use client";

import { useState } from "react";
import { NAV_ITEMS } from "@/components/layout/navItems";
import WaveNavLink from "@/components/layout/WaveNavLink";
import ViewToggle from "@/components/layout/ViewToggle";

export default function Navbar() {
  const [hoveredGlobal, setHoveredGlobal] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("marek@mklenotic.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  let offset = 0;
  const offsets = NAV_ITEMS.map((item) => {
    const start = offset;
    offset += item.label.length;
    return start;
  });

  return (
    <nav
      id="navbar"
      className="flex flex-col items-center bg-white py-2 px-12 max-w-3xl"
    >
      <div className="mb-1 absolute right-2 top-2 flex flex-col items-end gap-3">
        <ViewToggle />
        <div className="font-mono text-xs text-black flex flex-col items-end">
          <span
            onClick={copyEmail}
            className="font-regular mb-3 cursor-pointer hover:text-gray-400 transition-colors"
          >
            {copied ? "email copied" : "marek@mklenotic.com"}
          </span>
          <a
            href="https://linkedin.com/in/klenoticmarek"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            linkedin
          </a>
        </div>
      </div>
      <div className="flex justify-between items-start w-full">
        {NAV_ITEMS.map((item, i) => (
          <WaveNavLink
            key={item.label}
            item={item}
            globalOffset={offsets[i]}
            hoveredGlobal={hoveredGlobal}
            onLetterHover={(localIndex: number | null) =>
              setHoveredGlobal(
                localIndex === null ? null : offsets[i] + localIndex,
              )
            }
          />
        ))}
      </div>
    </nav>
  );
}
