/* Oppgaver i tre nivåer til matematikkanimasjonene. Lastes først når en matematikkanimasjon åpnes.
   OPPG(id,{lett,middels,vanskelig}): hver oppgave er {q:'oppgaven', hint:'hint', losning:['avsnitt', ...]}.
   Formler i $...$, egne formellinjer i $$...$$. Se app.js (showTasks). */

/* ---------- Andregradsfunksjoner ---------- */
OPPG('ma-andregrad',{
lett:[
 {q:'Start med $a=1$, $b=-2$ og $c=-3$ (det er startverdiene). Les av nullpunktene og bunnpunktet. Hvor ligger symmetrilinjen i forhold til nullpunktene?',
  hint:'Nullpunktene er de røde punktene, og symmetrilinjen er den gule stiplede linjen. Finn tallet midt mellom de to nullpunktene.',
  losning:['Nullpunktene er $x=-1$ og $x=3$, og bunnpunktet er $(1,-4)$.',
   'Symmetrilinjen er $x=1$. Den ligger midt mellom nullpunktene: $\\frac{-1+3}{2}=1$.',
   'Det gjelder alltid. Parabelen er symmetrisk, så nullpunktene ligger like langt fra symmetrilinjen på hver side.']},
 {q:'Behold $a=1$ og $b=-2$, og juster $c$ til parabelen så vidt berører $x$-aksen. Hva er $c$ og $D$ da? Hvor mange nullpunkter har grafen?',
  hint:'Følg med på tallet for $D$ øverst til venstre mens du drar i $c$.',
  losning:['Parabelen berører $x$-aksen når $c=1$. Da er $D=(-2)^2-4\\cdot1\\cdot1=0$.',
   'Grafen har ett nullpunkt, $x=1$. Funksjonen er $f(x)=x^2-2x+1=(x-1)^2$.',
   'Når $D=0$, er rota i abc-formelen null. Da gir $\\pm$ samme tall, og likningen har bare én løsning.']},
 {q:'Sett $b=-2$ og $c=-3$. Gjør $a$ mindre og mindre, helt ned mot 0. Hva skjer med grafen? Hva skjer når $a$ blir negativ?',
  hint:'Se både på formen til grafen og på hvor bunnpunktet og nullpunktene blir av. Hva slags graf har $f(x)=bx+c$?',
  losning:['Parabelen blir videre og flatere, og bunnpunktet flytter seg langt ut til høyre og nedover. Det ene nullpunktet forsvinner ut av bildet, og det andre nærmer seg $x=-1{,}5$.',
   'Når $a=0$, er det ikke en andregradsfunksjon lenger. Da blir $f(x)=-2x-3$, en rett linje som skjærer $x$-aksen i $x=-1{,}5$.',
   'Når $a$ blir negativ, vender parabelen den hule siden ned og får et toppunkt i stedet for et bunnpunkt.']}
],
middels:[
 {q:'Lag en parabel som har nullpunkter i $x=-2$ og $x=1$ og vender den hule siden ned. Hvilke verdier har $a$, $b$ og $c$? Finnes det flere svar?',
  hint:'En andregradsfunksjon med nullpunktene $x_1$ og $x_2$ kan skrives $f(x)=a(x-x_1)(x-x_2)$. Velg en negativ $a$, og gang ut parentesene.',
  losning:['$$f(x)=a(x+2)(x-1)=a(x^2+x-2)$$',
   'Med $a=-1$ blir $f(x)=-x^2-x+2$, altså $a=-1$, $b=-1$ og $c=2$.',
   'Det finnes uendelig mange svar. Alle negative verdier av $a$ virker, for eksempel $a=-2$, $b=-2$ og $c=4$. Generelt er $b=a$ og $c=-2a$. I animasjonen kan $c$ være høyst 6, så der virker alle $a$ fra $-3$ opp mot 0.']},
 {q:'Sett $b=4$ og $c=2$. For hvilken verdi av $a$ berører grafen akkurat $x$-aksen? For hvilke verdier av $a$ har grafen to nullpunkter? Regn ut med diskriminanten, og sjekk.',
  hint:'Skriv opp $D=b^2-4ac$ med $b=4$ og $c=2$. Grafen berører $x$-aksen når $D=0$, og har to nullpunkter når $D>0$.',
  losning:['$$D=4^2-4\\cdot a\\cdot 2=16-8a$$',
   '$D=0$ gir $a=2$. Da er $f(x)=2x^2+4x+2=2(x+1)^2$, og grafen berører $x$-aksen i $x=-1$.',
   '$D>0$ gir $16-8a>0$, altså $a<2$. Men $a=0$ gir en rett linje med bare ett nullpunkt, så svaret er $a<2$ og $a\\neq 0$.',
   'For $a>2$ er $D<0$, og grafen har ingen nullpunkter.']},
 {q:'Sett $a=2$, $b=4$ og $c=-1$. Skriv funksjonen på formen $f(x)=a(x-p)^2+q$. Hva forteller $p$ og $q$ om grafen? Sjekk mot bunnpunktet i animasjonen.',
  hint:'Du kan bruke $p=-\\frac{b}{2a}$ og $q=f(p)$, eller fullføre kvadratet. Begynn med $2x^2+4x=2(x^2+2x)$.',
  losning:['$p=-\\frac{4}{2\\cdot 2}=-1$ og $q=f(-1)=2-4-1=-3$, så $$f(x)=2(x+1)^2-3$$',
   'Med fullstendig kvadrat: $2x^2+4x-1=2(x^2+2x+1)-2-1=2(x+1)^2-3$.',
   'Bunnpunktet er $(p,q)=(-1,-3)$, og det stemmer med animasjonen. Grafen er parabelen $y=2x^2$ flyttet 1 til venstre og 3 ned.']}
],
vanskelig:[
 {q:'Sett $a=1$ og $c=-3$, og dra i $b$. Bunnpunktet beveger seg langs en kurve. Finn likningen for kurven. (Tips: den er også en parabel.)',
  hint:'Bunnpunktet er $\\left(-\\frac{b}{2a},\\ c-\\frac{b^2}{4a}\\right)$. Kall førstekoordinaten $x$, løs for $b$, og sett inn i andrekoordinaten.',
  losning:['Med $a=1$ og $c=-3$ er bunnpunktet $\\left(-\\frac{b}{2},\\ -3-\\frac{b^2}{4}\\right)$.',
   'Sett $x=-\\frac{b}{2}$. Da er $b=-2x$, og andrekoordinaten blir $$y=-3-\\frac{(-2x)^2}{4}=-3-x^2$$',
   '<strong>Svar:</strong> Bunnpunktet følger parabelen $y=-x^2-3$. Sjekk: $b=-2$ gir bunnpunktet $(1,-4)$, og $-(1)^2-3=-4$.',
   'Gjør du det samme generelt, får du $y=c-ax^2$. Kurven har motsatt $a$ og samme $c$ som parabelen selv.']},
 {q:'Finn tre forskjellige parabler som går gjennom punktet $(0,4)$ og akkurat berører $x$-aksen. Hvilken sammenheng må det være mellom $a$ og $b$? Hvor berører de $x$-aksen?',
  hint:'Punktet $(0,4)$ bestemmer $c$. At grafen akkurat berører $x$-aksen, betyr at $D=0$.',
  losning:['Grafen går gjennom $(0,4)$, så $c=4$.',
   'Den berører $x$-aksen når $D=b^2-4\\cdot a\\cdot 4=0$, altså når $$a=\\frac{b^2}{16}$$',
   'Eksempler: $b=4$ gir $a=1$ og $f(x)=(x+2)^2$. $b=-4$ gir $a=1$ og $f(x)=(x-2)^2$. $b=2$ gir $a=0{,}25$ og $f(x)=0{,}25(x+4)^2$. Skriv inn 0,25 i tallfeltet for $a$.',
   'Berøringspunktet er bunnpunktet: $x=-\\frac{b}{2a}=-\\frac{b}{2\\cdot b^2/16}=-\\frac{8}{b}$. Større $|b|$ gir en smalere parabel som berører $x$-aksen nærmere origo. Alle parablene vender den hule siden opp, fordi $a=\\frac{b^2}{16}$ alltid er positiv.']},
 {q:'For hvilke verdier av $c$ har $f(x)=x^2+4x+c$ to, ett eller ingen nullpunkter? Finn svaret på to måter: med diskriminanten og ved å se på bunnpunktet. Forklar hvorfor svarene henger sammen.',
  hint:'Når du endrer $c$, flytter grafen seg rett opp eller ned. Hvor ligger bunnpunktet, og hva må gjelde for andrekoordinaten for at grafen skal skjære $x$-aksen?',
  losning:['Med diskriminanten: $D=16-4c$. Grafen har to nullpunkter når $c<4$, ett når $c=4$ og ingen når $c>4$.',
   'Med bunnpunktet: $p=-\\frac{4}{2}=-2$ og $q=f(-2)=4-8+c=c-4$. Parabelen vender den hule siden opp. Den skjærer $x$-aksen to ganger når bunnpunktet ligger under aksen ($c<4$), berører aksen når bunnpunktet ligger på den ($c=4$), og når ikke ned til aksen når bunnpunktet ligger over ($c>4$).',
   'Svarene henger sammen fordi $q=c-\\frac{b^2}{4a}=-\\frac{D}{4a}$. Når $a>0$, er $q$ negativ nøyaktig når $D$ er positiv.']}
]
});
