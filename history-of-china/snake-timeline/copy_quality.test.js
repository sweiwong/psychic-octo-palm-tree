const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const expand = require('./catalog_adapter');
const tang = require('./tang_data');

const researchPacks = ['early_research', 'medieval_research', 'medieval_culture', 'late_imperial_research', 'modern_research', 'chart_research', 'cambridge_research'].map(name => require('./' + name));
const research = expand(
  require('./history_data'),
  require('./catalog_data'),
  [...require('./supplemental_data'), ...tang.events, ...researchPacks.flatMap(pack => pack.events)],
  expand.mergeRevisions(tang.revisions, require('./research_revisions'), ...researchPacks.map(pack => pack.revisions))
);
const exhibition = require('./beginner_edition')(research, ...['early', 'middle', 'late'].map(era => require('./beginner_' + era)));
const images = require('./image_data');

const bannedWords = /\b(?:delve|foster|leverage|utilize|facilitate|empower|streamline|robust|cutting-edge|paradigm shift|game changer|tapestry|multifaceted|meticulous|intricate|paramount|transformative|elevate|embark|supercharge|harness|ever-evolving)\b/i;
const cannedAnalysis = /\b(?:help(?:s|ed)? explain|this (?:helps|shows|makes|means)|this is why|these? distinctions? (?:helps?|matters)|(?:its|their|the) (?:historical )?(?:importance|significance) (?:lies|is)|important part|larger (?:history|story|lesson)|broader (?:history|story|lesson)|why it matters|makes? sense)\b/i;

test('all visible card and image copy passes the no-slop checks', () => {
  assert.equal(exhibition.all.length, 221);
  for (const card of exhibition.all) {
    assert.equal(card.significance, undefined, card.id + ': generic significance copy stays out of the reader');
    for (const section of card.sections || []) assert.doesNotMatch(section.title, /\?$/, card.id + ': use a direct section heading');
    const copy = [card.description, card.note, ...(card.sections || []).flatMap(section => [section.title, section.text])].filter(Boolean).join('\n');
    assert.doesNotMatch(copy, bannedWords, card.id + ': banned AI wording');
    assert.doesNotMatch(copy, cannedAnalysis, card.id + ': state the point directly');
    assert.doesNotMatch(copy, /—/, card.id + ': no em dashes');
  }
  for (const [id, image] of Object.entries(images)) {
    const copy = [image.alt, image.caption].filter(Boolean).join('\n');
    assert.doesNotMatch(copy, bannedWords, id + ': image copy');
    assert.doesNotMatch(copy, /—/, id + ': no em dashes');
  }
});

test('the interface does not restore the removed slogans or story metaphors', () => {
  const source = ['index.html', 'app.js', 'map_data.js'].map(file => fs.readFileSync(path.join(__dirname, file), 'utf8')).join('\n');
  assert.doesNotMatch(source, /Time is precise\. History has edges\.|Made for curiosity\. Read with context\.|Why it matters/i);
  assert.doesNotMatch(source, /HOW TO READ THE THREAD|A MOMENT IN HISTORY|ALONGSIDE THE THREAD|ON THE THREAD|Read story|Browse all stories|Place this story/i);
  assert.doesNotMatch(source, bannedWords);
  assert.doesNotMatch(source, /—/);
});
