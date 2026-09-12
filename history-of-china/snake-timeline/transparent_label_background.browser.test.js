const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

test('Timeline labels blend into the paper without opaque rectangles', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:8765/history-of-china/snake-timeline/');
    await page.waitForFunction(() => document.querySelectorAll('.timeline-labels .label-bg').length > 0);

    const opaqueLabels = await page.locator('.timeline-labels .label-bg').evaluateAll(labels => labels
      .filter(label => getComputedStyle(label).fill !== 'rgba(0, 0, 0, 0)')
      .map(label => label.parentElement.dataset.item));

    assert.deepEqual(opaqueLabels, []);
  } finally {
    await browser.close();
  }
});
