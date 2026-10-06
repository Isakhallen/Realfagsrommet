'use strict';
/* ================= NATURFAG (del 4): stoffer, helse, miljø og bioteknologi ================= */

/* ---------- Bindinger og egenskaper ---------- */
{
const TYN={ion:'Ionebinding (ionisk forbindelse)',met:'Metallbinding',kov:'Kovalent nettverk',pol:'Polare molekyler',upol:'Upolare molekyler'};
const SB={nacl:{n:'Natriumklorid (koksalt)',f:'NaCl',ty:'ion',mp:801,sv:true,sh:false,cs:false,cl:true,ca:true,why:'Ionene holdes sammen av sterke krefter i hele krystallen, så smeltepunktet er høyt. I fast stoff sitter ionene fast. Smeltet eller løst i vann kan de bevege seg, og da leder stoffet strøm.'},
 cu:{n:'Kobber',f:'Cu',ty:'met',mp:1085,sv:false,sh:false,cs:true,cl:true,ca:false,why:'Metallatomene har gitt fra seg ytterelektroner som beveger seg fritt mellom metallionene. Elektronsjøen leder strøm både i fast og flytende metall, og gjør metallet formbart.'},
 dia:{n:'Diamant (karbon)',f:'C',ty:'kov',mp:3550,sv:false,sh:false,cs:false,cl:false,ca:false,why:'Hvert karbonatom er bundet med sterke kovalente bindinger til fire andre i et nettverk gjennom hele krystallen. Derfor er diamant det hardeste naturlige stoffet og smelter først ved over 3500 °C.'},
 suk:{n:'Sukker (sukrose)',f:'C₁₂H₂₂O₁₁',ty:'pol',mp:186,dec:true,sv:true,sh:false,cs:false,cl:false,ca:false,why:'Sukker består av molekyler. Bindingene inne i molekylet er sterke, men kreftene mellom molekylene er svake, så det smelter (og brytes ned) ved lav temperatur. Molekylene har mange OH-grupper og løses godt i vann, men det blir ingen ioner, så løsningen leder ikke strøm.'},
 vann:{n:'Vann (is)',f:'H₂O',ty:'pol',mp:0,sv:true,sh:false,cs:false,cl:false,ca:false,why:'Vannmolekyler er polare og holdes sammen av hydrogenbindinger. Det er sterkere enn mellom upolare molekyler på samme størrelse, men mye svakere enn ionebindinger. Rent vann leder nesten ikke strøm.'},
 voks:{n:'Parafinvoks',f:'C₂₅H₅₂',ty:'upol',mp:60,sv:false,sh:true,cs:false,cl:false,ca:false,why:'Lange, upolare hydrokarbonmolekyler holdes sammen av svake krefter. Voks løses ikke i vann, men i upolare løsemidler som heptan: «likt løser likt».'},
 jod:{n:'Jod',f:'I₂',ty:'upol',mp:114,sv:false,sh:true,cs:false,cl:false,ca:false,why:'Jodmolekyler er upolare. De løses nesten ikke i vann, men godt i heptan, som også er upolart. Da blir løsningen fiolett.'}};
const SOLV={luft:'Ingen (bare stoffet)',vann:'I vann',heptan:'I heptan (upolart)'};
const state=(s,T,m)=>{if(m==='vann'&&s.sv&&s.f!=='H₂O')return'løst';if(m==='heptan'&&s.sh)return'løst';if(T>=s.mp)return s.dec?'spaltes':'flytende';return'fast'};
const conducts=(s,st)=>st==='løst'?s.ca:st==='flytende'?s.cl:st==='fast'?s.cs:false;
M({id:'na-stoffegenskaper',s:'na',c:['NAT','KJ1'],title:'Kjemiske bindinger og stoffenes egenskaper',short:'Bindinger og egenskaper',kw:'kjemisk binding ionebinding metallbinding kovalent binding molekyl smeltepunkt løselighet ledningsevne polar upolar likt løser likt egenskaper stoffer',
lead:'Hvorfor smelter is ved 0 °C, mens salt må over 800 °C? Hvorfor leder kobber strøm, men ikke sukker? Svaret ligger i hvordan partiklene er bundet sammen.',
controls:[{id:'st',type:'sel',label:'Stoff',value:'nacl',options:Object.entries(SB).map(([k,v])=>[k,v.n+' ('+v.f+')'])},{id:'T',label:'Temperatur',min:-30,max:1200,step:1,value:20,unit:'°C'},{id:'m',type:'seg',label:'Løsemiddel',value:'luft',options:Object.entries(SOLV)}],
tex:['\\text{ioner som kan bevege seg}\\Rightarrow\\text{leder strøm}','\\text{likt løser likt: polart i polart, upolart i upolart}'],
about:['<strong>Ionebinding</strong>: Positive og negative ioner trekker hverandre i et gitter. Høyt smeltepunkt. Leder strøm når ionene kan bevege seg, altså smeltet eller løst i vann.','<strong>Metallbinding</strong>: Metallioner i et «hav» av frie elektroner. Leder strøm og varme godt, og kan bøyes uten å knuse.','<strong>Kovalente bindinger</strong> deler elektronpar. Er alle atomene bundet i ett stort nettverk, som i diamant og kvarts, blir stoffet svært hardt med høyt smeltepunkt. Består stoffet av enkeltmolekyler, er det svake krefter mellom molekylene, og smeltepunktet er lavt.','<strong>Løselighet</strong>: Polare stoffer og ionestoffer løses i polare løsemidler som vann. Upolare stoffer løses i upolare løsemidler. Det kalles «likt løser likt».'],
tasks:['Hvilke av stoffene leder strøm som fast stoff? Hva har de felles?','Varm opp natriumklorid til den smelter. Hva skjer med lampa? Hvorfor?','Løs sukker og salt i vann. Hvorfor lyser lampa bare med salt?','Hvorfor kan du fjerne en voksflekk med et upolart løsemiddel, men ikke med vann?'],
init(S){S.e=[...Array(40)].map(()=>({x:Math.random(),y:Math.random(),a:Math.random()*TAU}))},
update(S,dt){S.e.forEach(q=>{q.a+=(Math.random()-.5)*dt*6;q.x=(q.x+Math.cos(q.a)*dt*.15+1)%1;q.y=(q.y+Math.sin(q.a)*dt*.15+1)%1})},
draw(S){const s=SB[S.p.st],T_=S.v.T,m=S.p.m,st=state(s,T_,m),on=conducts(s,st);const[bl,br]=split(S,.52,{g:28,b:pad(S,26,30,40)});frame(bl);
 const nx=8,ny=6,sp=Math.min(bl.w/(nx+1),bl.h/(ny+1)),ox=bl.l+(bl.w-sp*(nx-1))/2,oy=bl.t+(bl.h-sp*(ny-1))/2;const vib=sp*.05*clamp((T_+273)/(Math.min(s.mp,1500)+273),0,1.2);
 const pos=(i,j,k)=>{const ph=i*1.7+j*2.3+k*.37;let x=ox+i*sp,y=oy+j*sp;if(st==='fast'||st==='spaltes'){x+=Math.sin(S.t*9+ph)*vib*6;y+=Math.cos(S.t*8+ph*1.3)*vib*6}else if(st==='flytende'){x+=Math.sin(S.t*1.3+ph)*sp*.6;y+=Math.cos(S.t*1.1+ph*1.2)*sp*.6}else{x=bl.l+bl.w*(.5+.45*Math.sin(S.t*.23*(1+(k%5)*.1)+ph));y=bl.t+bl.h*(.5+.43*Math.cos(S.t*.19*(1+(k%7)*.1)+ph*1.4))}return[x,y]};
 X.save();X.beginPath();X.rect(bl.l,bl.t,bl.w,bl.h);X.clip();
 if(st==='spaltes')rct(bl.l,bl.t,bl.w,bl.h,null,A(C.gold,.12));if(st==='løst'&&s.f==='I₂')rct(bl.l,bl.t,bl.w,bl.h,null,A(C.purple,.18));
 if(st==='løst'){const rg=rng(9);for(let i=0;i<70;i++){const x=bl.l+rg()*bl.w,y=bl.t+rg()*bl.h;if(m==='vann'){dot(x,y,3,A(C.red,.35));dot(x-3,y+3,1.8,A(C.fg,.35));dot(x+3,y+3,1.8,A(C.fg,.35))}else{ln(x-5,y,x+5,y+2,A(C.fg2,.3),2)}}}
 if(s.ty==='kov'){for(let i=0;i<nx;i++)for(let j=0;j<ny;j++){const[x,y]=pos(i,j,0);[[i+1,j],[i,j+1]].forEach(([a,bb])=>{if(a<nx&&bb<ny){const[x2,y2]=pos(a,bb,0);ln(x,y,x2,y2,A(C.fg,.55),2.2)}})}for(let i=0;i<nx;i++)for(let j=0;j<ny;j++){const[x,y]=pos(i,j,0);dot(x,y,sp*.18,C.grey)}}
 else{let k=0;for(let i=0;i<nx;i++)for(let j=0;j<ny;j++,k++){const[x,y]=pos(i,j,k);
  if(s.ty==='ion'){const neg=(i+j)%2;circ(x,y,sp*(neg?.3:.2),null,neg?C.green:C.purple);T(neg?'−':'+',x,y,{a:'center',f:'n',s:sp*.3,c:C.stage})}
  else if(s.ty==='met'){circ(x,y,sp*.3,null,mix(C.gold,C.red,.3));T('+',x,y,{a:'center',f:'n',s:sp*.3,c:C.stage})}
  else{const col=s.f==='I₂'?C.purple:s.ty==='pol'?C.teal:C.fg2;if(st==='fast'&&i<nx-1)ln(x+sp*.25,y,x+sp*.75,y,A(C.fg,.25),1,[2,3]);
   if(s.f==='H₂O'){dot(x,y,sp*.17,C.red);dot(x-sp*.15,y+sp*.13,sp*.09,C.fg);dot(x+sp*.15,y+sp*.13,sp*.09,C.fg)}else if(s.f==='I₂'){dot(x-sp*.12,y,sp*.16,col);dot(x+sp*.12,y,sp*.16,col)}else if(s.ty==='upol'){for(let q=0;q<5;q++)dot(x-sp*.3+q*sp*.15,y+Math.sin(q*1.5)*sp*.06,sp*.08,col)}else{rr(x-sp*.3,y-sp*.18,sp*.6,sp*.36,sp*.15,null,A(col,.8));for(let q=0;q<3;q++)dot(x-sp*.2+q*sp*.2,y-sp*.2,sp*.05,C.red)}}}
  if(s.ty==='met')S.e.forEach(q=>dot(bl.l+q.x*bl.w,bl.t+q.y*bl.h,2.2,C.yellow))}
 X.restore();T({fast:'Fast stoff',flytende:'Flytende (smeltet)',løst:'Løst i '+(m==='vann'?'vann':'heptan'),spaltes:'Stoffet brytes ned (karamelliseres)'}[st],bl.l+8,bl.t+14,{s:13.5,w:700,c:C.fg,bg:A(C.stage,.7)});
 if(m!=='luft'&&st!=='løst')T('løses ikke',bl.l+8,bl.t+34,{s:12,c:C.red,bg:A(C.stage,.7)});
 const[r1,r2]=rows(br,[.75,1.25],36);const lx=r1.l+r1.w*.5,ly=r1.t+r1.h*.32;rr(r1.l+10,r1.t+r1.h*.62,r1.w*.4,r1.h*.34,6,A(C.fg,.5),A(C.fg,.05),1.5);T('prøve',r1.l+10+r1.w*.2,r1.t+r1.h*.79,{a:'center',s:11,c:C.fg3});
 pth([[r1.l+r1.w*.15,r1.t+r1.h*.7],[r1.l+r1.w*.15,ly],[lx-12,ly]],A(C.fg,.6),2);pth([[r1.l+r1.w*.4,r1.t+r1.h*.7],[r1.l+r1.w*.4,ly+30],[r1.l+r1.w*.85,ly+30],[r1.l+r1.w*.85,ly],[lx+12,ly]],A(C.fg,.6),2);
 rct(r1.l+r1.w*.7-4,ly+22,3,16,null,C.fg);rct(r1.l+r1.w*.7+3,ly+26,3,8,null,C.fg);if(on)glow(lx,ly,34,C.yellow,.8);circ(lx,ly,11,C.fg2,on?C.yellow:A(C.fg,.1),1.6);T(on?'leder strøm':'leder ikke',lx,ly-24,{a:'center',s:12,w:700,c:on?C.yellow:C.fg3});
 lab(r1,'Ledningsevnetest');
 let y=r2.t+4;const row=(k,v,c=C.fg2)=>{T(k,r2.l,y,{s:12,c:C.fg3});T(v,r2.l+r2.w*.5,y,{s:12.5,c,f:'n'});y+=18};lab(r2,s.n+' · '+TYN[s.ty]);
 row('Smeltepunkt',(s.dec?'ca. ':'')+nf(s.mp,0)+' °C'+(s.dec?' (spaltes)':''),C.red);row('Leder strøm fast / smeltet',(s.cs?'ja':'nei')+' / '+(s.cl?'ja':'nei'));row('Løses i vann / heptan',(s.sv?'ja':'nei')+' / '+(s.sh?'ja':'nei'));row('Leder strøm løst i vann',s.sv?(s.ca?'ja':'nei'):'–');
 Twrap(s.why,r2.l,y+6,r2.w,{s:12,c:C.fg2})},
readout(S){const s=SB[S.p.st],st=state(s,S.p.T,S.p.m);return[['tilstand',st],['bindingstype',TYN[s.ty]],['leder strøm nå',conducts(s,st)?'ja':'nei','yellow'],['smeltepunkt',nf(s.mp,0)+' °C','red']]}
});
}

