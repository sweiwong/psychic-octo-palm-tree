const test = require('node:test');
const assert = require('node:assert/strict');
const { create, ordinal } = require('./geometry.js');
const history = require('./history_data.js');

for (const width of [280, 350, 499, 700, 1020, 1300]) {
  test(`Continuous and proportional geometry at ${width}px`, () => {
    const g = create(width);
    assert.deepEqual(g.point(-2070), g.at(0));
    assert.equal(g.point(-2070).x,12);
    assert.deepEqual(g.point(2026), g.at(g.length));
    assert.equal(g.distance(-3000), 0);
    assert.equal(g.distance(3000), g.length);
    const year = g.length / (ordinal(2026) - ordinal(-2070));
    assert.ok(Math.abs(g.distance(1) - g.distance(-1) - year) < 1e-9);
    assert.ok(Math.abs(g.distance(763) - g.distance(755) - 8 * year) < 1e-9);
    for (let row = 0; row < g.rows - 1; row++) {
      const turn = g.rowStart(row) + g.straight + (row===0?g.extra:0);
      for (const boundary of [turn, turn + Math.PI * g.radius]) {
        for (const offset of [-44, -28, 0, 28, 44]) {
          const a = g.at(boundary - 0.0001, offset);
          const b = g.at(boundary + 0.0001, offset);
          assert.ok(Math.hypot(a.x - b.x, a.y - b.y) < 0.001);
        }
      }
    }
    for (let d = 0; d <= g.length; d += 3) {
      for (const offset of [-44, 44]) {
        const p = g.at(d, offset);
        assert.ok(p.x >= 0 && p.x <= width);
        assert.ok(p.y >= 0 && p.y <= g.height);
      }
    }
  });
}

test('Every curated record has unique identity, valid dates and a source', () => {
  assert.equal(new Set(history.all.map(x => x.id)).size, history.all.length);
  for (const item of history.all) {
    assert.ok(item.start !== 0 && item.end !== 0);
    assert.ok(item.start <= item.end);
    assert.ok(item.source.startsWith('https://en.wikipedia.org/wiki/'));
  }
});

test('Concurrent states do not obscure one another in a shared lane', () => {
  for (const a of history.states) for (const b of history.states) {
    if (a.id === b.id) continue;
    if (Math.max(a.start, b.start) < Math.min(a.end, b.end)) {
      assert.notEqual(a.offset, b.offset, `${a.name} obscures ${b.name}`);
    }
  }
});

test('Historical corrections stay explicit', () => {
  const byId = id => history.all.find(x => x.id === id);
  assert.equal(byId('an-lushan').start, 755);
  assert.equal(byId('an-lushan').end, 763);
  assert.equal(byId('xia').approx, true);
  assert.deepEqual(byId('tang').ranges, [[618, 690], [705, 907]]);
  assert.equal(byId('yuan').start, 1271);
  assert.equal(byId('yuan').ranges[0][0], 1279);
  assert.equal(byId('qing').start, 1636);
  assert.equal(byId('qing').ranges[0][0], 1644);
});
