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
const SUBJ = { ma: 'Matematikk', fy: 'Fysikk', ki: 'Kjemi', bi: 'Biologi', na: 'Naturfag', ge: 'Geografi' };
const COURSE = { '1P': 'Matematikk 1P', '1T': 'Matematikk 1T', '2P': 'Matematikk 2P', R1: 'Matematikk R1', S1: 'Matematikk S1', R2: 'Matematikk R2', S2: 'Matematikk S2', UNI: 'Matematikk utenfor pensum (universitetsnivå)', FY1: 'Fysikk 1', FY2: 'Fysikk 2', KJ1: 'Kjemi 1', KJ2: 'Kjemi 2', BI1: 'Biologi 1', BI2: 'Biologi 2', NAT: 'Naturfag', GEO: 'Geografi' };
const mods = vm.runInContext('MODS.map(m=>({id:m.id,s:m.s,c:m.c,title:m.title,lead:m.lead||"",tex:m.tex||[],about:m.about||[],tasks:m.tasks||[]}))', ctx);
const PLAN = vm.runInContext('PLAN', ctx), TEMA = vm.runInContext('TEMA', ctx);
// KaTeX lages ferdig her, så formlene står i HTML-en uten JavaScript
vm.runInContext(rd('assets/vendor/katex/katex.min.js'), ctx);
const tex = (t, displayMode = false) => ctx.katex.renderToString(t, { displayMode, throwOnError: false, strict: 'ignore' });
const withTex = html => html.replace(/\$([^$]+)\$/g, (_, t) => tex(t));

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
// Egne sider med all teksten, så søkemotorer kan finne hver animasjon. De sender ikke videre
// av seg selv, fordi Google da ville sett dem som kopier av forsiden (alt etter # overses).
fs.rmSync(path.join(ROOT, 'animasjon'), { recursive: true, force: true });
const byId = Object.fromEntries(mods.map(m => [m.id, m]));
const themesOf = id => Object.entries(TEMA).flatMap(([s, ts]) => ts.filter(t => t[2].includes(id)).map(([tid, name, ids]) => ({ s, tid, name, ids })));
const goalsOf = id => PLAN.flatMap(p => p.t.filter(t => t[1].includes(id)).map(t => ({ kurs: COURSE[p.k] || p.k, mal: t[0] })));
const hasImg = id => fs.existsSync(path.join(ROOT, 'assets/bilder/animasjoner', id + '.jpg'));
const ldJson = o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const PAGE_CSS = `:root{color-scheme:dark;--bg:#12161B;--bg-2:#181D24;--line:#2A323C;--fg:#ECEFF1;--fg-2:#A9B4BF;--blue:#58C4DD;--yellow:#F4D345}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:17px/1.6 "Atkinson Hyperlegible","Segoe UI",system-ui,sans-serif}
a{color:var(--blue)}header,nav,main,footer{max-width:44rem;margin:0 auto;padding:0 16px}
header{padding-top:20px;padding-bottom:4px}.brand{color:var(--fg);text-decoration:none;font:500 1.25rem/1.2 "Newsreader",Georgia,serif}
nav ol{list-style:none;display:flex;flex-wrap:wrap;gap:4px 8px;padding:0;margin:8px 0 0;font-size:.9rem;color:var(--fg-2)}nav li+li::before{content:"›";margin-right:8px}
h1,h2,h3{font-family:"Newsreader",Georgia,serif;font-weight:500;line-height:1.2}h3{font-size:1.15rem;margin:1.2em 0 .2em}h1{font-size:clamp(1.9rem,6vw,2.6rem);margin:.4em 0 .3em}h2{font-size:1.4rem;margin:1.8em 0 .5em}
.meta,.muted{color:var(--fg-2)}.meta{margin:24px 0 0;font-size:.95rem}.lead{font-size:1.1rem}
.start{display:inline-block;margin:8px 0 20px;padding:12px 22px;border-radius:6px;background:var(--yellow);color:#12161B;font-weight:700;text-decoration:none}.start:hover{filter:brightness(1.08)}
.shot{display:block;border:1px solid var(--line);border-radius:6px;overflow:hidden}.shot img{display:block;width:100%;height:auto}
.formler{background:var(--bg-2);border:1px solid var(--line);border-radius:6px;padding:4px 16px;overflow-x:auto}
ol.tasks li,ul.goals li{margin:.4em 0}ul.links{columns:2 16ch;padding-left:1.2em}
footer{margin-top:48px;padding-top:16px;padding-bottom:32px;border-top:1px solid var(--line);font-size:.9rem;color:var(--fg-2)}`;
const head = ({ title, desc, url, img, imgAlt, root, extra = '' }) => `<!doctype html>
<html lang="nb">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Realfagsrommet">
<meta property="og:locale" content="nb_NO">
<meta property="og:title" content="${esc(title.replace(/ · Realfagsrommet$/, ''))}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(imgAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#12161B">
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${root}assets/fonter/fonter.css">
<link rel="stylesheet" href="${root}assets/vendor/katex/katex.min.css">
<style>${PAGE_CSS}</style>
${extra}</head>
<body>
<header><a class="brand" href="${root}">Realfagsrommet</a></header>
`;
const foot = root => `<footer>
<p><a href="${root}">Realfagsrommet</a> · <a href="${root}animasjon/">Alle animasjonene</a></p>
<p>Gratis interaktive animasjoner for realfag på Vg1–Vg3, etter læreplanene i LK20. Ingen informasjonskapsler, innlogging eller reklame.</p>
</footer>
</body>
</html>
`;
for (const m of mods) {
  const url = SITE_URL + 'animasjon/' + m.id + '/';
  const desc = clip(plain(m.lead));
  const kurs = m.c.map(k => COURSE[k]).join(', ');
  const img = hasImg(m.id) ? 'assets/bilder/animasjoner/' + m.id + '.jpg' : 'assets/bilder/forside.jpg';
  const themes = themesOf(m.id), goals = goalsOf(m.id);
  const main = themes.find(t => t.s === m.s);
  const crumbs = [['Realfagsrommet', SITE_URL], [SUBJ[m.s], SITE_URL + '#fag/' + m.s]];
  if (main) crumbs.push([main.name, SITE_URL + `#fag/${m.s}/${main.tid}`]);
  const ld = ldJson([
    { '@context': 'https://schema.org', '@type': 'LearningResource', name: m.title, description: desc, url, image: SITE_URL + img, inLanguage: 'nb', isAccessibleForFree: true, learningResourceType: 'Interaktiv simulering', educationalLevel: 'Videregående skole (Vg1–Vg3)', about: SUBJ[m.s], teaches: goals.map(g => g.mal), publisher: { '@type': 'Organization', name: 'Realfagsrommet', url: SITE_URL } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [...crumbs, [m.title, url]].map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) }]);
  const related = themes.map(t => ({ ...t, ids: t.ids.filter(id => id !== m.id && byId[id]) })).filter(t => t.ids.length);
  wr(`animasjon/${m.id}/index.html`, head({ title: `${m.title} · Realfagsrommet`, desc, url, img: SITE_URL + img, imgAlt: 'Animasjon: ' + m.title, root: '../../', extra: ld + '\n' }) + `<nav aria-label="Brødsmuler"><ol>${crumbs.map(([n, u]) => `<li><a href="${u.replace(SITE_URL, '../../')}">${esc(n)}</a></li>`).join('')}</ol></nav>
<main>
<p class="meta">${esc(SUBJ[m.s])} · ${esc(kurs)}</p>
<h1>${esc(m.title)}</h1>
<p class="lead">${withTex(m.lead)}</p>
<a class="start" href="../../#${m.id}">Start animasjonen</a>
<a class="shot" href="../../#${m.id}" tabindex="-1"><img src="../../${img}" alt="Skjermbilde av animasjonen ${esc(m.title)}" width="1200" height="630"></a>
${m.tex.length ? `<h2>Formler</h2>\n<div class="formler">${m.tex.map(t => tex(t, true)).join('')}</div>\n` : ''}${m.about.length ? `<h2>Om animasjonen</h2>\n${m.about.map(p => `<p>${withTex(p)}</p>`).join('\n')}\n` : ''}${m.tasks.length ? `<h2>Prøv dette</h2>\n<ol class="tasks">${m.tasks.map(t => `<li>${withTex(t)}</li>`).join('')}</ol>\n` : ''}${goals.length ? `<h2>Kompetansemål</h2>\n<ul class="goals">${goals.map(g => `<li><b>${esc(g.kurs)}:</b> ${esc(g.mal)}</li>`).join('')}</ul>\n` : ''}${related.map(t => `<h2>Mer om ${esc(t.name.charAt(0).toLowerCase() + t.name.slice(1))}</h2>\n<ul class="links">${t.ids.map(id => `<li><a href="../${id}/">${esc(byId[id].title)}</a></li>`).join('')}</ul>\n`).join('')}<p><a class="start" href="../../#${m.id}">Start animasjonen</a></p>
</main>
` + foot('../../'));
}

