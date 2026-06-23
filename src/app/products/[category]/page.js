import { categories, getCategoryBySlug } from '@/data/products';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';

// Generate static params for all categories
export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: {
      canonical: `https://www.sunitaexports.com/products/${cat.slug}/`,
    },
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDescription,
      url: `https://www.sunitaexports.com/products/${cat.slug}/`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h1>Category Not Found</h1>
        <p>The requested product category could not be found.</p>
        <Link href="/products" className="btn-primary" style={{ marginTop: '1rem' }}>
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ===== BREADCRUMB ===== */}
      <Breadcrumb
        items={[
          { label: 'Products', href: '/products' },
          { label: cat.name, href: `/products/${cat.slug}` },
        ]}
      />

      {/* ===== HERO HEADER ===== */}
      <section className="section-ivory section-padding" style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <span className="label gold-accent">{cat.shortName} Range</span>
            <h1>Export-Grade {cat.name}</h1>
            <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
              {cat.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PRODUCTS GRID ===== */}
      <section className="section-white section-padding">
        <div className="container">
          <div className="grid-3" style={{ gap: 'var(--space-4)' }}>
            {cat.products.map((prod, idx) => (
              <ScrollReveal key={prod.slug} delay={idx * 40}>
                <ProductCard
                  name={prod.name}
                  slug={prod.slug}
                  description={prod.description}
                  icon={cat.icon}
                  href={`/products/${cat.slug}/${prod.slug}`}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Sourcing Callout */}
          <ScrollReveal>
            <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-5)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', backgroundColor: 'var(--color-ivory)', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: 'var(--space-2)' }}>
                Interested in Sourcing from our {cat.name} Portfolio?
              </h3>
              <p style={{ color: 'var(--color-mid)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto var(--space-4) auto' }}>
                We provide custom specifications, moisture profiles, and dynamic packaging formats for the entire {cat.name} range. Let us know your destination port and estimated volume for custom FOB/CIF quotes.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
                <Link href="/contact" className="btn-primary">
                  Request a Quote
                </Link>
                <Link href="/faq" className="btn-secondary">
                  Read FAQs
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
