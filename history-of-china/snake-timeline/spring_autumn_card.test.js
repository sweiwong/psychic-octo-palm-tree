const test = require('node:test');
const assert = require('node:assert/strict');
const links = require('./internal_links');
const { research, pinyin } = require('./research_edition');

const cards = require('./beginner_edition')(
  research,
  ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))
).all;
const card = cards.find(item => item.id === 'catalog-SR_SA');
const image = require('./image_data')[card.id];

test('Spring and Autumn keeps the supplied account with the atlas date convention', () => {
  assert.equal(card.name, 'Spring and Autumn Period');
  assert.equal(card.nameZh, '春秋');
  assert.equal(pinyin[card.nameZh], 'chūn qiū');
  assert.equal(card.start, -770);
  assert.equal(card.end, -481);
  assert.match(card.description, /770–481 BCE/);
  assert.match(card.note, /476 or 475 BCE/);

  assert.deepEqual(card.sections.map(section => links.plainText(section.title)), [
    'The collapse of Western Zhou',
    'Hegemons and great powers',
    'Iron, farming and commerce',
    'Ideas in a divided world',
    'A world in perspective',
    'Did you know?',
  ]);

  const copy = [card.description, ...card.sections.map(section => section.text), card.note].join('\n');
  for (const detail of ['King You', 'Haojing', 'Luoyang', 'Duke Huan of Qi', 'Guan Zhong',
    'Battle of Chengpu', 'iron', 'Confucius', 'Analects', 'Laozi', 'Daodejing', 'Sun Tzu',
    'Art of War', 'Zuo Zhuan', 'Classic of Poetry']) assert.match(links.plainText(copy), new RegExp(detail));
  for (const reading of ['周幽王 Zhōu Yōuwáng', '齐桓公 Qí Huángōng', '管仲 Guǎn Zhòng',
    '城濮之战 Chéngpú zhī Zhàn', '论语》 Lúnyǔ', '道德经》 Dàodéjīng']) assert.match(copy, new RegExp(reading));

  const { graph, errors } = links.validateCards(cards);
  assert.deepEqual(errors, []);
  for (const id of ['western-zhou', 'zhou-capital-crisis', 'eastern-zhou', 'confucius',
    'laozi', 'catalog-F_SUN', 'catalog-SR_WS']) assert.ok(graph.outbound.get(card.id).includes(id), id);
});

test('Spring and Autumn has targeted sources and two licensed illustrations', () => {
  for (const url of [
    'https://www.metmuseum.org/toah/ht/04/eac.html',
    'https://scholarworks.iu.edu/iuswrrest/api/core/bitstreams/d8910f96-a4d0-4c6a-82df-c0fa3f1b2125/content',
    'https://plato.stanford.edu/entries/confucius/',
    'https://www.cambridge.org/core/journals/early-china/article/abs/intellectual-change-in-the-chunqiu-period-the-reliability-of-the-speeches-in-the-zuo-zhuan-as-sources-of-chunqiu-intellectual-history/0F153ED3BAEF3469CAAA9070876E5F2B',
  ]) assert.ok(card.sources.includes(url), url);

  assert.match(image.source, /Chinese_plain_5c\._BC-en\.svg/);
  assert.equal(image.license, 'CC BY-SA 3.0');
  assert.ok(image.width > 0 && image.height > 0);
  assert.deepEqual(image.sectionImages.map(item => item.section), ['Iron, farming and commerce']);
  assert.match(image.sectionImages[0].source, /Qingong_Bell/);
  assert.equal(image.sectionImages[0].license, 'CC0 1.0');
  for (const item of [image, ...image.sectionImages]) {
    for (const field of ['src', 'alt', 'caption', 'credit', 'source', 'license', 'licenseUrl']) {
      assert.ok(item[field]?.length, field);
    }
    assert.ok(item.width > 0 && item.height > 0);
  }

  const exported = require('./data/china_history_expanded.json').cards.find(item => item.id === card.id);
  assert.equal(exported.description, card.description);
  assert.deepEqual(exported.sections, card.sections);
  assert.deepEqual(exported.image, image);
});
