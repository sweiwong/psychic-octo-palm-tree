const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const baseUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:8765/history-of-china/snake-timeline/';
let browser;
test.before(async () => { browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) }); });
test.after(async () => { await browser?.close(); });

async function pageWithFixtures(width = 1440, suffix = '') {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  page.setDefaultTimeout(5000);
  await page.route('**/card_notes.js*', route => route.fulfill({
    contentType: 'application/javascript',
    body: fs.readFileSync(__dirname + '/card_notes.js', 'utf8') + `
      CARD_NOTES.revisions.han.description = 'Read [[Three Kingdoms]] then [[Qing|the Qing dynasty]]. <b>literal prose</b>';
      CARD_NOTES.revisions.han.sections = [{title: 'After [[Three Kingdoms]]', text: 'See [[id:qing|the Qing era]].'}];
      CARD_NOTES.revisions.han.note = 'Also [[Qing]].';
      CARD_NOTES.revisions.qin.description = 'Read [[Qing]] and [[Qing]].';`,
  }));
  await page.goto(baseUrl + suffix);
  await page.locator('#chart svg').waitFor();
  return page;
}
async function openFromIndex(page, id) {
  await page.locator('#index-toggle').click();
  await page.locator(`[data-record="${id}"]`).click();
}
async function expectCard(page, name) {
  await page.waitForFunction(name => document.querySelector('#detail h3')?.textContent === name, name);
}

test('renders safe links in all prose fields, follows them and derives ordered backlinks', async () => {
  const page = await pageWithFixtures();
  try {
    await openFromIndex(page, 'han');
    const direct = page.locator('.card-description a', { hasText: 'Three Kingdoms' });
    assert.match(await direct.getAttribute('href'), /\?card=three-kingdoms$/);
    assert.equal(await page.locator('.card-description b').count(), 0);
    assert.match(await page.locator('.card-description').innerText(), /<b>literal prose<\/b>/);
    assert.equal(await page.locator('.card-analysis h4 a').count(), 1);
    assert.equal(await page.locator('.card-analysis p a').count(), 1);
    assert.equal(await page.locator('.card-note a').count(), 1);
    await direct.click();
    await expectCard(page, 'Three Kingdoms');
    await page.locator('.card-backlinks a[data-card-id="han"]').click();
    await expectCard(page, 'Han');
    await page.locator('.card-description a', { hasText: 'the Qing dynasty' }).click();
    await expectCard(page, 'Qing');
    assert.deepEqual(await page.locator('.card-backlinks a').evaluateAll(nodes => nodes.map(node => node.dataset.cardId)), ['qin', 'han', 'three-kingdoms', 'tang', 'early-qing']);
  } finally { await page.close(); }
});

test('search summaries and tooltips show labels without nested links or raw brackets', async () => {
  const page = await pageWithFixtures();
  try {
    await page.locator('#search').fill('literal prose');
    const result = page.locator('[data-record="han"]');
    assert.equal(await result.locator('a').count(), 0);
    assert.doesNotMatch(await result.innerText(), /\[\[|\]\]/);
    assert.match(await result.innerText(), /the Qing dynasty/);
    await page.locator('#search').fill('');
    await page.locator('#index-toggle').click();
    await page.locator('#chart [data-item="han"][tabindex="0"]').first().focus();
    assert.doesNotMatch(await page.locator('#tooltip').innerText(), /\[\[|\]\]/);
  } finally { await page.close(); }
});

test('card navigation preserves URL context and restores cards with Back, Forward and Close', async () => {
  const page = await pageWithFixtures(1440, '?view=reader#reading-notes');
  try {
    await page.locator('#search').fill('literal prose');
    await page.locator('[data-record="han"]').click();
    assert.equal(new URL(page.url()).searchParams.get('card'), 'han');
    await page.locator('.card-description a[data-card-id="qing"]').click();
    assert.equal(new URL(page.url()).searchParams.get('card'), 'qing');
    assert.equal(new URL(page.url()).searchParams.get('view'), 'reader');
    assert.equal(new URL(page.url()).hash, '#reading-notes');
    await page.goBack(); await expectCard(page, 'Han');
    await page.goForward(); await expectCard(page, 'Qing');
    await page.locator('.detail-close').click(); await expectCard(page, 'Han');
    await page.locator('.detail-close').click();
    await expectCard(page, 'Explore Chinese history');
    assert.equal(new URL(page.url()).searchParams.has('card'), false);
    assert.equal(await page.locator('#search').inputValue(), 'literal prose');
    assert.equal(await page.locator('#collection').isVisible(), true);
    await page.goForward(); await expectCard(page, 'Han');
  } finally { await page.close(); }
});