/* ---------- Forbrenning av karbonforbindelser ---------- */
{
const FU={metan:{n:'Metan (naturgass)',f:'CH4',x:1,y:4,z:0,H:890,M:16.04},propan:{n:'Propan',f:'C3H8',x:3,y:8,z:0,H:2220,M:44.10},oktan:{n:'Oktan (bensin)',f:'C8H18',x:8,y:18,z:0,H:5470,M:114.23},etanol:{n:'Etanol',f:'C2H6O',x:2,y:6,z:1,H:1367,M:46.07},glukose:{n:'Glukose (celleånding)',f:'C6H12O6',x:6,y:12,z:6,H:2803,M:180.16},hydrogen:{n:'Hydrogen',f:'H2',x:0,y:2,z:0,H:286,M:2.016}};
const AC={C:'#7b8490',H:'#e8ecef',O:'#e0524a'},AR={C:5.6,H:3.8,O:5.4};
const sb=f=>f.replace(/\d+/g,d=>[...d].map(c=>'₀₁₂₃₄₅₆₇₈₉'[c]).join(''));
const coef=(fu,full)=>{const o=full?fu.x+fu.y/4-fu.z/2:fu.x/2+fu.y/4-fu.z/2;for(const m of[1,2,4])if(Number.isInteger(o*m)&&Number.isInteger(fu.y/2*m))return{m,o:o*m,c:fu.x*m,h:fu.y/2*m};return{m:4,o:o*4,c:fu.x*4,h:fu.y*2}};
const gkWh=fu=>fu.x*44.01/fu.H*3600;
const pack=n=>{const p=[[0,0]];let ring=0;while(p.length<n){ring++;const m=ring*6;for(let i=0;i<m&&p.length<n;i++){const a=i/m*TAU;p.push([Math.cos(a)*ring,Math.sin(a)*ring])}}return p};
M({id:'na-forbrenning',s:'na',c:['NAT','KJ1'],title:'Karbonforbindelser og forbrenning',short:'Forbrenning',kw:'forbrenning karbonforbindelser hydrokarbon metan propan oktan bensin etanol glukose celleånding karbondioksid energi brensel karbonmonoksid fullstendig ufullstendig klima',
lead:'Når karbonforbindelser brenner, reagerer de med oksygen. Energien som var lagret i bindingene frigjøres, og karbonatomene blir til CO₂. Det samme skjer i cellene når vi forbrenner glukose.',
controls:[{id:'fu',type:'sel',label:'Brensel',value:'oktan',options:Object.entries(FU).map(([k,v])=>[k,v.n])},{id:'ox',type:'seg',label:'Oksygen',value:'nok',options:[['nok','Nok oksygen'],['lite','For lite oksygen']]},{id:'kg',label:'Mengde brensel',min:.1,max:50,step:.1,value:1,unit:'kg',d:1}],
tex:['\\text{C}_x\\text{H}_y\\text{O}_z+\\left(x+\\tfrac y4-\\tfrac z2\\right)\\text{O}_2\\to x\\,\\text{CO}_2+\\tfrac y2\\,\\text{H}_2\\text{O}','E=n\\cdot\\Delta H'],
about:['Ved <strong>fullstendig forbrenning</strong> blir alt karbon til CO₂ og alt hydrogen til vann. Atomene blir bare stokket om: Det er like mange av hvert slag på begge sider av pila.','Med <strong>for lite oksygen</strong> blir det karbonmonoksid (CO) i stedet. CO er en giftig gass uten lukt som hindrer blodet i å frakte oksygen. Derfor er det farlig å fyre med dårlig trekk.','Diagrammene sammenligner brensler. Hydrogen gir mest energi per kilo og ingen CO₂, men må lages med energi fra et annet sted. Naturgass gir minst CO₂ per kWh av de fossile brenslene.','Karbon er grunnlaget for livet: Planter lager glukose fra CO₂ i fotosyntesen, og vi frigjør energien igjen i celleåndingen. Karbonet i etanol og ved kommer fra planter som nylig tok det fra lufta. Karbonet i fossilt brensel har vært lagret i millioner av år.'],
tasks:['Balanser forbrenningen av propan selv. Sjekk med animasjonen.','Hvor mye CO₂ blir det når 1 kg bensin brenner? Hvorfor veier CO₂-en mer enn bensinen?','Hvorfor er det farlig å brenne gass eller ved med for lite lufttilførsel?','Sammenlign CO₂ per kWh for metan og oktan. Hva betyr det for klimaet?'],
init(S){S.cyc=0},
update(S,dt){S.cyc=(S.cyc+dt/5)%1},
draw(S){const fu=FU[S.p.fu],full=S.p.ox==='nok',k=coef(fu,full);const b=pad(S,26,26,40);const[top,bot]=rows(b,[1.35,1],44);
 const cf=v=>v===1?'':v+' ';const eqL=`${cf(k.m)}${sb(fu.f)} + ${cf(k.o)}O₂`,eqR=`${k.c?cf(k.c)+(full?'CO₂':'CO')+' + ':''}${cf(k.h)}H₂O`;T(eqL+'  →  '+eqR,top.l+top.w/2,top.t+6,{a:'center',f:'n',s:17,c:C.fg});
 const area={l:top.l,t:top.t+26,w:top.w,h:top.h-26};let sc=8;
 const fpos=(i,n,side)=>{const cols_=Math.ceil(Math.sqrt(n*1.4)),rowsN=Math.ceil(n/cols_);const cw=area.w*.36/cols_,rh=area.h/rowsN;return[(side?area.l+area.w*.62:area.l)+(i%cols_+.5)*cw,area.t+(Math.floor(i/cols_)+.5)*rh]};
 const atomsOf=f=>{const o=[];f.replace(/([A-Z])(\d*)/g,(_,e,n)=>{for(let i=0;i<(n?+n:1);i++)o.push(e)});return o};
 const L=[];for(let i=0;i<k.m;i++)L.push(fu.f);for(let i=0;i<k.o;i++)L.push('O2');const R=[];for(let i=0;i<k.c;i++)R.push(full?'CO2':'CO');for(let i=0;i<k.h;i++)R.push('H2O');
 const src=[],dst=[];L.forEach((f,i)=>{const[cx,cy]=fpos(i,L.length,0);const at=atomsOf(f),pk=pack(at.length);at.forEach((e,j)=>src.push({e,x:cx+pk[j][0]*sc*1.1,y:cy+pk[j][1]*sc*1.1}))});
 R.forEach((f,i)=>{const[cx,cy]=fpos(i,R.length,1);const at=atomsOf(f),pk=pack(at.length);at.forEach((e,j)=>dst.push({e,x:cx+pk[j][0]*sc*1.1,y:cy+pk[j][1]*sc*1.1}))});
sc=clamp(Math.sqrt(area.w*.36*area.h/(src.length*9)),3,9);src.length=0;dst.length=0;L.forEach((f,i)=>{const[cx,cy]=fpos(i,L.length,0);const at=atomsOf(f),pk=pack(at.length);at.forEach((e,j)=>src.push({e,x:cx+pk[j][0]*sc*1.1,y:cy+pk[j][1]*sc*1.1}))});R.forEach((f,i)=>{const[cx,cy]=fpos(i,R.length,1);const at=atomsOf(f),pk=pack(at.length);at.forEach((e,j)=>dst.push({e,x:cx+pk[j][0]*sc*1.1,y:cy+pk[j][1]*sc*1.1}))});
 const c=S.cyc,u=c<.3?0:c<.65?ease((c-.3)/.35):1;const used=new Array(dst.length).fill(false);
 src.forEach(a=>{let j=dst.findIndex((d,i)=>!used[i]&&d.e===a.e);let tx=a.x,ty=a.y;if(j>=0){used[j]=true;tx=dst[j].x;ty=dst[j].y}const x=lerp(a.x,tx,u),y=lerp(a.y,ty,u)-Math.sin(u*PI)*20;circ(x,y,AR[a.e]*sc/7,null,AC[a.e])});
 if(u>.4&&u<.9)glow(area.l+area.w/2,area.t+area.h/2,60,C.gold,(1-Math.abs(u-.65)/.25)*.5);arr(area.l+area.w*.42,area.t+area.h/2,area.l+area.w*.56,area.t+area.h/2,A(C.fg,.4),2,10);
 T(sb(fu.f)+' + O₂',area.l+area.w*.18,area.t+area.h+10,{a:'center',f:'n',s:12,c:C.fg2});T(full?'CO₂ + H₂O + energi':'CO + H₂O + energi',area.l+area.w*.8,area.t+area.h+10,{a:'center',f:'n',s:12,c:full?C.fg2:C.red});
 const[g1,g2]=cols(bot,[1,1],34);const keys=Object.keys(FU);const bar=(g,vals,lbl,unit,dec)=>{lab(g,lbl);const mx=Math.max(...vals)*1.1;const rh=g.h/keys.length;keys.forEach((kk,i)=>{const y=g.t+i*rh+rh*.12,h=rh*.76,w=(g.w-150)*vals[i]/mx;const cur=kk===S.p.fu;T(FU[kk].n.split(' (')[0],g.l+86,y+h/2,{a:'right',s:Math.min(11.5,rh*.6),c:cur?C.fg:C.fg3});rct(g.l+92,y,w,h,null,A(cur?C.gold:C.fg,cur?.85:.3));T(nf(vals[i],dec)+unit,g.l+96+w,y+h/2,{f:'n',s:Math.min(11,rh*.55),c:cur?C.fg:C.fg3})})};
 bar(g1,keys.map(kk=>FU[kk].H/FU[kk].M),'Energi per kg (MJ)','',0);bar(g2,keys.map(kk=>gkWh(FU[kk])),'CO₂ per kWh energi (gram)',' g',0)},
readout(S){const fu=FU[S.p.fu],kg=S.p.kg,n=kg*1000/fu.M,E=n*fu.H/3600,co2=n*fu.x*44.01/1000;return[['stoffmengde',nf(n,1)+' mol'],['energi',nf(E,1)+' kWh','gold'],[S.p.ox==='nok'?'CO₂ dannet':'CO dannet',nf(S.p.ox==='nok'?co2:n*fu.x*28.01/1000,2)+' kg',S.p.ox==='nok'?'':'red'],['CO₂ per kWh',nf(gkWh(fu),0)+' g']]},
live(S){const fu=FU[S.p.fu],kg=S.p.kg,n=kg*1000/fu.M;return `n=\\frac{${tn(kg*1000,0)}\\ \\text{g}}{${tn(fu.M,2)}\\ \\text{g/mol}}=${tn(n,1)}\\ \\text{mol},\\quad E=${tn(n,1)}\\cdot ${fu.H}\\ \\text{kJ}=${tn(n*fu.H/1000,1)}\\ \\text{MJ}`}
});
}

