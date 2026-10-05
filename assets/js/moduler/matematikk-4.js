'use strict';
/* ================= MATEMATIKK (del 4) ================= */

/* ---------- Pytagoras' setning ---------- */
{
const sq=(P,o,e1,e2,s,col,grid)=>{const p=(u,v)=>P.pt(o[0]+e1[0]*u+e2[0]*v,o[1]+e1[1]*u+e2[1]*v);poly([p(0,0),p(s,0),p(s,s),p(0,s)],A(col,.9),A(col,.16),2);
 if(grid){X.save();X.beginPath();const q=[p(0,0),p(s,0),p(s,s),p(0,s)];X.moveTo(...q[0]);q.slice(1).forEach(z=>X.lineTo(...z));X.closePath();X.clip();for(let k=1;k<s;k++){ln(...p(k,0),...p(k,s),A(col,.35),1);ln(...p(0,k),...p(s,k),A(col,.35),1)}X.restore()}};
const tri=(c,r,a,b)=>{const R=v=>{let[x,y]=v;for(let i=0;i<r;i++)[x,y]=[-y,x];return[x,y]};const u=R([b,0]),w=R([0,a]);return[c,[c[0]+u[0],c[1]+u[1]],[c[0]+w[0],c[1]+w[1]]]};
M({id:'ma-pytagoras',s:'ma',c:['1P','1T'],title:'Pytagoras’ setning',short:'Pytagoras',kw:'pytagoras pythagoras rettvinklet trekant hypotenus katet kvadrat areal bevis avstand pytagoreiske tripler',
lead:'I en rettvinklet trekant er kvadratet på hypotenusen like stort som kvadratene på de to katetene til sammen. Dra hjørnene og se at det alltid stemmer, og se et bevis som bare bruker omflytting av fire trekanter.',
hint:'Dra de gule punktene for å endre katetene.',
controls:[{id:'mode',type:'seg',label:'Vis',value:'kv',options:[['kv','Kvadrater på sidene'],['bevis','Bevis ved omflytting']]},
 {id:'a',label:'Katet a',min:1,max:12,step:.1,value:3,d:1},{id:'b',label:'Katet b',min:1,max:12,step:.1,value:4,d:1},
 {id:'grid',type:'check',label:'Vis ruter på 1 × 1',value:true,show:S=>S.p.mode==='kv'},
 {type:'btns',items:[['3, 4, 5',S=>{setP('a',3,S);setP('b',4,S)}],['6, 8, 10',S=>{setP('a',6,S);setP('b',8,S)}],['5, 12, 13',S=>{setP('a',5,S);setP('b',12,S)}]],show:S=>S.p.mode==='kv'}],
tex:['\\cY{a}^2+\\cB{b}^2=\\cR{c}^2','c=\\sqrt{a^2+b^2}','(a+b)^2=4\\cdot\\tfrac12ab+c^2=4\\cdot\\tfrac12ab+a^2+b^2'],
about:['<strong>Katetene</strong> er de to sidene som danner den rette vinkelen. <strong>Hypotenusen</strong> er den lengste siden, rett overfor den rette vinkelen.','Setningen handler om arealer: Det røde kvadratet har like stort areal som det gule og det blå til sammen. Med rutenettet kan du telle det når sidene er hele tall.','Beviset: Begge de store kvadratene har side $a+b$ og inneholder fire like trekanter. Det som er igjen, er $c^2$ i den ene stillingen og $a^2+b^2$ i den andre. Da må $c^2=a^2+b^2$.','Tre hele tall som passer i setningen, som 3, 4 og 5, kalles <strong>pytagoreiske tripler</strong>. Håndverkere bruker 3–4–5 for å sjekke at et hjørne er rett.'],
tasks:['Sett a = 3 og b = 4. Tell rutene i alle tre kvadratene. Stemmer setningen?','En stige på 5 m står 1,5 m ut fra veggen. Hvor høyt opp på veggen når den?','Finn hypotenusen når katetene er 1 og 1. Hvorfor blir svaret ikke et helt tall?','Forklar beviset med omflytting med dine egne ord.'],
init(S){S.ext=null;S.drag=false},
draw(S){const a=S.v.a,b=S.v.b,c=Math.hypot(a,b);
 if(S.p.mode==='bevis')return this.bevis(S,a,b,c);
 const[bl,br]=split(S,.64,{g:24});const tg=[-a-.8,b+a+.8,-b-.8,a+b+.8];if(!S.ext||!S.drag)S.ext=S.ext?S.ext.map((v,i)=>lerp(v,tg[i],.2)):tg;
 const P=Plane(...S.ext,bl,true);S.P=P;
 sq(P,[0,0],[1,0],[0,-1],b,C.blue,S.p.grid);sq(P,[0,0],[-1,0],[0,1],a,C.yellow,S.p.grid);sq(P,[b,0],[-b/c,a/c],[a/c,b/c],c,C.red,S.p.grid);
 poly([P.pt(0,0),P.pt(b,0),P.pt(0,a)],C.fg,A(C.fg,.1),2.4);const s=12;poly([[P.X(0)+s,P.Y(0)],[P.X(0)+s,P.Y(0)-s],[P.X(0),P.Y(0)-s]],A(C.fg,.8),null,1.5,false);
 T('a² = '+nf(a*a,2),P.X(-a/2),P.Y(a/2),{a:'center',f:'n',s:14,c:C.yellow,bg:A(C.stage,.6)});T('b² = '+nf(b*b,2),P.X(b/2),P.Y(-b/2),{a:'center',f:'n',s:14,c:C.blue,bg:A(C.stage,.6)});
 T('c² = '+nf(c*c,2),P.X(b/2+a/2),P.Y(a/2+b/2),{a:'center',f:'n',s:14,c:C.red,bg:A(C.stage,.6)});
 Tm('a',P.X(0)+12,P.Y(a/2),{s:18,c:C.yellow});Tm('b',P.X(b/2),P.Y(0)+14,{a:'center',s:18,c:C.blue});Tm('c',P.X(b/2-a/c*.55),P.Y(a/2-b/c*.55),{a:'center',s:18,c:C.red});
 handle(P.X(0),P.Y(a),C.yellow,S);handle(P.X(b),P.Y(0),C.yellow,S);
 let y=br.t+10;const L=(s_,col,sz=15)=>{T(s_,br.l,y,{f:'n',s:sz,c:col});y+=sz+12};
 if(!isWide(S)){L(`a² + b² = ${nf(a*a,2)} + ${nf(b*b,2)} = ${nf(a*a+b*b,2)}`,C.fg2,12.5);L(`c = √${nf(a*a+b*b,2)} = ${nf(c,3)}`,C.red,14);return}
 L('a² + b² = c²',C.fg,17);y+=4;L(`${nf(a,1)}² + ${nf(b,1)}²`,C.fg2);L(`= ${nf(a*a,2)} + ${nf(b*b,2)}`,C.fg2);L(`= ${nf(a*a+b*b,2)}`,C.fg);y+=8;
 L(`c = √${nf(a*a+b*b,2)}`,C.fg2);L(`  = ${nf(c,3)}`,C.red,17);
 if(Math.abs(c-Math.round(c))<1e-6&&Math.abs(a-Math.round(a))<1e-6&&Math.abs(b-Math.round(b))<1e-6){y+=10;Twrap('Alle sidene er hele tall: et pytagoreisk trippel!',br.l,y,br.w,{s:13,c:C.green})}},
bevis(S,a,b,c){const s=a+b;const[bl,br]=split(S,.55,{g:28});const P=Plane(-.4,s+.4,-.4,s+.4,bl,true);S.P=null;
 const cyc=S.t%8,u=cyc<2?0:cyc<4?ease((cyc-2)/2):cyc<6?1:1-ease((cyc-6)/2);
 const c1=[[0,0],[s,0],[s,s],[0,s]],c2=[[a,0],[a,a],[s,a],[0,s]];
 poly([P.pt(0,0),P.pt(s,0),P.pt(s,s),P.pt(0,s)],C.fg2,A(C.fg,.04),2);
 const k1=clamp(1-u*4,0,1),k2=clamp(u*4-3,0,1);
 if(k1>0){poly([P.pt(b,0),P.pt(s,b),P.pt(a,s),P.pt(0,a)],A(C.red,k1),A(C.red,.25*k1),2);T('c²',P.X(s/2),P.Y(s/2),{a:'center',f:'m',s:24,c:A(C.red,k1)})}
 if(k2>0){poly([P.pt(0,0),P.pt(a,0),P.pt(a,a),P.pt(0,a)],A(C.yellow,k2),A(C.yellow,.25*k2),2);poly([P.pt(a,a),P.pt(s,a),P.pt(s,s),P.pt(a,s)],A(C.blue,k2),A(C.blue,.25*k2),2);T('a²',P.X(a/2),P.Y(a/2),{a:'center',f:'m',s:22,c:A(C.yellow,k2)});T('b²',P.X(a+b/2),P.Y(a+b/2),{a:'center',f:'m',s:22,c:A(C.blue,k2)})}
 for(let r=0;r<4;r++){const p=[lerp(c1[r][0],c2[r][0],u),lerp(c1[r][1],c2[r][1],u)];poly(tri(p,r,a,b).map(q=>P.pt(...q)),C.teal,A(C.teal,.55),2)}
 Tm('a',P.X(a/2),P.Y(0)+15,{a:'center',s:16,c:C.fg2});Tm('b',P.X(a+b/2),P.Y(0)+15,{a:'center',s:16,c:C.fg2});
 let y=br.t+14;const L=(s_,col,sz=15)=>{T(s_,br.l,y,{f:'n',s:sz,c:col});y+=sz+12};
 if(!isWide(S)){L('(a + b)² = 4 · ½ab + c²',A(C.fg,.35+.65*(1-u)),12.5);L('(a + b)² = 4 · ½ab + a² + b²',A(C.fg,.35+.65*u),12.5);L('c² = a² + b²',C.green,15);return}
 T('Det store kvadratet har side a + b.',br.l,y,{s:13.5,c:C.fg2});y+=24;
 L('(a + b)² = 4 · ½ab + c²',A(C.fg,.35+.65*(1-u)),15);L('(a + b)² = 4 · ½ab + a² + b²',A(C.fg,.35+.65*u),15);y+=8;
 T('De fire trekantene dekker like mye i begge stillingene.',br.l,y,{s:13,c:C.fg2});y+=20;T('Derfor må resten også være like stort:',br.l,y,{s:13,c:C.fg2});y+=30;
 T('c² = a² + b²',br.l,y,{f:'n',s:20,w:700,c:C.green});y+=34;
 T(`Her: ${nf(c*c,2)} = ${nf(a*a,2)} + ${nf(b*b,2)}`,br.l,y,{f:'n',s:13,c:C.fg3})},
pick(S,x,y){const P=S.P;if(!P||S.p.mode!=='kv')return;const a=S.p.a,b=S.p.b;
 const set=(k,v)=>{const q=clamp(Math.round(v*10)/10,1,12);setP(k,q,S);S.v[k]=q};
 if(near(x,y,P.X(0),P.Y(a),24)){S.drag=true;return{move:(mx,my)=>set('a',P.iy(my)),up:()=>{S.drag=false}}}
 if(near(x,y,P.X(b),P.Y(0),24)){S.drag=true;return{move:(mx,my)=>set('b',P.ix(mx)),up:()=>{S.drag=false}}}},
readout(S){const a=S.p.a,b=S.p.b,c=Math.hypot(a,b);return[['a',nf(a,1),'yellow'],['b',nf(b,1),'blue'],['c',nf(c,3),'red'],['a² + b²',nf(a*a+b*b,2)]]},
live(S){const a=S.p.a,b=S.p.b;return `\\cY{${tn(a,1)}}^2+\\cB{${tn(b,1)}}^2=${tn(a*a+b*b,2)}=\\cR{${tn(Math.hypot(a,b),3)}}^2`}
});
}

