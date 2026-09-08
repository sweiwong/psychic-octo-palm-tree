const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const YAML = require('yaml');
const links = require('./internal_links');
const { research } = require('./research_edition');
const apply = require('./beginner_edition');
const images = require('./image_data');
const cards = apply(research, ...['early', 'middle', 'late'].map(era => require('./beginner_' + era))).all;

for (const id of ['an-lushan', 'three-kingdoms']) {
  test(`${id}: the authored draft replaces the old entry without publishing its writing queue`, () => {
    const source = fs.readFileSync(`${__dirname}/fixtures/${id}-approved.md`, 'utf8');
    const [, properties, markdown] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const metadata = YAML.parse(properties);
    const body = markdown.split(/\n---\s*\n/)[0].replace(/^\s*# [^\n]+\n\s*\*\*[^\n]+\*\*\s*\n/, '').trim();
    const plain = body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => label || target);
    const [intro, ...parts] = plain.split(/^## /m);
    const sections = parts.map(part => {
      const newline = part.indexOf('\n');
      return { title: part.slice(0, newline).trim(), text: part.slice(newline + 1).trim() };
    });
    const card = cards.find(card => card.id === id);
    assert.equal(links.plainText(card.description), intro.trim());
    assert.deepEqual(card.sections.map(section => ({ title: links.plainText(section.title), text: links.plainText(section.text) })), sections);
    assert.equal(card.note, '');
    assert.deepEqual(images[id], { ...metadata.image, fullSize: true });
    for (const source of metadata.sources) assert.ok(card.sources.includes(source), source);
    for (const related of metadata.related.filter(id => cards.some(card => card.id === id))) assert.ok(card.related.includes(related), related);
    assert.equal(card.start, metadata.start);
    assert.equal(card.end, metadata.end);
    if (id === 'three-kingdoms') {
      assert.deepEqual(card.ranges, [[220, 266]]);
      assert.equal(typeof card.sourceLabels[metadata.sources[2]], 'string');
      assert.match(card.sourceLabels[metadata.sources[2]], /Xiaofei Tian.*Remaking History: The Shu and Wu/);
    }
    const { graph, errors } = links.validateCards(cards);
    assert.deepEqual(errors, []);
    const targets = [...body.matchAll(/\[\[([^\]|]+)/g)].map(match => match[1]).filter(id => cards.some(card => card.id === id));
    assert.deepEqual(graph.outbound.get(id), [...new Set(targets)]);
  });
}