test('direct URLs and reload open cards; direct Close replaces only the card query', async () => {
  const page = await pageWithFixtures(1440, '?view=reader&card=qing#reading-notes');
  try {
    await expectCard(page, 'Qing');
    await page.reload(); await expectCard(page, 'Qing');
    const length = await page.evaluate(() => history.length);
    await page.locator('.detail-close').click();
    await expectCard(page, 'Explore Chinese history');
    assert.equal(await page.evaluate(() => history.length), length);
    assert.equal(new URL(page.url()).search, '?view=reader');
    assert.equal(new URL(page.url()).hash, '#reading-notes');
  } finally { await page.close(); }
});

test('unknown card URLs recover to a usable atlas', async () => {
  const page = await pageWithFixtures(1440, '?view=reader&card=missing#reading-notes');
  try {
    assert.equal(new URL(page.url()).search, '?view=reader');
    await expectCard(page, 'Explore Chinese history');
    await openFromIndex(page, 'han'); await expectCard(page, 'Han');
  } finally { await page.close(); }
});

test('following a link leaves the selected timeline range and filters intact', async () => {
  const page = await pageWithFixtures();
  try {
    await page.locator('[data-section="early"]').click();
    await openFromIndex(page, 'han');
    await page.locator('.card-description a[data-card-id="qing"]').click();
    await expectCard(page, 'Qing');
    assert.equal(await page.locator('[data-section="early"]').getAttribute('aria-pressed'), 'true');
  } finally { await page.close(); }
});

for (const width of [1440, 390]) {
  test(`${width}px: links move focus, reuse one detail surface and return to the invoking control`, async () => {
    const page = await pageWithFixtures(width);
    try {
      await openFromIndex(page, 'han');
      assert.equal(await page.locator('#detail h3').evaluate(node => node === document.activeElement), true);
      if (width === 1440) await page.locator('.detail-expand').click();
      const link = page.locator('.card-description a[data-card-id="qing"]');
      await link.focus();await page.keyboard.press('Enter');
      await expectCard(page, 'Qing');
      assert.equal(await page.locator('#detail h3').evaluate(node => node === document.activeElement), true);
      assert.equal(await page.locator('#detail').count(), 1);
      assert.equal(await page.locator('.reading-dialog').evaluate(node => node.open), width === 1440);
      assert.equal(await page.locator('#detail').evaluate(node => node.classList.contains('mobile-open')), width === 390);
      await page.goBack();await expectCard(page, 'Han');
      await page.goForward();await expectCard(page, 'Qing');
      await page.goBack();await expectCard(page, 'Han');
      if (width === 1440) await page.keyboard.press('Escape');
      await page.locator('.detail-close').click();
      await expectCard(page, 'Explore Chinese history');
      assert.equal(await page.locator('[data-record="han"]').evaluate(node => node === document.activeElement), true);
      assert.equal(await page.locator('[inert]').count(), 0);
    } finally { await page.close(); }
  });

  test(`${width}px: a direct card URL supports links, backlinks, reload and Close`, async () => {
    const page = await pageWithFixtures(width, '?card=han');
    try {
      await expectCard(page, 'Han');
      await page.locator('.card-description a[data-card-id="qing"]').click();
      await page.locator('.card-backlinks a[data-card-id="han"]').click();
      await expectCard(page, 'Han');
      await page.reload();await expectCard(page, 'Han');
      await page.locator('.detail-close').click();await expectCard(page, 'Qing');
      await page.locator('.detail-close').click();await expectCard(page, 'Han');
      await page.locator('.detail-close').click();await expectCard(page, 'Explore Chinese history');
      assert.equal(new URL(page.url()).searchParams.has('card'), false);
    } finally { await page.close(); }
  });
}

