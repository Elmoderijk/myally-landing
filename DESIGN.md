# Ontwerp van myally.nl

Vastgelegd uit de gebouwde site (november 2026). Dit is de stijl die Elmo heeft
gekozen: de donkere wereld van de oude site met Ally de robot, strakker
uitgevoerd. Wijk je af, zeg dan waarom.

## De wereld

- **Nacht.** Bijna-zwarte grond (`--bg` #0A0A0C), sterren in de opening en het
  slot, een violette dageraad onderaan die secties, de nachtfoto met bergen als
  enige grote foto. Een lichte filmkorrel over de hele pagina.
- **Ally.** De robot staat groot in de opening en komt terug bij het slot. Hij
  knippert, deint licht en zijn ogen volgen de muis.
- **Violet is voor actie en voor Ally.** Knoppen (`--violet-knop` #7C4DF0, wit
  erop haalt 5:1), het woord Ally, de stip van de aanwijzer. Niet voor
  versiering, labels of iconen.
- **De spectrumlijn** (roze → lavendel → blauw → cyaan, `--spectrum`) is de
  handtekening: horizon onder de opening, lijn boven tabellen, de route bij
  "Zo gaat het", de streep door "administratie", de rand om wat je aanwijst.
- **Letter.** Geist, zelf gehost. Koppen 600, strak gespatieerd (niet strakker
  dan -0.04em). De kop in de opening is de grootste letter van de pagina.
  Geist Mono alleen voor kloktijden.

## Bouwstenen

- **Appvenster** (`.kader`, `.regie-venster`, `.film`): donker venster met een
  balk (naam, tabblad, klok of status). Hierin laten we de app aan het werk
  zien. Alles erin is een voorbeeld en staat op `aria-hidden`; de tekst ernaast
  vertelt hetzelfde.
- **Tabel** (`.tabel`): kopjes in kleine hoofdletters, spectrumlijn eronder,
  dunne lijnen tussen de rijen. Op de telefoon wordt elke rij een blokje.
- **Koppen in twee tinten:** eerste zin wit, tweede grijs (`.zacht`).
- **Knoppen:** gevuld violet voor de hoofdactie, een dunne rand voor de tweede.

## Beweging

- De opening bouwt zich één keer op bij het laden.
- "Van klantmail tot akkoord": één venster dat blijft staan terwijl je scrolt.
- De rest speelt af **bij aankomst**: zodra een onderdeel goed in beeld staat
  (niet al aan de onderrand), met een vaste duur. Scrol je terug tot erboven,
  dan staat de animatie weer klaar. Elmo wilde dit uitdrukkelijk niet gekoppeld
  aan de scrolpositie.
- De film bij "Wijs aan" speelt alleen terwijl hij in beeld is.
- Wie in zijn systeem "minder beweging" heeft aanstaan, krijgt alles in de
  eindstand.

## Niet doen

- Geen gekleurde gloed om knoppen of achter de robot.
- Geen rijtjes gelijke kaartjes met een icoon erboven.
- Geen kleine labels boven een kop.
- Geen verzonnen cijfers, klantnamen of citaten. Voorbeelden in de vensters
  zijn herkenbaar als voorbeeld.
- Geen prijzen, geen foto van Elmo, geen telefoonnummer (Elmo, november 2026).

## Controleren na een wijziging

Laptop (1440 breed) en telefoon (390 breed): niets schuift zijwaarts, de
hoofdknop staat in het eerste scherm, elk aantikbaar ding is minstens 44 px,
het menu op de telefoon opent en sluit, het venster volgt de vier stappen, de
film loopt tot "Nieuw in je app".
