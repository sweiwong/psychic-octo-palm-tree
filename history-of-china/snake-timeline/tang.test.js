const test=require('node:test');
const assert=require('node:assert/strict');
const core=require('./history_data.js');
const catalog=require('./catalog_data.js');
const supplement=require('./supplemental_data.js');
const tang=require('./tang_data.js');
const pinyin=require('./pinyin_data.js');
const expand=require('./catalog_adapter.js');
const baseline=expand(core,catalog,supplement);
const expanded=expand(core,catalog,[...supplement,...tang.events],tang.revisions);

test('Tang expansion preserves prior cards, sources and geometry',()=>{
  assert.equal(expanded.all.length,141);
  assert.equal(expanded.events.length,core.events.length+8);
  assert.equal(expanded.periods,core.periods);
  assert.equal(expanded.states,core.states);
  assert.deepEqual(expanded.sourceMap,baseline.sourceMap);
  for(const old of baseline.all){
    const current=expanded.all.find(item=>item.id===old.id);
    assert.ok(current);
    assert.equal(current.start,old.start);
    assert.equal(current.end,old.end);
    for(const url of old.sources)assert.ok(current.sources.includes(url));
  }
});

test('New Tang stories have sources, analysis, pinyin and visible markers',()=>{
  for(const item of expanded.all.filter(item=>item.ribbon||tang.revisions[item.id])){
    assert.equal(item.sections.length,2);
    assert.ok(item.sources.length>=2);
    assert.ok(pinyin[item.nameZh]);
    assert.ok(pinyin[item.han]);
    for(const section of item.sections)assert.ok(section.text.length>150);
    for(const id of item.related)assert.ok(expanded.all.some(other=>other.id===id));
  }
  assert.equal(expanded.all.find(item=>item.id==='huang-chao').start,881);
  assert.equal(expanded.all.find(item=>item.id==='two-tax').start,780);
  assert.equal(expanded.all.find(item=>item.id==='talas').markerOffset,-20);
});
