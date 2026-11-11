'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { saveShipmentAction } from './actions';
import DeleteShipment from './DeleteShipment';
import { DEFAULT_TERMS } from '@/lib/exportdocs/company';
import { lineCalc, totals, docLines, money, kg, mt, BASIS } from '@/lib/exportdocs/calc';
import d from './docs.module.css';

const uid = () => Math.random().toString(36).slice(2, 10);
const newLine = (p = {}) => ({ id: uid(), desc: '', group: '', hs: '', pkgs: '', kind: 'BAG', netPer: '', grossPer: '', cbmPer: '', rate: '', basis: 'MT', gst: '', origin: '', packing: '', batch: '', mfg: '', exp: '', ...p });
const CONSOLIDATE_DOCS = [['proforma', 'Proforma'], ['custom', 'Custom invoice'], ['commercial', 'Commercial invoice'], ['packing', 'Packing list']];
const KINDS = ['BAG', 'CTN', 'BOX', 'DRUM', 'PKG', 'TIN', 'BALE', 'JAR', 'PCS'];

const has = (v) => Boolean(String(v ?? '').trim());
const anyContainer = (s) => (s.containers || []).some((c) => has(c.no));
const STEPS = [
  { id: 'parties', name: 'Buyer & numbers', hint: 'Consignee, notify, invoice no.', done: (s) => has(s.consignee) && has(s.invNo) },
  { id: 'shipping', name: 'Shipping', hint: 'Ports, vessel, terms, SB & BL', done: (s) => has(s.pod) && has(s.payment) },
  { id: 'products', name: 'Products', hint: 'Lines, weights, rates, grouping', done: (s) => s.lines.length > 0 },
  { id: 'containers', name: 'Containers', hint: 'Seals, VGM, self sealing', done: anyContainer },
  { id: 'money', name: 'Freight & advance', hint: 'Insurance, advance, RoDTEP', done: (s) => has(s.freight) || has(s.insurance) || has(s.advance) },
  { id: 'bank', name: 'Bank letters', hint: 'Covering letter, BOE, disposal', done: (s) => has(s.consigneeBank) },
  { id: 'terms', name: 'Proforma terms', hint: 'Edit the conditions', done: (s) => s.terms.length > 0 },
  { id: 'cargox', name: 'CargoX (Egypt)', hint: 'Only for Egypt ACID', done: (s) => has(s.cargox?.acid) },
];

const DOC_GROUPS = [
  { name: 'Before shipment', docs: ['proforma', 'disposal'] },
  { name: 'Shipping documents', docs: ['commercial', 'custom', 'packing', 'bl', 'vgm', 'selfsealing'] },
  { name: 'For the bank', docs: ['bank', 'boe'] },
  { name: 'Other', docs: ['cargox'] },
];
// What each document needs before it is complete. Missing items show under its name.
const NEEDS = {
  proforma: [['proforma no.', (s) => has(s.piNo)], ['consignee', (s) => has(s.consignee)], ['products', (s) => s.lines.length > 0]],
  disposal: [['proforma no.', (s) => has(s.piNo)], ['amount received', (s) => has(s.disposal?.amount)], ['date received', (s) => has(s.disposal?.received)]],
  commercial: [['invoice no.', (s) => has(s.invNo)], ['consignee', (s) => has(s.consignee)], ['products', (s) => s.lines.length > 0], ['container no.', anyContainer], ['SB no.', (s) => has(s.sbNo)], ['B/L no.', (s) => has(s.blNo)]],
  custom: [['invoice no.', (s) => has(s.invNo)], ['products', (s) => s.lines.length > 0], ['container no.', anyContainer]],
  packing: [['invoice no.', (s) => has(s.invNo)], ['products', (s) => s.lines.length > 0], ['container no.', anyContainer]],
  bl: [['consignee', (s) => has(s.consignee)], ['vessel', (s) => has(s.vessel)], ['port of discharge', (s) => has(s.pod)], ['container no.', anyContainer], ['SB no.', (s) => has(s.sbNo)]],
  vgm: [['container no.', anyContainer], ['tare weight', (s) => (s.containers || []).some((c) => has(c.tare))]],
  selfsealing: [['container no.', anyContainer], ['stuffing place', (s) => has(s.seal?.at)]],
  bank: [['invoice no.', (s) => has(s.invNo)], ['B/L no.', (s) => has(s.blNo)], ['consignee bank', (s) => has(s.consigneeBank)]],
  boe: [['invoice no.', (s) => has(s.invNo)], ['B/L no.', (s) => has(s.blNo)], ['vessel', (s) => has(s.vessel)]],
  cargox: [['invoice no.', (s) => has(s.invNo)], ['ACID no.', (s) => has(s.cargox?.acid)], ['products', (s) => s.lines.length > 0]],
};

