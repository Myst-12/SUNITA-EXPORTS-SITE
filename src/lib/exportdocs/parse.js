import 'server-only';
import Anthropic from '@anthropic-ai/sdk';
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod';
import { z } from 'zod';
import { getAllProducts } from '@/data/products';
import { COUNTRIES } from '@/lib/forms/fields';

// Turns a pasted WhatsApp / email enquiry or quotation into form fields.
// With ANTHROPIC_API_KEY set, Claude reads the message; otherwise (or if that fails) simple rules do.

const Line = z.object({
  desc: z.string().describe('Product name in capitals, as an export invoice would write it'),
  hs: z.string().describe('HS code digits if known, else empty'),
  qty: z.string().describe('Quantity number only, else empty'),
  basis: z.enum(['MT', 'KG', 'PKG']).describe('Unit of the quantity and the rate: metric tons, kilograms or packages'),
  netPer: z.string().describe('Net kg per package if the packing says it (25 kg bag -> 25), else empty'),
  kind: z.string().describe('Package type in capitals: BAG, CTN, BOX, DRUM, PKG; else BAG'),
  packing: z.string().describe('Packing as written, e.g. 25 KG PP BAG, else empty'),
  rate: z.string().describe('Price per unit as a number (target price for an enquiry, offered price for a quotation), else empty'),
});
const Result = z.object({
  buyerName: z.string().describe('Buyer company name, else empty'),
  buyerAddress: z.string().describe('Buyer address lines, else empty'),
  contact: z.string().describe('Contact person name, else empty'),
  phone: z.string(), email: z.string(),
  destCountry: z.string().describe('Destination country in capitals, else empty'),
  pod: z.string().describe('Port of discharge in capitals, else empty'),
  pol: z.string().describe('Port of loading in capitals, else empty'),
  incoterm: z.string().describe('FOB, CFR, CIF, EXW, CNF or empty'),
  incotermPlace: z.string(),
  currency: z.string().describe('USD, EUR, GBP, AED or INR; USD if a $ price is given; else empty'),
  payment: z.string().describe('Payment terms in capitals, else empty'),
  requiredBy: z.string().describe('Required shipment/delivery date as YYYY-MM-DD if a date is given, else empty'),
  validTill: z.string().describe('Quotation validity date as YYYY-MM-DD if given, else empty'),
  notes: z.string().describe('Anything else important in one or two short lines (specifications, grades, labelling), else empty'),
  lines: z.array(Line),
});

async function withClaude(kind, text) {
  const names = getAllProducts().filter((p) => p.type !== 'fmcg').map((p) => `${p.name.replace(/\s*\(.*\)$/, '')} | HS ${String(p.hsCode || '').replace(/\./g, '')}`).join('\n');
  const client = new Anthropic();
  const today = new Date().toISOString().slice(0, 10);
  const res = await client.beta.messages.parse({
    model: 'claude-opus-5-5',
    max_tokens: 8000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'low', format: betaZodOutputFormat(Result) },
    system: `You read messages that buyers send to Sunita Agri Exports, an Indian exporter of spices, rice, pulses and groceries, and fill in the details of ${kind === 'quotation' ? 'a quotation (prices we offer)' : 'an enquiry (what the buyer asks for)'}. Use only what the message says; leave a field empty when it is not there. Today is ${today}. Where a product matches one of ours, use our name and HS code:\n${names}`,
    messages: [{ role: 'user', content: text }],
  });
  if (res.stop_reason === 'refusal' || !res.parsed_output) throw new Error('No result');
  return res.parsed_output;
}

// ---------- rules, for when Claude is not available ----------
const CATALOGUE = () => getAllProducts().filter((p) => p.type !== 'fmcg').map((p) => {
  const base = p.name.replace(/\s*\(.*\)$/, '');
  const alt = (p.name.match(/\(([^)]+)\)/) || [])[1];
  return { desc: base.toUpperCase(), hs: String(p.hsCode || '').replace(/\./g, ''), keys: [base, alt, p.slug.replace(/-/g, ' ')].filter(Boolean).map((k) => k.toLowerCase()) };
});

