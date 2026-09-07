const test=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');

test('recommended history books appear on their related cards',async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto('http://127.0.0.1:8765/history-of-china/snake-timeline/');
  await page.locator('#index-toggle').click();
  const recommendations=[
   ['catalog-E_QING_OPIUM','First Opium War',/Stephen R\. Platt, Imperial Twilight/,'https://en.wikipedia.org/wiki/Imperial_Twilight'],
   ['catalog-E_QING_OPIUM2','Second Opium War',/Stephen R\. Platt, Imperial Twilight/,'https://en.wikipedia.org/wiki/Imperial_Twilight'],
   ['catalog-E_QING_TAIPING','Taiping Rebellion',/Stephen R\. Platt, Autumn in the Heavenly Kingdom/,'https://www.penguinrandomhouse.com/books/131825/autumn-in-the-heavenly-kingdom-by-stephen-r-platt/9780307957597']
  ];
  for(const[id,query,title,url]of recommendations){
   await page.locator('#search').fill(query);
   await page.locator('[data-record="'+id+'"]').click();
   const reading=page.locator('#detail .card-reading-list');
   assert.match(await reading.innerText(),title);
   assert.equal(await reading.locator('a').getAttribute('href'),url);
  }
 }finally{
  await browser.close();
 }
});
