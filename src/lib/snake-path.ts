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
