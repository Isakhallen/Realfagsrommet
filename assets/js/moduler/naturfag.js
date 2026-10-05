/* ================= NATURFAG ================= */

/* ---------- Drivhuseffekten og strålingsbalansen ---------- */
{
const SIG=5.67e-8,S0=1361;
const model=p=>{const Sin=S0/4,abs=Sin*(1-p.alb),Te=Math.pow(abs/SIG,.25),eps=clamp(.771+.05*Math.log2(p.co2/280),0,.98),Ts=Te*Math.pow(2/(2-eps),.25);return{Sin,abs,Te,eps,Ts,up:SIG*Ts**4,back:eps*SIG*Ts**4/2}};
M({id:'na-drivhus',s:'na',c:['NAT','FY1','GEO'],title:'Drivhuseffekten og jordas strålingsbalanse',short:'Drivhuseffekten',kw:'drivhuseffekt klima co2 strålingsbalanse albedo infrarød temperatur global oppvarming klimagass',
lead:'Sollys varmer bakken. Bakken sender ut infrarød stråling. Drivhusgasser fanger noe av den og sender den tilbake. Mer CO₂ gir en varmere overflate.',
controls:[{id:'co2',label:'CO₂ i lufta',min:180,max:1200,step:5,value:420,unit:'ppm'},{id:'alb',label:'Albedo (andel reflektert sollys)',min:.1,max:.6,step:.01,value:.3,d:2},{type:'btns',items:[['Førindustriell (280 ppm)',S=>setP('co2',280,S)],['I dag (ca. 420 ppm)',S=>setP('co2',420,S)],['Dobbelt (560 ppm)',S=>setP('co2',560,S)]]}],
tex:['\\text{inn}=\\frac{S_0}{4}(1-\\alpha)','\\text{ut}=\\sigma T^4','T_{\\text{uten drivhus}}=\\sqrt[4]{\\frac{S_0(1-\\alpha)}{4\\sigma}}\\approx 255\\ \\text{K}'],
about:['De <strong>gule</strong> bølgene er sollys. Noe reflekteres av skyer, is og snø (albedo). Resten varmer bakken.','Bakken sender ut <strong>infrarød</strong> stråling (rød). Drivhusgasser som CO₂ og vanndamp absorberer noe av den og sender den ut igjen i alle retninger, også ned mot bakken.','Uten drivhuseffekt ville gjennomsnittstemperaturen vært omtrent −18 °C. Modellen her er en forenklet ettlagsmodell. Den viser mekanismen, men ikke alle tilbakekoblinger i klimasystemet.','Is som smelter gir lavere albedo. Da tar jorda opp mer sollys, og det blir enda varmere. Det er en positiv tilbakekobling.'],
tasks:['Hvor mye øker temperaturen i modellen når CO₂ dobles fra 280 til 560 ppm?','Sett albedo til 0,6, som en jord dekket av is. Hva skjer?','Forklar hvorfor drivhusgasser slipper sollyset gjennom, men stopper infrarød stråling.','Finn ut hva CO₂-nivået var i 1850 og i dag. Hvor kommer økningen fra?'],
init(S){S.ph=[];S.acc=0;S.Ts=model(S.p).Ts;const r=rng(21);S.mol=[];for(let i=0;i<120;i++)S.mol.push([r(),r()])},
update(S,dt){const m=model(S.p);S.Ts=smooth(S.Ts,m.Ts,dt,1.2);S.acc+=dt*9;while(S.acc>=1){S.acc-=1;S.ph.push({x:rnd(.05,.95),y:0,vy:1,k:'sol'})}
 const ya=.36,yb=.56;S.ph.forEach(p=>{const y0=p.y;p.y+=p.vy*dt*.55;p.x+=(p.vx||0)*dt*.55;if(p.k==='sol'){if(p.vy>0&&p.y>=.92){if(Math.random()<S.p.alb){p.vy=-1}else{p.k='ir';p.vy=-1;p.vx=rnd(-.3,.3);p.y=.92}}if(p.vy<0&&p.y<0)p.dead=true}else{const mid=(ya+yb)/2;if((y0-mid)*(p.y-mid)<=0&&!p.hit&&Math.random()<m.eps){p.hit=true;p.vy=Math.random()<.5?1:-1;p.vx=rnd(-.4,.4);p.flash=S.t}if(p.y>=.92&&p.vy>0){p.vy=-1;p.hit=false;p.y=.92}if(p.y<0)p.dead=true}if(p.x<0||p.x>1)p.dead=true});S.ph=S.ph.filter(p=>!p.dead);if(S.ph.length>400)S.ph.splice(0,S.ph.length-400)},
draw(S){const m=model(S.p);const[bl,br]=split(S,.7,{g:26});const W=bl.w,H=bl.h,X0=bl.l,Y0=bl.t;const Y=v=>Y0+v*H,Xx=v=>X0+v*W;
 rct(X0,Y0,W,H*.36,null,A('#000000',.0));glow(Xx(.08),Y(.02),70,C.yellow,.6);dot(Xx(.08),Y(.02),18,C.yellow);
 const ya=.36,yb=.56;const g=X.createLinearGradient(0,Y(ya),0,Y(yb));g.addColorStop(0,A(C.blue,.03));g.addColorStop(.5,A(C.blue,.13+.12*clamp((S.p.co2-180)/1000,0,1)));g.addColorStop(1,A(C.blue,.03));X.fillStyle=g;X.fillRect(X0,Y(ya),W,Y(yb)-Y(ya));T('atmosfære med drivhusgasser',X0+W-6,Y(ya)+12,{a:'right',s:11.5,c:C.fg3});
 const nm=Math.round(S.p.co2/12);for(let i=0;i<Math.min(nm,S.mol.length);i++){const[u,v]=S.mol[i];const x=Xx(u),y=Y(ya+(yb-ya)*v);dot(x-3,y,1.8,C.red);dot(x,y,2.2,C.fg2);dot(x+3,y,1.8,C.red)}
 rct(X0,Y(.92),W,H*.08,null,'#2c3a24');ln(X0,Y(.92),X0+W,Y(.92),'#5b7a40',2);T('bakken',X0+6,Y(.96),{s:11.5,c:C.fg2});
 S.ph.forEach(p=>{const x=Xx(p.x),y=Y(p.y),L=16,dir=p.vy>0?1:-1,vx=(p.vx||0);const c=p.k==='sol'?C.yellow:C.red;wig(x-vx*L,y-dir*L,x,y,p.k==='sol'?5:11,p.k==='sol'?2.5:3.5,A(c,.9),1.6);if(p.flash&&S.t-p.flash<.3)glow(x,y,10,C.red,.6)});
 const tC=S.Ts-273.15;const tx=br.l+24,ty=br.t+20,th=br.h*.55;rr(tx-7,ty,14,th,7,A(C.fg,.5),null,1.5);const fr=clamp((tC+30)/60,0,1);rr(tx-4,ty+th*(1-fr),8,th*fr,4,null,ramp([C.blue,C.yellow,C.red],fr));circ(tx,ty+th+10,12,null,ramp([C.blue,C.yellow,C.red],fr));for(let c=-30;c<=30;c+=10){const y=ty+th*(1-(c+30)/60);ln(tx+8,y,tx+13,y,C.fg3,1);T(nf(c,0)+' °C',tx+18,y,{f:'n',s:10,c:C.fg3})}
 T(`${nf(tC,1)} °C`,tx+60,ty+th*(1-fr),{f:'n',s:18,c:C.fg,w:500});
 infoBox(br.l,ty+th+34,[[`fra sola: ${nf(m.Sin,0)} W/m²`,C.yellow],[`reflektert: ${nf(m.Sin*S.p.alb,0)} W/m²`,C.yellow],[`fra bakken: ${nf(SIG*S.Ts**4,0)} W/m²`,C.red],[`tilbake fra lufta: ${nf(m.eps*SIG*S.Ts**4/2,0)} W/m²`,C.red]],{s:11.5})},
readout(S){const m=model(S.p);return[['T overflate',nf(m.Ts-273.15,1)+' °C','red'],['uten drivhuseffekt',nf(m.Te-273.15,1)+' °C','blue'],['ε (absorbert IR)',nf(m.eps,3)]]}
});
}

