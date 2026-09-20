/* Beginner-facing English revisions. Historical data stays in the source records. */
var BEGINNER_EARLY = (() => {
  const revisions = {};
  const add = (id, name, description, title1, text1, title2, text2, note) => {
    const entry = { description, sections: [{ title: title1, text: text1 }, { title: title2, text: text2 }] };
    if (name) entry.name = name;
    if (note !== undefined) entry.note = note;
    revisions[id] = entry;
  };
  revisions.xia = {
    annotateNames: false,
    description: 'The Xia Dynasty (夏朝 Xià Cháo), traditionally dated to about 2070–1600 BCE, is the first dynasty in the traditional account of Chinese history. No contemporary written records securely identify a Xia ruler or state. Much later works, chiefly the [[id:sima-qian|Records of the Grand Historian]] (《史记》 Shǐjì) by Sima Qian (司马迁 Sīmǎ Qiān) and the Bamboo Annals (《竹书纪年》 Zhúshū Jìnián), name 17 kings over 14 generations and tell how Xia rose and fell. Archaeology reveals a large Bronze Age centre at Erlitou (二里头 Èrlǐtóu) during part of this period, but whether Erlitou was Xia remains debated.',
    sections: [
      {
        title: 'Yu, succession and the fall of Xia',
        text: 'Traditional accounts place Xia in the Yellow River valley (黄河流域 Huáng Hé liúyù) of north-central China. In these stories, [[id:catalog-F_XIA_1|Yu the Great]] (大禹 Dà Yǔ) earns authority by controlling catastrophic floods. He then passes power to his son Qi (启 Qǐ), beginning hereditary succession. The final king, Jie of Xia (夏桀 Xià Jié), rules as a tyrant until Tang of Shang (商汤 Shāng Tāng) defeats him and founds the [[id:shang|Shang Dynasty]] (商朝 Shāng Cháo).\n\nThese accounts were written long after the period they describe. They preserve a tradition about the origins of hereditary rule and the replacement of one ruling house by another. They are not a contemporary record of events around 2000 BCE.'
      },
      {
        title: 'An early urban centre at Erlitou',
        text: 'The Erlitou Culture (二里头文化 Èrlǐtóu wénhuà) is named after a site in Henan (河南 Hénán) that was occupied from roughly 1900 to 1500 BCE. At its largest, the settlement covered about 300 hectares, or 3 square kilometres. Large building compounds, workshops and burials show that Erlitou was a major centre whose leaders could organize substantial labour and resources.\n\nIts foundry produced bronze vessels and weapons, while a separate workshop made turquoise-inlaid objects. Erlitou was one of the earliest major bronze-casting centres in the Central Plain (中原 Zhōngyuán). Farming supplied millet and rice, while pigs, cattle, sheep and hunting also supported the settlement.'
      },
      {
        title: 'Wealth, craft and hierarchy',
        text: 'Elite tombs contained bronze, jade and turquoise objects, while ordinary dwellings lacked comparable goods. This contrast points to a sharply unequal society. Skilled craftspeople worked in specialized workshops, but archaeologists still debate how directly Erlitou’s rulers controlled their production.\n\nThe large compounds and rich burials show concentrated wealth and organized labour. Neither a written bureaucracy nor a standing army is securely documented, so the surviving evidence cannot tell us exactly how Erlitou’s leaders governed.'
      },
      {
        title: 'Erlitou and the Xia question',
        text: 'Erlitou’s location and broad dates overlap with later accounts of Xia. This overlap has led some archaeologists to identify it as a Xia capital or political centre, but the match is not proof. No inscription from Erlitou names Xia, Yu, Qi, Jie or any other king in the traditional sequence.\n\nThe earliest undisputed Chinese writing comes from Shang oracle-bone inscriptions (甲骨文 Jiǎgǔwén) around 1200 BCE, several centuries after the traditional founding of Xia. Erlitou therefore gives us direct evidence for an early urban and stratified society, while the name Xia and its royal genealogy come from texts written much later. The two kinds of evidence may be connected, but that connection has not been proven.'
      },
      {
        title: 'Why the Xia story endured',
        text: 'Later accounts say Xia fell because Jie neglected government and oppressed his people, allowing Tang to replace him. Writers associated with the later [[id:catalog-R_ZHOU|Zhou Dynasty]] (周朝 Zhōu Cháo) used stories of virtuous founders and corrupt final rulers to explain why political authority could pass from one house to another. This pattern became closely tied to the [[id:western-zhou|Mandate of Heaven]] (天命 Tiānmìng), the argument that a ruling house could lose Heaven’s support through misconduct.\n\nWhether or not Xia existed as later texts describe it, the sequence of Xia, Shang and Zhou became the Three Dynasties (三代 Sāndài), a framework through which later historians described the beginnings of political order and dynastic succession.'
      }
    ],
    note: '2070–1600 BCE is a conventional, approximate chronology, not a securely documented sequence of reigns. Erlitou’s broader occupation, about 1900–1500 BCE, should not be collapsed into the traditional Xia date range, and Erlitou has not been proven to be Xia.'
  };
  revisions.shang = {
    annotateNames: false,
    description: 'The Shang (商朝 Shāng Cháo) was a Bronze Age royal dynasty centred in the Yellow River (黄河 Huáng Hé) valley of northern China. Its conventional dates are about 1600–1046 BCE, though the evidence is strongest for its later centuries. At Anyang (安阳 Ānyáng), royal tombs, bronze workshops and inscribed bones show a court that tied warfare, farming, craft production and communication with ancestors into one system of power.',
    sections: [
      {
        title: 'From later tradition to contemporary evidence',
        text: 'Later histories say Tang of Shang (商汤 Shāng Tāng) defeated the last ruler of [[id:xia|Xia]] (夏朝 Xià Cháo) and founded the Shang dynasty. These accounts were written long after the events, so they preserve a later tradition rather than a contemporary record of the conquest. Archaeological sites show that early Shang rulers could organize large settlements, walls, workshops and labour, but they do not confirm every king or date in the transmitted story. The evidence becomes much fuller at Yinxu (殷墟 Yīnxū) near modern Anyang, the dynasty’s last capital.'
      },
      {
        title: 'Kings, ancestors and royal decisions',
        text: 'Shang kings sought guidance from royal ancestors about harvests, weather, illness, warfare and other affairs. Divination made communication with the dead part of government: the same court that interpreted signs also directed soldiers, workers and valuable materials. Wu Ding (武丁 Wǔ Dīng), who probably ruled in the late thirteenth century BCE, is the earliest Shang king represented by a large body of writing from his own time. Radiocarbon modelling of selected oracle bones is consistent with this broad placement, but it does not establish exact years for his reign.'
      },
      {
        title: 'A general, consort and ritual leader',
        text: '[[id:fu-hao|Fu Hao]] (妇好 Fù Hǎo), one of Wu Ding’s consorts, appears in oracle inscriptions in connection with military campaigns and royal rituals. Her tomb, discovered intact at Yinxu in 1976, contained around 1.6 tonnes of bronze objects, about 6,900 cowry shells and numerous jades. Because the tomb had not been looted, its contents can be connected with a named woman known from contemporary writing. Together, the inscriptions and burial goods show that Fu Hao held an exceptional position at court and could exercise authority in both war and ritual.'
      },
      {
        title: 'Questions written on bone',
        text: 'Shang diviners applied heat to turtle shells and cattle shoulder blades, then interpreted the cracks. Inscriptions recorded the questions put to ancestors and, in some cases, what followed. This [[id:oracle|oracle-bone writing]] (甲骨文 Jiǎgǔwén) is the earliest securely attested Chinese writing and contains forms ancestral to later Chinese characters. The records bring us close to the concerns of the king and his diviners, but they are not a complete account of Shang society. Farmers, craft workers, captives and communities beyond the court appear mainly through archaeology or through the narrow viewpoint of royal records.'
      },
      {
        title: 'Bronze made power visible',
        text: 'Shang craftspeople used piece-mould casting to make ritual vessels. They formed sectional clay moulds around a core, then poured bronze into the space between them. The method produced vessels with complex shapes and decoration, including the animal-like mask now called the taotie (饕餮纹 tāotièwén). Making these objects required metal, fuel, skilled workers and organized workshops. The Houmuwu Ding (后母戊鼎 Hòumǔwù Dǐng), a rectangular ritual vessel weighing 832.84 kilograms, makes that command of labour and material visible. Used in offerings and feasts, such vessels displayed rank and connected living elites with their ancestors.'
      },
      {
        title: 'Work, rank and warfare',
        text: 'Most people supported an agricultural economy based on crops including millet and wheat. Above them stood royal and noble households that controlled land, labour, workshops and military expeditions; specialized artisans produced bronzes, weapons, chariot fittings and other elite goods. Human sacrifice at royal sites reveals the violence behind this order, especially toward captives and people with little power. Horse-drawn chariots also appear in late Shang warfare and elite burials. They were costly, limited vehicles associated with high-status warriors rather than evidence that every Shang army fought from chariots.'
      },
      {
        title: 'Anyang and the Zhou conquest',
        text: 'At Yinxu, palace foundations, royal tombs, roads, workshops and oracle bones preserve the clearest picture of the late Shang court. Shang rule ended conventionally in 1046 BCE, when Zhou forces defeated the last king at the [[id:catalog-E_SHANG_2|Battle of Muye]] (牧野之战 Mùyě zhī Zhàn). Zhou rulers explained their victory by arguing that Heaven could withdraw support from a ruling house that governed badly. This claim developed into the [[id:western-zhou|Mandate of Heaven]] (天命 Tiānmìng), which gave later rulers a language for defending conquest and judging political failure.'
      }
    ],
    note: 'About 1600–1046 BCE is the conventional chronology. The beginning of Shang rule and the traditional account of Tang overthrowing Xia are less securely documented than the late Shang court at Anyang. Radiocarbon modelling supports a broad late-thirteenth-century BCE setting for oracle bones associated with Wu Ding, not exact reign dates. The Battle of Muye is conventionally dated to 1046 BCE.'
  };
  revisions['western-zhou'] = {
    description: 'The Western Zhou took power around 1046 BCE, after King Wu of Zhou (周武王 Zhōu Wǔwáng) defeated the [[id:shang|Shang dynasty (商朝 Shāngcháo)]] at the [[id:catalog-E_SHANG_2|Battle of Muye (牧野之战 Mùyě zhī Zhàn)]]. Over the next 275 years, Zhou rulers built a network of kin and allies, developed the Mandate of Heaven, and spread their ritual and bronze culture across the Yellow River plain.',
    sections: [
      {
        title: 'From Shang to Zhou',
        text: 'The Shang ruled from their final capital at Yin (殷 Yīn) on the North China Plain. Their last king, Di Xin (帝辛 Dì Xīn), faced a coalition led by the Zhou, a western state based in the Wei River valley (渭河流域 Wèi Hé Liúyù). Victory at Muye gave the Zhou control, but conquest still needed a moral explanation. Zhou rulers claimed that Heaven entrusted power to virtuous kings and withdrew that trust when they failed. Known as the Mandate of Heaven (天命 Tiānmìng), this idea legitimized the fall of the Shang and became a lasting framework for explaining dynastic rise and collapse.'
      },
      {
        title: 'A network of kin and allies',
        text: 'Western Zhou rule operated through fengjian (封建 fēngjiàn), often translated as feudalism. The king granted land and titles to relatives, allies, and members of the former Shang elite. The late Warring States thinker Xunzi (荀子 Xúnzǐ) claimed that the early Zhou established 71 states, with 53 ruled by members of the royal Ji (姬 Jī) clan. These figures come from a much later account, rather than a surviving Western Zhou record. Regional lords owed the king military service, tribute, and ritual deference. In return, they governed their territories with considerable autonomy. Kinship and ritual held this network together more than a central bureaucracy did. The Duke of Zhou (周公 Zhōu Gōng) governed for the young King Cheng of Zhou (周成王 Zhōu Chéngwáng) and became a model of loyal service in later tradition. He established an eastern centre at Chengzhou (成周 Chéngzhōu), near modern Luoyang (洛阳 Luòyáng), to oversee former Shang lands. Haojing (镐京 Hàojīng), near modern Xi’an, remained the main royal seat. The two centres helped the Zhou court govern territories in both the Wei River valley and the North China Plain.'
      },
      {
        title: 'Ritual, bronze and writing',
        text: 'Ritual made rank and authority visible. The king performed sacrifices to Heaven and the royal ancestors, while regional lords conducted ceremonies suited to their status. Bronze vessels stood at the centre of ancestral rites. Their inscriptions recorded royal appointments, land grants, military campaigns, and legal disputes. These records provide direct evidence for Western Zhou history alongside later works such as the Book of Documents (尚书 Shàngshū) and the early layers of the Classic of Poetry (诗经 Shījīng). Zhou bronze inscriptions became longer than many Shang examples, sometimes reaching hundreds of characters. Vessels such as the Da Yu Ding (大盂鼎 Dà Yú Dǐng) and Mao Gong Ding (毛公鼎 Máo Gōng Dǐng) preserve accounts of appointments, gifts, victories, lineage, and royal favour. Later thinkers, including [[id:confucius|Confucius (孔子 Kǒngzǐ)]], looked back to Zhou ritual as a model for social and political order.'
      },
      {
        title: 'Military and administration',
        text: 'The Zhou king commanded royal armies based in the west and at Chengzhou. He appointed ministers and judges and sent officials to regional courts. Over time, ties between the royal house and its lords weakened. Regional rulers intermarried, fought one another, and enlarged their own territories as the royal domain contracted. Campaigns against northern peoples, including the Xianyun (猃狁 Xiǎnyǔn), placed further pressure on the court. In 841 BCE, King Li of Zhou (周厉王 Zhōu Lìwáng) was driven into exile during the crisis known as the [[id:zhou-gonghe|Gonghe period (共和 Gònghé)]]. The form of government that followed remains disputed. The Shiji (史记 Shǐjì) describes two nobles governing jointly, while the excavated Xinian (系年 Xìnián) presents an account centred on Gongbo He (共伯和 Gòngbó Hé). The year 841 BCE begins the conventional continuous chronology of Chinese history because traditional sources provide an unbroken sequence of annual dates from that point onward.'
      },
      {
        title: 'Collapse',
        text: 'Western Zhou rule ended in 771 BCE. [[id:zhou-capital-crisis|King You of Zhou (周幽王 Zhōu Yōuwáng)]] faced a coalition of disaffected lords and the Quanrong (犬戎 Quǎnróng), a northwestern group. The attackers sacked Haojing and killed the king. King You’s son, King Ping of Zhou (周平王 Zhōu Píngwáng), moved the royal court east to Chengzhou in 770 BCE. Historians use this move to mark the beginning of the [[id:eastern-zhou|Eastern Zhou (东周 Dōng Zhōu)]].'
      },
      {
        title: 'Legacy',
        text: 'Western Zhou institutions shaped later Chinese political thought. The Mandate of Heaven supplied a moral explanation for changes of rule, while fengjian influenced later ideas about the duties linking kings and regional lords. Bronze inscriptions and ritual practices also helped maintain a shared elite culture across the Yellow River region. Confucius later presented his work as the transmission of an inherited tradition and treated early Zhou culture as an important model.'
      },
      {
        title: 'A long dynasty and an early name',
        text: 'By the conventional dates assigned to its royal line, the Zhou dynasty lasted from around 1046 to 256 BCE, about 790 years. Under that method of dating, it is the longest-lasting Chinese dynasty. The term Zhongguo (中国 Zhōngguó) appears in Western Zhou bronze inscriptions, where it referred to a central territory or capital region within the Zhou world. Reading it as the name of the modern Chinese nation-state would be anachronistic.'
      }
    ],
    note: '1046 BCE is a widely used conquest date, but early Zhou chronology remains debated. “Feudal” is an imperfect comparison with medieval Europe. Western Zhou boundaries shifted, and the court often ruled indirectly through regional lords, so precise area and population estimates are not reliable.',
    annotateNames: false
  };
  revisions['eastern-zhou'] = {
    annotateNames: false,
    description: 'The Eastern Zhou began in 770 BCE when the Zhou court abandoned its western capital and moved east to Luoyang. Over the next 514 years, royal authority dissolved into competitive states, mass armies, and the Hundred Schools of Thought, a political and intellectual transformation that set the terms for imperial China.',
    sections: [
      {
        title: 'From Western Zhou to Eastern Zhou',
        text: 'Before Eastern Zhou began, [[id:western-zhou|Western Zhou]] (西周 Xī Zhōu) kings had ruled for nearly three centuries from the Wei River valley (渭河 Wèihé). In the traditional chronology, the lord of Shen and Quanrong (犬戎 Quǎnróng) forces [[id:zhou-capital-crisis|sacked Haojing]] (镐京 Hàojīng) in 771 BCE and killed King You (周幽王 Zhōu Yōuwáng). His successor, King Ping (周平王 Zhōu Píngwáng), moved the court east to Luoyang (洛阳 Luòyáng) in 770 BCE. This move gave the period its name.\n\nThe Zhou king’s royal domain contracted to a small territory around Luoyang. He retained ritual prestige and the Mandate of Heaven (天命 Tiānmìng), but regional rulers increasingly controlled their own armies, taxes and diplomacy. The king remained a respected source of titles and ceremony while practical power shifted to competing states.\n\nIn the Mediterranean, Rome became a republic after 509 BCE and Athens developed its own form of citizen government. The comparison places these regions in the same broad era. It does not imply direct contact or identical political change.'
      },
      {
        title: 'Spring and Autumn: hegemons and changing war',
        text: 'The first phase of Eastern Zhou is the [[id:catalog-SR_SA|Spring and Autumn period]] (春秋时期 Chūnqiū Shíqī). This atlas dates it 770–481 BCE; 476 or 475 BCE are other common endpoints. Its name comes from the Spring and Autumn Annals (《春秋》 Chūnqiū), a chronicle traditionally associated with [[id:confucius|Confucius]] (孔子 Kǒngzǐ). Many small polities existed at the period’s start. By its end, a much smaller group of powerful states dominated. Chariot-riding aristocrats still led much of the earlier warfare, and ritual rules shaped elite conduct. Ambition and violence often exceeded those ideals.\n\nBecause no state could command all the others, powerful rulers acted as hegemons. Traditional lists of the Five Hegemons (五霸 Wǔbà) differ, but Duke Huan of Qi (齐桓公 Qí Huángōng) and Duke Wen of Jin (晋文公 Jìn Wéngōng) appear most often. They convened alliances, defended the Zhou order and tried to enforce agreements among states. Their authority depended on coalitions rather than an imperial office. This arrangement kept Zhou ritual authority useful while regional rulers gathered more power.\n\nJin’s leading families divided its territory among Han (韩 Hán), Zhao (赵 Zhào) and Wei (魏 Wèi) in 453 BCE. The Zhou court formally recognized the three rulers in 403 BCE. These dates mark key transitions toward the [[id:catalog-SR_WS|Warring States period]], whose starting boundary varies between historical chronologies.'
      },
      {
        title: 'Warring States: mass warfare and stronger governments',
        text: 'The Warring States period (战国时期 Zhànguó Shíqī) ended in 221 BCE. Seven major powers dominated its later centuries: Qin (秦 Qín), Chu (楚 Chǔ), Qi (齐 Qí), Yan (燕 Yān), Han, Zhao and Wei. Smaller states also survived for part of the period.\n\nStates replaced many aristocratic levies with mass infantry armies drawn from registered households. Iron tools and weapons spread, crossbows became an important infantry weapon, and some northern states adopted cavalry. These forces depended on grain, labour, transport and officials who could organize them. At the Battle of Changping (长平之战 Chángpíng zhī Zhàn) in 260 BCE, Qin defeated Zhao. The Records of the Grand Historian (《史记》 Shǐjì) later claimed that Qin killed 400,000 surrendered Zhao soldiers. The figure is a transmitted claim and cannot be treated as a measured modern death toll. The account preserves the battle’s reputation for exceptional slaughter.\n\nRulers created bureaucracies staffed by appointed officials, registered households, collected taxes, issued legal rules and standardized measures. These changes differed between states and did not erase inherited privilege or local power. Qin went furthest through reforms associated with [[id:shang-yang|Shang Yang]] (商鞅 Shāng Yāng) from 356 BCE. They tied rank to farming and military service, organized households into mutual-responsibility groups and made the ruler’s commands easier to enforce. The later [[id:qin|Qin dynasty]] (秦朝 Qín Cháo) and [[id:han|Han dynasty]] (汉朝 Hàn Cháo) retained and adapted many practices developed during these centuries.\n\nEconomic output also grew. States expanded irrigation and brought more land under cultivation. Dujiangyan (都江堰 Dūjiāngyàn) in Sichuan (四川 Sìchuān) was begun around 256 BCE, then modified and enlarged over later centuries. It still controls floods and waters the Chengdu plain.'
      },
      {
        title: 'The Hundred Schools of Thought',
        text: 'Interstate competition and political turmoil produced an intense period of argument later called the Hundred Schools of Thought (百家争鸣 Bǎijiā Zhēngmíng). Thinkers moved between courts and offered rulers rival answers about violence, cooperation and good government. The school labels are useful guides, but they make a diverse intellectual world look tidier than it was.\n\n[[id:confucianism-daoism|Confucian thought]] (儒家 Rújiā) grew from teachings associated with Confucius and was developed by later thinkers including [[id:mencius|Mencius]] (孟子 Mèngzǐ) and [[id:xunzi|Xunzi]] (荀子 Xúnzǐ). It connected good government with cultivated character, ritual and humane conduct. Texts associated with [[id:laozi|Laozi]] (老子 Lǎozǐ) and [[id:zhuangzi|Zhuangzi]] (庄子 Zhuāngzǐ) later became central to Daoist traditions (道家 Dàojiā), which questioned forceful control and rigid distinctions. [[id:mozi|Mozi]] (墨子 Mòzǐ) argued for impartial care and against offensive war. Legalist thinkers (法家 Fǎjiā), including [[id:han-fei|Han Fei]] (韩非 Hán Fēi), argued that clear standards, rewards and punishments could order the state without relying on a ruler’s moral example. [[id:catalog-F_SUN|The Art of War]] (《孙子兵法》 Sūnzǐ Bīngfǎ), traditionally attributed to Sunzi (孙子 Sūnzǐ), examined strategy, information and the cost of prolonged conflict.\n\nThese thinkers lived in the same broad centuries as Socrates, Plato and Aristotle. Both regions produced influential traditions amid political fragmentation, although their institutions and arguments differed. In Qi, the Jixia patronage community (稷下学宫 Jìxià Xuégōng) brought intellectual clients from different traditions to one court. Historians often call it an academy. The evidence does not support treating it as a modern university.'
      },
      {
        title: 'The Zhou house ends',
        text: 'The Zhou royal house conventionally ended in 256 BCE, during the reign of King Nan (周赧王 Zhōu Nǎnwáng). The surviving accounts do not give a completely clear sequence for the final annexation of the royal territories. Warfare among the major states continued until the king of Qin, Ying Zheng (嬴政 Yíng Zhèng), [[id:unification|unified the rival states]] in 221 BCE and took the title Qin Shi Huang (秦始皇 Qín Shǐhuáng).\n\nEastern Zhou left institutions and arguments that later empires developed further. States had learned to command larger armies, register households, appoint officials and move resources across wider territories. Confucian, Mohist, Daoist and Legalist traditions all took shape amid these wars. The names Spring and Autumn and Warring States still organize how historians describe the period.'
      },
      {
        title: 'Did you know?',
        text: 'Eastern Zhou lasted 514 years. Its first phase takes its name from the Spring and Autumn Annals. The later term Warring States comes from the title Strategies of the Warring States (《战国策》 Zhànguó Cè), a text compiled after the period. Dujiangyan, begun near the Eastern Zhou’s conventional end, still waters the Chengdu plain today.'
      }
    ],
    note: '770–256 BCE dates the Eastern Zhou royal house. This atlas uses 770–481 BCE for Spring and Autumn and 481–221 BCE for Warring States; 476/475, 453 and 403 BCE are other boundaries used for the transition. Warring States politics continued after the Zhou royal house fell. Ancient casualty totals are transmitted claims, not precise modern counts.'
  };
  add('late-warring', null,
    'The Zhou royal family lost its rule in 256 BCE, but the rival kingdoms continued fighting. Qin defeated its remaining major rivals in 230–221 BCE. These years belong to the Warring States period; they are not a separate dynasty.',
    'Keeping armies supplied',
    'Qin needed more than able commanders to win repeated wars. Farming households supplied grain and workers; officials arranged transport and deliveries between regions. Documents excavated at Liye help reveal these networks. Behind military victories lay the daily work of offices that moved supplies and kept track of responsibilities. Without that work, armies could not keep campaigning.',
    'A victory that was not guaranteed',
    'The other kingdoms defended their own rulers and formed alliances to survive. Qin’s eventual victory can make their defeat seem inevitable, but they had different possible futures in view. Conquest ended their independent courts. It did not immediately erase regional customs, languages or loyalties. The new empire had to govern people whose lives had developed under separate states.',
    '256–221 BCE covers the years after the Zhou royal house fell. The full Warring States period began earlier, and Qin’s conquests involved several campaigns.');
  revisions.xin = {
    annotateNames: false,
    description: 'The Xin Dynasty (新朝 Xīn Cháo) was a short-lived imperial regime that lasted from 9 to 23 CE. Wang Mang (王莽 Wáng Mǎng) took the throne from the Liu imperial family and interrupted the [[id:han|Han Dynasty]], dividing it into the [[id:catalog-R_HAN_W|Western Han]] and [[id:catalog-R_HAN_E|Eastern Han]] periods. He tried to address landholding, debt and economic disorder through reforms based on classical models. Many of those reforms proved difficult to enforce, and the dynasty collapsed amid floods, famine and rebellion.',
    sections: [
      {
        title: 'The rise of Wang Mang',
        text: 'By the late first century BCE, the Western Han court was weakened by factional struggles, while powerful landowners accumulated large estates. Many peasants lost their land and became tenants, labourers or migrants. The Wang family had become the most influential clan at court through Empress Dowager Wang Zhengjun (王政君 Wáng Zhèngjūn).\n\nHer nephew Wang Mang (45 BCE–23 CE) built a reputation for austerity and Confucian virtue. After the death of the 14-year-old Emperor Ping (汉平帝 Hàn Píngdì) in 6 CE, the court selected Liu Ying, a young child from the imperial family, as heir. Wang Mang governed in the child’s name and declared himself acting emperor. In 9 CE, he took the throne and proclaimed the Xin, or “New,” Dynasty.'
      },
      {
        title: 'Radical reforms and their consequences',
        text: 'Wang Mang sought to model government on institutions described in texts associated with the [[id:catalog-R_ZHOU|Zhou Dynasty]] (周朝 Zhōu Cháo). Under his “King’s Fields” policy (王田 wángtián), privately held land was renamed, transfers were restricted, and land beyond prescribed limits was supposed to be redistributed to households with too little. Powerful landholders resisted the policy, officials could not enforce it consistently, and Wang Mang later rescinded the measures.\n\nHe also prohibited the sale of enslaved people and retainers, expanded state control through policies later grouped as the “Six Controls” (六筦 liù guǎn), and repeatedly changed the currency. The new monetary system included coins of many shapes and values alongside units based on silver, gold, tortoise shell and cowries. New issues replaced or competed with familiar Han coins, making trade and tax payments harder. Many people continued to use the old wuzhu coins (五铢钱 wǔzhū qián) despite government prohibitions.'
      },
      {
        title: 'Catastrophe and collapse',
        text: 'In 11 CE, the Yellow River (黄河 Huáng Hé) broke through its dikes and shifted course, flooding parts of the North China Plain. The disaster destroyed farmland, displaced communities, and worsened hunger and unrest. Rebellions grew in several regions, including movements later known as the Red Eyebrows (赤眉军 Chìméijūn) and Lulin (绿林军 Lùlínjūn).\n\nWang Mang’s armies failed to end the uprisings. In 23 CE, a coalition linked to the Lulin movement entered [[id:chang-an|Chang’an]] (长安 Cháng’ān) and killed Wang Mang. The Xin Dynasty collapsed. The Red Eyebrows remained a major force after his death and later took Chang’an during the struggle over the Han restoration.'
      },
      {
        title: 'Population records and their limits',
        text: 'A census in 2 CE registered about 59.6 million people. In 57 CE, the Eastern Han government registered about 21 million. These figures were recorded 55 years apart under different political and administrative conditions. War, famine, migration, lost records and weakened government registration all contributed to the difference. The figures show severe disruption, but they cannot be used to calculate how many people died during the Xin period.'
      },
      {
        title: 'Legacy and assessment',
        text: 'The Book of Han (《汉书》 Hànshū) shaped the traditional account of Wang Mang as a usurper. Ban Biao began the historical project, his son Ban Gu (班固 Bān Gù) developed it into a history of the Western Han, and Ban Gu’s sister [[id:ban-zhao|Ban Zhao]] (班昭 Bān Zhāo) completed unfinished portions after his death. Because the restored Eastern Han claimed continuity with the Liu imperial family, its official history treated the Xin as an interruption rather than a legitimate successor.\n\nLater historians have taken Wang Mang’s reform programme more seriously. Land concentration, debt and rural displacement were real problems. His policies attempted to address them through institutions drawn from classical texts, but resistance, weak implementation, repeated policy changes, natural disasters and rebellion overwhelmed the regime. Some of his most ambitious measures were withdrawn before the dynasty fell.'
      },
      {
        title: 'Did you know?',
        text: 'Wang Mang introduced an unusually wide range of currencies. His systems assigned value to gold, silver, tortoise shell, cowries and copper coins in several shapes and denominations. Many people still preferred the familiar Han wuzhu coin, and the government repeatedly tried to stop its use.'
      }
    ],
    note: '9–23 CE dates the Xin regime. The scale and implementation of individual reforms remain debated. The population figures are registration totals recorded in 2 and 57 CE, not a measured death toll for the Xin period. Later Han histories were written within the dynasty that supplanted Wang Mang.'
  };
  add('division', 'Age of Division',
    'Between Han and Sui, rival courts ruled different parts of China. Wars drove migration, while powerful families and religious communities carried practices and learning across borders. The Age of Division is a name for this period of several competing governments.',
    'Government continued across the divide',
    'Successor states employed officials and kept methods inherited from earlier rulers. Their kings and emperors argued over who deserved to rule the empire. Even when no court controlled it all, the idea of imperial rule remained powerful. Political borders did not bring all learning, trade or government work to a halt.',
    'New regional centres',
    'Migration helped reshape society around the lower Yangtze River. In the north, courts maintained military and religious ties with Inner Asia. These regions developed their own centres of power and culture. People living through these changes did not know that a future dynasty would reunite much of the country. Their choices involved the rival courts and opportunities of their own time.');
  add('sixteen', null,
    'The Sixteen Kingdoms were competing northern states of the fourth and early fifth centuries. Their rulers drew on mixed armies and shifting alliances within former Jin territories. Older accounts use the derogatory label “Five Barbarians” for Xiongnu, Jie, Xianbei, Di and Qiang groups. These were not five united peoples carrying out one invasion.',
    'How rulers built support',
    'Founders from different communities adopted imperial titles, recruited officials and governed mixed populations. Their family origins alone cannot explain how their states worked. Alliances among commanders, inherited methods of government and support for religious communities helped rulers gather authority. Loyalties could shift as courts rose and fell.',
    'How historians count the Sixteen Kingdoms',
    'Later historians selected sixteen regimes to organize a much more crowded history. The name does not mean sixteen governments all existed at once, and other significant states can also be counted. Looking at individual courts reveals different choices about governing and survival. The period included more than warfare: officials and communities continued building institutions even while rulers competed.');
  add('north-south', 'Northern and Southern Dynasties',
    'From 420, successive southern dynasties ruled alongside courts in the north. Both regions developed centres of government and culture. Migration, diplomacy and war connected them, even while rulers competed for territory and the right to govern.',
    'The southern courts',
    'Courts at Jiankang relied on military commanders, powerful families and the resources of the Yangtze region. Their history includes struggles at home as well as efforts to conquer the north. Their government and culture developed under these local conditions. Measuring them only by whether they reunited China would miss much of what people built and contested in the south.',
    'Experiments in northern government',
    'Northern rulers tried different ways to register households, distribute land and organize troops. They also supported religious communities. Some of these practices influenced later dynasties, but no single plan directed them toward Sui reunification. Different courts were trying to solve the immediate problem of ruling diverse populations after earlier empires had broken apart.');
  add('oracle', null,
    'Late Shang diviners heated prepared animal bones or the lower shells of turtles, then interpreted the cracks as signs. Inscriptions could record a question, prediction and sometimes what happened. Especially at Anyang, these objects preserve the earliest large body of securely documented Chinese writing.',
    'What worried a king',
    'Harvests, childbirth, weather and warfare appear alongside offerings to ancestors. Royal decisions involved both practical action and beliefs about ancestral powers. Repeated forms in the writing show that trained people prepared and kept these records. They give us unusually close contact with questions asked at the court.',
    'Writing already had a past',
    'A dated inscription shows that writing existed by then; it cannot tell us when writing began. Other materials survive less well, and the complicated script suggests earlier development that is hard to trace. These records also preserve a royal viewpoint. They cannot tell us everything ordinary people said or cared about, and many characters remain difficult to read.');
  add('confucius', 'Confucius',
    'Confucius, traditionally dated 551–479 BCE, taught while Zhou kings lost power and noble families fought for influence. Teachings associated with him connect good government with learning, character and proper conduct. The Analects gathered these teachings across generations; it is not a word-for-word record made by the teacher himself.',
    'Learning how to behave',
    'Ritual meant more than performing a ceremony correctly. Conduct needed judgment and care for others, and repeated practice could help people develop those habits. Education therefore mattered to government. A ruler should first learn to control his own behaviour. Those serving him also had a duty to offer advice and, at times, criticism.',
    'Many later interpretations',
    'Later followers drew different lessons from these teachings, including personal improvement, family duties and the responsibility to challenge rulers. Imperial support gave some interpretations greater authority. The long history of Confucianism contains disagreements as well as shared texts. Later social hierarchies cannot all be treated as the direct wishes of one man.',
    '551 BCE is the traditional birth date. The Analects contains different layers of writing, and the exact attribution of individual sayings remains debated.');
  add('unification', 'Qin unification',
    'Qin’s conquest of Qi in 221 BCE completed its defeat of six major rival kingdoms. Ying Zheng took the title First Emperor. The conquered communities already had their own officials, customs and institutions. Qin now had to bring them under one ruler.',
    'After the armies won',
    'Qin extended its standards and appointed officials across the conquered territories. Local staff still had to register households, move supplies and interpret instructions. Defeating rival armies and governing their people were different tasks. The empire depended on directing existing networks of offices and workers toward the new emperor.',
    'Keeping the empire together',
    'The title First Emperor announced an authority intended to last. After his death in 210 BCE, struggles over succession exposed how fragile the government could be. Han later rebuilt a united empire using methods inherited from Qin. The conquest of 221 BCE established a model that later rulers would return to, even though Qin’s own ruling family could not preserve it.');
  add('paper', null,
    'Cai Lun, a court official, is traditionally credited with presenting an improved papermaking process in 105 CE. The account names bark, hemp waste, rags and fishing nets among the materials. Older paper has been excavated, so his achievement was an improvement recognized at court, rather than the first invention of paper.',
    'A more convenient writing material',
    'Paper could be lighter than bamboo or wooden writing strips and cheaper than silk. It offered new possibilities for copying texts and sending letters, and later for printing. Older materials did not disappear immediately. Writers needed a reliable supply of usable paper, which depended on skilled workers as well as a recipe.',
    'The workers behind the name',
    'Cai Lun’s court connection helped preserve his name in written history. The many craftspeople who developed paper are harder to identify. Paper spread through repeated improvements and exchanges between people. Its movement westward cannot be fully explained by one inventor or one famous battle. Different places adopted it for different uses over time.');
  add('catalog-E_XIA_1', null,
    'Later tradition describes Yu founding Xia as the beginning of dynastic rule. The familiar date of 2070 BCE comes from a reconstructed chronology. No contemporary document confirms a foundation in that year, so this event belongs to a tradition whose details remain uncertain.',
    'Earning the right to rule',
    'In the story, Yu restores a habitable world after terrible flooding. His service to people gives him the right to govern. Power then passes to his son, introducing rule by a hereditary family. Later thinkers could use this tension to ask a lasting question: should a ruler choose the most capable successor, or should the office stay in the family?',
    'Searching for traces',
    'Excavated settlements, elite buildings and evidence of ancient floods can help reconstruct the world in which these stories developed. They cannot establish that a named hero founded a dynasty in a particular year. Connecting a flood deposit, a settlement and a much later account requires evidence for each connection. Xia’s archaeological identity remains unsettled.');
  add('catalog-F_XIA_1', null,
    'Yu the Great is a legendary hero remembered for controlling a catastrophic flood and bringing order to the land. Later traditions place him before or at the founding of Xia. His position in this early period does not give us a verified birth date.',
    'A ruler working with water',
    'Stories describe Yu channelling rivers and opening passages. He earns authority through practical work for a wider community. Later rulers could draw on this example when explaining their own water projects and duties. If managing water was part of a ruler’s responsibility, failure could also become a judgment on his government.',
    'The limits of the evidence',
    'Different accounts of Yu were assembled long after the events they describe. Geological evidence can identify ancient floods, but cannot name the person who responded to them. Yu’s identity and lifetime remain uncertain. His influence on later political and religious life is much easier to trace: generations used his story to think about service, leadership and the difficult relationship between people and water.',
    'Yu is legendary; no verified dates are known. His identity and connection with particular floods are not securely established.');
  add('catalog-E_SHANG_2', null,
    'King Wu’s defeat of Shang became the founding victory of Zhou. Bronze inscriptions and later books preserve memories of the conquest, although its exact date remains disputed. Rebellion and further campaigns, associated with the Duke of Zhou, followed the first victory.',
    'Building a new ruling order',
    'Zhou rulers had to reward allies and decide how to deal with the people who had served Shang. They kept some Shang ceremonies and drew on useful specialists. Changing the ruling family did not erase everything the old court had built. The new dynasty needed relationships and places of authority that could survive beyond the battlefield.',
    'Why Heaven could change sides',
    'Later accounts explain Shang’s defeat by saying its rulers lost virtue and Heaven’s favour passed to Zhou. This made rebellion against a king acceptable when he no longer deserved to govern. The same argument could later be turned against other rulers. The conquest became both an event in political history and a story through which generations debated the duties of government.');
  add('catalog-R_ZHOU', null,
    'Zhou began with a royal network built after the conquest of Shang. Over nearly eight centuries, it changed into a world of competing kingdoms around a weakened king. Western and Eastern Zhou name two phases of the royal house, whose power and circumstances changed greatly.',
    'A respected title, less control',
    'As the king’s reach shrank, Zhou titles, ceremonies and ancestors still carried weight. Powerful regional rulers could seek recognition from a court that could no longer reliably command their armies. Respect for the royal house helped shape relationships even after much of its practical power had passed elsewhere.',
    'An example for later teachers',
    'Later thinkers described Zhou as a model of good government. They used its poems, rituals and stories to answer problems in their own time. Different teachers selected different lessons, so the Zhou past was continually interpreted. What later generations called the Zhou ideal was shaped by those arguments as well as by the institutions of the early dynasty.');
  revisions['catalog-SR_SA'] = {
    name: 'Spring and Autumn Period',
    annotateNames: false,
    description: 'The Spring and Autumn period (春秋时期 Chūnqiū Shíqī) was nearly three centuries of rivalry among states, dated here to 770–481 BCE. The Zhou king remained a source of titles and ritual prestige, but regional rulers controlled armies, revenue and diplomacy. Their competition reshaped government, warfare, trade and intellectual life before the [[id:catalog-SR_WS|Warring States period]].',
    sections: [
      {
        title: 'The collapse of Western Zhou',
        text: 'The crisis began in the final year of [[id:western-zhou|Western Zhou]] (\u897f\u5468 Xī Zhōu). In 771 BCE, a coalition that included the lord of Shen (\u7533\u4faf Shēn Hóu) and Quanrong forces (\u72ac\u620e Quǎnróng) [[id:zhou-capital-crisis|sacked Haojing]] (\u9550\u4eac Hàojīng) and killed King You of Zhou (\u5468\u5e7d\u738b Zhōu Yōuwáng). In 770 BCE, King Ping of Zhou (\u5468\u5e73\u738b Zhōu Píngwáng) moved the court east to Luoyang (\u6d1b\u9633 Luòyáng), beginning the [[id:eastern-zhou|Eastern Zhou dynasty]] (\u4e1c\u5468 Dōng Zhōu). The king retained ceremonial authority, but he could no longer command the strongest regional lords.\n\nThe [[id:catalog-R_ZHOU|Zhou political order]] had linked the royal house to hereditary lords through land, kinship, military service and ritual obligations. This system is often called fengjian (\u5c01\u5efa fēngjiàn) and compared with European feudalism, although the two were not identical. As family ties weakened and states pursued their own interests, competition increasingly centered on the stronger powers.'
      },
      {
        title: 'Hegemons and great powers',
        text: 'Without a strong king, leading rulers tried to organize interstate order as hegemons, or ba (\u9738 bà). A hegemon could convene meetings, lead coalitions and enforce agreements while claiming to act in the Zhou king’s name. The strongest states included Qi (\u9f50 Qí), Jin (\u664b Jìn), Chu (\u695a Chǔ), [[id:qin|Qin]] (\u79e6 Qín), and later Wu (\u5434 Wú) and Yue (\u8d8a Yuè).\n\nDuke Huan of Qi (\u9f50\u6853\u516c Qí Huángōng), who ruled from 685 to 643 BCE, became the first ruler widely remembered as a hegemon. His adviser Guan Zhong (\u7ba1\u4ef2 Guǎn Zhòng) helped strengthen Qi’s government and economy. At the Battle of Chengpu (\u57ce\u6fee\u4e4b\u6218 Chéngpú zhī Zhàn) in 632 BCE, Jin defeated Chu and its allies. Jin then dominated much of the Central Plains (\u4e2d\u539f Zhōngyuán), although no victory created a unified empire.'
      },
      {
        title: 'Iron, farming and commerce',
        text: 'Bronze remained important for weapons, vessels and ceremony, while iron appeared toward the end of the period. New tools could help farmers work more land, but their adoption differed by region and continued into the Warring States era. States that drew more grain, labour and soldiers from their territories gained an advantage over rivals.\n\nAccounts of reforms attributed to Guan Zhong describe efforts to increase agricultural production and commerce in Qi. These stories show how later writers connected wealth with state power, but they do not prove that markets or merchants first appeared at this moment. Transmitted accounts also say that Jin cast penal laws on a bronze vessel in 513 BCE. Making rules visible in metal challenged the idea that aristocrats alone should control knowledge of the law.'
      },
      {
        title: 'Ideas in a divided world',
        text: 'Political disorder created an audience for arguments about good government, ritual and war. [[id:confucius|Confucius]] (\u5b54\u5b50 Kǒngzǐ), who lived from 551 to 479 BCE, travelled between states and taught students. Later followers compiled conversations associated with him in the Analects (\u300a\u8bba\u8bed\u300b Lúnyǔ). Later tradition credited Confucius with 3,000 students. The figure conveys the scale of his later reputation and cannot be independently verified.\n\nThe Daodejing (\u300a\u9053\u5fb7\u7ecf\u300b Dàodéjīng), associated with [[id:laozi|Laozi]] (\u8001\u5b50 Lǎozǐ), explores the Dao (\u9053 Dào), restraint and change. Both the book’s formation and Laozi’s identity are debated. The Art of War (\u300a\u5b59\u5b50\u5175\u6cd5\u300b Sūnzǐ Bīngfǎ), attributed to [[id:catalog-F_SUN|Sun Tzu]] (\u5b59\u5b50 Sūnzǐ), organizes strategy around information, advantage and cost. Its thirteen chapters circulated early, but the traditional author and date remain uncertain.\n\nThe Zuo Zhuan (\u300a\u5de6\u4f20\u300b Zuǒzhuàn) is the fullest narrative source for the period. Its speeches reveal later historical and moral interpretation as well as remembered events. Poems collected in the Classic of Poetry (\u300a\u8bd7\u7ecf\u300b Shījīng) preserve voices from the wider Zhou world, although the collection reached its received form over time.'
      },
      {
        title: 'A world in perspective',
        text: 'The Greek city-states and early Roman Republic developed during the same broad centuries. Historians also compare the Spring and Autumn states with early modern Europe because both political worlds used warfare, alliances and shifting balances of power. The comparison can sharpen questions about competition between states. It does not imply direct contact or identical institutions.\n\nThe Chinese states shared Zhou ritual traditions and a related written culture even while they fought. Covenants, marriages, diplomatic visits and ceremonies established rank and obligations alongside warfare. The period therefore combined political fragmentation with cultural practices that crossed borders.'
      },
      {
        title: 'Did you know?',
        text: 'The Bai Hu Tong (\u300a\u767d\u864e\u901a\u300b Báihǔtōng), a Han ritual compendium, glosses the hegemon’s title ba with bo (\u4f2f bó). It describes a hegemon convening the regional lords while still paying homage to the Son of Heaven. This later explanation presents hegemony as powerful leadership exercised within the Zhou order.'
      }
    ],
    note: 'This atlas uses 770–481 BCE, beginning with the Zhou court’s eastward move. Other chronologies begin in 771 BCE and end in 476 or 475 BCE. These boundaries organize a gradual transition; they do not mark one moment when every state changed. This card treats traditional student totals, speeches and author attributions as later claims when independent verification is unavailable.'
  };
  revisions['catalog-SR_WS'] = {
    name: 'Warring States Period',
    annotateNames: false,
    description: 'The Warring States period (战国 Zhànguó) was an era of interstate warfare that ended in 221 BCE. This atlas dates it 481–221 BCE; 475 and 403 BCE are other common starting points. Warfare and government changed together as rulers fielded larger infantry armies, used iron tools and weapons, and built more direct systems of taxation, registration and command. The [[id:catalog-R_ZHOU|Zhou royal house]] (周朝 Zhōu Cháo) fell in 256 BCE, before [[id:qin|Qin]] (秦 Qín) defeated its remaining rivals and founded China’s first unified empire. In the same centuries, the Mediterranean passed from classical Greece into the Hellenistic kingdoms. The comparison places two regions in the same era without implying direct contact or identical development.',
    sections: [
      {
        title: 'Collapse of the Zhou order',
        text: 'Zhou rulers had governed through a network of hereditary regional lords, an arrangement often compared with feudalism but not identical to its medieval European forms. Lords held land and owed military and ritual service to the king. The Mandate of Heaven (天命 Tiānmìng) connected a ruler’s conduct with his right to rule.\n\nAn attack involving the lord of Shen and Quanrong forces killed King You in 771 BCE. The court’s move east in 770 began [[id:eastern-zhou|Eastern Zhou]] (东周 Dōng Zhōu), but royal authority weakened as regional rulers controlled their own armies, taxes and diplomacy. Chu had claimed the title wang (王 wáng), or king, much earlier; most other major rulers adopted it during the fourth century BCE. The title announced that they no longer accepted the Zhou king as their political superior.'
      },
      {
        title: 'Seven major states',
        text: 'By about 350 BCE, seven powers dominated the political map: Qin (秦 Qín) in the west, Chu (楚 Chǔ) in the south, Qi (齐 Qí) in the east, Yan (燕 Yān) in the north, and Zhao (赵 Zhào), Wei (魏 Wèi) and Han (韩 Hán) across the central plain. They were the strongest rivals, not the only surviving states.\n\nQin’s territory in modern Shaanxi was protected by mountain passes. Eastern courts sometimes treated its people as outsiders, while Qin’s rulers developed a highly militarized state. Chu controlled the largest area, extending through the Yangtze valley and sustaining distinctive southern traditions. Qi prospered through trade and salt production on the Shandong Peninsula and supported the Jixia intellectual community. Yan held a northern frontier around modern Beijing and faced pressure from neighbouring steppe peoples. Zhao adopted cavalry methods from northern nomads. Wei was initially the strongest of the three states formed from Jin, but repeated wars weakened it. Han was the smallest of the seven and controlled routes between Qin and the central plain, leaving it exposed to attack.\n\nSmaller states such as Song and Zhongshan survived for part of the period before stronger neighbours absorbed them.'
      },
      {
        title: 'Military revolution',
        text: 'War increasingly moved away from contests led by chariot-riding aristocrats toward campaigns fought by mass infantry armies. Iron tools could increase agricultural output, while iron weapons supplemented rather than immediately replaced bronze. States drew soldiers, grain and labour from registered farming households.\n\nThe crossbow became a major infantry weapon. Its mechanical trigger allowed states to equip soldiers with a powerful weapon that required different training from the traditional bow. Zhao’s King Wuling ordered troops to adopt northern dress and mounted archery in 307 BCE, making cavalry part of a deliberate military reform. States also built long frontier walls; after unification, Qin joined and extended some earlier fortifications, part of the much longer history explored in [[id:qin-great-wall|Qin’s northern walls]].\n\nTransmitted histories give enormous army totals, including 600,000 men in Qin’s campaign against Chu. Modern scholarship treats that figure as anecdotal and possibly exaggerated. Even with that caution, the records and excavated administrative documents show rulers mobilizing people and supplies on a scale that demanded new systems of government.'
      },
      {
        title: 'Bureaucratic revolution',
        text: 'The scale and frequency of war pushed rulers to govern territory more directly. Appointed officials increasingly worked alongside or replaced hereditary lords. States registered households, collected taxes in grain, issued legal rules and tied rank to service. These changes differed between states and did not erase inherited privilege or local power.\n\nQin carried these methods furthest through reforms associated with [[id:shang-yang|Shang Yang]] (商鞅 Shāng Yāng) from 356 BCE. The reforms organized households into mutual-responsibility groups, rewarded farming and military achievement, and used strict punishments to enforce the ruler’s commands. Traditional accounts describe promotion through enemy heads taken in battle. Shang Yang was executed in 338 BCE after losing political protection, but several reforms survived him. They allowed Qin to extract soldiers, grain and labour more reliably than its rivals.'
      },
      {
        title: 'Hundred Schools of Thought',
        text: 'Political instability produced an intense period of argument later called the Hundred Schools of Thought (百家争鸣 Bǎijiā Zhēngmíng). Thinkers moved between courts and offered rival answers to violence, cooperation and good government. The later school labels are useful guides, but they can make a diverse intellectual world look more orderly than it was.\n\n[[id:confucianism-daoism|Confucian thought]] (儒家 Rújiā) grew from the teachings associated with [[id:confucius|Confucius]] (孔子 Kǒngzǐ), who died near the beginning of the period, and was developed by later thinkers including [[id:mencius|Mencius]] (孟子 Mèngzǐ). It stressed cultivated conduct, ritual and humane government. Texts associated with [[id:laozi|Laozi]] (老子 Lǎozǐ) and [[id:zhuangzi|Zhuangzi]] (庄子 Zhuāngzǐ) later became central to [[id:confucianism-daoism|Daoist traditions]] (道家 Dàojiā), questioning forceful control and rigid distinctions. Legalist thinkers (法家 Fǎjiā) argued that clear standards, rewards and punishments could order the state without relying on a ruler’s moral example.\n\nAt the Jixia patronage community (稷下学宫 Jìxià Xuégōng) in Qi, rulers supported intellectual clients from different traditions. It is often called an academy, but the evidence does not justify treating it as a modern university or claiming a precise enrolment.'
      },
      {
        title: 'Qin unification',
        text: 'By the late third century BCE, Qin’s protected position, agricultural base and administrative reach gave it a lasting advantage. At the Battle of Changping (长平之战 Chángpíng zhī Zhàn) in 260 BCE, Qin defeated Zhao. Transmitted histories claim that 400,000 surrendered Zhao soldiers were killed. The number cannot be treated as a measured modern death toll, but the account preserves the battle’s reputation for exceptional slaughter.\n\nYing Zheng (嬴政 Yíng Zhèng), king of Qin, conquered the remaining states one by one: Han in 230 BCE, Zhao in 228, Wei in 225, Chu in 223, the last Yan territory in 222, and Qi in 221. With Qi’s fall, the Warring States period ended. Ying Zheng declared himself Qin Shi Huang (秦始皇 Qín Shǐhuáng), the First Emperor. [[id:unification|Qin unification]] replaced the competing royal courts with commanderies governed by appointed officials. Qin’s ruling house fell within fifteen years, but later dynasties retained and adapted much of the imperial framework.'
      },
      {
        title: 'The game of Go',
        text: 'The board game Go, called Weiqi (围棋 Wéiqí) in Chinese, appears in written records from the fourth century BCE. Players place stones to surround positions and control territory.'
      },
      {
        title: 'Cultural references',
        text: '[[id:catalog-F_SUN|The Art of War]] (孙子兵法 Sūnzǐ Bīngfǎ), traditionally attributed to Sunzi (孙子 Sūnzǐ), is an early military text. Its traditional author and precise formation remain debated. The Li Sao (离骚 Lí Sāo), traditionally attributed to Qu Yuan (屈原 Qū Yuán), belongs to the Chu poetic tradition. Qu Yuan’s biography and the poem’s exact composition date remain uncertain.'
      }
    ],
    note: 'The exhibition retains its source catalogue’s 481 BCE start. The supplied account used the common 475 BCE boundary; 403 BCE is another convention. Eastern Zhou lasted until the Zhou royal house fell in 256 BCE, while warfare among the major states continued until Qin’s victory in 221 BCE. Ancient troop and casualty totals are transmitted claims, not precise modern counts.'
  };
  add('catalog-F_SUN', null,
    'The Art of War, attributed to Sunzi, examines how information, preparation and advantage affect warfare. Its thirteen chapters consider when to fight and how to conserve resources. The text and its later influence are better documented than the life of its traditional author, Sun Wu.',
    'Winning without wasting strength',
    'A long campaign or costly siege could weaken a ruler even if his army won. Intelligence and deception offered ways to act with less risk. The text treats restraint as a practical military choice. It accepts warfare while asking commanders to avoid unnecessary losses and expense.',
    'A text people argued with',
    'Other early thinkers, including Xunzi, questioned deception on moral and practical grounds. Ancient Chinese writers did not all share one view of strategy. Modern adaptations sometimes turn sayings from the Art of War into business advice. Its advice addressed rulers and armies facing supply limits, uncertainty and the cost of war.');
  add('catalog-G_ALEX', null,
    'Alexander the Great (356–323 BCE) conquered the Achaemenid Persian Empire and led Macedonian armies into Central Asia and northwestern South Asia. He lived during China’s Warring States period, but his campaigns did not reach China.',
    'After Alexander’s death',
    'When he died in 323 BCE, his commanders fought over his empire and founded successor kingdoms. Those later societies helped develop Hellenistic culture through their cities, royal support and exchanges with regional traditions. The empire broke apart, but the movement of artistic ideas and practices continued under its successors.',
    'Two histories in the same century',
    'Alexander and Warring States rulers faced some similar problems: feeding armies, securing support from powerful people and governing conquered populations. Similarities make comparison useful, but do not prove contact or influence. Connections between the Mediterranean, Central Asia and China grew through many later intermediaries. Placing Alexander here helps locate Chinese history within a wider world without suggesting that every contemporary event was directly connected.');
  add('catalog-S_QH', 'Qin and Han government',
    'Qin created an empire in 221 BCE. After civil war, Han rulers rebuilt it and adapted many Qin methods. Looking at the two dynasties together shows how government practices could survive a change of ruling family, even when policies and circumstances changed.',
    'The daily work of empire',
    'Officials registered households, kept legal records and arranged the movement of goods. At the local level, they turned imperial commands into decisions about taxes, compulsory service and disputes. The emperor held the highest authority, but needed these offices and their staff to reach ordinary families. Surviving documents show how much imperial rule relied on routine work.',
    'An ambition later rulers inherited',
    'Later dynasties repeatedly sought to govern one empire, even after periods of division. Qin and Han offered examples of how such rule might work. Their methods were adapted to changing military needs, tax income and society. The persistence of that ambition did not mean uninterrupted unity: rival states could all claim a right to the same imperial inheritance.');
  add('catalog-R_HAN_W', null,
    'Western Han combined districts governed by appointed officials with kingdoms held by royal relatives. Emperor Wu, who reigned 141–87 BCE, expanded campaigns against the Xiongnu and sent diplomatic missions west. These commitments helped connections later called the Silk Roads grow, while increasing the costs of government.',
    'Keeping powerful allies in check',
    'Giving supporters kingdoms helped the early rulers secure their position. Those kingdoms could later threaten the court. After the rebellion of seven kingdoms in 154 BCE, the emperor further reduced their independence. Arrangements that had rewarded allies after conquest became problems for later rulers seeking firmer control.',
    'Taxes, monopolies, and the cost of expansion',
    'Emperor Wu’s armies and frontier activity required continuing supplies and money. Government monopolies and other ways of raising revenue provoked disagreement. Support for classical learning accompanied these policies without replacing law or military force. Critics could object to the burden on households while still supporting imperial government. Debate about good rule included the practical question of what people should have to pay.',
    '206 BCE–9 CE is the conventional range used here. Liu Bang became emperor in 202 BCE. Institutions and territorial reach changed substantially during Western Han.');
  add('catalog-R_HAN_E', null,
    'Liu Xiu proclaimed a restoration of Han in 25 CE and ruled from Luoyang. Civil war had changed alliances and local power, so bringing back the Han name did not restore everything that had existed before. The dynasty lasted until 220 CE, with commanders increasingly controlling its final decades.',
    'Rival groups at the imperial court',
    'Imperial relatives, empresses’ families, eunuchs and officials competed for access to the ruler. Appointments linked palace struggles to supporters and resources outside it. Powerful local families supplied knowledge and influence that the court needed, but could not always control. These relationships affected how government worked far beyond the palace.',
    'Life beyond the final wars',
    'The dynasty’s collapse can overshadow two centuries of writing, skilled production and contact between regions. Ban Zhao’s historical work and Zhang Heng’s technical inquiries belong to this longer history. The final breakdown raises a separate question: how did the court lose its ability to manage succession, armed commanders and competing interests? Earlier achievements did not vanish because that political order eventually failed.');
  add('catalog-E_QIN_2', 'Qin weights and measures',
    'In 221 BCE, the First Emperor ordered common weights and measures across the new empire. Standard weights carrying the decree survive. They show one practical part of Qin’s wider effort to bring conquered territories under a common government.',
    'Agreeing on an amount',
    'Officials and traders needed to know whether two quantities were equivalent. A government standard could reduce uncertainty in trade and tax collection. The inscription on a weight also announced imperial authority. An everyday transaction could therefore put the emperor’s rule into practice far from the court.',
    'An order still needed people to follow it',
    'A decree cannot prove that every district immediately used the same measures. Qin records show local offices handling transfers and keeping accounts within a larger system. Standards had to reach those offices and be used in daily work. The same caution applies to official writing: common written forms did not make everyone speak alike. Unification involved continuing work across a varied population.');
  add('catalog-E_HAN_1', null,
    'In 136 BCE, Emperor Wu gave official support to the study of the Five Classics, a group of ancient texts used to discuss learning and government. He founded an imperial academy in 124 BCE. These steps strengthened classical learning at court without making other teachings disappear.',
    'Learning could open a door to office',
    'Knowledge of classical texts helped people take part in government and find examples for court decisions. It could also support criticism. A learned official might argue that a ruler’s spending or treatment of the people fell short of respected ancient models. Court support gave these debates a recognized place in political life.',
    'Government kept several traditions',
    'Calling this a complete victory for Confucianism oversimplifies Han rule. Courts continued to use administrative law, punishment and other intellectual traditions. Some specialists also interpreted relationships between human affairs and the wider universe. Certain texts and teachers became more influential, but their meanings remained contested. Han government was shaped by this mixture, rather than by one exclusive doctrine.',
    '136 BCE marks official promotion of the Five Classics. The imperial academy followed in 124 BCE; neither step imposed one exclusive teaching everywhere.');
  add('catalog-E_HAN_2', null,
    'Zhang Qian set out on his first western mission in 138 BCE, seeking allies for the Han court in Central Asia. His reports gave Han rulers information about distant peoples, resources and possible diplomatic partners. Earlier exchanges and the people living along the routes had already made long-distance travel possible.',
    'Looking for allies',
    'The Han court wanted allies against the Xiongnu. Its envoys gathered information about distant peoples and resources while carrying gifts. Merchants used opportunities created by these political relationships, though wars could also obstruct movement. Trade and diplomacy developed within the same world as military rivalry.',
    'Many routes and many hands',
    'Goods could pass through several owners along changing routes. Travellers needed water, food grown at oases and arrangements with local authorities. The later name Silk Road can make this seem like one highway, although many routes and commodities were involved. The communities between large empires kept these connections working; no single traveller created them all.');
  add('catalog-E_BUD_ENTRY', 'Buddhism comes to China',
    'Travellers, merchants and religious teachers brought Buddhism into the Han world from South and Central Asia. The date around 50 CE is approximate. Evidence becomes clearer during the first and second centuries CE, especially with the translation of Buddhist teachings into Chinese.',
    'Finding words for new ideas',
    'Translators had to explain rebirth, liberation from suffering and disciplined religious life using unfamiliar languages and existing Chinese words. This involved choices and discussion. An Shigao, a translator active in the second century, gives us a firmer historical reference than a single story about Buddhism’s arrival.',
    'Communities grew gradually',
    'Buddhist practitioners at one centre do not prove that the wider population shared their beliefs. Support from rulers also varied. Religious communities needed patrons, teachers and continuing contact across borders. Later stories placed Buddhism within Chinese imperial history, while the religion spread through the slower work of translating, teaching and sustaining communities.');
  add('catalog-C_QIN', null,
    'Thousands of terracotta soldiers, horses and other figures form part of the First Emperor’s enormous burial complex. Construction began before Qin unified the rival kingdoms and continued into the end of his reign. The date 210 BCE marks his death, rather than the making of every figure.',
    'An army for the afterlife',
    'The soldiers belong to a much larger complex of burial facilities and supporting structures. Together they express an ambition to continue imperial command after death. Making them required organized production, transport and skilled labour. The finished figures let us see some of the work behind the emperor’s plans.',
    'What remains unknown',
    'Faces and equipment vary, while repeated parts reveal organized manufacture. A distinctive face does not necessarily portray a particular living soldier. The central burial chamber remains unexcavated, so later descriptions of its contents are not archaeological observations. The objects reveal much about craftsmanship and representations of military life, while leaving questions about individual figures and the burial itself unanswered.');
  add('catalog-R_WEI', null,
    'Cao Pi became emperor in 220, and Cao Wei controlled much of northern China. He inherited the military and farming arrangements built under Cao Cao. The Sima family gradually took real power before founding Jin in 266.',
    'Food for an army',
    'Agricultural colonies supplied soldiers and helped organize displaced people and land. Farming was closely tied to the demands of war. A court needed more than a large area on a map: grain and revenue had to be collected and moved reliably. These arrangements helped sustain Wei’s military strength.',
    'Power inside the government',
    'Senior offices, army commands and positions governing on an emperor’s behalf gave powerful families ways to gather influence. The Sima family’s rise came through Wei’s own government. The dynasty was eventually replaced from within, rather than simply defeated by an outside enemy. Keeping the imperial title did not ensure that the Cao rulers still controlled the offices and armies supporting it.');
  add('catalog-R_SHU', null,
    'Liu Bei’s court in Sichuan claimed to restore Han rule. Zhuge Liang helped govern Shu and led northern campaigns against Wei in 228–234. Mountain routes and limited resources restricted those ambitions. Wei conquered Shu in 263.',
    'Protected by the mountains, limited by them',
    'Sichuan had productive farmland and approaches that could be defended. The same difficult terrain made it hard to supply armies sent beyond Shu’s home territory. Claiming descent from Han could attract support, but could not remove the cost of mobilizing a smaller population. Geography offered protection while limiting prolonged expansion.',
    'Zhuge Liang in history and stories',
    'Later plays and fiction made Zhuge Liang famous for extraordinary foresight and ingenious plans. His historical work also involved recruiting people, organizing government and keeping the state able to fight. The northern expeditions were sustained military efforts under difficult conditions. His later reputation grew from that service, but fictional feats cannot be read as direct accounts of the campaigns.');
  add('catalog-R_WU', null,
    'The Sun family built Wu around the lower Yangtze River. Sun Quan became king in 222 and claimed the imperial title in 229. Wu outlasted both Shu and Wei, until Jin conquered it in 280.',
    'Ruling with local families',
    'Military leaders needed the support of powerful families whose estates and followers provided resources. Marriages and official appointments helped connect them to the court. These ties did not erase their independent influence. Wu’s rulers governed through agreements with people who already held power in the region, and those relationships could produce conflict as well as cooperation.',
    'The cost of expansion',
    'As Wu extended control into hill regions, it drew communities into taxation and military service. Official accounts might describe this as bringing order or developing productive land. For the people affected, it could mean being forced under a new authority. Growth in the southern economy therefore came with burdens on communities whose experience is harder to see in court records.');
  add('catalog-E_3K_1', null,
    'In 220, Cao Pi accepted the Han emperor’s abdication and founded Wei. Han’s control had already weakened over many years. Cao Cao had built a powerful military government while keeping the emperor and issuing decisions in his name.',
    'The emperor’s name still mattered',
    'Controlling the emperor allowed Cao Cao to authorize appointments and campaigns without immediately replacing Han. The abdication later gave Cao Pi a claim to a lawful transfer of rule. The ceremony presented the new dynasty as legitimate to officials and rivals. Possessing military power and being accepted as the rightful ruler were connected, but different, problems.',
    'Several successors to Han',
    'Shu and Wu developed their own courts and claims after the transfer. Han’s methods of government and imperial language remained useful to several rival states. The dynasty’s formal end did not make its inheritance disappear. The date 220 marks the end of the Han ruling house within a division of power that had already advanced much further on the ground.');
  add('catalog-E_3K_2', null,
    'At Red Cliffs in winter 208–209 CE, forces associated with Sun Quan and Liu Bei stopped Cao Cao’s advance along the Yangtze. Cao Cao controlled the Han emperor and dominated the north. His defeat allowed southern rivals to survive while Han still formally existed.',
    'Fighting on the river',
    'Naval experience mattered, along with disease, supplies and the difficulty of campaigning far from familiar ground. The defeat stopped Cao Cao from immediately extending northern dominance southward. It did not create the [[Three Kingdoms]] in one day. Wei, Shu and Wu emerged through later campaigns and competing claims to rule.',
    'The battle in later stories',
    'Fiction turned Red Cliffs into a setting for brilliant plans and memorable personalities. Surviving historical accounts support a more limited picture, and several famous tricks remain disputed. Those later stories shaped how people remembered the battle, especially its lessons about loyalty and intelligence. They need to be distinguished from evidence of what the armies actually did.');
  add('catalog-R_JIN_W', null,
    'The Sima family founded Western Jin after gradually taking power within Wei. Jin conquered Wu in 280 and briefly ended the Three Kingdoms division. Later conflicts among imperial princes and military leaders weakened the court, which lost Luoyang and then Chang’an.',
    'A takeover built through service',
    'The Sima family gained offices and military commands before changing the imperial title. Its rise had therefore begun long before Jin’s formal founding. The new rulers inherited Wei’s officials and resources, along with relationships that were difficult to manage. A new dynastic name did not settle every contest for power.',
    'Reaching ordinary households',
    'Changes in farming settlements and the landholdings of powerful families affected what the court could demand. To collect labour and military service, officials needed household records and cooperation from local intermediaries. The struggles between princes were part of this wider problem. A government also needed reliable access to the people and resources that supported its armies.');
  add('catalog-E_JIN_1', null,
    'Chang’an fell in 316, ending the remaining Western Jin court. Luoyang had already fallen in 311. These successive defeats displaced political leaders and helped shift power between northern and southern centres.',
    'A collapse in stages',
    'The court lost effective control over territory and resources before its final defeat. Cities, armies and communities experienced the breakdown at different times. The date 316 makes a clear endpoint for Western Jin, but the fighting and displacement formed a longer sequence. Ancient accounts of devastation also cannot be treated as reliable modern population counts.',
    'Jin continued in the south',
    'Sima Rui’s southern government kept the Jin name. It needed support from families who had fled the north and influential families already established in the south. Ancestry helped its claim, but cooperation made rule possible. The fall of the western court was therefore also part of the formation of a different Jin society and government around the Yangtze.');
  add('catalog-E_BUD_SPREAD', null,
    'Buddhist texts and communities existed in China before the fourth century. During the Age of Division, more translations, images and support from patrons helped Buddhism grow in different regions. About 350 is a reference point for this gradual, uneven expansion.',
    'The work behind a growing religion',
    'Translators and readers kept texts in use. Patrons and craftspeople paid for and made images. Monasteries needed resources and protection. Buddhism took root through these relationships within local society, with different results in different regions. Its growth involved continuing work by communities, rather than the simple arrival of a complete set of foreign beliefs.',
    'Negotiating with rulers',
    'Monks’ religious duties and claims to a distinct status raised practical questions for governments. Who should pay taxes, perform service or show allegiance to a ruler? Court support did not settle every tension. Buddhism’s expansion included negotiations and conflicts as well as devotion, intellectual exchange and the creation of art.');
  add('catalog-R_JIN_EASTERN_JIN', null,
    'Sima Rui re-established a Jin court south of the Yangtze. Families who had moved from the north and powerful southern families shaped its government. Jiankang became a centre of politics and culture, while efforts to recover the north continued unevenly.',
    'An emperor who needed allies',
    'Prestigious families held offices and military resources that the emperor needed. Their cooperation allowed the court to function, but also limited his direct control. These families had competing interests. Describing Eastern Jin as government by an aristocracy is useful only if we remember that the aristocracy itself did not always agree.',
    'Migration and cultural life',
    'People carried texts, skills and ideas south with them. Their arrival helped create new settings for literature and art. These achievements grew within a society changed by displacement and new alliances. They belong to the same history as the court’s struggle to secure support, rather than forming a separate story untouched by war and migration.');
  add('catalog-R_SIXTEEN_HAN_ZHAO_FORMER_ZHAO', null,
    'Liu Yuan founded a state using the Han name in 304, as Western Jin power broke down. Later rulers adopted the name Zhao. Historians commonly group these changing phases as Han Zhao or Former Zhao.',
    'Claiming an imperial inheritance',
    'The Han name and claims about ancestry connected the new court to an established tradition of empire. They offered a way to seek support beyond the founder’s original followers. The court could use inherited titles and institutions rather than rejecting everything associated with earlier rulers. Its past was part of its argument for governing in the present.',
    'One name covers several changes',
    'Rulers, capitals and territory changed during the state’s history. The combined name makes those phases easier to follow, but can also hide their differences. Later Zhao was a separate regime, despite the shared word Zhao. Military alliances shifted, and rival courts repeatedly sought the same imperial authority.');
  add('catalog-R_SIXTEEN_LATER_ZHAO', null,
    'Shi Le and his successors made Later Zhao a major power in the north. The Buddhist monk Fotudeng developed close relationships with its rulers. Court support helped Buddhist institutions gain influence during the state’s short political life.',
    'A monk at court',
    'Religious biographies credit Fotudeng with ritual powers and influence over rulers. Miracles in these stories cannot be independently confirmed. The accounts do show what people expected religious figures to offer, including protection for rulers and their government. Personal access to the court helped religious communities secure support, alongside the spread of texts and teachings.',
    'What survived the state',
    'Monks, disciples and stories could travel beyond Later Zhao’s borders. The court fell, but the Buddhist communities and institutions it supported survived. Political defeat did not necessarily end the traditions that had benefited from royal support.');
  add('catalog-R_SIXTEEN_FORMER_YAN', null,
    'Former Yan grew from a northeastern base under the Murong family into a major northern state. Its rulers expanded by force while using titles and recognition from other courts to strengthen their position.',
    'Claiming authority in stages',
    'A ruler might first accept recognition as a prince before claiming to be emperor. Recognition from another court could help secure support while greater ambitions remained difficult to achieve. Former Yan’s development combined diplomacy with military expansion. Its different titles record stages in the growth of power, rather than a state that appeared fully formed on one founding date.',
    'Looking from the northeast',
    'The northeast can appear distant when viewed from another dynasty’s capital. For the Murong rulers, it was the centre from which they gathered resources and built alliances. Starting from their own base makes their choices easier to understand. They were organizing a state with its own supporters and ambitions within a wider contest for imperial rule.');
  add('catalog-R_SIXTEEN_FORMER_QIN', null,
    'Under Fu Jian, Former Qin brought much of northern China under one ruler. Eastern Jin defeated its army at the Fei River in 383. Former Qin survived the battle, but the alliance supporting its expanded territory quickly began to break apart.',
    'Conquest did not settle every loyalty',
    'Military victories brought different commanders and communities under Fu Jian without giving them identical interests. Their support could depend on rewards or the ruler’s ability to compel obedience. A serious defeat exposed those unsettled relationships. Former Qin’s greatest territorial extent therefore does not tell us how securely every region was governed.',
    'Why one defeat had wider effects',
    'Stories of the Fei River often stress clever tactics and enormous armies. The reported troop numbers remain uncertain. After the defeat, commanders and communities withdrew their support, and Former Qin fragmented even though it survived until 394.');
  add('catalog-R_SIXTEEN_LATER_QIN', null,
    'The Yao family ruled Later Qin from Chang’an. After Kumarajiva arrived in 401, Yao Xing supported the monk and his collaborators in translating Buddhist texts. Later Qin ended in 417, while the translations continued to shape readers long afterward.',
    'A team of translators',
    'Turning Buddhist works into Chinese required discussion and interpretation. Collaborators had to choose how to express ideas clearly, rather than merely replace words from one language with another. Court resources and protection made this work possible. A politically insecure ruler could still provide conditions for a major intellectual undertaking.',
    'Readers beyond the court',
    'Later communities used these translations in circumstances far removed from the court that had supported them. Texts could move beyond a state’s borders and remain influential after its fall. Their history therefore extends beyond Later Qin’s dates. Not every work traditionally attributed to Kumarajiva can be confidently assigned to him, and traditional totals also need caution.');
  add('catalog-R_NS_LIU_SONG', null,
    'Liu Yu founded Liu Song in 420 after a successful military career. Its court ruled from Jiankang. Emperor Wen, who reigned 424–453, sought to restore government after the founding wars. Later struggles over succession repeatedly disrupted the dynasty.',
    'A commander becomes ruler',
    'A general serving an existing dynasty could gather enough troops and resources to replace its ruling family. An abdication ceremony then presented the change as a lawful succession. Liu Song’s founding belongs to this recurring pattern: new dynasties could grow from powerful positions inside an older government.',
    'Paying for defence',
    'In 450, Northern Wei troops reached Guabu near the Yangzi. The war strained the court’s finances. Wen cut officials’ salaries by one-third and imposed levies on wealthy households and Buddhist clergy. Defence therefore placed demands on people far from the fighting. Keeping the court secure also required managing princes, commanders and powerful families whose cooperation could change whenever a new ruler took power.');
  add('catalog-R_NS_SOUTHERN_QI', null,
    'Xiao Daocheng founded Southern Qi in 479. Its court tried to keep track of households and supervise royal princes governing the regions. Both tasks affected how much money, labour and military support the government could collect.',
    'Why household lists mattered',
    'A household missing from official records might pay less tax or provide less labour to the court. A local powerful family could gain more control over those people instead. Keeping registers was therefore a struggle over who could make demands on households. The court’s claim to rule a region was stronger on paper than in practice if it could not reach its people.',
    'Watching the princes',
    'Officials handling household documents helped supervise princes’ establishments. The court needed ways to monitor relatives entrusted with regional power. These arrangements might restrain a prince while giving more influence to the officials watching him. Southern Qi faced a familiar problem: delegating authority made government possible, but also created people with power of their own.');
  add('catalog-R_NS_LIANG', null,
    'Xiao Yan founded Liang in 502 and supported Buddhist communities and learning at court. Accepting the defecting commander Hou Jing brought a dangerous military leader into southern politics. Hou Jing captured Jiankang in 549 and shattered the court’s authority.',
    'Religion and royal support',
    'Supporting religious and literary institutions helped the emperor present himself as a moral and cultural leader. It also connected the court to communities and resources beyond its own offices. Liang’s Buddhist life involved these political relationships as well as the ruler’s personal beliefs.',
    'The danger of accepting an ally',
    'A commander arriving from the north could offer military advantages. He also brought troops and ambitions the court could not fully restrain. Hou Jing’s rise exposed the risks of relying on commanders whose loyalties could change. Blaming the disaster simply on religion or court luxury leaves out that struggle over military power. The principal dynasty ended in 557, though a smaller Liang court survived longer.');
  add('catalog-R_NS_CHEN', null,
    'Chen Baxian founded Chen in 557 after years of devastation and divided military power. The last of the southern dynasties, it ruled a reduced territory before Sui conquered it in 589.',
    'Rebuilding after war',
    'The court needed to restore tax collection, appoint officials and bring regional commanders into workable relationships. Its territory was smaller than that of earlier southern rulers, but rebuilding government still required effort. Later accounts often focus on the final defeat and can obscure this work of recovery after destructive wars.',
    'What reunification required',
    'Sui’s victory ended the independent southern court. It did not immediately remove the differences in society and government that had developed during centuries of separation. The conquerors inherited those regional conditions and had to find ways to govern across them. Chen’s end therefore marks a military change within a longer process of bringing northern and southern systems together. Sui itself had already been founded in 581.');
  add('catalog-R_NS_NORTHERN_WEI', null,
    'The Tuoba-led Northern Wei completed its conquest of northern China in 439. Reforms to landholding and household records increased the government’s demands on resources. Moving the court to Luoyang in 494 brought major changes in political and cultural life.',
    'Land in return for obligations',
    'The equal-field system, introduced in 485, allocated land according to household categories and linked farming to taxes and labour service. Household records helped officials identify who owed what. These rules show what the government wanted to achieve, but do not prove that land was redistributed uniformly or that every district followed the same practice.',
    'A changing court',
    'Rulers adopted Chinese court practices and supported large Buddhist monuments to strengthen their authority. These changes did not erase Xianbei identities or remove political tensions. Governing a diverse population involved choices about whose practices and interests the court would favour. Reforms could bring some groups closer to the government while creating new sources of conflict.');
  add('catalog-R_NS_EASTERN_WEI', null,
    'Eastern Wei kept the Wei imperial title after the northern court split, while the Gao military family held effective power. Its eastern territories contained substantial farmland, cities and experienced armies.',
    'The emperor and the commanders',
    'Keeping the dynastic name gave the Gao family an established authority through which to govern. The emperor’s title and actual control belonged in different hands. To understand the state, we need to follow the family and commanders who supplied its troops and ran its government, as well as the person on the throne.',
    'Resources needed organization',
    'Eastern and Western Wei inherited different territories and alliances. The eastern state’s wealth did not guarantee victory over its rival. Rulers still had to organize supplies and hold commanders together. Eastern Wei was a substantial state with resources of its own, rather than simply a powerless fragment. In 550, Northern Qi replaced the imperial title while Gao-family power continued.');
  add('catalog-R_NS_WESTERN_WEI', null,
    'After the northern split, Western Wei developed under the military leadership of Yuwen Tai. It had fewer resources than its eastern rival. Its rulers tried new arrangements for government and the army that influenced Northern Zhou and later Sui.',
    'Working with fewer resources',
    'The western government had reasons to change recruitment and command because it could not rely on greater wealth or manpower. These changes answered immediate pressures. They were not a complete plan for later dynasties: successors adapted the arrangements to different populations and military needs.',
    'An old title, new power',
    'The Wei name connected the court with the preceding dynasty, while Yuwen leaders organized its effective power. The emperor’s family and the military alliance therefore tell different parts of the story. The court could preserve an inherited title while another family gathered the authority eventually used to replace it. Later military systems should not be assumed to have existed here in their finished form.');
  add('catalog-R_NS_NORTHERN_QI', null,
    'The Gao family replaced Eastern Wei with Northern Qi in 550. It ruled a wealthy eastern region until Northern Zhou conquered it in 577. Relations within the ruling family mattered to its survival alongside wars with its neighbours.',
    'Family ties at the centre of power',
    'Empress Dowager Lou’s role shows how marriage and kinship helped organize authority within the ruling household. Women participated in decisions that affected succession and the state’s future. Treating palace life only as a background to male rulers misses those relationships. The question of who would inherit power involved the wider family and its connections.',
    'Wealth was not enough',
    'Farmland and other resources could support a strong government only if rulers maintained effective command and reliable alliances. Rival centres of influence could still divide a wealthy court. Northern Qi’s defeat cannot be explained by comparing resources alone. Dramatic tales about individual emperors also leave out the practical question of who controlled the state’s wealth and armies.');
  add('catalog-R_NS_NORTHERN_ZHOU', null,
    'The Yuwen family founded Northern Zhou after Western Wei in 557. It conquered Northern Qi in 577. Sui inherited this enlarged northern state when it took power in 581.',
    'Strength built before the founding',
    'Northern Zhou’s armies grew from the western alliance that had supported Western Wei. Recruitment and command depended on those earlier political relationships. Later rulers continued to adjust the arrangements they inherited. Following these connections explains how military power could grow across a change of dynastic name, rather than appearing suddenly when a new emperor took the throne.',
    'Victory did not secure the family',
    'Defeating Northern Qi expanded the state without guaranteeing that the Yuwen family would keep ruling it. Another group could use the enlarged government and its resources to take power. Sui’s succession illustrates that difference: strong armies and offices could survive while the family at the top changed. The northern conquest came before the later conquest of the south in 589.');
  add('laozi', 'Laozi and the Daodejing',
    'Laozi, the “Old Master,” is associated with the Daodejing, a short book central to later Daoist traditions. His identity and lifetime are uncertain. The approximate Warring States dates here concern the book’s formation, rather than a securely documented person’s lifespan.',
    'The value of restraint',
    'The text questions forceful ambition, excessive desire and rulers’ confidence that they can impose order. Its idea of wuwei, often translated as non-action, does not simply mean doing nothing. It asks how action might avoid needless interference and ambitions that defeat themselves. Readers disagree about exactly how this advice should guide either a person’s life or a government.',
    'A book in different forms',
    'Guodian manuscripts preserve related passages by around 300 BCE. Copies found at Mawangdui arrange material differently from the familiar later text. The book developed through copying and compilation. The story of a sage writing it all at a frontier pass belongs to later tradition and cannot replace this evidence of different early versions.');
  add('mozi', 'Mozi',
    'Mozi and his followers challenged aggressive war, luxury and inherited privilege during the Warring States era. He probably taught in the later fifth century BCE, though his exact dates are unknown. The surviving book Mozi includes arguments developed by followers as well as teachings associated with the master.',
    'Care beyond the family',
    'Mohists argued that concern for people should extend beyond family and political borders. Judged by the suffering it caused, aggressive war was hard to defend, whatever glory a ruler claimed. They also criticized lavish funerals and musical displays. Labour and resources, they argued, should benefit people broadly rather than mainly enhance the standing of the powerful.',
    'Order and capable officials',
    'This wider care went together with support for hierarchy, common moral standards and the promotion of capable officials. Mohists appealed to Heaven and spirits while also arguing carefully about practical consequences. Their ideas do not fit neatly into a modern political party. They pressed opponents to explain whose welfare deserved attention and which uses of resources could be justified.',
    'Around 430 BCE marks Mozi’s approximate period of activity, not his birth or death. His precise dates are unknown.');
  add('mencius', 'Mencius',
    'In the fourth century BCE, Mencius developed teachings about moral growth and humane government. Dialogues with rulers in the book bearing his name connect a ruler’s authority with his treatment of people. Followers and later editors transmitted the text, and his conventional life dates remain approximate.',
    'People needed secure livelihoods',
    'Mencius’s claim that human nature is good concerns capacities that need to be developed. It does not mean everyone always behaves well. He connected conduct with living conditions: a ruler who leaves people insecure and then punishes their misconduct cannot blame character alone. Providing for people and helping them learn were parts of the same responsibility.',
    'A throne did not settle the question',
    'The text permits harsh criticism of rulers who abandon their duties. It assumes monarchy and different social roles, rather than modern government by the people. Even so, holding the throne did not automatically make a ruler worthy of it. Later readers could use this argument to advise a ruler or condemn his failures.');
  add('zhuangzi', 'Zhuangzi',
    'The Zhuangzi uses stories, humour and unexpected viewpoints to question familiar judgments. Zhuang Zhou probably lived in the later fourth century BCE, but other writers contributed to the surviving book. The approximate dates here describe its early development, rather than one established lifespan.',
    'Usefulness depends on who is judging',
    'Its stories ask who decides what has value. A tree that a carpenter finds useless may survive because no one wants to cut it down for timber. What looks like a disadvantage from one position can look different from another. Tales of skill and transformation similarly invite readers to reconsider the purposes behind their judgments.',
    'Living under demanding rulers',
    'Doubts about ambition and public office had force in a world where rulers could demand service and punish failure. The text also explores action that is skilled and responsive, less restricted by fixed categories. Later readers have interpreted it in very different ways. A slogan such as “everything is relative” misses the variety and movement of its arguments.');
  add('xunzi', 'Xunzi',
    'Xunzi defended learning, ritual and deliberate self-improvement in the third century BCE. He disagreed with Mencius about the relationship between human nature and moral conduct. His dates are uncertain; he was still alive after his patron Lord Chunshen was killed in 238 BCE.',
    'Learning to handle desire',
    'Unchecked desires could bring people into conflict over limited resources. Teachers and inherited practices helped people respond differently. Ritual organized expectations, emotions and distinctions between roles so that cooperation became possible. For Xunzi, good conduct was an achievement developed through practice, rather than simply the release of goodness already present within us.',
    'Human responsibility for government',
    'Xunzi distinguished Heaven’s regular patterns from the success or failure of human rule. People had to take responsibility for the institutions they created. He valued disciplined effort, hierarchy and accomplished earlier teachers. Some later Confucian traditions gave him less prominence, but his disagreements show how widely early thinkers could differ while working with Confucius’s inheritance.',
    'About 310 BCE is an estimated birth date. 238 BCE marks his latest securely documented activity, not a known death year. His description of human nature depends on a distinction between natural desires and learned moral conduct.');
  add('han-fei', 'Han Fei',
    'Han Fei, who died in 233 BCE, examined how rulers could control ministers and subjects. The Han Feizi discusses standards, rewards, punishments and methods of government. Later writers called him a Legalist, though this label groups thinkers who did not form one organized school.',
    'Officials had interests of their own',
    'A minister might hide information, exaggerate success or turn delegated duties into personal power. Han Fei wanted ways to compare an official’s performance with his stated responsibilities. Government should work through repeatable arrangements instead of depending on unusually wise rulers and perfectly loyal servants.',
    'Rules in the ruler’s hands',
    'Common standards could weaken inherited exemptions, but their purpose was stronger royal control, rather than equal political rights. The ruler kept command of rewards and punishments. This created a difficult dependence: he needed capable officials while fearing the independence their ability might give them. Han Fei’s writing explores tensions inside powerful government, not a modern system of constitutional limits.',
    'About 280 BCE is a conventional approximate birth date; 233 BCE is his death year. The surviving collection has disputed layers. Legalism is a later classification, not modern rule of law.');
  add('mawangdui-manuscripts', 'Mawangdui Manuscripts',
    'A tomb near Changsha, sealed in 168 BCE, preserved silk manuscripts with other burial materials. Excavations in 1972–1974 revealed the collection at Mawangdui. The copies must be older than the tomb’s closure, but the works they contain may have been composed much earlier.',
    'What one collection held',
    'Philosophical writings appear alongside medical and technical materials and maps. The collection shows interests in government, health, the wider universe and bodily practices within one wealthy setting. It broadens our view beyond a few famous thinkers and books. It does not show a standard course of study followed by everyone in Han China.',
    'Different versions of a familiar book',
    'The Laozi manuscripts differ in wording and order from the later text. A book now encountered in a familiar form once circulated in alternatives. These copies help us see how texts changed as people transmitted them. A later edition’s authority does not mean that all earlier readers knew exactly the same words or arrangement.');
  add('sima-qian', 'Sima Qian and the Shiji',
    'Sima Qian’s Shiji, or Records of the Grand Historian, brings together chronological accounts, tables, studies of government and society, and biographies. Written in the later second and early first centuries BCE, its 130 chapters include merchants, advisers and defeated rivals alongside emperors.',
    'Competing views of the past',
    'An emperor’s account can show a different world from a study of the economy or the life of someone he defeated. Readers have to connect these parts. The structure allows questions about behaviour, social position and how people gathered wealth and power, alongside the sequence of major events.',
    'History as criticism',
    'The economic chapters can be read as criticism of imperial expansion under Emperor Wu. That is an interpretation, rather than proof that every passage carries one hidden message. An official historian’s access to the court did not necessarily make him a simple spokesman for it. Writing about earlier events could also expose difficulties in the government of his own time.',
    'About 109–91 BCE is the usual composition range, not an exact publication schedule. Different portions and later transmission have their own histories.');
  add('salt-iron-debate', 'Salt and Iron Debate',
    'In 81 BCE, a court conference debated Emperor Wu’s policies, including government monopolies on salt and iron. Huan Kuan later compiled the Discourses on Salt and Iron as an account of the exchanges. The debate asked what government should do and who should bear its costs.',
    'The price of frontier policy',
    'Supporters of government involvement in the economy argued that revenue paid for frontier commitments and public power. Critics pointed to hardship and the damaging effects of pursuing profit. Decisions about distant armies could affect the goods people produced and bought at home. Military policy and household burdens belonged to the same argument.',
    'A debate preserved by a later writer',
    'The speakers argued within a monarchy and a largely farming society. Modern labels such as capitalism and socialism do not neatly describe their positions. The surviving book also arranges arguments for later readers. It is evidence of political disagreement, but cannot recover every participant’s exact words or the full range of official opinion.');
  add('ban-zhao', 'Ban Zhao',
    'Ban Zhao helped finish the Book of Han after her brother Ban Gu died in 92 CE, and taught at the imperial court. Her Admonitions for Women became widely read. Her career shows a woman exercising authority through learning within a society that restricted women’s roles.',
    'Ban Zhao’s case for educating girls',
    'Ban Zhao questioned giving education to boys while neglecting girls. She based her argument on women’s duties in marriage and ritual life, rather than calling for that social order to be abolished. Her writing could support learning for women while also expecting their subordination. Both parts matter to understanding what she argued.',
    'Advice and everyday life',
    'Rules about how women ought to behave cannot show that every household followed them. The text reflects expectations in a particular wealthy setting; its later readers gave it a wider influence. Ban Zhao’s own achievement also warns against treating ancient women as one identical group. Access to education and court relationships could differ greatly.');
  add('zhang-heng', 'Zhang Heng’s earthquake detector',
    'In 132 CE, Zhang Heng presented an instrument intended to indicate the direction of a distant earthquake. He also worked in astronomy, mathematics and literature. Observing natural events mattered at court because they could carry practical and political meaning.',
    'News of distant disaster',
    'An earthquake might damage a region far from the capital. It could also be interpreted as a warning about government. A device registering an event that people nearby had not felt offered a way to learn about the wider empire. Technical observation and beliefs about nature therefore worked together in this setting.',
    'What the device could do',
    'No original instrument survives. Modern reconstructions rely on descriptions that leave its mechanism uncertain. It was reportedly a detector of an earthquake and its direction, rather than an instrument drawing a continuous record or calculating magnitude. It did not predict earthquakes. These limits matter when judging the achievement: a modern reconstruction cannot establish every detail of how the Han device worked.');
  add('nine-chapters', 'Nine Chapters on the Mathematical Art',
    'The Nine Chapters on the Mathematical Art collects problems about land areas, quantities, distribution, engineering and calculation. It developed over generations. Later explanations, especially Liu Hui’s commentary in 263 CE, became part of how readers learned from it.',
    'Methods for new problems',
    'Surveying a field or dividing resources required more than one numerical answer. A procedure could be used again with different quantities, helping learners solve new problems. The book connects general mathematical reasoning to situations familiar to officials and producers. Its practical settings do not make its methods merely mechanical.',
    'Learning through explanation',
    'The problems, operations and later commentaries worked together. Comparing their organization only with Greek geometry can overlook the reasoning expressed in a different form. Understanding the book requires attention to how its procedures were explained and taught. Its changing layers also make a single publication date misleading: the collection and the explanations added to it belong to different times.',
    'About 100 BCE–100 CE is a broad Han-period reference, not an established formation range. Proposed origins include around 200 BCE and alternative dating between 100 BCE and 50 CE. Different layers have different dates; Liu Hui’s commentary dates to 263 CE.');
  add('orchid-pavilion', 'Wang Xizhi’s Orchid Pavilion gathering',
    'In 353, Wang Xizhi joined a spring purification gathering associated with the Orchid Pavilion. Participants drank, composed poems and exchanged writing. His preface became a celebrated model of calligraphy. The original no longer survives; later copies carry its reputation.',
    'A gathering remembered through writing',
    'The poems grew from a shared occasion, and the preface gave that meeting a lasting written form. Later paintings presented such gatherings as admired examples of educated friendship and taste. One event became a model through which later readers and artists imagined their own relationship with a cultural tradition.',
    'What copies preserve',
    'Tracing, copying and carving allowed Wang’s work to reach later viewers in different materials. Those viewers encountered both the appearance of brushwork and inherited judgments about its quality. A surviving copy is part of that chain of transmission, rather than direct access to Wang’s own hand. The story that the original was buried with Tang Taizong remains unverified by archaeology.');
  add('mogao-caves', 'Mogao Caves',
    'Tradition dates the Mogao caves near Dunhuang to 366, when a monk’s vision inspired a sanctuary. The complex grew over many dynasties. Donors, artists, monks and travellers created its paintings, sculptures and manuscripts through connections reaching beyond any one court.',
    'Making a sanctuary at a crossroads',
    'Dunhuang lay on routes linking China and Central Asia. Local communities sustained institutions that could receive texts and images, then adapt them. Donors commissioned caves to express devotion. The art changed through choices made by patrons and workshops over generations, drawing on several traditions rather than copying a single foreign model.',
    'The manuscript chamber',
    'A chamber discovered in 1900 preserved documents in several languages. They connect religious life with government work and everyday activities. Their survival gives an unusual view of the region, but the collection is not a sample of every community along the routes. The circumstances in which these materials were gathered, preserved and later dispersed also shape what they can tell us.');
  add('kumarajiva-translations', 'Kumarajiva’s Buddhist translations',
    'Kumarajiva, a learned monk from Kucha, reached Chang’an around 401 after journeys shaped by rival rulers and military coercion. With Later Qin support, he led teams translating Buddhist texts into Chinese. Their work helped readers study and debate difficult teachings.',
    'Many people behind one name',
    'Translation involved spoken explanations, discussion, recording and revision. Monks and assistants connected knowledge of the original teachings with skill in written Chinese. The court provided resources and a place to work. Kumarajiva’s name became famous, but the translations depended on collaborators as well. Rival states could support important centres of religious learning even during political division.',
    'A long life among readers',
    'Communities adopted the translations for study, debate and ritual. Their continuing use gave them authority beyond the court where they were produced. Later catalogues also attributed works to Kumarajiva with varying reliability. A text’s influence does not establish its authorship, and not every work carrying his name can be assigned to him with equal confidence.');
  add('tao-yuanming', 'Tao Yuanming',
    'Tao Yuanming, also called Tao Qian, wrote about rural life, poverty and leaving official service. His return home in 405 became an influential subject. Later readers admired the apparent simplicity of his poetry and made him a model of personal integrity.',
    'The choice to leave office',
    'Retirement could be presented as freedom from the compromises of government work. Tao’s writing placed the household and cultivated land at the centre of that choice. His poems are shaped by an author’s concerns, rather than describing all rural society. Later admirers could make difficult individual circumstances look like a reassuring ideal of simple living.',
    'The poet later readers knew',
    'Copying and editorial choices changed the body of writing readers encountered. Paintings of Tao’s homecoming added more interpretations. Artists living through dynastic conquest could find their own dilemmas in his withdrawal. His reputation therefore grew through later reading and art as well as his fifth-century poems. The reasons for his retirement should not be taken directly from later anecdotes.');
  add('yungang-caves', 'Yungang Caves',
    'The main early Yungang cave project near the Northern Wei capital developed around 460–525. Huge Buddha images, including five caves associated with the monk Tanyao, joined Buddhist devotion with imperial support. Their scale shows the resources rulers could direct into religious building.',
    'Belief and royal power',
    'Carving the caves required workers, materials and continuing organization. Royal support expressed devotion while presenting the court as able to carry out extraordinary projects. These purposes could reinforce each other. Belief need not have been a disguise for politics: supporting Buddhism could bring religious merit and also strengthen a ruler’s public standing.',
    'Choices made by workshops',
    'Carvers and patrons combined artistic forms associated with South and Central Asia with local preferences. Their choices changed over time. These were adaptations by people working within connected worlds, rather than an inevitable march from foreign art toward a final Chinese form. Changes at Yungang also belong to the history of Northern Wei’s shifting political centre.');
  add('longmen-caves', 'Longmen Caves',
    'Near Luoyang, Longmen’s most intensive carving ran from the late fifth to the middle of the eighth century. Northern Wei and Tang patrons commissioned Buddhist images and inscriptions. Different generations added to the site, rather than completing one ruler’s single plan.',
    'Cave workers, donors, and inscriptions',
    'At Binyang, donor processions showed rulers approaching the Buddha. Other inscriptions record commissions and hopes attached to them. The caves therefore tell us about the people supporting religious art as well as the makers’ skill. Images connected living donors, the dead and political authority within places of worship.',
    'Inscriptions and patronage',
    'Medical prescriptions carved at Yaofangdong reveal practical concerns alongside devotion. Later changes and damage have also shaped the site. Some donor reliefs now displayed abroad once belonged to larger arrangements of figures and architecture. Understanding where they stood helps recover relationships that an isolated museum object cannot fully show. Each cave has its own sequence of work within Longmen’s long history.');
  add('zhou-gonghe', 'King Li’s expulsion and the Gonghe period',
    'Traditional histories place the expulsion of King Li of Zhou around 841 BCE, followed by a period known as Gonghe. The people involved are often called inhabitants of the capital. The ancient term guoren does not simply mean modern citizens or the whole farming population.',
    'Removing a king',
    'The king’s removal exposed conflict within the royal community, but did not abolish the monarchy. Later accounts made it a warning about oppressive rule, especially a ruler’s response to criticism. These stories reveal later ideas about government. They are not independently verified records of everything said during the confrontation.',
    'A useful date, disputed details',
    '841 BCE became the conventional starting point for a continuous year-by-year chronology in traditional Chinese histories. Details remain uncertain, including who governed during Gonghe. Some accounts describe a regency; others identify a particular lord as ruler. The name should not be read in its much later sense of a modern republic.',
    '841–828 BCE is the conventional range. Some reconstructions place the expulsion in 842. Accounts disagree over whether Gonghe was a regency or rule by a named lord.');
  add('zhou-capital-crisis', 'Fall of the Western Zhou capital',
    'In the traditional chronology, an attack involving the lord of Shen and Quanrong forces killed King You in 771 BCE. King Ping established his court in the east in 770, the conventional beginning of Eastern Zhou. Rival claims to the throne and military alliances both shaped the crisis.',
    'Allies could turn against the king',
    'Regional lords and groups described as outsiders belonged to connected political networks. They could take sides in a royal succession struggle. Zhou power depended on alliances that might be redirected against its ruler. Losing the western centre weakened the resources supporting the monarchy, even though the royal title remained respected.',
    'The story of the warning fires',
    'Later tradition blamed the king’s favourite Bao Si and the misuse of warning beacons. This memorable tale turns a political breakdown into a lesson about a king misled by a woman. Its details are less secure than the conventional dates. Reconstructing the crisis also requires attention to rival rulers and military commitments, rather than relying on the anecdote alone.');
  add('shang-yang', 'Shang Yang’s reforms',
    'Reforms traditionally dated to 356 and 350 BCE link Shang Yang with Qin’s growing strength. They rewarded farming and military achievement, tightened supervision of households and extended direct control by officials. More of ordinary people’s work could then be directed toward the ruler’s needs.',
    'Rewards and punishments',
    'Rewards offered opportunities beyond inherited privilege. Punishments and collective responsibility, which held groups answerable for members’ conduct, tightened control. Both aimed to direct effort toward farming and war. Powerful households lost some independence. The possibility of advancement in selected activities therefore came alongside stronger restrictions on people’s lives.',
    'Changes that outlasted the reformer',
    'Shang Yang was executed in 338 BCE, but important changes survived him. Qin’s later conquests also depended on generations of rulers, officials and soldiers. The Book of Lord Shang contains layers of writing associated with his tradition, rather than a verbatim list of his policies. A proposal in the book does not prove it was applied everywhere in Qin.');
  add('qin-great-wall', 'Qin’s northern walls',
    'After unification, Qin campaigns and construction extended control along the northern frontier. Earlier states had already built walls; Qin adapted and connected parts of them. Much of the familiar stone and brick Great Wall belongs to later periods, especially the Ming.',
    'Keeping a wall working',
    'Fortifications needed soldiers, communications and dependable supplies. People had to build them, transport provisions and serve on difficult terrain. These projects show the emperor’s ability to demand labour and resources, along with the costs for those assigned to the frontier. Communities brought under new control also faced changes in how they were governed.',
    'A changing frontier',
    'Walls could direct movement and support military occupation without stopping every exchange. Their routes changed as rulers faced different conditions and enemies. The Great Wall is therefore a long history of separate projects, not one fixed national boundary built once. Qin’s northern expansion and later defensive programmes belong to different political circumstances.');
  add('yellow-turbans', 'Yellow Turban Uprising',
    'In 184, followers associated with the religious leader Zhang Jiao rose against Han rule. Their yellow head coverings gave them their name. Healing practices, hopes for a changed world and economic hardship helped draw supporters. Government forces defeated the main leaders that year, though related armed groups continued much longer.',
    'Beliefs connected people',
    'Shared religious practices linked communities beyond a single place. They helped people explain suffering and imagine another future. The movement’s intended government is less clear than the accounts of its defeat, mostly written by opponents. Neither dismissing it as superstition nor calling it a modern democratic revolution does justice to that uncertainty.',
    'More power for commanders',
    'The court relied on commanders and local forces to fight the uprising. Mobilizing them helped armed leaders build greater independent influence. Han did not end in 184; it formally lasted until 220. The rebellion and its suppression added to existing court conflict, rural insecurity and changes in who controlled the soldiers.');
  add('eight-princes', 'War of the Eight Princes',
    'The War of the Eight Princes groups several struggles among members of the Sima imperial family between 291 and 306. Palace takeovers grew into wider wars as princes sought control of the emperor and government. Their fighting weakened the unity Western Jin had achieved in 280.',
    'Family protection became rivalry',
    'Giving royal relatives armies could protect the dynasty from powerful ministers outside the family. It also gave those princes the means to fight each other. Competing claims and commands made succession dangerous. The arrangements meant to secure the dynasty therefore helped rivals challenge control of its centre.',
    'Damage beyond the court',
    'Campaigns disrupted communities and drew other armed groups into the contests. The later division of the north grew through civil war, recruitment, displacement and new alliances, rather than one sudden invasion. Western Jin survived beyond 306, but emerged weaker. Its later loss of the capitals formed further stages in that breakdown, ending the western dynasty in 316.');
  add('xiaowen-reforms', 'Northern Wei reforms',
    'In the late fifth century, Northern Wei changed land and household administration as well as life at court. Empress Dowager Feng and Emperor Xiaowen both shaped the reforms. The court moved from Pingcheng to Luoyang in 494, followed by changes to elite names, dress, language and marriage.',
    'Different rules for different purposes',
    'Household registration and land allocation aimed to strengthen access to farm resources. Court rules changed how powerful families behaved and displayed rank. These were political choices about governing, not simply a whole people deciding to become Chinese. Families could negotiate or resist measures that affected their position.',
    'A move with uneven effects',
    'Relocating the court changed its relationship with northern military communities. Older identities did not disappear, and government did not become uniform overnight. Some groups were now better placed to share in court rewards than others. Reforms intended to strengthen imperial rule could therefore create new divisions as well as closer connections. Feng’s role also prevents attributing the whole programme to Xiaowen alone.');
  add('zhuge-northern-expeditions', null,
    'Between 228 and 234, Zhuge Liang led repeated campaigns from Shu against Wei. Shu’s court in Sichuan claimed to restore Han rule, but faced a much larger rival. Mountain routes and the work of supplying soldiers limited what its armies could achieve.',
    'Getting food to the troops',
    'An army crossing difficult terrain needed provisions while leaving its home territory able to support the next campaign. A chance to win a battle mattered only if troops and supplies could reach it. Supply limits repeatedly forced the armies to withdraw. Comparing the cleverness of individual commanders cannot fully explain what Shu could sustain.',
    'The commander and his later reputation',
    'Zhuge Liang died in 234, ending his leadership of the campaigns. Shu survived until 263. Later stories made him a model of extraordinary foresight and loyalty. His historical work involved keeping a smaller state capable of pursuing a large military ambition. That sustained effort can be appreciated while keeping later fiction separate from accounts of the campaigns themselves.');
  add('fei-river', 'Battle of the Fei River',
    'In 383, Eastern Jin defeated Fu Jian’s Former Qin army at the Fei River. Former Qin had united much of the north and wanted to extend its rule south. Defeat disrupted that ambition and hastened the breakup of an alliance containing competing loyalties.',
    'One ruler, different interests',
    'Conquest had brought commanders and troops under Fu Jian without making all their interests the same. Their willingness to remain depended on rewards, confidence and the centre’s ability to demand obedience. Losing a battle could change those calculations. Defections and rival ambitions then made the consequences much larger than the immediate military loss.',
    'The south survived',
    'Victory allowed Eastern Jin and powerful southern families to continue developing government around the Yangtze. Former Qin did not disappear that day; it lasted until 394 as its territory fragmented. Traditional accounts contain dramatic tactics and enormous troop totals that remain uncertain. The choices commanders and rulers made after the battle determined its wider effects.');
  revisions['catalog-E_QIN_2'].note = '221 BCE dates the weights-and-measures edict. Other standardization measures developed over time; they were not all completed that year.';
  revisions['catalog-E_HAN_2'].note = 'Zhang Qian’s first mission is commonly dated 138–126 BCE; some sources use 139 BCE for departure.';
  revisions['catalog-E_BUD_ENTRY'].note = 'About 50 CE represents early contact, not a verified introduction year. The familiar imperial dream story is a later tradition, not a contemporary arrival record.';
  revisions['catalog-R_WEI'].note = '220–265 is one conventional dating for Wei. The Jin accession falls in 266 in common Gregorian chronologies.';
  revisions['catalog-E_3K_2'].note = '208 CE is the conventional battle date; the campaign extends into winter 208–209. Troop totals, the exact location and several familiar tactics are disputed.';
  revisions['catalog-R_SIXTEEN_LATER_ZHAO'].note = '319–351 is the conventional dynastic range. Stories of supernatural acts belong to religious biographies; they are not independently established events.';
  return { revisions };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = BEGINNER_EARLY;
