export const revalidate = 600;
const feeds=[
 ['AI','artificial intelligence technology'],['Markets','stock market economy fed'],['Engineering','engineering technology'],['US & World','top US world news'],['New England','Boston New England news']
];
function text(x:string){return x.replace(/<!\[CDATA\[|\]\]>/g,'').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'\"').trim()}
export async function GET(){
 try{const stories:any[]=[]; for(const [category,q] of feeds){const url=`https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`; const xml=await (await fetch(url,{next:{revalidate:600}})).text(); const items=[...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0,3); for(const m of items){const b=m[1]; const title=text(b.match(/<title>([\s\S]*?)<\/title>/)?.[1]||''); const link=text(b.match(/<link>([\s\S]*?)<\/link>/)?.[1]||''); const pub=text(b.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]||''); if(title) stories.push({category,title,link,pub});}} return Response.json(stories.slice(0,12));}
 catch{return Response.json([{category:'News',title:'Live headlines will appear here when the feed is available.',link:'#',pub:''}]);}
}
