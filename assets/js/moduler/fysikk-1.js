/* ================= FYSIKK 1 ================= */
const G0=9.81;
function car(x,y,w,c){const h=w*.32;rr(x-w/2,y-h-w*.12,w,h,5,null,c);rr(x-w*.25,y-h-w*.12-h*.6,w*.45,h*.7,4,null,mix(c,'#000000',.25));circ(x-w*.28,y-w*.12,w*.12,null,'#1b1f24');circ(x+w*.28,y-w*.12,w*.12,null,'#1b1f24');circ(x-w*.28,y-w*.12,w*.05,null,C.fg2);circ(x+w*.28,y-w*.12,w*.05,null,C.fg2)}

/* ---------- Rettlinjet bevegelse ---------- */
M({id:'fy-bevegelse',s:'fy',c:['FY1'],title:'Rettlinjet bevegelse: posisjon, fart og akselerasjon',short:'Bevegelsesgrafer',kw:'posisjon fart akselerasjon graf fartsgraf posisjonsgraf strekning areal stigningstall bevegelseslikningene',
lead:'Bilen kjører langs en rett vei. Grafene viser posisjon, fart og akselerasjon. Arealet under fartsgrafen er strekningen, og stigningstallet til fartsgrafen er akselerasjonen.',
controls:[{id:'mode',type:'seg',label:'Bevegelse',value:'aks',options:[['fart','Konstant fart'],['aks','Konstant akselerasjon'],['brems','Bremsing'],['styr','Styr selv']]},
 {id:'v0',label:'Startfart <i>v</i>₀',min:0,max:20,step:.5,value:2,unit:'m/s',show:S=>S.p.mode!=='styr'},
 {id:'a',label:'Akselerasjon <i>a</i>',min:-5,max:5,step:.1,value:1.5,unit:'m/s²',show:S=>S.p.mode==='aks'||S.p.mode==='styr'}],
tex:['v=v_0+at','s=v_0t+\\tfrac12at^2','v^2-v_0^2=2as','s=\\frac{v_0+v}{2}\\cdot t'],
about:['Den gule grafen er posisjonen $s(t)$. Stigningstallet til den er farten.','Den blå grafen er farten $v(t)$. Det turkise arealet under den er strekningen bilen har kjørt.','Den røde grafen er akselerasjonen $a(t)$. Ved konstant akselerasjon er fartsgrafen en rett linje og posisjonsgrafen en parabel.','Velg «Styr selv» og endre akselerasjonen mens bilen kjører. Se hvordan grafene tegnes.'],
tasks:['En bil akselererer fra 0 til 20 m/s på 8 s. Finn akselerasjonen og strekningen. Sjekk med animasjonen.','Hvordan ser posisjonsgrafen ut når farten er konstant?','Bremsing: hvor langt kjører bilen fra 16 m/s med $a=-2{,}5$ m/s²? Bruk $v^2-v_0^2=2as$.','Styr selv: få bilen til å stoppe akkurat ved 100 m.'],
init(S){S.tt=0;S.s=0;S.vv=S.p.mode==='styr'?0:S.p.v0;S.hist=[[0,0,S.vv,0]];S.rec=0;S.hold=0;S.acur=0},
change(S,id){if(id==='mode'){if(S.p.mode==='brems')setP('v0',16,S);else if(S.p.mode==='fart')setP('v0',8,S);else if(S.p.mode==='aks')setP('v0',2,S)}if(id!=='a'||S.p.mode!=='styr')this.init(S)},
update(S,dt){if(S.hold>0){S.hold-=dt;if(S.hold<=0)this.init(S);return}const p=S.p;const a=p.mode==='fart'?0:p.mode==='brems'?(S.vv>0?-2.5:0):p.a;
 for(let i=0;i<4;i++){const h=dt/4;S.vv+=a*h;if(p.mode==='brems'&&S.vv<0)S.vv=0;S.s+=S.vv*h;S.tt+=h}S.acur=a;
 if(S.tt-S.rec>=.05){S.hist.push([S.tt,S.s,S.vv,a]);S.rec=S.tt}if(S.tt>=10||S.s>=120||S.s<0){S.s=clamp(S.s,0,120);S.hold=1.8}},
draw(S){const b=pad(S,28,22,28);const[tb,gb]=rows(b,[.85,3],30);const gs=isWide(S)?cols(gb,[1,1,1],40):rows(gb,[1,1,1],26);
 const y=tb.t+tb.h*.8;ln(tb.l,y,tb.l+tb.w,y,A(C.fg,.6),2);for(let m=0;m<=120;m+=20){const x=tb.l+m/120*tb.w;ln(x,y,x,y+6,A(C.fg,.6),1.4);T(m+' m',x,y+16,{a:'center',f:'n',s:11,c:C.fg3})}
 const cx=tb.l+clamp(S.s,0,120)/120*tb.w,cw=Math.min(54,tb.h*1.1);car(cx,y,cw,C.yellow);
 if(Math.abs(S.vv)>.05)arr(cx,y-cw*.62,cx+S.vv*5,y-cw*.62,C.blue,2.6,9);if(Math.abs(S.acur)>.05)arr(cx,y-cw*.62-12,cx+S.acur*12,y-cw*.62-12,C.red,2.2,8);
 const Ps=Plane(0,10,0,120,gs[0]),Pv=Plane(0,10,-6,22,gs[1]),Pa=Plane(0,10,-6,6,gs[2]);
 [[Ps,40,'s (m)',C.yellow],[Pv,5,'v (m/s)',C.blue],[Pa,2,'a (m/s²)',C.red]].forEach(([P,ys,l,c])=>{P.grid(1,{sy:ys,minor:false,alpha:.1});P.axes({xs:2,ys,x0:true});T(l,P.l+6,P.t+8,{f:'n',s:12,c})});
 const H=S.hist.concat([[S.tt,S.s,S.vv,S.acur]]);
 const av=[[Pv.X(0),Pv.Y(0)]].concat(H.map(h=>[Pv.X(h[0]),Pv.Y(h[2])]),[[Pv.X(S.tt),Pv.Y(0)]]);Pv.clip(()=>poly(av,null,A(C.teal,.22)));
 Ps.clip(()=>pth(H.map(h=>[Ps.X(h[0]),Ps.Y(h[1])]),C.yellow,3,1));Pv.clip(()=>pth(H.map(h=>[Pv.X(h[0]),Pv.Y(h[2])]),C.blue,3,1));Pa.clip(()=>pth(H.map(h=>[Pa.X(h[0]),Pa.Y(h[3])]),C.red,3,1));
 dot(Ps.X(S.tt),Ps.Y(S.s),5,C.yellow);dot(Pv.X(S.tt),Pv.Y(S.vv),5,C.blue);dot(Pa.X(S.tt),Pa.Y(S.acur),5,C.red);
 Ps.clip(()=>ln(Ps.X(S.tt-1),Ps.Y(S.s-S.vv),Ps.X(S.tt+1),Ps.Y(S.s+S.vv),A(C.blue,.6),1.5,[4,4]));T('s = '+nf(S.s,1)+' m',Pv.X(Math.max(S.tt/2,.6)),Pv.Y(Math.max(.5,S.vv/2.5)),{a:'center',f:'n',s:11.5,c:C.teal})},
readout(S){return[['t',nf(S.tt,2)+' s'],['s',nf(S.s,1)+' m','yellow'],['v',nf(S.vv,2)+' m/s','blue'],['a',nf(S.acur,1)+' m/s²','red']]},
live(S){const p=S.p;if(p.mode==='styr')return'';const a=p.mode==='fart'?0:p.mode==='brems'?-2.5:p.a;return`s=${tn(p.v0,1)}\\cdot t ${tsg(a/2,2)}\\,t^2`}
});

