'use strict';
/* ================= FYSIKK (del 3) ================= */

/* ---------- Fjær og harmonisk svingning ---------- */
{
M({id:'fy-fjaer',s:'fy',c:['FY1','R2'],title:'Fjær og harmonisk svingning',short:'Fjærsvingning',kw:'fjær hookes lov fjærkonstant harmonisk svingning periode svingetid amplitude demping energi elastisk potensiell energi kinetisk differensiallikning',
lead:'En fjær drar tilbake med en kraft som er proporsjonal med hvor mye den er strukket. Det gir en svingning der energien hele tiden går fram og tilbake mellom fjæra og bevegelsen.',
hint:'Dra klossen ut til siden og slipp.',
controls:[{id:'m',label:'Masse',min:.1,max:2,step:.05,value:.5,unit:'kg',d:2},{id:'k',label:'Fjærkonstant',min:5,max:100,step:1,value:20,unit:'N/m'},{id:'b',label:'Demping',min:0,max:2,step:.05,value:0,unit:'kg/s',d:2},
 {id:'vis',type:'seg',label:'Graf',value:'x',options:[['x','Posisjon'],['v','Fart'],['a','Akselerasjon']]},{type:'btns',items:[['Slipp fra 20 cm',S=>MOD['fy-fjaer'].rel(S,.2)],['Stopp',S=>MOD['fy-fjaer'].rel(S,0)]]}],
tex:['F=-k\\,x','T=2\\pi\\sqrt{\\frac{m}{k}}','E=\\tfrac12 k x^2+\\tfrac12 m v^2','m\\,x\'\'=-k\\,x-b\\,x\''],
about:['<strong>Hookes lov</strong>: Kraften fra fjæra er proporsjonal med utstrekningen $x$ og peker mot likevektsstillingen. Fjærkonstanten $k$ sier hvor stiv fjæra er.','Fordi kraften alltid peker mot midten, svinger klossen fram og tilbake. Uten friksjon blir bevegelsen en sinuskurve, en <strong>harmonisk svingning</strong>. Svingetiden avhenger av massen og fjærkonstanten, men ikke av hvor langt du drar den ut.','Energien veksler mellom elastisk potensiell energi i fjæra og kinetisk energi. Med demping blir mekanisk energi gradvis til varme.','Newtons andre lov gir differensiallikningen $mx\'\'=-kx$. Løsningen er $x=A\\cos(\\omega t)$ med $\\omega=\\sqrt{k/m}$.'],
tasks:['Mål svingetiden. Stemmer den med formelen?','Hva skjer med svingetiden når du firedobler massen?','Dra klossen dobbelt så langt ut. Endres svingetiden? Hva skjer med den største farten?','Slå på demping. Hvor blir det av energien?'],
init(S){S.x=.2;S.vx=0;S.Q=0;S.hist=[];S.tt=0;S.cr=[];S.hold=false},
rel(S,x){S.x=x;S.vx=0;S.Q=0;S.hist=[];S.cr=[]},
update(S,dt){const p=S.p;if(S.hold){S.tt+=dt;S.hist.push([S.tt,S.x,0,-p.k*S.x/p.m]);this.trim(S);return}const n=20,h=dt/n;for(let i=0;i<n;i++){const a=(-p.k*S.x-p.b*S.vx)/p.m;const xo=S.x;S.vx+=a*h;S.x+=S.vx*h;S.Q+=p.b*S.vx*S.vx*h;S.tt+=h;if(xo<0&&S.x>=0)S.cr.push(S.tt)}
 S.x=clamp(S.x,-.42,.42);S.hist.push([S.tt,S.x,S.vx,(-p.k*S.x-p.b*S.vx)/p.m]);this.trim(S);if(S.cr.length>6)S.cr.shift()},
trim(S){while(S.hist.length&&S.hist[0][0]<S.tt-8)S.hist.shift()},
draw(S){const p=S.p;const[tp,bt]=rows(pad(S,30,20,40),[.85,1],40);const[bl,br]=cols(bt,[1,1.25],34);const P=Plane(-.62,.5,-.16,.2,tp,true);S.P=P;
 const wx=-.58,y0=0,bw=.12,bh=.1;rct(P.X(wx)-8,P.Y(.16),8,P.Y(-.16)-P.Y(.16),null,A(C.fg,.35));for(let y=-.15;y<.16;y+=.03)ln(P.X(wx)-8,P.Y(y),P.X(wx)-16,P.Y(y-.025),A(C.fg,.3),1);
 ln(P.X(-.6),P.Y(-bh/2),P.X(.5),P.Y(-bh/2),A(C.fg,.5),1.5);for(let x=-.6;x<.5;x+=.04)ln(P.X(x),P.Y(-bh/2),P.X(x-.02),P.Y(-bh/2-.02),A(C.fg,.2),1);
 ln(P.X(0),P.Y(.06),P.X(0),P.Y(-bh/2),A(C.fg,.35),1.2,[4,4]);T('likevekt',P.X(0),P.Y(-bh/2)+32,{a:'center',s:11,c:C.fg3});for(let k=-4;k<=4;k++){ln(P.X(k/10),P.Y(-bh/2)+2,P.X(k/10),P.Y(-bh/2)+8,A(C.fg,.5),1);T(nf(k*10,0),P.X(k/10),P.Y(-bh/2)+18,{a:'center',f:'n',s:10,c:C.fg3})}T('cm',P.X(.45),P.Y(-bh/2)+18,{a:'center',s:10,c:C.fg3});
 const xm=S.x-bw/2,nC=14,pts=[[P.X(wx),P.Y(0)]];const L=xm-wx-.04;for(let i=0;i<=nC;i++){const xx=wx+.02+L*i/nC;pts.push([P.X(xx),P.Y(i===0||i===nC?0:(i%2?.03:-.03))])}pts.push([P.X(xm),P.Y(0)]);pth(pts,mix(C.teal,C.fg,.2),2.4);
 rr(P.X(xm),P.Y(bh/2),bw*P.sx,bh*P.sx,4,C.gold,A(C.gold,.35),2);T(nf(p.m,2)+' kg',P.X(S.x),P.Y(0),{a:'center',f:'n',s:11.5,c:C.fg});
 const F=-p.k*S.x;if(Math.abs(F)>.05){const fl=clamp(F/20,-.3,.3);arr(P.X(S.x),P.Y(bh/2+.04),P.X(S.x+fl),P.Y(bh/2+.04),C.red,2.6,9);T('F = '+nf(F,1)+' N',P.X(S.x+fl)+(fl>0?8:-8),P.Y(bh/2+.04),{a:fl>0?'left':'right',f:'n',s:11.5,c:C.red})}
 if(Math.abs(S.vx)>.02){const vl=clamp(S.vx/4,-.3,.3);arr(P.X(S.x),P.Y(bh/2+.1),P.X(S.x+vl),P.Y(bh/2+.1),C.green,2.6,9);T('v',P.X(S.x+vl)+(vl>0?8:-8),P.Y(bh/2+.1),{a:vl>0?'left':'right',f:'m',s:15,c:C.green})}
 if(S.hold)handle(P.X(S.x),P.Y(0),C.yellow,S);else if(!S.touched)handle(P.X(S.x),P.Y(0),C.yellow,S);
 const Ek=.5*p.m*S.vx**2,Ep=.5*p.k*S.x**2,Et=Ek+Ep+S.Q,emax=Math.max(Et,.01);const eb={l:bl.l,t:bl.t,w:bl.w,h:bl.h*.42};lab(bl,'Energi');
 const items=[['kinetisk',Ek,C.green],['i fjæra',Ep,C.teal],['varme',S.Q,C.red]];const rh=Math.min(18,(eb.h-10)/3-6);items.forEach(([n,v,c],i)=>{const y=eb.t+10+i*(rh+8);T(n,eb.l,y+rh/2,{s:12,c:C.fg2});const x0=eb.l+66,w=(eb.w-136)*v/emax;rct(x0,y,eb.w-136,rh,null,A(C.fg,.05));rct(x0,y,w,rh,null,A(c,.8));T(nf(v,3)+' J',x0+eb.w-130,y+rh/2,{f:'n',s:11.5,c:C.fg2})});
 const g1=br,g2={l:bl.l,t:bl.t+bl.h*.5+16,w:bl.w,h:bl.h*.5-16};const vis=S.p.vis,idx={x:1,v:2,a:3}[vis],w=Math.sqrt(p.k/p.m),A0=.42;const ym={x:A0,v:A0*w,a:A0*w*w}[vis]*1.05;
 const G=Plane(S.tt-8,S.tt,-ym,ym,{l:g1.l+40,t:g1.t,w:g1.w-40,h:g1.h});G.grid(1,{sy:niceStep(ym/2),minor:false,alpha:.06});G.axes({xs:1,ys:niceStep(ym/2),xAt:S.tt-8,xf:x=>'',x0:true,yl:{x:'x (m)',v:'v (m/s)',a:'a (m/s²)'}[vis],ls:13});
 lab(g1,{x:'Posisjon',v:'Fart',a:'Akselerasjon'}[vis]+' de siste 8 sekundene');const col={x:C.yellow,v:C.green,a:C.red}[vis];if(S.hist.length>1)pth(S.hist.map(h=>G.pt(h[0],h[idx])),col,2.4);
 S.cr.slice(-4).forEach(t=>{if(t>S.tt-8){ln(G.X(t),G.t,G.X(t),G.t+G.h,A(C.fg,.2),1,[3,4])}});
 const Tt=TAU/w;const Tm_=S.cr.length>1?(S.cr[S.cr.length-1]-S.cr[0])/(S.cr.length-1):null;let y=g2.t+6;const Ln=(s_,c=C.fg2,sz=13.5)=>{T(s_,g2.l,y,{f:'n',s:sz,c});y+=sz+10};
 lab(g2,'Svingetid');Ln(`T = 2π·√(m/k) = ${nf(Tt,3)} s`,C.fg,14);Ln(`målt: ${Tm_?nf(Tm_,3)+' s':'–'}`,C.yellow);if(p.b>0)Ln('Med demping blir svingetiden litt lengre.',C.fg3,12)},
pick(S,x,y){const P=S.P;if(!P)return;if(Math.abs(x-P.X(S.x))<40&&Math.abs(y-P.Y(0))<40){S.hold=true;return{move:(mx)=>{S.x=clamp(P.ix(mx),-.4,.4);S.vx=0;S.Q=0},up:()=>{S.hold=false;S.cr=[]}}}},
readout(S){const p=S.p;return[['posisjon',nf(S.x*100,1)+' cm','yellow'],['fart',nf(S.vx,2)+' m/s','green'],['kraft',nf(-p.k*S.x,2)+' N','red'],['svingetid (teori)',nf(TAU*Math.sqrt(p.m/p.k),3)+' s']]},
live(S){const p=S.p;return `T=2\\pi\\sqrt{\\frac{${tn(p.m,2)}}{${tn(p.k,0)}}}=${tn(TAU*Math.sqrt(p.m/p.k),3)}\\ \\text{s}`}
});
}

