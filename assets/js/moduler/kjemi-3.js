'use strict';
/* ================= KJEMI (del 3) ================= */

/* ---------- Konsentrasjon og fortynning ---------- */
{
const ST={nacl:{n:'Natriumklorid, NaCl',f:'NaCl',M:58.44,col:null},cus:{n:'Kobbersulfat, CuSO₄·5H₂O',f:'CuSO₄·5H₂O',M:249.69,col:'blue'},kmn:{n:'Kaliumpermanganat, KMnO₄',f:'KMnO₄',M:158.03,col:'purple'},glu:{n:'Glukose, C₆H₁₂O₆',f:'C₆H₁₂O₆',M:180.16,col:null}};
const flask=(cx,base,V,col,a,dots,lbl,k=1)=>{const r=(24*Math.cbrt(V/50)+10)*k,neck=r*.32,nh=r*1.3;const by=base-r;
 X.beginPath();X.arc(cx,by,r,0,TAU);X.fillStyle=col?A(col,clamp(a,.06,.85)):A(C.blue,.1);X.fill();
 rct(cx-neck,by-r-nh+4,neck*2,nh,null,col?A(col,clamp(a,.06,.85)):A(C.blue,.1));
 X.beginPath();X.moveTo(cx-neck,by-r-nh-6);X.lineTo(cx-neck,by-r*.95);X.arc(cx,by,r,-PI/2-Math.asin(neck/r),-PI/2+Math.asin(neck/r)-TAU+TAU,true);X.lineTo(cx+neck,by-r-nh-6);X.strokeStyle=A(C.fg,.75);X.lineWidth=2;X.stroke();
 ln(cx-neck-4,by-r-nh+4,cx+neck+4,by-r-nh+4,C.fg2,1.4);
 const rg=rng(Math.round(V)+dots);for(let i=0;i<dots;i++){const ang=rg()*TAU,rr_=Math.sqrt(rg())*(r-5);dot(cx+Math.cos(ang)*rr_,by+Math.sin(ang)*rr_,2.2,A(C.fg,.85))}
 T(lbl,cx,base+16,{a:'center',f:'n',s:12,c:C.fg2});return{r,top:by-r-nh}};
M({id:'ki-konsentrasjon',s:'ki',c:['KJ1','NAT'],title:'Konsentrasjon og fortynning',short:'Konsentrasjon',kw:'konsentrasjon molaritet stoffmengde mol molar masse fortynning løsning målekolbe pipette c1v1 c2v2 mol/L',
lead:'Konsentrasjonen sier hvor mye stoff det er i hver liter løsning. Veier du inn mer stoff, eller lager mindre løsning, blir den sterkere. Når du fortynner, er stoffmengden den samme, men den fordeles på mer vann.',
controls:[{id:'mode',type:'seg',label:'Forsøk',value:'lag',options:[['lag','Lag en løsning'],['fort','Fortynn en løsning']]},{id:'st',type:'sel',label:'Stoff',value:'cus',options:Object.entries(ST).map(([k,v])=>[k,v.n])},
 {id:'m',label:'Masse som veies inn',min:.1,max:50,step:.1,value:12.5,unit:'g',d:1,show:S=>S.p.mode==='lag'},{id:'V',label:'Volum løsning (målekolbe)',min:50,max:1000,step:50,value:250,unit:'mL',show:S=>S.p.mode==='lag'},
 {id:'c1',label:'Konsentrasjon i stamløsningen',min:.01,max:1,step:.01,value:.2,unit:'mol/L',d:2,show:S=>S.p.mode==='fort'},{id:'V1',label:'Volum du pipetterer ut',min:1,max:100,step:1,value:25,unit:'mL',show:S=>S.p.mode==='fort'},{id:'V2',label:'Volum etter fortynning',min:50,max:1000,step:50,value:250,unit:'mL',show:S=>S.p.mode==='fort'}],
tex:['n=\\frac{m}{M}','c=\\frac{n}{V}','c_1V_1=c_2V_2'],
about:['<strong>Stoffmengden</strong> $n$ måles i mol. Vi finner den ved å dele massen på den molare massen $M$, som står i periodesystemet eller på flasken.','<strong>Konsentrasjonen</strong> $c=n/V$ måles i mol/L. Husk å gjøre om millilitre til liter: 250 mL er 0,250 L.','Ved <strong>fortynning</strong> tar du ut et volum $V_1$ av en løsning og fyller opp med vann til $V_2$. Stoffmengden er den samme før og etter, $c_1V_1=c_2V_2$.','Fargen blir svakere når konsentrasjonen blir lavere. Det brukes i <strong>kolorimetri</strong> til å måle konsentrasjoner. Prikkene viser oppløste formelenheter, men i virkeligheten er det omtrent 10²² av dem.'],
tasks:['Hvor mange gram NaCl trenger du for å lage 500 mL 0,10 mol/L løsning?','Hva skjer med konsentrasjonen hvis du løser samme masse i dobbelt så stort volum?','Du pipetterer 10 mL av en 0,50 mol/L løsning og fyller opp til 100 mL. Hva blir den nye konsentrasjonen?','Hvorfor bør du fylle målekolben helt opp til merket?'],
draw(S){const p=S.p,st=ST[p.st],col=st.col?C[st.col]:null;const b=pad(S,30,30,40),nw=!isWide(S),k=nw?.58:1;let tp=b,bt=null;if(nw)[tp,bt]=rows(b,[1.35,1],12);
 const Lf=(x,y0)=>{let y=y0;return(s_,cc=C.fg2,sz=14)=>{T(s_,x,y,{f:'n',s:nw?sz*.8:sz,c:cc});y+=(sz+11)*(nw?.8:1)}};
 if(p.mode==='lag'){const m=S.v.m,V=S.v.V,n=m/st.M,c=n/(V/1000);let l,mid,r;if(nw){[l,mid]=cols(tp,[1,1.1],14);r=bt}else[l,mid,r]=cols(b,[1,1.1,1.2],20);
  const bx=l.l+l.w/2,by=l.t+l.h*.62;rr(bx-60*k-10,by,120*k+20,30,4,A(C.fg,.4),A(C.fg,.08),1.5);rr(bx-50*k,by+6,100*k,18,3,null,A(C.green,.15));T(nf(m,1)+' g',bx,by+15,{a:'center',f:'n',s:14*k+2,c:C.green});
  const hp=Math.sqrt(m/50);poly([[bx-(14+28*hp)*k,by],[bx,by-(6+34*hp)*k],[bx+(14+28*hp)*k,by]],null,col?A(col,.8):A(C.fg,.85));T('vekt',bx,by+44,{a:'center',s:11.5,c:C.fg3});
  arr(l.l+l.w-6,by-10,mid.l+10,by-10,A(C.fg,.5),2,10);if(!nw)T('løs opp og fyll vann til merket',(l.l+l.w+mid.l)/2+6,by-28,{a:'center',s:11,c:C.fg3});
  flask(mid.l+mid.w/2,mid.t+mid.h-28,V,col,.1+c*2,Math.min(220,Math.round(n*600)),nf(V,0)+' mL',k);
  const L=Lf(r.l,r.t+10);if(nw){L(`${st.f}   M = ${nf(st.M,2)} g/mol`,C.fg,13);L(`n = m/M = ${nf(m,1)}/${nf(st.M,2)} = ${nf(n,4)} mol`,C.yellow,13);L(`c = n/V = ${nf(n,4)}/${nf(V/1000,3)} = ${nf(c,3)} mol/L`,C.teal,14);return}
  L(st.f,C.fg,15);L(`M = ${nf(st.M,2)} g/mol`,C.fg3,12.5);L('',C.fg2,0);L('n = m / M',C.fg2,13);L(`  = ${nf(m,1)} g / ${nf(st.M,2)} g/mol`,C.fg2,12.5);L(`  = ${nf(n,4)} mol`,C.yellow);L('',C.fg2,0);L('c = n / V',C.fg2,13);L(`  = ${nf(n,4)} mol / ${nf(V/1000,3)} L`,C.fg2,12.5);L(`  = ${nf(c,3)} mol/L`,C.teal,16)}
 else{const c1=S.v.c1,V1=S.v.V1,V2=S.v.V2,n=c1*V1/1000,c2=n/(V2/1000);let l,mid,r;if(nw){[l,mid]=cols(tp,[1.1,1],30);r=bt}else[l,mid,r]=cols(b,[1.15,1.15,1.1],20);
  const base=tp.t+tp.h-(nw?24:40);flask(l.l+l.w/2,base,1000,col,.1+c1*2,Math.min(400,Math.round(c1*1000)),nw?'1000 mL':'stamløsning, 1000 mL',k);
  const px=(l.l+l.w+mid.l)/2,pt=tp.t+20,ph=tp.h*.5;rr(px-5,pt,10,ph,4,A(C.fg,.6),null,1.5);const fh=ph*V1/100;rct(px-4,pt+ph-fh,8,fh,null,col?A(col,clamp(.1+c1*2,.15,.85)):A(C.blue,.35));T(nf(V1,0)+' mL',px+12,pt+ph-fh,{f:'n',s:11.5,c:C.fg2});T('pipette',px,pt-10,{a:'center',s:11,c:C.fg3});
  flask(mid.l+mid.w/2,base,V2,col,.1+c2*2,Math.min(400,Math.round(c1*V1)),nf(V2,0)+' mL',k);arr(px+8,pt+ph+8,mid.l+mid.w/2-10,base-60*k,A(C.fg,.4),1.6,9);
  const L=Lf(r.l,r.t+10);if(nw){L('c₁ · V₁ = c₂ · V₂',C.fg,14);L(`n = ${nf(c1,2)} · ${nf(V1/1000,3)} = ${nf(n,5)} mol`,C.yellow,13);L(`c₂ = ${nf(n,5)} / ${nf(V2/1000,3)} = ${nf(c2,4)} mol/L`,C.teal,14);return}
  L('c₁ · V₁ = c₂ · V₂',C.fg,15);L('',C.fg2,0);L(`n = ${nf(c1,2)} mol/L · ${nf(V1/1000,3)} L`,C.fg2,12.5);L(`  = ${nf(n,5)} mol`,C.yellow);L('',C.fg2,0);L('c₂ = n / V₂',C.fg2,13);L(`   = ${nf(n,5)} / ${nf(V2/1000,3)}`,C.fg2,12.5);L(`   = ${nf(c2,4)} mol/L`,C.teal,16);L('',C.fg2,0);L(`fortynnet ${nf(V2/V1,1)} ganger`,C.fg3,12.5)}},
readout(S){const p=S.p,st=ST[p.st];if(p.mode==='lag'){const n=p.m/st.M;return[['stoffmengde',nf(n,4)+' mol','yellow'],['konsentrasjon',nf(n/(p.V/1000),3)+' mol/L','teal'],['for 0,100 mol/L trengs',nf(.1*p.V/1000*st.M,2)+' g']]}const n=p.c1*p.V1/1000;return[['stoffmengde',nf(n,5)+' mol','yellow'],['ny konsentrasjon',nf(n/(p.V2/1000),4)+' mol/L','teal'],['fortynningsfaktor',nf(p.V2/p.V1,1)]]},
live(S){const p=S.p,st=ST[p.st];if(p.mode==='lag'){const n=p.m/st.M;return `c=\\frac{n}{V}=\\frac{${tn(p.m,1)}/${tn(st.M,2)}}{${tn(p.V/1000,3)}}=${tn(n/(p.V/1000),3)}\\ \\text{mol/L}`}return `c_2=\\frac{c_1V_1}{V_2}=\\frac{${tn(p.c1,2)}\\cdot ${tn(p.V1,0)}}{${tn(p.V2,0)}}=${tn(p.c1*p.V1/p.V2,4)}\\ \\text{mol/L}`}
});
}

