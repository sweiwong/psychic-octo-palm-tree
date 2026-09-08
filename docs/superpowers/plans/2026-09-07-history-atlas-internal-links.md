# History Atlas Internal Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Status

- **Phase:** Implementation complete; final verification recorded below; unpublished
- **Last completed:** Tasks 1–8 and the Task 9 acceptance checks
- **Next up:** Wei reviews the local changes. No commit, push or publication is authorized.
- **Updated:** 2026-09-07

**Goal:** Let Chinese History Atlas prose use Obsidian-style internal links, open linked cards with shareable browser history, detect broken links before publication, and derive backlinks automatically.

**Architecture:** Keep the site dependency-free. Add one small pure JavaScript module that parses link markup, resolves stable card identities, creates the link graph, and renders safe DOM nodes. Build its registry from `EXHIBITION.all` only after all source and beginner-edition overrides have been applied. Route every card-opening action through one URL-aware navigator so links, search, dialogs, mobile sheets, reload, Back, and Forward agree.

**Tech stack:** Browser JavaScript, CommonJS-compatible Node tests, HTML, CSS, existing shell/Node test scripts, and Playwright browser tests.

**Design specification:** `docs/superpowers/specs/2026-09-07-history-atlas-internal-links-design.md`

## Rules for every task

- Work in `/Users/weiwong/.codex/worktrees/141c/psychic-octo-palm-tree/history-of-china/snake-timeline/`.
- Preserve the current dependency-free architecture.
- Write a failing test before changing behavior, then make the smallest change that passes it.
- Never hand-edit `catalog_data.js` or `data/china_history_expanded.json`; rebuild them from their source pipeline.
- Keep `[[...]]` as source text. Never convert source content to saved HTML.
- Never render card prose with `innerHTML`; create text nodes and anchor elements.
- Do not treat broad `searchAliases` as internal-link identities.
- Commit after each task only if the user has authorized commits.

---

## Task 1: Add the pure internal-link engine

**Files:**

- Create: `history-of-china/snake-timeline/internal_links.js`
- Create: `history-of-china/snake-timeline/internal_links.test.js`
- Modify: `history-of-china/snake-timeline/index.html`

- [x] **Step 1: Write failing parsing tests**

Cover these inputs exactly:

```js
assert.deepEqual(parse('See [[Qing]].'), [
  { type: 'text', value: 'See ' },
  { type: 'link', target: 'Qing', label: 'Qing', targetKind: 'title' },
  { type: 'text', value: '.' },
]);

assert.deepEqual(parse('During [[Qing|the Qing dynasty]]'), [
  { type: 'text', value: 'During ' },
  { type: 'link', target: 'Qing', label: 'the Qing dynasty', targetKind: 'title' },
]);

assert.deepEqual(parse('[[id:qing-dynasty|the Qing era]]'), [
  { type: 'link', target: 'qing-dynasty', label: 'the Qing era', targetKind: 'id' },
]);
```

Also test multiple links, Unicode titles, ordinary square brackets, unmatched brackets, empty targets, empty labels, and extra `|` characters. The parser must report malformed wiki syntax instead of silently dropping it.

- [x] **Step 2: Run the test and confirm it fails**

```bash
cd /Users/weiwong/.codex/worktrees/141c/psychic-octo-palm-tree/history-of-china/snake-timeline
node internal_links.test.js
```

Expected: failure because `internal_links.js` does not exist.

- [x] **Step 3: Implement parsing and normalization**

Export a browser global and `module.exports` containing:

```js
normalizeTitle(value)
parse(value)
plainText(value)
```

`normalizeTitle` trims, collapses whitespace, uses Unicode `NFKC`, removes accents for comparison, and lowercases. `plainText` returns visible labels without the wiki brackets.

- [x] **Step 4: Write failing identity and graph tests**

Test:

