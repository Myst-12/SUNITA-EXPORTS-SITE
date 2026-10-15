import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug, getProductBySlug, getRelatedProducts } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import Icon from '@/components/Icon';
import { SITE_URL, COMPANY, CONTACT, whatsappLink, yearsInBusiness } from '@/config/site';
import { faqSchema } from '@/lib/schemas';
import styles from './product.module.css';

export const dynamicParams = false;

export async function generateStaticParams() {
  return categories.flatMap((cat) => cat.products.map((p) => ({ category: cat.slug, product: p.slug })));
}

export async function generateMetadata({ params }) {
  const { category, product: slug } = await params;
  const product = getProductBySlug(category, slug);
  if (!product) return { title: 'Product not found' };
  const url = `/products/${category}/${product.slug}/`;
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: product.metaTitle, description: product.metaDescription, url, images: [{ url: product.image }] },
  };
}

const shortName = (name) => name.split(' (')[0];

function buildFaqs(p, cat) {
  const n = shortName(p.name);
  const faqs = [
    {
      question: `What is the minimum order quantity for ${n}?`,
      answer: `For bulk ${n.toLowerCase()} we usually start at 1 metric ton. You can also add ${n.toLowerCase()} to a mixed 20 ft or 40 ft container with other spices, rice, pulses or Indian groceries — ideal for trial orders and smaller importers.`,
    },
    {
      question: `Which packaging options are available for ${n}?`,
      answer: `${p.packaging.join(', ')}. Private label packing with your own artwork and barcodes is available${p.privateLabelAvailable ? '' : ' on request'}.`,
    },
    {
      question: `What is the HS code and origin of your ${n.toLowerCase()}?`,
      answer: `${p.hsCode ? `The HS code is ${p.hsCode}. ` : ''}Origin: ${p.origin}. Every shipment is supported by a commercial invoice, packing list, certificate of origin, phytosanitary certificate (where applicable) and a certificate of analysis.`,
    },
    {
      question: `How do I get the current export price for ${n}?`,
      answer: `Send us your required grade, packing, quantity and destination port through the quote form or WhatsApp (${CONTACT.quotePhone.display}). We quote FOB Nhava Sheva, CFR or CIF — usually within 24 hours.`,
    },
  ];
  if (p.steamSterilized) {
    faqs.push({
      question: `Can you supply steam-sterilised ${n.toLowerCase()} for the USA, EU or Australia?`,
      answer: `Yes. Steam sterilisation and residue testing can be arranged for ${n.toLowerCase()} to meet microbiological and import requirements in the USA, EU, UK, Australia and New Zealand.`,
    });
  }
  return faqs;
}

