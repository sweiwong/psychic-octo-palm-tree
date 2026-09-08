// Audience edits only. Historical dates, source links and uncertainty flags stay in the research packs.
const BEGINNER_LATE = (() => {
  const revisions = {};
  const revise = (id, name, description, firstTitle, firstText, secondTitle, secondText, note) => {
    revisions[id] = { ...(name ? { name } : {}), description,
      sections: [{ title: firstTitle, text: firstText }, { title: secondTitle, text: secondText }],
      ...(note ? { note } : {}) };
  };

  revise('prc', 'People’s Republic of China',
    'Mao Zedong proclaimed the People’s Republic of China on 1 October 1949 after Communist victories on the mainland. The Communist Party set out to redistribute land, expand industry and reorganize society. Later economic reforms brought major changes while the party retained control of national political power.',
    'Revolution reaches everyday life',
    'The new government extended its authority through local party organizations, political campaigns, workplaces and economic planning. Land redistribution and expanded basic services changed many lives. Coercion and disastrous policies also caused immense suffering. The Great Leap Forward brought a devastating famine, and the Cultural Revolution disrupted education, families and government. These campaigns had different aims and consequences.',
    'A different economic direction',
    'From the late 1970s, reforms changed farming, business and connections with overseas markets. Families, factories and cities encountered new opportunities and pressures. The state’s name remained the same through these sharp changes in policy. The individual entries explain those turning points, including reform and opening, special economic zones and China’s entry into the World Trade Organization.');

  revise('early-qing', null,
    'Hong Taiji proclaimed [[Qing|the Qing dynasty]] in 1636, eight years before Qing forces entered Beijing. His state had developed in the northeast, with connections reaching into Mongolia and Korea. The conquest of the Ming capital followed years of building armies, alliances and government.',
    'An established state before Beijing',
    'Manchu, Mongol and Han personnel served the emerging state through different military and administrative arrangements. Recruitment and defections brought soldiers and officials with useful skills. These people helped the rulers collect resources and govern. The force that entered Beijing in 1644 already belonged to a working state with institutions of its own.',
    'Two dates for the Qing',
    'The years 1636 and 1644 mark different steps. The first is the dynasty’s foundation; the second is its conquest of Beijing and adoption of the former Ming capital. Moving south greatly enlarged the dynasty’s ambitions and responsibilities. Its earlier relationships and institutions continued to shape Qing government. This short band shows the years when the Qing and the Ming court in Beijing coexisted.');

  revise('southern-ming', null,
    'The fall of Beijing in 1644 did not end all Ming resistance. Princes and loyalist commanders established courts in the south and continued to challenge the Qing. Rival claims to the throne made cooperation difficult. The Yongli emperor’s death in 1662 marks the conventional end of the principal Southern Ming courts.',
    'Keeping a court alive',
    'A prince’s family connection to the Ming could support his claim to rule. He still needed soldiers, food, money and the loyalty of commanders. Southern Ming courts relied on regional forces whose leaders had interests of their own. Disagreements weakened resistance while Qing armies increased the military pressure. Holding a title offered little protection without the resources to defend it.',
    'Resistance beyond the courts',
    'The struggle extended beyond the main Southern Ming governments. The Zheng family’s maritime forces continued to invoke Ming authority and established a base in Taiwan. Their rule there lasted until 1683. The 1662 endpoint belongs to the principal claimant courts; resistance and attachment to the Ming continued after those courts had fallen.');

  revise('roc-taiwan', 'Republic of China in Taiwan',
    'The Republic of China government relocated to Taiwan in 1949 after defeat on the mainland. Taiwan had come under ROC administration in 1945, following Japanese rule. The postwar years brought martial law and repression, alongside land reform and industrial growth. Later political movements helped transform the island’s government.',
    'Different histories meet',
    'Officials and refugees arriving from the mainland joined a population with its own experience of Qing and Japanese rule. They did not all share the same expectations or political position. The government’s claim to represent China shaped its policies, while local people experienced the effects of repression and rapid economic change. Taiwan’s history cannot begin with the government’s arrival in 1949.',
    'Political change over decades',
    'Martial law was lifted in 1987, and Taiwan held its first direct presidential election in 1996. Opposition groups, social movements and changes to institutions helped widen political participation. Economic growth accompanied this process, but did not make it inevitable. The Republic of China government continued through these changes; cross-strait political disputes also continued.');

  revise('zheng-he', 'Ming Voyages',
    'Zheng He’s first fleet departed in 1405. It began seven Ming-sponsored expeditions that continued until 1433, linking the imperial court with ports across Southeast Asia and the Indian Ocean. The fleets eventually reached the East African coast, travelling along routes already used by merchants and sailors.',
    'Gifts, trade and military power',
    'The ships carried envoys, gifts and commercial goods, as well as troops. The expeditions displayed the emperor’s wealth and power and sometimes intervened in local conflicts. Their journeys depended on existing knowledge of navigation and the port communities they visited. These were ambitious state voyages through a connected maritime world.',
    'The court ended the voyages; maritime trade continued',
    'The Ming court eventually stopped funding these enormous official expeditions as its spending priorities changed. Chinese merchants continued to travel and trade by sea after the fleets ended. The date on this card, 1405, marks the first departure; it does not date the whole series of voyages.');

  revise('nanking', null,
    'The Treaty of Nanking ended the First Opium War in 1842. The Qing ceded Hong Kong Island to Britain, agreed to pay a large sum of money and opened five ports to British trade and residence. The settlement gave lasting force to demands made through military pressure.',
    'From one treaty to a wider system',
    'Later agreements added foreign privileges, including arrangements that placed foreigners outside parts of Qing legal authority. Other powers sought similar treatment. These terms accumulated over time. They affected where foreigners could live and trade, which courts could judge disputes and how officials dealt with foreign residents. The later provisions should be distinguished from the original 1842 treaty.',
    'Trade on imposed terms',
    'Chinese merchants had traded overseas long before the war. The treaty changed the terms on which foreign powers could demand access to Chinese ports. Britain used military victory to secure commercial and territorial concessions. Qing government continued, but its control over foreign activity was reduced. The treaty itself did not legalize the opium trade.');

  revise('abdication', 'End of Imperial China',
    'On 12 February 1912, the child emperor Puyi abdicated and Qing rule ended. The Republic of China had already been founded on 1 January. Negotiations among revolutionaries, the court and military leaders brought the monarchy to an end, following the uprising of 1911.',
    'A settlement backed by military power',
    'Yuan Shikai commanded forces essential to the court’s survival. Sun Yat-sen agreed to give up the provisional presidency in his favour as part of the settlement. The new republic therefore depended partly on men who had gained power under the Qing. Its civilian leaders still faced the problem of controlling armies and the commanders who led them.',
    'A new government, a longer transition',
    'Abdication ended the dynasty, but changing the institutions and habits of government took longer. The republic promised citizenship and representative government while officials and military leaders competed for authority. Under the settlement, Puyi continued to live in the Forbidden City until 1924. His departure from power and his departure from the palace were separate events.',
    'Qing abdication: 12 February 1912. The Republic was founded earlier, on 1 January 1912. Puyi remained in the Forbidden City until 1924.');

  revise('catalog-C_BEIJING_MING', null,
    'The Yongle Emperor moved the Ming court from Nanjing to Beijing in 1421. The Forbidden City had been completed the year before. Beijing was his former power base and stood close to the northern frontier. Nanjing remained a secondary capital with its own government offices.',
    'Beijing’s military and political advantages',
    'Beijing brought the emperor closer to the armies defending the northern frontier and the Mongol powers beyond it. Yongle had seized the throne in civil war, and his earlier base now became the centre of imperial government. The choice combined military concerns with the ruler’s own position. It changed where power was concentrated without removing Nanjing’s importance.',
    'A capital supplied from the south',
    'Moving the court did not move the empire’s richest farmland with it. The capital and its soldiers depended on grain brought from southern regions. The restored Grand Canal, together with storage and shipping arrangements, helped keep those supplies moving. Beijing’s growth as an imperial capital depended on the labour and harvests of people living far from its walls.',
    '1421 marks the court’s transfer to Beijing. The Forbidden City was completed in 1420. Beijing had also been a capital under earlier dynasties, notably the Yuan.');

  revise('catalog-C_BEIJING_QING', 'Beijing Becomes the Qing Capital',
    'Qing forces entered Beijing in 1644. Li Zicheng’s rebels had already captured the city, and the Ming emperor had died. The Qing made the former Ming capital their own, eight years after proclaiming their dynasty in the northeast.',
    'Taking over the imperial capital',
    'The palaces, offices and ceremonies of Beijing helped the new rulers claim the authority of emperors. They presented themselves as successors to the Ming while criticizing its failures. Familiar institutions helped officials and residents deal with the new court. The ruling family had changed, but much of the machinery and symbolism of imperial government remained useful.',
    'The war continued elsewhere',
    'Possession of Beijing gave the Qing an important centre of government. Ming princes and loyalist armies still resisted in the south, and the conquest continued. The Qing also retained military and political arrangements developed before taking the city. Its move to Beijing was a major turning point within a longer expansion, rather than the moment when every region accepted its rule.');

  revise('catalog-E_MING_EUNUCH_1', 'Ming Palace Eunuchs',
    'Eunuchs served inside the Ming palace, but some also became military commanders, administrators and imperial envoys. Their responsibilities expanded under the Yongle Emperor and later rulers. Access to the emperor could give a palace attendant influence far beyond the imperial household.',
    'A second route to the emperor',
    'An emperor could give trusted attendants tasks that would otherwise pass through regular officials. This offered another source of information and another way to issue orders. It also gave attendants opportunities to control access and promote supporters. Palace service became part of a wider struggle over who could advise the ruler and carry out his decisions.',
    'Different people, different roles',
    'Zheng He led overseas expeditions; Wei Zhongxian later built a powerful court network that persecuted opponents. Their shared status as eunuchs does not explain their different careers. Scholar-officials often wrote hostile accounts of eunuch power, while also competing with them for influence. Each career is best understood through the responsibilities and powers the emperor granted.',
    'Circa 1403–1424 is the Yongle reign era, used here to show an expansion of eunuch roles. Yongle took power in 1402. The change developed over time.');

  revise('catalog-E_MING_EUNUCH_2', 'Wei Zhongxian’s Court Power',
    'Wei Zhongxian gained exceptional influence during the Tianqi emperor’s reign. He used access to the palace and allies among officials to build a powerful network. In 1624, the official Yang Lian publicly denounced him. Persecution of critics associated with the Donglin movement followed.',
    'Power through access',
    'The ability to influence what the emperor heard could affect appointments and careers across government. Wei relied on officials outside the palace as well as other attendants. Some joined his network, while others resisted or tried to work around it. His power grew through these connections and the emperor’s protection, rather than through one formal title.',
    'A change of emperor',
    'Tianqi died in 1627. Under the new Chongzhen emperor, Wei lost his protection and his position collapsed. His fall showed how closely his influence had depended on favour at court. It also followed years of harm to opponents. The 1624 date marks a major confrontation during his rise; his fall and death came three years later.');

  revise('catalog-E_QING_OPIUM', null,
    'In 1839, Qing commissioner Lin Zexu moved to suppress the illegal opium trade. Conflict with Britain followed. British naval and land forces, including troops from India, attacked coastal and river positions. The war ended in 1842 with the Treaty of Nanking.',
    'Opium, tea and overseas trade',
    'Merchants used opium grown in British India to help finance purchases of Chinese tea. This trade connected Indian production, Chinese buyers and British demand. Qing efforts to stop the imports challenged a profitable business while confronting the damage caused by addiction. Britain intervened militarily and pressed for wider access to Chinese markets.',
    'The terms of defeat',
    'British forces advanced along the Yangtze toward Nanjing. The resulting treaty opened five ports, required payments and ceded Hong Kong Island to Britain. Later agreements added further foreign privileges. These concessions limited the Qing government’s control over foreign activity. The treaty did not itself legalize opium. The dates 1839–1842 include the initial clashes; some accounts use 1840 for the main British expedition.');

  revise('catalog-E_QING_TAIPING', null,
    'Hong Xiuquan’s religious movement became a vast civil war against the Qing. Hong claimed to be Jesus’s younger brother and established a Heavenly Kingdom. His forces captured Nanjing in 1853 and made it their capital. Qing armies retook the city in 1864 after years of devastating war.',
    'A rival government',
    'The Taiping challenged Manchu rule and proposed sweeping changes to property and social life. Religious beliefs gave the movement a shared cause, while hardship and local conflict helped it recruit followers. Its leaders promised equality, but their state also had powerful hierarchies and violent internal struggles. The rules they announced and the lives people experienced under wartime government could differ greatly.',
    'The cost of civil war',
    'The Qing increasingly relied on regional armies raised by officials such as Zeng Guofan. Local recruitment and finance helped sustain the forces that defeated the Taiping. This strengthened provincial military networks within Qing government. Fighting, famine and disease devastated southern and central regions. The death toll remains highly uncertain, and resistance continued after the fall of Nanjing.');

  revise('catalog-E_QING_OPIUM2', null,
    'Britain and France fought the Qing from 1856 to 1860 to obtain further commercial and diplomatic concessions. Their forces eventually occupied Beijing. They looted the Old Summer Palace, and British troops burned it. The defeat forced the Qing to accept a wider foreign presence.',
    'Fighting over access',
    'Britain used the Arrow incident in Canton as its immediate reason for intervention; France invoked the execution of a missionary. The Treaties of Tianjin in 1858 provided for more treaty ports and foreign diplomats in Beijing. Disputes over carrying out those terms led to renewed fighting and the Conventions of Beijing in 1860.',
    'A government under pressure',
    'The settlement expanded foreign privileges and required further payments. Associated trade arrangements legalized opium imports. At the same time, the Qing was fighting the Taiping civil war. Military defeat abroad and rebellion at home placed heavy demands on its money and armies. The destroyed Old Summer Palace was Yuanmingyuan, a separate site from the Forbidden City.');

  revise('catalog-E_QING_SSM', null,
    'Qing officials responded to military defeats and civil war with projects to strengthen the state. From the 1860s, they built arsenals and shipyards, opened language schools and supported new industries. These efforts are usually grouped under the name Self-Strengthening Movement.',
    'Military and industrial reform',
    'Modern ships and guns needed trained crews, maintenance, reliable supplies and money. Translation and education became important parts of military rebuilding. Officials such as Li Hongzhang also supported transport and commercial ventures. The aim was to develop the skills and resources needed to defend the country, as well as obtain foreign equipment.',
    'Projects with different results',
    'Different officials sponsored different enterprises. Some developed useful skills and infrastructure, while others struggled with funding and coordination. The movement did not operate as one centrally managed programme. Defeat by Japan in 1894–1895 intensified criticism and demands for deeper political change. The conventional dates, around 1861–1895, cover many projects that began and developed at different times.');

  revise('catalog-E_QING_SJ', null,
    'The First Sino-Japanese War began in 1894 over influence in Korea. Qing forces suffered defeats on land and at sea. The 1895 Treaty of Shimonoseki required a large payment and transferred Taiwan and the Penghu Islands to Japan. The outcome shook confidence in Qing military reforms.',
    'War over Korea',
    'Intervention in a Korean political crisis brought China and Japan into conflict. Korea had its own political struggles, and its people faced the consequences of both powers’ ambitions. Fighting spread from Korea into Manchuria and coastal naval bases. Japan’s victory ended Qing claims in Korea while strengthening Japan’s own expansion in the region.',
    'The consequences of defeat',
    'The Qing borrowed money to meet the treaty’s financial demands, adding to its burdens. Reformers questioned whether new ships and weapons were enough without wider changes in government. In Taiwan, Japanese conquest met resistance after the treaty was signed. The diplomatic transfer and the establishment of Japanese control were different stages, with different consequences for the people living there.');

  revise('catalog-E_QING_100D', null,
    'In 1898, the Guangxu emperor supported a rapid series of reforms associated with Kang Youwei, Liang Qichao and other advocates. The effort ended when Empress Dowager Cixi regained control, confined the emperor and approved the execution of six reformers.',
    'Changing schools and government',
    'Reform proposals addressed education, administration and military effectiveness. Carrying them out required officials, money and support at court. Announcing a change in an imperial order could be much easier than making it work across the country. Reform also affected appointments and influence, so arguments about policy became struggles over who would direct government.',
    'Reform after the failure',
    'The defeat of the 1898 initiative did not end attempts to change the Qing state. After the Boxer crisis, the court itself supported major institutional reforms. Leaders who opposed one programme could adopt changes under different pressures. The Hundred Days remain a striking example of both the reach of an emperor’s orders and the limits of reform when support at court was fragile.');

  revise('catalog-E_QING_BOXER', null,
    'The Boxers were an anti-foreign and anti-Christian movement in northern China. They attacked missionaries and Chinese Christians. In 1900, support from the Qing court helped turn the crisis into war with foreign powers. An eight-nation force entered Beijing and ended the siege of the foreign legations.',
    'Violence within Chinese communities',
    'Foreign privileges and missionary protection of converts made local disputes part of larger conflicts over power. Drought and insecurity added to the tensions. Qing officials disagreed over how to respond: some supported the Boxers, while others suppressed them. Chinese Christians were major targets of attacks. The violence divided communities as well as involving foreign governments.',
    'Occupation and a costly settlement',
    'The court fled Beijing. Foreign forces looted and carried out punitive expeditions. The Boxer Protocol of 1901 imposed a large payment and allowed foreign troops at strategic locations. The Qing survived, but its finances and security faced further restrictions. The dates 1899–1901 cover the movement’s expansion and settlement; the main siege and foreign intervention occurred in 1900.');

  revise('catalog-E_QING_1911', null,
    'The Wuchang uprising in October 1911 helped trigger a series of provincial breaks with Qing rule. Revolutionary representatives elected Sun Yat-sen provisional president. The Republic of China began on 1 January 1912, and the Qing emperor abdicated on 12 February.',
    'How the monarchy ended',
    'Sun was abroad when the uprising began. Its spread depended on local soldiers, provincial decisions and negotiations with Yuan Shikai, whose forces were essential to the court. Sun later gave up the presidency in Yuan’s favour. The settlement joined revolutionary demands to the military power of a leader who had served the old regime.',
    'The problems facing the republic',
    'The end of the dynasty left armies, officials and regional interests in place. The new government had to decide how provinces would relate to the centre, how citizens would be represented and who could control military power. These questions remained unsettled. The revolution ended hereditary imperial rule and opened a new struggle over how China would be governed.');

  revise('catalog-E_MOD_SEZ', 'Special Economic Zones',
    'Shenzhen, Zhuhai, Shantou and Xiamen became China’s first four special economic zones in 1980. Their special rules allowed experiments with investment and business. Shenzhen’s location next to Hong Kong connected its growth to overseas money, trade and commercial experience.',
    'Testing changes in selected places',
    'The zones gave officials a way to try economic policies within defined areas before extending them more widely. Investment depended on roads, transport, workers and local administration as well as rules for business. The results developed over time. Preparatory opening policies had begun in Guangdong and Fujian in 1979, before the formal designation of the four zones.',
    'Workers and growing cities',
    'Factories and construction attracted people into rapidly expanding urban areas. Their work helped turn investment into buildings, goods and trade. Migration also changed families’ living arrangements and access to jobs. The story of the zones includes both business growth and the everyday adjustments of the people who built and worked in them.');

  revise('catalog-E_MOD_BRI', null,
    'China launched the Belt and Road Initiative in 2013 to finance and build infrastructure abroad, including roads, railways and ports. It covers many separate projects and agreements, and its scope and participants have changed over time.',
    'What infrastructure can change',
    'A railway or port can shorten journeys and lower the cost of moving goods. Those benefits also depend on border procedures, maintenance and connections to businesses that can use the route. A completed structure is only one part of the picture. The financing and operation of a project help determine whether it produces lasting gains.',
    'Different projects, different results',
    'Borrowers, lenders and contractors can receive different benefits and carry different risks. Debt, transparency and effects on local communities and the environment matter alongside construction costs. Each project needs to be assessed on its own evidence. Forecast benefits describe possible outcomes under stated assumptions; they do not establish what every participating country has already gained.');

  // The Xi leadership card already distinguishes the party office, presidency and 2018 amendment clearly.
  // Preserve its existing text rather than introduce new claims about a living political figure.

  revise('catalog-S_MODERN', null,
    'This atlas begins its Modern China section in 1912, when the Republic of China was established and Qing rule ended. Wars, revolutions, new schools, factories, migration and political campaigns changed daily life. The Republic and the People’s Republic have distinct government histories.',
    'Changes beyond the capital',
    'Schools, factories, newspapers and migration brought politics into new parts of everyday life. Parties and governments organized people through campaigns and offices that reached deep into society. A village family, a factory worker and a refugee could experience the same turning point very differently.',
    'Different paths through the twentieth century',
    'Mainland China, Taiwan and Hong Kong experienced different combinations of political change and economic growth. Their histories also remained connected through trade, migration and conflict. The entries separate particular events from changes that developed over decades. The 1912 boundary is a choice for this atlas; many developments in the section had roots in the Qing period.');

  revise('catalog-E_MOD_MAY4', null,
    'On 4 May 1919, students protested in Beijing against the Versailles peace settlement’s treatment of German rights in Shandong and the actions of Chinese officials. Boycotts, strikes and public organizing spread the movement beyond the campuses. The name May Fourth also came to describe wider cultural debates.',
    'From students to a wider movement',
    'The peace settlement raised a direct question about who could decide the fate of territory and foreign privileges in China. Students linked anger over diplomacy with criticism of their own government. Workers and merchants also took part. They shared some concerns while bringing different interests and experiences to the movement.',
    'Debating China’s future',
    'Writers and activists argued over education, family authority and the language of literature. They explored liberalism, anarchism, Marxism and other ideas. These discussions had begun before the May demonstrations and continued afterwards. The movement had several possible directions; its participants did not all agree on the changes China needed or how to bring them about.');

  revise('catalog-E_MOD_LONG_MARCH', null,
    'During 1934–1936, Communist armies left threatened bases and undertook a series of difficult retreats. The best-known force departed Jiangxi in 1934 and reached northern Shaanxi in 1935. Heavy losses marked the journeys that later became known collectively as the Long March.',
    'Retreat under military pressure',
    'The armies followed different routes as they tried to escape attacks and find places to regroup. Food, terrain, hostile forces and relations with local communities affected their chances of survival. The march was a struggle whose outcome remained uncertain. Treating it as a single journey can hide the different experiences of the forces involved.',
    'A powerful story of survival',
    'The Long March later became central to Communist accounts of the revolution. Poems and recollections helped turn the retreats into a story of endurance and leadership. Mao’s position strengthened over time, but disputes within the movement continued during the journeys. The broad dates 1934–1936 include several principal army retreats; 1934–1935 usually refers to the best-known column.');

  revise('catalog-E_MOD_MAO_DEATH', null,
    'Mao Zedong died on 9 September 1976. Within a month, Hua Guofeng and his allies arrested the Gang of Four and removed the group from power. The economic reforms associated with 1978 still lay ahead.',
    'The succession struggle after Mao',
    'Mao had exercised exceptional personal authority. His successors had to decide which policies and officials to retain while presenting themselves as legitimate heirs to the revolution. Arresting the Gang of Four resolved an immediate struggle for power. It did not settle the direction of economic policy or establish lasting agreement about how the leadership should work.',
    'A change that took time',
    'Public mourning emphasized continuity with Mao’s era, while later leaders changed many of its policies. Decisions about reform developed through further arguments and experiments. Mao’s death was a major turning point, but the policies of the following years did not emerge all at once. The 1976 succession crisis and the 1978 shift toward reform are separate milestones.');

  revise('catalog-E_MOD_TIANANMEN', null,
    'In 1989, students, workers and other residents joined protests in Beijing and other Chinese cities. Their demands included action against corruption and greater government accountability. On the night of 3–4 June, troops used lethal force in Beijing. Arrests and repression followed the suppression of the movement.',
    'People with different demands',
    'Participants brought concerns about rising prices, privilege, representation and political reform. Students and workers did not always share the same priorities. Their involvement made the protests broader than a single campus movement. Economic and political questions overlapped as people called for changes in the way officials exercised power.',
    'The crackdown beyond the square',
    'Much of the killing occurred on streets approaching Tiananmen Square. The familiar name therefore covers events across a wider area of Beijing. Contemporary reports document troops killing civilians, although the full number and identities of the victims remain uncertain. Disagreement over casualty totals does not cast doubt on the fact of the killings. The repression also continued through arrests after the military operation.');

  revise('catalog-E_MOD_HK_RETURN', 'Hong Kong Handover',
    'On 1 July 1997, Hong Kong passed from British to Chinese sovereignty and became a Special Administrative Region. The Sino-British Joint Declaration of 1984 set out the negotiated framework. It provided for continuity in important parts of the city’s institutions under Chinese sovereignty.',
    'What the agreement promised',
    'The settlement envisaged continued capitalist arrangements and a separate legal system. Those commitments were central to what the handover meant for residents and businesses. The agreement records the promises made at the time. Later disputes over their interpretation and implementation belong to subsequent chapters of Hong Kong’s history.',
    'An economy already connected',
    'Hong Kong’s businesses, trade and financial networks were linked to the mainland’s economic opening before the handover. Neighbouring Shenzhen grew rapidly through those connections. The political transfer therefore took place within an existing pattern of economic integration. A change in sovereignty had one formal date, while trade, investment and the expectations of people on both sides of the boundary developed over many years.');

  revise('catalog-E_MOD_SPACE', 'China’s First Crewed Spaceflight',
    'Yang Liwei entered orbit aboard Shenzhou 5 on 15 October 2003 and returned safely the next day. China became the third country to send a person into orbit using its own launch system. The flight followed a series of uncrewed tests.',
    'Behind one astronaut’s journey',
    'The mission depended on a rocket, spacecraft, tracking stations, life support and a recovery system working together. Engineers and other teams had to test and coordinate these systems before a person could fly. Yang’s journey was the visible result of years of preparation and the work of many people on the ground.',
    'A milestone with a public audience',
    'The flight demonstrated a capability held by very few countries. It had symbolic importance as well as technical value, both within China and abroad. This entry dates the mission to 15–16 October 2003. Its claim to be the first refers to a crewed flight launched by China, rather than the first person of Chinese ancestry to travel into space.');

  revise('manila-silver', 'China and the Manila Silver Trade',
    'Spanish Manila became a major trading meeting point after its establishment in 1571. Chinese merchants brought silk and ceramics, while silver arrived across the Pacific from the Americas. The port connected existing Asian trade with a growing route across two oceans.',
    'Why silver mattered',
    'Silver was important in Chinese trade and tax payments. Merchants therefore had strong reasons to obtain it. Pacific shipping linked American mines with Asian markets, alongside other supplies such as Japanese silver. The route connected miners, sailors, traders and households across distant societies. Some of the labour supporting those exchanges was coerced.',
    'Wealth and changing prices',
    'More silver could make trade easier, but changes in its value also affected people who earned money in one form and paid taxes in another. The benefits of growing commerce were uneven. Silver supplies formed one part of the pressures on the later Ming economy. Military spending, taxation, harvests and rebellion also mattered to the dynasty’s final crisis.');

  revise('red-chamber', 'Dream of the Red Chamber',
    'Dream of the Red Chamber follows the fortunes of an elite household, bringing love, marriage, property and family duty into one story. Cao Xueqin’s work circulated in manuscripts before the Cheng-Gao edition printed a 120-chapter version in 1791.',
    'Life inside a wealthy household',
    'The family’s luxurious world depends on servants, careful management and connections outside the home. Personal attachments meet the demands of rank and obligation. Through these relationships, the novel explores the insecurity beneath wealth and status. Its fictional household offers a way into questions about Qing society, although it cannot stand for the experience of every family.',
    'How the book reached readers',
    'Manuscripts, editors and printers shaped the versions that readers encountered. The authorship of the final forty chapters remains disputed, so the printed edition should not be described as Cao’s unchanged original. The date 1791 marks a major stage in publication. The story and its earlier manuscript versions had developed before that printing milestone.');

  revise('great-leap', null,
    'The Great Leap Forward began in 1958 with demands for rapid growth in farming and industry. Communes, mass campaigns and ambitious targets reorganized work. The policies contributed to a devastating famine. Inflated reports and pressure to meet state demands made shortages harder to recognize and correct.',
    'When harvest reports became dangerous',
    'Officials faced pressure to report success. Exaggerated harvest figures could lead the state to demand more grain than villages could spare. People responsible for reporting problems also faced political risks. These pressures allowed serious mistakes to continue and made it harder for those losing access to food to obtain help.',
    'Promises and hunger',
    'Campaign posters showed huge harvests and plentiful food. They reveal what the campaign promised, rather than what farms actually produced. Hunger varied between places and social groups, depending partly on access to food and the decisions of officials. The dates 1958–1962 cover the campaign and famine crisis. Estimates of deaths vary substantially, and no precise total is asserted here.');

  revise('cultural-revolution', null,
    'Mao launched the Cultural Revolution in 1966, calling for attacks on supposed enemies in the Communist Party and society. Red Guards, rival factions and later military intervention disrupted government and everyday life. Persecution, violence and damaged education marked the decade, which conventionally ends in 1976.',
    'Rebellion in Mao’s name',
    'Participants challenged officials while claiming support from Mao. Rival groups fought over who truly represented the revolution. The ability to attack authority did not give people unrestricted political freedom. Institutions were disrupted and authority was later reimposed, including through military intervention. The forms and intensity of conflict changed over the decade.',
    'Lives shaped by political campaigns',
    'Schooling was interrupted, families were separated and people were forced to move. Posters, performances and public rituals made political demands part of daily life. These official images show the behaviour authorities promoted, but they cannot tell us what every person believed. Mao’s death and the arrest of the Gang of Four in 1976 mark the conventional end of this period.');

  revise('reform-opening', 'Reform and Opening',
    'In December 1978, a major Communist Party meeting marked a shift toward economic development. Changes to farming, business and overseas investment followed over several years. Different places tried different policies, and officials expanded some experiments while arguing over others.',
    'New choices in farming and business',
    'Household farming arrangements let families keep more of the returns from their work. Local businesses grew, and market prices played a larger role in parts of the economy. These changes affected the rewards people received for producing and selling goods. They developed while the Communist Party retained political control.',
    'Growth changes everyday life',
    'Investment and migration connected villages, coastal cities and overseas markets. People gained new opportunities to earn money and move for work. Access to jobs, housing and welfare remained uneven, so growth affected households differently. The year 1978 marks an important political turning point in a longer process. Individual reforms had their own starting dates and did not all take effect together.');

  revise('ming-wang-yangming', 'Wang Yangming’s Philosophy',
    'Wang Yangming argued that moral knowledge and action belong together. He traced this teaching to a breakthrough during his exile at Longchang in 1508. His later work challenged influential interpretations of how people should learn to live well.',
    'Knowing through action',
    'For Wang, repeating a correct moral statement was not enough. Real understanding had to appear in how a person responded and behaved. This challenged the gap between success in scholarly learning and conduct in everyday life. He also warned that selfish desires could obstruct good judgment; his teaching did not simply tell people to trust every impulse.',
    'Debate within Confucian learning',
    'Wang questioned parts of Zhu Xi’s teaching while drawing on the same inherited texts and concerns. Their disagreements show how much argument existed within Confucian thought. Later followers took Wang’s ideas in different directions. The date 1508 comes from the traditional account of his experience at Longchang; his ideas developed further through teaching and debate.');

  revise('ming-journey-west', 'Journey to the West',
    'Journey to the West turns the pilgrimage of the Tang monk Xuanzang into an adventure filled with religious challenges, comedy and fantasy. Its earliest surviving complete, hundred-chapter edition was printed in Nanjing in 1592. The stories behind it had developed over centuries.',
    'From storytelling to print',
    'Oral tales, performances and earlier writings had already transformed the historical journey. The printed novel gathered this material into a long narrative that later readers could encounter in a durable form. Illustrations and chapter divisions helped shape that experience. The book is traditionally attributed to Wu Cheng’en, although its authorship remains debated.',
    'Adventure with a satirical edge',
    'The pilgrims meet powerful figures whose claims invite fear, laughter and criticism. Religious discipline appears alongside appetite and the Monkey King’s unruly energy. The novel offers a view of late Ming literary culture, rather than a factual record of Xuanzang’s travels or religious life in the Tang dynasty.');

  revise('ming-li-shizhen', 'Li Shizhen’s Compendium of Materia Medica',
    'Li Shizhen’s Bencao gangmu, often called the Compendium of Materia Medica, brought together knowledge about medicinal substances. It appeared in print in 1596, after his death. Li compared inherited writings and tried to correct how substances were named, identified and classified.',
    'Checking knowledge passed down in books',
    'Older descriptions could acquire errors as writers copied them. Li examined this inherited material and reorganized it to make distinctions clearer. His work involved more than collecting additional remedies. It asked how reliable existing descriptions were and how a reader could tell one substance from another. A draft had been completed in 1578, before the first printed edition.',
    'Plants, animals and materials',
    'The book reached beyond remedies into descriptions of the natural world. Its circulation in East Asia supported further study and adaptation. It does not establish that every treatment it records is effective. The work records how people of its time gathered and evaluated knowledge about substances.');

  revise('qing-inner-asia', 'Qing Conquests in Inner Asia',
    'Between 1755 and 1759, Qing campaigns destroyed the Dzungar state and conquered the Tarim Basin. The victories greatly expanded the empire. They also brought mass killing, disease and flight, with devastating consequences for Dzungar communities.',
    'The people behind the map',
    'These regions already contained states, communities and traditions of government. Qing conquest destroyed a rival power and imposed new forms of military control, settlement and administration. Court accounts celebrated expansion, but the history also includes the people killed or displaced. The mass killing of the Dzungars is commonly described as genocide; precise population and death totals remain uncertain.',
    'Governing the conquered regions',
    'The Qing used military and local arrangements that differed from those in the inner provinces. A claim on a map, a garrison and a provincial government could mean different levels of control. The conquests had a lasting territorial legacy, but rule continued to develop after the campaigns. Xinjiang became a province much later, in 1884.');

  revise('qing-siku', 'The Siku Quanshu Book Collection',
    'In the 1770s, the Qianlong court began assembling the Siku quanshu, a vast manuscript collection of Chinese writings. Its four divisions covered classics, histories, philosophical works and literature. Books came from the imperial library and collections across the empire.',
    'Preserving and organizing books',
    'Scholars compared texts, wrote descriptions and decided which works to include. Their work preserved books and created a guide that later readers could use to explore the collection. The choices of editors also shaped which authors and texts received official recognition. The collection reflects both extensive scholarship and the priorities of an imperial project.',
    'Censorship alongside preservation',
    'Collecting books allowed officials to inspect material they considered hostile to Manchu rule. Some texts were suppressed or altered. The same project that preserved a huge body of writing also exposed books to destruction. Its surviving volumes therefore show a selection from the past, shaped partly by political decisions. The main compilation period is usually dated 1773–1782.');

  revise('qing-exams-end', 'End of the Imperial Examinations',
    'In 1905, the Qing court abolished the traditional civil-service examinations, discontinuing future examinations from 1906. The government wanted schools to provide different kinds of training for public service. An education ministry followed in December 1905.',
    'A familiar route to office closes',
    'For generations, the examinations had influenced how families invested in their children’s education. Students spent years preparing for a chance to gain office and status. Ending the system changed those expectations. It affected the relationship between study and a government career, as well as the value of knowledge people had already worked hard to acquire.',
    'Building a new system',
    'Schools needed teachers, teaching materials and money. These resources were unevenly available, and proposals based on foreign examples met debate and resistance. Abolition did not immediately provide education for everyone or bring classical learning to an end. Older qualifications lost their central official purpose while the institutions intended to replace them were still developing.');

  revise('lu-xun', 'Lu Xun’s A Madman’s Diary (狂人日记)',
    'Published in New Youth (新青年) in May 1918, Lu Xun’s A Madman’s Diary became a founding work of modern Chinese short fiction. Its frightened narrator sees a society built on cannibalism. The disturbing image asks whether accepted morality and family obligations can conceal the destruction of individuals.',
    'How the narrator challenges society',
    'A classical Chinese preface presents the diary as evidence of illness; the diary itself uses vernacular Chinese, or baihua (白话). The narrator reads a history filled with moral teaching and finds cannibalism beneath its respectable words. His suspicions reach into his own family, and he eventually wonders whether he too has participated. The story makes social criticism uncomfortable: recognizing cruelty does not automatically place the critic outside it.',
    'What the narrator’s recovery means',
    'The preface reports that the narrator has recovered and gone elsewhere to await an official appointment. Readers can ask whether recovery means accepting the society he once condemned. This information comes before the diary, whose final appeal is to save the children. The two voices leave an unresolved question: can another generation escape inherited cruelty, or will those who recognize it also learn to fit in?',
    'Published in May 1918. Vernacular fiction existed centuries earlier, and the New Culture Movement was already underway. The story is a landmark of the modern short story, not the invention of vernacular writing. The preface concerns an official appointment, not civil service examinations.');

  revise('civil-war', 'Chinese Civil War',
    'The Nationalist-Communist alliance broke apart in 1927, beginning a long civil conflict. Cooperation against Japan interrupted the struggle without resolving it. Major war resumed in 1946. In 1949, Communist forces took control of the mainland and the Nationalist government moved to Taiwan.',
    'Keeping armies in the field',
    'Both sides needed soldiers, food and supplies. Their relationships with civilians involved cooperation as well as coercion. Land policies, inflation and years of warfare affected people’s willingness and ability to support them. Military success depended partly on how well each side could organize these resources and sustain support under severe pressure.',
    'A conflict with lasting consequences',
    'The United States and Soviet Union influenced events, but Chinese leaders also pursued their own aims. The defeat of the Nationalists on the mainland did not produce a complete peace settlement. Separate governments continued on the mainland and in Taiwan, and armed confrontations continued after 1949. The dates on this card cover the principal conflict rather than every later clash.');

  revise('war-japan', 'Second World War: War with Japan',
    'Full-scale war between China and Japan followed the Marco Polo Bridge incident in July 1937. Japanese occupation brought mass displacement and atrocities, including the Nanjing massacre. Nationalist and Communist forces resisted Japan while keeping separate political organizations. The war continued until Japan’s defeat in 1945.',
    'A country at war',
    'Institutions, industry and people moved inland from occupied areas. Keeping armies supplied while supporting displaced civilians placed enormous demands on government and communities. Schools, workplaces and family life were disrupted. Experiences differed between occupied territory, inland areas and Communist bases, even as the war reshaped all of them.',
    'China’s long wartime experience',
    'The full-scale conflict began in 1937, before the Pacific War of 1941. Japanese occupation of Manchuria had begun earlier still, in 1931. Later cooperation with the Allies changed supplies and diplomacy. Japan’s defeat ended the war in 1945, but left immense destruction and unresolved conflict between the Nationalists and Communists. Civil war soon returned on a large scale.');

  revise('land-reform', 'Land Reform',
    'The 1950 Land Reform Law extended redistribution in the new People’s Republic, following earlier Communist campaigns. Land and other property changed hands, and households were assigned class labels. The campaign involved coercion and killings as well as the transfer of property.',
    'Power changes in the village',
    'Land reform affected who could exercise authority locally. Campaigns recruited activists, identified enemies and changed relationships between families. Class labels could continue to affect how people were treated long after the original distribution of land. These consequences reached beyond the fields themselves into the politics and social life of villages.',
    'What came before collective farming',
    'Giving land to households and later organizing collective agriculture were separate changes. Each altered the control families had over farming and what the state could demand from them. Posters promoted official promises, but the experience of villagers also depended on local disputes and violence. The dates 1950–1953 cover the early PRC campaign; earlier reforms and later collectivization have their own chronologies.');

  revise('marriage-law', 'The 1950 Marriage Law',
    'The People’s Republic’s Marriage Law of 1950 promoted freedom to choose a spouse, monogamy and equal rights for women and men. It challenged coercive family practices and expanded grounds for divorce. Putting these principles into practice proved harder than announcing them.',
    'New rights inside the family',
    'Marriage affected property, work and authority as well as personal relationships. The law gave people new claims they could take to officials. Women’s ability to use those rights could still depend on relatives, money and the actions of local authorities. Government became more involved in domestic disputes as it offered ways to challenge established arrangements.',
    'The gap between law and daily life',
    'Official posters showed couples choosing marriage freely and living harmoniously. Those images expressed the reform’s aims. They did not prove that everyone could exercise the new rights safely or that officials enforced them consistently. The effects varied between communities and households, and unequal practices did not disappear when the law was passed.');

  // Nixon's existing prose is already plain and its exact dates and diplomatic sequence are retained.

  revise('wto-accession', 'China Joins the WTO',
    'China became a member of the World Trade Organization, or WTO, on 11 December 2001. Membership required changes to tariffs, market access and trade rules, and tied those domestic reforms to an international agreement.',
    'Trading under agreed rules',
    'More predictable access to markets could help businesses plan investment. China also had to carry out the obligations it had accepted. That required changes in rules and administration over time. Joining the organization was a formal milestone, followed by continuing work to put the agreement into practice.',
    'Different effects on different people',
    'Greater trade created opportunities for exporters, workers and consumers. It also increased competition and required some firms and regions to adjust. The results depended on circumstances beyond membership alone, including investment and the wider economy. The date on this card marks entry into the organization; it does not explain every economic change that followed.');

  revise('tumu-crisis', 'The Tumu Crisis',
    'In 1449, Oirat forces defeated an expedition led by the Ming Zhengtong emperor and captured him. The court installed another emperor and organized the defence of Beijing. Losing the ruler was a disaster, but the government continued to function.',
    'An imperial expedition goes wrong',
    'The emperor’s presence could not solve the army’s problems of supplies, information and command. Later accounts placed much of the blame on the eunuch Wang Zhen. His decisions were part of the story, alongside the military arrangements that left the expedition vulnerable. A ruler at the head of an army could share the risks faced by the force he commanded.',
    'Two emperors and a lasting warning',
    'Zhengtong returned in 1450, while another ruler already occupied the throne. He recovered power in 1457. The defeat later became a warning in arguments over how emperors should conduct themselves. The 1449 marker identifies the capture, while the return and restoration were later events. The crisis did not end all Ming military action beyond its borders.');

  revise('ming-maritime-conflict', 'Ming Sea Trade and Coastal Raids',
    'Ming restrictions limited private overseas trade, but ships and goods continued to move along the coast. Enforcement varied. In the sixteenth century, raids associated with the name wokou involved networks of several nationalities, including many Chinese participants. Calling every raider Japanese would be misleading.',
    'Trade under restrictions',
    'Merchants still sought goods and profits. Some exchanges were official, while others evaded the rules. Armed traders, officials and coastal communities became involved in relationships that could mix commerce with violence. A ban could change the risks and rewards of trade without bringing all maritime activity to a stop.',
    'Fighting raids and permitting trade',
    'Campaigns against raiders accompanied arguments over how to regulate the coast. A partial opening in 1567 created new legal opportunities, although restrictions remained, especially on trade involving Japan. The dates 1371–1567 provide a broad policy frame. They do not describe one rule enforced uniformly throughout the period, and the major raids of the Jiajing era occurred in the mid-sixteenth century.');

  revise('zhang-juzheng', 'Zhang Juzheng’s Reforms',
    'Zhang Juzheng was the senior grand secretary during the early years of the Wanli emperor’s reign. Between 1572 and 1582, he pushed for closer supervision of officials and more reliable tax collection. His programme included land surveys and wider use of consolidated tax payments.',
    'Making tax demands clearer',
    'Combining obligations could simplify what households owed. Paying in silver also made access to markets and silver supplies more important. A clearer tax demand did not necessarily mean a fairer burden. Local officials still determined how payments were distributed and collected, and how much money reached the government. The reforms had earlier local precedents.',
    'Reform depends on court support',
    'Zhang’s methods provoked arguments about discipline and the freedom of officials to criticize government. Accounts differ over how much criticism his reforms allowed. After his death, he fell into disgrace, showing how vulnerable his position had been to changing support at court. Some measures outlasted him; his fall did not mean every reform disappeared.');

  revise('kangxi-rule', 'The Kangxi Emperor',
    'Kangxi’s long reign helped secure Qing rule through war, negotiation and support for learning and the arts. Defeating the Three Feudatories and incorporating Taiwan were major turning points. His southern inspection tours also brought the emperor into important commercial regions.',
    'Different ways to exercise authority',
    'The Qing empire contained different political and religious traditions. Kangxi preserved Manchu imperial identity while supporting classical Chinese learning and presenting himself as a responsible ruler. Military campaigns and cultural patronage helped him reach different groups. These activities belonged to the same effort to strengthen the dynasty’s authority across a large and varied empire.',
    'Looking at an imperial tour',
    'Paintings of inspection tours show orderly cities, landscapes and the emperor’s progress through them. They present the image the court wanted to project. Waterways and commerce also had practical importance to government. Kangxi took the throne in 1661, while his reign era began in 1662. Regents governed during his early years, before he exercised personal rule.');

  revise('ccp-founding', 'Founding of the Chinese Communist Party',
    'The Chinese Communist Party’s first congress met in Shanghai in July 1921. It brought together small groups of Marxist activists. The organization developed amid labour activism, nationalist movements and arguments over China’s future, with support from international Communist networks.',
    'From discussion groups to a party',
    'A political party could coordinate members and actions beyond the circulation of books and ideas. It needed leaders, resources and links with workers. The Comintern, the international Communist organization, provided assistance and expected a role in strategy. These relationships connected Chinese political struggles with developments following the Russian Revolution.',
    'An uncertain beginning',
    'The party’s later control of the mainland was not assured in 1921. Alliances, repression and internal disputes changed its organization and strategy in the years that followed. The first congress conventionally dates to 23 July, based partly on later recollections. The party’s commemorative anniversary is 1 July. The anniversary and the reconstructed opening date should be kept distinct.');

  revise('li-zicheng-beijing', null,
    'Li Zicheng’s forces captured Beijing in 1644, and the Chongzhen emperor died as the Ming capital fell. Li had proclaimed a Shun government. His occupation was short: Qing forces joined with the Ming commander Wu Sangui and defeated him at Shanhai Pass.',
    'Taking a capital and holding power',
    'The capture of Beijing removed the Ming court from its capital. Li still needed supplies, taxes and cooperation from officials and military commanders elsewhere. Winning the city did not automatically give him those resources. His new government faced the immediate challenge of turning military success into lasting control.',
    'Several changes in one year',
    'Beijing passed from the Ming to Li’s Shun government and then to the Qing in 1644. Ming princes and loyalists continued to resist in the south. This sequence included rebel armies, rival governments and alliances between former enemies. Qing control over wider territories developed through further conflict. The year marks the capture and loss of Beijing, rather than the end of all Ming resistance.');

  Object.assign(revisions['catalog-E_QING_OPIUM'], { note: '1839–1842 includes the initial clashes; 1840–1842 is also used for the main expedition. The 1842 treaty did not itself legalize opium or establish all later foreign privileges.' });
  Object.assign(revisions['catalog-E_QING_TAIPING'], { note: '1850–1864 covers the broader conflict; 1851 marks the formal proclamation at Jintian. Resistance continued after Nanjing fell. Death estimates include famine and disease as well as direct violence and remain highly uncertain.' });
  Object.assign(revisions['catalog-E_QING_OPIUM2'], { note: '1856–1860 covers several campaigns and negotiations. The Old Summer Palace was Yuanmingyuan, a separate site from the Forbidden City.' });
  Object.assign(revisions['catalog-E_QING_SJ'], { note: '1894–1895 covers the war. Resistance to Japanese conquest in Taiwan continued after the April 1895 treaty.' });
  Object.assign(revisions['catalog-E_QING_BOXER'], { note: '1899–1901 covers the movement’s expansion and the final settlement. The main siege and foreign intervention took place in 1900; the movement’s roots were earlier.' });
  Object.assign(revisions['catalog-E_MOD_LONG_MARCH'], { note: '1934–1936 includes the principal Communist army retreats; 1934–1935 usually refers to the First Front Army. Some influential accounts rely substantially on participants’ later recollections.' });

  return { revisions };
})();
if (typeof module !== 'undefined') module.exports = BEGINNER_LATE;
