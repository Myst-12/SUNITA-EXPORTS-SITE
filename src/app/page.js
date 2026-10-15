import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';
import Globe from '@/components/Globe';
import { categories, getAllProducts } from '@/data/products';
import { exportOrigin, exportDestinations } from '@/data/countries';
import { HOME } from '@/data/home';
import { COMPANY, whatsappLink, yearsInBusiness } from '@/config/site';
import styles from './home.module.css';

export const metadata = {
  title: { absolute: 'Indian Spices Exporter & Indian Grocery Supplier | Sunita Agri Exports, Mumbai' },
  description:
    'Sunita Agri Exports — Indian spices, rice, pulses and FMCG groceries exported from Mumbai since 1994 to 40+ countries. Mixed containers, private label, FOB/CIF quotes in 24 hours.',
  alternates: { canonical: '/' },
};

const destinations = exportDestinations.map(({ slug, coords }) => ({ slug, coords }));

export default function HomePage() {
  const { hero, about, categories: cat, reach, quote } = HOME;
  const totalProducts = Math.floor(getAllProducts().length / 10) * 10;

  return (
    <>
      {/* 1 — Hero */}
      <section className={styles.hero}>
        <Image src={hero.image} alt={hero.imageAlt} fill priority sizes="100vw" className={styles.heroImg} />
        <span className={styles.heroScrim} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
          <p className={styles.heroLead}>{hero.lead}</p>
          <Link href="/products/" className="btn btn-light btn-lg">{hero.cta} <Icon name="arrow-right" /></Link>
        </div>
      </section>

      {/* 2 — Who we are */}
      <section className={styles.section}>
        <div className={`container ${styles.about}`}>
          <ScrollReveal>
            <h2 className={styles.title}>{about.title}</h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className={styles.text}>{about.text}</p>
            <Link href="/about/" className="link-arrow">{about.link} <Icon name="arrow-right" /></Link>
          </ScrollReveal>
          <ScrollReveal delay={140} className={styles.statsWrap}>
            <dl className={styles.stats}>
              <div><dt><CountUp value={yearsInBusiness()} suffix="+" /></dt><dd>{about.stats.years}</dd></div>
              <div><dt><CountUp value={parseInt(COMPANY.countriesServed, 10)} suffix="+" /></dt><dd>{about.stats.countries}</dd></div>
              <div><dt><CountUp value={totalProducts} suffix="+" /></dt><dd>{about.stats.products}</dd></div>
            </dl>
          </ScrollReveal>
        </div>
      </section>

      {/* 3 — Product categories */}
      <section className={`${styles.section} ${styles.soft}`}>
        <div className={`container ${styles.catGrid}`}>
          <ScrollReveal className={styles.catHead}>
            <h2 className={styles.title}>{cat.title}</h2>
            <p className={styles.text}>{cat.text}</p>
            <Link href="/products/" className="link-arrow">{cat.link} <Icon name="arrow-right" /></Link>
          </ScrollReveal>
          {categories.map((c, i) => (
            <ScrollReveal key={c.slug} delay={(i % 4) * 60}>
              <Link href={c.href} className={styles.cat}>
                <span className={styles.catImg}>
                  <Image src={c.image} alt="" fill sizes="(max-width: 860px) 50vw, 25vw" />
                </span>
                <span className={styles.catName}>{c.name}</span>
                <span className={styles.catMeta}>{c.service ? 'Services' : `${c.productCount} products`}</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4 — Global reach */}
      <section className={styles.section}>
        <div className={`container ${styles.reach}`}>
          <ScrollReveal className={styles.reachCopy}>
            <h2 className={styles.title}>{reach.title}</h2>
            <p className={styles.text}>{reach.text}</p>
            <Link href="/exports/" className="link-arrow">{reach.link} <Icon name="arrow-right" /></Link>
          </ScrollReveal>
          <ScrollReveal delay={120} className={styles.reachGlobe}>
            <Globe origin={exportOrigin} destinations={destinations} fallback="/images/globe-static.webp" label={reach.globeLabel} />
          </ScrollReveal>
        </div>
      </section>

      {/* 5 — Get a quote */}
      <section className={styles.quoteSection}>
        <div className="container">
          <ScrollReveal className={styles.quote}>
            <h2 className={styles.title}>{quote.title}</h2>
            <p className={styles.text}>{quote.text}</p>
            <div className={styles.quoteActions}>
              <Link href="/contact/" className="btn btn-primary btn-lg">{quote.cta} <Icon name="arrow-right" /></Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={styles.quoteLink}>{quote.whatsapp}</a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
