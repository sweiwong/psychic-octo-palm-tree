const test = require('node:test');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

test('historical significance closes the reading text on desktop and phone', async () => {
  const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH});
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({viewport: {width, height: 1000}});
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:8765/history-of-china/snake-timeline/');
      for (const [query, id] of [['Qin unification', 'unification'], ['Buddhism comes to China', 'catalog-E_BUD_ENTRY'], ['Chanyuan', 'chanyuan'], ['WTO', 'wto-accession'], ['Confucianism and Daoism', 'confucianism-daoism']]) {
        await page.locator('#search').fill(query);
        await page.locator('#search-results [data-record="' + id + '"]').click();
        const section = page.locator('#detail .card-significance');
        await section.scrollIntoViewIfNeeded();
        assert.equal(await section.locator('h4').innerText(), 'Why it matters');
        assert((await section.locator('p').innerText()).length > 250);
        assert(await section.evaluate(node => node.nextElementSibling.matches('.card-sources')));
        assert.equal(await page.locator('#detail').evaluate(node => node.scrollWidth > node.clientWidth), false);
        const sources = page.locator('#detail .card-sources');
        await sources.locator('summary').click();
        const urls = await sources.locator('a').evaluateAll(nodes => nodes.map(node => node.href));
        assert.equal(new Set(urls).size, urls.length, id + ': no duplicate links');
        const required = await page.evaluate(id => EXHIBITION.all.find(card => card.id === id).significanceSources.map(source => new URL(source.url).href), id);
        for (const url of required) assert(urls.includes(url), id + ': significance evidence is available');
        assert(!/\sCE\b/.test(await page.locator('#detail').innerText()), 'retain approved date style');
        if (width < 600) await page.keyboard.press('Escape');
      }
      assert.deepEqual(errors, []);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});
