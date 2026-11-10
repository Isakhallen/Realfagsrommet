/* Oppgaver i tre nivåer til fysikkanimasjonene. Lastes først når en fysikkanimasjon åpnes.
   OPPG(id,{lett,middels,vanskelig}): hver oppgave er {q:'oppgaven', hint:'hint', losning:['avsnitt', ...]}.
   Formler i $...$, egne formellinjer i $$...$$. Se app.js (showTasks). */

/* ---------- Skrått kast ---------- */
OPPG('fy-kast',{
lett:[
 {q:'Kast med 20 m/s og 45° på Jorda. Følg den blå og den gule pilen mens ballen flyr. Hvilken pil endrer lengde, og hvilken er like lang hele tiden? Hvor stor er $v_y$ i toppunktet?',
  hint:'Se på tallene for $v_x$ og $v_y$ i panelet til høyre mens ballen er i lufta. Tenk på hvilken retning tyngdekraften virker i.',
  losning:['Den blå pilen ($v_x$) er like lang hele veien: $v_x=20\\cos 45^\\circ\\approx 14{,}1$ m/s. Den gule pilen ($v_y$) blir kortere på vei opp, forsvinner i toppunktet og vokser igjen nedover på vei ned.',
   'Grunnen er at tyngdekraften bare virker loddrett. Den endrer $v_y$, men ikke $v_x$.',
   '<strong>Svar:</strong> I toppunktet er $v_y=0$. Ballen står likevel ikke stille. Den har fortsatt farten $v_x\\approx 14{,}1$ m/s vannrett.']},
 {q:'Gjett først: Hvor mange ganger så langt kommer ballen på Månen som på Jorda med samme fart og vinkel? Sjekk med animasjonen.',
  hint:'Les av $R$ (teori) på Jorda og på Månen, og del det ene tallet på det andre. Sammenlign med forholdet mellom tyngdeakselerasjonene, 9,81 og 1,62 m/s².',
  losning:['Med 20 m/s og 45° viser animasjonen $R\\approx 40{,}8$ m på Jorda og $R\\approx 246{,}9$ m på Månen. Det er omtrent 6 ganger så langt.',
   'Det stemmer med formelen $R=\\frac{v_0^2\\sin 2\\alpha}{g}$. Her er $R$ omvendt proporsjonal med $g$. Tyngdeakselerasjonen på Månen er $\\frac{9{,}81}{1{,}62}\\approx 6{,}1$ ganger mindre, så kastet blir 6,1 ganger så langt.',
   '<strong>Svar:</strong> Omtrent 6 ganger så langt. Ballen kommer også 6 ganger så høyt og er 6 ganger så lenge i lufta.']},
 {q:'Kast med 20 m/s og 30°, og så med 20 m/s og 60°. De svake kurvene viser de forrige kastene. Hva er likt med de to kastene, og hva er forskjellig?',
  hint:'Sammenlign hvor langt ballen kommer, hvor høyt den kommer og hvor lenge den er i lufta. Les av $t$ i panelet rett etter at ballen har landet.',
  losning:['Begge kastene lander omtrent 35,3 m unna. Det er det som er likt.',
   'Kastet med 60° går mye høyere (15,3 m mot 5,1 m) og er lenger i lufta (3,5 s mot 2,0 s). Kastet med 30° har større vannrett fart ($v_x=17{,}3$ m/s mot 10,0 m/s), så det kommer like langt på kortere tid.',
   'Hvorfor rekkevidden blir lik, finner du ut i den første middels-oppgaven.']}
],
middels:[
 {q:'30° og 60° gir like langt kast. Finn to andre vinkler som også gir like langt kast. Vis med formelen for $R$ at $\\alpha$ og $90^\\circ-\\alpha$ alltid gir like langt kast uten luftmotstand.',
  hint:'I formelen står $\\sin 2\\alpha$. Hva blir $2(90^\\circ-\\alpha)$? Bruk at $\\sin(180^\\circ-x)=\\sin x$.',
  losning:['For eksempel gir 20° og 70° like langt kast, og det samme gjør 10° og 80°.',
   'Sett inn $90^\\circ-\\alpha$ i formelen: $$R=\\frac{v_0^2\\sin\\big(2(90^\\circ-\\alpha)\\big)}{g}=\\frac{v_0^2\\sin(180^\\circ-2\\alpha)}{g}=\\frac{v_0^2\\sin 2\\alpha}{g}$$',
   'Det er det samme uttrykket som for vinkelen $\\alpha$. Lengst kast får du når $\\sin 2\\alpha=1$, altså når $\\alpha=45^\\circ$. Derfor ligger vinkelparene symmetrisk rundt 45°.']},
 {q:'En ball kastes med 15 m/s og 40°. Regn ut hvor høyt den kommer, og hvor lang tid den er i lufta. Sjekk svarene i animasjonen.',
  hint:'Finn først den loddrette startfarten $v_0\\sin\\alpha$. I toppunktet er $v_y=0$, så tida opp finner du med $v_y=v_0\\sin\\alpha-gt$. Uten luftmotstand er tida ned like lang som tida opp.',
  losning:['Loddrett startfart: $v_{0y}=15\\sin 40^\\circ\\approx 9{,}64$ m/s.',
   'Tida opp til toppunktet, der $v_y=0$: $$t_{\\text{opp}}=\\frac{v_{0y}}{g}=\\frac{9{,}64}{9{,}81}\\approx 0{,}98\\ \\text{s}$$',
   'Høyden: $$h=\\frac{v_{0y}^2}{2g}=\\frac{9{,}64^2}{2\\cdot 9{,}81}\\approx 4{,}7\\ \\text{m}$$',
   'Banen er symmetrisk, så tida i lufta er $2\\cdot 0{,}98\\approx 2{,}0$ s.',
   '<strong>Svar:</strong> Ballen kommer 4,7 m opp og er 2,0 s i lufta. Animasjonen viser $h\\approx 4{,}7$ m og $t\\approx 1{,}97$ s når ballen lander.']},
 {q:'Slå på luftmotstand og bruk 40 m/s. Prøv deg fram og finn vinkelen som gir lengst kast. Er den større eller mindre enn 45°? Forklar hvorfor.',
  hint:'Prøv vinkler mellom 30° og 45°, og skriv ned hvor langt ballen kommer hver gang. Tenk på hvor lenge ballen er i lufta i et bratt kast, og hva luftmotstanden gjør med $v_x$ i den tida.',
  losning:['Med $k/m=0{,}012$ blir kastet lengst ved omtrent 37–40°, rundt 72,5 m. Ved 45° kommer ballen 71,4 m. Den beste vinkelen er altså mindre enn 45°.',
   'Luftmotstanden bremser ballen hele tida den er i lufta, også vannrett. Et bratt kast er lenge i lufta, så luftmotstanden får lang tid til å bremse den vannrette farten. Med lavere vinkel er ballen kortere tid i lufta og beholder mer av $v_x$.',
   'Legg merke til at banen ikke er symmetrisk lenger. Ballen faller brattere ned enn den gikk opp, fordi den har mistet mye av den vannrette farten på veien.']}
],
vanskelig:[
 {q:'Du kaster med 20 m/s på Jorda uten luftmotstand. Hvilke to vinkler gir et kast som lander 30 m unna? Regn ut, og sjekk i animasjonen.',
  hint:'Sett $R=30$ m inn i formelen og løs for $\\sin 2\\alpha$. Likningen $\\sin x=k$ har to løsninger mellom 0° og 180°.',
  losning:['Fra $R=\\frac{v_0^2\\sin 2\\alpha}{g}$ får vi $$\\sin 2\\alpha=\\frac{Rg}{v_0^2}=\\frac{30\\cdot 9{,}81}{20^2}\\approx 0{,}736$$',
   'Det gir $2\\alpha\\approx 47{,}4^\\circ$ eller $2\\alpha\\approx 180^\\circ-47{,}4^\\circ=132{,}6^\\circ$, altså $\\alpha\\approx 23{,}7^\\circ$ eller $\\alpha\\approx 66{,}3^\\circ$.',
   '<strong>Svar:</strong> Omtrent 24° og 66°. Glidebryteren går i hele grader, og begge vinklene gir $R\\approx 30{,}3$ m i animasjonen. Legg merke til at $24^\\circ+66^\\circ=90^\\circ$.']},
 {q:'Vis at forholdet mellom høyden og lengden på kastet er $\\frac{h}{R}=\\frac{\\tan\\alpha}{4}$. Bruk resultatet til å finne vinkelen der ballen kommer like høyt som den kommer langt. Sjekk i animasjonen, også på Månen.',
  hint:'Bruk $h=\\frac{(v_0\\sin\\alpha)^2}{2g}$, og skriv $\\sin 2\\alpha=2\\sin\\alpha\\cos\\alpha$ i formelen for $R$. Del så $h$ på $R$.',
  losning:['Med $\\sin 2\\alpha=2\\sin\\alpha\\cos\\alpha$ blir $R=\\frac{2v_0^2\\sin\\alpha\\cos\\alpha}{g}$. Da er $$\\frac{h}{R}=\\frac{v_0^2\\sin^2\\alpha}{2g}\\cdot\\frac{g}{2v_0^2\\sin\\alpha\\cos\\alpha}=\\frac{\\sin\\alpha}{4\\cos\\alpha}=\\frac{\\tan\\alpha}{4}$$',
   'Ballen kommer like høyt som langt når $h=R$, altså når $\\tan\\alpha=4$. Det gir $\\alpha\\approx 76^\\circ$.',
   'Med 20 m/s og 76° viser animasjonen $R\\approx 19{,}1$ m og $h\\approx 19{,}2$ m. Både $v_0$ og $g$ forsvinner fra forholdet, så det gjelder for alle startfarter og også på Månen.']},
 {q:'Kast med 40 m/s og 45°, først uten og så med luftmotstand ($k/m=0{,}012$). Hvor mange prosent kortere blir kastet? Gjør det samme med 10 m/s. Forklar forskjellen ved å sammenligne luftmotstanden med tyngdekraften.',
  hint:'I modellen er luftmotstanden per kilo $\\frac{F_L}{m}=\\frac{k}{m}v^2$. Regn ut dette rett etter utkastet for 10 m/s og for 40 m/s, og sammenlign med $g=9{,}81$ m/s².',
  losning:['Med 40 m/s går kastet fra 163,1 m til 71,4 m, omtrent 56 % kortere. Med 10 m/s går det fra 10,2 m til 9,3 m, bare omtrent 9 % kortere.',
   'Rett etter utkastet er luftmotstanden per kilo $0{,}012\\cdot 40^2\\approx 19$ m/s² ved 40 m/s. Det er nesten dobbelt så mye som $g$. Ved 10 m/s er den $0{,}012\\cdot 10^2=1{,}2$ m/s², bare en åttendedel av $g$.',
   'Luftmotstanden øker med kvadratet av farten. Når farten blir fire ganger så stor, blir luftmotstanden 16 ganger så stor. Derfor er modellen uten luftmotstand god for langsomme kast, men dårlig for raske.']}
]
});

/* ---------- Rettlinjet bevegelse ---------- */
OPPG('fy-bevegelse',{
lett:[
 {q:'Velg «Konstant fart». Hvordan ser posisjonsgrafen, fartsgrafen og akselerasjonsgrafen ut? Hvor langt har bilen kjørt etter 5 s?',
  hint:'Se på formen til hver graf: rett linje, vannrett linje eller kurve? Strekningen er arealet under fartsgrafen. Trykk mellomrom for å sette animasjonen på pause.',
  losning:['Bilen kjører med 8 m/s. Posisjonsgrafen er en rett, skrå linje med stigningstall 8 m/s. Fartsgrafen er en vannrett linje på 8 m/s, og akselerasjonsgrafen ligger på 0.',
   'Etter 5 s har bilen kjørt $s=v\\cdot t=8\\cdot 5=40$ m. Det er arealet av rektangelet under fartsgrafen.']},
 {q:'Velg «Konstant akselerasjon» med $v_0=2$ m/s og $a=1{,}5$ m/s² (startverdiene). Hvor mye øker farten hvert sekund? Hvilken fart har bilen etter 4 s?',
  hint:'Sett animasjonen på pause noen ganger og les av $v$. Hva er stigningstallet til fartsgrafen?',
  losning:['Farten øker med 1,5 m/s hvert sekund. Det er akkurat akselerasjonen, og det er stigningstallet til fartsgrafen.',
   'Etter 4 s er farten $v=v_0+at=2+1{,}5\\cdot 4=8$ m/s.']},
 {q:'Velg «Bremsing». Hvilket fortegn har akselerasjonen? Beskriv posisjonsgrafen mens bilen bremser, og forklar hvorfor den flater ut.',
  hint:'Stigningstallet til posisjonsgrafen er farten. Hva skjer med farten mens bilen bremser?',
  losning:['Akselerasjonen er $-2{,}5$ m/s². Den er negativ fordi den peker motsatt vei av farten.',
   'Posisjonsgrafen stiger hele tiden, men blir slakere og slakere. Når bilen står stille, er den vannrett.',
   'Grunnen er at stigningstallet til posisjonsgrafen er farten. Farten blir mindre, så grafen blir slakere. Når farten er null, er stigningstallet null.']}
],
middels:[
 {q:'En bil akselererer jevnt fra 0 til 20 m/s på 8 s. Finn akselerasjonen og strekningen. Sjekk med animasjonen.',
  hint:'Bruk $v=v_0+at$ for å finne $a$. Strekningen kan du finne med $s=v_0t+\\tfrac12at^2$ eller som arealet under fartsgrafen. Velg «Konstant akselerasjon» og sett $v_0=0$ for å sjekke.',
  losning:['$$a=\\frac{v-v_0}{t}=\\frac{20-0}{8}=2{,}5\\ \\text{m/s}^2$$',
   '$$s=\\tfrac12at^2=\\tfrac12\\cdot 2{,}5\\cdot 8^2=80\\ \\text{m}$$',
   'Du kan også regne ut arealet under fartsgrafen, som er en trekant: $\\tfrac12\\cdot 8\\cdot 20=80$ m.',
   '<strong>Svar:</strong> $a=2{,}5$ m/s² og $s=80$ m. Med $v_0=0$ og $a=2{,}5$ m/s² viser animasjonen 20 m/s og 80 m etter 8 s.']},
 {q:'Velg «Bremsing». Bilen starter med 16 m/s og bremser med $a=-2{,}5$ m/s². Hvor langt kjører den før den står stille, og hvor lang tid tar det? Bruk $v^2-v_0^2=2as$.',
  hint:'Når bilen står stille, er $v=0$. Sett inn i formelen og løs for $s$. Tida finner du med $v=v_0+at$.',
  losning:['$$s=\\frac{v^2-v_0^2}{2a}=\\frac{0-16^2}{2\\cdot(-2{,}5)}=51{,}2\\ \\text{m}$$',
   '$$t=\\frac{v-v_0}{a}=\\frac{0-16}{-2{,}5}=6{,}4\\ \\text{s}$$',
   '<strong>Svar:</strong> 51,2 m og 6,4 s. Det stemmer med animasjonen.']},
 {q:'Velg «Konstant akselerasjon» med $v_0=2$ m/s og $a=1{,}5$ m/s². Regn ut arealet under fartsgrafen fra 0 til 6 s som et trapes. Sammenlign med strekningen i animasjonen og med $s=v_0t+\\tfrac12at^2$.',
  hint:'Finn farten etter 6 s først. Arealet av et trapes er gjennomsnittet av de to parallelle sidene ganget med bredden.',
  losning:['Etter 6 s er farten $v=2+1{,}5\\cdot 6=11$ m/s.',
   'Arealet under fartsgrafen er et trapes med sidene 2 og 11 og bredden 6: $$s=\\frac{2+11}{2}\\cdot 6=39\\ \\text{m}$$',
   'Med formelen: $s=2\\cdot 6+\\tfrac12\\cdot 1{,}5\\cdot 6^2=12+27=39$ m. Begge måtene gir 39 m, og det viser animasjonen også.',
   'Formelen $s=\\frac{v_0+v}{2}\\cdot t$ er akkurat arealet av trapeset.']}
],
vanskelig:[
 {q:'Velg «Styr selv». Bilen starter i ro, og animasjonen stopper etter 10 s. Få bilen til å stoppe akkurat ved 100 m. Lag en plan med regning før du prøver.',
  hint:'Tegn fartsgrafen du vil ha: farten øker først og minker så til null ved $t=10$ s. Arealet under grafen skal være 100 m. Hva er den enkleste formen grafen kan ha?',
  losning:['En enkel plan er å akselerere med $a$ i 5 s og bremse med $-a$ i 5 s. Fartsgrafen blir da en trekant med bredde 10 s.',
   'Arealet av trekanten skal være 100 m: $\\tfrac12\\cdot 10\\cdot v_{\\text{maks}}=100$, så $v_{\\text{maks}}=20$ m/s. Da må $a=\\frac{20}{5}=4$ m/s².',
   '<strong>Plan:</strong> Sett $a=4$ m/s² fra start. Etter 5 s, ved 50 m og 20 m/s, setter du $a=-4$ m/s². Bilen stopper ved 100 m etter 10 s.',
   'Det er vanskelig å bytte i akkurat riktig øyeblikk. Kommer du innen noen få meter, har du gjort det riktig.']},
 {q:'Bilen starter med 2 m/s og akselererer med 1,5 m/s². Når har den kjørt 50 m, og hvilken fart har den da? Løs på to måter, og sjekk i animasjonen.',
  hint:'Den ene måten: løs andregradslikningen $50=2t+0{,}75t^2$. Den andre måten: finn farten direkte med $v^2-v_0^2=2as$, uten å finne tida først.',
  losning:['<strong>Måte 1:</strong> $0{,}75t^2+2t-50=0$ gir $$t=\\frac{-2+\\sqrt{2^2+4\\cdot 0{,}75\\cdot 50}}{2\\cdot 0{,}75}=\\frac{-2+\\sqrt{154}}{1{,}5}\\approx 6{,}94\\ \\text{s}$$ Da er $v=2+1{,}5\\cdot 6{,}94\\approx 12{,}4$ m/s.',
   '<strong>Måte 2:</strong> $v^2=v_0^2+2as=2^2+2\\cdot 1{,}5\\cdot 50=154$, så $v=\\sqrt{154}\\approx 12{,}4$ m/s. Tida blir $t=\\frac{v-v_0}{a}=\\frac{12{,}4-2}{1{,}5}\\approx 6{,}94$ s.',
   'Andregradslikningen har også en negativ løsning. Den gir ingen mening her, fordi bilen startet ved $t=0$.']},
 {q:'Vis at bremselengden blir fire ganger så lang når startfarten dobles, med samme bremseakselerasjon. Test med 8 m/s og 16 m/s under «Bremsing». Hva betyr dette i trafikken?',
  hint:'Løs $v^2-v_0^2=2as$ for $s$ med $v=0$. Hva skjer med $s$ når du bytter ut $v_0$ med $2v_0$?',
  losning:['Med $v=0$ blir $s=\\frac{v_0^2}{-2a}=\\frac{v_0^2}{2\\cdot 2{,}5}$. Bremselengden er proporsjonal med $v_0^2$.',
   'Dobler du farten, blir telleren $(2v_0)^2=4v_0^2$, så bremselengden blir fire ganger så lang. I animasjonen gir 8 m/s 12,8 m, og 16 m/s gir 51,2 m. Tida blir bare dobbelt så lang, fra 3,2 s til 6,4 s.',
   'I trafikken betyr det at litt høyere fart gir mye lengre bremselengde. Fra 50 til 70 km/h øker farten med 40 %, men bremselengden blir nesten dobbelt så lang: $1{,}4^2\\approx 2$.']}
]
});

