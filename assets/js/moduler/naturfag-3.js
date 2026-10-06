'use strict';
/* ================= NATURFAG (del 3): bølger, stråling, universet, programmering ================= */

/* ---------- Bølger ---------- */
{
const XM=3,XW=10;
M({id:'na-bolger',s:'na',c:['NAT'],title:'Bølger: bølgelengde, frekvens og fart',short:'Bølger',kw:'bølge bølgelengde frekvens periode amplitude bølgefart transversal longitudinal lyd lys svingning fortetning fortynning bølgetopp hertz',
lead:'En bølge frakter energi, men ikke stoff. Hver bit av mediet svinger bare fram og tilbake mens mønsteret beveger seg videre. Bølgefarten er bølgelengden ganger frekvensen.',
hint:'Følg den gule partikkelen. Den blir på samme sted mens bølgen går forbi.',
controls:[{id:'ty',type:'seg',label:'Type bølge',value:'tv',options:[['tv','Transversal (tau, vann)'],['lg','Longitudinal (lyd)']]},
 {id:'f',label:'Frekvens f',min:.2,max:2,step:.05,value:.6,unit:'Hz',d:2},{id:'v',label:'Bølgefart v',min:.5,max:4,step:.1,value:2,unit:'m/s',d:1},{id:'A',label:'Amplitude',min:.1,max:1,step:.05,value:.6,unit:'m',d:2},
 {id:'mark',type:'check',label:'Mål bølgelengden og perioden',value:true}],
tex:['v=f\\cdot\\lambda','T=\\frac{1}{f}'],
about:['<strong>Bølgelengden</strong> $\\lambda$ er avstanden mellom to bølgetopper. <strong>Frekvensen</strong> $f$ er hvor mange svingninger hver partikkel gjør per sekund, målt i hertz (Hz). <strong>Perioden</strong> $T$ er tiden én svingning tar.','På én periode flytter bølgen seg nøyaktig én bølgelengde. Derfor er farten $v=\\lambda/T=f\\cdot\\lambda$.','I en <strong>transversal</strong> bølge svinger partiklene på tvers av retningen bølgen går, som på et tau eller på vann. I en <strong>longitudinal</strong> bølge svinger de fram og tilbake langs retningen. Lyd er en longitudinal bølge med fortetninger og fortynninger av lufta.','Bølgefarten bestemmes av mediet. Lyd går omtrent 340 m/s i luft og 1500 m/s i vann. Lys og radiobølger går 300 000 km/s. Øker du frekvensen uten å endre mediet, blir bølgelengden kortere.'],
tasks:['Doble frekvensen. Hva skjer med bølgelengden? Hva skjer med farten?','Mål perioden på grafen og regn ut frekvensen. Stemmer det?','En tone på 440 Hz går i luft med 340 m/s. Hva er bølgelengden?','Flytter den gule partikkelen seg bortover? Hva er det som faktisk beveger seg med bølgen?'],
init(S){S.tt=0;S.hist=[]},
update(S,dt){S.tt+=dt;const p=S.v,lam=p.v/p.f;S.hist.push([S.tt,p.A*Math.sin(TAU*(p.f*S.tt-XM/lam))]);while(S.hist.length&&S.hist[0][0]<S.tt-6)S.hist.shift()},
draw(S){const p=S.v,lam=p.v/p.f,T_=1/p.f,lg=S.p.ty==='lg',t=S.tt;const ph=x=>TAU*(p.f*t-x/lam),y=x=>p.A*Math.sin(ph(x));
 const b=pad(S,34,28,40);const[top,bot]=rows(b,[1.15,1],46);const[g1,g2]=cols(bot,[1.3,1],34);
 const P=Plane(0,XW,-1.25,1.25,top);S.P=P;
 if(!lg){ln(P.X(0),P.Y(0),P.X(XW),P.Y(0),A(C.fg,.15),1,[3,4]);const pts=[];for(let i=0;i<=200;i++){const x=XW*i/200;pts.push(P.pt(x,y(x)))}pth(pts,A(C.teal,.6),2.4);
  for(let i=0;i<=40;i++){const x=XW*i/40;dot(P.X(x),P.Y(y(x)),Math.abs(x-XM)<.01?7:3.4,Math.abs(x-XM)<.01?C.yellow:C.teal)}
  const ym=y(XM);ln(P.X(XM),P.Y(-p.A),P.X(XM),P.Y(p.A),A(C.yellow,.35),1.4,[3,3]);
  for(let n=-1;n<6;n++){const xc=lam*(p.f*t-.25-n);if(xc>.2&&xc<XW-.2)T('topp',P.X(xc),P.Y(p.A)-12,{a:'center',s:10.5,c:C.fg3})}}
 else{const rowsN=7,cols_=60,dx=XW/cols_,a=Math.min(p.A*.45,dx*2.2);for(let i=0;i<=cols_;i++){const x0=i*dx,xi=x0+a*Math.sin(ph(x0));const hl=Math.abs(x0-XM)<1e-6;for(let r=0;r<rowsN;r++){const yy=-.9+1.8*r/(rowsN-1)+((i%2)?.08:0);dot(P.X(xi),P.Y(yy),hl?5:2.8,hl?C.yellow:A(C.teal,.9))}}
  for(let n=-1;n<8;n++){const xc=lam*(p.f*t-n);if(xc>.3&&xc<XW-.3)T('fortetning',P.X(xc),P.Y(1.15),{a:'center',s:10.5,c:C.fg3});const xr=xc+lam/2;if(xr>.3&&xr<XW-.3)T('fortynning',P.X(xr),P.Y(-1.17),{a:'center',s:10.5,c:C.fg3})}}
 arr(P.X(XW-1.4),P.Y(1.22),P.X(XW-.2),P.Y(1.22),C.fg2,1.6,8);T('bølgen går hit',P.X(XW-1.5),P.Y(1.22),{a:'right',s:11,c:C.fg2});
 const G=Plane(0,XW,-1.15,1.15,{l:g1.l+30,t:g1.t,w:g1.w-30,h:g1.h});G.grid(1,{sy:.5,minor:false,alpha:.06});G.axes({xs:2,ys:.5,x0:true,xl:'x (m)',ls:13});lab(g1,lg?'Forskyvning langs bølgen nå':'Utslag nå');
 G.fn(x=>y(x),C.teal,2.4,{prog:1});dot(G.X(XM),G.Y(y(XM)),5,C.yellow);
 if(S.p.mark){const n0=Math.ceil(p.f*t-.25-(XW-.3)/lam);let xc=null;for(let n=n0;n<n0+40;n++){const x=lam*(p.f*t-.25-n);if(x>=.3&&x+lam<=XW-.1){xc=x;break}}
  if(xc!==null){const yy=G.Y(Math.min(1.1,p.A+.22));ln(G.X(xc),G.Y(p.A),G.X(xc),yy,A(C.yellow,.5),1);ln(G.X(xc+lam),G.Y(p.A),G.X(xc+lam),yy,A(C.yellow,.5),1);arr(G.X(xc+lam/2),yy,G.X(xc),yy,C.yellow,1.6,7);arr(G.X(xc+lam/2),yy,G.X(xc+lam),yy,C.yellow,1.6,7);T('λ = '+nf(lam,2)+' m',G.X(xc+lam/2),yy-11,{a:'center',f:'n',s:12,c:C.yellow,bg:A(C.stage,.7)})}
  else T('λ = '+nf(lam,2)+' m (lengre enn bildet)',G.l+G.w-4,G.t+8,{a:'right',f:'n',s:12,c:C.yellow})}
 const H=Plane(t-6,t,-1.15,1.15,{l:g2.l+30,t:g2.t,w:g2.w-30,h:g2.h});H.grid(1,{sy:.5,minor:false,alpha:.06});H.axes({xs:1,ys:.5,xAt:t-6,x0:true,xf:()=>'',xl:'tid',ls:13});lab(g2,'Den gule partikkelen over tid');
 if(S.hist.length>1)pth(S.hist.map(q=>H.pt(q[0],q[1])),C.yellow,2.2);
 if(S.p.mark){const tp=(Math.floor(p.f*t-.25-XM/lam)+.25+XM/lam)/p.f;if(tp-T_>t-6){const yy=H.Y(Math.min(1.1,p.A+.22));ln(H.X(tp),H.Y(p.A),H.X(tp),yy,A(C.yellow,.5),1);ln(H.X(tp-T_),H.Y(p.A),H.X(tp-T_),yy,A(C.yellow,.5),1);arr(H.X(tp-T_/2),yy,H.X(tp-T_),yy,C.fg,1.6,7);arr(H.X(tp-T_/2),yy,H.X(tp),yy,C.fg,1.6,7);T('T = '+nf(T_,2)+' s',H.X(tp-T_/2),yy-11,{a:'center',f:'n',s:12,c:C.fg,bg:A(C.stage,.7)})}}},
readout(S){const p=S.p,lam=p.v/p.f;return[['frekvens',nf(p.f,2)+' Hz'],['periode',nf(1/p.f,2)+' s'],['bølgelengde',nf(lam,2)+' m','yellow'],['fart',nf(p.v,1)+' m/s']]},
live(S){const p=S.p;return `v=f\\cdot\\lambda=${tn(p.f,2)}\\cdot ${tn(p.v/p.f,2)}=${tn(p.v,1)}\\ \\text{m/s}`}
});
}

