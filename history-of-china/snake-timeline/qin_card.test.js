const test = require('node:test');
const assert = require('node:assert/strict');
const links = require('./internal_links');
const { research } = require('./research_edition');
const cards = require('./beginner_edition')(research, ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))).all;
const card = cards.find(item => item.id === 'qin');
const images = require('./image_data').qin;

test('Qin has the sourced long-form reading card and verified internal links', () => {
  assert.equal(card.name, 'Qin Dynasty');
  assert.equal(card.annotateNames, false);
  assert.deepEqual(card.sections.map(section => links.plainText(section.title)), [
    'From a rival kingdom to the First Emperor',
    'Governing conquered territories',
    "Roads, walls and the First Emperor's tomb",
    'Law, punishment and contested memory',
    'Rebellion and collapse',
    'What survived under Han',
  ]);
  assert.match(links.plainText(card.description), /221 to 206 BCE.*fifteen years/s);
  assert.match(links.plainText(card.sections[1].text), /commandery-county system.*small seal script.*banliang coin/s);
  assert.match(links.plainText(card.sections[4].text), /Chen Sheng.*Wu Guang.*Xiang Yu.*Liu Bang/s);
  assert.match(links.plainText(card.sections[5].text), /retained and adapted many Qin institutions/);
  assert.doesNotMatch(JSON.stringify(card), /1\.2 million|2\.3 million|European Union|Roman Republic|actual soldiers|virtually unchanged|chief eunuch/);

  const { graph, errors } = links.validateCards(cards);
  assert.deepEqual(errors, []);
  assert.deepEqual(graph.outbound.get('qin'), [
    'catalog-R_ZHOU', 'shang-yang', 'unification', 'catalog-E_QIN_2',
    'qin-great-wall', 'catalog-C_QIN', 'han',
  ]);

  for (const source of [
    'https://www.metmuseum.org/essays/qin-dynasty-221-206-b-c',
    'https://plato.stanford.edu/entries/chinese-legalism/',
    'https://www.cambridge.org/core/journals/early-china/article/emergence-of-logistics-networks-and-financial-administration-during-the-qin-conquest-230221-bce/88CAA846820D79FE59DE99630ADB3528',
    'https://www.cambridge.org/core/journals/journal-of-chinese-history/article/making-use-of-the-land-the-political-ecology-of-chinas-first-empire/5C80E8CC40548B2953F72246C49A6CF7',
    'https://whc.unesco.org/en/list/441/',
    'https://afe.easia.columbia.edu/main_pop/ps/ps_china-lisi-legalist-memorials.htm',
  ]) assert.ok(card.sources.includes(source), source);
});

test('Qin has a lead illustration and two verified supporting objects', () => {
  assert.equal(images.sectionImages.length, 2);
  assert.deepEqual(images.sectionImages.map(image => image.section), [
    'Governing conquered territories',
    'Law, punishment and contested memory',
  ]);
  assert.match(images.sectionImages[0].src, /Qin_Bronze_Weight/);
  assert.match(images.sectionImages[1].src, /Eighteen_Laws_of_Qin/);
  for (const image of [images, ...images.sectionImages]) {
    for (const field of ['alt', 'caption', 'credit', 'license', 'source', 'licenseUrl']) {
      assert.ok(image[field]?.length > 3, `${field} is present`);
    }
    assert.ok(image.width > 0 && image.height > 0);
  }

  const exported = require('./data/china_history_expanded.json').cards.find(item => item.id === 'qin');
  assert.deepEqual(exported.image, images);
  assert.equal(exported.description, card.description);
  assert.deepEqual(exported.sections, card.sections);
});
