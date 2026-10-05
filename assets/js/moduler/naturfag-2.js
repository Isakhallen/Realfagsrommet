'use strict';
/* ================= NATURFAG (del 2) ================= */

/* ---------- Hormoner og menstruasjonssyklusen ---------- */
{
const g=(d,m,s)=>Math.exp(-(((d-m)/s)**2));
const HN={fsh:['FSH','teal'],lh:['LH','yellow'],ost:['østrogen','pink'],pro:['progesteron','purple'],hcg:['hCG','green']};
function hor(mode,d){if(mode==='pille'){const on=d<21;return{fsh:.18,lh:.1,ost:.12,pro:.05,hcg:0,syn:on?.55:0,end:on?.32-.05*Math.min(1,d/21):Math.max(.12,.27-(d-21)*.05),fol:.25+.05*Math.sin(d),bleed:d>=22&&d<27,ov:false}}
 const n={fsh:.28+.32*g(d,2,3)+.3*g(d,13.5,1.1)-.1*g(d,21,4),lh:.12+.85*g(d,13.7,.9),ost:.12+.7*g(d,12.3,2.3)+.32*g(d,21.5,3.2),pro:.05+.8*g(d,21.5,3.3),hcg:0};
 if(mode==='gravid'&&d>18){const k=clamp((d-18)/6,0,1);n.pro=Math.max(n.pro,.05+.8*g(Math.min(d,21.5),21.5,3.3))*(1-k)+k*Math.min(1,.85+.01*(d-24));n.ost=n.ost*(1-k)+k*(.5+.012*(d-18));n.hcg=clamp((d-21)/10,0,1)**1.5;n.fsh=Math.min(n.fsh,.25);n.lh=Math.min(n.lh,.15)}
 let end;if(d<5)end=.28-.12*d/5;else if(d<14)end=.16+.44*(d-5)/9;else if(d<24)end=.6+.4*(d-14)/10;else end=1-.75*(d-24)/4;if(mode==='gravid'&&d>=24)end=1;
 const fol=d<14?.12+.88*clamp((d-3)/11,0,1)**1.4:0;return{...n,syn:0,end,fol,bleed:mode!=='gravid'?d<5:d<5,ov:d>=13.6&&d<15,cl:d>=14.2&&(mode==='gravid'||d<26)?(mode==='gravid'?1:clamp((d-14.2)/2,0,1)*(d>23?clamp((26-d)/3,0,1):1)):0,egg:d>=13.8&&d<19?(d-13.8)/5.2:null,emb:mode==='gravid'&&d>=15?clamp((d-15)/5,0,1):null}}
const L_=m=>m==='gravid'?40:28;
M({id:'na-hormoner',s:'na',c:['NAT','BI1'],title:'Hormoner og menstruasjonssyklusen',short:'Menstruasjonssyklus',kw:'hormon menstruasjon menstruasjonssyklus eggløsning fsh lh østrogen progesteron p-pille prevensjon graviditet hcg seksuell helse livmor eggstokk hypofyse',
lead:'Hormoner fra hypofysen og eggstokkene styrer menstruasjonssyklusen. De bestemmer når et egg modnes og slippes, og når slimhinnen i livmoren bygges opp og støtes av. P-piller virker ved å endre dette samspillet.',
controls:[{id:'mode',type:'seg',label:'Vis',value:'normal',options:[['normal','Vanlig syklus'],['pille','Med p-pille'],['gravid','Graviditet']]},{id:'sp',label:'Dager per sekund',min:.5,max:6,step:.5,value:2,d:1},{type:'btns',items:[['Gå til eggløsning',S=>{S.d=13.6}],['Start på dag 1',S=>{S.d=0}]]}],
tex:['\\text{FSH}\\to\\text{follikkel modnes}\\to\\text{østrogen}\\uparrow','\\text{LH-topp}\\to\\text{eggløsning}','\\text{gulelegemet}\\to\\text{progesteron}\\to\\text{tykk slimhinne}'],
about:['<strong>FSH</strong> fra hypofysen får en follikkel i eggstokken til å vokse. Follikkelen lager <strong>østrogen</strong>, som bygger opp slimhinnen i livmoren.','Når østrogennivået er høyt, skiller hypofysen ut mye <strong>LH</strong>. LH-toppen utløser <strong>eggløsning</strong> rundt dag 14. Resten av follikkelen blir til <strong>gulelegemet</strong>, som lager <strong>progesteron</strong>. Progesteron holder slimhinnen klar for et befruktet egg.','Blir egget ikke befruktet, forsvinner gulelegemet, progesteronet faller, og slimhinnen støtes ut: menstruasjon. Ved graviditet lager fosteret hormonet <strong>hCG</strong>, som holder gulelegemet i live. Det er hCG en graviditetstest måler.','Kombinasjonspiller gir kunstig østrogen og gestagen hver dag. Det holder FSH og LH lave, så ingen egg modnes og ingen eggløsning skjer. Blødningen i pillepausen kalles en bortfallsblødning. Syklusens lengde varierer mye fra person til person.'],
tasks:['Hvilket hormon utløser eggløsningen? Hvilken dag skjer den her?','Hvorfor faller progesteronet mot slutten av syklusen hvis egget ikke blir befruktet?','Hvorfor blir det ingen eggløsning når man tar p-piller?','Hva måler en graviditetstest, og hvorfor kan den først vise utslag etter noen dager?'],
init(S){S.d=0},
change(S,id){if(id==='mode')S.d=0},
update(S,dt){const L=L_(S.p.mode);S.d+=dt*S.p.sp;if(S.d>=L)S.d=S.p.mode==='gravid'?L-.001:S.d-L},
draw(S){const mode=S.p.mode,d=S.d,h=hor(mode,d);const[bl,br]=split(S,.4,{g:28,b:pad(S,26,30,40)});const[o,u]=rows(bl,[1,1],44);
 lab(o,'Eggstokk');const ocx=o.l+o.w/2,ocy=o.t+o.h/2,orx=Math.min(o.w*.42,o.h*.9),ory=Math.min(o.h*.42,orx*.62);X.beginPath();X.ellipse(ocx,ocy,orx,ory,0,0,TAU);X.fillStyle=A(C.pink,.12);X.fill();X.strokeStyle=A(C.pink,.6);X.lineWidth=2;X.stroke();
 const rg=rng(5);for(let i=0;i<9;i++){const a=rg()*TAU,r=rg()*.7;circ(ocx+Math.cos(a)*orx*r*.8,ocy+Math.sin(a)*ory*r*.8,3,A(C.fg,.4),null,1)}
 const fx=ocx+orx*.35,fy=ocy-ory*.15;if(h.fol>0){const fr=6+h.fol*ory*.55;circ(fx,fy,fr,A(C.pink,.9),A(C.pink,.18),1.8);dot(fx-fr*.35,fy,4,C.fg);if(h.fol>.5)T('follikkel',fx,fy+fr+12,{a:'center',s:11,c:C.pink})}
 if(h.ov){glow(fx+orx*.3,fy-ory*.4,20,C.yellow,.7);T('eggløsning!',fx,o.t+4,{a:'center',s:13,w:700,c:C.yellow})}
 if(h.cl>0){circ(fx,fy,6+ory*.35*h.cl,null,A(C.gold,.75*h.cl+.1));T('gulelegeme',fx,fy+ory*.35+18,{a:'center',s:11,c:C.gold})}
 if(h.egg!==null){const ex=lerp(fx+orx*.2,o.l+o.w-6,h.egg),ey=lerp(fy-ory*.4,o.t+o.h-6,h.egg);dot(ex,ey,5,C.fg);T(h.emb!==null&&h.emb>0?'befruktet egg':'egg',ex+8,ey,{s:11,c:C.fg2})}
 if(mode==='pille')T('ingen follikkel modnes',ocx,ocy+ory+16,{a:'center',s:11.5,c:C.fg3});
 lab(u,'Slimhinnen i livmoren');const uh=u.h*.8,base=u.t+u.h,th=uh*h.end;rct(u.l,base-6,u.w,6,null,A(C.pink,.6));
 X.beginPath();X.moveTo(u.l,base-6);for(let i=0;i<=60;i++){const x=u.l+u.w*i/60;X.lineTo(x,base-6-th*(1+.06*Math.sin(i*.9+d)))}X.lineTo(u.l+u.w,base-6);X.closePath();X.fillStyle=A(C.red,.25+.35*h.end);X.fill();
 for(let i=0;i<8;i++){const x=u.l+u.w*(i+.5)/8;ln(x,base-6,x+Math.sin(i)*4,base-6-th*.85,A(C.red,.5),1.4)}
 if(h.bleed){for(let i=0;i<14;i++){const x=u.l+((i*37+S.t*20)%u.w),y=base-6-((S.t*30+i*13)%(th+10));dot(x,y,2.2,C.red)}T(mode==='pille'?'bortfallsblødning':'menstruasjon',u.l+u.w/2,base-th-18,{a:'center',s:12.5,w:700,c:C.red})}
 if(h.emb!==null&&h.emb>.95){dot(u.l+u.w*.6,base-6-th*.9,6,C.green);T('fosteret fester seg',u.l+u.w*.6,base-th-22,{a:'center',s:11.5,c:C.green})}
 const Ld=L_(mode);const P=Plane(0,Ld,0,1.15,{l:br.l,t:br.t+8,w:br.w,h:br.h-56});P.grid(7,{sy:.25,minor:false,alpha:.06});P.axes({xs:7,y:false,xAt:0,x0:true,xl:'dag',ls:13});
 lab({l:br.l,t:br.t+8},'Hormonnivå');
 const keys=mode==='gravid'?['fsh','lh','ost','pro','hcg']:['fsh','lh','ost','pro'];
 if(mode!=='gravid')for(let i=0;i<5;i++)rct(P.X(i),P.t,P.sx,P.h,null,A(C.red,.05));if(mode==='pille'){rct(P.X(21),P.t,P.sx*7,P.h,null,A(C.fg,.04));T('pillepause',P.X(24.5),P.t+10,{a:'center',s:11,c:C.fg3});const pts=[];for(let x=0;x<=Ld;x+=.1)pts.push(P.pt(x,hor('pille',x).syn));pth(pts,A(C.fg,.7),2,1,[5,4]);T('hormoner fra pillen',P.X(10.5),P.Y(.55)-10,{a:'center',s:11,c:C.fg2})}
 keys.forEach(k=>{const pts=[];for(let x=0;x<=Ld;x+=.1)pts.push(P.pt(x,hor(mode,x)[k]));pth(pts,C[HN[k][1]],2.4)});
 ln(P.X(d),P.t,P.X(d),P.t+P.h,A(C.fg,.6),1.4);keys.forEach(k=>dot(P.X(d),P.Y(h[k]),4.5,C[HN[k][1]]));
 let lx=br.l;keys.forEach(k=>{rct(lx,br.t+br.h-14,14,4,null,C[HN[k][1]]);T(HN[k][0],lx+19,br.t+br.h-12,{s:12,c:C[HN[k][1]]});lx+=tw(HN[k][0],{s:12})+42});
 const st=mode==='pille'?(d<21?'Pilledag '+(Math.floor(d)+1):'Pillepause'):h.bleed?'Menstruasjon':h.ov?'Eggløsning':d<14?'Follikkelfasen':mode==='gravid'&&d>21?'Svangerskap: hCG stiger':'Gulelegemefasen';
 T(`Dag ${Math.floor(d)+1}: ${st}`,br.l+br.w,br.t-3,{a:'right',s:13,w:700,c:C.fg})},
readout(S){const h=hor(S.p.mode,S.d);return[['dag',Math.floor(S.d)+1],['FSH',nf(h.fsh*100,0),'teal'],['LH',nf(h.lh*100,0),'yellow'],['østrogen',nf(h.ost*100,0),'pink'],['progesteron',nf(h.pro*100,0),'purple']]}
});
}

