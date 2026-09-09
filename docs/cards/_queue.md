# Card queue

<!-- CANONICAL. The master to-do list of proposed cards that do not exist yet in
     history-of-china/snake-timeline/data/china_history_expanded.json but are wanted
     by cards that have been rewritten. Every linker updates this file as part of
     finishing a card. Sort by inbound count first, tier second. -->

Last updated: 2026-09-08, jiedushi relink after full body replacement.

## Status

Jiedushi relink update: `jiedushi.md`'s body was fully replaced by an externally-authored draft with no inline links, an emptied `related` array and a placeholder inventory. Re-linked from scratch against the corpus rather than against the previous draft's proposal list. Nine slugs now link inline (`tang`, `five-dynasties`, `an-lushan`, `huang-chao`, `tang-end`, `catalog-R_FIVE_LATER_LIANG`, `song`, `liao`, `jurchen-jin`), two more than the prior draft managed and including two the prior draft never touched (`liao`, `jurchen-jin`, both already in the corpus). Of the nine proposals the prior draft had generated, five carry over with adjusted tiers (`hebei-three-garrisons`, `chang-an`, `imperial-examinations` unchanged; `fubing` upgraded from T3 to T1 now that the new text names 府兵制 outright; `song-military-centralisation` unchanged at T2), three survive at a lower tier because the new text treats them more thinly (`xianzong-restoration` T2→T3, `zhu-wen` and `chenqiao-mutiny` unchanged at T3), and one is dropped entirely (`guiyi-army`: the new text never mentions Zhang Yichao, Dunhuang or the Guiyi Army, even though the card's image still is the Zhang Yichao mural; flagged as an image/text mismatch for Wei to resolve, not fixed here). Five new proposals: `fanzhen` (T1, the buffer-garrison institution the new text treats as distinct from jiedushi itself), `guanzhong` (second vote, T3, "the Central Plains" in the closing line), `three-departments-six-ministries` (second vote, T2, via "the Ministry of Personnel"), `zhong-wen-qing-wu` (T2, the named Song civil-over-military policy), `xuanzong` and `song-taizu` (T2 each, the emperors bookending the office's rise and fall). Note in passing: `tang.md` and `an-lushan.md` both name Emperor Xuanzong extensively without proposing a card for him; this pass does not edit either file, but the gap is now visible via this card's inventory.

PRC audit update: ten proposals checked against the eleven available drafts and all 222 card identities and aliases. Eight new rows added; Mao Zedong and the Kuomintang now have two inbound drafts each. Earlier snapshots are preserved.

Republic audit update: eleven proposals checked against the ten available drafts and the 222-card corpus. Ten new rows added; Nanjing now has three inbound drafts and moves into the corresponding ranked group. Earlier snapshots remain below.

Qing audit update: eight proposals checked against all nine available drafts and the222-card corpus. Six new Qing proposals added. `imperial-examinations` now has six inbound drafts; `wu-sangui` now has two and moves into the ranked table. Earlier status snapshots are preserved below.

Ming audit update: ten proposals reconciled against all eight available drafts and the 222-card corpus. `imperial-examinations` now has five inbound drafts (including Song’s `civil-examinations` alias). Nanjing, Jingdezhen, Zhu Yuanzhang and Sanguo Yanyi each have two and move to the top table. Five new Ming-only proposals are below. Other historical status and graph statistics remain labelled as earlier snapshots.

Yuan audit update: the historical status and graph snapshot below describe the earlier four-card pass. The Yuan proposal rows now include all seven available drafts (canonical Tang, An Lushan, Three Kingdoms and jiedushi; current Chang’an, Song and Yuan). `civil-examinations` is merged into `imperial-examinations`; Grand Canal and Guan Hanqing already have corpus cards and are not new proposals. Other historical graph statistics below have not been recomputed by this single-card pass.

Four cards fully drafted and linked: `docs/cards/tang.md`, `docs/cards/an-lushan.md`, `docs/cards/three-kingdoms.md`, `docs/cards/jiedushi.md`. 217 of 221 corpus records still on the original weak AI-generated text.

