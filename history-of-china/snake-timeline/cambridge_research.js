/* Additions selected after comparing every chapter of Ebrey's third edition with the existing atlas. */
const CAMBRIDGE_RESEARCH = (() => {
  const book = 'https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B';
  const events = [], pinyin = {};
  function add(card) {
    const sources = [book, card.secondSource];
    events.push({
      ...card,
      color: card.category === 'culture' ? '#987950' : '#9e3c2e',
      ribbon: true,
      label: false,
      sources,
      source: book,
      sourceLabels: {
        [book]: `Patricia Buckley Ebrey · The Cambridge Illustrated History of China, 3rd ed. · ${card.cambridge.page}`,
        [card.secondSource]: card.secondSourceLabel
      },
      dateReview: { status: card.approx ? 'qualified' : 'confirmed', note: card.note, sources },
      evidence: 'Cambridge chapter comparison and independent source check'
    });
    delete events.at(-1).secondSource;
    delete events.at(-1).secondSourceLabel;
    pinyin[card.nameZh] = card.pronunciation;
    pinyin[card.han] = card.glyphPronunciation;
    delete events.at(-1).pronunciation;
    delete events.at(-1).glyphPronunciation;
  }

  add({
    id: 'sanxingdui-pits', name: 'Sanxingdui ritual pits', nameZh: '三星堆祭祀坑', han: '堆',
    pronunciation: 'sān xīng duī jì sì kēng', glyphPronunciation: 'duī',
    start: -1200, end: -950, parent: 'shang', category: 'culture', approx: true,
    dateLabel: 'c. 1200–950 BCE',
    description: 'At Sanxingdui in Sichuan, archaeologists found pits filled with bronze heads and masks, gold, jade, elephant tusks and other objects. Many pieces had been burned or broken before burial. The finds came from a large walled city whose ritual life differed sharply from the Shang centre at Anyang.',
    sections: [
      {title: 'A powerful centre beyond Anyang', text: 'Sanxingdui had advanced bronze casting and access to expensive materials, but it left no readable archive like the Shang oracle bones. Its rulers and beliefs must be studied through buildings and objects. The site prevents the written record of one court from standing in for every Bronze Age society in the region.'},
      {title: 'The pits were not one event', text: 'Recent excavations identify several deposits made at different times. Archaeologists still debate exactly what ceremonies produced them and whether every pit should be called sacrificial. The dates on this card cover the main deposits, not a single destruction or burial.'}
    ],
    note: 'The principal deposits date roughly from 1200 to 1000 BCE, with some material possibly extending to about 950 BCE. Sanxingdui lay outside direct Shang rule.',
    related: ['shang', 'western-zhou'],
    cambridge: {chapter: 1, page: 'p. 32', epubSection: 'cBS.xhtml'},
    secondSource: 'https://www.cambridge.org/core/journals/antiquity/article/new-discoveries-at-the-sanxingdui-bronze-age-site-in-southwest-china/D96494368471CF7CBA817690CDCA5A75',
    secondSourceLabel: 'Antiquity · New discoveries at Sanxingdui'
  });

  add({
    id: 'fu-hao', name: 'Fu Hao: Shang commander and royal consort', nameZh: '妇好', han: '妇',
    pronunciation: 'fù hǎo', glyphPronunciation: 'fù',
    start: -1250, end: -1250, parent: 'shang', category: 'culture', approx: true,
    dateLabel: 'c. 1250 BCE',
    description: 'Fu Hao was a consort of the Shang king Wu Ding, a military commander and a participant in court ritual. Oracle-bone inscriptions record her leading campaigns and receiving royal instructions. Her tomb at Anyang survived unlooted, preserving weapons, ritual bronzes, jades and objects bearing her name.',
    sections: [
      {title: 'Written and archaeological evidence meet', text: 'The inscriptions identify Fu Hao in the activities of the royal house; the tomb records the objects and sacrifices assembled for her burial. Together they provide an unusually detailed account of one Shang woman. They do not establish that other women held the same rank or authority.'},
      {title: 'The burial displays wealth and office', text: 'More than two hundred bronze vessels and a large collection of weapons were buried with her. The objects link military command, ritual duty and royal status. They also show how much labour and material an elite burial could command.'}
    ],
    note: 'Ebrey dates Fu Hao’s tomb to about 1250 BCE. Museum sources often use about 1200 BCE or the broader thirteenth century BCE. The exact year is not known.',
    related: ['shang', 'oracle'],
    cambridge: {chapter: 1, page: 'p. 30', epubSection: 'cBS.xhtml'},
    secondSource: 'https://smarthistory.org/tomb-of-fu-hao/',
    secondSourceLabel: 'Smarthistory · The tomb of Fu Hao'
  });

  add({
    id: 'qin-han-south', name: 'Qin–Han expansion into the south', nameZh: '秦汉南方扩张', han: '南',
    pronunciation: 'qín hàn nán fāng kuò zhāng', glyphPronunciation: 'nán',
    start: -214, end: 140, parent: 'catalog-S_QH', category: 'event', approx: true,
    dateLabel: 'c. 214 BCE–140 · major phase',
    description: 'Qin armies moved into Lingnan and created commanderies there around 214 BCE. After Qin collapsed, the kingdom of Nanyue ruled much of the region until Han conquest in 111 BCE. Military settlement, government offices and migration tied more of the south to the imperial state, often through coercion and negotiation with established communities.',
    sections: [
      {title: 'Conquest did not settle control at once', text: 'Nanyue kept its own kings and combined institutions inherited from Qin with local and regional ties. Han victory ended that kingdom, but effective rule still depended on officials, transport, settlers and local cooperation. A boundary drawn after conquest cannot measure how deeply government reached.'},
      {title: 'Migration changed the imperial centre of gravity', text: 'Population moved south over many generations, bringing new land into cultivation and enlarging tax registers. Existing peoples did not simply disappear. The resulting society joined migration, intermarriage, conflict and cultural change rather than copying northern China intact.'}
    ],
    note: 'The range joins several developments: Qin conquest around 214 BCE, Han conquest of Nanyue in 111 BCE and continued migration through the second century. It was not one continuous war.',
    related: ['qin', 'han'],
    cambridge: {chapter: 3, page: 'pp. 85–87', epubSection: 'c10U.xhtml'},
    secondSource: 'https://www.metmuseum.org/exhibitions/listings/2017/age-of-empires/exhibition-galleries',
    secondSourceLabel: 'Metropolitan Museum of Art · Qin and Han expansion'
  });

  add({
    id: 'faxian-journey', name: 'Faxian’s journey to India', nameZh: '法显西行', han: '行',
    pronunciation: 'fǎ xiǎn xī xíng', glyphPronunciation: 'xíng',
    start: 399, end: 414, parent: 'division', category: 'culture',
    description: 'The Buddhist monk Faxian left China in 399 to seek monastic rules and other texts in India. He travelled overland through Central Asia, visited places associated with the Buddha and returned by sea through Sri Lanka and Southeast Asia. His written account described India as a complex and civilized society rather than a distant abstraction.',
    sections: [
      {title: 'A journey driven by missing texts', text: 'Chinese Buddhist communities already had scriptures and institutions, but monks knew that their collections were incomplete. Faxian sought material that could settle questions about monastic discipline. The trip joined religious study to the physical work and danger of crossing deserts, mountains and seas.'},
      {title: 'Travel writing widened the record', text: 'Faxian noted monasteries, cities, rulers and social customs across the places he visited. His account preserves one traveller’s observations and judgments, not a neutral survey of South Asia. It also records exchange moving in more than one direction: a Chinese monk travelled abroad, selected texts and brought them home for translation.'}
    ],
    note: 'Ebrey dates the full journey to 399–414. Some shorter biographies give 412 for Faxian’s return to China; 414 includes the last stage before he settled at Jiankang.',
    related: ['division', 'kumarajiva-translations', 'xuanzang-return'],
    cambridge: {chapter: 4, page: 'p. 106', epubSection: 'c1B7.xhtml'},
    secondSource: 'https://depts.washington.edu/silkroad/texts/faxian.html',
    secondSourceLabel: 'University of Washington · The journey of Faxian'
  });

  add({
    id: 'song-footbinding', name: 'Footbinding spreads among Song elites', nameZh: '缠足', han: '足',
    pronunciation: 'chán zú', glyphPronunciation: 'zú',
    start: 1000, end: 1279, parent: 'song', category: 'culture', approx: true,
    dateLabel: 'c. 1000–1279 · gradual spread',
    description: 'Footbinding probably began among dancers or entertainers in the tenth or eleventh century, then spread among elite families. By the Southern Song, some girls had their feet tightly bound from early childhood. Small feet became associated with beauty and status, at the cost of pain and permanent physical change.',
    sections: [
      {title: 'The practice spread unevenly', text: 'Footbinding was never universal. Region, class, labour and community customs affected whether families adopted it. Early evidence comes disproportionately from elite writing and burials, so it cannot describe every household or fix one date when the practice began.'},
      {title: 'Bodies carried social expectations', text: 'Binding shaped movement, clothing and ideas about respectable femininity. Families could treat it as a requirement for a suitable marriage, even when the process harmed girls. That pressure made the custom durable without requiring a law that ordered all women to follow it.'}
    ],
    note: 'The range marks the spread of footbinding during the Song, not a dated invention. Surviving evidence is strongest for elite women and varies by region.',
    related: ['song'],
    cambridge: {chapter: 6, page: 'p. 160', epubSection: 'c1Y7.xhtml'},
    secondSource: 'https://mcclungmuseum.utk.edu/exhibitions/bound-to-be-beautiful-foot-binding-in-ancient-china/',
    secondSourceLabel: 'McClung Museum · Footbinding in China'
  });

  add({
    id: 'yuan-drama', name: 'Guan Hanqing and Yuan drama', nameZh: '关汉卿与元杂剧', han: '剧',
    pronunciation: 'guān hàn qīng yǔ yuán zá jù', glyphPronunciation: 'jù',
    start: 1279, end: 1300, parent: 'yuan', category: 'culture', approx: true,
    dateLabel: 'Late thirteenth century',
    description: 'Commercial theatre flourished under the Yuan. Guan Hanqing wrote plays for this world, including The Injustice to Dou E, in which a young widow accepts a false murder confession to protect her mother-in-law. The story turns a corrupt legal judgment into a demand for recognition and redress.',
    sections: [
      {title: 'Drama reached audiences through performance', text: 'A play combined sung arias, speech, gesture and familiar stage roles. Printed texts preserve scripts, but performance depended on actors, musicians and local audiences. Theatre belonged to urban commercial life as well as to later literary study.'},
      {title: 'Dou E puts justice on trial', text: 'Before her execution, Dou E predicts signs that will prove her innocence. The plot uses supernatural confirmation because the courts have failed her. Her father eventually reviews the case and punishes the real offenders, but official correction cannot restore the life already taken.'}
    ],
    note: 'Guan Hanqing’s life dates and the dates of individual plays are uncertain. The late thirteenth century is a working range for his activity, not a complete Yuan theatrical chronology.',
    related: ['yuan', 'catalog-C_BEIJING_YUAN'],
    cambridge: {chapter: 7, page: 'pp. 198–199', epubSection: 'c29U.xhtml'},
    secondSource: 'https://cup.columbia.edu/book/the-columbia-anthology-of-yuan-drama/9780231122672/',
    secondSourceLabel: 'Columbia University Press · Yuan drama anthology'
  });

  add({
    id: 'hongwu-chancellor', name: 'Hongwu abolishes the chancellorship', nameZh: '废除丞相制', han: '权',
    pronunciation: 'fèi chú chéng xiàng zhì', glyphPronunciation: 'quán',
    start: 1380, end: 1380, parent: 'ming', category: 'event',
    description: 'In 1380, the Hongwu emperor accused his chief councillor Hu Weiyong of treason and abolished the top chancellery offices. The emperor took direct control of the ministries instead of appointing another chancellor. Later Ming emperors inherited a government with more authority concentrated at the throne.',
    sections: [
      {title: 'A purge changed the structure of government', text: 'Hu Weiyong’s execution began a much wider purge that killed many officials and their relatives. The case removed rivals, but its institutional result lasted longer than the immediate accusations. No later Ming official formally held the old chancellor’s authority.'},
      {title: 'More control brought more work', text: 'Direct rule gave the emperor extraordinary access to decisions across the government. It also created a practical problem: one person could not read and decide every matter alone. Grand secretaries and palace eunuchs later gained influence by controlling documents and access, even though neither group simply recreated the abolished office.'}
    ],
    note: '1380 dates Hu Weiyong’s execution and the abolition of the Central Secretariat and chancellery. The associated purge continued afterward.',
    related: ['ming', 'catalog-E_MING_EUNUCH_1', 'catalog-E_MING_EUNUCH_2'],
    cambridge: {chapter: 8, page: 'p. 203', epubSection: 'c2KZ.xhtml'},
    secondSource: 'https://www.dpm.org.cn/court/system/236422.html',
    secondSourceLabel: 'Palace Museum · Ming central administration'
  });

  add({
    id: 'ricci-world-map', name: 'Matteo Ricci prints a Chinese world map', nameZh: '利玛窦坤舆万国全图', han: '图',
    pronunciation: 'lì mǎ dòu kūn yú wàn guó quán tú', glyphPronunciation: 'tú',
    start: 1602, end: 1602, parent: 'ming', category: 'culture',
    description: 'In 1602, the Jesuit Matteo Ricci worked with Chinese collaborators to publish the Kunyu Wanguo Quantu, a large Chinese-language map of the world. It presented the Americas and other geographical information unfamiliar to many Chinese viewers while placing China near the centre of the layout.',
    sections: [
      {title: 'The map was a collaborative translation', text: 'Ricci drew on European geographical sources, but Chinese scholars and printers made the map readable and reproducible in China. Explanatory text and translated place names mattered as much as coastlines. The result was neither a European map merely relabelled nor a complete replacement for Chinese geographical knowledge.'},
      {title: 'Maps could support a religious mission', text: 'Ricci presented himself as a learned man and used mathematics, astronomy and geography to build relationships with officials. The map attracted attention without requiring viewers to accept Christianity. Knowledge exchange and missionary strategy operated together.'}
    ],
    note: '1602 dates the best-known six-panel edition. Ricci produced earlier Chinese world maps, and later copies changed details.',
    related: ['ming', 'manila-silver'],
    cambridge: {chapter: 8, page: 'pp. 224–225', epubSection: 'c2KZ.xhtml'},
    secondSource: 'https://www.loc.gov/item/2010585650/',
    secondSourceLabel: 'Library of Congress · Ricci world map, 1602'
  });

  add({
    id: 'qing-muslim-uprisings', name: 'Muslim uprisings and Qing reconquest', nameZh: '清末回民起义与清军收复新疆', han: '乱',
    pronunciation: 'qīng mò huí mín qǐ yì yǔ qīng jūn shōu fù xīn jiāng', glyphPronunciation: 'luàn',
    start: 1855, end: 1878, parent: 'qing', category: 'event', approx: true,
    description: 'Muslim communities rebelled against Qing rule in Yunnan and across parts of the northwest during the 1850s and 1860s. Local violence, ethnic hostility, official abuses and struggles for political control drove conflicts that were connected in time but not directed as one national movement. Qing armies retook the affected regions at enormous human cost.',
    sections: [
      {title: 'Several wars unfolded at once', text: 'The uprising in Yunnan produced a rebel government centred on Dali. Farther north, fighting spread through Shaanxi and Gansu, while Yaqub Beg built a separate state in much of Xinjiang. The participants, aims and local histories differed, so one label should not erase those distinctions.'},
      {title: 'Reconquest strengthened some regional commanders', text: 'The Qing relied on armies organized around powerful officials rather than only on older banner and Green Standard forces. Zuo Zongtang led the campaign that restored Qing control in Xinjiang. The campaigns preserved the empire’s western territory while leaving communities devastated and local power more militarized.'}
    ],
    note: 'The range combines the Yunnan uprising, usually dated 1855 or 1856–1873, the northwestern uprisings of the 1860s and 1870s, and Qing reconquest completed in 1878. These were related but distinct conflicts.',
    related: ['qing', 'catalog-E_QING_TAIPING', 'catalog-E_QING_SSM'],
    cambridge: {chapter: 10, page: 'pp. 254–257', epubSection: 'c36G.xhtml'},
    secondSource: 'https://www.iranicaonline.org/articles/khotan-parent/khotan-iii-history-in-the-islamic-period/',
    secondSourceLabel: 'Encyclopaedia Iranica · Khotan in the Islamic period'
  });

  add({
    id: 'warlord-era', name: 'The Warlord Period', nameZh: '军阀时代', han: '阀',
    pronunciation: 'jūn fá shí dài', glyphPronunciation: 'fá',
    start: 1916, end: 1928, parent: 'republic', category: 'event',
    description: 'After Yuan Shikai died in 1916, no central government could command the whole country. Military commanders, provincial governors and local strongmen built competing power bases. Governments continued to sit in Beijing, but cabinets changed rapidly and warlord armies fought repeated wars for territory and revenue.',
    sections: [
      {title: 'Fragmented power reached ordinary people', text: 'Armies demanded taxes, recruits and supplies from the areas they controlled. Banditry and fighting disrupted travel and farming, and some villages organized their own defence. Political fragmentation was therefore more than a contest among generals in capital cities.'},
      {title: 'Political and cultural change continued', text: 'Sun Yat-sen’s Nationalists built a base in Guangzhou while students and writers challenged inherited authority through the New Culture and May Fourth movements. The Northern Expedition of 1926–1928 defeated or absorbed major warlords and established a Nationalist government at Nanjing, though regional military power did not vanish.'}
    ],
    note: '1916–1928 is the conventional range from Yuan Shikai’s death to the establishment of the Nanjing Nationalist government. Warlord power persisted after 1928.',
    related: ['republic', 'catalog-E_MOD_MAY4', 'ccp-founding', 'civil-war'],
    cambridge: {chapter: 11, page: 'pp. 276–279', epubSection: 'c3G5.xhtml'},
    secondSource: 'https://www.cambridge.org/core/books/abs/cambridge-history-of-china/warlord-era-politics-and-militarism-under-the-peking-government-191628/04BADE20AB7E9D27E80A97E6DEA7DE58',
    secondSourceLabel: 'The Cambridge History of China · The warlord era, 1916–28'
  });

  add({
    id: 'korean-war', name: 'China enters the Korean War', nameZh: '中国人民志愿军入朝参战', han: '援',
    pronunciation: 'zhōng guó rén mín zhì yuàn jūn rù cháo cān zhàn', glyphPronunciation: 'yuán',
    start: 1950, end: 1953, parent: 'prc', category: 'event',
    description: 'Chinese forces entered the Korean War in October 1950 after United Nations troops advanced toward the Yalu River. Fighting pushed the front south and then settled near the dividing line. The 1953 armistice stopped the main combat without producing a peace treaty.',
    sections: [
      {title: 'The war reshaped China’s foreign position', text: 'The new People’s Republic fought the United States less than a year after its founding. The war strengthened China’s alliance with North Korea and deepened hostility with the United States. U.S. protection of Taiwan also made a Communist attack on the island far less likely.'},
      {title: 'Mobilization extended inside China', text: 'The government raised money, recruited soldiers and presented the conflict as resistance to American aggression. Wartime security campaigns targeted people accused of counterrevolutionary activity. Battlefield losses and domestic repression formed part of the same national mobilization.'}
    ],
    note: 'Chinese forces crossed into Korea in October 1950. The armistice was signed on 27 July 1953; no peace treaty followed.',
    related: ['prc', 'land-reform', 'roc-taiwan'],
    cambridge: {chapter: 12, page: 'pp. 310–311', epubSection: 'c3VZ.xhtml'},
    secondSource: 'https://history.state.gov/historicaldocuments/frus1950v07/d797',
    secondSourceLabel: 'U.S. Office of the Historian · Chinese intervention, 1950'
  });

  add({
    id: 'agricultural-collectivization', name: 'Agricultural collectivization', nameZh: '农业合作化运动', han: '社',
    pronunciation: 'nóng yè hé zuò huà yùn dòng', glyphPronunciation: 'shè',
    start: 1951, end: 1956, parent: 'prc', category: 'event', approx: true,
    description: 'Soon after land reform gave plots to rural households, the Communist Party began pooling farming through mutual-aid teams and cooperatives. By 1956, most farm households had entered higher-level cooperatives. Families were paid mainly for labour rather than for the land and tools they had contributed.',
    sections: [
      {title: 'Land reform and collectivization moved in opposite directions', text: 'Land reform broke up landlord holdings and transferred property to households. Collectivization then reduced household control by placing land and production under cooperatives. Treating the two as one reform hides the speed and scale of that reversal.'},
      {title: 'Village officials controlled more of daily farming', text: 'Cooperative leaders assigned work, recorded work points and helped determine what crops to plant. The state purchased grain at fixed prices to support cities and industrialization. Local cadres therefore mediated between national demands and the food and income available to farm families.'}
    ],
    note: 'The change proceeded in stages from mutual-aid teams to lower- and higher-level cooperatives. The 1951–1956 range precedes the larger people’s communes introduced during the Great Leap Forward in 1958.',
    related: ['prc', 'land-reform', 'great-leap'],
    cambridge: {chapter: 12, page: 'pp. 312–314', epubSection: 'c3VZ.xhtml'},
    secondSource: 'https://tile.loc.gov/storage-services/master/frd/frdcstdy/ch/chinacountrystud00word/chinacountrystud00word.pdf',
    secondSourceLabel: 'Library of Congress · China country study'
  });

  add({
    id: 'hundred-flowers', name: 'Hundred Flowers and the Anti-Rightist Campaign', nameZh: '百花齐放与反右运动', han: '鸣',
    pronunciation: 'bǎi huā qí fàng yǔ fǎn yòu yùn dòng', glyphPronunciation: 'míng',
    start: 1956, end: 1958, parent: 'prc', category: 'event',
    description: 'In 1956 and early 1957, Mao Zedong called for open criticism of problems within the Communist Party. Intellectuals, students, workers and some party members voiced complaints. The leadership soon reversed course, and the Anti-Rightist Campaign punished many of the people who had spoken.',
    sections: [
      {title: 'An invitation to criticize became a political trap', text: 'People first responded cautiously, then spoke more freely as officials continued to request criticism. Complaints addressed bureaucracy, restricted speech, working conditions and party privilege. The sudden change in policy made earlier participation evidence of political disloyalty.'},
      {title: 'The campaign narrowed public argument', text: 'Hundreds of thousands were labelled rightists. Many lost jobs, were sent to the countryside or labour camps, and carried the label for years. The punishment also warned colleagues and families that disagreement could threaten education, employment and personal safety.'}
    ],
    note: 'The Hundred Flowers campaign developed during 1956 and peaked in spring 1957. The Anti-Rightist Campaign began in mid-1957 and continued through 1958.',
    related: ['prc', 'great-leap', 'cultural-revolution'],
    cambridge: {chapter: 12, page: 'pp. 319–320', epubSection: 'c3VZ.xhtml'},
    secondSource: 'https://tile.loc.gov/storage-services/master/frd/frdcstdy/ch/chinacountrystud00word/chinacountrystud00word.pdf',
    secondSourceLabel: 'Library of Congress · China country study'
  });

  add({
    id: 'one-child-policy', name: 'The one-child policy', nameZh: '独生子女政策', han: '生',
    pronunciation: 'dú shēng zǐ nǚ zhèng cè', glyphPronunciation: 'shēng',
    start: 1980, end: 2015, parent: 'prc', category: 'event',
    dateLabel: '1980–2015 · limits expanded in 2021',
    description: 'In 1980, China’s government began enforcing birth targets that usually limited urban couples to one child and allowed some rural couples two. The rules varied by place and population group. Fines, workplace pressure, contraception, sterilization and forced abortions were all used in enforcement.',
    sections: [
      {title: 'The policy entered family decisions', text: 'Permission to marry or have a child could depend on work units and local officials. Enforcement differed, but some families faced severe punishment for an unauthorized pregnancy or birth. Son preference under tight birth limits also contributed to a large imbalance between male and female births.'},
      {title: 'Ending the limit did not restore birth rates', text: 'A nationwide two-child policy replaced the one-child rule in 2015, and the limit rose to three children in 2021. Birth rates continued to fall as housing, education, work and childcare costs shaped family choices. The long policy also left fewer working-age adults to support a growing older population.'}
    ],
    note: '1980 marks the nationwide drive for one-child families. A two-child policy replaced it in 2015, and a three-child policy followed in 2021; local rules and exceptions varied throughout.',
    related: ['prc', 'catalog-E_MOD_SEZ', 'wto-accession'],
    cambridge: {chapter: 13, page: 'p. 377', epubSection: 'c47G.xhtml'},
    secondSource: 'https://desapublications.un.org/policy-briefs/un-desa-policy-brief-no-153-india-overtakes-china-worlds-most-populous-country',
    secondSourceLabel: 'UN DESA · Population policy and demographic change'
  });

  return {events, revisions: {}, pinyin};
})();
if (typeof module !== 'undefined') module.exports = CAMBRIDGE_RESEARCH;
