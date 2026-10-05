'use strict';
/* ================= GEOGRAFI (del 2) ================= */

/* ---------- Elva former landskapet (Hjulstrøms diagram) ---------- */
{
const CL=[['Leire',.002,'purple'],['Silt',.02,'pink'],['Sand',.3,'gold'],['Grus',5,'grey'],['Stein',100,'fg2']];
const Ve=d=>14*Math.sqrt(.3/d+Math.pow(d/.3,1.05));
const Vd=d=>Math.min(8*Math.pow(d,.95),.75*Ve(d));
const status=(d,v)=>v>=Ve(d)?'eroderes':v<Vd(d)?'avsettes':'transporteres';
M({id:'ge-elv',s:'ge',c:['GEO'],title:'Elva former landskapet: Hjulstrøms diagram',short:'Elv og erosjon',kw:'erosjon transport sedimentasjon avsetning elv hjulstrøm kornstørrelse leire silt sand grus stein vannhastighet flom ytre krefter delta',
lead:'Hvor fort vannet renner, avgjør hva elva graver løs, hva den frakter med seg og hva den legger igjen. Leire er overraskende vanskelig å rive løs, men når den først er i vannet, synker den nesten ikke.',
controls:[{id:'v',label:'Vannhastighet',min:1,max:800,log:true,value:40,fmt:v=>nfs(v,2)+' cm/s'},{type:'btns',items:[['Rolig elv (10 cm/s)',S=>setP('v',10,S)],['Vanlig (50 cm/s)',S=>setP('v',50,S)],['Flom (300 cm/s)',S=>setP('v',300,S)]]}],
tex:['\\text{erosjon: }v\\ge v_e(d),\\qquad \\text{avsetning: }v<v_s(d)'],
about:['Diagrammet til høyre er <strong>Hjulstrøms diagram</strong>, laget av den svenske geografen Filip Hjulström i 1935. Begge aksene er logaritmiske, og kurvene her er forenklede.','Over den øvre kurven river vannet løs korn av den størrelsen: <strong>erosjon</strong>. Under den nedre kurven synker kornene til bunns: <strong>avsetning</strong> (sedimentasjon). Mellom kurvene blir korn som allerede er i vannet, fraktet videre.','Sand er lettest å erodere. Leire og silt er små, men kornene klistrer seg sammen, så det trengs høy fart. Når de først er i vannet, synker de svært sakte. Derfor blir elvevann grumsete lenge etter en flom.','Der elva bremser opp, for eksempel i en innsjø eller i havet, legges materialet igjen i rekkefølge etter størrelse. Slik dannes deltaer.'],
tasks:['Hvilken kornstørrelse er lettest å rive løs? Hvorfor er det ikke den minste?','En elv renner 30 cm/s. Hvilke korn blir liggende, hvilke fraktes og hvilke graves opp?','Hva skjer med materialet når elva møter en innsjø og farten synker til nesten null?','Hvorfor kan en flom endre et elveløp på noen timer?'],
init(S){S.mv=CL.map(()=>.15);S.ps=CL.map(()=>[...Array(14)].map(()=>({x:Math.random(),y:Math.random()})))},
update(S,dt){const v=S.p.v;CL.forEach(([n,d],i)=>{const st=status(d,v);if(st==='eroderes')S.mv[i]=Math.min(1,S.mv[i]+dt*.6);else if(st==='avsettes')S.mv[i]=Math.max(0,S.mv[i]-dt*.4);S.ps[i].forEach(p=>{p.x+=dt*Math.min(.6,.04+v/500)*(1+i*.0);if(p.x>1)p.x-=1;p.y+=(Math.random()-.5)*dt*.6;p.y=clamp(p.y,0,1)})})},
draw(S){const v=S.v.v;const[bl,br]=split(S,.5,{g:34});const wb=inset(bl,0);const bedT=wb.t+wb.h*.72,surf=wb.t+wb.h*.12;
 rct(wb.l,surf,wb.w,bedT-surf,null,A(C.blue,.16));ln(wb.l,surf,wb.l+wb.w,surf,A(C.blue,.6),1.4);
 const nA=Math.round(clamp(Math.log10(v)*2,1,6));for(let k=0;k<4;k++){const y=lerp(surf,bedT,(k+.6)/4.6),len=lerp(14,70,clamp(Math.log10(v)/2.9,0,1));const off=(S.t*Math.min(240,v*1.2)+k*37)%(wb.w*.25);for(let x=wb.l+off;x<wb.l+wb.w-len;x+=wb.w*.25)arr(x,y,x+len,y,A(C.fg,.25),1.4,7)}
 const segW=wb.w/CL.length;wb.t+=16;wb.h-=16;CL.forEach(([n,d,ck],i)=>{const col=C[ck],x0=wb.l+i*segW,st=status(d,v);const r=[1.5,2,3,5,9][i];const bedH=(1-S.mv[i])*wb.h*.12+4;
  rct(x0+2,bedT,segW-4,wb.t+wb.h-bedT,null,mix(C.grey,C.stage,.7));const rng_=rng(i*7+3);for(let k=0;k<Math.round(bedH*segW/(r*r*6));k++){const px=x0+4+rng_()*(segW-8),py=bedT-rng_()*bedH;dot(px,py,r,A(col,.85))}
  const nmov=Math.round(S.mv[i]*14);for(let k=0;k<nmov;k++){const p=S.ps[i][k];const hmax=[.95,.85,.55,.25,.1][i];const px=wb.l+((p.x+i/CL.length)%1)*wb.w,py=bedT-bedH-(p.y*hmax*(bedT-surf-bedH))-(i>=3?Math.abs(Math.sin(S.t*6+k))*10:0);dot(px,py,r,col)}
  T(n,x0+segW/2,wb.t+wb.h-12,{a:'center',s:12.5,c:col});const ac=st==='eroderes'?C.red:st==='avsettes'?C.blue:C.yellow,ay=wb.t+wb.h*.05,ax_=x0+segW/2;if(st==='eroderes')arr(ax_,ay+8,ax_,ay-8,ac,2.6,8);else if(st==='avsettes')arr(ax_,ay-8,ax_,ay+8,ac,2.6,8);else arr(ax_-10,ay,ax_+10,ay,ac,2.6,8)});
 lab({l:wb.l,t:wb.t-4},'Elvebunnen: ↑ graves opp  → fraktes  ↓ legges igjen');
 const P=Plane(-3,3,-1,3,{l:br.l+34,t:br.t,w:br.w-34,h:br.h-40});const lx=d=>P.X(Math.log10(d)),ly=vv=>P.Y(Math.log10(vv));
 const N=120,up=[],lo=[];for(let i=0;i<=N;i++){const L=-3+6*i/N,d=Math.pow(10,L);up.push([P.X(L),ly(clamp(Ve(d),.1,1000))]);lo.push([P.X(L),ly(clamp(Vd(d),.1,1000))])}
 P.clip(()=>{poly([[P.l,P.t]].concat(up,[[P.l+P.w,P.t]]),null,A(C.red,.12));poly(up.concat(lo.slice().reverse()),null,A(C.yellow,.08));poly(lo.concat([[P.l+P.w,P.t+P.h],[P.l,P.t+P.h]]),null,A(C.blue,.12))});
 pth(up,C.red,2.6);pth(lo,C.blue,2.4);
 [-3,-2,-1,0,1,2,3].forEach(e=>{const x=P.X(e);ln(x,P.t+P.h,x,P.t+P.h+4,C.fg3,1);T(nfs(Math.pow(10,e),1),x,P.t+P.h+14,{a:'center',f:'n',s:10.5,c:C.fg3})});[-1,0,1,2,3].forEach(e=>{const y=P.Y(e);ln(P.l-4,y,P.l,y,C.fg3,1);T(nfs(Math.pow(10,e),1),P.l-7,y,{a:'right',f:'n',s:10.5,c:C.fg3})});
 rct(P.l,P.t,P.w,P.h,A(C.fg,.3),null,1);T('kornstørrelse (mm)',P.l+P.w,P.t+P.h+30,{a:'right',s:11.5,c:C.fg2});T('fart (cm/s)',P.l+4,P.t+10,{s:11.5,c:C.fg2});
 T('Erosjon',P.X(-1.6),P.Y(2.6),{s:13,c:C.red,w:700});T('Transport',P.X(.6),P.Y(.7),{s:13,c:C.yellow,w:700});T('Avsetning',P.X(-2.6),P.Y(-.6),{s:13,c:C.blue,w:700});
 ln(P.l,ly(v),P.l+P.w,ly(v),C.fg,1.6,[6,4]);CL.forEach(([n,d,ck])=>{const st=status(d,v);dot(lx(d),ly(v),6,st==='eroderes'?C.red:st==='avsettes'?C.blue:C.yellow);circ(lx(d),ly(v),6,C.stage,null,1.5);T(n,lx(d),ly(v)-14,{a:'center',s:11,c:C[ck],bg:A(C.stage,.6)})})},
readout(S){const v=S.p.v;return[['fart',nfs(v,2)+' cm/s = '+nfs(v*.036,2)+' km/t']].concat(CL.map(([n,d,ck])=>[n,status(d,v),ck]))}
});
}

