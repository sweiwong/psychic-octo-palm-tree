const test=require('node:test'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
test('Home welcomes beginners and period navigation is readable, dated and full width',async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const width of [1440,1024,390,320]){
   await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:8765/history-of-china/snake-timeline/');
   assert.equal(await page.evaluate(()=>timelineInspection.selected()),null);
   assert.equal(await page.evaluate(()=>timelineInspection.view.id),'all');
   assert(await page.locator('.welcome-card').isVisible());
   if(width<=760)assert((await page.locator('.welcome-card').boundingBox()).y<350,'Welcome appears before the long navigation list');
   assert.equal(await page.locator('.event-cluster.selected').count(),0);
   await page.locator('.start-early').click();
   for(const view of ['early','imperial','modern']){
    await page.locator('[data-section="'+view+'"]').click();
    const nav=await page.locator('#era-nav').evaluate(el=>{
     const children=[...el.children],rect=el.getBoundingClientRect(),firstRow=children.filter(c=>Math.abs(c.getBoundingClientRect().top-children[0].getBoundingClientRect().top)<2);
     return {width:rect.width,used:firstRow.at(-1).getBoundingClientRect().right-firstRow[0].getBoundingClientRect().left,entries:children.map(c=>({id:c.dataset.period,date:c.querySelector('.era-dates').textContent,font:parseFloat(getComputedStyle(c.querySelector('.era-english')).fontSize)}))};
    });
    assert(nav.used>=nav.width*.95,width+' '+view+' fills navigation width');
    for(const entry of nav.entries){assert(entry.font>=15);assert(entry.date.length>3);}
    if(view==='early')assert.match(nav.entries.find(e=>e.id==='xia').date,/2070 BCE.*1600 BCE/);
    if(view==='imperial')assert.match(nav.entries.find(e=>e.id==='han').date,/206 BCE.*220 CE/);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   }
   await page.locator('.brand').click();assert(await page.locator('.welcome-card').isVisible());assert.equal(await page.evaluate(()=>timelineInspection.selected()),null);
   await page.locator('.browse-stories').click();assert(await page.locator('#collection').isVisible());
   await page.locator('#search').fill('An Lushan');await page.locator('#search-results [data-record="an-lushan"]').click();
   assert.equal(await page.locator('#detail h3').innerText(),'An Lushan Rebellion');
   if(width<=760)await page.keyboard.press('Escape');
   await page.locator('.brand').click();assert(await page.locator('.welcome-card').isVisible());
  }
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});