/* ---------- Løselighetsprodukt ---------- */
{
const SALT={agcl:{n:'AgCl',K:1.8e-10,M:143.32,c:'#e9edf2',ca:'Ag⁺',an:'Cl⁻',src:'NaCl'},agbr:{n:'AgBr',K:5.0e-13,M:187.77,c:'#efe3b0',ca:'Ag⁺',an:'Br⁻',src:'NaBr'},agi:{n:'AgI',K:8.5e-17,M:234.77,c:'#f1d35a',ca:'Ag⁺',an:'I⁻',src:'NaI'},baso4:{n:'BaSO₄',K:1.1e-10,M:233.39,c:'#e9edf2',ca:'Ba²⁺',an:'SO₄²⁻',src:'Na₂SO₄'}};
const eq=(a,b,K)=>{if(a*b<=K)return{x:0,ca:a,an:b};const x=((a+b)-Math.sqrt((a-b)**2+4*K))/2;return{x,ca:a-x,an:b-x}};
const lg=v=>Math.log10(Math.max(v,1e-30));
M({id:'ki-ksp',s:'ki',c:['KJ2'],title:'Løselighetsprodukt og felling',short:'Løselighetsprodukt',kw:'løselighet løselighetsprodukt ksp felling bunnfall ioneprodukt mettet løsning felles ion sølvklorid tungt løselig salt likevekt',
lead:'Noen salter løser seg nesten ikke i vann. Når produktet av ionekonsentrasjonene blir større enn løselighetsproduktet, felles saltet ut som et fast stoff, et bunnfall.',
controls:[{id:'salt',type:'sel',label:'Salt',value:'agcl',options:Object.entries(SALT).map(([k,v])=>[k,v.n])},{id:'a',label:'Tilsatt kation (mol/L)',min:1e-8,max:1e-2,log:true,value:1e-4,fmt:v=>sci(v,2)},{id:'b',label:'Tilsatt anion (mol/L)',min:1e-8,max:1e-2,log:true,value:3e-6,fmt:v=>sci(v,2)},
 {type:'btns',items:[['Mettet løsning i rent vann',S=>{const K=SALT[S.p.salt].K,s=Math.sqrt(K);setP('a',s,S);setP('b',s,S)}],['Tilsett mer anion (×10)',S=>{setP('b',Math.min(1e-2,S.p.b*10),S)}]]}],
tex:['K_{sp}=[\\text{Ag}^+]\\cdot[\\text{Cl}^-]','Q>K_{sp}\\;\\Rightarrow\\;\\text{felling}','s=\\sqrt{K_{sp}}\\quad\\text{(i rent vann)}'],
about:['Når et tungt løselig salt som sølvklorid står i vann, er det likevekt mellom fast stoff og ioner: $\\text{AgCl(s)}\\rightleftharpoons\\text{Ag}^+\\text{(aq)}+\\text{Cl}^-\\text{(aq)}$. Likevektskonstanten kalles <strong>løselighetsproduktet</strong> $K_{sp}$.','Vi sammenligner <strong>ioneproduktet</strong> $Q$ med $K_{sp}$. Er $Q<K_{sp}$, er løsningen umettet, og alt holder seg oppløst. Er $Q>K_{sp}$, felles salt ut til produktet av de frie ionene blir lik $K_{sp}$.','Diagrammet bruker logaritmer på begge aksene. Da blir grensen $[\\text{Ag}^+][\\text{Cl}^-]=K_{sp}$ en rett linje. Det hule punktet viser hva du har tilsatt, det fylte hva som er fritt i løsningen.','<strong>Felles ion-effekt</strong>: Er det allerede mye Cl⁻ i løsningen, kan det løses svært lite AgCl. Det brukes i analyse for å felle ut ioner nesten fullstendig. Prikkene i begeret følger en logaritmisk skala.'],
tasks:['Regn ut løseligheten til AgCl i rent vann i mol/L og i mg per liter.','Hvorfor felles AgI ut ved mye lavere konsentrasjoner enn AgCl?','Lag en mettet løsning og tilsett mer anion. Hva skjer med konsentrasjonen av Ag⁺?','Hvor mye Cl⁻ må det være for at [Ag⁺] skal bli lavere enn 1·10⁻⁸ mol/L?'],
init(S){S.flake=[];S.lastx=0},
update(S,dt){const sl=SALT[S.p.salt],e=eq(S.p.a,S.p.b,sl.K);if(e.x>S.lastx*1.02+1e-9){for(let i=0;i<8;i++)S.flake.push({x:Math.random(),y:Math.random()*.6,t:0})}S.lastx=e.x;S.flake.forEach(f=>{f.t+=dt;f.y+=dt*.25});S.flake=S.flake.filter(f=>f.y<1)},
draw(S){const p=S.p,sl=SALT[p.salt],e=eq(p.a,p.b,sl.K),Q=p.a*p.b;const[bl,br]=split(S,.4,{g:30,b:pad(S,30,34,40)});
 const bw=Math.min(bl.w*.8,(bl.h-46)/1.05),bh=bw*1.05,bx=bl.l+(bl.w-bw)/2,by=bl.t+16;X.beginPath();X.moveTo(bx,by);X.lineTo(bx,by+bh);X.lineTo(bx+bw,by+bh);X.lineTo(bx+bw,by);X.strokeStyle=A(C.fg,.7);X.lineWidth=2.4;X.stroke();rct(bx+2,by+bh*.12,bw-4,bh*.88-2,null,A(C.blue,.1));
 const cnt=v=>Math.max(0,Math.round(9*(lg(v)+8)));const rg=rng(3);const nca=cnt(e.ca),nan=cnt(e.an);for(let i=0;i<nca;i++)dot(bx+8+rg()*(bw-16),by+bh*.15+rg()*(bh*.7),3,C.blue);for(let i=0;i<nan;i++)dot(bx+8+rg()*(bw-16),by+bh*.15+rg()*(bh*.7),3,C.green);
 S.flake.forEach(f=>dot(bx+8+f.x*(bw-16),by+bh*.15+f.y*bh*.8,2,A(sl.c,.9)));
 const mg=e.x*.1*sl.M*1000;if(mg>0){const hh=Math.min(bh*.35,6+Math.sqrt(mg)*5);X.beginPath();X.moveTo(bx+3,by+bh-2);for(let i=0;i<=30;i++){const xx=bx+3+(bw-6)*i/30;X.lineTo(xx,by+bh-2-hh*(.75+.25*Math.sin(i*1.7))*Math.sin(PI*i/30)**.3)}X.lineTo(bx+bw-3,by+bh-2);X.fillStyle=sl.c;X.fill()}
 T(sl.ca,bx+4,by+bh+16,{s:12,c:C.blue});T(sl.an,bx+bw-4,by+bh+16,{a:'right',s:12,c:C.green});T(mg>0?`bunnfall: ${nf(mg,mg<1?3:1)} mg ${sl.n}`:'ingen bunnfall',bx+bw/2,by+bh+34,{a:'center',s:12.5,c:mg>0?C.fg:C.fg3});T('100 mL løsning',bx+bw/2,by+4,{a:'center',s:11,c:C.fg3});
 const P=Plane(-8,-2,-8,-2,{l:br.l+40,t:br.t+18,w:br.w-40,h:br.h-58},true);P.grid(1,{minor:false,alpha:.07});P.axes({xs:P.w<260?2:1,ys:1,xAt:-8,yAt:-8,x0:true,y0:true,xf:v=>'10'+sup(v),yf:v=>'10'+sup(v)});
 const lK=lg(sl.K);P.clip(()=>{const pts=[[P.X(-8),P.Y(lK+8)],[P.X(lK+8),P.Y(-8)],[P.X(-2),P.Y(-8)],[P.X(-2),P.Y(-2)],[P.X(-8),P.Y(-2)]];poly(pts,null,A(C.red,.1));P.fn(x=>lK-x,C.red,2.4,{prog:1})});
 T('felling: Q > Ksp',P.X(-2.2),P.Y(-2.3),{a:'right',s:12,c:C.red});T('umettet: Q < Ksp',P.X(-7.8),P.Y(-7.6),{s:12,c:C.fg2});
 const xa=lg(p.b),ya=lg(p.a),xe=lg(e.an),ye=lg(e.ca);P.clip(()=>{if(e.x>0){ln(P.X(xa),P.Y(ya),P.X(xe),P.Y(ye),A(C.fg,.5),1.4,[4,4])}circ(P.X(xa),P.Y(ya),7,C.yellow,null,2);dot(P.X(xe),P.Y(ye),5.5,C.yellow)});if(xe<-8||ye<-8)T('fritt punkt utenfor diagrammet',P.l+P.w-4,P.t+P.h-12,{a:'right',s:11,c:C.yellow});
 Tm('['+sl.an+']',P.l+P.w-2,P.t+P.h+30,{a:'right',s:14,c:C.green});Tm('['+sl.ca+']',P.l+8,P.t+8,{s:14,c:C.blue});
 lab({l:br.l,t:br.t+14},`Ksp(${sl.n}) = ${sci(sl.K,2)}   Q = ${sci(Q,2)}`)},
readout(S){const p=S.p,sl=SALT[p.salt],e=eq(p.a,p.b,sl.K),Q=p.a*p.b;return[['Q',sci(Q,2)],['Ksp',sci(sl.K,2),'red'],['fritt '+sl.ca,sci(e.ca,2)+' mol/L','blue'],['fritt '+sl.an,sci(e.an,2)+' mol/L','green'],['felt ut',nf(e.x*.1*sl.M*1000,3)+' mg']]}
});
}

