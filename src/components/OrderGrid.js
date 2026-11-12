'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from '@/components/Link';
import Icon from './Icon';
import { useCart } from '@/lib/shop/cart';
import s from './OrderGrid.module.css';

function OrderCard({ product, line, onAdd, onRemove }) {
  // Starts from the line already in the order, if any; the grid remounts the card when that line changes.
  const [qty, setQty] = useState(line ? String(line.qty) : '');
  const [unit, setUnit] = useState(line?.unit || 'Cartons');
  const [pack, setPack] = useState(line?.pack || '');
  const [brand, setBrand] = useState(line?.brand || '');

  const n = Math.floor(Number(qty));
  const valid = n >= 1;
  const changed = !line || line.qty !== n || line.unit !== unit || (line.pack || '') !== pack.trim() || (line.brand || '') !== brand.trim();
  const id = (k) => `${product.slug}-${k}`;

  const add = (e) => {
    e.preventDefault();
    if (valid) onAdd({ slug: product.slug, qty: n, unit, pack: pack.trim(), brand: brand.trim() });
  };

  return (
    <form className={`${s.card} ${line ? s.inOrder : ''}`} onSubmit={add}>
      <div className={s.img}><Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw" /></div>
      <div className={s.body}>
        <h3>{product.name}</h3>
        <p className={s.desc}>{product.description}</p>
        <dl className={s.facts}>
          <dt>Packaging</dt><dd>{product.packaging.slice(0, 2).join(', ')}</dd>
        </dl>
        <div className={s.fields}>
          <div className={s.field}>
            <label htmlFor={id('pack')}>Pack size</label>
            <input id={id('pack')} value={pack} onChange={(e) => setPack(e.target.value)} maxLength={80} placeholder="e.g. 500 g × 20" />
          </div>
          <div className={s.field}>
            <label htmlFor={id('brand')}>Brand</label>
            <input id={id('brand')} value={brand} onChange={(e) => setBrand(e.target.value)} maxLength={80} placeholder="Any / your label" />
          </div>
        </div>
        <div className={s.qtyRow}>
          <div className={s.qty}>
            <label htmlFor={id('qty')}>Qty</label>
            <input id={id('qty')} type="number" inputMode="numeric" min="1" max="1000000" step="1" required value={qty} onChange={(e) => setQty(e.target.value)} />
            <select aria-label="Unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option>Cartons</option><option>Packs</option><option>Kg</option>
            </select>
          </div>
          <button type="submit" className={`${s.add} ${line && !changed ? s.added : ''}`} disabled={!valid || !changed}>
            {line && !changed ? <><Icon name="check" size={17} /> Added</> : line ? 'Update' : <>Add <span aria-hidden="true">+</span></>}
          </button>
        </div>
        {line && <button type="button" className={s.remove} onClick={() => onRemove(product.slug)}>Remove from order</button>}
      </div>
    </form>
  );
}

/** FMCG order cards. Lines go into the browser's order; the bar at the bottom leads to review and log in. */
export default function OrderGrid({ products }) {
  const { lines, ready, put, remove } = useCart();
  const bySlug = Object.fromEntries(lines.map((l) => [l.slug, l]));
  const count = lines.filter((l) => products.some((p) => p.slug === l.slug)).length;
  return (
    <>
      <div className={s.grid}>
        {products.map((p) => <OrderCard key={`${p.slug}:${JSON.stringify(bySlug[p.slug] || '')}`} product={p} line={bySlug[p.slug]} onAdd={put} onRemove={remove} />)}
      </div>
      {ready && count > 0 && (
        <div className={s.bar} role="region" aria-label="Your order">
          <span><b>{count}</b> product{count === 1 ? '' : 's'}<span className={s.long}> in your order</span></span>
          <Link href="/order/" className="btn btn-primary"><span>Review<span className={s.long}> &amp; place order</span></span> <Icon name="arrow-right" /></Link>
        </div>
      )}
    </>
  );
}
