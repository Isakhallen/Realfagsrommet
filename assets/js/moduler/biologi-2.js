'use strict';
/* ================= BIOLOGI (del 2) ================= */

/* ---------- Energistrøm i næringskjeden ---------- */
{
const LV=[['Planteplankton','produsent','green'],['Dyreplankton','primærkonsument','teal'],['Sild','sekundærkonsument','blue'],['Torsk','tertiærkonsument','purple'],['Sel','toppredator','pink']];
M({id:'bi-energipyramide',s:'bi',c:['BI2','NAT'],title:'Energistrøm og næringskjeder',short:'Energipyramide',kw:'energistrøm næringskjede næringsnett trofisk nivå energipyramide produsent konsument nedbryter tiprosentregel biomagnifisering miljøgift kvikksølv økologi',
lead:'Bare en liten del av energien i ett ledd i næringskjeden går videre til neste. Resten brukes til livsprosesser og blir til varme. Derfor er det få rovdyr på toppen.',
controls:[{id:'n',label:'Antall ledd',min:3,max:5,step:1,value:4},{id:'eta',label:'Andel energi som går videre',min:5,max:20,step:1,value:10,unit:'%'},{id:'E1',label:'Energi bundet av produsentene',min:2000,max:20000,step:500,value:8000,fmt:v=>nf(v,0)+' kJ/m²/år'},{id:'gift',type:'check',label:'Vis miljøgift (biomagnifisering)',value:false},{id:'logw',type:'check',label:'Logaritmisk bredde',value:false}],
tex:['E_{k+1}=\\eta\\cdot E_k','E_{\\text{topp}}=E_1\\cdot\\eta^{\\,n-1}'],
about:['Produsentene binder solenergi i fotosyntesen, men bare omtrent 1 % av sollyset som treffer dem. Planteetere spiser produsentene, rovdyr spiser planteeterne, og så videre.','I hvert ledd brukes mesteparten av energien til celleånding, bevegelse og varme. Noe havner i døde rester som nedbryterne bruker. Ofte går omtrent 10 % videre. Hver gule prikk som når et nytt ledd, er energi som går videre. De røde forsvinner som varme.','Noen <strong>miljøgifter</strong>, som kvikksølv og PCB, brytes ikke ned og lagres i fettet. De oppkonsentreres for hvert ledd: <strong>biomagnifisering</strong>. Derfor har toppredatorer som sel og isbjørn høyest konsentrasjon. Her er oppkonsentreringen satt til 5 ganger per ledd.'],
tasks:['Hvor mye av energien fra produsentene når toppredatoren når hvert ledd gir videre 10 %?','Hvorfor er det sjelden mer enn fire–fem ledd i en næringskjede?','Hvorfor er det mer energieffektivt for mennesker å spise planter enn kjøtt?','Hvorfor bør gravide være forsiktige med å spise mye stor rovfisk?'],
init(S){S.pk=[];S.acc=0},
update(S,dt){const n=S.p.n,eta=S.p.eta/100;S.acc+=dt*26;while(S.acc>=1){S.acc-=1;S.pk.push({lv:0,x:Math.random(),f:0,heat:false})}
 S.pk.forEach(q=>{q.f+=dt*.9;if(q.f>=1&&!q.heat){if(q.lv<n-1&&Math.random()<eta){q.lv++;q.f=0;q.x=.3+Math.random()*.4}else{q.heat=true;q.f=0;q.hd=Math.random()<.5?-1:1}}if(q.heat&&q.f>1)q.dead=true});S.pk=S.pk.filter(q=>!q.dead);if(S.pk.length>500)S.pk.splice(0,S.pk.length-500)},
draw(S){const n=S.p.n,eta=S.v.eta/100,E1=S.v.E1;const[bl,br]=split(S,.72,{g:26,b:pad(S,30,30,40)});const bh=(bl.h-34)/n,gap=8,maxW=bl.w*.5,cx=bl.l+maxW/2+4,tx=cx+maxW/2+14;
 const E=k=>E1*Math.pow(eta,k);const wid=k=>S.p.logw?maxW*clamp((Math.log10(E(k))+1)/(Math.log10(E1)+1),.02,1):Math.max(3,maxW*E(k)/E1);
 const yb=k=>bl.t+bl.h-26-(k+1)*bh;
 for(let k=0;k<n;k++){const[nm,role,ck]=LV[k];const w=wid(k),y=yb(k)+gap/2,h=bh-gap;rr(cx-w/2,y,w,h,4,null,A(C[ck],.55));ln(cx+w/2+3,y+h/2,tx-4,y+h/2,A(C[ck],.25),1,[2,3]);
  const ly=y+h/2-(S.p.gift?22:15);T(nm,tx,ly,{s:13,w:700,c:C[ck]});T(role,tx,ly+15,{s:11.5,c:C.fg2});T(nfs(E(k),3)+' kJ/m²/år',tx,ly+30,{f:'n',s:11.5,c:C.fg2});
  if(S.p.gift){const c=Math.pow(5,k),nd=Math.min(160,Math.round(3*c));const rg=rng(k*11+1);for(let i=0;i<nd;i++)dot(cx-w/2+3+rg()*Math.max(1,w-6),y+3+rg()*(h-6),1.8,A(C.red,.9));T('miljøgift ×'+nf(c,0),tx,ly+45,{f:'n',s:11.5,c:C.red})}}
 S.pk.forEach(q=>{const k=q.lv,w=wid(k),y0=yb(k)+bh-gap/2,y1=yb(k)+gap/2;if(!q.heat){const x=cx-w/2+q.x*w;dot(x,lerp(y0,y1,q.f),2.6,C.yellow)}else{const sx=cx+q.hd*(w/2)*.6,y=lerp(y0,y1,.5);dot(sx+q.hd*q.f*50,y-q.f*10,2.4,A(C.red,1-q.f))}});
 const sy=bl.t+bl.h-6;glow(bl.l+12,sy,24,C.yellow,.6);dot(bl.l+12,sy,8,C.yellow);T('sollys (ca. 1 % bindes)',bl.l+28,sy,{s:11.5,c:C.yellow});
 const P=Plane(-.6,n-.4,-1,Math.log10(E1)+.5,{l:br.l+40,t:br.t+20,w:br.w-40,h:br.h-40});lab({l:br.l,t:br.t+20},'Energi per ledd');for(let k=0;k<n;k++){const v=Math.log10(Math.max(E(k),.1))+1e-9;rct(P.X(k)-P.sx*.32,P.Y(Math.max(v,-1)),P.sx*.64,P.Y(-1)-P.Y(Math.max(v,-1)),null,A(C[LV[k][2]],.7));T(String(k+1),P.X(k),P.t+P.h+12,{a:'center',f:'n',s:11.5,c:C.fg2})}
 T('logaritmisk skala, kJ/m²/år',br.l,br.t+20-2,{s:10.5,c:C.fg3});ln(P.l,P.Y(-1),P.l+P.w,P.Y(-1),A(C.fg,.6),1.2);
 [-1,0,1,2,3,4].forEach(e=>{if(e<=P.y1){ln(P.l-4,P.Y(e),P.l,P.Y(e),C.fg3,1);T(nfs(Math.pow(10,e),1),P.l-7,P.Y(e),{a:'right',f:'n',s:10.5,c:C.fg3})}})},
readout(S){const n=S.p.n,eta=S.p.eta/100,top=S.p.E1*Math.pow(eta,n-1);return[['toppen får',nfs(top,3)+' kJ/m²/år'],['andel av produsentenes energi',nfs(100*Math.pow(eta,n-1),2)+' %','yellow'],['andel av sollyset',nfs(Math.pow(eta,n-1),2)+' %']]}
});
}

