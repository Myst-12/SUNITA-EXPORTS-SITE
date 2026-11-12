import Link from '@/components/Link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { listShipments } from '@/lib/exportdocs/store';
import { totals, money, CURRENCY } from '@/lib/exportdocs/calc';
import { normalizeShipment, STEPS } from '@/lib/exportdocs/workflow';
import { createShipmentAction } from './actions';
import DeleteShipment from './DeleteShipment';
import s from '../admin.module.css';

export const metadata = { title: 'Export documents' };
const btn = { background: 'none', border: 0, cursor: 'pointer', textDecoration: 'underline', padding: 0, fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600 };

export default async function DocsTool({ searchParams }) {
  if (!(await isAdmin())) redirect('/admin/');
  const { note } = await searchParams;
  let list = [], failed = false;
  try { list = await listShipments(); } catch (e) { console.error(e); failed = true; }

  return (
    <div className={`container ${s.wrap}`}>
      <div className={s.head}>
        <div>
          <h1>Export documents</h1>
          <p className={s.sub}>One shipment, one document at a time: enquiry, quotation, proforma, then the shipping and bank documents. Each new document copies the one before it. Buyers, products, ports and places are kept in <a href="/admin/docs/masters/">Masters</a>.</p>
        </div>
        <form action={createShipmentAction} className={s.headActions}>
          <a href="/admin/docs/masters/" className="btn btn-outline btn-lg">Masters</a>
          <button className="btn btn-primary btn-lg" type="submit">New shipment</button>
        </form>
      </div>
      {note && <p className={s.note}>{note}</p>}
      {failed && <p className={s.warn}>Could not load shipments. If this is the first time, the <b>shipments</b> table still needs to be created (docs/export-docs-setup.md).</p>}
      {!list.length && !failed && <p className={s.empty}>No shipments yet. Start with New shipment.</p>}
      <div className={s.list}>
        {list.map((raw) => {
          const n = normalizeShipment(raw);
          const lastStep = [...STEPS].reverse().find((st) => n.docs[st.slug] && !st.extra);
          const x = { ...(lastStep ? n.docs[lastStep.slug] : {}), id: raw.id, title: n.title };
          const t = totals(x.lines || []);
          return (
            <div key={x.id} className={s.row}>
              <Link href={`/admin/docs/${x.id}/`} style={{ flex: 1, color: 'inherit' }}>
                <h2>{x.title || String(x.consignee || '').split('\n')[0] || 'Untitled shipment'}</h2>
                <span className={s.meta}>{[lastStep ? `At: ${lastStep.name}` : 'Not started', x.invNo || x.piNo || x.quoteNo || x.enqNo, x.destCountry, `${(x.lines || []).length} products`].filter(Boolean).join(' · ')}</span>
              </Link>
              <div className={s.count}>{CURRENCY[x.currency] || x.currency || 'US$'} {money(t.amount)}
                <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', paddingTop: 6 }}>
                  <form action={createShipmentAction}><input type="hidden" name="from" value={x.id} /><button type="submit" className={s.meta} style={btn}>Copy</button></form>
                  <DeleteShipment id={x.id} label={x.title || x.invNo || x.piNo || x.quoteNo || 'this shipment'} className={s.meta} style={{ ...btn, color: '#b42318' }}>Delete</DeleteShipment>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
