'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import Icon from './Icon';
import styles from './ProductExplorer.module.css';

// Unfiltered, each category shows its first products (`preview`) and a link to the rest, which keeps this page light.
// The full list is fetched on the first search, filter or hover over the search bar, then every match is shown.
export default function ProductExplorer({ preview, total, categories }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [full, setFull] = useState(null);
  const loading = useRef(null);
  const load = () => {
    loading.current ||= fetch('/products-index.json').then((r) => r.json()).then(setFull).catch(() => { loading.current = null; });
  };
  const active = cat !== 'all' || query.trim() !== '';
  useEffect(() => { if (active) load(); }, [active]);
  const products = full || preview;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (cat !== 'all' && p.category !== cat) return false; // main category only, matching the chip counts
      if (!q) return true;
      const hay = [p.name, p.latin, p.categoryName, p.hsCode, ...p.forms, p.q].join(' ').toLowerCase();
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [products, query, cat]);

  return (
    <div>
      <div className={styles.bar} onPointerEnter={load} onFocus={load}>
        <label className={styles.search}>
          <Icon name="search" size={18} />
          <span className="visually-hidden">Search products</span>
          <input
            type="search"
            placeholder="Search cumin, ashwagandha, 1121, Withania, 0910…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className={styles.chips} role="group" aria-label="Filter by category">
          <button type="button" className={cat === 'all' ? styles.on : ''} onClick={() => setCat('all')}>All · {total}</button>
          {categories.map((c) => (
            <button key={c.slug} type="button" className={cat === c.slug ? styles.on : ''} onClick={() => setCat(c.slug)}>
              {c.name} · {c.count}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.count} aria-live="polite">{active && !full ? 'Loading products…' : `${active ? filtered.length : total} product${(active ? filtered.length : total) === 1 ? '' : 's'}`}</p>

      {active && !full ? null : filtered.length ? (
        cat === 'all' ? (
          // All products: one section per category, in catalogue order.
          categories.map((c) => {
            const all = filtered.filter((p) => p.category === c.slug);
            if (!all.length) return null;
            const items = query.trim() ? all : all.slice(0, 8);
            const count = query.trim() ? all.length : c.primary;
            return (
              <section key={c.slug} className={styles.group}>
                <h2 className={styles.groupTitle}>{c.name}</h2>
                <div className="grid-4">
                  {items.map((p, i) => <ProductCard key={p.slug} product={p} priority={c.slug === categories[0].slug && i < 4} />)}
                </div>
                {items.length < count && (
                  <div className={styles.more}>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => { setCat(c.slug); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                      Show all {count} {c.name.toLowerCase()}
                    </button>
                    <a href={`/products/${c.slug}/`} className="link-arrow">{c.name} page <Icon name="arrow-right" /></a>
                  </div>
                )}
              </section>
            );
          })
        ) : (
          <div className="grid-4">
            {filtered.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 4} />)}
          </div>
        )
      ) : (
        <div className={styles.empty}>
          <p><strong>No match in our online list.</strong> We source most Indian food products on request — send us your requirement.</p>
          <a href="/contact/" className="btn btn-primary btn-sm">Request a product</a>
        </div>
      )}
    </div>
  );
}
