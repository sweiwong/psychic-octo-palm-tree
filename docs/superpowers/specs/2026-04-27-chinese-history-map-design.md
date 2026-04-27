# Chinese History Map: design spec

Date: 2026-04-27
Author: Wei Wong, with Claude
Status: Approved for implementation planning

## 1. Summary

A desktop-first React web app for exploring Chinese history from approximately 2070 BCE to 2026 CE. The defining UI choice is a wrapped multi-row timeline that reads like a museum wall or atlas spread, not a single long horizontal scroll. The project is a 70% portfolio piece (a polished, shareable public link) and 30% a personal Zettelkasten-style knowledge tool that will accumulate Wei's own notes on Chinese history over time.

This spec covers v1, which is the timeline map only. Personal notes are deferred to v2.

## 2. Goals

- Ship a polished, deployable portfolio piece in roughly one week of focused work.
- Faithfully recreate the visual design and interactions from the existing Claude Design prototype, on a real production build pipeline.
- Make the wrapped multi-row timeline visibly read like a museum exhibit, with clear coexistence between dynasties (the Song-period stress test of Northern Song, Southern Song, Liao, Jin, and Western Xia is the canonical visual proof).
- Architect v1 so that v2 (markdown notes from a `notes/` folder showing up in the detail panel) is a clean addition rather than a rewrite.
- Keep the dataset modular. Wei expects to add and occasionally remove entries over time. Routine dataset changes must be data-only and require no code edits. See Section 19 for the operational guide.

## 3. Non-goals (deferred to later versions)

- Real knowledge-base content (the notes-as-markdown plug-in is v2)
- Real images in the detail panel plates (placeholder striped frames stay for v1)
- Mobile or tablet responsive layout (a static fallback handles small screens)
- Internationalization or Chinese-language metadata
- Analytics or visitor tracking
- Custom domain (v1 ships at `*.vercel.app`)
- Unit tests for presentational components

## 4. Stack

| Concern | Choice | Reason |
| --- | --- | --- |
| UI framework | React 18 | Already used in the prototype. Industry standard. |
| Language | TypeScript | Catches bugs at write time. Industry default for production React in 2026. The cognitive load lands on Claude (writing types), not on Wei (reading rendered output). |
| Build tool | Vite | Fast dev server, small optimized bundles, minimal config. Right fit for single-page apps. |
| Hosting | Vercel | Free tier, GitHub integration, automatic deploys per push, preview URLs per pull request. |
| Testing | Playwright | End-to-end browser testing. Visual and behavioral coverage. |
| Validation | Zod | Runtime schema validation for the loaded JSON dataset. Catches a malformed regeneration of the dataset before it crashes the UI. |
| Styling | Plain CSS with custom properties | The prototype already uses well-organized CSS custom properties (design tokens). Porting that pattern is simpler than introducing a CSS-in-JS layer or framework. |

Next.js was considered and rejected. The app is one page with one interactive canvas; Next.js's strengths (server-side rendering, file-based routing, image optimization) don't apply, so it would be carrying complexity without benefit.

## 5. Folder layout

```
~/code/portfolio/chinese-history-map/
├── public/
│   └── china-history.json              # the dataset (renamed from china_history_v9.json)
├── src/
│   ├── main.tsx                        # Vite entry point, mounts <App />
│   ├── App.tsx                         # root component, owns app-level state
│   ├── components/
│   │   ├── TopBar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── DetailPanel.tsx
│   │   ├── KnowledgeBaseStubs.tsx      # v2 plug-in seam, takes an entity id
│   │   ├── MobileFallback.tsx
│   │   └── timeline/
│   │       ├── TimelineCanvas.tsx       # main SVG renderer
│   │       ├── DynastyBar.tsx           # primary + concurrent regimes
│   │       ├── Markers.tsx              # event / figure / anchor / global, one file
│   │       ├── RowFrame.tsx             # one row's grid + label
│   │       └── SystemBand.tsx           # era washes behind everything
│   ├── data/
│   │   ├── types.ts                     # all entity types + Zod schemas
│   │   ├── load.ts                      # fetch + normalize + validate
│   │   └── search.ts                    # search query logic
│   ├── lib/
│   │   ├── layout.ts                    # the wrapped-row math (port of layout.js)
│   │   ├── format.ts                    # year formatting (BCE / CE)
│   │   └── colors.ts                    # design tokens as TS exports
│   └── styles.css                       # one stylesheet, ported from the prototype
├── tests/e2e/
│   ├── timeline.spec.ts
│   ├── search.spec.ts
│   └── detail-panel.spec.ts
├── docs/superpowers/specs/
│   └── 2026-04-27-chinese-history-map-design.md   # this file
├── handoff-extracted/                   # design reference, in .gitignore
├── index.html                           # Vite html entry
├── vite.config.ts
├── tsconfig.json
├── package.json
├── playwright.config.ts
├── .gitignore
├── CLAUDE.md
└── README.md
```