/* ---------- Interferens, diffraksjon og Doppler ---------- */
{
let off=null,offX=null;
const GW=180,GH=110,WW=20;
M({id:'na-interferens',s:'na',c:['NAT'],title:'Interferens, diffraksjon og Dopplereffekten',short:'Interferens og Doppler',kw:'interferens diffraksjon dopplereffekt bølger to kilder spalte forsterkning utslokking lydmuren rødforskyvning ambulanse frekvens bølgefront',
lead:'Når bølger møtes, legges de sammen. Topp mot topp gir forsterkning, topp mot bunn gir utslokking. Bølger bøyer seg rundt åpninger. Og en kilde som beveger seg, presser bølgene sammen foran seg.',
controls:[{id:'mode',type:'seg',label:'Fenomen',value:'to',options:[['to','To kilder'],['spalte','Åpning i en vegg'],['doppler','Dopplereffekten']]},
 {id:'lam',label:'Bølgelengde λ',min:1,max:4,step:.1,value:2,d:1,show:S=>S.p.mode!=='doppler'},{id:'d',label:'Avstand mellom kildene',min:1,max:9,step:.1,value:4,d:1,show:S=>S.p.mode==='to'},{id:'a',label:'Bredde på åpningen',min:.5,max:10,step:.1,value:3,d:1,show:S=>S.p.mode==='spalte'},
 {id:'int',type:'check',label:'Vis gjennomsnittlig styrke i stedet for bølgene',value:false,show:S=>S.p.mode!=='doppler'},{id:'vs',label:'Fart på kilden (andel av bølgefarten)',min:0,max:1.4,step:.02,value:.5,d:2,show:S=>S.p.mode==='doppler'}],
tex:['\\text{forsterkning: }\\Delta s=n\\lambda','\\text{utslokking: }\\Delta s=(n+\\tfrac12)\\lambda','f\'=f\\cdot\\frac{v}{v\\mp v_k}'],
about:['<strong>Interferens</strong>: To kilder sender ut like bølger i takt. Der veiforskjellen til kildene er et helt antall bølgelengder, kommer toppene samtidig og forsterker hverandre. Der veiforskjellen er en halv bølgelengde mer, slokker de hverandre. Det gir mønsteret av striper.','<strong>Diffraksjon</strong>: Når en bølge går gjennom en åpning, sprer den seg ut på den andre siden. Spredningen er størst når åpningen er omtrent like stor som bølgelengden. Derfor hører du lyd rundt et hjørne, men ser ikke lys rundt det.','<strong>Dopplereffekten</strong>: Når kilden beveger seg, kommer bølgetoppene tettere foran den og glissere bak. Foran hører du høyere frekvens, bak lavere, som når en ambulanse kjører forbi. Går kilden fortere enn bølgene, dannes en kjegle: et lydsmell.','Den samme effekten for lys gir rødforskyvning fra galakser som fjerner seg. Det er et av bevisene for big bang.'],
tasks:['Gjør avstanden mellom kildene større. Blir det flere eller færre striper?','Hvor bred må åpningen være for at bølgen skal spre seg mest?','Sett farten på kilden til 0,5. Hvor mye høyere frekvens hører observatøren foran?','Hva skjer når kilden går fortere enn bølgene?'],
init(S){S.tt=0;S.src=2},
change(S,id){if(id==='mode')S.src=2},
update(S,dt){S.tt+=dt;if(S.p.mode==='doppler'){S.src+=dt*S.p.vs*3;if(S.src>WW-1)S.src=1}},
draw(S){const p=S.p,b=pad(S,26,26,40);if(p.mode==='doppler')return this.dop(S,b);
 const asp=GH/GW;let w=b.w,h=w*asp;if(h>b.h){h=b.h;w=h/asp}const ox=b.l+(b.w-w)/2,oy=b.t;const wx=WW,wy=WW*asp;
 if(!off){off=document.createElement('canvas');off.width=GW;off.height=GH;offX=off.getContext('2d')}
 const img=offX.createImageData(GW,GH),D=img.data;const lam=S.v.lam,k=TAU/lam,w_=TAU*.8,t=S.tt;const cb=rgbOf(C.blue),cy=rgbOf(C.yellow),cs=rgbOf(C.stage);
 const put=(i,v)=>{v=clamp(v*.85,-1,1);const c=v>=0?cy:cb,a=Math.abs(v);D[i]=cs[0]+(c[0]-cs[0])*a;D[i+1]=cs[1]+(c[1]-cs[1])*a;D[i+2]=cs[2]+(c[2]-cs[2])*a;D[i+3]=255};
 if(p.mode==='to'){const d=S.v.d,s1=[wx/2-d/2,1],s2=[wx/2+d/2,1];
  for(let j=0;j<GH;j++)for(let i=0;i<GW;i++){const x=(i+.5)/GW*wx,y=(j+.5)/GH*wy;const r1=Math.hypot(x-s1[0],y-s1[1]),r2=Math.hypot(x-s2[0],y-s2[1]);const a1=1/Math.sqrt(1+r1*.6),a2=1/Math.sqrt(1+r2*.6);
   let v;if(p.int){const I=a1*a1+a2*a2+2*a1*a2*Math.cos(k*(r1-r2));v=I/(a1+a2)**2*1.1}else v=(a1*Math.cos(k*r1-w_*t)+a2*Math.cos(k*r2-w_*t))*1.3;put((j*GW+i)*4,v)}}
 else{const a=S.v.a,xb=wx*.3,N=Math.max(3,Math.round(a*3));const pts=[];for(let n=0;n<N;n++)pts.push(wy/2-a/2+a*(n+.5)/N);
  for(let j=0;j<GH;j++)for(let i=0;i<GW;i++){const x=(i+.5)/GW*wx,y=(j+.5)/GH*wy;let v;if(x<xb){v=p.int?.5:Math.cos(k*x-w_*t)*.8}else{let re=0,im=0;for(const py of pts){const r=Math.hypot(x-xb,y-py)+.01;const ph=k*(r+xb);const am=1/Math.sqrt(1+r*1.5);re+=am*Math.cos(ph);im+=am*Math.sin(ph)}re*=2.2/N*Math.sqrt(a+1);im*=2.2/N*Math.sqrt(a+1);v=p.int?(re*re+im*im)*.6:(re*Math.cos(w_*t)+im*Math.sin(w_*t))*.9}put((j*GW+i)*4,v)}}
 offX.putImageData(img,0,0);X.save();X.imageSmoothingEnabled=true;X.drawImage(off,ox,oy,w,h);X.restore();rct(ox,oy,w,h,A(C.fg,.2),null,1);
 const sx=x=>ox+x/wx*w,sy=y=>oy+y/wy*h;
 if(p.mode==='to'){[[wx/2-S.v.d/2],[wx/2+S.v.d/2]].forEach(([x])=>{dot(sx(x),sy(1),6,C.fg);circ(sx(x),sy(1),9,C.fg,null,1.5)});T('kilde 1',sx(wx/2-S.v.d/2),sy(1)+18,{a:'center',s:11,c:C.fg});T('kilde 2',sx(wx/2+S.v.d/2),sy(1)+18,{a:'center',s:11,c:C.fg})}
 else{const xb=wx*.3,a=S.v.a;rct(sx(xb)-3,oy,6,sy(wy/2-a/2)-oy,null,C.fg2);rct(sx(xb)-3,sy(wy/2+a/2),6,oy+h-sy(wy/2+a/2),null,C.fg2);T('vegg',sx(xb)-8,oy+12,{a:'right',s:11,c:C.fg2})}
 T((p.int?'lyst = sterk bølge, mørkt = utslokking':'gult = bølgetopp, blått = bølgebunn')+'   ·   '+(p.mode==='to'?'λ = '+nf(S.v.lam,1)+', d = '+nf(S.v.d,1):`åpning / λ = ${nf(S.v.a/S.v.lam,2)}`),ox+6,oy+h+14,{s:11.5,c:C.fg3})},
dop(S,b){const vs=S.p.vs,c=3,f=1.2,wy=WW*(b.h/b.w);const P=Plane(0,WW,0,wy,b,true);const t=S.tt,period=1/f;
 const src=S.src;const n0=Math.floor(t/period);ln(P.X(0),P.Y(wy/2),P.X(WW),P.Y(wy/2),A(C.fg,.12),1,[3,4]);
 for(let n=n0;n>n0-30;n--){const te=n*period,age=t-te;if(age<0)continue;const xs=src-vs*c*age;if(xs<1&&vs>0)continue;const r=c*age;if(r>WW*1.3)break;circ(P.X(xs),P.Y(wy/2),r*P.sx,A(C.teal,Math.max(.1,.85-age*.07)),null,1.6)}
 dot(P.X(src),P.Y(wy/2),7,C.yellow);arr(P.X(src),P.Y(wy/2)-14,P.X(src+1.2),P.Y(wy/2)-14,C.yellow,2,8);
 const obsF=WW-1.2,obsB=.8;const fF=vs<1?f/(1-vs):Infinity,fB=f/(1+vs);
 [[obsF,'foran',fF],[obsB,'bak',fB]].forEach(([x,n,ff])=>{circ(P.X(x),P.Y(wy/2+1.6),9,C.fg2,A(C.fg,.1),1.6);T('observatør '+n,P.X(x),P.Y(wy/2+1.6)-18,{a:'center',s:11,c:C.fg2});T(isFinite(ff)?nf(ff/f,2)+' × f':'lydsmell',P.X(x),P.Y(wy/2+1.6)+20,{a:'center',f:'n',s:12,c:n==='foran'?C.red:C.blue})});
 if(vs>=1)T('Kilden går fortere enn bølgene: bølgefrontene hoper seg opp til en kjegle',P.l+6,P.t+14,{s:13,w:700,c:C.red,bg:A(C.stage,.7)});else T('Bølgefrontene presses sammen foran kilden og strekkes ut bak',P.l+6,P.t+14,{s:13,c:C.fg,bg:A(C.stage,.7)})},
readout(S){const p=S.p;if(p.mode==='doppler'){const vs=p.vs;return[['fart på kilden',nf(vs,2)+' · v'],['frekvens foran',vs<1?nf(1/(1-vs),2)+' · f':'lydsmell','red'],['frekvens bak',nf(1/(1+vs),2)+' · f','blue']]}if(p.mode==='to')return[['bølgelengde',nf(p.lam,1)],['avstand mellom kildene',nf(p.d,1)],['d / λ',nf(p.d/p.lam,2),'yellow']];return[['bølgelengde',nf(p.lam,1)],['åpning',nf(p.a,1)],['åpning / λ',nf(p.a/p.lam,2),'yellow']]}
});
}

