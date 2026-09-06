/* Merge research into searchable cards while keeping the designed overview selective.
 * Original IDs, date conventions and source arrays remain traceable through sourceMap.
 */
function expandHistory(core, catalog, additions = [], revisions = {}) {
  const matches = {
    R_XIA:'xia', R_SHANG:'shang', SR_ZHOU_W:'western-zhou', SR_ZHOU_E:'eastern-zhou',
    R_QIN:'qin', R_XIN:'xin', R_SUI:'sui', R_TANG:'tang', S_FIVE:'five-dynasties',
    R_YUAN:'yuan', R_MING:'ming', R_QING:'qing', R_ROC:'republic', R_PRC:'prc',
    S_3K:'three-kingdoms', S_SIXTEEN:'sixteen', S_NS:'north-south', R_LIAO:'liao',
    R_XIXIA:'western-xia', R_JIN:'jurchen-jin', E_SHANG_1:'oracle', F_CONF:'confucius',
    E_QIN_1:'unification', E_SUI_1:'reunification', E_TANG_1:'an-lushan',
    E_SONG_CHANYUAN:'chanyuan', E_SONG_JINGKANG:'jingkang'
  };
  const chinese = {
    R_XIA:'夏',E_XIA_1:'大禹建夏',F_XIA_1:'大禹',R_SHANG:'商',E_SHANG_1:'甲骨文',E_SHANG_2:'武王伐纣',
    R_ZHOU:'周',SR_ZHOU_W:'西周',SR_ZHOU_E:'东周',SR_SA:'春秋',SR_WS:'战国',F_CONF:'孔子',F_SUN:'孙子',G_ALEX:'亚历山大',
    S_QH:'秦汉',R_QIN:'秦',R_HAN_W:'西汉',R_XIN:'新',R_HAN_E:'东汉',E_QIN_1:'秦统一六国',E_QIN_2:'秦代标准化',
    E_HAN_1:'儒学与汉代政治',E_HAN_2:'丝绸之路',E_BUD_ENTRY:'佛教传入',C_QIN:'兵马俑',S_3K:'三国',R_WEI:'曹魏',R_SHU:'蜀汉',R_WU:'孙吴',
    E_3K_1:'汉朝终结',E_3K_2:'赤壁之战',R_JIN_W:'西晋',E_JIN_1:'西晋灭亡',E_BUD_SPREAD:'佛教传播',S_ST:'隋唐',R_SUI:'隋',R_TANG:'唐',
    E_SUI_1:'隋朝统一',E_TANG_1:'安史之乱',G_ISLAM:'伊斯兰教兴起',C_BEIJING_YUAN:'元大都',C_BEIJING_MING:'明代北京',C_BEIJING_QING:'清代北京',
    E_MING_EUNUCH_1:'明代宦官权力',E_MING_EUNUCH_2:'魏忠贤专权',E_QING_OPIUM:'第一次鸦片战争',E_QING_TAIPING:'太平天国运动',
    E_QING_OPIUM2:'第二次鸦片战争',E_QING_SSM:'洋务运动',E_QING_SJ:'甲午战争',E_QING_100D:'戊戌变法',E_QING_BOXER:'义和团运动',
    E_QING_1911:'辛亥革命',E_MOD_SEZ:'经济特区',E_MOD_BRI:'一带一路',E_MOD_XI:'习近平执政',S_MODERN:'现代中国',R_ROC:'中华民国',R_PRC:'中华人民共和国',
    E_MOD_MAY4:'五四运动',E_MOD_LONG_MARCH:'长征',E_MOD_MAO_DEATH:'毛泽东逝世',E_MOD_TIANANMEN:'天安门抗议与镇压',E_MOD_HK_RETURN:'香港回归',
    E_MOD_SPACE:'神舟五号',S_SONG:'宋与并立政权',R_NSONG:'北宋',R_SSONG:'南宋',R_LIAO:'辽',R_XIXIA:'西夏',R_JIN:'金',
    E_SONG_CHANYUAN:'澶渊之盟',E_SONG_JINGKANG:'靖康之变',E_SONG_SOUTH:'南宋建立',R_YUAN:'元',R_MING:'明',R_QING:'清'
  };
  const categories = item => item.type === 'macro_system' || item.id === 'SR_SA' ? 'period'
    : item.type === 'regime' ? 'dynasty' : item.type === 'event' ? 'event'
    : item.type === 'global_context' ? 'world' : 'culture';
  const groupingIds = new Set(['division','late-warring','three-kingdoms','sixteen','north-south','five-dynasties']);
  const all = core.all.map(item => ({ ...item, sourceIds: [], sources: [item.source],
    nameZh: item.han, category: groupingIds.has(item.id) ? 'period' : item.kind === 'event' ? 'event' : 'dynasty',
    evidence: 'Curated entry', importance: item.label === false ? 3 : 5 }));
  const byId = new Map(all.map(item => [item.id, item]));
  const sourceMap = {};
  for (const record of catalog) {
    const start = record.isPoint ? record.year : record.startYear;
    const end = record.isPoint ? record.year : record.endYear;
    const matched = byId.get(matches[record.id]);
    if (matched) {
      matched.sourceIds.push(record.id);
      matched.nameZh = record.nameZh || chinese[record.id] || matched.nameZh;
      matched.sources = [...new Set([...matched.sources, ...(record.sourceUrls || [])])];
      matched.catalogNote = record.dateNote || '';
      matched.importance = record.importance;
      matched.originalType = record.type;
      if (start !== matched.start || end !== matched.end) {
        matched.catalogDates = { start, end };
      }
      sourceMap[record.id] = matched.id;
      continue;
    }
    const category = categories(record);
    const item = {
      id: `catalog-${record.id}`, name: record.name, nameZh: record.nameZh || chinese[record.id] || '',
      han: Array.from(record.nameZh || chinese[record.id] || '史')[0], start, end,
      color: category === 'event' ? '#9e3c2e' : category === 'culture' ? '#987950' : '#647c70',
      description: record.summary || 'An entry from the expanded history workbook.',
      note: record.dateNote || '', sources: record.sourceUrls || [], source: record.sourceUrls?.[0] || null,
      evidence: record.sourceUrls?.length ? 'Research sources supplied' : 'Imported draft · source check pending',
      category, kind: record.isPoint ? 'event' : 'period', originalType: record.type,
      importance: record.importance, sourceIds: [record.id], sourceParent: record.parentId,
      systemId: record.systemId, catalogOnly: true
    };
    if (start < -2070) item.note += ' This traditional figure date precedes the ribbon’s starting year. It is available as a reading entry and is not plotted.';
    if (record.id === 'SR_SA') item.note += ' Spring and Autumn is a historical period, not a government.';
    if (['E_BUD_ENTRY','E_BUD_SPREAD','E_MING_EUNUCH_1','E_MOD_XI','F_SUN'].includes(record.id)) {
      item.approx = true;
      item.note += ' The year is a reference point for a broader process or uncertain chronology, not an exact beginning.';
    }
    if (['E_XIA_1','F_XIA_1'].includes(record.id)) {
      item.approx = true;
      item.note += ' Traditional, semi-legendary chronology; these dates are not securely established by contemporary records.';
    }
    sourceMap[record.id] = item.id;
    all.push(item);
    byId.set(item.id, item);
  }
  for (const item of all) if (item.sourceParent) item.parent = sourceMap[item.sourceParent];
  for (const item of additions) {
    all.push({ ...item, sourceIds: [], sources: item.sources || [item.source], category: item.category || 'event',
      kind: 'event', catalogOnly: true, importance: 4, evidence: 'Curated entry' });
  }
  for (const item of all) {
    const revision = revisions[item.id];
    if (revision) {
      const sources = [...new Set([...item.sources, ...(revision.sources || [])])];
      Object.assign(item, revision, { sources });
    }
  }
  const children = {
    han:['R_HAN_W','R_HAN_E'],song:['R_NSONG','R_SSONG','R_LIAO','R_XIXIA','R_JIN'],
    'three-kingdoms':['R_WEI','R_SHU','R_WU'], 'north-south':['R_NS_NORTHERN_WEI'],
    'jin-early':['R_JIN_W','R_JIN_EASTERN_JIN'],division:['S_3K','R_JIN_W','R_JIN_EASTERN_JIN','S_SIXTEEN','S_NS'],
    'eastern-zhou':['SR_SA','SR_WS']
  };
  for (const item of all) {
    item.related = [...new Set([
      ...(item.related || []),
      ...all.filter(other => other.parent === item.id).map(other => other.id),
      ...(children[item.id] || []).map(id => sourceMap[id])
    ])].filter(Boolean);
  }
  const ribbonEvents = all.filter(item => item.ribbon);
  return { ...core, events: ribbonEvents.length ? [...core.events, ...ribbonEvents] : core.events, all, sourceMap, sourceCount: catalog.length };
}
if(typeof module!=='undefined')module.exports=expandHistory;

// Later research may add a fact or source without replacing the existing essay.
function mergeHistoryRevisions(...packs){
  const merged={};
  for(const pack of packs)for(const [id,revision] of Object.entries(pack)){
    const previous=merged[id]||{};
    merged[id]={...previous,...revision,sources:[...new Set([...(previous.sources||[]),...(revision.sources||[])])],sourceLabels:{...previous.sourceLabels,...revision.sourceLabels}};
  }
  return merged;
}
expandHistory.mergeRevisions=mergeHistoryRevisions;
