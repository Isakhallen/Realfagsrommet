/* ================= App: navigasjon, kontroller, sløyfe ================= */
const SUBJ={ma:{n:'Matematikk',c:'#58C4DD'},fy:{n:'Fysikk',c:'#F4D345'},ki:{n:'Kjemi',c:'#FC6255'},bi:{n:'Biologi',c:'#5CD0B3'},na:{n:'Naturfag',c:'#83C167'},ge:{n:'Geografi',c:'#F0AC5F'}};
const COURSES={
  '1P':{n:'Matematikk 1P',s:'ma',tr:1},'1T':{n:'Matematikk 1T',s:'ma',tr:1},
  '2P':{n:'Matematikk 2P',s:'ma',tr:2},'R1':{n:'Matematikk R1',s:'ma',tr:2},'S1':{n:'Matematikk S1',s:'ma',tr:2},
  'R2':{n:'Matematikk R2',s:'ma',tr:3},'S2':{n:'Matematikk S2',s:'ma',tr:3},
  'FY1':{n:'Fysikk 1',s:'fy',tr:2},'FY2':{n:'Fysikk 2',s:'fy',tr:3},
  'KJ1':{n:'Kjemi 1',s:'ki',tr:2},'KJ2':{n:'Kjemi 2',s:'ki',tr:3},
  'BI1':{n:'Biologi 1',s:'bi',tr:2},'BI2':{n:'Biologi 2',s:'bi',tr:3},
  'NAT':{n:'Naturfag',s:'na',tr:1},'GEO':{n:'Geografi',s:'ge',tr:1,trs:[1,2]}};
const SHORT={FY1:'Fy1',FY2:'Fy2',KJ1:'Kj1',KJ2:'Kj2',BI1:'Bi1',BI2:'Bi2',NAT:'Nat',GEO:'Geo'};
const trOf=c=>c.trs||[c.tr];
const vgOf=c=>c.trs?'Vg'+c.trs.join('–'):'Vg'+c.tr;
const sc=k=>SHORT[k]||k;
/* Kjører siden som vanlig nettside (index.html har data-site="1") eller som Claude-artefakt? */
const SITE=document.documentElement.dataset.site==='1';
const HOME_TITLE=document.title||'Realfagsrommet';
const WEB=/^https?:$/.test(location.protocol);
function shareURL(id){const base=location.href.split('#')[0].replace(/index\.html$/,'');if(SITE&&WEB)return new URL('animasjon/'+id+'/',base).href;return SITE?base+'#'+id:'#'+id}
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---- KaTeX ---- */
const TEXMAC={'\\cB':'\\textcolor{58C4DD}{#1}','\\cY':'\\textcolor{F4D345}{#1}','\\cR':'\\textcolor{FC6255}{#1}','\\cG':'\\textcolor{83C167}{#1}','\\cT':'\\textcolor{5CD0B3}{#1}','\\cO':'\\textcolor{F0AC5F}{#1}','\\cP':'\\textcolor{B189C6}{#1}','\\cK':'\\textcolor{E07AC8}{#1}'};
function texHTML(s,display){if(window.katex){try{return katex.renderToString(s,{displayMode:display,throwOnError:false,macros:Object.assign({},TEXMAC)})}catch(e){}}return`<span class="rawtex">${esc(s)}</span>`}
const inl=html=>String(html).replace(/\$([^$]+)\$/g,(m,t)=>texHTML(t,false));

/* ---- filtre ---- */
const F={s:null,tr:null,c:null,q:''};
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
function searchText(m){return m._q||(m._q=norm([m.title,m.short||'',m.lead||'',(m.about||[]).join(' '),(m.kw||''),m.c.map(k=>COURSES[k].n+' '+k).join(' ')].join(' ')))}
function matches(m){if(F.s&&m.s!==F.s&&!m.c.some(k=>COURSES[k].s===F.s))return false;if(F.tr&&!m.c.some(k=>trOf(COURSES[k]).includes(F.tr)))return false;if(F.c&&!m.c.includes(F.c))return false;if(F.q){const q=norm(F.q).split(/\s+/).filter(Boolean);const t=searchText(m);if(!q.every(w=>t.includes(w)))return false}return true}