/* ---------- Krefter på skråplan ---------- */
OPPG('fy-newton',{
lett:[
 {q:'Sett friksjonstallet til 0. Øk helningsvinkelen fra 0° til 60°. Hvilke krefter blir større, og hvilke blir mindre? Hva er normalkraften ved 0°?',
  hint:'Se på tallene for $G$, $N$ og kraftsummen i boksen. Slå på «Vis dekomponering av G» for å se $G_\\parallel$ og $G_\\perp$.',
  losning:['Tyngdekraften $G=mg$ er den samme hele tiden. Med 5 kg er den 49,1 N.',
   'Delen langs planet, $G_\\parallel=mg\\sin\\alpha$, blir større når vinkelen øker. Normalkraften $N=mg\\cos\\alpha$ blir mindre. Uten friksjon er kraftsummen lik $G_\\parallel$, så den øker også.',
   'Ved 0° er planet vannrett. Da er $N=G=49{,}1$ N, og det virker ingen kraft langs planet.']},
 {q:'Sett $\\mu=0{,}25$. Finn den minste helningsvinkelen der klossen begynner å gli. Sammenlign $\\tan\\alpha$ med $\\mu$.',
  hint:'Trykk «Start på toppen» hver gang du har endret vinkelen. Panelet viser $\\tan\\alpha$.',
  losning:['Ved 14° blir klossen liggende, og ved 15° glir den. Panelet viser $\\tan 14^\\circ=0{,}249$ og $\\tan 15^\\circ=0{,}268$.',
   'Klossen begynner å gli når $\\tan\\alpha$ blir større enn $\\mu=0{,}25$. Den nøyaktige grensen er $\\alpha\\approx 14{,}0^\\circ$, der $\\tan\\alpha=0{,}25$.']},
 {q:'Sett $\\alpha=10^\\circ$ og $\\mu=0{,}25$, så klossen står i ro. Les av friksjonen $R$ og sammenlign med $G_\\parallel$. Er friksjonen like stor som $\\mu N$?',
  hint:'Regn ut $\\mu N$ med tallet for $N$ i boksen. Hvor stor friksjon trengs for at klossen skal stå i ro?',
  losning:['Boksen viser $R=8{,}5$ N. Det er like mye som $G_\\parallel=mg\\sin 10^\\circ\\approx 8{,}5$ N, så kraftsummen er null og klossen står i ro.',
   'Men $\\mu N=0{,}25\\cdot 48{,}3\\approx 12{,}1$ N, og det er mer enn 8,5 N. Når klossen står i ro, er friksjonen bare så stor som den trenger å være. $\\mu N$ er den største friksjonen planet kan gi.']}
],
middels:[
 {q:'Regn ut akselerasjonen når $\\alpha=30^\\circ$ og $\\mu=0{,}2$. Tegn kreftene først. Sjekk svaret i animasjonen.',
  hint:'Kraftsummen langs planet er $G_\\parallel-R=mg\\sin\\alpha-\\mu mg\\cos\\alpha$. Del på $m$.',
  losning:['Langs planet virker $G_\\parallel=mg\\sin\\alpha$ nedover og friksjonen $R=\\mu N=\\mu mg\\cos\\alpha$ oppover.',
   '$$a=\\frac{\\Sigma F}{m}=g(\\sin\\alpha-\\mu\\cos\\alpha)=9{,}81\\,(\\sin 30^\\circ-0{,}2\\cos 30^\\circ)\\approx 3{,}21\\ \\text{m/s}^2$$',
   '<strong>Svar:</strong> $a\\approx 3{,}21$ m/s² nedover planet. Animasjonen viser det samme når klossen glir.']},
 {q:'Endre massen mens klossen glir. Kreftene endrer seg, men akselerasjonen gjør det ikke. Forklar hvorfor.',
  hint:'Hvilke krefter er proporsjonale med $m$? Skriv opp $a=\\frac{\\Sigma F}{m}$, og se hva som skjer med $m$.',
  losning:['Både $G_\\parallel=mg\\sin\\alpha$ og friksjonen $R=\\mu mg\\cos\\alpha$ er proporsjonale med massen. Dobler du massen, dobles kraftsummen.',
   'Men akselerasjonen er kraftsummen delt på massen: $$a=\\frac{mg\\sin\\alpha-\\mu mg\\cos\\alpha}{m}=g(\\sin\\alpha-\\mu\\cos\\alpha)$$',
   'Massen forkortes bort. En tung og en lett kloss av samme materiale glir derfor like fort.']},
 {q:'Bruk $\\alpha=28^\\circ$ og $\\mu=0{,}25$. Vent til klossen er nede, og trykk «Dytt oppover». Hvorfor er akselerasjonen større på vei opp enn på vei ned? Regn ut begge.',
  hint:'Friksjonen virker alltid mot bevegelsen. Hvilken vei peker den på vei opp, og hvilken vei på vei ned?',
  losning:['På vei opp peker både $G_\\parallel$ og friksjonen nedover planet, så de virker sammen: $$a_{\\text{opp}}=g(\\sin\\alpha+\\mu\\cos\\alpha)\\approx 6{,}77\\ \\text{m/s}^2$$',
   'På vei ned peker friksjonen oppover og virker mot $G_\\parallel$: $$a_{\\text{ned}}=g(\\sin\\alpha-\\mu\\cos\\alpha)\\approx 2{,}44\\ \\text{m/s}^2$$',
   'Begge akselerasjonene peker nedover planet. På vei opp bremser klossen raskt, og på vei ned får den fart sakte.']}
],
vanskelig:[
 {q:'Vis at klossen begynner å gli når $\\tan\\alpha>\\mu$, uansett masse. Hvor stort må friksjonstallet være for at klossen skal ligge i ro på 40°? Test i animasjonen.',
  hint:'Klossen ligger i ro så lenge friksjonen klarer å holde igjen $G_\\parallel$. Den største friksjonen er $\\mu N$.',
  losning:['Klossen ligger i ro så lenge $G_\\parallel\\le\\mu N$, altså $mg\\sin\\alpha\\le\\mu mg\\cos\\alpha$. Del på $mg\\cos\\alpha$: $$\\tan\\alpha\\le\\mu$$',
   'Klossen glir når $\\tan\\alpha>\\mu$. Både $m$ og $g$ forsvinner, så grensen er den samme for alle masser, også på Månen.',
   'På 40° må $\\mu\\ge\\tan 40^\\circ\\approx 0{,}84$. Med $\\mu=0{,}84$ ligger klossen i ro, og med $\\mu=0{,}83$ glir den.']},
 {q:'Sett $\\mu=0{,}25$. Ved hvilken helningsvinkel er akselerasjonen nedover planet halvparten av $g$? Finn svaret ved å prøve deg fram i animasjonen, og vis at det stemmer med formelen.',
  hint:'Du skal finne $\\alpha$ slik at $\\sin\\alpha-0{,}25\\cos\\alpha=0{,}5$. Prøv vinkler mellom 40° og 45°, og se på $a$ i boksen. Halvparten av $g$ er 4,91 m/s².',
  losning:['Ved 42° viser animasjonen $a=4{,}74$ m/s², ved 43° $a=4{,}90$ m/s² og ved 44° $a=5{,}05$ m/s². Svaret er omtrent 43°.',
   'Sjekk med formelen: $9{,}81\\,(\\sin 43^\\circ-0{,}25\\cos 43^\\circ)\\approx 9{,}81\\cdot 0{,}499\\approx 4{,}90$ m/s², nesten nøyaktig $\\frac{g}{2}\\approx 4{,}905$ m/s².',
   'Likningen kan også løses grafisk, for eksempel i GeoGebra. Tegn $y=\\sin x-0{,}25\\cos x$ og $y=0{,}5$ og finn skjæringspunktet. Det gir $\\alpha\\approx 43{,}1^\\circ$.']},
 {q:'Klossen dyttes oppover planet med 4,5 m/s ($\\alpha=28^\\circ$, $\\mu=0{,}25$). Hvor langt opp kommer den? Hvilken fart har den når den er tilbake der den startet? Forklar hvorfor farten er mindre enn 4,5 m/s.',
  hint:'Del bevegelsen i to: på vei opp og på vei ned. Bruk akselerasjonene fra middels-oppgave 3 og $v^2-v_0^2=2as$ for hver del.',
  losning:['På vei opp er $a=6{,}77$ m/s² nedover planet. Klossen stopper etter $$s=\\frac{v_0^2}{2a}=\\frac{4{,}5^2}{2\\cdot 6{,}77}\\approx 1{,}50\\ \\text{m}$$',
   'På vei ned er $a=2{,}44$ m/s². Etter 1,50 m har klossen farten $$v=\\sqrt{2\\cdot 2{,}44\\cdot 1{,}50}\\approx 2{,}7\\ \\text{m/s}$$',
   'Farten er mindre fordi friksjonen har gjort negativt arbeid hele veien, både opp og ned. En del av den kinetiske energien er blitt til varme.']}
]
});

/* ---------- Fall med luftmotstand ---------- */
OPPG('fy-luftmotstand',{
lett:[
 {q:'Hva er terminalfarten til en fallskjermhopper på 80 kg med $k=0{,}25$ kg/m? Les av i animasjonen, og regn ut med at $G=L$ ved terminalfart.',
  hint:'Ved terminalfart er akselerasjonen null, så tyngdekraften og luftmotstanden er like store: $mg=kv^2$.',
  losning:['Animasjonen viser terminalfarten 56,0 m/s.',
   'Ved terminalfart er $mg=kv_t^2$, så $$v_t=\\sqrt{\\frac{mg}{k}}=\\sqrt{\\frac{80\\cdot 9{,}81}{0{,}25}}\\approx 56{,}0\\ \\text{m/s}$$',
   'Det er omtrent 200 km/h.']},
 {q:'Følg pilene på kula mens den faller. Hva skjer med tyngdekraften $G$ og luftmotstanden $L$ mens farten øker? Hvor stor er akselerasjonen når farten er lik terminalfarten?',
  hint:'Den røde pilen er $G$, og den blå er $L$. Akselerasjonen kommer av kraftsummen $G-L$.',
  losning:['$G$ er like stor hele tiden. $L$ er null i starten og vokser når farten øker, fordi $L=kv^2$.',
   'Kraftsummen $G-L$ blir mindre og mindre, så akselerasjonen blir mindre, og fartsgrafen blir slakere.',
   'Ved terminalfarten er $L=G$. Da er kraftsummen null og akselerasjonen null, og farten endrer seg ikke mer.']},
 {q:'Hva skjer med terminalfarten når massen øker? Prøv 40 kg og 120 kg med $k=0{,}25$ kg/m. Faller tunge ting fortere enn lette?',
  hint:'Se på den grønne stiplede linjen. Sammenlign med formelen $v_t=\\sqrt{\\frac{mg}{k}}$.',
  losning:['40 kg gir $v_t\\approx 39{,}6$ m/s, og 120 kg gir $v_t\\approx 68{,}6$ m/s. Større masse gir større terminalfart.',
   'Med luftmotstand faller tunge ting fortere enn lette når de har samme form. Den tunge kroppen trenger mer luftmotstand før $L=G$, og da må farten være større.',
   'Uten luftmotstand faller alt like fort. Det er luftmotstanden som gjør forskjellen.']}
],
middels:[
 {q:'Gjør tidssteget 3 s. Hva skjer med de gule punktene? Prøv også $m=40$ kg, $k=0{,}6$ kg/m og $\\Delta t=3$ s. Forklar hva som går galt.',
  hint:'Eulers metode bruker akselerasjonen i starten av hvert steg gjennom hele steget. Hvor stor er akselerasjonen i starten av det første steget?',
  losning:['Med 80 kg og $k=0{,}25$ ligger de gule punktene langt over den blå kurven. Etter 6 s gir Euler 50,7 m/s, mens riktig fart er 43,8 m/s. Metoden når terminalfarten allerede etter 9 s.',
   'Med 40 kg og $k=0{,}6$ er terminalfarten bare 25,6 m/s. Det første steget gir $9{,}81\\cdot 3\\approx 29{,}4$ m/s, som er over terminalfarten. Da blir luftmotstanden større enn tyngdekraften, og neste steg gir for lav fart. Punktene hopper opp og ned rundt terminalfarten.',
   'Feilen kommer av at Euler later som akselerasjonen er konstant gjennom hele steget. Med lange steg endrer akselerasjonen seg mye i løpet av steget, og da blir feilen stor.']},
 {q:'Regn ut de to første Euler-stegene for hånd med startverdiene (80 kg, $k=0{,}25$ kg/m og $\\Delta t=1{,}5$ s). Sammenlign med animasjonen.',
  hint:'Start med $v_0=0$. Regn ut $a_0=g-\\frac{k}{m}v_0^2$ og så $v_1=v_0+a_0\\Delta t$. Gjenta for å finne $v_2$.',
  losning:['Steg 1: $a_0=9{,}81-\\frac{0{,}25}{80}\\cdot 0^2=9{,}81$ m/s², så $v_1=0+9{,}81\\cdot 1{,}5\\approx 14{,}72$ m/s.',
   'Steg 2: $a_1=9{,}81-\\frac{0{,}25}{80}\\cdot 14{,}72^2\\approx 9{,}13$ m/s², så $v_2=14{,}72+9{,}13\\cdot 1{,}5\\approx 28{,}42$ m/s.',
   'Animasjonen viser 14,72 m/s etter 1,5 s og 28,42 m/s etter 3 s. Den nøyaktige farten er 14,39 m/s og 26,99 m/s, så Euler gir litt for høy fart.']},
 {q:'Hvorfor gir Eulers metode for høy fart i starten av fallet? Bruk det du vet om hvordan akselerasjonen endrer seg.',
  hint:'Er akselerasjonen størst i starten eller i slutten av hvert tidssteg?',
  losning:['Akselerasjonen er størst når farten er liten, og den blir mindre etter hvert som luftmotstanden øker.',
   'Euler bruker akselerasjonen i starten av hvert steg, og det er den største akselerasjonen i det steget. Farten øker derfor litt for mye i hvert steg, og de gule punktene havner over den blå kurven.',
   'Når farten nærmer seg terminalfarten, endrer akselerasjonen seg lite. Da blir feilen i hvert steg mindre, og punktene nærmer seg kurven igjen.']}
],
vanskelig:[
 {q:'Hvor lite må tidssteget være for at feilen etter 10 s skal bli under 0,5 m/s? Hva skjer med feilen når du halverer tidssteget?',
  hint:'Velg tidssteg som går opp i 10 s, for eksempel 1, 0,5, 0,4 og 0,2 s. Les av feilen når animasjonen er ved $t=10$ s. Trykk mellomrom for å sette på pause.',
  losning:['Feilen etter 10 s er omtrent 1,21 m/s med $\\Delta t=1$ s, 0,61 m/s med 0,5 s, 0,49 m/s med 0,4 s og 0,24 m/s med 0,2 s.',
   'Tidssteget må altså være omtrent 0,4 s eller mindre.',
   'Når tidssteget halveres, halveres omtrent feilen også. Feilen er proporsjonal med $\\Delta t$. Vil du ha ti ganger mindre feil, må du regne ti ganger så mange steg.']},
 {q:'Skriv et Python-program som bruker Eulers metode for fallskjermhopperen (80 kg, $k=0{,}25$ kg/m), og plott farten de første 30 sekundene.',
  hint:'Lag lister for tid og fart. Bruk en løkke som regner ut $a$, oppdaterer $v$ og $t$ og legger verdiene til i listene. Plott med matplotlib.',
  losning:['Et mulig program:',
   '<pre>import matplotlib.pyplot as plt\n\nm = 80       # masse (kg)\nk = 0.25     # luftmotstandstall (kg/m)\ng = 9.81\ndt = 0.1     # tidssteg (s)\n\nt = 0\nv = 0\ntider = [t]\nfarter = [v]\n\nwhile t &lt; 30:\n    a = g - k*v**2/m\n    v = v + a*dt\n    t = t + dt\n    tider.append(t)\n    farter.append(v)\n\nplt.plot(tider, farter)\nplt.xlabel("t (s)")\nplt.ylabel("v (m/s)")\nplt.show()</pre>',
   'Grafen flater ut ved omtrent 56 m/s, som er terminalfarten. Endre <code>dt</code> og sammenlign med animasjonen.']},
 {q:'En fallskjerm skal gi en landingsfart på 5 m/s for en hopper på 80 kg. Hvor stor må $k$ være? Er det mulig i animasjonen? Hva sier svaret om fallskjermen?',
  hint:'Landingsfarten er terminalfarten med fallskjermen ute. Løs $mg=kv_t^2$ for $k$.',
  losning:['$$k=\\frac{mg}{v_t^2}=\\frac{80\\cdot 9{,}81}{5^2}\\approx 31\\ \\text{kg/m}$$',
   'Glidebryteren går bare opp til 0,6 kg/m, så det er ikke mulig i animasjonen. Det er omtrent 125 ganger så mye som for hopperen uten skjerm.',
   'Luftmotstandstallet $k$ er omtrent proporsjonalt med arealet som treffer lufta. Fallskjermen må derfor ha et mye større areal enn kroppen, flere titalls kvadratmeter.']}
]
});

