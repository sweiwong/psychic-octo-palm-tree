const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
let browser;
test.before(async () => { browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) }); });
test.after(async () => { await browser?.close(); });
for (const width of [1440, 390]) {
  test(`Song prose, both maps and links work at ${width}px`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    try {
      await page.route('https://**/*', route => route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="943"/>' }));
      await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=song');
      assert.equal(await page.locator('.card-analysis').count(), 7);
      assert.equal(await page.locator('.card-description a, .card-analysis a[data-card-id]').count(), 13);
      assert.equal(await page.locator('.card-photo').count(), 2);
      assert.match(await page.locator('.card-body > .card-photo img').getAttribute('src'), /Song-Liao-Xixia-1111/);
      const section = page.locator('.card-analysis').filter({ has: page.getByRole('heading', { name: 'Northern Song and Southern Song', exact: true }) });
      assert.match(await section.locator('img').getAttribute('src'), /Southern_Song_Dynasty-en/);
      assert.match(await section.locator('figcaption').innerText(), /Mozzan.*Kanguole.*CC BY-SA 3.0/);
      assert.equal(await section.getByRole('link', { name: /Open image at full size/ }).getAttribute('href'), await section.locator('img').getAttribute('src'));
      assert.doesNotMatch(await page.locator('#detail').innerText(), /\[\[|\]\]|Link inventory|Tier 1|\[object Object\]/);
      await page.locator('.card-analysis a[data-card-id="jingkang"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'jingkang');
    } finally { await page.close(); }
  });
}
