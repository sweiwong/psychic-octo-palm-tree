import { describe, it, expect } from 'vitest';
import { normalize } from './load';
import tinyDataset from './__fixtures__/tiny-dataset.json';
import { rawDatasetSchema } from './types';

describe('normalize', () => {
  const raw = rawDatasetSchema.parse(tinyDataset);
  const data = normalize(raw);

  it('hides umbrella regimes with main-lane children', () => {
    const ids = data.primary.map(r => r.id);
    expect(ids).not.toContain('R_ZHOU');     // Zhou is umbrella with main-lane child SR_ZHOU_W
    expect(ids).toContain('SR_ZHOU_W');       // child stays
    expect(ids).toContain('R_QIN');           // Qin has no children, stays
  });

  it('maps north lane to render lane "above"', () => {
    const liao = data.concurrent.find(r => r.id === 'R_LIAO');
    expect(liao).toBeDefined();
    expect(liao!.renderLane).toBe('above');
  });

  it('puts main-lane regimes in primary, others in concurrent', () => {
    const primaryIds = data.primary.map(r => r.id);
    const concurrentIds = data.concurrent.map(r => r.id);
    expect(primaryIds).toContain('SR_ZHOU_W');
    expect(concurrentIds).toContain('R_LIAO');
  });

  it('builds the children-by-parent index', () => {
    const children = data.childrenByParent.get('R_QIN');
    expect(children).toBeDefined();
    expect(children!.map(c => c.id)).toContain('E_QIN_1');
  });

  it('builds a search index covering all entity kinds', () => {
    const ids = data.searchIndex.map(s => s.id);
    expect(ids).toContain('SR_ZHOU_W');
    expect(ids).toContain('R_LIAO');
    expect(ids).toContain('R_QIN');
    expect(ids).toContain('E_QIN_1');
  });

  it('exposes systems for era bands', () => {
    expect(data.systems).toHaveLength(1);
    expect(data.systems[0].name).toBe('Qin-Han system');
  });
});