/* ---------- Det elektromagnetiske spekteret ---------- */
{
const REG=[[1e-14,1e-11,'gammastråling','#b189c6'],[1e-11,1e-8,'røntgenstråling','#8fa0e8'],[1e-8,3.8e-7,'ultrafiolett (UV)','#7b5fd6'],[3.8e-7,7.5e-7,'synlig lys',null],[7.5e-7,1e-3,'infrarød (IR)','#e0523f'],[1e-3,1,'mikrobølger','#f0ac5f'],[1,1e4,'radiobølger','#83c167']];
const EXM=[[3e-12,'gammastråling fra radioaktive kjerner'],[5e-11,'røntgenbilde hos tannlegen'],[2.5e-7,'UV-C som dreper bakterier'],[3e-7,'UV-B som gir solbrenthet'],[5.5e-7,'grønt lys'],[1e-5,'varmestråling fra kroppen'],[.122,'mikrobølgeovn (2,45 GHz)'],[.33,'mobilnett (900 MHz)'],[3,'FM-radio (100 MHz)'],[300,'langbølgeradio']];
const reg=l=>REG.find(r=>l>=r[0]&&l<r[1])||REG[REG.length-1];
M({id:'na-spekter',s:'na',c:['NAT','FY1'],title:'Det elektromagnetiske spekteret',short:'Elektromagnetisk spekter',kw:'elektromagnetisk stråling bølgelengde frekvens fotonenergi ioniserende stråling uv røntgen mikrobølger radio synlig lys',
lead:'Radiobølger, lys og røntgenstråling er samme type bølger med ulik bølgelengde. Kortere bølgelengde betyr høyere frekvens og mer energi per foton.',
controls:[{id:'l',label:'Bølgelengde <i>λ</i>',min:1e-13,max:1e3,log:true,value:5.5e-7,fmt:v=>lamFmt(v)}],
tex:['c=f\\cdot\\lambda,\\qquad c=3{,}00\\cdot10^8\\ \\text{m/s}','E=hf=\\frac{hc}{\\lambda},\\qquad h=6{,}63\\cdot10^{-34}\\ \\text{J·s}'],
about:['Alle elektromagnetiske bølger går med lysfarten i vakuum. Bølgelengde og frekvens henger sammen: $c=f\\lambda$.','Hvert foton har energien $E=hf$. Fotoner med mer enn omtrent 10 eV kan slå elektroner løs fra atomer. Det kalles <strong>ioniserende stråling</strong>. Den kan skade DNA.','Synlig lys er bare en liten del av spekteret, fra omtrent 380 nm (fiolett) til 750 nm (rødt).','Mikrobølger og radiobølger er ikke ioniserende. De kan bare varme opp stoffer.'],
tasks:['Regn ut frekvensen til grønt lys med bølgelengde 550 nm.','Hvorfor kan UV-stråling gi hudkreft, mens radiobølger ikke kan det?','Hvilken bølgelengde har mobilnettet på 900 MHz?','Hvor mange ganger mer energi har et røntgenfoton (0,1 nm) enn et foton av synlig lys (500 nm)?'],
draw(S){const l=S.v.l;const b=pad(S,26,24,30);const[b1,b2,b3]=rows(b,[1.1,1.3,1],34);const lx=v=>b1.l+(Math.log10(v)+14)/(4+14)*b1.w;
 REG.forEach(([a,c,n,col])=>{const x1=lx(Math.max(a,1e-14)),x2=lx(Math.min(c,1e4));if(!col){for(let k=0;k<=40;k++){const w=380+k*9.25;rct(x1+(x2-x1)*k/41,b1.t+18,(x2-x1)/41+1,b1.h-36,null,wl2rgb(w,.95))}}else rct(x1,b1.t+18,x2-x1,b1.h-36,null,A(col,.55));if(x2-x1>tw(n,{s:12})+8)T(n,(x1+x2)/2,b1.t+6,{a:'center',s:12,c:col||C.fg})});
 [-12,-9,-6,-3,0,3].forEach(e=>{const x=lx(Math.pow(10,e));ln(x,b1.t+b1.h-18,x,b1.t+b1.h-12,C.fg3,1);T(lamFmt(Math.pow(10,e)),x,b1.t+b1.h-3,{a:'center',f:'n',s:10.5,c:C.fg3})});
 const mx=lx(l);poly([[mx,b1.t+16],[mx-8,b1.t+4],[mx+8,b1.t+4]],null,C.fg);ln(mx,b1.t+16,mx,b1.t+b1.h-18,C.fg,2.5);
 const R=reg(l);const col=R[3]?R[3]:wl2rgb(l*1e9);const cyc=clamp(30-(Math.log10(l)+12)*1.9,1.3,30);X.beginPath();for(let i=0;i<=600;i++){const x=b2.l+b2.w*i/600,y=b2.t+b2.h/2+Math.sin(i/600*cyc*TAU+S.t*3)*b2.h*.36;i?X.lineTo(x,y):X.moveTo(x,y)}X.strokeStyle=col;X.lineWidth=2.6;X.stroke();T(`${R[2]}  ·  λ = ${lamFmt(l)}`,b2.l,b2.t-4,{s:14,c:C.fg});
 const ex=EXM.reduce((a,e)=>Math.abs(Math.log10(e[0]/l))<Math.abs(Math.log10(a[0]/l))?e:a);T('Eksempel: '+ex[1],b2.l+b2.w,b2.t-4,{a:'right',s:12.5,c:C.fg2});
 const E=1239.84e-9/l;const ex_=v=>b3.l+(Math.log10(v)+9)/(9+9)*b3.w;rct(ex_(10),b3.t+16,b3.l+b3.w-ex_(10),b3.h-30,null,A(C.red,.18));T('ioniserende (over ca. 10 eV)',ex_(10)+6,b3.t+8,{s:11.5,c:C.red});ln(b3.l,b3.t+b3.h-14,b3.l+b3.w,b3.t+b3.h-14,A(C.fg,.5),1.2);
 [-9,-6,-3,0,3,6,9].forEach(e=>{const x=ex_(Math.pow(10,e));ln(x,b3.t+b3.h-18,x,b3.t+b3.h-10,C.fg3,1);T('10'+sup(e)+' eV',x,b3.t+b3.h+2,{a:'center',f:'n',s:10.5,c:C.fg3})});const ep=ex_(clamp(E,1e-9,1e9));dot(ep,b3.t+b3.h-14,7,E>10?C.red:C.green);T(`fotonenergi ${nfs(E,3)} eV`,ep,b3.t+b3.h-30,{a:ep>b3.l+b3.w*.8?'right':'center',f:'n',s:12,c:C.fg,bg:A(C.stage,.8)})},
readout(S){const l=S.p.l,f=2.998e8/l,E=1239.84e-9/l;return[['λ',lamFmt(l)],['f',hzFmt(f)],['E',nfs(E,3)+' eV'],['E',sci(E*1.602e-19,3)+' J'],['type',reg(l)[2]],['ioniserende',E>10?'ja':'nei',E>10?'red':'green']]}
});
function lamFmt(v){if(v>=1)return nfs(v,3)+' m';if(v>=1e-3)return nfs(v*1e3,3)+' mm';if(v>=1e-6)return nfs(v*1e6,3)+' µm';if(v>=1e-9)return nfs(v*1e9,3)+' nm';return nfs(v*1e12,3)+' pm'}
function hzFmt(f){const u=[[1e18,'EHz'],[1e15,'PHz'],[1e12,'THz'],[1e9,'GHz'],[1e6,'MHz'],[1e3,'kHz']];for(const[k,n]of u)if(f>=k)return nfs(f/k,3)+' '+n;return nfs(f,3)+' Hz'}
}

/* ---------- Energiomforming og virkningsgrad ---------- */
{
const SYS={glod:['Glødepære','Elektrisk energi',[['Lys',5,1],['Varme',95,0]]],led:['LED-pære','Elektrisk energi',[['Lys',40,1],['Varme',60,0]]],bensin:['Bensinbil','Kjemisk energi i bensin',[['Bevegelsesenergi',25,1],['Varme i motor og eksos',70,0],['Friksjon og lyd',5,0]]],elbil:['Elbil','Elektrisk energi i batteriet',[['Bevegelsesenergi',80,1],['Varme i motor og batteri',15,0],['Friksjon og lyd',5,0]]],vann:['Vannkraftverk','Potensiell energi i vannet',[['Elektrisk energi',90,1],['Varme og friksjon',10,0]]],gass:['Gasskraftverk','Kjemisk energi i naturgass',[['Elektrisk energi',55,1],['Spillvarme',45,0]]],sol:['Solcellepanel','Strålingsenergi fra sola',[['Elektrisk energi',20,1],['Varme og refleksjon',80,0]]]};
M({id:'na-energi',s:'na',c:['NAT','FY1'],title:'Energiomforming og virkningsgrad',short:'Virkningsgrad',kw:'energi energiomforming virkningsgrad energikvalitet energikilder fornybar kraftverk varmetap bevaring',
lead:'Energi blir aldri borte, men den går over til former vi ikke kan bruke, oftest varme. Virkningsgraden er andelen som blir til den energiformen vi ønsker.',
controls:[{id:'sys',type:'seg',label:'System',value:'bensin',options:Object.entries(SYS).map(([k,v])=>[k,v[0]])},{id:'E',label:'Tilført energi',min:1,max:100,step:1,value:10,unit:'kWh'}],
tex:['\\eta=\\frac{\\text{nyttig energi}}{\\text{tilført energi}}\\cdot100\\,\\%','E_{\\text{inn}}=E_{\\text{nyttig}}+E_{\\text{tap}}'],
about:['Bredden på strømmene er proporsjonal med energimengden. Grønne strømmer er nyttig energi, røde er tap.','Energi av høy kvalitet, som elektrisk energi og bevegelse, kan lett gjøres om til andre former. Varme ved lav temperatur har lav kvalitet. Den er spredt og vanskelig å bruke.','Tallene er omtrentlige verdier for vanlige systemer i dag.'],
tasks:['Hvor mye av energien i bensinen går til å flytte bilen?','Sammenlign glødepære og LED: hvor mye strøm sparer du på å bytte?','Hvorfor regner vi vannkraft som en energikilde av høy kvalitet?','Kan virkningsgraden noen gang bli over 100 %? Begrunn.'],
draw(S){const[name,inn,outs]=SYS[S.p.sys];const E=S.p.E;const b=pad(S,30,24,26);const wide=isWide(S);const lw=wide?b.w*.62:b.w*.5,H0=b.h*.66,x0=b.l+10,x1=b.l+lw,gap=18;const y0=b.t+(b.h-H0)/2;
 rct(x0,y0,14,H0,null,C.blue);T(inn,x0,y0-12,{s:13,c:C.blue});T(nf(E,1)+' kWh',x0,y0+H0+16,{f:'n',s:12,c:C.fg2});
 const tot=outs.length,usable=H0;let yin=y0;let yout=y0-gap*(tot-1)/2;outs.forEach(([n,pc,good],i)=>{const h=usable*pc/100;const col=good?C.green:C.red;const a1=yin,a2=yin+h,b1=yout,b2=yout+h;X.beginPath();X.moveTo(x0+14,a1);X.bezierCurveTo((x0+x1)/2,a1,(x0+x1)/2,b1,x1,b1);X.lineTo(x1,b2);X.bezierCurveTo((x0+x1)/2,b2,(x0+x1)/2,a2,x0+14,a2);X.closePath();X.fillStyle=A(col,.35);X.fill();rct(x1,b1,10,h,null,col);
  const np=Math.max(1,Math.round(pc/5));for(let k=0;k<np*3;k++){const u=((S.t*.25+k/(np*3))%1);const ym=lerp(a1,a2,(k%np+.5)/np),ye=lerp(b1,b2,(k%np+.5)/np);const t=u,mt=1-t;const px=mt**3*(x0+14)+3*mt*mt*t*(x0+x1)/2+3*mt*t*t*(x0+x1)/2+t**3*x1,py=mt**3*ym+3*mt*mt*t*ym+3*mt*t*t*ye+t**3*ye;dot(px,py,2,A(col,.9))}
  T(n,x1+18,b1+h/2-8,{s:13.5,c:good?C.green:C.red});T(`${pc} %  ·  ${nf(E*pc/100,1)} kWh`,x1+18,b1+h/2+10,{f:'n',s:12,c:C.fg2});yin+=h;yout+=h+gap});
 const eta=outs.filter(o=>o[2]).reduce((a,o)=>a+o[1],0);T(name,b.l+b.w,b.t+8,{a:'right',f:'d',s:22,w:500});T(`virkningsgrad η = ${eta} %`,b.l+b.w,b.t+36,{a:'right',f:'n',s:14,c:C.yellow})},
readout(S){const[name,inn,outs]=SYS[S.p.sys];const eta=outs.filter(o=>o[2]).reduce((a,o)=>a+o[1],0);return[['η',eta+' %','yellow'],['nyttig',nf(S.p.E*eta/100,1)+' kWh','green'],['tap',nf(S.p.E*(100-eta)/100,1)+' kWh','red']]}
});
}