/* ---------- Newtons lover på skråplan ---------- */
M({id:'fy-newton',s:'fy',c:['FY1'],title:'Krefter på skråplan: Newtons lover',short:'Newtons lover',kw:'kraft friksjon normalkraft tyngdekraft kraftsum dekomponering skråplan friksjonstall newton',
lead:'En kloss på et skråplan. Tyngdekraften deles i en del langs planet og en del inn mot planet. Friksjonen virker alltid mot bevegelsen.',
controls:[{id:'al',label:'Helningsvinkel <i>α</i>',min:0,max:60,step:1,value:28,unit:'°'},{id:'mu',label:'Friksjonstall <i>μ</i>',min:0,max:1,step:.01,value:.25,d:2},{id:'m',label:'Masse <i>m</i>',min:1,max:20,step:.5,value:5,unit:'kg'},{id:'dek',type:'check',label:'Vis dekomponering av G',value:true},{type:'btns',items:[['Dytt oppover',S=>{S.vv=-4.5;S.hold=0}],['Start på toppen',S=>{S.u=.3;S.vv=0;S.hold=0}]]}],
tex:['\\Sigma F=m\\,a','G_{\\parallel}=mg\\sin\\alpha,\\qquad N=mg\\cos\\alpha','R=\\mu N','a=g(\\sin\\alpha-\\mu\\cos\\alpha)'],
about:['<strong>Newtons 1. lov:</strong> Er kraftsummen null, står klossen stille eller glir med konstant fart.','<strong>Newtons 2. lov:</strong> Kraftsummen $\\Sigma F$ (grønn) gir akselerasjonen $a=\\Sigma F/m$. Legg merke til at akselerasjonen ikke avhenger av massen.','<strong>Newtons 3. lov:</strong> Klossen dytter like hardt på planet som planet dytter på klossen med normalkraften $N$.','Friksjonen (oransje) peker oppover planet når klossen glir ned, og nedover når du dytter den opp. Står klossen stille, er friksjonen akkurat så stor som trengs.'],
tasks:['Finn den minste vinkelen der klossen begynner å gli når $\\mu=0{,}25$. Sammenlign med $\\tan\\alpha=\\mu$.','Endre massen. Hvorfor endrer ikke akselerasjonen seg?','Dytt klossen oppover. Hvorfor er akselerasjonen større på vei opp enn på vei ned?','Regn ut $a$ når $\\alpha=30^\\circ$ og $\\mu=0{,}2$.'],
init(S){S.u=.3;S.vv=0;S.hold=0;S.acc=0},
update(S,dt){const L=4;if(S.hold>0){S.hold-=dt;if(S.hold<=0){S.u=.3;S.vv=0}return}const al=rad(S.p.al),mu=S.p.mu;
 for(let i=0;i<6;i++){const h=dt/6;let a;if(Math.abs(S.vv)<1e-3){a=Math.tan(al)>mu+1e-9?G0*(Math.sin(al)-mu*Math.cos(al)):0}else if(S.vv>0)a=G0*(Math.sin(al)-mu*Math.cos(al));else{a=G0*(Math.sin(al)+mu*Math.cos(al))}
  const nv=S.vv+a*h;if(S.vv<0&&nv>=0){S.vv=0}else S.vv=nv;S.u+=S.vv*h;S.acc=a}
 if(S.u>=L){S.u=L;S.vv=0;S.hold=1.2}if(S.u<0){S.u=0;S.vv=0}},
draw(S){const al=rad(S.v.al),mu=S.p.mu,m=S.p.m,L=4;const b=pad(S,40,40,40);const wide=isWide(S);const bw=wide?b.w*.62:b.w;
 const Lp=Math.min(bw/Math.max(Math.cos(al),.3),b.h*.72/Math.max(Math.sin(al),.2))*.8;const x0=b.l+(bw-Lp*Math.cos(al))/2,yb=b.t+b.h*.74;const Tp=[x0,yb-Lp*Math.sin(al)],Br=[x0+Lp*Math.cos(al),yb];
 ln(b.l-20,yb,b.l+bw+20,yb,A(C.fg,.5),1.5);poly([Tp,Br,[x0,yb]],A(C.fg,.6),A(C.fg,.06),1.6);marc(Br[0],Br[1],34,PI,PI-al,A(C.fg,.6),1.5);T('α',Br[0]-46,Br[1]-11,{f:'m',s:16,c:C.fg2});
 const d=[Math.cos(al),Math.sin(al)],n=[Math.sin(al),-Math.cos(al)];const f=clamp(S.u/L,0,1),bx=Tp[0]+(Br[0]-Tp[0])*f,by=Tp[1]+(Br[1]-Tp[1])*f;const bwid=46,bh=30;const cx=bx+n[0]*bh/2,cy=by+n[1]*bh/2;
 X.save();X.translate(cx,cy);X.rotate(al);rr(-bwid/2,-bh/2,bwid,bh,3,A(C.fg,.8),A(C.blue,.35),1.5);X.restore();
 const g=G0,G=m*g,N=G*Math.cos(al),slide=Math.abs(S.vv)>1e-3||Math.tan(al)>mu+1e-9;let R;let rdir;if(slide){R=mu*N;rdir=S.vv<0?1:-1}else{R=G*Math.sin(al);rdir=-1}
 const k=105/G;const sum=(G*Math.sin(al)+rdir*R);
 if(S.p.dek){arr(cx,cy,cx+d[0]*G*Math.sin(al)*k,cy+d[1]*G*Math.sin(al)*k,A(C.red,.55),2,9);arr(cx,cy,cx-n[0]*N*k,cy-n[1]*N*k,A(C.red,.55),2,9);ln(cx+d[0]*G*Math.sin(al)*k,cy+d[1]*G*Math.sin(al)*k,cx,cy+G*k,A(C.red,.35),1,[3,4]);ln(cx-n[0]*N*k,cy-n[1]*N*k,cx,cy+G*k,A(C.red,.35),1,[3,4]);T('G∥',cx+d[0]*G*Math.sin(al)*k+6,cy+d[1]*G*Math.sin(al)*k+14,{f:'m',s:14,c:A(C.red,.8)});T('G⊥',cx-n[0]*N*k-22,cy-n[1]*N*k+4,{f:'m',s:14,c:A(C.red,.8)})}
 arr(cx,cy,cx,cy+G*k,C.red,3.2);Tm('G',cx+8,cy+G*k-4,{c:C.red});
 arr(cx,cy,cx+n[0]*N*k,cy+n[1]*N*k,C.blue,3.2);Tm('N',cx+n[0]*N*k+8,cy+n[1]*N*k-4,{c:C.blue});
 if(R>1e-6){const ox=cx+n[0]*-bh*.25,oy=cy+n[1]*-bh*.25;arr(ox,oy,ox+d[0]*rdir*R*k,oy+d[1]*rdir*R*k,C.gold,3.2);Tm('R',ox+d[0]*rdir*R*k+(rdir<0?-16:6),oy+d[1]*rdir*R*k-8,{c:C.gold})}
 if(Math.abs(sum)>.05*G){const ox=cx+n[0]*bh,oy=cy+n[1]*bh;arr(ox,oy,ox+d[0]*sum*k,oy+d[1]*sum*k,C.green,3.4);T('ΣF',ox+d[0]*sum*k+8,oy+d[1]*sum*k-10,{f:'m',s:15,c:C.green})}
 const ib=wide?{x:b.l+bw+30,y:b.t}:{x:b.l,y:b.t-20};infoBox(ib.x,ib.y,[[`G  = ${nf(G,1)} N`,C.red],[`N  = ${nf(N,1)} N`,C.blue],[`R  = ${nf(R,1)} N`,C.gold],[`ΣF = ${nf(Math.abs(sum)<1e-9?0:sum,1)} N`,C.green],[`a  = ${nf(Math.abs(sum)<1e-9?0:sum/m,2)} m/s²`,C.fg],[slide?(S.vv<0?'glir oppover':'glir nedover'):'står i ro (statisk friksjon)',C.fg2]],{s:12.5})},
readout(S){const al=rad(S.p.al);return[['v',nf(-S.vv,2)+' m/s (oppover +)'],['tan α',nf(Math.tan(al),3)],['μ',nf(S.p.mu,2)]]}
});

/* ---------- Luftmotstand og Eulers metode ---------- */
{
const exact=(p,t)=>{const vt=Math.sqrt(p.m*G0/p.k);return vt*Math.tanh(G0*t/vt)};
function euler(p,tmax){const o=[[0,0]];let v=0;for(let t=0;t<tmax-1e-9;t+=p.dt){v=v+(G0-p.k*v*v/p.m)*p.dt;o.push([t+p.dt,v])}return o}
M({id:'fy-luftmotstand',s:'fy',c:['FY1'],title:'Fall med luftmotstand: Eulers metode',short:'Luftmotstand og numerikk',kw:'luftmotstand terminalfart numerisk metode eulers metode programmering tidssteg python fallskjerm',
lead:'Med luftmotstand er akselerasjonen ikke konstant, og vi kan ikke bruke bevegelseslikningene. I stedet regner vi ut farten steg for steg. Store steg gir store feil.',
controls:[{id:'m',label:'Masse <i>m</i>',min:40,max:120,step:1,value:80,unit:'kg'},{id:'k',label:'Luftmotstandstall <i>k</i>',min:.1,max:.6,step:.01,value:.25,unit:'kg/m'},{id:'dt',label:'Tidssteg Δ<i>t</i>',min:.1,max:3,step:.05,value:1.5,unit:'s',d:2}],
tex:['L=k\\,v^2','a=\\frac{G-L}{m}=g-\\frac{k}{m}v^2','v_{n+1}=v_n+a_n\\cdot\\Delta t','v_t=\\sqrt{\\frac{mg}{k}}'],
about:['Den <strong>blå</strong> kurven er den nøyaktige løsningen. De <strong>gule</strong> punktene er Eulers metode: vi later som akselerasjonen er konstant gjennom hvert tidssteg.','Når farten øker, øker luftmotstanden. Til slutt er luftmotstanden like stor som tyngdekraften. Da er akselerasjonen null, og farten er <strong>terminalfarten</strong>.','Programkoden til venstre er hele metoden. Gjør tidssteget lite, og de gule punktene legger seg på den blå kurven.'],
tasks:['Hva er terminalfarten for en fallskjermhopper på 80 kg med $k=0{,}25$ kg/m?','Gjør tidssteget 3 s. Hva skjer med de gule punktene? Forklar.','Hvor lite må tidssteget være for at feilen etter 10 s skal bli under 0,5 m/s?','Skriv programmet i Python og plott resultatet.'],
init(S){S.tt=0},
update(S,dt){S.tt+=dt*3;if(S.tt>33)S.tt=0},
draw(S){const p=S.p,v=S.v,tt=Math.min(S.tt,30);const vt=Math.sqrt(v.m*G0/v.k);const eu=euler(p,30);const emax=Math.max(...eu.map(e=>e[1]));const vmax=Math.min(Math.max(vt*1.25,emax*1.05),vt*2.4);
 const wide=isWide(S);const[bl,br]=split(S,.3,{g:30});const[bp,bc]=wide?rows(bl,[1.3,1],22):cols(bl,[.8,1.2],18);
 const vn=exact(p,tt);const cx=bp.l+bp.w/2,cy=bp.t+bp.h*.5;X.save();X.beginPath();X.rect(bp.l,bp.t,bp.w,bp.h);X.clip();const off=(S.tt*vn*2.2)%40;for(let i=-1;i<bp.h/40+1;i++){const yy=bp.t+bp.h-((i*40+off)%(bp.h+40));ln(bp.l+bp.w*.15,yy,bp.l+bp.w*.15,yy-18,A(C.fg,.18),1.4);ln(bp.l+bp.w*.85,yy+20,bp.l+bp.w*.85,yy+2,A(C.fg,.18),1.4)}X.restore();
 sphere(cx,cy,16,C.gold);const G=v.m*G0,L=v.k*vn*vn,kk=Math.min(bp.h*.36,90)/G;arr(cx,cy+18,cx,cy+18+G*kk,C.red,3.2);Tm('G',cx+8,cy+18+G*kk-6,{c:C.red,s:16});if(L*kk>3){arr(cx,cy-18,cx,cy-18-L*kk,C.blue,3.2);Tm('L',cx+8,cy-18-L*kk+6,{c:C.blue,s:16})}
 frame(bc);const lines=[[`dt = ${nf(p.dt,2).replace(',','.')}`,C.yellow],['v = 0',C.fg2],['for i in range(n):',C.purple],['    a = g - k*v**2/m',C.fg2],['    v = v + a*dt',C.fg2]];const ls=Math.min(13,bc.w/23);lines.forEach(([t,c],i)=>T(t,bc.l+10,bc.t+16+i*(ls+7),{f:'n',s:ls,c}));
 const step=Math.min(eu.length-1,Math.floor(tt/p.dt));const ve=eu[step][1];T(`t = ${nf(step*p.dt,2)} s  v = ${nf(ve,1)} m/s`,bc.l+10,bc.t+16+5*(ls+7)+4,{f:'n',s:ls*.95,c:C.yellow});
 const P=Plane(0,30,0,vmax,br);P.grid(5,{sy:niceStep(vmax/5),minor:false,alpha:.1});P.axes({xs:5,ys:niceStep(vmax/5),xl:'t (s)',yl:'v (m/s)',ls:14,x0:true});
 ln(P.l,P.Y(vt),P.l+P.w,P.Y(vt),A(C.green,.7),1.4,[6,5]);T('terminalfart '+nf(vt,1)+' m/s',P.l+P.w-4,P.Y(vt)-11,{a:'right',s:12,c:C.green});
 P.fn(t=>exact(v,t),A(C.blue,.3),2);P.fn(t=>exact(v,t),C.blue,3.2,{to:tt,prog:1});
 const shown=eu.filter(e=>e[0]<=tt+1e-9);P.clip(()=>pth(shown.map(e=>P.pt(...e)),C.yellow,2,1));shown.forEach(e=>dot(...P.pt(...e),4,C.yellow));
 ln(P.X(tt),P.t,P.X(tt),P.t+P.h,A(C.fg,.3),1)},
readout(S){const p=S.p,tt=Math.min(S.tt,30);const eu=euler(p,30);const step=Math.min(eu.length-1,Math.floor(tt/p.dt));const te=step*p.dt;const ve=eu[step][1],vx=exact(p,te);return[['t',nf(te,2)+' s'],['v (Euler)',nf(ve,2)+' m/s','yellow'],['v (nøyaktig)',nf(vx,2)+' m/s','blue'],['feil',nf(ve-vx,2)+' m/s'],['vₜ',nf(Math.sqrt(p.m*G0/p.k),1)+' m/s','green']]}
});
}

