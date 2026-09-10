const test = require('node:test');
const assert = require('node:assert/strict');
const links = require('./internal_links');
const { research, pinyin } = require('./research_edition');
const apply = require('./beginner_edition');
const images = require('./image_data');

const cards = apply(research, ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))).all;
const han = cards.find(card => card.id === 'han');

test('Han Dynasty keeps its identity, chronology, bilingual title and sourced reading card', () => {
  assert.equal(han.name, 'Han Dynasty');
  assert.equal(han.nameZh, '汉朝');
  assert.equal(han.han, '汉');
  assert.equal(pinyin[han.nameZh], 'hàn cháo');
  assert.equal(pinyin[han.han], 'hàn');
  assert.deepEqual([han.start, han.end, han.ranges], [-206, 220, [[-206, 9], [25, 220]]]);
  assert.equal(han.sections.length, 8);
  for (const source of [
    'https://www.metmuseum.org/essays/han-dynasty-206-b-c-220-a-d',
    'https://whc.unesco.org/en/list/1442',
    'https://doi.org/10.25365/jeacs.2025.6.1.roctus',
    'https://www.cai.cam.ac.uk/discover/library/online-exhibitions/print-and-material-book/paper',
  ]) assert.ok(han.sources.includes(source), source);
});

test('Han Dynasty links only to real cards and keeps corrected qualifications', () => {
  const { graph, errors } = links.validateCards(cards);
  assert.deepEqual(errors, []);
  for (const id of ['qin', 'catalog-R_HAN_W', 'chang-an', 'xin', 'catalog-R_HAN_E',
    'catalog-E_HAN_1', 'catalog-E_HAN_2', 'catalog-E_BUD_ENTRY', 'paper', 'zhang-heng',
    'salt-iron-debate', 'sima-qian', 'mawangdui-manuscripts', 'yellow-turbans',
    'catalog-E_3K_1', 'three-kingdoms', 'catalog-R_JIN_W']) assert.ok(graph.outbound.get('han').includes(id), id);
  const prose = [han.description, ...han.sections.map(section => section.text), han.note].join(' ');
  assert.doesNotMatch(prose, /6\.5 million|30 percent larger|1,463 meters|official state ideology|standardization of a written script/i);
  assert.match(prose, /tax administration rather than every person/);
  assert.match(prose, /civil service examination system came much later/);
});

test('Han Dynasty has a lead image and three licensed supporting images', () => {
  const media = [images.han, ...images.han.sectionImages];
  assert.equal(media.length, 4);
  assert.deepEqual(images.han.sectionImages.map(image => image.section), [
    'The scale of empire', 'Culture and literature', 'Culture and literature',
  ]);
  for (const image of media) {
    for (const field of ['src', 'source', 'licenseUrl']) assert.match(image[field], /^https:\/\//);
    for (const field of ['alt', 'caption', 'credit', 'license']) assert.ok(image[field].length > 3, field);
    assert.ok(image.width > 0 && image.height > 0);
  }
});