/* ---------- Trådløs kommunikasjon ---------- */
{
const MSG=['HEI','SOS','OK!','NAT'];const SPB=40;
const bitsOf=s=>[...s].flatMap(ch=>{const c=ch.charCodeAt(0);return[...Array(8)].map((_,i)=>(c>>(7-i))&1)});
const sig=(mod,bit,u)=>mod==='ask'?(bit?1:.25)*Math.sin(TAU*4*u):Math.sin(TAU*(bit?6:3)*u);
function receive(S){const p=S.p,bits=bitsOf(MSG[+p.msg]);const g=Math.min(1,1/(p.d*p.d));const sn=p.noise*.18/Math.sqrt(g);const rg=rng(S.seed);const out=[],wave=[];
 bits.forEach((bit,k)=>{let e=0,e0r=0,e0i=0,e1r=0,e1i=0;for(let j=0;j<SPB;j++){const u=j/SPB;const r=sig(p.mod,bit,u)+sn*gauss_(rg);wave.push(r);e+=r*r;e0r+=r*Math.sin(TAU*3*u);e0i+=r*Math.cos(TAU*3*u);e1r+=r*Math.sin(TAU*6*u);e1i+=r*Math.cos(TAU*6*u)}
  let dec;if(p.mod==='ask'){const rms=Math.sqrt(e/SPB),thr=Math.sqrt(((1+.0625)/2)/2+sn*sn);dec=rms>thr?1:0}else dec=(e1r*e1r+e1i*e1i)>(e0r*e0r+e0i*e0i)?1:0;out.push(dec)});
 return{bits,dec:out,wave,g,sn}}
const gauss_=rg=>{let u=0,v=0;while(u===0)u=rg();v=rg();return Math.sqrt(-2*Math.log(u))*Math.cos(TAU*v)};
const txt=b=>{let s='';for(let i=0;i+7<b.length;i+=8){let c=0;for(let j=0;j<8;j++)c=c*2+b[i+j];s+=c>=32&&c<127?String.fromCharCode(c):'�'}return s};
M({id:'na-tradlos',s:'na',c:['NAT'],title:'Trådløs kommunikasjon: fra bits til radiobølger',short:'Trådløs kommunikasjon',kw:'trådløs kommunikasjon radiobølger mobil wifi bluetooth modulasjon bit binær signal støy antenne frekvens amplitude digital',
lead:'Mobilen, wifi og bluetooth sender informasjon som radiobølger. Meldingen gjøres om til bits, og bitene endrer en bærebølge. Mottakeren må tolke et svakt signal med støy.',
controls:[{id:'msg',type:'sel',label:'Melding',value:'0',options:MSG.map((m,i)=>[String(i),m])},{id:'mod',type:'seg',label:'Modulasjon',value:'ask',options:[['ask','Amplitude'],['fsk','Frekvens']]},
 {id:'d',label:'Avstand til senderen',min:.3,max:6,step:.1,value:1,unit:'km',d:1},{id:'noise',label:'Støy i mottakeren',min:0,max:1,step:.02,value:.3,d:2},{type:'btns',items:[['Send på nytt',S=>{S.seed=Math.floor(Math.random()*1e6);S.prog=0}]]}],
tex:['\\text{tegn}\\to\\text{8 bits},\\quad \\text{H}=72=01001000_2','\\text{signalstyrke}\\propto\\frac{1}{r^2}'],
about:['Datamaskiner lagrer alt som <strong>bits</strong>, 0 og 1. Hver bokstav er et tall som skrives med åtte bits. «H» er 72, som er 01001000 i totallsystemet.','Senderen lager en <strong>bærebølge</strong> og endrer den etter bitene. Ved <strong>amplitudemodulasjon</strong> blir bølgen sterk for 1 og svak for 0. Ved <strong>frekvensmodulasjon</strong> svinger den raskere for 1 enn for 0. Antennen sender bølgen ut som en elektromagnetisk bølge.','Signalet blir svakere med avstanden, omtrent som $1/r^2$. Mottakeren forsterker det, men da forsterkes også støyen. Blir signal–støy-forholdet for dårlig, tolkes noen bits feil.','Frekvensmodulasjon tåler støy bedre, fordi støyen endrer styrken mer enn hvor fort bølgen svinger. Moderne mobilnett og wifi bruker smartere varianter og feilrettende koder. Wifi bruker frekvenser rundt 2,4 og 5 GHz.'],
tasks:['Hvor mange bits trengs for meldingen? Hvorfor?','Øk avstanden til det blir bitfeil. Hvorfor kommer feilene først når avstanden blir stor?','Sammenlign amplitude- og frekvensmodulasjon med mye støy. Hvilken er mest robust?','Regn ut bølgelengden til wifi på 2,4 GHz. Lysfarten er 3·10⁸ m/s.'],
init(S){S.seed=1;S.prog=0},
change(S,id){if(id==='msg'||id==='mod')S.prog=0},
update(S,dt){S.prog+=dt*5},
draw(S){const p=S.p,R=receive(S),nb=R.bits.length,cur=Math.min(nb,Math.floor(S.prog));const b=pad(S,26,24,40);const[r1,r2,r3,r4,r5]=rows(b,[.5,.8,1,.8,.55],26);
 const bw=r1.w/nb;const bitRow=(r,arr_,cmp,lbl)=>{lab(r,lbl);arr_.forEach((v,i)=>{if(cmp&&i>=cur)return;const x=r.l+i*bw;const ok=!cmp||v===R.bits[i];rr(x+1,r.t,bw-2,r.h,3,null,cmp?(ok?A(C.green,v?.75:.3):A(C.red,.8)):A(C.blue,v?.75:.22));if(bw>11)T(String(v),x+bw/2,r.t+r.h/2,{a:'center',f:'n',s:Math.min(12,bw*.7),c:C.fg})});for(let c=1;c<nb/8;c++)ln(r.l+c*8*bw,r.t-3,r.l+c*8*bw,r.t+r.h+3,A(C.fg,.5),1.5)};
 bitRow(r1,R.bits,false,'Meldingen «'+MSG[+p.msg]+'» som bits');
 const wv=(r,vals,col,lbl,upto)=>{lab(r,lbl);const n=vals.length,cy=r.t+r.h/2,am=r.h*.42;ln(r.l,cy,r.l+r.w,cy,A(C.fg,.12),1);const pts=[];for(let i=0;i<Math.min(n,upto);i++)pts.push([r.l+i/n*r.w,cy-clamp(vals[i],-2.2,2.2)/1.2*am]);pth(pts,col,1.3)};
 const sent=[];R.bits.forEach(bit=>{for(let j=0;j<SPB;j++)sent.push(sig(p.mod,bit,j/SPB))});wv(r2,sent,C.yellow,'Signalet som sendes',sent.length);
 const ax=r3.l+20,ay=r3.t+r3.h*.75,rx_=r3.l+r3.w-24;ln(ax,ay,ax,r3.t+4,C.fg2,2.4);poly([[ax-10,ay],[ax+10,ay],[ax,r3.t+16]],A(C.fg2,.8),null,1.4);T('sender',ax,ay+12,{a:'center',s:11,c:C.fg3});
 rr(rx_-9,ay-26,18,30,4,C.fg2,A(C.fg,.08),1.4);T('mottaker',rx_,ay+12,{a:'center',s:11,c:C.fg3});
 X.save();X.beginPath();X.rect(r3.l,r3.t-4,r3.w,r3.h+8);X.clip();for(let k=0;k<7;k++){const rr_=(S.t*90+k*(r3.w/6))%(r3.w*1.05);circ(ax,r3.t+16,rr_,A(C.teal,Math.max(0,.6-rr_/r3.w*.6)),null,1.4)}X.restore();
 T(`avstand ${nf(p.d,1)} km · signalstyrke ${nf(R.g*100,R.g<.1?1:0)} %`,r3.l+r3.w/2,r3.t+r3.h-6,{a:'center',f:'n',s:11.5,c:C.fg2});
 wv(r4,R.wave,C.teal,'Mottatt signal etter forsterking (med støy)',cur*SPB);
 bitRow(r5,R.dec,true,'Tolket av mottakeren');const errs=R.dec.slice(0,cur).filter((v,i)=>v!==R.bits[i]).length;
 if(cur>=nb)T(`Mottatt tekst: «${txt(R.dec)}»  ·  ${errs} bitfeil`,r5.l+r5.w,r5.t-11,{a:'right',s:12,w:700,c:errs?C.red:C.green})},
readout(S){const R=receive(S);const errs=R.dec.filter((v,i)=>v!==R.bits[i]).length;const snr=10*Math.log10(.5/(R.sn*R.sn+1e-9));return[['bits',R.bits.length],['signalstyrke',nf(R.g*100,R.g<.1?1:0)+' %'],['signal/støy',S.p.noise>0?nf(snr,0)+' dB':'uendelig'],['bitfeil',errs,'red'],['mottatt',txt(R.dec),'green']]}
});
}

