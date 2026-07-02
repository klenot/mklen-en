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
