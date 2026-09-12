const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

test('Xin has a compact clickable label below its 9–23 CE ribbon', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:8765/history-of-china/snake-timeline/');
    await page.waitForFunction(
      () => window.timelineInspection?.labels.some(label => label.id === 'xin'),
      undefined,
      { timeout: 3_000 },
    );

    for (const width of [1440, 900, 768, 390]) {
      await page.setViewportSize({ width, height: 1400 });
      await page.waitForFunction(
        () => Math.round(document.querySelector('#chart').clientWidth) === timelineInspection.geometry.width,
      );
      const label = await page.evaluate(() => {
        const position = timelineInspection.labels.find(item => item.id === 'xin');
        const node = document.querySelector('.timeline-labels [data-item="xin"]');
        const overlaps = timelineInspection.labels.filter(item => item.id !== 'xin'
          && position.x < item.x + item.w + 8
          && position.x + position.w + 8 > item.x
          && position.y < item.y + item.h + 7
          && position.y + position.h + 7 > item.y);
        return {
          ...position,
          name: node?.querySelector('.label-name')?.textContent,
          date: node?.querySelector('.label-date')?.textContent,
          overlaps: overlaps.map(item => item.id),
          hasLeader: timelineInspection.leaders.some(item => item.id === 'xin'),
        };
      });

      assert.equal(label.name, 'Xin', `${width}px label name`);
      assert.equal(label.date, '9–23', `${width}px label date`);
      assert(label.y > label.baseline, `${width}px Xin label should sit below its timeline row`);
      assert.deepEqual(label.overlaps, [], `${width}px Xin label overlap`);
      assert.equal(label.hasLeader, true, `${width}px Xin label connector`);
    }

    const exported = await page.evaluate(async () => {
      const response = await fetch('data/china_history_expanded.json');
      const data = await response.json();
      return data.cards.find(card => card.id === 'xin');
    });
    assert.equal(exported.label, true);
    assert.equal(exported.labelPosition, 'below');
    assert.equal(exported.compactLabel, true);

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.locator('.timeline-labels [data-item="xin"] .label-name').click();
    await assert.doesNotReject(() => page.getByRole('heading', { name: 'Xin', exact: true }).waitFor());
  } finally {
    await browser.close();
  }
});
