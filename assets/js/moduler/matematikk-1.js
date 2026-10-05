/* ================= MATEMATIKK (del 1) ================= */
function marc(x,y,r,u0,u1,c,w=2){X.beginPath();X.arc(x,y,r,-u0,-u1,u1>u0);X.strokeStyle=c;X.lineWidth=w;X.stroke()}
function vlab(s,x,y,c,sz=18){Tm(s,x,y,{c,s:sz,a:'center'});const w=tw(s,{f:'m',s:sz});arr(x-w/2-1,y-sz*.62,x+w/2+3,y-sz*.62,c,1.3,5)}
function gaussSolve(A,b){const n=b.length;A=A.map((r,i)=>r.concat([b[i]]));for(let i=0;i<n;i++){let mx=i;for(let k=i+1;k<n;k++)if(Math.abs(A[k][i])>Math.abs(A[mx][i]))mx=k;[A[i],A[mx]]=[A[mx],A[i]];if(Math.abs(A[i][i])<1e-12)return null;for(let k=i+1;k<n;k++){const f=A[k][i]/A[i][i];for(let j=i;j<=n;j++)A[k][j]-=f*A[i][j]}}const x=new Array(n).fill(0);for(let i=n-1;i>=0;i--){let s=A[i][n];for(let j=i+1;j<n;j++)s-=A[i][j]*x[j];x[i]=s/A[i][i]}return x}
function infoBox(x,y,lines,o={}){const s=o.s||13.5,lh=s+8;let w=0;lines.forEach(l=>{const t=Array.isArray(l)?l[0]:l;w=Math.max(w,tw(t,{f:o.f||'n',s}))});rr(x,y,w+20,lines.length*lh+12,5,A(C.fg,.1),A(C.stage,.88),1);lines.forEach((l,i)=>{const t=Array.isArray(l)?l[0]:l,c=Array.isArray(l)?l[1]:C.fg2;T(t,x+10,y+6+lh*i+lh/2,{f:o.f||'n',s,c})});return{w:w+20,h:lines.length*lh+12}}

/* ---------- 1. Lineære funksjoner ---------- */
{
const fl=S=>{const v=S.v,m=S.p.mode;return m==='lin'?x=>v.a*x+v.b:m==='prop'?x=>v.k*x:x=>v.k/x};
M({id:'ma-lineaer',s:'ma',c:['1P','1T'],title:'Lineære funksjoner og proporsjonalitet',short:'Lineære funksjoner',kw:'stigningstall konstantledd proporsjonal omvendt proporsjonal rett linje',
lead:'Stigningstallet $a$ forteller hvor mye grafen stiger når $x$ øker med 1. Konstantleddet $b$ er der grafen skjærer $y$-aksen.',
hint:'Dra det gule punktet langs grafen.',
controls:[
 {id:'mode',type:'seg',label:'Sammenheng',value:'lin',options:[['lin','Lineær'],['prop','Proporsjonal'],['omv','Omvendt proporsjonal']]},
 {id:'a',label:'Stigningstall <i>a</i>',min:-4,max:4,step:.1,value:.5,show:S=>S.p.mode==='lin'},
 {id:'b',label:'Konstantledd <i>b</i>',min:-5,max:5,step:.1,value:1,show:S=>S.p.mode==='lin'},
 {id:'k',label:'Konstant <i>k</i>',min:-8,max:8,step:.1,value:3,show:S=>S.p.mode!=='lin'}],
tex:['f(x)=\\cB{a}\\,x+\\cR{b}','y=k\\cdot x\\;\\Longleftrightarrow\\;\\frac{y}{x}=k','y=\\frac{k}{x}\\;\\Longleftrightarrow\\;\\cT{x\\cdot y=k}'],
about:['Når $x$ øker med 1, endrer $f(x)$ seg med $a$. Den gule og grønne trappen viser dette: ett steg bortover, $a$ steg opp eller ned.','To størrelser er <strong>proporsjonale</strong> når forholdet $y/x$ er det samme hele tiden. Grafen er da en rett linje gjennom origo.','To størrelser er <strong>omvendt proporsjonale</strong> når produktet $x\\cdot y$ er konstant. Rektangelet mellom origo og punktet har derfor alltid samme areal.'],
tasks:['Sett $b=0$. Hvilken av de tre sammenhengene får du da?','Finn stigningstallet til en linje gjennom $(0, 2)$ og $(4, 0)$. Sjekk svaret med glidebryterne.','Velg omvendt proporsjonal med $k=6$. Dra punktet og følg med på arealet. Hvorfor endrer det seg ikke?','En taxitur koster 50 kr i startpris og 15 kr per km. Hvilke verdier må $a$ og $b$ ha?'],
init(S){S.px=2},
draw(S){const P=Plane(-8,8,-6,6,pad(S,28),true);S.P=P;P.grid(1);P.axes({xs:2,ys:2,xl:'x',yl:'y'});
 const m=S.p.mode,v=S.v,f=fl(S),x=S.px,y=f(x);
 if(m==='omv'&&isFinite(y)){P.clip(()=>rct(Math.min(P.X(0),P.X(x)),Math.min(P.Y(0),P.Y(y)),Math.abs(P.X(x)-P.X(0)),Math.abs(P.Y(y)-P.Y(0)),A(C.teal,.85),A(C.teal,.16),1.5));if(Math.abs(y)<5.5)T('areal = '+nf(Math.abs(x*y),1),(P.X(0)+P.X(x))/2,(P.Y(0)+P.Y(y))/2,{a:'center',f:'n',s:13,c:C.teal})}
 P.fn(f,C.blue,3.2);
 if(m==='lin'){const x2=x+1,y2=y+v.a;ln(P.X(x),P.Y(y),P.X(x2),P.Y(y),C.yellow,2.6);ln(P.X(x2),P.Y(y),P.X(x2),P.Y(y2),C.green,2.6);
  T('1',(P.X(x)+P.X(x2))/2,P.Y(y)+(v.a>=0?14:-14),{a:'center',f:'n',s:13,c:C.yellow});Tm('a = '+nf(v.a,1),P.X(x2)+8,(P.Y(y)+P.Y(y2))/2,{c:C.green,s:16});
  dot(P.X(0),P.Y(v.b),6,C.red);Tm('b',P.X(0)-10,P.Y(v.b)-13,{c:C.red,a:'right'})}
 if(m==='prop'){dot(P.X(0),P.Y(0),6,C.red);for(let k=1;k<=3;k++)ln(P.X(k),P.Y(0),P.X(k),P.Y(f(k)),A(C.green,.55),1.5,[4,4])}
 if(isFinite(y)&&Math.abs(y)<12){ln(P.X(x),P.Y(y),P.X(x),P.Y(0),A(C.fg,.4),1.2,[4,4]);ln(P.X(x),P.Y(y),P.X(0),P.Y(y),A(C.fg,.4),1.2,[4,4]);handle(P.X(x),P.Y(y),C.yellow,S);T(`(${nf(x,1)}, ${nf(y,2)})`,P.X(x)+15,P.Y(y)-17,{f:'n',s:12.5,c:C.yellow,bg:A(C.stage,.75)})}},
pick(S,x,y){const P=S.P;if(!P)return;const yy=fl(S)(S.px);if(!isFinite(yy))return;if(near(x,y,P.X(S.px),P.Y(yy),24))return{move:mx=>{let n=clamp(P.ix(mx),-7.5,7.5);if(S.p.mode==='omv'&&Math.abs(n)<.4)n=.4*(n<0?-1:1);S.px=Math.round(n*10)/10}}},
readout(S){const p=S.p,m=p.mode,x=S.px;const y=m==='lin'?p.a*x+p.b:m==='prop'?p.k*x:p.k/x;const r=[['x',nf(x,1)],['y',nf(y,2),'yellow']];if(m==='lin')r.push(['Δy / Δx',nf(p.a,1),'green']);if(m==='prop')r.push(['y / x',nf(y/x,2),'green']);if(m==='omv')r.push(['x · y',nf(x*y,2),'teal']);return r},
live(S){const p=S.p;return p.mode==='lin'?`f(x)=${tn(p.a,1)}\\,x ${tsg(p.b,1)}`:p.mode==='prop'?`y=${tn(p.k,1)}\\cdot x`:`y=\\dfrac{${tn(p.k,1)}}{x}`}
});
}

