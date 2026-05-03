// Chinese History Map — wrapped multi-row timeline UI
// Components are exported to window for sibling Babel scripts to pick up.

const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ---------- Constants ----------
const ROW_PADDING_X = 56;            // horizontal padding inside each row
const ROW_HEIGHT_BASE = 240;         // px per row
const ROW_GAP = 28;                  // px between rows
const MAIN_BAR_H = 38;
const CONC_BAR_H = 22;
const LANE_OFFSETS = {               // y offsets from row centerline (main=0)
  above2: -82,
  above:  -52,
  main:    0,
  below:  +44,
  below2: +74,
};
const EVENT_Y    = +96;              // events row (dots)
const CULTURE_Y  = -100;             // cultural anchors (icons)
const GLOBAL_Y   = +118;             // global comparison strip

// Color tokens
const COLOR = {
  parchment:   "oklch(0.965 0.012 78)",
  parchment2:  "oklch(0.945 0.018 75)",
  ink:         "oklch(0.22 0.015 60)",
  ink2:        "oklch(0.42 0.012 60)",
  ink3:        "oklch(0.62 0.010 60)",
  rule:        "oklch(0.86 0.015 70)",
  ruleStrong:  "oklch(0.78 0.020 70)",
  vermillion:  "oklch(0.55 0.155 32)",
  vermillion2: "oklch(0.62 0.135 32)",
  sepia:       "oklch(0.55 0.080 65)",
  sepia2:      "oklch(0.72 0.060 70)",
  jade:        "oklch(0.58 0.060 165)",
  indigo:      "oklch(0.45 0.060 250)",
  gold:        "oklch(0.72 0.110 80)",
};

// Importance-driven dynasty fills (deeper = more important)
function dynastyFill(imp) {
  if (imp >= 5) return COLOR.vermillion;
  if (imp >= 4) return COLOR.vermillion2;
  return COLOR.sepia;
}

// ---------- Layout helpers ----------
const LAYOUT = window.LAYOUT;
const fmtYear = LAYOUT.fmtYear;
const fmtRange = LAYOUT.fmtRange;

