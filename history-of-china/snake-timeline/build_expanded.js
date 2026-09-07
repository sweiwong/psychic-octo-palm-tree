// Export the same research and images used by the browser, preserving the original v10 data.
const fs=require('node:fs');
const path=require('node:path');
const expand=require('./catalog_adapter');
const tang=require('./tang_data');
const packs=['early_research','medieval_research','medieval_culture','late_imperial_research','modern_research','chart_research','cambridge_research'].map(name=>require('./'+name));
const research=expand(require('./history_data'),require('./catalog_data'),
 [...require('./supplemental_data'),...tang.events,...packs.flatMap(pack=>pack.events)],
 expand.mergeRevisions(tang.revisions,require('./research_revisions'),...packs.map(pack=>pack.revisions)));
const exhibition=require('./beginner_edition')(research,...['early','middle','late'].map(era=>require('./beginner_'+era)));
const pinyin=Object.assign({},require('./pinyin_data'),...packs.map(pack=>pack.pinyin));
const images=require('./image_data');
const cards=exhibition.all.map(card=>({...card,pinyin:pinyin[card.nameZh],...(images[card.id]?{image:images[card.id]}:{})}));
const output={edition:'2026-09-06 beginner reading edition',cardCount:cards.length,sourceCount:exhibition.sourceCount,
 sourceMap:exhibition.sourceMap,chartCoverage:require('./chart_research').coverage,cards};
fs.writeFileSync(path.join(__dirname,'data/china_history_expanded.json'),JSON.stringify(output,null,2)+'\n');
console.log('Exported '+cards.length+' cards, '+cards.filter(card=>card.image).length+' illustrated.');
