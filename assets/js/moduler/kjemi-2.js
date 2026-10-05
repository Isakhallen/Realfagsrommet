/* ================= KJEMI (del 2) ================= */

/* ---------- Titrering ---------- */
{
const KW=1e-14,Va=25,ca=.1,cb=.1;
function phT(an,V){const Na=cb*V/(Va+V),Ca=ca*Va/(Va+V),Ka=an==='HCl'?1e7:1.8e-5;return-bisect(lh=>{const h=Math.pow(10,lh);return h+Na-KW/h-Ca*Ka/(Ka+h)},-15,1)}
const IND={ff:{n:'Fenolftalein',lo:8.2,hi:10,a:'#e6e6ea',b:'#d83a9b',aa:.1,ab:.7},btb:{n:'Bromtymolblått',lo:6,hi:7.6,a:'#e3c53a',b:'#2f6fd6',aa:.6,ab:.65},mo:{n:'Metyloransje',lo:3.1,hi:4.4,a:'#d8342b',b:'#f0b43a',aa:.65,ab:.6}};
const icol=(k,ph)=>{const I=IND[k],t=clamp((ph-I.lo)/(I.hi-I.lo),0,1);return mix(I.a,I.b,t,lerp(I.aa,I.ab,t))};
M({id:'ki-titrering',s:'ki',c:['KJ1','KJ2'],title:'Titrerkurver, indikatorer og buffer',short:'Titrering og buffer',kw:'titrering titrerkurve ekvivalenspunkt indikator buffer halvtitrerpunkt pka sterk syre svak syre natriumhydroksid henderson-hasselbalch',
lead:'Vi drypper 0,10 mol/L NaOH ned i 25 mL syre. pH endrer seg sakte, helt til nesten all syren er nøytralisert. Da kommer et bratt sprang rundt ekvivalenspunktet.',
hint:'Dra i grafen for å velge volum.',
controls:[{id:'an',type:'seg',label:'Syre i kolben',value:'HAc',options:[['HCl','Saltsyre (sterk)'],['HAc','Eddiksyre (svak)']]},{id:'ind',type:'seg',label:'Indikator',value:'ff',options:Object.entries(IND).map(([k,v])=>[k,v.n])},{type:'btns',items:[['Start på nytt',S=>{S.V=0;S.hold=0}]]}],
tex:['n_{\\text{syre}}=n_{\\text{base}}\\ \\text{ved ekvivalens}','\\text{pH}=\\text{p}K_a+\\lg\\frac{[\\text{A}^-]}{[\\text{HA}]}','\\text{halvtitrerpunktet: pH}=\\text{p}K_a'],
about:['Ved <strong>ekvivalenspunktet</strong> er stoffmengden base lik stoffmengden syre. For en sterk syre er pH da 7. For eddiksyre er pH over 7, fordi acetationet er en svak base.','For den svake syren dannes en <strong>buffer</strong> av eddiksyre og acetat. I bufferområdet (turkis) endrer pH seg lite selv om vi tilsetter base.','Halvveis til ekvivalens er det like mye syre som korresponderende base. Da er pH lik p$K_a$ = 4,74.','En god indikator skifter farge innenfor det bratte spranget. Prøv metyloransje på eddiksyre og se hvorfor den er et dårlig valg.'],
tasks:['Hvor mange mL NaOH trengs for å nå ekvivalens? Vis ved regning.','Hvorfor passer fenolftalein for eddiksyre, men ikke metyloransje?','Les av pKₐ for eddiksyre fra kurven.','Hva er en buffer, og hvorfor er blod en buffer?'],
init(S){S.V=0;S.hold=0;S.key='';S.cur=null},
update(S,dt){if(Stage.drag&&S===Stage.S)return;if(S.V<50)S.V=Math.min(50,S.V+dt*1.6);else{S.hold+=dt;if(S.hold>2.5){S.V=0;S.hold=0}}},
draw(S){const an=S.p.an;if(S.key!==an){S.cur=[];for(let i=0;i<=500;i++)S.cur.push([i/10,phT(an,i/10)]);S.key=an}const V=S.V,ph=phT(an,V);const[bl,br]=split(S,.3,{g:30});
 const bx=bl.l+bl.w/2,tt=bl.t,th=bl.h*.5,tw2=Math.max(14,bl.w*.1);rct(bx-tw2/2,tt,tw2,th,A(C.fg,.6),null,1.5);const yV=v=>tt+th*(v/50);rct(bx-tw2/2+2,yV(V),tw2-4,th-(yV(V)-tt),null,A(C.blue,.25));for(let v=0;v<=50;v+=10){ln(bx-tw2/2,yV(v),bx-tw2/2+6,yV(v),C.fg2,1);T(String(v),bx-tw2/2-4,yV(v),{a:'right',f:'n',s:10,c:C.fg3})}
 T('NaOH 0,10 mol/L',bx+tw2,tt+8,{s:11,c:C.fg3});ln(bx,tt+th,bx,tt+th+12,A(C.fg,.6),2);rct(bx-8,tt+th+4,16,5,null,C.fg2);
 const fy=tt+th+30,fh=bl.h-(fy-bl.t)-6,fw=Math.min(bl.w*.8,fh*1.1);const neck=fw*.22;const fl=[[bx-neck/2,fy],[bx+neck/2,fy],[bx+neck/2,fy+fh*.3],[bx+fw/2,fy+fh],[bx-fw/2,fy+fh],[bx-neck/2,fy+fh*.3]];
 const lv=fy+fh*.55,wf=(y)=>neck/2+(fw/2-neck/2)*clamp((y-(fy+fh*.3))/(fh*.7),0,1);poly([[bx-wf(lv),lv],[bx+wf(lv),lv],[bx+fw/2,fy+fh],[bx-fw/2,fy+fh]],null,icol(S.p.ind,ph));poly(fl,A(C.fg,.6),null,2);
 if(V<50&&!(Stage.drag&&S===Stage.S)){const k=(S.t*3)%1;dot(bx,lerp(tt+th+14,lv,k),3,A(C.blue,.7))}T(IND[S.p.ind].n,bx,fy+fh+14,{a:'center',s:11.5,c:C.fg3});
 const P=Plane(0,50,0,14,{l:br.l+26,t:br.t,w:br.w-26,h:br.h-14});S.P=P;P.grid(5,{sy:1,minor:false,alpha:.1});P.axes({xs:5,ys:2,xl:'V NaOH (mL)',yl:'pH',ls:14,x0:true,y0:true});
 const I=IND[S.p.ind];for(let k=0;k<20;k++){const p0=I.lo+(I.hi-I.lo)*k/20;rct(P.l,P.Y(p0+(I.hi-I.lo)/20),P.w,P.Y(p0)-P.Y(p0+(I.hi-I.lo)/20)+.5,null,A(rgbToHex(icol(S.p.ind,p0+.01)),.12))}T('omslagsområde',P.l+P.w-6,P.Y(I.hi)-8,{a:'right',s:11,c:C.fg3});
 if(an==='HAc'){rct(P.X(2.5),P.t,P.X(22.5)-P.X(2.5),P.h,null,A(C.teal,.07));T('bufferområde',P.X(12.5),P.t+12,{a:'center',s:11.5,c:C.teal});dot(P.X(12.5),P.Y(4.74),5,C.teal);T('pH = pKₐ = 4,74',P.X(12.5)+8,P.Y(4.74)+16,{s:11.5,c:C.teal})}
 ln(P.X(25),P.t+20,P.X(25),P.Y(0),A(C.fg,.35),1.2,[5,5]);const pe=phT(an,25);dot(P.X(25),P.Y(pe),5,C.yellow);T(`ekvivalens: pH = ${nf(pe,2)}`,P.X(25)+8,P.Y(pe),{s:11.5,c:C.yellow,bg:A(C.stage,.75)});
 pth(S.cur.map(q=>P.pt(...q)),A(C.blue,.25),2);pth(S.cur.filter(q=>q[0]<=V).map(q=>P.pt(...q)),C.blue,3.2);dot(P.X(V),P.Y(ph),6,C.fg)},
pick(S,x,y){const P=S.P;if(P&&P.in(x,y))return{move:mx=>{S.V=clamp(P.ix(mx),0,50);S.hold=0}}},
readout(S){const ph=phT(S.p.an,S.V);const r=[['V',nf(S.V,1)+' mL'],['pH',nf(ph,2)]];if(S.p.an==='HAc'&&S.V>0&&S.V<25)r.push(['[A⁻]/[HA]',nf(S.V/(25-S.V),2),'teal']);return r}
});
function rgbToHex(c){const[r,g,b]=rgbOf(c);return'#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('')}
}

/* ---------- Reaksjonsfart ---------- */
{
const R_=8.314e-3;
const pReact=S=>Math.exp(-(S.p.Ea*(S.p.kat?.6:1))/(R_*S.p.T)*.22);
M({id:'ki-fart',s:'ki',c:['KJ1','KJ2'],title:'Reaksjonsfart, aktiveringsenergi og katalysatorer',short:'Reaksjonsfart',kw:'reaksjonsfart kollisjonsteori aktiveringsenergi katalysator temperatur entalpi energidiagram eksoterm endoterm maxwell-boltzmann',
lead:'Molekyler reagerer bare når de kolliderer hardt nok. Høyere temperatur gir flere harde støt. En katalysator senker energibarrieren, slik at flere støt fører til reaksjon.',
controls:[{id:'T',label:'Temperatur <i>T</i>',min:200,max:800,step:10,value:400,unit:'K'},{id:'Ea',label:'Aktiveringsenergi <i>E</i>ₐ',min:20,max:100,step:1,value:55,unit:'kJ/mol'},{id:'kat',type:'check',label:'Tilsett katalysator',value:false},{id:'dh',type:'seg',label:'Reaksjonen er',value:'exo',options:[['exo','Eksoterm (ΔH < 0)'],['endo','Endoterm (ΔH > 0)']]},{type:'btns',items:[['Fyll på',S=>MOD['ki-fart'].fill(S,24)],['Start på nytt',S=>MOD['ki-fart'].init(S)]]}],
tex:['\\text{fart}\\propto\\text{antall støt med }E\\ge E_a','\\Delta H=H_{\\text{produkter}}-H_{\\text{reaktanter}}'],
about:['Blå og gule partikler kan reagere og danne grønne. Bare en liten del av støtene har nok energi. Den andelen er det skraverte området under fordelingskurven nederst.','Øker du temperaturen, flytter fordelingen seg mot høyere energi, og andelen over $E_a$ vokser mye. Derfor går de fleste reaksjoner mye fortere når det blir varmere.','En <strong>katalysator</strong> gir en annen reaksjonsvei med lavere aktiveringsenergi (stiplet). Den brukes ikke opp og endrer ikke $\\Delta H$.','Energidiagrammet viser entalpien til reaktanter og produkter. Ved eksoterme reaksjoner frigjøres energi.'],
tasks:['Hvordan endrer reaksjonsfarten seg når temperaturen øker fra 300 K til 400 K?','Hvorfor oppbevarer vi mat i kjøleskap?','Slå på katalysatoren. Hva skjer med ΔH? Og med farten?','Gi tre eksempler på katalysatorer i hverdagen eller i kroppen.'],
init(S){S.ps=[];S.rx=[];S.tot=0;this.fill(S,36)},
fill(S,n){const sd=.32*Math.sqrt(S.p.T/400);for(let i=0;i<n;i++)for(const t of['A','B'])if(S.ps.filter(p=>p.t===t).length<60)S.ps.push({t,x:rnd(.05,.95),y:rnd(.05,.95),vx:gauss()*sd,vy:gauss()*sd})},
update(S,dt){const sd=.32*Math.sqrt(S.p.T/400);const ps=S.ps;let ke=0;ps.forEach(p=>ke+=p.vx*p.vx+p.vy*p.vy);const cur=Math.sqrt(ke/(2*ps.length))||sd;const f=1+(sd/cur-1)*Math.min(1,dt*2);ps.forEach(p=>{p.vx*=f;p.vy*=f;p.x+=p.vx*dt;p.y+=p.vy*dt;const r=p.t==='C'?.026:.018;if(p.x<r){p.x=r;p.vx=Math.abs(p.vx)}if(p.x>1-r){p.x=1-r;p.vx=-Math.abs(p.vx)}if(p.y<r){p.y=r;p.vy=Math.abs(p.vy)}if(p.y>1-r){p.y=1-r;p.vy=-Math.abs(p.vy)}});
 const P_=pReact(S);for(let i=0;i<ps.length;i++){const a=ps[i];if(a.dead)continue;for(let j=i+1;j<ps.length;j++){const b=ps[j];if(b.dead)continue;const ra=a.t==='C'?.026:.018,rb=b.t==='C'?.026:.018;const dx=b.x-a.x,dy=b.y-a.y,d2=dx*dx+dy*dy;if(d2<(ra+rb)**2&&d2>1e-12){const d=Math.sqrt(d2),nx=dx/d,ny=dy/d,rv=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;if(rv<0){if(((a.t==='A'&&b.t==='B')||(a.t==='B'&&b.t==='A'))&&Math.random()<P_){a.dead=b.dead=true;S.ps.push({t:'C',x:(a.x+b.x)/2,y:(a.y+b.y)/2,vx:(a.vx+b.vx)/2,vy:(a.vy+b.vy)/2,born:S.t});S.rx.push(S.t);S.tot++;break}a.vx+=rv*nx;a.vy+=rv*ny;b.vx-=rv*nx;b.vy-=rv*ny}}}}
 S.ps=S.ps.filter(p=>!p.dead);while(S.rx.length&&S.rx[0]<S.t-3)S.rx.shift()},
draw(S){const[bl,br]=split(S,.5,{g:30});const sz=Math.min(bl.w,bl.h),bx=bl.l+(bl.w-sz)/2,by=bl.t+(bl.h-sz)/2;rct(bx,by,sz,sz,A(C.fg,.5),A(C.fg,.02),1.5);
 S.ps.forEach(p=>{const x=bx+p.x*sz,y=by+(1-p.y)*sz;if(p.t==='C'){const fl=p.born!==undefined?clamp(1-(S.t-p.born)/.5,0,1):0;if(fl>0)glow(x,y,26,C.yellow,fl*.8);dot(x-4,y,sz*.016,C.green);dot(x+4,y,sz*.016,C.teal)}else dot(x,y,sz*.016,p.t==='A'?C.blue:C.yellow)});
 const[e1,e2]=rows(br,[1,1],34);const dH=S.p.dh==='exo'?-40:30,Ea=S.v.Ea,Ek=Ea*.6;const P=Plane(0,1,Math.min(dH,0)-15,105,e1);lab(e1,'Energidiagram');
 const prof=(x,ea)=>{const s=x<.3?0:x>.7?1:(1-Math.cos(PI*(x-.3)/.4))/2;return dH*s+(ea-dH/2)*Math.exp(-(((x-.5)/.13)**2))};P.fn(x=>prof(x,Ea),C.fg,2.8,{prog:1});if(S.p.kat)P.fn(x=>prof(x,Ek),C.green,2.2,{dash:[6,5],prog:1});
 const pk=prof(.5,Ea);arr(P.X(.42),P.Y(0),P.X(.42),P.Y(pk),C.red,2,8);T('Eₐ',P.X(.42)-8,P.Y(pk/2),{a:'right',f:'m',s:16,c:C.red});arr(P.X(.88),P.Y(0),P.X(.88),P.Y(dH),C.yellow,2,8);T('ΔH',P.X(.88)+8,P.Y(dH/2),{f:'m',s:16,c:C.yellow});ln(P.X(.05),P.Y(0),P.X(.95),P.Y(0),A(C.fg,.3),1,[3,4]);T('reaktanter',P.X(.12),P.Y(0)-10,{a:'center',s:11,c:C.fg3});T('produkter',P.X(.85),P.Y(dH)+(dH<0?12:-10),{a:'center',s:11,c:C.fg3});
 const kT=R_*S.p.T/.22,Emax=150;const fE=E=>2/Math.sqrt(PI)*Math.pow(kT,-1.5)*Math.sqrt(E)*Math.exp(-E/kT);let fm=0;for(let i=1;i<=100;i++)fm=Math.max(fm,fE(Emax*i/100));const Q=Plane(0,Emax,0,fm*1.25,e2);Q.axes({xs:25,y:false,xl:'E (kJ/mol)',ls:13,x0:true});lab(e2,'Energifordeling i støtene');
 const ea=S.p.Ea*(S.p.kat?.6:1);Q.area(fE,ea,Emax,A(C.red,.35));Q.fn(fE,C.fg,2.4,{prog:1});ln(Q.X(ea),Q.t,Q.X(ea),Q.Y(0),C.red,1.6);T('Eₐ',Q.X(ea)+6,Q.t+10,{f:'m',s:15,c:C.red});
 const kT0=R_*300/.22;Q.fn(E=>2/Math.sqrt(PI)*Math.pow(kT0,-1.5)*Math.sqrt(E)*Math.exp(-E/kT0),A(C.blue,.5),1.4,{dash:[4,4],prog:1});T('stiplet: 300 K',Q.l+Q.w,Q.t+10,{a:'right',s:11,c:C.blue})},
readout(S){const kT=R_*S.p.T/.22,ea=S.p.Ea*(S.p.kat?.6:1);const fr=1-simpson(E=>2/Math.sqrt(PI)*Math.pow(kT,-1.5)*Math.sqrt(E)*Math.exp(-E/kT),1e-6,ea,400);return[['reaksjoner',S.tot,'green'],['fart',nf(S.rx.length/3,1)+' per s'],['A igjen',S.ps.filter(p=>p.t==='A').length,'blue'],['andel støt over Eₐ',nf(100*clamp(fr,0,1),2)+' %','red']]}
});
}

/* ---------- Kjemisk likevekt ---------- */
{
const dH=-57200,Rg=8.314,K298=.011,kb=.5;
const Kof=T=>K298*Math.exp(-dH/Rg*(1/T-1/298));
M({id:'ki-likevekt',s:'ki',c:['KJ1','KJ2'],title:'Kjemisk likevekt og Le Châteliers prinsipp',short:'Likevekt',kw:'likevekt likevektskonstant massevirkningsloven reaksjonskvotient le chatelier no2 n2o4 temperatur trykk konsentrasjon',
lead:'2 NO₂ (brun) ⇌ N₂O₄ (fargeløs). Reaksjonen går begge veier hele tiden. Ved likevekt går den like fort begge veier. Forstyrr likevekten og se systemet motvirke endringen.',
controls:[{id:'T',label:'Temperatur <i>T</i>',min:250,max:400,step:1,value:298,unit:'K'},{id:'V',label:'Volum <i>V</i>',min:.5,max:2,step:.05,value:1,unit:'L',d:2},{type:'btns',items:[['Tilsett NO₂',S=>MOD['ki-likevekt'].add(S,30,'A')],['Fjern N₂O₄',S=>{let k=0;S.ps=S.ps.filter(p=>!(p.t==='B'&&k++%2===0));S.mk.push([S.t,'−N₂O₄'])}],['Start på nytt',S=>MOD['ki-likevekt'].init(S)]]}],
tex:['2\\,\\text{NO}_2 \\rightleftharpoons \\text{N}_2\\text{O}_4,\\qquad \\Delta H=-57\\ \\text{kJ}','K_c=\\frac{[\\text{N}_2\\text{O}_4]}{[\\text{NO}_2]^2}','Q<K\\Rightarrow\\text{mot høyre},\\qquad Q>K\\Rightarrow\\text{mot venstre}'],
about:['Fargen i beholderen viser hvor mye brunt NO₂ det er. Det er det samme du ser hvis du varmer eller kjøler et glassrør med denne gassblandingen.','Reaksjonen mot høyre er <strong>eksoterm</strong>. Øker du temperaturen, forskyves likevekten mot venstre (mer brun gass), og $K$ blir mindre.','Mindre volum gir høyere trykk. Likevekten forskyves mot siden med færrest gassmolekyler, altså mot N₂O₄.','Reaksjonskvotienten $Q$ regnes ut med de konsentrasjonene som er nå. Systemet endrer seg til $Q=K$.'],
tasks:['Varm opp systemet. Forklar med Le Châteliers prinsipp hvorfor gassen blir brunere.','Halver volumet. Hvilken vei forskyves likevekten? Hvorfor?','Tilsett NO₂. Hva skjer med Q rett etterpå, og hva skjer etterpå?','Endrer en katalysator likevekten? Begrunn.'],
init(S){S.ps=[];S.hist=[];S.mk=[];S.lastT=S.p.T;S.lastV=S.p.V;this.add(S,140,'A',true)},
add(S,n,t,quiet){const W=S.p.V/2;for(let i=0;i<n;i++)S.ps.push({t,x:rnd(.03,W-.03),y:rnd(.03,.97),vx:gauss()*.2,vy:gauss()*.2});if(!quiet)S.mk.push([S.t,t==='A'?'+NO₂':''])},
update(S,dt){const V=S.p.V,W=V/2;if(Math.abs(S.p.T-S.lastT)>4){S.mk.push([S.t,S.p.T>S.lastT?'varme':'kulde']);S.lastT=S.p.T}if(Math.abs(V-S.lastV)>.1){S.mk.push([S.t,V<S.lastV?'mindre V':'større V']);S.lastV=V}
 S.ps.forEach(p=>{p.vx+=gauss()*dt*.5;p.vy+=gauss()*dt*.5;const s=Math.hypot(p.vx,p.vy)||1,tg=.25*Math.sqrt(S.p.T/298)*(p.t==='B'?.7:1);p.vx*=tg/s;p.vy*=tg/s;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.x<.02){p.x=.02;p.vx=Math.abs(p.vx)}if(p.x>W-.02){p.x=W-.02;p.vx=-Math.abs(p.vx)}if(p.y<.02){p.y=.02;p.vy=Math.abs(p.vy)}if(p.y>.98){p.y=.98;p.vy=-Math.abs(p.vy)}});
 const nA=S.ps.filter(p=>p.t==='A').length,nB=S.ps.length-nA;const K=Kof(S.p.T);const nf_=Math.min(poisson(K*kb*nA*(nA-1)/V*dt),Math.floor(nA/2)),nb_=Math.min(poisson(kb*nB*dt),nB);
 for(let i=0;i<nf_;i++){const As=S.ps.filter(p=>p.t==='A');if(As.length<2)break;const a=choice(As);let best=null,bd=1e9;for(const b of As){if(b===a)continue;const d=(a.x-b.x)**2+(a.y-b.y)**2;if(d<bd){bd=d;best=b}}a.t='B';a.x=(a.x+best.x)/2;a.y=(a.y+best.y)/2;a.fl=S.t;S.ps.splice(S.ps.indexOf(best),1)}
 for(let i=0;i<nb_;i++){const Bs=S.ps.filter(p=>p.t==='B');if(!Bs.length)break;const b=choice(Bs);b.t='A';b.fl=S.t;S.ps.push({t:'A',x:clamp(b.x+.02,.02,W-.02),y:clamp(b.y+.02,.02,.98),vx:-b.vx,vy:-b.vy,fl:S.t})}
 if(S.hist.length===0||S.t-S.hist[S.hist.length-1][0]>.1){S.hist.push([S.t,nA/V/100,nB/V/100]);while(S.hist.length&&S.hist[0][0]<S.t-40)S.hist.shift();while(S.mk.length&&S.mk[0][0]<S.t-40)S.mk.shift()}},
draw(S){const V=S.v.V,W=V/2;const[bl,br]=split(S,.42,{g:30});const sz=Math.min(bl.w,bl.h*.9),bx=bl.l+(bl.w-sz)/2,by=bl.t+(bl.h-sz)/2;const nA=S.ps.filter(p=>p.t==='A').length,nB=S.ps.length-nA;
 rct(bx,by,sz,sz,A(C.fg,.15),null,1);rct(bx,by,sz*W,sz,A(C.fg,.7),mix('#2a1608','#a0521e',clamp(nA/V/180,0,1),clamp(.15+nA/V/220,0,.75)),2);rct(bx+sz*W,by-6,8,sz+12,null,C.fg2);
 const br_=Math.max(2.6,sz*.011),brown='#c0682a';S.ps.forEach(p=>{const x=bx+p.x*sz,y=by+(1-p.y)*sz;const fl=p.fl!==undefined?clamp(1-(S.t-p.fl)/.4,0,1):0;if(fl>0)glow(x,y,14,C.yellow,fl*.6);if(p.t==='A')dot(x,y,br_*1.15,brown);else{dot(x-br_*.8,y,br_,'#d8dde2');dot(x+br_*.8,y,br_,'#d8dde2')}});
 T(`T = ${nf(S.p.T,0)} K`,bx,by-12,{s:12,f:'n',c:C.fg2});T(`V = ${nf(S.p.V,2)} L`,bx+sz,by-12,{a:'right',s:12,f:'n',c:C.fg2});
 const[g1,g2]=rows(br,[2,1],34);const H=S.hist;const t0=Math.max(0,S.t-40);const mx=Math.max(2,...H.map(h=>Math.max(h[1],h[2])))*1.15;const P=Plane(t0,t0+40,0,mx,g1);P.axes({xs:10,y:false,x:true,xf:x=>'',x0:true});lab(g1,'Konsentrasjon (mol/L)');
 S.mk.forEach(([t,l])=>{ln(P.X(t),P.t,P.X(t),P.Y(0),A(C.fg,.3),1,[3,4]);T(l,P.X(t)+4,P.t+10,{s:10.5,c:C.fg3})});P.clip(()=>{pth(H.map(h=>P.pt(h[0],h[1])),brown,2.6);pth(H.map(h=>P.pt(h[0],h[2])),'#d8dde2',2.6)});if(H.length){const last=H[H.length-1];T('[NO₂]',P.X(last[0])+6,P.Y(last[1]),{s:12,c:brown});T('[N₂O₄]',P.X(last[0])+6,P.Y(last[2]),{s:12,c:'#d8dde2'})}
 const Q=nA>0?nB*V/(nA*nA):Infinity,K=Kof(S.p.T);const L=Math.log10;const qx=(v)=>g2.l+g2.w*clamp((L(v)+3)/4,0,1);ln(g2.l,g2.t+g2.h/2,g2.l+g2.w,g2.t+g2.h/2,A(C.fg,.4),1.2);[-3,-2,-1,0,1].forEach(e=>{const x=g2.l+g2.w*(e+3)/4;ln(x,g2.t+g2.h/2-4,x,g2.t+g2.h/2+4,A(C.fg,.4),1);T('10'+sup(e),x,g2.t+g2.h/2+14,{a:'center',f:'n',s:10,c:C.fg3})});
 poly([[qx(K),g2.t+g2.h/2-2],[qx(K)-7,g2.t+g2.h/2-14],[qx(K)+7,g2.t+g2.h/2-14]],null,C.yellow);T('K',qx(K),g2.t+g2.h/2-22,{a:'center',f:'m',s:15,c:C.yellow});if(isFinite(Q)){dot(qx(Q),g2.t+g2.h/2,6,C.fg);T('Q',qx(Q),g2.t+g2.h/2+30,{a:'center',f:'m',s:15,c:C.fg})}
 const r=Q/K;T(Math.abs(L(r))<.12?'Q ≈ K: likevekt':r<1?'Q < K: reaksjonen går mot høyre':'Q > K: reaksjonen går mot venstre',g2.l,g2.t-6,{s:13,c:C.fg})},
readout(S){const V=S.p.V,nA=S.ps.filter(p=>p.t==='A').length,nB=S.ps.length-nA;const Q=nA?nB*V/(nA*nA)*100:NaN,K=Kof(S.p.T)*100;return[['[NO₂]',nf(nA/V/100,2)+' mol/L'],['[N₂O₄]',nf(nB/V/100,2)+' mol/L'],['Q',nf(Q,2)],['K',nf(K,2),'yellow']]}
});
}

