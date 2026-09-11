export const revalidate = 60;
const symbols=['^GSPC','^IXIC','^DJI','BTC-USD','AAPL','NVDA','RDDT'];
export async function GET(){
 try{
  const out=await Promise.all(symbols.map(async s=>{
   const url=`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(s)}?range=2d&interval=1d`;
   const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0'},next:{revalidate:60}}); if(!r.ok) throw new Error();
   const j=await r.json(); const z=j.chart.result?.[0]; const m=z?.meta||{}; const q=z?.indicators?.quote?.[0]?.close?.filter((x:number|null)=>x!=null)||[];
   const price=m.regularMarketPrice ?? q.at(-1) ?? 0; const prev=m.chartPreviousClose ?? q.at(-2) ?? price; const change=prev?((price-prev)/prev)*100:0;
   return {symbol:s,price,change};
  })); return Response.json(out);
 }catch{return Response.json([{symbol:'^GSPC',price:0,change:0},{symbol:'^IXIC',price:0,change:0},{symbol:'^DJI',price:0,change:0},{symbol:'BTC-USD',price:0,change:0},{symbol:'AAPL',price:0,change:0},{symbol:'NVDA',price:0,change:0},{symbol:'RDDT',price:0,change:0}]);}
}
