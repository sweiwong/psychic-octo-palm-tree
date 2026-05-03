import { useEffect, useMemo, useRef, useState } from 'react';
import {
  computeGeometry,
  segmentPath,
  yearToPoint,
  yearToDistance,
  type SnakeGeometry,
} from '../../lib/snake-path';
import { COLOR, dynastyStripeFill } from '../../lib/colors';
import { fmtYear, fmtRange } from '../../lib/format';
import type {
  LayerToggles,
  NormalizedData,
  NormalizedPointItem,
  NormalizedSpanItem,
  SelectedItem,
} from '../../data/types';
import { SnakeBackbone } from './SnakeBackbone';
import { DynastySegment } from './DynastySegment';

const PADDING = 200;
// Vertical padding is intentionally smaller than horizontal — we want lots
// of room between rows (more breathing space for labels above/below each
// bar), but plenty of side margin so bend year-pills don't clip.
const PADDING_Y = 70;
const ROW_COUNT = 5;
const YEAR_MIN = -2070;
const YEAR_MAX = 2026;

const MIN_CANVAS_WIDTH = 760;
const MIN_CANVAS_HEIGHT = 520;

// Bar half-thickness used to align rows 0/N-1 free endpoints with the left
// bend's outer edge. Must match BAR_THICKNESS / 2 in DynastySegment.tsx.
const BAR_HALF_THICKNESS = 30;

const CONC_BAR_THICKNESS = 14;
const CONC_LANE_OFFSETS: Record<'north' | 'west' | 'south', number> = {
  north: 56,
  west: 74,
  south: 92,
};

const EVENT_LABEL_OFFSET_ABOVE = 44;
const EVENT_LABEL_OFFSET_BELOW = 44;
// How much each successive event-label level is pushed away from the bar.
const EVENT_LABEL_LEVEL_STEP = 26;
// Padding added between adjacent labels at the same level when checking for collision.
const EVENT_LABEL_X_PADDING = 6;
const EVENT_LABEL_MAX_LEVELS = 4;

const FIGURE_OFFSET_ABOVE = 70;
const ANCHOR_OFFSET_BELOW = 76;
const GLOBAL_OFFSET_BELOW = 110;

interface TooltipPayload {
  x: number;
  y: number;
  title: string;
  sub: string;
}

interface TimelineCanvasProps {
  data: NormalizedData;
  layers: LayerToggles;
  highlightId: string | null;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onClearSelection: () => void;
  // Legacy props from previous design, accepted but ignored.
  zoom?: number;
  mode?: 'overview' | 'detailed';
  expandedRow?: number | null;
  onToggleExpandRow?: (rowIndex: number) => void;
}

