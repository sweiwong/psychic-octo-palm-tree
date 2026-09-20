const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
let browser;

test.before(async () => {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  });
});
test.after(async () => { await browser?.close(); });

for (const width of [1440, 390]) {
  test(`Spring and Autumn card links, sources and media work at ${width}px`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    try {
      await page.route('https://**/*', route => route.fulfill({
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700"/>',
      }));
      await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=catalog-SR_SA');
      const detail = page.locator('#detail');

      assert.match(await detail.innerText(), /770 BCE – 481 BCE/);
      assert.equal(await detail.locator('.card-analysis').count(), 6);
      assert.equal(await detail.locator('.card-photo').count(), 2);
      assert.equal(await detail.locator('.source-link').count(), 13);
      assert.equal(await detail.locator('.card-backlinks a[data-card-id="eastern-zhou"]').count(), 1);

      for (const figure of await detail.locator('.card-photo').all()) {
        const image = figure.locator('img');
        await image.scrollIntoViewIfNeeded();
        const bounds = await image.boundingBox();
        assert.ok(bounds.width > 0 && bounds.width <= width, 'image fits the screen');
        assert.ok((await figure.locator('figcaption').innerText()).trim().length > 30, 'caption remains visible');
      }
      assert.ok(await detail.evaluate(node => node.scrollWidth <= node.clientWidth + 1));

      await detail.locator('a[data-card-id="confucius"]').click();
      assert.match(page.url(), /card=confucius/);
      await page.goBack();
      await detail.getByRole('heading', { name: 'Spring and Autumn Period' }).waitFor();
    } finally {
      await page.close();
    }
  });
}