The `handoff-extracted/` folder stays at the repo root as read-only design reference and is added to `.gitignore`. The original `china_history_v9.json`, `china_history_v9.xlsx`, validation reports, and the original handoff zip move to a sibling `archive/` folder so the repo root stays clean.

The project moves from `~/code/chinese-history-map/` to `~/code/portfolio/chinese-history-map/` to fit Wei's standard folder convention (portfolio is for shareable public projects).

## 6. Data model

The dataset is `public/china-history.json` (renamed from `china_history_v9.json`; the version number lives inside the file's `meta` block).

Entity types live in `src/data/types.ts`:

```ts
export type EntityType =
  | 'macro_system'
  | 'regime'
  | 'event'
  | 'figure'
  | 'cultural_anchor'
  | 'global_context';

// Lane values as they appear in the source dataset
export type SourceLane =
  | 'main' | 'north' | 'west' | 'south'        // structural lanes for span items
  | 'event' | 'figure' | 'anchor' | 'global';  // semantic lanes for point items

// Lane values after normalization, used by the renderer
export type RenderLane =
  | 'main' | 'above' | 'above2' | 'below' | 'below2'  // span items
  | 'event' | 'figure' | 'anchor' | 'global';         // point items

interface BaseEntity {
  id: string;
  type: EntityType;
  name: string;
  systemId: string | null;
  parentId: string | null;
  lane: SourceLane;       // raw, before normalization
  renderLane: RenderLane; // populated by the normalizer
  importance: 1 | 2 | 3 | 4 | 5;
  summary: string;
}

export interface SpanEntity extends BaseEntity {
  startYear: number;
  endYear: number;
  year: null;
  isPoint: false;
  duration: number;
}

export interface PointEntity extends BaseEntity {
  startYear: null;
  endYear: null;
  year: number;
  isPoint: true;
  duration: 0;
}
```

Span items are macro_systems and regimes. Point items are events, figures, cultural_anchors, and global_context entries. Negative years are BCE; there is no year zero.

A Zod schema mirrors these types and runs on the loaded JSON at startup. A failure shows a clean error screen and logs details to the console.

## 7. Data loading and normalization

`src/data/load.ts` fetches `china-history.json` once at app startup, validates it, and produces a normalized shape the renderer expects:

- **Hide umbrella regimes that have main-lane children.** Zhou is hidden in favor of Western Zhou, Eastern Zhou, Spring and Autumn, and Warring States. This matches the prototype's `data.js` and prevents stacked overlapping bars.
- **Map structural lanes to render lanes.** `north` becomes `above`, `west` becomes `above2`, `south` becomes `below`, with corresponding y-offsets.
- **Pre-compute children per parent.** A `Map<parentId, ChildEntities>` index makes the detail panel's "related items" lookup O(1). Children include events, figures, and cultural anchors. Parents include both regimes and macro_systems (some events like the Three Kingdoms' Fall of Han attach directly to a system rather than a regime).
- **Build a search index.** A flat array of `{ id, type, name, summary, year, startYear, endYear }` for substring matching.

