// Timeline canvas — wrapped multi-row SVG renderer.

const { useState: useStateTL, useMemo: useMemoTL, useRef: useRefTL, useEffect: useEffectTL } = React;

function TimelineCanvas({
  data,
  layers,
  zoom,
  mode,
  highlightId,
  onPick,
  expandedRow,
  onToggleExpandRow,
}) {
  const containerRef = useRefTL(null);
  const [containerW, setContainerW] = useStateTL(1200);
  const [tooltip, setTooltip] = useStateTL(null); // {x,y,title,sub}

  useEffectTL(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) setContainerW(e.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const rows = LAYOUT.rowsFor();
  const innerW = Math.max(800, containerW - 4) * zoom;
  const trackW = innerW - ROW_PADDING_X * 2;

  // Vertical layout
  const rowH = ROW_HEIGHT_BASE * (mode === "detailed" ? 1.0 : 0.78);
  const totalH = rows.length * rowH + (rows.length - 1) * ROW_GAP + 40;

  // Helpers ----------------------------------------------------------------
  const xFor = (frac) => ROW_PADDING_X + frac * trackW;
  const rowYCenter = (rIdx) => 24 + rIdx * (rowH + ROW_GAP) + rowH / 2;

  // Show a row only if it's the expanded one, OR no expansion is active
  const visibleRows = expandedRow == null ? rows : rows.filter(r => r.index === expandedRow);

  // ---------- Renderers ----------
  function renderRowFrame(r) {
    const yCenter = rowYCenter(rows.indexOf(r));
    const yTop = yCenter - rowH / 2 + 4;
    const yBot = yCenter + rowH / 2 - 4;

    // gridlines (vertical year ticks)
    const ticks = LAYOUT.ticksFor(r);

    return (
      <g key={`frame-${r.index}`}>
        {/* row backdrop */}
        <rect
          x={ROW_PADDING_X - 24} y={yTop - 6}
          width={trackW + 48} height={yBot - yTop + 12}
          rx={4}
          fill="url(#paperGrad)"
          stroke={COLOR.rule}
          strokeWidth="0.6"
        />
        {/* row label band on the left edge */}
        <rect
          x={ROW_PADDING_X - 24} y={yTop - 6}
          width={20} height={yBot - yTop + 12}
          fill={COLOR.parchment2}
          stroke={COLOR.rule}
          strokeWidth="0.6"
        />
        <text
          x={ROW_PADDING_X - 14}
          y={yCenter}
          fill={COLOR.ink2}
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9.5"
          textAnchor="middle"
          transform={`rotate(-90 ${ROW_PADDING_X - 14} ${yCenter})`}
          letterSpacing="1.5"
        >
          ROW {String(r.index + 1).padStart(2, "0")} · {fmtRange(r.start, r.end)}
        </text>

        {/* gridlines */}
        {ticks.map(y => {
          const frac = (y - r.start) / (r.end - r.start);
          const x = xFor(frac);
          const isCentury = y % 100 === 0;
          return (
            <g key={y}>
              <line
                x1={x} x2={x}
                y1={yTop + 4} y2={yBot - 4}
                stroke={isCentury ? COLOR.rule : COLOR.parchment2}
                strokeWidth={isCentury ? 0.5 : 0.4}
                strokeDasharray={isCentury ? "" : "1 3"}
              />
              <text
                x={x} y={yBot - 6}
                fill={COLOR.ink3}
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontSize="9"
                textAnchor="middle"
              >
                {y < 0 ? Math.abs(y) : y}{y < 0 ? " BCE" : ""}
              </text>
            </g>
          );
        })}

        {/* center main-lane baseline */}
        <line
          x1={ROW_PADDING_X} x2={ROW_PADDING_X + trackW}
          y1={yCenter} y2={yCenter}
          stroke={COLOR.ruleStrong}
          strokeWidth="0.6"
        />

        {/* row expand toggle */}
        <foreignObject x={ROW_PADDING_X + trackW + 6} y={yTop - 4} width={26} height={26}>
          <button
            className="row-expand"
            title={expandedRow === r.index ? "Collapse" : "Expand row"}
            onClick={(e) => { e.stopPropagation(); onToggleExpandRow(r.index); }}
          >
            {expandedRow === r.index ? "↺" : "⤢"}
          </button>
        </foreignObject>
      </g>
    );
  }

  function renderDynasty(d, kind) {
    if (kind === "primary" && !layers.dynasties) return null;
    if (kind === "concurrent" && !layers.dynasties) return null;
    const segs = LAYOUT.clipRange(d.start, d.end);
    const isPrimary = kind === "primary";
    const fill = isPrimary ? dynastyFill(d.importance) : "white";
    const stroke = isPrimary ? "none" : COLOR.sepia;
    const h = isPrimary ? MAIN_BAR_H : CONC_BAR_H;
    const laneOffset = isPrimary ? 0 : LANE_OFFSETS[d.lane] || LANE_OFFSETS.above;

    return segs.map((s, i) => {
      const r = rows[s.rowIndex];
      if (expandedRow != null && r.index !== expandedRow) return null;
      const yC = rowYCenter(rows.indexOf(r));
      const x0 = xFor(s.x0);
      const x1 = xFor(s.x1);
      const w = Math.max(2, x1 - x0);
      const y = yC + laneOffset - h / 2;
      const isHi = highlightId === d.id;

      // arrow caps for primary: chevron on the trailing/leading edge if not at row boundary
      const capRadius = isPrimary ? h / 2 : h / 2;

      return (
        <g
          key={`${d.id}-seg-${i}`}
          className={"dynasty-seg" + (isHi ? " highlighted" : "")}
          onClick={(e) => { e.stopPropagation(); onPick({ ...d, kind: isPrimary ? "dynasty" : "concurrent" }); }}
          onMouseEnter={(e) => setTooltip({
            x: e.clientX, y: e.clientY,
            title: d.name,
            sub: fmtRange(d.start, d.end) + (d.summary ? ` — ${d.summary}` : ""),
          })}
          onMouseMove={(e) => setTooltip(t => t ? { ...t, x: e.clientX, y: e.clientY } : null)}
          onMouseLeave={() => setTooltip(null)}
          style={{ cursor: "pointer" }}
        >
          <rect
            x={x0} y={y}
            width={w} height={h}
            rx={capRadius} ry={capRadius}
            fill={fill}
            stroke={stroke}
            strokeWidth={isPrimary ? 0 : 1.2}
            opacity={isPrimary ? 1 : 0.92}
          />
          {/* serif name centered, only if width allows */}
          {w > 60 && (
            <text
              x={x0 + w / 2} y={y + h / 2 + (isPrimary ? 5 : 4)}
              fill={isPrimary ? "white" : COLOR.sepia}
              fontFamily="'Spectral', 'Cormorant Garamond', serif"
              fontSize={isPrimary ? 14 : 11}
              fontWeight={isPrimary ? 600 : 500}
              textAnchor="middle"
              letterSpacing={isPrimary ? "1.4" : "0.6"}
              style={{ textTransform: isPrimary ? "uppercase" : "none", pointerEvents: "none" }}
            >
              {d.name}
            </text>
          )}
          {/* start/end year tag — only on the actual start/end edge */}
          {s.isStart && (
            <g pointerEvents="none">
              <rect
                x={x0 - 1} y={y + h + 3}
                width={42} height={13} rx={2}
                fill={COLOR.parchment2} stroke={COLOR.ruleStrong} strokeWidth="0.5"
              />
              <text
                x={x0 + 20} y={y + h + 12}
                fill={COLOR.ink}
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontSize="8.5" textAnchor="middle"
              >
                {d.start < 0 ? Math.abs(d.start) + " BCE" : d.start}
              </text>
            </g>
          )}
          {isHi && (
            <rect
              x={x0 - 3} y={y - 3}
              width={w + 6} height={h + 6}
              rx={capRadius + 3}
              fill="none" stroke={COLOR.indigo} strokeWidth="1.2"
              strokeDasharray="3 3"
              pointerEvents="none"
            />
          )}
        </g>
      );
    });
  }

  function renderEvent(e) {
    if (!layers.events) return null;
    const loc = LAYOUT.locate(e.year);
    const r = rows[loc.rowIndex];
    if (expandedRow != null && r.index !== expandedRow) return null;
    const yC = rowYCenter(rows.indexOf(r));
    const x = xFor(loc.frac);
    const y = yC + EVENT_Y;
    const isHi = highlightId === e.id;
    const radius = (e.importance >= 5 ? 5 : 4);
    return (
      <g
        key={e.id}
        onClick={(ev) => { ev.stopPropagation(); onPick({ ...e, kind: "event" }); }}
        onMouseEnter={(ev) => setTooltip({ x: ev.clientX, y: ev.clientY, title: e.title, sub: fmtYear(e.year) + (e.blurb ? " — " + e.blurb : "") })}
        onMouseMove={(ev) => setTooltip(t => t ? { ...t, x: ev.clientX, y: ev.clientY } : null)}
        onMouseLeave={() => setTooltip(null)}
        style={{ cursor: "pointer" }}
      >
        <line x1={x} x2={x} y1={yC + 22} y2={y - radius - 1} stroke={COLOR.ruleStrong} strokeWidth="0.5" />
        <circle cx={x} cy={y} r={radius} fill={COLOR.ink} stroke={COLOR.parchment} strokeWidth="1.2" />
        {(mode === "detailed" || isHi) && (
          <text
            x={x + radius + 4} y={y + 3}
            fill={COLOR.ink}
            fontFamily="'Spectral', serif"
            fontSize="10.5"
            style={{ pointerEvents: "none" }}
          >
            {e.title.length > 28 ? e.title.slice(0, 26) + "…" : e.title}
          </text>
        )}
      </g>
    );
  }

  function renderFigure(f) {
    if (!layers.figures) return null;
    const loc = LAYOUT.locate(f.year);
    const r = rows[loc.rowIndex];
    if (expandedRow != null && r.index !== expandedRow) return null;
    const yC = rowYCenter(rows.indexOf(r));
    const x = xFor(loc.frac);
    const y = yC + EVENT_Y - 18;
    return (
      <g
        key={f.id}
        onClick={(ev) => { ev.stopPropagation(); onPick({ ...f, kind: "figure" }); }}
        onMouseEnter={(ev) => setTooltip({ x: ev.clientX, y: ev.clientY, title: f.title, sub: fmtYear(f.year) + (f.blurb ? " — " + f.blurb : "") })}
        onMouseMove={(ev) => setTooltip(t => t ? { ...t, x: ev.clientX, y: ev.clientY } : null)}
        onMouseLeave={() => setTooltip(null)}
        style={{ cursor: "pointer" }}
      >
        <polygon
          points={`${x},${y - 5} ${x + 5},${y} ${x},${y + 5} ${x - 5},${y}`}
          fill={COLOR.indigo} stroke={COLOR.parchment} strokeWidth="1"
        />
        {mode === "detailed" && (
          <text
            x={x + 8} y={y + 3}
            fill={COLOR.indigo}
            fontFamily="'Spectral', serif"
            fontSize="10"
            fontStyle="italic"
            style={{ pointerEvents: "none" }}
          >
            {f.title}
          </text>
        )}
      </g>
    );
  }

  function renderCulture(c) {
    if (!layers.culture) return null;
    if (c.year == null) return null;
    const loc = LAYOUT.locate(c.year);
    const r = rows[loc.rowIndex];
    if (expandedRow != null && r.index !== expandedRow) return null;
    const yC = rowYCenter(rows.indexOf(r));
    const x = xFor(loc.frac);
    const y = yC + CULTURE_Y;
    return (
      <g
        key={c.id}
        onClick={(ev) => { ev.stopPropagation(); onPick({ ...c, kind: "culture" }); }}
        onMouseEnter={(ev) => setTooltip({ x: ev.clientX, y: ev.clientY, title: c.title, sub: fmtYear(c.year) + (c.blurb ? " — " + c.blurb : "") })}
        onMouseMove={(ev) => setTooltip(t => t ? { ...t, x: ev.clientX, y: ev.clientY } : null)}
        onMouseLeave={() => setTooltip(null)}
        style={{ cursor: "pointer" }}
      >
        <line x1={x} x2={x} y1={y + 6} y2={yC - 22} stroke={COLOR.ruleStrong} strokeWidth="0.5" strokeDasharray="2 2" />
        <rect x={x - 5} y={y - 5} width={10} height={10} fill={COLOR.gold} stroke={COLOR.ink} strokeWidth="0.8" />
        {mode === "detailed" && (
          <text
            x={x + 8} y={y + 3}
            fill={COLOR.ink}
            fontFamily="'Spectral', serif"
            fontSize="10"
            style={{ pointerEvents: "none" }}
          >
            {c.title.length > 28 ? c.title.slice(0, 26) + "…" : c.title}
          </text>
        )}
      </g>
    );
  }

  function renderInvention(inv) {
    if (!layers.inventions) return null;
    const loc = LAYOUT.locate(inv.year);
    const r = rows[loc.rowIndex];
    if (expandedRow != null && r.index !== expandedRow) return null;
    const yC = rowYCenter(rows.indexOf(r));
    const x = xFor(loc.frac);
    const y = yC + CULTURE_Y - 18;
    return (
      <g
        key={inv.id}
        onClick={(ev) => { ev.stopPropagation(); onPick({ ...inv, kind: "invention" }); }}
        onMouseEnter={(ev) => setTooltip({ x: ev.clientX, y: ev.clientY, title: inv.title, sub: fmtYear(inv.year) + (inv.blurb ? " — " + inv.blurb : "") })}
        onMouseMove={(ev) => setTooltip(t => t ? { ...t, x: ev.clientX, y: ev.clientY } : null)}
        onMouseLeave={() => setTooltip(null)}
        style={{ cursor: "pointer" }}
      >
        <rect x={x - 5} y={y - 5} width={10} height={10} fill="white" stroke={COLOR.jade} strokeWidth="1.4" />
        <line x1={x - 3} x2={x + 3} y1={y} y2={y} stroke={COLOR.jade} strokeWidth="1" />
        <line x1={x} x2={x} y1={y - 3} y2={y + 3} stroke={COLOR.jade} strokeWidth="1" />
      </g>
    );
  }

  function renderGlobal(g) {
    if (!layers.global) return null;
    const loc = LAYOUT.locate(g.year);
    const r = rows[loc.rowIndex];
    if (expandedRow != null && r.index !== expandedRow) return null;
    const yC = rowYCenter(rows.indexOf(r));
    const x = xFor(loc.frac);
    const yBot = yC + rowH / 2 - 22;
    return (
      <g
        key={g.id}
        onClick={(ev) => { ev.stopPropagation(); onPick({ ...g, kind: "global" }); }}
        onMouseEnter={(ev) => setTooltip({ x: ev.clientX, y: ev.clientY, title: "GLOBAL · " + g.title, sub: fmtYear(g.year) + (g.blurb ? " — " + g.blurb : "") })}
        onMouseMove={(ev) => setTooltip(t => t ? { ...t, x: ev.clientX, y: ev.clientY } : null)}
        onMouseLeave={() => setTooltip(null)}
        style={{ cursor: "pointer" }}
      >
        <rect x={x - 38} y={yBot - 14} width={76} height={14} fill="white" stroke={COLOR.indigo} strokeWidth="0.8" />
        <text
          x={x} y={yBot - 4}
          fill={COLOR.indigo}
          fontFamily="'Spectral', serif"
          fontSize="9"
          fontStyle="italic"
          textAnchor="middle"
          style={{ pointerEvents: "none" }}
        >
          {g.title.length > 16 ? g.title.slice(0, 15) + "…" : g.title}
        </text>
      </g>
    );
  }

  // System era bands — render as faint vertical washes behind everything in each row
  function renderSystemBand(s, idx) {
    const segs = LAYOUT.clipRange(s.start, s.end);
    return segs.map((seg, i) => {
      const r = rows[seg.rowIndex];
      if (expandedRow != null && r.index !== expandedRow) return null;
      const yC = rowYCenter(rows.indexOf(r));
      const x0 = xFor(seg.x0);
      const x1 = xFor(seg.x1);
      const yTop = yC - rowH / 2 + 22;
      const bandH = rowH - 44;
      const palette = ["oklch(0.93 0.03 65)", "oklch(0.92 0.03 95)", "oklch(0.92 0.025 175)", "oklch(0.93 0.03 30)", "oklch(0.92 0.03 290)"];
      return (
        <g key={`${s.id}-${i}`} pointerEvents="none">
          <rect x={x0} y={yTop} width={x1 - x0} height={bandH} fill={palette[idx % palette.length]} opacity="0.35" />
          {seg.isStart && x1 - x0 > 80 && (
            <text
              x={x0 + 6} y={yTop + 12}
              fill={COLOR.ink2}
              fontFamily="'Spectral', serif" fontStyle="italic"
              fontSize="10" letterSpacing="0.4"
            >
              {s.name}
            </text>
          )}
        </g>
      );
    });
  }

  return (
    <div className="canvas-wrap" ref={containerRef}>
      <svg
        className="timeline-svg"
        width={innerW}
        height={expandedRow != null ? rowH + 60 : totalH}
        viewBox={`0 0 ${innerW} ${expandedRow != null ? rowH + 60 : totalH}`}
        onClick={() => onPick(null)}
      >
        <defs>
          <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLOR.parchment} />
            <stop offset="100%" stopColor={COLOR.parchment2} />
          </linearGradient>
          <pattern id="paperNoise" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="url(#paperGrad)" />
            <circle cx="6" cy="11" r="0.4" fill={COLOR.ruleStrong} opacity="0.15" />
            <circle cx="22" cy="28" r="0.3" fill={COLOR.ruleStrong} opacity="0.12" />
            <circle cx="33" cy="6" r="0.3" fill={COLOR.ruleStrong} opacity="0.10" />
          </pattern>
        </defs>

        {/* If expanded mode is active, only render that one row's frame */}
        {visibleRows.map(r => renderRowFrame(r))}

        {/* System bands behind */}
        {layers.dynasties && (data.systems || []).map((s, idx) => renderSystemBand(s, idx))}

        {/* Concurrent first (behind primary) */}
        {data.concurrent.map(d => renderDynasty(d, "concurrent"))}

        {/* Primary */}
        {data.primary.map(d => renderDynasty(d, "primary"))}

        {/* Markers */}
        {data.events.map(e => renderEvent(e))}
        {data.figures.map(f => renderFigure(f))}
        {data.culture.map(c => renderCulture(c))}
        {data.inventions.map(i => renderInvention(i))}
        {data.global.map(g => renderGlobal(g))}
      </svg>

      {tooltip && (
        <div
          className="tooltip"
          style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}
        >
          <div className="tip-title">{tooltip.title}</div>
          <div className="tip-sub">{tooltip.sub}</div>
        </div>
      )}
    </div>
  );
}

window.TimelineCanvas = TimelineCanvas;
