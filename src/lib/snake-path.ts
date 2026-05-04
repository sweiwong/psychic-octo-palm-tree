export interface GeometryInput {
  width: number;
  height: number;
  /** Horizontal margin on left and right. Used for trackWidth calculations. */
  padding: number;
  rowCount: number;
  yearMin: number;
  yearMax: number;
  /**
   * Extra distance in pixels added to the LEFT free endpoints (row 0 start
   * and last row end) so they reach the same x as the left bend's outer
   * edge. Default `auto` computes (cornerRadius + barHalfThickness). Pass
   * a number for an explicit override; pass 0 to let the bend bulge left
   * of the row endpoints.
   */
  endExtension?: number | 'auto';
  /**
   * Vertical margin on top and bottom. Defaults to `padding`. Pass a smaller
   * value (e.g. 40) to give the snake more vertical room — bigger row gaps
   * for labels above/below each bar.
   */
  paddingY?: number;
  /**
   * Bar thickness as a fraction of rowHeight. Default 0.45 — at this ratio,
   * the bar takes ~45% of the vertical room a row has, leaving ~27% above
   * and below the bar for callouts and date pills. Everything else (font
   * sizes, pill heights, leader lengths) derives from the resulting bar
   * thickness, so the chart stays proportional at any canvas size.
   */
  barThicknessRatio?: number;
}

export interface BendCenter {
  x: number;
  y: number;
  side: 'left' | 'right';
}

export interface SnakeGeometry extends Omit<GeometryInput, 'endExtension'> {
  rowHeight: number;
  cornerRadius: number;
  /**
   * Resolved bar thickness in pixels. Derived from `rowHeight * barThicknessRatio`
   * (default ratio 0.45). All text and pill sizes downstream derive from this
   * via `getDerivedSizes(geometry)` so the chart stays proportional at any size.
   */
  barThickness: number;
  trackWidth: number;
  arcLength: number;
  endExtension: number;
  totalPathLength: number;
  pxPerYear: number;
  rowCenterlines: number[];
  bendCenters: BendCenter[];
}

export function computeGeometry(input: GeometryInput): SnakeGeometry {
  const { width, height, padding, rowCount, yearMin, yearMax } = input;
  const paddingY = input.paddingY ?? padding;
  const rowHeight = (height - 2 * paddingY) / rowCount;
  const cornerRadius = rowHeight / 2;
  const barThicknessRatio = input.barThicknessRatio ?? 0.45;
  const barThickness = rowHeight * barThicknessRatio;
  // Default endExtension aligns the snake's free LEFT endpoints with the
  // left bend's outer edge (so the bend doesn't bulge left of the rows).
  const requestedEndExtension = input.endExtension ?? 'auto';
  const endExtension = requestedEndExtension === 'auto'
    ? cornerRadius + barThickness / 2
    : requestedEndExtension;
  const trackWidth = width - 2 * padding - 2 * cornerRadius;
  const arcLength = Math.PI * cornerRadius;
  const totalPathLength = rowCount * trackWidth + 2 * endExtension + (rowCount - 1) * arcLength;
  const pxPerYear = totalPathLength / (yearMax - yearMin);

  const rowCenterlines: number[] = [];
  for (let i = 0; i < rowCount; i++) {
    rowCenterlines.push(paddingY + cornerRadius + i * rowHeight);
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
    endExtension,
    barThickness,
    rowHeight, cornerRadius, trackWidth, arcLength,
    totalPathLength, pxPerYear, rowCenterlines, bendCenters,
  };
}

/**
 * Single source of truth for every text size, pill dimension, leader length,
 * and offset used in rendering. All values derive from `geometry.barThickness`
 * so the chart stays proportional at any canvas size — when the canvas grows,
 * bars get thicker and labels grow with them; when it shrinks, both shrink
 * together. The ratios below were calibrated against the previous hardcoded
 * values at the canonical canvas size of ~1400x800 (rowHeight ~132, bar 60).
 */
