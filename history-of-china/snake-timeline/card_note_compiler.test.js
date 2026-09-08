const test = require('node:test');
const assert = require('node:assert/strict');
const { parseNote, compileNotes } = require('./card_note_compiler');
const links = require('./internal_links');

const example = `---
title: Tang court
link-title: Tang
aliases:
  - Tang dynasty
---

The first paragraph.

The second paragraph includes [[an-lushan|the rebellion]].

## Government

First line
continues here.

## Culture

Another paragraph.

## Note

A dating qualification.
`;

test('note edits supply the displayed title, full prose, aliases and caveat', () => {
  assert.deepEqual(parseNote(example, 'tang.md'), {
    id: 'tang', name: 'Tang court', linkTitle: 'Tang', linkAliases: ['Tang dynasty'],
    description: 'The first paragraph.\n\nThe second paragraph includes [[an-lushan|the rebellion]].',
    sections: [
      { title: 'Government', text: 'First line\ncontinues here.' },
      { title: 'Culture', text: 'Another paragraph.' },
    ],
    note: 'A dating qualification.',
  });
});

test('notes can link to existing atlas cards that have not moved into the notes folder', () => {
  const source = example.replace('[[an-lushan|the rebellion]]', '[Northern Wei](../index.html?card=catalog-R_NS_NORTHERN_WEI)');
  const pack = compileNotes({ 'tang.md': source }, ['catalog-R_NS_NORTHERN_WEI']);
  assert.match(pack.revisions.tang.description, /\[\[id:catalog-R_NS_NORTHERN_WEI\|Northern Wei\]\]/);
  assert.throws(() => compileNotes({ 'tang.md': source }, []), /Northern Wei|catalog-R_NS_NORTHERN_WEI/);
});

test('an exact-copy note can disable automatic annotations and clear an inherited caveat', () => {
  const source = example.replace('title: Tang court', 'title: Tang court\nannotate-names: false')
    .replace('## Note\n\nA dating qualification.\n', '');
  const note = parseNote(source, 'tang.md');
  assert.equal(note.annotateNames, false);
  assert.equal(note.note, '');
});

test('native filename links compile into working atlas links and automatic backlinks', () => {
  const files = {
    'tang.md': example,
    'an-lushan.md': example.replace('title: Tang court', 'title: An Lushan Rebellion')
      .replace('link-title: Tang', 'link-title: An Lushan Rebellion')
      .replace('Tang dynasty', 'An Shi Rebellion')
      .replace('[[an-lushan|the rebellion]]', '[[tang]]'),
  };
  const pack = compileNotes(files);
  assert.equal(pack.revisions.tang?.description, 'The first paragraph.\n\nThe second paragraph includes [[id:an-lushan|the rebellion]].');
  assert.equal(pack.revisions['an-lushan'].description, 'The first paragraph.\n\nThe second paragraph includes [[id:tang|tang]].');
  const cards = Object.entries(pack.revisions).map(([id, prose]) => ({ id, ...prose }));
  const result = links.validateCards(cards);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.graph.outbound.get('tang'), ['an-lushan']);
  assert.deepEqual(result.graph.backlinks.get('tang').map(card => card.id), ['an-lushan']);
});

test('missing notes, malformed links and duplicate identities stop compilation', () => {
  assert.throws(() => compileNotes({ 'tang.md': example }), /tang\.md.*an-lushan/);
  assert.throws(() => compileNotes({ 'tang.md': example.replace('[[an-lushan|the rebellion]]', '[[broken') }), /tang\.md.*Malformed/);
  assert.throws(() => compileNotes({ 'tang.md': example, 'an-lushan.md': example }), /duplicate identity/);
});

test('invalid notes name the file and stop instead of losing or ignoring edits', () => {
  const invalid = [
    [example.replace('title: Tang court', 'title: 618'), /title/],
    [example.replace('link-title: Tang', 'link-title: Tang\nstart: 700'), /start/],
    [example.replace('  - Tang dynasty', '  - 618'), /aliases/],
    [example.replace('## Government', '### Government'), /format/],
    [example.replace('Another paragraph.', '![[tang]]'), /format/],
    [example.replace('Another paragraph.', '**Bold prose**'), /format/],
    [example + '\n## After the note\nMore text.', /Note/],
    [example.replace('Another paragraph.', ''), /empty/],
    [example.replace('---\n', ''), /properties/],
    [example.replace('title: Tang court', 'title: Tang court\ntitle: Other'), /unique/],
  ];
  for (const [source, reason] of invalid) {
    assert.throws(() => parseNote(source, 'tang.md'), error => {
      assert.match(error.message, /tang\.md/);
      assert.match(error.message, reason);
      return true;
    });
  }
});

test('a final heading without body text is rejected instead of becoming invented prose', () => {
  for (const ending of ['## Empty', '## Empty\n', '## Note\n\n']) {
    const source = example.replace('## Note\n\nA dating qualification.\n', ending);
    assert.throws(() => parseNote(source, 'tang.md'), /tang\.md: Introduction or section is empty/);
  }
});