export default async function ProductDetailPage({ params }) {
  const { category, product: slug } = await params;
  const product = getProductBySlug(category, slug);
  const cat = getCategoryBySlug(category);
  if (!product || !cat) notFound();

  const n = shortName(product.name);
  const related = getRelatedProducts(product.relatedProducts).slice(0, 4);
  const faqs = buildFaqs(product, cat);
  const specs = Object.entries(product.specifications || {});
  const waText = `Hello Sunita Agri Exports, please send your export price for ${product.name}. Quantity: __ / Destination port: __`;
  const quoteHref = `/contact/?product=${encodeURIComponent(product.name)}`;

  const facts = [
    product.hsCode && { icon: 'file', label: 'HS code', value: product.hsCode },
    { icon: 'pin', label: 'Origin', value: product.origin },
    { icon: 'clock', label: 'Shelf life', value: product.shelfLife },
    { icon: 'scale', label: 'MOQ', value: '1 MT or part of a mixed container' },
    { icon: 'ship', label: 'Port', value: CONTACT.port },
    { icon: 'globe', label: 'Terms', value: 'FOB · CFR · CIF' },
  ].filter(Boolean);

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.gallery.map((g) => `${SITE_URL}${g}`),
    category: cat.name,
    brand: { '@type': 'Brand', name: COMPANY.name },
    manufacturer: { '@type': 'Organization', name: COMPANY.legalName, url: SITE_URL },
    countryOfOrigin: { '@type': 'Country', name: 'India' },
    ...(product.hsCode ? { additionalProperty: [{ '@type': 'PropertyValue', name: 'HS code', value: product.hsCode }] } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      {/* ===== TOP ===== */}
      <section className={styles.top}>
        <div className="container">
          <Breadcrumb inline items={[{ label: 'Products', href: '/products/' }, { label: cat.name, href: `/products/${cat.slug}/` }, { label: n, href: `/products/${cat.slug}/${product.slug}/` }]} />
          <div className={styles.topGrid}>
            <ProductGallery images={product.gallery} alt={`${product.name} exported from India`} />

            <div className={styles.info}>
              <Link href={`/products/${cat.slug}/`} className="chip">{cat.name}</Link>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.kicker}>Exporter &amp; bulk supplier from India · since {COMPANY.foundingYear}</p>
              <p className={styles.desc}>{product.description}</p>

              <dl className={styles.facts}>
                {facts.map((f) => (
                  <div key={f.label} className={styles.fact}>
                    <Icon name={f.icon} size={18} />
                    <div>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              {product.forms?.length > 0 && (
                <div className={styles.optionRow}>
                  <span className={styles.optionLabel}>Forms</span>
                  <div className="chip-row">{product.forms.map((f) => <span key={f} className="chip">{f}</span>)}</div>
                </div>
              )}
              {product.grades?.length > 0 && (
                <div className={styles.optionRow}>
                  <span className={styles.optionLabel}>Grades</span>
                  <div className="chip-row">{product.grades.map((g) => <span key={g} className="chip chip-lime">{g}</span>)}</div>
                </div>
              )}

              <div className={`btn-row ${styles.ctas}`}>
                <Link href={quoteHref} className="btn btn-primary btn-lg">Request today’s price <Icon name="arrow-right" /></Link>
                <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg"><Icon name="whatsapp" /> WhatsApp</a>
              </div>

              <ul className={styles.assurance}>
                <li><Icon name="check-circle" size={16} /> Lab-tested, CoA with every lot</li>
                {product.steamSterilized && <li><Icon name="check-circle" size={16} /> Steam sterilisation available</li>}
                {product.privateLabelAvailable && <li><Icon name="check-circle" size={16} /> Private label packing</li>}
                <li><Icon name="check-circle" size={16} /> Samples on request</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DETAILS ===== */}
      <section className="section-sm">
        <div className={`container ${styles.detailGrid}`}>
          <div className={styles.detailMain}>
            {specs.length > 0 && (
              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Typical specifications</h2>
                <div className={styles.tableWrap}>
                  <table className="spec-table">
                    <tbody>
                      {specs.map(([k, v]) => (
                        <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={styles.note}>Values are typical. Final specifications are confirmed per contract and lot, with a certificate of analysis.</p>
              </div>
            )}

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Packaging options</h2>
              <div className={styles.packGrid}>
                {product.packaging.map((p, i) => (
                  <div key={p} className={styles.packItem}>
                    <span className={`icon-tile ${i % 3 === 1 ? 'lime' : i % 3 === 2 ? 'turmeric' : ''}`}><Icon name={/private|label/i.test(p) ? 'tag' : /carton|box/i.test(p) ? 'box' : /bag|sack|jute|pp/i.test(p) ? 'package' : 'layers'} /></span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
              <p className={styles.note}>Container loading: about 18–24 MT per 20 ft FCL depending on product and packing. Mixed loads planned to your list.</p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Why buyers source {n.toLowerCase()} from us</h2>
              <ul className={styles.why}>
                <li><Icon name="sprout" size={20} /><div><strong>Sourced at origin</strong><p>Procured from {product.origin.replace('India (', '').replace(')', '') || 'key Indian growing regions'} through suppliers we have worked with for years.</p></div></li>
                <li><Icon name="factory" size={20} /><div><strong>Cleaned to export spec</strong><p>Destoning, gravity separation, Sortex cleaning and grinding as required — consistent lot after lot.</p></div></li>
                <li><Icon name="container" size={20} /><div><strong>Bulk or mixed container</strong><p>Ship {n.toLowerCase()} in a full container or combine it with other spices, staples and FMCG in one load.</p></div></li>
                <li><Icon name="award" size={20} /><div><strong>{yearsInBusiness()}+ years of exports</strong><p>{COMPANY.status} shipping to {COMPANY.countriesServed} countries with complete documentation.</p></div></li>
              </ul>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>{n} — frequently asked questions</h2>
              <div className="faq-list">
                {faqs.map((f, i) => (
                  <details key={f.question} className="faq-item" open={i === 0}>
                    <summary>{f.question}</summary>
                    <div className="faq-answer">{f.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className={styles.side}>
            <div className={styles.quoteCard}>
              <p className={styles.quoteEyebrow}>Get a quote</p>
              <h3>Price for {n}</h3>
              <p>Tell us grade, packing, quantity and destination port. We reply within 24 hours.</p>
              <ol className={styles.quoteSteps}>
                <li>Choose grade &amp; packing</li>
                <li>Share quantity &amp; port</li>
                <li>Receive FOB / CIF offer</li>
              </ol>
              <Link href={quoteHref} className="btn btn-primary btn-block">Request price <Icon name="arrow-right" /></Link>
              <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-block"><Icon name="whatsapp" /> WhatsApp {CONTACT.quotePhone.display}</a>
              <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Quote request: ${product.name}`)}`} className={styles.quoteMail}><Icon name="mail" size={16} /> {CONTACT.email}</a>
            </div>
            <Link href="/mixed-container/" className={styles.sideLink}>
              <Icon name="container" size={22} />
              <span><strong>Add to a mixed container</strong><small>Combine with other products in one shipment</small></span>
              <Icon name="arrow-right" size={18} />
            </Link>
            <a href="/downloads/sunita-agri-exports-catalogue.pdf" download className={styles.sideLink}>
              <Icon name="download" size={22} />
              <span><strong>Full product catalogue</strong><small>PDF · all categories</small></span>
              <Icon name="arrow-right" size={18} />
            </a>
          </aside>
        </div>
      </section>

      {/* ===== RELATED ===== */}
      {related.length > 0 && (
        <section className="section-sm section-soft">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Complete your order</span>
                <h2>Related products</h2>
              </div>
              <Link href={`/products/${cat.slug}/`} className="link-arrow">All {cat.name.toLowerCase()} <Icon name="arrow-right" /></Link>
            </div>
            <div className="grid-4">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky CTA */}
      <div className={styles.mobileBar} data-mobilebar>
        <Link href={quoteHref} className="btn btn-primary">Get price</Link>
        <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" /> WhatsApp</a>
      </div>
    </>
  );
}
