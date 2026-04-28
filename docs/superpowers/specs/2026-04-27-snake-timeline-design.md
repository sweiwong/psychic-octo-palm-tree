# Snake timeline redesign: design spec

Date: 2026-04-27
Status: Approved by Wei. Ready for implementation plan.
Supersedes: the wrapped-row rendering decisions in `2026-04-27-chinese-history-map-design.md`. Everything else from that spec stays.

## Why this exists

The first build used a wrapped multi-row timeline. Six horizontal bands stacked top to bottom, each reading left to right. After seeing the rendered output, Wei rejected it. The bands felt disconnected, dynasty bars looked the same, and the layout did not communicate the scale of Chinese history at a glance.

The new direction is a snake timeline. One continuous path from 2070 BCE to 2026 CE, alternating direction row by row, bending at the row ends. The whole timeline lives on one screen with no scrolling. Time on the path is proportional, so a 825-year dynasty looks 11x longer than a 74-year one. That visual contrast is the point.

## What we are building in v1

The dynasty spine. A single continuous bar that traces every dynasty from Xia to the People's Republic of China, with concurrent states (Liao, Jin, Western Xia, Sixteen Kingdoms) running as a thinner parallel ribbon below the main bar. Date ticks at every dynasty boundary. Hover tooltips. Click to open in the right detail panel.

Nothing else. No event dots, no figure callouts, no cultural anchors, no global context, no era washes. Those layers stay in the data and stay wired into the sidebar toggles, but the rendering for them is deferred.

## What we are deliberately not building yet

- Event markers (callout boxes for things like Battle of Red Cliffs, Cultural Revolution)
- Figure markers (Confucius, Sun Tzu, Yu the Great)
- Cultural anchors (Terracotta Army, Beijing as capital)
- Inventions (currently empty in the dataset anyway)
- Global context callouts (Alexander the Great, Rise of Islam)
- Era washes (the faint colored rectangles behind everything that grouped Qin-Han, Sui-Tang, etc.)
- Sub-period italic labels (Western Zhou, Eastern Zhou, Northern Song, Southern Song shown as text floating above the bar)
- The expand-row toggle button

The sidebar layer toggles for Events, Figures, Cultural anchors, Inventions, Global context, and Primary sources stay in the UI but render disabled with a "coming soon" tooltip. The state wiring stays untouched so layers slot in cleanly later.

## How the snake works

**Year mapping is linear.** Every year on the chart takes up the same amount of room. The total span is 2026 minus negative 2070, which is 4096 years. The total path length is the sum of all four horizontal segments plus the three half-circle bends. Pixels per year equals total path length divided by 4096. A year maps to a single point on the path by walking that many pixels along the path from the start.

This is different from the reference image Wei sent, which was non-proportional (each dynasty got similar visual weight regardless of duration). We are choosing proportional because Wei wants the chart to communicate the actual scale of Chinese history at a glance.

**The path has four rows.** Row 1 reads left to right, row 2 reads right to left, row 3 left to right, row 4 right to left. At each row end the path bends in a half-circle into the next row. The bend radius equals half the row height, so two adjacent row centerlines fit one full circle.

**The bends land wherever the math puts them.** At 4096 years total and four rows, each row carries roughly 1024 years of history, so the snake bends near years -1046, -22, and 1002. Those are not dynasty boundaries. A dynasty whose span crosses a bend will have its bar bend with the path. No special case in the code.

**Bar drawing is one stroke per dynasty along the path.** For each dynasty, generate the SVG path string for the snake segment between its start year and end year. Render that as a stroked path with the dynasty's fill color. Where the snake bends, the bar bends with it because it is the same path.

## Visual layers, back to front

