import {
  rawDatasetSchema,
  type RawDataset,
  type NormalizedData,
  type NormalizedSpanItem,
  type NormalizedPointItem,
  type NormalizedSystem,
  type SourceLane,
  type RenderLane,
  type SearchEntry,
  type SourceSpanEntity,
  type SourcePointEntity,
} from './types';

const SOURCE_TO_RENDER_LANE: Record<SourceLane, RenderLane> = {
  main: 'main',
  north: 'above',
  west: 'above2',
  south: 'below',
  event: 'event',
  figure: 'figure',
  anchor: 'anchor',
  global: 'global',
};

function spanToRenderable(r: SourceSpanEntity, renderLane: RenderLane): NormalizedSpanItem {
  return {
    id: r.id,
    type: r.type,
    name: r.name,
    start: r.startYear,
    end: r.endYear,
    duration: r.duration,
    importance: r.importance,
    systemId: r.systemId,
    parentId: r.parentId,
    sourceLane: r.lane,
    renderLane,
    summary: r.summary,
  };
}

function pointToRenderable(p: SourcePointEntity): NormalizedPointItem {
  return {
    id: p.id,
    type: p.type,
    name: p.name,
    year: p.year,
    importance: p.importance,
    systemId: p.systemId,
    parentId: p.parentId,
    renderLane: SOURCE_TO_RENDER_LANE[p.lane],
    summary: p.summary,
  };
}

function spanSearchEntry(r: SourceSpanEntity): SearchEntry {
  return {
    id: r.id,
    type: r.type,
    name: r.name,
    summary: r.summary,
    year: null,
    startYear: r.startYear,
    endYear: r.endYear,
  };
}

function pointSearchEntry(p: SourcePointEntity): SearchEntry {
  return {
    id: p.id,
    type: p.type,
    name: p.name,
    summary: p.summary,
    year: p.year,
    startYear: null,
    endYear: null,
  };
}

export function normalize(raw: RawDataset): NormalizedData {
  // Find umbrella regimes that have main-lane children, so we can hide them.
  const childMainCount = new Map<string, number>();
  for (const r of raw.regimes) {
    if (r.lane === 'main' && r.parentId) {
      childMainCount.set(r.parentId, (childMainCount.get(r.parentId) ?? 0) + 1);
    }
  }

  const primary: NormalizedSpanItem[] = [];
  const concurrent: NormalizedSpanItem[] = [];

  for (const r of raw.regimes) {
    if (r.lane === 'main') {
      if (childMainCount.has(r.id)) continue;  // umbrella with main-lane children, skip
      primary.push(spanToRenderable(r, 'main'));
    } else {
      const renderLane = SOURCE_TO_RENDER_LANE[r.lane];
      concurrent.push(spanToRenderable(r, renderLane));
    }
  }

  const events = raw.events.map(pointToRenderable);
  const figures = raw.figures.map(pointToRenderable);
  const culture = raw.culturalAnchors.map(pointToRenderable);
  const inventions = raw.innovations.map(pointToRenderable);
  const global = raw.globalContext.map(pointToRenderable);

  const systems: NormalizedSystem[] = raw.systems.map(s => ({
    id: s.id,
    systemId: s.systemId ?? s.id,
    name: s.name,
    start: s.startYear,
    end: s.endYear,
    summary: s.summary,
  }));

  // Children-by-parent index. Parents may be regimes or systems.
  const childrenByParent = new Map<string, NormalizedPointItem[]>();
  for (const child of [...events, ...figures, ...culture]) {
    if (!child.parentId) continue;
    const arr = childrenByParent.get(child.parentId) ?? [];
    arr.push(child);
    childrenByParent.set(child.parentId, arr);
  }

  // Flat search index across every kind we want to search.
  const searchIndex: SearchEntry[] = [
    ...raw.regimes.filter(r => !childMainCount.has(r.id)).map(spanSearchEntry),
    ...raw.events.map(pointSearchEntry),
    ...raw.figures.map(pointSearchEntry),
    ...raw.culturalAnchors.map(pointSearchEntry),
    ...raw.innovations.map(pointSearchEntry),
    ...raw.globalContext.map(pointSearchEntry),
  ];

  return {
    primary,
    concurrent,
    systems,
    events,
    figures,
    culture,
    inventions,
    global,
    childrenByParent,
    searchIndex,
  };
}

export async function loadHistoryData(
  url = '/china-history.json'
): Promise<NormalizedData> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load dataset: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  const validated = rawDatasetSchema.parse(json);
  return normalize(validated);
}
