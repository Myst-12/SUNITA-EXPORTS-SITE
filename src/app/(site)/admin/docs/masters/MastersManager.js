'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MastersProvider, useMasters } from '../MasterUI';
import { deleteMasterAction } from '../actions';
import { MASTER_TYPES } from '@/lib/exportdocs/workflow';
import d from '../docs.module.css';

export default function MastersManager({ initial, failed }) {
  return <MastersProvider initial={initial}><Manager failed={failed} /></MastersProvider>;
}

function Manager({ failed }) {
  const [type, setType] = useState('party');
  const [q, setQ] = useState('');
  const { list, open, remove } = useMasters();
  const T = MASTER_TYPES[type];
  const cols = T.fields.slice(0, type === 'product' ? 6 : 4);
  const rows = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return list.filter((m) => m.type === type && (!qq || Object.values(m).some((v) => String(v).toLowerCase().includes(qq))))
      .sort((a, b) => String(a[T.fields[0][0]]).localeCompare(String(b[T.fields[0][0]])));
  }, [list, type, q, T]);
  const del = async (m) => {
    if (!confirm(`Delete "${m[T.fields[0][0]]}" from ${T.name.toLowerCase()}? Documents already made keep their copy.`)) return;
    const r = await deleteMasterAction(m.id);
    if (r.ok) remove(m.id); else alert(r.error);
  };
  return (
    <div className={d.wrap}>
      <div className={d.mHead}>
        <div>
          <Link href="/admin/docs/" className={d.back}>← Shipments</Link>
          <h1 className={d.docTitle}>Masters</h1>
          <p className={d.help}>Saved buyers, products, ports, places and shipping lines. Pick them from the dropdowns in every document, or add new ones there with + New.</p>
        </div>
      </div>
      {failed && <p className={d.err}>Could not load the masters. Reload the page to try again.</p>}
      <div className={d.tabs} role="tablist">
        {Object.entries(MASTER_TYPES).map(([k, t]) => (
          <button key={k} type="button" role="tab" aria-selected={type === k} className={d.tab} onClick={() => { setType(k); setQ(''); }}>
            {t.name} <span className={d.count}>{list.filter((m) => m.type === k).length}</span>
          </button>
        ))}
      </div>
      <section className={d.panel}>
        <div className={d.panelHead}>
          <div><h2 className={d.h2}>{T.name}</h2><p className={d.help} style={{ margin: 0 }}>{T.hint}</p></div>
          <div className={d.checks} style={{ margin: 0 }}>
            <input className={d.filter} value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${T.name.toLowerCase()}`} aria-label="Search" />
            <button type="button" className="btn btn-primary" onClick={() => open(type)}>+ New {T.one}</button>
          </div>
        </div>
        {rows.length ? (
          <div className={d.tableWrap}>
            <table className={d.mTable}>
              <thead><tr>{cols.map(([k, label]) => <th key={k}>{label}</th>)}<th></th></tr></thead>
              <tbody>{rows.map((m) => (
                <tr key={m.id}>
                  {cols.map(([k], i) => <td key={k}>{i === 0 ? <b>{m[k]}</b> : <span className={d.clamp}>{m[k]}</span>}</td>)}
                  <td className={d.rowBtns}>
                    <button type="button" className={d.link} onClick={() => open(type, m, undefined, m.id)}>Edit</button>
                    <button type="button" className={`${d.link} ${d.danger}`} onClick={() => del(m)}>Delete</button>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        ) : <p className={d.empty}>{q ? 'Nothing matches.' : `No ${T.name.toLowerCase()} yet. Add the first one with + New ${T.one}.`}</p>}
      </section>
    </div>
  );
}
