import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ProductCard from '@/components/ProductCard';
import FaqSection from '@/components/FaqSection';
import Icon from '@/components/Icon';
import { getAllProducts } from '@/data/products';
import { exportDestinations } from '@/data/countries';
import { whatsappLink, flagCode } from '@/config/site';
import s from '@/app/pages.module.css';

// Shared layout for the pages written around one buyer search ("Indian grocery exporter", …).
export default function SeoLanding({ crumb, href, eyebrow, title, lead, image, imageAlt, quote, sections, range, rangeTitle, featured, faqs, faqTitle }) {
  const all = getAllProducts();
  const products = featured.map((slug) => all.find((p) => p.slug === slug)).filter(Boolean);
  const gulf = exportDestinations.filter((d) => d.region === 'Middle East');
  const rest = exportDestinations.filter((d) => d.region !== 'Middle East');

  return (
    <>
      <PageHero crumbs={[{ label: crumb, href }]} eyebrow={eyebrow} title={title} lead={lead} image={image} imageAlt={imageAlt}>
        <Link href={`/contact/?product=${encodeURIComponent(quote)}`} className="btn btn-primary btn-lg">Get a quote <Icon name="arrow-right" /></Link>
        <a href={whatsappLink(`Hello, I am interested in: ${quote}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg"><Icon name="whatsapp" /> WhatsApp</a>
      </PageHero>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          {sections.map((sec) => (
            <div key={sec.title} style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', marginBottom: '0.8rem' }}>{sec.title}</h2>
              {sec.paras.map((para) => <p key={para.slice(0, 40)} className="lead" style={{ fontSize: '1.02rem', marginBottom: '0.9rem' }}>{para}</p>)}
            </div>
          ))}
        </div>
      </section>

      <section className={`section ${s.tintLime}`}>
        <div className="container">
          <div className="section-head"><div><span className="eyebrow">The range</span><h2>{rangeTitle}</h2></div></div>
          <div className={s.features}>
            {range.map((r) => (
              <Link key={r.title} href={r.href} className={s.feature} style={{ color: 'inherit' }}>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Popular with importers</span><h2>Best-selling products</h2></div>
            <Link href="/products/" className="link-arrow">All products <Icon name="arrow-right" /></Link>
          </div>
          <div className="grid-4">{products.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        </div>
      </section>

      <section className={`section-sm ${s.tintWarm}`}>
        <div className="container">
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Middle East markets we ship to</h2>
          <div className="chip-row" style={{ marginBottom: '1.5rem' }}>
            {gulf.map((d) => <Link key={d.slug} href={`/exports/${d.slug}/`} className="chip"><b style={{ fontSize: '0.7rem' }}>{flagCode(d.flag)}</b> {d.name}</Link>)}
          </div>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.8rem' }}>Other markets</h2>
          <div className="chip-row">
            {rest.map((d) => <Link key={d.slug} href={`/exports/${d.slug}/`} className="chip"><b style={{ fontSize: '0.7rem' }}>{flagCode(d.flag)}</b> {d.name}</Link>)}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} eyebrow="Buyer FAQ" title={faqTitle} />
    </>
  );
}
