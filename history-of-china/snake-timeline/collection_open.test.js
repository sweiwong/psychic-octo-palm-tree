const test=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
test('Every collection card opens visible details and returns to the collection',async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:900}});
  await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
  await page.locator('.browse-stories').click();
  const failures=await page.evaluate(()=>{
   const ids=[...document.querySelectorAll('.collection-entry')].map(e=>e.dataset.record),failures=[];
   for(const id of ids){
    document.querySelector(`[data-record="${id}"]`).click();
    const item=EXHIBITION.all.find(i=>i.id===id),detail=document.querySelector('#detail'),r=detail.getBoundingClientRect();
    if(detail.querySelector('h3')?.textContent!==item.name||r.top>=innerHeight||r.bottom<=0||!document.querySelector('#collection').hidden)failures.push(id);
    detail.querySelector('.detail-close').click();
    if(document.querySelector('#collection').hidden||document.activeElement.dataset.record!==id)failures.push(id+':return');
   }return failures;
  });assert.deepEqual(failures,[],`width ${width}`);await page.close();
 }}finally{await browser.close();}
});