/* ---------- Målestokk og formlikhet ---------- */
{
const SC=[[10000,'1 : 10 000'],[25000,'1 : 25 000'],[50000,'1 : 50 000'],[100000,'1 : 100 000'],[250000,'1 : 250 000']];
const MW=16;
const lake=(()=>{const pts=[];for(let i=0;i<64;i++){const a=i/64*TAU;const r=1.55+.35*Math.sin(3*a+.7)+.22*Math.sin(5*a+2.1)+.12*Math.cos(7*a);pts.push([9.6+Math.cos(a)*r*1.25,5.4+Math.sin(a)*r*.85])}return pts})();
const area=p=>{let s=0;for(let i=0;i<p.length;i++){const[x1,y1]=p[i],[x2,y2]=p[(i+1)%p.length];s+=x1*y2-x2*y1}return Math.abs(s)/2};
const PL=[['Hytta',2.2,2.4],['Butikken',13.6,8.4],['Utsikten',4.2,8.2],['Badeplassen',8.1,3.6],['Brua',13.9,3.2]];
const realStr=cm=>{const m=cm/100;return m>=1000?nf(m/1000,2)+' km':nf(m,0)+' m'};
M({id:'ma-malestokk',s:'ma',c:['1P'],title:'Målestokk og formlikhet',short:'Målestokk',kw:'målestokk kart forstørring formlik formlikhet lengde areal volum skala kartlesing avstand',
lead:'På et kart er alle lengder forminsket med samme faktor. Mål avstander på kartet og regn om til virkeligheten. Når en figur forstørres, vokser arealet med kvadratet av faktoren og volumet med kuben.',
hint:'Dra de gule punktene for å måle på kartet.',
controls:[{id:'mode',type:'seg',label:'Vis',value:'kart',options:[['kart','Kart og målestokk'],['form','Forstørring: lengde, areal og volum']]},
 {id:'N',type:'sel',label:'Målestokk',value:50000,options:SC,show:S=>S.p.mode==='kart'},
 {id:'k',label:'Forstørringsfaktor k',min:.5,max:4,step:.5,value:2,d:1,show:S=>S.p.mode==='form'}],
tex:['\\text{virkelig lengde}=\\text{lengde på kartet}\\cdot N','\\text{areal}\\cdot k^2,\\qquad\\text{volum}\\cdot k^3'],
about:['Målestokken 1 : 50 000 betyr at 1 cm på kartet er 50 000 cm i virkeligheten. Det er 500 m. Regn alltid om til samme enhet først, og gjør om til meter eller kilometer til slutt.','Kartet her er tenkt å være 16 cm bredt når det skrives ut. Avstandene du måler, er i centimeter på papiret.','Når alle lengder ganges med $k$, blir figurene <strong>formlike</strong>. Et areal består av lengde ganger lengde, så det ganges med $k^2$. Et volum ganges med $k^3$.','Derfor blir innsjøens areal i virkeligheten kartarealet ganget med $N^2$, ikke med $N$.'],
tasks:['Mål avstanden fra hytta til butikken i luftlinje. Hvor langt er det i virkeligheten med 1 : 50 000?','Hvor mange meter er 1 cm på et kart i målestokk 1 : 25 000?','En modell er laget i målestokk 1 : 20. Modellen er 15 cm høy. Hvor høy er originalen?','Du dobler alle sidene i en eske. Hvor mye mer kan den romme?'],
init(S){S.A=[2.2,2.4];S.B=[13.6,8.4]},
draw(S){if(S.p.mode==='form')return this.form(S);const N=+S.p.N,nw=!isWide(S);const b=pad(S,24,24,24);const[bl,br]=nw?rows(b,[1.25,1],16):cols(b,[1.75,1],24);const P=Plane(0,MW,0,MW*.62,bl,true);S.P=P;
 rr(P.X(0),P.Y(MW*.62),MW*P.sx,MW*.62*P.sx,4,A(C.fg,.25),mix(C.green,C.stage,.86),1);
 X.save();X.beginPath();X.rect(P.X(0),P.Y(MW*.62),MW*P.sx,MW*.62*P.sx);X.clip();
 for(let k=1;k<6;k++){const pts=[];for(let i=0;i<=60;i++){const x=i/60*MW;pts.push(P.pt(x,8.6+k*.5+Math.sin(x*.6+k)*.5-Math.max(0,4-x)*.3))}pth(pts,A(C.gold,.3),1)}
 poly(lake.map(q=>P.pt(...q)),A(C.blue,.7),A(C.blue,.35),1.5);
 const road=[[0,1.6],[2.2,2.4],[5,2.2],[8.1,3.6],[11,2.6],[13.9,3.2],[16,3]];pth(road.map(q=>P.pt(...q)),A(C.fg,.55),2.4);pth([[13.9,3.2],[14.2,5.5],[13.6,8.4],[11.5,9.6]].map(q=>P.pt(...q)),A(C.fg,.45),2);pth([[2.2,2.4],[3.5,5],[4.2,8.2]].map(q=>P.pt(...q)),A(C.fg,.3),1.6,1,[4,4]);
 const rg=rng(4);for(let i=0;i<70;i++){const x=rg()*MW,y=rg()*9.6;if(Math.hypot((x-9.6)/1.25,(y-5.4)/.85)<2.3)continue;if(y<6.2&&x<1.8)continue;dot(P.X(x),P.Y(y),2.4,A(C.green,.45))}
 X.restore();
 PL.forEach(([n,x,y])=>{dot(P.X(x),P.Y(y),4,C.fg);T(n,P.X(x)+7,P.Y(y)-9,{s:11.5,c:C.fg,bg:A(C.stage,.45)})});
 const d=Math.hypot(S.B[0]-S.A[0],S.B[1]-S.A[1]);ln(...P.pt(...S.A),...P.pt(...S.B),C.yellow,2.6,[8,5]);handle(...P.pt(...S.A),C.yellow,S);handle(...P.pt(...S.B),C.yellow,S);
 T(nf(d,1)+' cm',P.X((S.A[0]+S.B[0])/2),P.Y((S.A[1]+S.B[1])/2)-14,{a:'center',f:'n',s:13,c:C.yellow,bg:A(C.stage,.75)});
 const cands=[50,100,200,250,500,1000,2000,2500,5000,10000,20000,25000,50000];const tgt=N*4/100;let L=cands[0];cands.forEach(v=>{if(v<=tgt)L=v});const Lcm=L*100/N;const unit=L>=1000?[1000,'km']:[1,'m'];
 const sx=P.X(.6),sy=P.Y(.6);rct(sx,sy-5,Lcm*P.sx/2,5,null,C.fg);rct(sx+Lcm*P.sx/2,sy-5,Lcm*P.sx/2,5,C.fg,null,1);T('0',sx,sy-14,{a:'center',f:'n',s:10.5,c:C.fg});T(nf(L/unit[0],L%unit[0]?1:0)+' '+unit[1],sx+Lcm*P.sx,sy-14,{a:'center',f:'n',s:10.5,c:C.fg});
 const la=area(lake),fs=nw?.8:1;const put=(lines,x,y,w)=>{lines.forEach(([s_,c,sz,f])=>{y+=Twrap(s_,x,y,w,{s:sz*fs,c,f:f||'u'})+7*fs});return y};
 let y=put([['Målestokk '+SC.find(q=>q[0]===N)[1],C.fg,16],[`1 cm på kartet = ${nf(N,0)} cm = ${realStr(N)}`,C.fg2,13.5]],br.l,br.t+10,br.w)+6;
 const bA=[['Avstand',C.fg3,11],[`På kartet: ${nf(d,1)} cm`,C.yellow,14,'n'],[`${nf(d,1)} · ${nf(N,0)} cm`,C.fg2,13,'n'],[`= ${nf(d*N,0)} cm = ${realStr(d*N)}`,C.fg,14,'n']];
 const bB=[['Innsjøen',C.fg3,11],[`På kartet: ${nf(la,1)} cm²`,C.blue,14,'n'],[`${nf(la,1)} · ${nf(N,0)}² cm²`,C.fg2,13,'n'],[`= ${nf(la*N*N/1e10,2)} km²`,C.fg,14,'n'],['Arealet ganges med N², ikke med N.',C.fg3,12]];
 if(nw){const hw=(br.w-14)/2;put(bA,br.l,y,hw);put(bB,br.l+hw+14,y,hw)}else{y=put(bA,br.l,y,br.w)+6;put(bB,br.l,y,br.w)}},
form(S){const k=S.v.k;const b=pad(S,26,40,30);const[c1,c2,c3]=cols(b,[.6,1,1.6],26);const top=b.t;
 lab(c1,'Lengde');lab(c2,'Areal');lab(c3,'Volum');
 const u=Math.min((b.h-70)/8,c2.w/5.8,c3.w/9.6,c1.h/4.6);
 const base=b.t+b.h-24;
 [[1,C.fg3],[k,C.yellow]].forEach(([L,col],i)=>{const x=c1.l+18+i*Math.min(60,c1.w/2);ln(x,base,x,base-L*u,col,4);for(let j=1;j<L;j++)ln(x-5,base-j*u,x+5,base-j*u,col,1.5);T(i?'k':'1',x,base+14,{a:'center',f:'m',s:15,c:col})});
 const sqd=(x,y,s,col)=>{rct(x,y-s*u,s*u,s*u,col,A(col,.16),2);X.save();X.beginPath();X.rect(x,y-s*u,s*u,s*u);X.clip();for(let j=1;j<s;j++){ln(x+j*u,y,x+j*u,y-s*u,A(col,.5),1);ln(x,y-j*u,x+s*u,y-j*u,A(col,.5),1)}X.restore()};
 sqd(c2.l+6,base,1,C.fg3);sqd(c2.l+6+1.6*u,base,k,C.blue);
 const cube=(ox,oy,s,col)=>{const c30=Math.cos(PI/6)*u,s30=Math.sin(PI/6)*u;const p=(x,y,z)=>[ox+(x-y)*c30,oy+(x+y)*s30-z*u];
  const face=(q,c,al)=>poly(q,col,A(col,al),1.6);face([p(0,0,s),p(s,0,s),p(s,s,s),p(0,s,s)],col,.3);face([p(s,0,0),p(s,s,0),p(s,s,s),p(s,0,s)],col,.18);face([p(0,s,0),p(s,s,0),p(s,s,s),p(0,s,s)],col,.1);
  for(let j=1;j<s;j++){ln(...p(j,0,s),...p(j,s,s),A(col,.45),1);ln(...p(0,j,s),...p(s,j,s),A(col,.45),1);ln(...p(s,j,0),...p(s,j,s),A(col,.45),1);ln(...p(s,0,j),...p(s,s,j),A(col,.45),1);ln(...p(j,s,0),...p(j,s,s),A(col,.45),1);ln(...p(0,s,j),...p(s,s,j),A(col,.45),1)}};
 cube(c3.l+.87*u,base-u,1,C.fg3);cube(c3.l+u*(1.73+.6+.87*k),base-k*u,k,C.purple);
 const L=(x,txt,col,y)=>T(txt,x,y,{f:'n',s:14,c:col});
 L(c1.l,'× '+nf(k,1),C.yellow,top+10);L(c2.l,`× ${nf(k,1)}² = × ${nf(k*k,2)}`,C.blue,top+10);L(c3.l,`× ${nf(k,1)}³ = × ${nf(k*k*k,3)}`,C.purple,top+10);
 T('lengden ganges med k',c1.l,top+30,{s:11.5,c:C.fg3});T('arealet ganges med k²',c2.l,top+30,{s:11.5,c:C.fg3});T('volumet ganges med k³',c3.l,top+30,{s:11.5,c:C.fg3})},
pick(S,x,y){const P=S.P;if(!P||S.p.mode!=='kart')return;for(const key of['A','B']){const q=S[key];if(near(x,y,...P.pt(...q),22))return{move:(mx,my)=>{S[key]=[clamp(P.ix(mx),.2,MW-.2),clamp(P.iy(my),.2,MW*.62-.2)]}}}},
readout(S){if(S.p.mode==='form'){const k=S.p.k;return[['lengde',`× ${nf(k,1)}`,'yellow'],['areal',`× ${nf(k*k,2)}`,'blue'],['volum',`× ${nf(k**3,3)}`,'purple']]}const N=+S.p.N,d=Math.hypot(S.B[0]-S.A[0],S.B[1]-S.A[1]);return[['på kartet',nf(d,1)+' cm','yellow'],['i virkeligheten',realStr(d*N)],['innsjøens areal',nf(area(lake)*N*N/1e10,2)+' km²','blue']]}
});
}

