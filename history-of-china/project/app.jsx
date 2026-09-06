// Top-level app shell — wires data + state, hosts sidebar/canvas/detail.

const { useState: useStateApp, useEffect: useEffectApp, useMemo: useMemoApp } = React;

function App() {
  const [data, setData] = useStateApp(null);
  const [search, setSearch] = useStateApp("");
  const [layers, setLayers] = useStateApp({
    dynasties: true, events: true, figures: true,
    culture: true, inventions: true, global: true, sources: true,
  });
  const [zoom, setZoom] = useStateApp(1);
  const [mode, setMode] = useStateApp("detailed");
  const [selected, setSelected] = useStateApp(null);
  const [expandedRow, setExpandedRow] = useStateApp(null);

  // Load data once
  useEffectApp(() => {
    window.loadHistoryData().then(d => {
      setData(d);
      window.__ERAS = d.systems;
    });
  }, []);

  const counts = useMemoApp(() => {
    if (!data) return {};
    return {
      dynasties: data.primary.length + data.concurrent.length,
      events: data.events.length,
      figures: data.figures.length,
      culture: data.culture.length,
      inventions: data.inventions.length,
      global: data.global.length,
      sources: 0,
    };
  }, [data]);

  // Search results
  const searchResults = useMemoApp(() => {
    if (!data || !search.trim()) return [];
    const q = search.trim().toLowerCase();
    const all = [
      ...data.primary.map(d => ({ ...d, kind: "dynasty", title: d.name })),
      ...data.concurrent.map(d => ({ ...d, kind: "concurrent", title: d.name })),
      ...data.events.map(e => ({ ...e, kind: "event" })),
      ...data.figures.map(f => ({ ...f, kind: "figure" })),
      ...data.culture.map(c => ({ ...c, kind: "culture" })),
      ...data.inventions.map(i => ({ ...i, kind: "invention" })),
      ...data.global.map(g => ({ ...g, kind: "global" })),
    ];
    return all.filter(it => (it.title || it.name || "").toLowerCase().includes(q)
      || (it.summary || it.blurb || "").toLowerCase().includes(q));
  }, [data, search]);

  // Compute related items for the detail panel
  const related = useMemoApp(() => {
    if (!data || !selected) return [];
    const out = [];
    if (selected.kind === "dynasty" || selected.kind === "concurrent") {
      // events that are children of this regime, plus other regimes in same system
      for (const e of data.events) {
        if (e.parent === selected.id) out.push({ ...e, kind: "event", onPick: () => setSelected({ ...e, kind: "event" }) });
      }
      for (const c of data.culture) {
        if (c.parent === selected.id) out.push({ ...c, kind: "culture", onPick: () => setSelected({ ...c, kind: "culture" }) });
      }
      for (const f of data.figures) {
        if (f.parent === selected.id) out.push({ ...f, kind: "figure", onPick: () => setSelected({ ...f, kind: "figure" }) });
      }
      // sister regimes
      for (const r of [...data.primary, ...data.concurrent]) {
        if (r.id !== selected.id && r.systemId === selected.systemId) {
          out.push({ ...r, kind: r === data.primary.find(x => x.id === r.id) ? "dynasty" : "concurrent",
            title: r.name, onPick: () => setSelected({ ...r, kind: "dynasty", title: r.name }) });
        }
      }
    } else if (selected.parent) {
      // find parent dynasty
      const parent = [...data.primary, ...data.concurrent].find(d => d.id === selected.parent);
      if (parent) {
        out.push({ ...parent, kind: "dynasty", title: parent.name,
          onPick: () => setSelected({ ...parent, kind: "dynasty", title: parent.name }) });
      }
    }
    return out.slice(0, 8);
  }, [data, selected]);

  if (!data) {
    return <div className="loading">Loading the atlas…</div>;
  }

  return (
    <>
      <TopBar
        zoom={zoom} onZoom={setZoom}
        mode={mode} onMode={setMode}
        onResetView={() => { setZoom(1); setExpandedRow(null); setSelected(null); setSearch(""); }}
      />
      <div className="app-body">
        <Sidebar
          search={search} setSearch={setSearch}
          layers={layers}
          toggleLayer={(k) => setLayers(s => ({ ...s, [k]: !s[k] }))}
          counts={counts}
          onPick={(it) => setSelected(it)}
          results={searchResults}
        />
        <div className="canvas-shell" data-screen-label="Timeline canvas">
          <TimelineCanvas
            data={data}
            layers={layers}
            zoom={zoom}
            mode={mode}
            highlightId={selected ? selected.id : null}
            onPick={setSelected}
            expandedRow={expandedRow}
            onToggleExpandRow={(idx) => setExpandedRow(curr => curr === idx ? null : idx)}
          />
        </div>
        <DetailPanel
          item={selected}
          onClose={() => setSelected(null)}
          related={related}
        />
      </div>
    </>
  );
}

window.App = App;
