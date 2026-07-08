export const NAV_WAVE_MAX_LIFT = 12;
export const NAV_WAVE_FALLOFF = 0.6;

export function navWaveShift(
  globalIndex: number,
  hoveredGlobal: number | null,
): number {
  if (hoveredGlobal === null) return 0;
  return (
    NAV_WAVE_MAX_LIFT *
    Math.pow(NAV_WAVE_FALLOFF, Math.abs(globalIndex - hoveredGlobal))
  );
}

export function navWaveHoveredGlobal(
  mouseX: number,
  letters: { index: number; centerX: number }[],
): number | null {
  if (letters.length === 0) return null;

  const sorted = [...letters].sort((a, b) => a.centerX - b.centerX);

  if (mouseX <= sorted[0].centerX) return sorted[0].index;
  if (mouseX >= sorted[sorted.length - 1].centerX) {
    return sorted[sorted.length - 1].index;
  }

  for (let i = 0; i < sorted.length - 1; i++) {
    const left = sorted[i];
    const right = sorted[i + 1];
    if (mouseX >= left.centerX && mouseX <= right.centerX) {
      const span = right.centerX - left.centerX;
      if (span === 0) return left.index;
      const t = (mouseX - left.centerX) / span;
      return left.index + t * (right.index - left.index);
    }
  }

  return sorted[0].index;
}