/* ---------- Energibevaring ---------- */
{
const TR={U:{f:x=>.2*x*x,d:x=>.4*x},W:{f:x=>.02*(x*x-9)**2,d:x=>.08*x*(x*x-9)},H:{f:x=>Math.abs(x)>2?.5*(Math.abs(x)-2)**2:0,d:x=>Math.abs(x)>2?Math.sign(x)*(Math.abs(x)-2):0}};
M({id:'fy-energi',s:'fy',c:['FY1','NAT'],title:'Energibevaring: stilling, fart og varme',short:'Energibevaring',kw:'energi kinetisk potensiell mekanisk energi bevaring friksjon varme arbeid',
lead:'Når kula ruller ned, blir potensiell energi til kinetisk energi. Med friksjon blir litt av energien til varme hele tiden, men den totale energien er alltid den samme.',
hint:'Dra kula opp i banen og slipp.',
controls:[{id:'tr',type:'seg',label:'Bane',value:'U',options:[['U','U-bane'],['W','Dobbel dal'],['H','Halfpipe']]},{id:'mu',label:'Friksjon <i>μ</i>',min:0,max:.3,step:.01,value:.03,d:2},{id:'m',label:'Masse <i>m</i>',min:1,max:80,step:1,value:50,unit:'kg'}],
tex:['E_k=\\tfrac12mv^2,\\qquad E_p=mgh','\\cB{E_k}+\\cY{E_p}+\\cR{Q}=E_{\\text{total}}','W_R=R\\cdot s=Q'],
about:['Den <strong>gule</strong> søylen er potensiell energi, $mgh$. Den <strong>blå</strong> er kinetisk energi, $\\tfrac12mv^2$. Den <strong>røde</strong> er energi som har blitt til varme på grunn av friksjon.','Uten friksjon kommer kula alltid tilbake til samme høyde. Med friksjon kommer den litt kortere for hver tur.','Den hvite rammen viser den totale energien. Den endrer seg aldri. Energien bare skifter form.'],
tasks:['Slipp kula fra 3 m høyde uten friksjon. Hvor stor er farten i bunnen? Sjekk med $v=\\sqrt{2gh}$.','Hvorfor endrer ikke farten i bunnen seg når du endrer massen?','Med dobbel dal: hvor høyt må du slippe kula for at den skal komme over den midterste toppen?','Hvor mye varme er laget når kula til slutt ligger stille?'],
init(S){S.x=-4.2;S.vt=0;S.e0=null},
change(S,id){if(id==='tr'){S.x=-4.2;S.vt=0;S.e0=null}},
update(S,dt){if(Stage.drag&&S===Stage.S)return;const t=TR[S.p.tr],mu=S.p.mu;const n=20,h=dt/n;for(let i=0;i<n;i++){const th=Math.atan(t.d(S.x)),c=Math.cos(th),s=Math.sin(th);if(Math.abs(S.vt)<.03&&Math.abs(Math.tan(th))<=mu){S.vt=0;continue}let a=-G0*s;if(Math.abs(S.vt)>1e-6)a-=Math.sign(S.vt)*mu*G0*c;else a-=Math.sign(-s)*mu*G0*c;S.vt+=a*h;S.x+=S.vt*c*h;if(S.x>4.95){S.x=4.95;S.vt=0}if(S.x<-4.95){S.x=-4.95;S.vt=0}}},
geo(S){const wide=isWide(S);const[bt,bb]=split(S,.68,{g:34});return{P:Plane(-5.4,5.4,-.6,5.6,bt,true),bb}},
draw(S){const t=TR[S.p.tr],m=S.p.m;const{P,bb}=this.geo(S);S.P=P;const f=t.f;if(S.e0===null)S.e0=G0*f(S.x);
 const pts=[];for(let i=0;i<=200;i++){const x=-5.2+10.4*i/200;pts.push(P.pt(x,Math.min(f(x),5.6)))}poly(pts.concat([[P.X(5.2),P.Y(-.6)],[P.X(-5.2),P.Y(-.6)]]),null,A(C.fg,.06));pth(pts,C.fg,2.6);
 ln(P.X(-5.2),P.Y(0),P.X(5.2),P.Y(0),A(C.fg,.2),1,[3,5]);T('h = 0',P.X(-5.2),P.Y(0)+12,{f:'n',s:11,c:C.fg3});
 const th=Math.atan(t.d(S.x)),nx=-Math.sin(th),ny=Math.cos(th),r=.32;const bx=S.x+nx*r,by=f(S.x)+ny*r;
 ln(P.X(bx),P.Y(by),P.X(bx),P.Y(0),A(C.yellow,.6),1.4,[4,4]);T('h = '+nf(f(S.x),2)+' m',P.X(bx)+8,(P.Y(by)+P.Y(0))/2,{f:'n',s:11.5,c:C.yellow,bg:A(C.stage,.7)});
 if(Math.abs(S.vt)>.05){const c=Math.cos(th),s=Math.sin(th);arr(P.X(bx),P.Y(by),P.X(bx+S.vt*c*.25),P.Y(by+S.vt*s*.25),C.blue,2.6,9)}
 sphere(P.X(bx),P.Y(by),r*P.sx,C.gold);if(!S.touched)handle(P.X(bx),P.Y(by),C.yellow,S);
 const E=m*S.e0,Ep=m*G0*f(S.x),Ek=.5*m*S.vt*S.vt,Q=Math.max(0,E-Ep-Ek);const bbx={l:bb.l+10,t:bb.t+24,w:bb.w-20,h:bb.h-56};
 bars(bbx,[{v:Ek,c:C.blue,l:'Eₖ',t:nf(Ek,0)+' J'},{v:Ep,c:C.yellow,l:'Eₚ',t:nf(Ep,0)+' J'},{v:Q,c:C.red,l:'Q',t:nf(Q,0)+' J'},{v:E,c:C.fg,a:.08,l:'Total',t:nf(E,0)+' J'}],{max:Math.max(E,1)*1.1});
 const sc=bbx.h/(Math.max(E,1)*1.1);rct(bbx.l+(bbx.w-36)/4*3+36,bbx.t+bbx.h-E*sc,(bbx.w-36)/4,Ek*sc,null,A(C.blue,.75));rct(bbx.l+(bbx.w-36)/4*3+36,bbx.t+bbx.h-(E-Ek)*sc,(bbx.w-36)/4,Ep*sc,null,A(C.yellow,.75));rct(bbx.l+(bbx.w-36)/4*3+36,bbx.t+bbx.h-Q*sc,(bbx.w-36)/4,Q*sc,null,A(C.red,.75));
 lab(bb,'Energi')},
pick(S,x,y){const P=S.P;if(!P)return;const t=TR[S.p.tr];const th=Math.atan(t.d(S.x));const bx=S.x-Math.sin(th)*.32,by=t.f(S.x)+Math.cos(th)*.32;if(near(x,y,P.X(bx),P.Y(by),26))return{move:mx=>{S.x=clamp(P.ix(mx),-4.9,4.9);S.vt=0;S.e0=G0*t.f(S.x)}}},
readout(S){const t=TR[S.p.tr],m=S.p.m;const Ep=m*G0*t.f(S.x),Ek=.5*m*S.vt*S.vt;return[['h',nf(t.f(S.x),2)+' m','yellow'],['v',nf(Math.abs(S.vt),2)+' m/s','blue'],['Eₖ',nf(Ek,0)+' J','blue'],['Eₚ',nf(Ep,0)+' J','yellow'],['Q',nf(Math.max(0,m*(S.e0||0)-Ep-Ek),0)+' J','red']]}
});
}

