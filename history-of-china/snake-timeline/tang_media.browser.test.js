const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const images = require('./image_data.js');
let browser;

test.before(async () => { browser = await chromium.launch({ headless: true }); });
test.after(async () => { await browser?.close(); });

for (const width of [1440, 390]) {
  test(`Tang has seven credited, enlargable visuals beside the relevant text at ${width}px`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    try {
      // Layout and navigation checks should not depend on museum servers being available.
      await page.route('https://**/*', route => route.fulfill({
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="700" height="800"/>',
      }));
      await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=tang');
      const lead = page.locator('.card-body > .card-photo');
      assert.match(await lead.locator('img').getAttribute('src'), /Tang_outline_map/);
      assert.equal(await page.locator('#detail img[src*="Tang_outline_map"]').count(), 1);
      assert.equal(await page.locator('#detail img[src*="Camel"]').count(), 1);
      const camel = page.locator('.card-analysis .card-photo').filter({ has: page.locator('img[src*="Camel"]') });
      assert.match(await camel.locator('figcaption').innerText(), /Silk Road.*Sogdian.*cosmopolitan/);
      assert.equal(await page.locator('.card-photo').count(), 7);

      for (const [heading, caption] of [
        ['A world capital', /Night-Shining White.*attributed to Han Gan/],
        ['Wu Zetian', /Vairocana Buddha.*675/],
        ['The centre of gravity moves south', /composite map/],
      ]) {
        const section = page.locator('.card-analysis').filter({ has: page.getByRole('heading', { name: heading, exact: true }) });
        assert.match(await section.locator('figcaption').first().innerText(), caption);
        assert.equal(await section.locator('img').first().getAttribute('loading'), 'lazy');
      }

      for (const figure of await page.locator('.card-photo').all()) {
        const photo = figure.locator('img');
        const enlarge = figure.getByRole('link', { name: /Open image at full size/ });
        assert.equal(await enlarge.getAttribute('href'), await photo.getAttribute('src'));
        assert.equal(await enlarge.getAttribute('target'), '_blank');
        assert.match(await enlarge.getAttribute('rel'), /noopener/);
        assert.equal(await figure.locator('figcaption a').count(), 2);
        await photo.scrollIntoViewIfNeeded();
        const bounds = await photo.boundingBox();
        assert.ok(bounds.width > 0 && bounds.width <= width, 'image fits the screen');
      }
      const culture = page.locator('.card-analysis').filter({ has: page.getByRole('heading', { name: 'A world capital', exact: true }) });
      assert.equal(await culture.locator('.card-section-images .card-photo').count(), 4);
      assert.match(await culture.innerText(), /high-waisted dress.*short jacket/);
      assert.match(await culture.innerText(), /Nishapur.*Iran/);
      if (width === 1440) await page.getByRole('button', { name: 'Open full card', exact: true }).click();
      const figures = culture.locator('.card-photo');
      const first = await figures.nth(0).boundingBox();
      const second = await figures.nth(1).boundingBox();
      if (width === 1440) assert.ok(Math.abs(first.y - second.y) < 1, 'wide reading view pairs images');
      else assert.ok(second.y > first.y, 'phone view stacks images');
      assert.equal(await page.locator('.card-description a, .card-analysis a[data-card-id]').count(), 26);
      assert.ok(await page.locator('#detail').evaluate(node => node.scrollWidth <= node.clientWidth + 1));
    } finally { await page.close(); }
  });
}

test('Tang image failures retain captions, credits, and full-size links', async () => {
  const page = await browser.newPage();
  try {
    await page.route('https://**/*', route => route.abort());
    await page.goto(pathToFileURL(__dirname + '/index.html').href + '?card=tang');
    assert.equal(await page.locator('.card-photo').count(), 7);
    for (const figure of await page.locator('.card-photo').all()) {
      await figure.scrollIntoViewIfNeeded();
      await figure.locator('img').waitFor({ state: 'hidden' });
      assert.match(await figure.locator('figcaption').innerText(), /Image unavailable/);
      assert.equal(await figure.getByRole('link', { name: /Open image at full size/ }).count(), 1);
    }
  } finally { await page.close(); }
});

test('Tang supporting images have complete attribution and dimensions', () => {
  assert.equal(images.tang.sectionImages?.length, 6);
  for (const image of [images.tang, ...images.tang.sectionImages]) {
    for (const field of ['src', 'source', 'licenseUrl']) assert.match(image[field], /^https:\/\//);
    for (const field of ['alt', 'caption', 'credit', 'license']) assert.ok(image[field]?.length > 3);
    assert.ok(image.width > 0 && image.height > 0);
  }
});
