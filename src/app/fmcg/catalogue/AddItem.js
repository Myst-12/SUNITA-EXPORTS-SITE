'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import { useCart } from '@/lib/shop/cart';
import s from './catalogue.module.css';

/** Quantity and Add for one product row. The line keeps what the order page and container estimate need. */
export default function AddItem({ item }) {
  const { lines, put, remove } = useCart();
  const line = lines.find((l) => l.key === item.key);
  const [draft, setDraft] = useState(null); // null: show what is already in the order
  const value = draft ?? (line ? String(line.qty) : '');
  const n = Math.floor(Number(value));
  const valid = n >= 1 && n <= 1e6;
  const changed = !line || line.qty !== n;
  const id = `qty-${item.key}`;

  const add = (e) => {
    e.preventDefault();
    if (!valid) return;
    put({ slug: `sku-${item.key}`, ...item, qty: n });
    setDraft(null);
  };

  return (
    <form className={s.add} onSubmit={add}>
      <label htmlFor={id} className="visually-hidden">Quantity of {item.name}, in {item.unit.toLowerCase()}</label>
      <input id={id} type="number" inputMode="numeric" min="1" max="1000000" step="1" placeholder="Qty" value={value} onChange={(e) => setDraft(e.target.value)} />
      <span className={s.unit}>{item.unit}</span>
      <button type="submit" className={`${s.addBtn} ${line && !changed ? s.added : ''}`} disabled={!valid || !changed}>
        {line && !changed ? <><Icon name="check" size={16} /> Added</> : line ? 'Update' : 'Add'}
      </button>
      {line && <button type="button" className={s.removeBtn} onClick={() => { remove(line.slug); setDraft(null); }} aria-label={`Remove ${item.name} from the order`}>Remove</button>}
    </form>
  );
}
