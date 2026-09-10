const test = require('node:test');
const assert = require('node:assert/strict');
const links = require('./internal_links');
const { research, pinyin } = require('./research_edition');
const cards = require('./beginner_edition')(
  research,
  ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))
).all;
const card = cards.find(item => item.id === 'western-zhou');

test('Western Zhou keeps the supplied account, corrected chronology and working links', () => {
  assert.equal(card.name, 'Western Zhou');
  assert.equal(card.start, -1046);
  assert.equal(card.end, -771);
  assert.equal(card.approx, true);
  assert.deepEqual(card.sections.map(section => section.title), [
    'From Shang to Zhou',
    'A network of kin and allies',
    'Ritual, bronze and writing',
    'Military and administration',
    'Collapse',
    'Legacy',
    'A long dynasty and an early name'
  ]);
  const copy = [card.description, ...card.sections.map(section => section.text), card.note].join('\n');
  for (const detail of ['牧野之战 Mùyě zhī Zhàn', '天命 Tiānmìng', '封建 fēngjiàn',
    '镐京 Hàojīng', '大盂鼎 Dà Yú Dǐng', '共和 Gònghé', '犬戎 Quǎnróng',
    '中国 Zhōngguó']) assert.match(copy, new RegExp(detail));
  assert.doesNotMatch(copy, /10 and 15 million|1 million square kilometers|first recorded regency|two nobles governed jointly|nomadic people/);
  const graph = links.validateCards(cards);
  assert.deepEqual(graph.errors, []);
  assert.deepEqual(graph.graph.outbound.get(card.id), [
    'shang', 'catalog-E_SHANG_2', 'confucius', 'zhou-gonghe', 'zhou-capital-crisis', 'eastern-zhou'
  ]);
});

test('Western Zhou retains targeted sources, pinyin and reusable illustrations', () => {
  assert.equal(pinyin[card.nameZh], 'xī zhōu');
  assert.equal(pinyin[card.han], 'zhōu');
  for (const url of [
    'https://openstax.org/books/world-history-volume-1/pages/5-1-ancient-china',
    'https://harvardartmuseums.org/collections/object/200497',
    'https://ctext.org/text.pl?node=12359&if=en&remap=gb',
    'https://www.cambridge.org/core/journals/early-china/article/xinian-an-ancient-historical-text-from-the-qinghua-university-collection-of-bamboo-books/426F77FC5F669A0CB240EB650AD1A3FE',
    'https://www.lhp.sdu.edu.cn/__local/A/EC/81/0CC1965B5469B3C1C017B45315A_F37EC24E_3458DD.pdf'
  ]) assert.ok(card.sources.includes(url), url);
  assert.deepEqual(card.related.slice(0, 3), ['shang', 'catalog-E_SHANG_2', 'eastern-zhou']);

  const image = require('./image_data')[card.id];
  assert.equal(image.src, 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Early_Western_Zhou_Bronze_Gui_01.jpg');
  assert.equal(image.width, 4474);
  assert.equal(image.height, 3782);
  assert.equal(image.license, 'CC0 1.0');
  assert.deepEqual(image.sectionImages.map(item => item.section), [
    'A network of kin and allies', 'Ritual, bronze and writing'
  ]);
  for (const item of [image, ...image.sectionImages]) {
    for (const field of ['src', 'source', 'licenseUrl']) assert.match(item[field], /^https:\/\//);
    for (const field of ['alt', 'caption', 'credit', 'license']) assert.ok(item[field].length, field);
    assert.ok(item.width > 0 && item.height > 0);
  }
});

test('expanded JSON contains the same Western Zhou prose and images as the website', () => {
  const exported = require('./data/china_history_expanded.json').cards.find(item => item.id === card.id);
  assert.equal(exported.description, card.description);
  assert.deepEqual(exported.sections, card.sections);
  assert.deepEqual(exported.image, require('./image_data')[card.id]);
});
