'use strict';
/* ================= FYSIKK (del 4): Fysikk 1 ================= */

/* ---------- Friksjon ---------- */
{
const g=9.81;
M({id:'fy-friksjon',s:'fy',c:['FY1'],title:'Friksjon: hvilefriksjon og glidefriksjon',short:'Friksjon',kw:'friksjon friksjonskraft hvilefriksjon glidefriksjon friksjonstall normalkraft newtons lover kraft akselerasjon',
lead:'Når du drar i en tung kasse, beveger den seg ikke før kraften blir stor nok. Hvilefriksjonen tilpasser seg og blir like stor som kraften du drar med, helt til den når en grense. Da begynner kassen å gli, og friksjonen blir litt mindre.',
controls:[{id:'m',label:'Masse',min:1,max:30,step:.5,value:10,unit:'kg',d:1},{id:'mus',label:'Hvilefriksjonstall μₛ',min:.1,max:1,step:.01,value:.5,d:2},{id:'muk',label:'Glidefriksjonstall μₖ',min:.05,max:1,step:.01,value:.3,d:2},
 {id:'F',label:'Kraft du drar med',min:0,max:200,step:1,value:0,unit:'N'},{type:'btns',items:[['Øk kraften gradvis',S=>{S.ramp=true;S.Fr=S.p.F}],['Slipp tauet',S=>{S.ramp=false;setP('F',0,S)}],['Start på nytt',S=>MOD['fy-friksjon'].init(S)]]}],
tex:['R_{\\text{hvile}}\\le\\mu_s N','R_{\\text{glid}}=\\mu_k N','\\Sigma F=F-R=ma'],
about:['Friksjon oppstår fordi flatene aldri er helt glatte. Små ujevnheter griper inn i hverandre, og det dannes svake bindinger der flatene berører hverandre.','Så lenge kassen står i ro, er <strong>hvilefriksjonen</strong> nøyaktig like stor som kraften du drar med, men motsatt rettet. Summen av kreftene er null. Hvilefriksjonen kan høyst bli $\\mu_s N$.','Når kassen glir, er <strong>glidefriksjonen</strong> $\\mu_k N$, nesten uavhengig av farten. Den er vanligvis mindre enn største hvilefriksjon. Derfor er det tyngre å få noe i gang enn å holde det i gang.','Normalkraften $N$ er her lik tyngden $mg$, fordi underlaget er vannrett og du drar vannrett.'],
tasks:['Hvor stor kraft trengs for å få en kasse på 10 kg i gang når μₛ = 0,5?','Hvorfor faller friksjonskraften når kassen begynner å gli?','Hva blir akselerasjonen hvis du drar med 50 N og μₖ = 0,3?','Hvorfor bremser en bil best når hjulene ruller, og ikke låser seg?'],
init(S){S.x=0;S.vx=0;S.ramp=false;S.hist=[];S.vh=[];S.tt=0;S.R=0;S.slid=false;if(S.p.F)setP('F',0,S)},
update(S,dt){const p=S.p;if(S.ramp){S.Fr=Math.min(200,(S.Fr??p.F)+dt*12);setP('F',Math.round(S.Fr),S);S.v.F=S.Fr;if(S.Fr>=200)S.ramp=false}else S.Fr=p.F;
 const F=p.F,N=p.m*g,mus=p.mus,muk=Math.min(p.muk,p.mus);S.tt+=dt;
 if(S.vx<=1e-6){S.vx=0;if(F>mus*N){S.vx=1e-4;S.slid=true}else S.R=F}
 if(S.vx>0){const a=(F-muk*N)/p.m;S.vx=Math.max(0,S.vx+a*dt);S.R=muk*N;S.x+=S.vx*dt}
 const last=S.hist[S.hist.length-1];if(!last||Math.abs(last[0]-F)>.4||Math.abs(last[1]-S.R)>.4)S.hist.push([F,S.R]);if(S.hist.length>600)S.hist.shift();
 S.vh.push([S.tt,S.vx]);while(S.vh.length&&S.vh[0][0]<S.tt-12)S.vh.shift()},
draw(S){const p=S.p,N=p.m*g,muk=Math.min(p.muk,p.mus),F=p.F;const b=pad(S,30,26,40);const[top,bot]=rows(b,[1,1.15],46);const[g1,g2]=cols(bot,[1.3,1],34);
 const fy=top.t+top.h*.78;ln(top.l,fy,top.l+top.w,fy,C.fg2,2);for(let x=top.l;x<top.l+top.w;x+=14)ln(x,fy,x-8,fy+8,A(C.fg,.2),1);
 const bw=70+p.m*2,bh=46+p.m,period=top.w*.55;const bx=top.l+top.w*.12+((S.x*40)%period);rr(bx,fy-bh,bw,bh,4,C.gold,A(C.gold,.3),2);T(nf(p.m,1)+' kg',bx+bw/2,fy-bh/2,{a:'center',f:'n',s:13,c:C.fg});
 const sc=.9;if(F>0){arr(bx+bw,fy-bh/2,bx+bw+F*sc,fy-bh/2,C.blue,3,10);T('F = '+nf(F,0)+' N',bx+bw+F*sc+6,fy-bh/2,{f:'n',s:12,c:C.blue})}
 if(S.R>0){arr(bx,fy-4,bx-S.R*sc,fy-4,C.red,3,10);T('R = '+nf(S.R,0)+' N',bx-S.R*sc-6,fy-18,{a:'right',f:'n',s:12,c:C.red})}
 arr(bx+bw/2,fy-bh,bx+bw/2,fy-bh-N*.18,A(C.green,.8),2,8);T('N',bx+bw/2+8,fy-bh-N*.18+6,{f:'m',s:15,c:C.green});
 const ix=top.l+top.w-70,iy=top.t+40,ir=36;circ(ix,iy,ir,A(C.fg,.4),A(C.fg,.04),1.4);X.save();X.beginPath();X.arc(ix,iy,ir-1,0,TAU);X.clip();const off_=(S.x*120)%16;
 const zig=(y0,s,o,col)=>{const pts=[];for(let k=-6;k<=6;k++){pts.push([ix+k*8-o,y0+(k%2?s:-s)])}pth(pts,col,2)};zig(iy+4,4,0,C.fg2);zig(iy-4+(S.vx>0?-2:0),4,off_+4,C.gold);X.restore();T('flatene forstørret',ix,iy+ir+12,{a:'center',s:10.5,c:C.fg3});
 T(S.vx>0?'Glidefriksjon: kassen glir':F>0?'Hvilefriksjon: kassen står stille':'Kassen står i ro',top.l,top.t+10,{s:14,w:700,c:S.vx>0?C.red:C.fg});
 const fm=Math.max(60,p.mus*N*1.6),rm=p.mus*N*1.25;const P=Plane(0,Math.min(200,fm),0,rm,{l:g1.l+40,t:g1.t,w:g1.w-40,h:g1.h});P.grid(niceStep(fm/5),{sy:niceStep(rm/4),minor:false,alpha:.06});P.axes({xs:niceStep(fm/5),ys:niceStep(rm/4),x0:true,y0:true,xl:'F (N)',yl:'R (N)',ls:12});lab(g1,'Friksjonskraft mot kraften du drar med');
 ln(P.X(0),P.Y(0),P.X(p.mus*N),P.Y(p.mus*N),A(C.fg,.35),1.4,[5,4]);ln(P.X(p.mus*N),P.Y(muk*N),P.X(P.x1),P.Y(muk*N),A(C.fg,.35),1.4,[5,4]);ln(P.X(p.mus*N),P.Y(p.mus*N),P.X(p.mus*N),P.Y(muk*N),A(C.fg,.2),1,[2,3]);
 T('μₛN = '+nf(p.mus*N,0)+' N',P.X(p.mus*N)+4,P.Y(p.mus*N)-8,{f:'n',s:11,c:C.fg2});T('μₖN = '+nf(muk*N,0)+' N',P.X(P.x1)-4,P.Y(muk*N)-9,{a:'right',f:'n',s:11,c:C.fg2});
 S.hist.forEach(h=>dot(P.X(h[0]),P.Y(h[1]),2.4,C.red));dot(P.X(F),P.Y(S.R),5,C.red);
 const vm=Math.max(1,...S.vh.map(q=>q[1]))*1.15;const Q=Plane(S.tt-12,S.tt,0,vm,{l:g2.l+34,t:g2.t,w:g2.w-34,h:g2.h});Q.grid(2,{sy:niceStep(vm/4),minor:false,alpha:.06});Q.axes({xs:2,ys:niceStep(vm/4),xAt:S.tt-12,x0:true,y0:true,xf:()=>'',yl:'v (m/s)',xl:'tid',ls:12});lab(g2,'Farten til kassen');if(S.vh.length>1)pth(S.vh.map(q=>Q.pt(q[0],q[1])),C.green,2.2)},
readout(S){const p=S.p,N=p.m*9.81,muk=Math.min(p.muk,p.mus);const a=S.vx>0?(p.F-muk*N)/p.m:0;return[['kraft F',nf(p.F,0)+' N','blue'],['friksjon R',nf(S.R,1)+' N','red'],['type',S.vx>0?'glidefriksjon':'hvilefriksjon'],['akselerasjon',nf(a,2)+' m/s²'],['fart',nf(S.vx,2)+' m/s','green']]}
});
}