/* ---------- Enzymer ---------- */
{
const ENZ={amy:{n:'Amylase (spytt)',T:37,pH:7,sub:'stivelse'},pep:{n:'Pepsin (magesaft)',T:37,pH:2,sub:'protein'},try:{n:'Trypsin (tynntarm)',T:37,pH:8,sub:'protein'},taq:{n:'Taq-polymerase (varmekjær bakterie)',T:72,pH:8.5,sub:'DNA-byggesteiner'}};
const fTraw=(T,o)=>Math.pow(2,(T-o)/10)/(1+Math.exp((T-(o+6))/2.2));
const fT=(T,o)=>{let m=0;for(let t=0;t<=100;t+=.5)m=Math.max(m,fTraw(t,o));return fTraw(T,o)/m};
const den=(T,o)=>1/(1+Math.exp(-(T-(o+6))/2.2));
const fpH=(pH,o)=>Math.exp(-(((pH-o)/1.4)**2));
const rate=(p,S_)=>{const e=ENZ[p.enz];const Km=1*(p.inh==='komp'?3:1);return fT(p.T,e.T)*fpH(p.pH,e.pH)*(S_/(Km+S_))/(p.inh==='ikke'?2:1)};
M({id:'bi-enzym',s:'bi',c:['BI2','KJ2'],title:'Enzymer: temperatur, pH og substrat',short:'Enzymer',kw:'enzym katalysator aktivt sete substrat produkt temperatur ph denaturering optimum hemmer inhibitor michaelis menten metabolisme fordøyelse',
lead:'Enzymer er proteiner som får reaksjoner i cellene til å gå mye fortere. Hvert enzym har en form som passer til ett substrat, og det virker best ved en bestemt temperatur og pH.',
controls:[{id:'enz',type:'sel',label:'Enzym',value:'amy',options:Object.entries(ENZ).map(([k,v])=>[k,v.n])},{id:'T',label:'Temperatur',min:0,max:95,step:1,value:37,unit:'°C'},{id:'pH',label:'pH',min:1,max:12,step:.1,value:7,d:1},{id:'S',label:'Substratkonsentrasjon',min:0,max:10,step:.1,value:3,unit:'mmol/L',d:1},{id:'inh',type:'seg',label:'Hemmer',value:'ingen',options:[['ingen','Ingen'],['komp','Konkurrerende'],['ikke','Ikke-konkurrerende']]}],
tex:['v=v_{\\max}\\cdot\\frac{[S]}{K_m+[S]}','\\text{konkurrerende hemmer: }K_m\\text{ øker}','\\text{ikke-konkurrerende hemmer: }v_{\\max}\\text{ minker}'],
about:['Substratet passer i enzymets <strong>aktive sete</strong> som en nøkkel i en lås. Når produktet er laget, slipper det taket, og enzymet kan brukes igjen.','Når temperaturen stiger, beveger molekylene seg raskere, og reaksjonen går fortere. Over en viss temperatur endrer enzymet form og slutter å virke: det <strong>denatureres</strong>. Varmekjære bakterier har enzymer som tåler mye høyere temperatur.','Hvert enzym har sitt <strong>pH-optimum</strong>. Pepsin virker i den sure magen, trypsin i den basiske tynntarmen.','Med mer substrat går reaksjonen fortere, men bare til alle enzymene er opptatt. Da er farten maksimal. En <strong>konkurrerende hemmer</strong> konkurrerer om det aktive setet. En <strong>ikke-konkurrerende hemmer</strong> fester seg et annet sted og ødelegger formen.'],
tasks:['Finn temperaturoptimum for amylase. Hva skjer over 45 °C?','Hvorfor slutter pepsin å virke når maten kommer ned i tynntarmen?','Hvordan kan du skille en konkurrerende fra en ikke-konkurrerende hemmer ved å øke substratkonsentrasjonen?','Hvorfor brukes Taq-polymerase i PCR?'],
init(S){S.ez=[...Array(6)].map((_,i)=>({st:'fri',w:Math.random(),b:0,x:(i%3+.5)/3,y:i<3?.32:.72}));S.sb=[...Array(60)].map(()=>({x:Math.random(),y:Math.random(),a:Math.random()*TAU}));S.prod=[];S.done=0;S.tim=[]},
update(S,dt){const p=S.p,e=ENZ[p.enz];const r=rate(p,p.S)*2.2;const dn=den(p.T,e.T);S.ez.forEach((z,i)=>{z.dead=i/6<dn-.02;if(z.dead){z.st='fri';return}if(z.st==='fri'){z.w-=dt*r;if(z.w<=0&&p.S>0){z.st='bundet';z.b=.45}}else{z.b-=dt;if(z.b<=0){z.st='fri';z.w=1;S.done++;S.tim.push(S.t);S.prod.push({x:z.x,y:z.y,t:0,a:Math.random()*TAU})}}});
 S.sb.forEach(q=>{q.a+=(Math.random()-.5)*dt*4;q.x=(q.x+Math.cos(q.a)*dt*.05+1)%1;q.y=(q.y+Math.sin(q.a)*dt*.05+1)%1});S.prod.forEach(q=>q.t+=dt);S.prod=S.prod.filter(q=>q.t<1.5);while(S.tim.length&&S.tim[0]<S.t-5)S.tim.shift()},
draw(S){const p=S.p,e=ENZ[p.enz];const[bl,br]=split(S,.5,{g:30,b:pad(S,30,30,44)});frame(bl);const ns=Math.round(p.S/10*60);
 S.sb.slice(0,ns).forEach(q=>{const x=bl.l+10+q.x*(bl.w-20),y=bl.t+10+q.y*(bl.h-20);poly([[x,y-5],[x+5,y+4],[x-5,y+4]],null,C.gold)});
 if(p.inh==='komp')for(let i=0;i<14;i++){const x=bl.l+10+((i*.37+S.t*.03)%1)*(bl.w-20),y=bl.t+10+((i*.61+S.t*.02)%1)*(bl.h-20);rct(x-3,y-3,7,7,null,A(C.grey,.9))}
 const R=Math.min(bl.w/7,bl.h/5.5);S.ez.forEach(z=>{const x=bl.l+z.x*bl.w,y=bl.t+z.y*bl.h;X.save();X.translate(x,y);if(z.dead){X.beginPath();for(let i=0;i<=30;i++){const a=i/30*TAU;const rr_=R*(.75+.25*Math.sin(a*5+z.x*9));X.lineTo(Math.cos(a)*rr_,Math.sin(a)*rr_)}X.closePath();X.fillStyle=A(C.grey,.5);X.fill();X.restore();T('denaturert',x,y+R+12,{a:'center',s:10.5,c:C.fg3});return}
  const op=z.st==='fri'?.5:.18;X.beginPath();X.moveTo(0,0);X.arc(0,0,R,-op-1.57,op+1.57+PI);X.closePath();X.rotate(0);X.fillStyle=A(C.teal,.75);X.fill();
  if(p.inh==='ikke'){dot(R*.7,R*.55,R*.22,C.grey)}
  if(z.st==='bundet'){poly([[0,-R*.85],[R*.3,-R*.35],[-R*.3,-R*.35]],null,C.gold)}else if(p.inh==='komp'&&Math.sin(S.t*2+z.x*10)>.6){rct(-R*.18,-R*.75,R*.36,R*.36,null,C.grey)}X.restore()});
 S.prod.forEach(q=>{const x=bl.l+q.x*bl.w+Math.cos(q.a)*q.t*40,y=bl.t+q.y*bl.h-R+Math.sin(q.a)*q.t*40-q.t*20;dot(x-4,y,3,A(C.yellow,1-q.t/1.5));dot(x+4,y,3,A(C.yellow,1-q.t/1.5))});
 T(e.n,bl.l+8,bl.t+12,{s:13,w:700,c:C.teal,bg:A(C.stage,.6)});T('substrat: '+e.sub,bl.l+8,bl.t+30,{s:11.5,c:C.gold,bg:A(C.stage,.6)});
 const[g1,g2,g3]=rows(br,[1,1,1],44);const pl=(b,x0,x1,f,cur,lbl,xs,xl,xf)=>{const P=Plane(x0,x1,0,1.1,b);P.grid(xs,{sy:.5,minor:false,alpha:.08});P.axes({xs,ys:.5,x0:true,y0:true,xl,ls:13,yf:y=>nf(y*100,0)+'%',xf});lab(b,lbl);P.fn(f,C.teal,2.4);const v=f(cur);ln(P.X(cur),P.t,P.X(cur),P.Y(0),A(C.fg,.3),1,[3,4]);dot(P.X(cur),P.Y(v),5,C.yellow)};
 const Km=1*(p.inh==='komp'?3:1);pl(g1,0,95,T=>fT(T,e.T)*fpH(p.pH,e.pH)*(p.S/(Km+p.S))/(p.inh==='ikke'?2:1),p.T,'Aktivitet og temperatur',15,'°C');
 pl(g2,1,12,ph=>fT(p.T,e.T)*fpH(ph,e.pH)*(p.S/(Km+p.S))/(p.inh==='ikke'?2:1),p.pH,'Aktivitet og pH',1,'pH');
 pl(g3,0,10,s=>fT(p.T,e.T)*fpH(p.pH,e.pH)*(s/(Km+s))/(p.inh==='ikke'?2:1),p.S,'Aktivitet og substratkonsentrasjon',2,'[S]')},
readout(S){const p=S.p,e=ENZ[p.enz];return[['aktivitet',nf(100*rate(p,p.S),0)+' % av maks','teal'],['optimum',e.T+' °C, pH '+nf(e.pH,1)],['denaturert',nf(100*den(p.T,e.T),0)+' %','red'],['produkter siste 5 s',S.tim.length,'yellow']]}
});
}