/* ---------- Radioaktivitet og halveringstid ---------- */
{
const ISO={C14:['Karbon-14','β⁻',5730,'år'],I131:['Jod-131','β⁻',8.02,'døgn'],Cs137:['Cesium-137','β⁻',30.1,'år'],Rn222:['Radon-222','α',3.82,'døgn']};const TH=3;
M({id:'na-halvering',s:'na',c:['NAT','FY1'],title:'Radioaktivt henfall og halveringstid',short:'Halveringstid',kw:'radioaktivitet halveringstid henfall alfa beta gamma isotop karbondatering stråling aktivitet',
lead:'Vi kan aldri vite når én bestemt kjerne henfaller. Men for mange kjerner er det helt forutsigbart: etter én halveringstid er halvparten igjen.',
controls:[{id:'iso',type:'seg',label:'Isotop',value:'C14',options:Object.entries(ISO).map(([k,v])=>[k,v[0]])},{id:'sp',label:'Fart',min:.2,max:3,step:.1,value:1},{type:'btns',items:[['Ny prøve',S=>MOD['na-halvering'].init(S)]]}],
tex:['N=N_0\\cdot\\left(\\tfrac12\\right)^{t/T_{1/2}}','A=\\lambda N,\\qquad \\lambda=\\frac{\\ln 2}{T_{1/2}}'],
about:['Hvert lite kvadrat er en kjerne. Hver kjerne har like stor sjanse til å henfalle i hvert tidsrom, uansett hvor lenge den har eksistert.','Den gule kurven er den teoretiske modellen. De hvite punktene er tellingen. Med få kjerner blir avviket fra kurven stort.','Karbon-14 brukes til å datere organisk materiale. Når en organisme dør, slutter den å ta opp nytt karbon, og mengden C-14 halveres hvert 5730. år.','Jod-131 kan slippes ut ved atomulykker. Det samles i skjoldbruskkjertelen. Derfor deles det ut jodtabletter.'],
tasks:['Hvor mange halveringstider tar det før under 1 % er igjen?','Et bein har 25 % av den opprinnelige mengden C-14. Hvor gammelt er det?','Hvorfor er det tryggere å lagre radioaktivt avfall med kort halveringstid?','Kjør flere prøver. Hvorfor blir tellingen litt ulik hver gang?'],
init(S){S.at=new Array(400).fill(0);S.tt=0;S.hist=[[0,400]];S.fl=[]},change(S,id){if(id==='iso')this.init(S)},
update(S,dt){const d=dt*S.p.sp;S.tt+=d;const p=1-Math.pow(.5,d/TH);for(let i=0;i<400;i++)if(!S.at[i]&&Math.random()<p){S.at[i]=S.tt;S.fl.push([i,S.tt])}S.fl=S.fl.filter(f=>S.tt-f[1]<.6);const n=S.at.filter(x=>!x).length;if(S.tt-S.hist[S.hist.length-1][0]>.1)S.hist.push([S.tt,n]);if(S.tt>TH*6.5)this.init(S)},
draw(S){const I=ISO[S.p.iso];const[bl,br]=split(S,.42,{g:30});const sz=Math.min(bl.w,bl.h-50),cs=sz/20,x0=bl.l+(bl.w-sz)/2,y0=bl.t+10;
 for(let i=0;i<400;i++){const x=x0+(i%20)*cs,y=y0+Math.floor(i/20)*cs;rr(x+1,y+1,cs-2,cs-2,2,null,S.at[i]?A(C.fg,.12):C.gold)}
 S.fl.forEach(([i,t0])=>{const x=x0+(i%20+.5)*cs,y=y0+(Math.floor(i/20)+.5)*cs,u=(S.tt-t0)/.6;glow(x,y,cs*1.6,C.yellow,(1-u)*.7);const a=i*2.4;dot(x+Math.cos(a)*u*cs*3,y+Math.sin(a)*u*cs*3,2,I[1]==='α'?C.red:C.blue)});
 const n=S.at.filter(x=>!x).length;T(`${n} kjerner igjen`,x0,y0+sz+18,{f:'n',s:13,c:C.gold});T(`${I[0]} sender ut ${I[1]}-stråling`,x0,y0+sz+38,{s:12,c:C.fg3});
 const P=Plane(0,6.5,0,420,{l:br.l+34,t:br.t+6,w:br.w-34,h:br.h-30});P.grid(1,{sy:100,minor:false,alpha:.1});P.axes({xs:1,ys:100,xl:'antall halveringstider',yl:'N',ls:13,x0:true});
 for(let k=1;k<=4;k++){const yv=400/2**k;ln(P.X(0),P.Y(yv),P.X(k),P.Y(yv),A(C.fg,.25),1,[3,4]);ln(P.X(k),P.Y(yv),P.X(k),P.Y(0),A(C.fg,.25),1,[3,4]);if(k>=3)T(String(400/2**k),P.X(0)-6,P.Y(yv),{a:'right',f:'n',s:10,c:C.fg3})}
 P.fn(x=>400*Math.pow(.5,x),C.yellow,2.6);S.hist.forEach(([t,nn])=>dot(P.X(t/TH),P.Y(nn),2.4,C.fg));
 const real=S.tt/TH*I[2];T(`t = ${nf(real,real<10?2:0)} ${I[3]}`,P.l+P.w,P.t+10,{a:'right',f:'n',s:14,c:C.fg,bg:A(C.stage,.8)})},
readout(S){const I=ISO[S.p.iso],n=S.at.filter(x=>!x).length;return[['N',n,'gold'],['halveringstid',nf(I[2],I[2]<10?2:0)+' '+I[3]],['tid',nf(S.tt/TH*I[2],I[2]<10?2:0)+' '+I[3]],['halveringstider',nf(S.tt/TH,2)]]}
});
}