function buildFilters(){
  const st=$('#subjTabs');st.innerHTML=[['','Alle']].concat(Object.entries(SUBJ).map(([k,v])=>[k,v.n])).map(([k,n])=>`<button type="button" data-s="${k}" aria-pressed="${(F.s||'')===k}">${k?`<span class="sdot" style="--c:${SUBJ[k].c}"></span>`:''}${n}</button>`).join('');
  $('#trinnF').innerHTML=[[0,'Alle'],[1,'Vg1'],[2,'Vg2'],[3,'Vg3']].map(([k,n])=>`<button type="button" class="chip" data-tr="${k}" aria-pressed="${(F.tr||0)===k}">${n}</button>`).join('');
  const cs=Object.entries(COURSES).filter(([k,v])=>(!F.s||v.s===F.s)&&(!F.tr||trOf(v).includes(F.tr)));
  $('#courseF').innerHTML=cs.map(([k,v])=>`<button type="button" class="chip" data-c="${k}" aria-pressed="${F.c===k}" title="${v.n}">${sc(k)}</button>`).join('');
}
function buildList(){
  const box=$('#mlist');let html='';
  for(const s of Object.keys(SUBJ)){const ms=MODS.filter(m=>m.s===s&&matches(m));if(!ms.length)continue;
    html+=`<div class="mgroup"><h5><span class="sdot" style="--c:${SUBJ[s].c}"></span>${SUBJ[s].n}</h5>`+ms.map(m=>`<a class="mi" href="#${m.id}" data-id="${m.id}"${Stage.mod===m?' aria-current="page"':''}><span>${esc(m.short||m.title)}</span><span class="mc">${m.c.map(sc).join(' · ')}</span></a>`).join('')+'</div>'}
  box.innerHTML=html||'<p class="empty">Ingen emner passer søket.</p>';
}
function buildGallery(){
  const g=$('#gallery');const ms=MODS.filter(matches);
  const title=F.c?COURSES[F.c].n:F.s?SUBJ[F.s].n:'Alle animasjoner';
  $('#galTitle').textContent=title+(F.tr&&!F.c?' · Vg'+F.tr:'');
  $('#galSub').textContent=ms.length+(ms.length===1?' animasjon':' animasjoner')+(F.q?` som passer «${F.q}»`:'');
  g.innerHTML=ms.map(m=>`<a class="card" href="#${m.id}" style="--c:${SUBJ[m.s].c}"><div class="th"><canvas width="640" height="400" data-id="${m.id}" aria-hidden="true"></canvas></div><div class="ct">${esc(m.title)}</div><div class="cm"><span class="sdot" style="--c:${SUBJ[m.s].c}"></span>${m.c.map(sc).join(' · ')}</div></a>`).join('')||'<p class="empty">Ingen animasjoner passer. Prøv et annet søkeord eller fjern filteret.</p>';
  g.querySelectorAll('canvas').forEach(c=>thumbIO&&thumbIO.observe(c));
}
function buildCourseGrid(){
  $('#courseGrid').innerHTML=Object.entries(SUBJ).map(([s,v])=>{const cs=Object.entries(COURSES).filter(([k,c])=>c.s===s).sort((a,b)=>a[1].tr-b[1].tr);const n=MODS.filter(m=>m.s===s).length;
    return`<div class="cgrp" style="--c:${v.c}"><h3>${v.n}<span>${n} animasjoner</span></h3>`+cs.map(([k,c])=>`<button type="button" class="cbtn" data-c="${k}" aria-pressed="${F.c===k}"><span>${c.n.replace('Matematikk ','')}${c.n.startsWith('Matematikk')?'':''} <span style="color:var(--fg-3)">· ${vgOf(c)}</span></span><span class="n">${MODS.filter(m=>m.c.includes(k)).length}</span></button>`).join('')+'</div>'}).join('');
}
function refreshFilters(){buildFilters();buildList();buildGallery();buildCourseGrid()}

/* ---- miniatyrer ---- */
let thumbIO=null;const thumbQ=[];
function renderThumb(cv){const m=MOD[cv.dataset.id];if(!m||cv._done)return;cv._done=true;const ctx=cv.getContext('2d');const W=640,H=400;try{const S=newState(m,W,H);S.touched=true;const oi=INTRO;INTRO=1;for(let i=0;i<(m.warm??70);i++){S.t+=1/30;if(m.update)m.update(S,1/30)}render(ctx,S,m,W,H,1);INTRO=oi;X=Stage.ctx}catch(e){console.warn('miniatyr',m.id,e)}}