/* ---------- Tilsynelatende vekt i heis ---------- */
{
const g=9.81,FL=3,NF=10;
M({id:'fy-heis',s:'fy',c:['FY1'],title:'Hva viser vekta i heisen?',short:'Vekt i heis',kw:'heis vekt normalkraft tyngde akselerasjon newtons andre lov vektløs fritt fall tilsynelatende vekt kraft',
lead:'Står du på en badevekt i en heis, viser den ikke alltid det samme. Vekta måler normalkraften, og den endrer seg når heisen akselererer. I fritt fall viser den null.',
controls:[{id:'m',label:'Masse',min:30,max:120,step:1,value:60,unit:'kg'},{id:'a',label:'Akselerasjon når heisen starter og stopper',min:.5,max:3,step:.1,value:1.5,unit:'m/s²',d:1},
 {type:'btns',items:[['Kjør opp 5 etasjer',S=>MOD['fy-heis'].go(S,5)],['Kjør ned 5 etasjer',S=>MOD['fy-heis'].go(S,-5)],['Fritt fall (kabelen ryker)',S=>MOD['fy-heis'].fall(S)]]}],
tex:['N-mg=ma\\;\\Rightarrow\\;N=m(g+a)','\\text{vekta viser }\\frac{N}{g}'],
about:['En vekt måler hvor hardt du presser på den, altså normalkraften $N$. Den regner om til kilogram ved å dele på $g$.','Når heisen akselererer oppover, må normalkraften være større enn tyngden for at du skal få akselerasjon oppover. Vekta viser mer. Når den akselererer nedover, eller bremser på vei opp, viser den mindre.','Når heisen har konstant fart, er akselerasjonen null, og vekta viser din vanlige masse. Det er akselerasjonen, ikke farten, som betyr noe.','I fritt fall akselererer du og vekta like mye nedover, så du presser ikke på den. Du er <strong>vektløs</strong>. Det er det samme astronauter opplever i bane rundt jorda.'],
tasks:['Hva viser vekta når heisen akselererer oppover med 2 m/s² og du veier 60 kg?','Når viser vekta minst på en tur nedover?','Hvorfor kjenner du deg tyngre i starten av en tur opp?','Hva skjer med vekta i fritt fall? Hvorfor?'],
init(S){S.y=0;S.vy=0;S.ay=0;S.prof=[];S.tt=0;S.hist=[];S.free=false},
go(S,n){if(S.prof.length)return;const d=Math.max(-S.y,Math.min(NF*FL-S.y,n*FL));if(Math.abs(d)<.1)return;const a=S.p.a,vmax=Math.min(3,Math.sqrt(a*Math.abs(d)));const ta=vmax/a,tc=Math.max(0,(Math.abs(d)-vmax*ta)/vmax),sg=Math.sign(d);S.prof=[[ta,sg*a],[tc,0],[ta,-sg*a]];S.pt=0},
fall(S){if(S.prof.length)return;if(S.y<9){S.y=NF*FL;S.vy=0}S.prof=[[1.1,-g],[.55,2*g]];S.pt=0;S.free=true},
update(S,dt){S.tt+=dt;let a=0;if(S.prof.length){S.pt+=dt;let t=S.pt,done=true;for(const[d,aa]of S.prof){if(t<d){a=aa;done=false;break}t-=d}if(done){S.prof=[];S.vy=0;S.free=false}}S.ay=a;S.vy+=a*dt;S.y=clamp(S.y+S.vy*dt,0,NF*FL);if(!S.prof.length)S.vy=0;
 S.hist.push([S.tt,S.ay,S.p.m*(g+S.ay)/g]);while(S.hist.length&&S.hist[0][0]<S.tt-14)S.hist.shift()},
draw(S){const p=S.p;const[bl,br]=split(S,.38,{g:28,b:pad(S,26,26,40)});const sh={l:bl.l+bl.w*.25,t:bl.t,w:bl.w*.5,h:bl.h};const fy=y=>sh.t+sh.h-(y/(NF*FL))*(sh.h-90)-80;
 rct(sh.l,sh.t,sh.w,sh.h,A(C.fg,.25),A(C.fg,.03),1.4);for(let k=0;k<=NF;k++){const y=fy(k*FL)+80;ln(sh.l-10,y,sh.l,y,A(C.fg,.4),1);T(String(k),sh.l-14,y-8,{a:'right',f:'n',s:10.5,c:C.fg3})}
 const cy=fy(S.y),cw=sh.w-10,cx=sh.l+5;ln(sh.l+sh.w/2,sh.t,sh.l+sh.w/2,cy,S.free?A(C.red,.3):C.fg2,1.6,S.free?[3,5]:null);rr(cx,cy,cw,80,4,C.fg2,A(C.blue,.1),1.8);
 const N=p.m*(g+S.ay);const px=cx+cw/2,py=cy+62;rct(px-16,py,32,8,null,C.fg2);const disp=Math.max(0,N/g);rr(px-26,py+10,52,14,3,null,'#0b1f12');T(nf(disp,1),px,py+17,{a:'center',f:'n',s:10.5,c:C.green});
 circ(px,py-42,6,C.fg,null,2);ln(px,py-36,px,py-14,C.fg,2.4);ln(px,py-14,px-6,py,C.fg,2.4);ln(px,py-14,px+6,py,C.fg,2.4);ln(px,py-30,px-9,py-20,C.fg,2.2);ln(px,py-30,px+9,py-20,C.fg,2.2);
 const s=.03;arr(px+20,py-25,px+20,py-25+p.m*g*s,C.red,2.2,7);T('G',px+26,py-25+p.m*g*s,{f:'m',s:13,c:C.red});if(N>1){arr(px-20,py-2,px-20,py-2-N*s,C.green,2.2,7);T('N',px-34,py-2-N*s,{f:'m',s:13,c:C.green})}
 if(Math.abs(S.ay)>.05)arr(cx+cw+14,cy+40,cx+cw+14,cy+40-S.ay*8,C.yellow,2.4,8);
 const[g1,g2]=rows({l:br.l,t:br.t+30,w:br.w,h:br.h-30},[1,1],46);const t0=S.tt-14;const P=Plane(t0,S.tt,-g-1,2*g+1,{l:g1.l+34,t:g1.t,w:g1.w-34,h:g1.h});P.grid(2,{sy:5,minor:false,alpha:.06});P.axes({xs:2,ys:5,xAt:t0,x0:true,xf:()=>'',yl:'a (m/s²)',ls:12});lab(g1,'Akselerasjonen til heisen (positiv er oppover)');if(S.hist.length>1)pth(S.hist.map(q=>P.pt(q[0],q[1])),C.yellow,2.2);
 const km=Math.max(p.m*3.2,10);const Q=Plane(t0,S.tt,0,km,{l:g2.l+34,t:g2.t,w:g2.w-34,h:g2.h});Q.grid(2,{sy:niceStep(km/4),minor:false,alpha:.06});Q.axes({xs:2,ys:niceStep(km/4),xAt:t0,x0:true,y0:true,xf:()=>'',xl:'tid',yl:'kg',ls:12});lab(g2,'Hva vekta viser');ln(Q.l,Q.Y(p.m),Q.l+Q.w,Q.Y(p.m),A(C.fg,.3),1,[4,4]);T('din masse',Q.l+4,Q.Y(p.m)-8,{s:10.5,c:C.fg3});if(S.hist.length>1)pth(S.hist.map(q=>Q.pt(q[0],q[2])),C.green,2.4);
 const st=S.free&&S.ay<0?'Fritt fall: vektløs!':S.ay>.05?'Akselererer oppover: vekta viser mer':S.ay<-.05?'Akselererer nedover: vekta viser mindre':Math.abs(S.vy)>.05?'Konstant fart: vekta viser vanlig vekt':'Heisen står stille';T(st,br.l,br.t+2,{s:13,w:700,c:S.free?C.red:C.fg})},
readout(S){const p=S.p,N=p.m*(9.81+S.ay);return[['etasje',nf(S.y/FL,1)],['akselerasjon',nf(S.ay,2)+' m/s²','yellow'],['fart',nf(S.vy,2)+' m/s'],['normalkraft',nf(N,0)+' N'],['vekta viser',nf(Math.max(0,N/9.81),1)+' kg','green']]}
});
}

/* ---------- Strikkhopp ---------- */
{
const g=9.81,H=100;
function stepJ(S,dt){const p=S.p;const n=20,h=dt/n;for(let i=0;i<n;i++){const ext=Math.max(0,S.s-p.L);const b=ext>0?.08*Math.sqrt(p.k*p.m):0;const F=p.m*g-p.c*S.v*Math.abs(S.v)-p.k*ext-(ext>0?b*S.v:0);const a=F/p.m;S.v+=a*h;S.s+=S.v*h;S.a=a;S.Q+=(p.c*Math.abs(S.v)**3+(ext>0?b*S.v*S.v:0))*h;S.tj+=h;if(S.s>S.smax)S.smax=S.s;S.amax=Math.max(S.amax,Math.abs(a));S.vmax=Math.max(S.vmax,Math.abs(S.v))}}
M({id:'fy-strikkhopp',s:'fy',c:['FY1'],title:'Strikkhopp: en numerisk modell',short:'Strikkhopp',kw:'strikkhopp numerisk metode euler programmering fjærkraft hookes lov luftmotstand energi akselerasjon modell kraft g-kraft',
lead:'Under et strikkhopp endrer kraften seg hele tiden: først fritt fall, så drar strikken stadig hardere. Akselerasjonen er ikke konstant, så vi regner ut bevegelsen steg for steg med en numerisk metode.',
controls:[{id:'m',label:'Masse',min:40,max:120,step:1,value:70,unit:'kg'},{id:'L',label:'Lengde på strikken',min:10,max:60,step:1,value:30,unit:'m'},{id:'k',label:'Stivhet på strikken',min:40,max:400,step:5,value:100,unit:'N/m'},{id:'c',label:'Luftmotstand (k i kv²)',min:0,max:.6,step:.01,value:.25,unit:'kg/m',d:2},
 {id:'sp',label:'Fart på avspillingen',min:.5,max:4,step:.5,value:1,d:1},{type:'btns',items:[['Hopp!',S=>MOD['fy-strikkhopp'].init(S)]]}],
tex:['\\Sigma F=mg-kv^2-k_s\\,(s-L)','a=\\frac{\\Sigma F}{m},\\quad v_{\\text{ny}}=v+a\\,\\Delta t,\\quad s_{\\text{ny}}=s+v\\,\\Delta t'],
about:['De første metrene faller hopperen fritt, bare bremset av lufta. Når strikken er strukket, drar den oppover med en kraft som er proporsjonal med hvor mye den er strukket, som en fjær.','Programmet regner ut summen av kreftene, akselerasjonen, ny fart og ny posisjon, om og om igjen med et lite tidssteg. Det er <strong>Eulers metode</strong>, som du kan programmere selv.','Energien går fra potensiell energi i tyngdefeltet til bevegelsesenergi og så til elastisk energi i strikken. Luftmotstand og indre friksjon i strikken gjør noe av energien om til varme, så svingningene dør ut.','Grafen nederst viser akselerasjonen målt i g. Den største akselerasjonen kommer i bunnen, når strikken er mest strukket, og peker da oppover.'],
tasks:['Finn en strikklengde der hopperen akkurat ikke treffer vannet.','Hva skjer med det laveste punktet hvis en tyngre person hopper med samme strikk?','Hvor stor er den største akselerasjonen, målt i g? Når skjer den?','Hvorfor bør strikken ikke være for stiv?'],
init(S){S.s=0;S.v=0;S.a=g;S.Q=0;S.tj=0;S.smax=0;S.amax=0;S.vmax=0;S.hist=[];S.splash=0},
update(S,dt){stepJ(S,dt*S.p.sp);if(S.s>=H&&!S.splash)S.splash=S.t;if(S.s>H){S.s=H;S.v=Math.min(0,S.v)}if(!S.hist.length||S.tj-S.hist[S.hist.length-1][0]>.05)S.hist.push([S.tj,H-S.s,S.a/g]);if(S.hist.length>1200)S.hist.shift()},
draw(S){const p=S.p;const[bl,br]=split(S,.36,{g:28,b:pad(S,26,26,40)});const P=Plane(-12,12,-6,H+6,bl);
 rct(P.X(-12),P.Y(H+6),P.X(12)-P.X(-12),P.Y(H)-P.Y(H+6),null,A(C.fg,.25));rct(P.X(-12),P.Y(0),P.X(12)-P.X(-12),P.Y(-6)-P.Y(0),null,A(C.blue,.35));T('vann',P.X(-11),P.Y(-3),{s:11,c:C.blue});
 for(let h=0;h<=H;h+=20){ln(P.X(11),P.Y(h),P.X(12),P.Y(h),A(C.fg,.4),1);T(h+' m',P.X(10.6),P.Y(h),{a:'right',f:'n',s:10,c:C.fg3})}
 const jy=P.Y(H-S.s),ax=P.X(0),ay=P.Y(H);const ext=S.s-p.L;if(ext>0)ln(ax,ay,ax,jy-10,C.gold,2.4+Math.min(2,ext/20));else{const pts=[];const sag=p.L-S.s;for(let i=0;i<=30;i++){const u=i/30;const y=lerp(ay,jy-10,u)+Math.sin(u*PI)*sag*P.sy*.5;pts.push([ax+Math.sin(u*PI*3)*3,y])}pth(pts,C.gold,2)}
 ln(ax,ay+Math.max(0,p.L)*P.sy,ax+18,ay+p.L*P.sy,A(C.gold,.35),1,[3,3]);T('L',ax+22,ay+p.L*P.sy,{f:'m',s:13,c:C.gold});
 circ(ax,jy+8,5,C.fg,null,2);ln(ax,jy+3,ax,jy-12,C.fg,2.4);ln(ax,jy-12,ax-5,jy-20,C.fg,2);ln(ax,jy-12,ax+5,jy-20,C.fg,2);ln(ax,jy-4,ax-7,jy+4,C.fg,2);ln(ax,jy-4,ax+7,jy+4,C.fg,2);
 if(S.splash&&S.t-S.splash<2)T('Plask! Strikken er for lang.',P.X(0),P.Y(10),{a:'center',s:13,w:700,c:C.red,bg:A(C.stage,.7)});
 const[g1,g2,g3]=rows(br,[1.2,1,.7],40);const tm=Math.max(20,S.tj);const t0=tm-20;
 const Q=Plane(t0,tm,0,H,{l:g1.l+34,t:g1.t,w:g1.w-34,h:g1.h});Q.grid(2,{sy:20,minor:false,alpha:.06});Q.axes({xs:4,ys:20,xAt:t0,x0:true,y0:true,yl:'høyde (m)',ls:12});lab(g1,'Høyde over vannet');ln(Q.l,Q.Y(H-p.L),Q.l+Q.w,Q.Y(H-p.L),A(C.gold,.4),1,[4,4]);T('strikken strammes',Q.l+Q.w-4,Q.Y(H-p.L)-8,{a:'right',s:10.5,c:C.gold});if(S.hist.length>1)pth(S.hist.map(q=>Q.pt(q[0],q[1])),C.yellow,2.2);
 const am=Math.max(2,...S.hist.map(q=>Math.abs(q[2])))*1.1;const R=Plane(t0,tm,-am,am,{l:g2.l+34,t:g2.t,w:g2.w-34,h:g2.h});R.grid(2,{sy:1,minor:false,alpha:.06});R.axes({xs:4,ys:niceStep(am/2),xAt:t0,x0:true,xl:'t (s)',ls:12});lab(g2,'Akselerasjon i g (positiv er nedover)');if(S.hist.length>1)pth(S.hist.map(q=>R.pt(q[0],q[2])),C.red,2.2);
 const ep=p.m*g*(H-S.s),ek=.5*p.m*S.v*S.v,ee=.5*p.k*Math.max(0,S.s-p.L)**2,E0=p.m*g*H;lab(g3,'Energi');const it=[['tyngde',ep,C.blue],['bevegelse',ek,C.green],['strikken',ee,C.gold],['varme',S.Q,C.red]];const cw=g3.w/4;it.forEach(([n,v,c],i)=>{const x=g3.l+i*cw,w=cw-12;rct(x,g3.t+4,w,10,null,A(C.fg,.08));rct(x,g3.t+4,w*clamp(v/E0,0,1),10,null,A(c,.85));T(n+' '+nf(v/1000,0)+' kJ',x,g3.t+28,{s:11,c:C.fg2})})},
readout(S){return[['laveste punkt',nf(H-S.smax,1)+' m over vannet','yellow'],['største fart',nf(S.vmax,1)+' m/s'],['største akselerasjon',nf(S.amax/g,1)+' g','red']]}
});
}