/* ---------- Entalpi, entropi og Gibbs fri energi ---------- */
M({id:'ki-gibbs',s:'ki',c:['KJ2'],title:'Entalpi, entropi og Gibbs fri energi',short:'Gibbs fri energi',kw:'gibbs fri energi entalpi entropi spontan reaksjon temperatur termodynamikk',
lead:'Om en reaksjon går av seg selv, avgjøres av både entalpien (varme) og entropien (spredning). Gibbs fri energi kombinerer dem: reaksjonen er spontan når $\\Delta G<0$.',
controls:[{id:'dH',label:'Δ<i>H</i>',min:-900,max:400,step:1,value:-92,unit:'kJ/mol'},{id:'dS',label:'Δ<i>S</i>',min:-300,max:300,step:1,value:-199,unit:'J/(mol·K)'},{id:'T',label:'Temperatur <i>T</i>',min:0,max:1500,step:5,value:298,unit:'K'},{type:'btns',items:[['Ammoniakksyntese',S=>{setP('dH',-92,S);setP('dS',-199,S)}],['Is smelter',S=>{setP('dH',6,S);setP('dS',22,S)}],['Kalkbrenning',S=>{setP('dH',178,S);setP('dS',161,S)}],['Metan brenner',S=>{setP('dH',-890,S);setP('dS',-243,S)}]]}],
tex:['\\Delta G=\\Delta H-T\\,\\Delta S','\\Delta G<0\\ \\text{spontan},\\quad \\Delta G=0\\ \\text{likevekt}','T_{\\text{omslag}}=\\frac{\\Delta H}{\\Delta S}'],
about:['Grafen viser $\\Delta G$ som funksjon av temperaturen. Det er en rett linje med stigningstall $-\\Delta S$.','Der linjen er under null (grønt område), går reaksjonen av seg selv. Krysser linjen null, skifter reaksjonen retning ved omslagstemperaturen.','Tabellen viser de fire mulighetene. Is som smelter har både $\\Delta H>0$ og $\\Delta S>0$, og blir spontan over 273 K.','Spontan betyr ikke rask. Forbrenning av metan er spontan, men trenger en gnist for å komme i gang.'],
tasks:['Vis med tallene at is smelter over 0 °C og fryser under.','Ved hvilken temperatur blir kalkbrenning (CaCO₃ → CaO + CO₂) spontan?','Hvorfor lager man ammoniakk ved lav temperatur hvis man bare ser på likevekten? Hvorfor brukes likevel ca. 700 K?','Når en løsning av salt i vann avkjøles, kan reaksjonen likevel være spontan. Hvordan?'],
draw(S){const v=S.v,p=S.p;const g=T=>v.dH-T*v.dS/1000;const g0=g(0),g1=g(1500);const lo=Math.min(g0,g1,0),hi=Math.max(g0,g1,0),pd=Math.max(20,(hi-lo)*.15);const b=pad(S,34,26,34);b.l+=20;b.w-=20;const P=Plane(0,1500,lo-pd,hi+pd,b);
 P.clip(()=>{rct(P.l,P.Y(0),P.w,P.t+P.h-P.Y(0),null,A(C.green,.09));rct(P.l,P.t,P.w,P.Y(0)-P.t,null,A(C.red,.06))});T('spontan (ΔG < 0)',P.l+P.w-8,P.t+P.h-10,{a:'right',s:12,c:C.green});T('ikke spontan (ΔG > 0)',P.l+8,P.t+10,{s:12,c:C.red});
 const ys=niceStep((hi-lo+2*pd)/6);P.grid(250,{sy:ys,minor:false,alpha:.08});P.axes({xs:250,ys,xl:'T (K)',yl:'ΔG (kJ/mol)',ls:14,y0:true});P.fn(g,C.yellow,3.2);
 if(Math.abs(v.dS)>.5){const Ts=v.dH/v.dS*1000;if(Ts>0&&Ts<1500){dot(P.X(Ts),P.Y(0),6,C.fg);T(`omslag: ${nf(Ts,0)} K`,P.X(Ts),P.Y(0)+(v.dS>0?18:-16),{a:'center',f:'n',s:12,c:C.fg,bg:A(C.stage,.75)})}}
 ln(P.X(v.T),P.t,P.X(v.T),P.t+P.h,A(C.fg,.4),1.2);dot(P.X(v.T),P.Y(g(v.T)),6,C.yellow);
 const tx=P.l+P.w-250,ty=P.t+6,cw=118,ch=40;const cells=[[[-1,1],'alltid spontan'],[[-1,-1],'spontan ved lav T'],[[1,1],'spontan ved høy T'],[[1,-1],'aldri spontan']];T('ΔS > 0',tx+cw/2+12,ty+8,{a:'center',s:11,c:C.fg3});T('ΔS < 0',tx+cw*1.5+16,ty+8,{a:'center',s:11,c:C.fg3});
 cells.forEach(([[h,s],l],i)=>{const cx=tx+12+(s>0?0:cw+4),cy=ty+18+(h<0?0:ch+4);const on=Math.sign(p.dH||1)===h&&Math.sign(p.dS||1)===s;rr(cx,cy,cw,ch,4,on?C.yellow:A(C.fg,.2),on?A(C.yellow,.12):A(C.stage,.85),on?1.8:1);T(l,cx+cw/2,cy+ch/2,{a:'center',s:11.5,c:on?C.yellow:C.fg2})});T('ΔH < 0',tx+4,ty+18+ch/2,{a:'right',s:11,c:C.fg3});T('ΔH > 0',tx+4,ty+18+ch*1.5+4,{a:'right',s:11,c:C.fg3})},
readout(S){const p=S.p,G=p.dH-p.T*p.dS/1000;const r=[['ΔG',nf(G,1)+' kJ/mol',G<0?'green':'red'],['T',nf(p.T,0)+' K = '+nf(p.T-273,0)+' °C']];if(Math.abs(p.dS)>.5&&p.dH/p.dS>0)r.push(['T omslag',nf(p.dH/p.dS*1000,0)+' K','yellow']);return r},
live(S){const p=S.p;return`\\Delta G=${tn(p.dH,0)}-${tn(p.T,0)}\\cdot(${tn(p.dS/1000,3)})=${tn(p.dH-p.T*p.dS/1000,1)}\\ \\text{kJ/mol}`}
});