/* ---------- Støt og bevegelsesmengde ---------- */
{
const post=p=>{const{m1,m2,v1,v2}=p;if(p.ty==='el')return[((m1-m2)*v1+2*m2*v2)/(m1+m2),((m2-m1)*v2+2*m1*v1)/(m1+m2)];const u=(m1*v1+m2*v2)/(m1+m2);return[u,u]};
const W=m=>.55+.14*m;
M({id:'fy-stot',s:'fy',c:['FY1'],title:'Støt og bevegelsesmengde',short:'Støt',kw:'bevegelsesmengde impuls støt elastisk uelastisk kinetisk energi bevaring',
lead:'I alle støt er den samlede bevegelsesmengden den samme før og etter. Kinetisk energi er bare bevart i elastiske støt.',
controls:[{id:'ty',type:'seg',label:'Støt',value:'el',options:[['el','Elastisk'],['uel','Fullstendig uelastisk']]},{id:'m1',label:'Masse vogn 1 <i>m</i>₁',min:.5,max:5,step:.1,value:2,unit:'kg'},{id:'v1',label:'Fart vogn 1 <i>v</i>₁',min:-3,max:3,step:.1,value:2,unit:'m/s'},{id:'m2',label:'Masse vogn 2 <i>m</i>₂',min:.5,max:5,step:.1,value:1,unit:'kg'},{id:'v2',label:'Fart vogn 2 <i>v</i>₂',min:-3,max:3,step:.1,value:-1,unit:'m/s'},{type:'btns',items:[['Kjør på nytt',S=>MOD['fy-stot'].init(S)]]}],
tex:['p=m\\,v','m_1v_1+m_2v_2=m_1v_1\'+m_2v_2\'','\\text{elastisk: }\\tfrac12m_1v_1^2+\\tfrac12m_2v_2^2=\\tfrac12m_1v_1\'^2+\\tfrac12m_2v_2\'^2'],
about:['Bevegelsesmengden $p=mv$ har retning. Positiv betyr mot høyre. Søylene nederst viser at summen før og etter er lik.','I et <strong>fullstendig uelastisk</strong> støt henger vognene sammen etterpå. Noe av den kinetiske energien blir da til varme og deformasjon.','Når en lett vogn treffer en tung vogn som står stille i et elastisk støt, spretter den lette tilbake.'],
tasks:['Sett like masser, elastisk støt og $v_2=0$. Hva skjer? (Tenk på biljard.)','Regn ut farten etter et uelastisk støt når $m_1=2$ kg, $v_1=2$ m/s og vogn 2 på 1 kg står stille.','Hvor mange prosent av den kinetiske energien går tapt i forrige oppgave?','Kan bevegelsesmengden være null før støtet selv om begge vognene beveger seg?'],
change(S){this.init(S)},
init(S){const p=S.p;S.x1=2;S.x2=7;S.u1=p.v1;S.u2=p.v2;S.after=false;S.tt=0},
update(S,dt){const p=S.p;S.tt+=dt;for(let i=0;i<4;i++){const h=dt/4;S.x1+=S.u1*h;S.x2+=S.u2*h;if(!S.after&&S.x2-S.x1<=(W(p.m1)+W(p.m2))/2&&S.u1-S.u2>0){[S.u1,S.u2]=post(p);S.after=true}if(S.after&&p.ty==='uel'){S.x2=S.x1+(W(p.m1)+W(p.m2))/2}}
 if(S.tt>9||(S.x1<-2&&S.x2<-2)||(S.x1>12&&S.x2>12)||(S.x1<-2&&S.x2>12))this.init(S)},
draw(S){const p=S.p;const[bt,bb]=rows(pad(S,30,30,40),[1,1.15],46);const P=Plane(0,10,0,1,bt);const y=bt.t+bt.h*.75;
 ln(bt.l,y,bt.l+bt.w,y,A(C.fg,.6),2);for(let m=0;m<=10;m++)ln(P.X(m),y,P.X(m),y+5,A(C.fg,.4),1);
 const drawCart=(x,m,u,c,lab_)=>{const w=W(m)*P.sx,h=Math.min(bt.h*.35,22+m*5);const X0=P.X(x);rr(X0-w/2,y-h-8,w,h,4,null,A(c,.8));circ(X0-w*.3,y-5,5,null,C.fg3);circ(X0+w*.3,y-5,5,null,C.fg3);T(nf(m,1)+' kg',X0,y-h/2-8,{a:'center',f:'n',s:11.5,c:C.stage,w:500});if(Math.abs(u)>.02){arr(X0,y-h-22,X0+u*P.sx*.6,y-h-22,c,2.8,9);T(nf(u,2)+' m/s',X0+u*P.sx*.3,y-h-36,{a:'center',f:'n',s:11,c})}T(lab_,X0,y+18,{a:'center',s:12,c:C.fg3})};
 drawCart(S.x1,p.m1,S.u1,C.blue,'vogn 1');drawCart(S.x2,p.m2,S.u2,C.yellow,'vogn 2');
 const[u1,u2]=post(p);const pb=p.m1*p.v1+p.m2*p.v2,pa=p.m1*u1+p.m2*u2,Eb=.5*p.m1*p.v1**2+.5*p.m2*p.v2**2,Ea=.5*p.m1*u1**2+.5*p.m2*u2**2;
 const[c1,c2]=cols(bb,[1.6,1],36);const pm=Math.max(1,Math.abs(p.m1*p.v1),Math.abs(p.m2*p.v2),Math.abs(pb),Math.abs(p.m1*u1),Math.abs(p.m2*u2))*1.15;
 const al=S.after?.85:.3;bars({l:c1.l,t:c1.t+14,w:c1.w,h:c1.h-34},[{v:p.m1*p.v1,c:C.blue,l:'p₁',t:nf(p.m1*p.v1,2)},{v:p.m2*p.v2,c:C.yellow,l:'p₂',t:nf(p.m2*p.v2,2)},{v:pb,c:C.fg,l:'sum før',t:nf(pb,2)},{v:p.m1*u1,c:C.blue,a:al,l:'p₁′',t:nf(p.m1*u1,2)},{v:p.m2*u2,c:C.yellow,a:al,l:'p₂′',t:nf(p.m2*u2,2)},{v:pa,c:C.fg,a:al,l:'sum etter',t:nf(pa,2)}],{max:pm,min:-pm,g:10});lab(c1,'Bevegelsesmengde (kg·m/s)');
 bars({l:c2.l,t:c2.t+14,w:c2.w,h:c2.h-34},[{v:Eb,c:C.green,l:'Eₖ før',t:nf(Eb,2)},{v:Ea,c:C.green,a:al,l:'Eₖ etter',t:nf(Ea,2)}],{max:Math.max(Eb,.1)*1.15});lab(c2,'Kinetisk energi (J)')},
readout(S){const p=S.p,[u1,u2]=post(p);const Eb=.5*p.m1*p.v1**2+.5*p.m2*p.v2**2,Ea=.5*p.m1*u1**2+.5*p.m2*u2**2;return[['v₁′',nf(u1,2)+' m/s','blue'],['v₂′',nf(u2,2)+' m/s','yellow'],['p før',nf(p.m1*p.v1+p.m2*p.v2,2)],['p etter',nf(p.m1*u1+p.m2*u2,2)],['energitap',Eb>0?nf(100*(Eb-Ea)/Eb,1)+' %':'–','red']]}
});
}

