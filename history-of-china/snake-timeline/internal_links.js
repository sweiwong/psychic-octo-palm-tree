(function (root) {
  'use strict';

  function normalizeTitle(value) {
    return String(value).normalize('NFKC').normalize('NFD').replace(/\p{M}/gu, '')
      .trim().replace(/\s+/g, ' ').toLowerCase();
  }

  function parse(value) {
    const text = String(value || '');
    const tokens = [];
    let cursor = 0;
    const brackets = /\[\[|\]\]/g;
    let match;
    while ((match = brackets.exec(text))) {
      const start = match.index;
      const end = text.indexOf(']]', start + 2);
      const written = text.slice(start + 2, end < 0 ? text.length : end);
      const parts = written.split('|');
      const target = parts[0].trim();
      const label = parts.length === 2 ? parts[1] : target;
      const targetKind = target.startsWith('id:') ? 'id' : 'title';
      if (match[0] !== '[[' || end < 0 || /[\[\]]/.test(written) || text[end + 2] === ']'
          || parts.length > 2 || !target || !label.trim() || (targetKind === 'id' && !target.slice(3).trim())) {
        throw Object.assign(new Error(`Malformed internal link at ${start}: ${written}`), {
          code: 'malformed-link', position: start, target: written,
        });
      }
      if (start > cursor) tokens.push({ type: 'text', value: text.slice(cursor, start) });
      tokens.push({ type: 'link', target: targetKind === 'id' ? target.slice(3).trim() : target, label, targetKind });
      cursor = end + 2;
      brackets.lastIndex = cursor;
    }
    if (cursor < text.length) tokens.push({ type: 'text', value: text.slice(cursor) });
    return tokens;
  }

  function plainText(value) {
    return parse(value).map(token => token.type === 'text' ? token.value : token.label).join('');
  }

  function cardTitle(card) {
    return card.linkTitle || card.name || card.title || card.id;
  }

  function issue(card, field, target, code, reason, suggestion) {
    return { sourceId: card.id, sourceTitle: cardTitle(card), field, target, code, suggestion,
      message: `Card "${cardTitle(card)}", field "${field}": [[${target}]] ${reason}.${suggestion ? ` Did you mean "${suggestion}"?` : ''}` };
  }

  function createRegistry(cards) {
    const registry = { ids: new Map(), titles: new Map(), errors: [] };
    function add(map, key, card, field) {
      if (map.has(key) && map.get(key) !== card) {
        registry.errors.push(issue(card, field, key, 'duplicate-identity', 'has a duplicate identity'));
        map.set(key, null); // An ambiguous identity must never resolve to the first card.
      } else map.set(key, card);
    }
    for (const card of cards) {
      add(registry.ids, card.id, card, 'id');
      add(registry.titles, normalizeTitle(cardTitle(card)), card, 'linkTitle');
      for (const alias of card.linkAliases || []) add(registry.titles, normalizeTitle(alias), card, 'linkAliases');
    }
    return registry;
  }

  function resolveTarget(registry, link) {
    return (link.targetKind === 'id' ? registry.ids.get(link.target) : registry.titles.get(normalizeTitle(link.target))) || null;
  }

  function scanCard(card) {
    const fields = [{ field: 'description', value: card.description }];
    (card.sections || []).forEach((section, index) => {
      fields.push({ field: `sections[${index}].title`, value: section.title });
      fields.push({ field: `sections[${index}].text`, value: section.text });
    });
    fields.push({ field: 'note', value: card.note });
    return fields.filter(item => typeof item.value === 'string');
  }

  function editDistance(a, b) {
    let row = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 0; i < a.length; i++) {
      const next = [i + 1];
      for (let j = 0; j < b.length; j++) next.push(Math.min(next[j] + 1, row[j + 1] + 1, row[j] + (a[i] === b[j] ? 0 : 1)));
      row = next;
    }
    return row[b.length];
  }

  function suggest(registry, link) {
    const target = link.targetKind === 'id' ? link.target : normalizeTitle(link.target);
    const names = link.targetKind === 'id' ? registry.ids : registry.titles;
    let best = Math.max(1, Math.floor(target.length / 4));
    let suggestion;
    for (const [name, card] of names) {
      if (!card) continue;
      const distance = editDistance(target, name);
      if (distance <= best) { best = distance; suggestion = link.targetKind === 'id' ? card.id : cardTitle(card); }
    }
    return suggestion;
  }

  function createGraph(cards, registry) {
    const outbound = new Map();
    const backlinks = new Map(cards.map(card => [card.id, []]));
    const errors = [];
    for (const card of cards) {
      const targets = new Set();
      for (const { field, value } of scanCard(card)) {
        let tokens;
        try { tokens = parse(value); }
        catch (error) {
          errors.push(issue(card, field, error.target, error.code, 'has malformed syntax'));
          continue;
        }
        for (const token of tokens.filter(token => token.type === 'link')) {
          const target = resolveTarget(registry, token);
          if (target) targets.add(target.id);
          else errors.push(issue(card, field, token.target, 'unknown-target', 'has no unambiguous target', suggest(registry, token)));
        }
      }
      outbound.set(card.id, [...targets]);
      for (const id of targets) if (id !== card.id) backlinks.get(id).push(card);
    }
    for (const sources of backlinks.values()) sources.sort((a, b) => (a.start ?? 0) - (b.start ?? 0) || cardTitle(a).localeCompare(cardTitle(b)));
    return { outbound, backlinks, errors };
  }

  function validateCards(cards) {
    const registry = createRegistry(cards);
    if (registry.errors.length) return { registry, errors: registry.errors };
    const graph = createGraph(cards, registry);
    const errors = [...graph.errors];
    for (const card of cards) {
      const supported = new Set(scanCard(card).map(item => item.field));
      function visit(value, field) {
        if (typeof value === 'string' && /\[\[|\]\]/.test(value) && !supported.has(field)) {
          errors.push(issue(card, field, value, 'unsupported-field', 'uses links in an unsupported field'));
        } else if (Array.isArray(value)) value.forEach((item, index) => visit(item, `${field}[${index}]`));
        else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => visit(item, field ? `${field}.${key}` : key));
      }
      visit(card, '');
    }
    return { registry, graph, errors };
  }

  function appendRichText(container, value, options) {
    const document = container.ownerDocument;
    for (const token of parse(value)) {
      if (token.type === 'text') {
        container.appendChild(document.createTextNode(token.value));
        continue;
      }
      const card = resolveTarget(options.registry, token);
      if (!card) throw new Error('Unresolved internal link: ' + token.target);
      const anchor = document.createElement('a');
      anchor.textContent = token.label;
      anchor.href = options.href ? options.href(card.id) : '?card=' + encodeURIComponent(card.id);
      anchor.dataset.cardId = card.id;
      anchor.className = 'internal-link';
      container.appendChild(anchor);
    }
  }

  const api = { normalizeTitle, parse, plainText, createRegistry, resolveTarget, scanCard, createGraph, validateCards, appendRichText };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.InternalLinks = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
