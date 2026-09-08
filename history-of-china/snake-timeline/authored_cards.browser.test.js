const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
let browser;
test.before(async () => { browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) }); });
test.after(async () => { await browser?.close(); });

for (const width of [1440, 390]) {
  for (const [id, count, destination] of [['an-lushan', 5, 'tang'], ['three-kingdoms', 23, 'catalog-E_3K_2'], ['chang-an', 8, 'tang']]) {
    test(`${id}: new prose, images, sources and navigation work at ${width}px`, async () => {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      try {
        await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=' + id, { waitUntil: 'domcontentloaded' });
        assert.equal(await page.locator('.card-description a, .card-analysis a[data-card-id]').count(), count);
        assert.doesNotMatch(await page.locator('#detail').innerText(), /\[\[|\]\]|Link inventory|Tier 1|\[object Object\]/);
        assert.equal(await page.locator('.card-photo').count(), id === 'chang-an' ? 2 : 1);
        if (id === 'chang-an') {
          const hero = page.locator('.card-body > .card-photo');
          assert.match(await hero.locator('img').getAttribute('src'), /assets\/chang-an-street-illustration\.png$/);
          assert.equal(await hero.locator('figcaption a').count(), 0);
          assert.match(await hero.locator('figcaption').innerText(), /Image supplied by the user/);
          const planning = page.locator('.card-analysis').filter({ has: page.getByRole('heading', { name: 'The Sui and Tang capital', exact: true }) });
          assert.match(await planning.innerText(), /108 walled residential wards/);
          assert.match(await planning.locator('img').getAttribute('src'), /Chang%27an_of_Tang/);
          assert.match(await planning.locator('figcaption').innerText(), /Modern reconstruction.*SY.*2017/);
          const enlarge = planning.getByRole('link', { name: /Open image at full size/ });
          assert.equal(await enlarge.getAttribute('href'), await planning.locator('img').getAttribute('src'));
          assert.doesNotMatch(await page.locator('.card-description, .card-analysis').allTextContents().then(text => text.join(' ')), /Ebrey|Lewis|Mote/);
        }
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
