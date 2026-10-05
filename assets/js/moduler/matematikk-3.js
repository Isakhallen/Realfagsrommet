/* ================= MATEMATIKK (del 3) ================= */

/* ---------- 20. Riemannsummer ---------- */
{
const RF={b:[x=>2+Math.sin(1.3*x),'2 + sin(1,3x)'],p:[x=>.12*x**3-.9*x*x+1.5*x+1.2,'0,12x³ − 0,9x² + 1,5x + 1,2'],e:[x=>Math.exp(x/3),'e^(x/3)'],l:[x=>2.5-.6*x,'2,5 − 0,6x']};
function rsum(f,a,b,n,m){const d=(b-a)/n;let s=0;for(let i=0;i<n;i++){const x0=a+i*d;s+=(m==='tr'?(f(x0)+f(x0+d))/2:f(m==='v'?x0:m==='h'?x0+d:x0+d/2))*d}return s}
M({id:'ma-riemann',s:'ma',c:['R2','S2'],title:'Integralet som grense av summer',short:'Riemannsummer',kw:'integral bestemt integral areal rektangler trapesmetoden numerisk integrasjon sum grenseverdi',
lead:'Vi tilnærmer arealet under grafen med rektangler. Jo flere og smalere rektangler, jo nærmere kommer summen det bestemte integralet.',
controls:[{id:'f',type:'seg',label:'Funksjon',value:'b',options:[['b','2 + sin 1,3x'],['p','Polynom'],['e','e^(x/3)'],['l','2,5 − 0,6x']]},{id:'a',label:'Nedre grense <i>a</i>',min:0,max:6.5,step:.1,value:.5},{id:'b',label:'Øvre grense <i>b</i>',min:.5,max:7,step:.1,value:6},{id:'n',label:'Antall rektangler <i>n</i>',min:1,max:80,step:1,value:6},{id:'m',type:'seg',label:'Metode',value:'v',options:[['v','Venstre'],['h','Høyre'],['mid','Midtpunkt'],['tr','Trapes']]},{type:'btns',items:[['La n → 80',S=>{S.anim={t:0,n0:S.p.n}}]]}],
tex:['\\int_a^b f(x)\\,dx=\\lim_{n\\to\\infty}\\sum_{i=1}^{n}f(x_i)\\,\\Delta x','\\Delta x=\\frac{b-a}{n}','\\text{Trapes: }\\sum\\frac{f(x_{i-1})+f(x_i)}{2}\\,\\Delta x'],
about:['Hvert rektangel har bredde $\\Delta x$ og høyde $f(x_i)$, der $x_i$ er venstre kant, høyre kant eller midtpunktet i intervallet.','Røde rektangler ligger under $x$-aksen og teller negativt. Integralet er derfor ikke alltid det samme som arealet.','Trapesmetoden og midtpunktsmetoden er mye mer nøyaktige enn venstre og høyre sum. Det er slike metoder datamaskiner bruker til numerisk integrasjon.'],
tasks:['Med venstre sum: er summen for stor eller for liten når grafen stiger? Forklar med figuren.','Hvor mange rektangler trenger du for at feilen skal bli under 0,01 med midtpunktsmetoden?','Velg den lineære funksjonen. Hvorfor gir trapesmetoden nøyaktig svar?','Skriv et lite program som regner ut en venstre sum. Sammenlign med tallet her.'],
update(S,dt){if(S.anim){S.anim.t+=dt/3;const n=Math.round(S.anim.n0+(80-S.anim.n0)*ease(S.anim.t));if(n!==S.p.n){S.p.n=n;if(S===Stage.S)syncCtl('n')}if(S.anim.t>=1)S.anim=null}},
draw(S){const f=RF[S.p.f][0],v=S.v,a=Math.min(v.a,v.b),b=Math.max(v.a,v.b),n=Math.round(S.p.n),m=S.p.m;const P=Plane(-.5,7.3,-2.4,6.6,pad(S,28));P.grid(1);P.axes({xs:1,ys:1,xl:'x',yl:'y'});
 const d=(b-a)/n;P.clip(()=>{for(let i=0;i<n;i++){const x0=a+i*d;if(m==='tr'){const y0=f(x0),y1=f(x0+d);const c=(y0+y1)>=0?C.blue:C.red;poly([P.pt(x0,0),P.pt(x0,y0),P.pt(x0+d,y1),P.pt(x0+d,0)],A(c,.85),A(c,.28),n>40?.6:1.2)}else{const h=f(m==='v'?x0:m==='h'?x0+d:x0+d/2);const c=h>=0?C.blue:C.red;rct(P.X(x0),Math.min(P.Y(h),P.Y(0)),d*P.sx,Math.abs(h)*P.sy,A(c,.85),A(c,.28),n>40?.6:1.2);if(m==='mid'&&n<=20)dot(P.X(x0+d/2),P.Y(h),3,C.fg)}}});
 P.fn(f,C.yellow,3.2);[a,b].forEach((x,i)=>{ln(P.X(x),P.t,P.X(x),P.t+P.h,A(C.fg,.3),1.2,[5,5]);Tm(i?'b':'a',P.X(x)+5,P.t+14,{c:C.fg2,s:16})});
 const s=rsum(f,a,b,n,m),I=simpson(f,a,b,800);infoBox(P.l+P.w-250,P.t+8,[[`sum   = ${nf(s,5)}`,C.blue],[`integral = ${nf(I,5)}`,C.yellow],[`feil  = ${nf(s-I,5)}`,C.fg2]])},
readout(S){const p=S.p,f=RF[p.f][0],a=Math.min(p.a,p.b),b=Math.max(p.a,p.b),n=Math.round(p.n);const s=rsum(f,a,b,n,p.m),I=simpson(f,a,b,800);return[['Δx',nf((b-a)/n,4)],['sum',nf(s,5),'blue'],['∫',nf(I,5),'yellow'],['feil',nf(s-I,5)]]},
live(S){const p=S.p,f=RF[p.f][0],a=Math.min(p.a,p.b),b=Math.max(p.a,p.b),n=Math.round(p.n);return`\\sum_{i=1}^{${n}}f(x_i)\\,\\Delta x=${tn(rsum(f,a,b,n,p.m),4)}\\;\\approx\\;\\int_{${tn(a,1)}}^{${tn(b,1)}}f(x)\\,dx=${tn(simpson(f,a,b,800),4)}`}
});
}

