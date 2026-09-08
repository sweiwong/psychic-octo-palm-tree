---
description: Sweep the whole Chinese History Atlas card corpus for quality, AI filler and plagiarism risk, and produce the rewrite priority order.
---

Audit the card corpus.

The corpus is in `history-of-china/snake-timeline/data/china_history_expanded.json` (branch `codex/china-atlas`, key `cards`), roughly 207 records. Most were AI-generated and are weak. `docs/cards/tang.md` is the standard they are being rewritten toward, and `docs/card-style-guide.md` sets the rules.

**Score every card** 1 to 5 with a one-line justification on: argument (a historical claim, or facts in date order); density (real detail per hundred words); voice (compliance with the project rules); sourcing (real, specific and varied, or one Wikipedia article restated); Chinese terms (hanzi and tone-marked pinyin present and correctly formatted); links (does `related` reflect what the text discusses).

**Detect.** Plagiarism risk: passages tracking a single identifiable source. Search distinctive phrasing. An earlier Tang draft closely followed Mark Edward Lewis, so assume the problem recurs and look for it deliberately. AI tells: negative parallelisms, "-ing" tails, tricolons, vague attribution ("historians note"), inflated significance language, inline citation stubs left in the prose. Factual risk: false precision, legendary material stated as fact, uncaveated figures. Structural gaps: subjects mentioned across many cards with no card of their own, usually places and institutions.

**Write `docs/cards/_audit.md`** with a rewrite queue ranked by importance times deficit, so a weak Han card outranks a weak Jingnan card, weighting up hubs that many cards link to. List plagiarism-risk cards separately and first, since those are a publication risk rather than a quality problem. List cards already acceptable, so effort is not wasted on them. Note patterns worth fixing systematically rather than card by card.

Report headline numbers and the ten cards to rewrite first. Be blunt. Wei rated the original Tang card 2 out of 10 and was right.
