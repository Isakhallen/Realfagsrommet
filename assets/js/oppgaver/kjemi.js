/* Oppgaver i tre nivåer til kjemianimasjonene. Lastes først når en kjemianimasjon åpnes.
   OPPG(id,{lett,middels,vanskelig}): hver oppgave er {q:'oppgaven', hint:'hint', losning:['avsnitt', ...]}.
   Formler i $...$, egne formellinjer i $$...$$. Se app.js (showTasks). */

/* ---------- Syrer, baser og pH ---------- */
OPPG('ki-ph',{
lett:[
 {q:'Velg saltsyre. Gjett først: Hva er pH i 0,010 mol/L HCl? Sjekk så i animasjonen.',
  hint:'Saltsyre er en sterk syre. Alle HCl-molekylene gir fra seg H⁺, så $[\\text{H}_3\\text{O}^+]$ blir like stor som konsentrasjonen av syra. Klikk på tallet ved glidebryteren for å skrive inn konsentrasjonen.',
  losning:['All HCl protolyseres: $\\text{HCl}+\\text{H}_2\\text{O}\\rightarrow\\text{H}_3\\text{O}^++\\text{Cl}^-$. Da er $[\\text{H}_3\\text{O}^+]=0{,}010=10^{-2}$ mol/L.',
   '$$\\text{pH}=-\\lg 10^{-2}=2$$',
   '<strong>Svar:</strong> pH = 2. Animasjonen viser 2,00.']},
 {q:'Velg saltsyre og start på 0,1 mol/L. Fortynn ti ganger om gangen: 0,1, 0,01 og 0,001 mol/L. Hvor mye endrer pH seg hver gang? Hva betyr det at pH-skalaen er logaritmisk?',
  hint:'Skriv konsentrasjonen og pH inn i en liten tabell, og se etter et mønster.',
  losning:['pH blir 1, 2 og 3. Hver gang du fortynner ti ganger, stiger pH med én enhet.',
   'Det er det som menes med at skalaen er logaritmisk: én enhet på pH-skalaen svarer til ti ganger forskjell i $[\\text{H}_3\\text{O}^+]$. En løsning med pH 1 har 100 ganger så mye H₃O⁺ som en løsning med pH 3.']},
 {q:'Sammenlign 0,1 mol/L saltsyre med 0,1 mol/L eddiksyre. Hvilken har lavest pH? Se i det forstørrede glasset, og forklar forskjellen med ordene sterk syre og svak syre.',
  hint:'Se hvor mange av molekylene i glasset som har delt seg i H₃O⁺ og A⁻, og hvor mange som er intakte (lilla). Se også på protolysegraden i panelet.',
  losning:['Saltsyre har pH 1,00 og eddiksyre pH 2,88. Saltsyra har lavest pH.',
   'I saltsyra er alle molekylene protolysert. Saltsyre er en sterk syre. I eddiksyra er bare 1,3 % protolysert, og i glasset ser du nesten bare intakte molekyler. Eddiksyre er en svak syre.',
   'Løsningene har like mye syre, men saltsyra gir mye mer H₃O⁺. Mer H₃O⁺ gir lavere pH.']}
],
middels:[
 {q:'Velg eddiksyre. Les av protolysegraden ved 0,1 mol/L og ved 0,001 mol/L. Hva skjer med protolysegraden når syra fortynnes? Forklar hvorfor pH likevel stiger.',
  hint:'Protolysegraden er andelen av syremolekylene som er protolysert. pH avhenger av hvor mye H₃O⁺ det er i alt, ikke av andelen.',
  losning:['Ved 0,1 mol/L er protolysegraden 1,33 %, og ved 0,001 mol/L er den 12,55 %. Når syra fortynnes, blir en større andel av molekylene protolysert.',
   'Men det er mye mindre syre i løsningen. $[\\text{H}_3\\text{O}^+]$ går fra omtrent $1{,}3\\cdot10^{-3}$ til $1{,}3\\cdot10^{-4}$ mol/L, og pH stiger fra 2,88 til 3,90.',
   'Har du lært om likevekt, kan du forklare det slik: Når løsningen fortynnes, forskyves likevekten $\\text{CH}_3\\text{COOH}+\\text{H}_2\\text{O}\\rightleftharpoons\\text{H}_3\\text{O}^++\\text{CH}_3\\text{COO}^-$ mot høyre, fordi det er flere oppløste partikler på høyre side.']},
 {q:'Velg ammoniakk med 0,1 mol/L. Hva blir pH? Hvorfor blir løsningen basisk når ammoniakk ikke inneholder OH⁻? Skriv reaksjonslikningen med vann.',
  hint:'En base tar opp H⁺. I en vannløsning er det vannmolekylene som gir fra seg H⁺. Hva blir igjen av et vannmolekyl som har mistet H⁺?',
  losning:['pH blir omtrent 11,1.',
   'Ammoniakk tar opp H⁺ fra vann: $$\\text{NH}_3+\\text{H}_2\\text{O}\\rightleftharpoons\\text{NH}_4^++\\text{OH}^-$$',
   'Når et vannmolekyl gir fra seg H⁺, blir det til OH⁻. Da blir det mer OH⁻ enn H₃O⁺ i løsningen, og den er basisk. Ammoniakk er en svak base, så bare 1,3 % av molekylene reagerer.']},
 {q:'Velg natriumhydroksid med 0,010 mol/L. Regn ut pH før du sjekker i animasjonen.',
  hint:'NaOH er en sterk base, så $[\\text{OH}^-]=0{,}010$ mol/L. Bruk $[\\text{H}_3\\text{O}^+]\\cdot[\\text{OH}^-]=1{,}0\\cdot10^{-14}$ til å finne $[\\text{H}_3\\text{O}^+]$.',
  losning:['$$[\\text{H}_3\\text{O}^+]=\\frac{1{,}0\\cdot10^{-14}}{0{,}010}=1{,}0\\cdot10^{-12}\\ \\text{mol/L}$$',
   '$$\\text{pH}=-\\lg\\left(1{,}0\\cdot10^{-12}\\right)=12$$',
   'Du kan også regne med pOH: $\\text{pOH}=-\\lg 0{,}010=2$, så $\\text{pH}=14-2=12$.',
   '<strong>Svar:</strong> pH = 12.']}
],
vanskelig:[
 {q:'Regn ut pH i 0,10 mol/L eddiksyre for hånd med $K_a=1{,}8\\cdot10^{-5}$. Sjekk i animasjonen. Hvilken forenkling gjør du, og ved hvilken konsentrasjon slutter den å fungere?',
  hint:'Kall $[\\text{H}_3\\text{O}^+]=[\\text{CH}_3\\text{COO}^-]=x$. Da er $[\\text{CH}_3\\text{COOH}]=0{,}10-x$. Er $x$ mye mindre enn 0,10, kan du bruke $0{,}10-x\\approx 0{,}10$.',
  losning:['Likevektsuttrykket gir $$\\frac{x^2}{0{,}10-x}=1{,}8\\cdot10^{-5}$$',
   'Med forenklingen $0{,}10-x\\approx 0{,}10$ blir $x^2=1{,}8\\cdot10^{-6}$, så $x\\approx 1{,}34\\cdot10^{-3}$ mol/L og $\\text{pH}\\approx 2{,}87$. Animasjonen regner uten forenkling og viser 2,88.',
   'Forenklingen er god når bare en liten andel av syra er protolysert. Her er $x$ bare 1,3 % av 0,10, så det går fint.',
   'Prøv samme regning med $c=1{,}0\\cdot10^{-5}$ mol/L. Forenklingen gir $x\\approx 1{,}34\\cdot10^{-5}$ mol/L. Det er mer H₃O⁺ enn det er syre i løsningen, og det er umulig. Animasjonen viser pH 5,15 og en protolysegrad på 72 %. Så fortynnet syre må du regne på med andregradsformelen.']},
 {q:'En elev fortynner $1{,}0\\cdot10^{-6}$ mol/L saltsyre hundre ganger og regner ut at pH blir 8. Hva er feil? Omtrent hvilken pH får løsningen? (Animasjonen går ned til $10^{-6}$ mol/L. Se hva den viser der.)',
  hint:'Rent vann har selv $[\\text{H}_3\\text{O}^+]=1{,}0\\cdot10^{-7}$ mol/L. Hvor mye H₃O⁺ kommer fra syra etter fortynningen, sammenlignet med det vannet gir?',
  losning:['Etter fortynningen er konsentrasjonen av syra $1{,}0\\cdot10^{-8}$ mol/L. Eleven har regnet $\\text{pH}=-\\lg 10^{-8}=8$, men glemt at vannet selv gir $1{,}0\\cdot10^{-7}$ mol/L H₃O⁺. Det er ti ganger så mye som syra gir.',
   'En syre kan aldri gjøre en løsning basisk. Den kan bare gi litt ekstra H₃O⁺. Derfor blir pH litt under 7.',
   'Vil du regne nøyaktig, må du ta med begge kildene. Hver Cl⁻ har gitt én H₃O⁺, og resten kommer fra vannet, så $[\\text{H}_3\\text{O}^+]=c+[\\text{OH}^-]$. Med $x=[\\text{H}_3\\text{O}^+]$ blir det $x=c+\\frac{K_w}{x}$, altså $x^2-cx-K_w=0$. Det gir $x\\approx 1{,}05\\cdot10^{-7}$ mol/L og pH ≈ 6,98.',
   'Du ser starten på dette i animasjonen. Ved $10^{-6}$ mol/L viser den $[\\text{H}_3\\text{O}^+]=1{,}01\\cdot10^{-6}$ mol/L og ikke nøyaktig $1{,}00\\cdot10^{-6}$. Den lille ekstra biten kommer fra vannet.']},
 {q:'Hvor mange ganger må du fortynne 0,10 mol/L saltsyre for at den skal få samme pH som 0,10 mol/L eddiksyre? Hva sier svaret om forskjellen på en sterk og en svak syre?',
  hint:'Finn først pH og $[\\text{H}_3\\text{O}^+]$ for 0,10 mol/L eddiksyre. Hvilken konsentrasjon saltsyre gir like mye H₃O⁺?',
  losning:['0,10 mol/L eddiksyre har pH 2,88 og $[\\text{H}_3\\text{O}^+]\\approx 1{,}33\\cdot10^{-3}$ mol/L.',
   'Saltsyre er fullstendig protolysert, så den må ha konsentrasjonen $1{,}33\\cdot10^{-3}$ mol/L for å gi like mye H₃O⁺. Skriv inn 1,33·10^-3 i animasjonen og sjekk at pH blir 2,88.',
   'Fortynningen blir $$\\frac{0{,}10}{1{,}33\\cdot10^{-3}}\\approx 75$$',
   '<strong>Svar:</strong> Omtrent 75 ganger. Med samme konsentrasjon gir saltsyra 75 ganger så mye H₃O⁺ som eddiksyra. Syrene er like konsentrerte, men ikke like sure.']}
]
});