/* ---------- Arv: Punnett-kvadrat ---------- */
{
const pheno=(mode,g)=>{if(mode==='auto')return g.includes('A')?'gul':'grønn';const fem=!g.includes('Y');const n=(g.match(/a/g)||[]).length;if(fem)return n===2?'fargeblind jente':n===1?'bærer (jente)':'normalt fargesyn (jente)';return n?'fargeblind gutt':'normalt fargesyn (gutt)'};
const parse=(mode,s)=>mode==='auto'?[s[0],s[1]]:s==='XAXA'?['Xᴬ','Xᴬ']:s==='XAXa'?['Xᴬ','Xᵃ']:s==='XaXa'?['Xᵃ','Xᵃ']:s==='XAY'?['Xᴬ','Y']:['Xᵃ','Y'];
const sortG=(a,b)=>{const o=x=>x==='A'||x==='Xᴬ'?0:x==='a'||x==='Xᵃ'?1:2;return o(a)<=o(b)?a+b:b+a};
M({id:'na-arv',s:'na',c:['NAT','BI2'],title:'Arv og Punnett-kvadrat',short:'Arv',kw:'arv gen allel dominant recessiv genotype fenotype punnett kjønnsbundet fargeblindhet mendel heterozygot homozygot',
lead:'Hvert barn får ett allel fra mor og ett fra far. Punnett-kvadratet viser alle mulige kombinasjoner og hvor sannsynlige de er.',
controls:[{id:'mode',type:'seg',label:'Type arv',value:'auto',options:[['auto','Vanlig (autosomal)'],['kjonn','Kjønnsbundet']]},{id:'m1',type:'seg',label:'Mor',value:'Aa',options:[['AA','AA'],['Aa','Aa'],['aa','aa']],show:S=>S.p.mode==='auto'},{id:'f1',type:'seg',label:'Far',value:'Aa',options:[['AA','AA'],['Aa','Aa'],['aa','aa']],show:S=>S.p.mode==='auto'},{id:'m2',type:'seg',label:'Mor',value:'XAXa',options:[['XAXA','XᴬXᴬ'],['XAXa','XᴬXᵃ'],['XaXa','XᵃXᵃ']],show:S=>S.p.mode==='kjonn'},{id:'f2',type:'seg',label:'Far',value:'XAY',options:[['XAY','XᴬY'],['XaY','XᵃY']],show:S=>S.p.mode==='kjonn'},{type:'btns',items:[['Få 100 barn',S=>{MOD['na-arv'].kids(S,100)}],['Nullstill',S=>{S.cnt={};S.n=0}]]}],
tex:['P(\\text{aa})=P(\\text{a fra mor})\\cdot P(\\text{a fra far})=\\tfrac12\\cdot\\tfrac12=\\tfrac14'],
about:['<strong>Vanlig arv:</strong> Hos erter er allelet for gul farge (A) dominant over grønn (a). En plante med Aa er gul, men kan få grønne avkom.','<strong>Kjønnsbundet arv:</strong> Genet for rød-grønn fargeblindhet sitter på X-kromosomet. Gutter har bare ett X, så de blir fargeblinde hvis det X-et har allelet. Derfor er det mye vanligere hos gutter.','Kvadratet viser sannsynligheter. Søylene viser hva som skjer i en tilfeldig gruppe barn. Med få barn kan resultatet avvike mye.'],
tasks:['To gule erteplanter får et grønt avkom. Hvilken genotype har foreldrene?','Hvorfor kan en gutt ikke arve fargeblindhet fra faren sin?','En mor er bærer og far har normalt fargesyn. Hvor stor er sjansen for at en sønn blir fargeblind?','Hva er forskjellen på genotype og fenotype?'],
init(S){S.cnt={};S.n=0;S.ph=0},change(S){this.init(S)},
gens(S){const mode=S.p.mode;const mo=parse(mode,mode==='auto'?S.p.m1:S.p.m2),fa=parse(mode,mode==='auto'?S.p.f1:S.p.f2);return{mode,mo,fa}},
kids(S,k){const{mode,mo,fa}=this.gens(S);for(let i=0;i<k;i++){const g=sortG(choice(mo),choice(fa));const p=pheno(mode,g);S.cnt[p]=(S.cnt[p]||0)+1;S.n++}},
update(S,dt){S.ph+=dt},
draw(S){const{mode,mo,fa}=this.gens(S);const[bl,br]=split(S,.56,{g:30});const cs=Math.min(bl.w/3.2,bl.h/3.6),x0=bl.l+(bl.w-cs*2)/2+cs*.4,y0=bl.t+cs*1.1;const ph=S.ph%7;
 T('Mor',x0-cs*.55,y0-cs*.62,{a:'center',s:12,c:C.pink});T('Far',x0+cs,y0-cs*.95,{a:'center',s:12,c:C.blue});
 const e=ease(clamp(ph/1,0,1));fa.forEach((a,j)=>{T(a,x0+cs*(j+.5),lerp(y0-cs*1.2,y0-cs*.35,e),{a:'center',f:'d',s:cs*.3,c:C.blue})});mo.forEach((a,i)=>{T(a,lerp(x0-cs*1.2,x0-cs*.35,e),y0+cs*(i+.5),{a:'center',f:'d',s:cs*.3,c:C.pink})});
 for(let i=0;i<2;i++)for(let j=0;j<2;j++){const k=i*2+j;const t=clamp((ph-1-k*.5)/.5,0,1);const x=x0+j*cs,y=y0+i*cs;rr(x+2,y+2,cs-4,cs-4,5,A(C.fg,.3),A(C.fg,.03),1.2);if(t<=0)continue;const g=sortG(mo[i],fa[j]);const p=pheno(mode,g);X.globalAlpha=t;
  if(mode==='auto'){sphere(x+cs/2,y+cs*.42,cs*.2,p==='gul'?'#e6c84a':'#6fae4c')}else{const fb=p.startsWith('fargeblind');const car=p.startsWith('bærer');circ(x+cs/2,y+cs*.42,cs*.18,fb?C.red:car?C.gold:C.green,null,3);T(g.includes('Y')?'gutt':'jente',x+cs/2,y+cs*.42,{a:'center',s:cs*.11,c:C.fg2})}
  T(g,x+cs/2,y+cs*.8,{a:'center',f:'d',s:cs*.18,c:C.fg});X.globalAlpha=1}
 const exp={};for(const a of mo)for(const b of fa){const p=pheno(mode,sortG(a,b));exp[p]=(exp[p]||0)+.25}const keys=Object.keys(exp).concat(Object.keys(S.cnt).filter(k=>!(k in exp)));
 lab({l:br.l,t:br.t+24},'Fenotyper: forventet og observert');const bh=Math.min(34,(br.h-80)/Math.max(keys.length,1)/1.6);keys.forEach((k,i)=>{const y=br.t+40+i*bh*1.7;const w=br.w-10;const e_=exp[k]||0,o=S.n?(S.cnt[k]||0)/S.n:0;rct(br.l,y,w*o,bh*.55,null,A(C.blue,.75));rct(br.l,y,w*e_,bh*.55,C.yellow,null,1.5);T(`${k}: ${nf(e_*100,0)} %`+(S.n?` (fikk ${S.cnt[k]||0})`:''),br.l,y+bh*.55+11,{s:12,c:C.fg2})});
 T(S.n?`${S.n} barn`:'Trykk «Få 100 barn» for å teste',br.l,br.t+br.h-6,{s:12,c:C.fg3})},
readout(S){const{mode,mo,fa}=this.gens(S);const exp={};for(const a of mo)for(const b of fa){const p=pheno(mode,sortG(a,b));exp[p]=(exp[p]||0)+1}return Object.entries(exp).map(([k,v])=>[k,v+' av 4'])}
});
}