function withRules(text, masters = []) {
  const t = text.replace(/\r/g, '');
  const low = t.toLowerCase();
  const out = { buyerName: '', buyerAddress: '', contact: '', phone: '', email: '', destCountry: '', pod: '', pol: '', incoterm: '', incotermPlace: '', currency: '', payment: '', requiredBy: '', validTill: '', notes: '', lines: [] };
  out.email = (t.match(/[\w.+-]+@[\w-]+\.[\w.]+/) || [''])[0];
  out.phone = (t.match(/\+?\d[\d\s-]{8,}\d/) || [''])[0].trim();
  const inc = t.match(/\b(FOB|CIF|CFR|CNF|C&F|EXW|DDP)\b\s*([A-Za-z][A-Za-z .,-]{2,30})?/i);
  if (inc) { out.incoterm = inc[1].toUpperCase().replace('C&F', 'CFR'); out.incotermPlace = (inc[2] || '').split(/[,.\n]/)[0].trim().toUpperCase(); }
  if (/\$|usd|dollar/i.test(t)) out.currency = 'USD'; else if (/€|eur/i.test(t)) out.currency = 'EUR'; else if (/aed|dirham/i.test(t)) out.currency = 'AED';
  const pay = t.match(/((?:\d+\s*%\s*)?(?:advance|cad|l\/?c|lc at sight|tt|t\/t|d\/p|dp|against documents|cash against)[^\n.]*)/i);
  if (pay) out.payment = pay[1].trim().toUpperCase();
  const country = COUNTRIES.find((c) => new RegExp(`\\b${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(t));
  if (country) out.destCountry = country.toUpperCase();
  const port = masters.filter((m) => m.type === 'port').find((p) => p.name && low.includes(p.name.toLowerCase()));
  if (port) out.pod = port.name.toUpperCase();
  const co = t.split('\n').map((x) => x.trim()).find((x) => /\b(llc|l\.l\.c|ltd|limited|trading|co\.|company|est\.?|fze|fzco|gmbh|inc|pvt|sarl|plc)\b/i.test(x));
  if (co) out.buyerName = co.replace(/^(from|company|buyer)\s*[:-]\s*/i, '').toUpperCase();
  const party = masters.filter((m) => m.type === 'party').find((p) => p.name && low.includes(p.name.toLowerCase()));
  if (party) out.buyerName = party.name;

  const products = [
    ...masters.filter((m) => m.type === 'product' && m.desc).map((m) => ({ ...m, keys: [m.desc.toLowerCase()] })),
    ...CATALOGUE(),
  ];
  const seen = new Set();
  for (const row of t.split(/\n|;/)) {
    const r = row.toLowerCase();
    const p = products.filter((x) => x.keys.some((k) => k.length > 2 && r.includes(k))).sort((a, b) => Math.max(...b.keys.map((k) => (r.includes(k) ? k.length : 0))) - Math.max(...a.keys.map((k) => (r.includes(k) ? k.length : 0))))[0];
    if (!p || seen.has(p.desc)) continue;
    seen.add(p.desc);
    const q = row.match(/(\d+(?:[.,]\d+)?)\s*(mt|m\.t|tons?|tonnes?|metric|kgs?|kilos?|fcl|containers?|bags?|cartons?|ctns?|pcs)\b/i);
    const unit = (q?.[2] || '').toLowerCase();
    const per = row.match(/(\d+(?:\.\d+)?)\s*kg\s*(?:pp|jute|bag|bags|carton|ctn|box|x)/i);
    const price = row.match(/(?:\$|usd|us\$)\s*(\d+(?:[.,]\d+)?)|(\d+(?:[.,]\d+)?)\s*(?:\$|usd)/i);
    const priceUnit = (row.match(/(?:\/|per)\s*(mt|ton|kg|bag|carton|ctn|pkg)/i) || [])[1]?.toLowerCase();
    let basis = /kg|kilo/.test(unit) ? 'KG' : /bag|carton|ctn|pcs/.test(unit) ? 'PKG' : 'MT';
    let qty = q ? q[1].replace(',', '.') : '';
    if (/fcl|container/.test(unit) && qty) { qty = String(Number(qty) * (p.desc.includes('RICE') ? 25 : 18)); basis = 'MT'; }
    if (priceUnit) basis = /kg/.test(priceUnit) ? 'KG' : /mt|ton/.test(priceUnit) ? 'MT' : 'PKG';
    out.lines.push({
      desc: p.desc, hs: p.hs || '', qty, basis,
      netPer: per ? per[1] : p.netPer || '', kind: /carton|ctn/i.test(row) ? 'CTN' : p.kind || 'BAG',
      packing: per ? per[0].toUpperCase() : p.packing || '', rate: price ? (price[1] || price[2]).replace(',', '') : '',
    });
  }
  const dates = [...t.matchAll(/(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})/g)].map((m) => `${m[3].length === 2 ? `20${m[3]}` : m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`);
  if (dates[0]) { if (/valid/i.test(t)) out.validTill = dates[0]; else out.requiredBy = dates[0]; }
  return out;
}

export async function readMessage(kind, text, masters) {
  if (process.env.ANTHROPIC_API_KEY) {
    try { return { ...(await withClaude(kind, text)), by: 'ai' }; } catch (e) { console.error('Message reading with Claude failed, using rules', e?.message); }
  }
  return { ...withRules(text, masters), by: 'rules' };
}
