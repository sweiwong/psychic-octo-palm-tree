# Card queue

<!-- CANONICAL. The master to-do list of proposed cards that do not exist yet in
     history-of-china/snake-timeline/data/china_history_expanded.json but are wanted
     by cards that have been rewritten. Every linker updates this file as part of
     finishing a card. Sort by inbound count first, tier second. -->

Last updated: 2026-09-07, after adding the `an-lushan` link inventory section.

## Status

Three cards fully drafted and linked: `docs/cards/tang.md`, `docs/cards/an-lushan.md`, `docs/cards/three-kingdoms.md`. 218 of 221 corpus records still on the original weak AI-generated text.

**Gap to flag: resolved.** `an-lushan.md` was missing its `## Link inventory` section; it now has one. No change to its proposed-cards list, since the inline links were already complete. Its existing-cards list was trimmed by four entries (`kaiyuan-era`, `two-tax`, `huichang`, `southward-economic-shift`) that sat in `related` with no matching inline mention in the body, since `tang.md` already covers all four and this card deliberately does not restate them. Tier annotations below now reflect the finished inventory, and six Tier 2/3 proposals named only in that inventory's prose (not in `related`, since they are not currently named in the card text) have been added: `guo-ziyi`, `siege-of-suiyang`, `du-fu-wartime`, `manichaeism-china`, `tang-census`, `pugu-huaien`.

## How inbound count works

A slug's inbound count is the number of *drafted* cards (not corpus records generally, since undrafted corpus records cannot reference a slug that does not exist yet) that propose it in their `related` array. With only three cards drafted, the maximum possible score right now is 3. As more cards are written this number will climb and the ranking will firm up. Re-run the count after every new card.

## Top of the queue (inbound ≥ 2)

Sorted by inbound count, then by hub value (place/institution over single-purpose person or event cards, per standing instruction: the corpus is thin on places and institutions and that is where navigability comes from).

| Slug | Type | Inbound | Wanted by | Tier(s) | Scope |
|---|---|---|---|---|---|
| `luoyang` | place | 3 | tang (T1), an-lushan (T1), three-kingdoms (T1) | 1 | Luoyang 洛阳, the eastern capital, sacked in 189 and again in 190, ruled from by every regime in this neighbourhood. The single most-wanted place in the dataset. |
| `great-clans` | institution | 3 | tang (T2), an-lushan (T2), three-kingdoms (T2) | 1–2 | The hereditary magnate lineages that ran government from the Han collapse through the ninth century. Naming conflict resolved: `three-kingdoms` used `great-families` and was changed to `great-clans` to match the other two. Write as one card spanning Wei through Tang, and reconcile the `three-kingdoms` reading (broken by the Sui examinations) against Tackett's in `an-lushan.md` (intact until after 880). |
| `chang-an` | place | 2 | tang (T1), an-lushan (T1) | 1 | Chang'an 长安, the western capital. Tang's own inventory already flags it as referenced by four existing corpus cards with none of its own. |
| `yangtze` | place | 2 | tang (T1), three-kingdoms (T1) | 1 | The Yangtze 长江 valley as an economic and strategic region: the line Cao Cao failed to cross, the ground Wu colonised, the artery the Tang depended on after 755. |
| `jiedushi` | institution | 2 | tang (T1), an-lushan (T1) | 1 | Military commissioners 节度使, the office created for border defence that became the mechanism of both An Lushan's rebellion and the Tang's post-755 fragmentation. |
| `tang-song-transition` | concept | 2 | tang (T1), an-lushan (T2) | 1 | 唐宋变革, the Naitō Konan thesis that the aristocratic clans were destroyed by the ninth century and replaced by an examination gentry. Contested by Tackett's tomb-epitaph evidence (see `an-lushan.md`), which is itself worth a clause on this card. |
| `fubing` | institution | 2 | tang (T2), an-lushan (T2) | 2 | The rotating militia system 府兵制, abolished in 749, six years before An Lushan's rising. |
| `sogdians` | people/diaspora | 2 | tang (T2), an-lushan (T1) | 1–2 | Sogdian 粟特 merchants and the diaspora community, background to both Chang'an's cosmopolitanism and An Lushan's own ancestry. An Lushan's card upgrades this to Tier 1, since the ethnicity-and-loyalty argument depends on it. |
| `yang-guifei` | person | 2 | tang (T2), an-lushan (T2) | 2 | Yang Guifei 杨贵妃 and the Mawei incident, already the subject of the *Song of Everlasting Sorrow* referenced from `an-lushan.md`. |
| `tang-eunuchs` | institution | 2 | tang (T2), an-lushan (T2) | 2 | Palace eunuch control of the Shence Army 神策军, which started as An Lushan-era frontier defence and ended as the throne's own guard. |

