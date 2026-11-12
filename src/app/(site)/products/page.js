import Link from '@/components/Link';
import { productCategories, getAllProducts } from '@/data/products';
import ProductExplorer from '@/components/ProductExplorer';
import { productIndex, PREVIEW } from '@/lib/productIndex';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import styles from './products.module.css';
import { enAlternates } from '@/lib/i18n';

export const metadata = {
  title: 'Product Catalogue: Spices, Rice & FMCG',
  description:
    `Browse ${getAllProducts().length} export products from India in ${productCategories.length} categories: spices, herbs, dehydrated onion, rice, pulses, flours, oilseeds, coffee, superfoods, FMCG and more.`,
  alternates: enAlternates('/products/'),
};

export default function ProductsPage() {
  const products = productIndex();
  const primary = (slug) => products.filter((p) => p.category === slug);
  const cats = productCategories.map((c) => ({ slug: c.slug, name: c.name, count: c.productCount, primary: primary(c.slug).length }));
  // Only each category's first products go into the page; the full list loads on the first search or filter.
  const preview = productCategories.flatMap((c) => primary(c.slug).slice(0, PREVIEW));

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
          <ProductExplorer preview={preview} total={products.length} categories={cats} />
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
