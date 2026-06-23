import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'B2B Presence & Trade Platforms | Sunita Agri Exports',
  description: 'Find Sunita Agri Exports on leading B2B trade platforms. Connect with us on IndiaMART, TradeIndia, ExportHub, and more.',
};

export default function B2bPresencePage() {
  const platforms = [
    {
      name: 'IndiaMART Profile',
      type: 'TrustSEAL Verified',
      desc: 'Connect with us on IndiaMART, India\'s largest online B2B marketplace. We are a verified TrustSEAL member, reflecting our compliance, registration, and active business status.'
    },
    {
      name: 'TradeIndia Profile',
      type: 'Gold Member',
      desc: 'Find our extensive product catalog on TradeIndia. We maintain gold supplier listing status, allowing international buyers to request quotes and verify our business certifications.'
    },
    {
      name: 'Alibaba Directory',
      type: 'Global Trade Partner',
      desc: 'As a global supplier partner, we showcase our spices, basmati rice, and oilseeds list to international importers seeking consolidated container shipping directly from India.'
    },
    {
      name: 'ExportHub Profile',
      type: 'Registered Exporter',
      desc: 'Verify our trade history, manufacturing certifications, and cargo capacities on ExportHub, connecting Indian agricultural mills with international retail chains.'
    }
  ];

  return (
    <>
      {/* ===== HERO HEADER ===== */}
      <section className="section-ivory section-padding" style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <span className="label gold-accent">Directories</span>
            <h1>B2B Trade Platform Presence</h1>
            <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
              We are registered and verified on the world\'s leading international trade directories, providing transparency and third-party validation for import procurement teams.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PLATFORMS LIST ===== */}
      <section className="section-white section-padding">
        <div className="container">
          <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
            {platforms.map((platform, idx) => (
              <ScrollReveal key={idx} delay={idx * 50}>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', justify: 'space-between', height: '100%' }}>
                  <div>
                    <span className="label gold-accent" style={{ fontSize: '0.8rem' }}>{platform.type}</span>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--color-primary)' }}>{platform.name}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-mid)', lineHeight: '1.6' }}>{platform.desc}</p>
                  </div>
                  <div style={{ marginTop: 'var(--space-4)' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-primary)' }}>
                      Verified Exporter Status ✓
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Direct Sourcing Promotion */}
          <ScrollReveal>
            <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-5)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', backgroundColor: 'var(--color-ivory)', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: 'var(--space-2)' }}>Prefer Direct Sourcing without Intermediaries?</h3>
              <p style={{ color: 'var(--color-mid)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto var(--space-4) auto' }}>
                While we maintain active directories, contacting our sales team directly guarantees the fastest quote turnarounds, custom pricing discounts, and immediate sample coordination.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
                <a href="mailto:sales@sunitaexports.com" className="btn-primary">
                  Email sales@sunitaexports.com
                </a>
                <Link href="/contact" className="btn-secondary">
                  Open Inquiry Form
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
