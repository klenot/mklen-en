"use client";

import { useCallback, useEffect, useState } from "react";

import { useThrottledScroll } from "@/hooks/useThrottledScroll";

const OFFSET_AFTER_GAME = 150;

export default function Contact({
  workStartHour = 10,
  workEndHour = 16,
}: {
  /** First working hour (24h). Default 10 (10am). */
  workStartHour?: number;
  /** Hour work ends (24h, exclusive). Default 16 (4pm). */
  workEndHour?: number;
}) {
  const [now, setNow] = useState<Date | null>(null);
  const [visible, setVisible] = useState(false);
  const [footerProgress, setFooterProgress] = useState(0);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  useThrottledScroll(
    useCallback(() => {
      const viewportBottom = window.scrollY + window.innerHeight;

      const game = document.getElementById("game");
      if (game) {
        const gameBottom =
          game.getBoundingClientRect().top + window.scrollY + game.clientHeight;
        setVisible(viewportBottom > gameBottom + OFFSET_AFTER_GAME);
      }

      const footer = document.getElementById("contact-footer");
      const footerH = footer?.offsetHeight ?? 0;
      if (footerH) {
        const remaining =
          document.documentElement.scrollHeight - viewportBottom;
        setFooterProgress(Math.min(1, Math.max(0, 1 - remaining / footerH)));
      }
    }, []),
    [],
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

  const textColor = `rgb(${Math.round(255 * footerProgress)}, ${Math.round(255 * footerProgress)}, ${Math.round(255 * footerProgress)})`;

  return (
    <div
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-center pointer-events-none"
      style={{ paddingTop: "25vh", paddingBottom: "25vh" }}
    >
      <section
        id="contact"
        className="relative flex shrink-0 items-center justify-center py-24 pointer-events-auto"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.6s ease-out",
        }}
      >
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex w-fit flex-col items-stretch gap-5">
            <p className="px-4 font-mono font-medium text-black">
              It&apos;s {time} and I&apos;m{" "}
              <span className="italic">
                {isWorking ? "currently working" : "currently resting"}
              </span>
              .
            </p>

            <div className="relative w-full">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 translate-x-[2px] translate-y-[6px] rounded-full border-2 border-black"
                style={{ background: "linear-gradient(to right, #FF8008, #FFC837)" }}
              />
              <a
                href="mailto:hello@mklenotic.com"
                className="relative block w-full rounded-full bg-black px-8 py-5 text-center font-mono text-lg text-white md:text-2xl transition-transform duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[6px] active:translate-x-2 active:translate-y-2"
              >
                get in touch
              </a>
            </div>
          </div>

          <p
            className="font-light font-mono text-xs"
            style={{ color: textColor, transition: "color 0.1s ease-out" }}
          >
            My brain cells are for hire.
            <br />
            Let&apos;s connect and make it happen.
          </p>
        </div>
      </section>
    </div>
  );
}
