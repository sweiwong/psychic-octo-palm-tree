import { segmentPath, yearToDistance, type SnakeGeometry } from '../../lib/snake-path';
import { fmtRange } from '../../lib/format';
import type { NormalizedSpanItem, SelectedItem } from '../../data/types';

const BAR_THICKNESS = 28;
const LABEL_MIN_WIDTH = 50; // px on path

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
  const showLabel = barLengthPx >= LABEL_MIN_WIDTH;
  const pathId = `dynasty-path-${dynasty.id}`;

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
