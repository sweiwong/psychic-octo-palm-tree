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
  type SubPeriod,
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
  // Index main-lane parent → children so we can detect umbrella regimes.
  const mainChildrenByParent = new Map<string, SourceSpanEntity[]>();
  for (const r of raw.regimes) {
    if (r.lane === 'main' && r.parentId) {
      const arr = mainChildrenByParent.get(r.parentId) ?? [];
      arr.push(r);
      mainChildrenByParent.set(r.parentId, arr);
    }
  }
  const regimeById = new Map<string, SourceSpanEntity>();
  for (const r of raw.regimes) regimeById.set(r.id, r);

  // A regime is a TOP-LEVEL umbrella if it has no parent and has main-lane
  // children. Top-level umbrellas (e.g. Zhou) are skipped; their children
  // (Western Zhou, Eastern Zhou) render in their place.
  // Sub-period regimes (e.g. Spring and Autumn nested under Eastern Zhou) are
  // also skipped — they only render as italic sub-period labels along their
  // parent's bar.
  function isTopLevelUmbrella(r: SourceSpanEntity): boolean {
    return r.parentId === null && mainChildrenByParent.has(r.id);
  }
  function isSubPeriodOfRendered(r: SourceSpanEntity): boolean {
    if (!r.parentId) return false;
    const parent = regimeById.get(r.parentId);
    if (!parent) return false;             // parent is a system (e.g. S_SONG); render the regime
    if (parent.lane !== 'main') return false;
    return !isTopLevelUmbrella(parent);
  }

  const primary: NormalizedSpanItem[] = [];
  const concurrent: NormalizedSpanItem[] = [];

  for (const r of raw.regimes) {
    if (r.lane === 'main') {
      if (isTopLevelUmbrella(r)) continue;        // skip Zhou; render its children
      if (isSubPeriodOfRendered(r)) continue;     // skip Spring/Autumn, Warring States
      const item = spanToRenderable(r, 'main');
      // Attach any sub-periods (children of this regime that we just skipped).
      const kids = mainChildrenByParent.get(r.id);
      if (kids && kids.length) {
        item.subPeriods = kids
          .slice()
          .sort((a, b) => a.startYear - b.startYear)
          .map<SubPeriod>(k => ({
            id: k.id,
            name: k.name,
            start: k.startYear,
            end: k.endYear,
            summary: k.summary,
          }));
      }
      primary.push(item);
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

  // Search index includes regimes that render as bars + sub-period children
  // (so users can still search "Spring and Autumn" and see it highlighted on
  // its parent's bar).
  const renderedIds = new Set<string>([
    ...primary.map(p => p.id),
    ...concurrent.map(c => c.id),
  ]);
  const subPeriodRegimes = raw.regimes.filter(r =>
    r.lane === 'main' && isSubPeriodOfRendered(r)
  );
  const searchIndex: SearchEntry[] = [
    ...raw.regimes.filter(r => renderedIds.has(r.id)).map(spanSearchEntry),
    ...subPeriodRegimes.map(spanSearchEntry),
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
