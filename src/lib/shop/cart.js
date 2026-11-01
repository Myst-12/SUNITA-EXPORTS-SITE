'use client';

import { useMemo, useSyncExternalStore } from 'react';

// The order being built, kept in the browser until it is placed. Lines: { slug, qty, unit, pack, brand }.
const KEY = 'sx_order_v1';
const EVENT = 'sx-order-change';

export function readCart() {
  try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; } catch { return []; }
}

export function writeCart(lines) {
  try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* private mode: the order lives for this page only */ }
  window.dispatchEvent(new Event(EVENT));
}

export const clearCart = () => writeCart([]);

function subscribe(onChange) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => { window.removeEventListener(EVENT, onChange); window.removeEventListener('storage', onChange); };
}
const snapshot = () => { try { return localStorage.getItem(KEY) || '[]'; } catch { return '[]'; } };

/** The cart, kept in step across components and tabs. `ready` is false until the browser copy is read. */
export function useCart() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  const lines = useMemo(() => { try { const v = JSON.parse(raw || '[]'); return Array.isArray(v) ? v : []; } catch { return []; } }, [raw]);
  return {
    lines, ready: raw !== null,
    put: (line) => writeCart([...readCart().filter((l) => l.slug !== line.slug), line]),
    remove: (slug) => writeCart(readCart().filter((l) => l.slug !== slug)),
    update: (slug, patch) => writeCart(readCart().map((l) => (l.slug === slug ? { ...l, ...patch } : l))),
  };
}
