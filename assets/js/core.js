'use strict';
/* ================= Kjerne: matte-hjelpere, tegning, koordinatsystem ================= */
const TAU=Math.PI*2, PI=Math.PI;
const REDUCED=(()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}})();
const clamp=(x,a,b)=>x<a?a:x>b?b:x;
const lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>{t=clamp(t,0,1);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
const smooth=(c,t,dt,r=9)=>c+(t-c)*(1-Math.exp(-r*dt));
const rnd=(a=0,b=1)=>a+Math.random()*(b-a);
const rint=(a,b)=>Math.floor(a+Math.random()*(b-a+1));
const choice=a=>a[Math.floor(Math.random()*a.length)];
function gauss(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(TAU*v)}
function rng(seed){let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function erf(x){const s=x<0?-1:1;x=Math.abs(x);const t=1/(1+.3275911*x);const y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x);return s*y}
const Phi=z=>.5*(1+erf(z/Math.SQRT2));
const npdf=(x,m=0,s=1)=>Math.exp(-.5*((x-m)/s)**2)/(s*Math.sqrt(TAU));
function invPhi(p){let a=-9,b=9;for(let i=0;i<70;i++){const m=(a+b)/2;if(Phi(m)<p)a=m;else b=m}return(a+b)/2}
function nCk(n,k){if(k<0||k>n)return 0;k=Math.min(k,n-k);let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r}
function poisson(l){if(l<=0)return 0;if(l>30)return Math.max(0,Math.round(l+Math.sqrt(l)*gauss()));const L=Math.exp(-l);let k=0,p=1;do{k++;p*=Math.random()}while(p>L);return k-1}
function simpson(f,a,b,n=400){if(a===b)return 0;n+=n%2;const h=(b-a)/n;let s=f(a)+f(b);for(let i=1;i<n;i++)s+=f(a+i*h)*(i%2?4:2);return s*h/3}
function bisect(f,a,b,it=80){let fa=f(a);for(let i=0;i<it;i++){const m=(a+b)/2,fm=f(m);if((fm>0)===(fa>0)){a=m;fa=fm}else b=m}return(a+b)/2}

/* ---- tallformat (norsk: desimalkomma) ---- */
function nf(x,d=2){if(x===undefined||x===null||!isFinite(x))return '–';let r=x.toLocaleString('nb-NO',{minimumFractionDigits:d,maximumFractionDigits:d});if(/^[−-]0(,0+)?$/.test(r))r=r.slice(1);return r}
const SUPM={'-':'⁻','−':'⁻','+':'⁺','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
const SUBM={'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉','+':'₊','-':'₋'};
const sup=n=>String(n).split('').map(c=>SUPM[c]||c).join('');
const sub=n=>String(n).split('').map(c=>SUBM[c]||c).join('');
function sci(x,s=3){if(x===0)return '0';const e=Math.floor(Math.log10(Math.abs(x)));let m=x/Math.pow(10,e);if(Math.abs(Math.abs(m)-10)<1e-9){m/=10}return nf(m,s-1)+' · 10'+sup(e)}
function nfs(x,s=3){if(!isFinite(x))return '–';if(x===0)return '0';const a=Math.abs(x);if(a>=1e6||a<1e-3)return sci(x,s);const d=Math.max(0,s-1-Math.floor(Math.log10(a)));return nf(x,Math.min(d,6))}
const tn=(x,d=2)=>nf(x,d).replace('−','-').replace(',','{,}').replace(/[\u00a0\u202f]/g,'\\,');
const tsg=(x,d=2)=>(x<0?'- ':'+ ')+tn(Math.abs(x),d);
const deg=r=>r*180/PI, rad=d=>d*PI/180;

/* ---- farger ---- */
const C={};
function loadColors(){const cs=getComputedStyle(document.documentElement);for(const k of['bg','bg-2','bg-3','stage','line','line-2','fg','fg-2','fg-3','blue','yellow','teal','green','red','gold','purple','pink','grey'])C[k.replace('-','')]=cs.getPropertyValue('--'+k).trim()||'#888888'}
const _hx={};
function rgbOf(c){if(_hx[c])return _hx[c];let r=136,g=136,b=136;if(c[0]==='#'){const h=c.length===4?c.slice(1).split('').map(x=>x+x).join(''):c.slice(1,7);r=parseInt(h.slice(0,2),16);g=parseInt(h.slice(2,4),16);b=parseInt(h.slice(4,6),16)}else{const m=c.match(/[\d.]+/g);if(m){r=+m[0];g=+m[1];b=+m[2]}}return _hx[c]=[r,g,b]}
function A(c,a){const[r,g,b]=rgbOf(c);return`rgba(${r},${g},${b},${a})`}
function mix(c1,c2,t,a=1){const p=rgbOf(c1),q=rgbOf(c2);t=clamp(t,0,1);return`rgba(${Math.round(lerp(p[0],q[0],t))},${Math.round(lerp(p[1],q[1],t))},${Math.round(lerp(p[2],q[2],t))},${a})`}
function ramp(stops,t,a=1){t=clamp(t,0,1);const n=stops.length-1,i=Math.min(n-1,Math.floor(t*n));return mix(stops[i],stops[i+1],t*n-i,a)}
function wl2rgb(l,a=1){let r=0,g=0,b=0;if(l>=380&&l<440){r=-(l-440)/60;b=1}else if(l>=440&&l<490){g=(l-440)/50;b=1}else if(l>=490&&l<510){g=1;b=-(l-510)/20}else if(l>=510&&l<580){r=(l-510)/70;g=1}else if(l>=580&&l<645){r=1;g=-(l-645)/65}else if(l>=645&&l<=780){r=1}let f=0;if(l>=380&&l<420)f=.3+.7*(l-380)/40;else if(l>=420&&l<=700)f=1;else if(l>700&&l<=780)f=.3+.7*(780-l)/80;const k=v=>Math.round(255*Math.pow(v*f,.8));return`rgba(${k(r)},${k(g)},${k(b)},${a})`}
function kelvin(K){const t=K/100;let r,g,b;if(t<=66){r=255;g=99.4708025861*Math.log(t)-161.1195681661;b=t<=19?0:138.5177312231*Math.log(t-10)-305.0447927307}else{r=329.698727446*Math.pow(t-60,-.1332047592);g=288.1221695283*Math.pow(t-60,-.0755148492);b=255}const c=v=>Math.round(clamp(v,0,255));return`rgb(${c(r)},${c(g)},${c(b)})`}

/* ---- tegneprimitiver (X = aktiv 2d-kontekst) ---- */
let X=null, INTRO=1;
const FM='"KaTeX_Math","Newsreader","Iowan Old Style",Georgia,serif', FD='"KaTeX_Main","Newsreader","Iowan Old Style",Georgia,serif', FU='"Atkinson Hyperlegible","Segoe UI",system-ui,sans-serif', FN='"JetBrains Mono",ui-monospace,Menlo,monospace';
function ln(x1,y1,x2,y2,c=C.fg,w=2,dash){X.beginPath();X.moveTo(x1,y1);X.lineTo(x2,y2);X.strokeStyle=c;X.lineWidth=w;X.lineCap='round';if(dash)X.setLineDash(dash);X.stroke();if(dash)X.setLineDash([])}
function circ(x,y,r,s,f,w=2){X.beginPath();X.arc(x,y,Math.max(0,r),0,TAU);if(f){X.fillStyle=f;X.fill()}if(s){X.strokeStyle=s;X.lineWidth=w;X.stroke()}}
function dot(x,y,r=5,c=C.fg){circ(x,y,r,null,c)}
function rct(x,y,w,h,s,f,lw=2){if(f){X.fillStyle=f;X.fillRect(x,y,w,h)}if(s){X.strokeStyle=s;X.lineWidth=lw;X.strokeRect(x,y,w,h)}}
function rr(x,y,w,h,r,s,f,lw=2){X.beginPath();if(X.roundRect)X.roundRect(x,y,w,h,Math.max(0,Math.min(r,Math.abs(w)/2,Math.abs(h)/2)));else X.rect(x,y,w,h);if(f){X.fillStyle=f;X.fill()}if(s){X.strokeStyle=s;X.lineWidth=lw;X.stroke()}}
function poly(p,s,f,w=2,close=true){if(!p.length)return;X.beginPath();X.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)X.lineTo(p[i][0],p[i][1]);if(close)X.closePath();if(f){X.fillStyle=f;X.fill()}if(s){X.strokeStyle=s;X.lineWidth=w;X.lineJoin='round';X.stroke()}}
function pth(p,c,w=3,prog=1,dash){if(p.length<2)return;const n=Math.max(1,Math.min(p.length-1,Math.floor((p.length-1)*prog)));X.beginPath();X.moveTo(p[0][0],p[0][1]);for(let i=1;i<=n;i++)X.lineTo(p[i][0],p[i][1]);X.strokeStyle=c;X.lineWidth=w;X.lineJoin='round';X.lineCap='round';if(dash)X.setLineDash(dash);X.stroke();if(dash)X.setLineDash([])}
function arr(x1,y1,x2,y2,c=C.fg,w=3,hd=12){const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy);if(L<.5)return;const a=Math.atan2(dy,dx),h=Math.min(hd,L*.6);ln(x1,y1,x2-Math.cos(a)*h*.7,y2-Math.sin(a)*h*.7,c,w);X.beginPath();X.moveTo(x2,y2);X.lineTo(x2-h*Math.cos(a-.42),y2-h*Math.sin(a-.42));X.lineTo(x2-h*Math.cos(a+.42),y2-h*Math.sin(a+.42));X.closePath();X.fillStyle=c;X.fill()}
function T(s,x,y,o={}){const f=o.f||'u';const fam=f==='m'?FM:f==='d'?FD:f==='n'?FN:FU;X.font=`${f==='m'||o.i?'italic ':''}${o.w||400} ${o.s||15}px ${fam}`;X.textAlign=o.a||'left';X.textBaseline=o.b||'middle';if(o.bg){const m=X.measureText(s),pw=m.width+10,ph=(o.s||15)+8;const bx=x-(X.textAlign==='center'?pw/2:X.textAlign==='right'?pw-5:5);X.fillStyle=o.bg;X.fillRect(bx,y-ph/2,pw,ph)}X.fillStyle=o.c||C.fg;X.fillText(s,x,y)}
const Tm=(s,x,y,o={})=>T(s,x,y,Object.assign({f:'m',s:18},o));
function tw(s,o={}){const f=o.f||'u';const fam=f==='m'?FM:f==='d'?FD:f==='n'?FN:FU;X.font=`${f==='m'?'italic ':''}${o.w||400} ${o.s||15}px ${fam}`;return X.measureText(s).width}
function lab(b,s,c){T(s.toUpperCase(),b.l,b.t-11,{s:10.5,w:700,c:c||C.fg3})}
function handle(x,y,c=C.yellow,S){const pulse=S&&!S.touched&&!REDUCED?.5+.5*Math.sin(performance.now()/260):0;circ(x,y,11+pulse*5,A(c,.5-pulse*.2),null,1.6);dot(x,y,6.5,c)}
const near=(px,py,x,y,r=20)=>Math.hypot(px-x,py-y)<=r;
function wig(x1,y1,x2,y2,lam,amp,c,w=2,ph=0,head=false){const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy);if(L<2)return;const ux=dx/L,uy=dy/L,nx=-uy,ny=ux;X.beginPath();for(let s=0;s<=L;s+=1.5){const env=Math.min(1,Math.sin(PI*s/L)*2.5);const o=Math.sin(TAU*s/lam+ph)*amp*env;const px=x1+ux*s+nx*o,py=y1+uy*s+ny*o;s?X.lineTo(px,py):X.moveTo(px,py)}X.strokeStyle=c;X.lineWidth=w;X.lineCap='round';X.stroke();if(head)arr(x2-ux*10,y2-uy*10,x2+ux*2,y2+uy*2,c,w,9)}
function glow(x,y,r,c,a=.35){const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,A(c,a));g.addColorStop(1,A(c,0));X.fillStyle=g;X.beginPath();X.arc(x,y,r,0,TAU);X.fill()}
function sphere(x,y,r,c){const g=X.createRadialGradient(x-r*.35,y-r*.4,r*.1,x,y,r);g.addColorStop(0,mix(c,'#ffffff',.55));g.addColorStop(.55,c);g.addColorStop(1,mix(c,'#000000',.45));X.fillStyle=g;X.beginPath();X.arc(x,y,r,0,TAU);X.fill()}
function arc(x,y,r,a0,a1,c,w=2){X.beginPath();X.arc(x,y,r,a0,a1,a1<a0);X.strokeStyle=c;X.lineWidth=w;X.stroke()}
function bars(b,items,o={}){const n=items.length;if(!n)return;const g=o.g??12,bw=(b.w-g*(n-1))/n;let mx=o.max??Math.max(1e-9,...items.map(i=>i.v));let mn=o.min??Math.min(0,...items.map(i=>i.v));if(mx<=mn)mx=mn+1;const sc=b.h/(mx-mn);const Yz=b.t+mx*sc;items.forEach((it,i)=>{const x=b.l+i*(bw+g);const hh=clamp(it.v,mn,mx)*sc;const y=hh>=0?Yz-hh:Yz;rct(x,y,bw,Math.abs(hh),null,A(it.c,it.a??.75));if(it.l)T(it.l,x+bw/2,b.t+b.h+13,{a:'center',s:it.ls||13,c:C.fg2,f:it.m?'m':'u'});if(it.t!==undefined)T(it.t,x+bw/2,hh>=0?y-10:y+Math.abs(hh)+10,{a:'center',f:'n',s:11,c:C.fg2})});ln(b.l-4,Yz,b.l+b.w+4,Yz,A(C.fg,.6),1)}

