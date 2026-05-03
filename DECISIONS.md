# Locked-in design decisions

Read this BEFORE you write code, change visual styling, or follow recommendations from any reviewer agent. These decisions have already been argued and settled with Wei. Do not undo them. If you think one of them is wrong, raise it with Wei first and update this file when she agrees to change it.

The original `PRD.md` and the visual descriptions inside the project `CLAUDE.md` are STALE on visual specifics. This file overrides them. The reference for layout and palette is the snake-timeline design spec at `docs/superpowers/specs/2026-04-27-snake-timeline-design.md` plus this file.

---

## How to read this file

Each decision has:
- **What** — the actual choice
- **Why** — why we landed there
- **Date locked** — when Wei agreed
- **Do not change without** — what would have to be true to revisit

If you change something on this list without Wei's agreement, you are creating rework. The pattern that triggered this file: an agent followed a stale CLAUDE.md and a reviewer agent's recommendations, switched dynasty colors from cobalt-orange alternation to vermillion-importance, changed 4 rows to 6, and re-added era washes that had been deliberately removed. Every one of those undid prior settled work.

---

## Snake structure

**Four rows, not six.**
Why: At 4 rows, dynasty bars stay wide enough that names fit inside without needing callouts for most major dynasties. Six rows compresses the bars and forces too many short labels.
Date locked: 2026-04-27
Do not change without: Wei explicitly asking for more rows because of label collision in a specific row.

**Reversed 2026-04-28: five rows, not four.**
Why: At 4 rows, the modern era (last ~200 years on row 3) was crammed and the bend year-markers (e.g. "22 BCE" at the row 1 → row 2 transition) clipped against the canvas edge. Wei asked for 5 rows. With 5 rows, each year takes more pixels of horizontal space, so the modern cluster spreads out and the bend labels have room. Trade-off: rows are vertically thinner so bends are smaller; dynasty bars are wider per year so most short dynasties (Sui, Qin) gain a couple more pixels — still not enough to fit a label inline.
Date locked: 2026-04-28
Do not change without: Wei asking to go back to 4 (or to try another count).

**Time is strictly proportional across the entire snake.**
Year-to-position is linear: every year takes the same number of pixels of path length. PRC (77 years) appears as a tiny segment. Zhou (~825 years) appears as a long segment. Curves count toward total path length, so a dynasty that crosses a bend does not get extra space.
Date locked: 2026-04-27
Do not change without: Wei changing her mind about scale fidelity. She has stated this is non-negotiable.

**The snake is one continuous path with no breaks.**
A dynasty that crosses a row boundary bends with the path. Do not split bars at row breaks.
Date locked: 2026-04-27

---

## Color palette

**Dynasty fill: cobalt and orange alternating in start-year order.**
Use `dynastyStripeFill(id, indexInSortedPrimary)` from `src/lib/colors.ts`. Do NOT use `dynastyFill(importance)` even if a reviewer agent or a stale CLAUDE.md says vermillion is the museum palette. The vermillion-by-importance rule was tried and rejected because every important dynasty paints the same red, so neighboring dynasties of the same importance become visually indistinguishable.
Date locked: 2026-04-27 (commits `d4ff4b0`, `53e599e`, `dd2dd9a`)

**Update 2026-04-28: palette is OPEN, not locked.**
Wei has clarified that the cobalt / orange / purple-vermillion scheme was a stop-gap, not a final palette. It exists because the all-vermillion version was indecipherable. The palette is now the responsibility of the Claude Design pass to redesign. The only requirements that survive: (1) adjacent dynasties never share the same fill, (2) Yuan and Qing read as visually distinct from Han-Chinese dynasties because they were non-Han ruling houses, (3) the palette is colorful and engaging, not monotone. Whatever Claude Design returns becomes the new locked palette and this entry should be replaced with the specifics at that point.

**Reversed 2026-05-03: palette is OPEN, but no longer waiting on Claude Design.**
Wei evaluated Claude Design's pass and rejected it as slop. The Claude Design output is now archived under `archive/claude-design/`. Palette stays OPEN, with the same surviving requirements (adjacent dynasties differ; Yuan and Qing visually distinct as non-Han ruling houses; colorful, not monotone). Next palette iteration is a project-internal design choice, not a Claude Design deliverable. The existing cobalt / orange / purple-vermillion is what the live app ships at `localhost:5173` until that next pass.

