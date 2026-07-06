"use client";

import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import {
  useAnimationFrame,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { SPREAD_OFFSET } from "./serviceReveal";
import { PATH_START, PATH_END, VIEWBOX } from "./PathAnimation";

const HERO_COUNT = 10;
const BOX_COUNT = 4;

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
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  sizeVmin: number;
  dax: number;
  day: number;
  fx: number;
  fy: number;
  phase: number;
  pathDest?: "start" | "end";
};

function makeCircles(): Circle[] {
  const rand = mulberry32(20260702);
  const pick = (a: number, b: number) => a + rand() * (b - a);

  const TOTAL = BOX_COUNT + HERO_COUNT;
  const cols = Math.ceil(Math.sqrt(TOTAL * 1.6));
  const rows = Math.ceil(TOTAL / cols);
  const cellW = 0.84 / cols;
  const cellH = 0.6 / rows;
  const slots: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = 0.08 + (c + 0.5) * cellW;
      const cy = 0.12 + (r + 0.5) * cellH;
      slots.push({
        x: cx + pick(-cellW * 0.3, cellW * 0.3),
        y: cy + pick(-cellH * 0.3, cellH * 0.3),
      });
    }
  }
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }

  const circles: Circle[] = [];

  const motionProps = () => ({
    sizeVmin: pick(0.9, 1.6),
    dax: pick(0.6, 1.4),
    day: pick(0.6, 1.4),
    fx: pick(0.0004, 0.0009),
    fy: pick(0.0004, 0.0009),
    phase: pick(0, Math.PI * 2),
  });

  for (let i = 0; i < BOX_COUNT; i++) {
    const s = slots[i];
    circles.push({
      origin: "box",
      fromX: s.x,
      fromY: s.y,
      toX: s.x,
      toY: s.y,
      ...motionProps(),
    });
  }

  for (let i = 0; i < HERO_COUNT; i++) {
    const s = slots[BOX_COUNT + i];
    // Spread circles toward top/bottom, away from center text line
    const rawY = pick(0, 1);
    const fromY = rawY < 0.5
      ? pick(0.08, 0.38)
      : pick(0.62, 0.92);
    circles.push({
      origin: "hero",
      fromX: pick(0.25, 0.95),
      fromY,
      toX: s.x,
      toY: s.y,
      ...motionProps(),
    });
  }

  // Pick two circles near the bottom of the box to become path-destination dots.
  // Sort by toY descending (bottom-most first) and assign path destinations.
  const sorted = circles
    .map((c, idx) => ({ idx, toY: c.toY }))
    .sort((a, b) => b.toY - a.toY);
  circles[sorted[0].idx].pathDest = "start";
  circles[sorted[1].idx].pathDest = "end";

  return circles;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
// smooth easing for the detach travel
const easeInOut = (t: number) => t * t * (3 - 2 * t);

