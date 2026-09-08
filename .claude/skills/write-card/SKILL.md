---
name: write-card
description: Write or rewrite an encyclopedia card for the Chinese History Atlas. Use when Wei says "/write-card <topic>", "write the card for X", "rewrite the X card", or asks for card content for any dynasty, event, person, place, institution or cultural work in the atlas. Produces finished card prose with hanzi and pinyin, Obsidian wikilinks, an image record, and a link inventory.
---

# Write a card for the Chinese History Atlas

**Read `docs/card-style-guide.md` now. It is the canonical standard and this skill is a wrapper around it.** Then read `docs/cards/tang.md`, the finished reference card.

## Running the pipeline

For a full card, delegate to the subagents in `.claude/agents/` in this order. Each writes its output to disk, so the chain survives a session ending.

1. `card-researcher` builds the evidence brief at `docs/cards/_research/<slug>.md`. Facts, verified tone marks, the historical argument, contested points. No prose.
2. `card-writer` writes the card to `docs/cards/<slug>.md` from that brief. It has no web access by design, so it cannot paraphrase a source's sentences.
3. `card-illustrator` finds and verifies the image, and proposes a map where one would help.
4. `card-linker` inserts the wikilinks, updates `related`, writes the link inventory, and updates the queue at `docs/cards/_queue.md`.
5. `card-editor` gates it. Sourcing integrity, accuracy, voice (including a no-ai-slop pass), structure, tone marks, argument. It can block.

Steps 3 and 4 are independent of each other and can run in parallel.

For a quick single-card edit, skip the chain and work directly to the style guide.

`corpus-auditor` is separate from this pipeline. It sweeps all 207 cards, scores them, hunts for plagiarism risk, and writes the rewrite priority order to `docs/cards/_audit.md`.

## The short version of the standard

Full detail is in the style guide. The parts most often got wrong:

- Factual reference prose written by a historian. Storytelling was tried and rejected. No hooks, no second-person address, no dramatic one-liners.
- No em dashes. No "not X, but Y". No -ing tails. No "serves as" or "represents" where "is" or "has" belongs. British spelling.
- No AI-slop phrasing either: no importance puffery ("marks a pivotal moment"), weasel attribution ("historians agree"), colon reveals, or banned words like "meticulous", "leverage", "transformative". `card-editor` checks for this on every card.
- Every card carries an argument, and closes with a section on how the subject was remembered and what historians dispute.
- At least one contested figure or tradition flagged as contested.
- Simplified hanzi with tone-marked pinyin, first mention only, in the exact format `Chang'an (长安 Cháng'ān)`.
- Only link a term inline if its card already exists. The live site does not grey out unresolved links the way Obsidian does, it drops them to plain text with no signal, so a link to nothing is worse than none. Not-yet-written targets go in the `## Link inventory` section and `_queue.md`, never inline.
- Never build a card by paraphrasing one book. An earlier Tang draft tracked Mark Edward Lewis closely and could not ship.
