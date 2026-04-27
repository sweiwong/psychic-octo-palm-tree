import type { LayerToggles, NormalizedSystem, SearchEntry } from '../data/types';
import { COLOR } from '../lib/colors';
import { fmtRange, fmtYear } from '../lib/format';

type LayerKey = keyof LayerToggles;

interface SidebarProps {
  search: string;
  onSearchChange: (s: string) => void;
  layers: LayerToggles;
  onToggleLayer: (key: LayerKey) => void;
  counts: Record<LayerKey, number>;
  results: SearchEntry[];
  systems: NormalizedSystem[];
  onPickResult: (entry: SearchEntry) => void;
  onPickEra: (era: NormalizedSystem) => void;
}

const FILTER_DEFS: Array<{ key: LayerKey; label: string; glyph: string }> = [
  { key: 'dynasties',  label: 'Dynasties',        glyph: '▬' },
  { key: 'events',     label: 'Events',            glyph: '●' },
  { key: 'figures',    label: 'Figures',           glyph: '◆' },
  { key: 'culture',    label: 'Cultural anchors',  glyph: '✦' },
  { key: 'inventions', label: 'Inventions',        glyph: '◼' },
  { key: 'global',     label: 'Global context',    glyph: '▭' },
  { key: 'sources',    label: 'Primary sources',   glyph: '▣' },
];

function kindClassFor(entry: SearchEntry): string {
  switch (entry.type) {
    case 'regime':          return 'kind-dynasty';
    case 'event':           return 'kind-event';
    case 'figure':          return 'kind-figure';
    case 'cultural_anchor': return 'kind-culture';
    case 'global_context':  return 'kind-global';
    case 'macro_system':    return 'kind-era';
  }
}

export function Sidebar(props: SidebarProps) {
  const {
    search, onSearchChange, layers, onToggleLayer, counts,
    results, systems, onPickResult, onPickEra,
  } = props;

  const isSearching = search.trim().length > 0;

  return (
    <aside className="sidebar">
      <div className="search">
        <input
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search dynasties, events, figures…"
          aria-label="Search the timeline"
        />
        {search && (
          <button className="clear" onClick={() => onSearchChange('')} aria-label="Clear search">×</button>
        )}
      </div>

      {isSearching && (
        <div className="search-results">
          <div className="section-label">{results.length} matches</div>
          {results.map(r => (
            <button
              key={`${r.id}-${r.type}`}
              className="result-row"
              onClick={() => onPickResult(r)}
            >
              <span className={`kind-dot ${kindClassFor(r)}`} />
              <span className="result-name">{r.name}</span>
              <span className="result-year">
                {r.startYear != null && r.endYear != null
                  ? fmtRange(r.startYear, r.endYear)
                  : r.year != null ? fmtYear(r.year) : ''}
              </span>
            </button>
          ))}
        </div>
      )}

      {!isSearching && (
        <>
          <div className="section-label">Layers</div>
          <div className="filter-list">
            {FILTER_DEFS.map(f => (
              <label key={f.key} className={`filter-row ${layers[f.key] ? 'on' : 'off'}`}>
                <input
                  type="checkbox"
                  checked={layers[f.key]}
                  onChange={() => onToggleLayer(f.key)}
                />
                <span className="filter-glyph">{f.glyph}</span>
                <span className="filter-label">{f.label}</span>
                <span className="filter-count">{counts[f.key]}</span>
              </label>
            ))}
          </div>

          <div className="section-label">Legend</div>
          <div className="legend">
            <div className="legend-row">
              <svg width="56" height="14"><rect x="2" y="2" width="52" height="10" rx="5" fill={COLOR.vermillion} /></svg>
              <span>Major dynasty (main lane)</span>
            </div>
            <div className="legend-row">
              <svg width="56" height="14"><rect x="2" y="3" width="52" height="8" rx="4" fill="none" stroke={COLOR.sepia} strokeWidth="1.5" /></svg>
              <span>Concurrent state (parallel lane)</span>
            </div>
            <div className="legend-row">
              <svg width="56" height="14"><circle cx="28" cy="7" r="3.5" fill={COLOR.ink} /></svg>
              <span>Discrete event</span>
            </div>
            <div className="legend-row">
              <svg width="56" height="14"><rect x="24" y="3" width="8" height="8" fill={COLOR.gold} /></svg>
              <span>Cultural / invention anchor</span>
            </div>
            <div className="legend-row">
              <svg width="56" height="14"><rect x="22" y="2" width="12" height="10" fill="none" stroke={COLOR.indigo} strokeWidth="1.2" /></svg>
              <span>Global context</span>
            </div>
          </div>

          <div className="section-label">Eras</div>
          <div className="era-list">
            {systems.map(s => (
              <button key={s.id} className="era-row" onClick={() => onPickEra(s)}>
                <span className="era-name">{s.name}</span>
                <span className="era-range">{fmtRange(s.start, s.end)}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
