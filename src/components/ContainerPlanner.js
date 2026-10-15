'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { whatsappLink } from '@/config/site';
import styles from './ContainerPlanner.module.css';

// Approximate cubic metres one tonne of each packed product occupies (bags / cartons, incl. stowage).
const ITEMS = [
  { id: 'turmeric', name: 'Turmeric fingers', group: 'Spices', vol: 2.0, color: '#f2b705' },
  { id: 'chilli', name: 'Dried red chilli', group: 'Spices', vol: 4.5, color: '#be2927' },
  { id: 'cumin', name: 'Cumin seeds', group: 'Spices', vol: 2.2, color: '#9a7b4f' },
  { id: 'coriander', name: 'Coriander seeds', group: 'Spices', vol: 3.0, color: '#b5a06b' },
  { id: 'pepper', name: 'Black pepper', group: 'Spices', vol: 1.9, color: '#3d3a33' },
  { id: 'masala', name: 'Masala blends', group: 'Spices', vol: 2.4, color: '#c4622d' },
  { id: 'basmati', name: 'Basmati rice', group: 'Staples', vol: 1.4, color: '#e9dcc0' },
  { id: 'sona', name: 'Sona Masoori rice', group: 'Staples', vol: 1.4, color: '#d8ccb0' },
  { id: 'toor', name: 'Toor dal', group: 'Staples', vol: 1.3, color: '#d9a441' },
  { id: 'chana', name: 'Chana & kabuli', group: 'Staples', vol: 1.4, color: '#c9a36a' },
  { id: 'flour', name: 'Atta, besan & suji', group: 'Staples', vol: 1.6, color: '#efe3c6' },
  { id: 'sesame', name: 'Sesame seeds', group: 'Staples', vol: 1.7, color: '#f1e6cf' },
  { id: 'snacks', name: 'Snacks & namkeen', group: 'Grocery', vol: 7.0, color: '#bcd63d' },
  { id: 'biscuits', name: 'Biscuits & rusk', group: 'Grocery', vol: 4.5, color: '#8bc34a' },
  { id: 'pickles', name: 'Pickles, pastes & ghee', group: 'Grocery', vol: 1.8, color: '#2f9a5e' },
  { id: 'pooja', name: 'Pooja & household', group: 'Grocery', vol: 5.0, color: '#0f7a46' },
];
const CONTAINERS = {
  '20': { label: '20 ft', maxT: 20, maxV: 28 },
  '40': { label: '40 ft', maxT: 26, maxV: 58 },
};
const START = { turmeric: 2, cumin: 1, basmati: 5, toor: 3, snacks: 0.5 };
const STEP = 0.5;

export default function ContainerPlanner() {
  const [size, setSize] = useState('20');
  const [qty, setQty] = useState(START);

  const c = CONTAINERS[size];
  const rows = ITEMS.filter((i) => qty[i.id] > 0);
  const { tonnes, volume } = useMemo(
    () => rows.reduce((a, i) => ({ tonnes: a.tonnes + qty[i.id], volume: a.volume + qty[i.id] * i.vol }), { tonnes: 0, volume: 0 }),
    [rows, qty]
  );
  const byWeight = tonnes / c.maxT;
  const byVolume = volume / c.maxV;
  const fill = Math.max(byWeight, byVolume);
  const limit = byVolume > byWeight ? 'volume' : 'weight';
  const over = fill > 1;

  const change = (id, d) => setQty((q) => {
    const next = Math.max(0, Math.round(((q[id] || 0) + d) * 10) / 10);
    const copy = { ...q };
    if (next === 0) delete copy[id]; else copy[id] = next;
    return copy;
  });

  const list = rows.map((i) => `• ${i.name}: ${qty[i.id]} MT`).join('\n');
  const summary = `Hello Sunita Agri Exports, I'd like a quote for a ${c.label} mixed container:\n${list}\nTotal ≈ ${tonnes.toFixed(1)} MT. Destination port: __`;
  const quoteHref = `/contact/?product=${encodeURIComponent(`${c.label} mixed container: ${rows.map((i) => `${i.name} ${qty[i.id]} MT`).join(', ')}`)}`;

  return (
    <div className={styles.planner}>
      <div className={styles.picker}>
        {['Spices', 'Staples', 'Grocery'].map((g) => (
          <div key={g} className={styles.group}>
            <p className={styles.groupName}>{g}</p>
            <div className={styles.chips}>
              {ITEMS.filter((i) => i.group === g).map((i) => (
                <button key={i.id} type="button" onClick={() => change(i.id, qty[i.id] ? 0 : 1)}
                  className={qty[i.id] ? styles.chipOn : ''} aria-pressed={!!qty[i.id]}>
                  <span className={styles.swatch} style={{ background: i.color }} /> {i.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.result}>
        <div className={styles.sizeRow} role="group" aria-label="Container size">
          {Object.entries(CONTAINERS).map(([k, v]) => (
            <button key={k} type="button" className={size === k ? styles.sizeOn : ''} aria-pressed={size === k} onClick={() => setSize(k)}>{v.label}</button>
          ))}
        </div>

        <div className={styles.box} aria-label={`Container ${Math.round(fill * 100)}% full`}>
          <div className={styles.boxInner}>
            {rows.map((i) => {
              const share = Math.max(qty[i.id] / c.maxT, (qty[i.id] * i.vol) / c.maxV);
              return <span key={i.id} className={styles.seg} style={{ flexBasis: `${(share / Math.max(fill, 1)) * Math.min(fill, 1) * 100}%`, background: i.color }} title={`${i.name} ${qty[i.id]} MT`} />;
            })}
          </div>
          <span className={styles.doors} aria-hidden="true" />
        </div>

        <p className={`${styles.big} ${over ? styles.over : ''}`}>
          {Math.round(fill * 100)}% full
          <small>{tonnes.toFixed(1)} MT · limited by {limit}</small>
        </p>
        <p className={styles.hint}>
          {over
            ? `Too much for one ${c.label}. Remove some items${size === '20' ? ' or switch to 40 ft' : ''}.`
            : `Room for about ${Math.max(0, (1 - fill) * (limit === 'weight' ? c.maxT : c.maxV / 2)).toFixed(1)} MT more.`}
        </p>

        <ul className={styles.rows}>
          {rows.map((i) => (
            <li key={i.id}>
              <span className={styles.swatch} style={{ background: i.color }} />
              <span className={styles.rowName}>{i.name}</span>
              <span className={styles.stepper}>
                <button type="button" onClick={() => change(i.id, -STEP)} aria-label={`Less ${i.name}`}>−</button>
                <b>{qty[i.id]} MT</b>
                <button type="button" onClick={() => change(i.id, STEP)} aria-label={`More ${i.name}`}>+</button>
              </span>
            </li>
          ))}
          {!rows.length && <li className={styles.empty}>Tap products on the left to start your load.</li>}
        </ul>

        <div className={styles.actions}>
          <a href={whatsappLink(summary)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" /> Send this list</a>
          <Link href={quoteHref} className="btn btn-primary">Get a price <Icon name="arrow-right" /></Link>
        </div>
        <p className={styles.note}>Estimate only. We confirm the final load plan with your quote.</p>
      </div>
    </div>
  );
}
