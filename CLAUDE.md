# Chinese History Map

## What this is

A desktop-first web app for exploring Chinese history from ~2070 BCE to 2026 CE. The defining UI choice is a wrapped multi-row timeline that reads like a museum wall or atlas spread, not a single long horizontal scroll.

## Project status as of 2026-04-26

Net new project. No production source code yet. Inputs are in place. Tech stack and folder structure will be decided in brainstorming with the user before any code is written.

## Communication rule (non-negotiable)

Every update, question, status check, and decision point gets written in plain English first. Lead with what Wei actually sees or what changes for this project. No engineering terms without a plain English translation immediately after, in brackets.

This applies to: progress updates, blocker reports, design decisions, code review notes, status checks, tradeoff analyses, anything written to Wei. Not just architecture conversations. Every message.

Examples of what wrong vs. right looks like:

Wrong: "yearToDistance maps a year to a path-distance offset along the snake."
Right: "We're building the math that turns a year into a position on the snake. So when we tell the chart 'put Han here,' it knows the exact spot. (yearToDistance function.)"

Wrong: "Tests pass. Coverage at 92%."
Right: "All 21 tests pass. The math module is fully covered, so we know it works before we draw anything on screen. (92% coverage.)"

Wrong: "Should I refactor segmentPath to memoize?"
Right: "Performance question. Right now we recalculate the bar shape every time the screen redraws, which is fine for 30 dynasties but could get sluggish if we add hundreds of events later. Want me to cache the result so it only recalculates when something changes? (Memoization.)"

Wrong: "TimelineCanvas now consumes the new geometry module via useMemo, with ResizeObserver wired in."
Right: "The chart canvas now reads the new snake math, and it automatically recomputes when the window resizes. So the chart stays the right shape on any screen size. (useMemo + ResizeObserver.)"

The bracket translation goes after the plain English, not before. Skip the brackets only for trivial code edits and one-line fixes where there is no real decision or system to explain.

## What lives where

- `PRD.md` — the product brief from Wei
- `china_history_v9.json` — the production dataset, 77 records, 0 validation errors
- `china_history_v9.xlsx` — the source workbook the JSON was generated from
- `china_history_v9_errors.json` — validator output, currently empty
- `china_history_v9_validation_summary.txt` — last validation summary
- `History of China-handoff.zip` — the original Claude Design handoff bundle
- `handoff-extracted/` — same bundle unzipped for reading; treat as design reference, not as code to ship
- `.claude/settings.local.json` — project-local Claude config (ideabrowser MCP enabled)

## The dataset

`china_history_v9.json` contains 77 curated records across these collections:

- `systems` (5 entries) — macro era bands like Qin-Han, Sui-Tang, Song multi-state. Span items.
- `regimes` (27 entries) — dynasties and concurrent states. Span items. Each carries a `lane` field (`main` / `north` / `west` / `south`) that tells the renderer whether the regime is the main lane bar or a parallel concurrent state.
- `events` (36 entries) — point-in-time events, each linked to a `parentId` regime.
- `figures` (3 entries) — Yu the Great, Confucius, Sun Tzu. Point items.
- `culturalAnchors` (4 entries) — Terracotta Army, Beijing as capital across Yuan/Ming/Qing.
- `globalContext` (2 entries) — Alexander the Great, Rise of Islam.
- `culturalWorks`, `innovations` — empty in v9, but the schema reserves them.
- `all` — denormalized union of all the above.
- `meta` — record count and source workbook reference.

Schema rules:

- Span items (systems, regimes) use `startYear` + `endYear`, with `year` null and `isPoint` false.
- Point items (events, figures, anchors, global) use `year`, with `startYear` / `endYear` null and `isPoint` true.
- Negative years are BCE. There is no year zero.
- `parentId` links events to their regime, and sub-regimes (Spring and Autumn, Warring States) to their parent regime.
- `importance` is 1-5, used for visual weight.

If the dataset needs to change, regenerate the JSON from the xlsx and re-run validation. Do not hand-edit the JSON.

## The design reference

`handoff-extracted/history-of-china/` is a Claude Design prototype. It is the visual specification. Read it for layout, palette, typography, and interaction; do not copy its build approach (CDN React + babel-standalone) into production.

Files inside:

- `project/Chinese History Map.html` — entry point, loads styles + scripts
- `project/styles.css` — design tokens, all OKLCH colors, full chrome styling
- `project/layout.js` — the wrapped timeline math: 6 rows with breakpoints `[-2070, -1000, -200, 500, 1100, 1700, 2030]`. Density tightens toward the present.
- `project/timeline.jsx` — SVG timeline renderer (row frames, dynasty bars, event dots, figure diamonds, cultural anchor squares, global context boxes, era band washes)
- `project/components-chrome.jsx` — TopBar, Sidebar, DetailPanel + shared constants (`COLOR`, `LANE_OFFSETS`, bar heights)
- `project/app.jsx` — top-level state wiring (search, filters, zoom, mode, selection, expanded row)
- `project/data.js` — data normalizer mapping the v9 JSON into the renderer's expected shape
- `project/uploads/pasted-1777253727792-0.png` — design screenshot for visual reference

Note: `handoff-extracted/history-of-china/project/china_history.json` and `uploads/china_history_v9.json` are duplicates of the root dataset. Production should fetch the root dataset, not the copies inside the prototype.

## Hard constraints from the PRD

- Wrapped multi-row timeline only. No single long scroll. No vertical timeline.
- Coexistence has to be visually obvious. Song period is the canonical test: Northern Song and Southern Song on the main lane, Liao and Jin in the north lane, Western Xia in the west lane, with Treaty of Chanyuan and Jingkang Incident as event dots.
- Desktop-first, 1280px viewport baseline.
- Academic, museum-quality aesthetic. Parchment background, vermillion accents.
- Typography: Spectral serif for titles, Inter for UI, JetBrains Mono for years, Noto Serif SC for the 中 seal.
- Layout grid: 280px left sidebar, 1fr canvas, 340px right detail panel, 64px topbar.

## What the prototype does well, that production must preserve

- The wrapped row engine in `layout.js` is the right approach; year ranges are clipped per row so a long dynasty bar continues seamlessly into the next row down.
- Dynasties get importance-driven fills (vermillion for importance ≥ 5, lighter vermillion for 4, sepia below).
- Concurrent states are outlined rather than filled, so the eye still reads main lane as the spine.
- System era bands sit behind everything as faint OKLCH washes, giving a sense of macro period without competing with the bars.
- The expand-row toggle (foreignObject button per row) is the user's escape valve when a row gets dense.

## Open work

- Pick a production stack (build tool, language, deploy target). The user will decide in brainstorming.
- Decide what to do with the knowledge-base extension hooks in the detail panel (notes, primary sources, images, external links). The prototype stubs them out; v1 may or may not include real wiring.
- Decide whether `culturalWorks` and `innovations` get populated, since they are reserved in the schema but empty in v9.
- Decide on a deploy target.

## Conventions for this project

File naming follows Wei's global rules in `~/.claude/CLAUDE.md`:

- Folders: kebab-case
- Code files: language convention (snake_case for .py, PascalCase for React components, kebab-case for routes)
- Human docs: kebab-case, lowercase
- Dates in filenames: YYYY-MM-DD

Do not commit credentials. Do not hand-edit the JSON dataset; regenerate from the xlsx.
