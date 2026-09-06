/* Supplemental, source-checked exhibition data. Original workbook and JSON remain untouched.
 * Negative years are BCE. ranges controls the ribbon; start/end controls the historical card.
 * An offset creates a separate concurrent lane. A hidden label remains available in Browse all.
 */
const HISTORY = (() => {
  const wiki = slug => `https://en.wikipedia.org/wiki/${slug}`;
  const period = (id,name,han,start,end,color,description,slug,extra={}) => ({id,name,han,start,end,color,description,source:wiki(slug),kind:'period',...extra});
  const periods = [
    period('xia','Xia','夏',-2070,-1600,'#b39c73','The first dynasty in the traditional Chinese historical account. Archaeology reveals complex Bronze Age societies, but their identification with Xia remains debated.','Xia_dynasty',{approx:true,note:'Traditional dates, c. 2070–c. 1600 BCE. No contemporary written evidence securely identifies a Xia dynasty.'}),
    period('shang','Shang','商',-1600,-1046,'#758879','Bronze casting, royal ritual and the earliest securely attested Chinese writing flourished under Shang. Inscribed oracle bones preserve questions put to royal ancestors.','Shang_dynasty',{approx:true,note:'Approximate chronology. Dates before 841 BCE remain provisional.'}),
    period('western-zhou','Western Zhou','周',-1046,-771,'#9b8253','After defeating Shang, Zhou rulers governed through a network of allied and related houses. The idea of the Mandate of Heaven helped explain the right to rule.','Western_Zhou',{approx:true,note:'The founding date is approximate. The royal capital fell in 771 BCE.'}),
    period('eastern-zhou','Eastern Zhou','周',-770,-256,'#ad955f','Royal authority weakened as regional states competed. The Spring and Autumn and Warring States periods brought political experimentation and influential schools of thought.','Eastern_Zhou',{note:'The Zhou royal dynasty ended in 256 BCE. The Warring States period continued until 221 BCE.'}),
    period('late-warring','Late Warring States','战',-256,-221,'#8a764a','After the end of the Zhou royal house, rival kingdoms continued to contend for power until Qin completed its conquests.','Warring_States_period',{label:false}),
    period('qin','Qin','秦',-221,-206,'#454d48','Qin Shi Huang united the rival states under an imperial government. Standardized administration, weights, measures and script helped bind the empire together.','Qin_dynasty',{note:'The ruler surrendered in 207 BCE; the dynasty is conventionally dated to 206 BCE.'}),
    period('han','Han','汉',-206,220,'#a54d3d','Han government shaped the imperial institutions of later centuries. Expansion and exchange linked the court to Central Asia, while scholarship consolidated a lasting classical tradition.','Han_dynasty',{ranges:[[-206,9],[25,220]],note:'206 BCE marks Liu Bang’s kingship; 202 BCE marks his imperial accession. Xin interrupted Han rule in 9–23 CE; Eastern Han began in 25.'}),
    period('xin','Xin','新',9,23,'#665b70','Wang Mang displaced the Han court and attempted far-reaching reforms. Rebellion and political collapse ended his brief dynasty.','Xin_dynasty',{label:false}),
    period('division','Age of division','分',220,581,'#828775','Competing courts ruled different regions. The Three Kingdoms, Jin and the Northern and Southern dynasties belong to this complex era of warfare, migration and cultural exchange.','Six_Dynasties',{note:'An editorial umbrella, not one dynasty. Division continued in the south until Sui reunification in 589. Selected courts appear on parallel lines.'}),
    period('sui','Sui','隋',581,618,'#607969','The Sui court reunited north and south in 589. Major canal works connected economic regions, but costly campaigns and rebellion brought its rule to an end.','Sui_dynasty',{note:'Founded in 581; reunification in 589. A remnant court lasted until 619.'}),
    period('tang','Tang','唐',618,907,'#ae5941','Tang China was a center of poetry, trade and religious exchange. Chang’an drew people and ideas from across Asia. Powerful regional governors later challenged the court.','Tang_dynasty',{ranges:[[618,690],[705,907]],note:'Tang rule was interrupted by Wu Zetian’s Zhou dynasty from 690 to 705.'}),
    period('wu-zhou','Wu Zhou','武',690,705,'#7a6375','Wu Zetian proclaimed a new Zhou dynasty and ruled as emperor. Her government retained much of the Tang state while changing the court’s political order.','Wu_Zetian',{label:false}),
    period('five-dynasties','Five Dynasties','五',907,960,'#8c7b68','Five short-lived dynasties succeeded each other in the north as independent kingdoms governed much of the south. Song gradually reunited many of these territories.','Five_Dynasties_and_Ten_Kingdoms_period',{note:'The northern succession runs 907–960. The broader Ten Kingdoms period conventionally extends to 979.'}),
    period('song','Song','宋',960,1279,'#567f7c','Commercial cities, scholarship, painting and technological change flourished. Song coexisted with powerful neighbors and shifted its court south after the loss of Kaifeng.','Song_dynasty',{note:'Northern Song: 960–1127. Southern Song: 1127–1279. Liao, Western Xia, Jin and early Yuan ruled concurrently.'}),
    period('yuan','Yuan','元',1271,1368,'#667687','Kublai Khan proclaimed the Yuan dynasty in 1271. The Mongol conquest of Southern Song in 1279 brought its territories into a vast network of Eurasian exchange.','Yuan_dynasty',{ranges:[[1279,1368]],note:'Founded in 1271, overlapping Southern Song until 1279. The main ribbon changes in 1279; the earlier eight years appear on a parallel line.'}),
    period('ming','Ming','明',1368,1644,'#ac724f','Ming rulers rebuilt imperial institutions after Yuan rule. Maritime expeditions, expanding commerce and major architectural projects shaped the period.','Ming_dynasty',{note:'The Beijing court fell in 1644. Southern Ming loyalist courts continued until 1662.'}),
    period('qing','Qing','清',1636,1912,'#4f7166','Founded by Manchu rulers, Qing became a vast multiethnic empire. Its later decades brought internal rebellion, foreign wars and attempts at institutional reform.','Qing_dynasty',{ranges:[[1644,1912]],note:'The Qing name dates to 1636; Beijing was taken in 1644. The earlier overlap with Ming appears on a parallel line.'}),
    period('republic','Republic of China (mainland period)','民',1912,1949,'#747f91','The Republic was founded in 1912. Its early decades included warlord rule, war with Japan and civil war. The government relocated to Taiwan in 1949, where it continues.','Republic_of_China_(1912–1949)',{ranges:[[1912,1949]],note:'This main period covers mainland rule, 1912–1949. The ROC government continued in Taiwan, shown separately.'}),
    period('prc','People’s Republic','共',1949,2026,'#974c3e','The People’s Republic of China was proclaimed in 1949. Its history encompasses sweeping political and social campaigns, economic reforms and rapid urban change.','History_of_the_People%27s_Republic_of_China',{note:'1949–present. The drawing stops at the atlas horizon of 2026.'})
  ];
  const state=(id,name,han,start,end,color,description,slug,offset,extra={})=>period(id,name,han,start,end,color,description,slug,{kind:'concurrent',offset,...extra});
  const states=[
    state('three-kingdoms','Three Kingdoms','三',220,280,'#758477','Wei, Shu and Wu competed for supremacy after the collapse of Han. Jin replaced Wei in 266 and conquered Wu in 280.','Three_Kingdoms',-44,{label:false}),
    state('jin-early','Jin','晋',266,420,'#667761','Western Jin briefly unified the country in 280. After the loss of the north, Eastern Jin ruled from Jiankang in the south.','Jin_dynasty_(266–420)',-28,{note:'Founded in February 266. Western Jin: 266–316; Eastern Jin: 317–420.'}),
    state('sixteen','Sixteen Kingdoms','国',304,439,'#9a7b60','Numerous states governed northern China while Eastern Jin held the south. Northern Wei ultimately unified the north in 439.','Sixteen_Kingdoms',44),
    state('north-south','Northern & Southern','南北',420,589,'#7c7486','Northern and southern courts coexisted through a period of Buddhist patronage, migration and changing political identities.','Northern_and_Southern_dynasties',28,{label:false,note:'Conventionally dated 420–589, overlapping Sui’s founding in 581.'}),
    state('liao','Liao','辽',916,1125,'#8d7359','The Khitan-led Liao empire governed territories across northern China and Inner Asia. It coexisted with Song and maintained a distinct political order.','Liao_dynasty',-28,{note:'916 marks the imperial founding. Some timelines use 907 for the beginning of Khitan leadership under Abaoji.'}),
    state('western-xia','Western Xia','夏',1038,1227,'#a58852','The Tangut-led Western Xia state controlled important routes in the northwest and developed its own written language.','Western_Xia',28),
    state('jurchen-jin','Jin (Jurchen)','金',1115,1234,'#7c6778','The Jurchen Jin defeated Liao and took the Song capital in 1127. It ruled much of northern China while Southern Song continued in the south.','Jin_dynasty_(1115–1234)',-44),
    state('early-yuan','Yuan foundation','元',1271,1279,'#667687','Kublai Khan adopted the dynastic name Yuan in 1271. Southern Song continued until its defeat in 1279.','Yuan_dynasty',-28,{label:false}),
    state('early-qing','Early Qing','清',1636,1644,'#4f7166','Hong Taiji proclaimed the Qing dynasty in 1636. Ming still held Beijing until 1644.','Qing_dynasty',-28,{label:false}),
    state('southern-ming','Southern Ming','明',1644,1662,'#ac724f','Ming loyalist courts continued in southern China after the fall of Beijing. The last emperor was executed in 1662.','Southern_Ming',28,{label:false}),
    state('roc-taiwan','ROC in Taiwan','民',1949,2026,'#747f91','The Republic of China government relocated to Taiwan in 1949 and continues to govern there.','History_of_Taiwan_(1945–present)',28,{label:false,note:'The endpoint is the atlas horizon, 2026. It does not imply that this government ended.'})
  ];
  const event=(id,name,han,start,description,slug,extra={})=>({id,name,han,start,end:start,color:'#9e3c2e',description,source:wiki(slug),kind:'event',...extra});
  const events=[
    event('oracle','Oracle-bone writing','文',-1250,'Inscribed oracle bones from late Shang preserve divination records and the earliest securely attested form of Chinese writing.','Oracle_bone_script',{approx:true}),
    event('confucius','Confucius is born','孔',-551,'The teacher later known as Confucius developed ideas about ethical conduct, education and government that shaped East Asian intellectual life.','Confucius',{note:'551 BCE is the traditional birth year.'}),
    event('unification','Qin unifies the states','统',-221,'The conquest of Qi completed Qin’s defeat of the rival kingdoms. Ying Zheng took the title First Emperor.','Qin%27s_wars_of_unification'),
    event('paper','Papermaking advances','纸',105,'Cai Lun is traditionally credited with improving the materials and process of papermaking, and reporting his method to the imperial court in 105.','Cai_Lun',{note:'Paper existed earlier. This marks a credited improvement, not its first invention.'}),
    event('reunification','Sui reunites China','合',589,'Sui conquered the southern Chen dynasty and reunited north and south after centuries of competing rule.','Sui_dynasty'),
    event('an-lushan','An Lushan Rebellion','乱',755,'A rebellion by the general An Lushan became a prolonged civil war. Tang forces eventually prevailed, but the conflict devastated communities and weakened the court’s authority.','An_Lushan_Rebellion',{end:763,note:'16 December 755–17 February 763. Rebels took Luoyang in 756. Casualty estimates are uncertain.'}),
    event('sutra','The Diamond Sutra','经',868,'A dated woodblock-printed scroll of the Diamond Sutra survives from 868. Its colophon records a dedication by Wang Jie for the benefit of all.','Diamond_Sutra',{note:'An exceptionally early dated printed book. Printing itself predates this scroll.'}),
    event('chanyuan','Treaty of Chanyuan','盟',1005,'Song and Liao reached a settlement after a Liao campaign. The agreement formalized relations and helped sustain a long period of peace between them.','Chanyuan_Treaty',{label:false}),
    event('jingkang','The fall of Kaifeng','变',1127,'Jin forces captured the Song capital and took the emperors Huizong and Qinzong north. The surviving Song court re-established itself in the south.','Jingkang_incident'),
    event('zheng-he','Zheng He sets sail','航',1405,'The first of Zheng He’s state-sponsored voyages departed under the Yongle emperor. Subsequent expeditions reached ports across the Indian Ocean.','Ming_treasure_voyages'),
    event('nanking','Treaty of Nanking','约',1842,'The treaty ended the First Opium War. It opened five treaty ports to British trade and ceded Hong Kong Island to Britain.','Treaty_of_Nanking'),
    event('abdication','The emperor abdicates','终',1912,'The abdication of the Qing emperor Puyi ended the imperial dynasty as the Republic of China emerged.','Abdication_of_the_Qing_emperor',{label:false})
  ];
  // The main route names the successive periods; concurrent endings stay on side lanes.
  const promoted = states.filter(item=>['three-kingdoms','jin-early','north-south'].includes(item.id))
    .map(item=>({...item,kind:'period',label:true,offset:0,
      ranges:item.id==='three-kingdoms'?[[220,266]]:item.id==='north-south'?[[420,581]]:[[266,420]]}));
  const displayPeriods=[...periods.filter(item=>item.id!=='division'),...promoted].sort((a,b)=>a.start-b.start);
  const displayStates=[
    ...states.filter(item=>!promoted.some(period=>period.id===item.id)),
    {...states.find(item=>item.id==='three-kingdoms'),start:266,label:false},
    {...states.find(item=>item.id==='north-south'),start:581,label:false}
  ];
  const all=[...periods,...states,...events].map(item=>promoted.find(period=>period.id===item.id)
    ||(item.id==='division'?{...item,catalogOnly:true,label:false}:item));
  return {periods:displayPeriods,states:displayStates,events,all,eras:[
    {name:'Xia, Shang & Western Zhou',nameZh:'夏商西周',pinyin:'xià shāng xī zhōu',year:-2070,itemId:'xia'},
    {name:'Spring and Autumn & Warring States',nameZh:'春秋战国',pinyin:'chūn qiū zhàn guó',year:-770,itemId:'eastern-zhou'},
    {name:'Qin & Han',nameZh:'秦汉',pinyin:'qín hàn',year:-221,itemId:'qin'},
    {name:'Three Kingdoms, Jin, Northern & Southern Dynasties',nameZh:'三国两晋南北朝',pinyin:'sān guó liǎng jìn nán běi cháo',year:220,itemId:'three-kingdoms'},
    {name:'Sui, Tang & Five Dynasties',nameZh:'隋唐五代',pinyin:'suí táng wǔ dài',year:581,itemId:'sui'},
    {name:'Liao, Song, Xia, Jin & Yuan',nameZh:'辽宋夏金元',pinyin:'liáo sòng xià jīn yuán',year:916,itemId:'liao'},
    {name:'Ming & Qing',nameZh:'明清',pinyin:'míng qīng',year:1368,itemId:'ming'},
    {name:'Republic of China · mainland period',nameZh:'民国（大陆时期）',pinyin:'mín guó (dà lù shí qī)',year:1912,itemId:'republic'},
    {name:'People’s Republic of China',nameZh:'中华人民共和国',pinyin:'zhōng huá rén mín gòng hé guó',year:1949,itemId:'prc'}
  ]};
})();
if(typeof module!=='undefined')module.exports=HISTORY;
