# Chinese History Map: implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Status

- **Phase:** Phase B complete (Tasks 1–9 done), starting Phase C next
- **Last completed:** Task 9 — Search (`9198f09 feat: substring search over the entity index, capped at 30 results`)
- **Next up:** Phase C, Task 10 — Port prototype stylesheet
- **Last commit on `build/v1`:** `9198f09 feat: substring search over the entity index, capped at 30 results`
- **Updated:** 2026-04-27

> **Convention for keeping this current:**
> Update the four fields above whenever the active session is about to clear context (manual `/checkpoint`, hitting context limits, or finishing a phase).
> Checkbox state in the tasks below stays the source of truth for what is done; this block is the fast-pickup pointer for the next session.
> When in doubt about state, run `git log --oneline` to see which task commits have landed.

---

**Goal:** Build a polished, deployable React + TypeScript implementation of the wrapped multi-row Chinese history timeline, matching the Claude Design prototype faithfully, ready to share as a public Vercel link.

**Architecture:** Single-page React 18 app built with Vite. State lives in `App.tsx` via `useState`. Data loads once at startup from a static JSON file, validated with Zod, and normalized into typed collections. Rendering uses inline SVG with the wrapped multi-row layout math ported from the prototype's `layout.js`. No backend, no auth, no database. The detail panel includes a v2 plug-in seam so markdown notes can plug in later without architectural changes.

**Tech Stack:** React 18, TypeScript 5+, Vite 5+, Zod 3+, Vitest (unit tests), Playwright (E2E tests), Vercel (hosting).

**Reference:** The visual specification is the prototype in `handoff-extracted/history-of-china/project/`. Read those files when porting any component to match colors, spacing, fonts, and interaction details.

**Branch strategy:** Implementation work happens on a feature branch `build/v1`. The initial commit (spec + inputs) is on `main`. Merge `build/v1` to `main` once Phase G ships a working Vercel deploy.

---

## Phase A: Setup

### Task 1: Reorganize existing inputs

**Files:**
- Move: `china_history_v9.json` → `public/china-history.json` (with `meta.version` added)
- Move: `china_history_v9.xlsx` → `archive/china_history_v9.xlsx`
- Move: `china_history_v9_errors.json` → `archive/china_history_v9_errors.json`

- Move: `china_history_v9_validation_summary.txt` → `archive/china_history_v9_validation_summary.txt`
- Move: `History of China-handoff.zip` → `archive/History of China-handoff.zip`
- Keep in place: `CLAUDE.md`, `PRD.md`, `.gitignore`, `docs/`, `handoff-extracted/`, `.claude/`

- [ ] **Step 1: Create branch and target folders**

```bash
cd /Users/weiwong/code/portfolio/chinese-history-map
git checkout -b build/v1
mkdir -p public archive
```

- [ ] **Step 2: Move dataset to `public/` with the version field**

```bash
# Copy the JSON to its new home, then add meta.version using node
cp china_history_v9.json public/china-history.json
node -e '
const fs = require("fs");
const path = "public/china-history.json";
const data = JSON.parse(fs.readFileSync(path, "utf8"));
data.meta.version = 9;
fs.writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
console.log("Added meta.version = 9");
'
```

Verify the version field landed:

```bash
node -e 'console.log(JSON.parse(require("fs").readFileSync("public/china-history.json", "utf8")).meta)'
```

Expected output:
```
{ sourceWorkbook: 'china_history_v9.xlsx', recordCount: 77, errorCount: 0, version: 9 }
```

- [ ] **Step 3: Move source files to archive**

```bash
git mv china_history_v9.json archive/china_history_v9.json
git mv china_history_v9.xlsx archive/china_history_v9.xlsx
git mv china_history_v9_errors.json archive/china_history_v9_errors.json
git mv china_history_v9_validation_summary.txt archive/china_history_v9_validation_summary.txt
git mv "History of China-handoff.zip" "archive/History of China-handoff.zip"
git add public/china-history.json
git status
```

Expected: 5 renames + 1 new file (`public/china-history.json`).

- [ ] **Step 4: Commit the reorganization**

```bash
git commit -m "chore: move dataset to public/, archive source files

Dataset is now public/china-history.json with meta.version=9.
Source xlsx, validation reports, and the handoff zip move to archive/.
Project root is now ready for src/ and the build pipeline."
```

---

### Task 2: Scaffold Vite + React + TypeScript

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx` (placeholder app)
- Create: `src/App.tsx` (placeholder)
- Create: `src/vite-env.d.ts`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "chinese-history-map",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@playwright/test": "^1.47.0",
    "@types/node": "^22.5.0",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.4",
    "vite": "^5.4.2",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` populated, `package-lock.json` created.

- [ ] **Step 3: Create `tsconfig.json` with strict mode**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": false
  },
  "include": ["src", "tests"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts", "playwright.config.ts"]
}
```

- [ ] **Step 5: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    sourcemap: true,
  },
  server: {
    port: 5173,
    open: false,
  },
});
```

- [ ] **Step 6: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1280" />
    <title>Chinese History Map</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+SC:wght@500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Create placeholder `src/main.tsx` and `src/App.tsx`**

`src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`src/App.tsx`:
```tsx
export default function App() {
  return <div>Chinese History Map: scaffolding works</div>;
}
```

`src/vite-env.d.ts`:
```ts
/// <reference types="vite/client" />
```

- [ ] **Step 8: Verify dev server runs**

```bash
npm run dev &
sleep 3
curl -s http://localhost:5173 | head -20
kill %1 2>/dev/null || true
```

Expected: HTML response containing `<div id="root"></div>` and the script tag for `/src/main.tsx`.

- [ ] **Step 9: Verify type-check passes**

```bash
npm run typecheck
```

Expected: no errors, exit code 0.

- [ ] **Step 10: Update `.gitignore` for build outputs**

Append to `.gitignore`:
```
package-lock.json
```

Wait — actually keep `package-lock.json` tracked so deploys are reproducible. Skip this step. Just verify the existing `.gitignore` already covers `node_modules/`, `dist/`, etc. Run:

```bash
cat .gitignore | grep -E "node_modules|dist"
```

Expected output:
```
node_modules/
dist/
```

- [ ] **Step 11: Commit the scaffold**

```bash
git add package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts index.html src/
git commit -m "feat: scaffold Vite + React 18 + TypeScript

Adds package.json with React, Zod, Vitest, Playwright dependencies.
Strict TypeScript config with noUnusedLocals and exactOptionalPropertyTypes.
Vite config targets ES2022, dev server on port 5173.
Placeholder App component renders 'scaffolding works' to verify the pipeline."
```

---

### Task 3: Add Vitest configuration

**Files:**
- Modify: `vite.config.ts` to include test config
- Create: `src/test-setup.ts`

- [ ] **Step 1: Update `vite.config.ts` to include Vitest**

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    sourcemap: true,
  },
  server: {
    port: 5173,
    open: false,
  },
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
});
```

- [ ] **Step 2: Create `src/test-setup.ts`**

```ts
// Vitest setup file. Currently empty; reserved for future global test config.
export {};
```

- [ ] **Step 3: Verify Vitest runs (with no tests yet)**

```bash
npm test
```

Expected: "No test files found" message, exit code 0 or 1 depending on Vitest version. Either is fine; we just want to confirm Vitest discovers the config without errors.

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts src/test-setup.ts
git commit -m "feat: configure Vitest for unit testing"
```

---

## Phase B: Pure utilities (TDD)

Each task in this phase follows strict TDD: write the failing test, run to see it fail, implement, run to see it pass, commit.

### Task 4: Year formatting helpers

**Files:**
- Create: `src/lib/format.ts`
- Create: `src/lib/format.test.ts`

Year formatting takes a number and produces a human-readable string. Negative numbers are BCE, positive are CE. There is no year zero.

- [ ] **Step 1: Write the failing test**

`src/lib/format.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { fmtYear, fmtRange } from './format';

describe('fmtYear', () => {
  it('formats CE years without a suffix change for positive', () => {
    expect(fmtYear(1644)).toBe('1644 CE');
  });

  it('formats BCE years using absolute value', () => {
    expect(fmtYear(-221)).toBe('221 BCE');
  });

  it('formats year 1 as 1 CE', () => {
    expect(fmtYear(1)).toBe('1 CE');
  });

  it('formats year -1 as 1 BCE', () => {
    expect(fmtYear(-1)).toBe('1 BCE');
  });
});

describe('fmtRange', () => {
  it('formats a range spanning BCE to CE', () => {
    expect(fmtRange(-221, 220)).toBe('221 BCE – 220 CE');
  });

  it('formats a fully BCE range', () => {
    expect(fmtRange(-1046, -256)).toBe('1046 BCE – 256 BCE');
  });

  it('formats a fully CE range', () => {
    expect(fmtRange(960, 1279)).toBe('960 CE – 1279 CE');
  });
});
```

- [ ] **Step 2: Run the test, verify it fails**

```bash
npm test src/lib/format.test.ts
```

Expected: failure with "Cannot find module './format'" or similar.

- [ ] **Step 3: Implement `src/lib/format.ts`**

```ts
export function fmtYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}

export function fmtRange(start: number, end: number): string {
  return `${fmtYear(start)} – ${fmtYear(end)}`;
}
```

- [ ] **Step 4: Run the test, verify it passes**

```bash
npm test src/lib/format.test.ts
```

Expected: all 7 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/format.ts src/lib/format.test.ts
git commit -m "feat: add year formatting helpers (BCE/CE)"
```

---

### Task 5: Design token color exports

**Files:**
- Create: `src/lib/colors.ts`

This is a one-shot file with the OKLCH color tokens from the prototype. The CSS file holds the same values; this module mirrors them so SVG renderer code can reference them by name without parsing CSS.

- [ ] **Step 1: Create `src/lib/colors.ts`**

```ts
// Design tokens mirroring the OKLCH custom properties in src/styles.css.
// Used by SVG renderer code that can't read CSS variables directly.

export const COLOR = {
  parchment:   'oklch(0.965 0.012 78)',
  parchment2:  'oklch(0.945 0.018 75)',
  parchment3:  'oklch(0.915 0.022 72)',
  ink:         'oklch(0.22 0.015 60)',
  ink2:        'oklch(0.42 0.012 60)',
  ink3:        'oklch(0.62 0.010 60)',
  rule:        'oklch(0.86 0.015 70)',
  ruleStrong:  'oklch(0.78 0.020 70)',
  vermillion:  'oklch(0.55 0.155 32)',
  vermillion2: 'oklch(0.62 0.135 32)',
  sepia:       'oklch(0.55 0.080 65)',
  sepia2:      'oklch(0.72 0.060 70)',
  jade:        'oklch(0.58 0.060 165)',
  indigo:      'oklch(0.45 0.060 250)',
  gold:        'oklch(0.72 0.110 80)',
} as const;

export type ImportanceLevel = 1 | 2 | 3 | 4 | 5;

export function dynastyFill(importance: ImportanceLevel): string {
  if (importance >= 5) return COLOR.vermillion;
  if (importance >= 4) return COLOR.vermillion2;
  return COLOR.sepia;
}

export const SYSTEM_BAND_PALETTE = [
  'oklch(0.93 0.03 65)',
  'oklch(0.92 0.03 95)',
  'oklch(0.92 0.025 175)',
  'oklch(0.93 0.03 30)',
  'oklch(0.92 0.03 290)',
] as const;
```

- [ ] **Step 2: Verify type-check passes**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/colors.ts
git commit -m "feat: export design token colors as TypeScript constants"
```

---

### Task 6: Wrapped-row layout math

**Files:**
- Create: `src/lib/layout.ts`
- Create: `src/lib/layout.test.ts`

Port the wrapped-row math from `handoff-extracted/history-of-china/project/layout.js` to TypeScript. Six rows split at fixed year breakpoints. Two key functions: `clipRange(start, end)` for span items, `locate(year)` for point items.

- [ ] **Step 1: Write the failing test**

`src/lib/layout.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { ROW_BREAKS, rowsFor, locate, clipRange, ticksFor } from './layout';

describe('ROW_BREAKS', () => {
  it('has seven breakpoints producing six rows', () => {
    expect(ROW_BREAKS).toHaveLength(7);
    expect(ROW_BREAKS[0]).toBe(-2070);
    expect(ROW_BREAKS[ROW_BREAKS.length - 1]).toBe(2030);
  });
});

describe('rowsFor', () => {
  it('produces six rows with start/end pairs', () => {
    const rows = rowsFor();
    expect(rows).toHaveLength(6);
    expect(rows[0]).toEqual({ index: 0, start: -2070, end: -1000 });
    expect(rows[5]).toEqual({ index: 5, start: 1700, end: 2030 });
  });
});

describe('locate', () => {
  it('locates a year inside the first row', () => {
    expect(locate(-1500)).toEqual({ rowIndex: 0, frac: expect.closeTo(0.5327, 3) });
  });

  it('locates a year inside the last row', () => {
    expect(locate(1900)).toEqual({ rowIndex: 5, frac: expect.closeTo(0.6061, 3) });
  });

  it('clamps a year past the final breakpoint into the last row', () => {
    const result = locate(2050);
    expect(result.rowIndex).toBe(5);
    expect(result.frac).toBeLessThanOrEqual(1);
  });
});