/* ---------- Ballistisk pendel ---------- */
{
const g=9.81,L=1.5;
M({id:'fy-ballistisk',s:'fy',c:['FY1'],title:'Ballistisk pendel: bevegelsesmengde og energi',short:'Ballistisk pendel',kw:'ballistisk pendel bevegelsesmengde impuls støt uelastisk energi bevaring kule pendel fart mekanisk energi',
lead:'Hvordan måler man farten til en kule? Skyt den inn i en tung kloss som henger i snorer, og se hvor høyt klossen svinger. Støtet bevarer bevegelsesmengden, svingningen etterpå bevarer energien.',
controls:[{id:'m',label:'Masse på kula',min:2,max:50,step:1,value:10,unit:'g'},{id:'v',label:'Fart på kula',min:100,max:900,step:10,value:400,unit:'m/s'},{id:'M',label:'Masse på klossen',min:1,max:10,step:.5,value:4,unit:'kg',d:1},{type:'btns',items:[['Skyt',S=>MOD['fy-ballistisk'].init(S)]]}],
tex:['mv=(m+M)V','\\tfrac12(m+M)V^2=(m+M)gh','v=\\frac{m+M}{m}\\sqrt{2gh}'],
about:['Støtet er <strong>fullstendig uelastisk</strong>: Kula blir sittende i klossen. Under det korte støtet er ytre krefter i vannrett retning neglisjerbare, så <strong>bevegelsesmengden</strong> er bevart.','Det aller meste av kulas bevegelsesenergi blir til varme og deformasjon i støtet. Bare andelen $m/(m+M)$ blir igjen som bevegelsesenergi.','Etter støtet svinger klossen opp. Nå er det bare tyngden og snorkraften som virker, og snorkraften gjør ikke arbeid. Derfor er <strong>mekanisk energi</strong> bevart, og vi kan regne ut farten etter støtet fra høyden.','Ved å kombinere de to bevaringslovene kan vi regne baklengs fra høyden $h$ til kulas fart $v$.'],
tasks:['Regn ut farten til klossen rett etter støtet for standardverdiene.','Hvor mange prosent av kulas bevegelsesenergi blir til varme?','Hvorfor kan vi ikke bruke energibevaring i selve støtet?','Klossen svinger 5,0 cm opp. Kula veier 10 g og klossen 4 kg. Hvor fort gikk kula?'],
calc(p){const m=p.m/1000,V=m*p.v/(m+p.M),h=V*V/(2*g),th=Math.acos(clamp(1-h/L,-1,1));return{m,V,h,th,E0:.5*m*p.v*p.v,E1:.5*(m+p.M)*V*V}},
init(S){S.ph=0;S.ts=0},
update(S,dt){S.ts+=dt;if(S.ph===0&&S.ts>1){S.ph=1;S.ts=0}},
draw(S){const p=S.p,c=this.calc(p);const[bl,br]=split(S,.56,{g:28,b:pad(S,26,26,40)});const sc=Math.min(bl.h/(L+.7),bl.w/(L*2.2)),px=bl.l+bl.w*.5,py=bl.t+16;
 rct(px-L*sc*.6,py-6,L*sc*1.2,6,null,C.fg2);let th=0;if(S.ph===1){const w=Math.sqrt(g/L);th=c.th*Math.sin(w*S.ts)*Math.exp(-S.ts*.12)}
 const bx=px+Math.sin(th)*L*sc,by=py+Math.cos(th)*L*sc;const bw=40+p.M*6,bh=30+p.M*3;ln(px-bw*.3,py,bx-bw*.3,by,C.fg2,1.6);ln(px+bw*.3,py,bx+bw*.3,by,C.fg2,1.6);rr(bx-bw/2,by,bw,bh,4,C.gold,A(C.gold,.35),2);T(nf(p.M,1)+' kg',bx,by+bh/2,{a:'center',f:'n',s:12,c:C.fg});
 if(S.ph===0){const x=lerp(bl.l,px-bw/2,clamp(S.ts,0,1));rct(x-10,by+bh/2-2,10,4,null,C.fg);ln(bl.l,by+bh/2,x-12,by+bh/2,A(C.fg,.25),1,[3,4]);T('v = '+nf(p.v,0)+' m/s',bl.l+4,by+bh/2-14,{f:'n',s:12,c:C.fg})}
 const h0=py+L*sc+bh/2,hm=py+Math.cos(c.th)*L*sc+bh/2;if(S.ph===1){const hx=px-L*sc*.55;ln(hx-14,h0,hx+14,h0,A(C.fg,.4),1);ln(hx-14,hm,px+L*sc*.4,hm,A(C.yellow,.5),1,[3,3]);arr(hx,h0,hx,hm,C.yellow,1.6,6);T('h = '+nf(c.h*100,1)+' cm',hx-18,(h0+hm)/2,{a:'right',f:'n',s:12,c:C.yellow})}
 const[g1,g2]=rows(br,[1,1],46);const bar=(g,lbl,a,b2,unit,f)=>{lab(g,lbl);const mx=Math.max(a,b2);const w=g.w-110;[[a,'før støtet',C.blue],[b2,'etter støtet',C.green]].forEach(([v,n,col],i)=>{const y=g.t+8+i*34;T(n,g.l,y+10,{s:12,c:C.fg2});rct(g.l+80,y,w*v/mx,20,null,A(col,.8));T(f(v)+' '+unit,g.l+86+w*v/mx,y+10,{f:'n',s:12,c:C.fg})})};
 bar(g1,'Bevegelsesmengde (bevart)',c.m*p.v,(c.m+p.M)*c.V,'kg·m/s',v=>nf(v,2));bar(g2,'Bevegelsesenergi (ikke bevart i støtet)',c.E0,c.E1,'J',v=>nf(v,v<10?2:0));
 T(`${nf((1-c.E1/c.E0)*100,1)} % av energien blir til varme og deformasjon`,g2.l,g2.t+86,{s:12.5,c:C.red});Twrap(`Baklengs: v = (m+M)/m · √(2gh) = ${nf((c.m+p.M)/c.m,1)} · ${nf(Math.sqrt(2*g*c.h),3)} = ${nf(p.v,0)} m/s`,g2.l,g2.t+108,g2.w,{f:'n',s:12,c:C.fg2})},
readout(S){const c=this.calc(S.p);return[['fart etter støtet',nf(c.V,3)+' m/s','green'],['høyde',nf(c.h*100,2)+' cm','yellow'],['utslag',nf(deg(c.th),1)+'°'],['energitap',nf((1-c.E1/c.E0)*100,1)+' %','red']]},
live(S){const c=this.calc(S.p);return `V=\\frac{mv}{m+M}=\\frac{${tn(c.m,3)}\\cdot ${S.p.v}}{${tn(c.m+S.p.M,3)}}=${tn(c.V,3)}\\ \\text{m/s}`}
});
}

