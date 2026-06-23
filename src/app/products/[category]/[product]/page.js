import { categories, getCategoryBySlug, getProductBySlug, getRelatedProducts } from '@/data/products';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';

// Generate static params for all dynamic product routes
export async function generateStaticParams() {
  const params = [];
  categories.forEach((cat) => {
    cat.products.forEach((prod) => {
      params.push({
        category: cat.slug,
        product: prod.slug,
      });
    });
  });
  return params;
}

// Generate dynamic metadata
export async function generateMetadata({ params }) {
  const { category, product: productSlug } = await params;
  const product = getProductBySlug(category, productSlug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: {
      canonical: `https://www.sunitaexports.com/products/${category}/${product.slug}/`,
    },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: `https://www.sunitaexports.com/products/${category}/${product.slug}/`,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { category, product: productSlug } = await params;
  const product = getProductBySlug(category, productSlug);
  const cat = getCategoryBySlug(category);

  if (!product || !cat) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h1>Product Not Found</h1>
        <p>The requested product specifications could not be found.</p>
        <Link href="/products" className="btn-primary" style={{ marginTop: '1rem' }}>
          Back to Catalog
        </Link>
      </div>
    );
  }

  // Schema markup
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `https://www.sunitaexports.com/images/products/${product.slug}.webp`,
    brand: {
      '@type': 'Brand',
      name: 'Sunita Agri Exports',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Sunita Agri Exports Pvt. Ltd.',
    },
    category: cat.name,
    countryOfOrigin: {
      '@type': 'Country',
      name: 'India',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Sunita Agri Exports Pvt. Ltd.',
      },
    },
  };

  // Get related products
  const relatedList = getRelatedProducts(product.relatedProducts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* ===== BREADCRUMB ===== */}
      <Breadcrumb
        items={[
          { label: 'Products', href: '/products' },
          { label: cat.name, href: `/products/${cat.slug}` },
          { label: product.name, href: `/products/${cat.slug}/${product.slug}` },
        ]}
      />

      {/* ===== PRODUCT DETAILS ===== */}
      <section className="section-white section-padding">
        <div className="container">
          <div className="grid-2" style={{ gap: 'var(--space-6)', alignItems: 'flex-start', marginBottom: 'var(--space-8)' }}>
            
            {/* Left Column: Image Placeholder */}
            <ScrollReveal>
              <div 
                style={{
                  aspectRatio: '4/3',
                  backgroundColor: 'var(--color-ivory)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '4.5rem', display: 'block', marginBottom: '10px' }} aria-hidden="true">
                    {cat.icon}
                  </span>
                  <span className="label gold-accent" style={{ fontSize: '0.8rem' }}>Export-Grade Quality</span>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--color-primary)', margin: 0 }}>
                    {product.name}
                  </h3>
                </div>
              </div>
              
              {/* Trust Badges */}
              <div 
                style={{
                  marginTop: 'var(--space-4)',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-ivory)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--color-primary)' }} aria-hidden="true">✓</span>
                  <span>Tested for Pesticide Residues, Mycotoxins & Heavy Metals</span>
                </div>
                {product.steamSterilized && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--color-primary)' }} aria-hidden="true">✓</span>
                    <span>Natural Steam Sterilization Available (Microbial Control)</span>
                  </div>
                )}
                {product.privateLabelAvailable && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--color-primary)' }} aria-hidden="true">✓</span>
                    <span>Custom Branding & Private Labeling Available</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--color-primary)' }} aria-hidden="true">✓</span>
                  <span>Free Samples Available on Request (Courier Charges Apply)</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Specifications & Copy */}
            <ScrollReveal>
              <span className="label gold-accent">{cat.shortName} Portfolio</span>
              <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: 'var(--space-4)' }}>
                {product.description}
              </p>

              {/* Technical Spec Table */}
              <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: 'var(--space-2)' }}>
                Technical Quality Parameters
              </h2>
              <table 
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.65rem 0.5rem 0.65rem 0', fontWeight: '600', color: 'var(--color-dark)' }}>{key}</td>
                      <td style={{ padding: '0.65rem 0.5rem', color: 'var(--color-mid)', textAlign: 'right' }}>{value}</td>
                    </tr>
                  ))}
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.65rem 0.5rem 0.65rem 0', fontWeight: '600', color: 'var(--color-dark)' }}>HS Code</td>
                    <td style={{ padding: '0.65rem 0.5rem', color: 'var(--color-mid)', textAlign: 'right' }}>{product.hsCode}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.65rem 0.5rem 0.65rem 0', fontWeight: '600', color: 'var(--color-dark)' }}>Shelf Life</td>
                    <td style={{ padding: '0.65rem 0.5rem', color: 'var(--color-mid)', textAlign: 'right' }}>{product.shelfLife}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.65rem 0.5rem 0.65rem 0', fontWeight: '600', color: 'var(--color-dark)' }}>Origin</td>
                    <td style={{ padding: '0.65rem 0.5rem', color: 'var(--color-mid)', textAlign: 'right' }}>{product.origin}</td>
                  </tr>
                </tbody>
              </table>

              {/* Grades, Forms, Packaging Lists */}
              <div className="grid-2" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                {product.grades && product.grades.length > 0 && (
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', textTransform: 'uppercase', color: 'var(--color-gold)', margin: 0, fontWeight: '700' }}>
                      Available Grades
                    </h3>
                    <ul style={{ paddingLeft: 'var(--space-3)', fontSize: '0.9rem', color: 'var(--color-mid)', marginTop: '5px' }}>
                      {product.grades.map((g) => <li key={g}>{g}</li>)}
                    </ul>
                  </div>
                )}
                {product.forms && product.forms.length > 0 && (
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', textTransform: 'uppercase', color: 'var(--color-gold)', margin: 0, fontWeight: '700' }}>
                      Available Forms
                    </h3>
                    <ul style={{ paddingLeft: 'var(--space-3)', fontSize: '0.9rem', color: 'var(--color-mid)', marginTop: '5px' }}>
                      {product.forms.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              {product.packaging && product.packaging.length > 0 && (
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', textTransform: 'uppercase', color: 'var(--color-gold)', margin: 0, fontWeight: '700' }}>
                    Packaging Options
                  </h3>
                  <ul style={{ paddingLeft: 'var(--space-3)', fontSize: '0.9rem', color: 'var(--color-mid)', marginTop: '5px' }}>
                    {product.packaging.map((pkg) => <li key={pkg}>{pkg}</li>)}
                  </ul>
                </div>
              )}

              {/* Inquiry Action */}
              <div>
                <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="btn-primary" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                  Request Sourcing Quote for {product.name}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== RELATED PRODUCTS ===== */}
      {relatedList.length > 0 && (
        <section className="section-ivory section-padding" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="container">
            <div className="section-header" style={{ marginBottom: 'var(--space-5)' }}>
              <span className="label gold-accent">Complete Your Order</span>
              <h2>Related Commodities</h2>
            </div>
            
            <div className="grid-3" style={{ gap: 'var(--space-4)' }}>
              {relatedList.map((rel) => (
                <ScrollReveal key={rel.slug}>
                  <ProductCard
                    name={rel.name}
                    slug={rel.slug}
                    description={rel.description}
                    icon={cat.icon}
                    href={`/products/${rel.category}/${rel.slug}`}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
