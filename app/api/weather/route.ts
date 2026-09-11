export const revalidate = 900;
export async function GET(){
  const lat=42.5998, lon=-71.3673;
  const u=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FNew_York&forecast_days=4`;
  try{const r=await fetch(u,{next:{revalidate:900}}); if(!r.ok) throw new Error(); return Response.json(await r.json());}
  catch{return Response.json({error:true,current:{temperature_2m:72,apparent_temperature:72,weather_code:1,wind_speed_10m:5},daily:{time:[],temperature_2m_max:[],temperature_2m_min:[],weather_code:[]}})}
}