## Full queue (inbound = 1)

Grouped by type, places and institutions first.

### Places

| Slug | Tier | From | Scope |
|---|---|---|---|
| `guanzhong` | T1 (tang) | tang | Guanzhong 关中 basin and the Central Plains 中原 as political heartland. |
| `chengdu` | T2 (3k) | three-kingdoms | Chengdu 成都, Shu-Han's capital for forty years. |
| `nanjing` | T2 (3k) | three-kingdoms | The city as Jianye, Jiankang and later capital; referenced constantly across the corpus, has no card. |
| `sichuan` | T3 (3k) | three-kingdoms | Sichuan 四川 / Yi province 益州 as a strategic region. |
| `yangzhou` | T2 (tang) | tang | 扬州, where the Grand Canal meets the Yangtze; the empire's wealthiest commercial city after 755. |
| `guangzhou-trade` | T2 (tang) | tang | 广州, Arab and Persian maritime trade, the 878 massacre. |
| `nestorian-stele` | T2 (tang) | tang | The 781 stele and the Nestorian Christian mission in Tang Chang'an. |
| `kaifeng` | T3 (tang) | tang | As a city; `jingkang` and `catalog-R_SSONG` cover it only as an event. |
| `hangzhou` | T3 (tang) | tang | As a city, same gap as Kaifeng. |
| `cao-cao-tomb` | T2 (3k) | three-kingdoms | The 2009 Xigaoxue excavation and the decade-long authenticity dispute. Archaeology-as-method card. |

### Institutions and systems

| Slug | Tier | From | Scope |
|---|---|---|---|
| `imperial-examinations` | T1 (tang) | tang | 科举 as a standing institution across a millennium. |
| `nine-rank-system` | T1 (3k) | three-kingdoms | 九品中正制, the direct antecedent of the examination system; runs 220 to Sui. |
| `equal-field-system` | T2 (tang) | tang | 均田制. |
| `three-departments-six-ministries` | T2 (tang) | tang | 三省六部. |
| `salt-monopoly` | T2 (tang) | tang | Liu Yan 刘晏 and the salt commission. |
| `tuntian` | T2 (3k) | three-kingdoms | Agricultural garrisons 屯田, the model behind the Tang equal-field system. |
| `hebei-three-garrisons` | T1 (an-lushan) | an-lushan | 河北三镇, the autonomous provinces created by the 763 settlement, argued over into the ninth century. |
| `tang-census` | T3 (an-lushan) | an-lushan | The household-register system as a standing institution; the same undercount problem this card flags for 764 recurs at other dynastic transitions. |

### Texts and cultural works

