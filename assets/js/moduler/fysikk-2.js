/* ================= FYSIKK 2 ================= */

/* ---------- Skrått kast ---------- */
{
const GP={jord:9.81,mane:1.62,mars:3.71};
M({id:'fy-kast',s:'fy',c:['FY2'],title:'Skrått kast',short:'Skrått kast',kw:'kast prosjektil bevegelse i to dimensjoner dekomponering fart rekkevidde høyde luftmotstand planeter',
lead:'Et kast er to bevegelser samtidig: konstant fart vannrett og konstant akselerasjon loddrett. Den blå pilen er $v_x$, den gule er $v_y$.',
controls:[{id:'v0',label:'Startfart <i>v</i>₀',min:5,max:40,step:.5,value:20,unit:'m/s'},{id:'al',label:'Utkastvinkel <i>α</i>',min:5,max:85,step:1,value:45,unit:'°'},{id:'pl',type:'seg',label:'Tyngdeakselerasjon',value:'jord',options:[['jord','Jorda 9,81'],['mars','Mars 3,71'],['mane','Månen 1,62']]},{id:'drag',type:'check',label:'Luftmotstand',value:false},{id:'k',label:'Luftmotstand <i>k/m</i>',min:.002,max:.05,step:.001,value:.012,d:3,show:S=>S.p.drag},{type:'btns',items:[['Kast',S=>MOD['fy-kast'].launch(S)]]}],
tex:['x=v_0\\cos\\alpha\\cdot t','y=v_0\\sin\\alpha\\cdot t-\\tfrac12gt^2','v_x=v_0\\cos\\alpha,\\qquad v_y=v_0\\sin\\alpha-gt','R=\\frac{v_0^2\\sin 2\\alpha}{g}'],
about:['Den vannrette farten $v_x$ endrer seg ikke uten luftmotstand. Bare den loddrette farten påvirkes av tyngdekraften.','I toppunktet er $v_y=0$, men farten er ikke null. Ballen beveger seg fortsatt vannrett.','Uten luftmotstand gir 45° lengst kast. Med luftmotstand blir banen skjev og den beste vinkelen lavere.','De svake kurvene er de forrige kastene, så du kan sammenligne.'],
tasks:['Vis at 30° og 60° gir like langt kast uten luftmotstand. Hvorfor?','Hvor mye lengre kommer et kast på Månen enn på Jorda med samme fart og vinkel?','Slå på luftmotstand. Finn vinkelen som gir lengst kast.','En ball kastes med 15 m/s og 40°. Regn ut hvor høyt den kommer og hvor lang tid den bruker.'],
init(S){S.gh=[];S.view=null;this.launch(S)},
launch(S){if(S.b&&S.b.tr.length>2){S.gh.push(S.b.tr);if(S.gh.length>4)S.gh.shift()}const a=rad(S.p.al);S.b={x:0,y:0,vx:S.p.v0*Math.cos(a),vy:S.p.v0*Math.sin(a),t:0,tr:[[0,0]],land:false,apex:null};S.hold=0;S.re=0},
change(S,id){if(id!=='k'||S.p.drag)S.re=.35},
update(S,dt){if(S.re>0){S.re-=dt;if(S.re<=0)this.launch(S)}const b=S.b,g=GP[S.p.pl];if(b.land){S.hold+=dt;if(S.hold>1.6)this.launch(S);return}
 const sp=Math.max(1,S.p.v0/12);for(let i=0;i<10;i++){const h=dt*sp/10;const k=S.p.drag?S.p.k:0,v=Math.hypot(b.vx,b.vy);const ax=-k*v*b.vx,ay=-g-k*v*b.vy;const vy0=b.vy;b.vx+=ax*h;b.vy+=ay*h;b.x+=b.vx*h;b.y+=b.vy*h;b.t+=h;if(vy0>0&&b.vy<=0)b.apex=[b.x,b.y];if(b.y<0){b.y=0;b.land=true;break}}b.tr.push([b.x,b.y])},
draw(S){const g=GP[S.p.pl],v0=S.p.v0,a=rad(S.p.al);const R=v0*v0*Math.sin(2*a)/g,Hm=(v0*Math.sin(a))**2/(2*g);const box=pad(S,34,24,36);const tw_=Math.max(R*1.12,Hm*1.15*box.w/box.h,8);S.view=S.view===null?tw_:smooth(S.view,tw_,1/60,5);
 const P=Plane(0,S.view,0,S.view*box.h/box.w,box);const st=niceStep(S.view/8);P.grid(st,{minor:false,alpha:.12});P.axes({xs:st,ys:st,xl:'x (m)',yl:'y (m)',ls:14,x0:true});
 S.gh.forEach((tr,i)=>pth(tr.map(q=>P.pt(...q)),A(C.fg,.12+.06*i),1.5));const b=S.b;pth(b.tr.map(q=>P.pt(...q)),C.fg,2.4);
 marc(P.X(0),P.Y(0),36,0,a,A(C.fg,.6),1.4);T('α',P.X(0)+44,P.Y(0)-14,{f:'m',s:15,c:C.fg2});
 if(b.apex){dot(...P.pt(...b.apex),4,C.yellow);T('toppunkt: vᵧ = 0',P.X(b.apex[0]),P.Y(b.apex[1])-14,{a:'center',s:11.5,c:C.yellow,bg:A(C.stage,.7)})}
 const q=P.pt(b.x,b.y),ks=S.view*.16/v0*P.sx;if(!b.land){arr(...q,q[0]+b.vx*ks,q[1],C.blue,2.6,9);arr(...q,q[0],q[1]-b.vy*ks,C.yellow,2.6,9);arr(...q,q[0]+b.vx*ks,q[1]-b.vy*ks,C.fg,2.2,9);ln(q[0]+b.vx*ks,q[1],q[0]+b.vx*ks,q[1]-b.vy*ks,A(C.fg,.3),1,[3,3]);Tm('vₓ',q[0]+b.vx*ks+6,q[1]+12,{c:C.blue,s:15});Tm('vᵧ',q[0]-18,q[1]-b.vy*ks,{c:C.yellow,s:15})}
 sphere(...q,8,C.gold);if(b.land)T('landet etter '+nf(b.x,1)+' m',q[0],q[1]-22,{a:'center',f:'n',s:12,c:C.fg,bg:A(C.stage,.7)})},
readout(S){const b=S.b,g=GP[S.p.pl],a=rad(S.p.al),v0=S.p.v0;return[['t',nf(b.t,2)+' s'],['x',nf(b.x,1)+' m'],['y',nf(b.y,1)+' m'],['vₓ',nf(b.vx,1)+' m/s','blue'],['vᵧ',nf(b.vy,1)+' m/s','yellow'],['R (teori)',nf(v0*v0*Math.sin(2*a)/g,1)+' m'],['h (teori)',nf((v0*Math.sin(a))**2/(2*g),1)+' m']]}
});
}

