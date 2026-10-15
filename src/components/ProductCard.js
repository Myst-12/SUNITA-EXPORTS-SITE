import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import styles from './ProductCard.module.css';

/**
 * Product / category card.
 * New usage: <ProductCard product={p} />
 * Legacy usage (older pages): <ProductCard name href description image productCount isCategory />
 */
export default function ProductCard({ product, name, href, description, image, productCount, isCategory = false, priority = false }) {
  const title = product ? product.name : name;
  const link = product ? `/products/${product.category}/${product.slug}/` : href;
  const img = product ? product.image : image;
  const meta = product
    ? [product.hsCode && `HS ${product.hsCode}`, product.forms?.[0]].filter(Boolean).join(' · ')
    : productCount ? `${productCount} products` : '';

  return (
    <Link href={link} className={styles.card}>
      <div className={styles.media}>
        {img ? (
          <Image src={img} alt={title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" priority={priority} />
        ) : (
          <span className={styles.placeholder}><Icon name="leaf" size={32} /></span>
        )}
      </div>
      <div className={styles.body}>
        {product?.categoryName && <span className={styles.cat}>{product.categoryName}</span>}
        <h3 className={styles.title}>{title}</h3>
        {!product && description && <p className={styles.desc}>{description}</p>}
        <div className={styles.foot}>
          {meta && <span className={styles.meta}>{meta}</span>}
          <span className={styles.cta}>
            {isCategory ? 'View range' : 'Details'} <Icon name="arrow-right" size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
