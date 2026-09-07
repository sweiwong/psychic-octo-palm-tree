const test = require('node:test');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const cards = require('./cambridge_research').events;

test('Cambridge additions appear on the timeline and open as complete cards', async () => {
  const browser = await chromium.launch({headless: true, ...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
  try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1100}, reducedMotion: 'reduce'});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:8765/history-of-china/snake-timeline/');
    await page.waitForFunction(() => window.timelineInspection?.markers?.length);
    const state = await page.evaluate(ids => ({
      count: EXHIBITION.all.length,
      cards: ids.filter(id => EXHIBITION.all.some(card => card.id === id)),
      events: ids.filter(id => EXHIBITION.events.some(card => card.id === id)),
      markers: ids.filter(id => timelineInspection.markers.some(marker => marker.id === id))
    }), cards.map(card => card.id));
    assert.equal(state.count, 221);
    for (const key of ['cards', 'events', 'markers']) assert.equal(state[key].length, cards.length, key);

    await page.locator('#index-toggle').click();
    for (const card of cards) {
      await page.locator('#search').fill(card.name);
      await page.locator(`[data-record="${card.id}"]`).click();
      assert.equal(await page.locator('#detail h3').innerText(), card.name);
      assert.equal(await page.locator('#detail .card-analysis').count(), 2, card.id + ': analysis');
      assert.equal(await page.locator('#detail .card-photo').count(), 1, card.id + ': image');
      await page.waitForFunction(() => document.querySelector('#detail .card-photo img')?.complete);
      assert(await page.locator('#detail .card-photo img').evaluate(image => image.naturalWidth > 0), card.id + ': image loads');
      assert.equal(await page.locator('#detail .source-link').count(), 2, card.id + ': sources');
      await page.locator('.detail-close').click();
    }
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});
