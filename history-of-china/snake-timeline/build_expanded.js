// Export the same research and images used by the browser, preserving the original v10 data.
const fs=require('node:fs');
const path=require('node:path');
const {research,pinyin}=require('./research_edition');
const exhibition=require('./beginner_edition')(research,...['early','middle','late'].map(era=>require('./beginner_'+era)));
const images=require('./image_data');
const cards=exhibition.all.map(card=>({...card,pinyin:pinyin[card.nameZh],...(images[card.id]?{image:images[card.id]}:{})}));
const output={edition:'2026-09-06 beginner reading edition',cardCount:cards.length,sourceCount:exhibition.sourceCount,
 sourceMap:exhibition.sourceMap,chartCoverage:require('./chart_research').coverage,cards};
fs.writeFileSync(path.join(__dirname,'data/china_history_expanded.json'),JSON.stringify(output,null,2)+'\n');
console.log('Exported '+cards.length+' cards, '+cards.filter(card=>card.image).length+' illustrated.');
