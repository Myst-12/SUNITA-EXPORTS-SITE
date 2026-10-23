import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import ScrollReveal from '@/components/ScrollReveal';
import Globe from '@/components/Globe';
import SocialLinks from '@/components/SocialLinks';
import ScrollStrip from '@/components/ScrollStrip';
import { categories, productCategories, getAllProducts } from '@/data/products';
import { exportOrigin, exportDestinations } from '@/data/countries';
import { HOME } from '@/data/home';
import { certificates } from '@/data/certificates';
import { whatsappLink } from '@/config/site';
import { websiteSchema } from '@/lib/schemas';
import styles from './home.module.css';

export const metadata = {
  title: { absolute: 'Indian Grocery, FMCG & Spices Exporter | Sunita Agri Exports, Mumbai' },
  description:
    'Indian grocery and FMCG exporter: spices, rice, pulses and branded Indian groceries shipped from Mumbai since 2010 to the UAE, Saudi Arabia, the Gulf and 40+ countries. Mixed containers, private label, FOB/CIF quotes in 24 hours.',
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
  const { hero, process, categories: cat, directors, certificates: certs, exhibitions, reach, quote } = HOME;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }} />
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
            <p className={styles.text}>{cat.text(productCategories.length, getAllProducts().length)}</p>
            <Link href="/products/" className="link-arrow">{cat.link} <Icon name="arrow-right" /></Link>
          </ScrollReveal>
          {categories.map((c, i) => c.service ? (
            <ScrollReveal key={c.slug} className={styles.catWideWrap}>
              <Link href={c.href} className={styles.catWide}>
                <span className={styles.catWideImg}><Image src={c.image} alt="" fill sizes="(max-width: 860px) 100vw, 40vw" /></span>
                <span className={styles.catWideBody}>
                  <span className={styles.catWideName}>{c.name}</span>
                  <span className={styles.catWideText}>Your brand on Indian spices, rice, flours and groceries — custom packs, labels and mixed containers, packed in Mumbai.</span>
                  <span className="link-arrow">How private label works <Icon name="arrow-right" /></span>
                </span>
              </Link>
            </ScrollReveal>
          ) : (
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

      {/* 3 — Directors' message: text left, portraits right */}
      <section className={`${styles.section} ${styles.directorsSection}`}>
        <div className={`container ${styles.directors}`}>
          <ScrollReveal className={styles.directorsCopy}>
            <blockquote className={styles.directorsQuote}>“{directors.quote}”</blockquote>
            {directors.paras.map((p) => <p key={p.slice(0, 30)} className={styles.text}>{p}</p>)}
            <p className={styles.directorsSign}>— {directors.sign}</p>
          </ScrollReveal>
          <ScrollReveal delay={120} className={styles.directorsPics}>
            {directors.people.map((d, i) => (
              <figure key={d.image} className={styles.directorPic}>
                <div className={styles.directorImg}><Image src={d.image} alt={`${d.name}, ${d.role}`} fill sizes="(max-width: 860px) 50vw, 28vw" /></div>
                <figcaption><b>{d.name}</b><span>{d.role}</span></figcaption>
              </figure>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 3a — Exhibition highlights + social */}
      <section className={`${styles.section} ${styles.expoSection}`}>
        <div className="container">
          <ScrollReveal className={styles.expoHead}>
            <div>
              <h2 className={styles.title}>{exhibitions.title}</h2>
              <p className={styles.text}>{exhibitions.text}</p>
            </div>
            <SocialLinks label={exhibitions.follow} />
          </ScrollReveal>
        </div>
        <ScrollStrip className={styles.expoStrip} label={exhibitions.title}>
          {exhibitions.photos.map((p) => (
            <figure key={p.src} className={styles.expoItem} role="listitem">
              <div className={styles.expoImg}><Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 70vw, 280px" /></div>
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </ScrollStrip>
      </section>

      {/* 3b — Proof: real certificates, each opens its PDF */}
      <section className={styles.certSection} aria-labelledby="home-certs">
        <div className="container">
          <div className={styles.certHead}>
            <h2 id="home-certs" className={styles.certTitle}>{certs.title}</h2>
            <Link href="/certifications/#certificates" className="link-arrow">{certs.link} <Icon name="arrow-right" /></Link>
          </div>
        </div>
        <ul className={styles.certStrip}>
          {certificates.map((c) => (
            <li key={c.key}>
              <a href={c.pdf} target="_blank" rel="noopener noreferrer" className={styles.certItem} aria-label={`${c.name} certificate (PDF)`}>
                <span className={styles.certThumb}><Image src={c.image} alt="" fill sizes="96px" /></span>
                <span className={styles.certName}>{c.short}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 — How we operate: text left, image right */}
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

      {/* 5 — Global reach */}
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

      {/* 7 — Get a quote */}
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
