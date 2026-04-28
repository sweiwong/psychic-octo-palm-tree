import { segmentPath, yearToPoint, type SnakeGeometry } from '../../lib/snake-path';
import { fmtRange } from '../../lib/format';
import { COLOR } from '../../lib/colors';
import type { NormalizedSpanItem, SelectedItem } from '../../data/types';

const CONCURRENT_BAR_THICKNESS = 12;
const LEADER_LENGTH = 12;
const CALLOUT_FONT_SIZE = 11;
const CALLOUT_GAP = 4;

const LANE_OFFSET: Record<string, number> = {
  north: -32,
  west: 0,
  south: 32,
};

interface TooltipPayload {
  x: number;
  y: number;
  title: string;
  sub: string;
}

interface ConcurrentSegmentProps {
  regime: NormalizedSpanItem;
  geometry: SnakeGeometry;
  highlighted: boolean;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onTooltip: (payload: TooltipPayload | null) => void;
}

export function ConcurrentSegment(props: ConcurrentSegmentProps) {
  const { regime, geometry, highlighted, onPick, onTooltip } = props;
  const yOffset = LANE_OFFSET[regime.sourceLane] ?? 0;
  const d = segmentPath(regime.start, regime.end, geometry, yOffset);
  if (!d) return null;

  const midYear = (regime.start + regime.end) / 2;
  const mid = yearToPoint(midYear, geometry);
  const offsetY = mid.y + yOffset;
  const barHalf = CONCURRENT_BAR_THICKNESS / 2;
  const leaderTopY = offsetY - barHalf - LEADER_LENGTH;
  const labelY = leaderTopY - CALLOUT_GAP;

  const tooltipBody = `${fmtRange(regime.start, regime.end)}${regime.summary ? ` — ${regime.summary}` : ''}`;

  return (
    <g
      className="concurrent-segment"
      data-testid={`concurrent-${regime.id}`}
      style={{ cursor: 'pointer' }}
      onClick={(e) => {
        e.stopPropagation();
        onPick(regime.id, 'concurrent');
      }}
      onMouseEnter={(e) => onTooltip({
        x: e.clientX, y: e.clientY,
        title: regime.name,
        sub: tooltipBody,
      })}
      onMouseMove={(e) => onTooltip({
        x: e.clientX, y: e.clientY,
        title: regime.name,
        sub: tooltipBody,
      })}
      onMouseLeave={() => onTooltip(null)}
    >
      <path
        d={d}
        fill="none"
        stroke={COLOR.sepia}
        strokeWidth={CONCURRENT_BAR_THICKNESS}
        strokeLinecap="butt"
        strokeLinejoin="round"
      />
      <g pointerEvents="none">
        <line
          x1={mid.x}
          y1={offsetY - barHalf}
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
          {regime.name}
        </text>
      </g>
      {highlighted && (
        <path
          d={d}
          fill="none"
          stroke="oklch(0.45 0.06 250)"
          strokeWidth={CONCURRENT_BAR_THICKNESS + 4}
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