/* ---------- Spesifikk varmekapasitet ---------- */
{
const MAT={al:['Aluminium',900,'teal'],fe:['Jern',450,'grey'],cu:['Kobber',385,'gold'],pb:['Bly',130,'purple'],glass:['Glass',840,'blue'],vann:['Varmt vann',4180,'red']};
const SAMP=[['Vann',4180,'blue'],['Matolje',1970,'gold'],['Aluminium',900,'teal'],['Kobber',385,'red']];
M({id:'fy-varmekapasitet',s:'fy',c:['FY1'],title:'Spesifikk varmekapasitet: varmt og kaldt blandes',short:'Varmekapasitet',kw:'spesifikk varmekapasitet varme temperatur energi blanding termisk likevekt kalorimeter q=mcδt vann metall',
lead:'Slipp en varm metallkloss ned i kaldt vann. Varme går fra det varme til det kalde til temperaturen er lik. Hvor den havner, avhenger av massene og av hvor mye energi stoffene trenger for å bli varmere.',
controls:[{id:'mode',type:'seg',label:'Forsøk',value:'bland',options:[['bland','Kloss i vann'],['varm','Varm opp ulike stoffer']]},{id:'mat',type:'sel',label:'Klossen er av',value:'al',options:Object.entries(MAT).map(([k,v])=>[k,v[0]+' ('+v[1]+' J/(kg·K))']),show:S=>S.p.mode==='bland'},
 {id:'m1',label:'Masse på klossen',min:.1,max:2,step:.05,value:.5,unit:'kg',d:2,show:S=>S.p.mode==='bland'},{id:'T1',label:'Temperatur på klossen',min:40,max:300,step:1,value:100,unit:'°C',show:S=>S.p.mode==='bland'},
 {id:'m2',label:'Masse vann',min:.1,max:2,step:.05,value:.5,unit:'kg',d:2,show:S=>S.p.mode==='bland'},{id:'T2',label:'Temperatur på vannet',min:0,max:40,step:1,value:20,unit:'°C',show:S=>S.p.mode==='bland'},{type:'btns',items:[['Start på nytt',S=>MOD['fy-varmekapasitet'].init(S)]]}],
tex:['Q=m\\,c\\,\\Delta T','Q_{\\text{avgitt}}=Q_{\\text{mottatt}}','T=\\frac{m_1c_1T_1+m_2c_2T_2}{m_1c_1+m_2c_2}'],
about:['<strong>Spesifikk varmekapasitet</strong> $c$ er hvor mye energi som trengs for å varme opp 1 kg av et stoff med 1 °C. Vann har svært høy varmekapasitet: 4180 J/(kg·K). Metaller har lav.','Temperatur er et mål på hvor fort partiklene beveger seg i gjennomsnitt. Når varme partikler støter mot kalde, overføres energi, og temperaturene nærmer seg hverandre til de er like: <strong>termisk likevekt</strong>.','Når ingen energi går tapt til omgivelsene, er energien klossen avgir lik energien vannet mottar. Det gir formelen for sluttemperaturen.','Den høye varmekapasiteten til vann gjør at havet jevner ut temperaturen. Kystklima har mildere vintre og kjøligere somre enn innlandsklima.'],
tasks:['Hvilken sluttemperatur får du med 0,5 kg aluminium på 100 °C i 0,5 kg vann på 20 °C? Regn ut og sjekk.','Bytt til bly med samme masse. Hvorfor blir vannet nesten ikke varmere?','Hvor lang tid tar det å varme 1 kg vann med 30 °C med en kokeplate på 500 W?','Hvorfor blir sanden på stranda varmere enn vannet en solskinnsdag?'],
init(S){const p=S.p;S.Tb=p.T1;S.Tw=p.T2;S.tt=0;S.hist=[]},
change(S,id){this.init(S)},
update(S,dt){const p=S.p;if(p.mode==='varm'){S.tt=Math.min(S.tt+dt*20,600);return}const c1=MAT[p.mat][1],C1=p.m1*c1,C2=p.m2*4180,k=25;const n=10,h=dt*3/n;for(let i=0;i<n;i++){const P=k*(S.Tb-S.Tw);S.Tb-=P*h/C1;S.Tw+=P*h/C2}S.tt+=dt*3;if(!S.hist.length||S.tt-S.hist[S.hist.length-1][0]>.2)S.hist.push([S.tt,S.Tb,S.Tw])},
draw(S){const p=S.p;if(p.mode==='varm')return this.varm(S);const mt=MAT[p.mat],c1=mt[1],C1=p.m1*c1,C2=p.m2*4180,Tf=(C1*p.T1+C2*p.T2)/(C1+C2);
 const[bl,br]=split(S,.42,{g:28,b:pad(S,26,26,40)});const cw=Math.min(bl.w*.7,bl.h*.65),ch=cw*1.05,cx=bl.l+(bl.w-cw)/2,cy=bl.t+bl.h-ch-24;
 rr(cx-8,cy-6,cw+16,ch+14,8,A(C.fg,.35),A(C.fg,.05),2);T('isolert beger',cx+cw/2,cy+ch+22,{a:'center',s:11,c:C.fg3});const wl=cy+ch*(1-.55*Math.min(1,p.m2/1.2)-.25);rct(cx,wl,cw,cy+ch-wl,null,mix(C.blue,C.red,clamp((S.Tw-0)/100,0,1)*.6,.3));
 const tcol=T_=>ramp([C.blue,C.teal,C.yellow,C.red],clamp(T_/300,0,1));const bs=Math.min(cw*.45,30+p.m1*30),bx=cx+cw/2-bs/2,by=cy+ch-bs-8;rr(bx,by,bs,bs,4,A(C.fg,.6),A(tcol(S.Tb),.85),1.5);
 const rg=rng(5);for(let i=0;i<40;i++){const x0=cx+8+rg()*(cw-16),y0=wl+8+rg()*(cy+ch-wl-16);if(x0>bx-4&&x0<bx+bs+4&&y0>by-4)continue;const amp=1+S.Tw/12;dot(x0+Math.sin(S.t*20+i)*amp,y0+Math.cos(S.t*17+i*1.3)*amp,2,A(C.blue,.9))}
 for(let i=0;i<9;i++){const amp=1+S.Tb/40;dot(bx+bs*(.2+.3*(i%3))+Math.sin(S.t*25+i)*amp,by+bs*(.2+.3*Math.floor(i/3))+Math.cos(S.t*23+i)*amp,2.4,C.stage)}
 T(`kloss ${nf(S.Tb,1)} °C`,bx+bs/2,by-10,{a:'center',f:'n',s:12,c:tcol(S.Tb)});T(`vann ${nf(S.Tw,1)} °C`,cx+6,wl-10,{f:'n',s:12,c:C.blue});
 const[g1,g2]=rows(br,[1.4,1],46);const tm=Math.max(60,S.tt);const P=Plane(0,tm,0,Math.max(p.T1,40)*1.08,{l:g1.l+34,t:g1.t,w:g1.w-34,h:g1.h});P.grid(niceStep(tm/5),{sy:niceStep(p.T1/4),minor:false,alpha:.06});P.axes({xs:niceStep(tm/5),ys:niceStep(p.T1/4),x0:true,y0:true,xl:'tid (s)',yl:'°C',ls:12});lab(g1,'Temperaturene nærmer seg hverandre');
 ln(P.l,P.Y(Tf),P.l+P.w,P.Y(Tf),A(C.fg,.4),1.2,[5,4]);T('likevekt '+nf(Tf,1)+' °C',P.l+P.w-4,P.Y(Tf)-9,{a:'right',f:'n',s:11.5,c:C.fg});if(S.hist.length>1){pth(S.hist.map(h=>P.pt(h[0],h[1])),C[mt[2]],2.4);pth(S.hist.map(h=>P.pt(h[0],h[2])),C.blue,2.4)}
 const Qa=C1*(p.T1-S.Tb),Qm=C2*(S.Tw-p.T2),Qmax=C1*(p.T1-Tf);lab(g2,'Energi (kJ)');[[Qa,'klossen har avgitt',C[mt[2]]],[Qm,'vannet har mottatt',C.blue]].forEach(([v,n,col],i)=>{const y=g2.t+8+i*30;T(n,g2.l,y+9,{s:12,c:C.fg2});const w=(g2.w-200)*v/(Qmax||1);rct(g2.l+130,y,w,18,null,A(col,.8));T(nf(v/1000,2)+' kJ',g2.l+136+w,y+9,{f:'n',s:12,c:C.fg})})},
varm(S){const t=S.tt,P_=500;const[bl,br]=split(S,.45,{g:28,b:pad(S,26,26,40)});const n=SAMP.length,cw=bl.w/n;
 SAMP.forEach(([nm,c,col],i)=>{const T_=Math.min(100,20+P_*t/(1*c));const x=bl.l+i*cw+cw*.15,w=cw*.7,y=bl.t+bl.h*.3,h=bl.h*.5;rr(x,y,w,h,6,A(C.fg,.4),A(C[col],.25+.5*(T_-20)/80),1.6);T(nm,x+w/2,y-14,{a:'center',s:12,w:700,c:C[col]});T(nf(T_,1)+' °C',x+w/2,y+h/2,{a:'center',f:'n',s:13,c:C.fg});glow(x+w/2,y+h+16,14,C.red,.5);T('500 W',x+w/2,y+h+32,{a:'center',f:'n',s:10.5,c:C.fg3})});
 T('Alle prøvene er 1 kg og får like mye effekt',bl.l,bl.t+10,{s:13,c:C.fg2});
 const Q=Plane(0,600,20,105,{l:br.l+34,t:br.t,w:br.w-34,h:br.h-30});Q.grid(100,{sy:20,minor:false,alpha:.06});Q.axes({xs:100,ys:20,x0:true,y0:true,xAt:0,yAt:20,xl:'tid (s)',yl:'°C',ls:12});lab(br,'Temperatur mot tid');
 SAMP.forEach(([nm,c,col])=>{Q.fn(x=>Math.min(100,20+P_*x/c),C[col],2.4,{to:t,prog:1});const T_=Math.min(100,20+P_*t/c);dot(Q.X(t),Q.Y(T_),4,C[col])})},
readout(S){const p=S.p;if(p.mode==='varm')return[['tid',nf(S.tt,0)+' s'],['vann',nf(Math.min(100,20+500*S.tt/4180),1)+' °C','blue'],['kobber',nf(Math.min(100,20+500*S.tt/385),1)+' °C','red']];const c1=MAT[p.mat][1],C1=p.m1*c1,C2=p.m2*4180;return[['kloss',nf(S.Tb,1)+' °C'],['vann',nf(S.Tw,1)+' °C','blue'],['likevekt',nf((C1*p.T1+C2*p.T2)/(C1+C2),1)+' °C']]},
live(S){const p=S.p;if(p.mode==='varm')return'\\Delta T=\\frac{P\\,t}{m\\,c}';const c1=MAT[p.mat][1];return `T=\\frac{${tn(p.m1,2)}\\cdot ${c1}\\cdot ${p.T1}+${tn(p.m2,2)}\\cdot 4180\\cdot ${p.T2}}{${tn(p.m1,2)}\\cdot ${c1}+${tn(p.m2,2)}\\cdot 4180}=${tn((p.m1*c1*p.T1+p.m2*4180*p.T2)/(p.m1*c1+p.m2*4180),1)}\\ ^\\circ\\text{C}`}
});
}

