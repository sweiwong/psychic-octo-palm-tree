const test = require('node:test');
const assert = require('node:assert/strict');
const packs = ['early', 'middle', 'late'].map(era => require('./significance_' + era));
const cards = require('./data/china_history_expanded.json').cards;

test('archived significance research stays sourced and separate from the reading edition', () => {
  const entries = packs.flatMap(pack => Object.entries(pack.significance));
  assert.equal(new Set(entries.map(([id]) => id)).size, entries.length, 'no duplicate authorship');
  assert.deepEqual(entries.map(([id]) => id).sort(), cards.filter(card => !card.cambridge).map(card => card.id).sort());
  assert.equal(new Set(entries.map(([, entry]) => entry.text)).size, entries.length, 'no reused generic paragraphs');
  for (const card of cards.filter(card => !card.cambridge)) {
    const entry = entries.find(([id]) => id === card.id)[1];
    assert(entry.text.trim().split(/\s+/).length >= 50, card.id + ': explain the connection');
    assert.equal(card.significance, undefined, card.id + ': omitted from reader copy');
    assert.equal(card.significanceSources, undefined, card.id + ': omitted from reader copy');
    for (const source of entry.sources) {
      assert.equal(new URL(source.url).protocol, 'https:', card.id);
      assert(source.label.trim(), card.id + ': readable source label');
    }
  }
});

test('significance preserves the original historical fields', () => {
  const apply = require('./beginner_edition');
  const expand = require('./catalog_adapter');
  const tang = require('./tang_data');
  const researchPacks = ['early_research', 'medieval_research', 'medieval_culture', 'late_imperial_research', 'modern_research', 'chart_research', 'cambridge_research'].map(name => require('./' + name));
  const research = expand(require('./history_data'), require('./catalog_data'), [...require('./supplemental_data'), ...tang.events, ...researchPacks.flatMap(pack => pack.events)], expand.mergeRevisions(tang.revisions, require('./research_revisions'), ...researchPacks.map(pack => pack.revisions)));
  const exhibition = apply(research, ...['early', 'middle', 'late'].map(era => require('./beginner_' + era)));
  const result = apply(exhibition, ...packs);
  for (const card of result.all) {
    const original = exhibition.all.find(item => item.id === card.id);
    for (const field of ['start', 'end', 'dateLabel', 'dateReview', 'sources', 'sourceLabels']) {
      assert.deepEqual(card[field], original[field], card.id + ': ' + field);
    }
  }
  assert.throws(() => apply(exhibition, packs[0], packs[0]), /Duplicate significance/);
  assert.throws(() => apply(exhibition, {significance: {missing: {text: 'Missing', sources: []}}}), /Unknown significance/);
  assert.throws(() => apply(exhibition, {significance: {[cards[0].id]: {text: 'Unsupported', sources: []}}}), /needs text and sources/);
});
