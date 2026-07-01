"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const PATH =
  "M 95,68 C 55,175 95,300 205,335 C 335,375 330,205 460,240 C 545,263 585,150 670,135 C 775,117 800,300 850,410";

export default function PathAnimation() {
  const ref = useRef<HTMLElement>(null);

  // progress 0 → section pinned at top, 1 → section about to scroll away
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // reveal the dashed path from start to end (mask "draws" it out)
  const dashOffset = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  // the drawn path darkens from a faint hint to full black as it completes
  const pathOpacity = useTransform(scrollYProgress, [0, 0.85], [0.3, 1]);

  return (
    <section ref={ref} id="path-animation" className="relative h-[250vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 1006 505"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full max-w-[1006px]"
        >
          <defs>
            <mask id="path-reveal">
              <motion.path
                d={PATH}
                stroke="white"
                strokeWidth={40}
                fill="none"
                pathLength={1}
                strokeDasharray="1 1"
                style={{ strokeDashoffset: dashOffset }}
              />
            </mask>
          </defs>

          {/* faint guide: the whole path at very low opacity */}
          <path
            d={PATH}
            stroke="black"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 12"
            opacity={0.12}
          />

          {/* the path being drawn out — revealed by the mask, darkening to black */}
          <motion.path
            d={PATH}
            stroke="black"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 12"
            mask="url(#path-reveal)"
            style={{ opacity: pathOpacity }}
          />
        </svg>

        <p className="pointer-events-none absolute px-4 text-center font-mono text-lg text-black md:text-2xl">
          You just need to connect the dots
        </p>
      </div>
    </section>
  );
}