- canonical `linkTitle` lookup;
- explicit `linkAliases` lookup;
- direct `id:` lookup;
- duplicate titles and aliases;
- an alias colliding with another title;
- `searchAliases` being ignored;
- missing targets returning structured errors;
- one backlink for repeated links from the same source;
- no self-backlinks;
- chronological backlink ordering with title as a tie-breaker.

- [x] **Step 5: Implement identity, validation, and graph creation**

Add:

```js
createRegistry(cards)
resolveTarget(registry, parsedLink)
scanCard(card)
createGraph(cards, registry)
validateCards(cards)
```

Return structured results so tests and the browser can show the source card, field path, written target, and failure reason. Suggestions may use edit distance, but only in validation messages.

- [x] **Step 6: Write and implement safe rendering tests**

Add `appendRichText(container, value, options)`. In a minimal fake DOM, prove it appends text nodes and `<a>` elements, produces `?card=<encoded-id>`, exposes the resolved card ID through a callback/data attribute, and never interprets `<script>` or other prose as HTML.

- [x] **Step 7: Load the module before the application**

Add `internal_links.js` to `index.html` immediately before `app.js`, then run:

```bash
node internal_links.test.js
```

Expected: all internal-link unit tests pass.

---

## Task 2: Preserve stable editorial titles during content assembly

**Files:**

- Modify: `history-of-china/snake-timeline/beginner_edition.js`
- Modify: `history-of-china/snake-timeline/beginner_edition.test.js`

- [x] **Step 1: Write failing tests for `linkTitle` and explicit aliases**

Prove that a card's original English title becomes `linkTitle` before automatic Chinese annotations alter its visible `title`. Prove that a supplied `linkTitle` or `linkAliases` value is preserved and normalized only at lookup time.

- [x] **Step 2: Write a failing wiki-token annotation test**

Feed prose containing `[[Qing|the Qing dynasty]]` through the beginner-edition Chinese annotation pass. Assert that neither the target nor the label is rewritten inside the brackets.

- [x] **Step 3: Implement the smallest assembly change**

Capture `linkTitle` before title annotation, accept optional `linkAliases`, and temporarily protect wiki tokens while annotating prose. Restore the tokens byte-for-byte afterward.

- [x] **Step 4: Run the focused tests**

```bash
node beginner_edition.test.js
node internal_links.test.js
```

Expected: both pass.

---

## Task 3: Validate the complete 221-card collection

**Files:**

- Create: `history-of-china/snake-timeline/internal_links_collection.test.js`
- Modify only if needed: `history-of-china/snake-timeline/internal_links.js`

- [x] **Step 1: Reproduce the real assembly order in the test**

Load the same source files as `index.html`, apply the beginner packs, and construct the same final `EXHIBITION.all` collection used by `app.js`.

- [x] **Step 2: Assert collection integrity**

Verify:

```text
active card count = 221
every card has a unique stable id
every card has a unique normalized linkTitle
every explicit linkAlias resolves to exactly one card
every wiki link in every supported field resolves
```

- [x] **Step 3: Add useful failure output**

For a deliberately broken fixture, assert an error such as:

```text
Card "An Lushan Rebellion", field "description": [[Three Kingdms]] has no target. Did you mean "Three Kingdoms"?
```

- [x] **Step 4: Run the full collection validator**

```bash
node internal_links_collection.test.js
```

Expected: all 221 cards pass.

---

## Task 4: Render internal links and automatic backlinks

**Files:**

- Modify: `history-of-china/snake-timeline/app.js`
- Modify: `history-of-china/snake-timeline/style.css`
- Create: `history-of-china/snake-timeline/internal_links.browser.test.js`

- [x] **Step 1: Write failing browser tests for rendered prose**

Use a fixture card to assert that direct and aliased links appear with the correct label and `href`, and that clicking either selects the intended target card.

- [x] **Step 2: Build the registry and graph once**

Immediately after `EXHIBITION.all` is finalized, create the registry, validate the collection, and derive outbound links and backlinks. In development, surface validation errors clearly rather than leaving partly working links.