/* ---------- 2. Andregradsfunksjoner ---------- */
M({id:'ma-andregrad',s:'ma',c:['1T'],title:'Andregradsfunksjoner',kw:'parabel nullpunkt toppunkt bunnpunkt diskriminant abc-formel symmetrilinje',
lead:'Endre $a$, $b$ og $c$ og se hvordan parabelen flytter seg. Diskriminanten $b^2-4ac$ avgjør hvor mange nullpunkter grafen har.',
controls:[{id:'a',label:'<i>a</i>',min:-3,max:3,step:.1,value:1},{id:'b',label:'<i>b</i>',min:-6,max:6,step:.1,value:-2},{id:'c',label:'<i>c</i>',min:-6,max:6,step:.1,value:-3},{id:'sym',type:'check',label:'Vis symmetrilinjen',value:true}],
tex:['f(x)=\\cB{a}x^2+\\cY{b}x+\\cG{c}','x=\\frac{-b\\pm\\sqrt{\\cR{b^2-4ac}}}{2a}','f(x)=a\\,(x-p)^2+q,\\qquad p=-\\frac{b}{2a}'],
about:['Tallet $a$ bestemmer om parabelen vender den hule siden opp ($a>0$) eller ned ($a<0$), og hvor smal den er.','Toppunktet eller bunnpunktet ligger på symmetrilinjen $x=-\\frac{b}{2a}$. Nullpunktene ligger like langt fra symmetrilinjen på hver side.','Diskriminanten $D=b^2-4ac$ står under rottegnet i abc-formelen. Er den negativ, har likningen $f(x)=0$ ingen reelle løsninger.','Konstantleddet $c$ er der grafen skjærer $y$-aksen (grønt punkt).'],
tasks:['Juster $c$ til parabelen akkurat så vidt berører $x$-aksen. Hva er $D$ da?','Hold $a$ og $c$ fast og endre bare $b$. Hvilken kurve følger toppunktet? (Tips: den er også en parabel.)','Lag en parabel med nullpunkter i $x=-1$ og $x=3$.','Hva skjer når $a$ nærmer seg 0?'],
draw(S){const v=S.v,a=v.a,b=v.b,c=v.c,f=x=>a*x*x+b*x+c;const P=Plane(-7,7,-8,8,pad(S,28),true);P.grid(1);P.axes({xs:2,ys:2,xl:'x',yl:'y'});
 const p=S.p,D=p.b*p.b-4*p.a*p.c,Dv=b*b-4*a*c;
 if(Math.abs(a)>.02){const xs=-b/(2*a),ys=f(xs);if(p.sym)ln(P.X(xs),P.t,P.X(xs),P.t+P.h,A(C.yellow,.45),1.4,[6,6]);P.fn(f,C.blue,3.2);
  if(Dv>=0){const r=Math.sqrt(Dv);[(-b-r)/(2*a),(-b+r)/(2*a)].forEach((x,i)=>{if(Dv<1e-4&&i)return;dot(P.X(x),P.Y(0),6,C.red);T(nf(x,2),P.X(x),P.Y(0)+(a>0?-17:17),{f:'n',s:12,c:C.red,a:'center',bg:A(C.stage,.7)})})}
  dot(P.X(xs),P.Y(ys),6.5,C.yellow);T(`${a>0?'Bunnpunkt':'Toppunkt'} (${nf(xs,2)}, ${nf(ys,2)})`,P.X(xs)+12,P.Y(ys)+(a>0?20:-20),{f:'n',s:12,c:C.yellow,bg:A(C.stage,.75)})}
 else P.fn(f,C.blue,3.2);
 dot(P.X(0),P.Y(c),5,C.green);
 infoBox(P.l+8,P.t+8,[[`D = b² − 4ac = ${nf(D,2)}`,C.red],Math.abs(p.a)<1e-9?'a = 0: grafen er en rett linje':D>1e-9?'D > 0: to nullpunkter':Math.abs(D)<=1e-9?'D = 0: ett nullpunkt':'D < 0: ingen nullpunkter']);},
readout(S){const p=S.p,D=p.b*p.b-4*p.a*p.c;const r=[['D',nf(D,2),'red']];if(Math.abs(p.a)>1e-9){if(D>=0){const q=Math.sqrt(D);const x1=(-p.b-q)/(2*p.a),x2=(-p.b+q)/(2*p.a);r.push(['x₁',nf(Math.min(x1,x2),3)],['x₂',nf(Math.max(x1,x2),3)])}const xs=-p.b/(2*p.a);r.push(['p',nf(xs,2),'yellow'],['q',nf(p.c-p.b*p.b/(4*p.a),2),'yellow'])}return r},
live(S){const p=S.p;if(Math.abs(p.a)<1e-9)return`f(x)=${tn(p.b,1)}x ${tsg(p.c,1)}`;const xs=-p.b/(2*p.a),ys=p.c-p.b*p.b/(4*p.a);return`f(x)=${tn(p.a,1)}x^2 ${tsg(p.b,1)}x ${tsg(p.c,1)}=${tn(p.a,1)}\\left(x ${tsg(-xs,2)}\\right)^2 ${tsg(ys,2)}`}
});

/* ---------- 3. Likningssett og ulikheter ---------- */
{
const fg=S=>{const v=S.v;const f=x=>v.a1*x+v.b1;const g=S.p.mode==='ll'?x=>v.a2*x+v.b2:x=>v.c2*x*x+v.d2;return[f,g]};
function sols(S){const p=S.p;if(p.mode==='ll'){if(Math.abs(p.a1-p.a2)<1e-9)return Math.abs(p.b1-p.b2)<1e-9?'alle':[];const x=(p.b2-p.b1)/(p.a1-p.a2);return[[x,p.a1*x+p.b1]]}
 const A2=p.c2,B=-p.a1,Cc=p.d2-p.b1,D=B*B-4*A2*Cc;if(D<0)return[];const r=Math.sqrt(D);const xs=D<1e-12?[-B/(2*A2)]:[(-B-r)/(2*A2),(-B+r)/(2*A2)];return xs.map(x=>[x,p.a1*x+p.b1])}
M({id:'ma-likningssett',s:'ma',c:['1T'],title:'Likningssett og ulikheter',short:'Likningssett',kw:'skjæringspunkt grafisk løsning ulikhet to ukjente',
lead:'Løsningen av et likningssett er skjæringspunktet mellom grafene. En ulikhet $f(x)>g(x)$ er oppfylt der den blå grafen ligger over den gule.',
controls:[{id:'mode',type:'seg',label:'Type',value:'ll',options:[['ll','To linjer'],['lp','Linje og parabel']]},
 {id:'a1',label:'Blå linje: <i>a</i>',min:-3,max:3,step:.1,value:.5},{id:'b1',label:'Blå linje: <i>b</i>',min:-5,max:5,step:.1,value:1},
 {id:'a2',label:'Gul linje: <i>a</i>',min:-3,max:3,step:.1,value:-1,show:S=>S.p.mode==='ll'},{id:'b2',label:'Gul linje: <i>b</i>',min:-5,max:5,step:.1,value:-2,show:S=>S.p.mode==='ll'},
 {id:'c2',label:'Parabel: <i>a</i>',min:.1,max:2,step:.05,value:.5,show:S=>S.p.mode==='lp'},{id:'d2',label:'Parabel: <i>c</i>',min:-5,max:3,step:.1,value:-3,show:S=>S.p.mode==='lp'},
 {id:'ul',type:'check',label:'Vis ulikheten f(x) > g(x)',value:false}],
tex:['\\begin{cases}y=\\cB{a_1x+b_1}\\\\ y=\\cY{a_2x+b_2}\\end{cases}','a_1x+b_1=a_2x+b_2\\;\\Rightarrow\\; x=\\frac{b_2-b_1}{a_1-a_2}'],
about:['Et punkt som ligger på begge grafene, oppfyller begge likningene samtidig. Derfor er skjæringspunktet løsningen.','To parallelle linjer (lik $a$) skjærer aldri hverandre: likningssettet har ingen løsning. Er linjene like, har det uendelig mange.','Med en linje og en parabel får vi en andregradslikning. Den kan ha to, én eller ingen løsninger.','Grønn strek på $x$-aksen viser hvor ulikheten $f(x)>g(x)$ er oppfylt.'],
tasks:['Lag to linjer som ikke skjærer hverandre. Hva har de felles?','Løs likningssettet $y=2x-1$ og $y=-x+5$ grafisk. Sjekk ved regning.','Velg linje og parabel. Juster til de bare berører hverandre i ett punkt.','Bruk ulikheten: for hvilke $x$ er $0{,}5x+1 > -x-2$?'],
draw(S){const P=Plane(-8,8,-6,6,pad(S,28),true);P.grid(1);P.axes({xs:2,ys:2,xl:'x',yl:'y'});const[f,g]=fg(S);
 if(S.p.ul){const n=320;let st=null;const segs=[];for(let i=0;i<=n;i++){const x=P.x0+(P.x1-P.x0)*i/n;const ok=f(x)>g(x);if(ok&&st===null)st=x;if((!ok||i===n)&&st!==null){segs.push([st,x]);st=null}}
  segs.forEach(([a,b])=>{const pts=[];for(let i=0;i<=60;i++){const x=a+(b-a)*i/60;pts.push(P.pt(x,f(x)))}for(let i=60;i>=0;i--){const x=a+(b-a)*i/60;pts.push(P.pt(x,g(x)))}P.clip(()=>poly(pts,null,A(C.green,.16)));ln(P.X(a),P.Y(0),P.X(b),P.Y(0),C.green,6)})}
 P.fn(g,C.yellow,3);P.fn(f,C.blue,3.2);
 const s=sols(S);if(Array.isArray(s))s.forEach(([x,y])=>{if(Math.abs(x)>9||Math.abs(y)>7)return;ln(P.X(x),P.Y(y),P.X(x),P.Y(0),A(C.fg,.4),1.2,[4,4]);dot(P.X(x),P.Y(y),7,C.red);T(`(${nf(x,2)}, ${nf(y,2)})`,P.X(x)+12,P.Y(y)-16,{f:'n',s:12.5,c:C.red,bg:A(C.stage,.8)})});
 Tm('f(x)',P.X(6.4),P.Y(f(6.4))-14,{c:C.blue,a:'center'});Tm('g(x)',P.X(-6.4),P.Y(g(-6.4))-14,{c:C.yellow,a:'center'});
 const msg=s==='alle'?'Linjene er like: uendelig mange løsninger':!s.length?'Ingen skjæringspunkt: ingen løsning':s.length===1?'Én løsning':'To løsninger';infoBox(P.l+8,P.t+8,[msg])},
readout(S){const s=sols(S);if(s==='alle')return[['løsning','alle punkt på linjen']];if(!s.length)return[['løsning','ingen']];return s.map(([x,y],i)=>[`x${s.length>1?sub(i+1):''}, y`,`${nf(x,3)}, ${nf(y,3)}`,'red'])},
live(S){const p=S.p;return p.mode==='ll'?`\\begin{cases}y=${tn(p.a1,1)}x ${tsg(p.b1,1)}\\\\ y=${tn(p.a2,1)}x ${tsg(p.b2,1)}\\end{cases}`:`${tn(p.a1,1)}x ${tsg(p.b1,1)} = ${tn(p.c2,2)}x^2 ${tsg(p.d2,1)}`}
});
}