export default function CircleField({
  servicesRef,
  boxRef,
  svgRef,
  pathSectionRef,
}: {
  servicesRef: RefObject<HTMLElement | null>;
  boxRef: RefObject<HTMLDivElement | null>;
  svgRef: RefObject<SVGSVGElement | null>;
  pathSectionRef: RefObject<HTMLElement | null>;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const elsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const visibleRef = useRef(true);
  const viewportRef = useRef({ w: 1, h: 1 });
  const revealedRef = useRef(false);

  const reduced = useReducedMotion();
  const circles = useMemo(() => makeCircles(), []);

  // Phase 1: circles fall into the box (existing behavior)
  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: SPREAD_OFFSET,
  });
  const travel = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.8, 0.88, 1],
    [0, 0, 1, 1, 0, 0],
  );

  // Phase 2: path circles detach from box and fall to SVG path endpoints.
  // Triggered as the PathAnimation section scrolls into view. The circles
  // arrive before the path starts drawing (path draws at 0–0.85 of its own
  // scroll progress, which starts AFTER the section is pinned at top).
  const { scrollYProgress: pathProgress } = useScroll({
    target: pathSectionRef,
    offset: ["start end", "start start"],
  });
  const pathTravel = useTransform(pathProgress, [0, 1], [0, 1]);

  // Convert SVG viewBox coordinates to viewport pixel coordinates
  const getSvgViewportPoint = (svgX: number, svgY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const svgRect = svg.getBoundingClientRect();

    const scaleX = svgRect.width / VIEWBOX.w;
    const scaleY = svgRect.height / VIEWBOX.h;
    const scale = Math.min(scaleX, scaleY);

    const renderedW = VIEWBOX.w * scale;
    const renderedH = VIEWBOX.h * scale;
    const offsetX = (svgRect.width - renderedW) / 2;
    const offsetY = (svgRect.height - renderedH) / 2;

    return {
      x: svgRect.left + offsetX + svgX * scale,
      y: svgRect.top + offsetY + svgY * scale,
    };
  };

  const place = (t: number, rest: boolean) => {
    const overlay = overlayRef.current;
    const box = boxRef.current;
    if (!overlay || !box) return;

    const oRect = overlay.getBoundingClientRect();
    const bRect = box.getBoundingClientRect();
    if (oRect.width === 0 || bRect.width === 0) return;

    const padX = bRect.width * 0.04;
    const bandLeft = bRect.left - oRect.left + padX;
    const bandW = bRect.width - padX * 2;
    const bandTop = bRect.top - oRect.top;
    const bandH = bRect.height;

    const heroW = oRect.width;
    const heroH = Math.max(1, bandTop);

    const p = rest ? 0 : clamp01(travel.get());
    const pt = rest ? 0 : clamp01(pathTravel.get());
    const ptEased = easeInOut(pt);
    const { w, h } = viewportRef.current;
    const vmin = Math.min(w, h) / 100;
    const reveal = !revealedRef.current;

    // Compute SVG endpoint positions in viewport coords for path circles
    let pathStartVp: { x: number; y: number } | null = null;
    let pathEndVp: { x: number; y: number } | null = null;
    if (pt > 0) {
      pathStartVp = getSvgViewportPoint(PATH_START.x, PATH_START.y);
      pathEndVp = getSvgViewportPoint(PATH_END.x, PATH_END.y);
    }

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

      let baseX = lerp(fromPxX, toPxX, p);
      let baseY = lerp(fromPxY, toPxY, p);

      // Path destination circles: once pathTravel kicks in, interpolate toward
      // the SVG endpoint. Once arrived, switch to fixed positioning so they
      // stay rock-solid on screen regardless of overlay scrolling.
      let isPathCircle = false;
      const arrived = c.pathDest && pt >= 0.98;
      if (c.pathDest && pt > 0) {
        isPathCircle = true;
        const targetVp = c.pathDest === "start" ? pathStartVp : pathEndVp;

        if (arrived && targetVp) {
          // Switch to fixed positioning — completely decoupled from overlay
          el.style.position = "fixed";
          el.style.transform = `translate(-50%, -50%)`;
          el.style.left = `${targetVp.x}px`;
          el.style.top = `${targetVp.y}px`;
          if (reveal) el.style.opacity = "1";
          continue;
        }

        // Travelling (forward or reverse) — ensure we're back to absolute
        if (el.style.position === "fixed") {
          el.style.position = "absolute";
          el.style.left = "0";
          el.style.top = "0";
        }

        // Interpolate in overlay-local space
        if (targetVp) {
          const targetLocal = {
            x: targetVp.x - oRect.left,
            y: targetVp.y - oRect.top,
          };
          baseX = lerp(toPxX, targetLocal.x, ptEased);
          baseY = lerp(toPxY, targetLocal.y, ptEased);
        } else {
          baseX = toPxX;
          baseY = toPxY;
        }
      } else if (c.pathDest && el.style.position === "fixed") {
        // pathTravel fully at 0 — revert to absolute
        el.style.position = "absolute";
        el.style.left = "0";
        el.style.top = "0";
      }

      // Kill all drift once path circles have arrived
      const driftDampen = arrived ? 0 : isPathCircle ? 1 - ptEased : 1;
      const dx = rest
        ? 0
        : c.dax * vmin * Math.sin(t * c.fx + c.phase) * driftDampen;
      const dy = rest
        ? 0
        : c.day * vmin * Math.cos(t * c.fy + c.phase) * driftDampen;

      el.style.transform = `translate3d(${baseX + dx}px, ${
        baseY + dy
      }px, 0) translate(-50%, -50%)`;
      if (reveal) el.style.opacity = "1";
    }

    revealedRef.current = true;
  };

  useEffect(() => {
    const update = () => {
      viewportRef.current = { w: window.innerWidth, h: window.innerHeight };
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useAnimationFrame((t) => {
    if (reduced) return;
    if (!visibleRef.current) return;
    place(t, false);
  });

  useEffect(() => {
    if (!reduced) return;
    place(0, true);
    const onResize = () => place(0, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
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
            width: 50,
            height: 50,
          }}
        />
      ))}
    </div>
  );
}
