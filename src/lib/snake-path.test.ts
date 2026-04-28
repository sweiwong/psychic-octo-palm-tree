import { describe, it, expect } from 'vitest';
import { computeGeometry } from './snake-path';

describe('computeGeometry', () => {
  it('computes derived values for the default geometry', () => {
    const g = computeGeometry({
      width: 660,
      height: 700,
      padding: 40,
      rowCount: 4,
      yearMin: -2070,
      yearMax: 2026,
    });
    expect(g.rowHeight).toBeCloseTo(155, 4);
    expect(g.cornerRadius).toBeCloseTo(77.5, 4);
    expect(g.trackWidth).toBeCloseTo(425, 4);
    expect(g.arcLength).toBeCloseTo(Math.PI * 77.5, 4);
    expect(g.totalPathLength).toBeCloseTo(4 * 425 + 3 * Math.PI * 77.5, 4);
    expect(g.pxPerYear).toBeCloseTo(g.totalPathLength / 4096, 6);
  });

  it('computes row centerline y values', () => {
    const g = computeGeometry({
      width: 660, height: 700, padding: 40,
      rowCount: 4, yearMin: -2070, yearMax: 2026,
    });
    expect(g.rowCenterlines).toEqual([117.5, 272.5, 427.5, 582.5]);
  });

  it('computes bend center coordinates', () => {
    const g = computeGeometry({
      width: 660, height: 700, padding: 40,
      rowCount: 4, yearMin: -2070, yearMax: 2026,
    });
    expect(g.bendCenters).toHaveLength(3);
    expect(g.bendCenters[0]).toEqual({ x: 542.5, y: 195, side: 'right' });
    expect(g.bendCenters[1]).toEqual({ x: 117.5, y: 350, side: 'left' });
    expect(g.bendCenters[2]).toEqual({ x: 542.5, y: 505, side: 'right' });
  });
});

import { yearToDistance, distanceToPoint } from './snake-path';

describe('yearToDistance', () => {
  const g = computeGeometry({
    width: 660, height: 700, padding: 40,
    rowCount: 4, yearMin: -2070, yearMax: 2026,
  });

  it('returns 0 for yearMin', () => {
    expect(yearToDistance(-2070, g)).toBe(0);
  });

  it('returns totalPathLength for yearMax', () => {
    expect(yearToDistance(2026, g)).toBeCloseTo(g.totalPathLength, 4);
  });

  it('scales linearly between yearMin and yearMax', () => {
    const mid = yearToDistance(-22, g); // halfway through the year range
    expect(mid).toBeCloseTo(g.totalPathLength / 2, 1);
  });
});

describe('distanceToPoint', () => {
  const g = computeGeometry({
    width: 660, height: 700, padding: 40,
    rowCount: 4, yearMin: -2070, yearMax: 2026,
  });

  it('returns row 0 start at distance 0', () => {
    const p = distanceToPoint(0, g);
    expect(p.x).toBeCloseTo(117.5, 4);
    expect(p.y).toBeCloseTo(117.5, 4);
  });

  it('returns row 0 end at distance trackWidth', () => {
    const p = distanceToPoint(g.trackWidth, g);
    expect(p.x).toBeCloseTo(542.5, 4);
    expect(p.y).toBeCloseTo(117.5, 4);
  });

  it('returns rightmost point on bend 0 at distance trackWidth + arcLength/2', () => {
    const p = distanceToPoint(g.trackWidth + g.arcLength / 2, g);
    expect(p.x).toBeCloseTo(620, 4); // 542.5 + 77.5
    expect(p.y).toBeCloseTo(195, 4); // bend 0 center y
  });

  it('returns row 1 start (right side) at distance trackWidth + arcLength', () => {
    const p = distanceToPoint(g.trackWidth + g.arcLength, g);
    expect(p.x).toBeCloseTo(542.5, 4);
    expect(p.y).toBeCloseTo(272.5, 4);
  });

  it('returns row 1 end (left side) at distance 2*trackWidth + arcLength', () => {
    const p = distanceToPoint(2 * g.trackWidth + g.arcLength, g);
    expect(p.x).toBeCloseTo(117.5, 4);
    expect(p.y).toBeCloseTo(272.5, 4);
  });

  it('returns leftmost point on bend 1 at distance 2*trackWidth + 1.5*arcLength', () => {
    const p = distanceToPoint(2 * g.trackWidth + 1.5 * g.arcLength, g);
    expect(p.x).toBeCloseTo(40, 4); // 117.5 - 77.5
    expect(p.y).toBeCloseTo(350, 4);
  });

  it('returns row 3 end at totalPathLength', () => {
    const p = distanceToPoint(g.totalPathLength, g);
    expect(p.x).toBeCloseTo(117.5, 4);
    expect(p.y).toBeCloseTo(582.5, 4);
  });
});

import { yearToPoint } from './snake-path';

describe('yearToPoint', () => {
  const g = computeGeometry({
    width: 660, height: 700, padding: 40,
    rowCount: 4, yearMin: -2070, yearMax: 2026,
  });

  it('returns rightward tangent on row 0', () => {
    const p = yearToPoint(-2000, g);
    expect(p.tangent.x).toBeCloseTo(1, 4);
    expect(p.tangent.y).toBeCloseTo(0, 4);
  });

  it('returns leftward tangent on row 1', () => {
    const yearAtRow1Mid = -2070 + (1.5 * g.trackWidth + g.arcLength) / g.pxPerYear;
    const p = yearToPoint(yearAtRow1Mid, g);
    expect(p.tangent.x).toBeCloseTo(-1, 3);
    expect(p.tangent.y).toBeCloseTo(0, 3);
  });

  it('returns downward tangent at rightmost point of bend 0', () => {
    const yearAtBend0Mid = -2070 + (g.trackWidth + g.arcLength / 2) / g.pxPerYear;
    const p = yearToPoint(yearAtBend0Mid, g);
    expect(p.tangent.x).toBeCloseTo(0, 3);
    expect(p.tangent.y).toBeCloseTo(1, 3);
  });

  it('normal is perpendicular to tangent and points to greater y on horizontal segments', () => {
    const p = yearToPoint(-2000, g);
    // tangent (1, 0), normal toward greater y = (0, 1)
    expect(p.normal.x).toBeCloseTo(0, 4);
    expect(p.normal.y).toBeCloseTo(1, 4);
  });
});

import { backbonePath } from './snake-path';

describe('backbonePath', () => {
  const g = computeGeometry({
    width: 660, height: 700, padding: 40,
    rowCount: 4, yearMin: -2070, yearMax: 2026,
  });

  it('starts with M at row 0 left endpoint', () => {
    const d = backbonePath(g);
    expect(d.startsWith('M 117.5 117.5')).toBe(true);
  });

  it('contains 4 line segments and 3 arc segments', () => {
    const d = backbonePath(g);
    const lineCount = (d.match(/\bL\b/g) ?? []).length;
    const arcCount = (d.match(/\bA\b/g) ?? []).length;
    expect(lineCount).toBe(4);
    expect(arcCount).toBe(3);
  });

  it('ends at row 3 left endpoint', () => {
    const d = backbonePath(g);
    expect(d.trimEnd().endsWith('L 117.5 582.5')).toBe(true);
  });
});
