import { faqSchema } from '@/lib/schemas';

/** FAQ accordion with FAQPage JSON-LD. */
export default function FaqSection({ faqs, eyebrow = 'FAQ', title = 'Frequently asked questions', lead, className = 'section section-soft' }) {
  return (
    <section className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <div className="container" style={{ display: 'grid', gap: 'clamp(24px, 4vw, 48px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', alignItems: 'start' }}>
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          {lead && <p className="lead">{lead}</p>}
        </div>
        <div className="faq-list" style={{ gridColumn: 'span 1' }}>
          {faqs.map((f, i) => (
            <details key={f.question} className="faq-item" open={i === 0}>
              <summary>{f.question}</summary>
              <div className="faq-answer">{f.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
