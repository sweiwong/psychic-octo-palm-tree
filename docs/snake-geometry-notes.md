# Snake geometry — what makes it readable

> **Status note (2026-05-03):** The Claude Design geometry described below was rejected and the test harness was deleted. Source files were archived to `archive/claude-design/output/`. The live app continues to use our own TypeScript geometry at `src/lib/snake-path.ts`, which renders bars as stroked SVG paths rather than filled polygons. The kink and squish problems described here never affected the live app because they are specific to the polygon-based approach. Notes are kept because the geometry insights (right-of-tangent normals at joins, decoupled row gap from bend radius) may inform future work even if we don't adopt Claude Design's specific module.

Notes from the 2026-04-28 session evaluating Claude Design's `snake-geometry.js`. Save here because memory files don't survive across machines or across someone else opening this repo.

## What we did

Claude Design produced a `snake-geometry.js` file (the math for the snake path: 4 rows, time-proportional, half-circle U-bends). We saved it to `archive/claude-design/output/snake-geometry.js` (originally at `claude-design-output/snake-geometry.js`) and built a standalone test harness (originally at `public/claude-design-test/test.html`) so we could evaluate the geometry without touching the live React app.

The first render had two visible problems:

1. Bars showed X-shaped kinks at every straight-to-bend boundary
2. Rows were vertically squished together so events crashed into bars

Both got fixed. Wei confirmed the result.

## The two fixes that mattered

### 1. Right-of-tangent normals at all path joins

**The bug:** Claude Design's original code defined "outer edge of the bar" using two different rules — `(0, 1)` (always below screen) for straights, and "outward radial" (away from bend center) for bends. At the join between a straight and a bend, the outer-edge label flipped sides, so the polygon's outer-vertex list jumped from below the centerline to above it. That's the X-kink you'd see at every bend entry and exit.

**The fix:** Use a single consistent convention everywhere — "right of direction of travel". Concretely:

- LTR straight tangent (1, 0) → normal (0, 1)
- RTL straight tangent (-1, 0) → normal (0, -1)
- LTR bend (clockwise turn) → normal = INWARD radial = `(-cos(theta), -sin(theta))`
- RTL bend (counter-clockwise turn) → normal = OUTWARD radial = `(cos(theta), sin(theta))`

That keeps the polygon's outer and inner edge lists continuous through every straight-to-bend boundary. No kinks.

### 2. Decouple row gap from bend horizontal radius

**The bug:** Claude Design's original code hardcoded `ROW_GAP = 2 * BEND_RADIUS`. So if you wanted vertical breathing room between rows, you had to use giant bends. If you wanted compact bends, rows got squished together with no room for event labels.

**The fix:** Make `rowGap` and `bendRadiusX` independent parameters. Stretch the bend into a half-ellipse with horizontal radius = `bendRadiusX` and vertical radius = `rowGap / 2`. Computed bend arc length using Ramanujan's half-perimeter approximation so time-proportional mapping stays accurate.

This let us set `rowGap = 240` with `bendRadiusX = 90`. Each bar gets about 90 pixels of breathing room above and below for callouts, while bends stay compact and don't gobble horizontal space.

## How to verify

If a future session reports "the snake looks broken" or "events stack on top of each other":

1. **X-kinks at bends?** This problem was specific to the rejected polygon-based geometry. The live app uses stroked SVG paths and doesn't have this failure mode. If you ever re-evaluate the polygon approach, open `archive/claude-design/output/snake-geometry.js`, find `pointAt`, check both branches (straight and bend) return normals that match at the boundary. Specifically: the LTR bend's normal should be `-cos(theta), -sin(theta)`, NOT `cos(theta), sin(theta)`. The RTL straight's normal should be `(0, -1)` for an RTL row, NOT `(0, 1)`.

2. **Squished vertical layout?** Check that `build()` accepts a `rowGap` parameter and that bends are computed as half-ellipses, not half-circles tied to the bend radius. The bend segment in `segments[]` should have separate `a` (horizontal radius) and `b` (vertical radius = rowGap / 2).

## Files

- `archive/claude-design/output/snake-geometry.js` — the corrected geometry module (archived, no longer wired up anywhere)
- `archive/claude-design/output/test.html` — the standalone test harness (archived; the served copy under `public/claude-design-test/` was deleted on 2026-05-03)
- The live app (`src/lib/snake-path.ts`) renders bars as stroked SVG paths and never used the Claude Design geometry. It doesn't have the kink bug because it doesn't build polygons.

## Test page URL

The test harness is no longer served. The files live under `archive/claude-design/output/`. To inspect them locally, open `archive/claude-design/output/test.html` directly in a browser, or temporarily copy back into `public/` (and remember to remove again).

## What's still open in the live app (relevant beyond the geometry pass)

These items were flagged in the harness, but they show up in the live app too. They're tracked in `docs/decisions-pending.md` now, alongside the rest of the open visual / UX questions.

- **PRC event density** — six events in a 77-year span. Time-proportional plus dense events makes them pile up. Fix options live in `decisions-pending.md`.
- **Bar labels colliding with bends** — needs a placement rule that suppresses inline labels when the bar's center sits too close to a curve.
- **Tiny dynasties unlabeled** — the bar is too narrow for an inline label. Live app uses callout-above treatment for some cases (Xin, ROC); needs to be applied consistently.

## Resolved decision

**2026-05-03:** Wei rejected the Claude Design pass overall. The next-step decision is no longer "port the harness or wait for more design output". The live app's existing geometry is what we ship and iterate on. See `docs/decisions-pending.md` for the current open list.
