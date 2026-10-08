/* ================= MATEMATIKK (del 2) ================= */

/* ---------- 13. Parameterframstilling ---------- */
{
const g=9.81;
const PM={
 linje:{B:[-6,6,-5,5],r:(v,t)=>[-3+v.rx*t,-1+v.ry*t],d:v=>[v.rx,v.ry],T:()=>[-3,3],k:1,spd:.8},
 sirkel:{B:[-5,5,-5,5],r:(v,t)=>[v.R*Math.cos(v.w*t),v.R*Math.sin(v.w*t)],d:(v,t)=>[-v.R*v.w*Math.sin(v.w*t),v.R*v.w*Math.cos(v.w*t)],T:v=>[0,TAU/v.w],k:.45,spd:1},
 kast:{B:[-.5,16,-.6,9],r:(v,t)=>{const a=rad(v.al);return[v.v0*Math.cos(a)*t,v.v0*Math.sin(a)*t-g/2*t*t]},d:(v,t)=>{const a=rad(v.al);return[v.v0*Math.cos(a),v.v0*Math.sin(a)-g*t]},T:v=>[0,2*v.v0*Math.sin(rad(v.al))/g],k:.22,spd:.7},
 lis:{B:[-4,4,-4,4],r:(v,t)=>[3*Math.sin(v.fa*t),3*Math.sin(v.fb*t+v.ph)],d:(v,t)=>[3*v.fa*Math.cos(v.fa*t),3*v.fb*Math.cos(v.fb*t+v.ph)],T:()=>[0,TAU],k:.18,spd:.6}};
const tNow=S=>{const m=PM[S.p.mode],[a,b]=m.T(S.v);return a+((S.tt*m.spd)%(b-a+1e-9))};
M({id:'ma-parameter',s:'ma',c:['R1','R2'],title:'Parameterframstilling av linjer og kurver',short:'Parameterframstilling',kw:'parameter linje kurve retningsvektor fartsvektor sirkel kast lissajous',
lead:'I en parameterframstilling er både $x$ og $y$ funksjoner av en parameter $t$. Tenk på $t$ som tid: punktet beveger seg, og den gule pilen er fartsvektoren $\\vec{r}\'(t)$.',
controls:[{id:'mode',type:'seg',label:'Kurve',value:'linje',options:[['linje','Linje'],['sirkel','Sirkel'],['kast','Kast'],['lis','Lissajous']]},
 {id:'rx',label:'Retningsvektor <i>x</i>',min:-3,max:3,step:.5,value:2,show:S=>S.p.mode==='linje'},{id:'ry',label:'Retningsvektor <i>y</i>',min:-3,max:3,step:.5,value:1,show:S=>S.p.mode==='linje'},
 {id:'R',label:'Radius <i>r</i>',min:1,max:4.5,step:.1,value:3,show:S=>S.p.mode==='sirkel'},{id:'w',label:'Vinkelfart <i>ω</i>',min:.5,max:3,step:.1,value:1,show:S=>S.p.mode==='sirkel'},
 {id:'v0',label:'Startfart <i>v</i>₀',min:4,max:12,step:.1,value:10,unit:'m/s',show:S=>S.p.mode==='kast'},{id:'al',label:'Vinkel <i>α</i>',min:10,max:85,step:1,value:50,unit:'°',show:S=>S.p.mode==='kast'},
 {id:'fa',label:'<i>a</i>',min:1,max:5,step:1,value:3,show:S=>S.p.mode==='lis'},{id:'fb',label:'<i>b</i>',min:1,max:5,step:1,value:2,show:S=>S.p.mode==='lis'},{id:'ph',label:'Fase <i>φ</i>',min:0,max:3.14,step:.01,value:1.57,show:S=>S.p.mode==='lis'}],
tex:['\\vec r(t)=[x(t),\\,y(t)]','\\vec{r}\'(t)=[x\'(t),\\,y\'(t)]=\\vec v(t)','\\ell:\\;[x,y]=[x_0,y_0]+t\\,[a,b]'],
about:['For en <strong>linje</strong> er punktet $P_0$ startstedet og $[a,b]$ retningsvektoren. Hver hele verdi av $t$ er merket.','Fartsvektoren er den deriverte av posisjonsvektoren. Den peker alltid langs kurven, altså i bevegelsesretningen.','I <strong>kast</strong>-kurven er $x(t)$ lineær og $y(t)$ en andregradsfunksjon. Legg merke til at den vannrette delen av farten aldri endrer seg.'],
tasks:['Finn retningsvektoren til linjen gjennom $(-3,-1)$ og $(1, 1)$.','Hva skjer med fartsvektoren på toppen av kastet?','Velg Lissajous med $a=b$. Hva slags kurver kan du få ved å endre $\\varphi$?','Hvorfor har fartsvektoren konstant lengde i sirkelbevegelsen?'],
init(S){S.tt=0},
change(S,id){if(id==='mode')S.tt=0},
update(S,dt){S.tt+=dt},
draw(S){const m=PM[S.p.mode],v=S.v,[a,b]=m.T(v);const P=Plane(...m.B,pad(S,26),true);P.grid(1);P.axes({xs:S.p.mode==='kast'?2:1,ys:S.p.mode==='kast'?2:1,xl:'x',yl:'y'});
 const N=300,pts=[];for(let i=0;i<=N;i++){const tt=a+(b-a)*i/N;pts.push(P.pt(...m.r(v,tt)))}
 if(S.p.mode==='linje'){P.clip(()=>{const q1=P.pt(...m.r(v,-12)),q2=P.pt(...m.r(v,12));ln(...q1,...q2,A(C.blue,.35),1.5)})}
 pth(pts,A(C.blue,.35),2);
 const t=tNow(S),tr=[];for(let i=0;i<=120;i++){const tt=a+(t-a)*i/120;tr.push(P.pt(...m.r(v,tt)))}pth(tr,C.blue,3.2);
 if(S.p.mode==='linje'){for(let k=-3;k<=3;k++){const q=P.pt(...m.r(v,k));dot(...q,3.5,C.fg2);T('t = '+k,q[0]+8,q[1]+12,{f:'n',s:10.5,c:C.fg3})}const p0=P.pt(-3,-1);dot(...p0,6,C.red);T('P₀',p0[0]-8,p0[1]-12,{a:'right',f:'m',s:16,c:C.red})}
 if(S.p.mode==='sirkel')ln(P.X(0),P.Y(0),...P.pt(...m.r(v,t)),A(C.fg,.5),1.3);
 const p=m.r(v,t),d=m.d(v,t),q=P.pt(...p);
 if(S.p.mode==='kast'){const e=P.pt(p[0]+d[0]*m.k,p[1]);ln(...q,...e,A(C.blue,.7),1.6,[4,4]);const e2=P.pt(p[0],p[1]+d[1]*m.k);ln(...q,...e2,A(C.yellow,.7),1.6,[4,4])}
 arr(...q,...P.pt(p[0]+d[0]*m.k,p[1]+d[1]*m.k),C.yellow,3);dot(...q,7,C.fg);
 T('t = '+nf(t,2),P.l+P.w-8,P.t+14,{a:'right',f:'n',s:13,c:C.fg2,bg:A(C.stage,.8)})},
readout(S){const m=PM[S.p.mode],t=tNow(S),p=m.r(S.p,t),d=m.d(S.p,t);return[['t',nf(t,2)],['x(t)',nf(p[0],2),'blue'],['y(t)',nf(p[1],2),'blue'],['|v|',nf(Math.hypot(...d),2),'yellow']]},
live(S){const p=S.p;switch(p.mode){case'linje':return`\\begin{cases}x=-3 ${tsg(p.rx,1)}\\,t\\\\ y=-1 ${tsg(p.ry,1)}\\,t\\end{cases}`;case'sirkel':return`\\begin{cases}x=${tn(p.R,1)}\\cos(${tn(p.w,1)}t)\\\\ y=${tn(p.R,1)}\\sin(${tn(p.w,1)}t)\\end{cases}`;case'kast':{const a=rad(p.al);return`\\begin{cases}x=${tn(p.v0*Math.cos(a),2)}\\,t\\\\ y=${tn(p.v0*Math.sin(a),2)}\\,t-4{,}905\\,t^2\\end{cases}`}default:return`\\begin{cases}x=3\\sin(${p.fa}t)\\\\ y=3\\sin(${p.fb}t ${tsg(p.ph,2)})\\end{cases}`}}
});
}

