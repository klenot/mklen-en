"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/mixpanel";

const HOMEPAGE_SECTIONS = [
  "projects",
  "blog",
  "services",
  "experiences",
  "reviews",
  "contact-footer",
] as const;

export function useSectionViews(pathname: string) {
  const seenRef = useRef(new Set<string>());

  useEffect(() => {
    if (pathname !== "/") return;

    seenRef.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.35) {
            continue;
          }

          const section = entry.target.id;
          if (!section || seenRef.current.has(section)) continue;

          seenRef.current.add(section);
          trackEvent("section_viewed", {
            section,
            path: pathname,
          });
        }
      },
      { threshold: [0.35, 0.5, 0.75] },
    );

    for (const sectionId of HOMEPAGE_SECTIONS) {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [pathname]);
}
