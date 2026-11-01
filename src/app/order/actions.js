'use server';

import { redirect } from 'next/navigation';
import { currentCustomer } from '@/lib/shop/auth';
import { createOrder } from '@/lib/shop/store';
import { orderableProducts, UNITS, INCOTERMS, CONTAINERS } from '@/lib/shop/catalog';
import { sendOrderAlert, sendOrderConfirmation } from '@/lib/shop/mail';

const clip = (v, max) => String(v ?? '').trim().slice(0, max);

/** Checks the browser's order line by line against the catalogue; anything unknown is dropped. */
function readItems(raw) {
  let lines;
  try { lines = JSON.parse(raw); } catch { return []; }
  if (!Array.isArray(lines)) return [];
  const products = Object.fromEntries(orderableProducts().map((p) => [p.slug, p]));
  const seen = new Set();
  return lines.slice(0, 100).flatMap((l) => {
    const p = products[l?.slug];
    const qty = Math.floor(Number(l?.qty));
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
