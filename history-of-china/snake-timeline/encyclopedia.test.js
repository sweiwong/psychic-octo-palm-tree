const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const expand=require('./catalog_adapter'),tang=require('./tang_data');
const chart=require('./chart_research');
const cambridge=require('./cambridge_research');
const packs=['early_research','medieval_research','medieval_culture','late_imperial_research','modern_research'].map(name=>require('./'+name));
const base=expand(require('./history_data'),require('./catalog_data'),[...require('./supplemental_data'),...tang.events,...packs.flatMap(p=>p.events)],expand.mergeRevisions(tang.revisions,require('./research_revisions'),...packs.map(p=>p.revisions)));
const full=expand(require('./history_data'),require('./catalog_data'),[...require('./supplemental_data'),...tang.events,...packs.flatMap(p=>p.events),...chart.events,...cambridge.events],expand.mergeRevisions(tang.revisions,require('./research_revisions'),...packs.map(p=>p.revisions),chart.revisions,cambridge.revisions));
const images=require('./image_data'),pinyin=Object.assign({},require('./pinyin_data'),...packs.map(p=>p.pinyin),chart.pinyin,cambridge.pinyin);
const reading=require('./beginner_edition')(full,...['early','middle','late'].map(era=>require('./beginner_'+era)));
test('Every source-chart subject resolves to a complete sourced card without losing earlier entries',()=>{
 assert.equal(full.all.length,base.all.length+chart.events.length+cambridge.events.length);
 assert.equal(new Set(full.all.map(c=>c.id)).size,full.all.length);
 assert.deepEqual(full.sourceMap,base.sourceMap);
 assert.ok(chart.coverage.length>=50,'Chart annotations, including duplicated themes, are accounted for');
 for(const subject of chart.coverage){
  assert.ok(subject.subject&&subject.ids.length,JSON.stringify(subject));
  for(const id of subject.ids)assert.ok(full.all.some(c=>c.id===id),subject.subject+' '+id);
 }
 for(const c of full.all){
  assert.ok(c.start!==0&&c.end!==0&&c.start<=c.end,c.id);
  assert.ok(c.description&&c.sections?.length>=2,c.id+' analysis');
  assert.ok(c.sources.length&&c.sources.every(s=>['http:', 'https:'].includes(new URL(s).protocol)),c.id+' sources');
  assert.ok(pinyin[c.nameZh]&&pinyin[c.han],c.id+' pinyin');
  for(const id of c.related||[])assert.ok(full.all.some(c=>c.id===id),c.id+' related '+id);
 }
 for(const old of base.all){
  const current=full.all.find(c=>c.id===old.id);
  assert.deepEqual(current.sections,old.sections,old.id+' earlier analysis retained');
  for(const source of old.sources)assert.ok(current.sources.includes(source),old.id+' source retained');
 }
});
test('Every encyclopedia card has an image with descriptive text and credited provenance',()=>{
 for(const card of reading.all){
  const img=images[card.id];assert.ok(img,card.id+' image');
  for(const key of ['src','alt','caption','credit','source','license','licenseUrl'])assert.ok(typeof img[key]==='string'&&img[key].length,card.id+' '+key);
  for(const key of ['src','source','licenseUrl'])assert.equal(new URL(img[key]).protocol,'https:',card.id+' '+key);
  assert.ok(img.width>0&&img.height>0,card.id+' dimensions');
 }
 assert.notEqual(images.abdication.src,images.republic.src,'abdication and republic use different images');
 assert.match(images.abdication.caption,/Puyi at age three in 1909/);
});
test('Every displayed card uses a different picture',()=>{
 const seenSources=new Map(),seenImages=new Map();
 const normalize=url=>url.replace(/^https?:\/\//,'').replace(/\/$/,'');
 for(const card of reading.all){
  const image=images[card.id],source=normalize(image.source),src=normalize(image.src);
  assert.equal(seenSources.has(source),false,card.id+' repeats the picture used by '+seenSources.get(source));
  assert.equal(seenImages.has(src),false,card.id+' repeats the image URL used by '+seenImages.get(src));
  seenSources.set(source,card.id);seenImages.set(src,card.id);
 }
});
test('Expanded JSON contains the same cards, illustrations and chart checklist as the website',()=>{
 const saved=JSON.parse(fs.readFileSync(path.join(__dirname,'data/china_history_expanded.json')));
 assert.equal(saved.cardCount,reading.all.length);
 assert.deepEqual(saved.chartCoverage,chart.coverage);
 for(const card of reading.all){
  const record=saved.cards.find(c=>c.id===card.id);
  assert.deepEqual(record,{...card,pinyin:pinyin[card.nameZh],...(images[card.id]?{image:images[card.id]}:{})},card.id);
 }
});
