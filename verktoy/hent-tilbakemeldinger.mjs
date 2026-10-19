// Henter tilbakemeldingene fra mottaket på Cloudflare og skriver dem til tilbakemeldinger.md i roten. Kjør fra mappen realfagsrommet:
//   node verktoy/hent-tilbakemeldinger.mjs
// Adressen står i data-url på <form id="fbForm"> i index.html. Lesenøkkelen ligger i verktoy/tilbakemelding/nokkel.txt.
// tilbakemeldinger.md og nokkel.txt står i .gitignore og blir aldri publisert. Fila skrives på nytt hver gang.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rd = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const ex = p => fs.existsSync(path.join(ROOT, p));
const OUT = 'tilbakemeldinger.md', NF = 'verktoy/tilbakemelding/nokkel.txt';
const stopp = msg => { console.error(msg); process.exit(1); };

const url = (rd('index.html').match(/<form id="fbForm" data-url="([^"]*)"/) || [])[1];
if (!url) stopp('Mottaket er ikke satt opp ennå (data-url i index.html er tom). Kjør: node verktoy/tilbakemelding/sett-opp.mjs');
const nokkel = (process.env.LESENOKKEL || (ex(NF) ? rd(NF) : '')).trim();
if (!nokkel) stopp(`Fant ikke lesenøkkelen i ${NF}. Kjør: node verktoy/tilbakemelding/sett-opp.mjs`);
const SITE = JSON.parse(rd('verktoy/config.json')).siteUrl.replace(/\/?$/, '/');

const alle = [];
let cursor = null;
do {
  const u = new URL('tilbakemeldinger', url); if (cursor) u.searchParams.set('cursor', cursor);
  let res, j = {};
  try { res = await fetch(u, { headers: { Authorization: 'Bearer ' + nokkel } }); j = await res.json().catch(() => ({})); }
  catch (e) { stopp('Fikk ikke kontakt med mottaket: ' + e.message); }
  if (!res.ok || !j.ok) stopp(`Fikk ikke hentet tilbakemeldingene (${res.status}): ${j.feil || res.statusText}`);
  alle.push(...j.tilbakemeldinger); cursor = j.cursor;
} while (cursor);
alle.sort((a, b) => b.id.localeCompare(a.id));

// Hvilke er nye siden sist? Id-ene står som skjulte kommentarer i fila.
const sett = new Set(ex(OUT) ? [...rd(OUT).matchAll(/<!-- id: (\S+) -->/g)].map(m => m[1]) : []);
const nye = sett.size ? alle.filter(t => !sett.has(t.id)).length : 0;

// Teksten kommer fra hvem som helst på nettet: gjør markdown-tegn ufarlige, så ingen lenker eller bilder lastes.
const md = t => String(t || '').replace(/[\\`*_[\]<>!#|~]/g, '\\$&');
const sitat = t => String(t || '').split(/\r?\n/).map(l => l.trim() ? '> ' + md(l) + '  ' : '>').join('\n');
const dato = iso => new Date(iso).toLocaleString('nb-NO', { timeZone: 'Europe/Oslo', dateStyle: 'medium', timeStyle: 'short' });
const kode = t => '`' + String(t).replace(/`/g, "'") + '`';

const deler = alle.map(t => {
  const ny = sett.size && !sett.has(t.id);
  const tittel = [md(t.type), t.tittel ? md(t.tittel) : 'Generelt'].join(' · ') + (ny ? ' · **Ny**' : '');
  const fakta = [];
  if (t.modul && /^[\w-]+$/.test(t.modul)) fakta.push(`Animasjon: [${md(t.tittel || t.modul)}](${SITE}#${t.modul})`);
  if (t.verdier) fakta.push('Verdier: ' + kode(t.verdier));
  if (t.epost) fakta.push('Svar til: ' + md(t.epost));
  if (t.side) fakta.push('Side: ' + kode(t.side));
  if (t.nettleser || t.vindu) fakta.push('Nettleser: ' + md(t.nettleser) + (t.vindu ? ` · vindu ${md(t.vindu)}` : ''));
  return [`## ${tittel}`, dato(t.tid), sitat(t.melding), fakta.map(f => '- ' + f).join('\n'), `<!-- id: ${t.id} -->`].filter(Boolean).join('\n\n');
});

const n = alle.length;
const topp = `# Tilbakemeldinger\n\n${n} ${n === 1 ? 'melding' : 'meldinger'}, nyeste først. Hentet ${dato(new Date().toISOString())}.` +
  (nye ? ` ${nye} ${nye === 1 ? 'er ny' : 'er nye'} siden forrige henting og er merket **Ny**.` : '') +
  `\n\nFila lages på nytt hver gang du kjører \`node verktoy/hent-tilbakemeldinger.mjs\`, så ikke skriv egne notater her. Den står i .gitignore og blir ikke publisert.`;
fs.writeFileSync(path.join(ROOT, OUT), [topp, ...deler].join('\n\n---\n\n') + '\n');
console.log(`${n} ${n === 1 ? 'tilbakemelding' : 'tilbakemeldinger'}${nye ? ` (${nye} nye)` : ''} → ${OUT}`);
