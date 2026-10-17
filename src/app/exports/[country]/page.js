import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import ProductCard from '@/components/ProductCard';
import FaqSection from '@/components/FaqSection';
import Icon from '@/components/Icon';
import { exportDestinations } from '@/data/countries';
import { getAllProducts } from '@/data/products';
import { MARKET_CONTENT } from '@/data/marketContent';
import { COMPANY, CONTACT, whatsappLink, flagCode } from '@/config/site';
import s from '../../pages.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return exportDestinations.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }) {
  const { country } = await params;
  const c = exportDestinations.find((d) => d.slug === country);
  if (!c) return { title: 'Market not found' };
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: `/exports/${c.slug}/` },
  };
}

const HERO_IMG = {
  'Middle East': '/images/scenes/dubai.webp',
  Europe: '/images/scenes/port-crane.webp',
  'North America': '/images/scenes/ship-aerial.webp',
  Oceania: '/images/scenes/port-day.webp',
  Asia: '/images/scenes/port-night.webp',
  Africa: '/images/scenes/port-truck.webp',
};

const FEATURED = ['turmeric-fingers', 'cumin-seeds', 'dried-red-chillies', '1121-basmati-rice', 'chana-dal', 'snacks-namkeen', 'green-cardamom', 'garam-masala'];

export default async function CountryPage({ params }) {
  const { country } = await params;
  const c = exportDestinations.find((d) => d.slug === country);
  if (!c) notFound();

  const all = getAllProducts();
  const extra = MARKET_CONTENT[c.slug] || {};
  const featured = (extra.featured || FEATURED).map((slug) => all.find((p) => p.slug === slug)).filter(Boolean);
  const name = c.name;
  const faqs = [
    { question: `Do you export Indian spices and groceries to ${name}?`, answer: `Yes. Sunita Agri Exports ships Indian spices, rice, pulses and FMCG groceries to importers, distributors and supermarkets in ${name}, as full or mixed containers from Mumbai.` },
    { question: `Which ports in ${name} do you ship to?`, answer: `We regularly quote CFR / CIF to ${c.shippingPorts.join(', ')}. Other ports can be quoted on request.` },
    { question: `What documents are needed to import into ${name}?`, answer: `Typically: ${c.certificationsRequired.join(', ')}, plus the commercial invoice, packing list and bill of lading. We prepare the export side and coordinate with your clearing agent.` },
    { question: `How do I get a price delivered to ${name}?`, answer: `Send your product list, quantities and destination port through the quote form or WhatsApp ${CONTACT.quotePhone.display}. We reply with FOB and CFR / CIF prices within 24 hours.` },
    ...(extra.faqs || []),
  ];
  const others = exportDestinations.filter((d) => d.slug !== c.slug);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Export Markets', href: '/exports/' }, { label: name, href: `/exports/${c.slug}/` }]}
        eyebrow={`${c.region} · Exports to ${name}`}
        title={`Indian spices, rice & grocery exporter to ${name}`}
        lead={c.introText}
        image={HERO_IMG[c.region] || '/images/scenes/port-day.webp'}
        imageAlt={`Shipping to ${name}`}
      >
        <Link href={`/contact/?product=${encodeURIComponent(`Shipment to ${name}`)}`} className="btn btn-primary btn-lg">Get a CIF quote <Icon name="arrow-right" /></Link>
        <a href={whatsappLink(`Hello, I am an importer in ${name}. Please share your price list.`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg"><Icon name="whatsapp" /> WhatsApp</a>
      </PageHero>

      <section className={`section-sm ${s.tintLime}`}>
        <div className="container">
          <div className={s.features}>
            <div className={s.feature}>
              <span className="icon-tile lime"><Icon name="package" /></span>
              <h3>Popular in {name}</h3>
              <div className="chip-row mt-1">{c.keyProducts.map((k) => <span key={k} className="chip">{k}</span>)}</div>
            </div>
            <div className={s.feature}>
              <span className="icon-tile"><Icon name="ship" /></span>
              <h3>Destination ports</h3>
              <div className="chip-row mt-1">{c.shippingPorts.map((k) => <span key={k} className="chip">{k}</span>)}</div>
            </div>
            <div className={s.feature}>
              <span className="icon-tile turmeric"><Icon name="file" /></span>
              <h3>Import documents</h3>
              <ul className={s.checklist} style={{ marginTop: 6 }}>
                {c.certificationsRequired.map((k) => <li key={k} style={{ fontSize: '0.88rem' }}><Icon name="check-circle" size={16} /> {k}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {extra.sections && (
        <section className="section">
          <div className="container" style={{ maxWidth: 820 }}>
            {extra.sections.map((sec) => (
              <div key={sec.title} style={{ marginBottom: '2.25rem' }}>
                <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', marginBottom: '0.8rem' }}>{sec.title}</h2>
                {sec.paras.map((para) => <p key={para.slice(0, 40)} className="lead" style={{ fontSize: '1.02rem', marginBottom: '0.9rem' }}>{para}</p>)}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Export range</span>
              <h2>Products we ship to {name}</h2>
              <p className="lead">{COMPANY.countriesServed} countries, 400+ products — in bulk, retail packs or your own private label.</p>
            </div>
            <Link href="/products/" className="link-arrow">All products <Icon name="arrow-right" /></Link>
          </div>
          <div className="grid-4">
            {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <section className={`section-sm ${s.tintWarm}`}>
        <div className="container">
          <div className={s.band}>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: 680 }}>
              <h2>One container for your whole Indian range</h2>
              <p>Combine spices, rice, pulses and FMCG groceries in a single mixed container to {name} — one supplier, one set of documents.</p>
              <Link href="/mixed-container/" className="btn btn-accent mt-2">How mixed containers work <Icon name="arrow-right" /></Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} eyebrow={`Importing into ${name}`} title={`${name} buyer FAQ`} />

      <section className="section-sm">
        <div className="container">
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Other export markets</h2>
          <div className="chip-row">
            {others.map((d) => (
              <Link key={d.slug} href={`/exports/${d.slug}/`} className="chip"><b style={{ fontSize: '0.7rem' }}>{flagCode(d.flag)}</b> {d.name}</Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