/* ---------- Lån: annuitet og serie ---------- */
{
const plan=(L,r,n,m,type)=>{const N=Math.round(n*m),i=r/100/m;let rest=L;const A_=i>0?L*i/(1-Math.pow(1+i,-N)):L/N;const yrs=[];for(let y=0;y<n;y++)yrs.push({ren:0,avd:0,rest:0,first:0});const terms=[];
 for(let k=0;k<N;k++){const ren=rest*i,avd=type==='ann'?A_-ren:L/N;rest=Math.max(0,rest-avd);const y=Math.floor(k/m);yrs[y].ren+=ren;yrs[y].avd+=avd;yrs[y].rest=rest;terms.push(ren+avd)}
 return{yrs,terms,tot:terms.reduce((s,v)=>s+v,0)}};
const kr=v=>nf(v,0)+' kr';
M({id:'ma-lan',s:'ma',c:['1P','2P'],title:'Lån: annuitetslån og serielån',short:'Annuitet og serielån',kw:'lån annuitetslån serielån renter avdrag terminbeløp restgjeld boliglån økonomi rentekostnad nedbetaling',
lead:'Når du betaler ned et lån, består hver innbetaling av renter og avdrag. I et annuitetslån er innbetalingen lik hver gang. I et serielån er avdraget likt, så innbetalingene blir mindre etter hvert.',
hint:'Pek på en søyle for å se tallene for det året.',
controls:[{id:'type',type:'seg',label:'Lånetype',value:'ann',options:[['ann','Annuitetslån'],['serie','Serielån']]},
 {id:'L',label:'Lånebeløp',min:100000,max:5000000,step:50000,value:2000000,fmt:v=>nf(v,0)+' kr'},{id:'r',label:'Rente per år',min:.5,max:10,step:.1,value:5,unit:'%',d:1},{id:'n',label:'Nedbetalingstid',min:1,max:30,step:1,value:20,unit:'år'},
 {id:'m',type:'seg',label:'Terminer per år',value:'12',options:[['1','1 (årlig)'],['12','12 (månedlig)']]},{id:'cmp',type:'check',label:'Vis den andre lånetypen som strek',value:true}],
tex:['\\text{terminbeløp}=\\cR{\\text{renter}}+\\cB{\\text{avdrag}}','\\text{renter}=\\text{restgjeld}\\cdot i','\\text{annuitet: }A=L\\cdot\\frac{i}{1-(1+i)^{-N}}','\\text{serie: avdrag}=\\frac{L}{N}'],
about:['$L$ er lånebeløpet, $i$ er renten per termin og $N$ er antall terminer. Med 5 % rente per år og månedlige terminer er $i = 0{,}05/12$.','Rentene regnes alltid av det du skylder akkurat da, <strong>restgjelden</strong>. I begynnelsen er restgjelden stor, så rentene er store.','I et <strong>annuitetslån</strong> er terminbeløpet likt hele tiden. Først går nesten alt til renter, og avdragene vokser etter hvert. I et <strong>serielån</strong> er avdragene like, og terminbeløpet synker.','Serielånet gir lavere renter totalt fordi gjelden går raskere ned i starten. Til gjengjeld er det tyngre å betjene de første årene.'],
tasks:['Hvor mye betaler du i renter totalt for et annuitetslån på 2 millioner over 20 år med 5 % rente? Sammenlign med serielån.','Hvor mye sparer du i renter ved å betale ned over 15 år i stedet for 25 år?','Hvorfor er det mest renter i begynnelsen av et annuitetslån?','Hva skjer med det månedlige beløpet om renten går fra 3 % til 6 %?'],
init(S){S.hy=null},
draw(S){const p=S.p,m=+p.m,n=Math.round(p.n);const pl=plan(p.L,p.r,n,m,p.type),ot=plan(p.L,p.r,n,m,p.type==='ann'?'serie':'ann');
 const b=pad(S,30,34,40);const[g1,g2]=rows({l:b.l+44,t:b.t,w:b.w-44,h:b.h},[1.7,1],48);
 const ymax=Math.max(...pl.yrs.map(y=>y.ren+y.avd),...(p.cmp?ot.yrs.map(y=>y.ren+y.avd):[0]))*1.12;const P=Plane(.4,n+.6,0,ymax,g1);S.P=P;const st=niceStep(ymax/5);
 P.grid(1,{sy:st,minor:false,alpha:.07});P.axes({xs:n>15?5:n>8?2:1,ys:st,xAt:.4,yf:v=>nf(v/1000,0),x0:true});lab(g1,'Innbetalt per år (1000 kr)  ·  rødt = renter, blått = avdrag');
 const bw=P.sx*.72;pl.yrs.forEach((y,k)=>{const x=P.X(k+1)-bw/2,h1=(P.Y(0)-P.Y(y.avd))*INTRO,h2=(P.Y(0)-P.Y(y.ren))*INTRO;const hi=S.hy===k;rct(x,P.Y(0)-h1,bw,h1,null,A(C.blue,hi?.95:.7));rct(x,P.Y(0)-h1-h2,bw,h2,null,A(C.red,hi?.95:.7))});
 if(p.cmp){const pts=[];ot.yrs.forEach((y,k)=>{pts.push(P.pt(k+.6,y.ren+y.avd));pts.push(P.pt(k+1.4,y.ren+y.avd))});pth(pts,A(C.fg,.65),1.6,1,[5,4]);T(p.type==='ann'?'serielån':'annuitetslån',P.X(n+.5),P.Y(ot.yrs[n-1].ren+ot.yrs[n-1].avd)-10,{a:'right',s:11,c:C.fg2})}
 const Q=Plane(.4,n+.6,0,p.L*1.05,g2);const st2=niceStep(p.L/3);Q.grid(1,{sy:st2,minor:false,alpha:.07});Q.axes({xs:n>15?5:n>8?2:1,ys:st2,xAt:.4,yf:v=>nf(v/1000,0),xl:'år',ls:13,x0:true});lab(g2,'Restgjeld ved slutten av året (1000 kr)');
 const rp=[Q.pt(.5,p.L),...pl.yrs.map((y,k)=>Q.pt(k+1,y.rest))];pth(rp,C.yellow,2.6,INTRO);if(p.cmp)pth([Q.pt(.5,p.L),...ot.yrs.map((y,k)=>Q.pt(k+1,y.rest))],A(C.fg,.5),1.4,1,[5,4]);
 const k=S.hy;if(k!==null&&k<n){const y=pl.yrs[k];const x=P.X(k+1);ln(x,P.t,x,P.Y(0),A(C.fg,.25),1,[3,3]);dot(Q.X(k+1),Q.Y(y.rest),5,C.yellow);
  const lines=[[`År ${k+1}`,C.fg],[`renter   ${kr(y.ren)}`,C.red],[`avdrag   ${kr(y.avd)}`,C.blue],[`sum      ${kr(y.ren+y.avd)}`,C.fg2],[`restgjeld ${kr(y.rest)}`,C.yellow]];const bx=x+bw>P.l+P.w*.6?x-bw/2-250:x+bw/2+10;infoBox(clamp(bx,P.l,P.l+P.w-250),P.t+4,lines,{s:12.5})}},
hover(S,x,y){const P=S.P;if(!P||x<0){S.hy=null;return}const k=Math.round(P.ix(x))-1;S.hy=k>=0&&k<Math.round(S.p.n)&&x>P.l&&x<P.l+P.w?k:null},
pick(S,x,y){const P=S.P;if(!P||y>P.t+P.h+10)return;this.hover(S,x,y);return{move:(mx,my)=>this.hover(S,mx,my)}},
readout(S){const p=S.p,m=+p.m,n=Math.round(p.n);const pl=plan(p.L,p.r,n,m,p.type),ot=plan(p.L,p.r,n,m,p.type==='ann'?'serie':'ann');const ren=pl.tot-p.L;
 return[['første termin',kr(pl.terms[0])],['siste termin',kr(pl.terms[pl.terms.length-1])],['renter totalt',kr(ren),'red'],['totalt betalt',kr(pl.tot)],[p.type==='ann'?'serielån: renter':'annuitet: renter',kr(ot.tot-p.L)]]}
});
}