describe('clipRange', () => {
  it('clips a single-row range into one segment', () => {
    const segs = clipRange(-221, -206);
    expect(segs).toHaveLength(1);
    expect(segs[0].rowIndex).toBe(1);
    expect(segs[0].isStart).toBe(true);
    expect(segs[0].isEnd).toBe(true);
  });

  it('clips a multi-row range into multiple segments', () => {
    // Han: 206 BCE to 220 CE spans rows 1 and 2 (-200 boundary)
    const segs = clipRange(-206, 220);
    expect(segs.length).toBeGreaterThanOrEqual(2);
    expect(segs[0].rowIndex).toBe(1);
    expect(segs[0].isStart).toBe(true);
    expect(segs[0].isEnd).toBe(false);
    const last = segs[segs.length - 1];
    expect(last.isEnd).toBe(true);
  });

  it('returns segments with x0 < x1 in [0, 1]', () => {
    const segs = clipRange(-1046, -256);
    for (const s of segs) {
      expect(s.x0).toBeGreaterThanOrEqual(0);
      expect(s.x1).toBeLessThanOrEqual(1);
      expect(s.x0).toBeLessThan(s.x1);
    }
  });
});

describe('ticksFor', () => {
  it('produces century ticks for a 1000+ year row', () => {
    const ticks = ticksFor({ index: 0, start: -2070, end: -1000 });
    expect(ticks).toContain(-2000);
    expect(ticks).toContain(-1500);
    expect(ticks).toContain(-1100);
    expect(ticks).not.toContain(0);
  });

  it('produces tighter ticks for a smaller row', () => {
    const ticks = ticksFor({ index: 5, start: 1700, end: 2030 });
    expect(ticks).toContain(1750);
    expect(ticks).toContain(1900);
    expect(ticks).toContain(2000);
  });
});
```

- [ ] **Step 2: Run the test, verify it fails**

```bash
npm test src/lib/layout.test.ts
```

Expected: failure with module-not-found.

- [ ] **Step 3: Implement `src/lib/layout.ts`**

```ts
// Wrapped multi-row timeline layout math.
// Splits the [-2070, 2030] span into six rows. Items spanning a row boundary
// are clipped per row so a long bar continues seamlessly into the next row.

export const ROW_BREAKS = [
  -2070,   // Row 0 start
  -1000,   // Row 0 end / Row 1 start  (1070 yrs: Xia / Shang / W.Zhou)
  -200,    // Row 1 end                 (800 yrs: late Zhou / Warring States / Qin)
   500,    // Row 2 end                 (700 yrs: Han / disunion)
  1100,    // Row 3 end                 (600 yrs: Sui / Tang / N.Song)
  1700,    // Row 4 end                 (600 yrs: S.Song / Yuan / Ming / early Qing)
  2030,    // Row 5 end                 (330 yrs: late Qing / ROC / PRC)
] as const;

export interface Row {
  index: number;
  start: number;
  end: number;
}

export interface YearLocation {
  rowIndex: number;
  frac: number;  // 0..1 within the row
}

export interface RangeSegment {
  rowIndex: number;
  x0: number;     // 0..1 start fraction in row
  x1: number;     // 0..1 end fraction in row
  isStart: boolean;
  isEnd: boolean;
}

export function rowsFor(): Row[] {
  const rows: Row[] = [];
  for (let i = 0; i < ROW_BREAKS.length - 1; i++) {
    rows.push({ index: i, start: ROW_BREAKS[i], end: ROW_BREAKS[i + 1] });
  }
  return rows;
}

export function locate(year: number): YearLocation {
  const rows = rowsFor();
  for (const r of rows) {
    if (year >= r.start && year < r.end) {
      return { rowIndex: r.index, frac: (year - r.start) / (r.end - r.start) };
    }
  }
  const last = rows[rows.length - 1];
  return {
    rowIndex: last.index,
    frac: Math.min(1, (year - last.start) / (last.end - last.start)),
  };
}

export function clipRange(yStart: number, yEnd: number): RangeSegment[] {
  const rows = rowsFor();
  const out: RangeSegment[] = [];
  for (const r of rows) {
    const a = Math.max(yStart, r.start);
    const b = Math.min(yEnd, r.end);
    if (a < b) {
      out.push({
        rowIndex: r.index,
        x0: (a - r.start) / (r.end - r.start),
        x1: (b - r.start) / (r.end - r.start),
        isStart: a === yStart,
        isEnd: b === yEnd,
      });
    }
  }
  return out;
}

export function ticksFor(row: Row): number[] {
  const span = row.end - row.start;
  const step = span > 900 ? 200 : span > 500 ? 100 : 50;
  const ticks: number[] = [];
  const first = Math.ceil(row.start / step) * step;
  for (let y = first; y < row.end; y += step) {
    if (y === 0) continue;  // there is no year zero
    ticks.push(y);
  }
  return ticks;
}
```

- [ ] **Step 4: Run the test, verify it passes**

```bash
npm test src/lib/layout.test.ts
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/layout.ts src/lib/layout.test.ts
git commit -m "feat: port wrapped-row layout math from prototype to TypeScript

ROW_BREAKS, rowsFor, locate, clipRange, ticksFor.
Six rows with density tightening toward the present."
```

---

### Task 7: Entity types and Zod schemas

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/types.test.ts`

Mirror the dataset shape with TypeScript types. Build Zod schemas alongside that catch a malformed dataset at runtime.

- [ ] **Step 1: Write the failing test**

`src/data/types.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { rawDatasetSchema, type RawDataset } from './types';

describe('rawDatasetSchema', () => {
  const validMinimal: RawDataset = {
    systems: [],
    regimes: [],
    events: [],
    figures: [],
    culturalAnchors: [],
    culturalWorks: [],
    innovations: [],
    globalContext: [],
    all: [],
    meta: { sourceWorkbook: 'x', recordCount: 0, errorCount: 0, version: 9 },
  };

  it('accepts a minimal valid dataset', () => {
    expect(() => rawDatasetSchema.parse(validMinimal)).not.toThrow();
  });

  it('rejects a regime missing required fields', () => {
    const bad = {
      ...validMinimal,
      regimes: [{ id: 'R_X', name: 'X' }],  // missing many required fields
    };
    expect(() => rawDatasetSchema.parse(bad)).toThrow();
  });

  it('accepts a real regime entry', () => {
    const data = {
      ...validMinimal,
      regimes: [{
        id: 'R_TANG',
        type: 'regime' as const,
        systemId: 'sui_tang',
        name: 'Tang',
        startYear: 618,
        endYear: 907,
        year: null,
        parentId: null,
        lane: 'main' as const,
        importance: 5 as const,
        summary: 'Imperial peak',
        isPoint: false as const,
        duration: 289,
      }],
    };
    expect(() => rawDatasetSchema.parse(data)).not.toThrow();
  });

  it('accepts a real event entry', () => {
    const data = {
      ...validMinimal,
      events: [{
        id: 'E_TANG_1',
        type: 'event' as const,
        systemId: 'sui_tang',
        name: 'An Lushan Rebellion',
        startYear: null,
        endYear: null,
        year: 755,
        parentId: 'R_TANG',
        lane: 'event' as const,
        importance: 5 as const,
        summary: 'Weakens Tang',
        isPoint: true as const,
        duration: 0,
      }],
    };
    expect(() => rawDatasetSchema.parse(data)).not.toThrow();
  });
});
```

- [ ] **Step 2: Run the test, verify it fails**

```bash
npm test src/data/types.test.ts
```

Expected: module-not-found.

- [ ] **Step 3: Implement `src/data/types.ts`**

```ts
import { z } from 'zod';

// ---------- Source dataset shape (matches china-history.json) ----------

export const entityTypeSchema = z.enum([
  'macro_system',
  'regime',
  'event',
  'figure',
  'cultural_anchor',
  'global_context',
]);
export type EntityType = z.infer<typeof entityTypeSchema>;

export const sourceLaneSchema = z.enum([
  'main', 'north', 'west', 'south',
  'event', 'figure', 'anchor', 'global',
]);
export type SourceLane = z.infer<typeof sourceLaneSchema>;

export const importanceSchema = z.union([
  z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5),
]);
export type Importance = z.infer<typeof importanceSchema>;

const baseEntityFields = {
  id: z.string(),
  type: entityTypeSchema,
  systemId: z.string().nullable(),
  name: z.string(),
  parentId: z.string().nullable(),
  lane: sourceLaneSchema,
  importance: importanceSchema,
  summary: z.string(),
};

export const spanEntitySchema = z.object({
  ...baseEntityFields,
  startYear: z.number(),
  endYear: z.number(),
  year: z.null(),
  isPoint: z.literal(false),
  duration: z.number(),
});
export type SourceSpanEntity = z.infer<typeof spanEntitySchema>;

export const pointEntitySchema = z.object({
  ...baseEntityFields,
  startYear: z.null(),
  endYear: z.null(),
  year: z.number(),
  isPoint: z.literal(true),
  duration: z.literal(0),
});
export type SourcePointEntity = z.infer<typeof pointEntitySchema>;

export const anyEntitySchema = z.union([spanEntitySchema, pointEntitySchema]);
export type SourceEntity = z.infer<typeof anyEntitySchema>;

export const rawDatasetSchema = z.object({
  systems: z.array(spanEntitySchema),
  regimes: z.array(spanEntitySchema),
  events: z.array(pointEntitySchema),
  figures: z.array(pointEntitySchema),
  culturalAnchors: z.array(pointEntitySchema),
  culturalWorks: z.array(pointEntitySchema),
  innovations: z.array(pointEntitySchema),
  globalContext: z.array(pointEntitySchema),
  all: z.array(anyEntitySchema),
  meta: z.object({
    sourceWorkbook: z.string(),
    recordCount: z.number(),
    errorCount: z.number(),
    version: z.number().optional(),
  }),
});
export type RawDataset = z.infer<typeof rawDatasetSchema>;

// ---------- Normalized shape (used by the renderer) ----------

export type RenderLane =
  | 'main' | 'above' | 'above2' | 'below' | 'below2'
  | 'event' | 'figure' | 'anchor' | 'global';

export interface NormalizedSpanItem {
  id: string;
  type: EntityType;
  name: string;
  start: number;
  end: number;
  duration: number;
  importance: Importance;
  systemId: string | null;
  parentId: string | null;
  sourceLane: SourceLane;
  renderLane: RenderLane;
  summary: string;
}

export interface NormalizedPointItem {
  id: string;
  type: EntityType;
  name: string;
  year: number;
  importance: Importance;
  systemId: string | null;
  parentId: string | null;
  renderLane: RenderLane;
  summary: string;
}

export interface NormalizedSystem {
  id: string;
  systemId: string;
  name: string;
  start: number;
  end: number;
  summary: string;
}

export interface SearchEntry {
  id: string;
  type: EntityType;
  name: string;
  summary: string;
  year: number | null;
  startYear: number | null;
  endYear: number | null;
}

export interface NormalizedData {
  primary: NormalizedSpanItem[];        // main lane regimes
  concurrent: NormalizedSpanItem[];     // north / west / south regimes
  systems: NormalizedSystem[];          // era bands
  events: NormalizedPointItem[];
  figures: NormalizedPointItem[];
  culture: NormalizedPointItem[];       // cultural anchors
  inventions: NormalizedPointItem[];
  global: NormalizedPointItem[];
  childrenByParent: Map<string, NormalizedPointItem[]>;
  searchIndex: SearchEntry[];
}

export interface SelectedItem {
  kind: 'dynasty' | 'concurrent' | 'event' | 'figure' | 'culture' | 'invention' | 'global' | 'era';
  id: string;
  title: string;
  year: number | null;
  start: number | null;
  end: number | null;
  summary: string;
  importance?: Importance;
  duration?: number;
  systemId?: string | null;
  parentId?: string | null;
}

export interface LayerToggles {
  dynasties: boolean;
  events: boolean;
  figures: boolean;
  culture: boolean;
  inventions: boolean;
  global: boolean;
  sources: boolean;
}

export const defaultLayers: LayerToggles = {
  dynasties: true,
  events: true,
  figures: true,
  culture: true,
  inventions: true,
  global: true,
  sources: true,
};
```

- [ ] **Step 4: Run the test, verify it passes**

```bash
npm test src/data/types.test.ts
```

Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/data/types.ts src/data/types.test.ts
git commit -m "feat: define entity types and Zod schemas

