# archive/claude-design/

Archived 2026-05-03.

Everything in this folder is from the Claude Design pass that ran from 2026-04-26 through 2026-04-28. Wei evaluated the output and decided not to ship any of it. The live app uses our own TypeScript snake geometry (`src/lib/snake-path.ts`) and our own visual choices, not anything in this folder.

Kept here in case a future session wants to look back at what was tried and why it was rejected. Nothing in `src/` references any of these paths. None of this code runs.

## What's in here

### `output/`
The geometry experiment Claude Design produced after the brief. A standalone JS module (`snake-geometry.js`) that builds the snake as filled polygons with half-ellipse bends, plus a test page (`test.html`) that renders it from the real dataset.

The math is sound (after two fixes Wei applied: right-of-tangent normals at all path joins, and decoupling row gap from bend horizontal radius). It just isn't the direction we want for the final app. The live app uses stroked SVG paths with rounded line joins instead, which is simpler and gives smooth bends for free.

If a future session is curious about the kink and squish bugs that were fixed here, see `archive/claude-design/output/snake-geometry.js`. The fix notes used to live in `docs/snake-geometry-notes.md`.

### `prototype/`
The original Claude Design React/CSS/JSX prototype. CDN React + babel-standalone, museum-aesthetic styling (parchment, vermillion, OKLCH era washes), wrapped six-row timeline.

This was the visual specification the live app was originally meant to reproduce. Several locked decisions in `DECISIONS.md` are explicit reversals of the choices made here:

- Six rows became five (then four briefly, then five again)
- Vermillion-by-importance dynasty fills became cobalt/orange alternation
- Era washes were removed because they fought the dynasty palette
- Inline labels for short dynasties got replaced with callout-above treatment

The prototype is useful as a record of what was tried, not as a target to recreate.

### `handoff-bundle/`
The brief Wei wrote *to* Claude Design for the snake redesign, plus a screenshot of the then-current state of the live app, plus an example snake-map jpg used as visual reference. This was input to Claude Design, not output from it. Kept so the next person can see what was asked for.

### `brief.md`
A copy of the brief from `handoff-bundle/CLAUDE-DESIGN-BRIEF.md`. The original was duplicated at the project root; this archive folder gets the canonical copy.

## Why we stopped

Wei's words on 2026-05-03: "I tried using Claude Design for coming up with everything, but I decided there is actually so much slop. Now we are cleaning up all the mess that Claude Design put out."

The live snake at `localhost:5173` is the version we're moving forward with. Cleanup pass is documented in the commit that archived this folder.