- [x] **Step 3: Replace prose-only text assignment with safe rich text**

In `updateDetail`, use `appendRichText` for `description`, section titles, section text, and `note`. Keep headings, dates, source captions, and other non-prose fields unchanged.

- [x] **Step 4: Keep summaries readable but non-nested**

Run search-result snippets and timeline/map tooltip text through `plainText`. Do not place anchors inside result buttons or other already-interactive controls.

- [x] **Step 5: Add the `Linked from` section**

Show it only when backlinks exist. Each entry includes the source card's visible title and date and uses the same card navigation callback as prose links.

- [x] **Step 6: Add restrained visual styling**

Style internal links as obvious links with visible hover and keyboard-focus states. Style backlinks as a compact secondary list that does not compete with the main article.

- [x] **Step 7: Run unit and browser tests**

```bash
node internal_links.test.js
node internal_links_collection.test.js
node internal_links.browser.test.js
```

Expected: links are clickable, aliases display correctly, unsafe HTML remains text, snippets have no brackets, and backlinks are correct.

---

## Task 5: Make card navigation URL-backed

**Files:**

- Modify: `history-of-china/snake-timeline/app.js`
- Modify: `history-of-china/snake-timeline/internal_links.browser.test.js`

- [x] **Step 1: Write failing URL and history tests**

Cover:

- opening a card writes `?card=<id>`;
- a prose link creates a new history entry;
- direct loading with `?card=<id>` opens that card;
- reload preserves the open card;
- Back returns from target card to source card;
- Forward reopens the target;
- an unknown card ID removes the invalid query and leaves the atlas usable;
- non-card query parameters and existing hash anchors survive.

- [x] **Step 2: Add one navigation controller**

Implement small functions with clear responsibilities:

```js
cardHref(cardId)
openCard(cardId, { historyMode, trigger })
closeCard({ historyMode })
applyLocation()
```

All selection surfaces call `openCard`; only `applyLocation` responds to initial load and `popstate`. Store enough page state in `history.state` to distinguish in-site navigation from a direct deep link.

- [x] **Step 3: Define close behavior**

If the current card was pushed by the atlas, Close calls browser Back. If the page was opened directly with a card query, Close removes only the `card` parameter with `replaceState` and closes the surface.

- [x] **Step 4: Preserve surrounding state**

Do not reset the selected collection, search text, filters, scroll position, or hash when moving between cards. When Back returns to the card index or search results, the reader should see the context they left.

- [x] **Step 5: Run the browser history suite**

```bash
node internal_links.browser.test.js
```

Expected: every URL/history case passes.

---

## Task 6: Verify desktop dialog, mobile sheet, and keyboard focus

**Files:**

- Modify: `history-of-china/snake-timeline/app.js`
- Modify: `history-of-china/snake-timeline/style.css`
- Modify: `history-of-china/snake-timeline/internal_links.browser.test.js`

- [x] **Step 1: Add desktop and mobile viewport tests**

At 1440px width, links update the existing dialog. At 390px width, the same links update the existing bottom sheet. In both cases, only one detail surface is active.

- [x] **Step 2: Add focus tests**

After navigation, focus the target card heading or the dialog/sheet container with an accessible label. When closing, return focus to the invoking link or card when it still exists; otherwise use the Browse all control as the safe fallback.

- [x] **Step 3: Verify keyboard and modified-click behavior**

Enter activates a focused link. Command/Ctrl-click and open-in-new-tab use the anchor URL without being intercepted as same-tab navigation.

- [x] **Step 4: Run the responsive test suite**

```bash
node internal_links.browser.test.js
```

Expected: desktop, mobile, keyboard, and focus tests pass.

---

## Task 7: Add representative production links

**Files:**