/* ---------- Elektrolyse ---------- */
{
const F_=96485,PR={cu:{n:'Kobberklorid, CuCl₂(aq)',U:2.0,kat:'Cu²⁺ + 2e⁻ → Cu(s)',an:'2Cl⁻ → Cl₂(g) + 2e⁻',sol:'teal'},h2o:{n:'Vann med litt Na₂SO₄',U:2.2,kat:'2H₂O + 2e⁻ → H₂(g) + 2OH⁻',an:'2H₂O → O₂(g) + 4H⁺ + 4e⁻',sol:null},al:{n:'Aluminium fra smeltet Al₂O₃',U:4.2,kat:'Al³⁺ + 3e⁻ → Al(l)',an:'C(s) + 2O²⁻ → CO₂(g) + 4e⁻',sol:'gold'}};
M({id:'ki-elektrolyse',s:'ki',c:['KJ2'],title:'Elektrolyse og Faradays lov',short:'Elektrolyse',kw:'elektrolyse faraday faradays konstant strøm ladning katode anode reduksjon oksidasjon kobber hydrogen oksygen aluminium elektrolysecelle redoks',
lead:'I en elektrolyse driver en strømkilde en redoksreaksjon som ikke går av seg selv. Ved katoden tas elektroner opp (reduksjon), ved anoden avgis de (oksidasjon). Mengden stoff er proporsjonal med ladningen som har gått gjennom.',
controls:[{id:'pr',type:'seg',label:'Elektrolyse',value:'cu',options:[['cu','CuCl₂'],['h2o','Vann'],['al','Aluminium']]},{id:'I',label:'Strøm',min:.1,max:5,step:.1,value:1.5,unit:'A',d:1,show:S=>S.p.pr!=='al'},{id:'Ik',label:'Strøm i industrielt kar',min:100,max:500,step:10,value:300,unit:'kA',show:S=>S.p.pr==='al'},
 {id:'sp',label:'Minutter per sekund',min:.5,max:30,step:.5,value:5,d:1},{type:'btns',items:[['Start på nytt',S=>MOD['ki-elektrolyse'].init(S)]]}],
tex:['Q=I\\cdot t','n(e^-)=\\frac{Q}{F},\\quad F=96\\,485\\ \\text{C/mol}','n(\\text{stoff})=\\frac{n(e^-)}{z},\\quad m=n\\cdot M'],
about:['Strømkilden pumper elektroner inn i <strong>katoden</strong> (−). Der tar positive ioner eller vannmolekyler opp elektroner og blir redusert. Ved <strong>anoden</strong> (+) avgir negative ioner eller vann elektroner og blir oksidert.','<strong>Faradays lov</strong>: Ladningen $Q=It$ gir stoffmengden elektroner $Q/F$. $F$ er ladningen til ett mol elektroner. Trengs det $z$ elektroner per atom eller molekyl, får vi $n=Q/(zF)$.','Ved elektrolyse av vann blir det dobbelt så mye hydrogen som oksygen, målt i volum. Det ser du i rørene.','Aluminium lages ved elektrolyse av aluminiumoksid løst i smeltet kryolitt ved omtrent 960 °C. Det går med omtrent 13–15 kWh per kilo aluminium. Norge produserer mye aluminium fordi vi har mye vannkraft.'],
tasks:['Hvor mange gram kobber felles ut med 1,5 A i 30 minutter?','Hvorfor blir det dobbelt så stort volum hydrogen som oksygen?','Hvor lang tid tar det å lage 1 kg aluminium med 300 kA?','Regn ut energien per kilo aluminium. Sammenlign med strømforbruket til en husstand per år.'],
init(S){S.Q=0;S.min=0;S.bub=[];S.ions=[...Array(40)].map((_,i)=>({x:Math.random(),y:Math.random(),k:i%2}));S.el=[...Array(14)].map((_,i)=>i/14)},
change(S,id){if(id==='pr')this.init(S)},
I(S){return S.p.pr==='al'?S.p.Ik*1000:S.p.I},
update(S,dt){const I=this.I(S),dm=dt*S.p.sp;S.min+=dm;S.Q+=I*dm*60;const al=S.p.pr==='al';const sp=al?1:S.p.I/2;
 S.el=S.el.map(v=>(v+dt*.25*Math.max(.2,sp))%1);S.ions.forEach(q=>{q.x+=(q.k?1:-1)*dt*.05*Math.max(.3,sp)+(Math.random()-.5)*dt*.05;q.y+=(Math.random()-.5)*dt*.08;if(q.x<0||q.x>1){q.x=q.k?0:1;q.y=Math.random()}q.y=clamp(q.y,0,1)});
 const pr=S.p.pr,rate=al?6:sp*4;if(Math.random()<dt*rate)S.bub.push({s:1,x:Math.random(),y:0});if(pr==='h2o'&&Math.random()<dt*rate*2)S.bub.push({s:0,x:Math.random(),y:0});
 S.bub.forEach(b=>b.y+=dt*.35);S.bub=S.bub.filter(b=>b.y<1)},
draw(S){const p=S.p,pr=PR[p.pr],al=p.pr==='al';const I=this.I(S),ne=S.Q/F_;const[bl,br]=split(S,.55,{g:28,b:pad(S,26,26,40)});
 const bw=bl.w*.78,bh=bl.h*.58,bx=bl.l+(bl.w-bw)/2,by=bl.t+bl.h-bh-30;const sol=pr.sol?C[pr.sol]:C.blue;
 if(al){rr(bx-8,by-6,bw+16,bh+14,6,null,A(C.fg,.25));rct(bx,by+bh*.12,bw,bh*.88,null,A(C.gold,.35));glow(bx+bw/2,by+bh*.6,bw*.5,C.red,.18)}else rct(bx,by+bh*.12,bw,bh*.88,null,sol===C.blue?A(C.blue,.1):A(sol,.22));
 X.beginPath();X.moveTo(bx,by);X.lineTo(bx,by+bh);X.lineTo(bx+bw,by+bh);X.lineTo(bx+bw,by);X.strokeStyle=A(C.fg,.7);X.lineWidth=2.4;X.stroke();
 const ew=16,kx=al?bx+bw/2:bx+bw*.22,ax=al?bx+bw/2:bx+bw*.78,etop=by-36;
 let kat,ano;if(al){kat={x:bx+4,y:by+bh-14,w:bw-8,h:10};ano={x:bx+bw*.3,y:etop,w:bw*.4,h:by+bh*.55-etop}}else{kat={x:kx-ew/2,y:etop,w:ew,h:by+bh*.85-etop};ano={x:ax-ew/2,y:etop,w:ew,h:by+bh*.85-etop}}
 const mass=al?ne/3*26.98:p.pr==='cu'?ne/2*63.55:0;
 rct(kat.x,kat.y,kat.w,kat.h,null,A(C.fg,.55));rct(ano.x,ano.y,ano.w,ano.h,null,al?A(C.grey,.9):A(C.fg,.55));
 if(p.pr==='cu'&&mass>0){const th=Math.min(7,1+Math.sqrt(mass)*2.2);rct(kat.x-th,by+bh*.12,kat.w+2*th,kat.y+kat.h-by-bh*.12,null,'#b8733a')}
 if(al){const th=Math.min(bh*.3,4+Math.sqrt(mass/1000)*3);rct(bx+3,by+bh-3-th,bw-6,th,null,A(C.fg2,.9));T('flytende aluminium',bx+bw/2,by+bh-th/2-4,{a:'center',s:11,c:C.stage})}
 const rtop=bl.t+12,bx1=bl.l+bl.w/2;rr(bx1-36,rtop-10,72,24,4,A(C.fg,.6),A(C.stage,.9),1.5);T(nf(pr.U,1)+' V',bx1,rtop+2,{a:'center',f:'n',s:12,c:C.fg});
 const kxc=al?bx+8:kat.x+kat.w/2,axc=ano.x+ano.w/2;const wire=[[axc,ano.y],[axc,rtop+2],[bx1+36,rtop+2]],wire2=[[bx1-36,rtop+2],[kxc,rtop+2],[kxc,al?by-6:kat.y]];pth(wire,A(C.fg,.6),2);pth(wire2,A(C.fg,.6),2);if(al)ln(kxc,by-6,kxc,by+bh-8,A(C.fg,.6),2);
 const along=(path,f)=>{const L=[];let tot=0;for(let i=1;i<path.length;i++){const d=Math.hypot(path[i][0]-path[i-1][0],path[i][1]-path[i-1][1]);L.push(d);tot+=d}let s=f*tot;for(let i=0;i<L.length;i++){if(s<=L[i]){const t=s/L[i];return[lerp(path[i][0],path[i+1][0],t),lerp(path[i][1],path[i+1][1],t)]}s-=L[i]}return path[path.length-1]};
 S.el.forEach(f=>{const q=f<.5?along(wire,f*2):along(wire2,(f-.5)*2);dot(q[0],q[1],2.6,C.yellow)});T('e⁻',bx1+44,rtop-12,{s:12,c:C.yellow});
 T('−',bx1-26,rtop+2,{a:'center',f:'n',s:14,c:C.blue});T('+',bx1+26,rtop+2,{a:'center',f:'n',s:14,c:C.red});
 T('katode (−)',al?bx+bw*.12:kat.x+kat.w/2,al?by+bh+14:etop-10,{a:'center',s:11.5,c:C.blue});T('anode (+)',ano.x+ano.w/2+(al?ano.w/2+30:0),al?etop+10:etop-10,{a:'center',s:11.5,c:C.red});
 S.ions.forEach(q=>{const x=bx+10+q.x*(bw-20),y=by+bh*.2+q.y*bh*.65;if(al){dot(x,y,2.8,q.k?A(C.red,.7):A(C.fg2,.8))}else if(p.pr==='cu'){dot(x,y,3,q.k?C.green:C.blue)}else{dot(x,y,2.4,A(q.k?C.red:C.fg2,.55))}});
 S.bub.forEach(b=>{let x,y0,y1;if(al){x=ano.x+b.x*ano.w;y0=ano.y+ano.h;y1=by+bh*.12}else{const e_=b.s?ano:kat;x=e_.x+e_.w/2+(b.x-.5)*ew*1.6;y0=by+bh*.8;y1=by+bh*.12}const y=lerp(y0,y1,b.y);circ(x,y,al?3.4:2.6,A(p.pr==='cu'?(b.s?C.green:C.fg):b.s?C.red:C.fg,.8),null,1.2)});
 const fs=isWide(S)?1:.78;let y=br.t+8;const L=(s_,c=C.fg2,sz=13)=>{y+=Twrap(s_,br.l,y,br.w,{s:sz*fs,c,f:'n'})+7*fs};
 T(pr.n,br.l,y,{s:14*fs,w:700,c:C.fg});y+=24*fs;L('katode: '+pr.kat,C.blue,12);L('anode: '+pr.an,C.red,12);y+=4;
 const t=S.min;L(`t = ${nf(t,1)} min = ${nf(t*60,0)} s`);L(`Q = I·t = ${al?nf(I/1000,0)+' kA':nf(I,1)+' A'} · ${nf(t*60,0)} s`);L(`  = ${sci(S.Q,3)} C`);L(`n(e⁻) = Q/F = ${al?nf(ne,0):nf(ne,4)} mol`,C.yellow);
 if(p.pr==='cu'){L('m(Cu) = n(e⁻)/2 · 63,55 g/mol');L(`  = ${nf(mass,3)} g`,C.fg,14)}
 else if(p.pr==='h2o'){L('V(H₂) = n(e⁻)/2 · 24,5 L/mol');L(`  = ${nf(ne/2*24.5*1000,1)} mL`,C.fg,14);L('V(O₂) = n(e⁻)/4 · 24,5 L/mol');L(`  = ${nf(ne/4*24.5*1000,1)} mL`,C.fg,14)}
 else{L('m(Al) = n(e⁻)/3 · 26,98 g/mol');L(`  = ${nf(mass/1000,1)} kg`,C.fg,14);const kWh=pr.U*S.Q/3.6e6;L(`energi: ${nf(kWh,0)} kWh`,C.fg2);if(mass>1)L(`= ${nf(kWh/(mass/1000),1)} kWh per kg Al`,C.gold,13.5)}},
readout(S){const p=S.p,ne=S.Q/F_;const r=[['tid',nf(S.min,1)+' min'],['ladning',sci(S.Q,3)+' C'],['elektroner',(p.pr==='al'?nf(ne,0):nf(ne,4))+' mol','yellow']];if(p.pr==='cu')r.push(['kobber',nf(ne/2*63.55,3)+' g']);else if(p.pr==='h2o')r.push(['H₂ : O₂',nf(ne/2*24500,1)+' : '+nf(ne/4*24500,1)+' mL']);else r.push(['aluminium',nf(ne/3*26.98/1000,1)+' kg']);return r}
});
}

