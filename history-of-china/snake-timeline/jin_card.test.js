const test = require('node:test');
const assert = require('node:assert/strict');
const { research } = require('./research_edition');
const cards = require('./beginner_edition')(
  research,
  ...['early', 'middle', 'late'].map(era => require('./beginner_' + era)),
).all;
const card = cards.find(item => item.id === 'jin-early');
const image = require('./image_data')['jin-early'];

test('Jin supporting images stay attached to the intended sections', () => {
  assert.ok(card, 'The Jin card remains in the assembled reading edition.');
  assert.equal(image.sectionImages.length, 6);
  assert.deepEqual(image.sectionImages.map(item => item.section), [
    'The princes turned protection into civil war',
    'A refugee court built through bargains',
    'A refugee court built through bargains',
    'Fei River and the survival of the south',
    'Culture in an age of displacement',
    'Culture in an age of displacement',
  ]);
  assert.ok(image.sectionImages.every(item => card.sections.some(section => section.title === item.section)));
});

test('Jin media keeps complete rights, context and export metadata', () => {
  const media = [image, ...image.sectionImages];
  assert.equal(new Set(media.map(item => item.src)).size, media.length);
  for (const item of media) {
    for (const field of ['src', 'source', 'licenseUrl']) assert.match(item[field], /^https:\/\//, field);
    for (const field of ['alt', 'caption', 'credit', 'license']) assert.ok(item[field]?.length > 3, field);
    assert.ok(item.width > 0 && item.height > 0);
  }

  const exported = require('./data/china_history_expanded.json').cards.find(item => item.id === 'jin-early');
  assert.deepEqual(exported.image, image);
});