/* ---------- Miljøgifter i næringskjeden ---------- */
{
const SU={hg:{n:'Kvikksølv (metylkvikksølv)',c1:.004,bmf:4.5,th:1.5,lim:.5,col:'red'},pcb:{n:'PCB',c1:.0006,bmf:7,th:6,lim:null,col:'purple'},vl:{n:'Vannløselig stoff som brytes ned',c1:.004,bmf:.6,th:.05,lim:null,col:'teal'}};
const CH=['Planteplankton','Dyreplankton','Sild','Torsk','Sel','Isbjørn'];
M({id:'na-miljogift',s:'na',c:['NAT','BI2'],title:'Miljøgifter hoper seg opp i næringskjeden',short:'Miljøgifter',kw:'miljøgift kvikksølv pcb bioakkumulering biomagnifisering næringskjede fettløselig toppredator kostråd fisk forurensning helse miljø',
lead:'Noen miljøgifter brytes nesten ikke ned og lagres i fettet. Et dyr får i seg litt med hver matbit og skiller lite ut, så mengden øker gjennom livet. Rovdyr som spiser mange slike dyr, får enda mer.',
controls:[{id:'mode',type:'seg',label:'Vis',value:'kjede',options:[['kjede','Gjennom næringskjeden'],['liv','I én fisk gjennom livet']]},{id:'su',type:'sel',label:'Stoff',value:'hg',options:Object.entries(SU).map(([k,v])=>[k,v.n])},{id:'u',label:'Utslipp (relativt til i dag)',min:.1,max:3,step:.05,value:1,d:2},{id:'age',label:'Alder på fisken',min:0,max:15,step:.1,value:6,unit:'år',d:1,show:S=>S.p.mode==='liv'}],
tex:['\\text{bioakkumulering: opptak}>\\text{utskillelse}','\\text{biomagnifisering: }C_{\\text{neste ledd}}\\approx \\text{BMF}\\cdot C'],
about:['<strong>Bioakkumulering</strong>: Et stoff som tas opp raskere enn det skilles ut, hoper seg opp i kroppen. Fettløselige stoffer som PCB og metylkvikksølv har lang halveringstid i kroppen. Derfor har eldre og større fisk mer.','<strong>Biomagnifisering</strong>: Et rovdyr spiser mange byttedyr gjennom livet og får i seg giften fra alle. Konsentrasjonen blir høyere for hvert ledd i næringskjeden. Toppredatorer som sel og isbjørn får de høyeste nivåene.','Stoffer som er vannløselige eller brytes ned, skilles raskt ut og hoper seg ikke opp. Grafene bruker logaritmisk skala: hver strek er ti ganger mer.','Tiltak: Mange miljøgifter er forbudt gjennom internasjonale avtaler, som Stockholmkonvensjonen. Mattilsynet gir egne kostråd, blant annet for gravide, om enkelte fiskeslag. Tallene i modellen er forenklet.'],
tasks:['Hvor mange ganger høyere er konsentrasjonen av kvikksølv i isbjørn enn i planteplankton?','Hvorfor har en gammel torsk mer kvikksølv enn en ung?','Hvorfor hoper det vannløselige stoffet seg ikke opp?','Halver utslippene. Hva skjer med nivået i toppredatoren?'],
draw(S){const su=SU[S.p.su],u=S.v.u;const b=pad(S,30,30,40);if(S.p.mode==='liv')return this.liv(S,b,su,u);
 const conc=CH.map((_,i)=>su.c1*u*Math.pow(su.bmf,i));const[bl,br]=split(S,.5,{g:28,b});
 const n=CH.length,rh=bl.h/n;CH.forEach((nm,i)=>{const k=n-1-i,y=bl.t+k*rh;const w=bl.w*(.35+.65*(i/(n-1)))*.95;const x=bl.l+(bl.w-w)/2;rr(x,y+3,w,rh-6,6,A(C.fg,.2),A(C.teal,.06+.03*i),1.2);T(nm,x+8,y+rh/2,{s:12.5,w:700,c:C.fg});
  const nd=Math.round(clamp(6*(Math.log10(conc[i])+4),0,60));const rg=rng(i*7+1);for(let q=0;q<nd;q++)dot(x+w*.45+rg()*w*.5,y+8+rg()*(rh-16),2.2,A(C[su.col],.9));});
 lab(bl,'Hver prikk viser mer miljøgift (logaritmisk)');
 const P=Plane(-.6,n-.4,-4,2,{l:br.l+44,t:br.t+6,w:br.w-44,h:br.h-46});P.grid(1,{sy:1,minor:false,alpha:.06});P.axes({ys:1,xAt:-.6,yAt:-4,x0:true,y0:true,xf:()=>'',yf:v=>v>=0?nf(Math.pow(10,v),0):'0,'+'0'.repeat(-v-1)+'1'});lab({l:br.l,t:br.t+6},'Konsentrasjon (mg per kg), logaritmisk');
 conc.forEach((cv,i)=>{const v=Math.log10(cv);rct(P.X(i)-P.sx*.3,P.Y(Math.max(v,-4)),P.sx*.6,P.Y(-4)-P.Y(Math.max(v,-4)),null,A(C[su.col],.75));T(CH[i].slice(0,6),P.X(i),P.t+P.h+12,{a:'center',s:10.5,c:C.fg2})});
 if(su.lim){ln(P.l,P.Y(Math.log10(su.lim)),P.l+P.w,P.Y(Math.log10(su.lim)),C.yellow,1.4,[5,4]);T('grenseverdi i fisk: 0,5 mg/kg',P.l+4,P.Y(Math.log10(su.lim))-9,{s:11,c:C.yellow})}},
liv(S,b,su,u){const[bl,br]=split(S,.42,{g:28,b});const age=S.v.age;const C_=(a,s)=>{const kout=Math.LN2/s.th;return s.c1*u*Math.pow(s.bmf,3)*(1-Math.exp(-kout*a))};
 const cx=bl.l+bl.w/2,cy=bl.t+bl.h*.45,L=Math.min(bl.w*.85,40+age*bl.w*.06);X.beginPath();X.ellipse(cx,cy,L/2,L/5,0,0,TAU);X.fillStyle=A(C.fg2,.35);X.fill();poly([[cx+L/2-4,cy],[cx+L/2+L*.18,cy-L*.14],[cx+L/2+L*.18,cy+L*.14]],null,A(C.fg2,.35));dot(cx-L*.36,cy-L*.04,Math.max(2,L*.02),C.fg);
 const c=C_(age,su);const nd=Math.round(clamp(8*(Math.log10(c)+4),0,90));const rg=rng(3);for(let q=0;q<nd;q++){const a=rg()*TAU,r=Math.sqrt(rg());dot(cx+Math.cos(a)*r*L*.42,cy+Math.sin(a)*r*L*.16,2,A(C[su.col],.9))}
 T('Torsk, '+nf(age,1)+' år',cx,bl.t+14,{a:'center',s:14,w:700,c:C.fg});T(nf(c,3)+' mg/kg',cx,cy+L/5+18,{a:'center',f:'n',s:13,c:C[su.col]});
 const ym=Math.max(...Object.values(SU).map(s=>C_(15,s)))*1.15;const P=Plane(0,15,0,ym,{l:br.l+44,t:br.t+6,w:br.w-44,h:br.h-40});P.grid(1,{sy:niceStep(ym/5),minor:false,alpha:.06});P.axes({xs:3,ys:niceStep(ym/5),x0:true,y0:true,xl:'alder (år)',ls:12});lab({l:br.l,t:br.t+6},'Konsentrasjon i fisken (mg/kg) gjennom livet');
 Object.entries(SU).forEach(([k,s])=>{const cur=k===S.p.su;P.fn(a=>C_(a,s),cur?C[s.col]:A(C[s.col],.35),cur?2.8:1.5,{prog:1})});dot(P.X(age),P.Y(c),6,C[su.col]);if(su.lim&&su.lim<ym){ln(P.l,P.Y(su.lim),P.l+P.w,P.Y(su.lim),C.yellow,1.3,[5,4]);T('grenseverdi',P.l+4,P.Y(su.lim)-9,{s:11,c:C.yellow})}
 T('opptak > utskillelse: nivået stiger med alderen',P.l+P.w-4,P.t+10,{a:'right',s:11.5,c:C.fg3})},
readout(S){const su=SU[S.p.su],u=S.p.u;const c=CH.map((_,i)=>su.c1*u*Math.pow(su.bmf,i));return[['plankton',sci(c[0],2)+' mg/kg'],['isbjørn',sci(c[c.length-1],2)+' mg/kg',su.col],['økning gjennom kjeden',nf(c[c.length-1]/c[0],0)+' ×']]}
});
}

