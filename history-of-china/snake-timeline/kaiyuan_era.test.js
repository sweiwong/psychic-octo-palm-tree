const test = require('node:test');
const assert = require('node:assert/strict');
const links = require('./internal_links');
const { research } = require('./research_edition');

const cards = require('./beginner_edition')(
  research,
  ...['early', 'middle', 'late'].map(era => require('./beginner_' + era)),
).all;
const card = cards.find(item => item.id === 'kaiyuan-era');

test('Kaiyuan preserves the corrected chronology, Chinese names and linked context', () => {
  assert.equal(card.name, 'Xuanzong (唐玄宗)’s Kaiyuan (开元) era');
  assert.deepEqual([card.start, card.end], [713, 741]);
  assert.equal(card.sections.length, 7);
  const copy = [card.description, card.note, ...card.sections.flatMap(section => [section.title, section.text])].join('\n');
  for (const text of [
    'second reign period', '先天 Xiāntiān', '唐玄宗 Táng Xuánzōng', '李隆基 Lǐ Lóngjī',
    '宇文融 Yǔwén Róng', '括户 kuòhù', '吐蕃 Tǔbō', '后突厥汗国 Hòu Tūjué Hánguó',
    '粟特人 Sùtèrén', '胡旋舞 Húxuánwǔ', '天宝 Tiānbǎo', '安史之乱 Ān-Shǐ zhī luàn',
  ]) assert.match(links.plainText(copy), new RegExp(text));
  assert.match(links.plainText(copy), /108 residential wards and two separately walled official markets/);
  assert.match(links.plainText(copy), /Abbasids.*took power only in 750, after Kaiyuan/);
  assert.doesNotMatch(links.plainText(copy), /first reign period|110 walled wards|Chang’an to Dunhuang in about eight days/);

  const { graph, errors } = links.validateCards(cards);
  assert.deepEqual(errors, []);
  assert.deepEqual(graph.outbound.get('kaiyuan-era'), [
    'tang', 'sui', 'wu-zhou', 'sui-grand-canal', 'chang-an', 'talas',
    'catalog-E_HAN_2', 'mogao-caves', 'li-bai-du-fu', 'xuanzang-return', 'jiedushi', 'an-lushan',
  ]);
});

test('Kaiyuan has six distinct, credited visuals without duplicating the Tang-height or Chang’an-grid maps', () => {
  const image = require('./image_data')['kaiyuan-era'];
  assert.equal(image.sectionImages.length, 5);
  assert.deepEqual(image.sectionImages.map(item => item.section), [
    'Revenue, grain and the work of governing',
    'Tang and its neighbouring states',
    'A Silk Roads crossroads',
    'A cosmopolitan capital',
    'A cosmopolitan capital',
  ]);
  for (const item of [image, ...image.sectionImages]) {
    for (const field of ['src', 'source', 'licenseUrl']) assert.match(item[field], /^https:\/\//);
    for (const field of ['alt', 'caption', 'credit', 'license']) assert.ok(item[field]?.length > 3, field);
    assert.ok(item.width > 0 && item.height > 0);
    assert.equal(item.fullSize, true);
  }
  const urls = [image, ...image.sectionImages].map(item => item.src).join('\n');
  assert.doesNotMatch(urls, /Tang_outline_map|Chang%27an_of_Tang/);
  assert.match(urls, /Silk-Road_course/);
  assert.match(urls, /Asia_ca_750_AD/);
  assert.match(urls, /Sogdien_Tang/);
  assert.match(image.sectionImages.find(item => /Sogdien_Tang/.test(item.src)).caption, /camel-and-rider group/);

  const exported = require('./data/china_history_expanded.json').cards.find(item => item.id === 'kaiyuan-era');
  assert.deepEqual(exported.image, image);
  assert.equal(exported.description, card.description);
  assert.deepEqual(exported.sections, card.sections);
});

test('Kaiyuan exposes the added historical and Silk Roads sources with useful labels', () => {
  for (const [url, label] of [
    ['https://journal.hep.com.cn/fhc/EN/10.3868/s020-012-023-0004-0', /Ding Jun/],
    ['https://ctext.org/wiki.pl?chapter=813675&if=en&remap=gb', /Old Book of Tang/],
    ['https://www.metmuseum.org/essays/tang-dynasty-618-906', /Met/],
    ['https://asia.si.edu/whats-on/exhibitions/the-sogdians/', /Smithsonian/],
    ['https://www.britishmuseum.org/blog/who-were-sogdians', /British Museum/],
    ['https://www.iranicaonline.org/articles/sogdian-trade/', /Sogdian trade/],
    ['https://www.iranicaonline.org/articles/chinese-iranian-xiii/', /Iranian migrations/],
  ]) {
    assert.ok(card.sources.includes(url), url);
    assert.match(card.sourceLabels[url], label);
  }
});
