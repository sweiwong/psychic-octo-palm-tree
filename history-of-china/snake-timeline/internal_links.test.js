const test = require('node:test');
const assert = require('node:assert/strict');
const links = require('./internal_links');

test('parses direct, display-aliased and stable-ID links without changing labels', () => {
  assert.deepEqual(links.parse('See [[Qing]].'), [
    { type: 'text', value: 'See ' },
    { type: 'link', target: 'Qing', label: 'Qing', targetKind: 'title' },
    { type: 'text', value: '.' },
  ]);
  assert.deepEqual(links.parse('During [[Qing|the Qing dynasty]]'), [
    { type: 'text', value: 'During ' },
    { type: 'link', target: 'Qing', label: 'the Qing dynasty', targetKind: 'title' },
  ]);
  assert.deepEqual(links.parse('[[id:qing-dynasty|the Qing era]]'), [
    { type: 'link', target: 'qing-dynasty', label: 'the Qing era', targetKind: 'id' },
  ]);
  assert.equal(links.plainText('[aside] [[秦]] and [[Qing|清]]'), '[aside] 秦 and 清');
  assert.equal(links.plainText('No links <b>here</b>'), 'No links <b>here</b>');
});

test('rejects malformed links with their written target and position', () => {
  for (const value of ['[[Qing', 'Qing]]', '[[]]', '[[ |label]]', '[[Qing| ]]', '[[Qing|a|b]]', '[[id:]]', '[[[Qing]]]', '[[Qing [era]]]']) {
    assert.throws(() => links.parse(value), error => error.code === 'malformed-link' && Number.isInteger(error.position) && typeof error.target === 'string', value);
  }
});

test('normalizes spacing, Unicode, case and accents but preserves punctuation', () => {
  assert.equal(links.normalizeTitle('  ＱÍＮＧ\t dynasty  '), 'qing dynasty');
  assert.equal(links.normalizeTitle('Lu\u0308'), 'lu');
  assert.notEqual(links.normalizeTitle('Han-Tang'), links.normalizeTitle('Han Tang'));
});

const cards = [
  { id: 'qing', linkTitle: 'Qing', name: 'Qing (清)', linkAliases: ['Ch’ing'], searchAliases: ['empire'], start: 1636, description: '[[Qing]]' },
  { id: 'later', linkTitle: 'Later', start: 1700, description: '[[Qing]] [[Ch’ing]]' },
  { id: 'b', linkTitle: 'Beta', start: 100, sections: [{ title: '[[Qing]]', text: '[[id:qing]]' }] },
  { id: 'a', linkTitle: 'Alpha', start: 100, note: '[[Qing]]' },
];

test('resolves canonical titles, explicit aliases and IDs, with no fuzzy or search alias matching', () => {
  const registry = links.createRegistry(cards);
  for (const text of ['[[ qíng ]]', '[[Ch’ing]]', '[[id:qing]]']) {
    assert.equal(links.resolveTarget(registry, links.parse(text)[0]).id, 'qing');
  }
  for (const text of ['[[empire]]', '[[Qin]]', '[[id:QING]]']) {
    assert.equal(links.resolveTarget(registry, links.parse(text)[0]), null);
  }
});

test('rejects duplicate IDs, titles, aliases and title-alias collisions without choosing a winner', () => {
  for (const extra of [
    { id: 'qing', linkTitle: 'Another' }, { id: 'other', linkTitle: ' QÍNG ' },
    { id: 'other', linkTitle: 'Other', linkAliases: ['Ch’ing'] },
    { id: 'other', linkTitle: 'Other', linkAliases: ['Qing'] },
  ]) {
    const registry = links.createRegistry([...cards, extra]);
    assert.equal(registry.errors.length, 1);
    assert.match(registry.errors[0].code, /duplicate/);
    assert.equal(links.validateCards([...cards, extra]).errors.length, 1);
  }
  const ambiguous = links.createRegistry([...cards, { id: 'other', linkTitle: 'Qing' }]);
  assert.equal(links.resolveTarget(ambiguous, links.parse('[[Qing]]')[0]), null);
});

test('derives unique outbound links and chronological backlinks, omitting self-links', () => {
  const graph = links.createGraph(cards, links.createRegistry(cards));
  assert.deepEqual(graph.backlinks.get('qing').map(card => card.id), ['a', 'b', 'later']);
  assert.deepEqual(graph.outbound.get('later'), ['qing']);
  assert.deepEqual(graph.backlinks.get('later'), []);
  assert.deepEqual(links.scanCard(cards[2]).map(item => item.field), ['sections[0].title', 'sections[0].text']);
});

test('validation errors identify source, field, written target and close suggestions', () => {
  const source = { id: 'source', linkTitle: 'An Lushan Rebellion', description: '[[Three Kingdms]]', note: '[[Qing|]]' };
  const result = links.validateCards([...cards, { id: 'three', linkTitle: 'Three Kingdoms' }, source]);
  assert.equal(result.errors.length, 2);
  const error = result.errors[0];
  assert.equal(error.sourceId, 'source');
  assert.equal(error.sourceTitle, 'An Lushan Rebellion');
  assert.equal(error.field, 'description');
  assert.equal(error.target, 'Three Kingdms');
  assert.equal(error.suggestion, 'Three Kingdoms');
  assert.match(error.message, /An Lushan Rebellion.*description.*Three Kingdms.*Three Kingdoms/);
  assert.equal(result.errors[1].code, 'malformed-link');
});

test('rejects wiki markup in unsupported fields', () => {
  const result = links.validateCards([{ id: 'wrong', linkTitle: 'Wrong', name: '[[Qing]]', image: { caption: '[[Qing]]' } }]);
  assert.deepEqual(result.errors.map(error => error.field), ['name', 'image.caption']);
  assert(result.errors.every(error => error.code === 'unsupported-field'));
});

test('renders literal HTML as text and real anchors with preserved URL context', () => {
  const document = {
    createTextNode: value => ({ nodeType: 3, textContent: value }),
    createElement: tagName => ({ tagName, dataset: {}, addEventListener() {} }),
  };
  const container = { ownerDocument: document, children: [], appendChild(node) { this.children.push(node); } };
  links.appendRichText(container, '<script>alert(1)</script> [[Qing|<b>清</b>]]', {
    registry: links.createRegistry(cards), href: id => `?view=all&card=${encodeURIComponent(id)}#notes`,
  });
  assert.equal(container.children[0].nodeType, 3);
  assert.equal(container.children[0].textContent, '<script>alert(1)</script> ');
  const anchor = container.children[1];
  assert.equal(anchor.tagName, 'a');
  assert.equal(anchor.textContent, '<b>清</b>');
  assert.equal(anchor.href, '?view=all&card=qing#notes');
  assert.equal(anchor.dataset.cardId, 'qing');
  const encoded = { ...cards[0], id: 'qing / era' };
  links.appendRichText(container, '[[Qing]]', { registry: links.createRegistry([encoded]) });
  assert.equal(container.children[2].href, '?card=qing%20%2F%20era');
});
