import type { UseScrollOptions } from "motion/react";
import { smoothstep } from "@/lib/math";

// Scroll keyframes (fractions of the Services section's own scroll progress,
// measured with SPREAD_OFFSET) describing the black box as it spreads to
// full-bleed and shrinks back:
//   0.00–0.25  inset / narrowest
//   0.25–0.35  spreading out
//   0.35–0.80  full-bleed hold (extra long — circles settle mid-way through)
//   0.80–0.90  shrinking back
//   0.90–1.00  inset again
// Services maps these to marginX; CircleField uses its own deferred keyframes
// so circles land after the box finishes spreading.
export const SPREAD_BREAKPOINTS = [0, 0.25, 0.35, 0.8, 0.9, 1] as const;
export const SPREAD_MARGIN_PX = [8, 8, 0, 0, 8, 8] as const;

// CircleField defers hero-circle travel until the box finishes spreading, then
// completes the fall in a shorter window so logos don't lag behind scroll.
export const CIRCLE_TRAVEL_BREAKPOINTS = [0, 0.35, 0.43, 0.8, 0.88, 1] as const;
export const CIRCLE_TRAVEL_VALUES = [0, 0, 1, 1, 0, 0] as const;

// The scroll offset both Services and CircleField MUST pass to useScroll for the
// breakpoints above to mean the same thing in both. Shared here so the whole
// coupling contract (keyframes + offset) lives in one place and can't drift.
export const SPREAD_OFFSET: UseScrollOptions["offset"] = ["start end", "end start"];

export function interpolateProgress(
  progress: number,
  breakpoints: readonly number[],
  values: readonly number[],
  easing: (t: number) => number = smoothstep,
): number {
  if (progress <= breakpoints[0]) return values[0];
  const last = breakpoints.length - 1;
  if (progress >= breakpoints[last]) return values[last];

  for (let i = 0; i < last; i++) {
    if (progress <= breakpoints[i + 1]) {
      const span = breakpoints[i + 1] - breakpoints[i];
      if (span === 0) return values[i + 1];
      const t = easing((progress - breakpoints[i]) / span);
      return values[i] + (values[i + 1] - values[i]) * t;
    }
  }

  return values[last];
}