/* ---------- 4. Prosent og vekstfaktor ---------- */
M({id:'ma-vekstfaktor',s:'ma',c:['1P','2P'],title:'Prosent, vekstfaktor og renters rente',short:'Vekstfaktor',kw:'prosent rente sparing lån eksponentiell vekst lineær vekst',
lead:'Med fast prosentvis vekst ganger vi med vekstfaktoren hvert år. Renta legger seg på renta fra året før, og det blir mer enn ved et fast tillegg.',
controls:[{id:'K0',label:'Startbeløp',min:1000,max:50000,step:1000,value:10000,fmt:v=>nf(v,0)+' kr'},{id:'p',label:'Prosentvis endring per år',min:-20,max:25,step:.5,value:7,fmt:v=>nf(v,1)+' %'},{id:'n',label:'Antall år',min:5,max:40,step:1,value:20}],
tex:['\\text{vekstfaktor}=1+\\frac{\\cY{p}}{100}','K_n=K_0\\cdot\\left(1+\\frac{p}{100}\\right)^{n}','\\text{fast tillegg: } K_0+n\\cdot K_0\\cdot\\frac{p}{100}'],
about:['Hver søyle er beløpet etter et år. Den mørkeblå delen er startbeløpet. Den gule delen er renta du ville fått med et fast tillegg hvert år.','Den røde delen er <strong>renters rente</strong>: renta du får av renta som allerede er lagt til. Den vokser raskere og raskere.','Er prosenten negativ (verditap), blir vekstfaktoren mindre enn 1, og beløpet minker mot null uten å nå null.'],
tasks:['Hvor mange år tar det å doble 10 000 kr med 7 % rente? Sammenlign med regelen «70 delt på prosenten».','Sett prosenten til −15 %. Hvor mye er en bil til 300 000 kr verdt etter 5 år?','Hvorfor er en økning på 10 % etterfulgt av en nedgang på 10 % ikke det samme som ingen endring?','Finn vekstfaktoren når en pris øker med 2,5 %.'],
init(S){S.t=0},
change(S){S.t=0},
draw(S){const v=S.v,p=S.p,n=Math.round(p.n),vf=1+v.p/100;const Kn=v.K0*Math.pow(vf,n),Ln=v.K0*(1+n*v.p/100);const ymax=Math.max(v.K0,Kn,Ln)*1.12;
 const b=pad(S,34,30,40);b.l+=38;b.w-=38;const P=Plane(-.7,n+.7,0,ymax,b);P.grid(Math.max(1,Math.round(n/10)),{sy:niceStep(ymax/6),minor:false,alpha:.12});P.axes({xs:Math.max(1,Math.round(n/10)),ys:niceStep(ymax/6),yf:y=>nf(y,0),xl:'år',ls:15});
 const shown=Math.min(n,Math.floor(S.t*6));const bw=Math.min(28,P.sx*.7);
 for(let i=0;i<=shown;i++){const K=v.K0*Math.pow(vf,i),lin=v.K0*(1+i*v.p/100);const x=P.X(i)-bw/2;
  if(v.p>=0){const base=v.K0,simp=lin-v.K0,comp=K-lin;rct(x,P.Y(base),bw,P.Y(0)-P.Y(base),null,A(C.blue,.55));rct(x,P.Y(base+simp),bw,P.Y(base)-P.Y(base+simp),null,A(C.yellow,.75));rct(x,P.Y(K),bw,P.Y(base+simp)-P.Y(K),null,A(C.red,.85))}
  else rct(x,P.Y(K),bw,P.Y(0)-P.Y(K),null,A(C.blue,.6))}
 P.fn(x=>v.K0*(1+x*v.p/100),A(C.yellow,.9),2,{from:0,to:n,dash:[6,5]});P.fn(x=>v.K0*Math.pow(vf,x),C.fg,2.2,{from:0,to:Math.max(.01,shown)});
 const K=v.K0*Math.pow(vf,shown);T(nf(K,0)+' kr',P.X(shown),P.Y(K)-14,{a:'center',f:'n',s:12,c:C.fg,bg:A(C.stage,.8)});
 if(v.p>=0)[[C.blue,'startbeløp'],[C.yellow,'fast tillegg'],[C.red,'renters rente']].forEach(([c,t],i)=>{rct(P.l+12,P.t+10+i*20,12,12,null,c);T(t,P.l+30,P.t+16+i*20,{s:13,c:C.fg2})})},
update(S){},
readout(S){const p=S.p,vf=1+p.p/100,Kn=p.K0*Math.pow(vf,p.n);const r=[['vekstfaktor',nf(vf,3),'yellow'],[`K${sub(p.n)}`,nf(Kn,0)+' kr'],['endring',nf((Kn/p.K0-1)*100,1)+' %']];if(p.p>0)r.push(['doblingstid',nf(Math.log(2)/Math.log(vf),1)+' år']);if(p.p<0)r.push(['halveringstid',nf(Math.log(.5)/Math.log(vf),1)+' år']);return r},
live(S){const p=S.p,vf=1+p.p/100;return`${tn(p.K0,0)}\\cdot ${tn(vf,3)}^{${p.n}} = ${tn(p.K0*Math.pow(vf,p.n),0)}`}
});
function niceStep(r){const e=Math.pow(10,Math.floor(Math.log10(Math.max(r,1e-9))));const m=r/e;return(m<1.5?1:m<3.5?2:m<7.5?5:10)*e}