/* ---------- Strøm og spenning: komponenter ---------- */
{
const RHO={cu:['Kobber',1.7e-8],al:['Aluminium',2.7e-8],fe:['Jern',1.0e-7],kon:['Konstantan',4.9e-7],nik:['Nikrom',1.1e-6]};
const VT=.02585;
const comp={mot:{n:'Motstand',I:(U,p)=>U/p.R,rv:0,ur:[-6,12]},lampe:{n:'Lyspære (12 V, 6 W)',I:(U)=>U/(2+22*Math.pow(Math.min(Math.abs(U),20)/12,.8)),rv:0,ur:[-6,12]},
 diode:{n:'Silisiumdiode',I:U=>1e-11*(Math.exp(clamp(U,-50,1.2)/(1.2*VT))-1),rv:100,ur:[-1.5,1.2]},led:{n:'Rød lysdiode (LED)',I:U=>2e-18*(Math.exp(clamp(U,-50,2.6)/(2*VT))-1),rv:100,ur:[-1.5,2.6]},
 tr:{n:'Ledning',I:(U,p)=>U/Rw(p),rv:0,ur:[-6,12]}};
const Rw=p=>RHO[p.mat][1]*p.L/(p.A*1e-6);
function solve(p){const c=comp[p.k],Uk=p.U;if(!c.rv)return{U:Uk,I:c.I(Uk,p)};let lo=Math.min(0,Uk),hi=Math.max(0,Uk);for(let i=0;i<80;i++){const m=(lo+hi)/2;const f=c.I(m,p)*c.rv+m-Uk;if(f>0)hi=m;else lo=m}const U=(lo+hi)/2;return{U,I:c.I(U,p)}}
M({id:'fy-iu',s:'fy',c:['FY1'],title:'Strøm og spenning: motstand, lyspære og diode',short:'I–U-karakteristikk',kw:'strøm spenning resistans ohms lov iu-karakteristikk motstand lyspære diode lysdiode led resistivitet ledning effekt komponent krets',
lead:'Mål strømmen gjennom en komponent ved ulike spenninger, og tegn sammenhengen. For en vanlig motstand blir det en rett linje: Ohms lov. En lyspære og en diode oppfører seg helt annerledes.',
controls:[{id:'k',type:'seg',label:'Komponent',value:'mot',options:Object.entries(comp).map(([k,v])=>[k,v.n.split(' (')[0]])},{id:'U',label:'Spenning fra spenningskilden',min:-6,max:12,step:.05,value:6,unit:'V',d:2},
 {id:'R',label:'Resistans',min:10,max:500,step:5,value:100,unit:'Ω',show:S=>S.p.k==='mot'},{id:'mat',type:'sel',label:'Materiale',value:'kon',options:Object.entries(RHO).map(([k,v])=>[k,v[0]]),show:S=>S.p.k==='tr'},{id:'L',label:'Lengde',min:.1,max:10,step:.1,value:2,unit:'m',d:1,show:S=>S.p.k==='tr'},{id:'A',label:'Tverrsnitt',min:.05,max:2.5,step:.05,value:.2,unit:'mm²',d:2,show:S=>S.p.k==='tr'}],
tex:['U=R\\cdot I','R=\\rho\\frac{L}{A}','P=U\\cdot I'],
about:['For en vanlig <strong>motstand</strong> er strømmen proporsjonal med spenningen. Grafen blir en rett linje gjennom origo, og resistansen $R=U/I$ er konstant. Det er <strong>Ohms lov</strong>.','I en <strong>lyspære</strong> blir glødetråden flere tusen grader varm. Varme metaller har høyere resistans, så kurven bøyer av: Strømmen øker mindre enn spenningen.','En <strong>diode</strong> slipper strøm bare én vei, og først når spenningen er over omtrent 0,6 V for silisium og omtrent 1,8 V for en rød lysdiode. Derfor er det koblet en formotstand på 100 Ω i serie, ellers kunne strømmen blitt så stor at dioden ble ødelagt.','For en <strong>ledning</strong> avhenger resistansen av materialet (resistiviteten $\\rho$), lengden og tverrsnittet. Dobbel lengde gir dobbel resistans, dobbelt tverrsnitt gir halv resistans.'],
tasks:['Mål strømmen ved 3 V og 6 V for motstanden. Stemmer Ohms lov?','Regn ut resistansen i lyspæra ved 2 V og ved 12 V. Hvorfor er den forskjellig?','Snu spenningen for dioden. Hva skjer med strømmen?','Hvor lang må en konstantantråd med tverrsnitt 0,2 mm² være for å få 10 Ω?'],
init(S){S.el=[...Array(18)].map((_,i)=>i/18)},
update(S,dt){const r=solve(S.p);S.el=S.el.map(v=>((v+dt*clamp(r.I*(S.p.k==='diode'||S.p.k==='led'?20:2),-1.5,1.5)*.3)%1+1)%1)},
draw(S){const p=S.p,c=comp[p.k],r=solve(p);const[bl,br]=split(S,.42,{g:28,b:pad(S,30,30,40)});
 const L=bl.l+20,R_=bl.l+bl.w-20,Tp=bl.t+bl.h*.18,Bt=bl.t+bl.h*.72;const path=[[L,Bt],[L,Tp],[R_,Tp],[R_,Bt],[L,Bt]];pth(path,A(C.fg,.6),2);
 const along=f=>{const segs=[[L,Bt,L,Tp],[L,Tp,R_,Tp],[R_,Tp,R_,Bt],[R_,Bt,L,Bt]];const lens=segs.map(s=>Math.hypot(s[2]-s[0],s[3]-s[1]));const tot=lens.reduce((a,b)=>a+b,0);let d=f*tot;for(let i=0;i<4;i++){if(d<=lens[i]){const t=d/lens[i],s=segs[i];return[lerp(s[0],s[2],t),lerp(s[1],s[3],t)]}d-=lens[i]}return[L,Bt]};
 S.el.forEach(f=>{const[x,y]=along(f);dot(x,y,2.4,C.yellow)});
 rct(L-14,(Tp+Bt)/2-3,28,6,null,C.stage);ln(L-14,(Tp+Bt)/2-4,L+14,(Tp+Bt)/2-4,C.fg,2.4);ln(L-8,(Tp+Bt)/2+4,L+8,(Tp+Bt)/2+4,C.fg,4);T(nf(p.U,2)+' V',L+18,(Tp+Bt)/2,{f:'n',s:12,c:C.fg});
 const cx=(L+R_)/2,cy=Tp;rct(cx-34,cy-14,68,28,null,C.stage);
 if(p.k==='mot'||p.k==='tr'){rr(cx-28,cy-10,56,20,2,C.fg,A(C.fg,.08),2)}else if(p.k==='lampe'){const P=Math.abs(r.U*r.I);glow(cx,cy,16+P*4,C.yellow,clamp(P/6,0,1)*.8);circ(cx,cy,12,C.fg,A(C.yellow,clamp(P/6,0,1)*.6),2);ln(cx-8,cy-8,cx+8,cy+8,C.fg,1.4);ln(cx-8,cy+8,cx+8,cy-8,C.fg,1.4)}
 else{poly([[cx-10,cy-11],[cx-10,cy+11],[cx+9,cy]],C.fg,A(C.fg,.15),2);ln(cx+10,cy-11,cx+10,cy+11,C.fg,2.4);if(p.k==='led'){const on=r.I>1e-3;if(on)glow(cx,cy,20+r.I*400,C.red,clamp(r.I*40,0,.9));arr(cx+4,cy-14,cx+12,cy-24,on?C.red:C.fg3,1.4,5);arr(cx+10,cy-12,cx+18,cy-22,on?C.red:C.fg3,1.4,5)}}
 if(c.rv){rct(R_-14,(Tp+Bt)/2-20,28,40,null,C.stage);rr(R_-8,(Tp+Bt)/2-18,16,36,2,C.fg2,null,1.8);T('100 Ω',R_+14,(Tp+Bt)/2,{f:'n',s:11,c:C.fg2})}
 const vy=Tp-38;ln(cx-30,cy,cx-30,vy,A(C.teal,.6),1.2,[3,3]);ln(cx+30,cy,cx+30,vy,A(C.teal,.6),1.2,[3,3]);circ(cx,vy,12,C.teal,C.stage,1.6);T('V',cx,vy,{a:'center',s:12,w:700,c:C.teal});T(nf(r.U,3)+' V',cx+18,vy,{f:'n',s:12,c:C.teal});
 const ax=(L+cx)/2;circ(ax,Tp,12,C.gold,C.stage,1.6);T('A',ax,Tp,{a:'center',s:12,w:700,c:C.gold});const Iabs=Math.abs(r.I);T((Iabs<.1?nf(r.I*1000,Iabs<1e-3?4:1)+' mA':nf(r.I,3)+' A'),ax,Tp+24,{a:'center',f:'n',s:12,c:C.gold});
 T(c.n,bl.l,bl.t+bl.h-10,{s:13,w:700,c:C.fg});if(p.k==='tr')T(`R = ρ·L/A = ${nf(Rw(p),2)} Ω`,bl.l,bl.t+bl.h+10,{f:'n',s:12,c:C.fg2});
 const[u0,u1]=c.ur;let imax=0;for(let i=0;i<=200;i++){const U=u0+(u1-u0)*i/200;imax=Math.max(imax,Math.abs(c.I(U,p)))}const diode=p.k==='diode'||p.k==='led';if(diode)imax=Math.min(imax,.12);imax*=1.1;const mA=imax<.2;
 const P=Plane(u0,u1,-imax*(diode?.25:1),imax,br);P.grid(niceStep((u1-u0)/6),{sy:niceStep(imax/4),minor:false,alpha:.06});P.axes({xs:niceStep((u1-u0)/6),ys:niceStep(imax/4),yf:v=>mA?nf(v*1000,0):nf(v,2),xl:'U (V)',yl:mA?'I (mA)':'I (A)',ls:12});lab(br,'I–U-karakteristikk for komponenten');
 P.clip(()=>P.fn(U=>c.I(U,p),C.teal,2.6,{prog:1}));if(r.U>=u0&&r.U<=u1)dot(P.X(r.U),P.Y(clamp(r.I,P.y0,P.y1)),6,C.yellow);
 if(p.k==='mot'||p.k==='tr')T('rett linje: Ohms lov',P.X(u1*.55),P.Y(c.I(u1*.55,p))-14,{s:11.5,c:C.fg2});if(p.k==='lampe')T('kurven bøyer av: R øker',P.X(u1*.55),P.Y(c.I(u1*.55,p))-14,{s:11.5,c:C.fg2});if(diode)T('sperrer',P.X(u0*.6),P.Y(0)-12,{a:'center',s:11.5,c:C.fg2})},
readout(S){const r=solve(S.p);const R=Math.abs(r.I)>1e-9?r.U/r.I:Infinity;return[['spenning over',nf(r.U,3)+' V','teal'],['strøm',Math.abs(r.I)<.1?nf(r.I*1000,Math.abs(r.I)<1e-3?4:2)+' mA':nf(r.I,3)+' A','gold'],['R = U/I',isFinite(R)&&Math.abs(R)<1e7?nf(R,1)+' Ω':'svært stor'],['effekt',nf(r.U*r.I*1000,1)+' mW']]}
});
}