/* ---------- Flom: regn, jord og asfalt ---------- */
{
const SOIL={torr:['Tørr',.15],normal:['Normal',.3],vat:['Vannmettet',.6]};
const Ah=20;
function hydro(p){const n=73,rain=new Array(n).fill(0),q=new Array(n).fill(0);const P=p.P*(1+p.kl/100),D=Math.round(p.D);for(let h=6;h<6+D;h++)rain[h]=P/D;
 const C_=p.imp/100*.9+(1-p.imp/100)*SOIL[p.soil][1];const tp=lerp(10,2.2,p.imp/100);const th=tp/2,k=3;const uh=[];let su=0;for(let i=0;i<n;i++){const t=i+.5;const v=Math.pow(t,k-1)*Math.exp(-t/th);uh.push(v);su+=v}for(let i=0;i<n;i++)uh[i]/=su;
 for(let i=0;i<n;i++){const eff=rain[i]*C_;if(!eff)continue;for(let j=i;j<n;j++)q[j]+=eff*uh[j-i]*Ah/3.6}for(let i=0;i<n;i++)q[i]+=3;return{rain,q,C:C_,tp}}
const depth=Q=>.55*Math.pow(Q,.45),THR=18;
M({id:'ge-flom',s:'ge',c:['GEO','NAT'],title:'Flom: regn, jord og asfalt',short:'Flom',kw:'flom nedbør avrenning tette flater asfalt klimaendring naturkatastrofe hydrogram vannføring jord skog overvann',
lead:'Når det regner mye på kort tid, renner vannet ut i elva. Hvor mye som renner av, og hvor fort, avhenger av bakken. Asfalt og tak slipper alt vannet rett ut, mens skog og jord holder på det.',
controls:[{id:'P',label:'Nedbør',min:10,max:150,step:5,value:60,unit:'mm'},{id:'D',label:'Varighet',min:1,max:24,step:1,value:6,unit:'timer'},{id:'imp',label:'Tette flater (asfalt, tak)',min:0,max:90,step:5,value:15,unit:'%'},{id:'soil',type:'seg',label:'Jorda før regnet',value:'normal',options:Object.entries(SOIL).map(([k,v])=>[k,v[0]])},{id:'kl',label:'Klimaendring: mer nedbør',min:0,max:40,step:5,value:0,unit:'%'}],
tex:['Q_{\\text{avrenning}}=C\\cdot i\\cdot A','C\\approx 0{,}9\\ \\text{(asfalt)},\\quad 0{,}15\\text{–}0{,}6\\ \\text{(jord og skog)}'],
about:['Grafen viser regnet (blå søyler ovenfra) og vannføringen i elva (rød kurve) i et nedbørfelt på 20 km². Den stiplede linjen viser når elva går over sine bredder.','<strong>Avrenningskoeffisienten</strong> $C$ er andelen av regnet som renner rett av. Asfalt og tak gir nesten 1, mens tørr skogsjord kan suge opp det meste. Er jorda allerede mettet etter mye regn, renner mer av.','Tette flater gjør også at vannet kommer <strong>raskere</strong>. Flomtoppen blir både høyere og kommer tidligere. Derfor bygger byer regnbed, grønne tak og fordrøyningsbasseng.','Klimaendringene gir oftere kraftig nedbør i Norge. Prøv å øke nedbøren med 20 % og se hvor mye høyere flomtoppen blir.'],
tasks:['Hvor mange prosent tette flater må nedbørfeltet ha før det blir flom med standardverdiene?','Sammenlign flomtoppen etter 60 mm regn på tørr og på vannmettet jord.','Hvorfor kommer flomtoppen tidligere i en by enn i et skogsområde?','Foreslå tre tiltak en kommune kan gjøre for å redusere flomfaren.'],
init(S){S.h=0},
update(S,dt){S.h+=dt*5;if(S.h>72)S.h=0},
draw(S){const p=S.p,hy=hydro(p);const thr=THR;const[top,bot]=rows(pad(S,26,22,30),[1.1,1],34);const hi=Math.min(72,Math.floor(S.h)),fr=S.h-hi;const Qn=lerp(hy.q[hi],hy.q[Math.min(72,hi+1)],fr);
 const cx=top.l+top.w/2,base=top.t+top.h*.92,sc=top.h*.13;const bank=depth(thr),wch=top.w*.16;
 const terr=[[top.l,base-bank*sc-top.h*.1],[cx-wch*1.6,base-bank*sc-top.h*.04],[cx-wch,base-bank*sc],[cx-wch*.6,base],[cx+wch*.6,base],[cx+wch,base-bank*sc],[cx+wch*1.6,base-bank*sc-top.h*.04],[top.l+top.w,base-bank*sc-top.h*.1]];
 const wl=base-depth(Qn)*sc;poly([[top.l,wl],[top.l+top.w,wl],[top.l+top.w,top.t+top.h],[top.l,top.t+top.h]],null,A(C.blue,.38));
 poly(terr.concat([[top.l+top.w,top.t+top.h],[top.l,top.t+top.h]]),null,mix(C.green,C.stage,.7));pth(terr,mix(C.green,C.stage,.4),2);
  X.save();X.beginPath();X.rect(top.l,wl,top.w,top.h);X.clip();const lo=terr.slice(2,6);poly(lo,null,A(C.blue,.5));X.restore();
 [[top.l+top.w*.08,'house'],[top.l+top.w*.19,'house'],[top.l+top.w*.81,'house'],[top.l+top.w*.92,'house']].forEach(([hx])=>{const gy=hx<cx?lerp(terr[0][1],terr[1][1],(hx-terr[0][0])/(terr[1][0]-terr[0][0])):lerp(terr[6][1],terr[7][1],(hx-terr[6][0])/(terr[7][0]-terr[6][0]));const wet=wl<gy;rct(hx-14,gy-20,28,20,null,wet?A(C.red,.7):mix(C.fg,C.stage,.4));poly([[hx-18,gy-20],[hx,gy-32],[hx+18,gy-20]],null,wet?A(C.red,.85):mix(C.fg,C.stage,.25))});
 ln(top.l,base-bank*sc,top.l+top.w,base-bank*sc,A(C.red,.5),1.2,[5,5]);T('flomgrense',cx,base-bank*sc-10,{a:'center',s:11,c:C.red});
 const rf=hy.rain[hi];if(rf>0){for(let k=0;k<Math.round(rf*4);k++){const x=top.l+((k*97+S.t*400)%top.w),y=top.t+((k*53+S.t*600)%(top.h*.7));ln(x,y,x-3,y+10,A(C.blue,.6),1.2)}}
 T(`Time ${hi}: vannføring ${nf(Qn,0)} m³/s`,top.l,top.t+6,{s:14,w:700,c:Qn>thr?C.red:C.fg});
 const qmax=Math.max(30,...hy.q)*1.15,rmax=Math.max(10,...hy.rain)*2.2;const P=Plane(0,72,0,qmax,bot);P.grid(6,{sy:niceStep(qmax/4),minor:false,alpha:.1});P.axes({xs:12,ys:niceStep(qmax/4),x0:true,xl:'timer',yl:'m³/s',ls:13});
 hy.rain.forEach((r,i)=>{if(r>0)rct(P.X(i),P.t,P.sx*.9,r/rmax*P.h,null,A(C.blue,.55))});T('nedbør',P.X(6)+4,P.t+P.h*(hy.rain[6]/rmax)+10,{s:11,c:C.blue});
 ln(P.l,P.Y(thr),P.l+P.w,P.Y(thr),A(C.red,.6),1.2,[5,5]);pth(hy.q.map((q,i)=>P.pt(i,q)),C.red,2.6);ln(P.X(S.h),P.t,P.X(S.h),P.t+P.h,A(C.fg,.4),1.2);dot(P.X(S.h),P.Y(Qn),5,C.red);
 const im=hy.q.indexOf(Math.max(...hy.q));T('flomtopp '+nf(hy.q[im],0)+' m³/s',P.X(im)+8,P.Y(hy.q[im])-10,{s:11.5,f:'n',c:C.red,bg:A(C.stage,.7)});lab(bot,'Regn og vannføring i elva')},
readout(S){const hy=hydro(S.p),qm=Math.max(...hy.q),im=hy.q.indexOf(qm);return[['avrenningskoeffisient C',nf(hy.C,2)],['flomtopp',nf(qm,0)+' m³/s','red'],['topp etter',(im-6)+' timer etter at regnet startet'],['flom',qm>THR?'ja, elva går over breddene':'nei',qm>THR?'red':'green']]}
});
}