/* ---------- 5. Trigonometri i trekanter ---------- */
{
const L=(P,Q)=>Math.hypot(P[0]-Q[0],P[1]-Q[1]);
const ang=(P,Q,R)=>{const ux=Q[0]-P[0],uy=Q[1]-P[1],vx=R[0]-P[0],vy=R[1]-P[1];return Math.acos(clamp((ux*vx+uy*vy)/(Math.hypot(ux,uy)*Math.hypot(vx,vy)||1),-1,1))};
const tri=S=>S.p.mode==='rett'?{A:S.R.A,B:S.R.B,C:[S.R.B[0],S.R.A[1]]}:S.G;
function sarc(P,Pv,Q,R,r,c){const a1=Math.atan2(P.Y(Q[1])-P.Y(Pv[1]),P.X(Q[0])-P.X(Pv[0])),a2=Math.atan2(P.Y(R[1])-P.Y(Pv[1]),P.X(R[0])-P.X(Pv[0]));let d=a2-a1;while(d>PI)d-=TAU;while(d<-PI)d+=TAU;X.beginPath();X.arc(P.X(Pv[0]),P.Y(Pv[1]),r,a1,a1+d,d<0);X.strokeStyle=c;X.lineWidth=2;X.stroke();return a1+d/2}
M({id:'ma-trekant',s:'ma',c:['1T'],title:'Trigonometri i trekanter',short:'Trigonometri i trekanter',kw:'sinus cosinus tangens hypotenus katet sinussetningen cosinussetningen arealsetningen vinkel',
lead:'Dra hjørnene og se at forholdene mellom sidene bare avhenger av vinklene. Det er grunnen til at sinus, cosinus og tangens virker.',
hint:'Dra de gule hjørnene.',
controls:[{id:'mode',type:'seg',label:'Vis',value:'rett',options:[['rett','Rettvinklet'],['sin','Sinussetningen'],['cos','Cosinussetningen'],['areal','Arealsetningen']]}],
tex:['\\sin A=\\frac{\\cY{a}}{\\cR{c}},\\;\\cos A=\\frac{\\cB{b}}{\\cR{c}},\\;\\tan A=\\frac{\\cY{a}}{\\cB{b}}','\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}','c^2=a^2+b^2-2ab\\cos C','T=\\tfrac12\\,a\\,b\\,\\sin C'],
about:['Sidene heter det samme som vinkelen rett overfor: siden $a$ ligger overfor hjørnet $A$.','I en rettvinklet trekant er <strong>hypotenusen</strong> den lengste siden, rett overfor den rette vinkelen. Katetene er de to andre.','Sinussetningen og cosinussetningen gjelder i <em>alle</em> trekanter. Cosinussetningen er Pytagoras med et korreksjonsledd: når $C=90^\\circ$ er $\\cos C=0$.','Arealsetningen kommer av at høyden fra $B$ ned på siden $b$ er $a\\sin C$.'],
tasks:['Gjør trekanten større uten å endre vinkel $A$. Hva skjer med $\\sin A$?','Finn en vinkel der $\\sin A=\\cos A$. Hvilken vinkel er det?','Velg cosinussetningen og gjør $C$ til 90°. Hva blir korreksjonsleddet?','Velg sinussetningen. Sjekk at alle tre forholdene er like store som diameteren i den lilla sirkelen.'],
init(S){S.R={A:[0,.5],B:[6.5,4.4]};S.G={A:[0,.5],B:[4.5,4.8],C:[7.8,.5]}},
draw(S){const P=Plane(-1,9,-.6,6.2,pad(S,30),true);S.P=P;P.grid(1,{alpha:.12});const t=tri(S),Ap=t.A,Bp=t.B,Cp=t.C;
 const a=L(Bp,Cp),b=L(Ap,Cp),c=L(Ap,Bp),aA=ang(Ap,Bp,Cp),aB=ang(Bp,Ap,Cp),aC=ang(Cp,Ap,Bp);
 const pts=[Ap,Bp,Cp].map(q=>P.pt(...q));poly(pts,null,A(C.blue,.08));
 const mode=S.p.mode;
 if(mode==='sin'){const d=2*(Ap[0]*(Bp[1]-Cp[1])+Bp[0]*(Cp[1]-Ap[1])+Cp[0]*(Ap[1]-Bp[1]));if(Math.abs(d)>1e-6){const sq=q=>q[0]*q[0]+q[1]*q[1];const ux=(sq(Ap)*(Bp[1]-Cp[1])+sq(Bp)*(Cp[1]-Ap[1])+sq(Cp)*(Ap[1]-Bp[1]))/d,uy=(sq(Ap)*(Cp[0]-Bp[0])+sq(Bp)*(Ap[0]-Cp[0])+sq(Cp)*(Bp[0]-Ap[0]))/d;const R=L([ux,uy],Ap);P.clip(()=>circ(P.X(ux),P.Y(uy),R*P.sx,A(C.purple,.75),null,1.6));ln(P.X(ux-R),P.Y(uy),P.X(ux+R),P.Y(uy),A(C.purple,.6),1.3,[5,5]);T('2R = '+nf(2*R,2),P.X(ux),P.Y(uy)-12,{a:'center',f:'n',s:12,c:C.purple})}}
 if(mode==='areal'){const ux=Cp[0]-Ap[0],uy=Cp[1]-Ap[1],l2=ux*ux+uy*uy,tt=((Bp[0]-Ap[0])*ux+(Bp[1]-Ap[1])*uy)/l2;const F=[Ap[0]+tt*ux,Ap[1]+tt*uy];ln(...P.pt(...Bp),...P.pt(...F),C.green,2,[6,5]);ln(...P.pt(...Ap),...P.pt(...F),A(C.fg,.3),1,[3,4]);dot(...P.pt(...F),3.5,C.green);Tm('h',(P.X(Bp[0])+P.X(F[0]))/2+10,(P.Y(Bp[1])+P.Y(F[1]))/2,{c:C.green})}
 const sides=[[Bp,Cp,C.yellow,'a',a],[Ap,Cp,C.blue,'b',b],[Ap,Bp,C.red,'c',c]];const G=[(Ap[0]+Bp[0]+Cp[0])/3,(Ap[1]+Bp[1]+Cp[1])/3];
 sides.forEach(([p,q,col,nm,len])=>{ln(...P.pt(...p),...P.pt(...q),col,3.2);const m=[(p[0]+q[0])/2,(p[1]+q[1])/2];let nx=m[0]-G[0],ny=m[1]-G[1];const nl=Math.hypot(nx,ny)||1;nx/=nl;ny/=nl;T(`${nm} = ${nf(len,2)}`,P.X(m[0]+nx*.45),P.Y(m[1]+ny*.45),{a:'center',f:'m',s:16,c:col,bg:A(C.stage,.6)})});
 [[Ap,Bp,Cp,'A',aA],[Bp,Ap,Cp,'B',aB],[Cp,Ap,Bp,'C',aC]].forEach(([v,q,r,nm,an])=>{const right=mode==='rett'&&nm==='C';if(right){const s=13;const d1=[Math.sign(q[0]-v[0]),0],d2=[0,Math.sign(r[1]-v[1])||1];const o=P.pt(...v);poly([[o[0]+d1[0]*s,o[1]],[o[0]+d1[0]*s,o[1]-d2[1]*s],[o[0],o[1]-d2[1]*s]],A(C.fg,.7),null,1.5,false)}else{const mid=sarc(P,v,q,r,24,A(C.fg,.7));T(nf(deg(an),1)+'°',P.X(v[0])+Math.cos(mid)*44,P.Y(v[1])+Math.sin(mid)*44,{a:'center',f:'n',s:11.5,c:C.fg2})}
  let nx=v[0]-G[0],ny=v[1]-G[1];const nl=Math.hypot(nx,ny)||1;Tm(nm,P.X(v[0]+nx/nl*.42),P.Y(v[1]+ny/nl*.42),{a:'center',s:20,c:C.fg})});
 const drag=mode==='rett'?[Bp]:[Ap,Bp,Cp];drag.forEach(q=>handle(...P.pt(...q),C.yellow,S));
 let lines;const f3=x=>nf(x,3);
 if(mode==='rett')lines=[[`sin A = a/c = ${nf(a,2)}/${nf(c,2)} = ${f3(Math.sin(aA))}`,C.yellow],[`cos A = b/c = ${nf(b,2)}/${nf(c,2)} = ${f3(Math.cos(aA))}`,C.blue],[`tan A = a/b = ${nf(a,2)}/${nf(b,2)} = ${f3(Math.tan(aA))}`,C.fg2]];
 else if(mode==='sin')lines=[[`a / sin A = ${nf(a/Math.sin(aA),3)}`,C.yellow],[`b / sin B = ${nf(b/Math.sin(aB),3)}`,C.blue],[`c / sin C = ${nf(c/Math.sin(aC),3)}`,C.red]];
 else if(mode==='cos')lines=[[`c² = a² + b² − 2ab·cos C`,C.fg2],[`   = ${nf(a*a,2)} + ${nf(b*b,2)} − ${nf(2*a*b*Math.cos(aC),2)}`,C.fg2],[`   = ${nf(c*c,2)}   →   c = ${nf(c,2)}`,C.red]];
 else lines=[[`h = a · sin C = ${nf(a*Math.sin(aC),2)}`,C.green],[`T = ½ · a · b · sin C`,C.fg2],[`  = ½ · ${nf(a,2)} · ${nf(b,2)} · ${nf(Math.sin(aC),3)} = ${nf(.5*a*b*Math.sin(aC),2)}`,C.fg]];
 infoBox(P.l+4,P.t+4,lines,{s:12.5})},
pick(S,x,y){const P=S.P;if(!P)return;if(S.p.mode==='rett'){const B=S.R.B;if(near(x,y,...P.pt(...B),24))return{move:(mx,my)=>{S.R.B=[clamp(Math.round(P.ix(mx)*10)/10,S.R.A[0]+1,8.6),clamp(Math.round(P.iy(my)*10)/10,S.R.A[1]+.6,5.8)]}};return}
 for(const k of['A','B','C']){const q=S.G[k];if(near(x,y,...P.pt(...q),24))return{move:(mx,my)=>{S.G[k]=[clamp(Math.round(P.ix(mx)*10)/10,-.6,8.6),clamp(Math.round(P.iy(my)*10)/10,-.3,5.9)]}}}},
readout(S){const t=tri(S);const a=L(t.B,t.C),b=L(t.A,t.C),c=L(t.A,t.B);return[['A',nf(deg(ang(t.A,t.B,t.C)),1)+'°'],['B',nf(deg(ang(t.B,t.A,t.C)),1)+'°'],['C',nf(deg(ang(t.C,t.A,t.B)),1)+'°'],['areal',nf(.5*a*b*Math.sin(ang(t.C,t.A,t.B)),2),'green']]}
});
}

/* ---------- 6. Enhetssirkelen ---------- */
M({id:'ma-enhetssirkel',s:'ma',c:['1T','R2'],title:'Enhetssirkelen og sinuskurven',short:'Enhetssirkel og sinus',kw:'radianer trigonometriske funksjoner sinus cosinus periode amplitude harmonisk svingning faseforskyvning likevektslinje',
lead:'Et punkt går rundt sirkelen. Høyden til punktet er $\\sin v$. Når vi tegner høyden mot vinkelen, får vi sinuskurven.',
controls:[{id:'fn',type:'seg',label:'Funksjon',value:'sin',options:[['sin','sinus'],['cos','cosinus']]},{id:'A',label:'Amplitude <i>A</i>',min:.2,max:2.5,step:.1,value:1},{id:'k',label:'Vinkelfart <i>k</i>',min:.5,max:4,step:.25,value:1},{id:'phi',label:'Faseforskyvning <i>φ</i>',min:-3.14,max:3.14,step:.01,value:0,fmt:v=>nf(v,2)+' rad'},{id:'d',label:'Likevektslinje <i>d</i>',min:-1.5,max:1.5,step:.1,value:0},{id:'spd',label:'Fart',min:0,max:2,step:.1,value:.7}],
tex:['f(x)=\\cY{A}\\sin(\\cB{k}x+\\cR{\\varphi})+\\cT{d}','T=\\frac{2\\pi}{k}','\\pi\\ \\text{rad}=180^\\circ'],
about:['I enhetssirkelen er radien 1. Den <strong>gule</strong> streken er $\\sin v$ (høyden) og den <strong>blå</strong> er $\\cos v$ (bredden).','Vinkelen måles i radianer: buelengden langs sirkelen fra positiv $x$-akse. En hel runde er $2\\pi\\approx 6{,}28$.','Med $A$, $k$, $\\varphi$ og $d$ får du en harmonisk svingning. Sirkelen til venstre får radius $A$, går $k$ ganger så fort, starter med vinkelen $\\varphi$ og er løftet $d$ opp.'],
tasks:['Hvilke vinkler gir $\\sin v = 0{,}5$? Sett farten til 0 og bruk glidebryterne.','Hva skjer med perioden når du dobler $k$?','Finn $\\varphi$ slik at sinuskurven blir lik cosinuskurven.','Tidevannet varierer mellom 0,4 m og 2,8 m over 12,4 timer. Finn $A$ og $d$.'],
init(S){S.th=.6},
update(S,dt){S.th+=dt*S.p.spd;if(S.th>4*PI)S.th-=4*PI},
draw(S){const v=S.v,b=pad(S,28);const wide=isWide(S);let bc,bg;
 if(wide){const s=Math.min(b.h,b.w*.36);bc={l:b.l,t:b.t+(b.h-s)/2,w:s,h:s};bg={l:b.l+s+34,t:bc.t,w:b.w-s-34,h:s}}else{const s=Math.min(b.w,b.h*.46);bc={l:b.l+(b.w-s)/2,t:b.t,w:s,h:s};bg={l:b.l,t:b.t+s+26,w:b.w,h:b.h-s-26}}
 const R=Math.max(1.35,v.A+Math.abs(v.d)+.45),Pc=Plane(-R,R,-R,R,bc,true),Pg=Plane(0,4*PI,wide?Pc.y0:-R,wide?Pc.y1:R,bg);
 Pc.grid(R>2.2?1:.5,{alpha:.12});Pc.axes({});Pg.grid(PI/2,{sy:R>2.2?1:.5,alpha:.12});Pg.axes({xs:PI/2,xpi:true,ys:R>2.2?1:.5});
 const fn=S.p.fn,u=v.k*S.th+v.phi,cx=0,cy=v.d,px=v.A*Math.cos(u),py=cy+v.A*Math.sin(u);
 if(Math.abs(v.A-1)>.05||Math.abs(v.d)>.05)circ(Pc.X(0),Pc.Y(0),Pc.sx,A(C.fg,.25),null,1);
 circ(Pc.X(cx),Pc.Y(cy),v.A*Pc.sx,A(C.fg,.75),null,1.8);
 let uu=((u%TAU)+TAU)%TAU;marc(Pc.X(cx),Pc.Y(cy),v.A*Pc.sx,0,uu,C.gold,4.5);marc(Pc.X(cx),Pc.Y(cy),Math.min(26,v.A*Pc.sx*.5),0,uu,A(C.fg,.6),1.5);
 ln(Pc.X(cx),Pc.Y(cy),Pc.X(px),Pc.Y(py),C.fg,2);
 ln(Pc.X(px),Pc.Y(cy),Pc.X(px),Pc.Y(py),C.yellow,3.2);ln(Pc.X(cx),Pc.Y(cy),Pc.X(px),Pc.Y(cy),C.blue,3.2);
 if(Math.abs(v.d)>.05)ln(Pc.l,Pc.Y(v.d),Pc.l+Pc.w,Pc.Y(v.d),A(C.teal,.6),1.2,[5,5]);
 dot(Pc.X(px),Pc.Y(py),6,C.fg);
 const f=x=>v.A*(fn==='sin'?Math.sin(v.k*x+v.phi):Math.cos(v.k*x+v.phi))+v.d;
 ln(Pg.l,Pg.Y(v.d),Pg.l+Pg.w,Pg.Y(v.d),A(C.teal,.6),1.2,[5,5]);
 Pg.fn(f,A(fn==='sin'?C.yellow:C.blue,.25),2);Pg.fn(f,fn==='sin'?C.yellow:C.blue,3.2,{from:0,to:S.th,prog:1});
 const gy=f(S.th);dot(Pg.X(S.th),Pg.Y(gy),6,fn==='sin'?C.yellow:C.blue);
 if(wide&&fn==='sin')ln(Pc.X(px),Pc.Y(py),Pg.X(S.th),Pg.Y(gy),A(C.yellow,.5),1.2,[4,5]);
 const T0=TAU/v.k;if(T0<4*PI){const yy=Pg.Y(Math.min(Pg.y1-.25,v.d+v.A+.35));const x0=Pg.X(.15),x1=Pg.X(.15+T0);arr(x0+8,yy,x1,yy,A(C.fg,.6),1.2,7);arr(x1-8,yy,x0,yy,A(C.fg,.6),1.2,7);T('T = '+nf(T0,2),(x0+x1)/2,yy-11,{a:'center',f:'n',s:12,c:C.fg2})}
 Tm(fn==='sin'?'sin v':'cos v',fn==='sin'?Pc.X(px)+8:(Pc.X(cx)+Pc.X(px))/2,fn==='sin'?(Pc.Y(cy)+Pc.Y(py))/2:Pc.Y(cy)+16,{c:fn==='sin'?C.yellow:C.blue,s:15,a:fn==='sin'?'left':'center'})},
readout(S){const u=S.p.k*S.th+S.p.phi;const uu=((u%TAU)+TAU)%TAU;return[['x',nf(S.th,2)+' rad'],['vinkel',nf(uu,2)+' rad = '+nf(deg(uu),0)+'°','gold'],['sin',nf(Math.sin(u),3),'yellow'],['cos',nf(Math.cos(u),3),'blue'],['periode',nf(TAU/S.p.k,2)]]},
live(S){const p=S.p;return`f(x)=${tn(p.A,1)}\\${p.fn}\\!\\left(${tn(p.k,2)}x ${tsg(p.phi,2)}\\right) ${tsg(p.d,1)}`}
});