**`jiedushi` removed from the queue.** It was Tier 1, inbound 2 (wanted by `tang` and `an-lushan`), the second-highest-priority institution in the old table after `great-clans`. It is now written and linked, so it drops out of the proposal tables below. Its own inventory pushes two more institutions past the inbound-2 threshold (`hebei-three-garrisons`, `imperial-examinations`), adds a third vote to `chang-an` and `fubing`, and adds five new slugs to the queue (`xianzong-restoration`, `song-military-centralisation`, `guiyi-army`, `zhu-wen`, `chenqiao-mutiny`). Superseded snapshot: `jiedushi.md`'s body was fully replaced afterward and relinked from scratch; see the "Jiedushi relink update" note above for the current state of its proposals (`guiyi-army` since dropped, `fubing` upgraded, `xianzong-restoration` downgraded, five new proposals added).

**Gap to flag: resolved.** `an-lushan.md` was missing its `## Link inventory` section; it now has one. No change to its proposed-cards list, since the inline links were already complete. Its existing-cards list was trimmed by four entries (`kaiyuan-era`, `two-tax`, `huichang`, `southward-economic-shift`) that sat in `related` with no matching inline mention in the body, since `tang.md` already covers all four and this card deliberately does not restate them. Tier annotations below now reflect the finished inventory, and six Tier 2/3 proposals named only in that inventory's prose (not in `related`, since they are not currently named in the card text) have been added: `guo-ziyi`, `siege-of-suiyang`, `du-fu-wartime`, `manichaeism-china`, `tang-census`, `pugu-huaien`.

## How inbound count works

A slug's inbound count is the number of *drafted* cards (not corpus records generally, since undrafted corpus records cannot reference a slug that does not exist yet) that propose it in their link inventory Tier lists (the pool a slug is drawn from before it is ever written, so it never comes from a card's `related` frontmatter, which only ever holds existing linked cards). With seven drafts available to this audit, the maximum possible score is 7. Counts for the Yuan-related proposals below include those drafts; other rows retain their prior audit counts. As more cards are written this number will climb and the ranking will firm up. Re-run the count after every new card.

## Top of the queue (inbound ≥ 2)

Sorted by inbound count, then by hub value (place/institution over single-purpose person or event cards, per standing instruction: the corpus is thin on places and institutions and that is where navigability comes from).

