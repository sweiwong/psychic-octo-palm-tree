import { COLOR, SYSTEM_BAND_PALETTE } from '../../lib/colors';
import { clipRange, type Row } from '../../lib/layout';
import type { NormalizedSystem } from '../../data/types';

interface SystemBandProps {
  system: NormalizedSystem;
  systemIndex: number;
  rows: Row[];
  expandedRow: number | null;
  rowYCenter: (rowIndex: number) => number;
  rowH: number;
  xFor: (frac: number) => number;
}

export function SystemBand(props: SystemBandProps) {
  const { system, systemIndex, rows, expandedRow, rowYCenter, rowH, xFor } = props;
  const segs = clipRange(system.start, system.end);
  const fill = SYSTEM_BAND_PALETTE[systemIndex % SYSTEM_BAND_PALETTE.length];

  return (
    <>
      {segs.map((seg, i) => {
        const r = rows[seg.rowIndex];
        if (!r) return null;
        if (expandedRow != null && r.index !== expandedRow) return null;
        const yC = rowYCenter(r.index);
        const x0 = xFor(seg.x0);
        const x1 = xFor(seg.x1);
        const yTop = yC - rowH / 2 + 22;
        const bandH = rowH - 44;
        return (
          <g key={`${system.id}-${i}`} pointerEvents="none">
            <rect x={x0} y={yTop} width={x1 - x0} height={bandH} fill={fill} opacity={0.35} />
            {seg.isStart && x1 - x0 > 80 && (
              <text
                x={x0 + 6} y={yTop + 12}
                fill={COLOR.ink2}
                fontFamily="'Spectral', serif"
                fontStyle="italic"
                fontSize={10}
                letterSpacing={0.4}
              >
                {system.name}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}
