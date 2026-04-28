// Design tokens mirroring the OKLCH custom properties in src/styles.css.
// Used by SVG renderer code that can't read CSS variables directly.

export const COLOR = {
  parchment:   'oklch(0.99 0 0)',
  parchment2:  'oklch(0.975 0 0)',
  parchment3:  'oklch(0.94 0 0)',
  ink:         'oklch(0.22 0.015 60)',
  ink2:        'oklch(0.42 0.012 60)',
  ink3:        'oklch(0.62 0.010 60)',
  rule:        'oklch(0.86 0.015 70)',
  ruleStrong:  'oklch(0.78 0.020 70)',
  vermillion:  'oklch(0.55 0.155 32)',
  vermillion2: 'oklch(0.62 0.135 32)',
  vermillion3: 'oklch(0.50 0.115 350)',
  sepia:       'oklch(0.55 0.080 65)',
  sepia2:      'oklch(0.72 0.060 70)',
  jade:        'oklch(0.58 0.060 165)',
  indigo:      'oklch(0.45 0.060 250)',
  gold:        'oklch(0.72 0.110 80)',
  cobalt:      'oklch(0.62 0.11 252)',
  orange:      'oklch(0.72 0.13 42)',
} as const;

export type ImportanceLevel = 1 | 2 | 3 | 4 | 5;

export function dynastyFill(importance: ImportanceLevel): string {
  if (importance >= 5) return COLOR.vermillion;
  if (importance >= 4) return COLOR.vermillion2;
  return COLOR.sepia;
}

const NON_HAN_DYNASTY_IDS = new Set(['R_YUAN', 'R_QING']);

export function dynastyStripeFill(id: string, indexInSortedPrimary: number): string {
  if (NON_HAN_DYNASTY_IDS.has(id)) return COLOR.vermillion3;
  return indexInSortedPrimary % 2 === 0 ? COLOR.cobalt : COLOR.orange;
}

export const SYSTEM_BAND_PALETTE = [
  'oklch(0.93 0.03 65)',
  'oklch(0.92 0.03 95)',
  'oklch(0.92 0.025 175)',
  'oklch(0.93 0.03 30)',
  'oklch(0.92 0.03 290)',
] as const;
