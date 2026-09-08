---
description: Insert internal wikilinks into a Chinese History Atlas card and update the queue of cards still to write.
argument-hint: <slug, or "corpus" for a full sweep>
---

Build the link layer for: $ARGUMENTS

Read `docs/card-style-guide.md` and `docs/cards/tang.md` for conventions. The corpus is an Obsidian-style second brain, so the links are the product.

Load the corpus from `history-of-china/snake-timeline/data/china_history_expanded.json` (branch `codex/china-atlas`, key `cards`) and build the id-to-name index. Ids are kebab-case slugs; older imported records carry a `catalog-` prefix with the original uppercase id.

**On a single card.** Identify every proper noun, place, institution, event, person and concept that is or should be its own card. Insert piped wikilinks on first mention only, **and only when the target card already exists in the corpus**: `[[chang-an|Chang'an]]`. Display text must read naturally in the sentence. Never reword the prose to accommodate a link; if it will not sit cleanly, leave it out and note it. Do not link a target that does not exist yet: unlike Obsidian, the live site does not grey out an unresolved link, it silently drops it to plain text with no signal to the reader, so leave the term as plain glossed text and record it in the link inventory instead. Update the `related` frontmatter array to the existing-card slugs actually linked; no proposed half. Write the `## Link inventory` section: existing slugs as inline code, then Tier 1 (the card is incoherent without them, usually hub cards), Tier 2, Tier 3, one line each.

**Across the corpus.** Maintain `docs/cards/_queue.md`: slug, one-line scope, tier, and inbound link count. Sort by inbound link count, because a slug three cards already point at is a hub and hubs are what make the wiki navigable. Also flag orphans (nothing links to them), dead ends (they link to nothing), and asymmetries where A links to B but B should mention A and does not.

The corpus is heavy on events and named individuals and thin on places, institutions and concepts. Those are the missing hubs, so weight them up when tiering.

Report links inserted, new slugs proposed, and the top five cards to write next by inbound link count.
