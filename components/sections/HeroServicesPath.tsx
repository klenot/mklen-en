"use client";

import { useRef } from "react";
import CircleField from "./CircleField";
import HeroServices from "./HeroServices";
import PathAnimation from "./PathAnimation";

export default function HeroServicesPath() {
  const servicesRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathSectionRef = useRef<HTMLElement>(null);

  return (
    <div className="relative">
      <CircleField
        servicesRef={servicesRef}
        boxRef={boxRef}
        svgRef={svgRef}
        pathSectionRef={pathSectionRef}
      />
      <HeroServices servicesRef={servicesRef} boxRef={boxRef} />
      <PathAnimation svgRef={svgRef} sectionRef={pathSectionRef} />
    </div>
  );
}
