import { describe, expect, it } from "vitest";
import {
  NAV_WAVE_FALLOFF,
  NAV_WAVE_MAX_LIFT,
  navWaveHoveredGlobal,
  navWaveShift,
} from "@/components/layout/navWave";

describe("navWaveShift", () => {
  it("returns zero when nothing is hovered", () => {
    expect(navWaveShift(3, null)).toBe(0);
  });

  it("returns max lift on the hovered letter", () => {
    expect(navWaveShift(4, 4)).toBe(NAV_WAVE_MAX_LIFT);
  });

  it("falls off with distance", () => {
    expect(navWaveShift(5, 4)).toBe(
      NAV_WAVE_MAX_LIFT * Math.pow(NAV_WAVE_FALLOFF, 1),
    );
  });
});

describe("navWaveHoveredGlobal", () => {
  it("returns null for empty input", () => {
    expect(navWaveHoveredGlobal(100, [])).toBeNull();
  });

  it("clamps to first letter before the row", () => {
    expect(
      navWaveHoveredGlobal(0, [
        { index: 0, centerX: 10 },
        { index: 1, centerX: 20 },
      ]),
    ).toBe(0);
  });

  it("interpolates between letters in a gap", () => {
    expect(
      navWaveHoveredGlobal(15, [
        { index: 0, centerX: 10 },
        { index: 1, centerX: 20 },
      ]),
    ).toBe(0.5);
  });
});
