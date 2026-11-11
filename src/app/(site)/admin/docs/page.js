import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { listShipments } from '@/lib/exportdocs/store';
import { totals, money, dmy, CURRENCY } from '@/lib/exportdocs/calc';
import { createShipmentAction } from './actions';
import s from '../admin.module.css';

export const metadata = { title: 'Export documents' };

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
          <p className={s.sub}>Enter a shipment once and print the proforma, custom and commercial invoices, packing list, BL draft, bill of exchange, VGM, bank letters and self sealing from it.</p>
        </div>
        <form action={createShipmentAction} className={s.headActions}>
          <button className="btn btn-primary btn-lg" type="submit">New shipment</button>
        </form>
      </div>
      {note && <p className={s.note}>{note}</p>}
      {failed && <p className={s.warn}>Could not load shipments. If this is the first time, the <b>shipments</b> table still needs to be created (docs/export-docs-setup.md).</p>}
      {!list.length && !failed && <p className={s.empty}>No shipments yet. Start with New shipment.</p>}
      <div className={s.list}>
        {list.map((x) => {
          const t = totals(x.lines || []);
          return (
            <div key={x.id} className={s.row}>
              <Link href={`/admin/docs/${x.id}/`} style={{ flex: 1, color: 'inherit' }}>
                <h2>{x.title || String(x.consignee || '').split('\n')[0] || 'Untitled shipment'}</h2>
                <span className={s.meta}>{[x.invNo || x.piNo, dmy(x.invDate || x.piDate), x.destCountry, `${(x.lines || []).length} products`].filter(Boolean).join(' · ')}</span>
              </Link>
              <div className={s.count}>{CURRENCY[x.currency] || x.currency} {money(t.amount)}
                <form action={createShipmentAction}><input type="hidden" name="from" value={x.id} /><button type="submit" className={s.meta} style={{ background: 'none', border: 0, cursor: 'pointer', textDecoration: 'underline', padding: '6px 0 0' }}>Copy</button></form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
