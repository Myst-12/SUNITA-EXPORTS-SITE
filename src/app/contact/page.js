import ScrollReveal from '@/components/ScrollReveal';
import InquiryForm from '@/components/InquiryForm';

export const metadata = {
  title: 'Contact Sunita Agri Exports | Get a Quote or Request Samples',
  description: 'Get in touch with Sunita Agri Exports for bulk spice orders, sample requests, pricing, and export inquiries. Based in Mumbai, India. Call or email us today.',
};

export default function ContactPage() {
  return (
    <>
      {/* ===== HERO HEADER ===== */}
      <section className="section-ivory section-padding" style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <span className="label gold-accent">Contact Info</span>
            <h1>Get in Touch & Request Quotations</h1>
            <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Whether you want to request a free sample, discuss technical specifications, or request a container shipping quote, our export team is ready to assist you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== MAIN SECTION ===== */}
      <section className="section-white section-padding">
        <div className="container">
          <div className="grid-2" style={{ gap: 'var(--space-6)', alignItems: 'flex-start' }}>
            {/* Left Column: Form */}
            <ScrollReveal>
              <span className="label gold-accent">Sourcing Form</span>
              <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-4)' }}>Submit Your Bulk Inquiry</h2>
              <InquiryForm />
            </ScrollReveal>

            {/* Right Column: Contact info */}
            <div style={{ display: 'flex', flexNavigation: 'column', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <ScrollReveal>
                <span className="label gold-accent">Business Details</span>
                <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-4)' }}>Sunita Agri Exports Pvt. Ltd.</h2>
                <div className="card" style={{ backgroundColor: 'var(--color-ivory)', border: '1px solid var(--color-border)' }}>
                  <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <li style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <strong style={{ minWidth: '90px' }}>Address:</strong>
                      <span>1014, Ghanshyam Enclave, Laljipada, Link Road, Kandivali (West), Mumbai – 400 067, Maharashtra, India.</span>
                    </li>
                    <li style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <strong style={{ minWidth: '90px' }}>IEC Code:</strong>
                      <span>0307003450 [ASSUMED]</span>
                    </li>
                    <li style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <strong style={{ minWidth: '90px' }}>GSTIN:</strong>
                      <span>27AALCS9821F1ZS [ASSUMED]</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="grid-2" style={{ gap: 'var(--space-3)' }}>
                  <div className="card">
                    <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: 'var(--space-1)' }} aria-hidden="true">✉️</span>
                    <strong style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-mid)' }}>Sales Team</strong>
                    <a href="mailto:sales@sunitaexports.com" style={{ display: 'block', fontWeight: '600', marginTop: '4px' }}>
                      sales@sunitaexports.com
                    </a>
                    <a href="tel:+918169282942" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-mid)' }}>
                      +91 8169282942
                    </a>
                  </div>
                  <div className="card">
                    <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: 'var(--space-1)' }} aria-hidden="true">✉️</span>
                    <strong style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-mid)' }}>General Info</strong>
                    <a href="mailto:info@sunitaexports.com" style={{ display: 'block', fontWeight: '600', marginTop: '4px' }}>
                      info@sunitaexports.com
                    </a>
                    <a href="tel:+919004041889" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-mid)' }}>
                      +91 9004041889
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <span className="label gold-accent">Work Flow</span>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: 'var(--space-3)' }}>What Happens Next?</h3>
                <ol style={{ paddingLeft: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <li>
                    <strong>We Respond:</strong> We analyze your specs, volumes, and port destination, responding with details and preliminary pricing within 24 hours.
                  </li>
                  <li>
                    <strong>Sample Dispatched:</strong> If preliminary terms align, we coordinate sample dispatch via international courier (charges applicable).
                  </li>
                  <li>
                    <strong>Final Order Booking:</strong> Once samples are approved, we lock in contract prices, issue proforma invoices, and schedule production/loading.
                  </li>
                </ol>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP PLACEHOLDER ===== */}
      <section className="section-ivory section-padding" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="label gold-accent">Office Location</span>
              <h2>Registered Office in Kandivali West, Mumbai</h2>
            </div>
            <div style={{ height: '350px', backgroundColor: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--space-4)' }}>
              <span style={{ fontSize: '3rem' }} aria-hidden="true">📍</span>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginTop: '10px' }}>1014, Ghanshyam Enclave, Laljipada, Link Road</h3>
              <p style={{ color: 'var(--color-mid)', maxWidth: '500px' }}>
                Kandivali (West), Mumbai – 400 067, Maharashtra, India. Conveniently connected to Nhava Sheva (JNPT) sea port for fast logistics routing.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
