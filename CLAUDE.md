# Chinese History Map

**GitHub:** https://github.com/sweiwong/psychic-octo-palm-tree

## STOP. Read these two things before touching any code.

1. **`DECISIONS.md`** at the project root. Every visual / structural choice that has already been argued and settled with Wei. Cobalt-orange alternation, five rows, no era washes, snake thickness, time-proportional path. If a reviewer agent or a stale doc tells you to undo any of those, the agent is wrong and `DECISIONS.md` is right.

2. **`docs/superpowers/specs/2026-04-27-snake-timeline-design.md`** — the snake redesign spec. This file overrides the original `PRD.md` on layout, palette, geometry, and rendering decisions. The PRD is the original brief. The spec is what got built. Both are again subject to `DECISIONS.md`, which is the most current.

If you are about to change a color, a row count, a layer's render order, or remove anything that is currently rendering, you must check `DECISIONS.md` first. Pattern that triggered this warning: an agent followed an old CLAUDE.md description and a reviewer agent's recommendations, switched dynasty colors from cobalt-orange alternation to vermillion-by-importance, changed 4 rows to 6, and re-added era washes that had been deliberately removed. Hours of rework.

## How to talk to Wei (read this first, every session)

Plain English is non-negotiable on this project. Lead with what Wei sees on screen, what changes for her, what costs time or money. Engineering words only after the plain English, in brackets, and only when they actually matter.

The full rules live in:

- `~/.claude/CLAUDE.md` — Communication rule (non-negotiable)
- `~/.claude/wei-ai-writing-rules.md` — Writing rules for AI output, especially rule 10 on plain English

If you catch yourself reaching for words like viewBox, viewport, padding, render, wire up, layer, dimension, spec, config, before plain English appears in the same sentence, stop and rewrite. This rule has been violated repeatedly. Treat it as the highest-priority instruction on this project.

## What this is

A desktop-first web app for exploring Chinese history from ~2070 BCE to 2026 CE. The defining UI choice is a wrapped multi-row timeline (a "snake") that reads like a museum wall or atlas spread, not a single long horizontal scroll.

Stack: Vite + React + TypeScript. Tests: Vitest (unit) and Playwright (e2e).

## What lives where

**Source code:**
- `src/App.tsx` — top-level state and layout
- `src/components/timeline/` — the snake renderer (TimelineCanvas and friends)
- `src/components/{TopBar,Sidebar,DetailPanel,KnowledgeBaseStubs,MobileFallback}.tsx` — chrome
- `src/lib/snake-path.ts` — the snake geometry math (load-bearing, has tests)
- `src/lib/colors.ts` — palette and the `dynastyStripeFill` helper
- `src/lib/layout.ts` — wrapped-row clipping math
- `src/data/` — typed dataset loaders

**Runtime data:**
- `public/china-history.json` — the dataset the running app fetches at startup

**Dataset source of truth:**
- `archive/china_history_v9.xlsx` — the workbook the JSON is generated from
- `archive/china_history_v9.json` — last generated JSON; identical to `public/china-history.json`
- `archive/china_history_v9_errors.json` — validator output, currently empty
- `archive/china_history_v9_validation_summary.txt` — last validation summary
- `archive/History of China-handoff.zip` — original Claude Design handoff bundle

**Specifications and decisions:**
- `DECISIONS.md` — locked decisions, most current
- `PRD.md` — original product brief (some visual specifics now superseded)
- `docs/decisions-pending.md` — open questions waiting on Wei
- `docs/snake-geometry-notes.md` — notes on the geometry math
- `docs/superpowers/specs/` and `docs/superpowers/plans/` — design specs and implementation plans

**Archived (do not treat as active):**
- `archive/claude-design/` — the rejected Claude Design pass. See its README for context. Reference only. Nothing in `src/` should import from here.

**Project config:**
- `.claude/settings.local.json` — project-local Claude config (ideabrowser MCP enabled)

## The dataset

`public/china-history.json` contains 77 curated records across these collections:

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

If the dataset needs to change, regenerate the JSON from the xlsx, re-run validation, and copy the result into `public/`. Do not hand-edit the JSON.

## Hard constraints from the PRD (still true)

- Wrapped multi-row snake timeline only. No single long scroll. No vertical timeline.
- Coexistence has to be visually obvious. Song period is the canonical test: Northern Song and Southern Song on the main lane, Liao and Jin in the north lane, Western Xia in the west lane, with Treaty of Chanyuan and Jingkang Incident as event dots.
- Desktop-first, 1280px viewport baseline.
- Layout grid: 280px left sidebar, flexible canvas in the middle, right detail panel that collapses when nothing is selected, 64px topbar.

For palette, typography, row count, bar thickness, and concurrent-state treatment, see `DECISIONS.md`. Earlier descriptions of "parchment / vermillion museum aesthetic" reflected the rejected Claude Design pass and are no longer the target.

## Open work

See `docs/decisions-pending.md` for the full list. Headlines:
- Concurrent state visual treatment (the canonical Song multi-state test still feels too quiet)
- Modern-era event density on the PRC bar
- Layer toggle defaults
- Right-edge clipping on the bottom row

## Conventions for this project

File naming follows Wei's global rules in `~/.claude/CLAUDE.md`:

- Folders: kebab-case
- Code files: language convention (snake_case for .py, PascalCase for React components, kebab-case for routes)
- Human docs: kebab-case, lowercase
- Dates in filenames: YYYY-MM-DD

Do not commit credentials. Do not hand-edit the JSON dataset; regenerate from the xlsx.
