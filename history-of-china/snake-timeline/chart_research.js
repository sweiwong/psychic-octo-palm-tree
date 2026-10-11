/* Additions and explicit subject coverage for the user's reference chart. */
const CHART_RESEARCH=(()=>{
 const events=[],revisions={},pinyin={};
 const wiki=t=>['https://en.wikipedia.org/wiki/'+t,'Wikipedia · '+t.replaceAll('_',' ')+' (reference overview)'];
 const scholar=(url,label)=>[url,label];
 const add=(id,name,zh,py,start,end,parent,description,a,b,c,d,note,refs)=>{
  events.push({id,name,nameZh:zh,han:zh.slice(0,1),pinyin:py,start,end,parent,color:'#987950',category:'event',ribbon:true,label:false,description,sections:[{title:a,text:b},{title:c,text:d}],note,sources:refs.map(r=>r[0]),source:refs[0][0],sourceLabels:Object.fromEntries(refs),related:[parent],evidence:'Chart subject; source-checked historical interpretation'});pinyin[zh]=py;pinyin[zh.slice(0,1)]=py.split(/\s+/)[0];
 };
 add('zhou-gonghe','King Li’s expulsion and the Gonghe interregnum','国人暴动与共和','Guórén Bàodòng yǔ Gònghé',-841,-828,'western-zhou',
 'Traditional histories place the expulsion of King Li of Zhou around 841 BCE, followed by the Gonghe interregnum. The event is often called the revolt of the capital’s inhabitants. That wording needs care: the ancient category guoren cannot simply be equated with modern citizens or with the entire peasantry.',
 'A king could lose control without ending kingship','The removal of a ruler exposed conflict within the royal political community. It did not abolish the Zhou monarchy or establish a modern republic. Later accounts made the episode a warning about oppressive government, giving political speech and the ruler’s response to criticism a central place in the story. These moral explanations belong to the evidence, but are not an independently verified transcript of the confrontation.',
 'An anchor with disputed details','841 BCE became a conventional starting point for continuous annual chronology in received Chinese historiography. Modern studies nevertheless debate Western Zhou dates and the identity of the authority governing during Gonghe. The distinction matters: a useful chronological anchor can coexist with uncertainty about participants and institutions. Translating the name Gonghe as a republican constitution would import a much later meaning into the ancient record.',
 '841–828 BCE retains the chart’s conventional chronology. Some reconstructions place the expulsion in 842; accounts disagree over whether Gonghe was a regency or the rule of a named lord.',
 [scholar('https://www.cambridge.org/core/journals/early-china/article/chronology-of-western-zhou/0D661C3365537C0D15AD896F72F9DF70','Early China · The chronology of Western Zhou'),wiki('Gonghe_Regency')]);
 add('zhou-capital-crisis','The western Zhou capital falls','西周都城危机','Xī Zhōu Dūchéng Wēijī',-771,-770,'western-zhou',
 'In the traditional chronology, an attack involving the lord of Shen and Quanrong forces killed King You in 771 BCE. King Ping’s establishment in the east in 770 marks the conventional beginning of Eastern Zhou. The crisis combined a royal succession dispute with armed alliances; it was more complicated than an external invasion of an otherwise united realm.',
 'The border ran through court politics','Regional rulers and groups described as outsiders were participants in connected political networks. Their involvement in succession demonstrates why a simple opposition between civilization and invading barbarians misleads. Royal power depended on alliances that could be redirected against the king. Losing the western centre weakened the material basis of the monarchy even while the royal title remained important.',
 'A memorable story can displace an explanation','Later tradition blamed the king’s favourite Bao Si and the misuse of warning beacons. Such stories turn a contested political breakdown into a lesson about a ruler misled by a woman. Historians should distinguish that narrative from the harder problem of reconstructing rival claims and military commitments. The eastward shift was a consequential reorganization of power, not merely the punishment of personal folly.',
 '771 and 770 BCE are conventional anchors. Details of the attack and the famous beacon-fire anecdote depend on later traditions and are not equally secure.',
 [scholar('https://www.chinaknowledge.de/History/Zhou/personszhouyouwang.html','Ulrich Theobald · King You of Zhou'),wiki('King_Ping_of_Zhou')]);
 add('shang-yang','Shang Yang’s reforms in Qin','商鞅变法','Shāng Yāng Biànfǎ',-356,-350,'catalog-SR_WS',
 'Reforms conventionally dated to 356 and 350 BCE associate Shang Yang with Qin’s growing administrative and military strength. Household supervision, rewards for agricultural production and military achievement, and more direct official control linked ordinary activity to the ruler’s resources. The programme helped make population and territory more systematically available for mobilization.',
 'Incentives served coercive government','Rewards could weaken inherited privilege while punishments and collective responsibility tightened control. These were complementary tools, not contradictory principles. The aim was to redirect effort toward cultivation and warfare, reducing the autonomy of powerful households and competing forms of prestige. A system that rewarded achievement could therefore expand opportunity in selected areas while sharply restricting freedom in others.',
 'One reformer does not explain a century of conquest','Shang Yang was executed in 338 BCE, but important institutional changes outlasted him. Qin’s eventual victories also required subsequent rulers, officials, soldiers and logistical development. The Book of Lord Shang is a layered collection associated with his tradition rather than a verbatim record of his policies. Its proposals must be distinguished from evidence that a particular measure was fully implemented throughout Qin.',
 '356–350 BCE marks the traditional two reform phases. The dating and attribution of individual measures, and the composition of the Book of Lord Shang, require caution.',
 [scholar('https://www.chinaknowledge.de/History/Zhou/personsshangyang.html','Ulrich Theobald · Shang Yang'),scholar('https://plato.stanford.edu/entries/chinese-legalism/','Stanford Encyclopedia of Philosophy · Legalism')]);
 add('qin-great-wall','Qin’s northern walls and frontier occupation','秦长城与北方边疆','Qín Chángchéng yǔ Běifāng Biānjiāng',-215,-210,'qin',
 'After unification, Qin campaigns and construction extended control along the northern frontier. Earlier states had already built walls; Qin adapted and connected parts of this defensive landscape. The familiar masonry walls visited today largely belong to much later building, especially under the Ming, rather than to a single intact Qin monument.',
 'A wall needed people behind it','Fortifications worked through garrisons, communications, transport and supply. Their effectiveness depended on the ability to maintain soldiers and labourers across difficult terrain. Construction therefore reveals an imperial claim over resources as much as an architectural achievement. The costs fell unevenly on people assigned to build, provision and defend the frontier, and on communities incorporated into new arrangements of control.',
 'Frontiers were managed rather than sealed','Walls could channel movement and support military occupation without making all exchange impossible. Their routes changed with strategy and political geography. Treating the Great Wall as one timeless national boundary obscures the difference between Qin expansion and later defensive programmes. The monument’s long history is better understood as a succession of projects whose builders faced different enemies, opportunities and constraints.',
 'About 215–210 BCE locates Qin’s northern campaign and construction phase. It is not the invention date of walls or the date of today’s surviving Ming masonry.',
 [scholar('https://whc.unesco.org/en/list/438/','UNESCO · The Great Wall'),wiki('Great_Wall_of_China')]);
 add('yellow-turbans','The Yellow Turban uprising','黄巾起义','Huángjīn Qǐyì',184,184,'han',
 'In 184, networks associated with the religious leader Zhang Jiao rose against Han authority. The rebels’ yellow head coverings supplied their enduring name. Healing, expectations of a transformed order and economic distress helped mobilize followers. Government forces defeated the principal leaders that year, but related armed groups continued operating long afterward.',
 'Religious organization could become political organization','Shared practices and expectations connected people beyond a single locality. They provided a language for interpreting suffering and imagining a different future. Calling the uprising merely superstition misses this organizing capacity; calling it a clearly defined democratic peasant revolution claims more than the evidence permits. The rebels’ intended government is much less securely known than the hostile accounts of their defeat.',
 'Suppression redistributed military power','The court relied on commanders and local forces to confront a widespread challenge. Their mobilization contributed to a landscape in which armed leaders could build independent influence. The rebellion did not itself end Han in 184: the dynasty formally survived until 220. Its importance lies in how revolt and suppression interacted with existing factional conflict, rural insecurity and the changing control of soldiers.',
 '184 dates the main coordinated uprising, not the extinction of every Yellow Turban group. Surviving narratives largely come from the movement’s opponents.',
 [scholar('https://www.chinaknowledge.de/History/Han/han-event-huangjin.html','Ulrich Theobald · The Yellow Turban uprising'),wiki('Yellow_Turban_Rebellion')]);
 add('eight-princes','The wars of the Eight Princes','八王之乱','Bā Wáng zhī Luàn',291,306,'jin-early',
 'The conventional label Eight Princes groups struggles among members of the Sima imperial family between 291 and 306. Court coups developed into wider military conflict as rival princes sought control of the emperor and government. The episode weakened Western Jin’s capacity to maintain the unity achieved after the conquest of Wu in 280.',
 'Kinship could not guarantee coordination','Empowering imperial relatives offered a possible defence against domination by unrelated ministers. Yet those relatives also possessed competing claims and military resources. The same arrangements intended to secure the dynasty enabled contests over its centre. This was an institutional problem as well as a sequence of personal ambitions: command, succession and access to the emperor did not fit into a stable distribution of authority.',
 'Civil war changed the possibilities for other actors','Campaigns disrupted communities and drew additional military groups into struggles for power. The later fragmentation of the north cannot be reduced to a sudden invasion by outsiders. It developed through civil conflict, recruitment, displacement and new coalitions. Western Jin survived beyond 306, losing its capitals in subsequent crises; distinguishing those stages explains how a dynasty could emerge from one struggle already less capable of surviving the next.',
 '291–306 is a conventional grouping of distinct conflicts, not fifteen years of uninterrupted fighting between two fixed sides. Western Jin ended in 316.',
 [scholar('https://www.cambridge.org/core/books/cambridge-history-of-china/western-jin/C26640110C74E0B6FA215625AFBBA6B7','Cambridge History of China · Western Jin'),wiki('War_of_the_Eight_Princes')]);
 add('xiaowen-reforms','Northern Wei reforms and the move to Luoyang','孝文帝改革','Xiàowéndì Gǎigé',485,499,'catalog-R_NS_NORTHERN_WEI',
 'Late fifth-century Northern Wei reforms linked land and household administration to changes in court culture. Empress Dowager Feng and Emperor Xiaowen both shaped the programme. The move from Pingcheng to Luoyang in 494 became its most visible geographical expression, followed by measures affecting elite names, dress, language and marriage.',
 'Administrative reform and cultural policy had different targets','Household registration and land allocation aimed to strengthen government access to agricultural resources. Court reforms reorganized elite conduct and status. Neither can be understood simply as a people choosing to become Chinese. The court selected practices that served a new political centre, while powerful families negotiated or resisted changes that affected their position. Reform redistributed authority within the ruling coalition.',
 'Integration could create new divisions','Relocating the court altered the relationship between metropolitan elites and military communities in the north. It did not instantly erase older identities or produce an administratively uniform state. The reforms’ importance lies in these uneven consequences: measures intended to consolidate imperial rule could leave groups differently connected to its rewards. Later conflict must be studied through those relationships, rather than explained by cultural assimilation alone.',
 '485–499 is a selected reform window, beginning with the equal-field reforms and ending with Xiaowen’s death. Feng’s earlier and continuing role prevents attributing every measure to one emperor.',
 [scholar('https://www.chinaknowledge.de/History/Division/beiwei.html','Ulrich Theobald · Northern Wei and its reforms'),scholar('https://www.chinesethought.cn/EN/detail.aspx?id=2397&nid=114&pid=131','Key Concepts in Chinese Thought and Culture · Xiaowen’s reforms')]);
 add('niu-li-disputes','The Niu–Li disputes and their later interpretation','牛李党争','Niú Lǐ Dǎngzhēng',820,850,'tang',
 'Court conflicts of the early ninth century are traditionally grouped as the struggle between Niu and Li factions, associated with Niu Sengru and Li Deyu. Officials disputed appointments and policy, and suffered reversals as court influence changed. Recent scholarship questions whether these conflicts formed the two coherent, enduring parties described in later histories.',
 'A familiar label can over-organize the evidence','Accounts contrasting newly successful examination graduates with hereditary aristocrats make the disputes appear to express a clean social division. Biographies and relationships resist such a simple partition. Personal connections, policy positions and access to rulers shifted over time. The task is to reconstruct particular conflicts before treating every appointment as the victory of one permanent camp over another.',
 'Later political concerns reshaped Tang history','Song and modern writers gave the disputes different explanatory roles. Some used factionalism as a moral warning; others made it a conflict between social classes or a lesson about modern party politics. This does not establish that the original struggles were imaginary. It shows how the claim that they belonged to one continuous Niu–Li contest acquired authority through later historical writing.',
 'About 820–850 marks the principal disputes conventionally grouped under this label. The existence and composition of two stable factions are contested; the label is retained for chart cross-reference.',
 [scholar('https://www.cambridge.org/core/journals/journal-of-chinese-history/article/niuli-factional-strife-the-origins-of-a-historiographical-fiction/1845DBAD83C09083145C816B8DE768E6','Journal of Chinese History · The Niu–Li factional strife reconsidered'),scholar('https://soas-repository.worktribe.com/output/383615/the-factional-struggle-of-china-820-850-ad','SOAS · The factional struggle of China, 820–850')]);
 add('yue-fei','Yue Fei: warfare, execution and remembered loyalty','岳飞抗金','Yuè Fēi Kàng Jīn',1127,1142,'catalog-R_SSONG',
 'Yue Fei became a leading Southern Song commander in warfare against the Jurchen Jin. His successful campaigns, recall and execution in 1142 later made him an exemplary figure of loyalty. Understanding his career requires placing military ambitions beside the Song court’s diplomatic calculations and its concern about control over powerful commanders.',
 'Recovery and security could point in different directions','A general seeking to recover territory and a court seeking a sustainable settlement faced overlapping but different problems. Armies required revenue and supply; continued campaigning carried political and strategic risks. Explaining these constraints does not justify Yue’s execution. It makes the decision historically intelligible beyond a story in which one traitorous minister alone prevents an otherwise certain victory.',
 'The loyal general acquired new audiences','Later commemoration repeatedly redefined what Yue’s loyalty meant: service to a dynasty, moral steadfastness and modern national identity were not identical claims. Poems, tattoos and family anecdotes became vehicles for these interpretations, with uneven evidence for their attribution. Studying that afterlife shows how a twelfth-century officer could become a powerful symbol for political communities that did not yet exist in his own time.',
 '1127–1142 locates Yue’s Southern Song military career and death, not his lifespan. Famous poems and tattoo stories should not be treated as equally secure contemporary testimony.',
 [scholar('https://www.cambridge.org/core/journals/journal-of-chinese-history/article/toward-a-nation-defined-by-state-tattooed-loyalty-and-the-evolution-of-yue-feis-11031142-image-from-the-song-to-the-present/D36D331BEBA1C16188E89856AAFB533B','Journal of Chinese History · Yue Fei’s changing image'),scholar('https://afe.easia.columbia.edu/main_pop/ps/ps_china-full-river-yuefei.htm','Columbia Asia for Educators · Yue Fei and an attributed poem')]);
 add('song-gunpowder','Gunpowder enters the military manual','武经总要与火药','Wǔjīng Zǒngyào yǔ Huǒyào',1044,1044,'song',
 'The military compendium Wujing zongyao, completed in 1044, recorded gunpowder recipes and methods of military use. It provides an important surviving anchor for a technology that developed through earlier experimentation. Incendiary applications preceded the mature firearms familiar from later centuries; gunpowder’s military history was a sequence of adaptations rather than one instantaneous invention.',
 'A recipe needed a system of production','Ingredients, proportions and preparation mattered, but so did the ability to obtain materials and equip trained forces. Written instructions helped make knowledge available beyond an individual workshop. The connection between a technical description and effective battlefield use nevertheless had to be built through manufacture, supply and practice. A surviving formula demonstrates recorded knowledge, not uniform deployment across every army.',
 'Technology moved across political frontiers','Song opponents also acquired weapons, engineers and techniques. Innovation consequently did not guarantee lasting strategic superiority. Siege conditions and competing military organizations shaped which applications became useful. This is why a list of national inventions can conceal the most interesting history: how knowledge circulated, how institutions converted it into usable force, and why those effects differed between settings.',
 '1044 dates the compendium and its recorded recipes, not the first discovery of every ingredient or the invention of mature cannon. Surviving editions also have a later transmission history.',
 [scholar('https://afe.easia.columbia.edu/songdynasty-module/tech-gunpowder.html','Columbia Asia for Educators · Gunpowder'),wiki('Wujing_Zongyao')]);
 add('red-turbans','The Red Turban rebellions','红巾军起义','Hóngjīnjūn Qǐyì',1351,1368,'yuan',
 'Rebellions beginning in 1351 brought religious expectations of renewal into struggles over late Yuan authority. Groups called Red Turbans did not constitute one consistently directed army. Zhu Yuanzhang emerged from this wider insurgent world and eventually founded Ming, but his victory required defeating rivals as well as overcoming the Yuan state.',
 'Mobilization changed as the struggle developed','Millenarian promises helped recruit followers, while sustained territorial rule required grain, taxation and workable relations with local elites. Rebel leaders could therefore alter their alliances and political language as opportunities changed. The transition from insurgency to government was not merely the expansion of an unchanged movement. It involved selecting institutions and partners capable of supporting a durable regime.',
 'Ming’s victory was one possible outcome','Reading backward from 1368 makes every uprising appear to prepare Zhu’s accession. Contemporary actors confronted several rival projects and repeated changes in military advantage. Yuan’s loss of effective control created openings without deciding who would occupy them. The Red Turban label is useful when it identifies shared symbols and connections, but misleading when it collapses competing armies into a single national liberation campaign.',
 '1351–1368 groups the principal rebellions through Ming’s foundation. Fighting and Yuan political continuity extended beyond 1368; the movement’s religious affiliations and composition varied.',
 [scholar('https://www.cambridge.org/core/journals/journal-of-asian-studies/article/abs/transformations-of-messianic-revolt-and-the-founding-of-the-ming-dynasty/BE0CE955588A1907A2D9EB97E7B42D04','John Dardess · Messianic revolt and the founding of Ming'),wiki('Red_Turban_Rebellions')]);
 add('tumu-crisis','The Tumu crisis: an emperor captured','土木之变','Tǔmù zhī Biàn',1449,1449,'ming',
 'In 1449, an expedition led by the Zhengtong emperor suffered catastrophe against Oirat forces, and the emperor was captured. The court installed another ruler and organized Beijing’s defence. The episode separated possession of the sovereign’s person from control of the state, exposing a dangerous weakness while also demonstrating the government’s ability to continue functioning.',
 'Leadership could magnify logistical risk','A campaigning emperor brought prestige but did not remove the problems of supply, intelligence and command. Later accounts concentrated blame on the eunuch Wang Zhen, a convenient figure through whom officials could explain failure. His role matters, but personal blame should not displace investigation of the decisions and military arrangements that made an imperial expedition vulnerable.',
 'A remembered disaster shaped later arguments','The captive emperor’s eventual return created a further problem of legitimacy alongside the ruler already enthroned. In later Ming political debate, Tumu became an example invoked against dangerous imperial conduct. The event therefore had two histories: the immediate struggle to preserve government and the subsequent use of disaster as a warning. Neither implies that Ming abandoned all offensive action or permanently sealed itself behind walls.',
 '1449 dates the defeat and capture. Zhengtong returned in 1450 and recovered the throne in 1457; those later events should not be compressed into the battle itself.',
 [scholar('https://www.tandfonline.com/doi/abs/10.1080/02549948.2023.2263277','Monumenta Serica · The Tumu crisis in later Ming political discourse'),wiki('Tumu_Crisis')]);
 add('ming-maritime-conflict','Maritime bans, commerce and wokou','海禁与倭寇','Hǎijìn yǔ Wōkòu',1371,1567,'ming',
 'Ming maritime prohibitions restricted private overseas activity while official and illicit exchanges continued. Enforcement changed over time. During the sixteenth-century wokou crisis, coastal violence involved multinational networks with many Chinese participants; the inherited label conventionally translated as Japanese pirates is therefore a poor guide to the composition of particular groups.',
 'Prohibition changed incentives without emptying the sea','Demand for goods and profits from exchange continued under restriction. Merchants, armed brokers and officials negotiated opportunities that could cross the boundary between commerce and predation. This relationship helps explain why a ban could coexist with extensive maritime traffic. It does not mean every merchant was a pirate or that all violence had one economic cause.',
 'Security depended on more than repression','Campaigns against raiders interacted with debates about licensed trade and coastal administration. The partial opening of 1567 changed legal opportunities without ending all restrictions, especially those involving Japan. Historians disagree over the weight to assign prohibition, local power and wider commercial change. The important advance over a closed-country narrative is to examine which movements were forbidden, who could evade controls and how communities experienced the consequences.',
 '1371–1567 is a conventional policy frame, not uninterrupted uniform enforcement. The principal Jiajing-era raids belong to the mid-sixteenth century; wokou does not mean every raider was Japanese.',
 [scholar('https://www.cambridge.org/core/journals/international-journal-of-asian-studies/article/borders-and-beyond-contested-power-and-discourse-around-southeast-coastal-china-in-the-sixteenth-and-seventeenth-centuries/FE4A26C1A1D9204B57711C7640CF98D0','International Journal of Asian Studies · Contested coastal power'),scholar('https://www.cambridge.org/core/books/east-asia-in-the-world/political-economy-of-the-east-asian-maritime-world-in-the-sixteenth-century/BB0758BD1A5C0A7143342A9CB5D86203','Cambridge · The sixteenth-century East Asian maritime economy')]);
 add('zhang-juzheng','Zhang Juzheng and the discipline of government','张居正改革','Zhāng Jūzhèng Gǎigé',1572,1582,'ming',
 'As senior grand secretary, Zhang Juzheng sought tighter supervision of officials and more reliable fiscal administration during the young Wanli emperor’s early reign. His programme is associated with land surveys and the wider use of consolidated tax payments. It depended on court support and administrative pressure, not on an office constitutionally equivalent to a modern prime minister.',
 'A reform was an attempt to make obligations collectible','Combining demands and assessing taxable resources could reduce some confusion while strengthening the state’s claims. Yet converting obligations into silver shifted burdens according to access to markets and bullion. Administrative simplification did not guarantee fairness. Local implementation determined how a formally clearer demand was distributed among households and how much of the collected revenue reached its intended destination.',
 'Concentrated authority made achievement politically fragile','Zhang’s methods affected officials charged with criticism and supervision, producing disputes over whether discipline had become suppression. Recent research argues that the avenues of criticism actually improved under his reforms, challenging the traditional accusations. His posthumous disgrace reveals the dependence of reform on personal relationships at court. It does not establish that every measure disappeared after his death. The episode asks how institutional changes could endure when the coalition enforcing them lost the sovereign’s confidence.',
 '1572–1582 marks Zhang’s dominance and death. The Single Whip reforms had earlier local precedents and uneven implementation; Zhang did not invent silver taxation in one nationwide decree.',
 [scholar('https://www.tandfonline.com/doi/abs/10.1080/0147037X.2025.2557714','Ming Studies · Zhang Juzheng and the avenues of criticism'),wiki('Zhang_Juzheng')]);
 add('kangxi-rule','Kangxi: consolidation and imperial self-presentation','康熙帝统治','Kāngxīdì Tǒngzhì',1661,1722,'qing',
 'Kangxi’s long reign helped consolidate Qing rule through military campaigns, political negotiation and cultural patronage. Suppression of the Three Feudatories and the incorporation of Taiwan were major turning points. Southern inspection tours also presented the emperor as an attentive governor of prosperous regions whose resources and cooperation mattered to the dynasty.',
 'Conquest required several languages of legitimacy','The emperor governed an expanding realm with different political and religious traditions. Manchu imperial identity coexisted with sponsorship of classical learning and claims to responsible government in Chinese settings. Calling this simply assimilation misses the court’s ability to use more than one repertoire of authority. Campaigns and patronage addressed different audiences but contributed to the same effort to stabilize rule.',
 'An inspection was both government and representation','Tour paintings depict ordered landscapes, productive cities and a ruler moving through his domain. They are evidence of how imperial authority wished to be seen, not neutral surveys of contentment. Reading them beside the practical importance of waterways and commerce connects visual splendour to administration. The reign’s achievements should therefore be assessed alongside the costs of war and the selective character of its official image.',
 '1661 dates accession; the Kangxi reign era began in 1662, explaining the two start dates in references. Early government operated through regents; the whole reign was not personal rule from infancy.',
 [scholar('https://afe.easia.columbia.edu/qing/emperors.html','Columbia Asia for Educators · Kangxi’s inspection tours and imperial government'),wiki('Kangxi_Emperor')]);
 add('ccp-founding','The Chinese Communist Party is founded','中国共产党成立','Zhōngguó Gòngchǎndǎng Chénglì',1921,1921,'republic',
 'The Chinese Communist Party’s first congress met in Shanghai in July 1921, connecting small groups of Marxist activists. International Communist networks helped shape its organization. The party that later governed the mainland began as a limited and contested project within a much wider world of labour activism, intellectual debate and nationalist mobilization.',
 'An organization gave ideas a different reach','Study groups and publications could circulate arguments; a party sought coordinated membership and action. That shift raised practical questions about leadership, discipline, resources and relations with workers. Connections with the Comintern supplied assistance and strategic expectations while creating further tensions. The founding should therefore be understood through both Chinese political circumstances and the international aftermath of the Russian Revolution.',
 'Later victory should not settle the meaning of the beginning','Neither a peasant-based revolutionary strategy nor control of a continental state was assured in 1921. Alliances, repression and internal disputes subsequently transformed the organization. Commemorations compress this uncertain history into a founding moment that appears to contain the future. Distinguishing the initial congress from later anniversaries and retrospective narratives restores the small scale of the undertaking and the choices that still lay ahead.',
 'The congress opened on 23 July 1921 in the conventional reconstruction. July 1 is the commemorative anniversary, not the documented opening date. Some details depend on later recollections.',
 [scholar('https://journals.sagepub.com/doi/pdf/10.1177/18681026221141448','Journal of Current Chinese Affairs · A long-term perspective on the CCP'),scholar('https://www.jstor.org/stable/48794941','Historical scholarship · One hundred years of the Chinese Communist Party')]);
 add('zhuge-northern-expeditions','Zhuge Liang’s northern expeditions','诸葛亮北伐','Zhūgě Liàng Běifá',228,234,'catalog-R_SHU',
 'Between 228 and 234, Zhuge Liang directed repeated campaigns from Shu against Wei. These expeditions pursued the restoration claims of a state ruling from Sichuan while confronting a much larger rival. Their outcome depended on mountain routes, transport and the ability to sustain troops as much as on battlefield ingenuity.',
 'Strategy began with the supply problem','An army crossing difficult terrain had to move provisions while preserving the capacity of its home territory to support further campaigns. Shu’s ambition therefore exceeded what a comparison of commanders’ talents could explain. A tactical opportunity was useful only if men and supplies could be brought to exploit it. Repeated withdrawals need to be understood within those constraints rather than read simply as failures of imagination.',
 'Exemplary service acquired a literary afterlife','Zhuge Liang’s death in 234 ended his direction of the campaigns, but not Shu itself, which survived until 263. His reputation later became inseparable from stories of extraordinary foresight and loyalty. The historical significance is more demanding: an administrator and commander attempted to keep a comparatively restricted state capable of pursuing a large political objective. That sustained effort can be studied without treating later fiction as a campaign diary.',
 '228–234 dates the conventional northern expedition sequence. The later Romance of the Three Kingdoms elaborates events and should not be treated as contemporary military evidence.',
 [scholar('https://www.chinaknowledge.de/History/Division/personszhugeliang.html','Ulrich Theobald · Zhuge Liang'),wiki('Zhuge_Liang%27s_Northern_Expeditions')]);
 add('fei-river','The battle of the Fei River','淝水之战','Féishuǐ zhī Zhàn',383,383,'catalog-R_SIXTEEN_FORMER_QIN',
 'In 383, Eastern Jin forces defeated Fu Jian’s Former Qin army at the Fei River. Former Qin had assembled a large northern realm and sought to extend its rule southward. The defeat disrupted that project and accelerated the fragmentation of a coalition whose apparent territorial strength concealed competing political loyalties.',
 'An enlarged realm was not a fully integrated army','Conquest could bring commanders and troops under one sovereign without making their interests identical. Their willingness to remain within the coalition depended on confidence, rewards and the ability of the centre to compel obedience. A battlefield reversal could change those calculations. The resulting defections and rival projects help explain why this defeat mattered beyond the immediate loss of a military engagement.',
 'Victory preserved a political space','Eastern Jin’s survival allowed southern courts and regional elites to continue building institutions around the Yangtze world. Yet the battle did not permanently divide two timeless nations or end Former Qin on the same day. Its significance emerges from the subsequent choices of rulers and military groups. Dramatic accounts of deception and panic should be read alongside those structural consequences, with particular caution about enormous reported army sizes.',
 '383 is the battle year. Former Qin continued until 394; its fragmentation was a process. Received troop totals and tactical anecdotes should not be accepted without qualification.',
 [scholar('https://www.cambridge.org/core/books/abs/cambridge-history-of-china/eastern-jin/26B36E30FF9DDF420EE4B53D3D3E1752','Cambridge History of China · Eastern Jin'),wiki('Battle_of_Fei_River')]);
 add('li-zicheng-beijing','Li Zicheng captures Beijing','李自成攻入北京','Lǐ Zìchéng Gōngrù Běijīng',1644,1644,'ming',
 'Li Zicheng’s forces took Beijing in 1644, and the Chongzhen emperor died as the Ming capital fell. Li had proclaimed a Shun regime, turning insurgent military power into a claim to sovereign government. His occupation was brief: a coalition of Qing forces and the Ming commander Wu Sangui defeated him at Shanhai Pass.',
 'The capital was a prize and an administrative problem','Taking Beijing destroyed the existing court’s immediate position, but did not automatically secure tax collection, supplies or the allegiance of officials and commanders elsewhere. A rebel regime had to govern people whose cooperation might have different costs from their military defeat. The distinction between capturing a political centre and consolidating a state explains why an apparently decisive victory could prove so fragile.',
 '1644 contained more than one transition','The sequence ran from Ming crisis to Shun occupation and then Qing entry, while Ming claimants continued in the south. Treating the year as a simple transfer between two dynasties erases the insurgent alternative and the negotiations that enabled conquest. Nor does Li’s defeat make Qing victory inevitable: it redirected a struggle whose territorial and institutional settlement continued over subsequent decades.',
 '1644 dates the capture and loss of Beijing, not the beginning of Li’s uprising or the end of all Ming resistance. Accounts of his later death are disputed.',
 [scholar('https://www.cambridge.org/core/books/abs/cambridge-history-of-china/taichang-tienchi-and-chungchen-reigns-16201644/C791980FEC0639702C240C52DDCEA8BB','Cambridge History of China · The last Ming reigns, 1620–1644'),wiki('Li_Zicheng')]);
 add('sui-examinations','The emergence of imperial examinations','科举制度形成','Kējǔ Zhìdù Xíngchéng',605,605,'sui',
 'The Sui period is conventionally associated with the emergence of the imperial examination system, with 605 often used as an anchor for the advanced-scholar examination. Written assessment became part of a changing approach to recruitment. It did not immediately replace recommendation, family standing or other routes into official service.',
 'Selecting an official also selected valued knowledge','An examination made performance before the state relevant to political advancement. Over time, the subjects tested and the forms of acceptable answers helped shape education and the ambitions of families seeking office. But this effect developed gradually. The much larger influence of examinations in later dynasties cannot be assumed from the existence of an early test.',
 'A common procedure did not create equal access','Preparation required time, teachers and material support, while eligibility and nomination could restrict participation. The system’s historical importance lies in how it changed recruitment and elite reproduction within those constraints. Its long survival involved repeated redesign, rather than faithful execution of a complete Sui blueprint. The origin story is most useful when it opens that history of institutional change instead of announcing the sudden invention of modern meritocracy.',
 '605 is a conventional teaching anchor; definitions of the first examination differ, and earlier recruitment tests existed. This card marks emergence under Sui, not a securely isolated invention day.',
 [scholar('https://www.nature.com/articles/s41599-025-05366-x','Humanities and Social Sciences Communications · The early imperial examination system'),wiki('Imperial_examination')]);
 add('zhenguan-government','Zhenguan: government and its exemplary record','贞观之治','Zhēnguān zhī Zhì',627,649,'tang',
 'Taizong’s Zhenguan era, 627–649, became one of the most influential models of imperial government. Later compilations represented the ruler discussing policy and accepting criticism from ministers. These texts preserve political arguments while also constructing an exemplary reign: they cannot simply be treated as unedited records of everything said at court.',
 'Good advice required a political relationship','The ideal of remonstrance assumed that ministers could identify dangers and that the sovereign would listen. Yet the ruler retained the authority to appoint, punish and decide. The practical issue was how criticism could operate within that unequal relationship. Stories about receptive kingship offered later officials a language for seeking influence without denying the monarch’s supremacy.',
 'The model outlived its original circumstances','The Essentials of Governance circulated beyond Tang China and entered later political debate across East Asia. Its appeal rested on the possibility of extracting lessons from a particular reign. Historical reading must reverse that abstraction as well: Taizong’s authority followed violent succession struggles and was sustained through military and administrative institutions. The exemplary conversations illuminate ideals of rule, while their selection leaves many experiences of imperial power outside the frame.',
 '627–649 is the Zhenguan reign era, beginning after Taizong’s accession in 626. The surviving governance compilation was produced and transmitted later, with editorial choices and variant versions.',
 [scholar('https://chinese-empires.eu/zgzy/','Communication and Empire · The Essentials of Governance'),scholar('https://www.slam.org/collection/constituents/26910/','Saint Louis Art Museum · Zhenguan period chronology')]);
 add('kaiyuan-era','Kaiyuan: prosperity and the demands of empire','开元盛世','Kāiyuán Shèngshì',713,741,'tang',
 'Xuanzong’s Kaiyuan era, 713–741, is conventionally remembered as a high point of Tang government and prosperity. Court patronage, material production and imperial reach contributed to that reputation. The label flourishing age is a historical judgment, however, not a measurement showing that every region or household enjoyed the same improvement.',
 'Courtly abundance had an economic setting','Objects associated with elite consumption reveal skilled workshops and the movement of resources toward privileged users. Storehouses and commissions connected artistic production to administrative priorities. Their survival makes prosperity visible, but unevenly: the people who supplied materials and labour appear much less clearly than the patrons who acquired the finished objects. Cultural brilliance therefore raises questions about organization and distribution as well as taste.',
 'A peak should not make the future inevitable','The contrast between Kaiyuan prosperity and later rebellion can turn subsequent events into a moral story of luxury causing decline. That approach compresses changing military arrangements, appointments and fiscal demands into a verdict on personal conduct. The reign’s achievement and its vulnerabilities need separate investigation. Neither cultural splendour nor the disasters after 755 establish that collapse was already determined in the 730s.',
 '713–741 is the Kaiyuan era, not Xuanzong’s entire reign. Shengshi, or flourishing age, is an evaluative convention; the An Lushan rebellion began later, in 755.',
 [scholar('https://www.iseas.edu.sg/wp-content/uploads/2016/05/13_hsieh2_kat_246to299.pdf','Asian Civilisations Museum / ISEAS · Tang material culture and court consumption'),wiki('Emperor_Xuanzong_of_Tang')]);

 const clarify=(id,description,refs=[])=>{revisions[id]={description};if(refs.length){revisions[id].sources=refs.map(r=>r[0]);revisions[id].sourceLabels=Object.fromEntries(refs);}};
 clarify('catalog-SR_SA','During the Spring and Autumn period, powerful regional rulers competed to lead alliances while retaining the Zhou king as a source of legitimacy. The conventional Five Hegemons include Duke Huan of Qi and Duke Wen of Jin, but lists of the other three vary. Hegemony was leadership among competing states, not a replacement dynasty ruling a unified empire.',[scholar('https://ctext.org/fengsutongyi/huang-ba/wu-bo/ens','Chinese Text Project · Fengsu Tongyi on the Five Hegemons'),wiki('Five_Hegemons')]);
 clarify('catalog-SR_WS','The Warring States period saw larger territorial states absorb weaker neighbours and intensify military and administrative competition. Its Seven Powers were Qin, Chu, Qi, Yan, Han, Zhao and Wei. These were the dominant competitors rather than the only surviving polities, and they did not appear simultaneously through one founding event.',[scholar('https://www.zgbk.com/ecph/words?ID=135971&SiteID=1&SubID=44006&Type=bkzyb','Encyclopedia of China · Seven Warring States'),wiki('Seven_Warring_States')]);
 clarify('western-zhou','Western Zhou rulers justified their conquest through the Mandate of Heaven and built authority through relationships with regional lords and elite lineages. Later labels fenfeng, or enfeoffment, and zongfa, or lineage organization, describe important aspects of this order. They should not imply a single fully standardized constitution implemented everywhere at the dynasty’s foundation.');
 clarify('catalog-R_HAN_W','Western Han combined centrally governed commanderies with territorial kingdoms. Under Emperor Wu, who reigned 141–87 BCE, campaigns against the Xiongnu and diplomatic missions expanded imperial commitments and costs. Sponsorship of classical learning accompanied, rather than replaced, a diverse apparatus of law, administration and military power. The trade networks later called the Silk Roads grew through these political connections.');
 clarify('catalog-R_SHU','Liu Bei’s court in Sichuan claimed to restore Han legitimacy. Zhuge Liang helped administer the state and directed northern expeditions against Wei in 228–234. Shu’s restricted resource base and the difficulty of supplying campaigns through mountainous terrain constrained its ambition; Wei conquered it in 263. The expeditions were sustained strategic attempts, not the magical feats attributed to their commander in later fiction.');

 clarify('shang','Shang archaeology documents large settlements, sophisticated bronze casting and, at late Shang Anyang, extensive oracle-bone writing. The earlier walled centre at Zhengzhou demonstrates substantial investment in rammed-earth construction and urban organization. These are related but differently dated bodies of evidence; late Shang inscriptions do not prove that every earlier Bronze Age centre belonged to a securely identified Shang royal sequence.',[scholar('https://faculty.risd.edu/bcampbel/Dematte_EarlyDynasties_fromArchaeologica%5B1%5D.pdf','Paola Demattè · Early Chinese dynasties and Zhengzhou archaeology')]);
 clarify('song-shen-kuo','Shen Kuo’s Dream Pool Essays assembled observations on natural phenomena, technical processes and government. Conventionally dated to 1088, it describes magnetized compass needles and their deviation from due south, alongside arguments about tides and the moon and Bi Sheng’s printing method. Recording these techniques was not the same as inventing all of them.',[scholar('https://afe.easia.columbia.edu/songdynasty-module/tech-experiment.html','Columbia Asia for Educators · Shen Kuo and the compass')]);
 clarify('sixteen','The Sixteen Kingdoms label groups competing northern regimes during the fourth and early fifth centuries. The chart’s older expression Five Barbarians uprisings refers to Xiongnu, Jie, Xianbei, Di and Qiang groupings, but its derogatory language and fixed ethnic categories obscure mixed armies, migration and shifting alliances. Conflict grew within and across the former Jin realm; it was not a single united invasion by five peoples.');
 revisions['catalog-SR_WS'].note='The exhibition retains its source catalogue’s 481 BCE start. The reference chart uses 475 BCE; 403 BCE is another common political boundary. These are different periodization conventions, not rival dates for one event. The seven dominant states were not the only polities.';
 Object.assign(pinyin,{'分封':'Fēnfēng','宗法':'Zōngfǎ','春秋五霸':'Chūnqiū Wǔ Bà','战国七雄':'Zhànguó Qī Xióng','贞观之治':'Zhēnguān zhī Zhì','开元盛世':'Kāiyuán Shèngshì','诸葛亮北伐':'Zhūgě Liàng Běifá','淝水之战':'Féishuǐ zhī Zhàn','五胡':'Wǔ Hú','指南针':'Zhǐnánzhēn'});
 const coverage=[
  {
    "subject": "Yu and flood control",
    "ids": [
      "catalog-F_XIA_1",
      "catalog-E_XIA_1"
    ]
  },
  {
    "subject": "Shang bronze casting",
    "ids": [
      "shang"
    ]
  },
  {
    "subject": "Shang walled cities",
    "ids": [
      "shang"
    ]
  },
  {
    "subject": "Shang writing",
    "ids": [
      "oracle"
    ]
  },
  {
    "subject": "Mandate of Heaven",
    "ids": [
      "western-zhou"
    ]
  },
  {
    "subject": "Zongfa lineage organization",
    "ids": [
      "western-zhou"
    ]
  },
  {
    "subject": "Fenfeng / fenfeng enfeoffment",
    "ids": [
      "western-zhou"
    ]
  },
  {
    "subject": "King Wu conquers Shang",
    "ids": [
      "catalog-E_SHANG_2"
    ]
  },
  {
    "subject": "Capital inhabitants’ revolt, 841 BCE",
    "ids": [
      "zhou-gonghe"
    ]
  },
  {
    "subject": "Attack on Zhou capital, 771 BCE",
    "ids": [
      "zhou-capital-crisis"
    ]
  },
  {
    "subject": "Five Hegemons",
    "ids": [
      "catalog-SR_SA"
    ]
  },
  {
    "subject": "Seven Warring States",
    "ids": [
      "catalog-SR_WS"
    ]
  },
  {
    "subject": "Shang Yang reforms",
    "ids": [
      "shang-yang"
    ]
  },
  {
    "subject": "Great Wall",
    "ids": [
      "qin-great-wall"
    ]
  },
  {
    "subject": "Qin First Emperor and unification",
    "ids": [
      "unification",
      "qin"
    ]
  },
  {
    "subject": "Han Wudi and Xiongnu campaigns",
    "ids": [
      "catalog-R_HAN_W",
      "catalog-E_HAN_2"
    ]
  },
  {
    "subject": "Han Wudi and classical learning",
    "ids": [
      "catalog-E_HAN_1",
      "catalog-R_HAN_W"
    ]
  },
  {
    "subject": "Silk Road",
    "ids": [
      "catalog-E_HAN_2"
    ]
  },
  {
    "subject": "Yellow Turbans",
    "ids": [
      "yellow-turbans"
    ]
  },
  {
    "subject": "Papermaking",
    "ids": [
      "paper"
    ]
  },
  {
    "subject": "Red Cliffs",
    "ids": [
      "catalog-E_3K_2"
    ]
  },
  {
    "subject": "Zhuge Liang’s northern expeditions",
    "ids": [
      "catalog-R_SHU"
    ]
  },
  {
    "subject": "Eight Princes",
    "ids": [
      "eight-princes"
    ]
  },
  {
    "subject": "Uprisings traditionally called Five Barbarians",
    "ids": [
      "sixteen",
      "eight-princes",
      "catalog-E_JIN_1"
    ]
  },
  {
    "subject": "Fei River",
    "ids": [
      "catalog-R_SIXTEEN_FORMER_QIN"
    ]
  },
  {
    "subject": "Xiaowen reforms",
    "ids": [
      "xiaowen-reforms"
    ]
  },
  {
    "subject": "Spread of Buddhism",
    "ids": [
      "catalog-E_BUD_ENTRY",
      "catalog-E_BUD_SPREAD",
      "kumarajiva-translations"
    ]
  },
  {
    "subject": "Imperial examinations",
    "ids": [
      "sui",
      "catalog-R_NSONG",
      "qing-exams-end"
    ]
  },
  {
    "subject": "Sui Grand Canal",
    "ids": [
      "sui-grand-canal"
    ]
  },
  {
    "subject": "Zhenguan government",
    "ids": [
      "tang",
      "xuanwu-gate"
    ]
  },
  {
    "subject": "Tang peak / Kaiyuan era",
    "ids": [
      "tang",
      "li-bai-du-fu"
    ]
  },
  {
    "subject": "Wu Zetian",
    "ids": [
      "wu-zhou"
    ]
  },
  {
    "subject": "An Lushan rebellion",
    "ids": [
      "an-lushan"
    ]
  },
  {
    "subject": "Niu–Li disputes",
    "ids": [
      "niu-li-disputes"
    ]
  },
  {
    "subject": "Huang Chao rebellion",
    "ids": [
      "huang-chao"
    ]
  },
  {
    "subject": "Wang Anshi reforms",
    "ids": [
      "song-wang-anshi"
    ]
  },
  {
    "subject": "Yue Fei",
    "ids": [
      "yue-fei"
    ]
  },
  {
    "subject": "Paper currency",
    "ids": [
      "song-paper-money"
    ]
  },
  {
    "subject": "Jingkang",
    "ids": [
      "jingkang"
    ]
  },
  {
    "subject": "Neo-Confucianism",
    "ids": [
      "song-zhu-xi"
    ]
  },
  {
    "subject": "Gunpowder",
    "ids": [
      "song-gunpowder"
    ]
  },
  {
    "subject": "Compass",
    "ids": [
      "song-shen-kuo"
    ]
  },
  {
    "subject": "Printing",
    "ids": [
      "sutra",
      "movable-type"
    ]
  },
  {
    "subject": "Mongol conquest",
    "ids": [
      "yuan",
      "catalog-R_SSONG"
    ]
  },
  {
    "subject": "Red Turban rebellions",
    "ids": [
      "red-turbans"
    ]
  },
  {
    "subject": "Zheng He voyages",
    "ids": [
      "zheng-he"
    ]
  },
  {
    "subject": "Forbidden City",
    "ids": [
      "catalog-C_BEIJING_MING"
    ]
  },
  {
    "subject": "Maritime ban",
    "ids": [
      "ming-maritime-conflict"
    ]
  },
  {
    "subject": "Tumu crisis",
    "ids": [
      "tumu-crisis"
    ]
  },
  {
    "subject": "Wokou raids",
    "ids": [
      "ming-maritime-conflict"
    ]
  },
  {
    "subject": "Li Zicheng and fall of Beijing",
    "ids": [
      "catalog-C_BEIJING_QING"
    ]
  },
  {
    "subject": "Zhang Juzheng reforms",
    "ids": [
      "zhang-juzheng"
    ]
  },
  {
    "subject": "Kangxi",
    "ids": [
      "kangxi-rule"
    ]
  },
  {
    "subject": "First Opium War",
    "ids": [
      "catalog-E_QING_OPIUM",
      "nanking"
    ]
  },
  {
    "subject": "Taiping rebellion",
    "ids": [
      "catalog-E_QING_TAIPING"
    ]
  },
  {
    "subject": "Second Opium War",
    "ids": [
      "catalog-E_QING_OPIUM2"
    ]
  },
  {
    "subject": "Self-Strengthening Movement",
    "ids": [
      "catalog-E_QING_SSM"
    ]
  },
  {
    "subject": "First Sino-Japanese War",
    "ids": [
      "catalog-E_QING_SJ"
    ]
  },
  {
    "subject": "Hundred Days Reform",
    "ids": [
      "catalog-E_QING_100D"
    ]
  },
  {
    "subject": "Boxer movement",
    "ids": [
      "catalog-E_QING_BOXER"
    ]
  },
  {
    "subject": "1911 revolution",
    "ids": [
      "catalog-E_QING_1911"
    ]
  },
  {
    "subject": "1912 abdication / republic",
    "ids": [
      "abdication",
      "republic"
    ]
  },
  {
    "subject": "May Fourth",
    "ids": [
      "catalog-E_MOD_MAY4"
    ]
  },
  {
    "subject": "CCP founding, 1921",
    "ids": [
      "ccp-founding"
    ]
  },
  {
    "subject": "Civil war",
    "ids": [
      "civil-war"
    ]
  },
  {
    "subject": "Long March",
    "ids": [
      "catalog-E_MOD_LONG_MARCH"
    ]
  },
  {
    "subject": "War against Japan",
    "ids": [
      "war-japan"
    ]
  },
  {
    "subject": "PRC founding, 1949",
    "ids": [
      "prc"
    ]
  },
  {
    "subject": "Great Leap Forward",
    "ids": [
      "great-leap"
    ]
  },
  {
    "subject": "Cultural Revolution",
    "ids": [
      "cultural-revolution"
    ]
  },
  {
    "subject": "Mao’s death",
    "ids": [
      "catalog-E_MOD_MAO_DEATH"
    ]
  },
  {
    "subject": "Reform and opening",
    "ids": [
      "reform-opening"
    ]
  },
  {
    "subject": "Special Economic Zones",
    "ids": [
      "catalog-E_MOD_SEZ"
    ]
  },
  {
    "subject": "Tiananmen, 1989",
    "ids": [
      "catalog-E_MOD_TIANANMEN"
    ]
  },
  {
    "subject": "Hong Kong handover",
    "ids": [
      "catalog-E_MOD_HK_RETURN"
    ]
  },
  {
    "subject": "Human spaceflight",
    "ids": [
      "catalog-E_MOD_SPACE"
    ]
  },
  {
    "subject": "Belt and Road",
    "ids": [
      "catalog-E_MOD_BRI"
    ]
  },
  {
    "subject": "Xi Jinping leadership",
    "ids": [
      "catalog-E_MOD_XI"
    ]
  }
];
 const dedicated={'Zhuge Liang’s northern expeditions':'zhuge-northern-expeditions','Fei River':'fei-river','Imperial examinations':'sui-examinations','Zhenguan government':'zhenguan-government','Tang peak / Kaiyuan era':'kaiyuan-era','Li Zicheng and fall of Beijing':'li-zicheng-beijing'};
 Object.assign(pinyin,{'国':'Guó','西':'Xī','商':'Shāng','秦':'Qín','黄':'Huáng','八':'Bā','孝':'Xiào','牛':'Niú','岳':'Yuè','武':'Wǔ','红':'Hóng','土':'Tǔ','海':'Hǎi','张':'Zhāng','康':'Kāng','中':'Zhōng','诸':'Zhū','淝':'Féi','李':'Lǐ','科':'Kē','贞':'Zhēn','开':'Kāi'});
 for(const row of coverage)if(dedicated[row.subject])row.ids.unshift(dedicated[row.subject]);
 // Date audit 2026-09-05. Preserve essay sections and add independently checked date evidence.
 const dateAudit = {
  "xia": {
    "sources": [
      "https://english.chnmus.net/en/exhibitions/permanent/details.html?id=418144425005041137",
      "https://www.cambridge.org/core/journals/early-china/article/abs/sage-king-yu-and-the-bin-gong-xu/C9C992C3FB803232957A781EADF036D6",
      "https://www.cambridge.org/core/journals/journal-of-the-royal-asiatic-society/article/abs/myth-of-the-xia-dynasty/0A0E1FDE4C2DE407BB928745E54A25D0"
    ],
    "dateReview": {
      "status": "disputed",
      "note": "2070–1600 BCE is one modern reconstructed chronology, not securely established exact dates. Xia's identification with excavated cultures and the historical status of its early rulers remain debated. Display as approximate/traditional. Existing UI already labels the date approximate; preserve its fuller description.",
      "sources": [
        "https://english.chnmus.net/en/exhibitions/permanent/details.html?id=418144425005041137",
        "https://www.cambridge.org/core/journals/early-china/article/abs/sage-king-yu-and-the-bin-gong-xu/C9C992C3FB803232957A781EADF036D6",
        "https://www.cambridge.org/core/journals/journal-of-the-royal-asiatic-society/article/abs/myth-of-the-xia-dynasty/0A0E1FDE4C2DE407BB928745E54A25D0"
      ]
    },
    "catalogDates": null,
    "catalogNote": "2070–1600 BCE is one modern reconstructed chronology, not securely established exact dates. Xia's identification with excavated cultures and the historical status of its early rulers remain debated. Display as approximate/traditional."
  },
  "shang": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://umma.umich.edu/objects/gu-libation-goblet-one-of-a-pair-with-1948-1-118-1948-1-117/"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "Museum chronology supports approximately 1600–1046 BCE; early boundaries are reconstructions. 'First archaeological state' is misleading because earlier complex societies are archaeologically known. Existing UI already labels the date approximate; preserve its fuller description.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://umma.umich.edu/objects/gu-libation-goblet-one-of-a-pair-with-1948-1-118-1948-1-117/"
      ]
    },
    "approx": true,
    "catalogDates": null,
    "catalogNote": "Museum chronology supports approximately 1600–1046 BCE; early boundaries are reconstructions. 'First archaeological state' is misleading because earlier complex societies are archaeologically known."
  },
  "western-zhou": {
    "sources": [
      "https://www.metmuseum.org/art/collection/search/42168",
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "Approximately 1046–771 BCE follows the Met. The reconstructed start should not be presented as unquestionably exact. Existing UI already labels the date approximate; preserve its fuller description.",
      "sources": [
        "https://www.metmuseum.org/art/collection/search/42168",
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
      ]
    },
    "approx": true,
    "catalogDates": null,
    "catalogNote": "Approximately 1046–771 BCE follows the Met. The reconstructed start should not be presented as unquestionably exact."
  },
  "eastern-zhou": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://www2.chnmuseum.cn/portals/0/web/zt/gudai/en/index.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "770–256 BCE: 770 marks King Ping's move to Luoyi; 256 is the conventional end of the Zhou royal house. Warring States continues beyond this dynasty's end.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://www2.chnmuseum.cn/portals/0/web/zt/gudai/en/index.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "770–256 BCE: 770 marks King Ping's move to Luoyi; 256 is the conventional end of the Zhou royal house. Warring States continues beyond this dynasty's end."
  },
  "qin": {
    "sources": [
      "https://www.metmuseum.org/essays/qin-dynasty-221-206-b-c"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "221–206 BCE is the standard museum range for the imperial Qin dynasty, not the longer history of the Qin state.",
      "sources": [
        "https://www.metmuseum.org/essays/qin-dynasty-221-206-b-c"
      ]
    },
    "catalogDates": null,
    "catalogNote": "221–206 BCE is the standard museum range for the imperial Qin dynasty, not the longer history of the Qin state."
  },
  "xin": {
    "sources": [
      "https://www.cambridge.org/core/books/abs/cambridge-history-of-china/wang-mang-the-restoration-of-the-han-dynasty-and-later-han/48EC19985183F5A65A477CB7133E8D80"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "9–23 CE follows the Cambridge History of China chronology for Wang Mang's dynasty.",
      "sources": [
        "https://www.cambridge.org/core/books/abs/cambridge-history-of-china/wang-mang-the-restoration-of-the-han-dynasty-and-later-han/48EC19985183F5A65A477CB7133E8D80"
      ]
    },
    "catalogDates": null,
    "catalogNote": "9–23 CE follows the Cambridge History of China chronology for Wang Mang's dynasty."
  },
  "oracle": {
    "sources": [
      "https://asia.si.edu/explore-art-culture/collections/search/edanmdm%3Afsg_FSC-O-1a-e/",
      "https://en.wikipedia.org/wiki/Oracle_bone_script"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "Existing c. 1250 BCE reference is appropriate for the earliest late-Shang corpus; do not force it back to the older workbook's c. 1200. No single invention year is established.",
      "sources": [
        "https://asia.si.edu/explore-art-culture/collections/search/edanmdm%3Afsg_FSC-O-1a-e/",
        "https://en.wikipedia.org/wiki/Oracle_bone_script"
      ]
    },
    "approx": true,
    "catalogDates": {
      "start": -1200,
      "end": -1200,
      "approx": true
    },
    "catalogNote": "1200 BCE is an approximate representative date for surviving late-Shang inscriptions, not a dated invention of writing. The claim is earliest surviving substantial Chinese writing, not earliest writing worldwide."
  },
  "confucius": {
    "sources": [
      "https://plato.stanford.edu/entries/confucius/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "551 BCE traditional birth is already correctly identified by title and note. No change needed.",
      "sources": [
        "https://plato.stanford.edu/entries/confucius/"
      ]
    },
    "catalogDates": null,
    "catalogNote": "551 BCE is the traditional birth date, not the date his philosophy arose. His traditional lifetime is 551–479 BCE. If figures use lifetime spans, adopt that range consistently."
  },
  "unification": {
    "sources": [
      "https://en.chnmuseum.cn/collections_577/collection_highlights_608/artifacts_handed___down_from_ancient_times_612/202008/t20200811_246886.html",
      "https://www2.chnmuseum.cn/portals/0/web/zt/gudai/en/index.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "221 BCE marks completion of the conquests and formation of imperial Qin.",
      "sources": [
        "https://en.chnmuseum.cn/collections_577/collection_highlights_608/artifacts_handed___down_from_ancient_times_612/202008/t20200811_246886.html",
        "https://www2.chnmuseum.cn/portals/0/web/zt/gudai/en/index.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "221 BCE marks completion of the conquests and formation of imperial Qin."
  },
  "catalog-E_XIA_1": {
    "name": "Yu founds Xia (legendary tradition)",
    "sources": [
      "https://english.chnmus.net/en/exhibitions/permanent/details.html?id=418144425005041137",
      "https://www.cambridge.org/core/journals/early-china/article/abs/sage-king-yu-and-the-bin-gong-xu/C9C992C3FB803232957A781EADF036D6"
    ],
    "dateReview": {
      "status": "disputed",
      "note": "2070 BCE is a reconstructed Xia boundary, not an independently verified event. Existing approx and note disclose uncertainty. Prefer an undated legendary card; if a plotted reference is required, preserve the qualifier visibly and never treat it as a factual coronation date.",
      "sources": [
        "https://english.chnmus.net/en/exhibitions/permanent/details.html?id=418144425005041137",
        "https://www.cambridge.org/core/journals/early-china/article/abs/sage-king-yu-and-the-bin-gong-xu/C9C992C3FB803232957A781EADF036D6"
      ]
    },
    "dateLabel": "Date unknown (legendary tradition)",
    "catalogDates": null,
    "catalogNote": "No historically verified founding year. Existing 2070 BCE derives from the selected Xia reconstruction, not independent evidence of Yu founding a dynasty. Do not display it as an exact dated event. Numeric year is retained solely as an editorial placement for compatibility; it is not an asserted historical date."
  },
  "catalog-F_XIA_1": {
    "name": "Yu the Great (legendary figure)",
    "sources": [
      "https://www.cambridge.org/core/journals/early-china/article/abs/sage-king-yu-and-the-bin-gong-xu/C9C992C3FB803232957A781EADF036D6"
    ],
    "dateReview": {
      "status": "disputed",
      "note": "2100 BCE has no verified birth/activity basis. Existing text acknowledges this, but a date label alone can mislead. Recommended date display is Unknown (legendary); numeric 2100 may serve only as explicitly editorial placement, never as historical date.",
      "sources": [
        "https://www.cambridge.org/core/journals/early-china/article/abs/sage-king-yu-and-the-bin-gong-xu/C9C992C3FB803232957A781EADF036D6"
      ]
    },
    "dateLabel": "Date unknown (legendary tradition)",
    "catalogDates": null,
    "catalogNote": "2100 BCE is not a verified birth or activity date. No exact lifetime should be assigned. Keep as an undated legendary figure or use a separately labelled editorial placement. Numeric year is retained solely as an editorial placement for compatibility; it is not an asserted historical date."
  },
  "catalog-E_SHANG_2": {
    "approx": true,
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://openstax.org/books/world-history-volume-1/pages/5-1-ancient-china"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "1046 BCE is a widely adopted reconstructed date for the Zhou conquest, not universally agreed. Display c. 1046 BCE.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://openstax.org/books/world-history-volume-1/pages/5-1-ancient-china"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1046 BCE is a widely adopted reconstructed date for the Zhou conquest, not universally agreed. Display c. 1046 BCE."
  },
  "catalog-R_ZHOU": {
    "approx": true,
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "Approximately 1046–256 BCE follows the Met chronology. The beginning is reconstructed; 256 BCE is the conventional end of Zhou royal rule.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Approximately 1046–256 BCE follows the Met chronology. The beginning is reconstructed; 256 BCE is the conventional end of Zhou royal rule."
  },
  "catalog-SR_SA": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://www.cambridge.org/core/books/abs/cambridge-history-of-ancient-china/spring-and-autumn-period/41B49F658446B6CDC852639FFBD7892C"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "770–481 BCE is a supported scholarly convention. This is a historical period, not a regime; alternatives use 479, 476, or 475 as endpoint.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://www.cambridge.org/core/books/abs/cambridge-history-of-ancient-china/spring-and-autumn-period/41B49F658446B6CDC852639FFBD7892C"
      ]
    },
    "catalogDates": null,
    "catalogNote": "770–481 BCE is a supported scholarly convention. This is a historical period, not a regime; alternatives use 479, 476, or 475 as endpoint."
  },
  "catalog-SR_WS": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://ocw.mit.edu/courses/21h-151-dynastic-china-fall-2024/pages/readings/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "481–221 BCE is an explicit Met chronology, not an error to 'fix' solely because another chronology uses 475 or 403. It is periodization rather than a single founding event.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://ocw.mit.edu/courses/21h-151-dynastic-china-fall-2024/pages/readings/"
      ]
    },
    "catalogDates": null,
    "catalogNote": "481–221 BCE is an explicit Met chronology, not an error to 'fix' solely because another chronology uses 475 or 403. It is periodization rather than a single founding event."
  },
  "catalog-F_SUN": {
    "sources": [
      "https://assets.cambridge.org/97811088/30652/excerpt/9781108830652_excerpt.pdf",
      "https://www.cambridge.org/core/books/abs/sun-tzu-in-the-west/brief-history-of-sunzi-in-china/7D72E0D2B07EE4C01679C56D821A0436"
    ],
    "dateReview": {
      "status": "disputed",
      "note": "500 BCE is only a traditional approximate placement associated with King Helu's reign. Sunzi's historicity and authorship are contested; the surviving Art of War must not be assigned a proven composition date of 500 BCE. Existing UI already labels the date approximate; preserve its fuller description.",
      "sources": [
        "https://assets.cambridge.org/97811088/30652/excerpt/9781108830652_excerpt.pdf",
        "https://www.cambridge.org/core/books/abs/sun-tzu-in-the-west/brief-history-of-sunzi-in-china/7D72E0D2B07EE4C01679C56D821A0436"
      ]
    },
    "catalogDates": null,
    "catalogNote": "500 BCE is only a traditional approximate placement associated with King Helu's reign. Sunzi's historicity and authorship are contested; the surviving Art of War must not be assigned a proven composition date of 500 BCE."
  },
  "catalog-G_ALEX": {
    "start": -356,
    "end": -323,
    "approx": false,
    "note": "356–323 BCE gives Alexander’s lifespan. His Asian campaigns began in 334 BCE. He did not invade China.",
    "description": "Alexander the Great (356–323 BCE) conquered the Achaemenid Persian Empire and carried Macedonian armies into Central Asia and northwestern South Asia. His biography provides wider-world context alongside the Warring States period; these campaigns did not take place in China.",
    "sources": [
      "https://www.iranicaonline.org/articles/alexander-the-great-356-23-bc/"
    ],
    "dateReview": {
      "status": "correct",
      "note": "Use the securely recorded biographical range 356–323 BCE for the existing Alexander subject. The former 330 BCE point was an editorial campaign reference, not inherently an erroneous event date. Do not rename the subject to Persepolis solely to justify that anchor.",
      "sources": [
        "https://www.iranicaonline.org/articles/alexander-the-great-356-23-bc/"
      ]
    },
    "catalogDates": {
      "start": -330,
      "end": -330,
      "approx": true
    },
    "catalogNote": "330 BCE is a campaign reference, not a biographical date. Keep it only as an explicitly approximate editorial marker. Alexander lived 356–323 BCE; a biographical range is preferable when the display supports ranges."
  },
  "catalog-S_QH": {
    "sources": [
      "https://www.metmuseum.org/exhibitions/listings/2017/age-of-empires",
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "221 BCE–220 CE is an editorial umbrella for Qin and Han, including intervening conflicts and Xin; not one continuous regime. Stored duration 441 is coordinate subtraction; elapsed historical years are 440 because BCE/CE has no year zero.",
      "sources": [
        "https://www.metmuseum.org/exhibitions/listings/2017/age-of-empires",
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "221 BCE–220 CE is an editorial umbrella for Qin and Han, including intervening conflicts and Xin; not one continuous regime. Stored duration 441 is coordinate subtraction; elapsed historical years are 440 because BCE/CE has no year zero."
  },
  "catalog-R_HAN_W": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "206 BCE–9 CE is the standard museum convention, beginning with Liu Bang's kingship; 202 BCE marks his imperial accession and is used by other historians. Duration 215 is coordinate subtraction; elapsed historical years 214.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "206 BCE–9 CE is the standard museum convention, beginning with Liu Bang's kingship; 202 BCE marks his imperial accession and is used by other historians. Duration 215 is coordinate subtraction; elapsed historical years 214."
  },
  "catalog-R_HAN_E": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "25–220 CE follows the Met chronology; restoration in 25 is distinct from the earlier Gengshi claimant 23–25.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "25–220 CE follows the Met chronology; restoration in 25 is distinct from the earlier Gengshi claimant 23–25."
  },
  "catalog-E_QIN_2": {
    "name": "Qin standardizes weights and measures",
    "start": -221,
    "end": -221,
    "note": "221 BCE dates the weights-and-measures edict. Other standardization measures developed over time; this marker does not date the completion of every reform.",
    "description": "In 221 BCE, the First Emperor ordered common weights and measures throughout the new empire. Inscribed standard weights preserve evidence of the decree. The narrower event label distinguishes this measure from Qin's broader programmes for writing and administration.",
    "sources": [
      "https://en.chnmuseum.cn/collections_577/collection_highlights_608/artifacts_handed___down_from_ancient_times_612/202008/t20200811_246886.html",
      "https://www.parismuseescollections.paris.fr/fr/ressources-bibliographiques/to-rule-by-manufacture-measurement-regulation-and-metal-weight"
    ],
    "dateReview": {
      "status": "correct",
      "note": "The specific weights-and-measures edict is dated 221 BCE, not 220. Other standardization measures were a process; narrowing the label provides a defensible single year.",
      "sources": [
        "https://en.chnmuseum.cn/collections_577/collection_highlights_608/artifacts_handed___down_from_ancient_times_612/202008/t20200811_246886.html",
        "https://www.parismuseescollections.paris.fr/fr/ressources-bibliographiques/to-rule-by-manufacture-measurement-regulation-and-metal-weight"
      ]
    },
    "catalogDates": null,
    "catalogNote": "The specific weights-and-measures edict is dated 221 BCE, not 220. Other standardization measures were a process; narrowing the label provides a defensible single year."
  },
  "catalog-E_HAN_1": {
    "sources": [
      "https://www-1.gsb.columbia.edu/cosmos/ort/confucianism.htm"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "136 BCE marks official promotion of the Five Classics in Han education and scholarship. The imperial academy followed in 124 BCE. These are distinct milestones in a gradual development, not the simultaneous adoption of one exclusive ideology.",
      "sources": [
        "https://www-1.gsb.columbia.edu/cosmos/ort/confucianism.htm"
      ]
    },
    "approx": false,
    "catalogDates": {
      "start": -136,
      "end": -136,
      "approx": false
    },
    "catalogNote": "130 BCE has no specific event support.136 BCE is a documented milestone in official promotion of the Five Classics. Formation of state Confucianism was gradual, not a single adoption event."
  },
  "catalog-E_HAN_2": {
    "sources": [
      "https://en.unesco.org/silkroad/sites/default/files/knowledge-bank-article/the%20opening%20of%20the%20silk%20route.pdf",
      "https://www.unesco.org/en/silk-roads/about-silk-roads"
    ],
    "dateReview": {
      "status": "disputed",
      "note": "138 BCE is the selected conventional departure date for Zhang Qian’s first western mission, commonly dated 138–126 BCE. A UNESCO overview uses 139 BCE for departure. Earlier trade and later exchanges make this a mission milestone, not the creation of the Silk Roads.",
      "sources": [
        "https://en.unesco.org/silkroad/sites/default/files/knowledge-bank-article/the%20opening%20of%20the%20silk%20route.pdf",
        "https://www.unesco.org/en/silk-roads/about-silk-roads"
      ]
    },
    "approx": true,
    "catalogDates": {
      "start": -138,
      "end": -138,
      "approx": false
    },
    "catalogNote": "130 BCE is unsupported as a precise 'Silk Road expansion' event.138 BCE dates Zhang Qian's departure in the UNESCO education publication; another UNESCO overview uses 139 BCE. Trade routes predated and developed after this mission."
  },
  "catalog-E_BUD_ENTRY": {
    "sources": [
      "https://archive.asia.si.edu/exhibitions/online/buddhism/china1.htm",
      "https://www.metmuseum.org/ja/essays/chinese-buddhist-sculpture"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "50 CE is an editorial midpoint for the first century, not an attested arrival year. Precise introduction is unknown; earlier contacts are possible. Retain year 50 only when displayed explicitly as first-century approximation. Existing UI already labels the date approximate; preserve its fuller description.",
      "sources": [
        "https://archive.asia.si.edu/exhibitions/online/buddhism/china1.htm",
        "https://www.metmuseum.org/ja/essays/chinese-buddhist-sculpture"
      ]
    },
    "approx": true,
    "catalogDates": null,
    "catalogNote": "50 CE is an editorial midpoint for the first century, not an attested arrival year. Precise introduction is unknown; earlier contacts are possible. Retain year 50 only when displayed explicitly as first-century approximation."
  },
  "catalog-C_QIN": {
    "approx": true,
    "sources": [
      "https://smarthistory.org/the-terracotta-warriors/",
      "https://www.metmuseum.org/exhibitions/listings/2017/age-of-empires"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "210 BCE is the emperor's death/burial reference, not exact construction date for every statue. Existing explanation is correct; approx flag should match.",
      "sources": [
        "https://smarthistory.org/the-terracotta-warriors/",
        "https://www.metmuseum.org/exhibitions/listings/2017/age-of-empires"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Around 210 BCE is a conventional art-historical date associated with the First Emperor's burial. Manufacture occurred over time; this is not a precise creation day/year for every figure."
  },
  "catalog-E_3K_2": {
    "sources": [
      "https://openresearch-repository.anu.edu.au/server/api/core/bitstreams/4d765733-dc96-43ee-8243-248abea243bd/content",
      "https://en.wikipedia.org/wiki/Battle_of_Red_Cliffs"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "208 CE follows Rafe de Crespigny's scholarly chronology. Winter of Jian'an 13 overlaps 208–209 in Julian conversion. Parent Eastern Han is correct; the formal Three Kingdoms period starts 220.",
      "sources": [
        "https://openresearch-repository.anu.edu.au/server/api/core/bitstreams/4d765733-dc96-43ee-8243-248abea243bd/content",
        "https://en.wikipedia.org/wiki/Battle_of_Red_Cliffs"
      ]
    },
    "catalogDates": null,
    "catalogNote": "208 CE follows Rafe de Crespigny's scholarly chronology. Winter of Jian'an 13 overlaps 208–209 in Julian conversion. Parent Eastern Han is correct; the formal Three Kingdoms period starts 220."
  },
  "late-warring": {
    "sources": [
      "https://www.cambridge.org/core/journals/early-china/article/emergence-of-logistics-networks-and-financial-administration-during-the-qin-conquest-230221-bce/88CAA846820D79FE59DE99630ADB3528"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "256–221 BCE is explicitly editorial, not a claimed dynasty. Final conquests 230–221 match the scholarly article. Keep its note.",
      "sources": [
        "https://www.cambridge.org/core/journals/early-china/article/emergence-of-logistics-networks-and-financial-administration-during-the-qin-conquest-230221-bce/88CAA846820D79FE59DE99630ADB3528"
      ]
    }
  },
  "han": {
    "sources": [
      "https://www.metmuseum.org/essays/han-dynasty-206-b-c-220-a-d"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "206 BCE–220 CE museum envelope is supported; Xin interruption and 202 imperial accession are already explained. Description saying dynasty encompassed Xin should become: The overview spans Western Han, the intervening Xin regime, and Eastern Han.",
      "sources": [
        "https://www.metmuseum.org/essays/han-dynasty-206-b-c-220-a-d"
      ]
    }
  },
  "paper": {
    "sources": [
      "https://mci.si.edu/node/1246765",
      "https://en.wikipedia.org/wiki/Cai_Lun"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "105 CE traditional improvement/report date is correct as qualified. Smithsonian bibliographic abstract confirms paper existed before 105. Existing Iranica page concerns Persian papermaking and does not directly evidence 105; replace or supplement with direct Cai Lun evidence.",
      "sources": [
        "https://mci.si.edu/node/1246765",
        "https://en.wikipedia.org/wiki/Cai_Lun"
      ]
    }
  },
  "laozi": {
    "sources": [
      "https://plato.stanford.edu/entries/laozi/"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "400–250 BCE is interpretive text-formation range, not Laozi lifespan. SEP describes fourth-century development and relatively stable form by mid-third century. Existing approx and caveat are appropriate.",
      "sources": [
        "https://plato.stanford.edu/entries/laozi/"
      ]
    },
    "approx": true
  },
  "mozi": {
    "start": -430,
    "end": -430,
    "note": "Mozi flourished around 430 BCE according to the Stanford Encyclopedia of Philosophy. This is an approximate activity marker, not a birth/death date.",
    "sources": [
      "https://plato.stanford.edu/entries/mohism/"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "450–390 BCE was editorial movement window, not a directly evidenced life interval. Prefer explicitly supported fl. c. 430 BCE marker. Existing description of later fifth-century activity remains valid.",
      "sources": [
        "https://plato.stanford.edu/entries/mohism/"
      ]
    },
    "approx": true
  },
  "mencius": {
    "sources": [
      "https://afe.easia.columbia.edu/chinawh/web/help/readings.html",
      "https://plato.stanford.edu/entries/mencius/"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "c. 370–290 BCE supported by Columbia educational chronology. Alternatives such as 372–289 exist; retain approximate flag.",
      "sources": [
        "https://afe.easia.columbia.edu/chinawh/web/help/readings.html",
        "https://plato.stanford.edu/entries/mencius/"
      ]
    },
    "approx": true
  },
  "zhuangzi": {
    "sources": [
      "https://plato.stanford.edu/entries/zhuangzi/"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "350–250 BCE is a selected window for early textual development; SEP supports late-fourth-century author activity and subsequent layers, not these exact endpoints. Existing note explicitly identifies an approximate textual range. Preserve distinction from life dates.",
      "sources": [
        "https://plato.stanford.edu/entries/zhuangzi/"
      ]
    },
    "approx": true
  },
  "xunzi": {
    "sources": [
      "https://plato.stanford.edu/entries/xunzi/"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "c. 310 BCE birth estimate and alive after 238 BCE are supported. Existing note correctly says 238 is not death; date display should say c. 310–after 238 BCE, not merely 310–238.",
      "sources": [
        "https://plato.stanford.edu/entries/xunzi/"
      ]
    },
    "approx": true
  },
  "han-fei": {
    "sources": [
      "https://krimdok.uni-tuebingen.de/AuthorityRecord/079343937",
      "https://plato.stanford.edu/entries/chinese-legalism/"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "c. 280–233 BCE supported by University of Tuebingen authority record; birth approximate, 233 death. Current note correctly distinguishes them.",
      "sources": [
        "https://krimdok.uni-tuebingen.de/AuthorityRecord/079343937",
        "https://plato.stanford.edu/entries/chinese-legalism/"
      ]
    },
    "approx": true
  },
  "mawangdui-manuscripts": {
    "sources": [
      "https://zenodo.org/records/12573936",
      "https://en.wikipedia.org/wiki/Mawangdui"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "168 BCE is evidenced by tomb 3 inventory slip; note correctly distinguishes burial/closure from composition. Scholarly manuscript record supports this specific dating.",
      "sources": [
        "https://zenodo.org/records/12573936",
        "https://en.wikipedia.org/wiki/Mawangdui"
      ]
    }
  },
  "sima-qian": {
    "end": -91,
    "note": "c. 109–91 BCE follows the usual composition dating in the Chinese Text Project and University of Vienna bibliographic guide. It is not an exact publication schedule; portions and subsequent transmission have separate histories.",
    "sources": [
      "https://ctext.org/shiji",
      "https://china-bibliographie.univie.ac.at/2010/09/30/chavannes-les-memoires-historiques-de-se-ma-tsien/"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "Existing c. 109–90 is rounded; 109–91 has direct source support. Neither is Sima Qian's lifespan; label already names composition.",
      "sources": [
        "https://ctext.org/shiji",
        "https://china-bibliographie.univie.ac.at/2010/09/30/chavannes-les-memoires-historiques-de-se-ma-tsien/"
      ]
    },
    "approx": true
  },
  "salt-iron-debate": {
    "sources": [
      "https://afe.easia.columbia.edu/main_pop/ps/ps_china-debate-salt-iron.htm",
      "https://www.loc.gov/resource/gdcwdl.wdl_17196_001/?sp=29"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "81 BCE conference supported by Columbia and Library of Congress; compilation occurred later, as card says.",
      "sources": [
        "https://afe.easia.columbia.edu/main_pop/ps/ps_china-debate-salt-iron.htm",
        "https://www.loc.gov/resource/gdcwdl.wdl_17196_001/?sp=29"
      ]
    }
  },
  "ban-zhao": {
    "sources": [
      "https://www.columbia.edu/itc/ealac/moerman/fall2000/edit/pdfs/wk2/banzha1.pdf"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "92–c. 116 CE is a selected late-career interval, bounded by Ban Gu death and Ban Zhao approximate death. It is not her lifespan or precisely dated composition range; existing note is correct.",
      "sources": [
        "https://www.columbia.edu/itc/ealac/moerman/fall2000/edit/pdfs/wk2/banzha1.pdf"
      ]
    },
    "approx": true
  },
  "zhang-heng": {
    "sources": [
      "https://mathshistory.st-andrews.ac.uk/Biographies/Zhang_Heng/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "132 CE device date supported by St Andrews. Existing caution about mechanism and reconstructions appropriate.",
      "sources": [
        "https://mathshistory.st-andrews.ac.uk/Biographies/Zhang_Heng/"
      ]
    }
  },
  "nine-chapters": {
    "note": "The plotted ca. 100 BCE–100 CE interval is an editorial Han-period reference, not an established formation range. MacTutor discusses origins around 200 BCE and alternative dating between 100 BCE and 50 CE. Different layers have different dates; Liu Hui’s commentary dates to 263 CE.",
    "sources": [
      "https://mathshistory.st-andrews.ac.uk/HistTopics/Nine_chapters/"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "No exact formation endpoints are established. Retain the existing coordinates only as a visibly editorial placement; do not replace them with a synthesized 200 BCE–50 CE range and call it consensus. The revised note distinguishes the plotted window from dates actually discussed by the source.",
      "sources": [
        "https://mathshistory.st-andrews.ac.uk/HistTopics/Nine_chapters/"
      ]
    },
    "approx": true
  },
  "zhou-gonghe": {
    "sources": [
      "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001784784",
      "https://en.wikipedia.org/wiki/Gonghe_Regency"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "841–828 BCE is conventional and supported by Korean academic abstract; 842 start alternative already disclosed. The named lord versus joint-regency interpretation is disputed.",
      "sources": [
        "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001784784",
        "https://en.wikipedia.org/wiki/Gonghe_Regency"
      ]
    }
  },
  "zhou-capital-crisis": {
    "sources": [
      "https://api.pageplace.de/preview/DT0400.9780511345593_A23677391/preview-9780511345593_A23677391.pdf",
      "https://www2.chnmuseum.cn/portals/0/web/zt/gudai/en/index.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "771 King You death/Western Zhou end and 770 eastward move are supported. Exact political narrative has greater uncertainty, as note explains.",
      "sources": [
        "https://api.pageplace.de/preview/DT0400.9780511345593_A23677391/preview-9780511345593_A23677391.pdf",
        "https://www2.chnmuseum.cn/portals/0/web/zt/gudai/en/index.html"
      ]
    }
  },
  "shang-yang": {
    "sources": [
      "https://www.chinaknowledge.de/History/Zhou/personsshangyang.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "356 and 350 BCE phases explicitly supported. Range connects two phases, not six continuous years of uniform reform; note is adequate.",
      "sources": [
        "https://www.chinaknowledge.de/History/Zhou/personsshangyang.html"
      ]
    }
  },
  "qin-great-wall": {
    "approx": true,
    "sources": [
      "https://whc.unesco.org/en/list/438/",
      "https://en.wikipedia.org/wiki/Meng_Tian"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "215–210 BCE is an approximate selected frontier-campaign interval, not securely dated bounds for all wall building. UNESCO instead says c. 220 BCE, so current UNESCO citation alone cannot prove 215–210. Keep note explicit and approx true; do not present as construction start/completion dates.",
      "sources": [
        "https://whc.unesco.org/en/list/438/",
        "https://en.wikipedia.org/wiki/Meng_Tian"
      ]
    }
  },
  "yellow-turbans": {
    "sources": [
      "https://openresearch-repository.anu.edu.au/server/api/core/bitstreams/3df5d9aa-26db-44c1-8372-14d21d5a4250/content",
      "https://www.chinaknowledge.de/History/Han/han-event-huangjin.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "184 CE main uprising confirmed by de Crespigny's chronology and ChinaKnowledge. Later remnants do not require extending the onset marker.",
      "sources": [
        "https://openresearch-repository.anu.edu.au/server/api/core/bitstreams/3df5d9aa-26db-44c1-8372-14d21d5a4250/content",
        "https://www.chinaknowledge.de/History/Han/han-event-huangjin.html"
      ]
    }
  },
  "division": {
    "approx": true,
    "sources": [
      "https://www.metmuseum.org/toah/ht/05/eac.html",
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "220–581 is a declared editorial Han-to-Sui foundation frame. Political division continued until Chen conquest in 589, already stated in the note; neither date should be presented as the only periodization.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/05/eac.html",
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    }
  },
  "sui": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "581–618 is supported; Sui–Tang is an editorial aggregate, not one dynasty.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "581–618 is supported; Sui–Tang is an editorial aggregate, not one dynasty."
  },
  "tang": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "618–907 is supported; Sui–Tang is an editorial aggregate, not one dynasty.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "618–907 is supported; Sui–Tang is an editorial aggregate, not one dynasty."
  },
  "wu-zhou": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "690–705 is Wu Zetian’s imperial Zhou period, as distinguished from her earlier dominance of the Tang court.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    }
  },
  "five-dynasties": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "907–960 is supported; Sui–Tang is an editorial aggregate, not one dynasty.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "907–960 is supported; Sui–Tang is an editorial aggregate, not one dynasty."
  },
  "three-kingdoms": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://www.eastasianhistory.org/sites/default/files/article-content/01/EAH01_01.pdf",
      "https://www.eastasianhistory.org/sites/default/files/article-content/02/EAH02_07.pdf",
      "https://dash.harvard.edu/server/api/core/bitstreams/7312037e-7325-6bd4-e053-0100007fdf3b/content",
      "https://medievalworlds.net/0xc1aa5572_0x003f8da1.pdf",
      "https://web.archive.org/web/2023/https://www.chinaknowledge.de/History/Division/sanguo-event.html",
      "https://web.archive.org/web/2023/https://www.chinaknowledge.de/History/Division/sanguo-military.html",
      "https://web.archive.org/web/2023/https://www.chinaknowledge.de/Literature/Novels/sanguoyanyi.html",
      "https://babelstone.co.uk/SanguoYanyi/TextualHistory/Authorship.html",
      "https://www.cambridge.org/core/books/cambridge-history-of-china/wei/5BFDF2845654D4FC6D7C8BDC6F5D8470/core-reader",
      "https://en.wikipedia.org/wiki/Records_of_the_Three_Kingdoms",
      "https://en.wikipedia.org/wiki/Battle_of_Red_Cliffs",
      "https://en.wikipedia.org/wiki/Three_Kingdoms",
      "https://en.wikipedia.org/wiki/Cao_Cao_Mausoleum",
      "https://www.sixthtone.com/news/1006043"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "220–280 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "220–280 follows the museum chronology.",
    "related": [
      "catalog-E_3K_1",
      "catalog-R_WEI",
      "catalog-R_SHU",
      "catalog-R_WU",
      "catalog-E_3K_2",
      "yellow-turbans",
      "zhuge-northern-expeditions",
      "han",
      "catalog-R_HAN_E",
      "catalog-R_HAN_W",
      "jin-early",
      "catalog-R_JIN_W",
      "catalog-R_JIN_EASTERN_JIN",
      "division",
      "eight-princes",
      "sixteen",
      "southward-economic-shift",
      "sui-examinations",
      "song-zhu-xi",
      "catalog-R_NSONG",
      "yuan",
      "ming",
      "qing",
      "ming-journey-west"
    ],
    "sourceLabels": {
      "https://www.eastasianhistory.org/sites/default/files/article-content/01/EAH01_01.pdf": "Rafe de Crespigny · The Three Kingdoms and Western Jin, Part I",
      "https://www.eastasianhistory.org/sites/default/files/article-content/02/EAH02_07.pdf": "Rafe de Crespigny · The Three Kingdoms and Western Jin, Part II",
      "https://dash.harvard.edu/server/api/core/bitstreams/7312037e-7325-6bd4-e053-0100007fdf3b/content": "Xiaofei Tian · Remaking History: The Shu and Wu Perspectives in the Three Kingdoms Period",
      "https://medievalworlds.net/0xc1aa5572_0x003f8da1.pdf": "Q. Edward Wang · The Legitimacy Debate and Historical Interpretation in the Post-Han Periods",
      "https://web.archive.org/web/2023/https://www.chinaknowledge.de/History/Division/sanguo-event.html": "Ulrich Theobald · ChinaKnowledge, Previous Events of the Three Empires",
      "https://web.archive.org/web/2023/https://www.chinaknowledge.de/History/Division/sanguo-military.html": "Ulrich Theobald · ChinaKnowledge, Military History of the Three Empires",
      "https://web.archive.org/web/2023/https://www.chinaknowledge.de/Literature/Novels/sanguoyanyi.html": "Ulrich Theobald · ChinaKnowledge, Sanguo yanyi",
      "https://babelstone.co.uk/SanguoYanyi/TextualHistory/Authorship.html": "Andrew West · BabelStone, The Textual History of Sanguo Yanyi",
      "https://www.cambridge.org/core/books/cambridge-history-of-china/wei/5BFDF2845654D4FC6D7C8BDC6F5D8470/core-reader": "Cambridge History of China vol. 2 · The Six Dynasties 220–589, chapter on Wei",
      "https://en.wikipedia.org/wiki/Records_of_the_Three_Kingdoms": "Wikipedia · Records of the Three Kingdoms",
      "https://en.wikipedia.org/wiki/Battle_of_Red_Cliffs": "Wikipedia · Battle of Red Cliffs",
      "https://en.wikipedia.org/wiki/Three_Kingdoms": "Wikipedia · Three Kingdoms",
      "https://en.wikipedia.org/wiki/Cao_Cao_Mausoleum": "Wikipedia · Cao Cao Mausoleum",
      "https://www.sixthtone.com/news/1006043": "Sixth Tone · How Guan Yu Became China's God of War, Wealth, and Everything Else"
    }
  },
  "jin-early": {
    "sources": [
      "https://assets.cambridge.org/97811071/35840/frontmatter/9781107135840_frontmatter.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "266–420 is the combined Western and Eastern Jin span. Foundation can appear as 265 under another calendrical convention.",
      "sources": [
        "https://assets.cambridge.org/97811071/35840/frontmatter/9781107135840_frontmatter.pdf"
      ]
    }
  },
  "sixteen": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "304–439 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "304–439 follows the museum chronology."
  },
  "north-south": {
    "sources": [
      "https://assets.cambridge.org/97811071/35840/frontmatter/9781107135840_frontmatter.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "420–589 is a supported periodization; Northern Wei began earlier, in 386. Do not infer containment of all northern states.",
      "sources": [
        "https://assets.cambridge.org/97811071/35840/frontmatter/9781107135840_frontmatter.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "420–589 is a supported periodization; Northern Wei began earlier, in 386. Do not infer containment of all northern states."
  },
  "liao": {
    "source": "https://resources.metmuseum.org/resources/metpublications/pdf/The_Arts_of_Korea_A_Resource_for_Educators.pdf",
    "sources": [
      "https://depts.washington.edu/silkroad/exhibit/khitans/essay.html",
      "https://www.metmuseum.org/toah/ht/06/eac.html",
      "https://resources.metmuseum.org/resources/metpublications/pdf/The_Arts_of_Korea_A_Resource_for_Educators.pdf",
      "https://www.cambridge.org/core/journals/modern-asian-studies/article/what-keeps-the-kitans-enigmatic-roots-of-the-ethnic-narrative-in-liao-historiography/9F3D25689A854A6B965198FFCD009FDA",
      "https://history.yale.edu/sites/default/files/files/V%20Hansen%2C%20Kitan-Liao%20and%20Jurchen-Jin%20%202019.pdf",
      "https://www.cambridge.org/core/books/abs/cambridge-history-of-china/liao/40E26AA348C389272574241A2092D79C",
      "https://www.cambridge.org/core/books/abs/cambridge-history-of-chinese-literature/north-and-south-the-twelfth-and-thirteenth-centuries/61601DC54708F14962001A8CCF558427",
      "https://www.metmuseum.org/art/collection/search/44799",
      "https://www.metmuseum.org/art/collection/search/61744",
      "https://resources.metmuseum.org/resources/metpublications/pdf/Defining_Yongle_Imperial_Art_in_Early_Fifteenth_Century_China.pdf",
      "https://whc.unesco.org/en/tentativelists/5803/",
      "https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/",
      "https://www.cambridge.org/core/journals/journal-of-the-royal-asiatic-society/article/koktash-underground-mausoleum-in-northeastern-kyrgyzstan-the-firstever-identified-qara-khitai-elite-tomb/91F251DFB09E9FFFF230BDD774EC26A1"
    ],
    "sourceLabels": {
      "https://resources.metmuseum.org/resources/metpublications/pdf/The_Arts_of_Korea_A_Resource_for_Educators.pdf": "The Met · Arts of Korea and Liao chronology",
      "https://www.cambridge.org/core/journals/modern-asian-studies/article/what-keeps-the-kitans-enigmatic-roots-of-the-ethnic-narrative-in-liao-historiography/9F3D25689A854A6B965198FFCD009FDA": "Pamela Crossley · Liao population and government",
      "https://history.yale.edu/sites/default/files/files/V%20Hansen%2C%20Kitan-Liao%20and%20Jurchen-Jin%20%202019.pdf": "Valerie Hansen · Khitan Liao and Jurchen Jin",
      "https://www.cambridge.org/core/books/abs/cambridge-history-of-china/liao/40E26AA348C389272574241A2092D79C": "Cambridge History of China · The Liao",
      "https://www.cambridge.org/core/books/abs/cambridge-history-of-chinese-literature/north-and-south-the-twelfth-and-thirteenth-centuries/61601DC54708F14962001A8CCF558427": "Cambridge History of Chinese Literature · Jurchen conquest",
      "https://www.metmuseum.org/art/collection/search/44799": "The Met · Liao ceramic arhat",
      "https://www.metmuseum.org/art/collection/search/61744": "The Met · Liao funerary mask",
      "https://resources.metmuseum.org/resources/metpublications/pdf/Defining_Yongle_Imperial_Art_in_Early_Fifteenth_Century_China.pdf": "The Met · Imported objects in a Liao tomb",
      "https://whc.unesco.org/en/tentativelists/5803/": "UNESCO · Yingxian wooden pagoda",
      "https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/": "Unicode Consortium · Khitan scripts",
      "https://www.cambridge.org/core/journals/journal-of-the-royal-asiatic-society/article/koktash-underground-mausoleum-in-northeastern-kyrgyzstan-the-firstever-identified-qara-khitai-elite-tomb/91F251DFB09E9FFFF230BDD774EC26A1": "Journal of the Royal Asiatic Society · Western Liao"
    },
    "dateReview": {
      "status": "disputed",
      "note": "916 is the formal imperial-state milestone; 907 dates Abaoji’s earlier accession and is used by the source dataset. Retain 916 with this distinction.",
      "sources": [
        "https://depts.washington.edu/silkroad/exhibit/khitans/essay.html",
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": {
      "start": 907,
      "end": 1125,
      "approx": true
    },
    "catalogNote": "907–1125 is a supported Khitan-state convention; 916 denotes imperial proclamation. Name already qualifies Liao as Khitan."
  },
  "reunification": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "589 marks Sui conquest of Chen and reunification; distinct from Sui foundation in 581.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "589 marks Sui conquest of Chen and reunification; distinct from Sui foundation in 581."
  },
  "an-lushan": {
    "sources": [
      "https://ajaonline.org/wp-content/uploads/2011/03/AJAonline_China_Dawn_of_a_Golden_Age2.pdf",
      "http://www.chinaknowledge.de/History/Tang/tang-event-anlushanrebellion.html",
      "http://www.chinaknowledge.de/History/Terms/fanzhen.html",
      "http://www.chinaknowledge.de/History/Terms/huji.html",
      "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/reach-of-the-military-tang/ECFE9C64AE6E73EC4319B165A606F88C",
      "https://www.cambridge.org/core/books/abs/cambridge-history-of-china/court-and-province-in-mid-and-late-tang/9944E1F41895AF5010CD2B7F97EB0DAB",
      "https://www.cambridge.org/core/books/abs/cambridge-economic-history-of-china/public-finance/DBE2FA37763786D641ED7D999E1C55CC",
      "https://dergipark.org.tr/en/download/article-file/3797515",
      "https://www.lse.ac.uk/asset-library/information/wp7603.pdf",
      "https://d-nb.info/1238874010/34",
      "https://www.iranicaonline.org/articles/personal-names-sogdian-1-in-chinese-sources/",
      "https://sogdians.si.edu/introduction/",
      "https://reviews.history.ac.uk/review/1807/",
      "https://www.tandfonline.com/doi/abs/10.1080/07375034.2018.1514701",
      "https://bedejournal.blogspot.com/2011/11/steven-pinker-and-an-lushan-revolt.html",
      "https://www.ebsco.com/research-starters/history/rebellion-lushan",
      "https://www.ebsco.com/research-starters/history/tibetans-capture-changan",
      "http://thechinaproject.com/2021/02/03/the-end-of-chinas-golden-age/",
      "https://tjj.sh.gov.cn/tjzx_tjls/20190312/0014-1003239.html",
      "https://commons.wikimedia.org/wiki/File:Yan_Zhenqing_-_Draft_of_a_Requiem_to_My_Nephew.jpg",
      "https://learning.hku.hk/ccch9051/group-24/items/show/40",
      "https://en.wikipedia.org/wiki/An_Lushan_rebellion",
      "https://en.wikipedia.org/wiki/An_Lushan",
      "https://en.wikipedia.org/wiki/Yan_(An%E2%80%93Shi)",
      "https://en.wikipedia.org/wiki/Emperor_Xuanzong_of_Tang",
      "https://en.wikipedia.org/wiki/Battle_of_Xiangji_Temple",
      "https://en.wikipedia.org/wiki/Siege_of_Suiyang",
      "https://en.wikipedia.org/wiki/Li_Baoyu",
      "https://en.wikipedia.org/wiki/Chang_Hen_Ge_(poem)",
      "https://en.wikipedia.org/wiki/Shence_Army",
      "https://en.wikipedia.org/wiki/Three_Fanzhen_of_Hebei"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "755 is the onset; the rebellion continued to 763. Keep point at onset; describe 755–763 in summary.",
      "sources": [
        "https://ajaonline.org/wp-content/uploads/2011/03/AJAonline_China_Dawn_of_a_Golden_Age2.pdf"
      ]
    },
    "catalogDates": {
      "start": 755,
      "end": 755,
      "approx": false
    },
    "catalogNote": "755 is the onset; the rebellion continued to 763. Keep point at onset; describe 755–763 in summary.",
    "related": [
      "two-tax",
      "huichang",
      "huang-chao",
      "tang",
      "li-bai-du-fu",
      "yuan-drama",
      "chang-an"
    ]
  },
  "sutra": {
    "sources": [
      "https://idp.bl.uk/discover/learning/buddhism-on-the-silk-roads/articles/buddhism-on-the-ground/buddhist-texts-the-diamond-sutra/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "868 dates this printed copy (colophon 11 May), not composition of the Buddhist scripture. The existing description correctly distinguishes it.",
      "sources": [
        "https://idp.bl.uk/discover/learning/buddhism-on-the-silk-roads/articles/buddhism-on-the-ground/buddhist-texts-the-diamond-sutra/"
      ]
    }
  },
  "catalog-R_WEI": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "220–265 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "220–265 follows the museum chronology."
  },
  "catalog-R_SHU": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "221–263 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "221–263 follows the museum chronology."
  },
  "catalog-R_WU": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "222–280 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "222–280 follows the museum chronology."
  },
  "catalog-E_3K_1": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/05/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "220 marks the end of Eastern Han; long political fragmentation preceded formal abdication.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/05/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "220 marks the end of Eastern Han; long political fragmentation preceded formal abdication."
  },
  "catalog-R_JIN_W": {
    "sources": [
      "https://www.cambridge.org/core/books/cambridge-history-of-china/western-jin/C26640110C74E0B6FA215625AFBBA6B7"
    ],
    "dateReview": {
      "status": "disputed",
      "note": "266–316 is supported with calendrical qualification: Cambridge explicitly gives 265 or 266 for the foundation. Retain 266.",
      "sources": [
        "https://www.cambridge.org/core/books/cambridge-history-of-china/western-jin/C26640110C74E0B6FA215625AFBBA6B7"
      ]
    },
    "catalogDates": null,
    "catalogNote": "266–316 is supported with calendrical qualification: Cambridge explicitly gives 265 or 266 for the foundation. Retain 266."
  },
  "catalog-E_JIN_1": {
    "sources": [
      "https://www.cambridge.org/core/books/cambridge-history-of-china/western-jin/C26640110C74E0B6FA215625AFBBA6B7"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "316 is the fall of Western Jin at Chang’an; Eastern Jin continued in the south.",
      "sources": [
        "https://www.cambridge.org/core/books/cambridge-history-of-china/western-jin/C26640110C74E0B6FA215625AFBBA6B7"
      ]
    },
    "catalogDates": null,
    "catalogNote": "316 is the fall of Western Jin at Chang’an; Eastern Jin continued in the south."
  },
  "catalog-E_BUD_SPREAD": {
    "name": "Buddhism expands in China (c. 350)",
    "sources": [
      "https://www.metmuseum.org/essays/chinese-buddhist-sculpture"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "350 is an illustrative midpoint for fourth-century growth, not a dated introduction or single event.",
      "sources": [
        "https://www.metmuseum.org/essays/chinese-buddhist-sculpture"
      ]
    },
    "approx": true,
    "catalogDates": null,
    "catalogNote": "350 is an illustrative midpoint for fourth-century growth, not a dated introduction or single event."
  },
  "catalog-S_ST": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "581–907 is supported; Sui–Tang is an editorial aggregate, not one dynasty.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "581–907 is supported; Sui–Tang is an editorial aggregate, not one dynasty."
  },
  "catalog-G_ISLAM": {
    "name": "Muhammad’s first revelation (traditional date)",
    "sources": [
      "https://www.metmuseum.org/essays/the-birth-of-islam"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "610 refers to the first revelation in Islamic tradition, not a single date encompassing Islam’s rise.",
      "sources": [
        "https://www.metmuseum.org/essays/the-birth-of-islam"
      ]
    },
    "approx": true,
    "catalogDates": null,
    "catalogNote": "610 refers to the first revelation in Islamic tradition, not a single date encompassing Islam’s rise."
  },
  "catalog-R_JIN_EASTERN_JIN": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "317–420 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "317–420 follows the museum chronology."
  },
  "catalog-R_SIXTEEN_HAN_ZHAO_FORMER_ZHAO": {
    "sources": [
      "https://assets.cambridge.org/97811070/20771/frontmatter/9781107020771_frontmatter.pdf",
      "https://www.earlymedievalchinagroup.org/resources/thesaurus/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "304–329 includes the Han phase; Former Zhao naming begins 319. Retain combined label.",
      "sources": [
        "https://assets.cambridge.org/97811070/20771/frontmatter/9781107020771_frontmatter.pdf",
        "https://www.earlymedievalchinagroup.org/resources/thesaurus/"
      ]
    },
    "catalogDates": null,
    "catalogNote": "304–329 includes the Han phase; Former Zhao naming begins 319. Retain combined label."
  },
  "catalog-R_SIXTEEN_LATER_ZHAO": {
    "sources": [
      "https://assets.cambridge.org/97811070/20771/frontmatter/9781107020771_frontmatter.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Cambridge History table confirms 319–351; EMC thesaurus gives a different 352 endpoint.",
      "sources": [
        "https://assets.cambridge.org/97811070/20771/frontmatter/9781107020771_frontmatter.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Cambridge History table confirms 319–351; EMC thesaurus gives a different 352 endpoint."
  },
  "catalog-R_SIXTEEN_FORMER_YAN": {
    "sources": [
      "https://chinainstitute.org/wp-content/uploads/2024/12/School-Brochure-24-25.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "337–370 is the China Institute/Liaoning archaeology exhibition chronology; 337 is royal proclamation.",
      "sources": [
        "https://chinainstitute.org/wp-content/uploads/2024/12/School-Brochure-24-25.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "337–370 is the China Institute/Liaoning archaeology exhibition chronology; 337 is royal proclamation."
  },
  "catalog-R_SIXTEEN_FORMER_QIN": {
    "sources": [
      "https://www.earlymedievalchinagroup.org/resources/thesaurus/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "351–394 agrees with EMC scholarly thesaurus. Other tables differ; retain conventional terminal remnant date.",
      "sources": [
        "https://www.earlymedievalchinagroup.org/resources/thesaurus/"
      ]
    },
    "catalogDates": null,
    "catalogNote": "351–394 agrees with EMC scholarly thesaurus. Other tables differ; retain conventional terminal remnant date."
  },
  "catalog-R_SIXTEEN_LATER_QIN": {
    "sources": [
      "https://www.earlymedievalchinagroup.org/resources/thesaurus/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "384–417 agrees with scholarly thesaurus.",
      "sources": [
        "https://www.earlymedievalchinagroup.org/resources/thesaurus/"
      ]
    },
    "catalogDates": null,
    "catalogNote": "384–417 agrees with scholarly thesaurus."
  },
  "catalog-R_NS_LIU_SONG": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "420–479 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "420–479 follows the museum chronology."
  },
  "catalog-R_NS_SOUTHERN_QI": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "479–502 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "479–502 follows the museum chronology."
  },
  "catalog-R_NS_LIANG": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "502–557 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "502–557 follows the museum chronology."
  },
  "catalog-R_NS_CHEN": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "557–589 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "557–589 follows the museum chronology."
  },
  "catalog-R_NS_NORTHERN_WEI": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "386–534 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "386–534 follows the museum chronology."
  },
  "catalog-R_NS_EASTERN_WEI": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "534–550 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "534–550 follows the museum chronology."
  },
  "catalog-R_NS_WESTERN_WEI": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "535–557 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "535–557 follows the museum chronology."
  },
  "catalog-R_NS_NORTHERN_QI": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "550–577 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "550–577 follows the museum chronology."
  },
  "catalog-R_NS_NORTHERN_ZHOU": {
    "sources": [
      "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "557–581 follows the museum chronology.",
      "sources": [
        "https://resources.metmuseum.org/resources/metpublications/pdf/Cultural_Convergence_in_the_Northern_Qi_Period_A_Flamboyant_Chinese_Ceramic_Container_a_research.pdf",
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "557–581 follows the museum chronology."
  },
  "catalog-R_FIVE_LATER_LIANG": {
    "sources": [
      "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "907–923 agrees with Jordan's university-hosted reign table.",
      "sources": [
        "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "907–923 agrees with Jordan's university-hosted reign table."
  },
  "catalog-R_FIVE_LATER_TANG": {
    "sources": [
      "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "923–936 agrees with Jordan's university-hosted reign table.",
      "sources": [
        "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "923–936 agrees with Jordan's university-hosted reign table."
  },
  "catalog-R_FIVE_LATER_JIN": {
    "sources": [
      "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/frontier-fortification-and-forestation-defensive-woodland-on-the-songliao-border-in-the-long-eleventh-century/847B22FE75C4FD6632086433E7FC3BB1"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Cambridge journal explicitly supports the existing endpoints; older tables give one-year-earlier terminal years.",
      "sources": [
        "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/frontier-fortification-and-forestation-defensive-woodland-on-the-songliao-border-in-the-long-eleventh-century/847B22FE75C4FD6632086433E7FC3BB1"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Cambridge journal explicitly supports the existing endpoints; older tables give one-year-earlier terminal years."
  },
  "catalog-R_FIVE_LATER_HAN": {
    "sources": [
      "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/frontier-fortification-and-forestation-defensive-woodland-on-the-songliao-border-in-the-long-eleventh-century/847B22FE75C4FD6632086433E7FC3BB1"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Cambridge journal explicitly supports the existing endpoints; older tables give one-year-earlier terminal years.",
      "sources": [
        "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/frontier-fortification-and-forestation-defensive-woodland-on-the-songliao-border-in-the-long-eleventh-century/847B22FE75C4FD6632086433E7FC3BB1"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Cambridge journal explicitly supports the existing endpoints; older tables give one-year-earlier terminal years."
  },
  "catalog-R_FIVE_LATER_ZHOU": {
    "sources": [
      "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "951–960 agrees with Jordan's university-hosted reign table.",
      "sources": [
        "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "951–960 agrees with Jordan's university-hosted reign table."
  },
  "catalog-R_TEN_WU_YANG_WU": {
    "sources": [
      "https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Existing range confirmed by Cambridge History of China, volume 5 introduction table; starts use state-formation milestones.",
      "sources": [
        "https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Existing range confirmed by Cambridge History of China, volume 5 introduction table; starts use state-formation milestones."
  },
  "catalog-R_TEN_FORMER_SHU": {
    "sources": [
      "https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Existing range confirmed by Cambridge History of China, volume 5 introduction table; starts use state-formation milestones.",
      "sources": [
        "https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Existing range confirmed by Cambridge History of China, volume 5 introduction table; starts use state-formation milestones."
  },
  "catalog-R_TEN_WUYUE": {
    "sources": [
      "https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Existing range confirmed by Cambridge History of China, volume 5 introduction table; starts use state-formation milestones.",
      "sources": [
        "https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Existing range confirmed by Cambridge History of China, volume 5 introduction table; starts use state-formation milestones."
  },
  "catalog-R_TEN_CHU_MA_CHU": {
    "sources": [
      "https://fass.ubd.edu.bn/staff/docs/JK/Kurz-2014.pdf",
      "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
    ],
    "dateReview": {
      "status": "disputed",
      "note": "907–951 is supported by Kurz; 927 is the later kingdom milestone used in other tables. Retain broad state span.",
      "sources": [
        "https://fass.ubd.edu.bn/staff/docs/JK/Kurz-2014.pdf",
        "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "907–951 is supported by Kurz; 927 is the later kingdom milestone used in other tables. Retain broad state span."
  },
  "catalog-R_TEN_MIN": {
    "sources": [
      "https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Existing range confirmed by Cambridge History of China, volume 5 introduction table; starts use state-formation milestones.",
      "sources": [
        "https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Existing range confirmed by Cambridge History of China, volume 5 introduction table; starts use state-formation milestones."
  },
  "catalog-R_TEN_SOUTHERN_HAN": {
    "sources": [
      "https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Existing range confirmed by Cambridge History of China, volume 5 introduction table; starts use state-formation milestones.",
      "sources": [
        "https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Existing range confirmed by Cambridge History of China, volume 5 introduction table; starts use state-formation milestones."
  },
  "catalog-R_TEN_JINGNAN_NANPING": {
    "sources": [
      "https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Existing range confirmed by Cambridge History of China, volume 5 introduction table; starts use state-formation milestones.",
      "sources": [
        "https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Existing range confirmed by Cambridge History of China, volume 5 introduction table; starts use state-formation milestones."
  },
  "catalog-R_TEN_LATER_SHU": {
    "sources": [
      "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "934–965 agrees with Jordan's university-hosted reign table.",
      "sources": [
        "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "934–965 agrees with Jordan's university-hosted reign table."
  },
  "catalog-R_TEN_SOUTHERN_TANG": {
    "sources": [
      "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "937–975 agrees with Jordan's university-hosted reign table.",
      "sources": [
        "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "937–975 agrees with Jordan's university-hosted reign table."
  },
  "catalog-R_TEN_NORTHERN_HAN": {
    "sources": [
      "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "951–979 agrees with Jordan's university-hosted reign table.",
      "sources": [
        "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "951–979 agrees with Jordan's university-hosted reign table."
  },
  "catalog-S_TEN": {
    "sources": [
      "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "902–979 agrees with Jordan's university-hosted reign table.",
      "sources": [
        "https://pages.ucsd.edu/~dkjordan/chin/chinahistory/dyn15-u.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "902–979 agrees with Jordan's university-hosted reign table."
  },
  "sui-grand-canal": {
    "sources": [
      "https://afe.easia.columbia.edu/geography/uses-geography.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "605–610 marks Sui expansion and connection of earlier waterways; it is not the origin of all Chinese canals.",
      "sources": [
        "https://afe.easia.columbia.edu/geography/uses-geography.html"
      ]
    }
  },
  "xuanwu-gate": {
    "sources": [
      "https://toaj.stpi.niar.org.tw/index/journal/volume/article/4b1141f98cabd6a3018cd21dcad90efa"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "626 is confirmed by the scholarly study of Chang He and the coup.",
      "sources": [
        "https://toaj.stpi.niar.org.tw/index/journal/volume/article/4b1141f98cabd6a3018cd21dcad90efa"
      ]
    }
  },
  "xuanzang-return": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "645 is the return from the Indian pilgrimage, not the beginning of his translation career or journey.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    }
  },
  "talas": {
    "sources": [
      "https://faculty.washington.edu/dwaugh/hist225/225chron/turkchr.html",
      "https://festival.si.edu/2002/the-silk-road/paper/smithsonian"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "751 is confirmed. The existing note correctly distinguishes the battle date from the disputed paper-transmission story.",
      "sources": [
        "https://faculty.washington.edu/dwaugh/hist225/225chron/turkchr.html",
        "https://festival.si.edu/2002/the-silk-road/paper/smithsonian"
      ]
    }
  },
  "two-tax": {
    "sources": [
      "https://www.cuhk.edu.hk/ics/journal/articles/v57p049.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "780 is the promulgation year of the Two-Tax system.",
      "sources": [
        "https://www.cuhk.edu.hk/ics/journal/articles/v57p049.pdf"
      ]
    }
  },
  "huichang": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "845 marks the major suppression; broader restrictions and consequences extend beyond this point.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    }
  },
  "huang-chao": {
    "sources": [
      "https://assets.cambridge.org/97810096/49919/frontmatter/9781009649919_frontmatter.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "881 CE is correct for the January capture; 880 in regnal/lunar chronology should not replace the Common Era year.",
      "sources": [
        "https://assets.cambridge.org/97810096/49919/frontmatter/9781009649919_frontmatter.pdf"
      ]
    }
  },
  "tang-end": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "907 is the dynastic transition to Later Liang.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    }
  },
  "orchid-pavilion": {
    "sources": [
      "https://www.metmuseum.org/art/collection/search/51394"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "353 dates the gathering; later art and copies should retain their own object dates.",
      "sources": [
        "https://www.metmuseum.org/art/collection/search/51394"
      ]
    }
  },
  "mogao-caves": {
    "sources": [
      "https://en.unesco.org/silkroad/content/dunhuang"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "366 is the traditional foundation date. Existing approximate flag and note correctly avoid dating the entire surviving complex to this year.",
      "sources": [
        "https://en.unesco.org/silkroad/content/dunhuang"
      ]
    },
    "approx": true
  },
  "kumarajiva-translations": {
    "sources": [
      "https://www.nichirenlibrary.org/en/lsoc/TranslatorsNote/4"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "401 is the conventional Chang’an arrival anchor in Burton Watson’s translator note; translation work continued afterward. Existing qualification is appropriate.",
      "sources": [
        "https://www.nichirenlibrary.org/en/lsoc/TranslatorsNote/4"
      ]
    },
    "approx": true
  },
  "tao-yuanming": {
    "sources": [
      "https://www.metmuseum.org/art/collection/search/40311"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "400 is an editorial mature-writing anchor, not verified retirement; 405 retirement and 427 death are supported. Existing note makes this clear, so retain approximate range.",
      "sources": [
        "https://www.metmuseum.org/art/collection/search/40311"
      ]
    },
    "approx": true
  },
  "yungang-caves": {
    "sources": [
      "https://whc.unesco.org/archive/advisory_body_evaluation/1039.pdf"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "460–525 is UNESCO’s main early construction span. Existing note correctly allows later work.",
      "sources": [
        "https://whc.unesco.org/archive/advisory_body_evaluation/1039.pdf"
      ]
    },
    "approx": true
  },
  "longmen-caves": {
    "sources": [
      "https://whc.unesco.org/en/list/1003/",
      "https://whc.unesco.org/uploads/nominations/1003.pdf"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "Late fifth to mid-eighth century is supported for the most intensive carving; UNESCO nomination gives an initial 493 anchor. Existing c.494–750 is an approximate main-period range, not exact creation and closure.",
      "sources": [
        "https://whc.unesco.org/en/list/1003/",
        "https://whc.unesco.org/uploads/nominations/1003.pdf"
      ]
    },
    "approx": true
  },
  "tang-code": {
    "sources": [
      "https://web.colby.edu/eas150/files/2017/11/tang-legal-code.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "653 dates the authoritative code/commentary stage; existing text correctly distinguishes earlier legislation.",
      "sources": [
        "https://web.colby.edu/eas150/files/2017/11/tang-legal-code.pdf"
      ]
    }
  },
  "li-bai-du-fu": {
    "sourceLabels": {
      "https://www.gushiwen.cn/shiwens/default.aspx?tstr=三吏三别": "古诗文网 · 杜甫《三吏三别》"
    },
    "sources": [
      "https://www.metmuseum.org/toah/ht/06/eac.html"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "740–770 is an editorial focus window; Li Bai died 762, Du Fu 770. Existing note accurately rejects a shared lifespan interpretation.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/06/eac.html"
      ]
    },
    "approx": true
  },
  "tang-women-riding": {
    "sources": [
      "https://asia-archive.si.edu/learn/for-educators/teaching-china-with-the-smithsonian/explore-by-object/tomb-figures-of-a-man-and-woman-on-horseback/"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "Smithsonian figures are dated c.700–c.750. This supports the object-based context window, not limits on women’s riding.",
      "sources": [
        "https://asia-archive.si.edu/learn/for-educators/teaching-china-with-the-smithsonian/explore-by-object/tomb-figures-of-a-man-and-woman-on-horseback/"
      ]
    },
    "approx": true
  },
  "lu-yu-tea": {
    "sources": [
      "https://repository.si.edu/server/api/core/bitstreams/a49bb440-b143-4eed-bfa1-94fdfdc110af/content",
      "https://fowler.ucla.edu/wp-content/uploads/2021/08/zppd_zppd_Tea_Curriculum.pdf"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "760–780 is a scholarly composition range, with 780 commonly used for completion. Existing approximate treatment is appropriate.",
      "sources": [
        "https://repository.si.edu/server/api/core/bitstreams/a49bb440-b143-4eed-bfa1-94fdfdc110af/content",
        "https://fowler.ucla.edu/wp-content/uploads/2021/08/zppd_zppd_Tea_Curriculum.pdf"
      ]
    },
    "approx": true
  },
  "eight-princes": {
    "sources": [
      "https://brill.com/view/journals/east/53/1-2/article-p3_3.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "291–306 is the conventional grouped conflict range; existing note correctly denies continuous fighting.",
      "sources": [
        "https://brill.com/view/journals/east/53/1-2/article-p3_3.pdf"
      ]
    }
  },
  "xiaowen-reforms": {
    "approx": true,
    "sources": [
      "https://cir.nii.ac.jp/crid/1050292726806399488",
      "https://www.chinaknowledge.de/History/Division/beiwei.html"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "485 equal-field reforms begin the selected window; 499 is Xiaowen’s death. Reforms involved Empress Dowager Feng and multiple stages, already stated.",
      "sources": [
        "https://cir.nii.ac.jp/crid/1050292726806399488",
        "https://www.chinaknowledge.de/History/Division/beiwei.html"
      ]
    }
  },
  "niu-li-disputes": {
    "approx": true,
    "sources": [
      "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/niuli-factional-strife-the-origins-of-a-historiographical-fiction/1845DBAD83C09083145C816B8DE768E6",
      "https://soas-repository.worktribe.com/output/383615/the-factional-struggle-of-china-820-850-ad"
    ],
    "dateReview": {
      "status": "disputed",
      "note": "820–850 is an older scholarly grouping; recent scholarship disputes the enduring two-faction interpretation. Existing description already communicates this.",
      "sources": [
        "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/niuli-factional-strife-the-origins-of-a-historiographical-fiction/1845DBAD83C09083145C816B8DE768E6",
        "https://soas-repository.worktribe.com/output/383615/the-factional-struggle-of-china-820-850-ad"
      ]
    }
  },
  "zhuge-northern-expeditions": {
    "sources": [
      "https://www.tandfonline.com/doi/abs/10.1179/152991099788199472"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "228–234 is confirmed by John Killigrew’s dedicated scholarly study.",
      "sources": [
        "https://www.tandfonline.com/doi/abs/10.1179/152991099788199472"
      ]
    }
  },
  "fei-river": {
    "sources": [
      "https://assets.cambridge.org/97811071/20129/index/9781107120129_index.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "383 is confirmed in Cambridge History of War; Former Qin did not disappear in the battle year.",
      "sources": [
        "https://assets.cambridge.org/97811071/20129/index/9781107120129_index.pdf"
      ]
    }
  },
  "sui-examinations": {
    "approx": true,
    "sources": [
      "https://www.cambridge.org/core/elements/political-economy-of-chinas-imperial-examination-system/3DA0EC88AE5901AEE641FD5686C7F8B8"
    ],
    "dateReview": {
      "status": "disputed",
      "note": "605 is a disputed conventional origin anchor; proposed alternatives include 587 and 605–607, depending on what counts as an examination. Existing note is appropriately cautious.",
      "sources": [
        "https://www.cambridge.org/core/elements/political-economy-of-chinas-imperial-examination-system/3DA0EC88AE5901AEE641FD5686C7F8B8"
      ]
    }
  },
  "zhenguan-government": {
    "sources": [
      "https://www.slam.org/collection/constituents/26910/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "627–649 is the Zhenguan era, distinct from Taizong’s accession in 626.",
      "sources": [
        "https://www.slam.org/collection/constituents/26910/"
      ]
    }
  },
  "kaiyuan-era": {
    "sources": [
      "https://digicoll.lib.berkeley.edu/record/245799"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "713–741 is the Kaiyuan era; the Berkeley inscription catalogue uses these dates.",
      "sources": [
        "https://digicoll.lib.berkeley.edu/record/245799"
      ]
    }
  },
  "catalog-C_BEIJING_YUAN": {
    "start": 1272,
    "end": 1272,
    "sources": [
      "https://www.beijing.gov.cn/renwen/sy/whkb/201907/t20190715_1866582.html",
      "https://wwj.beijing.gov.cn/bjww/resource/cms/article/bjww_362762/10869853/2020092815384151837.pdf"
    ],
    "dateReview": {
      "status": "correct",
      "note": "Recommend 1272 for Dadu naming/capital milestone instead of preserving a 1271 foundation-context marker. Current explanatory note is honest, but its date refers to the wider dynasty rather than this capital event.",
      "sources": [
        "https://www.beijing.gov.cn/renwen/sy/whkb/201907/t20190715_1866582.html",
        "https://wwj.beijing.gov.cn/bjww/resource/cms/article/bjww_362762/10869853/2020092815384151837.pdf"
      ]
    },
    "name": "Dadu named as the Yuan capital",
    "description": "Kublai Khan adopted the dynastic name Yuan in 1271. In 1272, the northern capital received the name Dadu. Planning, construction and use of the city as a political center began earlier.",
    "note": "1272 is the Dadu naming milestone. It is distinct from the Yuan dynastic proclamation in 1271 and from earlier capital construction.",
    "catalogDates": null,
    "catalogNote": "1271 dates adoption of the dynastic name Yuan; 1272 dates the Dadu name and capital milestone. Construction and use as a political center began earlier, so this is not Beijing's first establishment as a capital."
  },
  "catalog-C_BEIJING_MING": {
    "sources": [
      "https://www.dpm.org.cn/Uploads/pdf/1540/T00070_00.pdf",
      "https://young.dpm.org.cn/info/273",
      "https://www.dpm.org.cn/subject_600/buildingdetails/253789.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1420 dates palace completion and preparations; formal transfer occurred in Yongle 19, 1421. Avoid permanent capital, since later governments used other capitals.",
      "sources": [
        "https://www.dpm.org.cn/Uploads/pdf/1540/T00070_00.pdf",
        "https://young.dpm.org.cn/info/273",
        "https://www.dpm.org.cn/subject_600/buildingdetails/253789.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1420 dates palace completion and preparations; formal transfer occurred in Yongle 19, 1421. Avoid permanent capital, since later governments used other capitals."
  },
  "catalog-C_BEIJING_QING": {
    "sources": [
      "https://www.dpm.org.cn/court/event/159873.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1644 dates the Qing court's move to Beijing; Qing was proclaimed in 1636, and territorial conquest continued after 1644.",
      "sources": [
        "https://www.dpm.org.cn/court/event/159873.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1644 dates the Qing court's move to Beijing; Qing was proclaimed in 1636, and territorial conquest continued after 1644."
  },
  "catalog-E_MING_EUNUCH_1": {
    "start": 1403,
    "end": 1424,
    "approx": true,
    "sources": [
      "https://assets.cambridge.org/97805212/43322/excerpt/9780521243322_excerpt.pdf",
      "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/cessation-of-zheng-hes-voyages-and-the-beginning-of-private-sailings-fiscal-competition-between-emperors-and-bureaucrats/8FE45F3210A4DF174A4EC2B30868D433"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "The exact 1400 marker is unsupported. Proposed circa 1403 is an editorial anchor for expansion under Yongle: accession 1402, reign era 1403–1424. This was a continuing institutional process, not a single decree.",
      "sources": [
        "https://assets.cambridge.org/97805212/43322/excerpt/9780521243322_excerpt.pdf",
        "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/cessation-of-zheng-hes-voyages-and-the-beginning-of-private-sailings-fiscal-competition-between-emperors-and-bureaucrats/8FE45F3210A4DF174A4EC2B30868D433"
      ]
    },
    "note": "Circa 1403–1424 marks the Yongle reign era, a selected frame for the expansion of eunuch roles. Yongle took power in 1402. This was an institutional process, not an event in 1400.",
    "catalogDates": {
      "start": 1403,
      "end": 1403,
      "approx": true
    },
    "catalogNote": "The exact 1400 marker is unsupported. Proposed circa 1403 is an editorial anchor for expansion under Yongle: accession 1402, reign era 1403–1424. This was a continuing institutional process, not a single decree."
  },
  "catalog-E_MING_EUNUCH_2": {
    "sources": [
      "https://digitalarchive.npm.gov.tw/Collection/Detail/19487?dep=P",
      "https://www.dpm.org.cn/court/lineage/226243.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1624 is a supported focal year: Yang Lian's memorial denouncing Wei is dated Tianqi 4. Wei's influence began earlier; major persecutions followed in 1625–1626 and his fall and death in 1627.",
      "sources": [
        "https://digitalarchive.npm.gov.tw/Collection/Detail/19487?dep=P",
        "https://www.dpm.org.cn/court/lineage/226243.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1624 is a supported focal year: Yang Lian's memorial denouncing Wei is dated Tianqi 4. Wei's influence began earlier; major persecutions followed in 1625–1626 and his fall and death in 1627."
  },
  "catalog-E_QING_OPIUM": {
    "sources": [
      "https://www.nam.ac.uk/explore/first-china-war-1839-1842"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1839 is a start-year marker for the 1839–1842 war. It includes initial clashes; some periodizations begin with the main expedition in 1840.",
      "sources": [
        "https://www.nam.ac.uk/explore/first-china-war-1839-1842"
      ]
    },
    "catalogDates": {
      "start": 1839,
      "end": 1839,
      "approx": false
    },
    "catalogNote": "1839 is a start-year marker for the 1839–1842 war. It includes initial clashes; some periodizations begin with the main expedition in 1840."
  },
  "catalog-E_QING_TAIPING": {
    "sources": [
      "https://www.cambridge.org/core/journals/modern-asian-studies/article/abs/foreigntraining-and-chinas-selfstrengthening-the-case-of-fenghuangshan-18641873/8AF47729DBB9849B462A6351404ADCA1",
      "https://www.cambridge.org/core/books/abs/cambridge-history-of-china/ching-restoration/E7799876F2013102083B06ABBD82100E"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1850 is a defensible start for the broader 1850–1864 civil war; 1851 is used for formal uprising/proclamation. Nanjing fell in July 1864; surviving resistance lasted longer.",
      "sources": [
        "https://www.cambridge.org/core/journals/modern-asian-studies/article/abs/foreigntraining-and-chinas-selfstrengthening-the-case-of-fenghuangshan-18641873/8AF47729DBB9849B462A6351404ADCA1",
        "https://www.cambridge.org/core/books/abs/cambridge-history-of-china/ching-restoration/E7799876F2013102083B06ABBD82100E"
      ]
    },
    "catalogDates": {
      "start": 1850,
      "end": 1850,
      "approx": false
    },
    "catalogNote": "1850 is a defensible start for the broader 1850–1864 civil war; 1851 is used for formal uprising/proclamation. Nanjing fell in July 1864; surviving resistance lasted longer."
  },
  "catalog-E_QING_OPIUM2": {
    "sources": [
      "https://afe.easia.columbia.edu/special/china_1750_reform.htm",
      "https://www.nationalarchives.gov.uk/education/resources/hong-kong-and-the-opium-wars/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1856 is the starting marker for the 1856–1860 conflict, which comprised several campaigns and negotiations.",
      "sources": [
        "https://afe.easia.columbia.edu/special/china_1750_reform.htm",
        "https://www.nationalarchives.gov.uk/education/resources/hong-kong-and-the-opium-wars/"
      ]
    },
    "catalogDates": {
      "start": 1856,
      "end": 1856,
      "approx": false
    },
    "catalogNote": "1856 is the starting marker for the 1856–1860 conflict, which comprised several campaigns and negotiations."
  },
  "catalog-E_QING_SSM": {
    "start": 1861,
    "end": 1895,
    "approx": true,
    "sources": [
      "https://academic.oup.com/book/47875/chapter-abstract/422377188",
      "https://academic.oup.com/cjip/article/11/4/451/5162672",
      "https://afe.easia.columbia.edu/special/china_1750_reform.htm"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "Propose circa 1861 as the start anchor, rather than an exact 1860 event. The movement developed from earlier proposals and continued into the 1894–1895 war; scholarly period boundaries vary.",
      "sources": [
        "https://academic.oup.com/book/47875/chapter-abstract/422377188",
        "https://academic.oup.com/cjip/article/11/4/451/5162672",
        "https://afe.easia.columbia.edu/special/china_1750_reform.htm"
      ]
    },
    "note": "Circa 1861–1895 is a conventional frame for the Self-Strengthening Movement. Its proposals and institutions developed at different dates; some histories use the broader 1860s–1890s.",
    "catalogDates": {
      "start": 1861,
      "end": 1861,
      "approx": true
    },
    "catalogNote": "Propose circa 1861 as the start anchor, rather than an exact 1860 event. The movement developed from earlier proposals and continued into the 1894–1895 war; scholarly period boundaries vary."
  },
  "catalog-E_QING_SJ": {
    "sources": [
      "https://www.jacar.go.jp/english/exhibition/jacarbl-fsjwar-e/index.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1894 is the start-year marker for the First Sino-Japanese War of 1894–1895.",
      "sources": [
        "https://www.jacar.go.jp/english/exhibition/jacarbl-fsjwar-e/index.html"
      ]
    },
    "catalogDates": {
      "start": 1894,
      "end": 1894,
      "approx": false
    },
    "catalogNote": "1894 is the start-year marker for the First Sino-Japanese War of 1894–1895."
  },
  "catalog-E_QING_100D": {
    "sources": [
      "https://www.dpm.org.cn/lemmas/241774.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1898 is secure. The reform interval ran June–September; the Palace Museum gives fourth lunar month day 23 through eighth lunar month day 6, 103 days.",
      "sources": [
        "https://www.dpm.org.cn/lemmas/241774.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1898 is secure. The reform interval ran June–September; the Palace Museum gives fourth lunar month day 23 through eighth lunar month day 6, 103 days."
  },
  "catalog-E_QING_BOXER": {
    "sources": [
      "https://www.history.navy.mil/research/library/online-reading-room/title-list-alphabetically/b/boxer-rebellion-usnavy-1900-1901.html",
      "https://history.state.gov/historicaldocuments/frus1900/papers"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1900 is a valid focal marker for the siege and foreign intervention, not the movement's entire duration. Expansion preceded it in 1899 and settlement followed in 1901.",
      "sources": [
        "https://www.history.navy.mil/research/library/online-reading-room/title-list-alphabetically/b/boxer-rebellion-usnavy-1900-1901.html",
        "https://history.state.gov/historicaldocuments/frus1900/papers"
      ]
    },
    "catalogDates": {
      "start": 1900,
      "end": 1900,
      "approx": false
    },
    "catalogNote": "1900 is a valid focal marker for the siege and foreign intervention, not the movement's entire duration. Expansion preceded it in 1899 and settlement followed in 1901."
  },
  "catalog-E_QING_1911": {
    "sources": [
      "https://history.state.gov/milestones/1899-1913/chinese-rev",
      "https://history.state.gov/historicaldocuments/frus1913/d89"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1911 marks the revolutionary outbreak. The republic began in January 1912 and imperial abdication occurred on 12 February 1912.",
      "sources": [
        "https://history.state.gov/milestones/1899-1913/chinese-rev",
        "https://history.state.gov/historicaldocuments/frus1913/d89"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1911 marks the revolutionary outbreak. The republic began in January 1912 and imperial abdication occurred on 12 February 1912."
  },
  "catalog-S_SONG": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/07/eac.html",
      "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/fragility-of-peace-song-chinas-northwestern-frontier-and-erosion-of-the-chanyuan-paradigm-in-the-mideleventh-century/AF2F19A32A23ED0F304C3DE814851A3F"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "960–1279 follows the Song dynasty as an editorial frame for changing concurrent states. The named states did not all coexist throughout the interval, and this aggregate does not assert Song sovereignty over them.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/07/eac.html",
        "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/fragility-of-peace-song-chinas-northwestern-frontier-and-erosion-of-the-chanyuan-paradigm-in-the-mideleventh-century/AF2F19A32A23ED0F304C3DE814851A3F"
      ]
    },
    "catalogDates": null,
    "catalogNote": "960–1279 follows the Song dynasty as an editorial frame for changing concurrent states. The named states did not all coexist throughout the interval, and this aggregate does not assert Song sovereignty over them."
  },
  "catalog-R_NSONG": {
    "sources": [
      "https://www.metmuseum.org/ja/essays/northern-song-dynasty-960-1127"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "960–1127 is the standard Northern Song chronology.",
      "sources": [
        "https://www.metmuseum.org/ja/essays/northern-song-dynasty-960-1127"
      ]
    },
    "catalogDates": null,
    "catalogNote": "960–1127 is the standard Northern Song chronology."
  },
  "catalog-R_SSONG": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/07/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1127–1279 is the standard Southern Song chronology; 1127 does not mean the court immediately settled permanently at Hangzhou.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/07/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1127–1279 is the standard Southern Song chronology; 1127 does not mean the court immediately settled permanently at Hangzhou."
  },
  "western-xia": {
    "sources": [
      "https://whc.unesco.org/document/221524"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1038 dates imperial proclamation by Li Yuanhao; Tangut power predates it. UNESCO's reviewed chronology supports 1038–1227.",
      "sources": [
        "https://whc.unesco.org/document/221524"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1038 dates imperial proclamation by Li Yuanhao; Tangut power predates it. UNESCO's reviewed chronology supports 1038–1227."
  },
  "jurchen-jin": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/07/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1115–1234 dates the Jurchen Jin; distinct from the earlier Jin (晋).",
      "sources": [
        "https://www.metmuseum.org/toah/ht/07/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1115–1234 dates the Jurchen Jin; distinct from the earlier Jin (晋)."
  },
  "chanyuan": {
    "sources": [
      "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/fragility-of-peace-song-chinas-northwestern-frontier-and-erosion-of-the-chanyuan-paradigm-in-the-mideleventh-century/AF2F19A32A23ED0F304C3DE814851A3F"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Mid-January 1005 oath exchange follows the winter campaign of 1004; use 1005 in converted Common Era chronology.",
      "sources": [
        "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/fragility-of-peace-song-chinas-northwestern-frontier-and-erosion-of-the-chanyuan-paradigm-in-the-mideleventh-century/AF2F19A32A23ED0F304C3DE814851A3F"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Mid-January 1005 oath exchange follows the winter campaign of 1004; use 1005 in converted Common Era chronology."
  },
  "jingkang": {
    "sources": [
      "https://collectionsonline.nus.edu.sg/AIS/Details/collect/5552",
      "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/fragility-of-peace-song-chinas-northwestern-frontier-and-erosion-of-the-chanyuan-paradigm-in-the-mideleventh-century/AF2F19A32A23ED0F304C3DE814851A3F"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1127 dates Northern Song's fall and imperial captivity, at the culmination of the 1126–1127 crisis.",
      "sources": [
        "https://collectionsonline.nus.edu.sg/AIS/Details/collect/5552",
        "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/fragility-of-peace-song-chinas-northwestern-frontier-and-erosion-of-the-chanyuan-paradigm-in-the-mideleventh-century/AF2F19A32A23ED0F304C3DE814851A3F"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1127 dates Northern Song's fall and imperial captivity, at the culmination of the 1126–1127 crisis."
  },
  "catalog-E_SONG_SOUTH": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/07/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1127 is the conventional beginning of Southern Song following loss of the northern court; do not equate it with the completion of relocation to Hangzhou.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/07/eac.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1127 is the conventional beginning of Southern Song following loss of the northern court; do not equate it with the completion of relocation to Hangzhou."
  },
  "yuan": {
  "sources": [
    "https://www.jstor.org/stable/j.ctt6wpmgz",
    "https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B",
    "https://afe.easia.columbia.edu/mongols/china/china4_a.htm",
    "https://www.metmuseum.org/essays/yuan-dynasty-1271-1368",
    "https://www.britishmuseum.org/collection/object/A_PDF-B-613",
    "https://www.metmuseum.org/art/collection/search/40508",
    "https://afe.easia.columbia.edu/mongols/china/china3_f.htm"
  ],
  "dateReview": {
    "status": "confirmed",
    "note": "1271 dates the Yuan dynastic name, 1279 the final Song conquest. 1368 ends Yuan rule from Beijing, not all subsequent Mongol or Northern Yuan rule.",
    "sources": [
      "https://www.metmuseum.org/toah/ht/07/eac.html"
    ]
  },
  "catalogDates": null,
  "catalogNote": "1271 dates the Yuan dynastic name, 1279 the final Song conquest. 1368 ends Yuan rule from Beijing, not all subsequent Mongol or Northern Yuan rule.",
  "sourceLabels": {
    "https://www.jstor.org/stable/j.ctt6wpmgz": "Timothy Brook · The Troubled Empire: China in the Yuan and Ming Dynasties",
    "https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B": "Patricia Buckley Ebrey · The Cambridge Illustrated History of China",
    "https://afe.easia.columbia.edu/mongols/china/china4_a.htm": "Columbia University · Mongol military successes and failures",
    "https://www.metmuseum.org/essays/yuan-dynasty-1271-1368": "Metropolitan Museum of Art · Yuan dynasty",
    "https://www.britishmuseum.org/collection/object/A_PDF-B-613": "British Museum · One of the David Vases",
    "https://www.metmuseum.org/art/collection/search/40508": "Metropolitan Museum of Art · Zhao Mengfu, Twin Pines, Level Distance",
    "https://afe.easia.columbia.edu/mongols/china/china3_f.htm": "Columbia University · Religion under Mongol rule"
  }
},
  "ming": {
    "sources": [
      "https://www.jstor.org/stable/j.ctt6wpmgz",
      "https://www.jstor.org/stable/j.ctv1cbn3m5",
      "https://www.metmuseum.org/art/collection/search/53828",
      "https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1368–1644 is the main Ming court convention. Southern Ming successors survived after Beijing fell.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/07/eac.html",
        "https://www.dpm.org.cn/court/event/159873.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1368–1644 is the main Ming court convention. Southern Ming successors survived after Beijing fell.",
    "sourceLabels": {
      "https://www.jstor.org/stable/j.ctt6wpmgz": "Timothy Brook · The Troubled Empire: China in the Yuan and Ming Dynasties",
      "https://www.jstor.org/stable/j.ctv1cbn3m5": "F. W. Mote · Imperial China 900–1800",
      "https://www.metmuseum.org/art/collection/search/53828": "Metropolitan Museum of Art · Jiajing dragon jar",
      "https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B": "Patricia Buckley Ebrey · The Cambridge Illustrated History of China"
    }
  },
  "qing": {
    "sources": [
      "https://www.hup.harvard.edu/books/9780674066243",
      "https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B",
      "https://www.jstor.org/stable/j.ctvjsf6nq.6",
      "https://www.oecd.org/en/publications/chinese-economic-performance-in-the-long-run-960-2030-ad-second-edition-revised-and-updated_9789264037632-en.html",
      "https://museum.sinica.edu.tw/en/collection/17/item/146/",
      "https://www.metmuseum.org/art/collection/search/60617",
      "https://www.metmuseum.org/exhibitions/embracing-color",
      "https://www.dpm.org.cn/court/event/159873.html",
      "https://history.state.gov/historicaldocuments/frus1913/d89"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1636–1912 is correct for proclamation through abdication; the chart interval 1644–1912 properly distinguishes the Beijing phase.",
      "sources": [
        "https://www.dpm.org.cn/court/event/159873.html",
        "https://history.state.gov/historicaldocuments/frus1913/d89"
      ]
    },
    "catalogDates": {
      "start": 1644,
      "end": 1912,
      "approx": false
    },
    "catalogNote": "1644–1912 is valid for rule from Beijing. The Qing dynastic name was proclaimed in 1636; the emperor abdicated on 12 February 1912, after the revolution began in 1911.",
    "sourceLabels": {
      "https://www.hup.harvard.edu/books/9780674066243": "William T. Rowe · China’s Last Empire: The Great Qing",
      "https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B": "Patricia Buckley Ebrey · The Cambridge Illustrated History of China",
      "https://www.jstor.org/stable/j.ctvjsf6nq.6": "Peter C. Perdue · China Marches West, introduction",
      "https://www.oecd.org/en/publications/chinese-economic-performance-in-the-long-run-960-2030-ad-second-edition-revised-and-updated_9789264037632-en.html": "Angus Maddison · Chinese Economic Performance in the Long Run",
      "https://museum.sinica.edu.tw/en/collection/17/item/146/": "Academia Sinica · Qianlong’s abdication edict",
      "https://www.metmuseum.org/art/collection/search/60617": "Metropolitan Museum of Art · Qianlong-period glass vase",
      "https://www.metmuseum.org/exhibitions/embracing-color": "Metropolitan Museum of Art · Embracing Color: Enamel in Chinese Decorative Arts"
    },
    "name": "Qing",
    "description": "The Qing (清 Qīng) was China’s last imperial dynasty, ruling from 1644 to 1912. [[early-qing|Founded by the Manchus before their conquest of China]], it built an enormous empire and governed a rapidly growing population. Its final decades brought foreign invasions, civil wars and reforms that preceded the founding of [[republic|a republic]].",
    "sections": [
      {
        "title": "A dynasty built before the conquest",
        "text": "The Qing began with a state northeast of [[ming|Ming]] (明 Míng) China. Nurhaci (努尔哈赤 Nǔ'ěrhāchì), a Jurchen leader, united neighbouring communities through alliances and conquest. His Eight Banners (八旗 bāqí) organised soldiers together with the families, farmers and craftspeople who supported them. In 1616, he declared a dynasty called Later Jin (后金 Hòu Jīn).\n\nHis son Hong Taiji (皇太极 Huáng Tàijí) expanded this state, recruited Chinese officials and soldiers, and adopted the dynastic name Qing in 1636. The Manchus therefore entered the struggle for China with an established army and government. They could offer defeated Ming commanders positions in a new regime.\n\nThe opportunity came in 1644. [[li-zicheng-beijing|Li Zicheng]] (李自成 Lǐ Zìchéng) captured [[catalog-C_BEIJING_QING|Beijing]] (北京 Běijīng), and the last Ming emperor killed himself. The Ming general Wu Sangui (吴三桂 Wú Sānguì) allied with the Manchus against Li. Qing forces took the capital under Dorgon (多尔衮 Duō'ěrgǔn), regent for the child Shunzhi emperor (顺治 Shùnzhì).\n\nVictory at Beijing began decades of conquest. [[southern-ming|Southern Ming]] (南明 Nán Míng) courts continued to resist. The order that men shave the front of their heads and wear a long plait became a public test of submission; resistance brought severe punishment, including massacres. Under the [[kangxi-rule|Kangxi emperor]] (康熙 Kāngxī), the Qing defeated a major rebellion by former allied commanders in 1681 and conquered the Zheng family’s regime in Taiwan (台湾 Táiwān) in 1683."
      },
      {
        "title": "The eighteenth-century empire",
        "text": "Kangxi and his successors Yongzheng (雍正 Yōngzhèng) and Qianlong (乾隆 Qiánlóng) presided over the Qing’s greatest expansion. Their empire included Mongolia, Tibet and [[qing-inner-asia|Xinjiang]] (新疆 Xīnjiāng), far beyond the territory the Ming had governed. By the time Qianlong formally retired in 1796, the Qing had become one of the largest empires in world history.\n\nThese conquests were costly and sometimes devastating. The destruction of the Dzungar state in the 1750s included mass killing. Garrisons and settlement helped secure the conquered lands, but distant territories required continuing military expenditure.\n\nThe emperors governed this varied empire through different institutions. Chinese provinces retained officials trained in the classical tradition. Mongol nobles and Tibetan religious authorities had their own relationships with the throne. Manchu identity, language and banner privileges remained important at court.\n\nThe population and economy were immense. Historical estimates for 1820 put China at more than a third of the world’s population and about a third of global economic output, making it the world’s largest economy."
      },
      {
        "title": "More people, more trade",
        "text": "China’s population roughly doubled during the eighteenth century, from about 150 million in 1700 to 300 million or more by 1800. Recovery from warfare, longer periods of peace and the cultivation of more land helped sustain this growth. Maize and sweet potatoes could grow in places poorly suited to rice, supporting settlement in uplands and frontier districts.\n\nMerchants connected specialised producing regions with distant customers. Farming families also spun and wove textiles, combining work on the land with goods for sale. Tea, silk and porcelain reached overseas buyers. European ships traded under restrictions, with their commerce concentrated at Guangzhou (广州 Guǎngzhōu), also known as Canton.\n\nProsperity did not reach everyone equally. By the mid-nineteenth century, the population exceeded 400 million. As the population grew, farms became smaller, while settlers cleared hillsides that were vulnerable to erosion. More people depended on small plots and supplementary work, leaving households exposed when harvests failed."
      },
      {
        "title": "Books and skilled crafts",
        "text": "The civil service examinations (科举 kējǔ) kept classical learning central to education and official careers. Successful candidates could enter government, while families invested years in preparing sons for fiercely competitive examinations.\n\nThe Qing court collected art and commissioned paintings, porcelain, jade and other decorative works. European enamelling materials and techniques reached court workshops in the late seventeenth and eighteenth centuries. Chinese craftspeople developed new colours for decorating porcelain, metal and glass. Glass was also shaped into vessels in its own right, including Qianlong-period vases.\n\nImperial sponsorship also shaped the written record. The [[qing-siku|Siku Quanshu]] (四库全书 Sìkù quánshū) project assembled a vast collection of books in the late eighteenth century. The same undertaking enabled officials to identify and suppress writings considered hostile to the dynasty. Collecting knowledge and controlling its circulation went together.\n\nCommercial publishing offered readers fiction as well as scholarship. Cao Xueqin (曹雪芹 Cáo Xuěqín) wrote most of [[red-chamber|Dream of the Red Chamber]] (红楼梦 Hónglóu mèng), a novel following the fortunes of a wealthy household. Its characters negotiate marriage, family duty and the unequal relationships between masters and servants. The completed novel appeared in print in 1791 and became one of China’s best-known literary works."
      },
      {
        "title": "Foreign wars and civil rebellion",
        "text": "In the nineteenth century, the Qing faced military challenges it struggled to contain. British traders sold opium grown in India into China despite Chinese prohibitions. In 1839, the official Lin Zexu (林则徐 Lín Zéxú) confiscated opium stocks. Britain [[catalog-E_QING_OPIUM|went to war]], using naval forces the Qing could not effectively resist.\n\nThe [[nanking|Treaty of Nanjing]] (南京 Nánjīng) ended the First Opium War in 1842. China ceded Hong Kong Island (香港岛 Xiānggǎng Dǎo), paid an indemnity and opened five ports to British trade. Further defeat in the [[catalog-E_QING_OPIUM2|Second Opium War]] expanded foreign access and privileges.\n\nAt the same time, the [[catalog-E_QING_TAIPING|Taiping Rebellion]] (太平天国 Tàipíng Tiānguó, 1850–1864) devastated large parts of China. Its leader, Hong Xiuquan (洪秀全 Hóng Xiùquán), claimed a divine mission and established a rival capital at Nanjing. To defeat the rebels, Qing officials raised regional armies whose soldiers depended on particular commanders. The dynasty survived, but provincial military leaders gained influence and huge areas needed rebuilding."
      },
      {
        "title": "Attempts to strengthen the state",
        "text": "From the 1860s, the [[catalog-E_QING_SSM|Self-Strengthening Movement]] (洋务运动 Yángwù yùndòng) established arsenals, shipyards and schools for foreign languages and technical learning. Officials sought weapons and practical knowledge that would help defend the empire. [[catalog-E_QING_SJ|Defeat by Japan in 1894–1895]] exposed continuing weaknesses; the peace settlement ceded Taiwan and imposed another heavy indemnity.\n\nThe Guangxu emperor (光绪 Guāngxù) supported [[catalog-E_QING_100D|wider reforms in 1898]], but the Empress Dowager Cixi (慈禧 Cíxǐ) intervened and stopped the programme. In 1900, her court backed the anti-foreign [[catalog-E_QING_BOXER|Boxer movement]] (义和团 Yìhétuán). Foreign armies invaded Beijing, and the settlement imposed further financial burdens.\n\nAfter this disaster, the court introduced extensive changes. New schools taught modern subjects, new armies received different training, and the [[qing-exams-end|old examinations ended in 1905]]. Provincial assemblies followed in 1909. These measures created organised groups with expectations of political influence, while promises of a constitution moved too slowly for many reformers."
      },
      {
        "title": "The throne gives way to a republic",
        "text": "[[catalog-E_QING_1911|An army mutiny at Wuchang]] (武昌 Wǔchāng) on 10 October 1911 helped set off a revolution. Provinces declared independence from the Qing court. Negotiations between imperial officials, military commanders and revolutionaries brought the dynasty to an end.\n\nOn 12 February 1912, the child emperor [[abdication|Puyi]] (溥仪 Pǔyí) abdicated. The Republic of China (中华民国 Zhōnghuá Mínguó) replaced the imperial throne, ending a system of dynastic rule that had lasted more than two thousand years.\n\nThe republic inherited claims to the Qing’s vast territories, along with its debts and powerful regional armies. Removing the emperor did not establish a strong national government. The struggle over who would govern China continued under the new republic."
      }
    ],
    "note": "",
    "related": [
      "early-qing",
      "republic",
      "ming",
      "li-zicheng-beijing",
      "catalog-C_BEIJING_QING",
      "southern-ming",
      "kangxi-rule",
      "qing-inner-asia",
      "qing-siku",
      "red-chamber",
      "catalog-E_QING_OPIUM",
      "nanking",
      "catalog-E_QING_OPIUM2",
      "catalog-E_QING_TAIPING",
      "catalog-E_QING_SSM",
      "catalog-E_QING_SJ",
      "catalog-E_QING_100D",
      "catalog-E_QING_BOXER",
      "qing-exams-end",
      "catalog-E_QING_1911",
      "abdication"
    ]
  },
  "song": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/07/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "960–1279 is secure; the 1127 division and incomplete territorial unification are correctly noted.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/07/eac.html"
      ]
    }
  },
  "early-yuan": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/07/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1271–1279 is a defensible display interval between Yuan naming and Song conquest, not a distinct regime.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/07/eac.html"
      ]
    }
  },
  "early-qing": {
    "sources": [
      "https://www.dpm.org.cn/court/event/159873.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1636 proclamation to 1644 Beijing conquest is a valid display interval, not a separate dynasty.",
      "sources": [
        "https://www.dpm.org.cn/court/event/159873.html"
      ]
    }
  },
  "southern-ming": {
    "sources": [
      "https://www.cambridge.org/core/books/abs/cambridge-history-of-china/southern-ming-16441662/97FA570559404A627906FBF78D0C3A09"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1644–1662 follows Lynn Struve's Cambridge chronology for the Southern Ming courts; the Taiwan continuation is properly distinguished.",
      "sources": [
        "https://www.cambridge.org/core/books/abs/cambridge-history-of-china/southern-ming-16441662/97FA570559404A627906FBF78D0C3A09"
      ]
    }
  },
  "zheng-he": {
    "sources": [
      "https://www.cambridge.org/core/journals/international-organization/article/defending-hierarchy-from-the-moon-to-the-indian-ocean-symbolic-capital-and-political-dominance-in-early-modern-china-and-the-cold-war/1A48863DA2EE573CA0899DF939CCEE1D"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1405 is the first departure. The existing note appropriately explains the seven-voyage sequence through 1433.",
      "sources": [
        "https://www.cambridge.org/core/journals/international-organization/article/defending-hierarchy-from-the-moon-to-the-indian-ocean-symbolic-capital-and-political-dominance-in-early-modern-china-and-the-cold-war/1A48863DA2EE573CA0899DF939CCEE1D"
      ]
    }
  },
  "nanking": {
    "sources": [
      "https://history.state.gov/milestones/1830-1860/china-1"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1842 is confirmed for the treaty; the distinction between this treaty and subsequent privileges is appropriate.",
      "sources": [
        "https://history.state.gov/milestones/1830-1860/china-1"
      ]
    }
  },
  "movable-type": {
    "approx": true,
    "sources": [
      "https://scalar.usc.edu/works/chinese-rare-books/techniques.225"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "1041–1048 is the attestation window for Bi Sheng's work, not a securely dated seven-year project. Preserve the range and make uncertainty visible.",
      "sources": [
        "https://scalar.usc.edu/works/chinese-rare-books/techniques.225"
      ]
    }
  },
  "qingming-scroll": {
    "approx": true,
    "sources": [
      "https://www.metmuseum.org/art/collection/search/36048",
      "https://digitalarchive.npm.gov.tw/Collection/Detail/19052?dep=P"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "Museums support early twelfth century. 1100–1127 is an approximate display envelope, not two independently attested production dates.",
      "sources": [
        "https://www.metmuseum.org/art/collection/search/36048",
        "https://digitalarchive.npm.gov.tw/Collection/Detail/19052?dep=P"
      ]
    }
  },
  "manila-silver": {
    "sources": [
      "https://blogs.loc.gov/international-collections/2021/10/negotiating-empire-part-i-from-magellan-to-the-founding-of-manila-16th-18th-centuries/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1571 correctly marks Spanish establishment in Manila; the trade itself developed gradually and had earlier regional foundations.",
      "sources": [
        "https://blogs.loc.gov/international-collections/2021/10/negotiating-empire-part-i-from-magellan-to-the-founding-of-manila-16th-18th-centuries/"
      ]
    }
  },
  "red-chamber": {
    "sources": [
      "https://open.lib.umn.edu/redchamber/part/textofthenovel/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1791 is the publication milestone; earlier manuscript circulation and the disputed last forty chapters are correctly distinguished.",
      "sources": [
        "https://open.lib.umn.edu/redchamber/part/textofthenovel/"
      ]
    }
  },
  "song-paper-money": {
    "sources": [
      "https://brs.website.rba.gov.au/publications/bulletin/2019/sep/pdf/bulletin-2019-09.pdf",
      "https://afe.easia.columbia.edu/songdynasty-module/econ-rev-money.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1024 is supported by the Reserve Bank of Australia's historical account. Columbia describes the government takeover more broadly as the 1020s; retain the note distinguishing administration in 1023 from issues in 1024.",
      "sources": [
        "https://brs.website.rba.gov.au/publications/bulletin/2019/sep/pdf/bulletin-2019-09.pdf",
        "https://afe.easia.columbia.edu/songdynasty-module/econ-rev-money.html"
      ]
    }
  },
  "song-wang-anshi": {
    "sources": [
      "https://afe.easia.columbia.edu/main_pop/ps/ps_china-wang-anshi-crop-loans.htm"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "The translated crop-loan memorial is explicitly dated Xining 2, 1069; this is a launch marker rather than the entire reform duration.",
      "sources": [
        "https://afe.easia.columbia.edu/main_pop/ps/ps_china-wang-anshi-crop-loans.htm"
      ]
    }
  },
  "song-shen-kuo": {
    "approx": true,
    "sources": [
      "https://uw.manifoldapp.org/read/good-formulas-a55278c8-9e3b-41b6-af69-c471083061ac/section/c0c96e65-51c5-466e-925e-11d7ecc92581"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "Retain circa 1088 as a conventional anchor, but replace the assertion of a secure completion year. University of Washington Press places completion of Brush Talks/Dream Pool Essays sometime between 1088 and 1095.",
      "sources": [
        "https://uw.manifoldapp.org/read/good-formulas-a55278c8-9e3b-41b6-af69-c471083061ac/section/c0c96e65-51c5-466e-925e-11d7ecc92581"
      ]
    },
    "description": "Shen Kuo’s Dream Pool Essays, also known as Brush Talks, gathered observations on subjects including astronomy, geography, technology and medicine. The work is commonly associated with about 1088; scholarly estimates place its completion between 1088 and 1095.",
    "note": "Circa 1088 is an approximate display anchor. University of Washington Press places completion sometime between 1088 and 1095."
  },
  "song-zhu-xi": {
    "sources": [
      "https://www.degruyterbrill.com/document/doi/10.7312/zhu-20632-001/pdf?licenseType=free"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1179 is supported for the Nankang appointment and associated academy revival. Preserve the existing distinction from the later formation of examination orthodoxy.",
      "sources": [
        "https://www.degruyterbrill.com/document/doi/10.7312/zhu-20632-001/pdf?licenseType=free"
      ]
    }
  },
  "song-quanzhou": {
    "sources": [
      "https://whc.unesco.org/document/189212"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "ICOMOS explicitly dates the Maritime Trade Office's creation to 1087; this does not date Quanzhou's foundation.",
      "sources": [
        "https://whc.unesco.org/document/189212"
      ]
    }
  },
  "yuan-religions": {
    "sources": [
      "https://www.metmuseum.org/toah/ht/07/eac.html",
      "https://afe.easia.columbia.edu/mongols/china/china3_f.htm"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1271–1368 is correctly described as a thematic dynastic range, not a universal tolerance decree. Columbia documents selective patronage and restrictions.",
      "sources": [
        "https://www.metmuseum.org/toah/ht/07/eac.html",
        "https://afe.easia.columbia.edu/mongols/china/china3_f.htm"
      ]
    }
  },
  "yuan-blue-white": {
    "sources": [
      "https://www.britishmuseum.org/collection/object/A_PDF-B-613"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1351 is directly attested by the David Vases' dedicatory inscription; it is not the invention date of blue-and-white porcelain.",
      "sources": [
        "https://www.britishmuseum.org/collection/object/A_PDF-B-613"
      ]
    }
  },
  "ming-wang-yangming": {
    "sources": [
      "https://plato.stanford.edu/entries/wang-yangming/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Stanford's scholarly account places Wang's Longchang awakening in 1508; its narrated character is appropriately acknowledged.",
      "sources": [
        "https://plato.stanford.edu/entries/wang-yangming/"
      ]
    }
  },
  "ming-journey-west": {
    "sources": [
      "https://www.jstor.org/stable/j.ctvct027d",
      "https://uw.manifoldapp.org/read/72f173a7-0e3b-4728-953c-c40b6e8bb4bd/section/6f00de67-e843-43bc-9d9b-94ee1be9399d",
      "https://www.cambridge.org/core/elements/early-globalism-and-chinese-literature/33C0D59D071F6B08EAB49C28800D69C8",
      "https://academic.oup.com/dsh/article/39/1/308/7444779",
      "https://iep.utm.edu/xuanzang/",
      "https://afe.easia.columbia.edu/cosmos/main/using_monkey.pdf",
      "https://press.uchicago.edu/ucp/books/book/chicago/J/bo12893528.html"
    ],
    "sourceLabels": {
      "https://www.jstor.org/stable/j.ctvct027d": "Hongmei Sun · Transforming Monkey",
      "https://uw.manifoldapp.org/read/72f173a7-0e3b-4728-953c-c40b6e8bb4bd/section/6f00de67-e843-43bc-9d9b-94ee1be9399d": "University of Washington · Journey to the West teaching edition",
      "https://www.cambridge.org/core/elements/early-globalism-and-chinese-literature/33C0D59D071F6B08EAB49C28800D69C8": "Cambridge University Press · Early Globalism and Chinese Literature",
      "https://academic.oup.com/dsh/article/39/1/308/7444779": "Oxford Academic · Retranslated Chinese classical canon Journey to the West",
      "https://iep.utm.edu/xuanzang/": "Internet Encyclopedia of Philosophy · Xuanzang",
      "https://afe.easia.columbia.edu/cosmos/main/using_monkey.pdf": "Columbia University · Using Monkey in the Classroom",
      "https://press.uchicago.edu/ucp/books/book/chicago/J/bo12893528.html": "University of Chicago Press · The Journey to the West"
    },
    "dateReview": {
      "status": "confirmed",
      "note": "Scholarly studies identify the 1592 edition. The card correctly limits its claim to the surviving complete edition and qualifies author attribution.",
      "sources": [
        "https://www.jstor.org/stable/j.ctvct027d",
        "https://uw.manifoldapp.org/read/72f173a7-0e3b-4728-953c-c40b6e8bb4bd/section/6f00de67-e843-43bc-9d9b-94ee1be9399d"
      ]
    }
  },
  "ming-li-shizhen": {
    "sources": [
      "https://www.ndl.go.jp/en/nature/11"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "The National Diet Library confirms the 1596 publication milestone; this is distinct from composition and should not imply publication during Li's lifetime.",
      "sources": [
        "https://www.ndl.go.jp/en/nature/11"
      ]
    }
  },
  "qing-inner-asia": {
    "sources": [
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC13440406/",
      "https://elibrary.bsu.edu.az/files/books_400/N_6.pdf"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1755–1759 is supported for the linked Dzungar and Tarim conquests. The interval groups campaigns and is not an exact duration for all Qing activity in Inner Asia. Do not add the demographic estimates quoted in the recent article as settled numbers.",
      "sources": [
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC13440406/",
        "https://elibrary.bsu.edu.az/files/books_400/N_6.pdf"
      ]
    }
  },
  "qing-siku": {
    "sources": [
      "https://ieas.berkeley.edu/news/c-v-starr-east-asian-library-receives-monumental-gift",
      "https://www.loc.gov/item/2021666133/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Berkeley explicitly supports compilation in 1773–1782. The earlier commission and differing dates for specific copies are correctly noted.",
      "sources": [
        "https://ieas.berkeley.edu/news/c-v-starr-east-asian-library-receives-monumental-gift",
        "https://www.loc.gov/item/2021666133/"
      ]
    }
  },
  "qing-exams-end": {
    "sources": [
      "https://history.state.gov/historicaldocuments/frus1905/d215"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "The contemporary diplomatic report expressly dates the abolition edict to 2 September 1905. The separate December education-ministry decree is not the abolition date.",
      "sources": [
        "https://history.state.gov/historicaldocuments/frus1905/d215"
      ]
    }
  },
  "yue-fei": {
    "sources": [
      "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/toward-a-nation-defined-by-state-tattooed-loyalty-and-the-evolution-of-yue-feis-11031142-image-from-the-song-to-the-present/D36D331BEBA1C16188E89856AAFB533B"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1127–1142 is valid only as the Southern Song portion of his career. He joined the army in 1122; lifespan was 1103–1142. The existing card states the restricted frame, so no date change is necessary.",
      "sources": [
        "https://www.cambridge.org/core/journals/journal-of-chinese-history/article/toward-a-nation-defined-by-state-tattooed-loyalty-and-the-evolution-of-yue-feis-11031142-image-from-the-song-to-the-present/D36D331BEBA1C16188E89856AAFB533B"
      ]
    }
  },
  "song-gunpowder": {
    "sources": [
      "https://afe.easia.columbia.edu/songdynasty-module/tech-gunpowder.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1044 dates the Wujing zongyao manual and recorded recipes; the card correctly avoids treating it as gunpowder's initial discovery.",
      "sources": [
        "https://afe.easia.columbia.edu/songdynasty-module/tech-gunpowder.html"
      ]
    }
  },
  "red-turbans": {
    "sources": [
      "https://www.cambridge.org/core/journals/journal-of-asian-studies/article/abs/transformations-of-messianic-revolt-and-the-founding-of-the-ming-dynasty/BE0CE955588A1907A2D9EB97E7B42D04",
      "https://www.metmuseum.org/toah/ht/07/eac.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1351 is the documented outbreak; 1368 is the Ming-foundation cutoff for the card's grouped rebellions. This is not a claim that all insurgent activity ended simultaneously.",
      "sources": [
        "https://www.cambridge.org/core/journals/journal-of-asian-studies/article/abs/transformations-of-messianic-revolt-and-the-founding-of-the-ming-dynasty/BE0CE955588A1907A2D9EB97E7B42D04",
        "https://www.metmuseum.org/toah/ht/07/eac.html"
      ]
    }
  },
  "tumu-crisis": {
    "sources": [
      "https://www.dpm.org.cn/lemmas/243962.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "The Palace Museum confirms the defeat and capture in 1449. Later return and restoration are separate events.",
      "sources": [
        "https://www.dpm.org.cn/lemmas/243962.html"
      ]
    }
  },
  "ming-maritime-conflict": {
    "sources": [
      "https://ora.ox.ac.uk/objects/uuid%3A68239bdc-cfde-46db-bd42-386e21dfabba/files/d6108vb75c"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "The Oxford research dates the first cited maritime prohibition to 1371 and relaxation to 1567, while identifying many intervening decrees. The card's variable-enforcement qualification is necessary.",
      "sources": [
        "https://ora.ox.ac.uk/objects/uuid%3A68239bdc-cfde-46db-bd42-386e21dfabba/files/d6108vb75c"
      ]
    }
  },
  "zhang-juzheng": {
    "sources": [
      "https://iris.unive.it/retrieve/e4239dde-8923-7180-e053-3705fe0a3322/05-LIPPIELLO-ITINERARIA.pdf",
      "https://openresearch-repository.anu.edu.au/bitstreams/8772821b-d94f-4d90-ac7b-703d3fafe25a/download"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1572–1582 is supported for Zhang's senior-secretary dominance, not his whole official career or all origins of Single Whip reform.",
      "sources": [
        "https://iris.unive.it/retrieve/e4239dde-8923-7180-e053-3705fe0a3322/05-LIPPIELLO-ITINERARIA.pdf",
        "https://openresearch-repository.anu.edu.au/bitstreams/8772821b-d94f-4d90-ac7b-703d3fafe25a/download"
      ]
    }
  },
  "kangxi-rule": {
    "sources": [
      "https://www.npm.gov.tw/ChineseArt-Content.aspx?a=3021&idstr=03012531&l=1&sno=04012587&type=2018",
      "https://uw.manifoldapp.org/read/vignettes-from-the-late-ming/section/17d430d9-5575-40c5-9e94-bfd448f3515b"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1661–1722 is accession-to-death; 1662 begins the Kangxi era name. The existing note correctly explains the distinction.",
      "sources": [
        "https://www.npm.gov.tw/ChineseArt-Content.aspx?a=3021&idstr=03012531&l=1&sno=04012587&type=2018",
        "https://uw.manifoldapp.org/read/vignettes-from-the-late-ming/section/17d430d9-5575-40c5-9e94-bfd448f3515b"
      ]
    }
  },
  "li-zicheng-beijing": {
    "sources": [
      "https://www.dpm.org.cn/court/event/159873.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1644 is secure for Li's capture and loss of Beijing. The Qing takeover and continuing Southern Ming resistance are properly distinguished.",
      "sources": [
        "https://www.dpm.org.cn/court/event/159873.html"
      ]
    }
  },
  "republic": {
    "name": "Republic of China (mainland period)",
    "end": 1949,
    "description": "The Republic of China (中华民国 Zhōnghuá Mínguó) replaced imperial rule in 1912. Its mainland years brought struggles to unite the country, new schools and cultural movements, [[war-japan|war with Japan]], and [[civil-war|civil war]]. Communist victory in 1949 drove the Nationalist government to [[roc-taiwan|Taiwan]] (台湾 Táiwān), where the Republic of China continued.",
    "sources": [
      "https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B",
      "https://www.hup.harvard.edu/books/9780674066243",
      "https://english.president.gov.tw/page/49",
      "https://history.state.gov/milestones/1899-1913/chinese-rev",
      "https://www.history.ox.ac.uk/chinas-war-japan",
      "https://history.state.gov/milestones/1945-1952/chinese-rev",
      "https://achh.army.mil/history/book-wwii-malaria-chaptervii/",
      "https://www.president.gov.tw/Page/294/37523"
    ],
    "dateReview": {
      "status": "correct",
      "note": "1 January 1912 is the republic’s founding. 1949 ends this mainland-period card, not the existence of the ROC government, which relocated to Taiwan. Qing abdication followed on 12 February 1912.",
      "sources": [
        "https://english.president.gov.tw/page/49",
        "https://www.president.gov.tw/Page/294/37523"
      ]
    },
    "note": "",
    "catalogDates": null,
    "catalogNote": "1 January 1912 is the republic’s founding. 1949 ends this mainland-period card, not the existence of the ROC government, which relocated to Taiwan. Qing abdication followed on 12 February 1912.",
    "sourceLabels": {
      "https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B": "Patricia Buckley Ebrey · The Cambridge Illustrated History of China",
      "https://www.hup.harvard.edu/books/9780674066243": "William T. Rowe · China’s Last Empire: The Great Qing",
      "https://english.president.gov.tw/page/49": "Office of the President, ROC · Sun Yat-sen chronology",
      "https://history.state.gov/milestones/1899-1913/chinese-rev": "U.S. Office of the Historian · The Chinese Revolution of 1911",
      "https://www.history.ox.ac.uk/chinas-war-japan": "University of Oxford · China’s War with Japan research programme",
      "https://history.state.gov/milestones/1945-1952/chinese-rev": "U.S. Office of the Historian · The Chinese Revolution of 1949",
      "https://achh.army.mil/history/book-wwii-malaria-chaptervii/": "U.S. Army Medical Department · China-Burma-India Theater"
    },
    "sections": [
      {
        "title": "Sun Yat-sen and the new republic",
        "text": "Sun Yat-sen (孙中山 Sūn Zhōngshān) became provisional president at Nanjing (南京 Nánjīng) on 1 January 1912. He had spent years organising against the [[qing|Qing]] (清 Qīng) dynasty and raising support among Chinese communities overseas. His aim was a republic whose government would represent the nation and make China strong enough to resist foreign domination.\n\nSun had been abroad when the [[catalog-E_QING_1911|revolution of 1911]] began. An army uprising spread into a revolt by provinces against the Qing court. The revolutionaries could establish a government in the south, but they lacked the military strength to impose its authority across China.\n\nThe strongest northern commander was Yuan Shikai (袁世凯 Yuán Shìkǎi), a former Qing official. Sun agreed to give up the presidency if Yuan secured the [[abdication|emperor’s abdication]] and supported a republic. The last emperor abdicated on 12 February 1912, and Yuan succeeded Sun later that year. The republic began through this settlement between revolutionaries and the old regime’s military leadership.\n\nParliamentary elections followed, but Yuan suppressed his opponents and concentrated power in his own hands. His attempt to become emperor in 1915–1916 provoked resistance. He abandoned the plan and died in 1916, leaving competing commanders to struggle over his army and government."
      },
      {
        "title": "A country divided among armies",
        "text": "During the [[warlord-era|warlord period]] (军阀 jūnfá), regional commanders controlled troops and made or broke alliances. A government remained in Beijing (北京 Běijīng), but it could not reliably command the provinces. Controlling the capital gave a military faction foreign recognition without guaranteeing control of the country.\n\nRepeated campaigns disrupted farming, trade and travel. Banditry led communities to organise their own defences. Some cities still supported expanding industries, newspapers and universities. Political fragmentation and cultural experimentation occurred together.\n\nForeign powers retained privileges inherited from treaties with the Qing. These included control of concessions in important cities and exemptions from Chinese courts. Ending such privileges became a cause shared by students, merchants and competing political movements."
      },
      {
        "title": "The Nationalists reunite much of China",
        "text": "Sun’s Nationalist Party, or Kuomintang (国民党 Guómíndǎng, KMT), sought to defeat the warlords and end foreign privileges. With Soviet assistance, it strengthened its party organisation and army. Members of the [[ccp-founding|Chinese Communist Party]] (中国共产党 Zhōngguó Gòngchǎndǎng, CCP), founded in 1921, joined this alliance while retaining their own organisation.\n\nSun died in 1925. Chiang Kai-shek (蒋介石 Jiǎng Jièshí) led the Northern Expedition (北伐 Běifá), launched in 1926. Military victories and agreements with regional commanders brought much of China under Nationalist authority by 1928. The government ruled from Nanjing, though powerful regional armies remained.\n\nThe alliance broke apart during the advance. In 1927, Chiang’s forces and allies killed Communists and labour activists in Shanghai (上海 Shànghǎi). Further purges drove surviving Communists underground or into rural bases. The campaign to unite China also began a prolonged struggle between the Nationalists and Communists.\n\nDuring the Nanjing decade, the government worked to improve banking, currency, roads and communications. It recovered some rights to set tariffs and reduced foreign privileges. The Nationalists restricted political opposition and governed through party rule. Military spending and continuing conflict limited what they could achieve."
      },
      {
        "title": "New writing, education and women’s rights",
        "text": "The New Culture Movement (新文化运动 Xīn Wénhuà Yùndòng) challenged ideas about education, family authority and China’s future. The journal that became New Youth (新青年 Xīn Qīngnián), founded in 1915, promoted science, political change and writing closer to everyday speech. Reformers wanted readers to express new ideas without mastering the old classical literary language first.\n\n[[lu-xun|Lu Xun]] (鲁迅 Lǔ Xùn) used this form of writing in A Madman’s Diary (狂人日记 Kuángrén rìjì), published in 1918. Its narrator imagines a society of cannibals, turning a disturbing story into an attack on cruel social conventions. Fiction became a way to question the authority of families and elders as well as governments.\n\nOn 4 May 1919, [[catalog-E_MOD_MAY4|students in Beijing protested]] against the Versailles settlement’s transfer of German privileges in Shandong (山东 Shāndōng) to Japan. Demonstrations spread, joined by strikes and boycotts. The May Fourth Movement (五四运动 Wǔsì yùndòng) brought questions of culture and national independence into the same public struggle.\n\nSchools and universities trained teachers, engineers, doctors and other professionals. More women entered education, journalism and paid work. The Nationalists’ civil code in the 1930s gave daughters inheritance rights and expanded women’s rights in marriage and divorce. Many rural families knew little of these laws, and custom often outweighed them.\n\nIn Shanghai, publishing, cinema and manufacturing created new jobs and audiences. Factory workers, including many women and girls, endured long hours and poor conditions. The opportunities celebrated in magazines were far beyond the reach of much of the population."
      },
      {
        "title": "The Communists build rural bases",
        "text": "Mao Zedong (毛泽东 Máo Zédōng) and other Communist leaders organised peasants in areas beyond firm Nationalist control. Land redistribution, armed forces and local party networks helped them recruit supporters. Internal purges and coercion also shaped these bases.\n\nNationalist campaigns forced the Communists to abandon their main southern base in 1934. The [[catalog-E_MOD_LONG_MARCH|Long March]] (长征 Chángzhēng), the main Communist army’s retreat in 1934–1935, cost them many lives but preserved a core of troops and leaders. Mao gained authority during these struggles. The party later established its headquarters at Yan’an (延安 Yán’ān) in the northwest."
      },
      {
        "title": "War with Japan",
        "text": "Japan seized Manchuria (满洲 Mǎnzhōu) in 1931 and established a dependent state there. Full-scale war spread across China in 1937. Nationalist armies fought major battles, including a prolonged defence of Shanghai. When Japanese forces captured Nanjing in December, they massacred civilians and disarmed soldiers and committed widespread rape.\n\nThe Nationalist government eventually made Chongqing (重庆 Chóngqìng), far inland, its wartime capital. Officials and industries moved away from occupied areas. Repeated bombing, shortages and difficult supply routes made continued resistance costly.\n\nNationalists and Communists agreed to cooperate against Japan, but mistrust and armed clashes persisted. The Nationalists fought large conventional campaigns while Communist forces expanded guerrilla bases behind Japanese lines. Both drew recruits, food and labour from communities already suffering under invasion and war.\n\nChina became an Allied power in the wider Second World War. Foreign supplies helped sustain its forces; roads and air routes through neighbouring countries were important because Japan controlled many coastal approaches. Chinese and American troops working along the Ledo Road formed part of this effort to restore an overland supply route.\n\nJapan’s surrender in 1945 ended the invasion, but left China devastated. Millions had died, many more had fled their homes, and farms and factories had been destroyed. The government had won a place among the victors while exhausting much of its strength."
      },
      {
        "title": "Civil war and the move to Taiwan",
        "text": "Negotiations failed to produce a lasting settlement between the Nationalists and Communists. By 1946, full-scale civil war had resumed. The two sides fought for cities, railways and the resources needed to supply their armies.\n\nThe Nationalists began with larger forces and American support, but military defeats, corruption, harsh conscription and runaway inflation eroded their position. The Communists combined military organisation with rural mobilisation and land reform. Their campaigns brought support from many villagers, alongside coercion against people who resisted.\n\nDecisive Communist victories in 1948–1949 destroyed major Nationalist armies. On 1 October 1949, Mao proclaimed the [[prc|People’s Republic of China]] (中华人民共和国 Zhōnghuá Rénmín Gònghéguó) in Beijing. The Nationalist government withdrew to Taiwan.\n\nThe Republic of China continued there, with its own government and armed forces. Fighting continued across the Taiwan Strait. The rival governments carried their competing claims into the decades that followed."
      }
    ],
    "related": [
      "war-japan",
      "civil-war",
      "roc-taiwan",
      "qing",
      "catalog-E_QING_1911",
      "abdication",
      "warlord-era",
      "ccp-founding",
      "lu-xun",
      "catalog-E_MOD_MAY4",
      "catalog-E_MOD_LONG_MARCH",
      "prc"
    ]
  },
  "prc": {
    "sources": [
      "https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B",
      "https://www.wto.org/english/thewto_e/acc_e/a1_chine_e.htm",
      "https://www.wto.org/english/news_e/news21_e/acc_10dec21_e.htm",
      "https://history.state.gov/milestones/1969-1976/rapprochement-china",
      "https://digitallibrary.un.org/record/859579/files/1122290-EN.pdf",
      "https://thedocs.worldbank.org/en/doc/bdadc16a4f5c1c88a839c0f905cde802-0070012022/original/Poverty-Synthesis-Report-final.pdf",
      "https://en.npc.gov.cn.cdurl.cn/2018-03/11/c_1145428.htm",
      "https://www.stats.gov.cn/english/PressRelease/202601/t20260119_1962328.html",
      "https://www.worldbank.org/en/news/press-release/2026/07/07/rebalancing-growth-china-economic-update",
      "https://faolex.fao.org/docs/pdf/chn180555.pdf",
      "https://history.state.gov/milestones/1977-1980/china-policy",
      "https://history.state.gov/milestones/1945-1952/chinese-rev"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Proclaimed 1 October 1949. 2026 is the dataset display horizon, not an end date.",
      "sources": [
        "https://history.state.gov/milestones/1945-1952/chinese-rev"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Proclaimed 1 October 1949. 2026 is the dataset display horizon, not an end date.",
    "name": "People’s Republic of China",
    "description": "The People’s Republic of China (中华人民共和国 Zhōnghuá Rénmín Gònghéguó) was founded in 1949 after Mao Zedong’s (毛泽东 Máo Zédōng) Communist victory in the [[civil-war|civil war]]. Governed from Beijing (北京 Běijīng), it moved from collective farming and revolutionary campaigns to [[reform-opening|market reforms]], becoming a major industrial power while retaining one-party rule.",
    "sections": [
      {
        "title": "A revolutionary party takes power",
        "text": "Mao proclaimed the new republic on 1 October 1949. The [[ccp-founding|Chinese Communist Party]] (中国共产党 Zhōngguó Gòngchǎndǎng) had built rural bases, recruited peasant support and developed armies capable of defeating the Nationalists (国民党 Guómíndǎng). Its opponents were weakened by years of [[war-japan|war with Japan]], corruption and inflation that destroyed the value of wages and savings. The Nationalist government withdrew to [[roc-taiwan|Taiwan]] (台湾 Táiwān), where the [[republic|Republic of China (中华民国 Zhōnghuá Mínguó)]] continued. The two governments remained separate.\n\nThe new state restored financial stability and extended its authority through party organisations in villages, factories and schools. [[land-reform|Land reform]] distributed landlords’ holdings to poorer peasants, often through violent public denunciations and executions. The [[marriage-law|1950 marriage law]] challenged forced marriages and expanded women’s ability to divorce. Schools and public-health services reached more people, although provision remained much poorer in the countryside.\n\nAn urban work unit, or danwei (单位 dānwèi), could provide a job, housing and medical care while controlling permissions to travel or marry. Political campaigns made a person’s family background and declared loyalties part of everyday life."
      },
      {
        "title": "Industrial planning and the Great Leap Forward",
        "text": "With Soviet assistance, the government built steelworks, machinery plants and other heavy industries. Farmers helped pay for industrialisation through grain supplied to the state. By the mid-1950s, [[agricultural-collectivization|agricultural collectives]] had largely replaced the individual holdings created by land reform. Officials increasingly decided what farmers grew and how their labour was organised.\n\nMao wanted faster progress. The [[great-leap|Great Leap Forward]] (大跃进 Dà Yuèjìn), launched in 1958, combined huge rural communes with drives to increase food and industrial production. Villagers were diverted into construction and backyard steelmaking. Officials exaggerated harvests; the state collected grain on the basis of those inflated reports, leaving too little to eat.\n\nThe resulting famine is estimated to have killed tens of millions between 1959 and 1962. Fear of punishment discouraged honest reports and criticism, allowing disastrous policies to continue. In 1957, the [[hundred-flowers|Anti-Rightist campaign]] (反右运动 fǎnyòu yùndòng) punished people who had answered Mao’s invitation to criticise the party. The government eventually reduced the communes’ demands and restored more practical farming arrangements."
      },
      {
        "title": "The Cultural Revolution",
        "text": "In 1966, Mao launched the [[cultural-revolution|Cultural Revolution]] (文化大革命 Wénhuà Dà Gémìng), attacking leaders he accused of taking China towards capitalism. Student Red Guards (红卫兵 Hóngwèibīng) denounced teachers and officials, assaulted people and destroyed books, religious objects and historic buildings. Rival factions fought for power. The army intervened, while millions of urban young people were eventually sent to work in the countryside.\n\nEducation and careers were interrupted, and political accusations could split families. Across the Mao era, literacy and basic healthcare expanded; rural “barefoot doctors” brought vaccinations and simple treatments to communities without trained physicians. These gains coexisted with persecution, shortages and sharp inequalities between urban and rural services.\n\nChina’s international position also changed. A Soviet ally in the 1950s, it later became the Soviet Union’s rival. In 1971, PRC representatives replaced the Republic of China’s representatives at the United Nations. [[nixon-china|Richard Nixon’s visit]] in 1972 opened a new relationship with the United States. [[catalog-E_MOD_MAO_DEATH|Mao died in September 1976]]; the arrest of the radical Gang of Four (四人帮 Sìrénbāng) the following month ended their influence at the centre of government."
      },
      {
        "title": "Deng opens the economy",
        "text": "By late 1978, Deng Xiaoping (邓小平 Dèng Xiǎopíng) had emerged as China’s dominant leader. His programme shifted attention towards production, technical knowledge and higher living standards. Families regained responsibility for farming collectively owned land. After meeting their obligations, they could benefit from additional output. Rural workshops and businesses created work beyond agriculture.\n\n[[catalog-E_MOD_SEZ|Special economic zones]], including Shenzhen (深圳 Shēnzhèn) from 1980, offered space to attract foreign investment and experiment with market incentives. Factories drew on overseas capital and technology, Chinese labour and expanding transport networks. China and the United States established diplomatic relations in 1979, widening opportunities for trade, study and technical exchange.\n\nPeople could start businesses, seek different jobs and buy a growing range of goods. It also removed some protections. State-enterprise restructuring later cost many workers their jobs, while migrants often lacked the services available to established city residents. Markets expanded within a system in which the party still controlled appointments and major economic decisions."
      },
      {
        "title": "1989 and the limits of political reform",
        "text": "Economic opening raised expectations that government might also become more accountable. In spring 1989, [[catalog-E_MOD_TIANANMEN|student demonstrations in Beijing’s Tiananmen Square]] (天安门 Tiān’ānmén) grew into a wider movement joined by workers and other residents. Protesters objected to corruption and demanded political freedoms; demonstrations spread to other cities.\n\nThe leadership chose military repression. On the night of 3–4 June, troops advancing through Beijing killed hundreds of civilians; the full death toll remains uncertain. Arrests and political purges followed. The party continued to permit new ways to make a living while suppressing challenges to its monopoly on power. Market reforms nevertheless accelerated again in the early 1990s."
      },
      {
        "title": "Factories, cities and smaller families",
        "text": "China became a major supplier of manufactured goods, from clothing and electronics to cars. [[wto-accession|Entry into the World Trade Organization in 2001]] deepened its place in international trade. Geely’s (吉利 Jílì) car assembly plant in Ningbo (宁波 Níngbō) was one example of this expanding vehicle industry.\n\nRural migration supplied growing cities with workers and changed family life across the country. Factory wages, roads, schooling and access to markets helped reduce poverty. A 2022 assessment estimated that the number living below the then international extreme-poverty line had fallen by close to 800 million over four decades. That did not mean everyone enjoyed secure housing, healthcare or a comfortable income. Household registration, or hukou (户口 hùkǒu), continued to shape migrants’ access to public services.\n\nFamily size fell sharply. [[one-child-policy|Birth restrictions imposed around 1980]] included coercive enforcement and contributed to an ageing population, alongside changing aspirations and living costs. The shift to two children in 2015 and three in 2021 did not quickly reverse the trend. By the end of 2025, the mainland population was about 1.405 billion and falling; 23 per cent were aged sixty or older."
      },
      {
        "title": "A world power under tighter party control",
        "text": "[[catalog-E_MOD_XI|Xi Jinping]] (习近平 Xí Jìnpíng), who became the top party leader in 2012, concentrated authority and tightened control over public discussion. In 2018, the constitutional limit of two consecutive presidential terms was removed. Economic wealth had grown without producing a competitive national political system.\n\nChina’s manufacturing, investment and demand for resources now affect economies far beyond its borders. The costs of industrial growth are also substantial: polluted air and water, heavy energy use and unequal access to its rewards. By 2026, an ageing population and difficulties in the property sector were adding pressure to an economy seeking stronger household spending."
      }
    ],
    "note": "",
    "related": [
      "civil-war",
      "reform-opening",
      "ccp-founding",
      "war-japan",
      "roc-taiwan",
      "republic",
      "land-reform",
      "marriage-law",
      "agricultural-collectivization",
      "great-leap",
      "hundred-flowers",
      "cultural-revolution",
      "nixon-china",
      "catalog-E_MOD_MAO_DEATH",
      "catalog-E_MOD_SEZ",
      "catalog-E_MOD_TIANANMEN",
      "wto-accession",
      "one-child-policy",
      "catalog-E_MOD_XI"
    ],
    "sourceLabels": {
      "https://www.cambridge.org/highereducation/books/the-cambridge-illustrated-history-of-china/B8415BCABB0218ABC80F4EFEEA9F5B2B": "Patricia Buckley Ebrey · The Cambridge Illustrated History of China",
      "https://www.wto.org/english/thewto_e/acc_e/a1_chine_e.htm": "World Trade Organization · China’s accession",
      "https://www.wto.org/english/news_e/news21_e/acc_10dec21_e.htm": "World Trade Organization · Twenty years of China’s membership",
      "https://history.state.gov/milestones/1969-1976/rapprochement-china": "U.S. Office of the Historian · Rapprochement with China",
      "https://digitallibrary.un.org/record/859579/files/1122290-EN.pdf": "United Nations · Yearbook 1971: China’s representation",
      "https://thedocs.worldbank.org/en/doc/bdadc16a4f5c1c88a839c0f905cde802-0070012022/original/Poverty-Synthesis-Report-final.pdf": "World Bank and Development Research Center · Four Decades of Poverty Reduction in China",
      "https://en.npc.gov.cn.cdurl.cn/2018-03/11/c_1145428.htm": "National People’s Congress · Constitutional amendment, 2018",
      "https://www.stats.gov.cn/english/PressRelease/202601/t20260119_1962328.html": "National Bureau of Statistics · Population and economy in 2025",
      "https://www.worldbank.org/en/news/press-release/2026/07/07/rebalancing-growth-china-economic-update": "World Bank · China Economic Update, July 2026",
      "https://faolex.fao.org/docs/pdf/chn180555.pdf": "National People’s Congress · 2018 constitutional amendment, FAO copy",
      "https://history.state.gov/milestones/1977-1980/china-policy": "U.S. Office of the Historian · Normalisation with China"
    }
  },
  "catalog-S_MODERN": {
    "sources": [
      "https://english.president.gov.tw/page/49",
      "https://www.president.gov.tw/Page/294/37523"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "1912–2026 is an editorial exhibition frame. Modern China has no universally agreed beginning; 2026 is a display horizon.",
      "sources": [
        "https://english.president.gov.tw/page/49",
        "https://www.president.gov.tw/Page/294/37523"
      ]
    },
    "approx": true,
    "catalogDates": null,
    "catalogNote": "1912–2026 is an editorial exhibition frame. Modern China has no universally agreed beginning; 2026 is a display horizon."
  },
  "catalog-E_MOD_SEZ": {
    "sources": [
      "https://english.court.gov.cn/2016-04/15/c_761530.htm"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "26 August 1980: approval of Guangdong Special Economic Zone regulations, including Shenzhen. Preparatory policies date to 1979.",
      "sources": [
        "https://english.court.gov.cn/2016-04/15/c_761530.htm"
      ]
    },
    "catalogDates": null,
    "catalogNote": "26 August 1980: approval of Guangdong Special Economic Zone regulations, including Shenzhen. Preparatory policies date to 1979."
  },
  "catalog-E_MOD_BRI": {
    "sources": [
      "https://en.ndrc.gov.cn/aboutndrc/BandD/202105/t20210526_1280920.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "The land and maritime initiatives were proposed in September and October 2013. This is the launch year, not the date of every project.",
      "sources": [
        "https://en.ndrc.gov.cn/aboutndrc/BandD/202105/t20210526_1280920.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "The land and maritime initiatives were proposed in September and October 2013. This is the launch year, not the date of every project."
  },
  "catalog-E_MOD_XI": {
    "sources": [
      "https://www.china.org.cn/china/18th_cpc_congress/2012-11/15/content_27121146.htm",
      "https://www.congress.gov/crs_external_products/IF/PDF/IF10854/IF10854.2.pdf"
    ],
    "dateReview": {
      "status": "correct",
      "note": "15 November 2012 dates appointment as party general secretary. Political consolidation was a subsequent process, not a completed event that year.",
      "sources": [
        "https://www.china.org.cn/china/18th_cpc_congress/2012-11/15/content_27121146.htm",
        "https://www.congress.gov/crs_external_products/IF/PDF/IF10854/IF10854.2.pdf"
      ]
    },
    "approx": false,
    "catalogDates": null,
    "catalogNote": "15 November 2012 dates appointment as party general secretary. Political consolidation was a subsequent process, not a completed event that year."
  },
  "catalog-E_MOD_MAY4": {
    "sources": [
      "https://english.pku.edu.cn/news_events/news/focus/8411.html"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "4 May 1919 dates the Beijing protest; the wider movement has broader boundaries.",
      "sources": [
        "https://english.pku.edu.cn/news_events/news/focus/8411.html"
      ]
    },
    "catalogDates": null,
    "catalogNote": "4 May 1919 dates the Beijing protest; the wider movement has broader boundaries."
  },
  "catalog-E_MOD_LONG_MARCH": {
    "sources": [
      "https://www.china.org.cn/m/english/china_key_words/2022-07/13/content_78321650.html"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "1934 is the beginning anchor. October 1934–October 1936 covers multiple Red Army retreats; 1934–1935 covers the best-known First Front Army route.",
      "sources": [
        "https://www.china.org.cn/m/english/china_key_words/2022-07/13/content_78321650.html"
      ]
    },
    "approx": true,
    "catalogDates": {
      "start": 1934,
      "end": 1934,
      "approx": true
    },
    "catalogNote": "1934 is the beginning anchor. October 1934–October 1936 covers multiple Red Army retreats; 1934–1935 covers the best-known First Front Army route."
  },
  "catalog-E_MOD_MAO_DEATH": {
    "sources": [
      "https://www.fmprc.gov.cn/web/ziliao_674904/historytoday_674971/200309/t20030909_7949146.shtml"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Mao died on 9 September 1976.",
      "sources": [
        "https://www.fmprc.gov.cn/web/ziliao_674904/historytoday_674971/200309/t20030909_7949146.shtml"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Mao died on 9 September 1976."
  },
  "catalog-E_MOD_TIANANMEN": {
    "sources": [
      "https://history.state.gov/milestones/1989-1992/tiananmen-square",
      "https://nsarchive2.gwu.edu/NSAEBB/NSAEBB16/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1989 covers the protest movement. The Beijing military crackdown occurred on the night of 3–4 June.",
      "sources": [
        "https://history.state.gov/milestones/1989-1992/tiananmen-square",
        "https://nsarchive2.gwu.edu/NSAEBB/NSAEBB16/"
      ]
    },
    "catalogDates": null,
    "catalogNote": "1989 covers the protest movement. The Beijing military crackdown occurred on the night of 3–4 June."
  },
  "catalog-E_MOD_HK_RETURN": {
    "sources": [
      "https://www.yearbook.gov.hk/1997/ch4/e4a.htm"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "The sovereignty transfer took effect on 1 July 1997. The Joint Declaration was signed in 1984.",
      "sources": [
        "https://www.yearbook.gov.hk/1997/ch4/e4a.htm"
      ]
    },
    "catalogDates": null,
    "catalogNote": "The sovereignty transfer took effect on 1 July 1997. The Joint Declaration was signed in 1984."
  },
  "catalog-E_MOD_SPACE": {
    "sources": [
      "https://en.cmse.gov.cn/missions/shenzhouv/"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Shenzhou 5 launched on 15 October and returned on 16 October 2003.",
      "sources": [
        "https://en.cmse.gov.cn/missions/shenzhouv/"
      ]
    },
    "catalogDates": null,
    "catalogNote": "Shenzhou 5 launched on 15 October and returned on 16 October 2003."
  },
  "roc-taiwan": {
    "sources": [
      "https://english.president.gov.tw/page/49",
      "https://www.president.gov.tw/Page/294/37523"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1949 dates the relocation of the ROC central government to Taiwan. ROC administration of Taiwan began in 1945. 2026 is the exhibition horizon, not a historical end.",
      "sources": [
        "https://english.president.gov.tw/page/49",
        "https://www.president.gov.tw/Page/294/37523"
      ]
    }
  },
  "abdication": {
    "sources": [
      "https://english.president.gov.tw/page/49",
      "https://history.state.gov/historicaldocuments/frus1912/ch11?start=1"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "Qing abdication occurred on 12 February 1912, after the ROC provisional government was established on 1 January.",
      "sources": [
        "https://english.president.gov.tw/page/49",
        "https://history.state.gov/historicaldocuments/frus1912/ch11?start=1"
      ]
    }
  },
  "great-leap": {
    "sources": [
      "https://chineseposters.net/themes/great-leap-forward",
      "https://afe.easia.columbia.edu/special/china_1950_leaders.htm"
    ],
    "dateReview": {
      "status": "disputed",
      "note": "1958 is the campaign launch. The displayed 1958–1962 frame includes the famine crisis and retreat from the campaign; Chinese Posters uses 1958–1961 for the campaign. These are different scope conventions.",
      "sources": [
        "https://chineseposters.net/themes/great-leap-forward",
        "https://afe.easia.columbia.edu/special/china_1950_leaders.htm"
      ]
    }
  },
  "cultural-revolution": {
    "sources": [
      "https://afe.easia.columbia.edu/special/china_1950_leaders.htm"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1966–1976 is the conventional decade: launch in 1966, Mao’s death and arrest of the Gang of Four in 1976.",
      "sources": [
        "https://afe.easia.columbia.edu/special/china_1950_leaders.htm"
      ]
    }
  },
  "reform-opening": {
    "sources": [
      "https://blogs.worldbank.org/en/eastasiapacific/reflections-on-forty-years-of-china-reforms"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "December 1978 is the political turning point used here. Individual reforms began at different dates.",
      "sources": [
        "https://blogs.worldbank.org/en/eastasiapacific/reflections-on-forty-years-of-china-reforms"
      ]
    }
  },
  "lu-xun": {
    "sources": [
      "https://u.osu.edu/mclc/2018/09/28/lu-xuns-diary-of-a-madman-100-years-on/",
      "https://www.marxists.org/archive/lu-xun/1918/04/x01.htm"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "A Madman’s Diary was published in New Youth in May 1918. April 1918 on the translated text is its writing date. Ohio State source was available in search excerpt; direct retrieval failed.",
      "sources": [
        "https://u.osu.edu/mclc/2018/09/28/lu-xuns-diary-of-a-madman-100-years-on/",
        "https://www.marxists.org/archive/lu-xun/1918/04/x01.htm"
      ]
    }
  },
  "civil-war": {
    "sources": [
      "https://history.state.gov/milestones/1945-1952/chinese-rev"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1927–1949 marks the main civil-war sequence. Full-scale war resumed in 1946; 1949 is no comprehensive peace settlement.",
      "sources": [
        "https://history.state.gov/milestones/1945-1952/chinese-rev"
      ]
    }
  },
  "war-japan": {
    "sources": [
      "https://history.state.gov/milestones/1937-1945/pearl-harbor"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1937–1945 dates full-scale war from the Marco Polo Bridge fighting; Japanese occupation of Manchuria began in 1931.",
      "sources": [
        "https://history.state.gov/milestones/1937-1945/pearl-harbor"
      ]
    }
  },
  "land-reform": {
    "sources": [
      "https://chineseposters.net/themes/land-reform"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1950–1953 is the early PRC campaign covered by the source; earlier base-area reforms and subsequent collectivization have different dates.",
      "sources": [
        "https://chineseposters.net/themes/land-reform"
      ]
    }
  },
  "marriage-law": {
    "sources": [
      "https://chineseposters.net/themes/marriage-law"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1950 dates the PRC Marriage Law, not completion of changes in household practices.",
      "sources": [
        "https://chineseposters.net/themes/marriage-law"
      ]
    }
  },
  "taiwan-democratization": {
    "sources": [
      "https://english.president.gov.tw/NEWS/2717",
      "https://www.president.gov.tw/qrcode/19e"
    ],
    "dateReview": {
      "status": "approximate",
      "note": "Selected institutional transition window: martial law ended on 15 July 1987 and the first direct presidential election was held in 1996. Earlier activism and later reforms fall outside this range.",
      "sources": [
        "https://english.president.gov.tw/NEWS/2717",
        "https://www.president.gov.tw/qrcode/19e"
      ]
    },
    "approx": true
  },
  "wto-accession": {
    "dateLabel": "December 2001",
    "description": "China became a member of the World Trade Organization on 11 December 2001. Membership brought commitments on tariffs, market access and trade rules.",
    "sources": [
      "https://www.wto.org/english/news_e/pres01_e/pr252_e.htm",
      "https://www.wto.org/english/thewto_E/minist_e/min01_e/min01_11nov_e.htm",
      "https://www.wto.org/english/thewto_e/countries_e/china_e.htm"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "China became a WTO member on 11 December 2001.",
      "sources": [
        "https://www.wto.org/english/news_e/pres01_e/pr252_e.htm",
        "https://www.wto.org/english/thewto_E/minist_e/min01_e/min01_11nov_e.htm",
        "https://www.wto.org/english/thewto_e/countries_e/china_e.htm"
      ]
    },
    "note": "China became a WTO member on 11 December 2001."
  },
  "ccp-founding": {
    "sources": [
      "https://english.www.gov.cn/news/topnews/202106/23/content_WS60d2f02ec6d0df57f98dbba1.html",
      "https://journals.sagepub.com/doi/pdf/10.1177/18681026221141448"
    ],
    "dateReview": {
      "status": "confirmed",
      "note": "1921 is established. 23 July is the conventional reconstructed opening date; 1 July is the commemorative anniversary.",
      "sources": [
        "https://english.www.gov.cn/news/topnews/202106/23/content_WS60d2f02ec6d0df57f98dbba1.html",
        "https://journals.sagepub.com/doi/pdf/10.1177/18681026221141448"
      ]
    }
  }
};
 for(const [id,patch] of Object.entries(dateAudit)){
  const prior=revisions[id]||{};
  revisions[id]={...prior,...patch,sources:[...new Set([...(prior.sources||[]),...(patch.sources||[])])]};
 }
 return {events,revisions,pinyin,coverage};
})();
if(typeof module!=='undefined')module.exports=CHART_RESEARCH;