/* ---------- Sirkelbevegelse ---------- */
M({id:'fy-sirkel',s:'fy',c:['FY2'],title:'Sirkelbevegelse og sentripetalkraft',short:'Sirkelbevegelse',kw:'sirkelbevegelse sentripetalakselerasjon sentripetalkraft krumlinjet bevegelse loop berg-og-dal-bane normalkraft periode',
lead:'For å gå i sirkel må noe hele tiden trekke legemet inn mot sentrum. Uten den kraften fortsetter legemet rett fram langs tangenten.',
controls:[{id:'mode',type:'seg',label:'Situasjon',value:'snor',options:[['snor','Stein i snor (ovenfra)'],['loop','Loop i berg-og-dal-bane']]},{id:'r',label:'Radius <i>r</i>',min:.5,max:3,step:.1,value:1.5,unit:'m',show:S=>S.p.mode==='snor'},{id:'v',label:'Fart <i>v</i>',min:1,max:10,step:.1,value:4,unit:'m/s',show:S=>S.p.mode==='snor'},{id:'rl',label:'Radius i loopen',min:4,max:15,step:.5,value:8,unit:'m',show:S=>S.p.mode==='loop'},{id:'vb',label:'Fart i bunnen',min:5,max:30,step:.5,value:22,unit:'m/s',show:S=>S.p.mode==='loop'},{id:'m',label:'Masse <i>m</i>',min:.1,max:2,step:.1,value:.5,unit:'kg',show:S=>S.p.mode==='snor'},{type:'btns',items:[['Kutt snora',S=>{if(S.p.mode==='snor'&&!S.cut){S.cut=true;S.ct=0}}],['Start på nytt',S=>MOD['fy-sirkel'].init(S)]],show:S=>S.p.mode==='snor'},{type:'btns',items:[['Kjør på nytt',S=>MOD['fy-sirkel'].init(S)]],show:S=>S.p.mode==='loop'}],
tex:['a=\\frac{v^2}{r}','\\Sigma F=m\\frac{v^2}{r}\\ \\text{(mot sentrum)}','T=\\frac{2\\pi r}{v}','\\text{toppen av loopen: } N+G=m\\frac{v^2}{r}'],
about:['Farten (blå) peker langs banen. Akselerasjonen og kraftsummen (gul) peker inn mot sentrum. Kraften endrer retningen på farten, ikke størrelsen.','Kutt snora og se: steinen flyr <strong>rett fram</strong> langs tangenten, ikke utover fra sentrum. Det finnes ingen «sentrifugalkraft» som dytter den ut.','I loopen er det tyngdekraften og normalkraften fra skinnene som sammen gir kraftsummen inn mot sentrum. På toppen må farten være minst $\\sqrt{gr}$, ellers faller vogna.'],
tasks:['Hva skjer med kraften når farten dobles? Når radien dobles?','Regn ut minste fart på toppen av en loop med radius 8 m.','Vis at vogna må ha minst $\\sqrt{5gr}$ i bunnen for å klare loopen (uten friksjon). Test det.','Hvorfor kjenner du deg tyngre i bunnen av en loop?'],
init(S){S.th=0;S.cut=false;S.ct=0;S.pos=null;S.L={th:0,dir:1,off:false,x:0,y:0,vx:0,vy:0,t:0}},
change(S,id){if(id==='mode'||id==='vb'||id==='rl')this.init(S)},
update(S,dt){if(S.p.mode==='snor'){if(!S.cut){S.th+=S.p.v/S.p.r*dt}else{S.ct+=dt;if(S.ct>2.2){S.cut=false;S.ct=0}}return}
 const L=S.L,r=S.p.rl,vb=S.p.vb,g=9.81;if(L.off){L.t+=dt;for(let i=0;i<6;i++){const h=dt/6;L.vy-=g*h;L.x+=L.vx*h;L.y+=L.vy*h}if(L.y<-1||L.t>3)this.init(S);return}
 const steps=8;for(let i=0;i<steps;i++){const h=dt/steps;const hgt=r*(1-Math.cos(L.th)),v2=vb*vb-2*g*hgt;if(v2<=0&&Math.cos(L.th)>=0){L.dir*=-1;L.th+=L.dir*.002;continue}const v=Math.sqrt(Math.max(v2,0));const N=v*v/r+g*Math.cos(L.th);if(N<0){L.off=true;L.x=r*Math.sin(L.th);L.y=r-r*Math.cos(L.th);L.vx=L.dir*v*Math.cos(L.th);L.vy=L.dir*v*Math.sin(L.th);L.t=0;return}L.th+=L.dir*v/r*h;if(L.th>TAU){L.th-=TAU}}},
draw(S){if(S.p.mode==='snor'){const P=Plane(-4,4,-3.2,3.2,pad(S,30),true);P.grid(1,{alpha:.08});const r=S.v.r,v=S.p.v,m=S.p.m;const O=P.pt(0,0);circ(...O,r*P.sx,A(C.fg,.3),null,1.2);X.setLineDash([]);
  let x=r*Math.cos(S.th),y=r*Math.sin(S.th);const tx=-Math.sin(S.th),ty=Math.cos(S.th);if(S.cut){x+=tx*v*S.ct;y+=ty*v*S.ct;ln(...P.pt(r*Math.cos(S.th),r*Math.sin(S.th)),...P.pt(x,y),A(C.blue,.4),1.4,[4,4])}
  if(!S.cut)ln(...O,...P.pt(x,y),C.fg2,1.6);dot(...O,5,C.fg);const q=P.pt(x,y);const ks=.18;arr(...q,...P.pt(x+tx*v*ks,y+ty*v*ks),C.blue,3);Tm('v',...P.pt(x+tx*v*ks*1.15,y+ty*v*ks*1.15),{c:C.blue,a:'center'});
  if(!S.cut){const a=v*v/r;const ka=Math.min(.12,1.6/a);arr(...q,...P.pt(x-Math.cos(S.th)*a*ka,y-Math.sin(S.th)*a*ka),C.yellow,3);T('F = mv²/r',P.X(x-Math.cos(S.th)*a*ka*.5)+8,P.Y(y-Math.sin(S.th)*a*ka*.5)-10,{f:'m',s:14,c:C.yellow})}
  sphere(...q,10,C.grey);if(S.cut)T('Steinen fortsetter rett fram!',P.l+P.w/2,P.t+16,{a:'center',s:14,c:C.fg})}
 else{const r=S.p.rl,L=S.L;const P=Plane(-r*1.7,r*1.7,-r*.25,r*2.3,pad(S,26),true);P.grid(niceStep(r/2),{alpha:.07});ln(P.l,P.Y(0),P.l+P.w,P.Y(0),A(C.fg,.4),1.4);circ(P.X(0),P.Y(r),r*P.sx,A(C.fg,.65),null,3);ln(P.X(-r*1.7),P.Y(0),P.X(0),P.Y(0),A(C.fg,.65),3);
  let x,y,ang;if(L.off){x=L.x;y=L.y}else{x=r*Math.sin(L.th);y=r-r*Math.cos(L.th);ang=L.th}const q=P.pt(x,y);
  if(!L.off){X.save();X.translate(...q);X.rotate(-ang);rr(-14,-16,28,14,3,null,C.red);X.restore();const g=9.81,hgt=r*(1-Math.cos(L.th)),v=Math.sqrt(Math.max(0,S.p.vb**2-2*g*hgt)),N=v*v/r+g*Math.cos(L.th);const k=26/g;const c=P.pt(0,r),dx=(c[0]-q[0]),dy=(c[1]-q[1]),dl=Math.hypot(dx,dy)||1;
   arr(...q,q[0],q[1]+g*k,C.red,2.6,9);T('G',q[0]+6,q[1]+g*k,{f:'m',s:14,c:C.red});if(N>0){arr(...q,q[0]+dx/dl*N*k,q[1]+dy/dl*N*k,C.blue,2.6,9);T('N',q[0]+dx/dl*N*k+6,q[1]+dy/dl*N*k,{f:'m',s:14,c:C.blue})}
   const tx=Math.cos(L.th)*L.dir,ty=-Math.sin(L.th)*L.dir;arr(...q,q[0]+tx*v*3,q[1]+ty*v*3,A(C.green,.9),2.2,8)}
  else{rr(q[0]-14,q[1]-8,28,14,3,null,C.red);T('For lav fart på toppen: vogna faller av banen!',P.l+P.w/2,P.t+16,{a:'center',s:14,c:C.fg})}
  const vt2=S.p.vb**2-4*9.81*r;infoBox(P.l+6,P.t+30,[[`v i bunnen = ${nf(S.p.vb,1)} m/s`,C.fg2],[`v på toppen = ${vt2>0?nf(Math.sqrt(vt2),1):'–'} m/s`,C.fg2],[`minst √(gr) = ${nf(Math.sqrt(9.81*r),1)} m/s på toppen`,C.yellow],[`minst √(5gr) = ${nf(Math.sqrt(5*9.81*r),1)} m/s i bunnen`,C.yellow]],{s:12})}},
readout(S){if(S.p.mode==='snor'){const{r,v,m}=S.p;return[['a',nf(v*v/r,2)+' m/s²','yellow'],['F',nf(m*v*v/r,2)+' N','yellow'],['T',nf(TAU*r/v,2)+' s'],['f',nf(v/(TAU*r),2)+' Hz']]}const L=S.L,r=S.p.rl;if(L.off)return[['status','falt av']];const h=r*(1-Math.cos(L.th)),v=Math.sqrt(Math.max(0,S.p.vb**2-2*9.81*h));return[['v',nf(v,1)+' m/s','green'],['høyde',nf(h,1)+' m'],['N / G',nf((v*v/r+9.81*Math.cos(L.th))/9.81,2),'blue']]}
});

