import type { UseScrollOptions } from "motion/react";

// Scroll keyframes (fractions of the Services section's own scroll progress,
// measured with SPREAD_OFFSET) describing the black box as it spreads to
// full-bleed and shrinks back:
//   0.00–0.15  inset / narrowest
//   0.15–0.25  spreading out
//   0.25–0.80  full-bleed hold (extra long — circles settle mid-way through)
//   0.80–0.90  shrinking back
//   0.90–1.00  inset again
// Services maps these to marginX; CircleField uses its own deferred keyframes
// so circles land after the box finishes spreading.
export const SPREAD_BREAKPOINTS = [0, 0.15, 0.25, 0.80, 0.90, 1];

// The scroll offset both Services and CircleField MUST pass to useScroll for the
// breakpoints above to mean the same thing in both. Shared here so the whole
// coupling contract (keyframes + offset) lives in one place and can't drift.
export const SPREAD_OFFSET: UseScrollOptions["offset"] = ["start end", "end start"];
