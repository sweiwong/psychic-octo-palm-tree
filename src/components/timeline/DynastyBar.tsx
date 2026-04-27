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
