'use client';

import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import Icon from './Icon';
import styles from './ProductExplorer.module.css';

export default function ProductExplorer({ products, categories }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (cat !== 'all' && !p.categories.includes(cat)) return false;
      if (!q) return true;
      const hay = [p.name, p.latin, p.categoryName, p.subcategoryName, p.hsCode, ...p.forms, ...p.grades].join(' ').toLowerCase();
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [products, query, cat]);

  return (
    <div>
      <div className={styles.bar}>
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
          <button type="button" className={cat === 'all' ? styles.on : ''} onClick={() => setCat('all')}>All · {products.length}</button>
          {categories.map((c) => (
            <button key={c.slug} type="button" className={cat === c.slug ? styles.on : ''} onClick={() => setCat(c.slug)}>
              {c.name} · {c.count}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.count} aria-live="polite">{filtered.length} product{filtered.length === 1 ? '' : 's'}</p>

      {filtered.length ? (
        <div className="grid-4">
          {filtered.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 4} />)}
        </div>
      ) : (
        <div className={styles.empty}>
          <p><strong>No match in our online list.</strong> We source most Indian food products on request — send us your requirement.</p>
          <a href="/contact/" className="btn btn-primary btn-sm">Request a product</a>
        </div>
      )}
    </div>
  );
}
