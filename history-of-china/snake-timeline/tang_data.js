/* Expanded Tang essays. Interpretive sections distinguish argument from chronology.
 * Source arrays include primary texts and named scholarship; existing sources are retained.
 */
const TANG_RESEARCH = (() => {
  const military='https://www.cambridge.org/core/journals/journal-of-chinese-history/article/reach-of-the-military-tang/ECFE9C64AE6E73EC4319B165A606F88C';
  const finance='https://www.cambridge.org/core/books/abs/cambridge-economic-history-of-china/public-finance/DBE2FA37763786D641ED7D999E1C55CC';
  const met='https://www.metmuseum.org/pt/essays/tang-dynasty-618-906';
  const events = [
    {id:'xuanwu-gate',name:'The Xuanwu Gate coup',nameZh:'玄武门之变',han:'门',start:626,end:626,
      description:'Li Shimin’s accession began with an ambush. His followers killed the crown prince Li Jiancheng and their brother Li Yuanji at the palace’s northern gate. Their father subsequently abdicated; Shimin became the emperor remembered as Taizong.',
      sections:[
        {title:'Victory needed a history',text:'The coup left a problem of legitimacy. Isenbike Togan’s study shows how Taizong’s court brought collaborative historical writing into the palace and elevated the second emperor’s part in the dynasty’s foundation. The work of securing a succession extended into the work of recording it: later readers encountered the violence through institutions shaped by the victor.'},
        {title:'Read the reputation critically',text:'Taizong’s celebrated government and his carefully fashioned reputation can both be real. The killings are secure; narratives that make his victory inevitable or entirely justified deserve greater caution. This is a case in which the production of historical evidence belongs inside the history being told.'}
      ],note:'626 CE. The card uses the year rather than imposing day-level precision on the timeline.',
      sources:['https://en.wikipedia.org/wiki/Xuanwu_Gate_Incident','https://brill.com/display/book/edcoll/9789004206236/Bej.9789004206229.i-444_009.pdf']},
    {id:'xuanzang-return',name:'Xuanzang returns to Chang’an',nameZh:'玄奘归国',han:'奘',start:645,end:645,
      description:'Xuanzang returned with Buddhist manuscripts after a journey begun in defiance of an imperial travel prohibition. The pilgrim who had left without permission now received recognition at the imperial center.',
      sections:[
        {title:'The work after the journey',text:'Bringing manuscripts home was only a beginning. Translation required collaborators, decisions about meaning, and institutions that could sustain years of work. Xuanzang’s enterprise sought to resolve differences among inherited texts. His account of the western regions also preserved knowledge of societies beyond Tang rule.'},
        {title:'An empire learning from elsewhere',text:'The larger significance is a transfer of intellectual authority. Chang’an’s cultural reach depended partly on knowledge acquired outside the empire and made usable within it. Xuanzang did not introduce Buddhism to China; he transformed a tradition already established there. Later religious biographies helped turn this difficult collective enterprise into a heroic individual journey.'}
      ],note:'Return: 645 CE. Accounts differ on his departure year; this marker does not depend on choosing between them.',
      sources:['https://depts.washington.edu/silkroad/lectures/wulec2.html','https://iep.utm.edu/xuanzang/','https://nalanda.nic.in/en/tourist-place/hiuen-tsang-memorial-hall/','https://whc.unesco.org/zh/list/1502']},
    {id:'talas',name:'The Battle of Talas',nameZh:'怛罗斯之战',han:'战',start:751,end:751,markerOffset:-20,
      description:'Tang forces were defeated by an Abbasid army in Central Asia. The battle exposed the limits of imperial intervention far from the court, but its consequences were less tidy than a permanent boundary between civilizations.',
      sections:[
        {title:'War did not stop exchange',text:'John Chaffee’s research records repeated Abbasid embassies to the Tang court after the battle. The captive Du Huan eventually returned by merchant ship with observations of life abroad. Military rivalry, diplomacy and commerce could coexist; a regional defeat did not sever the networks joining courts, merchants and craftsmen.'},
        {title:'The papermaking story',text:'The familiar claim that captured Chinese papermakers introduced the craft to the Islamic world compresses a disputed process into a memorable incident. Paper was already used in Central Asia before 751. The battle’s precise contribution to spreading production remains uncertain. Talas is more useful as a window onto overlapping networks than as a single explanation for everything that followed.'}
      ],note:'751 CE. The papermaking narrative is disputed; the battle did not instantly Islamize Central Asia.',
      sources:['https://www.iranicaonline.org/articles/chinese-iranian-ii/','https://doi.org/10.1017/9780511998492.002','https://www.iranicaonline.org/articles/paper-and-papermaking/']},
    {id:'two-tax',name:'The Two-Tax reform',nameZh:'两税法',han:'税',start:780,end:780,
      description:'Yang Yan proposed assessing households where they actually lived and grading their obligations by wealth. Payments fell in summer and autumn. The reform responded to a society that older registration categories could no longer adequately capture.',
      sections:[
        {title:'Rebuilding the fiscal bargain',text:'The proposal reached beyond settled farmers to itinerant merchants. A court less able to anchor taxpayers to inherited administrative categories sought revenue from the property and activity it could identify. The analytical point is that fiscal reconstruction also changed the relationship between household and government: recovering revenue required deciding anew what made someone liable.'},
        {title:'A contemporary objection',text:'Lu Zhi argued that the reform turned exceptional wartime demands into permanent obligations and burdened settled farming property while more mobile wealth could escape. His criticism prevents an easy story of progress. A tax system could become more adaptable without becoming fairer. “Two taxes” refers to the collection schedule, not simply two taxable goods.'}
      ],note:'780 CE. The linked translated memorials preserve both the proposal and a contemporary critique.',
      sources:['https://afe.easia.columbia.edu/ps/cup/tang_tax_debate.pdf',finance]},
    {id:'huichang',name:'The suppression of Buddhism',nameZh:'会昌灭佛',han:'佛',start:845,end:845,
      description:'Emperor Wuzong’s major suppression ordered Buddhist clergy back into lay life and brought monastic resources under state control. His edict portrayed religious institutions as consuming labor and wealth while evading obligations to family and ruler.',
      sections:[
        {title:'Who could command resources?',text:'The edict connects belief to registration, taxation and property. Read in those terms, persecution was also an attempt to redirect labor and institutional wealth. Religious hostility and Wuzong’s Daoist commitments operated alongside these material interests. Other religious communities were targeted as well.'},
        {title:'An edict is an argument',text:'The court’s insistence that Buddhism was foreign was a political claim about a tradition deeply embedded in Tang society. It should not be repeated as a neutral description of the population’s loyalties. Nor should the government’s reported totals of destruction be treated as an independent audit. The document reveals what the persecuting state wanted to justify.'}
      ],note:'845 marks the major suppression, not the first restriction on Buddhism. Conflicting transmitted clergy totals are deliberately omitted.',
      sources:['https://afe.easia.columbia.edu/main_pop/ps/ps_china-emperor-wuzong-suppress-buddhism.htm','https://www.medievalworlds.net/0xc1aa5576_0x003a528a.pdf']},
    {id:'huang-chao',name:'Huang Chao takes Chang’an',nameZh:'黄巢攻入长安',han:'城',start:881,end:881,
      description:'Huang Chao’s forces entered the capital at the beginning of 881. The occupation, interrupted by renewed fighting, lasted until 883. Warfare damaged the farming that sustained urban life; famine joined direct violence in the city’s suffering.',
      sections:[
        {title:'A palace was not a state',text:'Possession of Chang’an offered a powerful claim to sovereignty. Maintaining a government required different capacities: feeding inhabitants, securing the countryside and sustaining dependable armed support. The contrast helps explain why taking the capital did not create a durable successor regime. A political symbol could be captured more readily than the relationships that kept it functioning.'},
        {title:'Keep the aftermath open',text:'Tang survived until 907. Reading the occupation only as a rehearsal for that ending hides the uncertainty faced by those who lived through it. It also shifts attention away from the immediate destruction of livelihoods toward a dynastic outcome still decades in the future.'}
      ],note:'Use 881 CE. Accounts assigning the capture to 880 often follow the twelfth lunar month of the first Guangming regnal year.',
      sources:[military,'https://en.wikipedia.org/wiki/Huang_Chao_Rebellion']},
    {id:'tang-end',name:'Tang gives way to Later Liang',nameZh:'唐朝灭亡',han:'终',start:907,end:907,
      description:'Zhu Wen established Later Liang in 907 and inaugurated the northern Five Dynasties sequence. He had moved from Huang Chao’s rebellion into Tang military service before claiming the imperial position himself.',
      sections:[
        {title:'Power outlasted allegiance',text:'Zhu Wen’s career connects categories often kept separate: rebel, imperial servant and dynastic founder. Command of armed forces could survive a change of political loyalty and eventually support a claim to the throne. The end of Tang formalized a redistribution of regional power that had already been underway.'},
        {title:'Different regions, different histories',text:'Frequent changes of northern courts did not impose an identical experience on every southern kingdom. Some southern regimes endured longer and supported substantial prosperity. “China fell into chaos” erases those differences. The Five Dynasties and Ten Kingdoms describe overlapping regional histories, not fifteen successive governments of a single unified territory.'}
      ],note:'907 CE. The date is a dynastic transition, not the disappearance of every Tang institution or cultural practice.',
      sources:['https://www.cambridge.org/core/books/abs/cambridge-history-of-china/founding-and-consolidation-of-the-sung-dynasty-under-taitsu960976-taitsung976997-and-chentsung9971022/69C8668AF27659D52EBF293C0412504C','https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf']}
  ].map(item=>({...item,source:item.sources[0],color:'#9e3c2e',label:false,ribbon:true,parent:'tang'}));
  const revisions={
    tang:{description:'Tang power depended on more than a brilliant court. Armies, taxation, aristocratic connections, religious institutions and long-distance exchange helped make the empire governable. Their relationship changed profoundly over its three centuries.',
      sections:[
        {title:'A capital connected to a wider world',text:'Chang’an’s cultural range was sustained by movement: people, objects and religious knowledge crossed political frontiers. The court could sponsor these exchanges, but it did not create or control all of them. Xuanzang’s translation work and the contacts that continued after Talas reveal how imperial ambition intersected with networks extending beyond imperial command.'},
        {title:'Survival through reconstruction',text:'After the An Lushan Rebellion, the restored dynasty governed through altered military and fiscal arrangements. Those changes constrained the court, but they also made continued government possible. The resulting history includes artistic achievement and administrative adaptation alongside conflict. Treating 755 as the beginning of an inevitable collapse mistakes knowledge of the ending for an explanation of the intervening century and a half.'}
      ],sources:[met,military,finance],related:['xuanwu-gate','xuanzang-return','wu-zhou','talas','an-lushan','two-tax','huichang','sutra','huang-chao','tang-end']},
    'an-lushan':{description:'An Lushan’s revolt began in December 755 and became a prolonged civil war. Tang forces ultimately prevailed, but victory did not restore the old distribution of authority between the court and the provinces.',
      sections:[
        {title:'The means of survival changed the state',text:'David Graff’s research emphasizes that military commands multiplied during the crisis; many were created for loyalist defense. Provincial military power was therefore also a product of saving the dynasty. The court’s need for soldiers and dependable revenue helped entrench arrangements it could not simply reverse once the main rebellion was defeated.'},
        {title:'After catastrophe, adaptation',text:'Fiscal reconstruction increasingly drew on commercial and consumption revenues, while the restored dynasty sustained major cultural production. The An Lushan Rebellion is a turning point, but the next century and a half should not be reduced to decline. The difficult historical question is how a government could endure through changes that also limited its freedom of action.'}
      ],note:'755–763 CE. Tax-register losses cannot be read directly as a death toll. This card avoids casualty totals whose apparent precision exceeds the evidence.',sources:[military,finance,met],related:['two-tax','huichang','huang-chao']},
    'wu-zhou':{nameZh:'武则天称帝',description:'Wu Zetian assumed the imperial title in 690 and founded her own Zhou dynasty. To retain power, she needed officials, information and credible forms of authority, as well as an extraordinary breach with established succession conventions.',
      sections:[
        {title:'Recruitment was political',text:'Expanded examination recruitment challenged established court networks and advanced men dependent on her patronage. N. Harry Rothschild nevertheless stresses the limits of a simple meritocratic interpretation: Wu also promoted relatives and cultivated aristocratic credentials. Administrative opening and dynastic self-interest worked together.'},
        {title:'Access to power shaped culture',text:'Xiaofei Tian connects Wu’s court patronage and the frustrations of obtaining access to the development of new poetic communities. That argument directs attention from an exceptional individual to the relationships around her. Her position as a woman emperor is historically fundamental; it is the beginning of an inquiry into how her government operated, rather than a sufficient explanation of it.'}
      ],sources:['https://www.cambridge.org/core/books/abs/world-of-wu-zhao/culture-of-the-court/4BDB160D0EFA4EE75BFE058BAB896064','https://xtian.scholars.harvard.edu/publications/poetry-and-access-power-court-empress-wu-zetian-624%E2%80%93705'],related:['xuanwu-gate','xuanzang-return']},
    sutra:{nameZh:'金刚经刊印',description:'The dated Diamond Sutra scroll of 868 connects a major technology with an intimate purpose. Its dedication identifies Wang Jie as the sponsor and presents the work as an act for his parents’ benefit and wider distribution.',
      sections:[
        {title:'Why make many copies?',text:'Printing belongs here within religious practice and patronage. Reproducing a scripture could extend its circulation and accumulate merit; the dedication places technical work inside a moral relationship between a donor, his family and other readers. Innovation becomes more intelligible when the incentives to use it are examined alongside the technique itself.'},
        {title:'Survival is not invention',text:'A securely dated surviving object is evidence that printing was established by that time, not proof that it began then. The scroll’s significance comes from the conjunction of a text, a material technique and a named act of sponsorship. Its survival gives a precise point of access to a much larger history of reproduction and devotion.'}
      ],sources:['https://idp.bl.uk/wp-content/uploads/2023/08/IDPNews38.pdf'],related:['xuanzang-return','huichang']}
  };
  const sourceLabels={
    [military]:'David Graff · The Reach of the Military: Tang',
    [finance]:'Cambridge Economic History · Public Finance',
    [met]:'The Met · Tang art and history',
    'https://brill.com/display/book/edcoll/9789004206236/Bej.9789004206229.i-444_009.pdf':'Isenbike Togan · Court Historiography in Early Tang China',
    'https://depts.washington.edu/silkroad/lectures/wulec2.html':'Daniel Waugh · Xuanzang and the Silk Roads',
    'https://iep.utm.edu/xuanzang/':'Internet Encyclopedia of Philosophy · Xuanzang',
    'https://www.iranicaonline.org/articles/chinese-iranian-ii/':'Encyclopaedia Iranica · Chinese-Iranian relations',
    'https://doi.org/10.1017/9780511998492.002':'John Chaffee · Merchants of an Imperial Trade',
    'https://www.iranicaonline.org/articles/paper-and-papermaking/':'Encyclopaedia Iranica · Paper and papermaking',
    'https://afe.easia.columbia.edu/ps/cup/tang_tax_debate.pdf':'Primary texts · The Two-Tax debate',
    'https://afe.easia.columbia.edu/main_pop/ps/ps_china-emperor-wuzong-suppress-buddhism.htm':'Primary text · Wuzong’s suppression edict',
    'https://www.medievalworlds.net/0xc1aa5576_0x003a528a.pdf':'Antonello Palumbo · Exemption not Granted',
    'https://www.cambridge.org/core/books/abs/cambridge-history-of-china/founding-and-consolidation-of-the-sung-dynasty-under-taitsu960976-taitsung976997-and-chentsung9971022/69C8668AF27659D52EBF293C0412504C':'Cambridge History of China · From division to Song',
    'https://assets.cambridge.org/97805218/12481/excerpt/9780521812481_excerpt.pdf':'Cambridge chronology · Regional regimes',
    'https://www.cambridge.org/core/books/abs/world-of-wu-zhao/culture-of-the-court/4BDB160D0EFA4EE75BFE058BAB896064':'N. Harry Rothschild · The Culture of the Court',
    'https://xtian.scholars.harvard.edu/publications/poetry-and-access-power-court-empress-wu-zetian-624%E2%80%93705':'Xiaofei Tian · Poetry and Access to Power',
    'https://idp.bl.uk/wp-content/uploads/2023/08/IDPNews38.pdf':'British Library / IDP · The Diamond Sutra'
  };
  for(const item of [...events,...Object.values(revisions)])item.sourceLabels=sourceLabels;
  return {events,revisions};
})();
if(typeof module!=='undefined')module.exports=TANG_RESEARCH;