/* ---------- Ioniserende stråling ---------- */
{
const TY={a:['Alfa (α)','red'],b:['Beta (β)','blue'],g:['Gamma (γ)','yellow']};
const SH={ingen:['Ingen',0],papir:['Papir',.05],al:['Aluminium 3 mm',.3],bly:['Bly 2 cm',2]};
const trans=(ty,sh,D)=>{if(ty==='a')return sh!=='ingen'||D>4.5?0:1;if(ty==='b')return sh==='al'||sh==='bly'||D>90?0:1;return sh==='bly'?.25:sh==='al'?.97:1};
const DOSE=[['Tannrøntgen',.005],['Røntgen av lungene',.02],['Langdistanseflyreise',.05],['Radon hjemme (snitt per år)',2.5],['Alt i Norge (snitt per år)',5.2],['CT av magen',10],['Grense for yrkeseksponerte (per år)',20],['Akutt strålesyke',1000]];
M({id:'na-ioniserende',s:'na',c:['NAT'],title:'Ioniserende stråling: alfa, beta og gamma',short:'Alfa, beta og gamma',kw:'ioniserende stråling alfa beta gamma radioaktivitet skjerming bly geigerteller dose sievert msv radon helse rekkevidde avstandskvadratloven',
lead:'Radioaktive stoffer sender ut alfa-, beta- og gammastråling. Strålingen kan rive løs elektroner fra atomer, altså ionisere dem. Det kan skade celler. De tre typene når ulikt langt og stoppes av ulike materialer.',
controls:[{id:'ty',type:'seg',label:'Stråling',value:'a',options:Object.entries(TY).map(([k,v])=>[k,v[0]])},{id:'sh',type:'seg',label:'Skjerming',value:'ingen',options:Object.entries(SH).map(([k,v])=>[k,v[0]])},
 {id:'D',label:'Avstand til geigertelleren',min:2,max:40,step:.5,value:8,unit:'cm',d:1}],
tex:['\\text{tellerate}\\propto\\frac{1}{r^2}','1\\ \\text{Sv}=1\\ \\text{J/kg}\\ \\text{(vektet for strålingstype)}'],
about:['<strong>Alfastråling</strong> er heliumkjerner. De ioniserer kraftig, men stoppes av noen få centimeter luft eller et papirark. Farlig hvis stoffet kommer inn i kroppen, som radon i lufta vi puster inn.','<strong>Betastråling</strong> er raske elektroner. De går omtrent en meter i luft og stoppes av noen millimeter aluminium. <strong>Gammastråling</strong> er elektromagnetisk stråling med svært høy energi. Den svekkes av tykt bly eller betong, men stoppes aldri helt.','Utenfor skjermingen avtar strålingen med kvadratet av avstanden: dobbel avstand gir en firedel. Avstand er derfor et godt vern. Geigertelleren registrerer også litt <strong>bakgrunnsstråling</strong> hele tiden.','Stråledose måles i sievert (Sv). Diagrammet viser typiske doser i millisievert. Gjennomsnittet i Norge er omtrent 5,2 mSv i året, og omtrent halvparten kommer fra radon i inneluft.'],
tasks:['Hvilken skjerming trengs for å stoppe hver av de tre strålingstypene?','Doble avstanden til gammakilden. Hva skjer med tellertallet?','Hvorfor er radon farlig selv om alfastråling stoppes av et papirark?','Hvor mange tannrøntgenbilder tilsvarer stråledosen fra radon i et år?'],
init(S){S.ps=[];S.cnt=[];S.acc=0;S.flash=0},
update(S,dt){const p=S.p,D=p.D;S.acc+=dt*14;while(S.acc>=1){S.acc-=1;const ang=(Math.random()-.5)*.7;const ty=p.ty;let stop=Infinity;const xa=D*.5;
  if(ty==='a')stop=p.sh!=='ingen'?Math.min(xa,4+Math.random()*.8):4+Math.random()*.8;else if(ty==='b'){if(p.sh==='al'||p.sh==='bly')stop=xa;else stop=80+Math.random()*30}else{if(p.sh==='bly'&&Math.random()>.25)stop=xa+Math.random()*.4;else if(p.sh==='al'&&Math.random()>.97)stop=xa}
  S.ps.push({x:0,y:0,a:ang,stop,ty,ion:[],wig:Math.random()*10})}
 const sp={a:6,b:20,g:30}[p.ty];S.ps.forEach(q=>{const step=sp*dt;q.x+=Math.cos(q.a)*step;q.y+=Math.sin(q.a)*step;if(q.ty==='b')q.a+=(Math.random()-.5)*.25;const dens={a:2.2,b:.12,g:.02}[q.ty];if(Math.random()<dens*step)q.ion.push([q.x,q.y,0]);q.ion.forEach(i=>i[2]+=dt);if(q.x>=q.stop)q.dead=true;if(q.x>=D&&!q.hit){q.hit=true}});S.ps=S.ps.filter(q=>!q.dead&&q.x<D*1.3+5&&(q.ion.length<400));if(S.ps.length>220)S.ps.splice(0,S.ps.length-220);
 const rate=900*trans(p.ty,p.sh,D)*Math.pow(2/D,2)+20;const lamb=rate/60*dt;let k=0;let L=Math.exp(-lamb),pp=1;do{k++;pp*=Math.random()}while(pp>L);k--;for(let i=0;i<k;i++)S.cnt.push(S.t);if(k)S.flash=.12;S.flash=Math.max(0,S.flash-dt);while(S.cnt.length&&S.cnt[0]<S.t-10)S.cnt.shift()},
draw(S){const p=S.p,D=p.D;const[top,bot]=rows(pad(S,30,30,40),[1.15,1],46);const P=Plane(-1,D+4,-(D+5)*top.h/top.w/2,(D+5)*top.h/top.w/2,top);
 rr(P.X(-1)-6,P.Y(0)-16,P.X(0)-P.X(-1)+6,32,4,C.fg2,A(C.fg,.15),1.5);T('kilde',P.X(-.5),P.Y(0)+28,{a:'center',s:11,c:C.fg3});
 if(p.sh!=='ingen'){const th=Math.max(3,SH[p.sh][1]*P.sx),xa=P.X(D*.5);rct(xa-th/2,P.t+6,th,P.h-12,null,p.sh==='bly'?C.grey:p.sh==='al'?mix(C.fg,C.blue,.2):A(C.fg,.85));T(SH[p.sh][0],xa,P.t+2,{a:'center',s:11,c:C.fg2})}
 const gx=P.X(D);rr(gx,P.Y(0)-14,46,28,5,C.fg2,A(C.fg,S.flash>0?.35:.1),1.6);T('teller',gx+23,P.Y(0)+26,{a:'center',s:11,c:C.fg3});glow(gx+4,P.Y(0),14,C.green,S.flash>0?.8:0);
 const col=C[TY[p.ty][1]];S.ps.forEach(q=>{q.ion.forEach(([x,y,a])=>{if(a<1.5){T('+',P.X(x)+3,P.Y(y)-3,{a:'center',f:'n',s:9,c:A(C.red,1-a/1.5)});T('−',P.X(x)-3,P.Y(y)+4,{a:'center',f:'n',s:9,c:A(C.blue,1-a/1.5)})}});const x=P.X(q.x),y=P.Y(q.y);if(q.ty==='g'){const L=14,dx=Math.cos(q.a),dy=-Math.sin(q.a);const pts=[];for(let i=0;i<=12;i++){const s=i/12*L;const w=Math.sin(s*.9+q.wig+S.t*20)*3;pts.push([x-dx*s-dy*w,y-dy*s+dx*w])}pth(pts,col,1.6)}else dot(x,y,q.ty==='a'?4.5:2.6,col)});
 ln(P.X(0),P.Y(0)+40,P.X(D),P.Y(0)+40,A(C.fg,.3),1);T(nf(D,1)+' cm',P.X(D/2),P.Y(0)+52,{a:'center',f:'n',s:11.5,c:C.fg,bg:A(C.stage,.8)});
 const cpm=S.cnt.length*6;T(`${cpm} tellinger per minutt`,top.l+top.w,top.t+4,{a:'right',f:'n',s:14,w:700,c:C.green});T('(bakgrunn ca. 20)',top.l+top.w,top.t+22,{a:'right',s:11,c:C.fg3});
 const lo=-3,hi=3.3;lab(bot,'Typiske stråledoser i millisievert (logaritmisk skala)');const rh=bot.h/DOSE.length,lw=Math.min(210,bot.w*.42);const Q=Plane(lo,hi,0,1,{l:bot.l+lw,t:bot.t,w:bot.w-lw-10,h:bot.h});
 DOSE.forEach(([n,v],i)=>{const y=bot.t+i*rh+rh*.15,h=rh*.7;T(n,bot.l+lw-8,y+h/2,{a:'right',s:Math.min(12,rh*.6),c:C.fg2});const w=Q.X(Math.log10(v))-Q.l;rct(Q.l,y,w,h,null,A(i>=6?C.red:i>=3?C.gold:C.teal,.7));T(nf(v,v<.1?3:v<1?2:v<10?1:0),Q.l+w+5,y+h/2,{f:'n',s:Math.min(11,rh*.55),c:C.fg2})})},
readout(S){const p=S.p;return[['type',TY[p.ty][0],TY[p.ty][1]],['slipper gjennom skjermingen',nf(trans(p.ty,p.sh,p.D*0+1)*100,0)+' %'],['tellerate',S.cnt.length*6+' per min','green']]}
});
}

