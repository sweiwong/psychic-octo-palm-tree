const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const guard = path.join(__dirname, 'protected_file_guard.js');
const gitGuard = path.join(__dirname, 'protected_file_git_guard.sh');

function runGuard(changedFiles, labels = []) {
  return spawnSync(process.execPath, [guard], {
    cwd: __dirname,
    encoding: 'utf8',
    input: `${changedFiles.join('\n')}\n`,
    env: { ...process.env, PR_LABELS_JSON: JSON.stringify(labels) },
  });
}

function git(cwd, ...args) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}

function createGitRepo(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'atlas-release-guard-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  git(directory, 'init', '--quiet');
  git(directory, 'config', 'user.name', 'Release Guard Test');
  git(directory, 'config', 'user.email', 'release-guard@example.com');
  return directory;
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

test('rejects a protected file renamed to an unprotected name in a real Git comparison', t => {
  const directory = createGitRepo(t);
  fs.writeFileSync(path.join(directory, 'app.js'), 'const protectedTimeline = true;\n');
  git(directory, 'add', 'app.js');
  git(directory, 'commit', '--quiet', '-m', 'add protected file');
  const base = git(directory, 'rev-parse', 'HEAD');
  fs.renameSync(path.join(directory, 'app.js'), path.join(directory, 'card_copy.js'));
  git(directory, 'add', '--all');
  git(directory, 'commit', '--quiet', '-m', 'rename protected file');
  const head = git(directory, 'rev-parse', 'HEAD');

  const result = spawnSync('bash', [gitGuard, base, head], {
    cwd: directory,
    encoding: 'utf8',
    env: { ...process.env, PR_LABELS_JSON: '[]' },
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /app\.js/);
});

test('fails when Git cannot compare the requested revisions', t => {
  const directory = createGitRepo(t);
  fs.writeFileSync(path.join(directory, 'card_copy.js'), 'const cardCopy = true;\n');
  git(directory, 'add', 'card_copy.js');
  git(directory, 'commit', '--quiet', '-m', 'add card content');
  const base = git(directory, 'rev-parse', 'HEAD');

  const result = spawnSync('bash', [gitGuard, base, 'not-a-valid-revision'], {
    cwd: directory,
    encoding: 'utf8',
    env: { ...process.env, PR_LABELS_JSON: '[]' },
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /bad revision|unknown revision|ambiguous argument/);
});
