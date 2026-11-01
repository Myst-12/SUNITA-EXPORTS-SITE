'use server';

import { redirect } from 'next/navigation';
import { currentCustomer } from '@/lib/shop/auth';
import { createOrder } from '@/lib/shop/store';
import { orderableProducts, UNITS, INCOTERMS, CONTAINERS } from '@/lib/shop/catalog';
import { getFmcgItem } from '@/lib/shop/fmcg';
import { sendOrderAlert, sendOrderConfirmation } from '@/lib/shop/mail';

const clip = (v, max) => String(v ?? '').trim().slice(0, max);

/** Checks the browser's order line by line against the catalogues; anything unknown is dropped.
 *  Lines with a `key` are items from the FMCG product list (packing fixed, ordered in cartons/bags);
 *  older lines with only a `slug` are category orders with the buyer's own pack size and brand. */
function readItems(raw) {
  let lines;
  try { lines = JSON.parse(raw); } catch { return []; }
  if (!Array.isArray(lines)) return [];
  const products = Object.fromEntries(orderableProducts().map((p) => [p.slug, p]));
  const seen = new Set();
  return lines.slice(0, 300).flatMap((l) => {
    const qty = Math.floor(Number(l?.qty));
    if (l?.key) {
      const it = getFmcgItem(l.key);
      if (!it || seen.has(`sku-${it.key}`) || !(qty >= 1 && qty <= 1e6)) return [];
      seen.add(`sku-${it.key}`);
      return [{ slug: `sku-${it.key}`, code: it.key, name: it.brand ? `${it.brand} ${it.product}` : it.product, brand: it.brand, pack: it.pack, qty, unit: it.unit }];
    }
    const p = products[l?.slug];
    if (!p || seen.has(p.slug) || !(qty >= 1 && qty <= 1e6)) return [];
    seen.add(p.slug);
    return [{ slug: p.slug, name: p.name, qty, unit: UNITS.includes(l.unit) ? l.unit : UNITS[0], pack: clip(l.pack, 80), brand: clip(l.brand, 80) }];
  });
}

export async function placeOrderAction(_prev, fd) {
  const customer = await currentCustomer();
  if (!customer) redirect('/account/login/?next=/order/');
  const items = readItems(String(fd.get('items') || ''));
  if (!items.length) return { error: 'Your order is empty. Add products from the FMCG page first.' };
  const pick = (k, list) => (list.includes(String(fd.get(k))) ? String(fd.get(k)) : '');
  const details = {
    port: clip(fd.get('port'), 80),
    incoterm: pick('incoterm', INCOTERMS),
    container: pick('container', CONTAINERS),
    wanted: clip(fd.get('wanted'), 20),
    notes: clip(fd.get('notes'), 1500),
  };
  if (!details.port) return { error: 'Please tell us the destination port or city.' };
  let order;
  try {
    order = await createOrder({ customer, items, details });
  } catch (e) {
    console.error(e);
    return { error: 'Your order could not be saved just now. Please try again in a minute, or send it on WhatsApp.' };
  }
  await Promise.all([sendOrderAlert(order), sendOrderConfirmation(order)]);
  redirect(`/account/?placed=${encodeURIComponent(order.number)}`);
}