/* ---------- Ladde partikler mellom plater (elektronkanon) ---------- */
{
const tsci=(x,sg)=>{const e=Math.floor(Math.log10(Math.abs(x)));return `${tn(x/10**e,sg-1)}\\cdot 10^{${e}}`};
const e0=1.602e-19,PART={e:{n:'Elektron',q:-e0,m:9.109e-31},p:{n:'Proton',q:e0,m:1.673e-27}};
const Lp=.05,dp=.02,D0=.03,Dsc=.15;
function traj(p,part){const pr=PART[part];const v0=Math.sqrt(2*Math.abs(pr.q)*p.Ua/pr.m);const E=p.Ud/dp,B=p.B/1000;const pts=[];let x=0,y=0,vx=v0,vy=0;pts.push([-D0,0]);
 const qm=pr.q/pr.m;const steps=400,dt=Lp/v0/steps*1.5;let hit=false;
 while(x<Lp&&pts.length<2000){const ax=qm*(-vy*B*(p.Bon?1:0)),ay=qm*(-E+vx*B*(p.Bon?1:0));vx+=ax*dt;vy+=ay*dt;x+=vx*dt;y+=vy*dt;pts.push([x,y]);if(Math.abs(y)>=dp/2){hit=true;break}if(vx<=0){hit=true;break}}
 let ys=null;if(!hit){const t=(Lp+Dsc-x)/vx;ys=y+vy*t;pts.push([Lp+Dsc,ys])}return{pts,v0,hit,ys,E,B,tin:Lp/v0}}
M({id:'fy-plater',s:'fy',c:['FY2'],title:'Elektronkanon: ladde partikler i elektrisk felt',short:'Elektronkanon',kw:'elektrisk felt plater spenning akselerasjon elektronkanon avbøyning katodestrålerør hastighetsfilter magnetfelt elektron proton energi elektronvolt',
lead:'Elektroner akselereres av en spenning og skytes inn mellom to ladde plater. Det elektriske feltet bøyer banen som et skrått kast. Med et magnetfelt i tillegg kan vi lage et hastighetsfilter.',
controls:[{id:'part',type:'seg',label:'Partikkel',value:'e',options:[['e','Elektron'],['p','Proton']]},{id:'Ua',label:'Akselerasjonsspenning',min:100,max:3000,step:10,value:800,unit:'V'},{id:'Ud',label:'Spenning mellom platene',min:-200,max:200,step:1,value:60,unit:'V'},
 {id:'Bon',type:'check',label:'Magnetfelt mellom platene (inn i skjermen)',value:false},{id:'B',label:'Magnetisk flukstetthet',min:0,max:2,step:.01,value:.5,unit:'mT',d:2,show:S=>S.p.Bon}],
tex:['qU_a=\\tfrac12mv_0^2\\;\\Rightarrow\\;v_0=\\sqrt{\\frac{2qU_a}{m}}','E=\\frac{U}{d},\\qquad F=qE','y=\\tfrac12at^2,\\quad t=\\frac{L}{v_0}','qE=qvB\\;\\Rightarrow\\;v=\\frac{E}{B}'],
about:['Først akselereres partikkelen gjennom spenningen $U_a$. Den elektriske energien $qU_a$ blir til kinetisk energi.','Mellom platene er feltet homogent: $E=U/d$, der $d=2$ cm er avstanden mellom platene. Kraften $qE$ er konstant og vinkelrett på farten inn, så banen blir en parabel, akkurat som et vannrett kast. Etter platene går partikkelen rett fram til skjermen.','Et elektron er negativt og trekkes mot den positive plata. Et proton går motsatt vei. Avbøyningen fra det elektriske feltet blir faktisk lik for elektron og proton når de har samme akselerasjonsspenning, men protonet bruker mye lengre tid.','Med et magnetfelt i tillegg virker også kraften $qvB$. Når $qE=qvB$, går partikler med farten $v=E/B$ rett igjennom. Det kalles et <strong>hastighetsfilter</strong>.'],
tasks:['Regn ut farten til elektronene når akselerasjonsspenningen er 800 V. Sammenlign med lysfarten.','Doble akselerasjonsspenningen. Hva skjer med avbøyningen? Forklar.','Finn spenningen mellom platene der elektronene akkurat treffer plata.','Slå på magnetfeltet og finn B slik at elektronene går rett fram. Stemmer det med v = E/B?'],
init(S){S.dots=[]},
update(S,dt){S.dots.forEach(d=>d.s+=dt*.45);S.dots=S.dots.filter(d=>d.s<1);if(Math.random()<dt*14)S.dots.push({s:0,o:(Math.random()-.5)*.0012})},
draw(S){const p=S.p,pr=PART[p.part];const tr=traj(p,p.part);S.tr=tr;const b=pad(S,26,40,40);
 const sx=x=>b.l+60+(x+D0)/(D0+Lp+Dsc)*(b.w-120),cy=b.t+b.h*.42,sc=(b.h*.36)/.05,sy=y=>cy-y*sc;
 rr(b.l,cy-30,50,60,6,A(C.fg,.4),A(C.fg,.06),1.5);glow(b.l+40,cy,18,C.gold,.5);T(p.part==='e'?'glødekatode':'ionekilde',b.l+25,cy+46,{a:'center',s:11,c:C.fg3});
 rct(sx(-.006)-3,cy-40,6,34,null,C.fg2);rct(sx(-.006)-3,cy+6,6,34,null,C.fg2);T('Uₐ = '+nf(p.Ua,0)+' V',sx(-.006),cy-52,{a:'center',f:'n',s:12,c:C.fg2});
 const top=sy(dp/2),bot=sy(-dp/2),xl=sx(0),xr=sx(Lp);const pos=p.Ud>=0?'top':'bot';
 rct(xl,top-7,xr-xl,7,null,p.Ud===0?C.fg3:(pos==='top'?C.red:C.blue));rct(xl,bot,xr-xl,7,null,p.Ud===0?C.fg3:(pos==='top'?C.blue:C.red));
 if(p.Ud!==0){T(pos==='top'?'+':'−',xl-12,top-3,{a:'center',f:'n',s:16,c:pos==='top'?C.red:C.blue});T(pos==='top'?'−':'+',xl-12,bot+4,{a:'center',f:'n',s:16,c:pos==='top'?C.blue:C.red});
  const n=7;for(let i=0;i<n;i++){const x=lerp(xl+14,xr-14,i/(n-1));const al=clamp(Math.abs(p.Ud)/150,.15,.7);if(p.Ud>0)arr(x,top+4,x,bot-4,A(C.yellow,al),1.3,7);else arr(x,bot-4,x,top+4,A(C.yellow,al),1.3,7)}}
 if(p.Bon)for(let i=0;i<6;i++)for(let j=0;j<2;j++){const x=lerp(xl+24,xr-24,i/5),y=lerp(top+10,bot-10,(j+.5)/2);circ(x,y,5,A(C.purple,.8),null,1.2);ln(x-3,y-3,x+3,y+3,A(C.purple,.8),1.2);ln(x-3,y+3,x+3,y-3,A(C.purple,.8),1.2)}
 T(`L = 5 cm, d = 2 cm`,(xl+xr)/2,bot+22,{a:'center',f:'n',s:11,c:C.fg3});
 const scx=sx(Lp+Dsc);rct(scx,sy(.05),6,sy(-.05)-sy(.05),null,A(C.green,.25));for(let k=-4;k<=4;k++){ln(scx-4,sy(k/100),scx,sy(k/100),A(C.fg,.4),1);if(k%2===0)T(nf(k,0)+' cm',scx+12,sy(k/100),{f:'n',s:10.5,c:C.fg3})}T('skjerm',scx+3,sy(.05)-12,{a:'center',s:11,c:C.green});
 const pts=tr.pts.map(([x,y])=>[sx(x),sy(clamp(y,-.055,.055))]);pth(pts,A(C.yellow,.35),1.6);
 if(!tr.hit){glow(scx,sy(tr.ys),20,C.green,.7);dot(scx+2,sy(tr.ys),4,C.green)}else{const q=pts[pts.length-1];glow(q[0],q[1],14,C.red,.6);T('treffer plata',q[0],q[1]+(tr.pts[tr.pts.length-1][1]>0?-14:16),{a:'center',s:11.5,c:C.red})}
 const cum=[0];for(let i=1;i<pts.length;i++)cum.push(cum[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));const tot=cum[cum.length-1]||1;
 S.dots.forEach(d=>{const L=d.s*tot;let i=1;while(i<cum.length-1&&cum[i]<L)i++;const f=(L-cum[i-1])/((cum[i]-cum[i-1])||1);const q=[lerp(pts[i-1][0],pts[i][0],f),lerp(pts[i-1][1],pts[i][1],f)];dot(q[0],q[1]+d.o*sc,2.4,C.yellow)});
 const nw=!isWide(S),iy=b.t+b.h*(nw?.72:.78);let x=b.l;const info=[[`v₀ = ${sci(tr.v0,3)} m/s`,C.fg],[`(${nf(tr.v0/2.998e8*100,1)} % av lysfarten)`,C.fg3],[`E = U/d = ${nf(Math.abs(tr.E),0)} V/m`,C.yellow],[`tid mellom platene: ${nf(tr.tin*1e9,1)} ns`,C.fg2]];
 if(p.Bon)info.push([`E/B = ${sci(Math.abs(tr.E)/(tr.B||1e-12),3)} m/s`,C.purple]);info.push([tr.hit?'treffer plata':`avbøyning på skjermen: ${nf(tr.ys*100,2)} cm`,tr.hit?C.red:C.green]);
 const cw=(b.w)/2;info.forEach(([s_,c],i)=>T(s_,b.l+(i%2)*cw,iy+Math.floor(i/2)*(nw?15:20),{f:'n',s:nw?10:12.5,c}))},
readout(S){const tr=S.tr||traj(S.p,S.p.part);return[['fart inn',sci(tr.v0,3)+' m/s'],['elektrisk felt',nf(Math.abs(tr.E),0)+' V/m','yellow'],['avbøyning',tr.hit?'treffer plata':nf(tr.ys*100,2)+' cm','green']]},
live(S){const p=S.p,pr=PART[p.part];const v=Math.sqrt(2*e0*p.Ua/pr.m);return `v_0=\\sqrt{\\frac{2\\cdot ${p.part==='e'?'1{,}60\\cdot10^{-19}':'1{,}60\\cdot10^{-19}'}\\cdot ${p.Ua}}{${p.part==='e'?'9{,}11\\cdot10^{-31}':'1{,}67\\cdot10^{-27}'}}}=${tsci(v,3)}\\ \\text{m/s}`}
});
}

