"use client";

import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import {
  useAnimationFrame,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { SPREAD_BREAKPOINTS } from "./serviceReveal";

// how many circles start in the hero vs. already in the box
const HERO_COUNT = 7;
const BOX_COUNT = 7;

// deterministic PRNG so circle layout is identical on server and client
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Circle = {
  origin: "hero" | "box";
  // resting fractions before travel (within the relevant band)
  fromX: number;
  fromY: number;
  // resting fractions after travel, inside the box band
  toX: number;
  toY: number;
  sizeVmin: number; // diameter in vmin (clamped in px via CSS)
  dax: number; // drift amplitude X, in vmin
  day: number; // drift amplitude Y, in vmin
  fx: number; // drift angular frequency X (rad/ms)
  fy: number; // drift angular frequency Y (rad/ms)
  phase: number;
};

function makeCircles(): Circle[] {
  const rand = mulberry32(20260702);
  const pick = (a: number, b: number) => a + rand() * (b - a);
  // a slot inside the box: spread across the width, kept in the upper ~72% so
  // circles never sit on top of the bottom-pinned copy
  const boxSlot = () => ({ x: pick(0.08, 0.92), y: pick(0.12, 0.72) });

  const circles: Circle[] = [];

  for (let i = 0; i < BOX_COUNT; i++) {
    const s = boxSlot();
    circles.push({
      origin: "box",
      fromX: s.x,
      fromY: s.y,
      toX: s.x,
      toY: s.y,
      sizeVmin: pick(0.9, 1.6),
      dax: pick(0.6, 1.4),
      day: pick(0.6, 1.4),
      fx: pick(0.0004, 0.0009),
      fy: pick(0.0004, 0.0009),
      phase: pick(0, Math.PI * 2),
    });
  }

  for (let i = 0; i < HERO_COUNT; i++) {
    const target = boxSlot();
    circles.push({
      origin: "hero",
      // scattered across the hero band (top region of the overlay)
      fromX: pick(0.08, 0.92),
      fromY: pick(0.05, 0.6),
      toX: target.x,
      toY: target.y,
      sizeVmin: pick(0.9, 1.6),
      dax: pick(0.6, 1.4),
      day: pick(0.6, 1.4),
      fx: pick(0.0004, 0.0009),
      fy: pick(0.0004, 0.0009),
      phase: pick(0, Math.PI * 2),
    });
  }

  return circles;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function CircleField({
  servicesRef,
}: {
  servicesRef: RefObject<HTMLElement | null>;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const elsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const visibleRef = useRef(true);

  const reduced = useReducedMotion();
  const circles = useMemo(() => makeCircles(), []);

  // read the SAME scroll as the box, and map the box's spread keyframes onto
  // circle travel: full-bleed (marginX 0) => 1 (in box), inset => 0 (at top)
  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"],
  });
  const travel = useTransform(
    scrollYProgress,
    SPREAD_BREAKPOINTS,
    [0, 0, 1, 1, 0, 0]
  );

  // core placement: position every circle for time t (ms). When `rest` is true
  // (reduced motion) travel is pinned to 0 and drift is disabled.
  const place = (t: number, rest: boolean) => {
    const overlay = overlayRef.current;
    const section = servicesRef.current;
    if (!overlay || !section) return;

    const oRect = overlay.getBoundingClientRect();
    const sRect = section.getBoundingClientRect();
    if (oRect.width === 0 || sRect.width === 0) return;

    // box band in overlay-local coordinates (inset slightly so circles stay
    // inside the visible black box rather than on its rounded margin)
    const padX = sRect.width * 0.04;
    const bandLeft = sRect.left - oRect.left + padX;
    const bandW = sRect.width - padX * 2;
    const bandTop = sRect.top - oRect.top;
    const bandH = sRect.height;

    // hero band spans from the overlay top down to the box top
    const heroW = oRect.width;
    const heroH = Math.max(1, bandTop);

    const p = rest ? 0 : clamp01(travel.get());
    const vmin = Math.min(window.innerWidth, window.innerHeight) / 100;

    for (let i = 0; i < circles.length; i++) {
      const el = elsRef.current[i];
      if (!el) continue;
      const c = circles[i];

      let fromPxX: number;
      let fromPxY: number;
      let toPxX: number;
      let toPxY: number;

      if (c.origin === "box") {
        fromPxX = bandLeft + c.fromX * bandW;
        fromPxY = bandTop + c.fromY * bandH;
        toPxX = fromPxX;
        toPxY = fromPxY;
      } else {
        fromPxX = c.fromX * heroW;
        fromPxY = c.fromY * heroH;
        toPxX = bandLeft + c.toX * bandW;
        toPxY = bandTop + c.toY * bandH;
      }

      const baseX = lerp(fromPxX, toPxX, p);
      const baseY = lerp(fromPxY, toPxY, p);
      const dx = rest ? 0 : c.dax * vmin * Math.sin(t * c.fx + c.phase);
      const dy = rest ? 0 : c.day * vmin * Math.cos(t * c.fy + c.phase);

      el.style.transform = `translate3d(${baseX + dx}px, ${
        baseY + dy
      }px, 0) translate(-50%, -50%)`;
      el.style.opacity = "1";
    }
  };

  // animated path (skips work while the overlay is off-screen)
  useAnimationFrame((t) => {
    if (reduced) return;
    if (!visibleRef.current) return;
    place(t, false);
  });

  // reduced-motion path: place once at rest, and again on resize
  useEffect(() => {
    if (!reduced) return;
    place(0, true);
    const onResize = () => place(0, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // only animate while on screen
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(overlay);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {circles.map((c, i) => (
        <span
          key={i}
          ref={(el) => {
            elsRef.current[i] = el;
          }}
          className="absolute left-0 top-0 rounded-full bg-white"
          style={{
            opacity: 0,
            width: `clamp(6px, ${c.sizeVmin}vmin, 13px)`,
            height: `clamp(6px, ${c.sizeVmin}vmin, 13px)`,
          }}
        />
      ))}
    </div>
  );
}
