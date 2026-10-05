// Lager ikoner og forhåndsvisningsbilder (det som vises når lenker deles i Teams, Classroom o.l.).
// Kjør fra mappen realfagsrommet etter at en animasjon er lagt til eller endret:
//   npm install playwright   (én gang)
//   npx playwright install chromium   (én gang)
//   node verktoy/lag-bilder.mjs
// Skriptet starter en midlertidig lokal server, åpner siden i en usynlig nettleser
// og tegner hver animasjon i 1200 × 630 piksler.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
page.on('pageerror', e => console.error('Feil på siden:', e.message));
await page.goto(base + 'index.html');
await page.waitForFunction(() => typeof MODS !== 'undefined' && MODS.length > 0 && typeof Stage !== 'undefined' && Stage.ctx);
await page.evaluate(() => Promise.all(['italic 16px KaTeX_Math', '16px KaTeX_Main', '16px "JetBrains Mono"', '16px "Atkinson Hyperlegible"', '500 40px Newsreader', 'italic 500 40px Newsreader'].map(f => document.fonts.load(f))));

const save = (rel, dataUrl) => {
  const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, Buffer.from(dataUrl.split(',')[1], 'base64'));
};

// Ikoner fra favicon.svg
const svg = fs.readFileSync(path.join(ROOT, 'favicon.svg'), 'utf8');
for (const [name, size, bleed] of [['favicon-32.png', 32, false], ['apple-touch-icon.png', 180, true], ['icon-192.png', 192, false], ['icon-512.png', 512, false], ['icon-maskable-512.png', 512, true]]) {
  const url = await page.evaluate(async ({ svg, size, bleed }) => {
    const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); await img.decode();
    const c = document.createElement('canvas'); c.width = c.height = size; const x = c.getContext('2d');
    if (bleed) { x.fillStyle = '#12161B'; x.fillRect(0, 0, size, size); const s = size * 0.78; x.drawImage(img, (size - s) / 2, (size - s) / 2, s, s); }
    else x.drawImage(img, 0, 0, size, size);
    return c.toDataURL('image/png');
  }, { svg, size, bleed });
  save(name, url);
}

// Forhåndsvisning for hver animasjon
const ids = await page.evaluate(() => MODS.map(m => m.id));
for (const id of ids) {
  const url = await page.evaluate(id => {
    const m = MOD[id], W = 1200, H = 630, band = 92, h = H - band;
    const c = document.createElement('canvas'); c.width = W; c.height = H; const ctx = c.getContext('2d');
    const S = newState(m, W, h); S.touched = true; S.intro = 1;
    for (let i = 0; i < (m.warm ?? 110); i++) { S.t += 1 / 30; if (m.update) m.update(S, 1 / 30); }
    for (const k in S.p) S.v[k] = S.p[k];
    INTRO = 1; render(ctx, S, m, W, h, 1);
    X = ctx; ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = C.bg; ctx.fillRect(0, h, W, band); ctx.fillStyle = SUBJ[m.s].c; ctx.fillRect(0, h, W, 3);
    let size = 40; ctx.font = `500 ${size}px Newsreader, Georgia, serif`;
    while (ctx.measureText(m.title).width > W - 330 && size > 26) { size -= 2; ctx.font = `500 ${size}px Newsreader, Georgia, serif`; }
    ctx.fillStyle = C.fg; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(m.title, 36, h + band / 2 + 2);
    ctx.font = 'italic 500 26px Newsreader, Georgia, serif'; ctx.textAlign = 'right'; ctx.fillStyle = C.fg2; ctx.fillText('Realfagsrommet', W - 36, h + band / 2 - 12);
    ctx.font = '400 17px "JetBrains Mono", monospace'; ctx.fillStyle = SUBJ[m.s].c; ctx.fillText(m.c.map(k => COURSES[k].n).join(' · '), W - 36, h + band / 2 + 18);
    X = Stage.ctx;
    return c.toDataURL('image/jpeg', 0.86);
  }, id);
  save(`assets/bilder/animasjoner/${id}.jpg`, url);
}

// Forsidebilde
const home = await page.evaluate(() => {
  const W = 1200, H = 630, c = document.createElement('canvas'); c.width = W; c.height = H; const ctx = c.getContext('2d');
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
  const pick = ['ma-enhetssirkel', 'fy-efelt', 'ki-titrering'];
  const tw = 368, th = 230, gap = 16, x0 = (W - 3 * tw - 2 * gap) / 2, y0 = 244;
  pick.slice(0, 3).forEach((id, i) => {
    const m = MOD[id], tc = document.createElement('canvas'); tc.width = 736; tc.height = 460; const t = tc.getContext('2d');
    const S = newState(m, 736, 460); S.touched = true; S.intro = 1; for (let k = 0; k < 110; k++) { S.t += 1 / 30; if (m.update) m.update(S, 1 / 30); }
    INTRO = 1; render(t, S, m, 736, 460, 1);
    ctx.drawImage(tc, x0 + i * (tw + gap), y0, tw, th); ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.strokeRect(x0 + i * (tw + gap) + .5, y0 + .5, tw - 1, th - 1);
  });
  X = ctx; ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  ctx.font = 'italic 500 76px Newsreader, Georgia, serif'; ctx.fillStyle = C.fg; ctx.fillText('Realfagsrommet', x0, 150);
  ctx.font = '400 26px "Atkinson Hyperlegible", sans-serif'; ctx.fillStyle = C.fg2;
  ctx.fillText(`${MODS.length} interaktive animasjoner i matematikk, fysikk, kjemi og naturfag · Vg1–Vg3`, x0, 200);
  const subj = [['Matematikk', SUBJ.ma.c], ['Fysikk', SUBJ.fy.c], ['Kjemi', SUBJ.ki.c], ['Naturfag', SUBJ.na.c]]; let x = x0;
  ctx.font = '400 21px "Atkinson Hyperlegible", sans-serif';
  subj.forEach(([n, col]) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x + 6, 534 - 7, 6, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = C.fg2; ctx.fillText(n, x + 20, 534); x += ctx.measureText(n).width + 52; });
  ctx.font = '400 19px "JetBrains Mono", monospace'; ctx.fillStyle = C.fg3; ctx.textAlign = 'right'; ctx.fillText('Dra i verdiene. Se hva som skjer.', W - x0, 534);
  X = Stage.ctx;
  return c.toDataURL('image/jpeg', 0.88);
});
save('assets/bilder/forside.jpg', home);

await browser.close(); server.close();
console.log(`Lagde ${ids.length} forhåndsvisninger, forsidebilde og ikoner.`);