| Slug | Tier | From | Scope |
|---|---|---|---|
| `sanguozhi` | T1 (3k) | three-kingdoms | *Records of the Three Kingdoms* 三国志, the near-contemporary source everything else corrects against. |
| `sanguo-yanyi` | T1 (3k) | three-kingdoms | *Romance of the Three Kingdoms* 三国演义, more widely known than the history it inverts. |
| `tang-poetry` | T2 (tang) | tang | The Quan Tangshi corpus, distinct from the Li Bai and Du Fu card. |
| `jian-an-literature` | T2 (3k) | three-kingdoms | 建安 poetry, the Cao family court, the Seven Masters, the 217 plague. |
| `changhenge` | T2 (an-lushan) | an-lushan | Bai Juyi's Song of Everlasting Sorrow 长恨歌, the poem that turned the rebellion into romance. |
| `du-fu-wartime` | T3 (an-lushan) | an-lushan | Du Fu's 757–759 conscription poems ("Spring View," the "Three Officers" and "Three Partings") as a distinct body of wartime evidence, separate from the general Li Bai and Du Fu card. |
| `wen-xuan` | T3 (3k) | three-kingdoms | The *Wen xuan* 文选 anthology, and how its editorial choices erased most surviving Shu and Wu writing. |
| `cao-man-zhuan` | T3 (3k) | three-kingdoms | *Biography of Cao the Trickster* 曹瞒传, the hostile Wu account that seeded Cao Cao's villain image. |

### Concepts and arguments

| Slug | Tier | From | Scope |
|---|---|---|---|
| `zhengtong-debate` | T2 (3k) | three-kingdoms | 正统, the legitimate-succession argument from Chen Shou through Xi Zuochi to Zhu Xi. Would serve the Song, Yuan and Ming cards too. |
| `xuanxue` | T2 (3k) | three-kingdoms | 玄学, pure conversation, Wang Bi, the Seven Sages of the Bamboo Grove. |
| `celestial-masters` | T3 (3k) | three-kingdoms | 天师道, Zhang Lu's Hanzhong state and the origins of organised Daoism. |
| `tian-kehan` | T2 (tang) | tang | Heavenly Khagan 天可汗 (could fold into `taizong`). |
| `foreign-religions-tang` | T2 (tang) | tang | Zoroastrian and Manichaean communities (could fold into `nestorian-stele`). |
| `manichaeism-china` | T3 (an-lushan) | an-lushan | 摩尼教. Bögü Qaghan's 762 conversion at Luoyang, the only steppe state to adopt Manichaeism as its official religion; connects `an-lushan`, `uyghur-khaganate` and `huichang`. Possible overlap with `foreign-religions-tang`, check before both get written. |
| `silk-road` | T3 (tang) | tang | A standing entity card; only Zhang Qian's mission exists at present. |
| `tang-japan` | T3 (tang) | tang | Kentōshi missions, Nara and Heian-kyō, Abe no Nakamaro. |

### Peoples and polities

| Slug | Tier | From | Scope |
|---|---|---|---|
| `eastern-turks` | T2 (tang) | tang | The Turkic khaganates 突厥. |
| `uyghur-khaganate` | T1 (an-lushan) | an-lushan | 回纥, whose cavalry saved the Tang in 757 and whose horse-for-silk trade shaped Tang finances afterward. |
| `tibetan-empire-tang` | T1 (an-lushan) | an-lushan | 吐蕃, took the Gansu corridor and briefly occupied Chang'an in 763. |
| `shanyue` | T2 (3k) | three-kingdoms | The Shanyue 山越 hill peoples and Wu's colonisation of the southeast. |

### Events

| Slug | Tier | From | Scope |
|---|---|---|---|
| `conquest-of-wu-280` | T2 (3k) | three-kingdoms | The 280 campaign; the corpus has Red Cliffs but no card for the reunification itself. |
| `guandu` | T3 (3k) | three-kingdoms | The battle of 200 that gave Cao Cao the north. |
| `wei-japan-embassies` | T3 (3k) | three-kingdoms | The Wa account in *Sanguozhi* 30, foundational for early Japanese history. |
| `siege-of-suiyang` | T3 (an-lushan) | an-lushan | 睢阳, 757. The nine-month siege on the Grand Canal route south, notorious for cannibalism and a long-running moral argument about the commander Zhang Xun. Cut from `an-lushan.md` for length. |