/* ---------- Elektriske kretser ---------- */
{
function solve(p){const{U,R1,R2,R3}=p;if(p.mode==='serie'){const Rt=R1+R2,I=U/Rt;return{Rt,I,L:[[I,I*R1,R1],[I,I*R2,R2]]}}if(p.mode==='par'){const I1=U/R1,I2=U/R2;return{Rt:1/(1/R1+1/R2),I:I1+I2,L:[[I1,U,R1],[I2,U,R2]]}}const R23=1/(1/R2+1/R3),Rt=R1+R23,I=U/Rt,U23=I*R23;return{Rt,I,L:[[I,I*R1,R1],[U23/R2,U23,R2],[U23/R3,U23,R3]]}}
function paths(S,b){const L=b.l+50,R=b.l+b.w-30,T_=b.t+30,B=b.t+b.h-40,my=(T_+B)/2;const s=solve(S.p),m=S.p.mode;const top=[[L,my-14],[L,T_]],bot=[[L,B],[L,my+14]];
 if(m==='serie'){const x1=L+(R-L)*.4;return{segs:[[[[L,my-14],[L,T_],[R,T_],[R,B],[L,B],[L,my+14]],s.I]],lamps:[[x1,T_,'h',0],[R,my,'v',1]],L,R,T_,B,my,s}}
 if(m==='par'){const xA=L+(R-L)*.48;return{segs:[[[[L,my-14],[L,T_],[xA,T_]],s.I],[[[xA,T_],[R,T_]],s.L[1][0]],[[[xA,T_],[xA,B]],s.L[0][0]],[[[R,T_],[R,B],[xA,B]],s.L[1][0]],[[[xA,B],[L,B],[L,my+14]],s.I]],lamps:[[xA,my,'v',0],[R,my,'v',1]],L,R,T_,B,my,s}}
 const x1=L+(R-L)*.24,xA=L+(R-L)*.56;return{segs:[[[[L,my-14],[L,T_],[xA,T_]],s.I],[[[xA,T_],[R,T_]],s.L[2][0]],[[[xA,T_],[xA,B]],s.L[1][0]],[[[R,T_],[R,B],[xA,B]],s.L[2][0]],[[[xA,B],[L,B],[L,my+14]],s.I]],lamps:[[x1,T_,'h',0],[xA,my,'v',1],[R,my,'v',2]],L,R,T_,B,my,s}}
function plen(ps){let L=0;for(let i=1;i<ps.length;i++)L+=Math.hypot(ps[i][0]-ps[i-1][0],ps[i][1]-ps[i-1][1]);return L}
function at(ps,d){for(let i=1;i<ps.length;i++){const l=Math.hypot(ps[i][0]-ps[i-1][0],ps[i][1]-ps[i-1][1]);if(d<=l){const t=d/l;return[lerp(ps[i-1][0],ps[i][0],t),lerp(ps[i-1][1],ps[i][1],t)]}d-=l}return ps[ps.length-1]}
M({id:'fy-krets',s:'fy',c:['FY1'],title:'Elektriske kretser: serie og parallell',short:'Elektriske kretser',kw:'strøm spenning resistans ohms lov effekt seriekobling parallellkobling lyspære krets',
lead:'Prikkene viser strømmen, og lyspærene lyser sterkere jo større effekt de får. Sammenlign hvordan strøm og spenning fordeler seg i serie og parallell.',
controls:[{id:'mode',type:'seg',label:'Kobling',value:'serie',options:[['serie','Serie'],['par','Parallell'],['bland','Blandet']]},{id:'U',label:'Spenning <i>U</i>',min:1,max:24,step:.5,value:12,unit:'V'},{id:'R1',label:'<i>R</i>₁',min:2,max:100,step:1,value:20,unit:'Ω'},{id:'R2',label:'<i>R</i>₂',min:2,max:100,step:1,value:40,unit:'Ω'},{id:'R3',label:'<i>R</i>₃',min:2,max:100,step:1,value:40,unit:'Ω',show:S=>S.p.mode==='bland'}],
tex:['U=R\\cdot I','P=U\\cdot I=R\\,I^2','\\text{serie: }R=R_1+R_2','\\text{parallell: }\\frac1R=\\frac1{R_1}+\\frac1{R_2}'],
about:['I <strong>serie</strong> går den samme strømmen gjennom alle komponentene, og spenningen deles mellom dem.','I <strong>parallell</strong> får hver gren hele spenningen, og strømmen deles. Grenen med minst resistans får mest strøm.','Prikkene viser strømretningen fra pluss til minus. Elektronene i ledningen går egentlig motsatt vei.','Kirchhoffs lover: strømmen inn i et forgreiningspunkt er lik strømmen ut, og spenningene rundt en lukket sløyfe summeres til null.'],
tasks:['To like lyspærer i serie og i parallell: hvilken kobling lyser sterkest? Forklar med $P=U^2/R$.','I parallell: hva skjer med strømmen fra batteriet når du gjør $R_2$ mindre?','Finn erstatningsresistansen for den blandede koblingen med standardverdiene.','Hvorfor kobles lamper og stikkontakter hjemme i parallell?'],
init(S){S.tr=[0,0,0,0,0]},
update(S,dt){const g=paths(S,{l:0,t:0,w:800,h:500});g.segs.forEach(([ps,I],i)=>{S.tr[i]=((S.tr[i]||0)+Math.min(300,I*90)*dt)%1800})},
draw(S){const b=pad(S,30,24,34);const g=paths(S,b);S.tr=S.tr||[0,0,0,0,0];
 g.segs.forEach(([ps],i)=>pth(ps,A(C.fg,.6),2.2));
 const bx=g.L,by=g.my;ln(bx-16,by-8,bx+16,by-8,C.fg,3);ln(bx-9,by+8,bx+9,by+8,C.fg,5);T('+',bx+22,by-10,{f:'n',s:13,c:C.red});T('−',bx+22,by+10,{f:'n',s:13,c:C.blue});T(nf(S.p.U,1)+' V',bx-24,by,{a:'right',f:'n',s:13,c:C.fg});
 g.segs.forEach(([ps,I],i)=>{const Lp=plen(ps);const off=(S.tr[i]||0)%18;for(let d=off;d<Lp;d+=18){const q=at(ps,d);dot(...q,2.6,C.yellow)}});
 g.lamps.forEach(([x,y,o,k])=>{const[I,U,R]=g.s.L[k],P=U*I;const br=1-Math.exp(-P/4);glow(x,y,46*br+10,C.gold,.55*br+.05);circ(x,y,17,C.fg,C.stage,2);const c=mix('#555555',C.gold,br);ln(x-8,y-8,x+8,y+8,c,2);ln(x-8,y+8,x+8,y-8,c,2);
  const rgt=o==='v'&&x>b.l+b.w*.7;const tx=o==='h'?x:rgt?x-26:x+26,ty=o==='h'?y+30:y-26;const lines=[`R${sub(k+1)} = ${nf(R,0)} Ω`,`U${sub(k+1)} = ${nf(U,2)} V`,`I${sub(k+1)} = ${nf(I,3)} A`,`P${sub(k+1)} = ${nf(P,2)} W`];lines.forEach((t,i)=>T(t,tx,ty+i*15,{f:'n',s:11.5,c:i===3?C.gold:C.fg2,a:o==='h'?'center':rgt?'right':'left',bg:A(C.stage,.75)}))});
 T(`I = ${nf(g.s.I,3)} A`,g.L+10,g.T_-14,{f:'n',s:12,c:C.yellow})},
readout(S){const s=solve(S.p);return[['R (total)',nf(s.Rt,2)+' Ω'],['I',nf(s.I,3)+' A','yellow'],['P (total)',nf(S.p.U*s.I,2)+' W','gold']]}
});
}

/* ---------- Temperatur og varme ---------- */
{
const CI=2100,LS=334000,CV=4186,LV=2257000,CD=2010;
function thr(m){const q1=m*CI*20,q2=q1+m*LS,q3=q2+m*CV*100,q4=q3+m*LV,q5=q4+m*CD*20;return[q1,q2,q3,q4,q5]}
function state(m,Q){const[q1,q2,q3,q4,q5]=thr(m);if(Q<q1)return{T:-20+Q/(m*CI),fm:0,fb:0,ph:'is'};if(Q<q2)return{T:0,fm:(Q-q1)/(q2-q1),fb:0,ph:'smelter'};if(Q<q3)return{T:(Q-q2)/(m*CV),fm:1,fb:0,ph:'vann'};if(Q<q4)return{T:100,fm:1,fb:(Q-q3)/(q4-q3),ph:'koker'};return{T:100+Math.min(Q-q4,q5-q4)/(m*CD),fm:1,fb:1,ph:'damp'}}
const NP=64;
M({id:'fy-varme',s:'fy',c:['FY1','NAT'],title:'Temperatur og varme: is blir til damp',short:'Varme og faseoverganger',kw:'temperatur varme spesifikk varmekapasitet smeltevarme fordampingsvarme faseovergang partikkelmodell energi',
lead:'Vi varmer opp is fra −20 °C. Temperaturen stiger, men står stille mens isen smelter og mens vannet koker. Da går energien med til å bryte bindinger mellom molekylene.',
controls:[{id:'m',label:'Masse <i>m</i>',min:.1,max:2,step:.05,value:.5,unit:'kg',d:2},{id:'P',label:'Effekt på kokeplaten <i>P</i>',min:200,max:3000,step:50,value:1500,unit:'W'},{type:'btns',items:[['Start på nytt',S=>MOD['fy-varme'].init(S)]]}],
tex:['Q=c\\,m\\,\\Delta T','Q=l_s\\,m\\quad(\\text{smelting}),\\qquad Q=l_f\\,m\\quad(\\text{fordamping})','P=\\frac{Q}{t}','c_{\\text{vann}}=4{,}19\\ \\tfrac{\\text{kJ}}{\\text{kg}\\cdot\\text{K}},\\quad l_s=334\\ \\tfrac{\\text{kJ}}{\\text{kg}},\\quad l_f=2{,}26\\ \\tfrac{\\text{MJ}}{\\text{kg}}'],
about:['Temperatur er et mål på hvor fort molekylene beveger seg i gjennomsnitt. Se hvordan partiklene til venstre rister raskere når temperaturen stiger.','Under smeltingen og kokingen står temperaturen stille. Energien brukes til å bryte bindingene mellom molekylene, ikke til å gjøre dem raskere.','Fordampingen krever nesten sju ganger så mye energi som smeltingen. Derfor er det lange flate stykket på grafen ved 100 °C.','Grafen viser temperatur mot tilført energi. Tiden avhenger av effekten: $t=Q/P$.'],
tasks:['Hvor mye energi trengs for å varme 0,5 kg vann fra 0 °C til 100 °C?','Hvor lang tid tar det å koke bort 1 kg vann med en kokeplate på 2000 W?','Hvorfor er en brannskade fra damp ved 100 °C verre enn fra vann ved 100 °C?','Les av grafen: hvilken fase har størst spesifikk varmekapasitet? Hvordan ser du det?'],
init(S){S.Q=0;const r=rng(9);S.pt=[];for(let i=0;i<NP;i++){const gx=i%8,gy=Math.floor(i/8);S.pt.push({lx:(gx+.5)/8,ly:(gy+.5)/8*.5,x:0,y:0,vx:r()-.5,vy:r()-.5,mode:0})}},
change(S,id){if(id==='m')this.init(S)},
update(S,dt){const m=S.p.m,q5=thr(m)[4];if(S.Q<q5)S.Q=Math.min(q5,S.Q+q5/24*dt);else{S.hold=(S.hold||0)+dt;if(S.hold>3){S.hold=0;this.init(S);return}}
 const st=state(m,S.Q),Tk=st.T+273;const sp=Math.sqrt(Tk/273);S.pt.forEach((p,i)=>{const r=i/NP;const nm=r<st.fb?2:r<st.fm?1:0;if(nm!==p.mode&&nm>p.mode&&p.mode===0){p.x=p.lx;p.y=p.ly}p.mode=nm;
  if(p.mode===0)return;const vmax=(p.mode===2?.9:.25)*sp;p.vx+=(Math.random()-.5)*dt*4;p.vy+=(Math.random()-.5)*dt*4-(p.mode===1?dt*.8:0);const v=Math.hypot(p.vx,p.vy)||1;p.vx=p.vx/v*vmax;p.vy=p.vy/v*vmax;p.x+=p.vx*dt;p.y+=p.vy*dt;const top=p.mode===2?.98:.56;
  if(p.x<.02){p.x=.02;p.vx=Math.abs(p.vx)}if(p.x>.98){p.x=.98;p.vx=-Math.abs(p.vx)}if(p.y<.02){p.y=.02;p.vy=Math.abs(p.vy)}if(p.y>top){p.y=top;p.vy=-Math.abs(p.vy)}})},
draw(S){const m=S.p.m,st=state(m,S.Q),q=thr(m);const[bl,br]=split(S,.36,{g:34});const bw=Math.min(bl.w*.8,bl.h*.72),bh=bw,bx=bl.l+(bl.w-bw)/2,by=bl.t+10;
 rr(bx,by,bw,bh,6,A(C.fg,.45),A(C.blue,.04),2);const heat=1-Math.exp(-S.p.P/1200);{X.beginPath();for(let k=0;k<=40;k++){const xx=bx+bw*.1+bw*.8*k/40;const o=Math.sin(k*1.2)*4;k?X.lineTo(xx,by+bh+14+o):X.moveTo(xx,by+bh+14+o)}X.strokeStyle=mix('#552222',C.red,heat);X.lineWidth=3;X.stroke()}
 if(st.fm>0&&st.fb<1)rct(bx+3,by+bh*(1-.56)+3,bw-6,bh*.56-6,null,A(C.blue,.08+.06*st.fm));
 const Tk=st.T+273,amp=.006*Math.sqrt(Tk/253);S.pt.forEach(p=>{let x,y;if(p.mode===0){x=p.lx+(Math.random()-.5)*amp*2;y=p.ly+(Math.random()-.5)*amp*2}else{x=p.x;y=p.y}const c=p.mode===0?C.blue:p.mode===1?C.teal:C.fg;dot(bx+x*bw,by+bh-y*bh,Math.max(3,bw/42),A(c,.9))});
 T(st.ph==='is'?'Is':st.ph==='smelter'?'Is og vann':st.ph==='vann'?'Vann':st.ph==='koker'?'Vann og damp':'Damp',bx+bw/2,by+bh+34,{a:'center',s:14,c:C.fg2});
 const P=Plane(0,q[4]/1000*1.04,-30,130,{l:br.l+34,t:br.t,w:br.w-34,h:br.h-10});P.grid(niceStep(q[4]/1000/6),{sy:20,minor:false,alpha:.1});P.axes({xs:niceStep(q[4]/1000/6),ys:20,xl:'Q (kJ)',yl:'T (°C)',ls:14,x0:true,xf:x=>nf(x,0)});
 const curve=Q=>state(m,Q*1000).T;P.fn(curve,A(C.red,.25),2,{to:q[4]/1000});P.fn(curve,C.red,3.2,{to:S.Q/1000,prog:1});dot(P.X(S.Q/1000),P.Y(st.T),6,C.red);
 T('smelting ved 0 °C',P.X((q[0]+q[1])/2000),P.Y(0)-12,{a:'center',s:11.5,c:C.fg2});T('koking ved 100 °C',P.X((q[2]+q[3])/2000),P.Y(100)-12,{a:'center',s:11.5,c:C.fg2})},
readout(S){const st=state(S.p.m,S.Q),t=S.Q/S.p.P;return[['T',nf(st.T,1)+' °C','red'],['Q',nf(S.Q/1000,0)+' kJ'],['tid',t<120?nf(t,0)+' s':nf(t/60,1)+' min'],['fase',st.ph]]}
});
}

