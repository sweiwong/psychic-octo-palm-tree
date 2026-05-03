# Decisions pending — pick these up next session

Last updated 2026-05-03. Wei needs to make calls on these before more code work makes sense. Listed in roughly the order they'd unblock the next chunk of work.

> **Resolved 2026-05-03:** items 1 (which integration path), 2 (filled polygons vs stroked paths), 6 (what to do with the test harness), and 7 (when to update DECISIONS.md after the port). The Claude Design pass was rejected as slop. The live app keeps its existing TypeScript geometry (`src/lib/snake-path.ts`) and stroked-path rendering. The test harness has been deleted; the rest of Claude Design's output has been archived under `archive/claude-design/`. `DECISIONS.md` was updated to reflect that the palette is no longer waiting on Claude Design. See the cleanup commit on 2026-05-03 for details.

The remaining open items below all came out of the senior-frontend / UX review of the live app on 2026-05-03.

## 1. Right-edge clipping on the bottom row

The PRC bar at the bottom-right runs off the canvas. The callout label hangs off the page. This is a layout bug, not a design choice. Likely the same root cause as the empty trailing space on row 1: bends consume time, but the renderer isn't extending the right-most bar through the bend.

**Decision:** Fix as a bug or rethink how end-of-row bends are handled at the snake's far ends.

## 2. Empty trailing space at the end of row 1

Xia and Shang occupy about half of row 1, then the snake curves around to row 2 with a long bare segment that has no fill. The bend marker reads "1251 BCE", but Shang ends 1046 BCE and Western Zhou starts 1046 BCE. The ~205 years from 1251 BCE through the bend are unfilled.

**Decision:** Either fill the bend with the active dynasty's color through its true end year, or compress the bend so it consumes less timeline.

## 3. Concurrent state visual treatment

Currently rendered as thin sepia ribbons below the main snake. Visible under Three Kingdoms (Wei / Shu / Wu) and under Northern Song (Liao / Western Xia / Jin Jurchen). Reads as footnotes, not as parallel kingdoms.

The PRD calls "coexistence has to be visually obvious" the canonical test, and right now it isn't.

Options:

- Keep sepia thin ribbons but bump weight and add labels inline.
- Make them equal visual weight to the main bar, offset below, with a different fill.
- Treat as a parallel mini-snake — full bar weight, distinct color family.

**Decision:** How distinct should concurrent kingdoms feel from main-lane dynasties?

## 4. PRC event density

Six events fall in the 1949–2026 range (Mao death, Tiananmen, Hong Kong return, First crewed space, Xi consolidation, Belt and Road). At time-proportional scale, that's six labels in roughly 30–40 pixels of bar width.

Options:

- **Curate down** to two or three modern events.
- **Rotate labels 90°** so they read vertically.
- **Compact callouts** with leader lines fanned out from the bar.
- **Click-to-reveal** — show only the most important modern events at default zoom.

**Decision:** Pick how dense modern events should feel. Affects PRC, Qing, and Tang rows specifically.

## 5. Layer toggle defaults

Right now all layer toggles default to ON (Dynasties, Events, Figures, Cultural anchors, Global context). With 32 events visible, some rows could feel busy once the Events layer is on.

Options:

- All on by default (current state).
- Dynasties + Figures + Cultural anchors on, Events off by default.
- All on, but each non-dynasty layer dims to ~30% opacity until hovered.

**Decision:** What does the first-load view look like? Dense or curated?

## 6. Inconsistent label placement

Some dynasty names sit inside the bar (Western Han, Tang, Ming). Some are called out above (Three Kingdoms, Five Dynasties, Northern and Southern, Republic of China). Some called out below (People's Republic of China). Some run vertically inside curves (Eastern Zhou, Southern Song, Jin).

**Decision:** One rule per situation, applied consistently. Worth a short style guide note.

## 7. Year-marker styling

The yellow pills at every bend look like Post-it notes against the museum-style palette. Also: "9 C 23 CE" at the Xin dynasty reads like a typo (it's two markers, 9 CE and 23 CE, crammed together).

**Decision:** New marker style (sepia? cream-on-charcoal?) and a special-case rule for short interregnum periods.

## 8. Warring States stripe block

The gray vertical-stripe block at the start of row 3 looks like a glitch. Same chart, different visual language.

**Decision:** Replace with something that belongs to the same palette as the rest of the snake, or accept the stripe as the convention for "fragmented period" and apply it consistently elsewhere.

## 9. Sidebar legend weight

The left sidebar legend is doing a lot of explaining ("Major dynasty / Concurrent state / Discrete event / Cultural anchor / Global context"). Strong charts barely need legends. Either make the visual language self-evident, or hide the legend behind a "?" toggle.

**Decision:** Trim, or move to a collapsible section.

## 10. Interaction affordances

Nothing on screen tells a first-time viewer that the chart is interactive. No hover preview, no obvious click affordance.

**Decision:** Add at minimum a hover-lift on dynasty bars. Possibly a subtle "click any bar for details" hint on first load.

## 11. Overview / Detailed toggle in the top-right

Hard to tell at a glance which mode is currently active. Selected state needs more contrast.

**Decision:** Restyle the toggle so the active state is obviously active.

---

**How to use this doc next session:** open it before writing any code. Either resolve the open items in conversation with Wei (preferred) or pick the most defensible default and call it out so Wei can override. Don't silently make these calls.
