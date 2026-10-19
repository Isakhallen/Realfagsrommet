# Realfagsrommet

Interaktive animasjoner i 3Blue1Brown-stil for matematikk, fysikk, kjemi, biologi, naturfag og geografi på Vg1–Vg3. Emnene følger kompetansemålene i LK20.

Nettstedet er helt statisk: bare HTML, CSS, JavaScript, skrifter og bilder. Det trenger ingen database, ingen innlogging og ingen byggesteg for å kjøre. Skrifter og formelverktøy ligger på samme server. Bare besøkstellingen (GoatCounter) og tilbakemeldingene (Cloudflare) bruker eksterne tjenester, se [Personvern](#personvern).

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
| `verktoy/` | Skript som lager delingssider, sitemap og bilder, og som henter tilbakemeldinger |
| `verktoy/tilbakemelding/` | Mottaket for tilbakemeldinger (Cloudflare Worker) og oppsettet for det |

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

Nettstedet ligger på <https://realfagsrommet.no>. Domenet er kjøpt hos Domeneshop og peker til GitHub Pages: fire A-oppføringer for `@` (185.199.108.153, 185.199.109.153, 185.199.110.153 og 185.199.111.153) og en CNAME-oppføring for `www` til `isakhallen.github.io`. Fila `CNAME` i roten forteller GitHub Pages hvilket domene som brukes. Under *Settings → Pages* skal **Enforce HTTPS** være huket av, ellers vises siden som «Ikke sikker». Sertifikatet skal gjelde både `realfagsrommet.no` og `www.realfagsrommet.no`. Mangler `www`, fjern domenet under *Custom domain*, legg det inn igjen og vent til sertifikatet er laget.

Nettadressen står i `verktoy/config.json`. Den brukes i forhåndsvisningene når lenker deles. Endrer du adressen, kjør `node verktoy/bygg.mjs` på nytt.

**GitHub Pages:** Legg filene i et offentlig repo, gå til *Settings → Pages*, velg grenen `main` og mappen `/ (root)`. Siden blir liggende på `https://<brukernavn>.github.io/<repo>/`, her <https://isakhallen.github.io/Realfagsrommet/>. På gratiskontoer må repoet være offentlig (Public) for at GitHub Pages skal virke.

**Netlify, Cloudflare Pages eller skolens egen server:** Last opp hele mappen som den er. Det trengs ingen spesielle innstillinger.

## Besøkstall

Besøk telles med [GoatCounter](https://www.goatcounter.com). Tallene ligger på <https://isakhallen.goatcounter.com>.

Skriptet står nederst i `<head>` i `index.html`. Siden bytter innhold via `#`-lenker, så skriptet lastes med `no_onload`, og `countView()` i `app.js` teller hver visning selv. I oversikten heter forsiden `/`, en animasjon for eksempel `/#fy-kast`, læreplankartet `/#laereplan` og et tema `/#fag/na/karbon`. Delingssidene i `animasjon/<id>/` sender videre til `/#<id>` og telles der.

GoatCounter teller ikke når siden kjører på `localhost`, så prøving på egen maskin havner ikke i tallene.

## Tilbakemeldinger

Knappene «Send tilbakemelding» (i bunnteksten) og «Si fra om denne animasjonen» (under oppgavene) åpner et skjema der elever og lærere kan melde feil eller komme med forslag. Med meldingen følger animasjonen, verdiene i den, adressen og nettleseren, så feil blir lettere å finne igjen. E-postadresse er valgfritt.

Meldingene lagres i et lite mottak på Cloudflare (gratis): koden ligger i `verktoy/tilbakemelding/worker.js`. Du leser dem ved å hente dem ned til fila `tilbakemeldinger.md` her i mappen:

```
node verktoy/hent-tilbakemeldinger.mjs
```

Åpne `tilbakemeldinger.md` i VS Code (Ctrl+Shift+V viser den pent). Nyeste melding står først, og meldinger som har kommet siden forrige henting er merket **Ny**. Fila lages på nytt hver gang, så skriv ikke egne notater i den. Den står i `.gitignore` og blir aldri publisert.

### Sette opp mottaket (én gang)

1. Lag en gratis konto på <https://dash.cloudflare.com/sign-up>.
2. Kjør dette fra denne mappen:

   ```
   node verktoy/tilbakemelding/sett-opp.mjs
   ```

   Skriptet åpner nettleseren så du kan logge inn hos Cloudflare, laster opp mottaket, lager lageret og en lesenøkkel (`verktoy/tilbakemelding/nokkel.txt`), og skriver adressen til mottaket inn i `index.html`. Spør det om en workers.dev-adresse, svar ja.
3. Publiser nettsiden. Knappene vises først når adressen står i `index.html`.

Kjør skriptet på nytt hvis du endrer `worker.js`. Lesenøkkelen er det eneste som gir tilgang til meldingene. Den står i `.gitignore`, så ikke del den. Mister du den, slett `nokkel.txt` og kjør skriptet igjen.

Mottaket tar bare imot meldinger fra realfagsrommet.no (og `localhost` for testing), og høyst 20 i timen fra samme nettverk. Vil du slette meldinger, gjør du det i Cloudflare-oversikten under *Storage & Databases → Workers KV*.

## Personvern

Siden bruker ingen informasjonskapsler og ingen innlogging. Avkrysningene i «Prøv dette» lagres bare i elevens egen nettleser (localStorage).

- **GoatCounter** lagrer bare samlede tall (sider, henvisninger, nettleser, skjermstørrelse og land), ikke IP-adresser eller hvem som er inne.
- **Tilbakemeldinger** lagres hos Cloudflare: det som skrives i skjemaet, sammen med animasjonen, adressen og nettleseren. IP-adresser lagres ikke. Bare den som har lesenøkkelen, kan hente meldingene. Skjemaet ber elevene om ikke å skrive navn eller andre personopplysninger, og e-postadresse er valgfritt.

## Lisenser

- KaTeX: MIT-lisens, se `assets/vendor/katex/LICENSE`.
- Skriftene Atkinson Hyperlegible, Newsreader og JetBrains Mono: SIL Open Font License 1.1, se `assets/fonter/LISENS.txt`.
- Koden og innholdet i Realfagsrommet: velg selv en lisens og legg den i en fil som heter `LICENSE` hvis andre skal kunne gjenbruke den.
