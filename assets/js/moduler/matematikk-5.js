'use strict';
/* ================= MATEMATIKK (del 5) ================= */

/* ---------- Standardavvik steg for steg ---------- */
{
const SETT={A:[6,8,10,12,14,10],lite:[9,10,10,11,9,11],stor:[3,5,10,15,17,10]};
const STEG=[[1,'1. Gjennomsnitt'],[2,'2. Avvik'],[3,'3. Kvadrer'],[4,'4. Snitt av kvadratene'],[5,'5. Kvadratrot']];
const TXT={1:['Gjennomsnittet er balansepunktet','Legg sammen alle verdiene og del på antallet. Tenk deg at punktene er like tunge lodd på en vippe.'],
 2:['Avvik: hvor langt er hvert punkt fra gjennomsnittet?','Avvikene til høyre er positive og til venstre negative. Summen av avvikene er alltid 0, så snittet av dem sier ingenting.'],
 3:['Kvadrer avvikene','Hvert avvik blir siden i et kvadrat. Arealet er avviket opphøyd i andre, og det er aldri negativt. Store avvik gir svært store kvadrater.'],
 4:['Finn gjennomsnittet av kvadratene','Flytt alle kvadratene til samme hjørne. Det gule kvadratet har gjennomsnittsarealet. Det arealet kalles variansen.'],
 5:['Ta kvadratroten','Siden i det gule kvadratet er standardavviket σ. Det har samme enhet som dataene, og de fleste punktene ligger mindre enn ett standardavvik fra gjennomsnittet.']};
const stat=d=>{const n=d.length,m=d.reduce((a,b)=>a+b,0)/n,dv=d.map(x=>x-m),q=dv.map(v=>v*v),v=q.reduce((a,b)=>a+b,0)/n;return{n,m,dv,q,v,s:Math.sqrt(v)}};
/* tall med høyst to desimaler, uten unødvendige nuller */
const nn=x=>{let r=nf(Math.abs(x)<5e-3?0:x,2);if(r.includes(','))r=r.replace(/0+$/,'').replace(/,$/,'');return r};
const sg=x=>Math.abs(x)<5e-3?'0':(x>0?'+':'')+nn(x);
/* x̄ tegnet som kursiv x med strek over (kombinerende strek vises dårlig i lerretet) */
function xb(x,y,rest,o){const s=o.s||13,a=o.a||'left',c=o.c||C.fg;const w=tw('x',{f:'m',s:s*1.15})+tw(rest,{f:'n',s});const x0=a==='center'?x-w/2:a==='right'?x-w:x;Tm('x',x0,y,{s:s*1.15,c});const xw=tw('x',{f:'m',s:s*1.15});ln(x0+1,y-s*.62,x0+xw+1,y-s*.62,c,1.2);T(rest,x0+xw+1,y,{f:'n',s,c,w:o.w})}
const tt=x=>nn(x).replace('−','-').replace(',','{,}');
M({id:'ma-standardavvik',s:'ma',c:['2P'],title:'Standardavvik steg for steg',short:'Standardavvik',kw:'standardavvik varians spredning spredningsmål avvik gjennomsnitt kvadrat kvadratrot sigma statistikk datasett uteligger stdav',
lead:'Standardavviket forteller hvor langt verdiene typisk ligger fra gjennomsnittet. Gå gjennom de fem stegene og se hvordan tallet blir til: avvik, kvadrater, gjennomsnitt og kvadratrot.',
hint:'Dra punktene langs tallinja. Klikk på linja for å legge til et punkt.',
controls:[{id:'st',type:'seg',label:'Steg',value:1,options:STEG},{type:'btns',items:[['Neste steg',S=>setP('st',Math.min(5,S.p.st+1),S)],['Spill av alle stegene',S=>{setP('st',1,S);S.auto=.01}]]},
 {type:'btns',items:[['Prøveresultater',S=>MOD['ma-standardavvik'].set(S,'A')],['Liten spredning',S=>MOD['ma-standardavvik'].set(S,'lite')],['Stor spredning',S=>MOD['ma-standardavvik'].set(S,'stor')],['Legg til uteligger',S=>{if(S.d.length<10)S.d.push(20)}],['Fjern siste punkt',S=>{if(S.d.length>2)S.d.pop()}]]}],
tex:['\\bar x=\\frac{x_1+x_2+\\dots+x_n}{n}','\\text{avvik}=x_i-\\bar x','\\sigma^2=\\frac{(x_1-\\bar x)^2+(x_2-\\bar x)^2+\\dots+(x_n-\\bar x)^2}{n}','\\sigma=\\sqrt{\\sigma^2}'],
about:['Punktene er poeng på en prøve med maks 20 poeng. Standardavviket $\\sigma$ måler spredningen: hvor langt verdiene typisk ligger fra gjennomsnittet $\\bar x$.','Vi kan ikke bare ta gjennomsnittet av avvikene, for de positive og de negative avvikene opphever hverandre alltid. Når vi <strong>kvadrerer</strong> avvikene, blir alle positive. Kvadratene er tegnet som ekte kvadrater: siden er avviket og arealet er avviket i andre.','Gjennomsnittet av kvadratene kalles <strong>variansen</strong>, $\\sigma^2$. Den har enheten «poeng i andre», som er vanskelig å tolke. Derfor tar vi <strong>kvadratroten</strong> og får standardavviket, som har samme enhet som dataene.','Fordi avvikene kvadreres, teller store avvik mye. Én uteligger kan derfor øke standardavviket kraftig. I GeoGebra gir kommandoen Standardavvik( ) dette tallet. Utvalgsstandardavviket $s$ deler på $n-1$ i stedet for $n$ og blir litt større.'],
tasks:['Hvorfor blir summen av avvikene alltid 0? Dra i punktene og sjekk.','Sammenlign «Liten spredning» og «Stor spredning». Begge har gjennomsnitt 10. Hva skjer med kvadratene og med σ?','Legg til en uteligger. Hvorfor øker standardavviket så mye mer enn gjennomsnittet?','Dra punktene slik at σ = 0. Hvordan ser datasettet ut da?','Regn ut standardavviket for 4, 6 og 8 for hånd. Sjekk svaret ved å lage det samme datasettet her.'],
init(S){S.d=[...SETT.A];S.x=[...S.d];S.f=1;S.auto=0;S.ym=6},
set(S,k){S.d=[...SETT[k]]},
update(S,dt){S.f=smooth(S.f,S.p.st,dt,3.2);
 if(S.auto){S.auto+=dt;if(S.auto>3.4){S.auto=.01;if(S.p.st<5)setP('st',S.p.st+1,S);else S.auto=0}}
 while(S.x.length<S.d.length)S.x.push(S.d[S.x.length]);S.x.length=S.d.length;S.x=S.x.map((x,i)=>i===S.dr?S.d[i]:smooth(x,S.d[i],dt,9));
 const R=stat(S.x);S.ym=smooth(S.ym,Math.max(3.5,...R.dv.map(Math.abs))+.9,dt,4)},
geom(S){const b=pad(S,30,S.W<560?78:64,40);return Plane(-1,21,-S.ym,S.ym,b,true)},
draw(S){const P=this.geom(S);S.P=P;const xs=S.x,R=stat(xs),f=S.f,m=R.m,y0=P.Y(0);
 const k1=clamp(f-1,0,1),k2=clamp(f-2,0,1),k3=ease(clamp(f-3,0,1)),kq=clamp((f-3)*1.7-.7,0,1),k4=ease(clamp(f-4,0,1));
 const step=clamp(Math.round(f),1,5),[ti,su]=TXT[step];T(ti,30,22,{f:'d',s:S.W<560?19:22,w:500,c:C.fg});Twrap(su,30,S.W<560?46:48,S.W-60,{s:13,c:C.fg2});
 if(k4>0){const a=P.X(m-R.s*k4),b=P.X(m+R.s*k4);rct(a,P.t,b-a,P.h,null,A(C.yellow,.07*k4))}
 ln(P.X(m),P.t,P.X(m),P.t+P.h,A(C.blue,.55),1.4,[5,5]);xb(P.X(m)+6,P.t+12,' = '+nn(m),{s:12.5,c:C.blue});
 ln(P.X(0),y0,P.X(20),y0,A(C.fg,.85),1.6);for(let v=0;v<=20;v++){const q=P.X(v);ln(q,y0-(v%2?3:5),q,y0+(v%2?3:5),A(C.fg,.7),1.2);if(v%2===0)T(String(v),q,y0+16,{a:'center',f:'n',s:11,c:C.fg3})}
 T('poeng',P.X(20)+8,y0,{s:12,c:C.fg3});
 if(k1<1){const al=1-k1;X.globalAlpha=al;poly([[P.X(m),y0+3],[P.X(m)-11,y0+19],[P.X(m)+11,y0+19]],null,A(C.blue,.8));X.globalAlpha=1}
 const col=d=>Math.abs(d)<5e-3?C.fg2:d>0?C.teal:C.red;
 /* kvadrater: vokser fra avviket, flyttes så til samme hjørne */
 if(k2>0){const ord=R.dv.map((d,i)=>i).sort((i,j)=>Math.abs(R.dv[j])-Math.abs(R.dv[i]));
  ord.forEach(i=>{const d=R.dv[i],a=Math.abs(d);if(a<.01)return;const xl=lerp(Math.min(m,xs[i]),m,k3),yb=lerp(d>0?0:-a*k2,0,k3),h=a*k2;const c=col(d);
   const px=P.X(xl),py=P.Y(yb+h),w=a*P.sx,hh=h*P.sy;rct(px,py,w,hh,A(c,.85*(1-.5*k4)),A(c,(.16-.08*k3)*(1-.4*k4)),1.6);
   if(k3<.3&&w>24&&hh>18)T(nn(R.q[i]),px+w/2,py+hh/2,{a:'center',f:'n',s:Math.min(14,w/3),c:A(C.fg,(1-k3/.3)*k2)})})}
 if(kq>0){const s=R.s,px=P.X(m),w=s*P.sx;rct(px,P.Y(s),w,w,A(C.yellow,kq),A(C.yellow,.28*kq),2.6);
  X.globalAlpha=kq;T((k4>.5?'σ² = ':'snittareal = ')+nn(R.v),px+w+8,P.Y(s)+10,{f:'n',s:13,w:500,c:C.yellow});X.globalAlpha=1}
 /* avvik som piler under tallinja */
 const al1=k1*(1-k2);if(al1>.02){const gap=Math.min(13,(P.t+P.h-y0-34)/R.n);X.globalAlpha=al1;R.dv.forEach((d,i)=>{const y=y0+30+i*gap;if(Math.abs(d)<.01){dot(P.X(m),y,2.5,C.fg2);return}arr(P.X(m),y,P.X(xs[i]),y,col(d),2,8);T(sg(d),P.X(xs[i])+(d>0?6:-6),y,{a:d>0?'left':'right',f:'n',s:11,c:col(d)})});X.globalAlpha=1}
 if(k4>0){const yy=y0+30,a=P.X(m-R.s),b=P.X(m+R.s);X.globalAlpha=k4;ln(P.X(m),yy,b,yy,C.yellow,4);ln(a,yy,P.X(m),yy,A(C.yellow,.6),4,[6,4]);[a,b].forEach(q=>ln(q,yy-7,q,yy+7,C.yellow,2));T('σ = '+nf(R.s,2),b+8,yy,{f:'n',s:14,w:500,c:C.yellow});xb(a,yy+20,' − σ',{a:'center',s:11,c:C.fg2});xb(b,yy+20,' + σ',{a:'center',s:11,c:C.fg2});X.globalAlpha=1}
 /* punktene, stablet når flere har samme verdi */
 const cnt={};S.pts=xs.map((x,i)=>{const key=Math.round(S.d[i]*100);const k=cnt[key]=(cnt[key]||0)+1;return[P.X(x),y0-(k-1)*15,i]});
 S.pts.forEach(([px,py,i])=>{const d=R.dv[i],c=mix(C.fg,col(d),k1),inb=k4>0&&Math.abs(d)<=R.s+1e-9;if(inb)glow(px,py,16,C.yellow,.35*k4);circ(px,py,7.5,A(C.stage,1),c,2);dot(px,py,7.5,c)});
 const line={1:`Gjennomsnitt = (${S.d.map(nn).join(' + ')}) / ${R.n} = ${nn(m)}`,2:`Avvik: ${R.dv.map(sg).join(',  ')}    Sum = 0`,3:`Kvadrater: ${R.q.map(nn).join(' + ')} = ${nn(R.q.reduce((a,b)=>a+b,0))}`,4:`Varians: σ² = ${nn(R.q.reduce((a,b)=>a+b,0))} / ${R.n} = ${nn(R.v)}`,5:`σ = √${nn(R.v)} ≈ ${nf(R.s,2)}   ·   ${R.dv.filter(d=>Math.abs(d)<=R.s+1e-9).length} av ${R.n} punkter ligger i det gule feltet`}[step];
 Twrap(line,30,S.H-24,S.W-200,{f:'n',s:12.5,c:C.fg})},
pick(S,x,y){for(const[px,py,i]of (S.pts||[]).slice().reverse())if(near(x,y,px,py,16)){S.dr=i;return{move:mx=>{S.d[i]=clamp(Math.round(S.P.ix(mx)),0,20);S.x[i]=S.d[i]},up:()=>{S.dr=-1}}}},
click(S,x,y){const P=S.P;if(!P||S.d.length>=10)return;if(Math.abs(y-P.Y(0))<26){const v=Math.round(P.ix(x));if(v>=0&&v<=20)S.d.push(v)}},
readout(S){const R=stat(S.d);return[['n',R.n],['x̄',nn(R.m),'blue'],['sum av avvik','0'],['varians σ²',nn(R.v)],['σ',nf(R.s,2),'yellow']]},
live(S){const R=stat(S.d);return`\\begin{aligned}\\sigma&=\\sqrt{\\frac{${R.q.map(tt).join('+')}}{${R.n}}}\\\\&=\\sqrt{${tt(R.v)}}\\approx ${tn(R.s,2)}\\end{aligned}`}
});
}
