const test=require('node:test'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
test('Expanded story preserves selection and returns to snake on close and Escape',async()=>{
 const b=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{const p=await b.newPage({viewport:{width:1440,height:1000}});
 await p.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
 await p.locator('.browse-stories').click();await p.locator('[data-record="chanyuan"]').click();
 const title=await p.locator('#detail h3').innerText();
 for(const escape of [false,true]){
 await p.getByRole('button',{name:'Expand story',exact:true}).click();
 assert.equal(await p.locator('.reading-dialog').evaluate(e=>e.open),true);
 const box=await p.locator('.reading-dialog').boundingBox();assert.ok(box.width>=1440*.5&&box.width<=1440*.62);
 assert.equal(await p.locator('#detail h3').innerText(),title);
 if(escape)await p.keyboard.press('Escape');else await p.getByRole('button',{name:'Close details',exact:true}).click();
 assert.equal(await p.locator('.reading-dialog').evaluate(e=>e.open),false);
 assert.equal(await p.locator('#detail h3').innerText(),title);
 assert.equal(await p.locator('.detail-column #detail').count(),1);
 }
 }finally{await b.close();}
});
