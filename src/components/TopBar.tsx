type Mode = 'overview' | 'detailed';

interface TopBarProps {
  zoom: number;
  onZoom: (z: number) => void;
  mode: Mode;
  onMode: (m: Mode) => void;
  onResetView: () => void;
}

export function TopBar({ zoom, onZoom, mode, onMode, onResetView }: TopBarProps) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="seal" aria-hidden>中</div>
        <div className="title-block">
          <div className="title-main">Chinese History Map</div>
          <div className="title-sub">A wrapped timeline atlas · 2070 BCE – 2026 CE</div>
        </div>
      </div>
      <div className="topbar-right">
        <div className="seg" role="tablist" aria-label="View density">
          <button
            className={mode === 'overview' ? 'on' : ''}
            onClick={() => onMode('overview')}
            role="tab"
            aria-selected={mode === 'overview'}
          >
            Overview
          </button>
          <button
            className={mode === 'detailed' ? 'on' : ''}
            onClick={() => onMode('detailed')}
            role="tab"
            aria-selected={mode === 'detailed'}
          >
            Detailed
          </button>
        </div>
        <div className="zoom">
          <button onClick={() => onZoom(Math.max(0.7, zoom - 0.15))} title="Zoom out" aria-label="Zoom out">–</button>
          <span className="zoom-val">{Math.round(zoom * 100)}%</span>
          <button onClick={() => onZoom(Math.min(1.8, zoom + 0.15))} title="Zoom in" aria-label="Zoom in">+</button>
          <button className="reset" onClick={onResetView}>Reset</button>
        </div>
      </div>
    </div>
  );
}
