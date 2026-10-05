'use strict';
/* ================= GEOGRAFI (del 1) ================= */

/* ---------- Platetektonikk ---------- */
{
const sst=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const pol=t=>Math.sin(TAU*t/1.3+2.2*Math.sin(TAU*t/4.7))>0;
const DEF={div:2.5,sub:7,kol:5,trans:4};
const INFO={div:['Divergent grense: platene glir fra hverandre','Eksempel: Den midtatlantiske ryggen og Island'],sub:['Konvergent grense: havplate under kontinent','Eksempel: Andesfjellene og Japan'],kol:['Konvergent grense: to kontinenter kolliderer','Eksempel: Himalaya'],trans:['Transformgrense: platene glir forbi hverandre','Eksempel: San Andreas-forkastningen i California']};
const slabTop=u=>.47+(u-.46)/.56*.53;
M({id:'ge-plater',s:'ge',c:['GEO'],title:'Platetektonikk: jordskorpa i bevegelse',short:'Platetektonikk',kw:'platetektonikk jordskjelv vulkan subduksjon midthavsrygg fjellkjede indre krefter konveksjon litosfære astenosfære forkastning magnetstriper',
lead:'Jordas ytterste lag er delt i stive plater som flyter på den seige mantelen under. Der platene glir fra hverandre, mot hverandre eller forbi hverandre, oppstår jordskjelv, vulkaner, fjellkjeder og nye hav.',
controls:[{id:'mode',type:'seg',label:'Plategrense',value:'div',options:[['div','Divergent'],['sub','Subduksjon'],['kol','Kollisjon'],['trans','Transform']]},{id:'v',label:'Platefart',min:1,max:10,step:.5,value:2.5,unit:'cm/år'}],
tex:['s=v\\cdot t','1\\ \\tfrac{\\text{cm}}{\\text{år}}=10\\ \\tfrac{\\text{km}}{\\text{million år}}'],
about:['Figurene er <strong>tverrsnitt</strong> gjennom jordskorpa og den øverste delen av mantelen, sterkt forenklet og ikke i riktig målestokk. Den stive litosfæren (skorpe og øverste mantel) flyter på den seige astenosfæren. Varme fra jordas indre driver langsomme strømmer i mantelen.','<strong>Divergent:</strong> Ny havbunn dannes der magma stiger opp i midthavsryggen. Når lava størkner, lagres retningen til jordas magnetfelt. Feltet har snudd mange ganger, så havbunnen får symmetriske striper på hver side av ryggen.','<strong>Subduksjon:</strong> Den tunge havplata dykker ned under den lettere kontinentplata. Jordskjelvene ligger dypere jo lenger inn under kontinentet de er. Vann fra plata gjør at mantelen smelter, og magmaen gir vulkaner.','<strong>Kollisjon:</strong> To kontinentplater er like lette og synker ikke. Skorpa presses sammen og foldes til høye fjell med en dyp fjellrot under.','<strong>Transform:</strong> Platene glir forbi hverandre. Friksjonen holder dem fast mens spenningen bygger seg opp, til de plutselig rykker. Da får vi et jordskjelv.'],
tasks:['Atlanterhavet blir omtrent 2,5 cm bredere hvert år. Hvor mye bredere blir det i løpet av 80 år? Og på 10 millioner år?','Hvorfor er magnetstripene på havbunnen symmetriske om midthavsryggen?','Se på jordskjelvene ved subduksjon. Hvorfor ligger de dypeste lengst inn under kontinentet?','Hvorfor har Island både vulkaner og jordskjelv, mens Norge har få av delene?'],
init(S){S.ma=0;S.yr=0;S.qs=[];S.slip=0;S.nq=0;S.shake=0;S.erupt=1.5;S.bub=[]},
change(S,id){if(id==='mode'){setP('v',DEF[S.p.mode],S);S.v.v=DEF[S.p.mode];this.init(S)}},
update(S,dt){const m=S.p.mode,v=S.p.v;S.ma+=dt*.5;S.shake=Math.max(0,S.shake-dt);
 if(m==='trans'){S.yr+=dt*25;const D=v*S.yr,e=D-S.slip;if(e>350){S.slip=D;S.nq++;S.shake=.6;S.qs.push({u:.15+Math.random()*.7,v:.5,t:S.t})}if(S.slip>2600){S.yr=0;S.slip=0}}
 else{const rate={div:2,sub:5,kol:2.5}[m]*(v/DEF[m]);let n=poisson(rate*dt);while(n-->0){let q;if(m==='div')q={u:.5+gauss()*.015,v:.40+Math.random()*.07};else if(m==='sub'){const s=Math.pow(Math.random(),.8)*.92;const u=.46+s*.56;q={u:u-.004+Math.random()*.008,v:slabTop(u)+Math.random()*.03,s}}else q={u:.5+gauss()*.09,v:.2+Math.random()*.3};q.t=S.t;S.qs.push(q)}}
 S.qs=S.qs.filter(q=>S.t-q.t<(m==='sub'?7:2.5));
 if(m==='div'||m==='sub'){S.erupt-=dt;if(S.erupt<0){S.erupt=2.5+Math.random()*3;for(let i=0;i<14;i++)S.bub.push({x:(Math.random()-.5)*.02,y:0,vx:(Math.random()-.5)*.06,vy:-(.05+Math.random()*.08),t:0})}}
 S.bub.forEach(p=>{p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt});S.bub=S.bub.filter(p=>p.t<2.2)},
draw(S){const m=S.p.mode,b=pad(S,24,40,22);const jx=S.shake>0?(Math.random()-.5)*8*S.shake:0,jy=S.shake>0?(Math.random()-.5)*6*S.shake:0;X.save();X.translate(jx,jy);
 const U=u=>b.l+u*b.w,V=v=>b.t+v*b.h,P=(u,v)=>[U(u),V(v)];
 const cCont=mix(C.gold,C.stage,.5),cOce=mix(C.grey,C.stage,.55),cLith=mix(C.red,C.stage,.78),cSea=A(C.blue,.2);
 X.save();X.beginPath();X.rect(b.l,b.t,b.w,b.h);X.clip();
 if(m!=='trans'){
  const g=X.createLinearGradient(0,V(.45),0,V(1));g.addColorStop(0,A(C.gold,.28));g.addColorStop(1,A(C.red,.42));X.fillStyle=g;X.fillRect(b.l,V(.45),b.w,V(1)-V(.45));
  const loops=m==='div'?[[.25,-1],[.75,1]]:m==='sub'?[[.25,1],[.78,-1]]:[[.25,1],[.75,-1]];
  loops.forEach(([cu,dir])=>{const cx=U(cu),cy=V(.8),rx=b.w*.17,ry=b.h*.11;X.beginPath();X.ellipse(cx,cy,rx,ry,0,0,TAU);X.strokeStyle=A(C.fg,.16);X.lineWidth=1.4;X.setLineDash([5,7]);X.stroke();X.setLineDash([]);
   for(let k=0;k<4;k++){const th=dir*S.t*.35+k*PI/2;const px=cx+rx*Math.cos(th),py=cy+ry*Math.sin(th);const tx=-rx*Math.sin(th)*dir,ty=ry*Math.cos(th)*dir;const l=Math.hypot(tx,ty)||1;arr(px-tx/l*9,py-ty/l*9,px+tx/l*9,py+ty/l*9,A(C.fg,.45),1.6,7)}});
  T('Astenosfæren: seig mantel som sakte strømmer',U(.5),V(.95),{a:'center',s:12,c:C.fg2})}
 if(m==='div'){const sf=u=>.40-.065*Math.exp(-(((u-.5)/.07)**2))+.05*Math.sqrt(Math.min(1,Math.abs(u-.5)/.5)),ct=.035,lb=u=>.47+.11*Math.sqrt(Math.min(1,Math.abs(u-.5)/.5));
  [[0,.496],[.504,1]].forEach(([a,c])=>{const top=[],bot=[];for(let i=0;i<=60;i++){const u=lerp(a,c,i/60);top.push(P(u,sf(u)+ct));bot.push(P(u,lb(u)))}poly(top.concat(bot.reverse()),null,cLith)});
  const N=260,rate=S.p.v/200;for(let i=0;i<N;i++){const u=(i+.5)/N;if(Math.abs(u-.5)<.004)continue;const age=Math.abs(u-.5)/rate;rct(U(u)-b.w/N/2,V(sf(u)),b.w/N+.6,ct*b.h,null,pol(S.ma-age)?mix(C.blue,C.stage,.3):mix(C.grey,C.stage,.62))}
  const sea=[P(0,.22),P(1,.22)];for(let i=60;i>=0;i--){const u=i/60;sea.push(P(u,sf(u)))}poly(sea,null,cSea);ln(U(0),V(.22),U(1),V(.22),A(C.blue,.5),1.2);
  glow(U(.5),V(.47),b.w*.07,C.gold,.65);for(let k=0;k<6;k++){const y=V(.56)-((S.t*28+k*20)%(V(.56)-V(.36)));dot(U(.5)+Math.sin(S.t*3+k)*3,y,3,A(C.gold,.8))}
  S.bub.forEach(p=>dot(U(.5+p.x),V(.33+p.y*.3),2.6,A(C.red,clamp(1-p.t/2.2,0,1))));
  arr(U(.32),V(.52),U(.16),V(.52),C.fg,2.6,10);arr(U(.68),V(.52),U(.84),V(.52),C.fg,2.6,10);T(nf(S.p.v,1)+' cm/år',U(.24),V(.52)+15,{a:'center',f:'n',s:11.5,c:C.fg});T(nf(S.p.v,1)+' cm/år',U(.76),V(.52)+15,{a:'center',f:'n',s:11.5,c:C.fg});
  T('Midthavsrygg',U(.5),V(.29),{a:'center',s:13,c:C.fg});T('Ny havbunn med magnetstriper',U(.5),V(.66),{a:'center',s:12,c:C.fg2,bg:A(C.stage,.6)});
  rct(U(.03),V(.06),12,12,null,mix(C.blue,C.stage,.3));T('normal polaritet',U(.03)+18,V(.06)+6,{s:11.5,c:C.fg2});rct(U(.03),V(.06)+18,12,12,null,mix(C.grey,C.stage,.62));T('omvendt polaritet',U(.03)+18,V(.06)+24,{s:11.5,c:C.fg2})}
 if(m==='sub'){const tr=.44;
  const oc=[P(0,.41),P(tr-.03,.415),P(.46,.45)];for(let i=1;i<=20;i++){const u=.46+i/20*.56;oc.push(P(u,slabTop(u)))}const ob=[];for(let i=20;i>=1;i--){const u=.46+i/20*.56;ob.push(P(u,slabTop(u)+.085))}ob.push(P(tr+.02,.55),P(0,.53));poly(oc.concat(ob),null,cLith);
  const crust=[P(0,.41),P(tr-.03,.415),P(.46,.45)];for(let i=1;i<=20;i++){const u=.46+i/20*.56;crust.push(P(u,slabTop(u)))}const cb=[];for(let i=20;i>=1;i--){const u=.46+i/20*.56;cb.push(P(u,slabTop(u)+.03))}cb.push(P(.45,.48),P(tr-.03,.445),P(0,.445));poly(crust.concat(cb),null,cOce);
  const land=u=>u<.52?lerp(.45,.21,sst(.46,.52,u)):.2-.08*Math.exp(-(((u-.66)/.07)**2))-.02*Math.sin(u*70)*Math.exp(-(((u-.66)/.12)**2));
  const ct=[];for(let i=0;i<=80;i++){const u=lerp(.46,1,i/80);ct.push(P(u,land(u)))}const cbot=[];for(let i=80;i>=0;i--){const u=lerp(.46,1,i/80);cbot.push(P(u,Math.min(.38,slabTop(u)-.002)))}poly(ct.concat(cbot),null,cCont);
  const lm=[];for(let i=0;i<=40;i++){const u=lerp(.5,1,i/40);lm.push(P(u,.38))}for(let i=40;i>=0;i--){const u=lerp(.5,1,i/40);lm.push(P(u,Math.max(.38,Math.min(.52,slabTop(u)-.002))))}poly(lm,null,cLith);
  const vu=.66,vt=land(vu);poly([P(vu-.03,vt+.03),P(vu-.006,vt-.035),P(vu+.006,vt-.035),P(vu+.03,vt+.03)],null,mix(C.gold,C.stage,.35));
  const sea=[P(0,.22),P(.52,.22),P(.52,.21)];for(let i=0;i<=20;i++){const u=lerp(.52,.46,i/20);sea.push(P(u,land(u)))}sea.push(P(tr-.03,.415),P(0,.41));poly(sea,null,cSea);ln(U(0),V(.22),U(.51),V(.22),A(C.blue,.5),1.2);
  const mu=.66,mv=slabTop(.66)-.04;glow(U(mu),V(mv),b.w*.06,C.gold,.6);T('smelting',U(mu)+b.w*.05,V(mv)+4,{s:12,c:C.gold});
  for(let k=0;k<7;k++){const f=((S.t*.18+k/7)%1);dot(U(vu)+Math.sin(S.t*2+k)*3,lerp(V(mv),V(vt-.03),f),2.8,A(C.gold,.85))}
  S.bub.forEach(p=>{const a=clamp(1-p.t/2.2,0,1);circ(U(vu+p.x*2),V(vt-.04+p.y*.6),4+p.t*7,null,A(C.grey,.35*a))});
  const path=[P(.02,.43),P(tr-.03,.43),P(.46,.465)];for(let i=1;i<=24;i++){const u=.46+i/24*.56;path.push(P(u,slabTop(u)+.015))}const segL=[0];for(let i=1;i<path.length;i++)segL.push(segL[i-1]+Math.hypot(path[i][0]-path[i-1][0],path[i][1]-path[i-1][1]));const Ltot=segL[segL.length-1],sp=b.w*.06;
  for(let d0=((S.ma*S.p.v*b.w/200)%sp);d0<Ltot;d0+=sp){let i=1;while(i<segL.length-1&&segL[i]<d0)i++;const f=(d0-segL[i-1])/(segL[i]-segL[i-1]),x=lerp(path[i-1][0],path[i][0],f),y=lerp(path[i-1][1],path[i][1],f);const dx=path[i][0]-path[i-1][0],dy=path[i][1]-path[i-1][1],l=Math.hypot(dx,dy)||1;ln(x+dy/l*6,y-dx/l*6,x-dy/l*6,y+dx/l*6,A(C.fg,.55),2)}
  S.qs.forEach(q=>{const a=clamp(1-(S.t-q.t)/7,0,1);dot(U(q.u),V(q.v),3.2,ramp([C.yellow,C.gold,C.red],q.s||0,.3+.7*a))});
  arr(U(.1),V(.36),U(.26),V(.36),C.fg,2.6,10);T(nf(S.p.v,1)+' cm/år',U(.18),V(.36)-14,{a:'center',f:'n',s:11.5,c:C.fg});arr(U(.95),V(.3),U(.86),V(.3),C.fg,2.2,9);
  T('Dyphavsgrop',U(tr),V(.5)+4,{a:'center',s:12,c:C.fg2});T('Vulkan',U(vu),V(vt-.07),{a:'center',s:12.5,c:C.fg});T('Havplata dykker ned',U(.7),V(.85),{s:12,c:C.fg2});T('Jordskjelv',U(.86),V(.66),{s:12,c:C.yellow})}
 if(m==='kol'){const h=.17*(1-Math.exp(-S.ma*S.p.v/40));const gx=u=>Math.exp(-(((u-.5)/.13)**2));
  const top=u=>.25-h*gx(u)*(1+.12*Math.sin(u*90)),bot=u=>.4+2.1*h*Math.exp(-(((u-.5)/.15)**2));
  const slab=[P(.49,.52),P(.53,.52),P(.5,.82),P(.47,.82)];poly(slab,null,cOce);poly([P(.46,.86),P(.49,.86),P(.47,.97),P(.44,.97)],null,cOce);
  const lm=[];for(let i=0;i<=80;i++){const u=i/80;lm.push(P(u,bot(u)))}for(let i=80;i>=0;i--){const u=i/80;lm.push(P(u,.52+.6*h*gx(u)))}poly(lm,null,cLith);
  const cr=[];for(let i=0;i<=120;i++){const u=i/120;cr.push(P(u,top(u)))}for(let i=120;i>=0;i--){const u=i/120;cr.push(P(u,bot(u)))}poly(cr,null,cCont);
  for(let k=1;k<=3;k++){const pts=[];for(let i=0;i<=160;i++){const u=i/160;const y=lerp(top(u),bot(u),k/4)+h*.5*Math.sin((u-.5)*55)*Math.exp(-(((u-.5)/.12)**2));pts.push(P(u,y))}pth(pts,A(C.stage,.45),1.6)}
  S.qs.forEach(q=>{const a=clamp(1-(S.t-q.t)/2.5,0,1);circ(U(q.u),V(q.v),3+(1-a)*10,A(C.yellow,a),null,1.6)});
  arr(U(.06),V(.33),U(.2),V(.33),C.fg,2.6,10);arr(U(.94),V(.33),U(.8),V(.33),C.fg,2.6,10);
  T('India',U(.12),V(.2),{a:'center',s:14,c:C.fg});T('Eurasia',U(.88),V(.2),{a:'center',s:14,c:C.fg});
  if(h>.02){T('Fjellkjede: ca. '+nf(h/.17*8.8,1)+' km høy',U(.5),V(top(.5))-14,{a:'center',s:12.5,c:C.fg,bg:A(C.stage,.7)});T('Fjellrot',U(.5),V(bot(.5))-12,{a:'center',s:12,c:C.fg2})}}
 if(m==='trans'){const mid=b.t+b.h/2;rct(b.l,b.t,b.w,b.h/2,null,mix(C.green,C.stage,.82));rct(b.l,mid,b.w,b.h/2,null,mix(C.gold,C.stage,.82));
  const D=S.p.v*S.yr,s=S.slip,e=D-s,k=b.w*.18/2600,w=b.h*.12;
  [.2,.4,.6,.8].forEach((u,j)=>{const pts=[];for(let i=0;i<=80;i++){const y=b.t+b.h*i/80,dy=y-mid,sg=dy<0?1:-1;const dsp=sg*(s/2+e/2*(2/PI)*Math.atan(Math.abs(dy)/w))*k;pts.push([U(u)+dsp,y])}pth(pts,j===1?C.fg:A(C.fg,.55),j===1?3:2)});
  for(let i=0;i<14;i++){const yy=b.t+b.h*(i+.5)/14,dy=yy-mid,sg=dy<0?1:-1;const xx=b.l+((i*137)%97)/97*b.w+sg*(s/2+e/2*(2/PI)*Math.atan(Math.abs(dy)/w))*k;dot(xx,yy,3,A(sg>0?C.green:C.gold,.8))}
  ln(b.l,mid,b.l+b.w,mid,S.shake>0?C.red:A(C.red,.6),S.shake>0?3:2,[8,6]);
  S.qs.forEach(q=>{const a=clamp(1-(S.t-q.t)/2.5,0,1);circ(U(q.u),mid,4+(1-a)*40,A(C.red,a),null,2)});
  arr(U(.05),b.t+b.h*.12,U(.17),b.t+b.h*.12,C.fg,2.4,9);arr(U(.95),b.t+b.h*.88,U(.83),b.t+b.h*.88,C.fg,2.4,9);
  T('Den nordamerikanske platen',U(.2),b.t+b.h*.12,{s:13,c:C.fg});T('Stillehavsplaten',U(.8),b.t+b.h*.88,{a:'right',s:13,c:C.fg});T('Forkastning',U(.98),mid-12,{a:'right',s:12,c:C.red});
  const bw=b.w*.22,bx=b.l+b.w-bw-10,by=b.t+10;rr(bx,by,bw,12,3,A(C.fg,.4),null,1);rr(bx,by,bw*clamp(e/350,0,1),12,3,null,ramp([C.yellow,C.red],e/350));T('Oppbygd spenning',bx,by+24,{s:11.5,c:C.fg2});T('Gjerder og veier sett ovenfra',b.l+8,b.t+b.h*.3,{s:12,c:C.fg2,bg:A(C.stage,.6)})}
 X.restore();rct(b.l,b.t,b.w,b.h,A(C.fg,.15),null,1);X.restore();
 T(INFO[m][0],b.l,b.t-26,{s:15,w:700,c:C.fg});T(INFO[m][1],b.l,b.t-9,{s:12.5,c:C.fg2})},
readout(S){const m=S.p.mode;if(m==='trans')return[['år',nf(S.yr,0)],['forskyvning',nf(S.slip/100,1)+' m'],['spenning',nf(clamp((S.p.v*S.yr-S.slip)/350,0,1)*100,0)+' %','red'],['jordskjelv',S.nq,'yellow']];return[['tid',nf(S.ma,1)+' mill. år'],['flyttet',nf(S.p.v*10*S.ma,0)+' km'],['fart',nf(S.p.v,1)+' cm/år = '+nf(S.p.v*10,0)+' km per mill. år']]}
});
}