/* ---------- Algoritmer: halveringsmetoden og Newtons metode ---------- */
{
const F={k:{n:'x³ − 2x − 5',py:'x**3 - 2*x - 5',dpy:'3*x**2 - 2',f:x=>x**3-2*x-5,d:x=>3*x*x-2,a:1,b:3,g:3,v:[-1.5,4,-14,30]},
 c:{n:'cos x − x',py:'cos(x) - x',dpy:'-sin(x) - 1',f:x=>Math.cos(x)-x,d:x=>-Math.sin(x)-1,a:0,b:2,g:2,v:[-1.5,3.5,-3.5,2]},
 e:{n:'eˣ − 3',py:'exp(x) - 3',dpy:'exp(x)',f:x=>Math.exp(x)-3,d:x=>Math.exp(x),a:0,b:2,g:2.5,v:[-1.5,3,-4,12]},
 r:{n:'x² − 2',py:'x**2 - 2',dpy:'2*x',f:x=>x*x-2,d:x=>2*x,a:0,b:2,g:3,v:[-1,3.5,-3,9]}};
const py=v=>String(Math.round(v*100)/100);
const codeLine=(l,x,y,o)=>{const cw=tw('M',o);let i=0;const re=/<=|>=|==|!=|\*\*|->|\/\//g;let m;while((m=re.exec(l))){if(m.index>i)T(l.slice(i,m.index),x+i*cw,y,o);for(let j=0;j<m[0].length;j++)T(m[0][j],x+(m.index+j)*cw,y,o);i=m.index+m[0].length}if(i<l.length)T(l.slice(i),x+i*cw,y,o)};
const root=fn=>{let a=-10,b=10;const f=fn.f;let fa=f(fn.a),A_=fn.a,B_=fn.b;for(let i=0;i<200;i++){const m=(A_+B_)/2;if(f(A_)*f(m)<=0)B_=m;else A_=m}return(A_+B_)/2};
M({id:'ma-algoritme',s:'ma',c:['2P','R1','1T'],title:'Algoritmer: løs likninger med halvering og Newtons metode',short:'Halvering og Newton',kw:'algoritme programmering python løkke while halveringsmetoden newtons metode nullpunkt numerisk tilnærming iterasjon likning',
lead:'Mange likninger kan ikke løses for hånd. Da lar vi datamaskinen gjette smartere og smartere. Halveringsmetoden halverer et intervall der svaret må ligge. Newtons metode følger tangenten ned til x-aksen.',
hint:'Trykk «Ett steg» og se hvordan svaret blir mer og mer nøyaktig. Du kan dra startverdiene.',
controls:[{id:'f',type:'sel',label:'Likning f(x) = 0',value:'k',options:Object.entries(F).map(([k,v])=>[k,'f(x) = '+v.n])},{id:'met',type:'seg',label:'Metode',value:'halv',options:[['halv','Halveringsmetoden'],['newton','Newtons metode']]},
 {id:'tol',label:'Nøyaktighet: antall desimaler',min:1,max:8,step:1,value:4},{id:'zoom',type:'check',label:'Zoom inn mot svaret',value:true},
 {type:'btns',items:[['Ett steg',S=>MOD['ma-algoritme'].step(S)],['Kjør til ferdig',S=>{for(let i=0;i<60&&!S.done;i++)MOD['ma-algoritme'].step(S)}],['Start på nytt',S=>MOD['ma-algoritme'].reset(S)]]},{id:'auto',type:'check',label:'Ett steg i sekundet',value:false}],
tex:['\\text{halvering: }m=\\frac{a+b}{2}','\\text{Newton: }x_{n+1}=x_n-\\frac{f(x_n)}{f\'(x_n)}'],
about:['En <strong>algoritme</strong> er en nøyaktig oppskrift som en datamaskin kan følge. Koden til høyre er skrevet i Python og gjør det samme som animasjonen.','<strong>Halveringsmetoden</strong>: Hvis $f(a)$ og $f(b)$ har ulikt fortegn, må grafen krysse x-aksen mellom $a$ og $b$. Vi ser på midtpunktet $m$ og beholder den halvdelen der fortegnet skifter. Intervallet halveres hver gang, så etter 10 steg er det omtrent 1000 ganger mindre.','<strong>Newtons metode</strong> bruker den deriverte: Tegn tangenten i $x_n$ og se hvor den skjærer x-aksen. Det er neste gjett. Når gjettet er nær svaret, dobles antall riktige desimaler omtrent for hvert steg.','Newtons metode kan gå galt hvis tangenten er nesten vannrett. Prøv startverdien 0 for $x^3-2x-5$.'],
tasks:['Bruk halveringsmetoden på x² − 2 = 0. Hvor mange steg trengs for 4 riktige desimaler? Hvilket tall finner du?','Gjør det samme med Newtons metode. Hvor mange steg trengs nå?','Dra startverdien for Newtons metode til 0 på x³ − 2x − 5. Hva skjer?','Skriv av Python-koden og kjør den selv. Endre den til å løse cos x = x.'],
init(S){const fn=F[S.p.f];S.a0=fn.a;S.b0=fn.b;S.x0=fn.g;S.vw=null;this.reset(S)},
change(S,id){if(id==='f')this.init(S);else if(id==='met'||id==='tol')this.reset(S)},
reset(S){S.it=[];S.done=false;S.msg='';S.a=S.a0;S.b=S.b0;S.x=S.x0;S.acc=0},
step(S){if(S.done)return;const fn=F[S.p.f],tol=Math.pow(10,-S.p.tol)/2;
 if(S.p.met==='halv'){const fa=fn.f(S.a),fb=fn.f(S.b);if(fa*fb>0){S.msg='f(a) og f(b) har samme fortegn. Velg et annet intervall.';S.done=true;return}const m=(S.a+S.b)/2,fm=fn.f(m);S.it.push({a:S.a,b:S.b,m,fm});if(fa*fm<=0)S.b=m;else S.a=m;if(S.b-S.a<tol||fm===0){S.done=true;S.msg='Ferdig: intervallet er smalere enn toleransen.'}}
 else{const fx=fn.f(S.x),dx=fn.d(S.x);if(Math.abs(fx)<tol){S.done=true;S.msg='Ferdig: |f(x)| er mindre enn toleransen.';return}if(Math.abs(dx)<1e-9){S.done=true;S.msg='Tangenten er vannrett. Metoden stopper.';return}const xn=S.x-fx/dx;S.it.push({x:S.x,fx,dx,xn});S.x=xn;if(Math.abs(S.x)>1e6||S.it.length>60){S.done=true;S.msg='Metoden finner ikke et svar herfra.'}else if(Math.abs(fn.f(S.x))<tol){S.done=true;S.msg='Ferdig: |f(x)| er mindre enn toleransen.'}}},
update(S,dt){if(S.p.auto&&!S.done){S.acc+=dt;if(S.acc>=1){S.acc=0;this.step(S)}}},
draw(S){const fn=F[S.p.f],halv=S.p.met==='halv',nw=!isWide(S);const[bl,br]=split(S,.58,{g:nw?34:26,rv:.45,b:pad(S,30,30,40)});
 const est=halv?(S.a+S.b)/2:S.x,wd=halv?Math.max(S.b-S.a,1e-12):Math.max(...S.it.slice(-1).map(q=>Math.abs(q.xn-q.x)),1e-12);
 let tv=fn.v;if(S.p.zoom&&S.it.length){const w=Math.max(wd*4,2e-6);const hw=Math.min(w,(fn.v[1]-fn.v[0])/2);const sl=Math.abs(fn.d(est))||1;tv=[est-hw,est+hw,-hw*sl*1.3,hw*sl*1.3]}
 if(!S.vw)S.vw=tv.slice();else S.vw=S.vw.map((v,i)=>lerp(v,tv[i],.12));
 const P=Plane(...S.vw,{l:bl.l+30,t:bl.t,w:bl.w-30,h:bl.h});S.P=P;const sx=niceStep((S.vw[1]-S.vw[0])/5),sy=niceStep((S.vw[3]-S.vw[2])/5);
 P.grid(sx,{sy,minor:false,alpha:.07});P.axes({xs:sx,ys:sy,xd:Math.max(0,-Math.floor(Math.log10(sx))),yd:Math.max(0,-Math.floor(Math.log10(sy))),x0:true});
 P.clip(()=>{P.fn(fn.f,C.blue,2.8,{prog:1});
  if(halv){rct(P.X(S.a),P.t,P.X(S.b)-P.X(S.a),P.h,null,A(C.yellow,.1));ln(P.X(S.a),P.t,P.X(S.a),P.t+P.h,A(C.yellow,.6),1.4,[4,4]);ln(P.X(S.b),P.t,P.X(S.b),P.t+P.h,A(C.yellow,.6),1.4,[4,4]);
   [[S.a,'a'],[S.b,'b']].forEach(([x,l])=>{const v=fn.f(x);dot(P.X(x),P.Y(v),5,v>0?C.green:C.red);ln(P.X(x),P.Y(0),P.X(x),P.Y(v),A(v>0?C.green:C.red,.6),1.5)});const last=S.it[S.it.length-1];if(last){dot(P.X(last.m),P.Y(0),5,C.fg)}}
  else{S.it.forEach((q,i)=>{const al=i===S.it.length-1?1:.35;ln(P.X(q.x),P.Y(0),P.X(q.x),P.Y(q.fx),A(C.fg,.4*al),1.2,[3,3]);ln(P.X(q.x),P.Y(q.fx),P.X(q.xn),P.Y(0),A(C.yellow,al),2);dot(P.X(q.x),P.Y(q.fx),4,A(C.blue,al))});dot(P.X(S.x),P.Y(0),5,C.yellow)}});
 if(halv){handle(P.X(S.a),P.Y(0),C.yellow,S);handle(P.X(S.b),P.Y(0),C.yellow,S);T('a',P.X(S.a),P.Y(0)+20,{a:'center',f:'m',s:15,c:C.yellow});T('b',P.X(S.b),P.Y(0)+20,{a:'center',f:'m',s:15,c:C.yellow})}else if(!S.it.length)handle(P.X(S.x),P.Y(0),C.yellow,S);
 lab(bl,'f(x) = '+fn.n+(S.p.zoom&&S.it.length?`   (zoom ×${nf((fn.v[1]-fn.v[0])/(S.vw[1]-S.vw[0]),0)})`:''));
 const code=halv?['from math import *','',`def f(x):`,`    return ${fn.py}`,'',`a, b = ${py(S.a0)}, ${py(S.b0)}`,`while b - a > 1e-${S.p.tol}:`,'    m = (a + b) / 2','    if f(a) * f(m) <= 0:','        b = m','    else:','        a = m','print(m)']
  :['from math import *','',`def f(x):`,`    return ${fn.py}`,`def df(x):`,`    return ${fn.dpy}`,'',`x = ${py(S.x0)}`,`while abs(f(x)) > 1e-${S.p.tol}:`,'    x = x - f(x) / df(x)','print(x)'];
const cs=nw?9.5:11.5,lh=nw?11.5:15.5,ch=code.length*lh+14;rr(br.l,br.t,br.w,ch,5,A(C.fg,.12),A(C.fg,.04),1);code.forEach((l,i)=>{const kw_=/^(def|from|while|print)|^\s+(if|else|return)/.test(l);codeLine(l,br.l+10,br.t+14+i*lh,{f:'n',s:cs,c:kw_?C.teal:C.fg2})});lab(br,'Python');
 let y=br.t+ch+26;const cols_=halv?['n','a','b','m','f(m)']:['n','xₙ','f(xₙ)','xₙ₊₁'];const cw=br.w/cols_.length;cols_.forEach((c,i)=>T(c,br.l+i*cw,y,{f:'n',s:11,c:C.fg3}));y+=16;
 const d=Math.max(2,Math.min(6,S.p.tol+1)),rowsN=Math.max(1,Math.floor((br.t+br.h-y-24)/15)),its=S.it.slice(-rowsN);its.forEach((q,j)=>{const n=S.it.length-its.length+j+1;const v=halv?[n,nf(q.a,d),nf(q.b,d),nf(q.m,d),nfs(q.fm,2)]:[n,nf(q.x,d),nfs(q.fx,2),nf(q.xn,d)];v.forEach((s,i)=>T(String(s),br.l+i*cw,y,{f:'n',s:11,c:j===its.length-1?C.fg:C.fg2}));y+=15});
 if(S.msg)Twrap(S.msg,br.l,Math.min(y+8,br.t+br.h-6),br.w,{s:12,c:S.msg.startsWith('Ferdig')?C.green:C.red})},
pick(S,x,y){const P=S.P;if(!P)return;const halv=S.p.met==='halv';const keys=halv?['a0','b0']:['x0'];const cur=halv?[S.a,S.b]:[S.x];
 for(let i=0;i<keys.length;i++){if((halv||!S.it.length)&&near(x,y,P.X(cur[i]),P.Y(0),22)){const k=keys[i];return{move:(mx)=>{S[k]=Math.round(P.ix(mx)*20)/20;this.reset(S)}}}}},
readout(S){const fn=F[S.p.f],r=root(fn),halv=S.p.met==='halv';const est=halv?(S.it.length?S.it[S.it.length-1].m:(S.a+S.b)/2):S.x;return[['steg',S.it.length],['tilnærming',nf(est,Math.min(9,S.p.tol+2)),'yellow'],['f(x)',nfs(fn.f(est),3)],['avstand til svaret',isFinite(est)?sci(Math.abs(est-r),2):'–']]}
});
}

/* ---------- Differensiallikninger: retningsdiagram og Eulers metode ---------- */
{
const EQ={eks:{n:'y′ = k·y',f:(x,y,k,M)=>k*y,v:[-3,5,-1,8],sol:'y=C\\,e^{kx}'},
 avk:{n:'y′ = k·(M − y)',f:(x,y,k,M)=>k*(M-y),v:[0,10,0,100],sol:'y=M+(y_0-M)\\,e^{-k(x-x_0)}'},
 log:{n:'y′ = k·y·(1 − y/M)',f:(x,y,k,M)=>k*y*(1-y/M),v:[0,12,0,12],sol:'y=\\dfrac{M}{1+C\\,e^{-kx}}'},
 xy:{n:'y′ = x − y',f:(x,y)=>x-y,v:[-3,5,-3,5],sol:'y=x-1+C\\,e^{-x}'}};
const COL=['yellow','teal','pink','gold','purple','green'];
const rk=(f,x,y,h)=>{const k1=f(x,y),k2=f(x+h/2,y+h*k1/2),k3=f(x+h/2,y+h*k2/2),k4=f(x+h,y+h*k3);return y+h*(k1+2*k2+2*k3+k4)/6};
M({id:'ma-retningsfelt',s:'ma',c:['R2'],title:'Differensiallikninger: retningsdiagram og Eulers metode',short:'Retningsdiagram',kw:'differensiallikning retningsdiagram retningsfelt eulers metode løsningskurve initialbetingelse eksponentiell vekst logistisk newtons avkjølingslov numerisk',
lead:'En differensiallikning forteller hvor bratt løsningen er i hvert punkt. Tegner vi små streker med riktig stigning overalt, får vi et retningsdiagram. Løsningskurvene følger strekene.',
hint:'Klikk i diagrammet for å starte en løsningskurve der. Dra det gule punktet.',
controls:[{id:'eq',type:'sel',label:'Likning',value:'log',options:Object.entries(EQ).map(([k,v])=>[k,v.n])},{id:'k',label:'k',min:-1,max:1.5,step:.05,value:.6,d:2,show:S=>S.p.eq!=='xy'},{id:'M',label:'M',min:1,max:100,step:1,value:10,show:S=>S.p.eq==='log'||S.p.eq==='avk'},
 {id:'eu',type:'check',label:'Vis Eulers metode',value:true},{id:'h',label:'Steglengde h i Eulers metode',min:.05,max:2,step:.05,value:.8,d:2,show:S=>S.p.eu},{type:'btns',items:[['Fjern kurvene',S=>{S.cur=S.cur.slice(-1)}]]}],
tex:['y\'=f(x,y)','\\text{Euler: }y_{n+1}=y_n+h\\cdot f(x_n,y_n)'],
about:['Hver strek i diagrammet har stigningen som likningen gir i det punktet. En <strong>løsningskurve</strong> er en graf som har riktig stigning overalt, slik at den hele tiden følger strekene.','Det finnes uendelig mange løsninger. Et startpunkt $(x_0,y_0)$, en <strong>initialbetingelse</strong>, plukker ut én av dem.','<strong>Eulers metode</strong> går et lite steg $h$ i retningen strekene viser, og så et nytt steg derfra. Med mindre steg blir tilnærmingen bedre, men det trengs flere steg.','Eksempler: $y\'=ky$ er eksponentiell vekst. $y\'=k(M-y)$ er Newtons avkjølingslov der $M$ er temperaturen rundt. $y\'=ky(1-y/M)$ er logistisk vekst med bæreevne $M$.'],
tasks:['Velg logistisk vekst og start kurver både under og over M. Hva skjer med dem?','Hvilke løsninger av y′ = k·y er konstante?','Velg avkjøling med M = 20 og start i y = 90. Hvordan ser kurven ut?','Gjør h mindre og mindre. Hvordan endrer Euler-tilnærmingen seg?'],
init(S){const e=EQ[S.p.eq];S.cur=[[e.v[0]+(e.v[1]-e.v[0])*.05,S.p.eq==='avk'?90:S.p.eq==='log'?1:S.p.eq==='eks'?.5:3]];S.age=0;if(S.p.eq==='avk'){setP('M',20,S);S.v.M=20;setP('k',.3,S);S.v.k=.3}else if(S.p.eq==='log'){if(S.p.M>40){setP('M',10,S);S.v.M=10}}},
change(S,id){if(id==='eq')this.init(S)},
update(S,dt){S.age+=dt},
draw(S){const e=EQ[S.p.eq],k=S.v.k,Mv=S.v.M;let v=e.v.slice();if(S.p.eq==='log')v=[0,12,-.1*Mv,Mv*1.25];if(S.p.eq==='avk')v=[0,10,0,100];
 const f=(x,y)=>e.f(x,y,k,Mv);const P=Plane(...v,pad(S,44,24,40));S.P=P;P.grid(niceStep((v[1]-v[0])/8),{sy:niceStep((v[3]-v[2])/6),minor:false,alpha:.06});P.axes({xs:niceStep((v[1]-v[0])/8),ys:niceStep((v[3]-v[2])/6),xAt:v[0],yAt:Math.max(v[2],Math.min(0,v[3])),x0:true,y0:true});
 const nx=22,ny=14,dxp=P.w/nx,dyp=P.h/ny;for(let i=0;i<nx;i++)for(let j=0;j<ny;j++){const px=P.l+(i+.5)*dxp,py=P.t+(j+.5)*dyp;const x=P.ix(px),y=P.iy(py);const s=f(x,y);const ang=Math.atan2(-s*P.sy,P.sx);const L=Math.min(dxp,dyp)*.36;const c=ramp([C.blue,C.teal,C.yellow,C.red],clamp(Math.abs(s)/((v[3]-v[2])/(v[1]-v[0]))/1.5,0,1));ln(px-Math.cos(ang)*L,py-Math.sin(ang)*L,px+Math.cos(ang)*L,py+Math.sin(ang)*L,A(c,.55),1.6)}
 const H=(v[1]-v[0])/400;P.clip(()=>S.cur.forEach(([x0,y0],ci)=>{const last=ci===S.cur.length-1;const col=C[COL[ci%COL.length]];const fw=[],bw=[];let x=x0,y=y0;for(let i=0;i<450&&x<=v[1];i++){fw.push(P.pt(x,y));y=rk(f,x,y,H);x+=H;if(!isFinite(y)||Math.abs(y)>1e6)break}x=x0;y=y0;for(let i=0;i<450&&x>=v[0];i++){bw.push(P.pt(x,y));y=rk(f,x,y,-H);x-=H;if(!isFinite(y)||Math.abs(y)>1e6)break}
  const pr=last?Math.min(1,S.age*1.2):1;pth(fw,last?col:A(col,.6),last?3:2,pr);pth(bw,last?col:A(col,.6),last?3:2,pr);
  if(last&&S.p.eu){const h=S.v.h;let xe=x0,ye=y0;const pts=[P.pt(xe,ye)];while(xe<v[1]-1e-9&&pts.length<200){const s=f(xe,ye);ye+=h*s;xe+=h;pts.push(P.pt(xe,ye));if(Math.abs(ye)>1e6)break}pth(pts,C.red,2,1,[6,4]);pts.forEach(q=>dot(q[0],q[1],3.2,C.red))}}));
 const cur=S.cur[S.cur.length-1];handle(...P.pt(...cur),C.yellow,S);
 lab({l:P.l,t:P.t+4},e.n.replace('k',nf(k,2)).replace(/M/g,nf(Mv,0)));if(S.p.eu)T('Euler med h = '+nf(S.v.h,2),P.l+P.w-4,P.t+10,{a:'right',s:12,c:C.red,bg:A(C.stage,.6)})},
click(S,x,y){const P=S.P;if(!P||x<P.l||x>P.l+P.w||y<P.t||y>P.t+P.h)return;S.cur.push([P.ix(x),P.iy(y)]);if(S.cur.length>6)S.cur.shift();S.age=0},
pick(S,x,y){const P=S.P;if(!P)return;const c=S.cur[S.cur.length-1];if(near(x,y,...P.pt(...c),22))return{move:(mx,my)=>{S.cur[S.cur.length-1]=[clamp(P.ix(mx),P.x0,P.x1),clamp(P.iy(my),P.y0,P.y1)];S.age=9}}},
readout(S){const e=EQ[S.p.eq],c=S.cur[S.cur.length-1];const s=e.f(c[0],c[1],S.p.k,S.p.M);return[['startpunkt',`(${nf(c[0],2)}, ${nf(c[1],2)})`,'yellow'],['stigning der',nf(s,3)],['løsningskurver',S.cur.length]]},
live(S){return EQ[S.p.eq].sol}
});
}

/* ---------- Sentralgrensesetningen ---------- */
{
const D={terning:{n:'Terningkast',mu:3.5,sd:Math.sqrt(35/12),r:[.5,6.5],draw:()=>1+Math.floor(Math.random()*6),pdf:null,pmf:[1,2,3,4,5,6].map(v=>[v,1/6])},
 skjev:{n:'Ventetid (skjev fordeling)',mu:1,sd:1,r:[0,5],draw:()=>-Math.log(1-Math.random()),pdf:x=>x<0?0:Math.exp(-x)},
 topper:{n:'To topper',mu:4.5,sd:Math.sqrt(.5*.25+.5*.64+6.25),r:[0,10],draw:()=>Math.random()<.5?2+.5*gauss():7+.8*gauss(),pdf:x=>.5*npdf(x,2,.5)+.5*npdf(x,7,.8)},
 mynt:{n:'Mynt (0 eller 1)',mu:.5,sd:.5,r:[-.3,1.3],draw:()=>Math.random()<.5?0:1,pmf:[[0,.5],[1,.5]]}};
M({id:'ma-sgs',s:'ma',c:['S2','S1'],title:'Sentralgrensesetningen',short:'Sentralgrensesetningen',kw:'sentralgrensesetningen gjennomsnitt utvalg normalfordeling standardavvik standardfeil kvadratrot n stikkprøve statistikk simulering',
lead:'Trekk mange tall fra en fordeling og regn ut gjennomsnittet. Gjør det om igjen og om igjen. Uansett hvordan fordelingen ser ut, blir gjennomsnittene normalfordelt når utvalgene er store nok.',
controls:[{id:'dist',type:'sel',label:'Fordeling',value:'skjev',options:Object.entries(D).map(([k,v])=>[k,v.n])},{id:'n',label:'Utvalgsstørrelse n',min:1,max:60,step:1,value:5},
 {id:'sp',label:'Utvalg per sekund',min:1,max:60,step:1,value:12},{type:'btns',items:[['Trekk 500 utvalg nå',S=>{for(let i=0;i<500;i++)MOD['ma-sgs'].sample(S,false)}],['Nullstill',S=>MOD['ma-sgs'].init(S)]]},{id:'nc',type:'check',label:'Vis normalfordelingskurven',value:true}],
tex:['\\bar X=\\frac{X_1+X_2+\\dots+X_n}{n}','E(\\bar X)=\\mu,\\qquad \\mathrm{SD}(\\bar X)=\\frac{\\sigma}{\\sqrt n}'],
about:['Øverst ser du fordelingen vi trekker fra. Den har forventning $\\mu$ og standardavvik $\\sigma$. I midten ser du det siste utvalget med $n$ tall og gjennomsnittet av dem.','Nederst samles gjennomsnittene i et histogram. <strong>Sentralgrensesetningen</strong> sier at $\\bar X$ blir tilnærmet normalfordelt med forventning $\\mu$ og standardavvik $\\sigma/\\sqrt n$ når $n$ er stor.','Spredningen avtar med $\\sqrt n$. For å halvere spredningen må utvalget bli fire ganger så stort.','Setningen er grunnen til at normalfordelingen dukker opp overalt: mange målinger er summer eller gjennomsnitt av mange små tilfeldige bidrag.'],
tasks:['Velg den skjeve fordelingen og n = 1. Hvordan ser histogrammet ut? Øk n gradvis.','Hvor stor må n være før histogrammet ser normalfordelt ut for terningkast? For to topper?','Sammenlign standardavviket til gjennomsnittene med σ/√n i avlesningen.','Hvorfor kan meningsmålinger med 1000 personer si noe om hele befolkningen?'],
init(S){S.means=[];S.last=null;S.acc=0;S.fall=0},
change(S,id){if(id==='dist'||id==='n')this.init(S)},
sample(S,anim=true){const d=D[S.p.dist],n=Math.round(S.p.n);const xs=[];for(let i=0;i<n;i++)xs.push(d.draw());const m=xs.reduce((a,b)=>a+b,0)/n;S.means.push(m);if(S.means.length>20000)S.means.shift();if(anim){S.last={xs,m};S.fall=0}},
update(S,dt){S.acc+=dt*S.p.sp;while(S.acc>=1){S.acc-=1;this.sample(S,true)}S.fall+=dt},
draw(S){const d=D[S.p.dist],n=Math.round(S.p.n);const b=pad(S,40,26,40);const[g1,g2,g3]=rows(b,[.8,.45,1.5],36);
 let pm=0;if(d.pdf){for(let i=0;i<=200;i++)pm=Math.max(pm,d.pdf(d.r[0]+(d.r[1]-d.r[0])*i/200))}else pm=Math.max(...d.pmf.map(q=>q[1]));const P1=Plane(d.r[0],d.r[1],0,pm*1.15,g1);
 if(d.pdf){P1.area(d.pdf,d.r[0],d.r[1],A(C.purple,.25));P1.fn(d.pdf,C.purple,2.4)}else d.pmf.forEach(([x,p])=>{const w=Math.min(.6,(d.r[1]-d.r[0])*.06);rct(P1.X(x-w/2),P1.Y(p),w*P1.sx,P1.Y(0)-P1.Y(p),null,A(C.purple,.7))});
 P1.axes({xs:niceStep((d.r[1]-d.r[0])/6),y:false,xAt:d.r[0],x0:true});ln(P1.X(d.mu),P1.t,P1.X(d.mu),P1.Y(0),C.yellow,1.6,[4,4]);T('μ',P1.X(d.mu)+5,P1.t+8,{f:'m',s:14,c:C.yellow});lab(g1,`Fordelingen vi trekker fra  ·  μ = ${nf(d.mu,2)}, σ = ${nf(d.sd,2)}`);
 const P2=Plane(d.r[0],d.r[1],0,1,g2);lab(g2,`Siste utvalg: ${n} tall`);ln(P2.l,P2.Y(0),P2.l+P2.w,P2.Y(0),A(C.fg,.4),1);
 if(S.last){const rg=rng(7);const fy=Math.min(1,S.fall*3);S.last.xs.forEach((x,i)=>{const jy=.25+rg()*.6;dot(P2.X(x),P2.Y(jy)*1+(1-fy)*-10,3.4,A(C.teal,.85))});const mx=P2.X(S.last.m);ln(mx,P2.t,mx,P2.Y(0),C.yellow,2.4);T('x̄ = '+nf(S.last.m,2),mx+6,P2.t+6,{f:'n',s:11.5,c:C.yellow})}
 const se=d.sd/Math.sqrt(n);const nb=48,lo=d.r[0],hi=d.r[1],bw=(hi-lo)/nb;const bins=new Array(nb).fill(0);S.means.forEach(m=>{const k=Math.floor((m-lo)/bw);if(k>=0&&k<nb)bins[k]++});
 const peak=Math.max(S.means.length*bw*npdf(0,0,se),...bins,5);const P3=Plane(lo,hi,0,peak*1.1,g3);P3.grid(niceStep((hi-lo)/6),{sy:niceStep(peak/4),minor:false,alpha:.06});
 bins.forEach((c,i)=>{if(c)rct(P3.X(lo+i*bw)+.5,P3.Y(c),bw*P3.sx-1,P3.Y(0)-P3.Y(c),null,A(C.teal,.75))});
 if(S.p.nc&&S.means.length>2)P3.fn(x=>S.means.length*bw*npdf(x,d.mu,se),C.yellow,2.4,{prog:1});
 P3.axes({xs:niceStep((hi-lo)/6),ys:niceStep(peak/4),xAt:lo,x0:true,xl:'x̄',ls:15});lab(g3,`Gjennomsnitt fra ${S.means.length} utvalg`+(S.p.nc?`  ·  gul kurve: normalfordeling med μ = ${nf(d.mu,2)} og σ/√n = ${nf(se,3)}`:''))},
readout(S){const d=D[S.p.dist],n=Math.round(S.p.n),m=S.means;const mean=m.length?m.reduce((a,b)=>a+b,0)/m.length:NaN;const sd=m.length>1?Math.sqrt(m.reduce((a,b)=>a+(b-mean)**2,0)/(m.length-1)):NaN;
 return[['utvalg',m.length],['snitt av x̄',m.length?nf(mean,3):'–','teal'],['standardavvik av x̄',m.length>1?nf(sd,3):'–','teal'],['σ/√n',nf(d.sd/Math.sqrt(n),3),'yellow']]}
});
}

/* ---------- Trigonometriske likninger ---------- */
{
const IV={a:[0,TAU,'[0, 2π⟩'],b:[0,2*TAU,'[0, 4π⟩'],c:[-TAU,TAU,'[−2π, 2π⟩']};
M({id:'ma-trigliking',s:'ma',c:['R2','1T'],title:'Trigonometriske likninger',short:'Trigonometriske likninger',kw:'trigonometrisk likning sinus cosinus tangens enhetssirkel løsning periode generell løsning arcsin arccos arctan radianer',
lead:'En likning som sin x = c har uendelig mange løsninger fordi sinus er periodisk. Enhetssirkelen viser de to vinklene i hver runde, og grafen viser alle løsningene i intervallet.',
hint:'Dra den gule linja eller bruk glidebryteren.',
controls:[{id:'fn',type:'seg',label:'Likning',value:'sin',options:[['sin','sin x = c'],['cos','cos x = c'],['tan','tan x = c']]},{id:'c',label:'c',min:-1.3,max:1.3,step:.01,value:.5,d:2,show:S=>S.p.fn!=='tan'},{id:'ct',label:'c',min:-4,max:4,step:.05,value:1,d:2,show:S=>S.p.fn==='tan'},
 {id:'iv',type:'seg',label:'Intervall',value:'a',options:Object.entries(IV).map(([k,v])=>[k,v[2]])},{id:'deg',type:'seg',label:'Vinkelmål',value:'rad',options:[['rad','Radianer'],['deg','Grader']]}],
tex:['\\sin x=c\\;\\Rightarrow\\;x=x_0+k\\cdot2\\pi\\;\\lor\\;x=\\pi-x_0+k\\cdot2\\pi','\\cos x=c\\;\\Rightarrow\\;x=\\pm x_0+k\\cdot2\\pi','\\tan x=c\\;\\Rightarrow\\;x=x_0+k\\cdot\\pi'],
about:['Start med å finne én løsning $x_0$ med lommeregneren: $x_0=\\sin^{-1}c$, $\\cos^{-1}c$ eller $\\tan^{-1}c$.','På enhetssirkelen er sinus y-koordinaten. Linja $y=c$ treffer sirkelen i to punkter, symmetrisk om y-aksen. Derfor er den andre løsningen $\\pi-x_0$. For cosinus er linja loddrett og punktene symmetriske om x-aksen: $\\pm x_0$.','Tangens har periode $\\pi$, så der er det nok med én løsning per halve runde.','Legg til hele perioder ($k\\cdot2\\pi$ eller $k\\cdot\\pi$) og velg de $k$-ene som gir løsninger inne i intervallet. Hvis $|c|>1$, har $\\sin x=c$ og $\\cos x=c$ ingen løsning.'],
tasks:['Løs sin x = 0,5 i [0, 2π⟩ for hånd. Sjekk med animasjonen.','Hvor mange løsninger har cos x = 0,3 i [0, 4π⟩? Hvorfor?','Finn alle c der sin x = c har nøyaktig én løsning i [0, 2π⟩.','Løs tan x = −1 i [−2π, 2π⟩.'],
sols(S){const fn=S.p.fn,c=fn==='tan'?S.p.ct:S.p.c,[lo,hi]=IV[S.p.iv];const out=[];if(fn!=='tan'&&Math.abs(c)>1)return out;
 const base=fn==='sin'?[Math.asin(c),PI-Math.asin(c)]:fn==='cos'?[Math.acos(c),-Math.acos(c)]:[Math.atan(c)];const per=fn==='tan'?PI:TAU;
 base.forEach(x0=>{for(let k=-6;k<=6;k++){const x=x0+k*per;if(x>=lo-1e-9&&x<hi-1e-9&&!out.some(q=>Math.abs(q-x)<1e-7))out.push(x)}});return out.sort((a,b)=>a-b)},
draw(S){const fn=S.p.fn,c=fn==='tan'?S.v.ct:S.v.c,[lo,hi]=IV[S.p.iv],dg=S.p.deg==='deg';const[bl,br]=split(S,.34,{g:30,b:pad(S,30,30,40)});
 const R=Math.min(bl.w,bl.h)/2-24,cx=bl.l+bl.w/2,cy=bl.t+bl.h/2;const U=Plane(-1.35,1.35,-1.35,1.35,{l:cx-R*1.35,t:cy-R*1.35,w:R*2.7,h:R*2.7},true);
 ln(U.X(-1.3),U.Y(0),U.X(1.3),U.Y(0),A(C.fg,.5),1.2);ln(U.X(0),U.Y(-1.3),U.X(0),U.Y(1.3),A(C.fg,.5),1.2);circ(U.X(0),U.Y(0),R,A(C.fg,.7),null,2);
 const fmt=x=>dg?nf(deg(x),1)+'°':nf(x,3);
 if(fn==='sin')ln(U.X(-1.35),U.Y(c),U.X(1.35),U.Y(c),C.yellow,2.2);else if(fn==='cos')ln(U.X(c),U.Y(-1.35),U.X(c),U.Y(1.35),C.yellow,2.2);else{ln(U.X(1),U.Y(-1.35),U.X(1),U.Y(1.35),A(C.fg,.35),1.2,[4,4]);U.clip(()=>ln(U.X(-1.35),U.Y(-1.35*c),U.X(1.35),U.Y(1.35*c),C.yellow,2.2));dot(U.X(1),U.Y(c),5,C.yellow)}
 const ang=fn==='sin'?(Math.abs(c)<=1?[Math.asin(c),PI-Math.asin(c)]:[]):fn==='cos'?(Math.abs(c)<=1?[Math.acos(c),-Math.acos(c)]:[]):[Math.atan(c),Math.atan(c)+PI];
 ang.forEach((a,i)=>{const col=i?C.teal:C.red;ln(U.X(0),U.Y(0),U.X(Math.cos(a)),U.Y(Math.sin(a)),col,2.2);dot(U.X(Math.cos(a)),U.Y(Math.sin(a)),6,col);const ra=R*(.22+.1*i);X.beginPath();X.arc(U.X(0),U.Y(0),ra,0,-a,a>0);X.strokeStyle=col;X.lineWidth=2;X.stroke();T(i?'x₁':'x₀',U.X(Math.cos(a)*1.17),U.Y(Math.sin(a)*1.17),{a:'center',f:'n',s:13,c:col})});
 if(!ang.length)T('Ingen løsning: |c| > 1',cx,bl.t+bl.h-4,{a:'center',s:13,c:C.red});lab(bl,'Enhetssirkelen');
 const yr=fn==='tan'?[-4.5,4.5]:[-1.5,1.5];const P=Plane(lo,hi,...yr,br);S.P=P;P.grid(PI/2,{sy:fn==='tan'?1:.5,minor:false,alpha:.07});P.axes({xs:PI/2,ys:fn==='tan'?2:.5,xAt:lo,xpi:!dg,xf:dg?x=>nf(deg(x),0)+'°':undefined,x0:true,y0:true});
 const f=fn==='sin'?Math.sin:fn==='cos'?Math.cos:Math.tan;P.clip(()=>{if(fn==='tan'){for(let k=-4;k<=4;k++){const a=-PI/2+k*PI;P.fn(Math.tan,C.blue,2.6,{from:Math.max(lo,a+.02),to:Math.min(hi,a+PI-.02),prog:1})}}else P.fn(f,C.blue,2.6,{prog:1})});
 ln(P.l,P.Y(c),P.l+P.w,P.Y(c),C.yellow,2);handle(P.l+P.w-14,P.Y(c),C.yellow,S);T('y = '+nf(c,2),P.l+P.w-30,P.Y(c)-14,{a:'right',f:'n',s:12,c:C.yellow,bg:A(C.stage,.6)});
 const sol=this.sols(S);const x0=ang[0];sol.forEach(x=>{const fam=Math.abs(Math.sin((x-x0)/(fn==='tan'?1:2)))<1e-6;const col=fam?C.red:C.teal;ln(P.X(x),P.Y(0),P.X(x),P.Y(c),A(col,.6),1.4,[3,3]);dot(P.X(x),P.Y(c),5.5,col);T(fmt(x),P.X(x),P.Y(c)+(c>=0?-15:15),{a:'center',f:'n',s:10.5,c:col,bg:A(C.stage,.7)})});
 lab(br,`${fn} x = ${nf(c,2)} har ${sol.length} løsning${sol.length===1?'':'er'} i ${IV[S.p.iv][2]}`)},
pick(S,x,y){const P=S.P;if(!P)return;const fn=S.p.fn,id=fn==='tan'?'ct':'c',c=S.p[id];if(Math.abs(y-P.Y(c))<16&&x>P.l&&x<P.l+P.w){return{move:(mx,my)=>{const lim=fn==='tan'?4:1.3;const v=clamp(Math.round(P.iy(my)*100)/100,-lim,lim);setP(id,v,S);S.v[id]=v}}}},
readout(S){const s=this.sols(S),dg=S.p.deg==='deg';return[['antall løsninger',s.length],['løsninger',s.length?s.map(x=>dg?nf(deg(x),1)+'°':nf(x,3)).join(';  '):'ingen','yellow']]},
live(S){const fn=S.p.fn,c=fn==='tan'?S.p.ct:S.p.c;if(fn!=='tan'&&Math.abs(c)>1)return `\\${fn} x=${tn(c,2)}\\;\\text{har ingen løsning}`;const dg=S.p.deg==='deg';
 const x0=fn==='sin'?Math.asin(c):fn==='cos'?Math.acos(c):Math.atan(c);const v=dg?tn(deg(x0),1)+'^\\circ':tn(x0,3);const per=dg?(fn==='tan'?'180^\\circ':'360^\\circ'):(fn==='tan'?'\\pi':'2\\pi');
 if(fn==='sin')return `x=\\cR{${v}}+k\\cdot ${per}\\;\\lor\\;x=\\cT{${dg?tn(180-deg(x0),1)+'^\\circ':tn(PI-x0,3)}}+k\\cdot ${per}`;
 if(fn==='cos')return `x=\\pm\\cR{${v}}+k\\cdot ${per}`;return `x=\\cR{${v}}+k\\cdot ${per}`}
});
}
