const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const links = require('./internal_links');

// Follow index.html's real script order, then run the application's assembly before its UI starts.
const context = vm.createContext({});
const index = fs.readFileSync(__dirname + '/index.html', 'utf8');
for (const [, name] of index.matchAll(/<script defer src="([^"?]+)(?:\?[^\"]*)?"><\/script>/g)) {
  const source = fs.readFileSync(__dirname + '/' + name, 'utf8');
  vm.runInContext(name === 'app.js' ? source.split('(() => {')[0] : source, context, { filename: name });
}
const cards = JSON.parse(vm.runInContext('JSON.stringify(EXHIBITION.all)', context));

test('all 221 assembled cards have unique IDs, stable titles and resolvable links', () => {
  assert.equal(cards.length, 221);
  assert.equal(new Set(cards.map(card => card.id)).size, 221);
  assert(cards.every(card => typeof card.linkTitle === 'string' && card.linkTitle.trim()));
  assert.equal(new Set(cards.map(card => links.normalizeTitle(card.linkTitle))).size, 221);
  const result = links.validateCards(cards);
  assert.deepEqual(result.errors, [], result.errors.map(error => error.message).join('\n'));
  for (const card of cards) for (const alias of card.linkAliases || []) {
    assert.equal(links.resolveTarget(result.registry, {target: alias, targetKind: 'title'}).id, card.id);
  }
});

test('a broken production-style fixture names the source, field, target and suggestion', () => {
  const broken = cards.map(card => card.id === 'an-lushan' ? {...card, description: 'See [[Three Kingdms]].'} : card);
  const { errors } = links.validateCards(broken);
  assert.equal(errors.length, 1);
  assert.equal(errors[0].sourceId, 'an-lushan');
  assert.equal(errors[0].field, 'description');
  assert.equal(errors[0].target, 'Three Kingdms');
  assert.equal(errors[0].suggestion, 'Three Kingdoms');
});

test('representative production links resolve and generate backlinks', () => {
  const { graph, errors } = links.validateCards(cards);
  assert.deepEqual(errors, []);
  for (const [source, target] of [['catalog-E_3K_2', 'three-kingdoms'], ['tang', 'an-lushan'], ['early-qing', 'qing']]) {
    assert(graph.outbound.get(source).includes(target), source + ' links to ' + target);
    assert(graph.backlinks.get(target).some(card => card.id === source), target + ' links back to ' + source);
  }
});
