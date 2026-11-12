'use client';

import Link from '@/components/Link';
import Icon from './Icon';
import { useCart } from '@/lib/shop/cart';
import { orderLoad, fillLabel } from '@/lib/shop/load';
import s from './OrderBar.module.css';

/** Fixed bar at the bottom while the order has products: count, weight, container estimate, and the way to review it. */
export default function OrderBar() {
  const { lines, ready } = useCart();
  if (!ready || !lines.length) return null;
  const { kg, m3 } = orderLoad(lines);
  return (
    <div className={s.bar} role="region" aria-label="Your order">
      <span className={s.sum}>
        <span><b>{lines.length}</b> product{lines.length === 1 ? '' : 's'}</span>
        {kg > 0 && <span className={s.long}>{kg.toLocaleString('en-IN')} kg</span>}
        {m3 > 0 && <span className={s.fill}><span className={s.long}>{fillLabel(m3)}</span><span className={s.short}>{fillLabel(m3, true)}</span></span>}
      </span>
      <Link href="/order/" className="btn btn-primary"><span>Review<span className={s.long}> &amp; order</span></span> <Icon name="arrow-right" /></Link>
    </div>
  );
}
