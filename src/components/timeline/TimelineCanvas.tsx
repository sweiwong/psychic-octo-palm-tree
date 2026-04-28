import { useEffect, useMemo, useRef, useState } from 'react';
import { computeGeometry } from '../../lib/snake-path';
import { COLOR } from '../../lib/colors';
import type { LayerToggles, NormalizedData, SelectedItem } from '../../data/types';
import { SnakeBackbone } from './SnakeBackbone';

const PADDING = 40;
const ROW_COUNT = 4;
const YEAR_MIN = -2070;
const YEAR_MAX = 2026;
const MIN_HEIGHT = 600;

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
  const [size, setSize] = useState({ width: 660, height: 700 });

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = Math.max(400, e.contentRect.width - 4);
        const h = Math.max(MIN_HEIGHT, e.contentRect.height - 20);
        setSize({ width: w, height: h });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const geometry = useMemo(() => computeGeometry({
    width: size.width,
    height: size.height,
    padding: PADDING,
    rowCount: ROW_COUNT,
    yearMin: YEAR_MIN,
    yearMax: YEAR_MAX,
  }), [size]);

  return (
    <div className="canvas-wrap" ref={containerRef}>
      <svg
        className="timeline-svg"
        width={size.width}
        height={size.height}
        viewBox={`0 0 ${size.width} ${size.height}`}
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
      </svg>
    </div>
  );
}