/* ---------- Grønn kjemi: atomøkonomi ---------- */
{
const AM={H:1.008,C:12.011,N:14.007,O:15.999,Na:22.99,Cl:35.45,Br:79.904};
const ACOL_={H:'#e8ecef',C:'#7b8490',N:'#4f7fd8',O:'#e0524a',Na:'#a77be0',Cl:'#5fbf5a',Br:'#a5463d'},ARAD_={H:3.6,C:5.2,N:5,O:5,Na:6,Cl:6,Br:6.4};
const parse=f=>{const o={};f.replace(/([A-Z][a-z]?)(\d*)/g,(_,e,n)=>{o[e]=(o[e]||0)+(n?+n:1)});return o};
const mass=f=>{const o=parse(f);return Object.entries(o).reduce((s,[e,n])=>s+AM[e]*n,0)};
const DISP={H4O2:'2 H2O',H3O:'H3O+',NH3O:'NH2OH',C2H5ONa:'C2H5ONa',C2H6O:'C2H5OH'};
const sub_=f=>(DISP[f]||f).replace(/\d+/g,d=>[...d].map(c=>'₀₁₂₃₄₅₆₇₈₉'[c]).join('')).replace('+','⁺').replace(/^₂ /,'2 ');
const RX={eten:{n:'Etanol: eten + vann (addisjon)',re:[['C2H4',1],['H2O',1]],pr:['C2H6O',1],pn:'etanol'},
 gjaer:{n:'Etanol: gjæring av glukose',re:[['C6H12O6',1]],pr:['C2H6O',2],pn:'etanol'},
 subst:{n:'Etanol: brometan + NaOH (substitusjon)',re:[['C2H5Br',1],['NaOH',1]],pr:['C2H6O',1],pn:'etanol'},
 boots:{n:'Ibuprofen: Boots-metoden (6 trinn)',re:[['C10H14',1],['C4H6O3',1],['C4H7ClO2',1],['C2H5ONa',1],['H3O',1],['NH3O',1],['H4O2',1]],pr:['C13H18O2',1],pn:'ibuprofen'},
 bhc:{n:'Ibuprofen: BHC-metoden (3 trinn)',re:[['C10H14',1],['C4H6O3',1],['H2',1],['CO',1]],pr:['C13H18O2',1],pn:'ibuprofen'}};
const pack=(n,r)=>{const pts=[];let k=0,ring=0;pts.push([0,0]);while(pts.length<n){ring++;const m=ring*6;for(let i=0;i<m&&pts.length<n;i++){const a=i/m*TAU+ring*.3;pts.push([Math.cos(a)*ring*r*1.9,Math.sin(a)*ring*r*1.9])}}return pts};
M({id:'ki-gronn',s:'ki',c:['KJ1','KJ2','NAT'],title:'Grønn kjemi: atomøkonomi',short:'Atomøkonomi',kw:'grønn kjemi atomøkonomi utbytte avfall bærekraft syntese ibuprofen etanol biprodukt e-faktor miljø',
lead:'Grønn kjemi handler om å lage stoffene vi trenger med minst mulig avfall. Atomøkonomien forteller hvor stor del av atomene i råstoffene som havner i produktet vi vil ha.',
controls:[{id:'rx',type:'sel',label:'Reaksjon',value:'boots',options:Object.entries(RX).map(([k,v])=>[k,v.n])},{id:'y',label:'Utbytte',min:10,max:100,step:1,value:85,unit:'%'}],
tex:['\\text{atomøkonomi}=\\frac{M(\\text{ønsket produkt})}{\\sum M(\\text{reaktanter})}\\cdot 100\\,\\%','\\text{andel av råstoffet i produktet}=\\text{atomøkonomi}\\cdot\\text{utbytte}'],
about:['<strong>Atomøkonomi</strong> regnes ut fra den balanserte reaksjonslikningen. Ved en addisjon havner alle atomene i produktet, og atomøkonomien blir 100 %. Ved substitusjon og eliminasjon blir det alltid biprodukter.','<strong>Utbytte</strong> er hvor mye produkt du faktisk får i forhold til det som er teoretisk mulig. En reaksjon kan ha høyt utbytte og likevel lage mye avfall, hvis atomøkonomien er dårlig.','Ibuprofen ble først laget med en metode i seks trinn der bare omtrent 40 % av atomene havnet i medisinen. En nyere metode med tre trinn og katalysatorer har omtrent 77 %, og nesten alt biproduktet (eddiksyre) brukes videre.','Andre prinsipper i grønn kjemi er å bruke fornybare råstoffer, tryggere løsemidler, katalysatorer, og å spare energi.'],
tasks:['Regn ut atomøkonomien for gjæring av glukose til etanol. Hva er biproduktet?','Hvorfor har addisjonsreaksjoner 100 % atomøkonomi?','Sammenlign Boots- og BHC-metoden. Hvor mye avfall blir det per kilo ibuprofen med hver av dem?','Kan en reaksjon med 100 % atomøkonomi likevel være lite miljøvennlig? Gi eksempler.'],
init(S){S.cyc=0},
update(S,dt){S.cyc=(S.cyc+dt/6)%1},
calc(rx){const tot=rx.re.reduce((s,[f,c])=>s+mass(f)*c,0),prod=mass(rx.pr[0])*rx.pr[1];return{tot,prod,ae:prod/tot}},
draw(S){const rx=RX[S.p.rx],{tot,prod,ae}=this.calc(rx),yl=S.v.y/100;const b=pad(S,26,30,40);const[top,bot]=rows(b,[2.2,1],40);
 const L={l:top.l,t:top.t,w:top.w*.5,h:top.h},Rp={l:top.l+top.w*.62,t:top.t,w:top.w*.38,h:top.h*.46},Rw={l:top.l+top.w*.62,t:top.t+top.h*.6,w:top.w*.38,h:top.h*.4};
 lab(L,'Reaktanter');lab(Rp,'Ønsket produkt: '+rx.pn);lab(Rw,'Biprodukter og avfall');rr(Rp.l,Rp.t,Rp.w,Rp.h,6,A(C.green,.4),A(C.green,.05),1.2);rr(Rw.l,Rw.t,Rw.w,Rw.h,6,A(C.fg,.25),A(C.fg,.03),1.2);
 const mols=[];rx.re.forEach(([f,c])=>{for(let i=0;i<c;i++)mols.push(f)});const nm=mols.length,colsN=nm>4?3:nm>1?2:1,rowsN=Math.ceil(nm/colsN);const cw=L.w/colsN,ch=L.h/rowsN;
 const atoms=[];mols.forEach((f,mi)=>{const o=parse(f);const list=[];['C','N','O','Na','Cl','Br','H'].forEach(e=>{for(let k=0;k<(o[e]||0);k++)list.push(e)});const pk=pack(list.length,4.4);const cx=L.l+(mi%colsN+.5)*cw,cy=L.t+(Math.floor(mi/colsN)+.45)*ch;
  list.forEach((e,k)=>atoms.push({e,x:cx+pk[k][0],y:cy+pk[k][1]}));T(sub_(f),cx,L.t+(Math.floor(mi/colsN)+1)*ch-10,{a:'center',f:'n',s:11.5,c:C.fg2})});
 const need={};const po=parse(rx.pr[0]);Object.entries(po).forEach(([e,n])=>need[e]=n*rx.pr[1]);const prodA=[],wasteA=[];atoms.forEach(a=>{if(need[a.e]>0){need[a.e]--;prodA.push(a)}else wasteA.push(a)});
 const ord=l=>{const r=[];['C','N','O','Na','Cl','Br','H'].forEach(e=>l.forEach(a=>{if(a.e===e)r.push(a)}));return r};const pP=pack(prodA.length,4.4),pW=pack(wasteA.length,4.4);
 const c=S.cyc,u=c<.25?0:c<.6?ease((c-.25)/.35):1;
 ord(prodA).forEach((a,k)=>{const tx=Rp.l+Rp.w/2+pP[k][0],ty=Rp.t+Rp.h/2+pP[k][1];const x=lerp(a.x,tx,u),y=lerp(a.y,ty,u)-Math.sin(u*PI)*30;circ(x,y,ARAD_[a.e],null,ACOL_[a.e])});
 ord(wasteA).forEach((a,k)=>{const tx=Rw.l+Rw.w/2+pW[k][0],ty=Rw.t+Rw.h/2+pW[k][1];const x=lerp(a.x,tx,u),y=lerp(a.y,ty,u)+Math.sin(u*PI)*20;circ(x,y,ARAD_[a.e],null,A(ACOL_[a.e],u>.95?.45:1))});
 if(u>.95){T(sub_(rx.pr[0])+(rx.pr[1]>1?' ×'+rx.pr[1]:''),Rp.l+Rp.w/2,Rp.t+Rp.h-10,{a:'center',f:'n',s:12,c:C.green});if(!wasteA.length)T('ingen avfall',Rw.l+Rw.w/2,Rw.t+Rw.h/2,{a:'center',s:12.5,c:C.fg3})}
 arr(L.l+L.w+10,top.t+top.h*.4,Rp.l-12,top.t+top.h*.4,A(C.fg,.35),2,10);
 const nw2=!isWide(S),bx=bot.l+(nw2?0:130),bw=bot.w-(nw2?0:140),by=bot.t+8,bh=22;if(!nw2)T('masse av råstoffene',bot.l,by+bh/2,{s:12,c:C.fg2});rct(bx,by,bw,bh,null,A(C.fg,.12));rct(bx,by,bw*ae,bh,null,A(C.green,.45));rct(bx,by,bw*ae*yl,bh,null,A(C.green,.85));
 T(`atomøkonomi ${nf(ae*100,1)} %`,bx+6,by+bh/2,{s:12,w:700,c:C.stage});
 const fs=isWide(S)?1:.8;T(`ønsket produkt i teorien: ${nf(prod,1)} av ${nf(tot,1)} g/mol`,bx,by+bh+16*fs,{f:'n',s:11.5*fs,c:C.fg2});T(`med ${nf(yl*100,0)} % utbytte havner ${nf(ae*yl*100,1)} % av råstoffet i produktet`,bx,by+bh+34*fs,{s:12*fs,c:C.green});
 T(`avfall per kg produkt: ${nf(1/(ae*yl)-1,2)} kg`,bx,by+bh+52*fs,{s:12*fs,c:C.fg3});
 let lx=top.l;[['C','karbon'],['H','hydrogen'],['O','oksygen'],['N','nitrogen'],['Na','natrium'],['Cl','klor'],['Br','brom']].forEach(([e,n])=>{if(!atoms.some(a=>a.e===e))return;dot(lx+5,b.t+b.h+18,4.5,ACOL_[e]);T(n,lx+13,b.t+b.h+18,{s:11,c:C.fg3});lx+=tw(n,{s:11})+30})},
readout(S){const rx=RX[S.p.rx],{tot,prod,ae}=this.calc(rx),yl=S.p.y/100;return[['M(reaktanter)',nf(tot,1)+' g/mol'],['M(produkt)',nf(prod,1)+' g/mol','green'],['atomøkonomi',nf(ae*100,1)+' %','green'],['av råstoffet i produktet',nf(ae*yl*100,1)+' %']]},
live(S){const rx=RX[S.p.rx],{tot,prod,ae}=this.calc(rx);return `\\frac{${tn(prod,1)}}{${tn(tot,1)}}\\cdot 100\\,\\%=${tn(ae*100,1)}\\,\\%`}
});
}