export function TimelineCanvas(props: TimelineCanvasProps) {
  const { onClearSelection } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1100, h: 700 });
  const [tooltip, setTooltip] = useState<TooltipPayload | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = Math.max(MIN_CANVAS_WIDTH, e.contentRect.width - 4);
        const h = Math.max(MIN_CANVAS_HEIGHT, e.contentRect.height - 4);
        setSize({ w, h });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const geometry = useMemo(() => {
    // Extend the snake's free endpoints (row 0 start, last row end) leftward
    // so they align with the left bend's outer edge instead of stopping at the
    // bend chord. Without this, the bend visibly bulges left of the rows.
    const rowHeight = (size.h - 2 * PADDING_Y) / ROW_COUNT;
    const cornerRadius = rowHeight / 2;
    const endExtension = cornerRadius + BAR_HALF_THICKNESS;
    return computeGeometry({
      width: size.w,
      height: size.h,
      padding: PADDING,
      paddingY: PADDING_Y,
      rowCount: ROW_COUNT,
      yearMin: YEAR_MIN,
      yearMax: YEAR_MAX,
      endExtension,
    });
  }, [size.w, size.h]);

  const sortedPrimary = useMemo(
    () => [...props.data.primary].sort((a, b) => a.start - b.start),
    [props.data.primary],
  );

  const fillById = useMemo(() => {
    const m = new Map<string, string>();
    sortedPrimary.forEach((d, idx) => m.set(d.id, dynastyStripeFill(d.id, idx)));
    return m;
  }, [sortedPrimary]);

  // Find year ranges where no primary dynasty rules. These render as grey
  // "interregnum" bars so the gap between, e.g., Eastern Zhou (ends -256) and
  // Qin (starts -221) reads as "no central authority" instead of an empty
  // background.
  const interregnums = useMemo(() => {
    const gaps: Array<{ start: number; end: number }> = [];
    for (let i = 0; i < sortedPrimary.length - 1; i++) {
      const cur = sortedPrimary[i];
      const next = sortedPrimary[i + 1];
      if (next.start > cur.end) {
        gaps.push({ start: cur.end, end: next.start });
      }
    }
    return gaps;
  }, [sortedPrimary]);

  // Stack date pills vertically when adjacent ones would horizontally overlap.
  // Tiny dynasties (Xin: 14 years) sit so close to their neighbour that two
  // pills crash into each other on a time-proportional snake; this assigns
  // each pill a level so the second one drops below the first.
  const pillLayouts = useMemo(
    () => assignPillLevels(sortedPrimary, geometry),
    [sortedPrimary, geometry],
  );

  // Plan event label placement so labels don't overlap. Each label gets
  // assigned a side (above/below) and a level (how far from the bar).
  // Without this, modern-era clusters on the bottom row collide.
  const eventPlacements = useMemo(
    () => planEventLabels(props.data.events, geometry),
    [props.data.events, geometry],
  );

  return (
    <div className="canvas-wrap" ref={containerRef}>
      <svg
        className="timeline-svg"
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        onClick={onClearSelection}
        data-testid="timeline-svg"
      >
        <defs>
          <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLOR.parchment} />
            <stop offset="100%" stopColor={COLOR.parchment2} />
          </linearGradient>
        </defs>

        {/* Snake guide line */}
        <SnakeBackbone geometry={geometry} />

        {/* Interregnum bars — grey segments where no dynasty rules */}
        {props.layers.dynasties && interregnums.map((gap, i) => (
          <InterregnumBar key={`gap-${i}`} gap={gap} geometry={geometry} />
        ))}

        {/* Concurrent state bars BELOW the main snake */}
        {props.layers.dynasties && props.data.concurrent.map(c => (
          <ConcurrentBar
            key={c.id}
            item={c}
            geometry={geometry}
            highlighted={props.highlightId === c.id}
            onPick={props.onPick}
            onTooltip={setTooltip}
          />
        ))}

        {/* Main dynasty bars */}
        {props.layers.dynasties && sortedPrimary.map(d => (
          <DynastySegment
            key={d.id}
            dynasty={d}
            geometry={geometry}
            fill={fillById.get(d.id) ?? COLOR.cobalt}
            highlighted={props.highlightId === d.id}
            onPick={props.onPick}
            onTooltip={setTooltip}
            calloutBelow={d.id === 'R_PRC'}
            calloutSide={d.id === 'R_XIN' ? 'right' : undefined}
          />
        ))}

        {/* BCE/CE reference line at year 0. Modern reference, not historical. */}
        <YearZeroMarker geometry={geometry} />

        {/* Dynasty start-year date pills */}
        {props.layers.dynasties && pillLayouts.map(({ dynasty, level }) => (
          <DynastyDatePill key={`date-${dynasty.id}`} year={dynasty.start} level={level} geometry={geometry} />
        ))}

        {/* Figures (above the snake) */}
        {props.layers.figures && props.data.figures.map(f => (
          <FigureMarker
            key={f.id}
            item={f}
            geometry={geometry}
            highlighted={props.highlightId === f.id}
            onPick={props.onPick}
            onTooltip={setTooltip}
          />
        ))}

        {/* Cultural anchors (above the snake) */}
        {props.layers.culture && props.data.culture.map(c => (
          <AnchorMarker
            key={c.id}
            item={c}
            geometry={geometry}
            highlighted={props.highlightId === c.id}
            onPick={props.onPick}
            onTooltip={setTooltip}
          />
        ))}

        {/* Global context (below the snake) */}
        {props.layers.global && props.data.global.map(g => (
          <GlobalMarker
            key={g.id}
            item={g}
            geometry={geometry}
            highlighted={props.highlightId === g.id}
            onPick={props.onPick}
            onTooltip={setTooltip}
          />
        ))}

        {/* Events (placed via collision-avoidance, multiple levels per side) */}
        {props.layers.events && props.data.events.map(e => {
          const placement = eventPlacements.get(e.id);
          if (!placement) return null; // event sits on a bend, skip
          return (
            <EventLabel
              key={e.id}
              item={e}
              geometry={geometry}
              placeAbove={placement.above}
              level={placement.level}
              highlighted={props.highlightId === e.id}
              onPick={props.onPick}
              onTooltip={setTooltip}
            />
          );
        })}
      </svg>
      {tooltip && (
        <div className="tooltip" style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}>
          <div className="tip-title">{tooltip.title}</div>
          <div className="tip-sub">{tooltip.sub}</div>
        </div>
      )}
    </div>
  );
}

