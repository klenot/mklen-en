"use client";

import type { RefObject } from "react";
import Hero from "./Hero";
import Services from "./Services";

export default function HeroServices({
  servicesRef,
  boxRef,
}: {
  servicesRef: RefObject<HTMLElement | null>;
  boxRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative">
      <Hero />
      <Services sectionRef={servicesRef} boxRef={boxRef} />
    </div>
  );
}
