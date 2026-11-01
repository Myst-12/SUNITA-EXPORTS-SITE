'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { useCart } from '@/lib/shop/cart';
import { orderLoad, fillLabel } from '@/lib/shop/load';
import { placeOrderAction } from './actions';
import s from '../account/account.module.css';

function Submit({ disabled }) {
  const { pending } = useFormStatus();
  return <button type="submit" className={`btn btn-primary btn-lg ${s.submit}`} disabled={disabled || pending}>{pending ? 'Placing order…' : 'Place order'}</button>;
}

/** Edit the lines from the browser's order, add shipping details, and send it. */
export default function OrderReview({ products, units, incoterms, containers, customer }) {
  const { lines, ready, update, remove } = useCart();
  const [state, action] = useActionState(placeOrderAction, {});
  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
  // Product-list lines carry their own name and packing; older category lines are looked up.
  const items = lines.filter((l) => l.key || bySlug[l.slug]);
  const { kg, m3 } = orderLoad(items);

  if (ready && !items.length) {
    return (
      <div className={s.empty}>
        <p>Your order is empty.</p>
        <Link href="/fmcg/catalogue/" className="btn btn-primary">Choose FMCG products</Link>
      </div>
    );
  }

  return (
    <form action={action} className={s.review}>
      <input type="hidden" name="items" value={JSON.stringify(items)} />
      <div className={s.authCard}>
        <h2 className={s.h2} style={{ marginTop: 0 }}>Products</h2>
        {items.map((l) => {
          const id = (k) => `${l.slug}-${k}`;
          const qtyInput = <input id={id('qty')} type="number" inputMode="numeric" min="1" max="1000000" required value={l.qty} onChange={(e) => update(l.slug, { qty: e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value)) || 1) })} />;
          if (l.key) {
            return (
              <div key={l.slug} className={s.item}>
                <div className={`${s.thumb} ${s.thumbIcon}`}><Icon name="package" size={26} /></div>
                <div>
                  <div className={s.itemTop}>
                    <h3>{l.name}</h3>
                    <button type="button" className={s.remove} onClick={() => remove(l.slug)}>Remove</button>
                  </div>
                  <p className={s.small}>{l.pack} · item {l.key}</p>
                  <div className={s.itemFields}>
                    <div className="field"><label htmlFor={id('qty')}>Qty ({l.unit.toLowerCase()})</label>{qtyInput}</div>
                  </div>
                </div>
              </div>
            );
          }
          const p = bySlug[l.slug];
          return (
            <div key={l.slug} className={s.item}>
              <div className={s.thumb}><Image src={p.image} alt="" fill sizes="64px" /></div>
              <div>
                <div className={s.itemTop}>
                  <h3>{p.name}</h3>
                  <button type="button" className={s.remove} onClick={() => remove(l.slug)}>Remove</button>
                </div>
                <div className={s.itemFields}>
                  <div className="field"><label htmlFor={id('qty')}>Qty</label>{qtyInput}</div>
                  <div className="field"><label htmlFor={id('unit')}>Unit</label><select id={id('unit')} value={l.unit} onChange={(e) => update(l.slug, { unit: e.target.value })}>{units.map((u) => <option key={u}>{u}</option>)}</select></div>
                  <div className="field"><label htmlFor={id('pack')}>Pack size</label><input id={id('pack')} maxLength={80} value={l.pack} placeholder="e.g. 500 g × 20" onChange={(e) => update(l.slug, { pack: e.target.value })} /></div>
                  <div className="field"><label htmlFor={id('brand')}>Brand</label><input id={id('brand')} maxLength={80} value={l.brand} placeholder="Any / your label" onChange={(e) => update(l.slug, { brand: e.target.value })} /></div>
                </div>
              </div>
            </div>
          );
        })}
        <p className={s.small} style={{ marginTop: 12 }}><Link href="/fmcg/catalogue/" style={{ color: 'var(--green-700)', fontWeight: 700 }}>+ Add more products</Link></p>
      </div>

      <div className={`${s.authCard} ${s.side}`}>
        <h2 className={s.h2} style={{ margin: 0 }}>Shipping</h2>
        <div className="field"><label htmlFor="port">Destination port or city</label><input id="port" name="port" required maxLength={80} placeholder="e.g. Jebel Ali, Dubai" /></div>
        <div className={s.row}>
          <div className="field"><label htmlFor="incoterm">Price terms</label><select id="incoterm" name="incoterm" defaultValue={incoterms[0]}>{incoterms.map((t) => <option key={t}>{t}</option>)}</select></div>
          <div className="field"><label htmlFor="container">Container</label><select id="container" name="container" defaultValue={containers[containers.length - 1]}>{containers.map((t) => <option key={t}>{t}</option>)}</select></div>
        </div>
        <div className="field"><label htmlFor="wanted">Wanted by (optional)</label><input id="wanted" name="wanted" type="month" /></div>
        <div className="field"><label htmlFor="notes">Notes (optional)</label><textarea id="notes" name="notes" maxLength={1500} placeholder="Labelling, shelf-life needs, documents, anything else" /></div>
        <div className={s.totals}><span>Products</span><span>{items.length}</span></div>
        {kg > 0 && <div className={s.totals} style={{ paddingTop: 0 }}><span>Estimated load</span><span>{kg.toLocaleString('en-IN')} kg · {fillLabel(m3, true)}</span></div>}
        <p className={s.small}>Ordering as {customer.name}{customer.company ? `, ${customer.company}` : ''} · {customer.email}. Our team confirms prices, availability and shipping dates before anything is final.</p>
        {state.error && <p className={s.err} role="alert">{state.error}</p>}
        <Submit disabled={!ready} />
      </div>
    </form>
  );
}