/* ---------- Karbonkretsløpet ---------- */
{
const A0=590,L0=2300,M0=900,D0=37100,BETA=.35,KAM=.15,KMD=.06,XI=9;
const HIST=[[1850,.7],[1900,1.4],[1950,2.9],[1960,3.9],[1970,5.4],[1980,6.7],[1990,7.6],[2000,8.1],[2010,10.3],[2023,11.0]];
const SC={hoy:'Høye utslipp',konst:'Som i dag',null50:'Netto null i 2050',stopp:'Stopp alt i 2025'};
const Em=(y,sc)=>{if(y<=2023){for(let i=1;i<HIST.length;i++)if(y<=HIST[i][0]){const a=HIST[i-1],b=HIST[i];return a[1]+(b[1]-a[1])*(y-a[0])/(b[0]-a[0])}return HIST[0][1]}
 if(sc==='hoy')return 11*Math.pow(1.015,Math.min(y,2080)-2023);if(sc==='konst')return 11;if(sc==='null50')return Math.max(0,11*(1-(y-2023)/27));return y<2025?11:0};
function sim(sc,Y){let A=A0,L=L0,Mo=M0,D=D0,cum=0,cl=0,co=0;const out=[];let fl=0,fo=0,fd=0,E=0;for(let y=1850;y<=Y;y++){for(let k=0;k<4;k++){const dt=.25;E=Em(y+k*.25,sc);fl=60*(1+BETA*Math.log(A/A0))-60*L/L0;fo=KAM*(A-A0*(1+XI*(Mo-M0)/M0));fd=KMD*((Mo-M0)-(D-D0)*M0/D0);A+=dt*(E-fl-fo);L+=dt*fl;Mo+=dt*(fo-fd);D+=dt*fd;cum+=dt*E;cl+=dt*fl;co+=dt*fo}out.push([y,A/2.124,E])}
 return{out,A,L,Mo,D,cum,cl,co,fl,fo,fd,E}}
M({id:'na-karbon',s:'na',c:['NAT','BI2','GEO'],title:'Karbonkretsløpet og CO₂ i atmosfæren',short:'Karbonkretsløpet',kw:'karbonkretsløp karbon co2 karbondioksid utslipp fossil atmosfære hav fotosyntese klimaendringer ppm stoffkretsløp netto null opptak',
lead:'Karbon flytter seg hele tiden mellom luft, planter, jord og hav. Når vi brenner kull, olje og gass, tilfører vi karbon som har vært lagret i millioner av år. Omtrent halvparten blir værende i atmosfæren.',
controls:[{id:'sc',type:'seg',label:'Utslipp etter 2023',value:'konst',options:Object.entries(SC)},{id:'sp',label:'År per sekund',min:1,max:20,step:1,value:8},{type:'btns',items:[['Hopp til i dag',S=>{S.y=2024}],['Start i 1850',S=>{S.y=1850}]]}],
tex:['1\\ \\text{ppm CO}_2\\approx 2{,}12\\ \\text{Gt karbon}','\\Delta(\\text{atmosfære})=\\text{utslipp}-\\text{opptak i land}-\\text{opptak i hav}'],
about:['Tallene i boksene er karbon målt i gigatonn (milliarder tonn). Pilene viser netto strøm av karbon hvert år. Naturen flytter rundt 120 Gt mellom luft og planter og rundt 80 Gt mellom luft og hav hvert år, men disse strømmene var nesten i balanse før vi begynte å slippe ut.','Mer CO₂ i lufta gjør at planter vokser litt mer og at havet tar opp mer. Til sammen tar land og hav opp omtrent halvparten av utslippene. Resten blir i atmosfæren og forsterker drivhuseffekten.','Havet tar opp CO₂ i overflaten først. Det går svært sakte å blande det ned i dyphavet. Når CO₂ løses i havet, blir havet surere.','Prøv «Stopp alt i 2025»: CO₂-innholdet faller bare sakte, fordi det tar lang tid for havet og jorda å ta opp overskuddet. Modellen er en forenklet boksmodell, ikke en fullstendig klimamodell.'],
tasks:['Hvor mange ppm CO₂ var det i 1850, og hvor mange er det i dag?','Hvor stor andel av utslippene har blitt værende i atmosfæren?','Sammenlign scenarioene. Hva skjer med CO₂-innholdet etter at utslippene stopper?','Hvorfor er det mer CO₂ i lufta om vinteren enn om sommeren på den nordlige halvkule?'],
init(S){S.y=1850;S.dots=[]},
update(S,dt){S.y=Math.min(2150,S.y+dt*S.p.sp);S.dots.forEach(q=>q.t+=dt*.7);S.dots=S.dots.filter(q=>q.t<1);const r=S.res;if(r){[['E',r.E],['fl',r.fl],['fo',r.fo],['fd',r.fd]].forEach(([k,v])=>{if(Math.random()<dt*Math.abs(v)*1.2)S.dots.push({k,s:Math.sign(v),t:0})})}},
draw(S){const sc=S.p.sc,Y=Math.floor(S.y);const r=sim(sc,Y);S.res=r;const[bl,br]=split(S,.5,{g:28,b:pad(S,26,26,40)});
 const bw=bl.w*.37,bh=Math.min(bl.h*.2,62);const sm=bh<52;const box=(x,y,name,v,v0,col)=>{rr(x,y,bw,bh,8,A(col,.75),A(col,.12),1.6);T(name,x+8,y+(sm?11:16),{s:sm?10.5:12.5,w:700,c:col});T(nf(v,0)+' Gt',x+8,y+(sm?25:36),{f:'n',s:sm?10.5:13,c:C.fg});const dd=v-v0;if(!sm&&Math.abs(dd)>.5)T((dd>0?'+':'−')+nf(Math.abs(dd),0)+' siden 1850',x+bw-8,y+bh-10,{a:'right',f:'n',s:10.5,c:dd>0?C.yellow:C.fg2});return{x,y,cx:x+bw/2,cy:y+bh/2}};
 const at=box(bl.l+(bl.w-bw)/2,bl.t+4,'Atmosfære',r.A,A0,C.blue),la=box(bl.l,bl.t+bl.h*.45,'Planter og jord',r.L,L0,C.green),oc=box(bl.l+bl.w-bw,bl.t+bl.h*.45,'Havoverflaten',r.Mo,M0,C.teal),dp=box(bl.l+bl.w-bw,bl.t+bl.h-bh,'Dyphavet',r.D,D0,C.purple);
 const fo_={x:bl.l,y:bl.t+bl.h-bh};rr(fo_.x,fo_.y,bw,bh,8,A(C.gold,.75),A(C.gold,.1),1.6);T(sm?'Fossilt':'Kull, olje og gass',fo_.x+8,fo_.y+(sm?11:16),{s:sm?10.5:12.5,w:700,c:C.gold});T((sm?'':'utslipp: ')+nf(r.E,1)+' Gt/år',fo_.x+8,fo_.y+(sm?25:36),{f:'n',s:sm?10.5:12,c:C.fg});
 const paths={E:[[fo_.x+bw,fo_.y+bh/2],[at.cx,fo_.y+bh/2],[at.cx,at.y+bh]],fl:[[at.x+bw*.25,at.y+bh],[la.cx+bw*.15,la.y]],fo:[[at.x+bw*.75,at.y+bh],[oc.cx-bw*.15,oc.y]],fd:[[oc.cx,oc.y+bh],[dp.cx,dp.y]]};
 const fl=[['E',r.E,C.gold],['fl',r.fl,C.green],['fo',r.fo,C.teal],['fd',r.fd,C.purple]];
 fl.forEach(([k,v,col])=>{const p=paths[k];const w=clamp(Math.abs(v)*.6,1,8);pth(p,A(col,.35),w);const a=p[p.length-2],b=p[p.length-1];if(k!=='E'&&Math.abs(v)>.05){const m=[(a[0]+b[0])/2,(a[1]+b[1])/2];T(nf(Math.abs(v),1)+' Gt/år',m[0]+(k==='fd'?8:k==='fl'?-8:8),m[1],{a:k==='fl'?'right':'left',f:'n',s:11,c:col,bg:A(C.stage,.7)})}});
 S.dots.forEach(q=>{const p=paths[q.k];const f=q.s>0?q.t:1-q.t;const pts=p;const seg=pts.length-1,u=f*seg,i=Math.min(seg-1,Math.floor(u)),t=u-i;dot(lerp(pts[i][0],pts[i+1][0],t),lerp(pts[i][1],pts[i+1][1],t),2.6,{E:C.gold,fl:C.green,fo:C.teal,fd:C.purple}[q.k])});
 const[g1,g2]=rows(br,[1.5,1],44);const full=sim(sc,2150).out;const ym=Math.max(500,...full.map(q=>q[1]))*1.08;const P=Plane(1850,2150,250,ym,{l:g1.l+36,t:g1.t,w:g1.w-36,h:g1.h});P.grid(50,{sy:niceStep((ym-250)/4),minor:false,alpha:.07});P.axes({xs:50,ys:niceStep((ym-250)/4),xAt:1850,yAt:250,x0:true,y0:true,xd:0});lab(g1,'CO₂ i atmosfæren (ppm)');
 pth(full.map(q=>P.pt(q[0],q[1])),A(C.blue,.2),1.6,1,[4,4]);pth(r.out.map(q=>P.pt(q[0],q[1])),C.blue,2.6);dot(P.X(Y),P.Y(r.A/2.124),5,C.blue);ln(P.X(2024),P.t,P.X(2024),P.Y(250),A(C.fg,.25),1,[3,4]);T('i dag',P.X(2024)+4,P.t+8,{s:11,c:C.fg3});ln(P.l,P.Y(278),P.l+P.w,P.Y(278),A(C.fg,.2),1,[2,4]);T('førindustrielt 278',P.l+4,P.Y(278)-8,{s:10.5,c:C.fg3});
 const tot=r.cum||1;const fr=[[(r.A-A0)/tot,'atmosfæren',C.blue],[r.cl/tot,'land',C.green],[r.co/tot,'havet',C.teal]];let x=g2.l;const bwid=g2.w;lab(g2,`Hvor har ${nf(r.cum,0)} Gt karbon fra utslipp havnet?`);
 fr.forEach(([f,n,c])=>{const w=bwid*clamp(f,0,1);rct(x,g2.t+4,w,22,null,A(c,.75));if(w>60)T(nf(f*100,0)+' %',x+w/2,g2.t+15,{a:'center',f:'n',s:12,c:C.stage});x+=w});
 x=g2.l;fr.forEach(([f,n,c])=>{T(n,x,g2.t+44,{s:12,c});x+=tw(n,{s:12})+24});T(`år ${Y}`,g2.l+g2.w,g2.t+44,{a:'right',f:'n',s:13,c:C.fg})},
readout(S){const r=S.res||sim(S.p.sc,Math.floor(S.y));return[['år',Math.floor(S.y)],['CO₂',nf(r.A/2.124,0)+' ppm','blue'],['utslipp',nf(r.E,1)+' Gt C/år','gold'],['blir i lufta',nf((r.A-A0)/(r.cum||1)*100,0)+' %']]}
});
}

