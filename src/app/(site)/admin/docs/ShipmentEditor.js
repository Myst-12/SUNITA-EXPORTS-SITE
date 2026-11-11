'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { saveShipmentAction } from './actions';
import { DEFAULT_TERMS } from '@/lib/exportdocs/company';
import { lineCalc, totals, docLines, money, kg, mt, BASIS } from '@/lib/exportdocs/calc';
import d from './docs.module.css';

const uid = () => Math.random().toString(36).slice(2, 10);
const newLine = (p = {}) => ({ id: uid(), desc: '', group: '', hs: '', pkgs: '', kind: 'BAG', netPer: '', grossPer: '', cbmPer: '', rate: '', basis: 'MT', gst: '', origin: '', packing: '', batch: '', mfg: '', exp: '', ...p });
const CONSOLIDATE_DOCS = [['proforma', 'Proforma'], ['custom', 'Custom invoice'], ['commercial', 'Commercial invoice'], ['packing', 'Packing list']];
const KINDS = ['BAG', 'CTN', 'BOX', 'DRUM', 'PKG', 'TIN', 'BALE', 'JAR', 'PCS'];

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

export default function ShipmentEditor({ id, initial, savedAt, docs, deleteAction }) {
  const [s, setS] = useState(() => ({ ...initial, lines: (initial.lines || []).map((l) => ({ ...newLine(), ...l, id: l.id || uid() })) }));
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState(savedAt ? 'Saved' : '');
  const [pending, start] = useTransition();
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

      <section className={d.docs} aria-label="Documents">
        {docs.map((doc) => <button key={doc.slug} type="button" className={d.doc} onClick={() => openDoc(doc)}>{doc.name}{doc.excel ? ' ↓' : ''}</button>)}
      </section>
      <p className={d.tot}>{s.lines.length} products · {t.pkgs} {t.kind} · Net {kg(t.net)} kg · Gross {kg(t.gross)} kg{t.cbm ? ` · ${mt(t.cbm)} CBM` : ''} · <b>{cur} {money(t.amount)}</b></p>

      <details className={d.sec} open>
        <summary>Numbers and dates</summary>
        <div className={d.grid}>
          <F label="Proforma no."><input {...bind('piNo')} /></F>
          <F label="Proforma date"><input type="date" {...bind('piDate')} /></F>
          <F label="Invoice no."><input {...bind('invNo')} /></F>
          <F label="Invoice date"><input type="date" {...bind('invDate')} /></F>
          <F label="Buyer's order no. & date"><input {...bind('buyerOrder')} /></F>
          <F label="Other ref. (proforma)"><input {...bind('otherRef')} /></F>
        </div>
      </details>

      <details className={d.sec} open>
        <summary>Buyer, consignee and notify</summary>
        <div className={d.grid}>
          <F label="Consignee" hint="first line = company name" wide><textarea rows={4} {...bind('consignee')} /></F>
          <F label="Buyer" hint="if other than consignee" wide><textarea rows={4} {...bind('buyer')} /></F>
          <F label="Notify party 1" wide><textarea rows={3} {...bind('notify1')} /></F>
          <F label="Notify party 2 (BL)" wide><textarea rows={3} {...bind('notify2')} /></F>
          <label className={d.chk}><input type="checkbox" checked={!!s.toOrder} onChange={(e) => up({ toOrder: e.target.checked })} /> Show consignee as &ldquo;TO THE ORDER OF&rdquo; on custom invoice, packing list and BL</label>
        </div>
      </details>

      <details className={d.sec} open>
        <summary>Shipping and terms</summary>
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
      </details>

      <details className={d.sec} open>
        <summary>Products ({s.lines.length})</summary>
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
      </details>

      <details className={d.sec} open>
        <summary>Consolidation</summary>
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
      </details>

      <details className={d.sec} open>
        <summary>Containers ({s.containers.length})</summary>
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
      </details>

      <details className={d.sec}>
        <summary>Freight, insurance, advance, schemes</summary>
        <div className={d.grid}>
          <F label={`Freight ${cur}`}><input {...bind('freight')} /></F>
          <F label={`Insurance ${cur}`}><input {...bind('insurance')} /></F>
          <F label={`Advance received ${cur}`} hint="less on proforma"><input {...bind('advance')} /></F>
          <F label="Insurance policy no."><input {...bind('insurancePolicy')} /></F>
          <label className={d.chk}><input type="checkbox" checked={!!s.rodtep} onChange={(e) => up({ rodtep: e.target.checked })} /> Claim RoDTEP (custom invoice)</label>
          <label className={d.chk}><input type="checkbox" checked={!!s.drawback} onChange={(e) => up({ drawback: e.target.checked })} /> Under Drawback scheme (custom invoice)</label>
        </div>
      </details>

      <details className={d.sec}>
        <summary>Proforma terms and conditions ({s.terms.length})</summary>
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
      </details>

      <details className={d.sec}>
        <summary>Bank covering letter and bill of exchange</summary>
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
      </details>

      <details className={d.sec}>
        <summary>Bank disposal (advance payment received)</summary>
        <div className={d.grid}>
          <F label="Letter date"><input type="date" {...bindIn('disposal', 'date')} /></F>
          <F label={`Amount received ${cur}`}><input {...bindIn('disposal', 'amount')} /></F>
          <F label="Received on"><input type="date" {...bindIn('disposal', 'received')} /></F>
          <F label="Remitter / importer" hint="default: consignee"><input {...bindIn('disposal', 'remitter')} /></F>
          <F label="Forward to branch"><input {...bindIn('disposal', 'isb')} /></F>
          <F label="Purpose" hint="default: advance against this proforma" wide><input {...bindIn('disposal', 'purpose')} /></F>
        </div>
      </details>

      <details className={d.sec}>
        <summary>VGM and self sealing</summary>
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
      </details>

      <details className={d.sec}>
        <summary>CargoX (Egypt ACID)</summary>
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
      </details>

      <form action={deleteAction} className={d.del} onSubmit={(e) => { if (!confirm('Delete this shipment and all its details? This cannot be undone.')) e.preventDefault(); }}>
        <input type="hidden" name="id" value={id} />
        <button type="submit">Delete shipment</button>
      </form>
    </div>
  );
}
