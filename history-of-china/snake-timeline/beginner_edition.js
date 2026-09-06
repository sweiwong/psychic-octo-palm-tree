/* Reader-facing copy is separate from the preserved research and date audit. */
// Explicit names avoid mistaking an event's Chinese title for a person's name.
const readerChineseNames = Object.fromEntries(`
Du Fu=杜甫
Wang Jie=王玠
Du Huan=杜环
Lu Zhi=陆贽
Zhang Wenjin=张文进
Abaoji=阿保机
Aguda=阿骨打
Fotudeng=佛图澄
Tanyao=昙曜
Duke of Zhou=周公
Jiajing=嘉靖
Li Bai=李白
Confucius=孔子
Yu the Great=大禹
Sun Tzu=孙子
Sunzi=孙子
Sun Wu=孙武
Wu Zetian=武则天
Wei Zhongxian=魏忠贤
Xi Jinping=习近平
Mao Zedong=毛泽东
Bi Sheng=毕升
Xuanzang=玄奘
Huang Chao=黄巢
Laozi=老子
Mozi=墨子
Mencius=孟子
Zhuangzi=庄子
Zhuang Zhou=庄周
Xunzi=荀子
Han Fei=韩非
Sima Qian=司马迁
Ban Zhao=班昭
Ban Gu=班固
Zhang Heng=张衡
Wang Xizhi=王羲之
Kumarajiva=鸠摩罗什
Tao Yuanming=陶渊明
Tao Qian=陶潜
Lu Yu=陆羽
Wang Anshi=王安石
Shen Kuo=沈括
Zhu Xi=朱熹
Wang Yangming=王阳明
Li Shizhen=李时珍
Lu Xun=鲁迅
Shang Yang=商鞅
Lord Shang=商君
Yue Fei=岳飞
Zhang Juzheng=张居正
Kangxi=康熙
Zhuge Liang=诸葛亮
Li Zicheng=李自成
Zheng He=郑和
Zhang Qian=张骞
An Lushan=安禄山
An Shigao=安世高
Bao Si=褒姒
Cai Lun=蔡伦
Cao Cao=曹操
Cao Pi=曹丕
Cao Xueqin=曹雪芹
Chai Rong=柴荣
Chen Baxian=陈霸先
Duke Huan of Qi=齐桓公
Duke Wen of Jin=晋文公
Emperor Wu=汉武帝
Emperor Yang=隋炀帝
Empress Dowager Cixi=慈禧太后
Empress Dowager Feng=冯太后
Empress Dowager Lou=娄太后
Fu Jian=苻坚
Guo Wei=郭威
Hong Taiji=皇太极
Hong Xiuquan=洪秀全
Hou Jing=侯景
Hua Guofeng=华国锋
Huan Kuan=桓宽
Kang Youwei=康有为
King Li=周厉王
King Ping=周平王
King Wu=周武王
King You=周幽王
Kublai Khan=忽必烈
Li Cunxu=李存勖
Li Deyu=李德裕
Li Hongzhang=李鸿章
Li Jiancheng=李建成
Li Shimin=李世民
Li Yu=李煜
Li Yuanhao=李元昊
Li Yuanji=李元吉
Liang Qichao=梁启超
Lin Zexu=林则徐
Liu Bang=刘邦
Liu Bei=刘备
Liu Hui=刘徽
Liu Xiu=刘秀
Liu Yu=刘裕
Liu Yuan=刘渊
Liu Zhiyuan=刘知远
Lord Chunshen=春申君
Ma Yin=马殷
Meng Zhixiang=孟知祥
Meng Chang=孟昶
Niu Sengru=牛僧孺
Shi Jingtang=石敬瑭
Shi Le=石勒
Sima Rui=司马睿
Sun Quan=孙权
Sun Yat-sen=孙中山
Wang Jian=王建
Wang Mang=王莽
Wang Zhen=王振
Wu Cheng’en=吴承恩
Wu Cheng'en=吴承恩
Wu Sangui=吴三桂
Xiao Daocheng=萧道成
Xiao Yan=萧衍
Yang Lian=杨涟
Yang Liwei=杨利伟
Yang Xingmi=杨行密
Yang Yan=杨炎
Yao Xing=姚兴
Ying Zheng=嬴政
Yuan Shikai=袁世凯
Yuwen Tai=宇文泰
Zeng Guofan=曾国藩
Zhang Jiao=张角
Zhang Zeduan=张择端
Zhao Gou=赵构
Zhao Kuangyin=赵匡胤
Zhou Enlai=周恩来
Zhu Wen=朱温
Zhu Yuanzhang=朱元璋
Puyi=溥仪
Cixi=慈禧
Yongle=永乐
Yongli=永历
Wanli=万历
Chongzhen=崇祯
Tianqi=天启
Zhengtong=正统
Qianlong=乾隆
Guangxu=光绪
Taizong=唐太宗
Xuanzong=唐玄宗
Xiaowen=孝文帝
Wuzong=唐武宗
Huizong=宋徽宗
Qinzong=宋钦宗
Shenzong=宋神宗
Gaozong=宋高宗
Anhui=安徽
Anyang=安阳
Beijing=北京
Chang’an=长安
Chang'an=长安
Changsha=长沙
Chengdu=成都
Dadu=大都
Dunhuang=敦煌
Fujian=福建
Guabu=瓜步
Guangdong=广东
Guangzhou=广州
Guodian=郭店
Hangzhou=杭州
Hexi=河西
Hexi Corridor=河西走廊
Guanzhong=关中
Wei River=渭河
Suzhou=苏州
Hong Kong=香港
Hunan=湖南
Jiankang=建康
Jiangnan=江南
Jiangling=江陵
Jingdezhen=景德镇
Kaifeng=开封
Luoyang=洛阳
Longmen=龙门
Mawangdui=马王堆
Nanjing=南京
Nanking=南京
Nanping=南平
Penghu=澎湖
Pingcheng=平城
Quanzhou=泉州
Shaanxi=陕西
Shandong=山东
Shanghai=上海
Shanhai Pass=山海关
Shantou=汕头
Shanxi=山西
Shenzhen=深圳
Sichuan=四川
Taiwan=台湾
Tiananmen=天安门
Tianjin=天津
Wuchang=武昌
Xiamen=厦门
Xinjiang=新疆
Yangtze=长江
Yangzi=长江
Yuanmingyuan=圆明园
Yungang=云冈
Zhengzhou=郑州
Zhuhai=珠海
Daodejing=道德经
Shiji=史记
Han Feizi=韩非子
Siku Quanshu=四库全书
Wujing Zongyao=武经总要
Xuanwu Gate=玄武门
Zhenguan=贞观
Kaiyuan=开元
Huichang=会昌
Xinhai=辛亥
Chanyuan=澶渊
`.trim().split('\n').map(line => line.split('=')));