// ---------------- Interregnum bar (no central authority) ----------------

const INTERREGNUM_BAR_THICKNESS = 60; // matches BAR_THICKNESS in DynastySegment.tsx

function InterregnumBar({ gap, geometry }: { gap: { start: number; end: number }; geometry: SnakeGeometry }) {
  const d = segmentPath(gap.start, gap.end, geometry);
  if (!d) return null;
  return (
    <g pointerEvents="none" data-testid={`interregnum-${gap.start}-${gap.end}`}>
      <path
        d={d}
        fill="none"
        stroke={COLOR.ruleStrong}
        strokeWidth={INTERREGNUM_BAR_THICKNESS}
        strokeLinecap="butt"
        opacity={0.55}
      />
      <path
        d={d}
        fill="none"
        stroke={COLOR.ink3}
        strokeWidth={INTERREGNUM_BAR_THICKNESS}
        strokeLinecap="butt"
        strokeDasharray="3 4"
        opacity={0.18}
      />
    </g>
  );
}

// ---------------- Concurrent state bar ----------------

interface ConcurrentBarProps {
  item: NormalizedSpanItem;
  geometry: SnakeGeometry;
  highlighted: boolean;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onTooltip: (payload: TooltipPayload | null) => void;
}

function ConcurrentBar({ item, geometry, highlighted, onPick, onTooltip }: ConcurrentBarProps) {
  const lane = (item.sourceLane === 'north' || item.sourceLane === 'west' || item.sourceLane === 'south')
    ? item.sourceLane
    : 'north';
  const offset = CONC_LANE_OFFSETS[lane];
  const d = segmentPath(item.start, item.end, geometry, offset);
  if (!d) return null;

  const tooltipBody = `${fmtRange(item.start, item.end)}${item.summary ? ` — ${item.summary}` : ''}`;
  const midYear = (item.start + item.end) / 2;
  const mid = yearToPoint(midYear, geometry);
  const labelY = mid.y + offset;
  const fits = item.name.length * 8.5 < Math.abs(yearToDistance(item.end, geometry) - yearToDistance(item.start, geometry));

  return (
    <g
      style={{ cursor: 'pointer' }}
      data-testid={`concurrent-${item.id}`}
      onClick={(ev) => { ev.stopPropagation(); onPick(item.id, 'concurrent'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: item.name, sub: tooltipBody })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: item.name, sub: tooltipBody })}
      onMouseLeave={() => onTooltip(null)}
    >
      <path
        d={d}
        fill="none"
        stroke={COLOR.parchment2}
        strokeWidth={CONC_BAR_THICKNESS}
        strokeLinecap="butt"
      />
      <path
        d={d}
        fill="none"
        stroke={COLOR.sepia}
        strokeWidth={1.2}
        strokeLinecap="butt"
        strokeDasharray="0"
        opacity={0.85}
      />
      {fits && (
        <text
          x={mid.x}
          y={labelY}
          fill={COLOR.sepia}
          fontFamily="'Spectral', serif"
          fontSize={13}
          fontStyle="italic"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ pointerEvents: 'none' }}
        >
          {item.name}
        </text>
      )}
      {highlighted && (
        <path
          d={d}
          fill="none"
          stroke={COLOR.indigo}
          strokeWidth={CONC_BAR_THICKNESS + 4}
          strokeOpacity={0.4}
          strokeDasharray="3 3"
          pointerEvents="none"
        />
      )}
    </g>
  );
}