/* ---------- Stråling fra legemer (sort legeme) ---------- */
{
const h=6.626e-34,cc=2.998e8,kB=1.381e-23,SB=5.67e-8;
const B=(lnm,T)=>{const l=lnm*1e-9;return 2*h*cc*cc/l**5/(Math.exp(h*cc/(l*kB*T))-1)};
M({id:'fy-sortlegeme',s:'fy',c:['FY1'],title:'Stråling fra varme legemer',short:'Sort legeme',kw:'stråling sort legeme wiens forskyvningslov stefan-boltzmann temperatur spekter stjerner planck',
lead:'Alle legemer sender ut stråling. Jo varmere de er, jo mer stråling sender de ut, og jo kortere bølgelengde har toppen i spekteret.',
controls:[{id:'T',label:'Temperatur <i>T</i>',min:2000,max:12000,step:50,value:5800,unit:'K',fmt:v=>nf(v,0)+' K'},{type:'btns',items:[['Glødetråd 2800 K',S=>setP('T',2800,S)],['Sola 5800 K',S=>setP('T',5800,S)],['Rigel 12 000 K',S=>setP('T',12000,S)]]},{id:'sol',type:'check',label:'Vis sola til sammenligning',value:true}],
tex:['\\lambda_{\\text{maks}}\\cdot T=2{,}90\\cdot10^{-3}\\ \\text{m·K}','\\frac{P}{A}=\\sigma T^4,\\qquad \\sigma=5{,}67\\cdot10^{-8}\\ \\tfrac{\\text{W}}{\\text{m}^2\\text{K}^4}'],
about:['Kurven viser hvor mye stråling legemet sender ut ved hver bølgelengde. Den fargede delen er synlig lys.','<strong>Wiens forskyvningslov:</strong> toppen flytter seg mot kortere bølgelengder når temperaturen stiger. Derfor er varme stjerner blå og kalde stjerner røde.','<strong>Stefan–Boltzmanns lov:</strong> utstrålt effekt per areal øker med $T^4$. Dobler du temperaturen, blir strålingen 16 ganger så stor.','En glødetråd sender ut mest infrarød stråling. Bare en liten del blir synlig lys.'],
tasks:['Hvilken bølgelengde har toppen for sola? Hvilken farge er det?','Mennesker har en hudtemperatur på ca. 305 K. Regn ut $\\lambda_{\\text{maks}}$. Hvorfor ser varmekameraer oss?','Hvor mange ganger mer stråler en stjerne på 11 600 K per kvadratmeter enn sola?','Hvorfor har vanlige glødepærer så dårlig virkningsgrad?'],
draw(S){const T_=S.v.T;const b=pad(S,36,30,40);b.l+=18;b.w-=18;const lm=2.898e6/T_;const peak=B(lm,T_);const P=Plane(0,3000,0,peak*1.18,b);
 P.grid(500,{sy:peak*1.18/5,minor:false,alpha:.08});P.axes({xs:500,y:false,xl:'λ (nm)',ls:14,x0:true});
 P.clip(()=>{X.fillStyle=A(C.purple,.13);X.beginPath();X.moveTo(P.X(0),P.Y(0));for(let l=1;l<=380;l+=4)X.lineTo(P.X(l),P.Y(B(l,T_)));X.lineTo(P.X(380),P.Y(0));X.fill();
  for(let l=380;l<=750;l+=2){const y=B(l,T_);ln(P.X(l),P.Y(0),P.X(l),P.Y(y),wl2rgb(l,.95),Math.max(1.5,2*P.sx)+.5)}
  X.fillStyle=A(C.red,.1);X.beginPath();X.moveTo(P.X(750),P.Y(0));for(let l=750;l<=3000;l+=10)X.lineTo(P.X(l),P.Y(B(l,T_)));X.lineTo(P.X(3000),P.Y(0));X.fill()});
 if(S.p.sol)P.fn(l=>B(l,5772),A(C.yellow,.7),1.8,{from:20,dash:[6,5]});P.fn(l=>B(l,T_),C.fg,3,{from:20});
 ln(P.X(lm),P.Y(peak),P.X(lm),P.Y(0),A(C.fg,.6),1.3,[4,4]);T('λmaks = '+nf(lm,0)+' nm',P.X(lm)+8,P.Y(peak)-10,{f:'n',s:12.5,c:C.fg,bg:A(C.stage,.7)});
 T('UV',P.X(190),P.Y(0)-12,{a:'center',s:12,c:C.purple});T('synlig',P.X(565),P.Y(0)+30,{a:'center',s:12,c:C.fg2});T('infrarødt (IR)',P.X(1500),P.Y(0)-12,{a:'center',s:12,c:C.red});
 const sx=P.l+P.w-60,sy=P.t+50,col=kelvin(T_);glow(sx,sy,60,col,.5);circ(sx,sy,24,null,col);T(nf(T_,0)+' K',sx,sy+44,{a:'center',f:'n',s:12,c:C.fg2});if(S.p.sol)T('stiplet: sola (5772 K)',P.l+P.w-10,P.t+110,{a:'right',s:11.5,c:C.yellow})},
readout(S){const T_=S.p.T;return[['T',nf(T_,0)+' K'],['λmaks',nf(2.898e6/T_,0)+' nm'],['P/A',nfs(SB*T_**4,3)+' W/m²'],['× sola',nf((T_/5772)**4,2)]]}
});
}

