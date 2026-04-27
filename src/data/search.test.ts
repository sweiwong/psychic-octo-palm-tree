import { describe, it, expect } from 'vitest';
import { search } from './search';
import type { SearchEntry } from './types';

const fixtures: SearchEntry[] = [
  { id: 'R_TANG', type: 'regime', name: 'Tang', summary: 'Imperial peak', year: null, startYear: 618, endYear: 907 },
  { id: 'E_TANG_1', type: 'event', name: 'An Lushan Rebellion', summary: 'Weakens Tang', year: 755, startYear: null, endYear: null },
  { id: 'F_CONF', type: 'figure', name: 'Confucius', summary: 'Ethical philosophy', year: -551, startYear: null, endYear: null },
  { id: 'R_QIN', type: 'regime', name: 'Qin', summary: 'First empire', year: null, startYear: -221, endYear: -206 },
];

describe('search', () => {
  it('returns empty for empty query', () => {
    expect(search('', fixtures)).toEqual([]);
    expect(search('   ', fixtures)).toEqual([]);
  });

  it('matches by name (case insensitive)', () => {
    const results = search('tang', fixtures);
    const ids = results.map(r => r.id);
    expect(ids).toContain('R_TANG');
    expect(ids).toContain('E_TANG_1');  // "Weakens Tang" in summary
  });

  it('matches by summary', () => {
    const results = search('philosophy', fixtures);
    expect(results.map(r => r.id)).toEqual(['F_CONF']);
  });

  it('returns empty for no matches', () => {
    expect(search('nonsense', fixtures)).toEqual([]);
  });

  it('limits results to 30', () => {
    const many: SearchEntry[] = Array.from({ length: 50 }, (_, i) => ({
      id: `X_${i}`,
      type: 'event' as const,
      name: 'match',
      summary: '',
      year: i,
      startYear: null,
      endYear: null,
    }));
    expect(search('match', many)).toHaveLength(30);
  });
});
