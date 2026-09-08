---
description: Write a full Chinese History Atlas card end to end, from research through prose, images, links and editorial check.
argument-hint: <topic or slug>
---

Write the card for: $ARGUMENTS

Read `docs/card-style-guide.md` and `docs/cards/tang.md` first. The style guide is canonical and the Tang card is the standard to match.

Codex has no subagents, so run these phases yourself in order, in this session, writing each artefact to disk before moving on. Do not skip a phase or compress two into one; the separation is what keeps quality up.

**Phase 1, research.** Find the existing record in `history-of-china/snake-timeline/data/china_history_expanded.json` (branch `codex/china-atlas`, key `cards`). Research properly from several sources, preferring specialist scholarship and museum and university material over general reference. Identify the historical argument: what serious historians think is at stake, what is contested, what the popular account gets wrong. Write `docs/cards/_research/<slug>.md` with facts, verified tone-marked pinyin, contested points and sources. Record facts, not phrasing.

**Phase 2, write.** Close the sources. Write the card from your brief, in your own sentences. If you find yourself reaching back for a source's wording, stop; that is the failure mode this phase separation exists to prevent. Word count follows scope: 900 to 1500 words across four to seven sections for a dynasty or period card (Tang-scale, multi-century, government/culture/economy/foreign relations all in play); 500 to 800 words across two to four sections for everything else (a single event, institution, text, figure or object). Both are defaults, not hard caps: flag it in your report rather than padding or trimming if the actual scope clearly calls for more or less. Lead paragraph with no heading, a closing section on how the subject was remembered and what historians dispute. Write to `docs/cards/<slug>.md`.

**Phase 3, illustrate.** Find an image to the standards in `history-of-china/snake-timeline/data/image-coverage.md`. Named period objects first, then manuscript or printed pages, then dated photographs, then identifiable sites. Verify the URL returns HTTP 200 with `curl -sI`. Produce the full record: src, width, height, alt, caption, credit, source, license, licenseUrl. Propose a map if one would help, and never fabricate one.

**Phase 4, link.** Insert piped Obsidian wikilinks on first mention, only when the target card already exists in the corpus: `[[an-lushan|rebellion of the frontier general An Lushan]]`. Do not link a target that does not exist yet: the live site does not grey out an unresolved link the way Obsidian does, it silently drops it to plain text with no signal to the reader, so leave the term as plain glossed text instead. Update the `related` frontmatter array to the existing-card slugs actually linked; no proposed half. Write the tiered link inventory at the foot of the card, which is where every not-yet-written target gets tracked. Add new slugs to `docs/cards/_queue.md` sorted by inbound link count.

**Phase 5, edit.** Check your own work against the style guide checklist, hardest on sourcing integrity: search a distinctive sentence or two and confirm you have not tracked a source. Then accuracy, voice rules, structure, tone marks, and whether the card actually makes an argument. State the argument back in one sentence. If you cannot, the card is not finished.

Also run the `/no-ai-slop` skill in detect mode against the finished card text and fix anything it flags. The style guide's voice section lists the specific patterns this project has already seen slip through: importance puffery ("marks a pivotal moment"), weasel attribution ("historians agree"), colon reveals, interpretive metadiscourse, and banned words like "meticulous" or "transformative".

Report: file path, word count, the argument, new cards generated, and anything factually contested Wei should rule on.
