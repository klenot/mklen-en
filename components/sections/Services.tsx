"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import type { MotionValue } from "motion/react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  interpolateProgress,
  SPREAD_BREAKPOINTS,
  SPREAD_MARGIN_PX,
  SPREAD_OFFSET,
} from "./serviceReveal";

export default function Services({
  sectionRef,
  boxRef,
  logosLandedProgress,
}: {
  sectionRef?: RefObject<HTMLElement | null>;
  boxRef?: RefObject<HTMLDivElement | null>;
  logosLandedProgress: MotionValue<number>;
}) {
  const internalRef = useRef<HTMLElement>(null);
  const ref = sectionRef ?? internalRef;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: SPREAD_OFFSET,
  });

  const marginX = useTransform(scrollYProgress, (progress) => {
    const px = interpolateProgress(progress, SPREAD_BREAKPOINTS, SPREAD_MARGIN_PX);
    return `${px}px`;
  });

  const borderRadius = useTransform(scrollYProgress, (progress) => {
    const px = interpolateProgress(progress, [0.25, 0.35, 0.8, 0.9], [24, 0, 0, 24]);
    return `${px}px`;
  });

  const textExitOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 0.78, 1],
    [1, 1, 0, 0],
  );

  const textOpacity = useTransform(
    [logosLandedProgress, textExitOpacity],
    ([landed, exit]) => (landed as number) * (exit as number),
  );

  return (
    <section ref={ref} id="services" className="pb-[15vh] pt-4">
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
