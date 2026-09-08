---
description: Write a full Chinese History Atlas card end to end, from research through prose, images, links and editorial check.
argument-hint: <topic or slug>
---

Write the card for: $ARGUMENTS

Read `docs/card-style-guide.md` and `docs/cards/tang.md` first. The style guide is canonical and the Tang card is the standard to match.

Codex has no subagents, so run these phases yourself in order, in this session, writing each artefact to disk before moving on. Do not skip a phase or compress two into one; the separation is what keeps quality up.

**Phase 1, research.** Find the existing record in `history-of-china/snake-timeline/data/china_history_expanded.json` (branch `codex/china-atlas`, key `cards`). Research properly from several sources, preferring specialist scholarship and museum and university material over general reference. Identify the historical argument: what serious historians think is at stake, what is contested, what the popular account gets wrong. Write `docs/cards/_research/<slug>.md` with facts, verified tone-marked pinyin, contested points and sources. Record facts, not phrasing.

**Phase 2, write.** Close the sources. Write the card from your brief, in your own sentences. If you find yourself reaching back for a source's wording, stop; that is the failure mode this phase separation exists to prevent. 600 to 950 words, lead paragraph with no heading, three to six substantive sections, a closing section on how the subject was remembered and what historians dispute. Write to `docs/cards/<slug>.md`.

**Phase 3, illustrate.** Find an image to the standards in `history-of-china/snake-timeline/data/image-coverage.md`. Named period objects first, then manuscript or printed pages, then dated photographs, then identifiable sites. Verify the URL returns HTTP 200 with `curl -sI`. Produce the full record: src, width, height, alt, caption, credit, source, license, licenseUrl. Propose a map if one would help, and never fabricate one.

**Phase 4, link.** Insert piped Obsidian wikilinks on first mention: `[[an-lushan|rebellion of the frontier general An Lushan]]`. Link targets that do not exist yet as well. Update the `related` frontmatter array split into existing and proposed. Write the tiered link inventory at the foot of the card. Add new slugs to `docs/cards/_queue.md` sorted by inbound link count.

**Phase 5, edit.** Check your own work against the style guide checklist, hardest on sourcing integrity: search a distinctive sentence or two and confirm you have not tracked a source. Then accuracy, voice rules, structure, tone marks, and whether the card actually makes an argument. State the argument back in one sentence. If you cannot, the card is not finished.

Report: file path, word count, the argument, new cards generated, and anything factually contested Wei should rule on.