/* ---------- Gravitasjon og planetbaner ---------- */
M({id:'fy-gravitasjon',s:'fy',c:['FY2'],title:'Planetbaner i et gravitasjonsfelt',short:'Gravitasjon og baner',kw:'gravitasjon kepler planetbane ellipse unnslipningsfart sirkelbane potensiell energi sentralfelt satellitt',
lead:'Startfarten bestemmer banen. Akkurat riktig fart gir sirkel, litt annen fart gir ellipse, og ved unnslipningsfarten forsvinner planeten for alltid.',
controls:[{id:'f',label:'Startfart (i forhold til sirkelbanefart)',min:.4,max:1.6,step:.01,value:.8,fmt:v=>nf(v,2)+' · v₀'},{id:'kep',type:'check',label:'Vis Keplers 2. lov (like arealer)',value:true},{type:'btns',items:[['Sirkelbane',S=>setP('f',1,S)],['Unnslipningsfart',S=>setP('f',Math.SQRT2,S)],['Start på nytt',S=>MOD['fy-gravitasjon'].init(S)]]}],
tex:['F=\\gamma\\frac{Mm}{r^2}','E_p=-\\gamma\\frac{Mm}{r}','v_{\\text{sirkel}}=\\sqrt{\\frac{\\gamma M}{r}},\\qquad v_{\\text{unnsl}}=\\sqrt{\\frac{2\\gamma M}{r}}'],
about:['Den totale energien $E_k+E_p$ er bevart. Er den negativ, er planeten <strong>bundet</strong> og går i en ellipse. Er den null eller positiv, unnslipper den.','<strong>Keplers 2. lov:</strong> linjen fra sola til planeten sveiper over like store arealer på like lang tid. Derfor går planeten fortest når den er nærmest sola.','Den potensielle energien er negativ fordi vi har valgt $E_p=0$ uendelig langt borte.'],
tasks:['Hvor mye større enn sirkelbanefarten er unnslipningsfarten?','Finn en bane der planeten er tre ganger så langt unna i det fjerneste punktet som i det nærmeste.','Se på energisøylene. Hva skjer med $E_k$ og $E_p$ når planeten nærmer seg sola?','Hvorfor er det lettere å skyte opp satellitter mot øst fra ekvator?'],
change(S,id){if(id==='f')this.init(S)},
init(S){const f=S.p.f;S.x=1;S.y=0;S.vx=0;S.vy=f;S.tr=[];S.sec=[];S.cur=[[1,0]];S.secT=0;S.tt=0;S.esc=0;S.vw=null},
update(S,dt){const f=S.p.f,E=f*f/2-1;const per=E<0?TAU*Math.pow(-1/(2*E),1.5):null;const secDt=per?per/12:.6;let t=0;const T_=dt*1.3;while(t<T_){const r=Math.hypot(S.x,S.y),h=Math.min(T_-t,.004*Math.max(.3,r));const ax=-S.x/r**3,ay=-S.y/r**3;S.vx+=ax*h/2;S.vy+=ay*h/2;S.x+=S.vx*h;S.y+=S.vy*h;const r2=Math.hypot(S.x,S.y);S.vx+=-S.x/r2**3*h/2;S.vy+=-S.y/r2**3*h/2;t+=h;S.secT+=h;S.cur.push([S.x,S.y]);if(S.secT>=secDt){S.sec.push(S.cur);S.cur=[[S.x,S.y]];S.secT=0;if(S.sec.length>12)S.sec.shift()}}
 S.tr.push([S.x,S.y]);if(S.tr.length>900)S.tr.shift();if(Math.hypot(S.x,S.y)>14){S.esc+=dt;if(S.esc>1.5)this.init(S)}},
draw(S){const f=S.p.f,E=f*f/2-1;const ap=E<0?Math.max(1,-1/E-1):6;const vr=Math.min(7,ap*1.12+.3);S.vw=S.vw===null?vr:smooth(S.vw,vr,1/60,4);
 const wide=isWide(S);const[bl,br]=split(S,.76,{g:26});const P=Plane(-S.vw,S.vw,-S.vw,S.vw,bl,true);P.grid(1,{alpha:.07});
 if(S.p.kep)S.sec.forEach((s,i)=>{if(s.length<2)return;poly([P.pt(0,0)].concat(s.map(q=>P.pt(...q))),null,A(i%2?C.teal:C.blue,.2))});
 pth(S.tr.map(q=>P.pt(...q)),A(C.fg,.5),1.6);glow(P.X(0),P.Y(0),40,C.yellow,.5);dot(P.X(0),P.Y(0),12,C.yellow);
 const q=P.pt(S.x,S.y);const r=Math.hypot(S.x,S.y),v=Math.hypot(S.vx,S.vy);arr(...q,q[0]+S.vx*40,q[1]-S.vy*40,C.blue,2.6,9);arr(...q,q[0]-S.x/r*28/(r*r)*1.2,q[1]+S.y/r*28/(r*r)*1.2,C.red,2.2,8);sphere(...q,8,C.blue);
 const Ek=v*v/2,Ep=-1/r;const bb={l:br.l+10,t:br.t+24,w:br.w-20,h:br.h-60};bars(bb,[{v:Ek,c:C.blue,l:'Eₖ',t:nf(Ek,2)},{v:Ep,c:C.red,l:'Eₚ',t:nf(Ep,2)},{v:Ek+Ep,c:C.fg,l:'E',t:nf(Ek+Ep,2)}],{max:1.4,min:-1.6,g:8});lab(bb,'Energi');T(E<0?'bundet':'unnslipper',bb.l+bb.w/2,bb.t+bb.h+32,{a:'center',s:13,c:E<0?C.green:C.yellow})},
readout(S){const r=Math.hypot(S.x,S.y),v=Math.hypot(S.vx,S.vy),E=v*v/2-1/r;return[['r',nf(r,2)],['v',nf(v,3),'blue'],['E',nf(E,3)],['bane',S.p.f<.995?'ellipse':S.p.f<1.005?'sirkel':S.p.f<Math.SQRT2-.005?'ellipse':S.p.f<Math.SQRT2+.005?'parabel':'hyperbel']]}
});

