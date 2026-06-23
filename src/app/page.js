import Link from 'next/link';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import ProductCard from '@/components/ProductCard';
import CertCard from '@/components/CertCard';
import CTABanner from '@/components/CTABanner';
import ScrollReveal from '@/components/ScrollReveal';
import QualityTimeline from '@/components/QualityTimeline';
import WorldMap from '@/components/WorldMap';

const categories = [
  { name: 'Indian Spices', slug: 'indian-spices', icon: '🌶️', description: 'Premium whole and ground spices sourced from India\'s finest growing regions.' },
  { name: 'Blended Spices & Masalas', slug: 'blended-spices', icon: '🫙', description: 'Authentic spice blends and custom masala formulations for global markets.' },
  { name: 'Rice', slug: 'rice', icon: '🍚', description: 'Basmati and non-basmati rice varieties, from 1121 Sella to Sona Masoori.' },
  { name: 'Pulses & Grains', slug: 'pulses-grains', icon: '🫘', description: 'High-quality dals, chickpeas, kidney beans, and food grains.' },
  { name: 'Oilseeds', slug: 'oilseeds', icon: '🌻', description: 'Sesame seeds, groundnuts, flaxseeds, and other premium oilseeds.' },
  { name: 'Herbs', slug: 'herbs', icon: '🌿', description: 'Dried herbs including kasuri methi, curry leaves, mint, and more.' },
  { name: 'Dehydrated Products', slug: 'dehydrated-products', icon: '🧅', description: 'Dehydrated onion, garlic, ginger — flakes, powder, minced, and granules.' },
  { name: 'Fruits & Vegetables', slug: 'fruits-vegetables', icon: '🍎', description: 'Tamarind, kokum, dry fruits, and seasonal fresh produce.' },
  { name: 'Foodstuff & FMCG', slug: 'foodstuff-fmcg', icon: '🛒', description: 'Pickles, pastes, ready-to-eat items, instant mixes, papad, and more.' },
  { name: 'Animal & Bird Feed', slug: 'animal-bird-feed', icon: '🐄', description: 'Cattle feed ingredients and bird seed mixes for the feed industry.' },
  { name: 'Raisins & Dry Fruits', slug: 'raisins-dry-fruits', icon: '🍇', description: 'Green, black, and golden raisins — sourced and graded for export.' },
];

const certifications = [
  { name: 'BRC Global Food Standard', shortName: 'BRC', description: 'Required by major UK and EU retailers for food safety compliance.' },
  { name: 'FDA Registration', shortName: 'FDA', description: 'Registered for direct food product exports to the United States.' },
  { name: 'FSSAI Licensed', shortName: 'FSSAI', description: 'Full compliance with India\'s food safety and manufacturing standards.' },
  { name: 'ISO Certified', shortName: 'ISO', description: 'Certified quality management systems for consistent processes.' },
  { name: 'APEDA Registered', shortName: 'APEDA', description: 'Registered under the Ministry of Commerce for agri-product exports.' },
  { name: 'Spice Board of India', shortName: 'Spice Board', description: 'Government-registered spice exporter for quality-assured trade.' },
  { name: 'FIEO Member', shortName: 'FIEO', description: 'Member of India\'s apex body for export promotion and trade facilitation.' },
  { name: 'IMC Certified', shortName: 'IMC', description: 'International standards compliance certified by Indian Merchants\' Chamber.' },
];

const whyChooseUs = [
  {
    icon: '🏆',
    title: '30 Years of Export Expertise',
    description: 'Established in 1994, we bring three decades of experience in sourcing, processing, and exporting Indian agri-commodities to markets worldwide.',
  },
  {
    icon: '✅',
    title: '8 International Certifications',
    description: 'BRC, FDA, FSSAI, ISO, APEDA, Spice Board, FIEO, and IMC certified — meeting the compliance requirements of buyers in every major market.',
  },
  {
    icon: '🔬',
    title: 'In-House Quality Laboratory',
    description: 'Every batch is tested for pesticide residues, mycotoxins, and heavy metals by qualified technicians in our own hi-tech laboratory.',
  },
  {
    icon: '⚙️',
    title: 'Steam Sterilization & Optical Sorting',
    description: 'Advanced processing including steam sterilization, Sortex optical sorting, gravity separation, and destoning for export-grade quality.',
  },
  {
    icon: '📦',
    title: 'Custom Packaging & Private Label',
    description: 'Custom branding, packaging, and coding per your specifications. Consumer packs and bulk packs both available.',
  },
  {
    icon: '🚢',
    title: 'Full Container Load Specialists',
    description: 'We specialize in FCL shipments — 20ft and 40ft containers — with consolidated multi-product loading available.',
  },
  {
    icon: '💰',
    title: 'Competitive Pricing & Reliable Supply',
    description: 'We work directly with farmers and source at origin, passing procurement savings to buyers while ensuring year-round supply.',
  },
  {
    icon: '🌱',
    title: 'Farm to Export — Full Process Control',
    description: 'From raw material sourcing through testing, processing, packaging, documentation, and dispatch — every step is controlled in-house.',
  },
];

