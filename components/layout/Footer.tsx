"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/mixpanel";

const EMAIL = "marek@mklenotic.com";

export default function Footer({
  workStartHour = 10,
  workEndHour = 16,
}: {
  workStartHour?: number;
  workEndHour?: number;
}) {
  const [now, setNow] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const bootstrap = window.setTimeout(() => setNow(new Date()), 0);
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => {
      clearTimeout(bootstrap);
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    trackEvent("contact_email_copied", { email: EMAIL });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  }, []);

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

  return (
    <div className="relative">
      {/* Contact section — scrolls over the panel, white bg with rounded bottom */}
      <section
        id="contact-footer"
        className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center gap-8 rounded-b-3xl bg-white px-6 pb-16 text-center"
      >
        <div className="flex w-fit flex-col items-stretch gap-5">
          <p className="px-4 font-mono font-regular text-black">
            It&apos;s {time} and I&apos;m{" "}
            <span className="italic font-bold">
              {isWorking ? "currently working" : "currently resting"}
            </span>
            .
          </p>

          <div className="relative w-full">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 translate-x-px translate-y-[6px] rounded-full border-2 border-black"
              style={{
                background: "linear-gradient(to right, #FF8008, #FFC837)",
              }}
            />
            <button
              type="button"
              onClick={handleCopy}
              className={`relative block w-full cursor-pointer rounded-full bg-black px-8 py-5 text-center font-mono text-lg text-white md:text-2xl transition-transform duration-150 ease-out ${
                copied
                  ? "translate-x-[2px] translate-y-[6px]"
                  : "hover:translate-x-[2px] hover:translate-y-[6px] active:translate-x-[2px] active:translate-y-[6px]"
              }`}
            >
              {copied ? "email copied" : "get in touch"}
            </button>
          </div>
        </div>

        <p className="font-regular font-mono text-xs text-black">
          My brain cells are for hire.
          <br />
          Let&apos;s connect and make it happen.
        </p>
      </section>

      {/* Bottom panel — sticky at viewport bottom, slides out from behind the CTA */}
      <footer
        className="sticky bottom-0 z-0 -mt-5 overflow-hidden px-6 pt-16 pb-4"
        style={{ background: "linear-gradient(to bottom, #0082FF, #110058)" }}
      >
        <img
          src="/abstract-gradient-texture-bg.jpg"
          alt=""
          aria-hidden
          className="absolute inset-x-0 top-0 w-full object-cover object-top"
        />
        <span
          aria-hidden
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: "linear-gradient(to bottom, #0082FF, #110058)" }}
        />
        <div className="relative mx-auto flex w-full max-w-[1200px] items-center justify-center gap-3 font-mono text-xs text-white/50">
          <span>mklenotic.com</span>
          <span aria-hidden>|</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
