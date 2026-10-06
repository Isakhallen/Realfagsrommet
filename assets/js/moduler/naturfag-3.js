'use strict';
/* ================= NATURFAG (del 3): karbonforbindelser, karboksylsyrer og konservering ================= */

/* ---------- Havforsuring ---------- */
{
/* Konstanter for overflatevann (S = 35): CO₂-løselighet, syrekonstanter, borat og løselighetsprodukt for aragonitt */
const HAV={trop:{K0:.0284,pK1:5.847,pK2:8.966,pKB:8.6,pKw:13.22,pKsp:6.19,TA:2300e-6},pol:{K0:.0613,pK1:6.08,pK2:9.33,pKB:8.92,pKw:14.2,pKsp:6.17,TA:2290e-6}};
function carb(k,ppm){const w=HAV[k],c=w.K0*ppm*1e-6,K1=10**-w.pK1,K2=10**-w.pK2,KB=10**-w.pKB,Kw=10**-w.pKw,TB=4.16e-4;
 const pH=bisect(p=>{const h=10**-p;return K1*c/h+2*K1*K2*c/h/h+TB*KB/(KB+h)+Kw/h-h-w.TA},6,10),h=10**-pH;
 return{pH,co2:c*1e6,hco3:K1*c/h*1e6,co3:K1*K2*c/h/h*1e6,O:.0103*K1*K2*c/h/h/10**-w.pKsp}}
function co2m(x,y,s,a=1,rot=0){const dx=Math.cos(rot)*s*1.15,dy=Math.sin(rot)*s*1.15;circ(x-dx,y-dy,s*.8,null,A(C.red,.85*a));circ(x+dx,y+dy,s*.8,null,A(C.red,.85*a));circ(x,y,s*.9,null,A(C.fg2,a))}
M({id:'na-havforsuring',s:'na',c:['NAT','KJ1'],title:'Havforsuring: CO₂ gjør havet surere',short:'Havforsuring',kw:'havforsuring hav co2 karbondioksid karbonsyre hydrogenkarbonat karbonat kalk kalsiumkarbonat ph skjell korall uorganiske karbonforbindelser surhet aragonitt buffer',
lead:'Havet tar opp omtrent en firedel av CO₂-utslippene våre. CO₂ reagerer med vann og danner karbonsyre, og havet blir surere. Samtidig blir det mindre karbonat igjen, og det blir vanskeligere for skjell, koraller og plankton å bygge kalkskall.',
controls:[{id:'co2',label:'CO₂ i lufta',min:180,max:1200,step:5,value:420,unit:'ppm'},{id:'hav',type:'seg',label:'Havområde',value:'trop',options:[['trop','Tropisk hav (25 °C)'],['pol','Polarhav (2 °C)']]},
 {type:'btns',items:[['Istid (180 ppm)',S=>setP('co2',180,S)],['Før 1850 (280 ppm)',S=>setP('co2',280,S)],['I dag (420 ppm)',S=>setP('co2',420,S)],['År 2100, høye utslipp (1000 ppm)',S=>setP('co2',1000,S)]]}],
tex:['\\text{CO}_2(g)\\rightleftharpoons\\text{CO}_2(aq)','\\text{CO}_2+\\text{H}_2\\text{O}\\rightleftharpoons\\text{H}_2\\text{CO}_3\\rightleftharpoons\\text{H}^++\\text{HCO}_3^-','\\text{H}^++\\text{CO}_3^{2-}\\to\\text{HCO}_3^-','\\text{CaCO}_3(s)\\rightleftharpoons\\text{Ca}^{2+}+\\text{CO}_3^{2-}','\\Omega=\\frac{[\\text{Ca}^{2+}][\\text{CO}_3^{2-}]}{K_{sp}}'],
about:['CO₂, karbonsyre (H₂CO₃), hydrogenkarbonat (HCO₃⁻), karbonat (CO₃²⁻) og kalk (CaCO₃) er <strong>uorganiske karbonforbindelser</strong>. De inneholder karbon, men ikke kjeder av karbon og hydrogen slik organiske stoffer gjør.','Når CO₂ løses i vann, dannes litt <strong>karbonsyre</strong>. Den gir fra seg H⁺, så pH synker. Mesteparten av karbonet som er løst i havet, finnes som hydrogenkarbonat.','Mye av den ekstra H⁺ reagerer med karbonat og blir til hydrogenkarbonat. Derfor blir det <strong>mindre karbonat</strong> når CO₂ øker, selv om det blir mer karbon i havet totalt. Karbonatet virker som en buffer som demper pH-fallet.','Skjell og koraller er bygd av kalk. Metningen Ω forteller om vannet har nok karbonat. Er Ω større enn 1, kan kalk dannes. Er Ω mindre enn 1, løses kalken opp. Kaldt vann løser mer CO₂ og har mindre karbonat fra før, så polarhavene blir undermettet først. Modellen gjelder overflatevann i likevekt med lufta.'],
tasks:['Hvor mye har pH sunket fra 1850 (280 ppm) til i dag (420 ppm)? Hvor mange prosent mer H⁺ er det i havet?','Hvilken karbonforbindelse finnes det mest av i sjøvann? Hvilken blir det mindre av når CO₂ øker?','Velg polarhav. Hvor høyt må CO₂-nivået bli før vannet blir undermettet på kalk (Ω < 1)?','Hvorfor er havforsuring et problem for blåskjell, koraller og vingesnegler? Hva kan det bety for næringskjedene i havet?'],
init(S){S.sh=1;const rg=rng(7);S.pts=[...Array(240)].map(()=>({x:rg(),y:rg(),ph:rg()*TAU,sp:.3+rg()*.6}));S.drops=[]},
update(S,dt){const r=carb(S.p.hav,S.v.co2);S.sh=clamp(S.sh+dt*.12*clamp(r.O-1,-1,1),.04,1);if(Math.random()<dt*S.v.co2/260)S.drops.push({x:Math.random(),t:0});S.drops.forEach(d=>d.t+=dt*.5);S.drops=S.drops.filter(d=>d.t<1)},
draw(S){const k=S.p.hav,ppm=S.v.co2,r=carb(k,ppm),r0=carb(k,280);const[bl,br]=split(S,.5,{g:28,rv:.42,b:pad(S,24,26,30)});
 const sky=bl.h*.22,sy=bl.t+sky,bot=bl.t+bl.h,P=S.pts;
 rct(bl.l,bl.t,bl.w,sky,null,A(C.blue,.05));const g=X.createLinearGradient(0,sy,0,bot);g.addColorStop(0,A(C.blue,.26));g.addColorStop(1,A(C.blue,.07));X.fillStyle=g;X.fillRect(bl.l,sy,bl.w,bot-sy);
 X.beginPath();for(let i=0;i<=80;i++){const x=bl.l+bl.w*i/80,y=sy+Math.sin(i*.45+S.t*1.4)*2.2;i?X.lineTo(x,y):X.moveTo(x,y)}X.strokeStyle=A(C.blue,.8);X.lineWidth=1.6;X.stroke();
 T('Luft',bl.l+8,bl.t+11,{s:11.5,w:700,c:C.fg3});T('Hav',bl.l+8,sy+14,{s:11.5,w:700,c:C.fg3});
 const nA=Math.min(40,Math.round(ppm/45));for(let i=0;i<nA;i++){const p=P[i];co2m(bl.l+14+p.x*(bl.w-28)+Math.sin(S.t*p.sp+p.ph)*8,bl.t+24+p.y*(sky-34),3.6,1,p.ph+S.t*p.sp)}
 S.drops.forEach(d=>{co2m(bl.l+14+d.x*(bl.w-28),lerp(bl.t+sky*.6,sy+30,ease(d.t)),3.6,1-Math.max(0,d.t-.8)*5,d.t*4)});
 const wt=sy+18,wh=Math.max(16,bot-wt-92);const grp=(j0,n,f)=>{for(let i=0;i<Math.min(n,60);i++){const p=P[j0+i];f(bl.l+10+p.x*(bl.w-20)+Math.sin(S.t*p.sp+p.ph)*5,wt+p.y*wh+Math.cos(S.t*p.sp*.8+p.ph)*4,p)}};
 grp(40,Math.round(r.hco3/70),(x,y)=>circ(x,y,4,null,A(C.teal,.8)));
 grp(100,Math.round(r.co3/9),(x,y)=>circ(x,y,4.6,C.purple,A(C.purple,.35),1.6));
 grp(160,Math.round(r.co2*.6),(x,y,p)=>co2m(x,y,2.6,.8,p.ph));
 grp(180,Math.round(4*10**(8.25-r.pH)),(x,y)=>dot(x,y,2.4,C.red));
 rct(bl.l,bot-12,bl.w,12,null,A(C.gold,.2));
 const cx=bl.l+Math.min(bl.w*.2,70),cy=bot-46,sh=S.sh;X.beginPath();for(let a=0;a<=TAU*2.5;a+=.08){const q=2+a*2.2,x=cx+Math.cos(a)*q,y=cy+Math.sin(a)*q*.8;a?X.lineTo(x,y):X.moveTo(x,y)}X.strokeStyle=A('#E8DCC0',.2+.75*sh);X.lineWidth=1.2+5*sh;X.lineCap='round';X.stroke();
 if(r.O<1)for(let i=0;i<6;i++){const ph=(S.t*.5+i/6)%1,a=i*1.7;dot(cx+Math.cos(a)*(18+ph*34),cy-8-ph*36+Math.sin(a)*8,2.6,A(C.purple,1-ph))}
 const ok=r.O>=1;T(ok?'Kalkskallet kan bygges':'Kalkskallet løses opp',cx+46,cy-6,{s:12.5,w:700,c:ok?C.green:C.red});T('skall av kalk, CaCO₃',cx+46,cy+11,{s:11,c:C.fg3});
 const[g1,g2]=rows(br,[.9,1],34);lab(g1,'Uorganisk karbon løst i sjøvannet (µmol/kg)');
 const sm=g1.w<420,SP=[['CO₂ (løst)',r.co2,r0.co2,C.fg2],[sm?'HCO₃⁻':'HCO₃⁻ hydrogenkarbonat',r.hco3,r0.hco3,C.teal],[sm?'CO₃²⁻':'CO₃²⁻ karbonat',r.co3,r0.co3,C.purple]];
 const rh=Math.max(24,Math.min(44,(g1.h-26)/3)),lw=sm?78:Math.min(178,g1.w*.42),bw=g1.w-lw-50,sx=v=>g1.l+lw+bw*v/2400;
 SP.forEach(([n,v,v0,c],i)=>{const y=g1.t+6+i*rh+rh/2;T(n,g1.l,y,{s:12.5,c});rct(g1.l+lw,y-9,sx(v)-g1.l-lw,18,null,A(c,.7));ln(sx(v0),y-13,sx(v0),y+13,A(C.fg,.65),1.4,[3,2]);T(nf(v,0),sx(v)+6,y,{f:'n',s:12,c:C.fg})});
 T('Stiplet strek: før 1850 (280 ppm)',g1.l,g1.t+6+3*rh+12,{s:11,c:C.fg3});
 const gauge=(y,title,lo,hi,step,v,v0,f,fill)=>{const W0=g2.w-12,px=q=>g2.l+W0*clamp((q-lo)/(hi-lo),0,1);T(title,g2.l,y,{s:12,w:700,c:C.fg2});const by=y+26;fill(g2.l,by,W0,px);
  for(let q=lo;q<=hi+1e-9;q+=step)T(f(q),px(q),by+20,{a:'center',f:'n',s:10.5,c:C.fg3});ln(px(v0),by-5,px(v0),by+13,A(C.fg,.7),1.4,[3,2]);const x=px(v);poly([[x,by-1],[x-6,by-11],[x+6,by-11]],null,C.yellow);T(f(v),x+(x>g2.l+W0-50?-9:9),by-7,{a:x>g2.l+W0-50?'right':'left',f:'n',s:12.5,w:500,c:C.yellow})};
 const gh=(g2.h-10)/2;
 gauge(g2.t,'pH i overflatevannet (lavere er surere)',7.4,8.4,.2,r.pH,r0.pH,q=>nf(q,2),(x,y,w)=>{const gr=X.createLinearGradient(x,0,x+w,0);gr.addColorStop(0,A(C.red,.7));gr.addColorStop(.5,A(C.gold,.55));gr.addColorStop(1,A(C.blue,.7));X.fillStyle=gr;X.fillRect(x,y,w,8)});
 gauge(g2.t+Math.max(gh,64),'Metning av kalk, Ω',0,6,1,r.O,r0.O,q=>nf(q,q%1?1:0),(x,y,w,px)=>{rct(x,y,px(1)-x,8,null,A(C.red,.6));rct(px(1),y,x+w-px(1),8,null,A(C.green,.45))})},
readout(S){const r=carb(S.p.hav,S.p.co2),r0=carb(S.p.hav,280);const dH=10**(r0.pH-r.pH)-1;return[['CO₂ i lufta',nf(S.p.co2,0)+' ppm'],['pH',nf(r.pH,2),'yellow'],['H⁺ siden 1850',(dH>=0?'+':'−')+nf(Math.abs(dH)*100,0)+' %','red'],['karbonat',nf(r.co3,0)+' µmol/kg','purple'],['metning Ω',nf(r.O,2)]]}
});
}

