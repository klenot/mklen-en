"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PATH_HORIZONTAL, PATH_VERTICAL } from "./pathConfig";

export {
  PATH_HORIZONTAL,
  PATH_VERTICAL,
  PATH_START,
  PATH_END,
  VIEWBOX,
} from "./pathConfig";

export default function PathAnimation({
  svgRef,
  sectionRef,
}: {
  svgRef: RefObject<SVGSVGElement | null>;
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const internalRef = useRef<HTMLElement>(null);
  const ref = sectionRef ?? internalRef;
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const path = isDesktop ? PATH_HORIZONTAL : PATH_VERTICAL;

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
          viewBox={`0 0 ${path.viewBox.w} ${path.viewBox.h}`}
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          className={
            isDesktop
              ? "h-full w-full max-w-[1006px]"
              : "h-[80vh] w-auto max-w-[min(280px,85vw)]"
          }
        >
          <defs>
            <mask id="path-reveal">
              <motion.path
                d={path.d}
                stroke="white"
                strokeWidth={isDesktop ? 40 : 50}
                fill="none"
                pathLength={1}
                strokeDasharray="1 1"
                style={{ strokeDashoffset: dashOffset }}
              />
            </mask>
          </defs>

          <path
            d={path.d}
            stroke="black"
            strokeWidth={isDesktop ? 3 : 4}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 12"
            opacity={0.12}
          />

          <motion.path
            d={path.d}
            stroke="black"
            strokeWidth={isDesktop ? 3 : 4}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 12"
            mask="url(#path-reveal)"
            style={{ opacity: pathOpacity }}
          />
        </svg>

        <p className="pointer-events-none absolute max-w-[min(280px,85vw)] px-4 text-center font-mono text-base leading-snug text-black md:max-w-none md:text-lg md:leading-normal lg:text-2xl">
          You just need to connect the dots.
        </p>
      </div>
    </section>
  );
}