/* ---------- 21. Analysens fundamentalteorem ---------- */
{
const FF={b:[x=>1+.8*Math.sin(x)+.1*x,'1 + 0,8 sin x + 0,1x'],l:[x=>.5*x,'0,5x'],k:[()=>2,'2'],p:[x=>x*x/4-x+1.5,'¼x² − x + 1,5']};
M({id:'ma-fundamental',s:'ma',c:['R2','S2'],title:'Analysens fundamentalteorem',short:'Fundamentalteoremet',kw:'integral antiderivert arealfunksjon derivasjon integrasjon fundamentalteorem',
lead:'$A(x)$ er arealet under $f$ fra 0 til $x$. Når $x$ øker med en liten bit $dx$, øker arealet med omtrent $f(x)\\cdot dx$. Derfor er $A\'(x)=f(x)$.',
hint:'Dra den loddrette linjen, eller la den gå av seg selv.',
controls:[{id:'f',type:'seg',label:'Funksjon f',value:'b',options:[['b','Bølge'],['l','0,5x'],['k','Konstant 2'],['p','Parabel']]},{id:'dx',label:'Bredde <i>dx</i>',min:.05,max:1,step:.05,value:.5},{id:'spd',label:'Fart',min:0,max:1.5,step:.1,value:.5}],
tex:['A(x)=\\int_0^x \\cB{f(t)}\\,dt','\\cT{A(x+dx)-A(x)}\\approx \\cY{f(x)\\cdot dx}\\;\\Rightarrow\\; A\'(x)=f(x)','\\int_a^b f(x)\\,dx=F(b)-F(a)'],
about:['Øverst er det turkise området $A(x)$. Den gule stripen er den lille ekstra biten du får når $x$ øker med $dx$.','Nederst er grafen til $A$. Stigningstallet til den gule tangenten er nøyaktig $f(x)$, høyden på grafen over.','Dette er analysens fundamentalteorem: integrasjon og derivasjon er motsatte operasjoner. Derfor kan vi regne ut integraler med antideriverte.'],
tasks:['Velg konstant $f(x)=2$. Hvilken graf får $A(x)$? Forklar.','Velg $f(x)=0{,}5x$. Vis at $A(x)=\\tfrac14x^2$.','Gjør $dx$ liten. Hvorfor blir trekanten nederst nesten lik tangenten?','Hvor er $A(x)$ brattest? Sammenlign med grafen til $f$.'],
init(S){S.x=2.5},
update(S,dt){if(!(Stage.drag&&S===Stage.S)){S.x+=dt*S.p.spd;if(S.x>7.4)S.x=.2}},
draw(S){const f=FF[S.p.f][0],x=S.x,dx=S.v.dx;const[b1,b2]=rows(pad(S,28,22,26),[1,1],28);
 const N=400,XM=8,Ac=[0];let fm=0;for(let i=1;i<=N;i++){const x0=(i-1)*XM/N,x1=i*XM/N;Ac.push(Ac[i-1]+(f(x0)+f(x1))/2*(x1-x0));fm=Math.max(fm,f(x1))}
 const Af=t=>{const k=clamp(t/XM*N,0,N);const i=Math.floor(k);return i>=N?Ac[N]:lerp(Ac[i],Ac[i+1],k-i)};
 const P1=Plane(0,XM,-.3,Math.max(fm,1)*1.2,b1),P2=Plane(0,XM,-.3,Ac[N]*1.08,b2);S.Ps=[P1,P2];
 P1.grid(1,{sy:1,minor:false,alpha:.1});P1.axes({xs:1,ys:1,xl:'x'});P2.grid(1,{sy:niceStep(Ac[N]/5),minor:false,alpha:.1});P2.axes({xs:1,ys:niceStep(Ac[N]/5),xl:'x'});
 P1.area(f,0,x,A(C.teal,.28));rct(P1.X(x),P1.Y(f(x)),dx*P1.sx,P1.Y(0)-P1.Y(f(x)),C.yellow,A(C.yellow,.45),1.5);P1.fn(f,C.blue,3.2);
 T('A(x)',P1.X(x/2),P1.Y(f(x/2)/2),{a:'center',f:'m',s:18,c:C.teal});T('f(x)·dx',P1.X(x+dx/2),P1.Y(f(x))-14,{a:'center',f:'m',s:14,c:C.yellow});
 Tm('f(x)',P1.l+6,P1.t+10,{c:C.blue,s:16});Tm('A(x)',P2.l+6,P2.t+10,{c:C.teal,s:16});
 P2.fn(Af,A(C.teal,.3),2);P2.fn(Af,C.teal,3.2,{to:x,prog:1});const Ax=Af(x);
 P2.clip(()=>ln(P2.X(x-1.2),P2.Y(Ax-1.2*f(x)),P2.X(x+1.2),P2.Y(Ax+1.2*f(x)),A(C.yellow,.8),2));
 ln(P2.X(x),P2.Y(Ax),P2.X(x+dx),P2.Y(Ax),C.green,2.2);ln(P2.X(x+dx),P2.Y(Ax),P2.X(x+dx),P2.Y(Ax+f(x)*dx),C.yellow,2.6);
 circ(P2.X(x+dx),P2.Y(Af(x+dx)),5,C.teal,C.stage,2);dot(P2.X(x),P2.Y(Ax),6,C.teal);
 [P1,P2].forEach(P=>ln(P.X(x),P.t,P.X(x),P.t+P.h,A(C.fg,.4),1.2));handle(P1.X(x),P1.t+8,C.fg,S)},
pick(S,x,y){if(!S.Ps)return;const P=S.Ps[0];if(Math.abs(x-P.X(S.x))<18)return{move:mx=>{S.x=clamp(P.ix(mx),.05,7.6)}}},
readout(S){const f=FF[S.p.f][0],x=S.x,dx=S.p.dx;const A_=simpson(f,0,x,200),A2=simpson(f,0,x+dx,200);return[['x',nf(x,2)],['f(x)',nf(f(x),3),'blue'],['A(x)',nf(A_,3),'teal'],['ΔA / dx',nf((A2-A_)/dx,3),'yellow']]}
});
}

