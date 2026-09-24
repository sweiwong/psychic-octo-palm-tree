const test = require('node:test');
const assert = require('node:assert/strict');
const { research, pinyin } = require('./research_edition');
const applyBeginnerEdition = require('./beginner_edition');
const images = require('./image_data');
const links = require('./internal_links');

const cards = applyBeginnerEdition(research,
  require('./beginner_early'), require('./beginner_middle'), require('./beginner_late')).all;
const card = cards.find(item => item.id === 'jurchen-jin');

test('Jurchen Jin keeps its identity and presents the corrected history', () => {
  assert.ok(card);
  assert.equal(card.name, 'Jin (Jurchen)');
  assert.deepEqual([card.start, card.end], [1115, 1234]);
  assert.equal(card.nameZh, '金朝');
  assert.equal(pinyin[card.nameZh], 'jīn cháo');
  assert.equal(pinyin[card.han], 'jīn');
  const prose = [card.description, ...card.sections.map(section => section.text), card.note].join('\n');
  assert.match(prose, /53\.5 million people in 1207/);
  assert.match(prose, /Mongol forces and their Southern Song allies took Caizhou/);
  assert.doesNotMatch(prose, /53 million.*1186|44 hectares|90 million.*shi/);
  assert.equal(links.validateCards(cards).errors.length, 0);
  assert.deepEqual(require('./data/china_history_expanded.json').cards.find(item => item.id === card.id).sections, card.sections);
});

test('Jin-period Ding ware has a credited source and rights evidence', () => {
  const image = images['jurchen-jin'].sectionImages.find(item => item.section === 'Writing, belief and art');
  assert.ok(image);
  assert.match(image.source, /metmuseum\.org\/art\/collection\/search\/52031/);
  assert.match(image.license, /Public domain/);
  for (const field of ['src', 'source', 'licenseUrl']) assert.equal(new URL(image[field]).protocol, 'https:');
  for (const field of ['alt', 'caption', 'credit']) assert.ok(image[field].length > 10);
  assert.ok(image.width > 0 && image.height > 0);
  assert.deepEqual(require('./data/china_history_expanded.json').cards.find(item => item.id === card.id).image, images[card.id]);
});