/* ---------- Karboksylsyrer og estere ---------- */
{
const SY={1:['metansyre','stikkende (maursyre)',101,-.54],2:['etansyre','eddik',118,-.17],3:['propansyre','skarp og sur',141,.33],4:['butansyre','harskt smør, oppkast',164,.79]};
const AL={1:['metanol','svak sprit (giftig!)',65,-.77],2:['etanol','sprit',78,-.31],3:['propan-1-ol','sprit',97,.25],5:['pentan-1-ol','skarp, fuselaktig',138,1.51],8:['oktan-1-ol','fet, svakt sitrus',195,3]};
const PRE={1:'met',2:'et',3:'prop',4:'but',5:'pent',8:'okt'};
const DUFT={'1-1':'eterisk, søtlig','1-2':'rom, bringebær','1-3':'fruktig','1-5':'plomme','1-8':'appelsin, rose','2-1':'lim, fruktig','2-2':'neglelakkfjerner, pære','2-3':'pære','2-5':'banan','2-8':'appelsin','3-1':'rom','3-2':'ananas, rom','3-3':'fruktig','3-5':'aprikos','3-8':'fruktig, voksaktig','4-1':'eple','4-2':'ananas','4-3':'ananas, aprikos','4-5':'aprikos, pære','4-8':'fruktig, voksaktig'};
const EBP={'1-1':32,'1-2':54,'1-3':81,'1-5':132,'1-8':198,'2-1':57,'2-2':77,'2-3':102,'2-5':149,'2-8':211,'3-1':80,'3-2':99,'3-3':122,'3-5':169,'3-8':228,'4-1':102,'4-2':121,'4-3':143,'4-5':186,'4-8':244};
const eName=(a,b)=>PRE[b]+'yl'+PRE[a]+'anoat';
const fA=a=>'C'+(a>1?sub(a):'')+'H'+sub(2*a)+'O₂',fB=b=>'C'+(b>1?sub(b):'')+'H'+sub(2*b+2)+'O',fE=(a,b)=>'C'+sub(a+b)+'H'+sub(2*(a+b))+'O₂';
function segs(a,b){const A_=[];if(a===1)A_.push({t:'H'});else{A_.push({t:'CH₃'});for(let i=0;i<a-2;i++)A_.push({t:'CH₂'})}A_.push({t:'C',p:1,dbo:1},{t:'OH',p:1,lv:1});
 const B=[{t:'H',p:1,lv:1},{t:'O',p:1}];for(let i=0;i<b-1;i++)B.push({t:'CH₂'});B.push({t:'CH₃'});return[A_,B]}
M({id:'na-ester',s:'na',c:['NAT','KJ1'],warm:150,title:'Karboksylsyrer og estere: fra sur lukt til fruktig duft',short:'Estere og dufter',kw:'karboksylsyre ester forestring kondensasjon eddiksyre etansyre maursyre metansyre butansyre smørsyre alkohol duft lukt parfyme aroma hydrofil hydrofob kokepunkt organisk karboksylgruppe',
lead:'Karboksylsyrer lukter ofte surt eller vondt. Når en karboksylsyre reagerer med en alkohol, dannes en ester og vann. Mange estere lukter fruktig og brukes i parfymer og smaksstoffer.',
controls:[{id:'a',type:'sel',label:'Karboksylsyre',value:2,options:Object.entries(SY).map(([k,v])=>[+k,`${v[0]} (lukter ${v[1].replace(/ \(.*\)$/,'')})`])},{id:'b',type:'sel',label:'Alkohol',value:5,options:Object.entries(AL).map(([k,v])=>[+k,v[0]])},{type:'btns',items:[['Kjør reaksjonen på nytt',S=>{S.rx=-.4}]]}],
tex:['\\text{syre}+\\text{alkohol}\\xrightarrow{\\text{H}_2\\text{SO}_4}\\text{ester}+\\text{vann}','\\text{R-COOH}+\\text{HO-R}^\\prime\\to\\text{R-COO-R}^\\prime+\\text{H}_2\\text{O}','\\text{CH}_3\\text{COOH}\\rightleftharpoons\\text{CH}_3\\text{COO}^-+\\text{H}^+'],
about:['En <strong>karboksylsyre</strong> har karboksylgruppen –COOH. Den kan gi fra seg H⁺, så stoffet er en svak syre. Eddiksyre (etansyre) i eddik og maursyre (metansyre) fra maur er eksempler.','Når syren og alkoholen varmes med litt svovelsyre som katalysator, går OH fra syren og H fra alkoholen sammen til vann. Resten kobles sammen til en <strong>ester</strong>. Reaksjonen kalles forestring og er en kondensasjonsreaksjon.','Blå bakgrunn markerer de <strong>hydrofile</strong> (vannelskende) delene av molekylet, og gul bakgrunn de <strong>hydrofobe</strong> (vannskyende) karbonkjedene. Esteren har ingen OH-gruppe og kan ikke danne hydrogenbindinger med andre estermolekyler. Derfor koker den lavere og fordamper lettere enn syren, og lukten når fram til nesen.','Lange karbonkjeder gjør stoffet mer hydrofobt og mindre løselig i vann. Duftbeskrivelsene er omtrentlige, og mange estere lukter annerledes i høye konsentrasjoner.'],
tasks:['Lag esteren som lukter banan. Hvilken syre og hvilken alkohol brukte du?','Sammenlign kokepunktet til butansyre og etylbutanoat. Hvorfor koker esteren lavere selv om molekylet er større?','Hvilket oksygenatom i esteren kommer fra alkoholen? Hvilke atomer blir til vann?','Hvorfor blir esteren mer hydrofob når du bytter etanol med oktan-1-ol?'],
init(S){S.rx=-.6},change(S){S.rx=-.4},
update(S,dt){S.rx=Math.min(3.2,S.rx+dt*.75)},
draw(S){const a=+S.p.a,b=+S.p.b,key=a+'-'+b;const[top,bot]=rows(pad(S,24,22,46),[1.25,1],34);
 const p1=ease(clamp(S.rx,0,1)),p2=ease(clamp(S.rx-1,0,1)),p3=clamp(S.rx-2,0,1);
 const[A_,B]=segs(a,b),all=A_.concat(B);let fs=17;const wid=s=>tw(s.t,{f:'d',s:fs})+fs*.5,G=()=>fs*.95;
 const tot=()=>all.reduce((q,s)=>q+wid(s),0)+G()*(all.length-2)+fs*5;while(fs>10&&tot()>top.w)fs-=.5;
 const g=G(),y=top.t+top.h*.5,lay=(list,x0)=>{let x=x0;return list.map(s=>{const w=wid(s),c=x+w/2;x+=w+g;return c})},span=list=>list.reduce((q,s)=>q+wid(s),0)+g*(list.length-1);
 const gap=lerp(fs*5,g,p1),wA=span(A_),wB=span(B),x0=top.l+(top.w-wA-wB-gap)/2;const xa=lay(A_,x0),xb=lay(B,x0+wA+gap);
 const E=A_.slice(0,-1).concat(B.slice(1)),xe=lay(E,top.l+(top.w-span(E))/2);
 const pos=[];A_.forEach((s,i)=>pos.push(s.lv?null:[lerp(xa[i],xe[i],p2),y]));B.forEach((s,j)=>pos.push(s.lv?null:[lerp(xb[j],xe[A_.length-1+j-1],p2),y]));
 const wx=(xa[A_.length-1]+xb[0])/2,wy=y+fs*3.4;const lvA=[lerp(xa[A_.length-1],wx+wid(B[0])/2+2,p2),lerp(y,wy,p2)],lvB=[lerp(xb[0],wx-wid(A_[A_.length-1])/2-2,p2),lerp(y,wy,p2)];
 pos[A_.length-1]=lvA;pos[A_.length]=lvB;
 all.forEach((s,i)=>{const[x,yy]=pos[i],w=wid(s);rr(x-w/2-g/2,yy-fs*.85,w+g,fs*1.7,6,null,A(s.p?C.blue:C.gold,s.lv?.22:.15))});
 const bond=(i,j,al)=>{if(al<=.02)return;const[x1,y1]=pos[i],[x2,y2]=pos[j];const d=Math.hypot(x2-x1,y2-y1)||1,ux=(x2-x1)/d,uy=(y2-y1)/d,r1=wid(all[i])/2-fs*.15,r2=wid(all[j])/2-fs*.15;if(d>r1+r2+2)ln(x1+ux*r1,y1+uy*r1,x2-ux*r2,y2-uy*r2,A(C.fg,.75*al),1.8)};
 for(let i=0;i<A_.length-1;i++)bond(i,i+1,all[i+1].lv?1-p2:1);for(let j=0;j<B.length-1;j++)bond(A_.length+j,A_.length+j+1,all[A_.length+j].lv?1-p2:1);
 bond(A_.length-2,A_.length+1,p2);if(p2>.95)bond(A_.length-1,A_.length,(p2-.95)*20);
 all.forEach((s,i)=>{const[x,yy]=pos[i];T(s.t,x,yy+1,{a:'center',f:'d',s:fs,c:s.p?C.blue:C.fg,w:500});if(s.dbo){ln(x-2.5,yy-fs*.7,x-2.5,yy-fs*1.75,A(C.fg,.75),1.6);ln(x+2.5,yy-fs*.7,x+2.5,yy-fs*1.75,A(C.fg,.75),1.6);rr(x-fs*.55,yy-fs*2.75,fs*1.1,fs*1.1,5,null,A(C.blue,.15));T('O',x,yy-fs*2.2,{a:'center',f:'d',s:fs,c:C.blue,w:500})}});
 const cA=(xa[0]+xa[A_.length-1])/2,cB=(xb[0]+xb[B.length-1])/2,ly=y+fs*2.6,fade=1-p2;
 if(fade>.05){X.globalAlpha=fade;T(SY[a][0],cA,ly,{a:'center',s:13,w:700,c:C.fg});T('lukter '+SY[a][1],cA,ly+17,{a:'center',s:11.5,c:C.fg2});T(AL[b][0],cB,ly,{a:'center',s:13,w:700,c:C.fg});T('lukter '+AL[b][1],cB,ly+17,{a:'center',s:11.5,c:C.fg2});if(p1<.6)T('+',(xa[A_.length-1]+xb[0])/2,y,{a:'center',f:'d',s:fs*1.3,c:C.fg2});X.globalAlpha=1}
 if(S.rx>.2&&S.rx<2)T('varmes med litt svovelsyre (katalysator)',top.l+top.w/2,top.t+6,{a:'center',s:12,c:C.gold});
 if(p2>.98){T('vann, H₂O',wx,wy+fs*1.3,{a:'center',s:12,c:C.blue})}
 if(p3>0){X.globalAlpha=p3;const cE=(xe[0]+xe[E.length-1])/2;T(eName(a,b),cE,top.t+6,{a:'center',f:'d',s:22,w:500,c:C.yellow});T('lukter '+DUFT[key],cE,top.t+30,{a:'center',s:13.5,c:C.fg});const xr=xe[E.length-1]+wid(E[E.length-1])/2+fs;for(let i=0;i<3;i++){const xx=xr+i*fs*.9,yy=y-fs*.2;X.beginPath();for(let k=0;k<=12;k++){const t=k/12;X.lineTo(xx+Math.sin(t*TAU+S.t*3+i)*3,yy-t*fs*1.1)}X.strokeStyle=A(C.yellow,.5);X.lineWidth=1.5;X.stroke()}X.globalAlpha=1}
 const[b1,b2]=split(S,.56,{g:30,b:bot});
 const lpE=.53*(a+b)-1.4,Q=Plane(-1.2,4.6,0,1,{l:b1.l,t:b1.t+14,w:b1.w,h:Math.min(b1.h-30,110)});lab(b1,'Hydrofil eller hydrofob?');
 const gr=X.createLinearGradient(Q.l,0,Q.l+Q.w,0);gr.addColorStop(0,A(C.blue,.55));gr.addColorStop(1,A(C.gold,.55));X.fillStyle=gr;X.fillRect(Q.l,Q.Y(.5)-3,Q.w,6);
 T('hydrofil: blandes med vann',Q.l,Q.Y(.5)+22,{s:11,c:C.blue});T('hydrofob: blandes med olje',Q.l+Q.w,Q.Y(.5)+22,{a:'right',s:11,c:C.gold});
 const mk=(v,n,c,up,al=1)=>{const x=Q.X(v),yy=Q.Y(.5);X.globalAlpha=al;dot(x,yy,6,c);ln(x,yy+(up?-6:6),x,yy+(up?-20:20),A(c,.8),1.4);T(n,clamp(x,Q.l+tw(n,{s:12})/2,Q.l+Q.w-tw(n,{s:12})/2),yy+(up?-28:28+14),{a:'center',s:12,w:700,c});X.globalAlpha=1};
 mk(SY[a][3],SY[a][0],C.red,true);mk(AL[b][3],AL[b][0],C.teal,false);mk(lpE,eName(a,b),C.yellow,true,.25+.75*p3);
 lab(b2,'Kokepunkt (°C)');const ebp=EBP[key];bars({l:b2.l,t:b2.t+18,w:b2.w,h:b2.h-40},[{v:SY[a][2],c:C.red,l:'syre',t:SY[a][2]+' °C'},{v:AL[b][2],c:C.teal,l:'alkohol',t:AL[b][2]+' °C'},{v:ebp,c:C.yellow,l:'ester',t:ebp+' °C',a:.25+.5*p3}],{max:260,min:0,g:14})},
readout(S){const a=+S.p.a,b=+S.p.b,k=a+'-'+b;return[['ester',eName(a,b),'yellow'],['formel',fE(a,b)],['duft',DUFT[k]],['kokepunkt',EBP[k]+' °C'],['syre',SY[a][0]+', '+fA(a),'red'],['alkohol',AL[b][0]+', '+fB(b),'teal']]}
});
}

