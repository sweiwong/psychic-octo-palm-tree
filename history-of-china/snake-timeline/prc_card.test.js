const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const YAML = require('yaml');
const links = require('./internal_links');
const { research } = require('./research_edition');
const cards = require('./beginner_edition')(research, ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))).all;
const source = fs.readFileSync(`${__dirname}/fixtures/prc-approved.md`, 'utf8');
const [, properties, markdown] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const metadata = YAML.parse(properties);
const body = markdown.split(/\n## Link inventory/)[0]
  .replace(/^\s*# [^\n]+\n\s*\*\*[^\n]+\*\*\s*\n/, '')
  .split(/\n\n/).filter(paragraph => !paragraph.startsWith('![') && !paragraph.startsWith('*'))
  .join('\n\n').replaceAll('*', '').trim();
const card = cards.find(card => card.id === 'prc');

test('PRC preserves every approved paragraph, seven sections and nineteen links', () => {
  const plain = body.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, target, label) => label);
  const [intro, ...parts] = plain.split(/^## /m);
  const sections = parts.map(part => {
    const newline = part.indexOf('\n');
    return { title: part.slice(0, newline).trim(), text: part.slice(newline + 1).trim() };
  });
  assert.equal(links.plainText(card.description), intro.trim());
  assert.deepEqual(card.sections.map(section => ({ title: links.plainText(section.title), text: links.plainText(section.text) })), sections);
  assert.equal(card.sections.length, 7);
  assert.equal(card.note, '');
  assert.equal(card.start, metadata.start);
  assert.equal(card.end, metadata.end);
  assert.equal(card.ranges, undefined);
  assert.equal(card.dateReview.status, 'confirmed');
  assert.deepEqual(card.sourceIds, ['R_PRC']);
  assert.match(links.plainText(card.description), /was founded in 1949/);
  assert.equal(card.name, 'People’s Republic of China');
  assert.equal(cards.length, 222);
  const { graph, errors } = links.validateCards(cards);
  assert.deepEqual(errors, []);
  assert.equal(metadata.related.length, 19);
  assert.deepEqual(graph.outbound.get('prc'), metadata.related);
  metadata.sources.forEach((url, index) => {
    assert.ok(card.sources.includes(url));
    assert.equal(card.sourceLabels[url], metadata.sourceLabels[url]);
  });
});

test('PRC uses the Mao-era photograph, industrial map and reform-era photographs without repeating captions as prose', () => {
  const image = require('./image_data').prc;
  assert.deepEqual(image, { ...metadata.image, fullSize: true, sectionImages: metadata.sectionImages.map(image => ({ ...image, fullSize: true })) });
  assert.equal(image.sectionImages[0].section, 'Industrial planning and the Great Leap Forward');
  assert.doesNotMatch(card.sections.map(section => section.text).join('\n'), /Modern reconstruction|Source and larger view|Wikimedia Commons/);
  const exported = require('./data/china_history_expanded.json').cards.find(card => card.id === 'prc');
  assert.deepEqual(exported.image, image);
  assert.equal(exported.description, card.description);
  assert.deepEqual(exported.sections, card.sections);
});
