// Snake geometry — proportional to time, configurable rows / bend / row-gap.
// Bends are half-ELLIPSES (horizontal radius = bendRadiusX, vertical = rowGap/2)
// so vertical row spacing is independent of bend horizontal size.
// Returns yearToPoint(year), pointAt(L), ribbonPath(geo, yearA, yearB, halfHeight, opts)

window.SnakeGeometry = (function () {
  // Defaults — overridable via build() opts
  const DEFAULTS = {
    rows: 4,
    barHeight: 64,
    bendRadiusX: 80,    // horizontal half-width of each bend
    rowGap: 220,        // vertical centerline-to-centerline distance
  };

  function approxHalfEllipsePerimeter(a, b) {
    // Ramanujan's approximation for full ellipse circumference, halved.
    return (Math.PI / 2) * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
  }

  function build({
    width,
    marginX,
    marginY,
    startYear,
    endYear,
    rows = DEFAULTS.rows,
    barHeight = DEFAULTS.barHeight,
    bendRadiusX = DEFAULTS.bendRadiusX,
    rowGap = DEFAULTS.rowGap,
  }) {
    const innerW = width - marginX * 2;
    const bendRadiusY = rowGap / 2;
    const rowStraight = innerW - bendRadiusX;
    const bendLen = approxHalfEllipsePerimeter(bendRadiusX, bendRadiusY);
    const totalLen = rows * rowStraight + (rows - 1) * bendLen;
    const totalYears = endYear - startYear;
    const pxPerYear = totalLen / totalYears;

    const segments = [];
    let cum = 0;
    for (let r = 0; r < rows; r++) {
      const ltr = r % 2 === 0;
      const y = marginY + r * rowGap;
      const xLeft = marginX;
      const xRight = marginX + innerW;
      const xa = ltr ? xLeft : xRight - bendRadiusX;
      const xb = ltr ? xRight - bendRadiusX : xLeft;
      segments.push({
        kind: "straight",
        startLen: cum,
        endLen: cum + rowStraight,
        y, xa, xb, ltr, row: r,
      });
      cum += rowStraight;
      if (r < rows - 1) {
        const ccx = ltr ? (xRight - bendRadiusX) : xLeft;
        const ccy = y + bendRadiusY;
        segments.push({
          kind: "bend",
          startLen: cum,
          endLen: cum + bendLen,
          cx: ccx, cy: ccy,
          a: bendRadiusX,
          b: bendRadiusY,
          ltr, row: r,
        });
        cum += bendLen;
      }
    }

    function lenAtYear(year) {
      return (year - startYear) * pxPerYear;
    }

    function pointAt(L) {
      L = Math.max(0, Math.min(totalLen, L));
      for (const s of segments) {
        if (L <= s.endLen + 1e-6) {
          const t = (L - s.startLen) / (s.endLen - s.startLen);
          if (s.kind === "straight") {
            const x = s.xa + (s.xb - s.xa) * t;
            const y = s.y;
            const dirX = Math.sign(s.xb - s.xa);
            // Right-of-tangent normal so straight + bend agree at the join.
            return { x, y, tangent: [dirX, 0], normal: [0, dirX], seg: s };
          } else {
            // Half-ellipse bend, parameterized in theta (uniform in t for visual smoothness).
            // LTR: theta from -PI/2 to +PI/2 (sweep clockwise on the right side).
            // RTL: theta from -PI/2 to -3PI/2 (sweep counter-clockwise on the left side).
            const theta = s.ltr ? (-Math.PI / 2 + Math.PI * t) : (-Math.PI / 2 - Math.PI * t);
            const x = s.cx + s.a * Math.cos(theta);
            const y = s.cy + s.b * Math.sin(theta);
            const sgn = s.ltr ? 1 : -1;
            // Unnormalized tangent of ellipse w.r.t theta = (-a sin, b cos)
            // Multiply by sgn to point in direction of travel.
            let tx = -s.a * Math.sin(theta) * sgn;
            let ty = s.b * Math.cos(theta) * sgn;
            const tlen = Math.sqrt(tx * tx + ty * ty) || 1;
            tx /= tlen;
            ty /= tlen;
            // Right-of-tangent normal = rotate tangent by -90° in screen coords -> (-ty, tx).
            const nx = -ty;
            const ny = tx;
            return { x, y, tangent: [tx, ty], normal: [nx, ny], seg: s };
          }
        }
      }
      return null;
    }

    function yearToPoint(year) {
      return pointAt(lenAtYear(year));
    }

    return {
      totalLen, totalYears, startYear, endYear, segments,
      lenAtYear, pointAt, yearToPoint,
      barHeight, bendRadiusX, bendRadiusY, rowGap, rows,
      marginX, marginY, width,
      // Backward-compat aliases for the old preview script:
      BAR_HEIGHT: barHeight,
      BEND_RADIUS: bendRadiusX,
      ROW_GAP: rowGap,
      ROWS: rows,
    };
  }

  function ribbonPath(geo, yearA, yearB, halfHeight, opts = {}) {
    const offset = opts.offset || 0;
    const samplesPerBend = opts.samplesPerBend || 32;
    const La = geo.lenAtYear(yearA);
    const Lb = geo.lenAtYear(yearB);
    if (Math.abs(Lb - La) < 0.5) return "";
    const segs = geo.segments.filter(s => !(s.endLen < La || s.startLen > Lb));

    function sample(L) {
      const p = geo.pointAt(L);
      // Centerline shifted by `offset` in the normal direction.
      const cx = p.x + p.normal[0] * offset;
      const cy = p.y + p.normal[1] * offset;
      const out = { x: cx + p.normal[0] * halfHeight, y: cy + p.normal[1] * halfHeight };
      const inn = { x: cx - p.normal[0] * halfHeight, y: cy - p.normal[1] * halfHeight };
      return { out, inn };
    }

    const outer = [];
    const inner = [];
    for (const s of segs) {
      const a = Math.max(s.startLen, La);
      const b = Math.min(s.endLen, Lb);
      const N = s.kind === "straight" ? 2 : samplesPerBend;
      for (let i = 0; i <= N; i++) {
        const L = a + (b - a) * (i / N);
        const { out, inn } = sample(L);
        outer.push(out);
        inner.push(inn);
      }
    }
    let d = `M ${outer[0].x.toFixed(2)} ${outer[0].y.toFixed(2)}`;
    for (let i = 1; i < outer.length; i++) d += ` L ${outer[i].x.toFixed(2)} ${outer[i].y.toFixed(2)}`;
    for (let i = inner.length - 1; i >= 0; i--) d += ` L ${inner[i].x.toFixed(2)} ${inner[i].y.toFixed(2)}`;
    d += " Z";
    return d;
  }

  return { build, ribbonPath };
})();