/* ---------- Næringsstoffer og kosthold ---------- */
{
/* per 100 g: karbohydrat, fett, protein, fiber (g), klimaavtrykk (kg CO2e per kg), farge */
const FD={ingen:['Ingen',0,0,0,0,0,'grey'],brod:['Grovbrød',40,3,10,7,1,'gold'],havre:['Havregryn',58,7,13,10,.9,'gold'],melk:['Lettmelk',4.5,1,3.5,0,1.3,'fg'],egg:['Egg',.3,10,13,0,3,'yellow'],kylling:['Kyllingfilet',0,2,22,0,5,'pink'],kjott:['Kjøttdeig av storfe',0,14,18,0,25,'red'],laks:['Laks',0,13,20,0,6,'pink'],bonner:['Bønner (kokte)',15,.5,8,6,1,'green'],potet:['Poteter',16,.1,2,1.5,.3,'gold'],pasta:['Pasta (kokt)',29,1,5,2,.7,'gold'],ris:['Ris (kokt)',30,.3,2.5,.4,1.2,'fg2'],gront:['Grønnsaker',4,.3,2.5,3,.5,'green'],frukt:['Frukt',12,.2,.4,2,.4,'red'],ost:['Gulost',0,27,27,0,9,'yellow'],sjoko:['Sjokolade',55,32,7,3,5,'purple'],brus:['Brus med sukker',10.6,0,0,0,.4,'blue']};
const kj=f=>17*f[1]+37*f[2]+17*f[3]+8*f[4];
const PRE={frokost:[['brod',120],['egg',60],['melk',250],['frukt',150]],kjott:[['kjott',150],['pasta',250],['gront',80],['brus',330]],bonne:[['bonner',200],['ris',200],['gront',150],['ingen',0]],laks:[['laks',150],['potet',200],['gront',150],['ingen',0]],snacks:[['sjoko',100],['brus',500],['ingen',0],['ingen',0]]};
const opts=Object.entries(FD).map(([k,v])=>[k,v[0]]);
M({id:'na-kosthold',s:'na',c:['NAT'],title:'Næringsstoffer i maten og klimaavtrykk',short:'Næringsstoffer og kosthold',kw:'kosthold næringsstoffer karbohydrater fett protein fiber energi kilojoule helse bærekraft klimaavtrykk mat måltid variert kosthold',
lead:'Maten gir oss energi og byggesteiner. Karbohydrater, fett og proteiner har ulike oppgaver i kroppen. Ulike matvarer gir også svært ulikt klimaavtrykk. Sett sammen et måltid og se hva det inneholder.',
controls:[{type:'btns',items:[['Frokost',S=>MOD['na-kosthold'].pre(S,'frokost')],['Kjøttdeig og pasta',S=>MOD['na-kosthold'].pre(S,'kjott')],['Bønnegryte',S=>MOD['na-kosthold'].pre(S,'bonne')],['Laks og poteter',S=>MOD['na-kosthold'].pre(S,'laks')],['Sjokolade og brus',S=>MOD['na-kosthold'].pre(S,'snacks')]]},
 ...[1,2,3,4].flatMap(i=>[{id:'f'+i,type:'sel',label:'Matvare '+i,value:PRE.kjott[i-1][0],options:opts},{id:'g'+i,label:'Mengde '+i,min:0,max:500,step:10,value:PRE.kjott[i-1][1],unit:'g'}])],
tex:['\\text{energi}\\approx 17\\tfrac{\\text{kJ}}{\\text{g}}\\cdot\\text{karbohydrat}+37\\tfrac{\\text{kJ}}{\\text{g}}\\cdot\\text{fett}+17\\tfrac{\\text{kJ}}{\\text{g}}\\cdot\\text{protein}'],
about:['<strong>Karbohydrater</strong> er kroppens viktigste energikilde. Fiber er karbohydrater vi ikke fordøyer, men som er viktige for tarmen. <strong>Fett</strong> gir mest energi per gram og trengs for å ta opp noen vitaminer. <strong>Proteiner</strong> er byggesteiner for muskler, enzymer og hormoner.','Helsedirektoratet anbefaler at omtrent 45–60 % av energien kommer fra karbohydrater, 25–40 % fra fett og 10–20 % fra protein, regnet over flere dager. Ett enkelt måltid trenger ikke treffe dette. Et variert kosthold gir også vitaminer og mineraler, som ikke er med her.','Klimaavtrykket måles i kilo CO₂-ekvivalenter. Kjøtt fra drøvtyggere som ku og sau gir mest, fordi dyrene slipper ut metan og trenger mye fôr. Belgfrukter og korn gir lite.','Tallene er omtrentlige gjennomsnittsverdier. Matvaretabellen.no har nøyaktige tall for norske matvarer.'],
tasks:['Sammenlign kjøttdeig og pasta med bønnegryte. Hvor mye lavere blir klimaavtrykket?','Hvilket næringsstoff gir mest energi per gram?','Hvorfor er fiber viktig selv om det nesten ikke gir energi?','Lag et måltid du liker som er innenfor anbefalt fordeling, og som har lavt klimaavtrykk.'],
pre(S,k){PRE[k].forEach(([f,g],i)=>{setP('f'+(i+1),f,S);setP('g'+(i+1),g,S);S.v['g'+(i+1)]=g})},
tot(S){let t={k:0,f:0,p:0,fib:0,co:0,E:0,m:0};const items=[];for(let i=1;i<=4;i++){const f=FD[S.p['f'+i]],g=f[0]==='Ingen'?0:S.v['g'+i];if(!g)continue;const r=g/100;t.k+=f[1]*r;t.f+=f[2]*r;t.p+=f[3]*r;t.fib+=f[4]*r;t.co+=f[5]*g/1000;t.E+=kj(f)*r;t.m+=g;items.push({f,g})}t.items=items;return t},
draw(S){const t=this.tot(S);const[bl,br]=split(S,.4,{g:28,b:pad(S,26,30,40)});const R=Math.min(bl.w,bl.h)/2-18,cx=bl.l+bl.w/2,cy=bl.t+bl.h/2;
 circ(cx,cy,R+10,A(C.fg,.3),A(C.fg,.06),2);let a0=-PI/2;t.items.forEach(({f,g})=>{const a1=a0+g/t.m*TAU;X.beginPath();X.moveTo(cx,cy);X.arc(cx,cy,R,a0,a1);X.closePath();X.fillStyle=A(C[f[6]],.55);X.fill();X.strokeStyle=C.stage;X.lineWidth=2;X.stroke();const am=(a0+a1)/2;if(a1-a0>.35)T(f[0],cx+Math.cos(am)*R*.6,cy+Math.sin(am)*R*.6,{a:'center',s:11.5,w:700,c:C.fg,bg:A(C.stage,.5)});a0=a1});
 if(!t.items.length)T('Tom tallerken',cx,cy,{a:'center',s:13,c:C.fg3});T(nf(t.m,0)+' g mat og drikke',cx,bl.t+bl.h,{a:'center',s:12,c:C.fg2});
 const[g1,g2,g3]=rows(br,[1,1.1,1],40);const Emac=17*t.k+37*t.f+17*t.p||1;const ek=17*t.k/Emac,ef=37*t.f/Emac,ep=17*t.p/Emac;
 lab(g1,'Energi');T(nf(t.E,0)+' kJ',g1.l,g1.t+14,{f:'n',s:22,w:700,c:C.fg});const nw=!isWide(S);if(!nw)Twrap(`karbohydrat ${nf(t.k,0)} g · fett ${nf(t.f,0)} g · protein ${nf(t.p,0)} g · fiber ${nf(t.fib,0)} g`,g1.l,g1.t+40,g1.w,{f:'n',s:11.5,c:C.fg2});
 lab(g2,'Andel av energien fra hvert næringsstoff');const bx=g2.l,bw=g2.w,by=g2.t+6,bh=22;[[ek,'gold','karbohydrat'],[ef,'pink','fett'],[ep,'teal','protein']].reduce((x,[v,c,n])=>{rct(x,by,bw*v,bh,null,A(C[c],.8));if(bw*v>60)T(n+' '+nf(v*100,0)+' %',x+5,by+bh/2,{s:11.5,w:700,c:C.stage});return x+bw*v},bx);
 const rec=[[.45,.6,'gold','karbohydrat 45–60 %'],[.25,.4,'pink','fett 25–40 %'],[.1,.2,'teal','protein 10–20 %']];rec.forEach(([lo,hi,c,n],i)=>{const y=by+bh+12+i*16;rct(bx+lo*bw,y,(hi-lo)*bw,8,null,A(C[c],.35));const v=[ek,ef,ep][i];dot(bx+v*bw,y+4,4,C[c]);T(n,bx+hi*bw+6,y+4,{s:11,c:v>=lo&&v<=hi?C[c]:C.fg3})});
 lab(g3,'Klimaavtrykk');T(nf(t.co,2)+' kg CO₂-ekv.',g3.l,g3.t+14,{f:'n',s:18,w:700,c:t.co>2?C.red:t.co>.8?C.gold:C.green});T(`tilsvarer omtrent ${nf(t.co/.12,0)} km med bensinbil`,g3.l,g3.t+38,{s:12,c:C.fg2});
 const mx=Math.max(...t.items.map(q=>q.f[5]*q.g/1000),.01);if(!nw)t.items.forEach(({f,g},i)=>{const y=g3.t+56+i*15,w=(g3.w*.55)*(f[5]*g/1000)/mx;T(f[0],g3.l+g3.w*.4-6,y,{a:'right',s:11,c:C.fg3});rct(g3.l+g3.w*.4,y-5,w,10,null,A(C[f[6]],.7));T(nf(f[5]*g/1000,2),g3.l+g3.w*.4+w+4,y,{f:'n',s:10.5,c:C.fg3})})},
readout(S){const t=this.tot(S);const Em=17*t.k+37*t.f+17*t.p||1;return[['energi',nf(t.E,0)+' kJ'],['karbohydrat',nf(17*t.k/Em*100,0)+' %','gold'],['fett',nf(37*t.f/Em*100,0)+' %','pink'],['protein',nf(17*t.p/Em*100,0)+' %','teal'],['klima',nf(t.co,2)+' kg CO₂e']]}
});
}