/* ---- koordinatsystem ---- */
const decOf=s=>{const t=String(+s.toFixed(6));return t.includes('.')?t.split('.')[1].length:0};
function piLab(x){const k=Math.round(x/(PI/2));if(k===0)return '0';const sg=k<0?'−':'';const a=Math.abs(k);if(a%2===0){const n=a/2;return sg+(n===1?'':n)+'π'}return sg+(a===1?'':a)+'π/2'}
function Plane(x0,x1,y0,y1,b,eq){let{l,t,w,h}=b;if(eq){const s=Math.min(w/(x1-x0),h/(y1-y0)),cx=(x0+x1)/2,cy=(y0+y1)/2;x0=cx-w/s/2;x1=cx+w/s/2;y0=cy-h/s/2;y1=cy+h/s/2}
  const P={x0,x1,y0,y1,l,t,w,h,sx:w/(x1-x0),sy:h/(y1-y0)};
  P.X=x=>l+(x-x0)*P.sx;P.Y=y=>t+(y1-y)*P.sy;P.ix=px=>x0+(px-l)/P.sx;P.iy=py=>y1-(py-t)/P.sy;P.pt=(x,y)=>[P.X(x),P.Y(y)];
  P.in=(px,py,m=0)=>px>=l-m&&px<=l+w+m&&py>=t-m&&py<=t+h+m;
  P.clip=fn=>{X.save();X.beginPath();X.rect(l,t,w,h);X.clip();try{fn()}finally{X.restore()}};
  P.grid=(st=1,o={})=>{const k=INTRO;const cx=clamp(P.X(o.cx??0),l,l+w),cy=clamp(P.Y(o.cy??0),t,t+h);const sy=o.sy||st;X.lineWidth=1;
    const L=(sx_,sy_,al)=>{X.strokeStyle=A(C.blue,al);X.beginPath();if((x1-x0)/sx_<400)for(let x=Math.ceil(x0/sx_-1e-9)*sx_;x<=x1+1e-9;x+=sx_){const px=P.X(x);X.moveTo(px,cy-(cy-t)*k);X.lineTo(px,cy+(t+h-cy)*k)}if((y1-y0)/sy_<400)for(let y=Math.ceil(y0/sy_-1e-9)*sy_;y<=y1+1e-9;y+=sy_){const py=P.Y(y);X.moveTo(cx-(cx-l)*k,py);X.lineTo(cx+(l+w-cx)*k,py)}X.stroke()};
    if(o.minor!==false)L(st/2,sy/2,.065);L(st,sy,o.alpha||.2)};
  P.axes=(o={})=>{const k=INTRO;const ax=o.xAt??0,ay=o.yAt??0;const py=clamp(P.Y(ay),t,t+h),px=clamp(P.X(ax),l,l+w);const col=A(C.fg,.85);
    if(o.x!==false)ln(px-(px-l)*k,py,px+(l+w-px)*k,py,col,1.6);
    if(o.y!==false)ln(px,py+(t+h-py)*k,px,py-(py-t)*k,col,1.6);
    X.globalAlpha=k;
    if(o.xs&&o.x!==false){const d=o.xd??decOf(o.xs);for(let x=Math.ceil(x0/o.xs-1e-9)*o.xs;x<=x1+1e-9;x+=o.xs){if(Math.abs(x-ax)<o.xs*1e-6&&o.y!==false&&!o.x0)continue;const q=P.X(x);if(q<l+3||q>l+w-3)continue;ln(q,py-4,q,py+4,col,1.4);T(o.xpi?piLab(x):(o.xf?o.xf(x):nf(x,d)),q,py+(o.xdown===false?-14:15),{f:'n',s:11.5,c:C.fg2,a:'center'})}}
    if(o.ys&&o.y!==false){const d=o.yd??decOf(o.ys);for(let y=Math.ceil(y0/o.ys-1e-9)*o.ys;y<=y1+1e-9;y+=o.ys){if(Math.abs(y-ay)<o.ys*1e-6&&o.x!==false&&!o.y0)continue;const q=P.Y(y);if(q<t+3||q>t+h-3)continue;ln(px-4,q,px+4,q,col,1.4);T(o.yf?o.yf(y):nf(y,d),px-8,q,{f:'n',s:11.5,c:C.fg2,a:'right'})}}
    if(o.xl)Tm(o.xl,l+w-2,py-15,{a:'right',c:C.fg2,s:o.ls||18});
    if(o.yl)Tm(o.yl,px+9,t+11,{c:C.fg2,s:o.ls||18});
    X.globalAlpha=1};
  P.fn=(f,c,w=3,o={})=>{const a=o.from??x0,b=o.to??x1;if(b<=a)return;const end=a+(b-a)*(o.prog??INTRO);const n=Math.max(80,Math.ceil((b-a)*P.sx/1.5));const lim=(y1-y0)*3;
    P.clip(()=>{X.beginPath();let pen=false,last=null;for(let i=0;i<=n;i++){let x=a+(b-a)*i/n;let stop=false;if(x>=end){x=end;stop=true}const y=f(x);if(!isFinite(y)||y>y1+lim||y<y0-lim){pen=false;last=null;if(stop)break;continue}const px=P.X(x),py=P.Y(y);if(pen&&last!==null&&Math.abs(py-last)>h*1.5)X.moveTo(px,py);else if(pen)X.lineTo(px,py);else{X.moveTo(px,py);pen=true}last=py;if(stop)break}
      X.strokeStyle=c;X.lineWidth=w;X.lineJoin='round';X.lineCap='round';if(o.dash)X.setLineDash(o.dash);X.stroke();X.setLineDash([])})};
  P.area=(f,a,b,c,base=0,n=160)=>{if(b<a)[a,b]=[b,a];const pts=[[P.X(a),P.Y(base)]];for(let i=0;i<=n;i++){const x=a+(b-a)*i/n;const y=clamp(f(x),y0-(y1-y0),y1+(y1-y0));pts.push([P.X(x),P.Y(isFinite(y)?y:base)])}pts.push([P.X(b),P.Y(base)]);P.clip(()=>poly(pts,null,c))};
  return P}