/* ---- kontroller ---- */
let ctlEls={};
const fmtCtl=(c,v)=>c.fmt?c.fmt(v):nf(v,c.d??decOf(c.step||1))+(c.unit?' '+c.unit:'');
const toSl=(c,v)=>c.log?Math.round(1000*Math.log(v/c.min)/Math.log(c.max/c.min)):v;
const fromSl=(c,r)=>c.log?c.min*Math.pow(c.max/c.min,r/1000):+r;
function fillPct(c,inp){const t=(inp.value-inp.min)/((inp.max-inp.min)||1);inp.style.setProperty('--fill',(t*100).toFixed(1)+'%')}
function buildControls(){
  const box=$('#ctrls');box.textContent='';ctlEls={};const m=Stage.mod,S=Stage.S;
  m.controls.forEach((c,i)=>{let el=document.createElement('div');const cid='c-'+m.id+'-'+(c.id||i);
    if(c.type==='seg'){el.className='ctl';el.innerHTML=`<span class="lab">${c.label||''}</span><div class="seg" role="group" aria-label="${esc((c.label||'').replace(/<[^>]+>/g,''))}">`+c.options.map(([v,n])=>`<button type="button" data-v="${esc(v)}" aria-pressed="${S.p[c.id]===v}">${n}</button>`).join('')+'</div>';
      el.querySelectorAll('button').forEach(b=>b.onclick=()=>{const o=c.options.find(o=>String(o[0])===b.dataset.v);changeP(c,o[0])})}
    else if(c.type==='sel'){el.className='ctl';el.innerHTML=`<label for="${cid}">${c.label}</label><select id="${cid}">`+c.options.map(([v,n])=>`<option value="${esc(v)}"${S.p[c.id]===v?' selected':''}>${n}</option>`).join('')+'</select>';
      el.querySelector('select').onchange=e=>{const o=c.options.find(o=>String(o[0])===e.target.value);changeP(c,o[0])}}
    else if(c.type==='check'){el=document.createElement('label');el.className='ctl chk';el.innerHTML=`<input type="checkbox" id="${cid}"${S.p[c.id]?' checked':''}><span>${c.label}</span>`;el.querySelector('input').onchange=e=>changeP(c,e.target.checked)}
    else if(c.type==='btns'){el.className='ctl btns';c.items.forEach(([n,f])=>{const b=document.createElement('button');b.type='button';b.innerHTML=n;b.onclick=()=>{Stage.S.touched=true;hideHint();f(Stage.S);refreshShow()};el.append(b)})}
    else{el.className='ctl';el.innerHTML=`<label for="${cid}">${c.label}</label><output for="${cid}">${fmtCtl(c,S.p[c.id])}</output><input type="range" id="${cid}" min="${c.log?0:c.min}" max="${c.log?1000:c.max}" step="${c.log?1:c.step||1}" value="${toSl(c,S.p[c.id])}">`;
      const inp=el.querySelector('input');fillPct(c,inp);inp.oninput=()=>{fillPct(c,inp);changeP(c,fromSl(c,inp.value))}}
    el._c=c;box.append(el);if(c.id)ctlEls[c.id]=el});
  refreshShow();
}
function changeP(c,v){const S=Stage.S;S.p[c.id]=v;S.touched=true;hideHint();const el=ctlEls[c.id];if(el){if(c.type==='seg')el.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===String(v)));else if(!c.type){el.querySelector('output').textContent=fmtCtl(c,v)}}if(c.snap)S.v[c.id]=v;if(Stage.mod.change)Stage.mod.change(S,c.id);refreshShow()}
function syncCtl(id){const el=ctlEls[id];if(!el)return;const c=el._c,v=Stage.S.p[id];if(c.type==='seg')el.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===String(v)));else if(c.type==='sel')el.querySelector('select').value=v;else if(c.type==='check')el.querySelector('input').checked=!!v;else if(!c.type){const inp=el.querySelector('input');inp.value=toSl(c,v);fillPct(c,inp);el.querySelector('output').textContent=fmtCtl(c,v)}refreshShow()}
function refreshShow(){for(const el of $('#ctrls').children){const c=el._c;if(c&&c.show)el.hidden=!c.show(Stage.S)}}

