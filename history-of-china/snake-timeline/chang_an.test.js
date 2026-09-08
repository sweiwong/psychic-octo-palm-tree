const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const YAML = require('yaml');
const links = require('./internal_links');
const { research, pinyin } = require('./research_edition');
const cards = require('./beginner_edition')(research, ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))).all;
const images = require('./image_data');
const source = fs.readFileSync(`${__dirname}/fixtures/chang-an-approved.md`, 'utf8');
const [, properties, markdown] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const metadata = YAML.parse(properties);
const body = markdown.split(/\n---\s*\n/)[0]
  .replace(/^\s*# [^\n]+\n\s*\*\*[^\n]+\*\*\s*\n/, '')
  .split(/\n\n/).filter(paragraph => !paragraph.startsWith('[![') && !paragraph.startsWith('*Modern reconstruction'))
  .join('\n\n').trim();
const card = cards.find(card => card.id === 'chang-an');

test('Chang’an retains every approved paragraph and all historical link destinations', () => {
  const plain = body.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, target, label) => label);
  const [intro, ...parts] = plain.split(/^## /m);
  const sections = parts.map(part => {
    const newline = part.indexOf('\n');
    return { title: part.slice(0, newline).trim(), text: part.slice(newline + 1).trim() };
  });
  assert.equal(links.plainText(card.description), intro.trim());
  assert.deepEqual(card.sections.map(section => ({ title: links.plainText(section.title), text: links.plainText(section.text) })), sections);
  assert.ok(sections.find(section => section.title === 'The Sui and Tang capital').text.includes('The city had 108 walled residential wards.'));
  assert.equal(card.note, '');
  assert.doesNotMatch(plain, /Lewis|Ebrey|Mote|Link inventory|Modern reconstruction/);
  const { graph, errors } = links.validateCards(cards);
  assert.deepEqual(errors, []);
  assert.deepEqual(graph.outbound.get('chang-an'), metadata.related);
});

test('Chang’an dates span successive imperial capital eras, with a reading-only card and pinyin', () => {
  assert.equal(card.start, -202);
  assert.equal(card.approx, true);
  assert.equal(card.end, 904);
  assert.equal(card.parent, 'tang');
  assert.equal(card.category, 'culture');
  assert.equal(card.ribbon, false);
  assert.equal(card.label, false);
  assert.equal(card.dateLabel, 'c. 202 BCE–904 · imperial capital eras');
  assert.equal(pinyin[card.nameZh], "Cháng'ān");
  assert.equal(pinyin[card.han], "Cháng'ān");
  metadata.sources.forEach((url, index) => {
    assert.ok(card.sources.includes(url));
    assert.equal(card.sourceLabels[url], metadata.sourceLabels[index]);
  });
});

test('Chang’an displays the user-supplied street illustration and ward plan with attribution and larger views', () => {
  const image = images['chang-an'];
  const { sectionImages, ...hero } = image;
  assert.deepEqual(hero, { ...metadata.image, fullSize: true });
  assert.equal(hero.src, 'assets/chang-an-street-illustration.png');
  assert.ok(fs.existsSync(`${__dirname}/${hero.src}`));
  assert.equal(hero.caption, 'An imagined street scene in Chang’an.');
  for (const field of ['source', 'license', 'licenseUrl']) assert.equal(hero[field], undefined);
  assert.equal(sectionImages.length, 1);
  const map = sectionImages[0];
  assert.equal(map.section, 'The Sui and Tang capital');
  assert.equal(map.fullSize, true);
  assert.equal(map.src, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Chang%27an_of_Tang.jpg/960px-Chang%27an_of_Tang.jpg');
  assert.equal(map.source, "https://commons.wikimedia.org/wiki/File:Chang%27an_of_Tang.jpg");
  assert.equal(map.license, 'CC BY-SA 4.0');
  assert.equal(map.licenseUrl, 'https://creativecommons.org/licenses/by-sa/4.0/');
  assert.match(map.credit, /SY/);
  assert.ok(source.includes(map.caption));
  const exported = require('./data/china_history_expanded.json').cards.find(card => card.id === 'chang-an');
  assert.deepEqual(exported.image, image);
  assert.equal(exported.pinyin, "Cháng'ān");
  assert.equal(exported.description, card.description);
  assert.deepEqual(exported.sections, card.sections);
});
