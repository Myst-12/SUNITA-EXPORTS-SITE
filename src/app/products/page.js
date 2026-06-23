import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'Our Products | 500+ Premium Indian Agri-Commodities | Sunita Agri Exports',
  description: 'Explore 500+ export-quality products across 11 categories — Indian spices, rice, pulses, oilseeds, dehydrated products, and more. BRC & FDA certified.',
};

const categories = [
  { name: 'Indian Spices', slug: 'indian-spices', icon: '🌶️', description: 'Premium whole and ground spices sourced from India\'s finest growing regions.', productCount: '24+' },
  { name: 'Blended Spices & Masalas', slug: 'blended-spices', icon: '🫙', description: 'Authentic spice blends and custom masala formulations for global markets.', productCount: '7' },
  { name: 'Rice', slug: 'rice', icon: '🍚', description: 'Basmati and non-basmati rice varieties, from 1121 Sella to Sona Masoori.', productCount: '10' },
  { name: 'Pulses & Grains', slug: 'pulses-grains', icon: '🫘', description: 'High-quality dals, chickpeas, kidney beans, and food grains.', productCount: '10' },
  { name: 'Oilseeds', slug: 'oilseeds', icon: '🌻', description: 'Sesame seeds, groundnuts, flaxseeds, and other premium oilseeds.', productCount: '8' },
  { name: 'Herbs', slug: 'herbs', icon: '🌿', description: 'Dried herbs including kasuri methi, curry leaves, mint, and more.', productCount: '6' },
  { name: 'Dehydrated Products', slug: 'dehydrated-products', icon: '🧅', description: 'Dehydrated onion, garlic, ginger — flakes, powder, minced, and granules.', productCount: '9' },
  { name: 'Fruits & Vegetables', slug: 'fruits-vegetables', icon: '🍎', description: 'Tamarind, kokum, dry fruits, and seasonal fresh produce.', productCount: '4' },
  { name: 'Foodstuff & FMCG', slug: 'foodstuff-fmcg', icon: '🛒', description: 'Pickles, pastes, ready-to-eat items, instant mixes, papad, and more.', productCount: '11' },
  { name: 'Animal & Bird Feed', slug: 'animal-bird-feed', icon: '🐄', description: 'Cattle feed ingredients and bird seed mixes.', productCount: '2' },
  { name: 'Raisins & Dry Fruits', slug: 'raisins-dry-fruits', icon: '🍇', description: 'Green, black, and golden raisins.', productCount: '3' },
];

export default function ProductsOverviewPage() {
  return (
    <>
      {/* ===== HERO HEADER ===== */}
      <section className="section-ivory section-padding" style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <span className="label gold-accent">Commodities</span>
            <h1>Our Agricultural Product Catalog</h1>
            <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
              We export over 500+ premium products across 11 key categories, processed and graded in our certified facilities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CATEGORIES GRID ===== */}
      <section className="section-white section-padding">
        <div className="container">
          <div className="grid-categories">
            {categories.map((cat, idx) => (
              <ScrollReveal key={cat.slug} delay={idx * 40}>
                <ProductCard
                  name={cat.name}
                  slug={cat.slug}
                  icon={cat.icon}
                  description={cat.description}
                  href={`/products/${cat.slug}`}
                  isCategory={true}
                  productCount={cat.productCount}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Sourcing Banner */}
          <ScrollReveal>
            <div style={{ marginTop: 'var(--space-10)', padding: 'var(--space-6)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', backgroundColor: 'var(--color-ivory)', textAlign: 'center' }}>
              <span className="label gold-accent">Bulk Sourcing</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 'var(--space-2)' }}>
                Request Custom Quotes & Free Samples
              </h2>
              <p style={{ color: 'var(--color-mid)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto var(--space-4) auto' }}>
                We provide custom blending, private labeling, and multi-product container loading. Speak with our export managers to lock in harvest contract pricing today.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
                <Link href="/contact" className="btn-primary">
                  Request Samples
                </Link>
                <Link href="/why-choose-us" className="btn-secondary">
                  Our Quality Standards
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