test('modified clicks retain native anchor behavior and the link works in a fresh tab', async () => {
  const page = await pageWithFixtures();
  try {
    await openFromIndex(page, 'han');
    const link = page.locator('.card-description a[data-card-id="qing"]');
    for (const modifier of ['ctrlKey', 'metaKey', 'shiftKey', 'altKey']) {
      const intercepted = await link.evaluate((node, modifier) => {
        const event = new MouseEvent('click', { bubbles: true, cancelable: true, [modifier]: true });
        // Block the browser's default action only after the application's detail handler ran.
        let intercepted;
        const observe = event => { intercepted = event.defaultPrevented;event.preventDefault(); };
        document.addEventListener('click', observe, { once: true });
        node.dispatchEvent(event);return intercepted;
      }, modifier);
      assert.equal(intercepted, false, modifier);
    }
    const fresh = await browser.newPage();
    try {
      await fresh.goto(await link.evaluate(node => node.href));await expectCard(fresh, 'Qing');
    } finally { await fresh.close(); }
    await expectCard(page, 'Han');
  } finally { await page.close(); }
});

test('phone focus stays in the sheet and resizing keeps one active surface', async () => {
  const page = await pageWithFixtures(390, '?card=han');
  try {
    await page.locator('#detail h3').focus();await page.keyboard.press('Shift+Tab');
    assert.equal(await page.locator('#detail').evaluate(node => node.contains(document.activeElement)), true);
    await page.setViewportSize({width: 1440, height: 1000});
    await page.locator('.detail-expand').click();
    await page.setViewportSize({width: 390, height: 1000});
    await page.waitForFunction(() => !document.querySelector('.reading-dialog').open && document.querySelector('#detail').classList.contains('mobile-open'));
    assert.equal(await page.locator('.reading-dialog').evaluate(node => node.open), false);
    assert.equal(await page.locator('#detail').evaluate(node => node.classList.contains('mobile-open')), true);
    await expectCard(page, 'Han');
  } finally { await page.close(); }
});

test('period selection and Home keep visible cards consistent with their URLs', async () => {
  const page = await pageWithFixtures(1440, '?view=reader&card=qing');
  try {
    await page.locator('[data-section="early"]').click();
    await expectCard(page, 'Xia');
    assert.equal(new URL(page.url()).searchParams.get('card'), 'xia');
    await page.reload();await expectCard(page, 'Xia');
    await page.locator('.brand').click();await expectCard(page, 'Explore Chinese history');
    assert.equal(new URL(page.url()).searchParams.get('card'), null);
    assert.equal(new URL(page.url()).searchParams.get('view'), 'reader');
    await page.goBack();await expectCard(page, 'Xia');
  } finally { await page.close(); }
});

test('Close returns to the closed period preview when that was the previous page state', async () => {
  const page = await pageWithFixtures(390);
  try {
    await page.locator('.start-early').click();
    await page.locator('[data-period="shang"]').click();
    await page.locator('.detail-close').click();
    await expectCard(page, 'Xia');
    assert.equal(await page.locator('#detail').evaluate(node => node.classList.contains('mobile-open')), false);
    assert.equal(await page.locator('.masthead').evaluate(node => node.inert), false);
    await page.locator('#index-toggle').click();
    assert.equal(await page.locator('#collection').isVisible(), true);
  } finally { await page.close(); }
});

test('opening the previewed card records its open state for reload and Back', async () => {
  const page = await pageWithFixtures(390);
  try {
    await page.locator('.start-early').click();
    await page.locator('[data-period="xia"]').click();
    assert.equal(await page.locator('#detail').evaluate(node => node.classList.contains('mobile-open')), true);
    await page.reload();await expectCard(page, 'Xia');
    assert.equal(await page.locator('#detail').evaluate(node => node.classList.contains('mobile-open')), true);
    await page.locator('.detail-close').click();
    await page.waitForFunction(() => !document.querySelector('#detail').classList.contains('mobile-open'));
    await page.goForward();
    await page.waitForFunction(() => document.querySelector('#detail').classList.contains('mobile-open'));
  } finally { await page.close(); }
});

test('Back from an expanded card restores the ordinary period preview and its focus', async () => {
  const page = await pageWithFixtures();
  try {
    await page.locator('.start-early').click();
    await page.locator('[data-period="shang"]').click();
    await page.locator('.detail-expand').click();
    await page.goBack();await expectCard(page, 'Xia');
    assert.equal(await page.locator('.reading-dialog').evaluate(node => node.open), false);
    assert.equal(await page.locator('[data-period="shang"]').evaluate(node => node === document.activeElement), true);
  } finally { await page.close(); }
});