| Slug | Type | Inbound | Wanted by | Tier(s) | Scope |
|---|---|---|---|---|---|
| `imperial-examinations` | institution | 6 | tang (T1), jiedushi (T2), song (T2), yuan (T2), ming (T2), qing (T2) | 1–2 | 科举 as a standing institution across a millennium. `jiedushi.md`'s relinked text wants it for one clause: jiedushi appointed their own staff, "bypassing the imperial examination system." Promoted here from the Full queue's Institutions table. |
| `luoyang` | place | 3 | tang (T1), an-lushan (T1), three-kingdoms (T1) | 1 | Luoyang 洛阳, the eastern capital, sacked in 189 and again in 190, ruled from by every regime in this neighbourhood. The single most-wanted place in the dataset. |
| `chang-an` | place | 3 | tang (T1), an-lushan (T1), jiedushi (T1) | 1 | Chang'an 长安, the western capital. Referenced by all three cards that touch the Tang. `jiedushi.md`'s relinked text names it as the treasury jiedushi stopped forwarding tax to and the city the Huang Chao rebellion sacked, and still has no card of its own. |
| `great-clans` | institution | 3 | tang (T2), an-lushan (T2), three-kingdoms (T2) | 1–2 | The hereditary magnate lineages that ran government from the Han collapse through the ninth century. Naming conflict resolved: `three-kingdoms` used `great-families` and was changed to `great-clans` to match the other two. Write as one card spanning Wei through Tang, and reconcile the `three-kingdoms` reading (broken by the Sui examinations) against Tackett's in `an-lushan.md` (intact until after 880). |
| `fubing` | institution | 3 | tang (T2), an-lushan (T2), jiedushi (T1) | 1–2 | The rotating militia system 府兵制, abolished in 749, six years before An Lushan's rising. `jiedushi.md`'s relinked text now names it outright ("the old fubing militia system (府兵制 fǔbīngzhì)... had decayed") as the stated reason the jiedushi office existed at all, upgrading its own vote from T3 to T1. |
| `hangzhou` | place | 3 | tang (T3), song (T1), yuan (T2) | 1–3 | Hangzhou as a city and Song capital, including its surrender to the Yuan in 1276. |
| `nanjing` | place | 3 | three-kingdoms (T2), ming (T2), republic (T2) | 2 | The city across dynasties and the republic, including Jianye, Jiankang, the early Ming court and Nationalist government. |
| `yangtze` | place | 2 | tang (T1), three-kingdoms (T1) | 1 | The Yangtze 长江 valley as an economic and strategic region: the line Cao Cao failed to cross, the ground Wu colonised, the artery the Tang depended on after 755. |
| `hebei-three-garrisons` | institution | 2 | an-lushan (T1), jiedushi (T1) | 1 | 河北三镇, the autonomous provinces created by the 763 settlement, argued over into the ninth century, and the one carve-out Xianzong's 819 reform never closed. Both cards whose late-Tang narrative turns on the settlement now want it. Promoted here from the Full queue's Institutions table. |
| `guanzhong` | place | 2 | tang (T1), jiedushi (T3) | 1–3 | Guanzhong 关中 basin and the Central Plains 中原 as political heartland. `jiedushi.md`'s relinked text adds a light second vote via its closing line, "the strongest proclaiming themselves emperors over the Central Plains." Promoted here from the Full queue's Places table. |
| `three-departments-six-ministries` | institution | 2 | tang (T2), jiedushi (T2) | 2 | 三省六部. `jiedushi.md`'s relinked text names it via "the Ministry of Personnel," the office jiedushi bypassed when making their own appointments. Promoted here from the Full queue's Institutions table. |
| `tang-song-transition` | concept | 2 | tang (T1), an-lushan (T2) | 1 | 唐宋变革, the Naitō Konan thesis that the aristocratic clans were destroyed by the ninth century and replaced by an examination gentry. Contested by Tackett's tomb-epitaph evidence (see `an-lushan.md`), which is itself worth a clause on this card. |
| `sogdians` | people/diaspora | 2 | tang (T2), an-lushan (T1) | 1–2 | Sogdian 粟特 merchants and the diaspora community, background to both Chang'an's cosmopolitanism and An Lushan's own ancestry. An Lushan's card upgrades this to Tier 1, since the ethnicity-and-loyalty argument depends on it. |
| `yang-guifei` | person | 2 | tang (T2), an-lushan (T2) | 2 | Yang Guifei 杨贵妃 and the Mawei incident, already the subject of the *Song of Everlasting Sorrow* referenced from `an-lushan.md`. |
| `tang-eunuchs` | institution | 2 | tang (T2), an-lushan (T2) | 2 | Palace eunuch control of the Shence Army 神策军, which started as An Lushan-era frontier defence and ended as the throne's own guard. `jiedushi.md`'s relinked text does not mention eunuchs or the army-supervisor role at all, so it does not add a third vote here. |
| `jingdezhen` | place/industry | 2 | yuan (T3), ming (T2) | 2–3 | Porcelain kilns, skilled labour, imperial production and overseas markets. |
| `zhu-yuanzhang` | person | 2 | yuan (T2), ming (T1) | 1–2 | The Ming founder’s rise through rebellion and his decisions as Hongwu. |
| `sanguo-yanyi` | text | 2 | three-kingdoms (T1), ming (T2) | 1–2 | Romance of the Three Kingdoms and its transformation of earlier history. |
| `wu-sangui` | person | 2 | ming (T3), qing (T3) | 3 | Alliance with the Manchus and later rebellion against Qing rule. |
| `kuomintang` | institution | 2 | republic, prc | T2 (both) | The Nationalist Party’s organisation and political programme. |
| `mao-zedong` | person | 2 | republic, prc | T2 (republic), T1 (prc) | Mao’s political career and leadership across the revolutionary and PRC periods. |

## Full queue (inbound = 1)

Grouped by type, places and institutions first.

### Places

| Slug | Tier | From | Scope |
|---|---|---|---|
| `chengdu` | T2 (3k) | three-kingdoms | Chengdu 成都, Shu-Han's capital for forty years. |
| `sichuan` | T3 (3k) | three-kingdoms | Sichuan 四川 / Yi province 益州 as a strategic region. |
| `yangzhou` | T2 (tang) | tang | 扬州, where the Grand Canal meets the Yangtze; the empire's wealthiest commercial city after 755. |
| `guangzhou-trade` | T2 (tang) | tang | 广州, Arab and Persian maritime trade, the 878 massacre. |
| `nestorian-stele` | T2 (tang) | tang | The 781 stele and the Nestorian Christian mission in Tang Chang'an. |
| `kaifeng` | T3 (tang) | tang | As a city; `jingkang` and `catalog-R_SSONG` cover it only as an event. |
| `cao-cao-tomb` | T2 (3k) | three-kingdoms | The 2009 Xigaoxue excavation and the decade-long authenticity dispute. Archaeology-as-method card. |
| `shangdu` | T2 (yuan) | yuan | The Yuan summer capital and its relationship with Dadu. |
| `xiangyang` | T2 (yuan) | yuan | The strategic city and the siege that opened the route into Southern Song. |

