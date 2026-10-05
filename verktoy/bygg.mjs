// Bygger de genererte delene av nettstedet. Kjør fra mappen realfagsrommet:
//   node verktoy/bygg.mjs
// Lager: animasjon/<id>/index.html (delingssider med forhåndsvisning), sitemap.xml,
// robots.txt, sw.js (offline-støtte) og delingsinfo i <head> på index.html.
// Nettadressen hentes fra verktoy/config.json. Ingen andre avhengigheter enn Node 18+.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'verktoy/config.json'), 'utf8'));
const SITE_URL = cfg.siteUrl.endsWith('/') ? cfg.siteUrl : cfg.siteUrl + '/';
const rd = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const wr = (p, s) => { fs.mkdirSync(path.dirname(path.join(ROOT, p)), { recursive: true }); fs.writeFileSync(path.join(ROOT, p), s); };

// 1) Les modulene slik nettleseren gjør, i samme rekkefølge som i index.html
const index = rd('index.html');
const scripts = [...index.matchAll(/<script defer src="(assets\/js\/[^"]+)"><\/script>/g)].map(m => m[1]).filter(s => !s.endsWith('app.js'));
const ctx = vm.createContext({ console, performance });
for (const s of scripts) vm.runInContext(rd(s), ctx, { filename: s });
const SUBJ = { ma: 'Matematikk', fy: 'Fysikk', ki: 'Kjemi', na: 'Naturfag' };
const COURSE = { '1P': 'Matematikk 1P', '1T': 'Matematikk 1T', '2P': 'Matematikk 2P', R1: 'Matematikk R1', S1: 'Matematikk S1', R2: 'Matematikk R2', S2: 'Matematikk S2', FY1: 'Fysikk 1', FY2: 'Fysikk 2', KJ1: 'Kjemi 1', KJ2: 'Kjemi 2', NAT: 'Naturfag' };
const mods = vm.runInContext('MODS.map(m=>({id:m.id,s:m.s,c:m.c,title:m.title,lead:m.lead||""}))', ctx);

// 2) Gjør TeX og HTML i ingressen om til ren tekst for beskrivelser
const SYM = { pi: 'π', lambda: 'λ', Delta: 'Δ', varphi: 'φ', phi: 'φ', sigma: 'σ', mu: 'μ', alpha: 'α', theta: 'θ', omega: 'ω', gamma: 'γ', cdot: '·', le: '≤', ge: '≥', neq: '≠', approx: '≈', to: '→', infty: '∞', times: '×', ell: 'ℓ', rightleftharpoons: '⇌', vec: '', left: '', right: '', quad: ' ', qquad: ' ' };
const FN = new Set(['sin', 'cos', 'tan', 'ln', 'lg', 'log', 'lim']);
const SUP = { '2': '²', '3': '³', n: 'ⁿ' }, SUB = { '0': '₀', '1': '₁', '2': '₂', a: 'ₐ' };
function plain(html) {
  let s = html.replace(/<[^>]+>/g, '').replace(/\$([^$]+)\$/g, (_, t) => {
    t = t.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '$1/$2').replace(/\\sqrt\{([^{}]*)\}/g, '√$1')
      .replace(/\\(?:text|mathrm|vec)\{([^{}]*)\}/g, '$1')
      .replace(/\\([A-Za-z]+)\s*/g, (m, w) => FN.has(w) ? w + ' ' : (SYM[w] ?? '')).replace(/\{,\}/g, ',').replace(/\\[,;!]/g, ' ')
      .replace(/\^\{?([23n])\}?/g, (_, d) => SUP[d]).replace(/_\{?([012a])\}?/g, (_, d) => SUB[d]).replace(/[{}\\]/g, '');
    return t;
  });
  return s.replace(/\s+/g, ' ').trim();
}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clip = (s, n = 200) => s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)) + ' …';