/* ---------- Årstider og solinnstråling ---------- */
{
const MND=[['jan',31],['feb',28],['mar',31],['apr',30],['mai',31],['jun',30],['jul',31],['aug',31],['sep',30],['okt',31],['nov',30],['des',31]];
const MNDL=['januar','februar','mars','april','mai','juni','juli','august','september','oktober','november','desember'];
const dato=d=>{d=Math.round(d);let m=0;while(m<11&&d>MND[m][1]){d-=MND[m][1];m++}return d+'. '+MNDL[m]};
const decl=d=>-23.44*Math.cos(TAU*(d+10)/365);
const H0=(phi,dl)=>{const x=-Math.tan(rad(phi))*Math.tan(rad(dl));return x<=-1?180:x>=1?0:deg(Math.acos(x))};
const elev=(phi,dl,h)=>deg(Math.asin(clamp(Math.sin(rad(phi))*Math.sin(rad(dl))+Math.cos(rad(phi))*Math.cos(rad(dl))*Math.cos(rad(15*(h-12))),-1,1)));
const insol=(phi,d)=>{const dl=rad(decl(d)),f=rad(phi),h=rad(H0(phi,decl(d)));return 1361/PI*(1+.033*Math.cos(TAU*d/365))*(h*Math.sin(f)*Math.sin(dl)+Math.cos(f)*Math.cos(dl)*Math.sin(h))};
const latf=v=>Math.abs(v)<.05?'0° (ekvator)':nf(Math.abs(v),1)+'° '+(v>0?'N':'S');
const hm=h=>{const t=Math.round(h*60);return Math.floor(t/60)+' t '+String(t%60).padStart(2,'0')+' min'};
M({id:'ge-arstider',s:'ge',c:['GEO','NAT'],title:'Årstider, dagslengde og solinnstråling',short:'Årstider og sollys',kw:'årstider jordaksen helning breddegrad dagslengde midnattssol mørketid solhøyde innstråling klima solverv jevndøgn',
lead:'Jordaksen heller 23,4° mot banen rundt sola. Derfor står sola høyere og dagene er lengre om sommeren. Langt nord gir det midnattssol og mørketid.',
controls:[{id:'dag',label:'Dato',min:1,max:365,step:1,value:172,fmt:v=>dato(v)},{id:'lat',label:'Breddegrad',min:-90,max:90,step:.1,value:59.9,fmt:latf},{type:'btns',items:[['Oslo',S=>setP('lat',59.9,S)],['Tromsø',S=>setP('lat',69.6,S)],['Longyearbyen',S=>setP('lat',78.2,S)],['Ekvator',S=>setP('lat',0,S)],['Kapp',S=>setP('lat',-33.9,S)]]},{id:'auto',type:'check',label:'La året gå av seg selv',value:false}],
tex:['\\text{middagshøyde}=90^\\circ-|\\varphi-\\delta|','\\cos H_0=-\\tan\\varphi\\,\\tan\\delta,\\qquad \\text{dagslengde}=\\frac{2H_0}{15^\\circ}\\ \\text{timer}','\\delta\\approx-23{,}4^\\circ\\cos\\!\\left(\\tfrac{360^\\circ}{365}(d+10)\\right)'],
about:['Til venstre ser du jorda fra siden med sola til venstre. Den gule delen av breddesirkelen er dagslys, den mørke er natt. Andelen som er gul, er dagslengden.','Når nordpolen heller mot sola (juni), får hele den nordlige halvkula lange dager. Nord for polarsirkelen (66,6° N) går sola ikke ned i det hele tatt: <strong>midnattssol</strong>. I desember er det motsatt, og det blir <strong>mørketid</strong>.','Lav sol varmer mindre fordi den samme strålen fordeles på en større flate. Det er hovedgrunnen til at det er kaldere ved polene og om vinteren, ikke avstanden til sola. Jorda er faktisk nærmest sola i januar.','Grafen øverst til høyre viser solhøyden gjennom døgnet. Grafen nederst viser dagslengden gjennom året for breddegraden du har valgt.'],
tasks:['Hvor lang er den lengste og den korteste dagen i Oslo? Sammenlign med Tromsø.','Hvilken breddegrad har 12 timer dag hele året? Hvorfor?','Finn den sørligste breddegraden med midnattssol. Hvorfor er den 90° − 23,4°?','Hvorfor er det sommer i Australia når det er vinter i Norge?'],
update(S,dt){if(S.p.auto){let d=S.p.dag+dt*20;if(d>365)d-=365;setP('dag',Math.round(d*10)/10,S)}},
draw(S){const d=S.p.dag,phi=S.v.lat,dl=decl(d);const wide=isWide(S);const[bl,br]=split(S,.48,{g:30});const[g1,g2]=rows(br,[1,1],36);
 const R=Math.min(bl.w*.34,bl.h*.3),ex=bl.l+bl.w*.58,ey=bl.t+R+52;
 const sx=bl.l+20,sy=ey;glow(sx,sy,R*.7,C.yellow,.55);dot(sx,sy,R*.14,C.yellow);for(let k=-2;k<=2;k++)arr(sx+R*.25,sy+k*R*.28,ex-R-8,sy+k*R*.28,A(C.yellow,.35),1.4,7);
 circ(ex,ey,R,null,mix(C.blue,C.stage,.55));X.save();X.beginPath();X.arc(ex,ey,R,0,TAU);X.clip();rct(ex,ey-R,R,2*R,null,A(C.stage,.62));X.restore();circ(ex,ey,R,A(C.fg,.5),null,1.4);
 const a=rad(dl),ax=[-Math.sin(a),-Math.cos(a)],pp=[Math.cos(a),-Math.sin(a)];
 ln(ex-ax[0]*R*1.25,ey-ax[1]*R*1.25,ex+ax[0]*R*1.25,ey+ax[1]*R*1.25,A(C.fg,.7),1.6);T('N',ex+ax[0]*R*1.34,ey+ax[1]*R*1.34,{a:'center',f:'n',s:12,c:C.fg});
 const latLine=(lt,col,w,dash)=>{const f=rad(lt),cx=ex+ax[0]*R*Math.sin(f),cy=ey+ax[1]*R*Math.sin(f),rx=R*Math.cos(f);const pts=[],day=[];for(let i=0;i<=120;i++){const t=TAU*i/120;const x=cx+pp[0]*rx*Math.cos(t)+ax[0]*rx*.1*Math.sin(t),y=cy+pp[1]*rx*Math.cos(t)+ax[1]*rx*.1*Math.sin(t);pts.push([x,y,cx+pp[0]*rx*Math.cos(t)<ex])}
  for(let i=1;i<pts.length;i++){const p=pts[i-1],q=pts[i];ln(p[0],p[1],q[0],q[1],col?col:(p[2]?C.yellow:A(C.fg,.35)),w,dash)}return{cx,cy}};
 latLine(0,A(C.fg,.35),1,[3,4]);[23.44,-23.44,66.56,-66.56].forEach(l=>latLine(l,A(C.fg,.18),1,[2,5]));
 const o=latLine(phi,null,3);const f=rad(phi),nx=ex+ax[0]*R*Math.sin(f)-pp[0]*R*Math.cos(f),ny=ey+ax[1]*R*Math.sin(f)-pp[1]*R*Math.cos(f);dot(nx,ny,5,C.red);
 T('dag',ex-R*.6,ey+R+16,{a:'center',s:12,c:C.yellow});T('natt',ex+R*.6,ey+R+16,{a:'center',s:12,c:C.fg3});T(dato(d),bl.l,bl.t+4,{s:14,w:700});T('solas deklinasjon δ = '+nf(dl,1)+'°',bl.l,bl.t+22,{f:'n',s:11.5,c:C.fg2});
 const noon=90-Math.abs(phi-dl);const by=ey+R+44,bh=bl.t+bl.h-by;if(bh>60){const el=Math.max(noon,0),gx=bl.l+bl.w*.12,gw=bl.w*.76,gy=by+bh*.75;ln(gx,gy,gx+gw,gy,A(C.fg,.6),1.6);T('Middagssol: '+nf(Math.max(noon,0),1)+'° over horisonten',gx,by+8,{s:12,c:C.fg2});
  if(el>.5){const bwid=Math.min(36,bh*.3),L=bwid/Math.sin(rad(el)),cx=gx+gw/2;const dxr=Math.cos(rad(el)),dyr=Math.sin(rad(el));const lenR=bh*.55;const p1=[cx-L/2,gy],p2=[cx+L/2,gy];poly([p1,p2,[p2[0]-dxr*lenR,p2[1]-dyr*lenR],[p1[0]-dxr*lenR,p1[1]-dyr*lenR]],null,A(C.yellow,.25));ln(p1[0],gy,p2[0],gy,C.yellow,4);T('flate som deler strålen: ×'+nf(1/Math.sin(rad(el)),2),cx,gy+14,{a:'center',f:'n',s:11,c:C.yellow})}else T('Sola er under horisonten hele dagen',gx+gw/2,gy-14,{a:'center',s:12,c:C.fg3})}
 const P1=Plane(0,24,-40,90,g1);P1.grid(3,{sy:15,minor:false,alpha:.1});P1.axes({xs:6,ys:30,x0:true,xl:'klokka',yl:'solhøyde (°)',ls:13,xf:x=>x+':00'});
 const fe=h=>elev(phi,dl,h);P1.area(h=>Math.max(0,fe(h)),0,24,A(C.yellow,.18));P1.fn(fe,C.yellow,2.8);ln(P1.l,P1.Y(0),P1.l+P1.w,P1.Y(0),A(C.fg,.5),1.2);
 const H=H0(phi,dl)/15;if(H>0&&H<12){[12-H,12+H].forEach((h,i)=>{dot(P1.X(h),P1.Y(0),4.5,C.gold);T((i?'ned ':'opp ')+String(Math.floor(h)).padStart(2,'0')+':'+String(Math.round((h%1)*60)%60).padStart(2,'0'),P1.X(h)+(i?-6:6),P1.Y(0)-14,{a:i?'right':'left',f:'n',s:10.5,c:C.gold,bg:A(C.stage,.7)});if(0)T('',P1.X(h),P1.Y(0)+16,{a:'center',f:'n',s:10.5,c:C.gold})})}
 lab(g1,'Solhøyde gjennom døgnet');
 const P2=Plane(1,365,0,24,g2);P2.grid(30,{sy:6,minor:false,alpha:.1});P2.axes({xs:61,ys:6,x0:true,yl:'timer',ls:13,xf:x=>MNDL[Math.min(11,Math.floor((x-1)/30.42))].slice(0,3)});lab(g2,'Dagslengde gjennom året');
 P2.fn(x=>2*H0(0,decl(x))/15,A(C.fg,.35),1.4,{dash:[4,4]});P2.fn(x=>2*H0(phi,decl(x))/15,C.blue,2.8);dot(P2.X(d),P2.Y(2*H0(phi,dl)/15),6,C.yellow);T('ekvator',P2.l+P2.w-4,P2.Y(12)-9,{a:'right',s:10.5,c:C.fg3})},
readout(S){const d=S.p.dag,phi=S.p.lat,dl=decl(d),L=2*H0(phi,dl)/15;return[['dato',dato(d)],['breddegrad',latf(phi)],['dagslengde',L>=23.99?'midnattssol (24 t)':L<=.01?'mørketid (0 t)':hm(L),'blue'],['middagshøyde',nf(Math.max(0,90-Math.abs(phi-dl)),1)+'°','yellow'],['innstråling',nf(Math.max(0,insol(phi,d)),0)+' W/m² (døgnsnitt, toppen av atmosfæren)']]}
});
}

