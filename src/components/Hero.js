'use client';

import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        {/* Left Content */}
        <div className={styles.left}>
          <span className={styles.badge}>🌿 Govt. Recognised Star Export House</span>

          <h1 className={styles.title}>
            Delivering Premium
            <br />
            Indian Flavours
            <br />
            to the World
          </h1>

          <p className={styles.subtitle}>
            Trusted wholesale exporter of APEDA-certified Indian spices, basmati
            rice, pulses, and agri-commodities from Mumbai. Serving food
            importers, manufacturers, and distributors across the USA, UK, UAE,
            and 40+ countries.
          </p>

          <div className={styles.actions}>
            <Link href="/contact" className={styles.btnPrimary}>
              Request a Sample
            </Link>
            <Link href="/products" className={styles.btnSecondary}>
              Explore Our Products
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className={styles.right}>
          <div className={styles.circle}>
            <div className={styles.circleInner1} />
            <div className={styles.circleInner2} />
            <div className={styles.circleInner3} />
            <div className={styles.circleInner4} />
          </div>

          <div className={`${styles.floatingCard} ${styles.cardTop}`}>
            ✅ ISO 22000 Certified
          </div>
          <div className={`${styles.floatingCard} ${styles.cardBottom}`}>
            🌍 40+ Countries
          </div>
          <div className={`${styles.floatingCard} ${styles.cardLeft}`}>
            📅 Est. 1994
          </div>
        </div>
      </div>
    </section>
  );
}
