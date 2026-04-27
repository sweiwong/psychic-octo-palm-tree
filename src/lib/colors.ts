// Design tokens mirroring the OKLCH custom properties in src/styles.css.
// Used by SVG renderer code that can't read CSS variables directly.

export const COLOR = {
  parchment:   'oklch(0.965 0.012 78)',
  parchment2:  'oklch(0.945 0.018 75)',
  parchment3:  'oklch(0.915 0.022 72)',
  ink:         'oklch(0.22 0.015 60)',
  ink2:        'oklch(0.42 0.012 60)',
  ink3:        'oklch(0.62 0.010 60)',
  rule:        'oklch(0.86 0.015 70)',
  ruleStrong:  'oklch(0.78 0.020 70)',
  vermillion:  'oklch(0.55 0.155 32)',
  vermillion2: 'oklch(0.62 0.135 32)',
  sepia:       'oklch(0.55 0.080 65)',
  sepia2:      'oklch(0.72 0.060 70)',
  jade:        'oklch(0.58 0.060 165)',
  indigo:      'oklch(0.45 0.060 250)',
  gold:        'oklch(0.72 0.110 80)',
} as const;

export type ImportanceLevel = 1 | 2 | 3 | 4 | 5;

export function dynastyFill(importance: ImportanceLevel): string {
  if (importance >= 5) return COLOR.vermillion;
  if (importance >= 4) return COLOR.vermillion2;
  return COLOR.sepia;
}

export const SYSTEM_BAND_PALETTE = [
  'oklch(0.93 0.03 65)',
  'oklch(0.92 0.03 95)',
  'oklch(0.92 0.025 175)',
  'oklch(0.93 0.03 30)',
  'oklch(0.92 0.03 290)',
] as const;