/* ---------- Energibevaring ---------- */
OPPG('fy-energi',{
lett:[
 {q:'Velg U-banen og sett friksjonen til 0. Dra kula opp og slipp. Hvor høyt kommer den på den andre siden? Hva skjer med søylene for $E_k$ og $E_p$ mens kula ruller?',
  hint:'Se på den gule og den blå søylen, og på den hvite rammen som viser den totale energien.',
  losning:['Uten friksjon kommer kula opp i nøyaktig samme høyde på den andre siden, og den ruller fram og tilbake for alltid.',
   'På vei ned blir den gule søylen ($E_p$) mindre og den blå ($E_k$) større. I bunnen er nesten all energien kinetisk. På vei opp går det motsatt vei.',
   'Summen $E_k+E_p$ er hele tiden den samme. Energien skifter bare form.']},
 {q:'Slipp kula fra 3 m høyde uten friksjon. Hvor stor er farten i bunnen? Sjekk med $v=\\sqrt{2gh}$.',
  hint:'Dra kula til panelet viser $h$ = 3,00 m. Sett animasjonen på pause når kula er i bunnen, eller følg med på den største farten.',
  losning:['I bunnen er all den potensielle energien blitt kinetisk: $mgh=\\tfrac12mv^2$.',
   '$$v=\\sqrt{2gh}=\\sqrt{2\\cdot 9{,}81\\cdot 3}\\approx 7{,}7\\ \\text{m/s}$$',
   '<strong>Svar:</strong> Omtrent 7,7 m/s. Animasjonen viser det samme i bunnen.']},
 {q:'Sett friksjonen til 0,10, og slipp kula fra 3 m i U-banen. Vent til den ligger stille. Hvor mye energi er blitt til varme? Sammenlign med $E_p$ i starten.',
  hint:'Den røde søylen er varmen $Q$. Regn ut $E_p=mgh$ ved start med $m=50$ kg.',
  losning:['Ved start er $E_p=mgh=50\\cdot 9{,}81\\cdot 3\\approx 1470$ J.',
   'Når kula ligger stille i bunnen, er både $E_p$ og $E_k$ nesten null. All energien er blitt til varme: $Q\\approx 1470$ J.',
   'Energien er ikke borte. Den er spredt som varme i kula og banen, og den kan ikke lenger brukes til å få kula opp igjen.']}
],
middels:[
 {q:'Endre massen og slipp kula fra samme høyde. Hvorfor endrer ikke farten i bunnen seg, selv om energien gjør det?',
  hint:'Skriv $mgh=\\tfrac12mv^2$ og løs for $v$.',
  losning:['Både $E_p=mgh$ og $E_k=\\tfrac12mv^2$ er proporsjonale med massen. Søylene blir større med større masse.',
   'Men når vi setter $mgh=\\tfrac12mv^2$, forkortes $m$ bort: $v=\\sqrt{2gh}$. Farten avhenger bare av høyden.',
   'Med friksjon gjelder det samme, fordi friksjonskraften i modellen også er proporsjonal med massen.']},
 {q:'Velg «Dobbel dal» uten friksjon. Hvor høyt må du slippe kula for at den skal komme over den midterste toppen? Test.',
  hint:'Dra kula til toppen i midten og les av høyden der. Hvor mye energi trenger kula for å komme opp dit?',
  losning:['Toppen i midten ligger 1,62 m over bunnen.',
   'Uten friksjon er energien bevart. Kula kommer over toppen hvis $mgh_{\\text{start}}>mg\\cdot 1{,}62$ m, altså hvis den slippes fra mer enn 1,62 m.',
   'Slipper du fra akkurat 1,62 m, stopper kula så vidt på toppen. I virkeligheten er det umulig å treffe akkurat, så kula ruller ned på den ene eller den andre siden.']},
 {q:'Sett friksjonen til 0,03 i U-banen og slipp kula fra 3 m. Hvor høyt kommer den på den andre siden? Hvor mye energi ble til varme på den ene turen?',
  hint:'Sett animasjonen på pause når kula snur på den andre siden, og les av $h$. Varmen er forskjellen i potensiell energi.',
  losning:['Kula kommer opp til omtrent 2,77 m på den andre siden.',
   'Varmen er det som mangler av den potensielle energien: $$Q=mg\\,(h_1-h_2)=50\\cdot 9{,}81\\cdot(3-2{,}77)\\approx 111\\ \\text{J}$$',
   'Animasjonen viser omtrent det samme for $Q$ når kula snur.']}
],
vanskelig:[
 {q:'Vis at friksjonsarbeidet i denne modellen er $W_R=\\mu mg\\cdot\\Delta x$, der $\\Delta x$ er den vannrette strekningen kula har rullet. Bruk det til å regne ut hvor høyt kula kommer på den andre siden i forrige oppgave.',
  hint:'Friksjonen er $R=\\mu N=\\mu mg\\cos\\theta$, der $\\theta$ er helningen der kula er. Hva er $\\cos\\theta\\cdot\\Delta s$ for et lite stykke av banen? U-banen har formen $h=0{,}2x^2$.',
  losning:['På et lite stykke $\\Delta s$ av banen gjør friksjonen arbeidet $R\\,\\Delta s=\\mu mg\\cos\\theta\\,\\Delta s$. Men $\\cos\\theta\\,\\Delta s$ er akkurat den vannrette delen av stykket, $\\Delta x$. Legger vi sammen alle stykkene, får vi $W_R=\\mu mg\\cdot\\Delta x$.',
   'Kula starter i $h=3$ m, altså i $x=-\\sqrt{3/0{,}2}\\approx -3{,}87$ m, og snur i $x_2$ på den andre siden. Energibevaring gir $$mg\\cdot 3=mg\\cdot 0{,}2x_2^2+\\mu mg\\,(3{,}87+x_2)$$',
   'Med $\\mu=0{,}03$ blir det $0{,}2x_2^2+0{,}03x_2-2{,}884=0$, så $x_2\\approx 3{,}72$ m og $h_2=0{,}2\\cdot 3{,}72^2\\approx 2{,}77$ m. Det stemmer med animasjonen.',
   'Modellen tar ikke med at normalkraften blir større i bunnen, der kula går i en bue. I virkeligheten ville friksjonen vært litt større der.']},
 {q:'Velg «Dobbel dal» med friksjon 0,05. Hvor høyt må du nå slippe kula for at den skal komme over toppen i midten? Regn ut først, og test.',
  hint:'Bruk resultatet $W_R=\\mu mg\\cdot\\Delta x$. Kula slippes i $x_0$ til venstre og skal opp til toppen i $x=0$. Banen er $h=0{,}02(x^2-9)^2$. Prøv deg fram med noen verdier av $x_0$.',
  losning:['Kula kommer over toppen hvis $mgh_0-\\mu mg\\,|x_0|>mg\\cdot 1{,}62$, altså hvis $$h_0>1{,}62+0{,}05\\,|x_0|$$',
   'Slippestedet ligger rundt $x_0\\approx -4{,}3$ m, så friksjonen tar omtrent $0{,}05\\cdot 4{,}3\\approx 0{,}22$ m av høyden. Prøving gir $x_0\\approx -4{,}31$ m og $h_0\\approx 1{,}84$ m.',
   '<strong>Svar:</strong> Kula må slippes fra mer enn omtrent 1,84 m. Det stemmer med animasjonen.']},
 {q:'Velg halfpipen med friksjon 0,10, og slipp kula fra 2 m. Hvor lang vannrett strekning ruller kula til sammen før den stopper? Forklar hvorfor svaret ikke avhenger av massen eller formen på banen.',
  hint:'Når kula ligger stille i bunnen, er all den potensielle energien blitt til varme. Bruk $W_R=\\mu mg\\cdot\\Delta x$.',
  losning:['Til slutt er all energien blitt varme: $mgh_0=\\mu mg\\cdot\\Delta x$.',
   '$$\\Delta x=\\frac{h_0}{\\mu}=\\frac{2}{0{,}10}=20\\ \\text{m}$$',
   'Massen og $g$ forkortes bort. Formen på banen betyr heller ikke noe, så lenge kula ender i høyde null. Det eneste som teller, er starthøyden og friksjonstallet.',
   'Du kan sjekke at $Q$ ender på $mgh_0=50\\cdot 9{,}81\\cdot 2\\approx 981$ J.']}
]
});

/* ---------- Støt og bevegelsesmengde ---------- */
OPPG('fy-stot',{
lett:[
 {q:'Velg elastisk støt, like masser og $v_2=0$. Hva skjer når vognene støter? Kjenner du det igjen fra biljard?',
  hint:'Sett $m_1=m_2$, for eksempel 2 kg, og $v_2=0$. Se på farten til hver vogn før og etter.',
  losning:['Vogn 1 stopper helt, og vogn 2 fortsetter med den farten vogn 1 hadde. Vognene bytter fart.',
   'Det samme skjer når en biljardkule treffer en annen kule rett forfra: den første kula stopper.',
   'Både bevegelsesmengden og den kinetiske energien er bevart, og med like masser kan det bare skje på denne måten.']},
 {q:'Hvilke søyler er like før og etter støtet i et elastisk støt? Og i et fullstendig uelastisk støt?',
  hint:'Se på «sum før» og «sum etter» for bevegelsesmengden, og på $E_k$ før og etter.',
  losning:['Den samlede bevegelsesmengden er lik før og etter i begge typer støt.',
   'Den kinetiske energien er bare lik før og etter i det elastiske støtet. I det uelastiske støtet blir en del av den kinetiske energien til varme og deformasjon.']},
 {q:'Kan den samlede bevegelsesmengden være null før støtet selv om begge vognene beveger seg? Finn et eksempel. Hva skjer etter støtet?',
  hint:'Bevegelsesmengden har retning. Prøv vogner som kjører mot hverandre, og se på «sum før».',
  losning:['Ja. For eksempel gir $m_1=2$ kg med $v_1=1$ m/s og $m_2=1$ kg med $v_2=-2$ m/s at $p=2\\cdot 1+1\\cdot(-2)=0$.',
   'I et uelastisk støt står begge vognene stille etterpå, fordi summen fortsatt må være null.',
   'I et elastisk støt spretter vognene tilbake med samme fart som de kom med: $v_1\'=-1$ m/s og $v_2\'=2$ m/s.']}
],
middels:[
 {q:'Vogn 1 på 2 kg kjører med 2 m/s og kolliderer med vogn 2 på 1 kg, som står stille. Støtet er fullstendig uelastisk. Regn ut farten etter støtet, og sjekk.',
  hint:'Vognene henger sammen etterpå. Sett bevegelsesmengden før lik bevegelsesmengden etter: $m_1v_1=(m_1+m_2)v\'$.',
  losning:['$$v\'=\\frac{m_1v_1}{m_1+m_2}=\\frac{2\\cdot 2}{2+1}\\approx 1{,}33\\ \\text{m/s}$$',
   '<strong>Svar:</strong> Vognene fortsetter sammen med 1,33 m/s. Det viser animasjonen også.']},
 {q:'Hvor mange prosent av den kinetiske energien går tapt i forrige oppgave? Hvor blir den av?',
  hint:'Regn ut $E_k$ før og etter støtet. Husk at begge vognene beveger seg etterpå.',
  losning:['Før: $E_k=\\tfrac12\\cdot 2\\cdot 2^2=4{,}0$ J.',
   'Etter: $E_k=\\tfrac12\\cdot 3\\cdot 1{,}33^2\\approx 2{,}67$ J.',
   'Tapet er $4{,}0-2{,}67=1{,}33$ J, som er 33 % av energien. Den blir til varme, lyd og deformasjon av vognene.']},
 {q:'En lett vogn treffer en tung vogn som står stille, i et elastisk støt: $m_1=1$ kg, $v_1=2$ m/s og $m_2=4$ kg. Les av farten til vognene etter støtet. Vis med tallene at både bevegelsesmengden og den kinetiske energien er bevart.',
  hint:'Regn ut $p=m_1v_1+m_2v_2$ og $E_k=\\tfrac12m_1v_1^2+\\tfrac12m_2v_2^2$ før og etter. Husk fortegnet på farten.',
  losning:['Animasjonen viser $v_1\'=-1{,}20$ m/s og $v_2\'=0{,}80$ m/s. Den lette vogna spretter tilbake.',
   'Bevegelsesmengde: før er den $1\\cdot 2=2$ kg·m/s, og etter er den $1\\cdot(-1{,}20)+4\\cdot 0{,}80=2$ kg·m/s.',
   'Kinetisk energi: før er den $\\tfrac12\\cdot 1\\cdot 2^2=2$ J, og etter er den $\\tfrac12\\cdot 1\\cdot 1{,}20^2+\\tfrac12\\cdot 4\\cdot 0{,}80^2=0{,}72+1{,}28=2$ J.']}
],
vanskelig:[
 {q:'Vogn 2 står stille før et fullstendig uelastisk støt. Vis at andelen av den kinetiske energien som er igjen etterpå, er $\\frac{m_1}{m_1+m_2}$. Sjekk med tallene fra middels-oppgavene.',
  hint:'Bruk $v\'=\\frac{m_1v_1}{m_1+m_2}$, og regn ut $\\frac{E_{k,\\text{etter}}}{E_{k,\\text{før}}}$.',
  losning:['$$\\frac{E_{k,\\text{etter}}}{E_{k,\\text{før}}}=\\frac{\\tfrac12(m_1+m_2)v\'^2}{\\tfrac12m_1v_1^2}=\\frac{m_1+m_2}{m_1v_1^2}\\cdot\\frac{m_1^2v_1^2}{(m_1+m_2)^2}=\\frac{m_1}{m_1+m_2}$$',
   'Med $m_1=2$ kg og $m_2=1$ kg er andelen $\\frac23$, så $\\frac13\\approx 33$ % går tapt. Det stemmer med middels-oppgave 2.',
   'Treffer en lett vogn en tung, går nesten all energien tapt. Treffer en tung vogn en lett, går lite tapt.']},
 {q:'Vogn 2 står stille, og støtet er elastisk. Bruk bevaring av bevegelsesmengde og kinetisk energi til å vise at $v_1\'=\\frac{m_1-m_2}{m_1+m_2}v_1$ og $v_2\'=\\frac{2m_1}{m_1+m_2}v_1$.',
  hint:'Skriv begge bevaringslovene med $m_1$-leddene på venstre side: $m_1(v_1-v_1\')=m_2v_2\'$ og $m_1(v_1^2-v_1\'^2)=m_2v_2\'^2$. Del den andre likningen på den første.',
  losning:['Bevegelsesmengde: $m_1(v_1-v_1\')=m_2v_2\'$.',
   'Kinetisk energi (ganget med 2 og faktorisert): $m_1(v_1-v_1\')(v_1+v_1\')=m_2v_2\'^2$.',
   'Del den andre likningen på den første: $v_1+v_1\'=v_2\'$.',
   'Sett inn i den første: $m_1(v_1-v_1\')=m_2(v_1+v_1\')$. Det gir $$v_1\'=\\frac{m_1-m_2}{m_1+m_2}v_1\\qquad\\text{og}\\qquad v_2\'=v_1+v_1\'=\\frac{2m_1}{m_1+m_2}v_1$$',
   'Sjekk: $m_1=1$ kg, $m_2=4$ kg og $v_1=2$ m/s gir $v_1\'=-1{,}2$ m/s og $v_2\'=0{,}8$ m/s, som i middels-oppgave 3.']},
 {q:'Vogn 2 står stille, og støtet er elastisk. Hvilket masseforhold $\\frac{m_2}{m_1}$ gjør at vogn 1 spretter tilbake med halvparten av farten den kom med? Test i animasjonen.',
  hint:'Bruk $v_1\'=\\frac{m_1-m_2}{m_1+m_2}v_1$ fra oppgaven over, og sett $v_1\'=-\\tfrac12v_1$.',
  losning:['$$\\frac{m_1-m_2}{m_1+m_2}=-\\frac12\\quad\\Rightarrow\\quad 2m_1-2m_2=-m_1-m_2\\quad\\Rightarrow\\quad m_2=3m_1$$',
   'Test: $m_1=1$ kg, $m_2=3$ kg og $v_1=2$ m/s gir $v_1\'=-1{,}00$ m/s og $v_2\'=1{,}00$ m/s.',
   '<strong>Svar:</strong> Vogn 2 må være tre ganger så tung som vogn 1.']}
]
});

