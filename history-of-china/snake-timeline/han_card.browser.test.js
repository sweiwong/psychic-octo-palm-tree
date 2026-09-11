const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
let browser;

test.before(async () => { browser = await chromium.launch({ headless: true }); });
test.after(async () => { await browser?.close(); });

for (const width of [1440, 390]) {
  test(`Han Dynasty card is readable and connected at ${width}px`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    try {
      await page.route('https://**/*', route => route.fulfill({
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="900"/>',
      }));
      await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=han');
      assert.equal(await page.locator('#detail h3').innerText(), 'Han');
      assert.equal(await page.locator('[data-item="han"] .label-name').textContent(), 'Han');
      assert.equal(await page.locator('.card-chinese-name').innerText(), '汉朝');
      assert.equal(await page.locator('.card-pinyin').innerText(), 'hàn cháo');
      assert.equal(await page.locator('#detail .card-photo').count(), 4);
      assert.ok(await page.locator('#detail').evaluate(node => node.scrollWidth <= node.clientWidth + 1));
      for (const id of ['qin', 'catalog-R_HAN_W', 'catalog-E_HAN_2', 'paper', 'sima-qian', 'three-kingdoms']) {
        assert.equal(await page.locator(`#detail .card-description a[data-card-id="${id}"], #detail .card-analysis a[data-card-id="${id}"]`).count(), 1, id);
      }
      await page.locator('#detail .card-description a[data-card-id="qin"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'qin');
      await page.locator('#detail .card-backlinks a[data-card-id="han"]').click();
      assert.equal(new URL(page.url()).searchParams.get('card'), 'han');
    } finally {
      await page.close();
    }
  });
}

test('Han is searchable in English, Chinese and pinyin', async () => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(pathToFileURL(__dirname + '/index.html').href);
    for (const query of ['Han Dynasty', '汉朝', 'hàn cháo']) {
      await page.locator('#search').fill(query);
      const result = page.locator('#search-results [data-record="han"]');
      assert.equal(await result.count(), 1, query);
      assert.match(await result.innerText(), /Han/);
    }
  } finally {
    await page.close();
  }
});
