/* ================= KJEMI (del 1) ================= */
const ELD='H,Hydrogen,1.008,2.20,31,1312|He,Helium,4.003,,28,2372|Li,Litium,6.94,0.98,128,520|Be,Beryllium,9.012,1.57,96,900|B,Bor,10.81,2.04,84,801|C,Karbon,12.01,2.55,76,1086|N,Nitrogen,14.01,3.04,71,1402|O,Oksygen,16.00,3.44,66,1314|F,Fluor,19.00,3.98,57,1681|Ne,Neon,20.18,,58,2081|Na,Natrium,22.99,0.93,166,496|Mg,Magnesium,24.31,1.31,141,738|Al,Aluminium,26.98,1.61,121,578|Si,Silisium,28.09,1.90,111,787|P,Fosfor,30.97,2.19,107,1012|S,Svovel,32.06,2.58,105,1000|Cl,Klor,35.45,3.16,102,1251|Ar,Argon,39.95,,106,1521|K,Kalium,39.10,0.82,203,419|Ca,Kalsium,40.08,1.00,176,590|Sc,Scandium,44.96,1.36,170,633|Ti,Titan,47.87,1.54,160,659|V,Vanadium,50.94,1.63,153,651|Cr,Krom,52.00,1.66,139,653|Mn,Mangan,54.94,1.55,139,717|Fe,Jern,55.85,1.83,132,762|Co,Kobolt,58.93,1.88,126,760|Ni,Nikkel,58.69,1.91,124,737|Cu,Kobber,63.55,1.90,132,745|Zn,Sink,65.38,1.65,122,906|Ga,Gallium,69.72,1.81,122,579|Ge,Germanium,72.63,2.01,120,762|As,Arsen,74.92,2.18,119,947|Se,Selen,78.97,2.55,120,941|Br,Brom,79.90,2.96,120,1140|Kr,Krypton,83.80,3.00,116,1351|Rb,Rubidium,85.47,0.82,220,403|Sr,Strontium,87.62,0.95,195,550|Y,Yttrium,88.91,1.22,190,600|Zr,Zirkonium,91.22,1.33,175,640|Nb,Niob,92.91,1.6,164,652|Mo,Molybden,95.95,2.16,154,684|Tc,Technetium,98,1.9,147,702|Ru,Ruthenium,101.1,2.2,146,710|Rh,Rhodium,102.9,2.28,142,720|Pd,Palladium,106.4,2.20,139,804|Ag,Sølv,107.9,1.93,145,731|Cd,Kadmium,112.4,1.69,144,868|In,Indium,114.8,1.78,142,558|Sn,Tinn,118.7,1.96,139,709|Sb,Antimon,121.8,2.05,139,834|Te,Tellur,127.6,2.1,138,869|I,Jod,126.9,2.66,139,1008|Xe,Xenon,131.3,2.6,140,1170';
const EL=[null].concat(ELD.split('|').map((r,i)=>{const a=r.split(',');const Z=i+1;let per,grp;if(Z<=2){per=1;grp=Z===1?1:18}else if(Z<=18){per=Z<=10?2:3;const k=Z-(per===2?2:10);grp=k<=2?k:k+10}else{per=Z<=36?4:5;grp=Z-(per===4?18:36)}
 const cat=grp===18?'edelgass':grp===17?'halogen':Z===1?'ikke-metall':grp===1?'alkalimetall':grp===2?'jordalkalimetall':grp<=12?'overgangsmetall':[5,14,32,33,51,52].includes(Z)?'halvmetall':[6,7,8,15,16,34].includes(Z)?'ikke-metall':'annet metall';
 return{Z,s:a[0],n:a[1],m:+a[2],en:a[3]===''?null:+a[3],r:+a[4],ie:+a[5],per,grp,cat}}));
const MASSNR=[0,1,4,7,9,11,12,14,16,19,20,23,24,27,28,31,32,35,40,39,40,45,48,51,52,55,56,59,58,63,64,69,74,75,80,79,84];
const ORB=[['1s',2],['2s',2],['2p',6],['3s',2],['3p',6],['4s',2],['3d',10],['4p',6],['5s',2],['4d',10],['5p',6]];
function config(Z,e){let fill=[];let left=Z;for(const[o,c]of ORB){if(left<=0)break;const k=Math.min(c,left);fill.push([o,k]);left-=k}
 const ex={24:[['3d',5],['4s',1]],29:[['3d',10],['4s',1]],42:[['4d',5],['5s',1]],47:[['4d',10],['5s',1]]};if(ex[Z]){fill=fill.map(([o,k])=>{const f=ex[Z].find(q=>q[0]===o);return[o,f?f[1]:k]})}
 if(e<Z){let rem=Z-e;const ord=fill.map((f,i)=>i).sort((a,b)=>{const na=+fill[a][0][0],nb=+fill[b][0][0];if(na!==nb)return nb-na;return'spdf'.indexOf(fill[b][0][1])-'spdf'.indexOf(fill[a][0][1])});for(const i of ord){while(rem>0&&fill[i][1]>0){fill[i][1]--;rem--}}}
 else if(e>Z){let extra=e-Z;const have=fill.reduce((a,f)=>a+f[1],0);for(const[o,c]of ORB){const f=fill.find(q=>q[0]===o);const cur=f?f[1]:0;if(cur<c&&extra>0){const k=Math.min(c-cur,extra);if(f)f[1]+=k;else fill.push([o,k]);extra-=k}}}
 return fill.filter(f=>f[1]>0)}
const shells=cf=>{const s=[0,0,0,0,0,0];cf.forEach(([o,k])=>s[+o[0]]+=k);return s.slice(1).filter((v,i,a)=>a.slice(i).some(x=>x>0))};
const catCol=c=>({edelgass:C.purple,halogen:C.teal,'ikke-metall':C.green,alkalimetall:C.red,jordalkalimetall:C.gold,overgangsmetall:C.blue,halvmetall:C.yellow,'annet metall':C.grey}[c]);

