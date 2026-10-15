import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';
import Icon from '@/components/Icon';
import { COMPANY, EXHIBITIONS, CONTACT, yearsInBusiness } from '@/config/site';
import { getAllProducts } from '@/data/products';
import s from '../pages.module.css';

export const metadata = {
  title: 'About Us — Indian Spice & Food Exporter Since 1994',
  description:
    'Sunita Agri Exports Pvt. Ltd. is a Govt. recognised Star Export House in Mumbai exporting Indian spices, rice, pulses and FMCG groceries since 1994 to 40+ countries. Our story, values and trade fairs.',
  alternates: { canonical: '/about/' },
};

const VALUES = [
  { icon: 'shield', title: 'Quality first', text: 'Every lot is cleaned, graded and checked under experienced supervisors before it is packed.' },
  { icon: 'handshake', title: 'Commitment', text: 'Clear specifications, honest timelines and documents that clear customs the first time.' },
  { icon: 'users', title: 'Teamwork', text: 'Sourcing, processing, packing and logistics working as one team under one roof in Mumbai.' },
  { icon: 'globe', title: 'Serving the diaspora', text: 'We started by bringing authentic Indian flavours to Asian communities abroad — and still do.' },
];

const MILESTONES = [
  { when: '1994', what: 'Founded in Mumbai to serve the Asian community worldwide with Indian foods, spices, pulses and provisions.' },
  { when: '2000s', what: 'Steady growth in the United States, Canada, Australia and Africa; consolidated (mixed) containers become our speciality.' },
  { when: '2010s', what: 'Processing support with destoner, gravity separator, Sortex and pulveriser; private label and customised consumer packaging added.' },
  { when: 'Today', what: `${COMPANY.status} serving importers, supermarkets and distributors in ${COMPANY.countriesServed} countries.` },
];

const WHY = [
  { title: 'One-stop sourcing', text: 'Spices, rice, pulses, oilseeds, herbs, dehydrated products and FMCG from one exporter.' },
  { title: 'Consolidation experts', text: 'Decades of planning mixed containers for importers who need range, not just volume.' },
  { title: 'Processing support', text: 'Cleaning, grading, Sortex and grinding to buyer specification.' },
  { title: 'Export compliance', text: 'Certifications, lab reports and complete paperwork for every destination.' },
  { title: 'Private label', text: 'Products in your brand with customised consumer packaging.' },
  { title: 'Mumbai port advantage', text: `Close to ${CONTACT.port} for frequent sailings worldwide.` },
];

export default function AboutPage() {
  const total = getAllProducts().length;
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About Us', href: '/about/' }]}
        eyebrow={`Since ${COMPANY.foundingYear} · Mumbai, India`}
        title="Bringing India’s flavours to the world for over three decades"
        lead={`${COMPANY.legalName} is a ${COMPANY.status} exporting Indian spices, rice, pulses, fresh produce and general provisions — one stop for all your food requirements from India.`}
        image="/images/scenes/market-sorting.webp"
        imageAlt="Spices being sorted and packed"
      />

      <section className={`section-sm ${s.tintLime}`}>
        <div className="container">
          <div className={s.stats}>
            <div className={s.stat}><strong><CountUp value={yearsInBusiness()} suffix="+" /></strong><span>years in export</span></div>
            <div className={s.stat}><strong><CountUp value={parseInt(COMPANY.countriesServed, 10)} suffix="+" /></strong><span>countries served</span></div>
            <div className={s.stat}><strong><CountUp value={total} suffix="+" /></strong><span>products listed</span></div>
            <div className={s.stat}><strong>Star</strong><span>Export House (Govt. of India)</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.split}`}>
          <ScrollReveal>
            <span className="eyebrow">Our story</span>
            <h2>Started for the Indian diaspora. Built on trust.</h2>
            <div className="prose">
              <p>Sunita Agri Exports was established in {COMPANY.foundingYear} with one intent: to serve the Asian community all over the world — especially everyone who loves Indian food and flavours. From the start we dealt in food, spices, pulses, fresh fruits and general provisions.</p>
              <p>Over the years the business has grown substantially, especially in the United States, Canada, Australia and Africa, promoting Indian tastes worldwide. Today we specialise in exports of Indian spices, rice, fruits and branded products, products in our customers’ own brands, and customised consumer packaging.</p>
              <p>Above all, we specialise in <strong>consolidated (miscellaneous) container stuffing</strong> to each customer’s needs — so every requirement from India can ship from under one roof.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className={`${s.img} ${s.imgTall}`}><Image src="/images/scenes/whole-spices.webp" alt="Assorted whole Indian spices" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section ${s.tintWarm}`}>
        <div className={`container ${s.split}`}>
          <div>
            <span className="eyebrow">Milestones</span>
            <h2>Three decades of steady growth</h2>
            <ol className={`${s.timeline} mt-3`}>
              {MILESTONES.map((m) => (
                <li key={m.when}><strong>{m.when}</strong><p>{m.what}</p></li>
              ))}
            </ol>
          </div>
          <div className={s.features} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 60}>
                <div className={s.feature}>
                  <span className={`icon-tile ${i % 2 ? 'turmeric' : 'lime'}`}><Icon name={v.icon} /></span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div>
              <span className="eyebrow">Why buyers work with us</span>
              <h2>What makes us different</h2>
            </div>
          </div>
          <div className={s.steps}>
            {WHY.map((w) => (
              <div key={w.title} className={s.step}><h3>{w.title}</h3><p>{w.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="exhibitions" className="section section-dark">
        <div className={`container ${s.split}`}>
          <div>
            <span className="eyebrow on-dark">Trade fairs &amp; exhibitions</span>
            <h2>Meet us in person</h2>
            <p>We exhibit at leading international food trade fairs to meet importers face to face, show samples and plan new business.</p>
            {EXHIBITIONS.map((e) => (
              <div key={e.name} className="mt-3" style={{ padding: 18, borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)' }}>
                <span className="chip chip-dark"><Icon name="calendar" size={14} /> {e.edition}</span>
                <h3 className="mt-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.4rem' }}>{e.name} · {e.city}</h3>
                <p style={{ margin: 0 }}>{e.venue}</p>
                <p style={{ margin: '0.3rem 0 0', color: 'var(--lime-400)', fontWeight: 700 }}><Icon name="pin" size={15} /> {e.stand}</p>
              </div>
            ))}
            <Link href="/contact/" className="btn btn-accent mt-3">Book a meeting <Icon name="arrow-right" /></Link>
          </div>
          <div className={s.img}><Image src={EXHIBITIONS[0].image} alt="Dubai skyline — Gulfood venue city" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
        </div>
      </section>
    </>
  );
}