/* ---- modulvisning ---- */
let lastRO='',lastLive='',roT=0,hintT=0;
function hideHint(){$('#hint').classList.add('gone')}
function setPlayIcon(){$('#bPlay').innerHTML=Stage.play?'<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2.5" y="2" width="3.2" height="10" rx="1" fill="currentColor"/><rect x="8.3" y="2" width="3.2" height="10" rx="1" fill="currentColor"/></svg>':'<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3.5 2l8.5 5-8.5 5z" fill="currentColor"/></svg>';$('#bPlay').setAttribute('aria-label',Stage.play?'Pause (mellomrom)':'Spill av (mellomrom)')}
function openMod(id){
  const m=MOD[id];show('mod');Stage.mod=m;Stage.err=null;Stage.drag=null;Stage.play=!m.paused;setPlayIcon();
  Stage.S=newState(m,Stage.W,Stage.H);if(REDUCED)Stage.S.intro=1;
  const sj=SUBJ[m.s];
  $('#crumbs').innerHTML=`<a href="#hjem">Forside</a><span>/</span><span style="color:${sj.c}">${sj.n}</span><span>/</span><span>${m.c.map(k=>COURSES[k].n.replace('Matematikk ','Matte ')).join(' · ')}</span>`;
  $('#mTitle').textContent=m.title;$('#mLead').innerHTML=inl(m.lead||'');
  $('#mAbout').innerHTML=(m.about||[]).map(p=>`<p>${inl(p)}</p>`).join('');
  $('#mTex').innerHTML=(m.tex||[]).map(t=>`<div class="f">${texHTML(t,true)}</div>`).join('')||'<p class="empty">Ingen formler i denne animasjonen.</p>';
  const done=store.get('rfr-tasks-v1',{})[id]||[];
  $('#mTasks').innerHTML=(m.tasks||[]).map((t,i)=>`<li class="${done[i]?'done':''}"><input type="checkbox" id="t-${i}"${done[i]?' checked':''}><label for="t-${i}">${inl(t)}</label></li>`).join('');
  $('#mTasks').querySelectorAll('input').forEach((inp,i)=>inp.onchange=()=>{const all=store.get('rfr-tasks-v1',{});const a=all[id]||[];a[i]=inp.checked;all[id]=a;store.set('rfr-tasks-v1',all);inp.parentElement.classList.toggle('done',inp.checked)});
  $('#mCode').textContent=shareURL(id);
  const i=MODS.indexOf(m),pv=MODS[i-1],nx=MODS[i+1];
  $('#prevnext').innerHTML=(pv?`<a href="#${pv.id}"><span>Forrige</span><b>${esc(pv.title)}</b></a>`:'')+(nx?`<a href="#${nx.id}"><span>Neste</span><b>${esc(nx.title)}</b></a>`:'');
  const h=$('#hint');h.textContent=m.hint||'';h.hidden=!m.hint;h.classList.remove('gone');clearTimeout(hintT);hintT=setTimeout(hideHint,9000);
  Stage.cv.style.touchAction=m.pick?'none':'auto';
  buildControls();lastRO='';lastLive='';$('#rd').innerHTML='';$('#live').innerHTML='';
  document.querySelectorAll('.mi').forEach(a=>a.toggleAttribute('aria-current',a.dataset.id===id));
  document.querySelectorAll('.mi[aria-current]').forEach(a=>a.setAttribute('aria-current','page'));
  document.title=m.title+' · Realfagsrommet';
  const cv_=Stage.cv;cv_.setAttribute('role','img');cv_.setAttribute('aria-label','Animasjon: '+m.title);
  store.set('rfr-last',id);
}
function resetMod(keepParams=true){const m=Stage.mod;if(!m)return;const old=Stage.S;Stage.S=newState(m,Stage.W,Stage.H,keepParams?old:null);Stage.S.intro=1;Stage.S.touched=old.touched;Stage.err=null;if(!keepParams)buildControls()}
function show(v){$('#vHome').hidden=v!=='home';$('#vMod').hidden=v!=='mod';$('#vPlan').hidden=v!=='plan';if(v!=='mod'){Stage.mod=null;document.title=v==='plan'?'Læreplankart · Realfagsrommet':HOME_TITLE;document.querySelectorAll('.mi[aria-current]').forEach(a=>a.removeAttribute('aria-current'));if(document.body.classList.contains('board'))toggleBoard(false)}document.body.classList.remove('nav-open');$('#navBtn').setAttribute('aria-expanded','false');window.scrollTo(0,0)}
function route(){const h=decodeURIComponent(location.hash.slice(1));if(MOD[h])openMod(h);else if(h==='laereplan'){show('plan')}else show('home')}

