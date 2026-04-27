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

export { fmtYear };