/* ---------- Galvanisk celle ---------- */
{
const MT={Mg:['Magnesium',-2.37,2,'#c9ced3',null],Al:['Aluminium',-1.66,3,'#b8c2cc',null],Zn:['Sink',-.76,2,'#9fa8b2',null],Fe:['Jern',-.44,2,'#7b8088','#9ccf7a'],Ni:['Nikkel',-.25,2,'#a7a28f','#5fbf6a'],Pb:['Bly',-.13,2,'#6f7782',null],Cu:['Kobber',.34,2,'#c87533','#3a7bd5'],Ag:['Sølv',.80,1,'#d9dde1',null]};
const ion=k=>k+(MT[k][2]>1?sup(MT[k][2]):'')+'⁺';
M({id:'ki-redoks',s:'ki',c:['KJ2'],title:'Galvaniske celler og spenningsrekka',short:'Galvanisk celle',kw:'redoks oksidasjon reduksjon galvanisk celle batteri anode katode spenningsrekke standard reduksjonspotensial saltbro elektroner',
lead:'Metallet som står lavest i spenningsrekka gir fra seg elektroner (oksideres). Elektronene går gjennom ledningen til det andre metallet, der ioner tar dem opp (reduseres). Spenningen er forskjellen i potensial.',
controls:[{id:'a',type:'sel',label:'Venstre elektrode',value:'Zn',options:Object.entries(MT).map(([k,v])=>[k,`${v[0]} (E° = ${nf(v[1],2)} V)`])},{id:'b',type:'sel',label:'Høyre elektrode',value:'Cu',options:Object.entries(MT).map(([k,v])=>[k,`${v[0]} (E° = ${nf(v[1],2)} V)`])},{type:'btns',items:[['Start på nytt',S=>{S.t=0}]]}],
tex:['E^\\circ_{\\text{celle}}=E^\\circ_{\\text{katode}}-E^\\circ_{\\text{anode}}','\\text{Anode: oksidasjon}\\quad\\text{Katode: reduksjon}'],
about:['Elektronene (gule) går gjennom ledningen fra anoden til katoden. Anoden løses opp, og det felles ut metall på katoden.','<strong>Saltbroen</strong> lukker kretsen. Negative ioner vandrer mot anoden og positive mot katoden, slik at løsningene forblir nøytrale.','Jo lenger fra hverandre metallene står i spenningsrekka, jo større blir spenningen. Et Daniell-element (sink og kobber) gir 1,10 V.','Spenningsrekka nederst viser standard reduksjonspotensialer målt mot hydrogenelektroden.'],
tasks:['Regn ut spenningen i en celle med magnesium og sølv.','Bytt om venstre og høyre elektrode. Hva skjer med elektronstrømmen?','Hvilket metall er anode når du kobler jern og nikkel? Hvorfor?','Hvordan kan sink beskytte et stålskip mot korrosjon (offeranode)?'],
draw(S){const a=S.p.a,b=S.p.b,Ea=MT[a][1],Eb=MT[b][1];const same=a===b;const anodeLeft=Ea<Eb;const E=Math.abs(Ea-Eb);const[top,strip]=rows(pad(S,24,30,26),[4,1],26);
 const bw=Math.min(top.w*.28,top.h*.55),bh=bw*.85,y0=top.t+top.h-bh-30,xs=[top.l+top.w*.25,top.l+top.w*.75];const sides=[a,b];const tt=Math.min(S.t,60);
 sides.forEach((m,i)=>{const cx=xs[i];const sol=MT[m][4];poly([[cx-bw/2,y0],[cx-bw/2,y0+bh],[cx+bw/2,y0+bh],[cx+bw/2,y0]],A(C.fg,.6),null,2,false);rct(cx-bw/2+2,y0+bh*.3,bw-4,bh*.7-2,null,sol?A(sol,.35):A(C.blue,.08));T(ion(m)+'(aq)',cx+bw*.22,y0+bh*.85,{a:'center',f:'n',s:12,c:C.fg2});
  const isAn=!same&&((i===0)===anodeLeft);const ew=bw*.16*(isAn?1:1+Math.min(.5,tt*.01*(same?0:1))),eh=(bh*1.1)*(isAn?1-Math.min(.25,tt*.005):1);rct(cx-bw*.2-ew/2,y0-bh*.15,ew,eh,A(C.fg,.4),MT[m][3],1);T(m,cx-bw*.2,y0-bh*.15-12,{a:'center',f:'d',s:16,c:C.fg});
  if(!same)T(isAn?'Anode (−): oksidasjon':'Katode (+): reduksjon',cx,y0+bh+18,{a:'center',s:12.5,c:isAn?C.red:C.blue})});
 const bridge=[[xs[0]+bw*.25,y0+bh*.5],[xs[0]+bw*.25,y0-bh*.35],[xs[1]-bw*.25,y0-bh*.35],[xs[1]-bw*.25,y0+bh*.5]];pth(bridge,A(C.fg,.25),14);pth(bridge,A(C.stage,1),9);T('saltbro (KNO₃)',(xs[0]+xs[1])/2,y0-bh*.35-14,{a:'center',s:11,c:C.fg3});
 const wire=[[xs[0]-bw*.2,y0-bh*.15],[xs[0]-bw*.2,top.t+18],[xs[1]-bw*.2,top.t+18],[xs[1]-bw*.2,y0-bh*.15]];pth(wire,A(C.fg,.7),2);const vm=[(xs[0]+xs[1])/2-bw*.2,top.t+18];circ(...vm,27,C.fg,C.stage,2);T(nf(E,2)+' V',vm[0],vm[1]+1,{a:'center',f:'n',s:11,c:C.yellow});
 if(!same){const L=plenW(wire),sp=Math.min(140,E*60);const dir=anodeLeft?1:-1;for(let d=(S.t*sp)%22;d<L;d+=22){const q=atW(wire,dir>0?d:L-d);if(Math.hypot(q[0]-vm[0],q[1]-vm[1])>30)dot(...q,3,C.yellow)}
  const BL=plenW(bridge);for(let k=0;k<6;k++){const u=((S.t*.08+k/6)%1);const qa=atW(bridge,(anodeLeft?1-u:u)*BL);dot(...qa,3,C.blue);const qc=atW(bridge,(anodeLeft?u:1-u)*BL);dot(qc[0],qc[1]+4,3,C.pink)}
  const an=anodeLeft?a:b,ka=anodeLeft?b:a,n1=MT[an][2],n2=MT[ka][2];T(`${an} → ${ion(an)} + ${n1>1?n1:''}e⁻`,xs[anodeLeft?0:1],y0+bh+36,{a:'center',f:'n',s:12.5,c:C.fg});T(`${ion(ka)} + ${n2>1?n2:''}e⁻ → ${ka}`,xs[anodeLeft?1:0],y0+bh+36,{a:'center',f:'n',s:12.5,c:C.fg})}
 else T('Samme metall på begge sider: ingen spenning',(xs[0]+xs[1])/2,y0+bh+40,{a:'center',s:13,c:C.fg2});
 const P=Plane(-2.6,1,0,1,{l:strip.l+30,t:strip.t+10,w:strip.w-60,h:strip.h-20});ln(P.l,P.t+P.h/2,P.l+P.w,P.t+P.h/2,A(C.fg,.5),1.5);T('spenningsrekka (E° i volt)',P.l,P.t-4,{s:11,c:C.fg3});Object.entries(MT).forEach(([k,v],i)=>{const x=P.X(v[1]),on=k===a||k===b;ln(x,P.t+P.h/2-6,x,P.t+P.h/2+6,on?C.yellow:A(C.fg,.5),on?2.4:1.2);T(k,x,P.t+P.h/2+(i%2?-15:16),{a:'center',f:'n',s:11.5,c:on?C.yellow:C.fg2})});T('0',P.X(0),P.t+P.h/2+28,{a:'center',f:'n',s:10,c:C.fg3})},
readout(S){const a=S.p.a,b=S.p.b,Ea=MT[a][1],Eb=MT[b][1];if(a===b)return[['E°',' 0,00 V']];const an=Ea<Eb?a:b,ka=Ea<Eb?b:a;return[['E° celle',nf(Math.abs(Ea-Eb),2)+' V','yellow'],['anode',MT[an][0],'red'],['katode',MT[ka][0],'blue']]},
live(S){const a=S.p.a,b=S.p.b,Ea=MT[a][1],Eb=MT[b][1];const k=Math.max(Ea,Eb),n=Math.min(Ea,Eb);return`E^\\circ_{\\text{celle}}=${tn(k,2)}-(${tn(n,2)})=${tn(k-n,2)}\\ \\text{V}`}
});
function plenW(ps){let L=0;for(let i=1;i<ps.length;i++)L+=Math.hypot(ps[i][0]-ps[i-1][0],ps[i][1]-ps[i-1][1]);return L}
function atW(ps,d){for(let i=1;i<ps.length;i++){const l=Math.hypot(ps[i][0]-ps[i-1][0],ps[i][1]-ps[i-1][1]);if(d<=l){const t=d/l;return[lerp(ps[i-1][0],ps[i][0],t),lerp(ps[i-1][1],ps[i][1],t)]}d-=l}return ps[ps.length-1]}
}

