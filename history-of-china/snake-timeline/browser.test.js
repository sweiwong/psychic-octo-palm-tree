// Run against the local server. See README.md for commands and browser setup.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, reducedMotion: 'reduce' });
  async function assertCardSources(){
    const expected=await page.evaluate(()=>EXHIBITION.all.find(item=>item.id===timelineInspection.selected()).sources.filter(url=>/^https:\/\//.test(url)));
    assert.ok(expected.length>=2);
    assert.deepEqual(await page.locator('#detail .source-link').evaluateAll(links=>links.map(link=>link.getAttribute('href'))),expected);
  }
  async function openEvent(id){
    await page.waitForFunction(() => Math.round(document.querySelector('#chart').clientWidth) === timelineInspection.geometry.width);
    const direct=page.locator('#chart [data-item="'+id+'"][tabindex="0"]').first();
    if(await direct.count()){await direct.focus();await page.keyboard.press('Enter');return;}
    const cluster=await page.evaluate(id=>timelineInspection.clusters.find(group=>group.ids.includes(id))?.id,id);
    assert.ok(cluster,'An event has a direct target or a chronological group: '+id);
    await page.locator('[data-cluster="'+cluster+'"]').focus();await page.keyboard.press('Enter');
    const entry=page.locator('.event-cluster-dialog [data-record="'+id+'"]');await entry.focus();await page.keyboard.press('Enter');
  }
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const url = process.env.PREVIEW_URL || 'http://127.0.0.1:8765/history-of-china/snake-timeline/';
  const output = process.env.SCREENSHOT_DIR || '/tmp/chinese-history-checks';
  fs.mkdirSync(output, { recursive: true });
  try {
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [1440, 1280, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForFunction(() => Math.round(document.querySelector('#chart').clientWidth) === timelineInspection.geometry.width);
      assert.ok(await page.evaluate(()=>timelineInspection.labels.every(r=>r.y>=r.baseline-90&&r.y<=r.baseline+70)), 'Labels remain in their historical row at '+width);
      if(width===1280){
        assert.ok(await page.evaluate(()=>timelineInspection.labels.some(r=>r.id==='jurchen-jin')), 'Jurchen Jin label remains visible');
        await page.locator('#chart').screenshot({path:path.join(output,'jin-label-placement.png')});
      }
      assert.ok(await page.evaluate(() => [...new Set([...document.querySelectorAll('#chart [data-item]')].map(n=>n.dataset.item))].every(id=>document.querySelector('#chart [data-item="'+id+'"][tabindex="0"]'))), 'Every drawn subject has a keyboard target');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Horizontal overflow at ${width}`);
      assert.ok(await page.evaluate(() => {
        const rects = timelineInspection.labels;
        return rects.every((a, i) => rects.every((b, j) => i === j || a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y));
      }), `Overlapping labels at ${width}`);
    }
    for (const width of [1440,1024,768,390,320]) {
      await page.setViewportSize({width,height:900});
      await page.waitForFunction(() => Math.round(document.querySelector('#chart').clientWidth) === timelineInspection.geometry.width);
      assert.ok(await page.evaluate(()=>{const boxes=[...document.querySelectorAll('.event-hit')].map(node=>node.getBoundingClientRect());return boxes.every((a,i)=>boxes.every((b,j)=>i===j||a.right<=b.left+.1||b.right<=a.left+.1||a.bottom<=b.top+.1||b.bottom<=a.top+.1));}), 'Event pointer targets do not overlap at '+width);
      assert.ok(await page.evaluate(()=>timelineInspection.markers.every(marker=>{const p=timelineInspection.geometry.point(Math.max(marker.start,timelineInspection.view.start));return Math.hypot(marker.x-p.x,marker.y-p.y)<.01;})), 'Event positions retain their actual date at '+width);
    }
    await page.setViewportSize({ width: 1440, height: 1100 });
    for(const id of ['sui-grand-canal','tang','catalog-E_QING_OPIUM','catalog-E_QING_OPIUM2','catalog-E_QING_TAIPING','catalog-E_QING_BOXER']){
      await openEvent(id);
      await page.waitForFunction(()=>{const img=document.querySelector('#detail .card-photo img');return img?.complete&&img.naturalWidth>0;});
      assert.equal(await page.locator('#detail .card-photo a').count(),2);
      await page.locator('#detail .card-photo').screenshot({path:path.join(output,id+'-image.png')});
    }
    for(const [id,dates] of [['catalog-E_QING_OPIUM','1839 CE – 1842 CE'],['catalog-E_QING_OPIUM2','1856 CE – 1860 CE'],['catalog-E_QING_TAIPING','1850 CE – 1864 CE'],['catalog-E_QING_BOXER','1899 CE – 1901 CE']]){
      await openEvent(id);
      assert.ok((await page.locator('#detail').innerText()).includes(dates));
      await assertCardSources();
    }
    await openEvent('catalog-C_BEIJING_MING');
    await page.waitForFunction(()=>{const img=document.querySelector('#detail .card-photo img');return img?.complete&&img.naturalWidth>0;});
    assert.match(await page.locator('#detail .card-photo').innerText(),/Kallgan/);
    assert.match(await page.locator('#detail').innerText(), /1421 CE/);
    assert.match(await page.locator('#detail').innerText(), /yǒng lè qiān dū běi jīng/);
    await assertCardSources();
    await openEvent('sui-grand-canal');
    assert.match(await page.locator('#detail').innerText(), /605 CE – 610 CE/);
    assert.match(await page.locator('#detail').innerText(), /suí dài dà yùn hé/);
    await assertCardSources();
    await openEvent('an-lushan');
    assert.match(await page.locator('#detail').innerText(), /755 – 763/);
    await page.locator('[data-item="song"][tabindex="0"]').focus();
    assert.equal(await page.locator('#tooltip').isVisible(), true);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#detail h3').innerText(), 'Song');
    await page.getByRole('button', { name: 'Next item', exact: true }).click();
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('aria-label')), 'Next item');
    await page.locator('#events-toggle').uncheck();
    assert.equal(await page.locator('.timeline-item.event').count(), 0);
    await page.locator('#events-toggle').check();
    await page.locator('#states-toggle').uncheck();
    assert.equal(await page.locator('.timeline-item.concurrent').count(), 0);
    await page.locator('#states-toggle').check();
    if(await page.locator('#collection').isVisible())await page.locator('#search').press('Escape');else await page.locator('#index-toggle').click();
    await page.locator('#search').fill('755');
    await page.locator('#search-results [data-record="an-lushan"]').click();
    assert.equal(await page.locator('#detail h3').innerText(), 'An Lushan Rebellion');
    assert.equal(await page.locator('#detail .source-link').first().getAttribute('href'), 'https://en.wikipedia.org/wiki/An_Lushan_Rebellion');
    await page.locator('#search').fill('no-such-record');
    assert.match(await page.locator('#search-results').innerText(), /No matches/);
    if(await page.locator('#collection').isVisible())await page.locator('#search').press('Escape');else await page.locator('#index-toggle').click();
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: path.join(output, 'desktop.png'), fullPage: true });
    if(await page.locator('#collection').isVisible())await page.locator('#search').press('Escape');else await page.locator('#index-toggle').click();
    await page.locator('#search').fill('东晋');
    await page.locator('#search-results [data-record="catalog-R_JIN_EASTERN_JIN"]').click();
    assert.equal(await page.locator('#detail h3').innerText(), 'Eastern Jin');
    assert.equal(await page.locator('#detail .card-chinese-name').innerText(), '东晋');
    assert.equal(await page.locator('#detail .card-chinese-name').getAttribute('lang'), 'zh-Hans');
    await assertCardSources();
    assert.equal(await page.locator('.catalog-selection').count(), 1);
    await page.locator('#era-nav [data-period="xia"]').click();
    assert.equal(await page.locator('.catalog-selection').count(), 0);
    await page.locator('#search').fill('北魏');
    await page.locator('#search-results [data-record="catalog-R_NS_NORTHERN_WEI"]').click();
    assert.match(await page.locator('#detail').innerText(), /386 CE – 534 CE/);
    await page.locator('#category').selectOption('culture');
    await page.locator('#search').fill('movable');
    await page.locator('#search-results [data-record="movable-type"]').click();
    assert.match(await page.locator('#detail .source-link').first().getAttribute('href'), /scalar.usc.edu/);
    await page.locator('#category').selectOption('period');
    await page.locator('#search').fill('Ten Kingdoms');
    await page.locator('#search-results [data-record="catalog-S_TEN"]').click();
    assert.ok(await page.locator('#detail .related-items button').count() >= 10);
    await page.locator('#detail .related-items button').filter({ hasText: 'Wuyue' }).click();
    assert.equal(await page.locator('#detail h3').innerText(), 'Wuyue');
    assert.equal(await page.evaluate(() => document.activeElement.tagName), 'H3');
    await page.screenshot({ path: path.join(output, 'expanded-research.png') });
    await page.locator('#category').selectOption('all');
    await page.locator('#search').fill('755');
    await page.locator('#search-results [data-record="an-lushan"]').click();
    if(await page.locator('#collection').isVisible())await page.locator('#search').press('Escape');else await page.locator('#index-toggle').click();
    await page.setViewportSize({ width: 390, height: 844 });
    await openEvent('an-lushan');
    assert.equal(await page.locator('#detail').getAttribute('aria-modal'), 'true');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('aria-label')), 'Next item');
    await page.screenshot({ path: path.join(output, 'mobile-details.png') });
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#detail').isVisible(), false);
    assert.ok(await page.evaluate(() => document.activeElement.dataset.item==='an-lushan'||timelineInspection.clusters.some(group=>group.id===document.activeElement.dataset.cluster&&group.ids.includes('an-lushan'))));
    await openEvent('an-lushan');
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.waitForFunction(() => !document.querySelector('#detail').hasAttribute('aria-modal'));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: path.join(output, 'mobile.png'), fullPage: true });
    if(await page.locator('#collection').isVisible())await page.locator('#search').press('Escape');else await page.locator('#index-toggle').click();
    await page.locator('#search').fill('Five Dynasties');
    await page.locator('#search-results [data-record="five-dynasties"]').click();
    await page.locator('#detail .related-items button').filter({ hasText: 'Later Tang' }).click();
    assert.equal(await page.locator('#detail h3').innerText(), 'Later Tang');
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(() => document.activeElement.dataset.record), 'five-dynasties');
    await page.locator('#search').fill('东晋');
    await page.locator('#search-results [data-record="catalog-R_JIN_EASTERN_JIN"]').click();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.catalog-selection').getAttribute('aria-hidden'),'true');
    await page.locator('#search-results [data-record="catalog-R_JIN_EASTERN_JIN"]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#detail h3').innerText(),'Eastern Jin');
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(() => document.activeElement.dataset.record), 'catalog-R_JIN_EASTERN_JIN');
    await page.setViewportSize({ width: 1440, height: 1100 });
    for (const id of ['xuanwu-gate','xuanzang-return','talas','two-tax','huichang','huang-chao','tang-end']) {
      await openEvent(id);
      assert.equal(await page.locator('#detail .card-analysis').count(), 2);
      await assertCardSources();
      assert.ok((await page.locator('#detail .card-pinyin').innerText()).length > 0);
      assert.equal(await page.locator('#detail').evaluate(el => el.scrollTop), 0);
      assert.ok(await page.locator('#detail').evaluate(el => el.getBoundingClientRect().top >= 0));
    }
    await openEvent('two-tax');
    await page.screenshot({ path: path.join(output, 'tang-detail-desktop.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await openEvent('talas');
    assert.equal(await page.locator('#detail').getAttribute('aria-modal'), 'true');
    assert.match(await page.locator('#detail').innerText(), /papermaking/);
    await page.screenshot({ path: path.join(output, 'tang-detail-mobile.png') });
    await page.keyboard.press('Escape');
    await page.setViewportSize({width:1440,height:1100});
    if(await page.locator('#collection').isHidden())await page.locator('#index-toggle').click();
    await page.locator('#category').selectOption('all');
    for(const term of ['Laozi','Mencius','Kumarajiva','Yungang','Tang Code','Shen Kuo','Wang Yangming','Lu Xun','WTO']){
      await page.locator('#search').fill(term);
      await page.locator('#search-results button').first().click();
      assert.equal(await page.locator('#detail .card-analysis').count(),2,term);
      assert.ok((await page.locator('#detail .card-pinyin').innerText()).length>0,term);
      assert.ok(await page.locator('#detail .source-link').count()>=2,term);
    }
    await page.locator('#search').fill('Laozi');
    await page.locator('#search-results button').first().click();
    if(await page.locator('#collection').isVisible())await page.locator('#search').press('Escape');else await page.locator('#index-toggle').click();
    await page.screenshot({path:path.join(output,'full-era-desktop.png'),fullPage:true});
    await page.setViewportSize({width:390,height:844});
    if(await page.locator('#collection').isVisible())await page.locator('#search').press('Escape');else await page.locator('#index-toggle').click();
    await page.locator('#search').fill('Laozi');
    await page.locator('#search-results button').first().click();
    assert.match(await page.locator('#detail').innerText(),/uncertain|disput|cannot/i);
    await page.screenshot({path:path.join(output,'full-era-mobile.png')});
    await page.keyboard.press('Escape');
    assert.deepEqual(errors, []);
    console.log('PASS: five viewport widths, no label overlaps or horizontal overflow, keyboard selection, tooltip, source link, search, layer toggles, card navigation, mobile focus trap, Escape and breakpoint reset.');
    console.log(`Screenshots: ${output}`);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
