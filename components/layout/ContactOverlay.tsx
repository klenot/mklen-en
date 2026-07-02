"use client";

import { useEffect, useState } from "react";

export default function ContactOverlay({
  children,
  afterSelector = "#game",
}: {
  children: React.ReactNode;
  afterSelector?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;

    const check = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const anchor = document.querySelector(afterSelector);
        if (!anchor) return;

        // Absolute bottom of the game section in the document
        const anchorBottom =
          anchor.getBoundingClientRect().top + window.scrollY + anchor.clientHeight;

        // How far the user has scrolled (bottom edge of viewport)
        const viewportBottom = window.scrollY + window.innerHeight;

        // Show once the viewport has scrolled past the game section
        setShow(viewportBottom > anchorBottom);
      });
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [afterSelector]);

  return (
    <div
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-center pointer-events-none"
      style={{
        height: "fit-content",
        paddingTop: "25vh",
        paddingBottom: "25vh",
      }}
    >
      <div
        className="pointer-events-auto"
        style={{
          opacity: show ? 1 : 0,
          pointerEvents: show ? "auto" : "none",
          transition: "opacity 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}
