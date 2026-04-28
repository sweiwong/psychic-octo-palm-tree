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
