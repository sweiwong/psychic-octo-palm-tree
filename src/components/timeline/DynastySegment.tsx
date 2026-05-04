import { labelPath, segmentPath, yearToDistance, yearToPoint, type DerivedSizes, type SnakeGeometry } from '../../lib/snake-path';
import { fmtRange } from '../../lib/format';
import { COLOR } from '../../lib/colors';
import type { NormalizedSpanItem, SelectedItem } from '../../data/types';

interface TooltipPayload {
  x: number;
  y: number;
  title: string;
  sub: string;
}

interface DynastySegmentProps {
  dynasty: NormalizedSpanItem;
  geometry: SnakeGeometry;
  sizes: DerivedSizes;
  fill: string;
  highlighted: boolean;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onTooltip: (payload: TooltipPayload | null) => void;
  calloutBelow?: boolean;
  calloutXOffset?: number;
  calloutSide?: 'above' | 'below' | 'right';
}

export function DynastySegment(props: DynastySegmentProps) {
  const { dynasty, geometry, sizes, fill, highlighted, onPick, onTooltip, calloutBelow = false, calloutXOffset = 0, calloutSide } = props;
  const d = segmentPath(dynasty.start, dynasty.end, geometry);
  if (!d) return null;

  const barLengthPx = Math.abs(
    yearToDistance(dynasty.end, geometry) - yearToDistance(dynasty.start, geometry)
  );
  const estimatedNameWidth = dynasty.name.length * sizes.inlineLabelCharWidth;
  const fitsCarved = barLengthPx >= estimatedNameWidth;
  const pathId = `dynasty-path-${dynasty.id}`;
  const labelD = labelPath(dynasty.start, dynasty.end, geometry);
  const labelPathId = `dynasty-label-path-${dynasty.id}`;

  const midYear = (dynasty.start + dynasty.end) / 2;
  const mid = yearToPoint(midYear, geometry);
  const barHalfThickness = sizes.barHalfThickness;
  const leaderLength = sizes.calloutLeaderLength;
  const calloutGap = sizes.calloutGap;
  const side = calloutSide ?? (calloutBelow ? 'below' : 'above');
  const verticalDirection = side === 'below' ? 1 : -1;
  const leaderBottom = side === 'right'
    ? { x: mid.x + barHalfThickness, y: mid.y }
    : { x: mid.x, y: mid.y + verticalDirection * barHalfThickness };
  const leaderTop = side === 'right'
    ? { x: mid.x + barHalfThickness + leaderLength, y: mid.y }
    : { x: mid.x + calloutXOffset, y: mid.y + verticalDirection * (barHalfThickness + leaderLength) };
  const labelPos = side === 'right'
    ? { x: leaderTop.x + calloutGap, y: mid.y }
    : { x: mid.x + calloutXOffset, y: leaderTop.y + verticalDirection * calloutGap };
  const labelAnchor: 'start' | 'middle' = side === 'right' ? 'start' : 'middle';
  const labelBaseline: 'auto' | 'middle' | 'hanging' = side === 'right' ? 'middle' : side === 'below' ? 'hanging' : 'auto';

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
        id={pathId}
        d={d}
        fill="none"
        stroke={fill}
        strokeWidth={sizes.barThickness}
        strokeLinecap="butt"
        strokeLinejoin="round"
      />
      {fitsCarved && (
        <>
          <path id={labelPathId} d={labelD} fill="none" stroke="none" />
          <text
            aria-hidden="true"
            fill="white"
            fontFamily="'Spectral', 'Cormorant Garamond', serif"
            fontSize={sizes.inlineLabelFontSize}
            fontWeight={600}
            letterSpacing={1.4}
            style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
          >
            <textPath href={`#${labelPathId}`} startOffset="50%" textAnchor="middle">
              {dynasty.name}
            </textPath>
          </text>
        </>
      )}
      {!fitsCarved && (
        <g pointerEvents="none">
          <line
            x1={leaderBottom.x}
            y1={leaderBottom.y}
            x2={leaderTop.x}
            y2={leaderTop.y}
            stroke={COLOR.ink2}
            strokeWidth={1}
          />
          <text
            aria-hidden="true"
            x={labelPos.x}
            y={labelPos.y}
            textAnchor={labelAnchor}
            dominantBaseline={labelBaseline}
            fill={COLOR.ink}
            fontFamily="'Spectral', 'Cormorant Garamond', serif"
            fontSize={sizes.calloutFontSize}
            fontWeight={600}
            letterSpacing={1.0}
            style={{ textTransform: 'uppercase' }}
          >
            {dynasty.name}
          </text>
        </g>
      )}
      {dynasty.subPeriods?.map((sub) => {
        const overlapStart = Math.max(sub.start, dynasty.start);
        const overlapEnd = Math.min(sub.end, dynasty.end);
        if (overlapEnd <= overlapStart) return null;
        const subMidYear = (overlapStart + overlapEnd) / 2;
        const subPos = yearToPoint(subMidYear, geometry);
        if (Math.abs(subPos.tangent.x) < 0.5) return null; // skip if on a bend
        const overlapPx = Math.abs(
          yearToDistance(overlapEnd, geometry) - yearToDistance(overlapStart, geometry)
        );
        const subFits = sub.name.length * sizes.subPeriodCharWidth + sizes.barThickness * 0.3 < overlapPx;
        if (!subFits) return null;
        const subBaselineY = subPos.y - barHalfThickness + sizes.subPeriodFontSize + 2;
        return (
          <text
            key={sub.id}
            x={subPos.x}
            y={subBaselineY}
            aria-hidden="true"
            fill="white"
            fontFamily="'Spectral', 'Cormorant Garamond', serif"
            fontSize={sizes.subPeriodFontSize}
            fontStyle="italic"
            fontWeight={500}
            letterSpacing={0.6}
            opacity={0.85}
            textAnchor="middle"
            style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
          >
            {sub.name}
          </text>
        );
      })}
      {highlighted && (
        <path
          d={d}
          fill="none"
          stroke="oklch(0.45 0.06 250)"
          strokeWidth={sizes.barThickness + 4}
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
