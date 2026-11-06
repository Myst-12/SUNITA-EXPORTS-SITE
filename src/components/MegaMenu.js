'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import styles from './MegaMenu.module.css';

/**
 * Products menu: categories on the left, the chosen category's products with photos in the middle,
 * and a card about the category on the right. Hover or focus a category to switch.
 */
export default function MegaMenu({ categories, onNavigate }) {
  const [active, setActive] = useState(categories[0]?.slug);
  const timer = useRef(null);
  const cat = categories.find((c) => c.slug === active) || categories[0];
  if (!cat) return null;

  // A short delay so passing over other categories on the way to the products doesn't switch them.
  const hover = (slug) => { clearTimeout(timer.current); timer.current = setTimeout(() => setActive(slug), 70); };
  const pick = (slug) => { clearTimeout(timer.current); setActive(slug); };

  return (
    <div className={styles.mega} onMouseLeave={() => clearTimeout(timer.current)}>
      <ul className={styles.rail} role="list">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={c.href}
              className={`${styles.cat} ${c.slug === cat.slug ? styles.catOn : ''}`}
              onMouseEnter={() => hover(c.slug)}
              onFocus={() => pick(c.slug)}
              onClick={onNavigate}
              aria-current={c.slug === cat.slug ? 'true' : undefined}
            >
              <span className={styles.catImg}>{c.image && <Image src={c.image} alt="" fill sizes="44px" />}</span>
              <span className={styles.catText}>
                <b>{c.name}</b>
                <small>{c.count} products</small>
              </span>
              <Icon name="arrow-right" size={16} className={styles.catArrow} />
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.list} key={cat.slug}>
        <div className={styles.listHead}>
          <p className={styles.listTitle}>{cat.name}</p>
          <Link href={cat.href} className={styles.viewAll} onClick={onNavigate}>View all {cat.count} <Icon name="arrow-right" size={15} /></Link>
        </div>
        <ul className={styles.items} role="list">
          {cat.items.map((p, i) => (
            <li key={p.href} style={{ '--i': i }}>
              <Link href={p.href} className={styles.prod} onClick={onNavigate}>
                <span className={styles.prodImg}>
                  {p.image ? <Image src={p.image} alt="" fill sizes="40px" /> : <span aria-hidden="true">{p.name[0]}</span>}
                </span>
                <span className={styles.prodName}>{p.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <aside className={styles.card} key={`c-${cat.slug}`}>
        <div className={styles.cardImg}>{cat.image && <Image src={cat.image} alt="" fill sizes="300px" />}</div>
        <div className={styles.cardBody}>
          <p className={styles.cardTitle}>{cat.name}</p>
          <p className={styles.cardText}>{cat.blurb}</p>
          <Link href={`/contact/?product=${encodeURIComponent(cat.name)}`} className={`btn btn-primary btn-sm ${styles.cardBtn}`} onClick={onNavigate}>
            Request a quote <Icon name="arrow-right" size={15} />
          </Link>
        </div>
      </aside>
    </div>
  );
}