/* ---------- Vindkraft ---------- */
{
const rho=1.25,CP=.45,SPEC=350,VIN=3,VUT=25;
const Pw=(D,v)=>.5*rho*PI*(D/2)**2*v**3;
const Pt=(D,v)=>{if(v<VIN||v>=VUT)return 0;return Math.min(SPEC*PI*(D/2)**2,CP*Pw(D,v))};
const ray=(v,vm)=>{const s=vm/Math.sqrt(PI/2);return v/(s*s)*Math.exp(-v*v/(2*s*s))};
const yearE=(D,vm)=>{let e=0;for(let v=.25;v<30;v+=.5)e+=ray(v,vm)*.5*Pt(D,v);return e*8766/1e9};
M({id:'fy-vindkraft',s:'fy',c:['FY1','NAT'],title:'Vindkraft: hvor mye energi er det i vinden?',short:'Vindkraft',kw:'vindkraft vindturbin vindmølle effekt energi fornybar betz kinetisk energi luft rotor kapasitetsfaktor vind kraftproduksjon',
lead:'Vinden har kinetisk energi. En turbin bremser lufta og henter ut noe av energien. Effekten øker med kuben av vindfarten: dobbelt så sterk vind gir åtte ganger så mye effekt.',
controls:[{id:'v',label:'Vindfart nå',min:0,max:30,step:.5,value:9,unit:'m/s',d:1},{id:'D',label:'Rotordiameter',min:20,max:170,step:5,value:120,unit:'m'},{id:'vm',label:'Middelvind på stedet (for årsproduksjon)',min:4,max:11,step:.5,value:8,unit:'m/s',d:1}],
tex:['P_{\\text{vind}}=\\tfrac12\\rho A v^3','P_{\\max}=\\tfrac{16}{27}P_{\\text{vind}}\\approx 0{,}59\\,P_{\\text{vind}}','A=\\pi r^2'],
about:['Lufta som passerer rotoren hvert sekund har massen $\\rho A v$. Kinetisk energi per kilogram er $\\tfrac12v^2$. Ganger vi sammen, får vi effekten $\\tfrac12\\rho Av^3$.','Turbinen kan ikke stoppe lufta helt, for da ville den ikke komme seg forbi. <strong>Betz’ grense</strong> sier at høyst 16/27, omtrent 59 %, kan tas ut. Moderne turbiner tar ut rundt 45 % ved gunstig vind.','Turbinen starter ved omtrent 3 m/s. Over omtrent 12 m/s gir den full effekt (merkeeffekten), og ved 25 m/s stoppes den for ikke å bli ødelagt.','Vinden varierer mye. Fordelingen over året er her en Rayleigh-fordeling med valgt middelvind. <strong>Kapasitetsfaktoren</strong> er hvor mye turbinen produserer i forhold til om den hadde gått for fullt hele året.'],
tasks:['Hvor mye øker effekten i vinden når vindfarten går fra 5 til 10 m/s?','Hvor mye øker effekten når rotordiameteren dobles?','Hvorfor stoppes turbinen i storm?','En norsk husstand bruker omtrent 16 000 kWh i året. Hvor mange husstander kan turbinen forsyne?'],
init(S){S.ang=0;S.air=[...Array(90)].map(()=>({x:Math.random(),y:Math.random(),s:.7+Math.random()*.6}))},
update(S,dt){const v=S.v.v,D=S.v.D,P=Pt(D,v);const tsr=P>0?7:0;S.ang+=dt*tsr*v/(D/2)*3;S.air.forEach(a=>{const near_=Math.abs(a.y-.5)<.42?1:0;const slow=a.x>.35?(P>0?.55:1):1;a.x+=dt*v*.022*a.s*(near_?slow:1);if(a.x>1){a.x-=1;a.y=Math.random()}})},
draw(S){const v=S.v.v,D=S.v.D;const[bl,br]=split(S,.48,{g:28,b:pad(S,26,30,40)});
 const hub=[bl.l+bl.w*.42,bl.t+bl.h*.36],R=Math.min(bl.h*.34,bl.w*.36)*(D/170)**.6+20,tow=bl.t+bl.h-12;
 rct(bl.l,tow,bl.w,3,null,A(C.green,.6));poly([[hub[0]-5,hub[1]],[hub[0]+5,hub[1]],[hub[0]+9,tow],[hub[0]-9,tow]],null,A(C.fg,.65));
 S.air.forEach(a=>{const x=bl.l+a.x*bl.w,y=bl.t+a.y*bl.h*.75;ln(x,y,x+6+v*.6,y,A(C.blue,.45),1.5)});
 for(let k=0;k<3;k++){const an=S.ang+k*TAU/3;const ex=hub[0]+Math.cos(an)*R,ey=hub[1]+Math.sin(an)*R;const px=-Math.sin(an),py=Math.cos(an);poly([[hub[0]+px*6,hub[1]+py*6],[ex+px*2,ey+py*2],[ex-px*2,ey-py*2],[hub[0]-px*3,hub[1]-py*3]],null,A(C.fg,.9))}
 circ(hub[0],hub[1],8,null,C.fg2);circ(hub[0],hub[1],R,A(C.fg,.15),null,1);ln(hub[0]-R,hub[1]+R+14,hub[0]+R,hub[1]+R+14,A(C.fg,.4),1);T('D = '+nf(D,0)+' m',hub[0],hub[1]+R+26,{a:'center',f:'n',s:12,c:C.fg2});
 const st=v<VIN?'For lite vind: turbinen står':v>=VUT?'Storm: turbinen er stoppet':Pt(D,v)>=SPEC*PI*(D/2)**2-1?'Full effekt (merkeeffekt)':'Produserer';T(st,bl.l,bl.t+8,{s:14,w:700,c:v<VIN||v>=VUT?C.red:C.fg});
 T('P = '+nf(Pt(D,v)/1e6,2)+' MW',bl.l,bl.t+30,{f:'n',s:14,c:C.yellow});
 const[g1,g2]=rows(br,[1.4,1],46);const Pr=SPEC*PI*(D/2)**2;const ym=Math.max(Pr*1.6,Pw(D,Math.min(v,14))*0.62)/1e6;const P=Plane(0,30,0,ym,{l:g1.l+36,t:g1.t,w:g1.w-36,h:g1.h});
 P.grid(5,{sy:niceStep(ym/4),minor:false,alpha:.07});P.axes({xs:5,ys:niceStep(ym/4),x0:true,xl:'m/s',ls:13});lab(g1,'Effekt (MW) mot vindfart');
 P.clip(()=>{P.fn(x=>Pw(D,x)/1e6,A(C.blue,.5),1.6,{prog:1});P.fn(x=>16/27*Pw(D,x)/1e6,A(C.fg,.4),1.4,{prog:1,dash:[4,4]});const pts=[];for(let x=0;x<=30;x+=.1)pts.push(P.pt(x,Pt(D,x)/1e6));pth(pts,C.yellow,2.8);
  const vm=S.v.vm;for(let x=.5;x<30;x+=1){const h=ray(x,vm)/(.2)*ym*.35;rct(P.X(x-.45),P.Y(0)-h*P.sy,.9*P.sx,h*P.sy,null,A(C.teal,.18))}});
 T('i vinden',P.X(7.2),P.Y(Pw(D,7.2)/1e6)-6,{a:'right',s:11,c:C.blue});T('Betz-grensen',P.X(9.6),P.Y(16/27*Pw(D,9.6)/1e6),{a:'left',s:11,c:C.fg3,bg:A(C.stage,.6)});
 dot(P.X(v),P.Y(Pt(D,v)/1e6),6,C.yellow);if(v<=30)ln(P.X(v),P.t,P.X(v),P.Y(0),A(C.fg,.25),1,[3,3]);T('vindfordeling på stedet',P.X(29),P.Y(0)-26,{a:'right',s:11,c:C.teal});
 const E=yearE(D,S.v.vm),cf=E*1e9/(Pr*8766);let y=g2.t+4;const L=(s_,c=C.fg2,sz=13.5)=>{T(s_,g2.l,y,{f:'n',s:sz,c});y+=sz+10};
 lab(g2,'Årsproduksjon med middelvind '+nf(S.v.vm,1)+' m/s');L(`merkeeffekt: ${nf(Pr/1e6,2)} MW`);L(`årsproduksjon: ${nf(E,1)} GWh`,C.yellow,15);L(`kapasitetsfaktor: ${nf(cf*100,0)} %`,C.teal);L(`≈ ${nf(E*1e6/16000,0)} husstander`,C.fg)},
readout(S){const p=S.p;return[['effekt i vinden',nf(Pw(p.D,p.v)/1e6,2)+' MW','blue'],['turbinen gir',nf(Pt(p.D,p.v)/1e6,2)+' MW','yellow'],['virkningsgrad nå',Pw(p.D,p.v)>0?nf(100*Pt(p.D,p.v)/Pw(p.D,p.v),0)+' %':'–'],['årsproduksjon',nf(yearE(p.D,p.vm),1)+' GWh']]},
live(S){const p=S.p;return `P_{\\text{vind}}=\\tfrac12\\cdot 1{,}25\\cdot\\pi\\cdot ${tn(p.D/2,1)}^2\\cdot ${tn(p.v,1)}^3=${tn(Pw(p.D,p.v)/1e6,2)}\\ \\text{MW}`}
});
}

