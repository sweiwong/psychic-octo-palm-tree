import { useEffect, useMemo, useRef, useState } from 'react';
import { computeGeometry } from '../../lib/snake-path';
import { COLOR } from '../../lib/colors';
import type { LayerToggles, NormalizedData, SelectedItem } from '../../data/types';
import { SnakeBackbone } from './SnakeBackbone';
import { DynastySegment } from './DynastySegment';
import { dynastyStripeFill } from '../../lib/colors';

const PADDING = 40;
const ROW_COUNT = 4;
const ROW_HEIGHT = 200;
const CANVAS_HEIGHT = ROW_COUNT * ROW_HEIGHT + 2 * PADDING;
const YEAR_MIN = -2070;
const YEAR_MAX = 2026;

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
  const [width, setWidth] = useState(660);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; title: string; sub: string } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = Math.max(400, e.contentRect.width - 4);
        setWidth(w);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const geometry = useMemo(() => computeGeometry({
    width,
    height: CANVAS_HEIGHT,
    padding: PADDING,
    rowCount: ROW_COUNT,
    yearMin: YEAR_MIN,
    yearMax: YEAR_MAX,
  }), [width]);

  const sortedPrimary = useMemo(
    () => [...props.data.primary].sort((a, b) => a.start - b.start),
    [props.data.primary],
  );

  return (
    <div className="canvas-wrap" ref={containerRef}>
      <svg
        className="timeline-svg"
        width={width}
        height={CANVAS_HEIGHT}
        viewBox={`0 0 ${width} ${CANVAS_HEIGHT}`}
        onClick={onClearSelection}
        data-testid="timeline-svg"
      >
        <defs>
          <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLOR.parchment} />
            <stop offset="100%" stopColor={COLOR.parchment2} />
          </linearGradient>
        </defs>
        <SnakeBackbone geometry={geometry} />
        {props.layers.dynasties && sortedPrimary.map((d, idx) => (
          <DynastySegment
            key={d.id}
            dynasty={d}
            geometry={geometry}
            fill={dynastyStripeFill(d.id, idx)}
            highlighted={props.highlightId === d.id}
            onPick={props.onPick}
            onTooltip={setTooltip}
            calloutBelow={d.id === 'R_PRC'}
            calloutSide={d.id === 'R_XIN' ? 'right' : undefined}
          />
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
