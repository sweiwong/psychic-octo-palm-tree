const test = require('node:test');
const assert = require('node:assert/strict');
const pack = require('./cambridge_research');
const images = require('./image_data');
const expand = require('./catalog_adapter');
const tang = require('./tang_data');

const book = 'https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B';
const packs = ['early_research', 'medieval_research', 'medieval_culture', 'late_imperial_research', 'modern_research', 'chart_research', 'cambridge_research'].map(name => require('./' + name));
const exhibition = expand(
  require('./history_data'),
  require('./catalog_data'),
  [...require('./supplemental_data'), ...tang.events, ...packs.flatMap(item => item.events)],
  expand.mergeRevisions(tang.revisions, require('./research_revisions'), ...packs.map(item => item.revisions))
);

test('the Cambridge comparison adds fourteen distinct, fully sourced cards', () => {
  assert.equal(pack.events.length, 14);
  assert.equal(new Set(pack.events.map(card => card.id)).size, 14);
  for (const card of pack.events) {
    assert(card.cambridge?.chapter && card.cambridge?.page && card.cambridge?.epubSection, card.id + ': Cambridge locator');
    assert.equal(card.sources[0], book, card.id + ': book is the primary source');
    assert(card.sources.length >= 2, card.id + ': independent check');
    assert(card.sources.every(source => new URL(source).protocol === 'https:'), card.id + ': secure sources');
    assert(card.dateReview?.sources?.length >= 2, card.id + ': date review');
    assert(card.start !== 0 && card.end !== 0 && card.start <= card.end, card.id + ': valid dates');
    assert(card.sections?.length === 2, card.id + ': two useful sections');
    assert(pack.pinyin[card.nameZh] && pack.pinyin[card.han], card.id + ': pinyin');
    assert(exhibition.all.some(item => item.id === card.parent), card.id + ': parent exists');
  }
});

test('every new card has an independently licensed image', () => {
  for (const card of pack.events) {
    const image = images[card.id];
    assert(image, card.id + ': image');
    for (const key of ['src', 'alt', 'caption', 'credit', 'source', 'license', 'licenseUrl']) assert(image[key], card.id + ': ' + key);
    assert(image.width > 0 && image.height > 0, card.id + ': dimensions');
    assert.equal(new URL(image.src).protocol, 'https:', card.id + ': image URL');
    assert(!image.source.includes('cambridge.org/highereducation'), card.id + ': no illustration copied from the ebook');
  }
});

test('the new writing stays direct and states uncertainty plainly', () => {
  const banned = /\b(?:delve|foster|leverage|utilize|facilitate|empower|streamline|robust|cutting-edge|paradigm shift|game changer|tapestry|multifaceted|meticulous|intricate|paramount|transformative|elevate|embark|supercharge|harness|ever-evolving|helps? explain|why it matters)\b/i;
  for (const card of pack.events) {
    const copy = [card.description, card.note, ...card.sections.flatMap(section => [section.title, section.text]), images[card.id].alt, images[card.id].caption].join('\n');
    assert.doesNotMatch(copy, banned, card.id + ': direct language');
    assert.doesNotMatch(copy, /—/, card.id + ': no em dash');
  }
  for (const id of ['sanxingdui-pits', 'fu-hao', 'qin-han-south', 'song-footbinding', 'yuan-drama', 'qing-muslim-uprisings', 'agricultural-collectivization']) {
    assert.equal(pack.events.find(card => card.id === id).approx, true, id + ': broad or uncertain date is marked approximate');
  }
});
