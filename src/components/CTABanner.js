import Link from 'next/link';
import styles from './CTABanner.module.css';

export default function CTABanner({ headline, subtext, primaryCTA, secondaryCTA }) {
  return (
    <section className={styles.banner} id="cta-banner">
      <div className={styles.patternOverlay}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.left}>
          <h2 className={styles.title}>{headline}</h2>
          <p className={styles.subtext}>{subtext}</p>
        </div>
        <div className={styles.right}>
          {primaryCTA && (
            <Link href={primaryCTA.href} className={styles.btnWhite}>
              {primaryCTA.label}
            </Link>
          )}
          {secondaryCTA && (
            <Link href={secondaryCTA.href} className={styles.btnOutline}>
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
