# The History Atlas

The local beginner edition has 221 illustrated cards. Browse all is the visual index of every active card. Reader copy follows [the audience guide](audience-guide.md). Earlier research exports remain available for reference. This editorial update has not been published; publication notes below describe earlier editions.

A working, responsive Chinese history snake timeline. This new edition preserves the original handoff in `../project/` and all original workbook/JSON data.

Open `index.html` directly, or serve the repository locally:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open [the local timeline](http://127.0.0.1:8765/history-of-china/snake-timeline/).

## Adding cards or maintaining the site

Read the [audience guide](audience-guide.md) for the intended readers, tone, and title conventions.

Read the [maintenance guide](maintenance-guide.md) before adding event cards, historical notes, images, or timeline labels. It covers the editing workflow, data fields, research standards, layout lessons, checks, and publication.

## Explore

The compact masthead keeps search, Browse all, and About visible. Nine researched dynastic groupings sit directly below it; scroll the strip sideways for later periods. The timeline and selected reading card begin together on desktop. On phones the card opens as a bottom sheet.

- Click a ribbon, label or event dot to open its source-linked card.
- Hover or focus a control for a short preview. Enter or Space opens details.
- Jump between eras, search all 221 entries in English, Simplified Chinese, or pinyin with or without tone marks, or switch event and concurrent-state layers.
- On phones, details open in a bottom sheet. Escape or the close button returns focus to the timeline.
- Small periods remain interactive and searchable even when their labels are omitted to preserve space. On narrow canvases, concurrent state names are available through their lines and Browse all.

## Files

- `history_data.js`: the 42-entry curated overview, historical notes and Wikipedia reading links.
- `data/`: preserved v10 workbook, 111-record JSON export and research notes.
- `catalog_data.js`: generated browser copy of the 111 source records. Regenerate with `node history-of-china/snake-timeline/build_catalog.js`.
- `catalog_adapter.js`: explicit source-ID mapping, 27 subject matches, date-convention notes, source arrays, category filters and related courts. All 111 workbook entries reach a card.
- `supplemental_data.js`: eight additions, including the Sui Grand Canal, technology, painting, literature, trade and modern history.
- `tang_data.js`: seven additional Tang event markers and four expanded analytical cards, with primary texts, named scholarship and pinyin.
- `tang.test.js`: checks for the Tang additions and preservation of earlier records.
- `early_research.js`, `medieval_research.js`, `medieval_culture.js`, `late_imperial_research.js`, `modern_research.js`: full-era analytical revisions and 42 additional subjects.
- `expanded.test.js`: completeness, original source retention, date, relationship, pinyin and analysis checks for all 183 cards.
- `data/china_history_expanded.json`: current 221-card reading export; the original workbook and v10 JSON remain unchanged.
- `pinyin_data.js`: local tone-marked readings, including context-specific historical names.
- `catalog.test.js`: completeness, provenance, Simplified Chinese and related-period checks.
- `geometry.js`: continuous distance-to-date mapping with a real year scale through straight sections and semicircular turns. No year zero.
- `chart_research.js`: 22 further event cards and a 78-subject checklist matching the supplied reference chart, with explicit chronology corrections.
- `cambridge_research.js`: 14 cards selected through a chapter-by-chapter comparison with Patricia Buckley Ebrey's third edition, each with an independent source check and a reusable image.
- `build_expanded.js`: regenerates the current reading JSON from the same sources and images used by the browser.
- `image_data.js`: historical images, individual captions, alternative descriptions, credits and reuse terms.
- `app.js`: drawing, label placement, searching, keyboard interaction and detail cards.
- `styles.css`: paper, ink and mineral color system, responsive layout and typography.
- `geometry.test.js`: built-in Node tests; no packages required.
- `browser.test.js`: browser checks using Playwright, plus desktop/mobile screenshots.

## Internal links and backlinks

On 8 September 2026, Wei’s An Lushan and Three Kingdoms drafts from `docs/cards/` were imported into `card-notes/`. There are now eleven authored notes. The supplied wording, image captions, and sources are retained; existing IDs are clickable and proposed cards display as plain labels. The writing queues remain in the source drafts. `fixtures/*-approved.md` preserves the imported drafts for text comparisons. Three Kingdoms keeps its existing timeline ranges and footer map.

The Tang pilot's ten cards are edited in `card-notes/*.md`. The main `card-notes/tang.md` now contains Wei's approved long draft with 26 inline links. Its `annotate-names: false` property preserves the approved Chinese names and pinyin without automatic additions. Other cards remain in the beginner source packs (`beginner_early.js`, `beginner_middle.js`, and `beginner_late.js`). Use links in `description`, section `title` and `text`, or `note`:

```text
[[Three Kingdoms]]
[[An Lushan Rebellion]]
[[Qing|the Qing dynasty]]
[[id:qing|the Qing era]]
```

The text before the bar identifies a card; the text after it is the label readers see. The last form uses the card's stable ID. Card URLs use `?card=qing` and retain other query settings and page section links. Back and Forward move between cards. Close returns to the preceding card or page state; for a directly loaded card it clears only the card query. The expanded reading view can still be collapsed with Escape or its close control.

Each card has a `linkTitle`, captured from its English editorial name before automatic Chinese annotations. Preserve that title when changing visible wording. A source revision may supply an explicit `linkTitle` and a small `linkAliases` array for genuine alternate names. Broad `searchAliases` are only search terms. Link titles and aliases must be unique after case, accent, Unicode and whitespace normalization. IDs must stay stable because shared URLs use them.

Links match exactly after that normalization. A display label does not create an alternate target name. Automatic annotations leave everything inside `[[...]]` unchanged. The browser displays literal HTML as text. Repeated links generate one entry in the target's Linked from list; self-links are omitted and sources are sorted by date, then title.

From this directory, rebuild and validate before publication:

```sh
node build_catalog.js
node build_expanded.js
node internal_links.test.js
node internal_links_collection.test.js
node beginner_edition.test.js
node internal_links.browser.test.js
```

The browser test uses the local server and Playwright settings described below. The collection check validates all 221 assembled cards. An unknown target reports its source card, field and written target, with a close suggestion when available. For example, `[[Three Kingdms]]` suggests `Three Kingdoms` but fails validation until corrected. Malformed links, duplicate identities and links in unsupported fields also fail. Generated files must be rebuilt, never hand-edited.

Known unrelated check: the southward economic shift image-caption assertion in `beginner_edition.test.js` expects an older caption. It remains visible and outside this link feature.

Within the notes folder, use native links such as `[[an-lushan|An Lushan Rebellion]]`. For an existing atlas card without its own note, use `[Sui](../index.html?card=sui)`. The build checks those destinations against the research records and converts them to the atlas's internal links. Proposed cards must remain plain text until they exist. Paragraph breaks within sections are preserved.

After editing a note, run `npm ci` once to install the YAML reader, then `npm run build:content` to regenerate `card_notes.js` and the reading JSON. Reload the local page to see the change. Saving in Obsidian does not yet trigger an automatic rebuild. Do not edit the generated files. The compiler supports paragraphs, `##` headings, native note links, and the relative atlas links described above. A final `## Note` is optional; an exact-copy note without it clears the inherited caveat. Dates, images and sources remain in the research records. The rest of the Markdown migration and any synchronization remain future work.

## Historical conventions

Reference checked 4 September 2026: [Timeline of Chinese history](https://en.wikipedia.org/wiki/Timeline_of_Chinese_history), linked dynasty/event articles, and [Columbia's teaching timeline](https://afe.easia.columbia.edu/timelines/china_timeline.htm).

Xia is patterned and explicitly traditional. Early dates are provisional. Han uses the common 206 BCE convention and explains the 202 BCE imperial accession. Tang excludes Wu Zhou, 690–705. The An Lushan Rebellion begins in 755 and ends in 763. Song/Yuan and Ming/Qing overlap on separate lines. The Republic continues in Taiwan after the mainland ribbon changes in 1949. The drawing horizon is 2026, not an end date for current governments.

The main ribbon is a reading route, not a claim to exclusive territory or rule. Three Kingdoms, Jin, and Northern and Southern Dynasties have separate main bands. Jin begins on the main route in 266; a side line preserves the continuing Three Kingdoms until 280. Northern and Southern Dynasties occupy the main route from 420 to 581 and a side line to 589, alongside the new Sui court. The older division overview remains a searchable background essay. Parallel lines represent selected states and groupings, not an exhaustive list. All 111 v10 workbook records are now available through search and cards. The overview retains its 42 selected records. Twenty-seven matching subjects share cards, and seven sourced additions brought the collection to 133 entries. A subsequent Tang expansion adds seven visible events and four analytical rewrites, for 140 searchable entries. The Sui Grand Canal addition brings the total to 141. The full-era expansion adds 42 further subjects, bringing the collection to 183 cards, and revises every remaining shallow card. The reference-chart extension adds 22 more cards for a total of 205. Two later reading entries and the 14-card Cambridge comparison bring the current edition to 221 cards. All cards have an introduction, two analytical sections and linked sources. Existing date conventions are retained in the cards alongside the curated convention when they differ. Source research notes describe the older prototype; they are preserved as provenance.

The illustrated edition supplies an image on every card, using 164 distinct assets across 221 entries. Browse all is an illustrated index; the reading cards show full images, captions, credits and reuse terms. Photographs, artifacts, manuscripts, paintings and historical maps are identified for what they are. Later depictions and contextual illustrations are labelled explicitly. The Cambridge ebook supplies historical research but none of its embedded illustrations are republished.

## Research limits

Sources include museum collections, translated primary texts, specialist reference works, research papers and scholarly books. Some publisher pages offer only abstracts or previews; linking a chapter does not mean its entire text is freely available. Source links support the historical account, while the analytical sections make explicit interpretations. This is an introductory atlas, not an exhaustive scholarly bibliography or a substitute for reading the cited work.

Laozi is placed by the approximate formation of the text associated with him, not an invented birthdate. Cave foundations, literary activity ranges and uncertain ancient chronology are labelled accordingly. The Qing ribbon retains the 1636 dynastic declaration; its card explains the 1644 conquest of Beijing.

The 205-card illustrated edition is published at https://sweiwong.github.io/china-history/ (5 September 2026, commit 8aaf5d2).

## Verify

```sh
node --test history-of-china/snake-timeline/geometry.test.js history-of-china/snake-timeline/catalog.test.js history-of-china/snake-timeline/tang.test.js
node history-of-china/snake-timeline/build_expanded.js
node --test history-of-china/snake-timeline/encyclopedia.test.js
node history-of-china/snake-timeline/browser.test.js
```

For the browser checks, make Playwright available and run the local server first. Optional environment settings: `PLAYWRIGHT_MODULE` (module path), `CHROME_PATH` (browser executable), `PREVIEW_URL`, and `SCREENSHOT_DIR`. Without overrides, screenshots go to `/tmp/chinese-history-checks`.

The application needs no build step or JavaScript packages. Google Fonts is optional; local serif and sans-serif fonts are fallbacks. Reading links require internet access.
