import { useEffect, useMemo, useState } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { DetailPanel } from './components/DetailPanel';
import { TimelineCanvas } from './components/timeline/TimelineCanvas';
import { MobileFallback } from './components/MobileFallback';
import { loadHistoryData } from './data/load';
import { search as runSearch } from './data/search';
import {
  defaultLayers,
  type LayerToggles,
  type NormalizedData,
  type NormalizedPointItem,
  type NormalizedSpanItem,
  type NormalizedSystem,
  type SearchEntry,
  type SelectedItem,
} from './data/types';

type LoadStatus =
  | { kind: 'loading' }
  | { kind: 'ready'; data: NormalizedData }
  | { kind: 'error'; message: string };

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="app-error">
      <h1>Couldn't load the timeline</h1>
      <p>{message}</p>
      <button onClick={() => window.location.reload()}>Refresh to try again</button>
    </div>
  );
}

function LoadingScreen() {
  return <div className="loading">Loading the atlas…</div>;
}

function selectedFromSpan(item: NormalizedSpanItem, kind: 'dynasty' | 'concurrent'): SelectedItem {
  return {
    kind,
    id: item.id,
    title: item.name,
    year: null,
    start: item.start,
    end: item.end,
    summary: item.summary,
    importance: item.importance,
    duration: item.duration,
    systemId: item.systemId,
    parentId: item.parentId,
  };
}

function selectedFromPoint(item: NormalizedPointItem, kind: SelectedItem['kind']): SelectedItem {
  return {
    kind,
    id: item.id,
    title: item.name,
    year: item.year,
    start: null,
    end: null,
    summary: item.summary,
    importance: item.importance,
    systemId: item.systemId,
    parentId: item.parentId,
  };
}

function selectedFromEra(era: NormalizedSystem): SelectedItem {
  return {
    kind: 'era',
    id: era.id,
    title: era.name,
    year: null,
    start: era.start,
    end: era.end,
    summary: era.summary,
  };
}

function findById(data: NormalizedData, id: string): SelectedItem | null {
  const span = [...data.primary, ...data.concurrent].find(d => d.id === id);
  if (span) {
    const kind = data.primary.includes(span) ? 'dynasty' : 'concurrent';
    return selectedFromSpan(span, kind);
  }
  const event = data.events.find(e => e.id === id);
  if (event) return selectedFromPoint(event, 'event');
  const figure = data.figures.find(f => f.id === id);
  if (figure) return selectedFromPoint(figure, 'figure');
  const culture = data.culture.find(c => c.id === id);
  if (culture) return selectedFromPoint(culture, 'culture');
  const invention = data.inventions.find(i => i.id === id);
  if (invention) return selectedFromPoint(invention, 'invention');
  const global = data.global.find(g => g.id === id);
  if (global) return selectedFromPoint(global, 'global');
  const era = data.systems.find(s => s.id === id);
  if (era) return selectedFromEra(era);
  return null;
}

function pickFromSearchEntry(entry: SearchEntry, data: NormalizedData): SelectedItem | null {
  return findById(data, entry.id);
}

function AppInner({ data }: { data: NormalizedData }) {
  const [search, setSearch] = useState('');
  const [layers, setLayers] = useState<LayerToggles>(defaultLayers);
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState<'overview' | 'detailed'>('detailed');
  const [selected, setSelected] = useState<SelectedItem | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const counts = useMemo<Record<keyof LayerToggles, number>>(() => ({
    dynasties: data.primary.length + data.concurrent.length,
    events: data.events.length,
    figures: data.figures.length,
    culture: data.culture.length,
    inventions: data.inventions.length,
    global: data.global.length,
    sources: 0,
  }), [data]);

  const results = useMemo(() => runSearch(search, data.searchIndex), [search, data.searchIndex]);

  const related = useMemo(() => {
    if (!selected) return [];
    const out: Array<{
      id: string;
      kind: SelectedItem['kind'];
      title: string;
      year: number | null;
      start: number | null;
      onPick: () => void;
    }> = [];

    if (selected.kind === 'dynasty' || selected.kind === 'concurrent') {
      const children = data.childrenByParent.get(selected.id) ?? [];
      for (const child of children) {
        const kind: SelectedItem['kind'] =
          child.type === 'event' ? 'event' :
          child.type === 'figure' ? 'figure' :
          child.type === 'cultural_anchor' ? 'culture' : 'event';
        out.push({
          id: child.id,
          kind,
          title: child.name,
          year: child.year,
          start: null,
          onPick: () => setSelected(selectedFromPoint(child, kind)),
        });
      }
      for (const r of [...data.primary, ...data.concurrent]) {
        if (r.id !== selected.id && r.systemId === selected.systemId) {
          const kind = data.primary.includes(r) ? 'dynasty' : 'concurrent';
          out.push({
            id: r.id,
            kind,
            title: r.name,
            year: null,
            start: r.start,
            onPick: () => setSelected(selectedFromSpan(r, kind)),
          });
        }
      }
    } else if (selected.parentId) {
      const parentSpan = [...data.primary, ...data.concurrent].find(d => d.id === selected.parentId);
      if (parentSpan) {
        const kind = data.primary.includes(parentSpan) ? 'dynasty' : 'concurrent';
        out.push({
          id: parentSpan.id,
          kind,
          title: parentSpan.name,
          year: null,
          start: parentSpan.start,
          onPick: () => setSelected(selectedFromSpan(parentSpan, kind)),
        });
      }
    }

    return out.slice(0, 8);
  }, [data, selected]);

  return (
    <>
      <TopBar
        zoom={zoom}
        onZoom={setZoom}
        mode={mode}
        onMode={setMode}
        onResetView={() => {
          setZoom(1);
          setExpandedRow(null);
          setSelected(null);
          setSearch('');
        }}
      />
      <div className="app-body">
        <Sidebar
          search={search}
          onSearchChange={setSearch}
          layers={layers}
          onToggleLayer={(k) => setLayers(s => ({ ...s, [k]: !s[k] }))}
          counts={counts}
          results={results}
          systems={data.systems}
          onPickResult={(entry) => {
            const picked = pickFromSearchEntry(entry, data);
            if (picked) setSelected(picked);
          }}
          onPickEra={(era) => setSelected(selectedFromEra(era))}
        />
        <div className="canvas-shell" data-screen-label="Timeline canvas">
          <TimelineCanvas
            data={data}
            layers={layers}
            zoom={zoom}
            mode={mode}
            highlightId={selected ? selected.id : null}
            expandedRow={expandedRow}
            onPick={(id, kind) => {
              const picked = findById(data, id);
              if (picked) setSelected({ ...picked, kind });
            }}
            onClearSelection={() => setSelected(null)}
            onToggleExpandRow={(idx) => setExpandedRow(curr => curr === idx ? null : idx)}
          />
        </div>
        <DetailPanel
          item={selected}
          related={related}
          onClose={() => setSelected(null)}
        />
      </div>
    </>
  );
}

export default function App() {
  const [status, setStatus] = useState<LoadStatus>({ kind: 'loading' });

  useEffect(() => {
    loadHistoryData()
      .then(data => setStatus({ kind: 'ready', data }))
      .catch(err => {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('Failed to load dataset', err);
        setStatus({ kind: 'error', message });
      });
  }, []);

  return (
    <MobileFallback>
      {status.kind === 'loading' && <LoadingScreen />}
      {status.kind === 'error' && <ErrorScreen message={status.message} />}
      {status.kind === 'ready' && <AppInner data={status.data} />}
    </MobileFallback>
  );
}
