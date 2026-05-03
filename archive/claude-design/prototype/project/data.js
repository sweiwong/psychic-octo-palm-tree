// Loads china_history.json (the user-provided dataset) and exposes a
// normalized model on window.HISTORY_DATA matching what the timeline
// renderer expects.
//
// Source schema (v9):
//   regimes[]   -> { id, name, startYear, endYear, lane: main|north|west|south, parentId, importance, summary, systemId }
//   events[]    -> { id, name, year, parentId, summary, importance }
//   figures[]   -> { id, name, year, summary, parentId, importance }
//   culturalAnchors[] -> { id, name, year, summary, lane }
//   innovations[]      (empty in v9)
//   culturalWorks[]    (empty in v9)
//   globalContext[]    -> { id, name, year, summary }
//   systems[]          -> { id, name, startYear, endYear, summary } (era bands)

window.loadHistoryData = async function () {
  const res = await fetch("china_history.json");
  const raw = await res.json();

  // Decide which regimes are "primary" (filling the main lane) vs "concurrent"
  // (rendered above/below). Use the v9 lane field directly.
  // Also: a parent regime + its sub-regimes are present (e.g. R_ZHOU and its
  // SR_ZHOU_W/E children + SR_SA/SR_WS). Prefer the leaf-most primary slice
  // for the main lane and elide the parent. We do this by hiding any regime
  // that has children in the main lane.
  const childMainCount = {};
  for (const r of raw.regimes) {
    if (r.lane === "main" && r.parentId) {
      childMainCount[r.parentId] = (childMainCount[r.parentId] || 0) + 1;
    }
  }

  const primary = [];
  const concurrent = [];
  for (const r of raw.regimes) {
    const node = {
      id: r.id,
      name: r.name,
      start: r.startYear,
      end: r.endYear,
      summary: r.summary || "",
      importance: r.importance || 3,
      systemId: r.systemId,
      parentId: r.parentId,
    };
    if (r.lane === "main") {
      // skip umbrella regimes that have main-lane children (e.g. Zhou, Eastern Zhou)
      if (childMainCount[r.id]) continue;
      primary.push(node);
    } else {
      // map north/west/south to lanes above/below the main bar
      const laneMap = { north: "above", west: "above2", south: "below" };
      concurrent.push({ ...node, lane: laneMap[r.lane] || "above" });
    }
  }

  const events = (raw.events || []).map(e => ({
    id: e.id, year: e.year, title: e.name, parent: e.parentId,
    blurb: e.summary || "", importance: e.importance || 3,
  }));

  const inventions = (raw.innovations || []).map(i => ({
    id: i.id, year: i.year, title: i.name, parent: i.parentId,
    blurb: i.summary || "", importance: i.importance || 3,
  }));

  // Cultural anchors -> cultural markers (icons). Some have lane=main meaning
  // they're long-running cultural facts pinned at a year.
  const culture = (raw.culturalAnchors || []).map(c => ({
    id: c.id, year: c.year, title: c.name, parent: c.parentId,
    blurb: c.summary || "", importance: c.importance || 3,
  }));

  const figures = (raw.figures || []).map(f => ({
    id: f.id, year: f.year, title: f.name, parent: f.parentId,
    blurb: f.summary || "", importance: f.importance || 3,
  }));

  const global = (raw.globalContext || []).map(g => ({
    id: g.id, year: g.year, title: g.name,
    blurb: g.summary || "", importance: g.importance || 3,
  }));

  const systems = (raw.systems || []).map(s => ({
    id: s.id, name: s.name, start: s.startYear, end: s.endYear,
    summary: s.summary || "",
  }));

  return {
    primary, concurrent, events, inventions, culture, figures, global, systems,
  };
};