The dataset's denormalized `all` array is ignored. Typed collections (regimes, events, etc.) are the source of truth.

The loaded data lives in component state via `useState`. There is no global store. Data fetches once; subsequent UI changes reuse the same in-memory copy (in-memory caching).

## 8. Component architecture

Four primary components, each with one responsibility.

**TopBar.** Renders the seal (Noto Serif SC 中 character), title, subtitle, mode toggle (overview / detailed), zoom controls (-, percentage, +, reset). Pure props in, callbacks out.

**Sidebar.** Renders the search input. When search has text, shows a results list. Otherwise shows the layer filters (dynasties, events, figures, cultural anchors, inventions, global context, primary sources), the legend, and the era list (clickable era names that select that era).

**TimelineCanvas.** The SVG renderer. Receives normalized data, layer toggle state, zoom, mode, expanded-row index, selected entity id, and click handlers. Internally splits into:
- One `RowFrame` per row (six rows total)
- One `SystemBand` per macro_system, clipped to its rows
- `DynastyBar` instances for primary (main lane) and concurrent (north / west / south) regimes
- `Markers` for events, figures, cultural anchors, global context

The canvas uses a `ResizeObserver` to track its container width and recompute SVG dimensions on resize.

**DetailPanel.** Renders the selected entity or an empty-state when nothing is selected. Includes a `<KnowledgeBaseStubs id={selected.id} />` block at the bottom that renders the v2 plug-in seam (in v1, this shows the dashed-border stub UI from the prototype).

**MobileFallback.** Wraps the entire app at the top level. When `window.innerWidth < 1024`, it replaces the full UI with a static preview (page title, screenshot of the desktop view, "open on a desktop browser" message). The check uses a `matchMedia` listener and updates if the user resizes their browser.

## 9. State management

All app-level state lives in `App.tsx` via React's built-in `useState`:

```ts
const [data, setData] = useState<NormalizedData | null>(null);
const [search, setSearch] = useState('');
const [layers, setLayers] = useState<LayerToggles>(defaultLayers);
const [zoom, setZoom] = useState(1);
const [mode, setMode] = useState<'overview' | 'detailed'>('detailed');
const [selected, setSelected] = useState<SelectedItem | null>(null);
const [expandedRow, setExpandedRow] = useState<number | null>(null);
```

Derived values (search results, related items for the detail panel, layer counts) compute via `useMemo`. No state library (Zustand, Redux, Jotai). The state surface is small enough that a library would be ceremony without payoff.

The zoom value is clamped to `[0.7, 1.8]`. Layers default to all true. Mode defaults to detailed. Reset View clears search, sets zoom to 1, clears expanded row, and clears selection.

## 10. Timeline rendering and layout math

The wrapped multi-row layout is the only piece with real algorithmic content. `src/lib/layout.ts` is a TypeScript port of the prototype's `layout.js`.

Six rows split at years:
```
[-2070, -1000, -200, 500, 1100, 1700, 2030]
```

Density tightens toward the present so modern history gets more visual room.

Two core functions:

- `clipRange(startYear, endYear)` returns an array of segments `{ rowIndex, x0, x1, isStart, isEnd }` where `x0` and `x1` are 0-1 fractions within the row. This is what makes a long bar (Han, Zhou, Tang) continue seamlessly across row boundaries with the right end-cap behavior.
- `locate(year)` returns `{ rowIndex, fraction }` for a single year. Used for point items.

SVG is the right rendering target. With 77 items, performance is a non-issue. No canvas, no virtualization needed.

Visual encoding (preserved from the prototype):
- Primary regimes: filled bars on the main lane, vermillion shade keyed to `importance` (deeper for 5, lighter for 4, sepia for 3 and below).
- Concurrent regimes: outlined sepia bars in lanes above and below the main lane. This is the visible coexistence signal.
- System era bands: faint OKLCH wash behind everything in the row, palette rotates per system index.
- Events: small dark circles, optional label in detailed mode.
- Figures: indigo diamonds.
- Cultural anchors: gold squares.
- Global context: outlined indigo boxes near the bottom of each row.