/* ---------- Regnskygge og føhn ---------- */
{
const g=9.81,cp=1005,Rd=287,Lv=2.5e6,eps=.622;
const es=T=>6.112*Math.exp(17.67*T/(T+243.5));
const pz=z=>1013.25*Math.exp(-z/8000);
const rs=(T,p)=>{const e=es(T);return eps*e/(p-e)};
const sst=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const terr=(u,H)=>{if(u<.12)return -1;const up=sst(.12,.42,u),dn=1-sst(.52,.84,u);return Math.max(up*dn*H+(1-dn)*150*(u>.5?1:0),u<.5?up*H:150)+ (u>.12&&u<.84?28*Math.sin(u*80)*Math.min(up,dn):0)};
function profile(p){const N=320,z0=200,out=[];const T0=p.T0,RH=p.rh/100;const gm=Math.log(RH)+17.62*T0/(243.12+T0),Td=243.12*gm/(17.62-gm);let T=T0-.0098*z0+0,r=rs(Td,pz(0));let prevZ=z0;let lcl=null,maxT=null,cond=0;
 for(let i=0;i<=N;i++){const u=i/N,z=Math.max(terr(u,p.H),0)+200;const dz=z-prevZ;let c=0;if(i>0){if(dz>0){let Tn=T-.0098*dz;const p2=pz(z);if(rs(Tn,p2)<r){const Tk=T+273.15,rsv=rs(T,pz(prevZ));const Gm=g*(1+Lv*rsv/(Rd*Tk))/(cp+Lv*Lv*rsv*eps/(Rd*Tk*Tk));Tn=T-Gm*dz;const rn=Math.min(r,rs(Tn,p2));c=r-rn;r=rn;if(lcl===null)lcl=z}T=Tn}else T=T-.0098*dz}
  cond+=c;out.push({u,z,T,r,c,sat:c>0});prevZ=z}
 return{pts:out,lcl,Td,cond}}
M({id:'ge-regnskygge',s:'ge',c:['GEO','NAT'],title:'Regnskygge og føhn: hvorfor Bergen er våtere enn Oslo',short:'Regnskygge',kw:'nedbør orografisk regn regnskygge føhn vestlandet østlandet temperatur kondensasjon fuktighet klima vær luftmasser',
lead:'Fuktig luft fra havet presses opp over fjellet og kjøles ned. Når den er kald nok, kondenserer vanndampen til skyer og regn. På den andre siden synker luften, blir varm og tørr.',
controls:[{id:'H',label:'Fjellhøyde',min:300,max:2500,step:50,value:1600,unit:'m'},{id:'T0',label:'Temperatur ved kysten',min:-5,max:25,step:.5,value:12,unit:'°C'},{id:'rh',label:'Relativ fuktighet ved kysten',min:40,max:100,step:1,value:85,unit:'%'},{id:'sp',label:'Vindstyrke',min:.2,max:2,step:.1,value:1}],
tex:['\\text{tørr luft: }-1\\ ^\\circ\\text{C per }100\\ \\text{m}','\\text{mettet luft: ca. }-0{,}5\\ ^\\circ\\text{C per }100\\ \\text{m}','z_{\\text{kond}}\\approx 125\\ \\text{m}\\cdot(T-T_d)'],
about:['Luft som stiger, utvider seg og blir kaldere. Tørr luft kjøles omtrent 1 °C per 100 meter. Når temperaturen når <strong>duggpunktet</strong>, kondenserer vanndampen, og vi får skyer.','Når vanndamp kondenserer, frigjøres varme. Derfor kjøles mettet luft bare omtrent 0,5 °C per 100 meter. Vannet faller ut som regn eller snø på lo-siden (vindsiden) av fjellet.','På le-siden synker luften og varmes opp 1 °C per 100 meter, fordi den har mistet vannet. Den kommer ned varmere og tørrere enn den startet. Det kalles <strong>føhn</strong>, og tørt område bak fjellet kalles <strong>regnskygge</strong>.','Dette er en viktig grunn til at Bergen får rundt tre ganger så mye nedbør som Oslo.'],
tasks:['Hvor høyt over havet begynner skydannelsen med standardverdiene? Sjekk med formelen.','Hva skjer med regnmengden når fjellet blir høyere? Og når luften er tørrere?','Hvor mye varmere er luften når den kommer ned i dalen på østsiden, enn da den startet ved kysten?','Hvorfor kan det være varmt og tørt vær i Sunndalsøra om vinteren?'],
init(S){S.pa=[];for(let i=0;i<26;i++)S.pa.push({u:i/26,o:Math.random()})},
update(S,dt){S.pa.forEach(p=>{p.u+=dt*.05*S.p.sp;if(p.u>1){p.u-=1;p.o=Math.random()}})},
draw(S){const p=S.p,pr=profile(p),pts=pr.pts;const[top,bot]=rows(pad(S,26,24,26),[2.1,1],34);const zmax=Math.max(3000,p.H*1.45);
 const PX=Plane(0,1,-150,zmax,top);const sky=X.createLinearGradient(0,top.t,0,top.t+top.h);sky.addColorStop(0,A(C.blue,.10));sky.addColorStop(1,A(C.blue,.02));X.fillStyle=sky;X.fillRect(top.l,top.t,top.w,top.h);
 const tp=[];for(let i=0;i<=200;i++){const u=i/200;tp.push(PX.pt(u,Math.max(terr(u,p.H),0)))}poly([PX.pt(0,-150)].concat(tp,[PX.pt(1,-150)]),null,mix(C.green,C.stage,.72));pth(tp,mix(C.green,C.stage,.35),2);
 rct(PX.X(0),PX.Y(0),PX.X(.125)-PX.X(0),PX.Y(-150)-PX.Y(0),null,A(C.blue,.35));
 if(pr.lcl!==null){ln(top.l,PX.Y(pr.lcl),top.l+top.w,PX.Y(pr.lcl),A(C.fg,.4),1.2,[6,5]);T('kondensasjonsnivå ≈ '+nf(pr.lcl,0)+' m',top.l+6,PX.Y(pr.lcl)-10,{s:11.5,c:C.fg2,bg:A(C.stage,.6)})}
 const cmax=Math.max(1e-6,...pts.map(q=>q.c));pts.forEach((q,i)=>{if(!q.sat||i%3)return;const x=PX.X(q.u),y=PX.Y(q.z);const s=.5+.5*q.c/cmax;for(let k=0;k<3;k++)circ(x+(k-1)*8,y-6-k%2*6,9+s*7,null,A(C.fg,.07+.08*s));
  const rl=PX.Y(Math.max(terr(q.u,p.H),0))-y;for(let k=0;k<2;k++){const off=((S.t*120+i*37+k*50)%Math.max(rl,1));ln(x+k*6-3,y+off,x+k*6-6,y+off+9,A(C.blue,.55+.4*s),1.4)}});
 S.pa.forEach(pa=>{const i=Math.min(pts.length-1,Math.round(pa.u*(pts.length-1))),q=pts[i];dot(PX.X(q.u),PX.Y(q.z+pa.o*250),4,ramp([C.blue,C.teal,C.yellow,C.red],(q.T+10)/40))});
 T('Hav',PX.X(.06),PX.Y(0)+12,{a:'center',s:12,c:C.fg2});T('Vestlandet: regn',PX.X(.27),PX.Y(p.H*.25)+20,{a:'center',s:12.5,c:C.fg});T('Østlandet: regnskygge',PX.X(.86),PX.Y(150)+18,{a:'center',s:12.5,c:C.fg});arr(PX.X(.02),PX.Y(zmax*.8),PX.X(.1),PX.Y(zmax*.8),C.fg2,2,9);T('vind',PX.X(.02),PX.Y(zmax*.8)-14,{s:11.5,c:C.fg2});
 const Ts=pts.map(q=>q.T),tmin=Math.floor(Math.min(...Ts)/5)*5-5,tmax=Math.ceil(Math.max(...Ts)/5)*5+5;const PT=Plane(0,1,tmin,tmax,bot);PT.axes({x:false,ys:5,yl:'°C',ls:13,xAt:0,y0:true});
 const cs=bot.h*.35/cmax;pts.forEach((q,i)=>{if(q.c>0&&i%2===0)rct(PT.X(q.u)-1.5,bot.t+bot.h-q.c*cs,3,q.c*cs,null,A(C.blue,.6))});
 pth(pts.map(q=>PT.pt(q.u,q.T)),C.red,2.6);const f=pts[0],l=pts[pts.length-1];dot(PT.X(f.u),PT.Y(f.T),5,C.red);dot(PT.X(l.u),PT.Y(l.T),5,C.red);T(nf(f.T,1)+' °C',PT.X(f.u)+8,PT.Y(f.T)-10,{f:'n',s:11.5,c:C.red});T(nf(l.T,1)+' °C',PT.X(l.u)-8,PT.Y(l.T)-10,{a:'right',f:'n',s:11.5,c:C.red});
 lab(bot,'Temperaturen til luften på veien over fjellet, og regn (blå søyler)')},
readout(S){const pr=profile(S.p),pts=pr.pts,top=pts.reduce((a,q)=>q.z>a.z?q:a,pts[0]),l=pts[pts.length-1],f=pts[0];return[['duggpunkt ved kysten',nf(pr.Td,1)+' °C'],['skyer fra',pr.lcl===null?'ingen skyer':nf(pr.lcl,0)+' m','fg2'],['på toppen',nf(top.T,1)+' °C','blue'],['i dalen øst',nf(l.T,1)+' °C','red'],['føhn',(l.T-(f.T+.0098*(f.z-l.z))>=0?'+':'')+nf(l.T-(f.T+.0098*(f.z-l.z)),1)+' °C'],['regnet ut',nf(pr.cond*1000,1)+' g vann per kg luft','blue']]}
});
}

