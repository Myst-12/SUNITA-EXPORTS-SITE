'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductGallery.module.css';

export default function ProductGallery({ images = [], alt }) {
  const list = [...new Set(images)].filter(Boolean);
  const [active, setActive] = useState(0);
  if (!list.length) return null;

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        {list.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? alt : `${alt} — export packing & bulk view ${i}`}
            fill
            priority={i === 0}
            sizes="(max-width: 900px) 100vw, 50vw"
            className={i === active ? styles.visible : styles.hidden}
          />
        ))}
      </div>
      <p className={styles.note}>Image for illustration; actual product may vary by grade and lot.</p>
      {list.length > 1 && (
        <div className={styles.thumbs} role="tablist" aria-label="Product images">
          {list.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show image ${i + 1}`}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
              onClick={() => setActive(i)}
            >
              <Image src={src} alt="" fill sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