/* ---------- Sirkelbevegelse ---------- */
OPPG('fy-sirkel',{
lett:[
 {q:'Velg «Stein i snor», og trykk «Kutt snora». Hvilken vei flyr steinen? Hvorfor flyr den ikke rett ut fra sentrum?',
  hint:'Se på den blå pilen for farten like før du kutter snora.',
  losning:['Steinen flyr rett fram langs tangenten, i den retningen farten hadde da snora ble kuttet.',
   'Når snora er borte, virker det ingen kraft på steinen sett ovenfra. Da beveger den seg rett fram med konstant fart, etter Newtons 1. lov.',
   'Det er ingen kraft som dytter steinen utover. Det var snora som hele tiden trakk den inn mot sentrum.']},
 {q:'Hva skjer med kraften i snora når farten dobles? Og når radien dobles? Gjett først, og sjekk med animasjonen.',
  hint:'Les av $F$ i panelet. Prøv for eksempel $v=2$ m/s og 4 m/s, og etterpå $r=1$ m og 2 m.',
  losning:['Når farten dobles, blir kraften fire ganger så stor, fordi $F=\\frac{mv^2}{r}$ har $v^2$ i telleren.',
   'Når radien dobles med samme fart, blir kraften halvparten så stor.']},
 {q:'Velg «Loop i berg-og-dal-bane» med radius 8 m. Finn den laveste farten i bunnen som gjør at vogna klarer loopen. Hva skjer hvis farten er litt for lav?',
  hint:'Senk farten i bunnen litt og litt, og kjør på nytt hver gang. Se også på de gule tallene i boksen.',
  losning:['Vogna klarer loopen når farten i bunnen er minst 19,8 m/s. Boksen viser $\\sqrt{5gr}=19{,}8$ m/s. Glidebryteren går i steg på 0,5 m/s, så 19,5 m/s er for lite og 20 m/s holder.',
   'Er farten litt for lav, mister vogna kontakten med skinnene i øvre del av loopen og faller ned.']}
],
middels:[
 {q:'Regn ut den minste farten vogna kan ha på toppen av en loop med radius 8 m. Hvorfor kan den ikke være lavere?',
  hint:'På toppen virker både tyngdekraften og normalkraften nedover, mot sentrum. Den minste farten får du når normalkraften er null.',
  losning:['På toppen er $N+G=\\frac{mv^2}{r}$. Den minste farten får vi når $N=0$, så bare tyngdekraften holder vogna i sirkelbanen: $$mg=\\frac{mv^2}{r}\\quad\\Rightarrow\\quad v=\\sqrt{gr}=\\sqrt{9{,}81\\cdot 8}\\approx 8{,}9\\ \\text{m/s}$$',
   'Med lavere fart trengs det mindre kraft mot sentrum enn tyngdekraften gir. Tyngdekraften trekker da vogna innover og ned fra banen, og skinnene kan ikke holde den oppe.']},
 {q:'Bruk startverdiene for steinen i snor: $r=1{,}5$ m, $v=4$ m/s og $m=0{,}5$ kg. Regn ut akselerasjonen, kraften i snora og omløpstiden. Sjekk med animasjonen.',
  hint:'Bruk $a=\\frac{v^2}{r}$, $F=ma$ og $T=\\frac{2\\pi r}{v}$.',
  losning:['$a=\\frac{4^2}{1{,}5}\\approx 10{,}7$ m/s²',
   '$F=ma=0{,}5\\cdot 10{,}67\\approx 5{,}3$ N',
   '$T=\\frac{2\\pi\\cdot 1{,}5}{4}\\approx 2{,}36$ s',
   'Panelet viser de samme tallene.']},
 {q:'Hvorfor kjenner du deg tyngre i bunnen av en loop? Regn ut hvor mange ganger tyngre du føler deg med fart 22 m/s og radius 8 m, og sammenlign med $N/G$ i panelet.',
  hint:'I bunnen peker normalkraften opp mot sentrum og tyngdekraften ned. Kraftsummen skal peke mot sentrum: $N-G=\\frac{mv^2}{r}$.',
  losning:['I bunnen må kraftsummen peke oppover, mot sentrum. Da må normalkraften være større enn tyngdekraften: $N=mg+\\frac{mv^2}{r}$.',
   'Det du kjenner som vekten din, er normalkraften fra setet: $$\\frac{N}{G}=1+\\frac{v^2}{gr}=1+\\frac{22^2}{9{,}81\\cdot 8}\\approx 7{,}2$$',
   'Du føler deg altså over sju ganger så tung. Panelet viser $N/G\\approx 7{,}17$ når vogna er i bunnen.']}
],
vanskelig:[
 {q:'Vis at vogna må ha minst $\\sqrt{5gr}$ i bunnen for å klare loopen når det ikke er friksjon. Test med radius 8 m.',
  hint:'Bruk energibevaring fra bunnen til toppen, som ligger $2r$ høyere. På toppen må farten være minst $\\sqrt{gr}$.',
  losning:['Energibevaring fra bunnen til toppen: $$\\tfrac12mv_b^2=\\tfrac12mv_t^2+mg\\cdot 2r$$',
   'Sett inn den minste farten på toppen, $v_t^2=gr$: $$v_b^2=gr+4gr=5gr\\quad\\Rightarrow\\quad v_b=\\sqrt{5gr}$$',
   'Med $r=8$ m blir $v_b=\\sqrt{5\\cdot 9{,}81\\cdot 8}\\approx 19{,}8$ m/s. I animasjonen klarer vogna loopen med 20 m/s, men ikke med 19,5 m/s.']},
 {q:'Vis at normalkraften i bunnen er minst seks ganger tyngdekraften når vogna klarer loopen. Gjelder det for alle radier? Hva betyr det for passasjerene?',
  hint:'Kombiner $N-G=\\frac{mv^2}{r}$ i bunnen med den minste farten $v_b^2=5gr$.',
  losning:['I bunnen er $N=mg+\\frac{mv_b^2}{r}$. Med den minste farten, $v_b^2=5gr$, blir $$N=mg+\\frac{m\\cdot 5gr}{r}=6mg$$',
   'Radien forsvinner, så det gjelder for alle sirkelformede looper. Passasjerene kjenner seg minst seks ganger så tunge i bunnen. Med 20 m/s og radius 8 m viser panelet $N/G\\approx 6$ i bunnen.',
   'Seks ganger tyngdekraften er ubehagelig og kan være farlig. Ekte looper har derfor liten radius på toppen og stor radius i bunnen, der farten er størst.']},
 {q:'Steinen i snor: Halver radien, men hold farten fast. Halver så radien, men hold omløpstiden fast. Hva skjer med kraften i hvert tilfelle? Forklar med formler.',
  hint:'I det andre tilfellet endrer farten seg også. Skriv farten som $v=\\frac{2\\pi r}{T}$, og sett inn i $F=\\frac{mv^2}{r}$.',
  losning:['Med fast fart er $F=\\frac{mv^2}{r}$. Halveres $r$, dobles kraften.',
   'Med fast omløpstid er $v=\\frac{2\\pi r}{T}$, så $$F=\\frac{m}{r}\\left(\\frac{2\\pi r}{T}\\right)^2=\\frac{4\\pi^2mr}{T^2}$$ Nå er kraften proporsjonal med $r$. Halveres $r$, halveres kraften.',
   'Test med $m=0{,}5$ kg: $r=3$ m og $v=6$ m/s gir $T=3{,}14$ s og $F=6{,}0$ N. Med $r=1{,}5$ m og $v=3$ m/s er $T$ den samme, og $F=3{,}0$ N. Med $r=1{,}5$ m og $v=6$ m/s blir $F=12{,}0$ N.',
   'Om kraften øker eller minker, kommer an på hva du holder fast. Derfor må du alltid tenke over hvilke størrelser som er konstante.']}
]
});

/* ---------- Temperatur og varme ---------- */
OPPG('fy-varme',{
lett:[
 {q:'Følg grafen og partiklene mens isen varmes opp. Hva skjer med temperaturen mens isen smelter, og mens vannet koker? Hva skjer med partiklene da?',
  hint:'Se etter de flate stykkene på grafen. Se også på hvordan partiklene til venstre beveger seg før, under og etter smeltingen.',
  losning:['Mens isen smelter, står temperaturen stille på 0 °C. Mens vannet koker, står den stille på 100 °C. Det er de flate stykkene på grafen.',
   'Under smeltingen løsner partiklene fra de faste plassene sine i iskrystallen. Under kokingen river de seg helt løs fra hverandre og blir til damp.',
   'Energien som tilføres da, går med til å bryte bindinger mellom molekylene, ikke til å gjøre dem raskere. Derfor stiger ikke temperaturen.']},
 {q:'Bruk 0,5 kg. Les av hvor mye energi som går med til å smelte isen, altså lengden av det flate stykket ved 0 °C. Sammenlign med $Q=l_s\\,m$.',
  hint:'Les av $Q$ der smeltingen starter og der den slutter, og trekk fra. Smeltevarmen til is er $l_s=334$ kJ/kg.',
  losning:['Smeltingen starter ved $Q=21$ kJ og slutter ved $Q=188$ kJ. Det går altså med 167 kJ.',
   'Med formelen: $Q=l_s\\,m=334\\ \\text{kJ/kg}\\cdot 0{,}5\\ \\text{kg}=167$ kJ.']},
 {q:'Hvilket flatt stykke på grafen er lengst, smeltingen eller kokingen? Omtrent hvor mange ganger lengre er det?',
  hint:'Sammenlign lengden av de to flate stykkene, eller bruk tallene $l_s=334$ kJ/kg og $l_f=2260$ kJ/kg.',
  losning:['Kokingen er mye lengre. Den krever $\\frac{2257}{334}\\approx 6{,}8$ ganger så mye energi som smeltingen.',
   'Når vann fordamper, må molekylene rives helt løs fra hverandre. Når is smelter, løsner de bare litt, og molekylene henger fortsatt sammen i vannet.']}
],
middels:[
 {q:'Hvor mye energi trengs for å varme 0,5 kg vann fra 0 °C til 100 °C? Regn ut, og sjekk på grafen.',
  hint:'Bruk $Q=c\\,m\\,\\Delta T$ med $c=4{,}19$ kJ/(kg·K). På grafen kan du lese av $Q$ der vannet har 0 °C og der det har 100 °C.',
  losning:['$$Q=c\\,m\\,\\Delta T=4{,}19\\ \\tfrac{\\text{kJ}}{\\text{kg}\\cdot\\text{K}}\\cdot 0{,}5\\ \\text{kg}\\cdot 100\\ \\text{K}\\approx 209\\ \\text{kJ}$$',
   'På grafen er vannet 0 °C ved $Q=188$ kJ og 100 °C ved $Q=397$ kJ. Forskjellen er 209 kJ.']},
 {q:'Hvor lang tid tar det å koke bort 1 kg vann som allerede er 100 °C, med en kokeplate på 2000 W? Regn ut, og sjekk med tida i panelet.',
  hint:'Finn energien med $Q=l_f\\,m$, og bruk $P=\\frac{Q}{t}$. I animasjonen kan du lese av tida når kokingen starter og når den slutter.',
  losning:['$$Q=l_f\\,m=2257\\ \\text{kJ/kg}\\cdot 1\\ \\text{kg}=2257\\ \\text{kJ}$$',
   '$$t=\\frac{Q}{P}=\\frac{2\\,257\\,000\\ \\text{J}}{2000\\ \\text{W}}\\approx 1130\\ \\text{s}\\approx 19\\ \\text{min}$$',
   'Med $m=1$ kg og $P=2000$ W starter kokingen etter 6,6 min og slutter etter 25,4 min i animasjonen. Det er 18,8 min.']},
 {q:'Grafen er brattest for is og damp og slakest for flytende vann. Hvilken fase har størst spesifikk varmekapasitet? Forklar hvordan du ser det på grafen.',
  hint:'Stigningstallet til grafen er $\\frac{\\Delta T}{Q}$. Løs $Q=c\\,m\\,\\Delta T$ for $\\frac{\\Delta T}{Q}$.',
  losning:['Fra $Q=c\\,m\\,\\Delta T$ får vi $\\frac{\\Delta T}{Q}=\\frac{1}{c\\,m}$. Stor varmekapasitet gir altså en slak graf: det trengs mye energi for hver grad.',
   'Flytende vann har den slakeste grafen og derfor størst spesifikk varmekapasitet: 4,19 kJ/(kg·K). Is og damp har omtrent halvparten, 2,1 og 2,0 kJ/(kg·K).',
   'Den store varmekapasiteten til vann er grunnen til at havet jevner ut temperaturen i kystklimaet.']}
],
vanskelig:[
 {q:'Hvorfor er en brannskade fra damp på 100 °C verre enn fra vann på 100 °C? Sammenlign energien huden får fra 10 g damp og fra 10 g vann som kjøles ned til 37 °C.',
  hint:'Dampen må først kondensere til vann på 100 °C før den kjøles ned. Hvor mye energi gir kondensasjonen?',
  losning:['Vann: $Q=c\\,m\\,\\Delta T=4186\\cdot 0{,}010\\cdot 63\\approx 2{,}6$ kJ.',
   'Damp: Først kondenserer dampen og gir fra seg $Q=l_f\\,m=2\\,257\\,000\\cdot 0{,}010\\approx 22{,}6$ kJ. Så kjøles vannet ned og gir 2,6 kJ til. Til sammen blir det 25,2 kJ.',
   '<strong>Svar:</strong> Dampen gir nesten ti ganger så mye energi til huden som vannet. Det er fordampingsvarmen som kommer tilbake når dampen kondenserer.']},
 {q:'Hvor mye energi trengs i alt for å gjøre 0,5 kg is på −20 °C om til damp på 120 °C? Hvor stor del av energien går med til kokingen? Hvor lang tid tar det med 1500 W?',
  hint:'Del opp i fem trinn: varme isen, smelte, varme vannet, koke og varme dampen. Bruk $c_{\\text{is}}=2{,}1$ og $c_{\\text{damp}}=2{,}0$ kJ/(kg·K). Sjekk sluttverdien av $Q$ på grafen.',
  losning:['Is fra −20 til 0 °C: $2{,}1\\cdot 0{,}5\\cdot 20=21$ kJ. Smelting: $334\\cdot 0{,}5=167$ kJ. Vann fra 0 til 100 °C: 209 kJ. Koking: $2257\\cdot 0{,}5\\approx 1129$ kJ. Damp fra 100 til 120 °C: $2{,}0\\cdot 0{,}5\\cdot 20\\approx 20$ kJ.',
   'Til sammen blir det omtrent 1546 kJ, som er det grafen ender på.',
   'Kokingen tar $\\frac{1129}{1546}\\approx 73$ % av energien.',
   'Med 1500 W tar det $t=\\frac{1\\,546\\,000}{1500}\\approx 1030$ s, altså omtrent 17 minutter.']},
 {q:'Vis at energien som smelter 1 kg is, er nok til å varme 1 kg vann fra 0 °C til nesten 80 °C. Hvor mye is på 0 °C må du ha i 1 kg kokende vann for at alt skal ende som vann på 0 °C?',
  hint:'Sett $l_s\\,m=c\\,m\\,\\Delta T$ og løs for $\\Delta T$. I den andre delen er energien vannet gir fra seg lik energien isen trenger for å smelte.',
  losning:['$$\\Delta T=\\frac{l_s}{c}=\\frac{334}{4{,}19}\\approx 80\\ \\text{K}$$ Det ser du også på grafen: det flate stykket ved 0 °C er omtrent 80 % så langt som stykket der vannet varmes fra 0 til 100 °C.',
   'Det kokende vannet gir fra seg $4{,}19\\cdot 1\\cdot 100=419$ kJ når det kjøles til 0 °C. Isen trenger 334 kJ per kilogram for å smelte: $$m_{\\text{is}}=\\frac{419}{334}\\approx 1{,}25\\ \\text{kg}$$',
   '<strong>Svar:</strong> Omtrent 1,25 kg is. Derfor kjøler is så godt: smeltingen tar mye energi uten at temperaturen stiger.']}
]
});

/* ---------- Planetbaner ---------- */
OPPG('fy-gravitasjon',{
lett:[
 {q:'Trykk «Sirkelbane», og så «Unnslipningsfart». Hvor mange ganger større enn sirkelbanefarten er unnslipningsfarten? Hva skjer med banen?',
  hint:'Glidebryteren viser farten som et tall ganger sirkelbanefarten $v_0$.',
  losning:['Unnslipningsfarten er $1{,}41\\cdot v_0$, altså $\\sqrt2$ ganger sirkelbanefarten.',
   'Med sirkelbanefart går planeten i en sirkel. Med unnslipningsfart blir banen åpen (en parabel), og planeten kommer aldri tilbake.']},
 {q:'Se på energisøylene mens planeten går i en ellipse. Hva skjer med $E_k$ og $E_p$ når planeten nærmer seg sola? Hva skjer med den totale energien $E$?',
  hint:'Følg den blå og den røde søylen mens planeten går fra det fjerneste til det nærmeste punktet.',
  losning:['Når planeten nærmer seg sola, øker farten, så $E_k$ blir større. $E_p$ blir mer negativ, altså mindre.',
   'Den totale energien $E=E_k+E_p$ er den samme hele tiden. Energien går fram og tilbake mellom kinetisk og potensiell energi, som i en pendel.']},
 {q:'Slå på «Vis Keplers 2. lov». Se på de fargede sektorene. Hvor går planeten fortest, og hvor går den saktest? Hva er likt med alle sektorene?',
  hint:'Hver sektor viser hvor langt planeten kommer på like lang tid.',
  losning:['Alle sektorene har like stort areal, fordi de viser like lange tidsrom. Det er Keplers 2. lov.',
   'Nær sola er sektorene korte og brede, og planeten tilbakelegger et langt stykke av banen. Der går den fortest. Langt fra sola er sektorene lange og smale, og der går planeten saktest.']}
],
middels:[
 {q:'Bruk startfarten $0{,}8\\cdot v_0$. Les av $r$ og $v$ i det fjerneste og det nærmeste punktet. Vis at $r\\cdot v$ er omtrent like stort i begge punktene.',
  hint:'Sett animasjonen på pause (mellomrom) når planeten er i det nærmeste punktet. I det fjerneste punktet er planeten der den startet.',
  losning:['I det fjerneste punktet er $r=1$ og $v=0{,}80$, så $r\\cdot v=0{,}80$.',
   'I det nærmeste punktet er $r\\approx 0{,}47$ og $v\\approx 1{,}70$, så $r\\cdot v\\approx 0{,}80$.',
   'I disse to punktene står farten vinkelrett på linjen til sola. Da er $r\\cdot v$ det dobbelte av arealet planeten sveiper over per tidsenhet. At $r\\cdot v$ er likt, er altså Keplers 2. lov.']},
 {q:'Utled formelen for sirkelbanefarten ved å sette gravitasjonskraften lik sentripetalkraften. Bruk den til å regne ut farten og omløpstiden til ISS, 400 km over jordoverflaten.',
  hint:'Sett $\\gamma\\frac{Mm}{r^2}=\\frac{mv^2}{r}$. Bruk $\\gamma M=3{,}99\\cdot10^{14}$ m³/s² for Jorda og jordradien 6371 km.',
  losning:['$$\\gamma\\frac{Mm}{r^2}=\\frac{mv^2}{r}\\quad\\Rightarrow\\quad v=\\sqrt{\\frac{\\gamma M}{r}}$$',
   'For ISS er $r=6371+400=6771$ km. Det gir $$v=\\sqrt{\\frac{3{,}99\\cdot10^{14}}{6{,}771\\cdot10^{6}}}\\approx 7{,}7\\cdot10^3\\ \\text{m/s}$$',
   'Omløpstiden er $T=\\frac{2\\pi r}{v}\\approx\\frac{2\\pi\\cdot 6{,}771\\cdot10^6}{7670}\\approx 5550$ s, altså omtrent 92 minutter.']},
 {q:'Utled formelen for unnslipningsfarten ved å kreve at den totale energien er null. Vis at den er $\\sqrt2$ ganger sirkelbanefarten, og regn den ut for jordoverflaten.',
  hint:'Planeten unnslipper akkurat når $E_k+E_p=0$, altså $\\tfrac12mv^2-\\gamma\\frac{Mm}{r}=0$.',
  losning:['$$\\tfrac12mv^2=\\gamma\\frac{Mm}{r}\\quad\\Rightarrow\\quad v_{\\text{unnsl}}=\\sqrt{\\frac{2\\gamma M}{r}}=\\sqrt2\\cdot\\sqrt{\\frac{\\gamma M}{r}}$$',
   'Det er $\\sqrt2\\approx 1{,}41$ ganger sirkelbanefarten, som i animasjonen.',
   'På jordoverflaten: $v=\\sqrt{\\frac{2\\cdot 3{,}99\\cdot10^{14}}{6{,}371\\cdot10^6}}\\approx 11{,}2$ km/s.']}
],
vanskelig:[
 {q:'Finn en startfart som gir en bane der planeten er tre ganger så langt unna i det fjerneste punktet som i det nærmeste. Det finnes to svar. Regn ut begge, og test.',
  hint:'Bruk enhetene i animasjonen: $\\gamma M=1$, start i $r=1$ med fart $f$. Bevaring av $r\\cdot v$ og av energien $\\tfrac12v^2-\\frac1r$ gir det andre vendepunktet $r_2=\\frac{f^2}{2-f^2}$. Startpunktet kan være det fjerneste eller det nærmeste punktet.',
  losning:['Bevaring av $r\\cdot v$: $v_2=\\frac{f}{r_2}$. Energibevaring: $\\tfrac12f^2-1=\\tfrac12\\frac{f^2}{r_2^2}-\\frac{1}{r_2}$. Den ene løsningen er $r_2=1$ (startpunktet), og den andre er $r_2=\\frac{f^2}{2-f^2}$.',
   'Er startpunktet det nærmeste punktet, må $r_2=3$: $f^2=6-3f^2$, så $f=\\sqrt{1{,}5}\\approx 1{,}22$.',
   'Er startpunktet det fjerneste punktet, må $r_2=\\frac13$: $3f^2=2-f^2$, så $f=\\sqrt{0{,}5}\\approx 0{,}71$.',
   '<strong>Svar:</strong> $f\\approx 0{,}71$ eller $f\\approx 1{,}22$. Med 1,22 kommer planeten ut til $r\\approx 3$, og med 0,71 kommer den inn til $r\\approx 0{,}33$.']},
 {q:'Hvorfor skyter man helst opp satellitter mot øst fra et sted nær ekvator? Regn ut hvor mye fart jordrotasjonen gir, og hvor mye kinetisk energi det sparer for en satellitt i lav bane.',
  hint:'Et punkt på ekvator går rundt jordaksen på et døgn (86 164 s). En satellitt i lav bane trenger omtrent 7,9 km/s. Energien er proporsjonal med kvadratet av farten raketten selv må gi.',
  losning:['På ekvator er farten fra jordrotasjonen $v=\\frac{2\\pi\\cdot 6{,}371\\cdot10^6\\ \\text{m}}{86\\,164\\ \\text{s}}\\approx 465$ m/s mot øst.',
   'Skyter du mot øst, har satellitten denne farten gratis. Raketten må bare gi $7{,}91-0{,}47\\approx 7{,}44$ km/s.',
   'Den kinetiske energien raketten må gi, er proporsjonal med $v^2$: $\\left(\\frac{7{,}44}{7{,}91}\\right)^2\\approx 0{,}89$. Det sparer omtrent 11 %.',
   'Lenger fra ekvator er rotasjonsfarten mindre, og mot vest må raketten i stedet gi 465 m/s ekstra.']},
 {q:'En satellitt går i sirkelbane ($f=1$). Den skal over i en ellipse der det fjerneste punktet er dobbelt så langt unna. Hvor mange prosent må farten økes? Test i animasjonen. Hva må skje i det fjerneste punktet for at banen skal bli en sirkel der?',
  hint:'Bruk $r_2=\\frac{f^2}{2-f^2}$ fra den første vanskelige oppgaven, med $r_2=2$. Farten i det fjerneste punktet får du fra $r\\cdot v=$ konstant. Sirkelbanefarten i avstanden $r$ er $\\frac{1}{\\sqrt r}$ i disse enhetene.',
  losning:['$\\frac{f^2}{2-f^2}=2$ gir $f^2=\\frac43$, så $f\\approx 1{,}155$. Farten må økes med omtrent 15,5 %. Med 1,15 kommer satellitten ut til $r\\approx 1{,}95$, og med 1,16 til $r\\approx 2{,}06$.',
   'I det fjerneste punktet er farten $v=\\frac{f}{2}\\approx 0{,}58$. Sirkelbanefarten i avstanden 2 er $\\frac{1}{\\sqrt2}\\approx 0{,}71$.',
   'Satellitten må altså øke farten en gang til i det fjerneste punktet, fra 0,58 til 0,71. Slike to fartsøkninger kalles en Hohmann-overgang, og den brukes når satellitter flyttes til høyere baner.']}
]
});

