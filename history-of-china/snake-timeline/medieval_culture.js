/* Cultural histories: dates locate activities and monuments, not invented lifetimes. */
const MEDIEVAL_CULTURE = (() => {
  const events = [], pinyin = {};
  const add = (id,name,nameZh,han,pronunciation,glyphPronunciation,start,end,parent,ribbon,description,title1,text1,title2,text2,note,refs,related,approx=false) => {
    events.push({id,name,nameZh,han,start,end,parent,ribbon,label:false,color:'#987950',category:'culture',description,sections:[{title:title1,text:text1},{title:title2,text:text2}],note,sources:refs.map(r=>r[0]),source:refs[0][0],sourceLabels:Object.fromEntries(refs),related,approx,evidence:'Source-checked historical interpretation'});
    pinyin[nameZh]=pronunciation; pinyin[han]=glyphPronunciation;
  };
  add('orchid-pavilion','Wang Xizhi and the Orchid Pavilion','王羲之与兰亭','兰亭','Wáng Xīzhī yǔ Lántíng','Lántíng',353,353,'jin-early',true,
    'In 353, Wang Xizhi joined a spring purification gathering associated with the Orchid Pavilion. Drinking, composing poems and exchanging writing made sociability a literary event. His preface became a touchstone of calligraphy, although the original manuscript no longer survives. What we see today belongs to a long history of copying and admiration.',
    'Cultivation was a social practice',
    'The gathering connected literary accomplishment to a circle of participants rather than to a solitary act of genius. Shared occasions produced poems; the preface gave the occasion a durable form. Later paintings made these cultivated gatherings into exemplary scenes. The historical significance lies partly in that transformation: one meeting became a model through which later educated people imagined friendship, taste and their own place in a cultural tradition.',
    'A canon sustained through copies',
    'Tracing, copying and carving transmitted Wang’s reputation while changing the material form in which his work could be encountered. The loss of the autograph therefore poses a productive question: what exactly were later viewers learning to admire? The answer includes inherited judgments and chains of reproduction as well as the apparent movement of a brush. A surviving copy is evidence of that transmission, not direct access to Wang’s hand.',
    '353 dates the remembered gathering. Surviving versions are later copies or reproductions; the autograph’s burial with Tang Taizong is a tradition, not a verified archaeological finding.',
    [['https://www.tnm.jp/150th/project/202301/exhibition_ougishiandranteijyo_en.html','Tokyo National Museum · Wang Xizhi and the Orchid Pavilion'],['https://searchcollection.asianart.org/objects/19323/orchid-pavilion-preface-lanting-xu-in-cursive-script-caos','Asian Art Museum · A later Orchid Pavilion preface']],['jin-early','tao-yuanming']);
  add('mogao-caves','Mogao: a religious archive at a crossroads','莫高窟','莫高','Mògāo Kū','Mògāo',366,366,'division',false,
    'Tradition dates the beginning of the Mogao caves near Dunhuang to 366, when a monk’s vision inspired a sanctuary. The complex grew through many subsequent regimes. Its paintings, sculpture and manuscripts preserve a religious landscape made by donors, artists, monks and travellers whose connections extended far beyond any single Chinese dynasty.',
    'Exchange required local institutions',
    'Dunhuang’s position on routes linking China and Central Asia mattered because people there sustained institutions that could receive and reshape travelling texts and images. Cave commissions made devotion visible and durable. The resulting art is neither a simple import from India nor the expression of an isolated national culture. Its changing forms reveal selective borrowing and the ambitions of local patrons across generations.',
    'An archive with an unusual survival history',
    'The manuscript chamber discovered in 1900 transformed knowledge of the region. Its varied languages and documents allow historians to connect religious practice with administration and everyday activity. Yet accidental survival creates its own bias: the chamber is a particular accumulation, not a representative sample of every community along the routes. Monuments and manuscripts must be read together, with attention to why things were commissioned, preserved and eventually dispersed.',
    '366 is the traditional foundation date associated with a vision narrative. The surviving complex developed over centuries; this point is not the construction date of every cave.',
    [['https://whc.unesco.org/en/list/440/','UNESCO · Mogao Caves'],['https://www.getty.edu/news/the-global-multicultural-past-of-dunhuang/','Getty · The global, multicultural past of Dunhuang']],['yungang-caves','sutra'],true);
  add('kumarajiva-translations','Kumarajiva and collaborative translation','鸠摩罗什译经','译经','Jiūmóluóshí yìjīng','Yìjīng',401,401,'division',true,
    'Kumarajiva reached Chang’an around 401 and directed Buddhist translation under Later Qin patronage. A scholar from Kucha, he had travelled through a world shaped by competing rulers and military coercion. His Chinese texts emerged from collective work with monks and assistants, helping establish a vocabulary through which Buddhist arguments could be studied and debated.',
    'Translation was an institution',
    'Producing a scripture required more than replacing words. Oral explanation, discussion, recording and revision connected knowledge of the source tradition to command of written Chinese. Court support supplied resources and a setting for this work. The famous translator’s name can obscure these collaborators; it can also obscure how political fragmentation created competing centres of religious sponsorship rather than simply interrupting cultural life.',
    'Readable texts changed intellectual possibilities',
    'The lasting influence of translations associated with Kumarajiva came from their circulation and adoption by communities of readers. Their language made difficult teachings available for commentary, disagreement and ritual use. This was an active reconstruction of meaning across languages. Historical analysis must consequently distinguish a translation’s later authority from certainty about its authorship: catalogues accumulated attributions, and not every text carrying Kumarajiva’s name can be assigned to him with equal confidence.',
    '401 is the conventional arrival anchor, sometimes rendered early 402 through calendar conversion. Translation continued afterward; later catalogues disagree on the corpus and totals.',
    [['https://eprints.soas.ac.uk/23582/1/Shi_4296.pdf','SOAS · Study of Kumarajiva and translation'],['https://agamaresearch.dila.edu.tw/wp-content/uploads/2025/12/Palumbo-2013.pdf','Antonello Palumbo · Early Chinese Buddhist translation and its setting']],['division','xuanzang-return'],true);
  add('tao-yuanming','Tao Yuanming: withdrawal and its afterlife','陶渊明','陶渊明','Táo Yuānmíng','Táo Yuānmíng',400,427,'jin-early',false,
    'Tao Yuanming, also known as Tao Qian, wrote about rural life, poverty and the choices involved in leaving official service. His return home in 405 became an especially influential subject. The apparent simplicity of his poetry helped make him a model of integrity, but that reputation was constructed through centuries of reading and revision.',
    'Refusing office was a consequential choice',
    'Retirement could be represented as a recovery of personal freedom from the compromises of government employment. Tao’s writing made the household and cultivated land into settings for that argument. It should not be treated as a transparent portrait of all rural society. The author’s concerns and literary choices determine what appears; later admirers could turn an individual’s difficult circumstances into a reassuring ideal of voluntary simplicity.',
    'Readers helped produce the poet',
    'Xiaofei Tian’s study of manuscript transmission shows how copying and editorial decisions altered the Tao encountered by later readers. Paintings of his homecoming added further interpretations: artists living through dynastic conquest could see their own dilemmas in his withdrawal. The historical object is therefore both a fifth-century body of writing and the continuing work of making that writing exemplify a moral life.',
    'About 400–427 marks the mature writing period, not a precise career boundary. Tao’s birth year is uncertain. His 405 retirement is more securely anchored than later anecdotes about his motives.',
    [['https://ealc.fas.harvard.edu/publication/tao-yuanming-and-manuscript-culture-record-dusty-table','Xiaofei Tian · Tao Yuanming and Manuscript Culture'],['https://www.metmuseum.org/art/collection/search/40311','Metropolitan Museum of Art · Ode on Returning Home']],['orchid-pavilion','jin-early'],true);
  add('yungang-caves','Yungang: Buddhism and imperial sponsorship','云冈石窟','云冈','Yúngāng Shíkū','Yúngāng',460,525,'north-south',true,
    'The principal Yungang cave programme near the Northern Wei capital developed between about 460 and 525. Monumental Buddhas, including the five caves associated with the monk Tanyao, joined religious devotion to imperial sponsorship. Their scale makes visible the resources that rulers could direct toward sacred building and the legitimacy they sought through it.',
    'Political authority acquired a sacred setting',
    'A cave complex required sustained organization of labour, materials and skilled carving. Imperial participation made patronage part of the public representation of government. This does not mean Buddhist belief was merely a political disguise. The analytical point is that devotion and power could reinforce one another: supporting the religion created both religious merit and an enduring image of a court able to command extraordinary work.',
    'New forms emerged from connected worlds',
    'Yungang combined artistic conventions associated with South and Central Asia with local preferences. These were choices made by patrons and workshops, not stages in an inevitable progression from foreign to Chinese. Reading the changing carvings alongside the Northern Wei’s shifting political centre shows that cultural adaptation operated through institutions, movement and craftsmanship. A dynasty’s identity was being made in such commissions, rather than simply illustrated by them.',
    '460–525 describes the main early programme conventionally identified by UNESCO; individual caves have their own chronologies, and subsequent work continued.',
    [['https://whc.unesco.org/en/list/1039/','UNESCO · Yungang Grottoes'],['https://www.getty.edu/conservation/publications_resources/pdf_publications/pdf/silkroad6_b.pdf','Getty Conservation Institute · Buddhist cave sites and the Silk Road']],['north-south','longmen-caves'],true);
  add('longmen-caves','Longmen: patrons, inscriptions and sacred space','龙门石窟','龙门','Lóngmén Shíkū','Lóngmén',494,750,'north-south',false,
    'Longmen’s most intensive carving extended from the late fifth century to the middle of the eighth, near the capital of Luoyang. Northern Wei and Tang commissions produced a landscape of Buddhist images and inscriptions. This long chronology matters: Longmen records repeated investments by changing patrons, rather than a single ruler’s completed artistic programme.',
    'Monuments recorded relationships',
    'Imperial donor processions at Binyang represented rulers approaching the Buddha, making their patronage part of the sacred setting. Inscriptions across the site preserve further evidence of commissions and aspirations. Artistic style can help date a carving, but the historical questions extend to who paid, who was commemorated and which claims the image made. Religious spaces organized relationships between the living, the dead and political authority.',
    'The surviving site is a layered archive',
    'Medical prescriptions inscribed at Yaofangdong reveal concerns that a purely aesthetic account would miss. Changes across the caves also expose successive decisions rather than a uniform tradition. Modern removal complicates interpretation further: donor reliefs now displayed abroad once belonged to larger spatial arrangements. Reconstructing their setting restores connections between figures, architecture and worship that an isolated museum object cannot fully preserve.',
    'About 494–750 marks the main commissioning period, not an exact foundation or closure. Work at individual caves spans different dates; later additions and damage also shape what survives.',
    [['https://whc.unesco.org/en/list/1003/','UNESCO · Longmen Grottoes'],['https://caea.lib.uchicago.edu/dcadp/en/longmenbcc/introduction/','University of Chicago · Longmen Binyang Central Cave']],['yungang-caves','wu-zhou'],true);
  add('tang-code','Tang Code: making hierarchy legally explicit','唐律疏议','唐律','Táng Lǜ Shūyì','Táng Lǜ',653,653,'tang',true,
    'The official commentary completed in 653 helped establish the Tang Code’s authoritative form. It explained how statutes should be understood and applied, joining rules about punishable conduct to principles governing adjudication. The surviving code offers unusually detailed evidence of how an imperial government imagined social order; it does not provide a complete record of how every dispute was actually decided.',
    'Precision did not require equality',
    'Penalties depended on conduct and on legally defined relationships. Kinship, rank and position could change the meaning of an offence and its punishment. This was a systematic way of making hierarchy enforceable, rather than a failure to notice hierarchy. The commentary matters because officials needed guidance when rules and relationships intersected: legal reasoning translated a complex social order into categories that an administration could use.',
    'A durable model with limits as evidence',
    'Later Chinese codes and legal systems elsewhere in East Asia drew on Tang precedents. Their influence shows the portability of administrative techniques as well as cultural prestige. Yet a code prescribes; it does not automatically describe ordinary experience. Assessing enforcement requires other evidence about officials, litigation and local circumstances. The text’s coherence should therefore be studied alongside the practical distance between a written norm and a particular judgment.',
    '653 dates the commentary, not the invention of Chinese law or the first Tang code. Earlier Tang revisions and older dynastic precedents supplied its foundations.',
    [['https://www.degruyterbrill.com/document/doi/10.1515/9781400864591/html','Wallace Johnson · The T’ang Code, Volume II'],['https://www.tandfonline.com/doi/full/10.1080/2049677X.2019.1685748','Comparative Legal History · Kinship and property in preindustrial China']],['tang','reunification']);
  add('li-bai-du-fu','Li Bai and Du Fu: poetry within history','李白与杜甫','诗歌','Lǐ Bái yǔ Dù Fǔ','Shīgē',740,770,'tang',true,
    'Li Bai and Du Fu wrote within networks of friendship, travel, patronage and political ambition. Their contrasting later reputations can conceal this shared social world. Poems from the decades around the An Lushan rebellion preserve powerful responses to displacement and frustrated hopes, while remaining carefully made literary works addressed to particular occasions and readers.',
    'Poetry did work in society',
    'A poem could seek recognition, maintain a friendship, commemorate a journey or comment on service to the state. Literary achievement was therefore connected to access and reputation. Reading poems in sequence and in their surviving contexts reveals a wider range than the familiar opposition between an inspired wanderer and a sober witness to suffering. Humour, technical experiment and intimate exchange also belonged to their writing.',
    'Experience became history through form',
    'Du Fu’s accounts of war are valuable because they show how catastrophe was experienced and interpreted, not because verse functions as a census. Selection, allusion and the speaking voice shape what readers encounter. Later anthologies and commentary then elevated particular works into national classics. The historian must follow both processes: the making of a poem within Tang circumstances and the making of its authority long afterward.',
    'About 740–770 locates the mature poetic world of the two writers; it is not their shared lifespan. Li Bai died in 762 and Du Fu in 770. Individual poem dates can be disputed.',
    [['https://loch.hsites.harvard.edu/volumes','Harvard Library of Chinese Humanities · The Poetry of Du Fu'],['https://poesie-tang.unige.ch/','University of Geneva · Tang poetry texts and translations'],['https://www.gushiwen.cn/shiwens/default.aspx?tstr=三吏三别','古诗文网 · 杜甫《三吏三别》']],['an-lushan','tang'],true);
  add('tang-women-riding','Tang women, riding and the limits of visibility','唐代女性与骑乘','骑乘','Tángdài Nǚxìng yǔ Qíchéng','Qíchéng',700,750,'tang',false,
    'Tang tomb figures include women on horseback, and evidence of equestrian sport places some women within an active courtly culture. These images complicate assumptions that elite women were always secluded. They also demand attention to class: possessing horses, leisure and elaborate burial goods depended on resources unavailable to much of the population.',
    'Agency depended on setting and status',
    'Riding and polo could make women conspicuous participants in elite life. Courtly fashion and the prestige of horses helped define that setting. Such evidence supports a specific claim about opportunities and conduct in privileged circles. It cannot establish universal freedom, equal legal standing or the experience of women working in poorer households. Different forms of power and restriction could coexist within the same society.',
    'Tomb figures represent desired worlds',
    'Burial objects were selected to furnish or evoke an afterlife and to express the standing of the deceased. They are consequently mediated evidence, not miniature photographs of ordinary streets. Their clothing and posture can still be studied carefully alongside other objects and texts. The strongest interpretation asks both what activities were imaginable and what a patron wanted a burial assemblage to communicate about wealth, companionship and cultivated life.',
    'About 700–750 is a contextual range for this card, not a single emancipation event. The cited objects span the seventh and eighth centuries and chiefly illuminate elite representation.',
    [['https://art.thewalters.org/object/49.2328/','Walters Art Museum · Women on horseback'],['https://resources.metmuseum.org/resources/metpublications/pdf/Spirit_and_Ritual_The_Morse_Collection_of_Ancient_Chinese_Art.pdf','Metropolitan Museum of Art · Spirit and Ritual, equestrienne catalogue entry']],['tang','wu-zhou'],true);
  add('lu-yu-tea','Lu Yu: turning tea into an art of judgment','陆羽与茶经','茶经','Lù Yǔ yǔ Chájīng','Chájīng',760,780,'tang',false,
    'Lu Yu’s Tea Classic brought the plant, its processing, utensils, water and preparation into a sustained written account during the later eighth century. Tea drinking already existed. His contribution lay in organizing practical knowledge and aesthetic judgment into a text that later readers could treat as authoritative, helping give an everyday substance a distinguished cultural genealogy.',
    'Taste rested on material choices',
    'The book’s attention to production and preparation prevents tea culture from being reduced to an abstract ideal of serenity. A drink depended on cultivation, processing, fuel, water and implements. Standards of taste linked these material conditions to the trained judgment of a drinker. This is an example of cultural authority forming through detailed knowledge of things, rather than through literary prestige alone.',
    'A classic is a prescription, not a survey',
    'Lu Yu’s instructions tell us how an expert wanted tea understood and prepared. They do not establish that every household followed his practices. Later rituals and identities accumulated around the text, making its authority larger than its original audience. The historical task is to separate that long reception from Tang circumstances while asking how a practical manual could become a resource for connoisseurship and social distinction.',
    'About 760–780 is an approximate composition and development range; 780 is a common completion convention. The card does not claim that Lu Yu invented tea drinking or a timeless, uniform tea ceremony.',
    [['https://www.nmns.edu.tw/en/our-research/featured/Collection-E00282/','National Museum of Natural Science · Tea Classic'],['https://www.boutiquesdemusees.fr/en/ext/product/guimet-musee-national-des-arts-asiatiques/38731-the-classic-of-tea-lu-yu.html','Guimet museum book catalogue · The Classic of Tea']],['tang','li-bai-du-fu'],true);
  add('southward-economic-shift','China’s economic centre moves south','经济重心南移','南','jīng jì zhòng xīn nán yí','nán',750,1250,'tang',true,
    'War in northern China accelerated a movement of people and economic activity toward the Yangtze basin. After the An Lushan Rebellion, the Tang court increasingly depended on the southeast. Over the following centuries, southern farms, waterways and commercial cities helped make the region China’s economic centre.',
    'People, rice and waterways',
    'Refugees fleeing northern warfare contributed to southern growth, building on migrations that had begun centuries earlier. During the Song, improved irrigation and new rice varieties increased production. Rivers and canals carried grain and other goods between specialized producers and expanding markets. The Yangtze basin, especially the lower river region and its delta, became central to feeding cities and supporting the state.',
    'Chang’an and the western routes',
    'Chang’an stood in Guanzhong, around the Wei River valley. The Hexi Corridor lay farther northwest. Tibetan expansion weakened Tang control of that route after the rebellion. Chang’an nevertheless remained the capital until the court was forced to Luoyang in 904. Political control and communication changed, but western exchange continued: Dunhuang remained an active trading and religious centre.',
    'c. 750–1250 is an approximate window for a major phase of the Tang–Song economic transformation, not the start and finish of a single migration. Earlier southward migrations preceded the An Lushan Rebellion. The decline of Tang control in the northwest did not end trade or cultural exchange with the Western Regions.',
    [['https://www.cambridge.org/core/books/abs/economic-history-of-china/economic-transformation-in-the-tangsong-transition-755-to-1127/55D49F02EE80100AC5A4D9FA3CC04FA1','Richard von Glahn · Economic transformation in the Tang–Song transition'],['https://courses.edx.org/c4x/HarvardX/SW12.4x/asset/Week_16_Transcript.pdf','Harvard ChinaX · Tang fiscal change and migration'],['https://afe.easia.columbia.edu/songdynasty-module/tech-rice.html','Columbia University · Rice cultivation and the southern economy'],['https://en.unesco.org/silkroad/content/dunhuang','UNESCO · Dunhuang and continuing Silk Road exchange'],['https://www.mea.gov.in/images/pdf/India-ChinaEncyclopedia_Vol-2.pdf','India–China Encyclopedia of Cultural Contacts · Chang’an']],
    ['an-lushan','sui-grand-canal','tang','song','jingkang'],true);
  const southward = events.find(event => event.id === 'southward-economic-shift');
  southward.dateLabel = 'c. 750–1250 · a gradual transformation';
  southward.dateReview = {status:'approximate',note:southward.note,sources:[southward.sources[0]]};
  events.push({
    "id": "chang-an",
    "name": "Chang'an",
    "nameZh": "长安",
    "han": "长安",
    "start": -202,
    "end": 904,
    "parent": "tang",
    "ribbon": false,
    "label": false,
    "color": "#987950",
    "category": "culture",
    "description": "Chang'an (长安 Cháng'ān) was one of China's great imperial capitals. The [[id:han|Han (汉 Hàn)]] and [[id:tang|Tang (唐 Táng)]] governed from cities bearing this name, centuries apart, and later rulers returned to it as a place associated with the founding and restoration of empire. Its history includes periods of conquest, divided rule and rebuilding. Today's Xi'an (西安 Xī'ān) preserves remains from several of these eras.",
    "sections": [
      {
        "title": "Qin and Han beginnings",
        "text": "The [[id:qin|Qin (秦 Qín)]] ruled their empire from Xianyang (咸阳 Xiányáng). After the Qin fell, the Han made Chang'an their capital. Around 202 BCE, the founder of the [[id:catalog-R_HAN_W|Western Han (西汉 Xī Hàn)]] began establishing a capital there. Han rulers built palace compounds, offices and ceremonial spaces through which the emperor governed a growing empire. The city gave a durable form to the authority of the new dynasty. Han missions and exchanges with Central Asia also made Chang'an an important centre in the connections later called the Silk Roads.\n\nChang'an was the Western Han capital for roughly two centuries. Court audiences, appointments and rituals brought officials and envoys into the emperor's presence. After Wang Mang (王莽 Wáng Mǎng) seized the throne in 9 CE, he also ruled from Chang'an. Warfare at the end of his reign devastated the capital in 23 CE. The restored Eastern Han court settled at Luoyang (洛阳 Luòyáng), ending Chang'an's first long period as the centre of imperial government."
      },
      {
        "title": "A capital in a divided China",
        "text": "Chang'an continued to matter during centuries when several states competed to rule China. It became the capital of kingdoms including Former Qin (前秦 Qián Qín) and Later Qin (后秦 Hòu Qín). These courts used the old imperial city to support their own claims to power. Their rule also brought religious teachers and texts to the capital.\n\nThe Buddhist scholar [[id:kumarajiva-translations|Kumarajiva (鸠摩罗什 Jiūmóluóshí)]] arrived in the early fifth century under Later Qin patronage. Working with monks and assistants, he produced Chinese translations of Buddhist scriptures that circulated far beyond the court that supported them. Chang'an's importance as a centre of learning continued through changes of dynasty. Northern Zhou (北周 Běi Zhōu) later ruled from the city, and the Sui inherited its capital when they took power in 581."
      },
      {
        "title": "The Sui and Tang capital",
        "text": "The [[id:sui|Sui (隋 Suí)]] ordered a new capital, Daxingcheng (大兴城 Dàxīngchéng), in 582. The new city became the centre of the Sui empire. The Tang took it over in 618 and restored the name Chang'an. Its government compounds, palace courts, markets and residential wards made the divisions of imperial society visible. The city had 108 walled residential wards.\n\nThe Tang court received envoys, appointed officials and sponsored religious institutions in the capital. Buddhist and Daoist temples stood alongside communities of Zoroastrians, Manichaeans and East Syriac Christians. Japanese and Korean visitors came to study at court academies and Buddhist institutions. Some travelled voluntarily; some royal and noble sons were sent as hostages. Learning, worship and imperial power all brought people to Chang'an."
      },
      {
        "title": "Life in the Tang city",
        "text": "Ward gates closed at night. Residents could move within their own ward, but travel outside it after dark required recognised grounds, such as medical need or authorised official business. The two official markets opened at midday and closed at dusk. Supervisors checked measures, money and merchandise, recorded transactions and sought to prevent price collusion.\n\nDaily business also took place inside the wards. Residents could buy bread and pastries while the official markets were shut. Inns, workshops, food and wine sellers, scripture copyists and teahouses supplied the city. Chang'an was home to these workers and customers as well as the court, its officials and foreign visitors."
      },
      {
        "title": "After the Tang",
        "text": "Chang'an remained an important city after the [[id:an-lushan|rebellion of An Lushan (安禄山 Ān Lùshān)]]. [[id:huang-chao|Huang Chao (黄巢 Huáng Cháo)]] occupied it in the early 880s, during the wars that broke the Tang government's power. In 904 the court was forced to move to Luoyang. Chang'an's long history as a principal imperial capital came to an end, although the city continued to be inhabited and governed.\n\nUnder later dynasties it was a regional administrative centre. It acquired the name Xi'an under the Ming (明 Míng), whose city walls survive in rebuilt and restored form. The Han and Tang capitals remain part of its identity through palace sites, temples, excavated objects and museums. The name Chang'an recalls several successive capitals, each rebuilt and reshaped by the people who ruled and lived there."
      }
    ],
    "note": "The dates span successive imperial capital eras, from the Western Han foundation around 202 BCE to the Tang court’s transfer in 904. Chang’an was not continuously an imperial capital; later Xi’an continued as a regional centre.",
    "dateLabel": "c. 202 BCE–904 · imperial capital eras",
    "sources": [
      "https://history.stanford.edu/publications/early-chinese-empires-qin-and-han",
      "https://history.stanford.edu/publications/chinas-cosmopolitan-empire-tang-dynasty",
      "https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B",
      "https://www.jstor.org/stable/j.ctv1cbn3m5",
      "https://commons.wikimedia.org/wiki/File:Chang%27an_of_Tang.jpg",
      "https://whc.unesco.org/en/list/1442/",
      "https://www.mea.gov.in/images/pdf/India-ChinaEncyclopedia_Vol-1.pdf"
    ],
    "source": "https://history.stanford.edu/publications/early-chinese-empires-qin-and-han",
    "sourceLabels": {
      "https://history.stanford.edu/publications/early-chinese-empires-qin-and-han": "Mark Edward Lewis · The Early Chinese Empires: Qin and Han",
      "https://history.stanford.edu/publications/chinas-cosmopolitan-empire-tang-dynasty": "Mark Edward Lewis · China’s Cosmopolitan Empire: The Tang Dynasty",
      "https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B": "Patricia Buckley Ebrey · The Cambridge Illustrated History of China",
      "https://www.jstor.org/stable/j.ctv1cbn3m5": "F. W. Mote · Imperial China 900–1800",
      "https://commons.wikimedia.org/wiki/File:Chang%27an_of_Tang.jpg": "Wikimedia Commons · Tang Chang’an ward-grid reconstruction",
      "https://whc.unesco.org/en/list/1442/": "UNESCO · Silk Roads: the Routes Network of Chang’an–Tianshan Corridor",
      "https://www.mea.gov.in/images/pdf/India-ChinaEncyclopedia_Vol-1.pdf": "India–China Encyclopedia of Cultural Contacts · Buddhist translation"
    },
    "related": [
      "han",
      "tang",
      "qin",
      "catalog-R_HAN_W",
      "kumarajiva-translations",
      "sui",
      "an-lushan",
      "huang-chao"
    ],
    "approx": true,
    "evidence": "Source-checked historical interpretation"
  });
  pinyin["长安"] = "Cháng'ān";
  return {events,revisions:{},pinyin};
})();
if (typeof module !== 'undefined') module.exports = MEDIEVAL_CULTURE;
