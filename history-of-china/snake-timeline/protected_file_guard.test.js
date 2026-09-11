const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const guard = path.join(__dirname, 'protected_file_guard.js');

function runGuard(changedFiles, labels = []) {
  return spawnSync(process.execPath, [guard], {
    cwd: __dirname,
    encoding: 'utf8',
    input: `${changedFiles.join('\n')}\n`,
    env: { ...process.env, PR_LABELS_JSON: JSON.stringify(labels) },
  });
}

test('rejects protected files in a card-only change', () => {
  const result = runGuard(['geometry.js', 'app.js', 'styles.css', 'beginner_early.js']);

  assert.notEqual(result.status, 0);
  for (const protectedFile of ['geometry.js', 'app.js', 'styles.css']) {
    assert.match(result.stderr, new RegExp(protectedFile.replace('.', '\\.')));
  }
  assert.match(result.stderr, /timeline-change/);
});

test('allows card-only content files', () => {
  const result = runGuard(['beginner_early.js', 'beginner_middle.js']);

  assert.equal(result.status, 0, result.stderr);
});

test('allows protected files with the timeline-change label', () => {
  const result = runGuard(['app.js', 'styles.css'], ['timeline-change']);

  assert.equal(result.status, 0, result.stderr);
});
