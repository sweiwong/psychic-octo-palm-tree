const test=require('node:test'),assert=require('node:assert/strict');
const history=require('./history_data');
test('Three Kingdoms, Jin and Northern and Southern Dynasties replace the division umbrella without concealing overlaps',()=>{
 assert.ok(!history.periods.some(x=>x.id==='division'));
 assert.ok(history.all.some(x=>x.id==='division'&&x.catalogOnly));
 const expected=[['three-kingdoms',220,266],['jin-early',266,420],['north-south',420,581]];
 for(const[id,start,end]of expected){
  const p=history.periods.find(x=>x.id===id);
  assert.equal(p.label,true);assert.deepEqual(p.ranges,[[start,end]]);
 }
 assert.deepEqual(history.states.filter(x=>['three-kingdoms','north-south'].includes(x.id)).map(x=>[x.id,x.start,x.end]),[['three-kingdoms',266,280],['north-south',581,589]]);
 assert.equal(history.all.find(x=>x.id==='three-kingdoms').start,220);
 assert.equal(history.all.find(x=>x.id==='north-south').end,589);
 assert.notEqual(history.periods.find(x=>x.id==='sui').label,false);
});
