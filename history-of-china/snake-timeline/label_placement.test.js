const test=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
test('Crowded labels remain beside their historical row and retain keyboard access',async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try{
  const page=await browser.newPage();
  await page.goto(process.env.PREVIEW_URL||'http://127.0.0.1:8765/history-of-china/snake-timeline/');
  for(const width of [2164,1920,1440,1280,1200,1168,1024,900,768,390,320]){
   await page.setViewportSize({width,height:1000});
   await page.waitForFunction(()=>Math.round(document.querySelector('#chart').clientWidth)===timelineInspection.geometry.width);
   const result=await page.evaluate(()=>({
    crossings:(()=>{
     const lines=[...timelineInspection.leaders,...timelineInspection.dotLeaders],hits=[];
     const side=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
     for(let i=0;i<lines.length;i++)for(let j=i+1;j<lines.length;j++){
      const {a,b}=lines[i],{a:c,b:d}=lines[j];
      if(side(a,b,c)*side(a,b,d)<-.001&&side(c,d,a)*side(c,d,b)<-.001)hits.push([lines[i].id,lines[j].id]);
     }
     return hits;
    })(),
    maskedText:timelineInspection.markers.filter(p=>timelineInspection.labels.some(r=>p.x+5>r.x&&p.x-5<r.x+r.w&&p.y+5>r.y-3&&p.y-5<r.y+r.h+2)).map(p=>p.id),
    maskedStateLines:timelineInspection.labels.filter(r=>timelineInspection.statePoints.some(p=>p.x>r.x-3&&p.x<r.x+r.w+3&&p.y>r.y-3&&p.y<r.y+r.h+2)).map(r=>r.id),
    detachedLabels:timelineInspection.labels.filter(r=>!timelineInspection.leaders.some(l=>l.id===r.id)).map(r=>r.id),
    eventLabels:document.querySelectorAll('#chart .event .label-name').length,
    allEventTicksRepresentRecords:[...document.querySelectorAll('#chart .event')].every(e=>timelineInspection.markers.some(m=>m.id===e.dataset.item)),
    divisionLabel:timelineInspection.labels.some(r=>r.id==='division'),
    namedPeriods:['three-kingdoms','jin-early','north-south','sui'].filter(id=>timelineInspection.labels.some(r=>r.id===id)),
    misplaced:timelineInspection.labels.filter(r=>r.y<r.baseline-90||r.y>r.baseline+70),
    jin:timelineInspection.labels.find(r=>r.id==='jurchen-jin'),
    inaccessible:[...new Set([...document.querySelectorAll('#chart [data-item]')].map(n=>n.dataset.item))].filter(id=>!document.querySelector('#chart [data-item="'+id+'"][tabindex="0"]'))
   }));
   assert.equal(result.divisionLabel,false);
   assert.deepEqual(result.maskedText,[],width+' event anchors do not cover labels');
   assert.deepEqual(result.maskedStateLines,[],width+' labels do not mask state lines');
   assert.deepEqual(result.detachedLabels,[],width+' every label has a connector');
   assert.equal(result.eventLabels,0,width+' no permanent event labels');
   assert.equal(result.allEventTicksRepresentRecords,true,width+' every individual tick maps to a record');
   assert.deepEqual(result.crossings,[],width+' connector crossings');
   if(width>=1024)assert.equal(result.namedPeriods.length,4,width+' named medieval periods');
   assert.deepEqual(result.misplaced,[],width+' row proximity');
   assert.deepEqual(result.inaccessible,[],width+' keyboard access');
   if(width>=1024)assert.ok(result.jin,width+' Jin label visible');
  }
 }finally{await browser.close();}
});
