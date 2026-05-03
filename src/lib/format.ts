// Common-era years render bare (e.g. "1644"); BCE years carry a suffix.
// The asymmetry is intentional: a viewer scanning a chart of Chinese history
// infers the convention from one BCE pill plus one bare-year pill, which is
// quieter than redundant "CE" everywhere.

export function fmtYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year}`;
}

export function fmtRange(start: number, end: number): string {
  return `${fmtYear(start)} – ${fmtYear(end)}`;
}
