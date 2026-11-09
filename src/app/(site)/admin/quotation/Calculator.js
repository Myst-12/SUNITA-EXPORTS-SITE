'use client';

import { useState } from 'react';
import { TABS } from '@/lib/costing/heads';
import { quote } from '@/lib/costing/calc';
import a from '../admin.module.css';
import s from './quotation.module.css';

const inr = (n) => { const d = Number.isInteger(Math.round(n * 100) / 100) ? 0 : 2; return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d })}`; };
// Small per-kg prices need the third decimal ($1.235/kg); container totals do not.
const usd = (n) => { const d = Math.abs(n) < 10 ? 3 : 2; return `$${n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}`; };
const qty = (n) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
const PER = { kg: 'kg', bag: 'bag', carton: 'carton', pack: 'pack' };

/** Product + packing + today's buying price + profit % → FOB, CFR and CIF prices in USD, with the full cost list in ₹. */
export default function Calculator({ costing, products }) {
  const [slug, setSlug] = useState('');
  const [packingKey, setPackingKey] = useState('');
  const [buy, setBuy] = useState('');
  const [profit, setProfit] = useState('');

  const product = products.find((p) => p.slug === slug);
  const packings = product ? TABS.filter((t) => product.tabs.includes(t.key)).map((t) => ({ tab: t, list: costing.packings?.[t.key] || [] })) : [];
  const [tabKey, packingId] = packingKey.split('|');
  const buyUnit = TABS.find((t) => t.key === (tabKey || product?.tabs[0]))?.priceUnit || 'kg';
  const q = product && packingId && buy !== '' ? quote(costing, tabKey, packingId, buy, profit) : null;

  const groups = [];
  for (const p of products) {
    const g = groups.at(-1);
    if (g?.cat === p.cat) g.items.push(p); else groups.push({ cat: p.cat, items: [p] });
  }

  const price = (rs, n = 1) => (q.usdRate ? usd(rs / n / q.usdRate) : inr(rs / n));
  const rows = q && [
    { name: 'FOB', rs: q.fob },
    { name: 'CFR', rs: q.cfr, note: q.freight ? null : 'no freight in the sheet' },
    { name: 'CIF', rs: q.cif, note: q.cif == null ? 'insurance % not in the sheet' : null },
  ];

  return (
    <div className={s.calc}>
      <div className={`${a.card} ${s.pick}`}>
        <label className={s.field}>
          <span className={a.label}>Product</span>
          <select className={a.input} value={slug} onChange={(e) => { setSlug(e.target.value); setPackingKey(''); }}>
            <option value="">Choose a product</option>
            {groups.map((g) => (
              <optgroup key={g.cat} label={g.cat}>
                {g.items.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
              </optgroup>
            ))}
          </select>
        </label>
        <label className={s.field}>
          <span className={a.label}>Packing</span>
          <select className={a.input} value={packingKey} onChange={(e) => setPackingKey(e.target.value)} disabled={!product}>
            <option value="">{product ? 'Choose a packing' : 'Choose a product first'}</option>
            {packings.map(({ tab, list }) => (
              <optgroup key={tab.key} label={list.length ? tab.name : `${tab.name} (none in the sheet yet)`}>
                {list.map((p) => <option key={p.id} value={`${tab.key}|${p.id}`}>{p.name}{p.container ? ` · ${p.container}` : ''}</option>)}
              </optgroup>
            ))}
          </select>
        </label>
        <label className={s.field}>
          <span className={a.label}>Buying price today <span className={a.hint}>(₹ per {buyUnit})</span></span>
          <input className={a.input} type="number" inputMode="decimal" min="0" step="any" placeholder="₹" value={buy} onChange={(e) => setBuy(e.target.value)} />
        </label>
        <label className={s.field}>
          <span className={a.label}>Profit %</span>
          <input className={a.input} type="number" inputMode="decimal" min="0" step="0.5" placeholder="0" value={profit} onChange={(e) => setProfit(e.target.value)} />
        </label>
      </div>

      {!q ? (
        <p className={a.empty}>{!product ? 'Choose a product, its packing, today\'s buying price and your profit to see FOB, CFR and CIF prices.' : !packingId ? 'Choose a packing to see the price.' : `Type today's buying price per ${buyUnit} to see the price.`}</p>
      ) : (
        <>
          {q.missing.length > 0 && (
            <p className={a.warn}>
              <b>Not complete: {q.missing.length} {q.missing.length === 1 ? 'figure is' : 'figures are'} missing from the costing sheet</b>, so these prices are too low: {q.missing.join(', ')}.
            </p>
          )}
          {!q.usdRate && <p className={a.warn}>The dollar rate is not in the sheet (Settings tab), so prices are shown in rupees.</p>}

          <div className={`${a.card} ${s.result}`}>
            <p className={s.load}>
              One {q.packing.container || ''} container of <b>{product.name}</b> in {q.packing.name}:{' '}
              {q.units.map(([u, n]) => `${qty(n)} ${PER[u]}${n === 1 || u === 'kg' ? '' : 's'}`).join(' · ') || 'packing sizes missing'}
            </p>
            <div className={a.tableWrap}>
              <table className={`${a.table} ${s.prices}`}>
                <thead>
                  <tr>
                    <th scope="col">Price{q.usdRate ? ' (USD)' : ' (₹)'}</th>
                    <th scope="col">Per container</th>
                    {q.units.map(([u]) => <th scope="col" key={u}>Per {PER[u]}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.name}>
                      <th scope="row">{r.name}</th>
                      {r.rs == null ? (
                        <td colSpan={1 + q.units.length} className={s.muted}>{r.note}</td>
                      ) : (
                        <>
                          <td><b>{price(r.rs)}</b>{r.note && <small>{r.note}</small>}</td>
                          {q.units.map(([u, n]) => <td key={u}>{price(r.rs, n)}</td>)}
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {q.usdRate && <p className={s.muted}>At ₹{q.usdRate} per USD. Profit is added on the FOB cost; freight{q.insPct != null ? ` and insurance (${q.insPct}%)` : ''} at cost.</p>}
          </div>

          <div className={`${a.card} ${s.result}`}>
            <h2 className={a.h2}>Cost for one container</h2>
            <div className={a.tableWrap}>
              <table className={`${a.table} ${s.lines}`}>
                <thead>
                  <tr><th scope="col">Cost</th><th scope="col">Amount</th></tr>
                </thead>
                <tbody>
                  {q.lines.filter((l) => !l.freight).map((l) => (
                    <tr key={l.name} className={l.amount == null ? s.missingRow : undefined}>
                      <td>
                        {l.name}
                        <small>{l.rate != null ? `${inr(l.rate)} ${l.unit.toLowerCase().replace(/ \(.*/, '')}` : 'Amount missing'} × {l.qty != null ? qty(l.qty) : 'packing size missing'}</small>
                      </td>
                      <td>{l.amount != null ? inr(l.amount) : '—'}</td>
                    </tr>
                  ))}
                  <tr className={s.total}><td>FOB cost</td><td>{inr(q.fobCost)}</td></tr>
                  <tr><td>Profit {Number(profit) || 0}%</td><td>{inr(q.profit)}</td></tr>
                  <tr className={s.total}><td>FOB price</td><td>{inr(q.fob)}</td></tr>
                  <tr><td>Freight</td><td>{q.freight ? inr(q.freight) : '—'}</td></tr>
                  <tr className={s.total}><td>CFR price</td><td>{inr(q.cfr)}</td></tr>
                  <tr><td>Insurance{q.insPct != null ? ` ${q.insPct}%` : ''}</td><td>{q.cif != null ? inr(q.cif - q.cfr) : '—'}</td></tr>
                  <tr className={s.total}><td>CIF price</td><td>{q.cif != null ? inr(q.cif) : '—'}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