/* ---------- Atomets oppbygning ---------- */
M({id:'ki-atom',s:'ki',c:['NAT','KJ1'],title:'Atomets oppbygning og elektronkonfigurasjon',short:'Atomets oppbygning',kw:'atom proton nøytron elektron elektronskall valenselektroner ion edelgass orbital elektronkonfigurasjon',
lead:'Antall protoner bestemmer hvilket grunnstoff det er. Elektronene fyller skallene innenfra og ut, og de ytterste elektronene, valenselektronene, bestemmer de kjemiske egenskapene.',
controls:[{id:'Z',label:'Antall protoner <i>Z</i>',min:1,max:36,step:1,value:11,fmt:v=>v+'  ('+EL[v].s+')'},{id:'q',label:'Ladning',min:-3,max:3,step:1,value:0,fmt:v=>v>0?'+'+v:v<0?'−'+(-v):'0'}],
tex:['A=Z+N','\\text{ladning}=\\#p^+-\\#e^-','\\text{maks antall i skall } n:\\ 2n^2'],
about:['Kjernen består av protoner (røde) og nøytroner (grå). Elektronene går i skall rundt kjernen. De gule er valenselektronene i det ytterste skallet.','Atomer blir ofte ioner for å få <strong>edelgasskonfigurasjon</strong>, med fullt ytterste skall. Natrium gir fra seg ett elektron og blir Na⁺. Klor tar opp ett og blir Cl⁻.','Orbitalnotasjonen viser hvordan elektronene fordeler seg på s-, p- og d-orbitaler. Fra kalium fylles 4s før 3d.'],
tasks:['Finn alle grunnstoffene som har 1 valenselektron blant de 20 første. Hvor står de i periodesystemet?','Lag ionet O²⁻. Hvilken edelgass har samme elektronkonfigurasjon?','Hvorfor danner magnesium ionet Mg²⁺ og ikke Mg⁺?','Skriv elektronkonfigurasjonen til jern (Z = 26) og til Fe³⁺.'],
draw(S){const Z=Math.round(S.p.Z),q=Math.round(S.p.q),e=Math.max(0,Z-q),E=EL[Z],A_=MASSNR[Z],N=A_-Z;const cf=config(Z,e),sh=shells(cf);const[bl,br]=split(S,.55,{g:24});
 const cx=bl.l+bl.w/2,cy=bl.t+bl.h/2,R=Math.min(bl.w,bl.h)/2*.92,ns=Math.max(sh.length,1),rn=k=>R*(.26+.74*k/ns);
 for(let k=1;k<=ns;k++)circ(cx,cy,rn(k),A(C.fg,.18),null,1.2);
 const br_=Math.max(2.4,Math.min(7,R*.05));for(let i=0;i<A_;i++){const r=br_*.9*Math.sqrt(i+.5),th=i*2.39996;const isP=Math.floor((i+1)*Z/A_)>Math.floor(i*Z/A_);sphere(cx+Math.cos(th)*r,cy+Math.sin(th)*r,br_,isP?C.red:'#9aa6b2')}
 sh.forEach((cnt,k)=>{const r=rn(k+1),val=k===sh.length-1;for(let j=0;j<cnt;j++){const a=j/cnt*TAU+S.t*.5/(k+1);dot(cx+Math.cos(a)*r,cy+Math.sin(a)*r,4.2,val?C.yellow:C.blue)}});
 const tw_=Math.min(br.w*.5,150),tx=br.l,ty=br.t;rr(tx,ty,tw_,tw_*1.1,6,A(catCol(E.cat),.8),A(catCol(E.cat),.1),2);T(String(Z),tx+10,ty+16,{f:'n',s:13,c:C.fg2});T(nf(E.m,2),tx+tw_-10,ty+16,{a:'right',f:'n',s:12,c:C.fg3});T(E.s,tx+tw_/2,ty+tw_*.55,{a:'center',f:'d',s:tw_*.42,w:500});T(E.n,tx+tw_/2,ty+tw_*.92,{a:'center',s:13,c:C.fg2});
 const ion=E.s+(q===0?'':(Math.abs(q)>1?sup(Math.abs(q)):'')+(q>0?'⁺':'⁻'));const lines=[[`${q===0?'Atom':'Ion'}: ${ion}`,C.fg],[`${Z} protoner, ${N} nøytroner, ${e} elektroner`,C.fg2],[`massetall A = ${A_}`,C.fg2],[`skall: ${sh.join(', ')}`,C.yellow]];
 const ox=br.l+(isWide(S)?0:tw_+16),oy=isWide(S)?ty+tw_*1.1+20:ty;lines.forEach(([t,c],i)=>T(t,ox,oy+i*24+10,{s:i?14:17,c,f:i===3?'n':'u'}));
 const cs=cf.map(([o,k])=>o+sup(k)).join(' ');let lns=[cs];if(tw(cs,{f:'n',s:14})>br.w-10){const h=Math.ceil(cf.length/2);lns=[cf.slice(0,h).map(([o,k])=>o+sup(k)).join(' '),cf.slice(h).map(([o,k])=>o+sup(k)).join(' ')]}lns.forEach((l,i)=>T(l,ox,oy+4*24+10+i*22,{f:'n',s:14,c:C.teal}));
 if([2,10,18,36].includes(e))T('Edelgasskonfigurasjon',ox,oy+4*24+10+lns.length*22+6,{s:14,c:C.green,w:700});T(E.cat,ox,oy+4*24+10+lns.length*22+30,{s:13,c:catCol(E.cat)})},
readout(S){const Z=Math.round(S.p.Z),q=Math.round(S.p.q),e=Math.max(0,Z-q);const sh=shells(config(Z,e));return[['p⁺',Z,'red'],['n',MASSNR[Z]-Z],['e⁻',e,'blue'],['valenselektroner',sh[sh.length-1]||0,'yellow']]}
});