/* ---------- Befolkningspyramide og demografisk overgang ---------- */
{
const mu=(a,k)=>k*(.12*Math.exp(-1.6*a)+.0016)+Math.sqrt(k)*.000035*Math.exp(.098*a);
const qx=(a,k)=>1-Math.exp(-mu(a+.5,k));
function e0(k){let l=1,e=0;for(let a=0;a<120;a++){const q=qx(a,k);e+=l*(1-q/2);l*=1-q}return e}
const kFor=E=>{let lo=.001,hi=60;for(let i=0;i<50;i++){const m=Math.sqrt(lo*hi);if(e0(m)>E)lo=m;else hi=m}return Math.sqrt(lo*hi)};
const gf=(()=>{const g=[];let s=0;for(let a=0;a<=100;a++){const v=a>=15&&a<=49?Math.exp(-.5*((a-29)/6)**2):0;g.push(v);s+=v}return g.map(v=>v/s)})();
const PATH=y=>{if(y<1850)return[5,35];if(y<1950)return[y<1880?5:lerp(5,2.5,(y-1880)/70),lerp(35,70,(y-1850)/100)];if(y<2000)return[lerp(2.5,1.8,(y-1950)/50),lerp(70,80,(y-1950)/50)];return[lerp(1.8,1.4,clamp((y-2000)/50,0,1)),lerp(80,86,clamp((y-2000)/50,0,1))]};
const STAGE=y=>y<1850?'Fase 1: høye fødsels- og dødstall':y<1890?'Fase 2: dødstallene faller':y<1960?'Fase 3: fødselstallene faller':y<2000?'Fase 4: lave fødsels- og dødstall':'Fase 5: færre fødsler enn dødsfall?';
function stepYear(S,tfr,k){const M_=S.m,F=S.f;let B=0;for(let a=15;a<=49;a++)B+=F[a]*tfr*gf[a];let D=0;const nm=new Array(101).fill(0),nf_=new Array(101).fill(0);for(let a=0;a<=100;a++){const q=qx(a,k),qm=Math.min(1,q*1.08);const sm=M_[a]*(1-qm),sf=F[a]*(1-q);D+=M_[a]*qm+F[a]*q;const to=Math.min(100,a+1);nm[to]+=sm;nf_[to]+=sf}nm[0]=B*1.05/2.05;nf_[0]=B/2.05;S.m=nm;S.f=nf_;S.B=B;S.D=D}
const total=S=>S.m.reduce((a,b)=>a+b,0)+S.f.reduce((a,b)=>a+b,0);
M({id:'ge-befolkning',s:'ge',c:['GEO','2P'],title:'Befolkningspyramide og demografisk overgang',short:'Befolkningsutvikling',kw:'befolkning demografi befolkningspyramide demografisk overgang fødselstall dødstall fruktbarhet levealder eldrebølge vekst levekår',
lead:'Hvor mange barn hver kvinne får, og hvor lenge folk lever, bestemmer formen på befolkningspyramiden. Mange land har gått gjennom de samme fasene, fra høye til lave fødsels- og dødstall.',
controls:[{id:'mode',type:'seg',label:'Styring',value:'overgang',options:[['overgang','Demografisk overgang'],['manuell','Styr selv']]},{id:'tfr',label:'Barn per kvinne (samlet fruktbarhet)',min:1,max:7,step:.1,value:2.1,d:1,show:S=>S.p.mode==='manuell'},{id:'e0',label:'Forventet levealder',min:30,max:88,step:1,value:75,unit:'år',show:S=>S.p.mode==='manuell'},{id:'sp',label:'År per sekund',min:1,max:20,step:1,value:8},{type:'btns',items:[['Start overgangen på nytt',S=>{setP('mode','overgang',S);MOD['ge-befolkning'].init(S)}],['Høy fruktbarhet',S=>{setP('mode','manuell',S);setP('tfr',6,S);setP('e0',60,S)}],['Norge i dag',S=>{setP('mode','manuell',S);setP('tfr',1.4,S);setP('e0',83,S)}]]}],
tex:['\\text{fødselsrate}=\\frac{\\text{fødte}}{\\text{befolkning}}\\cdot 1000\\ ‰','\\text{naturlig tilvekst}=\\text{fødselsrate}-\\text{dødsrate}'],
about:['Pyramiden viser hvor mange som er i hver aldersgruppe, med menn til venstre og kvinner til høyre. Grafen viser fødselsraten og dødsraten i promille, og folketallet.','I <strong>demografisk overgang</strong> følger modellen et forenklet forløp som ligner det Norge har vært gjennom fra 1800 til i dag. Først faller dødstallene på grunn av bedre mat, hygiene og medisin. Fødselstallene faller senere, og i mellomtiden vokser befolkningen raskt.','Det trengs omtrent 2,1 barn per kvinne for at befolkningen skal erstatte seg selv på lang sikt. Norge hadde 1,4 i 2023. Med lav fruktbarhet og lang levealder blir pyramiden smal nederst og bred øverst: en eldre befolkning.','Modellen tar ikke med inn- og utvandring. Den er forenklet og viser mønstre, ikke virkelige tall for et bestemt land.'],
tasks:['I hvilken fase vokser befolkningen raskest? Hvorfor?','Sett 6 barn per kvinne og 60 års levealder. Beskriv pyramiden. Hvilke land ligner dette på?','Hva skjer med andelen over 65 år når levealderen øker og fruktbarheten synker? Hvilke utfordringer gir det?','Hvorfor fortsetter befolkningen å vokse en stund etter at fruktbarheten har sunket under 2,1?'],
init(S){S.m=new Array(101).fill(1e4);S.f=new Array(101).fill(1e4);S.yr=1750;S.acc=0;S.hist=[];const[t,e]=S.p.mode==='overgang'?PATH(1750):[S.p.tfr,S.p.e0];const k=kFor(e);for(let i=0;i<250;i++)stepYear(S,t,k);const tot=total(S),f=2e6/tot;S.m=S.m.map(v=>v*f);S.f=S.f.map(v=>v*f);S.sc=null;S.kc={e:null,k:1}},
change(S,id){if(id==='mode'){this.init(S)}},
update(S,dt){S.acc+=dt*S.p.sp;while(S.acc>=1){S.acc-=1;let t,e;if(S.p.mode==='overgang'){[t,e]=PATH(S.yr);if(S.yr>=2100){this.init(S);return}}else{t=S.p.tfr;e=S.p.e0}if(S.kc.e!==e){S.kc={e,k:kFor(e)}}const N=total(S);stepYear(S,t,S.kc.k);S.yr++;S.hist.push([S.yr,S.B/N*1000,S.D/N*1000,total(S)]);if(S.hist.length>260)S.hist.shift()}},
draw(S){const[bl,br]=split(S,.46,{g:36});const N=total(S);const grp=[];for(let g0=0;g0<100;g0+=5){let m=0,f=0;for(let a=g0;a<g0+5&&a<=100;a++){m+=S.m[a];f+=S.f[a]}if(g0===95){m+=S.m[100]*0;f+=S.f[100]*0}grp.push([g0,m/N*100,f/N*100])}
 const mx=Math.max(...grp.map(g=>Math.max(g[1],g[2])));S.sc=S.sc===null?mx:smooth(S.sc,mx,1/60,2);const sc=Math.max(S.sc,2)*1.1;
 const cx=bl.l+bl.w/2,top=bl.t+28,bh=(bl.h-56)/grp.length,half=bl.w/2-34;
 grp.forEach(([g0,m,f],i)=>{const y=top+(grp.length-1-i)*bh;rct(cx-6-m/sc*half,y+1,m/sc*half,bh-2,null,A(C.blue,.8));rct(cx+6,y+1,f/sc*half,bh-2,null,A(C.pink,.8));if(i%2===0)T(String(g0),cx,y+bh/2,{a:'center',f:'n',s:10,c:C.fg3})});
 T('Menn',cx-half/2,bl.t+10,{a:'center',s:13,c:C.blue});T('Kvinner',cx+half/2,bl.t+10,{a:'center',s:13,c:C.pink});
 [0,Math.round(sc/2*10)/10].forEach(v=>{if(v<=0)return;const dx=v/sc*half;ln(cx-6-dx,bl.t+bl.h-24,cx-6-dx,bl.t+bl.h-20,C.fg3,1);ln(cx+6+dx,bl.t+bl.h-24,cx+6+dx,bl.t+bl.h-20,C.fg3,1);T(nf(v,1)+' %',cx+6+dx,bl.t+bl.h-10,{a:'center',f:'n',s:10,c:C.fg3});T(nf(v,1)+' %',cx-6-dx,bl.t+bl.h-10,{a:'center',f:'n',s:10,c:C.fg3})});
 const[g1,g2]=rows(br,[1.5,1],36);const H=S.hist;const x0=H.length?H[0][0]:S.yr,x1=Math.max(x0+100,H.length?H[H.length-1][0]:S.yr);
 const P=Plane(x0,x1,0,50,g1);P.grid(25,{sy:10,minor:false,alpha:.1});P.axes({xs:50,ys:10,x0:true,ls:13,xf:x=>String(Math.round(x)),yl:'‰'});lab(g1,'Fødselsrate og dødsrate (per 1000 innbyggere)');
 if(H.length>1){const bp=H.map(h=>P.pt(h[0],h[1])),dp=H.map(h=>P.pt(h[0],h[2]));poly(bp.concat(dp.slice().reverse()),null,A(C.teal,.12));pth(bp,C.teal,2.6);pth(dp,C.red,2.6);const l=H[H.length-1];T('fødte',P.X(l[0])+4,P.Y(l[1]),{s:11.5,c:C.teal});T('døde',P.X(l[0])+4,P.Y(l[2])+12,{s:11.5,c:C.red})}
 const pm=Math.max(...H.map(h=>h[3]),N)*1.1;const Q=Plane(x0,x1,0,pm/1e6,g2);Q.axes({xs:50,ys:niceStep(pm/1e6/3),x0:true,y0:true,ls:13,xf:x=>String(Math.round(x)),yl:'mill.'});lab(g2,'Folketall');if(H.length>1)pth(H.map(h=>Q.pt(h[0],h[3]/1e6)),C.yellow,2.6);
 T(String(Math.round(S.yr)),bl.l,bl.t+10,{s:15,w:700});if(S.p.mode==='overgang')T(STAGE(S.yr),bl.l,bl.t+bl.h+2,{s:12.5,c:C.yellow})},
readout(S){const N=total(S);const u15=S.m.slice(0,15).concat(S.f.slice(0,15)).reduce((a,b)=>a+b,0)/N,o65=S.m.slice(65).concat(S.f.slice(65)).reduce((a,b)=>a+b,0)/N;const l=S.hist[S.hist.length-1];const[t,e]=S.p.mode==='overgang'?PATH(S.yr):[S.p.tfr,S.p.e0];return[['år',Math.round(S.yr)],['barn per kvinne',nf(t,1)],['levealder',nf(e,0)+' år'],['fødselsrate',l?nf(l[1],1)+' ‰':'–','teal'],['dødsrate',l?nf(l[2],1)+' ‰':'–','red'],['under 15 år',nf(u15*100,0)+' %'],['over 65 år',nf(o65*100,0)+' %']]}
});
}