/* ---------- Elektriske felt ---------- */
{
const Ef=(qs,x,y)=>{let ex=0,ey=0,V=0;for(const c of qs){const dx=x-c.x,dy=y-c.y,r2=dx*dx+dy*dy+.02,r=Math.sqrt(r2);ex+=c.q*dx/(r2*r);ey+=c.q*dy/(r2*r);V+=c.q/r}return[ex,ey,V]};
function lines(qs){const out=[];const pos=qs.filter(c=>c.q>0),neg=qs.filter(c=>c.q<0);const src=pos.length?pos:neg,sg=pos.length?1:-1;for(const c of src){const n=Math.round(14*Math.abs(c.q));for(let k=0;k<n;k++){const a=(k+.5)/n*TAU;let x=c.x+Math.cos(a)*.22,y=c.y+Math.sin(a)*.22;const pts=[[x,y]];for(let i=0;i<500;i++){const[ex,ey]=Ef(qs,x,y);const m=Math.hypot(ex,ey);if(m<1e-6)break;x+=sg*ex/m*.06;y+=sg*ey/m*.06;pts.push([x,y]);if(Math.abs(x)>10||Math.abs(y)>7)break;if(qs.some(o=>o.q*sg<0&&Math.hypot(x-o.x,y-o.y)<.2))break}out.push(pts)}}return out}
const PRE={dipol:[{x:-2.5,y:0,q:1},{x:2.5,y:0,q:-1}],like:[{x:-2.5,y:0,q:1},{x:2.5,y:0,q:1}],kond:[...[-3,-2,-1,0,1,2,3].map(x=>({x,y:2,q:.6})),...[-3,-2,-1,0,1,2,3].map(x=>({x,y:-2,q:-.6}))]};
M({id:'fy-efelt',s:'fy',c:['FY2'],title:'Elektriske felt fra ladninger',short:'Elektriske felt',kw:'elektrisk felt feltlinjer ladning coulombs lov potensial dipol kondensator kraft',
lead:'Feltlinjene viser hvilken vei kraften på en positiv ladning peker. Der linjene ligger tett, er feltet sterkt. Dra ladningene og testladningen rundt.',
hint:'Dra ladningene og den hvite testladningen.',
controls:[{id:'vis',type:'seg',label:'Vis',value:'linjer',options:[['linjer','Feltlinjer'],['vektorer','Feltvektorer'],['pot','Potensial']]},{type:'btns',items:[['+ ladning',S=>{S.qs.push({x:rnd(-3,3),y:rnd(-2,2),q:1})}],['− ladning',S=>{S.qs.push({x:rnd(-3,3),y:rnd(-2,2),q:-1})}],['Dipol',S=>{S.qs=PRE.dipol.map(c=>({...c}))}],['To like',S=>{S.qs=PRE.like.map(c=>({...c}))}],['Kondensator',S=>{S.qs=PRE.kond.map(c=>({...c}))}],['Fjern alle',S=>{S.qs=[]}]]}],
tex:['F=k\\frac{|q_1q_2|}{r^2}','\\vec E=\\frac{\\vec F}{q}','E=k\\frac{Q}{r^2}\\quad(\\text{punktladning})'],
about:['Feltlinjene starter på positive ladninger og slutter på negative. De krysser aldri hverandre.','Den hvite testladningen er en liten positiv ladning. Den grønne pilen er kraften på den, $\\vec F=q\\vec E$.','Mellom to plater med motsatt ladning (en kondensator) blir feltet nesten homogent: like sterkt og med samme retning overalt.','Potensialet er størst (rødt) nær positive ladninger og lavest (blått) nær negative.'],
tasks:['Plasser testladningen midt mellom to like ladninger. Hva er kraften der?','Hvor faller feltstyrken når du dobler avstanden til en punktladning? Sjekk med tallene.','Lag en kondensator. Hvordan ser feltet ut mellom platene og utenfor?','Hvorfor kan to feltlinjer aldri krysse hverandre?'],
init(S){S.qs=PRE.dipol.map(c=>({...c}));S.pr={x:0,y:2};S.sig='';S.L=[];S.img=null;S.isig=''},
draw(S){const P=Plane(-8,8,-5,5,pad(S,20),true);S.P=P;const sig=S.qs.map(c=>c.x.toFixed(2)+c.y.toFixed(2)+c.q).join('|');const vis=S.p.vis;
 if(vis==='pot'){const key=sig+P.w+'x'+P.h;if(S.isig!==key){const w=Math.max(40,Math.round(P.w/5)),h=Math.max(25,Math.round(P.h/5));const cv=document.createElement('canvas');cv.width=w;cv.height=h;const cx=cv.getContext('2d'),im=cx.createImageData(w,h);const rp=rgbOf(C.red),bp=rgbOf(C.blue),bg=rgbOf(C.stage);for(let j=0;j<h;j++)for(let i=0;i<w;i++){const x=P.x0+(i+.5)/w*(P.x1-P.x0),y=P.y1-(j+.5)/h*(P.y1-P.y0);const V=Ef(S.qs,x,y)[2];const t=Math.tanh(V*.5);const c=t>0?rp:bp,a=Math.abs(t);const band=Math.abs(((V*3)%1+1)%1-.5)<.05?.35:0;const o=4*(j*w+i);for(let k=0;k<3;k++)im.data[o+k]=Math.round(bg[k]*(1-a*.85)+c[k]*a*.85+band*90);im.data[o+3]=255}cx.putImageData(im,0,0);S.img=cv;S.isig=key}X.imageSmoothingEnabled=true;X.drawImage(S.img,P.l,P.t,P.w,P.h)}
 P.grid(1,{alpha:vis==='pot'?.05:.08});
 if(vis==='linjer'){if(S.sig!==sig){S.L=lines(S.qs);S.sig=sig}S.L.forEach(pts=>{pth(pts.map(q=>P.pt(...q)),A(C.blue,.75),1.5);const m=Math.floor(pts.length/2);if(pts.length>8){const a=P.pt(...pts[m]),b=P.pt(...pts[m+1]);const ang=Math.atan2(b[1]-a[1],b[0]-a[0]);X.beginPath();X.moveTo(b[0]+Math.cos(ang)*5,b[1]+Math.sin(ang)*5);X.lineTo(b[0]-Math.cos(ang-.5)*7,b[1]-Math.sin(ang-.5)*7);X.lineTo(b[0]-Math.cos(ang+.5)*7,b[1]-Math.sin(ang+.5)*7);X.fillStyle=C.blue;X.fill()}})}
 if(vis==='vektorer'){for(let x=-7.5;x<=7.5;x+=.75)for(let y=-4.5;y<=4.5;y+=.75){const[ex,ey]=Ef(S.qs,x,y);const m=Math.hypot(ex,ey);if(m<1e-4)continue;const L=Math.min(22,6+Math.log(1+m*8)*6);const a=P.pt(x,y);arr(a[0]-ex/m*L/2,a[1]+ey/m*L/2,a[0]+ex/m*L/2,a[1]-ey/m*L/2,A(C.blue,clamp(.25+Math.log(1+m*4)*.25,.25,1)),1.6,6)}}
 const[ex,ey]=Ef(S.qs,S.pr.x,S.pr.y),m=Math.hypot(ex,ey);const pq=P.pt(S.pr.x,S.pr.y);if(m>1e-6){const L=Math.min(110,30*Math.log(1+m*6));arr(...pq,pq[0]+ex/m*L,pq[1]-ey/m*L,C.green,3,10);Tm('F',pq[0]+ex/m*L+8,pq[1]-ey/m*L-6,{c:C.green,s:16})}circ(...pq,7,C.stage,C.fg,2);
 S.qs.forEach(c=>{const q=P.pt(c.x,c.y);const col=c.q>0?C.red:C.blue;glow(...q,26,col,.35);circ(...q,12+Math.abs(c.q)*2,null,col);T(c.q>0?'+':'−',q[0],q[1]+1,{a:'center',f:'n',s:17,w:500,c:C.stage})});
 if(!S.qs.length)T('Legg til ladninger med knappene.',P.l+P.w/2,P.t+P.h/2,{a:'center',s:15,c:C.fg2})},
pick(S,x,y){const P=S.P;if(!P)return;const pq=P.pt(S.pr.x,S.pr.y);if(near(x,y,...pq,16))return{move:(mx,my)=>{S.pr={x:clamp(P.ix(mx),-7.8,7.8),y:clamp(P.iy(my),-4.8,4.8)}}};for(const c of S.qs){if(near(x,y,...P.pt(c.x,c.y),18))return{move:(mx,my)=>{c.x=clamp(P.ix(mx),-7.6,7.6);c.y=clamp(P.iy(my),-4.6,4.6)}}}},
readout(S){const[ex,ey,V]=Ef(S.qs,S.pr.x,S.pr.y);return[['|E|',nf(Math.hypot(ex,ey),3),'green'],['V',nf(V,3)],['ladninger',S.qs.length],['','(enheter: k = 1)']]}
});
}

