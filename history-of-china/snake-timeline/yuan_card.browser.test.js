const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
let browser;
test.before(async () => { browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) }); });
test.after(async () => { await browser?.close(); });
for (const width of [1440, 390]) {
  test(`Yuan prose, portrait and map and links work at ${width}px`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    try {
      await page.route('https://**/*', route => route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="943"/>' }));
      await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=yuan');
      assert.equal(await page.locator('.card-analysis').count(), 6);
      assert.equal(await page.locator('.card-description a, .card-analysis a[data-card-id]').count(), 12);
      assert.equal(await page.locator('.card-photo').count(), 4);
      assert.match(await page.locator('.card-body > .card-photo img').getAttribute('src'), /YuanEmperorAlbumKhubilaiPortrait/);
      const section = page.locator('.card-analysis').filter({ has: page.getByRole('heading', { name: 'Conquest, expansion and rival khans', exact: true }) });
      assert.match(await section.locator('img').getAttribute('src'), /MongolEmpireDivisions1300/);
      assert.match(await section.locator('figcaption').innerText(), /Gabagool.*CC BY 3.0/);
      assert.equal(await section.getByRole('link', { name: /Open image at full size/ }).getAttribute('href'), await section.locator('img').getAttribute('src'));
      const arts = page.locator('.card-analysis').filter({ has: page.getByRole('heading', { name: 'Plays, paintings and porcelain', exact: true }) });
      assert.equal(await arts.locator('.card-photo').count(), 2);
      assert.match(await arts.innerText(), /Twin Pines, Level Distance/);
      assert.match(await arts.innerText(), /David Vases.*1351/);
      assert.doesNotMatch(await page.locator('#detail').innerText(), /\[\[|\]\]|Link inventory|Tier 1|\[object Object\]/);
      await page.locator('.card-analysis a[data-card-id="ming"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'ming');
    } finally { await page.close(); }
  });
}