/* ---------- Organisk kjemi ---------- */
{
const PRE=['met','et','prop','but','pent','heks','hept','okt'];
const GR={alkan:'Alkan',alken:'Alken',alkohol:'Alkohol',aldehyd:'Aldehyd',keton:'Keton',syre:'Karboksylsyre',amin:'Amin'};
const BP={alkan:[-162,-89,-42,-1,36,69,98,126],alken:[null,-104,-48,-6,30,63,94,121],alkohol:[65,78,97,118,138,157,176,195],aldehyd:[-19,20,48,75,103,131,153,171],keton:[null,null,56,80,102,127,151,173],syre:[101,118,141,164,186,205,223,239],amin:[-6,17,48,78,104,131,155,180]};
const minN={alken:2,keton:3};
function spec(g,n){switch(g){case'alken':return{n,dbl:0,sub:[]};case'alkohol':return{n,sub:[{c:0,g:'OH',p:'L'}]};case'aldehyd':return{n,sub:[{c:0,g:'O',p:'L'}]};case'keton':return{n,sub:[{c:1,g:'O',p:'U'}]};case'syre':return{n,sub:[{c:0,g:'O',p:'U'},{c:0,g:'OH',p:'L'}]};case'amin':return{n,sub:[{c:0,g:'NH2',p:'L'}]};default:return{n,sub:[]}}}
function name(g,n){const p=PRE[n-1];switch(g){case'alkan':return p+'an';case'alken':return n===2?'eten':n===3?'propen':p+'-1-en';case'alkohol':return n<=2?p+'anol':p+'an-1-ol';case'aldehyd':return p+'anal';case'keton':return n===3?'propanon':n===4?'butanon':p+'an-2-on';case'syre':return p+'ansyre';case'amin':return n<=2?p+'anamin':p+'an-1-amin'}}
const DIR={L:[-1,0],R:[1,0],U:[0,-1],D:[0,1]};const ECOL=()=>({C:C.fg,H:C.fg2,O:C.red,N:C.blue,Cl:C.green});
function build(sp){const at=[],bd=[];const n=sp.n;for(let i=0;i<n;i++)at.push({e:'C',x:i,y:0});for(let i=0;i<n-1;i++)bd.push([i,i+1,sp.dbl===i?2:1]);const used=new Array(n).fill(0).map((_,i)=>(i>0?1:0)+(i<n-1?1:0)+(sp.dbl===i||sp.dbl===i-1?1:0));const taken=new Array(n).fill(0).map(()=>new Set());
 const add=(e,x,y)=>{at.push({e,x,y});return at.length-1};
 (sp.sub||[]).forEach(s=>{const[dx,dy]=DIR[s.p],c=at[s.c];taken[s.c].add(s.p);if(s.g==='O'){const o=add('O',c.x+dx*.9,c.y+dy*.9);bd.push([s.c,o,2]);used[s.c]+=2}else if(s.g==='OH'){const o=add('O',c.x+dx*.9,c.y+dy*.9);bd.push([s.c,o,1]);const h=add('H',c.x+dx*1.6,c.y+dy*1.6);bd.push([o,h,1]);used[s.c]+=1}else if(s.g==='NH2'){const nn=add('N',c.x+dx*.9,c.y+dy*.9);bd.push([s.c,nn,1]);const h1=add('H',c.x+dx*1.6,c.y+dy*1.6);const h2=add('H',c.x+dx*.9+(dx?0:-.7),c.y+dy*.9+(dx?.7:0));bd.push([nn,h1,1],[nn,h2,1]);used[s.c]+=1}else if(s.g==='OCH3'){const o=add('O',c.x+dx*.9,c.y+dy*.9);bd.push([s.c,o,1]);const c2=add('C',c.x+dx*1.8,c.y+dy*1.8);bd.push([o,c2,1]);[[dx,dy],[0,-1],[0,1]].forEach(([ex,ey])=>{const h=add('H',at[c2].x+ex*.7,at[c2].y+ey*.7);bd.push([c2,h,1])});used[s.c]+=1}else{const x_=add(s.g,c.x+dx*.95,c.y+dy*.95);bd.push([s.c,x_,1]);used[s.c]+=1}});
 for(let i=0;i<n;i++){let hN=4-used[i];const opts=['U','D'].concat(i===0?['L']:[]).concat(i===n-1?['R']:[]).filter(p=>!taken[i].has(p));for(const p of opts){if(hN<=0)break;const[dx,dy]=DIR[p];const h=add('H',at[i].x+dx*.72,at[i].y+dy*.72);bd.push([i,h,1]);hN--}}return{at,bd}}
function formula(m){const c={};m.at.forEach(a=>c[a.e]=(c[a.e]||0)+1);return['C','H','Cl','N','O'].filter(e=>c[e]).map(e=>e+(c[e]>1?sub(c[e]):'')).join('')}
function drawMol(m,cx,cy,sc){const xs=m.at.map(a=>a.x),ys=m.at.map(a=>a.y);const mx=(Math.min(...xs)+Math.max(...xs))/2,my=(Math.min(...ys)+Math.max(...ys))/2;const P=a=>[cx+(a.x-mx)*sc,cy+(a.y-my)*sc];const col=ECOL();const fs=Math.max(11,sc*.36);
 m.bd.forEach(([i,j,o])=>{const a=P(m.at[i]),b=P(m.at[j]);const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,g=fs*.62;const a2=[a[0]+ux*g,a[1]+uy*g],b2=[b[0]-ux*g,b[1]-uy*g];if(o===2){const nx=-uy*3,ny=ux*3;ln(a2[0]+nx,a2[1]+ny,b2[0]+nx,b2[1]+ny,A(C.fg,.7),1.8);ln(a2[0]-nx,a2[1]-ny,b2[0]-nx,b2[1]-ny,A(C.fg,.7),1.8)}else ln(...a2,...b2,A(C.fg,.7),1.8)});
 m.at.forEach(a=>{const q=P(a);T(a.e,q[0],q[1]+1,{a:'center',f:'d',s:a.e==='H'?fs*.85:fs,w:500,c:col[a.e]})});const w=(Math.max(...xs)-Math.min(...xs)+1)*sc;return w}
const RXN={alkan:n=>({t:'Substitusjon',r:'+ Cl₂',p:{n,sub:[{c:0,g:'Cl',p:'L'}]},pn:n===1?'klormetan':n===2?'kloretan':'1-klor'+PRE[n-1]+'an',side:'+ HCl'}),
 alken:n=>({t:'Addisjon',r:'+ H₂O',p:n===2?{n,sub:[{c:0,g:'OH',p:'L'}]}:{n,sub:[{c:1,g:'OH',p:'U'}]},pn:n===2?'etanol':PRE[n-1]+'an-2-ol',side:''}),
 alkohol:n=>n>=2?{t:'Eliminasjon',r:'',p:{n,dbl:0,sub:[]},pn:name('alken',n),side:'+ H₂O'}:{t:'Oksidasjon',r:'+ [O]',p:spec('aldehyd',1),pn:'metanal',side:'+ H₂O'},
 aldehyd:n=>({t:'Oksidasjon',r:'+ [O]',p:spec('syre',n),pn:name('syre',n),side:''}),
 keton:n=>({t:'Reduksjon (addisjon av H₂)',r:'+ H₂',p:{n,sub:[{c:1,g:'OH',p:'U'}]},pn:PRE[n-1]+'an-2-ol',side:''}),
 syre:n=>({t:'Kondensasjon (forestring)',r:'+ CH₃OH',p:{n,sub:[{c:0,g:'O',p:'U'},{c:0,g:'OCH3',p:'L'}]},pn:'metyl'+PRE[n-1]+'anoat',side:'+ H₂O',note:'Den motsatte reaksjonen, der esteren spaltes med vann, er hydrolyse.'}),
 amin:n=>({t:'Syre–base',r:'',p:null,pn:'',side:'',note:'Aminer er baser: R–NH₂ + H₂O ⇌ R–NH₃⁺ + OH⁻'})};
M({id:'ki-organisk',s:'ki',c:['KJ1','KJ2'],title:'Organiske stoffer, navn og reaksjonstyper',short:'Organisk kjemi',kw:'organisk kjemi alkan alken alkohol aldehyd keton karboksylsyre amin ester navnsetting funksjonell gruppe homolog rekke kokepunkt addisjon eliminasjon substitusjon hydrolyse',
lead:'Organiske stoffer er bygd av karbonkjeder. Den funksjonelle gruppen bestemmer egenskapene og endelsen i navnet. Se strukturformelen, navnet og hvordan kokepunktet endrer seg med kjedelengden.',
controls:[{id:'g',type:'seg',label:'Stoffklasse',value:'alkohol',options:Object.entries(GR)},{id:'n',label:'Antall karbonatomer',min:1,max:8,step:1,value:2},{id:'rx',type:'check',label:'Vis en typisk reaksjon',value:false}],
tex:['\\text{alkaner: }\\text{C}_n\\text{H}_{2n+2}','\\text{alkener: }\\text{C}_n\\text{H}_{2n}','\\text{alkoholer: }\\text{C}_n\\text{H}_{2n+1}\\text{OH}'],
about:['Stammen i navnet forteller hvor mange karbonatomer det er: met-, et-, prop-, but-, pent-, heks-, hept-, okt-. Endelsen forteller stoffklassen: -an, -en, -ol, -al, -on, -syre, -amin.','Søylene viser kokepunktet. Lengre kjeder gir sterkere van der Waals-krefter og høyere kokepunkt. Alkoholer, syrer og aminer kan danne hydrogenbindinger og koker mye høyere enn alkanen med like mange karbonatomer (grå ramme).','Slå på «Vis en typisk reaksjon» for å se reaksjonstypene addisjon, eliminasjon, substitusjon og kondensasjon.'],
tasks:['Hvorfor er etanol flytende ved romtemperatur når etan er en gass?','Tegn strukturformelen til butan-2-ol. Hvilken stoffklasse og reaksjon gir den?','Hva er forskjellen på et aldehyd og et keton?','Hvilken ester dannes av etansyre og metanol? Hva lukter estere ofte av?'],
draw(S){let g=S.p.g,n=Math.max(Math.round(S.p.n),minN[g]||1);const sp=spec(g,n),m=build(sp);const[top,bot]=rows(pad(S,24,20,24),[2.2,1],30);const nm=name(g,n);
 if(!S.p.rx){const sc=Math.min(top.w/(n+3.2),top.h/4.2,70);drawMol(m,top.l+top.w/2,top.t+top.h*.48,sc);T(nm,top.l,top.t+10,{f:'d',s:24,w:500});T(`${formula(m)}  ·  ${GR[g].toLowerCase()}`,top.l,top.t+38,{f:'n',s:13,c:C.fg2});if(Math.round(S.p.n)<(minN[g]||1))T(`(${GR[g].toLowerCase()}er har minst ${minN[g]} karbonatomer)`,top.l,top.t+60,{s:12,c:C.fg3})}
 else{const R=RXN[g](n);T(R.t,top.l,top.t+10,{f:'d',s:22,w:500,c:C.yellow});const sc=Math.min(top.w/(2*n+9),top.h/4.6,48);const y=top.t+top.h*.52;if(R.p){const x1=top.l+top.w*.24,x2=top.l+top.w*.74;drawMol(m,x1,y,sc);T(R.r,x1+(n+1.6)*sc/2+6,y,{f:'n',s:14,c:C.fg});arr(top.l+top.w*.47,y,top.l+top.w*.55,y,C.fg,2.2,10);const pm=build(R.p);drawMol(pm,x2,y,sc);T(R.side,x2+(n+2)*sc/2,y,{f:'n',s:14,c:C.fg});T(nm,x1,y+sc*1.9,{a:'center',s:13,c:C.fg2});T(R.pn,x2,y+sc*1.9,{a:'center',s:13,c:C.fg2})}else{drawMol(m,top.l+top.w/2,y,sc)}if(R.note)T(R.note,top.l,top.t+top.h-4,{s:12.5,c:C.fg2})}
 const P=Plane(.4,8.6,-200,260,{l:bot.l+34,t:bot.t+8,w:bot.w-34,h:bot.h-12});P.axes({xs:1,ys:100,x0:true,xf:x=>'C'+sub(x),yf:y=>nf(y,0)+' °C'});lab({l:bot.l,t:bot.t+8},'Kokepunkt');
 for(let k=1;k<=8;k++){const a=BP.alkan[k-1],v=BP[g][k-1],w=P.sx*.55;const x=P.X(k)-w/2;if(a!==null)rct(x,Math.min(P.Y(a),P.Y(0)),w,Math.abs(P.Y(a)-P.Y(0)),A(C.fg,.35),null,1);if(v!==null&&g!=='alkan')rct(x+3,Math.min(P.Y(v),P.Y(0)),w-6,Math.abs(P.Y(v)-P.Y(0)),null,A(k===n?C.yellow:C.teal,.75));else if(v!==null)rct(x+3,Math.min(P.Y(v),P.Y(0)),w-6,Math.abs(P.Y(v)-P.Y(0)),null,A(k===n?C.yellow:C.grey,.6))}
 const v=BP[g][n-1];if(v!==null)T(`${nm}: ${v} °C`,P.l+P.w,P.t+6,{a:'right',f:'n',s:12,c:C.yellow})},
readout(S){const g=S.p.g,n=Math.max(Math.round(S.p.n),minN[g]||1);const m=build(spec(g,n));return[['navn',name(g,n)],['formel',formula(m)],['kokepunkt',BP[g][n-1]+' °C','yellow']]}
});
}