- Modify only the source pack files containing the relevant prose, expected among:
  - `history-of-china/snake-timeline/beginner_early.js`
  - `history-of-china/snake-timeline/beginner_middle.js`
  - `history-of-china/snake-timeline/beginner_late.js`
- Regenerate: `history-of-china/snake-timeline/catalog_data.js`
- Regenerate: `history-of-china/snake-timeline/data/china_history_expanded.json`

- [x] **Step 1: Locate the exact source records**

Use the IDs and `linkTitle` values from the collection validator. Do not guess filenames or edit generated output first.

- [x] **Step 2: Add three end-to-end examples**

Add natural editorial sentences containing one each of:

```text
[[Three Kingdoms]]
[[An Lushan Rebellion]]
[[Qing|the Qing dynasty]]
```

Keep the changes to the smallest coherent prose edits. Do not rewrite unrelated card copy.

- [x] **Step 3: Rebuild generated data with the existing generator**

```bash
node build_expanded.js
```

- [x] **Step 4: Run every link test**

```bash
node internal_links.test.js
node beginner_edition.test.js
node internal_links_collection.test.js
node internal_links.browser.test.js
```

Expected: the examples render and resolve, and the corresponding target cards show backlinks.

---

## Task 8: Document the editorial workflow and card index

**Files:**

- Modify: `history-of-china/snake-timeline/README.md`

- [x] **Step 1: Correct the index count**

Replace the stale 205-card statement with the validated active count of 221. Explain that `Browse all` is the current visual index of every active event card.

- [x] **Step 2: Document authoring syntax**

Include direct links, display aliases, the rare `id:` escape hatch, allowed prose fields, and how an unknown target appears in validation.

- [x] **Step 3: Document title and alias rules**

Explain `linkTitle`, `linkAliases`, why `searchAliases` do not count, and why card IDs should remain stable even if visible wording changes.

- [x] **Step 4: Document the publishing check**

Give the exact commands for rebuilding generated data and running link validation before publishing.

- [x] **Step 5: Record the long-term content direction without implementing it**

Add a short note that one-Markdown-file-per-card and optional Obsidian-vault sync are a separate future migration. Do not promise a storage format or sync mechanism in this release.

---

## Task 9: Complete the acceptance gate

**Files:**

- Modify only if a failing acceptance check reveals a feature defect.

- [x] **Step 1: Run all existing project tests**

Run every existing Node and browser test named in the README/package scripts, followed by the four new link suites. Record the pre-existing image-caption failure separately if it remains unrelated; do not hide or broaden this feature to fix it.

- [x] **Step 2: Rebuild and verify generated files are current**

```bash
node build_expanded.js
git diff --check
git status --short
```

Expected: the generator succeeds, no whitespace errors, and only planned files appear.

- [x] **Step 3: Perform the desktop acceptance journey**

At 1440px width:

1. Open Browse all and confirm 221 cards.
2. Open a source card containing a direct link.
3. Follow it, then use Back and Forward.
4. Follow an aliased link and confirm its label and target differ correctly.
5. Confirm the target's `Linked from` list opens the source.
6. Paste the target URL into a fresh tab and close the directly loaded dialog.

- [x] **Step 4: Perform the mobile acceptance journey**

At 390px width, repeat link, backlink, Back, Forward, direct-load, Close, and focus checks in the bottom sheet.

- [x] **Step 5: Inspect the final change set**

Confirm every changed line supports internal links, backlinks, URL behavior, validation, tests, or the requested editorial documentation. Remove debugging output and no unrelated cleanup.

- [x] **Step 6: Write the verification note**

Report test totals, manual desktop/mobile checks, any known pre-existing failure, the generated-file status, and the exact card count.

## Follow-on project: Markdown-backed second brain

After this release proves the linking model, plan a separate migration in which each card becomes a Markdown document with stable front matter (`id`, title, aliases, dates, categories) and wiki-linked prose. That project should first decide whether the repository itself is the authoring home or whether an Obsidian vault is the authoring home with a one-way build into the site. It needs its own migration, preview, validation, and rename-safety design; none of that is required to ship the internal-link foundation above.