/* ---------- Periodesystemet ---------- */
{
const PROP={en:{k:'en',n:'Elektronegativitet',u:'',d:2,tr:['øker →','avtar ↓']},r:{k:'r',n:'Atomradius',u:' pm',d:0,tr:['avtar →','øker ↓']},ie:{k:'ie',n:'1. ioniseringsenergi',u:' kJ/mol',d:0,tr:['øker →','avtar ↓']}};
M({id:'ki-periodesystem',s:'ki',c:['KJ1','NAT'],title:'Periodesystemet og periodiske egenskaper',short:'Periodesystemet',kw:'periodesystem gruppe periode elektronegativitet atomradius ioniseringsenergi metall ikke-metall edelgass trend',
lead:'Egenskapene til grunnstoffene gjentar seg periodisk. Velg en egenskap og se mønsteret både i tabellen og i grafen under.',
hint:'Klikk på et grunnstoff.',
controls:[{id:'pr',type:'seg',label:'Farg etter',value:'en',options:[['en','Elektronegativitet'],['r','Atomradius'],['ie','Ioniseringsenergi'],['kat','Grunnstofftype']]},{id:'tr',type:'check',label:'Vis trendpiler',value:true}],
tex:['\\text{periode}=\\text{antall elektronskall}','\\text{hovedgruppe: antall valenselektroner}'],
about:['Grunnstoffene står ordnet etter atomnummer. I samme <strong>gruppe</strong> (kolonne) har atomene like mange valenselektroner og ligner hverandre kjemisk.','Mot høyre i en periode øker kjerneladningen, mens antall skall er det samme. Elektronene trekkes tettere inn: radien avtar, og elektronegativitet og ioniseringsenergi øker.','Nedover i en gruppe får atomene flere skall. Valenselektronene er lenger fra kjernen og skjermet av indre elektroner. Da blir radien større og ioniseringsenergien lavere.','Grafen nederst viser verdien mot atomnummer. Toppene i ioniseringsenergi ligger hos edelgassene.'],
tasks:['Hvilket grunnstoff har høyest elektronegativitet? Hvorfor?','Forklar hvorfor kalium er mer reaktivt enn natrium.','Finn to steder der ioniseringsenergien faller litt selv om man går mot høyre. (Tips: Be→B og N→O.)','Hvorfor har edelgassene ingen elektronegativitet i tabellen?'],
init(S){S.sel=11;S.hov=0},
geo(S){const b=pad(S,18,18,18);const[tb,gb]=rows(b,[2.5,1],22);const cs=Math.min(tb.w/18,(tb.h-18)/5.25);const x0=tb.l+(tb.w-cs*18)/2,y0=tb.t+18;return{cs,x0,y0,gb}},
val(S,E){const p=S.p.pr;return p==='kat'?null:E[PROP[p].k]},
draw(S){const{cs,x0,y0,gb}=this.geo(S);S.G={cs,x0,y0};const p=S.p.pr;const vals=EL.slice(1).map(E=>this.val(S,E)).filter(v=>v!==null);const mn=Math.min(...vals),mx=Math.max(...vals);
 const stops=['#1d3550',C.blue,C.yellow,C.red];
 EL.slice(1).forEach(E=>{const x=x0+(E.grp-1)*cs,y=y0+(E.per-1)*cs;const v=this.val(S,E);let fill;if(p==='kat')fill=A(catCol(E.cat),.55);else fill=v===null?A(C.fg,.08):ramp(stops,(v-mn)/(mx-mn),.9);const sel=E.Z===S.sel,hov=E.Z===S.hov;rr(x+1.5,y+1.5,cs-3,cs-3,3,sel?C.fg:hov?A(C.fg,.6):null,fill,sel?2.4:1.4);T(E.s,x+cs/2,y+cs*.56,{a:'center',f:'d',s:Math.max(9,cs*.4),w:500,c:p!=='kat'&&v!==null&&(v-mn)/(mx-mn)>.45&&(v-mn)/(mx-mn)<.85?C.stage:C.fg});if(cs>34)T(String(E.Z),x+4,y+9,{f:'n',s:9,c:p!=='kat'&&v!==null&&(v-mn)/(mx-mn)>.45&&(v-mn)/(mx-mn)<.85?C.stage:C.fg3})});
 const E=EL[S.sel];const ix=x0+2*cs+6,iy=y0+2,iw=cs*10-12,ih=cs*3-6;rr(ix,iy,iw,ih,6,A(C.fg,.15),A(C.stage,.9),1);const ls=Math.max(11,Math.min(15,cs*.33));
 T(`${E.Z}  ${E.s}  ${E.n}`,ix+12,iy+ls+8,{s:ls+3,w:700,c:C.fg});const cf=config(E.Z,E.Z).map(([o,k])=>o+sup(k)).join(' ');
 [[`atommasse ${nf(E.m,2)} u   ·   ${E.cat}`,C.fg2],[`elektronegativitet ${E.en===null?'–':nf(E.en,2)}   ·   radius ${E.r} pm`,C.fg2],[`ioniseringsenergi ${E.ie} kJ/mol`,C.fg2],[cf,C.teal]].forEach(([t,c],i)=>T(t,ix+12,iy+ls*2+18+i*(ls+7),{s:ls,c,f:i===3?'n':'u'}));
 if(S.p.tr&&p!=='kat'){const pr=PROP[p];arr(x0+cs*13,y0-4+cs*.0,x0+cs*17.5,y0-4,C.fg,2,8);T(pr.tr[0].replace(' →',''),x0+cs*13,y0-14+cs*0,{s:12,c:C.fg});arr(x0-8,y0+cs*.5,x0-8,y0+cs*4.6,C.fg,2,8);X.save();X.translate(x0-16,y0+cs*2.5);X.rotate(-PI/2);T(pr.tr[1].replace(' ↓',''),0,0,{a:'center',s:12,c:C.fg});X.restore()}
 if(p==='kat'){const cats=['alkalimetall','jordalkalimetall','overgangsmetall','annet metall','halvmetall','ikke-metall','halogen','edelgass'];cats.forEach((c,i)=>{const x=gb.l+(i%4)*gb.w/4,y=gb.t+20+Math.floor(i/4)*24;rct(x,y-6,12,12,null,A(catCol(c),.7));T(c,x+18,y,{s:13,c:C.fg2})});return}
 const pr=PROP[p];const P=Plane(.5,54.5,mn-(mx-mn)*.1,mx+(mx-mn)*.15,gb);P.axes({xs:5,y:false,xAt:mn-(mx-mn)*.1,xl:'Z',ls:14,x0:true});lab(gb,pr.n+(pr.u?' ('+pr.u.trim()+')':''));
 const pts=EL.slice(1).filter(E=>E[pr.k]!==null).map(E=>P.pt(E.Z,E[pr.k]));pth(pts,A(C.fg,.4),1.4);EL.slice(1).forEach(E=>{if(E[pr.k]===null)return;dot(P.X(E.Z),P.Y(E[pr.k]),E.Z===S.sel?6:3,E.Z===S.sel?C.fg:ramp(stops,(E[pr.k]-mn)/(mx-mn)));if(E.grp===18||E.grp===1)T(E.s,P.X(E.Z),P.Y(E[pr.k])+(p==='r'?(E.grp===1?-12:12):(E.grp===18?-12:12)),{a:'center',f:'n',s:10,c:C.fg3})})},
cellAt(S,x,y){const G=S.G;if(!G)return 0;const gx=Math.floor((x-G.x0)/G.cs)+1,py=Math.floor((y-G.y0)/G.cs)+1;const E=EL.find(e=>e&&e.grp===gx&&e.per===py);return E?E.Z:0},
click(S,x,y){const z=this.cellAt(S,x,y);if(z)S.sel=z},
hover(S,x,y){S.hov=this.cellAt(S,x,y)},
readout(S){const E=EL[S.sel];return[['grunnstoff',E.n],['gruppe',E.grp],['periode',E.per],['valenselektroner',E.grp<=2?E.grp:E.grp>=13?E.grp-10:'–']]}
});
}

