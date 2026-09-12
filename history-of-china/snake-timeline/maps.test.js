const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
test('Maps refer to existing stories and carry source, license and historical context',()=>{
 const c=vm.createContext({});vm.runInContext(fs.readFileSync(__dirname+'/map_data.js','utf8')+';globalThis.maps=HISTORY_MAPS',c);
 const data=JSON.parse(fs.readFileSync(__dirname+'/data/china_history_expanded.json','utf8'));
 for(const [id,map]of Object.entries(c.maps)){
 assert.ok(data.cards.some(card=>card.id===id),id);
 for(const field of ['src','source','licenseUrl'])assert.match(map[field],/^https:\/\//);
 for(const field of ['title','caption','credit','license'])assert.ok(map[field]?.length>3,id+':'+field);
 }
 assert.ok(c.maps['xuanzang-return']);assert.match(c.maps['xuanzang-return'].caption,/Nalanda/);
 assert.deepEqual(c.maps['ming-journey-west'],c.maps['xuanzang-return']);
 assert.match(c.maps['ming-journey-west'].caption,/indicative reconstruction/);
 assert.ok(c.maps['jin-early']);assert.match(c.maps['jin-early'].caption,/Three Kingdoms division/);
 assert.ok(c.maps['five-dynasties']);assert.match(c.maps['five-dynasties'].title,/Five Dynasties and Ten Kingdoms/);assert.match(c.maps['five-dynasties'].caption,/Northern Han was in the north/);
});
