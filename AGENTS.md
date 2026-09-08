# AGENTS.md: Chinese History Atlas

Instructions for coding agents working in this repo. Codex reads this file automatically. Claude Code reads `CLAUDE.md` plus `.claude/`, and both point at the same canonical documents named below, so the two toolchains stay in step.

## What this project is

A desktop web app exploring Chinese history from c. 2070 BCE to the present. The home screen is a wrapped multi-row timeline. Clicking any item opens a **card** in a 340px detail panel.

Live: https://china-history-atlas-six.vercel.app/

Two kinds of work happen here: **application code**, and **card content**. They have different standards and different review bars. Know which one you are doing.

## Canonical documents

Read the relevant one before working. Do not restate their rules in new files; link to them.

| Document | Covers |
|---|---|
| `docs/card-style-guide.md` | **All card content standards.** Voice, structure, hanzi and pinyin format, wikilinks, images, sourcing integrity. Canonical. |
| `docs/cards/tang.md` | The finished reference card. The standard to match. |
| `CLAUDE.md` | Project architecture, dataset schema, design system, PRD constraints. |
| `PRD.md` | Product brief. |
| `history-of-china/snake-timeline/data/image-coverage.md` | Image sourcing and licensing standards, already applied across 205 cards. |

## Card content work

The corpus is roughly 207 cards in `history-of-china/snake-timeline/data/china_history_expanded.json` (branch `codex/china-atlas`, key `cards`). Most were AI-generated and are being rewritten one at a time.

`docs/card-style-guide.md` governs. The rules most often broken:

- Factual reference prose written by a historian. Storytelling was tried and explicitly rejected: no scene-setting openings, no second-person address, no dramatic one-line paragraphs, no rhetorical questions.
- No em dashes. No "not X, but Y". No "-ing" tails. No "serves as" or "represents" where "is" or "has" belongs. British spelling.
- Every card carries an argument and closes with a section on how the subject was remembered and what historians dispute.
- At least one contested figure or tradition flagged as contested.
- Simplified hanzi with tone-marked pinyin, first mention only: `Chang'an (长安 Cháng'ān)`.
- Never build a card by paraphrasing one source in sequence. An earlier Tang draft tracked Mark Edward Lewis, *China's Cosmopolitan Empire*, closely enough that it could not ship.

Card drafts live in `docs/cards/<slug>.md`. Research briefs in `docs/cards/_research/<slug>.md`. The queue of cards still to write is `docs/cards/_queue.md`.

## Working prompts

`.codex/prompts/` holds the role prompts for this project. Copy or symlink them into `~/.codex/prompts/` to get them as slash commands:

```bash
ln -s "$PWD/.codex/prompts/"*.md ~/.codex/prompts/
```

| Prompt | Role |
|---|---|
| `/write-card <topic>` | Runs the whole card pipeline end to end. |
| `/research-card <topic>` | Evidence brief only, no prose. |
| `/illustrate-card <slug>` | Image and map selection with licence records. |
| `/link-cards <slug>` | Wikilinks, `related` array, link inventory, queue update. |
| `/edit-card <slug>` | Editorial and accuracy gate. Can block. |
| `/audit-corpus` | Bulk quality and plagiarism sweep across all cards. |

Codex has no subagent system, so each prompt runs in one session. Run them in sequence rather than expecting delegation. The intermediate artefacts on disk are what carry state between them.

## Code work

Do not hand-edit `china_history_v9.json` or its successors. Regenerate from the source xlsx and re-run validation.

`handoff-extracted/history-of-china/` is a Claude Design prototype. It is the visual specification, so read it for layout, palette, typography and interaction. Do not copy its build approach (CDN React plus babel-standalone) into production.

Explain engineering decisions in plain English focused on outcome, with the developer term in brackets after. Example: "We load the dataset once when the page opens and keep it in memory (client-side caching). First load is slightly slower, every click after is instant."

## Conventions

Folders kebab-case. Code files follow language convention. Human docs kebab-case and lowercase. Dates in filenames YYYY-MM-DD. Do not commit credentials.
