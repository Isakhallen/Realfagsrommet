# Realfagsrommet

Interaktive animasjoner i 3Blue1Brown-stil for matematikk, fysikk, kjemi, biologi, naturfag og geografi på Vg1–Vg3. Emnene følger kompetansemålene i LK20.

Nettstedet er helt statisk: bare HTML, CSS, JavaScript, skrifter og bilder. Det trenger ingen database, ingen innlogging og ingen byggesteg for å kjøre. Alt ligger på samme server, så ingen data sendes til Google eller andre.

## Mappene

| Mappe / fil | Innhold |
| --- | --- |
| `index.html` | Selve nettsiden |
| `assets/js/core.js` | Tegneverktøy, koordinatsystem og tallformat |
| `assets/js/app.js` | Meny, søk, kontroller, tavlemodus og deling |
| `assets/js/moduler/*.js` | Animasjonene, sortert etter fag |
| `assets/js/laereplan.js` | Læreplankartet (kompetansemål og hvilke animasjoner som hører til) |
| `assets/js/temaer.js` | Temaene (kapitlene) hvert fag er delt inn i på forsiden og i menyen |
| `assets/css/site.css` | Utseende |
| `assets/fonter/` | Skrifter (SIL OFL-lisens) |
| `assets/vendor/katex/` | KaTeX for formler (MIT-lisens) |
| `assets/bilder/` | Forhåndsbilder som vises når lenker deles |
| `animasjon/<id>/` | Egen delingsside for hver animasjon (genereres) |
| `sw.js` | Gjør at siden virker uten nett etter første besøk (genereres) |
| `verktoy/` | Skript som lager delingssider, sitemap og bilder |

## Prøve siden på egen maskin

Åpne en terminal i denne mappen og kjør

```
python3 -m http.server 8000
```

Gå så til <http://localhost:8000>. Du kan også dobbeltklikke på `index.html`, men da kan skrifter og formler se litt annerledes ut fordi nettleseren stopper skriftfiler som åpnes direkte fra disken.

## Endre eller legge til en animasjon

Hver animasjon er ett kall til `M({...})` i en av filene i `assets/js/moduler/`. De viktigste feltene:

- `id`: kort kode, for eksempel `fy-kast`. Brukes i lenken.
- `s`: fag (`ma`, `fy`, `ki`, `bi`, `na` eller `ge`).
- `c`: kurs, for eksempel `['FY2']`, `['1T','R1']`, `['BI1']` eller `['GEO']`.
- `title`, `lead`, `about`, `tex`, `tasks`: tekst, formler og oppgaver. Formler skrives i TeX mellom `$`-tegn.
- `controls`: glidebrytere, knapper og avkrysningsbokser. Tallet ved hver glidebryter kan skrives inn direkte. To typer felt lar elevene skrive inn egne ting:
  - `{type:'data', label, get(S), set(S, tekst)}`: egne tall eller tallpar. `set` returnerer en feilmelding som tekst, eller `null` når alt gikk bra. Bruk `parseNums(tekst)` for å lese tallene.
  - `{type:'func', label, get(), set(S, f, tekst)}`: egen funksjon. Teksten tolkes trygt med `parseFx` i `core.js` (ingen `eval`).
- `init`, `update`, `draw`: startverdier, simulering per bilde og tegning.

Når du har lagt til eller endret en animasjon, kjør dette fra denne mappen (krever [Node.js](https://nodejs.org) 18 eller nyere):

```
node verktoy/bygg.mjs
```

Det lager delingssidene, `sitemap.xml` og `sw.js` på nytt. Vil du også ha nye forhåndsbilder for deling, kjør

```
npm install playwright
npx playwright install chromium
node verktoy/lag-bilder.mjs
```

Husk å føre opp nye animasjoner i læreplankartet i `assets/js/laereplan.js` og i riktig tema i `assets/js/temaer.js`. En animasjon kan stå i flere temaer. Står den ikke i noe tema, havner den under «Andre emner».

Et tema kan lenkes direkte, for eksempel `#fag/na/karbon` for naturfagtemaet om syrer, baser og karbonforbindelser.

## Publisere

Nettadressen står i `verktoy/config.json`. Den brukes i forhåndsvisningene når lenker deles. Endrer du adressen, kjør `node verktoy/bygg.mjs` på nytt.

**GitHub Pages:** Legg filene i et offentlig repo, gå til *Settings → Pages*, velg grenen `main` og mappen `/ (root)`. Siden blir liggende på `https://<brukernavn>.github.io/<repo>/`, her <https://isakhallen.github.io/Realfagsrommet/>. På gratiskontoer må repoet være offentlig (Public) for at GitHub Pages skal virke.

**Netlify, Cloudflare Pages eller skolens egen server:** Last opp hele mappen som den er. Det trengs ingen spesielle innstillinger.

## Personvern

Siden bruker ingen informasjonskapsler, ingen analyseverktøy og ingen eksterne tjenester. Avkrysningene i «Prøv dette» lagres bare i elevens egen nettleser (localStorage).

## Lisenser

- KaTeX: MIT-lisens, se `assets/vendor/katex/LICENSE`.
- Skriftene Atkinson Hyperlegible, Newsreader og JetBrains Mono: SIL Open Font License 1.1, se `assets/fonter/LISENS.txt`.
- Koden og innholdet i Realfagsrommet: velg selv en lisens og legg den i en fil som heter `LICENSE` hvis andre skal kunne gjenbruke den.
