// Source-checked expansions of subjects already present in the workbook.
const RESEARCH_REVISIONS = {
  'catalog-E_QING_TAIPING': {
    name:'Taiping Rebellion',nameZh:'太平天国运动',han:'乱',start:1850,end:1864,
    category:'event',kind:'event',parent:'qing',ribbon:true,label:false,markerOffset:44,
    evidence:'Curated entry',
    description:'Hong Xiuquan’s religious movement grew into a civil war against the Qing. Claiming to be Jesus’s younger brother, Hong proclaimed a Heavenly Kingdom; his forces captured Nanjing in 1853 and made it their capital. Qing armies retook the city in 1864, ending the principal Taiping regime after catastrophic destruction across much of southern and central China.',
    sections:[
      {title:'A rival social and sacred order',text:'Economic distress and local conflict helped the movement recruit, but its ambitions extended beyond relief from hardship. Taiping leaders challenged Manchu rule and established a religious state with radical prescriptions for property and social life. Proclaimed equality coexisted with hierarchy and violent struggles within the leadership. Their programme must therefore be distinguished from both its uneven implementation and the experiences of people living under wartime rule.'},
      {title:'Saving the dynasty changed its foundations',text:'The court relied increasingly on regional armies raised by officials such as Zeng Guofan, drawing on local recruitment and finance. These forces helped defeat the Taiping where established imperial troops had struggled. Survival strengthened the importance of provincial officials and their military networks. This was an adaptation within Qing government, rather than a simple disappearance of central authority; the bargain restored order while changing how the dynasty mobilized power.'}
    ],
    note:'1850–1864 follows the broader conflict; 1851 marks the formal proclamation at Jintian. Resistance continued after Nanjing fell. Death totals are highly uncertain and include famine and disease as well as direct violence. The workbook recorded only 1850.',
    catalogDates:{start:1850,end:1850},
    sources:['https://www.history.com/articles/taiping-rebellion','https://www.cambridge.org/core/journals/journal-of-institutional-economics/article/last-guardian-of-the-throne-the-regional-army-in-the-late-qing-dynasty/BA85E0DB84C8174D815F9DC2E59A635E'],
    sourceLabels:{'https://www.history.com/articles/taiping-rebellion':'HISTORY · Taiping Rebellion','https://www.cambridge.org/core/journals/journal-of-institutional-economics/article/last-guardian-of-the-throne-the-regional-army-in-the-late-qing-dynasty/BA85E0DB84C8174D815F9DC2E59A635E':'Journal of Institutional Economics · Regional armies and Qing survival'},
    related:['qing','catalog-E_QING_OPIUM2','catalog-E_QING_SSM']
  },
  'catalog-E_QING_BOXER': {
    name:'Boxer Rebellion',nameZh:'义和团运动',han:'乱',start:1899,end:1901,
    category:'event',kind:'event',parent:'qing',ribbon:true,label:false,markerOffset:-44,
    evidence:'Curated entry',
    description:'An anti-foreign and anti-Christian movement spread through northern China, drawing on martial and ritual practices. Boxers attacked missionaries and Chinese Christians. In 1900, support from the Qing court helped turn the crisis into war with foreign powers; an eight-nation force reached Beijing, relieved the besieged legations and occupied the capital.',
    sections:[
      {title:'Local grievances, divided authority',text:'Foreign privileges and missionary protection of converts made village disputes part of a wider struggle over authority. Drought and insecurity intensified tensions. Yet neither the movement nor the Qing government acted as a single bloc: some officials suppressed the Boxers, while others supported them. Chinese Christians were central targets of violence. Treating the conflict only as China confronting the West obscures these divisions within Chinese society.'},
      {title:'Intervention and the price of survival',text:'Foreign forces carried out looting and punitive expeditions as the court fled Beijing. The 1901 Boxer Protocol imposed a large indemnity and permitted foreign troops at strategic points. The dynasty survived, but on terms that further constrained its finances and security. The episode exposed the danger of the court’s attempt to harness popular militancy: it could not reliably control either the movement or the international response.'}
    ],
    note:'1899–1901 includes the movement’s expansion and the final protocol; 1900 marks the main siege and intervention. Earlier roots predate 1899. The workbook’s single year, 1900, is retained below as its convention.',
    catalogDates:{start:1900,end:1900},
    sources:['https://www.nam.ac.uk/explore/boxer-rebellion','https://www.history.navy.mil/research/library/online-reading-room/title-list-alphabetically/b/boxer-rebellion-usnavy-1900-1901.html'],
    sourceLabels:{'https://www.nam.ac.uk/explore/boxer-rebellion':'National Army Museum · Boxer Rebellion','https://www.history.navy.mil/research/library/online-reading-room/title-list-alphabetically/b/boxer-rebellion-usnavy-1900-1901.html':'U.S. Naval History and Heritage Command · Boxer crisis'},
    related:['qing','catalog-E_QING_OPIUM2','abdication']
  },
  'catalog-E_QING_OPIUM': {
    name:'First Opium War',nameZh:'第一次鸦片战争',han:'战',start:1839,end:1842,
    category:'event',kind:'event',parent:'qing',ribbon:true,label:false,markerOffset:22,
    evidence:'Curated entry',
    description:'Qing commissioner Lin Zexu’s suppression of the illegal opium trade in 1839 precipitated a conflict with Britain. British naval and land forces, including troops from India, attacked coastal and river positions. The war ended with the Treaty of Nanking in 1842, after British forces advanced along the Yangtze toward Nanjing.',
    sections:[
      {title:'A trade sustained by empire',text:'Opium grown in British India helped merchants finance purchases of Chinese tea. Qing suppression therefore challenged a commercial circuit linking Indian production, Chinese consumption and British demand. The dispute concerned addiction and illicit imports, but also who could regulate trade. Britain’s military intervention converted the defence of commercial interests into demands for wider access to Chinese markets.'},
      {title:'Defeat became a treaty system',text:'The settlement opened five ports, imposed payments and ceded Hong Kong Island to Britain. Additional agreements subsequently restricted Qing jurisdiction over foreigners. These concessions turned military superiority into continuing legal and commercial privileges. China remained under Qing rule, but the government’s freedom to control foreign activity was narrowed. Territorial conquest was only one means of exercising imperial power.'}
    ],
    note:'1839–1842 includes the initial clashes; 1840–1842 is also used for the main expedition. The 1842 treaty did not itself legalize opium or establish all later foreign privileges. The workbook recorded only the starting year.',
    catalogDates:{start:1839,end:1839},
    sources:['https://www.nam.ac.uk/explore/first-china-war-1839-1842','https://history.state.gov/milestones/1830-1860/china-1'],
    sourceLabels:{'https://www.nam.ac.uk/explore/first-china-war-1839-1842':'National Army Museum · First China War','https://history.state.gov/milestones/1830-1860/china-1':'U.S. Office of the Historian · Opium War and treaty system'},
    related:['qing','nanking','catalog-E_QING_OPIUM2']
  },
  'catalog-E_QING_OPIUM2': {
    name:'Second Opium War',nameZh:'第二次鸦片战争',han:'战',start:1856,end:1860,
    category:'event',kind:'event',parent:'qing',ribbon:true,label:false,markerOffset:-22,
    evidence:'Curated entry',
    description:'Britain and France waged a second war to extract wider commercial and diplomatic concessions from the Qing. The Arrow incident at Canton in 1856 supplied Britain’s immediate pretext; France invoked the execution of a missionary. Fighting culminated in the allied occupation of Beijing in 1860 and the looting of the Old Summer Palace, which British troops then burned.',
    sections:[
      {title:'From ports to the imperial court',text:'The 1858 Treaties of Tianjin provided for additional ports and foreign diplomatic representation in Beijing. Renewed fighting over implementation ended in the 1860 Conventions of Beijing. The sequence shows how treaty making and military coercion reinforced each other: agreements produced new demands for access, and resistance to carrying them out became grounds for further intervention.'},
      {title:'Sovereignty under overlapping pressures',text:'The new settlement expanded foreign privileges and indemnities; associated trade arrangements legalized opium imports. These pressures arrived while the Qing was also fighting the Taiping civil war. Foreign coercion and domestic rebellion placed different demands on the same government. Defeat did not end Qing rule, but made recovery depend on managing external powers while rebuilding military and fiscal capacity at home.'}
    ],
    note:'1856–1860 covers distinct campaigns and negotiations, rather than uninterrupted fighting. The Old Summer Palace was Yuanmingyuan, not the Forbidden City. The workbook recorded only the starting year.',
    catalogDates:{start:1856,end:1856},
    sources:['https://www.nam.ac.uk/explore/second-china-war','https://history.state.gov/milestones/1830-1860/china-1'],
    sourceLabels:{'https://www.nam.ac.uk/explore/second-china-war':'National Army Museum · Second China War','https://history.state.gov/milestones/1830-1860/china-1':'U.S. Office of the Historian · Opium War and treaty system'},
    related:['qing','catalog-E_QING_OPIUM','catalog-E_QING_TAIPING','catalog-E_QING_SSM']
  },
  'catalog-C_BEIJING_MING': {
    name:'Beijing becomes the Ming capital',nameZh:'永乐迁都北京',han:'京',start:1421,end:1421,
    image:{
      src:'https://upload.wikimedia.org/wikipedia/commons/a/a7/Forbidden_City_Beijing_Shenwumen_Gate.JPG',
      alt:'The Forbidden City’s north gate, with red walls, golden tiled roofs and visitors in the foreground.',
      caption:'The Forbidden City’s north gate, photographed in 2006. The surviving palace reflects centuries of rebuilding after the Ming capital moved here.',
      credit:'Kallgan · Wikimedia Commons',source:'https://commons.wikimedia.org/wiki/File:Forbidden_City_Beijing_Shenwumen_Gate.JPG',
      license:'CC BY-SA 3.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/3.0/'
    },
    category:'event',kind:'event',parent:'ming',ribbon:true,label:false,markerOffset:20,
    evidence:'Curated entry',
    description:'In 1421 the Yongle Emperor transferred the Ming court from Nanjing to Beijing, his former power base. The Forbidden City had been completed in 1420. Nanjing retained the status of secondary capital and a parallel set of government offices: the move redistributed authority within the empire without erasing its southern centre.',
    sections:[
      {title:'A capital facing the frontier',text:'Beijing placed the court close to the northern military frontier and the Mongol powers beyond it. For an emperor who had seized the throne in civil war, it also made his own regional base the centre of dynastic government. The choice reveals how a capital could serve military strategy and a ruler’s political security together. Geography helped sustain a particular settlement of power.'},
      {title:'Northern power, southern grain',text:'The court’s location did not move the empire’s productive resources north with it. Feeding the capital and its soldiers required grain transported from the south, making the restored Grand Canal and its storage and shipping arrangements essential to government. This created a durable dependence: political authority concentrated near the frontier, while the labour and harvests supporting it were gathered far away. The canal tied that separation together.'}
    ],
    note:'1421 marks the transfer of the court. The workbook’s 1420 date refers to the preceding capital designation and palace completion. Beijing had already been a capital under earlier dynasties, notably the Yuan; this entry marks its adoption as the principal Ming capital.',
    catalogDates:{start:1420,end:1420},
    sources:['https://capitalmuseum.org.cn/exhibition/c6c19ad37dc64b829b9d7f5a4c36a66b','https://en.wikipedia.org/wiki/Yongle_Emperor'],
    sourceLabels:{'https://capitalmuseum.org.cn/exhibition/c6c19ad37dc64b829b9d7f5a4c36a66b':'Capital Museum · Beijing’s history','https://en.wikipedia.org/wiki/Yongle_Emperor':'Yongle Emperor · capital relocation and supply'},
    related:['ming','sui-grand-canal','catalog-C_BEIJING_YUAN']
  }
};
if(typeof module!=='undefined')module.exports=RESEARCH_REVISIONS;
