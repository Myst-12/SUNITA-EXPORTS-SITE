import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'About Sunita Agri Exports | 30 Years of Indian Agri Export Excellence',
  description: 'Since 1994, Sunita Agri Exports has been a trusted Indian exporter of spices, rice, and agri commodities. FDA, BRC, FSSAI, ISO certified. Based in Mumbai.',
};

export default function AboutPage() {
  const values = [
    { title: 'Quality Assurance', desc: 'Every consignment is subject to testing in our in-house laboratory for pesticide residues, heavy metals, and toxins before dispatch.' },
    { title: 'Export Reliability', desc: 'Three decades of operational knowledge allows us to guarantee smooth logistics, container consolidation, and on-time shipments.' },
    { title: 'Operational Transparency', desc: 'We maintain clear, documented tracking of all shipments, offering full transparency from farm sourcing to destination ports.' },
    { title: 'Client Partnerships', desc: 'We build long-term relationships with global distributors, wholesalers, and retail buyers, adapting to their specific packaging and quality demands.' }
  ];

  const processSteps = [
    { step: '01', title: 'Sourcing at Origin', desc: 'We source raw materials directly from farmers and primary market yards in verified cultivating zones to ensure traceablity.' },
    { step: '02', title: 'In-House Laboratory Testing', desc: 'Raw material samples are analyzed in our lab for moisture content, purity, and microbial parameters before acceptance.' },
    { step: '03', title: 'Precision Processing', desc: 'Materials undergo cleaning, destoning, gravity separation, and sortex optical grading. Spices are steam-sterilized as required.' },
    { step: '04', title: 'Custom Packaging & Coding', desc: 'Products are packed in our BRC-compliant facility. We support bulk bags and private-label consumer packs with custom coding.' },
    { step: '05', title: 'Documentation & Clearance', desc: 'Our logistics team prepares all export paperwork, including phytosanitary certificates, Certificates of Analysis (COA), and customs filings.' },
    { step: '06', title: 'Container stuffing & Dispatch', desc: 'Containers (20ft/40ft FCL) are carefully stuffed, secured under CCTV supervision, and dispatched via Nhava Sheva Port (JNPT), Mumbai.' }
  ];

  return (
    <>
      {/* ===== HERO HEADER ===== */}
      <section className="section-ivory section-padding" style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <span className="label gold-accent">Est. 1994</span>
            <h1>Our Story & Agricultural Expertise</h1>
            <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
              For over three decades, Sunita Agri Exports has connected premium Indian farming origin with global food importers, built on a foundation of quality, compliance, and trade trust.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== OUR STORY & STORY PROGRESSION ===== */}
      <section className="section-white section-padding">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-6)' }}>
            <ScrollReveal>
              <span className="label gold-accent">30+ Years in Business</span>
              <h2>A Legacy of Agricultural Exports</h2>
              <p>
                Founded in 1994 by Mr. Alok Dhanuka, Sunita Agri Exports started as a proprietary concern focusing on local sourcing and trade of agricultural commodities in Mumbai. Recognizing the growing global demand for authentic, high-quality Indian ingredients, the company expanded into international export operations.
              </p>
              <p>
                In 2007, to accommodate our growing scale and establish a corporate framework for international clients, the business was restructured into a Private Limited entity: **Sunita Agri Exports Pvt. Ltd.** Today, we ship over 200+ FCL containers annually to clients across the USA, UK, Europe, Australia, and the Middle East.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div style={{ backgroundColor: 'var(--color-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', padding: 'var(--space-5)' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>Company Milestone Timeline</h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 'var(--space-3)' }}>
                  <li style={{ marginBottom: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
                    <strong className="gold-accent">1994:</strong>
                    <span>Founded as a proprietary firm in Mumbai, sourcing spices and grains at origin.</span>
                  </li>
                  <li style={{ marginBottom: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
                    <strong className="gold-accent">2007:</strong>
                    <span>Restructured as a Private Limited Company to support global B2B operations.</span>
                  </li>
                  <li style={{ marginBottom: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
                    <strong className="gold-accent">2014:</strong>
                    <span>Established our hi-tech quality control laboratory and built warehouse facilities.</span>
                  </li>
                  <li style={{ marginBottom: 0, display: 'flex', gap: 'var(--space-2)' }}>
                    <strong className="gold-accent">Today:</strong>
                    <span>BRCGS, US FDA, and ISO certified exporter serving clients in 40+ countries.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== MISSION, VISION, VALUES ===== */}
      <section className="section-ivory section-padding">
        <div className="container">
          <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
            <ScrollReveal>
              <span className="label gold-accent">Our Mission</span>
              <h2 style={{ fontSize: '1.75rem' }}>Responsible Sourcing, Global Delivery</h2>
              <p style={{ fontSize: '1.1rem' }}>
                To supply the world\'s food industries with premium, quality-assured Indian agricultural products. We achieve this by sourcing directly from farmers, utilizing advanced processing technology, and maintaining complete compliance with international food safety standards.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <span className="label gold-accent">Our Vision</span>
              <h2 style={{ fontSize: '1.75rem' }}>The Trusted Link to Indian Origin</h2>
              <p style={{ fontSize: '1.1rem' }}>
                To be the primary sourcing partner for global food manufacturers and retail brands seeking Indian agricultural commodities, recognized for our commitment to quality, transparency, and sustainable B2B partnerships.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid-4">
            {values.map((v, idx) => (
              <ScrollReveal key={idx} delay={idx * 50}>
                <div className="card" style={{ height: '100%' }}>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-primary)', fontWeight: '600' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-mid)', lineHeight: '1.6' }}>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESSING EQUIPMENT & INFRASTRUCTURE ===== */}
      <section className="section-white section-padding">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="label gold-accent">Facilities & Processing</span>
              <h2>Advanced Processing Infrastructure</h2>
              <p className="section-subtitle">
                We invest in state-of-the-art machinery and processing technologies to ensure that every grain, seed, and spice matches the physical and chemical purity standards of global markets.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid-3">
            <ScrollReveal>
              <div className="card" style={{ height: '100%' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 'var(--space-2)' }} aria-hidden="true">🔬</span>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>In-House Testing Laboratory</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-mid)' }}>
                  Our facility houses a high-tech quality control laboratory staffed by qualified chemists. We perform analysis on raw materials and processed batches for moisture, ash content, and chemical metrics, and regularly submit batches for NABL-accredited third-party validation.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="card" style={{ height: '100%' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 'var(--space-2)' }} aria-hidden="true">⚙️</span>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>Sortex & Optical Grading</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-mid)' }}>
                  We utilize Sortex optical color sorters, gravity separators, and destoners. This equipment chain removes chaff, stones, glass, off-color grains, and physical defects, ensuring a purity level of up to 99.9% for seeds and grains.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="card" style={{ height: '100%' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 'var(--space-2)' }} aria-hidden="true">💨</span>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>Steam Sterilization</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-mid)' }}>
                  To meet the strict microbiological limits of UK, EU, and US markets, we operate a chemical-free steam sterilization facility. This process reduces total plate count (TPC) and eliminates pathogens while preserving the volatile oils, color, and aroma of spices.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== OUR PROCESS TIMELINE ===== */}
      <section className="section-ivory section-padding">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="label gold-accent">Quality Control Workflow</span>
              <h2>Our End-to-End Export Process</h2>
            </div>
          </ScrollReveal>
          <div className="grid-3" style={{ gap: 'var(--space-4)' }}>
            {processSteps.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 50}>
                <div className="card" style={{ height: '100%', position: 'relative' }}>
                  <span style={{ fontSize: '2.25rem', fontWeight: '800', color: 'rgba(200, 146, 42, 0.15)', position: 'absolute', top: 'var(--space-3)', right: 'var(--space-4)' }}>
                    {step.step}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: '600', marginRight: 'var(--space-6)' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-mid)', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP SECTION ===== */}
      <section className="section-white section-padding" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-6)' }}>
            <ScrollReveal>
              <div style={{ aspectRatio: '4/5', backgroundColor: 'var(--color-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '5rem' }} aria-hidden="true">👨‍💼</span>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <span className="label gold-accent">Leadership</span>
              <h2>Mr. Alok Dhanuka</h2>
              <span className="label" style={{ color: 'var(--color-mid)', marginBottom: 'var(--space-3)', display: 'block' }}>Founder & Managing Director</span>
              <p>
                Mr. Alok Dhanuka has over 30 years of direct trade experience in the Indian agricultural sector. In 1994, he established Sunita Exports with a simple vision: to bridge the gap between Indian agricultural origins and international food standards.
              </p>
              <p>
                Under his leadership, the firm successfully navigated the transition from local trading to international B2B shipments, implementing systematic quality management systems and securing global food safety certifications.
              </p>
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Link href="/contact" className="btn-primary">
                  Partner With Us
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
