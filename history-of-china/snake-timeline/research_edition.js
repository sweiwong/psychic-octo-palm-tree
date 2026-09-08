// Shared by the note-link validator and the reading export.
const expand = require('./catalog_adapter');
const tang = require('./tang_data');
const packs = ['early_research', 'medieval_research', 'medieval_culture',
  'late_imperial_research', 'modern_research', 'chart_research', 'cambridge_research']
  .map(name => require('./' + name));

const research = expand(require('./history_data'), require('./catalog_data'),
  [...require('./supplemental_data'), ...tang.events, ...packs.flatMap(pack => pack.events)],
  expand.mergeRevisions(tang.revisions, require('./research_revisions'), ...packs.map(pack => pack.revisions)));
const pinyin = Object.assign({}, require('./pinyin_data'), ...packs.map(pack => pack.pinyin));

module.exports = { research, pinyin };