function F({ label, hint, wide, children }) {
  return <label className={`${d.f} ${wide ? d.wide : ''}`}><span>{label}{hint && <small> {hint}</small>}</span>{children}</label>;
}

const LineRow = memo(function LineRow({ l, i, onChange, onRemove, groups }) {
  const c = lineCalc(l);
  const set = (k) => (e) => onChange(i, k, e.target.value);
  return (
    <tr>
      <td className={d.n}>{i + 1}</td>
      <td><input className={d.cIn} style={{ minWidth: 220 }} value={l.desc} onChange={set('desc')} /></td>
      <td><input className={d.cIn} style={{ minWidth: 150 }} value={l.group} onChange={set('group')} list="sx-groups" /></td>
      <td><input className={d.cIn} style={{ width: 82 }} value={l.hs} onChange={set('hs')} /></td>
      <td><input className={d.cIn} style={{ width: 62 }} inputMode="decimal" value={l.pkgs} onChange={set('pkgs')} /></td>
      <td><select className={d.cIn} value={l.kind} onChange={set('kind')}>{KINDS.map((k) => <option key={k}>{k}</option>)}</select></td>
      <td><input className={d.cIn} style={{ width: 62 }} inputMode="decimal" value={l.netPer} onChange={set('netPer')} /></td>
      <td><input className={d.cIn} style={{ width: 62 }} inputMode="decimal" value={l.grossPer} onChange={set('grossPer')} placeholder={l.netPer} /></td>
      <td><input className={d.cIn} style={{ width: 70 }} inputMode="decimal" value={l.rate} onChange={set('rate')} /></td>
      <td><select className={d.cIn} value={l.basis} onChange={set('basis')}>{Object.entries(BASIS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></td>
      <td className={d.num}>{kg(c.net)}</td>
      <td className={d.num}><b>{money(c.amount)}</b></td>
      <td><input className={d.cIn} style={{ width: 120 }} value={l.packing} onChange={set('packing')} placeholder={l.netPer ? `${l.netPer} KG X 1 ${l.kind}` : ''} /></td>
      <td><input className={d.cIn} style={{ width: 52 }} inputMode="decimal" value={l.cbmPer} onChange={set('cbmPer')} /></td>
      <td><input className={d.cIn} style={{ width: 46 }} inputMode="decimal" value={l.gst} onChange={set('gst')} /></td>
      <td><input className={d.cIn} style={{ width: 90 }} value={l.origin} onChange={set('origin')} /></td>
      <td><input className={d.cIn} style={{ width: 80 }} value={l.batch} onChange={set('batch')} /></td>
      <td><input className={d.cIn} type="date" value={l.mfg} onChange={set('mfg')} /></td>
      <td><input className={d.cIn} type="date" value={l.exp} onChange={set('exp')} /></td>
      <td><button type="button" className={d.x} onClick={() => onRemove(i)} aria-label={`Remove line ${i + 1}`}>×</button></td>
    </tr>
  );
}, (a, b) => a.l === b.l && a.i === b.i && a.groups === b.groups);

export default function ShipmentEditor({ id, initial, savedAt, docs }) {
  const [s, setS] = useState(() => ({ ...initial, lines: (initial.lines || []).map((l) => ({ ...newLine(), ...l, id: l.id || uid() })) }));
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState(savedAt ? 'Saved' : '');
  const [pending, start] = useTransition();
  const [step, setStep] = useState('parties');
  const stepIdx = STEPS.findIndex((x) => x.id === step);
  const goStep = (id) => { setStep(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const ref = useRef(s); ref.current = s;

  const up = useCallback((patch) => { setS((p) => ({ ...p, ...(typeof patch === 'function' ? patch(p) : patch) })); setDirty(true); }, []);
  const bind = (k) => ({ value: s[k] ?? '', onChange: (e) => up({ [k]: e.target.value }) });
  const bindIn = (obj, k) => ({ value: s[obj]?.[k] ?? '', onChange: (e) => up((p) => ({ [obj]: { ...p[obj], [k]: e.target.value } })) });

  const save = useCallback(() => new Promise((resolve) => {
    start(async () => {
      setStatus('Saving…');
      const res = await saveShipmentAction(id, ref.current);
      if (res.ok) { setDirty(false); setStatus('Saved'); } else setStatus(res.error);
      resolve(res.ok);
    });
  }), [id]);

  useEffect(() => {
    const key = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); save(); } };
    const leave = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('keydown', key); window.addEventListener('beforeunload', leave);
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('beforeunload', leave); };
  }, [dirty, save]);

  const openDoc = async (doc) => {
    const url = `/admin/docs/${id}/${doc.slug}/`;
    if (!dirty) { if (doc.excel) window.location.href = url; else window.open(url, '_blank'); return; }
    const w = doc.excel ? null : window.open('about:blank', '_blank');
    if (await save()) { if (w) w.location.href = url; else window.location.href = url; } else w?.close();
  };

  // ---- lines ----
  const onLine = useCallback((i, k, v) => up((p) => { const lines = p.lines.slice(); lines[i] = { ...lines[i], [k]: v }; return { lines }; }), [up]);
  const onRemove = useCallback((i) => up((p) => ({ lines: p.lines.filter((_, j) => j !== i) })), [up]);
  const groups = useMemo(() => [...new Set(s.lines.map((l) => l.group).filter(Boolean))].sort(), [s.lines]);
  const t = useMemo(() => totals(s.lines), [s.lines]);

  const [q, setQ] = useState('');
  const [hits, setHits] = useState([]);
  useEffect(() => {
    if (q.trim().length < 2) { setHits([]); return; }
    const ctl = new AbortController();
    const tm = setTimeout(() => fetch(`/admin/docs/products/?q=${encodeURIComponent(q)}`, { signal: ctl.signal }).then((r) => r.json()).then((j) => setHits(j.items || [])).catch(() => {}), 200);
    return () => { clearTimeout(tm); ctl.abort(); };
  }, [q]);
  const addHit = (h) => { const { source: _, ...p } = h; up((x) => ({ lines: [...x.lines, newLine({ ...p, kind: p.kind || 'BAG', basis: p.basis || 'MT' })] })); };

  const [paste, setPaste] = useState('');
  const importPaste = () => {
    const rows = paste.split(/\r?\n/).map((r) => r.split('\t').map((c) => c.trim())).filter((r) => r[0]);
    const body = rows.length && isNaN(parseFloat(rows[0][2])) ? rows.slice(1) : rows;
    const add = body.map(([desc, hs, pkgs, netPer, rate, basis, group, grossPer, kind]) => newLine({
      desc: desc.toUpperCase(), hs: (hs || '').replace(/\./g, ''), pkgs: pkgs || '', netPer: netPer || '', rate: rate || '',
      basis: ['MT', 'KG', 'PKG'].includes((basis || '').toUpperCase()) ? basis.toUpperCase() : 'MT',
      group: (group || '').toUpperCase(), grossPer: grossPer || '', kind: (kind || 'BAG').toUpperCase(),
    }));
    up((x) => ({ lines: [...x.lines, ...add] }));
    setPaste('');
  };

  const [gText, setGText] = useState('');
  const [gName, setGName] = useState('');
  const gMatches = gText.trim() ? s.lines.filter((l) => l.desc.toLowerCase().includes(gText.trim().toLowerCase())).length : 0;
  const applyGroup = () => {
    const needle = gText.trim().toLowerCase();
    up((p) => ({ lines: p.lines.map((l) => (l.desc.toLowerCase().includes(needle) ? { ...l, group: gName.trim().toUpperCase() } : l)) }));
  };

  const preview = useMemo(() => docLines(s.lines, true).filter((l) => l.merged), [s.lines]);

  // ---- containers, receipts, terms ----
  const setArr = (key, i, k, v) => up((p) => { const a = p[key].slice(); a[i] = { ...a[i], [k]: v }; return { [key]: a }; });
  const cur = s.currency === 'USD' ? 'US$' : s.currency;

  return (
    <div className={d.wrap}>
      <div className={d.top}>
        <Link href="/admin/docs/" className={d.back}>← Shipments</Link>
        <input className={d.title} value={s.title} onChange={(e) => up({ title: e.target.value })} placeholder="Shipment name, e.g. El Dorra – chia & cardamom" />
        <span className={d.status} data-dirty={dirty || undefined}>{dirty ? 'Unsaved changes' : status}</span>
        <button type="button" className="btn btn-primary" onClick={save} disabled={pending}>Save</button>
      </div>

      <div className={d.layout}>
      <nav className={d.steps} aria-label="Shipment steps">
        {STEPS.map((x, k) => {
          const done = x.done(s);
          return (
            <button key={x.id} type="button" className={d.step} aria-current={step === x.id ? 'step' : undefined} onClick={() => goStep(x.id)}>
              <span className={d.stepNo} data-done={done || undefined}>{done ? '✓' : k + 1}</span>
              <span><b>{x.name}</b><small>{x.hint}</small></span>
            </button>
          );
        })}
      </nav>

      <div className={d.main}>

      {step === 'parties' && (
      <section className={d.panel}>
        <h2 className={d.h2}>Invoice numbers and dates</h2>
        <div className={d.grid}>
          <F label="Proforma no."><input {...bind('piNo')} /></F>
          <F label="Proforma date"><input type="date" {...bind('piDate')} /></F>
          <F label="Invoice no."><input {...bind('invNo')} /></F>
          <F label="Invoice date"><input type="date" {...bind('invDate')} /></F>
          <F label="Buyer's order no. & date"><input {...bind('buyerOrder')} /></F>
          <F label="Other ref. (proforma)"><input {...bind('otherRef')} /></F>
        </div>
      </section>
      )}

      {step === 'parties' && (
      <section className={d.panel}>
        <h2 className={d.h2}>Buyer, consignee and notify party</h2>
        <div className={d.grid}>
          <F label="Consignee" hint="first line = company name" wide><textarea rows={4} {...bind('consignee')} /></F>
          <F label="Buyer" hint="if other than consignee" wide><textarea rows={4} {...bind('buyer')} /></F>
          <F label="Notify party 1" wide><textarea rows={3} {...bind('notify1')} /></F>
          <F label="Notify party 2 (BL)" wide><textarea rows={3} {...bind('notify2')} /></F>
          <label className={d.chk}><input type="checkbox" checked={!!s.toOrder} onChange={(e) => up({ toOrder: e.target.checked })} /> Show consignee as &ldquo;TO THE ORDER OF&rdquo; on custom invoice, packing list and BL</label>
        </div>
      </section>
      )}

      {step === 'shipping' && (
      <section className={d.panel}>
        <h2 className={d.h2}>Shipping and terms</h2>
        <div className={d.grid}>
          <F label="Country of origin"><input {...bind('origin')} /></F>
          <F label="Country of final destination"><input {...bind('destCountry')} /></F>
          <F label="Pre-carriage by"><input {...bind('preCarriage')} /></F>
          <F label="Place of receipt"><input {...bind('placeReceipt')} /></F>
          <F label="Vessel / flight"><input {...bind('vessel')} /></F>
          <F label="Port of loading"><input {...bind('pol')} /></F>
          <F label="Port of discharge"><input {...bind('pod')} /></F>
          <F label="Final destination"><input {...bind('finalDest')} /></F>
          <F label="Incoterm"><select {...bind('incoterm')}>{['FOB', 'CFR', 'CIF', 'EXW', 'FCA', 'CNF', 'DDP'].map((x) => <option key={x}>{x}</option>)}</select></F>
          <F label="Incoterm place"><input {...bind('incotermPlace')} /></F>
          <F label="Currency"><select {...bind('currency')}>{['USD', 'EUR', 'GBP', 'AED', 'INR'].map((x) => <option key={x}>{x}</option>)}</select></F>
          <F label="Payment terms" wide><textarea rows={2} {...bind('payment')} placeholder="e.g. 20% ADVANCE AND BALANCE AGAINST CARGO READY PHOTOS" /></F>
          <F label="Shipping bill no."><input {...bind('sbNo')} /></F>
          <F label="Shipping bill date"><input type="date" {...bind('sbDate')} /></F>
          <F label="B/L no."><input {...bind('blNo')} /></F>
          <F label="B/L date"><input type="date" {...bind('blDate')} /></F>
          <F label="Booking no."><input {...bind('bookingNo')} /></F>
          <F label="Freight payable at"><input {...bind('freightAt')} /></F>
          <F label="No. of original BLs"><input {...bind('originalBls')} /></F>
          <F label="Shipping line (BL draft)" wide><textarea rows={2} {...bind('shippingLine')} /></F>
          <F label="Shipping marks" wide><textarea rows={2} {...bind('marks')} /></F>
        </div>
      </section>
      )}

      {step === 'products' && (
      <section className={d.panel}>
        <h2 className={d.h2}>Products</h2>
        <div className={d.addRow}>
          <div className={d.search}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the catalogue and FMCG list: cumin, chilli powder, haldiram…" />
            {hits.length > 0 && (
              <ul className={d.hits}>
                {hits.map((h, k) => (
                  <li key={k}><button type="button" onClick={() => addHit(h)}><b>{h.desc}</b><small>{[h.source, h.hs && `HS ${h.hs}`, h.group, h.packing].filter(Boolean).join(' · ')}</small></button></li>
                ))}
              </ul>
            )}
          </div>
          <button type="button" className="btn btn-outline" onClick={() => up((x) => ({ lines: [...x.lines, newLine()] }))}>Add empty line</button>
        </div>
        <details className={d.sub}>
          <summary>Paste many products from Excel</summary>
          <p className={d.help}>Copy rows from Excel with these columns in this order: <b>Description · HS code · No. of pkgs · Net kg per pkg · Rate · Rate per (MT / KG / PKG) · Group · Gross kg per pkg · Pkg kind</b>. Only the first five are needed.</p>
          <textarea rows={5} value={paste} onChange={(e) => setPaste(e.target.value)} className={d.mono} />
          <button type="button" className="btn btn-outline" onClick={importPaste} disabled={!paste.trim()}>Add these rows</button>
        </details>

        <div className={d.tableWrap}>
          <table className={d.lines}>
            <thead><tr><th>#</th><th>Description</th><th>Group (for consolidation)</th><th>HS code</th><th>Pkgs</th><th>Kind</th><th>Net kg/pkg</th><th>Gross kg/pkg</th><th>Rate {cur}</th><th>Rate per</th><th>Net kg</th><th>Amount</th><th>Packing text</th><th>CBM/pkg</th><th>GST %</th><th>Origin state</th><th>Batch</th><th>Mfg date</th><th>Exp date</th><th></th></tr></thead>
            <tbody>{s.lines.map((l, i) => <LineRow key={l.id} l={l} i={i} onChange={onLine} onRemove={onRemove} groups={groups} />)}</tbody>
            <tfoot><tr><td></td><td colSpan={3}><b>Total</b></td><td className={d.num}>{t.pkgs}</td><td></td><td></td><td></td><td></td><td></td><td className={d.num}>{kg(t.net)}</td><td className={d.num}><b>{money(t.amount)}</b></td><td colSpan={8}></td></tr></tfoot>
          </table>
          <datalist id="sx-groups">{groups.map((g) => <option key={g} value={g} />)}</datalist>
        </div>
      </section>
      )}

      {step === 'products' && (
      <section className={d.panel}>
        <h2 className={d.h2}>Consolidation</h2>
        <p className={d.help}>Products with the same <b>Group</b> print as one line (packages, weights and amounts added up; rate = average). Tick the documents that should be consolidated.</p>
        <div className={d.checks}>
          {CONSOLIDATE_DOCS.map(([k, label]) => (
            <label key={k} className={d.chk}><input type="checkbox" checked={!!s.consolidate?.[k]} onChange={(e) => up((p) => ({ consolidate: { ...p.consolidate, [k]: e.target.checked } }))} /> {label}</label>
          ))}
        </div>
        <div className={d.groupTool}>
          <span>Put every product whose description contains</span>
          <input value={gText} onChange={(e) => setGText(e.target.value)} placeholder="powder" />
          <span>into group</span>
          <input value={gName} onChange={(e) => setGName(e.target.value)} placeholder="SPICE POWDERS" list="sx-groups" />
          <button type="button" className="btn btn-outline" onClick={applyGroup} disabled={!gText.trim() || !gName.trim()}>Apply to {gMatches} products</button>
        </div>
        {preview.length > 0 && (
          <table className={d.preview}>
            <thead><tr><th>Consolidated line</th><th>Products</th><th>HS</th><th>Pkgs</th><th>Net kg</th><th>Amount</th></tr></thead>
            <tbody>{preview.map((g) => <tr key={g.desc}><td>{g.desc}</td><td>{g.note}</td><td>{g.hs}</td><td className={d.num}>{g.pkgs}</td><td className={d.num}>{kg(g.net)}</td><td className={d.num}>{money(g.amount)}</td></tr>)}</tbody>
          </table>
        )}
      </section>
      )}

      {step === 'containers' && (
      <section className={d.panel}>
        <h2 className={d.h2}>Containers</h2>
        <p className={d.help}>With one container, leave pkgs and weights empty to use the product totals.</p>
        <div className={d.tableWrap}>
          <table className={d.lines}>
            <thead><tr><th>#</th><th>Container no.</th><th>Size</th><th>Line seal</th><th>Exporter seal</th><th>Vehicle no.</th><th>Pkgs</th><th>Gross kg</th><th>Net kg</th><th>Tare kg (VGM)</th><th></th></tr></thead>
            <tbody>{s.containers.map((c, i) => (
              <tr key={i}><td className={d.n}>{i + 1}</td>
                {['no', 'size', 'lineSeal', 'exporterSeal', 'vehicle', 'pkgs', 'gross', 'net', 'tare'].map((k) => (
                  <td key={k}>{k === 'size'
                    ? <select className={d.cIn} value={c.size} onChange={(e) => setArr('containers', i, 'size', e.target.value)}>{['20 Ft', '40 Ft', '40 Ft HC', 'LCL'].map((x) => <option key={x}>{x}</option>)}</select>
                    : <input className={d.cIn} style={{ width: ['no', 'lineSeal', 'exporterSeal'].includes(k) ? 130 : 90 }} value={c[k] || ''} onChange={(e) => setArr('containers', i, k, e.target.value)} />}</td>
                ))}
                <td><button type="button" className={d.x} onClick={() => up((p) => ({ containers: p.containers.filter((_, j) => j !== i) }))} aria-label="Remove container">×</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <button type="button" className="btn btn-outline" onClick={() => up((p) => ({ containers: [...p.containers, { no: '', size: p.containers[0]?.size || '20 Ft', lineSeal: '', exporterSeal: '', vehicle: '', tare: '', pkgs: '', gross: '', net: '' }] }))}>Add container</button>
      </section>
      )}

      {step === 'money' && (
      <section className={d.panel}>
        <h2 className={d.h2}>Freight, insurance and advance</h2>
        <div className={d.grid}>
          <F label={`Freight ${cur}`}><input {...bind('freight')} /></F>
          <F label={`Insurance ${cur}`}><input {...bind('insurance')} /></F>
          <F label={`Advance received ${cur}`} hint="less on proforma"><input {...bind('advance')} /></F>
          <F label="Insurance policy no."><input {...bind('insurancePolicy')} /></F>
          <label className={d.chk}><input type="checkbox" checked={!!s.rodtep} onChange={(e) => up({ rodtep: e.target.checked })} /> Claim RoDTEP (custom invoice)</label>
          <label className={d.chk}><input type="checkbox" checked={!!s.drawback} onChange={(e) => up({ drawback: e.target.checked })} /> Under Drawback scheme (custom invoice)</label>
        </div>
      </section>
      )}

      {step === 'terms' && (
      <section className={d.panel}>
        <h2 className={d.h2}>Proforma terms and conditions</h2>
        <ol className={d.terms}>
          {s.terms.map((x, i) => (
            <li key={i}>
              <textarea rows={2} value={x} onChange={(e) => up((p) => { const terms = p.terms.slice(); terms[i] = e.target.value; return { terms }; })} />
              <button type="button" className={d.x} onClick={() => up((p) => ({ terms: p.terms.filter((_, j) => j !== i) }))} aria-label={`Remove term ${i + 1}`}>×</button>
            </li>
          ))}
        </ol>
        <div className={d.checks}>
          <button type="button" className="btn btn-outline" onClick={() => up((p) => ({ terms: [...p.terms, ''] }))}>Add term</button>
          <button type="button" className="btn btn-outline" onClick={() => up({ terms: [...DEFAULT_TERMS] })}>Reset to standard 20</button>
        </div>
      </section>
      )}

      {step === 'bank' && (
      <section className={d.panel}>
        <h2 className={d.h2}>Bank covering letter and bill of exchange</h2>
        <div className={d.grid}>
          <F label="Letter to (bank)" wide><textarea rows={2} {...bind('bankTo')} /></F>
          <F label="Consignee bank details" wide><textarea rows={5} {...bind('consigneeBank')} placeholder={'Abu Dhabi Commercial Bank\nBranch : …\nIBAN : …\nSwift Code : …'} /></F>
          <F label="Subject"><input {...bind('bankSubject')} /></F>
          <F label="Letter date"><input type="date" {...bind('bankDate')} /></F>
          <F label="LC no. and date"><input {...bind('lcNo')} /></F>
          <F label="Bill of exchange tenor"><input {...bind('boeTenor')} /></F>
          <F label="Drawee (bill of exchange)" hint="default: buyer" wide><textarea rows={3} {...bind('drawee')} /></F>
          <F label="Negotiated through bank" hint="default: consignee bank" wide><textarea rows={3} {...bind('negotiatingBank')} /></F>
        </div>
        <p className={d.help}><b>Advance receipts</b> (subtracted from the final claim amount)</p>
        {(s.receipts || []).map((r, i) => (
          <div key={i} className={d.inline}>
            <input placeholder="Bank ref. no." value={r.ref} onChange={(e) => setArr('receipts', i, 'ref', e.target.value)} />
            <input type="date" value={r.date} onChange={(e) => setArr('receipts', i, 'date', e.target.value)} />
            <input placeholder={`Amount ${cur}`} value={r.amount} onChange={(e) => setArr('receipts', i, 'amount', e.target.value)} />
            <button type="button" className={d.x} onClick={() => up((p) => ({ receipts: p.receipts.filter((_, j) => j !== i) }))} aria-label="Remove receipt">×</button>
          </div>
        ))}
        <button type="button" className="btn btn-outline" onClick={() => up((p) => ({ receipts: [...(p.receipts || []), { ref: '', date: '', amount: '' }] }))}>Add advance receipt</button>
      </section>
      )}

      {step === 'bank' && (
      <section className={d.panel}>
        <h2 className={d.h2}>Bank disposal (advance payment received)</h2>
        <div className={d.grid}>
          <F label="Letter date"><input type="date" {...bindIn('disposal', 'date')} /></F>
          <F label={`Amount received ${cur}`}><input {...bindIn('disposal', 'amount')} /></F>
          <F label="Received on"><input type="date" {...bindIn('disposal', 'received')} /></F>
          <F label="Remitter / importer" hint="default: consignee"><input {...bindIn('disposal', 'remitter')} /></F>
          <F label="Forward to branch"><input {...bindIn('disposal', 'isb')} /></F>
          <F label="Purpose" hint="default: advance against this proforma" wide><input {...bindIn('disposal', 'purpose')} /></F>
        </div>
      </section>
      )}

      {step === 'containers' && (
      <section className={d.panel}>
        <h2 className={d.h2}>VGM and self sealing</h2>
        <div className={d.grid}>
          <F label="Authorised name"><input {...bindIn('vgm', 'name')} /></F>
          <F label="Designation"><input {...bindIn('vgm', 'designation')} /></F>
          <F label="24×7 mobile"><input {...bindIn('vgm', 'mobile')} /></F>
          <F label="Max weight (CSC plate)"><input {...bindIn('vgm', 'cscMax')} /></F>
          <F label="Weighbridge reg. no. & address" wide><textarea rows={2} {...bindIn('vgm', 'weighbridge')} /></F>
          <F label="Date and time of weighing"><input {...bindIn('vgm', 'weighTime')} /></F>
          <F label="Weighing slip no."><input {...bindIn('vgm', 'slipNo')} /></F>
          <F label="Cargo type"><input {...bindIn('vgm', 'type')} /></F>
          <F label="Hazardous UN no. / IMDG class"><input {...bindIn('vgm', 'hazard')} /></F>
          <F label="VGM date"><input type="date" {...bindIn('vgm', 'date')} /></F>
          <F label="Container stuffing place" wide><textarea rows={3} {...bindIn('seal', 'at')} /></F>
          <F label="Self sealing place"><input {...bindIn('seal', 'place')} /></F>
          <F label="Self sealing date"><input type="date" {...bindIn('seal', 'date')} /></F>
        </div>
      </section>
      )}

      {step === 'cargox' && (
      <section className={d.panel}>
        <h2 className={d.h2}>CargoX (Egypt ACID)</h2>
        <div className={d.grid}>
          <F label="Importer contact"><input {...bindIn('cargox', 'contact')} /></F>
          <F label="Importer email"><input {...bindIn('cargox', 'email')} /></F>
          <F label="Importer phone"><input {...bindIn('cargox', 'phone')} /></F>
          <F label="Tax code"><input {...bindIn('cargox', 'taxCode')} /></F>
          <F label="ACID no."><input {...bindIn('cargox', 'acid')} /></F>
          <F label="Brand"><input {...bindIn('cargox', 'brand')} /></F>
          <F label="Origin port code" hint="INNSA, INMUN…"><input {...bindIn('cargox', 'polCode')} /></F>
          <F label="Destination port code" hint="EGSOK…"><input {...bindIn('cargox', 'podCode')} /></F>
        </div>
      </section>
      )}

      <div className={d.stepNav}>
        {stepIdx > 0 ? <button type="button" className="btn btn-outline" onClick={() => goStep(STEPS[stepIdx - 1].id)}>← {STEPS[stepIdx - 1].name}</button> : <span />}
        {stepIdx < STEPS.length - 1 && <button type="button" className="btn btn-primary" onClick={() => goStep(STEPS[stepIdx + 1].id)}>Next: {STEPS[stepIdx + 1].name} →</button>}
      </div>
      </div>

      <aside className={d.side} aria-label="Documents">
        <div className={d.card}>
          <h2 className={d.sideH}>Shipment total</h2>
          <p className={d.big}>{cur} {money(t.amount)}</p>
          <dl className={d.kv}>
            <dt>Products</dt><dd>{s.lines.length}</dd>
            <dt>Packages</dt><dd>{t.pkgs} {t.kind}</dd>
            <dt>Net weight</dt><dd>{kg(t.net)} kg</dd>
            <dt>Gross weight</dt><dd>{kg(t.gross)} kg</dd>
            {t.cbm > 0 && <><dt>Volume</dt><dd>{mt(t.cbm)} CBM</dd></>}
          </dl>
        </div>
        {DOC_GROUPS.map((g) => (
          <div key={g.name} className={d.card}>
            <h2 className={d.sideH}>{g.name}</h2>
            <ul className={d.docList}>
              {g.docs.map((slug) => {
                const doc = docs.find((x) => x.slug === slug);
                if (!doc) return null;
                const missing = (NEEDS[slug] || []).filter(([, ok]) => !ok(s)).map(([n]) => n);
                return (
                  <li key={slug}>
                    <button type="button" className={d.docBtn} onClick={() => openDoc(doc)}>
                      <span className={d.dot} data-ready={!missing.length || undefined} aria-hidden="true" />
                      <span className={d.docName}>{doc.name.replace(' (Excel)', '')}<small>{missing.length ? `Needs ${missing.join(', ')}` : doc.excel ? 'Ready · downloads Excel' : 'Ready to print'}</small></span>
                      <span className={d.open} aria-hidden="true">{doc.excel ? '↓' : '↗'}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>
      </div>

      <div className={d.del}><DeleteShipment id={id} label={s.title || s.invNo || s.piNo || 'this shipment'}>Delete shipment</DeleteShipment></div>
    </div>
  );
}