/* ---------- Fra DNA til protein ---------- */
{
const B='UCAG';const AA='FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const AA3={F:'Phe',L:'Leu',S:'Ser',Y:'Tyr','*':'Stopp',C:'Cys',W:'Trp',P:'Pro',H:'His',Q:'Gln',R:'Arg',I:'Ile',M:'Met',T:'Thr',N:'Asn',K:'Lys',V:'Val',A:'Ala',D:'Asp',E:'Glu',G:'Gly'};
const cod=c=>AA[B.indexOf(c[0])*16+B.indexOf(c[1])*4+B.indexOf(c[2])];
const comp={A:'T',T:'A',G:'C',C:'G'};const BC=()=>({A:C.green,T:C.red,U:C.pink,G:C.yellow,C:C.blue});
function gene(){let s='ATG';for(let i=0;i<7;i++){let c;do{c=[0,1,2].map(()=>'ATGC'[Math.floor(Math.random()*4)]).join('')}while(cod(c.replace(/T/g,'U'))==='*');s+=c}return s+choice(['TAA','TAG','TGA'])}
M({id:'na-dna',s:'na',c:['NAT','BI2'],warm:420,title:'Fra DNA til protein',short:'DNA og proteiner',kw:'dna rna gen protein transkripsjon translasjon kodon aminosyre mutasjon ribosom genteknologi bioteknologi',
lead:'Et gen er en oppskrift. Først kopieres DNA til mRNA (transkripsjon). Så leser ribosomet mRNA tre baser om gangen og setter sammen aminosyrer til et protein (translasjon).',
controls:[{id:'sp',label:'Fart',min:.3,max:3,step:.1,value:1},{type:'btns',items:[['Nytt gen',S=>MOD['na-dna'].init(S)],['Punktmutasjon',S=>MOD['na-dna'].mut(S)],['Tilbake til originalen',S=>{S.g=S.g0;S.mi=-1;S.mt='';S.tt=0}]]}],
tex:['\\text{DNA}\\xrightarrow{\\text{transkripsjon}}\\text{mRNA}\\xrightarrow{\\text{translasjon}}\\text{protein}','\\text{A–T, G–C (DNA)},\\qquad \\text{A–U, G–C (RNA)}'],
about:['DNA har fire baser: A, T, G og C. A passer med T og G passer med C. I RNA er T byttet ut med U.','Tre baser i mRNA kalles et <strong>kodon</strong>. Hvert kodon står for én aminosyre eller for stopp. Startkodonet AUG gir alltid metionin (Met).','En <strong>mutasjon</strong> endrer en base. Den kan være stille (samme aminosyre), endre aminosyren, eller gi et stoppkodon slik at proteinet blir for kort.'],
tasks:['Lag mutasjoner til du finner en stille mutasjon. Hvorfor kan en mutasjon være stille?','Hvilket mRNA-kodon gir aminosyren tryptofan (Trp)? Bruk kodontabellen i læreboka.','Hva skjer med proteinet hvis en mutasjon lager et stoppkodon tidlig i genet?','Hvordan kan gensaksa CRISPR brukes til å reparere en mutasjon?'],
init(S){S.g=gene();S.g0=S.g;S.mi=-1;S.mt='';S.tt=0},
mut(S){const i=3+Math.floor(Math.random()*(S.g.length-6));let nb;do{nb='ATGC'[Math.floor(Math.random()*4)]}while(nb===S.g[i]);const old=S.g0;const g=S.g0.slice(0,i)+nb+S.g0.slice(i+1);S.g=g;S.mi=i;const k=Math.floor(i/3),c0=cod(old.slice(k*3,k*3+3).replace(/T/g,'U')),c1=cod(g.slice(k*3,k*3+3).replace(/T/g,'U'));S.mt=c0===c1?'stille mutasjon':c1==='*'?'nonsensmutasjon: stoppkodon!':'feilsensmutasjon: '+AA3[c0]+' → '+AA3[c1];S.tt=0},
update(S,dt){S.tt+=dt*S.p.sp;if(S.tt>19)S.tt=0},
draw(S){const g=S.g,n=g.length,m=g.replace(/T/g,'U');const b=pad(S,24,30,24);const bw=Math.min(30,b.w/(n+1));const x0=b.l+(b.w-bw*n)/2;const col=BC();const fs=Math.max(10,bw*.55);
 const yC=b.t+20,yT=yC+bw*1.5,yM=b.t+b.h*.52,yP=b.t+b.h*.82;const tT=clamp(S.tt/7,0,1),tL=clamp((S.tt-7.5)/9,0,1);
 T("DNA (kodende tråd 5′→3′)",x0,yC-18,{s:11.5,c:C.fg3});T('DNA (maltråd)',x0,yT+bw*.9+8,{s:11.5,c:C.fg3});
 for(let i=0;i<n;i++){const x=x0+i*bw+bw/2;const open=Math.abs(i-tT*n)<3&&tT<1?6:0;ln(x,yC+bw*.35-open,x,yT-bw*.35+open,A(C.fg,.2),1.5);rr(x-bw*.42,yC-bw*.4-open,bw*.84,bw*.8,3,null,A(col[g[i]],i===S.mi?1:.75));T(g[i],x,yC-open,{a:'center',f:'n',s:fs,c:C.stage,w:500});rr(x-bw*.42,yT-bw*.4+open,bw*.84,bw*.8,3,null,A(col[comp[g[i]]],.5));T(comp[g[i]],x,yT+open,{a:'center',f:'n',s:fs,c:C.stage,w:500});if(i===S.mi)circ(x,yC,bw*.62,C.fg,null,2)}
 if(tT<1){const px=x0+tT*n*bw;rr(px-bw*1.6,yC-bw,bw*3.2,yT-yC+bw*2,bw*.6,A(C.purple,.8),A(C.purple,.15),2);T('RNA-polymerase',px,yT+bw*1.6,{a:'center',s:11,c:C.purple})}
 const shown=Math.floor(tT*n);T('mRNA',x0,yM-bw*.9,{s:11.5,c:C.fg3});for(let i=0;i<shown;i++){const x=x0+i*bw+bw/2;rr(x-bw*.42,yM-bw*.4,bw*.84,bw*.8,3,null,A(col[m[i]],.8));T(m[i],x,yM,{a:'center',f:'n',s:fs,c:C.stage,w:500})}for(let k=0;k<n/3;k++)if(shown>=n)ln(x0+k*3*bw+3,yM+bw*.55,x0+(k+1)*3*bw-3,yM+bw*.55,A(C.fg,.35),1.5);
 if(S.tt>7.5){const nc=n/3;const k=Math.min(nc-1,Math.floor(tL*nc));const rx=x0+k*3*bw+1.5*bw;X.beginPath();X.ellipse(rx,yM-bw*.2,bw*2,bw*1.05,0,PI,TAU);X.fillStyle=A(C.gold,.25);X.fill();X.beginPath();X.ellipse(rx,yM+bw*.5,bw*2.2,bw*.75,0,0,PI);X.fillStyle=A(C.gold,.25);X.fill();T('ribosom',rx,yM+bw*1.6,{a:'center',s:11,c:C.gold});
  let stop=false;for(let j=0;j<=k;j++){if(stop)break;const a=cod(m.slice(j*3,j*3+3));const x=x0+j*3*bw+1.5*bw;if(a==='*'){T('STOPP',x,yP,{a:'center',f:'n',s:12,c:C.red,w:500});stop=true;break}const pr=j===k?ease(clamp(tL*nc-k,0,1)):1;const y=lerp(yM-bw*2,yP,pr);if(j>0)ln(x-3*bw+bw*.9,yP,x-bw*.9,yP,A(C.fg,.5),2);circ(x,y,bw*.9,null,A(ramp([C.blue,C.teal,C.green,C.yellow,C.red],(AA.indexOf(a)%20)/20),.85));T(AA3[a],x,y,{a:'center',f:'n',s:Math.max(9,bw*.42),c:C.stage,w:500})}}
 T('Protein (aminosyrekjede)',x0,yP+bw*1.6,{s:11.5,c:C.fg3});if(S.mt)T(S.mt,b.l+b.w,b.t-12,{a:'right',s:13,c:S.mt.startsWith('stille')?C.green:C.red})},
readout(S){const m=S.g.replace(/T/g,'U');const aa=[];for(let k=0;k<m.length/3;k++){const a=cod(m.slice(k*3,k*3+3));if(a==='*')break;aa.push(AA3[a])}return[['aminosyrer',aa.length],['protein',aa.join('–')],['mutasjon',S.mt||'ingen']]}
});
}

/* ---------- Smittespredning og vaksiner ---------- */
M({id:'na-smitte',s:'na',c:['NAT','BI1'],title:'Smittespredning og flokkimmunitet',short:'Smittespredning',kw:'smitte epidemi vaksine flokkimmunitet immunforsvar sykdom pandemi sir-modell karantene',
lead:'Hver prikk er en person. Røde er smittet og kan smitte andre de kommer nær. Når mange nok er vaksinert (grønne), stopper smitten opp: det er flokkimmunitet.',
controls:[{id:'beta',label:'Smittsomhet',min:.1,max:1,step:.05,value:.6,d:2},{id:'vak',label:'Andel vaksinerte',min:0,max:.95,step:.05,value:0,fmt:v=>nf(v*100,0)+' %'},{id:'ro',label:'Andel som holder seg hjemme',min:0,max:.9,step:.05,value:0,fmt:v=>nf(v*100,0)+' %'},{id:'dur',label:'Sykdomsvarighet',min:2,max:10,step:.5,value:5,unit:'s'},{type:'btns',items:[['Start på nytt',S=>MOD['na-smitte'].init(S)]]}],
tex:['R_0=\\text{antall nye smittede per syk person}','\\text{flokkimmunitet når andel immune}>1-\\frac{1}{R_0}'],
about:['Blå er mottakelige, røde er smittet, grå er friske og immune, grønne er vaksinert.','Kurven viser hvor mange som er i hver gruppe over tid. Uten tiltak vokser smitten raskt i starten fordi hver syk smitter flere andre.','Når mange er vaksinert eller holder seg hjemme, møter en syk person færre mottakelige. Da smitter hver syk færre enn én annen, og epidemien dør ut. Også de som ikke er vaksinert, blir beskyttet.','Modellen er forenklet. Virkelige sykdommer har inkubasjonstid, ulike kontakter og vaksiner som ikke virker 100 %.'],
tasks:['Hvor stor andel må være vaksinert før smitten stopper av seg selv med smittsomhet 0,6?','Sammenlign å vaksinere 50 % med å la 50 % holde seg hjemme.','Hvorfor er det viktig at mange vaksinerer seg, også de som selv sjelden blir alvorlig syke?','Hvorfor flater kurven ut selv uten vaksine?'],
init(S){const N=260;S.ag=[];for(let i=0;i<N;i++){const a=Math.random()*TAU;S.ag.push({x:Math.random(),y:Math.random(),vx:Math.cos(a)*.09,vy:Math.sin(a)*.09,st:Math.random()<S.p.vak?'V':'S',mob:Math.random()>=S.p.ro,ti:0})}const sus=S.ag.filter(a=>a.st==='S');for(let k=0;k<3&&sus.length;k++){const a=choice(sus);a.st='I';a.ti=0}S.hist=[];S.tt=0;S.peak=0},
change(S,id){if(id==='vak'||id==='ro')this.init(S)},
update(S,dt){S.tt+=dt;const r=.014;S.ag.forEach(a=>{if(a.mob){a.x+=a.vx*dt;a.y+=a.vy*dt;if(a.x<0||a.x>1){a.vx*=-1;a.x=clamp(a.x,0,1)}if(a.y<0||a.y>1){a.vy*=-1;a.y=clamp(a.y,0,1)}}if(a.st==='I'){a.ti+=dt;if(a.ti>S.p.dur)a.st='R'}});
 const inf=S.ag.filter(a=>a.st==='I');for(const i of inf)for(const s of S.ag){if(s.st!=='S')continue;const dx=s.x-i.x,dy=s.y-i.y;if(dx*dx+dy*dy<(3*r)**2&&Math.random()<S.p.beta*3*dt){s.st='I';s.ti=0}}
 const c={S:0,I:0,R:0,V:0};S.ag.forEach(a=>c[a.st]++);S.peak=Math.max(S.peak,c.I);if(!S.hist.length||S.tt-S.hist[S.hist.length-1][0]>.15)S.hist.push([S.tt,c.S,c.I,c.R,c.V]);if(S.hist.length>600)S.hist.shift()},
draw(S){const[bl,br]=split(S,.5,{g:30});const sz=Math.min(bl.w,bl.h),bx=bl.l+(bl.w-sz)/2,by=bl.t+(bl.h-sz)/2;rct(bx,by,sz,sz,A(C.fg,.3),null,1);const col={S:C.blue,I:C.red,R:C.grey,V:C.green};
 S.ag.forEach(a=>{const x=bx+a.x*sz,y=by+a.y*sz;if(a.st==='I')glow(x,y,sz*.035,C.red,.35);dot(x,y,Math.max(2.4,sz*.0095),col[a.st]);if(!a.mob)circ(x,y,Math.max(2.4,sz*.0095)+2.5,A(C.fg,.35),null,1)});
 const H=S.hist,N=S.ag.length;if(H.length<2)return;const t0=H[0][0],t1=Math.max(H[H.length-1][0],t0+10);const P=Plane(t0,t1,0,N,{l:br.l,t:br.t+22,w:br.w,h:br.h-62});lab({l:br.l,t:br.t+22},'Antall personer over tid');
 const layers=[[4,C.green],[3,C.grey],[1,C.blue],[2,C.red]];let base=H.map(()=>0);layers.forEach(([k,c])=>{const top=H.map((h,i)=>base[i]+h[k]);const pts=H.map((h,i)=>P.pt(h[0],top[i])).concat(H.map((h,i)=>P.pt(h[0],base[i])).reverse());poly(pts,null,A(c,.7));base=top});
 [[C.red,'smittet'],[C.blue,'mottakelig'],[C.grey,'immun etter sykdom'],[C.green,'vaksinert']].forEach(([c,t],i)=>{rct(br.l+(i%2)*br.w/2,br.t+br.h-28+Math.floor(i/2)*16,10,10,null,c);T(t,br.l+(i%2)*br.w/2+14,br.t+br.h-23+Math.floor(i/2)*16,{s:11.5,c:C.fg2})})},
readout(S){const c={S:0,I:0,R:0,V:0};S.ag.forEach(a=>c[a.st]++);const N=S.ag.length,ever=c.I+c.R;return[['smittet nå',c.I,'red'],['smittet totalt',nf(100*ever/N,0)+' %'],['flest syke samtidig',S.peak],['vaksinert',c.V,'green']]}
});

