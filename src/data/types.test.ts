import { describe, it, expect } from 'vitest';
import { rawDatasetSchema, type RawDataset } from './types';

describe('rawDatasetSchema', () => {
  const validMinimal: RawDataset = {
    systems: [],
    regimes: [],
    events: [],
    figures: [],
    culturalAnchors: [],
    culturalWorks: [],
    innovations: [],
    globalContext: [],
    all: [],
    meta: { sourceWorkbook: 'x', recordCount: 0, errorCount: 0, version: 9 },
  };

  it('accepts a minimal valid dataset', () => {
    expect(() => rawDatasetSchema.parse(validMinimal)).not.toThrow();
  });

  it('rejects a regime missing required fields', () => {
    const bad = {
      ...validMinimal,
      regimes: [{ id: 'R_X', name: 'X' }],  // missing many required fields
    };
    expect(() => rawDatasetSchema.parse(bad)).toThrow();
  });

  it('accepts a real regime entry', () => {
    const data = {
      ...validMinimal,
      regimes: [{
        id: 'R_TANG',
        type: 'regime' as const,
        systemId: 'sui_tang',
        name: 'Tang',
        startYear: 618,
        endYear: 907,
        year: null,
        parentId: null,
        lane: 'main' as const,
        importance: 5 as const,
        summary: 'Imperial peak',
        isPoint: false as const,
        duration: 289,
      }],
    };
    expect(() => rawDatasetSchema.parse(data)).not.toThrow();
  });

  it('accepts a real event entry', () => {
    const data = {
      ...validMinimal,
      events: [{
        id: 'E_TANG_1',
        type: 'event' as const,
        systemId: 'sui_tang',
        name: 'An Lushan Rebellion',
        startYear: null,
        endYear: null,
        year: 755,
        parentId: 'R_TANG',
        lane: 'event' as const,
        importance: 5 as const,
        summary: 'Weakens Tang',
        isPoint: true as const,
        duration: 0,
      }],
    };
    expect(() => rawDatasetSchema.parse(data)).not.toThrow();
  });
});
