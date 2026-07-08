import { describe, expect, it } from "vitest";
import { clamp01, smoothstep } from "./math";

describe("clamp01", () => {
  it("clamps below zero", () => {
    expect(clamp01(-1)).toBe(0);
  });

  it("clamps above one", () => {
    expect(clamp01(2)).toBe(1);
  });

  it("passes through values in range", () => {
    expect(clamp01(0.5)).toBe(0.5);
  });
});

describe("smoothstep", () => {
  it("returns 0 at start", () => {
    expect(smoothstep(0)).toBe(0);
  });

  it("returns 1 at end", () => {
    expect(smoothstep(1)).toBe(1);
  });

  it("returns 0.5 at midpoint", () => {
    expect(smoothstep(0.5)).toBe(0.5);
  });
});