// ---------------- BCE / CE reference line at year 0 ----------------

// Modern reference, not a historical event. The Gregorian calendar's BCE/CE
// boundary is a backwards-projected frame: nobody in Han China called this
// year 0. The marker exists only to help a modern reader orient on a 4000-yr
// chart. There is no actual "year 0" in the Gregorian calendar (it skips from
// 1 BCE to 1 CE), but the chart's time scale is continuous, so position 0 is
// well-defined as the boundary. The label reads "BCE | CE" rather than "0" so
// the viewer parses it as a divider rather than a date.
function YearZeroMarker({ geometry }: { geometry: SnakeGeometry }) {
  const point = yearToPoint(0, geometry);
  // If the boundary somehow lands on a bend (unlikely for the current row
  // breakpoints; year 0 falls deep inside Western Han on row 2), suppress
  // rather than draw a slanted reference line. Reference lines that aren't
  // perpendicular to the bar read as glitches.
  if (Math.abs(point.tangent.x) < 0.9) return null;

  const lineExtend = 70;  // px above and below bar centerline
  const labelOffset = lineExtend + 6;

  return (
    <g pointerEvents="none" data-testid="year-zero-marker">
      <line
        x1={point.x}
        y1={point.y - lineExtend}
        x2={point.x}
        y2={point.y + lineExtend}
        stroke={COLOR.sepia}
        strokeWidth={1.4}
        opacity={0.6}
        strokeDasharray="4 3"
      />
      <text
        x={point.x}
        y={point.y - labelOffset}
        fill={COLOR.sepia}
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontSize={10}
        fontWeight={500}
        textAnchor="middle"
        letterSpacing={1.4}
        opacity={0.9}
        style={{ textTransform: 'uppercase' }}
      >
        BCE | CE
      </text>
    </g>
  );
}

// ---------------- Date-pill stacking ----------------

interface PillLayout {
  dynasty: NormalizedSpanItem;
  level: number;
}

// Greedy interval-painting: sort pills left to right, place each one in the
// lowest level whose existing pills don't horizontally overlap it. Pills on
// different rows of the snake don't conflict because their y-positions differ
// by far more than a pill height.
function assignPillLevels(
  dynasties: ReadonlyArray<NormalizedSpanItem>,
  geometry: SnakeGeometry,
): PillLayout[] {
  const PILL_HORIZONTAL_GAP = 4;
  // Each entry tracks {y, rightEdge} for the rightmost pill at that level.
  // We compare rows by y because two pills on different rows never visually
  // collide even at the same x.
  type Slot = { y: number; rightEdge: number };
  const levels: Slot[][] = [];

  const sorted = [...dynasties].sort((a, b) => a.start - b.start);
  const out: PillLayout[] = [];

  for (const d of sorted) {
    const point = yearToPoint(d.start, geometry);
    const onCurve = Math.abs(point.tangent.x) < 0.5;
    if (onCurve) {
      // Pill is suppressed at render time; assign level 0 and skip slot bookkeeping.
      out.push({ dynasty: d, level: 0 });
      continue;
    }
    const text = d.start < 0 ? `${Math.abs(d.start)} BCE` : `${d.start}`;
    const halfWidth = pillWidthFor(text) / 2;
    const left = point.x - halfWidth;
    const right = point.x + halfWidth;

    let level = 0;
    while (level < levels.length) {
      const conflicts = levels[level].some(
        (slot) => Math.abs(slot.y - point.y) < 4 && slot.rightEdge + PILL_HORIZONTAL_GAP > left,
      );
      if (!conflicts) break;
      level++;
    }
    if (level >= levels.length) levels.push([]);
    levels[level].push({ y: point.y, rightEdge: right });
    out.push({ dynasty: d, level });
  }
  return out;
}

