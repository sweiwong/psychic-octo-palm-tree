const canonicalProductionSource = {
  VERCEL_GIT_PROVIDER: 'github',
  VERCEL_GIT_REPO_OWNER: 'sweiwong',
  VERCEL_GIT_REPO_SLUG: 'psychic-octo-palm-tree',
  VERCEL_GIT_COMMIT_REF: 'main',
};

const isCanonicalSource = Object.entries(canonicalProductionSource)
  .every(([variable, expected]) => process.env[variable] === expected);

if (process.env.VERCEL_ENV === 'production') {
  if (isCanonicalSource) {
    console.log('Production deployment source accepted: sweiwong/psychic-octo-palm-tree main.');
  } else {
    console.error(
      'Production deployment blocked: expected GitHub source sweiwong/psychic-octo-palm-tree on main.',
    );
    process.exitCode = 1;
  }
}
