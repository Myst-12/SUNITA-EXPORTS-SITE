import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import { COMPANY, whatsappLink } from '@/config/site';
import { faqSchema } from '@/lib/schemas';
import styles from '../products.module.css';

export const dynamicParams = false;

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: 'Category not found' };
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
  if (!cat) notFound();

  const name = cat.name;
  const lower = name.toLowerCase();
  const faqs = [
    {
      question: `Do you export ${lower} in bulk and retail packs?`,
      answer: `Yes. We export ${lower} in bulk 25–50 kg bags as well as retail packs and private label packaging. All ${cat.productCount} items in this range can also be combined in a mixed container with other products.`,
    },
    {
      question: `How can I get a price list for ${lower}?`,
      answer: `Prices change with crop and market conditions, so we quote fresh for every enquiry. Send your product list, grades, quantities and destination port and we will reply with FOB / CFR / CIF prices within 24 hours.`,
    },
    {
      question: `Which countries do you ship ${lower} to?`,
      answer: `We ship to ${COMPANY.countriesServed} countries including the USA, Canada, UK, Australia, New Zealand, the Gulf (UAE, Saudi Arabia, Kuwait, Oman, Qatar), Singapore, Malaysia, Japan and East Africa.`,
    },
  ];
  const others = categories.filter((c) => c.slug !== cat.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <section className={styles.catHero}>
        <div className="container">
          <Breadcrumb inline items={[{ label: 'Products', href: '/products/' }, { label: name, href: `/products/${cat.slug}/` }]} />
          <div className={styles.catHeroGrid}>
            <div>
              <span className="eyebrow">{cat.productCount} export products</span>
              <h1>{name} exporter from India</h1>
              <p className="lead">{cat.description}</p>
              <div className="btn-row mt-3">
                <Link href={`/contact/?product=${encodeURIComponent(name)}`} className="btn btn-primary">Request a quote <Icon name="arrow-right" /></Link>
                <a href={whatsappLink(`Hello, please share your ${lower} price list.`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><Icon name="whatsapp" /> WhatsApp</a>
              </div>
              <ul className={styles.catPoints}>
                <li><Icon name="check-circle" size={16} /> Bulk, retail &amp; private label</li>
                <li><Icon name="check-circle" size={16} /> Mixed container friendly</li>
                <li><Icon name="check-circle" size={16} /> FOB · CFR · CIF</li>
              </ul>
            </div>
            <div className={styles.catHeroImg}>
              <Image src={cat.image} alt={`${name} from India`} fill priority sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="grid-4">
            {cat.products.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i < 4} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm section-soft">
        <div className={`container ${styles.catFaq}`}>
          <div>
            <span className="eyebrow">Buying {lower}</span>
            <h2>Questions importers ask</h2>
            <p className="lead">Need a product that isn’t listed? We source most Indian food products on request.</p>
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
          <h2 className={styles.otherTitle}>Explore other categories</h2>
          <div className="chip-row">
            {others.map((c) => (
              <Link key={c.slug} href={`/products/${c.slug}/`} className="chip">{c.name} <span className="text-muted">· {c.productCount}</span></Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
