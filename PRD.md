# PRD

> **NOTE: This is the original brief. Do not treat it as the current spec.**
>
> Visual layout, palette, row count, and rendering decisions have moved on. The current sources of truth are:
>
> - `DECISIONS.md` — every locked-in choice with date and rationale
> - `docs/superpowers/specs/2026-04-27-snake-timeline-design.md` — the snake redesign spec that supersedes the wrapped-multi-row description below
>
> Read those two before this one. The wording below ("WRAPPED MULTI-ROW TIMELINE", multiple horizontal lanes, etc.) describes the original prototype. The shipped product is a continuous snake path.

---

Design a desktop-first web application UI for exploring Chinese history from ~2000 BCE to present.

Core requirement:
The timeline must be a WRAPPED MULTI-ROW TIMELINE, not a single long scroll.

Definition:
- The timeline is split into horizontal rows stacked vertically.
- Each row represents a segment of time.
- Time flows left to right within each row.
- When one row ends, the next row continues below it.
- This should feel like a museum wall timeline or atlas spread.

Layout:

1. Main canvas (center)
- A large scrollable canvas containing the wrapped timeline
- Each row contains multiple horizontal lanes:
  - Main dynasties (primary lane)
  - Concurrent states (above/below)
  - Events (dots)
  - Cultural / invention markers (icons)
  - Global comparison (bottom lane)

2. Left sidebar
- Filters:
  - dynasties
  - events
  - figures
  - culture
  - inventions
  - global context
  - primary sources (images)
- Search bar at top

3. Right detail panel
- Opens when user clicks an item
- Shows:
  - title
  - short description
  - large image (if available)
  - related items

4. Top bar
- Title: “Chinese History Map”
- Zoom controls
- Toggle: overview vs detailed mode

Visual encoding:

- Dynasties = long horizontal rounded bars
- Concurrent dynasties = parallel bars above/below main
- Events = small circular markers
- Cultural anchors = icon markers
- Primary sources = image thumbnail markers
- Global events = subtle contrasting color

Important example (must be visually clear):

Song period:
- Northern Song (960–1127) main bar
- Southern Song (1127–1279) continuation
- Liao (907–1125) above
- Jin (1115–1234) above overlapping
- Western Xia (1038–1227) side lane
- Events: Treaty of Chanyuan, Jingkang Incident

The design must clearly show overlap and coexistence.

Interaction:

- Hover → tooltip
- Click → open right panel
- Zoom in/out timeline
- Button to expand a single row to full width
- Toggle layers on/off

Style:

- Academic, museum-quality
- Minimalist, not playful
- Light parchment background or dark scholarly theme
- Serif headings, clean sans-serif UI
- Subtle gridlines for time

Important constraint:

Do NOT design a single long horizontal timeline.
Do NOT design a vertical timeline.

This must be a wrapped, multi-row timeline grid.

Output:

- Full UI layout
- Component breakdown
- Suggested React component structure
- SVG-based timeline rendering approach