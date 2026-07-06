"use client";

import { useRef, useEffect, useState } from "react";
import { useViewMode } from "@/hooks/useViewMode";

export default function ViewToggle() {
  const { mode, toggle } = useViewMode();
  const humansRef = useRef<HTMLSpanElement>(null);
  const machinesRef = useRef<HTMLSpanElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const activeRef = mode === "humans" ? humansRef : machinesRef;
    const el = activeRef.current;
    if (!el) return;
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [mode]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-10 left-2 z-150 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <button
        onClick={toggle}
        className="relative flex items-center rounded-full border border-neutral-200 bg-white/90 backdrop-blur-sm p-0.5 font-mono text-[10px] transition-all"
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
    </div>
  );
}
