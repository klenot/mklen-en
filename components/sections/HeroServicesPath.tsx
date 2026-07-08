"use client";

import { useRef } from "react";
import { useMotionValue } from "motion/react";
import CircleField from "./CircleField";
import HeroServices from "./HeroServices";
import PathAnimation from "./PathAnimation";

export default function HeroServicesPath() {
  const servicesRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathSectionRef = useRef<HTMLElement>(null);
  const logosLandedProgress = useMotionValue(0);

  return (
    <div className="relative">
      <CircleField
        servicesRef={servicesRef}
        boxRef={boxRef}
        svgRef={svgRef}
        pathSectionRef={pathSectionRef}
        logosLandedProgress={logosLandedProgress}
      />
      <HeroServices
        servicesRef={servicesRef}
        boxRef={boxRef}
        logosLandedProgress={logosLandedProgress}
      />
      <PathAnimation svgRef={svgRef} sectionRef={pathSectionRef} />
    </div>
  );
}