/* ---------- Kjemisk binding og polaritet ---------- */
{
const LST=[1,3,6,7,8,9,11,12,13,14,15,16,17,19,20,35,53];const MET=[3,11,12,13,19,20];
const btype=(a,b)=>{if(MET.includes(a)&&MET.includes(b))return'metall';const d=Math.abs(EL[a].en-EL[b].en);return d<.5?'upolar':d<=1.7?'polar':'ionisk'};
const VAL={1:1,3:1,11:1,19:1,12:2,20:2,13:3,6:4,14:4,7:3,15:3,8:2,16:2,9:1,17:1,35:1,53:1};
M({id:'ki-binding',s:'ki',c:['KJ1','NAT'],title:'Kjemisk binding og elektronegativitet',short:'Kjemisk binding',kw:'binding kovalent polar upolar ionebinding metallbinding elektronegativitet dipol delvis ladning løselighet',
lead:'Elektronegativitet er hvor hardt et atom trekker på elektronene i en binding. Forskjellen bestemmer om bindingen blir upolar, polar eller ionisk.',
controls:[{id:'a',type:'sel',label:'Atom 1',value:1,options:LST.map(z=>[z,`${EL[z].s} – ${EL[z].n} (${nf(EL[z].en,2)})`])},{id:'b',type:'sel',label:'Atom 2',value:17,options:LST.map(z=>[z,`${EL[z].s} – ${EL[z].n} (${nf(EL[z].en,2)})`])},{type:'btns',items:[['H–H',S=>{setP('a',1,S);setP('b',1,S)}],['H–Cl',S=>{setP('a',1,S);setP('b',17,S)}],['O–H',S=>{setP('a',8,S);setP('b',1,S)}],['Na–Cl',S=>{setP('a',11,S);setP('b',17,S)}]]}],
tex:['\\Delta EN=|EN_1-EN_2|','\\Delta EN<0{,}5:\\ \\text{upolar}\\quad 0{,}5\\text{–}1{,}7:\\ \\text{polar}\\quad >1{,}7:\\ \\text{ionisk}'],
about:['Den blå skyen viser hvor elektronene i bindingen befinner seg. Er atomene like elektronegative, deles elektronene likt: bindingen er <strong>upolar</strong>.','Er forskjellen større, trekkes elektronskyen mot det mest elektronegative atomet. Det får en delvis negativ ladning (δ−), og det andre en delvis positiv (δ+). Bindingen er <strong>polar</strong>.','Ved svært stor forskjell går elektronet helt over. Da dannes ioner, og de holdes sammen av elektrostatisk tiltrekning: en <strong>ionebinding</strong>.','Grensene 0,5 og 1,7 er tommelfingerregler. Overgangen fra polar til ionisk er glidende. Mellom to metaller blir det metallbinding.'],
tasks:['Sorter bindingene C–H, O–H, N–H og H–F etter polaritet.','Hvorfor løser salt seg godt i vann, mens olje ikke gjør det? Bruk ordet polaritet.','Hvilke to grunnstoffer i lista gir størst forskjell i elektronegativitet?','Er en molekyl med polare bindinger alltid polart? Tenk på CO₂.'],
draw(S){const a=+S.p.a,b=+S.p.b,Ea=EL[a],Eb=EL[b];const d=Math.abs(Ea.en-Eb.en),ty=btype(a,b);const[top,bot]=rows(pad(S,30,30,40),[3,1],30);
 const cy=top.t+top.h*.48,cx=top.l+top.w/2,sc=Math.min(top.w/7,top.h/3.2)/100;let ra=Ea.r*sc*1.15,rb=Eb.r*sc*1.15;const ion=ty==='ionisk';const ph=(S.t%4)/4;
 const sepBase=(Ea.r+Eb.r)*sc*.75;const sep=ion?sepBase*1.35:sepBase;const xa=cx-sep,xb=cx+sep;const more=Ea.en>=Eb.en?'a':'b';const s=clamp(d/2.2,0,1);
 if(ion){const give=more==='a'?'b':'a';const t=clamp((ph-.2)/.4,0,1);const qa=Math.round(VAL[more==='a'?b:a]||1);if(ph>.6){if(give==='a')ra*=.75;else rb*=.75;if(more==='a')ra*=1.15;else rb*=1.15}
  glow(xa,cy,ra*1.5,more==='a'?C.blue:C.red,.35);glow(xb,cy,rb*1.5,more==='b'?C.blue:C.red,.35);sphere(xa,cy,ra*.7,more==='a'?C.green:C.grey);sphere(xb,cy,rb*.7,more==='b'?C.green:C.grey);
  const gx=give==='a'?xa:xb,tx=more==='a'?xa:xb;const ex=lerp(gx+(tx>gx?ra*.7:-rb*.7),tx+(tx>gx?-rb*.5:ra*.5),ease(t)),ey=cy-Math.sin(PI*t)*40;dot(ex,ey,5,C.yellow);if(ph>.6){T(`${EL[give==='a'?a:b].s}⁺`,give==='a'?xa:xb,cy-(give==='a'?ra:rb)-20,{a:'center',f:'d',s:20,c:C.red});T(`${EL[more==='a'?a:b].s}⁻`,more==='a'?xa:xb,cy-(more==='a'?ra:rb)-20,{a:'center',f:'d',s:20,c:C.blue})}}
 else{const wa=ty==='metall'?.5:more==='a'?.5+.5*s:.5-.5*s;const ecx=lerp(xb,xa,wa*1)*1;const g=X.createRadialGradient(lerp(xa,xb,1-wa),cy,4,lerp(xa,xb,1-wa),cy,(ra+rb)*1.3);g.addColorStop(0,A(C.blue,.55));g.addColorStop(1,A(C.blue,0));X.fillStyle=g;X.beginPath();X.ellipse(cx,cy,sep+Math.max(ra,rb)*1.2,Math.max(ra,rb)*1.25,0,0,TAU);X.fill();
  sphere(xa,cy,ra*.62,'#8f9ba8');sphere(xb,cy,rb*.62,'#8f9ba8');const ex=lerp(xa,xb,1-wa);dot(ex-4,cy,4,C.yellow);dot(ex+4,cy,4,C.yellow);
  if(ty==='polar'){T('δ+',more==='a'?xb:xa,cy-(more==='a'?rb:ra)-14,{a:'center',f:'m',s:20,c:C.red});T('δ−',more==='a'?xa:xb,cy-(more==='a'?ra:rb)-14,{a:'center',f:'m',s:20,c:C.blue});const y=cy+Math.max(ra,rb)+26;const x1=more==='a'?xb:xa,x2=more==='a'?xa:xb;arr(x1,y,x2,y,C.fg,2,9);ln(x1+(x2>x1?10:-10),y-7,x1+(x2>x1?10:-10),y+7,C.fg,2)}}
 T(Ea.s,xa,cy,{a:'center',f:'d',s:Math.max(16,ra*.5),w:600,c:C.stage});T(Eb.s,xb,cy,{a:'center',f:'d',s:Math.max(16,rb*.5),w:600,c:C.stage});
 const P=Plane(0,3.3,0,1,{l:bot.l+20,t:bot.t+10,w:bot.w-40,h:24});[[0,.5,C.green,'upolar kovalent'],[.5,1.7,C.yellow,'polar kovalent'],[1.7,3.3,C.red,'ionisk']].forEach(([x0,x1,c,l])=>{rct(P.X(x0),P.t,P.X(x1)-P.X(x0),P.h,null,A(c,.35));T(l,(P.X(x0)+P.X(x1))/2,P.t+P.h+14,{a:'center',s:12,c})});
 [0,.5,1,1.7,2,3].forEach(v=>T(nf(v,1),P.X(v),P.t-9,{a:'center',f:'n',s:10.5,c:C.fg3}));const mx=P.X(Math.min(d,3.3));poly([[mx,P.t-1],[mx-7,P.t-14],[mx+7,P.t-14]],null,C.fg);ln(mx,P.t,mx,P.t+P.h,C.fg,2.5);
 T(ty==='metall'?'Metallbinding':ty==='upolar'?'Upolar kovalent binding':ty==='polar'?'Polar kovalent binding':'Ionebinding',top.l,top.t+6,{s:18,w:700,c:C.fg})},
readout(S){const a=+S.p.a,b=+S.p.b;return[[`EN(${EL[a].s})`,nf(EL[a].en,2)],[`EN(${EL[b].s})`,nf(EL[b].en,2)],['ΔEN',nf(Math.abs(EL[a].en-EL[b].en),2),'yellow'],['binding',btype(a,b)]]}
});
}

/* ---------- Molekylformer (VSEPR) ---------- */
{
const nrm=v=>{const l=Math.hypot(...v);return v.map(x=>x/l)};
const T4=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]].map(nrm);
const pyr=(al,n=3)=>[...Array(n).keys()].map(k=>[Math.sin(al)*Math.cos(k*TAU/n),Math.sin(al)*Math.sin(k*TAU/n),Math.cos(al)]);
const h2=52.25*PI/180;
const MOL={CH4:{f:'CH₄',c:'C',L:'H',b:T4,lp:[],form:'tetraedrisk',ang:'109,5°',pol:false},NH3:{f:'NH₃',c:'N',L:'H',b:pyr(rad(111.8)),lp:[[0,0,1]],form:'trigonal pyramide',ang:'107°',pol:true},H2O:{f:'H₂O',c:'O',L:'H',b:[[Math.sin(h2),0,-Math.cos(h2)],[-Math.sin(h2),0,-Math.cos(h2)]],lp:[[0,.8,.6],[0,-.8,.6]],form:'vinklet',ang:'104,5°',pol:true},
 CO2:{f:'CO₂',c:'C',L:'O',b:[[1,0,0],[-1,0,0]],dbl:true,lp:[],form:'lineær',ang:'180°',pol:false},BF3:{f:'BF₃',c:'B',L:'F',b:pyr(PI/2),lp:[],form:'plan trigonal',ang:'120°',pol:false},PCl5:{f:'PCl₅',c:'P',L:'Cl',b:[[0,0,1],[0,0,-1],...pyr(PI/2)],lp:[],form:'trigonal bipyramide',ang:'90° og 120°',pol:false},SF6:{f:'SF₆',c:'S',L:'F',b:[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],lp:[],form:'oktaedrisk',ang:'90°',pol:false}};
