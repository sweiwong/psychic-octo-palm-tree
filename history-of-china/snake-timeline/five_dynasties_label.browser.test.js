const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

test('Five Dynasties uses its short timeline label beside the correct historical row', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1024, height: 1000 } });
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:8765/history-of-china/snake-timeline/');
    await page.waitForFunction(() => window.timelineInspection?.labels.some(label => label.id === 'five-dynasties'));

    const label = await page.evaluate(() => {
      const position = timelineInspection.labels.find(item => item.id === 'five-dynasties');
      const text = document.querySelector('.timeline-labels [data-item="five-dynasties"] .label-name')?.textContent;
      return { ...position, text };
    });
    assert.equal(label.text, 'Five Dynasties');
    assert(label.y >= label.baseline - 90 && label.y <= label.baseline + 70);

    await page.locator('.timeline-labels [data-item="five-dynasties"]').click();
    await assert.doesNotReject(() => page.getByRole('heading', { name: 'Five Dynasties and Ten Kingdoms', exact: true }).waitFor());
  } finally {
    await browser.close();
  }
});
