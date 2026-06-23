import Link from 'next/link';
import styles from './ProductCard.module.css';

export default function ProductCard({ name, slug, icon, description, href, isCategory = false, productCount }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageArea}>
        <span className={styles.iconOverlay} aria-hidden="true">{icon || '📦'}</span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.meta}>
          {productCount && (
            <span className={styles.count}>{productCount} Products</span>
          )}
          <Link href={href} className={styles.link}>
            {isCategory ? 'View Products' : 'View Specifications'} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
