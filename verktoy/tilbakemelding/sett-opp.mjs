// Setter opp mottaket for tilbakemeldinger på Cloudflare. Kjør fra mappen realfagsrommet:
//   node verktoy/tilbakemelding/sett-opp.mjs
// Krever en gratis konto på cloudflare.com. Skriptet
//   1) logger inn med wrangler (åpner nettleseren) hvis du ikke er logget inn,
//   2) laster opp worker.js og lager lageret (KV),
//   3) lager en lesenøkkel i nokkel.txt (står i .gitignore) og gir den til Cloudflare,
//   4) skriver adressen til mottaket inn i index.html og kjører verktoy/bygg.mjs.
// Trygt å kjøre flere ganger, for eksempel etter at worker.js er endret.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import readline from 'node:readline/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(DIR, '../..');
const NOKKEL = path.join(DIR, 'nokkel.txt');
const wrangler = (args, opts = {}) => spawnSync('npx --yes wrangler@4 ' + args, { cwd: DIR, shell: true, stdio: 'inherit', ...opts });
const stopp = msg => { console.error('\n' + msg); process.exit(1); };

// 1) Innlogging
const who = wrangler('whoami', { stdio: ['inherit', 'pipe', 'pipe'], encoding: 'utf8' });
if (/not authenticated/i.test((who.stdout || '') + (who.stderr || ''))) {
  console.log('Logger inn hos Cloudflare. Godkjenn i nettleseren som åpnes.');
  if (wrangler('login').status !== 0) stopp('Innloggingen ble ikke fullført.');
}

// 2) Last opp. Wrangler skriver adressen til en fil vi leser etterpå.
const ut = path.join(os.tmpdir(), `rfr-wrangler-${process.pid}.ndjson`);
console.log('\nLaster opp mottaket …');
if (wrangler('deploy', { env: { ...process.env, WRANGLER_OUTPUT_FILE_PATH: ut } }).status !== 0) stopp('Opplastingen feilet. Se meldingen over.');
let url = '';
try {
  for (const l of fs.readFileSync(ut, 'utf8').split('\n')) { if (!l) continue; const e = JSON.parse(l); if (e.type === 'deploy') url = (e.targets || []).find(t => /workers\.dev/.test(t)) || (e.targets || [])[0] || url; }
  fs.rmSync(ut, { force: true });
} catch (e) { }
if (!url) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  url = (await rl.question('\nFant ikke adressen. Lim inn adressen wrangler viste over (https://…workers.dev): ')).trim();
  rl.close();
}
if (!/^https:\/\/\S+$/.test(url)) stopp('Ugyldig adresse: ' + url);
url = url.replace(/\/?$/, '/');

// 3) Lesenøkkel: bare du (med nokkel.txt) kan hente meldingene
if (!fs.existsSync(NOKKEL)) fs.writeFileSync(NOKKEL, crypto.randomBytes(24).toString('base64url') + '\n');
console.log('\nGir lesenøkkelen til Cloudflare …');
if (wrangler('secret put LESENOKKEL', { input: fs.readFileSync(NOKKEL, 'utf8').trim(), stdio: ['pipe', 'inherit', 'inherit'] }).status !== 0) stopp('Fikk ikke lagret lesenøkkelen.');

// 4) Adressen inn i index.html
const ip = path.join(ROOT, 'index.html');
const html = fs.readFileSync(ip, 'utf8');
const ny = html.replace(/(<form id="fbForm" data-url=")[^"]*(")/, `$1${url}$2`);
if (ny === html && !html.includes(`data-url="${url}"`)) stopp('Fant ikke <form id="fbForm" data-url="…"> i index.html.');
fs.writeFileSync(ip, ny);
spawnSync(process.execPath, [path.join(ROOT, 'verktoy/bygg.mjs')], { stdio: 'inherit' });

console.log(`\nFerdig. Mottaket ligger på ${url}
Publiser nettsiden (commit og push), så vises knappene for tilbakemelding.
Hent meldingene med: node verktoy/hent-tilbakemeldinger.mjs`);
