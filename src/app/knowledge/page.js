import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import FaqSection from '@/components/FaqSection';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';
import { blogPosts } from '@/data/blog';
import s from '../pages.module.css';

export const metadata = {
  title: 'Buyer Guides — How to Import Spices & Indian Food from India',
  description:
    'Practical guides for importers: how to import spices and Indian groceries from India, export documents, Incoterms (FOB, CFR, CIF), shelf life, packaging, container loading and payment terms.',
  alternates: { canonical: '/knowledge/' },
};

const STEPS = [
  { title: 'Define your list', text: 'Products, grades, pack sizes, labelling and target price. Check your country’s import rules for food.' },
  { title: 'Request quotes & samples', text: 'Compare specifications, not just price. Approve samples and agree the specification sheet.' },
  { title: 'Confirm order & payment', text: 'Proforma invoice, payment terms (T/T or L/C), Incoterm and shipment window.' },
  { title: 'Production & inspection', text: 'Cleaning, packing and lab tests. Optional third-party inspection before stuffing.' },
  { title: 'Shipping & documents', text: 'Container sails; you receive the bill of lading, invoice, packing list, certificates of origin and analysis.' },
  { title: 'Clearance & delivery', text: 'Your clearing agent clears customs using the documents; goods move to your warehouse.' },
];

const GUIDES = [
  { icon: 'file', title: 'Export documents', items: ['Commercial invoice & packing list', 'Bill of lading', 'Certificate of origin', 'Phytosanitary & fumigation certificates', 'Certificate of analysis'] },
  { icon: 'globe', title: 'Incoterms explained', items: ['FOB — you arrange sea freight from Nhava Sheva', 'CFR — we pay freight to your port', 'CIF — freight + marine insurance included', 'Choose based on your freight contracts'] },
  { icon: 'clock', title: 'Shelf life planning', items: ['Whole spices: up to 24 months', 'Ground spices: 12–18 months', 'Rice & pulses: 12–24 months', 'Packaged foods: check remaining life at stuffing'] },
  { icon: 'container', title: 'Container loading', items: ['20 ft FCL: about 18–24 MT bagged goods', '40 ft: higher volume for light items', 'Mixed loads planned by weight & volume', 'Desiccants & liners for humid routes'] },
];

const FAQS = [
  { question: 'How do I import spices from India for the first time?', answer: 'Start with a clear product list and your country’s import requirements, request quotes and samples from a registered Indian exporter, agree specifications and Incoterms, and work with a local clearing agent. Many first-time importers start with a mixed container to test several products at once.' },
  { question: 'What is the difference between FOB, CFR and CIF?', answer: 'FOB means the price covers goods loaded on the vessel in India; you pay freight and insurance. CFR adds sea freight to your port. CIF adds both freight and marine insurance. Import duties and local charges are always paid by the buyer.' },
  { question: 'How long does sea shipping from India take?', answer: 'Roughly 5–10 days to the Gulf, 18–25 days to Europe and East Africa, 25–35 days to the US East Coast and 20–30 days to Australia, depending on the route and transhipment.' },
];

export default function KnowledgePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Buyer Guides', href: '/knowledge/' }]}
        eyebrow="Knowledge centre"
        title="How to import spices & Indian food from India"
        lead="Clear, practical guidance for importers, distributors and supermarket buyers — from first enquiry to goods in your warehouse."
        image="/images/scenes/port-truck.webp"
        imageAlt="Containers being moved at port"
      />

      <section className={`section ${s.tintLime}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Step by step</span>
              <h2>The import process in six steps</h2>
            </div>
          </div>
          <div className={s.steps}>
            {STEPS.map((st) => <div key={st.title} className={s.step}><h3>{st.title}</h3><p>{st.text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Quick reference</span>
              <h2>Essentials every importer should know</h2>
            </div>
          </div>
          <div className={s.features}>
            {GUIDES.map((g, i) => (
              <ScrollReveal key={g.title} delay={i * 60}>
                <div className={s.feature}>
                  <span className={`icon-tile ${i % 2 ? 'turmeric' : 'lime'}`}><Icon name={g.icon} /></span>
                  <h3>{g.title}</h3>
                  <ul className={s.checklist} style={{ marginTop: 8 }}>
                    {g.items.map((it) => <li key={it} style={{ fontSize: '0.88rem', fontWeight: 600 }}><Icon name="check" size={15} /> {it}</li>)}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${s.tintWarm}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">In-depth articles</span>
              <h2>Guides &amp; insights</h2>
            </div>
            <Link href="/blog/" className="link-arrow">All articles <Icon name="arrow-right" /></Link>
          </div>
          <div className={s.cards}>
            {blogPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className={s.imgCard}>
                <div className={s.cardImg}><Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 100vw, 33vw" /></div>
                <div className={s.cardBody}>
                  <span className="small text-green" style={{ fontWeight: 700 }}>{p.readTime} read</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} eyebrow="Importer questions" title="Common first-time questions" />
    </>
  );
}
