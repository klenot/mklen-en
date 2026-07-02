# Hero → Service Floating Circles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add small white circles that float slowly around the hero and, locked to the black service box's width animation, travel down to join a second set already floating in the box (all floating together at full-bleed), with the box copy pinned to its bottom edge.

**Architecture:** A single `CircleField` overlay owns every circle and positions them imperatively (`useAnimationFrame`, transform-only writes) across a `relative` wrapper spanning the hero and the service box. Its travel progress is read from the *same* scroll target/offset as the box (via a shared ref threaded by a thin `HeroServices` wrapper), and mapped through the box's own spread breakpoints so full-bleed = circles gathered, narrowest = circles at top. `Services` gains the shared ref and the bottom-pinned copy.

**Tech Stack:** Next.js 16, React 19, `motion` v12 (`motion/react`), Tailwind v4.

**Testing note:** This repo has no unit-test runner (only `dev`/`build`/`lint`), and the feature is inherently visual/scroll-driven. Verification for every task is `npm run lint`, `npm run build`, and on-screen checks in `npm run dev`. Pure helpers in `CircleField` are kept small and isolated so they *could* be unit-tested later if a runner is added; adding one now is out of scope.

---

### Task 1: Shared spread breakpoints constant

Single source of truth for the scroll keyframes that both the box width (`Services`) and the circle travel (`CircleField`) key off of, so they can never drift out of sync.

**Files:**
- Create: `components/sections/serviceReveal.ts`

- [ ] **Step 1: Create the constant**

```ts
// Scroll keyframes (fractions of the Services section's own scroll progress,
// measured with offset ["start end", "end start"]) describing the black box as
// it spreads to full-bleed and shrinks back:
//   0.00–0.30  inset / narrowest
//   0.30–0.45  spreading out
//   0.45–0.70  full-bleed hold
//   0.70–0.85  shrinking back
//   0.85–1.00  inset again
// Services maps these to marginX; CircleField maps them to circle travel so the
// two stay locked together. IMPORTANT: both files must also use the offset
// ["start end", "end start"] for these numbers to mean the same thing.
export const SPREAD_BREAKPOINTS = [0, 0.3, 0.45, 0.7, 0.85, 1];
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run lint`
Expected: no new errors referencing `serviceReveal.ts`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/serviceReveal.ts
git commit -m "feat: shared service-reveal spread breakpoints"
```

---

### Task 2: Services — shared ref, shared breakpoints, bottom-pinned copy

Externalize the scroll ref so `CircleField` can read the same scroll, source the margin keyframes from the shared constant, and pin the real copy to the bottom edge of the black box.

**Files:**
- Modify: `components/sections/Services.tsx`

- [ ] **Step 1: Replace the whole file**

```tsx
"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SPREAD_BREAKPOINTS } from "./serviceReveal";

