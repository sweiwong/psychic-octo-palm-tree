# Snake Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the wrapped multi-row timeline rendering with a continuous snake map that traces every Chinese dynasty from Xia to PRC across four alternating-direction rows on a single screen, with proportional time mapping so a 825-year dynasty looks 11x longer than a 74-year one.

**Architecture:** Pure-function geometry module (`snake-path.ts`) that maps years to positions on a serpentine SVG path. React SVG components (`TimelineCanvas`, `SnakeBackbone`, `DynastySegment`, `ConcurrentSegment`, `DateTick`) consume the geometry to render. No state changes in the data layer or `App.tsx` state.

**Tech Stack:** TypeScript, React 18, Vite, Vitest (unit tests), Playwright (E2E), SVG (rendering).

**Spec:** See `docs/superpowers/specs/2026-04-27-snake-timeline-design.md` for visual and architectural decisions.

---

## Phase 1: Geometry foundation

The geometry module is pure functions. No React. Built test-first. By the end of this phase, every year in the dataset can be mapped to a (x, y, tangent, normal) on the serpentine SVG path.

### Task 1: Snake geometry types and computeGeometry

**Files:**
- Create: `src/lib/snake-path.ts`
- Test: `src/lib/snake-path.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/snake-path.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { computeGeometry } from './snake-path';

describe('computeGeometry', () => {
  it('computes derived values for the default geometry', () => {
    const g = computeGeometry({
      width: 660,
      height: 700,
      padding: 40,
      rowCount: 4,
      yearMin: -2070,
      yearMax: 2026,
    });
    expect(g.rowHeight).toBeCloseTo(155, 4);
    expect(g.cornerRadius).toBeCloseTo(77.5, 4);
    expect(g.trackWidth).toBeCloseTo(425, 4);
    expect(g.arcLength).toBeCloseTo(Math.PI * 77.5, 4);
    expect(g.totalPathLength).toBeCloseTo(4 * 425 + 3 * Math.PI * 77.5, 4);
    expect(g.pxPerYear).toBeCloseTo(g.totalPathLength / 4096, 6);
  });

  it('computes row centerline y values', () => {
    const g = computeGeometry({
      width: 660, height: 700, padding: 40,
      rowCount: 4, yearMin: -2070, yearMax: 2026,
    });
    expect(g.rowCenterlines).toEqual([117.5, 272.5, 427.5, 582.5]);
  });

  it('computes bend center coordinates', () => {
    const g = computeGeometry({
      width: 660, height: 700, padding: 40,
      rowCount: 4, yearMin: -2070, yearMax: 2026,
    });
    expect(g.bendCenters).toHaveLength(3);
    expect(g.bendCenters[0]).toEqual({ x: 542.5, y: 195, side: 'right' });
    expect(g.bendCenters[1]).toEqual({ x: 117.5, y: 350, side: 'left' });
    expect(g.bendCenters[2]).toEqual({ x: 542.5, y: 505, side: 'right' });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/snake-path.test.ts`

Expected: FAIL with module not found error.

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/snake-path.ts`:

```typescript
export interface GeometryInput {
  width: number;
  height: number;
  padding: number;
  rowCount: number;
  yearMin: number;
  yearMax: number;
}

export interface BendCenter {
  x: number;
  y: number;
  side: 'left' | 'right';
}

export interface SnakeGeometry extends GeometryInput {
  rowHeight: number;
  cornerRadius: number;
  trackWidth: number;
  arcLength: number;
  totalPathLength: number;
  pxPerYear: number;
  rowCenterlines: number[];
  bendCenters: BendCenter[];
}

