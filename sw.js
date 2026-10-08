// Generert av verktoy/bygg.mjs – ikke rediger for hånd.
// Offline-støtte: henter alltid fra nettet først, og bruker lagret kopi bare når nettet svikter.
const VERSION = 'rfr-dadc75e2fd';
const PRECACHE = ["./",
  "index.html",
  "favicon.svg",
  "manifest.webmanifest",
  "icon-192.png",
  "assets/css/site.css",
  "assets/fonter/atkinson-hyperlegible-latin-400-italic.woff2",
  "assets/fonter/atkinson-hyperlegible-latin-400-normal.woff2",
  "assets/fonter/atkinson-hyperlegible-latin-700-italic.woff2",
  "assets/fonter/atkinson-hyperlegible-latin-700-normal.woff2",
  "assets/fonter/fonter.css",
  "assets/fonter/jetbrains-mono-latin-400-normal.woff2",
  "assets/fonter/jetbrains-mono-latin-500-normal.woff2",
  "assets/fonter/newsreader-latin-opsz-italic.woff2",
  "assets/fonter/newsreader-latin-opsz-normal.woff2",
  "assets/js/app.js",
  "assets/js/core.js",
  "assets/js/data/verdenskart.js",
  "assets/js/laereplan.js",
  "assets/js/moduler/biologi-1.js",
  "assets/js/moduler/biologi-2.js",
  "assets/js/moduler/fysikk-1.js",
  "assets/js/moduler/fysikk-2.js",
  "assets/js/moduler/fysikk-3.js",
  "assets/js/moduler/fysikk-4.js",
  "assets/js/moduler/geografi-1.js",
  "assets/js/moduler/geografi-2.js",
  "assets/js/moduler/kjemi-1.js",
  "assets/js/moduler/kjemi-2.js",
  "assets/js/moduler/kjemi-3.js",
  "assets/js/moduler/matematikk-1.js",
  "assets/js/moduler/matematikk-2.js",
  "assets/js/moduler/matematikk-3.js",
  "assets/js/moduler/matematikk-4.js",
  "assets/js/moduler/matematikk-5.js",
  "assets/js/moduler/naturfag-2.js",
  "assets/js/moduler/naturfag-3.js",
  "assets/js/moduler/naturfag-4.js",
  "assets/js/moduler/naturfag-5.js",
  "assets/js/moduler/naturfag.js",
  "assets/js/temaer.js",
  "assets/vendor/katex/fonts/KaTeX_AMS-Regular.woff2",
  "assets/vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff2",
  "assets/vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff2",
  "assets/vendor/katex/fonts/KaTeX_Fraktur-Bold.woff2",
  "assets/vendor/katex/fonts/KaTeX_Fraktur-Regular.woff2",
  "assets/vendor/katex/fonts/KaTeX_Main-Bold.woff2",
  "assets/vendor/katex/fonts/KaTeX_Main-BoldItalic.woff2",
  "assets/vendor/katex/fonts/KaTeX_Main-Italic.woff2",
  "assets/vendor/katex/fonts/KaTeX_Main-Regular.woff2",
  "assets/vendor/katex/fonts/KaTeX_Math-BoldItalic.woff2",
  "assets/vendor/katex/fonts/KaTeX_Math-Italic.woff2",
  "assets/vendor/katex/fonts/KaTeX_SansSerif-Bold.woff2",
  "assets/vendor/katex/fonts/KaTeX_SansSerif-Italic.woff2",
  "assets/vendor/katex/fonts/KaTeX_SansSerif-Regular.woff2",
  "assets/vendor/katex/fonts/KaTeX_Script-Regular.woff2",
  "assets/vendor/katex/fonts/KaTeX_Size1-Regular.woff2",
  "assets/vendor/katex/fonts/KaTeX_Size2-Regular.woff2",
  "assets/vendor/katex/fonts/KaTeX_Size3-Regular.woff2",
  "assets/vendor/katex/fonts/KaTeX_Size4-Regular.woff2",
  "assets/vendor/katex/fonts/KaTeX_Typewriter-Regular.woff2",
  "assets/vendor/katex/katex.min.css",
  "assets/vendor/katex/katex.min.js"];

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
      const m = rel.match(/^animasjon\/([\w-]+)\/?(index\.html)?$/);
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