// Oversikt: animasjon/index.html med lenker til alle delingssidene, sortert etter fag og tema
{
  const n = mods.length;
  const sections = Object.keys(SUBJ).map(s => {
    const own = mods.filter(m => m.s === s), seen = new Set();
    const groups = (TEMA[s] || []).map(([, name, ids]) => { ids.forEach(id => seen.add(id)); return [name, ids.filter(id => byId[id])]; });
    const rest = own.filter(m => !seen.has(m.id)).map(m => m.id);
    if (rest.length) groups.push(['Andre emner', rest]);
    return `<h2>${SUBJ[s]}</h2>\n` + groups.filter(g => g[1].length).map(([name, ids]) => `<h3>${esc(name)}</h3>\n<ul class="links">${ids.map(id => `<li><a href="${id}/">${esc(byId[id].title)}</a></li>`).join('')}</ul>`).join('\n');
  }).join('\n');
  const desc = `Oversikt over alle ${n} interaktive animasjonene i Realfagsrommet, sortert etter fag og tema: matematikk, fysikk, kjemi, biologi, naturfag og geografi for Vg1–Vg3.`;
  wr('animasjon/index.html', head({ title: 'Alle animasjonene · Realfagsrommet', desc, url: SITE_URL + 'animasjon/', img: SITE_URL + 'assets/bilder/forside.jpg', imgAlt: 'Realfagsrommet', root: '../' }) + `<main>
<h1>Alle animasjonene</h1>
<p class="lead">${esc(desc)}</p>
<a class="start" href="../">Til Realfagsrommet</a>
${sections}
</main>
` + foot('../'));
}

// 4) Delingsinfo i index.html
const n = mods.length;
const homeDesc = `${n} interaktive animasjoner i matematikk, fysikk, kjemi, biologi, naturfag og geografi for Vg1–Vg3. Dra i verdiene, se hva som skjer, og les formelen som forklarer det.`;
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
  <url><loc>${SITE_URL}animasjon/</loc></url>
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
