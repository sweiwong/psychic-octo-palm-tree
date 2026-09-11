const test = require('node:test');
const assert = require('node:assert/strict');
const links = require('./internal_links');
const { research } = require('./research_edition');
const edition = require('./beginner_edition')(
  research,
  ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))
);
const card = edition.all.find(item => item.id === 'shang');
const images = require('./image_data').shang;

test('Shang keeps its dynasty identity and expanded reader card', () => {
  assert.equal(card.id, 'shang');
  assert.equal(card.name, 'Shang');
  assert.equal(card.category, 'dynasty');
  assert.equal(edition.sourceMap.R_SHANG, 'shang');
  assert.deepEqual(card.sections.map(section => links.plainText(section.title)), [
    'From later tradition to contemporary evidence',
    'Kings, ancestors and royal decisions',
    'A general, consort and ritual leader',
    'Questions written on bone',
    'Bronze made power visible',
    'Work, rank and warfare',
    'Anyang and the Zhou conquest',
  ]);

  const copy = links.plainText([
    card.description,
    ...card.sections.map(section => section.text),
    card.note,
  ].join('\n'));
  for (const detail of ['商朝 Shāng Cháo', 'Wu Ding', 'Fu Hao', '1.6 tonnes', 'oracle-bone writing',
    'Houmuwu Ding', '832.84 kilograms', 'Battle of Muye', 'Mandate of Heaven']) {
    assert.match(copy, new RegExp(detail));
  }
  assert.doesNotMatch(copy, /100 million tons|1\.25 million square|dwarfed contemporary production|14,197|7,426|360 days|over 100 Shang chariots/);

  const { graph, errors } = links.validateCards(edition.all);
  assert.deepEqual(errors, []);
  assert.deepEqual(graph.outbound.get('shang'), [
    'xia', 'fu-hao', 'oracle', 'catalog-E_SHANG_2', 'western-zhou',
  ]);
});

test('Shang has credited bronze and oracle-bone illustrations', () => {
  assert.match(images.source, /metmuseum\.org\/art\/collection\/search\/61239/);
  assert.equal(images.license, 'Public domain');
  assert.deepEqual(images.sectionImages.map(image => image.section), ['Questions written on bone']);
  for (const image of [images, ...images.sectionImages]) {
    for (const field of ['src', 'source', 'licenseUrl']) assert.match(image[field], /^https:\/\//);
    for (const field of ['alt', 'caption', 'credit', 'license']) assert.ok(image[field].length, field);
    assert.ok(image.width > 0 && image.height > 0);
  }
});

test('expanded JSON contains the same Shang prose and images as the website', () => {
  const exported = require('./data/china_history_expanded.json').cards.find(item => item.id === card.id);
  assert.equal(exported.name, 'Shang');
  assert.equal(exported.description, card.description);
  assert.deepEqual(exported.sections, card.sections);
  assert.deepEqual(exported.image, images);
});