/* ---------- Polymerer: addisjon og kondensasjon ---------- */
{
const MON={pe:{n:'Eten → polyeten (PE)',t:'add',c:['teal']},pp:{n:'Propen → polypropen (PP)',t:'add',c:['gold']},pvc:{n:'Kloreten → PVC',t:'add',c:['green']},
 pet:{n:'Tereftalsyre + etandiol → PET (polyester)',t:'kond',c:['pink','blue']},nylon:{n:'Heksandisyre + heksandiamin → nylon-6,6',t:'kond',c:['gold','purple']},pla:{n:'Melkesyre → PLA (fra planter)',t:'kond',c:['green','green']}};
const N0=90;
M({id:'ki-polymer',s:'ki',c:['KJ2'],title:'Polymerer: addisjon og kondensasjon',short:'Polymerisering',kw:'polymer plast monomer polymerisering addisjonspolymerisering kondensasjonspolymerisering polyeten pet nylon pla kjedelengde gjenvinning resirkulering makromolekyl',
lead:'Plast består av svært lange molekyler, polymerer, laget av mange små byggesteiner, monomerer. Ved addisjon hekter monomerene seg på enden av voksende kjeder. Ved kondensasjon kobles molekyler sammen og vann spaltes av.',
controls:[{id:'mon',type:'sel',label:'Monomer',value:'pe',options:Object.entries(MON).map(([k,v])=>[k,v.n])},{id:'sp',label:'Fart',min:.2,max:3,step:.1,value:1,d:1},{type:'btns',items:[['Start på nytt',S=>MOD['ki-polymer'].init(S)]]}],
tex:['n\\,\\text{CH}_2{=}\\text{CH}_2\\rightarrow\\left[-\\text{CH}_2-\\text{CH}_2-\\right]_n','\\text{kondensasjon: }\\text{A}+\\text{B}\\rightarrow\\text{A{-}B}+\\text{H}_2\\text{O}','\\bar X_n\\approx\\frac{1}{1-p}\\quad\\text{(kondensasjon)}'],
about:['Ved <strong>addisjonspolymerisering</strong> åpnes dobbeltbindingen i monomeren. En initiator starter en aktiv kjede, og monomerer hekter seg på enden én etter én. Det blir raskt lange kjeder, mens resten av monomerene venter.','Ved <strong>kondensasjonspolymerisering</strong> reagerer to funksjonelle grupper, for eksempel en syre og en alkohol, og det spaltes av et vannmolekyl. Alle molekylene kan reagere med hverandre, så først dannes korte biter som etter hvert kobles til lange kjeder.','Grafen viser gjennomsnittlig kjedelengde mot hvor mye av monomerene som er brukt. Ved kondensasjon trengs nesten 100 % omsetning for å få lange kjeder.','Plast kan gjenvinnes mekanisk (smeltes og formes på nytt) eller kjemisk (brytes ned til monomerer). Polyestere som PET og PLA kan spaltes tilbake med vann (hydrolyse).'],
tasks:['Kjør addisjonspolymerisering. Hvor mange monomerer er igjen når de første kjedene er lange?','Kjør PET. Hvor stor må omsetningen være før gjennomsnittet passerer 10 enheter?','Hvorfor dannes det vann ved kondensasjonspolymerisering, men ikke ved addisjon?','Hvilken type polymerisering gir PLA? Hvorfor kalles den ofte biologisk nedbrytbar?'],
init(S){const rg=Math.random;S.ch=[...Array(N0)].map(()=>({b:[0],x:rg(),y:rg(),a:rg()*TAU,s:rg()*100,act:false,dead:false}));if(MON[S.p.mon].t==='kond')S.ch.forEach((c,i)=>c.b=[i%2]);S.w=[];S.hist=[];S.acc=0;S.ini=0;S.tt=0},
change(S,id){if(id==='mon')this.init(S)},
stats(S){const kond=MON[S.p.mon].t==='kond';const mon=S.ch.filter(c=>c.b.length===1&&!c.act).length;const pol=S.ch.filter(c=>c.b.length>1||c.act);const used=N0-mon;const xn=kond?N0/S.ch.length:(pol.length?pol.reduce((s,c)=>s+c.b.length,0)/pol.length:0);const p=kond?1-S.ch.length/N0:used/N0;return{mon,pol:pol.length,xn,p,nmol:S.ch.length}},
update(S,dt){const m=MON[S.p.mon],kond=m.t==='kond';const h=dt*S.p.sp;S.tt+=h;
 if(kond){S.acc+=h*1.4*S.ch.length*S.ch.length/N0/4;while(S.acc>=1&&S.ch.length>1){S.acc-=1;const i=Math.floor(Math.random()*S.ch.length);let j=Math.floor(Math.random()*(S.ch.length-1));if(j>=i)j++;const A_=S.ch[i],B_=S.ch[j];let nb=A_.b;const bb=B_.b;if(m.c.length>1&&nb[nb.length-1]===bb[0])nb=nb.concat(bb.slice().reverse());else nb=nb.concat(bb);A_.b=nb;A_.x=(A_.x+B_.x)/2;A_.y=(A_.y+B_.y)/2;S.ch.splice(j,1);S.w.push({x:A_.x,y:A_.y,t:0})}}
 else{S.ini+=h*.5;while(S.ini>=1&&S.ch.filter(c=>c.act).length<6){S.ini-=1;const free=S.ch.filter(c=>c.b.length===1&&!c.act);if(!free.length)break;free[Math.floor(Math.random()*free.length)].act=true}if(S.ini>1)S.ini=1;
  const act=S.ch.filter(c=>c.act);act.forEach(c=>{const free=S.ch.filter(q=>q.b.length===1&&!q.act);if(free.length&&Math.random()<h*6*free.length/N0){const q=free[Math.floor(Math.random()*free.length)];c.b.push(0);S.ch.splice(S.ch.indexOf(q),1)}});
  const act2=S.ch.filter(c=>c.act);if(act2.length>=2&&Math.random()<h*.08*act2.length){const a=act2[0],b=act2[1];a.b=a.b.concat(b.b);a.act=false;a.dead=true;S.ch.splice(S.ch.indexOf(b),1)}
  if(!S.ch.some(c=>c.b.length===1&&!c.act))S.ch.forEach(c=>{if(c.act){c.act=false;c.dead=true}})}
 S.ch.forEach(c=>{c.a+=(Math.random()-.5)*h*2;const sp=.03/Math.sqrt(c.b.length);c.x+=Math.cos(c.a)*sp*h;c.y+=Math.sin(c.a)*sp*h;if(c.x<.05||c.x>.95)c.a=PI-c.a;if(c.y<.05||c.y>.95)c.a=-c.a;c.x=clamp(c.x,.04,.96);c.y=clamp(c.y,.04,.96)});
 S.w.forEach(q=>{q.t+=dt;q.y-=dt*.08});S.w=S.w.filter(q=>q.t<2);
 const st=this.stats(S);if(!S.hist.length||st.p-S.hist[S.hist.length-1][0]>.004)S.hist.push([st.p,st.xn])},
draw(S){const m=MON[S.p.mon],kond=m.t==='kond';const[bl,br]=split(S,.56,{g:28,b:pad(S,26,30,40)});frame(bl);
 X.save();X.beginPath();X.rect(bl.l,bl.t,bl.w,bl.h);X.clip();const sp=Math.min(bl.w,bl.h)/44;
 S.ch.forEach(c=>{const n=c.b.length;let x=bl.l+c.x*bl.w,y=bl.t+c.y*bl.h,ang=c.a*.3+c.s;const pts=[];for(let i=0;i<n;i++){pts.push([x,y]);ang+=Math.sin(i*.9+c.s)*.5+Math.sin(i*.37+c.s*2)*.35;x+=Math.cos(ang)*sp;y+=Math.sin(ang)*sp}
  const cx=pts.reduce((s,q)=>s+q[0],0)/n-(bl.l+c.x*bl.w),cy=pts.reduce((s,q)=>s+q[1],0)/n-(bl.t+c.y*bl.h);const P_=pts.map(q=>[q[0]-cx,q[1]-cy]);
  if(n>1)pth(P_,A(C.fg,.35),1.6);P_.forEach((q,i)=>dot(q[0],q[1],n===1?3.6:3.2,C[m.c[c.b[i]%m.c.length]]));if(c.act){const q=P_[P_.length-1];glow(q[0],q[1],9,C.yellow,.8);dot(q[0],q[1],2,C.yellow)}});
 S.w.forEach(q=>{const x=bl.l+q.x*bl.w,y=bl.t+q.y*bl.h;dot(x,y,2.6,A(C.red,1-q.t/2));dot(x-3,y+2,1.7,A(C.fg,1-q.t/2));dot(x+3,y+2,1.7,A(C.fg,1-q.t/2))});X.restore();
 lab(bl,kond?'Kondensasjon: molekyler kobles sammen, vann spaltes av':'Addisjon: aktive kjedeender (gule) hekter på monomerer');
 const st=this.stats(S);const[g1,g2]=rows(br,[1,1],46);
 const lens=S.ch.map(c=>c.b.length).filter(L=>L>1);const mx=Math.max(10,...lens);const nb=Math.min(20,mx);const bw=Math.ceil(mx/nb);const bins=new Array(Math.ceil(mx/bw)+1).fill(0);lens.forEach(L=>bins[Math.floor((L-1)/bw)]++);const bm=Math.max(4,...bins);
 const P=Plane(0,bins.length*bw,0,bm*1.15,{l:g1.l+30,t:g1.t,w:g1.w-30,h:g1.h});P.axes({xs:niceStep(bins.length*bw/5),ys:niceStep(bm/3),xAt:0,yAt:0,x0:true,y0:true,xl:'enheter per molekyl',ls:12});lab(g1,`Kjedelengder (${st.mon} frie monomerer er ikke tatt med)`);bins.forEach((v,i)=>{if(v)rct(P.X(i*bw)+1,P.Y(v),bw*P.sx-2,P.Y(0)-P.Y(v),null,A(C.teal,.75))});
 const ym=Math.max(12,...S.hist.map(h=>h[1]))*1.1;const Q=Plane(0,1,0,ym,{l:g2.l+30,t:g2.t,w:g2.w-30,h:g2.h});Q.grid(.25,{sy:niceStep(ym/4),minor:false,alpha:.06});Q.axes({xs:.25,ys:niceStep(ym/4),x0:true,y0:true,xf:v=>nf(v*100,0)+' %',xl:'monomer brukt',ls:12});lab(g2,kond?'Gjennomsnittlig kjedelengde':'Gjennomsnittlig lengde på polymerkjedene');
 if(kond)Q.fn(p=>1/(1-p),A(C.fg,.35),1.4,{to:.99,prog:1,dash:[4,4]});if(S.hist.length>1)pth(S.hist.map(h=>Q.pt(h[0],h[1])),C.yellow,2.6);dot(Q.X(st.p),Q.Y(st.xn),5,C.yellow)},
readout(S){const st=this.stats(S);return[['monomerer igjen',st.mon],['molekyler totalt',st.nmol],['monomer brukt',nf(st.p*100,0)+' %','yellow'],['gj.snittlig lengde',nf(st.xn,1),'teal'],...(MON[S.p.mon].t==='kond'?[['vann spaltet av',N0-st.nmol,'red']]:[])]}
});
}