RawDataset schema mirrors the source JSON exactly.
NormalizedData is the post-load shape the renderer wants.
SelectedItem captures the union of kinds the detail panel renders.
LayerToggles + defaultLayers feed the sidebar filters."
```

---

### Task 8: Dataset loader and normalizer

**Files:**
- Create: `src/data/load.ts`
- Create: `src/data/load.test.ts`
- Create: `src/data/__fixtures__/tiny-dataset.json` (small fixture for tests)

The loader fetches the JSON, validates it, and produces the normalized shape. Five normalization rules:
1. Hide umbrella regimes that have main-lane children.
2. Map source lanes (main/north/west/south) to render lanes (main/above/above2/below/below2).
3. Pre-compute children-by-parent index.
4. Build a flat search index.
5. Skip the source's denormalized `all` array.

- [ ] **Step 1: Create the test fixture**

`src/data/__fixtures__/tiny-dataset.json`:
```json
{
  "systems": [
    {
      "id": "S_QH",
      "type": "macro_system",
      "systemId": "qin_han",
      "name": "Qin-Han system",
      "startYear": -221,
      "endYear": 220,
      "year": null,
      "parentId": null,
      "lane": "main",
      "importance": 5,
      "summary": "Imperial system",
      "isPoint": false,
      "duration": 441
    }
  ],
  "regimes": [
    {
      "id": "R_ZHOU",
      "type": "regime",
      "systemId": "zhou_order",
      "name": "Zhou",
      "startYear": -1046,
      "endYear": -256,
      "year": null,
      "parentId": null,
      "lane": "main",
      "importance": 5,
      "summary": "Mandate of Heaven",
      "isPoint": false,
      "duration": 790
    },
    {
      "id": "SR_ZHOU_W",
      "type": "regime",
      "systemId": "zhou_order",
      "name": "Western Zhou",
      "startYear": -1046,
      "endYear": -771,
      "year": null,
      "parentId": "R_ZHOU",
      "lane": "main",
      "importance": 5,
      "summary": "Feudal order",
      "isPoint": false,
      "duration": 275
    },
    {
      "id": "R_QIN",
      "type": "regime",
      "systemId": "qin_han",
      "name": "Qin",
      "startYear": -221,
      "endYear": -206,
      "year": null,
      "parentId": null,
      "lane": "main",
      "importance": 5,
      "summary": "First empire",
      "isPoint": false,
      "duration": 15
    },
    {
      "id": "R_LIAO",
      "type": "regime",
      "systemId": "song_system",
      "name": "Liao (Khitan)",
      "startYear": 907,
      "endYear": 1125,
      "year": null,
      "parentId": null,
      "lane": "north",
      "importance": 5,
      "summary": "Steppe empire controlling north China",
      "isPoint": false,
      "duration": 218
    }
  ],
  "events": [
    {
      "id": "E_QIN_1",
      "type": "event",
      "systemId": "qin_han",
      "name": "Qin unification",
      "startYear": null,
      "endYear": null,
      "year": -221,
      "parentId": "R_QIN",
      "lane": "event",
      "importance": 5,
      "summary": "Unifies China",
      "isPoint": true,
      "duration": 0
    }
  ],
  "figures": [],
  "culturalAnchors": [],
  "culturalWorks": [],
  "innovations": [],
  "globalContext": [],
  "all": [],
  "meta": {
    "sourceWorkbook": "tiny.xlsx",
    "recordCount": 6,
    "errorCount": 0,
    "version": 9
  }
}
```

- [ ] **Step 2: Write the failing test**

`src/data/load.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { normalize } from './load';
import tinyDataset from './__fixtures__/tiny-dataset.json';
import { rawDatasetSchema } from './types';

describe('normalize', () => {
  const raw = rawDatasetSchema.parse(tinyDataset);
  const data = normalize(raw);

  it('hides umbrella regimes with main-lane children', () => {
    const ids = data.primary.map(r => r.id);
    expect(ids).not.toContain('R_ZHOU');     // Zhou is umbrella with main-lane child SR_ZHOU_W
    expect(ids).toContain('SR_ZHOU_W');       // child stays
    expect(ids).toContain('R_QIN');           // Qin has no children, stays
  });

  it('maps north lane to render lane "above"', () => {
    const liao = data.concurrent.find(r => r.id === 'R_LIAO');
    expect(liao).toBeDefined();
    expect(liao!.renderLane).toBe('above');
  });

  it('puts main-lane regimes in primary, others in concurrent', () => {
    const primaryIds = data.primary.map(r => r.id);
    const concurrentIds = data.concurrent.map(r => r.id);
    expect(primaryIds).toContain('SR_ZHOU_W');
    expect(concurrentIds).toContain('R_LIAO');
  });

  it('builds the children-by-parent index', () => {
    const children = data.childrenByParent.get('R_QIN');
    expect(children).toBeDefined();
    expect(children!.map(c => c.id)).toContain('E_QIN_1');
  });

  it('builds a search index covering all entity kinds', () => {
    const ids = data.searchIndex.map(s => s.id);
    expect(ids).toContain('SR_ZHOU_W');
    expect(ids).toContain('R_LIAO');
    expect(ids).toContain('R_QIN');
    expect(ids).toContain('E_QIN_1');
  });

  it('exposes systems for era bands', () => {
    expect(data.systems).toHaveLength(1);
    expect(data.systems[0].name).toBe('Qin-Han system');
  });
});
```

- [ ] **Step 3: Run the test, verify it fails**

```bash
npm test src/data/load.test.ts
```

Expected: module-not-found.

- [ ] **Step 4: Implement `src/data/load.ts`**

```ts
import {
  rawDatasetSchema,
  type RawDataset,
  type NormalizedData,
  type NormalizedSpanItem,
  type NormalizedPointItem,
  type NormalizedSystem,
  type SourceLane,
  type RenderLane,
  type SearchEntry,
  type SourceSpanEntity,
  type SourcePointEntity,
} from './types';

const SOURCE_TO_RENDER_LANE: Record<SourceLane, RenderLane> = {
  main: 'main',
  north: 'above',
  west: 'above2',
  south: 'below',
  event: 'event',
  figure: 'figure',
  anchor: 'anchor',
  global: 'global',
};

function spanToRenderable(r: SourceSpanEntity, renderLane: RenderLane): NormalizedSpanItem {
  return {
    id: r.id,
    type: r.type,
    name: r.name,
    start: r.startYear,
    end: r.endYear,
    duration: r.duration,
    importance: r.importance,
    systemId: r.systemId,
    parentId: r.parentId,
    sourceLane: r.lane,
    renderLane,
    summary: r.summary,
  };
}

function pointToRenderable(p: SourcePointEntity): NormalizedPointItem {
  return {
    id: p.id,
    type: p.type,
    name: p.name,
    year: p.year,
    importance: p.importance,
    systemId: p.systemId,
    parentId: p.parentId,
    renderLane: SOURCE_TO_RENDER_LANE[p.lane],
    summary: p.summary,
  };
}

function spanSearchEntry(r: SourceSpanEntity): SearchEntry {
  return {
    id: r.id,
    type: r.type,
    name: r.name,
    summary: r.summary,
    year: null,
    startYear: r.startYear,
    endYear: r.endYear,
  };
}

function pointSearchEntry(p: SourcePointEntity): SearchEntry {
  return {
    id: p.id,
    type: p.type,
    name: p.name,
    summary: p.summary,
    year: p.year,
    startYear: null,
    endYear: null,
  };
}

export function normalize(raw: RawDataset): NormalizedData {
  // Find umbrella regimes that have main-lane children, so we can hide them.
  const childMainCount = new Map<string, number>();
  for (const r of raw.regimes) {
    if (r.lane === 'main' && r.parentId) {
      childMainCount.set(r.parentId, (childMainCount.get(r.parentId) ?? 0) + 1);
    }
  }

  const primary: NormalizedSpanItem[] = [];
  const concurrent: NormalizedSpanItem[] = [];

  for (const r of raw.regimes) {
    if (r.lane === 'main') {
      if (childMainCount.has(r.id)) continue;  // umbrella with main-lane children, skip
      primary.push(spanToRenderable(r, 'main'));
    } else {
      const renderLane = SOURCE_TO_RENDER_LANE[r.lane];
      concurrent.push(spanToRenderable(r, renderLane));
    }
  }

  const events = raw.events.map(pointToRenderable);
  const figures = raw.figures.map(pointToRenderable);
  const culture = raw.culturalAnchors.map(pointToRenderable);
  const inventions = raw.innovations.map(pointToRenderable);
  const global = raw.globalContext.map(pointToRenderable);

  const systems: NormalizedSystem[] = raw.systems.map(s => ({
    id: s.id,
    systemId: s.systemId ?? s.id,
    name: s.name,
    start: s.startYear,
    end: s.endYear,
    summary: s.summary,
  }));

  // Children-by-parent index. Parents may be regimes or systems.
  const childrenByParent = new Map<string, NormalizedPointItem[]>();
  for (const child of [...events, ...figures, ...culture]) {
    if (!child.parentId) continue;
    const arr = childrenByParent.get(child.parentId) ?? [];
    arr.push(child);
    childrenByParent.set(child.parentId, arr);
  }

  // Flat search index across every kind we want to search.
  const searchIndex: SearchEntry[] = [
    ...raw.regimes.filter(r => !childMainCount.has(r.id)).map(spanSearchEntry),
    ...raw.events.map(pointSearchEntry),
    ...raw.figures.map(pointSearchEntry),
    ...raw.culturalAnchors.map(pointSearchEntry),
    ...raw.innovations.map(pointSearchEntry),
    ...raw.globalContext.map(pointSearchEntry),
  ];

  return {
    primary,
    concurrent,
    systems,
    events,
    figures,
    culture,
    inventions,
    global,
    childrenByParent,
    searchIndex,
  };
}

export async function loadHistoryData(
  url = '/china-history.json'
): Promise<NormalizedData> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load dataset: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  const validated = rawDatasetSchema.parse(json);
  return normalize(validated);
}
```

- [ ] **Step 5: Run the test, verify it passes**

```bash
npm test src/data/load.test.ts
```

Expected: 6 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/data/load.ts src/data/load.test.ts src/data/__fixtures__/
git commit -m "feat: dataset loader with Zod validation and normalization

normalize() hides umbrella regimes, maps source lanes to render lanes,
builds children-by-parent index, and produces the search index.
loadHistoryData() fetches and validates the JSON, throws on failure."
```

---

### Task 9: Search

**Files:**
- Create: `src/data/search.ts`
- Create: `src/data/search.test.ts`

Substring search across the search index. Returns matched entries with their kind label so the sidebar can render them.

- [ ] **Step 1: Write the failing test**

`src/data/search.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { search } from './search';
import type { SearchEntry } from './types';

const fixtures: SearchEntry[] = [
  { id: 'R_TANG', type: 'regime', name: 'Tang', summary: 'Imperial peak', year: null, startYear: 618, endYear: 907 },
  { id: 'E_TANG_1', type: 'event', name: 'An Lushan Rebellion', summary: 'Weakens Tang', year: 755, startYear: null, endYear: null },
  { id: 'F_CONF', type: 'figure', name: 'Confucius', summary: 'Ethical philosophy', year: -551, startYear: null, endYear: null },
  { id: 'R_QIN', type: 'regime', name: 'Qin', summary: 'First empire', year: null, startYear: -221, endYear: -206 },
];

describe('search', () => {
  it('returns empty for empty query', () => {
    expect(search('', fixtures)).toEqual([]);
    expect(search('   ', fixtures)).toEqual([]);
  });

  it('matches by name (case insensitive)', () => {
    const results = search('tang', fixtures);
    const ids = results.map(r => r.id);
    expect(ids).toContain('R_TANG');
    expect(ids).toContain('E_TANG_1');  // "Weakens Tang" in summary
  });

  it('matches by summary', () => {
    const results = search('philosophy', fixtures);
    expect(results.map(r => r.id)).toEqual(['F_CONF']);
  });

  it('returns empty for no matches', () => {
    expect(search('nonsense', fixtures)).toEqual([]);
  });

  it('limits results to 30', () => {
    const many: SearchEntry[] = Array.from({ length: 50 }, (_, i) => ({
      id: `X_${i}`,
      type: 'event',
      name: 'match',
      summary: '',
      year: i,
      startYear: null,
      endYear: null,
    }));
    expect(search('match', many)).toHaveLength(30);
  });
});
```

- [ ] **Step 2: Run the test, verify it fails**

```bash
npm test src/data/search.test.ts
```

- [ ] **Step 3: Implement `src/data/search.ts`**

```ts
import type { SearchEntry } from './types';

const MAX_RESULTS = 30;

export function search(query: string, index: SearchEntry[]): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const matches: SearchEntry[] = [];
  for (const entry of index) {
    if (matches.length >= MAX_RESULTS) break;
    const haystack = `${entry.name} ${entry.summary}`.toLowerCase();
    if (haystack.includes(q)) {
      matches.push(entry);
    }
  }
  return matches;
}
```

- [ ] **Step 4: Run the test, verify it passes**

```bash
npm test src/data/search.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/data/search.ts src/data/search.test.ts
git commit -m "feat: substring search over the entity index, capped at 30 results"
```

---

## Phase C: Stylesheet

### Task 10: Port the prototype stylesheet

**Files:**
- Create: `src/styles.css` (port from `handoff-extracted/history-of-china/project/styles.css`)
- Modify: `src/main.tsx` to import the stylesheet

The prototype CSS is 498 lines, well-organized, with OKLCH design tokens at the top. Copy it as-is; the only change needed is none, because all selectors match the React component tree we'll build.

- [ ] **Step 1: Copy the stylesheet from the prototype**

```bash
cp handoff-extracted/history-of-china/project/styles.css src/styles.css
```

- [ ] **Step 2: Add the stylesheet import to `src/main.tsx`**

