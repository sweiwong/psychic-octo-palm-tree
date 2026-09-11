const fs = require('node:fs');

const protectedFiles = new Set(['geometry.js', 'app.js', 'styles.css']);
const changedFiles = fs.readFileSync(0, 'utf8').split(/\r?\n/).filter(Boolean);
const blockedFiles = changedFiles.filter(file => protectedFiles.has(file));
const labels = JSON.parse(process.env.PR_LABELS_JSON || '[]');

if (blockedFiles.length > 0 && !labels.includes('timeline-change')) {
  console.error(
    `Protected timeline file changes require the timeline-change label: ${blockedFiles.join(', ')}`,
  );
  process.exitCode = 1;
}
