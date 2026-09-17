const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const { research, pinyin } = require('./research_edition');
const applyBeginnerEdition = require('./beginner_edition');
const edition = applyBeginnerEdition(research, require('./beginner_early'), require('./beginner_middle'), require('./beginner_late'));
const images = require('./image_data');
const links = require('./internal_links');
const exported = require('./data/china_history_expanded.json');

test('Xin uses the approved long-form account without overstating the evidence', () => {
  const card = edition.all.find(item => item.id === 'xin');
  const prose = [card.description, ...card.sections.flatMap(section => [section.title, section.text]), card.note].join('\n');

  assert.equal(card.nameZh, '新朝');
  assert.equal(card.han, '新');
  assert.equal(pinyin[card.nameZh], 'xīn cháo');
  assert.equal(pinyin[card.han], 'xīn');
  assert.equal(card.sections.length, 6);
  assert.match(prose, /Population records and their limits/i);
  assert.match(prose, /cannot be used to calculate how many people died/i);
  assert.match(prose, /coalition linked to the Lulin movement entered \[\[id:chang-an\|Chang’an\]\]/);
  assert.match(prose, /\[\[id:ban-zhao\|Ban Zhao\]\]/);
  assert.doesNotMatch(prose, /Black Death|hundreds of thousands|rampant inflation|primary grievances/);
  assert.doesNotMatch(prose, /Ban Gu.+completed in 111/);
  assert.deepEqual(card.related, ['han', 'catalog-R_HAN_W', 'catalog-R_HAN_E', 'catalog-R_ZHOU', 'chang-an', 'salt-iron-debate', 'ban-zhao']);
  assert.equal(links.validateCards(edition.all).errors.length, 0);
  assert(card.sources.some(url => url.includes('chnmuseum.cn')));
  assert(card.sources.some(url => url.includes('plato.stanford.edu')));
  assert(card.sources.every(url => card.sourceLabels[url]), 'Every Xin source needs an explicit label');
  assert.doesNotMatch(card.sources.join('\n'), /columbia\.edu|Northern_Qi/);
});

test('Xin keeps its verified knife-money illustration with complete rights metadata', () => {
  const image = images.xin;
  assert.equal(image.width, 640);
  assert.equal(image.height, 584);
  assert.match(image.alt, /front and reverse/i);
  assert.equal(image.license, 'CC BY-SA 4.0');
  assert.match(image.caption, /7 CE.+regent.+9 CE/s);
  assert.equal(image.sectionImages.length, 1);
  const map = image.sectionImages[0];
  assert.equal(map.section, 'Catastrophe and collapse');
  assert.equal(map.width, 1272);
  assert.equal(map.height, 900);
  assert.match(map.caption, /17–26 CE.+Shandong.+northern Jiangsu.+northern Hubei.+southern Henan.+23 CE/s);
  assert.equal(map.credit, 'SY · Wikimedia Commons');
  assert.equal(map.license, 'CC BY-SA 4.0');
  assert.equal(map.fullSize, true);
  for (const item of [image, map]) {
    for (const key of ['src', 'source', 'licenseUrl']) assert.equal(new URL(item[key]).protocol, 'https:');
  }
});

test('Xin matches the saved JSON used outside the browser', () => {
  const card = edition.all.find(item => item.id === 'xin');
  const saved = exported.cards.find(item => item.id === 'xin');

  for (const key of ['nameZh', 'han', 'description', 'sections', 'note', 'sources', 'related']) {
    assert.deepEqual(saved[key], card[key], `${key} differs between the browser card and saved JSON`);
  }
  assert.deepEqual(saved.image, images.xin, 'Xin images differ between the browser card and saved JSON');
});

test('Xin card dependencies use current browser cache versions', () => {
  const page = fs.readFileSync('./index.html', 'utf8');
  const dependencies = ['styles.css', 'catalog_data.js', 'image_data.js', 'pinyin_data.js', 'early_research.js', 'chart_research.js', 'beginner_early.js'];

  for (const file of dependencies) {
    const version = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 12);
    assert.match(page, new RegExp(`${file.replaceAll('.', '\\.')}\\?v=${version}`));
  }
});