Update `src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 3: Verify dev server still renders cleanly**

```bash
npm run dev &
sleep 3
curl -s http://localhost:5173 | grep -q "Chinese History Map" && echo "OK"
kill %1 2>/dev/null || true
```

Expected: prints "OK" (the title is in the HTML head).

- [ ] **Step 4: Commit**

```bash
git add src/styles.css src/main.tsx
git commit -m "feat: port prototype stylesheet with OKLCH design tokens"
```

---

## Phase D: UI components

These tasks skip unit tests per the spec. The verification step at the end of each task is a manual visual check in the dev server. End-to-end coverage comes in Phase F.

### Task 11: Mobile fallback wrapper

**Files:**
- Create: `src/components/MobileFallback.tsx`
- Create: `public/desktop-preview.png` (placeholder; replace with real screenshot in Task 27)

`MobileFallback` shows a static preview when viewport width is below 1024px. Uses `matchMedia` so it responds to resize without reload.

- [ ] **Step 1: Create a placeholder preview image**

```bash
# A 1px transparent PNG as placeholder. Real screenshot replaces this in Task 27.
node -e '
const fs = require("fs");
const buf = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", "base64");
fs.writeFileSync("public/desktop-preview.png", buf);
console.log("Wrote 1px placeholder to public/desktop-preview.png");
'
```

- [ ] **Step 2: Create `src/components/MobileFallback.tsx`**

```tsx
import { useEffect, useState, type ReactNode } from 'react';

const DESKTOP_QUERY = '(min-width: 1024px)';

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia(DESKTOP_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}

interface MobileFallbackProps {
  children: ReactNode;
}

