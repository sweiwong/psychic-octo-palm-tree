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
