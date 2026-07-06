"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useMeasuredHeight } from "@/hooks/useMeasuredHeight";
import { useThrottledScroll } from "@/hooks/useThrottledScroll";

const EMAIL = "marek@mklenotic.com";

export default function Footer({
  workStartHour = 10,
  workEndHour = 16,
}: {
  workStartHour?: number;
  workEndHour?: number;
}) {
  const { ref, height } = useMeasuredHeight<HTMLElement>();
  const [progress, setProgress] = useState(0);
  const [now, setNow] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  }, []);

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

  const isWorking =
    now !== null &&
    now.getDay() !== 0 &&
    now.getHours() >= workStartHour &&
    now.getHours() < workEndHour;

  const time = now
    ? now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "--:--";

  const contactOpacity = Math.min(1, Math.max(0, (progress - 0.4) / 0.3));

  return (
    <>
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
        className="fixed inset-x-0 bottom-0 z-30 flex flex-col items-center justify-center min-h-[60vh]"
      >
        <div
          className="flex flex-col items-center gap-8 text-center"
          style={{
            opacity: contactOpacity,
            transition: "opacity 0.15s ease-out",
          }}
        >
          <div className="flex w-fit flex-col items-stretch gap-5">
            <p className="px-4 font-mono font-medium text-white">
              It&apos;s {time} and I&apos;m{" "}
              <span className="italic">
                {isWorking ? "currently working" : "currently resting"}
              </span>
              .
            </p>

            <div className="relative w-full">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 translate-x-[2px] translate-y-[6px] rounded-full border-2 border-white/30"
                style={{ background: "linear-gradient(to right, #FF8008, #FFC837)" }}
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`relative block w-full rounded-full bg-black px-8 py-5 text-center font-mono text-lg text-white md:text-2xl transition-transform duration-150 ease-out ${
                  copied
                    ? "translate-x-[2px] translate-y-[6px]"
                    : "hover:translate-x-[2px] hover:translate-y-[6px] active:translate-x-[2px] active:translate-y-[6px]"
                }`}
              >
                {copied ? "email copied" : "get in touch"}
              </button>
            </div>
          </div>

          <p className="font-light font-mono text-xs text-white/70">
            My brain cells are for hire.
            <br />
            Let&apos;s connect and make it happen.
          </p>
        </div>

        <div className="mt-auto w-full">
          <div className="mx-auto flex w-full max-w-[1200px] items-end justify-center gap-3 px-6 pt-12 pb-1 font-mono text-xs text-white/50">
            <span>mklenotic.com</span>
            <span aria-hidden>|</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