/* ---------- Big bang ---------- */
{
const HL=[['Hα',656.3],['Hβ',486.1],['Hγ',434.0],['Hδ',410.2]];
const EV=[[-6,'Kvarker samles til protoner og nøytroner'],[2.26,'De første atomkjernene: hydrogen og helium'],[13.08,'Atomer dannes, og universet blir gjennomsiktig. Lyset fra dette øyeblikket er bakgrunnsstrålingen.'],[15.6,'De første stjernene tennes'],[16.5,'De første galaksene'],[17.46,'Sola og jorda dannes'],[17.64,'I dag: 13,8 milliarder år']];
const Tof=lt=>{const t=Math.pow(10,lt);return t<1.2e13?3000*Math.sqrt(1.2e13/t):2.725*Math.pow(4.35e17/t,2/3)};
const tStr=lt=>{const t=Math.pow(10,lt);if(t<1e-3)return nf(t*1e6,1)+' µs';if(t<60)return nf(t,t<1?3:1)+' s';if(t<3600)return nf(t/60,1)+' min';const y=t/3.156e7;if(y<1)return nf(t/86400,0)+' døgn';if(y<1e6)return nf(y,0)+' år';if(y<1e9)return nf(y/1e6,0)+' millioner år';return nf(y/1e9,2)+' milliarder år'};
M({id:'na-bigbang',s:'na',c:['NAT'],title:'Big bang og universet som utvider seg',short:'Big bang',kw:'big bang universet utvidelse hubble rødforskyvning galakse bakgrunnsstråling kosmologi alder helium hydrogen spekter',
lead:'Universet har utvidet seg i 13,8 milliarder år fra en svært varm og tett tilstand. Tre observasjoner støtter det: galaksene fjerner seg, rommet er fylt av svak bakgrunnsstråling, og det er akkurat så mye helium som teorien forutsier.',
hint:'Klikk på en annen galakse for å stå der og se utvidelsen derfra.',
controls:[{id:'mode',type:'seg',label:'Vis',value:'utv',options:[['utv','Utvidelsen'],['rod','Rødforskyvning'],['tid','Universets historie']]},
 {id:'d',label:'Avstand til galaksen',min:0,max:3000,step:10,value:800,unit:'millioner lysår',show:S=>S.p.mode==='rod'},{id:'lt',label:'Tid etter big bang (logaritmisk)',min:-6,max:17.64,step:.01,value:13.08,fmt:v=>tStr(v),show:S=>S.p.mode==='tid'}],
tex:['v=H_0\\cdot d','z=\\frac{\\lambda_{\\text{målt}}-\\lambda_0}{\\lambda_0}\\approx\\frac{v}{c}','H_0\\approx 70\\ \\text{km/s per megaparsec}'],
about:['<strong>Hubbles lov</strong>: Jo lenger unna en galakse er, jo fortere fjerner den seg. Det er ikke galaksene som farer gjennom rommet, men rommet mellom dem som strekker seg. Klikk på en annen galakse: Derfra ser det akkurat likt ut. Universet har ikke noe sentrum.','<strong>Rødforskyvning</strong>: Hydrogen har spektrallinjer ved bestemte bølgelengder. I lyset fra fjerne galakser er linjene flyttet mot rødt fordi lysbølgene er strukket ut på veien.','<strong>Bakgrunnsstrålingen</strong>: 380 000 år etter big bang ble universet kaldt nok til at det ble dannet atomer, og lyset kunne gå fritt. Det lyset har siden blitt strukket ut til mikrobølger tilsvarende 2,7 K, og vi måler det fra alle retninger.','Teorien forutsier også at omtrent en firedel av massen i det tidlige universet ble helium og resten hydrogen. Det stemmer med det vi måler i de eldste stjernene.'],
tasks:['Velg en annen galakse som observatør. Hvorfor ser det ut som om alle galakser fjerner seg fra akkurat deg?','En galakse er 1000 millioner lysår unna. Hvor fort fjerner den seg? Bruk H₀ ≈ 21 km/s per million lysår.','Hvorfor ble universet gjennomsiktig først etter 380 000 år?','Hvilke tre observasjoner støtter big bang-teorien?'],
init(S){S.obs=0;S.a=1;const rg=rng(21);S.gal=[];for(let i=-4;i<=4;i++)for(let j=-3;j<=3;j++){if(rg()<.18)continue;S.gal.push({x:i+(rg()-.5)*.6,y:j+(rg()-.5)*.6,r:rg()*TAU,s:.7+rg()*.6})}S.obs=S.gal.reduce((bi,g,i,arr_)=>Math.hypot(g.x,g.y)<Math.hypot(arr_[bi].x,arr_[bi].y)?i:bi,0)},
update(S,dt){if(S.p.mode==='utv'){S.a+=dt*.12*S.a;if(S.a>2.2)S.a=1}},
draw(S){const m=S.p.mode;if(m==='rod')return this.rod(S);if(m==='tid')return this.tid(S);
 const[bl,br]=split(S,.6,{g:28,b:pad(S,26,26,40)});const o=S.gal[S.obs];const sc=Math.min(bl.w,bl.h)/9.5,cx=bl.l+bl.w/2,cy=bl.t+bl.h/2;S.geo={sc,cx,cy};frame(bl);
 X.save();X.beginPath();X.rect(bl.l,bl.t,bl.w,bl.h);X.clip();
 const H=.12;S.gal.forEach((g,i)=>{const dx=(g.x-o.x)*S.a,dy=(g.y-o.y)*S.a;const x=cx+dx*sc*.55,y=cy+dy*sc*.55;if(i!==S.obs){arr(x,y,x+dx*H*sc*1.6,y+dy*H*sc*1.6,A(C.red,.6),1.4,6)}
  X.save();X.translate(x,y);X.rotate(g.r);X.beginPath();X.ellipse(0,0,7*g.s,3.2*g.s,0,0,TAU);X.fillStyle=i===S.obs?C.yellow:A(C.fg,.85);X.fill();X.restore();glow(x,y,10*g.s,i===S.obs?C.yellow:C.purple,.25)});
 X.restore();T('du er her',cx,cy-16,{a:'center',s:11.5,c:C.yellow});
 const pts=S.gal.map((g,i)=>i===S.obs?null:[Math.hypot(g.x-o.x,g.y-o.y)*S.a,Math.hypot(g.x-o.x,g.y-o.y)*S.a*H]).filter(Boolean);const dm=Math.max(...pts.map(q=>q[0]))*1.05;
 const P=Plane(0,dm,0,dm*H*1.1,{l:br.l+34,t:br.t+10,w:br.w-34,h:br.h-50});P.grid(niceStep(dm/4),{sy:niceStep(dm*H/4),minor:false,alpha:.06});P.axes({xs:niceStep(dm/4),ys:niceStep(dm*H/4),x0:true,y0:true,xf:()=>'',yf:()=>'',xl:'avstand',yl:'fart bort',ls:13});lab({l:br.l,t:br.t+10},'Hubbles lov sett fra din galakse');
 P.fn(x=>x*H,A(C.red,.5),1.6,{prog:1,dash:[5,4]});pts.forEach(q=>dot(P.X(q[0]),P.Y(q[1]),4,C.red));T('v = H₀ · d',P.X(dm*.55),P.Y(dm*.55*H)-14,{s:13,f:'n',c:C.red})},
click(S,x,y){if(S.p.mode!=='utv'||!S.geo)return;const{sc,cx,cy}=S.geo,o=S.gal[S.obs];let best=-1,bd=20;S.gal.forEach((g,i)=>{const px=cx+(g.x-o.x)*S.a*sc*.55,py=cy+(g.y-o.y)*S.a*sc*.55;const d=Math.hypot(px-x,py-y);if(d<bd){bd=d;best=i}});if(best>=0)S.obs=best},
rod(S){const d=S.v.d,v=21.5*d,z=v/299792;const b=pad(S,30,30,40);const[t1,t2,t3]=rows(b,[.6,1,1],60);const L0=380,L1=800;const P=Plane(L0,L1,0,1,t2),Q=Plane(L0,L1,0,1,t3);
 const spec=(R,shift,lbl)=>{for(let x=R.l;x<R.l+R.w;x+=2){const l=R.x0+(x-R.l)/R.w*(R.x1-R.x0);const c=wl2rgb(l);rct(x,R.t,2.5,R.h,null,c)}lab({l:R.l,t:R.t},lbl);HL.forEach(([n,l])=>{const ls=l*(1+shift);if(ls<L1){const x=R.X(ls);rct(x-1.5,R.t,3,R.h,null,'#05070a');T(n,x,R.t+R.h+12,{a:'center',s:11,c:C.fg2})}})};
 spec(P,0,'Hydrogen målt i laboratoriet');spec(Q,z,`Hydrogen i lyset fra galaksen (z = ${nf(z,3)})`);
 HL.forEach(([n,l])=>{const ls=l*(1+z);if(ls<L1&&z>.002)arr(P.X(l),P.t+P.h+20,Q.X(ls),Q.t-4,A(C.red,.6),1.4,7)});
 const gx=t1.l+40,gy=t1.t+t1.h/2;X.save();X.translate(gx,gy);X.rotate(.4);X.beginPath();X.ellipse(0,0,26,10,0,0,TAU);X.fillStyle=mix(C.fg,C.red,clamp(z*4,0,.8));X.fill();X.restore();glow(gx,gy,30,mix(C.purple,C.red,clamp(z*4,0,1)),.4);
 T(`Avstand: ${nf(d,0)} millioner lysår`,gx+60,gy-10,{s:14,w:700,c:C.fg});T(`Fart bort fra oss: v = 21,5 · ${nf(d,0)} = ${nf(v,0)} km/s  (${nf(v/299792*100,1)} % av lysfarten)`,gx+60,gy+12,{f:'n',s:12.5,c:C.fg2})},
tid(S){const lt=S.v.lt,T_=Tof(lt);const b=pad(S,30,30,40);const[bl,br]=split(S,.42,{g:28,b});const st=lt<-5.5?0:lt<2.26?1:lt<13.08?2:lt<15.6?3:4;frame(bl);
 X.save();X.beginPath();X.rect(bl.l,bl.t,bl.w,bl.h);X.clip();const rg=rng(3);const n=st===0?260:st<=2?120:60;
 for(let i=0;i<n;i++){const x=bl.l+rg()*bl.w,y=bl.t+rg()*bl.h;if(st===0)dot(x,y,2,[C.red,C.green,C.blue][i%3]);else if(st===1)dot(x,y,3,i%7===0?C.fg2:C.red);else if(st===2){if(i%12===0){dot(x,y,4.2,C.gold);dot(x+3,y,4.2,C.gold)}else dot(x,y,3,C.red);if(i%2)dot(x+rg()*8-4,y+rg()*8-4,1.6,C.blue)}else if(st===3){circ(x,y,5,A(C.red,.5),null,1);dot(x,y,1.8,C.red)}else{}}
 if(st>=4){for(let g=0;g<14;g++){const x=bl.l+rg()*bl.w,y=bl.t+rg()*bl.h;glow(x,y,16,C.purple,.4);for(let k=0;k<20;k++){const a=k*.8,r=k*.7;dot(x+Math.cos(a)*r,y+Math.sin(a)*r*.6,1.4,C.fg)}}}
 const tr=st<3;for(let k=0;k<4;k++){let x=bl.l+10+k*bl.w/4,y=bl.t+20+rg()*bl.h*.6;X.beginPath();X.moveTo(x,y);for(let s=0;s<14;s++){if(tr){x+=rg()*16-4;y+=rg()*24-12}else{x+=bl.w/14}X.lineTo(x,y)}X.strokeStyle=A(C.yellow,.7);X.lineWidth=1.4;X.stroke()}
 X.restore();T(st<3?'Lyset spres hele tiden: universet er ugjennomsiktig':'Lyset går fritt: universet er gjennomsiktig',bl.l+6,bl.t+bl.h-10,{s:11.5,c:C.yellow,bg:A(C.stage,.7)});
 const[g1,g2]=rows(br,[1.3,1],40);const P=Plane(-6,17.64,0,13.5,{l:g1.l+40,t:g1.t,w:g1.w-40,h:g1.h});P.grid(2,{sy:2,minor:false,alpha:.06});P.axes({xs:4,ys:2,xAt:-6,x0:true,y0:true,xf:v=>'10'+sup(v)+' s',yf:v=>'10'+sup(v)+' K',ls:12});lab(g1,'Temperatur gjennom tiden (logaritmiske akser)');
 P.fn(x=>Math.log10(Tof(x)),C.red,2.4,{prog:1});EV.forEach(([x])=>ln(P.X(x),P.t,P.X(x),P.t+P.h,A(C.fg,.15),1,[2,4]));ln(P.X(lt),P.t,P.X(lt),P.t+P.h,C.yellow,1.6);dot(P.X(lt),P.Y(Math.log10(T_)),5,C.yellow);
 let ev=EV[0];EV.forEach(e=>{if(lt>=e[0]-.05)ev=e});let y=g2.t+6;T(tStr(lt)+' etter big bang',g2.l,y,{s:15,w:700,c:C.fg});y+=22;T('Temperatur: '+(T_>1e4?sci(T_,2):nf(T_,T_<10?1:0))+' K',g2.l,y,{f:'n',s:13,c:C.red});y+=22;Twrap(ev[1],g2.l,y,g2.w,{s:13,c:C.yellow})},
readout(S){const m=S.p.mode;if(m==='rod'){const v=21.5*S.p.d;return[['fart bort',nf(v,0)+' km/s'],['rødforskyvning z',nf(v/299792,3),'red'],['Hα målt ved',nf(656.3*(1+v/299792),1)+' nm']]}if(m==='tid')return[['tid',tStr(S.p.lt)],['temperatur',(Tof(S.p.lt)>1e4?sci(Tof(S.p.lt),2):nf(Tof(S.p.lt),1))+' K','red']];return[['galakser',S.gal.length],['utvidelse',nf(S.a,2)+' ×']]}
});
}