/* ---------- Strømforsyning: vind, sol, vann og gass ---------- */
{
const HRS=168;
const dem=(h,su)=>{const hr=h%24,day=Math.floor(h/24),we=day>=5?.93:1;const base=su?2600:4200;return base*we*(.82+.1*Math.sin(TAU*(hr-6)/24)+.1*Math.exp(-(((hr-8.5)/2)**2))+.08*Math.exp(-(((hr-18)/2.5)**2)))};
const sunf=(h,su,rg)=>{const hr=h%24,day=Math.floor(h/24);const[r,s,mx]=su?[4,22,.75]:[9.5,15.5,.28];if(hr<r||hr>s)return 0;return mx*Math.sin(PI*(hr-r)/(s-r))*rg[day]};
const windf=(h,w)=>{const m={stille:.12,normal:.38,storm:.7}[w];const x=m+.28*Math.sin(h*.11+1)+.15*Math.sin(h*.29+2)+.08*Math.sin(h*.73);return clamp(x,0,1)};
function sim(p){const su=p.ses==='sommer';const rg=[...Array(7)].map((_,i)=>[.9,.35,.7,1,.5,.8,.6][i]*(su?1:.8));const out=[];let tot={sol:0,vind:0,vann:0,gass:0,over:0,dem:0};
 for(let h=0;h<HRS;h++){const D=dem(h,su),so=p.sol*sunf(h,su,rg),vi=p.vind*windf(h,p.w);let rest=D-so-vi;let va=0,ga=0,ov=0;if(rest<0){ov=-rest;rest=0}va=Math.min(p.vann,rest);ga=rest-va;out.push({D,so,vi,va,ga,ov});tot.sol+=Math.min(so,D);tot.vind+=Math.min(vi,Math.max(0,D-Math.min(so,D)));tot.vann+=va;tot.gass+=ga;tot.over+=ov;tot.dem+=D}return{out,tot}}
M({id:'fy-energikilder',s:'fy',c:['FY1','NAT','GEO'],title:'Strømforsyning: vind, sol, vann og gass',short:'Energimiks',kw:'energi klima strøm kraftproduksjon vindkraft solkraft vannkraft gasskraft fornybar co2 utslipp regulerbar forbruk effekt energimiks',
lead:'Strømmen må produseres i samme øyeblikk som den brukes. Sol og vind varierer med været, mens vannkraft kan reguleres. Bygg ut kraftsystemet og se om forbruket dekkes en hel uke, og hvor mye CO₂ det blir.',
controls:[{id:'ses',type:'seg',label:'Årstid',value:'vinter',options:[['vinter','Vinter'],['sommer','Sommer']]},{id:'w',type:'seg',label:'Vær denne uka',value:'normal',options:[['stille','Lite vind'],['normal','Vanlig'],['storm','Mye vind']]},
 {id:'sol',label:'Solkraft (installert)',min:0,max:4000,step:100,value:500,unit:'MW'},{id:'vind',label:'Vindkraft (installert)',min:0,max:5000,step:100,value:1500,unit:'MW'},{id:'vann',label:'Vannkraft (største effekt)',min:0,max:5000,step:100,value:2500,unit:'MW'}],
tex:['E=P\\cdot t','1\\ \\text{GWh}=1000\\ \\text{MWh}','\\text{gasskraft: ca. 0,4 kg CO}_2\\text{ per kWh}'],
about:['Kurven øverst er forbruket. Det er høyest om vinteren og på dagtid, med topper om morgenen og ettermiddagen. Produksjonen må hele tiden være like stor.','<strong>Solkraft</strong> gir bare om dagen, og lite om vinteren i Norge. <strong>Vindkraft</strong> varierer med været. Når sol og vind ikke dekker forbruket, brukes <strong>vannkraft</strong>, som kan skrus opp og ned fordi vannet kan lagres i magasiner. Resten dekkes her av gasskraft med CO₂-utslipp.','Når sol og vind gir mer enn forbruket, blir det overskudd. Det kan eksporteres, lagres (for eksempel ved å spare vann i magasinene), eller produksjonen må stoppes.','Påstander om energi og klima bør sjekkes med tall: Hvor mye installert effekt? Hvor stor andel av tiden produserer den? Hva gjør vi når det er vindstille om vinteren? Modellen er forenklet og bygger ikke på data fra et bestemt land.'],
tasks:['Hvor mye gasskraft trengs en vindstille vinteruke med standardinnstillingene?','Hvor mye solkraft må du bygge for å merke forskjell om vinteren? Enn om sommeren?','Hvorfor er vannkraft så verdifull i et kraftsystem med mye vind og sol?','Vurder påstanden: «Vi kan bare bygge mer vindkraft, så slipper vi utslipp.»'],
init(S){S.cur=0},
update(S,dt){S.cur=(S.cur+dt*8)%HRS},
draw(S){const p=S.p,{out,tot}=sim(p);const b=pad(S,26,30,40);const[top,bot]=rows(b,[1.6,1],48);const ym=Math.max(...out.map(o=>Math.max(o.D,o.so+o.vi)))*1.08;
 const P=Plane(0,HRS,0,ym,{l:top.l+40,t:top.t,w:top.w-40,h:top.h});P.grid(24,{sy:niceStep(ym/4),minor:false,alpha:.06});P.axes({xs:24,ys:niceStep(ym/4),x0:true,y0:true,xf:x=>['man','tir','ons','tor','fre','lør','søn',''][Math.round(x/24)]||'',yl:'MW',ls:12});if(isWide(S))lab(top,'Produksjon og forbruk gjennom en uke');
 const layer=(f0,f1,col)=>{const pts=[];for(let h=0;h<HRS;h++)pts.push(P.pt(h,f1(out[h])));for(let h=HRS-1;h>=0;h--)pts.push(P.pt(h,f0(out[h])));poly(pts,null,col)};
 const s1=o=>Math.min(o.so,o.D),s2=o=>Math.min(o.so+o.vi,o.D),s3=o=>s2(o)+o.va,s4=o=>s3(o)+o.ga;
 layer(o=>0,s1,A(C.yellow,.75));layer(s1,s2,A(C.teal,.75));layer(s2,s3,A(C.blue,.75));layer(s3,s4,A(C.grey,.75));layer(o=>o.D,o=>o.D+o.ov,A(C.green,.25));
 pth(out.map((o,h)=>P.pt(h,o.D)),C.fg,2);ln(P.X(S.cur),P.t,P.X(S.cur),P.Y(0),A(C.fg,.4),1,[3,3]);
 const LG=[['sol',C.yellow],['vind',C.teal],['vann',C.blue],['gass',C.grey],['overskudd',A(C.green,.5)],['forbruk',C.fg]];let lx=top.l+top.w-LG.reduce((a,[n])=>a+tw(n,{s:11})+30,0);LG.forEach(([n,c])=>{rct(lx,top.t-15,12,8,null,c);T(n,lx+16,top.t-11,{s:11,c:C.fg2});lx+=tw(n,{s:11})+30});
 const[g1,g2]=cols(bot,[1.3,1],34);const tw_=tot.sol+tot.vind+tot.vann+tot.gass;const items=[['Sol',tot.sol,C.yellow],['Vind',tot.vind,C.teal],['Vann',tot.vann,C.blue],['Gass',tot.gass,C.grey]];
 lab(g1,`Energi denne uka: ${nf(tot.dem/1000,0)} GWh`);let x=g1.l;items.forEach(([n,v,c])=>{const w=g1.w*v/tw_;rct(x,g1.t+4,w,24,null,A(c,.8));if(w>48)T(nf(v/tw_*100,0)+' %',x+w/2,g1.t+16,{a:'center',f:'n',s:11.5,c:C.stage});x+=w});
 items.forEach(([n,v,c],i)=>{T(`${n}: ${nf(v/1000,0)} GWh`,g1.l+(i%2)*g1.w/2,g1.t+46+Math.floor(i/2)*18,{f:'n',s:12,c})});T(`Overskudd: ${nf(tot.over/1000,0)} GWh`,g1.l,g1.t+86,{f:'n',s:12,c:C.green});
 const co2=tot.gass*1000*.4/1000;lab(g2,'Utslipp og andel fornybar');T(`${nf((1-tot.gass/tw_)*100,0)} % fornybar`,g2.l,g2.t+14,{f:'n',s:18,w:700,c:C.green});T(`${nf(co2,0)} tonn CO₂`,g2.l,g2.t+42,{f:'n',s:18,w:700,c:co2>0?C.red:C.fg2});T('fra gasskraften',g2.l,g2.t+64,{s:11.5,c:C.fg3})},
readout(S){const{tot}=sim(S.p);const tw_=tot.sol+tot.vind+tot.vann+tot.gass;return[['forbruk',nf(tot.dem/1000,0)+' GWh'],['fornybar',nf((1-tot.gass/tw_)*100,0)+' %','green'],['gasskraft',nf(tot.gass/1000,1)+' GWh'],['CO₂',nf(tot.gass*.4,0)+' tonn','red']]}
});
}

/* ---------- Energikvalitet: varmepumpe og panelovn ---------- */
{
const COP=(To,Ti)=>{const Th=Ti+15+273.15,Tc=To-6+273.15;const car=Th/(Th-Tc);return clamp(.45*car,1.2,7)};
M({id:'fy-varmepumpe',s:'fy',c:['FY1'],title:'Energikvalitet: varmepumpe og panelovn',short:'Varmepumpe',kw:'energikvalitet varmepumpe panelovn virkningsgrad cop varme elektrisk energi entropi termodynamikk oppvarming hus strøm kostnad',
lead:'En panelovn gjør 1 kWh strøm om til 1 kWh varme. En varmepumpe bruker strømmen til å hente varme fra uteluften, og kan gi 3–4 kWh varme per kWh strøm. Hvordan er det mulig?',
controls:[{id:'To',label:'Temperatur ute',min:-25,max:15,step:1,value:0,unit:'°C'},{id:'Ti',label:'Temperatur inne',min:16,max:24,step:1,value:21,unit:'°C'},{id:'pr',label:'Strømpris',min:.3,max:4,step:.1,value:1.5,unit:'kr/kWh',d:1}],
tex:['\\text{COP}=\\frac{Q_{\\text{varme ut}}}{E_{\\text{strøm}}}','\\text{COP}_{\\max}=\\frac{T_{\\text{varm}}}{T_{\\text{varm}}-T_{\\text{kald}}}\\ \\text{(i kelvin)}'],
about:['<strong>Energikvalitet</strong>: Elektrisk energi kan gjøres om til nesten hva som helst, og har høy kvalitet. Varme ved romtemperatur har lav kvalitet: Den kan bare brukes til å holde noe varmt. Energi går aldri tapt, men kvaliteten synker i alle omforminger.','En panelovn gjør elektrisk energi om til varme med virkningsgrad nær 100 %. Det høres bra ut, men den bruker høykvalitetsenergi til noe som lavkvalitetsenergi kunne gjort.','En <strong>varmepumpe</strong> virker som et kjøleskap baklengs: Den pumper varme fra kald uteluft inn i huset. Strømmen driver pumpen. Varmen som kommer inn, er strømmen pluss varmen hentet ute. Forholdet kalles <strong>COP</strong>.','Jo kaldere det er ute, jo hardere må pumpen jobbe, og COP synker. Den teoretiske grensen bestemmes av temperaturene i kelvin. Huset her trenger varme etter hvor kaldt det er ute.'],
tasks:['Hva er COP når det er 0 °C ute? Hvor mye strøm sparer du sammenlignet med panelovn?','Hvorfor synker COP når det blir kaldere ute?','Er det i strid med energibevaring at varmepumpen gir mer varme enn strømmen den bruker? Forklar.','Regn ut hva det koster å varme huset en kald dag med panelovn og med varmepumpe.'],
init(S){S.q=[]},
update(S,dt){const p=S.p,cop=COP(p.To,p.Ti);const need=Math.max(0,.15*(p.Ti-p.To));const rate=need*6;S.acc=(S.acc||0)+dt*rate;while(S.acc>=1){S.acc-=1;S.q.push({side:0,k:'el',t:0,x:Math.random()});S.q.push({side:1,k:'el',t:0,x:Math.random(),skip:Math.random()>1/cop});if(Math.random()<1-1/cop)S.q.push({side:1,k:'ute',t:0,x:Math.random()})}S.q=S.q.filter(q=>!q.skip);S.q.forEach(q=>q.t+=dt*.5);S.q=S.q.filter(q=>q.t<1)},
draw(S){const p=S.p,cop=COP(p.To,p.Ti),need=Math.max(0,.15*(p.Ti-p.To))*24;const[top,bot]=rows(pad(S,26,26,40),[1.3,1],46);const[h1,h2]=cols(top,[1,1],30);
 const house=(h,lbl)=>{const w=h.w*.7,x=h.l+(h.w-w)/2,y=h.t+h.h*.3,hh=h.h*.6;rct(x,y,w,hh,C.fg2,A(C.red,.08+.02*(p.Ti-16)),1.8);poly([[x-10,y],[x+w/2,h.t+h.h*.06],[x+w+10,y]],C.fg2,A(C.fg,.05),1.8);T(lbl,h.l,h.t+6,{s:13.5,w:700,c:C.fg});return{x,y,w,hh}};
 const a=house(h1,'Panelovn'),bb=house(h2,'Varmepumpe');rr(a.x+a.w*.35,a.y+a.hh*.62,a.w*.3,a.hh*.22,3,C.fg2,A(C.fg,.1),1.4);rr(bb.x+bb.w*.85,bb.y+bb.hh*.4,bb.w*.18,bb.hh*.3,3,C.teal,A(C.teal,.15),1.4);
 S.q.forEach(q=>{const H=q.side?bb:a;let x,y;const t=q.t;if(q.k==='el'){const sx=H.x-20,sy=H.y+H.hh*.5,ex=q.side?H.x+H.w*.92:H.x+H.w*.5,ey=q.side?H.y+H.hh*.55:H.y+H.hh*.72;if(t<.5){x=lerp(sx,ex,t*2);y=lerp(sy,ey,t*2);dot(x,y,3.2,C.yellow)}else{x=lerp(ex,H.x+H.w*q.x,(t-.5)*2);y=lerp(ey,H.y+H.hh*.2,(t-.5)*2);dot(x,y,3.2,C.red)}}else{const sx=H.x+H.w+40,sy=H.y+H.hh*.55,ex=H.x+H.w*.92,ey=H.y+H.hh*.55;if(t<.5){dot(lerp(sx,ex,t*2),sy+Math.sin(t*20+q.x*9)*4,3,C.blue)}else dot(lerp(ex,H.x+H.w*q.x,(t-.5)*2),lerp(ey,H.y+H.hh*.2,(t-.5)*2),3,C.red)}});
 T('strøm',a.x-24,a.y+a.hh*.5-14,{a:'center',s:11,c:C.yellow});T('strøm',bb.x-24,bb.y+bb.hh*.5-14,{a:'center',s:11,c:C.yellow});T('varme fra uteluft',bb.x+bb.w+6,bb.y+bb.hh*.55-16,{s:11,c:C.blue});
 T(`${nf(need,0)} kWh varme per døgn`,a.x+a.w/2,a.y+a.hh*.3,{a:'center',f:'n',s:12,c:C.fg});T(`${nf(need,0)} kWh varme per døgn`,bb.x+bb.w/2,bb.y+bb.hh*.3,{a:'center',f:'n',s:12,c:C.fg});
 T(`strøm: ${nf(need,0)} kWh · ${nf(need*p.pr,0)} kr`,a.x+a.w/2,a.y+a.hh+16,{a:'center',f:'n',s:12,c:C.yellow});T(`strøm: ${nf(need/cop,0)} kWh · ${nf(need/cop*p.pr,0)} kr`,bb.x+bb.w/2,bb.y+bb.hh+16,{a:'center',f:'n',s:12,c:C.yellow});
 const[g1,g2]=cols(bot,[1.3,1],34);const P=Plane(-25,15,0,8,{l:g1.l+30,t:g1.t,w:g1.w-30,h:g1.h});P.grid(5,{sy:1,minor:false,alpha:.06});P.axes({xs:5,ys:2,xAt:-25,x0:true,y0:true,xl:'°C ute',yl:'COP',ls:12});lab(g1,'Varmefaktor (COP) mot utetemperatur');
 P.clip(()=>{P.fn(x=>{const Th=p.Ti+15+273.15,Tc=x-6+273.15;return Th/(Th-Tc)},A(C.fg,.4),1.4,{prog:1,dash:[4,4]});P.fn(x=>COP(x,p.Ti),C.teal,2.6,{prog:1})});ln(P.l,P.Y(1),P.l+P.w,P.Y(1),A(C.yellow,.6),1.4);T('panelovn: 1',P.l+4,P.Y(1)-8,{s:10.5,c:C.yellow});T('teoretisk grense',P.X(5),P.Y(Math.min(7.6,(p.Ti+288.15)/(p.Ti+15-5+6)))-4,{s:10.5,c:C.fg3});dot(P.X(p.To),P.Y(cop),6,C.teal);
 let y=g2.t+4;T('COP nå',g2.l,y+8,{s:11.5,c:C.fg3});T(nf(cop,1),g2.l,y+34,{f:'n',s:28,w:700,c:C.teal});y+=62;Twrap(`Varmepumpen sparer ${nf((1-1/cop)*100,0)} % av strømmen, ${nf(need*(1-1/cop)*p.pr,0)} kr dette døgnet.`,g2.l,y,g2.w,{s:12.5,c:C.green})},
readout(S){const p=S.p,cop=COP(p.To,p.Ti),need=Math.max(0,.15*(p.Ti-p.To))*24;return[['COP',nf(cop,2),'teal'],['varmebehov',nf(need,0)+' kWh/døgn'],['panelovn',nf(need*p.pr,0)+' kr'],['varmepumpe',nf(need/cop*p.pr,0)+' kr','green']]}
});
}

