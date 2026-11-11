'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { saveMasterAction } from './actions';
import { MASTER_TYPES } from '@/lib/exportdocs/workflow';
import d from './docs.module.css';

// Masters are loaded once with the page and kept here, so a master added from any form shows up everywhere.
const Ctx = createContext(null);
export function MastersProvider({ initial, children }) {
  const [list, setList] = useState(initial);
  const [modal, setModal] = useState(null); // { type, values, id, onSaved }
  const upsert = (m) => setList((l) => [m, ...l.filter((x) => x.id !== m.id)]);
  const remove = (id) => setList((l) => l.filter((x) => x.id !== id));
  const open = (type, values = {}, onSaved, id) => setModal({ type, values, onSaved, id });
  return (
    <Ctx.Provider value={{ list, upsert, remove, open }}>
      {children}
      {modal && <MasterModal {...modal} onClose={() => setModal(null)} onDone={(m) => { upsert(m); modal.onSaved?.(m); setModal(null); }} />}
    </Ctx.Provider>
  );
}
export const useMasters = (type) => {
  const c = useContext(Ctx);
  return { ...c, items: type ? c.list.filter((m) => m.type === type) : c.list };
};

/** Add or edit one master. Opens over the page; Escape or the backdrop closes it. */
export function MasterModal({ type, values, id, onClose, onDone }) {
  const T = MASTER_TYPES[type];
  const [v, setV] = useState(() => Object.fromEntries(T.fields.map(([k]) => [k, values?.[k] ?? ''])));
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const first = useRef(null);
  useEffect(() => {
    first.current?.focus();
    const key = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [onClose]);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    const res = await saveMasterAction(id, type, v);
    setBusy(false);
    if (res.ok) onDone(res.master); else setErr(res.error);
  };
  return (
    <div className={d.backdrop} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className={d.modal} onSubmit={submit} role="dialog" aria-modal="true" aria-label={`${id ? 'Edit' : 'New'} ${T.one}`}>
        <h2 className={d.h2}>{id ? 'Edit' : 'New'} {T.one}</h2>
        <div className={d.grid}>
          {T.fields.map(([k, label, area], i) => (
            <label key={k} className={`${d.f} ${area ? d.wide : ''}`}>
              <span>{label}</span>
              {area
                ? <textarea ref={i === 0 ? first : undefined} rows={3} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} />
                : <input ref={i === 0 ? first : undefined} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} />}
            </label>
          ))}
        </div>
        {err && <p className={d.err}>{err}</p>}
        <div className={d.modalBar}>
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Saving…' : `Save ${T.one}`}</button>
        </div>
      </form>
    </div>
  );
}

/**
 * A dropdown of saved masters above a field, with "+ New" to add one on the spot.
 * `toValue(master)` is what choosing it puts in the field; `fromValue(text)` prefills a new master from the field.
 */
export function MasterPick({ type, label, onPick, fromValue, compact }) {
  const { items, open } = useMasters(type);
  const T = MASTER_TYPES[type];
  const main = T.fields[0][0];
  return (
    <span className={`${d.pick} ${compact ? d.pickCompact : ''}`}>
      <select value="" onChange={(e) => { const m = items.find((x) => x.id === e.target.value); if (m) onPick(m); }} aria-label={`Choose a saved ${T.one}${label ? ` for ${label}` : ''}`}>
        <option value="">{items.length ? `Choose saved ${T.one}…` : `No saved ${T.name.toLowerCase()} yet`}</option>
        {items.map((m) => <option key={m.id} value={m.id}>{m[main]}{m.country ? ` · ${m.country}` : m.code ? ` · ${m.code}` : ''}</option>)}
      </select>
      <button type="button" className={d.newBtn} onClick={() => open(type, fromValue?.() || {}, onPick)}>+ New</button>
    </span>
  );
}
