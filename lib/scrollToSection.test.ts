import { describe, expect, it } from "vitest";
import { computeScrollTarget } from "./scrollToSection";

describe("computeScrollTarget", () => {
  it("scrolls to document top for first-panel targets", () => {
    expect(
      computeScrollTarget({
        targetInFirstPanel: true,
        revealHeight: 3000,
        offsetInAncestor: 0,
        fallbackDocTop: 1200,
        hasScrollDrivenSticky: false,
        offsetInPanel: 0,
      }),
    ).toBe(1200);
  });

  it("uses reveal height for scroll-driven sticky sections", () => {
    expect(
      computeScrollTarget({
        targetInFirstPanel: true,
        revealHeight: 3000,
        offsetInAncestor: 0,
        fallbackDocTop: 1200,
        hasScrollDrivenSticky: true,
        offsetInPanel: 120,
      }),
    ).toBe(3120);
  });

  it("uses reveal height plus ancestor offset for second-panel targets", () => {
    expect(
      computeScrollTarget({
        targetInFirstPanel: false,
        revealHeight: 3000,
        offsetInAncestor: 96,
        fallbackDocTop: 200,
        hasScrollDrivenSticky: false,
        offsetInPanel: 0,
      }),
    ).toBe(3096);
  });
});
