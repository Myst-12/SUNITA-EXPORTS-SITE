'use client';

import { useRef } from 'react';
import Icon from './Icon';
import styles from './ScrollStrip.module.css';

/** Sideways strip with ← → buttons for mouse users (phones and trackpads just swipe). */
export default function ScrollStrip({ className, label, children }) {
  const ref = useRef(null);
  const move = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };
  return (
    <div className={styles.wrap}>
      <div ref={ref} className={className} role="list" aria-label={label}>{children}</div>
      <div className={styles.nav}>
        <button type="button" onClick={() => move(-1)} aria-label="Previous photos"><Icon name="arrow-right" size={18} className={styles.flip} /></button>
        <button type="button" onClick={() => move(1)} aria-label="Next photos"><Icon name="arrow-right" size={18} /></button>
      </div>
    </div>
  );
}