export default function Services({
  sectionRef,
}: {
  // Optional shared ref so CircleField can key off the exact same scroll.
  sectionRef?: RefObject<HTMLElement | null>;
}) {
  const internalRef = useRef<HTMLElement>(null);
  const ref = sectionRef ?? internalRef;

  // progress 0 → section entering from the bottom, 1 → section leaving past the top
  // NOTE: offset must match CircleField's useScroll offset for SPREAD_BREAKPOINTS
  // to line up between the box width and the circle travel.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // rest (inset) → spread to full-bleed → hold → shrink back to rest
  const marginX = useTransform(scrollYProgress, SPREAD_BREAKPOINTS, [
    "1rem",
    "1rem",
    "0rem",
    "0rem",
    "1rem",
    "1rem",
  ]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0.3, 0.45, 0.7, 0.85],
    ["1.5rem", "0rem", "0rem", "1.5rem"]
  );

  // text fades in once full-bleed, then out again before the section shrinks
  const textOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.6, 0.72, 0.82],
    [0, 1, 1, 0]
  );

  return (
    <section ref={ref} id="services" className="py-4">
      <motion.div
        style={{ marginLeft: marginX, marginRight: marginX, borderRadius }}
        className="relative aspect-video overflow-hidden bg-black"
      >
        <motion.p
          style={{ opacity: textOpacity }}
          className="absolute inset-x-0 bottom-[12px] px-6 text-center font-mono text-white"
        >
          Today&apos;s digital space is made for people of many talents.
        </motion.p>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS, no type errors.

- [ ] **Step 3: Visual check**

Run: `npm run dev`, scroll to the service section.
Expected: black box still spreads to full-bleed and back; the copy `Today's digital space is made for people of many talents.` fades in pinned ~12px above the bottom edge (not centered).

- [ ] **Step 4: Commit**

```bash
git add components/sections/Services.tsx
git commit -m "feat: service box shared ref + bottom-pinned copy"
```

---

### Task 3: CircleField overlay

The single owner of all circles. Deterministic circle definitions (SSR-safe), travel locked to the box width via the shared breakpoints, continuous slow drift, transform-only per-frame writes, off-screen skipping, and reduced-motion static placement.

**Files:**
- Create: `components/sections/CircleField.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
  const circles = useMemo(makeCircles, []);

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
```

- [ ] **Step 2: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS. (The `exhaustive-deps` disable comment is intentional — `place` intentionally reads live refs/motion values rather than being a dependency.)

- [ ] **Step 3: Commit**

```bash
git add components/sections/CircleField.tsx
git commit -m "feat: CircleField overlay owning hero+box circles"
```

---

### Task 4: HeroServices wrapper

Thin client wrapper that owns the shared services ref and composes the hero, the overlay, and the service box in one `relative` stacking context.

**Files:**
- Create: `components/sections/HeroServices.tsx`

- [ ] **Step 1: Create the wrapper**

```tsx
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
```

- [ ] **Step 2: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/sections/HeroServices.tsx
git commit -m "feat: HeroServices wrapper sharing services scroll ref"
```

---

### Task 5: Wire into the page

Swap the inline `Hero` + `Services` for the new `HeroServices`.

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update imports**

Replace these two import lines:

```tsx
import Experiences from "@/components/sections/Experiences";
import Hero from "@/components/sections/Hero";
import PathAnimation from "@/components/sections/PathAnimation";
```

with (drop the `Hero` import, add `HeroServices`):

```tsx
import Experiences from "@/components/sections/Experiences";
import HeroServices from "@/components/sections/HeroServices";
import PathAnimation from "@/components/sections/PathAnimation";
```

- [ ] **Step 2: Remove the now-unused Services import**

Delete this line:

```tsx
import Services from "@/components/sections/Services";
```

- [ ] **Step 3: Replace the hero+services usage**

Replace:

```tsx
          <div className="relative z-10 bg-orange-400 rounded-3xl">
            <Hero />
            <Services />
            <PathAnimation />
```

with:

```tsx
          <div className="relative z-10 bg-orange-400 rounded-3xl">
            <HeroServices />
            <PathAnimation />
```

- [ ] **Step 4: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS, no unused-import warnings for `Hero`/`Services`.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: mount HeroServices with floating circles"
```

---

### Task 6: End-to-end visual verification & tuning

**Files:** none (verification only; tune constants in `CircleField.tsx` if needed)

- [ ] **Step 1: Run the app**

Run: `npm run dev`

- [ ] **Step 2: Verify the choreography**

Check, at the top of the page and while scrolling into the service section:
- ~7 small white circles drift slowly over the hero (including over the hero text).
- ~7 more are already floating inside the black box.
- As the box spreads toward full-bleed, the hero circles travel down and gather inside the box; at full-bleed all ~14 float together above the bottom copy.
- Scrolling back up reverses it (circles rise back toward the hero as the box narrows).
- Circles never cover the bottom copy and stay within the black box when gathered.

- [ ] **Step 3: Verify responsive + reduced motion**

- Resize to a narrow (mobile) width: circles stay small and the effect still reads.
- Enable OS "Reduce Motion": circles render static (hero ones in the hero, box ones in the box), no drift or travel.

- [ ] **Step 4: Tune if needed, then commit any adjustments**

If gather positioning needs nudging, adjust `boxSlot` ranges, `padX`, or `HERO_COUNT`/`BOX_COUNT` in `CircleField.tsx`.

```bash
git add components/sections/CircleField.tsx
git commit -m "chore: tune floating circle layout"
```

(Skip this commit if no changes were needed.)
