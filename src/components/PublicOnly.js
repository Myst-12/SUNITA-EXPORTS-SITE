'use client';

import { usePathname } from 'next/navigation';

/** Renders its children everywhere except the admin area (no WhatsApp or chat buttons there). */
export default function PublicOnly({ children }) {
  return (usePathname() || '').startsWith('/admin') ? null : children;
}