/* ---------- 14. Vektorer i rommet ---------- */
{
function pr(S,c,x,y,z){const cy=Math.cos(S.yaw),sy=Math.sin(S.yaw),cp=Math.cos(S.pitch),sp=Math.sin(S.pitch);const x1=x*cy-y*sy,y1=x*sy+y*cy;const y2=y1*cp-z*sp,z2=y1*sp+z*cp;const k=16/(16+y2);return[c.cx+c.s*x1*k,c.cy-c.s*z2*k]}
const cross=(u,v)=>[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
const fmtv=u=>`[${u.map(x=>nf(x,0)).join(', ')}]`;
M({id:'ma-vektor3d',s:'ma',c:['R2'],title:'Vektorer i rommet og vektorproduktet',short:'Vektorer i rommet',kw:'vektorprodukt kryssprodukt skalarprodukt plan normalvektor areal parallellogram tredimensjonal',
lead:'Vektorproduktet $\\vec u\\times\\vec v$ står vinkelrett på både $\\vec u$ og $\\vec v$. Lengden er lik arealet av parallellogrammet de utspenner.',
hint:'Dra i lerretet for å snu koordinatsystemet.',
controls:[{id:'ux',label:'<i>u</i>: x',min:-3,max:3,step:1,value:2},{id:'uy',label:'<i>u</i>: y',min:-3,max:3,step:1,value:0},{id:'uz',label:'<i>u</i>: z',min:-3,max:3,step:1,value:1},{id:'vx',label:'<i>v</i>: x',min:-3,max:3,step:1,value:0},{id:'vy',label:'<i>v</i>: y',min:-3,max:3,step:1,value:3},{id:'vz',label:'<i>v</i>: z',min:-3,max:3,step:1,value:0},{id:'pl',type:'check',label:'Vis planet gjennom origo',value:true}],
tex:['\\vec u\\times\\vec v=[u_yv_z-u_zv_y,\\;u_zv_x-u_xv_z,\\;u_xv_y-u_yv_x]','|\\vec u\\times\\vec v|=|\\vec u|\\,|\\vec v|\\sin\\theta=\\text{areal}','\\vec n\\cdot(\\vec r-\\vec r_0)=0'],
about:['Den rosa vektoren er $\\vec u\\times\\vec v$. Den er en <strong>normalvektor</strong> til planet som $\\vec u$ og $\\vec v$ ligger i.','Retningen følger høyrehåndsregelen: pek med fingrene langs $\\vec u$, bøy dem mot $\\vec v$, så peker tommelen langs $\\vec u\\times\\vec v$.','Er $\\vec u$ og $\\vec v$ parallelle, blir vektorproduktet nullvektoren. Da utspenner de ikke noe plan.'],
tasks:['Bytt om $\\vec u$ og $\\vec v$ (sett verdiene motsatt). Hva skjer med $\\vec u\\times\\vec v$?','Lag to parallelle vektorer. Hva blir arealet?','Sjekk at $(\\vec u\\times\\vec v)\\cdot\\vec u=0$ for flere valg.','Finn likningen for planet gjennom origo utspent av $[1,0,1]$ og $[0,2,1]$.'],
init(S){S.yaw=-2.25;S.pitch=.42},
update(S,dt){if(!Stage.drag||S!==Stage.S)S.yaw+=dt*.12},
draw(S){const v=S.v,c={cx:S.W/2,cy:S.H*.56,s:Math.min(S.W,S.H)/9.5};const P3=(x,y,z)=>pr(S,c,x,y,z);
 X.lineWidth=1;X.strokeStyle=A(C.blue,.13);X.beginPath();for(let i=-4;i<=4;i++){let a=P3(i,-4,0),b=P3(i,4,0);X.moveTo(...a);X.lineTo(...b);a=P3(-4,i,0);b=P3(4,i,0);X.moveTo(...a);X.lineTo(...b)}X.stroke();
 const u=[v.ux,v.uy,v.uz],w=[v.vx,v.vy,v.vz],n=cross(u,w),nl=Math.hypot(...n);
 if(S.p.pl&&nl>.05){X.strokeStyle=A(C.teal,.16);X.beginPath();for(let i=-3;i<=3;i++){const s=i*.5;let a=P3(...[0,1,2].map(k=>u[k]*s-w[k]*1.5)),b=P3(...[0,1,2].map(k=>u[k]*s+w[k]*1.5));X.moveTo(...a);X.lineTo(...b);a=P3(...[0,1,2].map(k=>w[k]*s-u[k]*1.5));b=P3(...[0,1,2].map(k=>w[k]*s+u[k]*1.5));X.moveTo(...a);X.lineTo(...b)}X.stroke()}
 [['x',[4.6,0,0]],['y',[0,4.6,0]],['z',[0,0,4.2]]].forEach(([nm,e])=>{arr(...P3(-e[0]*.9,-e[1]*.9,-e[2]*.4),...P3(...e),A(C.fg,.6),1.5,9);Tm(nm,...P3(e[0]*1.08,e[1]*1.08,e[2]*1.08),{c:C.fg2,a:'center',s:17})});
 for(let i=1;i<=4;i++){[[i,0,0],[0,i,0],[0,0,i]].forEach(q=>dot(...P3(...q),2,A(C.fg,.5)))}
 poly([P3(0,0,0),P3(...u),P3(u[0]+w[0],u[1]+w[1],u[2]+w[2]),P3(...w)],A(C.teal,.6),A(C.teal,.18),1.2);
 [[u,C.blue],[w,C.yellow]].forEach(([q,col])=>{ln(...P3(...q),...P3(q[0],q[1],0),A(col,.45),1.2,[3,4]);ln(...P3(q[0],q[1],0),...P3(q[0],0,0),A(col,.25),1,[3,4]);ln(...P3(q[0],q[1],0),...P3(0,q[1],0),A(col,.25),1,[3,4])});
 const sc=nl>6?6/nl:1,nn=n.map(x=>x*sc);
 arr(...P3(0,0,0),...P3(...u),C.blue,3.4);arr(...P3(0,0,0),...P3(...w),C.yellow,3.4);if(nl>.05)arr(...P3(0,0,0),...P3(...nn),C.pink,3.4);
 vlab('u',...P3(u[0]*1.15,u[1]*1.15,u[2]*1.15+.25),C.blue);vlab('v',...P3(w[0]*1.15,w[1]*1.15,w[2]*1.15+.25),C.yellow);if(nl>.05)vlab('u × v',...P3(nn[0]*1.08,nn[1]*1.08,nn[2]*1.08+.3),C.pink,16);
 if(sc<1)T('(u × v er tegnet forkortet)',12,S.H-14,{s:12,c:C.fg3});dot(...P3(0,0,0),3.5,C.fg)},
pick(S,x,y){return{lx:x,ly:y,move(mx,my){S.yaw+=(mx-this.lx)*.01;S.pitch=clamp(S.pitch+(my-this.ly)*.01,-1.3,1.3);this.lx=mx;this.ly=my}}},
readout(S){const p=S.p,u=[p.ux,p.uy,p.uz],w=[p.vx,p.vy,p.vz],n=cross(u,w),dp=u[0]*w[0]+u[1]*w[1]+u[2]*w[2],nl=Math.hypot(...n);const th=Math.hypot(...u)*Math.hypot(...w)?deg(Math.acos(clamp(dp/(Math.hypot(...u)*Math.hypot(...w)),-1,1))):NaN;return[['u',fmtv(u),'blue'],['v',fmtv(w),'yellow'],['u · v',nf(dp,0)],['u × v',fmtv(n),'pink'],['areal',nf(nl,3),'teal'],['θ',nf(th,1)+'°']]},
live(S){const p=S.p,n=cross([p.ux,p.uy,p.uz],[p.vx,p.vy,p.vz]);return`\\text{Plan: }${tn(n[0],0)}x ${tsg(n[1],0)}y ${tsg(n[2],0)}z=0`}
});
}

/* ---------- 15. Sentralmål og spredningsmål ---------- */
{
const START=[15,20,25,30,30,35,40,40,45,45,45,50,55,60,60,70,80,95];
const med=a=>{const n=a.length;if(!n)return NaN;return n%2?a[(n-1)/2]:(a[n/2-1]+a[n/2])/2};
function stats(d){const s=[...d].sort((a,b)=>a-b),n=s.length,mean=s.reduce((a,b)=>a+b,0)/n,m=med(s);const lo=s.slice(0,Math.floor(n/2)),hi=s.slice(Math.ceil(n/2));const v=s.reduce((a,x)=>a+(x-mean)**2,0);const cnt={};let mode=[],best=0;s.forEach(x=>{cnt[x]=(cnt[x]||0)+1;if(cnt[x]>best)best=cnt[x]});for(const k in cnt)if(cnt[k]===best)mode.push(+k);return{s,n,mean,m,q1:med(lo),q3:med(hi),sd:Math.sqrt(v/n),ssd:n>1?Math.sqrt(v/(n-1)):NaN,min:s[0],max:s[n-1],mode:best>1?mode:[]}}
/* tallinja: standard er lekseminutter 0–120 i grupper på 5, ellers tilpasset egne tall */
const RG0={lo:0,hi:120,bw:5,xs:10,unit:'min'};
const bin=(x,S)=>{const w=S?S.rg.bw:5;return +(Math.round(x/w)*w).toFixed(6)};
function rangeOf(d){const mn=Math.min(...d),mx=Math.max(...d),sp=Math.max(mx-mn,Math.abs(mx)*.1,1e-6),xs=niceStep(sp/8);const dp=Math.max(0,...d.map(v=>{const t=String(+v.toFixed(6));return t.includes('.')?t.split('.')[1].length:0}));return{lo:Math.floor(mn/xs)*xs-xs,hi:Math.ceil(mx/xs)*xs+xs,bw:10**-dp,xs,unit:''}}
M({id:'ma-statistikk',s:'ma',c:['1P','2P'],title:'Sentralmål og spredningsmål',short:'Sentralmål og spredning',kw:'gjennomsnitt median typetall standardavvik kvartil boksplott variasjonsbredde uteligger statistikk',
lead:'Hvert punkt er en elev og hvor mange minutter hun brukte på lekser. Flytt punktene, legg til en uteligger, og se hvilke mål som endrer seg mest.',
hint:'Dra punktene. Klikk på tom plass for å legge til et punkt.',
controls:[{type:'btns',items:[['Legg til uteligger',S=>S.data.push(bin(S.rg.lo+(S.rg.hi-S.rg.lo)*.96,S))],['Fjern siste',S=>{if(S.data.length>2)S.data.pop()}],['Nytt datasett',S=>{const r=rng(Math.floor(Math.random()*1e6));S.rg=RG0;S.data=Array.from({length:16+Math.floor(r()*8)},()=>clamp(bin(48+18*(r()+r()+r()-1.5)*1.6),0,120))}]]},{id:'sd',type:'check',label:'Vis gjennomsnitt ± standardavvik',value:true},
 {type:'data',label:'Egne tall',ph:'For eksempel: 12 15 15 18 22 40',help:'Skriv 2–60 tall med mellomrom mellom. Bruk komma som desimaltegn.',get:S=>S.data.map(v=>nfr(v,v%1?Math.min(4,String(v).split('.')[1].length):0)).join(' '),
  set(S,t){const d=parseNums(t);if(d.length<2)return'Skriv minst to tall.';if(d.length>60)return'Du kan skrive høyst 60 tall.';S.data=d;S.rg=rangeOf(d);return null}}],
tex:['\\bar x=\\frac{x_1+x_2+\\dots+x_n}{n}','\\sigma=\\sqrt{\\frac{(x_1-\\bar x)^2+\\dots+(x_n-\\bar x)^2}{n}}'],
about:['<strong>Gjennomsnittet</strong> (blått) er balansepunktet: tenk deg at punktene er like tunge lodd på en vippe.','<strong>Medianen</strong> (gul) er den midterste verdien når tallene står i rekkefølge. Den bryr seg ikke om hvor langt ute uteliggerne er.','<strong>Standardavviket</strong> måler hvor langt verdiene i snitt ligger fra gjennomsnittet. Boksplottet nederst viser kvartilene: halvparten av dataene ligger inne i boksen.','Standardavviket over deler på $n$. Regner du med et utvalg, deler du ofte på $n-1$ i stedet (vist som $s$).'],
tasks:['Legg til en uteligger. Hvilket mål flytter seg mest: gjennomsnittet eller medianen?','Lag et datasett der gjennomsnitt og median er like.','Gjør standardavviket så lite som mulig uten å fjerne punkter.','Når er medianen et bedre mål enn gjennomsnittet? Gi et eksempel fra virkeligheten.'],
init(S){S.data=[...START];S.dr=-1;S.rg=RG0},
geom(S){const[top,bot]=rows(pad(S,30,22,28),[2.4,1],30);const g=S.rg;return{Pd:Plane(g.lo,g.hi,0,10,top),Pb:Plane(g.lo,g.hi,0,1,bot)}},
pos(S,Pd){const r=clamp(Pd.sx*2.1,3.5,9),cnt={},o=[];S.data.forEach((x,i)=>{const b=i===S.dr?x:bin(x,S);const k=i===S.dr?0:(cnt[b]=(cnt[b]||0)+1)-1;o.push([Pd.X(b),Pd.Y(0)-r-3-k*(2*r+2),r])});return o},
draw(S){const{Pd,Pb}=this.geom(S);S.G={Pd,Pb};const st=stats(S.data);
 const g=S.rg;Pd.axes({xs:g.xs,y:false,yAt:0,xl:g.unit,ls:14,x0:true});
 if(S.p.sd){const a=Pd.X(st.mean-st.sd),b=Pd.X(st.mean+st.sd);rct(a,Pd.t,b-a,Pd.h,null,A(C.blue,.08));T('x̄ ± σ',a+4,Pd.t+10,{s:12,c:C.blue})}
 ln(Pd.X(st.mean),Pd.t,Pd.X(st.mean),Pd.Y(0)+18,C.blue,2.2);ln(Pd.X(st.m),Pd.t+20,Pd.X(st.m),Pd.Y(0)+18,C.yellow,2.2,[6,4]);
 T('x̄ = '+nf(st.mean,1),Pd.X(st.mean)+(st.mean>=st.m?6:-6),Pd.t+30,{s:13,f:'n',c:C.blue,a:st.mean>=st.m?'left':'right',bg:A(C.stage,.7)});T('median = '+nf(st.m,1),Pd.X(st.m)+(st.mean>=st.m?-6:6),Pd.t+52,{s:13,f:'n',c:C.yellow,a:st.mean>=st.m?'right':'left',bg:A(C.stage,.7)});
 this.pos(S,Pd).forEach(([x,y,r],i)=>circ(x,y,r,i===S.dr?C.yellow:null,i===S.dr?A(C.yellow,.6):A(C.fg,.85),2));
 const yb=Pb.t+Pb.h*.5,hb=Math.min(34,Pb.h*.6);Pb.axes({xs:g.xs,y:false,yAt:0,xl:g.unit,ls:14,x0:true});
 ln(Pb.X(st.min),yb,Pb.X(st.q1),yb,C.fg2,1.6);ln(Pb.X(st.q3),yb,Pb.X(st.max),yb,C.fg2,1.6);[st.min,st.max].forEach(x=>ln(Pb.X(x),yb-hb/3,Pb.X(x),yb+hb/3,C.fg2,1.6));
 rct(Pb.X(st.q1),yb-hb/2,Pb.X(st.q3)-Pb.X(st.q1),hb,C.teal,A(C.teal,.15),1.8);ln(Pb.X(st.m),yb-hb/2,Pb.X(st.m),yb+hb/2,C.yellow,2.4);
 [['min',st.min],['Q₁',st.q1],['Q₃',st.q3],['maks',st.max]].forEach(([l,x],i)=>T(l,Pb.X(x),yb-hb/2-10-(i%2)*0,{a:'center',s:11.5,c:C.fg3,f:'n'}))},
pick(S,x,y){const G=S.G;if(!G)return;const ps=this.pos(S,G.Pd);for(let i=ps.length-1;i>=0;i--){const[px,py,r]=ps[i];if(near(x,y,px,py,r+5))return{move:mx=>{S.dr=i;S.data[i]=clamp(G.Pd.ix(mx),S.rg.lo,S.rg.hi)},up:()=>{S.data[S.dr]=bin(S.data[S.dr],S);S.dr=-1}}}},
click(S,x,y){const G=S.G;if(G&&G.Pd.in(x,y,6))S.data.push(clamp(bin(G.Pd.ix(x),S),S.rg.lo,S.rg.hi))},
readout(S){const s=stats(S.data);return[['n',s.n],['x̄',nf(s.mean,1),'blue'],['median',nf(s.m,1),'yellow'],['typetall',s.mode.length&&s.mode.length<4?s.mode.join(', '):'–'],['variasjonsbredde',nf(s.max-s.min,0)],['σ',nf(s.sd,1)],['s',nf(s.ssd,1)],['kvartilbredde',nf(s.q3-s.q1,1),'teal']]}
});
}

/* ---------- 16. Regresjon ---------- */
{
const lin=r=>{const o=[];for(let x=1;x<=9;x+=1)o.push([x,clamp(.75*x+1.2+(r()-.5)*2.2,.3,9.7)]);return o};
const ekp=r=>{const o=[];for(let x=.5;x<=9;x+=1.1)o.push([x,clamp(.9*Math.pow(1.28,x)*(1+(r()-.5)*.35),.2,9.7)]);return o};
function fit(S){const pts=S.pts,m=S.p.mode,n=pts.length;if(n<2)return null;
 if(m==='lin'||m==='eksp'){const P=m==='eksp'?pts.filter(p=>p[1]>0).map(p=>[p[0],Math.log(p[1])]):pts;const k=P.length;if(k<2)return null;let sx=0,sy=0,sxx=0,sxy=0;P.forEach(([x,y])=>{sx+=x;sy+=y;sxx+=x*x;sxy+=x*y});const den=k*sxx-sx*sx;if(Math.abs(den)<1e-9)return null;const a=(k*sxy-sx*sy)/den,b=(sy-a*sx)/k;
  if(m==='lin')return{f:x=>a*x+b,txt:`y = ${nf(a,3)}x ${b<0?'−':'+'} ${nf(Math.abs(b),3)}`,tex:`y=${tn(a,3)}x ${tsg(b,3)}`};const A_=Math.exp(b),B=Math.exp(a);return{f:x=>A_*Math.pow(B,x),txt:`y = ${nf(A_,3)} · ${nf(B,3)}ˣ`,tex:`y=${tn(A_,3)}\\cdot ${tn(B,3)}^{x}`}}
 if(n<3)return null;const s=[0,0,0,0,0],t=[0,0,0];pts.forEach(([x,y])=>{for(let i=0;i<5;i++)s[i]+=x**i;for(let i=0;i<3;i++)t[i]+=y*x**i});const sol=gaussSolve([[s[4],s[3],s[2]],[s[3],s[2],s[1]],[s[2],s[1],s[0]]],[t[2],t[1],t[0]]);if(!sol)return null;const[a,b,c]=sol;return{f:x=>a*x*x+b*x+c,txt:`y = ${nf(a,3)}x² ${b<0?'−':'+'} ${nf(Math.abs(b),3)}x ${c<0?'−':'+'} ${nf(Math.abs(c),3)}`,tex:`y=${tn(a,3)}x^2 ${tsg(b,3)}x ${tsg(c,3)}`}}
/* egne tallpar: aksene tilpasses dataene (standard er 0–10 på begge akser) */
const trim=v=>{let r=nfr(v,4);if(r.includes(','))r=r.replace(/0+$/,'').replace(/,$/,'');return r};
function rangeXY(pts){const ax=i=>{const v=pts.map(p=>p[i]),mn=Math.min(...v),mx=Math.max(...v),sp=Math.max(mx-mn,Math.abs(mx)*.1,1e-6),st=niceStep(sp/8);let lo=Math.floor((mn-sp*.06)/st)*st;const hi=Math.ceil((mx+sp*.06)/st)*st;if(mn>=0&&lo<0)lo=0;if(i===1&&mn>0&&mn<mx*.5)lo=0;return[lo,hi,st]};const[x0,x1,xs]=ax(0),[y0,y1,ys]=ax(1);return{x0,x1,xs,y0,y1,ys}}
const snapR=(v,st)=>+(Math.round(v/(st/10))*(st/10)).toFixed(6);
function sse(S,F){const my=S.pts.reduce((a,p)=>a+p[1],0)/S.pts.length;let e=0,t=0;S.pts.forEach(([x,y])=>{e+=(y-F.f(x))**2;t+=(y-my)**2});return[e,t?1-e/t:NaN]}
M({id:'ma-regresjon',s:'ma',c:['2P','S1','R1'],title:'Regresjon og minste kvadraters metode',short:'Regresjon',kw:'regresjon modell lineær eksponentiell andregrads kvadrater residual R² data tilpasning',
lead:'Regresjon finner kurven som gjør summen av de røde kvadratene minst mulig. Dra punktene og se kvadratene og kurven endre seg sammen.',
hint:'Dra punktene, eller klikk for å legge til nye.',
controls:[{id:'mode',type:'seg',label:'Modell',value:'lin',options:[['lin','Lineær'],['eksp','Eksponentiell'],['kvad','Andregrad']]},{id:'sq',type:'check',label:'Vis kvadratene',value:true},{type:'btns',items:[['Ny lineær data',S=>{S.rg=null;S.pts=lin(rng(Math.random()*1e6|0))}],['Ny eksponentiell data',S=>{S.rg=null;S.pts=ekp(rng(Math.random()*1e6|0))}],['Fjern siste',S=>{if(S.pts.length>2)S.pts.pop()}]]},
 {type:'data',label:'Egne tallpar (x og y)',rows:5,ph:'1 2,3\n2 4,1\n3 5,8',btn:'Bruk tallparene',help:'Ett tallpar per linje: x-verdi, mellomrom og y-verdi. Bruk komma som desimaltegn. 2–40 par.',get:S=>S.pts.map(p=>trim(p[0])+' '+trim(p[1])).join('\n'),
  set(S,t){const L=t.split(/\n|;/).map(l=>l.trim()).filter(Boolean);if(L.length<2)return'Skriv minst to tallpar, ett per linje.';if(L.length>40)return'Du kan skrive høyst 40 tallpar.';const pts=[];for(let i=0;i<L.length;i++){let v;try{v=parseNums(L[i])}catch(e){return`Linje ${i+1}: ${e.message}`}if(v.length!==2)return`Linje ${i+1}: skriv to tall, x og y, med mellomrom mellom.`;pts.push(v)}S.pts=pts;S.rg=rangeXY(pts);return null}}],
tex:['\\text{SSE}=\\sum_{i}\\bigl(\\cY{y_i}-\\cB{f(x_i)}\\bigr)^2\\ \\text{minimeres}','R^2=1-\\frac{\\text{SSE}}{\\sum (y_i-\\bar y)^2}'],
about:['Avstanden fra et punkt til kurven kalles et <strong>residual</strong>. Hvert rødt kvadrat har residualet som side.','Regresjonskurven er den som gir minst samlet areal. Derfor heter det «minste kvadraters metode».','$R^2$ forteller hvor mye av variasjonen modellen forklarer. 1 betyr at alle punktene ligger på kurven.','Den eksponentielle modellen finnes ved å gjøre lineær regresjon på $\\ln y$. Derfor må alle $y$-verdiene være positive.'],
tasks:['Flytt ett punkt langt bort. Hvor mye endres linjen? Hvorfor trekker et fjernt punkt så mye?','Lag data som passer best med en eksponentiell modell. Sammenlign $R^2$ for de tre modellene.','Kan $R^2$ være høy selv om modellen er dårlig for å spå fremtiden?','Legg alle punktene på en rett linje. Hva blir SSE?'],
init(S){S.pts=lin(rng(11));S.rg=null},
draw(S){const g=S.rg;const P=g?Plane(g.x0,g.x1,g.y0,g.y1,{l:62,t:30,w:S.W-92,h:S.H-60}):Plane(0,10,0,10,pad(S,30),true);S.P=P;if(g){P.grid(g.xs,{sy:g.ys});P.axes({xs:g.xs,ys:g.ys,xAt:g.x0,yAt:g.y0,x0:true,y0:true,xl:'x',yl:'y'})}else{P.grid(1);P.axes({xs:1,ys:1,xl:'x',yl:'y'})}const F=fit(S);
 if(F){if(S.p.sq)S.pts.forEach(([x,y])=>{const yh=F.f(x),r=y-yh;if(!isFinite(yh))return;const s=Math.abs(r);P.clip(()=>{rct(P.X(x),Math.min(P.Y(y),P.Y(yh)),s*P.sx,s*P.sy,A(C.red,.55),A(C.red,.13),1.2)})});
  P.fn(F.f,C.blue,3.2);S.pts.forEach(([x,y])=>{const yh=F.f(x);if(isFinite(yh))ln(P.X(x),P.Y(y),P.X(x),P.Y(yh),A(C.red,.85),1.6)});
  const[e,r2]=sse(S,F);infoBox(P.l+8,P.t+8,[[F.txt,C.blue],[`SSE = ${nf(e,2)}`,C.red],[`R² = ${nf(r2,4)}`,C.fg2]])}
 S.pts.forEach(p=>handle(...P.pt(...p),C.yellow,S))},
pick(S,x,y){const P=S.P;if(!P)return;for(let i=S.pts.length-1;i>=0;i--){if(near(x,y,...P.pt(...S.pts[i]),16))return{move:(mx,my)=>{const g=S.rg;S.pts[i]=g?[clamp(snapR(P.ix(mx),g.xs),g.x0,g.x1),clamp(snapR(P.iy(my),g.ys),g.y0,g.y1)]:[clamp(Math.round(P.ix(mx)*10)/10,.1,9.9),clamp(Math.round(P.iy(my)*10)/10,.1,9.9)]}}}},
click(S,x,y){const P=S.P,g=S.rg;if(P&&P.in(x,y)&&S.pts.length<40)S.pts.push(g?[snapR(P.ix(x),g.xs),snapR(P.iy(y),g.ys)]:[clamp(Math.round(P.ix(x)*10)/10,.1,9.9),clamp(Math.round(P.iy(y)*10)/10,.1,9.9)])},
readout(S){const F=fit(S);if(!F)return[['n',S.pts.length]];const[e,r2]=sse(S,F);return[['n',S.pts.length],['SSE',nf(e,3),'red'],['R²',nf(r2,4)]]},
live(S){const F=fit(S);return F?F.tex:''}
});
}

/* ---------- 17. Binomisk og hypergeometrisk fordeling ---------- */
{
const eff=S=>{const N=Math.round(S.p.N),M_=Math.min(Math.round(S.p.M),N),n=S.p.mode==='uten'?Math.min(Math.round(S.p.n),N):Math.round(S.p.n);return{N,M:M_,n}};
const theo=(S,k)=>{const{N,M:M_,n}=eff(S);if(S.p.mode==='med'){const p=M_/N;return nCk(n,k)*p**k*(1-p)**(n-k)}return nCk(M_,k)*nCk(N-M_,n-k)/nCk(N,n)};
function oneTrial(S){const{N,M:M_,n}=eff(S);const pool=[...Array(N).keys()];const picks=[];for(let i=0;i<n;i++){if(S.p.mode==='med')picks.push(Math.floor(Math.random()*N));else{const j=Math.floor(Math.random()*pool.length);picks.push(pool.splice(j,1)[0])}}return picks}
const resetU=S=>{const{n}=eff(S);S.hist=new Array(n+1).fill(0);S.trials=0;S.sum=0;S.sum2=0;S.cur={picks:oneTrial(S),k:0,t:0,show:0}};
M({id:'ma-urne',s:'ma',c:['S1','S2'],title:'Trekning fra urne: binomisk og hypergeometrisk',short:'Binomisk og hypergeometrisk',kw:'sannsynlighet kombinatorikk ordnet uordnet utvalg tilbakelegging forventningsverdi simulering stokastisk',
lead:'Trekker vi kuler <strong>med</strong> tilbakelegging, er antall gule kuler binomisk fordelt. <strong>Uten</strong> tilbakelegging er det hypergeometrisk. Søylene viser simuleringen, de gule rammene teorien.',
controls:[{id:'mode',type:'seg',label:'Trekning',value:'uten',options:[['med','Med tilbakelegging'],['uten','Uten tilbakelegging']]},{id:'N',label:'Kuler i urnen <i>N</i>',min:4,max:30,step:1,value:12},{id:'M',label:'Gule kuler <i>M</i>',min:1,max:30,step:1,value:5},{id:'n',label:'Antall trekk <i>n</i>',min:1,max:8,step:1,value:4},{type:'btns',items:[['Trekk 100 ganger',S=>{for(let i=0;i<100;i++){const k=oneTrial(S).filter(j=>j<eff(S).M).length;S.hist[k]++;S.trials++;S.sum+=k;S.sum2+=k*k}}],['Nullstill',S=>resetU(S)]]}],
tex:['P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k},\\quad p=\\frac{M}{N}','P(X=k)=\\frac{\\binom{M}{k}\\binom{N-M}{n-k}}{\\binom{N}{n}}','E(X)=n\\cdot\\frac{M}{N}'],
about:['Hvert forsøk trekker $n$ kuler, og vi teller hvor mange som er gule. Det tallet er den stokastiske variabelen $X$.','Med tilbakelegging er sannsynligheten for gul den samme i hvert trekk. Uten tilbakelegging endrer den seg etter hvert som kuler forsvinner.','Forventningsverdien er lik i begge tilfeller, men uten tilbakelegging blir spredningen litt mindre.','Jo flere forsøk du gjør, jo nærmere kommer søylene de gule rammene. Det er store talls lov.'],
tasks:['Finn sannsynligheten for å trekke nøyaktig 2 gule med 12 kuler, 5 gule og 4 trekk uten tilbakelegging. Sjekk med simuleringen.','Gjør urnen stor (30 kuler). Hvorfor blir de to fordelingene nesten like?','Hvor mange forsøk trengs før simuleringen ligner teorien?','Lotto: hvorfor er det hypergeometrisk og ikke binomisk?'],
init(S){resetU(S)},
change(S){resetU(S)},
update(S,dt){const c=S.cur,{n,M:M_}=eff(S);if(c.show>0){c.show-=dt;if(c.show<=0){const k=c.picks.filter(j=>j<M_).length;S.hist[k]++;S.trials++;S.sum+=k;S.sum2+=k*k;S.cur={picks:oneTrial(S),k:0,t:0,show:0}}return}c.t+=dt/.3;if(c.t>=1){c.t=0;c.k++;if(c.k>=n){c.k=n;c.show=.8}}},
draw(S){const{N,M:M_,n}=eff(S);const[bl,br]=split(S,.42,{g:28});const c=S.cur;
 const cols=Math.ceil(Math.sqrt(N*1.3)),rowsN=Math.ceil(N/cols);const jw=Math.min(bl.w*.75,bl.h*.55),r=Math.min(jw/(cols*2.4),bl.h*.42/(rowsN*2.4));const jh=rowsN*r*2.4+r*1.6,jx=bl.l+(bl.w-jw)/2,jy=bl.t+bl.h*.08;
 rr(jx,jy,jw,jh,14,A(C.fg,.5),A(C.fg,.04),2);T('Urne',jx+jw/2,jy-12,{a:'center',s:12,c:C.fg3});
 const posB=i=>{const cc=i%cols,rr_=Math.floor(i/cols);return[jx+jw/2+(cc-(cols-1)/2)*r*2.4,jy+jh-r*1.6-rr_*r*2.4]};
 const gone=new Set(S.p.mode==='uten'?c.picks.slice(0,Math.min(c.k+1,n)):[]);
 for(let i=0;i<N;i++){if(gone.has(i))continue;const[x,y]=posB(i);const col=i<M_?C.yellow:C.blue;const flash=S.p.mode==='med'&&c.picks.slice(0,c.k).includes(i);circ(x,y,r,flash?C.fg:null,A(col,.9),2)}
 const ty=jy+jh+Math.min(70,bl.h*.18),sw=Math.min(r*2.8,bl.w/(n+1));T('Trukket',bl.l+bl.w/2,ty-r-16,{a:'center',s:12,c:C.fg3});
 const slot=k=>[bl.l+bl.w/2+(k-(n-1)/2)*sw,ty];
 for(let k=0;k<n;k++){const[x,y]=slot(k);circ(x,y,r+3,A(C.fg,.2),null,1.2)}
 for(let k=0;k<Math.min(c.k+1,n);k++){const idx=c.picks[k];if(idx===undefined)continue;const col=idx<M_?C.yellow:C.blue;const[sx,sy]=posB(idx),[ex,ey]=slot(k);let x=ex,y=ey;if(k===c.k&&c.show<=0){const t=ease(c.t);x=lerp(sx,ex,t);y=lerp(sy,ey,t)-Math.sin(PI*t)*40}else if(k===c.k)continue;dot(x,y,r,col)}
 if(c.show>0){const kk=c.picks.filter(j=>j<M_).length;T(`X = ${kk}`,bl.l+bl.w/2,ty+r+22,{a:'center',f:'n',s:15,c:C.yellow})}
 let mx=.05;for(let k=0;k<=n;k++)mx=Math.max(mx,theo(S,k),S.trials?S.hist[k]/S.trials:0);
 const hb={l:br.l+30,t:br.t+10,w:br.w-30,h:br.h-40};const P=Plane(-.6,n+.6,0,mx*1.15,hb);P.axes({xs:1,ys:niceStep(mx/4),xl:'k',ls:15,x0:true});
 const bw=Math.min(46,P.sx*.62);for(let k=0;k<=n;k++){const f=S.trials?S.hist[k]/S.trials:0,t=theo(S,k);rct(P.X(k)-bw/2,P.Y(f),bw,P.Y(0)-P.Y(f),null,A(C.blue,.7));rct(P.X(k)-bw/2-3,P.Y(t),bw+6,P.Y(0)-P.Y(t),C.yellow,null,1.8);T(nf(t,3),P.X(k),P.Y(t)-9,{a:'center',f:'n',s:10.5,c:C.yellow})}
 T(`${S.trials} forsøk`,hb.l+hb.w,hb.t+4,{a:'right',f:'n',s:12,c:C.fg2})},
readout(S){const{N,M:M_,n}=eff(S),p=M_/N;const E=n*p,V=S.p.mode==='med'?n*p*(1-p):n*p*(1-p)*(N-n)/(N-1);const m=S.trials?S.sum/S.trials:NaN,sd=S.trials>1?Math.sqrt((S.sum2-S.trials*m*m)/(S.trials-1)):NaN;return[['forsøk',S.trials],['E(X)',nf(E,3),'yellow'],['x̄ (simulert)',nf(m,3),'blue'],['σ (teori)',nf(Math.sqrt(V),3),'yellow'],['s (simulert)',nf(sd,3),'blue']]}
});
}

/* ---------- 18. Galtonbrett ---------- */
M({id:'ma-galton',s:'ma',c:['S1','S2'],title:'Galtonbrettet og normalfordelingen',short:'Galtonbrett',kw:'binomisk normalfordeling sentralgrensesetningen sannsynlighet forventning standardavvik',
lead:'Hver kule går til venstre eller høyre ved hver pinne. Antall høyresteg er binomisk fordelt. Med mange rader ligner fordelingen en normalfordeling.',
warm:260,
controls:[{id:'n',label:'Antall rader <i>n</i>',min:4,max:14,step:1,value:10},{id:'pp',label:'Sannsynlighet for høyre <i>p</i>',min:.1,max:.9,step:.05,value:.5},{id:'rate',label:'Kuler per sekund',min:2,max:40,step:1,value:12},{id:'nc',type:'check',label:'Vis normalfordelingskurven',value:true},{type:'btns',items:[['Tøm brettet',S=>{S.bins=new Array(Math.round(S.p.n)+1).fill(0);S.balls=[];S.tot=0;S.sum=0;S.sum2=0}]]}],
tex:['P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}','\\mu=np,\\qquad\\sigma=\\sqrt{np(1-p)}','X\\approx N(\\mu,\\sigma)\\ \\text{for store } n'],
about:['Kula ender i bås nummer $k$ hvis den har gått til høyre $k$ ganger. Det finnes $\\binom{n}{k}$ veier dit, og derfor er det flest kuler i midten.','Den gule kurven er normalfordelingen med samme $\\mu$ og $\\sigma$ som den binomiske fordelingen.','Dette er en enkel form av <strong>sentralgrensesetningen</strong>: en sum av mange uavhengige små bidrag blir tilnærmet normalfordelt.'],
tasks:['Hvor mange veier finnes det til midtre bås når $n=4$? Tegn dem.','Sett $p=0{,}8$. Hvor havner toppen? Stemmer det med $\\mu=np$?','Når passer normalkurven dårlig? Prøv lite $n$ og skjev $p$.','Regn ut sannsynligheten for å havne helt ytterst til venstre når $n=10$ og $p=0{,}5$.'],
init(S){S.bins=new Array(Math.round(S.p.n)+1).fill(0);S.balls=[];S.tot=0;S.sum=0;S.sum2=0;S.acc=0},
change(S,id){if(id==='n'||id==='pp')this.init(S)},
update(S,dt){const n=Math.round(S.p.n);S.acc+=dt*S.p.rate;while(S.acc>=1&&S.balls.length<400){S.acc-=1;S.balls.push({r:-1,i:0,t:0,next:0})}
 for(const b of S.balls){b.t+=dt/.085;while(b.t>=1){b.t-=1;b.r++;b.i+=b.next;if(b.r>=n){b.done=true;break}b.next=Math.random()<S.p.pp?1:0}}
 S.balls=S.balls.filter(b=>{if(b.done){S.bins[b.i]++;S.tot++;S.sum+=b.i;S.sum2+=b.i*b.i;return false}return true})},
draw(S){const n=Math.round(S.p.n),p=S.p.pp;const[bb,hb]=rows(pad(S,24,18,30),[1.25,1],8);const dx=Math.min(bb.w/(n+2),bb.h/(n+1)*1.25),dy=Math.min(bb.h/(n+1.2),dx*.95),cx=bb.l+bb.w/2,y0=bb.t+dy*.5;
 const pin=(r,i)=>[cx+(i-r/2)*dx,y0+r*dy];const pr=Math.max(1.8,dx*.07),br=Math.max(2.6,dx*.17);
 for(let r=0;r<n;r++)for(let i=0;i<=r;i++)dot(...pin(r,i),pr,A(C.fg,.55));
 const bx=i=>cx+(i-n/2)*dx;
 const mx=Math.max(4,...S.bins);const base=hb.t+hb.h,hh=hb.h-14;
 for(let i=0;i<=n;i++){ln(bx(i)-dx/2,base,bx(i)-dx/2,hb.t+4,A(C.fg,.18),1);const h=S.bins[i]/mx*hh;rct(bx(i)-dx*.4,base-h,dx*.8,h,null,A(C.blue,.75));T(String(i),bx(i),base+12,{a:'center',f:'n',s:11,c:C.fg3})}ln(bx(n)+dx/2,base,bx(n)+dx/2,hb.t+4,A(C.fg,.18),1);ln(bx(0)-dx/2,base,bx(n)+dx/2,base,A(C.fg,.6),1.2);
 if(S.p.nc&&S.tot>0){const mu=n*p,sd=Math.sqrt(n*p*(1-p));X.beginPath();for(let k=0;k<=200;k++){const x=-.5+(n+1)*k/200;const y=S.tot*npdf(x,mu,sd);const px=bx(x),py=base-y/mx*hh;k?X.lineTo(px,py):X.moveTo(px,py)}X.strokeStyle=C.yellow;X.lineWidth=2.6;X.stroke()}
 for(const b of S.balls){let x,y;if(b.r<0){x=lerp(cx,pin(0,0)[0],b.t);y=lerp(bb.t-dy*.3,y0-br-pr,b.t)}else{const[x1,y1]=pin(b.r,b.i);const[x2,y2]=b.r+1<n?pin(b.r+1,b.i+b.next):[bx(b.i+b.next),base-4];x=lerp(x1,x2,b.t);y=lerp(y1-br-pr,y2-br-pr,b.t)-Math.sin(PI*b.t)*dy*.32}dot(x,y,br,C.yellow)}},
readout(S){const n=Math.round(S.p.n),p=S.p.pp,m=S.tot?S.sum/S.tot:NaN,sd=S.tot>1?Math.sqrt((S.sum2-S.tot*m*m)/(S.tot-1)):NaN;return[['kuler',S.tot],['μ = np',nf(n*p,2),'yellow'],['x̄',nf(m,2),'blue'],['σ',nf(Math.sqrt(n*p*(1-p)),3),'yellow'],['s',nf(sd,3),'blue']]}
});

/* ---------- 19. Hypotesetesting ---------- */
{
const MU0=200,SIG=10;
function test(p){const se=SIG/Math.sqrt(p.n),z=(p.xb-MU0)/se,a=+p.al;let pv,crit;if(p.side==='h'){pv=1-Phi(z);crit=[MU0+invPhi(1-a)*se]}else if(p.side==='v'){pv=Phi(z);crit=[MU0-invPhi(1-a)*se]}else{pv=2*(1-Phi(Math.abs(z)));const c=invPhi(1-a/2)*se;crit=[MU0-c,MU0+c]}return{se,z,pv,crit,rej:pv<a}}
M({id:'ma-hypotese',s:'ma',c:['S2'],title:'Hypotesetesting',short:'Hypotesetesting',kw:'hypotesetest nullhypotese alternativ hypotese p-verdi signifikansnivå forkastningsområde normalfordeling utvalg',
lead:'En kaffemaskin skal fylle 200 mL. Vi måler gjennomsnittet i et utvalg på $n$ kopper. Er avviket så stort at vi bør tro at maskinen er feilinnstilt?',
controls:[{id:'xb',label:'Målt gjennomsnitt <i>x̄</i>',min:190,max:210,step:.1,value:203.5,unit:'mL'},{id:'n',label:'Utvalgsstørrelse <i>n</i>',min:4,max:100,step:1,value:25},{id:'al',type:'seg',label:'Signifikansnivå <i>α</i>',value:'0.05',options:[['0.01','1 %'],['0.05','5 %'],['0.1','10 %']]},{id:'side',type:'seg',label:'Alternativ hypotese',value:'h',options:[['v','μ < 200'],['to','μ ≠ 200'],['h','μ > 200']]},{id:'mu',label:'Sann <i>μ</i> i simuleringen',min:194,max:206,step:.5,value:200,unit:'mL'},{type:'btns',items:[['Ta 100 utvalg',S=>{for(let i=0;i<100;i++)S.smp.push(S.p.mu+gauss()*SIG/Math.sqrt(S.p.n));if(S.smp.length>1500)S.smp=S.smp.slice(-1500)}],['Tøm',S=>{S.smp=[]}]]}],
tex:['Z=\\frac{\\bar X-\\mu_0}{\\sigma/\\sqrt n}','\\text{forkast } H_0 \\text{ hvis } p<\\alpha'],
about:['Den blå kurven viser hvordan $\\bar X$ varierer <em>hvis</em> nullhypotesen $H_0:\\mu=200$ stemmer. Standardavviket i maskinen er $\\sigma=10$ mL.','Det <strong>røde</strong> området er forkastningsområdet. Det har areal $\\alpha$. Det <strong>gule</strong> området er p-verdien: sannsynligheten for et resultat minst så ekstremt som vårt.','Simuleringen nederst trekker mange utvalg fra en maskin med sann $\\mu$. Når sann $\\mu=200$, forkaster vi feilaktig i omtrent $\\alpha$ av tilfellene. Det er en type I-feil.'],
tasks:['Hvor stort må $\\bar x$ være for at vi skal forkaste $H_0$ med $n=25$ og $\\alpha=5\\,\\%$?','Hva skjer med kurven og p-verdien når $n$ øker?','Sett sann $\\mu=200$ og ta mange utvalg. Hvor ofte forkaster vi? Stemmer det med $\\alpha$?','Sett sann $\\mu=203$. Hvor ofte oppdager testen at maskinen fyller for mye?'],
init(S){S.smp=[]},
change(S,id){if(id==='n'||id==='mu')S.smp=[]},
draw(S){const p=S.p,v=S.v,te=test(p);const se=SIG/Math.sqrt(v.n);const ymax=npdf(MU0,MU0,SIG/Math.sqrt(100))*1.08;
 const[b1,b2]=rows(pad(S,30,24,30),[3.2,1],58);const P=Plane(185,215,0,Math.max(ymax*.35,npdf(MU0,MU0,se)*1.15),b1);P.axes({xs:5,y:false,xl:'mL',ls:14,x0:true});
 const f=x=>npdf(x,MU0,se);const cr=te.crit;
 if(p.side==='h')P.area(f,cr[0],215,A(C.red,.45));else if(p.side==='v')P.area(f,185,cr[0],A(C.red,.45));else{P.area(f,185,cr[0],A(C.red,.45));P.area(f,cr[1],215,A(C.red,.45))}
 const d=Math.abs(p.xb-MU0);if(p.side==='h')P.area(f,p.xb,215,A(C.yellow,.4));else if(p.side==='v')P.area(f,185,p.xb,A(C.yellow,.4));else{P.area(f,185,MU0-d,A(C.yellow,.4));P.area(f,MU0+d,215,A(C.yellow,.4))}
 P.fn(f,C.blue,3);ln(P.X(MU0),P.t+10,P.X(MU0),P.Y(0),A(C.fg,.4),1.2,[5,5]);T('μ₀ = 200',P.X(MU0),P.t+4,{a:'center',f:'n',s:12,c:C.fg2});
 cr.forEach(c=>{ln(P.X(c),P.t+18,P.X(c),P.Y(0),C.red,1.6);T(nf(c,2),P.X(c),P.Y(0)+28,{a:'center',f:'n',s:11,c:C.red})});
 ln(P.X(v.xb),P.t+18,P.X(v.xb),P.Y(0),C.yellow,2.6);dot(P.X(v.xb),P.Y(0),6,C.yellow);
 infoBox(P.l+6,P.t+10,[[`H₀: μ = 200   H₁: μ ${p.side==='h'?'>':p.side==='v'?'<':'≠'} 200`,C.fg2],[`z = ${nf(te.z,2)}`,C.fg2],[`p-verdi = ${nf(te.pv,4)}`,C.yellow],[te.rej?`p < α  →  forkast H₀`:`p ≥ α  →  behold H₀`,te.rej?C.green:C.fg]],{s:12.5});
 const Q=Plane(185,215,0,1,b2);ln(Q.l,Q.t+Q.h,Q.l+Q.w,Q.t+Q.h,A(C.fg,.3),1);const r=rng(5);let rej=0;
 S.smp.forEach(x=>{const t=test(Object.assign({},p,{xb:x}));if(t.rej)rej++;dot(Q.X(clamp(x,185,215)),Q.t+4+r()*(Q.h-8),2.2,t.rej?C.red:A(C.fg,.55))});
 T(S.smp.length?`Simulert: forkastet ${rej} av ${S.smp.length} (${nf(100*rej/S.smp.length,1)} %)`:'Trykk «Ta 100 utvalg» for å simulere',Q.l,Q.t-9,{s:12,c:C.fg2,f:'n'})},
readout(S){const te=test(S.p);return[['SE',nf(te.se,3)+' mL'],['z',nf(te.z,3)],['p',nf(te.pv,4),'yellow'],['α',nf(+S.p.al,2),'red']]}
});
}
