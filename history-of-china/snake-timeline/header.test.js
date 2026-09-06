const test=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');

test('compact header exposes search, all entries, navigation and mobile access',async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  for(const width of [1440,768,390,320]){
   await page.setViewportSize({width,height:1000});
   await page.goto(process.env.PREVIEW_URL||'http://127.0.0.1:8765/history-of-china/snake-timeline/');
   await page.evaluate(()=>document.fonts.ready);
   await page.waitForFunction(()=>Math.round(document.querySelector('#chart').clientWidth)===timelineInspection.geometry.width);
   assert.ok(await page.locator('#search').isVisible());
   assert.ok(await page.locator('.masthead a[href="#reading-notes"]').isVisible());
   assert.equal(await page.locator('.hero').count(),0);
   assert.ok(await page.locator('#collection').isHidden());
   if(width>760){
    const chart=await page.locator('.chart-wrap').boundingBox(),card=await page.locator('.detail-column').boundingBox();
    assert.ok(Math.abs(chart.y-card.y)<2);
    const nav=await page.locator('#era-nav').boundingBox();
    assert.ok(chart.y-(nav.y+nav.height)<=32,'Chart follows the larger dated navigation without excess space');
   }
   await page.locator('#search').fill('WTO');
   assert.ok(await page.locator('[data-record="wto-accession"]').isVisible());
   await page.locator('#search').fill('dong jin');
   assert.ok(await page.locator('#collection').isVisible());
   await page.locator('#search').press('ArrowDown');
   assert.ok(await page.locator('#search-results button').first().evaluate(el=>el===document.activeElement));
   await page.keyboard.press('Enter');
   assert.equal(await page.locator('#detail h3').innerText(),'Eastern Jin');
   if(width<=760){await page.keyboard.press('Escape');assert.ok(await page.locator('#detail').isHidden());}
   await page.locator('#search').fill('no-such-record');
   assert.match(await page.locator('#search-results').innerText(),/No matches/);
   await page.locator('#index-toggle').click();
   assert.equal(await page.locator('#search').inputValue(),'');
   assert.equal(await page.locator('#search-results button').count(),await page.evaluate(()=>EXHIBITION.all.length));
   await page.locator('#search').press('Escape');
   assert.ok(await page.locator('#collection').isHidden());
   await page.locator('#index-toggle').click();
   assert.equal(await page.locator('#search').inputValue(),'');
   assert.equal(await page.locator('#search-results button').count(),await page.evaluate(()=>EXHIBITION.all.length));
   await page.locator('#index-toggle').click();
   await page.locator('#search').fill('东晋');
   await page.locator('#search').press('Enter');
   assert.ok(await page.locator('#search-results button').first().evaluate(el=>el===document.activeElement));
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
 }finally{await browser.close();}
});