## Execution notes

Implementation follows the approved sequence. Tests were written and observed failing before each behavior change. Work remains on the existing codex/china-atlas branch; no commits, remote writes or publication were made.

The actual stylesheet is styles.css, so that file was changed in place of the plan's style.css. The existing collection_open.test.js was also updated to wait for browser history before checking the return to Browse all. Its former synchronous check failed after the authorized navigation change; its behavior assertions remain intact. No unrelated application or content changes were made.

The atlas already has an inline desktop card with an optional expanded dialog. Links reuse that surface. The expanded view retains its existing collapse behavior; the ordinary card's Close control follows browser history. Period previews also retain their closed/open state across Back, Forward and reload.

The code review found and the tests reproduced period/Home URL drift and two preview restoration edge cases. Those issues were fixed and their focused tests pass.

Manual checks at 1440px and 390px covered production direct links (Three Kingdoms and An Lushan Rebellion), the Qing display alias, automatic backlinks, Back, Forward, reload, direct-load Close, keyboard focus and the expanded dialog/mobile sheet. Command-click opened Qing in a separate tab; closing that directly loaded card removed its card query. Browse all displayed 221 of 221 entries.

Both data generators ran successfully. A second rebuild produced byte-identical outputs. catalog_data.js remained unchanged; china_history_expanded.json gained stable link titles and the three source-authored examples. The whitespace check passed.

### Existing failures reproduced on the unchanged branch

These checks also fail against a local snapshot of commit `2c1c726`. The snapshot used a separate local server; tests with a fixed server address were pointed at that snapshot. No unrelated fixes were included:

- `beginner_edition.test.js`: the known southward economic shift caption expects “modern view”; the current caption describes a Northern Song painting.
- `beginner_browser.test.js`: its search for the Ming Voyages card times out.
- `browser.test.js` and `label_placement.test.js`: the 768px timeline row-position check fails.
- `cambridge_browser.test.js`: a remote card image fails to load. The affected image varies between runs.
- `dynastic_navigation.test.js`: expects nine initial era buttons; the current home view has zero.
- `encyclopedia_browser.test.js`: expects earlier date-label wording.
- `event_markers.test.js`: a page control is covered during the browser journey.
- `expanded.test.js`: expects 184 research records; assembly now produces 185 in that historical subset.
- `header.test.js`: measures a control absent from the current home layout.
- `home_navigation.test.js`: expects a CE suffix removed by the existing display convention.

The installed Playwright package initially lacked its matching WebKit browser. The matching browser was installed locally, and all six existing Chromium/WebKit phone checks passed afterward. That setup failure is excluded from the remaining failure list.

### Final verification totals

- Full suite on the finished code: **111 tests, 100 passed, 11 failed**. Every remaining failure belongs to the existing checks listed above.
- New coverage: **30 passed** (9 link-engine tests, 3 complete-collection tests, 16 browser journeys, and 2 beginner-assembly tests).
- Focused final browser run: **24 passed**, including the 16 new journeys, all six existing phone checks, the all-card collection check, and the expanded-dialog check.
- Active collection: **221 cards**. All stable IDs, link titles, explicit aliases, and supported prose links validate.
- Both generators are current and reproducible. The whitespace check passes.

Full-suite command, from `history-of-china/snake-timeline`:

```sh
PLAYWRIGHT_MODULE=/opt/homebrew/lib/node_modules/@playwright/test/node_modules/playwright \
  node --test --test-concurrency=1 *.test.js
```

The verification log is `/tmp/wei-134-acceptance.log`; the focused browser log is `/tmp/wei-134-final-navigation.log`. All work remains local and uncommitted in `/Users/weiwong/.codex/worktrees/141c/psychic-octo-palm-tree` on `codex/china-atlas`. Publication and pushing require Wei's approval.
