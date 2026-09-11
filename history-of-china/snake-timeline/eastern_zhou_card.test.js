const test = require('node:test');
const assert = require('node:assert/strict');
const links = require('./internal_links');
const { research } = require('./research_edition');

const cards = require('./beginner_edition')(
  research,
  ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))
).all;
const card = cards.find(item => item.id === 'eastern-zhou');
const image = require('./image_data')[card.id];

test('Eastern Zhou keeps the supplied account, audited dates and working links', () => {
  assert.equal(card.name, 'Eastern Zhou');
  assert.equal(card.start, -770);
  assert.equal(card.end, -256);
  assert.equal(card.annotateNames, false);
  assert.equal(card.description, 'The Eastern Zhou began in 770 BCE when the Zhou court abandoned its western capital and moved east to Luoyang. Over the next 514 years, royal authority dissolved into competitive states, mass armies, and the Hundred Schools of Thought, a political and intellectual transformation that set the terms for imperial China.');
  assert.equal(card.nameZh, '东周');
  assert.equal(require('./pinyin_data')[card.nameZh], 'dōng zhōu');
  assert.deepEqual(card.sections.map(section => links.plainText(section.title)), [
    'From Western Zhou to Eastern Zhou',
    'Spring and Autumn: hegemons and changing war',
    'Warring States: mass warfare and stronger governments',
    'The Hundred Schools of Thought',
    'The Zhou house ends',
    'Did you know?',
  ]);

  const copy = [card.description, ...card.sections.map(section => section.text), card.note].join('\n');
  for (const detail of ['514 years', 'Haojing', 'Five Hegemons', '453 BCE', 'Battle of Changping',
    'Shang Yang', 'Dujiangyan', 'Hundred Schools of Thought', 'Jixia', 'King Nan',
    'Strategies of the Warring States']) assert.match(links.plainText(copy), new RegExp(detail));
  for (const reading of ['镐京 Hàojīng', '燕 Yān', '长平之战 Chángpíng zhī Zhàn',
    '都江堰 Dūjiāngyàn', '稷下学宫 Jìxià Xuégōng', '周赧王 Zhōu Nǎnwáng']) assert.match(copy, new RegExp(reading));
  assert.doesNotMatch(copy, /Western Roman Empire|20 and 40 million|over 600,000|marked the beginning of the Warring States/);

  const { graph, errors } = links.validateCards(cards);
  assert.deepEqual(errors, []);
  assert.deepEqual(graph.outbound.get(card.id), [
    'western-zhou', 'zhou-capital-crisis', 'catalog-SR_SA', 'confucius', 'catalog-SR_WS',
    'shang-yang', 'qin', 'han', 'confucianism-daoism', 'mencius', 'xunzi', 'laozi',
    'zhuangzi', 'mozi', 'han-fei', 'catalog-F_SUN', 'unification',
  ]);
  for (const id of ['western-zhou', 'late-warring']) assert.ok(card.related.includes(id), id);
});

test('Eastern Zhou keeps targeted sources and a verified period artifact', () => {
  for (const url of [
    'https://82nd-and-fifth.metmuseum.org/toah/ht/04/eac.html',
    'https://scholarworks.iu.edu/iuswrrest/api/core/bitstreams/51bdb8a8-620f-42ef-8a96-82fc3066efe3/content',
    'https://www.cambridge.org/core/elements/institutions-and-environment-in-ancient-southern-east-asia-3000-bce-to-300-ce/CC39D2BB0C5D015C230983E4DB2E3728',
    'https://afe.easia.columbia.edu/main_pop/kpct/kp_4000bce-1000ce.htm',
    'https://whc.unesco.org/en/list/1001',
  ]) assert.ok(card.sources.includes(url), url);

  assert.equal(image.width, 960);
  assert.equal(image.height, 1261);
  assert.match(image.caption, /Yue region/);
  assert.match(image.source, /commons\.wikimedia\.org\/wiki\/File/);
  assert.equal(image.license, 'CC BY-SA 4.0');
  for (const field of ['src', 'alt', 'caption', 'credit', 'source', 'licenseUrl']) assert.ok(image[field]?.length, field);

  const exported = require('./data/china_history_expanded.json').cards.find(item => item.id === card.id);
  assert.equal(exported.description, card.description);
  assert.deepEqual(exported.sections, card.sections);
  assert.deepEqual(exported.image, image);
});