// ---------------- Dynasty start-year date pill ----------------

// Pivotal unification / regime-change years that get visual emphasis: bigger,
// vermillion-on-white, with a label underneath. Empty for now — the previous
// 221 BCE callout sat on top of the QIN bar (Qin is short and lands on the
// left bend, so there's no clean place for a callout above it). Re-enable
// once we have a non-blocking placement (e.g. side-pinned, or only when zoom
// is high enough that the bend region is large).
const HIGHLIGHTED_YEARS: Record<number, string> = {};

interface DatePillProps {
  year: number;
  geometry: SnakeGeometry;
  level?: number;  // 0 = default below-bar slot; 1+ = stacked further down
}

const PILL_HEIGHT = 22;
const PILL_FONT_SIZE = 13;
const PILL_VERTICAL_GAP = 3;
const PILL_BASE_OFFSET = 44;  // distance from bar centerline to top of level-0 pill (leaves room for the leader line)
const PILL_LEADER_GAP = 2;    // tiny gap between leader end and pill top so they don't visually merge
const BAR_BOTTOM_FROM_CENTERLINE = 30;  // matches BAR_HALF_THICKNESS in DynastySegment

function pillWidthFor(text: string): number {
  return text.length * 7.4 + 12;
}

function DynastyDatePill({ year, geometry, level = 0 }: DatePillProps) {
  const point = yearToPoint(year, geometry);
  const onCurve = Math.abs(point.tangent.x) < 0.5;
  const isHighlighted = HIGHLIGHTED_YEARS[year] !== undefined;
  // Highlighted pills render even on bends (we'll callout them with a leader).
  if (onCurve && !isHighlighted) return null;

  const yearText = year < 0 ? `${Math.abs(year)} BCE` : `${year}`;

  if (isHighlighted) {
    return <HighlightedDatePill year={year} point={point} text={yearText} label={HIGHLIGHTED_YEARS[year]} />;
  }

  const pillWidth = pillWidthFor(yearText);
  const pillHeight = PILL_HEIGHT;
  const yTop = point.y + PILL_BASE_OFFSET + level * (PILL_HEIGHT + PILL_VERTICAL_GAP);
  // Leader line anchors the pill to the exact start-year boundary on the bar.
  // Without it, pills near a row break (e.g. Southern Song's 1127 dropping
  // close to Yuan on the next row) read as labeling the wrong dynasty.
  const leaderTopY = point.y + BAR_BOTTOM_FROM_CENTERLINE;
  const leaderBottomY = yTop - PILL_LEADER_GAP;

  return (
    <g pointerEvents="none">
      <line
        x1={point.x}
        y1={leaderTopY}
        x2={point.x}
        y2={leaderBottomY}
        stroke={COLOR.sepia}
        strokeWidth={1.2}
        opacity={0.7}
      />
      <rect
        x={point.x - pillWidth / 2}
        y={yTop}
        width={pillWidth}
        height={pillHeight}
        rx={3}
        fill={COLOR.gold}
        opacity={0.92}
        stroke={COLOR.ink2}
        strokeWidth={0.5}
      />
      <text
        x={point.x}
        y={yTop + pillHeight / 2 + 1}
        fill={COLOR.ink}
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontSize={PILL_FONT_SIZE}
        fontWeight={600}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {yearText}
      </text>
    </g>
  );
}

interface HighlightedDatePillProps {
  year: number;
  point: { x: number; y: number; tangent: { x: number; y: number } };
  text: string;
  label: string;
}

