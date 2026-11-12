import Link from '@/components/Link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { listOrders, listCustomers, usingDatabase } from '@/lib/shop/store';
import { STATUSES, statusLabel } from '@/lib/shop/catalog';
import { setOrderStatusAction } from './actions';
import s from '../admin.module.css';

export const metadata = { title: 'Orders' };

const ist = (iso) => new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
// Buyers sometimes type "None" or "-" when they have no company; treat that as no company.
const companyOf = (c) => (/^(none|nil|na|n\/a|no|-+|\.+|self|individual)$/i.test(String(c.company || '').trim()) ? '' : String(c.company || '').trim());
// "1 Carton", "5 Cartons": units are stored plural.
const ONE = { Cartons: 'Carton', Bags: 'Bag', Boxes: 'Box', Pieces: 'Piece', Packs: 'Pack', Drums: 'Drum', Jars: 'Jar', Tins: 'Tin', Cans: 'Can', Bottles: 'Bottle' };
const qtyUnit = (it) => `${it.qty} ${Number(it.qty) === 1 ? ONE[it.unit] || it.unit : it.unit}`;
const BADGE = { new: s.badgeNew, confirmed: s.open, shipped: s.badgeShipped, cancelled: s.closed };

export default async function OrdersTool({ searchParams }) {
  if (!(await isAdmin())) redirect('/admin/');
  const { status, note } = await searchParams;
  let orders = [], customers = [], failed = false;
  try { [orders, customers] = await Promise.all([listOrders(), listCustomers()]); } catch (e) { console.error(e); failed = true; }
  const shown = status ? orders.filter((o) => o.status === status) : orders;
  const filters = [{ key: '', label: 'All', n: orders.length }, ...STATUSES.map((t) => ({ ...t, n: orders.filter((o) => o.status === t.key).length }))];

  return (
    <div className={`container ${s.wrap}`}>
      <div className={s.head}>
        <div>
          <h1>Orders</h1>
          <p className={s.sub}>FMCG orders placed by logged-in buyers on the website. Change the status as you confirm and ship them; buyers see it in their account.</p>
        </div>
        <div className={s.headActions}>
          <a href="/admin/orders/excel/" className="btn btn-primary btn-lg" download>Download Excel</a>
        </div>
      </div>

      {note && <p className={s.note}>{note}</p>}
      {failed && <p className={s.warn}>Could not load orders from the database. If this is the first time, the <b>customers</b> and <b>orders</b> tables still need to be created (docs/forms-setup.md, step 4).</p>}
      {!usingDatabase && <p className={s.warn}>Test mode: orders and buyer accounts are saved on this computer only.</p>}

      <div className={s.tiles}>
        <div><b>{orders.filter((o) => o.status === 'new').length}</b><span>New, to confirm</span></div>
        <div><b>{orders.length}</b><span>Orders in total</span></div>
        <div><b>{customers.length}</b><span>Buyer accounts</span></div>
      </div>

      <nav className={s.filters} aria-label="Filter by status">
        {filters.map((f) => (
          <Link key={f.key || 'all'} href={f.key ? `/admin/orders/?status=${f.key}` : '/admin/orders/'} className={s.filter} aria-current={(status || '') === f.key ? 'true' : undefined}>
            {f.label} <span>{f.n}</span>
          </Link>
        ))}
      </nav>

      {shown.length === 0 ? (
        <p className={s.empty}>{orders.length ? 'No orders with this status.' : 'No orders yet. Orders placed from the FMCG product list show up here.'}</p>
      ) : (
        <div className={s.list}>
          {shown.map((o) => {
            const c = o.customer;
            const company = companyOf(c);
            const wa = String(c.phone || '').replace(/\D/g, '');
            return (
              <details key={o.id} className={s.orderCard}>
                <summary className={s.orderSum}>
                  <div>
                    <h2>{c.name}{company && <> · {company}</>} <span className={s.meta}>· {c.country}</span></h2>
                    <span className={s.meta}><span className={`${s.badge} ${BADGE[o.status] || ''}`}>{statusLabel(o.status)}</span> · {o.number} · {ist(o.created_at)}</span>
                  </div>
                  <div className={s.count}>{o.items.length}<small>product{o.items.length === 1 ? '' : 's'}</small></div>
                </summary>
                <div className={s.orderBody}>
                  <p className={s.orderWho}>
                    <span className={s.meta}>Name</span> <b>{c.name}</b> · <span className={s.meta}>Company</span> <b>{company || '—'}</b><br />
                    <a href={`mailto:${c.email}?subject=${encodeURIComponent(`Your order ${o.number}`)}`}>{c.email}</a> · <a href={`tel:${c.phone}`}>{c.phone}</a>
                    {wa.length >= 8 && <> · <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></>}
                  </p>
                  <div className={s.tableWrap}>
                    <table className={s.table}>
                      <thead><tr><th>Product</th><th>Pack size</th><th>Brand</th><th>Quantity</th></tr></thead>
                      <tbody>
                        {o.items.map((it) => (
                          <tr key={it.slug}><td>{it.name}{it.code && <span className={s.meta}> #{it.code}</span>}</td><td>{it.pack || '—'}</td><td>{it.brand || '—'}</td><td><b>{qtyUnit(it)}</b></td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <dl className={s.orderDl}>
                    {[['Destination', o.details.port], ['Price terms', o.details.incoterm], ['Container', o.details.container], ['Wanted by', o.details.wanted], ['Notes', o.details.notes]]
                      .filter(([, v]) => v).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                  </dl>
                  <form action={setOrderStatusAction} className={s.statusForm}>
                    <input type="hidden" name="id" value={o.id} />
                    <input type="hidden" name="back" value={status || ''} />
                    <label htmlFor={`st-${o.id}`} className={s.label} style={{ margin: 0 }}>Status</label>
                    <select id={`st-${o.id}`} name="status" defaultValue={o.status} className={s.input}>
                      {STATUSES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
                    </select>
                    <button type="submit" className="btn btn-outline">Save</button>
                  </form>
                </div>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}
