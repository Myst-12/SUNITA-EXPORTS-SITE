import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import NameCard from './NameCard';
import AddToEnquiry from './AddToEnquiry';
import styles from './ProductCard.module.css';

/**
 * Product / category card.
 * New usage: <ProductCard product={p} />
 * Legacy usage (older pages): <ProductCard name href description image productCount isCategory />
 */
export default function ProductCard({ product, name, href, description, image, productCount, isCategory = false, priority = false, cta }) {
  const title = product ? product.name : name;
  // A product card can point somewhere other than its details page (FMCG families open the product list).
  const link = href || (product ? `/products/${product.category}/${product.slug}/` : href);
  const img = product ? product.image : image;
  const meta = product
    ? [product.forms?.[0], product.hsCode && `HS ${product.hsCode}`].filter(Boolean).join(' · ')
    : productCount ? `${productCount} products` : '';

  const card = (
    <Link href={link} className={styles.card}>
      <div className={styles.media}>
        {img ? (
          <Image src={img} alt={title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" priority={priority} />
        ) : product ? (
          <NameCard name={product.shortName || title} botanical={product.latin} size="sm" toneKey={product.slug} />
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
            {cta || (isCategory ? 'View range' : 'Details')} <Icon name="arrow-right" size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
  // Bulk products get a "+" to collect several into one quote request; FMCG families order through their own list.
  if (!product || href || product.type === 'fmcg') return card;
  return <div className={styles.addWrap}>{card}<AddToEnquiry compact slug={product.slug} name={product.name} /></div>;
}