export function getDerivedSizes(geometry: SnakeGeometry) {
  const t = geometry.barThickness;
  return {
    barThickness: t,
    barHalfThickness: t / 2,
    // Inline dynasty name carved on the bar.
    inlineLabelFontSize: t * 0.36,
    inlineLabelCharWidth: t * 0.247,  // measured: 14.8px wide chars at 22px font + letterSpacing 1.4em
    // Date pills (e.g. "1644") below dynasty bars.
    pillFontSize: t * 0.22,
    pillHeight: t * 0.37,
    pillCharWidth: t * 0.123,         // measured: 7.4px wide chars at 13px JetBrains Mono
    pillExtraWidth: t * 0.20,         // padding on either side of the year text
    pillBaseOffset: t * 0.73,         // distance from bar centerline to top of level-0 pill
    pillVerticalGap: t * 0.05,        // vertical gap between stacked pills
    pillLeaderGap: t * 0.033,         // tiny gap between leader-line bottom and pill top
    pillLeaderStrokeWidth: t * 0.020,
    // Callout labels (e.g. "Three Kingdoms", "People's Republic of China")
    // for dynasties whose names don't fit inside their bar.
    calloutFontSize: t * 0.20,
    calloutLeaderLength: t * 0.36,
    calloutGap: t * 0.067,
    // Sub-period italics carved on parent bars (e.g. "Spring and Autumn").
    subPeriodFontSize: t * 0.20,
    subPeriodCharWidth: t * 0.137,
    // Concurrent state ribbons (e.g. Liao, Western Xia) below the main snake.
    concurrentBarThickness: t * 0.23,
    concurrentLaneOffset: { north: t * 0.93, west: t * 1.23, south: t * 1.53 },
    // Event / figure / cultural anchor / global context markers.
    eventLabelOffset: t * 0.73,
    eventLabelLevelStep: t * 0.43,
    figureOffset: t * 1.17,
    anchorOffset: t * 1.27,
    globalOffset: t * 1.83,
    // Year-zero BCE | CE reference line.
    yearZeroLineExtend: t * 1.17,
    yearZeroLabelOffset: t * 0.10,
    yearZeroFontSize: t * 0.17,
  };
}

export type DerivedSizes = ReturnType<typeof getDerivedSizes>;

/**
 * Effective track width for a given row. Rows 0 and (rowCount - 1) get
 * `endExtension` extra pixels on their LEFT side so the snake's free
 * endpoints align with the left bend's outer edge.
 */
function rowTrackWidth(row: number, g: SnakeGeometry): number {
  const isEndRow = row === 0 || row === g.rowCount - 1;
  return g.trackWidth + (isEndRow ? g.endExtension : 0);
}

/**
 * Starting x for a row's path traversal. For LTR rows, this is the leftmost
 * x. For RTL rows, this is the rightmost x. Rows 0 and (rowCount - 1) use
 * the extended left endpoint when applicable.
 */
