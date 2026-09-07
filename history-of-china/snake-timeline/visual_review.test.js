const test=require('node:test'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
function luminance(hex){const channels=hex.match(/[a-f\d]{2}/gi).map(value=>parseInt(value,16)/255).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4);return .2126*channels[0]+.7152*channels[1]+.0722*channels[2]}
function contrast(a,b){const [lighter,darker]=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (lighter+.05)/(darker+.05)}
test('reading controls remain reachable and larger dates fit across screen sizes',async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{for(const width of [1440,1024,800,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  await page.goto('file://'+__dirname+'/index.html');await page.evaluate(()=>document.fonts.ready);
  if(width===1440){const colors=await page.evaluate(()=>{const root=getComputedStyle(document.documentElement);return {muted:root.getPropertyValue('--muted').trim(),paper:root.getPropertyValue('--paper').trim(),card:'#eeeadf'}});assert.ok(contrast(colors.muted,colors.paper)>=4.5);assert.ok(contrast(colors.muted,colors.card)>=4.5);}
  const key=page.locator('.chart-key');assert.equal(await key.locator('.chart-key-item').count(),4);const keyState=await key.evaluate(e=>({overflow:e.scrollWidth>e.clientWidth,columns:getComputedStyle(e).gridTemplateColumns.split(' ').length}));assert.equal(keyState.overflow,false);assert.equal(keyState.columns,width>900?4:width>480?2:1);
  await page.locator('#search').fill('Chanyuan');await page.locator('#search-results [data-record="chanyuan"]').click();
  await page.locator('#detail').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>document.querySelector('#detail img').complete);
  if(width===1440||width===390)await page.screenshot({path:'/tmp/china-visual-review/after-card-'+width+'.png'});
  await page.locator('.card-sources').scrollIntoViewIfNeeded();
  const state=await page.evaluate(()=>{const d=document.querySelector('#detail'),s=document.querySelector('.card-sources').getBoundingClientRect(),t=document.querySelector('.card-top').getBoundingClientRect(),g=timelineInspection.geometry;return {overflow:d.scrollWidth>d.clientWidth,bodyOverflow:document.documentElement.scrollWidth>innerWidth,sources:s.top>=t.bottom,outside:[...document.querySelectorAll('.label-date')].filter(e=>{const r=e.getBBox(),b=e.parentElement.querySelector('.label-bg').getBBox();return r.x<b.x-1||r.x+r.width>b.x+b.width+1;}).length,lieFactor:((g.distance(300)-g.distance(100))/(g.distance(200)-g.distance(100))-1)}});
  assert.equal(state.overflow,false);assert.equal(state.bodyOverflow,false);assert.equal(state.sources,true);assert.equal(state.outside,0);assert(Math.abs(state.lieFactor-1)<.00001);
  if(width===1440||width===390)await page.screenshot({path:'/tmp/china-visual-review/after-bottom-'+width+'.png'});
  await page.locator('.detail-close').click();
  if(width>760)assert.equal(await page.locator('#detail.welcome-card').count(),1);else assert.equal(await page.locator('#detail.mobile-open').count(),0);
  await page.close();
 }}finally{await browser.close();}
});
