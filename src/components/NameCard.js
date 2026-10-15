import styles from './NameCard.module.css';

const TONES = ['green', 'lime', 'turmeric', 'cream'];
const tone = (key = '') => TONES[[...key].reduce((n, c) => n + c.charCodeAt(0), 0) % TONES.length];

/**
 * Clean typographic stand-in for products without a verified photo (taxonomy rule DEV-06:
 * never show a wrong or generic image). Fills its positioned parent.
 */
export default function NameCard({ name, botanical, label, size = 'md', toneKey }) {
  return (
    <div className={`${styles.card} ${styles[tone(toneKey || name)]} ${styles[size]}`} role="img" aria-label={name}>
      {label && <span className={styles.label}>{label}</span>}
      <span className={styles.name}>{name}</span>
      {botanical && <span className={styles.botanical}>{botanical}</span>}
    </div>
  );
}