/* ---------- Fjær og harmonisk svingning ---------- */
OPPG('fy-fjaer',{
lett:[
 {q:'Trykk «Slipp fra 20 cm» med startverdiene. Les av den målte svingetiden, og sammenlign med formelen $T=2\\pi\\sqrt{\\frac mk}$.',
  hint:'Svingetiden er tida for én hel svingning, fram og tilbake. Panelet viser både den målte og den teoretiske verdien.',
  losning:['Med $m=0{,}5$ kg og $k=20$ N/m gir formelen $$T=2\\pi\\sqrt{\\frac{0{,}5}{20}}\\approx 0{,}994\\ \\text{s}$$',
   'Den målte svingetiden er den samme. Uten demping stemmer formelen nøyaktig.']},
 {q:'Følg energisøylene mens klossen svinger. Hvor er klossen når all energien er i fjæra? Hvor er den når all energien er kinetisk?',
  hint:'Se på søylene «kinetisk» og «i fjæra», og på klossen samtidig. Sett gjerne på pause.',
  losning:['All energien er i fjæra når klossen er i ytterpunktene. Der står den stille et øyeblikk, og fjæra er mest strukket eller sammenpresset.',
   'All energien er kinetisk når klossen passerer likevektsstillingen. Der er fjæra verken strukket eller presset sammen, og farten er størst.',
   'Summen av de to er like stor hele tiden når det ikke er demping.']},
 {q:'Slå på demping. Hva skjer med utslaget og energisøylene? Hvor blir det av energien?',
  hint:'Se på den røde søylen «varme».',
  losning:['Utslaget blir mindre og mindre, og til slutt stopper klossen i likevektsstillingen.',
   'Den mekaniske energien (kinetisk og i fjæra) blir gradvis til varme på grunn av friksjon og luftmotstand. Den totale energien er den samme hele tiden.']}
],
middels:[
 {q:'Hva skjer med svingetiden når du firedobler massen, fra 0,5 kg til 2 kg? Gjett først, og forklar med formelen.',
  hint:'Massen står under rottegnet i $T=2\\pi\\sqrt{\\frac mk}$.',
  losning:['Svingetiden blir dobbelt så lang, fra 0,99 s til 1,99 s.',
   'Massen står under rottegnet. Firedobler du massen, blir $\\sqrt{4}=2$ ganger så stor. En tung kloss er tregere å sette i gang, så den bruker lengre tid på hver svingning.']},
 {q:'Dra klossen 40 cm ut i stedet for 20 cm, og slipp. Endres svingetiden? Hva skjer med den største farten? Forklar med energibevaring.',
  hint:'All energien er i fjæra i ytterpunktet og kinetisk i midten: $\\tfrac12kA^2=\\tfrac12mv_{\\text{maks}}^2$.',
  losning:['Svingetiden endres ikke. Den avhenger bare av $m$ og $k$, ikke av utslaget.',
   'Fra $\\tfrac12kA^2=\\tfrac12mv_{\\text{maks}}^2$ får vi $v_{\\text{maks}}=A\\sqrt{\\frac km}$. Dobbelt så stort utslag gir dobbelt så stor fart: fra 1,26 m/s til 2,53 m/s.',
   'Klossen må gå dobbelt så langt, men den går dobbelt så fort. Derfor tar det like lang tid.']},
 {q:'Hold klossen 10 cm ute og les av kraften. Bruk Hookes lov til å finne fjærkonstanten. Regn ut energien i fjæra, og sammenlign med søylen.',
  hint:'Hookes lov er $F=-kx$. Husk å gjøre om til meter. Energien i fjæra er $\\tfrac12kx^2$.',
  losning:['Panelet viser $F=-2{,}00$ N når $x=0{,}10$ m. Da er $k=\\frac{2{,}00}{0{,}10}=20$ N/m, som stemmer med glidebryteren.',
   'Energien i fjæra er $\\tfrac12\\cdot 20\\cdot 0{,}10^2=0{,}10$ J. Søylen viser det samme.']}
],
vanskelig:[
 {q:'Finn en masse og en fjærkonstant som gir svingetiden nøyaktig 1,00 s. Hvor mange løsninger finnes det? Hva er sammenhengen mellom $m$ og $k$?',
  hint:'Løs $1{,}00=2\\pi\\sqrt{\\frac mk}$ for $\\frac mk$. Du kan skrive inn en presis masse i tallfeltet.',
  losning:['$$\\frac mk=\\frac{1}{4\\pi^2}\\approx 0{,}0253\\ \\text{s}^2$$',
   'Alle par med $m=0{,}0253\\cdot k$ virker, så det finnes uendelig mange løsninger. For eksempel $k=20$ N/m og $m=0{,}507$ kg, eller $k=40$ N/m og $m=1{,}013$ kg.',
   'Med $k=20$ N/m gir $m=0{,}50$ kg $T=0{,}994$ s, og $m=0{,}51$ kg gir $T=1{,}003$ s. Skriv inn 0,507 for å treffe 1,000 s.']},
 {q:'Newtons 2. lov gir $mx\'\'=-kx$. Vis at $x(t)=A\\cos(\\omega t)$ er en løsning, og finn $\\omega$. Bruk det til å vise formelen for svingetiden.',
  hint:'Deriver $x(t)$ to ganger og sett inn i likningen. Én svingning er ferdig når $\\omega T=2\\pi$.',
  losning:['$x\'(t)=-A\\omega\\sin(\\omega t)$ og $x\'\'(t)=-A\\omega^2\\cos(\\omega t)=-\\omega^2x$.',
   'Innsatt: $m(-\\omega^2x)=-kx$, som stemmer for alle $t$ når $\\omega^2=\\frac km$, altså $\\omega=\\sqrt{\\frac km}$.',
   'Cosinus gjentar seg når $\\omega T=2\\pi$, så $$T=\\frac{2\\pi}{\\omega}=2\\pi\\sqrt{\\frac mk}$$',
   'Med startverdiene er $\\omega=\\sqrt{40}\\approx 6{,}32$ s⁻¹. Den største farten er $A\\omega=0{,}20\\cdot 6{,}32\\approx 1{,}26$ m/s, som i animasjonen.']},
 {q:'Sett dempingen til $b=0{,}2$ kg/s og slipp fra 20 cm ($m=0{,}5$ kg, $k=20$ N/m). Teorien sier at den mekaniske energien avtar omtrent som $E=E_0\\,e^{-bt/m}$. Hvor lang tid tar det før halvparten av energien er blitt varme? Sjekk med animasjonen.',
  hint:'Sett $e^{-bt/m}=\\tfrac12$, og løs for $t$. I animasjonen kan du telle svingninger: halvparten er borte når varmesøylen viser 0,200 J.',
  losning:['$$e^{-bt/m}=\\tfrac12\\quad\\Rightarrow\\quad t=\\frac{m\\ln 2}{b}=\\frac{0{,}5\\cdot 0{,}693}{0{,}2}\\approx 1{,}7\\ \\text{s}$$',
   'Energien ved start er $\\tfrac12\\cdot 20\\cdot 0{,}20^2=0{,}40$ J. Varmesøylen når 0,200 J etter omtrent 1,75 s, altså litt under to svingninger.',
   'Energien avtar med samme faktor i hvert tidsrom. Etter 3,5 s er det igjen en fjerdedel, og etter 5,2 s en åttendedel.']}
]
});

/* ---------- Vindkraft ---------- */
OPPG('fy-vindkraft',{
lett:[
 {q:'Gjett først: Hvor mange ganger større blir effekten i vinden når vindfarten går fra 5 til 10 m/s? Sjekk med animasjonen.',
  hint:'Les av «effekt i vinden» ved 5 m/s og ved 10 m/s, og del det ene tallet på det andre.',
  losning:['Med rotordiameter 120 m er effekten i vinden 0,88 MW ved 5 m/s og 7,07 MW ved 10 m/s. Det er 8 ganger så mye.',
   'Effekten er proporsjonal med $v^3$, og $2^3=8$. Dobbelt så sterk vind gir åtte ganger så mye effekt.']},
 {q:'Hva skjer når rotordiameteren dobles fra 60 m til 120 m, med samme vind? Hvorfor?',
  hint:'Effekten er proporsjonal med arealet rotoren sveiper over, $A=\\pi r^2$.',
  losning:['Effekten i vinden blir fire ganger så stor. Ved 9 m/s er den 1,29 MW med 60 m og 5,15 MW med 120 m.',
   'Arealet er $\\pi r^2$. Dobbelt så stor diameter gir $2^2=4$ ganger så stort areal, og da passerer det fire ganger så mye luft gjennom rotoren.']},
 {q:'Øk vindfarten fra 0 til 30 m/s, og følg med på hva turbinen gir. Når starter den, når gir den full effekt, og hva skjer i storm? Hvorfor stoppes turbinen da?',
  hint:'Se på den gule kurven og teksten øverst til venstre.',
  losning:['Turbinen starter ved 3 m/s. Rundt 11 m/s når den full effekt (merkeeffekten), og da gir den like mye selv om vinden øker.',
   'Ved 25 m/s stoppes den. Kreftene fra vinden ville ellers blitt så store at bladene, tårnet eller generatoren kunne blitt ødelagt.']}
],
middels:[
 {q:'Regn ut effekten i vinden for en rotor med diameter 120 m når vindfarten er 9 m/s. Lufta har massetettheten 1,25 kg/m³. Hvor stor del av effekten tar turbinen ut?',
  hint:'Bruk $P=\\tfrac12\\rho Av^3$ med $A=\\pi r^2$ og $r=60$ m. Sammenlign med «turbinen gir».',
  losning:['$A=\\pi\\cdot 60^2\\approx 11\\,300$ m².',
   '$$P_{\\text{vind}}=\\tfrac12\\cdot 1{,}25\\cdot 11\\,300\\cdot 9^3\\approx 5{,}15\\cdot10^6\\ \\text{W}=5{,}15\\ \\text{MW}$$',
   'Turbinen gir 2,32 MW. Det er $\\frac{2{,}32}{5{,}15}\\approx 45$ % av effekten i vinden.']},
 {q:'En norsk husstand bruker omtrent 16 000 kWh i året. Hvor mange husstander kan turbinen forsyne med startverdiene? Vis utregningen.',
  hint:'Les av årsproduksjonen i GWh. 1 GWh = 1 000 000 kWh.',
  losning:['Med middelvind 8 m/s og diameter 120 m er årsproduksjonen 15,9 GWh, altså $15{,}9\\cdot10^6$ kWh.',
   '$$\\frac{15{,}9\\cdot10^6\\ \\text{kWh}}{16\\,000\\ \\text{kWh}}\\approx 990\\ \\text{husstander}$$',
   'Husk at vinden varierer. Når det er vindstille, må strømmen komme fra et annet sted.']},
 {q:'Forklar hva kapasitetsfaktoren betyr. Bruk merkeeffekten og kapasitetsfaktoren med startverdiene til å regne ut årsproduksjonen, og sjekk mot animasjonen. Et år har 8766 timer.',
  hint:'Hvis turbinen hadde gått med full effekt hele året, ville den produsert merkeeffekten ganger 8766 timer. Kapasitetsfaktoren er hvor stor andel av dette den faktisk produserer.',
  losning:['Kapasitetsfaktoren er den faktiske årsproduksjonen delt på det turbinen ville produsert med full effekt hele året.',
   'Merkeeffekten er 3,96 MW, og kapasitetsfaktoren er 46 %: $$E=3{,}96\\ \\text{MW}\\cdot 8766\\ \\text{h}\\cdot 0{,}46\\approx 16\\,000\\ \\text{MWh}=16\\ \\text{GWh}$$',
   'Animasjonen viser 15,9 GWh. Forskjellen kommer av at kapasitetsfaktoren er avrundet.']}
],
vanskelig:[
 {q:'Hvorfor kan ikke en turbin hente ut all energien i vinden? Hva er den største effekten turbinen kan få ut ved 9 m/s (diameter 120 m)? Sammenlign med det turbinen faktisk gir.',
  hint:'Tenk på hva som ville skjedd med lufta bak rotoren hvis den ble stoppet helt. Betz’ grense er $\\frac{16}{27}$.',
  losning:['Hvis turbinen tok ut all energien, ville lufta stoppet helt bak rotoren. Da kunne ikke ny luft komme fram, og turbinen ville stoppet. Lufta må ha fart igjen når den går ut.',
   'Betz fant at høyst $\\frac{16}{27}\\approx 59$ % kan tas ut: $\\frac{16}{27}\\cdot 5{,}15\\approx 3{,}05$ MW.',
   'Turbinen gir 2,32 MW, altså 45 % av effekten i vinden og omtrent tre firedeler av Betz-grensen. Resten tapes blant annet i friksjon, i generatoren og fordi bladene ikke er perfekte.']},
 {q:'Vis at effekten i vinden er $P=\\tfrac12\\rho Av^3$. Øk så middelvinden på stedet fra 8 til 8,5 m/s. Hvor mange prosent øker effekten i vinden, og hvor mange prosent øker årsproduksjonen? Forklar forskjellen.',
  hint:'Massen av luft som passerer rotoren hvert sekund er $\\rho Av$. Kinetisk energi per kilogram er $\\tfrac12v^2$. Tenk på hva som skjer når turbinen allerede gir full effekt.',
  losning:['Hvert sekund passerer massen $\\rho Av$. Den har kinetisk energi $\\tfrac12(\\rho Av)v^2$, så effekten er $P=\\tfrac12\\rho Av^3$.',
   'Effekten i vinden øker med $\\left(\\frac{8{,}5}{8}\\right)^3\\approx 1{,}20$, altså 20 %.',
   'Årsproduksjonen øker bare fra 15,9 til 17,2 GWh, altså 8 %. Når det blåser mer enn rundt 11 m/s, gir turbinen allerede full effekt, så den ekstra vinden gir ikke mer strøm. Over 25 m/s står den stille.']},
 {q:'Hvor stor middelvind trengs for at turbinen med diameter 120 m skal forsyne 1000 husstander? Hvorfor gir dobbelt så stor middelvind langt fra åtte ganger så stor årsproduksjon?',
  hint:'Prøv ulike verdier for middelvinden, og se på antall husstander. Se på vindfordelingen (de turkise søylene) og på hvor turbinen gir full effekt.',
  losning:['Med 8 m/s forsyner turbinen omtrent 990 husstander, og med 8,5 m/s omtrent 1075. Det trengs altså litt over 8 m/s i middelvind.',
   'Med 5,5 m/s middelvind er årsproduksjonen 7,8 GWh, og med 11 m/s er den 22,0 GWh. Det er bare 2,8 ganger så mye, ikke 8. Turbinen har en øvre grense, merkeeffekten, og den stopper i storm. Med sterk middelvind går den ofte for fullt, og da gir mer vind ingen ekstra strøm.',
   'Ved svak middelvind er det mange timer med for lite vind til at turbinen starter. Derfor er det viktig å bygge turbiner der det blåser jevnt og ganske mye.']}
]
});