/* ---------- 7. Fra sekant til tangent ---------- */
{
const FS={q:[x=>x*x/2,x=>x],p:[x=>x*x*x/4-x,x=>.75*x*x-1],s:[x=>2*Math.sin(x),x=>2*Math.cos(x)]};
M({id:'ma-sekant',s:'ma',c:['1T','R1','S1'],title:'Fra sekant til tangent',short:'Sekant og tangent',kw:'derivasjon momentan vekstfart gjennomsnittlig vekstfart grenseverdi stigningstall derivert',
lead:'Gjennomsnittlig vekstfart er stigningstallet til sekanten gjennom to punkt. Når $h$ går mot 0, blir sekanten til tangenten, og vi får den deriverte.',
hint:'Dra punktene, eller trykk «La h → 0».',
controls:[{id:'f',type:'seg',label:'Funksjon',value:'p',options:[['q','½x²'],['p','¼x³ − x'],['s','2 sin x']]},{id:'x0',label:'Punkt <i>x</i>₀',min:-3,max:3,step:.05,value:1.2},{id:'h',label:'Avstand <i>h</i>',min:.005,max:3,step:.005,value:2,d:3},{type:'btns',items:[['La h → 0',S=>{S.anim={t:0,h0:Math.max(S.p.h,.3)}}],['Tilbake til h = 2',S=>{S.anim=null;setP('h',2,S)}]]}],
tex:['\\frac{\\Delta y}{\\Delta x}=\\frac{f(x_0+\\cR{h})-f(x_0)}{\\cR{h}}','f\'(x_0)=\\lim_{h\\to 0}\\frac{f(x_0+h)-f(x_0)}{h}'],
about:['Den <strong>gule</strong> linjen er sekanten gjennom punktene $(x_0, f(x_0))$ og $(x_0+h, f(x_0+h))$. Stigningstallet er gjennomsnittlig vekstfart på intervallet.','Den <strong>turkise</strong> stiplede linjen er tangenten. Stigningstallet er den momentane vekstfarten, altså $f\'(x_0)$.','Trykk «La h → 0» og se sekanten legge seg oppå tangenten. Det er definisjonen av den deriverte som grenseverdi.'],
tasks:['Velg $\\tfrac12x^2$. Hva er $f\'(x_0)$ for ulike $x_0$? Ser du et mønster?','Finn punktene på $\\tfrac14x^3-x$ der tangenten er vannrett.','Hvor liten må $h$ være for at sekantens stigningstall skal stemme med $f\'(x_0)$ på to desimaler?','Hva skjer hvis du lar $h$ være negativ? (Dra det rosa punktet forbi det gule.)'],
update(S,dt){if(S.anim){S.anim.t+=dt/2.6;const e=ease(S.anim.t);S.p.h=Math.max(.005,S.anim.h0*Math.pow(.005/S.anim.h0,e));S.v.h=S.p.h;if(S===Stage.S)syncCtl('h');if(S.anim.t>=1)S.anim=null}},
draw(S){const[f,fp]=FS[S.p.f];const v=S.v,x0=v.x0,h=v.h;const P=Plane(-4,4,-4,4,pad(S,26),true);S.P=P;P.grid(1);P.axes({xs:1,ys:1,xl:'x',yl:'y'});
 const y0=f(x0),x1=x0+h,y1=f(x1),m=(y1-y0)/h,t=fp(x0);
 P.fn(x=>y0+t*(x-x0),C.teal,2,{dash:[7,6]});P.fn(f,C.blue,3.2);P.fn(x=>y0+m*(x-x0),C.yellow,2.4);
 ln(P.X(x0),P.Y(y0),P.X(x1),P.Y(y0),C.green,2.6);ln(P.X(x1),P.Y(y0),P.X(x1),P.Y(y1),C.red,2.6);
 if(Math.abs(h)>.25){T('Δx = h',(P.X(x0)+P.X(x1))/2,P.Y(y0)+(y1>y0?15:-15),{a:'center',f:'m',s:15,c:C.green});T('Δy',P.X(x1)+8,(P.Y(y0)+P.Y(y1))/2,{f:'m',s:15,c:C.red})}
 handle(P.X(x1),P.Y(y1),C.pink,S);handle(P.X(x0),P.Y(y0),C.yellow,S);
 infoBox(P.l+8,P.t+8,[[`sekant:  Δy/Δx = ${nf(m,4)}`,C.yellow],[`tangent: f′(x₀) = ${nf(t,4)}`,C.teal]])},
pick(S,x,y){const P=S.P;if(!P)return;const[f]=FS[S.p.f];const x0=S.p.x0,x1=x0+S.p.h;if(near(x,y,P.X(x0),P.Y(f(x0)),22))return{move:mx=>{S.anim=null;setP('x0',clamp(Math.round(P.ix(mx)*20)/20,-3,3),S)}};if(near(x,y,P.X(x1),P.Y(f(x1)),22))return{move:mx=>{S.anim=null;let h=P.ix(mx)-S.p.x0;h=clamp(Math.round(h*200)/200,.005,3);setP('h',h,S);S.v.h=h}}},
readout(S){const[f,fp]=FS[S.p.f];const x0=S.p.x0,h=S.p.h;return[['h',nf(h,3),'red'],['Δy/Δx',nf((f(x0+h)-f(x0))/h,4),'yellow'],["f′(x₀)",nf(fp(x0),4),'teal']]},
live(S){const[f]=FS[S.p.f];const x0=S.p.x0,h=S.p.h;return`\\frac{f(${tn(x0+h,3)})-f(${tn(x0,2)})}{${tn(h,3)}}=${tn((f(x0+h)-f(x0))/h,4)}`}
});
}

