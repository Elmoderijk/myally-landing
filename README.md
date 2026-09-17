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

## Hoe de map in elkaar zit

- `index.html` — de basispagina; laadt `src/main.tsx`.
- `src/main.tsx` — start de React-app in de pagina.
- `src/App.tsx` — de opbouw van de hele pagina: welke onderdelen in welke
  volgorde, en de teksten/instellingen (koppen, kleuren) bovenaan het bestand.
- `src/components/` — de bouwstenen van de pagina: `Nav.tsx` (navigatiebalk),
  `HeroSection.tsx` (openingsblok met titel), `Sections.tsx` (de overige
  secties: cijfers, functies, hoe-het-werkt, showcase, tijdlijn, vergelijking,
  testimonial, FAQ, prijzen, slot-oproep en footer), `AllyAvatar.tsx` (de
  Ally-figuur), `Atoms.tsx` (knoppen, iconen, logo, achtergronden),
  `ScrollEffects.tsx` (scrolgedrag zoals de voortgangsbalk en inzoomanimaties),
  `Polish.tsx` (eigen cursor, korrelfilter), `CommandPalette.tsx`
  (het opdrachtvenster/sneltoetsmenu).
- `src/styles/global.css` — kleuren, lettertype en basisstijl voor de site.
- `src/assets/` — afbeeldingen en logo's die de pagina gebruikt.
- `Dockerfile` — bouwt de site en verpakt hem met nginx voor uitrol.
- `nginx.conf` — instellingen van de webserver die de gebouwde site serveert.