/* ---------- Antibiotikaresistens ---------- */
M({id:'na-resistens',s:'na',c:['NAT','BI1'],title:'Antibiotikaresistens',short:'Antibiotikaresistens',kw:'antibiotika resistens bakterier seleksjon evolusjon mutasjon infeksjon helse',
lead:'Noen få bakterier tåler antibiotikaen. Når de andre dør, får de resistente plass til å formere seg. Avbryter du kuren for tidlig, kan de resistente ta over.',
controls:[{id:'len',label:'Lengde på kuren',min:2,max:12,step:1,value:7,unit:'dager'},{id:'stop',type:'check',label:'Slutt halvveis fordi du føler deg frisk',value:false},{type:'btns',items:[['Start antibiotikakur',S=>{S.ab=S.p.stop?S.p.len/2:S.p.len;S.abs=S.tt;S.hist.push([S.tt,null,null,'kur'])}],['Ny bakteriekultur',S=>MOD['na-resistens'].init(S)]]}],
tex:['\\text{resistent} = \\text{overlever antibiotika}','\\text{seleksjon: de best tilpassede overlever og formerer seg}'],
about:['Grønne bakterier er følsomme for antibiotika. Lilla har en mutasjon som gjør dem resistente. I starten er de svært få.','Antibiotikaen dreper de følsomme raskt, men de resistente nesten ikke. Hvis kuren varer lenge nok, klarer immunforsvaret å ta de få som er igjen. Det er ikke med i modellen her, men det er grunnen til at det er viktig å fullføre kuren.','Hver gang antibiotika brukes, gir det de resistente en fordel. Derfor skal antibiotika bare brukes når det trengs. Dette er naturlig utvalg i praksis.'],
tasks:['Gi en kur, vent til bakteriene vokser igjen, og gi en ny kur. Hva skjer med andelen resistente?','Hvorfor skal du ikke spare på antibiotika fra en gammel kur?','Hvorfor bruker Norge mindre antibiotika enn mange andre land, og hvorfor er det viktig?','Forklar hvordan antibiotikaresistens er et eksempel på evolusjon.'],
init(S){S.b=[];for(let i=0;i<220;i++){const a=Math.random()*TAU,r=Math.sqrt(Math.random())*.95;S.b.push({x:Math.cos(a)*r,y:Math.sin(a)*r,t:Math.random()<.012?'R':'S'})}S.ab=0;S.tt=0;S.hist=[]},
update(S,dt){S.tt+=dt;const K=600,N=S.b.length,r=.55*(1-N/K);const nb=[];S.b.forEach(b=>{if(S.ab>0&&Math.random()<(b.t==='S'?1.4:.04)*dt)return;nb.push(b);if(Math.random()<r*dt){const a=Math.random()*TAU;let x=b.x+Math.cos(a)*.05,y=b.y+Math.sin(a)*.05;const d=Math.hypot(x,y);if(d>.97){x*=.97/d;y*=.97/d}nb.push({x,y,t:b.t==='S'&&Math.random()<.002?'R':b.t})}});S.b=nb;if(S.ab>0)S.ab=Math.max(0,S.ab-dt);
 if(!S.hist.length||S.tt-S.hist[S.hist.length-1][0]>.15){const s=S.b.filter(b=>b.t==='S').length;S.hist.push([S.tt,s,S.b.length-s]);if(S.hist.length>400)S.hist.shift()}},
draw(S){const[bl,br]=split(S,.5,{g:30});const R=Math.min(bl.w,bl.h)/2-6,cx=bl.l+bl.w/2,cy=bl.t+bl.h/2;circ(cx,cy,R+4,A(C.fg,.5),A(C.fg,.03),2);if(S.ab>0){glow(cx,cy,R*1.2,C.blue,.35);T(`antibiotika: ${nf(S.ab,1)} dager igjen`,cx,cy-R-12,{a:'center',s:12.5,c:C.blue})}
 S.b.forEach(b=>{const x=cx+b.x*R,y=cy+b.y*R;X.save();X.translate(x,y);X.rotate((b.x*7+b.y*3)%PI);rr(-4.5,-2,9,4,2,null,b.t==='S'?C.green:C.purple);X.restore()});
 const H=S.hist.filter(h=>h[1]!==null);if(H.length<2)return;const t0=H[0][0],t1=Math.max(H[H.length-1][0],t0+20);const P=Plane(t0,t1,0,620,{l:br.l+30,t:br.t+24,w:br.w-30,h:br.h-50});P.axes({ys:200,y:true,x:true,xs:5,xf:x=>'',x0:true});lab({l:br.l+30,t:br.t+24},'Antall bakterier');
 S.hist.filter(h=>h[3]==='kur').forEach(h=>{if(h[0]>=t0){ln(P.X(h[0]),P.t,P.X(h[0]),P.Y(0),A(C.blue,.6),1.2,[4,4]);T('kur',P.X(h[0])+4,P.t+8,{s:11,c:C.blue})}});
 P.clip(()=>{pth(H.map(h=>P.pt(h[0],h[1])),C.green,2.6);pth(H.map(h=>P.pt(h[0],h[2])),C.purple,2.6)});T('følsomme',P.l+P.w,P.Y(H[H.length-1][1])-10,{a:'right',s:12,c:C.green});T('resistente',P.l+P.w,P.Y(H[H.length-1][2])+12,{a:'right',s:12,c:C.purple});T('tid (dager) →',P.l+P.w,P.Y(0)+14,{a:'right',s:11,c:C.fg3})},
readout(S){const s=S.b.filter(b=>b.t==='S').length,r=S.b.length-s;return[['følsomme',s,'green'],['resistente',r,'purple'],['andel resistente',S.b.length?nf(100*r/S.b.length,1)+' %':'–']]}
});