/* ---------- Atommodeller: Rutherfords forsøk ---------- */
{
M({id:'fy-atommodell',s:'fy',c:['FY1'],title:'Rutherfords spredningsforsøk',short:'Atommodeller',kw:'atommodell rutherford thomson rosinbollemodell atomkjerne alfapartikler spredning gullfolie',
lead:'Alfapartikler skytes mot et gullatom. Hvis den positive ladningen var smurt utover hele atomet, ville de knapt bøyd av. Noen få spretter tilbake. Det avslører en liten, tung kjerne.',
controls:[{id:'mod',type:'seg',label:'Atommodell',value:'r',options:[['r','Rutherford: liten kjerne'],['t','Thomson: «rosinbolle»']]},{id:'E',label:'Energi til alfapartiklene',min:1,max:9,step:.5,value:5,unit:'MeV'},{id:'rate',label:'Partikler per sekund',min:5,max:80,step:1,value:30},{type:'btns',items:[['Tøm tellerne',S=>{S.hist=new Array(18).fill(0);S.n=0}]]}],
tex:['F=k\\frac{q_1q_2}{r^2}','d_{\\min}=\\frac{k\\cdot 2e\\cdot 79e}{E_k}'],
about:['I <strong>Thomsons modell</strong> er atomet en positiv «bolle» med elektroner som rosiner. Kreftene blir svake overalt, og alfapartiklene går nesten rett fram.','I <strong>Rutherfords modell</strong> er all den positive ladningen samlet i en kjerne som er om lag 100 000 ganger mindre enn atomet. Partikler som kommer nær den, får en enorm frastøtende kraft.','De fleste partiklene går rett gjennom. Det viser at atomet stort sett er tomrom. Histogrammet teller hvor mange som spres med ulike vinkler.','Kjernen er tegnet mye større enn i virkeligheten for at du skal se den.'],
tasks:['Bytt mellom modellene. Hvilken observasjon i forsøket kan Thomsons modell ikke forklare?','Hvordan endrer spredningen seg når energien øker? Forklar.','Omtrent hvor stor andel spres mer enn 90° i Rutherfords modell?','Hvilke svakheter har Rutherfords modell? Hva løste Bohr?'],
init(S){S.ps=[];S.hist=new Array(18).fill(0);S.n=0;S.acc=0},
change(S,id){if(id!=='rate')this.init(S)},
update(S,dt){const d0=2.27/S.p.E*.18,Ra=3,v0=6,K=v0*v0*d0/2,th=S.p.mod==='t';S.acc+=dt*S.p.rate;while(S.acc>=1){S.acc-=1;S.ps.push({x:-10,y:(Math.random()*2-1)*(Math.random()<.35?.6:3.3),vx:v0,vy:0,tr:[]})}
 for(const p of S.ps){let t=0;while(t<dt){const r=Math.hypot(p.x,p.y);const h=Math.min(dt-t,Math.max(.0004,.02*r/v0));let ax=0,ay=0;if(th){if(r<Ra){const f=K*r/Ra**3*3;ax=f*p.x/r;ay=f*p.y/r}}else{const rr2=Math.max(r,.012);const f=K/rr2**2;ax=f*p.x/rr2;ay=f*p.y/rr2}p.vx+=ax*h;p.vy+=ay*h;p.x+=p.vx*h;p.y+=p.vy*h;t+=h}
  p.tr.push([p.x,p.y]);if(p.tr.length>60)p.tr.shift();if(Math.abs(p.x)>11||Math.abs(p.y)>7){p.done=true;const ang=deg(Math.abs(Math.atan2(p.vy,p.vx)));S.hist[Math.min(17,Math.floor(ang/10))]++;S.n++}}
 S.ps=S.ps.filter(p=>!p.done)},
draw(S){const[bl,br]=split(S,.7,{g:26});const P=Plane(-10,10,-6.5,6.5,bl,true);const th=S.p.mod==='t';
 circ(P.X(0),P.Y(0),3*P.sx,A(C.fg,.25),th?A(C.pink,.12):null,1.2);
 if(th){const r=rng(4);for(let i=0;i<14;i++){const a=r()*TAU,rd=Math.sqrt(r())*2.7;dot(P.X(Math.cos(a)*rd),P.Y(Math.sin(a)*rd),3,C.blue)}}else{glow(P.X(0),P.Y(0),16,C.red,.5);dot(P.X(0),P.Y(0),4,C.red);const r=rng(4);for(let i=0;i<6;i++){const a=r()*TAU;dot(P.X(Math.cos(a)*2.7),P.Y(Math.sin(a)*2.7),2.6,A(C.blue,.8))}}
 T('Gullatom',P.X(0),P.Y(3.3)-8,{a:'center',s:12,c:C.fg3});rct(P.l,P.Y(.9),18,P.Y(-.9)-P.Y(.9),null,A(C.gold,.25));T('α',P.l+9,P.Y(1.3),{a:'center',f:'m',s:16,c:C.gold});
 for(const p of S.ps){if(p.tr.length<2)continue;const dev=deg(Math.abs(Math.atan2(p.vy,p.vx)));const c=dev>90?C.red:dev>10?C.yellow:C.blue;X.globalAlpha=.75;pth(p.tr.map(q=>P.pt(...q)),c,1.5);X.globalAlpha=1;dot(...P.pt(p.x,p.y),2.6,c)}
 const hb={l:br.l+8,t:br.t+30,w:br.w-8,h:br.h-60};lab({l:hb.l,t:hb.t},'Spredningsvinkel');const mx=Math.max(1,...S.hist);const bh=hb.h/18;
 S.hist.forEach((v,i)=>{const w=v>0?Math.log10(1+v)/Math.log10(1+mx)*(hb.w-44):0;rct(hb.l+40,hb.t+i*bh+1,w,bh-2,null,A(i>=9?C.red:i>=1?C.yellow:C.blue,.8));if(i%3===0)T(i*10+'°',hb.l+34,hb.t+i*bh+bh/2,{a:'right',f:'n',s:10.5,c:C.fg3})});T('(logaritmisk skala)',hb.l+40,hb.t+hb.h+14,{s:11,c:C.fg3})},
readout(S){const big=S.hist.slice(9).reduce((a,b)=>a+b,0),mid=S.hist.slice(1).reduce((a,b)=>a+b,0);return[['partikler',S.n],['> 10°',S.n?nf(100*mid/S.n,1)+' %':'–','yellow'],['> 90°',S.n?nf(100*big/S.n,2)+' %':'–','red']]}
});
}

/* ---------- Bohrs atommodell og spektre ---------- */
{
const En=n=>-13.6/(n*n),lam=(a,b)=>1239.84/Math.abs(En(a)-En(b));
const kind=l=>l<380?'UV':l>750?'IR':'synlig';
M({id:'fy-bohr',s:'fy',c:['FY1','KJ1'],title:'Bohrs atommodell og linjespektre',short:'Bohrs atommodell',kw:'bohr energinivå foton spektrallinje emisjon absorpsjon hydrogen balmer spektrum',
lead:'Elektronet i hydrogen kan bare ha bestemte energier. Når det hopper ned et nivå, sendes det ut et foton med nøyaktig energiforskjellen. Derfor har hvert grunnstoff sitt eget strekkodespektrum.',
hint:'Klikk på et energinivå for å flytte elektronet.',
controls:[{id:'mode',type:'seg',label:'Spekter',value:'em',options:[['em','Emisjon'],['abs','Absorpsjon']]},{id:'auto',type:'check',label:'Atomet blir eksitert av seg selv',value:true},{type:'btns',items:[['Tøm spekteret',S=>{S.lines={}}]]}],
tex:['E_n=-\\frac{13{,}6\\ \\text{eV}}{n^2}','E_{\\text{foton}}=hf=\\frac{hc}{\\lambda}=E_{\\text{øvre}}-E_{\\text{nedre}}','\\lambda=\\frac{1240\\ \\text{eV·nm}}{\\Delta E}'],
about:['Til høyre ser du energinivåene. Hver pil er et hopp. Lange hopp gir fotoner med høy energi og kort bølgelengde.','Hopp ned til $n=2$ gir synlig lys (Balmer-serien: rød, turkis, blå og fiolett). Hopp ned til $n=1$ gir ultrafiolett, og hopp ned til $n=3$ gir infrarødt.','I <strong>absorpsjon</strong> sender vi hvitt lys gjennom en gass. Atomene tar bare opp fotoner med akkurat riktig energi, så det blir mørke linjer på de samme stedene.','Banene er ikke tegnet i riktig skala. I Bohrs modell er radien proporsjonal med $n^2$.'],
tasks:['Regn ut bølgelengden for hoppet fra $n=3$ til $n=2$. Hvilken farge er det?','Hvorfor ser vi ingen linjer fra hopp ned til $n=1$ i spekteret?','Hvor mye energi trengs for å ionisere hydrogen fra grunntilstanden?','Hvordan kan astronomer finne ut hva stjernene består av?'],
init(S){S.n=S.p.mode==='abs'?2:3;S.timer=1;S.ph=[];S.lines={};S.flash=0;S.tr=null},
change(S,id){if(id==='mode')this.init(S)},
jump(S,to,photonIn){const from=S.n;if(to===from)return;const l=lam(from,to);S.tr={a:from,b:to,t:1.2};S.n=to;if(to<from){S.ph.push({a:Math.random()*TAU,r:0,l,out:true});S.lines[l.toFixed(1)]=(S.lines[l.toFixed(1)]||0)+1}else if(photonIn){S.ph.push({a:PI,r:1,l,out:false});if(S.p.mode==='abs')S.lines[l.toFixed(1)]=(S.lines[l.toFixed(1)]||0)+1}},
update(S,dt){S.timer-=dt;S.flash=Math.max(0,S.flash-dt);if(S.tr){S.tr.t-=dt;if(S.tr.t<=0)S.tr=null}
 S.ph.forEach(p=>{p.r+=p.out?dt*.8:-dt*1.2});S.ph=S.ph.filter(p=>p.out?p.r<1.3:p.r>.12);
 if(S.timer<=0){S.timer=.7+Math.random()*.8;if(S.p.mode==='em'){if(S.n>1)this.jump(S,1+Math.floor(Math.random()*(S.n-1)));else if(S.p.auto){S.n=2+Math.floor(Math.random()*5);S.flash=.4}}else{if(S.n>2)this.jump(S,2);else if(S.p.auto)this.jump(S,3+Math.floor(Math.random()*4),true)}}},
geo(S){const b=pad(S,26,22,22);const[top,spec]=rows(b,[4.2,1],28);const[ba,be]=cols(top,[1.1,1],30);return{ba,be,spec}},
draw(S){const{ba,be,spec}=this.geo(S);S.G={be};const cx=ba.l+ba.w/2,cy=ba.t+ba.h/2,R1=Math.min(ba.w,ba.h)/2/6.6;
 if(S.flash>0)glow(cx,cy,R1*7,C.fg,S.flash*.5);for(let n=1;n<=6;n++)circ(cx,cy,R1*n,A(C.fg,n===S.n?.6:.18),null,n===S.n?1.6:1);glow(cx,cy,14,C.red,.6);dot(cx,cy,5,C.red);
 const ang=S.t*2.4/S.n;dot(cx+Math.cos(ang)*R1*S.n,cy+Math.sin(ang)*R1*S.n,6,C.blue);
 S.ph.forEach(p=>{const c=kind(p.l)==='synlig'?wl2rgb(p.l):kind(p.l)==='UV'?C.purple:C.red;if(p.out){const r0=R1*S.n+6+p.r*ba.w*.4;wig(cx+Math.cos(p.a)*r0,cy+Math.sin(p.a)*r0,cx+Math.cos(p.a)*(r0+60),cy+Math.sin(p.a)*(r0+60),Math.max(6,p.l/40),5,c,2,0,true)}else{const x0=cx-ba.w*.5*p.r-10;wig(x0-60,cy,x0,cy,Math.max(6,p.l/40),5,c,2,0,true)}});
 const ymap=E=>be.t+10+(be.h-30)*(E/-14.5);for(let n=1;n<=6;n++){const y=ymap(-En(n)*-1);ln(be.l+70,y,be.l+be.w-10,y,n===S.n?C.blue:A(C.fg,.55),n===S.n?2.4:1.4);if(n<=4)T(`n = ${n}`,be.l+64,y,{a:'right',f:'n',s:11.5,c:n===S.n?C.blue:C.fg2});else if(n===6)T('n = 5, 6',be.l+64,y-8,{a:'right',f:'n',s:10.5,c:C.fg3});if(n<=3)T(nf(En(n),2)+' eV',be.l+be.w-10,y-9,{a:'right',f:'n',s:10.5,c:C.fg3})}
 ln(be.l+70,ymap(0),be.l+be.w-10,ymap(0),A(C.fg,.3),1,[4,4]);T('0 eV (fritt elektron)',be.l+be.w-10,ymap(0)-9,{a:'right',f:'n',s:10.5,c:C.fg3});
 if(S.tr){const x=be.l+70+(be.w-80)*.45,c=kind(lam(S.tr.a,S.tr.b))==='synlig'?wl2rgb(lam(S.tr.a,S.tr.b)):C.fg2;X.globalAlpha=Math.min(1,S.tr.t);arr(x,ymap(En(S.tr.a)),x,ymap(En(S.tr.b)),c,3,10);T(nf(lam(S.tr.a,S.tr.b),0)+' nm ('+kind(lam(S.tr.a,S.tr.b))+')',x+10,(ymap(En(S.tr.a))+ymap(En(S.tr.b)))/2,{f:'n',s:12,c});X.globalAlpha=1}
 const sp=spec,P=Plane(380,750,0,1,sp);if(S.p.mode==='abs'){for(let l=380;l<=750;l+=1)ln(P.X(l),sp.t,P.X(l),sp.t+sp.h,wl2rgb(l,.9),P.sx+.6)}else rct(sp.l,sp.t,sp.w,sp.h,null,'#000000');
 for(const k in S.lines){const l=+k;if(l<380||l>750)continue;const s=Math.min(1,.35+S.lines[k]*.12);if(S.p.mode==='abs')ln(P.X(l),sp.t,P.X(l),sp.t+sp.h,`rgba(0,0,0,${s})`,4);else{ln(P.X(l),sp.t,P.X(l),sp.t+sp.h,wl2rgb(l,s),3.5)}}
 rct(sp.l,sp.t,sp.w,sp.h,A(C.fg,.3),null,1);[400,500,600,700].forEach(l=>T(l+' nm',P.X(l),sp.t+sp.h+11,{a:'center',f:'n',s:10.5,c:C.fg3}))},
click(S,x,y){const G=S.G;if(!G)return;const be=G.be;if(x<be.l||x>be.l+be.w)return;let best=null,bd=1e9;for(let n=1;n<=6;n++){const yy=be.t+10+(be.h-30)*(En(n)/-14.5);const d=Math.abs(y-yy);if(d<bd){bd=d;best=n}}if(bd<16&&best!==S.n){this.jump(S,best,best>S.n);S.timer=2}},
readout(S){const r=[['n',S.n,'blue'],['Eₙ',nf(En(S.n),2)+' eV']];if(S.tr){const l=lam(S.tr.a,S.tr.b);r.push(['siste foton',nf(l,0)+' nm, '+nf(Math.abs(En(S.tr.a)-En(S.tr.b)),2)+' eV'])}return r}
});
}