function annotateReaderNames(text, cardId) {
  if (!text) return text;
  // The two emperors share an English title but belong to different dynasties.
  const names = {...readerChineseNames, 'Emperor Wen': cardId === 'sui-grand-canal' ? '隋文帝' : '宋文帝'};
  const pattern = new RegExp('\\b(' + Object.keys(names).sort((a, b) => b.length - a.length).map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\b', 'g');
  return text.replace(pattern, (name, match, offset) => {
    // Preserve existing annotations, including on a second application.
    if (/^\s*[（(][\u3400-\u9fff]/.test(text.slice(offset + name.length))) return name;
    return name + ' (' + names[name] + ')';
  });
}

function applyBeginnerEdition(exhibition, ...packs) {
  const removed = new Set(['taiwan-democratization']);
  const revisions = {};
  for (const pack of packs) for (const [id, revision] of Object.entries(pack.revisions || {})) {
    if (Object.hasOwn(revisions, id)) throw new Error('Duplicate editorial card: ' + id);
    revisions[id] = revision;
  }
  const allowed = new Set(['name', 'description', 'sections', 'note']);
  for (const [id, revision] of Object.entries(revisions)) {
    if (!exhibition.all.some(card => card.id === id)) throw new Error('Unknown editorial card: ' + id);
    for (const key of Object.keys(revision)) if (!allowed.has(key)) throw new Error('Editorial field is not copy: ' + id + '.' + key);
  }
  const all = exhibition.all.filter(card => !removed.has(card.id)).map(card => ({
    ...card,
    ...revisions[card.id],
    searchAliases: [...new Set([...(card.searchAliases || []), ...(revisions[card.id]?.name && revisions[card.id].name !== card.name ? [card.name] : [])])],
    related: (card.related || []).filter(id => !removed.has(id))
  })).map(card => ({
    ...card,
    name: annotateReaderNames(card.name, card.id),
    description: annotateReaderNames(card.description, card.id),
    sections: card.sections?.map(section => ({...section, title: annotateReaderNames(section.title, card.id), text: annotateReaderNames(section.text, card.id)})),
    ...(card.note !== undefined ? {note: annotateReaderNames(card.note, card.id)} : {}),
    searchAliases: [...new Set([...card.searchAliases, card.name])]
  }));
  // A thematic reading card uses the parent period for navigation, not as a founding date.
  const zhou = all.find(card => card.id === 'eastern-zhou');
  if (!all.some(card => card.id === 'confucianism-daoism')) all.push({
    id: 'confucianism-daoism', name: 'Confucianism and Daoism', nameZh: '儒家与道家', han: '道',
    kind: 'theme', category: 'culture', catalogOnly: true, showTimeline: false,
    start: zhou.start, end: zhou.end, dateLabel: 'Early China · Ideas and beliefs',
    parent: zhou.id, color: zhou.color, importance: 5, sourceIds: [],
    searchAliases: ['Confucius', 'Kongzi', 'Laozi', 'Taoism', 'Chinese philosophy'],
    description: 'How should we live when the world around us feels out of order? Early Chinese thinkers offered answers that people still debate. Two traditions grew especially influential: Confucianism and Daoism.',
    sections: [
      {title: 'Confucius: begin with how we treat each other', text: 'Confucius (孔子) connected good government with learning, care for others and the example set by rulers. Practising respect in everyday relationships could help build a better society. Later followers disagreed about how to put these ideas into practice.'},
      {title: 'Laozi: when does trying harder make things worse?', text: 'The Daodejing (道德经), associated with Laozi (老子), questions forceful control and needless striving. Its idea of wuwei (无为) invites us to act without forcing everything to fit our wishes. The book developed over time; Laozi’s identity and lifetime remain uncertain.'},
      {title: 'Keep exploring', text: 'These are starting points within two varied traditions. Neither began on a single known day. Open the individual cards below to meet Confucius, explore the Daodejing, and discover Zhuangzi’s questions about how we see the world.'}
    ],
    note: 'This is a thematic introduction, with Eastern Zhou used only to place it in the Early China collection. It does not mark the founding or full duration of either tradition. Daoism includes later religious traditions as well as the early writings introduced here.',
    sources: ['https://plato.stanford.edu/entries/confucius/', 'https://plato.stanford.edu/entries/laozi/'],
    sourceLabels: {'https://plato.stanford.edu/entries/confucius/': 'Stanford Encyclopedia of Philosophy · Confucius', 'https://plato.stanford.edu/entries/laozi/': 'Stanford Encyclopedia of Philosophy · Laozi'},
    related: ['confucius', 'laozi', 'zhuangzi']
  });
  for (const card of all) {
    if (card.kind === 'theme') {
      card.sections = card.sections.map(section => ({title: annotateReaderNames(section.title, card.id), text: annotateReaderNames(section.text, card.id)}));
      card.note = annotateReaderNames(card.note, card.id);
    }
    if (card.id === 'confucius') card.showTimeline = false;
    if (['an-lushan', 'sui-grand-canal', 'tang', 'song'].includes(card.id) && all.some(item => item.id === 'southward-economic-shift')) {
      card.related = [...new Set([...card.related, 'southward-economic-shift'])];
    }
    if (['eastern-zhou', 'catalog-SR_SA', 'catalog-SR_WS', 'confucius', 'laozi'].includes(card.id)) {
      card.related = [...new Set(['confucianism-daoism', ...card.related])];
    }
  }
  const significance = {};
  for (const pack of packs) for (const [id, entry] of Object.entries(pack.significance || {})) {
    if (Object.hasOwn(significance, id)) throw new Error('Duplicate significance card: ' + id);
    if (!all.some(card => card.id === id)) throw new Error('Unknown significance card: ' + id);
    if (!entry.text || !entry.sources?.length || entry.sources.some(source => !/^https:\/\//.test(source.url) || !source.label)) {
      throw new Error('Significance needs text and sources: ' + id);
    }
    significance[id] = entry;
  }
  for (const card of all) if (significance[card.id]) {
    card.significance = annotateReaderNames(significance[card.id].text, card.id);
    card.significanceSources = significance[card.id].sources.map(source => ({...source}));
  }
  // Drawing dates and interrupted ribbon ranges stay untouched. Only labels change.
  const drawing = items => items.filter(item => !removed.has(item.id)).map(item => revisions[item.id]?.name ? {...item, name: revisions[item.id].name} : item);
  return {...exhibition, all, periods: drawing(exhibition.periods), states: drawing(exhibition.states), events: drawing(exhibition.events).filter(item => item.id !== 'confucius')};
}
if (typeof module !== 'undefined') module.exports = applyBeginnerEdition;
