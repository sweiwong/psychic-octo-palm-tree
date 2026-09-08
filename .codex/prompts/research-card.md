---
description: Build the evidence brief for a Chinese History Atlas card. Facts and argument only, no prose.
argument-hint: <topic or slug>
---

Build the research brief for: $ARGUMENTS

Read `docs/card-style-guide.md` for context, then `docs/cards/tang.md` for the standard the prose will need to reach.

You are gathering evidence, not writing the card. Output is a brief, never finished prose.

Find the existing record in `history-of-china/snake-timeline/data/china_history_expanded.json` (branch `codex/china-atlas`, key `cards`) and note its id, category, `related`, `sources` and `image`.

Research from several sources and reconcile them. Prefer Cambridge History volumes, specialist scholarship, museum and university material. General reference is a starting point, never the destination. Where two sources disagree, record the disagreement rather than silently picking one.

Identify **the argument**: what serious historians think is at stake here, what is contested, what the popular account gets wrong. The Tang card argues that the golden age was constructed retrospectively and that the most "Chinese" dynasty had frontier origins. Find the equivalent.

Write `docs/cards/_research/<slug>.md` containing: card identity; the argument in three to five sentences; a dense fact list with sources, complete enough that a writer never needs to open a source; contested material with suggested caveat phrasing; every Chinese term with simplified hanzi and verified tone-marked pinyin; link candidates; and sources with labels in the form `Author · Title`.

Record facts, not phrasing. Do not copy sentences from sources into the brief, because whoever writes from it will be tempted to reuse them.