### Institutions and systems

| Slug | Tier | From | Scope |
|---|---|---|---|
| `nine-rank-system` | T1 (3k) | three-kingdoms | 九品中正制, the direct antecedent of the examination system; runs 220 to Sui. |
| `equal-field-system` | T2 (tang) | tang | 均田制. |
| `fanzhen` | T1 (jiedushi) | jiedushi | 藩镇, the "buffer garrison" system the 763 settlement created out of the frontier commands. `jiedushi.md` treats it as a distinct standing institution from the jiedushi office itself, using the term as often as "jiedushi" from the rebellion onward. New proposal. |
| `salt-monopoly` | T2 (tang) | tang | Liu Yan 刘晏 and the salt commission. |
| `tuntian` | T2 (3k) | three-kingdoms | Agricultural garrisons 屯田, the model behind the Tang equal-field system. |
| `song-military-centralisation` | T2 (jiedushi) | jiedushi | The Song's dismantling of jiedushi power after 960: military authority centralised under the emperor, the army reorganised under rotating civilian officials. `jiedushi.md`'s relinked text describes the mechanism in general terms, without the specific 961/969/965/977 detail an earlier draft apparently carried; still no card owns this territory. |
| `tang-census` | T3 (an-lushan) | an-lushan | The household-register system as a standing institution; the same undercount problem this card flags for 764 recurs at other dynastic transitions. |

### Texts and cultural works

| Slug | Tier | From | Scope |
|---|---|---|---|
| `sanguozhi` | T1 (3k) | three-kingdoms | *Records of the Three Kingdoms* 三国志, the near-contemporary source everything else corrects against. |
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
| `zhong-wen-qing-wu` | T2 (jiedushi) | jiedushi | 重文轻武, "emphasising the civil over the military," named and glossed with hanzi in `jiedushi.md` as a cornerstone of Song governance. Distinct from `song-military-centralisation`'s administrative mechanics: this is the stated governing philosophy, and may fold into that card rather than stand alone. New proposal. |

### Peoples and polities

| Slug | Tier | From | Scope |
|---|---|---|---|
| `eastern-turks` | T2 (tang) | tang | The Turkic khaganates 突厥. |
| `uyghur-khaganate` | T1 (an-lushan) | an-lushan | 回纥, whose cavalry saved the Tang in 757 and whose horse-for-silk trade shaped Tang finances afterward. |
| `tibetan-empire-tang` | T1 (an-lushan) | an-lushan | 吐蕃, took the Gansu corridor and briefly occupied Chang'an in 763. |
| `shanyue` | T2 (3k) | three-kingdoms | The Shanyue 山越 hill peoples and Wu's colonisation of the southeast. |
| `kublai-khan` | T1 (yuan) | yuan | Yuan founder: his choices as Mongol khan and emperor of China. |
| `genghis-khan` | T1 (yuan) | yuan | Founder of the Mongol empire, distinguished from Kublai’s Yuan dynasty. |
| `marco-polo` | T2 (yuan) | yuan | Travel, the Description of the World and its strengths and limits as evidence. |
| `zhao-mengfu` | T3 (yuan) | yuan | Painting, calligraphy and service under the Yuan. |

### Events