/* ---------- Parfyme: hydrofilt og hydrofobt ---------- */
{
/* a: etanolandel som trengs ved lite duftstoff, lp: log P (fordeling oktanol/vann), bp: kokepunkt */
const DF={lim:{n:'Limonen (sitrus, fra appelsinskall)',k:'limonen',c:'#F0AC5F',a:.64,lp:4.4,bp:176,note:'toppnote',sh:'ring0'},lin:{n:'Linalool (lavendel)',k:'linalool',c:'#B189C6',a:.36,lp:3,bp:198,note:'hjertenote',sh:'chain1'},
 eb:{n:'Etylbutanoat (ananas)',k:'etylbutanoat',c:'#F4D345',a:.2,lp:1.85,bp:121,note:'toppnote',sh:'chain2'},van:{n:'Vanillin (vanilje)',k:'vanillin',c:'#E8DCC0',a:.24,lp:1.2,bp:285,note:'basenote',sh:'ring2',solid:1}};
const need=(d,o)=>clamp(d.a+.6*o,0,.97),dis=(et,f)=>1/(1+Math.exp(-(et-f)/.03));
const kind=o=>o>=.2?'parfyme':o>=.15?'eau de parfum':o>=.05?'eau de toilette':'eau de cologne';
function mol(type,x,y,r,s,col){X.save();X.translate(x,y);X.rotate(r);const H=C.fg,B=C.blue;
 if(type==='w'){circ(0,0,4.6*s,null,A(B,.85));dot(Math.cos(.9)*5.6*s,Math.sin(.9)*5.6*s,2.4*s,A(H,.85));dot(Math.cos(2.24)*5.6*s,Math.sin(2.24)*5.6*s,2.4*s,A(H,.85))}
 else if(type==='e'){const Gy=C.grey;ln(0,0,7*s,3*s,A(Gy,.6),2);ln(7*s,3*s,13*s,-1*s,A(Gy,.6),2);dot(7*s,3*s,3.3*s,A(Gy,.95));dot(13*s,-1*s,3.3*s,A(Gy,.95));circ(0,0,4*s,null,A(B,.9))}
 else{const sh=type;if(sh.startsWith('ring')){for(let i=0;i<6;i++){const a=i/6*TAU;dot(Math.cos(a)*6*s,Math.sin(a)*6*s,2.6*s,A(col,.95))}dot(10*s,0,2.6*s,A(col,.95));if(sh==='ring2'){dot(-10*s,0,3*s,A(B,.9));dot(-4*s,-9*s,3*s,A(B,.9))}}
  else{const n=6;for(let i=0;i<n;i++){const xx=(i-n/2)*5*s,yy=(i%2?-2.2:2.2)*s;dot(xx,yy,2.8*s,A(col,.95))}if(sh==='chain1')dot(1*s,-7*s,3.2*s,A(B,.9));else dot(-2*s,6*s,3.2*s,A(B,.9))}}X.restore()}
M({id:'na-parfyme',s:'na',c:['NAT'],title:'Parfyme: hydrofile og hydrofobe stoffer',short:'Parfyme',kw:'parfyme duft duftstoff eterisk olje hydrofil hydrofob polar upolar løselighet etanol vann emulsjon limonen linalool vanillin ester likt løser likt eau de toilette blakket',
lead:'Duftstoffer er for det meste hydrofobe og løser seg dårlig i vann. Derfor lages parfyme med etanol, som har både en hydrofil og en hydrofob del. Med for mye vann blir parfymen blakket, og oljen skiller seg ut.',
controls:[{id:'df',type:'sel',label:'Duftstoff',value:'lim',options:Object.entries(DF).map(([k,v])=>[k,v.n])},{id:'et',label:'Etanol i løsemidlet (resten er vann)',min:0,max:100,step:1,value:85,unit:'%'},{id:'o',label:'Andel duftstoff i flasken',min:2,max:30,step:1,value:15,unit:'%'},
 {type:'btns',items:[['Eau de cologne',S=>{setP('o',4,S);setP('et',75,S)}],['Eau de toilette',S=>{setP('o',10,S);setP('et',85,S)}],['Parfyme',S=>{setP('o',25,S);setP('et',92,S)}],['Bare vann',S=>setP('et',0,S)]]}],
tex:['\\text{hydrofil: polar, blandes med vann}','\\text{hydrofob: upolar, blandes med olje}','\\text{etanol: CH}_3\\text{CH}_2\\text{OH}'],
about:['<strong>Hydrofile</strong> stoffer er polare og blandes med vann. <strong>Hydrofobe</strong> stoffer er upolare og blandes med olje og fett. Huskeregelen er «likt løser likt».','Duftstoffene i parfyme er for det meste hydrofobe karbonkjeder og ringer. Limonen fra appelsinskall har ingen polar gruppe i det hele tatt. Linalool fra lavendel har én OH-gruppe, og vanillin har flere polare grupper. De er derfor litt mer hydrofile.','<strong>Etanol</strong> har en hydrofil OH-gruppe og en kort hydrofob karbonkjede. Den blandes både med vann og med duftstoffene og holder alt i én løsning. Etanolen fordamper raskt fra huden og tar med seg duften.','Når det blir for lite etanol, samler duftmolekylene seg i små dråper. Dråpene sprer lyset, og blandingen blir blakket. Med enda mindre etanol flyter oljen opp som et eget lag, og vanillin, som er et fast stoff, legger seg på bunnen. Grensene i modellen er omtrentlige.'],
tasks:['Velg limonen og trykk «Bare vann». Hva skjer? Øk etanolinnholdet til blandingen blir klar. Hvor mye etanol trengs?','Sammenlign limonen og vanillin. Hvilket stoff trenger minst etanol, og hvorfor?','Hvorfor trenger en parfyme med mye duftstoff mer etanol enn en eau de cologne?','Hvorfor får du ikke vasket olje av hendene med bare vann? Hva gjør såpe annerledes?'],
init(S){const rg=rng(3);S.mp=[...Array(64)].map((_,i)=>({x:rg(),y:rg(),r:rg()*TAU,ph:rg()*TAU,sp:.4+rg()*.7}))},
draw(S){const d=DF[S.p.df],o=S.v.o/100,et=S.v.et/100,f=need(d,o),ds=dis(et,f);const[bl,br]=split(S,.4,{g:28,b:pad(S,24,26,44)});
 const cloud=(1-ds)*clamp(ds/.25,0,1),layer=clamp(1-ds/.3,0,1);
 const bw=Math.min(bl.w*.7,bl.h*.62),bh=Math.min(bl.h*.68,bw*1.15),bx=bl.l+(bl.w-bw)/2,by=bl.t+bl.h-bh-26;
 rr(bx+bw*.38,by-bh*.2,bw*.24,bh*.12,3,A(C.fg,.5),A(C.gold,.35),1.4);rr(bx+bw*.42,by-bh*.09,bw*.16,bh*.1,2,A(C.fg,.5),null,1.4);
 const ly=by+bh*.2,lh=bh*.8-6;rr(bx+4,ly,bw-8,lh,bw*.12,null,A(d.c,.08+.14*o));rr(bx+10,ly+8,6,lh*.6,3,null,A('#ffffff',.08));
 if(cloud>.01){rr(bx+4,ly,bw-8,lh,bw*.12,null,A('#ffffff',.55*cloud));const rg=rng(9);for(let i=0;i<Math.round(60*cloud);i++){const x=bx+14+rg()*(bw-28),y=ly+8+rg()*(lh-16)+Math.sin(S.t+i)*2;dot(x,y,1.2+rg()*2*(1-ds),A('#ffffff',.6))}}
 if(layer>.01){const th=lh*clamp(o*1.4,.06,.4)*layer;if(d.solid){const rg=rng(4);for(let i=0;i<Math.round(26*layer);i++){const x=bx+bw*.15+rg()*bw*.7,y=ly+lh-6-rg()*th*.6;poly([[x,y-5],[x+4,y],[x,y+3],[x-4,y]],null,A(d.c,.9))}}
  else{X.save();X.beginPath();X.rect(bx+4,ly,bw-8,th+4);X.clip();rr(bx+4,ly,bw-8,lh,bw*.12,null,A(d.c,.75));X.restore();ln(bx+6,ly+th,bx+bw-6,ly+th+Math.sin(S.t)*1.2,A(d.c,.9),1.4)}}
 rr(bx,by,bw,bh,bw*.14,A(C.fg,.7),null,2);
 const st=ds>.9?['Klar løsning',C.green]:layer>.3?['Duftstoffet skiller seg ut',C.red]:['Blakket blanding',C.gold];T(st[0],bl.l+bl.w/2,Math.max(bl.t+8,by-bh*.2-30),{a:'center',s:15,w:700,c:st[1]});
 T(`${kind(o)} · ${nf(o*100,0)} % duftstoff`,bl.l+bl.w/2,by+bh+16,{a:'center',s:12,c:C.fg2});
 const[z,s2]=rows(br,[2.1,1],40);const R=Math.min(z.w,z.h-26)/2-4,cx=z.l+z.w/2,cy=z.t+(z.h-26)/2;
 X.save();X.beginPath();X.arc(cx,cy,R,0,TAU);X.fillStyle=A(C.blue,.06);X.fill();X.clip();
 const n=S.mp.length,nF=Math.round(n*clamp(o*1.5,.08,.45)),nE=Math.round((n-nF)*et);const ccx=cx,ccy=cy-R*(d.solid?-.45:.45);
 S.mp.forEach((p,i)=>{let x=cx+(p.x*2-1)*R*.92,y=cy+(p.y*2-1)*R*.92;const typ=i<nF?d.sh:i<nF+nE?'e':'w';
  if(i<nF){const k=i,ring=Math.floor(Math.sqrt(k)),ang=k*2.4;const tx=ccx+Math.cos(ang)*ring*R*.13,ty=ccy+Math.sin(ang)*ring*R*.09;x=lerp(x,tx,1-ds);y=lerp(y,ty,1-ds)}else{const cr=Math.sqrt(nF)*R*.12,dx=x-ccx,dy=y-ccy,dd=Math.hypot(dx,dy)||1;if(dd<cr){const k=(cr-dd)/dd*(1-ds);x+=dx*k;y+=dy*k}}
  x+=Math.sin(S.t*p.sp+p.ph)*4;y+=Math.cos(S.t*p.sp*.8+p.ph)*4;mol(typ,x,y,p.r+Math.sin(S.t*.5+p.ph)*.4,R/120,d.c)});
 X.restore();circ(cx,cy,R,A(C.fg,.4),null,1.4);lab(z,'Molekyler (forstørret)');
 const lg=[['w','vann'],['e','etanol'],[d.sh,d.k]];let lx=z.l;lg.forEach(([t,nm])=>{mol(t,lx+10,z.t+z.h-8,0,.9,d.c);T(nm,lx+30,z.t+z.h-8,{s:12,c:C.fg2});lx+=tw(nm,{s:12})+56});
 const Q=Plane(-1.6,4.8,0,1,{l:s2.l,t:s2.t+14,w:s2.w,h:s2.h-30});lab(s2,'Hydrofil eller hydrofob?');const gr=X.createLinearGradient(Q.l,0,Q.l+Q.w,0);gr.addColorStop(0,A(C.blue,.55));gr.addColorStop(1,A(C.gold,.55));X.fillStyle=gr;X.fillRect(Q.l,Q.Y(.45)-3,Q.w,6);
 T('hydrofil',Q.l,Q.Y(.45)+18,{s:11,c:C.blue});T('hydrofob',Q.l+Q.w,Q.Y(.45)+18,{a:'right',s:11,c:C.gold});
 [[-1.38,'vann',C.blue],[-.31,'etanol',C.teal],[d.lp,d.k,d.c]].forEach(([v,nm,c],i)=>{const x=Q.X(v),y=Q.Y(.45);dot(x,y,6,c);T(nm,clamp(x,Q.l+30,Q.l+Q.w-40),y-16,{a:'center',s:12,w:700,c})})},
readout(S){const d=DF[S.p.df],o=S.p.o/100,f=need(d,o),ds=dis(S.p.et/100,f);return[['blandingen',ds>.9?'klar':ds>.3?'blakket':'skiller seg'],['type',kind(o)],['etanol som trengs','minst '+nf(f*100,0)+' %','yellow'],['kokepunkt',d.bp+' °C'],['duftnote',d.note]]}
});
}

