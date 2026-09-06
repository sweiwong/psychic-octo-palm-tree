const test=require('node:test');
const assert=require('node:assert/strict');
const expand=require('./catalog_adapter');
const core=require('./history_data'),catalog=require('./catalog_data'),tang=require('./tang_data');
const packs=['early_research','medieval_research','medieval_culture','late_imperial_research','modern_research'].map(n=>require('./'+n));
const base=expand(core,catalog,[...require('./supplemental_data'),...tang.events],{...tang.revisions,...require('./research_revisions')});
const exhibition=expand(core,catalog,[...require('./supplemental_data'),...tang.events,...packs.flatMap(p=>p.events)],Object.assign({},tang.revisions,require('./research_revisions'),...packs.map(p=>p.revisions)));
const all=exhibition.all,ids=new Set(all.map(x=>x.id));
const pinyin=Object.assign({},require('./pinyin_data'),...packs.map(p=>p.pinyin));
test('184 complete cards preserve all 111 source mappings and earlier sources',()=>{
 assert.equal(all.length,184);assert.equal(ids.size,184);
 assert.deepEqual(exhibition.sourceMap,base.sourceMap);
 for(const old of base.all){
  const current=all.find(x=>x.id===old.id);assert.ok(current,old.id);
  for(const url of old.sources)assert.ok(current.sources.includes(url),old.id+' source retention');
 }
 assert.deepEqual(exhibition.periods,core.periods);
});
test('Every card has substantive analysis, sources, valid dates, pinyin and working relationships',()=>{
 for(const x of all){
  assert.ok(x.start!==0&&x.end!==0&&x.start<=x.end,x.id+' dates');
  assert.ok(x.sections.length>=2,x.id+' sections');
  assert.ok([x.description,...x.sections.map(s=>s.text)].join(' ').split(/\s+/).length>=110,x.id+' depth');
  assert.ok(x.sources.length>=1,x.id+' source');x.sources.forEach(s=>assert.equal(new URL(s).protocol,'https:'));
  assert.ok(!/draft|pending|awaiting/i.test(x.evidence||''),x.id+' unresolved evidence');
  assert.ok(pinyin[x.nameZh],x.id+' name pinyin');assert.ok(pinyin[x.han],x.id+' glyph pinyin');
  for(const id of x.related||[])assert.ok(ids.has(id),x.id+' relation '+id);
  if(x.parent)assert.ok(ids.has(x.parent),x.id+' parent');
 }
});
test('Laozi distinguishes uncertain identity from textual formation; Tang analysis survives',()=>{
 const lao=all.find(x=>/laozi/i.test(x.id));assert.ok(lao.approx);
 assert.match(JSON.stringify(lao),/text|compil/i);assert.match(JSON.stringify(lao),/uncertain|disput|cannot/i);
 for(const id of ['an-lushan','talas','two-tax','huang-chao'])assert.deepEqual(all.find(x=>x.id===id).sections,base.all.find(x=>x.id===id).sections);
});