| Slug | Tier | From | Scope |
|---|---|---|---|
| `xianzong-restoration` | T3 (jiedushi) | jiedushi | Emperor Xianzong's 805–820 recovery of provincial control. Downgraded from T2: `jiedushi.md`'s relinked text reduces this to one sentence ("briefly subdued several recalcitrant garrisons. However, these successes were temporary"), no longer a full section. No card in the corpus owns the one late-Tang reign that reversed decline. |
| `conquest-of-wu-280` | T2 (3k) | three-kingdoms | The 280 campaign; the corpus has Red Cliffs but no card for the reunification itself. |
| `guandu` | T3 (3k) | three-kingdoms | The battle of 200 that gave Cao Cao the north. |
| `wei-japan-embassies` | T3 (3k) | three-kingdoms | The Wa account in *Sanguozhi* 30, foundational for early Japanese history. |
| `siege-of-suiyang` | T3 (an-lushan) | an-lushan | 睢阳, 757. The nine-month siege on the Grand Canal route south, notorious for cannibalism and a long-running moral argument about the commander Zhang Xun. Cut from `an-lushan.md` for length. |
| `chenqiao-mutiny` | T3 (jiedushi) | jiedushi | 陈桥兵变, 960. Zhao Kuangyin's own troops proclaiming him emperor at Chenqiao, the last successful jiedushi coup. `jiedushi.md`'s relinked text describes only "a military coup," naming neither the mutiny, the place nor the command that gave the Song its name; the gap this proposal would fill is unchanged from the prior draft. |

### People

| Slug | Tier | From | Scope |
|---|---|---|---|
| `taizong` | T1 (tang) | tang | Taizong 太宗 / Li Shimin 李世民 as a person, distinct from the Zhenguan-era government card. |
| `gaozong` | T3 (tang) | tang | Emperor Gaozong 高宗, connective tissue to Wu Zetian. |
| `yan-zhenqing` | T2 (an-lushan) | an-lushan | 颜真卿, calligrapher and official; his 758 requiem draft is a primary emotional record of the war and the source of `an-lushan.md`'s image. |
| `guo-ziyi` | T2 (an-lushan) | an-lushan | 郭子仪. Recovered both Tang capitals and stayed loyal through 763, the standing counter-example to the "never trust a frontier general" reading. Not currently named in `an-lushan.md`'s own text (cut for length), but flagged there as the clearest remaining gap. |
| `pugu-huaien` | T3 (an-lushan) | an-lushan | 仆固怀恩, the Tiele general whose Uyghur in-laws and cavalry won the war for the Tang, then rebelled against it in 764–765. Cut from `an-lushan.md` for length. |
| `zhu-wen` | T3 (jiedushi) | jiedushi | 朱温, deposed the last Tang emperor in 907 and founded the Later Liang. `jiedushi.md`'s relinked text gives him one clause (granted command of "the strategic region around the capital"), thinner than the prior draft's "held five commissionerships at once." Named in both `tang.md` and `jiedushi.md` with no card of his own. |
| `zhaozong` | T3 (jiedushi) | jiedushi | Emperor Zhaozong, assassinated by Zhu Wen in 904 per a single clause in `jiedushi.md`. New proposal; likely belongs inside a `zhu-wen` card rather than standing alone. |
| `xuanzong` | T2 (jiedushi) | jiedushi | Emperor Xuanzong (r. 712–756), named in `jiedushi.md` as the emperor under whom the jiedushi office was established. No person card exists despite `tang.md` and `an-lushan.md` also naming him extensively. New proposal. |
| `song-taizu` | T2 (jiedushi) | jiedushi | Emperor Taizu of Song, "himself a jiedushi who seized the throne via a military coup" per `jiedushi.md`, whose 960 reforms are that card's entire closing argument. No Song founder card exists; distinct from the Ming founder already tracked as `zhu-yuanzhang`. New proposal. |
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

### Yuan empire and campaigns

| Slug | Tier | From | Scope |
|---|---|---|---|
| `mongol-empire` | T1 (yuan) | yuan | Conquests, successor khanates and connections across Eurasia. |
| `mongol-invasions-japan` | T2 (yuan) | yuan | The failed expeditions of 1274 and 1281 and their costs. |

### Ming additions

| Slug | Tier | From | Scope |
|---|---|---|---|
| `ming-great-wall` | T2 (ming) | ming | Ming frontier fortifications, campaigns and trade; distinct from the existing Qin wall card. |
| `yongle-emperor` | T2 (ming) | ming | Zhu Di’s civil war, seizure of the throne and imperial projects. |
| `ming-household-registration` | T3 (ming) | ming | Hereditary military and artisan obligations and household taxation. |
| `american-crops-china` | T3 (ming) | ming | Introduction of American crops and changes in cultivation. |

### Qing additions