### People

| Slug | Tier | From | Scope |
|---|---|---|---|
| `taizong` | T1 (tang) | tang | Taizong 太宗 / Li Shimin 李世民 as a person, distinct from the Zhenguan-era government card. |
| `gaozong` | T3 (tang) | tang | Emperor Gaozong 高宗, connective tissue to Wu Zetian. |
| `yan-zhenqing` | T2 (an-lushan) | an-lushan | 颜真卿, calligrapher and official; his 758 requiem draft is a primary emotional record of the war and the source of `an-lushan.md`'s image. |
| `guo-ziyi` | T2 (an-lushan) | an-lushan | 郭子仪. Recovered both Tang capitals and stayed loyal through 763, the standing counter-example to the "never trust a frontier general" reading. Not currently named in `an-lushan.md`'s own text (cut for length), but flagged there as the clearest remaining gap. |
| `pugu-huaien` | T3 (an-lushan) | an-lushan | 仆固怀恩, the Tiele general whose Uyghur in-laws and cavalry won the war for the Tang, then rebelled against it in 764–765. Cut from `an-lushan.md` for length. |
| `chen-shou` | T1 (3k) | three-kingdoms | Chen Shou 陈寿, the historian whose structural bias is the whole argument of two sections of the card. |
| `cao-cao` | T1 (3k) | three-kingdoms | The most consequential figure of the period, named in five existing corpus card texts and this one. |
| `liu-bei` | T1 (3k) | three-kingdoms | Founder of Shu-Han, whose claimed Han descent drives the legitimacy debate. |
| `sun-quan` | T1 (3k) | three-kingdoms | Fifty years in power; the state that opened the south. |
| `zhuge-liang` | T1 (3k) | three-kingdoms | Regent, administrator, object of the largest ministerial cult in Chinese history. |
| `sima-yi` | T2 (3k) | three-kingdoms | The 249 coup that put Wei in Sima hands. |
| `guan-yu` | T2 (3k) | three-kingdoms | Religious afterlife as Guandi, on ter Haar. |
| `cao-pi` | T2 (3k) | three-kingdoms | Founding emperor of Wei; the 220 abdication ceremony is the hinge date of the period. |
| `sima-yan` | T2 (3k) | three-kingdoms | Founding emperor of Jin; his 266 and 280 actions close the period out. |
| `pei-songzhi` | T2 (3k) | three-kingdoms | 429 commentator; the only reason most Shu and Wu material survives at all. |
| `dong-zhuo` | T2 (3k) | three-kingdoms | The warlord whose 189 seizure of Luoyang is treated by de Crespigny as the real end of Han authority. |
| `su-shi` | T2 (3k) | three-kingdoms | Major Song polymath; his anecdote is the earliest evidence of pro-Shu popular sympathy, predating the novel by centuries. |
| `liu-shan` | T3 (3k) | three-kingdoms | Last ruler of Shu, whose court "never appointed historians at all." |
| `sun-hao` | T3 (3k) | three-kingdoms | Last ruler of Wu, surrendered 280. |
| `emperor-xian` | T3 (3k) | three-kingdoms | The puppet emperor whose 31-year captivity frames the opening of the Three Kingdoms story. |

## Orphans

