import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProducts, getCategoryBySlug, getProductBySlug, getRelatedProducts, productUrl, quoteUrl, specSheetUrl } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import NameCard from '@/components/NameCard';
import Icon from '@/components/Icon';
import { SITE_URL, COMPANY, CONTACT, whatsappLink } from '@/config/site';
import { faqSchema } from '@/lib/schemas';
import { getLocalNames } from '@/data/catalog/localNames';
import { detailRows, containerLoadText, SPEC_ON_REQUEST, SPEC_DISCLAIMER, FEED_NOTE, REGULATED_NOTE, FMCG_NOTE, ON_REQUEST } from '@/lib/productDetails';
import styles from './product.module.css';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata({ params }) {
  const { category, product: slug } = await params;
  const product = getProductBySlug(category, slug);
  if (!product) return { title: 'Product not found' };
  const url = productUrl(product);
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: product.metaTitle, description: product.metaDescription, url, ...(product.image ? { images: [{ url: product.image }] } : {}) },
  };
}

function buildFaqs(p) {
  const n = p.shortName;
  const lower = n.toLowerCase();
  const load = containerLoadText(p);
  const faqs = [];
  if (p.latin) {
    faqs.push({ question: `What is the botanical name of ${lower}?`, answer: `${p.name} is supplied as ${p.latin}. ${p.forms.length ? `Available forms: ${p.forms.join(', ')}.` : ''}`.trim() });
  }
  faqs.push(
    {
      question: `What is the minimum order quantity for ${lower}?`,
      answer: p.type === 'fmcg'
        ? `FMCG products ship as part of a mixed container. Tell us the brands, pack sizes and carton quantities you need and we confirm availability and destination eligibility.`
        : `For bulk ${lower} we usually start at 1 metric ton. You can also add it to a mixed 20 ft or 40 ft container with other products — useful for trial orders and smaller importers.`,
    },
    {
      question: `How is ${lower} packed for export?`,
      answer: `${p.packaging.join('; ')}.${p.type !== 'fmcg' ? ` Indicative container load: 20 ft — ${load.twenty}; 40 ft — ${load.forty}.` : ''} Private label packing with your artwork and barcodes is available.`,
    },
    {
      question: `Where can I get the specification for ${lower}?`,
      answer: Object.keys(p.specifications).length
        ? `Typical specifications are listed on this page and in the downloadable specification sheet (PDF). Final values are confirmed per contract with a certificate of analysis.`
        : `Download the specification sheet (PDF) on this page for product details. ${SPEC_ON_REQUEST}`,
    },
    {
      question: `How do I get the current export price for ${lower}?`,
      answer: `Send your required grade, packing, quantity and destination port through the quote form or WhatsApp (${CONTACT.quotePhone.display}). We quote FOB ${CONTACT.port.split(' (')[0]}, CFR or CIF, usually within 24 hours.`,
    },
  );
  return faqs;
}