/* ---------- Relativ og absolutt risiko ---------- */
{
let off=null,ox_=null;
const binom_=(n,p)=>{if(n<=200){let k=0;for(let i=0;i<n;i++)if(Math.random()<p)k++;return k}const m=n*p,s=Math.sqrt(n*p*(1-p));return Math.max(0,Math.round(m+s*gauss()))};
M({id:'na-risiko',s:'na',c:['NAT','S1'],title:'Helsepåstander: relativ og absolutt risiko',short:'Relativ og absolutt risiko',kw:'risiko relativ risiko absolutt risiko helse påstand kilde studie utvalg tilfeldighet kildekritikk statistikk kreft livsstil overskrift',
lead:'«Dobbel risiko!» høres skummelt ut. Men dobbelt av hva? Her ser du forskjellen på relativ og absolutt risiko, og hvorfor små studier kan gi dramatiske resultater bare ved tilfeldighet.',
controls:[{id:'mode',type:'seg',label:'Vis',value:'risk',options:[['risk','Relativ og absolutt risiko'],['studie','Hvor sikker er en studie?']]},{id:'p0',label:'Grunnrisiko (per 10 000 personer)',min:1,max:3000,log:true,value:500,fmt:v=>nf(Math.round(v),0)},{id:'rr',label:'Relativ risiko (ganger så høy)',min:.25,max:20,log:true,value:1.18,fmt:v=>nf(v,2)+' ×'},
 {type:'btns',items:[['Eksempel: sjelden bivirkning dobles',S=>{setP('p0',2,S);setP('rr',2,S)}],['Eksempel: 18 % høyere risiko',S=>{setP('p0',500,S);setP('rr',1.18,S)}],['Eksempel: røyking og lungekreft',S=>{setP('p0',100,S);setP('rr',15,S)}]],show:S=>S.p.mode==='risk'},
 {id:'n',label:'Personer i hver gruppe i studien',min:20,max:20000,log:true,value:200,fmt:v=>nf(Math.round(v),0),show:S=>S.p.mode==='studie'},{type:'btns',items:[['Gjør én studie',S=>MOD['na-risiko'].study(S,1)],['Gjør 100 studier',S=>MOD['na-risiko'].study(S,100)],['Nullstill',S=>{S.st=[]}]],show:S=>S.p.mode==='studie'}],
tex:['\\text{relativ risiko}=\\frac{\\text{risiko med}}{\\text{risiko uten}}','\\text{absolutt forskjell}=\\text{risiko med}-\\text{risiko uten}'],
about:['<strong>Relativ risiko</strong> sier hvor mange ganger større risikoen blir. 18 % høyere risiko betyr relativ risiko 1,18. <strong>Absolutt risiko</strong> sier hvor mange som faktisk rammes. Er grunnrisikoen liten, blir den absolutte økningen også liten, selv om den relative er stor.','Overskrifter bruker ofte relativ risiko fordi det høres dramatisk ut. Spør alltid: Hvor mange rammes uten og med? Hvem har gjort studien? Hvor mange var med?','I en liten studie kan tilfeldigheter gi store utslag. Kjør mange små studier og se hvor ofte en studie finner «dobbel risiko» selv om den sanne effekten er liten. Store studier og mange studier som peker samme vei, er mer pålitelige.','Eksemplene er omtrentlige og ment for å vise sammenhengen. Pålitelige kilder for helseinformasjon er for eksempel helsenorge.no og Folkehelseinstituttet.'],
tasks:['En avis skriver at noe «dobler risikoen» for en sykdom som rammer 2 av 10 000. Hvor mange flere rammes?','Hva er størst: den absolutte økningen i eksemplet med 18 % høyere risiko, eller i eksemplet med sjelden bivirkning?','Kjør 100 studier med 50 personer i hver gruppe. Hvor mange av dem fant mer enn dobbel risiko?','Hva bør du sjekke før du stoler på en helsepåstand du finner på nett?'],
init(S){S.st=[]},
study(S,k){const n=Math.round(S.p.n),p0=S.p.p0/1e4,p1=Math.min(1,p0*S.p.rr);for(let i=0;i<k;i++){const a=binom_(n,p0),b=binom_(n,p1);S.st.push(a===0?(b===0?1:30):Math.min(30,Math.max(1/30,(b/n)/(a/n))))}if(S.st.length>2000)S.st.splice(0,S.st.length-2000)},
draw(S){const p0=S.v.p0/1e4,rr=S.v.rr,p1=Math.min(1,p0*rr);const b=pad(S,26,30,40);if(S.p.mode==='studie')return this.stud(S,b,p0,rr);
 let g1,g2,tx;if(isWide(S))[g1,g2,tx]=cols(b,[1,1,1],24);else{const[tp,bt]=rows(b,[1,1],20);[g1,g2]=cols(tp,[1,1],20);tx=bt}const N=100;if(!off){off=document.createElement('canvas');off.width=N;off.height=N;ox_=off.getContext('2d')}
 const grid=(g,p,lbl,col)=>{const s=Math.min(g.w,g.h-60);const img=ox_.createImageData(N,N),D=img.data;const k=Math.round(p*1e4);const ca=rgbOf(C[col]),cb=rgbOf(C.fg3),bg=rgbOf(C.stage);
  for(let i=0;i<N*N;i++){const r=Math.floor(i/N),c=i%N;const idx=c*N+r;const on=idx<k;const q=i*4;const cc=on?ca:cb;const a=on?1:.35;D[q]=bg[0]+(cc[0]-bg[0])*a;D[q+1]=bg[1]+(cc[1]-bg[1])*a;D[q+2]=bg[2]+(cc[2]-bg[2])*a;D[q+3]=255}
  ox_.putImageData(img,0,0);X.save();X.imageSmoothingEnabled=false;X.drawImage(off,g.l,g.t+20,s,s);X.restore();lab({l:g.l,t:g.t+20},lbl);T(`${nf(k,0)} av 10 000 rammes`,g.l,g.t+s+38,{f:'n',s:13,w:700,c:C[col]})};
 grid(g1,p0,'Uten (10 000 personer)','teal');grid(g2,p1,'Med','red');
 let y=tx.t+20;const L=(s_,c=C.fg2,sz=13,w=400)=>{y+=Twrap(s_,tx.l,y,tx.w,{s:sz,c,w})+10};
 L('Relativ risiko',C.fg3,11.5);L(rr>=1?`${nf(rr,2)} ganger så høy (+${nf((rr-1)*100,0)} %)`:`${nf(rr,2)} ganger (−${nf((1-rr)*100,0)} %)`,C.fg,18,700);y+=6;
 L('Absolutt risiko',C.fg3,11.5);L(`fra ${nf(p0*1e4,p0*1e4<10?1:0)} til ${nf(p1*1e4,p1*1e4<10?1:0)} av 10 000`,C.fg,16,700);L(`${rr>=1?'+':'−'}${nf(Math.abs(p1-p0)*1e4,Math.abs(p1-p0)*1e4<10?1:0)} personer per 10 000 (${nf(Math.abs(p1-p0)*100,2)} prosentpoeng)`,C.yellow,13);y+=6;
 if(rr>1.0001){L('Hvor mange må utsettes for at én ekstra skal rammes?',C.fg3,11.5);L(nf(1/(p1-p0),0)+' personer',C.fg,16,700)}},
stud(S,b,p0,rr){const[bl,br]=split(S,.62,{g:28,b});const P=Plane(Math.log10(1/30),Math.log10(30),0,1,{l:bl.l,t:bl.t+30,w:bl.w,h:bl.h-60});const ticks=[1/16,1/8,1/4,1/2,1,2,4,8,16];
 ln(P.l,P.Y(0),P.l+P.w,P.Y(0),A(C.fg,.6),1.4);ticks.forEach(v=>{const x=P.X(Math.log10(v));ln(x,P.Y(0)-4,x,P.Y(0)+4,C.fg2,1.2);T(v<1?'1/'+nf(1/v,0):nf(v,0),x,P.Y(0)+16,{a:'center',f:'n',s:11,c:C.fg2})});T('relativ risiko funnet i studien',P.l+P.w,P.Y(0)+34,{a:'right',s:11.5,c:C.fg3});
 rct(P.X(Math.log10(2)),P.t,P.l+P.w-P.X(Math.log10(2)),P.Y(0)-P.t,null,A(C.red,.07));T('«dobbel risiko»',P.l+P.w-4,P.t+10,{a:'right',s:11.5,c:C.red});rct(P.l,P.t,P.X(0)-P.l,P.Y(0)-P.t,null,A(C.blue,.06));T('«beskytter»',P.l+4,P.t+10,{s:11.5,c:C.blue});
 const nb=48,bw=(P.x1-P.x0)/nb,bins=new Array(nb).fill(0);S.st.forEach(v=>{const k=Math.floor((Math.log10(v)-P.x0)/bw);if(k>=0&&k<nb)bins[k]++});const bm=Math.max(5,...bins);bins.forEach((c,i)=>{if(c){const h=(P.Y(0)-P.t-24)*c/bm;rct(P.X(P.x0+i*bw)+1,P.Y(0)-h,bw*P.sx-2,h,null,A(C.teal,.75))}});
 ln(P.X(Math.log10(rr)),P.t+16,P.X(Math.log10(rr)),P.Y(0),C.yellow,2);T('sann verdi '+nf(rr,2),P.X(Math.log10(rr))+4,P.t+24,{s:11.5,c:C.yellow});lab({l:bl.l,t:bl.t+30},`Resultater fra ${S.st.length} studier med ${nf(Math.round(S.p.n),0)} personer i hver gruppe`);
 const n=S.st.length,d2=S.st.filter(v=>v>=2).length,lo=S.st.filter(v=>v<1).length;let y=br.t+30;const L=(s_,c=C.fg2,sz=13)=>{y+=Twrap(s_,br.l,y,br.w,{s:sz,c})+10};
 L(`Sann grunnrisiko: ${nf(p0*1e4,0)} av 10 000. Sann relativ risiko: ${nf(rr,2)}.`);if(n){L(`${nf(d2/n*100,0)} % av studiene fant mer enn dobbel risiko.`,C.red,14);L(`${nf(lo/n*100,0)} % fant at det tvert imot beskytter.`,C.blue,14)}else L('Trykk «Gjør 100 studier».',C.fg3);
 L('Små studier spriker mye. Det er derfor forskere ser på mange studier samlet før de konkluderer.',C.fg3,12)},
readout(S){const p0=S.p.p0/1e4,p1=Math.min(1,p0*S.p.rr);return[['uten',nf(p0*1e4,1)+' av 10 000','teal'],['med',nf(p1*1e4,1)+' av 10 000','red'],['relativ',(S.p.rr>=1?'+':'')+nf((S.p.rr-1)*100,0)+' %'],['absolutt',nf((p1-p0)*100,3)+' prosentpoeng','yellow']]}
});
}