/* ---------- Stjerners liv og grunnstoffenes opphav ---------- */
{
const SYM='H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U'.split(' ');
const pos=Z=>{if(Z===1)return[0,0];if(Z===2)return[0,17];if(Z<=4)return[1,Z-3];if(Z<=10)return[1,Z-5+12];if(Z<=12)return[2,Z-11];if(Z<=18)return[2,Z-13+12];if(Z<=36)return[3,Z-19];if(Z<=54)return[4,Z-37];if(Z<=56)return[5,Z-55];if(Z<=71)return[7.4,Z-57+2];if(Z<=86)return[5,Z-72+3];if(Z<=88)return[6,Z-87];return[8.4,Z-89+2]};
const R_=[63,64,65,66,67,68,69,70,71,75,76,77,78,79,84,85,86,87,88,89,90,91,92];
const ORI=Z=>Z<=3?'bb':Z<=5?'ks':Z<=7?'sm':Z===43||Z===61?'na':Z<=30?'mm':Z<=36?'mm':R_.includes(Z)?'ns':'sm';
const OC={bb:['Big bang','blue'],ks:['Kosmisk stråling','grey'],sm:['Små stjerner som dør','gold'],mm:['Store stjerner, supernovaer','red'],ns:['Nøytronstjernekollisjoner','purple'],na:['Ikke stabil i naturen','fg3']};
const life=M=>10*Math.pow(M,-2.5);
const fate=M=>M<.5?'wd':M<8?'wd':M<20?'ns':'bh';
const stage=(M,f)=>M<.5?'ms':f<.7?'ms':f<.85?'giant':f<.92?(M>=8?'sn':'pn'):'end';
M({id:'fy-stjerneliv',s:'fy',c:['FY1','NAT'],title:'Stjernenes liv og grunnstoffenes opphav',short:'Stjernenes liv',kw:'stjerne fusjon hovedserien rød kjempe hvit dverg supernova nøytronstjerne svart hull grunnstoffer periodesystemet hr-diagram levetid gull jern',
lead:'Stjerner er fusjonsreaktorer. I kjernen smeltes hydrogen sammen til helium, og senere til tyngre grunnstoffer. Hvor lenge en stjerne lever, og hvordan den dør, avhenger nesten bare av massen. Atomene i kroppen din er laget i stjerner.',
controls:[{id:'M',label:'Massen til stjerna (solmasser)',min:.1,max:40,log:true,value:1,fmt:v=>nf(v,v<1?2:1)},{id:'sp',label:'Fart',min:.2,max:3,step:.1,value:1,d:1},{type:'btns',items:[['Sola',S=>{setP('M',1,S);S.f=0}],['Stor stjerne (15 solmasser)',S=>{setP('M',15,S);S.f=0}],['Rød dverg (0,2 solmasser)',S=>{setP('M',.2,S);S.f=0}]]}],
tex:['4\\,{}^1\\text{H}\\to{}^4\\text{He}+\\text{energi}','t_{\\text{levetid}}\\approx 10\\ \\text{mrd. år}\\cdot\\left(\\frac{M}{M_\\odot}\\right)^{-2{,}5}'],
about:['En stjerne er i <strong>hovedserien</strong> så lenge den smelter hydrogen til helium i kjernen. Store stjerner har mye mer brensel, men bruker det så fort at de lever mye kortere. Sola lever omtrent 10 milliarder år, en stjerne på 15 solmasser bare rundt 10 millioner år.','Når hydrogenet i kjernen er brukt opp, sveller stjerna til en <strong>rød kjempe</strong>. Kjernen blir varm nok til å smelte helium til karbon og oksygen. Stjerner som sola kaster av seg de ytre lagene og ender som en <strong>hvit dverg</strong>.','Stjerner over omtrent åtte solmasser smelter stadig tyngre stoffer helt fram til jern. Fusjon av jern gir ikke energi, så kjernen kollapser, og stjerna eksploderer som en <strong>supernova</strong>. Igjen blir en nøytronstjerne eller et svart hull.','Grunnstoffer tyngre enn jern lages for det meste når atomkjerner fanger nøytroner: langsomt i døende kjempestjerner, og raskt når to nøytronstjerner kolliderer. Mye av gullet og uranet på jorda kommer fra slike kollisjoner. Fargene i periodesystemet er forenklet; mange grunnstoffer har flere kilder.'],
tasks:['Hvor lenge lever en stjerne med dobbelt så stor masse som sola?','Hvilke grunnstoffer kan sola lage i løpet av livet?','Hvorfor stopper fusjonen i store stjerner ved jern?','Hvor kommer gullet i en ring fra?'],
init(S){S.f=0},
update(S,dt){S.f+=dt*S.p.sp*.06;if(S.f>1.15)S.f=0},
draw(S){const Mv=S.v.M,f=Math.min(1,S.f),st=stage(Mv,f),fa=fate(Mv);const b=pad(S,26,26,40);const[top,bot]=rows(b,[.9,1.15],34);const[sv,hr]=cols(top,[1,1.1],30);
 const Tms=5800*Math.pow(Mv,.5),Rms=Math.pow(Mv,.8),Lms=Math.pow(Mv,3.5);let T_=Tms,R=Rms,Lum=Lms,txt='Hovedserien: hydrogen blir til helium';
 if(st==='giant'){const u=(f-.7)/.15;T_=lerp(Tms,Mv>=8?3800:4200,u);R=Rms*lerp(1,Mv>=8?600:120,u);Lum=Lms*lerp(1,Mv>=8?3:80,u);txt=Mv>=8?'Rød superkjempe: fusjon i skall helt fram til jern':'Rød kjempe: helium blir til karbon og oksygen'}
 else if(st==='pn'){T_=30000;R=.02;Lum=Lms;txt='Planetarisk tåke: de ytre lagene blåses av'}else if(st==='sn'){txt='Supernova!';T_=20000;R=50;Lum=1e9}
 else if(st==='end'){if(fa==='wd'){T_=18000;R=.012;Lum=.005;txt='Hvit dverg: kjernen som er igjen kjøles ned'}else if(fa==='ns'){T_=500000;R=1.5e-5;Lum=.001;txt='Nøytronstjerne: en kjerne på 20 km'}else{T_=0;R=0;Lum=0;txt='Svart hull'}}
 if(Mv<.5){txt='Rød dverg: lever lenger enn universet har eksistert'}
 const cx=sv.l+sv.w/2,cy=sv.t+sv.h*.5,rp=clamp(18+Math.log10(R+1e-6)*22,2,sv.h*.42);
 if(st==='sn'){const u=(f-.85)/.07;glow(cx,cy,sv.h*.5*u+20,C.yellow,.9);for(let i=0;i<24;i++){const a=i/24*TAU;ln(cx,cy,cx+Math.cos(a)*sv.h*.45*u,cy+Math.sin(a)*sv.h*.45*u,A(C.gold,.6),1.4)}}
 else if(st==='pn'||st==='end'&&fa==='wd'){if(st==='pn'){const u=(f-.85)/.07;circ(cx,cy,sv.h*.15+u*sv.h*.25,A(C.teal,.6),A(C.teal,.08),3)}dot(cx,cy,4,'#dfe8ff');glow(cx,cy,12,'#dfe8ff',.6)}
 else if(st==='end'&&fa==='bh'){circ(cx,cy,14,A(C.gold,.6),'#000',3);glow(cx,cy,26,C.gold,.25)}else if(st==='end'&&fa==='ns'){dot(cx,cy,2.5,'#cfe0ff');for(let k=0;k<2;k++){const a=S.t*6+k*PI;ln(cx,cy,cx+Math.cos(a)*40,cy+Math.sin(a)*40,A(C.blue,.5),1.6)}}
 else{const col=kelvin(T_);glow(cx,cy,rp*1.6,col,.45);circ(cx,cy,rp,null,col)}
 T(txt,sv.l,sv.t+8,{s:13,w:700,c:st==='sn'?C.gold:C.fg});T(`levetid: ${life(Mv)>13.8?'over 13,8 milliarder år':life(Mv)>=1?nf(life(Mv),1)+' milliarder år':nf(life(Mv)*1000,0)+' millioner år'}`,sv.l,sv.t+sv.h-8,{s:12,c:C.fg2});
 const P=Plane(Math.log10(40000),Math.log10(2500),-4,6,hr);const tick=[40000,20000,10000,5000,2500];ln(P.l,P.t+P.h,P.l+P.w,P.t+P.h,A(C.fg,.6),1.2);ln(P.l,P.t,P.l,P.t+P.h,A(C.fg,.6),1.2);tick.forEach(t=>{T(nf(t,0)+' K',P.X(Math.log10(t)),P.t+P.h+12,{a:'center',f:'n',s:10,c:C.fg3})});[-4,-2,0,2,4,6].forEach(l=>T('10'+sup(l),P.l-6,P.Y(l),{a:'right',f:'n',s:10,c:C.fg3}));lab(hr,'Hertzsprung–Russell-diagram (lysstyrke mot temperatur)');
 const ms=[];for(let m=.1;m<=40;m*=1.1)ms.push(P.pt(Math.log10(5800*Math.pow(m,.5)),Math.log10(Math.pow(m,3.5))));pth(ms,A(C.fg,.3),8);T('hovedserien',P.X(Math.log10(9000)),P.Y(2.6)-14,{s:10.5,c:C.fg3});
 if(T_>2500&&T_<45000&&Lum>1e-4&&Lum<3e6)dot(P.X(Math.log10(T_)),P.Y(Math.log10(Lum)),6,kelvin(Math.min(T_,12000)));
 const cw=Math.min(bot.w/26,bot.h/9.6),ox=bot.l,oy=bot.t+4;const made=new Set();made.add('bb');if(Mv>=.5&&(st!=='ms'||f>.7))made.add('sm');if(Mv>=8&&(st==='sn'||st==='end'||st==='giant'&&f>.78))made.add('mm');
 for(let Z=1;Z<=92;Z++){const[r,c]=pos(Z);const x=ox+c*cw,y=oy+r*cw;const o=ORI(Z);const hl=made.has(o)&&(o!=='bb'||Z===2);rr(x+1,y+1,cw-2,cw-2,2,hl?C.fg:null,A(C[OC[o][1]],hl?.85:.35),hl?1.4:1);T(SYM[Z-1],x+cw/2,y+cw/2,{a:'center',f:'n',s:cw*.42,c:hl?C.stage:C.fg})}
 let lx=ox+18.8*cw,ly=oy+cw*.5;Object.entries(OC).forEach(([k,[n,c]],i)=>{const y=ly+i*20;rct(lx,y-5,12,10,null,A(C[c],.85));T(n,lx+18,y,{s:11.5,c:C.fg2})});lab({l:lx,t:oy+2},'Hvor grunnstoffene kommer fra');
 Twrap('Ruter med kant: laget av en stjerne med denne massen så langt i livet. Forenklet: mange grunnstoffer har flere kilder.',lx,ly+6*20+6,bot.l+bot.w-lx,{s:11,c:C.fg3})},
readout(S){const Mv=S.p.M;return[['masse',nf(Mv,Mv<1?2:1)+' solmasser'],['levetid',life(Mv)>13.8?'> 13,8 mrd. år':nf(life(Mv)*1000,life(Mv)<1?0:0)+' mill. år'],['ender som',{wd:'hvit dverg',ns:'nøytronstjerne',bh:'svart hull'}[fate(Mv)],'yellow']]}
});
}

