# Chinese History Map — Claude Design handoff brief

## What this is

A desktop-first web app that shows all of Chinese history (~2070 BCE to 2026 CE) on a single screen, as a continuous "snake" — a timeline that wraps left-to-right, then down, then right-to-left, then down, then back, like a museum atlas spread. The whole sweep of Chinese history fits one screen, no scrolling.

The app is for general curious users who want to see the big picture of Chinese history at a glance, then click into a dynasty, event, or figure to read more.

## What I want from you

Design the visual language for this product from scratch. Specifically:

1. **The snake itself** — palette, bar treatment, how dynasty names sit inside, how the bend transitions look.
2. **The left sidebar** — search, the toggleable layers (Dynasties, Events, Figures, Cultural anchors, Global context), and the filter behavior.
3. **How non-dynasty content renders relative to the snake** — events, figures, cultural anchors, concurrent states, global context. They should feel like part of one cohesive system, not like data points stuck on top.
4. **The right detail panel** — appears when a user clicks any item, slides in from the right, shows the entry. Collapses to zero width when nothing is selected so the snake gets the full canvas.
5. **The top bar** — title, subtitle, view controls (Overview / Detailed, zoom, reset).
6. **The hover and click states** — what happens when you mouse over a dynasty bar, an event label, a figure marker.

I want one cohesive design system. Avoid generic data-viz aesthetics. Treat this like a museum atlas, not a dashboard.

## Two reference images

**`snapshot-current-state.png`** — what the app looks like right now. This is the latest working state after several rounds of iteration. The structure is roughly correct (snake shape, time-proportional bars, layers turned on, detail panel collapses) but the visual treatment is clunky. Use this as a structural reference, not a visual one.

**`example-chinese-history-snakemap.jpg`** — a printed reference I like the look of. Calm muted palette, dense but legible event labels, yellow date pills at transitions, concurrent kingdoms as thin bars below the main snake. Note that this reference is NOT time-proportional (PRC takes the same horizontal space as Zhou, which is wrong), but the visual language is the direction I want to go.

## Hard constraints (do not negotiate these)

- **Time is strictly proportional.** Every year takes the same number of pixels along the snake path. PRC (77 years) is tiny next to Zhou (790 years). The example image gets this wrong; do not copy that part.
- **The whole snake fits one screen on a 14-inch MacBook.** No vertical scrolling. The point is the big picture.
- **Leave generous breathing room around the snake.** The snake must not run edge-to-edge. There needs to be enough space on the left, right, top, and bottom for event labels, figure markers, cultural anchors, and concurrent state bars to live comfortably without crashing into the canvas edges or getting clipped. Treat the empty space around the snake as part of the design, not as wasted real estate. Events near the curves should never be truncated. The snake should feel like a panel of art with margins, like a museum exhibit, not a chart squeezed to fill a window.
- **Dates must be visible on the snake itself.** Every dynasty transition gets a small date marker at the start year, sitting on the bar (or just beside it where it joins the next dynasty). This is what makes the snake actually readable as a timeline rather than a sequence of named blocks. The example reference image shows this exactly: small yellow pills with the year (2070 BC, 1046 BC, 221 BC, 1644 CE, 1949 CE, etc.) on every dynasty boundary. Without these dates the user cannot anchor any dynasty to a real year.
- **Continuous path, no breaks.** When a dynasty crosses a row boundary, its bar bends with the path. Do not split bars at row breaks.
- **Each dynasty must be visually distinct from its neighbors.** Pick whatever palette makes that work. The current cobalt / orange / purple-vermillion scheme is a stop-gap from an earlier round (the all-vermillion version was indecipherable because every important dynasty rendered the same red). Feel free to throw it out. Use a Google-style rainbow, an editorial palette, an atlas palette, whatever fits the museum-quality direction. The hard requirements are: (1) adjacent dynasties never share the same fill, (2) the palette is colorful and engaging rather than monotone, (3) Yuan and Qing read as visually distinct from the Han-Chinese dynasties because they were non-Han ruling houses (Mongol and Manchu) — this is the one place where color carries semantic meaning beyond decoration. How you encode that distinction is your call.
- **Four rows.** Tried six, too compressed.
- **Desktop-first, 1280px viewport baseline.**
- **Aesthetic: calm, atlas-quality.** White or near-white background so the dynasty colors, date pills, and event markers can pop. Avoid heavy parchment / cream tones — they mute everything sitting on top. Muted accent colors are fine, the page itself should feel clean and bright. Serif typography for titles, monospace for years.

## What's in the data

All entity counts below reflect the dataset after recent cleanup. The schema is in `src/data/types.ts`.

### Primary dynasties (24, on the main lane of the snake)
Xia, Shang, Zhou (with sub-periods Western Zhou, Eastern Zhou, Spring and Autumn, Warring States), Qin, Western Han, Xin, Eastern Han, Three Kingdoms, Jin, Northern and Southern Dynasties, Sui, Tang, Five Dynasties and Ten Kingdoms, Northern Song, Southern Song, Yuan, Ming, Qing, Republic of China, People's Republic of China.

### Concurrent states (6, render below the main snake during their period)
- During Three Kingdoms: Wei (north lane), Shu (west lane), Wu (south lane)
- During Song multi-state: Liao / Khitan (north), Western Xia (west), Jin / Jurchen (north)