/* ---------- 22. Omdreiningslegemer ---------- */
{
const OF={kjegle:[x=>.5*x,0,4,'½x'],kule:[x=>Math.sqrt(Math.max(0,4-x*x)),-2,2,'√(4 − x²)'],rot:[x=>Math.sqrt(Math.max(0,x)),0,4,'√x'],bolge:[x=>1+.5*Math.sin(1.5*x),0,4,'1 + ½ sin 1,5x']};
const vol=(f,a,b)=>PI*simpson(x=>f(x)**2,a,b,600);
const vdisc=(f,a,b,n)=>{if(!n)return NaN;const d=(b-a)/n;let s=0;for(let i=0;i<n;i++)s+=f(a+(i+.5)*d)**2*d;return PI*s};
M({id:'ma-omdreining',s:'ma',c:['R2'],title:'Volum av omdreiningslegemer',short:'Omdreiningslegemer',kw:'volum integral rotasjon skiver kjegle kule omdreiningslegeme',
lead:'Når grafen roterer 360° om $x$-aksen, lager den en romfigur. Vi deler figuren i tynne skiver. Hver skive er en sylinder med volum $\\pi r^2\\,\\Delta x$.',
controls:[{id:'f',type:'seg',label:'Kurve',value:'kjegle',options:[['kjegle','Kjegle: ½x'],['kule','Kule'],['rot','√x'],['bolge','Bølge']]},{id:'n',label:'Antall skiver',min:0,max:30,step:1,value:8},{type:'btns',items:[['Roter på nytt',S=>{S.rot=0}]]}],
tex:['V=\\pi\\int_a^b \\bigl(f(x)\\bigr)^2\\,dx','V_{\\text{skive}}=\\pi\\,\\cY{r}^2\\,\\Delta x,\\quad r=f(x)'],
about:['Den blå kurven er $f(x)$. Den gule kurven viser hvor langt rotasjonen har kommet. Rutenettet er overflaten som oppstår.','Hver turkis skive har radius $f(x)$ midt i intervallet. Summen av skivene nærmer seg det eksakte volumet når skivene blir tynne.','Kjeglen gir den kjente formelen $V=\\frac13\\pi r^2 h$, og halvsirkelen gir kulas volum $V=\\frac43\\pi r^3$.'],
tasks:['Bruk kjeglen ($r=2$, $h=4$). Sjekk at volumet blir $\\frac13\\pi r^2h$.','Hvor mange skiver trengs før feilen er under 1 % for rotkurven?','Vis med integralet at kula med radius 2 har volum $\\frac{32\\pi}{3}$.','Hvorfor står $f(x)$ i andre potens i formelen?'],
init(S){S.rot=0},
change(S,id){if(id==='f')S.rot=0},
update(S,dt){if(S.rot<TAU)S.rot=Math.min(TAU,S.rot+dt*1.4)},
draw(S){const[f,a,b]=OF[S.p.f];let rm=0;for(let i=0;i<=60;i++)rm=Math.max(rm,f(a+(b-a)*i/60));const P=Plane(a-.9,b+1.1,-rm*1.4,rm*1.4,pad(S,30),true);P.grid(1,{alpha:.08});
 const q=.3,pt=(x,r,s)=>[P.X(x)+q*r*Math.sin(s)*P.sx,P.Y(r*Math.cos(s))];const rot=S.rot,n=Math.round(S.p.n);
 ln(P.l,P.Y(0),P.l+P.w,P.Y(0),A(C.fg,.55),1.4,[8,5]);Tm('x',P.l+P.w-6,P.Y(0)-14,{a:'right',c:C.fg2});
 if(n>0){const d=(b-a)/n;for(let i=0;i<n;i++){const x0=a+i*d,r=f(x0+d/2);const rx=q*r*P.sx,ry=r*P.sy;X.beginPath();X.ellipse(P.X(x0),P.Y(0),rx,ry,0,0,TAU);X.fillStyle=A(C.teal,.1);X.fill();rct(P.X(x0),P.Y(r),d*P.sx,2*ry,null,A(C.teal,.12));ln(P.X(x0),P.Y(r),P.X(x0+d),P.Y(r),A(C.teal,.7),1.2);ln(P.X(x0),P.Y(-r),P.X(x0+d),P.Y(-r),A(C.teal,.7),1.2);X.beginPath();X.ellipse(P.X(x0+d),P.Y(0),rx,ry,0,0,TAU);X.fillStyle=A(C.teal,.2);X.fill();X.strokeStyle=A(C.teal,.8);X.lineWidth=1.2;X.stroke()}}
 for(let j=0;j<=18;j++){const x=a+(b-a)*j/18,r=f(x);if(r<1e-3)continue;const ps=[];for(let k=0;k<=40;k++)ps.push(pt(x,r,rot*k/40));pth(ps,A(C.blue,.35),1.2)}
 for(let s=PI/6;s<rot-1e-6;s+=PI/6){const ps=[];for(let k=0;k<=80;k++){const x=a+(b-a)*k/80;ps.push(pt(x,f(x),s))}pth(ps,A(C.blue,.3),1.2)}
 const p0=[],pr_=[];for(let k=0;k<=120;k++){const x=a+(b-a)*k/120;p0.push(pt(x,f(x),0));pr_.push(pt(x,f(x),rot))}
 pth(p0,C.blue,3.2);if(rot>.02&&rot<TAU-.01)pth(pr_,C.yellow,2.6);
 const V=vol(f,a,b),Vd=vdisc(f,a,b,n);infoBox(P.l+8,P.t+8,[[`f(x) = ${OF[S.p.f][3]},  ${nf(a,0)} ≤ x ≤ ${nf(b,0)}`,C.blue],[`V = ${nf(V,4)}`,C.fg],[n?`skiver: ${nf(Vd,4)}  (feil ${nf(100*(Vd-V)/V,2)} %)`:'skiver: av',C.teal]],{s:12.5})},
readout(S){const[f,a,b]=OF[S.p.f];const V=vol(f,a,b),n=Math.round(S.p.n);return[['V',nf(V,4)],['V / π',nf(V/PI,4)],['skiver',n?nf(vdisc(f,a,b,n),4):'–','teal'],['rotert',nf(deg(S.rot),0)+'°','yellow']]}
});
}