function HighlightedDatePill({ point, text, label }: HighlightedDatePillProps) {
  // Sit ABOVE the bar with a short leader so the highlight stands above the
  // regular gold pills (which sit below). Bigger, vermillion-on-white,
  // two lines (year on top, plain-English label underneath).
  const pillWidth = Math.max(text.length, label.length) * 7.2 + 16;
  const pillHeight = 36;
  const yTop = point.y - 32 - 24 - pillHeight;  // 32 (bar half) + 24 (leader) + pill
  const leaderTopY = yTop + pillHeight;
  const leaderBottomY = point.y - 32;

  return (
    <g pointerEvents="none">
      <line
        x1={point.x}
        y1={leaderBottomY}
        x2={point.x}
        y2={leaderTopY}
        stroke={COLOR.vermillion}
        strokeWidth={1.2}
      />
      <rect
        x={point.x - pillWidth / 2}
        y={yTop}
        width={pillWidth}
        height={pillHeight}
        rx={3}
        fill="white"
        stroke={COLOR.vermillion}
        strokeWidth={1.4}
      />
      <text
        x={point.x}
        y={yTop + 14}
        fill={COLOR.vermillion}
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontSize={13}
        fontWeight={700}
        textAnchor="middle"
      >
        {text}
      </text>
      <text
        x={point.x}
        y={yTop + 28}
        fill={COLOR.ink}
        fontFamily="'Spectral', serif"
        fontSize={11}
        fontStyle="italic"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

// ---------------- Event label with connector line ----------------

interface EventLabelProps {
  item: NormalizedPointItem;
  geometry: SnakeGeometry;
  placeAbove: boolean;
  level: number;
  highlighted: boolean;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onTooltip: (payload: TooltipPayload | null) => void;
}

function EventLabel({ item, geometry, placeAbove, level, highlighted, onPick, onTooltip }: EventLabelProps) {
  const point = yearToPoint(item.year, geometry);
  // Skip events that fall on a curve — they're hard to place cleanly.
  if (Math.abs(point.tangent.x) < 0.5) return null;

  const dir = placeAbove ? -1 : 1;
  const baseOffset = placeAbove ? EVENT_LABEL_OFFSET_ABOVE : EVENT_LABEL_OFFSET_BELOW;
  const leaderEndY = point.y + dir * (baseOffset + level * EVENT_LABEL_LEVEL_STEP);
  const labelY = leaderEndY + dir * 4;
  const labelText = item.name.length > 28 ? `${item.name.slice(0, 26)}…` : item.name;
  const labelWidth = Math.min(220, labelText.length * 7.2 + 14);
  const baseLine = placeAbove ? labelY - 18 : labelY;
  const tooltipBody = `${fmtYear(item.year)}${item.summary ? ` — ${item.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      data-testid={`event-${item.id}`}
      onClick={(ev) => { ev.stopPropagation(); onPick(item.id, 'event'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: item.name, sub: tooltipBody })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: item.name, sub: tooltipBody })}
      onMouseLeave={() => onTooltip(null)}
    >
      <line
        x1={point.x}
        y1={point.y + dir * 32}
        x2={point.x}
        y2={leaderEndY}
        stroke={COLOR.ink3}
        strokeWidth={0.6}
      />
      <circle
        cx={point.x}
        cy={leaderEndY}
        r={2}
        fill={COLOR.ink}
      />
      <rect
        x={point.x - labelWidth / 2}
        y={baseLine}
        width={labelWidth}
        height={20}
        fill="white"
        stroke={highlighted ? COLOR.indigo : COLOR.ruleStrong}
        strokeWidth={highlighted ? 1.2 : 0.5}
        rx={2}
      />
      <text
        x={point.x}
        y={baseLine + 14}
        fill={COLOR.ink}
        fontFamily="'Spectral', serif"
        fontSize={13}
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
      >
        {labelText}
      </text>
    </g>
  );
}

// ---------------- Figure marker (above the snake) ----------------

