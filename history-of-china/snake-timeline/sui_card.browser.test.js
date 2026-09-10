const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
let browser;

test.before(async () => { browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) }); });
test.after(async () => { await browser?.close(); });

for (const width of [1440, 390]) {
  test(`Sui card links, media and captions work at ${width}px`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    try {
      await page.route('https://**/*', route => route.fulfill({
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700"/>',
      }));
      await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=sui');
      assert.equal(await page.locator('#detail .card-photo').count(), 5);
      assert.equal(await page.locator('#detail .card-description a, #detail .card-analysis a[data-card-id]').count(), 11);
      assert.equal(await page.locator('#detail img[src="assets/sui-timeline.svg"]').count(), 1);
      assert.match(await page.locator('#detail').innerText(), /world’s oldest surviving open-spandrel stone arch bridge/);
      assert.match(await page.locator('#detail').innerText(), /Head of a bodhisattva/);

      for (const figure of await page.locator('#detail .card-photo').all()) {
        const photo = figure.locator('img');
        await photo.scrollIntoViewIfNeeded();
        const bounds = await photo.boundingBox();
        assert.ok(bounds.width > 0 && bounds.width <= width, 'image fits the screen');
        assert.ok((await figure.locator('figcaption').innerText()).trim().length > 30, 'caption remains visible');
      }
      assert.ok(await page.locator('#detail').evaluate(node => node.scrollWidth <= node.clientWidth + 1));

      await page.getByRole('link', { name: 'Han Dynasty', exact: true }).click();
      assert.match(page.url(), /card=han/);
      assert.match(await page.locator('#detail h3').innerText(), /Han/);
    } finally {
      await page.close();
    }
  });
}
