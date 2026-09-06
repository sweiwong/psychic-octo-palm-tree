const test=require('node:test'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
test('Beginner titles, removed card and phone source controls work',async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8765/history-of-china/snake-timeline/');
  await page.locator('#index-toggle').click();
  for(const[id,query,title]of [['zheng-he','Zheng He','Ming Voyages'],['abdication','The emperor abdicates','End of Imperial China'],['war-japan','Full-scale war with Japan','Second World War: War with Japan']]){
   await page.locator('#search').fill(query);await page.locator('[data-record="'+id+'"]').click();
   assert.equal(await page.locator('#detail h3').innerText(),title);
   assert.equal(await page.locator('#detail .card-photo img').count(),1);
   assert.equal(await page.locator('#detail .card-sources').getAttribute('open'),null);
  }
  await page.locator('#search').fill('Taiwan');
  assert.equal(await page.locator('[data-record="taiwan-democratization"]').count(),0);
  assert.equal(await page.locator('[data-record="roc-taiwan"]').count(),1);
  await page.setViewportSize({width:390,height:844});
  await page.locator('#search').fill('Ming Voyages');
  const trigger=page.locator('[data-record="zheng-he"]');await trigger.click();
  assert.equal(await page.locator('#detail').getAttribute('aria-modal'),'true');
  assert.equal(await page.locator('#detail').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(244, 240, 231)');
  const details=page.locator('#detail .card-sources');
  assert.equal(await details.locator('a').first().isVisible(),false);
  await details.locator('summary').click();await page.keyboard.press('Tab');
  assert(await page.evaluate(()=>document.activeElement.matches('#detail .card-sources a')));
  const first=page.locator('#detail button').first();await first.focus();
  await page.keyboard.press('Shift+Tab');
  assert(await page.evaluate(()=>document.querySelector('#detail').contains(document.activeElement)));
  await page.keyboard.press('Tab');assert(await first.evaluate(e=>e===document.activeElement));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.keyboard.press('Escape');assert(await trigger.evaluate(e=>e===document.activeElement));
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});