interface MarkerProps {
  item: NormalizedPointItem;
  geometry: SnakeGeometry;
  highlighted: boolean;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onTooltip: (payload: TooltipPayload | null) => void;
}

function FigureMarker({ item, geometry, highlighted, onPick, onTooltip }: MarkerProps) {
  // Some figures (e.g. Yu the Great, year -2100) sit before the snake's
  // year range. Clamp to the snake bounds for VISUAL placement so the
  // marker sits at the start of its parent dynasty instead of floating off
  // the canvas edge. The tooltip still shows the actual legendary date.
  const clampedYear = Math.max(geometry.yearMin, Math.min(geometry.yearMax, item.year));
  const point = yearToPoint(clampedYear, geometry);
  if (Math.abs(point.tangent.x) < 0.5) return null;

  const y = point.y - FIGURE_OFFSET_ABOVE;
  const tooltipBody = `${fmtYear(item.year)}${item.summary ? ` — ${item.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      data-testid={`figure-${item.id}`}
      onClick={(ev) => { ev.stopPropagation(); onPick(item.id, 'figure'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: item.name, sub: tooltipBody })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: item.name, sub: tooltipBody })}
      onMouseLeave={() => onTooltip(null)}
    >
      <line
        x1={point.x}
        y1={point.y - 32}
        x2={point.x}
        y2={y + 6}
        stroke={COLOR.indigo}
        strokeWidth={0.6}
        strokeDasharray="2 2"
      />
      <polygon
        points={`${point.x},${y - 8} ${point.x + 8},${y} ${point.x},${y + 8} ${point.x - 8},${y}`}
        fill={COLOR.indigo}
        stroke={highlighted ? COLOR.ink : COLOR.parchment}
        strokeWidth={highlighted ? 1.5 : 1}
      />
      <text
        x={point.x + 12}
        y={y + 5}
        fill={COLOR.indigo}
        fontFamily="'Spectral', serif"
        fontSize={15}
        fontStyle="italic"
        style={{ pointerEvents: 'none' }}
      >
        {item.name}
      </text>
    </g>
  );
}

// ---------------- Cultural anchor (below the snake, square marker) ----------------

function AnchorMarker({ item, geometry, highlighted, onPick, onTooltip }: MarkerProps) {
  const point = yearToPoint(item.year, geometry);
  if (Math.abs(point.tangent.x) < 0.5) return null;

  const y = point.y + ANCHOR_OFFSET_BELOW;
  const tooltipBody = `${fmtYear(item.year)}${item.summary ? ` — ${item.summary}` : ''}`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      data-testid={`culture-${item.id}`}
      onClick={(ev) => { ev.stopPropagation(); onPick(item.id, 'culture'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: item.name, sub: tooltipBody })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: item.name, sub: tooltipBody })}
      onMouseLeave={() => onTooltip(null)}
    >
      <line
        x1={point.x}
        y1={point.y + 32}
        x2={point.x}
        y2={y - 6}
        stroke={COLOR.gold}
        strokeWidth={0.6}
        strokeDasharray="2 2"
      />
      <rect
        x={point.x - 7}
        y={y - 7}
        width={14}
        height={14}
        fill={COLOR.gold}
        stroke={highlighted ? COLOR.ink : COLOR.ink2}
        strokeWidth={highlighted ? 1.4 : 0.8}
      />
      <text
        x={point.x + 12}
        y={y + 5}
        fill={COLOR.ink}
        fontFamily="'Spectral', serif"
        fontSize={14}
        style={{ pointerEvents: 'none' }}
      >
        {item.name.length > 30 ? `${item.name.slice(0, 28)}…` : item.name}
      </text>
    </g>
  );
}

// ---------------- Global context (below the snake, outlined box) ----------------