/* ---------- Klimaendringer og artenes utbredelse ---------- */
{
const T0=16,LAP=.006;const ZN=[[10,'Skog','green'],[6,'Lavfjell: lyng og vier','gold'],[2,'Høyfjell: arktiske arter','teal'],[-99,'Snø og is','fg']];
const prof=(x,Hm)=>Hm*Math.max(0,.92*Math.exp(-(((x-.36)/.17)**2))+.68*Math.exp(-(((x-.72)/.14)**2))+.12*Math.sin(x*21)*.2+.05)*1.0;
const zoneOf=(h,dT)=>{const T=T0+dT-LAP*h;for(let i=0;i<ZN.length;i++)if(T>=ZN[i][0])return i;return 3};
const frac=(dT,Hm)=>{const c=[0,0,0,0];let tot=0;for(let i=0;i<=400;i++){const h=prof(i/400,Hm);if(h<=40)continue;c[zoneOf(h,dT)]++;tot++}return c.map(v=>v/(tot||1))};
M({id:'na-utbredelse',s:'na',c:['NAT','BI1','GEO'],title:'Klimaendringer og artenes utbredelse',short:'Arter i et varmere klima',kw:'klimaendringer utbredelse arter biologisk mangfold tregrense fjell oppvarming evolusjon tilpasning fjellrev rype utdøing temperatur høyde',
lead:'Hver art trives innenfor et bestemt temperaturområde. Når klimaet blir varmere, flytter grensene seg oppover i fjellet og nordover. Arter som allerede lever øverst, har ingen steder å flytte.',
controls:[{id:'dT',label:'Oppvarming',min:0,max:5,step:.1,value:0,unit:'°C',d:1},{id:'H',type:'seg',label:'Fjellet',value:'2400',options:[['1500','Lavt fjell (1500 m)'],['2400','Høyt fjell (2400 m)']]},{type:'btns',items:[['Spill av oppvarming',S=>{S.play=true;setP('dT',0,S);S.v.dT=0}]]}],
tex:['T(h)=T_0-0{,}6\\,^\\circ\\text{C}\\cdot\\frac{h}{100\\ \\text{m}}','\\Delta h=\\frac{\\Delta T}{0{,}006\\ ^\\circ\\text{C/m}}'],
about:['Temperaturen synker omtrent 0,6 °C for hver 100 meter opp. Tregrensen ligger omtrent der middeltemperaturen i juli er 10 °C. Blir det 1 °C varmere, flytter grensen seg rundt 170 meter oppover, hvis trærne får tid til å etablere seg.','Arter tilpasset kulde, som fjellrev, snøspurv og mange fjellplanter, presses oppover. Arealet blir mindre jo høyere opp de kommer, fordi fjellet smalner. På lave fjell kan høyfjellssonen forsvinne helt.','Arter kan også flytte nordover, og nye arter kommer inn fra sør. Det endrer konkurransen i økosystemene og kan redusere det biologiske mangfoldet.','Arter med kort generasjonstid kan tilpasse seg gjennom evolusjon. Når klimaet endrer seg raskt, rekker ofte ikke arter med lang generasjonstid å tilpasse seg.'],
tasks:['Hvor mye flytter tregrensen seg ved 2 °C oppvarming?','Hva skjer med høyfjellsartene på det lave fjellet når det blir 3 °C varmere?','Hvorfor er det et problem for fjellarter at fjellet smalner mot toppen?','Hvilke arter kan dra nytte av et varmere klima i Norge?'],
init(S){S.play=false},
update(S,dt){if(S.play){const v=Math.min(5,S.p.dT+dt*.5);setP('dT',Math.round(v*10)/10,S);S.v.dT=v;if(v>=5)S.play=false}},
draw(S){const dT=S.v.dT,Hm=+S.p.H;const[bl,br]=split(S,.6,{g:28,b:pad(S,30,30,40)});const P=Plane(0,1,0,2600,{l:bl.l+52,t:bl.t,w:bl.w-52,h:bl.h});const n=240;
 const pts=[];for(let i=0;i<=n;i++){const x=i/n;pts.push([x,prof(x,Hm)])}
 X.save();X.beginPath();X.moveTo(P.X(0),P.Y(0));pts.forEach(([x,h])=>X.lineTo(P.X(x),P.Y(h)));X.lineTo(P.X(1),P.Y(0));X.closePath();X.clip();
 let lo=0;ZN.forEach(([Tk,n_,c],i)=>{const hi=i<3?(T0+dT-Tk)/LAP:3000;rct(P.l,P.Y(hi),P.w,P.Y(lo)-P.Y(hi),null,i===3?A(C.fg,.85):A(C[c],.55));lo=hi});X.restore();
 pth(pts.map(([x,h])=>P.pt(x,h)),C.fg2,2);rct(P.l,P.Y(0),P.w,3,null,A(C.blue,.6));
 [10,6,2].forEach((Tk,i)=>{const h=(T0+dT-Tk)/LAP;const h0=(T0-Tk)/LAP;if(h<2600){ln(P.l,P.Y(h),P.l+P.w,P.Y(h),A(C.fg,.35),1,[4,4]);T(nf(h,0)+' m',P.l+P.w-4,P.Y(h)-8,{a:'right',f:'n',s:11,c:C.fg2})}if(dT>.05&&h0<2600)ln(P.l,P.Y(h0),P.l+40,P.Y(h0),A(C.yellow,.6),1.4);});
 const rg=rng(4);for(let i=0;i<60;i++){const x=rg(),h=prof(x,Hm)*rg();const z=zoneOf(h,dT);if(h<60)continue;const px=P.X(x),py=P.Y(h);if(z===0)poly([[px,py-8],[px-4,py+2],[px+4,py+2]],null,A(C.green,.95));else if(z===1){dot(px,py,2.2,C.gold)}else if(z===2){dot(px,py,2.5,C.fg);dot(px+2,py-2,1.4,C.teal)}}
 P.axes({ys:500,x:false,xAt:0,y0:true,yf:v=>nf(v,0)+' m'});T(dT>.05?'gule streker: grensene før oppvarmingen':'',P.l+44,P.t+12,{s:11,c:C.yellow});
 let ly=bl.t+bl.h+16;let lx=bl.l;ZN.forEach(([Tk,n_,c],i)=>{rct(lx,ly-5,12,10,null,i===3?C.fg:A(C[c],.8));T(n_,lx+16,ly,{s:11,c:C.fg2});lx+=tw(n_,{s:11})+34});
 const Q=Plane(0,5,0,1,{l:br.l+36,t:br.t+10,w:br.w-36,h:br.h*.6});Q.grid(1,{sy:.25,minor:false,alpha:.06});Q.axes({xs:1,ys:.25,x0:true,y0:true,yf:v=>nf(v*100,0)+' %',xl:'°C oppvarming',ls:12});lab({l:br.l,t:br.t+10},'Andel av fjellet i hver sone');
 [0,1,2].forEach(i=>{const pts2=[];for(let d=0;d<=5.001;d+=.1)pts2.push(Q.pt(d,frac(d,Hm)[i]));pth(pts2,C[ZN[i][2]],2.2)});const f=frac(dT,Hm);[0,1,2].forEach(i=>dot(Q.X(dT),Q.Y(f[i]),5,C[ZN[i][2]]));ln(Q.X(dT),Q.t,Q.X(dT),Q.Y(0),A(C.fg,.3),1,[3,3]);
 const f0=frac(0,Hm);let y=Q.t+Q.h+34;T(`Tregrensen: ${nf((T0+dT-10)/LAP,0)} m (+${nf(dT/LAP,0)} m)`,br.l,y,{f:'n',s:12,c:C.green});y+=20;T(`Høyfjell: ${nf(f[2]*100,0)} % av fjellet (før ${nf(f0[2]*100,0)} %)`,br.l,y,{f:'n',s:12,c:C.teal})},
readout(S){const dT=S.p.dT,Hm=+S.p.H,f=frac(dT,Hm);return[['tregrense',nf((T0+dT-10)/LAP,0)+' m','green'],['skog',nf(f[0]*100,0)+' %','green'],['lavfjell',nf(f[1]*100,0)+' %','gold'],['høyfjell',nf(f[2]*100,0)+' %','teal']]}
});
}

