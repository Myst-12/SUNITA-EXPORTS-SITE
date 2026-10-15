import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { productCategories, getCategoryBySlug } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import { COMPANY, SITE_URL, whatsappLink } from '@/config/site';
import { faqSchema } from '@/lib/schemas';
import styles from '../products.module.css';

export const dynamicParams = false;

export async function generateStaticParams() {
  return productCategories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat || cat.service) return { title: 'Category not found' };
  const url = `/products/${cat.slug}/`;
  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: cat.metaTitle, description: cat.metaDescription, url, images: [{ url: cat.image }] },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat || cat.service) notFound();

  const name = cat.name;
  const lower = name.toLowerCase();
  const grouped = !cat.flat && cat.subcategories.length > 1;
  const faqs = [
    {
      question: `Which ${lower} do you export?`,
      answer: `${cat.productCount} products${grouped ? ` across ${cat.subcategories.length} groups — ${cat.subcategories.map((s) => s.name).join(', ')}` : ''}. Each product page has a downloadable specification sheet and a quote button.`,
    },
    {
      question: `How can I get a price list for ${lower}?`,
      answer: 'Prices change with crop and market conditions, so we quote fresh for every enquiry. Send your product list, grades, quantities and destination port and we reply with FOB / CFR / CIF prices within 24 hours.',
    },
    {
      question: `Can I combine ${lower} with other products in one container?`,
      answer: `Yes. Any product in this range can travel in a mixed 20 ft or 40 ft container with spices, rice, pulses and Indian groceries. We ship to ${COMPANY.countriesServed} countries.`,
    },
  ];
  const others = productCategories.filter((c) => c.slug !== cat.slug);
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${name} exported by ${COMPANY.name}`,
    numberOfItems: cat.productCount,
    itemListElement: cat.products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `${SITE_URL}/products/${p.category}/${p.slug}/` })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <section className={styles.catHero}>
        <div className="container">
          <Breadcrumb inline items={[{ label: 'Products', href: '/products/' }, { label: name, href: `/products/${cat.slug}/` }]} />
          <div className={styles.catHeroGrid}>
            <div>
              <h1>{name} exporter from India</h1>
              <p className="lead">{cat.description}</p>
              <p className={styles.catCount}>{cat.productCount} products · specification sheet and quote on every product</p>
              <div className="btn-row mt-3">
                <Link href={`/contact/?product=${encodeURIComponent(name)}`} className="btn btn-primary">Request a quote <Icon name="arrow-right" /></Link>
                <a href={whatsappLink(`Hello, please share your ${lower} price list.`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><Icon name="whatsapp" /> WhatsApp</a>
              </div>
            </div>
            <div className={styles.catHeroImg}>
              <Image src={cat.image} alt={`${name} from India`} fill priority sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          {cat.note && <p className={styles.catNote}><Icon name="shield" size={16} /> {cat.note}</p>}
          {grouped && (
            <nav className={`chip-row ${styles.subNav}`} aria-label={`${name} groups`}>
              {cat.subcategories.map((s) => <a key={s.slug} href={`#${s.slug}`} className="chip">{s.name} <span className="text-muted">· {s.products.length}</span></a>)}
            </nav>
          )}
          {grouped ? (
            cat.subcategories.map((s, si) => (
              <div key={s.slug} id={s.slug} className={styles.subSection}>
                <h2 className={styles.subTitle}>{s.name}</h2>
                <div className="grid-4">
                  {s.products.map((p, i) => <ProductCard key={p.slug} product={p} priority={si === 0 && i < 4} />)}
                </div>
              </div>
            ))
          ) : (
            <div className="grid-4">
              {cat.products.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 4} />)}
            </div>
          )}
        </div>
      </section>

      <section className="section-sm section-soft">
        <div className={`container ${styles.catFaq}`}>
          <div>
            <h2>Questions importers ask</h2>
            <p className="lead">Need something that isn’t listed? Send us the product and specification and we will check supply.</p>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <details key={f.question} className="faq-item" open={i === 0}>
                <summary>{f.question}</summary>
                <div className="faq-answer">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <h2 className={styles.otherTitle}>Other categories</h2>
          <div className="chip-row">
            {others.map((c) => (
              <Link key={c.slug} href={`/products/${c.slug}/`} className="chip">{c.name} <span className="text-muted">· {c.productCount}</span></Link>
            ))}
            <Link href="/private-label/" className="chip">Private Label &amp; OEM</Link>
          </div>
        </div>
      </section>
    </>
  );
}