/* ---------- Kartprojeksjoner ---------- */
{
const D2R=PI/180,R_=6371;
const ring=f=>{const o=[];for(let i=0;i<f.length;i+=2)o.push([f[i]/10,f[i+1]/10]);return o};
const LAND=VERDEN.land.map(ring);
const CTY=Object.fromEntries(Object.entries(VERDEN.c).map(([k,v])=>[k,{n:v.n,p:v.p.map(pg=>pg.map(ring))}]));
const vec=([lo,la])=>[Math.cos(la*D2R)*Math.cos(lo*D2R),Math.cos(la*D2R)*Math.sin(lo*D2R),Math.sin(la*D2R)];
const ll=v=>[Math.atan2(v[1],v[0])/D2R,Math.asin(clamp(v[2],-1,1))/D2R];
const wrapd=d=>((d+540)%360)-180;
function ringArea(r){let s=0;for(let i=0;i<r.length;i++){const[a,b]=r[i],[c,d]=r[(i+1)%r.length];s+=wrapd(c-a)*D2R*(2+Math.sin(b*D2R)+Math.sin(d*D2R))}return Math.abs(s)*R_*R_/2}
for(const k in CTY){const c=CTY[k];c.area=c.p.reduce((a,pg)=>a+ringArea(pg[0])-pg.slice(1).reduce((x,r)=>x+ringArea(r),0),0);let big=c.p.reduce((a,pg)=>pg[0].length>a[0].length?pg:a,c.p[0]);const s=[0,0,0];big[0].forEach(q=>{const v=vec(q);s[0]+=v[0];s[1]+=v[1];s[2]+=v[2]});const L=Math.hypot(...s);c.cen=s.map(x=>x/L);c.cll=ll(c.cen)}
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],dot3=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
function rotator(c,t){const th=Math.acos(clamp(dot3(c,t),-1,1));if(th<1e-6)return v=>v;let k=cross(c,t);const L=Math.hypot(...k);k=k.map(x=>x/L);const cs=Math.cos(th),sn=Math.sin(th);return v=>{const kv=cross(k,v),kd=dot3(k,v);return[v[0]*cs+kv[0]*sn+k[0]*kd*(1-cs),v[1]*cs+kv[1]*sn+k[1]*kd*(1-cs),v[2]*cs+kv[2]*sn+k[2]*kd*(1-cs)]}}
const YM=Math.log(Math.tan(PI/4+84*D2R/2));
const mollT=f=>{let th=f;for(let i=0;i<12;i++){const d=(2*th+Math.sin(2*th)-PI*Math.sin(f))/(2+2*Math.cos(2*th));th-=d;if(Math.abs(d)<1e-7)break}return th};
const PROJ={merc:{b:[-PI,PI,-YM,YM],f:(lo,la)=>[lo*D2R,Math.log(Math.tan(PI/4+clamp(la,-84,84)*D2R/2))],inv:(x,y)=>[x/D2R,(2*Math.atan(Math.exp(y))-PI/2)/D2R]},
 plate:{b:[-PI,PI,-PI/2,PI/2],f:(lo,la)=>[lo*D2R,la*D2R],inv:(x,y)=>[x/D2R,y/D2R]},
 moll:{b:[-2*Math.SQRT2,2*Math.SQRT2,-Math.SQRT2,Math.SQRT2],f:(lo,la)=>{const th=mollT(la*D2R);return[2*Math.SQRT2/PI*lo*D2R*Math.cos(th),Math.SQRT2*Math.sin(th)]},inv:(x,y)=>{const th=Math.asin(clamp(y/Math.SQRT2,-1,1));return[PI*x/(2*Math.SQRT2*Math.cos(th))/D2R,Math.asin(clamp((2*th+Math.sin(2*th))/PI,-1,1))/D2R]}}};