/* ---------- Genredigering med CRISPR ---------- */
{
const GC='FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG',BS='TCAG';
const AA3={F:'Phe',L:'Leu',S:'Ser',Y:'Tyr',C:'Cys',W:'Trp',P:'Pro',H:'His',Q:'Gln',R:'Arg',I:'Ile',M:'Met',T:'Thr',N:'Asn',K:'Lys',V:'Val',A:'Ala',D:'Asp',E:'Glu',G:'Gly','*':'STOPP'};
const tr=s=>{const o=[];for(let i=0;i+2<s.length;i+=3){const c=s.slice(i,i+3);const k=16*BS.indexOf(c[0])+4*BS.indexOf(c[1])+BS.indexOf(c[2]);o.push(AA3[GC[k]]);if(GC[k]==='*')break}return o};
const MUT='ATGGTGCACCTGACTCCTGTGGAGAAGTCTGCCGTTACTGCCCTG',FIX='ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTG';
const comp=b=>({A:'T',T:'A',G:'C',C:'G'}[b]);const BC={A:'green',T:'red',G:'yellow',C:'blue'};
const CUT=21,PAM=[15,18],PROTO=[18,38];
const PH=['Cas9 + guide-RNA','Leter etter PAM','Binder til DNA','Klipper','Reparasjon','Resultat'];
const DUR=2.8;
M({id:'na-crispr',s:'na',c:['NAT','BI2'],title:'Genredigering med CRISPR',short:'CRISPR',kw:'crispr cas9 genredigering genteknologi bioteknologi dna guide-rna sigdcelleanemi mutasjon gmo etikk genterapi',
lead:'CRISPR-Cas9 er en genetisk saks. Et kort RNA-stykke viser saksa hvor i DNA-et den skal klippe. Når cellen reparerer bruddet, kan genet slås av eller rettes opp. Her prøver vi å rette mutasjonen som gir sigdcelleanemi.',
hint:'Klikk på en fase i stripen øverst for å hoppe dit.',
controls:[{id:'mode',type:'seg',label:'Reparasjon',value:'hdr',options:[['hdr','Rett opp mutasjonen (med mal)'],['nhej','Slå av genet (uten mal)']]},{id:'sp',label:'Fart',min:.3,max:2,step:.1,value:1,d:1}],
tex:['\\text{guide-RNA (20 baser)}+\\text{Cas9}\\to\\text{klipp ved riktig sekvens}','\\text{GTG (Val)}\\to\\text{GAG (Glu)}'],
about:['Cas9 er et enzym fra bakterier, som bruker det til å klippe opp DNA fra virus. Forskerne lager et <strong>guide-RNA</strong> med 20 baser som passer til stedet i genet de vil endre. Cas9 klipper bare der guide-RNA passer, og der det står en kort <strong>PAM</strong>-sekvens (NGG) ved siden av.','Når DNA-et er klippet, reparerer cellen bruddet. Uten mal skjøtes endene ofte sammen med en liten feil. Da forskyves leserammen, proteinet blir ødelagt, og genet er i praksis slått av. Med en mal kan cellen kopiere inn en ny sekvens.','<strong>Sigdcelleanemi</strong> skyldes én baseendring i genet for hemoglobin: GAG er blitt til GTG, og aminosyren glutaminsyre (Glu) er byttet ut med valin (Val). I dag finnes en godkjent behandling basert på CRISPR, men den virker på en annen måte enn denne forenklede animasjonen.','Genredigering reiser etiske spørsmål: Er det greit å endre gener i embryoer, som arves videre? Hvem skal få tilgang til dyre behandlinger? Hva med genredigerte planter og dyr i matproduksjonen?'],
tasks:['Hvorfor trenger Cas9 et guide-RNA?','Hva skjer med proteinet når én base forsvinner ved reparasjonen?','Finn kodonet som er endret i den rettede sekvensen. Hvilken aminosyre blir byttet?','Diskuter: Bør det være lov å redigere gener i embryoer?'],
init(S){S.tt=0},
update(S,dt){S.tt+=dt*S.p.sp;if(S.tt>PH.length*DUR+2)S.tt=0},
draw(S){const nh=S.p.mode==='nhej';const tt=Math.min(S.tt,PH.length*DUR-.001),ph=Math.floor(tt/DUR),u=ease((tt-ph*DUR)/DUR);const b=pad(S,24,24,40);
 const n=PH.length,sw=b.w/n,ty=b.t+4;PH.forEach((nm,i)=>{rr(b.l+i*sw+2,ty-9,sw-4,18,4,null,i===ph?A(C.teal,.55):A(C.fg,.08));T(nm,b.l+i*sw+sw/2,ty,{a:'center',s:Math.min(11,sw/10),c:i===ph?C.fg:C.fg2})});rct(b.l+tt/(n*DUR)*b.w-1,ty-12,2,24,null,C.yellow);S.tl={ty,sw,l:b.l,n};
 const N=MUT.length,bw=Math.min(18,(b.w-20)/N),x0=b.l+(b.w-bw*N)/2,yT=b.t+b.h*.36,yB=yT+bw*2.6;
 let seqT=MUT.split('');let showCut=ph>=3,gap=0;if(ph===4){if(!nh){if(u>.5)seqT=FIX.split('')}}if(ph>=5)seqT=(nh?(MUT.slice(0,CUT)+MUT.slice(CUT+1)):FIX).split('');
 const open=ph===2?u:ph===3?1:ph===4?1-u:0;const sep=open*bw*1.4;
 const box=(x,y,ch,col,al=1)=>{rr(x+1,y-bw/2,bw-2,bw,3,null,A(C[col],.6*al));T(ch,x+bw/2,y,{a:'center',f:'n',s:bw*.62,c:A(C.fg,al)})};
 for(let i=0;i<seqT.length;i++){const x=x0+i*bw+(showCut&&ph<5&&i>=CUT?(ph===3?u*bw*.8:ph===4?(1-u)*bw*.8:0):0);const inP=i>=PROTO[0]&&i<PROTO[1];const yy=yT-(inP?sep:0);box(x,yy,seqT[i],BC[seqT[i]]);const bb=comp(seqT[i]);box(x,yB+(inP?sep:0),bb,BC[bb]);ln(x+bw/2,yy+bw/2,x+bw/2,yB+(inP?sep:0)-bw/2,A(C.fg,.18),1)}
 T("5'",x0-14,yT,{a:'center',f:'n',s:11,c:C.fg3});T("3'",x0-14,yB,{a:'center',f:'n',s:11,c:C.fg3});
 for(let c=0;c<Math.floor(seqT.length/3);c++){const x=x0+c*3*bw;ln(x,yT-bw*.8-sep*0,x,yT-bw*.55,A(C.fg,.3),1)}
 const pamX=x0+PAM[0]*bw,proX=x0+PROTO[0]*bw;if(ph>=1&&ph<=4){rct(pamX,yB+bw*.62,bw*3,3,null,C.gold);T('PAM',pamX+bw*1.5,yB+bw*1.25,{a:'center',s:11,c:C.gold})}
 if(ph>=2&&ph<=4){rct(proX,yT-bw*.75-sep,bw*20,3,null,A(C.pink,.8));T('guide-RNA passer her (20 baser)',proX+bw*10,yT-bw-sep-8,{a:'center',s:11,c:C.pink})}
 const casX=ph===0?lerp(b.l-80,x0+bw*4,u):ph===1?lerp(x0+bw*4,x0+(PROTO[0]+10)*bw,u):x0+(PROTO[0]+10)*bw,casY=(yT+yB)/2;
 if(ph<=4){X.beginPath();X.ellipse(casX,casY,bw*13,bw*3.3,0,0,TAU);X.fillStyle=A(C.purple,ph>=2?.25:.4);X.fill();X.strokeStyle=A(C.purple,.8);X.lineWidth=1.5;X.stroke();T('Cas9',casX-bw*11,casY-bw*3.6,{s:12,w:700,c:C.purple})
  if(ph>=2){for(let i=PROTO[0];i<PROTO[1];i++){const x=x0+i*bw;const cb=comp(MUT[i]);const rb=cb==='T'?'U':cb;T(rb,x+bw/2,yT-sep+bw*1.05,{a:'center',f:'n',s:bw*.55,c:A(C.pink,open)})}}else{T('guide-RNA',casX,casY,{a:'center',s:11,c:C.pink})}}
 if(ph===3||ph===4&&u<.4){const cx=x0+CUT*bw;glow(cx,(yT+yB)/2,22,C.red,.6*(ph===3?u:1));ln(cx,yT-bw,cx,yB+bw,A(C.red,.8),2,[3,3]);T('✂',cx,yT-bw*1.9,{a:'center',s:18,c:C.red})}
 if(ph===4){T(nh?'Endene skjøtes sammen, men én base går tapt':'Cellen kopierer riktig sekvens fra en mal (donor-DNA)',b.l+b.w/2,yB+bw*2.4,{a:'center',s:13,w:700,c:nh?C.red:C.green});if(!nh){const mx=x0+(CUT-6)*bw;for(let i=0;i<12;i++){const ch=FIX[CUT-6+i];box(mx+i*bw,yB+bw*4+(1-u)*bw*2,ch,BC[ch],.8)}T('mal',mx-20,yB+bw*4,{a:'right',s:11,c:C.fg3})}}
 const ry=b.t+b.h*.82;const aaM=tr(MUT),aaN=tr(seqT.join(''));lab({l:b.l,t:ry-12},'Proteinet som lages (aminosyrer)');
 const row=(aa,y,ref)=>aa.forEach((a,i)=>{const x=x0+i*3*bw;const diff=ref&&ref[i]!==a;rr(x+2,y-10,bw*3-4,20,4,null,a==='STOPP'?A(C.red,.6):diff?A(C.yellow,.45):A(C.fg,.08));T(a,x+bw*1.5,y,{a:'center',f:'n',s:Math.min(11,bw*.75),c:C.fg})});
 if(ph<5){row(aaM,ry,null);T('Val i posisjon 7 gir sigdceller',x0+6*3*bw+bw*1.5,ry+22,{a:'center',s:11,c:C.yellow})}else{row(aaN,ry,aaM);T(nh?'Leserammen er forskjøvet: alle aminosyrene etter klippet blir feil. Proteinet virker ikke.':'Glu er tilbake i posisjon 7: normalt hemoglobin.',b.l+b.w/2,ry+24,{a:'center',s:12.5,w:700,c:nh?C.red:C.green})}},
click(S,x,y){const t=S.tl;if(t&&Math.abs(y-t.ty)<14){const i=Math.floor((x-t.l)/t.sw);if(i>=0&&i<t.n)S.tt=i*DUR+.01}},
readout(S){const ph=Math.min(PH.length-1,Math.floor(S.tt/DUR));return[['fase',PH[ph]],['reparasjon',S.p.mode==='nhej'?'uten mal: genet slås av':'med mal: mutasjonen rettes'],['kodon 7',S.p.mode==='nhej'?'forskjøvet':'GTG → GAG','yellow']]}
});
}

