import { labelPath, segmentPath, yearToDistance, yearToPoint, type SnakeGeometry } from '../../lib/snake-path';
import { fmtRange } from '../../lib/format';
import { COLOR } from '../../lib/colors';
import type { NormalizedSpanItem, SelectedItem } from '../../data/types';

const BAR_THICKNESS = 28;
const AVG_CHAR_WIDTH = 9.5;   // px per uppercase char at fontSize 14, letterSpacing 1.4
const LEADER_LENGTH = 14;     // px — vertical leader line from bar to label
const CALLOUT_FONT_SIZE = 11; // px — smaller than carved label for visual hierarchy
const CALLOUT_GAP = 4;        // px between leader end and label baseline

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

  const barLengthPx = Math.abs(
    yearToDistance(dynasty.end, geometry) - yearToDistance(dynasty.start, geometry)
  );
  const estimatedNameWidth = dynasty.name.length * AVG_CHAR_WIDTH;
  const fitsCarved = barLengthPx >= estimatedNameWidth;
  const pathId = `dynasty-path-${dynasty.id}`;
  const labelD = labelPath(dynasty.start, dynasty.end, geometry);
  const labelPathId = `dynasty-label-path-${dynasty.id}`;

  const midYear = (dynasty.start + dynasty.end) / 2;
  const mid = yearToPoint(midYear, geometry);
  const barHalfThickness = BAR_THICKNESS / 2;
  const leaderTopY = mid.y - barHalfThickness - LEADER_LENGTH;
  const labelY = leaderTopY - CALLOUT_GAP;

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
        strokeWidth={BAR_THICKNESS}
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
            fontSize={14}
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
            x1={mid.x}
            y1={mid.y - barHalfThickness}
            x2={mid.x}
            y2={leaderTopY}
            stroke={COLOR.ink2}
            strokeWidth={1}
          />
          <text
            aria-hidden="true"
            x={mid.x}
            y={labelY}
            textAnchor="middle"
            fill={COLOR.ink}
            fontFamily="'Spectral', 'Cormorant Garamond', serif"
            fontSize={CALLOUT_FONT_SIZE}
            fontWeight={600}
            letterSpacing={1.0}
            style={{ textTransform: 'uppercase' }}
          >
            {dynasty.name}
          </text>
        </g>
      )}
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
