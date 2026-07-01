"use client";

import { useEffect, useState } from "react";

import { useMeasuredHeight } from "@/hooks/useMeasuredHeight";

export default function Footer() {
  const { ref, height } = useMeasuredHeight<HTMLElement>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!height) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const scrolled = window.scrollY + window.innerHeight;
        const remaining = document.documentElement.scrollHeight - scrolled;
        // 0 while > footer height from the bottom, 1 exactly at the bottom
        const next = Math.min(1, Math.max(0, 1 - remaining / height));
        setProgress(next);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [height]);

  return (
    <>
      {/* scroll track that lets the footer slide up over the 2nd panel */}
      <div aria-hidden style={{ height }} />

      <footer
        ref={ref}
        id="contact"
        style={{
          transform: `translateY(${(1 - progress) * 100}%)`,
          willChange: "transform",
        }}
        className="fixed inset-x-0 bottom-0 z-30 bg-orange-500 text-black rounded-t-3xl"
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-end justify-center gap-3 px-6 pt-16 pb-6 font-mono text-sm">
          <span>mklenotic.com</span>
          <span aria-hidden>|</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
