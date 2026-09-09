const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

let browser;
test.before(async () => { browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) }); });
test.after(async () => { await browser?.close(); });

for (const width of [1440, 390]) {
  test(`Kaiyuan cosmopolitan story, six visuals and card links work at ${width}px`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    try {
      await page.route('https://**/*', route => route.fulfill({
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="943"/>',
      }));
      await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=kaiyuan-era');
      assert.equal(await page.locator('.card-analysis').count(), 7);
      assert.equal(await page.locator('.card-photo').count(), 6);
      assert.equal(await page.locator('.card-description a, .card-analysis a[data-card-id]').count(), 14);
      assert.match(await page.locator('#detail .card-body > h3').innerText(), /唐玄宗.*开元/);
      assert.doesNotMatch(await page.locator('#detail').innerText(), /\[\[|\]\]|first reign period|110 walled wards/);

      for (const [heading, count, images] of [
        ['Revenue, grain and the work of governing', 1, /100_Tang_Kaiyuan_Coins/],
        ['Tang and its neighbouring states', 1, /Asia_ca_750_AD/],
        ['A Silk Roads crossroads', 1, /Silk-Road_course/],
        ['A cosmopolitan capital', 2, /Sogdien_Tang|DP337805/],
      ]) {
        const section = page.locator('.card-analysis').filter({ has: page.getByRole('heading', { name: heading, exact: true }) });
        assert.equal(await section.locator('.card-photo').count(), count);
        for (const figure of await section.locator('.card-photo').all()) {
          assert.match(await figure.locator('img').getAttribute('src'), images);
          assert.equal(await figure.getByRole('link', { name: /Open image at full size/ }).getAttribute('href'), await figure.locator('img').getAttribute('src'));
          assert.equal(await figure.locator('figcaption a').count(), 2);
        }
      }

      const mediaUrls = await page.locator('.card-photo img').evaluateAll(nodes => nodes.map(node => node.getAttribute('src')).join('\n'));
      assert.doesNotMatch(mediaUrls, /Tang_outline_map|Chang%27an_of_Tang/);
      assert.ok(await page.locator('#detail').evaluate(node => node.scrollWidth <= node.clientWidth + 1));

      await page.locator('#detail a[data-card-id="tang"]').first().click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'tang');
      await page.locator('.card-backlinks a[data-card-id="kaiyuan-era"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'kaiyuan-era');
    } finally {
      await page.close();
    }
  });
}
