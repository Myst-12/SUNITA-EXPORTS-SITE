import ScrollReveal from '@/components/ScrollReveal';
import { faqs } from '@/data/faq';
import Link from 'next/link';
import FaqAccordion from './FaqAccordion';

export const metadata = {
  title: 'FAQs for International Buyers | Sunita Agri Exports',
  description: 'Common questions from importers about buying Indian spices, minimum orders, documentation, certifications, and shipping from Sunita Agri Exports.',
};

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ===== HERO HEADER ===== */}
      <section className="section-ivory section-padding" style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <span className="label gold-accent">FAQ</span>
            <h1>Frequently Asked Questions</h1>
            <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Find quick answers to common regulatory, logistical, quality, and commercial questions from international agricultural commodity buyers.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== ACCORDION LIST ===== */}
      <section className="section-white section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <ScrollReveal>
            <FaqAccordion faqs={faqs} />
          </ScrollReveal>

          {/* Sourcing CTA */}
          <ScrollReveal>
            <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-5)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', backgroundColor: 'var(--color-ivory)', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: 'var(--space-2)' }}>Have Another Question?</h3>
              <p style={{ color: 'var(--color-mid)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto var(--space-4) auto' }}>
                Our logistics and trade compliance specialists are standing by to clarify custom requirements, shipping lines, and local certificate needs.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
                <Link href="/contact" className="btn-primary">
                  Inquire Now
                </Link>
                <a href="tel:+918169282942" className="btn-secondary">
                  Call Sales Team
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