/* ---------- Naturlig utvalg: bjørkemåleren ---------- */
M({id:'na-evolusjon',s:'na',c:['NAT','BI2'],title:'Naturlig utvalg: bjørkemåleren',short:'Naturlig utvalg',kw:'evolusjon naturlig utvalg seleksjon variasjon arv kamuflasje bjørkemåler industrimelanisme tilpasning',
lead:'Sommerfuglene varierer i farge, og fargen arves. Fuglene ser lettest de som skiller seg ut fra barken. Over mange generasjoner endrer hele bestanden farge.',
controls:[{id:'bg',type:'seg',label:'Bark',value:'mork',options:[['lys','Lys bjørkebark'],['mork','Sotet, mørk bark']]},{id:'pr',label:'Hvor godt fuglene ser',min:0,max:1,step:.05,value:.8,d:2},{id:'mu',label:'Variasjon fra mutasjoner',min:0,max:.15,step:.01,value:.05,d:2},{type:'btns',items:[['Ny bestand',S=>MOD['na-evolusjon'].init(S)]]}],
tex:['\\text{variasjon}+\\text{arv}+\\text{seleksjon}\\Rightarrow\\text{evolusjon}'],
about:['Under den industrielle revolusjonen i England ble trærne svarte av sot. Lyse bjørkemålere ble lett funnet av fugler, og på noen tiår ble de fleste mørke. Da lufta ble renere, snudde utviklingen.','Hver generasjon blir noen spist. De overlevende får avkom som ligner dem, med litt tilfeldig variasjon fra mutasjoner.','Uten variasjon har ikke seleksjonen noe å virke på. Sett variasjonen til 0 og se hva som skjer.'],
tasks:['Hvor mange generasjoner tar det før bestanden er mørk på mørk bark?','Bytt tilbake til lys bark. Går endringen like fort tilbake?','Hva skjer hvis fuglene ikke ser forskjell (0)? Forklar.','Gi et annet eksempel på naturlig utvalg som skjer i dag.'],
init(S){const r=rng(Math.random()*1e6|0);S.m=[];for(let i=0;i<110;i++)S.m.push({z:clamp(.15+gauss()*.08,0,1),x:r(),y:r(),a:r()*TAU,dead:0});S.gen=0;S.gt=0;S.mean=[[0,this.avg(S)]]},
avg(S){const l=S.m.filter(m=>!m.dead);return l.reduce((a,m)=>a+m.z,0)/Math.max(1,l.length)},
update(S,dt){S.gt+=dt;const bz=S.p.bg==='mork'?.85:.12;if(S.gt<1.6){const alive=S.m.filter(m=>!m.dead);const target=Math.floor(S.m.length*.45*S.gt/1.6)-S.m.filter(m=>m.dead).length;for(let k=0;k<target&&alive.length;k++){const w=alive.map(m=>.05+S.p.pr*Math.pow(Math.abs(m.z-bz),2)*4);const tot=w.reduce((a,b)=>a+b,0);let u=Math.random()*tot,i=0;while(u>w[i]&&i<w.length-1){u-=w[i];i++}alive[i].dead=S.t;alive.splice(i,1)}}
 else if(S.gt>2.6){const surv=S.m.filter(m=>!m.dead);const nm=[];for(let i=0;i<110;i++){const p=choice(surv);nm.push({z:clamp(p.z+gauss()*S.p.mu,0,1),x:Math.random(),y:Math.random(),a:Math.random()*TAU,dead:0})}S.m=nm;S.gen++;S.gt=0;S.mean.push([S.gen,this.avg(S)]);if(S.mean.length>80)S.mean.shift()}},
draw(S){const[bl,br]=split(S,.6,{g:28});const dark=S.p.bg==='mork';const key=S.p.bg+bl.w+'x'+bl.h;if(S.tk!==key){const cv=document.createElement('canvas');cv.width=Math.max(1,bl.w|0);cv.height=Math.max(1,bl.h|0);const c=cv.getContext('2d');c.fillStyle=dark?'#2a2623':'#d6d2c4';c.fillRect(0,0,cv.width,cv.height);const r=rng(dark?3:7);for(let i=0;i<220;i++){c.fillStyle=dark?`rgba(${10+r()*30|0},${10+r()*25|0},${8+r()*20|0},.6)`:`rgba(${40+r()*60|0},${40+r()*50|0},${30+r()*40|0},${.15+r()*.35})`;c.fillRect(r()*cv.width,r()*cv.height,2+r()*30,1+r()*4)}S.tx=cv;S.tk=key}
 X.drawImage(S.tx,bl.l,bl.t,bl.w,bl.h);S.m.forEach(m=>{const x=bl.l+m.x*bl.w,y=bl.t+m.y*bl.h;let al=1;if(m.dead){al=clamp(1-(S.t-m.dead)/.5,0,1);if(al<=0)return;if(al<1)T('×',x,y,{a:'center',s:16,c:C.red})}X.globalAlpha=al;const c=mix('#ece6d2','#1f1b18',m.z);X.save();X.translate(x,y);X.rotate(m.a);X.beginPath();X.ellipse(-5,0,6,3.4,.35,0,TAU);X.ellipse(5,0,6,3.4,-.35,0,TAU);X.fillStyle=c;X.fill();X.restore();X.globalAlpha=1});
 T(`Generasjon ${S.gen}`,bl.l+8,bl.t+14,{f:'n',s:13,c:dark?C.fg:'#222',bg:dark?A(C.stage,.6):'rgba(255,255,255,.6)'});
 const[h1,h2]=rows(br,[1,1],40);const alive=S.m.filter(m=>!m.dead);const bins=new Array(10).fill(0);alive.forEach(m=>bins[Math.min(9,Math.floor(m.z*10))]++);const mx=Math.max(5,...bins);bins.forEach((v,i)=>{const w=h1.w/10;rct(h1.l+i*w+1,h1.t+h1.h-v/mx*(h1.h-20),w-2,v/mx*(h1.h-20),null,mix('#ece6d2','#1f1b18',(i+.5)/10))});lab(h1,'Fargefordeling nå');T('lys',h1.l,h1.t+h1.h+12,{s:11,c:C.fg3});T('mørk',h1.l+h1.w,h1.t+h1.h+12,{a:'right',s:11,c:C.fg3});
 const g0=S.mean[0][0],g1=Math.max(S.mean[S.mean.length-1][0],g0+10);const P=Plane(g0,g1,0,1,h2);P.axes({xs:5,ys:.5,x0:true,y0:true,xl:'generasjon',ls:13});lab(h2,'Gjennomsnittlig farge');P.clip(()=>pth(S.mean.map(q=>P.pt(...q)),C.yellow,2.6));ln(P.l,P.Y(dark?.85:.12),P.l+P.w,P.Y(dark?.85:.12),A(C.fg,.35),1,[4,4])},
readout(S){return[['generasjon',S.gen],['gj.snittlig farge',nf(this.avg(S),2)+' (0 = lys, 1 = mørk)']]}
});

/* ---------- Rovdyr og byttedyr ---------- */
{
function rk(S,h){const{a,b,e,d}=S.p;const f=(H,L)=>[a*H-b*H*L,e*b*H*L-d*L];const[H,L]=[S.hh,S.ll];const k1=f(H,L),k2=f(H+h/2*k1[0],L+h/2*k1[1]),k3=f(H+h/2*k2[0],L+h/2*k2[1]),k4=f(H+h*k3[0],L+h*k3[1]);S.hh=Math.max(.01,H+h/6*(k1[0]+2*k2[0]+2*k3[0]+k4[0]));S.ll=Math.max(.01,L+h/6*(k1[1]+2*k2[1]+2*k3[1]+k4[1]))}
M({id:'na-okologi',s:'na',c:['NAT','BI1','BI2'],title:'Rovdyr og byttedyr',short:'Rovdyr og byttedyr',kw:'økologi bestand populasjon rovdyr byttedyr gaupe hare næringskjede bærekraft lotka-volterra økosystem',
lead:'Når det er mange harer, får gaupene mye mat og blir flere. Da blir det færre harer, og etter hvert sulter gaupene. Bestandene svinger i takt, med rovdyrene litt etter.',
controls:[{id:'a',label:'Fødselsrate hos harer',min:.2,max:1.5,step:.05,value:.8,d:2},{id:'b',label:'Hvor effektivt gaupene jakter',min:.005,max:.05,step:.001,value:.02,d:3},{id:'e',label:'Hvor godt gaupene utnytter maten',min:.1,max:.8,step:.05,value:.3,d:2},{id:'d',label:'Dødsrate hos gauper',min:.1,max:1,step:.05,value:.4,d:2},{type:'btns',items:[['Jakt: fjern halvparten av gaupene',S=>{S.ll*=.5;S.ev.push([S.tt,'jakt'])}],['Start på nytt',S=>MOD['na-okologi'].init(S)]]}],
tex:['H\'=aH-bHL','L\'=e\\,b\\,HL-d\\,L','H^*=\\frac{d}{e\\,b},\\qquad L^*=\\frac{a}{b}'],
about:['Kurvene viser antall harer (oransje) og gauper (røde) over tid. Toppene til gaupene kommer etter toppene til harene.','Til høyre ser du det samme som en bane: antall harer mot antall gauper. Bestandene går i en sløyfe rundt et likevektspunkt.','Modellen er Lotka–Volterra-likningene. Virkelige bestander påvirkes også av vær, sykdom, andre arter og mennesker.','Hjortedyr og ulv, lemen og fjellrev, og hare og gaupe i Canada er kjente eksempler.'],
tasks:['Hva skjer med svingningene når gaupene blir flinkere til å jakte?','Jakt på gaupene når harebestanden er lav. Hva skjer etterpå?','Hvorfor blir det ikke uendelig mange harer når gaupene er få?','Hva betyr likevektspunktet? Finn det i figuren.'],
init(S){S.hh=40;S.ll=10;S.tt=0;S.hist=[[0,40,10]];S.ev=[];const r=rng(13);S.pos=[...Array(160)].map(()=>[r(),r()])},
update(S,dt){const n=12,h=dt*1.5/n;for(let i=0;i<n;i++)rk(S,h);S.tt+=dt*1.5;if(S.tt-S.hist[S.hist.length-1][0]>.1){S.hist.push([S.tt,S.hh,S.ll]);while(S.hist.length&&S.hist[0][0]<S.tt-60)S.hist.shift()}},
draw(S){const b=pad(S,26,20,26);const[top,bot]=rows(b,[.55,2],24);const hc=Math.min(120,Math.round(S.hh/2)),lc=Math.min(40,Math.round(S.ll/2));
 rct(top.l,top.t,top.w,top.h,null,A(C.green,.07));for(let i=0;i<hc;i++){const[u,v]=S.pos[i];dot(top.l+u*top.w,top.t+v*top.h,3,C.gold)}for(let i=0;i<lc;i++){const[u,v]=S.pos[159-i];dot(top.l+u*top.w,top.t+v*top.h,4.5,C.red)}T(`${Math.round(S.hh)} harer`,top.l+6,top.t+10,{f:'n',s:12,c:C.gold,bg:A(C.stage,.7)});T(`${Math.round(S.ll)} gauper`,top.l+top.w-6,top.t+10,{a:'right',f:'n',s:12,c:C.red,bg:A(C.stage,.7)});
 const[g1,g2]=isWide(S)?cols(bot,[1.6,1],34):rows(bot,[1,1],26);const H=S.hist;const mx=Math.max(20,...H.map(h=>Math.max(h[1],h[2])))*1.1;const t0=Math.max(0,S.tt-60);const P=Plane(t0,Math.max(t0+60,S.tt),0,mx,g1);P.grid(10,{sy:niceStep(mx/4),minor:false,alpha:.08});P.axes({xs:10,ys:niceStep(mx/4),x0:true,xl:'tid',ls:13});
 S.ev.forEach(([t,l])=>{if(t>=t0){ln(P.X(t),P.t,P.X(t),P.Y(0),A(C.fg,.35),1,[3,4]);T(l,P.X(t)+4,P.t+8,{s:11,c:C.fg3})}});P.clip(()=>{pth(H.map(h=>P.pt(h[0],h[1])),C.gold,2.6);pth(H.map(h=>P.pt(h[0],h[2])),C.red,2.6)});
 const Q=Plane(0,mx,0,mx*.7,g2);Q.axes({xs:niceStep(mx/4),ys:niceStep(mx/4),x0:true,y0:true,xl:'harer',yl:'gauper',ls:13});Q.clip(()=>pth(H.map(h=>Q.pt(h[1],h[2])),A(C.blue,.8),2));const pp=S.p;dot(Q.X(pp.d/(pp.e*pp.b)),Q.Y(pp.a/pp.b),5,C.fg);T('likevekt',Q.X(pp.d/(pp.e*pp.b))+8,Q.Y(pp.a/pp.b)-8,{s:11,c:C.fg2});dot(Q.X(S.hh),Q.Y(S.ll),6,C.yellow)},
readout(S){const{a,b,e,d}=S.p;return[['harer',nf(S.hh,0),'gold'],['gauper',nf(S.ll,0),'red'],['likevekt',`${nf(d/(e*b),0)} harer, ${nf(a/b,0)} gauper`]]}
});
}