/* ---------- Melkesyre: yoghurt og muskler ---------- */
{
const ctm=(T,a,o,b)=>T<=a||T>=b?0:(T-b)*(T-a)**2/((o-a)*((o-a)*(T-o)-(o-b)*(o+a-2*T)));
const pHof=LA=>6.65-2.6*(1-Math.exp(-LA/70)),PKA=3.86;
const prod=I=>.00373*Math.exp(I/16.7),pHm=L=>Math.max(6.4,7.05-.045*(L-1)),anShare=I=>clamp((I-55)/45,0,1)**1.4;
function lacPanel(b,pH){lab(b,'Melkesyre er en karboksylsyre');const parts=[['CH₃',0],['CH',0],['(OH)',1],['COOH',1]];let fs=clamp(b.w/22,12,17);
 const w=parts.map(p=>tw(p[0],{f:'d',s:fs})+8),tot=w.reduce((q,v)=>q+v,0)+3*14;let x=b.l+Math.max(0,(b.w-tot)/2);const y=b.t+18+fs;
 parts.forEach(([t,p],i)=>{rr(x,y-fs*.8,w[i],fs*1.6,5,null,A(p?C.blue:C.gold,.16));T(t,x+w[i]/2,y+1,{a:'center',f:'d',s:fs,c:p?C.blue:C.fg,w:500});x+=w[i];if(i===0||i===2){ln(x+2,y,x+12,y,A(C.fg,.7),1.6);x+=14}});
 const fa=1/(1+10**(PKA-pH)),by=y+fs+14,bw=b.w;rct(b.l,by,bw*(1-fa),14,null,A(C.blue,.7));rct(b.l+bw*(1-fa),by,bw*fa,14,null,A(C.teal,.7));
 T(`Ved pH ${nf(pH,1)} er ${nf(fa*100,fa>.995?1:0)} % laktat (har gitt fra seg H⁺)`,b.l,by+30,{s:12,c:C.fg2});
 T('melkesyre',b.l,by-9,{s:10.5,c:C.blue});T('laktat + H⁺',b.l+bw,by-9,{a:'right',s:10.5,c:C.teal})}
M({id:'na-melkesyre',s:'na',c:['NAT','BI1'],title:'Melkesyre: fra melk til yoghurt og i musklene',short:'Melkesyre',kw:'melkesyre laktat karboksylsyre gjæring melkesyrebakterier yoghurt kasein ph surmelk muskler anaerob celleånding trening melkesyreterskel konservering laktose',
lead:'Melkesyre er en karboksylsyre som dannes når sukker brytes ned uten oksygen. Melkesyrebakterier gjør melk om til yoghurt, og musklene lager melkesyre når de jobber hardere enn oksygentilførselen rekker.',
controls:[{id:'mode',type:'seg',label:'Vis',value:'yog',options:[['yog','Melk blir yoghurt'],['mus','Muskler i arbeid']]},
 {id:'T',label:'Temperatur',min:2,max:60,step:1,value:43,unit:'°C',show:S=>S.p.mode==='yog'},
 {type:'btns',show:S=>S.p.mode==='yog',items:[['Start på nytt',S=>MOD['na-melkesyre'].init(S)],['Kjøleskap (4 °C)',S=>setP('T',4,S)],['Yoghurtmaskin (43 °C)',S=>setP('T',43,S)]]},
 {id:'I',label:'Belastning',min:0,max:100,step:1,value:65,unit:'% av maks',show:S=>S.p.mode==='mus'},
 {type:'btns',show:S=>S.p.mode==='mus',items:[['Hvile',S=>setP('I',0,S)],['Rolig jogg',S=>setP('I',55,S)],['Hard løping',S=>setP('I',82,S)],['Spurt',S=>setP('I',100,S)]]}],
tex:['\\text{C}_6\\text{H}_{12}\\text{O}_6\\to 2\\,\\text{CH}_3\\text{CH(OH)COOH}','\\text{CH}_3\\text{CH(OH)COOH}\\rightleftharpoons\\text{CH}_3\\text{CH(OH)COO}^-+\\text{H}^+','\\text{p}K_a=3{,}86'],
about:['Melkesyre (2-hydroksypropansyre) har både en karboksylgruppe, –COOH, og en hydroksylgruppe, –OH. Karboksylgruppen kan gi fra seg H⁺. Når pH er høyere enn 3,9, finnes det meste som <strong>laktat</strong>, ionet uten H⁺.','<strong>Yoghurt:</strong> Melkesyrebakterier bryter ned melkesukker (laktose) til melkesyre. pH synker fra 6,6. Rundt pH 4,6 klumper melkeproteinet kasein seg sammen, og melken blir tykk. Yoghurten holder seg lenge fordi få andre bakterier tåler så lav pH. Bakteriene vokser best ved rundt 42 °C. I kjøleskapet står de nesten stille, og over omtrent 50 °C dør de.','<strong>Musklene:</strong> Ved lav belastning brytes glukose helt ned til CO₂ og vann i mitokondriene. Ved hard belastning lager cellene i tillegg laktat og H⁺, fordi det gir ATP raskt uten oksygen. H⁺ gjør musklene sure og bidrar til at de blir slitne. Laktatet brukes som brensel igjen når belastningen går ned.','Melkesyre er ikke årsaken til at du er støl dagen etter trening. Laktatet er borte fra blodet etter en times tid, mens stølheten skyldes små skader i muskelfibrene. Modellene er forenklet.'],
tasks:['Hvor lang tid tar det før melken blir til yoghurt ved 43 °C? Hva skjer ved 4 °C og ved 55 °C?','Hvorfor blir melken tykk når pH synker?','Hvor stor andel av melkesyren er laktat i yoghurt (pH ca. 4,4) og i muskelen (pH ca. 7)?','Finn belastningen der laktatet i blodet passerer 4 mmol/L. Hva skjer når du går fra spurt til hvile?'],
init(S){S.h=0;S.N=7;S.LA=0;S.hy=[[0,pHof(0),7]];S.m=0;S.L=1;S.hm=[[0,1,S.p.I]]},
change(S,id){if(id==='mode')this.init(S)},
update(S,dt){if(S.p.mode==='yog'){if(S.h>=12)return;const T=S.v.T,g=ctm(T,10,42,50),steps=8,h=dt*.8/steps;for(let i=0;i<steps;i++){const pH=pHof(S.LA),gp=clamp((pH-3.9)/1.2,0,1),n=10**(S.N-9);if(T>50)S.N=Math.max(2,S.N-h*(T-50)*.4);else S.N+=h*1.4*g*gp*(1-n)/Math.LN10;S.LA+=h*60*n*g*gp;S.h+=h}
  const l=S.hy[S.hy.length-1];if(S.h-l[0]>=.05)S.hy.push([S.h,pHof(S.LA),S.N])}
 else{const I=S.v.I,steps=8,h=dt*2/steps;for(let i=0;i<steps;i++){S.L=Math.max(.8,S.L+h*(prod(I)-.15*(S.L-1)));S.m+=h}const l=S.hm[S.hm.length-1];if(S.m-l[0]>=.1)S.hm.push([S.m,S.L,I]);while(S.hm.length&&S.hm[0][0]<S.m-32)S.hm.shift()}},
draw(S){const[bl,br]=split(S,.45,{g:28,b:pad(S,24,26,46)});const[top,mp]=isWide(S)?rows(bl,[1.9,1],30):[bl,null];
 if(S.p.mode==='yog'){const pH=pHof(S.LA),gel=clamp((5.4-pH)/.8,0,1),tc=S.v.T;
  const jh=Math.min(top.h-34,top.w*.9),jw=Math.min(top.w*.5,jh*.85),jx=top.l+(top.w-jw)/2-14,jy=top.t+top.h-jh;
  const st=pH<4.75?['Yoghurt!',C.green]:gel>.1?['Melken tykner …',C.gold]:S.N<6.5?['Bakteriene dør',C.red]:['Melk med melkesyrebakterier',C.fg];T(st[0],top.l+top.w/2,top.t+8,{a:'center',s:15,w:700,c:st[1]});
  const fy=jy+jh*.18;X.save();X.beginPath();X.moveTo(jx+4,fy);for(let i=0;i<=30;i++){const x=jx+4+(jw-8)*i/30;X.lineTo(x,fy+Math.sin(i*.7+S.t*2)*2.5*(1-gel))}X.lineTo(jx+jw-4,jy+jh-4);X.lineTo(jx+4,jy+jh-4);X.closePath();X.fillStyle=mix('#EDEAE0','#F3E9C8',gel,.92);X.fill();X.clip();
  if(gel>0){const rg=rng(2);for(let i=0;i<40;i++){const x=jx+rg()*jw,y=fy+rg()*(jh-jh*.18);circ(x,y,4+rg()*9,null,A('#C9BFA0',.22*gel))}}
  const nb=Math.round(clamp((S.N-6.3)*16,0,44)),rb=rng(6);for(let i=0;i<nb;i++){const x=jx+10+rb()*(jw-20),y=fy+10+rb()*(jy+jh-fy-20),a=rb()*PI;ln(x-Math.cos(a)*4,y-Math.sin(a)*4,x+Math.cos(a)*4,y+Math.sin(a)*4,A(C.purple,.85),2.6)}X.restore();
  rr(jx,jy,jw,jh,10,A(C.fg,.65),null,2);
  const tx=jx+jw+22,tt=jy+10,th=jh-30,tf=clamp(tc/60,0,1),tcol=tc>50?C.red:tc<10?C.blue:C.gold;rr(tx-4,tt,8,th,4,A(C.fg,.5),null,1.2);rct(tx-2,tt+th*(1-tf),4,th*tf,null,tcol);dot(tx,tt+th+6,7,tcol);T(nf(tc,0)+' °C',tx+12,tt+th*(1-tf),{s:12,f:'n',c:C.fg});
  if(mp)lacPanel(mp,pH);
  const[g1,g2]=rows(br,[1.2,1],40);const P=Plane(0,12,4,7,{l:g1.l+30,t:g1.t,w:g1.w-30,h:g1.h});P.grid(1,{sy:.5,minor:false,alpha:.06});P.axes({xs:2,ys:.5,xAt:0,yAt:4,x0:true,y0:true,yd:1,xf:x=>nf(x,0)});lab(g1,'pH i melken');
  rct(P.l,P.Y(4.6),P.w,P.Y(4)-P.Y(4.6),null,A(C.green,.07));ln(P.l,P.Y(4.6),P.l+P.w,P.Y(4.6),A(C.green,.6),1.2,[5,4]);T('kasein feller ut: yoghurt',P.l+P.w-4,P.Y(4.6)-9,{a:'right',s:11,c:C.green});
  if(S.hy.length>1)pth(S.hy.map(q=>P.pt(q[0],q[1])),C.yellow,2.6);dot(P.X(S.h),P.Y(pH),5,C.yellow);
  const Q=Plane(0,12,5,9.5,{l:g2.l+30,t:g2.t,w:g2.w-30,h:g2.h});Q.grid(1,{sy:1,minor:false,alpha:.06});Q.axes({xs:2,ys:1,xAt:0,yAt:5,x0:true,y0:true,xl:'timer',ls:13,yf:v=>'10'+sup(v),xf:x=>nf(x,0)});lab(g2,'Melkesyrebakterier per mL');
  if(S.hy.length>1)pth(S.hy.map(q=>Q.pt(q[0],clamp(q[2],5,9.5))),C.purple,2.4)}
 else{const I=S.v.I,an=anShare(I),L=S.L;const d=inset(top,4);T(`Belastning: ${nf(I,0)} % av maks`,d.l,d.t+8,{s:14,w:700,c:C.fg});
  const fs=clamp(d.w/34,10.5,13.5),wN=t=>tw(t,{s:fs,w:700})+16,node=(x,y,t,c)=>{const w=wN(t);rr(x-w/2,y-13,w,26,6,A(c,.8),A(c,.14),1.4);T(t,x,y+1,{a:'center',s:fs,w:700,c})};
  const xg=d.l+wN('glukose')/2+2,xm=d.l+d.w-wN('laktat + H⁺')/2-2,xp=lerp(xg,xm,.42),yt=d.t+d.h*.36,yb=d.t+d.h*.8,yc=(yt+yb)/2,hg=wN('glukose')/2+5,hp=wN('pyruvat')/2+5,hm=wN('laktat + H⁺')/2+5;
  const fl=I/100,fa=fl*(1-an*.6),fn=fl*an*1.6;const flow=(x1,y1,x2,y2,f,c)=>{if(f<.01){ln(x1,y1,x2,y2,A(c,.2),1.2,[3,4]);return}arr(x1,y1,x2,y2,A(c,.55),1.5+f*6,12);const n=Math.ceil(f*6);for(let i=0;i<n;i++){const t=(S.t*.6*(.5+f)+i/n)%1;dot(lerp(x1,x2,t),lerp(y1,y2,t),2.6,c)}};
  flow(xg+hg,yc,xp-hp,yc,Math.max(fl,.05),C.fg2);flow(xp+hp,yc-6,xm-hm,yt+6,fa,C.green);flow(xp+hp,yc+6,xm-hm,yb-6,fn,C.red);
  node(xg,yc,'glukose',C.fg2);node(xp,yc,'pyruvat',C.fg2);node(xm,yt,'CO₂ + H₂O',C.green);node(xm,yb,'laktat + H⁺',C.red);
  T('med O₂ i mitokondriene: mye ATP',d.l+d.w,yt-24,{a:'right',s:11,c:C.green});T('uten nok O₂: lite ATP, men raskt',d.l+d.w,yb+24,{a:'right',s:11,c:C.red});
  if(mp)lacPanel(mp,pHm(L));
  const[g1,g2]=rows(br,[1.6,1],40);const t1=Math.max(30,S.m),t0=t1-30,ym=Math.max(8,...S.hm.map(q=>q[1]))*1.12;
  const P=Plane(t0,t1,0,ym,{l:g1.l+30,t:g1.t,w:g1.w-30,h:g1.h});P.grid(5,{sy:niceStep(ym/4),minor:false,alpha:.06});P.axes({xs:5,ys:niceStep(ym/4),xAt:t0,x0:true,xf:x=>nf(x,0)});lab(g1,'Laktat i blodet (mmol/L)');
  ln(P.l,P.Y(4),P.l+P.w,P.Y(4),A(C.red,.6),1.2,[5,4]);T('melkesyreterskel, ca. 4 mmol/L',P.l+P.w-4,P.Y(4)-9,{a:'right',s:11,c:C.red});
  if(S.hm.length>1)pth(S.hm.map(q=>P.pt(q[0],q[1])),C.yellow,2.6);dot(P.X(S.m),P.Y(L),5,C.yellow);if(L>8)T('Musklene blir sure og slitne',P.l+8,P.t+12,{s:12.5,w:700,c:C.red});
  const Q=Plane(t0,t1,0,110,{l:g2.l+30,t:g2.t,w:g2.w-30,h:g2.h});Q.axes({xs:5,ys:50,xAt:t0,x0:true,xl:'minutter',ls:13,xf:x=>nf(x,0),yf:v=>v+' %'});lab(g2,'Belastning');
  if(S.hm.length>1)pth(S.hm.map(q=>Q.pt(q[0],q[2])),C.blue,2.2)}},
readout(S){if(S.p.mode==='yog'){const pH=pHof(S.LA),gel=clamp((5.4-pH)/.8,0,1);return[['tid',nf(S.h,1)+' timer'],['pH',nf(pH,2),'yellow'],['melkesyre',nf(S.LA*.009,2)+' %'],['bakterier','10'+sup(Math.round(S.N))+' per mL','purple'],['konsistens',gel>.85?'tykk':gel>.1?'tykner':'flytende']]}
 return[['tid',nf(S.m,1)+' min'],['laktat i blodet',nf(S.L,1)+' mmol/L','yellow'],['pH i muskelen',nf(pHm(S.L),2)],['energi uten O₂',nf(anShare(S.p.I)*100,0)+' %','red']]}
});
}

