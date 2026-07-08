import { describe, expect, it } from "vitest";
import {
  SPREAD_BREAKPOINTS,
  SPREAD_MARGIN_PX,
  interpolateProgress,
} from "@/components/sections/serviceReveal";

describe("interpolateProgress", () => {
  it("returns the first value before the first breakpoint", () => {
    expect(interpolateProgress(-1, SPREAD_BREAKPOINTS, SPREAD_MARGIN_PX)).toBe(
      24,
    );
  });

  it("returns the last value after the final breakpoint", () => {
    expect(interpolateProgress(2, SPREAD_BREAKPOINTS, SPREAD_MARGIN_PX)).toBe(
      24,
    );
  });

  it("interpolates between breakpoints", () => {
    const value = interpolateProgress(0.3, SPREAD_BREAKPOINTS, SPREAD_MARGIN_PX);
    expect(value).toBeGreaterThan(0);
    expect(value).toBeLessThan(24);
  });
});
