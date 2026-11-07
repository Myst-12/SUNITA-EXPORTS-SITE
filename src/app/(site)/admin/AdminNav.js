'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './admin.module.css';

/** Bar under the site header: dashboard, one tab per tool, log out. Hidden on the full-screen QR. */
export default function AdminNav({ tools, logout }) {
  const path = usePathname();
  if (path.endsWith('/show/')) return null;
  const tabs = [{ slug: 'home', name: 'Dashboard', href: '/admin/' }, ...tools];
  const active = (t) => (t.slug === 'home' ? path === '/admin/' || path === '/admin' : path.startsWith(t.href));
  return (
    <div className={s.adminBar}>
      <div className={`container ${s.adminBarIn}`}>
        <nav className={s.tabs} aria-label="Admin">
          {tabs.map((t) => (
            <Link key={t.slug} href={t.href} className={s.tab} aria-current={active(t) ? 'page' : undefined}>
              {t.short || t.name}{t.soon && <small>Soon</small>}
            </Link>
          ))}
        </nav>
        <form action={logout}><button className={s.logout} type="submit">Log out</button></form>
      </div>
    </div>
  );
}