/* ---------- Programmer som modellerer naturfenomener ---------- */
{
const PR={avk:{n:'Kaffen kjøles ned',y:'T',u:'°C',code:['T = 90        # temperatur i °C','T_rom = 20','k = {k}       # per minutt','dt = {dt}       # tidssteg i minutter','t = 0','while t < 60:','    dT = -k * (T - T_rom) * dt','    T = T + dT','    t = t + dt'],
  init:p=>({T:90,T_rom:20,k:p.k,dt:p.dt,t:0}),cond:v=>v.t<60-1e-9,body:[v=>{v.dT=-v.k*(v.T-v.T_rom)*v.dt},v=>{v.T+=v.dT},v=>{v.t+=v.dt}],exact:(t,p)=>20+70*Math.exp(-p.k*t),tmax:60,ymax:100,kr:[.02,.3,.1]},
 hen:{n:'Radioaktivt henfall',y:'N',u:'kjerner',code:['N = 1000      # antall kjerner','k = {k}       # henfallskonstant per år','dt = {dt}','t = 0','while t < 30:','    dN = -k * N * dt','    N = N + dN','    t = t + dt'],
  init:p=>({N:1000,k:p.k,dt:p.dt,t:0}),cond:v=>v.t<30-1e-9,body:[v=>{v.dN=-v.k*v.N*v.dt},v=>{v.N+=v.dN},v=>{v.t+=v.dt}],exact:(t,p)=>1000*Math.exp(-p.k*t),tmax:30,ymax:1050,kr:[.02,.4,.12]},
 fall:{n:'Fallskjermhopper i fritt fall',y:'v',u:'m/s',code:['v = 0         # fart i m/s','g = 9.81','k = {k}       # luftmotstand per masse','dt = {dt}','t = 0','while t < 20:','    a = g - k * v**2','    v = v + a * dt','    t = t + dt'],
  kf:k=>k/100,init:p=>({v:0,g:9.81,k:p.k/100,dt:p.dt,t:0}),cond:v=>v.t<20-1e-9,body:[v=>{v.a=v.g-v.k*v.v*v.v},v=>{v.v+=v.a*v.dt},v=>{v.t+=v.dt}],exact:(t,p)=>{const vt=Math.sqrt(9.81/(p.k/100));return vt*Math.tanh(9.81*t/vt)},tmax:20,ymax:null,kr:[.1,1,.3],kl:'k · 100'},
 bakt:{n:'Bakterier i en skål',y:'N',u:'bakterier',code:['N = 10        # antall bakterier','r = {k}       # vekstrate per time','K = 1000      # bæreevne','dt = {dt}','t = 0','while t < 24:','    dN = r * N * (1 - N/K) * dt','    N = N + dN','    t = t + dt'],
  init:p=>({N:10,r:p.k,K:1000,dt:p.dt,t:0}),cond:v=>v.t<24-1e-9,body:[v=>{v.dN=v.r*v.N*(1-v.N/v.K)*v.dt},v=>{v.N+=v.dN},v=>{v.t+=v.dt}],exact:(t,p)=>1000/(1+99*Math.exp(-p.k*t)),tmax:24,ymax:1100,kr:[.1,1.2,.5]}};
const fmtc=(l,p,pr)=>l.replace('{k}',String(Math.round((pr.kf?pr.kf(p.k):p.k)*100000)/100000)).replace('{dt}',String(p.dt));
M({id:'na-programmering',s:'na',c:['NAT','FY1','2P'],title:'Programmering: modeller av naturfenomener',short:'Modellering med programmering',kw:'programmering python modell simulering løkke while variabel tidssteg euler avkjøling henfall fall bakterievekst algoritme',
lead:'Mange naturfenomener endrer seg litt for hvert lille tidssteg. Et program kan regne ut endringen om og om igjen i en løkke. Se programmet kjøre linje for linje, og sammenlign med den eksakte løsningen.',
hint:'Trykk «Ett steg» for å kjøre én linje av gangen.',
controls:[{id:'pr',type:'sel',label:'Fenomen',value:'avk',options:Object.entries(PR).map(([k,v])=>[k,v.n])},{id:'k',label:'Konstant k',min:.02,max:1.2,step:.01,value:.1,d:2},{id:'dt',type:'seg',label:'Tidssteg dt',value:'2',options:[['0.5','0,5'],['1','1'],['2','2'],['5','5']]},
 {id:'sp',label:'Linjer per sekund',min:1,max:40,step:1,value:6},{type:'btns',items:[['Ett steg',S=>MOD['na-programmering'].line(S)],['Kjør til slutt',S=>{for(let i=0;i<5000&&S.pc!=='done';i++)MOD['na-programmering'].line(S)}],['Start på nytt',S=>MOD['na-programmering'].reset(S)]]},{id:'run',type:'check',label:'Kjør automatisk',value:true}],
tex:['y_{\\text{ny}}=y+\\Delta y','\\Delta y=(\\text{endring per tid})\\cdot\\Delta t'],
about:['Programmet bruker en <strong>while-løkke</strong>: Så lenge betingelsen er sann, gjentas de innrykkede linjene. Hver runde regner det ut hvor mye størrelsen endrer seg i et lite tidssteg, legger det til, og flytter tiden fram.','Dette kalles <strong>Eulers metode</strong>. Den er ikke helt nøyaktig, fordi endringen regnes ut fra verdien i starten av hvert steg. Med mindre tidssteg blir svaret bedre, men programmet må kjøre flere runder.','Den stiplede kurven er den eksakte løsningen. Den finnes bare for enkle modeller. For mer kompliserte modeller, som klimamodeller, er programmering den eneste måten å regne på.','Tabellen viser hvilke verdier variablene har akkurat nå. Prøv å forutsi hva som skjer før du trykker på «Ett steg».'],
tasks:['Kjør kaffe-modellen med dt = 5 og dt = 0,5. Hvilken ligger nærmest den eksakte løsningen?','Hvorfor stopper programmet?','Endre k i fallskjermmodellen. Hva skjer med terminalfarten?','Skriv programmet selv i Python og la det skrive ut en tabell.'],
init(S){this.reset(S)},
change(S,id){if(id==='pr'){const r=PR[S.p.pr].kr;setP('k',r[2],S);S.v.k=r[2]}this.reset(S)},
reset(S){const pr=PR[S.p.pr],p={k:S.p.k,dt:+S.p.dt};S.vars=pr.init(p);S.pc='init';S.li=0;S.hist=[[0,S.vars[pr.y]]];S.acc=0;S.p0=p},
line(S){const pr=PR[S.p.pr];const ni=pr.code.indexOf(pr.code.find(l=>l.startsWith('while')));if(S.pc==='done')return;
 if(S.pc==='init'){S.li++;if(S.li>=ni){S.pc='cond';S.li=ni}return}
 if(S.pc==='cond'){if(pr.cond(S.vars)){S.pc='body';S.li=ni+1}else{S.pc='done';S.li=-1}return}
 if(S.pc==='body'){const j=S.li-ni-1;pr.body[j](S.vars);S.li++;if(j===pr.body.length-1){S.hist.push([S.vars.t,S.vars[pr.y]]);S.pc='cond';S.li=ni}}},
update(S,dt){if(S.p.run&&S.pc!=='done'){S.acc+=dt*S.p.sp;while(S.acc>=1){S.acc-=1;this.line(S)}}},
draw(S){const pr=PR[S.p.pr],p=S.p0,nw=!isWide(S);const[bl,br]=split(S,.47,{g:26,rv:.5,b:pad(S,26,26,40)});
 const code=pr.code.map(l=>{const c_=fmtc(l,p,pr);return nw?c_.split('#')[0].replace(/\s+$/,''):c_});const fs=nw?9.5:12,lh=nw?12:17.5;const ch=code.length*lh+16,cbw=nw?bl.w*.58:bl.w;rr(bl.l,bl.t,cbw,ch,5,A(C.fg,.12),A(C.fg,.04),1);lab(bl,'Python');
 code.forEach((l,i)=>{const y=bl.t+12+i*lh;if(i===S.li){rct(bl.l+2,y-lh/2,cbw-4,lh,null,A(C.yellow,.18));T('▶',bl.l+6,y,{s:fs,c:C.yellow})}const[c0,cm]=l.split('#');const kw_=/^(while)|^\s+/.test(c0)&&/while/.test(c0);T(c0,bl.l+20,y,{f:'n',s:fs,c:kw_?C.teal:C.fg});if(cm!==undefined)T('#'+cm,bl.l+20+tw(c0,{f:'n',s:fs}),y,{f:'n',s:fs,c:C.fg3})});
 let y=nw?bl.t+16:bl.t+ch+24;const vx=nw?bl.l+cbw+12:bl.l,vw=nw?bl.w-cbw-12:bl.w;lab({l:vx,t:y},'Variabler nå');y+=4;const shown=S.pc==='init'?new Set(code.slice(0,S.li).map(l=>(l.match(/^(\w+)\s*=/)||[])[1]).filter(Boolean)):null;const vs=Object.entries(S.vars).filter(([k])=>!shown||shown.has(k));const nc=nw?1:bl.w<420?2:3,cw=vw/nc;const fv=v=>Number.isInteger(Math.round(v*1e9)/1e9)?String(Math.round(v)):Math.abs(v)>=100?nf(v,1):nf(v,3);vs.forEach(([k,v],i)=>{const x=vx+(i%nc)*cw,yy=y+Math.floor(i/nc)*(fs+8);T(`${k} = ${fv(v)}`,x,yy,{f:'n',s:fs,c:k===pr.y?C.yellow:C.fg2})});
 if(S.pc==='done'&&!nw)T('Programmet er ferdig: betingelsen i while er ikke lenger sann.',bl.l,Math.min(bl.t+bl.h-6,y+Math.ceil(vs.length/nc)*(fs+8)+12),{s:fs+.5,c:C.green});
 const ym=pr.ymax||Math.max(...S.hist.map(h=>h[1]),pr.exact(pr.tmax,p))*1.15;const P=Plane(0,pr.tmax,0,ym,{l:br.l+40,t:br.t+8,w:br.w-40,h:br.h-30});P.grid(niceStep(pr.tmax/6),{sy:niceStep(ym/5),minor:false,alpha:.06});P.axes({xs:niceStep(pr.tmax/6),ys:niceStep(ym/5),x0:true,y0:true,xl:'t',yl:pr.y+' ('+pr.u+')',ls:13});lab({l:br.l,t:br.t+8},pr.n+': programmet mot eksakt løsning');
 P.fn(t=>pr.exact(t,p),A(C.fg,.5),1.6,{prog:1,dash:[5,4]});if(S.hist.length>1)pth(S.hist.map(h=>P.pt(h[0],h[1])),C.yellow,2.4);S.hist.forEach(h=>dot(P.X(h[0]),P.Y(h[1]),3,C.yellow));T('eksakt',P.X(pr.tmax*.8),P.Y(pr.exact(pr.tmax*.8,p))-10,{s:11,c:C.fg2})},
readout(S){const pr=PR[S.p.pr],p=S.p0;const v=S.vars;const ex=pr.exact(v.t,p);return[['runder i løkka',S.hist.length-1],['t',nf(v.t,1)],[pr.y+' (program)',nf(v[pr.y],2),'yellow'],[pr.y+' (eksakt)',nf(ex,2)],['avvik',nf(v[pr.y]-ex,2)]]}
});
}
