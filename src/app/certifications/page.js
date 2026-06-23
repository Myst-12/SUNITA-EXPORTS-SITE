import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import CertCard from '@/components/CertCard';
import { certifications } from '@/data/certifications';

export const metadata = {
  title: 'Export Certifications | BRC, FDA, FSSAI, ISO, APEDA | Sunita Agri Exports',
  description: 'Sunita Agri Exports holds BRC Global Food Standard, FDA registration, FSSAI, ISO, APEDA, Spice Board, FIEO, and IMC certifications — ensuring compliance for global buyers.',
};

export default function CertificationsPage() {
  return (
    <>
      {/* ===== HERO HEADER ===== */}
      <section className="section-ivory section-padding" style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <span className="label gold-accent">Quality Assurance</span>
            <h1>International Compliance & Certifications</h1>
            <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
              We maintain 8 quality, safety, and trade certifications to ensure our products comply with the food import regulations of any destination country.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CERTIFICATIONS GRID ===== */}
      <section className="section-white section-padding">
        <div className="container">
          <div className="grid-3" style={{ gap: 'var(--space-4)' }}>
            {certifications.map((cert, index) => (
              <ScrollReveal key={cert.id} delay={index * 50}>
                <CertCard
                  name={cert.name}
                  shortName={cert.shortName}
                  issuingBody={cert.issuingBody}
                  description={cert.description}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Verification / Request Box */}
          <ScrollReveal>
            <div style={{ marginTop: 'var(--space-8)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', padding: 'var(--space-5)', backgroundColor: 'var(--color-ivory)', textAlign: 'center' }}>
              <span className="label gold-accent">Document Verification</span>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: 'var(--space-2)' }}>
                Need Copies of Our Certifications or Audits?
              </h3>
              <p style={{ color: 'var(--color-mid)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto var(--space-4) auto' }}>
                We provide complete verification documents, recent lab testing audits, and certification copies during vendor onboarding. Let us know if your quality team requires custom parameters.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
                <Link href="/contact" className="btn-primary">
                  Request Cert Copies
                </Link>
                <Link href="/why-choose-us" className="btn-secondary">
                  Our Testing Methods
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