/* ---------- Fotosyntese og begrensende faktorer ---------- */
{
const CO={lav:['Lav',.35],middels:['Middels',.7],hoy:['Høy',1]};
const Irel=d=>100*(10/d)**2;
const Pg=(I,cf,T)=>{const a=.03,th=.9,aI=a*I,P=(aI+cf-Math.sqrt((aI+cf)**2-4*th*aI*cf))/(2*th);return P*Math.exp(-(((T-28)/10)**2))};
const Rs=T=>.08*Math.pow(2,(T-20)/10);
M({id:'bi-fotosyntese',s:'bi',c:['BI2','NAT'],title:'Fotosyntese og begrensende faktorer',short:'Fotosyntese',kw:'fotosyntese celleånding lys karbondioksid temperatur begrensende faktor kompensasjonspunkt oksygen vasspest kloroplast energiomsetning',
lead:'Vannplanten lager oksygen i fotosyntesen, og vi ser det som bobler. Lys, karbondioksid og temperatur bestemmer farten. Den faktoren det er minst av, begrenser hvor fort det går.',
controls:[{id:'d',label:'Avstand til lampen',min:5,max:60,step:1,value:20,unit:'cm'},{id:'co',type:'seg',label:'Karbondioksid i vannet',value:'middels',options:Object.entries(CO).map(([k,v])=>[k,v[0]])},{id:'T',label:'Temperatur',min:5,max:45,step:1,value:20,unit:'°C'}],
tex:['6\\,\\text{CO}_2+6\\,\\text{H}_2\\text{O}\\xrightarrow{\\text{lys}}\\text{C}_6\\text{H}_{12}\\text{O}_6+6\\,\\text{O}_2','\\text{netto fotosyntese}=\\text{brutto fotosyntese}-\\text{celleånding}','I\\propto\\frac{1}{d^2}'],
about:['Lysstyrken avtar med kvadratet av avstanden til lampen. Halverer du avstanden, blir lyset fire ganger sterkere.','Planten driver også <strong>celleånding</strong> hele tiden, og da brukes oksygen. Boblene viser bare det som er igjen: netto fotosyntese. Ved <strong>kompensasjonspunktet</strong> er fotosyntesen og celleåndingen like store, og det kommer ingen bobler.','Ved svakt lys er lyset den <strong>begrensende faktoren</strong>: mer lys gir mer fotosyntese, men mer CO₂ hjelper lite. Ved sterkt lys flater kurven ut, og da er CO₂ eller temperatur begrensende.','Fotosyntesen styres av enzymer. For høy temperatur ødelegger dem, mens celleåndingen øker. Derfor blir netto fotosyntese lavere når det blir for varmt.'],
tasks:['Flytt lampen fra 40 cm til 20 cm. Hvor mye mer lys får planten? Hvor mye flere bobler blir det?','Finn avstanden der det nesten ikke kommer bobler. Hva kalles dette punktet?','Sett lampen helt inntil. Hva skjer når du øker CO₂? Hva er begrensende nå?','Hvorfor er det lurt å ha litt høyere CO₂ i drivhus?'],
init(S){S.bub=[];S.acc=0;S.cnt=[]},
update(S,dt){const p=S.p,net=Pg(Irel(p.d),CO[p.co][1],p.T)-Rs(p.T);const rate=Math.max(0,net)*10;S.acc+=dt*rate;while(S.acc>=1){S.acc-=1;S.bub.push({y:0,x:(Math.random()-.5)*6,s:2+Math.random()*2.5});S.cnt.push(S.t)}S.bub.forEach(b=>{b.y+=dt*(60+b.s*10)});S.bub=S.bub.filter(b=>b.y<400);while(S.cnt.length&&S.cnt[0]<S.t-6)S.cnt.shift()},
draw(S){const p=S.p,I=Irel(S.v.d),cf=CO[p.co][1],T_=S.v.T;const[bl,br]=split(S,.48,{g:30,b:pad(S,30,30,44)});
 const bx=bl.l+bl.w*.55,bw=Math.min(bl.w*.38,bl.h*.45),bt=bl.t+bl.h*.18,bh=bl.h*.75;const lx=bx-bw/2-20-(S.v.d-5)/55*(bl.w*.4),ly=bt+bh*.55;
 const br_=clamp(I/100,0,1.2);glow(lx,ly,60+80*br_,C.yellow,.25+.35*clamp(br_,0,1));rr(lx-26,ly-18,20,36,4,null,C.fg2);circ(lx,ly,12,null,C.yellow);
 for(let k=-2;k<=2;k++)arr(lx+18,ly+k*14,bx-bw/2-6,ly+k*14*1.6,A(C.yellow,.15+.4*clamp(br_,0,1)),1.4,7);
 rect_:{rct(bx-bw/2,bt,bw,bh,A(C.fg,.5),A(C.blue,.12),2)}const sx=bx,sb=bt+bh-10;ln(sx,sb,sx,bt+bh*.35,C.green,4);for(let k=0;k<8;k++){const y=sb-k*bh*.075;const s=k%2?1:-1;X.beginPath();X.ellipse(sx+s*12,y,12,4,s*.5,0,TAU);X.fillStyle=A(C.green,.85);X.fill()}
 S.bub.forEach(b=>{const y=bt+bh*.35-b.y;if(y>bt+4)circ(sx+b.x+Math.sin(b.y*.08)*3,y,b.s,A(C.fg,.8),A(C.fg,.15),1.2)});
 T(nf(S.v.d,0)+' cm',(lx+bx-bw/2)/2,bt+bh+18,{a:'center',f:'n',s:12,c:C.fg2});ln(lx,bt+bh+8,bx-bw/2,bt+bh+8,A(C.fg,.4),1);
 const net=Pg(I,cf,T_)-Rs(T_);T(net>0?'Bobler: '+nf(S.cnt.length*10,0)+' per minutt':'Ingen bobler: celleåndingen er større enn fotosyntesen',bl.l,bl.t+12,{s:14,w:700,c:net>0?C.fg:C.red});
 const lim=.03*I<.7*cf?'lys':cf<1?'CO₂':'temperatur og enzymer';T('Begrensende faktor: '+lim,bl.l,bl.t+32,{s:13,c:C.yellow});
 const[g1,g2]=rows(br,[1.3,1],44);const P=Plane(0,120,-.2,1.05,g1);P.grid(20,{sy:.25,minor:false,alpha:.08});P.axes({xs:20,ys:.5,x0:true,y0:true,yAt:-.2,xl:'lysstyrke',ls:13});lab(g1,'Netto fotosyntese og lysstyrke');
 Object.entries(CO).forEach(([k,[nm,c]])=>{P.fn(x=>Pg(x,c,T_)-Rs(T_),k===p.co?C.green:A(C.green,.25),k===p.co?2.8:1.6);T(nm,P.X(118),P.Y(Pg(118,c,T_)-Rs(T_))-9,{a:'right',s:10.5,c:k===p.co?C.green:C.fg3})});ln(P.l,P.Y(0),P.l+P.w,P.Y(0),A(C.fg,.5),1.2);dot(P.X(Math.min(I,120)),P.Y(net),6,C.yellow);
 const Q=Plane(5,45,-.2,1.05,g2);Q.grid(5,{sy:.25,minor:false,alpha:.08});Q.axes({xs:10,ys:.5,x0:true,y0:true,yAt:-.2,xl:'°C',ls:13});lab(g2,'Netto fotosyntese og temperatur');Q.fn(t=>Pg(I,cf,t)-Rs(t),C.red,2.6);Q.fn(t=>-Rs(t)+0*t,A(C.fg,.35),1.4,{dash:[4,4]});ln(Q.l,Q.Y(0),Q.l+Q.w,Q.Y(0),A(C.fg,.5),1.2);dot(Q.X(T_),Q.Y(net),6,C.yellow)},
readout(S){const p=S.p,I=Irel(p.d),cf=CO[p.co][1];const g=Pg(I,cf,p.T),r=Rs(p.T);return[['lysstyrke',nf(I,1)+' (rel.)','yellow'],['brutto fotosyntese',nf(g*100,0)+' (rel.)','green'],['celleånding',nf(r*100,0)+' (rel.)','red'],['netto',nf((g-r)*100,0)+' (rel.)']]}
});
}

