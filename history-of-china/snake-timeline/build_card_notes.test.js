const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const build = require('./build_card_notes');

test('rebuilding reads saved note edits and emits the same pack for browser and export', t => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'tang-notes-test-'));
  t.after(() => fs.rmSync(folder, { recursive: true, force: true }));
  const output = path.join(folder, 'compiled.js');
  const note = '---\ntitle: Tang\nlink-title: Tang\n---\nFirst version.\n\n## Government\nText.\n\n## Culture\nText.\n';
  fs.writeFileSync(path.join(folder, 'tang.md'), note);
  build(folder, output);
  assert.equal(fs.existsSync(output), true, 'The build creates the browser pack.');
  fs.writeFileSync(path.join(folder, 'tang.md'), note.replace('First version.', 'Revised in Obsidian.'));
  build(folder, output);
  const source = fs.readFileSync(output, 'utf8');
  const context = vm.createContext({});
  vm.runInContext(source, context);
  const browserPack = JSON.parse(vm.runInContext('JSON.stringify(CARD_NOTES)', context));
  assert.equal(browserPack.revisions.tang.description, 'Revised in Obsidian.');
  assert.deepEqual(require(output), browserPack);
  build(folder, output);
  assert.equal(fs.readFileSync(output, 'utf8'), source, 'Unchanged notes produce identical output.');
  fs.writeFileSync(path.join(folder, 'tang.md'), note.replace('First version.', '[[missing]]'));
  assert.throws(() => build(folder, output), /missing/);
  assert.equal(fs.readFileSync(output, 'utf8'), source, 'A broken note leaves the last good output intact.');
});

test('the build resolves links against actual atlas records, not only migrated notes', t => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'tang-links-test-'));
  t.after(() => fs.rmSync(folder, { recursive: true, force: true }));
  const filename = path.join(folder, 'tang.md');
  const output = path.join(folder, 'compiled.js');
  const note = '---\ntitle: Tang\nlink-title: Tang\n---\nRead [Northern Wei](../index.html?card=catalog-R_NS_NORTHERN_WEI).\n\n## Government\nText.\n\n## Culture\nText.\n';
  fs.writeFileSync(filename, note);
  assert.equal(build(folder, output).revisions.tang.description, 'Read [[id:catalog-R_NS_NORTHERN_WEI|Northern Wei]].');
  fs.writeFileSync(filename, note.replace('catalog-R_NS_NORTHERN_WEI', 'no-such-card'));
  assert.throws(() => build(folder, output), /no-such-card/);
});
