const path = require('node:path');
const fs = require('node:fs');
const { compileNotes } = require('./card_note_compiler');

function buildCardNotes(directory = path.join(__dirname, 'card-notes'), output = path.join(__dirname, 'card_notes.js')) {
  const files = Object.fromEntries(fs.readdirSync(directory)
    .filter(name => name.endsWith('.md') && name !== 'README.md')
    .map(name => [name, fs.readFileSync(path.join(directory, name), 'utf8')]));
  const atlasIds = require('./research_edition').research.all.map(card => card.id);
  const pack = compileNotes(files, atlasIds);
  const source = '// Generated from card-notes/*.md by build_card_notes.js. Edit the notes.\n'
    + 'var CARD_NOTES = ' + JSON.stringify(pack, null, 2) + ';\n'
    + "if (typeof module !== 'undefined' && module.exports) module.exports = CARD_NOTES;\n";
  fs.writeFileSync(output, source);
  return pack;
}

if (require.main === module) buildCardNotes();
module.exports = buildCardNotes;