/* ---------- Ladd partikkel i magnetfelt ---------- */
{
const ISO={C:[[12,.6],[13,.25],[14,.15]],Ne:[[20,.6],[21,.1],[22,.3]]};
M({id:'fy-bfelt',s:'fy',c:['FY2'],title:'Ladde partikler i magnetfelt',short:'Magnetfelt og ladninger',kw:'magnetfelt lorentzkraft ladd partikkel sirkelbane massespektrometer høyrehåndsregel magnetisk flukstetthet',
lead:'Magnetkraften står alltid vinkelrett på farten. Derfor gjør den ikke partikkelen raskere, men bøyer banen til en sirkel.',
controls:[{id:'mode',type:'seg',label:'Forsøk',value:'sirkel',options:[['sirkel','Sirkelbane'],['spek','Massespektrometer']]},{id:'B',label:'Magnetfelt <i>B</i>',min:.3,max:2,step:.05,value:1,unit:'T',d:2},{id:'vv',label:'Fart <i>v</i>',min:1,max:5,step:.1,value:3,unit:'(rel.)'},{id:'m',label:'Masse <i>m</i>',min:1,max:4,step:.1,value:2,unit:'(rel.)',show:S=>S.p.mode==='sirkel'},{id:'q',type:'seg',label:'Ladning',value:'+',options:[['+','Positiv'],['-','Negativ']]},{id:'dir',type:'seg',label:'Feltretning',value:'inn',options:[['inn','Inn i skjermen ×'],['ut','Ut av skjermen ·']],show:S=>S.p.mode==='sirkel'},{id:'iso',type:'seg',label:'Grunnstoff',value:'C',options:[['C','Karbon: 12, 13, 14'],['Ne','Neon: 20, 21, 22']],show:S=>S.p.mode==='spek'}],
tex:['F=qvB','qvB=m\\frac{v^2}{r}\\;\\Rightarrow\\; r=\\frac{mv}{qB}','T=\\frac{2\\pi m}{qB}'],
about:['Kraften $F=qvB$ (gul) peker alltid inn mot sentrum av sirkelen. Retningen finner du med høyrehåndsregelen. For negative ladninger snur den.','Radien øker med massen og farten, og minker med ladningen og feltstyrken.','I et <strong>massespektrometer</strong> får ioner samme fart. Tyngre isotoper får større radius og treffer detektoren lenger unna. Slik måler man masse og finner isotoper.'],
tasks:['Doble farten. Hva skjer med radien og omløpstiden?','Bytt fortegn på ladningen. Hvilken vei går partikkelen nå?','I massespektrometeret: hvor mye lenger unna treffer ¹⁴C enn ¹²C? Stemmer det med $r\\propto m$?','Hvorfor gjør ikke magnetfeltet noe arbeid på partikkelen?'],
init(S){S.pa={x:-1.5,y:-2.5,vx:S.p.vv,vy:0,tr:[]};S.ions=[];S.hits=[];S.acc=0},
change(S,id){this.init(S)},
update(S,dt){const p=S.p,sg=p.q==='+'?1:-1;if(p.mode==='sirkel'){const Bz=p.dir==='inn'?-1:1;const a=S.pa;const w=-sg*Bz*p.B/p.m*2.5;const n=8;for(let i=0;i<n;i++){const h=dt/n,c=Math.cos(w*h),s=Math.sin(w*h);const vx=a.vx*c-a.vy*s,vy=a.vx*s+a.vy*c;a.vx=vx;a.vy=vy;a.x+=a.vx*h;a.y+=a.vy*h}a.tr.push([a.x,a.y]);if(a.tr.length>500)a.tr.shift();if(Math.abs(a.x)>9||Math.abs(a.y)>6){a.x=-1.5;a.y=-2.5;a.vx=p.vv;a.vy=0;a.tr=[]}return}
 S.acc+=dt*3;while(S.acc>=1){S.acc-=1;let r=Math.random(),m=0;for(const[mm,w]of ISO[p.iso]){if(r<w){m=mm;break}r-=w}if(!m)m=ISO[p.iso][0][0];S.ions.push({x:-5.5,y:0,vx:p.vv,vy:0,m,tr:[]})}
 for(const o of S.ions){const n=8;for(let i=0;i<n;i++){const h=dt/n;if(o.x>0){const m0=ISO[p.iso][0][0],rr_=o.m/m0*2.4*(p.vv/3)/p.B,ww=sg*p.vv/rr_;const c=Math.cos(ww*h),s=Math.sin(ww*h);const vx=o.vx*c-o.vy*s,vy=o.vx*s+o.vy*c;o.vx=vx;o.vy=vy}o.x+=o.vx*h;o.y+=o.vy*h;if(o.x<0&&o.vx<0&&Math.abs(o.y)>.2){o.done=true;S.hits.push({y:o.y,m:o.m});if(S.hits.length>400)S.hits.shift();break}}o.tr.push([o.x,o.y]);if(Math.abs(o.y)>8||o.x>9)o.done=true}S.ions=S.ions.filter(o=>!o.done)},
draw(S){const p=S.p;if(p.mode==='sirkel'){const P=Plane(-8,8,-5,5,pad(S,20),true);const sym=p.dir==='inn';for(let x=-7.5;x<=7.5;x+=1)for(let y=-4.5;y<=4.5;y+=1){const q=P.pt(x,y);if(sym){ln(q[0]-4,q[1]-4,q[0]+4,q[1]+4,A(C.fg,.22),1.3);ln(q[0]-4,q[1]+4,q[0]+4,q[1]-4,A(C.fg,.22),1.3)}else{circ(...q,4.5,A(C.fg,.22),null,1.2);dot(...q,1.5,A(C.fg,.35))}}
  const a=S.pa;pth(a.tr.map(q=>P.pt(...q)),A(p.q==='+'?C.red:C.blue,.7),2);const q=P.pt(a.x,a.y),v=Math.hypot(a.vx,a.vy);arr(...q,q[0]+a.vx/v*50,q[1]-a.vy/v*50,C.blue,2.6,9);Tm('v',q[0]+a.vx/v*58,q[1]-a.vy/v*58,{c:C.blue,a:'center',s:16});
  const sg=p.q==='+'?1:-1,Bz=sym?-1:1;const fx=sg*a.vy*Bz,fy=-sg*a.vx*Bz;const fl=Math.hypot(fx,fy)||1;arr(...q,q[0]+fx/fl*44,q[1]-fy/fl*44,C.yellow,2.6,9);Tm('F',q[0]+fx/fl*52,q[1]-fy/fl*52,{c:C.yellow,a:'center',s:16});
  glow(...q,16,p.q==='+'?C.red:C.blue,.5);circ(...q,8,null,p.q==='+'?C.red:C.blue);T(p.q==='+'?'+':'−',q[0],q[1]+1,{a:'center',f:'n',s:12,c:C.stage,w:500});
  const r=.4*p.m*p.vv/p.B;T(`r = mv/(qB) = ${nf(r,2)}`,P.l+8,P.t+14,{f:'n',s:13,c:C.fg2,bg:A(C.stage,.8)});return}
 const P=Plane(-6,9,-1,7,pad(S,20),true);rct(P.X(0),P.t,P.X(9)-P.X(0),P.h,null,A(C.blue,.06));for(let x=.5;x<9;x+=1)for(let y=-.5;y<7;y+=1){const q=P.pt(x,y);ln(q[0]-3.5,q[1]-3.5,q[0]+3.5,q[1]+3.5,A(C.fg,.16),1.2);ln(q[0]-3.5,q[1]+3.5,q[0]+3.5,q[1]-3.5,A(C.fg,.16),1.2)}
 ln(P.X(0),P.Y(.25),P.X(0),P.Y(7),C.fg2,4);T('detektor',P.X(0)-8,P.Y(6.6),{a:'right',s:12,c:C.fg2});ln(P.X(-6),P.Y(0),P.X(-.2),P.Y(0),A(C.fg,.2),1,[4,4]);T('ionekilde (samme fart)',P.X(-5.8),P.Y(0)+16,{s:11.5,c:C.fg3});
 S.ions.forEach(o=>{pth(o.tr.map(q=>P.pt(...q)),A(C.gold,.35),1.2);dot(...P.pt(o.x,o.y),3,C.gold)});
 const cnt={};S.hits.forEach(h=>{const k=h.m;cnt[k]=cnt[k]||{n:0,y:0};cnt[k].n++;cnt[k].y+=h.y;dot(P.X(0)-6-Math.random()*0,P.Y(h.y),2.2,A(C.yellow,.5))});
 for(const k in cnt){const yy=cnt[k].y/cnt[k].n;const w=Math.min(60,cnt[k].n*1.2);rct(P.X(0)-10-w,P.Y(yy)-3,w,6,null,A(C.yellow,.8));T(sup(k)+(p.iso==='C'?'C':'Ne'),P.X(0)-16-w,P.Y(yy),{a:'right',f:'n',s:13,c:C.yellow})}},
readout(S){const p=S.p;if(p.mode==='sirkel'){const r=.4*p.m*p.vv/p.B;return[['r',nf(r,2)],['T',nf(TAU*r/p.vv,2)+' s'],['F',nf(p.vv*p.B,2)+' (rel.)']]}return[['ioner',S.hits.length],['','r ∝ m: tyngre isotop, større bue']]}
});
}