function rowStartX(row: number, g: SnakeGeometry): number {
  const goingRight = row % 2 === 0;
  if (goingRight) {
    // Row 0 starts at the extended left endpoint; other LTR rows start at the bend chord.
    return row === 0
      ? g.padding + g.cornerRadius - g.endExtension
      : g.padding + g.cornerRadius;
  }
  // RTL row: starts at right edge.
  return g.width - g.padding - g.cornerRadius;
}

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
    const startX = rowStartX(row, g);
    const trackLen = rowTrackWidth(row, g);
    const direction = goingRight ? 1 : -1;

    if (remaining <= trackLen) {
      return {
        x: startX + direction * remaining,
        y: g.rowCenterlines[row],
      };
    }
    remaining -= trackLen;

    if (row === g.rowCount - 1) {
      // Past the end. Clamp to row end.
      const endX = startX + direction * trackLen;
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
    const startX = rowStartX(row, g);
    const trackLen = rowTrackWidth(row, g);

    if (remaining <= trackLen) {
      return {
        x: startX + direction * remaining,
        y: g.rowCenterlines[row],
        tangent: { x: direction, y: 0 },
        normal: { x: 0, y: 1 },
      };
    }
    remaining -= trackLen;

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

export function backbonePath(g: SnakeGeometry): string {
  const r = g.cornerRadius;
  const parts: string[] = [];

  // Start at row 0 left endpoint (extended leftward by endExtension if any)
  const startX = rowStartX(0, g);
  parts.push(`M ${startX} ${g.rowCenterlines[0]}`);

  for (let row = 0; row < g.rowCount; row++) {
    const goingRight = row % 2 === 0;
    const direction = goingRight ? 1 : -1;
    const rowEndX = rowStartX(row, g) + direction * rowTrackWidth(row, g);
    parts.push(`L ${rowEndX} ${g.rowCenterlines[row]}`);

    if (row < g.rowCount - 1) {
      // Arc into next row. The bend's start and end points share the same x
      // (rowEndX) because the half-circle goes vertically by 2*cornerRadius.
      // Right-side bends sweep clockwise (flag 1) so the curve bulges right
      // off the canvas edge. Left-side bends sweep counter-clockwise (flag 0)
      // so the curve bulges left off the canvas edge. Same-flag-everywhere
      // makes the left bends loop back into the canvas — wrong shape.
      const nextY = g.rowCenterlines[row + 1];
      const sweepFlag = goingRight ? 1 : 0;
      parts.push(`A ${r} ${r} 0 0 ${sweepFlag} ${rowEndX} ${nextY}`);
    }
  }

  return parts.join(' ');
}

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
    const trackLen = rowTrackWidth(row, g);
    segments.push({ kind: 'row', row, startDist: cursor, endDist: cursor + trackLen });
    cursor += trackLen;
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
      const segStartX = rowStartX(seg.row, g);
      const localStartX = segStartX + direction * (localStart - seg.startDist);
      const localEndX = segStartX + direction * (localEnd - seg.startDist);
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
      // Sweep direction follows bend side: right bends are clockwise (1),
      // left bends are counter-clockwise (0) under SVG y-down.
      const sweepFlag = center.side === 'right' ? 1 : 0;
      parts.push(`A ${r} ${r} 0 0 ${sweepFlag} ${x1} ${y1}`);
    }
  }

  return parts.join(' ');
}

function reversePath(d: string): string {
  const tokens = d.split(/\s+/).filter((t) => t.length > 0);
  type Cmd =
    | { kind: 'M' | 'L'; x: number; y: number }
    | {
        kind: 'A';
        rx: number;
        ry: number;
        xRot: number;
        largeArc: number;
        sweep: number;
        x: number;
        y: number;
      };
  const cmds: Cmd[] = [];
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (t === 'M' || t === 'L') {
      cmds.push({
        kind: t,
        x: parseFloat(tokens[i + 1]),
        y: parseFloat(tokens[i + 2]),
      });
      i += 3;
    } else if (t === 'A') {
      cmds.push({
        kind: 'A',
        rx: parseFloat(tokens[i + 1]),
        ry: parseFloat(tokens[i + 2]),
        xRot: parseFloat(tokens[i + 3]),
        largeArc: parseInt(tokens[i + 4], 10),
        sweep: parseInt(tokens[i + 5], 10),
        x: parseFloat(tokens[i + 6]),
        y: parseFloat(tokens[i + 7]),
      });
      i += 8;
    } else {
      i += 1;
    }
  }
  if (cmds.length === 0) return '';

  const out: string[] = [];
  const last = cmds[cmds.length - 1];
  out.push(`M ${last.x} ${last.y}`);
  for (let j = cmds.length - 1; j >= 1; j--) {
    const c = cmds[j];
    const prev = cmds[j - 1];
    if (c.kind === 'L') {
      out.push(`L ${prev.x} ${prev.y}`);
    } else if (c.kind === 'A') {
      out.push(`A ${c.rx} ${c.ry} ${c.xRot} ${c.largeArc} ${1 - c.sweep} ${prev.x} ${prev.y}`);
    }
  }
  return out.join(' ');
}

export function labelPath(
  yearStart: number,
  yearEnd: number,
  g: SnakeGeometry,
): string {
  const forward = segmentPath(yearStart, yearEnd, g);
  if (!forward) return forward;
  const midYear = (yearStart + yearEnd) / 2;
  const frame = yearToPoint(midYear, g);
  if (frame.tangent.x >= 0) return forward;
  return reversePath(forward);
}
