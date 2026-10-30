'use strict';
/* ================= MATEMATIKK (del 6): utenfor pensum, universitetsnivå ================= */
{
/* pent steg for akseinndeling: 1, 2 eller 5 ganger en tierpotens */
const stepOf=r=>{const e=Math.pow(10,Math.floor(Math.log10(r))),m=r/e;return(m<1.5?1:m<3.5?2:m<7.5?5:10)*e};
/* graf med valgfritt antall punkter (P.fn tegner for grovt for funksjoner som svinger uendelig fort) */
function curve(P,f,a,b,n,c,w=3){const e=a+(b-a)*INTRO;P.clip(()=>{X.beginPath();for(let i=0;i<=n;i++){const x=a+(e-a)*i/n,px=P.X(x),py=P.Y(f(x));i?X.lineTo(px,py):X.moveTo(px,py)}X.strokeStyle=c;X.lineWidth=w;X.lineJoin='round';X.lineCap='round';X.stroke()})}
/* boks med tekstlinjer, sentrert om x */
function centerBox(x,y,lines,s=12.5){const w=Math.max(...lines.map(l=>tw(l[0],{f:'n',s})))+20;return infoBox(x-w/2,y,lines,{s})}

/* ---------- Ekstremalpunkt uten fortegnsskifte ---------- */
const EF={
 x2:{f:x=>x*x,d:x=>2*x,fM:w=>w*w,dM:w=>2*w,pos:true,lab:'f(x) = x²',ok:[[1,'f′(0) = 0'],[1,'f′ skifter fortegn i 0'],[1,'bunnpunkt i 0']]},
 x3:{f:x=>x**3,d:x=>3*x*x,fM:w=>w**3,dM:w=>3*w*w,pos:false,lab:'f(x) = x³',ok:[[1,'f′(0) = 0'],[0,'f′ skifter ikke fortegn i 0'],[0,'ikke ekstremalpunkt i 0']]},
 abs:{f:Math.abs,d:x=>Math.sign(x),fM:w=>w,dM:()=>1,pos:true,lab:'f(x) = |x|',ok:[[0,'f′(0) finnes ikke'],[1,'f′ skifter fortegn i 0'],[1,'bunnpunkt i 0']]},
 osc:{f:x=>x===0?0:x**4*(2+Math.sin(1/x)),d:x=>x===0?0:4*x**3*(2+Math.sin(1/x))-x*x*Math.cos(1/x),fM:w=>3*w**4,dM:w=>12*w**3+w*w,pos:true,lab:'f(x) = x⁴(2 + sin 1/x)',ok:[[1,'f′(0) = 0'],[0,'f′ skifter fortegn uendelig ofte'],[1,'bunnpunkt i 0']]}};
/* fortegnslinje: grønn der f′ > 0, rød der f′ < 0, blandet der fortegnet skifter innenfor én piksel */
function signStrip(P,d,y,h){const n=Math.ceil(P.w);for(let i=0;i<n;i++){let pos=0,neg=0;for(let j=0;j<6;j++){const v=d(P.ix(P.l+i+(j+.5)/6));if(v>0)pos++;else if(v<0)neg++}if(pos+neg)rct(P.l+i,y,1.05,h,null,mix(C.red,C.green,pos/(pos+neg),.85))}rr(P.l,y,P.w,h,2,A(C.fg,.2),null,1)}
M({id:'ma-ekstremal',s:'ma',c:['UNI'],title:'Ekstremalpunkt uten fortegnsskifte',short:'Ekstremalpunkt uten fortegnsskifte',kw:'ekstremalpunkt bunnpunkt toppunkt nødvendig tilstrekkelig betingelse fortegnsskifte fortegnslinje derivert fermat x^3 oscillerer utenfor pensum universitet',
lead:'Utenfor pensum (universitetsnivå). Har $f$ et ekstremalpunkt der $f\'(x)=0$? Der $f\'$ skifter fortegn? Zoom inn mot $x=0$ og se en funksjon med bunnpunkt der $f\'$ skifter fortegn uendelig mange ganger på begge sider.',
hint:'Trykk «Zoom inn mot 0», eller dra den loddrette linjen.',
controls:[{id:'fn',type:'seg',label:'Funksjon',value:'osc',options:[['x2','x²'],['x3','x³'],['abs','|x|'],['osc','x⁴(2 + sin 1/x)']]},
 {id:'w',label:'Vindu: −<i>w</i> < <i>x</i> < <i>w</i>',min:.004,max:1.5,log:true,value:.2,fmt:v=>nfs(v,2)},
 {type:'btns',items:[['Zoom inn mot 0',S=>{S.anim={t:0,w0:S.p.w,w1:.004}}],['Zoom ut',S=>{S.anim={t:0,w0:S.p.w,w1:1}}]]}],
tex:['f(x)=\\begin{cases}x^4\\left(2+\\sin\\frac1x\\right)&x\\neq0\\\\0&x=0\\end{cases}',
 'x^4\\le f(x)\\le 3x^4\\;\\Rightarrow\\;f(0)=0\\text{ er et bunnpunkt}',
 'f\'(0)=\\lim_{h\\to0}\\frac{f(h)-f(0)}{h}=\\lim_{h\\to0}h^3\\left(2+\\sin\\tfrac1h\\right)=0',
 'f\'(x)=4x^3\\left(2+\\sin\\tfrac1x\\right)\\cR{\\;-\\;x^2\\cos\\tfrac1x}\\quad(x\\neq0)',
 '\\text{fortegnsskifte i }f\'\\;\\Rightarrow\\;\\text{ekstremalpunkt}\\;\\Rightarrow\\;f\'(a)=0\\ \\text{eller }f\'(a)\\text{ finnes ikke}'],
about:['Tre påstander blandes ofte sammen: (1) $f\'(a)=0$, (2) $f\'$ skifter fortegn i $a$ og (3) $f$ har et ekstremalpunkt i $a$. Fortegnsskiftet (2) er en <strong>tilstrekkelig</strong> betingelse for (3). Fermats setning sier at (3) gir (1) i et indre punkt der $f\'(a)$ finnes, så (1) er <strong>nødvendig</strong>. Ingen av pilene går motsatt vei: $x^3$ har $f\'(0)=0$ uten ekstremalpunkt, og den siste funksjonen har ekstremalpunkt uten fortegnsskifte.',
 'Siden $-1\\le\\sin\\frac1x\\le1$, ligger grafen mellom de stiplete kurvene $x^4$ og $3x^4$. Alle andre funksjonsverdier er positive, så $f(0)=0$ er den minste verdien. Det er et ekte bunnpunkt.',
 'Nær 0 er leddet $x^2\\cos\\frac1x$ mye større enn $4x^3(2+\\sin\\frac1x)$, fordi $x^2$ er mye større enn $x^3$ når $x$ er liten. Derfor har $f\'$ samme fortegn som $-\\cos\\frac1x$, og det skifter uendelig mange ganger på hver side av 0. Det finnes ikke noe intervall $(0,\\delta)$ der $f$ bare stiger. Grafen vugger opp og ned hele veien ned mot bunnen, og fortegnslinja under grafen blir en strekkode.',
 'Med $|x|$ ser du at $f\'(a)=0$ heller ikke er nødvendig når $f$ ikke er deriverbar i $a$. Det samme gjelder endepunkter, for eksempel $f(x)=x$ på $[0,1]$. En presis formulering er: <em>Ekstremalpunkter finnes blant punktene der $f\'=0$, punktene der $f\'$ ikke finnes, og endepunktene. Fortegnsskifte i $f\'$ er én måte å bekrefte et ekstremalpunkt på, ikke den eneste.</em>'],
tasks:['Bruk definisjonen av den deriverte og skvisesetningen til å vise at $f\'(0)=0$ for den siste funksjonen.','Zoom inn. Hvorfor ser du flere fortegnsskifter i $f\'$ jo nærmere 0 du kommer?','Er det et toppunkt eller et bunnpunkt i hvert av de små «hakkene» i grafen? Hvor mange er det?','Lag en funksjon med toppunkt i 0 der $f\'$ ikke skifter fortegn.','Er $f\'(a)=0$ en nødvendig betingelse for et ekstremalpunkt i $a$? Hva må du forutsette?'],
init(S){S.u=.6},
update(S,dt){if(S.anim){S.anim.t+=dt/6;const e=ease(S.anim.t);S.p.w=S.anim.w0*Math.pow(S.anim.w1/S.anim.w0,e);S.v.w=S.p.w;if(S===Stage.S)syncCtl('w');if(S.anim.t>=1)S.anim=null}},
change(S,id){if(id==='w')S.anim=null},
draw(S){const F=EF[S.p.fn],w=S.v.w,fm=F.fM(w),dm=F.dM(w);
 const [bf,bd,bs]=rows(pad(S,28,26,46),[1.6,1,.1],12);bs.h=Math.min(bs.h,16);
 const Pf=Plane(-w,w,F.pos?-.25*fm:-1.25*fm,1.25*fm,bf),Pd=Plane(-w,w,-1.3*dm,1.3*dm,bd);S.Pf=Pf;S.bs=bs;
 const xs=stepOf(w/2.2),yf=stepOf(fm/1.2),yd=stepOf(dm/.9);
 Pf.grid(xs,{sy:yf,minor:false,alpha:.1});Pf.axes({xs,ys:yf,yf:y=>nfs(y,2),xl:'x'});
 Pd.grid(xs,{sy:yd,minor:false,alpha:.1});Pd.axes({xs,ys:yd,yf:y=>nfs(y,2),xl:'x'});
 const n=S.p.fn==='osc'?2400:600;
 if(S.p.fn==='osc'){Pf.fn(x=>x**4,A(C.fg,.4),1.4,{dash:[5,5]});Pf.fn(x=>3*x**4,A(C.fg,.4),1.4,{dash:[5,5]});
  const xe=-.93*w;T('x⁴',Pf.X(xe),Pf.Y(xe**4)+13,{f:'m',s:14,c:C.fg3,a:'center'});T('3x⁴',Pf.X(xe),Pf.Y(3*xe**4)-13,{f:'m',s:14,c:C.fg3,a:'center'});
  Pd.fn(x=>x*x,A(C.red,.45),1.3,{dash:[5,5]});Pd.fn(x=>-x*x,A(C.red,.45),1.3,{dash:[5,5]})}
 curve(Pf,F.f,-w,w,n,C.blue,3);
 if(S.p.fn==='abs'){curve(Pd,F.d,-w,-w*1e-6,4,C.yellow,2.6);curve(Pd,F.d,w*1e-6,w,4,C.yellow,2.6);circ(Pd.X(0),Pd.Y(-1),5,C.yellow,C.stage,2);circ(Pd.X(0),Pd.Y(1),5,C.yellow,C.stage,2)}
 else{curve(Pd,F.d,-w,w,n,C.yellow,2.4);dot(Pd.X(0),Pd.Y(0),5.5,C.yellow)}
 dot(Pf.X(0),Pf.Y(0),6,C.fg);
 signStrip(Pd,F.d,bs.t,bs.h);T('fortegn til f′',bs.l+6,bs.t+bs.h/2,{s:11,c:C.fg,bg:A(C.stage,.85)});
 /* punkt som kan flyttes, med tangent */
 const x=S.u*w,y=F.f(x),m=F.d(x),dx=.22*w,tc=m>0?C.green:m<0?C.red:C.fg2;
 [Pf,Pd].forEach(P=>ln(P.X(x),P.t,P.X(x),P.t+P.h,A(C.fg,.45),1.3));ln(Pf.X(x),bs.t-2,Pf.X(x),bs.t+bs.h+2,C.fg,2);
 Pf.clip(()=>ln(Pf.X(x-dx),Pf.Y(y-m*dx),Pf.X(x+dx),Pf.Y(y+m*dx),tc,2.4));dot(Pf.X(x),Pf.Y(y),6,tc);dot(Pd.X(x),Pd.Y(m),5.5,tc);handle(Pf.X(x),Pf.t+10,C.fg,S);
 centerBox(Pf.X(0),Pf.t+6,[[F.lab,C.fg]].concat(F.ok.map(([o,t])=>[(o?'✓  ':'✗  ')+t,o?C.green:C.red])));
 Tm('f(x)',Pf.l+6,Pf.t+12,{c:C.blue});Tm('f′(x)',Pd.l+6,Pd.t+10,{c:C.yellow})},
pick(S,x,y){const P=S.Pf;if(!P)return;if(Math.abs(x-P.X(S.u*S.v.w))<16&&y>P.t-10&&y<S.bs.t+S.bs.h+6)return{move:mx=>{S.u=clamp(P.ix(mx)/S.v.w,-.98,.98)}}},
readout(S){const F=EF[S.p.fn],x=S.u*S.v.w,d=F.d(x);return[['w',nfs(S.v.w,3)],['x',nfs(x,3)],['f(x)',nfs(F.f(x),3),'blue'],['f′(x)',nfs(d,3),'yellow'],['',d>0?'f stiger her':d<0?'f synker her':'vannrett tangent']]}
});

/* ---------- Kontinuerlig kurve med uendelig buelengde ---------- */
const XS=x=>x<=0?0:x*Math.sin(PI/x);
const KMAX=10000,EMIN=1/KMAX,NMAX=12,NREF=30;
/* lengden av grafen fra x = 1/u0 til x = 1/u1, målt som en brukket linje med m biter (jevnt fordelt i u = 1/x) */
function humpLen(u0,u1,m){let L=0,px=1/u0,py=XS(px);for(let i=1;i<=m;i++){const x=1/(u0+(u1-u0)*i/m),y=XS(x);L+=Math.hypot(x-px,y-py);px=x;py=y}return L}
/* CUM[k]: lengden på [1/(k+1), 1], altså bølge 1 til k. LOW[k]: summen av 2/(j + 1/2) for j = 1..k */
let CUM=null,LOW=null;
function tables(){if(CUM)return;CUM=new Float64Array(KMAX+1);LOW=new Float64Array(KMAX+1);for(let k=1;k<=KMAX;k++){CUM[k]=CUM[k-1]+humpLen(k,k+1,48);LOW[k]=LOW[k-1]+2/(k+.5)}}
function lenXS(e){tables();const u=1/e,k=Math.min(KMAX,Math.floor(u));return CUM[k-1]+(u>k?humpLen(k,u,Math.max(2,Math.ceil(48*(u-k)))):0)}
const lowXS=e=>{tables();return LOW[Math.max(0,Math.min(KMAX,Math.floor(1/e)-1))]};
/* Takagi-kurven: sum av sagtenner s(2^k x)/2^k */
const saw=x=>Math.abs(x-Math.round(x));
function tak(x,n){let s=0,p=1;for(let k=0;k<=n;k++){s+=saw(p*x)/p;p*=2}return s}
/* Lengden etter n lag: stigningstallet på hver bit er en sum av n + 1 tall ±1, og alle fortegnskombinasjoner forekommer like ofte */
const TL=[];for(let n=0;n<=NREF;n++){const m=n+1;let L=0;for(let j=0;j<=m;j++)L+=nCk(m,j)/2**m*Math.sqrt(1+(m-2*j)**2);TL.push(L)}
/* x sin(π/x) mellom a og b. Der bølgene blir smalere enn noen få piksler, fylles området mellom −x og x */
function drawXS(P,a,b,c,w){const xc=clamp(Math.sqrt(3/P.sx),a,b);
 if(xc>a)P.clip(()=>poly([[P.X(a),P.Y(a)],[P.X(xc),P.Y(xc)],[P.X(xc),P.Y(-xc)],[P.X(a),P.Y(-a)]],null,A(c,.5)));
 if(b<=xc)return;const u0=1/b,u1=1/xc,n=Math.ceil((u1-u0)*28)+2;
 P.clip(()=>{X.beginPath();for(let i=0;i<=n;i++){const x=1/(u0+(u1-u0)*i/n),px=P.X(x),py=P.Y(XS(x));i?X.lineTo(px,py):X.moveTo(px,py)}X.strokeStyle=c;X.lineWidth=w;X.lineJoin='round';X.stroke()})}
M({id:'ma-buelengde',s:'ma',c:['UNI'],title:'Kontinuerlig kurve med uendelig buelengde',short:'Uendelig buelengde',kw:'buelengde lengde kontinuerlig uendelig takagi blancmange weierstrass fraktal harmonisk rekke divergerer x sin 1/x ingensteds deriverbar utenfor pensum universitet',
lead:'Utenfor pensum (universitetsnivå). En kontinuerlig funksjon på et lukket intervall kan ha en graf som er uendelig lang, selv om hele grafen får plass i en liten boks. Mål lengden med stadig finere oppløsning og se at tallet aldri slutter å vokse.',
hint:'Trykk «Spill av», eller dra den gule linjen mot 0.',
controls:[{id:'fn',type:'seg',label:'Funksjon',value:'xs',options:[['xs','x · sin(π/x)'],['tk','Takagi-kurven']]},
 {id:'e',label:'Mål fra <i>x</i> = <i>ε</i> til 1',min:EMIN,max:1,log:true,value:.1,fmt:v=>nfs(v,2),show:S=>S.p.fn==='xs'},
 {id:'bars',type:'check',label:'Vis bølgehøydene',value:true,show:S=>S.p.fn==='xs'},
 {id:'n',label:'Antall lag <i>n</i>',min:0,max:NMAX,step:1,value:2,show:S=>S.p.fn==='tk'},
 {type:'btns',items:[['Spill av',S=>{S.anim={t:0,e0:S.p.e}}],['Start på nytt',S=>{S.anim=null;setP('e',.1,S);setP('n',0,S)}]]}],
tex:['L=\\int_a^b\\sqrt{1+f\'(x)^2}\\,dx\\;\\approx\\;\\sum\\sqrt{\\Delta x^2+\\Delta y^2}',
 'f(x)=x\\sin\\frac{\\pi}{x},\\ f(0)=0:\\qquad L(\\varepsilon)\\ \\ge\\ \\cY{\\sum_{k=1}^{N}\\frac{2}{k+\\frac12}}\\ \\xrightarrow{N\\to\\infty}\\ \\infty',
 'T(x)=\\sum_{k=0}^{\\infty}\\frac{s(2^kx)}{2^k},\\qquad s(x)=\\text{avstanden fra }x\\text{ til nærmeste heltall}',
 'L_n=\\sum_{j=0}^{n+1}\\binom{n+1}{j}\\frac{1}{2^{n+1}}\\sqrt{1+(n+1-2j)^2}\\;\\approx\\;\\sqrt{\\tfrac{2n}{\\pi}}\\to\\infty'],
about:['Buelengde regnes ut ved å legge sammen mange små rette biter, $\\sqrt{\\Delta x^2+\\Delta y^2}$. Funksjonen $x\\sin\\frac{\\pi}{x}$ er kontinuerlig på hele $[0,1]$: den ligger mellom $-x$ og $x$, så den går mot $0$ når $x\\to0$. Men den rekker å svinge uendelig mange ganger før den kommer fram til origo.',
 'Bølge nummer $k$ ligger mellom $x=\\frac{1}{k+1}$ og $x=\\frac1k$. Den går fra 0 opp eller ned til høyden $\\frac{1}{k+1/2}$ og tilbake, så den er minst dobbelt så lang som de <strong>gule</strong> strekene. Summen av høydene er (nesten) den harmoniske rekken, som divergerer. Hver gang $\\varepsilon$ blir ti ganger mindre, blir grafen omtrent $2\\ln 10\\approx4{,}6$ lenger.',
 'Takagi-kurven lages ved å legge sammen sagtenner som blir halvparten så høye og dobbelt så tette for hvert lag. Hvert nytt lag gjør stigningstallet på hver bit én større eller én mindre, så stigningstallet oppfører seg som en tilfeldig vandring. Lengden vokser omtrent som $\\sqrt n$, sakte, men uten grense.',
 'Grensekurven $T$ er kontinuerlig overalt, men <strong>deriverbar ingen steder</strong>, og grafen er uendelig lang over hvert eneste intervall, uansett hvor lite det er. Weierstrass publiserte den første slike funksjonen i 1872, og den sjokkerte mange matematikere. Lærdommen: «kontinuerlig» betyr «uten brudd», ikke «pen».'],
tasks:['Bruk skvisesetningen til å vise at $x\\sin\\frac{\\pi}{x}$ er kontinuerlig i 0 når vi definerer $f(0)=0$.','Les av $L(\\varepsilon)$ for $\\varepsilon=0{,}1$, $0{,}01$ og $0{,}001$. Hvor mye vokser lengden for hver tierpotens?','Hvorfor har $x^2\\sin\\frac{\\pi}{x}$ endelig lengde på $[0,1]$? Se på bølgehøydene.','Takagi: hvor mange rette biter har grafen etter $n$ lag, og hvilke stigningstall kan bitene ha?','Grafen til $T$ har uendelig lengde, men areal under seg. Hvorfor er ikke det en selvmotsigelse?'],
update(S,dt){if(!S.anim)return;S.anim.t+=dt;const t=S.anim.t;
 if(S.p.fn==='xs'){const k=clamp(t/7,0,1);S.p.e=Math.max(EMIN,S.anim.e0*Math.pow(EMIN/S.anim.e0,ease(k)));S.v.e=S.p.e;if(S===Stage.S)syncCtl('e');if(k>=1)S.anim=null}
 else{const n=Math.min(NMAX,Math.floor(t/.9));if(n!==S.p.n){S.p.n=n;if(S===Stage.S)syncCtl('n')}if(n>=NMAX)S.anim=null}},
change(S,id){if(id==='e'||id==='n'||id==='fn')S.anim=null},
draw(S){const xs=S.p.fn==='xs';const[bm,br]=split(S,.6,{g:44,b:pad(S,30,30,56)});bm.l+=26;bm.w-=26;
 if(xs){const e=S.v.e,P=Plane(0,1,-1.05,1.05,bm);S.P=P;P.grid(.1,{sy:.5,minor:false,alpha:.1});P.axes({xs:.2,ys:.5,xl:'x',yl:'y'});
  P.fn(x=>x,A(C.fg,.35),1.3,{dash:[5,5]});P.fn(x=>-x,A(C.fg,.35),1.3,{dash:[5,5]});
  drawXS(P,1e-6,e,C.fg3,1.4);drawXS(P,e,1,C.blue,2.6);
  if(S.p.bars){const N=Math.floor(1/e)-1;for(let k=1;k<=N;k++){const x=1/(k+.5);if(x*x*P.sx<2.5)break;ln(P.X(x),P.Y(0),P.X(x),P.Y(XS(x)),C.yellow,2.2)}}
  ln(P.X(e),P.t,P.X(e),P.t+P.h,A(C.yellow,.6),1.4,[5,4]);handle(P.X(e),P.Y(0),C.yellow,S);Tm('ε',P.X(e)+8,P.t+12,{c:C.yellow,s:17});
  T('f(x) = x · sin(π/x)',P.l+P.w-4,P.t+12,{f:'n',s:13,c:C.blue,a:'right',bg:A(C.stage,.75)});
  /* lengden som funksjon av ε, med logaritmisk ε-akse */
  const Q=Plane(0,4.15,0,23,br);Q.grid(1,{sy:5,minor:false,alpha:.1});Q.axes({xs:1,ys:5,x0:true,xf:v=>['1','0,1','0,01','0,001','10⁻⁴'][Math.round(v)]||'',xl:'ε',yl:'L'});
  lab(br,'Lengden L(ε) av grafen fra ε til 1');
  const le=Math.log10(1/e);
  Q.fn(v=>lowXS(10**-v),A(C.yellow,.55),2,{to:4});Q.fn(v=>lenXS(10**-v),A(C.blue,.35),2,{to:4});Q.fn(v=>lenXS(10**-v),C.blue,3,{to:le,prog:1});
  dot(Q.X(le),Q.Y(lenXS(e)),6.5,C.blue);dot(Q.X(le),Q.Y(lowXS(e)),5,C.yellow);
  T('≈ 2 ln(1/ε) → ∞',Q.X(2.2),Q.Y(2*Math.log(10**2.2)+1.4)-24,{f:'n',s:12.5,c:C.fg2,a:'right'})}
 else{const v=S.v.n,n0=Math.min(NMAX-1,Math.floor(v)),fr=v-n0,m=2**(n0+2),P=Plane(0,1,-.05,.75,bm);S.P=P;
  P.grid(.1,{sy:.1,minor:false,alpha:.1});P.axes({xs:.2,ys:.2,xl:'x',yl:'y'});
  const T0=[];for(let i=0;i<=m;i++){const x=i/m;T0.push(P.pt(x,n0>0?tak(x,n0-1):0))}
  pth(T0,A(C.fg,.25),1.4);
  /* lag n0 + 1 kommer gradvis til når glidebryteren er mellom to heltall */
  const cur=[];for(let i=0;i<=m;i++){const x=i/m;cur.push(P.pt(x,tak(x,n0)+fr*saw(2**(n0+1)*x)/2**(n0+1)))}
  pth(cur,C.blue,2.4,INTRO);
  T('T(x) = Σ s(2ᵏx)/2ᵏ',P.l+P.w-4,P.t+12,{f:'n',s:13,c:C.blue,a:'right'});
  const Q=Plane(-.5,NREF+.5,0,5,br);Q.grid(5,{sy:1,minor:false,alpha:.1});Q.axes({xs:5,ys:1,xl:'n',yl:'L',x0:true});
  lab(br,'Lengden Lₙ av grafen etter n lag');
  Q.fn(x=>Math.sqrt(2*Math.max(x,0)/PI),A(C.fg,.4),1.4,{dash:[5,5]});T('√(2n/π)',Q.X(20),Q.Y(Math.sqrt(40/PI))+18,{f:'n',s:12,c:C.fg3,a:'left'});
  const nn=Math.round(S.p.n);TL.forEach((L,k)=>dot(Q.X(k),Q.Y(L),k===nn?6.5:3.5,k<=nn?C.blue:A(C.blue,.3)))}},
pick(S,x,y){const P=S.P;if(!P||S.p.fn!=='xs')return;if(Math.abs(x-P.X(S.v.e))<16&&P.in(x,y,10))return{move:mx=>{const e=clamp(P.ix(mx),EMIN,1);S.p.e=S.v.e=e;S.anim=null;syncCtl('e')}}},
readout(S){if(S.p.fn==='xs'){const e=S.p.e;return[['ε',nfs(e,3)],['L(ε)',nf(lenXS(e),3),'blue'],['sum av gule',nf(lowXS(e),3),'yellow'],['hele bølger',String(Math.max(0,Math.floor(1/e)-1))]]}
 const n=Math.round(S.p.n);return[['n',String(n)],['rette biter',nf(2**(n+1),0)],['Lₙ',nf(TL[n],4),'blue']]}
});

/* ---------- Deriverbar, men ikke kontinuerlig deriverbar ---------- */
const G=x=>x===0?0:x*x*Math.sin(1/x),Gd=x=>x===0?0:2*x*Math.sin(1/x)-Math.cos(1/x);
const HMIN=.002,W0=.75,winOf=S=>S.p.zoom?Math.min(W0,2.6*S.p.h):W0;
M({id:'ma-ikkec1',s:'ma',c:['UNI'],title:'Deriverbar, men ikke kontinuerlig deriverbar',short:'Deriverbar, men ikke C¹',kw:'deriverbar kontinuerlig deriverbar C1 derivert diskontinuerlig x^2 sin 1/x sekant tangent darboux oscillerer utenfor pensum universitet',
lead:'Utenfor pensum (universitetsnivå). Funksjonen $x^2\\sin\\frac1x$ har en derivert i alle punkter, også i $x=0$. Men $f\'$ er ikke kontinuerlig: når $h\\to0$, legger sekanten fra origo seg flat, mens tangenten i $x=h$ fortsetter å vippe.',
hint:'Trykk «La h → 0», eller dra det rosa punktet.',
controls:[{id:'h',label:'<i>h</i>',min:HMIN,max:.6,log:true,value:.35,fmt:v=>nfs(v,2)},
 {id:'zoom',type:'check',label:'Zoom inn sammen med <i>h</i>',value:false},
 {id:'tan',type:'check',label:'Vis tangenten i <i>x = h</i>',value:true},
 {type:'btns',items:[['La h → 0',S=>{S.anim={t:0,h0:S.p.h}}],['Start på nytt',S=>{S.anim=null;setP('h',.35,S)}]]}],
tex:['f(x)=\\begin{cases}x^2\\sin\\frac1x&x\\neq0\\\\0&x=0\\end{cases}',
 'f\'(0)=\\lim_{h\\to0}\\cY{\\frac{f(h)-f(0)}{h}}=\\lim_{h\\to0}h\\sin\\frac1h=0',
 'f\'(x)=\\cK{2x\\sin\\frac1x-\\cos\\frac1x}\\quad(x\\neq0)',
 '\\lim_{x\\to0}f\'(x)\\text{ finnes ikke}\\;\\Rightarrow\\;f\'\\text{ er ikke kontinuerlig i }0'],
about:['Den deriverte i 0 må regnes ut fra definisjonen. Stigningstallet til den <strong>gule</strong> sekanten fra origo er $\\frac{f(h)}{h}=h\\sin\\frac1h$, som ligger mellom $-|h|$ og $|h|$. Skvisesetningen gir $f\'(0)=0$.',
 'For $x\\neq0$ gir produktregelen og kjerneregelen $f\'(x)=2x\\sin\\frac1x-\\cos\\frac1x$. Det første leddet går mot 0, men $\\cos\\frac1x$ svinger mellom $-1$ og $1$ uendelig mange ganger når $x\\to0$. Derfor vipper den <strong>rosa</strong> tangenten helt til siste slutt, og $f\'(x)$ har ingen grenseverdi i 0.',
 'Altså er $f$ deriverbar i alle punkter, men $f\'$ er ikke kontinuerlig i 0. Vi sier at $f$ er deriverbar, men ikke <strong>kontinuerlig deriverbar</strong>. Funksjonene med kontinuerlig derivert kalles $C^1$-funksjoner.',
 'Slå på zoom og la $h\\to0$. Etter hvert får aksene lik skala, og da ser grafen ut som en flat linje gjennom origo, slik grafen til en deriverbar funksjon gjør når du zoomer inn nok. Men de bittesmå bølgene har fortsatt tangenter med stigningstall nær $\\pm1$.',
 'En derivert kan aldri ha et vanlig sprang. Darboux’ setning sier at en derivert alltid tar alle verdier mellom to verdier den har. En diskontinuitet i $f\'$ må derfor se ut som denne: uendelig rask svingning. Det er samme mekanisme som i «Ekstremalpunkt uten fortegnsskifte».'],
tasks:['Bruk definisjonen av den deriverte til å vise at $f\'(0)=0$.','Regn ut $f\'(x)$ for $x=\\frac{1}{2\\pi n}$ og for $x=\\frac{1}{(2n+1)\\pi}$. Hva sier det om $\\lim_{x\\to0}f\'(x)$?','Er $x\\sin\\frac1x$ deriverbar i 0? Hva med $x^3\\sin\\frac1x$, og er den deriverte kontinuerlig?','Forklar med egne ord forskjellen på «$f\'(0)$ finnes» og «$f\'$ er kontinuerlig i 0».'],
init(S){S.lw=Math.log(winOf(S))},
update(S,dt){if(S.anim){S.anim.t+=dt/7;const e=ease(S.anim.t);S.p.h=S.anim.h0*Math.pow(HMIN/S.anim.h0,e);S.v.h=S.p.h;if(S===Stage.S)syncCtl('h');if(S.anim.t>=1)S.anim=null}
 S.lw=smooth(S.lw,Math.log(winOf(S)),dt,5)},
change(S,id){if(id==='h')S.anim=null},
draw(S){const h=S.v.h,W=Math.exp(S.lw??Math.log(winOf(S)));const[bf,bd]=rows(pad(S,28,24,46),[1.35,1],22);
 /* lik skala på aksene når vinduet er lite nok, ellers strekkes y-aksen så hele grafen får plass */
 const yH=Math.max(W*bf.h/bf.w,1.05*W*W);
 const Pf=Plane(-W,W,-yH,yH,bf),Pd=Plane(-W,W,-1.75,1.75,bd);S.Pf=Pf;
 const st=stepOf(W/2.2),sy=stepOf(yH/1.4);Pf.grid(st,{sy,minor:false,alpha:.1});Pf.axes({xs:st,ys:sy,xl:'x',yl:'y'});
 Pd.grid(st,{sy:.5,minor:false,alpha:.1});Pd.axes({xs:st,ys:1,xl:'x'});
 Pf.fn(x=>x*x,A(C.fg,.35),1.3,{dash:[5,5]});Pf.fn(x=>-x*x,A(C.fg,.35),1.3,{dash:[5,5]});
 curve(Pf,G,Pf.x0,Pf.x1,3000,C.blue,2.6);
 const yh=G(h),sl=yh/h,dh=Gd(h);
 Pf.clip(()=>{ln(Pf.X(Pf.x0),Pf.Y(sl*Pf.x0),Pf.X(Pf.x1),Pf.Y(sl*Pf.x1),C.yellow,2.2);
  if(S.p.tan){const d=.45*W;ln(Pf.X(h-d),Pf.Y(yh-dh*d),Pf.X(h+d),Pf.Y(yh+dh*d),C.pink,2.4)}});
 dot(Pf.X(0),Pf.Y(0),6,C.green);dot(Pf.X(h),Pf.Y(yh),7,C.pink);handle(Pf.X(h),Pf.Y(yh),C.pink,S);
 infoBox(Pf.l+8,Pf.t+8,[['sekant: stigningstall → 0',C.yellow]].concat(S.p.tan?[['tangent i h: vipper fra −1 til 1',C.pink]]:[]),{s:12.5});
 /* den deriverte */
 [-1,1].forEach(k=>ln(Pd.l,Pd.Y(k),Pd.l+Pd.w,Pd.Y(k),A(C.pink,.35),1.2,[5,5]));
 curve(Pd,Gd,Pd.x0,Pd.x1,3000,A(C.pink,.85),1.8);
 ln(Pd.X(h),Pd.t,Pd.X(h),Pd.t+Pd.h,A(C.fg,.3),1.2,[4,4]);
 dot(Pd.X(h),Pd.Y(sl),5.5,C.yellow);dot(Pd.X(h),Pd.Y(dh),6.5,C.pink);dot(Pd.X(0),Pd.Y(0),6.5,C.green);
 T('f′(0) = 0',Pd.X(0)-12,Pd.Y(0)-16,{f:'n',s:12,c:C.green,a:'right',bg:A(C.stage,.9)});
 Tm('f(x)',Pf.l+6,Pf.Y(0)-16,{c:C.blue});Tm('f′(x)',Pd.l+6,Pd.t+10,{c:C.pink})},
pick(S,x,y){const P=S.Pf;if(!P)return;const h=S.v.h;if(near(x,y,P.X(h),P.Y(G(h)),22))return{move:mx=>{const v=clamp(P.ix(mx),HMIN,.6);S.p.h=S.v.h=v;S.anim=null;syncCtl('h')}}},
readout(S){const h=S.p.h;return[['h',nfs(h,3)],['sekant f(h)/h',nf(G(h)/h,4),'yellow'],['tangent f′(h)',nf(Gd(h),4),'pink'],['f′(0)','0','green']]}
});
}
