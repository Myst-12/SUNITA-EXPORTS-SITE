import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Icon from '@/components/Icon';
import { faqs } from '@/data/faq';
import { faqSchema } from '@/lib/schemas';
import { CONTACT, whatsappLink } from '@/config/site';
import s from '../pages.module.css';

export const metadata = {
  title: 'FAQ for Importers — MOQ, Payment, Shipping & Quality',
  description:
    'Answers for international buyers: minimum order quantity, payment terms, mixed containers, private label, certifications, documents, shelf life and shipping from India.',
  alternates: { canonical: '/faq/' },
};

const GROUPS = [
  { key: 'ordering', title: 'Ordering & payment', icon: 'file' },
  { key: 'shipping', title: 'Shipping & documents', icon: 'ship' },
  { key: 'quality', title: 'Quality & certifications', icon: 'shield' },
  { key: 'general', title: 'General', icon: 'globe' },
];

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <PageHero
        compact
        crumbs={[{ label: 'FAQ', href: '/faq/' }]}
        eyebrow="Buyer FAQ"
        title="Everything importers ask before ordering"
        lead="Minimum quantities, payment, documents, shelf life and quality — answered plainly. Can’t find yours? Ask us on WhatsApp."
      >
        <a href={whatsappLink('Hello, I have a question about importing from India.')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" /> Ask on WhatsApp</a>
        <Link href="/contact/" className="btn btn-outline">Get a quote</Link>
      </PageHero>

      <section className={`section ${s.tintLime}`}>
        <div className="container container-narrow" style={{ display: 'grid', gap: 40 }}>
          {GROUPS.map((g) => {
            const items = faqs.filter((f) => f.category === g.key);
            if (!items.length) return null;
            return (
              <div key={g.key} id={g.key}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '1.5rem' }}>
                  <span className="icon-tile" style={{ margin: 0 }}><Icon name={g.icon} /></span> {g.title}
                </h2>
                <div className="faq-list mt-2">
                  {items.map((f) => (
                    <details key={f.id} className="faq-item">
                      <summary>{f.question}</summary>
                      <div className="faq-answer">{f.answer}</div>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
          <p className="text-muted center">Still have a question? Email <a className="text-green" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
        </div>
      </section>
    </>
  );
}