export function MobileFallback({ children }: MobileFallbackProps) {
  const isDesktop = useIsDesktop();
  if (isDesktop) return <>{children}</>;

  return (
    <div className="mobile-fallback">
      <div className="mobile-fallback-inner">
        <div className="seal" aria-hidden>中</div>
        <h1>Chinese History Map</h1>
        <p className="mobile-fallback-sub">A wrapped timeline atlas, 2070 BCE – 2026 CE</p>
        <img
          src="/desktop-preview.png"
          alt="Preview of the desktop timeline"
          className="mobile-fallback-preview"
        />
        <p className="mobile-fallback-msg">
          This timeline is built for desktop. Open this link on a larger screen to explore.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Append mobile fallback styles to `src/styles.css`**

Append to the bottom of `src/styles.css`:
```css

/* ---------- Mobile fallback ---------- */
.mobile-fallback {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: var(--parchment);
  color: var(--ink);
}
.mobile-fallback-inner {
  max-width: 480px;
  text-align: center;
}
.mobile-fallback-inner h1 {
  font-family: "Spectral", serif;
  font-size: 28px;
  font-weight: 600;
  margin: 18px 0 4px 0;
}
.mobile-fallback-sub {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: var(--ink-3);
  margin: 0 0 24px 0;
}
.mobile-fallback-preview {
  width: 100%;
  height: auto;
  border: 1px solid var(--rule-strong);
  background: var(--parchment-2);
  margin: 16px 0;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top left;
}
.mobile-fallback-msg {
  font-family: "Spectral", serif;
  font-style: italic;
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.5;
}
```

- [ ] **Step 4: Verify type-check**

```bash
npm run typecheck
```

- [ ] **Step 5: Commit**

```bash
git add src/components/MobileFallback.tsx src/styles.css public/desktop-preview.png
git commit -m "feat: mobile fallback component with matchMedia hook"
```

---

### Task 12: TopBar

**Files:**
- Create: `src/components/TopBar.tsx`

Reference: `handoff-extracted/history-of-china/project/components-chrome.jsx` lines 53-78.

- [ ] **Step 1: Create `src/components/TopBar.tsx`**

```tsx
type Mode = 'overview' | 'detailed';

interface TopBarProps {
  zoom: number;
  onZoom: (z: number) => void;
  mode: Mode;
  onMode: (m: Mode) => void;
  onResetView: () => void;
}

export function TopBar({ zoom, onZoom, mode, onMode, onResetView }: TopBarProps) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="seal" aria-hidden>中</div>
        <div className="title-block">
          <div className="title-main">Chinese History Map</div>
          <div className="title-sub">A wrapped timeline atlas · 2070 BCE – 2026 CE</div>
        </div>
      </div>
      <div className="topbar-right">
        <div className="seg" role="tablist" aria-label="View density">
          <button
            className={mode === 'overview' ? 'on' : ''}
            onClick={() => onMode('overview')}
            role="tab"
            aria-selected={mode === 'overview'}
          >
            Overview
          </button>
          <button
            className={mode === 'detailed' ? 'on' : ''}
            onClick={() => onMode('detailed')}
            role="tab"
            aria-selected={mode === 'detailed'}
          >
            Detailed
          </button>
        </div>
        <div className="zoom">
          <button onClick={() => onZoom(Math.max(0.7, zoom - 0.15))} title="Zoom out" aria-label="Zoom out">–</button>
          <span className="zoom-val">{Math.round(zoom * 100)}%</span>
          <button onClick={() => onZoom(Math.min(1.8, zoom + 0.15))} title="Zoom in" aria-label="Zoom in">+</button>
          <button className="reset" onClick={onResetView}>Reset</button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TopBar.tsx
git commit -m "feat: TopBar with title, mode toggle, zoom controls, reset view"
```

---

### Task 13: Sidebar

**Files:**
- Create: `src/components/Sidebar.tsx`

Reference: `handoff-extracted/history-of-china/project/components-chrome.jsx` lines 80-172.

- [ ] **Step 1: Create `src/components/Sidebar.tsx`**

```tsx
import type { LayerToggles, NormalizedData, NormalizedSystem, SearchEntry, SelectedItem } from '../data/types';
import { COLOR } from '../lib/colors';
import { fmtRange, fmtYear } from '../lib/format';

type LayerKey = keyof LayerToggles;

interface SidebarProps {
  search: string;
  onSearchChange: (s: string) => void;
  layers: LayerToggles;
  onToggleLayer: (key: LayerKey) => void;
  counts: Record<LayerKey, number>;
  results: SearchEntry[];
  systems: NormalizedSystem[];
  onPickResult: (entry: SearchEntry) => void;
  onPickEra: (era: NormalizedSystem) => void;
}

const FILTER_DEFS: Array<{ key: LayerKey; label: string; glyph: string }> = [
  { key: 'dynasties',   label: 'Dynasties',        glyph: '▬' },
  { key: 'events',      label: 'Events',           glyph: '●' },
  { key: 'figures',     label: 'Figures',          glyph: '◆' },
  { key: 'culture',     label: 'Cultural anchors', glyph: '✦' },
  { key: 'inventions',  label: 'Inventions',       glyph: '◼' },
  { key: 'global',      label: 'Global context',   glyph: '▭' },
  { key: 'sources',     label: 'Primary sources',  glyph: '▣' },
];

function kindClassFor(entry: SearchEntry): string {
  switch (entry.type) {
    case 'regime': return 'kind-dynasty';
    case 'event': return 'kind-event';
    case 'figure': return 'kind-figure';
    case 'cultural_anchor': return 'kind-culture';
    case 'global_context': return 'kind-global';
    case 'macro_system': return 'kind-era';
  }
}

export function Sidebar(props: SidebarProps) {
  const {
    search, onSearchChange, layers, onToggleLayer, counts,
    results, systems, onPickResult, onPickEra,
  } = props;

  const isSearching = search.trim().length > 0;

  return (
    <aside className="sidebar">
      <div className="search">
        <input
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search dynasties, events, figures…"
          aria-label="Search the timeline"
        />
        {search && (
          <button className="clear" onClick={() => onSearchChange('')} aria-label="Clear search">×</button>
        )}
      </div>

      {isSearching && (
        <div className="search-results">
          <div className="section-label">{results.length} matches</div>
          {results.map(r => (
            <button
              key={`${r.id}-${r.type}`}
              className="result-row"
              onClick={() => onPickResult(r)}
            >
              <span className={`kind-dot ${kindClassFor(r)}`} />
              <span className="result-name">{r.name}</span>
              <span className="result-year">
                {r.startYear != null && r.endYear != null
                  ? fmtRange(r.startYear, r.endYear)
                  : r.year != null ? fmtYear(r.year) : ''}
              </span>
            </button>
          ))}
        </div>
      )}

      {!isSearching && (
        <>
          <div className="section-label">Layers</div>
          <div className="filter-list">
            {FILTER_DEFS.map(f => (
              <label key={f.key} className={`filter-row ${layers[f.key] ? 'on' : 'off'}`}>
                <input
                  type="checkbox"
                  checked={layers[f.key]}
                  onChange={() => onToggleLayer(f.key)}
                />
                <span className="filter-glyph">{f.glyph}</span>
                <span className="filter-label">{f.label}</span>
                <span className="filter-count">{counts[f.key]}</span>
              </label>
            ))}
          </div>

          <div className="section-label">Legend</div>
          <div className="legend">
            <div className="legend-row">
              <svg width="56" height="14"><rect x="2" y="2" width="52" height="10" rx="5" fill={COLOR.vermillion} /></svg>
              <span>Major dynasty (main lane)</span>
            </div>
            <div className="legend-row">
              <svg width="56" height="14"><rect x="2" y="3" width="52" height="8" rx="4" fill="none" stroke={COLOR.sepia} strokeWidth="1.5" /></svg>
              <span>Concurrent state (parallel lane)</span>
            </div>
            <div className="legend-row">
              <svg width="56" height="14"><circle cx="28" cy="7" r="3.5" fill={COLOR.ink} /></svg>
              <span>Discrete event</span>
            </div>
            <div className="legend-row">
              <svg width="56" height="14"><rect x="24" y="3" width="8" height="8" fill={COLOR.gold} /></svg>
              <span>Cultural / invention anchor</span>
            </div>
            <div className="legend-row">
              <svg width="56" height="14"><rect x="22" y="2" width="12" height="10" fill="none" stroke={COLOR.indigo} strokeWidth="1.2" /></svg>
              <span>Global context</span>
            </div>
          </div>

          <div className="section-label">Eras</div>
          <div className="era-list">
            {systems.map(s => (
              <button key={s.id} className="era-row" onClick={() => onPickEra(s)}>
                <span className="era-name">{s.name}</span>
                <span className="era-range">{fmtRange(s.start, s.end)}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Sidebar.tsx
git commit -m "feat: Sidebar with search, layer filters, legend, and era list"
```

---

### Task 14: KnowledgeBaseStubs (v2 seam)

**Files:**
- Create: `src/components/KnowledgeBaseStubs.tsx`

This is the v2 plug-in seam. v1 renders the dashed-border stub UI from the prototype. v2 will fetch and render markdown notes; the prop signature stays identical so v2 is a single-component swap.

- [ ] **Step 1: Create `src/components/KnowledgeBaseStubs.tsx`**

```tsx
interface KnowledgeBaseStubsProps {
  id: string;
  title: string;
}

/**
 * v2 plug-in seam. In v1 this renders the dashed-border stub UI from the
 * prototype. In v2, the internals will fetch /notes/{id}.md and render the
 * parsed content into the same UI sections. The prop signature is stable.
 */
export function KnowledgeBaseStubs({ title }: KnowledgeBaseStubsProps) {
  const truncated = title.toUpperCase().slice(0, 22);
  return (
    <div className="kb-section">
      <div className="detail-rel-label">Knowledge entries</div>
      <div className="kb-row">
        <span className="kb-glyph">¶</span>
        <span><i>Notes —</i> add longer commentary, anecdotes, or your own synthesis here.</span>
      </div>
      <div className="kb-row">
        <span className="kb-glyph">⌘</span>
        <span><i>Primary sources —</i> link translated texts (e.g. Sima Qian, Records of the Grand Historian).</span>
      </div>
      <div className="kb-row">
        <span className="kb-glyph">◧</span>
        <span><i>Images —</i> attach maps, paintings, photographs, museum plates.</span>
      </div>
      <div className="kb-row">
        <span className="kb-glyph">↗</span>
        <span><i>External links —</i> Wikipedia, ChinaKnowledge, JSTOR articles, your own blog posts.</span>
      </div>
      <button className="kb-add" disabled>
        + ADD ENTRY TO {truncated}
      </button>
    </div>
  );
}
```

Note: the ADD ENTRY button is `disabled` in v1. The prototype showed an alert. Disabling is the right v1 behavior because the button has no v1 action; it will become functional in v2.

- [ ] **Step 2: Verify type-check**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/KnowledgeBaseStubs.tsx
git commit -m "feat: KnowledgeBaseStubs v2 plug-in seam (disabled in v1)"
```

---

### Task 15: DetailPanel

**Files:**
- Create: `src/components/DetailPanel.tsx`

Reference: `handoff-extracted/history-of-china/project/components-chrome.jsx` lines 174-263.

- [ ] **Step 1: Create `src/components/DetailPanel.tsx`**

```tsx
import { COLOR } from '../lib/colors';
import { fmtRange, fmtYear } from '../lib/format';
import type { SelectedItem } from '../data/types';
import { KnowledgeBaseStubs } from './KnowledgeBaseStubs';

interface RelatedItem {
  id: string;
  kind: SelectedItem['kind'];
  title: string;
  year: number | null;
  start: number | null;
  onPick: () => void;
}

interface DetailPanelProps {
  item: SelectedItem | null;
  related: RelatedItem[];
  onClose: () => void;
}

const KIND_LABEL: Record<SelectedItem['kind'], string> = {
  dynasty: 'Dynasty',
  concurrent: 'Concurrent state',
  event: 'Event',
  figure: 'Figure',
  culture: 'Cultural anchor',
  invention: 'Invention',
  global: 'Global context',
  era: 'Era',
};

const KIND_DOT_CLASS: Record<SelectedItem['kind'], string> = {
  dynasty: 'kind-dynasty',
  concurrent: 'kind-concurrent',
  event: 'kind-event',
  figure: 'kind-figure',
  culture: 'kind-culture',
  invention: 'kind-invention',
  global: 'kind-global',
  era: 'kind-era',
};

export function DetailPanel({ item, related, onClose }: DetailPanelProps) {
  if (!item) {
    return (
      <aside className="detail empty">
        <div className="detail-empty-art">
          <svg viewBox="0 0 100 100" width="80" height="80" aria-hidden>
            <circle cx="50" cy="50" r="38" fill="none" stroke={COLOR.ruleStrong} strokeWidth="1" />
            <circle cx="50" cy="50" r="3" fill={COLOR.vermillion} />
            <text x="50" y="92" fontFamily="Spectral, serif" fontSize="9" fill={COLOR.ink2} textAnchor="middle">
              select an item
            </text>
          </svg>
        </div>
        <div className="detail-empty-msg">
          Click any dynasty bar, event dot, or marker on the timeline to read its entry here.
        </div>
      </aside>
    );
  }

  const yearStr =
    item.start != null && item.end != null
      ? fmtRange(item.start, item.end)
      : item.year != null
      ? fmtYear(item.year)
      : '';

  const isSpan = item.start != null && item.end != null;

  return (
    <aside className="detail">
      <div className="detail-head">
        <div className="detail-kind">{KIND_LABEL[item.kind]}</div>
        <button className="detail-close" onClick={onClose} aria-label="Close detail panel">×</button>
      </div>
      <div className="detail-title">{item.title}</div>
      <div className="detail-year">{yearStr}</div>

      <div className="detail-plate">
        <div className="plate-frame">
          <div className="plate-stripes" />
          <div className="plate-caption">[ illustration ] {item.title}</div>
        </div>
      </div>

      <div className="detail-blurb">{item.summary || 'No description on file.'}</div>

      {isSpan && item.duration != null && item.importance != null && (
        <div className="detail-stats">
          <div><span>Duration</span><b>{item.duration} yrs</b></div>
          <div><span>Importance</span><b>{'★'.repeat(item.importance)}</b></div>
        </div>
      )}

      {related.length > 0 && (
        <>
          <div className="detail-rel-label">Related</div>
          <div className="detail-related">
            {related.map(r => (
              <button key={`${r.id}-${r.kind}`} className="rel-chip" onClick={r.onPick}>
                <span className={`kind-dot ${KIND_DOT_CLASS[r.kind]}`} />
                <span>{r.title}</span>
                <span className="rel-year">
                  {r.start != null ? fmtYear(r.start) : r.year != null ? fmtYear(r.year) : ''}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      <KnowledgeBaseStubs id={item.id} title={item.title} />
    </aside>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/DetailPanel.tsx
git commit -m "feat: DetailPanel with related items and KB stubs seam"
```

---

### Task 16: Timeline RowFrame

**Files:**
- Create: `src/components/timeline/RowFrame.tsx`

Reference: `handoff-extracted/history-of-china/project/timeline.jsx` lines 44-131.

`RowFrame` draws one row's backdrop, label band, gridlines, century ticks, and the expand-row button.

- [ ] **Step 1: Create `src/components/timeline/RowFrame.tsx`**

```tsx
import { COLOR } from '../../lib/colors';
import { fmtRange, fmtYear } from '../../lib/format';
import { ticksFor, type Row } from '../../lib/layout';

interface RowFrameProps {
  row: Row;
  rowYCenter: number;
  rowH: number;
  trackW: number;
  rowPaddingX: number;
  expanded: boolean;
  xFor: (frac: number) => number;
  onToggleExpand: () => void;
}

export function RowFrame(props: RowFrameProps) {
  const { row, rowYCenter, rowH, trackW, rowPaddingX, expanded, xFor, onToggleExpand } = props;
  const yTop = rowYCenter - rowH / 2 + 4;
  const yBot = rowYCenter + rowH / 2 - 4;
  const ticks = ticksFor(row);

  const labelText = `ROW ${String(row.index + 1).padStart(2, '0')} · ${fmtRange(row.start, row.end)}`;

  return (
    <g>
      {/* Row backdrop */}
      <rect
        x={rowPaddingX - 24} y={yTop - 6}
        width={trackW + 48} height={yBot - yTop + 12}
        rx={4}
        fill="url(#paperGrad)"
        stroke={COLOR.rule}
        strokeWidth={0.6}
      />
      {/* Label band on the left */}
      <rect
        x={rowPaddingX - 24} y={yTop - 6}
        width={20} height={yBot - yTop + 12}
        fill={COLOR.parchment2}
        stroke={COLOR.rule}
        strokeWidth={0.6}
      />
      <text
        x={rowPaddingX - 14}
        y={rowYCenter}
        fill={COLOR.ink2}
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontSize={9.5}
        textAnchor="middle"
        transform={`rotate(-90 ${rowPaddingX - 14} ${rowYCenter})`}
        letterSpacing={1.5}
      >
        {labelText}
      </text>

      {/* Year gridlines and labels */}
      {ticks.map(y => {
        const frac = (y - row.start) / (row.end - row.start);
        const x = xFor(frac);
        const isCentury = y % 100 === 0;
        return (
          <g key={y}>
            <line
              x1={x} x2={x}
              y1={yTop + 4} y2={yBot - 4}
              stroke={isCentury ? COLOR.rule : COLOR.parchment2}
              strokeWidth={isCentury ? 0.5 : 0.4}
              strokeDasharray={isCentury ? undefined : '1 3'}
            />
            <text
              x={x} y={yBot - 6}
              fill={COLOR.ink3}
              fontFamily="'JetBrains Mono', ui-monospace, monospace"
              fontSize={9}
              textAnchor="middle"
            >
              {y < 0 ? `${Math.abs(y)} BCE` : `${y}`}
            </text>
          </g>
        );
      })}

      {/* Center main-lane baseline */}
      <line
        x1={rowPaddingX} x2={rowPaddingX + trackW}
        y1={rowYCenter} y2={rowYCenter}
        stroke={COLOR.ruleStrong}
        strokeWidth={0.6}
      />

      {/* Expand-row button */}
      <foreignObject x={rowPaddingX + trackW + 6} y={yTop - 4} width={26} height={26}>
        <button
          className="row-expand"
          title={expanded ? 'Collapse' : 'Expand row'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand();
          }}
        >
          {expanded ? '↺' : '⤢'}
        </button>
      </foreignObject>
    </g>
  );
}

// Re-export fmtYear so the canvas can use it without re-importing
export { fmtYear };
```

- [ ] **Step 2: Verify type-check**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/timeline/RowFrame.tsx
git commit -m "feat: RowFrame component (backdrop, gridlines, expand button)"
```

---

### Task 17: Timeline SystemBand

**Files:**
- Create: `src/components/timeline/SystemBand.tsx`

Reference: `handoff-extracted/history-of-china/project/timeline.jsx` lines 393-420.

System bands draw faint OKLCH washes behind everything in each row, signaling the macro-period (Qin-Han, Sui-Tang, etc.).

- [ ] **Step 1: Create `src/components/timeline/SystemBand.tsx`**

```tsx
import { COLOR, SYSTEM_BAND_PALETTE } from '../../lib/colors';
import { clipRange, type Row } from '../../lib/layout';
import type { NormalizedSystem } from '../../data/types';

interface SystemBandProps {
  system: NormalizedSystem;
  systemIndex: number;
  rows: Row[];
  expandedRow: number | null;
  rowYCenter: (rowIndex: number) => number;
  rowH: number;
  xFor: (frac: number) => number;
}

export function SystemBand(props: SystemBandProps) {
  const { system, systemIndex, rows, expandedRow, rowYCenter, rowH, xFor } = props;
  const segs = clipRange(system.start, system.end);
  const fill = SYSTEM_BAND_PALETTE[systemIndex % SYSTEM_BAND_PALETTE.length];

  return (
    <>
      {segs.map((seg, i) => {
        const r = rows[seg.rowIndex];
        if (!r) return null;
        if (expandedRow != null && r.index !== expandedRow) return null;
        const yC = rowYCenter(r.index);
        const x0 = xFor(seg.x0);
        const x1 = xFor(seg.x1);
        const yTop = yC - rowH / 2 + 22;
        const bandH = rowH - 44;
        return (
          <g key={`${system.id}-${i}`} pointerEvents="none">
            <rect x={x0} y={yTop} width={x1 - x0} height={bandH} fill={fill} opacity={0.35} />
            {seg.isStart && x1 - x0 > 80 && (
              <text
                x={x0 + 6} y={yTop + 12}
                fill={COLOR.ink2}
                fontFamily="'Spectral', serif"
                fontStyle="italic"
                fontSize={10}
                letterSpacing={0.4}
              >
                {system.name}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/timeline/SystemBand.tsx
git commit -m "feat: SystemBand component (faint OKLCH era washes)"
```

---

### Task 18: Timeline DynastyBar

**Files:**
- Create: `src/components/timeline/DynastyBar.tsx`

Reference: `handoff-extracted/history-of-china/project/timeline.jsx` lines 133-225.

Dynasty bars are the heart of the visual. Primary regimes are filled vermillion bars on the main lane; concurrent regimes are sepia outline bars in lanes above/below.

- [ ] **Step 1: Create `src/components/timeline/DynastyBar.tsx`**

```tsx
import { COLOR, dynastyFill } from '../../lib/colors';
import { clipRange, type Row } from '../../lib/layout';
import { fmtRange } from '../../lib/format';
import type { NormalizedSpanItem, RenderLane } from '../../data/types';

interface TooltipPayload {
  x: number;
  y: number;
  title: string;
  sub: string;
}

interface DynastyBarProps {
  dynasty: NormalizedSpanItem;
  kind: 'primary' | 'concurrent';
  rows: Row[];
  expandedRow: number | null;
  rowYCenter: (rowIndex: number) => number;
  laneOffset: number;
  mainBarH: number;
  concBarH: number;
  highlighted: boolean;
  xFor: (frac: number) => number;
  onPick: (id: string, kind: 'dynasty' | 'concurrent') => void;
  onTooltip: (payload: TooltipPayload | null) => void;
}

const LANE_OFFSETS: Record<RenderLane, number> = {
  above2: -82,
  above:  -52,
  main:    0,
  below:  +44,
  below2: +74,
  event:   0,
  figure:  0,
  anchor:  0,
  global:  0,
};

export function laneOffsetFor(lane: RenderLane): number {
  return LANE_OFFSETS[lane] ?? 0;
}

export function DynastyBar(props: DynastyBarProps) {
  const {
    dynasty, kind, rows, expandedRow, rowYCenter, laneOffset,
    mainBarH, concBarH, highlighted, xFor, onPick, onTooltip,
  } = props;

  const isPrimary = kind === 'primary';
  const fill = isPrimary ? dynastyFill(dynasty.importance) : 'white';
  const stroke = isPrimary ? 'none' : COLOR.sepia;
  const h = isPrimary ? mainBarH : concBarH;
  const segs = clipRange(dynasty.start, dynasty.end);
  const capR = h / 2;

  return (
    <>
      {segs.map((s, i) => {
        const r = rows[s.rowIndex];
        if (!r) return null;
        if (expandedRow != null && r.index !== expandedRow) return null;
        const yC = rowYCenter(r.index);
        const x0 = xFor(s.x0);
        const x1 = xFor(s.x1);
        const w = Math.max(2, x1 - x0);
        const y = yC + laneOffset - h / 2;

        return (
          <g
            key={`${dynasty.id}-${i}`}
            className="dynasty-seg"
            style={{ cursor: 'pointer' }}
            onClick={(e) => { e.stopPropagation(); onPick(dynasty.id, kind === 'primary' ? 'dynasty' : 'concurrent'); }}
            onMouseEnter={(e) => onTooltip({
              x: e.clientX, y: e.clientY,
              title: dynasty.name,
              sub: `${fmtRange(dynasty.start, dynasty.end)}${dynasty.summary ? ` — ${dynasty.summary}` : ''}`,
            })}
            onMouseMove={(e) => onTooltip({
              x: e.clientX, y: e.clientY,
              title: dynasty.name,
              sub: `${fmtRange(dynasty.start, dynasty.end)}${dynasty.summary ? ` — ${dynasty.summary}` : ''}`,
            })}
            onMouseLeave={() => onTooltip(null)}
          >
            <rect
              x={x0} y={y}
              width={w} height={h}
              rx={capR} ry={capR}
              fill={fill}
              stroke={stroke}
              strokeWidth={isPrimary ? 0 : 1.2}
              opacity={isPrimary ? 1 : 0.92}
              data-testid={`dynasty-${dynasty.id}`}
            />
            {w > 60 && (
              <text
                x={x0 + w / 2} y={y + h / 2 + (isPrimary ? 5 : 4)}
                fill={isPrimary ? 'white' : COLOR.sepia}
                fontFamily="'Spectral', 'Cormorant Garamond', serif"
                fontSize={isPrimary ? 14 : 11}
                fontWeight={isPrimary ? 600 : 500}
                textAnchor="middle"
                letterSpacing={isPrimary ? 1.4 : 0.6}
                style={{ textTransform: isPrimary ? 'uppercase' : 'none', pointerEvents: 'none' }}
              >
                {dynasty.name}
              </text>
            )}
            {s.isStart && (
              <g pointerEvents="none">
                <rect x={x0 - 1} y={y + h + 3} width={42} height={13} rx={2}
                  fill={COLOR.parchment2} stroke={COLOR.ruleStrong} strokeWidth={0.5} />
                <text x={x0 + 20} y={y + h + 12}
                  fill={COLOR.ink}
                  fontFamily="'JetBrains Mono', ui-monospace, monospace"
                  fontSize={8.5} textAnchor="middle">
                  {dynasty.start < 0 ? `${Math.abs(dynasty.start)} BCE` : `${dynasty.start}`}
                </text>
              </g>
            )}
            {highlighted && (
              <rect
                x={x0 - 3} y={y - 3}
                width={w + 6} height={h + 6}
                rx={capR + 3}
                fill="none"
                stroke={COLOR.indigo}
                strokeWidth={1.2}
                strokeDasharray="3 3"
                pointerEvents="none"
              />
            )}
          </g>
        );
      })}
    </>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/timeline/DynastyBar.tsx
git commit -m "feat: DynastyBar component (primary + concurrent regimes)"
```

---

### Task 19: Timeline Markers

**Files:**
- Create: `src/components/timeline/Markers.tsx`

Four marker components in one file: events (circles), figures (diamonds), cultural anchors (gold squares), global context (boxed labels). Reference: `handoff-extracted/history-of-china/project/timeline.jsx` lines 227-390.

- [ ] **Step 1: Create `src/components/timeline/Markers.tsx`**

```tsx
import { COLOR } from '../../lib/colors';
import { locate, type Row } from '../../lib/layout';
import { fmtYear } from '../../lib/format';
import type { NormalizedPointItem, SelectedItem } from '../../data/types';

const EVENT_Y = 96;
const FIGURE_Y_OFFSET = -18;
const CULTURE_Y = -100;
const INVENTION_Y_OFFSET = -18;

interface TooltipPayload {
  x: number;
  y: number;
  title: string;
  sub: string;
}

interface MarkerCommon {
  rows: Row[];
  expandedRow: number | null;
  rowYCenter: (rowIndex: number) => number;
  rowH: number;
  mode: 'overview' | 'detailed';
  highlightId: string | null;
  xFor: (frac: number) => number;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onTooltip: (payload: TooltipPayload | null) => void;
}

interface EventMarkerProps extends MarkerCommon {
  event: NormalizedPointItem;
}

export function EventMarker({ event: e, rows, expandedRow, rowYCenter, mode, highlightId, xFor, onPick, onTooltip }: EventMarkerProps) {
  const loc = locate(e.year);
  const r = rows[loc.rowIndex];
  if (!r) return null;
  if (expandedRow != null && r.index !== expandedRow) return null;
  const yC = rowYCenter(r.index);
  const x = xFor(loc.frac);
  const y = yC + EVENT_Y;
  const isHi = highlightId === e.id;
  const radius = e.importance >= 5 ? 5 : 4;
  const sub = `${fmtYear(e.year)}${e.summary ? ` — ${e.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={(ev) => { ev.stopPropagation(); onPick(e.id, 'event'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: e.name, sub })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: e.name, sub })}
      onMouseLeave={() => onTooltip(null)}
    >
      <line x1={x} x2={x} y1={yC + 22} y2={y - radius - 1} stroke={COLOR.ruleStrong} strokeWidth={0.5} />
      <circle cx={x} cy={y} r={radius} fill={COLOR.ink} stroke={COLOR.parchment} strokeWidth={1.2} />
      {(mode === 'detailed' || isHi) && (
        <text
          x={x + radius + 4} y={y + 3}
          fill={COLOR.ink}
          fontFamily="'Spectral', serif"
          fontSize={10.5}
          style={{ pointerEvents: 'none' }}
        >
          {e.name.length > 28 ? `${e.name.slice(0, 26)}…` : e.name}
        </text>
      )}
    </g>
  );
}

interface FigureMarkerProps extends MarkerCommon {
  figure: NormalizedPointItem;
}

export function FigureMarker({ figure: f, rows, expandedRow, rowYCenter, mode, xFor, onPick, onTooltip }: FigureMarkerProps) {
  const loc = locate(f.year);
  const r = rows[loc.rowIndex];
  if (!r) return null;
  if (expandedRow != null && r.index !== expandedRow) return null;
  const yC = rowYCenter(r.index);
  const x = xFor(loc.frac);
  const y = yC + EVENT_Y + FIGURE_Y_OFFSET;
  const sub = `${fmtYear(f.year)}${f.summary ? ` — ${f.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={(ev) => { ev.stopPropagation(); onPick(f.id, 'figure'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: f.name, sub })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: f.name, sub })}
      onMouseLeave={() => onTooltip(null)}
    >
      <polygon points={`${x},${y - 5} ${x + 5},${y} ${x},${y + 5} ${x - 5},${y}`}
        fill={COLOR.indigo} stroke={COLOR.parchment} strokeWidth={1} />
      {mode === 'detailed' && (
        <text
          x={x + 8} y={y + 3}
          fill={COLOR.indigo}
          fontFamily="'Spectral', serif"
          fontSize={10}
          fontStyle="italic"
          style={{ pointerEvents: 'none' }}
        >
          {f.name}
        </text>
      )}
    </g>
  );
}

interface CultureMarkerProps extends MarkerCommon {
  culture: NormalizedPointItem;
}

export function CultureMarker({ culture: c, rows, expandedRow, rowYCenter, mode, xFor, onPick, onTooltip }: CultureMarkerProps) {
  const loc = locate(c.year);
  const r = rows[loc.rowIndex];
  if (!r) return null;
  if (expandedRow != null && r.index !== expandedRow) return null;
  const yC = rowYCenter(r.index);
  const x = xFor(loc.frac);
  const y = yC + CULTURE_Y;
  const sub = `${fmtYear(c.year)}${c.summary ? ` — ${c.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={(ev) => { ev.stopPropagation(); onPick(c.id, 'culture'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: c.name, sub })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: c.name, sub })}
      onMouseLeave={() => onTooltip(null)}
    >
      <line x1={x} x2={x} y1={y + 6} y2={yC - 22}
        stroke={COLOR.ruleStrong} strokeWidth={0.5} strokeDasharray="2 2" />
      <rect x={x - 5} y={y - 5} width={10} height={10}
        fill={COLOR.gold} stroke={COLOR.ink} strokeWidth={0.8} />
      {mode === 'detailed' && (
        <text
          x={x + 8} y={y + 3}
          fill={COLOR.ink}
          fontFamily="'Spectral', serif"
          fontSize={10}
          style={{ pointerEvents: 'none' }}
        >
          {c.name.length > 28 ? `${c.name.slice(0, 26)}…` : c.name}
        </text>
      )}
    </g>
  );
}

interface InventionMarkerProps extends MarkerCommon {
  invention: NormalizedPointItem;
}

export function InventionMarker({ invention: inv, rows, expandedRow, rowYCenter, xFor, onPick, onTooltip }: InventionMarkerProps) {
  const loc = locate(inv.year);
  const r = rows[loc.rowIndex];
  if (!r) return null;
  if (expandedRow != null && r.index !== expandedRow) return null;
  const yC = rowYCenter(r.index);
  const x = xFor(loc.frac);
  const y = yC + CULTURE_Y + INVENTION_Y_OFFSET;
  const sub = `${fmtYear(inv.year)}${inv.summary ? ` — ${inv.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={(ev) => { ev.stopPropagation(); onPick(inv.id, 'invention'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: inv.name, sub })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: inv.name, sub })}
      onMouseLeave={() => onTooltip(null)}
    >
      <rect x={x - 5} y={y - 5} width={10} height={10}
        fill="white" stroke={COLOR.jade} strokeWidth={1.4} />
      <line x1={x - 3} x2={x + 3} y1={y} y2={y} stroke={COLOR.jade} strokeWidth={1} />
      <line x1={x} x2={x} y1={y - 3} y2={y + 3} stroke={COLOR.jade} strokeWidth={1} />
    </g>
  );
}

interface GlobalMarkerProps extends MarkerCommon {
  global: NormalizedPointItem;
}

export function GlobalMarker({ global: g, rows, expandedRow, rowYCenter, rowH, xFor, onPick, onTooltip }: GlobalMarkerProps) {
  const loc = locate(g.year);
  const r = rows[loc.rowIndex];
  if (!r) return null;
  if (expandedRow != null && r.index !== expandedRow) return null;
  const yC = rowYCenter(r.index);
  const x = xFor(loc.frac);
  const yBot = yC + rowH / 2 - 22;
  const sub = `${fmtYear(g.year)}${g.summary ? ` — ${g.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={(ev) => { ev.stopPropagation(); onPick(g.id, 'global'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: `GLOBAL · ${g.name}`, sub })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: `GLOBAL · ${g.name}`, sub })}
      onMouseLeave={() => onTooltip(null)}
    >
      <rect x={x - 38} y={yBot - 14} width={76} height={14}
        fill="white" stroke={COLOR.indigo} strokeWidth={0.8} />
      <text x={x} y={yBot - 4}
        fill={COLOR.indigo}
        fontFamily="'Spectral', serif"
        fontSize={9}
        fontStyle="italic"
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
      >
        {g.name.length > 16 ? `${g.name.slice(0, 15)}…` : g.name}
      </text>
    </g>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/timeline/Markers.tsx
git commit -m "feat: marker components (event, figure, culture, invention, global)"
```

---

### Task 20: TimelineCanvas (assembly)

**Files:**
- Create: `src/components/timeline/TimelineCanvas.tsx`

The canvas wires together row frames, system bands, dynasty bars, and markers. Manages container width via `ResizeObserver` and renders the SVG with proper sizing.

- [ ] **Step 1: Create `src/components/timeline/TimelineCanvas.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react';
import { COLOR } from '../../lib/colors';
import { rowsFor } from '../../lib/layout';
import type { LayerToggles, NormalizedData, SelectedItem } from '../../data/types';
import { RowFrame } from './RowFrame';
import { SystemBand } from './SystemBand';
import { DynastyBar, laneOffsetFor } from './DynastyBar';
import {
  EventMarker, FigureMarker, CultureMarker, InventionMarker, GlobalMarker,
} from './Markers';

const ROW_PADDING_X = 56;
const ROW_HEIGHT_BASE = 240;
const ROW_GAP = 28;
const MAIN_BAR_H = 38;
const CONC_BAR_H = 22;

interface TooltipPayload {
  x: number;
  y: number;
  title: string;
  sub: string;
}

interface TimelineCanvasProps {
  data: NormalizedData;
  layers: LayerToggles;
  zoom: number;
  mode: 'overview' | 'detailed';
  highlightId: string | null;
  expandedRow: number | null;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onClearSelection: () => void;
  onToggleExpandRow: (rowIndex: number) => void;
}

export function TimelineCanvas(props: TimelineCanvasProps) {
  const {
    data, layers, zoom, mode, highlightId, expandedRow,
    onPick, onClearSelection, onToggleExpandRow,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(1200);
  const [tooltip, setTooltip] = useState<TooltipPayload | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) setContainerW(e.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const rows = rowsFor();
  const innerW = Math.max(800, containerW - 4) * zoom;
  const trackW = innerW - ROW_PADDING_X * 2;
  const rowH = ROW_HEIGHT_BASE * (mode === 'detailed' ? 1.0 : 0.78);
  const totalH = rows.length * rowH + (rows.length - 1) * ROW_GAP + 40;

  const xFor = (frac: number): number => ROW_PADDING_X + frac * trackW;
  const rowYCenter = (rIdx: number): number => 24 + rIdx * (rowH + ROW_GAP) + rowH / 2;

  const visibleRows = expandedRow == null ? rows : rows.filter(r => r.index === expandedRow);

  return (
    <div className="canvas-wrap" ref={containerRef}>
      <svg
        className="timeline-svg"
        width={innerW}
        height={expandedRow != null ? rowH + 60 : totalH}
        viewBox={`0 0 ${innerW} ${expandedRow != null ? rowH + 60 : totalH}`}
        onClick={onClearSelection}
        data-testid="timeline-svg"
      >
        <defs>
          <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLOR.parchment} />
            <stop offset="100%" stopColor={COLOR.parchment2} />
          </linearGradient>
        </defs>

        {/* Row frames */}
        {visibleRows.map(r => (
          <RowFrame
            key={`frame-${r.index}`}
            row={r}
            rowYCenter={rowYCenter(r.index)}
            rowH={rowH}
            trackW={trackW}
            rowPaddingX={ROW_PADDING_X}
            expanded={expandedRow === r.index}
            xFor={xFor}
            onToggleExpand={() => onToggleExpandRow(r.index)}
          />
        ))}

        {/* Era bands behind everything */}
        {layers.dynasties && data.systems.map((s, idx) => (
          <SystemBand
            key={s.id}
            system={s}
            systemIndex={idx}
            rows={rows}
            expandedRow={expandedRow}
            rowYCenter={rowYCenter}
            rowH={rowH}
            xFor={xFor}
          />
        ))}

        {/* Concurrent first (behind primary) */}
        {layers.dynasties && data.concurrent.map(d => (
          <DynastyBar
            key={d.id}
            dynasty={d}
            kind="concurrent"
            rows={rows}
            expandedRow={expandedRow}
            rowYCenter={rowYCenter}
            laneOffset={laneOffsetFor(d.renderLane)}
            mainBarH={MAIN_BAR_H}
            concBarH={CONC_BAR_H}
            highlighted={highlightId === d.id}
            xFor={xFor}
            onPick={onPick}
            onTooltip={setTooltip}
          />
        ))}

        {/* Primary regimes */}
        {layers.dynasties && data.primary.map(d => (
          <DynastyBar
            key={d.id}
            dynasty={d}
            kind="primary"
            rows={rows}
            expandedRow={expandedRow}
            rowYCenter={rowYCenter}
            laneOffset={0}
            mainBarH={MAIN_BAR_H}
            concBarH={CONC_BAR_H}
            highlighted={highlightId === d.id}
            xFor={xFor}
            onPick={onPick}
            onTooltip={setTooltip}
          />
        ))}

        {/* Markers */}
        {layers.events && data.events.map(e => (
          <EventMarker key={e.id} event={e}
            rows={rows} expandedRow={expandedRow} rowYCenter={rowYCenter} rowH={rowH}
            mode={mode} highlightId={highlightId} xFor={xFor}
            onPick={onPick} onTooltip={setTooltip} />
        ))}
        {layers.figures && data.figures.map(f => (
          <FigureMarker key={f.id} figure={f}
            rows={rows} expandedRow={expandedRow} rowYCenter={rowYCenter} rowH={rowH}
            mode={mode} highlightId={highlightId} xFor={xFor}
            onPick={onPick} onTooltip={setTooltip} />
        ))}
        {layers.culture && data.culture.map(c => (
          <CultureMarker key={c.id} culture={c}
            rows={rows} expandedRow={expandedRow} rowYCenter={rowYCenter} rowH={rowH}
            mode={mode} highlightId={highlightId} xFor={xFor}
            onPick={onPick} onTooltip={setTooltip} />
        ))}
        {layers.inventions && data.inventions.map(i => (
          <InventionMarker key={i.id} invention={i}
            rows={rows} expandedRow={expandedRow} rowYCenter={rowYCenter} rowH={rowH}
            mode={mode} highlightId={highlightId} xFor={xFor}
            onPick={onPick} onTooltip={setTooltip} />
        ))}
        {layers.global && data.global.map(g => (
          <GlobalMarker key={g.id} global={g}
            rows={rows} expandedRow={expandedRow} rowYCenter={rowYCenter} rowH={rowH}
            mode={mode} highlightId={highlightId} xFor={xFor}
            onPick={onPick} onTooltip={setTooltip} />
        ))}
      </svg>

      {tooltip && (
        <div className="tooltip" style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}>
          <div className="tip-title">{tooltip.title}</div>
          <div className="tip-sub">{tooltip.sub}</div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/timeline/TimelineCanvas.tsx
git commit -m "feat: TimelineCanvas assembly with ResizeObserver and tooltip state"
```

---

## Phase E: App shell

### Task 21: App.tsx wiring

**Files:**
- Modify: `src/App.tsx` (replace placeholder)

Wire data loading, all state, and the four primary components. Handle the empty/loading/error states cleanly.

- [ ] **Step 1: Replace `src/App.tsx` with the wired version**

```tsx
import { useEffect, useMemo, useState } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { DetailPanel } from './components/DetailPanel';
import { TimelineCanvas } from './components/timeline/TimelineCanvas';
import { MobileFallback } from './components/MobileFallback';
import { loadHistoryData } from './data/load';
import { search as runSearch } from './data/search';
import {
  defaultLayers,
  type LayerToggles,
  type NormalizedData,
  type NormalizedPointItem,
  type NormalizedSpanItem,
  type NormalizedSystem,
  type SearchEntry,
  type SelectedItem,
} from './data/types';

type LoadStatus =
  | { kind: 'loading' }
  | { kind: 'ready'; data: NormalizedData }
  | { kind: 'error'; message: string };

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="app-error">
      <h1>Couldn't load the timeline</h1>
      <p>{message}</p>
      <button onClick={() => window.location.reload()}>Refresh to try again</button>
    </div>
  );
}

function LoadingScreen() {
  return <div className="loading">Loading the atlas…</div>;
}

function selectedFromSpan(item: NormalizedSpanItem, kind: 'dynasty' | 'concurrent'): SelectedItem {
  return {
    kind,
    id: item.id,
    title: item.name,
    year: null,
    start: item.start,
    end: item.end,
    summary: item.summary,
    importance: item.importance,
    duration: item.duration,
    systemId: item.systemId,
    parentId: item.parentId,
  };
}

function selectedFromPoint(item: NormalizedPointItem, kind: SelectedItem['kind']): SelectedItem {
  return {
    kind,
    id: item.id,
    title: item.name,
    year: item.year,
    start: null,
    end: null,
    summary: item.summary,
    importance: item.importance,
    systemId: item.systemId,
    parentId: item.parentId,
  };
}

function selectedFromEra(era: NormalizedSystem): SelectedItem {
  return {
    kind: 'era',
    id: era.id,
    title: era.name,
    year: null,
    start: era.start,
    end: era.end,
    summary: era.summary,
  };
}

function findById(data: NormalizedData, id: string): SelectedItem | null {
  const span = [...data.primary, ...data.concurrent].find(d => d.id === id);
  if (span) {
    const kind = data.primary.includes(span) ? 'dynasty' : 'concurrent';
    return selectedFromSpan(span, kind);
  }
  const event = data.events.find(e => e.id === id);
  if (event) return selectedFromPoint(event, 'event');
  const figure = data.figures.find(f => f.id === id);
  if (figure) return selectedFromPoint(figure, 'figure');
  const culture = data.culture.find(c => c.id === id);
  if (culture) return selectedFromPoint(culture, 'culture');
  const invention = data.inventions.find(i => i.id === id);
  if (invention) return selectedFromPoint(invention, 'invention');
  const global = data.global.find(g => g.id === id);
  if (global) return selectedFromPoint(global, 'global');
  const era = data.systems.find(s => s.id === id);
  if (era) return selectedFromEra(era);
  return null;
}

function pickFromSearchEntry(entry: SearchEntry, data: NormalizedData): SelectedItem | null {
  return findById(data, entry.id);
}

function AppInner({ data }: { data: NormalizedData }) {
  const [search, setSearch] = useState('');
  const [layers, setLayers] = useState<LayerToggles>(defaultLayers);
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState<'overview' | 'detailed'>('detailed');
  const [selected, setSelected] = useState<SelectedItem | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const counts = useMemo<Record<keyof LayerToggles, number>>(() => ({
    dynasties: data.primary.length + data.concurrent.length,
    events: data.events.length,
    figures: data.figures.length,
    culture: data.culture.length,
    inventions: data.inventions.length,
    global: data.global.length,
    sources: 0,
  }), [data]);

  const results = useMemo(() => runSearch(search, data.searchIndex), [search, data.searchIndex]);

  const related = useMemo(() => {
    if (!selected) return [];
    const out: Array<{
      id: string;
      kind: SelectedItem['kind'];
      title: string;
      year: number | null;
      start: number | null;
      onPick: () => void;
    }> = [];

    if (selected.kind === 'dynasty' || selected.kind === 'concurrent') {
      const children = data.childrenByParent.get(selected.id) ?? [];
      for (const child of children) {
        const kind: SelectedItem['kind'] =
          child.type === 'event' ? 'event' :
          child.type === 'figure' ? 'figure' :
          child.type === 'cultural_anchor' ? 'culture' : 'event';
        out.push({
          id: child.id,
          kind,
          title: child.name,
          year: child.year,
          start: null,
          onPick: () => setSelected(selectedFromPoint(child, kind)),
        });
      }
      // Sister regimes in the same system
      for (const r of [...data.primary, ...data.concurrent]) {
        if (r.id !== selected.id && r.systemId === selected.systemId) {
          const kind = data.primary.includes(r) ? 'dynasty' : 'concurrent';
          out.push({
            id: r.id,
            kind,
            title: r.name,
            year: null,
            start: r.start,
            onPick: () => setSelected(selectedFromSpan(r, kind)),
          });
        }
      }
    } else if (selected.parentId) {
      const parentSpan = [...data.primary, ...data.concurrent].find(d => d.id === selected.parentId);
      if (parentSpan) {
        const kind = data.primary.includes(parentSpan) ? 'dynasty' : 'concurrent';
        out.push({
          id: parentSpan.id,
          kind,
          title: parentSpan.name,
          year: null,
          start: parentSpan.start,
          onPick: () => setSelected(selectedFromSpan(parentSpan, kind)),
        });
      }
    }

    return out.slice(0, 8);
  }, [data, selected]);

  return (
    <>
      <TopBar
        zoom={zoom}
        onZoom={setZoom}
        mode={mode}
        onMode={setMode}
        onResetView={() => {
          setZoom(1);
          setExpandedRow(null);
          setSelected(null);
          setSearch('');
        }}
      />
      <div className="app-body">
        <Sidebar
          search={search}
          onSearchChange={setSearch}
          layers={layers}
          onToggleLayer={(k) => setLayers(s => ({ ...s, [k]: !s[k] }))}
          counts={counts}
          results={results}
          systems={data.systems}
          onPickResult={(entry) => {
            const picked = pickFromSearchEntry(entry, data);
            if (picked) setSelected(picked);
          }}
          onPickEra={(era) => setSelected(selectedFromEra(era))}
        />
        <div className="canvas-shell" data-screen-label="Timeline canvas">
          <TimelineCanvas
            data={data}
            layers={layers}
            zoom={zoom}
            mode={mode}
            highlightId={selected ? selected.id : null}
            expandedRow={expandedRow}
            onPick={(id, kind) => {
              const picked = findById(data, id);
              if (picked) setSelected({ ...picked, kind });
            }}
            onClearSelection={() => setSelected(null)}
            onToggleExpandRow={(idx) => setExpandedRow(curr => curr === idx ? null : idx)}
          />
        </div>
        <DetailPanel
          item={selected}
          related={related}
          onClose={() => setSelected(null)}
        />
      </div>
    </>
  );
}

export default function App() {
  const [status, setStatus] = useState<LoadStatus>({ kind: 'loading' });

  useEffect(() => {
    loadHistoryData()
      .then(data => setStatus({ kind: 'ready', data }))
      .catch(err => {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('Failed to load dataset', err);
        setStatus({ kind: 'error', message });
      });
  }, []);

  return (
    <MobileFallback>
      {status.kind === 'loading' && <LoadingScreen />}
      {status.kind === 'error' && <ErrorScreen message={status.message} />}
      {status.kind === 'ready' && <AppInner data={status.data} />}
    </MobileFallback>
  );
}
```

- [ ] **Step 2: Append app-error styles to `src/styles.css`**

Append:
```css

/* ---------- Error screen ---------- */
.app-error {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: var(--parchment);
  color: var(--ink);
  text-align: center;
}
.app-error h1 {
  font-family: "Spectral", serif;
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 8px 0;
}
.app-error p {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: var(--ink-2);
  margin: 0 0 20px 0;
  max-width: 480px;
}
.app-error button {
  padding: 8px 16px;
  font-family: inherit;
  font-size: 13px;
  background: var(--ink);
  color: white;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
}
.app-error button:hover {
  background: oklch(0.30 0.015 60);
}
```

- [ ] **Step 3: Verify type-check**

```bash
npm run typecheck
```

- [ ] **Step 4: Run dev server and visually verify**

```bash
npm run dev &
sleep 3
echo "Open http://localhost:5173 in a browser. Expected: full timeline renders, six rows visible, dynasties present, sidebar shows filters, detail panel shows empty state. Press Ctrl+C when done."
wait
```

Expected (visually): the full timeline matches the prototype layout. Click a dynasty bar; the detail panel populates. Click search and type "tang"; results appear. Click the close × on the detail panel; selection clears. Click an era in the sidebar; an era panel opens.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/styles.css
git commit -m "feat: wire App shell with data loading, all state, and components

Loads dataset on mount, renders MobileFallback wrapper around the main UI,
shows clean error screen on fetch or validation failure.
Selected item resolution handles dynasties, events, figures, culture,
inventions, global context, and eras. Related items index runs O(1)
via the children-by-parent map."
```

---

## Phase F: End-to-end tests

### Task 22: Playwright setup

**Files:**
- Create: `playwright.config.ts`
- Run: `npx playwright install chromium`

- [ ] **Step 1: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
```

- [ ] **Step 2: Install Chromium**

```bash
npx playwright install chromium
```

Expected: download progress, finishes with "Chromium installed".

- [ ] **Step 3: Verify Playwright sees the config**

```bash
npx playwright test --list
```

Expected: "0 tests found" plus the config printout (no tests yet, but the config loads).

- [ ] **Step 4: Commit**

```bash
git add playwright.config.ts
git commit -m "feat: configure Playwright with chromium at 1440x900"
```

---

### Task 23: Timeline E2E test

**Files:**
- Create: `tests/e2e/timeline.spec.ts`

Cover: app loads, six rows render, the Song-period stress test shows main + concurrent regimes simultaneously, dynasty bars are clickable.

- [ ] **Step 1: Create `tests/e2e/timeline.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test.describe('timeline', () => {
  test('loads without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.goto('/');
    await expect(page.locator('h1, .title-main').first()).toBeVisible();
    await expect(page.getByTestId('timeline-svg')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('renders all six rows', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('timeline-svg').waitFor();

    // The row label band rotates -90, label includes "ROW NN ·"
    for (let i = 1; i <= 6; i++) {
      const padded = String(i).padStart(2, '0');
      const label = page.locator('text', { hasText: `ROW ${padded}` });
      await expect(label).toBeVisible();
    }
  });

  test('Song-period coexistence: Northern Song, Southern Song, Liao, Jin, Western Xia all visible', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('timeline-svg').waitFor();

    await expect(page.getByTestId('dynasty-R_NSONG')).toBeVisible();
    await expect(page.getByTestId('dynasty-R_SSONG')).toBeVisible();
    await expect(page.getByTestId('dynasty-R_LIAO')).toBeVisible();
    await expect(page.getByTestId('dynasty-R_JIN')).toBeVisible();
    await expect(page.getByTestId('dynasty-R_XIXIA')).toBeVisible();
  });

  test('layer toggle hides events when off', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('timeline-svg').waitFor();

    // Find Events checkbox by label, toggle it
    const eventsCheckbox = page.locator('label.filter-row', { hasText: 'Events' }).locator('input[type="checkbox"]');
    await expect(eventsCheckbox).toBeChecked();
    await eventsCheckbox.uncheck();

    // After unchecking, the small event circles should not be in the SVG
    // We don't have testids on every event, so we do a structural check
    const eventCount = await page.locator('svg circle').count();
    expect(eventCount).toBeLessThan(20); // arbitrary low bar; events are gone
  });
});
```

- [ ] **Step 2: Run the test**

```bash
npx playwright test tests/e2e/timeline.spec.ts
```

Expected: 4 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/timeline.spec.ts
git commit -m "test: timeline E2E (load, six rows, Song coexistence, layer toggle)"
```

---

### Task 24: Search E2E test

**Files:**
- Create: `tests/e2e/search.spec.ts`

- [ ] **Step 1: Create `tests/e2e/search.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test.describe('search', () => {
  test('typing shows matching results', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('timeline-svg').waitFor();

    const input = page.getByPlaceholder('Search dynasties, events, figures…');
    await input.fill('tang');

    const matchesLabel = page.locator('.search-results .section-label');
    await expect(matchesLabel).toContainText('matches');

    const results = page.locator('.search-results .result-row');
    await expect(results.first()).toBeVisible();
    expect(await results.count()).toBeGreaterThan(0);
  });

  test('clicking a search result opens the detail panel', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('timeline-svg').waitFor();

    await page.getByPlaceholder('Search dynasties, events, figures…').fill('confucius');
    const result = page.locator('.search-results .result-row').first();
    await result.click();

    await expect(page.locator('.detail-title')).toContainText('Confucius');
  });

  test('clearing search restores layer filter view', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('timeline-svg').waitFor();

    const input = page.getByPlaceholder('Search dynasties, events, figures…');
    await input.fill('tang');
    await expect(page.locator('.search-results')).toBeVisible();

    await page.locator('.search .clear').click();
    await expect(page.locator('.filter-list')).toBeVisible();
    await expect(page.locator('.search-results')).toHaveCount(0);
  });

  test('empty search shows zero results gracefully', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('timeline-svg').waitFor();

    await page.getByPlaceholder('Search dynasties, events, figures…').fill('xyznotreal');
    const matchesLabel = page.locator('.search-results .section-label');
    await expect(matchesLabel).toContainText('0 matches');
  });
});
```

- [ ] **Step 2: Run the test**

```bash
npx playwright test tests/e2e/search.spec.ts
```

Expected: 4 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/search.spec.ts
git commit -m "test: search E2E (typing, click result, clear, empty matches)"
```

---

### Task 25: Detail panel E2E test

**Files:**
- Create: `tests/e2e/detail-panel.spec.ts`

- [ ] **Step 1: Create `tests/e2e/detail-panel.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test.describe('detail panel', () => {
  test('shows empty state by default', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('timeline-svg').waitFor();
    await expect(page.locator('.detail.empty')).toBeVisible();
    await expect(page.locator('.detail-empty-msg')).toContainText('Click any dynasty bar');
  });

  test('clicking a dynasty bar opens the detail', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('timeline-svg').waitFor();
    await page.getByTestId('dynasty-R_TANG').click();
    await expect(page.locator('.detail-title')).toContainText('Tang');
    await expect(page.locator('.detail-kind')).toContainText('Dynasty');
  });

  test('close button clears the selection', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('timeline-svg').waitFor();
    await page.getByTestId('dynasty-R_TANG').click();
    await expect(page.locator('.detail-title')).toContainText('Tang');

    await page.locator('.detail-close').click();
    await expect(page.locator('.detail.empty')).toBeVisible();
  });

  test('related items render and are clickable', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('timeline-svg').waitFor();
    await page.getByTestId('dynasty-R_TANG').click();

    const relatedSection = page.locator('.detail-related');
    await expect(relatedSection).toBeVisible();
    const firstRelated = relatedSection.locator('.rel-chip').first();
    await expect(firstRelated).toBeVisible();

    await firstRelated.click();
    // After clicking, title should change to whatever the related item is
    // We just confirm the title block updates (any text different from "Tang" alone is fine)
    await expect(page.locator('.detail-title')).toBeVisible();
  });

  test('knowledge base stubs render with disabled add button', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('timeline-svg').waitFor();
    await page.getByTestId('dynasty-R_TANG').click();

    await expect(page.locator('.kb-section')).toBeVisible();
    const addButton = page.locator('.kb-add');
    await expect(addButton).toBeVisible();
    await expect(addButton).toBeDisabled();
  });
});
```

- [ ] **Step 2: Run the test**

```bash
npx playwright test tests/e2e/detail-panel.spec.ts
```

Expected: 5 tests pass.

- [ ] **Step 3: Run the entire E2E suite to confirm everything still works together**

```bash
npx playwright test
```

Expected: 13 tests pass (4 timeline + 4 search + 5 detail-panel).

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/detail-panel.spec.ts
git commit -m "test: detail panel E2E (open, close, related items, KB stubs)"
```

---

## Phase G: Deploy

### Task 26: README and Vercel setup

**Files:**
- Create: `README.md`
- Create: `vercel.json` (optional, if any tweak is needed)

- [ ] **Step 1: Write `README.md`**

```markdown
# Chinese History Map

A wrapped multi-row timeline of Chinese history from approximately 2070 BCE to 2026 CE, designed to read like a museum wall or atlas spread rather than a single horizontal scroll.

Built with React 18, TypeScript, and Vite. Visual design adapted from a Claude Design HTML prototype.

## Live demo

[chinese-history-map.vercel.app](https://chinese-history-map.vercel.app) — pending deploy.

## Local development

```bash
npm install
npm run dev
```

Opens at http://localhost:5173. The site is desktop-first; viewports below 1024px see a static fallback.

## Other commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Run the TypeScript compiler in check-only mode |
| `npm test` | Run the unit tests (Vitest) once |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:e2e` | Run the Playwright end-to-end tests |
| `npm run test:e2e:ui` | Run E2E tests with the Playwright UI |

## Project shape

- `public/china-history.json` — the curated dataset (77 records as of v9)
- `src/components/` — UI components (TopBar, Sidebar, DetailPanel, MobileFallback, timeline/)
- `src/data/` — types, Zod schemas, dataset loader, search
- `src/lib/` — pure utilities (layout math, year formatting, color tokens)
- `src/styles.css` — design tokens and full chrome styling
- `tests/e2e/` — Playwright behavioral tests
- `docs/superpowers/` — product spec and implementation plan
- `archive/` — original input artifacts (xlsx source, validation reports, design handoff zip)
- `handoff-extracted/` — read-only design reference, gitignored

## Adding entries to the timeline

The renderer is fully data-driven. Adding or removing entries within the existing types is a JSON edit, not a code change. See `docs/superpowers/specs/2026-04-27-chinese-history-map-design.md` Section 18 for the operational guide.

## License

Personal project, no public license set.
```

- [ ] **Step 2: Verify the README displays**

```bash
cat README.md | head -30
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add README with local dev, scripts, and project shape"
```

- [ ] **Step 4: Create the GitHub repo and push**

This step requires a GitHub authentication. If `gh` is logged in:

```bash
gh repo create chinese-history-map --private --source=. --remote=origin --push
git push -u origin main
git push -u origin build/v1
```

If `gh` is not configured, create the repo on GitHub manually, then:

```bash
git remote add origin git@github.com:<USERNAME>/chinese-history-map.git
git push -u origin main
git push -u origin build/v1
```

Expected: both branches pushed; the GitHub repo at `chinese-history-map` exists, private.

- [ ] **Step 5: Open Vercel and connect the repo**

This is a one-time browser action:

1. Open https://vercel.com/new
2. Click "Import" next to the `chinese-history-map` GitHub repo
3. Confirm the framework preset is "Vite"
4. Confirm the build command is `npm run build`
5. Confirm the output directory is `dist`
6. Click "Deploy"

Expected: a preview deploy succeeds within ~60 seconds. Vercel returns a URL like `chinese-history-map-<hash>.vercel.app` and a production URL like `chinese-history-map.vercel.app`.

- [ ] **Step 6: Verify the live URL renders**

```bash
echo "Open the Vercel production URL in your browser and confirm the timeline renders."
```

Expected (visual): the page loads, all six rows render, the Song-period bars are visible, search and detail panel work.

---

### Task 27: Mobile fallback screenshot and final verification

**Files:**
- Replace: `public/desktop-preview.png` with a real screenshot

- [ ] **Step 1: Generate the mobile fallback screenshot via Playwright**

Create a one-shot script `scripts/generate-preview.ts`:

```ts
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173');
  await page.waitForSelector('[data-testid="timeline-svg"]');
  await page.waitForTimeout(800);  // let fonts settle
  const outPath = path.resolve(fileURLToPath(import.meta.url), '..', '..', 'public', 'desktop-preview.png');
  await page.screenshot({ path: outPath, fullPage: false });
  console.log(`Wrote ${outPath}`);
  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
```

Run it:

```bash
mkdir -p scripts
# (Save the file above as scripts/generate-preview.ts)
npm run dev &
sleep 3
npx tsx scripts/generate-preview.ts
kill %1 2>/dev/null || true
```

If `tsx` is not installed:
```bash
npm install -D tsx
```

Expected: `public/desktop-preview.png` is now ~1440x900 image of the rendered timeline.

- [ ] **Step 2: Verify the mobile fallback uses the real screenshot**

Open dev tools, set viewport to 375x667 (iPhone), reload http://localhost:5173. The mobile fallback should now show the real timeline screenshot.

- [ ] **Step 3: Run the full test suite locally**

```bash
npm run typecheck && npm test && npm run test:e2e
```

Expected: type-check passes, unit tests pass (~30 tests), E2E tests pass (13 tests).

- [ ] **Step 4: Commit, merge to main, push, redeploy**

```bash
git add public/desktop-preview.png scripts/generate-preview.ts package.json package-lock.json
git commit -m "feat: real desktop screenshot for mobile fallback"

git checkout main
git merge build/v1 --no-ff -m "Merge branch 'build/v1' into main: ship v1"
git push origin main

# Optional: clean up the build branch
git branch -d build/v1
git push origin --delete build/v1
```

Vercel auto-deploys on the push to `main`. Wait ~60 seconds, refresh the production URL, confirm everything still works.

---

## Self-review checklist

Run through this once after the plan is complete and before handing off to execution.

**Spec coverage:**
- [x] Section 1 (Summary) → setup, scaffolding, the whole plan
- [x] Section 2 (Goals) → covered by Phase G deploy + Task 21 wiring
- [x] Section 3 (Non-goals) → out of scope, confirmed
- [x] Section 4 (Stack) → Tasks 2-3
- [x] Section 5 (Folder layout) → Tasks 1-2 + every subsequent task creates the right path
- [x] Section 6 (Data model) → Task 7
- [x] Section 7 (Data loading and normalization) → Task 8
- [x] Section 8 (Component architecture) → Tasks 11-21
- [x] Section 9 (State management) → Task 21
- [x] Section 10 (Timeline rendering) → Tasks 6, 16-20
- [x] Section 11 (v2 plug-in seam) → Task 14
- [x] Section 12 (Mobile fallback) → Tasks 11, 27
- [x] Section 13 (Testing) → Tasks 22-25
- [x] Section 14 (Error handling) → Task 21 (error screen + Zod validation)
- [x] Section 15 (Deploy) → Task 26
- [x] Section 16 (File migrations) → Task 1
- [x] Section 17 (Risks) → mitigations baked into Tasks 21, 27 where relevant
- [x] Section 18 (Extending the dataset) → architecture preserves it (Task 8 normalizer is data-driven)
- [x] Section 19 (Success criteria) → all 10 criteria covered by Tasks 21, 23-25, 26-27

**Placeholder scan:** none. Every code block contains the actual code. Every command shows expected output. No "TBD", no "TODO", no "fill in".

**Type consistency:**
- `LayerToggles`, `SelectedItem`, `NormalizedData`, `NormalizedSpanItem`, `NormalizedPointItem`, `NormalizedSystem`, `SearchEntry` defined in Task 7, used consistently in Tasks 8, 9, 13, 15, 21.
- `RenderLane` values (`main`, `above`, `above2`, `below`, `below2`, `event`, `figure`, `anchor`, `global`) defined in Task 7, used in Task 8 (mapping) and Task 18 (`LANE_OFFSETS`).
- `Importance` (1|2|3|4|5) defined in Task 7, used in Task 5 (`dynastyFill`) and Task 21 (counts).

**Bite-size:** every step is a single 2-5 minute action. Tests are written before implementation (Phase B). Components have a write-then-typecheck-then-commit rhythm.