/* ---- tavlemodus ---- */
function toggleBoard(on){const b=document.body;on=on??!b.classList.contains('board');b.classList.toggle('board',on);try{if(on&&document.documentElement.requestFullscreen&&!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>{});if(!on&&document.fullscreenElement)document.exitFullscreen().catch(()=>{})}catch(e){}}

/* ---- læreplankart ---- */
function buildPlan(){
  $('#plan').innerHTML=PLAN.map(p=>{const c=COURSES[p.k];return`<div class="pcourse" style="--c:${SUBJ[c.s].c}"><h3>${c.n}</h3><div class="meta">${vgOf(c).toUpperCase()} · ${MODS.filter(m=>m.c.includes(p.k)).length} ANIMASJONER</div>`+p.t.map(([t,ids])=>`<div class="ptopic"><span>${esc(t)}</span><div class="links">${ids.length?ids.filter(id=>MOD[id]).map(id=>`<a href="#${id}">${esc(MOD[id].short||MOD[id].title)}</a>`).join(''):'<span class="none">Ingen animasjon ennå</span>'}</div></div>`).join('')+'</div>'}).join('');
}

/* ---- forside-animasjon: Fourierrekke ---- */
const Hero={cv:null,ctx:null,W:0,H:0,dpr:1,th:0,buf:[],N:4,Ns:4};
function drawHero(dt){const h=Hero;if(!h.ctx||h.W<40)return;X=h.ctx;const W=h.W,H=h.H;X.setTransform(h.dpr,0,0,h.dpr,0,0);X.fillStyle=C.stage;X.fillRect(0,0,W,H);
  h.th+=dt*(REDUCED?.35:1.1);h.Ns=smooth(h.Ns,h.N,dt,6);
  const cx=W*.24,cy=H*.52,R=Math.min(H*.25,W*.13);let x=cx,y=cy;
  const terms=Math.max(1,Math.round(h.Ns));
  for(let k=0;k<terms;k++){const n=2*k+1,r=R*4/(PI*n);const nx=x+r*Math.cos(n*h.th),ny=y-r*Math.sin(n*h.th);circ(x,y,r,A(C.blue,k?.28:.55),null,1.2);ln(x,y,nx,ny,A(C.fg,.75),1.4);x=nx;y=ny}
  dot(x,y,4.5,C.yellow);
  const x0=W*.5;h.buf.unshift(y);const maxN=Math.max(1,Math.ceil((W-x0-16)/2));if(h.buf.length>maxN)h.buf.length=maxN;
  ln(x,y,x0,y,A(C.yellow,.5),1.2,[4,5]);
  ln(x0,cy,W-14,cy,A(C.fg,.35),1);ln(x0,cy-R*1.5,x0,cy+R*1.5,A(C.fg,.35),1);
  X.setLineDash([3,6]);X.strokeStyle=A(C.fg,.25);X.lineWidth=1.2;X.beginPath();X.moveTo(x0,cy-R);X.lineTo(W-14,cy-R);X.moveTo(x0,cy+R);X.lineTo(W-14,cy+R);X.stroke();X.setLineDash([]);
  X.beginPath();h.buf.forEach((v,i)=>{const px=x0+i*2;i?X.lineTo(px,v):X.moveTo(px,v)});X.strokeStyle=C.yellow;X.lineWidth=2.6;X.lineJoin='round';X.stroke();
  const fs=Math.min(19,W/30);T('f(t)',16,24,{f:'m',s:fs,c:C.fg2});let xx=16+tw('f(t)',{f:'m',s:fs});T(' = ',xx,24,{f:'d',s:fs,c:C.fg2});xx+=tw(' = ',{f:'d',s:fs});T('4',xx+6,15,{a:'center',f:'d',s:fs*.85,c:C.fg2});ln(xx,24,xx+13,24,C.fg2,1);T('π',xx+6,34,{a:'center',f:'m',s:fs*.85,c:C.fg2});xx+=18;
  T('( sin t + ⅓ sin 3t + ⅕ sin 5t + … )',xx,24,{f:'d',s:fs*.92,c:C.fg2});
  T(terms+(terms===1?' ledd':' ledd'),W-14,H-16,{f:'n',s:12,c:C.fg3,a:'right'});
}

