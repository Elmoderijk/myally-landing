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

## Vindbaarheid (SEO)

- Alleen `myally.nl` mag in Google. `nginx.conf` geeft elke andere naam
  (acceptatie, een Coolify-adres) een `X-Robots-Tag: noindex`; `www.myally.nl`
  stuurt blijvend (301) door naar `https://myally.nl`. Na elke release nagaan
  dat `myally.nl` géén `X-Robots-Tag` stuurt.
- Een onbekend adres geeft een echte 404 (`public/404.html`); `/health`
  antwoordt zelf met `ok`.
- `public/robots.txt` en `public/sitemap.xml`: bij een nieuwe pagina de
  sitemap bijwerken.
- Deelplaatje `public/og-2026-11.jpg` (1200×630) is een afdruk van
  `src/assets/bron/deelplaatje.html`. Nieuw plaatje = nieuwe bestandsnaam
  (nginx laat plaatjes een jaar in de cache staan) en `og:image` aanpassen.
- Bedrijfsgegevens voor Google staan als JSON-LD in de kop van `index.html`.
  Alleen wat waar is: KvK en adres pas als ze er zijn.

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
