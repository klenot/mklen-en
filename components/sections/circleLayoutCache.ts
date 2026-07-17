import type { PathConfig } from "./pathConfig";

export type PathLayoutCache = {
  valid: boolean;
  sectionDocTop: number;
  sectionHeight: number;
  svgDocLeft: number;
  svgDocTop: number;
  svgW: number;
  svgH: number;
  viewBoxW: number;
  viewBoxH: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export type LayoutCache = {
  valid: boolean;
  overlayWidth: number;
  overlayDocLeft: number;
  overlayDocTop: number;
  bandTop: number;
  heroW: number;
  heroH: number;
  heroSectionTop: number;
  heroSectionH: number;
  /** width / height of the services box */
  aspect: number;
  /** marginX at the moment of measure — used to correct doc tops when box height changes */
  marginAtMeasure: number;
  path: PathLayoutCache;
};

export const EMPTY_LAYOUT_CACHE: LayoutCache = {
  valid: false,
  overlayWidth: 0,
  overlayDocLeft: 0,
  overlayDocTop: 0,
  bandTop: 0,
  heroW: 0,
  heroH: 0,
  heroSectionTop: 0,
  heroSectionH: 0,
  aspect: 16 / 9,
  marginAtMeasure: 8,
  path: {
    valid: false,
    sectionDocTop: 0,
    sectionHeight: 0,
    svgDocLeft: 0,
    svgDocTop: 0,
    svgW: 0,
    svgH: 0,
    viewBoxW: 1,
    viewBoxH: 1,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  },
};

export function boxHeight(overlayWidth: number, marginPx: number, aspect: number) {
  const boxW = Math.max(0, overlayWidth - 2 * marginPx);
  return aspect > 0 ? boxW / aspect : 0;
}

export function boxBandFromMargin(
  cache: LayoutCache,
  marginPx: number,
): { bandLeft: number; bandW: number; bandTop: number; bandH: number } {
  const boxW = Math.max(0, cache.overlayWidth - 2 * marginPx);
  const boxLeft = marginPx;
  const padX = boxW * 0.04;
  return {
    bandLeft: boxLeft + padX,
    bandW: Math.max(0, boxW - padX * 2),
    bandTop: cache.bandTop,
    bandH: boxHeight(cache.overlayWidth, marginPx, cache.aspect),
  };
}

/** Doc-Y shift of everything below the services box when margin (hence box height) changes. */
export function boxHeightDelta(cache: LayoutCache, marginPx: number) {
  return (
    boxHeight(cache.overlayWidth, marginPx, cache.aspect) -
    boxHeight(cache.overlayWidth, cache.marginAtMeasure, cache.aspect)
  );
}

function svgPointInViewport(
  svgLeft: number,
  svgTop: number,
  svgW: number,
  svgH: number,
  viewBoxW: number,
  viewBoxH: number,
  x: number,
  y: number,
) {
  const scale = Math.min(svgW / viewBoxW, svgH / viewBoxH);
  const renderedW = viewBoxW * scale;
  const renderedH = viewBoxH * scale;
  const offsetX = (svgW - renderedW) / 2;
  const offsetY = (svgH - renderedH) / 2;
  return {
    x: svgLeft + offsetX + x * scale,
    y: svgTop + offsetY + y * scale,
  };
}

/**
 * Path endpoint in overlay-local coordinates.
 * Uses scrollY + cached doc positions — no layout reads.
 * Models sticky top-0: before pin (flows), while pinned (fixed in viewport),
 * and after release (glued to section bottom — not the in-flow top).
 */
export function pathEndpointLocal(
  cache: LayoutCache,
  marginPx: number,
  scrollY: number,
  scrollX: number,
  viewportH: number,
  dest: "start" | "end",
): { x: number; y: number } | null {
  const p = cache.path;
  if (!cache.valid || !p.valid || p.svgW <= 0 || p.svgH <= 0) return null;

  const delta = boxHeightDelta(cache, marginPx);
  const sectionDocTop = p.sectionDocTop + delta;
  const svgDocTop = p.svgDocTop + delta;
  const svgDocLeft = p.svgDocLeft;

  // sticky top-0 inside a tall section: pin while the section spans the viewport,
  // then release glued to the section bottom — not the in-flow top.
  const stickyOffsetY = svgDocTop - sectionDocTop;
  const sectionTopVp = sectionDocTop - scrollY;
  const pinDistance = Math.max(0, p.sectionHeight - viewportH);
  const stickShift =
    sectionTopVp >= 0
      ? 0
      : sectionTopVp <= -pinDistance
        ? pinDistance
        : -sectionTopVp;

  const svgLeft = svgDocLeft - scrollX;
  const svgTop = sectionTopVp + stickyOffsetY + stickShift;

  const vb = dest === "start" ? { x: p.startX, y: p.startY } : { x: p.endX, y: p.endY };
  const vp = svgPointInViewport(
    svgLeft,
    svgTop,
    p.svgW,
    p.svgH,
    p.viewBoxW,
    p.viewBoxH,
    vb.x,
    vb.y,
  );

  const overlayLeft = cache.overlayDocLeft - scrollX;
  const overlayTop = cache.overlayDocTop - scrollY;
  return { x: vp.x - overlayLeft, y: vp.y - overlayTop };
}

export function measureLayoutCache({
  overlay,
  box,
  hero,
  svg,
  pathSection,
  pathConfig,
  marginPx,
  isDesktop,
}: {
  overlay: HTMLElement;
  box: HTMLElement;
  hero: HTMLElement | null;
  svg: SVGSVGElement | null;
  pathSection: HTMLElement | null;
  pathConfig: PathConfig;
  marginPx: number;
  isDesktop: boolean;
}): LayoutCache {
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;

  const oRect = overlay.getBoundingClientRect();
  const bRect = box.getBoundingClientRect();
  if (oRect.width === 0 || bRect.width === 0) {
    return { ...EMPTY_LAYOUT_CACHE };
  }

  const heroRect = hero?.getBoundingClientRect();
  const heroSectionTop = heroRect ? heroRect.top - oRect.top : 0;
  const heroSectionH = heroRect?.height ?? Math.max(1, bRect.top - oRect.top);
  const aspect = isDesktop ? 16 / 9 : 9 / 16;

  const path: PathLayoutCache = {
    valid: false,
    sectionDocTop: 0,
    sectionHeight: 0,
    svgDocLeft: 0,
    svgDocTop: 0,
    svgW: 0,
    svgH: 0,
    viewBoxW: pathConfig.viewBox.w,
    viewBoxH: pathConfig.viewBox.h,
    startX: pathConfig.start.x,
    startY: pathConfig.start.y,
    endX: pathConfig.end.x,
    endY: pathConfig.end.y,
  };

  if (svg && pathSection) {
    const sRect = svg.getBoundingClientRect();
    const secRect = pathSection.getBoundingClientRect();
    if (sRect.width > 0 && sRect.height > 0 && secRect.height > 0) {
      path.valid = true;
      path.sectionDocTop = secRect.top + scrollY;
      path.sectionHeight = secRect.height;
      path.svgDocLeft = sRect.left + scrollX;
      path.svgDocTop = sRect.top + scrollY;
      path.svgW = sRect.width;
      path.svgH = sRect.height;
    }
  }

  return {
    valid: true,
    overlayWidth: oRect.width,
    overlayDocLeft: oRect.left + scrollX,
    overlayDocTop: oRect.top + scrollY,
    bandTop: bRect.top - oRect.top,
    heroW: oRect.width,
    heroH: Math.max(1, bRect.top - oRect.top),
    heroSectionTop,
    heroSectionH,
    aspect,
    marginAtMeasure: marginPx,
    path,
  };
}