/* ---------- Naturvitenskapelig metode: pendelen ---------- */
{
const g=9.81;const Tth=(L,th)=>{const t=rad(th);return TAU*Math.sqrt(L/g)*(1+t*t/16+11*t**4/3072)};
M({id:'na-metode',s:'na',c:['NAT','FY1'],title:'Naturvitenskapelig metode: hva bestemmer svingetiden?',short:'Forsøk med pendel',kw:'naturvitenskapelig metode hypotese variabel kontrollert forsøk måling usikkerhet pendel svingetid',
lead:'Hva påvirker hvor lang tid en pendel bruker på én svingning: lengden, massen eller utslaget? Lag en hypotese, endre én variabel om gangen og mål.',
controls:[{id:'L',label:'Snorlengde <i>L</i>',min:.2,max:2,step:.05,value:1,unit:'m',d:2},{id:'m',label:'Masse <i>m</i>',min:.05,max:1,step:.05,value:.2,unit:'kg',d:2},{id:'th',label:'Utslag <i>θ</i>',min:5,max:60,step:1,value:15,unit:'°'},{id:'x',type:'seg',label:'Vis på x-aksen',value:'L',options:[['L','Lengde'],['m','Masse'],['th','Utslag']]},{type:'btns',items:[['Mål 10 svingninger',S=>MOD['na-metode'].measure(S)],['Slett målingene',S=>{S.ms=[]}]]}],
tex:['T=2\\pi\\sqrt{\\frac{L}{g}}\\quad(\\text{små utslag})'],
about:['En god undersøkelse endrer bare én variabel om gangen og holder de andre konstante. Da vet du hva som var årsaken.','Vi måler tiden for 10 svingninger og deler på 10. Da blir feilen fra reaksjonstiden ti ganger mindre per svingning.','Hver måling har litt tilfeldig usikkerhet, akkurat som når du tar tiden med stoppeklokke.','Resultatet: svingetiden avhenger av lengden. Massen spiller ingen rolle, og utslaget betyr lite så lenge det er lite.'],
tasks:['Skriv en hypotese før du måler: hvilken variabel tror du betyr mest?','Mål svingetiden for fem ulike lengder med samme masse og utslag. Hva slags sammenheng ser du?','Hvorfor er det lurt å måle 10 svingninger i stedet for én?','Hvor lang må en pendel være for at én svingning skal ta nøyaktig 2 s?'],
init(S){S.a=rad(S.p.th);S.w=0;S.ms=[];S.lastM=null},
change(S,id){if(id!=='x'){S.a=rad(S.p.th);S.w=0}},
measure(S){const p=S.p,T_=Tth(p.L,p.th),Tm=(10*T_+gauss()*.15)/10;S.ms.push({L:p.L,m:p.m,th:p.th,T:Tm});if(S.ms.length>30)S.ms.shift();S.lastM=S.t},
update(S,dt){const L=S.p.L,n=10,h=dt/n;for(let i=0;i<n;i++){const al=-g/L*Math.sin(S.a);S.w+=al*h;S.a+=S.w*h}},
draw(S){const p=S.p;const[bl,br]=split(S,.4,{g:30});const px=bl.l+bl.w/2,py=bl.t+16,Lp=(bl.h-60)*p.L/2;ln(px-50,py,px+50,py,C.fg2,3);const bx=px+Math.sin(S.a)*Lp,by=py+Math.cos(S.a)*Lp;ln(px,py,bx,by,C.fg,1.6);const r=6+Math.cbrt(p.m)*14;sphere(bx,by,r,C.gold);
 marc(px,py,40,-PI/2,-PI/2+rad(p.th),A(C.fg,.4),1.2);ln(px,py,px,py+Lp+20,A(C.fg,.2),1,[3,4]);T('θ',px+12,py+52,{f:'m',s:14,c:C.fg2});T(`L = ${nf(p.L,2)} m`,px+10,py+Lp/2,{f:'n',s:12,c:C.fg2,bg:A(C.stage,.6)});T(`m = ${nf(p.m,2)} kg`,bx+r+6,by,{f:'n',s:12,c:C.fg2});
 if(S.lastM!==null&&S.t-S.lastM<1.5)T('Målt!',px,bl.t+bl.h-10,{a:'center',s:14,c:C.green});
 const[g1,g2]=rows(br,[1.6,1],34);const xv=p.x;const xr={L:[0,2.1],m:[0,1.05],th:[0,62]}[xv];const P=Plane(xr[0],xr[1],0,3.2,g1);P.grid(xv==='th'?10:xv==='L'?.25:.1,{sy:.5,minor:false,alpha:.08});P.axes({xs:xv==='th'?10:xv==='L'?.5:.2,ys:.5,xl:{L:'L (m)',m:'m (kg)',th:'θ (°)'}[xv],yl:'T (s)',ls:13,x0:true,y0:true});
 if(xv==='L')P.fn(L=>L>0?Tth(L,p.th):NaN,A(C.yellow,.6),1.8,{from:.05,dash:[6,5]});else P.fn(v=>xv==='m'?Tth(p.L,p.th):Tth(p.L,v),A(C.yellow,.6),1.8,{dash:[6,5]});
 S.ms.forEach((q,i)=>{const same=xv==='L'?Math.abs(q.m-p.m)<1e-6&&q.th===p.th:xv==='m'?Math.abs(q.L-p.L)<1e-6&&q.th===p.th:Math.abs(q.L-p.L)<1e-6&&Math.abs(q.m-p.m)<1e-6;dot(P.X(q[xv]),P.Y(q.T),5,same?C.fg:A(C.fg,.3))});T('hvite punkt: de andre variablene er like som nå',P.l,P.t-4,{s:11,c:C.fg3});
 lab(g2,'Siste målinger');const last=S.ms.slice(-5).reverse();['L (m)','m (kg)','θ (°)','T (s)'].forEach((h,j)=>T(h,g2.l+j*g2.w/4,g2.t+8,{f:'n',s:11,c:C.fg3}));last.forEach((q,i)=>[nf(q.L,2),nf(q.m,2),String(q.th),nf(q.T,3)].forEach((v,j)=>T(v,g2.l+j*g2.w/4,g2.t+28+i*18,{f:'n',s:12,c:j===3?C.yellow:C.fg2})));if(!last.length)T('Trykk «Mål 10 svingninger».',g2.l,g2.t+30,{s:12.5,c:C.fg2})},
readout(S){const p=S.p;return[['T (teori, små utslag)',nf(TAU*Math.sqrt(p.L/g),3)+' s'],['målinger',S.ms.length],['siste T',S.ms.length?nf(S.ms[S.ms.length-1].T,3)+' s':'–','yellow']]}
});
}
