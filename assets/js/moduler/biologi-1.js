'use strict';
/* ================= BIOLOGI (del 1) ================= */

/* ---------- Diffusjon og osmose ---------- */
{
const CIN={dyr:.9,plante:.9};
M({id:'bi-osmose',s:'bi',c:['BI1','NAT'],title:'Diffusjon og osmose',short:'Osmose',kw:'osmose diffusjon membran halvgjennomtrengelig celle konsentrasjon hypoton hyperton isoton plasmolyse turgor rød blodcelle vann cellemembran',
lead:'Vann beveger seg gjennom en membran mot siden med mest oppløst stoff. Det kalles osmose. Store molekyler slipper ikke gjennom membranen, og derfor kan vann presses inn i eller trekkes ut av en celle.',
controls:[{id:'mode',type:'seg',label:'Forsøk',value:'u',options:[['u','Kar med membran'],['dyr','Rød blodcelle'],['plante','Plantecelle']]},
 {id:'nL',label:'Oppløst stoff til venstre',min:0,max:40,step:1,value:30,show:S=>S.p.mode==='u'},{id:'nR',label:'Oppløst stoff til høyre',min:0,max:40,step:1,value:6,show:S=>S.p.mode==='u'},
 {id:'mem',type:'seg',label:'Membran',value:'semi',options:[['semi','Bare vann slipper gjennom'],['alt','Alt slipper gjennom']],show:S=>S.p.mode==='u'},
 {id:'c',label:'Saltinnhold i vannet rundt',min:0,max:3.5,step:.05,value:.9,unit:'%',d:2,show:S=>S.p.mode!=='u'},
 {type:'btns',items:[['Kranvann (0 %)',S=>setP('c',0,S)],['Fysiologisk saltvann (0,9 %)',S=>setP('c',.9,S)],['Sjøvann (3,5 %)',S=>setP('c',3.5,S)]],show:S=>S.p.mode!=='u'},
 {type:'btns',items:[['Start på nytt',S=>MOD['bi-osmose'].init(S)]]}],
tex:['\\text{vann strømmer mot høyest konsentrasjon av oppløst stoff}','c=\\frac{n}{V}'],
about:['<strong>Diffusjon</strong> er at molekyler sprer seg fra høy til lav konsentrasjon fordi de beveger seg tilfeldig. Velger du en membran som slipper alt gjennom, jevner konsentrasjonene seg ut, og vannstanden blir lik.','En <strong>halvgjennomtrengelig membran</strong> slipper vann gjennom, men ikke de store molekylene. Da går vannet mot siden med mest oppløst stoff, og vannstanden stiger der. Trykket fra den høye vannsøylen stopper til slutt strømmen.','En rød blodcelle har omtrent samme saltinnhold som 0,9 % saltvann. I rent vann (<strong>hypoton</strong> løsning) suger den til seg vann og kan sprekke. I sjøvann (<strong>hyperton</strong>) mister den vann og skrumper.','Plantecellen har en stiv cellevegg. I ferskvann presser den seg mot veggen og blir stinn (<strong>turgor</strong>). I saltvann trekker innholdet seg bort fra veggen: <strong>plasmolyse</strong>.'],
tasks:['Hva skjer med vannstanden hvis begge sider har like mye oppløst stoff?','Hvorfor stopper vannstrømmen før konsentrasjonene er like med en halvgjennomtrengelig membran?','Hvorfor får man saltvann og ikke rent vann i blodårene på sykehuset?','Hvorfor visner salat når du har på dressing lenge før du spiser?'],
init(S){S.hL=.5;S.hR=.5;S.nL=S.p.nL;S.nR=S.p.nR;S.fx=0;S.J=0;const r=()=>({x:Math.random(),y:Math.random(),vx:0,vy:0});S.sL=[...Array(S.nL)].map(r);S.sR=[...Array(S.nR)].map(r);S.V=1;S.burst=0;S.dV=0;S.fl=[]},
change(S,id){if(id==='nL'||id==='nR'||id==='mode'||id==='mem')this.init(S);if(id==='c'&&S.burst&&S.p.c>=.6){S.burst=0;S.V=.9}},
update(S,dt){const p=S.p;
 if(p.mode==='u'){const a=.012,k=.5;const pL=-a*S.nL/S.hL+S.hL,pR=-a*S.nR/S.hR+S.hR;let J=p.mem==='semi'?k*(pL-pR):k*(S.hL-S.hR);J=clamp(J,-.2,.2);S.hL=clamp(S.hL-J*dt,.12,.95);S.hR=clamp(S.hR+J*dt,.12,.95);S.J=J;
  if(p.mem==='alt'){S.fx+=3*(S.nL/S.hL-S.nR/S.hR)*dt*.025;while(S.fx>=1&&S.sL.length){S.fx-=1;S.sL.pop();S.nL--;S.sR.push({x:.02,y:Math.random(),vx:0,vy:0});S.nR++}while(S.fx<=-1&&S.sR.length){S.fx+=1;S.sR.pop();S.nR--;S.sL.push({x:.98,y:Math.random(),vx:0,vy:0});S.nL++}}
  [S.sL,S.sR].forEach(arr_=>arr_.forEach(q=>{q.vx+=(Math.random()-.5)*dt*3;q.vy+=(Math.random()-.5)*dt*3;q.vx*=.96;q.vy*=.96;q.x=clamp(q.x+q.vx*dt,.04,.96);q.y=clamp(q.y+q.vy*dt,.04,.96)}));
  if(Math.random()<Math.abs(J)*dt*60)S.fl.push({t:0,y:Math.random(),d:Math.sign(J)})}
 else{const cin=CIN[p.mode],co=Math.max(p.c,.03);let Veq=p.mode==='dyr'?.4+.6*cin/co:.3+.7*cin/co;S.turg=p.mode==='plante'?Math.max(0,Veq-1):0;if(p.mode==='plante')Veq=Math.min(Veq,1);if(!S.burst){const dv=1.2*(Veq-S.V)*dt;S.V+=dv;S.dV=dv/dt;if(p.mode==='dyr'&&S.V>1.7){S.burst=S.t}}
  if(Math.random()<Math.abs(S.dV)*dt*40)S.fl.push({t:0,a:Math.random()*TAU,d:Math.sign(S.dV)})}
 S.fl.forEach(f=>f.t+=dt);S.fl=S.fl.filter(f=>f.t<1)},
draw(S){const p=S.p;
 if(p.mode==='u'){const b=pad(S,40,44,30);const tw_=Math.min(b.w,b.h*1.6),bx=b.l+(b.w-tw_)/2,mid=bx+tw_/2,bot=b.t+b.h,H=b.h;
  const wy=h=>bot-h*H;const rL={l:bx,t:wy(S.hL),w:tw_/2-3,h:S.hL*H},rR={l:mid+3,t:wy(S.hR),w:tw_/2-3,h:S.hR*H};
  [rL,rR].forEach(r=>{rct(r.l,r.t,r.w,r.h,null,A(C.blue,.2));ln(r.l,r.t,r.l+r.w,r.t,A(C.blue,.7),1.6);const n=Math.round(r.w*r.h/260),rg=rng(Math.round(r.l));for(let i=0;i<n;i++){const x=r.l+rg()*r.w+Math.sin(S.t*3+i)*2,y=r.t+rg()*r.h+Math.cos(S.t*2.6+i*1.7)*2;dot(x,y,1.8,A(C.blue,.75))}});
  S.sL.forEach(q=>sphere(rL.l+8+q.x*(rL.w-16),rL.t+8+q.y*(rL.h-16),6,C.purple));S.sR.forEach(q=>sphere(rR.l+8+q.x*(rR.w-16),rR.t+8+q.y*(rR.h-16),6,C.purple));
  ln(bx,b.t,bx,bot,C.fg2,2.5);ln(bx+tw_,b.t,bx+tw_,bot,C.fg2,2.5);ln(bx,bot,bx+tw_,bot,C.fg2,2.5);
  for(let y=b.t;y<bot;y+=14)ln(mid,y,mid,y+8,C.gold,3);T('membran',mid,b.t-12,{a:'center',s:12,c:C.gold});
  S.fl.forEach(f=>{const y=bot-f.y*Math.min(S.hL,S.hR)*H,x=mid+(f.t-.5)*40*(f.d>0?1:-1);dot(x,y,2.6,A(C.blue,1-f.t))});
  if(Math.abs(S.J)>.003){const d=S.J>0?1:-1;arr(mid-d*36,bot-24,mid+d*36,bot-24,C.blue,3,11);T('netto vannstrøm',mid,bot-42,{a:'center',s:12,c:C.blue,bg:A(C.stage,.6)})}
  const dh=(S.hL-S.hR)*100;if(Math.abs(dh)>2){const yh=Math.min(rL.t,rR.t),yl=Math.max(rL.t,rR.t),xx=S.hL>S.hR?bx-14:bx+tw_+14;ln(xx,yh,xx,yl,C.fg2,1.5);T('Δh',xx+(S.hL>S.hR?-6:6),(yh+yl)/2,{a:S.hL>S.hR?'right':'left',f:'m',s:16,c:C.fg2})}
  const sh=tw_<520;T(sh?`${S.nL} stoffmolekyler`:`venstre: ${S.nL} stoffmolekyler`,bx,b.t-12,{s:sh?11:12.5,c:C.fg2});T(sh?`${S.nR} stoffmolekyler`:`høyre: ${S.nR} stoffmolekyler`,bx+tw_,b.t-12,{a:'right',s:sh?11:12.5,c:C.fg2});return}
 const b=pad(S,30,30,30);const co=p.c,cin=CIN[p.mode];const tone=co<cin-.1?'hypoton':co>cin+.1?'hyperton':'isoton';
 rct(b.l,b.t,b.w,b.h,null,A(C.blue,.06+.05*Math.min(co,3.5)/3.5));const rg=rng(5);for(let i=0;i<Math.round(co*40);i++)dot(b.l+rg()*b.w,b.t+rg()*b.h,2.2,A(C.fg2,.5));
 const cx=b.l+b.w/2,cy=b.t+b.h/2;
 if(p.mode==='dyr'){const R0=Math.min(b.w,b.h)*.18;const cells=[[0,0],[-.32,-.22],[.3,.24],[.34,-.28],[-.3,.26]];
  cells.forEach(([ox,oy],ci)=>{const x=cx+ox*b.w*.9,y=cy+oy*b.h*.9;const V=S.V*(1+ci*.03);if(S.burst){const age=S.t-S.burst;for(let k=0;k<7;k++){const a=k/7*TAU+ci;const r=R0*.5+age*R0*.4;circ(x+Math.cos(a)*r,y+Math.sin(a)*r,R0*.18,A(C.red,.5),null,1.6)}glow(x,y,R0*1.2,C.red,.25*Math.max(0,1-age/3));return}
   const r=R0*Math.sqrt(V),spikes=V<.85?(.85-V)*.6:0;const pts=[];for(let i=0;i<=72;i++){const a=i/72*TAU;const rr_=r*(1+spikes*Math.max(0,Math.sin(a*14))*1.6);pts.push([x+Math.cos(a)*rr_,y+Math.sin(a)*rr_])}poly(pts,mix(C.red,C.stage,.2),A(C.red,.75),2);
   const pale=clamp(1.25-V,0,1);circ(x,y,r*.45,null,A(mix(C.red,'#ffffff',.5),.35*pale))});
  S.fl.forEach(f=>{const r1=R0*1.5,r0=R0*.7;const r=f.d>0?lerp(r1,r0,f.t):lerp(r0,r1,f.t);dot(cx+Math.cos(f.a)*r,cy+Math.sin(f.a)*r,2.6,A(C.blue,1-f.t))});
  T(S.burst?'Cellene sprekker (hemolyse)':S.V<.85?'Cellene mister vann og skrumper':S.V>1.15?'Cellene tar opp vann og sveller':'Cellene beholder formen',b.l+8,b.t+16,{s:14,w:700,c:C.fg,bg:A(C.stage,.6)})}
 else{const W=Math.min(b.w*.5,b.h*.95*1.4),H=W/1.4,x0=cx-W/2,y0=cy-H/2;rr(x0,y0,W,H,10,mix(C.green,C.fg,.2),A(C.green,.08),6);
  const s=Math.sqrt(Math.min(1,S.V)),iw=(W-16)*s,ih=(H-16)*s,ix=cx-iw/2,iy=cy-ih/2;rr(ix,iy,iw,ih,10+(1-s)*Math.min(iw,ih)*.45,A(C.green,.9),A(C.green,.18),2);
  const vs=clamp((S.V-.3)/.7,.15,1);rr(cx-iw*.38*vs-iw*.08,cy-ih*.32*vs,iw*.76*vs,ih*.64*vs,12,A(C.teal,.6),A(C.teal,.2),1.5);T('vakuole',cx,cy,{a:'center',s:12,c:C.teal});
  const rg2=rng(9);for(let i=0;i<14;i++){const a=i/14*TAU;dot(cx+Math.cos(a)*iw*.42,cy+Math.sin(a)*ih*.4,4.5,C.green)}circ(ix+iw*.18,iy+ih*.25,Math.min(iw,ih)*.08,null,A(C.purple,.6));
  if(S.turg>.02){for(let k=0;k<8;k++){const a=k/8*TAU;const ex=cx+Math.cos(a)*(W/2-14),ey=cy+Math.sin(a)*(H/2-14);arr(ex-Math.cos(a)*16,ey-Math.sin(a)*16,ex,ey,A(C.yellow,clamp(S.turg*3,.2,1)),2,7)}}
  S.fl.forEach(f=>{const r1=W*.62,r0=W*.4;const r=f.d>0?lerp(r1,r0,f.t):lerp(r0,r1,f.t);dot(cx+Math.cos(f.a)*r,cy+Math.sin(f.a)*r*.72,2.6,A(C.blue,1-f.t))});
  T('cellevegg',x0+W-8,y0-10,{a:'right',s:12,c:C.green});T(S.V<.95?'Plasmolyse: innholdet trekker seg bort fra celleveggen':S.turg>.02?'Turgor: cellen er stinn og presser mot veggen':'Cellen er i likevekt med vannet rundt',b.l+8,b.t+16,{s:14,w:700,c:C.fg,bg:A(C.stage,.6)})}
 T(`Vannet rundt er ${tone} (${nf(co,2)} % salt)`,b.l+8,b.t+b.h-12,{s:12.5,c:C.fg2,bg:A(C.stage,.6)})},
readout(S){const p=S.p;if(p.mode==='u')return[['konsentrasjon venstre',nf(S.nL/S.hL/40,2)+' (rel.)','purple'],['konsentrasjon høyre',nf(S.nR/S.hR/40,2)+' (rel.)','purple'],['nivåforskjell',nf((S.hL-S.hR)*100,0)+' mm']];return[['salt ute',nf(p.c,2)+' %'],['salt inne',nf(CIN[p.mode],2)+' %'],['cellevolum',S.burst?'sprukket':nf(S.V*100,0)+' %','red']]}
});
}