The expand-row toggle (one button per row, rendered inside a `foreignObject`) collapses all other rows when clicked, giving any single row the full canvas width.

## 11. v2 plug-in seam

v2 lets Wei commit a markdown file like `notes/R_TANG.md` and have it show up in the detail panel for the Tang dynasty. v1 ships the seam so v2 is just content.

The seam is a single component, `<KnowledgeBaseStubs id={...} />`, rendered inside the DetailPanel. In v1 it shows the same dashed-border stub UI as the prototype (notes / primary sources / images / external links sections, all empty). In v2 the component's internals change to:

1. Fetch `notes/<id>.md` from the deployed site.
2. Parse the markdown (with front-matter for type tagging).
3. Render the parsed content into the same UI sections.

Same component name, same prop shape, no architectural changes elsewhere. The build pipeline gains a step that copies any markdown files from a `notes/` folder into `public/notes/` so they're addressable by URL.

The seam is the only v2-aware piece of v1. Every entity already has a stable `id`, so passing it down requires no design work.

## 12. Mobile fallback

The PRD specifies desktop-first and the wrapped multi-row aesthetic doesn't translate to phone-sized screens. Below 1024px viewport width, the `<MobileFallback />` component takes over the page and shows:

- The page title and subtitle
- A static screenshot of the desktop view (committed to the repo as a PNG, generated once during development)
- A short message: "This timeline is built for desktop. Open this link on a larger screen to explore."

The check uses `window.matchMedia('(min-width: 1024px)')` so it responds to viewport changes without page reload. Above 1024px, the full app renders.

## 13. Testing

Three Playwright end-to-end test files live in `tests/e2e/`:

- `timeline.spec.ts`: renders without errors, all 6 rows are present, the Song period shows the main lane bars (Northern Song, Southern Song) plus concurrent lanes (Liao, Jin, Western Xia) on screen at the same time.
- `search.spec.ts`: typing in the search input shows results, results count updates, clicking a result opens the detail panel, clearing the search restores the layer filter view.
- `detail-panel.spec.ts`: clicking a dynasty bar opens its detail, clicking the close button clears the selection, related items render and are themselves clickable.

Type-check (`tsc --noEmit`) runs on every Vercel build and blocks deployment on type errors.

Unit tests are deliberately not included for presentational components. Their behavior is visual; asserting against rendered markup is brittle. Playwright captures the same intent at the level that matters (the user flow).

## 14. Error handling

Three failure modes worth handling explicitly:

1. **Dataset fails to fetch.** The `<App />` shows a clean error screen with a "Refresh to try again" button. The default browser error UI never appears.
2. **Dataset fails Zod validation.** Same error screen as above. Validation errors log to the console with field paths so Wei can fix the source xlsx.
3. **Unsupported browser.** Vite's build target is ES2022. Browsers older than roughly mid-2023 will see the unsupported-browser message served by Vercel's runtime. Acceptable for a portfolio piece.

No try / catch around individual UI operations. They cannot fail meaningfully.

## 15. Deploy

- New GitHub repo (private to start, flip public when v1 is ready to share).
- OAuth-connect to Vercel.
- Pushes to `main` deploy to production within seconds.
- Pull-request branches get preview URLs.
- v1 hosts at `chinese-history-map.vercel.app` (or whatever name is available). Custom domain comes later if Wei wants one.

## 16. File migrations during setup

When implementation begins, the existing repo contents are reorganized:

- `china_history_v9.json` becomes `public/china-history.json`. A `version: 9` field is added to the `meta` block so the dataset still self-identifies its schema version after the rename.
- `china_history_v9.xlsx`, `china_history_v9_errors.json`, and `china_history_v9_validation_summary.txt` move to a new `archive/` folder.
- `History of China-handoff.zip` moves to `archive/`.
- `handoff-extracted/` stays at the repo root and is added to `.gitignore`.
- `PRD.md` stays at the repo root.
- `CLAUDE.md` stays at the repo root.
- The whole project moves from `~/code/chinese-history-map/` to `~/code/portfolio/chinese-history-map/` before any code is written.

