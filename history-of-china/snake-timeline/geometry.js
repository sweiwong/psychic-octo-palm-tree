/* A single arc-length scale, shared by ribbons, points, and labels.
 * BCE -1 and CE 1 are adjacent years. Turns consume time at the same rate as straights.
 */
const SnakeGeometry = (()=>{
  const ordinal=y=>y<0?y+1:y;
  function create(width,{startYear=-2070,endYear=2026}={}){
    const start=ordinal(startYear),end=ordinal(endYear);
    const focused=startYear!==-2070||endYear!==2026;
    const targetLength=focused?Math.max(2200,5100*(end-start)/(ordinal(2026)-ordinal(-2070))):5100;
    const radius=78,left=radius+48,right=width-left,straight=right-left;
    const rows=Math.max(focused?3:5,Math.ceil(targetLength/(straight+Math.PI*radius)));
    const edgeInset=left-radius,firstLeft=edgeInset,firstExtra=radius,lastExtra=radius;
    const rowStart=row=>row===0?0:firstExtra+row*(straight+Math.PI*radius);
    const rowSpan=row=>straight+(row===0?firstExtra:0)+(row===rows-1?lastExtra:0);
    const top=110,length=firstExtra+lastExtra+rows*straight+(rows-1)*Math.PI*radius,height=top+(rows-1)*radius*2+110;
    function distance(year){return Math.max(0,Math.min(length,(ordinal(year)-start)/(end-start)*length));}
    function at(d,offset=0){
      d=Math.max(0,Math.min(length,d));
      for(let row=0;row<rows;row++){
        const direction=row%2===0?1:-1,y=top+row*radius*2,span=rowSpan(row);
        if(d<=span||row===rows-1)return{x:(row===0?firstLeft:direction===1?left:right)+direction*d,y:y+direction*offset,tx:direction,ty:0,row};
        d-=span;
        if(d<=Math.PI*radius){
          const a=d/radius,cx=direction===1?right:left,cy=y+radius;
          const tx=direction*Math.cos(a),ty=Math.sin(a);
          return{x:cx+direction*radius*Math.sin(a)-ty*offset,y:cy-radius*Math.cos(a)+tx*offset,tx,ty,row};
        }
        d-=Math.PI*radius;
      }
    }
    const point=(year,offset=0)=>at(distance(year),offset);
    function path(a=startYear,b=endYear,offset=0){
      const da=distance(a),db=distance(b),steps=Math.max(1,Math.ceil((db-da)/3));
      return Array.from({length:steps+1},(_,i)=>{const p=at(da+(db-da)*i/steps,offset);return`${i?'L':'M'}${p.x.toFixed(2)},${p.y.toFixed(2)}`;}).join(' ');
    }
    return{width,height,rows,length,radius,straight,top,left,right,edgeInset,firstLeft,firstExtra,lastExtra,startYear,endYear,rowStart,rowSpan,distance,at,point,path};
  }
  return{create,ordinal};
})();
if(typeof module!=='undefined')module.exports=SnakeGeometry;
