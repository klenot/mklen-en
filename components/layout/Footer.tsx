"use client";

import { useCallback, useState } from "react";

import { useMeasuredHeight } from "@/hooks/useMeasuredHeight";
import { useThrottledScroll } from "@/hooks/useThrottledScroll";

export default function Footer() {
  const { ref, height } = useMeasuredHeight<HTMLElement>();
  const [progress, setProgress] = useState(0);

  useThrottledScroll(
    useCallback(() => {
      if (!height) return;
      const scrolled = window.scrollY + window.innerHeight;
      const remaining = document.documentElement.scrollHeight - scrolled;
      const next = Math.min(1, Math.max(0, 1 - remaining / height));
      setProgress(next);
    }, [height]),
    [height],
  );

  return (
    <>
      {/* scroll track that lets the footer slide up over the 2nd panel */}
      <div aria-hidden style={{ height }} />

      <footer
        ref={ref}
        id="contact-footer"
        style={{
          transform: `translateY(${(1 - progress) * 100}%)`,
          willChange: "transform",
          background: "linear-gradient(to bottom, #110058, #7B2FBE)",
          boxShadow: `0 -60px 200px 160px rgba(17, 0, 88, ${progress})`,
          borderRadius: `${(1 - progress) * 24}px ${(1 - progress) * 24}px 0 0`,
        }}
        className="fixed inset-x-0 bottom-0 z-30 text-black"
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-end justify-center gap-3 px-6 pt-48 pb-3 font-mono text-xs min-h-[30vh]">
          <span>vibecoded</span>
          <span aria-hidden>|</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