/* ---------- Evolusjon i genlageret: Hardy–Weinberg og drift ---------- */
{
const binom=(n,p)=>{if(n<=400){let k=0;for(let i=0;i<n;i++)if(Math.random()<p)k++;return k}const m=n*p,s=Math.sqrt(n*p*(1-p));return clamp(Math.round(m+s*gauss()),0,n)};
const COLS=['blue','gold','green','red','purple','pink','teal','yellow'];
M({id:'bi-hardyweinberg',s:'bi',c:['BI2'],title:'Evolusjon i genlageret: drift og seleksjon',short:'Genetisk drift',kw:'evolusjon genlager allelfrekvens hardy weinberg genetisk drift seleksjon populasjon flaskehals fiksering naturlig utvalg variasjon arv',
lead:'Hver linje er en populasjon som starter med like mange A- og a-alleler. I små populasjoner endrer allelfrekvensen seg tilfeldig fra generasjon til generasjon. Det kalles genetisk drift.',
controls:[{id:'N',label:'Individer per populasjon',min:10,max:2000,log:true,value:40,fmt:v=>nf(Math.round(v),0)},{id:'p0',label:'Startfrekvens for A',min:.05,max:.95,step:.05,value:.5,d:2},{id:'s',label:'Seleksjon mot aa',min:0,max:.5,step:.01,value:0,d:2},{id:'R',label:'Antall populasjoner',min:1,max:20,step:1,value:8},{id:'sp',label:'Generasjoner per sekund',min:2,max:30,step:1,value:10},{type:'btns',items:[['Ny simulering',S=>MOD['bi-hardyweinberg'].init(S)]]}],
tex:['p+q=1','p^2+2pq+q^2=1','p\'=\\frac{p}{1-s\\,q^2}\\quad\\text{(seleksjon mot aa)}'],
about:['$p$ er andelen A-alleler i genlageret og $q$ andelen a-alleler. <strong>Hardy–Weinberg-loven</strong> sier at genotypene AA, Aa og aa da forekommer med frekvensene $p^2$, $2pq$ og $q^2$, og at allelfrekvensene ikke endrer seg, så lenge det ikke skjer noe som påvirker dem.','I virkelige populasjoner er det alltid noe som endrer genlageret: <strong>genetisk drift</strong> (tilfeldigheter), <strong>seleksjon</strong> (naturlig utvalg), mutasjoner og flytting. Det er dette som er evolusjon.','Drift er sterk i små populasjoner. Etter en stund forsvinner det ene allelet helt, og det andre blir <strong>fiksert</strong>. I store populasjoner holder frekvensene seg nesten konstante.','Med seleksjon mot aa blir a sjeldnere. Men når a blir sjeldent, sitter det mest i friske bærere (Aa), og da går det svært sakte.'],
tasks:['Kjør med 10 individer og med 1000 individer. Hva er forskjellen?','Hvorfor er utrydningstruede arter med få individer sårbare, selv om de blir beskyttet?','Sett seleksjonen til 0,2. Forsvinner a-allelet helt? Hvorfor går det så sakte til slutt?','Sjekk søylene: stemmer genotypefrekvensene med p², 2pq og q²?'],
init(S){S.gen=0;S.acc=0;S.pops=[...Array(Math.round(S.p.R))].map(()=>({p:S.p.p0,h:[S.p.p0]}));this.geno(S)},
change(S,id){if(id==='N'||id==='p0'||id==='R')this.init(S)},
geno(S){const N=Math.round(S.p.N),p=S.pops[0].p;const n=Math.min(N,300);const g=[];let c=[0,0,0];for(let i=0;i<n;i++){const a1=Math.random()<p,a2=Math.random()<p;const k=a1&&a2?0:(!a1&&!a2?2:1);g.push([a1,a2]);c[k]++}S.ind=g;S.gc=c.map(v=>v/n)},
update(S,dt){if(S.gen>=200)return;S.acc+=dt*S.p.sp;const N=Math.round(S.p.N),s=S.p.s;while(S.acc>=1&&S.gen<200){S.acc-=1;S.gen++;S.pops.forEach(P=>{const q=1-P.p;const ps=P.p/(1-s*q*q);P.p=binom(2*N,clamp(ps,0,1))/(2*N);P.h.push(P.p)});this.geno(S)}},
draw(S){const[top,bot]=rows(pad(S,28,26,44),[1,1.25],36);const[a,b2]=cols(top,[1.3,1],30);const n=S.ind.length,cs=Math.ceil(Math.sqrt(n*a.w/a.h)),rs_=Math.ceil(n/cs),cell=Math.min(a.w/cs,a.h/rs_),r=cell*.4;
 S.ind.forEach(([x1,x2],i)=>{const x=a.l+(i%cs+.5)*cell,y=a.t+(Math.floor(i/cs)+.5)*cell;X.beginPath();X.arc(x,y,r,PI/2,PI*1.5);X.fillStyle=x1?C.blue:C.gold;X.fill();X.beginPath();X.arc(x,y,r,-PI/2,PI/2);X.fillStyle=x2?C.blue:C.gold;X.fill()});
 lab(a,isWide(S)?`Populasjon 1: ${Math.round(S.p.N)} individer${n<S.p.N?' (viser '+n+')':''}  ·  blå = A, gul = a`:'Blå = A, gul = a');
 const p=S.pops[0].p,q=1-p,ex=[p*p,2*p*q,q*q];const P=Plane(-.6,2.6,0,1.05,{l:b2.l+30,t:b2.t,w:b2.w-30,h:b2.h-18});P.axes({ys:.5,x:true,y0:true,xAt:-.6,xf:()=>'',yf:y=>nf(y*100,0)+'%'});lab(b2,'Genotyper');
 ['AA','Aa','aa'].forEach((g,i)=>{rct(P.X(i)-P.sx*.3,P.Y(S.gc[i]),P.sx*.3,P.Y(0)-P.Y(S.gc[i]),null,A(C.teal,.75));rct(P.X(i),P.Y(ex[i]),P.sx*.3,P.Y(0)-P.Y(ex[i]),C.yellow,null,1.5);T(g,P.X(i),P.Y(0)+12,{a:'center',f:'m',s:15,c:C.fg2})});if(isWide(S)){const yy=b2.t-11,w2=tw('forventet p², 2pq, q²',{s:11});T('forventet p², 2pq, q²',b2.l+b2.w,yy,{a:'right',s:11,c:C.yellow});T('observert',b2.l+b2.w-w2-12,yy,{a:'right',s:11,c:C.teal})}
 const Q=Plane(0,200,0,1,{l:bot.l+34,t:bot.t,w:bot.w-34,h:bot.h});Q.grid(25,{sy:.25,minor:false,alpha:.08});Q.axes({xs:25,ys:.25,x0:true,y0:true,xl:'generasjon',ls:13,yf:y=>nf(y,2)});lab(bot,'Allelfrekvens p (andel A) i hver populasjon');
 S.pops.forEach((P_,i)=>{pth(P_.h.map((v,g)=>Q.pt(g,v)),A(C[COLS[i%COLS.length]],i===0?1:.75),i===0?2.8:1.6)})},
readout(S){const fix=S.pops.filter(P=>P.p>=1).length,lost=S.pops.filter(P=>P.p<=0).length;return[['generasjon',S.gen],['p i populasjon 1',nf(S.pops[0].p,2),'blue'],['A fiksert',fix],['A tapt',lost]]}
});
}