/* ---------- 8. Funksjonsdrøfting ---------- */
M({id:'ma-drofting',s:'ma',c:['R1','S1'],title:'Funksjonsdrøfting med f, f′ og f″',short:'Funksjonsdrøfting',kw:'derivasjon ekstremalpunkt toppunkt bunnpunkt vendepunkt monotoni fortegnslinje andrederivert krumning',
lead:'Grafen til $f\'$ forteller hvor $f$ stiger og synker. Grafen til $f\'\'$ forteller hvilken vei $f$ krummer. Dra den loddrette linjen og sammenlign.',
hint:'Dra den loddrette linjen sidelengs.',
controls:[{id:'a',label:'<i>a</i> (x³)',min:-1,max:1,step:.05,value:.25},{id:'b',label:'<i>b</i> (x²)',min:-2,max:2,step:.1,value:0},{id:'c',label:'<i>c</i> (x)',min:-4,max:4,step:.1,value:-3},{id:'d',label:'<i>d</i>',min:-4,max:4,step:.1,value:0}],
tex:['f(x)=ax^3+bx^2+cx+d','f\'(x)=\\cY{3ax^2+2bx+c}','f\'\'(x)=\\cK{6ax+2b}'],
about:['Der $f\'(x)>0$, stiger $f$ (grønn). Der $f\'(x)<0$, synker $f$ (rød). Der $f\'(x)=0$ og skifter fortegn, har $f$ et topp- eller bunnpunkt.','Tangenten til $f$ i det markerte punktet har stigningstall $f\'(x)$. Det er nøyaktig verdien du leser av på den gule grafen.','Der $f\'\'$ skifter fortegn, har $f$ et <strong>vendepunkt</strong> (lilla). Der vender grafen den hule siden fra opp til ned eller omvendt.'],
tasks:['Hvorfor har en tredjegradsfunksjon alltid nøyaktig ett vendepunkt når $a\\neq 0$?','Juster $c$ slik at $f$ ikke har noen topp- eller bunnpunkt. Hva skjer med grafen til $f\'$?','Finn ut om vendepunktet ligger midt mellom toppunktet og bunnpunktet.','Sett $a=0$. Hva slags funksjon er $f$ da, og hvordan ser $f\'\'$ ut?'],
init(S){S.cx=1},
draw(S){const v=S.v,f=x=>v.a*x**3+v.b*x*x+v.c*x+v.d,fp=x=>3*v.a*x*x+2*v.b*x+v.c,fpp=x=>6*v.a*x+2*v.b;
 const bs=rows(pad(S,26,24,24),[1.7,1,1],20);const Pf=Plane(-4.5,4.5,-8,8,bs[0]),Pd=Plane(-4.5,4.5,-8,8,bs[1]),Pdd=Plane(-4.5,4.5,-8,8,bs[2]);S.Ps=[Pf,Pd,Pdd];
 [Pf,Pd,Pdd].forEach((P,i)=>{P.grid(1,{sy:i?4:2,minor:false,alpha:.1});P.axes({xs:1,ys:i?4:4})});
 Pd.clip(()=>{Pd.area(x=>Math.max(0,fp(x)),-4.5,4.5,A(C.green,.18));Pd.area(x=>Math.min(0,fp(x)),-4.5,4.5,A(C.red,.18))});
 const ex=[];const qa=3*v.a,qb=2*v.b,qc=v.c;if(Math.abs(qa)>1e-6){const D=qb*qb-4*qa*qc;if(D>0){const r=Math.sqrt(D);ex.push((-qb-r)/(2*qa),(-qb+r)/(2*qa))}}else if(Math.abs(qb)>1e-6)ex.push(-qc/qb);
 const inf=Math.abs(v.a)>1e-3?[-v.b/(3*v.a)]:[];
 ex.forEach(x=>{if(x<-4.5||x>4.5)return;[Pf,Pd,Pdd].forEach(P=>ln(P.X(x),P.t,P.X(x),P.t+P.h,A(C.yellow,.35),1.2,[4,5]))});inf.forEach(x=>{if(x<-4.5||x>4.5)return;[Pf,Pd,Pdd].forEach(P=>ln(P.X(x),P.t,P.X(x),P.t+P.h,A(C.purple,.45),1.2,[4,5]))});
 Pf.clip(()=>{const n=300;let px=null,py=null;for(let i=0;i<=n*INTRO;i++){const x=-4.5+9*i/n;const X_=Pf.X(x),Y_=Pf.Y(f(x));if(px!==null)ln(px,py,X_,Y_,fp(x)>=0?C.green:C.red,3.2);px=X_;py=Y_}});
 Pd.fn(fp,C.yellow,2.8);Pdd.fn(fpp,C.pink,2.8);
 ex.forEach(x=>{if(x<-4.5||x>4.5)return;dot(Pf.X(x),Pf.Y(f(x)),6,C.yellow);T(fpp(x)<0?'toppunkt':'bunnpunkt',Pf.X(x),Pf.Y(f(x))+(fpp(x)<0?-16:17),{a:'center',s:12,c:C.yellow,bg:A(C.stage,.7)});dot(Pd.X(x),Pd.Y(0),4.5,C.yellow)});
 inf.forEach(x=>{if(x<-4.5||x>4.5)return;dot(Pf.X(x),Pf.Y(f(x)),6,C.purple);dot(Pdd.X(x),Pdd.Y(0),4.5,C.purple)});
 const cx=S.cx;[Pf,Pd,Pdd].forEach(P=>ln(P.X(cx),P.t,P.X(cx),P.t+P.h,A(C.fg,.55),1.4));
 const yc=f(cx),m=fp(cx),dx=1.1;Pf.clip(()=>ln(Pf.X(cx-dx),Pf.Y(yc-m*dx),Pf.X(cx+dx),Pf.Y(yc+m*dx),C.yellow,2.2));dot(Pf.X(cx),Pf.Y(yc),6,C.fg);dot(Pd.X(cx),Pd.Y(m),6,C.yellow);dot(Pdd.X(cx),Pdd.Y(fpp(cx)),6,C.pink);
 handle(Pf.X(cx),Pf.t+10,C.fg,S);
 Tm('f(x)',Pf.l+6,Pf.t+12,{c:C.green});Tm('f′(x)',Pd.l+6,Pd.t+10,{c:C.yellow});Tm('f″(x)',Pdd.l+6,Pdd.t+10,{c:C.pink})},
pick(S,x,y){if(!S.Ps)return;const P=S.Ps[0];if(Math.abs(x-P.X(S.cx))<16&&y>P.t-10&&y<S.Ps[2].t+S.Ps[2].h)return{move:mx=>{S.cx=clamp(Math.round(P.ix(mx)*20)/20,-4.4,4.4)}}},
readout(S){const p=S.p,x=S.cx,f=p.a*x**3+p.b*x*x+p.c*x+p.d,fp=3*p.a*x*x+2*p.b*x+p.c,fpp=6*p.a*x+2*p.b;return[['x',nf(x,2)],['f(x)',nf(f,3),'green'],['f′(x)',nf(fp,3),'yellow'],['f″(x)',nf(fpp,3),'pink'],['',fp>1e-9?'stiger':fp<-1e-9?'synker':'vannrett tangent'],['',fpp>1e-9?'hul side opp':fpp<-1e-9?'hul side ned':'mulig vendepunkt']]},
live(S){const p=S.p;return`f'(x)=${tn(3*p.a,2)}x^2 ${tsg(2*p.b,1)}x ${tsg(p.c,1)}`}
});

/* ---------- 9. Grenseverdier og kontinuitet ---------- */
{
const GF={hull:{a:1,f:x=>(x*x-1)/(x-1),g:x=>x+1,L:2,R:2,lab:'(x² − 1)/(x − 1)',def:null},
 sprang:{a:1,f:x=>x<1?x+1:x-1,L:2,R:0,lab:'x + 1 for x < 1,  x − 1 for x ≥ 1',def:0},
 asym:{a:1,f:x=>1/((x-1)*(x-1)),L:Infinity,R:Infinity,lab:'1/(x − 1)²',def:null},
 sinx:{a:0,f:x=>Math.sin(x)/x,g:x=>x===0?1:Math.sin(x)/x,L:1,R:1,lab:'sin x / x',def:null},
 kont:{a:1,f:x=>.5*x*x+.5,L:1,R:1,lab:'½x² + ½',def:1}};
M({id:'ma-grense',s:'ma',c:['R1','S1'],title:'Grenseverdier og kontinuitet',short:'Grenseverdier',kw:'grenseverdi kontinuerlig diskontinuitet asymptote venstre høyre lim',
lead:'En grenseverdi er verdien $f(x)$ nærmer seg når $x$ nærmer seg $a$, uansett hva som skjer akkurat i $a$. Vi sjekker fra venstre og fra høyre.',
controls:[{id:'fn',type:'seg',label:'Funksjon',value:'hull',options:[['hull','Hull i grafen'],['sprang','Sprang'],['asym','Asymptote'],['sinx','sin x / x'],['kont','Kontinuerlig']]},{id:'dl',label:'Avstand <i>δ</i>',min:.005,max:2.5,step:.005,value:1.6,d:3},{type:'btns',items:[['La δ → 0',S=>{S.anim={t:0,d0:Math.max(S.p.dl,.4)}}]]}],
tex:['\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)=L\\;\\Rightarrow\\;\\lim_{x\\to a}f(x)=L','f\\text{ kontinuerlig i }a\\iff\\lim_{x\\to a}f(x)=f(a)'],
about:['Det <strong>blå</strong> punktet nærmer seg $a$ fra venstre, det <strong>gule</strong> fra høyre. Grenseverdien finnes bare hvis de nærmer seg samme tall.','En åpen ring betyr at funksjonen ikke er definert i punktet. Grenseverdien kan likevel finnes, slik som for $\\frac{x^2-1}{x-1}$ i $x=1$.','En funksjon er <strong>kontinuerlig</strong> i $a$ når grenseverdien finnes og er lik funksjonsverdien. Da kan du tegne grafen uten å løfte blyanten.'],
tasks:['Faktoriser $x^2-1$ og forklar hvorfor grafen til $\\frac{x^2-1}{x-1}$ er en rett linje med et hull.','Hvorfor har funksjonen med sprang ingen grenseverdi i $x=1$?','Bruk $\\frac{\\sin x}{x}$. Hva skjer med verdiene når $\\delta$ blir veldig liten?','Lag en egen funksjon med et hull i $x=2$.'],
update(S,dt){if(S.anim){S.anim.t+=dt/2.6;const e=ease(S.anim.t);S.p.dl=Math.max(.005,S.anim.d0*Math.pow(.005/S.anim.d0,e));S.v.dl=S.p.dl;if(S===Stage.S)syncCtl('dl');if(S.anim.t>=1)S.anim=null}},
change(S,id){if(id==='fn')S.anim=null},
draw(S){const G=GF[S.p.fn],a=G.a,d=S.v.dl;const P=Plane(a-4,a+4,-2,6,pad(S,28));P.grid(1);P.axes({xs:1,ys:1,xl:'x',yl:'y'});
 ln(P.X(a),P.t,P.X(a),P.t+P.h,A(C.fg,.35),1.2,[5,5]);Tm('a',P.X(a)+6,P.Y(0)+16,{s:15,c:C.fg2});
 if(S.p.fn==='sprang'){P.fn(G.f,C.blue,3.2,{to:a-1e-6});P.fn(G.f,C.blue,3.2,{from:a});}else P.fn(G.g||G.f,C.blue,3.2);
 if(isFinite(G.L)&&S.p.fn!=='kont')circ(P.X(a),P.Y(G.L),6,C.blue,C.stage,2.2);
 if(S.p.fn==='sprang'){circ(P.X(a),P.Y(G.R),6,null,C.blue)}
 if(S.p.fn==='kont')dot(P.X(a),P.Y(G.f(a)),6,C.blue);
 const xl=a-d,xr=a+d,yl=G.f(xl),yr=G.f(xr);
 [[xl,yl,C.blue],[xr,yr,C.yellow]].forEach(([x,y,c])=>{if(!isFinite(y)||y>6.2)return;ln(P.X(x),P.Y(y),P.l,P.Y(y),A(c,.5),1.2,[4,4]);ln(P.X(x),P.Y(y),P.X(x),P.Y(0),A(c,.5),1.2,[4,4]);dot(P.X(x),P.Y(y),7,c);T(nf(y,4),P.l+6,P.Y(y)-11,{f:'n',s:12,c,bg:A(C.stage,.75)})});
 const fin=G.L===G.R,cont=fin&&isFinite(G.L)&&G.def!==null&&G.f(a)===G.L;const fmt=v=>isFinite(v)?nf(v,2):'∞';
 infoBox(P.l+P.w-300>P.l?P.l+P.w-300:P.l+8,P.t+8,[[`f(x) = ${G.lab}`,C.fg],[`fra venstre:  → ${fmt(G.L)}`,C.blue],[`fra høyre:    → ${fmt(G.R)}`,C.yellow],[fin&&isFinite(G.L)?`grenseverdien er ${fmt(G.L)}`:fin?'går mot uendelig: ingen grenseverdi':'ulike sider: ingen grenseverdi',C.fg],[cont?'kontinuerlig i a':'ikke kontinuerlig i a',cont?C.green:C.red]],{s:12.5})},
readout(S){const G=GF[S.p.fn],d=S.p.dl;return[['δ',nf(d,3)],['f(a − δ)',nf(G.f(G.a-d),5),'blue'],['f(a + δ)',nf(G.f(G.a+d),5),'yellow']]}
});
}