/* ---------- Friksjon ---------- */
OPPG('fy-friksjon',{
lett:[
 {q:'Bruk startverdiene (10 kg, $\\mu_s=0{,}5$), og trykk «Øk kraften gradvis». Ved hvilken kraft begynner kassen å gli? Sammenlign med $\\mu_s N$.',
  hint:'Normalkraften er lik tyngden, $N=mg$, fordi underlaget er vannrett og du drar vannrett.',
  losning:['Kassen begynner å gli når kraften er 50 N.',
   'Største hvilefriksjon er $\\mu_s N=0{,}5\\cdot 10\\cdot 9{,}81\\approx 49{,}1$ N. Kraften må være litt større enn dette, og glidebryteren går i hele newton, så kassen glir ved 50 N.']},
 {q:'Dra med 30 N mens kassen står i ro. Hvor stor er friksjonen? Slå på «Vis summen av kreftene». Hva er summen av kreftene?',
  hint:'Kassen står i ro. Hva sier Newtons 1. lov om summen av kreftene da?',
  losning:['Friksjonen er 30 N, like stor som kraften du drar med, men motsatt rettet. Summen av kreftene er 0.',
   'Hvilefriksjonen tilpasser seg. Den er akkurat så stor som trengs for at kassen skal bli stående, men aldri større enn $\\mu_s N\\approx 49$ N.']},
 {q:'Trykk «Start på nytt» og så «Øk kraften gradvis». Beskriv formen på grafen «Friksjonskraft mot kraften du drar med».',
  hint:'Se på grafen før og etter at kassen begynner å gli.',
  losning:['Først er grafen en rett linje gjennom origo. Friksjonen er like stor som kraften du drar med.',
   'Når kraften når omtrent 49 N, faller friksjonen brått ned til 29,4 N. Etterpå er grafen vannrett, fordi glidefriksjonen $\\mu_k N$ er den samme uansett hvor hardt du drar.']}
],
middels:[
 {q:'Kassen glir, og du drar med 50 N. Hva blir akselerasjonen når $m=10$ kg og $\\mu_k=0{,}3$? Regn ut, og sjekk.',
  hint:'Glidefriksjonen er $R=\\mu_k N$. Summen av kreftene er $F-R$.',
  losning:['$R=\\mu_k mg=0{,}3\\cdot 10\\cdot 9{,}81\\approx 29{,}4$ N.',
   '$$a=\\frac{F-R}{m}=\\frac{50-29{,}4}{10}\\approx 2{,}06\\ \\text{m/s}^2$$',
   'Panelet viser det samme mens kassen glir.']},
 {q:'Hvorfor faller friksjonskraften når kassen begynner å gli? Forklar med det som skjer mellom flatene.',
  hint:'Se på de forstørrede flatene. Hva skjer med ujevnhetene og bindingene når flatene ligger i ro mot hverandre, og når de glir?',
  losning:['Når kassen står i ro, får ujevnhetene tid til å gripe godt inn i hverandre, og det dannes bindinger der flatene berører hverandre. Det trengs stor kraft for å rive dem løs.',
   'Når kassen glir, rekker ikke flatene å gripe like godt inn i hverandre, og bindingene blir svakere. Derfor er glidefriksjonen mindre: $\\mu_k<\\mu_s$.',
   'Det er derfor det er tyngre å få noe i gang enn å holde det i gang.']},
 {q:'Kassen glir. Hvor stor kraft må du dra med for at den skal fortsette med konstant fart? Prøv i animasjonen. Hvorfor er ikke 29 N nok?',
  hint:'Konstant fart betyr at akselerasjonen er null. Hva må summen av kreftene være da?',
  losning:['Med konstant fart er summen av kreftene null (Newtons 1. lov), så $F=R=\\mu_k N\\approx 29{,}4$ N.',
   'Glidebryteren går i hele newton. Med 29 N er kraften litt for liten, og kassen bremser sakte opp. Med 30 N øker farten sakte. Når kassen har stoppet, må du opp i 50 N igjen for å få den i gang.']}
],
vanskelig:[
 {q:'Hvorfor bremser en bil best når hjulene ruller, og ikke låser seg? Regn ut bremselengden fra 20 m/s med $\\mu_s=0{,}8$ og med $\\mu_k=0{,}6$.',
  hint:'Når hjulet ruller, står kontaktpunktet mellom dekket og veien stille et øyeblikk. Hvilken friksjon virker da? Med friksjonen som eneste kraft er $a=\\mu g$.',
  losning:['Når hjulet ruller uten å skli, står kontaktpunktet stille mot veien. Da virker hvilefriksjon, og den kan bli større enn glidefriksjonen. Låser hjulene seg, glir dekket, og vi får den mindre glidefriksjonen.',
   'Med friksjonen som eneste kraft er $a=\\mu g$, og bremselengden er $s=\\frac{v^2}{2\\mu g}$.',
   'Hjul som ruller ($\\mu_s=0{,}8$): $s=\\frac{20^2}{2\\cdot 0{,}8\\cdot 9{,}81}\\approx 25{,}5$ m. Låste hjul ($\\mu_k=0{,}6$): $s\\approx 34{,}0$ m.',
   'Derfor har biler ABS-bremser. De slipper bremsene litt mange ganger i sekundet, så hjulene ikke låser seg. Da kan du også styre mens du bremser.']},
 {q:'Kassen glir med 3 m/s, og du slipper tauet. Hvor langt glir den, og hvor lang tid tar det før den stopper ($\\mu_k=0{,}3$)? Vis at svaret ikke avhenger av massen. Avhenger akselerasjonen av massen når du drar med en fast kraft?',
  hint:'Når du har sluppet tauet, er glidefriksjonen den eneste kraften langs underlaget. Skriv $a=\\frac{\\Sigma F}{m}$, og se hva som skjer med $m$.',
  losning:['Etter at du har sluppet, er $\\Sigma F=-\\mu_k mg$, så $a=-\\mu_k g\\approx -2{,}94$ m/s². Massen forkortes bort.',
   '$$s=\\frac{v_0^2}{2\\mu_k g}=\\frac{3^2}{2\\cdot 2{,}94}\\approx 1{,}5\\ \\text{m}\\qquad t=\\frac{v_0}{\\mu_k g}\\approx 1{,}0\\ \\text{s}$$',
   'En tung og en lett kasse med samme fart glir altså like langt.',
   'Når du drar med en fast kraft, er $a=\\frac Fm-\\mu_k g$. Da avhenger akselerasjonen av massen: samme kraft gir en tung kasse mindre akselerasjon.']},
 {q:'Du drar i tauet med en vinkel på 30° oppover i stedet for vannrett. Det kan du ikke stille inn i animasjonen. Vis at normalkraften blir mindre. Hvor stor kraft trengs da for å få kassen på 10 kg i gang med $\\mu_s=0{,}5$?',
  hint:'Del kraften i en vannrett del $F\\cos 30^\\circ$ og en loddrett del $F\\sin 30^\\circ$. Den loddrette delen løfter litt, så $N=mg-F\\sin 30^\\circ$. Kassen begynner å gli når $F\\cos 30^\\circ=\\mu_s N$.',
  losning:['Loddrett: $N+F\\sin 30^\\circ=mg$, så $N=mg-F\\sin 30^\\circ$. Normalkraften blir mindre fordi tauet løfter litt.',
   'Kassen begynner å gli når $F\\cos 30^\\circ=\\mu_s(mg-F\\sin 30^\\circ)$: $$F=\\frac{\\mu_s mg}{\\cos 30^\\circ+\\mu_s\\sin 30^\\circ}=\\frac{0{,}5\\cdot 98{,}1}{0{,}866+0{,}25}\\approx 44\\ \\text{N}$$',
   'Det er mindre enn 49 N, som du trenger når du drar vannrett. Den minste kraften får du når $\\tan\\theta=\\mu_s$, altså ved omtrent 27°.']}
]
});

/* ---------- Klosser i snor ---------- */
OPPG('fy-system',{
lett:[
 {q:'Bruk startverdiene: tre klosser på 2, 3 og 1 kg, $F=18$ N og ingen friksjon. Les av akselerasjonen. Er den lik for alle klossene? Sjekk med $a=\\frac{F}{m_1+m_2+m_3}$.',
  hint:'Klossene er bundet sammen med snorer. Kan én kloss gå fortere enn de andre?',
  losning:['Panelet viser $a=3{,}00$ m/s². Alle klossene har samme akselerasjon, fordi snorene holder dem sammen.',
   '$$a=\\frac{F}{m_1+m_2+m_3}=\\frac{18}{2+3+1}=3\\ \\text{m/s}^2$$']},
 {q:'Hvilken snor drar hardest, $S_1$ eller $S_2$? Les av, og forklar ved å se på hvor mye masse hver snor må dra.',
  hint:'Snor 1 sitter mellom kloss 1 og 2. Snor 2 sitter mellom kloss 2 og 3. Hvilke klosser må hver snor gi akselerasjon?',
  losning:['$S_1=6{,}0$ N og $S_2=15{,}0$ N. Snor 2 drar hardest.',
   'Snor 1 drar bare kloss 1 (2 kg): $S_1=2\\cdot 3=6$ N. Snor 2 drar både kloss 1 og kloss 2 (5 kg): $S_2=5\\cdot 3=15$ N. Kraften $F$ drar alle tre klossene (6 kg): $6\\cdot 3=18$ N.']},
 {q:'Klikk på én kloss om gangen. Hvilke krefter virker vannrett på kloss 1, kloss 2 og kloss 3? Hvilken vei peker de?',
  hint:'En snor drar like hardt bakover på klossen foran som framover på klossen bak.',
  losning:['Kloss 1 (bakerst): bare $S_1$ framover.',
   'Kloss 2: $S_2$ framover og $S_1$ bakover.',
   'Kloss 3 (fremst): $F$ framover og $S_2$ bakover.',
   'For hver kloss er summen av kreftene lik massen ganger akselerasjonen. For kloss 2: $15-6=9$ N, og $3\\ \\text{kg}\\cdot 3\\ \\text{m/s}^2=9$ N.']}
],
middels:[
 {q:'To klosser på 2,0 kg og 3,0 kg ligger på et glatt bord og dras med 10 N. Regn ut akselerasjonen og snordraget mellom klossene. Sjekk med animasjonen.',
  hint:'Se først på hele systemet for å finne $a$. Se så på bare den bakerste klossen: snordraget er den eneste vannrette kraften på den.',
  losning:['Hele systemet: $a=\\frac{F}{m_1+m_2}=\\frac{10}{5{,}0}=2{,}0$ m/s².',
   'Bakerste kloss (2,0 kg): $S=m_1a=2{,}0\\cdot 2{,}0=4{,}0$ N.',
   'Velg to klosser med $m_1=2$ kg og $m_2=3$ kg, og sett $F=10$ N. Animasjonen viser det samme.']},
 {q:'Sett $\\mu=0{,}30$ med tre klosser (2, 3 og 1 kg). Hvor stor må $F$ være for at klossene skal begynne å gli? Hva blir akselerasjonen med 18 N?',
  hint:'Klossene glir når $F$ er større enn den samlede friksjonen $\\mu(m_1+m_2+m_3)g$.',
  losning:['Samlet friksjon: $R=0{,}30\\cdot 6\\cdot 9{,}81\\approx 17{,}7$ N. Klossene begynner å gli når $F$ er større enn dette, altså ved 18 N.',
   'Med 18 N: $$a=\\frac{F-R}{m}=\\frac{18-17{,}66}{6}\\approx 0{,}06\\ \\text{m/s}^2$$ Klossene akselererer veldig sakte.']},
 {q:'Sett først $m_1=3$, $m_2=2$ og $m_3=1$ kg (den tyngste bakerst), og så $m_1=1$, $m_2=2$ og $m_3=3$ kg (den tyngste fremst), med $F=18$ N. Hva skjer med akselerasjonen og med snordragene? Forklar.',
  hint:'Den samlede massen er den samme. Hvor mye masse ligger bak hver snor?',
  losning:['Akselerasjonen er 3,0 m/s² begge gangene, fordi den samlede massen er 6 kg.',
   'Tyngste bakerst: $S_1=3\\cdot 3=9$ N og $S_2=5\\cdot 3=15$ N. Tyngste fremst: $S_1=1\\cdot 3=3$ N og $S_2=3\\cdot 3=9$ N.',
   'Hver snor må dra massen som ligger bak den. Ligger de tunge klossene bakerst, må snorene dra mer.']}
],
vanskelig:[
 {q:'Skru friksjonen opp og ned mens klossene glir. Akselerasjonen endrer seg, men snordragene gjør det ikke. Vis med Newtons 2. lov hvorfor.',
  hint:'Bruk $a=\\frac{F}{M}-\\mu g$ for hele systemet, der $M$ er den samlede massen. Sett inn i likningen for kloss 1: $S_1-\\mu m_1g=m_1a$.',
  losning:['Hele systemet: $F-\\mu Mg=Ma$, så $a=\\frac FM-\\mu g$.',
   'Kloss 1: $S_1-\\mu m_1g=m_1a=m_1\\left(\\frac FM-\\mu g\\right)$. Leddene med $\\mu$ forsvinner: $$S_1=\\frac{m_1}{M}F$$',
   'På samme måte er $S_2=\\frac{m_1+m_2}{M}F$. Friksjonen per kilogram er den samme for alle klossene, så den bremser alle like mye. Snorene trenger ikke å dra ekstra for å hjelpe noen av klossene.',
   'Dette gjelder bare når klossene glir og har samme friksjonstall. Står de i ro, er det annerledes.']},
 {q:'Velg tre klosser og $F=20$ N uten friksjon. Velg massene slik at $S_1=5$ N og $S_2=10$ N. Finnes det flere løsninger?',
  hint:'Bruk $S_1=\\frac{m_1}{M}F$ og $S_2=\\frac{m_1+m_2}{M}F$. Hvor stor andel av den samlede massen må ligge bak hver snor?',
  losning:['$S_1=5$ N er en firedel av $F$, så $m_1$ må være en firedel av den samlede massen.',
   '$S_2=10$ N er halvparten av $F$, så $m_1+m_2$ må være halvparten av den samlede massen. Da er $m_2=m_1$ og $m_3=2m_1$.',
   'For eksempel $m_1=1$ kg, $m_2=1$ kg og $m_3=2$ kg. Da er $a=5$ m/s², $S_1=5$ N og $S_2=10$ N. Alle masser i forholdet $1:1:2$ virker, for eksempel 2, 2 og 4 kg.']},
 {q:'Snora mellom kloss 2 og 3 ryker hvis snordraget blir over 12 N. Hva er den største kraften du kan dra med når massene er 2, 3 og 1 kg og det ikke er friksjon? Hva skjer med $\\mu=0{,}30$?',
  hint:'Bruk $S_2=\\frac{m_1+m_2}{M}F$, og sett $S_2=12$ N. Hvor stor kraft trengs for å få klossene i gang med friksjon?',
  losning:['$$S_2=\\frac{2+3}{6}F=12\\ \\text{N}\\quad\\Rightarrow\\quad F=14{,}4\\ \\text{N}$$',
   'Du kan altså dra med høyst 14,4 N. I animasjonen gir 14 N $S_2=11{,}7$ N, og 15 N gir $S_2=12{,}5$ N.',
   'Med $\\mu=0{,}30$ trengs minst 17,7 N for å få klossene i gang. Når de glir, er snordragene de samme som uten friksjon (se den første vanskelige oppgaven), så $S_2$ ville blitt 15 N. Snora ryker altså før klossene kommer i gang.']}
]
});

/* ---------- Vekt i heis ---------- */
OPPG('fy-heis',{
lett:[
 {q:'Trykk «Kjør opp 5 etasjer» med startverdiene (60 kg). Hva viser vekta i starten, underveis og når heisen bremser?',
  hint:'Følg med på tallet på vekta og på grafen «Hva vekta viser».',
  losning:['I starten viser vekta 69,2 kg, mens heisen akselererer oppover.',
   'Underveis, med konstant fart, viser den 60,0 kg, som er din vanlige masse.',
   'Når heisen bremser på vei opp, viser den 50,8 kg.']},
 {q:'Trykk «Kjør ned 5 etasjer». Når viser vekta minst, og når viser den mest? Sammenlign med turen opp.',
  hint:'Det er akselerasjonen som betyr noe, ikke farten. Hvilken vei peker akselerasjonen i starten og i slutten av turen ned?',
  losning:['Vekta viser minst (50,8 kg) i starten av turen ned, når heisen akselererer nedover.',
   'Den viser mest (69,2 kg) i slutten, når heisen bremser. Da peker akselerasjonen oppover, selv om heisen beveger seg nedover.',
   'Turen ned er speilvendt av turen opp.']},
 {q:'Trykk «Fritt fall (kabelen ryker)». Hva viser vekta mens heisen faller fritt? Hvorfor?',
  hint:'Vekta måler hvor hardt du presser på den. Hva skjer når både du og vekta faller med samme akselerasjon?',
  losning:['Vekta viser 0 kg.',
   'Både du og vekta faller med akselerasjonen $g$. Da presser du ikke på vekta, og normalkraften er null. Du er vektløs, selv om tyngdekraften virker på deg som før.']}
],
middels:[
 {q:'Hva viser vekta når heisen akselererer oppover med 2,0 m/s² og du har massen 60 kg? Regn ut, og sjekk.',
  hint:'Bruk Newtons 2. lov på deg selv: $N-mg=ma$.',
  losning:['$$N=m(g+a)=60\\cdot(9{,}81+2{,}0)\\approx 709\\ \\text{N}$$',
   'Vekta viser $\\frac{N}{g}=\\frac{709}{9{,}81}\\approx 72{,}2$ kg.',
   'Sett akselerasjonen til 2,0 m/s², og kjør opp. Animasjonen viser det samme i starten av turen.']},
 {q:'Vekta viser 66 kg for en person på 60 kg. Hvor stor er akselerasjonen, og hvilken vei peker den? Hvilke to bevegelser kan heisen ha akkurat da?',
  hint:'Normalkraften er $N=66\\cdot 9{,}81$ N. Bruk $N-mg=ma$, og løs for $a$.',
  losning:['$$a=\\frac{N}{m}-g=\\frac{66\\cdot 9{,}81}{60}-9{,}81\\approx 0{,}98\\ \\text{m/s}^2$$ oppover.',
   'Heisen kan enten starte på vei opp, eller bremse på vei ned. I begge tilfellene peker akselerasjonen oppover.',
   'Sjekk: Med akselerasjonen 1,0 m/s² viser vekta 66,1 kg i starten av en tur opp og i slutten av en tur ned.']},
 {q:'Med startverdiene akselererer heisen med 1,5 m/s² opp til 3,0 m/s. Hvor lang tid tar akselerasjonen, og hvor langt kjører heisen da? Hvor lang tid tar hele turen på 5 etasjer (15 m)?',
  hint:'Turen har tre deler: akselerasjon, konstant fart og bremsing. Bremsingen tar like lang tid og like lang strekning som akselerasjonen.',
  losning:['Akselerasjonen tar $t=\\frac{3{,}0}{1{,}5}=2{,}0$ s. Strekningen er $s=\\tfrac12\\cdot 1{,}5\\cdot 2{,}0^2=3{,}0$ m.',
   'Bremsingen tar også 2,0 s og 3,0 m. Da er det $15-6=9$ m igjen med konstant fart, og det tar $\\frac{9}{3{,}0}=3{,}0$ s.',
   '<strong>Svar:</strong> Hele turen tar $2+3+2=7$ s. Du kan se de tre delene på akselerasjonsgrafen.']}
],
vanskelig:[
 {q:'Ved «Fritt fall» faller heisen fritt i 1,1 s. Så bremser nødbremsen med akselerasjonen $2g$ oppover. Hvor fort gikk heisen da bremsen slo inn? Hvor langt falt den til sammen? Hva viser vekta under bremsingen?',
  hint:'Bruk $v=gt$ for fallet. Under bremsingen er $a=2g$ oppover, så $N=m(g+2g)$.',
  losning:['Etter 1,1 s fritt fall er farten $v=9{,}81\\cdot 1{,}1\\approx 10{,}8$ m/s, og heisen har falt $\\tfrac12\\cdot 9{,}81\\cdot 1{,}1^2\\approx 5{,}9$ m.',
   'Bremsestrekningen er $s=\\frac{v^2}{2\\cdot 2g}=\\frac{10{,}8^2}{2\\cdot 19{,}6}\\approx 3{,}0$ m. Til sammen faller heisen omtrent 8,9 m, altså tre etasjer.',
   'Under bremsingen er $N=m\\cdot 3g$, så vekta viser $3\\cdot 60=180$ kg. Du kjenner deg tre ganger så tung.']},
 {q:'Astronautene på romstasjonen ISS svever vektløse, men tyngdekraften der oppe er bare omtrent 11 % mindre enn på bakken. Forklar hvorfor de likevel er vektløse. Bruk heisen i fritt fall som modell.',
  hint:'ISS går i bane rundt Jorda. Hvilken akselerasjon har romstasjonen, og hvilken akselerasjon har astronautene?',
  losning:['400 km over bakken er $g\\approx 9{,}81\\cdot\\left(\\frac{6371}{6771}\\right)^2\\approx 8{,}7$ m/s², omtrent 11 % mindre enn på bakken.',
   'ISS og astronautene faller hele tiden mot Jorda med denne akselerasjonen. De har så stor fart sidelengs at de faller rundt Jorda i stedet for ned på den.',
   'Astronautene og romstasjonen faller med samme akselerasjon, så astronautene presser ikke mot gulvet. Normalkraften er null, akkurat som i heisen i fritt fall. Vektløshet betyr altså ikke at tyngdekraften er borte, men at du er i fritt fall.']},
 {q:'Se på akselerasjonsgrafen for en tur opp 5 etasjer. Regn ut arealet under grafen i starten og i slutten av turen. Hva betyr arealet? Hvorfor er summen null?',
  hint:'Arealet under en akselerasjonsgraf er endringen i fart, $\\Delta v=a\\cdot\\Delta t$.',
  losning:['I starten er arealet $1{,}5\\ \\text{m/s}^2\\cdot 2{,}0\\ \\text{s}=3{,}0$ m/s. Det er farten heisen får.',
   'I slutten er arealet $-1{,}5\\cdot 2{,}0=-3{,}0$ m/s. Det er farten heisen mister.',
   'Summen er null fordi heisen står stille både før og etter turen. Det betyr også at vekta i snitt viser din vanlige masse over hele turen: den viser like mye for mye i starten som for lite i slutten.']}
]
});

