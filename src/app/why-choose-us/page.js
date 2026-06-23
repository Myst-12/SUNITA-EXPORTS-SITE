import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'Why Source From Sunita Agri Exports | Certified Indian Spice Exporter',
  description: '30 years of export expertise, 8 international certifications, in-house lab, and steam sterilization. Discover why global importers trust Sunita Agri Exports.',
};

export default function WhyChooseUsPage() {
  const details = [
    {
      icon: '🔬',
      title: 'In-House Quality Laboratory & Testing Standards',
      paragraphs: [
        'At Sunita Agri Exports, food safety is not a post-processing checklist; it is integrated into our sourcing and handling. Our Mumbai head office works in tandem with our warehouse testing division, which is equipped with analytical instruments to run testing parameters.',
        'We screen agricultural goods for pesticide residues (verifying limits against EU Maximum Residue Limits - MRLs, and U.S. FDA action levels), mycotoxins (Aflatoxin B1, B2, G1, G2 and Ochratoxin A), and heavy metals (lead, cadmium, mercury, arsenic). Every container shipment is issued a comprehensive Certificate of Analysis (COA) specifying physical purity, moisture, and chemical parameters.',
      ]
    },
    {
      icon: '💨',
      title: 'Natural Steam Sterilization & Pathogen Control',
      paragraphs: [
        'For agricultural products shipped to European and North American retail networks, microbiological cleanliness is a critical regulatory threshold. Traditional chemical treatments (like Ethylene Oxide - ETO fumigation) are banned in the EU and heavily restricted globally.',
        'We offer steam sterilization as a clean, natural solution. Pressurized steam briefly contacts the spice seeds or powder, reducing total plate count (TPC), yeasts, molds, and completely eliminating pathogens like Salmonella and E. coli. Crucially, this rapid thermal exposure is engineered to maintain volatile oil content, natural color values (ASTA), and aroma notes.',
      ]
    },
    {
      icon: '📦',
      title: 'Custom Branding, Packaging, & Coding Services',
      paragraphs: [
        'We cater to two distinct segments of global buyers: food manufacturers/processors requiring bulk raw ingredients, and retail distributors needing shelf-ready consumer packs. Our automated packing lines handle both.',
        'For bulk requirements, we supply 20kg, 25kg, or 50kg bags in Polypropylene (PP), multi-layer Kraft paper, or laminated Jute bags. For retail and private label operations, we support packaging formats from 100g bags up to 5kg bags. Custom label coding (batch numbers, expiry dates, barcoding) is printed online as per the importing country\'s labeling regulations.',
      ]
    },
    {
      icon: '🚢',
      title: 'Full Container Load (FCL) & Multi-Product Consolidation',
      paragraphs: [
        'Shipping agricultural products globally requires efficient freight utilization. We specialize in loading 20ft and 40ft Full Container Loads (FCL). A 20ft container can hold between 15 and 20 Metric Tons depending on the product bulk density, while 40ft containers are optimized for lighter or larger bulk shipments.',
        'For distributors or retailers who do not want to hold massive single-product inventory, we offer container consolidation. We can pack and stuff a single container with a mix of product lines — for example, combining spices, basmati rice, and pulses in a single shipment under one Bill of Lading, reducing procurement overheads.',
      ]
    },
    {
      icon: '💰',
      title: 'Direct Origin Sourcing & Procurement Efficiencies',
      paragraphs: [
        'India\'s agricultural supply chains can be fragmented, with multiple middle-men adding cost but no quality control. Sunita Agri Exports bypasses these layers by sourcing directly at primary markets (agricultural yards) and directly from grower groups in producing regions.',
        'By procurement directly at harvest, we secure high-quality batches at low cost. We pass these savings directly to our international buyers, ensuring competitive FOB, CIF, or CFR pricing without compromising on material sorting and analytical validation.',
      ]
    }
  ];

  return (
    <>
      {/* ===== HERO HEADER ===== */}
      <section className="section-ivory section-padding" style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <span className="label gold-accent">Why Source From Us</span>
            <h1>A Quality-First Sourcing Engine</h1>
            <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
              From analytical pesticide screening to steam sterilization and custom private labeling — discover how we mitigate risk and deliver value for procurement managers worldwide.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== DETAILED VALUE SECTIONS ===== */}
      <section className="section-white section-padding">
        <div className="container" style={{ maxWidth: '900px' }}>
          {details.map((detail, idx) => (
            <ScrollReveal key={idx}>
              <div style={{ marginBottom: 'var(--space-8)', borderBottom: idx < details.length - 1 ? '1px solid var(--color-border)' : 'none', paddingBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                  <span style={{ fontSize: '2.5rem' }} aria-hidden="true">{detail.icon}</span>
                  <h2 style={{ fontSize: '1.6rem', margin: 0 }}>{detail.title}</h2>
                </div>
                {detail.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} style={{ fontSize: '1.05rem', color: 'var(--color-dark)', marginBottom: 'var(--space-3)', lineHeight: '1.8' }}>
                    {p}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          ))}

          {/* Callout Box */}
          <ScrollReveal>
            <div style={{ backgroundColor: 'var(--color-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', padding: 'var(--space-5)', textAlign: 'center', marginTop: 'var(--space-4)' }}>
              <span className="label gold-accent" style={{ marginBottom: 'var(--space-1)' }}>B2B Trade Guarantee</span>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: 'var(--space-2)' }}>Responsive Communication within 24 Hours</h3>
              <p style={{ color: 'var(--color-mid)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto var(--space-4) auto' }}>
                We understand that supply chain managers work across different time zones. Our export coordinators are available on WhatsApp and email, guaranteeing a detailed technical response to specs and pricing queries within 24 hours.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
                <Link href="/contact" className="btn-primary">
                  Send Sourcing Inquiry
                </Link>
                <Link href="/certifications" className="btn-secondary">
                  View Certifications
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
