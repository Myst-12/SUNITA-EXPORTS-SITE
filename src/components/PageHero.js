import Image from 'next/image';
import Breadcrumb from './Breadcrumb';
import styles from './PageHero.module.css';

/** Inner-page hero: breadcrumb, eyebrow, H1, lead, actions and an optional image. */
export default function PageHero({ crumbs = [], eyebrow, title, lead, image, imageAlt = '', children, compact = false }) {
  return (
    <section className={`${styles.hero} ${compact ? styles.compact : ''}`}>
      <span className={styles.glow} aria-hidden="true" />
      <div className="container">
        {crumbs.length > 0 && <Breadcrumb inline items={crumbs} />}
        <div className={image ? styles.grid : styles.single}>
          <div className={styles.copy}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            {lead && <p className="lead">{lead}</p>}
            {children && <div className={styles.actions}>{children}</div>}
          </div>
          {image && (
            <div className={styles.media}>
              <Image src={image} alt={imageAlt} fill priority sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
