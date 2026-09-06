const test=require('node:test'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
test('reading controls remain reachable and larger dates fit across screen sizes',async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{for(const width of [1440,1024,800,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  await page.goto('file://'+__dirname+'/index.html');await page.evaluate(()=>document.fonts.ready);
  await page.locator('#search').fill('Chanyuan');await page.locator('#search-results [data-record="chanyuan"]').click();
  await page.locator('#detail').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>document.querySelector('#detail img').complete);
  if(width===1440||width===390)await page.screenshot({path:'/tmp/china-visual-review/after-card-'+width+'.png'});
  await page.locator('.significance-jump').click();
  await page.waitForFunction(()=>{const s=document.querySelector('.card-significance').getBoundingClientRect(),t=document.querySelector('.card-top').getBoundingClientRect();return s.top>=t.bottom&&s.top<t.bottom+65;});
  const state=await page.evaluate(()=>{const d=document.querySelector('#detail'),g=timelineInspection.geometry;return {overflow:d.scrollWidth>d.clientWidth,bodyOverflow:document.documentElement.scrollWidth>innerWidth,focus:document.activeElement.matches('.card-significance'),outside:[...document.querySelectorAll('.label-date')].filter(e=>{const r=e.getBBox(),b=e.parentElement.querySelector('.label-bg').getBBox();return r.x<b.x-1||r.x+r.width>b.x+b.width+1;}).length,lieFactor:((g.distance(300)-g.distance(100))/(g.distance(200)-g.distance(100))-1)}});
  assert.equal(state.overflow,false);assert.equal(state.bodyOverflow,false);assert.equal(state.focus,true);assert.equal(state.outside,0);assert(Math.abs(state.lieFactor-1)<.00001);
  if(width===1440||width===390)await page.screenshot({path:'/tmp/china-visual-review/after-bottom-'+width+'.png'});
  await page.locator('.detail-close').click();
  if(width>760)assert.equal(await page.locator('#detail.welcome-card').count(),1);else assert.equal(await page.locator('#detail.mobile-open').count(),0);
  await page.close();
 }}finally{await browser.close();}
});
