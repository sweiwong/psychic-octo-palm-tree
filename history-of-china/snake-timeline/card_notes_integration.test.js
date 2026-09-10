const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const links = require('./internal_links');
const { compileNotes } = require('./card_note_compiler');

function browserCards(notesScript) {
  const context = vm.createContext({});
  const index = fs.readFileSync(__dirname + '/index.html', 'utf8');
  for (const [, name] of index.matchAll(/<script defer src="([^"?]+)(?:\?[^\"]*)?"><\/script>/g)) {
    let source = fs.readFileSync(__dirname + '/' + name, 'utf8');
    if (name === 'card_notes.js' && notesScript) source += notesScript;
    vm.runInContext(name === 'app.js' ? source.split('(() => {')[0] : source, context, { filename: name });
  }
  return JSON.parse(vm.runInContext('JSON.stringify(EXHIBITION.all)', context));
}

test('browser uses generated note edits while preserving historical records', () => {
  const baseline = browserCards();
  const edited = browserCards(`\nCARD_NOTES.revisions.tang.description = 'An edit from the Tang note.';`);
  assert.equal(edited.find(card => card.id === 'tang').description, 'An edit from the Tang note.');
  assert.equal(edited.length, 223);
  for (const card of edited) {
    const original = baseline.find(item => item.id === card.id);
    assert.deepEqual({ ...card, description: original.description }, original);
  }
});

test('all twenty-one authored notes are connected and the saved site pack matches their current text', () => {
  const notes = Object.fromEntries(fs.readdirSync(__dirname + '/card-notes')
    .filter(name => name.endsWith('.md') && name !== 'README.md')
    .map(name => [name, fs.readFileSync(__dirname + '/card-notes/' + name, 'utf8')]));
  const compiled = compileNotes(notes, browserCards().map(card => card.id));
  assert.equal(Object.keys(compiled.revisions).length, 21);
  assert.deepEqual(require('./card_notes'), compiled, 'Rebuild after editing notes.');
  const { graph, errors } = links.validateCards(browserCards());
  assert.deepEqual(errors, []);
  for (const id of Object.keys(compiled.revisions)) {
    assert(graph.outbound.get(id).some(target => target !== id), id + ' has a useful outgoing link');
    assert(graph.backlinks.get(id).length > 0, id + ' can be reached from another note');
  }
  assert(graph.outbound.get('an-lushan').includes('li-bai-du-fu'));
  assert(graph.outbound.get('xuanwu-gate').includes('zhenguan-government'));
});

test('the Tang card matches the approved prose and all 27 approved link destinations', () => {
  const approved = fs.readFileSync(__dirname + '/fixtures/tang-approved.md', 'utf8')
    .split('**618–907**\n\n')[1].split('\n\n**Word count:')[0].trim();
  const plain = approved.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  const [description, ...parts] = plain.split(/^## /m);
  const sections = parts.map(part => {
    const newline = part.indexOf('\n');
    return { title: part.slice(0, newline).trim(), text: part.slice(newline + 1).trim() };
  });
  const cards = browserCards();
  const tang = cards.find(card => card.id === 'tang');
  assert.equal(links.plainText(tang.description), description.trim());
  assert.deepEqual(tang.sections.map(section => ({
    title: links.plainText(section.title), text: links.plainText(section.text),
  })), sections);
  assert.equal(tang.note, '', 'Do not append the superseded caveat.');
  const destinations = [...approved.matchAll(/\?card=([^)]*)\)/g)].map(match => decodeURIComponent(match[1]));
  const { graph, errors } = links.validateCards(cards);
  assert.deepEqual(errors, []);
  assert.equal(destinations.length, 27);
  assert.deepEqual(graph.outbound.get('tang'), destinations);
});
