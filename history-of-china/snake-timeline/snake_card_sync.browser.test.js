const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

test('opening any timeline card keeps the overview snake geometry unchanged', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [1800, 1440, 1024, 768, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } });
      try {
        await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:8765/history-of-china/snake-timeline/');
        await page.waitForFunction(() => window.timelineInspection?.labels.some(label => label.id === 'xin'));
        const before = await page.evaluate(() => ({
          width: timelineInspection.geometry.width,
          rows: timelineInspection.geometry.rows,
          pathLength: timelineInspection.geometry.length,
          xin: timelineInspection.geometry.point(9),
          present: timelineInspection.geometry.point(2026),
        }));

        if (width === 1800) {
          assert.equal(before.rows, 5, 'wide overview uses five rows');
          assert(before.present.x > before.width / 2, 'wide overview ends with the PRC on the right');
        }
        if (width === 1440) assert.equal(before.rows, 6, 'medium desktop uses six rows for more space');

        const cardIds = await page.locator('.timeline-labels [data-item]').evaluateAll(nodes =>
          [...new Set(nodes.map(node => node.dataset.item))]
        );
        assert(cardIds.includes('xin'), `${width}px timeline includes Xin`);

        for (const cardId of cardIds) {
          await page.locator(`.timeline-labels [data-item="${cardId}"]`).first().dispatchEvent('click');
          await page.locator('#detail h3').waitFor();
          await page.waitForFunction(() => Math.round(document.querySelector('#chart').clientWidth) === timelineInspection.geometry.width);
          const after = await page.evaluate(() => ({
            width: timelineInspection.geometry.width,
            rows: timelineInspection.geometry.rows,
            pathLength: timelineInspection.geometry.length,
            xin: timelineInspection.geometry.point(9),
            present: timelineInspection.geometry.point(2026),
          }));

          assert.deepEqual(after, before, `${width}px geometry after opening ${cardId}`);
        }
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
});
