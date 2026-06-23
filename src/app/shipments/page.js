import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'Shipment Gallery | Container Loading & Export Operations | Sunita Agri Exports',
  description: 'View our shipment operations — container loading, warehouse facilities, quality inspection, and product dispatch. 200+ FCL shipments to 40+ countries.',
};

export default function ShipmentsPage() {
  const operations = [
    {
      icon: '🚢',
      title: 'Container Stuffing & Loading',
      desc: 'We inspect and load 20ft and 40ft containers directly at our facility or customs-cleared warehouses, utilizing modern forklifts and protective liners.'
    },
    {
      icon: '📦',
      title: 'Warehouse & Storage Control',
      desc: 'Our in-house warehouse is climate-controlled and kept clean. Under 24/7 CCTV surveillance, raw and packed commodities are kept dry on pest-free pallets.'
    },
    {
      icon: '🔬',
      title: 'Sampling & Laboratory Analysis',
      desc: 'Before packing, technicians collect representative samples of each batch for chemical and physical purity analysis in our in-house lab.'
    },
    {
      icon: '✅',
      title: 'Pre-Shipment Visual Inspection',
      desc: 'Our quality checkers perform visual examinations of bags, stitching quality, container seal integrity, and labeling print before locking the containers.'
    },
    {
      icon: '📄',
      title: 'Consolidated Documentation',
      desc: 'We generate comprehensive paperwork for customs clearance: phytosanitary certifications, fumigation documents, and customized Certificates of Origin.'
    },
    {
      icon: '🌐',
      title: 'Multi-Product Consignments',
      desc: 'For importers seeking lower inventories, we consolidate multiple products (e.g. rice, lentils, and spices) in one container under single invoicing.'
    }
  ];

  return (
    <>
      {/* ===== HERO HEADER ===== */}
      <section className="section-ivory section-padding" style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <span className="label gold-accent">Operations</span>
            <h1>Logistics & Shipment Gallery</h1>
            <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Delivering cargo across six continents. See how we process, pack, test, and stuff containers for safe international transit.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SHIPMENT OPERATIONS ===== */}
      <section className="section-white section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="label gold-accent" style={{ fontSize: '1.25rem', fontWeight: '700' }}>200+ FCL Containers Loaded</span>
          </div>

          <div className="grid-3" style={{ gap: 'var(--space-4)' }}>
            {operations.map((op, idx) => (
              <ScrollReveal key={idx} delay={idx * 50}>
                <div className="card" style={{ height: '100%' }}>
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 'var(--space-2)' }} aria-hidden="true">
                    {op.icon}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>{op.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-mid)' }}>{op.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-5)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', backgroundColor: 'var(--color-ivory)', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: 'var(--space-2)' }}>Ready to Coordinate Your Next Shipment?</h3>
              <p style={{ color: 'var(--color-mid)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto var(--space-4) auto' }}>
                We support FOB Mumbai (JNPT / Nhava Sheva), CFR, and CIF incoterms. Get in touch with our operations team to discuss loading limits, packaging, and custom logistics paperwork.
              </p>
              <Link href="/contact" className="btn-primary">
                Contact Operations Team
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