## 17. Risks and open considerations

- **Font loading.** The prototype uses four Google Fonts (Spectral, Inter, JetBrains Mono, Noto Serif SC). If Google Fonts is slow or blocked, the page falls back to system fonts. Mitigation: `font-display: swap` and `<link rel="preconnect">` on Google's domains, both already in the prototype.
- **Image plates.** The detail panel includes a striped placeholder frame that's part of the museum aesthetic. v1 keeps these; if they read as broken to portfolio visitors, swap to a higher-effort placeholder later. Low risk, easy fix.
- **Dataset gaps.** The v9 dataset has 0 inventions, 0 cultural works, only 3 figures, only 2 global context entries. The UI handles empty collections cleanly, but the timeline will look thinner than it could. Expanding the dataset is content work and stays out of scope for v1 engineering. Layer filters for Inventions and Primary Sources display a count of 0 until data lands.
- **Single-page accessibility.** Keyboard navigation through the SVG markers is non-trivial. v1 keeps the existing mouse-only interaction model; full keyboard accessibility is a v2 polish item.

## 18. Extending the dataset

The renderer is fully data-driven. Adding or removing entries within the existing entity types stays at the data layer and requires no code edits.

### Common case: add or remove a dynasty, event, figure, cultural anchor, or global context entry

1. Edit the source workbook `china_history_v9.xlsx`.
2. Regenerate `china-history.json` using the existing validator script.
3. Drop the regenerated JSON into `public/china-history.json`.
4. The site picks up the change on next load.

The Zod schema in `src/data/types.ts` validates the shape on load. If the regenerated JSON has a structural problem (missing field, wrong type, bad parentId reference), the site shows a clean error screen and logs the validation failure to the console with field paths.

The renderer iterates over the typed collections (regimes, events, figures, culturalAnchors, globalContext) without hard-coded references to any specific id, so new entries place themselves automatically based on their `year` or `[startYear, endYear]`, their `lane`, their `importance`, and their `type`.

### Edge cases that require small code changes

- **New entity type** (a category like "treaty", "battle", or "innovation" with its own visual marker): roughly one hour of work. Touches `src/data/types.ts` (add the type and Zod schema), `src/components/timeline/Markers.tsx` (add the render component), `src/components/Sidebar.tsx` (add the layer-toggle row), and `src/lib/colors.ts` if the new type needs a new color token.
- **Extending the year range beyond 2070 BCE or 2030 CE**: edit the `ROW_BREAKS` constant in `src/lib/layout.ts`. Single constant, single file.
- **Adding a new render lane** (e.g., a "far north" lane stacked above the existing ones): edit `LANE_OFFSETS` in `src/components/timeline/TimelineCanvas.tsx` and the `RenderLane` type in `src/data/types.ts`. Two files.

### Performance ceiling

The current renderer uses one SVG element group per entity. The math handles arbitrary years; the visual layout handles arbitrary entity counts. Performance stays comfortable up to roughly 1000-2000 entities. Beyond that, the renderer would need virtualization (only rendering entities currently in the viewport). v1 ships with 77 entities and has roughly 25x headroom before performance becomes a real concern.

## 19. Success criteria for v1

- The wrapped multi-row timeline renders correctly across all six rows with no overlap or clipping bugs.
- The Song-period stress test reads as visually unambiguous (a non-historian can tell that Liao, Jin, Northern Song, Southern Song, and Western Xia coexist).
- All four marker types (events, figures, cultural anchors, global context) render with the right visual encoding.
- Search returns reasonable matches across names and summaries.
- The detail panel opens and closes cleanly, related items work, the close button works.
- Layer toggles hide and show the corresponding entity types.
- Zoom controls and the row-expand toggle behave as expected.
- The mobile fallback shows on a phone viewport and the desktop UI shows on a desktop viewport.
- The site deploys to Vercel from a `git push`.
- The Playwright test suite passes locally and on CI.