### Figures (3, single-year markers)
Yu the Great (-2100), Confucius (-551), Sun Tzu (-500)

### Cultural anchors (3, single-year markers)
Terracotta Army (-210), Beijing as Yuan capital / Dadu / Khanbaliq (1271), Forbidden City built under Yongle (1420)

### Global context (2, single-year markers, sit BELOW the snake to signal "outside China")
Alexander the Great (-330), Rise of Islam (610)

### Events (32, single-year markers)
A mix of dynastic transitions, military events, cultural shifts, and modern milestones. Ranges from Oracle bone script (-1200) to Belt and Road (2013). The dataset is curated, not exhaustive, so density varies — Han and Qing periods have many events; Xia and early Zhou have few.

## Interaction model

### Left sidebar
- **Search box** at the top. Live-filter results as the user types. Search hits any entity (dynasty, event, figure, anchor, global). Clicking a result selects that entity in the detail panel.
- **Layer toggles** below the search. Each layer has a checkbox + count. Default is all on. Toggling a layer hides/shows that layer instantly on the snake.
  - Dynasties (24) — always on by default; turning off hides the snake entirely
  - Events (32)
  - Figures (3)
  - Cultural anchors (3)
  - Global context (2)
  - Inventions — placeholder, currently zero entries; can disable in the UI
  - Primary sources — placeholder, currently zero entries; can disable in the UI
- **Legend** explains the visual language (main lane bar, concurrent state bar, event marker, figure marker, anchor marker, global context marker).

### Snake interactions
- **Hover any item:** subtle highlight, tooltip with name and date(s)
- **Click any item:** opens the right detail panel with that entity
- **Click empty space:** closes the detail panel, deselects everything

### Right detail panel
- **Slides in from the right** when an item is selected. Around 320–360 pixels wide.
- **Collapses to zero width** when nothing is selected.
- **Shows:** entity kind, title, year or date range, optional illustration plate (currently a placeholder), summary paragraph, related items as clickable chips, knowledge-base section (placeholder for future links).
- **Close button** in the top right of the panel returns to "nothing selected" state.

### Top bar
- App title + subtitle
- View mode segmented control: "Overview" vs "Detailed" (currently affects label density)
- Zoom controls: minus, percentage readout, plus, "Reset"

## What's currently working (preserve)

- The snake math: time-proportional path, four rows, continuous bends, dynasties bend with the path
- Cobalt/orange alternation with Yuan and Qing in purple
- Detail panel collapse-on-idle
- Layer toggles wired up to the renderer
- Search index across all entities
- Year markers (yellow date pills) at every row bend so users don't lose their place at curves
- Hover tooltips and click-to-select

## What's currently NOT working / needs your help

- **Visual treatment of the snake itself.** Current bars are flat solid stripes. The bend transitions are abrupt. There's no atlas-quality feel.
- **Event label density and placement.** When 32 events render, labels collide and clutter. The example image solves this with tiny grey boxes and short connector lines, but ours doesn't yet.
- **Hierarchy between the main snake, concurrent states, figures, anchors, and global context.** Right now they're separate visual treatments that don't feel unified.
- **Sub-period rendering** (Spring and Autumn, Warring States, Western Zhou, Eastern Zhou) — these are sub-spans inside Zhou. The example image shows them as smaller divisions WITHIN the larger dynasty bar. Ours currently treats them as separate bars and they fight with the parent Zhou bar.
- **Top bar visual style.** Currently functional but plain.
- **Sidebar visual style.** Currently functional but plain.

## Out of scope

- **Mobile / tablet design.** Desktop-first only.
- **Real content for the right detail panel.** The summaries are placeholder; treat the panel as a placeholder shell.
- **Inventions and primary sources layers.** Data is empty for these; design the toggles but assume they show nothing.
- **Animation or motion design beyond simple hover and panel slide.**
- **Authentication, save state, sharing.** None of that exists yet.

## Stack constraints

The app is React + TypeScript + Vite. SVG-based rendering. No canvas / WebGL. Whatever you design has to be implementable as SVG primitives and standard HTML/CSS. If a visual treatment requires custom shaders or canvas-only effects, redesign it.

## Files in this repo that already exist

- `src/lib/snake-path.ts` — the geometry math for the proportional snake (year-to-position, path generation, bend transitions). This is correct and shouldn't change.
- `src/lib/colors.ts` — current design tokens. You can replace these but the cobalt/orange/purple-vermillion semantic is locked.
- `src/styles.css` — current OKLCH design tokens for parchment / ink / rules. Same — replaceable but the palette decisions in `DECISIONS.md` apply.
- `DECISIONS.md` — the locked-in choices. Read it.
- `public/china-history.json` — the dataset.

## What I'd like back from you

A clean visual design system covering everything above, presented as:

1. A reference visual (mockup, image, or live HTML) showing the snake at full canvas with all layers on
2. A short style guide: palette, typography, spacing, key components
3. Specs for each interaction state (hover, selected, disabled)
4. Treatment notes for the dense parts (events density, sub-period nesting, concurrent state rendering)

I want one design pass that we can implement against, not a back-and-forth iteration loop.
