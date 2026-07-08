"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import {
  animate,
  useAnimationFrame,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import {
  CIRCLE_TRAVEL_BREAKPOINTS,
  CIRCLE_TRAVEL_VALUES,
  interpolateProgress,
  SPREAD_OFFSET,
} from "./serviceReveal";
import { PATH_START, PATH_END, VIEWBOX } from "./PathAnimation";
import { clamp01, smoothstep } from "@/lib/math";

const CIRCLE_LOGOS: { file: string; size: number }[] = [
  // --- BOX (services) circles ---
  { file: "supabase.webp", size: 52 },
  { file: "gtm.webp", size: 36 },
  { file: "mixpanel.webp", size: 44 },
  { file: "python.webp", size: 60 },
  { file: "apollo.webp", size: 46 },
  { file: "linkedin.webp", size: 38 },
  { file: "openai.webp", size: 64 },
  { file: "smartlook.webp", size: 40 },
  { file: "duvo.webp", size: 44 },
  // --- HERO circles ---
  { file: "cursor.webp", size: 64 },
  { file: "gemini.webp", size: 56 },
  { file: "attio.webp", size: 38 },
  { file: "nexos.webp", size: 48 },
  { file: "analytics.webp", size: 36 },
  { file: "nextjs.webp", size: 60 },
  { file: "product-board.webp", size: 42 },
  { file: "pocketbase.webp", size: 38 },
  { file: "claude.webp", size: 58 },
  { file: "React.webp", size: 50 },
  { file: "framer.webp", size: 40 },
  { file: "cloudflare.webp", size: 46 },
  { file: "slack.webp", size: 36 },
];

const PATH_CIRCLE_CURSOR = 9;
const PATH_CIRCLE_NEXTJS = 14;