/* ---- hovedsløyfe ---- */
function tick(ts){requestAnimationFrame(tick);let dt=(ts-(Stage.last||ts))/1000;Stage.last=ts;dt=clamp(dt,0,.05);if(document.hidden)return;
  const m=Stage.mod,S=Stage.S;
  if(m&&S){for(const k in S.p){const v=S.p[k];S.v[k]=typeof v==='number'&&typeof S.v[k]==='number'?smooth(S.v[k],v,dt,10):v}
    S.intro=Math.min(1,S.intro+dt/1.1);INTRO=REDUCED?1:ease(S.intro);
    if(Stage.play&&m.update){S.t+=dt;try{m.update(S,dt)}catch(e){if(!Stage.err){Stage.err=e;console.error(m.id,e)}}}else if(Stage.play)S.t+=dt;
    render(Stage.ctx,S,m,Stage.W,Stage.H,Stage.dpr);INTRO=1;
    if(ts-roT>110){roT=ts;try{const r=m.readout?m.readout(S):[];const html=r.map(([k,v,c])=>`<div class="ro"><span class="k"${c?` style="color:${C[c]||c}"`:''}>${k}</span><span>${v}</span></div>`).join('');if(html!==lastRO){$('#rd').innerHTML=html;lastRO=html}const lv=m.live?m.live(S):'';if(lv!==lastLive){$('#live').innerHTML=lv?texHTML(lv,true):'';lastLive=lv}}catch(e){}}
  }
  if(!$('#vHome').hidden){drawHero(dt);for(let i=0;i<2&&thumbQ.length;i++)renderThumb(thumbQ.shift())}
}
function fitCanvas(cv,box,obj){const r=box.getBoundingClientRect();const dpr=Math.min(2.5,window.devicePixelRatio||1);obj.W=Math.max(1,Math.round(r.width));obj.H=Math.max(1,Math.round(r.height));obj.dpr=dpr;cv.width=Math.round(obj.W*dpr);cv.height=Math.round(obj.H*dpr)}
function pos(e){const r=Stage.cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]}