// 3) Delingssider: animasjon/<id>/index.html
fs.rmSync(path.join(ROOT, 'animasjon'), { recursive: true, force: true });
for (const m of mods) {
  const url = SITE_URL + 'animasjon/' + m.id + '/';
  const desc = clip(plain(m.lead));
  const kurs = m.c.map(k => COURSE[k]).join(', ');
  const img = SITE_URL + 'assets/bilder/animasjoner/' + m.id + '.jpg';
  wr(`animasjon/${m.id}/index.html`, `<!doctype html>
<html lang="nb">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(m.title)} · Realfagsrommet</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Realfagsrommet">
<meta property="og:locale" content="nb_NO">
<meta property="og:title" content="${esc(m.title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Animasjon: ${esc(m.title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#12161B">
<link rel="icon" href="../../favicon.svg" type="image/svg+xml">
<script>location.replace('../../#${m.id}')</script>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:16px;box-sizing:border-box;background:#12161B;color:#ECEFF1;font:17px/1.55 system-ui,sans-serif}main{max-width:60ch}h1{font-weight:500}p{color:#A9B4BF}a{color:#58C4DD}</style>
</head>
<body>
<main>
<p>Realfagsrommet · ${esc(SUBJ[m.s])} · ${esc(kurs)}</p>
<h1>${esc(m.title)}</h1>
<p>${esc(desc)}</p>
<p><a href="../../#${m.id}">Åpne animasjonen</a></p>
</main>
</body>
</html>
`);
}

// 4) Delingsinfo i index.html
const n = mods.length;
const homeDesc = `${n} interaktive animasjoner i matematikk, fysikk, kjemi og naturfag for Vg1–Vg3. Dra i verdiene, se hva som skjer, og les formelen som forklarer det.`;
const og = `<!-- DELING:START (oppdateres av verktoy/bygg.mjs) -->
<link rel="canonical" href="${SITE_URL}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Realfagsrommet">
<meta property="og:locale" content="nb_NO">
<meta property="og:title" content="Realfagsrommet">
<meta property="og:description" content="${esc(homeDesc)}">
<meta property="og:url" content="${SITE_URL}">
<meta property="og:image" content="${SITE_URL}assets/bilder/forside.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<!-- DELING:SLUTT -->`;
let idx = index.replace(/<!-- DELING:START[\s\S]*?DELING:SLUTT -->/, og)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(homeDesc)}">`);
wr('index.html', idx);

// 5) sitemap.xml og robots.txt
wr('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}</loc></url>
${mods.map(m => `  <url><loc>${SITE_URL}animasjon/${m.id}/</loc></url>`).join('\n')}
</urlset>
`);
wr('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}sitemap.xml\n`);

// 6) sw.js: filer som lagres for bruk uten nett, og versjon ut fra innholdet
function walk(dir) { return fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap(d => d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name).split(path.sep).join('/')]); }
const pre = ['index.html', 'favicon.svg', 'manifest.webmanifest', 'icon-192.png']
  .concat(walk('assets').filter(f => !f.startsWith('assets/bilder/') && !/LICENSE|LISENS/.test(f)))
  .filter(f => fs.existsSync(path.join(ROOT, f)));
const h = crypto.createHash('sha1'); for (const f of pre) h.update(fs.readFileSync(path.join(ROOT, f)));
const VERSION = h.digest('hex').slice(0, 10);
wr('sw.js', `// Generert av verktoy/bygg.mjs – ikke rediger for hånd.
// Offline-støtte: henter alltid fra nettet først, og bruker lagret kopi bare når nettet svikter.
const VERSION = 'rfr-${VERSION}';
const PRECACHE = ${JSON.stringify(['./', ...pre], null, 0).replace(/","/g, '",\n  "')};

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('rfr-') && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
function withTimeout(p, ms) { return new Promise((res, rej) => { const t = setTimeout(() => rej(new Error('tidsavbrudd')), ms); p.then(v => { clearTimeout(t); res(v); }, e => { clearTimeout(t); rej(e); }); }); }
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    let cached = await cache.match(req, { ignoreSearch: true }), shareId = null;
    if (req.mode === 'navigate' && !cached) {
      const rel = req.url.slice(self.registration.scope.length).split(/[?#]/)[0];
      if (rel === '' || rel === 'index.html') cached = await cache.match('./');
      const m = rel.match(/^animasjon\\/([\\w-]+)\\/?(index\\.html)?$/);
      if (m) shareId = m[1];
    }
    try {
      const res = await withTimeout(fetch(req), cached ? 6000 : 30000);
      if (res.ok && res.type === 'basic') cache.put(req, res.clone());
      return res;
    } catch (err) {
      if (cached) return cached;
      if (shareId) return Response.redirect(self.registration.scope + '#' + shareId, 302);
      throw err;
    }
  })());
});
`);

console.log(`${n} animasjoner · nettadresse ${SITE_URL} · ${pre.length} filer for offline · versjon ${VERSION}`);
