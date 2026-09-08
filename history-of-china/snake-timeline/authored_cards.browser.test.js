const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
let browser;
test.before(async () => { browser = await chromium.launch({ headless: true }); });
test.after(async () => { await browser?.close(); });

for (const width of [1440, 390]) {
  for (const [id, count, destination] of [['an-lushan', 4, 'tang'], ['three-kingdoms', 23, 'catalog-E_3K_2']]) {
    test(`${id}: new prose, images, sources and navigation work at ${width}px`, async () => {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      try {
        await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=' + id, { waitUntil: 'domcontentloaded' });
        assert.equal(await page.locator('.card-description a, .card-analysis a[data-card-id]').count(), count);
        assert.doesNotMatch(await page.locator('#detail').innerText(), /\[\[|\]\]|Link inventory|Tier 1|\[object Object\]/);
        assert.equal(await page.locator('.card-photo').count(), 1);
        const card = require('./data/china_history_expanded.json').cards.find(card => card.id === id);
        const hrefs = await page.locator('.card-sources a').evaluateAll(links => links.map(link => link.getAttribute('href')));
        for (const source of card.sources) assert.ok(hrefs.includes(source), 'Missing displayed source: ' + source);
        assert.ok(await page.locator('#detail').evaluate(node => node.scrollWidth <= node.clientWidth + 1));
        await page.locator(`#detail a[data-card-id="${destination}"]`).first().click();
        assert.equal(new URL(page.url()).searchParams.get('card'), destination);
        await page.locator(`.card-backlinks a[data-card-id="${id}"]`).click();
        assert.equal(new URL(page.url()).searchParams.get('card'), id);
      } finally { await page.close(); }
    });
  }
}
