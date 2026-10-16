import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import ScrollReveal from '@/components/ScrollReveal';
import Globe from '@/components/Globe';
import { categories } from '@/data/products';
import { exportOrigin, exportDestinations } from '@/data/countries';
import { HOME } from '@/data/home';
import { whatsappLink } from '@/config/site';
import styles from './home.module.css';

export const metadata = {
  title: { absolute: 'Indian Spices Exporter & Indian Grocery Supplier | Sunita Agri Exports, Mumbai' },
  description:
    'Sunita Agri Exports — Indian spices, rice, pulses and FMCG groceries exported from Mumbai since 2010 to 40+ countries. Mixed containers, private label, FOB/CIF quotes in 24 hours.',
  alternates: { canonical: '/' },
};

const destinations = exportDestinations.map(({ slug, coords }) => ({ slug, coords }));

// Markets grouped by region for the reach section (Turkey's 'Europe / Middle East' sits with Europe).
const REGION_ORDER = ['Middle East', 'North America', 'Europe', 'Asia', 'Oceania', 'Africa'];
const regions = REGION_ORDER.map((r) => ({
  name: r,
  markets: exportDestinations.filter((d) => d.region.split(' / ')[0] === r),
})).filter((r) => r.markets.length);

export default function HomePage() {
  const { hero, process, categories: cat, reach, quote } = HOME;

  return (
    <>
      {/* 1 — Hero */}
      <section className={styles.hero}>
        <Image src={hero.image} alt={hero.imageAlt} fill priority quality={90} sizes="100vw" className={styles.heroImg} />
        <span className={styles.heroScrim} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
          <p className={styles.heroLead}>{hero.lead}</p>
          <p className={styles.heroTrust}>{hero.trust}</p>
          <Link href="/products/" className="btn btn-light btn-lg">{hero.cta} <Icon name="arrow-right" /></Link>
        </div>
      </section>

      {/* 2 — Product categories */}
      <section className={styles.section}>
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

      {/* 3 — How we operate: text left, image right */}
      <section className={`${styles.section} ${styles.soft}`}>
        <div className={`container ${styles.process}`}>
          <ScrollReveal>
            <h2 className={styles.title}>{process.title}</h2>
            <p className={styles.text}>{process.text}</p>
            <ol className={styles.steps}>
              {process.steps.map((s, i) => (
                <li key={s.title}>
                  <span className={styles.stepNo}>{String(i + 1).padStart(2, '0')}</span>
                  <div><h3>{s.title}</h3><p>{s.text}</p></div>
                </li>
              ))}
            </ol>
          </ScrollReveal>
          <ScrollReveal delay={120} className={styles.processImg}>
            <Image src={process.image} alt={process.imageAlt} fill sizes="(max-width: 860px) 100vw, 45vw" />
          </ScrollReveal>
        </div>
      </section>

      {/* 4 — Global reach */}
      <section className={`${styles.section} ${styles.reachSection}`}>
        <div className={`container ${styles.reach}`}>
          <ScrollReveal className={styles.reachCopy}>
            <h2 className={styles.title}>{reach.title}</h2>
            <p className={styles.text}>{reach.text}</p>
            <dl className={styles.regions}>
              {regions.map((r) => (
                <div key={r.name}>
                  <dt>{r.name}</dt>
                  <dd>{r.markets.map((m, i) => (
                    <span key={m.slug}>{i > 0 && ', '}<Link href={`/exports/${m.slug}/`}>{m.name}</Link></span>
                  ))}</dd>
                </div>
              ))}
            </dl>
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
