"use client";

import { useRef, useEffect, useState } from "react";
import { useViewMode } from "@/hooks/useViewMode";

export default function ViewToggle() {
  const { mode, toggle } = useViewMode();
  const humansRef = useRef<HTMLSpanElement>(null);
  const machinesRef = useRef<HTMLSpanElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeRef = mode === "humans" ? humansRef : machinesRef;
    const el = activeRef.current;
    if (!el) return;
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [mode]);

  return (
    <button
      onClick={toggle}
      className="relative flex items-center rounded-full border border-neutral-200 bg-white/90 p-0.5 font-mono text-[10px] cursor-pointer"
      aria-label={`Switch to ${mode === "humans" ? "machines" : "humans"} view`}
    >
      <span
        ref={humansRef}
        className={`relative z-10 px-2 py-1 rounded-full transition-colors duration-200 ${
          mode === "humans"
            ? "text-white"
            : "text-neutral-500 hover:text-neutral-700"
        }`}
      >
        for humans
      </span>
      <span
        ref={machinesRef}
        className={`relative z-10 px-2 py-1 rounded-full transition-colors duration-200 ${
          mode === "machines"
            ? "text-white"
            : "text-neutral-500 hover:text-neutral-700"
        }`}
      >
        for machines
      </span>
      <span
        className="absolute top-0.5 bottom-0.5 rounded-full bg-black transition-all duration-300 ease-in-out"
        style={{
          left: indicator.left,
          width: indicator.width,
        }}
      />
    </button>
  );
}
