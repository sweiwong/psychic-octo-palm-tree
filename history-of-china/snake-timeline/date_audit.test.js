const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const data=require('./data/china_history_expanded.json');
const audit=require('./data/date_audit.json');
const core=require('./history_data');
const byId=id=>data.cards.find(x=>x.id===id);

test('Every card has a date review and original source subjects remain available',()=>{
 assert.equal(data.cards.length,221);
 assert(!data.cards.some(card=>card.id==='taiwan-democratization'));
 assert(audit.records.some(card=>card.id==='taiwan-democratization'),'Removed reading card remains in the historical audit');
 assert.equal(new Set(audit.records.map(x=>x.id)).size,207);
 for(const card of data.cards){if(card.kind==='theme'){assert.equal(card.showTimeline,false);assert.match(card.note,/thematic introduction/);continue;}assert(audit.records.some(x=>x.id===card.id)||card.cambridge,card.id+' date review');assert(card.dateReview.sources.length);}
 assert.equal(data.sourceCount,111);
});
test('Mainland Republic period agrees in the ribbon and reading card',()=>{
 for(const card of [byId('republic'),core.all.find(x=>x.id==='republic')]){
  assert.equal(card.start,1912);assert.equal(card.end,1949);assert.match(card.name,/mainland period/);
 }
 assert.equal(byId('roc-taiwan').start,1949);
 assert(!fs.readFileSync(path.join(__dirname,'app.js'),'utf8').includes("?'1912–present'"));
});
test('WTO card uses the effective membership date',()=>{
 const card=byId('wto-accession');assert.equal(card.start,2001);
 assert(card.description.includes('11 December 2001'));
 assert(!card.description.includes('November'));
 assert.equal(card.dateLabel,'December 2001');
 assert.equal(card.note,'China became a WTO member on 11 December 2001.');
 assert(card.sources.includes('https://www.wto.org/english/thewto_e/countries_e/china_e.htm'));
});
test('Corrections and uncertainty survive the final research overrides',()=>{
 for(const [id,start,end]of [['catalog-E_QIN_2',-221,-221],['catalog-C_BEIJING_YUAN',1272,1272],['catalog-C_BEIJING_MING',1421,1421],['catalog-E_QING_SSM',1861,1895]]){
  assert.equal(byId(id).start,start);assert.equal(byId(id).end,end);
 }
 for(const id of ['catalog-E_XIA_1','catalog-F_XIA_1'])assert.equal(byId(id).dateLabel,'Date unknown (legendary tradition)');
 assert.equal(byId('song-shen-kuo').approx,true);
 assert.match(byId('song-shen-kuo').description,/1088 and 1095/);
});

test('Han explanations agree with their corrected dates',()=>{
 for(const[id,year]of [['catalog-E_HAN_1',136],['catalog-E_HAN_2',138]]){
  const card=byId(id);assert.equal(card.start,-year);
  assert.match(card.description,new RegExp(year+' BCE'));
  assert.match(card.note,new RegExp(year+'(?: BCE|–126)'));
  assert.doesNotMatch([card.description,card.note,card.dateReview.note].join(' '),/130 BCE/);
 }
});
