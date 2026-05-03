import { describe, it, expect } from 'vitest';
import { fmtYear, fmtRange } from './format';

describe('fmtYear', () => {
  it('formats common-era years bare (no CE suffix)', () => {
    expect(fmtYear(1644)).toBe('1644');
  });

  it('formats BCE years using absolute value', () => {
    expect(fmtYear(-221)).toBe('221 BCE');
  });

  it('formats year 1 bare', () => {
    expect(fmtYear(1)).toBe('1');
  });

  it('formats year -1 as 1 BCE', () => {
    expect(fmtYear(-1)).toBe('1 BCE');
  });
});

describe('fmtRange', () => {
  it('formats a range spanning BCE to CE with bare CE end', () => {
    expect(fmtRange(-221, 220)).toBe('221 BCE – 220');
  });

  it('formats a fully BCE range', () => {
    expect(fmtRange(-1046, -256)).toBe('1046 BCE – 256 BCE');
  });

  it('formats a fully CE range bare', () => {
    expect(fmtRange(960, 1279)).toBe('960 – 1279');
  });
});