Corpus records nothing links to (inbound count of zero from any other corpus record's `related` array, computed across all 221 records):

`catalog-F_XIA_1` (Yu the Great, legendary) · `catalog-G_ALEX` (Alexander the Great) · `catalog-G_ISLAM` (Muhammad's first revelation) · `catalog-R_ZHOU` (Zhou) · `catalog-S_MODERN` (Modern China) · `catalog-S_QH` (Qin and Han government) · `catalog-S_SONG` (Song and neighbouring empires) · `catalog-S_ST` (Sui and Tang) · `eastern-zhou` (Eastern Zhou) · `late-warring` (Late Warring States) · `qingming-scroll` (Along the River During Qingming) · `xia` (Xia) · `xin` (Xin)

13 of 221. Several of these are era/system-band records (`catalog-S_*`) that the timeline renderer may reach by mechanism other than `related` links, which would make this list partly a false positive; worth checking against the renderer before treating all 13 as real gaps.

## Dead ends

Corpus records with an empty `related` array (24 of 221):

`catalog-C_QIN` (Terracotta Army) · `catalog-E_3K_2` (Battle of Red Cliffs, now linked *from* `three-kingdoms` but still dead-ends itself) · `catalog-E_BUD_ENTRY` · `catalog-E_HAN_1` · `catalog-E_HAN_2` (Zhang Qian's first western mission) · `catalog-E_QIN_2` · `catalog-E_SHANG_2` · `catalog-E_XIA_1` · `catalog-F_SUN` (Sun Tzu) · `catalog-F_XIA_1` · `catalog-G_ALEX` · `catalog-R_ZHOU` · `huang-chao` · `huichang` · `late-warring` · `oracle` · `paper` · `talas` · `tang-end` · `two-tax` · `unification` · `xin` · `xuanwu-gate` · `xuanzang-return`

Several of these (`huang-chao`, `talas`, `xuanwu-gate`, `xuanzang-return`, `two-tax`, `huichang`, `tang-end`) are exactly the kind of Tang-era event cards that `tang.md` links to. When those get their own rewrite passes, giving them a `related` array back to `tang` and to whichever specific figures they involve should be a standard part of the work, not an afterthought.

`catalog-E_3K_2` is the highest-priority fix here specifically: it is now linked from two places (`three-kingdoms`, `catalog-R_HAN_E`) and still points nowhere. Minimum viable fix: add `three-kingdoms`, `catalog-R_WEI`, `cao-cao` and `guandu`.

## Asymmetries

The general pattern: most of the 221 records were auto-generated with thin, one-directional `related` arrays, so any card that gets a real linking pass will find far more outbound links than the cards it points to return. This is expected and will resolve gradually as more cards get rewritten. Flagging only the asymmetries worth deliberately fixing now:

- **`three-kingdoms` → `southward-economic-shift`, not reciprocated.** The highest-value gap. `three-kingdoms`'s closing argument is that Wu's colonisation of the south is the origin point of the later southward economic shift. `southward-economic-shift`'s own `related` array (`an-lushan`, `sui-grand-canal`, `tang`, `song`, `jingkang`) starts the story at the Tang. When `southward-economic-shift` next gets touched, add `three-kingdoms` and `catalog-R_WU`.
- **`division` ↔ `three-kingdoms`: resolved.** The research brief for `three-kingdoms` flagged this as one-directional (`division` linked to `three-kingdoms`, not the reverse). The card as now linked closes the loop (`[[division|division of China]]` appears in the closing section).
- **`an-lushan` → `great-clans`, `tang-song-transition`: worth double-checking once those cards exist.** `an-lushan.md` cites Nicolas Tackett's argument that the great clans survived 755–763 intact and were destroyed only after 880, which complicates the standard Tang-Song transition story that `tang.md` and this card both gesture at. Whoever writes `tang-song-transition` should reconcile both readings rather than defaulting to Naitō's.
- **`ming-journey-west` and `sanguo-yanyi`: no cross-reference yet.** The two great Ming-era novels, each built on centuries of oral and dramatic tradition, are natural peers. `ming-journey-west` already exists in the corpus and does not list `sanguo-yanyi` (which does not exist yet). Add the cross-link when `sanguo-yanyi` is written.

## Housekeeping notes, not fixed by any card edit

- `three-kingdoms`'s corpus record has a `ranges` field of `[[220, 266]]` (the Jin accession) while `start`/`end` and the card text both use 280 (Wu's surrender). This is a dataset decision for Wei, not something fixed in the card markdown.
