const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const links = require('./internal_links');
const { research } = require('./research_edition');
const apply = require('./beginner_edition');
const images = require('./image_data');
const cards = apply(research, ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))).all;

test('Five Dynasties and Ten Kingdoms card has the full article, verified links and Chinese readings', () => {
  const card = cards.find(item => item.id === 'five-dynasties');
  assert.equal(card.name, 'Five Dynasties and Ten Kingdoms');
  assert.equal(card.nameZh, '五代十国');
  assert.deepEqual([card.start, card.end], [907, 979]);
  assert.equal(card.sections.length, 7);
  assert.match(card.sections[0].text, /one-quarter and one-third/);
  assert.match(card.sections[0].text, /cannot be read as a count of 36 million deaths/);
  assert.match(card.sections[2].text, /韩熙载夜宴图 Hán Xīzài Yèyàn Tú/);
  assert.match(card.sections[4].text, /first printed Chinese Buddhist canon/);

  const { graph, errors } = links.validateCards(cards);
  assert.deepEqual(errors, []);
  for (const id of ['tang', 'jiedushi', 'an-lushan', 'huang-chao', 'catalog-S_TEN',
    'catalog-R_FIVE_LATER_LIANG', 'catalog-R_TEN_SOUTHERN_TANG', 'liao',
    'southward-economic-shift', 'song']) {
    assert.ok(graph.outbound.get(card.id).includes(id), id);
  }
});

test('Five Dynasties supporting art is local, licensed and attached to the matching section', () => {
  const sectionImage = images['five-dynasties'].sectionImages?.[0];
  assert.equal(sectionImage.section, 'Ten kingdoms across the regions');
  assert.match(sectionImage.src, /night-revels-of-han-xizai\.jpg$/);
  assert.equal(sectionImage.license, 'Public domain');
  assert.match(sectionImage.caption, /later Song copy/);
  assert.equal(fs.existsSync(__dirname + '/' + sectionImage.src), true);
});