export default async function ProductDetailPage({ params }) {
  const { category, product: slug } = await params;
  const product = getProductBySlug(category, slug);
  const cat = getCategoryBySlug(category);
  if (!product || !cat) notFound();

  const n = product.shortName;
  const related = getRelatedProducts(product.relatedProducts);
  const faqs = buildFaqs(product);
  const specs = Object.entries(product.specifications);
  const rows = detailRows(product);
  const localNames = getLocalNames(product.slug);
  const quoteHref = quoteUrl(product);
  const pdfHref = specSheetUrl(product);
  const pdfName = `${product.slug}-specification-sunita-agri-exports.pdf`;
  const waText = `Hello Sunita Agri Exports, please send your export price for ${product.name}. Quantity: __ / Destination port: __`;
  const alsoIn = (product.also || []).map((a) => getCategoryBySlug(a.category)).filter(Boolean);
  const notes = [product.feedOnly && FEED_NOTE, product.regulated && REGULATED_NOTE, product.type === 'fmcg' && FMCG_NOTE].filter(Boolean);
  const url = `${SITE_URL}${productUrl(product)}`;

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    ...(localNames.length ? { alternateName: localNames.map(([, , name]) => name) } : {}),
    description: product.description,
    url,
    ...(product.image ? { image: product.gallery.map((g) => `${SITE_URL}${g}`) } : {}),
    category: `${cat.name}${product.subcategoryName ? ` > ${product.subcategoryName}` : ''}`,
    brand: { '@type': 'Brand', name: COMPANY.name },
    manufacturer: { '@type': 'Organization', name: COMPANY.legalName, url: SITE_URL },
    countryOfOrigin: { '@type': 'Country', name: 'India' },
    additionalProperty: [
      product.botanicalName && { '@type': 'PropertyValue', name: 'Botanical name', value: product.botanicalName },
      product.hsCode && { '@type': 'PropertyValue', name: 'HS code', value: product.hsCode },
      product.forms.length && { '@type': 'PropertyValue', name: 'Forms', value: product.forms.join(', ') },
      ...specs.map(([k, v]) => ({ '@type': 'PropertyValue', name: k, value: v })),
    ].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <section className={styles.top}>
        <div className="container">
          <Breadcrumb inline items={[{ label: 'Products', href: '/products/' }, { label: cat.name, href: `/products/${cat.slug}/` }, { label: n, href: productUrl(product) }]} />
          <div className={styles.topGrid}>
            {product.image ? (
              <ProductGallery images={product.gallery} alt={`${product.name}${product.forms[0] ? ` — ${product.forms[0].toLowerCase()}` : ''}, exported from India`} />
            ) : (
              <div className={styles.nameCard}>
                <NameCard name={product.name} botanical={product.latin} label={product.subcategoryName || cat.name} toneKey={product.slug} />
              </div>
            )}

            <div className={styles.info}>
              <Link href={`/products/${cat.slug}/`} className="chip">{cat.name}{product.subcategoryName && cat.subcategories.length > 1 && !cat.flat ? ` · ${product.subcategoryName}` : ''}</Link>
              <h1 className={styles.title}>{product.name}</h1>
              {product.latin && <p className={styles.botanical}>{product.latin}</p>}
              <p className={styles.desc}>{product.description}</p>

              <dl className={styles.facts}>
                <div className={styles.fact}><Icon name="pin" size={18} /><div><dt>Origin</dt><dd>{product.origin || 'Confirmed per lot'}</dd></div></div>
                {product.hsCode && <div className={styles.fact}><Icon name="file" size={18} /><div><dt>HS code</dt><dd>{product.hsCode}</dd></div></div>}
                {/* Show a known fact in each tile; when a value is still "on request", show what is always true instead. */}
                {product.type !== 'fmcg' && product.containerLoad?.twenty
                  ? <div className={styles.fact}><Icon name="container" size={18} /><div><dt>20 ft load</dt><dd>{containerLoadText(product).twenty}</dd></div></div>
                  : <div className={styles.fact}><Icon name="scale" size={18} /><div><dt>Minimum order</dt><dd>{product.type === 'fmcg' ? 'Mixed container' : '1 MT or mixed container'}</dd></div></div>}
                {product.shelfLife
                  ? <div className={styles.fact}><Icon name="clock" size={18} /><div><dt>Shelf life</dt><dd>{product.shelfLife}</dd></div></div>
                  : <div className={styles.fact}><Icon name="ship" size={18} /><div><dt>Ships from</dt><dd>{CONTACT.port.split(' (')[0]}, Mumbai</dd></div></div>}
              </dl>

              {product.forms.length > 0 && (
                <div className={styles.optionRow}>
                  <span className={styles.optionLabel}>{product.type === 'fmcg' ? 'Packs' : 'Forms'}</span>
                  <div className="chip-row">{product.forms.map((f) => <span key={f} className="chip">{f}</span>)}</div>
                </div>
              )}
              {product.grades.length > 0 && (
                <div className={styles.optionRow}>
                  <span className={styles.optionLabel}>Grades</span>
                  <div className="chip-row">{product.grades.map((g) => <span key={g} className="chip chip-lime">{g}</span>)}</div>
                </div>
              )}

              {notes.map((t) => <p key={t} className={styles.notice}><Icon name="shield" size={16} /> {t}</p>)}

              <div className={`btn-row ${styles.ctas}`}>
                <Link href={quoteHref} className="btn btn-primary btn-lg">Request quote <Icon name="arrow-right" /></Link>
                <a href={pdfHref} download={pdfName} className="btn btn-outline btn-lg"><Icon name="download" /> Download specification sheet</a>
              </div>
              <p className={styles.ctaNote}>PDF · product details{specs.length ? ', specification table' : ''} and contact details</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className={`container ${styles.detailGrid}`}>
          <div className={styles.detailMain}>
            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Product details</h2>
              <div className={styles.tableWrap}>
                <table className="spec-table">
                  <tbody>
                    {rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
                  </tbody>
                </table>
              </div>
              {product.containerLoad && <p className={styles.note}>Container loads are indicative and depend on packing and shipping-line weight limits.</p>}
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>{specs.length ? 'Typical specifications' : 'Specifications'}</h2>
              {specs.length > 0 ? (
                <>
                  <div className={styles.tableWrap}>
                    <table className="spec-table">
                      <tbody>{specs.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
                    </table>
                  </div>
                  <p className={styles.note}>{SPEC_DISCLAIMER}</p>
                </>
              ) : (
                <div className={styles.onRequest}>
                  <p>{SPEC_ON_REQUEST}</p>
                  <Link href={quoteHref} className="link-arrow">Ask for the full specification <Icon name="arrow-right" /></Link>
                </div>
              )}
            </div>

            {localNames.length > 0 && (
              <div className={styles.block}>
                <h2 className={styles.blockTitle}>{n} in other languages</h2>
                <dl className={`notranslate ${styles.names}`} translate="no">
                  {localNames.map(([code, language, name]) => (
                    <div key={code}>
                      <dt>{language}</dt>
                      <dd lang={code}>{name}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>{n}: questions buyers ask</h2>
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
              <h3>Price for {n}</h3>
              <p>Tell us grade, packing, quantity and destination port. We reply within 24 hours.</p>
              <Link href={quoteHref} className="btn btn-primary btn-block">Request quote <Icon name="arrow-right" /></Link>
              <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-block"><Icon name="whatsapp" /> WhatsApp {CONTACT.quotePhone.display}</a>
              <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Quote request: ${product.name}`)}`} className={styles.quoteMail}><Icon name="mail" size={16} /> {CONTACT.email}</a>
            </div>
            <a href={pdfHref} download={pdfName} className={styles.sideLink}>
              <Icon name="download" size={22} />
              <span><strong>Specification sheet</strong><small>PDF · {n}</small></span>
              <Icon name="arrow-right" size={18} />
            </a>
            <Link href="/mixed-container/" className={styles.sideLink}>
              <Icon name="container" size={22} />
              <span><strong>Add to a mixed container</strong><small>Combine with other products in one shipment</small></span>
              <Icon name="arrow-right" size={18} />
            </Link>
            {alsoIn.length > 0 && (
              <p className={styles.alsoIn}>Also listed in {alsoIn.map((c, i) => <span key={c.slug}>{i > 0 && ', '}<Link href={`/products/${c.slug}/`}>{c.name}</Link></span>)}</p>
            )}
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-sm section-soft">
          <div className="container">
            <div className="section-head">
              <h2>Related products</h2>
              <Link href={`/products/${cat.slug}/`} className="link-arrow">All {cat.name.toLowerCase()} <Icon name="arrow-right" /></Link>
            </div>
            <div className="grid-4">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}

      <div className={styles.mobileBar} data-mobilebar>
        <Link href={quoteHref} className="btn btn-primary">Request quote</Link>
        <a href={pdfHref} download={pdfName} className="btn btn-outline"><Icon name="download" /> Spec sheet</a>
      </div>
    </>
  );
}