// ---------- TopBar ----------
function TopBar({ zoom, onZoom, mode, onMode, onResetView }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="seal">中</div>
        <div className="title-block">
          <div className="title-main">Chinese History Map</div>
          <div className="title-sub">A wrapped timeline atlas · 2070 BCE – 2026 CE</div>
        </div>
      </div>
      <div className="topbar-right">
        <div className="seg">
          <button className={mode === "overview" ? "on" : ""} onClick={() => onMode("overview")}>Overview</button>
          <button className={mode === "detailed" ? "on" : ""} onClick={() => onMode("detailed")}>Detailed</button>
        </div>
        <div className="zoom">
          <button onClick={() => onZoom(Math.max(0.7, zoom - 0.15))} title="Zoom out">–</button>
          <span className="zoom-val">{Math.round(zoom * 100)}%</span>
          <button onClick={() => onZoom(Math.min(1.8, zoom + 0.15))} title="Zoom in">+</button>
          <button className="reset" onClick={onResetView}>Reset</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Sidebar ----------
function Sidebar({ search, setSearch, layers, toggleLayer, counts, onPick, results }) {
  const filterDefs = [
    { key: "dynasties",   label: "Dynasties",        glyph: "▬" },
    { key: "events",      label: "Events",           glyph: "●" },
    { key: "figures",     label: "Figures",          glyph: "◆" },
    { key: "culture",     label: "Cultural anchors", glyph: "✦" },
    { key: "inventions",  label: "Inventions",       glyph: "◼" },
    { key: "global",      label: "Global context",   glyph: "▭" },
    { key: "sources",     label: "Primary sources",  glyph: "▣" },
  ];
  return (
    <aside className="sidebar">
      <div className="search">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search dynasties, events, figures…"
        />
        {search && <button className="clear" onClick={() => setSearch("")}>×</button>}
      </div>

      {search && (
        <div className="search-results">
          <div className="section-label">{results.length} matches</div>
          {results.slice(0, 30).map(r => (
            <button key={r.id + r.kind} className="result-row" onClick={() => onPick(r)}>
              <span className={`kind-dot kind-${r.kind}`} />
              <span className="result-name">{r.title || r.name}</span>
              <span className="result-year">
                {r.start != null ? fmtRange(r.start, r.end) : (r.year != null ? fmtYear(r.year) : "")}
              </span>
            </button>
          ))}
        </div>
      )}

      {!search && (
        <>
          <div className="section-label">Layers</div>
          <div className="filter-list">
            {filterDefs.map(f => (
              <label key={f.key} className={"filter-row " + (layers[f.key] ? "on" : "off")}>
                <input
                  type="checkbox"
                  checked={!!layers[f.key]}
                  onChange={() => toggleLayer(f.key)}
                />
                <span className="filter-glyph">{f.glyph}</span>
                <span className="filter-label">{f.label}</span>
                <span className="filter-count">{counts[f.key] || 0}</span>
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
            {(window.__ERAS || []).map(s => (
              <button key={s.id} className="era-row" onClick={() => onPick({ kind: "era", ...s })}>
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

// ---------- Detail Panel ----------
function DetailPanel({ item, onClose, related }) {
  if (!item) {
    return (
      <aside className="detail empty">
        <div className="detail-empty-art">
          <svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="38" fill="none" stroke={COLOR.ruleStrong} strokeWidth="1" />
            <circle cx="50" cy="50" r="3" fill={COLOR.vermillion} />
            <text x="50" y="92" fontFamily="Spectral, serif" fontSize="9" fill={COLOR.ink2} textAnchor="middle">select an item</text>
          </svg>
        </div>
        <div className="detail-empty-msg">
          Click any dynasty bar, event dot, or marker on the timeline to read its entry here.
        </div>
      </aside>
    );
  }

  const kindLabel = ({
    dynasty: "Dynasty",
    concurrent: "Concurrent state",
    event: "Event",
    figure: "Figure",
    culture: "Cultural anchor",
    invention: "Invention",
    global: "Global context",
    era: "Era",
  })[item.kind] || "";

  const yearStr = item.start != null
    ? fmtRange(item.start, item.end)
    : (item.year != null ? fmtYear(item.year) : "");

  return (
    <aside className="detail">
      <div className="detail-head">
        <div className="detail-kind">{kindLabel}</div>
        <button className="detail-close" onClick={onClose}>×</button>
      </div>
      <div className="detail-title">{item.title || item.name}</div>
      <div className="detail-year">{yearStr}</div>

      <div className="detail-plate">
        <div className="plate-frame">
          <div className="plate-stripes" />
          <div className="plate-caption">[ illustration ] {item.title || item.name}</div>
        </div>
      </div>

      <div className="detail-blurb">{item.blurb || item.summary || "No description on file."}</div>

      {item.kind === "dynasty" && item.duration != null && (
        <div className="detail-stats">
          <div><span>Duration</span><b>{Math.abs(item.end - item.start)} yrs</b></div>
          <div><span>Importance</span><b>{"★".repeat(item.importance || 3)}</b></div>
        </div>
      )}

      {related && related.length > 0 && (
        <>
          <div className="detail-rel-label">Related</div>
          <div className="detail-related">
            {related.map(r => (
              <button key={r.id + r.kind} className="rel-chip" onClick={() => r.onPick && r.onPick()}>
                <span className={`kind-dot kind-${r.kind}`} />
                <span>{r.title || r.name}</span>
                <span className="rel-year">
                  {r.start != null ? fmtYear(r.start) : (r.year != null ? fmtYear(r.year) : "")}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Knowledge-base extension hooks — placeholders for the user's own notes */}
      <div className="kb-section">
        <div className="detail-rel-label">Knowledge entries</div>
        <div className="kb-row"><span className="kb-glyph">¶</span><span><i>Notes —</i> add longer commentary, anecdotes, or your own synthesis here.</span></div>
        <div className="kb-row"><span className="kb-glyph">⌘</span><span><i>Primary sources —</i> link translated texts (e.g. Sima Qian, Records of the Grand Historian).</span></div>
        <div className="kb-row"><span className="kb-glyph">◧</span><span><i>Images —</i> attach maps, paintings, photographs, museum plates.</span></div>
        <div className="kb-row"><span className="kb-glyph">↗</span><span><i>External links —</i> Wikipedia, ChinaKnowledge, JSTOR articles, your own blog posts.</span></div>
        <button className="kb-add" onClick={() => alert("Hook this up to your data layer — extend the JSON entry with notes/sources/images/links arrays.")}>
          + ADD ENTRY TO {(item.title || item.name || "").toUpperCase().slice(0, 22)}
        </button>
      </div>
    </aside>
  );
}

Object.assign(window, {
  TopBar, Sidebar, DetailPanel,
  COLOR, dynastyFill,
  LANE_OFFSETS, MAIN_BAR_H, CONC_BAR_H,
  EVENT_Y, CULTURE_Y, GLOBAL_Y,
  ROW_HEIGHT_BASE, ROW_GAP, ROW_PADDING_X,
  fmtYear, fmtRange,
});