/* ---------- Stråling og overflate ---------- */
{
const SG=5.67e-8;
const FACE=[['Matt svart',.95,.95,'#20242a'],['Hvit maling',.9,.2,'#e8ecef'],['Rustent jern',.65,.7,'#8a4b2a'],['Blankt metall',.05,.1,'#b8c4cc']];
const Teq=(a,e,S_,Ta)=>{let lo=Ta,hi=Ta+400;for(let i=0;i<60;i++){const T=(lo+hi)/2;const f=a*S_-e*SG*(Math.pow(T,4)-Math.pow(Ta,4))-10*(T-Ta);if(f>0)lo=T;else hi=T}return(lo+hi)/2};
M({id:'fy-overflate',s:'fy',c:['FY1'],title:'Stråling og overflate: hvorfor blir svart varmere?',short:'Stråling og overflate',kw:'stråling overflate emissivitet absorpsjon svart legeme leslies kube termografi ir-kamera infrarød solfanger albedo stefan-boltzmann',
lead:'Alle gjenstander sender ut varmestråling, men hvor mye avhenger også av overflaten. En matt svart flate stråler mye, en blank metallflate nesten ingenting, selv om de har samme temperatur. Det samme bestemmer hvor mye sollys som tas opp.',
controls:[{id:'mode',type:'seg',label:'Forsøk',value:'kube',options:[['kube','Leslies kube'],['sol','Flater i sola']]},{id:'T',label:'Temperatur på vannet i kuben',min:20,max:100,step:1,value:80,unit:'°C',show:S=>S.p.mode==='kube'},{id:'S',label:'Sollys som treffer',min:0,max:1000,step:10,value:800,unit:'W/m²',show:S=>S.p.mode==='sol'}],
tex:['P=\\varepsilon\\,\\sigma\\,A\\,T^4','\\text{absorbert}=\\alpha\\cdot\\text{innstråling}'],
about:['Et ideelt <strong>svart legeme</strong> sender ut $\\sigma T^4$ watt per kvadratmeter. Virkelige flater sender ut en brøkdel $\\varepsilon$ av dette. $\\varepsilon$ kalles <strong>emissiviteten</strong>. Flater som stråler godt, absorberer også godt ved samme bølgelengde.','<strong>Leslies kube</strong> er en kube med varmt vann der sidene har ulik overflate. Alle sidene har samme temperatur, men en strålingsmåler viser mest fra den matte svarte siden og nesten ingenting fra den blanke.','Et IR-kamera regner ut temperaturen fra strålingen og antar ofte $\\varepsilon\\approx1$. Derfor ser blanke flater kalde ut på termografibilder selv om de er varme.','I sollys betyr det mest hvor mye synlig lys flaten absorberer ($\\alpha$). Hvit maling absorberer lite sollys, men stråler godt i infrarødt, og holder seg derfor kjølig. Solfangere har flater som absorberer sollys godt, men stråler lite.'],
tasks:['Hvor mye mer stråler den svarte siden enn den blanke ved 80 °C?','Hvorfor ser en blank kaffekanne kald ut på et IR-bilde?','Hvilken flate blir varmest i sola? Hvilken holder seg kaldest? Forklar.','Hvorfor males tak i varme land ofte hvite?'],
draw(S){const p=S.p;const b=pad(S,30,30,40);const[bl,br]=split(S,.48,{g:30,b});
 if(p.mode==='kube'){const TK=p.T+273.15;const s=Math.min(bl.w*.42,(bl.h-80)/2),cx=bl.l+bl.w/2;
  FACE.forEach(([n,e,a,col],i)=>{const[x,y]=[cx-s+(i%2)*(s+8),bl.t+(Math.floor(i/2))*(s+30)+20];rr(x,y,s,s,4,A(C.fg,.4),col,1.5);T(n,x+s/2,y+s+14,{a:'center',s:11.5,c:C.fg2});const P=e*SG*TK**4;const nW=Math.round(P/80);const rg=rng(i+3);for(let k=0;k<nW;k++){const ang=rg()*TAU,dd=(S.t*40+rg()*80)%80;const px=x+s/2+Math.cos(ang)*(s*.55+dd),py=y+s/2+Math.sin(ang)*(s*.55+dd);dot(px,py,1.8,A(C.red,.7*(1-dd/80)))}T(nf(P,0)+' W/m²',x+s/2,y+s/2,{a:'center',f:'n',s:12,c:i===1||i===3?C.stage:C.fg})});
  lab(bl,`Leslies kube med vann på ${nf(p.T,0)} °C`);
  const ir={l:br.l,t:br.t+10,w:br.w,h:br.h*.55};lab(ir,'Slik ser IR-kameraet sidene (antar ε = 1)');const cw2=ir.w/4-8;FACE.forEach(([n,e],i)=>{const Ta=Math.pow(e*TK**4+(1-e)*293.15**4,.25)-273.15;const x=ir.l+i*(cw2+8);rct(x,ir.t,cw2,ir.h-30,null,ramp(['#1a1f6b','#7b2ea0','#e0524a','#f0ac5f','#f5e663'],clamp((Ta-10)/90,0,1)));T(nf(Ta,0)+' °C',x+cw2/2,ir.t+(ir.h-30)/2,{a:'center',f:'n',s:13,w:700,c:'#fff'});T(n,x+cw2/2,ir.t+ir.h-16,{a:'center',s:10.5,c:C.fg2})});
  Twrap('Alle sidene er like varme, men kameraet viser ulik temperatur. Blanke flater sender ut lite stråling og speiler i stedet strålingen fra rommet rundt.',br.l,br.t+br.h*.55+40,br.w,{s:12.5,c:C.fg2})}
 else{const Ta=293.15;const sx=bl.l+bl.w*.85,sy=bl.t+20;glow(sx,sy,40,C.yellow,.7);dot(sx,sy,12,C.yellow);const n=4,cw=bl.w/n;FACE.forEach(([nm,e,a,col],i)=>{const Tq=Teq(a,e,p.S,Ta)-273.15;const x=bl.l+i*cw+cw*.12,w=cw*.76,y=bl.t+bl.h*.6;rct(x,y,w,16,null,col);rct(x,y+16,w,4,null,A(C.fg,.3));for(let k=0;k<5;k++){const xx=x+w*(k+.5)/5;arr(xx+30,y-70,xx,y-4,A(C.yellow,.5),1.4,6)}const nr=Math.round(a*5);for(let k=0;k<5-nr;k++){const xx=x+w*(k+.5)/5;arr(xx,y-4,xx-26,y-60,A(C.yellow,.25),1.2,5)}T(nm,x+w/2,y+36,{a:'center',s:11.5,c:C.fg2});T(nf(Tq,0)+' °C',x+w/2,y+56,{a:'center',f:'n',s:14,w:700,c:ramp([C.blue,C.yellow,C.red],clamp((Tq-20)/60,0,1))})});lab(bl,'Flater i sola (lufta er 20 °C)');
  const P=Plane(0,1000,15,110,{l:br.l+34,t:br.t+10,w:br.w-34,h:br.h-40});P.grid(200,{sy:20,minor:false,alpha:.06});P.axes({xs:200,ys:20,x0:true,y0:true,xAt:0,yAt:15,xl:'W/m²',yl:'°C',ls:12});lab({l:br.l,t:br.t+10},'Temperatur mot innstråling');
  FACE.forEach(([nm,e,a,col],i)=>{const c=[C.fg,C.teal,C.gold,C.blue][i];P.fn(x=>Teq(a,e,x,Ta)-273.15,c,2.2,{prog:1});dot(P.X(p.S),P.Y(Teq(a,e,p.S,Ta)-273.15),4.5,c)})}},
readout(S){const p=S.p;if(p.mode==='kube'){const TK=p.T+273.15;return FACE.map(([n,e])=>[n,nf(e*SG*T**4,0)+' W/m²'])}return FACE.map(([n,e,a])=>[n,nf(Teq(a,e,p.S,293.15)-273.15,0)+' °C'])}
});
}