/* ---------- 10. Eksponentialfunksjon og logaritme ---------- */
M({id:'ma-logaritme',s:'ma',c:['R1','S1'],title:'Eksponentialfunksjon, logaritme og omvendt funksjon',short:'Logaritmer',kw:'logaritme eksponentialfunksjon omvendt funksjon speiling ln lg e grunntall',
lead:'Logaritmen er den omvendte funksjonen til eksponentialfunksjonen. Grafene er speilbilder av hverandre om linjen $y=x$.',
hint:'Dra det blå punktet på eksponentialgrafen.',
controls:[{id:'b',label:'Grunntall <i>b</i>',min:.2,max:5,step:.01,value:2},{type:'btns',items:[['b = e',S=>setP('b',Math.E,S)],['b = 2',S=>setP('b',2,S)],['b = 10',S=>setP('b',10,S)],['b = ½',S=>setP('b',.5,S)]]},{id:'inv',type:'check',label:'Vis logaritmen (omvendt funksjon)',value:true}],
tex:['\\cB{y=b^x}\\iff \\cY{x=\\log_b y}','\\log_b(b^x)=x,\\qquad b^{\\log_b y}=y','\\ln x=\\log_e x,\\qquad \\lg x=\\log_{10}x'],
about:['Punktet $(x, b^x)$ på den blå grafen har et speilbilde $(b^x, x)$ på den gule. Bytter du om $x$ og $y$, får du den omvendte funksjonen.','Eksponentialfunksjonen er alltid positiv, så logaritmen er bare definert for positive tall.','Alle grafene $y=b^x$ går gjennom $(0,1)$. Alle logaritmegrafene går derfor gjennom $(1,0)$.','Grunntallet $e\\approx 2{,}718$ gir den naturlige logaritmen $\\ln$. Med $b=e$ har tangenten i $(0,1)$ stigningstall nøyaktig 1.'],
tasks:['Finn $\\log_2 8$ ved å dra punktet til $b^x=8$.','Hva skjer med grafene når $b$ er mellom 0 og 1?','Hvorfor er $\\log_b 1=0$ for alle grunntall?','Løs $2^x=5$ grafisk. Sjekk med $x=\\frac{\\lg 5}{\\lg 2}$.'],
init(S){S.x=1.5},
draw(S){const b=Math.max(.2,S.v.b);const P=Plane(-4,8,-4,8,pad(S,26),true);S.P=P;P.grid(1);P.axes({xs:1,ys:1,xl:'x',yl:'y'});
 P.fn(x=>x,A(C.fg,.4),1.4,{dash:[6,6]});Tm('y = x',P.X(6.6),P.Y(6.6)-14,{c:C.fg3,s:14,a:'center'});
 const ok=Math.abs(b-1)>.02;P.fn(x=>Math.pow(b,x),C.blue,3.2);if(S.p.inv&&ok)P.fn(x=>x>0?Math.log(x)/Math.log(b):NaN,C.yellow,3.2,{from:.001});
 const x=S.x,y=Math.pow(b,x);if(y<9&&y>-5){if(S.p.inv&&ok){ln(P.X(x),P.Y(y),P.X(y),P.Y(x),A(C.fg,.5),1.3,[5,5]);dot(P.X(y),P.Y(x),6.5,C.yellow);T(`(${nf(y,2)}, ${nf(x,2)})`,P.X(y)+12,P.Y(x)+16,{f:'n',s:12,c:C.yellow,bg:A(C.stage,.7)})}handle(P.X(x),P.Y(y),C.blue,S);T(`(${nf(x,2)}, ${nf(y,2)})`,P.X(x)-12,P.Y(y)-17,{f:'n',s:12,c:C.blue,a:'right',bg:A(C.stage,.7)})}
 dot(P.X(0),P.Y(1),4,C.blue);if(S.p.inv&&ok)dot(P.X(1),P.Y(0),4,C.yellow);
 if(!ok)infoBox(P.l+8,P.t+8,['b = 1 gir en vannrett linje. Da finnes ingen logaritme.'])},
pick(S,x,y){const P=S.P;if(!P)return;const b=S.p.b,yy=Math.pow(b,S.x);if(near(x,y,P.X(S.x),P.Y(yy),24))return{move:mx=>{let nx=P.ix(mx);const lim=b>1?Math.log(7.8)/Math.log(b):b<1?Math.log(7.8)/Math.log(b):9;nx=b>1?Math.min(nx,lim):b<1?Math.max(nx,lim):nx;S.x=clamp(Math.round(nx*20)/20,-3.9,7.9)}}},
readout(S){const b=S.p.b,y=Math.pow(b,S.x);return[['b',nf(b,3)],['x',nf(S.x,2)],['bˣ',nf(y,3),'blue'],['log_b(bˣ)',nf(S.x,2),'yellow']]},
live(S){const b=S.p.b,y=Math.pow(b,S.x);return`${tn(b,2)}^{${tn(S.x,2)}}=${tn(y,3)}\\iff\\log_{${tn(b,2)}}${tn(y,3)}=${tn(S.x,2)}`}
});

