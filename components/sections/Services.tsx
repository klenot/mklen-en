"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  // progress 0 → section entering from the bottom, 1 → section leaving past the top
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // rest (inset) → spread to full-bleed → hold → shrink back to rest
  const marginX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.45, 0.7, 0.85, 1],
    ["1rem", "1rem", "0rem", "0rem", "1rem", "1rem"]
  );
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
        className="flex aspect-video items-center justify-center overflow-hidden bg-black"
      >
        <motion.p
          style={{ opacity: textOpacity }}
          className="font-mono text-white"
        >
          Some text
        </motion.p>
      </motion.div>
    </section>
  );
}
