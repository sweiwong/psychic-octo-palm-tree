const RESEARCH_PACKS = [EARLY_RESEARCH, MEDIEVAL_RESEARCH, MEDIEVAL_CULTURE, LATE_IMPERIAL_RESEARCH, MODERN_RESEARCH, CHART_RESEARCH, CAMBRIDGE_RESEARCH];
Object.assign(PINYIN, ...RESEARCH_PACKS.map(pack => pack.pinyin));
const RESEARCH_EXHIBITION = expandHistory(HISTORY, HISTORY_CATALOG, [...SUPPLEMENTAL_HISTORY, ...TANG_RESEARCH.events, ...RESEARCH_PACKS.flatMap(pack => pack.events)], mergeHistoryRevisions(TANG_RESEARCH.revisions, RESEARCH_REVISIONS, ...RESEARCH_PACKS.map(pack => pack.revisions)));
const EXHIBITION = applyBeginnerEdition(RESEARCH_EXHIBITION, BEGINNER_EARLY, BEGINNER_MIDDLE, BEGINNER_LATE);
for(const item of EXHIBITION.all)if(HISTORY_IMAGES[item.id])item.image=HISTORY_IMAGES[item.id];
(() => {
  'use strict';
  const internalLinks = InternalLinks.validateCards(EXHIBITION.all);
  if (internalLinks.errors.length) throw new Error(internalLinks.errors.map(error => error.message).join('\n'));
  const $=s=>document.querySelector(s), ns='http://www.w3.org/2000/svg';
  const chart=$('#chart'),detail=$('#detail'),tip=$('#tooltip');
  let selected=null,geometry,showEvents=true,showStates=true,lastTrigger=null,lastTriggerId=null;
  const sections=[
    {id:'early',name:'Early China',start:-2070,end:-221,label:'c. 2070 BCE – 221 BCE',ids:['xia','shang','western-zhou','catalog-SR_SA','catalog-SR_WS']},
    {id:'imperial',name:'Imperial China',start:-221,end:1912,label:'221 BCE – 1912',ids:['qin','han','three-kingdoms','jin-early','north-south','sui','tang','five-dynasties','song','yuan','ming','qing']},
    {id:'modern',name:'Modern China',start:1912,end:2026,label:'1912 – present · shown through 2026',ids:['republic','prc','roc-taiwan']}
  ];
  let activeSection='all';
  let returnToCollection=false,storyDismissed=false;
  const readingDialog=document.createElement('dialog');readingDialog.className='reading-dialog';readingDialog.setAttribute('aria-label','Expanded entry');document.body.append(readingDialog);
  let detailHome=null,readingScroll=0;
  function expandStory(){
    detailHome=detail.parentNode;readingScroll=detail.scrollTop;
    readingDialog.append(detail);readingDialog.showModal();document.body.classList.add('reading-open');
    detail.scrollTop=readingScroll;detail.querySelector('.detail-close').focus({preventScroll:true});
  }
  function collapseStory(){
    const scroll=detail.scrollTop;readingDialog.close();detailHome.prepend(detail);document.body.classList.remove('reading-open');
    detail.scrollTop=scroll;detail.querySelector('.detail-expand')?.focus({preventScroll:true});
  }
  readingDialog.addEventListener('cancel',event=>{event.preventDefault();collapseStory();});
  readingDialog.addEventListener('click',event=>{if(event.target===readingDialog)collapseStory();});
  const currentWindow=()=>sections.find(section=>section.id===activeSection)||{id:'all',name:'All history',start:-2070,end:2026,label:'c. 2070 BCE – 2026'};
  const inWindow=(year,view=currentWindow())=>year>=view.start&&(year<view.end||view.end===2026&&year===2026);
  const overlaps=(a,b,view=currentWindow())=>a===b?inWindow(a,view):b>view.start&&a<view.end;
  function sectionFor(item){return sections.find(section=>inWindow(item.start,section))?.id||'all';}
  function selectSection(id){
    activeSection=id;returnToCollection=false;tip.hidden=true;
    const view=currentWindow(),item=EXHIBITION.all.find(item=>item.id===selected);
    const nextCard = id !== 'all' && (!item || !overlaps(item.start, item.end)) ? view.ids[0] : selected;
    updateNavigation();render();
    if (nextCard !== selected) openCard(nextCard, { reveal: false });
    else updateDetail(false);
  }
  const displayText=text=>String(text).replace(/\s+CE\b/g,'');
  const fmt=y=>`${Math.abs(y)}${y<0?' BCE':''}`;
  const dates=item=>item.dateLabel?displayText(item.dateLabel):`${item.approx?'c. ':''}${fmt(item.start)}${item.end!==item.start?' – '+(item.end===2026?'present':fmt(item.end)):''}`;
  function el(tag,attrs={},text){const e=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(text!==undefined)e.textContent=displayText(text);return e;}
  function html(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=displayText(text);return e;}
  function richText(tag, className, value) {
    const node = html(tag, className);
    InternalLinks.appendRichText(node, displayText(value), {
      registry: internalLinks.registry, href: cardHref,
    });
    return node;
  }
  function imageFigure(image, { supporting = false } = {}) {
    const figure = html('figure', supporting ? 'card-photo card-section-photo' : 'card-photo');
    const photo = html('img');
    photo.src = image.src;
    photo.alt = image.alt;
    photo.width = image.width || 2304;
    photo.height = image.height || 1728;
    photo.decoding = 'async';
    if (supporting) photo.loading = 'lazy';

    const caption = html('figcaption', '', image.caption);
    const credit = html('a', '', image.credit);
    const license = html('a', '', image.license);
    credit.href = image.source;
    license.href = image.licenseUrl;
    for (const link of [credit, license]) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    caption.append(html('br'), credit, document.createTextNode(' · '), license);
    photo.addEventListener('error', () => {
      photo.hidden = true;
      caption.prepend(document.createTextNode('Image unavailable. '));
    }, { once: true });
    figure.append(photo);
    if (image.fullSize) {
      const enlarge = html('a', 'image-enlarge', 'Open image at full size ↗');
      enlarge.href = image.src;
      enlarge.target = '_blank';
      enlarge.rel = 'noopener noreferrer';
      figure.append(enlarge);
    }
    figure.append(caption);
    return figure;
  }
  detail.addEventListener('click', event => {
    const anchor = event.target.closest('a[data-card-id]');
    if (!anchor || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target === '_blank') return;
    event.preventDefault();
    select(anchor.dataset.cardId, false, anchor);
  });
  function syncPhoneSheet(){
    const open=detail.classList.contains('mobile-open');
    document.body.classList.toggle('phone-story-open',open);
    for(const node of document.querySelectorAll('.masthead,footer,.reading-notes,.section-toolbar,#era-nav,#collection,.chart-wrap,.legend'))node.inert=open;
  }
  function updateDetail(open=false){
    const item=EXHIBITION.all.find(d=>d.id===selected);detail.replaceChildren();
    detail.classList.toggle('welcome-card',!item);
    if(!item){
      detail.classList.remove('illustrated','mobile-open');detail.removeAttribute('role');detail.removeAttribute('aria-modal');detail.removeAttribute('aria-label');syncPhoneSheet();
      const body=html('div','card-body');
      body.append(html('p','eyebrow','THE HISTORY ATLAS'),html('h3','','Explore Chinese history'),html('p','card-description','Choose a period or a mark on the timeline to see its dates, images, sources, and a short explanation.'));
      const actions=html('div','welcome-actions'),early=html('button','start-early','Start with Early China'),browse=html('button','browse-stories','Browse all entries');
      early.onclick=()=>{selectSection('early');$('#section-nav [data-section="early"]').focus();};browse.onclick=()=>{$('#index-toggle').click();};actions.append(early,browse);body.append(actions);detail.append(body);return;
    }
    detail.classList.toggle('illustrated',!!item.image);detail.scrollTop=0;detail.style.setProperty('--accent',item.color);
    const cardTypes={dynasty:'DYNASTY OR STATE',period:'HISTORICAL PERIOD',event:'EVENT',culture:'PEOPLE AND CULTURE',world:'WORLD CONTEXT'};
    const top=html('div','card-top');top.append(html('span','',cardTypes[item.category]||'HISTORY ENTRY'),html('span','','ENTRY '+String(EXHIBITION.all.indexOf(item)+1).padStart(2,'0')+' OF '+EXHIBITION.all.length));
    const expand=html('button','detail-expand','Open full card');expand.setAttribute('aria-label','Open full card');expand.onclick=expandStory;top.append(expand);
    const close=html('button','detail-close','×');close.setAttribute('aria-label','Close details');close.onclick=closeDetail;top.append(close);
    const art=html('div','card-art');art.setAttribute('aria-hidden','true');const character=html('span','card-character',item.han);character.lang='zh-Hans';const glyph=html('div','card-glyph'),glyphPinyin=html('span','glyph-pinyin',PINYIN[item.han]);glyphPinyin.lang='zh-Latn';glyph.append(character,glyphPinyin);art.append(glyph,html('span','card-era','Chinese history'));
    const body=html('div','card-body');body.append(html('p','card-date',dates(item)),html('h3','',item.name));if(item.nameZh){const chinese=html('p','card-chinese-name',item.nameZh);chinese.lang='zh-Hans';const reading=html('p','card-pinyin',PINYIN[item.nameZh]);reading.lang='zh-Latn';body.append(chinese,reading);}body.append(richText('p','card-description',item.description));
    if (item.image) body.insertBefore(imageFigure(item.image), body.querySelector('.card-description'));
    if (item.sections) {
      for (const section of item.sections) {
        const block = html('section', 'card-analysis');
        block.append(richText('h4', '', section.title));
        for (const paragraph of section.text.split(/\n\s*\n/)) block.append(richText('p', '', paragraph));
        const sectionImages = (item.image?.sectionImages || []).filter(image => image.section === section.title);
        if (sectionImages.length) {
          const gallery = html('div', 'card-section-images');
          for (const image of sectionImages) gallery.append(imageFigure(image, { supporting: true }));
          block.append(gallery);
        }
        body.append(block);
      }
    }
    if(item.id==='catalog-C_BEIJING_YUAN'){
      const section=html('section','card-analysis');section.append(html('h4','','Marco Polo and later stories about Xanadu'));
      section.append(html('p','','Marco Polo’s travel account helped shape European images of the Yuan world. The account mixes observation, reported information, and storytelling. Coleridge’s “Kubla Khan,” beginning “In Xanadu,” came from that later literary tradition. Xanadu is Shangdu (上都), the Yuan summer capital north of the Great Wall; Dadu (大都) is a different city. The poem was written centuries later.'));
      for(const [label,url] of [['Explore Marco Polo’s Travels · Library of Congress ↗','https://www.loc.gov/resource/gdcwdl.wdl_14300/'],['Read “Kubla Khan” · Samuel Taylor Coleridge ↗','https://www.poetryfoundation.org/poems/43991/kubla-khan'],['Explore historical Xanadu (Shangdu) · UNESCO ↗','https://whc.unesco.org/en/list/1389/']]){const a=html('a','source-link',label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';section.append(a);}body.append(section);
    }
    if(item.id==='xuanzang-return'){
      const section=html('section','card-analysis card-reading-list');section.append(html('h4','','Reading list'));
      section.append(html('p','','William Dalrymple, The Golden Road: How Ancient India Transformed the World. Chapter 4: “The Sea of Jewels: Exploring the Great Library of Nalanda.”'));
      const link=html('a','source-link','View the book · Bloomsbury ↗');link.href='https://www.bloomsbury.com/us/golden-road-9781639734153/';link.target='_blank';link.rel='noopener noreferrer';section.append(link);body.append(section);
    }
    if(['catalog-E_QING_OPIUM','catalog-E_QING_OPIUM2'].includes(item.id)){
      const section=html('section','card-analysis card-reading-list');section.append(html('h4','','Recommended reading'));
      section.append(html('p','','Stephen R. Platt, Imperial Twilight: The Opium War and the End of China’s Last Golden Age. A history of the trade, people and political decisions leading to the First Opium War.'));
      const link=html('a','source-link','About the book · Wikipedia ↗');link.href='https://en.wikipedia.org/wiki/Imperial_Twilight';link.target='_blank';link.rel='noopener noreferrer';section.append(link);body.append(section);
    }
    if(item.id==='catalog-E_QING_TAIPING'){
      const section=html('section','card-analysis card-reading-list');section.append(html('h4','','Recommended reading'));
      section.append(html('p','','Stephen R. Platt, Autumn in the Heavenly Kingdom: China, the West, and the Epic Story of the Taiping Civil War. A narrative history of the conflict, its leaders and the role of Western powers.'));
      const link=html('a','source-link','View the book · Penguin Random House ↗');link.href='https://www.penguinrandomhouse.com/books/131825/autumn-in-the-heavenly-kingdom-by-stephen-r-platt/9780307957597';link.target='_blank';link.rel='noopener noreferrer';section.append(link);body.append(section);
    }
    const map=HISTORY_MAPS[item.id];
    if(map && map.src !== item.image?.src){
      const section=html('section','card-map');section.append(html('h4','','Map'));
      const link=html('a'),img=html('img');link.href=map.src;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label','Open full-size map: '+map.title);
      img.src=map.src;img.alt=map.title;img.loading='lazy';link.append(img);
      const caption=html('p','',map.caption),source=html('a','',map.credit+' · '+map.license),license=html('a','','License');source.href=map.source;license.href=map.licenseUrl;
      for(const a of [source,license]){a.target='_blank';a.rel='noopener noreferrer';}
      img.addEventListener('error',()=>{img.hidden=true;link.textContent='Open map image ↗';},{once:true});
      const enlarge=html('a','map-enlarge','Open map at full size ↗');enlarge.href=map.src;enlarge.target='_blank';enlarge.rel='noopener noreferrer';section.append(link,enlarge,caption,source,document.createTextNode(' · '),license);body.append(section);
    }
    const sources=html('details','card-sources');sources.append(html('summary','','Sources and date notes'));
    if(item.note)sources.append(richText('p','card-note',item.note));
    for(const url of item.sources||[]){if(!/^https?:\/\//.test(url))continue;const source=html('a','source-link',item.sourceLabels?.[url]?item.sourceLabels[url]+' ↗':url.includes('en.wikipedia.org')?'Read on Wikipedia ↗':'Read source · '+new URL(url).hostname.replace('www.','')+' ↗');source.href=url;source.target='_blank';source.rel='noopener noreferrer';sources.append(source);}
    const addedSources=new Set(item.sources||[]);
    body.append(sources);
    const linkedFrom = internalLinks.graph.backlinks.get(item.id);
    if (linkedFrom.length) {
      const section = html('section', 'card-backlinks');
      section.append(html('h4', '', 'Linked from'));
      const list = html('ul');
      for (const source of linkedFrom) {
        const entry = html('li'), anchor = html('a', 'internal-link', source.name);
        anchor.href = cardHref(source.id);
        anchor.dataset.cardId = source.id;
        entry.append(anchor, html('span', 'backlink-date', dates(source)));
        list.append(entry);
      }
      section.append(list);body.append(section);
    }
    if(item.related?.length){const related=html('div','related-items');related.append(html('p','eyebrow','RELATED ENTRIES'));for(const id of item.related){const other=EXHIBITION.all.find(d=>d.id===id),button=html('button','',other.name);button.onclick=()=>select(id,false,button);related.append(button);}body.append(related);}
    const nav=html('div','card-navigation');nav.append(html('span','','PREVIOUS / NEXT'));const arrows=html('div');const prev=html('button','','←'),next=html('button','','→');prev.setAttribute('aria-label','Previous item');next.setAttribute('aria-label','Next item');
    const items=[...EXHIBITION.all].sort((a,b)=>a.start-b.start),index=items.findIndex(d=>d.id===selected);prev.disabled=index===0;next.disabled=index===items.length-1;
    prev.onclick=()=>{select(items[index-1].id,true);if(!matchMedia('(max-width:760px)').matches)detail.querySelector('[aria-label="Previous item"]').focus({preventScroll:true});};next.onclick=()=>{select(items[index+1].id,true);if(!matchMedia('(max-width:760px)').matches)detail.querySelector('[aria-label="Next item"]').focus({preventScroll:true});};arrows.append(prev,next);nav.append(arrows);body.append(nav);detail.append(top,art,body);
    if(open&&matchMedia('(max-width:760px)').matches){detail.classList.add('mobile-open');detail.setAttribute('role','dialog');detail.setAttribute('aria-modal','true');detail.setAttribute('aria-label',item.name);close.focus();}else if(!detail.classList.contains('mobile-open')){detail.removeAttribute('role');detail.removeAttribute('aria-modal');}
    syncPhoneSheet();
  }
  function cardHref(cardId) {
    const url = new URL(location.href);
    if (cardId === null) url.searchParams.delete('card');
    else url.searchParams.set('card', cardId);
    return url.pathname + url.search + url.hash;
  }

  function openCard(cardId, { historyMode = 'push', trigger = null, scroll = false, reveal = true } = {}) {
    if (!internalLinks.registry.ids.has(cardId)) return;
    const changesCard = new URL(location.href).searchParams.get('card') !== cardId;
    const opensPreview = reveal && history.state?.atlasCard?.reveal === false;
    if (historyMode === 'push' && (changesCard || opensPreview)) {
      history.pushState({ ...history.state, atlasCard: { id: cardId, pushed: true, reveal } }, '', cardHref(cardId));
    }
    const fromCard = !!trigger && detail.contains(trigger);
    if (trigger && !fromCard) {
      if (!trigger.dataset.record) returnToCollection = false;
      lastTrigger = trigger;
      lastTriggerId = trigger.dataset.item || null;
    }
    storyDismissed = false;
    selected = cardId;
    tip.hidden = true;
    if (returnToCollection) showCollection(!reveal);
    if (!reveal) {
      if (readingDialog.open) collapseStory();
      detail.classList.remove('mobile-open');
    }
    updateDetail(reveal);
    drawSelection();
    if (reveal) {
      const heading = detail.querySelector('h3');
      heading.tabIndex = -1;heading.focus({ preventScroll: true });
    }
    document.querySelectorAll('[data-item]').forEach(node => node.classList.toggle('selected', node.dataset.item === cardId));
    if (!matchMedia('(max-width:760px)').matches) {
      if (scroll) document.querySelector(`[data-item="${cardId}"]`)?.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  }

  function closeSurface() {
    if (readingDialog.open) collapseStory();
    storyDismissed = true;
    selected = null;
    if (returnToCollection) showCollection(true);
    render();updateDetail(false);
    const target = lastTrigger?.dataset.record ? $('#search-results [data-record="' + lastTrigger.dataset.record + '"]')
      : lastTrigger?.isConnected ? lastTrigger
      : lastTriggerId ? chart.querySelector('[data-item="' + lastTriggerId + '"][tabindex="0"]') : null;
    (target || $('#index-toggle')).focus({ preventScroll: true });
  }

  function closeCard() {
    const cardId = new URL(location.href).searchParams.get('card');
    if (cardId && history.state?.atlasCard?.id === cardId && history.state.atlasCard.pushed) {
      history.back();
      return;
    }
    const state = { ...history.state };
    delete state.atlasCard;
    history.replaceState(state, '', cardHref(null));
    closeSurface();
  }

  function applyLocation() {
    const cardId = new URL(location.href).searchParams.get('card');
    if (cardId && internalLinks.registry.ids.has(cardId)) {
      const reveal = history.state?.atlasCard?.id === cardId ? history.state.atlasCard.reveal !== false : true;
      openCard(cardId, { historyMode: 'none', reveal });
      if (!reveal) (lastTrigger?.isConnected ? lastTrigger : $('#index-toggle')).focus({ preventScroll: true });
    } else {
      if (cardId !== null) {
        const state = { ...history.state };delete state.atlasCard;
        history.replaceState(state, '', cardHref(null));
      }
      closeSurface();
    }
  }

  function closeDetail() {
    if (readingDialog.open) { collapseStory();return; }
    closeCard();
  }
  function select(id, scroll = false, trigger = null) { openCard(id, { scroll, trigger }); }
  function tooltip(item,target){const bounds=target.getBoundingClientRect();tip.replaceChildren(html('strong','',item.name),html('span','',dates(item)),html('div','',InternalLinks.plainText(item.description)));tip.hidden=false;const box=tip.getBoundingClientRect();tip.style.left=Math.max(8,Math.min(innerWidth-box.width-8,bounds.x+bounds.width/2-box.width/2))+'px';tip.style.top=Math.max(8,Math.min(innerHeight-box.height-8,bounds.y-box.height-12))+'px';}
  function interactive(node,item){const card=EXHIBITION.all.find(entry=>entry.id===item.id)||item;node.dataset.item=item.id;node.setAttribute('role','button');node.setAttribute('tabindex','0');node.setAttribute('aria-label',`${card.name}, ${dates(card)}${card.id==='confucius'?', traditional date':''}. Open details.`);node.classList.add('timeline-item',item.kind);if(item.id===selected)node.classList.add('selected');node.addEventListener('click',()=>select(item.id,false,node));node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(item.id,false,node);}});node.addEventListener('mouseenter',()=>tooltip(card,node));node.addEventListener('mouseleave',()=>tip.hidden=true);node.addEventListener('focus',()=>tooltip(card,node));node.addEventListener('blur',()=>tip.hidden=true);}
  function render(){
    const view=currentWindow();
    if(clusterDialog.open)clusterDialog.close();
    geometry=SnakeGeometry.create(Math.max(280,Math.round(chart.clientWidth)),activeSection==='all'?{}:{startYear:view.start,endYear:view.end});
    const periods=EXHIBITION.periods.filter(item=>(item.ranges||[[item.start,item.end]]).some(([a,b])=>overlaps(a,b)));
    const states=EXHIBITION.states.filter(item=>overlaps(item.start,item.end));
    const events=EXHIBITION.events.filter(item=>overlaps(item.start,item.end)&&!/unknown|legendary/i.test(item.dateLabel||''));
    const g=geometry,svg=el('svg',{viewBox:`0 0 ${g.width} ${g.height}`,role:'group','aria-label':'Chinese history timeline. Time runs left to right, then continues on the next row.'});
    const defs=el('defs');const pattern=el('pattern',{id:'uncertain',width:7,height:7,patternUnits:'userSpaceOnUse',patternTransform:'rotate(35)'});pattern.append(el('rect',{width:7,height:7,fill:'#b39c73'}),el('rect',{width:2,height:7,fill:'#d7c9ac'}));defs.append(pattern);svg.append(defs);
    const backdrop=el('g');for(let row=0;row<g.rows;row++){const y=g.top+row*g.radius*2;backdrop.append(el('line',{x1:0,y1:y+g.radius,x2:g.width,y2:y+g.radius,stroke:'#dedbcf','stroke-width':.7}));const label=el('text',{x:2,y:y-54,fill:'#a09e90','font-family':'DM Sans, sans-serif','font-size':8},String(row+1).padStart(2,'0'));backdrop.append(label);}svg.append(backdrop);
    svg.append(el('path',{d:g.path(),fill:'none',stroke:'#d7d2c4','stroke-width':19}));
    const ribbons=el('g');
    for(const item of periods){const group=el('g');for(const [a,b] of item.ranges||[[item.start,item.end]])if(overlaps(a,b))group.append(el('path',{d:g.path(a,b),fill:'none',stroke:item.id==='xia'?'url(#uncertain)':item.color,'stroke-width':19}));interactive(group,item);if(item.label!==false)group.setAttribute('tabindex','-1');ribbons.append(group);}
    if(showStates)for(const item of states){const group=el('g');group.append(el('path',{d:g.path(item.start,item.end,item.offset),fill:'none',stroke:item.color,'stroke-width':4,'stroke-linecap':'round'}));group.append(el('path',{d:g.path(item.start,item.end,item.offset),fill:'none',stroke:'transparent','stroke-width':13}));interactive(group,item);if(item.label!==false&&g.width>=500)group.setAttribute('tabindex','-1');ribbons.append(group);}
    svg.append(ribbons);
    // These are phases within Zhou history, using the workbook's 481 BCE convention.
    const zhouPhases=[['catalog-SR_SA','#ad955f'],['catalog-SR_WS','#8a764a']].map(([id,color])=>({...EXHIBITION.all.find(item=>item.id===id),kind:'subperiod',color})).filter(item=>overlaps(item.start,item.end));
    for(const item of zhouPhases){const band=el('g');band.append(el('path',{d:g.path(item.start,item.end),fill:'none',stroke:item.color,'stroke-width':19}));interactive(band,item);band.setAttribute('tabindex','-1');svg.append(band);}
    const phaseBoundary=EXHIBITION.all.find(item=>item.id==='catalog-SR_WS').start;
    if(inWindow(phaseBoundary)){
    const transition=g.point(phaseBoundary),divider=el('g',{'data-boundary-year':phaseBoundary,'aria-label':'Spring and Autumn / Warring States boundary, 481 BCE convention',role:'img'});
    const dividerPath=`M${transition.x-transition.ty*15},${transition.y+transition.tx*15} L${transition.x+transition.ty*15},${transition.y-transition.tx*15}`;
    divider.append(el('path',{d:dividerPath,stroke:'#f4f0e7','stroke-width':5}),el('path',{d:dividerPath,stroke:'#584e38','stroke-width':1.5}));svg.append(divider);
    }
    // Direction arrows are read from the same tangent as the ribbon.
    for(let row=0;row<g.rows;row++){const d=g.rowStart(row)+g.rowSpan(row)*.45,p=g.at(d);const arrow=el('path',{d:`M-4,-3 L0,0 L-4,3`,transform:`translate(${p.x},${p.y}) rotate(${p.tx<0?180:0})`,fill:'none',stroke:'#f4f0e7','stroke-width':1.2,opacity:.8});svg.append(arrow);}
    const leaderSegments=[],namedPoints=[],markers=[],placed=[],labels=el('g',{class:'timeline-labels'}),leaders=el('g');
    const ribbonPoints=Array.from({length:Math.ceil(g.length/5)+1},(_,i)=>g.at(Math.min(g.length,i*5)));
    const statePoints=showStates?states.flatMap(item=>{const a=g.distance(item.start),b=g.distance(item.end),n=Math.max(1,Math.ceil((b-a)/2));return Array.from({length:n+1},(_,i)=>({...g.at(a+(b-a)*i/n,item.offset),id:item.id}));}):[];
    const coversState=r=>statePoints.some(p=>p.x>r.x-5&&p.x<r.x+r.w+5&&p.y>r.y-6&&p.y<r.y+r.h+5);
    const coversRibbon=r=>ribbonPoints.some(p=>p.x>r.x-10&&p.x<r.x+r.w+10&&p.y>r.y-14&&p.y<r.y+r.h+14);
    const items=[...periods.filter(d=>d.label!==false).sort((a,b)=>(b.id==='prc')-(a.id==='prc')),...zhouPhases,...(showStates&&g.width>=500?states.filter(d=>d.label!==false).sort((a,b)=>(a.end-a.start)-(b.end-b.start)):[])];
    function collides(r){return placed.some(p=>r.x<p.x+p.w+8&&r.x+r.w+8>p.x&&r.y<p.y+p.h+7&&r.y+r.h+7>p.y);}
    const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
    function intersects(a,b,c,d){
      const u=cross(a,b,c),v=cross(a,b,d),w=cross(c,d,a),z=cross(c,d,b);
      if(u*v<-.001&&w*z<-.001)return true;
      if(Math.abs(u)+Math.abs(v)>.001)return false;
      const axis=Math.abs(a.x-b.x)>Math.abs(a.y-b.y)?'x':'y';
      return Math.max(Math.min(a[axis],b[axis]),Math.min(c[axis],d[axis]))<Math.min(Math.max(a[axis],b[axis]),Math.max(c[axis],d[axis]))-.1;
    }
    function cutsBox(a,b,r){
      const corners=[{x:r.x-3,y:r.y-3},{x:r.x+r.w+3,y:r.y-3},{x:r.x+r.w+3,y:r.y+r.h+3},{x:r.x-3,y:r.y+r.h+3}];
      const inside=p=>p.x>corners[0].x&&p.x<corners[2].x&&p.y>corners[0].y&&p.y<corners[2].y;
      return inside(a)||inside(b)||corners.some((c,i)=>intersects(a,b,c,corners[(i+1)%4]));
    }
    const endAt=(p,r)=>({x:Math.max(r.x-4,Math.min(r.x+r.w+4,p.x)),y:Math.max(r.y-4,Math.min(r.y+r.h+4,p.y))});
    const dateMeasure=document.createElement('canvas').getContext('2d');dateMeasure.font='10px '+getComputedStyle(document.body).fontFamily;
    for(const item of items){
      const year=activeSection==='all'?(item.kind==='event'?item.start:(item.start+Math.min(item.end,2026))/2):(Math.max(item.start,view.start)+Math.min(item.end,view.end))/2,p=g.point(year,item.offset||0),row=Math.max(0,Math.min(g.rows-1,Math.round((g.point(year).y-g.top)/(g.radius*2)))),baseline=g.top+row*g.radius*2;
      const shortDates=dates(item).replaceAll(' CE','').replace(' – ','–');
      const dateWidth=dateMeasure.measureText(shortDates).width+shortDates.length*.5+12;
      const isPeriod=item.kind==='period',w=Math.min(g.width-26,Math.max(80,dateWidth,item.name.length*(isPeriod?10.2:5.5)+12)),h=isPeriod?37:29;
      const offsets=isPeriod?[-55,45,-82,70]:item.kind==='event'?[42,-62,67,-87]:(p.y>baseline?[66,42,-77,-55]:[-77,-55,66,42]);let rect;
      const candidates=[];
      function consider(x,y){
        const r={x:Math.max(13,Math.min(g.width-w-13,x)),y,w,h};
        if(y<24||collides(r)||coversRibbon(r)||coversState(r)||namedPoints.some(p=>p.x>r.x-7&&p.x<r.x+r.w+7&&p.y>r.y-7&&p.y<r.y+r.h+7)||leaderSegments.some(line=>cutsBox(line.a,line.b,r)))return;
        const end=endAt(p,r);
        // A state label must stay on its own side of the main ribbon.
        if(item.kind==='concurrent'){
          const base=g.point(year),normal={x:-p.ty,y:p.tx};
          if(((end.x-base.x)*normal.x+(end.y-base.y)*normal.y)*(item.offset||0)<=0)return;
          const length=Math.hypot(end.x-p.x,end.y-p.y);
          if(length>85)return;
        }
        const clear=!placed.some(box=>cutsBox(p,end,box))&&!leaderSegments.some(line=>intersects(p,end,line.a,line.b));
        const length=Math.hypot(end.x-p.x,end.y-p.y);
        candidates.push({rect:r,end,clear,score:(clear?0:10000)+length+Math.abs(r.x+w/2-p.x)*.12+Math.max(0,offsets.indexOf(y-baseline))*.2});
      }
      for(const dy of offsets)for(const dx of [0,-24,24,-48,48,-80,80,-120,120,-180,180,-240,240])consider(p.x-w/2+dx,baseline+dy);
      if(!candidates.some(c=>c.clear)){
        for(let y=baseline-90;y<=baseline+70;y+=8)for(let x=13;x<=g.width-w-13;x+=12)consider(x,y);
      }
      // Give crowded main periods another label row rather than dropping their names.
      if(isPeriod&&!candidates.some(c=>c.clear)){
        for(let extra=110;extra<=350&&!candidates.some(c=>c.clear);extra+=45)
          for(let x=13;x<=g.width-w-13;x+=12)consider(x,baseline+extra);
      }
      candidates.sort((a,b)=>a.score-b.score);
      const choice=candidates.find(c=>c.clear);rect=choice?.rect;
      // Preserve a keyboard target even when the nearby label cannot fit.
      if(!rect){
        const line=svg.querySelector('[data-item="'+item.id+'"]');
        if(line)line.setAttribute('tabindex','0');
        else{
          const dot=el('g');interactive(dot,item);
          dot.append(el('circle',{class:'marker',cx:p.x,cy:p.y,r:5,fill:'#f4f0e7',stroke:'#292d29','stroke-width':1.5}),el('circle',{cx:p.x,cy:p.y,r:11,fill:'transparent'}));labels.append(dot);
        }
        namedPoints.push(p);
        continue;
      }
      namedPoints.push(p);placed.push({...rect,id:item.id,baseline});const x=rect.x+rect.w/2,y=rect.y+15;
      if(choice.clear){
        leaderSegments.push({a:p,b:choice.end,id:item.id});
        leaders.append(el('path',{d:'M'+p.x+','+p.y+' L'+choice.end.x+','+choice.end.y,fill:'none',stroke:item.kind==='concurrent'?item.color:'#b6b2a5','stroke-width':.7}));
      }
      const group=el('g');interactive(group,item);group.append(el('circle',{class:'marker',cx:p.x,cy:p.y,r:item.kind==='event'?4.5:2.7,fill:item.kind==='event'?'#f4f0e7':item.color,stroke:item.kind==='event'?'#292d29':'#f4f0e7','stroke-width':1.5}));
      group.append(el('rect',{class:'label-bg',x:rect.x,y:rect.y-3,width:rect.w,height:rect.h+5,rx:2,fill:'#f4f0e7'}));
      group.append(el('text',{class:'label-name',x,y,'text-anchor':'middle'},item.name));
      group.append(el('text',{class:'label-date',x,y:y+(isPeriod?16:13),'text-anchor':'middle'},shortDates));labels.append(group);
    }
    const dotSegments=[],clusters=[];
    // Group overlapping pointer targets in path order; dates never move off the ribbon.
    const eventGroups=[];
    if(showEvents)for(const item of [...events].sort((a,b)=>a.start-b.start||a.end-b.end)){
      const position=g.distance(Math.max(item.start,view.start)),point=g.point(Math.max(item.start,view.start)),last=eventGroups.at(-1);
      if(last&&(position-last.firstDistance<52||(Math.abs(point.x-last.anchor.x)<44&&Math.abs(point.y-last.anchor.y)<44))){last.items.push(item);}
      else eventGroups.push({items:[item],firstDistance:position,anchor:point});
    }
    for(const entry of eventGroups){
      const members=entry.items.map(item=>EXHIBITION.all.find(card=>card.id===item.id));
      const start=Math.min(...members.map(item=>item.start)),end=Math.max(...members.map(item=>item.end)),latestStart=Math.max(...members.map(item=>item.start));
      const visibleStart=Math.max(start,view.start),visibleEnd=Math.min(latestStart,view.end),p=g.point(visibleStart);
      const clusterId=members.length>1?'events-'+members.map(item=>item.id).join('--'):null;
      for(const item of members){const point=g.point(Math.max(item.start,view.start));markers.push({id:item.id,x:point.x,y:point.y,start:item.start,end:item.end,approx:isUncertain(item),offset:0,clusterId});}
      if(!clusterId){
        const item=members[0],node=el('g',{'data-event-marker':item.id});interactive(node,item);
        node.append(el('rect',{x:p.x-22,y:p.y-22,width:44,height:44,fill:'transparent',class:'event-hit'}),eventTick(item,p));labels.append(node);
        continue;
      }
      const uncertain=members.some(isUncertain),cluster={id:clusterId,ids:members.map(item=>item.id),start,end,latestStart,spanStart:start,spanEnd:latestStart,visibleStart,visibleEnd,x:p.x,y:p.y,approx:uncertain};clusters.push(cluster);
      const node=el('g',{class:'event-cluster','data-cluster':clusterId,role:'button',tabindex:0,'aria-haspopup':'dialog','aria-label':members.length+' events starting '+fmt(start)+(latestStart!==start?' to '+fmt(latestStart):'')+(uncertain?'. Includes approximate or traditional dates':'')+'. Open chronological list.'});
      // The extent connects actual member dates; the count is anchored to its earliest visible date.
      if(visibleEnd>visibleStart)node.append(el('path',{class:'cluster-span',d:g.path(visibleStart,visibleEnd),fill:'none',stroke:'#f4f0e7','stroke-width':3,'stroke-dasharray':uncertain?'3 3':'none','pointer-events':'none'}));
      for(const year of [...new Set([visibleStart,visibleEnd])]){const endPoint=g.point(year);node.append(el('path',{d:tickPath(endPoint,6),stroke:'#f4f0e7','stroke-width':1.5,'pointer-events':'none'}));}
      for(const item of members)node.append(eventTick(item,g.point(Math.max(item.start,view.start)),5,1.2));
      const badge=el('g',{transform:'translate('+p.x+','+p.y+') rotate('+Math.atan2(p.ty,p.tx)*180/Math.PI+')'});
      badge.append(el('rect',{x:-10,y:-8,width:20,height:16,rx:3,class:'cluster-badge','stroke-dasharray':uncertain?'2 2':'none'}));
      // Keep numerals upright even where chronological travel runs right to left.

      node.append(el('rect',{x:p.x-22,y:p.y-22,width:44,height:44,fill:'transparent',class:'event-hit'}),badge,el('text',{x:p.x,y:p.y+3.5,'text-anchor':'middle',class:'cluster-count'},members.length));
      const open=()=>openCluster(members,node,cluster);
      node.addEventListener('click',open);node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}});
      labels.append(node);
    }
    svg.append(leaders,labels);const labelBottom=Math.max(g.height,...placed.map(r=>r.y+r.h+20));svg.setAttribute('viewBox',`0 0 ${g.width} ${labelBottom}`);chart.replaceChildren(svg);
    // Exposed read-only measurements support deterministic layout checks.
    window.timelineInspection={view:{...view},geometry:g,markers,clusters,statePoints,leaders:leaderSegments,dotLeaders:dotSegments,labels:placed,selected:()=>selected,sourceMap:EXHIBITION.sourceMap};drawSelection();
  }
  function isUncertain(item){return item.id==='confucius'||!!item.approx||/approx|unknown|traditional|legend|c\. /i.test(item.dateLabel||'');}
  function tickPath(p,size=7){return 'M'+(p.x-p.ty*size)+','+(p.y+p.tx*size)+' L'+(p.x+p.ty*size)+','+(p.y-p.tx*size);}
  function eventTick(item,p,size=7,width=3){return el('path',{'data-event-date':item.id,class:'event-tick'+(isUncertain(item)?' uncertain':''),d:tickPath(p,size),fill:'none',stroke:'#f4f0e7','stroke-width':width,'stroke-dasharray':isUncertain(item)?'2 2':'none','pointer-events':'none'});}
  const clusterDialog=html('dialog','event-cluster-dialog');document.body.append(clusterDialog);
  let clusterTrigger=null,restoreClusterFocus=true;
  clusterDialog.addEventListener('close',()=>{if(restoreClusterFocus&&clusterTrigger?.isConnected)clusterTrigger.focus({preventScroll:true});});
  function openCluster(items,trigger,cluster){
    tip.hidden=true;clusterTrigger=trigger;restoreClusterFocus=true;clusterDialog.replaceChildren();
    const heading=html('h2','',items.length+' events to explore');heading.id='cluster-title';
    clusterDialog.setAttribute('aria-labelledby',heading.id);
    const close=html('button','cluster-close','Close');close.setAttribute('aria-label','Close event list');close.onclick=()=>clusterDialog.close();
    const range=html('p','cluster-date-range','Starting dates: '+fmt(cluster.start)+(cluster.latestStart!==cluster.start?' – '+fmt(cluster.latestStart):''));
    const intro=html('p','cluster-intro','These events sit close together at this scale. Choose one to open its card. Each card shows the date and any uncertainty.');
    const list=html('ol','cluster-events');
    for(const item of items){const row=html('li'),button=html('button');button.dataset.record=item.id;button.append(html('span','cluster-event-date',dates(item)+(isUncertain(item)?item.id==='confucius'?' · traditional date':' · approximate date':'')),html('strong','',item.name));button.onclick=()=>{restoreClusterFocus=false;clusterDialog.close();select(item.id,false,trigger);};row.append(button);list.append(row);}
    if(cluster.approx)intro.append(html('span','cluster-uncertainty',' This group includes approximate or traditional dates, shown with broken marks.'));
    clusterDialog.append(close,heading,range,intro,list);clusterDialog.showModal();close.focus();
  }
  function drawSelection(){
    chart.querySelector('.catalog-selection')?.remove();chart.querySelector('.event-duration')?.remove();
    for(const cluster of window.timelineInspection?.clusters||[])chart.querySelector('[data-cluster="'+cluster.id+'"]')?.classList.toggle('selected',cluster.ids.includes(selected));
    const item=EXHIBITION.all.find(d=>d.id===selected),view=currentWindow();
    if(!item||item.showTimeline===false||!overlaps(item.start,item.end)||(item.kind==='event'&&!showEvents)||(item.kind==='concurrent'&&!showStates))return;
    // Unknown dates have no defensible position. Their reading cards remain available in the collection.
    if(/unknown|legendary/i.test(item.dateLabel||''))return;
    if(item.kind==='event'&&item.end>item.start){
      const range=el('path',{class:'event-duration',d:geometry.path(Math.max(item.start,view.start),Math.min(item.end,view.end)),fill:'none',stroke:'#f4f0e7','stroke-width':7,'stroke-dasharray':isUncertain(item)?'12 6':'none','pointer-events':'none','data-start':Math.max(item.start,view.start),'data-end':Math.min(item.end,view.end)});
      chart.querySelector('svg').insertBefore(range,chart.querySelector('.timeline-labels'));
    }
    if(item.kind!=='event'&&chart.querySelector('[data-item="'+selected+'"]'))return;
    if(item.start<view.start&&item.end===item.start)return;
    const p=geometry.point(Math.max(item.start,view.start)),node=el('g',{class:'catalog-selection','pointer-events':'none','aria-hidden':'true'});
    node.append(el('path',{d:tickPath(p,8),stroke:'#292d29','stroke-width':6}),eventTick(item,p));chart.querySelector('svg').insertBefore(node,chart.querySelector('.timeline-labels'));
  }
  function results(){
    const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const query=normalize($('#search').value.trim()),category=$('#category').value;
    const titleMatch=item=>normalize(item.name+' '+(item.nameZh||'')+' '+(PINYIN[item.nameZh]||'')).includes(query)?0:1;
    const items=EXHIBITION.all.filter(d=>(category==='all'||d.category===category)&&normalize([d.name,d.nameZh||'',PINYIN[d.nameZh]||'',d.start,d.end,InternalLinks.plainText(d.description),InternalLinks.plainText(d.note||''),...(d.searchAliases||[]),...(d.sections||[]).map(s=>InternalLinks.plainText(s.title+' '+s.text))].join(' ')).includes(query)).sort((a,b)=>titleMatch(a)-titleMatch(b)||a.start-b.start||b.importance-a.importance);
    $('#search-results').replaceChildren();$('#collection-count').textContent=items.length+' of '+EXHIBITION.all.length+' entries';
    for(const item of items){
      const b=html('button','collection-entry');b.dataset.record=item.id;
      if(item.image){
        const img=html('img','result-image');img.src=item.image.src;img.alt='';img.loading='lazy';img.decoding='async';img.width=320;img.height=160;
        img.addEventListener('error',()=>img.hidden=true,{once:true});b.append(img);
      }
      const copy=html('span','result-copy');copy.append(html('small','',dates(item)),html('strong','result-title',item.name));
      if(item.nameZh){const zh=html('span','result-chinese',item.nameZh);zh.lang='zh-Hans';const reading=html('span','result-pinyin',PINYIN[item.nameZh]);reading.lang='zh-Latn';copy.append(zh,reading);}
      copy.append(html('span','result-summary',InternalLinks.plainText(item.description)));
      copy.append(html('span','result-open','Read entry →'));
      b.append(copy);b.onclick=()=>{
        returnToCollection=true;showCollection(false);select(item.id,false,b);
        if(!matchMedia('(max-width:760px)').matches){
          detail.scrollIntoView({behavior:'instant',block:'start'});
          const heading=detail.querySelector('h3');heading.tabIndex=-1;heading.focus({preventScroll:true});
        }
      };$('#search-results').append(b);
    }
    if(!items.length)$('#search-results').append(html('p','','No matches. Try another name or year.'));
  }
  function updateNavigation(){
    const view=currentWindow();
    document.querySelectorAll('#section-nav button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.section===activeSection)));
    $('#view-range').textContent=view.name+' · '+view.label;
    $('#view-note').textContent=activeSection==='all'?'': 'This range uses more space on the timeline. Cards still show complete dates.';
    const entries=activeSection==='all'?[]:view.ids.map(id=>{const item=EXHIBITION.all.find(item=>item.id===id);return{id,name:item.name,nameZh:item.nameZh,pinyin:PINYIN[item.nameZh],date:dates(item)};});
    $('#era-nav').hidden=activeSection==='all';$('#era-nav').replaceChildren();$('#era-nav').dataset.view=activeSection;$('#era-nav').dataset.count=entries.length;
    for(const entry of entries){
      const button=html('button','era-link');button.dataset.period=entry.id;
      const zh=html('span','era-chinese',entry.nameZh);zh.lang='zh-Hans';
      const reading=html('span','era-pinyin',entry.pinyin);reading.lang='zh-Latn';
      button.append(zh,reading,html('span','era-english',entry.name),html('span','era-dates',entry.date));
      button.onclick=()=>{select(entry.id,true,button);document.querySelectorAll('#era-nav button').forEach(node=>{node.classList.toggle('active',node.dataset.period===entry.id);if(node.dataset.period===entry.id)node.setAttribute('aria-current','location');else node.removeAttribute('aria-current');});};
      $('#era-nav').append(button);
    }
  }
  for(const section of [{id:'all',name:'All history'},...sections]){
    const button=html('button','section-button',section.name);button.dataset.section=section.id;button.setAttribute('aria-controls','chart');button.onclick=()=>selectSection(section.id);$('#section-nav').append(button);
  }
  updateNavigation();
  function showCollection(open){$('#collection').hidden=!open;$('#index-toggle').setAttribute('aria-expanded',String(open));if(open)results();}
  $('#index-toggle').onclick=()=>{const open=$('#collection').hidden||!!$('#search').value.trim()||$('#category').value!=='all';if(open){$('#search').value='';$('#category').value='all';}showCollection(open);if(open){const count=$('#collection-count');count.tabIndex=-1;count.focus();}};
  $('.header-search').onsubmit=e=>{e.preventDefault();showCollection(true);$('#search-results button')?.focus();};
  $('#search').addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();showCollection(false);}else if(e.key==='ArrowDown'){e.preventDefault();showCollection(true);$('#search-results button')?.focus();}});
  $('#search').addEventListener('input',()=>showCollection(true));$('#category').addEventListener('change',results);$('#events-toggle').onchange=e=>{showEvents=e.target.checked;render();};$('#states-toggle').onchange=e=>{showStates=e.target.checked;render();};
  document.addEventListener('keydown',e=>{if(clusterDialog.open||readingDialog.open)return;if(e.key==='Escape'){tip.hidden=true;closeDetail();}if(e.key==='Tab'&&detail.classList.contains('mobile-open')){const focusables=[...detail.querySelectorAll('a,button:not(:disabled),summary')].filter(node=>node.getClientRects().length),first=focusables[0],last=focusables.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
  matchMedia('(max-width:760px)').addEventListener('change',()=>{const scroll=detail.scrollTop;if(readingDialog.open)collapseStory();detail.classList.remove('mobile-open');updateDetail(!!selected&&!storyDismissed);detail.scrollTop=scroll;});
  window.addEventListener('scroll',()=>{const active=document.activeElement;if(active?.classList.contains('timeline-item'))tooltip(EXHIBITION.all.find(d=>d.id===active.dataset.item),active);else tip.hidden=true;},{passive:true});let previousWidth=0,resizeFrame=0;new ResizeObserver(()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{if(previousWidth!==chart.clientWidth){previousWidth=chart.clientWidth;render();}});}).observe(chart);
  const markerLegend=$('.legend-dot').parentElement;markerLegend.replaceChildren(html('i','legend-tick'),document.createTextNode('An event mark · numbers open a group'));
  $('.brand').onclick=event=>{
    event.preventDefault();
    const state = { ...history.state };delete state.atlasCard;
    history.pushState(state, '', cardHref(null).split('#')[0]);
    selected=null;activeSection='all';lastTrigger=null;lastTriggerId=null;tip.hidden=true;
    $('#search').value='';$('#category').value='all';showCollection(false);
    updateNavigation();updateDetail();render();window.scrollTo({top:0,behavior:'instant'});
  };
  updateDetail();render();
  window.addEventListener('popstate', applyLocation);
  if (new URL(location.href).searchParams.has('card')) applyLocation();
})();
