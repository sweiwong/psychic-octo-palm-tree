import { describe, it, expect } from 'vitest';
import { fmtYear, fmtRange } from './format';

describe('fmtYear', () => {
  it('formats CE years without a suffix change for positive', () => {
    expect(fmtYear(1644)).toBe('1644 CE');
  });

  it('formats BCE years using absolute value', () => {
    expect(fmtYear(-221)).toBe('221 BCE');
  });

  it('formats year 1 as 1 CE', () => {
    expect(fmtYear(1)).toBe('1 CE');
  });

  it('formats year -1 as 1 BCE', () => {
    expect(fmtYear(-1)).toBe('1 BCE');
  });
});

describe('fmtRange', () => {
  it('formats a range spanning BCE to CE', () => {
    expect(fmtRange(-221, 220)).toBe('221 BCE – 220 CE');
  });

  it('formats a fully BCE range', () => {
    expect(fmtRange(-1046, -256)).toBe('1046 BCE – 256 BCE');
  });

  it('formats a fully CE range', () => {
    expect(fmtRange(960, 1279)).toBe('960 CE – 1279 CE');
  });
});
