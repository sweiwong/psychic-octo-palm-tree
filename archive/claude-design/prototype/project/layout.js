// Wrapped multi-row timeline layout engine.
// Splits the [-2070 .. 2026] span into N rows where each row covers a fixed
// year range. Items spanning a row boundary are clipped per-row so the bar
// continues seamlessly into the next row below.

window.LAYOUT = (function () {
  // Row breakpoints. Eras get tighter density toward the present, so each
  // successive row covers fewer years (more screen-time per dynasty).
  const ROW_BREAKS = [
    -2070,   // Row 0 start
    -1000,   // Row 0 ends, Row 1 begins  (1070 yrs: Xia / Shang / W.Zhou)
    -200,    // Row 1: late Zhou / Warring States / Qin (800 yrs)
     500,    // Row 2: Han -> Northern & Southern (700 yrs)
    1100,    // Row 3: Sui / Tang / Five Dynasties / N.Song (600 yrs)
    1700,    // Row 4: S.Song / Yuan / Ming / early Qing (600 yrs)
    2030,    // Row 5: late Qing / Republic / PRC (330 yrs — denser modern era)
  ];

  function rowsFor() {
    const rows = [];
    for (let i = 0; i < ROW_BREAKS.length - 1; i++) {
      rows.push({ index: i, start: ROW_BREAKS[i], end: ROW_BREAKS[i + 1] });
    }
    return rows;
  }

  // Map a year to {rowIndex, fraction (0..1)}
  function locate(year) {
    const rows = rowsFor();
    for (const r of rows) {
      if (year >= r.start && year < r.end) {
        return { rowIndex: r.index, frac: (year - r.start) / (r.end - r.start) };
      }
    }
    // clamp to last row
    const last = rows[rows.length - 1];
    return { rowIndex: last.index, frac: Math.min(1, (year - last.start) / (last.end - last.start)) };
  }

  // Clip a [start..end] year range into one or more row segments.
  // Returns array of { rowIndex, x0, x1, isStart, isEnd } where x0/x1 are 0..1
  // fractions within that row.
  function clipRange(yStart, yEnd) {
    const rows = rowsFor();
    const out = [];
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

  // Year tick labels for a row — every N years, picking a sensible step
  function ticksFor(row) {
    const span = row.end - row.start;
    let step;
    if (span > 900) step = 200;
    else if (span > 500) step = 100;
    else step = 50;
    const ticks = [];
    const first = Math.ceil(row.start / step) * step;
    for (let y = first; y < row.end; y += step) {
      if (y === 0) continue; // there is no year zero
      ticks.push(y);
    }
    return ticks;
  }

  function fmtYear(y) {
    if (y < 0) return Math.abs(y) + " BCE";
    return y + " CE";
  }
  function fmtRange(a, b) {
    return fmtYear(a) + " – " + fmtYear(b);
  }

  return { ROW_BREAKS, rowsFor, locate, clipRange, ticksFor, fmtYear, fmtRange };
})();
