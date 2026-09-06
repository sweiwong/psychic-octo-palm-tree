# Visual review: Chinese history atlas

Context: an illustrated, interactive introduction for curious beginners and Mandarin learners. Review covers the full overview and representative cards, not an individual visual inspection of all 207 cards. Historical content was not changed during this review.

## Findings and completed fixes

1. The desktop reading card was 268px wide, leaving approximately 222px for text. Open cards now use 380px on large screens and 320px on intermediate screens. The welcome card retains its compact layout.
2. Long phone cards lost their close control during scrolling. Reading controls now remain at the top of the card; the close target is 44px. On desktop, close returns to the welcome card. On phones it dismisses the reading sheet.
3. The significance section was buried below long explanations. A visible “Why it matters” shortcut moves focus and scrolls directly to that section. Reduced-motion preferences are respected.
4. Timeline dates were 8px. They now use 10px, with measured text widths included in collision placement. No date text extended beyond its planned label box in the tested sizes.
5. Chinese characters within a heading could split awkwardly across lines. Headings now keep Chinese text runs together and use more comfortable line spacing.
6. Long approximate duration highlights produced a dense repeated pattern. Wider-spaced dashes preserve the uncertainty cue with less visual noise.
7. A suspected broken thumbnail was an incomplete image load. After loading, the source image displayed correctly. Image proportions and credits remain intact.

## Graphical assessment

Scores are editorial judgments supported by the observations below, not results of a user study. Weighted with the graphical review skill: integrity ×3, proportionality ×2, data-ink ×2, typography ×0.5, others ×1.

| Criterion | Score /10 | Observation |
|---|---:|---|
| Integrity | 8.5 | Approximate dates remain marked, concurrent states remain visible, focused views explain their scale change. A short label cannot convey every historical qualification; cards carry those notes. |
| Proportionality | 10 | Central path distance is proportional to elapsed time, including turns. Equal-duration checks are supported by the geometry tests. |
| Data-ink | 8 | Muted guides and restrained colors keep the ribbon prominent. Surface texture and card ornaments remain, but do not obscure the data. No pixel-based ink ratio was computed. |
| Redundant ink | 7 | Removed the nonessential card sequence counter from visible controls. Chinese title and pinyin remain for the learning audience. |
| Data density | 7 | The full overview compresses recent periods. Focused views and the collection provide access to dense material. More density would impair small-screen legibility. |
| Integration | 8 | Labels sit near their periods; cards explain selected events, with a direct link to significance. |
| Context | 9 | Dates, approximation, overlapping states, sources and historical significance are available together. |
| Clarity | 8 | Wider reading measure, persistent controls and larger dates improve scanning. The complete timeline still takes scrolling on a phone. |
| Typography | 8 | English, Chinese and pronunciation have distinct roles. Card headings avoid splitting Chinese runs. Small concurrent-state names remain best read in a focused view. |

Overall: **8.36/10**. The graphic is coherent and useful; the main improvements concerned reading comfort and access rather than a change of chart form.

## Distortion check

Measured path-length change for a 200-year interval compared with a 100-year interval: 100%. Data-duration change: 100%. Lie factor = 1.00, confirmed at 1440, 1024, 800, 390 and 320px. This checks central path length, not filled area or arbitrary distances across the page. No close analogue to the dimensional exaggeration in Tufte’s TIME barrel or shrinking-doctor examples.

## Chartjunk check

- Moiré: the short repeated dashes in a long selected duration resembled a barcode. Reduced their frequency while retaining broken-line uncertainty.
- Dreaded grid: not observed; guide lines are much lighter than data marks.
- Graphical duck: the folded path is an expressive choice, but still encodes chronology and supports exploration. Retained the user’s chosen form.
- Decoration: light paper texture and the card glyph’s circles remain. They carry little quantitative information, but were not the main reading problem.

## Genres considered

1. C10, chronological time display: retain the folded timeline for overview and guided exploration. A single straight line would make recent periods even harder to select on a phone.
2. C6, text-table: the existing searchable collection complements the graphic when a reader wants an exact date or named subject.
3. C5, small multiples: useful for deliberate comparison of periods, but equal scales would leave modern sections tiny; independent scales would require careful explanation and add a new navigation model.

Chosen: the existing folded chronological display plus searchable reading collection. Retaining it preserves a continuous overview and the user’s established design. No alternative-render trigger for this bounded visual correction.

## Remedies and reference

- B4, integrate text and graphic: readable dates, measured label boxes and direct significance access. Emulate Marey’s ordering of complex information, without adopting a stronger grid.
- B5, reduce non-data activity: quieter approximate-duration pattern and compact controls.
- B6, remove redundant ink: hide the card sequence count, which did not help readers interpret history.

Framework: the local assess-graphical-excellence skill and its Tufte principles reference (VDQI, second edition). No claim of a mathematical optimum or exhaustive user testing.

## Verification and limits

Actual screenshots inspected: full overview; Chanyuan top and significance section on desktop and phone; Lu Xun’s bilingual heading and image; southward economic shift and its duration highlight. Automated checks exercise five viewport widths, direct file opening, keyboard focus, jump placement, desktop/phone close behavior, overflow, date bounds, event placement and uncertainty. Existing reading-card and source-control checks also passed.

Screenshots in this directory retain before/after evidence. Remote image loading can temporarily show incomplete pixels; the final visual inspection waited for image completion. This review does not independently re-audit every historical source or every image in the collection.
