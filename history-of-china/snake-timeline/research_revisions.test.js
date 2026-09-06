const test=require('node:test');
const assert=require('node:assert/strict');
const expand=require('./catalog_adapter.js');
const core=require('./history_data.js');
const catalog=require('./catalog_data.js');
const supplement=require('./supplemental_data.js');
const tang=require('./tang_data.js');
const revisions=require('./research_revisions.js');
const pinyin=require('./pinyin_data.js');

test('Ming capital revision promotes the existing card and preserves its earlier date',()=>{
  const app=expand(core,catalog,[...supplement,...tang.events],{...tang.revisions,...revisions});
  const card=app.all.find(item=>item.id==='catalog-C_BEIJING_MING');
  assert.equal(app.all.length,141);
  assert.equal(card.start,1421);
  assert.equal(card.end,1421);
  assert.deepEqual(card.catalogDates,{start:1420,end:1420});
  assert.ok(app.events.includes(card));
  assert.ok(app.all.find(item=>item.id==='ming').related.includes(card.id));
  assert.equal(card.sections.length,2);
  for(const source of revisions['catalog-C_BEIJING_MING'].sources)assert.ok(card.sources.includes(source));
  assert.ok(pinyin[card.nameZh]);
  assert.ok(pinyin[card.han]);
  for(const id of card.related)assert.ok(app.all.some(item=>item.id===id));
});