const ACOL={C:'#6b7480',H:'#e8ecef',N:'#4f7fd8',O:'#e0524a',F:'#9ad46a',Cl:'#5fbf5a',B:'#e8a07a',P:'#f09a3e',S:'#e8d050'};const ARAD={H:.32,C:.5,N:.48,O:.48,F:.44,Cl:.56,B:.48,P:.58,S:.58};
M({id:'ki-vsepr',s:'ki',c:['KJ1'],title:'Molekylformer: elektronpar frastøter hverandre',short:'Molekylformer',kw:'vsepr molekylform tetraeder bindingsvinkel ledig elektronpar polaritet dipolmolekyl lewisstruktur',
lead:'Elektronparene rundt et sentralatom frastøter hverandre og legger seg så langt fra hverandre som mulig. Ledige elektronpar (lilla) tar mer plass og presser bindingene sammen.',
hint:'Dra for å snu molekylet.',
controls:[{id:'mol',type:'seg',label:'Molekyl',value:'CH4',options:Object.entries(MOL).map(([k,v])=>[k,v.f])},{id:'lp',type:'check',label:'Vis ledige elektronpar',value:true},{id:'dp',type:'check',label:'Vis dipolmoment',value:true}],
tex:['\\text{4 elektronpar}\\Rightarrow 109{,}5^\\circ\\ (\\text{tetraeder})','\\text{3 elektronpar}\\Rightarrow 120^\\circ,\\quad \\text{2}\\Rightarrow 180^\\circ'],
about:['Metan, ammoniakk og vann har alle fire elektronpar rundt sentralatomet, men ulikt antall ledige par. Derfor er vinklene 109,5°, 107° og 104,5°.','Formen bestemmer om molekylet er polart. CO₂ har polare bindinger, men de peker motsatt vei og opphever hverandre. Vann er vinklet, og bindingene opphever ikke hverandre: vann er et dipolmolekyl.','Den gule buen viser bindingsvinkelen mellom to av bindingene.'],
tasks:['Hvorfor er vinkelen i vann mindre enn i metan?','Hvilke av molekylene er polare? Forklar med formen.','Tegn lewisstrukturen til NH₃ og forklar formen.','Hvorfor er CO₂ lineært mens H₂O er vinklet?'],
init(S){S.yaw=.6;S.pitch=.35},
update(S,dt){if(!Stage.drag||S!==Stage.S)S.yaw+=dt*.35},
draw(S){const M_=MOL[S.p.mol];const cx=S.W/2,cy=S.H/2+10,sc=Math.min(S.W,S.H)/5.2;const cyw=Math.cos(S.yaw),syw=Math.sin(S.yaw),cp=Math.cos(S.pitch),sp=Math.sin(S.pitch);
 const pr=([x,y,z])=>{const x1=x*cyw-y*syw,y1=x*syw+y*cyw;const y2=y1*cp-z*sp,z2=y1*sp+z*cp;const k=6/(6+y2);return[cx+x1*sc*k,cy-z2*sc*k,y2,k]};
 const items=[];const bl=M_.L==='H'?1:1.3;M_.b.forEach((d,i)=>{const p=d.map(v=>v*bl);items.push({z:pr(p.map(v=>v/2))[2],f:()=>{const a=pr([0,0,0]),m=pr(p.map(v=>v/2)),b=pr(p);ln(a[0],a[1],m[0],m[1],ACOL[M_.c],10);ln(m[0],m[1],b[0],b[1],ACOL[M_.L],10);if(M_.dbl){const off=6;const dx=b[1]-a[1],dy=a[0]-b[0],l=Math.hypot(dx,dy)||1;ln(a[0]+dx/l*off,a[1]+dy/l*off,b[0]+dx/l*off,b[1]+dy/l*off,A(C.fg,.5),2)}}});items.push({z:pr(p)[2],f:()=>{const q=pr(p);sphere(q[0],q[1],ARAD[M_.L]*sc*.55*q[3],ACOL[M_.L])}})});
 items.push({z:pr([0,0,0])[2],f:()=>{const q=pr([0,0,0]);sphere(q[0],q[1],ARAD[M_.c]*sc*.6,ACOL[M_.c]);T(M_.c,q[0],q[1],{a:'center',f:'d',s:16,w:600,c:C.stage})}});
 if(S.p.lp)M_.lp.forEach(d=>{const c=d.map(v=>v*.62);items.push({z:pr(c)[2],f:()=>{const q=pr(c);glow(q[0],q[1],sc*.38*q[3],C.purple,.75);const o=pr(d.map(v=>v*.62)),perp=[-d[1],d[0],0];const p1=pr(c.map((v,i)=>v+perp[i]*.08)),p2=pr(c.map((v,i)=>v-perp[i]*.08));dot(p1[0],p1[1],3.5,C.fg);dot(p2[0],p2[1],3.5,C.fg)}})});
 items.sort((a,b)=>b.z-a.z).forEach(i=>i.f());
 if(M_.b.length>=2){const pr_=({PCl5:[0,2],SF6:[0,2]})[S.p.mol]||[0,1];const u=M_.b[pr_[0]],w=M_.b[pr_[1]];const ang=Math.acos(clamp(u[0]*w[0]+u[1]*w[1]+u[2]*w[2],-1,1));const pts=[];for(let i=0;i<=24;i++){const t=i/24,s1=Math.sin((1-t)*ang)/Math.sin(ang||1),s2=Math.sin(t*ang)/Math.sin(ang||1);const v=ang>3.1?[0,Math.cos(t*PI),Math.sin(t*PI)].map((x,k)=>k===0?Math.cos(t*PI)*u[0]:x):[0,1,2].map(k=>(u[k]*s1+w[k]*s2)*.42);pts.push(pr(ang>3.1?[Math.cos(t*PI)*.42,0,Math.sin(t*PI)*.42]:v))}pth(pts.map(q=>[q[0],q[1]]),C.yellow,2.2);const mq=pts[12];T(M_.ang,mq[0]+10,mq[1]-10,{f:'n',s:13,c:C.yellow,bg:A(C.stage,.6)})}
 if(S.p.dp&&M_.pol){const s=[0,0,0];M_.b.forEach(d=>d.forEach((v,i)=>s[i]+=v));const n=nrm(s);const a=pr(n.map(v=>v*1.25)),b=pr(n.map(v=>-v*.9));arr(a[0],a[1],b[0],b[1],C.pink,3,11);T('dipol',b[0]+10,b[1],{s:13,c:C.pink})}
 T(M_.f,20,28,{f:'d',s:30,w:500});T(M_.form,20,58,{s:15,c:C.fg2})},
pick(S,x,y){return{lx:x,ly:y,move(mx,my){S.yaw+=(mx-this.lx)*.01;S.pitch=clamp(S.pitch+(my-this.ly)*.01,-1.4,1.4);this.lx=mx;this.ly=my}}},
readout(S){const M_=MOL[S.p.mol];return[['form',M_.form],['vinkel',M_.ang,'yellow'],['bindende par',M_.b.length],['ledige par',M_.lp.length,'purple'],['polart',M_.pol?'ja':'nei','pink']]}
});
}

