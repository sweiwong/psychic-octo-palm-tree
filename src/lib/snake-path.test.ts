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

  it('alternates arc sweep flag so right bends bulge right and left bends bulge left', () => {
    const d = backbonePath(g);
    // Each arc command has the form: A r r 0 0 <sweep> x y
    const arcMatches = [...d.matchAll(/A\s+\S+\s+\S+\s+\S+\s+\S+\s+(\S+)\s+\S+\s+\S+/g)];
    const sweepFlags = arcMatches.map(m => m[1]);
    // Bends 0,1,2 are right, left, right (4 rows: right, left, right, left).
    expect(sweepFlags).toEqual(['1', '0', '1']);
  });
});

import { segmentPath, labelPath } from './snake-path';

describe('segmentPath', () => {
  const g = computeGeometry({
    width: 660, height: 700, padding: 40,
    rowCount: 4, yearMin: -2070, yearMax: 2026,
  });

  it('produces a single line for a year range entirely within row 0', () => {
    const d = segmentPath(-2070, -1500, g);
    expect(d).toMatch(/^M /);
    expect((d.match(/\bL\b/g) ?? []).length).toBe(1);
    expect((d.match(/\bA\b/g) ?? []).length).toBe(0);
  });

  it('produces line + arc + line for a range spanning bend 0', () => {
    // Han: -202 to 220 spans bend 1 (around year 0).
    // Pick a range crossing bend 0 instead: row 0 ends near year -1354.
    const d = segmentPath(-1500, -800, g);
    expect((d.match(/\bL\b/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect((d.match(/\bA\b/g) ?? []).length).toBeGreaterThanOrEqual(1);
  });

  it('produces an offset path when yOffset is provided', () => {
    const main = segmentPath(-2070, -1500, g);
    const offset = segmentPath(-2070, -1500, g, 20);
    // Offset path's y values should be shifted by +20 vs main.
    // Both start with M, extract first y from each.
    const mainY = parseFloat(main.match(/^M [\d.-]+ ([\d.-]+)/)![1]);
    const offsetY = parseFloat(offset.match(/^M [\d.-]+ ([\d.-]+)/)![1]);
    expect(offsetY).toBeCloseTo(mainY + 20, 4);
  });

  it('starts at the start year position', () => {
    const d = segmentPath(-2000, -1500, g);
    const startMatch = d.match(/^M ([\d.-]+) ([\d.-]+)/);
    expect(startMatch).not.toBeNull();
    const expected = yearToPoint(-2000, g);
    expect(parseFloat(startMatch![1])).toBeCloseTo(expected.x, 2);
    expect(parseFloat(startMatch![2])).toBeCloseTo(expected.y, 2);
  });
});

describe('labelPath', () => {
  // Use a 4-row geometry with a 200px row height (matches production layout).
  // With these inputs: trackWidth = 380, arcLength = π*100, pxPerYear ≈ 0.6012.
  // Row 0 carries roughly years -2070 to -1438 (LTR).
  // Row 1 carries roughly years -915 to -283 (RTL).
  // Row 2 carries roughly years 240 to 872 (LTR).
  // Row 3 carries roughly years 1395 to 2026 (RTL).
  const g = computeGeometry({
    width: 660, height: 880, padding: 40,
    rowCount: 4, yearMin: -2070, yearMax: 2026,
  });

  function firstM(d: string): { x: number; y: number } {
    const m = d.match(/^M ([\d.-]+) ([\d.-]+)/);
    if (!m) throw new Error('no M command in path');
    return { x: parseFloat(m[1]), y: parseFloat(m[2]) };
  }

  it('returns the same path as segmentPath when midpoint is on a left-to-right row (row 0)', () => {
    const yearStart = -2000;
    const yearEnd = -1500;
    const seg = segmentPath(yearStart, yearEnd, g);
    const lab = labelPath(yearStart, yearEnd, g);
    expect(lab).toBe(seg);
  });

  it('reverses the path when midpoint is on a right-to-left row (row 1)', () => {
    const yearStart = -800;
    const yearEnd = -200;
    const seg = segmentPath(yearStart, yearEnd, g);
    const lab = labelPath(yearStart, yearEnd, g);
    expect(lab).not.toBe(seg);
    // Forward path starts at the dynasty's startYear, which is screen-right on
    // an RTL row; reversed label rail starts at endYear, which is screen-left.
    const segStart = firstM(seg);
    const labStart = firstM(lab);
    expect(labStart.x).toBeLessThan(segStart.x);
  });

  it('reverses the path when midpoint is on a right-to-left row (row 3)', () => {
    const yearStart = 1500;
    const yearEnd = 1800;
    const seg = segmentPath(yearStart, yearEnd, g);
    const lab = labelPath(yearStart, yearEnd, g);
    expect(lab).not.toBe(seg);
    const segStart = firstM(seg);
    const labStart = firstM(lab);
    expect(labStart.x).toBeLessThan(segStart.x);
  });

  it('matches segmentPath for an empty (zero-length) year range', () => {
    // segmentPath returns a degenerate "M x y L x y" for yearStart === yearEnd.
    // labelPath has no direction to reverse, so it should return the same string.
    const seg = segmentPath(1500, 1500, g);
    const lab = labelPath(1500, 1500, g);
    expect(lab).toBe(seg);
  });

  it("reversed path's start point matches forward path's end point", () => {
    // Pick a row-1 dynasty so labelPath actually reverses.
    const yearStart = -800;
    const yearEnd = -200;
    const seg = segmentPath(yearStart, yearEnd, g);
    const lab = labelPath(yearStart, yearEnd, g);
    // Forward path's last point: parse the trailing coordinate pair from
    // either the final L or A command.
    const tokens = seg.split(/\s+/).filter((t) => t.length > 0);
    const lastY = parseFloat(tokens[tokens.length - 1]);
    const lastX = parseFloat(tokens[tokens.length - 2]);
    const labStart = firstM(lab);
    expect(labStart.x).toBeCloseTo(lastX, 4);
    expect(labStart.y).toBeCloseTo(lastY, 4);
  });
});