| Slug | Tier | From | Scope |
|---|---|---|---|
| `nurhaci` | T1 (qing) | qing | Alliances, banner organisation and foundation of Later Jin in1616. |
| `hong-taiji` | T1 (qing) | qing | Establishment of Qing and recruitment of a mixed ruling elite; a person card distinct from the existing Early Qing period. |
| `qianlong-emperor` | T2 (qing) | qing | Expansion, court culture and the late reign; broader than the existing Inner Asia campaigns card. |
| `eight-banners` | T2 (qing) | qing | Military households and hereditary institutions under Qing. |
| `qing-population-growth` | T2 (qing) | qing | Population, settlement and pressure on land. |
| `canton-system` | T2 (qing) | qing | Regulation of European maritime trade at Guangzhou; distinct from Tang Guangzhou trade. |

### Republic additions

| Slug | Tier | From | Scope |
|---|---|---|---|
| `sun-yat-sen` | T1 (republic) | republic | Revolutionary organisation, provisional presidency and political programme. |
| `yuan-shikai` | T1 (republic) | republic | Military power, presidency and the failed restoration of monarchy. |
| `chiang-kai-shek` | T1 (republic) | republic | Nationalist leadership, state-building and war. |
| `northern-expedition` | T2 (republic) | republic | The Nationalist campaign of 1926–1928 and its divided coalition. |
| `new-culture-movement` | T2 (republic) | republic | Vernacular writing, intellectual debate and challenges to family authority; broader than the existing May Fourth event. |
| `republican-women` | T2 (republic) | republic | Education, work and changing legal rights under the republic. |
| `shanghai` | T2 (republic) | republic | The city's treaty-port institutions, industry and cultural life. |
| `ledo-road` | T3 (republic) | republic | The wartime supply route and the forces that opened it. |

## Orphans