/* ---------- PCR og gelelektroforese ---------- */
{
const PH=[['Denaturering',95],['Primerfesting',55],['Forlengelse',72]];
const LAD=[100,200,300,400,500,700,1000],LANES=[['Stige',LAD],['Mor',[150,310,520,780]],['Barn',[150,180,520,880]],['Mulig far A',[180,310,610,880]],['Mulig far B',[200,260,450,700]]];
M({id:'bi-pcr',s:'bi',c:['BI2'],title:'PCR og gelelektroforese',short:'PCR og DNA-profil',kw:'pcr polymerasekjedereaksjon dna kopiering primer polymerase gelelektroforese dna-profil farskapstest bioteknologi genteknologi taq',
lead:'PCR kopierer et bestemt DNA-stykke om og om igjen. Hver runde dobler antallet. Etter 30 runder er det over en milliard kopier. Med gelelektroforese sorterer vi DNA-bitene etter lengde.',
controls:[{id:'mode',type:'seg',label:'Metode',value:'pcr',options:[['pcr','PCR'],['gel','Gelelektroforese']]},{id:'sp',label:'Fart',min:.3,max:3,step:.1,value:1,show:S=>S.p.mode==='pcr'},{id:'U',label:'Spenning',min:50,max:150,step:5,value:100,unit:'V',show:S=>S.p.mode==='gel'},{type:'btns',items:[['Start på nytt',S=>MOD['bi-pcr'].init(S)]]}],
tex:['\\text{antall kopier}=2^n','2^{30}\\approx 1{,}07\\cdot 10^{9}','\\text{korte DNA-biter vandrer lengst i gelen}'],
about:['Hver PCR-syklus har tre trinn. Ved 95 °C går de to DNA-trådene fra hverandre. Ved omtrent 55 °C fester korte <strong>primere</strong> seg til hver sin tråd der målsekvensen starter. Ved 72 °C bygger enzymet DNA-polymerase en ny tråd fra hver primer.','Enzymet kommer fra bakterier som lever i varme kilder, og tåler derfor oppvarmingen. Etter noen titalls sykluser begynner byggesteinene å ta slutt, og kurven flater ut.','I <strong>gelelektroforese</strong> legges DNA i brønner i en gel. DNA er negativt ladd og vandrer mot plusspolen. Korte biter kommer seg lettere gjennom gelen og vandrer lengst. Stigen har biter med kjent lengde.','I farskapstesten er hvert bånd hos barnet arvet enten fra mor eller fra far. Dette er et forenklet eksempel med fire bånd.'],
tasks:['Hvor mange kopier er det etter 10, 20 og 30 sykluser?','Hvorfor må temperaturen ned igjen etter denatureringen?','Hvilket bånd hos barnet kommer fra mor, og hvilke må komme fra far? Hvem er faren?','Hvor langt er det minste båndet hos «Mulig far B»? Bruk stigen.'],
init(S){S.cy=0;S.u=0;S.gt=0},
change(S,id){if(id==='mode')this.init(S)},
update(S,dt){if(S.p.mode==='pcr'){S.u+=dt*S.p.sp/3;if(S.u>=1){S.u-=1;S.cy++;if(S.cy>=35){S.cy=0}}}else{S.gt=Math.min(S.gt+dt*S.p.U/100,30)}},
draw(S){if(S.p.mode==='gel')return this.gel(S);const[top,bot]=rows(pad(S,28,26,46),[1.15,1],40);const u=S.u,ph=u<1/3?0:u<.55?1:2,f=ph===0?u*3:ph===1?(u-1/3)/(.55-1/3):(u-.55)/.45;
 const L=top.l+top.w*.08,R_=top.l+top.w*.92,ms=top.l+top.w*.35,me=top.l+top.w*.7,cy=top.t+top.h*.55;const sep=ph===0?ease(f)*top.h*.32:top.h*.32;const yT=cy-sep/2-4,yB=cy+sep/2+4;
 const strand=(y,c,x0=L,x1=R_)=>{ln(x0,y,x1,y,c,3);for(let x=x0+6;x<x1;x+=11)ln(x,y,x,y+(y<cy?6:-6),A(c,.6),1.5)};
 rct(ms,cy-top.h*.28,me-ms,top.h*.56,null,A(C.yellow,.06));T('målsekvens',(ms+me)/2,cy-top.h*.31,{a:'center',s:11.5,c:C.yellow});
 strand(yT,C.blue);strand(yB,C.pink);if(ph===0)ln(L,cy,R_,cy,A(C.fg,0),1);
 if(ph>=1){const pa=ph===1?ease(f):1;const pl=(me-ms)*.12;const yp1=lerp(yT-30,yT+12,pa),yp2=lerp(yB+30,yB-12,pa);ln(me-pl,yp1,me,yp1,C.gold,4);ln(ms,yp2,ms+pl,yp2,C.gold,4)}
 if(ph===2){const g=ease(f);const x1=me-(me-ms)*g;ln(x1,yT+12,me,yT+12,C.green,3);dot(x1,yT+12,7,A(C.teal,.9));const x2=ms+(me-ms)*g;ln(ms,yB-12,x2,yB-12,C.green,3);dot(x2,yB-12,7,A(C.teal,.9))}
 T(`Syklus ${S.cy+1}: ${PH[ph][0]} (${PH[ph][1]} °C)`,top.l,top.t+6,{s:15,w:700,c:C.fg});T('primer',me+6,yT+12,{s:11,c:C.gold});T('DNA-polymerase bygger ny tråd',top.l+top.w-4,cy,{a:'right',s:11.5,c:C.teal});
 const[g1,g2]=cols(bot,[1,1.2],34);const tp=Plane(0,3,40,100,g1);tp.grid(1,{sy:20,minor:false,alpha:.1});tp.axes({xs:1,ys:20,x0:true,y0:true,xf:x=>'',yl:'°C',ls:13});lab(g1,isWide(S)?'Temperatur i PCR-maskinen':'Temperatur');
 const temp=t=>{const k=t%1;return k<1/3?95:k<.55?55:72};const pts=[];for(let i=0;i<=300;i++){const t=i/100;pts.push(tp.pt(t,temp(t)))}pth(pts,A(C.red,.35),1.8);dot(tp.X(u+1),tp.Y(temp(u)),6,C.red);
 const cp=Plane(0,35,0,10,g2);cp.grid(5,{sy:2,minor:false,alpha:.1});cp.axes({xs:5,ys:2,x0:true,y0:true,xl:'syklus',yf:y=>'10'+sup(Math.round(y)),ls:13});lab(g2,isWide(S)?'Antall kopier (logaritmisk)':'Kopier (log)');
 const cnt=c=>Math.min(c*Math.log10(2),9.3-9.3*Math.exp(-c/12)*0+0)*(1/(1+Math.exp((c-30)/2.2)))+9.3*(1-1/(1+Math.exp((c-30)/2.2)));cp.fn(cnt,A(C.green,.35),1.6);cp.fn(cnt,C.green,2.8,{to:S.cy+u,prog:1});dot(cp.X(S.cy+u),cp.Y(cnt(S.cy+u)),5,C.green)},
gel(S){const b=pad(S,26,40,26);b.l+=40;b.w-=40;const[gl,info]=cols(b,[1.6,1],30);const lw=gl.w/LANES.length,top=gl.t+30,len=gl.h-50;rr(gl.l,gl.t+16,gl.w,gl.h-24,8,A(C.fg,.3),A(C.teal,.07),1.5);
 T('−',gl.l+gl.w+13,top,{a:'center',f:'n',s:22,c:C.fg});T('+',gl.l+gl.w+13,gl.t+gl.h-20,{a:'center',f:'n',s:20,c:C.red});
 const dist=bp=>clamp(S.gt/30*(1.6-.5*Math.log10(bp)),0,1.2);
 LANES.forEach(([nm,bands],i)=>{const x=gl.l+i*lw+lw/2;rct(x-lw*.32,top-6,lw*.64,6,null,C.stage);T(nm,x,gl.t+4,{a:'center',s:11.5,c:i===0?C.fg3:C.fg2});
  bands.forEach(bp=>{const d=dist(bp);if(d>1.02)return;const y=top+d*len;glow(x,y,lw*.4,i===0?C.fg:C.pink,.18);rr(x-lw*.3,y-3,lw*.6,6,3,null,A(i===0?C.fg:C.pink,.85));if(i===0&&S.gt>4)T(bp+' bp',gl.l-4,y,{a:'right',f:'n',s:10,c:C.fg3})})});
 if(S.gt<30)for(let k=0;k<6;k++){const y=gl.t+20+((S.t*40+k*30)%(gl.h-30));dot(gl.l+gl.w-8,y,2,A(C.fg,.3))}
 let y=info.t+10;const L=(s,c=C.fg2,sz=13)=>{y+=Twrap(s,info.l,y,info.w,{s:sz,c})+6};L('Farskapstest',C.fg,15);L(S.gt<6?'Strømmen er på. DNA-bitene vandrer nedover mot plusspolen.':'Sammenlign båndene til barnet med mor og de to mulige fedrene.');L('Hvert bånd hos barnet må finnes hos mor eller hos far.',C.pink);L(`Kjøretid: ${nf(S.gt*2,0)} minutter`,C.fg3,12)},
readout(S){if(S.p.mode==='gel')return[['kjøretid',nf(S.gt*2,0)+' min'],['spenning',S.p.U+' V']];const c=S.cy+S.u;return[['syklus',S.cy+1],['kopier',c<29?nfs(Math.pow(2,S.cy+1),3):'nær 10⁹ (flater ut)','green'],['trinn',PH[S.u<1/3?0:S.u<.55?1:2][0]]]}
});
}