/* ---------- Måleusikkerhet ---------- */
{
const G=9.81;
M({id:'fy-usikkerhet',s:'fy',c:['FY1','KJ1','NAT'],title:'Måleusikkerhet: tilfeldige og systematiske feil',short:'Måleusikkerhet',kw:'måleusikkerhet usikkerhet feil tilfeldig systematisk presisjon nøyaktighet riktighet standardavvik standardfeil gjennomsnitt måling forsøk',
lead:'Ingen måling er helt nøyaktig. Tilfeldige feil sprer målingene rundt et gjennomsnitt. Systematiske feil flytter alle målingene samme vei. Her måler du tyngdeakselerasjonen g, som egentlig er 9,81 m/s².',
controls:[{id:'sys',label:'Systematisk feil',min:-.6,max:.6,step:.02,value:.2,unit:'m/s²',d:2},{id:'sd',label:'Tilfeldig spredning',min:.02,max:1,step:.01,value:.3,unit:'m/s²',d:2},
 {type:'btns',items:[['Mål én gang',S=>MOD['fy-usikkerhet'].meas(S,1)],['Mål 10 ganger',S=>MOD['fy-usikkerhet'].meas(S,10)],['Nullstill',S=>MOD['fy-usikkerhet'].init(S)]]},{id:'auto',type:'check',label:'Mål automatisk',value:false}],
tex:['\\bar x=\\frac{1}{n}\\sum x_i','s=\\sqrt{\\frac{\\sum(x_i-\\bar x)^2}{n-1}}','\\text{usikkerhet i snittet}\\approx\\frac{s}{\\sqrt n}','\\text{resultat: }\\bar x\\pm\\frac{s}{\\sqrt n}'],
about:['<strong>Tilfeldige feil</strong> kommer for eksempel av reaksjonstid når du tar tiden. De gjør at målingene spres. Spredningen måles med standardavviket $s$. Høy <strong>presisjon</strong> betyr liten spredning.','<strong>Systematiske feil</strong> påvirker alle målingene likt, for eksempel en klokke som går feil eller en linjal som er slitt. Høy <strong>riktighet</strong> betyr at gjennomsnittet ligger nær den sanne verdien.','Når du måler mange ganger, blir gjennomsnittet sikrere. Usikkerheten i gjennomsnittet avtar med $\\sqrt n$. Men den systematiske feilen forsvinner ikke uansett hvor mange ganger du måler.','I blinken til venstre er sentrum den sanne verdien. Det er bare den vannrette retningen som betyr noe for g. Den loddrette spredningen er bare med for å gjøre det lettere å se.'],
tasks:['Mål 10 ganger med stor spredning og ingen systematisk feil. Ligger 9,81 innenfor usikkerheten?','Gjør spredningen liten og den systematiske feilen stor. Er målingene presise? Er de riktige?','Hvor mange målinger trengs for å halvere usikkerheten i gjennomsnittet?','Gi eksempler på systematiske feil i et forsøk der du måler g med en pendel.'],
init(S){S.ms=[];S.acc=0;this.meas(S,8);S.ms.forEach(q=>q.t=-9)},
meas(S,n){for(let i=0;i<n;i++){const x=G+S.p.sys+S.p.sd*gauss(),y=S.p.sd*gauss();S.ms.push({x,y,t:S.t});if(S.ms.length>400)S.ms.shift()}},
update(S,dt){if(S.p.auto){S.acc+=dt*4;while(S.acc>=1){S.acc-=1;this.meas(S,1)}}},
stats(S){const n=S.ms.length;if(!n)return null;const m=S.ms.reduce((a,q)=>a+q.x,0)/n;const s=n>1?Math.sqrt(S.ms.reduce((a,q)=>a+(q.x-m)**2,0)/(n-1)):NaN;return{n,m,s,se:n>1?s/Math.sqrt(n):NaN}},
draw(S){const[bl,br]=split(S,.42,{g:30,b:pad(S,26,30,40)});const R=Math.min(bl.w,bl.h)/2-8,cx=bl.l+bl.w/2,cy=bl.t+bl.h/2;const sc=R/1.6;
 for(let k=5;k>=1;k--)circ(cx,cy,R*k/5,A(C.fg,.25),k%2?A(C.red,.1):A(C.fg,.04),1.2);ln(cx-R,cy,cx+R,cy,A(C.fg,.2),1);ln(cx,cy-R,cx,cy+R,A(C.fg,.2),1);dot(cx,cy,4,C.green);
 S.ms.forEach(q=>{const age=S.t-q.t;const x=cx+(q.x-G)*sc,y=cy-q.y*sc;if(Math.hypot(x-cx,y-cy)<R+6)dot(x,y,age<.5?6-age*4:3.5,A(C.yellow,.85))});
 const st=this.stats(S);if(st&&st.n>1){const mx=cx+(st.m-G)*sc;ln(mx,cy-R*.9,mx,cy+R*.9,C.yellow,1.8,[5,4])}
 lab(bl,'Blinken: sentrum er den sanne verdien');
 const[g1,g2]=rows(br,[1.2,1],46);const lo=G-1.8,hi=G+1.8;const nb=36,bw=(hi-lo)/nb,bins=new Array(nb).fill(0);S.ms.forEach(q=>{const k=Math.floor((q.x-lo)/bw);if(k>=0&&k<nb)bins[k]++});const bm=Math.max(4,...bins);
 const P=Plane(lo,hi,0,bm*1.15,g1);P.grid(.5,{sy:niceStep(bm/4),minor:false,alpha:.06});P.axes({xs:.5,ys:niceStep(bm/4),xAt:lo,x0:true,xl:'g (m/s²)',ls:13});lab(g1,'Alle målingene');
 bins.forEach((c,i)=>{if(c)rct(P.X(lo+i*bw)+.5,P.Y(c),bw*P.sx-1,P.Y(0)-P.Y(c),null,A(C.yellow,.6))});ln(P.X(G),P.t,P.X(G),P.Y(0),C.green,2);T('sann verdi 9,81',P.X(G)+4,P.t+8,{s:11,c:C.green});
 if(st&&st.n>1){const y=P.t+28;rct(P.X(st.m-st.se),y-4,(2*st.se)*P.sx,8,null,A(C.yellow,.5));ln(P.X(st.m-st.s),y,P.X(st.m+st.s),y,A(C.yellow,.6),1.2);ln(P.X(st.m-st.s),y-6,P.X(st.m-st.s),y+6,A(C.yellow,.6),1.2);ln(P.X(st.m+st.s),y-6,P.X(st.m+st.s),y+6,A(C.yellow,.6),1.2);dot(P.X(st.m),y,4.5,C.yellow)}
 const fs=isWide(S)?1:.8;let y=g2.t+4;const L=(s_,c=C.fg2,sz=13.5)=>{T(s_,g2.l,y,{f:'n',s:sz*fs,c});y+=(sz+9)*fs};lab(g2,'Resultat');
 if(!st){L('Trykk «Mål én gang».',C.fg3);return}
 L(`n = ${st.n} målinger`);L(`snitt: x̄ = ${nf(st.m,3)} m/s²`,C.yellow);if(st.n>1){L(`standardavvik: s = ${nf(st.s,3)}`);L(`usikkerhet i snittet: s/√n = ${nf(st.se,3)}`);const ok=Math.abs(st.m-G)<=2*st.se;L(`g = (${nf(st.m,2)} ± ${nf(st.se,2)}) m/s²`,C.fg,15);Twrap(ok?'9,81 ligger innenfor to ganger usikkerheten.':'9,81 ligger utenfor: det er sannsynligvis en systematisk feil.',g2.l,y,g2.w,{s:12.5,c:ok?C.green:C.red})}},
readout(S){const st=this.stats(S);if(!st)return[['målinger',0]];return[['målinger',st.n],['snitt',nf(st.m,3)+' m/s²','yellow'],['standardavvik',isFinite(st.s)?nf(st.s,3):'–'],['s/√n',isFinite(st.se)?nf(st.se,3):'–'],['avvik fra 9,81',nf(st.m-G,3),'green']]}
});
}
