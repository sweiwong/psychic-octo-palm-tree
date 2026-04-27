import { COLOR } from '../../lib/colors';
import { locate, type Row } from '../../lib/layout';
import { fmtYear } from '../../lib/format';
import type { NormalizedPointItem, SelectedItem } from '../../data/types';

const EVENT_Y = 96;
const FIGURE_Y_OFFSET = -18;
const CULTURE_Y = -100;
const INVENTION_Y_OFFSET = -18;

interface TooltipPayload {
  x: number;
  y: number;
  title: string;
  sub: string;
}

interface MarkerCommon {
  rows: Row[];
  expandedRow: number | null;
  rowYCenter: (rowIndex: number) => number;
  rowH: number;
  mode: 'overview' | 'detailed';
  highlightId: string | null;
  xFor: (frac: number) => number;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onTooltip: (payload: TooltipPayload | null) => void;
}

interface EventMarkerProps extends MarkerCommon {
  event: NormalizedPointItem;
}

export function EventMarker({ event: e, rows, expandedRow, rowYCenter, mode, highlightId, xFor, onPick, onTooltip }: EventMarkerProps) {
  const loc = locate(e.year);
  const r = rows[loc.rowIndex];
  if (!r) return null;
  if (expandedRow != null && r.index !== expandedRow) return null;
  const yC = rowYCenter(r.index);
  const x = xFor(loc.frac);
  const y = yC + EVENT_Y;
  const isHi = highlightId === e.id;
  const radius = e.importance >= 5 ? 5 : 4;
  const sub = `${fmtYear(e.year)}${e.summary ? ` — ${e.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={(ev) => { ev.stopPropagation(); onPick(e.id, 'event'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: e.name, sub })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: e.name, sub })}
      onMouseLeave={() => onTooltip(null)}
    >
      <line x1={x} x2={x} y1={yC + 22} y2={y - radius - 1} stroke={COLOR.ruleStrong} strokeWidth={0.5} />
      <circle cx={x} cy={y} r={radius} fill={COLOR.ink} stroke={COLOR.parchment} strokeWidth={1.2} />
      {(mode === 'detailed' || isHi) && (
        <text
          x={x + radius + 4} y={y + 3}
          fill={COLOR.ink}
          fontFamily="'Spectral', serif"
          fontSize={10.5}
          style={{ pointerEvents: 'none' }}
        >
          {e.name.length > 28 ? `${e.name.slice(0, 26)}…` : e.name}
        </text>
      )}
    </g>
  );
}

interface FigureMarkerProps extends MarkerCommon {
  figure: NormalizedPointItem;
}

export function FigureMarker({ figure: f, rows, expandedRow, rowYCenter, mode, xFor, onPick, onTooltip }: FigureMarkerProps) {
  const loc = locate(f.year);
  const r = rows[loc.rowIndex];
  if (!r) return null;
  if (expandedRow != null && r.index !== expandedRow) return null;
  const yC = rowYCenter(r.index);
  const x = xFor(loc.frac);
  const y = yC + EVENT_Y + FIGURE_Y_OFFSET;
  const sub = `${fmtYear(f.year)}${f.summary ? ` — ${f.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={(ev) => { ev.stopPropagation(); onPick(f.id, 'figure'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: f.name, sub })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: f.name, sub })}
      onMouseLeave={() => onTooltip(null)}
    >
      <polygon points={`${x},${y - 5} ${x + 5},${y} ${x},${y + 5} ${x - 5},${y}`}
        fill={COLOR.indigo} stroke={COLOR.parchment} strokeWidth={1} />
      {mode === 'detailed' && (
        <text
          x={x + 8} y={y + 3}
          fill={COLOR.indigo}
          fontFamily="'Spectral', serif"
          fontSize={10}
          fontStyle="italic"
          style={{ pointerEvents: 'none' }}
        >
          {f.name}
        </text>
      )}
    </g>
  );
}

interface CultureMarkerProps extends MarkerCommon {
  culture: NormalizedPointItem;
}

