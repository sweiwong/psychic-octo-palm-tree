const test = require('node:test');
const assert = require('node:assert/strict');
const links = require('./internal_links');
const { research } = require('./research_edition');
const edition = require('./beginner_edition')(
  research,
  ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))
);
const card = edition.all.find(item => item.id === 'xia');
const images = require('./image_data').xia;

test('Xia keeps its disputed chronology and expanded reader card', () => {
  assert.equal(card.id, 'xia');
  assert.equal(card.name, 'Xia');
  assert.equal(card.category, 'dynasty');
  assert.equal(card.approx, true);
  assert.equal(edition.sourceMap.R_XIA, 'xia');
  assert.deepEqual(card.sections.map(section => links.plainText(section.title)), [
    'Yu, succession and the fall of Xia',
    'An early urban centre at Erlitou',
    'Wealth, craft and hierarchy',
    'Erlitou and the Xia question',
    'Why the Xia story endured',
  ]);

  const copy = links.plainText([
    card.description,
    ...card.sections.map(section => section.text),
    card.note,
  ].join('\n'));
  for (const detail of ['夏朝 Xià Cháo', '17 kings over 14 generations', '大禹 Dà Yǔ',
    '300 hectares', 'one of the earliest major bronze-casting centres', '甲骨文 Jiǎgǔwén',
    'Mandate of Heaven', 'conventional, approximate chronology']) {
    assert.match(copy, new RegExp(detail));
  }
  assert.doesNotMatch(copy, /centralization of flood-control authority|1750 to 1530|standing army or a written bureaucracy|Western scholars/);

  const { graph, errors } = links.validateCards(edition.all);
  assert.deepEqual(errors, []);
  assert.deepEqual(graph.outbound.get('xia'), [
    'sima-qian', 'catalog-F_XIA_1', 'shang', 'catalog-R_ZHOU', 'western-zhou',
  ]);
  assert.deepEqual(card.related, [
    'catalog-E_XIA_1', 'catalog-F_XIA_1', 'shang', 'western-zhou', 'sima-qian',
  ]);
});

test('Xia has credited Erlitou illustrations', () => {
  assert.match(images.source, /Jade_dragon_banner/);
  assert.equal(images.license, 'CC0 1.0');
  assert.deepEqual(images.sectionImages.map(image => image.section), ['Erlitou and the Xia question']);
  for (const image of [images, ...images.sectionImages]) {
    for (const field of ['src', 'source', 'licenseUrl']) assert.match(image[field], /^https:\/\//);
    for (const field of ['alt', 'caption', 'credit', 'license']) assert.ok(image[field].length, field);
    assert.ok(image.width > 0 && image.height > 0);
  }
});

test('expanded JSON contains the same Xia prose and images as the website', () => {
  const exported = require('./data/china_history_expanded.json').cards.find(item => item.id === card.id);
  assert.equal(exported.name, 'Xia');
  assert.equal(exported.description, card.description);
  assert.deepEqual(exported.sections, card.sections);
  assert.deepEqual(exported.image, images);
});
