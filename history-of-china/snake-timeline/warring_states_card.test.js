const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const links = require('./internal_links');
const { research } = require('./research_edition');
const cards = require('./beginner_edition')(
  research,
  ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))
).all;
const card = cards.find(item => item.id === 'catalog-SR_WS');

test('Warring States card keeps the expanded account, audited dates and working links', () => {
  assert.equal(card.name, 'Warring States Period');
  assert.equal(card.start, -481);
  assert.equal(card.end, -221);
  assert.deepEqual(card.sections.map(section => section.title), [
    'Collapse of the Zhou order',
    'Seven major states',
    'Military revolution',
    'Bureaucratic revolution',
    'Hundred Schools of Thought',
    'Qin unification',
    'The game of Go',
    'Cultural references'
  ]);
  const copy = [card.description, ...card.sections.map(section => section.text), card.note].join('\n');
  for (const detail of ['475 and 403 BCE', 'Eastern Zhou', '600,000', 'Shang Yang',
    'Jixia', '400,000', 'Qin Shi Huang', 'Weiqi', 'The Art of War', 'Li Sao']) assert.match(copy, new RegExp(detail));
  assert.match(copy, /战国 Zhànguó/);
  assert.match(copy, /燕 Yān/);
  assert.match(copy, /长平之战 Chángpíng zhī Zhàn/);
  assert.doesNotMatch(copy, /30–50 million|Western Europe|Library of Alexandria|Eastern Zhou period \(770–476/);
  assert.deepEqual(links.validateCards(cards).errors, []);
});

test('Warring States card retains targeted sources, map and period-appropriate illustrations', () => {
  for (const url of [
    'https://plato.stanford.edu/entries/chinese-legalism/',
    'https://scholarworks.iu.edu/iuswrrest/api/core/bitstreams/51bdb8a8-620f-42ef-8a96-82fc3066efe3/content',
    'https://www.cambridge.org/core/journals/early-china/article/emergence-of-logistics-networks-and-financial-administration-during-the-qin-conquest-230221-bce/88CAA846820D79FE59DE99630ADB3528'
  ]) assert.ok(card.sources.includes(url), url);
  assert.match(fs.readFileSync(`${__dirname}/map_data.js`, 'utf8'), /'catalog-SR_WS':warring/);
  assert.ok(card.sources.includes('https://afe.easia.columbia.edu/main_pop/ps/ps_china-quyuan-encounteringsorrow.htm'));
  const image = require('./image_data')['catalog-SR_WS'];
  assert.match(image.source, /Bronze_pot,_Warring_States,_Shanghai_Museum/);
  assert.equal(image.license, 'CC0 1.0');
  assert.ok(image.width > 0 && image.height > 0);
  assert.deepEqual(image.sectionImages.map(item => item.section), ['Military revolution', 'Qin unification']);
  assert.equal(new Set(image.sectionImages.map(item => item.src)).size, image.sectionImages.length);
  for (const item of image.sectionImages) {
    for (const field of ['src', 'source', 'licenseUrl']) assert.match(item[field], /^https:\/\//);
    for (const field of ['alt', 'caption', 'credit', 'license']) assert.ok(item[field].length, field);
    assert.ok(item.width > 0 && item.height > 0);
  }
});

test('expanded JSON contains the same Warring States prose and image as the website', () => {
  const exported = require('./data/china_history_expanded.json').cards.find(item => item.id === card.id);
  assert.equal(exported.description, card.description);
  assert.deepEqual(exported.sections, card.sections);
  assert.deepEqual(exported.image, require('./image_data')[card.id]);
});
