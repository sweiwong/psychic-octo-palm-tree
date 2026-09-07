const test=require('node:test'),assert=require('node:assert/strict');
const pw=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const {pathToFileURL}=require('node:url');const path=require('node:path');
for(const engine of ['webkit','chromium'])for(const size of [{width:375,height:667},{width:390,height:844},{width:844,height:390}])test(`${engine} touch ${size.width}×${size.height}`,async()=>{
 const b=await pw[engine].launch(engine==='chromium'?{executablePath:process.env.CHROME_PATH}:{});
 try{const p=await b.newPage({viewport:size,isMobile:true,hasTouch:true,deviceScaleFactor:2});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
 await p.locator('.start-early').tap();
 await p.locator('[data-period="shang"]').tap();
 await p.locator('.detail-close').tap();
 await p.locator('#index-toggle').tap();
 await p.locator('#search').fill('Buddhism');
 await p.locator('[data-record="catalog-E_BUD_ENTRY"]').tap();
 assert.match(await p.locator('#detail h3').innerText(),/Buddhism/);
 if(size.width<=760){
 assert.equal(await p.locator('.masthead').evaluate(e=>e.inert),true);
 assert.equal(await p.locator('#search').evaluate(e=>getComputedStyle(e).fontSize),'16px');
 await p.setViewportSize({width:844,height:390});await p.waitForTimeout(100);
 await p.setViewportSize(size);await p.waitForTimeout(100);
 assert.equal(await p.locator('#detail').evaluate(e=>e.classList.contains('mobile-open')),true);
 }
 const dims=await p.locator('#detail').evaluate(e=>({width:e.getBoundingClientRect().width,scroll:e.scrollWidth}));assert.ok(dims.scroll<=dims.width+2);
 await p.locator('.card-sources').scrollIntoViewIfNeeded();
 await p.locator('.detail-close').tap();assert.equal(await p.locator('#collection').evaluate(e=>e.hidden),false);
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));assert.deepEqual(errors,[]);
 await p.screenshot({path:`/tmp/mobile-${engine}-${size.width}.png`});
 }finally{await b.close();}
});
