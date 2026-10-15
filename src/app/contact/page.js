import { Suspense } from 'react';
import PageHero from '@/components/PageHero';
import InquiryForm from '@/components/InquiryForm';
import FaqSection from '@/components/FaqSection';
import Icon from '@/components/Icon';
import { CONTACT, COMPANY, fullAddress, whatsappLink, mapsEmbedUrl, mapsLink } from '@/config/site';
import { localBusinessSchema } from '@/lib/schemas';
import styles from './contact.module.css';

export const metadata = {
  title: 'Get an Export Quote — Spices, Rice & Indian Groceries',
  description:
    'Request an export price for Indian spices, rice, pulses or a mixed FMCG container. FOB / CFR / CIF quotes within 24 hours from Sunita Agri Exports, Mumbai. WhatsApp +91 81692 82942.',
  alternates: { canonical: '/contact/' },
};

const FAQS = [
  { question: 'How quickly will I get a quote?', answer: 'Usually within 24 hours on working days (Mon–Sat, IST). Complex mixed-container lists may take a little longer while we confirm availability.' },
  { question: 'Can I get samples before ordering?', answer: 'Yes. We send samples of spices, rice and pulses for quality approval. Courier charges are usually paid by the buyer and adjusted against the first order.' },
  { question: 'What payment terms do you accept?', answer: 'Typically T/T with an advance and the balance against shipping documents, or an irrevocable L/C at sight. Terms for repeat buyers are discussed case by case.' },
  { question: 'Can I visit your office in Mumbai?', answer: `Yes — our office is at ${fullAddress()}. Please message us first so the right person is available.` },
];

export default function ContactPage() {
  return (
    <div data-quote-page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <PageHero
        compact
        crumbs={[{ label: 'Get a Quote', href: '/contact/' }]}
        eyebrow="Get a quote"
        title="Tell us what you need. We’ll price it within 24 hours."
        lead="Share your product list, quantities and port — for one product or a full mixed container. Prefer to chat? WhatsApp us directly."
      />

      <section className={`section-sm ${styles.wrap}`}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.formCard}>
            <Suspense fallback={<p className="text-muted">Loading form…</p>}>
              <InquiryForm />
            </Suspense>
          </div>

          <aside className={styles.side}>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={styles.waCard}>
              <Icon name="whatsapp" size={30} />
              <span>
                <small>Fastest reply · WhatsApp &amp; call</small>
                <strong>{CONTACT.quotePhone.display}</strong>
              </span>
              <Icon name="arrow-up-right" size={20} />
            </a>

            <div className={styles.infoCard}>
              <ul className={styles.info}>
                <li><span className="icon-tile"><Icon name="phone" /></span><div><small>Call</small><a href={`tel:${CONTACT.quotePhone.tel}`}>{CONTACT.quotePhone.display}</a></div></li>
                <li><span className="icon-tile"><Icon name="mail" /></span><div><small>Email</small><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div></li>
                <li><span className="icon-tile"><Icon name="pin" /></span><div><small>Office</small><a href={mapsLink()} target="_blank" rel="noopener noreferrer">{fullAddress()}</a></div></li>
                <li><span className="icon-tile"><Icon name="clock" /></span><div><small>Hours</small><span>{CONTACT.hours}</span></div></li>
              </ul>
            </div>

            <div className={styles.promise}>
              <p className={styles.promiseTitle}>What happens next</p>
              <ol>
                <li>We confirm grades, packing &amp; availability</li>
                <li>You receive a written FOB / CFR / CIF offer</li>
                <li>Samples, proforma invoice &amp; shipment plan</li>
              </ol>
              <p className="small text-muted">{COMPANY.status} · exporting since {COMPANY.foundingYear}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className={styles.mapWrap}>
            <iframe
              title="Sunita Agri Exports office location, Kandivali West, Mumbai"
              src={mapsEmbedUrl()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className={styles.mapCard}>
              <strong>{COMPANY.legalName}</strong>
              <p>{fullAddress()}</p>
              <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="link-arrow">Open in Google Maps <Icon name="arrow-right" /></a>
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} eyebrow="Before you order" title="Quick answers" />
    </div>
  );
}
