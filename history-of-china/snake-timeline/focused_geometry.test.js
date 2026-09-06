const test = require('node:test');
const assert = require('node:assert/strict');
const { create, ordinal } = require('./geometry.js');

const ranges = [
  ['Early', -2070, -221],
  ['Imperial', -221, 1912],
  ['Modern', 1912, 2026],
];
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9);

for (const width of [280, 700, 1020]) {
  for (const [name, startYear, endYear] of ranges) {
    test(`${name} range has proportional, bounded geometry at ${width}px`, () => {
      const g = create(width, { startYear, endYear });
      assert.equal(g.startYear, startYear);
      assert.equal(g.endYear, endYear);
      assert.deepEqual(g.point(startYear), g.at(0));
      assert.equal(g.point(startYear).x, 12);
      assert.deepEqual(g.point(endYear), g.at(g.length));
      assert.equal(g.distance(startYear - 100), 0);
      assert.equal(g.distance(endYear + 100), g.length);
      const perYear = g.length / (ordinal(endYear) - ordinal(startYear));
      close(g.distance(startYear + 10), 10 * perYear);
      close(g.distance(endYear - 10), g.length - 10 * perYear);
      if (startYear < 0 && endYear > 0) {
        close(g.distance(1) - g.distance(-1), perYear);
      }
      assert.equal(g.path(), g.path(startYear, endYear));
      const first = g.point(startYear), last = g.point(endYear);
      assert.ok(g.path().startsWith(`M${first.x.toFixed(2)},${first.y.toFixed(2)} `));
      assert.ok(g.path().endsWith(`L${last.x.toFixed(2)},${last.y.toFixed(2)}`));
      let previous = -1;
      for (let year = startYear; year <= endYear; year++) {
        if (year === 0) continue;
        const distance = g.distance(year);
        assert.ok(distance > previous);
        previous = distance;
      }
    });
  }

  test(`Range lengths grow with duration and full geometry stays unchanged at ${width}px`, () => {
    const early = create(width, { startYear: -2070, endYear: -221 });
    const imperial = create(width, { startYear: -221, endYear: 1912 });
    const modern = create(width, { startYear: 1912, endYear: 2026 });
    const full = create(width);
    assert.ok(modern.length <= early.length);
    assert.ok(early.length <= imperial.length);
    assert.ok(imperial.length <= full.length);
    assert.ok(modern.rows >= 3);
    const radius = 78, straight = width - 2 * (radius + 48);
    const originalRows = Math.max(5, Math.ceil(5100 / (straight + Math.PI * radius)));
    assert.equal(full.rows, originalRows);
    assert.equal(full.length, 114 + originalRows * straight + (originalRows - 1) * Math.PI * radius);
    assert.equal(full.startYear, -2070);
    assert.equal(full.endYear, 2026);
    assert.equal(create(width, {}).path(), full.path());
  });
}

test('BCE and CE have no extra zero year', () => {
  assert.equal(ordinal(-1), 0);
  assert.equal(ordinal(1), 1);
  assert.equal(ordinal(1912) - ordinal(-221), 2132);
});
