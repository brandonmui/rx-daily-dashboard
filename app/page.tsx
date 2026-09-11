'use client';
import {useEffect,useState} from 'react';
import {CloudSun, Newspaper, TrendingUp, CalendarDays, CheckSquare, ExternalLink, RefreshCw} from 'lucide-react';

type Stock={symbol:string;price:number;change:number}; type Story={category:string;title:string;link:string;pub:string};
const nice:{[k:string]:string}={'^GSPC':'S&P 500','^IXIC':'Nasdaq','^DJI':'Dow','BTC-USD':'Bitcoin'};
const weatherText=(c:number)=> c===0?'Clear':c<=3?'Partly cloudy':c<=48?'Fog':c<=67?'Rain':c<=77?'Snow':c<=82?'Showers':'Storms';
function Card({title,icon,children,className=''}:{title:string;icon:React.ReactNode;children:React.ReactNode;className?:string}){return <section className={`card ${className}`}><div className="cardTitle"><span>{icon}</span><h2>{title}</h2></div>{children}</section>}
export default function Home(){
 const [stocks,setStocks]=useState<Stock[]>([]),[news,setNews]=useState<Story[]>([]),[weather,setWeather]=useState<any>(null),[now,setNow]=useState(new Date()); const [loading,setLoading]=useState(false);
 const load=async()=>{setLoading(true); try{const [s,n,w]=await Promise.all([fetch('/api/stocks').then(r=>r.json()),fetch('/api/news').then(r=>r.json()),fetch('/api/weather').then(r=>r.json())]);setStocks(s);setNews(n);setWeather(w)}finally{setLoading(false)}};
 useEffect(()=>{load();const t=setInterval(()=>setNow(new Date()),30000);return()=>clearInterval(t)},[]);
 const market=stocks.filter(s=>['^GSPC','^IXIC','^DJI','BTC-USD'].includes(s.symbol)), watch=stocks.filter(s=>!['^GSPC','^IXIC','^DJI','BTC-USD'].includes(s.symbol));
 return <main><header><div><div className="eyebrow">RX DAILY</div><h1>Good {now.getHours()<12?'morning':now.getHours()<17?'afternoon':'evening'}, Brandon.</h1><p>{now.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})} · {now.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}</p></div><button onClick={load} className="refresh"><RefreshCw size={16} className={loading?'spin':''}/> Refresh</button></header>
 <div className="grid">
  <Card title="Weather" icon={<CloudSun size={20}/>}><div className="weather"><strong>{Math.round(weather?.current?.temperature_2m??0)}°</strong><div><b>{weatherText(weather?.current?.weather_code??0)}</b><span>Feels like {Math.round(weather?.current?.apparent_temperature??0)}° · Chelmsford, MA</span></div></div></Card>
  <Card title="Market Snapshot" icon={<TrendingUp size={20}/>}><div className="marketGrid">{market.map(s=><div key={s.symbol}><span>{nice[s.symbol]||s.symbol}</span><b>{s.price? (s.symbol==='BTC-USD'?'$'+Math.round(s.price).toLocaleString():s.price.toLocaleString(undefined,{maximumFractionDigits:2})):'—'}</b><em className={s.change>=0?'up':'down'}>{s.price?(s.change>=0?'+':'')+s.change.toFixed(2)+'%':'Live data unavailable'}</em></div>)}</div></Card>
  <Card title="Today" icon={<CalendarDays size={20}/>}><div className="empty"><b>Google Calendar ready to connect</b><span>Your meetings, school events and sports schedule will appear here.</span><button disabled>Connect Calendar</button></div></Card>
  <Card title="Watchlist" icon={<TrendingUp size={20}/>}><div className="watch">{watch.map(s=><div key={s.symbol}><b>{s.symbol}</b><span>{s.price?'$'+s.price.toFixed(2):'—'}</span><em className={s.change>=0?'up':'down'}>{s.price?(s.change>=0?'+':'')+s.change.toFixed(2)+'%':'—'}</em></div>)}</div><small>Edit the symbols in <code>app/api/stocks/route.ts</code>.</small></Card>
  <Card title="Top Stories" icon={<Newspaper size={20}/>} className="wide"><div className="stories">{news.slice(0,10).map((s,i)=><a href={s.link} target="_blank" rel="noreferrer" key={i}><span>{s.category}</span><b>{s.title}</b><ExternalLink size={14}/></a>)}</div></Card>
  <Card title="Today's Priorities" icon={<CheckSquare size={20}/>}><div className="tasks">{['Review today’s calendar','Check top market/news developments','Add first personal task integration'].map(x=><label key={x}><input type="checkbox"/>{x}</label>)}</div></Card>
  <Card title="Quick Links" icon={<ExternalLink size={20}/>}><div className="links"><a href="https://chatgpt.com" target="_blank">ChatGPT</a><a href="https://mail.google.com" target="_blank">Gmail</a><a href="https://calendar.google.com" target="_blank">Calendar</a><a href="https://www.rxphotography.net" target="_blank">RX Photography</a></div></Card>
 </div><footer>RX Daily · Starter v0.1 · Built to grow</footer></main>
}