function GlobalMarker({ item, geometry, highlighted, onPick, onTooltip }: MarkerProps) {
  const point = yearToPoint(item.year, geometry);
  if (Math.abs(point.tangent.x) < 0.5) return null;

  const y = point.y + GLOBAL_OFFSET_BELOW;
  const tooltipBody = `${fmtYear(item.year)}${item.summary ? ` — ${item.summary}` : ''}`;
  const labelText = item.name.length > 24 ? `${item.name.slice(0, 22)}…` : item.name;
  const boxWidth = Math.min(220, labelText.length * 7.4 + 18);

  return (
    <g
      style={{ cursor: 'pointer' }}
      data-testid={`global-${item.id}`}
      onClick={(ev) => { ev.stopPropagation(); onPick(item.id, 'global'); }}
      onMouseEnter={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: `GLOBAL · ${item.name}`, sub: tooltipBody })}
      onMouseMove={(ev) => onTooltip({ x: ev.clientX, y: ev.clientY, title: `GLOBAL · ${item.name}`, sub: tooltipBody })}
      onMouseLeave={() => onTooltip(null)}
    >
      <line
        x1={point.x}
        y1={point.y + 32}
        x2={point.x}
        y2={y - 11}
        stroke={COLOR.jade}
        strokeWidth={0.6}
        strokeDasharray="2 2"
      />
      <rect
        x={point.x - boxWidth / 2}
        y={y - 11}
        width={boxWidth}
        height={22}
        fill="white"
        stroke={highlighted ? COLOR.ink : COLOR.jade}
        strokeWidth={highlighted ? 1.4 : 0.8}
      />
      <text
        x={point.x}
        y={y + 5}
        fill={COLOR.jade}
        fontFamily="'Spectral', serif"
        fontSize={14}
        fontStyle="italic"
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
      >
        {labelText}
      </text>
    </g>
  );
}

// ---------------- Event label placement planner ----------------

interface EventPlacement {
  above: boolean;
  level: number;
}

/**
 * Assign each event to a (side, level) so labels don't overlap. Walks the
 * events in path order and tries side/level combinations from closest to the
 * bar outward, alternating sides at each level. Events on a bend are skipped
 * (no clean perpendicular space).
 */
function planEventLabels(
  events: NormalizedPointItem[],
  geometry: SnakeGeometry,
): Map<string, EventPlacement> {
  const placements = new Map<string, EventPlacement>();
  const items = events
    .map(e => {
      const point = yearToPoint(e.year, geometry);
      if (Math.abs(point.tangent.x) < 0.5) return null;
      const labelText = e.name.length > 28 ? `${e.name.slice(0, 26)}…` : e.name;
      const labelWidth = Math.min(220, labelText.length * 7.2 + 14);
      return { id: e.id, x: point.x, w: labelWidth };
    })
    .filter((x): x is { id: string; x: number; w: number } => x !== null)
    .sort((a, b) => a.x - b.x);

  const occupiedAbove: Array<Array<[number, number]>> = [];
  const occupiedBelow: Array<Array<[number, number]>> = [];
  for (let i = 0; i < EVENT_LABEL_MAX_LEVELS; i++) {
    occupiedAbove.push([]);
    occupiedBelow.push([]);
  }

  function fits(intervals: Array<[number, number]>, x1: number, x2: number): boolean {
    for (const [a, b] of intervals) {
      if (!(b + EVENT_LABEL_X_PADDING < x1 || a > x2 + EVENT_LABEL_X_PADDING)) return false;
    }
    return true;
  }

  for (const item of items) {
    const x1 = item.x - item.w / 2;
    const x2 = item.x + item.w / 2;
    let placed = false;
    for (let level = 0; level < EVENT_LABEL_MAX_LEVELS && !placed; level++) {
      for (const above of [true, false]) {
        const list = above ? occupiedAbove[level] : occupiedBelow[level];
        if (fits(list, x1, x2)) {
          list.push([x1, x2]);
          placements.set(item.id, { above, level });
          placed = true;
          break;
        }
      }
    }
    if (!placed) {
      const lvl = EVENT_LABEL_MAX_LEVELS - 1;
      occupiedBelow[lvl].push([x1, x2]);
      placements.set(item.id, { above: false, level: lvl });
    }
  }

  return placements;
}