/* ---------- 23. Rekker ---------- */
{
const term=(p,i)=>p.mode==='geo'?p.a1*Math.pow(p.k,i-1):p.a1+(i-1)*p.d;
M({id:'ma-rekker',s:'ma',c:['R2','S2'],title:'Følger og rekker',short:'Følger og rekker',kw:'rekke følge geometrisk aritmetisk konvergens divergens kvotient sum uendelig rekursjon',
lead:'En rekke er en sum av ledd. Den øverste trappen viser hvordan summen vokser ledd for ledd. En geometrisk rekke med $|k|<1$ nærmer seg en grense.',
controls:[{id:'mode',type:'seg',label:'Rekke',value:'geo',options:[['geo','Geometrisk'],['ari','Aritmetisk']]},{id:'a1',label:'Første ledd <i>a</i>₁',min:-4,max:5,step:.1,value:4},{id:'k',label:'Kvotient <i>k</i>',min:-1.2,max:1.2,step:.05,value:.5,show:S=>S.p.mode==='geo'},{id:'d',label:'Differanse <i>d</i>',min:-2,max:2,step:.1,value:.5,show:S=>S.p.mode==='ari'},{id:'n',label:'Antall ledd <i>n</i>',min:1,max:30,step:1,value:12}],
tex:['a_{n+1}=k\\cdot a_n,\\qquad S_n=a_1\\frac{k^n-1}{k-1}','S=\\frac{a_1}{1-k}\\quad\\text{når } -1<k<1','a_{n+1}=a_n+d,\\qquad S_n=\\frac{n\\,(a_1+a_n)}{2}'],
about:['Hver rad i trappen er ett nytt ledd. Raden starter der forrige sum sluttet. Den grønne streken er grensen for den uendelige rekken.','I en geometrisk rekke ganges hvert ledd med $k$. Er $|k|<1$, krymper leddene så fort at summen <strong>konvergerer</strong>.','Med negativ $k$ hopper summen fram og tilbake rundt grensen. Med $|k|\\ge 1$ divergerer rekken.','Rekursive formler som $a_{n+1}=k\\cdot a_n$ er lette å programmere med en løkke.'],
tasks:['Med $a_1=4$ og $k=0{,}5$: hva er summen av den uendelige rekken?','Sett $k=-0{,}8$. Beskriv hvordan delsummene oppfører seg.','En aritmetisk rekke har $a_1=2$ og $d=3$. Hva er $S_{20}$?','Paradokset om Akilles og skilpadden: hvordan løser en konvergent rekke det?'],
init(S){S.t=0},change(S){S.t=0},
draw(S){const p=S.p,n=Math.round(p.n),shown=Math.min(n,1+Math.floor(S.t*3));const terms=[],sums=[];let s=0;for(let i=1;i<=n;i++){const a=term(p,i);terms.push(a);s+=a;sums.push(s)}
 const conv=p.mode==='geo'&&Math.abs(p.k)<1,lim=conv?p.a1/(1-p.k):null;const[b1,b2]=rows(pad(S,30,26,26),[1,1.15],26);
 let lo=Math.min(0,...sums.slice(0,shown)),hi=Math.max(0,...sums.slice(0,shown));if(lim!==null){lo=Math.min(lo,lim);hi=Math.max(hi,lim)}if(hi-lo<1)hi=lo+1;const P1=Plane(lo-(hi-lo)*.05,hi+(hi-lo)*.05,0,n,b1);
 ln(P1.X(0),P1.t,P1.X(0),P1.t+P1.h,A(C.fg,.5),1.2);T('0',P1.X(0),P1.t-9,{a:'center',f:'n',s:11,c:C.fg3});
 if(lim!==null){ln(P1.X(lim),P1.t,P1.X(lim),P1.t+P1.h,C.green,1.8,[6,5]);T('S = '+nf(lim,3),P1.X(lim),P1.t-9,{a:'center',f:'n',s:12,c:C.green})}
 const rh=P1.h/n;for(let i=0;i<shown;i++){const s0=i?sums[i-1]:0,s1=sums[i];const c=i%2?C.teal:C.blue;rct(Math.min(P1.X(s0),P1.X(s1)),P1.t+i*rh+rh*.12,Math.abs(P1.X(s1)-P1.X(s0)),Math.max(1.5,rh*.76),null,A(c,.85))}
 const yl=Math.min(0,...terms,...sums),yh=Math.max(0,...terms,...sums,lim??0);const P2=Plane(0,n+1,yl-(yh-yl)*.08,yh+(yh-yl)*.12,b2);P2.axes({xs:n>15?5:1,ys:niceStep((yh-yl)/4),xl:'n',ls:15});
 if(lim!==null){ln(P2.l,P2.Y(lim),P2.l+P2.w,P2.Y(lim),C.green,1.6,[6,5])}
 const bw=Math.min(16,P2.sx*.4);for(let i=0;i<shown;i++){rct(P2.X(i+1)-bw/2,Math.min(P2.Y(terms[i]),P2.Y(0)),bw,Math.abs(P2.Y(terms[i])-P2.Y(0)),null,A(C.blue,.45))}
 const ps=sums.slice(0,shown).map((s,i)=>P2.pt(i+1,s));pth(ps,A(C.yellow,.6),1.6);ps.forEach(q=>dot(...q,4,C.yellow));
 rct(P2.l+P2.w-118,P2.t+2,10,10,null,A(C.blue,.6));T('ledd aₙ',P2.l+P2.w-102,P2.t+7,{s:12,c:C.fg2});dot(P2.l+P2.w-113,P2.t+24,4,C.yellow);T('sum Sₙ',P2.l+P2.w-102,P2.t+24,{s:12,c:C.fg2})},
readout(S){const p=S.p,n=Math.round(p.n);let s=0;for(let i=1;i<=n;i++)s+=term(p,i);const r=[[`a${sub(n)}`,nf(term(p,n),4),'blue'],[`S${sub(n)}`,nf(s,4),'yellow']];if(p.mode==='geo')r.push(['S∞',Math.abs(p.k)<1?nf(p.a1/(1-p.k),4):'divergerer','green']);return r},
live(S){const p=S.p,n=Math.round(p.n);return p.mode==='geo'?`S_{${n}}=${tn(p.a1,1)}\\cdot\\frac{${tn(p.k,2)}^{${n}}-1}{${tn(p.k,2)}-1}`:`S_{${n}}=\\frac{${n}\\,(${tn(p.a1,1)}${tsg(term(p,n),1)})}{2}`}
});
}