1. **Snake backbone.** A faint outline of the full snake path in a low-opacity sepia. Always visible. Gives the user a sense of the underlying structure even where dynasties have not been rendered yet.
2. **Primary dynasty segments.** Each dynasty in `data.primary` rendered as a thick stroke along the path between its start and end years.
3. **Concurrent state ribbon.** Each entry in `data.concurrent` rendered as a thinner stroke offset perpendicular to the main bar, on the inside of the snake (toward the bottom of the screen for the first row, alternating with each bend). For straight segments, this is a constant y offset. For bends, this is a smaller-radius arc concentric with the main bend.
4. **Date ticks.** A small yellow pill with the year for every dynasty start year. Placed perpendicular to the path direction at that point. Pulled outward (away from the snake's interior).
5. **Dynasty labels.** Centered on each bar at its midpoint, rotated to match the bar tangent at that point. If the bar is too narrow for the label, label is hidden. The hover tooltip handles the small ones.

## Color differentiation

Two layers of color logic.

**Per-dynasty alternation.** Han Chinese dynasties in `data.primary` get alternating shades of vermillion in start-year order. The first dynasty (Xia) renders in `vermillion` (deeper), the next (Shang) in `vermillion2` (lighter), Zhou in `vermillion` again, and so on. This gives sharp visible boundaries between dynasties without needing dividers or extra graphics. Both shades already exist in `src/lib/colors.ts`. Yuan and Qing skip the alternation slot entirely (see next rule).

**Distinct color for non-Han Chinese rule.** Yuan (Mongol) and Qing (Manchu) render in a muted purple-vermillion, separate from the alternation pattern. This is the only place where color carries semantic information beyond decoration: it tells the user when the throne was held by a non-Han Chinese house. Add a new token `vermillion3` (purple-shifted) to `colors.ts`. Same family, distinct enough to read. Applies only to full main-lane dynasties. Concurrent non-Han states sit on the sepia ribbon below the main bar.

**Concurrent ribbon color.** The thinner sub-band uses sepia for non-Han concurrent states (Khitan Liao, Jurchen Jin, Western Xia) and the lighter `vermillion2` for Han Chinese concurrent states (Eastern Wei, Western Wei, Liu Song, etc.) when we eventually add them. For v1 the concurrent ribbon is sepia by default since most v9 concurrent entries are non-Han.

## Geometry, in the precision the implementer needs

The geometry module owns one job: given a year and an optional perpendicular offset, return a 2D position and the tangent direction at that point. Everything else (rendering, labels, ticks) calls into this.

**Inputs to geometry computation:**

- `width` (px): the canvas width
- `height` (px): the canvas height
- `padding` (px): margin on all four sides, default 40
- `rowCount`: 4
- `yearMin`: -2070
- `yearMax`: 2026

**Derived values:**

- `rowHeight` = (height - 2 * padding) / rowCount
- `cornerRadius` = rowHeight / 2
- `trackWidth` = width - 2 * padding - 2 * cornerRadius
- `arcLength` = π * cornerRadius
- `totalPathLength` = rowCount * trackWidth + (rowCount - 1) * arcLength
- `pxPerYear` = totalPathLength / (yearMax - yearMin)

**Per-row centerline y:**

- Row i centerline y = padding + cornerRadius + i * rowHeight
- Row 0 centerline y = padding + cornerRadius
- Row 1 centerline y = padding + cornerRadius + rowHeight
- Row 2 centerline y = padding + cornerRadius + 2 * rowHeight
- Row 3 centerline y = padding + cornerRadius + 3 * rowHeight

Each half-circle bend has diameter equal to `rowHeight`, so its endpoints land exactly on the centerlines of the two rows it connects.

Bend 0 (between row 0 and row 1) is centered at x = width - padding - cornerRadius, y = (rowHeight) / 2 + padding + cornerRadius. The arc goes from (width - padding - cornerRadius, row 0 y) clockwise 180 degrees to (width - padding - cornerRadius, row 1 y).

Bend 1 (between row 1 and row 2) is centered at x = padding + cornerRadius. Arc goes from row 1 y clockwise 180 to row 2 y, passing through (padding, midY).

Bend 2 (between row 2 and row 3) on the right side, mirroring bend 0.

**Year to path-distance:**

- distance(y) = (y - yearMin) * pxPerYear

**Path-distance to (x, y, tangent):**

Walk the snake from path start, consuming `distance` along the way:

- Segment lengths in order: [trackWidth, arcLength, trackWidth, arcLength, trackWidth, arcLength, trackWidth]
- For a given total distance, find which segment it lands in by subtracting prior segment lengths
- For a horizontal segment in row i: x is computed by walking left or right from the row start by the remaining distance, y is the row centerline
- For an arc, parametrize by angle: angle = (remaining distance / arcLength) * π, position = arc center + cornerRadius * (cos angle, sin angle), tangent = perpendicular to radial direction

**Year to (x, y, tangent, side normal):**

Composes the above. Returns:
- `x, y`: position on the centerline of the snake
- `tangent`: unit vector pointing in the direction of increasing year
- `normal`: unit vector perpendicular to tangent, pointing toward the snake's interior (the side where the next bend curves toward)

**Bar segment as SVG path string:**

Given a start year and end year, generate a path string that traces the snake from start to end. The path uses `M` (move to start), then a sequence of `L` (line to end of current segment) and `A` (arc to end of bend), ending with `L` to the end position. Renderer takes this string and applies it to a `<path>` element with stroke and fill.

**Concurrent ribbon offset:**

The concurrent ribbon sits at a constant perpendicular offset from the main path, on the side that always points toward greater y (visually below the main bar in screen coordinates regardless of which way the row is traveling).

For a perpendicular offset `d` (positive = below the main bar in screen coordinates):

- For horizontal segments in any row: shift the path's y by `+d`. Direction of travel does not change this.
- For bends: use radius `cornerRadius - d` instead of `cornerRadius`. The offset path is concentric with the main arc but tighter, riding on the inside of the curve.

This works because the inside of every bend in a 4-row snake points toward the greater-y side of the path. The math is consistent across all four rows and all three bends.

## Files to add, replace, delete

**Add:**

- `src/lib/snake-path.ts`: the geometry module described above. Pure functions. No React. Heavily unit tested.
- `src/lib/snake-path.test.ts`: tests for year-to-path mapping, arc parametrization, segment SVG generation.
- `src/components/timeline/SnakeBackbone.tsx`: renders the faint full snake path.
- `src/components/timeline/DynastySegment.tsx`: renders one dynasty as a snake-following stroked path with a label.
- `src/components/timeline/ConcurrentSegment.tsx`: renders one concurrent state as an offset stroked path.
- `src/components/timeline/DateTick.tsx`: renders one yellow date pill perpendicular to the snake at a given year.

**Replace:**

- `src/lib/layout.ts`: replaced by `snake-path.ts`. Delete after migration.
- `src/lib/layout.test.ts`: delete after `snake-path.test.ts` covers the new surface.
- `src/components/timeline/TimelineCanvas.tsx`: rewritten to orchestrate the snake. Same export name, same prop signature where possible, so `App.tsx` does not need to change.

**Delete:**

- `src/components/timeline/RowFrame.tsx`
- `src/components/timeline/SystemBand.tsx`
- `src/components/timeline/Markers.tsx`
- `src/components/timeline/DynastyBar.tsx`

The deletions are clean because none of these files are imported by anything outside `TimelineCanvas.tsx`.

**Untouched:**

- All of `src/data/` (load, types, search, normalize, fixtures)
- `src/lib/colors.ts` (will get one new color token added, not replaced)
- `src/lib/format.ts`
- `src/App.tsx` (the `TimelineCanvas` import points to the same path, which is now the new file)
- `src/components/Sidebar.tsx`, `TopBar.tsx`, `DetailPanel.tsx`, `MobileFallback.tsx`, `KnowledgeBaseStubs.tsx`
- `src/styles.css` (design tokens still apply)

## What `App.tsx` will need to know

The `TimelineCanvas` props change in two places:

- Drop `expandedRow` and `onToggleExpandRow`. There are no rows in the user-facing sense anymore.
- Drop `mode` ('overview' / 'detailed') for now. The snake renders the same way regardless. We can add density modes back later.

`App.tsx` keeps the state but stops passing it. We can remove the state entirely as cleanup, but for v1 leave it in place to keep the diff focused on the rendering layer.

## Coordinate sanity

At 1280px viewport width, the canvas shell is roughly 660 wide (after 280 sidebar and 340 detail panel). At 800px viewport height, the canvas is roughly 700 tall (after 64 topbar and some chrome).

With those numbers:

- rowHeight ≈ 155px
- cornerRadius ≈ 77.5px
- trackWidth ≈ 425px
- arcLength ≈ 244px
- totalPathLength ≈ 4 × 425 + 3 × 244 ≈ 2432px
- pxPerYear ≈ 0.594 px/year

Dynasty widths:

- Zhou (825 years) ≈ 490px (longer than one row, so wraps a bend)
- Han (404 years) ≈ 240px (over half a row)
- Tang (290 years) ≈ 172px
- Ming (276 years) ≈ 164px
- Qing (267 years) ≈ 159px
- Song (319 years total, split into Northern and Southern) ≈ 190px
- PRC (77 years) ≈ 46px (label fits, just barely)
- Yuan (97 years) ≈ 58px
- Five Dynasties (53 years) ≈ 31px (no label)
- Sui (37 years) ≈ 22px (no label)
- Qin (15 years) ≈ 9px (no label, just a thin sliver)
- Xin (17 years) ≈ 10px (no label)

Label visibility threshold: 50px. Below that, no label is drawn. Hover tooltip handles those.

## Risks and concessions

**Short-dynasty labels are gone.** Qin, Xin, Sui, Five Dynasties, and the Three Kingdoms get no on-bar label. They become slivers visible only via the date tick at their start, the hover tooltip, and the detail panel on click. This is the cost of proportional time. Wei accepted this trade-off explicitly.

**Wrapped-bar labels can land on bends.** A long dynasty like Han whose midpoint falls near or on a bend would have its label rotate to the bar tangent at the midpoint, which can read awkwardly. Mitigation: place the label at the midpoint of the *longest straight segment* of the bar rather than the geometric midpoint. Implement this in `DynastySegment.tsx`.

**Concurrent ribbon math is the trickiest part.** Offset paths around arcs need to use a different radius. Concurrent dynasties whose span crosses a bend need to wrap their offset path through the offset arc. This is well-defined math, but it is the part most likely to produce visual bugs. Spend test budget here.

**Adding the deferred layers later will need event-side geometry too.** When we add event markers in v2, an event at year y needs the same `(x, y, tangent, normal)` data the dynasty bar uses. We get this for free from `snake-path.ts`. No additional geometry work needed.

## Acceptance criteria

The v1 redesign is done when all of these are true:

1. Loading the page shows a single continuous snake path from Xia to PRC on one screen with no vertical scroll at 1280×800 viewport.
2. The bar bends are visible half-circles. The path is one continuous stroke (visually, even if implemented as multiple SVG path elements).
3. Every primary dynasty in `data.primary` renders as a stroke segment along the path with a fill color.
4. Adjacent dynasties show alternating shades of vermillion, with Yuan and Qing in the distinct purple-vermillion shade.
5. Every concurrent state in `data.concurrent` renders as a thinner sepia stroke offset below the main bar.
6. Each dynasty start year appears as a small yellow pill perpendicular to the path at that year position.
7. Dynasty labels (uppercase, Spectral serif) appear centered along bars wider than 50px, rotated to match the bar tangent at the label position.
8. Hovering any segment shows the tooltip with the dynasty name and date range.
9. Clicking any segment opens it in the right detail panel.
10. The sidebar layer toggle for Dynasties is the only enabled layer toggle. Events, Figures, Cultural anchors, Inventions, Global, and Primary sources are present but disabled with an explanatory tooltip.
11. The proportional check passes: Zhou's bar is at least 8 times the width of PRC's bar.
12. Unit tests for `snake-path.ts` pass with at least 90% coverage of the geometry module.
13. The existing test suite (data loading, search, format, types) still passes unchanged.

## Implementation phasing

Suggested order for the implementation plan (which the next skill writes out):

1. Build `snake-path.ts` with full unit tests. No React yet. Verify the math.
2. Build `SnakeBackbone.tsx` and render just the faint full path. Verify it looks right on screen at multiple viewport sizes.
3. Build `DynastySegment.tsx` with a single hardcoded dynasty. Verify the bar follows the snake correctly through bends.
4. Wire the full primary dynasty list. Verify all dynasties render in the right places with alternating color.
5. Build `ConcurrentSegment.tsx` with offset math. Verify Liao, Jin, Western Xia render correctly below their main-lane parents.
6. Build `DateTick.tsx`. Verify ticks appear at every transition.
7. Add labels to `DynastySegment.tsx` with the longest-straight-segment placement logic. Verify legibility.
8. Wire hover tooltips and click handlers.
9. Disable other-layer toggles in the sidebar.
10. Delete the dead files.

Each step is independently verifiable. The implementation plan should produce a working snapshot at every step.
