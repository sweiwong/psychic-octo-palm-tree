import { describe, it, expect } from 'vitest';
import { ROW_BREAKS, rowsFor, locate, clipRange, ticksFor } from './layout';

describe('ROW_BREAKS', () => {
  it('has seven breakpoints producing six rows', () => {
    expect(ROW_BREAKS).toHaveLength(7);
    expect(ROW_BREAKS[0]).toBe(-2070);
    expect(ROW_BREAKS[ROW_BREAKS.length - 1]).toBe(2030);
  });
});

describe('rowsFor', () => {
  it('produces six rows with start/end pairs', () => {
    const rows = rowsFor();
    expect(rows).toHaveLength(6);
    expect(rows[0]).toEqual({ index: 0, start: -2070, end: -1000 });
    expect(rows[5]).toEqual({ index: 5, start: 1700, end: 2030 });
  });
});

describe('locate', () => {
  it('locates a year inside the first row', () => {
    expect(locate(-1500)).toEqual({ rowIndex: 0, frac: expect.closeTo(0.5327, 3) });
  });

  it('locates a year inside the last row', () => {
    expect(locate(1900)).toEqual({ rowIndex: 5, frac: expect.closeTo(0.6061, 3) });
  });

  it('clamps a year past the final breakpoint into the last row', () => {
    const result = locate(2050);
    expect(result.rowIndex).toBe(5);
    expect(result.frac).toBeLessThanOrEqual(1);
  });
});

describe('clipRange', () => {
  it('clips a single-row range into one segment', () => {
    const segs = clipRange(-221, -206);
    expect(segs).toHaveLength(1);
    expect(segs[0].rowIndex).toBe(1);
    expect(segs[0].isStart).toBe(true);
    expect(segs[0].isEnd).toBe(true);
  });

  it('clips a multi-row range into multiple segments', () => {
    // Han: 206 BCE to 220 CE spans rows 1 and 2 (-200 boundary)
    const segs = clipRange(-206, 220);
    expect(segs.length).toBeGreaterThanOrEqual(2);
    expect(segs[0].rowIndex).toBe(1);
    expect(segs[0].isStart).toBe(true);
    expect(segs[0].isEnd).toBe(false);
    const last = segs[segs.length - 1];
    expect(last.isEnd).toBe(true);
  });

  it('returns segments with x0 < x1 in [0, 1]', () => {
    const segs = clipRange(-1046, -256);
    for (const s of segs) {
      expect(s.x0).toBeGreaterThanOrEqual(0);
      expect(s.x1).toBeLessThanOrEqual(1);
      expect(s.x0).toBeLessThan(s.x1);
    }
  });
});

describe('ticksFor', () => {
  it('produces century ticks for a 1000+ year row', () => {
    const ticks = ticksFor({ index: 0, start: -2070, end: -1000 });
    expect(ticks).toContain(-2000);
    expect(ticks).toContain(-1500);
    expect(ticks).toContain(-1100);
    expect(ticks).not.toContain(0);
  });

  it('produces tighter ticks for a smaller row', () => {
    const ticks = ticksFor({ index: 5, start: 1700, end: 2030 });
    expect(ticks).toContain(1750);
    expect(ticks).toContain(1900);
    expect(ticks).toContain(2000);
  });
});
