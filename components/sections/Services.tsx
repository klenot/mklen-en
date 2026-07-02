"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SPREAD_BREAKPOINTS, SPREAD_OFFSET } from "./serviceReveal";

export default function Services({
  sectionRef,
}: {
  // Optional shared ref so CircleField can key off the exact same scroll.
  sectionRef?: RefObject<HTMLElement | null>;
}) {
  const internalRef = useRef<HTMLElement>(null);
  const ref = sectionRef ?? internalRef;

  // progress 0 → section entering from the bottom, 1 → section leaving past the top
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: SPREAD_OFFSET,
  });

  // rest (inset) → spread to full-bleed → hold → shrink back to rest
  const marginX = useTransform(scrollYProgress, SPREAD_BREAKPOINTS, [
    "1rem",
    "1rem",
    "0rem",
    "0rem",
    "1rem",
    "1rem",
  ]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0.3, 0.45, 0.7, 0.85],
    ["1.5rem", "0rem", "0rem", "1.5rem"]
  );

  // text fades in once full-bleed, then out again before the section shrinks
  const textOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.6, 0.72, 0.82],
    [0, 1, 1, 0]
  );

  return (
    <section ref={ref} id="services" className="py-4">
      <motion.div
        style={{ marginLeft: marginX, marginRight: marginX, borderRadius }}
        className="relative aspect-video overflow-hidden bg-black"
      >
        <motion.p
          style={{ opacity: textOpacity }}
          className="absolute inset-x-0 bottom-[12px] px-6 text-center font-mono text-white"
        >
          Today&apos;s digital space is made for people of many talents.
        </motion.p>
      </motion.div>
    </section>
  );
}
