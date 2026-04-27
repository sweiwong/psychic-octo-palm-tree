export function fmtYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}

export function fmtRange(start: number, end: number): string {
  return `${fmtYear(start)} – ${fmtYear(end)}`;
}