/* ---------- Risikovurdering og avfall ---------- */
{
const BINS=['Vasken med mye vann','Nøytraliser, så vasken','Kanne for organiske løsemidler','Avfall med tungmetaller'];
const CHEM=[{n:'Saltsyre, HCl',k:'2 mol/L',p:['utrop'],h:'Irriterer hud og øyne.',v:'vernebriller, hansker',b:1},{n:'Natriumhydroksid, NaOH',k:'1 mol/L',p:['etsende'],h:'Gir alvorlige etseskader på hud og øyne.',v:'vernebriller, hansker',b:1},
 {n:'Etanol',k:'96 %',p:['flamme','utrop'],h:'Meget brannfarlig. Irriterer øynene.',v:'vernebriller, ingen åpen flamme',b:2},{n:'Heptan',k:'ren væske',p:['flamme','helse','utrop','miljo'],h:'Meget brannfarlig. Kan være dødelig ved svelging. Giftig for liv i vann.',v:'vernebriller, avtrekk',b:2},
 {n:'Kobbersulfatløsning, CuSO₄',k:'0,5 mol/L',p:['utrop','miljo'],h:'Farlig ved svelging. Irriterer øyne og hud. Meget giftig for liv i vann.',v:'vernebriller, hansker',b:3},{n:'Sølvnitratløsning, AgNO₃',k:'0,1 mol/L',p:['utrop','miljo'],h:'Irriterer øyne og hud. Meget giftig for liv i vann.',v:'vernebriller, hansker',b:3},
 {n:'Natriumkloridløsning, NaCl',k:'1 mol/L',p:[],h:'Ikke klassifisert som farlig.',v:'vernebriller (alltid på lab)',b:0},{n:'Hydrogenperoksid, H₂O₂',k:'3 %',p:['utrop'],h:'Irriterer øynene.',v:'vernebriller',b:0},{n:'Eddiksyre, CH₃COOH',k:'1 mol/L',p:['utrop'],h:'Irriterer hud og øyne.',v:'vernebriller, hansker',b:1},{n:'Diklormetan, CH₂Cl₂',k:'ren væske',p:['helse','utrop'],h:'Mistenkt for å kunne gi kreft. Irriterer hud og øyne.',v:'vernebriller, hansker, avtrekk',b:2}];
const PN={flamme:'Brannfarlig',etsende:'Etsende',utrop:'Farlig (helse)',helse:'Helsefare',miljo:'Miljøfare',giftig:'Giftig'};
function picto(cx,cy,s,k){X.save();X.translate(cx,cy);X.beginPath();X.moveTo(0,-s);X.lineTo(s,0);X.lineTo(0,s);X.lineTo(-s,0);X.closePath();X.fillStyle='#ffffff';X.fill();X.strokeStyle='#e03030';X.lineWidth=s*.12;X.stroke();X.fillStyle='#111';X.strokeStyle='#111';X.lineWidth=s*.06;const u=s/10;
 if(k==='utrop'){X.fillRect(-u*.8,-u*5.5,u*1.6,u*6.5);X.beginPath();X.arc(0,u*3.2,u*1,0,TAU);X.fill()}
 else if(k==='flamme'){X.beginPath();X.moveTo(-u*3,u*3);X.bezierCurveTo(-u*4.5,-u*1,-u*.5,-u*2,0,-u*6);X.bezierCurveTo(u*1,-u*2.5,u*4.5,-u*1.5,u*3,u*3);X.closePath();X.fill();X.fillRect(-u*4,u*4,u*8,u*1)}
 else if(k==='etsende'){X.save();X.rotate(-.5);X.fillRect(-u*5,-u*5,u*1.5,u*4);X.restore();X.save();X.rotate(.5);X.fillRect(u*3.5,-u*5,u*1.5,u*4);X.restore();for(let i=0;i<3;i++){X.beginPath();X.arc(-u*2+i*u*2,-u*.5+i*.3*u,u*.5,0,TAU);X.fill()}X.fillRect(-u*5,u*2.5,u*4,u*1.6);X.beginPath();X.moveTo(u*1,u*2.5);X.lineTo(u*5,u*2.5);X.lineTo(u*5,u*4.5);X.lineTo(u*1,u*4.5);X.closePath();X.fill()}
 else if(k==='helse'){X.beginPath();X.arc(0,-u*4,u*1.3,0,TAU);X.fill();X.beginPath();X.moveTo(-u*3,u*5);X.lineTo(-u*3,-u*1.5);X.quadraticCurveTo(0,-u*3,u*3,-u*1.5);X.lineTo(u*3,u*5);X.closePath();X.fill();X.fillStyle='#fff';for(let i=0;i<8;i++){const a=i/8*TAU;X.beginPath();X.moveTo(0,u*.8);X.lineTo(Math.cos(a)*u*1.8,u*.8+Math.sin(a)*u*1.8);X.lineTo(Math.cos(a+.3)*u*.6,u*.8+Math.sin(a+.3)*u*.6);X.fill()}}
 else if(k==='miljo'){X.lineWidth=u*.6;X.beginPath();X.moveTo(-u*3,u*4);X.lineTo(-u*3,-u*4);X.moveTo(-u*3,-u*2);X.lineTo(-u*5,-u*4);X.moveTo(-u*3,-u*1);X.lineTo(-u*1,-u*3);X.stroke();X.beginPath();X.ellipse(u*2.2,u*2.5,u*2.2,u*1,0,0,TAU);X.fill();X.beginPath();X.moveTo(u*4,u*2.5);X.lineTo(u*5.5,u*1.5);X.lineTo(u*5.5,u*3.5);X.fill();X.fillRect(-u*5.5,u*4,u*11,u*.6)}
 else if(k==='giftig'){X.beginPath();X.arc(0,-u*2,u*2.6,0,TAU);X.fill();X.fillRect(-u*1.6,-u*.5,u*3.2,u*2);X.lineWidth=u*1;X.beginPath();X.moveTo(-u*4,u*2);X.lineTo(u*4,u*5);X.moveTo(u*4,u*2);X.lineTo(-u*4,u*5);X.stroke()}
 X.restore()}
M({id:'na-sikkerhet',s:'na',c:['NAT','KJ1'],title:'Risikovurdering og avfall på laben',short:'Sikkerhet og avfall',kw:'risikovurdering sikkerhet laboratorium farepiktogram faresymbol avfall kjemikalier hms verneutstyr sikkerhetsdatablad etsende brannfarlig miljøfare tungmetaller',
lead:'Før et forsøk må du vite hvilke farer kjemikaliene har, hvilket verneutstyr du trenger, og hvor avfallet skal. Farepiktogrammene gir et raskt overblikk. Sorter kjemikaliene til riktig avfall.',
hint:'Klikk på avfallsbeholderen du mener er riktig.',
controls:[{type:'btns',items:[['Neste kjemikalie',S=>MOD['na-sikkerhet'].next(S)],['Start på nytt',S=>MOD['na-sikkerhet'].init(S)]]},{id:'vis',type:'check',label:'Vis riktig svar',value:false}],
tex:['\\text{fare}\\times\\text{eksponering}=\\text{risiko}'],
about:['En <strong>risikovurdering</strong> svarer på: Hva kan gå galt? Hvor sannsynlig er det, og hvor alvorlig? Hva gjør vi for å unngå det? Informasjonen finner du i <strong>sikkerhetsdatabladet</strong> for hvert kjemikalie.','<strong>Farepiktogrammene</strong> er røde ruter med svart symbol: flamme (brannfarlig), etsende, utropstegn (helsefarlig, irriterende), helsefare (alvorlig langtidsvirkning), miljø (giftig for liv i vann) og hodeskalle (giftig).','<strong>Avfall</strong>: Ufarlige vannløsninger kan helles i vasken med mye vann. Syrer og baser nøytraliseres først. Organiske løsemidler samles i egne kanner, og løsninger med tungmetaller som kobber og sølv samles separat fordi de er giftige for livet i vann.','Dette er forenklede retningslinjer. Følg alltid skolens egne rutiner og sikkerhetsdatabladet.'],
tasks:['Hvorfor skal ikke kobbersulfat helles i vasken?','Hvilket verneutstyr bruker du alltid på laben?','Hva er forskjellen på piktogrammet med utropstegn og piktogrammet med helsefare?','Lag en risikovurdering for et forsøk der du løser kobbersulfat i vann.'],
init(S){S.ord=CHEM.map((_,i)=>i).sort(()=>Math.random()-.5);S.i=0;S.score=0;S.n=0;S.fb=null},
next(S){S.i=(S.i+1)%S.ord.length;S.fb=null},
update(S,dt){if(S.fb){S.fbT=(S.fbT||0)+dt;if(S.fbT>3){S.fbT=0;this.next(S)}}},
draw(S){const ch=CHEM[S.ord[S.i]];const b=pad(S,26,26,40);const[top,bot]=rows(b,[1.25,1],30);
 const card={l:top.l,t:top.t,w:Math.min(top.w,560),h:top.h};rr(card.l,card.t,card.w,card.h,8,A(C.fg,.25),A(C.fg,.05),1.4);
 T(ch.n,card.l+16,card.t+24,{s:18,w:700,c:C.fg});T(ch.k,card.l+16,card.t+46,{f:'n',s:13,c:C.fg2});
 const ps=clamp((card.h-140)/2.6,12,30),py=card.t+60+ps;ch.p.forEach((k,i)=>{const x=card.l+16+ps+i*(ps*2.6),y=py;picto(x,y,ps,k);T(PN[k],x,y+ps+11,{a:'center',s:10.5,c:C.fg2})});if(!ch.p.length)T('ingen farepiktogram',card.l+16,py,{s:12.5,c:C.fg3});
 Twrap('Fare: '+ch.h,card.l+16,py+ps+30,card.w-32,{s:12.5,c:C.fg});T('Verneutstyr: '+ch.v,card.l+16,card.t+card.h-14,{s:12,c:C.teal});
 T(`Poeng: ${S.score} av ${S.n}`,card.l+card.w-16,card.t+24,{a:'right',f:'n',s:13,w:700,c:C.fg2});
 const bw=(bot.w-30)/4;S.bins=[];BINS.forEach((nm,i)=>{const x=bot.l+i*(bw+10),y=bot.t+10,h=bot.h-14;const right=(S.p.vis||S.fb)&&i===ch.b,wrong=S.fb&&!S.fb.ok&&i===S.fb.pick;rr(x,y,bw,h,8,right?C.green:wrong?C.red:A(C.fg,.35),right?A(C.green,.15):wrong?A(C.red,.12):A(C.fg,.04),right||wrong?2.4:1.4);
  const cx=x+bw/2;rr(cx-bw*.18,y+h*.18,bw*.36,h*.38,4,A(C.fg,.5),null,1.4);rct(cx-bw*.22,y+h*.14,bw*.44,4,null,A(C.fg,.6));Twrap(nm,x+8,y+h*.66,bw-16,{s:Math.min(12,bw/12),c:C.fg});S.bins.push({x,y,w:bw,h})});
 if(S.fb)T(S.fb.ok?'Riktig!':'Ikke helt. Riktig er: '+BINS[ch.b],bot.l,bot.t-6,{s:12.5,w:700,c:S.fb.ok?C.green:C.red})},
click(S,x,y){if(!S.bins||S.fb)return;const ch=CHEM[S.ord[S.i]];S.bins.forEach((bb,i)=>{if(x>=bb.x&&x<=bb.x+bb.w&&y>=bb.y&&y<=bb.y+bb.h){const ok=i===ch.b;S.fb={ok,pick:i};S.n++;if(ok)S.score++}})},
readout(S){const ch=CHEM[S.ord[S.i]];return[['kjemikalie',ch.n],['poeng',`${S.score} av ${S.n}`,'green']]}
});
}