/* ---------- Gasslovene ---------- */
{
const R_=8.314;
M({id:'ki-gass',s:'ki',c:['KJ1','FY1'],title:'Partikkelmodellen og den ideelle gassloven',short:'Gasslovene',kw:'gass trykk volum temperatur ideell gasslov partikkelmodell kinetisk teori kelvin boyle maxwell-boltzmann',
lead:'Trykket er summen av alle støtene mot veggene. Flere partikler, høyere temperatur eller mindre volum gir flere og hardere støt.',
controls:[{id:'T',label:'Temperatur <i>T</i>',min:100,max:1000,step:10,value:300,unit:'K'},{id:'V',label:'Volum <i>V</i>',min:1,max:2.5,step:.05,value:2,unit:'L',d:2},{id:'N',label:'Stoffmengde <i>n</i>',min:.01,max:.15,step:.005,value:.08,unit:'mol',d:3}],
tex:['pV=nRT','R=8{,}314\\ \\tfrac{\\text{J}}{\\text{mol·K}}','T\\ (\\text{K})=t\\ (^\\circ\\text{C})+273'],
about:['Hver prikk er et molekyl. Fargen viser farten: blå er langsom, rød er rask. Høyere temperatur betyr større gjennomsnittsfart.','Trykket måles ved å telle støtene mot veggene. Den målte verdien svinger litt rundt verdien fra den ideelle gassloven.','Histogrammet viser fartsfordelingen. Molekylene har ikke samme fart. Kurven er Maxwell–Boltzmann-fordelingen for en gass i to dimensjoner.','Hold temperaturen fast og halver volumet: trykket dobles (Boyles lov).'],
tasks:['Doble temperaturen i kelvin. Hva skjer med trykket?','Hold trykket konstant: hvordan må volumet endres når temperaturen øker?','Hvorfor må vi bruke kelvin og ikke celsius i gassloven?','Regn ut trykket når 0,10 mol gass har volum 2,0 L ved 300 K.'],
init(S){const r=rng(5);S.pt=[];for(let i=0;i<150;i++){const a=r()*TAU,s=.3*Math.sqrt(-2*Math.log(r()+1e-9))/1.2;S.pt.push({x:r()*.9+.05,y:r()*.9+.05,vx:Math.cos(a)*s,vy:Math.sin(a)*s})}S.imp=[];S.pm=null},
update(S,dt){const n=Math.round(S.p.N*1000)>150?150:Math.round(S.p.N*1000),W=S.v.V/2.5,ps=S.pt.slice(0,n);const vr=.42*Math.sqrt(S.p.T/300);let ke=0;ps.forEach(p=>ke+=p.vx*p.vx+p.vy*p.vy);const cur=Math.sqrt(ke/n)||1;const f=1+(vr/cur-1)*Math.min(1,dt*3);ps.forEach(p=>{p.vx*=f;p.vy*=f});
 let imp=0;const rad_=.012,sub=2;for(let s=0;s<sub;s++){const h=dt/sub;for(const p of ps){p.x+=p.vx*h;p.y+=p.vy*h;if(p.x<rad_){p.x=rad_;imp+=2*Math.abs(p.vx);p.vx=Math.abs(p.vx)}if(p.x>W-rad_){p.x=W-rad_;imp+=2*Math.abs(p.vx);p.vx=-Math.abs(p.vx)}if(p.y<rad_){p.y=rad_;imp+=2*Math.abs(p.vy);p.vy=Math.abs(p.vy)}if(p.y>1-rad_){p.y=1-rad_;imp+=2*Math.abs(p.vy);p.vy=-Math.abs(p.vy)}}
  for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const a=ps[i],b=ps[j];const dx=b.x-a.x,dy=b.y-a.y,d2=dx*dx+dy*dy;if(d2<4*rad_*rad_&&d2>1e-12){const d=Math.sqrt(d2),nx=dx/d,ny=dy/d;const rv=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;if(rv<0){a.vx+=rv*nx;a.vy+=rv*ny;b.vx-=rv*nx;b.vy-=rv*ny}}}}
 S.imp.push([S.t,imp]);while(S.imp.length&&S.imp[0][0]<S.t-1.5)S.imp.shift();const tot=S.imp.reduce((a,b)=>a+b[1],0),span=Math.max(.3,S.t-(S.imp[0]?S.imp[0][0]:S.t));const psim=tot/span/(2*(W+1));const pth_=n*vr*vr/2/W;const pid=S.p.N*R_*S.p.T/(S.p.V/1000)/1000;S.pm=psim/pth_*pid},
draw(S){const n=Math.min(150,Math.round(S.p.N*1000)),W=S.v.V/2.5;const[bl,br]=split(S,.62,{g:30});const sz=Math.min(bl.w,bl.h);const bx=bl.l+(bl.w-sz)/2,by=bl.t+(bl.h-sz)/2;const vr=.42*Math.sqrt(S.p.T/300);
 rct(bx,by,sz,sz,A(C.fg,.15),null,1);rct(bx,by,sz*W,sz,A(C.fg,.7),A(C.blue,.03),2);rct(bx+sz*W,by-6,10,sz+12,null,C.fg2);ln(bx+sz*W+10,by+sz/2,bx+sz*W+40,by+sz/2,C.fg2,4);T('stempel',bx+sz*W+16,by-16,{s:11,c:C.fg3});
 S.pt.slice(0,n).forEach(p=>{const v=Math.hypot(p.vx,p.vy)/(vr*1.8);dot(bx+p.x*sz,by+(1-p.y)*sz,Math.max(2.5,sz*.011),ramp([C.blue,C.yellow,C.red],v))});
 const hb={l:br.l+8,t:br.t+30,w:br.w-16,h:br.h*.45};lab(hb,'Fartsfordeling');const nb=20,vm=vr*3,h=new Array(nb).fill(0);S.pt.slice(0,n).forEach(p=>{const k=Math.floor(Math.hypot(p.vx,p.vy)/vm*nb);if(k<nb)h[k]++});const mx=Math.max(...h,3);
 h.forEach((c,i)=>rct(hb.l+i*hb.w/nb+1,hb.t+hb.h-c/mx*hb.h,hb.w/nb-2,c/mx*hb.h,null,A(ramp([C.blue,C.yellow,C.red],i/nb*1.6),.8)));const s2=vr*vr/2;X.beginPath();for(let i=0;i<=60;i++){const v=vm*i/60;const f=n*(v/s2)*Math.exp(-v*v/(2*s2))*(vm/nb);const x=hb.l+i/60*hb.w,y=hb.t+hb.h-f/mx*hb.h;i?X.lineTo(x,y):X.moveTo(x,y)}X.strokeStyle=C.fg;X.lineWidth=2;X.stroke();ln(hb.l,hb.t+hb.h,hb.l+hb.w,hb.t+hb.h,A(C.fg,.5),1);T('fart →',hb.l+hb.w,hb.t+hb.h+12,{a:'right',s:11,c:C.fg3});
 const pid=S.p.N*R_*S.p.T/(S.p.V/1000)/1000;infoBox(br.l+8,hb.t+hb.h+34,[[`p (målt)   = ${S.pm?nf(S.pm,0):'–'} kPa`,C.yellow],[`p = nRT/V  = ${nf(pid,0)} kPa`,C.fg],[`T = ${nf(S.p.T,0)} K = ${nf(S.p.T-273,0)} °C`,C.fg2],[`${n} partikler i figuren`,C.fg3]],{s:12.5})},
readout(S){const pid=S.p.N*R_*S.p.T/(S.p.V/1000)/1000;return[['p (målt)',S.pm?nf(S.pm,0)+' kPa':'–','yellow'],['p (ideell)',nf(pid,0)+' kPa'],['pV/(nT)',nf(pid*S.p.V/(S.p.N*S.p.T),3)+' J/(mol·K)']]},
live(S){const p=S.p;return`p=\\frac{nRT}{V}=\\frac{${tn(p.N,3)}\\cdot 8{,}314\\cdot ${tn(p.T,0)}}{${tn(p.V/1000,4)}\\ \\text{m}^3}=${tn(p.N*R_*p.T/(p.V/1000)/1000,0)}\\ \\text{kPa}`}
});
}