/* ---------- Fusjon og bindingsenergi ---------- */
{
const NUC=[[1,0,'¹H'],[2,1.112,'²H'],[3,2.827,'³H'],[4,7.074,'⁴He'],[6,5.332,'⁶Li'],[7,5.606,'⁷Li'],[9,6.463,'⁹Be'],[12,7.680,'¹²C'],[14,7.476,'¹⁴N'],[16,7.976,'¹⁶O'],[20,8.032,'²⁰Ne'],[24,8.261,'²⁴Mg'],[28,8.448,'²⁸Si'],[32,8.493,'³²S'],[40,8.551,'⁴⁰Ca'],[56,8.790,'⁵⁶Fe'],[62,8.795,'⁶²Ni'],[84,8.717,'⁸⁴Kr'],[92,8.693,'⁹²Kr'],[120,8.504,'¹²⁰Sn'],[141,8.326,'¹⁴¹Ba'],[208,7.867,'²⁰⁸Pb'],[235,7.591,'²³⁵U'],[238,7.570,'²³⁸U']];
const RX={dt:{n:'²H + ³H → ⁴He + n',E:17.6,in:[[1,1],[1,2]],out:[[2,2],[0,1]],hl:['²H','³H','⁴He']},pp:{n:'4 ¹H → ⁴He + 2e⁺ + 2ν',E:26.7,in:[[1,0],[1,0],[1,0],[1,0]],out:[[2,2]],hl:['¹H','⁴He']},he:{n:'3 ⁴He → ¹²C',E:7.27,in:[[2,2],[2,2],[2,2]],out:[[6,6]],hl:['⁴He','¹²C']},u:{n:'n + ²³⁵U → ¹⁴¹Ba + ⁹²Kr + 3n',E:200,in:[[0,1],[92,143]],out:[[56,85],[36,56],[0,1],[0,1],[0,1]],hl:['²³⁵U','¹⁴¹Ba','⁹²Kr']}};
function nucleus(x,y,Z,N,r){const A_=Z+N,s=r*.55;for(let i=0;i<A_;i++){const rr_=s*Math.sqrt(i+.5)/Math.sqrt(A_)*Math.sqrt(A_)*.62,th=i*2.39996;const isP=Math.floor((i+1)*Z/A_)>Math.floor(i*Z/A_);sphere(x+Math.cos(th)*rr_,y+Math.sin(th)*rr_,r*.5,isP?C.red:'#9aa6b2')}}
M({id:'fy-fusjon',s:'fy',c:['FY1'],title:'Fusjon, fisjon og stjernenes grunnstoffer',short:'Fusjon og fisjon',kw:'fusjon fisjon bindingsenergi kjernefysikk stjerner grunnstoffer supernova masseforskjell e=mc2 jern',
lead:'Kjerner med høy bindingsenergi per nukleon er mest stabile. Lette kjerner frigjør energi når de smelter sammen (fusjon), tunge når de spaltes (fisjon). Toppen ligger ved jern.',
controls:[{id:'rx',type:'seg',label:'Reaksjon',value:'pp',options:[['pp','Fusjon i sola'],['dt','Fusjon: D + T'],['he','Heliumbrenning'],['u','Fisjon av uran']]}],
tex:['E=\\Delta m\\cdot c^2','1\\ \\text{u}\\cdot c^2=931{,}5\\ \\text{MeV}'],
about:['Kurven viser bindingsenergi per nukleon. Jo høyere punkt, jo hardere er nukleonene bundet, og jo mindre masse har kjernen per nukleon.','Når produktene ligger høyere på kurven enn utgangsstoffene, frigjøres energi. Massen blir litt mindre, og forskjellen blir energi etter $E=\\Delta m c^2$.','Stjerner lager grunnstoffer ved fusjon: hydrogen blir helium, helium blir karbon og oksygen, og i tunge stjerner fortsetter det helt til jern.','Grunnstoffer tyngre enn jern krever energi for å lages. De dannes når store stjerner eksploderer som supernovaer og når nøytronstjerner kolliderer.'],
tasks:['Hvorfor kan ikke en stjerne få energi ved å lage grunnstoffer tyngre enn jern?','Regn ut massetapet i u for reaksjonen D + T når det frigjøres 17,6 MeV.','Hvor mye mer energi frigjøres per reaksjon ved fisjon av uran enn ved D–T-fusjon? Og per kilogram brensel?','Gullet i en ring ble laget i en eksplosjon i verdensrommet. Forklar.'],
init(S){S.ph=0},change(S){S.ph=0},
update(S,dt){S.ph=(S.ph+dt/5)%1},
draw(S){const r=RX[S.p.rx];const[bl,br]=split(S,.44,{g:30});const ph=S.ph;const cx=bl.l+bl.w/2,cy=bl.t+bl.h*.45;const big=S.p.rx==='u';const rb=Math.min(bl.w,bl.h)/(big?60:22);
 const approach=ease(clamp(ph/.35,0,1)),merge=clamp((ph-.35)/.1,0,1),fly=ease(clamp((ph-.45)/.45,0,1));
 if(ph<.45){r.in.forEach(([Z,N],i)=>{const k=r.in.length;const a=i/k*TAU+PI;const d=(1-approach)*bl.w*.36+Math.sqrt(Z+N)*rb*.5;const x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d*.7;if(Z+N===1){sphere(x,y,rb*.5*(big?2.4:1),Z?C.red:'#9aa6b2')}else nucleus(x,y,Z,N,rb)})}
 if(ph>=.35&&ph<.6){glow(cx,cy,bl.w*.3*merge,C.yellow,(1-clamp((ph-.45)/.15,0,1))*.8)}
 if(ph>=.45){r.out.forEach(([Z,N],i)=>{const k=r.out.length;const a=i/k*TAU+.3;const d=fly*bl.w*.34*(k>1?1:0);const x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d*.7;if(Z+N===1)sphere(x,y,rb*.5*(big?2.4:1),Z?C.red:'#9aa6b2');else nucleus(x,y,Z,N,rb)});if(S.p.rx==='pp'){for(let i=0;i<2;i++){const a=i*PI+1;const d=fly*bl.w*.4;dot(cx+Math.cos(a)*d,cy+Math.sin(a)*d*.7,3,C.blue)}}
  T(`+ ${nf(r.E,1)} MeV`,cx,cy-bl.h*.36,{a:'center',f:'n',s:18,c:A(C.yellow,clamp(fly*1.5,0,1))})}
 T(r.n,cx,bl.t+bl.h-16,{a:'center',f:'d',s:19,c:C.fg});
 const P=Plane(0,250,0,9.6,{l:br.l+26,t:br.t+6,w:br.w-26,h:br.h-30});P.grid(50,{sy:2,minor:false,alpha:.1});P.axes({xs:50,ys:2,xl:'nukleontall A',yl:'MeV per nukleon',ls:13,x0:true,y0:true});
 const pts=NUC.map(n=>P.pt(n[0],n[1]));pth(pts,A(C.fg,.4),1.6);
 rct(P.X(0),P.t,P.X(56)-P.X(0),P.h,null,A(C.yellow,.04));rct(P.X(56),P.t,P.X(250)-P.X(56),P.h,null,A(C.blue,.04));T('fusjon gir energi',P.X(30),P.Y(3),{a:'center',s:11.5,c:C.yellow});T('fisjon gir energi',P.X(160),P.Y(3),{a:'center',s:11.5,c:C.blue});
 NUC.forEach(([A_,B_,l])=>{const hl=r.hl.includes(l);dot(P.X(A_),P.Y(B_),hl?6:3.5,hl?C.yellow:C.fg2);if(hl||['⁵⁶Fe','¹²C','¹⁶O','²³⁸U','²⁰⁸Pb'].includes(l))T(l,P.X(A_)+(A_>200?-8:8),P.Y(B_)+(B_<3?-12:14),{f:'n',s:11.5,c:hl?C.yellow:C.fg3,a:A_>200?'right':'left'})})},
readout(S){const r=RX[S.p.rx];return[['frigjort',nf(r.E,1)+' MeV','yellow'],['Δm',nf(r.E/931.5,4)+' u'],['energi',nfs(r.E*1.602e-13,3)+' J']]}
});
}