/* ---------- Immunforsvar og vaksiner ---------- */
{
const SICK=1e5;
function step(S,dt){const kk=.12,r=1.6,Pmax=1e9;const a=S.P/(S.P+1e3)+S.Av/(S.Av+.05);const seed=1e-4+.03*S.Mm;const gg=1+.8*Math.min(1,S.Mm);
 const dP=r*S.P*(1-S.P/Pmax)-kk*S.Ab*S.P;const dE=gg*a*(S.E+seed)*(1-S.E/6)-.35*S.E*(1-a*.5);const dA=20*S.E-.05*S.Ab;const dM=.1*S.E*a*(1-S.Mm);
 S.P=Math.max(0,S.P+dt*dP);if(S.P<1)S.P=0;S.E=Math.max(0,S.E+dt*dE);S.Ab=Math.max(0,S.Ab+dt*dA);S.Mm+=dt*dM;S.Av*=Math.exp(-.25*dt)}
M({id:'na-immun',s:'na',c:['NAT','BI1'],title:'Immunforsvaret og vaksiner',short:'Immunforsvar og vaksiner',kw:'immunforsvar vaksine antistoff b-celle minneceller primærrespons sekundærrespons smitte virus bakterie immunitet oppfriskningsdose antigen',
lead:'Første gang kroppen møter et virus, tar det over en uke å lage nok antistoffer. Da rekker du å bli syk. Etterpå har kroppen minneceller, og neste gang kommer forsvaret mye raskere. En vaksine gir minnecellene uten at du må bli syk først.',
controls:[{type:'btns',items:[['Smitte med viruset',S=>MOD['na-immun'].ev(S,'inf')],['Gi vaksine',S=>MOD['na-immun'].ev(S,'vak')],['Start på nytt',S=>MOD['na-immun'].init(S)]]},{id:'sp',label:'Dager per sekund',min:1,max:15,step:1,value:5}],
tex:['\\text{antigen}\\to\\text{B-celler aktiveres}\\to\\text{antistoffer}','\\text{minneceller}\\Rightarrow\\text{raskere og sterkere svar neste gang}'],
about:['Viruset formerer seg raskt i kroppen. Når mengden blir stor nok, får du symptomer (over den stiplede linja). Grafen for virus har logaritmisk skala: hver strek oppover er ti ganger mer.','B-celler som kjenner igjen viruset, deler seg og blir plasmaceller som lager <strong>antistoffer</strong>. Antistoffene fester seg til viruset slik at det blir uskadelig. Første gang tar dette lang tid: det er <strong>primærresponsen</strong>.','Noen av cellene blir <strong>minneceller</strong> som lever i mange år. Neste gang kommer <strong>sekundærresponsen</strong> raskt og kraftig, ofte før du merker noe.','En <strong>vaksine</strong> inneholder antigen fra viruset, men kan ikke formere seg. Den gir en svakere respons, men lager minneceller. En <strong>oppfriskningsdose</strong> gir enda flere minneceller og bedre beskyttelse. Modellen er forenklet.'],
tasks:['Smitt en person som ikke er vaksinert. Hvor mange dager tar det før antistoffene virkelig øker? Hvor mange dager er personen syk?','Vent til personen er frisk, og smitt på nytt. Hva er forskjellen?','Start på nytt, gi én vaksine og smitt etter omtrent 50 dager. Gi så to vaksiner før smitte. Sammenlign.','Hvorfor kan det være nødvendig med oppfriskningsdoser?'],
init(S){S.P=0;S.E=0;S.Ab=0;S.Mm=0;S.Av=0;S.day=0;S.hist=[];S.marks=[];S.sick=0;S.vir=[]},
ev(S,k){if(k==='inf')S.P+=100;else S.Av+=1;S.marks.push([S.day,k==='inf'?'smitte':'vaksine'])},
update(S,dt){const days=dt*S.p.sp,n=Math.ceil(days/.01),h=days/n;for(let i=0;i<n;i++){step(S,h);S.day+=h;if(S.P>SICK)S.sick+=h}
 if(!S.hist.length||S.day-S.hist[S.hist.length-1][0]>=.25)S.hist.push([S.day,S.P,S.Ab]);while(S.hist.length&&S.hist[0][0]<S.day-120)S.hist.shift();while(S.marks.length&&S.marks[0][0]<S.day-120)S.marks.shift()},
draw(S){const[bl,br]=split(S,.36,{g:28,b:pad(S,26,30,40)});frame(bl);const lp=S.P>1?Math.log10(S.P):0;
 const sick=S.P>SICK;T(sick?'Personen er syk':S.P>1?'Viruset formerer seg':'Frisk',bl.l+10,bl.t+16,{s:14,w:700,c:sick?C.red:C.fg});
 const rg=rng(11);const nv=Math.round(lp*6);for(let i=0;i<nv;i++){const x=bl.l+14+rg()*(bl.w-28),y=bl.t+34+rg()*(bl.h-60);const r=5;circ(x,y,r,C.red,A(C.red,.35),1.4);for(let k=0;k<6;k++){const a=k/6*TAU+S.t;ln(x+Math.cos(a)*r,y+Math.sin(a)*r,x+Math.cos(a)*(r+3),y+Math.sin(a)*(r+3),C.red,1.2)}}
 const nab=Math.round(Math.min(60,Math.sqrt(S.Ab)*2.5));for(let i=0;i<nab;i++){const x=bl.l+14+rg()*(bl.w-28),y=bl.t+34+rg()*(bl.h-60);const a=rg()*TAU+Math.sin(S.t+i)*.3;X.save();X.translate(x,y);X.rotate(a);ln(0,4,0,-1,C.blue,1.6);ln(0,-1,-3.5,-5,C.blue,1.6);ln(0,-1,3.5,-5,C.blue,1.6);X.restore()}
 const nm=Math.round(S.Mm*12);for(let i=0;i<nm;i++){const x=bl.l+16+i*16%(bl.w-30),y=bl.t+bl.h-16-Math.floor(i*16/(bl.w-30))*14;dot(x,y,5.5,C.purple);dot(x,y,2,C.stage)}
 if(nm)T('minneceller',bl.l+bl.w-8,bl.t+bl.h-34,{a:'right',s:11,c:C.purple});
 const[g1,g2]=rows(br,[1,1],44);const t1=Math.max(120,S.day),t0=t1-120;
 const P=Plane(t0,t1,0,9.5,{l:g1.l+30,t:g1.t,w:g1.w-30,h:g1.h});P.grid(10,{sy:1,minor:false,alpha:.06});P.axes({xs:20,ys:2,xAt:t0,x0:true,y0:true,yf:v=>v?'10'+sup(v):'0',xf:x=>''});lab(g1,'Mengde virus i kroppen (logaritmisk)');
 rct(P.l,P.t,P.w,P.Y(5)-P.t,null,A(C.red,.06));ln(P.l,P.Y(5),P.l+P.w,P.Y(5),A(C.red,.6),1.2,[5,4]);T('syk',P.l+P.w-4,P.Y(5)-9,{a:'right',s:11,c:C.red});
 if(S.hist.length>1)pth(S.hist.map(q=>P.pt(q[0],q[1]>1?Math.log10(q[1]):0)),C.red,2.4);
 const am=Math.max(60,...S.hist.map(q=>q[2]))*1.1;const Q=Plane(t0,t1,0,am,{l:g2.l+30,t:g2.t,w:g2.w-30,h:g2.h});Q.grid(10,{sy:niceStep(am/4),minor:false,alpha:.06});Q.axes({xs:20,ys:niceStep(am/4),xAt:t0,x0:true,xf:x=>nf(x,0),xl:'dag',ls:13});lab(g2,'Antistoffer i blodet');
 if(S.hist.length>1)pth(S.hist.map(q=>Q.pt(q[0],q[2])),C.blue,2.6);
 S.marks.forEach(([t,l],i)=>{if(t<t0)return;[P,Q].forEach(R=>ln(R.X(t),R.t,R.X(t),R.t+R.h,A(l==='smitte'?C.red:C.green,.5),1.2,[3,3]));T(l,P.X(t)+4,P.t+10+(i%2)*14,{s:11,c:l==='smitte'?C.red:C.green})})},
readout(S){return[['dag',nf(S.day,0)],['virus',S.P>1?'10'+sup(Math.round(Math.log10(S.P))):'ingen','red'],['antistoffer',nf(S.Ab,0),'blue'],['minneceller',nf(S.Mm*100,0)+' %','purple'],['dager syk totalt',nf(S.sick,1)]]}
});
}