/* ---------- Støkiometri ---------- */
{
const SHP={H2:[['H',-.5,0],['H',.5,0]],O2:[['O',-.55,0],['O',.55,0]],N2:[['N',-.55,0],['N',.55,0]],H2O:[['O',0,0],['H',-.75,.55],['H',.75,.55]],CH4:[['C',0,0],['H',-.7,-.6],['H',.7,-.6],['H',-.7,.6],['H',.7,.6]],CO2:[['C',0,0],['O',-1,0],['O',1,0]],NH3:[['N',0,0],['H',-.75,.5],['H',.75,.5],['H',0,-.85]]};
const AC={H:'#e8ecef',O:'#e0524a',N:'#4f7fd8',C:'#6b7480'},AR={H:.42,O:.62,N:.62,C:.6};
const RX={vann:{n:'2H₂ + O₂ → 2H₂O',r:[['H2','H₂',2,2.016],['O2','O₂',1,32.00]],p:[['H2O','H₂O',2,18.02]]},metan:{n:'CH₄ + 2O₂ → CO₂ + 2H₂O',r:[['CH4','CH₄',1,16.04],['O2','O₂',2,32.00]],p:[['CO2','CO₂',1,44.01],['H2O','H₂O',2,18.02]]},amm:{n:'N₂ + 3H₂ → 2NH₃',r:[['N2','N₂',1,28.02],['H2','H₂',3,2.016]],p:[['NH3','NH₃',2,17.03]]}};
function mol(x,y,sp,s,a=1){X.globalAlpha=a;SHP[sp].forEach(([e,dx,dy])=>sphere(x+dx*s,y+dy*s,AR[e]*s,AC[e]));X.globalAlpha=1}
function calc(S){const R=RX[S.p.rx],a=[Math.round(S.p.nA),Math.round(S.p.nB)];const ev=Math.min(Math.floor(a[0]/R.r[0][2]),Math.floor(a[1]/R.r[1][2]));const lim=a[0]/R.r[0][2]<a[1]/R.r[1][2]?0:a[0]/R.r[0][2]>a[1]/R.r[1][2]?1:-1;return{R,a,ev,lim}}
M({id:'ki-stokiometri',s:'ki',c:['KJ1'],title:'Mol og begrensende reaktant',short:'Støkiometri',kw:'mol stoffmengde molar masse reaksjonslikning koeffisient begrensende reaktant overskudd utbytte',
lead:'Koeffisientene i reaksjonslikningen forteller i hvilket forhold stoffene reagerer. Når den ene reaktanten er brukt opp, stopper reaksjonen. Den kalles den begrensende reaktanten.',
controls:[{id:'rx',type:'seg',label:'Reaksjon',value:'vann',options:Object.entries(RX).map(([k,v])=>[k,v.n])},{id:'nA',label:'Stoffmengde av første reaktant',min:1,max:12,step:1,value:6,unit:'mol'},{id:'nB',label:'Stoffmengde av andre reaktant',min:1,max:12,step:1,value:5,unit:'mol'}],
tex:['n=\\frac{m}{M}','\\frac{n_A}{\\text{koeff}_A}<\\frac{n_B}{\\text{koeff}_B}\\Rightarrow A\\text{ er begrensende}'],
about:['Hvert molekyl i figuren står for ett mol. Reaksjonen skjer i porsjoner med akkurat de mengdene koeffisientene sier.','Den reaktanten som tar slutt først, er den <strong>begrensende reaktanten</strong>. Den bestemmer hvor mye produkt du får. Resten av den andre reaktanten er i overskudd.','Molar masse $M$ gjør om mellom mol og gram. Massen er bevart: summen av massene før er lik summen etter.'],
tasks:['Hvor mange mol O₂ trengs for å reagere med 6 mol H₂?','Lag en blanding der ingen reaktant er i overskudd i metanforbrenningen.','Regn ut hvor mange gram vann som dannes fra 4 mol H₂ og 5 mol O₂.','Vis at massen er bevart i ammoniakksyntesen med tallene i animasjonen.'],
init(S){S.k=0;S.ph=0;S.pt=0},change(S){this.init(S)},
update(S,dt){const{ev}=calc(S);S.pt+=dt;if(S.ph===0&&S.pt>1.4){S.ph=1;S.pt=0}if(S.ph===1&&S.pt>.55){S.pt=0;if(S.k<ev)S.k++;else{S.ph=2}}if(S.ph===2&&S.pt>3){this.init(S)}},
draw(S){const{R,a,ev,lim}=calc(S);const k=S.k,ph=S.ph,fr=ph===1?ease(S.pt/.55):1;const[bl,br]=split(S,.6,{g:30});
 const cur=[a[0]-k*R.r[0][2],a[1]-k*R.r[1][2],...R.p.map(p=>k*p[2])];const sps=[R.r[0][0],R.r[1][0],...R.p.map(p=>p[0])];
 T(R.n,bl.l+bl.w/2,bl.t+8,{a:'center',f:'d',s:22,c:C.fg});const rowsN=sps.length,rh=(bl.h-50)/rowsN;const s=Math.min(rh*.28,bl.w/30);
 sps.forEach((sp,i)=>{const y=bl.t+44+rh*i+rh/2;T((i<2?R.r[i][1]:R.p[i-2][1]),bl.l,y,{f:'d',s:18,c:i<2?C.fg:C.green});const n=cur[i];const tot=i<2?a[i]:ev*R.p[i-2][2];for(let j=0;j<Math.max(n,i<2?a[i]:0);j++){const x=bl.l+60+j*s*3.2;if(x>bl.l+bl.w-s)break;let al=1;if(i<2&&j>=n){const consumedNow=ph===1&&j>=n&&j<n+R.r[i][2]&&S.k>0;al=consumedNow?1-fr:0.08}if(i>=2&&ph===1&&j>=n-R.p[i-2][2]&&S.k>0)al=fr;mol(x,y,sp,s,al)}});
 if(ph===2)T(lim<0?'Ingen reaktant i overskudd!':`Begrensende reaktant: ${R.r[lim][1]}`,bl.l+bl.w/2,bl.t+bl.h-6,{a:'center',s:15,c:C.yellow});
 const mx=Math.max(12,...a,...R.p.map(p=>ev*p[2]));const items=sps.map((sp,i)=>({v:cur[i],c:i<2?(i?C.red:C.blue):C.green,l:i<2?R.r[i][1]:R.p[i-2][1],t:cur[i]+' mol'}));bars({l:br.l,t:br.t+30,w:br.w,h:br.h*.5},items,{max:mx,g:10});lab({l:br.l,t:br.t+30},'Stoffmengde nå');
 const mB=a[0]*R.r[0][3]+a[1]*R.r[1][3],mA=cur.reduce((s,n,i)=>s+n*(i<2?R.r[i][3]:R.p[i-2][3]),0);infoBox(br.l,br.t+br.h*.5+60,[[`masse før:  ${nf(mB,1)} g`,C.fg2],[`masse nå:   ${nf(mA,1)} g`,C.fg2],['massen er bevart',C.green]],{s:12.5})},
readout(S){const{R,a,ev,lim}=calc(S);const r=[['begrensende',lim<0?'ingen':R.r[lim][1],'yellow']];if(lim>=0){const o=1-lim;r.push(['overskudd',`${a[o]-ev*R.r[o][2]} mol ${R.r[o][1]}`])}R.p.forEach(p=>r.push([p[1],`${ev*p[2]} mol = ${nf(ev*p[2]*p[3],1)} g`,'green']));return r}
});
}

