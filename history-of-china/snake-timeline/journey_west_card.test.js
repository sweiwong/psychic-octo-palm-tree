const test = require('node:test');
const assert = require('node:assert/strict');
const { research, pinyin } = require('./research_edition');
const applyBeginnerEdition = require('./beginner_edition');
const images = require('./image_data');

const edition = applyBeginnerEdition(
  research,
  ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))
);

test('Journey to the West is a sourced, linked, illustrated bilingual card', () => {
  const card = edition.all.find(item => item.id === 'ming-journey-west');
  assert(card);
  assert.equal(card.name, 'Journey to the West');
  assert.equal(card.nameZh, '西游记');
  assert.equal(pinyin[card.nameZh], 'Xīyóu jì');
  assert.equal(pinyin[card.han], 'shū');
  assert.equal(card.start, 1592);
  assert.equal(card.end, 1592);
  assert.equal(card.parent, 'ming');
  assert.equal(card.ribbon, false);
  assert.deepEqual(card.related, ['xuanzang-return', 'ming', 'red-chamber']);

  const copy = [card.description, ...card.sections.map(section => section.text), card.note].join('\n');
  assert.equal(card.sections.length, 4);
  assert.match(copy, /\[\[id:ming\|Ming dynasty\]\]/);
  assert.match(copy, /\[\[id:xuanzang-return\|Xuanzang\]\]/);
  assert.match(copy, /\[\[id:tang\|Tang dynasty\]\]/);
  assert.match(copy, /\[\[id:chang-an\|Chang'an\]\]/);
  assert.match(copy, /Wu Cheng'en \(吴承恩 Wú Chéng'ēn\)/);
  assert.match(copy, /Sun Wukong \(孙悟空 Sūn Wùkōng\)/);
  assert.match(copy, /traditionally attributed|traditional attribution/i);
  assert.match(copy, /earliest surviving (?:complete|full-length) edition/i);
  assert.doesNotMatch(copy, /\b(?:delve|foster|leverage|utilize|facilitate|empower|streamline|robust|transformative|tapestry)\b/i);
  assert.doesNotMatch(copy, /—/);

  const requiredSources = [
    'https://academic.oup.com/dsh/article/39/1/308/7444779',
    'https://iep.utm.edu/xuanzang/',
    'https://afe.easia.columbia.edu/cosmos/main/using_monkey.pdf'
  ];
  for (const url of requiredSources) {
    assert(card.sources.includes(url), url);
    assert(card.sourceLabels[url], url + ' label');
  }

  const image = images[card.id];
  assert(image);
  assert.equal(image.width, 1856);
  assert.equal(image.height, 1637);
  assert.match(image.credit, /National Palace Museum/);
  assert.equal(image.license, 'Public domain');
  assert.match(image.caption, /1592 Shidetang/);
  assert.doesNotMatch([image.alt, image.caption].join('\n'), /—/);
});