/* ---------- Genregulering: lac-operonet ---------- */
{
M({id:'bi-lacoperon',s:'bi',c:['BI2'],title:'Genregulering: lac-operonet',short:'Genregulering',kw:'genregulering genuttrykk operon lac-operon repressor operator promotor transkripsjon translasjon bakterie e. coli laktose glukose cap',
lead:'Bakterien E. coli lager bare enzymene som bryter ned laktose når det finnes laktose, og helst bare når det ikke finnes glukose. Et protein, repressoren, sperrer genene til de trengs.',
controls:[{id:'lak',type:'check',label:'Laktose finnes',value:false},{id:'glu',type:'check',label:'Glukose finnes',value:true},{id:'sp',label:'Fart (minutter per sekund)',min:.5,max:6,step:.5,value:2,d:1}],
tex:['\\text{laktose}\\Rightarrow\\text{repressoren slipper operatoren}','\\text{lite glukose}\\Rightarrow\\text{CAP hjelper RNA-polymerase}'],
about:['Genene <em>lacZ</em>, <em>lacY</em> og <em>lacA</em> ligger etter hverandre og leses av samtidig. Sammen med promotoren og operatoren kalles de et <strong>operon</strong>.','Uten laktose sitter <strong>repressoren</strong> på operatoren og stenger veien for RNA-polymerasen. Når det finnes laktose, binder et omdannet laktosemolekyl seg til repressoren, som endrer form og slipper taket.','Når glukosen er brukt opp, binder proteinet <strong>CAP</strong> seg foran promotoren og gjør det mye lettere for RNA-polymerasen å starte. Bakterien bruker altså helst glukose og skrur på laktosegenene for fullt bare når glukosen er borte.','Slik regulering gjør at bakterien ikke bruker energi på å lage proteiner den ikke trenger.'],
tasks:['Hvilken kombinasjon av laktose og glukose gir mest enzym?','Fjern laktosen. Hvorfor forsvinner ikke enzymet med en gang?','Hvorfor er det lurt for bakterien å bruke glukose først?','Gi et eksempel på genregulering hos mennesker.'],
init(S){S.m=0;S.E=0;S.min=0;S.hist=[];S.pol=null;S.mr=[];S.enz=[];S.lac=[...Array(30)].map(()=>({x:Math.random(),y:Math.random()}));S.marks=[];S.prev=[S.p.lak,S.p.glu];const tr=(S.p.lak?1:.02)*(S.p.glu?.15:1);S.m=tr/.5;S.E=.8*S.m/.05;for(let t=-60;t<=0;t+=1)S.hist.push([t,S.m,S.E]);S.min=0},
update(S,dt){const p=S.p;if(p.lak!==S.prev[0]||p.glu!==S.prev[1]){S.marks.push([S.min,(p.lak?'+laktose':'−laktose')+' '+(p.glu?'+glukose':'−glukose')]);S.prev=[p.lak,p.glu]}
 const tr=(p.lak?1:.02)*(p.glu?.15:1);const m=dt*p.sp;S.m+=m*(tr-.5*S.m);S.E+=m*(.8*S.m-.05*S.E);S.min+=m;
 if(!S.hist.length||S.min-S.hist[S.hist.length-1][0]>.5){S.hist.push([S.min,S.m,S.E]);while(S.hist.length&&S.hist[0][0]<S.min-60)S.hist.shift()}while(S.marks.length&&S.marks[0][0]<S.min-60)S.marks.shift();
 if(!S.pol&&Math.random()<tr*dt*1.5)S.pol={f:0};if(S.pol){S.pol.f+=dt*.35;if(S.pol.f>=1){S.mr.push({x:Math.random()*.4+.45,y:0,t:0});S.pol=null}}S.mr.forEach(q=>{q.t+=dt;q.y+=dt*.05});S.mr=S.mr.filter(q=>q.t<5);
 const ne=Math.round(clamp(S.E/14,0,1)*14);while(S.enz.length<ne)S.enz.push({x:Math.random(),y:Math.random(),a:Math.random()*TAU});while(S.enz.length>ne)S.enz.pop();S.enz.forEach(z=>{z.a+=(Math.random()-.5)*dt*3;z.x=(z.x+Math.cos(z.a)*dt*.04+1)%1;z.y=(z.y+Math.sin(z.a)*dt*.04+1)%1})},
draw(S){const p=S.p;const[top,bot]=rows(pad(S,28,28,46),[1.3,1],40);const dy=top.t+top.h*.62,x0=top.l,W=top.w;const segs=[['CAP',.0,.08,'gold'],['promotor',.08,.22,'grey'],['operator',.22,.31,'red'],['lacZ',.31,.6,'blue'],['lacY',.6,.8,'teal'],['lacA',.8,.95,'purple']];
 ln(x0,dy,x0+W,dy,C.fg2,3);segs.forEach(([n,a,b,ck])=>{rr(x0+a*W+1,dy-9,(b-a)*W-2,18,4,null,A(C[ck],.6));T(n,x0+(a+b)/2*W,dy+22,{a:'center',s:W<500?9:11.5,c:C[ck],i:n.startsWith('lac')})});
 const opx=x0+.265*W;if(!p.lak){X.beginPath();X.ellipse(opx,dy-22,24,15,0,0,TAU);X.fillStyle=A(C.red,.85);X.fill();T('repressor',opx,dy-46,{a:'center',s:11.5,c:C.red})}else{const fx=opx+30+Math.sin(S.t)*8,fy=top.t+46+Math.cos(S.t*.8)*5;X.beginPath();X.ellipse(fx,fy,22,13,.4,0,TAU);X.fillStyle=A(C.red,.5);X.fill();poly([[fx+12,fy-10],[fx+20,fy-4],[fx+16,fy+4],[fx+8,fy+2]],null,C.yellow);T('repressor med laktose',fx,fy+25,{a:'center',s:11,c:C.red})}
 if(!p.glu){const cx=x0+.04*W;X.beginPath();X.ellipse(cx,dy-20,18,12,0,0,TAU);X.fillStyle=A(C.gold,.85);X.fill();T('CAP',cx,dy-20,{a:'center',s:10.5,c:C.stage,w:700})}
 if(S.pol){const x=x0+lerp(.15,.95,S.pol.f)*W;X.beginPath();X.ellipse(x,dy,30,22,0,0,TAU);X.fillStyle=A(C.green,.55);X.fill();X.strokeStyle=C.green;X.lineWidth=1.5;X.stroke();const mx0=x0+.31*W;if(x>mx0){const pts=[];for(let xx=mx0;xx<x;xx+=3)pts.push([xx,dy-30-Math.sin((xx-mx0)*.1)*4]);pth(pts,C.pink,2)}T('RNA-polymerase',x,dy+40,{a:'center',s:11,c:C.green})}
 S.mr.forEach(q=>{const x=x0+q.x*W,y=dy-50-q.y*top.h;const pts=[];for(let k=0;k<40;k++)pts.push([x+k*3,y-Math.sin(k*.5+S.t*2)*4]);pth(pts,A(C.pink,1-q.t/5),2);dot(x+20,y-6,6,A(C.fg2,.7*(1-q.t/5)))});
 const er={l:top.l+W*.62,t:top.t,w:W*.38,h:top.h*.32};if(p.lak)S.lac.forEach(q=>dot(er.l+q.x*er.w,er.t+q.y*er.h,2.6,C.yellow));S.enz.forEach(z=>{const x=er.l+z.x*er.w,y=er.t+z.y*er.h;X.beginPath();X.moveTo(x,y);X.arc(x,y,7,.5,TAU-.5);X.closePath();X.fillStyle=C.blue;X.fill()});T('β-galaktosidase (fra lacZ)',er.l,er.t-8,{s:11,c:C.blue});
 const tx=p.lak?(p.glu?'Lav aktivitet: laktose, men også glukose':'Høy aktivitet: bare laktose'):'Avslått: ingen laktose';T(tx,top.l,top.t+6,{s:14,w:700,c:C.fg});
 const em=Math.max(5,...S.hist.map(h=>h[2]))*1.15;const P=Plane(S.min-60,S.min,0,em,bot);P.grid(10,{sy:niceStep(em/4),minor:false,alpha:.08});P.axes({xs:10,ys:niceStep(em/4),x0:true,xAt:S.min-60,xf:x=>'',xl:'tid',ls:13});lab(bot,'Mengde enzym (blå) og mRNA (rosa) de siste 60 minuttene');
 S.marks.forEach(([t,l])=>{ln(P.X(t),P.t,P.X(t),P.t+P.h,A(C.fg,.3),1,[3,4]);T(l,P.X(t)+4,P.t+10,{s:10.5,c:C.fg3})});if(S.hist.length>1){pth(S.hist.map(h=>P.pt(h[0],h[2])),C.blue,2.6);pth(S.hist.map(h=>P.pt(h[0],h[1]*8)),C.pink,2)}},
readout(S){const p=S.p;return[['repressor',p.lak?'har sluppet operatoren':'sitter på operatoren','red'],['CAP',p.glu?'ikke bundet':'bundet: hjelper RNA-polymerase','gold'],['transkripsjon',p.lak?(p.glu?'lav':'høy'):'nesten av','green'],['enzymmengde',nf(S.E,1)+' (rel.)','blue']]}
});
}