function unwrap(r){const o=[[r[0][0],r[0][1]]];for(let i=1;i<r.length;i++){const p=o[i-1][0];o.push([p+wrapd(r[i][0]-r[i-1][0]),r[i][1]])}const dl=o[o.length-1][0]-o[0][0]+wrapd(r[0][0]-r[r.length-1][0]);if(Math.abs(dl)>180){const sg=r.reduce((a,q)=>a+q[1],0)<0?-90:90;const e=o[o.length-1][0];o.push([e+wrapd(r[0][0]-r[r.length-1][0]),sg*.999],[o[0][0],sg*.999])}return o}
const LANDU=LAND.map(unwrap);
M({id:'ge-kart',s:'ge',c:['GEO'],title:'Kartprojeksjoner: hvor stor er Grønland egentlig?',short:'Kartprojeksjoner',kw:'kart kartprojeksjon mercator mollweide globus målestokk forvrengning grønland afrika areal breddegrad lengdegrad',
lead:'Jorda er rund, og et flatt kart må alltid strekke noe. Mercator-kartet beholder formene, men blåser opp alt som ligger langt fra ekvator. Dra Grønland mot ekvator og se den krympe.',
hint:'Dra det markerte landet rundt på kartet.',
controls:[{id:'proj',type:'seg',label:'Projeksjon',value:'merc',options:[['merc','Mercator'],['plate','Ekvidistant'],['moll','Mollweide'],['orto','Globus']]},{id:'land',type:'sel',label:'Land eller område',value:'gronland',options:[['gronland','Grønland'],['afrika','Afrika'],['norge','Norge'],['brasil','Brasil'],['australia','Australia'],['russland','Russland'],['india','India'],['usa','USA']]},{id:'tis',type:'check',label:'Vis like store sirkler (radius 600 km)',value:false},{type:'btns',items:[['Flytt landet til ekvator',S=>{const c=CTY[S.p.land];S.tg=[c.cll[0],0]}],['Tilbake på plass',S=>{S.tg=null}]]}],
tex:['\\text{Mercator: }x=\\lambda,\\quad y=\\ln\\tan\\!\\left(\\frac{\\pi}{4}+\\frac{\\varphi}{2}\\right)','\\text{forstørring av areal}=\\frac{1}{\\cos^2\\varphi}'],
about:['<strong>Mercator</strong> brukes i navigasjon og nettkart fordi vinkler og former blir riktige lokalt. Prisen er at arealer blåses opp med faktoren $1/\\cos^2\\varphi$. Ved 70° nord blir arealet vist over åtte ganger for stort.','På Mercator ser Grønland nesten like stor ut som Afrika. I virkeligheten er Afrika omtrent 14 ganger større. Når du drar landet, flyttes det langs jordkula, så den virkelige størrelsen og formen beholdes.','<strong>Mollweide</strong> er flatetro: alle land vises med riktig areal i forhold til hverandre, men formene blir skjeve mot kantene. <strong>Ekvidistant</strong> (plate carrée) har like store ruter i lengde- og breddegrad.','Slå på sirklene. Alle sirklene er like store på jorda, så forskjellene du ser, er forvrengningen i kartet. Arealene her er regnet ut fra et forenklet kart og er omtrentlige.'],
tasks:['Flytt Grønland til ekvator. Hvor mange ganger mindre blir den på Mercator-kartet?','Sammenlign arealet til Afrika og Grønland. Hvorfor ser de nesten like store ut på Mercator?','Hvorfor brukes Mercator i Google Maps, selv om arealene blir feil?','Slå på sirklene og bytt mellom projeksjonene. Hvilken projeksjon bevarer arealene? Hvilken bevarer formene?'],
init(S){S.tg=null;S.l0=10;S.f0=25},
change(S,id){if(id==='land')S.tg=null},
update(S,dt){if(S.p.proj==='orto'&&!(Stage.drag&&S===Stage.S))S.l0+=dt*8},
geo(S){const b=pad(S,24,24,24);const pr=S.p.proj;if(pr==='orto'){const R=Math.min(b.w,b.h)/2*.96;return{b,R,cx:b.l+b.w/2,cy:b.t+b.h/2}}const[x0,x1,y0,y1]=PROJ[pr].b;const s=Math.min(b.w/(x1-x0),b.h/(y1-y0)),w=(x1-x0)*s,h=(y1-y0)*s;return{b,s,ox:b.l+(b.w-w)/2-x0*s,oy:b.t+(b.h-h)/2+y1*s,w,h,x0,y0}},
moved(S){const c=CTY[S.p.land];if(!S.tg)return c.p;const R=rotator(c.cen,vec(S.tg));return c.p.map(pg=>pg.map(r=>r.map(q=>ll(R(vec(q))))))},
draw(S){const pr=S.p.proj,G=this.geo(S);S.G=G;const land=mix(C.green,C.stage,.62),edge=mix(C.green,C.stage,.35);const sel=CTY[S.p.land];
 if(pr==='orto'){const{R,cx,cy}=G;const l0=S.l0*D2R,f0=S.f0*D2R;const pj=(lo,la)=>{const l=lo*D2R,f=la*D2R;const cc=Math.sin(f0)*Math.sin(f)+Math.cos(f0)*Math.cos(f)*Math.cos(l-l0);let x=Math.cos(f)*Math.sin(l-l0),y=Math.cos(f0)*Math.sin(f)-Math.sin(f0)*Math.cos(f)*Math.cos(l-l0);if(cc<0){const L=Math.hypot(x,y)||1;x/=L;y/=L}return[cx+x*R,cy-y*R,cc>=0]};
  circ(cx,cy,R,null,A(C.blue,.16));X.save();X.beginPath();X.arc(cx,cy,R,0,TAU);X.clip();
  for(let lo=-180;lo<180;lo+=30){const pts=[];for(let la=-90;la<=90;la+=3){const q=pj(lo,la);if(q[2])pts.push(q)}pth(pts,A(C.fg,.12),1)}for(let la=-60;la<=60;la+=30){const pts=[];for(let lo=-180;lo<=180;lo+=3){const q=pj(lo,la);pts.push(q[2]?q:null)}let seg=[];pts.forEach(q=>{if(q)seg.push(q);else{pth(seg,A(C.fg,.12),1);seg=[]}});pth(seg,A(C.fg,.12),1)}
  LAND.forEach(r=>{const ps=r.map(q=>pj(q[0],q[1]));if(ps.some(q=>q[2]))poly(ps,edge,land,1)});
  this.moved(S).forEach(pg=>pg.forEach((r,i)=>{const ps=r.map(q=>pj(q[0],q[1]));if(ps.some(q=>q[2]))poly(ps,C.yellow,i?C.stage:A(C.yellow,.55),1.6)}));
  if(S.p.tis)this.tissot(S,(lo,la)=>pj(lo,la),true);X.restore();circ(cx,cy,R,A(C.fg,.5),null,1.4);return}
 const{s,ox,oy,w,h}=G,f=PROJ[pr].f;const pj=(lo,la)=>{const[x,y]=f(lo,la);return[ox+x*s,oy-y*s]};
 X.save();X.beginPath();if(pr==='moll')X.ellipse(ox,oy,2*Math.SQRT2*s,Math.SQRT2*s,0,0,TAU);else X.rect(ox-PI*s,oy-(pr==='merc'?YM:PI/2)*s,2*PI*s,2*(pr==='merc'?YM:PI/2)*s);X.fillStyle=A(C.blue,.16);X.fill();X.clip();
 for(let lo=-180;lo<=180;lo+=30){const pts=[];for(let la=-90;la<=90;la+=2)pts.push(pj(lo,la));pth(pts,A(C.fg,.12),1)}for(let la=-60;la<=60;la+=30){const pts=[];for(let lo=-180;lo<=180;lo+=2)pts.push(pj(lo,la));pth(pts,la===0?A(C.fg,.3):A(C.fg,.12),1)}
 const draw=(rU,st,fl,lw)=>{for(const off of[-360,0,360]){const ps=rU.map(q=>pj(q[0]+off,q[1]));poly(ps,st,fl,lw)}};
 LANDU.forEach(r=>draw(r,edge,land,1));
 if(S.tg){sel.p.forEach(pg=>pg.forEach(r=>draw(unwrap(r),A(C.yellow,.6),null,1.2)))}
 this.moved(S).forEach(pg=>pg.forEach((r,i)=>draw(unwrap(r),C.yellow,i?A(C.stage,1):A(C.yellow,.55),1.8)));
 if(S.p.tis)this.tissot(S,pj,false);X.restore();
 const c=S.tg||sel.cll;const q=pj(c[0],c[1]);T(sel.n,q[0],q[1],{a:'center',s:13,w:700,c:C.fg,bg:A(C.stage,.55)})},
tissot(S,pj,orto){const r=600/R_;for(let la=-60;la<=60;la+=30)for(let lo=-150;lo<=180;lo+=60){const c=vec([lo,la]);const e1=cross([0,0,1],c),L=Math.hypot(...e1)||1,u=e1.map(x=>x/L),v=cross(c,u);const pts=[];for(let i=0;i<=40;i++){const a=TAU*i/40;const p=[0,1,2].map(k=>c[k]*Math.cos(r)+(u[k]*Math.cos(a)+v[k]*Math.sin(a))*Math.sin(r));const q=ll(p);const P=pj(q[0],q[1]);if(orto&&!P[2])return;pts.push(P)}poly(pts,A(C.red,.8),A(C.red,.25),1.2)}},
pick(S,x,y){const G=S.G;if(!G)return;if(S.p.proj==='orto')return{lx:x,ly:y,move(mx,my){S.l0-=(mx-this.lx)*.35;S.f0=clamp(S.f0+(my-this.ly)*.35,-80,80);this.lx=mx;this.ly=my}};
 const inv=PROJ[S.p.proj].inv;const toLL=(px,py)=>inv((px-G.ox)/G.s,(G.oy-py)/G.s);const c=S.tg||CTY[S.p.land].cll;const p0=toLL(x,y);if(!p0.every(isFinite))return;
 const pj=(lo,la)=>{const[a,b]=PROJ[S.p.proj].f(lo,la);return[G.ox+a*G.s,G.oy-b*G.s]};const cp=pj(c[0],c[1]);if(Math.hypot(cp[0]-x,cp[1]-y)>Math.max(60,G.s*.5))return;
 const dLo=c[0]-p0[0],dLa=c[1]-p0[1];return{move(mx,my){const q=toLL(mx,my);if(!q.every(isFinite))return;S.tg=[wrapd(q[0]+dLo),clamp(q[1]+dLa,-75,80)]}}},
readout(S){const c=CTY[S.p.land],la=(S.tg||c.cll)[1];const k=1/Math.cos(la*D2R)**2;return[['område',c.n],['virkelig areal',(c.area>1e6?nf(c.area/1e6,1)+' mill. km²':nf(c.area/1e3,0)+' 000 km²'),'yellow'],['midten ligger på',nf(Math.abs(la),0)+'° '+(la>=0?'N':'S')],['Mercator forstørrer arealet',S.p.proj==='merc'?'× '+nf(k,1):'(bare i Mercator)']]}
});
}
