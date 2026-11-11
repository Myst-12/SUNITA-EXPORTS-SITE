'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { saveShipmentAction, readMessageAction } from './actions';
import DeleteShipment from './DeleteShipment';
import { MastersProvider, MasterPick, useMasters } from './MasterUI';
import { blankShipment, DEFAULT_TERMS, DEFAULT_QUOTE_TERMS } from '@/lib/exportdocs/company';
import { lineCalc, totals, docLines, money, kg, mt, BASIS } from '@/lib/exportdocs/calc';
import { STEPS, SECTIONS, missing, previousMade, partyText, placeText, stepOf } from '@/lib/exportdocs/workflow';
import d from './docs.module.css';

const uid = () => Math.random().toString(36).slice(2, 10);
const today = () => new Date().toISOString().slice(0, 10);
const plusDays = (n) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
const newLine = (p = {}) => ({ id: uid(), desc: '', group: '', hs: '', qty: '', pkgs: '', kind: 'BAG', netPer: '', grossPer: '', cbmPer: '', rate: '', basis: 'MT', gst: '', origin: '', packing: '', batch: '', mfg: '', exp: '', ...p });
const KINDS = ['BAG', 'CTN', 'BOX', 'DRUM', 'PKG', 'TIN', 'BALE', 'JAR', 'PCS'];
const INV_DOCS = ['custom', 'custompacking', 'vgm', 'selfsealing', 'bl', 'commercial', 'packing', 'boe', 'bank', 'cargox'];
const curOf = (s) => (s.currency === 'USD' || !s.currency ? 'US$' : s.currency);

/** A new snapshot for `slug`: a copy of `source` (or blank), with this document's own numbers and dates. */
function startSnapshot(slug, source, numbers) {
  const s = { ...blankShipment(), ...(source ? structuredClone(source) : {}) };
  s.lines = (s.lines || []).map((l) => ({ ...newLine(), ...l, id: l.id || uid() }));
  const t = today();
  if (slug === 'enquiry') { s.enqNo ||= numbers.enqNo; s.enqDate ||= t; }
  if (slug === 'quotation') { s.rawMessage = ''; s.quoteNo ||= numbers.quoteNo; s.quoteDate = t; s.validTill ||= plusDays(15); if (!s.quoteTerms?.length) s.quoteTerms = [...DEFAULT_QUOTE_TERMS]; }
  if (slug === 'proforma' || slug === 'disposal') { s.piNo ||= numbers.piNo; s.piDate ||= t; if (!s.terms?.length) s.terms = [...DEFAULT_TERMS]; }
  if (INV_DOCS.includes(slug)) { s.invNo ||= numbers.invNo; s.invDate ||= t; }
  if (slug === 'bank') s.bankDate = t;
  if (slug === 'vgm') s.vgm = { ...s.vgm, date: t };
  if (slug === 'selfsealing') s.seal = { ...s.seal, date: t };
  if (slug === 'disposal') s.disposal = { ...s.disposal, date: t };
  return s;
}

export default function ShipmentEditor({ id, initial, savedAt, numbers, masters }) {
  return (
    <MastersProvider initial={masters}>
      <Editor id={id} initial={initial} savedAt={savedAt} numbers={numbers} />
    </MastersProvider>
  );
}