/* ---------- Elektromagnetisk induksjon ---------- */
M({id:'fy-induksjon',s:'fy',c:['FY2'],title:'Elektromagnetisk induksjon',short:'Induksjon og generator',kw:'induksjon fluks faradays lov lenz lov indusert spenning ems generator vekselstrøm spole magnet kraftverk',
lead:'Når den magnetiske fluksen gjennom en spole endrer seg, induseres det en spenning. Det er ikke magneten i seg selv, men endringen, som gir strøm.',
hint:'Dra magneten gjennom spolen.',
controls:[{id:'mode',type:'seg',label:'Forsøk',value:'magnet',options:[['magnet','Magnet og spole'],['gen','Generator']]},{id:'N',label:'Vindinger <i>N</i>',min:10,max:500,step:10,value:200},{id:'auto',type:'check',label:'Magneten svinger av seg selv',value:true,show:S=>S.p.mode==='magnet'},{id:'fq',label:'Frekvens <i>f</i>',min:.2,max:2.5,step:.05,value:.6,unit:'Hz',d:2},{id:'B',label:'Magnetfelt <i>B</i>',min:.1,max:1,step:.05,value:.5,unit:'T',d:2,show:S=>S.p.mode==='gen'}],
tex:['\\Phi=B\\cdot A\\cos\\theta','\\varepsilon=-N\\frac{\\Delta\\Phi}{\\Delta t}','\\text{generator: }\\varepsilon=NBA\\omega\\sin(\\omega t)'],
about:['Den blå grafen er fluksen $\\Phi$ gjennom spolen. Den gule er den induserte spenningen. Legg merke til at spenningen er størst der fluksen endrer seg raskest, ikke der den er størst.','<strong>Lenz’ lov:</strong> den induserte strømmen setter opp et magnetfelt som motvirker endringen. Derfor er det et minustegn i Faradays lov.','I en <strong>generator</strong> roterer spolen i et magnetfelt. Fluksen varierer som en cosinus, og spenningen blir vekselspenning. Slik produseres nesten all elektrisk energi, fra vannkraftverk til vindmøller.'],
tasks:['Stopp magneten midt inne i spolen. Hvor stor er spenningen da?','Hva skjer med den maksimale spenningen når du dobler farten på magneten? Og antall vindinger?','I generatoren: i hvilken stilling er fluksen størst? Og spenningen?','Forklar hvordan et vannkraftverk lager elektrisk energi. Hvilke energiomforminger skjer?'],
init(S){S.xm=-3;S.hist=[];S.tt=0;S.prev=null;S.eps=0;S.ph=0},
change(S,id){if(id==='mode')this.init(S)},
flux(x){return 1/Math.pow(1+(x/1.1)**2,1.5)},
update(S,dt){S.tt+=dt;const p=S.p;let Phi,eps;if(p.mode==='magnet'){if(p.auto&&!(Stage.drag&&S===Stage.S))S.xm=-3.4*Math.cos(TAU*p.fq*S.tt);Phi=this.flux(S.xm)*.02;const pv=S.prev===null?Phi:S.prev;eps=-p.N*(Phi-pv)/Math.max(dt,1e-4);S.prev=Phi}else{S.ph+=TAU*p.fq*dt;const A_=.01,w=TAU*p.fq;Phi=p.B*A_*Math.cos(S.ph);eps=p.N*p.B*A_*w*Math.sin(S.ph)}
 S.eps=smooth(S.eps,eps,dt,25);S.hist.push([S.tt,Phi,S.eps]);while(S.hist.length&&S.hist[0][0]<S.tt-6)S.hist.shift()},
draw(S){const p=S.p;const[bt,bb]=rows(pad(S,26,20,26),[1.45,1],28);const cx=bt.l+bt.w*.5,cy=bt.t+bt.h*.48;
 if(p.mode==='magnet'){const sc=Math.min(bt.w/11,bt.h/4.5);S.geo={sc,cx,cy};const mx=cx+S.xm*sc,mw=2*sc,mh=.62*sc;
  for(let k=1;k<=3;k++){X.strokeStyle=A(C.fg,.1);X.lineWidth=1;X.beginPath();X.ellipse(mx,cy,mw*.5+k*sc*.5,mh*.5+k*sc*.4,0,0,TAU);X.stroke()}
  const cw=1.6*sc,chh=1.5*sc;for(let i=0;i<9;i++){const x=cx-cw/2+i*cw/8;X.beginPath();X.ellipse(x,cy,sc*.18,chh/2,0,PI/2,PI*1.5);X.strokeStyle=A(C.gold,.45);X.lineWidth=3;X.stroke()}
  rct(mx-mw/2,cy-mh/2,mw/2,mh,null,C.blue);rct(mx,cy-mh/2,mw/2,mh,null,C.red);T('S',mx-mw/4,cy+1,{a:'center',f:'n',s:15,w:500,c:C.stage});T('N',mx+mw/4,cy+1,{a:'center',f:'n',s:15,w:500,c:C.stage});
  for(let i=0;i<9;i++){const x=cx-cw/2+i*cw/8;X.beginPath();X.ellipse(x,cy,sc*.18,chh/2,0,-PI/2,PI/2);X.strokeStyle=C.gold;X.lineWidth=3;X.stroke()}
  if(!S.touched&&!p.auto)handle(mx,cy-mh/2-14,C.yellow,S)}
 else{const sc=Math.min(bt.w/10,bt.h/4.2);rct(cx-4.2*sc,cy-1.3*sc,1.2*sc,2.6*sc,null,C.red);rct(cx+3*sc,cy-1.3*sc,1.2*sc,2.6*sc,null,C.blue);T('N',cx-3.6*sc,cy,{a:'center',f:'n',s:18,w:500,c:C.stage});T('S',cx+3.6*sc,cy,{a:'center',f:'n',s:18,w:500,c:C.stage});
  for(let k=-2;k<=2;k++)arr(cx-2.9*sc,cy+k*sc*.5,cx+2.9*sc,cy+k*sc*.5,A(C.fg,.18),1.2,7);const w=Math.cos(S.ph),hw=1.9*sc*w,hh=1.1*sc;const front=Math.sin(S.ph)>0;
  poly([[cx-hw,cy-hh],[cx+hw,cy-hh],[cx+hw,cy+hh],[cx-hw,cy+hh]],front?C.gold:A(C.gold,.55),A(C.gold,.1),3);ln(cx,cy-hh-14,cx,cy+hh+14,A(C.fg,.5),1.3,[4,4]);T('Φ = BA cos ωt',cx,cy+hh+30,{a:'center',f:'m',s:15,c:C.fg2})}
 const gx=bt.l+bt.w-70,gy=bt.t+bt.h*.9,gr=Math.min(56,bt.h*.3);marc(gx,gy,gr,0,PI,A(C.fg,.5),1.5);const an=PI/2-clamp(S.eps/(p.mode==='gen'?p.N*p.B*.01*TAU*2.5:p.N*.02*8),-1,1)*1.2;ln(gx,gy,gx+Math.cos(an)*gr*.92,gy-Math.sin(an)*gr*.92,C.yellow,2.4);dot(gx,gy,4,C.fg);T('voltmeter',gx,gy+14,{a:'center',s:11,c:C.fg3});
 const lx=bt.l+60,ly=bt.t+bt.h*.8,br=1-Math.exp(-Math.abs(S.eps)/(p.mode==='gen'?1:2));glow(lx,ly,40*br+8,C.gold,.6*br);circ(lx,ly,12,C.fg,C.stage,1.6);T('lyspære',lx,ly+24,{a:'center',s:11,c:C.fg3});
 const[g1,g2]=isWide(S)?cols(bb,[1,1],30):rows(bb,[1,1],16);const H=S.hist;if(H.length>1){const t0=S.tt-6;const pm=Math.max(1e-6,...H.map(h=>Math.abs(h[1])))*1.15,em=Math.max(.01,...H.map(h=>Math.abs(h[2])))*1.15;
  const P1=Plane(t0,S.tt,-pm,pm,g1),P2=Plane(t0,S.tt,-em,em,g2);[P1,P2].forEach(P=>ln(P.l,P.Y(0),P.l+P.w,P.Y(0),A(C.fg,.35),1));
  P1.clip(()=>pth(H.map(h=>P1.pt(h[0],h[1])),C.blue,2.6));P2.clip(()=>pth(H.map(h=>P2.pt(h[0],h[2])),C.yellow,2.6));lab(g1,'Fluks Φ');lab(g2,'Indusert spenning ε');T(nf(S.eps,2)+' V',g2.l+g2.w,g2.t-11,{a:'right',f:'n',s:12,c:C.yellow})}},
pick(S,x,y){if(S.p.mode!=='magnet'||!S.geo)return;const g=S.geo;const mx=g.cx+S.xm*g.sc;if(Math.abs(x-mx)<g.sc*1.1&&Math.abs(y-g.cy)<g.sc*.6)return{move:mx2=>{if(S.p.auto)setP('auto',false,S);S.xm=clamp((mx2-g.cx)/g.sc,-4.5,4.5)}}},
readout(S){const p=S.p;const r=[['ε',nf(S.eps,3)+' V','yellow']];if(p.mode==='gen')r.push(['ε maks',nf(p.N*p.B*.01*TAU*p.fq,2)+' V'],['A','0,010 m²']);return r}
});

