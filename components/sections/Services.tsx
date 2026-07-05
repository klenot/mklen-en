"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SPREAD_BREAKPOINTS, SPREAD_OFFSET } from "./serviceReveal";

export default function Services({
  sectionRef,
  boxRef,
}: {
  sectionRef?: RefObject<HTMLElement | null>;
  boxRef?: RefObject<HTMLDivElement | null>;
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
    [0.15, 0.25, 0.80, 0.90],
    ["1.5rem", "0rem", "0rem", "1.5rem"]
  );

  // text fades in once circles have settled, holds through the rest of
  // the full-bleed phase, then out before shrinking
  const textOpacity = useTransform(
    scrollYProgress,
    [0.34, 0.42, 0.72, 0.78],
    [0, 1, 1, 0]
  );

  return (
    <section ref={ref} id="services" className="pb-[50vh] pt-4">
      <motion.div
        ref={boxRef}
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
