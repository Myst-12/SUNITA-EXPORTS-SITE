'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import s from './catalogue.module.css';

/** Search box that updates the list as you type (and still works as a plain form without script). */
export default function CatalogueSearch({ q, cat }) {
  const router = useRouter();
  const [value, setValue] = useState(q);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const t = setTimeout(() => {
      const p = new URLSearchParams();
      if (value.trim()) p.set('q', value.trim());
      if (cat) p.set('c', cat);
      router.replace(`/fmcg/catalogue/${p.size ? `?${p}` : ''}`, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [value, cat, router]);

  return (
    <form action="/fmcg/catalogue/" className={s.search} role="search" onSubmit={(e) => e.preventDefault()}>
      <Icon name="search" size={20} />
      <label htmlFor="fmcg-q" className="visually-hidden">Search products</label>
      <input id="fmcg-q" name="q" type="search" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search a brand or product, e.g. Haldiram bhujia" autoComplete="off" maxLength={80} />
      {cat && <input type="hidden" name="c" value={cat} />}
    </form>
  );
}
