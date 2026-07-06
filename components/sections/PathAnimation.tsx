"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const PATH =
  "M 95,68 C 55,175 95,300 205,335 C 335,375 330,205 460,240 C 545,263 585,150 670,135 C 775,117 800,300 850,410";

export const PATH_START = { x: 95, y: 68 };
export const PATH_END = { x: 850, y: 410 };
export const VIEWBOX = { w: 1006, h: 505 };

export default function PathAnimation({
  svgRef,
  sectionRef,
}: {
  svgRef: RefObject<SVGSVGElement | null>;
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const internalRef = useRef<HTMLElement>(null);
  const ref = sectionRef ?? internalRef;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const dashOffset = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const pathOpacity = useTransform(scrollYProgress, [0, 0.85], [0.3, 1]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <svg
          ref={svgRef}
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

          <path
            d={PATH}
            stroke="black"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 12"
            opacity={0.12}
          />

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
