"use client";

import { useRef } from "react";
import CircleField from "./CircleField";
import Hero from "./Hero";
import Services from "./Services";

/**
 * Composes the hero and the service box in one relative container so the
 * CircleField overlay can span both. The services section ref is shared so the
 * circle travel reads the exact same scroll as the box's width animation.
 */
export default function HeroServices() {
  const servicesRef = useRef<HTMLElement>(null);

  return (
    <div className="relative">
      <CircleField servicesRef={servicesRef} />
      <Hero />
      <Services sectionRef={servicesRef} />
    </div>
  );
}
