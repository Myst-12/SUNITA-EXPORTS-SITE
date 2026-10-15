import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import FaqSection from '@/components/FaqSection';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';
import ContainerPlanner from '@/components/ContainerPlanner';
import { COMPANY, CONTACT, whatsappLink } from '@/config/site';
import s from '../pages.module.css';

export const metadata = {
  title: 'Mixed Container from India — Consolidated Spices, Rice & Grocery',
  description:
    'Ship Indian spices, rice, pulses and FMCG groceries together in one mixed 20 ft or 40 ft container. Consolidation, documentation and FOB / CIF shipping from Mumbai by Sunita Agri Exports since 1994.',
  alternates: { canonical: '/mixed-container/' },
};

const STEPS = [
  { title: 'Send your list', text: 'Products, grades, pack sizes and approximate quantities — a spreadsheet, a photo or a WhatsApp message all work.' },
  { title: 'Get a load plan & quote', text: 'We check availability, suggest a 20 ft or 40 ft plan by weight and volume, and send FOB / CFR / CIF prices.' },
  { title: 'We source & pack', text: 'Bulk items are cleaned and packed; branded goods are procured with dates checked; everything is labelled.' },
  { title: 'Stuffing & documents', text: 'Loaded and sealed at Mumbai with photos, packing list, invoice, certificate of origin and phytosanitary papers.' },
  { title: 'Ships to your port', text: 'Sailing from Nhava Sheva (JNPT) with tracking until arrival. One supplier, one bill of lading.' },
];

const WHY = [
  { icon: 'scale', title: 'Lower minimums', text: 'Order 1 MT of one spice and 50 cartons of another — no need to fill a container with a single product.' },
  { icon: 'layers', title: 'Fuller range on your shelves', text: 'Bring in 20, 50 or 100+ products at once and test new lines without big commitments.' },
  { icon: 'file', title: 'One set of paperwork', text: 'One invoice, one packing list, one bill of lading — simpler customs clearance and accounting.' },
  { icon: 'handshake', title: 'One accountable partner', text: `A single team in Mumbai responsible for quality, timing and documents — doing this since ${COMPANY.foundingYear}.` },
];

const FAQS = [
  { question: 'What is a mixed container?', answer: 'A mixed (consolidated) container is a single 20 ft or 40 ft shipping container carrying many different products — for example whole spices, basmati rice, dals, snacks and pickles — bought from one exporter on one invoice.' },
  { question: 'How many products can go in one container?', answer: 'There is no fixed limit. Our buyers typically combine 15 to 150 different items. We plan the load by weight and volume so the container is used efficiently and heavier goods are stowed safely.' },
  { question: 'What is the minimum for a mixed container?', answer: 'One 20 ft container. Within it, bulk items usually start from around 500 kg–1 MT and packaged goods from a few dozen cartons per SKU, depending on the product.' },
  { question: 'Which documents do I receive?', answer: 'Commercial invoice, packing list, bill of lading, certificate of origin, phytosanitary and fumigation certificates where required, and certificates of analysis for spices and food items.' },
  { question: 'How long does a mixed container take?', answer: 'Typically 2–4 weeks from order confirmation to sailing, depending on the list, private-label printing and vessel schedules. Transit time then depends on the destination.' },
];

export default function MixedContainerPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Mixed Container', href: '/mixed-container/' }]}
        eyebrow="Our speciality since 1994"
        title="Many products. One container. One supplier."
        lead="Combine whole and ground spices, rice, pulses, oilseeds and Indian FMCG groceries in a single 20 ft or 40 ft load — consolidated, documented and shipped from Mumbai."
        image="/images/scenes/port-day.webp"
        imageAlt="Shipping containers at port"
      >
        <a href="#planner" className="btn btn-primary btn-lg">Plan my container <Icon name="arrow-right" /></a>
        <a href={whatsappLink('Hello, I would like to plan a mixed container from India.')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg"><Icon name="whatsapp" /> Send list on WhatsApp</a>
      </PageHero>

      <section className={`section ${s.tintLime}`}>
        <div className="container">
          <div className="section-head center">
            <div>
              <span className="eyebrow">Why importers choose it</span>
              <h2>Smaller orders, wider range, less hassle</h2>
            </div>
          </div>
          <div className={s.features}>
            {WHY.map((w, i) => (
              <ScrollReveal key={w.title} delay={i * 70}>
                <div className={s.feature}>
                  <span className={`icon-tile ${i % 2 ? 'turmeric' : 'lime'}`}><Icon name={w.icon} /></span>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="planner" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Plan your mixed container</h2>
              <p className="lead">Pick the products you need and see how much of a 20 ft or 40 ft container they fill, then send the list to us for a quote.</p>
            </div>
          </div>
          <ContainerPlanner />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow on-dark">The process</span>
              <h2>From your list to your port in five steps</h2>
            </div>
          </div>
          <div className={`${s.steps} ${s.stepsDark}`}>
            {STEPS.map((st) => (
              <div key={st.title} className={s.step}><h3>{st.title}</h3><p>{st.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.split}`}>
          <ScrollReveal>
            <span className="eyebrow">Example load</span>
            <h2>What a 20 ft mixed container can look like</h2>
            <p className="lead">An illustrative load for an Indian grocery importer. Every container is planned to your own list and market.</p>
            <table className="spec-table mt-2" style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)' }}>
              <tbody>
                <tr><th scope="row">Whole &amp; ground spices (12 items)</th><td>4.0 MT</td></tr>
                <tr><th scope="row">Basmati &amp; Sona Masoori rice</th><td>6.0 MT</td></tr>
                <tr><th scope="row">Dals &amp; pulses (8 items)</th><td>5.0 MT</td></tr>
                <tr><th scope="row">Flours, poha &amp; sago</th><td>2.0 MT</td></tr>
                <tr><th scope="row">Snacks, papad &amp; sweets</th><td>420 cartons</td></tr>
                <tr><th scope="row">Pickles, pastes &amp; ghee</th><td>180 cartons</td></tr>
                <tr><th scope="row">Pooja &amp; household items</th><td>60 cartons</td></tr>
              </tbody>
            </table>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className={`${s.img} ${s.imgTall}`}><Image src="/images/scenes/warehouse-forklift.webp" alt="Warehouse with palletised goods ready for container stuffing" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section-sm ${s.tintWarm}`}>
        <div className="container">
          <div className={s.band}>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: 640 }}>
              <h2>Have a list ready?</h2>
              <p>Send it on WhatsApp to {CONTACT.quotePhone.display} or through our quote form. We reply with a load plan and prices within 24 hours.</p>
              <div className="btn-row mt-2">
                <Link href="/contact/?product=Mixed%20container" className="btn btn-accent">Request a quote <Icon name="arrow-right" /></Link>
                <Link href="/products/" className="btn btn-ghost-light">Browse products</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} eyebrow="Mixed container FAQ" title="Consolidated shipping, explained" />
    </>
  );
}