export function CultureMarker({ culture: c, rows, expandedRow, rowYCenter, mode, xFor, onPick, onTooltip }: CultureMarkerProps) {
  const loc = locate(c.year);
  const r = rows[loc.rowIndex];
  if (!r) return null;
  if (expandedRow != null && r.index !== expandedRow) return null;
  const yC = rowYCenter(r.index);
  const x = xFor(loc.frac);
  const y = yC + CULTURE_Y;
  const sub = `${fmtYear(c.year)}${c.summary ? ` — ${c.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={(ev) => { ev.stopPropagation(); onPick(c.id, 'culture'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: c.name, sub })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: c.name, sub })}
      onMouseLeave={() => onTooltip(null)}
    >
      <line x1={x} x2={x} y1={y + 6} y2={yC - 22}
        stroke={COLOR.ruleStrong} strokeWidth={0.5} strokeDasharray="2 2" />
      <rect x={x - 5} y={y - 5} width={10} height={10}
        fill={COLOR.gold} stroke={COLOR.ink} strokeWidth={0.8} />
      {mode === 'detailed' && (
        <text
          x={x + 8} y={y + 3}
          fill={COLOR.ink}
          fontFamily="'Spectral', serif"
          fontSize={10}
          style={{ pointerEvents: 'none' }}
        >
          {c.name.length > 28 ? `${c.name.slice(0, 26)}…` : c.name}
        </text>
      )}
    </g>
  );
}

interface InventionMarkerProps extends MarkerCommon {
  invention: NormalizedPointItem;
}

export function InventionMarker({ invention: inv, rows, expandedRow, rowYCenter, xFor, onPick, onTooltip }: InventionMarkerProps) {
  const loc = locate(inv.year);
  const r = rows[loc.rowIndex];
  if (!r) return null;
  if (expandedRow != null && r.index !== expandedRow) return null;
  const yC = rowYCenter(r.index);
  const x = xFor(loc.frac);
  const y = yC + CULTURE_Y + INVENTION_Y_OFFSET;
  const sub = `${fmtYear(inv.year)}${inv.summary ? ` — ${inv.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={(ev) => { ev.stopPropagation(); onPick(inv.id, 'invention'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: inv.name, sub })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: inv.name, sub })}
      onMouseLeave={() => onTooltip(null)}
    >
      <rect x={x - 5} y={y - 5} width={10} height={10}
        fill="white" stroke={COLOR.jade} strokeWidth={1.4} />
      <line x1={x - 3} x2={x + 3} y1={y} y2={y} stroke={COLOR.jade} strokeWidth={1} />
      <line x1={x} x2={x} y1={y - 3} y2={y + 3} stroke={COLOR.jade} strokeWidth={1} />
    </g>
  );
}

interface GlobalMarkerProps extends MarkerCommon {
  global: NormalizedPointItem;
}

export function GlobalMarker({ global: g, rows, expandedRow, rowYCenter, rowH, xFor, onPick, onTooltip }: GlobalMarkerProps) {
  const loc = locate(g.year);
  const r = rows[loc.rowIndex];
  if (!r) return null;
  if (expandedRow != null && r.index !== expandedRow) return null;
  const yC = rowYCenter(r.index);
  const x = xFor(loc.frac);
  const yBot = yC + rowH / 2 - 22;
  const sub = `${fmtYear(g.year)}${g.summary ? ` — ${g.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={(ev) => { ev.stopPropagation(); onPick(g.id, 'global'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: `GLOBAL · ${g.name}`, sub })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: `GLOBAL · ${g.name}`, sub })}
      onMouseLeave={() => onTooltip(null)}
    >
      <rect x={x - 38} y={yBot - 14} width={76} height={14}
        fill="white" stroke={COLOR.indigo} strokeWidth={0.8} />
      <text x={x} y={yBot - 4}
        fill={COLOR.indigo}
        fontFamily="'Spectral', serif"
        fontSize={9}
        fontStyle="italic"
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
      >
        {g.name.length > 16 ? `${g.name.slice(0, 15)}…` : g.name}
      </text>
    </g>
  );
}
