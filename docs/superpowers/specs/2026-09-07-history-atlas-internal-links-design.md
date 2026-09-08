# Chinese History Atlas Internal Links: Design Specification

**Date:** 2026-09-07
**Status:** Approved for implementation
**Site:** `history-of-china/snake-timeline/`

## Goal

Turn the atlas into a growing, connected knowledge base. Writers can place Obsidian-style links in card prose, readers can follow those links to another card, and every card can show which other cards link to it.

Examples:

```text
[[Three Kingdoms]]
[[An Lushan Rebellion]]
[[Qing|the Qing dynasty]]
```

## Fit with the current site

This fits the current architecture without a framework or database. The site already assembles every active card into one browser-side collection and opens a selected card in a desktop dialog or mobile bottom sheet. A small link module can build a title index after that final collection is assembled, render links safely, and use the existing card-selection path.

The feature must run after the final card assembly. Most finished prose comes from the beginner-edition override files, so scanning only the raw catalog would miss links and titles that readers actually see.

## Source of truth

Link markup lives directly in the same prose fields writers already edit:

- `description`
- each section's `title`
- each section's `text`
- `note`

The saved text remains plain text containing `[[...]]`. The browser converts it into text nodes and clickable anchors when displaying a card. Search uses a plain-text version with the brackets removed.

Generated files are outputs, not editing sources. Do not hand-edit `catalog_data.js` or `data/china_history_expanded.json`.

## Link identity and aliases

Each card receives a stable editorial title called `linkTitle`. It is captured before automatic Chinese-name annotations alter the visible heading. A card may also declare a small, explicit `linkAliases` array for genuine alternate names.

Resolution is exact after harmless normalization: trim outside whitespace, collapse repeated internal whitespace, normalize Unicode, and compare without case or accents. Do not use partial matching, fuzzy matching, or punctuation removal because historical names can overlap.

Supported forms are:

```text
[[Three Kingdoms]]                 target title is also the displayed label
[[Qing|the Qing dynasty]]          target title differs from displayed label
[[id:qing-dynasty|the Qing era]]   stable ID escape hatch for rare ambiguity
```

The text before `|` selects the card. The text after `|` is only what the reader sees. Display aliases never create new target names. Existing broad `searchAliases` are not accepted as link aliases because some deliberately match several cards.

Duplicate `linkTitle` or `linkAliases` values are build errors. A direct title match and an alias match must never compete.

## Rendering and interaction

Internal links are real anchors so they support keyboard focus, link context menus, copying, and opening in a new tab. Their URL is `?card=<stable-card-id>`. The existing page sections continue to use hash anchors such as `#reading-notes`; card state does not reuse the hash.

Clicking a link inside a card opens the target in the same surface:

- desktop: the existing detail dialog updates to the target card;
- mobile: the existing bottom sheet updates to the target card;
- a new tab or direct URL opens the named card after page load;
- Back returns to the previous card and then to the prior page state;
- Forward reopens a card;
- closing a card reached within the site behaves like Back;
- closing a directly loaded deep link removes `card` with history replacement and stays on the atlas.

All ways of selecting a card—timeline, search, index, backlink, and prose link—must call one URL-aware navigation function. Search-result snippets and map tooltips stay plain text because their entire container is already clickable.

Focus should move to the new card heading after navigation and return to the invoking control when the dialog or sheet closes where possible.

## Backlinks

Backlinks are generated automatically from the same parsed links. Writers should not maintain a second list.

For every valid outbound link, add its source card to the target card's `Linked from` section. Deduplicate repeated links from the same source, exclude self-links, and sort source cards chronologically with title as the tie-breaker. Backlinks are clickable and use the same navigation path.

## Broken-link detection

Validation scans the fully assembled 221-card collection and fails when it finds:

- a target title or explicit alias that matches no card;
- an `id:` target that matches no stable ID;
- duplicate normalized titles or aliases;
- malformed brackets, an empty target, or an empty display label;
- unsupported link markup in a field the renderer does not parse.

The error must name the source card, field, written target, and a close candidate when one exists. Suggestions are diagnostic only; they never silently redirect a reader.

The same validator runs in automated tests. That makes a misspelling fail before publication instead of creating a dead link on the live site.

## Editorial index

The existing `Browse all` view is the reader-facing index and currently exposes all 221 active cards. It should remain the quickest way to see the collection while editing. Its count and documentation must be corrected where the README still says 205.

This release keeps prose in the current JavaScript source packs. Moving every card to one Markdown file per card would make a stronger long-term editorial system, and could later sync naturally with an Obsidian vault, but that is a separate migration. Mixing that migration into internal links would make the first release larger and riskier than needed.

## Out of scope for this release

- fuzzy or automatic link resolution
- section/block links, embeds, tags, or an Obsidian graph view
- renaming every source file or moving content into Markdown
- an in-browser content editor or publishing system
- syncing an Obsidian vault

## Acceptance criteria

1. Direct, aliased, and stable-ID links render safely in every supported prose field.
2. Every link opens the intended card on desktop and mobile.
3. Card URLs survive reload and work in a new tab.
4. Back and Forward restore the expected card and surrounding page state.
5. Valid inbound links produce deduplicated automatic backlinks.
6. Broken, malformed, or ambiguous links fail the validation test with a useful message.
7. Search snippets and tooltips show readable text without raw `[[...]]` markup.
8. The Browse all index still lists all 221 cards.
9. Existing generated data is rebuilt from source rather than edited by hand.