/* ---------- Mitose og meiose ---------- */
{
const CH=[{L:.34,par:'m',pr:0},{L:.34,par:'p',pr:0},{L:.2,par:'m',pr:1},{L:.2,par:'p',pr:1}];
const NM={mitose:['Interfase','Profase','Metafase','Anafase','Telofase','Cytokinese'],meiose:['Interfase','Profase I','Metafase I','Anafase I','Telofase I','Metafase II','Anafase II','Telofase II']};
const DS={mitose:['DNA-et kopieres. Hvert kromosom får to like kromatider.','Kromosomene kveiler seg sammen og blir synlige. Kjernemembranen løses opp.','Kromosomene stiller seg opp på midten. Spoletråder fester seg fra hver pol.','Søsterkromatidene trekkes fra hverandre mot hver sin pol.','Nye kjernemembraner dannes rundt hver gruppe med kromosomer.','Cellen snøres av. Resultatet er to like celler med 2n = 4.'],
 meiose:['DNA-et kopieres. Hvert kromosom får to like kromatider.','Homologe kromosomer fra mor og far legger seg i par. Ved overkrysning bytter de biter.','Parene stiller seg opp på midten. Hvilken side morens og farens kromosom havner på, er tilfeldig.','De homologe kromosomene trekkes fra hverandre. Søsterkromatidene henger fortsatt sammen.','To celler med n = 2 kromosomer. Hvert kromosom har fortsatt to kromatider.','I hver celle stiller kromosomene seg opp på nytt.','Søsterkromatidene trekkes fra hverandre.','Fire kjønnsceller med n = 2 kromosomer. Alle er genetisk forskjellige.']};
const BASE=[[-.28,-.12,.6],[.22,.16,-.4],[-.06,.3,1.4],[.3,-.24,2.2]];
function kf(type,ph,k,s,or){const c=CH[k],sd=s?1:-1,[bx,by,ba]=BASE[k];const prp=a=>[-Math.sin(a),Math.cos(a)];
 if(ph<0){return[bx,by,ba,0]}
 if(ph===0){const q=prp(ba);return[bx+q[0]*.012*sd,by+q[1]*.012*sd,ba,0]}
 if(type==='mitose'){const ys=[-.45,.14,-.16,.42][k];switch(ph){case 1:{const q=prp(ba);return[bx+q[0]*.03*sd,by+q[1]*.03*sd,ba,1]}case 2:return[sd*.03,ys,PI/2,1];case 3:return[sd*.62,ys*.75,PI/2,1];case 4:return[sd*.74,ys*.55,PI/2+sd*.25,.45];default:return[sd*.95,ys*.48,PI/2+sd*.4,.15]}}
 const pr=c.pr,yp=pr?.25:-.25,o=or[pr],side=(c.par==='m'?-1:1)*o;
 switch(ph){case 1:{const cx=pr?.18:-.2,cy=pr?.22:-.12,a=pr?-.3:.5,q=prp(a),off=(c.par==='m'?-.05:.05)+sd*.02;return[cx+q[0]*off,cy+q[1]*off,a,1]}
  case 2:return[side*.065+sd*.022,yp,PI/2,1];case 3:return[side*.6+sd*.022,yp*.8,PI/2,1];case 4:return[side*.62+sd*.022,yp*.6,PI/2,.7];
  case 5:return[side*.62+(pr?.12:-.12),sd*.025,0,1];case 6:return[side*.62+(pr?.12:-.12),sd*.3,0,1];default:return[side*.62+(pr?.12:-.12),sd*.42,0,.3]}}
function cells(type,ph){const one=[[0,0,1],[0,0,1],[0,0,1],[0,0,1]];if(ph<=2)return one;
 if(type==='mitose'){if(ph===3)return[[-.12,0,.95],[-.12,0,.95],[.12,0,.95],[.12,0,.95]];if(ph===4)return[[-.48,0,.7],[-.48,0,.7],[.48,0,.7],[.48,0,.7]];return[[-.95,0,.62],[-.95,0,.62],[.95,0,.62],[.95,0,.62]]}
 if(ph===3)return[[-.12,0,.95],[-.12,0,.95],[.12,0,.95],[.12,0,.95]];if(ph===4||ph===5)return[[-.62,0,.62],[-.62,0,.62],[.62,0,.62],[.62,0,.62]];if(ph===6)return[[-.62,-.1,.58],[-.62,.1,.58],[.62,-.1,.58],[.62,.1,.58]];return[[-.62,-.38,.38],[-.62,.38,.38],[.62,-.38,.38],[.62,.38,.38]]}
const DUR=2.6;
M({id:'bi-celledeling',s:'bi',c:['BI1','NAT'],title:'Celledeling: mitose og meiose',short:'Mitose og meiose',kw:'celledeling mitose meiose kromosom kromatid homologe overkrysning kjønnsceller haploid diploid kromosomtall arv variasjon cellesyklus',
lead:'Ved mitose deler en celle seg i to helt like celler. Det skjer når kroppen vokser og reparerer seg. Ved meiose blir det fire kjønnsceller med halvparten så mange kromosomer, og alle er forskjellige.',
hint:'Klikk på en fase i stripen øverst for å hoppe dit.',
controls:[{id:'type',type:'seg',label:'Celledeling',value:'mitose',options:[['mitose','Mitose'],['meiose','Meiose']]},{id:'co',type:'check',label:'Overkrysning (meiose)',value:true},{id:'sp',label:'Fart',min:.3,max:2,step:.1,value:1},{type:'btns',items:[['Ny tilfeldig fordeling',S=>{S.or=[Math.random()<.5?1:-1,Math.random()<.5?1:-1];S.tt=0}]]}],
tex:['\\text{mitose: }2n\\to 2n+2n','\\text{meiose: }2n\\to n+n+n+n','\\text{mulige kombinasjoner uten overkrysning: }2^{n}'],
about:['Cellen her har to kromosompar, så 2n = 4. Røde kromosomer kommer fra mor og blå fra far. Det lange og det korte kromosomet er hvert sitt par av <strong>homologe</strong> kromosomer.','I <strong>mitose</strong> trekkes de to søsterkromatidene i hvert kromosom fra hverandre. Begge dattercellene får derfor nøyaktig samme sett med kromosomer som morcellen.','I <strong>meiose</strong> skjer det to delinger. Først skilles de homologe parene, deretter søsterkromatidene. Resultatet er fire celler med ett kromosom fra hvert par.','To ting gir variasjon: Det er tilfeldig hvilken vei hvert par snur i metafase I (uavhengig fordeling), og ved <strong>overkrysning</strong> bytter homologe kromosomer biter. Mennesket har 23 par, så uavhengig fordeling alene gir over 8 millioner kombinasjoner.'],
tasks:['Hvor mange kromosomer har hver dattercelle etter mitose og etter meiose her?','Trykk «Ny tilfeldig fordeling» flere ganger. Hvor mange ulike kombinasjoner av røde og blå kromosomer kan en kjønnscelle få når 2n = 4?','Regn ut 2²³. Hva forteller tallet om mennesker?','Hvorfor er det viktig at celledeling reguleres? Hva kan skje hvis den ikke blir det?'],
init(S){S.tt=0;S.or=[1,-1]},
change(S,id){if(id==='type')S.tt=0},
update(S,dt){const n=NM[S.p.type].length;S.tt+=dt*S.p.sp;if(S.tt>n*DUR+2.2){S.tt=0;if(S.p.type==='meiose')S.or=[Math.random()<.5?1:-1,Math.random()<.5?1:-1]}},
geo(S){const b=pad(S,20,112,22);const Rc=Math.min(b.w/3.2,b.h/2.25);return{b,Rc,cx:b.l+b.w/2,cy:b.t+b.h/2}},
draw(S){const type=S.p.type,names=NM[type],n=names.length;const G=this.geo(S);S.G=G;const{b,Rc,cx,cy}=G;
 const tt=Math.min(S.tt,n*DUR-.001),ph=Math.floor(tt/DUR),u=ease((tt-ph*DUR)/DUR);const P=(x,y)=>[cx+x*Rc,cy+y*Rc];
 const cA=cells(type,ph-1),cB=cells(type,ph),cc=cA.map((c,i)=>c.map((v,j)=>lerp(v,cB[i][j],u)));
 cc.forEach(([x,y,r])=>circ(...P(x,y),r*Rc,mix(C.teal,C.fg,.2),null,6));cc.forEach(([x,y,r])=>circ(...P(x,y),r*Rc-1,null,mix(C.teal,C.stage,.86)));
 const nuc=(x,y,r,a)=>{if(a<=0)return;X.globalAlpha=a;X.setLineDash([5,5]);circ(...P(x,y),r*Rc,A(C.purple,.8),A(C.purple,.06),1.6);X.setLineDash([]);X.globalAlpha=1};
 if(ph===0)nuc(0,0,.62,1);if(ph===1)nuc(0,0,.62,1-u);
 if(type==='mitose'){if(ph===4)[-1,1].forEach(s=>nuc(s*.74,0,.38,u));if(ph===5)[-1,1].forEach(s=>nuc(s*.95,0,.36,1))}else{if(ph===4)[-1,1].forEach(s=>nuc(s*.62,0,.32,u));if(ph===7)[[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([sx,sy])=>nuc(sx*.62,sy*.42,.22,u))}
 const or=S.or,co=S.p.co&&type==='meiose'&&(ph>1||(ph===1&&u>.6));
 const items=[];for(let k=0;k<4;k++)for(let s=0;s<2;s++){const a=kf(type,ph-1,k,s,or),bq=kf(type,ph,k,s,or);const q=a.map((v,i)=>lerp(v,bq[i],u));const c=CH[k];let c0=c.par==='m'?C.red:C.blue,c1=c0;if(co){if((k===0&&s===1)||(k===2&&s===0))c1=C.blue;if((k===1&&s===0)||(k===3&&s===1))c1=C.red}items.push({k,s,q,c0,c1,L:c.L})}
 const spindle=type==='mitose'?(ph===2||ph===3):(ph===2||ph===3||ph===5||ph===6);
 if(spindle){const al=ph===2||ph===5?u:1;X.globalAlpha=.55*al;items.forEach(it=>{const[x,y]=it.q;let pole;if(type==='mitose')pole=[it.s?1.05:-1.05,0];else if(ph<=3)pole=[x<0?-1.05:1.05,0];else pole=[x<0?-.62:.62,it.s?.66:-.66];ln(...P(x,y),...P(...pole),A(C.fg,.6),1)});X.globalAlpha=1;
  const poles=type==='mitose'||ph<=3?[[-1.05,0],[1.05,0]]:[[-.62,-.66],[-.62,.66],[.62,-.66],[.62,.66]];poles.forEach(pp=>dot(...P(...pp),4,C.gold))}
 items.forEach(it=>{const[x,y,a,cond]=it.q;const Lp=it.L*Rc*(1+(1-cond)*1.3),w=lerp(1.6,.055*Rc,cond);const dx=Math.cos(a),dy=Math.sin(a),px=-dy,py=dx;
  const seg=(t0,t1,col)=>{const pts=[];for(let i=0;i<=24;i++){const t=lerp(t0,t1,i/24);const wv=Math.sin(t*PI*7+it.k*2+it.s)*(1-cond)*.03*Rc;pts.push([cx+x*Rc+dx*t*Lp+px*wv,cy+y*Rc+dy*t*Lp+py*wv])}pth(pts,col,w)};seg(-.5,0,it.c0);seg(0,.5,it.c1);if(cond>.6)dot(cx+x*Rc,cy+y*Rc,w*.45,A(C.stage,.6))});
 T(names[ph],b.l,58,{s:18,w:700,c:C.fg});Twrap(DS[type][ph],b.l,80,b.w,{s:13,c:C.fg2});
 const ty=24,sw=b.w/n;names.forEach((nm,i)=>{const x=b.l+i*sw;rr(x+2,ty-9,sw-4,18,4,null,i===ph?A(C.teal,.55):A(C.fg,.08));T(nm,x+sw/2,ty,{a:'center',s:Math.min(12,sw/8),c:i===ph?C.fg:C.fg2})});rct(b.l+(tt/(n*DUR))*b.w-1,ty-13,2,26,null,C.yellow);S.tl={ty,sw,l:b.l,n}},
click(S,x,y){const t=S.tl;if(t&&Math.abs(y-t.ty)<14&&x>=t.l){const i=Math.floor((x-t.l)/t.sw);if(i>=0&&i<t.n)S.tt=i*DUR+.01}},
readout(S){const type=S.p.type,n=NM[type].length,ph=Math.min(n-1,Math.floor(S.tt/DUR));const last=ph===n-1;let cells_,chrom;if(type==='mitose'){cells_=ph>=5?2:1;chrom=ph>=3?'4 per celle (2n)':'4 kromosomer (2n)'}else{cells_=ph>=7?4:ph>=4?2:1;chrom=ph>=4?'2 per celle (n)':'4 (2n)'}return[['fase',NM[type][ph]],['celler',cells_],['kromosomer',chrom],['dattercellene',type==='mitose'?'genetisk like':'genetisk ulike']]}
});
}

/* ---------- Blodsukker: insulin og glukagon ---------- */
{
const TYPES={frisk:'Frisk',t1:'Type 1-diabetes',t2:'Type 2-diabetes'};
function stepG(S,dt,type){const ev=S.ev;const sens=type==='t2'?.22:1,secf=type==='t1'?0:type==='t2'?1.3:1;const ex=S.ex>0;
 const Ra=S.Q/55;S.Q-=Ra*dt;const Ib=type==='t1'?0:8;S.sec=secf*1.4*Math.pow(Math.max(0,S.G-4.6),1.25);S.I+=dt*(-.08*(S.I-Ib)+S.sec);S.J+=dt*(-.012*S.J);
 const Ie=S.I+S.J;S.X+=dt*.04*(.0006*sens*Ie*(ex?1.5:1)-S.X);S.Gn=Math.max(0,5.2-S.G)*2;const HGP=Math.max(0,.04-.0022*Ie*(type==='t2'?.5:1)+.012*S.Gn);
 const ren=S.G>10?.01*(S.G-10):0;S.up=S.X*S.G+(ex?.012*S.G:0);S.HGP=HGP;S.G=Math.max(1.5,S.G+dt*(Ra-S.up-.001*S.G+HGP-ren));S.gly=clamp(S.gly+dt*(S.X*S.G*.6-HGP*.5)*.05,.05,1);if(ex)S.ex-=dt}
M({id:'bi-blodsukker',s:'bi',c:['BI1','NAT'],title:'Blodsukker: insulin og glukagon',short:'Blodsukker og hormoner',kw:'blodsukker glukose insulin glukagon homeostase hormon bukspyttkjertel lever diabetes type 1 type 2 regulering negativ tilbakekobling livsstil trening',
lead:'Kroppen holder blodsukkeret innenfor et smalt område. Etter et måltid skiller bukspyttkjertelen ut insulin, som får cellene til å ta opp sukker. Når blodsukkeret faller, skiller den ut glukagon, og leveren slipper ut sukker.',
controls:[{id:'type',type:'seg',label:'Person',value:'frisk',options:Object.entries(TYPES)},{id:'sp',label:'Minutter per sekund',min:2,max:30,step:1,value:10},{type:'btns',items:[['Spis et måltid',S=>{S.Q+=12;S.marks.push([S.min,'måltid'])}],['Tren i 30 minutter',S=>{S.ex=30;S.marks.push([S.min,'trening'])}],['Sett insulin',S=>{S.J+=40;S.marks.push([S.min,'insulin'])}]]}],
tex:['\\text{blodsukker høyt}\\Rightarrow\\text{insulin}\\Rightarrow\\text{cellene tar opp glukose}','\\text{blodsukker lavt}\\Rightarrow\\text{glukagon}\\Rightarrow\\text{leveren frigjør glukose}','\\text{normalt fastende: ca. }4\\text{–}6\\ \\text{mmol/L}'],
about:['Dette er <strong>negativ tilbakekobling</strong>: når blodsukkeret går opp, settes det i gang noe som får det ned igjen, og omvendt. Slik holdes et stabilt indre miljø, <strong>homeostase</strong>.','Insulin virker som en nøkkel som åpner dører for glukose inn i muskel- og fettceller. Leveren lagrer overskuddet som glykogen. Glukagon får leveren til å bryte ned glykogen og slippe ut glukose.','Ved <strong>type 1-diabetes</strong> lager kroppen ikke insulin, fordi immunforsvaret har ødelagt cellene som lager det. Da må insulin tilføres. Ved <strong>type 2-diabetes</strong> virker insulinet dårligere. Livsstil, som trening og kosthold, påvirker type 2 mye.','Modellen er forenklet for å vise sammenhengene. Den kan ikke brukes til å regne ut medisinske doser.'],
tasks:['Spis et måltid som frisk person. Hvor høyt går blodsukkeret, og hvor lang tid tar det før det er tilbake?','Gjør det samme for type 1 og type 2. Hva er forskjellen?','Hvorfor får man lavere blodsukker av å trene?','Forklar hvorfor regulering av blodsukkeret er et eksempel på negativ tilbakekobling.'],
init(S){S.G=5;S.I=8;S.X=.0048;S.Q=0;S.J=0;S.Gn=.4;S.sec=0;S.up=.024;S.HGP=.028;S.gly=.6;S.ex=0;S.min=7*60;S.hist=[];S.marks=[];S.ev=[];S.parts=[...Array(120)].map(()=>({x:Math.random(),y:Math.random(),s:.5+Math.random()}));S.keys=[];S.min=-450;while(S.min<-240){stepG(S,.5,S.p.type);S.min+=.5}S.Q+=12;S.marks.push([S.min,'middag']);if(S.p.type==='t1'){S.J+=40;S.marks.push([S.min+1,'insulin'])}let k=0;while(S.min<420){stepG(S,.5,S.p.type);S.min+=.5;if(k++%4===0)S.hist.push([S.min,S.G,S.I+S.J,S.Gn])}},
change(S,id){if(id==='type')this.init(S)},
update(S,dt){const m=dt*S.p.sp;let k=Math.ceil(m/.5);const h=m/k;while(k-->0){stepG(S,h,S.p.type);S.min+=h}if(!S.hist.length||S.min-S.hist[S.hist.length-1][0]>=2){S.hist.push([S.min,S.G,S.I+S.J,S.Gn]);while(S.hist.length&&S.hist[0][0]<S.min-720)S.hist.shift()}while(S.marks.length&&S.marks[0][0]<S.min-720)S.marks.shift();
 S.parts.forEach(p=>{p.x+=dt*.08*p.s;if(p.x>1)p.x-=1});if(Math.random()<S.sec*dt*2)S.keys.push({x:0,y:0,t:0,k:'i'});if(Math.random()<S.Gn*dt*.8)S.keys.push({x:0,y:0,t:0,k:'g'});S.keys.forEach(q=>q.t+=dt);S.keys=S.keys.filter(q=>q.t<2.5)},
draw(S){const[bl,br]=split(S,.5,{g:32});const vy=bl.t+bl.h*.42,vh=bl.h*.17;const lv={x:bl.l,y:bl.t+bl.h*.04,w:bl.w*.36,h:bl.h*.27},pa={x:bl.l+bl.w*.62,y:bl.t+bl.h*.06,w:bl.w*.36,h:bl.h*.2};
 rr(bl.l,vy,bl.w,vh,vh/2,A(C.red,.6),A(C.red,.13),2);T('blodåre',bl.l+bl.w-6,vy+vh+12,{a:'right',s:11.5,c:C.red});
 const ng=Math.min(120,Math.round(S.G*7));for(let i=0;i<ng;i++){const p=S.parts[i];dot(bl.l+p.x*bl.w,vy+6+p.y*(vh-12),3,C.yellow)}
 rr(lv.x,lv.y,lv.w,lv.h,lv.h*.4,A(C.red,.7),mix(C.red,C.stage,.55),2);T('Lever',lv.x+10,lv.y+14,{s:13,w:700,c:C.fg});const ng2=Math.round(S.gly*30),rg=rng(3);for(let i=0;i<ng2;i++)dot(lv.x+14+rg()*(lv.w-28),lv.y+26+rg()*(lv.h-34),3,A(C.yellow,.6));T('glykogen',lv.x+lv.w-8,lv.y+14,{a:'right',s:11,c:C.yellow});
 if(S.HGP>.03)arr(lv.x+lv.w*.6,lv.y+lv.h,lv.x+lv.w*.6,vy+4,C.yellow,2.4,9);if(S.X*S.G>.035)arr(lv.x+lv.w*.35,vy+4,lv.x+lv.w*.35,lv.y+lv.h,A(C.yellow,.7),2.4,9);
 rr(pa.x,pa.y,pa.w,pa.h,pa.h*.5,A(C.pink,.7),mix(C.pink,C.stage,.6),2);T('Bukspyttkjertel',pa.x+10,pa.y+14,{s:12.5,w:700,c:C.fg});
 const bcx=pa.x+pa.w*.3,acx=pa.x+pa.w*.7,ccy=pa.y+pa.h*.62;glow(bcx,ccy,22,C.blue,clamp(S.sec*.25,0,.8));dot(bcx,ccy,8,C.blue);T('β',bcx,ccy,{a:'center',f:'m',s:12,c:C.stage});glow(acx,ccy,22,C.purple,clamp(S.Gn*.4,0,.8));dot(acx,ccy,8,C.purple);T('α',acx,ccy,{a:'center',f:'m',s:12,c:C.stage});
 S.keys.forEach(q=>{const sx=q.k==='i'?bcx:acx,ex=q.k==='i'?bl.l+bl.w*.3:lv.x+lv.w*.8;const x=lerp(sx,ex,q.t/2.5),y=lerp(ccy,vy+vh/2,Math.min(1,q.t/.8))+(q.t>.8?Math.sin(q.t*5)*4:0);if(q.k==='i'){ln(x-5,y,x+3,y,C.blue,2.4);circ(x+5,y,2.5,C.blue,null,2)}else dot(x,y,3.5,C.purple)});
 const cy0=vy+vh+bl.h*.1,ch=bl.h*.24,cw=(bl.w-30)/4;const open=clamp(S.X/.009,0,1);for(let i=0;i<4;i++){const x=bl.l+i*(cw+10);rr(x,cy0,cw,ch,10,A(C.teal,.7),A(C.teal,.1),2);const dw=cw*.28*open;rct(x+cw/2-cw*.14,cy0-2,cw*.28,5,null,A(C.teal,.25));if(dw>1)rct(x+cw/2-dw/2,cy0-3,dw,7,null,C.stage);const nIn=Math.round(open*5);for(let k=0;k<nIn;k++){const f=((S.t*.6+k/5+i*.13)%1);dot(x+cw/2,lerp(vy+vh-4,cy0+ch*.6,f),2.6,A(C.yellow,1-f*.6))}}
 T('Muskel- og fettceller',bl.l,cy0+ch+14,{s:12,c:C.teal});T(open>.5?'insulin åpner for glukose':'lite insulin: dørene er nesten lukket',bl.l+bl.w,cy0+ch+14,{a:'right',s:11.5,c:C.fg2});
 const[g1,g2]=rows(br,[1.6,1],46);const t1=S.min,t0=t1-720;const P=Plane(t0,t1,0,20,g1);P.grid(60,{sy:2,minor:false,alpha:.08});
 rct(P.l,P.Y(7),P.w,P.Y(4)-P.Y(7),null,A(C.green,.12));T('normalt',P.l+P.w-4,P.Y(5.5),{a:'right',s:11,c:C.green});ln(P.l,P.Y(11),P.l+P.w,P.Y(11),A(C.red,.4),1,[4,4]);T('for høyt',P.l+P.w-4,P.Y(11)-9,{a:'right',s:11,c:C.red});
 P.axes({xs:120,ys:5,x0:true,xAt:t0,xf:x=>{const h=((Math.round(x/60)%24)+24)%24;return String(h).padStart(2,'0')+':00'},yl:'mmol/L',ls:13});lab(g1,'Blodsukker');
 S.marks.forEach(([t,l],i)=>{if(t>=t0){ln(P.X(t),P.t,P.X(t),P.t+P.h,A(C.fg,.3),1,[3,4]);T(l,P.X(t)+4,P.t+10+(i%3)*14,{s:11,c:C.fg3})}});
 if(S.hist.length>1)pth(S.hist.map(h=>P.pt(h[0],Math.min(20,h[1]))),C.yellow,2.8);dot(P.X(t1),P.Y(Math.min(20,S.G)),5,C.yellow);
 const im=Math.max(40,...S.hist.map(h=>h[2]))*1.1;const Q=Plane(t0,t1,0,im,g2);Q.axes({xs:120,y:false,x0:true,xf:x=>''});lab(g2,'Insulin (blå) og glukagon (lilla)');if(S.hist.length>1){pth(S.hist.map(h=>Q.pt(h[0],h[2])),C.blue,2.2);pth(S.hist.map(h=>Q.pt(h[0],h[3]*im/8)),C.purple,2.2)}},
readout(S){const h=Math.floor(S.min/60)%24,m=Math.floor(S.min%60);return[['klokka',String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')],['blodsukker',nf(S.G,1)+' mmol/L','yellow'],['insulin',S.sec>.5?'skilles ut':S.J>3?'fra sprøyte':'lavt','blue'],['glukagon',S.Gn>.6?'skilles ut':'lavt','purple'],['glykogenlager',nf(S.gly*100,0)+' %']]}
});
}

/* ---------- Nerveimpuls (Hodgkin–Huxley) ---------- */
{
const N=100,EL_=70;
const am=v=>{const x=v+40;return Math.abs(x)<1e-6?1:.1*x/(1-Math.exp(-x/10))},bm=v=>4*Math.exp(-(v+65)/18),ah=v=>.07*Math.exp(-(v+65)/20),bh=v=>1/(1+Math.exp(-(v+35)/10)),an=v=>{const x=v+55;return Math.abs(x)<1e-6?.1:.01*x/(1-Math.exp(-x/10))},bn=v=>.125*Math.exp(-(v+65)/80);
const vcol=v=>ramp([C.blue,C.teal,C.yellow,C.red],(v+80)/120);
function reset(S){S.V=new Float64Array(N).fill(-65);const m0=am(-65)/(am(-65)+bm(-65)),h0=ah(-65)/(ah(-65)+bh(-65)),n0=an(-65)/(an(-65)+bn(-65));S.m=new Float64Array(N).fill(m0);S.h=new Float64Array(N).fill(h0);S.n=new Float64Array(N).fill(n0);S.ms=0;S.stimT=-99;S.hist=[];S.cross=null;S.ions=[];S.lastAuto=0}
M({id:'bi-nerve',s:'bi',c:['BI1'],title:'Nerveimpulsen: aksjonspotensialet',short:'Nerveimpuls',kw:'nervecelle nerveimpuls aksjonspotensial membranpotensial natrium kalium ionekanal hvilepotensial terskel myelin saltatorisk akson hodgkin huxley synapse',
lead:'En nerveimpuls er en bølge av spenningsendring langs aksonet. Natriumkanaler åpner seg, Na⁺ strømmer inn, og innsiden blir positiv. Så åpner kaliumkanalene seg, K⁺ strømmer ut, og spenningen faller tilbake.',
controls:[{id:'I',label:'Styrke på stimulus',min:0,max:80,step:1,value:40,unit:'µA/cm²'},{type:'btns',items:[['Gi et stimulus',S=>{S.stimT=S.ms;S.cross=null}]]},{id:'auto',type:'check',label:'Stimuler automatisk hvert 15. ms',value:false},{id:'my',type:'check',label:'Myelinisert akson',value:false},{id:'sp',label:'Fart (ms simulert per sekund)',min:.5,max:6,step:.5,value:2,d:1}],
tex:['C\\frac{dV}{dt}=-g_{Na}m^3h\\,(V-E_{Na})-g_Kn^4\\,(V-E_K)-g_L(V-E_L)+I','E_{Na}=+50\\ \\text{mV},\\quad E_K=-77\\ \\text{mV}'],
about:['Simuleringen bruker <strong>Hodgkin–Huxley-modellen</strong>, som forklarer nerveimpulsen ut fra hvordan ionekanalene åpner og lukker seg. Fargen på aksonet viser spenningen: blått er hvile (−65 mV), rødt er positivt.','Et svakt stimulus gir bare en liten spenningsendring som dør ut. Når spenningen passerer <strong>terskelen</strong> (omtrent −55 mV), åpner natriumkanalene seg og forsterker hverandre. Da kommer en full impuls. Dette kalles <strong>alt-eller-ingenting</strong>.','Etter en impuls er natriumkanalene stengt en kort stund. Denne <strong>refraktærperioden</strong> gjør at impulsen bare går én vei.','I et <strong>myelinisert</strong> akson isolerer myelinskjeden aksonet, og impulsen hopper fra node til node (Ranviers innsnøringer). Det går raskere enn i et akson uten myelin.'],
tasks:['Finn det svakeste stimuluset som gir en full nerveimpuls.','Les av grafen: hva er den høyeste spenningen under impulsen? Hvorfor kommer den ikke helt opp til +50 mV?','Slå på myelin og sammenlign tiden impulsen bruker fram til elektroden.','Gi to stimuli rett etter hverandre. Hvorfor blir det ikke to impulser?'],
init(S){reset(S)},
change(S,id){if(id==='my')reset(S)},
update(S,dt){const my=S.p.my,dts=my?.001:.01;let simT=dt*S.p.sp;const steps=Math.min(4000,Math.ceil(simT/dts));const node=i=>!my||i%10===0;const capI=.02,gax=6;const dV=new Float64Array(N);
 if(S.p.auto&&S.ms-S.lastAuto>15){S.lastAuto=S.ms;S.stimT=S.ms;S.cross=null}
 for(let st=0;st<steps;st++){const Is=S.ms-S.stimT<.5?S.p.I:0;for(let i=0;i<N;i++){const v=S.V[i];let I=0;if(node(i)){S.m[i]+=dts*(am(v)*(1-S.m[i])-bm(v)*S.m[i]);S.h[i]+=dts*(ah(v)*(1-S.h[i])-bh(v)*S.h[i]);S.n[i]+=dts*(an(v)*(1-S.n[i])-bn(v)*S.n[i]);I=-120*S.m[i]**3*S.h[i]*(v-50)-36*S.n[i]**4*(v+77)-.3*(v+54.387)}else I=-.03*(v+65);
  const vl=S.V[Math.max(0,i-1)],vr=S.V[Math.min(N-1,i+1)];dV[i]=(I+gax*(vl-2*v+vr)+(i<3?Is:0))/(node(i)?1:capI)}for(let i=0;i<N;i++)S.V[i]+=dts*dV[i];S.ms+=dts;if(S.cross===null&&S.V[EL_]>0&&S.stimT>-99)S.cross=S.ms-S.stimT}
 S.hist.push([S.ms,S.V[EL_]]);while(S.hist.length&&S.hist[0][0]<S.ms-20)S.hist.shift();
 for(let i=0;i<N;i+=(S.p.my?10:5)){const gNa=120*S.m[i]**3*S.h[i],gK=36*S.n[i]**4;if(Math.random()<gNa*dt*.5)S.ions.push({i,t:0,k:'na'});if(Math.random()<gK*dt*.4)S.ions.push({i,t:0,k:'k'})}S.ions.forEach(q=>q.t+=dt);S.ions=S.ions.filter(q=>q.t<.8);if(S.ions.length>300)S.ions.splice(0,S.ions.length-300)},
draw(S){const[top,bot]=rows(pad(S,30,34,30),[1,1.1],40);const ay=top.t+top.h*.38,ah_=top.h*.32,cw=top.w/N;const node=i=>!S.p.my||i%10===0;
 rct(top.l,top.t+4,top.w,ay-top.t-4,null,A(C.fg,.03));T('utenfor cellen',top.l+4,top.t+12,{s:11.5,c:C.fg3});T('inne i aksonet',top.l+4,ay+ah_/2,{s:11.5,c:C.fg3});
 for(let i=0;i<N;i++)rct(top.l+i*cw,ay,cw+.6,ah_,null,A(vcol(S.V[i]),.55));ln(top.l,ay,top.l+top.w,ay,A(C.fg,.6),2);ln(top.l,ay+ah_,top.l+top.w,ay+ah_,A(C.fg,.6),2);
 if(S.p.my)for(let i=0;i<N;i+=10){const x0=top.l+(i+1)*cw,w=cw*8.4;rr(x0,ay-14,w,14,6,null,mix(C.fg,C.stage,.55));rr(x0,ay+ah_,w,14,6,null,mix(C.fg,C.stage,.55))}
 for(let i=0;i<N;i+=(S.p.my?10:5)){const x=top.l+(i+.5)*cw;const o=S.m[i]**3*S.h[i],ok=S.n[i]**4;const gap=clamp(o*30,1,7);rct(x-5,ay-7,4,14,null,C.red);rct(x+1+gap-2,ay-7,4,14,null,C.red);const kg=clamp(ok*12,1,6);rct(x-5,ay+ah_-7,4,14,null,C.blue);rct(x+1+kg-2,ay+ah_-7,4,14,null,C.blue)}
 S.ions.forEach(q=>{const x=top.l+(q.i+.5)*cw+2;if(q.k==='na'){const y=lerp(ay-28,ay+18,q.t/.8);T('+',x,y,{a:'center',f:'n',s:12,c:A(C.red,1-q.t)});dot(x,y,3,A(C.red,.6*(1-q.t)))}else{const y=lerp(ay+ah_-18,ay+ah_+28,q.t/.8);dot(x,y,3,A(C.blue,.7*(1-q.t)))}});
 const ex=top.l+(EL_+.5)*cw;ln(ex,top.t-6,ex,ay+ah_*.5,C.fg,1.6);dot(ex,ay+ah_*.5,3,C.fg);T('måleelektrode',ex,top.t-14,{a:'center',s:11.5,c:C.fg});arr(top.l+cw*1.5,top.t+top.h-4,top.l+cw*1.5,ay+ah_+2,C.yellow,2,8);T('stimulus',top.l,top.t+top.h+10,{s:11.5,c:C.yellow});
 T('Na⁺-kanal',top.l+top.w-4,ay-22,{a:'right',s:11,c:C.red});T('K⁺-kanal',top.l+top.w-4,ay+ah_+22,{a:'right',s:11,c:C.blue});
 const P=Plane(S.ms-20,S.ms,-90,50,bot);P.grid(5,{sy:20,minor:false,alpha:.08});P.axes({xs:5,ys:20,xAt:S.ms-20,yAt:-90,x0:true,y0:true,xf:x=>'',yl:'mV',ls:13});lab(bot,'Spenning ved elektroden de siste 20 ms');
 ln(P.l,P.Y(-55),P.l+P.w,P.Y(-55),A(C.yellow,.6),1.2,[5,5]);T('terskel',P.l+4,P.Y(-55)-9,{s:11,c:C.yellow});ln(P.l,P.Y(-65),P.l+P.w,P.Y(-65),A(C.fg,.25),1,[2,4]);T('hvile',P.l+4,P.Y(-65)+10,{s:11,c:C.fg3});
 if(S.hist.length>1)pth(S.hist.map(h=>P.pt(h[0],h[1])),C.fg,2.4);const v=S.V[EL_];dot(P.X(S.ms),P.Y(v),5,vcol(v))},
readout(S){const v=S.V[EL_],h=S.hist,dv=h.length>3?h[h.length-1][1]-h[h.length-4][1]:0;const ph=v>-50&&dv>0?'depolarisering: Na⁺ strømmer inn':v>-50&&dv<0?'repolarisering: K⁺ strømmer ut':v<-66.5?'hyperpolarisering':'hvile';return[['spenning',nf(v,0)+' mV'],['fase',ph],['tid fram til elektroden',S.cross!==null?nf(S.cross,2)+' ms':'–','yellow']]}
});
}

/* ---------- Fangst–gjenfangst ---------- */
{
function hyper(N,K,n){let m=0,K_=K,N_=N;for(let i=0;i<n;i++){if(Math.random()<K_/N_){m++;K_--}N_--}return m}
M({id:'bi-fangst',s:'bi',c:['BI2','S1'],title:'Hvor mange fisk er det i vannet? Fangst–gjenfangst',short:'Fangst–gjenfangst',kw:'populasjon bestand størrelse fangst gjenfangst merking estimat lincoln petersen feltarbeid forvaltning statistikk hypergeometrisk',
lead:'Vi kan ikke telle alle fiskene i et vann. I stedet fanger vi noen, merker dem og slipper dem ut igjen. Andelen merkede fisk i en ny fangst forteller hvor stor hele bestanden er.',
controls:[{id:'N',label:'Sann bestand (skjult for deg)',min:50,max:600,step:10,value:240},{id:'n1',label:'Første fangst (merkes)',min:10,max:150,step:5,value:50},{id:'n2',label:'Andre fangst',min:10,max:150,step:5,value:50},{id:'vis',type:'check',label:'Vis den sanne bestanden',value:false},{type:'btns',items:[['1. Fang og merk',S=>MOD['bi-fangst'].catch1(S)],['2. Fang igjen og tell',S=>MOD['bi-fangst'].catch2(S)],['Gjenta forsøket 50 ganger',S=>{const p=S.p;for(let i=0;i<50;i++){const m=hyper(p.N,p.n1,p.n2);S.est.push(m?p.n1*p.n2/m:null)}}],['Start på nytt',S=>MOD['bi-fangst'].init(S)]]}],
tex:['\\frac{m_2}{n_2}\\approx\\frac{n_1}{N}\\;\\Rightarrow\\;\\hat N=\\frac{n_1\\cdot n_2}{m_2}'],
about:['$n_1$ er antall fisk som fanges og merkes første gang. $n_2$ er antall fisk i den andre fangsten, og $m_2$ er hvor mange av dem som var merket.','Ideen er at andelen merkede fisk i den andre fangsten er omtrent den samme som andelen merkede fisk i hele vannet. Det gir <strong>Lincoln–Petersen-estimatet</strong> $\\hat N$.','Metoden forutsetter at fiskene blandes godt, at merkene ikke faller av, at merkede fisk ikke er lettere eller vanskeligere å fange, og at ingen fisk blir født, dør eller flytter mellom fangstene.','Histogrammet viser mange gjentatte forsøk. Estimatene sprer seg rundt den sanne verdien. Større fangster gir mindre spredning.'],
tasks:['Gjør ett forsøk og regn ut estimatet for hånd.','Gjenta forsøket mange ganger. Hvor nær den sanne bestanden kommer gjennomsnittet?','Hva skjer med spredningen hvis du fanger flere fisk hver gang?','Hva blir feil hvis de merkede fiskene lettere blir spist av rovfugl?'],
init(S){const N=S.p.N;S.f=[...Array(N)].map(()=>{const a=Math.random()*TAU;return{x:Math.random()*2-1,y:Math.random()*2-1,a,s:.08+Math.random()*.06,mk:false,fl:-9}});S.f.forEach(f=>{while(f.x*f.x+f.y*f.y>.85){f.x=Math.random()*2-1;f.y=Math.random()*2-1}});S.stage=0;S.m2=null;S.est=[];S.net=null},
change(S,id){if(id==='N')this.init(S)},
catch1(S){S.f.forEach(f=>f.mk=false);const idx=[...S.f.keys()].sort(()=>Math.random()-.5).slice(0,S.p.n1);idx.forEach(i=>{S.f[i].mk=true;S.f[i].fl=S.t});S.stage=1;S.m2=null;S.net={t:S.t,k:1}},
catch2(S){if(S.stage<1)this.catch1(S);const idx=[...S.f.keys()].sort(()=>Math.random()-.5).slice(0,S.p.n2);let m=0;idx.forEach(i=>{if(S.f[i].mk)m++;S.f[i].fl=S.t});S.m2=m;S.stage=2;S.est.push(m?S.p.n1*S.p.n2/m:null);S.net={t:S.t,k:2}},
update(S,dt){S.f.forEach(f=>{f.a+=(Math.random()-.5)*dt*3;f.x+=Math.cos(f.a)*f.s*dt;f.y+=Math.sin(f.a)*f.s*dt;const r=f.x*f.x/.92+f.y*f.y/.85;if(r>.9){f.a=Math.atan2(-f.y,-f.x)+(Math.random()-.5)}})},
draw(S){const[bl,br]=split(S,.52,{g:30});const cx=bl.l+bl.w/2,cy=bl.t+bl.h/2,rx=bl.w/2-6,ry=bl.h/2-6;X.beginPath();X.ellipse(cx,cy,rx,ry,0,0,TAU);X.fillStyle=A(C.blue,.16);X.fill();X.strokeStyle=mix(C.green,C.stage,.4);X.lineWidth=4;X.stroke();
 S.f.forEach(f=>{const x=cx+f.x*rx*.95,y=cy+f.y*ry*.95;X.save();X.translate(x,y);X.rotate(f.a);X.beginPath();X.ellipse(0,0,7,3,0,0,TAU);X.fillStyle=mix(C.grey,C.fg,.3);X.fill();X.beginPath();X.moveTo(-6,0);X.lineTo(-11,-3.5);X.lineTo(-11,3.5);X.closePath();X.fill();if(f.mk){X.fillStyle=C.yellow;X.beginPath();X.arc(1,0,2.6,0,TAU);X.fill()}X.restore();const age=S.t-f.fl;if(age<1.2)circ(x,y,9+age*6,A(f.mk&&S.net&&S.net.k===2?C.yellow:C.fg,1-age/1.2),null,1.6)});
 if(S.net){const age=S.t-S.net.t;if(age<1.2)T(S.net.k===1?`Fanget og merket ${S.p.n1} fisk`:`Fanget ${S.p.n2} fisk, ${S.m2} var merket`,cx,bl.t+14,{a:'center',s:14,w:700,c:C.fg,bg:A(C.stage,.7)})}
 const[r1,r2]=rows({l:br.l,t:br.t,w:br.w,h:br.h-26},isWide(S)?[1,1.4]:[1.4,1],40);const fs=isWide(S)?1:.78;let y=r1.t+8;const L=(s,c=C.fg2,sz=14)=>{T(s,r1.l,y,{s:sz*fs,c,f:'n'});y+=(sz+10)*fs};L('Utregning',C.fg3,11);L(`n₁ = ${S.stage>=1?S.p.n1:'–'}  (merket)`,C.yellow);L(`n₂ = ${S.stage>=2?S.p.n2:'–'}  (andre fangst)`);L(`m₂ = ${S.m2??'–'}  (merkede i andre fangst)`,C.yellow);
 const est=S.m2?S.p.n1*S.p.n2/S.m2:null;L(S.stage<2?'N̂ = n₁ · n₂ / m₂':S.m2===0?'Ingen merkede fisk: kan ikke regne ut':`N̂ = ${S.p.n1} · ${S.p.n2} / ${S.m2} = ${nf(est,0)}`,C.fg,16);if(S.p.vis)L(`Sann bestand: ${S.p.N}`,C.green);
 const ev=S.est.filter(e=>e!==null);const mx=Math.max(S.p.N*2.2,100);const nb=30;const bins=new Array(nb).fill(0);ev.forEach(e=>{const k=Math.floor(e/mx*nb);if(k>=0&&k<nb)bins[k]++});const bm=Math.max(4,...bins);
 const P=Plane(0,mx,0,bm*1.15,r2);P.axes({xs:niceStep(mx/5),y:false,x0:true,xl:'estimat',ls:13});lab(r2,`Estimater fra ${S.est.length} forsøk`);bins.forEach((v,i)=>{if(v)rct(P.X(i*mx/nb)+1,P.Y(v),P.sx*mx/nb-2,P.Y(0)-P.Y(v),null,A(C.teal,.75))});
 if(ev.length){const mean=ev.reduce((a,b)=>a+b,0)/ev.length;ln(P.X(mean),P.t,P.X(mean),P.Y(0),C.yellow,2);T('snitt '+nf(mean,0),P.X(mean)+4,P.t+10,{s:11.5,c:C.yellow})}if(S.p.vis){ln(P.X(S.p.N),P.t,P.X(S.p.N),P.Y(0),C.green,2,[5,4]);T('sann',P.X(S.p.N)+4,P.t+26,{s:11.5,c:C.green})}},
readout(S){const ev=S.est.filter(e=>e!==null);const mean=ev.length?ev.reduce((a,b)=>a+b,0)/ev.length:NaN;const sd=ev.length>1?Math.sqrt(ev.reduce((a,b)=>a+(b-mean)**2,0)/(ev.length-1)):NaN;return[['siste estimat',S.m2?nf(S.p.n1*S.p.n2/S.m2,0):'–','yellow'],['forsøk',S.est.length],['gjennomsnitt',nf(mean,0)],['standardavvik',nf(sd,0)],['sann bestand',S.p.vis?S.p.N:'skjult','green']]}
});
}