/* ---------- Syrer, baser og pH ---------- */
{
const KW=1e-14;const SP={HCl:{n:'Saltsyre, HCl',K:1e7,acid:true,strong:true},HAc:{n:'Eddiksyre, CH₃COOH',K:1.8e-5,acid:true},NH3:{n:'Ammoniakk, NH₃',K:1.8e-5,acid:false},NaOH:{n:'Natriumhydroksid, NaOH',K:1e7,acid:false,strong:true}};
function pH(sp,c){const s=SP[sp];const f=lh=>{const h=Math.pow(10,lh);if(s.acid)return h-KW/h-c*s.K/(s.K+h);const oh=KW/h;return h+c*s.K/(s.K+oh)-oh};return-bisect(f,-15,1)}
const UI=['#d6202f','#e8492c','#f2762e','#f5a53a','#f5d33f','#b6cf3d','#5dbb46','#3aa98a','#2a9d8f','#2a7fb0','#2f5fb3','#3e45a6','#4b3696','#57308c','#5a2d82'];
const uicol=(ph,a=1)=>ramp(UI,ph/14,a);
const EX=[[1.5,'magesyre'],[2.4,'sitronsaft'],[2.9,'eddik'],[5,'kaffe'],[5.6,'regnvann'],[7,'rent vann'],[7.4,'blod'],[8.1,'sjøvann'],[10,'såpe'],[11.6,'salmiakk'],[13.5,'avløpsåpner']];
M({id:'ki-ph',s:'ki',c:['KJ1','NAT'],title:'Syrer, baser og pH',short:'Syrer, baser og pH',kw:'syre base ph protolyse sterk syre svak syre oksonium hydroksid konsentrasjon indikator protolysegrad',
lead:'En syre gir fra seg H⁺ til vann, og det dannes oksoniumioner H₃O⁺. En sterk syre protolyseres fullstendig, en svak syre bare litt. pH er et mål på konsentrasjonen av H₃O⁺.',
controls:[{id:'sp',type:'seg',label:'Stoff',value:'HAc',options:Object.entries(SP).map(([k,v])=>[k,v.n])},{id:'c',label:'Konsentrasjon <i>c</i>',min:1e-6,max:1,log:true,value:.1,fmt:v=>nfs(v,2)+' mol/L'}],
tex:['\\text{pH}=-\\lg[\\text{H}_3\\text{O}^+]','[\\text{H}_3\\text{O}^+]\\cdot[\\text{OH}^-]=1{,}0\\cdot10^{-14}','K_a=\\frac{[\\text{H}_3\\text{O}^+][\\text{A}^-]}{[\\text{HA}]}'],
about:['I det forstørrede glasset ser du stoffet i løsningen. For en <strong>sterk syre</strong> er alle molekylene protolysert. For en <strong>svak syre</strong> er bare noen få det, og de fleste er intakte (lilla).','Fargen på løsningen er universalindikator. Skalaen til høyre viser vanlige stoffer fra hverdagen.','pH-skalaen er logaritmisk. Én enhet lavere pH betyr ti ganger høyere konsentrasjon av H₃O⁺.','Fortynner du en svak syre, øker protolysegraden. Prøv det med glidebryteren.'],
tasks:['Hva er pH i 0,010 mol/L HCl? Sjekk.','Hvorfor har 0,1 mol/L eddiksyre høyere pH enn 0,1 mol/L saltsyre?','Fortynn saltsyre til 10⁻⁶ mol/L og videre. Hvorfor går ikke pH over 7?','Hvor stor er protolysegraden til eddiksyre ved 0,1 mol/L og ved 0,001 mol/L?'],
draw(S){const s=SP[S.p.sp],c=S.p.c,ph=pH(S.p.sp,c),h=Math.pow(10,-ph),oh=KW/h;const al=s.acid?s.K/(s.K+h):s.K/(s.K+oh);const[bl,br]=split(S,.58,{g:30});
 const bw=Math.min(bl.w*.42,bl.h*.55),bh=bw*1.25,bx=bl.l+10,by=bl.t+(bl.h-bh)/2+10;rr(bx,by+bh*.2,bw,bh*.8,8,null,uicol(ph,.55));poly([[bx,by],[bx,by+bh-8],[bx+bw,by+bh-8],[bx+bw,by]],A(C.fg,.6),null,2,false);
 const zr=Math.min(bl.w-bw-40,bl.h)*.48,zx=bx+bw+20+zr,zy=bl.t+bl.h/2;ln(bx+bw*.75,by+bh*.55,zx-zr*.7,zy+zr*.7,A(C.fg,.3),1.2,[4,4]);circ(zx,zy,zr,A(C.fg,.6),A(C.stage,.95),2);
 const N=30,nd=Math.round(N*al),r=rng(17);X.save();X.beginPath();X.arc(zx,zy,zr-3,0,TAU);X.clip();
 for(let i=0;i<N;i++){const a=r()*TAU,rd=Math.sqrt(r())*(zr-16),x=zx+Math.cos(a)*rd+Math.sin(S.t*.8+i)*4,y=zy+Math.sin(a)*rd+Math.cos(S.t*.7+i*1.3)*4;
  if(i<nd){if(s.acid){dot(x-7,y,6,C.red);T('+',x-7,y,{a:'center',f:'n',s:10,c:C.stage});dot(x+8,y+5,6,C.blue);T('−',x+8,y+5,{a:'center',f:'n',s:10,c:C.stage})}else{dot(x-7,y,6,C.pink);T('+',x-7,y,{a:'center',f:'n',s:10,c:C.stage});dot(x+8,y+5,6,C.blue);T('−',x+8,y+5,{a:'center',f:'n',s:10,c:C.stage})}}
  else{if(s.acid){dot(x-4,y,7,C.purple);dot(x+5,y-3,4,C.fg)}else{dot(x,y,7,C.green);dot(x+6,y-5,3.5,C.fg);dot(x-6,y-5,3.5,C.fg)}}}X.restore();
 const ly=zy+zr+18;const lg=s.acid?[[C.red,'H₃O⁺'],[C.blue,'A⁻'],[C.purple,'HA (intakt)']]:[[C.pink,'BH⁺'],[C.blue,'OH⁻'],[C.green,'B (intakt)']];lg.forEach(([c,t],i)=>{dot(zx-zr+i*zr*.75+6,ly,5,c);T(t,zx-zr+i*zr*.75+14,ly,{s:12,c:C.fg2})});
 const sx=br.l+br.w*.45,sy=br.t+10,sh=br.h-20,sw=22;for(let i=0;i<=140;i++){const p=i/10;rct(sx,sy+sh*(1-p/14)-sh/140,sw,sh/140+1,null,uicol(p))}
 for(let p=0;p<=14;p+=1)T(String(p),sx-6,sy+sh*(1-p/14),{a:'right',f:'n',s:10.5,c:C.fg3});EX.forEach(([p,t])=>{const y=sy+sh*(1-p/14);ln(sx+sw,y,sx+sw+8,y,A(C.fg,.4),1);T(t,sx+sw+12,y,{s:11.5,c:C.fg3})});
 const my=sy+sh*(1-ph/14);poly([[sx-2,my],[sx-14,my-7],[sx-14,my+7]],null,C.fg);T('pH = '+nf(ph,2),sx-18,my,{a:'right',f:'n',s:14,c:C.fg,bg:A(C.stage,.8)})},
readout(S){const s=SP[S.p.sp],ph=pH(S.p.sp,S.p.c),h=Math.pow(10,-ph),oh=KW/h,al=s.acid?s.K/(s.K+h):s.K/(s.K+oh);return[['pH',nf(ph,2)],['[H₃O⁺]',sci(h,2)+' mol/L','red'],['[OH⁻]',sci(oh,2)+' mol/L','blue'],['protolysegrad',nf(100*al,al>.995?1:2)+' %']]}
});
}
