const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const baseUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:8765/history-of-china/snake-timeline/';
let browser;
test.before(async () => { browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) }); });
test.after(async () => { await browser?.close(); });

for (const width of [1440, 390]) {
  test(`approved Tang copy keeps its paragraphs and cross-card links at ${width}px from a local file`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    page.setDefaultTimeout(5000);
    try {
      await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=tang');
      const conclusion = page.locator('.card-analysis').filter({ has: page.getByRole('heading', { name: 'Why the Tang matters', exact: true }) });
      assert.equal(await conclusion.locator('p').count(), 2);
      assert.equal(await page.locator('.card-description a, .card-analysis a[data-card-id]').count(), 26);
      assert.match(await page.locator('.card-description').innerText(), /The Tang ruled China for close to three centuries/);
      assert.equal(await page.locator('.card-note').count(), 0);
      await page.locator('.card-analysis a[data-card-id="catalog-R_NS_NORTHERN_WEI"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'catalog-R_NS_NORTHERN_WEI');
      await page.locator('.card-backlinks a[data-card-id="tang"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'tang');
    } finally { await page.close(); }
  });

  test(`Tang notes open connected cards and backlinks at ${width}px`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    page.setDefaultTimeout(5000);
    try {
      await page.goto(baseUrl + '?card=tang', { waitUntil: 'domcontentloaded' });
      await page.locator('.card-analysis a[data-card-id="an-lushan"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'an-lushan');
      await page.locator('.card-analysis a[data-card-id="two-tax"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'two-tax');
      assert.equal(await page.locator('#detail h3').innerText(), 'Two-Tax reform');
      assert.doesNotMatch(await page.locator('#detail').innerText(), /\[\[|\]\]/);
      await page.locator('.card-backlinks a[data-card-id="an-lushan"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'an-lushan');
      await page.goBack();
      await page.waitForFunction(() => document.querySelector('#detail h3')?.textContent === 'Two-Tax reform');
      await page.reload({ waitUntil: 'domcontentloaded' });
      assert.equal(await page.locator('#detail h3').innerText(), 'Two-Tax reform');
    } finally { await page.close(); }
  });
}
