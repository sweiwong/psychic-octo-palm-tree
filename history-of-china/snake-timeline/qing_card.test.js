const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const YAML = require('yaml');
const links = require('./internal_links');
const { research } = require('./research_edition');
const cards = require('./beginner_edition')(research, ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))).all;
const source = fs.readFileSync(`${__dirname}/fixtures/qing-approved.md`, 'utf8');
const [, properties, markdown] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const metadata = YAML.parse(properties);
const body = markdown.split(/\n---\s*\n/)[0]
  .replace(/^\s*# [^\n]+\n\s*\*\*[^\n]+\*\*\s*\n/, '')
  .split(/\n\n/).filter(paragraph => !paragraph.startsWith('![') && !paragraph.startsWith('*'))
  .join('\n\n').replaceAll('*', '').trim();
const card = cards.find(card => card.id === 'qing');

test('Qing preserves every approved paragraph, seven sections and twenty-one links', () => {
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
  assert.deepEqual(card.ranges, [[1644, 1912]]);
  assert.equal(card.dateReview.status, 'confirmed');
  assert.match(links.plainText(card.description), /ruling from 1644 to 1912/);
  assert.match(card.sections[1].text, /Historical estimates for 1820/);
  assert.equal(card.name, 'Qing');
  assert.equal(cards.length, 222);
  const { graph, errors } = links.validateCards(cards);
  assert.deepEqual(errors, []);
  assert.equal(metadata.related.length, 21);
  assert.deepEqual(graph.outbound.get('qing'), metadata.related);
  metadata.sources.forEach((url, index) => {
    assert.ok(card.sources.includes(url));
    assert.equal(card.sourceLabels[url], metadata.sourceLabels[index]);
  });
});

test('Qing uses the Kangxi portrait, empire map and period crafts without repeating captions as prose', () => {
  const image = require('./image_data').qing;
  assert.deepEqual(image, { ...metadata.image, fullSize: true, sectionImages: metadata.sectionImages.map(image => ({ ...image, fullSize: true })) });
  assert.equal(image.sectionImages[0].section, 'The eighteenth-century empire');
  assert.doesNotMatch(card.sections.map(section => section.text).join('\n'), /Modern reconstruction|Source and larger view|Wikimedia Commons/);
  const exported = require('./data/china_history_expanded.json').cards.find(card => card.id === 'qing');
  assert.deepEqual(exported.image, image);
  assert.equal(exported.description, card.description);
  assert.deepEqual(exported.sections, card.sections);
});