/* ---------- Spesiell relativitet: lysklokke ---------- */
M({id:'fy-relativitet',s:'fy',c:['FY2'],title:'Lysklokka og tidsdilatasjon',short:'Relativitetsteori',kw:'relativitetsteori einstein tidsdilatasjon lysklokke lengdekontraksjon lyshastighet gammafaktor myoner',
lead:'Lyset går alltid med samme fart $c$. I klokka som beveger seg, må lyset gå en lengre skrå vei. Derfor tikker den saktere sett fra oss.',
controls:[{id:'b',label:'Fart <i>v</i>/<i>c</i>',min:0,max:.98,step:.01,value:.6,d:2},{id:'kon',type:'check',label:'Vis lengdekontraksjon',value:false},{type:'btns',items:[['Nullstill tellerne',S=>{S.tau=0;S.x0=0}]]}],
tex:['\\gamma=\\frac{1}{\\sqrt{1-v^2/c^2}}','\\Delta t=\\gamma\\,\\Delta t_0','L=\\frac{L_0}{\\gamma}'],
about:['Til venstre står en klokke i ro hos oss. Til høyre flyr en identisk klokke forbi med farten $v$. Hvert tikk er én tur opp og ned for lyset.','I den bevegelige klokka går lyset langs den skrå streken. Med Pytagoras får vi at tiden mellom tikkene er $\\gamma$ ganger lengre.','Dette er ikke en feil ved klokka. All tid går saktere for et system i bevegelse, også hjerteslag og radioaktivt henfall. Myoner fra kosmisk stråling når jordoverflaten bare fordi tiden deres går sakte.'],
tasks:['Hvor stor må farten være for at den bevegelige klokka skal tikke halvparten så fort?','Bruk trekanten nederst til å utlede formelen for $\\gamma$.','Et myon lever i 2,2 µs i ro. Hvor lenge lever det sett fra jorda hvis $v=0{,}99c$?','Hvorfor merker vi ikke tidsdilatasjon i hverdagen?'],
init(S){S.tau=0;S.x0=0;S.tr=[]},
update(S,dt){S.tau+=dt;S.x0+=dt},
draw(S){const b=S.v.b,g=1/Math.sqrt(1-b*b);const box=pad(S,26,22,26);const[top,bot]=rows(box,[2.3,1],24);const L=top.h*.62,c=L/.75,T0=2*L/c;const y0=top.t+top.h*.85;
 const tri=(t,P)=>{const ph=(t%P)/P;return ph<.5?ph*2:2-ph*2};
 const sx=top.l+top.w*.12;const drawClock=(x,yb,w,ph,col)=>{ln(x-w/2,yb,x+w/2,yb,C.fg,3);ln(x-w/2,yb-L,x+w/2,yb-L,C.fg,3);ln(x-w/2,yb,x-w/2,yb-L,A(C.fg,.15),1);ln(x+w/2,yb,x+w/2,yb-L,A(C.fg,.15),1);const py=yb-ph*L;glow(x,py,14,col,.6);dot(x,py,5,col)};
 drawClock(sx,y0,48,tri(S.tau,T0),C.yellow);T('i ro',sx,y0+18,{a:'center',s:12,c:C.fg2});T(`${Math.floor(S.tau/T0)} tikk`,sx,top.t+4,{a:'center',f:'n',s:14,c:C.yellow});
 const tl=top.l+top.w*.26,tr_=top.l+top.w-10,span=tr_-tl;const v=b*c;const Tm_=g*T0;const xr=((S.x0*v)%span+span)%span;const mx=tl+xr;const wC=S.p.kon?48/g:48;
 const steps=60,pts=[];for(let i=0;i<=steps;i++){const tt=S.tau-i*Tm_*1.2/steps;if(tt<0)break;const xx=mx-(S.tau-tt)*v;if(xx<tl)break;pts.push([xx,y0-tri(tt,Tm_)*L])}pth(pts,A(C.blue,.5),1.6);
 drawClock(mx,y0,wC,tri(S.tau,Tm_),C.blue);arr(mx+wC/2+6,y0-L/2,mx+wC/2+6+Math.max(8,b*60),y0-L/2,A(C.fg,.5),1.6,7);T(`v = ${nf(b,2)}c`,mx,y0+18,{a:'center',s:12,c:C.fg2});T(`${Math.floor(S.tau/Tm_)} tikk`,(tl+tr_)/2,top.t+4,{a:'center',f:'n',s:14,c:C.blue});ln(tl,y0+30,tr_,y0+30,A(C.fg,.15),1);
 const th=bot.h*.8,tw2=Math.min(bot.w*.5,th*b*g/Math.max(.05,1)*1.2+10);const ox=bot.l+bot.w*.3,oy=bot.t+bot.h*.92;const hx=th*b/Math.sqrt(Math.max(1e-6,1-b*b));const hw=Math.min(bot.w*.55,hx);
 poly([[ox,oy],[ox+hw,oy],[ox+hw,oy-th]],null,A(C.blue,.06));ln(ox,oy,ox+hw,oy,C.fg2,2);ln(ox+hw,oy,ox+hw,oy-th,C.yellow,2.4);ln(ox,oy,ox+hw,oy-th,C.blue,2.4);
 T('c·Δt₀/2',ox+hw+8,oy-th/2,{f:'m',s:14,c:C.yellow});T('v·Δt/2',ox+hw/2,oy+14,{a:'center',f:'m',s:14,c:C.fg2});T('c·Δt/2',ox+hw/2-14,oy-th/2-10,{a:'right',f:'m',s:14,c:C.blue});
 T(`γ = ${nf(g,3)}`,bot.l,bot.t+bot.h*.4,{f:'n',s:16,c:C.fg})},
readout(S){const b=S.p.b,g=1/Math.sqrt(1-b*b);return[['v',nf(b,2)+' c'],['γ',nf(g,3)],['Δt / Δt₀',nf(g,3)],['L / L₀',nf(1/g,3)]]}
});

/* ---------- Kvantefysikk: dobbeltspalte ---------- */
{
function intens(p,y){const D=10,a=.35,lam=p.lam,d=p.d;const env=yy=>{const s=yy/Math.sqrt(yy*yy+D*D);const u=PI*a*s/lam;return u===0?1:(Math.sin(u)/u)**2};if(p.mode==='en')return env(y-d/2);if(p.mode==='mal')return .5*(env(y-d/2)+env(y+d/2));const s=y/Math.sqrt(y*y+D*D);return env(y)*Math.cos(PI*d*s/lam)**2}
M({id:'fy-kvante',s:'fy',c:['FY2'],title:'Dobbeltspalten: partikler som oppfører seg som bølger',short:'Dobbeltspalten',kw:'kvantefysikk kvanteobjekt bølge-partikkel-dualitet interferens dobbeltspalte foton elektron måling sannsynlighet',
lead:'Partiklene sendes én og én. Hver treffer skjermen i et enkelt punkt, men etter hvert dukker det opp et stripemønster. Hver partikkel oppfører seg som en bølge som går gjennom begge spaltene.',
controls:[{id:'mode',type:'seg',label:'Spalter',value:'to',options:[['to','To spalter'],['en','Én spalte'],['mal','Måler hvilken spalte']]},{id:'lam',label:'Bølgelengde <i>λ</i>',min:.5,max:2,step:.05,value:1,unit:'(rel.)',d:2},{id:'d',label:'Spalteavstand <i>d</i>',min:1,max:4,step:.1,value:2.5,unit:'(rel.)'},{id:'rate',label:'Partikler per sekund',min:5,max:400,step:5,value:80},{id:'wv',type:'check',label:'Vis bølgefrontene',value:true},{id:'cv',type:'check',label:'Vis sannsynlighetsfordelingen',value:false},{type:'btns',items:[['Tøm skjermen',S=>{S.hits=[];S.hist=new Array(90).fill(0)}]]}],
tex:['d\\sin\\theta=n\\lambda\\quad(\\text{lyse striper})','\\lambda=\\frac{h}{p}\\quad(\\text{de Broglie})','\\Delta x\\cdot\\Delta p\\ge\\frac{h}{4\\pi}'],
about:['Ett og ett treff ser tilfeldig ut. Det er umulig å forutsi hvor neste partikkel lander, bare sannsynligheten. Mønsteret vokser fram av mange treff.','Med to spalter blir det interferens: noen steder forsterker bølgene hverandre, andre steder slukker de hverandre ut.','Når vi <strong>måler</strong> hvilken spalte partikkelen går gjennom, forsvinner stripene. Målingen ødelegger interferensen. Dette skiller kvanteobjekter fra klassiske objekter.','Det samme skjer med fotoner, elektroner og til og med hele molekyler.'],
tasks:['Hva skjer med avstanden mellom stripene når bølgelengden øker? Og når spalteavstanden øker?','Sammenlign «én spalte» med «måler hvilken spalte». Hvorfor blir mønsteret slik?','Elektroner har mye kortere bølgelengde enn synlig lys. Hva betyr det for stripene?','Forklar med egne ord hvorfor en partikkel ikke kan ha en bestemt bane i dette forsøket.'],
init(S){S.ps=[];S.hits=[];S.hist=new Array(90).fill(0);S.acc=0;S.sig='';S.cdf=null},
change(S,id){if(id!=='rate'&&id!=='wv'&&id!=='cv'){S.hits=[];S.hist=new Array(90).fill(0)}},
cdf(S){const p=S.p,sig=p.mode+p.lam+p.d;if(S.sig===sig)return S.cdf;const n=600,Y=7,arr_=[];let s=0;for(let i=0;i<n;i++){const y=-Y+2*Y*(i+.5)/n;s+=intens(p,y);arr_.push(s)}S.cdf={a:arr_.map(v=>v/s),n,Y};S.sig=sig;return S.cdf},
update(S,dt){const c=this.cdf(S);S.acc+=dt*S.p.rate;while(S.acc>=1){S.acc-=1;const u=Math.random();let lo=0,hi=c.n-1;while(lo<hi){const m=(lo+hi)>>1;if(c.a[m]<u)lo=m+1;else hi=m}const y=-c.Y+2*c.Y*(lo+Math.random())/c.n;const sl=S.p.mode==='en'?1:Math.random()<.5?1:-1;S.ps.push({t:0,y,sl})}
 for(const p of S.ps){p.t+=dt*1.6;if(p.t>=1){p.done=true;S.hits.push([p.y,Math.random()]);if(S.hits.length>8000)S.hits.shift();const k=Math.floor((p.y+7)/14*90);if(k>=0&&k<90)S.hist[k]++}}S.ps=S.ps.filter(p=>!p.done)},
draw(S){const p=S.p,v=S.v;const b=pad(S,20,24,24);const xs=b.l+b.w*.05,xb=b.l+b.w*.3,xsc=b.l+b.w*.8,cy=b.t+b.h/2;const sy=b.h/14.5;const col=wl2rgb(400+(p.lam-.5)/1.5*300);const c2=col;
 const slits=p.mode==='en'?[1]:[1,-1];const slitY=s=>cy-s*v.d/2*sy;
 if(p.wv){X.save();X.beginPath();X.rect(xb,b.t,xsc-xb,b.h);X.clip();const lpx=v.lam*sy*.9;const off=(S.t*40)%lpx;slits.forEach(s=>{for(let r=off;r<xsc-xb+40;r+=lpx){X.beginPath();X.arc(xb,slitY(s),r,-PI/2,PI/2);X.strokeStyle=A(C.fg,.07);X.lineWidth=1.2;X.stroke()}});X.restore();for(let r=(S.t*40)%(v.lam*sy*.9);r<xb-xs;r+=v.lam*sy*.9)ln(xs+r,b.t+b.h*.2,xs+r,b.t+b.h*.8,A(C.fg,.06),1.2)}
 const gap=.35*sy;ln(xb,b.t,xb,b.t+b.h,C.fg2,4);slits.forEach(s=>{rct(xb-3,slitY(s)-gap/2,6,gap,null,C.stage)});if(p.mode==='en'){}
 if(p.mode==='mal')slits.forEach(s=>{circ(xb-14,slitY(s),6,C.green,null,1.5);T('måler',xb-24,slitY(s)-12,{a:'right',s:10.5,c:C.green})});
 rr(xs-14,cy-12,22,24,4,null,A(C.fg,.6));T('kilde',xs-3,cy+24,{a:'center',s:11,c:C.fg3});ln(xsc,b.t,xsc,b.t+b.h,A(C.fg,.5),2);
 S.ps.forEach(q=>{let x,y;if(q.t<.35){const u=q.t/.35;x=lerp(xs,xb,u);y=lerp(cy,slitY(q.sl),u)}else{const u=(q.t-.35)/.65;x=lerp(xb,xsc,u);y=lerp(slitY(q.sl),cy-q.y*sy,u)}dot(x,y,2.2,c2)});
 S.hits.forEach(h=>dot(xsc-2-h[1]*10,cy-h[0]*sy,1.3,c2));
 const hx=xsc+12,hw=b.l+b.w-hx-4,mx=Math.max(5,...S.hist);const bh=b.h*(14/14.5)/90;S.hist.forEach((n,i)=>{const y=cy+7*sy-(i+1)*bh*(14.5/14)*(14/14.5);const yy=cy-(-7+(i+.5)*14/90)*sy;rct(hx,yy-bh/2,n/mx*hw,Math.max(1,bh-.5),null,A(C.blue,.75))});
 if(p.cv){let im=0;for(let i=0;i<200;i++)im=Math.max(im,intens(p,-7+14*i/200));X.beginPath();for(let i=0;i<=200;i++){const y=-7+14*i/200,x=hx+intens(p,y)/im*hw;i?X.lineTo(x,cy-y*sy):X.moveTo(x,cy-y*sy)}X.strokeStyle=C.yellow;X.lineWidth=2;X.stroke()}
 T(S.hits.length+' treff',xsc,b.t-8,{a:'center',f:'n',s:12,c:C.fg2})},
readout(S){const p=S.p;return[['treff',S.hits.length],['stripeavstand',p.mode==='to'?nf(p.lam*10/p.d,2)+' (rel.)':'–'],['','λ·D/d']]}
});
}

