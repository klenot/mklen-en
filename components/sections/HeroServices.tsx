"use client";

import type { RefObject } from "react";
import type { MotionValue } from "motion/react";
import Hero from "./Hero";
import Services from "./Services";

export default function HeroServices({
  servicesRef,
  boxRef,
  logosLandedProgress,
}: {
  servicesRef: RefObject<HTMLElement | null>;
  boxRef: RefObject<HTMLDivElement | null>;
  logosLandedProgress: MotionValue<number>;
}) {
  return (
    <div className="relative">
      <Hero />
      <Services
        sectionRef={servicesRef}
        boxRef={boxRef}
        logosLandedProgress={logosLandedProgress}
      />
    </div>
  );
}