function boot(){
  loadColors();
  Stage.cv=$('#cv');Stage.ctx=Stage.cv.getContext('2d');X=Stage.ctx;
  new ResizeObserver(()=>{fitCanvas(Stage.cv,$('#stage'),Stage);if(Stage.mod&&Stage.mod.resize)Stage.mod.resize(Stage.S)}).observe($('#stage'));
  Hero.cv=$('#heroCv');Hero.ctx=Hero.cv.getContext('2d');new ResizeObserver(()=>{fitCanvas(Hero.cv,Hero.cv.parentElement,Hero);Hero.buf=[]}).observe(Hero.cv.parentElement);
  const hn=$('#heroN');fillPct(null,hn);hn.oninput=()=>{Hero.N=+hn.value;$('#heroNo').textContent=hn.value;fillPct(null,hn)};
  thumbIO='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){thumbIO.unobserve(e.target);thumbQ.push(e.target)}}),{rootMargin:'200px'}):null;
  $('#heroLede').innerHTML=`${MODS.length} interaktive animasjoner for matematikk, fysikk, kjemi, biologi, naturfag og geografi fra Vg1 til Vg3. Endre en verdi, se hva som skjer, og les formelen som forklarer det.`;
  refreshFilters();buildPlan();
  $('#subjTabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;F.s=b.dataset.s||null;F.c=null;refreshFilters();if(!$('#vMod').hidden||!$('#vPlan').hidden){location.hash='hjem'}};
  $('#trinnF').onclick=e=>{const b=e.target.closest('button');if(!b)return;F.tr=+b.dataset.tr||null;if(F.c&&F.tr&&!trOf(COURSES[F.c]).includes(F.tr))F.c=null;refreshFilters()};
  $('#courseF').onclick=e=>{const b=e.target.closest('button');if(!b)return;F.c=F.c===b.dataset.c?null:b.dataset.c;refreshFilters()};
  $('#courseGrid').onclick=e=>{const b=e.target.closest('button');if(!b)return;const k=b.dataset.c;F.c=F.c===k?null:k;F.s=null;F.tr=null;refreshFilters();$('#galTitle').scrollIntoView({behavior:REDUCED?'auto':'smooth',block:'start'})};
  $('#q').oninput=e=>{F.q=e.target.value.trim();buildList();buildGallery()};
  $('#q').onkeydown=e=>{if(e.key==='Enter'){const m=MODS.find(matches);if(m)location.hash=m.id}};
  $('#navBtn').onclick=()=>{const o=document.body.classList.toggle('nav-open');$('#navBtn').setAttribute('aria-expanded',o)};
  document.addEventListener('click',e=>{if(document.body.classList.contains('nav-open')&&!e.target.closest('#side')&&!e.target.closest('#navBtn')){document.body.classList.remove('nav-open');$('#navBtn').setAttribute('aria-expanded','false')}});
  $('#bPlay').onclick=()=>{Stage.play=!Stage.play;setPlayIcon()};
  $('#bReset').onclick=()=>resetMod(true);
  $('#bDefaults').onclick=()=>resetMod(false);
  $('#bBoard').onclick=()=>toggleBoard();
  $('#bCopy').onclick=e=>{const t=Stage.mod?shareURL(Stage.mod.id):'';const b=e.currentTarget;const lab=b.dataset.label||'Kopier koden';const ok=()=>{b.textContent='Kopiert';setTimeout(()=>b.textContent=lab,1600)};try{navigator.clipboard.writeText(t).then(ok,()=>{selectCode()})}catch(err){selectCode()}};
  function selectCode(){const r=document.createRange();r.selectNodeContents($('#mCode'));const s=getSelection();s.removeAllRanges();s.addRange(r)}
  document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&document.body.classList.contains('board'))document.body.classList.remove('board')});
  const cv=Stage.cv;
  cv.addEventListener('pointerdown',e=>{const m=Stage.mod,S=Stage.S;if(!m)return;const[x,y]=pos(e);S.touched=true;hideHint();const d=m.pick?m.pick(S,x,y):null;if(d){Stage.drag=d;try{cv.setPointerCapture(e.pointerId)}catch(_){}cv.style.cursor='grabbing';if(d.move)d.move(x,y);e.preventDefault()}else if(m.click){m.click(S,x,y)}});
  cv.addEventListener('pointermove',e=>{const m=Stage.mod,S=Stage.S;if(!m)return;const[x,y]=pos(e);if(Stage.drag){Stage.drag.move&&Stage.drag.move(x,y);e.preventDefault()}else if(e.pointerType==='mouse'){const d=m.pick?m.pick(S,x,y):null;cv.style.cursor=d?'grab':(m.click?'pointer':'default');if(m.hover)m.hover(S,x,y)}});
  const up=()=>{if(Stage.drag){Stage.drag.up&&Stage.drag.up();Stage.drag=null;cv.style.cursor='default'}};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);cv.addEventListener('pointerleave',()=>{if(Stage.mod&&Stage.mod.hover&&!Stage.drag)Stage.mod.hover(Stage.S,-1,-1)});
  document.addEventListener('keydown',e=>{const tg=e.target;if(tg&&(tg.tagName==='INPUT'&&tg.type!=='range'&&tg.type!=='checkbox'||tg.tagName==='SELECT'||tg.tagName==='TEXTAREA'))return;if(e.metaKey||e.ctrlKey||e.altKey)return;
    if(e.key==='Escape'&&document.body.classList.contains('board')){toggleBoard(false);return}
    if(!Stage.mod)return;
    if(e.key===' '&&tg.tagName!=='BUTTON'){e.preventDefault();Stage.play=!Stage.play;setPlayIcon()}
    else if(e.key==='r'||e.key==='R')resetMod(true);
    else if(e.key==='t'||e.key==='T')toggleBoard()});
  window.addEventListener('hashchange',route);
  if(SITE&&WEB&&'serviceWorker' in navigator)window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{})});
  route();
  requestAnimationFrame(tick);
  if(document.fonts&&document.fonts.load){Promise.all(['italic 16px KaTeX_Math','16px KaTeX_Main','16px "JetBrains Mono"','16px "Atkinson Hyperlegible"'].map(f=>document.fonts.load(f).catch(()=>{}))).then(()=>document.fonts.ready).then(()=>{document.querySelectorAll('#gallery canvas').forEach(c=>{if(c._done){c._done=false;thumbQ.push(c)}})})}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
