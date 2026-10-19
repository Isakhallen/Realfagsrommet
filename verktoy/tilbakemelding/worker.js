// Tar imot tilbakemeldinger fra Realfagsrommet og lagrer dem i Cloudflare KV.
// Oppsett og henting: se «Tilbakemeldinger» i README.md. Meldingene hentes med node verktoy/hent-tilbakemeldinger.mjs.
//   POST /                  ny tilbakemelding fra nettsiden (JSON)
//   GET  /tilbakemeldinger  lagrede meldinger, 500 om gangen (?cursor= for neste side). Krever «Authorization: Bearer <LESENOKKEL>».

const OPPHAV = /^(https:\/\/(www\.)?realfagsrommet\.no|https:\/\/isakhallen\.github\.io|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?)$/;
const TYPER = ['Feil', 'Forslag', 'Annet'];
const MAKS_PER_TIME = 20; // per IP-adresse og time. Romslig fordi en hel skole ofte deler én adresse.

export default {
  async fetch(req, env) {
    const url = new URL(req.url), origin = req.headers.get('Origin') || '';
    const cors = OPPHAV.test(origin) ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {};
    const svar = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors } });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...cors, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' } });
    if (req.method === 'POST' && url.pathname === '/') return lagre(req, env, cors, svar);
    if (req.method === 'GET' && url.pathname === '/tilbakemeldinger') return hent(req, env, url, svar);
    return new Response('Realfagsrommet: mottak for tilbakemeldinger\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
};

async function lagre(req, env, cors, svar) {
  if (!cors.Vary) return svar({ ok: false, feil: 'Ukjent avsender' }, 403);
  const tekst = await req.text();
  if (tekst.length > 20000) return svar({ ok: false, feil: 'For lang melding' }, 413);
  let d; try { d = JSON.parse(tekst); } catch { return svar({ ok: false, feil: 'Ugyldig innhold' }, 400); }
  const s = (v, n) => typeof v === 'string' ? v.trim().slice(0, n) : '';
  const melding = s(d.melding, 4000);
  if (melding.length < 3) return svar({ ok: false, feil: 'Meldingen mangler' }, 400);

  // Grense mot spam. IP-adressen lagres aldri, bare som hash i en teller som slettes etter en time.
  const tid = new Date().toISOString();
  const gk = 'grense:' + await sha256((env.LESENOKKEL || '') + (req.headers.get('CF-Connecting-IP') || '') + tid.slice(0, 13));
  const n = +(await env.TILBAKEMELDINGER.get(gk) || 0);
  if (n >= MAKS_PER_TIME) return svar({ ok: false, feil: 'For mange meldinger. Prøv igjen senere.' }, 429);
  await env.TILBAKEMELDINGER.put(gk, String(n + 1), { expirationTtl: 3600 });

  const post = {
    tid, type: TYPER.includes(d.type) ? d.type : 'Annet', melding,
    modul: s(d.modul, 60), tittel: s(d.tittel, 200), verdier: s(d.verdier, 2000),
    side: s(d.side, 500), epost: s(d.epost, 200), nettleser: s(d.nettleser, 400), vindu: s(d.vindu, 40)
  };
  // Nøkkelen begynner med tidspunktet, så listen kommer i rekkefølge
  await env.TILBAKEMELDINGER.put('t:' + tid + ':' + crypto.randomUUID().slice(0, 8), JSON.stringify(post));
  return svar({ ok: true });
}

async function hent(req, env, url, svar) {
  const gitt = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!env.LESENOKKEL || !gitt || await sha256(gitt) !== await sha256(env.LESENOKKEL)) return svar({ ok: false, feil: 'Feil eller manglende nøkkel' }, 401);
  const r = await env.TILBAKEMELDINGER.list({ prefix: 't:', limit: 500, cursor: url.searchParams.get('cursor') || undefined });
  const tilbakemeldinger = await Promise.all(r.keys.map(async k => ({ id: k.name, ...JSON.parse(await env.TILBAKEMELDINGER.get(k.name) || '{}') })));
  return svar({ ok: true, tilbakemeldinger, cursor: r.list_complete ? null : r.cursor });
}

async function sha256(t) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t));
  return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('');
}