export default function HomePage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.sunitaexports.com/#business',
    name: 'Sunita Agri Exports Pvt. Ltd.',
    image: 'https://www.sunitaexports.com/images/hero/og-image.webp',
    url: 'https://www.sunitaexports.com',
    telephone: '+91-8169282942',
    email: 'sales@sunitaexports.com',
    foundingDate: '1994',
    description: 'Leading Indian exporter of premium spices, rice, pulses, oilseeds, and agri commodities to 40+ countries worldwide.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1014, Ghanshyam Enclave, Laljipada, Link Road, Kandivali (West)',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400067',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.2045,
      longitude: 72.8347,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:30',
      closes: '18:30',
    },
    priceRange: '$$',
    areaServed: 'Worldwide',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* ===== HERO SECTION ===== */}
      <Hero />

      {/* ===== STATS BAR ===== */}
      <StatsBar />

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="section-ivory section-padding" id="about-preview">
        <div className="container">
          <ScrollReveal>
            <div className="about-preview">
              <span className="label gold-accent">Our Story</span>
              <h2>From Proprietorship to a Trusted Global Export Partner</h2>
              <p>
                Founded in 1994 by Mr. Alok Dhanuka, Sunita Agri Exports has grown from a proprietorship 
                into a private limited company serving importers and distributors in over 40 countries. 
                With 30 years of agricultural expertise, an in-house quality laboratory, and 8 international 
                certifications, we are built to meet the exacting standards of global food buyers.
              </p>
              <p>
                Every product we export — from whole spices and basmati rice to dehydrated vegetables and 
                custom masala blends — goes through rigorous quality testing in our own laboratory before 
                dispatch. We work directly with farmers, control the full process chain, and pass procurement 
                savings to our buyers.
              </p>
              <Link href="/about" className="link-arrow">
                Learn Our Story <span aria-hidden="true">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PRODUCT CATEGORIES ===== */}
      <section className="section-white section-padding" id="product-categories">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="label gold-accent">What We Export</span>
              <h2>Premium Indian Agri-Commodities for Global Markets</h2>
              <p className="section-subtitle">
                Over 500 products across 11 categories — sourced from India's finest growing regions, 
                processed in-house, and exported to 40+ countries.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid-categories">
            {categories.map((cat, index) => (
              <ScrollReveal key={cat.slug} delay={index * 50}>
                <ProductCard
                  name={cat.name}
                  slug={cat.slug}
                  icon={cat.icon}
                  description={cat.description}
                  href={`/products/${cat.slug}`}
                  isCategory={true}
                />
              </ScrollReveal>
            ))}
          </div>
          <div className="section-cta-center">
            <Link href="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section-ivory section-padding" id="why-choose-us">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="label gold-accent">Why Buyers Trust Us</span>
              <h2>Built for International Trade, Backed by 30 Years of Expertise</h2>
            </div>
          </ScrollReveal>
          <div className="grid-4 why-grid">
            {whyChooseUs.map((item, index) => (
              <ScrollReveal key={index} delay={index * 60}>
                <div className="card why-card">
                  <span className="why-icon" aria-hidden="true">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="section-cta-center">
            <Link href="/why-choose-us" className="btn-secondary">
              Learn More About Our Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* ===== QUALITY TIMELINE ===== */}
      <QualityTimeline />

      {/* ===== CERTIFICATIONS ===== */}
      <section className="section-white section-padding" id="certifications">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="label gold-accent">Trust & Compliance</span>
              <h2>Certified to the Highest International Standards</h2>
              <p className="section-subtitle">
                8 certifications that ensure every product meets the food safety, quality, and regulatory 
                requirements of major importing countries.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid-4 cert-grid">
            {certifications.map((cert, index) => (
              <ScrollReveal key={index} delay={index * 50}>
                <CertCard
                  name={cert.name}
                  shortName={cert.shortName}
                  description={cert.description}
                />
              </ScrollReveal>
            ))}
          </div>
          <div className="section-cta-center">
            <Link href="/certifications" className="btn-secondary">
              View All Certifications
            </Link>
          </div>
        </div>
      </section>

      {/* ===== EXPORT REACH ===== */}
      <WorldMap />

      {/* ===== SHIPMENT GALLERY PREVIEW ===== */}
      <section className="section-white section-padding" id="shipments-preview">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="label gold-accent">Our Shipments</span>
              <h2>Delivering Quality, Container After Container</h2>
              <p className="section-subtitle">
                200+ full container load shipments and counting. Every consignment is carefully inspected, 
                documented, and tracked from our warehouse to your destination port.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="shipment-preview-grid">
              <div className="shipment-preview-card">
                <div className="shipment-placeholder">
                  <span className="shipment-icon" aria-hidden="true">🚢</span>
                  <p>Container Loading</p>
                </div>
              </div>
              <div className="shipment-preview-card">
                <div className="shipment-placeholder">
                  <span className="shipment-icon" aria-hidden="true">📦</span>
                  <p>Warehouse Operations</p>
                </div>
              </div>
              <div className="shipment-preview-card">
                <div className="shipment-placeholder">
                  <span className="shipment-icon" aria-hidden="true">🔬</span>
                  <p>Quality Testing</p>
                </div>
              </div>
              <div className="shipment-preview-card">
                <div className="shipment-placeholder">
                  <span className="shipment-icon" aria-hidden="true">✅</span>
                  <p>Final Inspection</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <div className="section-cta-center">
            <Link href="/shipments" className="btn-secondary">
              View All Shipments <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <CTABanner
        headline="Ready to Source Premium Indian Agri-Commodities?"
        subtext="Request a free sample or get a quote for your next order. We respond within 24 hours."
        primaryCTA={{ label: 'Send an Inquiry', href: '/contact' }}
        secondaryCTA={{ label: 'Download Our Catalogue', href: '#' }}
      />
    </>
  );
}
