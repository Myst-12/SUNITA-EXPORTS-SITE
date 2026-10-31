import Link from 'next/link';
import { productCategories, getAllProducts } from '@/data/products';
import ProductExplorer from '@/components/ProductExplorer';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import styles from './products.module.css';

export const metadata = {
  title: 'Export Product Catalogue — Spices, Herbs, Rice, Pulses & Indian FMCG',
  description:
    `Browse ${getAllProducts().length} export products from India in ${productCategories.length} categories: spices, herbs & botanicals, dehydrated onion & garlic, coconut, pulses, rice, flours, oilseeds, coffee, superfoods, feeds, FMCG, jaggery and raisins.`,
  alternates: { canonical: '/products/' },
};

// Catalogue order: by category, then by group within the category.
const catIndex = Object.fromEntries(productCategories.map((c, i) => [c.slug, i]));
const subIndex = Object.fromEntries(productCategories.flatMap((c) => c.subcategories.map((s, i) => [`${c.slug}/${s.slug}`, i])));
const rank = (p) => [catIndex[p.category] ?? 99, subIndex[`${p.category}/${p.subcategory}`] ?? 99];

export default function ProductsPage() {
  const sorted = getAllProducts()
    .map((p, i) => ({ p, i, r: rank(p) }))
    .sort((a, b) => a.r[0] - b.r[0] || a.r[1] - b.r[1] || a.i - b.i)
    .map(({ p }) => p);
  const products = sorted.map((p) => ({
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
            Exported from Mumbai since 2010: spices, herbs and botanicals, dehydrated onion and garlic, coconut, pulses, rice,
            flours, oilseeds, coffee, superfoods, feeds, jaggery, raisins and Indian FMCG — every product with a specification
            sheet and a quote button.
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
