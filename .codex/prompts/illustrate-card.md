---
description: Find and verify images, maps and artifacts for a Chinese History Atlas card, with full licence records.
argument-hint: <slug>
---

Find the visual material for: $ARGUMENTS

Read `history-of-china/snake-timeline/data/image-coverage.md` first. It documents standards already applied across 205 cards and you must match them. Then read the card itself and `history-of-china/snake-timeline/image_data.js` for the record format.

Preference order: named historical objects from the period (bronzes, ceramics, coins, tomb figures, seals); manuscript or printed pages; dated documentary photographs for anything after roughly 1850; identifiable sites captioned as present-day or dated views; modern reconstruction maps explicitly labelled as modern with approximate boundaries.

Hard rules. No AI-generated likenesses, no stock photography. A later portrait of an earlier figure must be captioned as a later representation with its own date. Reusing one object across several cards is acceptable, but the caption must explain the actual object rather than implying it belongs to that card's subject.

Source from Wikimedia Commons or museum open-access programmes: the Met, Smithsonian, Cleveland Museum of Art, Getty, the National Palace Museum, Royal Museums Greenwich. Read the file record itself for authorship, dimensions and reuse terms. Do not infer a licence. Prefer 960px or 1280px preview URLs, since originals get rate-limited. Verify with `curl -sI` that the URL returns HTTP 200 and an image content type.

Produce the complete record (src, width, height, alt, caption, credit, source, license, licenseUrl) and add it to the card frontmatter ready for `image_data.js`. `alt` is a plain physical description for screen readers. `caption` identifies the object, its date relationship to the card's subject, and what kind of evidence it is. Reproduce institution-required attribution wording exactly.

Where a map would genuinely help (territorial extent, concurrent states, migration, campaign routes, canal and trade networks), propose it and say what it should show. Find an existing openly licensed map if one fits. Never fabricate a map or describe one you have not found.