/* ---------- Strikkhopp ---------- */
OPPG('fy-strikkhopp',{
lett:[
 {q:'Trykk «Hopp!» med startverdiene. Hvor stor er den største akselerasjonen, målt i g? Når skjer den, og hvilken vei peker den?',
  hint:'Se på panelet og på akselerasjonsgrafen. Positiv akselerasjon er nedover i grafen.',
  losning:['Den største akselerasjonen er omtrent 2,6 g.',
   'Den kommer i bunnen av hoppet, når strikken er mest strukket. Da peker den oppover, og strikken drar mye hardere enn tyngdekraften.',
   'De første metrene er akselerasjonen omtrent 1 g nedover, fordi hopperen faller nesten fritt.']},
 {q:'Hva skjer med det laveste punktet hvis en tyngre person hopper med samme strikk? Prøv 70 kg og 120 kg.',
  hint:'Les av «laveste punkt» i panelet for begge massene.',
  losning:['Med 70 kg kommer hopperen ned til 45,6 m over vannet, og med 120 kg ned til 33,9 m.',
   'En tyngre person har mer potensiell energi, og tyngdekraften drar hardere. Strikken må strekkes mer før den kan stoppe hopperen. Derfor må strikken tilpasses vekten til den som hopper.']},
 {q:'Følg energisøylene under hoppet. Når er energien i strikken størst? Hvor er energien blitt av når hopperen henger nesten stille til slutt?',
  hint:'Søylene viser energi i tyngdefeltet, bevegelsesenergi, energi i strikken og varme.',
  losning:['Energien i strikken er størst i det laveste punktet. Der står hopperen stille et øyeblikk, og strikken er mest strukket.',
   'Når hopperen henger nesten stille, er mye av energien blitt til varme på grunn av luftmotstand og friksjon inne i strikken. Litt er lagret i strikken, som fortsatt er strukket.']}
],
middels:[
 {q:'Sett massen til 120 kg. Finn den lengste strikken der hopperen ikke treffer vannet. Hvorfor går ikke dette med 70 kg?',
  hint:'Øk lengden på strikken én meter om gangen, trykk «Hopp!», og les av det laveste punktet.',
  losning:['Med 120 kg gir en strikk på 56 m det laveste punktet 1,1 m over vannet. Med 57 m treffer hopperen vannet.',
   'Med 70 kg kommer hopperen bare ned til 10,3 m over vannet, selv med den lengste strikken på 60 m. En lettere person strekker strikken mindre.']},
 {q:'Sett luftmotstanden til 0. Regn ut farten når strikken begynner å strammes, etter 30 m fritt fall. Den største farten i panelet er litt høyere. Hvorfor?',
  hint:'Bruk $v=\\sqrt{2gh}$. Tenk på kreftene rett etter at strikken har begynt å strammes: er strikkraften større eller mindre enn tyngden?',
  losning:['$$v=\\sqrt{2gh}=\\sqrt{2\\cdot 9{,}81\\cdot 30}\\approx 24{,}3\\ \\text{m/s}$$',
   'Panelet viser omtrent 25,0 m/s. Rett etter at strikken begynner å strammes, drar den svakere enn tyngdekraften. Kraftsummen peker fortsatt nedover, så farten øker litt til.',
   'Farten er størst der strikkraften er lik tyngden: $k\\Delta x=mg$, altså når strikken er strukket $\\frac{70\\cdot 9{,}81}{100}\\approx 6{,}9$ m.']},
 {q:'Hvorfor bør strikken ikke være for stiv? Sammenlign den største akselerasjonen med stivhet 100 N/m og 400 N/m.',
  hint:'Les av den største akselerasjonen i g for begge. Tenk på hvor lang bremsestrekning strikken gir.',
  losning:['Med 100 N/m er den største akselerasjonen omtrent 2,6 g. Med 400 N/m er den omtrent 5,2 g.',
   'En stiv strikk stopper hopperen på kort strekning. Da må kraften være stor, og akselerasjonen blir stor. Det kan skade nakken og ryggen.',
   'En myk strikk gir lang bremsestrekning og liten akselerasjon. Den må bare ikke være så myk eller så lang at hopperen treffer vannet.']}
],
vanskelig:[
 {q:'Regn ut det laveste punktet med energibevaring for startverdiene, uten luftmotstand og uten varmetap i strikken. Sammenlign med animasjonen når luftmotstanden er 0. Hvorfor stemmer det ikke helt?',
  hint:'I det laveste punktet står hopperen stille. Kall strekket $x$. Da er $mg(L+x)=\\tfrac12kx^2$. Løs andregradslikningen.',
  losning:['$70\\cdot 9{,}81\\cdot(30+x)=\\tfrac12\\cdot 100\\cdot x^2$ gir $50x^2-686{,}7x-20\\,601=0$, så $x\\approx 28{,}3$ m.',
   'Hopperen faller da $30+28{,}3=58{,}3$ m og kommer ned til $100-58{,}3\\approx 41{,}7$ m over vannet.',
   'Animasjonen viser 43,5 m med luftmotstand 0. Forskjellen kommer av at strikken har indre friksjon. Den gjør litt av energien om til varme, og da strekkes strikken litt mindre.']},
 {q:'Bruk energiregningen fra forrige oppgave til å finne den største akselerasjonen i bunnen. Hvorfor er den mye større enn 1 g?',
  hint:'I bunnen virker strikkraften $kx$ oppover og tyngden $mg$ nedover. Bruk $a=\\frac{kx-mg}{m}$.',
  losning:['$$a=\\frac{kx-mg}{m}=\\frac{100\\cdot 28{,}3-686{,}7}{70}\\approx 30{,}6\\ \\text{m/s}^2\\approx 3{,}1g$$',
   'Animasjonen viser omtrent 2,9 g uten luftmotstand. Det er litt mindre, fordi strikken strekkes litt mindre når den har indre friksjon.',
   'Strikken må stoppe en fart på rundt 25 m/s på knapt 30 m. Da må den dra mye hardere enn tyngdekraften. Kraften er størst der strikken er mest strukket, akkurat i bunnen.']},
 {q:'En person på 100 kg skal hoppe med en strikk på 30 m og stoppe 5 m over vannet. Hvor stiv må strikken være, uten luftmotstand og tap? Test med animasjonen med luftmotstand 0. Hvorfor gir animasjonen en sikkerhetsmargin?',
  hint:'Hopperen faller $100-5=95$ m, og strikken strekkes $95-30=65$ m. Sett $mg\\cdot 95=\\tfrac12k\\cdot 65^2$.',
  losning:['$$k=\\frac{2mg\\cdot 95}{65^2}=\\frac{2\\cdot 100\\cdot 9{,}81\\cdot 95}{4225}\\approx 44\\ \\text{N/m}$$',
   'Glidebryteren går i steg på 5 N/m. Med 45 N/m og luftmotstand 0 stopper hopperen omtrent 10 m over vannet.',
   'Det er bedre enn regningen fordi strikken gjør litt av energien om til varme. Med luftmotstand blir marginen enda større. Ekte strikkhopp har store sikkerhetsmarginer, fordi vekt, strikk og vær aldri er helt som i regnestykket.']}
]
});

/* ---------- Ballistisk pendel ---------- */
OPPG('fy-ballistisk',{
lett:[
 {q:'Trykk «Skyt» med startverdiene. Hvor høyt svinger klossen, og hvor fort går den rett etter støtet? Les av i panelet.',
  hint:'Se på «fart etter støtet» og «høyde».',
  losning:['Klossen får farten 0,998 m/s rett etter støtet og svinger 5,07 cm opp.',
   'Kula går 400 m/s, men klossen er 400 ganger så tung. Derfor får klossen og kula sammen en mye mindre fart.']},
 {q:'Øk farten til kula. Hva skjer med høyden klossen svinger opp til? Blir høyden dobbelt så stor når farten dobles?',
  hint:'Sammenlign høyden med 200 m/s og 400 m/s.',
  losning:['Høyden blir fire ganger så stor når farten dobles: 200 m/s gir 1,27 cm, og 400 m/s gir 5,07 cm.',
   'Farten etter støtet er proporsjonal med farten til kula. Høyden er proporsjonal med kvadratet av farten etter støtet, fordi $h=\\frac{V^2}{2g}$.']},
 {q:'Se på energitapet i panelet. Hvor mye av kulas bevegelsesenergi blir igjen som bevegelsesenergi etter støtet? Hvor blir resten av?',
  hint:'Energitapet står i prosent.',
  losning:['Energitapet er 99,75 %. Bare 0,25 % av energien blir igjen som bevegelsesenergi.',
   'Resten blir til varme og deformasjon når kula borer seg inn i klossen. Kula og klossen blir litt varmere, og kula blir flatklemt.']}
],
middels:[
 {q:'Regn ut farten til klossen rett etter støtet med startverdiene. Hvorfor kan vi bruke bevaring av bevegelsesmengde her?',
  hint:'Bruk $mv=(m+M)V$. Husk å gjøre om grammene til kilogram.',
  losning:['$$V=\\frac{mv}{m+M}=\\frac{0{,}010\\cdot 400}{0{,}010+4}\\approx 0{,}998\\ \\text{m/s}$$',
   'Støtet varer veldig kort. I den korte tida rekker ingen ytre krefter i vannrett retning å virke, så bevegelsesmengden er bevart.']},
 {q:'Hvor mange prosent av kulas bevegelsesenergi blir til varme? Vis at andelen som blir igjen, er $\\frac{m}{m+M}$.',
  hint:'Regn ut $E_k$ før og etter støtet. Bruk $V=\\frac{mv}{m+M}$ i uttrykket for $E_k$ etter.',
  losning:['Før: $E_k=\\tfrac12\\cdot 0{,}010\\cdot 400^2=800$ J. Etter: $E_k=\\tfrac12\\cdot 4{,}01\\cdot 0{,}998^2\\approx 2{,}0$ J.',
   'Generelt: $$\\frac{E_{\\text{etter}}}{E_{\\text{før}}}=\\frac{\\tfrac12(m+M)V^2}{\\tfrac12mv^2}=\\frac{m}{m+M}=\\frac{0{,}010}{4{,}01}\\approx 0{,}25\\ \\%$$',
   'Altså blir 99,75 % til varme og deformasjon. Det stemmer med panelet.']},
 {q:'Hvorfor kan vi ikke bruke energibevaring i selve støtet, men vi kan bruke den når klossen svinger opp etterpå?',
  hint:'Tenk på hvilke krefter som gjør arbeid i hver del av forsøket.',
  losning:['I støtet borer kula seg inn i klossen. Kreftene mellom kula og klossen gjør arbeid som blir til varme og deformasjon. Den mekaniske energien er ikke bevart, men bevegelsesmengden er det.',
   'Når klossen svinger opp, virker bare tyngden og snorkraften. Snorkraften står vinkelrett på bevegelsen og gjør ikke arbeid. Da er mekanisk energi bevart: $\\tfrac12(m+M)V^2=(m+M)gh$.']}
],
vanskelig:[
 {q:'Klossen svinger 5,0 cm opp. Kula veier 10 g, og klossen veier 4,0 kg. Hvor fort gikk kula? Utled formelen $v=\\frac{m+M}{m}\\sqrt{2gh}$ først.',
  hint:'Regn baklengs: Finn $V$ fra høyden med energibevaring, og bruk så bevaring av bevegelsesmengde.',
  losning:['Energibevaring etter støtet: $\\tfrac12(m+M)V^2=(m+M)gh$, så $V=\\sqrt{2gh}$.',
   'Bevegelsesmengde i støtet: $mv=(m+M)V$, så $$v=\\frac{m+M}{m}\\sqrt{2gh}=\\frac{4{,}01}{0{,}010}\\sqrt{2\\cdot 9{,}81\\cdot 0{,}050}\\approx 397\\ \\text{m/s}$$',
   '<strong>Svar:</strong> Omtrent 400 m/s. Det stemmer med animasjonen, der 400 m/s gir 5,07 cm.']},
 {q:'Det er lettere å måle vinkelen snorene svinger ut, enn høyden. Snorene er 1,5 m lange. Vis at $h=L(1-\\cos\\theta)$. Klossen (4,0 kg) svinger ut 20° etter et skudd med en kule på 10 g. Hvor fort gikk kula?',
  hint:'Tegn snora loddrett og i vinkelen $\\theta$. Hvor høyt over det laveste punktet er klossen når snora står på skrå?',
  losning:['Når snora står i vinkelen $\\theta$, er klossen $L\\cos\\theta$ under opphengspunktet. I det laveste punktet er den $L$ under. Høyden er derfor $h=L-L\\cos\\theta=L(1-\\cos\\theta)$.',
   '$h=1{,}5\\,(1-\\cos 20^\\circ)\\approx 0{,}090$ m, og $V=\\sqrt{2\\cdot 9{,}81\\cdot 0{,}090}\\approx 1{,}33$ m/s.',
   '$$v=\\frac{4{,}01}{0{,}010}\\cdot 1{,}33\\approx 530\\ \\text{m/s}$$ Sjekk: Med 530 m/s viser animasjonen et utslag på omtrent 20°.']},
 {q:'Bruk en kloss på 1,0 kg og en kule på 10 g. Hvor fort kan kula gå uten at snorene svinger høyere enn vannrett? Regn ut, og test. Hvorfor bruker man en tung kloss til raske kuler?',
  hint:'Snorene er vannrette når $h=L=1{,}5$ m. Finn $V$ fra høyden, og regn baklengs til $v$.',
  losning:['Med $h=1{,}5$ m blir $V=\\sqrt{2\\cdot 9{,}81\\cdot 1{,}5}\\approx 5{,}42$ m/s.',
   '$$v=\\frac{1{,}01}{0{,}010}\\cdot 5{,}42\\approx 550\\ \\text{m/s}$$ I animasjonen gir 540 m/s et utslag på 88°, og med 550 m/s går snorene forbi vannrett.',
   'Med en tung kloss blir farten etter støtet liten, og utslaget holder seg lite selv for raske kuler. Med 4 kg kan kula gå over 2000 m/s før snorene blir vannrette. Klossen må likevel ikke være så tung at utslaget blir for lite til å måles nøyaktig.']}
]
});