/* ---------- 24. Grensekostnad og grenseinntekt ---------- */
{
const Kf=(v,x)=>v.a*x*x+v.b*x+v.c;
M({id:'ma-okonomi',s:'ma',c:['S1','S2'],title:'Kostnad, inntekt og overskudd',short:'Grensekostnad',kw:'økonomi kostnadsfunksjon inntektsfunksjon overskudd grensekostnad grenseinntekt enhetskostnad optimering derivasjon',
lead:'Overskuddet er størst når den neste enheten koster like mye å lage som den gir i inntekt. Da er grensekostnaden lik grenseinntekten: $K\'(x)=I\'(x)$.',
hint:'Dra den loddrette linjen for å velge produksjonsmengde.',
controls:[{id:'p',label:'Pris per enhet <i>p</i>',min:15,max:80,step:1,value:40,unit:'kr'},{id:'c',label:'Faste kostnader',min:0,max:6000,step:100,value:2000,unit:'kr'},{id:'b',label:'Variabel kostnad <i>b</i>',min:0,max:30,step:1,value:10,unit:'kr'},{id:'a',label:'Krumning <i>a</i>',min:.01,max:.15,step:.005,value:.05,d:3}],
tex:['K(x)=ax^2+bx+c,\\qquad I(x)=p\\,x','O(x)=I(x)-K(x)','O\'(x)=0\\iff \\cR{K\'(x)}=\\cG{I\'(x)}','E(x)=\\frac{K(x)}{x}\\ \\text{minst der }E(x)=K\'(x)'],
about:['Den røde kurven er kostnadene $K(x)$ og den grønne er inntektene $I(x)=px$. Avstanden mellom dem er overskuddet.','I optimum er tangenten til kostnadskurven parallell med inntektslinjen. Begge har stigningstall $p$.','Nederst ser du grensekostnaden $K\'(x)$, prisen $p$ (grenseinntekten) og enhetskostnaden $E(x)$. Enhetskostnaden er lavest der den krysser grensekostnaden.'],
tasks:['Finn produksjonsmengden som gir størst overskudd ved regning. Sjekk med figuren.','Hva skjer med optimal produksjon når de faste kostnadene øker? Forklar hvorfor.','Hvor lav kan prisen bli før bedriften ikke kan tjene penger?','Finn minste enhetskostnad. Hvorfor er den lik $K\'(x)$ der?'],
init(S){S.x=200},
draw(S){const v=S.v;const[b1,b2]=rows(pad(S,30,26,28),[1.5,1],32);b1.l+=30;b1.w-=30;b2.l+=30;b2.w-=30;const ymax=Math.max(v.p*500,Kf(v,500))*1.05;
 const P=Plane(0,500,0,ymax,b1),Q=Plane(0,500,0,Math.max(v.p,2*v.a*500+v.b)*1.15,b2);S.Ps=[P,Q];const ys=niceStep(ymax/5);
 P.grid(50,{sy:ys,minor:false,alpha:.1});P.axes({xs:100,ys,xl:'enheter',ls:14,x0:true});Q.grid(50,{sy:niceStep(Q.y1/4),minor:false,alpha:.1});Q.axes({xs:100,ys:niceStep(Q.y1/4),ls:14,x0:true});
 const I=x=>v.p*x,K=x=>Kf(v,x);const segs=[];let st=0,sg=I(0)>K(0);for(let i=1;i<=200;i++){const x=500*i/200,s=I(x)>K(x);if(s!==sg||i===200){segs.push([st,x,sg]);st=x;sg=s}}
 segs.forEach(([x0,x1,g])=>{const ps=[];for(let k=0;k<=40;k++){const x=x0+(x1-x0)*k/40;ps.push(P.pt(x,I(x)))}for(let k=40;k>=0;k--){const x=x0+(x1-x0)*k/40;ps.push(P.pt(x,K(x)))}P.clip(()=>poly(ps,null,A(g?C.green:C.red,.12)))});
 const xo=(v.p-v.b)/(2*v.a);if(xo>0&&xo<500){P.clip(()=>ln(P.X(xo-140),P.Y(K(xo)-140*v.p),P.X(xo+140),P.Y(K(xo)+140*v.p),A(C.red,.7),1.6,[6,5]));[P,Q].forEach(R=>ln(R.X(xo),R.t,R.X(xo),R.t+R.h,A(C.yellow,.55),1.3,[4,5]));dot(P.X(xo),P.Y(K(xo)),5,C.yellow);T('størst overskudd',P.X(xo)+6,P.t+12,{s:12,c:C.yellow})}
 P.fn(K,C.red,3);P.fn(I,C.green,3);Tm('K(x)',P.X(470),P.Y(K(470))-14,{c:C.red,a:'right',s:16});Tm('I(x)',P.X(70),P.Y(I(70))-14,{c:C.green,a:'center',s:16});
 Q.fn(x=>2*v.a*x+v.b,C.red,2.6);Q.fn(()=>v.p,C.green,2.6);Q.fn(x=>x>8?K(x)/x:NaN,C.purple,2.4,{from:8});Tm('K′(x)',Q.X(490),Q.Y(2*v.a*490+v.b)-12,{c:C.red,a:'right',s:15});Tm('p = I′(x)',Q.l+6,Q.Y(v.p)-12,{c:C.green,s:15});Tm('E(x)',Q.X(60),Q.Y(K(60)/60)>Q.t+10?Q.Y(Math.min(K(60)/60,Q.y1*.95))-10:Q.t+12,{c:C.purple,s:15});
 const x=S.x;[P,Q].forEach(R=>ln(R.X(x),R.t,R.X(x),R.t+R.h,A(C.fg,.5),1.3));const o=I(x)-K(x);ln(P.X(x),P.Y(K(x)),P.X(x),P.Y(I(x)),o>=0?C.green:C.red,4);T(`O = ${nf(o,0)} kr`,P.X(x)+8,(P.Y(K(x))+P.Y(I(x)))/2,{f:'n',s:12,c:o>=0?C.green:C.red,bg:A(C.stage,.8)});handle(P.X(x),P.t+8,C.fg,S)},
pick(S,x,y){if(!S.Ps)return;const P=S.Ps[0];if(Math.abs(x-P.X(S.x))<18)return{move:mx=>{S.x=clamp(Math.round(P.ix(mx)),1,500)}}},
readout(S){const v=S.p,x=S.x,K=Kf(v,x),I=v.p*x,xo=(v.p-v.b)/(2*v.a);return[['x',x],['K(x)',nf(K,0)+' kr','red'],['I(x)',nf(I,0)+' kr','green'],['O(x)',nf(I-K,0)+' kr'],["K′(x)",nf(2*v.a*x+v.b,2)+' kr','red'],['E(x)',nf(K/x,2)+' kr','purple'],['optimum',xo>0&&xo<=500?nf(xo,0)+' enheter':'utenfor','yellow']]},
live(S){const v=S.p,x=S.x;return`O(${x})=${tn(v.p,0)}\\cdot ${x}-\\bigl(${tn(v.a,3)}\\cdot ${x}^2+${tn(v.b,0)}\\cdot ${x}+${tn(v.c,0)}\\bigr)=${tn(v.p*x-Kf(v,x),0)}`}
});
}

