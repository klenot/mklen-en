"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Sunday (day 0) has no working hours.
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
    <section
      id="contact"
      className="flex shrink-0 items-center justify-center py-24"
    >
      <div className="flex flex-col items-center gap-8 text-center">
        {/* status line + CTA share a w-fit column so the button (w-full) stretches to
            the width of the text above; the text's px padding makes it slightly exceed. */}
        <div className="flex w-fit flex-col items-stretch gap-5">
          <p className="px-4 font-mono font-medium text-black">
            It&apos;s {time} and I&apos;m{" "}
            <span className="italic">
              {isWorking ? "currently working" : "currently resting"}
            </span>
            .
          </p>

          {/* Keycap 3D: a second black pill sits under the button, offset to the
              bottom-right to create depth. On hover the button slides into it,
              closing the gap so it reads as pressed. */}
          <div className="relative w-full">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 translate-x-[2px] translate-y-[6px] rounded-full border-2 border-black bg-white"
            />
            <a
              href="mailto:hello@mklenotic.com"
              className="relative block w-full rounded-full bg-black px-8 py-5 text-center font-mono text-lg text-white md:text-2xl transition-transform duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[6px] active:translate-x-2 active:translate-y-2"
            >
              get in touch
            </a>
          </div>
        </div>

        <p className="font-light font-mono text-xs text-black">
          My brain cells are for hire.
          <br />
          Let&apos;s connect and make it happen.
        </p>
      </div>
    </section>
  );
}
