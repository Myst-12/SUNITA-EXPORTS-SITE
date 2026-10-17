import Link from 'next/link';
import { productCategories, getAllProducts } from '@/data/products';
import ProductExplorer from '@/components/ProductExplorer';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import styles from './products.module.css';

export const metadata = {
  title: 'Export Product Catalogue — Spices, Herbs, Rice, Pulses & Indian FMCG',
  description:
    'Browse 400+ export products from India in 14 categories: spices, herbs & botanicals, dehydrated onion & garlic, coconut, pulses, rice, flours, oilseeds, coffee, superfoods, feeds, FMCG, jaggery and raisins.',
  alternates: { canonical: '/products/' },
};

export default function ProductsPage() {
  const products = getAllProducts().map((p) => ({
    slug: p.slug,
    name: p.name,
    shortName: p.shortName,
    latin: p.latin,
    type: p.type,
    category: p.category,
    categories: [p.category, ...(p.also || []).map((a) => a.category)],
    categoryName: p.categoryName,
    subcategoryName: p.subcategoryName,
    image: p.image,
    hsCode: p.hsCode || null,
    forms: p.forms,
    grades: p.grades,
  }));
  const cats = productCategories.map((c) => ({ slug: c.slug, name: c.name, count: c.productCount }));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumb inline items={[{ label: 'Products', href: '/products/' }]} />
          <h1>{products.length} Indian products, ready to export</h1>
          <p className="lead">
            Spices, herbs and botanicals, dehydrated onion and garlic, coconut, pulses, rice, flours, oilseeds, coffee,
            superfoods, feeds, raisins and Indian FMCG — every product with a specification sheet and a quote button.
          </p>
          <div className="btn-row">
            <Link href="/contact/" className="btn btn-primary">Send your product list <Icon name="arrow-right" /></Link>
            <a href="/downloads/sunita-agri-exports-catalogue.pdf" className="btn btn-outline" download><Icon name="download" /> Catalogue PDF</a>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <ProductExplorer products={products} categories={cats} />
        </div>
      </section>

      <section className="section-sm section-soft">
        <div className="container">
          <h2 className={styles.otherTitle}>Product categories</h2>
          <div className="grid-categories">
            {productCategories.map((c) => (
              <Link key={c.slug} href={`/products/${c.slug}/`} className={`card ${styles.catCard}`}>
                <strong>{c.name}</strong>
                <span className="text-muted small">{c.productCount} products</span>
                <Icon name="arrow-right" size={18} />
              </Link>
            ))}
            <Link href="/private-label/" className={`card ${styles.catCard}`}>
              <strong>Private Label &amp; OEM</strong>
              <span className="text-muted small">Services</span>
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
