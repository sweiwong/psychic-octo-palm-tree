const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
let browser;

test.before(async () => { browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) }); });
test.after(async () => { await browser?.close(); });

for (const width of [1440, 390]) {
  test(`Qin card links, media and captions work at ${width}px`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    try {
      await page.route('https://**/*', route => route.fulfill({
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700"/>',
      }));
      await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=qin');
      assert.equal(await page.locator('#detail .card-photo').count(), 3);
      assert.equal(await page.locator('#detail .card-description a, #detail .card-analysis a[data-card-id]').count(), 7);
      assert.match(await page.locator('#detail').innerText(), /Chen Sheng.*Wu Guang/s);
      assert.match(await page.locator('#detail').innerText(), /Eighteen Laws of Qin/);

      for (const figure of await page.locator('#detail .card-photo').all()) {
        const photo = figure.locator('img');
        await photo.scrollIntoViewIfNeeded();
        const bounds = await photo.boundingBox();
        assert.ok(bounds.width > 0 && bounds.width <= width, 'image fits the screen');
        assert.ok((await figure.locator('figcaption').innerText()).trim().length > 30, 'caption remains visible');
      }
      assert.ok(await page.locator('#detail').evaluate(node => node.scrollWidth <= node.clientWidth + 1));

      await page.getByRole('link', { name: /Han Dynasty/ }).click();
      assert.match(page.url(), /card=han/);
    } finally {
      await page.close();
    }
  });
}