**Yuan and Qing render in `vermillion3` (purple-shifted).**
This is the only place where color carries meaning beyond decoration. Yuan and Qing were non-Han ruling houses (Mongol and Manchu). The purple shift signals that. Do not extend this rule to other regimes.
Date locked: 2026-04-27

**Concurrent state bars: sepia.**
Wei, Shu, Wu during Three Kingdoms. Liao, Western Xia, Jurchen Jin during Song multi-state. Render below the main bar, not as colored ribbons that compete with the main palette.
Date locked: 2026-04-27

**Era washes: removed.**
The `SYSTEM_BAND_PALETTE` exists in `colors.ts` and may stay defined for future use, but do not paint era backgrounds behind the snake. They were tried and rejected because they fight the dynasty palette and create visual mud. The era list lives in the left sidebar; that is enough.
Date locked: 2026-04-27 (re-confirmed 2026-04-28 after a regression).
Do not re-add without: Wei specifically asking for them, after seeing how dense the screen is.

---

## Layout

**Canvas fits the viewport. No vertical scrolling.**
The whole snake must be visible at once on a 14-inch MacBook (~1440x900). The point of the snake is the big-picture view.
Date locked: 2026-04-28

**Right detail panel collapses to zero width when nothing is selected.**
When a user clicks a dynasty / event / figure, the panel slides in. When the user closes it, the panel collapses and the snake gets the full canvas.
Date locked: 2026-04-28

**Snake bar thickness: roughly 60 pixels.**
Up from the original 28. This was set to make dynasty names readable from a normal viewing distance.
Date locked: 2026-04-28
Do not change without: Wei asking for thicker or thinner.

**Left bend's outer edge aligns with the rows above and below.**
The first row (Xia, Shang) and the last row (PRC, ROC, Qing, …) extend leftward by `cornerRadius + barHalfThickness` so their left caps sit at the same x as the leftmost extent of the left bend (Western Han → Xin → Eastern Han). Without this extension, the bend visibly bulges further left than the row endpoints — Wei flagged this as "jutting out". Implementation: `endExtension` parameter on `computeGeometry` in `src/lib/snake-path.ts`. Default 0 (preserves the original behavior for tests). Production canvas passes `cornerRadius + 30` so the snake's left outline is one continuous vertical at `x = padding − barHalfThickness`. Proportional time mapping is preserved: pxPerYear is recomputed against the longer total path length, so every year still takes the same number of pixels.
Date locked: 2026-04-28
Do not change without: Wei asking for the bend back to its bulged form, or for a different alignment target.

---

## Layers and toggles

**Toggleable layers, like Google Maps.**
The left sidebar has checkboxes for Dynasties, Events, Figures, Cultural anchors, Inventions, Global context, Primary sources. Clicking any layer turns it on or off on the snake. Wei wants this behavior. Do not disable layers in v1 even though an earlier spec said to.
Date locked: 2026-04-28 (overrides the v1-disabled-layers note in `docs/superpowers/specs/2026-04-27-snake-timeline-design.md`).

**Year markers at row bends.**
Small yellow date pills at every curve so a first-time viewer does not lose their place when the snake bends back.
Date locked: 2026-04-28

**Reversed 2026-05-03: bend year markers removed.**
Why: The pills displayed years computed as evenly-spaced row breaks (1251 BCE, 432 BCE, 388 CE, 1207 CE), not real dynasty boundaries. They were an artifact of dividing the total year span by row count, not anything tied to the dataset. Wei flagged that this contradicts the locked rule that the snake is strictly time-proportional: showing a meaningless milestone year invites the viewer to reason about it as if it were significant. Dynasty start-year pills (1600 BCE, 1046 BCE, 770 BCE, 432 BCE, 221 BCE, etc.) carry orientation on their own. The bend pills were noise. Implementation: deleted `BendYearMarker` component and the `rowBreakYears` computation in `src/components/timeline/TimelineCanvas.tsx`.
Do not re-add without: a different anchoring scheme that ties pills to real dataset boundaries.

---

## Communication

**Plain English first, every message.**
This is the most-violated rule across sessions. The full rule is in `~/.claude/CLAUDE.md` and `~/.claude/wei-ai-writing-rules.md`. The project CLAUDE.md has a top section that points to it. Read it. Apply it. Engineering jargon goes in brackets after the plain English, never instead of it.

---

## How to update this file

Add a new entry at the bottom of the relevant section with the date Wei agreed. Do not silently rewrite an existing entry. If a decision is reversed, leave the old entry in place and add a new one underneath that says "Reversed YYYY-MM-DD because [reason]". This file is a log, not a specification snapshot.
