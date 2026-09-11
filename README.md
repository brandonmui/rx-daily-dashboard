# RX Daily Dashboard

Starter personal dashboard for `dashboard.rxphotography.net`.

## Included
- Responsive dark-mode dashboard
- Weather via Open-Meteo (no API key)
- Market snapshot + watchlist via a server route
- News categories via RSS
- Google Calendar placeholder
- Tasks placeholder
- Quick links

## Run locally
1. Install Node.js 20+.
2. In this folder run: `npm install`
3. Run: `npm run dev`
4. Open http://localhost:3000

## Deploy to Vercel
1. Create a GitHub repository and upload/push this project.
2. In Vercel, choose **New Project** and import the repository.
3. Deploy with the default Next.js settings.
4. In Vercel: Project > Settings > Domains > add `dashboard.rxphotography.net`.
5. Vercel will show the exact DNS record required.
6. In GoDaddy DNS for `rxphotography.net`, add that CNAME record (host/name normally `dashboard`).

## Customize stocks
Edit `app/api/stocks/route.ts` and change the `symbols` array.

## Next upgrades
- Google Calendar OAuth and live events
- Authentication for private access
- Persistent tasks
- Personalized news controls
- Better financial market provider/API
- Gmail summary, commute, sports, portfolio, reminders

## Notes
The stock endpoint uses a public Yahoo Finance chart endpoint. It is convenient for a prototype but is not an official contractual market-data API. For a long-term production dashboard, move to a supported provider such as Finnhub, Polygon, Twelve Data, Alpha Vantage, etc.