const BOX_COUNT = 9;
const HERO_COUNT = 13;

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

  // Place hero circles in a stratified grid to avoid clustering
  const heroCols = Math.ceil(Math.sqrt(HERO_COUNT * 1.5));
  const heroRows = Math.ceil(HERO_COUNT / heroCols);
  const heroCellW = 0.8 / heroCols;
  const heroCellH = 0.7 / heroRows;
  for (let i = 0; i < HERO_COUNT; i++) {
    const s = slots[BOX_COUNT + i];
    const col = i % heroCols;
    const row = Math.floor(i / heroCols);
    const fromX = 0.1 + (col + 0.5) * heroCellW + pick(-heroCellW * 0.3, heroCellW * 0.3);
    const fromY = 0.12 + (row + 0.5) * heroCellH + pick(-heroCellH * 0.3, heroCellH * 0.3);
    circles.push({
      origin: "hero",
      fromX,
      fromY,
      toX: s.x,
      toY: s.y,
      ...motionProps(),
    });
  }

  circles[PATH_CIRCLE_CURSOR].pathDest = "start";
  circles[PATH_CIRCLE_NEXTJS].pathDest = "end";

  return circles;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function CircleField({
  servicesRef,
  boxRef,
  svgRef,
  pathSectionRef,
  logosLandedProgress,
}: {
  servicesRef: RefObject<HTMLElement | null>;
  boxRef: RefObject<HTMLDivElement | null>;
  svgRef: RefObject<SVGSVGElement | null>;
  pathSectionRef: RefObject<HTMLElement | null>;
  logosLandedProgress: MotionValue<number>;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const elsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const visibleRef = useRef(true);
  const viewportRef = useRef({ w: 1, h: 1 });
  const revealedRef = useRef(false);
  const sizeScaleRef = useRef(1);
  const maxVisibleRef = useRef(CIRCLE_LOGOS.length);
  const landedRef = useRef(false);
  const frameTimeRef = useRef(0);
  const layoutRef = useRef({
    overlayLeft: 0,
    overlayTop: 0,
    bandLeft: 0,
    bandW: 0,
    bandTop: 0,
    bandH: 0,
    heroW: 0,
    heroH: 0,
    valid: false,
  });

  const reduced = useReducedMotion();
  const circles = useMemo(() => makeCircles(), []);

  // Phase 1: circles fall into the box (existing behavior)
  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: SPREAD_OFFSET,
  });
  const travel = useTransform(scrollYProgress, (progress) =>
    interpolateProgress(progress, CIRCLE_TRAVEL_BREAKPOINTS, CIRCLE_TRAVEL_VALUES, (t) => t),
  );

  useMotionValueEvent(travel, "change", (value) => {
    const landed = value >= 0.98;
    if (landed === landedRef.current) return;
    landedRef.current = landed;
    animate(logosLandedProgress, landed ? 1 : 0, {
      duration: landed ? 0.6 : 0.25,
      ease: "easeOut",
    });
  });

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

  const measureLayout = useCallback(() => {
    const overlay = overlayRef.current;
    const box = boxRef.current;
    if (!overlay || !box) {
      layoutRef.current.valid = false;
      return;
    }

    const oRect = overlay.getBoundingClientRect();
    const bRect = box.getBoundingClientRect();
    if (oRect.width === 0 || bRect.width === 0) {
      layoutRef.current.valid = false;
      return;
    }

    const padX = bRect.width * 0.04;
    layoutRef.current = {
      overlayLeft: oRect.left,
      overlayTop: oRect.top,
      bandLeft: bRect.left - oRect.left + padX,
      bandW: bRect.width - padX * 2,
      bandTop: bRect.top - oRect.top,
      bandH: bRect.height,
      heroW: oRect.width,
      heroH: Math.max(1, bRect.top - oRect.top),
      valid: true,
    };
    // Refs are stable; measureLayout reads layout from the DOM each call.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const place = (t: number, rest: boolean) => {
    if (!layoutRef.current.valid) {
      measureLayout();
      if (!layoutRef.current.valid) return;
    }

    const { overlayLeft, bandLeft, bandW, bandTop, bandH, heroW, heroH } =
      layoutRef.current;

    const p = rest ? 0 : clamp01(travel.get());
    const pt = rest ? 0 : clamp01(pathTravel.get());
    const ptEased = smoothstep(pt);
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

      // Hide excess circles on smaller viewports
      if (i >= maxVisibleRef.current) {
        el.style.opacity = "0";
        continue;
      }

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
            x: targetVp.x - overlayLeft,
            y: targetVp.y - layoutRef.current.overlayTop,
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
      const fallDrift = p > 0 && p < 1 ? Math.max(0, 1 - p * 2.5) : 1;
      let dx = rest
        ? 0
        : c.dax * vmin * Math.sin(t * c.fx + c.phase) * driftDampen * fallDrift;
      let dy = rest
        ? 0
        : c.day * vmin * Math.cos(t * c.fy + c.phase) * driftDampen * fallDrift;

      // Soft repulsion from hero text — only while logos are resting in the hero
      if (c.origin === "hero" && p === 0) {
        const textCx = heroW * 0.5;
        const textCy = heroH * 0.48;
        const zoneRx = heroW * 0.45;
        const zoneRy = heroH * 0.2;

        const fx = baseX + dx - textCx;
        const fy = baseY + dy - textCy;
        const nx = fx / zoneRx;
        const ny = fy / zoneRy;
        const d2 = nx * nx + ny * ny;

        if (d2 < 1 && d2 > 0.001) {
          const dist = Math.sqrt(d2);
          const push = (1 - dist) * (1 - dist) * 90;
          dx += (nx / dist) * push;
          dy += (ny / dist) * push;
        }
      }

      el.style.transform = `translate3d(${baseX + dx}px, ${
        baseY + dy
      }px, 0) translate(-50%, -50%)`;
      if (reveal) el.style.opacity = "1";
    }

    revealedRef.current = true;
  };

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      viewportRef.current = { w, h };

      // Responsive sizing: scale logos based on viewport width
      let scale: number;
      let maxVisible: number;
      if (w < 480) {
        scale = 0.5;
        maxVisible = 17;
      } else if (w < 768) {
        scale = 0.65;
        maxVisible = 20;
      } else if (w < 1024) {
        scale = 0.8;
        maxVisible = CIRCLE_LOGOS.length;
      } else {
        scale = 1;
        maxVisible = CIRCLE_LOGOS.length;
      }
      sizeScaleRef.current = scale;
      maxVisibleRef.current = maxVisible;

      // Apply sizes to elements
      for (let i = 0; i < CIRCLE_LOGOS.length; i++) {
        const el = elsRef.current[i];
        if (!el) continue;
        const s = Math.round(CIRCLE_LOGOS[i].size * scale);
        el.style.width = `${s}px`;
        el.style.height = `${s}px`;
      }
    };
    update();
    const onResize = () => {
      update();
      measureLayout();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureLayout]);

  useEffect(() => {
    measureLayout();
  }, [measureLayout]);

  useAnimationFrame((time) => {
    frameTimeRef.current = time;
    if (reduced) return;
    if (!visibleRef.current) return;
    place(time, false);
  });

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (reduced || !visibleRef.current) return;
    measureLayout();
    place(frameTimeRef.current, false);
  });

  useMotionValueEvent(pathProgress, "change", () => {
    if (reduced || !visibleRef.current) return;
    measureLayout();
    place(frameTimeRef.current, false);
  });

  useEffect(() => {
    if (!reduced) return;
    measureLayout();
    place(0, true);
    const onResize = () => {
      measureLayout();
      place(0, true);
    };
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
          className="absolute left-0 top-0 overflow-hidden rounded-full will-change-transform"
          style={{
            opacity: 0,
            width: CIRCLE_LOGOS[i].size,
            height: CIRCLE_LOGOS[i].size,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logos/${CIRCLE_LOGOS[i].file}`}
            alt=""
            className="h-full w-full object-cover"
          />
        </span>
      ))}
    </div>
  );
}
