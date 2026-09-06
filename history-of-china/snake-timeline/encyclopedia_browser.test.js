const test=require('node:test'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const chart=require('./chart_research');
const reading=require('./data/china_history_expanded.json').cards;
test('New chart events, illustrated browsing and canonical overlap dates work on desktop and phone',async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1100}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.PREVIEW_URL||'http://127.0.0.1:8765/history-of-china/snake-timeline/');
  for(const[id,date]of [['three-kingdoms','220 CE – 280 CE'],['north-south','420 CE – 589 CE']])
   assert.ok((await page.locator('.concurrent[data-item="'+id+'"]').getAttribute('aria-label')).includes(date));
  await page.locator('#index-toggle').click();
  for(const sourceCard of chart.events){
   const card=reading.find(card=>card.id===sourceCard.id);
   await page.locator('#search').fill(card.name);
   await page.locator('[data-record="'+card.id+'"]').click();
   assert.equal(await page.locator('#detail h3').innerText(),card.name);
   assert.equal(await page.locator('#detail .card-photo').count(),1,card.id+' illustration');
   assert.ok(await page.locator('#detail .card-analysis').count()>=2,card.id+' analysis');
   assert.equal(await page.locator('#detail .card-chinese-name').getAttribute('lang'),'zh-Hans');
  }
  await page.locator('#search').fill('wujing zongyao');
  assert.equal(await page.locator('[data-record="song-gunpowder"]').count(),1,'Pinyin without tone marks');
  await page.locator('#search').fill('Sixteen Prefectures');
  assert.ok(await page.locator('#search-results button').count()>0,'Search inside analysis');
  await page.setViewportSize({width:390,height:844});
  await page.locator('#search').fill('Fei River');
  await page.locator('[data-record="fei-river"]').click();
  assert.equal(await page.locator('#detail').getAttribute('aria-modal'),'true');
  assert.equal(await page.locator('#detail .card-photo').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#detail').isVisible(),false);
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});
