import { useEffect, useRef, useState } from 'react';
import { COLOR } from '../../lib/colors';
import { rowsFor } from '../../lib/layout';
import type { LayerToggles, NormalizedData, SelectedItem } from '../../data/types';
import { RowFrame } from './RowFrame';
import { SystemBand } from './SystemBand';
import { DynastyBar, laneOffsetFor } from './DynastyBar';
import {
  EventMarker, FigureMarker, CultureMarker, InventionMarker, GlobalMarker,
} from './Markers';

const ROW_PADDING_X = 56;
const ROW_HEIGHT_BASE = 240;
const ROW_GAP = 28;
const MAIN_BAR_H = 38;
const CONC_BAR_H = 22;

interface TooltipPayload {
  x: number;
  y: number;
  title: string;
  sub: string;
}

interface TimelineCanvasProps {
  data: NormalizedData;
  layers: LayerToggles;
  zoom: number;
  mode: 'overview' | 'detailed';
  highlightId: string | null;
  expandedRow: number | null;
  onPick: (id: string, kind: SelectedItem['kind']) => void;
  onClearSelection: () => void;
  onToggleExpandRow: (rowIndex: number) => void;
}

export function TimelineCanvas(props: TimelineCanvasProps) {
  const {
    data, layers, zoom, mode, highlightId, expandedRow,
    onPick, onClearSelection, onToggleExpandRow,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(1200);
  const [tooltip, setTooltip] = useState<TooltipPayload | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) setContainerW(e.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const rows = rowsFor();
  const innerW = Math.max(800, containerW - 4) * zoom;
  const trackW = innerW - ROW_PADDING_X * 2;
  const rowH = ROW_HEIGHT_BASE * (mode === 'detailed' ? 1.0 : 0.78);
  const totalH = rows.length * rowH + (rows.length - 1) * ROW_GAP + 40;

  const xFor = (frac: number): number => ROW_PADDING_X + frac * trackW;
  const rowYCenter = (rIdx: number): number => 24 + rIdx * (rowH + ROW_GAP) + rowH / 2;

  const visibleRows = expandedRow == null ? rows : rows.filter(r => r.index === expandedRow);

  return (
    <div className="canvas-wrap" ref={containerRef}>
      <svg
        className="timeline-svg"
        width={innerW}
        height={expandedRow != null ? rowH + 60 : totalH}
        viewBox={`0 0 ${innerW} ${expandedRow != null ? rowH + 60 : totalH}`}
        onClick={onClearSelection}
        data-testid="timeline-svg"
      >
        <defs>
          <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLOR.parchment} />
            <stop offset="100%" stopColor={COLOR.parchment2} />
          </linearGradient>
        </defs>

        {/* Row frames */}
        {visibleRows.map(r => (
          <RowFrame
            key={`frame-${r.index}`}
            row={r}
            rowYCenter={rowYCenter(r.index)}
            rowH={rowH}
            trackW={trackW}
            rowPaddingX={ROW_PADDING_X}
            expanded={expandedRow === r.index}
            xFor={xFor}
            onToggleExpand={() => onToggleExpandRow(r.index)}
          />
        ))}

        {/* Era bands behind everything */}
        {layers.dynasties && data.systems.map((s, idx) => (
          <SystemBand
            key={s.id}
            system={s}
            systemIndex={idx}
            rows={rows}
            expandedRow={expandedRow}
            rowYCenter={rowYCenter}
            rowH={rowH}
            xFor={xFor}
          />
        ))}

        {/* Concurrent first (behind primary) */}
        {layers.dynasties && data.concurrent.map(d => (
          <DynastyBar
            key={d.id}
            dynasty={d}
            kind="concurrent"
            rows={rows}
            expandedRow={expandedRow}
            rowYCenter={rowYCenter}
            laneOffset={laneOffsetFor(d.renderLane)}
            mainBarH={MAIN_BAR_H}
            concBarH={CONC_BAR_H}
            highlighted={highlightId === d.id}
            xFor={xFor}
            onPick={onPick}
            onTooltip={setTooltip}
          />
        ))}

        {/* Primary regimes */}
        {layers.dynasties && data.primary.map(d => (
          <DynastyBar
            key={d.id}
            dynasty={d}
            kind="primary"
            rows={rows}
            expandedRow={expandedRow}
            rowYCenter={rowYCenter}
            laneOffset={0}
            mainBarH={MAIN_BAR_H}
            concBarH={CONC_BAR_H}
            highlighted={highlightId === d.id}
            xFor={xFor}
            onPick={onPick}
            onTooltip={setTooltip}
          />
        ))}

        {/* Markers */}
        {layers.events && data.events.map(e => (
          <EventMarker key={e.id} event={e}
            rows={rows} expandedRow={expandedRow} rowYCenter={rowYCenter} rowH={rowH}
            mode={mode} highlightId={highlightId} xFor={xFor}
            onPick={onPick} onTooltip={setTooltip} />
        ))}
        {layers.figures && data.figures.map(f => (
          <FigureMarker key={f.id} figure={f}
            rows={rows} expandedRow={expandedRow} rowYCenter={rowYCenter} rowH={rowH}
            mode={mode} highlightId={highlightId} xFor={xFor}
            onPick={onPick} onTooltip={setTooltip} />
        ))}
        {layers.culture && data.culture.map(c => (
          <CultureMarker key={c.id} culture={c}
            rows={rows} expandedRow={expandedRow} rowYCenter={rowYCenter} rowH={rowH}
            mode={mode} highlightId={highlightId} xFor={xFor}
            onPick={onPick} onTooltip={setTooltip} />
        ))}
        {layers.inventions && data.inventions.map(i => (
          <InventionMarker key={i.id} invention={i}
            rows={rows} expandedRow={expandedRow} rowYCenter={rowYCenter} rowH={rowH}
            mode={mode} highlightId={highlightId} xFor={xFor}
            onPick={onPick} onTooltip={setTooltip} />
        ))}
        {layers.global && data.global.map(g => (
          <GlobalMarker key={g.id} global={g}
            rows={rows} expandedRow={expandedRow} rowYCenter={rowYCenter} rowH={rowH}
            mode={mode} highlightId={highlightId} xFor={xFor}
            onPick={onPick} onTooltip={setTooltip} />
        ))}
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
