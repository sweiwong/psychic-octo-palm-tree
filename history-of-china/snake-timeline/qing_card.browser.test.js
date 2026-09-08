const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
let browser;
test.before(async () => { browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) }); });
test.after(async () => { await browser?.close(); });
for (const width of [1440, 390]) {
  test(`Qing approved text, four images and navigation work at ${width}px`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    try {
      // Layout checks stay deterministic; the release check loads the real remote images.
      await page.route('https://**/*', route => route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="943"/>' }));
      await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=qing');
      assert.equal(await page.locator('.card-analysis').count(), 7);
      assert.equal(await page.locator('.card-description a, .card-analysis a[data-card-id]').count(), 21);
      assert.equal(await page.locator('.card-photo').count(), 4);
      assert.match(await page.locator('.card-body > .card-photo img').getAttribute('src'), /Portrait_of_the_Kangxi_Emperor/);
      for (const [heading, image, credit] of [
        ['The eighteenth-century empire', /Qing_China_1820/, /1820.*modern boundaries and claims/s],
        ['Books and skilled crafts', /DP-31252-001/, /Glass vase.*Qianlong/s],
        ['More people, more trade', /Enamellers_Peking/, /1869.*Wellcome/s],
      ]) {
        const section = page.locator('.card-analysis').filter({ has: page.getByRole('heading', { name: heading, exact: true }) });
        assert.match(await section.locator('img').getAttribute('src'), image);
        assert.match(await section.locator('figcaption').innerText(), credit);
        assert.equal(await section.getByRole('link', { name: /Open image at full size/ }).getAttribute('href'), await section.locator('img').getAttribute('src'));
      }
      assert.doesNotMatch(await page.locator('#detail').innerText(), /\[\[|\]\]|Link inventory|Tier 1|\[object Object\]/);
      assert.ok(await page.locator('#detail').evaluate(node => node.scrollWidth <= node.clientWidth + 1));
      await page.locator('.card-description a[data-card-id="early-qing"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'early-qing');
      await page.locator('.card-description a[data-card-id="qing"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'qing');
    } finally { await page.close(); }
  });
}