/* ---------- Fotoelektrisk effekt ---------- */
{
const MET={Cs:['Cesium',2.14],Na:['Natrium',2.28],Zn:['Sink',4.33],Cu:['Kobber',4.70]};
const hEV=4.1357e-15,cL=2.998e8;
M({id:'fy-foto',s:'fy',c:['FY2'],title:'Den fotoelektriske effekten',short:'Fotoelektrisk effekt',kw:'fotoelektrisk effekt foton løsrivningsarbeid kvantefysikk einstein frekvens energi elektron intensitet planck',
lead:'Lys slår løs elektroner fra metall, men bare hvis hvert enkelt foton har nok energi. Sterkere lys gir flere elektroner, ikke raskere elektroner.',
controls:[{id:'met',type:'seg',label:'Metall',value:'Na',options:Object.entries(MET).map(([k,v])=>[k,v[0]])},{id:'lam',label:'Bølgelengde <i>λ</i>',min:150,max:800,step:5,value:430,unit:'nm'},{id:'I',label:'Lysintensitet',min:1,max:10,step:1,value:5}],
tex:['E_f=hf=\\frac{hc}{\\lambda}','E_{k,\\text{maks}}=hf-W','f_0=\\frac{W}{h}'],
about:['Hvert foton har energi $E=hf$. Er den mindre enn løsrivningsarbeidet $W$, skjer det ingenting, uansett hvor sterkt lyset er.','Når fotonenergien er større enn $W$, får elektronet resten som kinetisk energi. Grafen er en rett linje med stigningstall $h$, Plancks konstant.','Dette kunne ikke forklares med lys som bølger. Einstein fikk Nobelprisen for å forklare det med lyskvanter (fotoner) i 1905.'],
tasks:['Finn grensebølgelengden for natrium. Hvilken farge er det?','Bruk rødt lys på natrium og skru opp intensiteten. Hva skjer? Hvorfor?','Hvilket av metallene trenger ultrafiolett lys?','Les av grafen: hvor stor er $E_k$ for natrium belyst med 300 nm?'],
init(S){S.ph=[];S.el=[];S.acc=0;S.cnt=[]},
update(S,dt){const p=S.p,E=1239.84/p.lam,W=MET[p.met][1];S.acc+=dt*p.I*2.2;while(S.acc>=1){S.acc-=1;S.ph.push({t:0,x:Math.random()})}
 S.ph.forEach(q=>{q.t+=dt*1.4;if(q.t>=1){q.done=true;if(E>W){const ek=E-W;S.el.push({x:q.x,t:0,v:Math.sqrt(ek),a:-PI/2+(Math.random()-.5)*1.2});S.cnt.push(S.t)}else q.miss=true}});S.ph=S.ph.filter(q=>!q.done);
 S.el.forEach(e=>e.t+=dt);S.el=S.el.filter(e=>e.t<2);while(S.cnt.length&&S.cnt[0]<S.t-2)S.cnt.shift()},
draw(S){const p=S.p,E=1239.84/p.lam,W=MET[p.met][1];const[bl,br]=split(S,.5,{g:34});const col=p.lam<380?C.purple:p.lam>750?C.red:wl2rgb(p.lam);
 const py=bl.t+bl.h*.78,px0=bl.l+bl.w*.12,px1=bl.l+bl.w*.95;rct(px0,py,px1-px0,16,null,'#7d8791');T(MET[p.met][0]+'plate  (W = '+nf(W,2)+' eV)',(px0+px1)/2,py+30,{a:'center',s:12.5,c:C.fg2});
 const lx=bl.l+bl.w*.12,ly=bl.t+20;rr(lx-20,ly-12,40,24,4,null,A(C.fg,.7));glow(lx,ly+8,40,col,.35);T('lampe',lx,ly-22,{a:'center',s:11,c:C.fg3});
 S.ph.forEach(q=>{const tx=px0+q.x*(px1-px0);const x1=lerp(lx,tx,clamp(q.t-.15,0,1)),y1=lerp(ly+12,py,clamp(q.t-.15,0,1)),x2=lerp(lx,tx,q.t),y2=lerp(ly+12,py,q.t);wig(x1,y1,x2,y2,Math.max(5,p.lam/45),4,col,1.8)});
 S.el.forEach(e=>{const x=px0+e.x*(px1-px0)+Math.cos(e.a)*e.v*e.t*90,y=py+Math.sin(e.a)*e.v*e.t*90;dot(x,y,4,C.blue);if(e.t<.3)T('e⁻',x+6,y-6,{f:'m',s:12,c:C.blue})});
 if(E<=W)T('Fotonene har for lite energi: ingen elektroner',(px0+px1)/2,py-20,{a:'center',s:13,c:C.red,bg:A(C.stage,.8)});
 const P=Plane(0,20,-5,5,br);P.grid(2,{sy:1,minor:false,alpha:.1});P.axes({xs:4,ys:1,xl:'f (10¹⁴ Hz)',yl:'Eₖ (eV)',ls:13});
 Object.entries(MET).forEach(([k,[n,w]])=>{const f0=w/hEV/1e14;P.fn(f=>hEV*f*1e14-w,k===p.met?C.yellow:A(C.fg,.2),k===p.met?2.8:1.4,{from:0});if(k!==p.met)T(n,P.X(19),P.Y(hEV*19e14-w)+12,{a:'right',s:10.5,c:C.fg3})});
 const f=cL/(p.lam*1e-9)/1e14;const f0=W/hEV/1e14;P.clip(()=>{ln(P.X(f),P.t,P.X(f),P.t+P.h,A(col,.8),1.6,[4,4])});dot(P.X(f0),P.Y(0),5,C.red);T('f₀',P.X(f0),P.Y(0)+15,{a:'center',f:'m',s:15,c:C.red});
 if(E>W&&f<=20)dot(P.X(f),P.Y(E-W),6,C.yellow);T('stigningstall = h',P.X(14),P.Y(hEV*14e14-W)-14,{a:'center',s:11.5,c:C.yellow})},
readout(S){const p=S.p,E=1239.84/p.lam,W=MET[p.met][1];return[['E foton',nf(E,2)+' eV'],['f',nf(cL/(p.lam*1e-9)/1e14,2)+' · 10¹⁴ Hz'],['Eₖ maks',E>W?nf(E-W,2)+' eV':'–','yellow'],['λ₀',nf(1239.84/W,0)+' nm','red'],['elektroner/s',nf(S.cnt.length/2,1),'blue']]}
});
}