/* ---------- Spesifikk varmekapasitet ---------- */
OPPG('fy-varmekapasitet',{
lett:[
 {q:'Velg «Varm opp ulike stoffer». Alle stoffene får like mye energi hvert sekund. Hvilket stoff blir varmt raskest, og hvilket blir det sist? Hva har det med varmekapasiteten å gjøre?',
  hint:'Sammenlign med varmekapasitetene: vann 4180, matolje 1970, aluminium 900 og kobber 385 J/(kg·K).',
  losning:['Kobber blir varmt raskest, og vann sist.',
   'Kobber har lavest spesifikk varmekapasitet, så det trengs lite energi for å varme det opp. Vann har høyest varmekapasitet og trenger mest energi for hver grad. Med samme energi blir vannet derfor minst varmt.']},
 {q:'Slipp en aluminiumskloss (0,5 kg, 100 °C) ned i 0,5 kg vann på 20 °C. Hva skjer med temperaturene? Hvor ender de?',
  hint:'Følg begge temperaturene på grafen.',
  losning:['Klossen blir kaldere og vannet varmere, til begge har samme temperatur. Det kalles termisk likevekt.',
   'Sluttemperaturen er 34,2 °C. Den ligger mye nærmere starttemperaturen til vannet enn klossens, fordi vann trenger mye mer energi per grad enn aluminium.']},
 {q:'Bytt til bly med samme masse og temperatur. Hvorfor blir vannet nesten ikke varmere?',
  hint:'Bly har spesifikk varmekapasitet 130 J/(kg·K). Hvor mye energi gir blyklossen fra seg når den kjøles én grad?',
  losning:['Sluttemperaturen blir bare 22,4 °C.',
   'Bly har svært lav varmekapasitet. Når blyklossen kjøles fra 100 °C, gir den fra seg lite energi, og den energien er ikke nok til å varme vannet mye.']}
],
middels:[
 {q:'Regn ut sluttemperaturen når 0,5 kg aluminium på 100 °C slippes ned i 0,5 kg vann på 20 °C. Sett avgitt varme lik mottatt varme. Sjekk med animasjonen.',
  hint:'Klossen avgir $Q=m_1c_1(T_1-T)$, og vannet mottar $Q=m_2c_2(T-T_2)$. Sett dem like, og løs for $T$.',
  losning:['$$0{,}5\\cdot 900\\cdot(100-T)=0{,}5\\cdot 4180\\cdot(T-20)$$',
   '$450\\,(100-T)=2090\\,(T-20)$ gir $45\\,000+41\\,800=2540\\,T$, så $T\\approx 34{,}2$ °C.',
   'Animasjonen viser 34,2 °C.']},
 {q:'Hvor lang tid tar det å varme 1 kg vann 30 °C med en kokeplate på 500 W, hvis all energien går til vannet? Sjekk med «Varm opp ulike stoffer».',
  hint:'Finn energien med $Q=mc\\Delta T$, og bruk $t=\\frac QP$.',
  losning:['$Q=1\\cdot 4180\\cdot 30=125\\,400$ J.',
   '$$t=\\frac{Q}{P}=\\frac{125\\,400\\ \\text{J}}{500\\ \\text{W}}\\approx 251\\ \\text{s}$$',
   'I animasjonen har vannet nådd 50 °C etter omtrent 250 s. Kobberet nådde 100 °C allerede etter 62 s.']},
 {q:'Hvorfor blir sanden på stranda mye varmere enn vannet en solskinnsdag? Hvorfor er det motsatt om natta?',
  hint:'Sand har spesifikk varmekapasitet rundt 800 J/(kg·K), og vann har 4180 J/(kg·K). Sola gir omtrent like mye energi per kvadratmeter til begge.',
  losning:['Vann trenger omtrent fem ganger så mye energi som sand for å bli én grad varmere. Med samme energi fra sola blir sanden mye varmere.',
   'Sola varmer dessuten bare det øverste tynne laget av sanden, mens vannet blandes og fordeler varmen nedover.',
   'Om natta gir sanden raskt fra seg varmen og blir kald. Vannet holder på varmen. Derfor jevner havet ut temperaturen i kystklima.']}
],
vanskelig:[
 {q:'En kloss av et ukjent metall veier 0,5 kg og har temperaturen 100 °C. Den slippes i 0,5 kg vann på 20 °C, og sluttemperaturen blir 27,8 °C. Regn ut den spesifikke varmekapasiteten, og finn ut hvilket metall det er. Sjekk i animasjonen.',
  hint:'Sett $m_1c_1(T_1-T)=m_2c_2(T-T_2)$, og løs for $c_1$.',
  losning:['$$c_1=\\frac{m_2c_2(T-T_2)}{m_1(T_1-T)}=\\frac{0{,}5\\cdot 4180\\cdot 7{,}8}{0{,}5\\cdot 72{,}2}\\approx 450\\ \\text{J/(kg}\\cdot\\text{K)}$$',
   'Det er jern. Velg jern i animasjonen, og du får 27,8 °C.',
   'Slik måles varmekapasitet i et laboratorium med et kalorimeter. I virkeligheten går litt varme til omgivelsene og til begeret, så målingen blir litt unøyaktig.']},
 {q:'Hvor mye vann har like stor varmekapasitet som 1,0 kg aluminium? Hva blir sluttemperaturen da, med klossen på 100 °C og vannet på 20 °C? Forklar svaret uten å regne.',
  hint:'Varmekapasiteten til en gjenstand er $mc$. Sett $m_{\\text{vann}}\\cdot 4180=1{,}0\\cdot 900$.',
  losning:['$$m_{\\text{vann}}=\\frac{1{,}0\\cdot 900}{4180}\\approx 0{,}215\\ \\text{kg}$$',
   'Når klossen og vannet har like stor varmekapasitet, endrer de temperaturen like mye. Klossen blir like mange grader kaldere som vannet blir varmere, så sluttemperaturen havner midt mellom: 60 °C.',
   'Skriv inn 0,215 for massen av vannet, og sjekk at animasjonen gir 60,0 °C.']},
 {q:'En kloss av jern på 1,0 kg og 300 °C slippes i 0,5 kg vann på 20 °C. Hva sier modellen at sluttemperaturen blir? Hva ville skjedd i virkeligheten, og hvilken antagelse i modellen holder ikke?',
  hint:'Regn ut som før. Tenk så på hva som skjer når glødende jern treffer vann.',
  losning:['Modellen gir $$T=\\frac{1{,}0\\cdot 450\\cdot 300+0{,}5\\cdot 4180\\cdot 20}{1{,}0\\cdot 450+0{,}5\\cdot 4180}\\approx 69{,}6\\ ^\\circ\\text{C}$$',
   'I virkeligheten koker vannet rundt klossen med en gang den treffer. Dampen forsvinner ut og tar med seg mye energi, fordi fordamping krever 2,26 MJ/kg.',
   'Modellen antar at ingen energi går til omgivelsene, og at vannet ikke koker. Det holder godt når temperaturene er lave, men ikke når klossen er mye varmere enn 100 °C. Da blir sluttemperaturen lavere, og noe av vannet forsvinner.']}
]
});

/* ---------- Strømforsyning ---------- */
OPPG('fy-energikilder',{
lett:[
 {q:'Bruk startverdiene (vinter, vanlig vær). Hvor stor andel av strømmen er fornybar denne uka? Prøv så «Lite vind» og «Mye vind». Hva skjer med gasskraften og CO₂-utslippet?',
  hint:'Les av «fornybar», «gasskraft» og «CO₂» i panelet for hvert vær.',
  losning:['Med vanlig vær er 87 % fornybar, og gasskraften gir 79 GWh med 31 600 tonn CO₂.',
   'Med lite vind faller andelen til 78 %, og utslippet blir 50 700 tonn. Med mye vind blir 95 % fornybar, og utslippet går ned til 10 800 tonn.',
   'Når en stor del av strømmen kommer fra vind, bestemmer været mye av utslippet.']},
 {q:'Sammenlign sommer og vinter med startverdiene. Når er forbruket størst? Når gir solkraften mest? Passer det godt sammen?',
  hint:'Se på forbrukskurven og på den gule solkraften.',
  losning:['Forbruket er mye større om vinteren (587 GWh denne uka) enn om sommeren (364 GWh), fordi vi bruker mye strøm til oppvarming.',
   'Solkraften gir mest om sommeren og nesten ingenting om vinteren i Norge. Den gir altså mest når vi trenger minst.',
   'Om sommeren trengs det ingen gasskraft med startverdiene.']},
 {q:'Hvorfor er vannkraft så verdifull i et kraftsystem med mye vind og sol?',
  hint:'Hva kan du gjøre med vannkraft som du ikke kan gjøre med sol og vind?',
  losning:['Vannkraft kan reguleres. Vannet kan lagres i magasinene og brukes når det trengs, for eksempel en vindstille kveld om vinteren.',
   'Når det blåser mye, kan vannkraften skrus ned og vannet spares til senere. Vannmagasinene virker som et stort batteri for sol- og vindkraften.']}
],
middels:[
 {q:'Velg vinter og «Lite vind». Hvor mye gasskraft trengs denne uka med startverdiene? Hvor mye CO₂ blir det? Vis hvordan CO₂-tallet er regnet ut.',
  hint:'Gasskraft gir omtrent 0,4 kg CO₂ per kWh. 1 GWh = 1 000 000 kWh.',
  losning:['Gasskraften gir 126,7 GWh denne uka.',
   '$$126{,}7\\cdot10^6\\ \\text{kWh}\\cdot 0{,}4\\ \\tfrac{\\text{kg}}{\\text{kWh}}\\approx 5{,}07\\cdot10^7\\ \\text{kg}\\approx 50\\,700\\ \\text{tonn}$$']},
 {q:'Velg vinter og «Lite vind». Hvor mye solkraft må du bygge for å merke forskjell? Prøv det samme om sommeren. Hvorfor er forskjellen så stor?',
  hint:'Øk solkraften i store steg, og se på gasskraften. Se også på solkurven gjennom døgnet.',
  losning:['Om vinteren hjelper solkraften lite. Selv 4000 MW sol tar bare gasskraften ned fra 126,7 til 112,1 GWh.',
   'Om sommeren trengs det ingen gasskraft med vanlig vær, uansett hvor mye sol du har. Med 4000 MW sol blir det i stedet 24 GWh overskudd som må eksporteres, lagres eller kastes.',
   'Om vinteren står sola lavt, og bare noen få timer om dagen. I modellen gir solkraften om vinteren i snitt bare 2,5 % av den installerte effekten, mot 25 % om sommeren.']},
 {q:'Velg vinter og «Lite vind». Hvor mye vannkraft trengs for at du ikke skal trenge gasskraft i det hele tatt? Sammenlign med det største forbruket i løpet av uka.',
  hint:'Øk vannkraften til gasskraften blir 0. Det største forbruket ser du på toppen av forbrukskurven.',
  losning:['Med 4000 MW vannkraft trengs det nesten ingen gasskraft (0,2 GWh), og med 4200 MW trengs det ingen.',
   'Det største forbruket i uka er omtrent 4100 MW. I timene uten vind og sol må vannkraften dekke nesten alt alene. Derfor må den største effekten være omtrent like stor som det største forbruket.',
   'Det er ikke nok å ha nok energi i løpet av uka. Kraftsystemet må også ha nok effekt i den verste timen.']}
],
vanskelig:[
 {q:'Vurder påstanden: «Vi kan bare bygge mer vindkraft, så slipper vi utslipp.» Velg vinter og vanlig vær, og øk vindkraften til 5000 MW. Hva skjer med gasskraften? Hvor mye gass trengs i den verste timen? Prøv også «Lite vind».',
  hint:'Se på gasskraften i panelet og på den røde gasskraften i grafen. Finnes det timer der det nesten ikke blåser?',
  losning:['Med 5000 MW vindkraft går gasskraften ned fra 79 til 20 GWh, og det blir 7 GWh overskudd. Det er en stor forbedring.',
   'Men det finnes fortsatt timer nesten uten vind. Da må gasskraften gi like mye som uten den ekstra vindkraften, omtrent 1600 MW. Med «Lite vind» trengs det fortsatt 80 GWh gass.',
   'Påstanden stemmer ikke helt. Mer vindkraft gir mindre utslipp, men den fjerner ikke behovet for regulerbar kraft når det ikke blåser. Det trengs også vannkraft, lagring, kraftutveksling med andre land eller lavere forbruk.']},
 {q:'En vinteruke med lite vind gir 50 700 tonn CO₂ med startverdiene. Hvor mye vindkraft må du bygge for å halvere utslippet? Hvor mye vannkraft gir samme halvering? Forklar forskjellen.',
  hint:'Halvert utslipp betyr at gasskraften må ned til rundt 63 GWh. Øk først vindkraften, og prøv så å øke vannkraften i stedet.',
  losning:['Med vindkraft klarer du det ikke. Selv 5000 MW vind tar bare gasskraften ned til 80 GWh, en nedgang på 37 %.',
   'Med vannkraft holder det å øke fra 2500 til 3000 MW. Da blir gasskraften 53,8 GWh, mer enn en halvering.',
   'En vindstille uke gir vindkraften lite, uansett hvor mange turbiner som står der. Vannkraften kan derimot skrus opp akkurat når den trengs. 500 MW regulerbar effekt betyr mer enn 3500 MW vind som ikke blåser.']},
 {q:'Modellen er forenklet. Nevn tre ting den ikke tar med, og forklar hvordan hver av dem kunne endret resultatet.',
  hint:'Tenk på vannmagasinene, på andre land, på forbruket og på hvor vindturbinene står.',
  losning:['<strong>Vannmagasinene kan bli tomme.</strong> Modellen lar vannkraften kjøre for fullt så lenge det trengs. I et tørt år kan det være for lite vann, og da trengs mer av andre kilder.',
   '<strong>Kraftutveksling med andre land.</strong> Norge kan importere strøm når det er lite vind, og eksportere overskudd. Da kan behovet for gasskraft i Norge bli mindre, men utslippet kan skje i et annet land.',
   '<strong>Fleksibelt forbruk.</strong> Elbiler, varmtvannsberedere og industri kan flytte forbruket til timer med mye strøm. Det gjør toppene i forbruket lavere.',
   'Andre eksempler er at vinden ikke er lik over hele landet, at strømnettet har begrenset kapasitet, og at kjernekraft og batterier ikke er med.']}
]
});

/* ---------- Varmepumpe ---------- */
OPPG('fy-varmepumpe',{
lett:[
 {q:'Bruk startverdiene (0 °C ute og 21 °C inne). Hva er COP? Hva betyr tallet?',
  hint:'COP er hvor mye varme varmepumpen gir for hver kWh strøm den bruker.',
  losning:['COP er 3,31.',
   'Det betyr at varmepumpen gir 3,31 kWh varme for hver kWh strøm. En panelovn gir bare 1 kWh varme per kWh strøm.']},
 {q:'Senk temperaturen ute fra 15 °C til −25 °C. Hva skjer med COP og med varmebehovet til huset?',
  hint:'Se på COP og varmebehovet i panelet.',
  losning:['COP synker fra 5,15 ved 15 °C til 2,08 ved −25 °C.',
   'Varmebehovet øker samtidig fra 22 til 166 kWh per døgn. Når det er kaldest, trenger huset mest varme, og varmepumpen virker dårligst.']},
 {q:'Hva koster det å varme huset et døgn med panelovn og med varmepumpe, ved 0 °C ute og strømpris 1,50 kr/kWh?',
  hint:'Les av kostnadene i panelet.',
  losning:['Panelovnen koster 113 kr, og varmepumpen 34 kr per døgn.',
   'Varmepumpen koster omtrent en tredjedel, fordi den gir 3,3 ganger så mye varme for hver kWh strøm.']}
],
middels:[
 {q:'Regn ut hvor mye strøm du sparer med varmepumpe i stedet for panelovn ved 0 °C ute. Bruk varmebehovet og COP i panelet. Hvor mange prosent er det?',
  hint:'Panelovnen bruker like mye strøm som varmebehovet. Varmepumpen bruker varmebehovet delt på COP.',
  losning:['Varmebehovet er 75,6 kWh per døgn, så panelovnen bruker 75,6 kWh strøm.',
   'Varmepumpen bruker $\\frac{75{,}6}{3{,}31}\\approx 22{,}8$ kWh strøm.',
   'Du sparer $75{,}6-22{,}8\\approx 52{,}8$ kWh, altså $1-\\frac{1}{3{,}31}\\approx 70$ %.']},
 {q:'Er det i strid med energibevaring at varmepumpen gir mer varme enn strømmen den bruker? Forklar hvor den ekstra varmen kommer fra.',
  hint:'Se på pilene i animasjonen. Hvor kommer energien fra, i tillegg til strømmen?',
  losning:['Nei. Varmepumpen lager ikke energi. Den flytter varme fra uteluften og inn i huset, og strømmen brukes til å drive pumpen.',
   'Varmen som kommer inn, er strømmen pluss varmen som er hentet ute. Ved COP 3,31 kommer 1 kWh fra strømmen og 2,31 kWh fra uteluften.',
   'Selv kald luft på 0 °C inneholder mye energi. Molekylene beveger seg fortsatt fort. Først ved det absolutte nullpunktet, −273 °C, er det ikke mer varme å hente.']},
 {q:'Hvorfor synker COP når det blir kaldere ute? Bruk formelen for største mulige COP. Regn den ut for 0 °C ute og 21 °C inne, når varmepumpen jobber mellom −6 °C og 36 °C.',
  hint:'Temperaturene må være i kelvin: $T=t+273$. Varmepumpen må varme opp et medium litt over romtemperatur og kjøle et medium litt under utetemperaturen.',
  losning:['$T_{\\text{varm}}=36+273=309$ K og $T_{\\text{kald}}=-6+273=267$ K.',
   '$$\\text{COP}_{\\max}=\\frac{309}{309-267}\\approx 7{,}4$$',
   'Når det blir kaldere ute, øker temperaturforskjellen $T_{\\text{varm}}-T_{\\text{kald}}$ i nevneren, og COP synker. Pumpen må «løfte» varmen et lengre stykke.',
   'Ekte varmepumper når omtrent 45 % av den teoretiske grensen. I animasjonen er COP $0{,}45\\cdot 7{,}36\\approx 3{,}3$.']}
],
vanskelig:[
 {q:'Hvor mye sparer du i løpet av en vinter med 120 dager der det i snitt er 0 °C ute? Varmepumpen koster 30 000 kr installert. Hvor mange år tar det før den har betalt seg, med strømpris 1,50 kr/kWh?',
  hint:'Finn innsparingen per døgn i panelet. Gang med antall dager, og del prisen på innsparingen per år.',
  losning:['Per døgn sparer du omtrent $113-34=79$ kr.',
   'Over 120 dager blir det $120\\cdot 79\\approx 9500$ kr per år.',
   'Tilbakebetalingstida er $\\frac{30\\,000}{9500}\\approx 3{,}2$ år. Høyere strømpris gir kortere tid. Resten av året trenger huset mindre varme, men varmepumpen sparer litt da også.']},
 {q:'Det er −25 °C ute. Hvor mye av varmen kommer fra uteluften, og hvor mye fra strømmen? Hvorfor har mange varmepumper en elektrisk varmekolbe i tillegg?',
  hint:'Ved −25 °C er COP 2,08 og varmebehovet 166 kWh per døgn. Strømmen er varmebehovet delt på COP.',
  losning:['Strømmen er $\\frac{166}{2{,}08}\\approx 80$ kWh, og varmen fra uteluften er $166-80\\approx 86$ kWh per døgn.',
   'Selv ved −25 °C henter varmepumpen altså mer enn halvparten av varmen fra uteluften.',
   'Men når det er svært kaldt, er varmebehovet størst og varmepumpen minst effektiv. Mange varmepumper klarer ikke å gi nok effekt da. En varmekolbe eller en panelovn tar over de kaldeste dagene. Det er også da strømnettet er mest belastet.']},
 {q:'Forklar hva som menes med energikvalitet. Hvorfor er det sløsing å bruke strøm i en panelovn, selv om virkningsgraden er nesten 100 %?',
  hint:'Hva kan du gjøre med 1 kWh strøm, og hva kan du gjøre med 1 kWh varme ved romtemperatur?',
  losning:['Strøm har høy kvalitet. Den kan drive motorer, lys, datamaskiner og varmepumper, og den kan gjøres om til nesten alle andre energiformer.',
   'Varme ved romtemperatur har lav kvalitet. Den kan nesten bare brukes til å holde noe varmt, og den kan ikke gjøres tilbake til strøm.',
   'Panelovnen gjør 1 kWh høykvalitetsenergi om til 1 kWh lavkvalitetsenergi. Varmepumpen bruker den samme kilowattimen til å hente 2–3 kWh varme som allerede finnes ute. Da gjør strømmen mye mer nytte.',
   'Energi går aldri tapt, men kvaliteten synker i hver omforming. Det er termodynamikkens 2. lov.']}
]
});
