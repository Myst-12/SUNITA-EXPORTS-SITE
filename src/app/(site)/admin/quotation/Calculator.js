'use client';

import { useEffect, useState, useTransition } from 'react';
import { TABS, TAB } from '@/lib/costing/heads';
import { addOptionAction, removeOptionAction } from './actions';
import a from '../admin.module.css';
import s from './quotation.module.css';

const inr = (n) => { const d = Number.isInteger(Math.round(n * 100) / 100) ? 0 : 2; return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d })}`; };
const usd = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const num = (v) => (v === '' || v == null || !Number.isFinite(Number(v)) ? null : Number(v));
const norm = (t) => t.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ').trim();

// The dollar rate and insurance % are kept in this browser between quotes (a convenience; not shared).
function useRemembered(key) {
  const [v, setV] = useState('');
  useEffect(() => { try { const saved = localStorage.getItem(key); if (saved) setV(saved); } catch {} }, [key]); // eslint-disable-line react-hooks/set-state-in-effect
  return [v, (x) => { setV(x); try { localStorage.setItem(key, x); } catch {} }];
}

const qtyText = (n) => n.toLocaleString('en-IN', { maximumFractionDigits: 3 });

// Everything is worked out for one carton (one bag in Bulk), like the client's price lists: a box's quantity
// comes from its unit and the packing (per kg → kg in a carton, per label → pieces × labels per piece, per
// container → shared over the cartons). Typing a quantity in a box overrides it.
function autoQty(unit, pack) {
  const u = unit.toLowerCase();
  if (/per kg/.test(u)) return pack.kg;
  if (/per label/.test(u)) return pack.labels;
  if (/per (pouch|packet|tin|jar|piece)/.test(u)) return pack.pieces;
  if (/container|thc/.test(u)) return pack.cartons ? 1 / pack.cartons : null;
  return 1; // per carton, per bag, per gajjat, per box
}

/** "₹5 × 20 = ₹100", or "₹1,200 ÷ 30 = ₹40" for a per-container cost shared over the cartons. */
function line(rate, qty) {
  if (qty === 1) return inr(rate);
  if (qty < 1 && Number.isInteger(Math.round(1 / qty * 1e6) / 1e6)) return `${inr(rate)} ÷ ${qtyText(1 / qty)} = ${inr(rate * qty)}`;
  return `${inr(rate)} × ${qtyText(qty)} = ${inr(rate * qty)}`;
}

function Qty({ value, onChange, label, auto }) {
  return (
    <label className={s.qty}>
      <span aria-hidden="true">×</span>
      <input type="number" inputMode="decimal" min="0" step="any" placeholder={auto != null ? qtyText(auto) : '1'} value={value} onChange={(e) => onChange(e.target.value)} aria-label={label} />
    </label>
  );
}

/** One cost row: pick a saved option (or add one); its amount × the quantity for one carton shows below. */
function CostBox({ tab, head, options, pick, onPick, onOptions, auto }) {
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [busy, start] = useTransition();
  const chosen = options.find((o) => o.id === pick.id);
  const qty = num(pick.qty) ?? auto ?? 1;

  const save = () => start(async () => {
    const r = await addOptionAction(tab, head.key, label, amount);
    if (r.error) return setError(r.error);
    onOptions(r.options);
    onPick({ ...pick, id: r.added });
    setAdding(false); setLabel(''); setAmount(''); setError('');
  });
  const remove = () => {
    if (!chosen || !window.confirm(`Remove the saved option "${chosen.label}" from ${head.name}?`)) return;
    start(async () => {
      const r = await removeOptionAction(tab, head.key, chosen.id);
      if (r.error) return setError(r.error);
      onOptions(r.options);
      onPick({ ...pick, id: '' });
    });
  };

  return (
    <div className={s.step}>
      <button type="button" className={s.add} onClick={() => setAdding((x) => !x)} aria-expanded={adding}>{adding ? 'Cancel' : 'Add +'}</button>
      <div className={`${s.box} ${chosen ? s.boxSet : ''}`}>
        <b className={s.boxTitle}>{head.name}</b>
        <span className={s.unit}>{head.unit}</span>
        {adding ? (
          <div className={s.addForm}>
            <input className={s.small} placeholder="Name, e.g. 500 × 1000" value={label} onChange={(e) => setLabel(e.target.value)} aria-label={`${head.name}: option name`} />
            <input className={s.small} type="number" inputMode="decimal" min="0" step="any" placeholder="₹ amount" value={amount} onChange={(e) => setAmount(e.target.value)} aria-label={`${head.name}: amount in rupees`} />
            <button type="button" className={`btn btn-primary ${s.saveBtn}`} onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
          </div>
        ) : (
          <>
            <select className={s.small} value={pick.id} onChange={(e) => onPick({ ...pick, id: e.target.value })} aria-label={head.name}>
              <option value="">{options.length ? 'Choose…' : 'Use Add + first'}</option>
              {options.map((o) => <option key={o.id} value={o.id}>{o.label}: {inr(o.amount)}</option>)}
            </select>
            {chosen && (
              <div className={s.boxFoot}>
                <Qty value={pick.qty} onChange={(v) => onPick({ ...pick, qty: v })} label={`${head.name}: quantity per carton`} auto={auto} />
                <button type="button" className={s.remove} onClick={remove} disabled={busy}>Remove</button>
              </div>
            )}
          </>
        )}
        {error && <p className={a.err}>{error}</p>}
      </div>
      <p className={s.price}>{chosen ? line(chosen.amount, qty) : '—'}</p>
    </div>
  );
}

const Op = ({ children }) => <span className={s.op} aria-hidden="true">{children}</span>;

/** Search a product, pick Consumer / Bulk / FMCG, fill the cost boxes, and read the final price. */
export default function Calculator({ products, saved }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState('');
  const [tabKey, setTabKey] = useState('consumer');
  const [options, setOptions] = useState(saved);
  const [picks, setPicks] = useState({});
  const [buy, setBuy] = useState('');
  const [buyUnit, setBuyUnit] = useState('kg');
  const [buyQty, setBuyQty] = useState('');
  const [packIn, setPackIn] = useState({ size: '', sizeUnit: 'g', pieces: '', labels: '', cartons: '' });
  const [profit, setProfit] = useState('');
  const [insurance, setInsurance] = useRemembered('quote-insurance');
  const [rate, setRate] = useRemembered('quote-usd');

  const product = products.find((p) => p.slug === slug);
  const allowed = product ? product.tabs : TABS.map((t) => t.key);
  const tab = TAB[tabKey];
  const words = norm(query).split(' ').filter(Boolean);
  const matches = words.length && !product ? products.filter((p) => words.every((w) => p.hay.includes(` ${w}`))).slice(0, 8) : [];

  const choose = (p) => {
    setSlug(p.slug); setQuery(p.name); setOpen(false);
    if (!p.tabs.includes(tabKey)) switchTab(p.tabs[0]);
  };
  function switchTab(k) { setTabKey(k); setPicks({}); setBuyUnit(k === 'fmcg' ? 'piece' : 'kg'); }
  const setPack = (k) => (e) => setPackIn((x) => ({ ...x, [k]: e.target.value }));

  // One carton (one bag in Bulk): its kg, pieces and labels, and how many cartons share the container costs.
  const bulk = tabKey === 'bulk';
  const pieces = bulk ? 1 : num(packIn.pieces);
  const size = num(packIn.size);
  const pack = {
    pieces,
    kg: size == null ? null : bulk ? size : pieces == null ? null : (size * pieces) / (packIn.sizeUnit === 'g' ? 1000 : 1),
    labels: pieces == null ? null : pieces * (num(packIn.labels) ?? 1),
    cartons: num(packIn.cartons),
  };
  const per = bulk ? 'bag' : 'carton';

  const rowsOf = (h) => options[tabKey]?.[h.key] || [];
  const amountOf = (h) => {
    const p = picks[h.key];
    const o = p && rowsOf(h).find((x) => x.id === p.id);
    return o ? o.amount * (num(p.qty) ?? autoQty(h.unit, pack) ?? 1) : 0;
  };
  const buyAuto = buyUnit === 'kg' ? pack.kg : buyUnit === 'piece' ? pack.pieces : 1;
  const productQty = num(buyQty) ?? buyAuto ?? 1;
  const productAmount = (num(buy) ?? 0) * productQty;
  const costs = productAmount + tab.heads.filter((h) => !h.freight).reduce((t, h) => t + amountOf(h), 0);
  const profitAmount = (costs * (num(profit) ?? 0)) / 100;
  const fob = costs + profitAmount;
  const freight = tab.heads.filter((h) => h.freight).reduce((t, h) => t + amountOf(h), 0);
  const cfr = fob + freight;
  const insuranceAmount = (cfr * (num(insurance) ?? 0)) / 100;
  const cif = cfr + insuranceAmount;
  const fx = num(rate);
  const both = (n) => (fx ? <>{usd(n / fx)} <small>{inr(n)}</small></> : inr(n));

  const box = (h) => (
    <CostBox
      tab={tabKey}
      head={h}
      options={rowsOf(h)}
      pick={picks[h.key] || { id: '', qty: '' }}
      onPick={(p) => setPicks((x) => ({ ...x, [h.key]: p }))}
      onOptions={(list) => setOptions((x) => ({ ...x, [tabKey]: { ...x[tabKey], [h.key]: list } }))}
      auto={autoQty(h.unit, pack)}
    />
  );
  const pct = (title, unit, value, set, amountNow) => (
    <div className={s.step}>
      <div className={`${s.box} ${num(value) ? s.boxSet : ''}`}>
        <b className={s.boxTitle}>{title}</b>
        <span className={s.unit}>{unit}</span>
        <input className={s.small} type="number" inputMode="decimal" min="0" step="any" placeholder="%" value={value} onChange={(e) => set(e.target.value)} aria-label={`${title} %`} />
      </div>
      <p className={s.price}>{num(value) ? `${num(value)}% = ${inr(amountNow)}` : '—'}</p>
    </div>
  );

  return (
    <div className={s.calc}>
      <fieldset className={s.types}>
        <legend className={s.srOnly}>Packing type</legend>
        {TABS.map((t) => (
          <label key={t.key} className={s.type}>
            <input type="radio" name="type" value={t.key} checked={tabKey === t.key} disabled={!allowed.includes(t.key)} onChange={() => switchTab(t.key)} />
            <span>{t.name}</span>
          </label>
        ))}
      </fieldset>

      <div className={s.packing}>
        <b className={s.boxTitle}>Packing, one {per}</b>
        <div className={s.packRow}>
          <label className={s.packField}>
            <span>{bulk ? 'Bag size (kg)' : 'Pack size'}</span>
            <span className={s.withUnit}>
              <input className={s.small} type="number" inputMode="decimal" min="0" step="any" placeholder={bulk ? '25' : '500'} value={packIn.size} onChange={setPack('size')} />
              {!bulk && (
                <select className={s.small} value={packIn.sizeUnit} onChange={setPack('sizeUnit')} aria-label="Pack size unit">
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                </select>
              )}
            </span>
          </label>
          {!bulk && (
            <>
              <label className={s.packField}><span>Pieces per carton</span><input className={s.small} type="number" inputMode="numeric" min="0" step="1" placeholder="20" value={packIn.pieces} onChange={setPack('pieces')} /></label>
              <label className={s.packField}><span>Labels per piece</span><input className={s.small} type="number" inputMode="numeric" min="0" step="1" placeholder="1" value={packIn.labels} onChange={setPack('labels')} /></label>
            </>
          )}
          <label className={s.packField}><span>Number of {per}s</span><input className={s.small} type="number" inputMode="numeric" min="0" step="1" placeholder={bulk ? '1080' : '600'} value={packIn.cartons} onChange={setPack('cartons')} /></label>
        </div>
        <p className={s.unit}>
          {pack.kg != null ? `One ${per}: ${qtyText(pack.kg)} kg` : `Fill the packing and each box works out its quantity for one ${per}.`}
          {pack.kg != null && !bulk && pieces != null && ` · ${qtyText(pieces)} pieces · ${qtyText(pack.labels)} labels`}
          {pack.kg != null && (pack.cartons ? ` · container costs shared over ${qtyText(pack.cartons)} ${per}s` : ` · add the number of ${per}s to share container costs`)}
        </p>
      </div>

      <div className={s.chain}>
        <div className={`${s.step} ${s.search}`}>
          <div className={`${s.box} ${product ? s.boxSet : ''}`}>
            <label className={s.boxTitle} htmlFor="q">Search product</label>
            <input
              id="q" className={s.small} autoComplete="off" placeholder="e.g. turmeric, basmati, namkeen"
              value={query} role="combobox" aria-expanded={open && matches.length > 0} aria-controls="q-list"
              onChange={(e) => { setQuery(e.target.value); setSlug(''); setOpen(true); }} onFocus={() => setOpen(true)}
            />
            {open && matches.length > 0 && (
              <ul id="q-list" className={s.matches} role="listbox">
                {matches.map((p) => (
                  <li key={p.slug} role="option" aria-selected="false">
                    <button type="button" onClick={() => choose(p)}>{p.name}<small>{p.cat}</small></button>
                  </li>
                ))}
              </ul>
            )}
            {open && words.length > 0 && !product && !matches.length && <span className={s.unit}>No product matches that.</span>}
          </div>
          <p className={s.price}>{product ? (product.tabs[0] === 'fmcg' ? 'FMCG product' : product.cat) : ''}</p>
        </div>

        <div className={s.step}>
          <div className={`${s.box} ${productAmount ? s.boxSet : ''}`}>
            <b className={s.boxTitle}>Product price</b>
            <span className={s.unit}>Today&apos;s buying price</span>
            <input className={s.small} type="number" inputMode="decimal" min="0" step="any" placeholder="₹" value={buy} onChange={(e) => setBuy(e.target.value)} aria-label="Product price in rupees" />
            <select className={s.small} value={buyUnit} onChange={(e) => setBuyUnit(e.target.value)} aria-label="Price is per">
              <option value="kg">₹ per kg</option>
              {!bulk && <option value="piece">₹ per piece</option>}
              <option value="carton">₹ per {per}</option>
            </select>
            <div className={s.boxFoot}><Qty value={buyQty} onChange={setBuyQty} label="Product quantity per carton" auto={buyAuto} /></div>
          </div>
          <p className={s.price}>{num(buy) != null ? line(num(buy), productQty) : '—'}</p>
        </div>

        {tab.heads.filter((h) => !h.freight).map((h) => <div key={`${tabKey}-${h.key}`} className={s.pair}><Op>+</Op>{box(h)}</div>)}
        <div className={s.pair}><Op>+</Op>{pct('Profit', '% added on all costs above', profit, setProfit, profitAmount)}</div>
        {tab.heads.filter((h) => h.freight).map((h) => <div key={`${tabKey}-${h.key}`} className={s.pair}><Op>+</Op>{box(h)}</div>)}
        <div className={s.pair}><Op>+</Op>{pct('Insurance', '% of the CFR price, for CIF', insurance, setInsurance, insuranceAmount)}</div>

        <div className={s.pair}>
          <Op>=</Op>
          <div className={s.step}>
            <div className={`${s.box} ${s.final}`}>
              <b className={s.boxTitle}>Final price (CIF), per {per}</b>
              <strong className={s.total}>{fx ? usd(cif / fx) : inr(cif)}</strong>
              {fx && <span className={s.unit}>{inr(cif)}</span>}
              <dl className={s.breakdown}>
                <div><dt>FOB</dt><dd>{both(fob)}</dd></div>
                <div><dt>CFR</dt><dd>{both(cfr)}</dd></div>
                {pack.kg ? <div><dt>CIF per kg</dt><dd>{both(cif / pack.kg)}</dd></div> : null}
                {pack.cartons ? <div className={s.grand}><dt>× {qtyText(pack.cartons)} {per}s</dt><dd>{both(cif * pack.cartons)}</dd></div> : null}
              </dl>
              <label className={s.rate}>
                <span>₹ per 1 USD</span>
                <input className={s.small} type="number" inputMode="decimal" min="0" step="any" placeholder="e.g. 84" value={rate} onChange={(e) => setRate(e.target.value)} />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
