import { TAB } from './heads';

// Works out one container of a product in one packing, from the uploaded costing sheet and the buying price
// typed in for this quote (it changes daily). Profit is a markup on the FOB cost; freight and insurance are
// passed on at cost. CFR = FOB + freight. CIF = CFR + insurance (a % of the CFR value).

const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null);

/** How many of each `per` unit go into one container of this packing. */
function counts(tab, p) {
  const n = num(p.perContainer);
  if (tab === 'bulk') return { container: 1, bag: n, kg: n != null && num(p.bagKg) != null ? n * p.bagKg : null };
  const packs = n != null && num(p.packsPerCarton) != null ? n * p.packsPerCarton : null;
  if (tab === 'consumer') {
    const kg = packs != null && num(p.packG) != null ? (packs * p.packG) / 1000 : null;
    return { container: 1, carton: n, pack: packs, kg, rawBag: kg != null && num(p.rawBagKg) ? kg / p.rawBagKg : null };
  }
  const per = (k) => (n != null ? n * (num(p[k]) ?? 0) : null); // no gajjats or boxes in a carton → none to pay for
  return { container: 1, carton: n, pack: packs, gajjat: per('gajjatsPerCarton'), box: per('boxesPerCarton'), kg: n != null && num(p.cartonKg) ? n * p.cartonKg : null };
}

/** The size a slab rate is chosen by (see `by` in heads.js). */
function measure(tab, by, p) {
  if (by === 'container') return /40/.test(p.container || '') ? 40 : /20/.test(p.container || '') ? 20 : null;
  if (by === 'cartonKg' && tab === 'consumer') return num(p.packG) != null && num(p.packsPerCarton) != null ? (p.packG * p.packsPerCarton) / 1000 : null;
  return num(p[by]);
}

export function quote(costing, tabKey, packingId, buyPrice, profitPct) {
  const tab = TAB[tabKey];
  const packing = costing.packings?.[tabKey]?.find((p) => p.id === packingId);
  if (!tab || !packing) return null;
  const c = counts(tabKey, packing);
  const rates = costing.rates?.[tabKey] || {};
  const missing = [];
  const lines = [];

  const add = (name, unit, rate, per, freight = false, why = null) => {
    const qty = c[per];
    if (qty === 0) return; // e.g. no gajjats in this packing
    const ok = num(rate) != null && qty != null;
    if (!ok) missing.push(why || (qty == null ? `${name} (packing size missing)` : name));
    lines.push({ name, unit, rate: num(rate), qty, amount: ok ? rate * qty : null, freight });
  };

  const buyUnit = tab.priceUnit;
  const price = buyPrice === '' || buyPrice == null ? null : Number(buyPrice);
  add('Product (buying price)', `Per ${buyUnit}`, Number.isFinite(price) ? price : null, buyUnit, false, `today's buying price per ${buyUnit}`);
  for (const h of tab.heads) {
    if (h.optional && !packing[h.key]) continue;
    if (!h.slabs) { add(h.name, h.unit, rates[h.key], h.per, h.freight); continue; }
    const m = measure(tabKey, h.by, packing);
    const slab = m == null ? null : h.slabs.find((s) => m <= s.upTo);
    if (slab) add(`${h.name} (${slab.name})`, h.unit, rates[slab.key], h.per, h.freight);
    else add(h.name, h.unit, null, h.per, h.freight, m == null ? `${h.name} (${h.by === 'container' ? 'container size' : 'packing size'} missing)` : `${h.name} (no rate for this size)`);
  }

  const sum = (ls) => ls.reduce((a, l) => a + (l.amount || 0), 0);
  const fobCost = sum(lines.filter((l) => !l.freight));
  const profit = (fobCost * (Number(profitPct) || 0)) / 100;
  const fob = fobCost + profit;
  const freight = sum(lines.filter((l) => l.freight));
  const cfr = fob + freight;
  const insPct = num(costing.settings?.insurancePct);
  const cif = insPct != null ? cfr * (1 + insPct / 100) : null;
  const usdRate = num(costing.settings?.usdRate);

  return {
    packing, counts: c, lines, missing,
    fobCost, profit, freight, cfr, fob, cif, insPct, usdRate,
    // What one container is divided by for "per kg", "per bag", "per carton", "per pack".
    units: [
      ['kg', c.kg],
      ...(tabKey === 'bulk' ? [['bag', c.bag]] : [['carton', c.carton], ['pack', c.pack]]),
    ].filter(([, n]) => n),
  };
}