/* ---------- Kromatografi ---------- */
{
const DY=[['Blå','#2e6fd1',.25],['Gul','#e6c229',.45],['Rød','#d6334a',.6],['Fiolett','#7b3fb0',.8]];const LANES=[[0,2,3],[0],[1],[2],[3]];
const Rf=(e,p)=>clamp(.05+.9/(1+Math.exp(-7*(e-p))),.03,.96);
M({id:'ki-kromatografi',s:'ki',c:['KJ2'],title:'Papirkromatografi og Rf-verdier',short:'Kromatografi',kw:'kromatografi rf-verdi stasjonær fase mobil fase løsemiddel polaritet separasjon analyse fargestoff',
lead:'Løsemidlet trekkes oppover papiret og tar med seg fargestoffene. Stoffer som binder seg lite til papiret, vandrer langt. Rf-verdien er en slags fingeravtrykk for stoffet.',
hint:'Klikk på en flekk for å måle Rf.',
controls:[{id:'e',label:'Polaritet til løsemidlet',min:0,max:1,step:.01,value:.5,fmt:v=>v<.33?'lav ('+nf(v,2)+')':v<.66?'middels ('+nf(v,2)+')':'høy ('+nf(v,2)+')'},{type:'btns',items:[['Kjør på nytt',S=>{S.tt=0;S.sel=null}]]}],
tex:['R_f=\\frac{\\text{strekning stoffet har vandret}}{\\text{strekning løsemidlet har vandret}}'],
about:['Papiret er den <strong>stasjonære fasen</strong> og løsemidlet er den <strong>mobile fasen</strong>. Hvert stoff fordeler seg mellom dem på sin egen måte.','I første spor er en ukjent blanding. I de andre sporene er rene referansestoffer. Sammenlign høydene for å finne ut hva blandingen inneholder.','Rf-verdien avhenger av løsemidlet. Endre polariteten og se at stoffene skiller seg bedre eller dårligere.','Her er de polare fargestoffene tegnet slik at de følger et polart løsemiddel. Modellen er forenklet.'],
tasks:['Hvilke fargestoffer finnes i den ukjente blandingen?','Mål Rf for det gule stoffet. Er den lik i blandingen og i referansen?','Finn en polaritet som skiller de fire stoffene godt fra hverandre.','Hvorfor må startstreken tegnes med blyant og ikke med tusj?'],
init(S){S.tt=0;S.sel=null},change(S){S.tt=0;S.sel=null},
update(S,dt){S.tt+=dt},
geo(S){const b=pad(S,24,20,30);const wide=isWide(S);const pw=Math.min(b.w*(wide?.62:1),b.h*.95);const pl=b.l+(wide?0:(b.w-pw)/2);return{pl,pt:b.t,pw,ph:b.h-26,b,wide}},
draw(S){const{pl,pt,pw,ph,b,wide}=this.geo(S);const e=S.p.e;const y0=pt+ph-36,maxF=y0-pt-16;const fr=Math.sqrt(Math.min(1,S.tt/12));const front=maxF*fr;
 rct(pl,pt,pw,ph,null,'#d9d5cc');rct(pl,y0-front,pw,front+36,null,'rgba(70,110,170,0.16)');rct(pl-10,pt+ph-14,pw+20,24,null,A(C.blue,.25));ln(pl,y0,pl+pw,y0,'#6b6760',1.2,[5,4]);ln(pl,y0-front,pl+pw,y0-front,'rgba(40,70,120,.5)',1.2);
 const lw=pw/5;S.spots=[];LANES.forEach((cs,k)=>{const x=pl+lw*(k+.5);if(fr<.02)dot(x,y0,6,k===0?'#3a3340':DY[cs[0]][1]);cs.forEach(c=>{const r=Rf(e,DY[c][2]);const y=y0-r*front,ry=5+12*r*fr,rx=Math.min(lw*.3,6+3*fr);X.beginPath();X.ellipse(x,y,rx,ry,0,0,TAU);X.fillStyle=A(DY[c][1],.85);X.fill();S.spots.push({k,c,x,y,ry,rx})});T(k===0?'Ukjent':DY[cs[0]][0],x,pt+ph+14,{a:'center',s:12.5,c:k===0?C.yellow:C.fg2})});
 if(S.sel&&fr>.05){const s=S.spots.find(q=>q.k===S.sel.k&&q.c===S.sel.c);if(s){const xm=s.x+lw*.36;ln(xm,y0,xm,s.y,'#1d2a40',2);ln(xm+8,y0,xm+8,y0-front,'#1d2a40',1.2,[3,3]);ln(s.x-8,s.y,xm,s.y,'#1d2a40',1,[2,2]);T('a',xm-6,(y0+s.y)/2,{a:'right',f:'m',s:15,c:'#1d2a40'});T('b',xm+12,y0-front/2,{f:'m',s:15,c:'#1d2a40'});T(`Rf = ${nf((y0-s.y)/front,2)}`,s.x,s.y-s.ry-10,{a:'center',f:'n',s:13,c:'#1d2a40',w:500})}}
 if(fr<1)T('løsemidlet trekkes oppover …',pl+pw/2,pt+12,{a:'center',s:12,c:'#55524c'});
 const ix=wide?pl+pw+24:b.l,iy=wide?pt:pt+ph+30;if(wide){T('Rf ved denne polariteten',ix,iy+8,{s:11,w:700,c:C.fg3});DY.forEach(([n,c,p],i)=>{dot(ix+6,iy+34+i*26,6,c);T(`${n}: ${nf(Rf(e,p),2)}`,ix+18,iy+34+i*26,{f:'n',s:13,c:C.fg2})})}},
click(S,x,y){(S.spots||[]).forEach(s=>{if(Math.abs(x-s.x)<s.rx+6&&Math.abs(y-s.y)<s.ry+6)S.sel={k:s.k,c:s.c}})},
readout(S){const e=S.p.e;return DY.map(([n,c,p],i)=>['Rf '+n.toLowerCase(),nf(Rf(e,p),2),c])}
});
}
