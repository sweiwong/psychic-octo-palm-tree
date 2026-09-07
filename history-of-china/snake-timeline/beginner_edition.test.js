const test=require('node:test');
const assert=require('node:assert/strict');
const expand=require('./catalog_adapter');
const tang=require('./tang_data');
const packs=['early_research','medieval_research','medieval_culture','late_imperial_research','modern_research','chart_research','cambridge_research'].map(name=>require('./'+name));
const original=expand(require('./history_data'),require('./catalog_data'),[...require('./supplemental_data'),...tang.events,...packs.flatMap(pack=>pack.events)],expand.mergeRevisions(tang.revisions,require('./research_revisions'),...packs.map(pack=>pack.revisions)));
const editorial=['early','middle','late'].map(era=>require('./beginner_'+era));
const apply=require('./beginner_edition');
const snapshot=JSON.stringify(original);
const edition=apply(original,...editorial);
const saved=require('./data/china_history_expanded.json');
const images=require('./image_data');

test('beginner edition removes only the approved enrichment card and retains every original source',()=>{
 assert.equal(original.all.length,221);
 assert.equal(edition.all.length,221);
 assert.equal(new Set(edition.all.map(card=>card.id)).size,221);
 assert(!edition.all.some(card=>card.id==='taiwan-democratization'));
 assert(!edition.events.some(card=>card.id==='taiwan-democratization'));
 assert(edition.all.some(card=>card.id==='roc-taiwan'));
 assert.deepEqual(edition.sourceMap,original.sourceMap);
 for(const id of Object.values(edition.sourceMap))assert(edition.all.some(card=>card.id===id),id);
 for(const card of edition.all){
  if(card.kind==='theme')continue;
  const old=original.all.find(item=>item.id===card.id);
  for(const key of ['start','end','dateLabel','dateReview','approx','nameZh','han','sources','sourceLabels','sourceIds','parent','ranges'])assert.deepEqual(card[key],old[key],card.id+' '+key);
  assert.deepEqual(card.related.filter(id=>!['confucianism-daoism','southward-economic-shift'].includes(id)),old.related.filter(id=>!['taiwan-democratization','southward-economic-shift'].includes(id)),card.id+' related');
  assert(images[card.id],card.id+' image retained');
 }
 assert.equal(JSON.stringify(original),snapshot,'research input is not mutated');
 for(const key of ['periods','states','events'])for(const card of edition[key]){
  const old=original[key].find(item=>item.id===card.id);
  for(const field of ['start','end','ranges','offset'])assert.deepEqual(card[field],old[field],card.id+' drawing '+field);
 }
});
test('requested titles keep their full context and previous names remain searchable',()=>{
 for(const[id,name]of [['war-japan','Second World War: War with Japan'],['abdication','End of Imperial China'],['zheng-he','Ming Voyages']]){
  const card=edition.all.find(item=>item.id===id);assert.equal(card.name,name);assert(card.searchAliases.includes(original.all.find(item=>item.id===id).name));
 }
 const war=edition.all.find(item=>item.id==='war-japan');assert.equal(war.start,1937);assert.equal(war.end,1945);
 const end=edition.all.find(item=>item.id==='abdication');assert.equal(end.start,1912);assert.match(JSON.stringify(end),/12 February 1912/);assert.match(JSON.stringify(end),/1 January 1912/);
 assert.equal(edition.all.find(item=>item.id==='zheng-he').start,1405);
 const allCopy=edition.all.map(card=>[card.description,...card.sections.map(section=>section.text)].join(' ')).join('\n');
 assert.doesNotMatch(allCopy,/David Graff(?:’s|'s) research emphasizes/);
 for(const card of edition.all){assert(card.description.length>30,card.id);assert(card.sections?.length>=2,card.id+' sections');for(const section of card.sections)assert(section.title&&section.text.length>60,card.id+' useful paragraph');}
});
test('saved beginner edition exactly matches the assembled reader cards',()=>{
 assert.equal(saved.cardCount,221);
 assert.deepEqual(saved.cards.map(card=>card.id),edition.all.map(card=>card.id));
 const pinyin=Object.assign({},require('./pinyin_data'),...packs.map(pack=>pack.pinyin));
 for(const card of edition.all)assert.deepEqual(saved.cards.find(item=>item.id===card.id),{...card,pinyin:pinyin[card.nameZh],image:images[card.id]},card.id);
});
test('copy overrides cannot silently alter historical fields',()=>{
 assert.throws(()=>apply(original,{revisions:{qin:{name:'Qin'}}},{revisions:{qin:{name:'Duplicate'}}}),/Duplicate editorial card/);
 assert.throws(()=>apply(original,{revisions:{qin:{start:-220}}}),/Editorial field is not copy/);
 assert.throws(()=>apply(original,{revisions:{nonexistent:{name:'Unknown'}}}),/Unknown editorial card/);
});

test('Chinese names accompany people and places while romanized names remain searchable',()=>{
 const poetry=edition.all.find(card=>card.id==='li-bai-du-fu');
 assert.equal(poetry.name,'Li Bai (李白) and Du Fu (杜甫)');
 assert.match(poetry.description,/Li Bai \(李白\) and Du Fu \(杜甫\)/);
 assert(poetry.searchAliases.includes('Li Bai and Du Fu'));
 assert.match(edition.all.find(card=>card.id==='catalog-R_TEN_FORMER_SHU').description,/Wang Jian \(王建\)/);
 assert.match(edition.all.find(card=>card.id==='catalog-R_NS_LIU_SONG').description,/Emperor Wen \(宋文帝\)/);
 assert.match(edition.all.find(card=>card.id==='sui-grand-canal').note,/Emperor Wen \(隋文帝\)/);
 assert.match(edition.all.find(card=>card.id==='catalog-C_BEIJING_MING').name,/Beijing \(北京\)/);
 const repeated=apply(edition);
 assert.deepEqual(repeated.all.map(card=>[card.name,card.description,card.sections,card.note]),edition.all.map(card=>[card.name,card.description,card.sections,card.note]));
});

test('ideas overview is reading-only and replaces the birth marker',()=>{
 const theme=edition.all.find(card=>card.id==='confucianism-daoism');
 assert.equal(theme.showTimeline,false);
 assert.equal(theme.kind,'theme');
 assert.deepEqual(theme.related,['confucius','laozi','zhuangzi']);
 assert(edition.all.find(card=>card.id==='eastern-zhou').related.includes(theme.id));
 assert.equal(edition.all.find(card=>card.id==='confucius').showTimeline,false);
 assert(!edition.events.some(card=>card.id==='confucius'));
});

test('southward economic shift is an approximate process connected to Tang and Song',()=>{
 const card=edition.all.find(item=>item.id==='southward-economic-shift');
 assert(card);assert.equal(card.start,750);assert.equal(card.end,1250);assert.equal(card.approx,true);
 assert.match(card.dateLabel,/gradual transformation/);assert.match(card.note,/Earlier southward migrations/);
 assert(edition.events.some(item=>item.id===card.id));
 for(const id of ['an-lushan','tang','song','sui-grand-canal'])assert(edition.all.find(item=>item.id===id).related.includes(card.id));
 assert.match(card.sections[1].text,/western exchange continued/);
 assert.match(images[card.id].caption,/modern view/);
});

test('An Lushan card explains the rebellion and its consequences without treating lost registrations as deaths',()=>{
 const card=edition.all.find(item=>item.id==='an-lushan');
 assert(card);
 assert(card.sections.length>=4);
 const copy=[card.description,...card.sections.map(section=>section.title+' '+section.text),card.note].join(' ');
 assert.match(copy,/frontier|military governor/i);
 assert.match(copy,/Luoyang/);
 assert.match(copy,/Chang’an/);
 assert.match(copy,/Uyghur/);
 assert.match(copy,/displac|famine|refuge/i);
 assert.match(copy,/tax register/i);
 assert.match(copy,/cannot be (?:read|treated) directly as a death toll/i);
 assert.match(copy,/780|twice-yearly tax/i);
 assert.match(copy,/907/);
});