/* ---- layout ---- */
function pad(S,p=32,pt,pb){return{l:p,t:pt??p,w:S.W-2*p,h:S.H-(pt??p)-(pb??p)}}
const isWide=S=>S.W>=S.H*1.12;
function split(S,r=.5,o={}){const p=o.p??30,g=o.g??30,b=o.b||pad(S,p);const vert=o.v??!isWide(S);if(vert){const h1=(b.h-g)*(o.rv??r);return[{l:b.l,t:b.t,w:b.w,h:h1},{l:b.l,t:b.t+h1+g,w:b.w,h:b.h-g-h1}]}const w1=(b.w-g)*r;return[{l:b.l,t:b.t,w:w1,h:b.h},{l:b.l+w1+g,t:b.t,w:b.w-g-w1,h:b.h}]}
function rows(b,rs,g=14){const tot=rs.reduce((a,c)=>a+c,0),H=b.h-g*(rs.length-1);let y=b.t;return rs.map(r=>{const h=H*r/tot,o={l:b.l,t:y,w:b.w,h};y+=h+g;return o})}
function cols(b,rs,g=14){const tot=rs.reduce((a,c)=>a+c,0),W=b.w-g*(rs.length-1);let x=b.l;return rs.map(r=>{const w=W*r/tot,o={l:x,t:b.t,w,h:b.h};x+=w+g;return o})}
function inset(b,d){return{l:b.l+d,t:b.t+d,w:b.w-2*d,h:b.h-2*d}}
function frame(b,c){rr(b.l,b.t,b.w,b.h,4,A(c||C.fg,.12),null,1)}

