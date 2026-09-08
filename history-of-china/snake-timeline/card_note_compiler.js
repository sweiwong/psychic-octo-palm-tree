'use strict';
const YAML = require('yaml');
const links = require('./internal_links');

function parseNote(source, filename) {
  const fail = message => { throw new Error(`${filename}: ${message}`); };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(filename)) fail('Use the stable card ID as the filename.');
  const match = source.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) fail('Start with YAML properties between --- lines.');
  const [, properties, markdown] = match;
  // Links to cards outside this notes folder open the atlas from Obsidian too.
  const body = markdown.replace(/\[([^\[\]\n]+)\]\(\.\.\/index\.html\?card=([a-zA-Z0-9_-]+)\)/g,
    (_, label, id) => `[[id:${id}|${label}]]`);
  let metadata;
  try { metadata = YAML.parse(properties); }
  catch (error) { fail(error.message); }
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) fail('Expected properties.');
  for (const key of Object.keys(metadata)) {
    if (!['title', 'link-title', 'aliases', 'annotate-names'].includes(key)) fail(`Unsupported property: ${key}`);
  }
  for (const key of ['title', 'link-title']) {
    if (typeof metadata[key] !== 'string' || !metadata[key].trim()) fail(`Expected a nonempty ${key}.`);
  }
  if (metadata.aliases !== undefined && (!Array.isArray(metadata.aliases)
      || metadata.aliases.some(alias => typeof alias !== 'string' || !alias.trim()))) fail('Expected aliases to be a list of names.');
  if (metadata['annotate-names'] !== undefined && typeof metadata['annotate-names'] !== 'boolean') fail('annotate-names must be true or false.');
  // The atlas renders paragraphs and wiki links, not a general Markdown document.
  if (/!\[\[/.test(body) || /^(?:#{1}(?!# )|#{3,}|\s*[-*+] |\s*\d+\. |>|---|\s{4})|[`*_]|\]\(|%%|==/m.test(body.replace(/\[\[[^\]]*\]\]/g, 'link'))) {
    fail('Unsupported format. Use paragraphs, ## headings and [[filename|label]] links.');
  }
  const [introduction, ...parts] = body.trim().split(/^## /m);
  const sections = parts.map(part => {
    const newline = part.indexOf('\n');
    if (newline < 0) fail('Introduction or section is empty.');
    return { title: part.slice(0, newline).trim(), text: part.slice(newline + 1).trim() };
  });
  if (sections.slice(0, -1).some(section => section.title === 'Note')) fail('The Note section must be last.');
  if (!introduction.trim() || sections.some(section => !section.title || !section.text)) fail('Introduction or section is empty.');
  const note = sections.at(-1)?.title === 'Note' ? sections.pop().text : undefined;
  if (sections.length < 2) fail('Include at least two reading sections.');
  return {
    id: filename.slice(0, -3), name: metadata.title, linkTitle: metadata['link-title'],
    linkAliases: metadata.aliases || [], description: introduction.trim(), sections,
    ...(metadata['annotate-names'] !== undefined ? { annotateNames: metadata['annotate-names'] } : {}),
    ...(note !== undefined || metadata['annotate-names'] === false ? { note: note ?? '' } : {}),
  };
}

function compileNotes(files, atlasIds = []) {
  const cards = Object.entries(files).sort(([a], [b]) => a.localeCompare(b))
    .map(([filename, source]) => parseNote(source, filename));
  const ids = new Set(cards.map(card => card.id));
  const availableIds = new Set([...atlasIds, ...ids]);
  function convert(text, card, field) {
    try {
      return links.parse(text).map(token => {
        if (token.type === 'text') return token.value;
        const id = token.target.replace(/\.md$/, '');
        if (!(token.targetKind === 'id' ? availableIds.has(id) : ids.has(id))) {
          throw new Error(`No note for [[${token.target}]]. Use a filename in the pilot folder.`);
        }
        return `[[id:${id}|${token.label}]]`;
      }).join('');
    } catch (error) { throw new Error(`${card.id}.md, ${field}: ${error.message}`); }
  }
  const compiled = cards.map(card => ({
    ...card,
    description: convert(card.description, card, 'introduction'),
    sections: card.sections.map(section => ({
      title: convert(section.title, card, 'section heading'),
      text: convert(section.text, card, section.title),
    })),
    ...(card.note !== undefined ? { note: convert(card.note, card, 'Note') } : {}),
  }));
  const references = [...availableIds].filter(id => !ids.has(id)).map(id => ({ id, linkTitle: `Atlas card: ${id}` }));
  const { errors } = links.validateCards([...compiled, ...references]);
  if (errors.length) throw new Error(errors.map(error => error.message).join('\n'));
  return { revisions: Object.fromEntries(compiled.map(({ id, ...prose }) => [id, prose])) };
}

module.exports = { parseNote, compileNotes };