Corpus records nothing links to (inbound count of zero from any other corpus record's `related` array, computed across all 221 records):

`catalog-F_XIA_1` (Yu the Great, legendary) · `catalog-G_ALEX` (Alexander the Great) · `catalog-G_ISLAM` (Muhammad's first revelation) · `catalog-R_ZHOU` (Zhou) · `catalog-S_MODERN` (Modern China) · `catalog-S_QH` (Qin and Han government) · `catalog-S_SONG` (Song and neighbouring empires) · `catalog-S_ST` (Sui and Tang) · `eastern-zhou` (Eastern Zhou) · `late-warring` (Late Warring States) · `qingming-scroll` (Along the River During Qingming) · `xia` (Xia) · `xin` (Xin)

13 of 221. Several of these are era/system-band records (`catalog-S_*`) that the timeline renderer may reach by mechanism other than `related` links, which would make this list partly a false positive; worth checking against the renderer before treating all 13 as real gaps.

## Dead ends

Corpus records with an empty `related` array (24 of 221):

`catalog-C_QIN` (Terracotta Army) · `catalog-E_3K_2` (Battle of Red Cliffs, now linked *from* `three-kingdoms` but still dead-ends itself) · `catalog-E_BUD_ENTRY` · `catalog-E_HAN_1` · `catalog-E_HAN_2` (Zhang Qian's first western mission) · `catalog-E_QIN_2` · `catalog-E_SHANG_2` · `catalog-E_XIA_1` · `catalog-F_SUN` (Sun Tzu) · `catalog-F_XIA_1` · `catalog-G_ALEX` · `catalog-R_ZHOU` · `huang-chao` · `huichang` · `late-warring` · `oracle` · `paper` · `talas` · `tang-end` · `two-tax` · `unification` · `xin` · `xuanwu-gate` · `xuanzang-return`

Several of these (`huang-chao`, `talas`, `xuanwu-gate`, `xuanzang-return`, `two-tax`, `huichang`, `tang-end`) are exactly the kind of Tang-era event cards that `tang.md` links to. When those get their own rewrite passes, giving them a `related` array back to `tang` and to whichever specific figures they involve should be a standard part of the work, not an afterthought. `huang-chao` and `tang-end` now also sit in `jiedushi.md`'s inline links, a second card pointing at each, which raises their priority for that rewrite pass.

`catalog-E_3K_2` is the highest-priority fix here specifically: it is now linked from two places (`three-kingdoms`, `catalog-R_HAN_E`) and still points nowhere. Minimum viable fix: add `three-kingdoms`, `catalog-R_WEI`, `cao-cao` and `guandu`.

## Asymmetries

The general pattern: most of the 221 records were auto-generated with thin, one-directional `related` arrays, so any card that gets a real linking pass will find far more outbound links than the cards it points to return. This is expected and will resolve gradually as more cards get rewritten. Flagging only the asymmetries worth deliberately fixing now:

- **`three-kingdoms` → `southward-economic-shift`, not reciprocated.** The highest-value gap. `three-kingdoms`'s closing argument is that Wu's colonisation of the south is the origin point of the later southward economic shift. `southward-economic-shift`'s own `related` array (`an-lushan`, `sui-grand-canal`, `tang`, `song`, `jingkang`) starts the story at the Tang. When `southward-economic-shift` next gets touched, add `three-kingdoms` and `catalog-R_WU`.
- **`division` ↔ `three-kingdoms`: resolved.** The research brief for `three-kingdoms` flagged this as one-directional (`division` linked to `three-kingdoms`, not the reverse). The card as now linked closes the loop (`[[division|division of China]]` appears in the closing section).
- **`an-lushan` → `great-clans`, `tang-song-transition`: worth double-checking once those cards exist.** `an-lushan.md` cites Nicolas Tackett's argument that the great clans survived 755–763 intact and were destroyed only after 880, which complicates the standard Tang-Song transition story that `tang.md` and this card both gesture at. Whoever writes `tang-song-transition` should reconcile both readings rather than defaulting to Naitō's.
- **`ming-journey-west` and `sanguo-yanyi`: no cross-reference yet.** The two great Ming-era novels, each built on centuries of oral and dramatic tradition, are natural peers. `ming-journey-west` already exists in the corpus and does not list `sanguo-yanyi` (which does not exist yet). Add the cross-link when `sanguo-yanyi` is written.
- **`tang` and `an-lushan` both gloss 节度使 in plain text with no link back, now that `jiedushi` exists.** Both cards were written before `jiedushi.md` and each already spells out "military governors (节度使 jiédùshǐ)" / "military commissioner (节度使 jiédùshǐ)" on first mention, satisfied the hanzi-and-pinyin rule, and moved on, since there was nothing to link to yet. That gap is now closed. The next time either card is touched, wrap that existing gloss as `[[jiedushi|...]]` rather than adding a second mention elsewhere; no prose change needed beyond the brackets.
- **`two-tax`'s empty `related` array is still open; `jiedushi.md` was a chance to add a second inbound link and did not, in either version of the card.** `two-tax` already gets one inbound link, from `tang.md` (`[[two-tax|new twice-yearly tax]]`), but the corpus record's own `related` array is still empty, so it does not link back to `tang` or anywhere else and stays on the Dead ends list below. The 780 twice-yearly tax is the fiscal counterpart to the office's growth, but the jiedushi card's fully-replaced body still never names the two-tax law by year or name: its fiscal material stays general ("Autonomous jiedushi stopped forwarding tax revenues to the central treasury in Chang'an. They levied their own taxes...") rather than tying to that specific 780 reform, so the relink pass left it unlinked rather than force a connection the prose does not make. Worth a deliberate look if `jiedushi.md` is revised again, and worth fixing on `two-tax`'s own end whenever that record gets its rewrite pass.

## Housekeeping notes, not fixed by any card edit

- `three-kingdoms`'s corpus record has a `ranges` field of `[[220, 266]]` (the Jin accession) while `start`/`end` and the card text both use 280 (Wu's surrender). This is a dataset decision for Wei, not something fixed in the card markdown.

## PRC additions (inbound 1)

| Slug | Tier | Wanted by | Scope |
|---|---|---|---|
| `deng-xiaoping` | T1 (prc) | prc | Deng’s political career and economic choices. |
| `danwei` | T2 (prc) | prc | Urban work units, welfare and political supervision. |
| `hukou` | T2 (prc) | prc | Modern residence registration and access to urban services. |
| `barefoot-doctors` | T2 (prc) | prc | Rural primary healthcare during the Mao period. |
| `sino-soviet-split` | T2 (prc) | prc | The collapse of the Communist alliance and China’s foreign relations. |
| `china-poverty-reduction` | T2 (prc) | prc | Post-1978 poverty reduction, mechanisms and measurement. |
| `shenzhen` | T3 (prc) | prc | Reform, migration and manufacturing in Shenzhen. |
| `gang-of-four` | T3 (prc) | prc | Radical leaders, their 1976 arrest and later trial. |
