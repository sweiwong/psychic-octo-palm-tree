const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const guard = path.join(__dirname, 'deployment_source_guard.js');
const sourceVariables = [
  'VERCEL_ENV',
  'VERCEL_GIT_PROVIDER',
  'VERCEL_GIT_REPO_OWNER',
  'VERCEL_GIT_REPO_SLUG',
  'VERCEL_GIT_COMMIT_REF',
];

function runGuard(variables = {}) {
  const env = { ...process.env };
  for (const variable of sourceVariables) delete env[variable];
  Object.assign(env, variables);
  return spawnSync(process.execPath, [guard], { cwd: __dirname, encoding: 'utf8', env });
}

test('allows a production build from canonical GitHub main', () => {
  const result = runGuard({
    VERCEL_ENV: 'production',
    VERCEL_GIT_PROVIDER: 'github',
    VERCEL_GIT_REPO_OWNER: 'sweiwong',
    VERCEL_GIT_REPO_SLUG: 'psychic-octo-palm-tree',
    VERCEL_GIT_COMMIT_REF: 'main',
  });

  assert.equal(result.status, 0, result.stderr);
});

test('rejects a production build from a feature branch', () => {
  const result = runGuard({
    VERCEL_ENV: 'production',
    VERCEL_GIT_PROVIDER: 'github',
    VERCEL_GIT_REPO_OWNER: 'sweiwong',
    VERCEL_GIT_REPO_SLUG: 'psychic-octo-palm-tree',
    VERCEL_GIT_COMMIT_REF: 'codex/card-update',
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Production deployment blocked/);
});

test('rejects a production build from a different Git repository', () => {
  const result = runGuard({
    VERCEL_ENV: 'production',
    VERCEL_GIT_PROVIDER: 'github',
    VERCEL_GIT_REPO_OWNER: 'another-owner',
    VERCEL_GIT_REPO_SLUG: 'another-repository',
    VERCEL_GIT_COMMIT_REF: 'main',
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Production deployment blocked/);
});

test('rejects a production build without a Git source', () => {
  const result = runGuard({ VERCEL_ENV: 'production' });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Production deployment blocked/);
});

test('allows a preview build from a feature branch', () => {
  const result = runGuard({
    VERCEL_ENV: 'preview',
    VERCEL_GIT_PROVIDER: 'github',
    VERCEL_GIT_REPO_OWNER: 'sweiwong',
    VERCEL_GIT_REPO_SLUG: 'psychic-octo-palm-tree',
    VERCEL_GIT_COMMIT_REF: 'codex/card-update',
  });

  assert.equal(result.status, 0, result.stderr);
});

test('allows a local build without Vercel variables', () => {
  const result = runGuard();

  assert.equal(result.status, 0, result.stderr);
});
