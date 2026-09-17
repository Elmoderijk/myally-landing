# MyAlly landing site

De marketingsite van MyAlly (myally.nl). Gebouwd met Vite + React (TypeScript).

## Lokaal starten

```
npm install
npm run dev        # start de ontwikkelserver
npm run build       # bouwt de productieversie (tsc -b && vite build)
npm run preview     # bekijk de gebouwde versie lokaal
```

## Uitrol

- Tak `acceptance` staat live op acceptatie: https://myally-acc.myally.nl
- Tak `main` is productie. Wijzigingen komen daar alleen via een release —
  nooit rechtstreeks naar `main` pushen.

## Controle bij elke push

GitHub draait bij elke push (en pull request) de workflow "Bouwt"
(`.github/workflows/bouwt.yml`). Die installeert de dependencies (`npm ci`)
en voert `npm run build` uit — dezelfde bouwstap als de Dockerfile gebruikt.
Zo is gegarandeerd dat elke versie tenminste nog bouwt, voordat hij ergens
wordt uitgerold.
