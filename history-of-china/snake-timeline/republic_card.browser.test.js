const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
let browser;
test.before(async () => { browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) }); });
test.after(async () => { await browser?.close(); });
for (const width of [1440, 390]) {
  test(`Republic approved text, four images and navigation work at ${width}px`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    try {
      // Layout checks stay deterministic; the release check loads the real remote images.
      await page.route('https://**/*', route => route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="943"/>' }));
      await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=republic');
      assert.equal(await page.locator('.card-analysis').count(), 7);
      assert.equal(await page.locator('.card-description a, .card-analysis a[data-card-id]').count(), 12);
      assert.equal(await page.locator('.card-photo').count(), 4);
      assert.match(await page.locator('.card-body > .card-photo img').getAttribute('src'), /Sun_Yat_Sen_-_btv1b53078822w/);
      for (const [heading, image, credit] of [
        ['A country divided among armies', /Warlords_in_China_1925/, /1925.*Northern Expedition/s],
        ['New writing, education and women’s rights', /La_jeunesse/, /Youth Magazine.*1915/s],
        ['War with Japan', /Ledo_Road/, /15 February 1944.*National Archives/s],
      ]) {
        const section = page.locator('.card-analysis').filter({ has: page.getByRole('heading', { name: heading, exact: true }) });
        assert.match(await section.locator('img').getAttribute('src'), image);
        assert.match(await section.locator('figcaption').innerText(), credit);
        assert.equal(await section.getByRole('link', { name: /Open image at full size/ }).getAttribute('href'), await section.locator('img').getAttribute('src'));
      }
      assert.doesNotMatch(await page.locator('#detail').innerText(), /\[\[|\]\]|Link inventory|Tier 1|\[object Object\]/);
      assert.ok(await page.locator('#detail').evaluate(node => node.scrollWidth <= node.clientWidth + 1));
      await page.locator('.card-description a[data-card-id="roc-taiwan"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'roc-taiwan');
      await page.goBack();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'republic');
    } finally { await page.close(); }
  });
}