/* ---------- Sylting og konservering av mat ---------- */
{
/* Kardinalmodeller for vekst: temperatur [min, opt, maks], pH [min, opt, maks], laveste vannaktivitet */
const ORG={b:{n:'bakterier',c:'red',T:[-2,37,46],pH:[4.2,7,9.5],aw:.91,mu:1.2,O2:1,ben:.3,N0:3,Nt:-1,lim:7,top:9},m:{n:'muggsopp',c:'green',T:[0,25,35],pH:[1.8,5,9],aw:.78,mu:.12,O2:0,ben:.45,N0:1,Nt:-2,lim:5,top:8}};
const ctm=(T,[a,o,b])=>T<=a||T>=b?0:(T-b)*(T-a)**2/((o-a)*((o-a)*(T-o)-(o-b)*(o+a-2*T)));
const cpm=(p,[a,o,b])=>p<=a||p>=b?0:(p-a)*(p-b)/((p-a)*(p-b)-(p-o)**2);
function aw(su,sa){const wv=Math.max(.05,1-su/100-sa/100),ms=su/100/wv/.342,mn=sa/100/wv/.05844,xs=ms/(55.5+ms);return(1-xs)*Math.exp(-6.47*xs*xs)*Math.exp(-.018*2*.93*mn)}
const undis=pH=>1/(1+10**(pH-4.2));
function gam(o,p){return{T:ctm(p.T,o.T),pH:cpm(p.pH,o.pH),aw:clamp((aw(p.suk,p.salt)-o.aw)/(1-o.aw),0,1),B:p.benz?clamp(1-undis(p.pH)/o.ben,0,1):1,O:p.tett?o.O2:1}}
function curve(o,p){const g=gam(o,p),mu=o.mu*g.T*g.pH*g.aw*g.B*g.O,kd=p.T>o.T[2]?10**((p.T-62)/7):0,N0=p.tett?o.Nt:o.N0,lag=mu>1e-6?2.5/mu:Infinity;
 const spoil=N0>=o.lim?0:mu>1e-6&&!kd?(lag+(o.lim-N0)*Math.LN10/mu)/24:Infinity;
 return{g,mu,spoil,at:d=>{const h=d*24;return clamp(N0+(h>lag?mu*(h-lag)/Math.LN10:0)-kd*h,-3,o.top)}}}
const fmtD=d=>!isFinite(d)?'vokser ikke':d<1?'etter '+nf(d*24,0)+' timer':d<60?'etter '+nf(d,0)+' dager':d<365?'etter '+nf(d/30.4,0)+' måneder':'etter over et år';
const pre=o=>S=>{for(const k in o)setP(k,o[k],S);S.d=0};
const base={T:20,pH:6.6,suk:0,salt:0,benz:false,tett:false};
M({id:'na-konservering',s:'na',c:['NAT','BI1'],title:'Sylting og konservering av mat',short:'Konservering av mat',kw:'konservering sylting sylteagurk syltetøy eddik sukker salt kjøleskap fryser bakterier muggsopp ph vannaktivitet benzoesyre sorbinsyre konserveringsmiddel e210 holdbarhet mat mikroorganismer hermetikk karboksylsyre',
lead:'Mat blir ødelagt når bakterier og muggsopp vokser i den. Alle konserveringsmetoder går ut på å gjøre forholdene dårlige for mikroorganismene: kulde, syre, sukker, salt, konserveringsmidler eller koking og lufttett lokk.',
controls:[{id:'T',label:'Temperatur',min:-20,max:75,step:1,value:20,unit:'°C'},{id:'pH',label:'pH',min:2.5,max:7.5,step:.1,value:6.6,d:1},{id:'suk',label:'Sukker',min:0,max:70,step:1,value:0,unit:'%'},{id:'salt',label:'Salt',min:0,max:20,step:.5,value:0,unit:'%',d:1},
 {id:'benz',type:'check',label:'Tilsett benzoesyre (E210)',value:false},{id:'tett',type:'check',label:'Kokt glass med lufttett lokk',value:false},{id:'per',type:'seg',label:'Tidsakse',value:'7',options:[['7','1 uke'],['60','2 måneder'],['365','1 år']]},
 {type:'btns',items:[['Melk på benken',pre({...base,per:'7'})],['Melk i kjøleskapet',pre({...base,T:4,per:'60'})],['Fryseren',pre({...base,T:-18,per:'365'})],['Sylteagurk',pre({...base,pH:3.5,suk:5,salt:2,tett:true,per:'365'})],['Syltetøy',pre({...base,pH:3.3,suk:60,per:'60'})],['Saltet fisk',pre({...base,T:4,pH:6.2,salt:18,per:'365'})]]}],
tex:['\\text{C}_6\\text{H}_5\\text{COOH}\\rightleftharpoons\\text{C}_6\\text{H}_5\\text{COO}^-+\\text{H}^+\\qquad\\text{p}K_a=4{,}2','\\text{andel udissosiert}=\\frac{1}{1+10^{\\,\\text{pH}-\\text{p}K_a}}','a_w=\\frac{\\text{damptrykket over maten}}{\\text{damptrykket over rent vann}}'],
about:['Mikroorganismer trenger riktig temperatur, vann, næring og ofte oksygen. Grafen viser antall bakterier og muggsopp per gram mat på logaritmisk skala. Når det er rundt 10⁷ bakterier per gram, er maten ødelagt.','<strong>Kulde</strong> bremser veksten, men dreper ikke. <strong>Syre</strong> gir lav pH, og de fleste bakterier stopper under pH 4,5. Sylteagurk legges i eddik, og surkål blir sur av melkesyre. <strong>Sukker og salt</strong> binder vannet, slik at vannaktiviteten $a_w$ synker og mikroorganismene ikke får tak i nok vann.','Muggsopp tåler surere og tørrere forhold enn bakterier. Derfor kan det komme mugg på syltetøy, men muggsopp trenger oksygen. Koking dreper mikroorganismene, og et lufttett lokk hindrer at nye kommer inn. Mat som ikke er sur, må kokes ekstra godt før den lagres lufttett, ellers kan farlige bakterier som tåler mangel på oksygen vokse.','<strong>Benzoesyre</strong> (E210) er en karboksylsyre. Bare den udissosierte formen, C₆H₅COOH, er hydrofob nok til å trenge gjennom cellemembranen til mikroorganismene. Den virker derfor best i sur mat. Sorbinsyre (E200) virker på samme måte. Modellen er forenklet, og tallene er omtrentlige.'],
tasks:['Sammenlign «Melk på benken» og «Melk i kjøleskapet». Hvor lenge holder melken seg i hvert tilfelle?','Hvorfor vokser det ikke bakterier i sylteagurk? Hva bremser muggsoppen?','Velg syltetøy. Hvilken faktor stopper bakteriene, og hvorfor kan det likevel komme mugg?','Slå på benzoesyre og endre pH fra 6,5 til 4. Forklar hvorfor konserveringsmiddelet virker bedre i sur mat.'],
init(S){S.d=0},change(S,id){if(id==='per')S.d=0},
update(S,dt){const per=+S.p.per;S.d=Math.min(per,S.d+dt*per/14)},
draw(S){const p=S.v,per=+S.p.per,cb=curve(ORG.b,p),cm=curve(ORG.m,p),Nb=cb.at(S.d),Nm=cm.at(S.d),a=aw(p.suk,p.salt);const[bl,br]=split(S,.4,{g:28,b:pad(S,24,26,46)});
 const jh=Math.min(bl.h-70,bl.w*1.1),jw=Math.min(bl.w*.62,jh*.78),jx=bl.l+(bl.w-jw)/2,jy=bl.t+bl.h-jh-6;
 const food=p.suk>=35?'#B8324A':p.pH<4.6?'#7FA650':p.salt>=8?'#C9B79C':'#E2DCCB';const fy=jy+jh*.22;
 rr(jx+4,fy,jw-8,jy+jh-fy-4,8,null,A(food,.55));
 if(p.pH<4.6&&p.suk<35){const rg=rng(5);for(let i=0;i<5;i++){const x=jx+jw*(.2+.15*i),y=fy+18+rg()*(jh*.5);rr(x-7,y,14,jh*.32,7,null,A('#5E8A3A',.8))}}
 X.save();X.beginPath();X.rect(jx+4,fy,jw-8,jy+jh-fy-4);X.clip();const nb=Math.round(clamp((Nb-2)*9,0,70)),rg=rng(8);for(let i=0;i<nb;i++){const x=jx+8+rg()*(jw-16),y=fy+6+rg()*(jy+jh-fy-14),an=rg()*PI+Math.sin(S.t+i)*.2;ln(x-Math.cos(an)*3,y-Math.sin(an)*3,x+Math.cos(an)*3,y+Math.sin(an)*3,A(C.red,.9),2.4)}X.restore();
 const nmo=Math.round(clamp((Nm-2.5)*3,0,12));for(let i=0;i<nmo;i++){const x=jx+14+((i*37)%Math.max(1,jw-28)),r=4+clamp(Nm-3,0,5)*2.2;circ(x,fy,r,null,A('#9BC27A',.75));for(let k=0;k<6;k++){const an=-PI*(k+.5)/6;ln(x,fy,x+Math.cos(an)*r*1.5,fy+Math.sin(an)*r*1.5,A('#DDEBC9',.6),1)}}
 if(p.T<0){for(let i=0;i<6;i++){const x=jx+jw*(.15+.14*i),y=fy+jh*.35+(i%2)*20;for(let k=0;k<3;k++){const an=k*PI/3;ln(x-Math.cos(an)*6,y-Math.sin(an)*6,x+Math.cos(an)*6,y+Math.sin(an)*6,A('#DDEFFF',.8),1.4)}}}
 rr(jx,jy,jw,jh,12,A(C.fg,.6),null,2);
 if(S.p.tett){rr(jx-4,jy-12,jw+8,14,3,null,A(C.grey,.9));T('lufttett lokk',jx+jw/2,jy-22,{a:'center',s:11,c:C.fg3})}
 const bad=Nb>=ORG.b.lim||Nm>=ORG.m.lim;T(`Dag ${nf(S.d,S.d<10?1:0)}`,bl.l+bl.w/2,bl.t+8,{a:'center',f:'n',s:13,c:C.fg2});T(bad?(Nb>=ORG.b.lim?'Maten er ødelagt':'Synlig mugg'):'Maten er fortsatt god',bl.l+bl.w/2,bl.t+28,{a:'center',s:15,w:700,c:bad?C.red:C.green});
 T(`${nf(p.T,0)} °C · pH ${nf(p.pH,1)} · aw ${nf(a,2)}`,bl.l+bl.w/2,jy+jh+16,{a:'center',f:'n',s:11.5,c:C.fg3});
 const[g1,g2]=rows(br,[1.2,1],40);const xs=niceStep(per/6);const P=Plane(0,per,-2,9.5,{l:g1.l+30,t:g1.t,w:g1.w-30,h:g1.h});P.grid(xs,{sy:1,minor:false,alpha:.06});P.axes({xs,ys:2,xAt:0,yAt:-2,x0:true,y0:true,xl:'dager',ls:13,yf:v=>v===0?'1':'10'+sup(v),xf:x=>nf(x,0)});lab(g1,'Antall per gram (logaritmisk)');
 ln(P.l,P.Y(7),P.l+P.w,P.Y(7),A(C.red,.5),1.2,[5,4]);T('ødelagt av bakterier',P.l+4,P.Y(7)-9,{s:11,c:C.red});ln(P.l,P.Y(5),P.l+P.w,P.Y(5),A(C.green,.5),1.2,[5,4]);T('synlig mugg',P.l+4,P.Y(5)-9,{s:11,c:C.green});
 [[cb,C.red],[cm,C.green]].forEach(([c,col])=>{P.fn(c.at,A(col,.25),2,{});P.fn(c.at,col,2.6,{to:Math.max(1e-3,S.d)});dot(P.X(S.d),P.Y(clamp(c.at(S.d),-2,9.5)),4.5,col)});
 lab(g2,'Vekstfart sammenlignet med ideelle forhold');const F=[['Temperatur','T'],['Surhet (pH)','pH'],['Sukker og salt','aw'],['Benzoesyre','B'],['Oksygen','O']];const rh=(g2.h-14)/F.length,lw=Math.min(130,g2.w*.34),bw=(g2.w-lw-20)/2;
 T('bakterier',g2.l+lw,g2.t+4,{s:11,w:700,c:C.red});T('muggsopp',g2.l+lw+bw+10,g2.t+4,{s:11,w:700,c:C.green});
 F.forEach(([n,k],i)=>{const y=g2.t+18+i*rh+rh/2;T(n,g2.l,y,{s:12,c:C.fg2});[[cb.g[k],C.red,0],[cm.g[k],C.green,1]].forEach(([v,col,j])=>{const x=g2.l+lw+j*(bw+10),h=Math.min(12,rh-6);rct(x,y-h/2,bw,h,null,A(C.fg,.06));rct(x,y-h/2,bw*clamp(v,0,1),h,null,A(col,.7));T(v<.005?'stopper':nf(v*100,0)+' %',x+(v<.005?4:Math.min(bw*v+4,bw-34)),y,{f:'n',s:10.5,c:v<.005?col:C.fg})})})},
readout(S){const p=S.p,cb=curve(ORG.b,p),cm=curve(ORG.m,p);const r=[['vannaktivitet',nf(aw(p.suk,p.salt),3)],['bakterier',cb.spoil===0?'allerede ødelagt':fmtD(cb.spoil),'red'],['muggsopp',cm.spoil===0?'allerede synlig':fmtD(cm.spoil),'green']];if(p.benz)r.push(['udissosiert benzoesyre',nf(undis(p.pH)*100,0)+' %']);return r}
});
}
