// Wrapped multi-row timeline layout math.
// Splits the [-2070, 2030] span into six rows. Items spanning a row boundary
// are clipped per row so a long bar continues seamlessly into the next row.

export const ROW_BREAKS = [
  -2070,   // Row 0 start
  -1000,   // Row 0 end / Row 1 start  (1070 yrs: Xia / Shang / W.Zhou)
  -200,    // Row 1 end                 (800 yrs: late Zhou / Warring States / Qin)
   500,    // Row 2 end                 (700 yrs: Han / disunion)
  1100,    // Row 3 end                 (600 yrs: Sui / Tang / N.Song)
  1700,    // Row 4 end                 (600 yrs: S.Song / Yuan / Ming / early Qing)
  2030,    // Row 5 end                 (330 yrs: late Qing / ROC / PRC)
] as const;

export interface Row {
  index: number;
  start: number;
  end: number;
}

export interface YearLocation {
  rowIndex: number;
  frac: number;  // 0..1 within the row
}

export interface RangeSegment {
  rowIndex: number;
  x0: number;     // 0..1 start fraction in row
  x1: number;     // 0..1 end fraction in row
  isStart: boolean;
  isEnd: boolean;
}

export function rowsFor(): Row[] {
  const rows: Row[] = [];
  for (let i = 0; i < ROW_BREAKS.length - 1; i++) {
    rows.push({ index: i, start: ROW_BREAKS[i], end: ROW_BREAKS[i + 1] });
  }
  return rows;
}

export function locate(year: number): YearLocation {
  const rows = rowsFor();
  for (const r of rows) {
    if (year >= r.start && year < r.end) {
      return { rowIndex: r.index, frac: (year - r.start) / (r.end - r.start) };
    }
  }
  const last = rows[rows.length - 1];
  return {
    rowIndex: last.index,
    frac: Math.min(1, (year - last.start) / (last.end - last.start)),
  };
}

export function clipRange(yStart: number, yEnd: number): RangeSegment[] {
  const rows = rowsFor();
  const out: RangeSegment[] = [];
  for (const r of rows) {
    const a = Math.max(yStart, r.start);
    const b = Math.min(yEnd, r.end);
    if (a < b) {
      out.push({
        rowIndex: r.index,
        x0: (a - r.start) / (r.end - r.start),
        x1: (b - r.start) / (r.end - r.start),
        isStart: a === yStart,
        isEnd: b === yEnd,
      });
    }
  }
  return out;
}

export function ticksFor(row: Row): number[] {
  const span = row.end - row.start;
  const step = span > 500 ? 100 : 50;
  const ticks: number[] = [];
  const first = Math.ceil(row.start / step) * step;
  for (let y = first; y < row.end; y += step) {
    if (y === 0) continue;  // there is no year zero
    ticks.push(y);
  }
  return ticks;
}