/* ---------- 11. Logistisk vekst ---------- */
{
const DATA=(()=>{const r=rng(7),K=320,rr_=.55,N0=8,a=(K-N0)/N0,out=[];for(let t=0;t<=20.01;t+=1.25){const N=K/(1+a*Math.exp(-rr_*t));out.push([t,Math.max(1,N*(1+.07*(r()+r()+r()-1.5)))])}return out})();
const PTS=(()=>{const r=rng(3),o=[];for(let i=0;i<520;i++){const ang=r()*TAU,rad=Math.sqrt(r());o.push([Math.cos(ang)*rad,Math.sin(ang)*rad])}return o})();
const Nl=(v,t)=>v.K/(1+(v.K-v.N0)/v.N0*Math.exp(-v.r*t));
M({id:'ma-logistisk',s:'ma',c:['R1','S2'],title:'Eksponentiell og logistisk vekst',short:'Logistisk vekst',kw:'bæreevne populasjon modell regresjon vekstfart vendepunkt eksponentiell vekst',
lead:'Eksponentiell vekst fortsetter for alltid. I virkeligheten blir det trangt, og veksten flater ut mot bæreevnen $K$. Tilpass modellen til målingene.',
controls:[{id:'K',label:'Bæreevne <i>K</i>',min:50,max:500,step:5,value:220},{id:'r',label:'Vekstrate <i>r</i>',min:.1,max:1.2,step:.01,value:.4},{id:'N0',label:'Startverdi <i>N</i>₀',min:1,max:50,step:1,value:12},{id:'m',type:'seg',label:'Modell',value:'begge',options:[['log','Logistisk'],['eksp','Eksponentiell'],['begge','Begge']]}],
tex:['N(t)=\\frac{\\cB{K}}{1+a\\,e^{-\\cR{r}t}},\\qquad a=\\frac{K-N_0}{N_0}','N\'(t)=r\\,N\\left(1-\\frac{N}{K}\\right)','\\text{eksponentiell: }N(t)=N_0\\,e^{rt}'],
about:['De hvite punktene er eksempeldata fra en tenkt gjærkultur. Prøv å få den blå kurven til å treffe punktene, og se på avviket.','I starten er logistisk og eksponentiell vekst nesten like. Når $N$ nærmer seg $K$, bremser veksten.','Veksten er raskest når $N=\\frac{K}{2}$. Der har grafen et vendepunkt (lilla).'],
tasks:['Finn verdier for $K$, $r$ og $N_0$ som gir et avvik under 10.','Når slutter den eksponentielle modellen å passe med dataene?','Vis at $N\'$ er størst når $N=K/2$.','Hvilke ting kan begrense veksten til en befolkning av dyr i naturen?'],
init(S){S.tau=0},
update(S,dt){S.tau+=dt*1.7;if(S.tau>22)S.tau=0},
draw(S){const v=S.v,[bp,bg]=split(S,.3,{g:26});const R=Math.min(bp.w,bp.h)*.46,cx=bp.l+bp.w/2,cy=bp.t+bp.h/2;
 circ(cx,cy,R+6,A(C.fg,.35),A(C.fg,.04),2);const tt=Math.min(S.tau,20),N=Math.round(Nl(v,tt));for(let i=0;i<Math.min(N,PTS.length);i++)dot(cx+PTS[i][0]*R,cy+PTS[i][1]*R,R>90?2.6:2,A(C.gold,.9));
 T(`N = ${N}`,cx,cy+R+22,{a:'center',f:'n',s:13,c:C.gold});T(`t = ${nf(tt,1)} timer`,cx,bp.t+6,{a:'center',f:'n',s:12,c:C.fg2});
 const P=Plane(0,20,0,550,bg);P.grid(2,{sy:100,minor:false,alpha:.12});P.axes({xs:4,ys:100,xl:'t',yl:'N',x0:true});
 ln(P.l,P.Y(v.K),P.l+P.w,P.Y(v.K),A(C.blue,.5),1.2,[6,5]);T('K',P.l+P.w-4,P.Y(v.K)-11,{a:'right',f:'m',s:16,c:C.blue});
 if(S.p.m!=='log')P.fn(t=>v.N0*Math.exp(v.r*t),C.red,2.4,{dash:[7,5]});
 if(S.p.m!=='eksp'){P.fn(t=>Nl(v,t),C.blue,3.2);const ti=Math.log((v.K-v.N0)/v.N0)/v.r;if(ti>0&&ti<20){dot(P.X(ti),P.Y(v.K/2),6,C.purple);T('raskest vekst',P.X(ti)+10,P.Y(v.K/2)+14,{s:12,c:C.purple})}}
 DATA.forEach(([t,n])=>circ(P.X(t),P.Y(n),4,C.fg,A(C.stage,.8),1.6));
 ln(P.X(tt),P.t,P.X(tt),P.t+P.h,A(C.gold,.45),1.2);dot(P.X(tt),P.Y(Nl(v,tt)),5,C.gold)},
readout(S){const p=S.p;const rm=Math.sqrt(DATA.reduce((s,[t,n])=>s+(n-Nl(p,t))**2,0)/DATA.length);const N=Nl(p,Math.min(S.tau,20));return[['N',nf(N,0),'gold'],["N′",nf(p.r*N*(1-N/p.K),1)+' per time'],['avvik (RMSE)',nf(rm,1),rm<10?'green':'red']]},
live(S){const p=S.p;return`N(t)=\\frac{${tn(p.K,0)}}{1+${tn((p.K-p.N0)/p.N0,2)}\\,e^{-${tn(p.r,2)}t}}`}
});
}

/* ---------- 12. Vektorer i planet ---------- */
{
M({id:'ma-vektor',s:'ma',c:['R1'],title:'Vektorer i planet',short:'Vektorer i planet',kw:'vektor sum differanse skalarprodukt vinkel projeksjon lengde koordinater parallell vinkelrett',
lead:'En vektor har lengde og retning. Dra spissene og se hvordan sum, differanse og skalarprodukt henger sammen med geometrien.',
hint:'Dra spissene på vektorene.',
controls:[{id:'mode',type:'seg',label:'Vis',value:'sum',options:[['sum','Sum'],['diff','Differanse'],['skalar','Skalarprodukt'],['skal','t · u']]},{id:'t',label:'Skalar <i>t</i>',min:-2,max:2.5,step:.1,value:1.5,show:S=>S.p.mode==='skal'}],
tex:['\\vec u+\\vec v=[x_1+x_2,\\;y_1+y_2]','\\vec u\\cdot\\vec v=x_1x_2+y_1y_2=|\\vec u|\\,|\\vec v|\\cos\\theta','|\\vec u|=\\sqrt{x^2+y^2}'],
about:['Summen $\\vec u+\\vec v$ (grønn) får du ved å sette $\\vec v$ etter $\\vec u$. Parallellogrammet viser at rekkefølgen ikke spiller noen rolle.','Differansen $\\vec u-\\vec v$ (rød) går fra spissen av $\\vec v$ til spissen av $\\vec u$.','Skalarproduktet er et tall. Det er positivt når vinkelen er spiss, null når vektorene står vinkelrett, og negativt når vinkelen er stump.','Den turkise vektoren er projeksjonen av $\\vec v$ ned på $\\vec u$.'],
tasks:['Gjør $\\vec u\\cdot\\vec v=0$. Hva er vinkelen mellom vektorene?','Finn $t$ slik at $t\\vec u$ har lengde 5 når $\\vec u=[3,4]$.','Når er $|\\vec u+\\vec v|=|\\vec u|+|\\vec v|$?','Bruk skalarproduktet til å finne vinkelen mellom $[2,1]$ og $[-1,3]$.'],
init(S){S.u=[3,1];S.w=[1,2.5]},
draw(S){const P=Plane(-6,6,-5,5,pad(S,26),true);S.P=P;P.grid(1);P.axes({xs:1,ys:1,xl:'x',yl:'y'});const u=S.u,w=S.w,O=P.pt(0,0),U=P.pt(...u),V=P.pt(...w),mode=S.p.mode;
 if(mode==='sum'){const s=[u[0]+w[0],u[1]+w[1]];ln(...U,...P.pt(...s),A(C.yellow,.6),2,[6,5]);ln(...V,...P.pt(...s),A(C.blue,.6),2,[6,5]);poly([O,U,P.pt(...s),V],null,A(C.green,.07));arr(...O,...P.pt(...s),C.green,3.4);vlab('u + v',P.X(s[0])+8,P.Y(s[1])-14,C.green,17)}
 if(mode==='diff'){const d=[u[0]-w[0],u[1]-w[1]];arr(...V,...U,C.red,3.4);arr(...O,...P.pt(...d),A(C.red,.4),2);vlab('u − v',(V[0]+U[0])/2+16,(V[1]+U[1])/2-6,C.red,17)}
 if(mode==='skalar'){const uu=u[0]*u[0]+u[1]*u[1],dp=u[0]*w[0]+u[1]*w[1],k=uu?dp/uu:0,F=[u[0]*k,u[1]*k];P.clip(()=>ln(P.X(-u[0]*6),P.Y(-u[1]*6),P.X(u[0]*6),P.Y(u[1]*6),A(C.blue,.2),1));ln(...V,...P.pt(...F),A(C.fg,.5),1.4,[4,4]);arr(...O,...P.pt(...F),C.teal,4.5);
  const a1=Math.atan2(u[1],u[0]),a2=Math.atan2(w[1],w[0]);let d=a2-a1;while(d>PI)d-=TAU;while(d<-PI)d+=TAU;marc(...O,30,a1,a1+d,A(C.fg,.7),1.8);const th=Math.acos(clamp(dp/(Math.hypot(...u)*Math.hypot(...w)||1),-1,1));T(nf(deg(th),1)+'°',O[0]+Math.cos(-(a1+d/2))*48,O[1]+Math.sin(-(a1+d/2))*48,{a:'center',f:'n',s:12,c:C.fg2});
  infoBox(P.l+8,P.t+8,[[`u · v = ${nf(u[0],1)}·${nf(w[0],1)} + ${nf(u[1],1)}·${nf(w[1],1)} = ${nf(dp,2)}`,Math.abs(dp)<1e-9?C.yellow:dp>0?C.green:C.red],[`|u|·|v|·cos θ = ${nf(Math.hypot(...u),2)}·${nf(Math.hypot(...w),2)}·${nf(Math.cos(th),3)}`],[Math.abs(dp)<1e-9?'vinkelrett!':dp>0?'spiss vinkel: positivt':'stump vinkel: negativt']],{s:12.5})}
 if(mode==='skal'){const t=S.v.t;arr(...O,...P.pt(u[0]*t,u[1]*t),C.green,5);vlab(nf(t,1)+'u',P.X(u[0]*t)+12,P.Y(u[1]*t)+16,C.green,16)}
 if(mode!=='skal'){arr(...O,...V,C.yellow,3.4);vlab('v',V[0]+12,V[1]-10,C.yellow)}
 arr(...O,...U,C.blue,3.4);vlab('u',U[0]+12,U[1]-10,C.blue);
 if(mode!=='skal')handle(...V,C.yellow,S);handle(...U,C.blue,S)},
pick(S,x,y){const P=S.P;if(!P)return;for(const k of['u','w']){if(k==='w'&&S.p.mode==='skal')continue;const q=S[k];if(near(x,y,...P.pt(...q),22))return{move:(mx,my)=>{const nx=clamp(Math.round(P.ix(mx)*2)/2,-5.5,5.5),ny=clamp(Math.round(P.iy(my)*2)/2,-4.5,4.5);if(nx||ny)S[k]=[nx,ny]}}}},
readout(S){const u=S.u,w=S.w,dp=u[0]*w[0]+u[1]*w[1];const r=[['u',`[${nf(u[0],1)}, ${nf(u[1],1)}]`,'blue'],['|u|',nf(Math.hypot(...u),3),'blue']];if(S.p.mode!=='skal')r.push(['v',`[${nf(w[0],1)}, ${nf(w[1],1)}]`,'yellow'],['|v|',nf(Math.hypot(...w),3),'yellow'],['u · v',nf(dp,2)],['θ',nf(deg(Math.acos(clamp(dp/(Math.hypot(...u)*Math.hypot(...w)),-1,1))),1)+'°']);else r.push(['t·u',`[${nf(u[0]*S.p.t,2)}, ${nf(u[1]*S.p.t,2)}]`,'green']);return r}
});
}