/* ================= Modulregister og scene ================= */
const MODS=[], MOD={};
function M(d){d.controls=d.controls||[];MODS.push(d);MOD[d.id]=d}
const Stage={cv:null,ctx:null,W:800,H:500,dpr:1,mod:null,S:null,play:true,last:0,drag:null,err:null};
function newState(mod,W,H,keep){const S={p:{},v:{},t:0,W,H,intro:0,touched:false,mod};for(const c of mod.controls)if(c.id!=null){S.p[c.id]=keep&&c.id in keep.p?keep.p[c.id]:c.value;S.v[c.id]=S.p[c.id]}if(mod.init)mod.init(S);return S}
function render(ctx,S,mod,W,H,dpr){X=ctx;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.globalAlpha=1;ctx.fillStyle=C.stage;ctx.fillRect(0,0,W,H);S.W=W;S.H=H;ctx.save();try{mod.draw(S)}catch(e){ctx.restore();ctx.save();if(!Stage.err){Stage.err=e;console.error(mod.id,e)}T('Noe gikk galt i denne animasjonen.',W/2,H/2,{a:'center',c:C.red})}ctx.restore()}
function setP(id,v,S=Stage.S){if(!S)return;S.p[id]=v;if(S===Stage.S&&typeof syncCtl==='function')syncCtl(id)}