/* ---------- Isbreer, fjorder og landheving ---------- */
{
const sst=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const ice=t=>t<.1?0:t<.45?sst(.1,.35,t):1-sst(.45,.6,t);
const ero=t=>sst(.12,.5,t);
const dep=t=>t<=.55?.25*sst(.1,.42,t):.25*Math.exp(-(t-.55)/.11);
const PH=[[0,'Før istida: elva har gravd en V-dal'],[.12,'Istida begynner: breen vokser'],[.3,'For ca. 20 000 år siden: isen er tykkest og graver dalen til en U-dal'],[.47,'Isen smelter. Landet er trykket ned, og havet strømmer inn'],[.6,'Landet hever seg igjen. Havleire blir liggende over havet'],[.85,'I dag: en dyp fjord med bratte sider']];
const zV=x=>.2+.8*Math.abs(x),zU=x=>-.45+1.45*Math.pow(Math.abs(x),2.4);
M({id:'ge-isbre',s:'ge',c:['GEO'],title:'Isbreer, fjorder og landheving',short:'Fjorder og landheving',kw:'istid isbre fjord u-dal v-dal erosjon landheving marin grense havleire kvikkleire ytre krefter landskap',
lead:'Under istida gravde isbreer de norske dalene om fra V-form til U-form, dypere enn havet. Isen var så tung at den presset landet ned. Da den smeltet, strømmet havet inn, og etterpå har landet sakte hevet seg.',
controls:[{id:'tau',label:'Tid',min:0,max:1,step:.001,value:.3,fmt:v=>nf(v*100,0)+' %'},{id:'auto',type:'check',label:'Spill av',value:true},{type:'btns',items:[['Start fra begynnelsen',S=>{setP('tau',0,S);S.v.tau=0;setP('auto',true,S)}]]}],
tex:['\\text{V-dal: elveerosjon}\\qquad \\text{U-dal: breerosjon}'],
about:['Figuren er et tverrsnitt av en dal. Fjellsidene er overdrevet bratte, og høydene er omtrentlige. En elv graver smalt og dypt og lager en <strong>V-dal</strong>. En isbre fyller hele dalen, sliper sidene og bunnen og lager en <strong>U-dal</strong>.','Isen kunne være flere kilometer tykk. Tyngden presset jordskorpa ned flere hundre meter. Da isen smeltet, sto landet lavt, og havet nådde høyt opp i dalene. Det høyeste havet nådde, kalles <strong>marin grense</strong>. Rundt Oslo ligger den omtrent 220 meter over dagens havnivå.','Leiren som ble avsatt i havet, ligger i dag på land. Når salt vaskes ut av slik leire, kan den bli <strong>kvikkleire</strong>, som kan bli flytende ved skred.','Grafen viser hvor mye landet er trykket ned. Etter at isen forsvant, har landet hevet seg raskt i starten og saktere og saktere etterpå. Det hever seg fortsatt noen millimeter i året mange steder i Norge.'],
tasks:['Beskriv forskjellen på en V-dal og en U-dal. Hvilke krefter har laget dem?','Hvorfor er mange norske fjorder dypere enn havet utenfor?','Hvorfor finner vi skjell og havleire flere hundre meter over havet på Østlandet?','Hva har landhevingen å si for faren for kvikkleireskred?'],
update(S,dt){if(S.p.auto){let t=S.p.tau+dt/22;if(t>1){t=1;setP('auto',false,S)}setP('tau',t,S);S.v.tau=t}},
draw(S){const t=S.v.tau,ic=ice(t),u=ero(t),d=dep(t);const[bl,br]=split(S,.62,{g:30});const P=Plane(-1.1,1.1,-.75,1.6,{l:bl.l,t:bl.t+40,w:bl.w,h:bl.h-40});
 const ground=x=>lerp(zV(Math.min(Math.abs(x),1)),zU(Math.min(Math.abs(x),1)),u)+(Math.abs(x)>1?(Math.abs(x)-1)*.3:0)-d;
 const seaTop=0;const xs=[];for(let i=0;i<=200;i++)xs.push(-1.1+2.2*i/200);
 if(ic<.02){const wet=xs.filter(x=>ground(x)<seaTop);if(wet.length){const pts=[P.pt(wet[0],seaTop)];wet.forEach(x=>pts.push(P.pt(x,ground(x))));pts.push(P.pt(wet[wet.length-1],seaTop));poly(pts,null,A(C.blue,.35))}}
 const clayT=t>.47?.06*sst(.47,.62,t):0;if(clayT>0){const tc=[],bc=[];xs.forEach(x=>{const g0=ground(x);const top=Math.min(g0+clayT,lerp(zV(1),zU(1),u)-d);if(Math.abs(x)<.8){tc.push(P.pt(x,g0+clayT*(1-Math.pow(Math.abs(x)/.8,6))));bc.push(P.pt(x,g0))}});poly(tc.concat(bc.reverse()),null,mix(C.gold,C.stage,.45))}
 const gp=xs.map(x=>P.pt(x,ground(x)));poly([P.pt(-1.1,-.75)].concat(gp,[P.pt(1.1,-.75)]),null,mix(C.grey,C.stage,.6));pth(gp,mix(C.grey,C.fg,.3),2);
 if(ic>.01){const it=ground(0)+.15+1.5*ic;const ipts=[];const surf=x=>Math.max(ground(x),it-.25*x*x);xs.forEach(x=>ipts.push(P.pt(x,surf(x))));const lo=xs.map(x=>P.pt(x,ground(x))).reverse();poly(ipts.concat(lo),null,A('#d8eef6',.55+.25*ic));pth(ipts,A('#ffffff',.8),1.6);
  for(let k=0;k<5;k++){const y=ground(0)+.2+k*.12;if(y<it-.05){const yy=P.Y(y),off=(S.t*30+k*40)%60;for(let x=P.X(-.6)+off;x<P.X(.6);x+=60)ln(x,yy,x+18,yy,A(C.blue,.35),1.2)}}}
 ln(P.l,P.Y(0),P.l+P.w,P.Y(0),A(C.blue,.6),1.2,[6,5]);T('havnivå',P.l+4,P.Y(0)-10,{s:11.5,c:C.blue});
 if(t>.47){const tm=.55,hm=dep(tm);[-1,1].forEach(sg=>{let x=0;for(let k=0;k<200;k++){const xx=sg*k/200;if(ground(xx)+d-hm>=0){x=xx;break}}const y=P.Y(hm-d);ln(P.X(x)-8*sg,y,P.X(x)+10*sg,y,C.gold,2.4);if(sg>0)T('marin grense: '+nf((hm-d)*1000,0)+' m o.h.',P.X(x)+16,y-2,{s:12,c:C.gold,bg:A(C.stage,.6)})})}
 if(clayT>0&&t>.62)T('havleire (mulig kvikkleire)',P.X(0),P.Y(ground(.45)+clayT)-12,{a:'center',s:11.5,c:mix(C.gold,C.fg,.4),bg:A(C.stage,.6)});
 let ph=PH[0][1];PH.forEach(([a,s])=>{if(t>=a)ph=s});Twrap(ph,bl.l,bl.t+6,bl.w-10,{s:14,w:700,c:C.fg});
 const[r1,r2]=rows(br,[1,1],40);const Q=Plane(0,1,0,.3,r1);Q.axes({xs:.25,ys:.1,x0:true,y0:true,xf:x=>'',yf:y=>nf(y*1000,0)+' m'});lab(r1,'Hvor mye landet er trykket ned');Q.fn(dep,A(C.fg,.3),1.6);Q.fn(dep,C.gold,2.8,{to:t,prog:1});dot(Q.X(t),Q.Y(d),5,C.gold);
 const Q2=Plane(0,1,0,1,r2);Q2.axes({xs:.25,ys:.5,x0:true,y0:true,xf:x=>'',yf:y=>nf(y*100,0)+' %'});lab(r2,'Isens tykkelse og hvor U-formet dalen er');Q2.fn(ice,A(C.blue,.3),1.6);Q2.fn(ice,'#d8eef6',2.8,{to:t,prog:1});Q2.fn(ero,A(C.fg,.25),1.4,{dash:[4,4]});Q2.fn(ero,C.fg2,2.2,{to:t,prog:1,dash:[4,4]});T('is',Q2.X(.28),Q2.Y(1)+12,{s:11.5,c:'#d8eef6'});T('U-form',Q2.X(.6),Q2.Y(ero(.6))+14,{s:11.5,c:C.fg2})},
readout(S){const t=S.p.tau;return[['is',nf(ice(t)*100,0)+' %'],['nedtrykt',nf(dep(t)*1000,0)+' m','gold'],['dalform',ero(t)<.2?'V-dal':ero(t)>.8?'U-dal':'mellom V og U']]}
});
}