/* ---------- 25. Bevis uten ord ---------- */
{
const PAL=()=>[C.blue,C.yellow,C.teal,C.red,C.green,C.gold,C.purple,C.pink,C.blue,C.yellow];
M({id:'ma-bevis',s:'ma',c:['1T','R2'],title:'Bevis uten ord',short:'Bevis uten ord',kw:'bevis induksjon oddetall kvadrattall trekanttall geometrisk rekke figurtall',
lead:'Noen sammenhenger kan bevises med en figur. Se på hvordan bitene passer sammen, og prøv å skrive beviset med symboler etterpå.',
controls:[{id:'mode',type:'seg',label:'Påstand',value:'odd',options:[['odd','Sum av oddetall'],['tri','Trekanttall'],['geo','½ + ¼ + ⅛ + …']]},{id:'n',label:'<i>n</i>',min:1,max:10,step:1,value:6,show:S=>S.p.mode!=='geo'}],
tex:['1+3+5+\\dots+(2n-1)=n^2','1+2+3+\\dots+n=\\frac{n(n+1)}{2}','\\tfrac12+\\tfrac14+\\tfrac18+\\dots=1'],
about:['<strong>Oddetall:</strong> hvert nytt oddetall er en L-formet vinkel som gjør et kvadrat ett hakk større. Etter $n$ vinkler har du et $n\\times n$-kvadrat.','<strong>Trekanttall:</strong> to like trapper passer sammen til et rektangel med sider $n$ og $n+1$. Én trapp er halvparten av rektangelet.','<strong>Geometrisk rekke:</strong> hver bit er halvparten av det som er igjen av kvadratet. Bitene fyller hele kvadratet, men ingen enkelt bit gjør det ferdig.','Det samme kan bevises med <strong>induksjon</strong>: anta at formelen stemmer for $n$, og vis at den da stemmer for $n+1$.'],
tasks:['Bevis $1+3+\\dots+(2n-1)=n^2$ med induksjon.','Bruk trekanttall-figuren til å regne ut $1+2+\\dots+100$.','Hvor stor del av kvadratet mangler etter 6 biter i den geometriske rekken?','Finn på en egen figur som viser $1+2+\\dots+n+\\dots+2+1=n^2$.'],
init(S){S.t=0},change(S){S.t=0},
draw(S){const mode=S.p.mode,n=Math.round(S.p.n),b=pad(S,30),col=PAL();const wide=isWide(S);const tb=wide?{l:b.l+b.w*.58,t:b.t,w:b.w*.42,h:b.h}:{l:b.l,t:b.t+b.h*.72,w:b.w,h:b.h*.28};const fb=wide?{l:b.l,t:b.t,w:b.w*.55,h:b.h}:{l:b.l,t:b.t,w:b.w,h:b.h*.68};
 if(mode==='odd'){const cyc=(n+2.5)*.8,ph=S.t%cyc;const cs=Math.min(fb.w,fb.h)*.92/n,x0=fb.l+(fb.w-cs*n)/2,y0=fb.t+(fb.h+cs*n)/2;let done=0;
  for(let k=1;k<=n;k++){const e=ease((ph-(k-1)*.8)/.5);if(e<=0)continue;done=k;for(let i=0;i<k;i++)for(let j=0;j<k;j++){if(Math.max(i,j)!==k-1)continue;const s=cs*(.5+.5*e);rr(x0+i*cs+(cs-s)/2+2,y0-(j+1)*cs+(cs-s)/2+2,s-4,s-4,3,null,A(col[(k-1)%col.length],.85*e))}T(String(2*k-1),x0+(k-.5)*cs,y0-k*cs-12,{a:'center',f:'n',s:12,c:A(col[(k-1)%col.length],e)})}
  const terms=[];for(let k=1;k<=done;k++)terms.push(2*k-1);Tm(terms.join(' + ')||' ',tb.l,tb.t+tb.h*.38,{s:20,c:C.fg});if(done)Tm(`= ${done*done} = ${done}²`,tb.l,tb.t+tb.h*.38+34,{s:24,c:C.yellow})}
 else if(mode==='tri'){const cyc=n*.35+3.5,ph=S.t%cyc;const cs=Math.min(fb.w/(n+.5),fb.h/(n+1.5))*.95,x0=fb.l+(fb.w-cs*n)/2,y0=fb.t+(fb.h+cs*(n+1))/2;
  for(let i=0;i<n;i++){const e=ease((ph-i*.35)/.3);if(e<=0)continue;for(let j=0;j<=i;j++)rr(x0+i*cs+2,y0-(j+1)*cs+2,cs-4,cs-4,3,null,A(C.blue,.85*e))}
  const e2=ease((ph-n*.35-.3)/1.2);if(e2>0){const off=(1-e2)*cs*(n+1)*.6;for(let i=0;i<n;i++)for(let j=i+1;j<=n;j++)rr(x0+i*cs+2+off,y0-(j+1)*cs+2-off*.3,cs-4,cs-4,3,null,A(C.yellow,.85*e2))}
  if(e2>.9){ln(x0,y0+12,x0+n*cs,y0+12,C.fg2,1.4);T('n = '+n,x0+n*cs/2,y0+26,{a:'center',f:'m',s:16,c:C.fg2});ln(x0-12,y0,x0-12,y0-(n+1)*cs,C.fg2,1.4);T('n + 1 = '+(n+1),x0-18,y0-(n+1)*cs/2,{a:'right',f:'m',s:16,c:C.fg2})}
  Tm(`1 + 2 + … + ${n}`,tb.l,tb.t+tb.h*.34,{s:20});Tm(`= ${n}·${n+1} / 2 = ${n*(n+1)/2}`,tb.l,tb.t+tb.h*.34+34,{s:24,c:C.yellow})}
 else{const cyc=8,ph=S.t%cyc,m=Math.min(10,Math.floor(ph/.6)+1);const s=Math.min(fb.w,fb.h)*.9;let r={x:fb.l+(fb.w-s)/2,y:fb.t+(fb.h-s)/2,w:s,h:s};rct(r.x,r.y,s,s,A(C.fg,.6),null,1.5);let sum=0;
  for(let k=0;k<m;k++){let pc;if(k%2===0){pc={x:r.x,y:r.y,w:r.w/2,h:r.h};r={x:r.x+r.w/2,y:r.y,w:r.w/2,h:r.h}}else{pc={x:r.x,y:r.y,w:r.w,h:r.h/2};r={x:r.x,y:r.y+r.h/2,w:r.w,h:r.h/2}}rct(pc.x+1.5,pc.y+1.5,pc.w-3,pc.h-3,null,A(col[k%col.length],.8));sum+=Math.pow(.5,k+1);if(k<5)T('1/'+Math.pow(2,k+1),pc.x+pc.w/2,pc.y+pc.h/2,{a:'center',f:'n',s:Math.max(10,15-k*1.5),c:C.stage,w:500})}
  Tm('½ + ¼ + ⅛ + …',tb.l,tb.t+tb.h*.34,{s:22});Tm(`etter ${m} biter: ${nf(sum,5)}`,tb.l,tb.t+tb.h*.34+34,{s:19,c:C.yellow});Tm(`mangler ${nf(1-sum,5)}`,tb.l,tb.t+tb.h*.34+64,{s:17,c:C.fg2})}}
});
}
