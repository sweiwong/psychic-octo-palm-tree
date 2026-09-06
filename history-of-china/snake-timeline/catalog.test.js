const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const core = require('./history_data.js');
const catalog = require('./catalog_data.js');
const additions = require('./supplemental_data.js');
const expand = require('./catalog_adapter.js');
const app = expand(core, catalog, additions);
const entry = id => app.all.find(x => x.id === id);

test('All 111 workbook records reach a card, without duplicate subjects', () => {
  assert.equal(catalog.length, 111);
  assert.equal(app.all.length, 134);
  assert.equal(new Set(app.all.map(x => x.id)).size, app.all.length);
  for (const source of catalog) {
    const card = entry(app.sourceMap[source.id]);
    assert.ok(card, source.id);
    assert.ok(card.sourceIds.includes(source.id));
    assert.equal(card.importance, source.importance);
    for (const url of source.sourceUrls || []) assert.ok(card.sources.includes(url));
    if (source.dateNote) assert.ok((card.note + (card.catalogNote || '')).includes(source.dateNote));
  }
});

test('Browser source is identical to the preserved JSON export', () => {
  const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/china_history_v11.json'), 'utf8'));
  assert.deepEqual(catalog, json.all);
});

test('Research expansion leaves overview geometry inputs unchanged', () => {
  assert.equal(app.periods, core.periods);
  assert.deepEqual(app.events.filter(item => item.id !== 'sui-grand-canal'), core.events);
  assert.equal(entry('sui-grand-canal').start, 605);
  assert.equal(entry('sui-grand-canal').end, 610);
  assert.ok(entry('sui').related.includes('sui-grand-canal'));
  assert.equal(app.states, core.states);
  assert.equal(entry('an-lushan').end, 763);
  assert.equal(entry('qing').start, 1636);
  assert.equal(entry('liao').start, 916);
  assert.deepEqual(entry('qing').catalogDates, { start: 1644, end: 1912 });
});

test('Source status and uncertainty remain honest', () => {
  assert.match(entry('catalog-F_XIA_1').note, /not plotted/);
  assert.equal(entry('catalog-F_XIA_1').approx, true);
  assert.equal(entry('catalog-E_BUD_SPREAD').approx, true);
  assert.equal(entry('catalog-SR_SA').category, 'period');
  assert.equal(entry('catalog-SR_WS').category, 'period');
  for (const card of app.all) {
    assert.ok(Number.isFinite(card.start) && Number.isFinite(card.end));
    assert.ok(card.start <= card.end && card.start !== 0 && card.end !== 0);
    if (!card.sources.length) assert.match(card.evidence, /source check pending/);
    for (const url of card.sources) assert.equal(new URL(url).protocol, 'https:');
  }
});

test('Every displayed Chinese name uses the requested Simplified forms', () => {
  for (const card of app.all) {
    assert.ok(card.nameZh);
    assert.doesNotMatch(card.nameZh + card.han, /[國歷溫戰漢晉遼統紙亂經變約終東後劉齊陳閩吳馬]/);
  }
});

test('New periods connect to their constituent courts', () => {
  assert.equal(entry('three-kingdoms').related.includes(app.sourceMap.R_WEI), true);
  assert.equal(entry('five-dynasties').related.filter(id => id.startsWith('catalog-R_FIVE_')).length, 5);
  assert.equal(entry('catalog-S_TEN').related.length, 10);
  assert.ok(entry('north-south').related.includes(app.sourceMap.R_NS_NORTHERN_WEI));
});
