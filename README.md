# MyAlly landing site

De marketingsite van MyAlly (myally.nl). Eén statische pagina (HTML, CSS, een klein script), gebundeld met Vite.

## Lokaal starten

```
npm install
npm run dev        # start de ontwikkelserver
npm run build       # bouwt de productieversie (vite build)
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

## Hoe de map in elkaar zit

De site is één statische pagina, zonder framework. Vite bundelt hem alleen
(`npm run build` → `dist/`), nginx serveert het resultaat.

- `index.html` — de hele pagina: alle teksten en de opbouw, sectie voor sectie.
  Een tekst aanpassen doe je hier.
- `src/site.css` — de stijl: kleuren, letters, indeling, animaties. De afspraken
  erachter staan in `DESIGN.md`.
- `src/site.js` — het gedrag: sterren, de ogen van Ally, het meelopende
  appvenster, de film bij "Wijs aan", de schakelaar. Zonder dit script staat
  alles in de eindstand en blijft de pagina leesbaar.
- `src/assets/` — wat de pagina gebruikt: `ally.webp` (de robot), `bergen.webp`
  (de nachtfoto) en `fonts/` (Geist en Geist Mono, zelf gehost, licentie erbij).
- `src/assets/bron/` — de originele afbeeldingen waar de webp-versies van zijn
  gemaakt. Komen niet in de gebouwde site.
- `public/favicon.svg` — het pictogram in het tabblad.
- `Dockerfile` — bouwt de site en verpakt hem met nginx voor uitrol.
- `nginx.conf` — instellingen van de webserver die de gebouwde site serveert.
