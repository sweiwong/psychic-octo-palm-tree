const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const baseUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:8765/history-of-china/snake-timeline/';

test('Xin long-form card is linked, illustrated and readable on desktop and phone', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } });
      try {
        const url = new URL(baseUrl);url.searchParams.set('card', 'xin');
        await page.goto(url.href, { waitUntil: 'domcontentloaded' });
        await page.getByRole('heading', { name: 'Xin', exact: true }).waitFor();

        assert.equal(await page.locator('.card-chinese-name').innerText(), '新朝');
        assert.equal(await page.locator('.card-pinyin').innerText(), 'xīn cháo');
        assert.equal(await page.locator('.card-analysis').count(), 6);
        assert.match(await page.locator('#detail').innerText(), /Population records and their limits/);
        assert.match(await page.locator('#detail').innerText(), /cannot be used to calculate how many people died/);
        assert.deepEqual(
          await page.locator('#detail a[data-card-id]').evaluateAll(nodes => [...new Set(nodes.map(node => node.dataset.cardId))]),
          ['han', 'catalog-R_HAN_W', 'catalog-R_HAN_E', 'catalog-R_ZHOU', 'chang-an', 'ban-zhao'],
        );
        assert.equal(await page.locator('.card-sources > .source-link').count(), 7);
        const hero = page.locator('.card-body > .card-photo');
        assert.match(await hero.locator('figcaption').innerText(), /Gary Lee Todd.*CC BY-SA 4\.0/s);
        assert.match(await hero.locator('img').getAttribute('alt'), /front and reverse/i);
        await hero.locator('img').evaluate(image => image.complete || new Promise(resolve => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        }));
        assert.equal(await hero.evaluate(figure => {
          const image = figure.querySelector('img');
          return image.naturalWidth > 0 || image.hidden && figure.textContent.startsWith('Image unavailable.');
        }), true);
        const collapse = page.locator('.card-analysis').filter({ has: page.getByRole('heading', { name: 'Catastrophe and collapse', exact: true }) });
        const map = collapse.locator('.card-section-photo');
        assert.equal(await map.count(), 1);
        assert.match(await map.locator('img').getAttribute('alt'), /Red Eyebrow and Lulin uprisings/i);
        assert.match(await map.locator('figcaption').innerText(), /17–26.+23.+SY.+CC BY-SA 4\.0/s);
        assert.equal(await map.locator('.image-enlarge').getAttribute('href'), 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Xin_Dynasty_Uprisings.png');
        await map.locator('img').evaluate(image => image.complete || new Promise(resolve => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        }));
        assert.equal(await map.evaluate(figure => {
          const image = figure.querySelector('img');
          return image.naturalWidth > 0 || image.hidden && figure.textContent.startsWith('Image unavailable.');
        }), true);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);

        if (width === 1440) {
          await page.locator('.card-description a[data-card-id="han"]').click();
          await page.getByRole('heading', { name: 'Han', exact: true }).waitFor();
          assert.equal(await page.locator('.card-backlinks a[data-card-id="xin"]').count(), 1);
          await page.locator('.card-backlinks a[data-card-id="xin"]').click();
          await page.getByRole('heading', { name: 'Xin', exact: true }).waitFor();
        }
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
});

test('Xin remains searchable by its tone-free Chinese reading', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(baseUrl);
    await page.locator('#search').fill('xin chao');
    assert.equal(await page.locator('#search-results [data-record="xin"]').count(), 1);
  } finally {
    await browser.close();
  }
});
