const test=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const history=require('./history_data');

test('Chinese dynastic navigation selects the intended period through historical overlaps',async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(process.env.PREVIEW_URL||'http://127.0.0.1:8765/history-of-china/snake-timeline/');
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('#era-nav button').count(),9);
  assert.equal(history.eras.find(x=>x.itemId==='qin').year,-221);
  for(const width of [1440,768,390,320]){
   await page.setViewportSize({width,height:1000});
   for(const era of history.eras){
    const button=page.locator('#era-nav [data-period="'+era.itemId+'"]');
    await button.click();
    assert.equal(await page.evaluate(()=>timelineInspection.selected()),era.itemId);
    assert.equal(await button.getAttribute('aria-current'),'location');
    assert.equal(await page.locator('#era-nav [aria-current]').count(),1);
    assert.equal(await button.locator('[lang="zh-Hans"]').innerText(),era.nameZh);
    assert.ok(await button.locator('[lang="zh-Latn"]').innerText());
   }
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No overflow at '+width);
  }
  await page.setViewportSize({width:1440,height:1100});
  await page.locator('.toolbar').screenshot({path:'/tmp/chinese-dynastic-navigation-desktop.png'});
  await page.setViewportSize({width:390,height:1000});
  await page.locator('.toolbar').screenshot({path:'/tmp/chinese-dynastic-navigation-phone.png'});
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});