export function computeGeometry(input: GeometryInput): SnakeGeometry {
  const { width, height, padding, rowCount, yearMin, yearMax } = input;
  const rowHeight = (height - 2 * padding) / rowCount;
  const cornerRadius = rowHeight / 2;
  const trackWidth = width - 2 * padding - 2 * cornerRadius;
  const arcLength = Math.PI * cornerRadius;
  const totalPathLength = rowCount * trackWidth + (rowCount - 1) * arcLength;
  const pxPerYear = totalPathLength / (yearMax - yearMin);

  const rowCenterlines: number[] = [];
  for (let i = 0; i < rowCount; i++) {
    rowCenterlines.push(padding + cornerRadius + i * rowHeight);
  }

  const bendCenters: BendCenter[] = [];
  for (let i = 0; i < rowCount - 1; i++) {
    const onRight = i % 2 === 0;
    bendCenters.push({
      x: onRight ? width - padding - cornerRadius : padding + cornerRadius,
      y: (rowCenterlines[i] + rowCenterlines[i + 1]) / 2,
      side: onRight ? 'right' : 'left',
    });
  }

  return {
    ...input,
    rowHeight, cornerRadius, trackWidth, arcLength,
    totalPathLength, pxPerYear, rowCenterlines, bendCenters,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/snake-path.test.ts`

Expected: PASS, all 3 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/lib/snake-path.ts src/lib/snake-path.test.ts
git commit -m "feat: add snake-path geometry types and computeGeometry"
```

---

### Task 2: yearToDistance and distanceToPoint

**Files:**
- Modify: `src/lib/snake-path.ts`
- Test: `src/lib/snake-path.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `src/lib/snake-path.test.ts`:

```typescript
import { yearToDistance, distanceToPoint } from './snake-path';

describe('yearToDistance', () => {
  const g = computeGeometry({
    width: 660, height: 700, padding: 40,
    rowCount: 4, yearMin: -2070, yearMax: 2026,
  });

  it('returns 0 for yearMin', () => {
    expect(yearToDistance(-2070, g)).toBe(0);
  });

  it('returns totalPathLength for yearMax', () => {
    expect(yearToDistance(2026, g)).toBeCloseTo(g.totalPathLength, 4);
  });

  it('scales linearly between yearMin and yearMax', () => {
    const mid = yearToDistance(-22, g); // halfway through the year range
    expect(mid).toBeCloseTo(g.totalPathLength / 2, 1);
  });
});

describe('distanceToPoint', () => {
  const g = computeGeometry({
    width: 660, height: 700, padding: 40,
    rowCount: 4, yearMin: -2070, yearMax: 2026,
  });

  it('returns row 0 start at distance 0', () => {
    const p = distanceToPoint(0, g);
    expect(p.x).toBeCloseTo(117.5, 4);
    expect(p.y).toBeCloseTo(117.5, 4);
  });

  it('returns row 0 end at distance trackWidth', () => {
    const p = distanceToPoint(g.trackWidth, g);
    expect(p.x).toBeCloseTo(542.5, 4);
    expect(p.y).toBeCloseTo(117.5, 4);
  });

  it('returns rightmost point on bend 0 at distance trackWidth + arcLength/2', () => {
    const p = distanceToPoint(g.trackWidth + g.arcLength / 2, g);
    expect(p.x).toBeCloseTo(620, 4); // 542.5 + 77.5
    expect(p.y).toBeCloseTo(195, 4); // bend 0 center y
  });

  it('returns row 1 start (right side) at distance trackWidth + arcLength', () => {
    const p = distanceToPoint(g.trackWidth + g.arcLength, g);
    expect(p.x).toBeCloseTo(542.5, 4);
    expect(p.y).toBeCloseTo(272.5, 4);
  });

  it('returns row 1 end (left side) at distance 2*trackWidth + arcLength', () => {
    const p = distanceToPoint(2 * g.trackWidth + g.arcLength, g);
    expect(p.x).toBeCloseTo(117.5, 4);
    expect(p.y).toBeCloseTo(272.5, 4);
  });

  it('returns leftmost point on bend 1 at distance 2*trackWidth + 1.5*arcLength', () => {
    const p = distanceToPoint(2 * g.trackWidth + 1.5 * g.arcLength, g);
    expect(p.x).toBeCloseTo(40, 4); // 117.5 - 77.5
    expect(p.y).toBeCloseTo(350, 4);
  });

  it('returns row 3 end at totalPathLength', () => {
    const p = distanceToPoint(g.totalPathLength, g);
    expect(p.x).toBeCloseTo(117.5, 4);
    expect(p.y).toBeCloseTo(582.5, 4);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/snake-path.test.ts`

Expected: FAIL with `yearToDistance is not exported`.

- [ ] **Step 3: Write minimal implementation**

Append to `src/lib/snake-path.ts`:

```typescript
export interface PathPoint {
  x: number;
  y: number;
}

export function yearToDistance(year: number, g: SnakeGeometry): number {
  return (year - g.yearMin) * g.pxPerYear;
}

export function distanceToPoint(distance: number, g: SnakeGeometry): PathPoint {
  let remaining = distance;
  for (let row = 0; row < g.rowCount; row++) {
    const goingRight = row % 2 === 0;
    const rowStartX = goingRight
      ? g.padding + g.cornerRadius
      : g.width - g.padding - g.cornerRadius;
    const direction = goingRight ? 1 : -1;

    if (remaining <= g.trackWidth) {
      return {
        x: rowStartX + direction * remaining,
        y: g.rowCenterlines[row],
      };
    }
    remaining -= g.trackWidth;

    if (row === g.rowCount - 1) {
      // Past the end. Clamp to row end.
      const endX = goingRight
        ? g.width - g.padding - g.cornerRadius
        : g.padding + g.cornerRadius;
      return { x: endX, y: g.rowCenterlines[row] };
    }

    if (remaining <= g.arcLength) {
      const t = remaining / g.arcLength; // 0..1 along the arc
      const center = g.bendCenters[row];
      // Arc spans from "row centerline above" to "row centerline below",
      // starting at angle -π/2 (top) and ending at +π/2 (bottom).
      // For a right-side bend, sweep is +x (clockwise visually).
      // For a left-side bend, sweep is -x (counter-clockwise visually).
      const startAngle = -Math.PI / 2;
      const endAngle = Math.PI / 2;
      const angle = startAngle + t * (endAngle - startAngle);
      const radialSign = center.side === 'right' ? 1 : -1;
      return {
        x: center.x + radialSign * g.cornerRadius * Math.cos(angle),
        y: center.y + g.cornerRadius * Math.sin(angle),
      };
    }
    remaining -= g.arcLength;
  }
  // Should never reach here; clamp to end of last row.
  return {
    x: g.padding + g.cornerRadius,
    y: g.rowCenterlines[g.rowCount - 1],
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/snake-path.test.ts`

Expected: PASS, all tests green (10 total at this point).

- [ ] **Step 5: Commit**

```bash
git add src/lib/snake-path.ts src/lib/snake-path.test.ts
git commit -m "feat: add yearToDistance and distanceToPoint"
```

---

### Task 3: yearToPoint with tangent and normal

**Files:**
- Modify: `src/lib/snake-path.ts`
- Test: `src/lib/snake-path.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `src/lib/snake-path.test.ts`:

```typescript
import { yearToPoint } from './snake-path';

describe('yearToPoint', () => {
  const g = computeGeometry({
    width: 660, height: 700, padding: 40,
    rowCount: 4, yearMin: -2070, yearMax: 2026,
  });

  it('returns rightward tangent on row 0', () => {
    const p = yearToPoint(-2000, g);
    expect(p.tangent.x).toBeCloseTo(1, 4);
    expect(p.tangent.y).toBeCloseTo(0, 4);
  });

  it('returns leftward tangent on row 1', () => {
    const yearAtRow1Mid = -2070 + (1.5 * g.trackWidth + g.arcLength) / g.pxPerYear;
    const p = yearToPoint(yearAtRow1Mid, g);
    expect(p.tangent.x).toBeCloseTo(-1, 3);
    expect(p.tangent.y).toBeCloseTo(0, 3);
  });

  it('returns downward tangent at rightmost point of bend 0', () => {
    const yearAtBend0Mid = -2070 + (g.trackWidth + g.arcLength / 2) / g.pxPerYear;
    const p = yearToPoint(yearAtBend0Mid, g);
    expect(p.tangent.x).toBeCloseTo(0, 3);
    expect(p.tangent.y).toBeCloseTo(1, 3);
  });

  it('normal is perpendicular to tangent and points to greater y on horizontal segments', () => {
    const p = yearToPoint(-2000, g);
    // tangent (1, 0), normal toward greater y = (0, 1)
    expect(p.normal.x).toBeCloseTo(0, 4);
    expect(p.normal.y).toBeCloseTo(1, 4);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/snake-path.test.ts`

Expected: FAIL with `yearToPoint is not exported`.

- [ ] **Step 3: Write minimal implementation**

Append to `src/lib/snake-path.ts`:

```typescript
export interface PathFrame {
  x: number;
  y: number;
  tangent: { x: number; y: number };
  normal: { x: number; y: number };
}

export function yearToPoint(year: number, g: SnakeGeometry): PathFrame {
  const distance = yearToDistance(year, g);
  let remaining = distance;

  for (let row = 0; row < g.rowCount; row++) {
    const goingRight = row % 2 === 0;
    const direction = goingRight ? 1 : -1;
    const rowStartX = goingRight
      ? g.padding + g.cornerRadius
      : g.width - g.padding - g.cornerRadius;

    if (remaining <= g.trackWidth) {
      return {
        x: rowStartX + direction * remaining,
        y: g.rowCenterlines[row],
        tangent: { x: direction, y: 0 },
        normal: { x: 0, y: 1 },
      };
    }
    remaining -= g.trackWidth;

    if (row === g.rowCount - 1) break;

    if (remaining <= g.arcLength) {
      const t = remaining / g.arcLength;
      const center = g.bendCenters[row];
      const startAngle = -Math.PI / 2;
      const endAngle = Math.PI / 2;
      const angle = startAngle + t * (endAngle - startAngle);
      const radialSign = center.side === 'right' ? 1 : -1;
      const x = center.x + radialSign * g.cornerRadius * Math.cos(angle);
      const y = center.y + g.cornerRadius * Math.sin(angle);
      // Tangent direction: derivative of position with respect to t.
      // Position = (center.x + radialSign * R * cos(angle), center.y + R * sin(angle))
      // Derivative w.r.t. angle = (-radialSign * R * sin, R * cos), then normalized.
      const tx = -radialSign * Math.sin(angle);
      const ty = Math.cos(angle);
      // Normal always points to greater y so the concurrent ribbon offset is
      // a constant (0, +d) translation across all rows and bends. This works
      // because the ribbon arc is the main arc translated down, not a tighter
      // concentric arc.
      return {
        x, y,
        tangent: { x: tx, y: ty },
        normal: { x: 0, y: 1 },
      };
    }
    remaining -= g.arcLength;
  }
  // Should not reach here
  return {
    x: 0, y: 0,
    tangent: { x: 1, y: 0 },
    normal: { x: 0, y: 1 },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/snake-path.test.ts`

Expected: PASS, all tests green (14 total).

- [ ] **Step 5: Commit**

```bash
git add src/lib/snake-path.ts src/lib/snake-path.test.ts
git commit -m "feat: add yearToPoint with tangent and normal"
```

---

### Task 4: backbonePath SVG path string

**Files:**
- Modify: `src/lib/snake-path.ts`
- Test: `src/lib/snake-path.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `src/lib/snake-path.test.ts`:

```typescript
import { backbonePath } from './snake-path';

describe('backbonePath', () => {
  const g = computeGeometry({
    width: 660, height: 700, padding: 40,
    rowCount: 4, yearMin: -2070, yearMax: 2026,
  });

  it('starts with M at row 0 left endpoint', () => {
    const d = backbonePath(g);
    expect(d.startsWith('M 117.5 117.5')).toBe(true);
  });

  it('contains 4 line segments and 3 arc segments', () => {
    const d = backbonePath(g);
    const lineCount = (d.match(/\bL\b/g) ?? []).length;
    const arcCount = (d.match(/\bA\b/g) ?? []).length;
    expect(lineCount).toBe(4);
    expect(arcCount).toBe(3);
  });

  it('ends at row 3 left endpoint', () => {
    const d = backbonePath(g);
    expect(d.trimEnd().endsWith('L 117.5 582.5')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/snake-path.test.ts`

Expected: FAIL with `backbonePath is not exported`.

- [ ] **Step 3: Write minimal implementation**

Append to `src/lib/snake-path.ts`:

```typescript
export function backbonePath(g: SnakeGeometry): string {
  const r = g.cornerRadius;
  const parts: string[] = [];

  // Start at row 0 left endpoint
  parts.push(`M ${g.padding + r} ${g.rowCenterlines[0]}`);

  for (let row = 0; row < g.rowCount; row++) {
    const goingRight = row % 2 === 0;
    const rowEndX = goingRight
      ? g.width - g.padding - r
      : g.padding + r;
    parts.push(`L ${rowEndX} ${g.rowCenterlines[row]}`);

    if (row < g.rowCount - 1) {
      // Arc into next row. The bend's start and end points share the same x
      // (rowEndX) because the half-circle goes vertically by 2*cornerRadius.
      // Sweep flag 1 = positive direction in SVG, which appears visually
      // clockwise with the y-axis pointing down.
      const nextY = g.rowCenterlines[row + 1];
      parts.push(`A ${r} ${r} 0 0 1 ${rowEndX} ${nextY}`);
    }
  }

  return parts.join(' ');
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/snake-path.test.ts`

Expected: PASS, all tests green (17 total).

- [ ] **Step 5: Commit**

```bash
git add src/lib/snake-path.ts src/lib/snake-path.test.ts
git commit -m "feat: add backbonePath SVG path generator"
```

---

### Task 5: segmentPath for year ranges with optional offset

**Files:**
- Modify: `src/lib/snake-path.ts`
- Test: `src/lib/snake-path.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `src/lib/snake-path.test.ts`:

```typescript
import { segmentPath } from './snake-path';

describe('segmentPath', () => {
  const g = computeGeometry({
    width: 660, height: 700, padding: 40,
    rowCount: 4, yearMin: -2070, yearMax: 2026,
  });

  it('produces a single line for a year range entirely within row 0', () => {
    const d = segmentPath(-2070, -1500, g);
    expect(d).toMatch(/^M /);
    expect((d.match(/\bL\b/g) ?? []).length).toBe(1);
    expect((d.match(/\bA\b/g) ?? []).length).toBe(0);
  });

  it('produces line + arc + line for a range spanning bend 0', () => {
    // Han: -202 to 220 spans bend 1 (around year 0).
    // Pick a range crossing bend 0 instead: row 0 ends near year -1354.
    const d = segmentPath(-1500, -800, g);
    expect((d.match(/\bL\b/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect((d.match(/\bA\b/g) ?? []).length).toBeGreaterThanOrEqual(1);
  });

  it('produces an offset path when yOffset is provided', () => {
    const main = segmentPath(-2070, -1500, g);
    const offset = segmentPath(-2070, -1500, g, 20);
    // Offset path's y values should be shifted by +20 vs main.
    // Both start with M, extract first y from each.
    const mainY = parseFloat(main.match(/^M [\d.-]+ ([\d.-]+)/)![1]);
    const offsetY = parseFloat(offset.match(/^M [\d.-]+ ([\d.-]+)/)![1]);
    expect(offsetY).toBeCloseTo(mainY + 20, 4);
  });

  it('starts at the start year position', () => {
    const d = segmentPath(-2000, -1500, g);
    const startMatch = d.match(/^M ([\d.-]+) ([\d.-]+)/);
    expect(startMatch).not.toBeNull();
    const expected = yearToPoint(-2000, g);
    expect(parseFloat(startMatch![1])).toBeCloseTo(expected.x, 2);
    expect(parseFloat(startMatch![2])).toBeCloseTo(expected.y, 2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/snake-path.test.ts`

Expected: FAIL with `segmentPath is not exported`.

- [ ] **Step 3: Write minimal implementation**

Append to `src/lib/snake-path.ts`:

```typescript
export function segmentPath(
  yearStart: number,
  yearEnd: number,
  g: SnakeGeometry,
  yOffset: number = 0,
): string {
  const startDist = yearToDistance(yearStart, g);
  const endDist = yearToDistance(yearEnd, g);
  const r = g.cornerRadius;

  // Build segment list with cumulative distances.
  // Segment kinds: 'row' (horizontal) or 'arc' (bend).
  type Segment =
    | { kind: 'row'; row: number; startDist: number; endDist: number }
    | { kind: 'arc'; bend: number; startDist: number; endDist: number };
  const segments: Segment[] = [];
  let cursor = 0;
  for (let row = 0; row < g.rowCount; row++) {
    segments.push({ kind: 'row', row, startDist: cursor, endDist: cursor + g.trackWidth });
    cursor += g.trackWidth;
    if (row < g.rowCount - 1) {
      segments.push({ kind: 'arc', bend: row, startDist: cursor, endDist: cursor + g.arcLength });
      cursor += g.arcLength;
    }
  }

  const parts: string[] = [];
  let started = false;

  for (const seg of segments) {
    if (seg.endDist <= startDist) continue;
    if (seg.startDist >= endDist) break;

    const localStart = Math.max(seg.startDist, startDist);
    const localEnd = Math.min(seg.endDist, endDist);

    if (seg.kind === 'row') {
      const goingRight = seg.row % 2 === 0;
      const direction = goingRight ? 1 : -1;
      const rowStartX = goingRight
        ? g.padding + r
        : g.width - g.padding - r;
      const localStartX = rowStartX + direction * (localStart - seg.startDist);
      const localEndX = rowStartX + direction * (localEnd - seg.startDist);
      const y = g.rowCenterlines[seg.row] + yOffset;
      if (!started) {
        parts.push(`M ${localStartX} ${y}`);
        started = true;
      }
      parts.push(`L ${localEndX} ${y}`);
    } else {
      // Arc segment.
      const center = g.bendCenters[seg.bend];
      const offsetCenterY = center.y + yOffset;
      const t0 = (localStart - seg.startDist) / g.arcLength;
      const t1 = (localEnd - seg.startDist) / g.arcLength;
      const startAngle = -Math.PI / 2;
      const endAngle = Math.PI / 2;
      const a0 = startAngle + t0 * (endAngle - startAngle);
      const a1 = startAngle + t1 * (endAngle - startAngle);
      const radialSign = center.side === 'right' ? 1 : -1;
      const x0 = center.x + radialSign * r * Math.cos(a0);
      const y0 = offsetCenterY + r * Math.sin(a0);
      const x1 = center.x + radialSign * r * Math.cos(a1);
      const y1 = offsetCenterY + r * Math.sin(a1);
      if (!started) {
        parts.push(`M ${x0} ${y0}`);
        started = true;
      }
      // Arc length covered <= 180°, so large-arc-flag = 0.
      parts.push(`A ${r} ${r} 0 0 1 ${x1} ${y1}`);
    }
  }

  return parts.join(' ');
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/snake-path.test.ts`

Expected: PASS, all tests green (21 total).

- [ ] **Step 5: Commit**

```bash
git add src/lib/snake-path.ts src/lib/snake-path.test.ts
git commit -m "feat: add segmentPath for partial year ranges with offset"
```

---

## STOP: Phase 1 break

Before starting Phase 2, clear context and restart fresh. Phase 1 is self-contained (no React, no UI), and the next phase brings in new files and concerns.

- [ ] **Verify Phase 1 is healthy**

Run: `npm test && npm run typecheck`

Expected: PASS for both. Snake-path test count should be 21+. No type errors.

- [ ] **Checkpoint the phase**

Append a line to `.claude/checkpoints.log`:

```
2026-04-27-<HH:MM> | snake-phase-1-complete | <commit-sha> | snake-path.ts pure-function geometry module done. 21+ unit tests passing.
```

Commit:

```bash
git add .claude/checkpoints.log
git commit -m "chore: checkpoint snake phase 1 complete"
```

- [ ] **Clear context and resume at Phase 2**

In Claude Code, run `/clear`. Then dispatch a new subagent with this context:

> Resume the snake timeline implementation plan at Phase 2 (Task 6: Add vermillion3 token). The plan lives at `docs/superpowers/plans/2026-04-27-snake-timeline.md`. The spec lives at `docs/superpowers/specs/2026-04-27-snake-timeline-design.md`. Phase 1 (geometry foundation) is complete and committed. Continue from Task 6.

---

## Phase 2: Visual scaffold

Replace the wrapped-row canvas with a snake skeleton. By the end of this phase, the page renders a single faint snake outline with no dynasty bars yet.

### Task 6: Add vermillion3 token to colors.ts

**Files:**
- Modify: `src/lib/colors.ts`

- [ ] **Step 1: Add the token and helper**

Modify `src/lib/colors.ts`. After the existing `gold` line in the `COLOR` object, add `vermillion3`. After the existing `dynastyFill` function, add `dynastyStripeFill`:

```typescript
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
  vermillion3: 'oklch(0.50 0.115 350)',
  sepia:       'oklch(0.55 0.080 65)',
  sepia2:      'oklch(0.72 0.060 70)',
  jade:        'oklch(0.58 0.060 165)',
  indigo:      'oklch(0.45 0.060 250)',
  gold:        'oklch(0.72 0.110 80)',
} as const;
```

After the `dynastyFill` function, add:

```typescript
const NON_HAN_DYNASTY_IDS = new Set(['regime-yuan', 'regime-qing']);

export function dynastyStripeFill(id: string, indexInSortedPrimary: number): string {
  if (NON_HAN_DYNASTY_IDS.has(id)) return COLOR.vermillion3;
  return indexInSortedPrimary % 2 === 0 ? COLOR.vermillion : COLOR.vermillion2;
}
```

- [ ] **Step 2: Verify the dataset uses the expected ids**

Run: `grep -E '"id":\s*"regime-(yuan|qing)"' public/china-history.json`

Expected: Two matches showing `"id": "regime-yuan"` and `"id": "regime-qing"`.

If the ids differ in the actual dataset, update `NON_HAN_DYNASTY_IDS` to match. The id field comes from the source workbook, see `data/load.ts`.

- [ ] **Step 3: Type-check the project**

Run: `npm run typecheck`

Expected: PASS with no errors.

- [ ] **Step 4: Run all unit tests to confirm nothing broke**

Run: `npm test`

Expected: PASS, all existing tests still green.

- [ ] **Step 5: Commit**

```bash
git add src/lib/colors.ts
git commit -m "feat: add vermillion3 token and dynastyStripeFill helper"
```

---

### Task 7: Rewrite TimelineCanvas as snake orchestrator with backbone only

**Files:**
- Modify: `src/components/timeline/TimelineCanvas.tsx`
- Create: `src/components/timeline/SnakeBackbone.tsx`

This task replaces the entire `TimelineCanvas.tsx` file. The new version renders only the faint backbone of the snake. Dynasty bars come in the next phase. App.tsx should keep working with the canvas because we keep the same export name and accept (but ignore) the legacy props for now.

- [ ] **Step 1: Create SnakeBackbone component**

Create `src/components/timeline/SnakeBackbone.tsx`:

```typescript
import { backbonePath, type SnakeGeometry } from '../../lib/snake-path';
import { COLOR } from '../../lib/colors';

interface SnakeBackboneProps {
  geometry: SnakeGeometry;
}

export function SnakeBackbone({ geometry }: SnakeBackboneProps) {
  const d = backbonePath(geometry);
  return (
    <path
      d={d}
      fill="none"
      stroke={COLOR.ruleStrong}
      strokeWidth={1.5}
      strokeLinecap="round"
      opacity={0.35}
      data-testid="snake-backbone"
    />
  );
}
```

- [ ] **Step 2: Replace TimelineCanvas.tsx with the snake shell**

Replace the entire contents of `src/components/timeline/TimelineCanvas.tsx`:

```typescript
import { useEffect, useMemo, useRef, useState } from 'react';
import { computeGeometry } from '../../lib/snake-path';
import { COLOR } from '../../lib/colors';
import type { LayerToggles, NormalizedData, SelectedItem } from '../../data/types';
import { SnakeBackbone } from './SnakeBackbone';

const PADDING = 40;
const ROW_COUNT = 4;
const YEAR_MIN = -2070;
const YEAR_MAX = 2026;
const MIN_HEIGHT = 600;

interface TimelineCanvasProps {
  data: NormalizedData;
  layers: LayerToggles;
  highlightId: string | null;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onClearSelection: () => void;
  // Legacy props from previous design, accepted but ignored.
  zoom?: number;
  mode?: 'overview' | 'detailed';
  expandedRow?: number | null;
  onToggleExpandRow?: (rowIndex: number) => void;
}

export function TimelineCanvas(props: TimelineCanvasProps) {
  const { onClearSelection } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 660, height: 700 });

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = Math.max(400, e.contentRect.width - 4);
        const h = Math.max(MIN_HEIGHT, e.contentRect.height - 20);
        setSize({ width: w, height: h });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const geometry = useMemo(() => computeGeometry({
    width: size.width,
    height: size.height,
    padding: PADDING,
    rowCount: ROW_COUNT,
    yearMin: YEAR_MIN,
    yearMax: YEAR_MAX,
  }), [size]);

  return (
    <div className="canvas-wrap" ref={containerRef}>
      <svg
        className="timeline-svg"
        width={size.width}
        height={size.height}
        viewBox={`0 0 ${size.width} ${size.height}`}
        onClick={onClearSelection}
        data-testid="timeline-svg"
      >
        <defs>
          <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLOR.parchment} />
            <stop offset="100%" stopColor={COLOR.parchment2} />
          </linearGradient>
        </defs>
        <SnakeBackbone geometry={geometry} />
      </svg>
    </div>
  );
}
```

- [ ] **Step 3: Type-check the project**

Run: `npm run typecheck`

Expected: PASS. The legacy components (`RowFrame`, `SystemBand`, `Markers`, `DynastyBar`) are no longer imported. They still exist on disk but are dead. They get deleted in Task 19.

- [ ] **Step 4: Run unit tests**

Run: `npm test`

Expected: PASS for snake-path tests and existing data/format tests. The old `layout.test.ts` should still pass because `layout.ts` still exists. It will be deleted in Task 19.

- [ ] **Step 5: Visual verification via dev server**

Run: `npm run dev`

Open the browser at the URL Vite prints. Expected:
- Page loads without errors in the console
- The canvas area shows a single faint serpentine outline starting from the top left, going right, bending down through a half circle, going left, bending down through a half circle on the left, going right, bending down on the right, going left, ending at bottom left
- No dynasty bars yet
- Sidebar and detail panel still render normally

- [ ] **Step 6: Commit**

```bash
git add src/components/timeline/TimelineCanvas.tsx src/components/timeline/SnakeBackbone.tsx
git commit -m "feat: render snake backbone in TimelineCanvas"
```

---

## STOP: Phase 2 break

Phase 2 swapped out the canvas. The page should now render the snake outline alone. This is a natural stopping point because Phase 3 introduces the first dynasty bars and a different concern.

- [ ] **Verify Phase 2 is healthy**

Run: `npm test && npm run typecheck`

Expected: PASS. Then run `npm run dev` and confirm the snake outline renders on screen with no errors in the browser console.

- [ ] **Checkpoint the phase**

Append to `.claude/checkpoints.log`:

```
2026-04-27-<HH:MM> | snake-phase-2-complete | <commit-sha> | snake backbone rendering. TimelineCanvas swapped to snake orchestrator. Old wrapped-row code still on disk but unused.
```

Commit:

```bash
git add .claude/checkpoints.log
git commit -m "chore: checkpoint snake phase 2 complete"
```

- [ ] **Clear context and resume at Phase 3**

In Claude Code, run `/clear`. Then dispatch a new subagent with this context:

> Resume the snake timeline implementation plan at Phase 3 (Task 8: Create DynastySegment component). The plan lives at `docs/superpowers/plans/2026-04-27-snake-timeline.md`. Phases 1 and 2 are complete: snake-path.ts is built and the page renders the faint backbone. Continue from Task 8.

---

## Phase 3: Dynasty bars

### Task 8: Create DynastySegment component

**Files:**
- Create: `src/components/timeline/DynastySegment.tsx`

- [ ] **Step 1: Implement DynastySegment**

Create `src/components/timeline/DynastySegment.tsx`:

```typescript
import { segmentPath, type SnakeGeometry } from '../../lib/snake-path';
import { fmtRange } from '../../lib/format';
import type { NormalizedSpanItem, SelectedItem } from '../../data/types';

const BAR_THICKNESS = 28;

interface TooltipPayload {
  x: number;
  y: number;
  title: string;
  sub: string;
}

interface DynastySegmentProps {
  dynasty: NormalizedSpanItem;
  geometry: SnakeGeometry;
  fill: string;
  highlighted: boolean;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onTooltip: (payload: TooltipPayload | null) => void;
}

export function DynastySegment(props: DynastySegmentProps) {
  const { dynasty, geometry, fill, highlighted, onPick, onTooltip } = props;
  const d = segmentPath(dynasty.start, dynasty.end, geometry);
  if (!d) return null;

  const tooltipBody = `${fmtRange(dynasty.start, dynasty.end)}${dynasty.summary ? ` — ${dynasty.summary}` : ''}`;

  return (
    <g
      className="dynasty-segment"
      data-testid={`dynasty-${dynasty.id}`}
      style={{ cursor: 'pointer' }}
      onClick={(e) => {
        e.stopPropagation();
        onPick(dynasty.id, 'dynasty');
      }}
      onMouseEnter={(e) => onTooltip({
        x: e.clientX, y: e.clientY,
        title: dynasty.name,
        sub: tooltipBody,
      })}
      onMouseMove={(e) => onTooltip({
        x: e.clientX, y: e.clientY,
        title: dynasty.name,
        sub: tooltipBody,
      })}
      onMouseLeave={() => onTooltip(null)}
    >
      <path
        d={d}
        fill="none"
        stroke={fill}
        strokeWidth={BAR_THICKNESS}
        strokeLinecap="butt"
        strokeLinejoin="round"
      />
      {highlighted && (
        <path
          d={d}
          fill="none"
          stroke="oklch(0.45 0.06 250)"
          strokeWidth={BAR_THICKNESS + 4}
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeDasharray="4 4"
          opacity={0.6}
          pointerEvents="none"
        />
      )}
    </g>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/timeline/DynastySegment.tsx
git commit -m "feat: add DynastySegment component"
```

---

### Task 9: Wire all primary dynasties with alternating color

**Files:**
- Modify: `src/components/timeline/TimelineCanvas.tsx`

- [ ] **Step 1: Update TimelineCanvas to render all primary dynasties**

In `src/components/timeline/TimelineCanvas.tsx`:

1. Add imports near the top of the file (alongside existing imports):

```typescript
import { DynastySegment } from './DynastySegment';
import { dynastyStripeFill } from '../../lib/colors';
```

2. Below `const geometry = useMemo(...)`, add a memoized sorted primary list. Before the `return`, add:

```typescript
  const sortedPrimary = useMemo(
    () => [...props.data.primary].sort((a, b) => a.start - b.start),
    [props.data.primary],
  );
```

3. Add a tooltip state hook. Below `const [width, setWidth] = useState(...)`:

```typescript
  const [tooltip, setTooltip] = useState<{ x: number; y: number; title: string; sub: string } | null>(null);
```

4. Inside the `<svg>` element, after `<SnakeBackbone />` and before the closing `</svg>`, add:

```typescript
        {props.layers.dynasties && sortedPrimary.map((d, idx) => (
          <DynastySegment
            key={d.id}
            dynasty={d}
            geometry={geometry}
            fill={dynastyStripeFill(d.id, idx)}
            highlighted={props.highlightId === d.id}
            onPick={props.onPick}
            onTooltip={setTooltip}
          />
        ))}
```

5. After the closing `</svg>`, but before the closing `</div>`, add the tooltip overlay:

```typescript
      {tooltip && (
        <div className="tooltip" style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}>
          <div className="tip-title">{tooltip.title}</div>
          <div className="tip-sub">{tooltip.sub}</div>
        </div>
      )}
```

- [ ] **Step 2: Type-check**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 3: Run all unit tests**

Run: `npm test`

Expected: PASS.

- [ ] **Step 4: Visual verification**

Run: `npm run dev` and open the browser.

Expected:
- All primary dynasty bars appear as thick strokes along the snake path
- Bars alternate between two shades of vermillion (deeper, lighter, deeper, lighter)
- Yuan and Qing render in a distinct purple-vermillion color
- Hover over any bar shows the tooltip with name and date range
- Click any bar selects it (the right detail panel updates)
- The faint backbone outline is still visible behind the bars
- Bars correctly bend through the corners of the snake

- [ ] **Step 5: Commit**

```bash
git add src/components/timeline/TimelineCanvas.tsx
git commit -m "feat: wire primary dynasties with alternating fill"
```

---

### Task 10: Add textPath labels to dynasty bars

**Files:**
- Modify: `src/components/timeline/DynastySegment.tsx`

- [ ] **Step 1: Add labels using SVG textPath**

Modify `src/components/timeline/DynastySegment.tsx`. Add a constant near the top:

```typescript
const LABEL_MIN_WIDTH = 50; // px on path
```

Add an import:

```typescript
import { yearToDistance } from '../../lib/snake-path';
```

Inside the component, after computing `d`, compute whether to show the label:

```typescript
  const barLengthPx = Math.abs(
    yearToDistance(dynasty.end, geometry) - yearToDistance(dynasty.start, geometry)
  );
  const showLabel = barLengthPx >= LABEL_MIN_WIDTH;
  const pathId = `dynasty-path-${dynasty.id}`;
```

Update the return JSX. Replace the `<path d={d} ... />` with a path that has an id:

```typescript
      <path
        id={pathId}
        d={d}
        fill="none"
        stroke={fill}
        strokeWidth={BAR_THICKNESS}
        strokeLinecap="butt"
        strokeLinejoin="round"
      />
      {showLabel && (
        <text
          fill="white"
          fontFamily="'Spectral', 'Cormorant Garamond', serif"
          fontSize={14}
          fontWeight={600}
          letterSpacing={1.4}
          style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
        >
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {dynasty.name}
          </textPath>
        </text>
      )}
```

The order matters: keep the highlighted path AFTER the dynasty path so the highlight outline draws on top.

- [ ] **Step 2: Type-check**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 3: Visual verification**

Run: `npm run dev`.

Expected:
- Major dynasties (Han, Tang, Song, Ming, Qing, etc.) show their names centered along the bar
- Labels follow the bar's curve where the bar bends through a corner
- Short dynasties (Qin, Sui, Xin, Five Dynasties) have no label
- Labels are uppercase, white, in the Spectral serif

- [ ] **Step 4: Commit**

```bash
git add src/components/timeline/DynastySegment.tsx
git commit -m "feat: add textPath labels for dynasty segments"
```

---

## STOP: Phase 3 break

Phase 3 brought in all the primary dynasty bars with color and labels. The page should now look close to the final design without the concurrent ribbon and date ticks. Worth pausing here because what's left is additive layers, not core structure.

- [ ] **Verify Phase 3 is healthy**

Run: `npm test && npm run typecheck`

Expected: PASS. Then `npm run dev` and confirm:
- All primary dynasty bars render along the snake
- Adjacent bars alternate between two shades of vermillion
- Yuan and Qing render in the distinct purple-vermillion
- Labels appear on bars wider than 50px
- Hover and click work for primary dynasties

- [ ] **Checkpoint the phase**

Append to `.claude/checkpoints.log`:

```
2026-04-27-<HH:MM> | snake-phase-3-complete | <commit-sha> | primary dynasty bars rendering with alternating color and textPath labels. Hover and click wired.
```

Commit:

```bash
git add .claude/checkpoints.log
git commit -m "chore: checkpoint snake phase 3 complete"
```

- [ ] **Clear context and resume at Phase 4**

Run `/clear`. Then dispatch a new subagent with:

> Resume the snake timeline plan at Phase 4 (Task 11: Create ConcurrentSegment component). Plan: `docs/superpowers/plans/2026-04-27-snake-timeline.md`. Phases 1 through 3 are complete: snake renders all primary dynasty bars with labels. Continue from Task 11.

---

## Phase 4: Concurrent ribbon

### Task 11: Create ConcurrentSegment component

**Files:**
- Create: `src/components/timeline/ConcurrentSegment.tsx`

- [ ] **Step 1: Implement ConcurrentSegment**

Create `src/components/timeline/ConcurrentSegment.tsx`:

```typescript
import { segmentPath, yearToDistance, type SnakeGeometry } from '../../lib/snake-path';
import { COLOR } from '../../lib/colors';
import { fmtRange } from '../../lib/format';
import type { NormalizedSpanItem, SelectedItem } from '../../data/types';

const RIBBON_THICKNESS = 14;
const RIBBON_OFFSET = 26;
const LABEL_MIN_WIDTH = 60;

interface TooltipPayload {
  x: number;
  y: number;
  title: string;
  sub: string;
}

interface ConcurrentSegmentProps {
  state: NormalizedSpanItem;
  geometry: SnakeGeometry;
  highlighted: boolean;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onTooltip: (payload: TooltipPayload | null) => void;
}

export function ConcurrentSegment(props: ConcurrentSegmentProps) {
  const { state, geometry, highlighted, onPick, onTooltip } = props;
  const d = segmentPath(state.start, state.end, geometry, RIBBON_OFFSET);
  if (!d) return null;

  const barLengthPx = Math.abs(
    yearToDistance(state.end, geometry) - yearToDistance(state.start, geometry)
  );
  const showLabel = barLengthPx >= LABEL_MIN_WIDTH;
  const pathId = `concurrent-path-${state.id}`;
  const tooltipBody = `${fmtRange(state.start, state.end)}${state.summary ? ` — ${state.summary}` : ''}`;

  return (
    <g
      className="concurrent-segment"
      data-testid={`concurrent-${state.id}`}
      style={{ cursor: 'pointer' }}
      onClick={(e) => {
        e.stopPropagation();
        onPick(state.id, 'concurrent');
      }}
      onMouseEnter={(e) => onTooltip({
        x: e.clientX, y: e.clientY,
        title: state.name,
        sub: tooltipBody,
      })}
      onMouseMove={(e) => onTooltip({
        x: e.clientX, y: e.clientY,
        title: state.name,
        sub: tooltipBody,
      })}
      onMouseLeave={() => onTooltip(null)}
    >
      <path
        id={pathId}
        d={d}
        fill="none"
        stroke={COLOR.sepia2}
        strokeWidth={RIBBON_THICKNESS}
        strokeLinecap="butt"
        strokeLinejoin="round"
        opacity={0.92}
      />
      {showLabel && (
        <text
          fill={COLOR.ink}
          fontFamily="'Spectral', 'Cormorant Garamond', serif"
          fontSize={10}
          fontWeight={500}
          style={{ pointerEvents: 'none' }}
        >
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {state.name}
          </textPath>
        </text>
      )}
      {highlighted && (
        <path
          d={d}
          fill="none"
          stroke="oklch(0.45 0.06 250)"
          strokeWidth={RIBBON_THICKNESS + 3}
          strokeDasharray="3 3"
          opacity={0.6}
          pointerEvents="none"
        />
      )}
    </g>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/timeline/ConcurrentSegment.tsx
git commit -m "feat: add ConcurrentSegment component"
```

---

### Task 12: Wire all concurrent dynasties

**Files:**
- Modify: `src/components/timeline/TimelineCanvas.tsx`

- [ ] **Step 1: Render concurrent segments**

Modify `src/components/timeline/TimelineCanvas.tsx`:

1. Add the import:

```typescript
import { ConcurrentSegment } from './ConcurrentSegment';
```

2. Add a memoized sorted concurrent list. After `sortedPrimary`:

```typescript
  const sortedConcurrent = useMemo(
    () => [...props.data.concurrent].sort((a, b) => a.start - b.start),
    [props.data.concurrent],
  );
```

3. Inside the `<svg>`, BEFORE the primary dynasty render block (so concurrent draws behind primary), add:

```typescript
        {props.layers.dynasties && sortedConcurrent.map(s => (
          <ConcurrentSegment
            key={s.id}
            state={s}
            geometry={geometry}
            highlighted={props.highlightId === s.id}
            onPick={props.onPick}
            onTooltip={setTooltip}
          />
        ))}
```

The render order inside the SVG should be:
1. SnakeBackbone
2. ConcurrentSegments (drawn before primary so they sit visually behind)
3. DynastySegments (primary)

- [ ] **Step 2: Type-check**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 3: Visual verification**

Run: `npm run dev`.

Expected:
- Khitan Liao, Jurchen Jin, Western Xia render as thinner sepia ribbons offset below the main bar
- Sixteen Kingdoms also renders as a sepia ribbon at the right path position
- The concurrent ribbon follows the snake bends correctly
- Hovering a concurrent ribbon shows its tooltip
- Clicking selects it in the detail panel

- [ ] **Step 4: Commit**

```bash
git add src/components/timeline/TimelineCanvas.tsx
git commit -m "feat: wire concurrent dynasty ribbon"
```

---

## STOP: Phase 4 break

Phase 4 added the concurrent state ribbon. The Song multi-state period should now show Khitan Liao, Jurchen Jin, Western Xia as a sub-band. This is the most visually complex piece in v1.

- [ ] **Verify Phase 4 is healthy**

Run: `npm test && npm run typecheck`

Expected: PASS. Then `npm run dev` and confirm:
- Khitan Liao, Jurchen Jin, Western Xia render as thinner sepia ribbons offset below the main bar
- Sixteen Kingdoms renders during the disunity period
- The ribbon follows snake bends correctly (no breaks at corners)
- Hover and click work for concurrent ribbons

- [ ] **Checkpoint the phase**

Append to `.claude/checkpoints.log`:

```
2026-04-27-<HH:MM> | snake-phase-4-complete | <commit-sha> | concurrent ribbon rendering. Liao, Jin, Xia, Sixteen Kingdoms visible as sepia sub-band.
```

Commit:

```bash
git add .claude/checkpoints.log
git commit -m "chore: checkpoint snake phase 4 complete"
```

- [ ] **Clear context and resume at Phase 5**

Run `/clear`. Then dispatch a new subagent with:

> Resume the snake timeline plan at Phase 5 (Task 13: Create DateTick component). Plan: `docs/superpowers/plans/2026-04-27-snake-timeline.md`. Phases 1 through 4 are complete: snake with primary bars, labels, and concurrent ribbon all rendering. Continue from Task 13.

---

## Phase 5: Date ticks

### Task 13: Create DateTick component

**Files:**
- Create: `src/components/timeline/DateTick.tsx`

- [ ] **Step 1: Implement DateTick**

Create `src/components/timeline/DateTick.tsx`:

```typescript
import { yearToPoint, type SnakeGeometry } from '../../lib/snake-path';
import { COLOR } from '../../lib/colors';

const TICK_OFFSET = -28; // negative = above the bar in screen coordinates
const PILL_W = 38;
const PILL_H = 13;

interface DateTickProps {
  year: number;
  geometry: SnakeGeometry;
}

function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year}`;
}

export function DateTick({ year, geometry }: DateTickProps) {
  const p = yearToPoint(year, geometry);
  const tickX = p.x;
  const tickY = p.y + TICK_OFFSET;
  return (
    <g className="date-tick" pointerEvents="none">
      <rect
        x={tickX - PILL_W / 2}
        y={tickY - PILL_H / 2}
        width={PILL_W}
        height={PILL_H}
        rx={2}
        fill={COLOR.gold}
        opacity={0.85}
        stroke={COLOR.ruleStrong}
        strokeWidth={0.5}
      />
      <text
        x={tickX}
        y={tickY + 3.5}
        fill={COLOR.ink}
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontSize={8.5}
        textAnchor="middle"
      >
        {formatYear(year)}
      </text>
    </g>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/timeline/DateTick.tsx
git commit -m "feat: add DateTick component"
```

---

### Task 14: Wire date ticks at every primary dynasty start

**Files:**
- Modify: `src/components/timeline/TimelineCanvas.tsx`

- [ ] **Step 1: Render date ticks**

Modify `src/components/timeline/TimelineCanvas.tsx`:

1. Add the import:

```typescript
import { DateTick } from './DateTick';
```

2. Inside the `<svg>`, after the primary dynasty render block but before the closing `</svg>`, add:

```typescript
        {props.layers.dynasties && sortedPrimary.map(d => (
          <DateTick key={`tick-${d.id}`} year={d.start} geometry={geometry} />
        ))}
```

- [ ] **Step 2: Type-check**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 3: Visual verification**

Run: `npm run dev`.

Expected:
- A small yellow pill appears above the bar at every dynasty start year
- The pill text reads as "2070 BCE", "1600 BCE", "1046 BCE", "221 BCE", "206 BCE", and so on
- Pills don't overlap the dynasty labels
- Pills follow the snake path correctly through bends

- [ ] **Step 4: Commit**

```bash
git add src/components/timeline/TimelineCanvas.tsx
git commit -m "feat: render date ticks at dynasty boundaries"
```

---

## STOP: Phase 5 break

Phase 5 added date ticks at every dynasty start. The chart should now have the visual completeness called for in the spec.

- [ ] **Verify Phase 5 is healthy**

Run: `npm test && npm run typecheck`

Expected: PASS. Then `npm run dev` and confirm:
- A small yellow pill appears above each dynasty start
- Pills don't overlap dynasty labels
- Pills follow the snake path through bends
- Pills read like "2070 BCE", "1600 BCE", "1046 BCE", "221 BCE", "206 BCE", and so on

- [ ] **Checkpoint the phase**

Append to `.claude/checkpoints.log`:

```
2026-04-27-<HH:MM> | snake-phase-5-complete | <commit-sha> | date ticks at every dynasty boundary. Visual structure complete.
```

Commit:

```bash
git add .claude/checkpoints.log
git commit -m "chore: checkpoint snake phase 5 complete"
```

- [ ] **Clear context and resume at Phase 6**

Run `/clear`. Then dispatch a new subagent with:

> Resume the snake timeline plan at Phase 6 (Task 15: verify interactions). Plan: `docs/superpowers/plans/2026-04-27-snake-timeline.md`. Phases 1 through 5 are complete: full visual structure rendering (snake, primary bars with labels, concurrent ribbon, date ticks). Continue from Task 15.

---

## Phase 6: Interactions

The hover tooltip and click selection were already wired into `DynastySegment` and `ConcurrentSegment` in Tasks 8 and 11. This phase verifies they work end to end.

### Task 15: Verify hover and click interactions

**Files:**
- Modify (verification only): no file changes expected

- [ ] **Step 1: Visual verification of hover tooltips**

Run: `npm run dev`.

Expected:
- Hovering over any primary dynasty bar shows a tooltip near the cursor with the dynasty name (e.g., "Han") and a sub-line with the date range and summary
- Hovering over any concurrent ribbon shows the same kind of tooltip with the concurrent state's info
- Moving the cursor moves the tooltip
- Mousing off any segment hides the tooltip

- [ ] **Step 2: Visual verification of click selection**

Expected:
- Clicking any primary dynasty bar opens it in the right detail panel with full information (name, date range, summary, related items)
- Clicking any concurrent ribbon opens it in the right detail panel
- Clicking the empty canvas (away from any bar) clears the selection
- The clicked bar shows a dashed indigo highlight outline

- [ ] **Step 3: If anything is wrong, fix and commit**

If the tooltip placement is off, the click handler does not fire, or the highlight does not appear, debug at the `DynastySegment` and `ConcurrentSegment` level. Common issues:
- `e.stopPropagation()` missing on click (would clear selection right after picking)
- Tooltip overlay positioned outside the canvas-wrap (z-index issue)
- `pointerEvents="none"` accidentally on the wrong element

Commit any fixes with:

```bash
git add <files>
git commit -m "fix: <what was broken>"
```

If everything works, there is nothing to commit and the task is done.

---

## STOP: Phase 6 break

Phase 6 was a verification-only phase. If anything was off and you fixed it, commit. Otherwise skip the commit. Either way, this is a clean stopping point before the cleanup phase.

- [ ] **Verify Phase 6 is healthy**

Run: `npm test && npm run typecheck`

Expected: PASS. Then `npm run dev` and confirm hover tooltips and click selection work for both primary dynasties and concurrent ribbons.

- [ ] **Checkpoint the phase**

Append to `.claude/checkpoints.log`:

```
2026-04-27-<HH:MM> | snake-phase-6-complete | <commit-sha> | interactions verified. All hover and click flows work end to end.
```

Commit:

```bash
git add .claude/checkpoints.log
git commit -m "chore: checkpoint snake phase 6 complete"
```

- [ ] **Clear context and resume at Phase 7**

Run `/clear`. Then dispatch a new subagent with:

> Resume the snake timeline plan at Phase 7 (Task 16: disable non-dynasty layer toggles). Plan: `docs/superpowers/plans/2026-04-27-snake-timeline.md`. Phases 1 through 6 are complete: full visual + interaction layer working. Phase 7 is cleanup: disable other layer toggles, simplify App.tsx, delete dead files. Continue from Task 16.

---

## Phase 7: Cleanup

### Task 16: Disable non-dynasty layer toggles in Sidebar

**Files:**
- Modify: `src/components/Sidebar.tsx`

- [ ] **Step 1: Disable inactive toggles**

In `src/components/Sidebar.tsx`, find the `FILTER_DEFS` constant and add a `comingSoon` flag to non-dynasty entries:

```typescript
const FILTER_DEFS: Array<{ key: LayerKey; label: string; glyph: string; comingSoon?: boolean }> = [
  { key: 'dynasties',  label: 'Dynasties',        glyph: '▬' },
  { key: 'events',     label: 'Events',            glyph: '●', comingSoon: true },
  { key: 'figures',    label: 'Figures',           glyph: '◆', comingSoon: true },
  { key: 'culture',    label: 'Cultural anchors',  glyph: '✦', comingSoon: true },
  { key: 'inventions', label: 'Inventions',        glyph: '◼', comingSoon: true },
  { key: 'global',     label: 'Global context',    glyph: '▭', comingSoon: true },
  { key: 'sources',    label: 'Primary sources',   glyph: '▣', comingSoon: true },
];
```

Then update the filter row JSX to disable the checkbox and add a tooltip:

```tsx
            {FILTER_DEFS.map(f => (
              <label
                key={f.key}
                className={`filter-row ${layers[f.key] ? 'on' : 'off'} ${f.comingSoon ? 'coming-soon' : ''}`}
                title={f.comingSoon ? 'Coming in a later update' : undefined}
              >
                <input
                  type="checkbox"
                  checked={f.comingSoon ? false : layers[f.key]}
                  disabled={f.comingSoon}
                  onChange={() => { if (!f.comingSoon) onToggleLayer(f.key); }}
                />
                <span className="filter-glyph">{f.glyph}</span>
                <span className="filter-label">{f.label}</span>
                <span className="filter-count">{counts[f.key]}</span>
              </label>
            ))}
```

- [ ] **Step 2: Add a coming-soon style in styles.css**

Open `src/styles.css`, find the `.filter-row` block, and add after it (or wherever filter styles live):

```css
.filter-row.coming-soon {
  opacity: 0.5;
  cursor: not-allowed;
}
.filter-row.coming-soon input {
  cursor: not-allowed;
}
```

- [ ] **Step 3: Type-check**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 4: Visual verification**

Run: `npm run dev`.

Expected:
- The Dynasties toggle works as before
- The Events, Figures, Cultural anchors, Inventions, Global context, and Primary sources toggles render at half opacity and cannot be checked
- Hovering one shows a tooltip "Coming in a later update"

- [ ] **Step 5: Commit**

```bash
git add src/components/Sidebar.tsx src/styles.css
git commit -m "feat: disable non-dynasty layer toggles for v1"
```

---

### Task 17: Remove unused props from App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Drop expandedRow and mode plumbing**

In `src/App.tsx`:

1. Remove these lines from the top of `AppInner`:

```typescript
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState<'overview' | 'detailed'>('detailed');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
```

Replace with nothing (the snake canvas does not need them).

2. Update the TopBar usage. Replace:

```tsx
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
```

with:

```tsx
      <TopBar
        zoom={1}
        onZoom={() => {}}
        mode="detailed"
        onMode={() => {}}
        onResetView={() => {
          setSelected(null);
          setSearch('');
        }}
      />
```

This keeps the existing TopBar component working while making zoom and mode no-ops. We can simplify TopBar in a later cleanup.

3. Update the TimelineCanvas usage. Replace:

```tsx
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
```

with:

```tsx
          <TimelineCanvas
            data={data}
            layers={layers}
            highlightId={selected ? selected.id : null}
            onPick={(id, kind) => {
              const picked = findById(data, id);
              if (picked) setSelected({ ...picked, kind });
            }}
            onClearSelection={() => setSelected(null)}
          />
```

- [ ] **Step 2: Type-check**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 3: Run unit tests**

Run: `npm test`

Expected: PASS.

- [ ] **Step 4: Visual verification**

Run: `npm run dev`.

Expected:
- Page still renders the snake with all dynasties
- Sidebar, search, and detail panel still work
- Reset View button in the top bar clears search and selection
- Zoom buttons in the top bar are present but do nothing (will remove in a future cleanup)

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "refactor: drop expandedRow and mode plumbing from App"
```

---

### Task 18: Delete dead files

**Files:**
- Delete: `src/lib/layout.ts`, `src/lib/layout.test.ts`, `src/components/timeline/RowFrame.tsx`, `src/components/timeline/SystemBand.tsx`, `src/components/timeline/Markers.tsx`, `src/components/timeline/DynastyBar.tsx`

- [ ] **Step 1: Confirm nothing imports these files**

Run:

```bash
grep -RlE "lib/layout|RowFrame|SystemBand|Markers|DynastyBar" src/
```

Expected: No matches, or matches only in the files listed for deletion above.

If any other file imports them, stop and investigate. Do not delete until imports are cleared.

- [ ] **Step 2: Delete the files**

Run:

```bash
rm src/lib/layout.ts
rm src/lib/layout.test.ts
rm src/components/timeline/RowFrame.tsx
rm src/components/timeline/SystemBand.tsx
rm src/components/timeline/Markers.tsx
rm src/components/timeline/DynastyBar.tsx
```

- [ ] **Step 3: Type-check**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 4: Run all unit tests**

Run: `npm test`

Expected: PASS. The test count drops because `layout.test.ts` is gone, but all remaining tests still pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: delete dead files from old wrapped-row design"
```

---

## STOP: Phase 7 break

Phase 7 was the codebase cleanup. App.tsx is simplified, dead files are gone, sidebar toggles are gated. Phase 8 is the final verification pass plus E2E test.

- [ ] **Verify Phase 7 is healthy**

Run: `npm test && npm run typecheck`

Expected: PASS. Then `npm run dev` and confirm:
- Page still renders correctly with all dynasties, ribbons, ticks
- Sidebar shows only Dynasties as enabled, others greyed out with "Coming in a later update" tooltip
- Reset View clears search and selection (zoom buttons may now be no-ops, that is expected)
- Old layout files are gone (`grep -RlE "lib/layout|RowFrame|SystemBand|Markers|DynastyBar" src/` returns nothing)

- [ ] **Checkpoint the phase**

Append to `.claude/checkpoints.log`:

```
2026-04-27-<HH:MM> | snake-phase-7-complete | <commit-sha> | codebase cleanup done. Dead files removed. Sidebar gated. App.tsx simplified.
```

Commit:

```bash
git add .claude/checkpoints.log
git commit -m "chore: checkpoint snake phase 7 complete"
```

- [ ] **Clear context and resume at Phase 8**

Run `/clear`. Then dispatch a new subagent with:

> Resume the snake timeline plan at Phase 8 (Task 19: E2E smoke test). Plan: `docs/superpowers/plans/2026-04-27-snake-timeline.md`. Phases 1 through 7 are complete: snake timeline fully built, codebase cleaned up. Phase 8 is the final verification pass: write the Playwright smoke test, walk the acceptance criteria, ship it.

---

## Phase 8: Verification

### Task 19: Add E2E smoke test

**Files:**
- Create: `tests/e2e/snake-timeline.spec.ts`

Check whether a Playwright config and existing E2E directory exist. If not, this task will create them.

- [ ] **Step 1: Check for existing Playwright setup**

Run: `ls playwright.config.* 2>/dev/null && ls tests/ 2>/dev/null`

If no `playwright.config.*` exists, run:

```bash
npx playwright install chromium
```

Then create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
  ],
});
```

- [ ] **Step 2: Write the smoke test**

Create `tests/e2e/snake-timeline.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('snake timeline v1', () => {
  test('renders snake backbone and primary dynasties', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="timeline-svg"]');

    // Backbone is present
    await expect(page.locator('[data-testid="snake-backbone"]')).toBeVisible();

    // Major dynasties render. Note: dataset ids use R_ prefix; Han is split
    // into Western (R_HAN_W) and Eastern (R_HAN_E) — there is no plain R_HAN.
    await expect(page.locator('[data-testid="dynasty-R_HAN_W"]')).toBeVisible();
    await expect(page.locator('[data-testid="dynasty-R_TANG"]')).toBeVisible();
    await expect(page.locator('[data-testid="dynasty-R_QING"]')).toBeVisible();
  });

  test('zhou bar is visibly longer than prc bar', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="timeline-svg"]');

    const zhou = page.locator('[data-testid="dynasty-R_ZHOU"] path').first();
    const prc = page.locator('[data-testid="dynasty-R_PRC"] path').first();

    const zhouBox = await zhou.boundingBox();
    const prcBox = await prc.boundingBox();

    expect(zhouBox).not.toBeNull();
    expect(prcBox).not.toBeNull();
    if (zhouBox && prcBox) {
      // Approximate: Zhou is ~10x longer than PRC. Bounding box comparison is fuzzy
      // because of curves, but Zhou's bounding box width should clearly exceed PRC's.
      expect(zhouBox.width).toBeGreaterThan(prcBox.width * 3);
    }
  });

  test('clicking a dynasty opens it in the detail panel', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="timeline-svg"]');

    await page.locator('[data-testid="dynasty-R_TANG"]').click();

    // Detail panel should show Tang
    await expect(page.getByText(/Tang/)).toBeVisible();
  });

  test('non-dynasty layer toggles are disabled', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.filter-list');

    const eventsCheckbox = page.locator('.filter-row.coming-soon').first().locator('input[type="checkbox"]');
    await expect(eventsCheckbox).toBeDisabled();
  });
});
```

- [ ] **Step 3: Run the E2E tests**

Run: `npm run test:e2e`

Expected: PASS, 4 green tests.

If a test fails:
- Inspect the actual `data-testid` attribute used. The dataset uses R_ prefixed ids (R_HAN_W, R_HAN_E, R_TANG, R_QING, R_ZHOU, R_PRC, etc.) which feed straight into the `dynasty-${dynasty.id}` testid. If a test selector ever drifts from the dataset, fix the selector, not the data.
- The Zhou-vs-PRC bounding box test is approximate. Curves can make bounding boxes less informative than path length. If it fails by a small margin, loosen the multiplier, but if Zhou's bounding box is not at least 3x PRC's, the proportional time mapping is broken.

- [ ] **Step 4: Commit**

```bash
git add playwright.config.ts tests/e2e/snake-timeline.spec.ts
git commit -m "test: add snake timeline E2E smoke test"
```

---

### Task 20: Final visual verification against acceptance criteria

**Files:**
- No file changes; this is a manual checklist run

- [ ] **Step 1: Run the dev server and walk through the acceptance criteria**

Run: `npm run dev`. Open the browser. Walk through each item from the spec's Acceptance criteria section:

1. Single continuous snake from Xia to PRC on one screen at 1280×800 with no vertical scroll
2. Bar bends are visible half-circles
3. Every primary dynasty in `data.primary` renders as a stroke segment
4. Adjacent dynasties show alternating shades of vermillion, Yuan and Qing in distinct purple-vermillion
5. Every concurrent state in `data.concurrent` renders as a thinner sepia stroke offset below the main bar
6. Each dynasty start year appears as a small yellow pill perpendicular to the path
7. Dynasty labels appear centered along bars wider than 50px
8. Hover shows tooltip with name and date range
9. Click opens detail panel
10. Sidebar layer toggle for Dynasties is enabled, others disabled with tooltip
11. Zhou's bar is at least 8x the width of PRC's bar (proportional check)
12. Unit tests for `snake-path.ts` pass with at least 90% coverage of the geometry module
13. Existing test suite passes

If any criterion fails, file an inline fix and commit. Do not skip.

- [ ] **Step 2: Run the full test suite one final time**

Run:

```bash
npm test
npm run typecheck
npm run test:e2e
```

Expected: PASS for all three commands.

- [ ] **Step 3: Update the project memory with the completion checkpoint**

Append to `.claude/checkpoints.log`:

```
2026-04-27-<HH:MM> | snake-timeline-v1-complete | <commit-sha> | 20 tasks done. Snake timeline shipped. Dynasty spine + concurrent ribbon + date ticks + labels. Other layers (events, figures, global) deferred to v2.
```

Replace `<HH:MM>` with the current time and `<commit-sha>` with the latest commit SHA from `git log -1 --pretty=%h`.

- [ ] **Step 4: Final commit**

```bash
git add .claude/checkpoints.log
git commit -m "chore: checkpoint snake timeline v1 complete"
```

---

## Verification matrix (spec to task mapping)

| Spec section | Tasks |
|---|---|
| Year mapping is linear | Task 2 (yearToDistance) |
| 4 alternating-direction rows | Tasks 1, 4 (geometry, backbonePath) |
| Half-circle bends at row ends | Tasks 1, 4 |
| Pure-function geometry module | Tasks 1-5 |
| Snake backbone always visible | Task 7 |
| Primary dynasty bars render along path | Tasks 8, 9 |
| Alternating vermillion shades | Tasks 6, 9 |
| Yuan and Qing in vermillion3 | Tasks 6, 9 |
| Concurrent states as offset ribbon | Tasks 11, 12 |
| Date ticks at dynasty boundaries | Tasks 13, 14 |
| Labels via SVG textPath | Task 10 |
| Hover tooltip | Tasks 8, 11, 15 |
| Click selection | Tasks 8, 11, 15 |
| Other layer toggles disabled | Task 16 |
| `App.tsx` props simplified | Task 17 |
| Dead files removed | Task 18 |
| E2E smoke test | Task 19 |
| Acceptance criteria walkthrough | Task 20 |

---

## Notes for the implementer

- The geometry unit tests still pass `width: 660, height: 700, padding: 40` directly into `computeGeometry`. Those values exercise the function generically; the live canvas now uses a fixed 880px height (4 rows × 200px row height + 80px padding) at runtime. The function works for either set of inputs; the tests are not coupled to the canvas.
- The arc sweep flag alternates: right-side bends use sweep `1` (clockwise, bulging right off the canvas), left-side bends use sweep `0` (counter-clockwise, bulging left). Both `backbonePath` and `segmentPath` already implement this. There is a regression test in `snake-path.test.ts` that locks the pattern to `['1', '0', '1']` for a 4-row snake.
- The `data-testid` attributes on dynasty segments use the dynasty's `id` field directly. The dataset uses `R_` prefixed ids (`R_HAN_W`, `R_HAN_E`, `R_TANG`, `R_QING`, `R_ZHOU`, `R_PRC`, etc.). The Phase 8 E2E tests select on those exact ids — no `regime-<name>` translation.
- The concurrent ribbon offset is positive (below the main bar) for all rows. The offset path uses the same arc geometry centered at the bend center plus the y offset, not a smaller-radius concentric arc.
- The label width threshold is 50px for primary, 60px for concurrent. These are tunable. Adjust upward if labels collide, downward to label more short dynasties.
- After Task 7, the page renders only the backbone. After Task 9, dynasties appear. Each task should produce a working visual snapshot.
