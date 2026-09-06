const test=require('node:test'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
test('Every event remains date-anchored and accessible across all views',async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8765/history-of-china/snake-timeline/');
  for(const width of [1440,1024,390,320])for(const view of ['all','early','imperial','modern']){
   await page.setViewportSize({width,height:1000});
   await page.locator('[data-section="'+view+'"]').click();
   await page.waitForFunction(()=>Math.round(document.querySelector('#chart').clientWidth)===timelineInspection.geometry.width);
   const result=await page.evaluate(()=>{
    const t=timelineInspection,v=t.view;
    const inView=(a,b)=>a===b?a>=v.start&&(a<v.end||v.end===2026&&a===v.end):b>v.start&&a<v.end;
    const expected=EXHIBITION.events.filter(e=>inView(e.start,e.end)).map(e=>e.id).sort();
    const coverage=t.markers.map(m=>m.id).sort();
    const targets=[...document.querySelectorAll('.event-hit')].map(n=>n.getBoundingClientRect());
    const overlappingTargets=targets.flatMap((a,i)=>targets.map((b,j)=>j>i&&a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top?[i,j]:null).filter(Boolean));
    const visibleDates=[...document.querySelectorAll('[data-event-date]')].filter(n=>!n.closest('.catalog-selection')).map(n=>n.dataset.eventDate).sort();
    const oversized=t.clusters.filter(c=>t.geometry.distance(c.latestStart)-t.geometry.distance(c.start)>64).map(c=>c.id);
    return {expected,coverage,visibleDates,oversized,overlappingTargets,misplaced:t.markers.filter(m=>{const c=EXHIBITION.all.find(c=>c.id===m.id),p=t.geometry.point(Math.max(c.start,v.start));return Math.hypot(m.x-p.x,m.y-p.y)>.1;}).map(m=>m.id),leaders:t.dotLeaders.length,overflow:document.documentElement.scrollWidth>innerWidth,clusters:t.clusters};
   });
   assert.deepEqual(result.coverage,result.expected,width+' '+view+' all events retained');
   assert.deepEqual(result.visibleDates,result.expected,'every event has a visible date tick');
   assert.deepEqual(result.oversized,[],'groups are bounded around their first date');
   assert.deepEqual(result.misplaced,[],width+' '+view+' exact anchors');
   assert.deepEqual(result.overlappingTargets,[],width+' '+view+' nonoverlapping touch targets');
   assert.equal(result.leaders,0,'no displaced stems');assert.equal(result.overflow,false);
   for(const cluster of result.clusters){assert(cluster.ids.length>=2);assert.equal(new Set(cluster.ids).size,cluster.ids.length);}
  }
  await page.setViewportSize({width:390,height:844});await page.locator('[data-section="all"]').click();
  const cluster=await page.evaluate(()=>timelineInspection.clusters.find(c=>c.ids.length>1));assert(cluster);
  const trigger=page.locator('[data-cluster="'+cluster.id+'"]');await trigger.focus();await page.keyboard.press('Enter');
  const dialog=page.locator('.event-cluster-dialog');assert(await dialog.isVisible());
  assert.match(await dialog.innerText(),/Approximate|traditional/i);
  const ids=await dialog.locator('[data-record]').evaluateAll(nodes=>nodes.map(n=>n.dataset.record));assert.deepEqual([...ids].sort(),[...cluster.ids].sort());
  const starts=await page.evaluate(ids=>ids.map(id=>EXHIBITION.all.find(c=>c.id===id).start),ids);assert.deepEqual(starts,[...starts].sort((a,b)=>a-b));
  await page.keyboard.press('Escape');assert(await trigger.evaluate(e=>document.activeElement===e));
  await trigger.locator('.event-hit').click();await dialog.locator('[data-record]').first().click();
  assert.equal(await page.locator('#detail').getAttribute('aria-modal'),'true');
  assert.equal(await page.evaluate(()=>timelineInspection.selected()),ids[0]);
  assert(await trigger.evaluate(e=>e.classList.contains('selected')),'selected group remains visible');
  await page.keyboard.press('Escape');assert(await trigger.evaluate(e=>document.activeElement===e));
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});
test('Selected event ranges and undated traditions retain their meaning',async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto('http://127.0.0.1:8765/history-of-china/snake-timeline/');
  await page.locator('#index-toggle').click();
  for(const[id,query,start,end]of [['an-lushan','An Lushan',755,763],['war-japan','War with Japan',1937,1945]]){
   await page.locator('#search').fill(query);await page.locator('[data-record="'+id+'"]').click();
   assert.equal(await page.locator('.event-duration').getAttribute('data-start'),String(start));
   assert.equal(await page.locator('.event-duration').getAttribute('data-end'),String(end));
  }
  await page.locator('#search').fill('Ming Voyages');await page.locator('[data-record="zheng-he"]').click();
  assert.equal(await page.locator('.event-duration').count(),0,'first voyage remains a point');
  await page.locator('#search').fill('Yu');await page.locator('[data-record="catalog-F_XIA_1"]').click();
  assert.equal(await page.locator('.catalog-selection').count(),0,'unknown date has no invented position');
  const absent=await page.evaluate(()=>!timelineInspection.markers.some(m=>m.id==='confucius'));assert(absent);
 }finally{await browser.close();}
});
