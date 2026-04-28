# Snake geometry — what makes it readable

Notes from the 2026-04-28 session evaluating Claude Design's `snake-geometry.js`. Save here because memory files don't survive across machines or across someone else opening this repo.

## What we did

Claude Design produced a `snake-geometry.js` file (the math for the snake path: 4 rows, time-proportional, half-circle U-bends). We saved it to `claude-design-output/snake-geometry.js` and built a standalone test harness at `claude-design-output/test.html` (also served from `public/claude-design-test/test.html`) so we could evaluate the geometry without touching the live React app.

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

1. **X-kinks at bends?** Open `claude-design-output/snake-geometry.js`, find `pointAt`, check both branches (straight and bend) return normals that match at the boundary. Specifically: the LTR bend's normal should be `-cos(theta), -sin(theta)`, NOT `cos(theta), sin(theta)`. The RTL straight's normal should be `(0, -1)` for an RTL row, NOT `(0, 1)`.

2. **Squished vertical layout?** Check that `build()` accepts a `rowGap` parameter and that bends are computed as half-ellipses, not half-circles tied to the bend radius. The bend segment in `segments[]` should have separate `a` (horizontal radius) and `b` (vertical radius = rowGap / 2).

## Files

- `claude-design-output/snake-geometry.js` — the corrected geometry module (canonical copy)
- `claude-design-output/test.html` — standalone test harness rendering the snake from the real dataset
- `public/claude-design-test/snake-geometry.js` — same as above but served by Vite at runtime
- `public/claude-design-test/test.html` — same as above but served by Vite at runtime
- The live app (`src/lib/snake-path.ts`) does NOT use this geometry yet. It still uses our prior TypeScript implementation, which doesn't have the kink bug because it renders bars as stroked paths instead of filled polygons.

## Test page URL

`http://localhost:5180/claude-design-test/test.html` when the dev server is running. Standalone preview, separate from the live app.

## What's still open

Three things were flagged as remaining when Wei said "much better now":

- **PRC event density** — six events crammed into a 77-year span on the bottom-left of the snake. Time-proportional + dense events = pile-up. Fix is either curating events down or rotating labels 90° / using horizontal compaction.
- **"WESTERN HAN" clipping into the left bend** — needs a placement rule that suppresses inline labels when the bar's center falls too close to a curve.
- **ROC unlabeled** — the bar is too narrow for an inline label. Needs a callout-above treatment like the live app does for tiny dynasties.

These are rendering bugs in the test harness's drawing code, not in the geometry math. They'll need solving when porting into the live React app, regardless.

## Three next-step options Wei was deciding between

1. **Keep iterating on the test page.** Fix remaining test-page issues before touching the live app. Lowest risk, slowest path to integration.
2. **Port the new geometry into TypeScript** and replace `src/lib/snake-path.ts` behind a feature flag. The math is sound; porting is mechanical. Once ported, the live app gets the cleaner bends, generous row gap, half-ellipse curves.
3. **Wait for Claude Design's full design pass.** Geometry is only one deliverable. Palette, typography, full visual treatment may come when usage resets.

If a future session resumes here without context, the answer to "what's the right next step?" is: ask Wei. As of 2026-04-28 she hadn't picked one yet.
