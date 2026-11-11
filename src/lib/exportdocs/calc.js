// Pure maths for export documents, shared by the editor (browser) and the documents (server).

export const num = (v) => {
  const n = parseFloat(String(v ?? '').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
};
const r2 = (n) => Math.round(n * 100) / 100;
const r3 = (n) => Math.round(n * 1000) / 1000;

export const BASIS = { MT: 'Per MT', KG: 'Per KG', PKG: 'Per Pkg' };

/** One product line with its weights, quantity and amount worked out. */
export function lineCalc(l) {
  // Enquiry and quotation lines may give a quantity instead of packages: work the packages out from it.
  const per = num(l.netPer), q = num(l.qty);
  const pkgs = num(l.pkgs) || (q && (l.basis || 'MT') === 'PKG' ? q : q && per ? Math.ceil(((l.basis || 'MT') === 'MT' ? q * 1000 : q) / per) : 0);
  const net = r3(pkgs * num(l.netPer));
  const gross = r3(pkgs * (num(l.grossPer) || num(l.netPer)));
  const cbm = r3(pkgs * num(l.cbmPer));
  const basis = l.basis || 'MT';
  const qty = !num(l.pkgs) && q ? q : basis === 'MT' ? r3(net / 1000) : basis === 'KG' ? net : pkgs;
  const amount = r2(num(l.rate) * qty);
  return { ...l, pkgs, net, gross, cbm, basis, qty, rate: num(l.rate), amount };
}

const same = (arr) => arr.length && arr.every((v) => v === arr[0]);
function commonHs(codes) {
  const c = codes.map((h) => String(h || '').replace(/\D/g, '')).filter(Boolean);
  if (!c.length) return '';
  if (same(c)) return codes.find(Boolean);
  let p = c[0];
  for (const x of c) while (!x.startsWith(p)) p = p.slice(0, -1);
  if (p.length >= 4) return p;
  const list = [...new Set(codes.filter(Boolean))];
  return list.length <= 4 ? list.join(', ') : 'VARIOUS';
}

/** Lines as one document shows them: each product, or merged by `group` when consolidating. */
export function docLines(lines, consolidate) {
  const calc = lines.map(lineCalc);
  if (!consolidate) return calc;
  const groups = new Map();
  for (const l of calc) {
    const key = (l.group || l.desc || '').trim().toUpperCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(l);
  }
  return [...groups.values()].map((g) => {
    if (g.length === 1) return g[0];
    const sum = (k) => g.reduce((a, l) => a + l[k], 0);
    const pkgs = sum('pkgs'), net = r3(sum('net')), gross = r3(sum('gross')), cbm = r3(sum('cbm')), amount = r2(sum('amount'));
    const basis = same(g.map((l) => l.basis)) ? g[0].basis : 'MT';
    const qty = basis === 'MT' ? r3(net / 1000) : basis === 'KG' ? net : pkgs;
    const pick = (k) => (same(g.map((l) => l[k])) ? g[0][k] : '');
    return {
      desc: (g[0].group || g[0].desc).toUpperCase(),
      note: `${g.length} items`,
      hs: commonHs(g.map((l) => l.hs)),
      origin: pick('origin'),
      packing: pick('packing') || 'ASSORTED',
      kind: pick('kind') || 'PKGS',
      netPer: pick('netPer'),
      gst: pick('gst'),
      batch: '', mfg: '', exp: '',
      pkgs, net, gross, cbm, basis, qty, amount,
      rate: qty ? r2(amount / qty) : 0,
      merged: true,
    };
  });
}

export function totals(lines) {
  const c = lines.map(lineCalc);
  const sum = (k) => c.reduce((a, l) => a + l[k], 0);
  const kinds = [...new Set(c.map((l) => (l.kind || 'PKGS').toUpperCase()))];
  return { pkgs: sum('pkgs'), net: r3(sum('net')), gross: r3(sum('gross')), cbm: r3(sum('cbm')), amount: r2(sum('amount')), kind: kinds.length === 1 ? kinds[0] : 'PKGS' };
}

/** Containers, with one container's empty fields filled from the shipment totals. */
export function containerRows(s) {
  const t = totals(s.lines || []);
  const list = (s.containers || []).filter((c) => Object.values(c).some((v) => String(v || '').trim() && v !== '20 Ft' && v !== '40 Ft'));
  if (!list.length) return [];
  if (list.length === 1) {
    const c = list[0];
    return [{ ...c, pkgs: c.pkgs || t.pkgs, gross: num(c.gross) || t.gross, net: num(c.net) || t.net }];
  }
  return list.map((c) => ({ ...c, pkgs: num(c.pkgs), gross: num(c.gross), net: num(c.net) }));
}

// ---- formatting ----
export const money = (n) => num(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const kg = (n, d = 2) => num(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
export const mt = (n) => num(n).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
export const CURRENCY = { USD: 'US$', EUR: 'EUR', GBP: 'GBP', AED: 'AED', INR: 'INR' };
const CENTS = { USD: 'CENTS', EUR: 'CENTS', GBP: 'PENCE', AED: 'FILS', INR: 'PAISE' };

/** "2026-07-07" → "07/07/2026" */
export function dmy(v) {
  const m = String(v || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : String(v || '');
}

const ONES = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
const TENS = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
function under1000(n) {
  const h = Math.floor(n / 100), r = n % 100;
  const parts = [];
  if (h) parts.push(`${ONES[h]} HUNDRED`);
  if (r) parts.push(r < 20 ? ONES[r] : `${TENS[Math.floor(r / 10)]}${r % 10 ? ` ${ONES[r % 10]}` : ''}`);
  return parts.join(' ');
}
function intWords(n) {
  if (!n) return 'ZERO';
  const scale = [[1e9, 'BILLION'], [1e6, 'MILLION'], [1e3, 'THOUSAND']];
  const out = [];
  for (const [v, w] of scale) if (n >= v) { out.push(`${under1000(Math.floor(n / v))} ${w}`); n %= v; }
  if (n) out.push(under1000(n));
  return out.join(' ');
}
/** 11440 → "US$ ELEVEN THOUSAND FOUR HUNDRED FORTY ONLY." */
export function amountWords(amount, currency = 'USD') {
  const a = r2(num(amount));
  const whole = Math.floor(a), cents = Math.round((a - whole) * 100);
  return `${CURRENCY[currency] || currency} ${intWords(whole)}${cents ? ` AND ${CENTS[currency] || 'CENTS'} ${intWords(cents)}` : ''} ONLY.`;
}

// ---- numbering: SAE/ENQ/1/26-27, SAE/QT/1/26-27, SAE/PI/EXP/69/25-26, SAE/EXP/03/26-27 ----
export function financialYear(d = new Date()) {
  const y = d.getFullYear() % 100, start = d.getMonth() >= 3 ? y : y - 1;
  return `${String(start).padStart(2, '0')}-${String(start + 1).padStart(2, '0')}`;
}
const SERIES = {
  enqNo: [/SAE\/ENQ\/(\d+)\/(\d{2}-\d{2})/, (n, fy) => `SAE/ENQ/${n}/${fy}`],
  quoteNo: [/SAE\/QT\/(\d+)\/(\d{2}-\d{2})/, (n, fy) => `SAE/QT/${n}/${fy}`],
  piNo: [/PI\/EXP\/(\d+)\/(\d{2}-\d{2})/, (n, fy) => `SAE/PI/EXP/${n}/${fy}`],
  invNo: [/^SAE\/EXP\/(\d+)\/(\d{2}-\d{2})/, (n, fy) => `SAE/EXP/${String(n).padStart(2, '0')}/${fy}`],
};
/** Next free number in each series this financial year, looking at every document of every shipment. */
export function nextNumbers(shipments, d = new Date()) {
  const fy = financialYear(d);
  const snaps = shipments.flatMap((s) => (s.docs ? Object.values(s.docs) : [s]));
  const out = {};
  for (const [key, [re, fmt]] of Object.entries(SERIES)) {
    const max = snaps.reduce((m, x) => { const r = String(x?.[key] || '').match(re); return r && r[2] === fy ? Math.max(m, Number(r[1])) : m; }, 0);
    out[key] = fmt(max + 1, fy);
  }
  return out;
}
