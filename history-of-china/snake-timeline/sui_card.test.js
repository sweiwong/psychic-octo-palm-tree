const test = require('node:test');
const assert = require('node:assert/strict');
const links = require('./internal_links');
const { research } = require('./research_edition');
const cards = require('./beginner_edition')(research, ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))).all;
const card = cards.find(item => item.id === 'sui');
const images = require('./image_data').sui;

test('Sui has the replacement reading card and verified internal links', () => {
  assert.deepEqual(card.sections.map(section => links.plainText(section.title)), [
    'Geopolitical context',
    'The two emperors',
    'The Grand Canal',
    'Law and government',
    'Military overreach and collapse',
    'What the Tang inherited',
    'Cultural production',
    'Five dates',
  ]);
  assert.match(links.plainText(card.description), /581 to 618/);
  assert.match(links.plainText(card.sections[2].text), /grain/);
  assert.match(links.plainText(card.sections[4].text), /Salsu River/);
  assert.match(links.plainText(card.sections[7].text), /581.*589.*605.*612.*618/s);
  assert.doesNotMatch(JSON.stringify(card), /larger than the Roman Empire|ruled by just two emperors|Erie Canal/);

  const { graph, errors } = links.validateCards(cards);
  assert.deepEqual(errors, []);
  assert.deepEqual(graph.outbound.get('sui'), [
    'han', 'reunification', 'tang', 'north-south', 'catalog-R_JIN_W',
    'sui-grand-canal', 'tang-code', 'sui-examinations', 'song', 'qin',
    'longmen-caves',
  ]);
});

test('Sui has two maps, the Anji Bridge, a Sui sculpture and a timeline graphic', () => {
  assert.match(images.src, /Sui_Dynasty\.png/);
  assert.equal(images.sectionImages.length, 4);
  assert.deepEqual(images.sectionImages.map(image => image.section), [
    'The Grand Canal',
    'Cultural production',
    'Cultural production',
    'Five dates',
  ]);
  assert.match(images.sectionImages[0].src, /China-Grand_canal/);
  assert.match(images.sectionImages[1].src, /Anji_/);
  assert.match(images.sectionImages[2].src, /63394\.jpg/);
  assert.equal(images.sectionImages[3].src, 'assets/sui-timeline.svg');
  for (const image of [images, ...images.sectionImages]) {
    for (const field of ['alt', 'caption', 'credit', 'license']) assert.ok(image[field]?.length > 3, `${field} is present`);
    assert.ok(image.width > 0 && image.height > 0);
  }

  const exported = require('./data/china_history_expanded.json').cards.find(item => item.id === 'sui');
  assert.deepEqual(exported.image, images);
  assert.equal(exported.description, card.description);
  assert.deepEqual(exported.sections, card.sections);
});
