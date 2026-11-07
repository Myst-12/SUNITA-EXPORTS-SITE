'use client';

import { useMemo, useSyncExternalStore } from 'react';

// Bulk products a buyer has picked for one quote request, kept in the browser until the quote form is sent.
// Items: { slug, name }. Separate from the FMCG order cart (src/lib/shop/cart.js).
const KEY = 'sx_enquiry_v1';
const EVENT = 'sx-enquiry-change';
const MAX = 25;

export function readBasket() {
  try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; } catch { return []; }
}

function write(items) {
  try { localStorage.setItem(KEY, JSON.stringify(items.slice(0, MAX))); } catch { /* private mode: lives for this page only */ }
  window.dispatchEvent(new Event(EVENT));
}

export const clearBasket = () => write([]);

function subscribe(onChange) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => { window.removeEventListener(EVENT, onChange); window.removeEventListener('storage', onChange); };
}
const snapshot = () => { try { return localStorage.getItem(KEY) || '[]'; } catch { return '[]'; } };

/** The basket, kept in step across components and tabs. `ready` is false until the browser copy is read. */
export function useBasket() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  const items = useMemo(() => { try { const v = JSON.parse(raw || '[]'); return Array.isArray(v) ? v : []; } catch { return []; } }, [raw]);
  return {
    items, ready: raw !== null,
    has: (slug) => items.some((i) => i.slug === slug),
    toggle: (item) => write(readBasket().some((i) => i.slug === item.slug) ? readBasket().filter((i) => i.slug !== item.slug) : [...readBasket(), item]),
    remove: (slug) => write(readBasket().filter((i) => i.slug !== slug)),
  };
}
