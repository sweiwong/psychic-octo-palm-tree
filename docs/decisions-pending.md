# Decisions pending — pick these up next session

Captured at 2026-04-28 checkpoint. Wei needs to make calls on these before more code work makes sense. Listed in roughly the order they'd unblock the next chunk of work.

## 1. Which integration path?

The new snake geometry from Claude Design (with the two fixes applied) lives at `claude-design-output/snake-geometry.js` and renders cleanly in the test page at `public/claude-design-test/test.html`. The live app at `src/components/timeline/TimelineCanvas.tsx` still uses our older TypeScript geometry from `src/lib/snake-path.ts`. Three options:

- **A. Port the new geometry into TypeScript and replace `src/lib/snake-path.ts`** behind a feature flag. The math is solid. Remaining work would be mechanical translation, then wiring up the existing event / figure / anchor / concurrent renderers to the new ribbon-path approach. Fastest path to the live app actually looking like the test page.
- **B. Keep iterating on the test page first.** Fix the test-page rendering bugs (PRC event density, Western Han clipping, ROC unlabeled) before porting. Lower risk but slower, and most of those bugs need solving in the live app anyway.
- **C. Wait for Claude Design's full pass.** Geometry is one deliverable. Palette, typography, top bar, sidebar, detail panel may all come when Wei's usage resets and she pushes Claude Design again. Then port everything in one shot.

**Default if nothing's said:** A. The geometry is the load-bearing piece; everything else is rendering style we already have.

## 2. Filled-polygon ribbons or stroked paths for the bars?

Our existing app uses SVG **stroked paths** (one path per bar with `stroke-width = bar thickness`, rounded line joins). The new Claude Design geometry uses **filled polygons** (compute outer and inner edges by sampling along the path, build a closed polygon).

Tradeoffs:

- Stroked paths: simpler code, smooth bends "for free" via SVG line joins, but can't easily taper the bar or use different styling on top vs bottom edges.
- Filled polygons: more code, needs careful normal handling at joins (the bug we just fixed), but allows future tapered or differently-styled edges.

**Decision:** Pick one as the rendering model when porting. They're not compatible — code lives in different shapes.

## 3. PRC event density

Six events fall in the 1949–2026 range (Mao death, Tiananmen, Hong Kong return, First crewed space, Xi consolidation, Belt and Road). At time-proportional scale, that's six labels in roughly 30–40 pixels of bar width. They pile horizontally in the test page.

Options:

- **Curate down** to two or three modern events. The dataset is already curated; this would just be pickier curation.
- **Rotate labels 90°** so they read vertically and don't compete for horizontal space.
- **Compact callouts** — short tags with arrow lines pointing to the year, fanned out further from the bar.
- **Click-to-reveal** — show only the most important modern events at default zoom, full set on click.

**Decision:** Pick how dense modern events should feel. Affects PRC, Qing, and Tang rows specifically.

## 4. Layer toggle defaults

Right now all layer toggles default to ON (Dynasties, Events, Figures, Cultural anchors, Global context). With 32 events visible, some rows feel busy.

Options:

- All on by default (current state).
- Dynasties + Figures + Cultural anchors on, Events off by default. User opts in.
- All on, but each layer dims to 30% opacity until hovered.

**Decision:** What does the first-load view look like? Dense or curated?

## 5. Concurrent state visual treatment

Currently rendered as thin sepia ribbons below the main snake during their period. Visible in the test page below Three Kingdoms (Wei / Shu / Wu) and below Northern Song (Liao / Western Xia / Jin Jurchen).

Options for the eventual ported version:

- Keep sepia thin ribbons, add labels inline.
- Make them the same visual weight as the main bar but offset below, with a different fill.
- Treat them as a totally different visual class (parallel kingdoms is the canonical Song multi-state test case from the original PRD).

**Decision:** How distinct should concurrent kingdoms feel from main-lane dynasties?

## 6. Once ported, what happens to `claude-design-output/` and `public/claude-design-test/`?

Two options:

- **Delete after porting.** Test page was scaffolding, no longer needed once the live app uses the new geometry.
- **Keep as a reference.** Lets a future session compare live app behavior against the standalone harness if regressions show up.

**Decision:** Trash or keep the test page after the port lands.

## 7. Update DECISIONS.md after the port?

`DECISIONS.md` currently says the palette is OPEN pending Claude Design pass. Once we port the geometry and the rest of the design language is settled (whether by Claude Design or by us), the new locked choices need to go into `DECISIONS.md`. Specifically: row count, row gap, bend radius, bar thickness, color palette, layer defaults, etc.

**Decision:** When does this update happen — incrementally as choices land, or in one batch at the end?

---

**How to use this doc next session:** open it before writing any code. Either resolve the open decisions in conversation with Wei (preferred) or pick the most defensible default and call it out so Wei can override. Don't silently make these calls.