function Editor({ id, initial, savedAt, numbers }) {
  const [ship, setShip] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState(savedAt ? 'Saved' : '');
  const [pending, start] = useTransition();
  const ref = useRef(ship); ref.current = ship;
  const lastMade = [...STEPS].reverse().find((x) => initial.docs[x.slug] && !x.extra)?.slug;
  const [active, setActive] = useState(lastMade || 'enquiry');

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

  const s = ship.docs[active];
  const upDoc = useCallback((patch) => {
    setShip((p) => {
      const cur = p.docs[active];
      const next = typeof patch === 'function' ? patch(cur) : patch;
      return { ...p, docs: { ...p.docs, [active]: { ...cur, ...next } }, made: { ...p.made, [active]: new Date().toISOString() } };
    });
    setDirty(true);
  }, [active]);

  const startDoc = (fromSlug) => {
    const snap = startSnapshot(active, fromSlug ? ship.docs[fromSlug] : null, numbers);
    setShip((p) => ({ ...p, docs: { ...p.docs, [active]: snap }, made: { ...p.made, [active]: new Date().toISOString() } }));
    setDirty(true);
  };

  const go = (slug) => { setActive(slug); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const step = stepOf(active);
  const idx = STEPS.findIndex((x) => x.slug === active);
  const nextStep = STEPS[idx + 1];

  const openDoc = async () => {
    const url = `/admin/docs/${id}/${active}/`;
    if (!dirty) { if (step.excel) window.location.href = url; else window.open(url, '_blank'); return; }
    const w = step.excel ? null : window.open('about:blank', '_blank');
    if (await save()) { if (w) w.location.href = url; else window.location.href = url; } else w?.close();
  };

  return (
    <div className={d.wrap}>
      <div className={d.top}>
        <Link href="/admin/docs/" className={d.back}>← Shipments</Link>
        <input className={d.title} value={ship.title} onChange={(e) => { setShip({ ...ship, title: e.target.value }); setDirty(true); }} placeholder="Shipment name, e.g. El Dorra – chia & cardamom" aria-label="Shipment name" />
        <span className={d.status} data-dirty={dirty || undefined}>{dirty ? 'Unsaved changes' : status}</span>
        <button type="button" className="btn btn-primary" onClick={save} disabled={pending}>Save</button>
      </div>

      <div className={d.layout}>
        <nav className={d.steps} aria-label="Documents in order">
          {STEPS.map((x, k) => {
            const snap = ship.docs[x.slug];
            const miss = snap ? missing(x.slug, snap) : [];
            const state = !snap ? 'todo' : miss.length ? 'part' : 'done';
            return (
              <div key={x.slug}>
                {x.extra && !STEPS[k - 1].extra && <p className={d.stepsH}>Extra documents</p>}
                <button type="button" className={d.step} aria-current={active === x.slug ? 'step' : undefined} onClick={() => go(x.slug)}>
                  <span className={d.stepNo} data-state={state}>{state === 'done' ? '✓' : x.extra ? '+' : k + 1}</span>
                  <span><b>{x.name}</b><small>{!snap ? x.short : miss.length ? `Needs ${miss.join(', ')}` : 'Ready'}</small></span>
                </button>
              </div>
            );
          })}
        </nav>

        <div className={d.main}>
          <header className={d.docHead}>
            <div>
              <p className={d.eyebrow}>{step.extra ? 'Extra document' : `Step ${idx + 1} of 12`} · {step.short}</p>
              <h1 className={d.docTitle}>{step.name}</h1>
            </div>
            {s && (
              <div className={d.docActions}>
                <RecopyMenu ship={ship} active={active} onCopy={(from) => { if (confirm(`Replace everything in the ${step.name} with a fresh copy of the ${stepOf(from).name}?`)) startDoc(from); }} />
                <button type="button" className="btn btn-primary" onClick={openDoc}>{step.excel ? 'Download Excel ↓' : 'Print / Save PDF ↗'}</button>
              </div>
            )}
          </header>

          {!s ? <StartCard ship={ship} active={active} onStart={startDoc} />
            : SECTIONS[active].map(([key, opts = {}]) => <Section key={key} name={key} opts={opts} s={s} up={upDoc} />)}

          <div className={d.stepNav}>
            {idx > 0 ? <button type="button" className="btn btn-outline" onClick={() => go(STEPS[idx - 1].slug)}>← {STEPS[idx - 1].name}</button> : <span />}
            {nextStep && <button type="button" className="btn btn-primary" onClick={() => go(nextStep.slug)}>Next: {nextStep.name} →</button>}
          </div>
          <div className={d.del}><DeleteShipment id={id} label={ship.title || 'this shipment'}>Delete shipment</DeleteShipment></div>
        </div>
      </div>
    </div>
  );
}

function StartCard({ ship, active, onStart }) {
  const prev = previousMade(ship.docs, active);
  const made = STEPS.filter((x) => ship.docs[x.slug]);
  const [from, setFrom] = useState(prev || '');
  const step = stepOf(active);
  return (
    <section className={`${d.panel} ${d.start}`}>
      <h2 className={d.h2}>Start the {step.name}</h2>
      <p className={d.help}>
        {prev
          ? <>It copies the details from the <b>{stepOf(prev).name}</b>. Change anything here afterwards; the {stepOf(prev).name} stays as it is.</>
          : <>No earlier document in this shipment, so it starts empty. Pick the buyer and products from your saved masters.</>}
      </p>
      {made.length > 0 && (
        <label className={d.f} style={{ maxWidth: 360 }}>
          <span>Copy details from</span>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {made.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}
            <option value="">Nothing (start empty)</option>
          </select>
        </label>
      )}
      <button type="button" className="btn btn-primary btn-lg" onClick={() => onStart(from || null)}>Start {step.name}</button>
    </section>
  );
}

function RecopyMenu({ ship, active, onCopy }) {
  const others = STEPS.filter((x) => x.slug !== active && ship.docs[x.slug]);
  if (!others.length) return null;
  return (
    <select className={d.recopy} value="" onChange={(e) => e.target.value && onCopy(e.target.value)} aria-label="Copy details again from another document">
      <option value="">Copy again from…</option>
      {others.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}
    </select>
  );
}

// ---------------- form sections ----------------
function F({ label, hint, wide, children, extra }) {
  return (
    <div className={`${d.f} ${wide ? d.wide : ''}`}>
      <div className={d.fHead}><label>{label}{hint && <small> {hint}</small>}</label>{extra}</div>
      {children}
    </div>
  );
}
function Panel({ title, help, children, action }) {
  return (
    <section className={d.panel}>
      <div className={d.panelHead}><h2 className={d.h2}>{title}</h2>{action}</div>
      {help && <p className={d.help}>{help}</p>}
      {children}
    </section>
  );
}

function Section({ name, opts, s, up }) {
  const bind = (k) => ({ value: s[k] ?? '', onChange: (e) => up({ [k]: e.target.value }), 'aria-label': k });
  const bindIn = (o, k) => ({ value: s[o]?.[k] ?? '', onChange: (e) => up((c) => ({ [o]: { ...c[o], [k]: e.target.value } })), 'aria-label': k });
  const cur = curOf(s);
  const setArr = (key, i, k, v) => up((c) => { const a = (c[key] || []).slice(); a[i] = { ...a[i], [k]: v }; return { [key]: a }; });

  switch (name) {
    case 'enqMeta': return (
      <Panel title="Enquiry details">
        <div className={d.grid}>
          <F label="Enquiry no."><input {...bind('enqNo')} /></F>
          <F label="Date received"><input type="date" {...bind('enqDate')} /></F>
          <F label="Received via"><select {...bind('source')}>{['WhatsApp', 'Email', 'Phone', 'Exhibition', 'Website', 'Agent', 'Other'].map((x) => <option key={x}>{x}</option>)}</select></F>
          <F label="Contact person"><input {...bind('contact')} /></F>
          <F label="Required by"><input type="date" {...bind('requiredBy')} /></F>
        </div>
      </Panel>
    );
    case 'quoteMeta': return (
      <Panel title="Quotation details">
        <div className={d.grid}>
          <F label="Quotation no."><input {...bind('quoteNo')} /></F>
          <F label="Date"><input type="date" {...bind('quoteDate')} /></F>
          <F label="Valid till"><input type="date" {...bind('validTill')} /></F>
          <F label="Their enquiry no." hint="optional"><input {...bind('enqNo')} /></F>
        </div>
      </Panel>
    );
    case 'piMeta': return (
      <Panel title="Proforma number">
        <div className={d.grid}>
          <F label="Proforma no."><input {...bind('piNo')} /></F>
          <F label="Proforma date"><input type="date" {...bind('piDate')} /></F>
          {!opts.short && <F label="Order no. & date"><input {...bind('buyerOrder')} /></F>}
          {!opts.short && <F label="Other ref."><input {...bind('otherRef')} /></F>}
        </div>
      </Panel>
    );
    case 'invMeta': return (
      <Panel title="Invoice number">
        <div className={d.grid}>
          <F label="Invoice no."><input {...bind('invNo')} /></F>
          <F label="Invoice date"><input type="date" {...bind('invDate')} /></F>
          {!opts.short && <F label="Buyer's order no. & date"><input {...bind('buyerOrder')} /></F>}
        </div>
      </Panel>
    );
    case 'paste': return <PastePanel kind={opts.kind} s={s} up={up} />;
    case 'parties': return <PartiesPanel opts={opts} s={s} up={up} />;
    case 'route': return <RoutePanel opts={opts} s={s} up={up} bind={bind} />;
    case 'terms': {
      const show = (k) => !opts.only || opts.only.includes(k);
      return (
        <Panel title="Price and payment terms">
          <div className={d.grid}>
            {show('incoterm') && <F label="Incoterm"><select {...bind('incoterm')}>{['FOB', 'CFR', 'CIF', 'EXW', 'FCA', 'CNF', 'DDP'].map((x) => <option key={x}>{x}</option>)}</select></F>}
            {show('incoterm') && <F label="Incoterm place"><input {...bind('incotermPlace')} list="sx-ports" /></F>}
            {show('currency') && <F label="Currency"><select {...bind('currency')}>{['USD', 'EUR', 'GBP', 'AED', 'INR'].map((x) => <option key={x}>{x}</option>)}</select></F>}
            {show('payment') && <F label="Payment terms" wide><textarea rows={2} {...bind('payment')} placeholder="e.g. 20% ADVANCE AND BALANCE AGAINST CARGO READY PHOTOS" /></F>}
          </div>
        </Panel>
      );
    }
    case 'shippingBill': return (
      <Panel title={opts.sb === false ? 'Bill of lading' : 'Shipping bill and bill of lading'}>
        <div className={d.grid}>
          {opts.sb !== false && <F label="Shipping bill no."><input {...bind('sbNo')} /></F>}
          {opts.sb !== false && <F label="Shipping bill date"><input type="date" {...bind('sbDate')} /></F>}
          {opts.bl && <F label="B/L no."><input {...bind('blNo')} /></F>}
          {opts.bl && <F label="B/L date"><input type="date" {...bind('blDate')} /></F>}
        </div>
      </Panel>
    );
    case 'blExtra': return (
      <Panel title="BL instructions">
        <div className={d.grid}>
          <F label="Booking no."><input {...bind('bookingNo')} /></F>
          <F label="Freight payable at"><input {...bind('freightAt')} /></F>
          <F label="No. of original BLs"><input {...bind('originalBls')} /></F>
          <F label="Shipping line" wide extra={<MasterPick type="line" onPick={(m) => up({ shippingLine: placeText(m) })} fromValue={() => ({ name: (s.shippingLine || '').split('\n')[0], address: (s.shippingLine || '').split('\n').slice(1).join('\n') })} />}><textarea rows={2} {...bind('shippingLine')} /></F>
          <F label="Shipping marks" wide><textarea rows={2} {...bind('marks')} /></F>
        </div>
      </Panel>
    );
    case 'products': return <ProductsPanel opts={opts} s={s} up={up} />;
    case 'containers': return (
      <Panel title={`Containers (${(s.containers || []).length})`} help="With one container, leave packages and weights empty to use the product totals.">
        <div className={d.tableWrap}>
          <table className={d.lines}>
            <thead><tr><th>#</th><th>Container no.</th><th>Size</th><th>Line seal</th><th>Exporter seal</th><th>Vehicle no.</th><th>Pkgs</th><th>Gross kg</th><th>Net kg</th>{opts.vgm && <th>Tare kg</th>}<th></th></tr></thead>
            <tbody>{(s.containers || []).map((c, i) => (
              <tr key={i}><td className={d.n}>{i + 1}</td>
                {['no', 'size', 'lineSeal', 'exporterSeal', 'vehicle', 'pkgs', 'gross', 'net', ...(opts.vgm ? ['tare'] : [])].map((k) => (
                  <td key={k}>{k === 'size'
                    ? <select className={d.cIn} value={c.size} onChange={(e) => setArr('containers', i, 'size', e.target.value)} aria-label="Size">{['20 Ft', '40 Ft', '40 Ft HC', 'LCL'].map((x) => <option key={x}>{x}</option>)}</select>
                    : <input className={d.cIn} style={{ width: ['no', 'lineSeal', 'exporterSeal'].includes(k) ? 130 : 86 }} value={c[k] || ''} onChange={(e) => setArr('containers', i, k, e.target.value)} aria-label={k} />}</td>
                ))}
                <td><button type="button" className={d.x} onClick={() => up((cc) => ({ containers: cc.containers.filter((_, j) => j !== i) }))} aria-label="Remove container">×</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <button type="button" className="btn btn-outline" onClick={() => up((cc) => ({ containers: [...(cc.containers || []), { no: '', size: cc.containers?.[0]?.size || '20 Ft', lineSeal: '', exporterSeal: '', vehicle: '', tare: '', pkgs: '', gross: '', net: '' }] }))}>Add container</button>
      </Panel>
    );
    case 'money': return (
      <Panel title="Freight, insurance and schemes">
        <div className={d.grid}>
          <F label={`Freight ${cur}`}><input {...bind('freight')} /></F>
          <F label={`Insurance ${cur}`}><input {...bind('insurance')} /></F>
          <F label="Insurance policy no."><input {...bind('insurancePolicy')} /></F>
          <label className={d.chk}><input type="checkbox" checked={!!s.rodtep} onChange={(e) => up({ rodtep: e.target.checked })} /> Claim RoDTEP</label>
          <label className={d.chk}><input type="checkbox" checked={!!s.drawback} onChange={(e) => up({ drawback: e.target.checked })} /> Under Drawback scheme</label>
        </div>
      </Panel>
    );
    case 'advance': return (
      <Panel title="Advance">
        <div className={d.grid}><F label={`Advance received ${cur}`} hint="printed as 'Less advance'"><input {...bind('advance')} /></F></div>
      </Panel>
    );
    case 'piTerms': return <TermsPanel title="Proforma terms and conditions" k="terms" defaults={DEFAULT_TERMS} s={s} up={up} />;
    case 'quoteTerms': return <TermsPanel title="Quotation terms" k="quoteTerms" defaults={DEFAULT_QUOTE_TERMS} s={s} up={up} />;
    case 'notes': return (
      <Panel title="Notes"><textarea className={d.area} rows={3} {...bind('notes')} placeholder="Grades, specifications, labelling, anything else the buyer asked for" /></Panel>
    );
    case 'vgm': return (
      <Panel title="VGM details">
        <div className={d.grid}>
          <F label="Authorised name"><input {...bindIn('vgm', 'name')} /></F>
          <F label="Designation"><input {...bindIn('vgm', 'designation')} /></F>
          <F label="24×7 mobile"><input {...bindIn('vgm', 'mobile')} /></F>
          <F label="Max weight (CSC plate)"><input {...bindIn('vgm', 'cscMax')} /></F>
          <F label="Weighbridge" wide extra={<MasterPick type="place" onPick={(m) => up((c) => ({ vgm: { ...c.vgm, weighbridge: placeText(m) } }))} fromValue={() => ({ name: (s.vgm?.weighbridge || '').split('\n')[0], address: (s.vgm?.weighbridge || '').split('\n').slice(1).join('\n'), kind: 'Weighbridge' })} />}><textarea rows={2} {...bindIn('vgm', 'weighbridge')} /></F>
          <F label="Date and time of weighing"><input {...bindIn('vgm', 'weighTime')} /></F>
          <F label="Weighing slip no."><input {...bindIn('vgm', 'slipNo')} /></F>
          <F label="Cargo type"><input {...bindIn('vgm', 'type')} /></F>
          <F label="Hazardous UN no. / IMDG class"><input {...bindIn('vgm', 'hazard')} /></F>
          <F label="VGM date"><input type="date" {...bindIn('vgm', 'date')} /></F>
        </div>
      </Panel>
    );
    case 'seal': return (
      <Panel title="Self sealing">
        <div className={d.grid}>
          <F label="Container stuffing place" wide extra={<MasterPick type="place" onPick={(m) => up((c) => ({ seal: { ...c.seal, at: placeText(m) } }))} fromValue={() => ({ name: (s.seal?.at || '').split('\n')[0], address: (s.seal?.at || '').split('\n').slice(1).join('\n'), kind: 'Stuffing place' })} />}><textarea rows={3} {...bindIn('seal', 'at')} /></F>
          <F label="Place (for signature)"><input {...bindIn('seal', 'place')} /></F>
          <F label="Date"><input type="date" {...bindIn('seal', 'date')} /></F>
        </div>
      </Panel>
    );
    case 'boe': return (
      <Panel title="Bill of exchange">
        <div className={d.grid}>
          <F label="Tenor"><input {...bind('boeTenor')} /></F>
          <F label="Negotiated through bank" hint="default: consignee bank" wide><textarea rows={3} {...bind('negotiatingBank')} /></F>
        </div>
      </Panel>
    );
    case 'bankLetter': return (
      <Panel title="Bank covering letter">
        <div className={d.grid}>
          <F label="Letter to (bank)" wide><textarea rows={2} {...bind('bankTo')} /></F>
          <F label="Consignee bank details" wide><textarea rows={5} {...bind('consigneeBank')} /></F>
          <F label="Subject"><input {...bind('bankSubject')} /></F>
          <F label="Letter date"><input type="date" {...bind('bankDate')} /></F>
          <F label="LC no. and date"><input {...bind('lcNo')} /></F>
        </div>
        <p className={d.help}><b>Advance receipts</b> (taken off the final claim amount)</p>
        {(s.receipts || []).map((r, i) => (
          <div key={i} className={d.inline}>
            <input placeholder="Bank ref. no." value={r.ref} onChange={(e) => setArr('receipts', i, 'ref', e.target.value)} aria-label="Bank reference" />
            <input type="date" value={r.date} onChange={(e) => setArr('receipts', i, 'date', e.target.value)} aria-label="Date" />
            <input placeholder={`Amount ${cur}`} value={r.amount} onChange={(e) => setArr('receipts', i, 'amount', e.target.value)} aria-label="Amount" />
            <button type="button" className={d.x} onClick={() => up((c) => ({ receipts: c.receipts.filter((_, j) => j !== i) }))} aria-label="Remove receipt">×</button>
          </div>
        ))}
        <button type="button" className="btn btn-outline" onClick={() => up((c) => ({ receipts: [...(c.receipts || []), { ref: '', date: '', amount: '' }] }))}>Add advance receipt</button>
      </Panel>
    );
    case 'disposal': return (
      <Panel title="Advance payment received">
        <div className={d.grid}>
          <F label="Letter to (bank)" wide><textarea rows={2} {...bind('bankTo')} /></F>
          <F label="Letter date"><input type="date" {...bindIn('disposal', 'date')} /></F>
          <F label={`Amount received ${cur}`}><input {...bindIn('disposal', 'amount')} /></F>
          <F label="Received on"><input type="date" {...bindIn('disposal', 'received')} /></F>
          <F label="Forward to branch"><input {...bindIn('disposal', 'isb')} /></F>
          <F label="Purpose" hint="default: advance against the proforma" wide><input {...bindIn('disposal', 'purpose')} /></F>
        </div>
      </Panel>
    );
    case 'cargox': return (
      <Panel title="CargoX (Egypt ACID)">
        <div className={d.grid}>
          <F label="Importer contact"><input {...bindIn('cargox', 'contact')} /></F>
          <F label="Importer email"><input {...bindIn('cargox', 'email')} /></F>
          <F label="Importer phone"><input {...bindIn('cargox', 'phone')} /></F>
          <F label="Tax code"><input {...bindIn('cargox', 'taxCode')} /></F>
          <F label="ACID no."><input {...bindIn('cargox', 'acid')} /></F>
          <F label="Brand"><input {...bindIn('cargox', 'brand')} /></F>
          <F label="Origin port code"><input {...bindIn('cargox', 'polCode')} /></F>
          <F label="Destination port code"><input {...bindIn('cargox', 'podCode')} /></F>
        </div>
      </Panel>
    );
    default: return null;
  }
}

function PartiesPanel({ opts, s, up }) {
  const field = (k, label, rows = 4) => (
    <F label={label} wide extra={<MasterPick type="party" label={label}
      onPick={(m) => up((c) => ({ [k]: partyText(m), ...(k === 'consignee' ? { consigneeBank: c.consigneeBank || m.bank || '', destCountry: c.destCountry || (m.country || '').toUpperCase() } : {}) }))}
      fromValue={() => { const [name = '', ...rest] = String(s[k] || '').split('\n'); return { name, address: rest.join('\n') }; }} />}>
      <textarea rows={rows} value={s[k] || ''} onChange={(e) => up({ [k]: e.target.value })} aria-label={label} />
    </F>
  );
  const title = opts.notify1 || opts.buyer ? 'Buyer, consignee and notify party' : opts.consignee || 'Buyer';
  return (
    <Panel title={title} help="Choose a saved party, or type the details and use + New to save them for next time. The first line prints in bold.">
      <div className={d.stack}>
        {field('consignee', opts.consignee || 'Consignee')}
        {opts.buyer && field('buyer', 'Buyer (if other than consignee)')}
        {opts.notify1 && field('notify1', 'Notify party', 3)}
        {opts.notify2 && field('notify2', 'Second notify party', 3)}
        {opts.toOrder && <label className={d.chk}><input type="checkbox" checked={!!s.toOrder} onChange={(e) => up({ toOrder: e.target.checked })} /> Print consignee as &ldquo;TO THE ORDER OF&rdquo;</label>}
      </div>
    </Panel>
  );
}

function PortField({ label, k, s, up }) {
  return (
    <F label={label} extra={<MasterPick type="port" compact onPick={(m) => up({ [k]: m.name.toUpperCase() })} fromValue={() => ({ name: s[k] || '' })} />}>
      <input value={s[k] || ''} onChange={(e) => up({ [k]: e.target.value })} list="sx-ports" aria-label={label} />
    </F>
  );
}

function RoutePanel({ opts, s, up, bind }) {
  const { items: ports } = useMasters('port');
  const show = (k) => !opts.only || opts.only.includes(k);
  return (
    <Panel title="Route">
      <datalist id="sx-ports">{ports.map((p) => <option key={p.id} value={p.name.toUpperCase()} />)}</datalist>
      <div className={d.grid}>
        {show('origin') && <F label="Country of origin"><input {...bind('origin')} /></F>}
        {show('destCountry') && <F label="Country of final destination"><input {...bind('destCountry')} /></F>}
        {show('preCarriage') && <F label="Pre-carriage by"><input {...bind('preCarriage')} /></F>}
        {show('placeReceipt') && <F label="Place of receipt"><input {...bind('placeReceipt')} /></F>}
        {(opts.vessel || opts.only?.includes('vessel')) && <F label="Vessel / voyage"><input {...bind('vessel')} /></F>}
        {show('pol') && <PortField label="Port of loading" k="pol" s={s} up={up} />}
        {show('pod') && <PortField label="Port of discharge" k="pod" s={s} up={up} />}
        {show('finalDest') && <PortField label="Final destination" k="finalDest" s={s} up={up} />}
        {!opts.only && <F label="Shipping marks" wide><textarea rows={2} {...bind('marks')} /></F>}
      </div>
    </Panel>
  );
}

function TermsPanel({ title, k, defaults, s, up }) {
  const list = s[k] || [];
  return (
    <Panel title={`${title} (${list.length})`}>
      <ol className={d.terms}>
        {list.map((x, i) => (
          <li key={i}>
            <textarea rows={2} value={x} onChange={(e) => up((c) => { const a = c[k].slice(); a[i] = e.target.value; return { [k]: a }; })} aria-label={`Term ${i + 1}`} />
            <button type="button" className={d.x} onClick={() => up((c) => ({ [k]: c[k].filter((_, j) => j !== i) }))} aria-label={`Remove term ${i + 1}`}>×</button>
          </li>
        ))}
      </ol>
      <div className={d.checks}>
        <button type="button" className="btn btn-outline" onClick={() => up((c) => ({ [k]: [...(c[k] || []), ''] }))}>Add term</button>
        <button type="button" className="btn btn-outline" onClick={() => up({ [k]: [...defaults] })}>Reset to standard</button>
      </div>
    </Panel>
  );
}

// ---------------- paste a message ----------------
function PastePanel({ kind, s, up }) {
  const [text, setText] = useState(s.rawMessage || '');
  const [res, setRes] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const { items: parties } = useMasters('party');
  const read = async () => {
    setBusy(true); setErr(''); setRes(null);
    const r = await readMessageAction(kind, text);
    setBusy(false);
    if (r.ok) setRes(r.result); else setErr(r.error);
  };
  const apply = () => {
    const r = res;
    const party = parties.find((p) => r.buyerName && p.name.toLowerCase() === r.buyerName.toLowerCase());
    const consignee = party ? partyText(party) : [r.buyerName, r.buyerAddress, r.phone && `TEL: ${r.phone}`, r.email && `Email: ${r.email}`].filter(Boolean).join('\n');
    const pick = (k) => (r[k] ? { [k]: r[k] } : {});
    up((c) => ({
      rawMessage: text,
      ...(consignee && !c.consignee ? { consignee } : {}),
      ...(r.contact ? { contact: r.contact } : {}),
      ...pick('destCountry'), ...pick('pod'), ...pick('pol'), ...pick('incoterm'), ...pick('incotermPlace'), ...pick('currency'), ...pick('payment'),
      ...(kind === 'enquiry' ? pick('requiredBy') : pick('validTill')),
      ...(r.notes ? { notes: [c.notes, r.notes].filter(Boolean).join('\n') } : {}),
      lines: [...(c.lines || []), ...r.lines.map((l) => newLine({ ...l, basis: ['MT', 'KG', 'PKG'].includes(l.basis) ? l.basis : 'MT', kind: l.kind || 'BAG' }))],
    }));
    setRes(null);
  };
  const facts = res ? [
    ['Buyer', res.buyerName], ['Contact', res.contact], ['Phone', res.phone], ['Email', res.email], ['Country', res.destCountry], ['Port', res.pod],
    ['Terms', [res.incoterm, res.incotermPlace].filter(Boolean).join(' ')], ['Currency', res.currency], ['Payment', res.payment],
    [kind === 'enquiry' ? 'Required by' : 'Valid till', kind === 'enquiry' ? res.requiredBy : res.validTill], ['Notes', res.notes],
  ].filter(([, v]) => v) : [];
  return (
    <Panel title={`Paste the ${kind} message`} help="Paste the WhatsApp or email message. It is read into the fields below; check them before printing.">
      <textarea className={d.area} rows={5} value={text} onChange={(e) => setText(e.target.value)} aria-label="Message" placeholder={kind === 'enquiry' ? 'e.g. Hi, need 2 FCL cumin seeds Europe grade 25kg PP bags, CIF Jebel Ali, target $3100/MT, shipment by 15/12/2026…' : 'e.g. Cumin seeds 99.5% 25 kg bags USD 3050/MT FOB Nhava Sheva, valid till 30/11/2026…'} />
      <div className={d.checks}>
        <button type="button" className="btn btn-primary" onClick={read} disabled={busy || !text.trim()}>{busy ? 'Reading…' : 'Read message'}</button>
        {err && <span className={d.err}>{err}</span>}
      </div>
      {res && (
        <div className={d.found}>
          <p className={d.foundH}>Found {res.lines.length} product{res.lines.length === 1 ? '' : 's'}{facts.length ? ` and ${facts.length} detail${facts.length === 1 ? '' : 's'}` : ''}{res.by === 'rules' ? ' (basic reading, check carefully)' : ''}</p>
          {facts.length > 0 && <dl className={d.kv}>{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
          {res.lines.length > 0 && (
            <ul className={d.foundLines}>{res.lines.map((l, i) => <li key={i}><b>{l.desc}</b> {[l.qty && `${l.qty} ${l.basis === 'PKG' ? 'pkgs' : l.basis}`, l.packing, l.rate && `@ ${l.rate} per ${l.basis}`].filter(Boolean).join(' · ')}</li>)}</ul>
          )}
          <div className={d.checks}>
            <button type="button" className="btn btn-primary" onClick={apply}>Use these details</button>
            <button type="button" className="btn btn-outline" onClick={() => setRes(null)}>Discard</button>
          </div>
        </div>
      )}
    </Panel>
  );
}

// ---------------- products ----------------
const COLS = {
  enquiry: ['desc', 'packing', 'netPer', 'qty', 'basis', 'rate'],
  quote: ['desc', 'hs', 'packing', 'netPer', 'qty', 'rate', 'basis', 'amount'],
  full: ['desc', 'group', 'hs', 'pkgs', 'kind', 'netPer', 'grossPer', 'rate', 'basis', 'net', 'amount', 'packing', 'cbmPer', 'gst', 'origin'],
  packing: ['desc', 'group', 'hs', 'pkgs', 'kind', 'netPer', 'grossPer', 'net', 'gross', 'packing', 'batch', 'mfg', 'exp'],
};
const HEAD = { desc: 'Description', group: 'Group', hs: 'HS code', pkgs: 'Pkgs', kind: 'Kind', netPer: 'Net kg/pkg', grossPer: 'Gross kg/pkg', rate: 'Rate', basis: 'Per', net: 'Net kg', gross: 'Gross kg', amount: 'Amount', packing: 'Packing text', cbmPer: 'CBM/pkg', gst: 'GST %', origin: 'Origin state', batch: 'Batch', mfg: 'Mfg date', exp: 'Exp date', qty: 'Quantity' };
const WIDTH = { desc: 230, group: 150, hs: 86, pkgs: 66, netPer: 66, grossPer: 66, rate: 80, packing: 130, cbmPer: 56, gst: 50, origin: 96, batch: 84, qty: 80 };

const LineRow = memo(function LineRow({ l, i, cols, onChange, onRemove, onSave, enquiry }) {
  const c = lineCalc(l);
  const set = (k) => (e) => onChange(i, k, e.target.value);
  const cell = (k) => {
    if (k === 'kind') return <select className={d.cIn} value={l.kind} onChange={set('kind')} aria-label="Package kind">{KINDS.map((x) => <option key={x}>{x}</option>)}</select>;
    if (k === 'basis') return <select className={d.cIn} value={l.basis} onChange={set('basis')} aria-label="Rate per">{Object.entries(BASIS).map(([v, t]) => <option key={v} value={v}>{t.replace('Per ', '')}</option>)}</select>;
    if (k === 'net') return <span className={d.num}>{kg(c.net)}</span>;
    if (k === 'gross') return <span className={d.num}>{kg(c.gross)}</span>;
    if (k === 'amount') return <b className={d.num}>{money(c.amount)}</b>;
    if (k === 'mfg' || k === 'exp') return <input className={d.cIn} type="date" value={l[k] || ''} onChange={set(k)} aria-label={HEAD[k]} />;
    const ph = k === 'pkgs' && !l.pkgs && c.pkgs ? String(c.pkgs) : k === 'grossPer' ? l.netPer : k === 'packing' && l.netPer ? `${l.netPer} KG X 1 ${l.kind}` : '';
    return <input className={d.cIn} style={{ width: WIDTH[k] }} value={l[k] ?? ''} placeholder={ph} onChange={set(k)} inputMode={['desc', 'group', 'packing', 'origin', 'batch', 'hs'].includes(k) ? undefined : 'decimal'} aria-label={HEAD[k]} />;
  };
  return (
    <tr>
      <td className={d.n}>{i + 1}</td>
      {cols.map((k) => <td key={k}>{cell(k)}</td>)}
      <td className={d.rowBtns}>
        {!enquiry && <button type="button" className={d.star} onClick={() => onSave(l)} title="Save as product master" aria-label={`Save line ${i + 1} as a product master`}>★</button>}
        <button type="button" className={d.x} onClick={() => onRemove(i)} aria-label={`Remove line ${i + 1}`}>×</button>
      </td>
    </tr>
  );
}, (a, b) => a.l === b.l && a.i === b.i && a.cols === b.cols);

function ProductsPanel({ opts, s, up }) {
  const mode = opts.mode;
  const cols = useMemo(() => COLS[mode].filter((k) => k !== 'group' || opts.consolidate), [mode, opts.consolidate]);
  const lines = useMemo(() => s.lines || [], [s.lines]);
  const cur = curOf(s);
  const t = useMemo(() => totals(lines), [lines]);
  const { items: pm, open } = useMasters('product');

  const onLine = useCallback((i, k, v) => up((c) => { const a = c.lines.slice(); a[i] = { ...a[i], [k]: v }; return { lines: a }; }), [up]);
  const onRemove = useCallback((i) => up((c) => ({ lines: c.lines.filter((_, j) => j !== i) })), [up]);
  const onSave = useCallback((l) => open('product', l), [open]);
  const add = (p) => up((c) => ({ lines: [...(c.lines || []), newLine(p)] }));

  const [q, setQ] = useState('');
  const [hits, setHits] = useState([]);
  useEffect(() => {
    const qq = q.trim().toLowerCase();
    if (qq.length < 2) { setHits([]); return; }
    const local = pm.filter((m) => m.desc?.toLowerCase().includes(qq)).slice(0, 8).map((m) => { const { id: _i, type: _t, ...rest } = m; return { ...rest, source: 'Saved' }; });
    setHits(local);
    const ctl = new AbortController();
    const tm = setTimeout(() => fetch(`/admin/docs/products/?q=${encodeURIComponent(q)}`, { signal: ctl.signal }).then((r) => r.json()).then((j) => setHits([...local, ...(j.items || [])])).catch(() => {}), 200);
    return () => { clearTimeout(tm); ctl.abort(); };
  }, [q, pm]);

  const [paste, setPaste] = useState('');
  const importPaste = () => {
    const rows = paste.split(/\r?\n/).map((r) => r.split('\t').map((x) => x.trim())).filter((r) => r[0]);
    const body = rows.length && isNaN(parseFloat(rows[0][2])) ? rows.slice(1) : rows;
    up((c) => ({ lines: [...(c.lines || []), ...body.map(([desc, hs, pkgs, netPer, rate, basis, group, grossPer, kind]) => newLine({
      desc: desc.toUpperCase(), hs: (hs || '').replace(/\./g, ''), pkgs: pkgs || '', netPer: netPer || '', rate: rate || '',
      basis: ['MT', 'KG', 'PKG'].includes((basis || '').toUpperCase()) ? basis.toUpperCase() : 'MT', group: (group || '').toUpperCase(), grossPer: grossPer || '', kind: (kind || 'BAG').toUpperCase(),
    }))] }));
    setPaste('');
  };

  const [gText, setGText] = useState('');
  const [gName, setGName] = useState('');
  const groups = [...new Set(lines.map((l) => l.group).filter(Boolean))].sort();
  const gMatches = gText.trim() ? lines.filter((l) => l.desc.toLowerCase().includes(gText.trim().toLowerCase())).length : 0;
  const preview = useMemo(() => (opts.consolidate ? docLines(lines, true).filter((l) => l.merged) : []), [lines, opts.consolidate]);

  return (
    <Panel title={`Products (${lines.length})`} action={<span className={d.totalChip}>{t.pkgs ? `${t.pkgs} ${t.kind} · ` : ''}{t.net ? `${kg(t.net)} kg · ` : ''}<b>{cur} {money(t.amount)}</b></span>}>
      <div className={d.addRow}>
        <div className={d.search}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Add a product: search saved products, the catalogue and the FMCG list" aria-label="Search products" />
          {hits.length > 0 && (
            <ul className={d.hits}>
              {hits.map((h, k) => (
                <li key={k}><button type="button" onClick={() => { const { source: _, ...p } = h; add({ ...p, kind: p.kind || 'BAG', basis: p.basis || 'MT' }); setQ(''); }}><b>{h.desc}</b><small>{[h.source, h.hs && `HS ${h.hs}`, h.packing, h.rate && `rate ${h.rate}`].filter(Boolean).join(' · ')}</small></button></li>
              ))}
            </ul>
          )}
        </div>
        <button type="button" className="btn btn-outline" onClick={() => add({})}>Add empty line</button>
        <button type="button" className="btn btn-outline" onClick={() => open('product', {}, (m) => { const { id: _i, type: _t, ...p } = m; add(p); })}>+ New product master</button>
      </div>
      {mode !== 'enquiry' && mode !== 'quote' && (
        <details className={d.sub}>
          <summary>Paste many products from Excel</summary>
          <p className={d.help}>Columns in this order: <b>Description · HS code · No. of pkgs · Net kg per pkg · Rate · Rate per (MT / KG / PKG) · Group · Gross kg per pkg · Pkg kind</b>. Only the first five are needed.</p>
          <textarea rows={5} value={paste} onChange={(e) => setPaste(e.target.value)} className={d.area} aria-label="Rows from Excel" />
          <button type="button" className="btn btn-outline" onClick={importPaste} disabled={!paste.trim()}>Add these rows</button>
        </details>
      )}

      {lines.length > 0 ? (
        <div className={d.tableWrap}>
          <table className={d.lines}>
            <thead><tr><th>#</th>{cols.map((k) => <th key={k}>{k === 'rate' ? `${mode === 'enquiry' ? 'Target price' : 'Rate'} ${cur}` : HEAD[k]}</th>)}<th></th></tr></thead>
            <tbody>{lines.map((l, i) => <LineRow key={l.id || i} l={l} i={i} cols={cols} onChange={onLine} onRemove={onRemove} onSave={onSave} enquiry={mode === 'enquiry'} />)}</tbody>
          </table>
        </div>
      ) : <p className={d.empty}>No products yet. Search above, or add an empty line.</p>}

      {opts.consolidate && lines.length > 0 && (
        <div className={d.consol}>
          <label className={d.chk}><input type="checkbox" checked={!!s.consolidate} onChange={(e) => up({ consolidate: e.target.checked })} /> <span><b>Consolidate on this document</b>: products with the same Group print as one line</span></label>
          <div className={d.groupTool}>
            <span>Group every product containing</span>
            <input value={gText} onChange={(e) => setGText(e.target.value)} placeholder="powder" aria-label="Text in description" />
            <span>as</span>
            <input value={gName} onChange={(e) => setGName(e.target.value)} placeholder="SPICE POWDERS" list="sx-groups" aria-label="Group name" />
            <button type="button" className="btn btn-outline" onClick={() => up((c) => ({ lines: c.lines.map((l) => (l.desc.toLowerCase().includes(gText.trim().toLowerCase()) ? { ...l, group: gName.trim().toUpperCase() } : l)) }))} disabled={!gText.trim() || !gName.trim()}>Apply to {gMatches}</button>
            <datalist id="sx-groups">{groups.map((g) => <option key={g} value={g} />)}</datalist>
          </div>
          {s.consolidate && preview.length > 0 && (
            <table className={d.preview}>
              <thead><tr><th>Prints as</th><th>Products</th><th>HS</th><th>Pkgs</th><th>Net kg</th><th>Amount</th></tr></thead>
              <tbody>{preview.map((g) => <tr key={g.desc}><td>{g.desc}</td><td>{g.note}</td><td>{g.hs}</td><td className={d.num}>{g.pkgs}</td><td className={d.num}>{kg(g.net)}</td><td className={d.num}>{money(g.amount)}</td></tr>)}</tbody>
            </table>
          )}
        </div>
      )}
      {t.cbm > 0 && <p className={d.help}>Volume {mt(t.cbm)} CBM · Gross {kg(t.gross)} kg</p>}
    </Panel>
  );
}
