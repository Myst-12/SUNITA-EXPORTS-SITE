import Link from 'next/link';
import { categories, getAllProducts } from '@/data/products';
import ProductExplorer from '@/components/ProductExplorer';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import styles from './products.module.css';

export const metadata = {
  title: 'Export Product Catalogue — Spices, Rice, Pulses & Indian FMCG',
  description:
    'Browse 100+ export products from India: whole & ground spices, masalas, basmati and non-basmati rice, pulses, oilseeds, herbs, dehydrated onion & garlic and Indian FMCG groceries.',
  alternates: { canonical: '/products/' },
};

export default function ProductsPage() {
  const products = getAllProducts().map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    categoryName: p.categoryName,
    image: p.image,
    hsCode: p.hsCode,
    forms: p.forms?.slice(0, 1) || [],
    grades: p.grades || [],
  }));
  const cats = categories.map((c) => ({ slug: c.slug, name: c.name, count: c.productCount }));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumb inline items={[{ label: 'Products', href: '/products/' }]} />
          <span className="eyebrow">Product catalogue</span>
          <h1>{products.length}+ Indian food products, ready to export</h1>
          <p className="lead">
            Spices, masalas, rice, pulses, oilseeds, herbs, dehydrated products and Indian FMCG — in bulk, retail or your own
            private label. Can’t find something? We source on request.
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
          <div className="section-head">
            <div>
              <span className="eyebrow">Browse by category</span>
              <h2 className={styles.otherTitle}>Product categories</h2>
            </div>
          </div>
          <div className="grid-categories">
            {categories.map((c) => (
              <Link key={c.slug} href={`/products/${c.slug}/`} className={`card ${styles.catCard}`}>
                <strong>{c.name}</strong>
                <span className="text-muted small">{c.productCount} products</span>
                <Icon name="arrow-right" size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
