import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import FaqSection from '@/components/FaqSection';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';
import { CERTIFICATIONS, CONTACT } from '@/config/site';
import { certificates } from '@/data/certificates';
import s from '../pages.module.css';

export const metadata = {
  title: 'Quality, Certifications & Export Logistics',
  description:
    'How Sunita Agri Exports controls quality — sourcing, cleaning, Sortex grading, lab testing and packing — plus our certifications (ISO 22000, ISO 9001, Kosher, FSSAI, APEDA, Spices Board, Star Export House) and export documentation.',
  alternates: { canonical: '/certifications/' },
};

const PROCESS = [
  { img: '/images/scenes/farmer.webp', title: 'Source at origin', text: 'Procurement from established growing belts and trusted mills, with pre-purchase samples checked.' },
  { img: '/images/scenes/market-sorting.webp', title: 'Clean & grade', text: 'Destoner, gravity separator and Sortex lines remove stones, dust, stems and discoloured grains.' },
  { img: '/images/scenes/lab.webp', title: 'Test', text: 'Moisture, purity, ash and extraneous matter checked; residue and microbiology testing through accredited labs on request.' },
  { img: '/images/scenes/pack-kraft-bag.webp', title: 'Pack', text: 'Food-grade bags, pouches and cartons, batch-coded and labelled to buyer and country requirements.' },
  { img: '/images/scenes/port-crane.webp', title: 'Stuff & ship', text: 'Containers inspected, fumigated where required, stuffed with photo records and sealed for Nhava Sheva.' },
];

const DOCS = ['Commercial invoice', 'Packing list', 'Bill of lading', 'Certificate of origin', 'Phytosanitary certificate', 'Fumigation certificate', 'Certificate of analysis', 'Health certificate (where required)', 'Halal / other certificates on request'];

const FAQS = [
  { question: 'Can I see your certificates before ordering?', answer: `Yes. Our ISO 22000, ISO 9001, Kosher, FSSAI, APEDA, Spices Board, Star Export House and IEC certificates are on this page as PDFs. For anything else, email ${CONTACT.email} or ask on WhatsApp.` },
  { question: 'Do you offer steam-sterilised spices?', answer: 'Yes. Steam sterilisation can be arranged for spices and herbs destined for the USA, EU, UK, Australia and New Zealand to meet microbiological requirements.' },
  { question: 'Can you test for pesticide residues and aflatoxins?', answer: 'Yes. On request we arrange third-party testing at accredited laboratories against the limits of your destination market, and share the reports before shipment.' },
  { question: 'Which port do you ship from?', answer: `Most shipments sail from ${CONTACT.port}. Other Indian ports can be arranged depending on product origin.` },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Quality & Certifications', href: '/certifications/' }]}
        eyebrow="Quality, compliance & logistics"
        title="Quality you can check — from farm to port"
        lead="Clean, graded, tested and properly documented. Here is how we make sure every shipment matches the specification you approved."
        image="/images/scenes/lab.webp"
        imageAlt="Food quality testing laboratory"
      >
        <Link href="/contact/" className="btn btn-primary btn-lg">Request specifications <Icon name="arrow-right" /></Link>
      </PageHero>

      <section className={`section ${s.tintLime}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Certifications &amp; memberships</span>
              <h2>Registered, certified and recognised</h2>
              <p className="lead">Scanned copies of our certificates are below — tap any one to open the full PDF.</p>
            </div>
          </div>
          <div className={s.badges}>
            {CERTIFICATIONS.map((c, i) => (
              <ScrollReveal key={c.key} delay={(i % 4) * 50}>
                <div className={s.badge}>
                  <span className={`icon-tile ${i % 3 === 1 ? 'lime' : i % 3 === 2 ? 'turmeric' : ''}`}><Icon name={c.key === 'star' ? 'award' : 'shield'} /></span>
                  <div><strong>{c.name}</strong><small>{c.full}</small></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="certificates" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Certificates</span>
              <h2>See the documents</h2>
              <p className="lead">Current copies of our certificates and registrations. Open or download any of them.</p>
            </div>
          </div>
          <div className={s.certGrid}>
            {certificates.map((c) => (
              <a key={c.key} href={c.pdf} target="_blank" rel="noopener noreferrer" className={s.certCard}>
                <div className={s.certImg}><Image src={c.image} alt={`${c.name} certificate of Sunita Agri Exports`} fill sizes="(max-width: 640px) 50vw, 25vw" /></div>
                <div className={s.certBody}>
                  <strong>{c.name}</strong>
                  <span>{c.what}</span>
                  <small>{c.issuer}</small>
                  <small className={s.certValid}>{c.valid}</small>
                  <span className={s.certOpen}><Icon name="file" size={14} /> View PDF</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div>
              <span className="eyebrow">Our process</span>
              <h2>Five checkpoints on every order</h2>
            </div>
          </div>
          <div className={s.cards}>
            {PROCESS.map((p, i) => (
              <ScrollReveal key={p.title} delay={(i % 3) * 70}>
                <div className={s.imgCard}>
                  <div className={s.cardImg}><Image src={p.img} alt={p.title} fill sizes="(max-width: 640px) 100vw, 33vw" /></div>
                  <div className={s.cardBody}><h3>{String(i + 1).padStart(2, '0')} · {p.title}</h3><p>{p.text}</p></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="logistics" className={`section ${s.tintWarm}`}>
        <div className={`container ${s.split}`}>
          <ScrollReveal>
            <div className={s.img}><Image src="/images/scenes/warehouse-forklift.webp" alt="Warehouse with goods ready for container loading" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <span className="eyebrow">Shipping &amp; logistics</span>
            <h2>Containers that clear customs smoothly</h2>
            <p className="lead">Full container loads (FCL), mixed consolidated containers and selected LCL shipments, quoted FOB, CFR or CIF.</p>
            <p className="small text-muted mt-2" style={{ fontWeight: 700 }}>Documents supplied with every shipment</p>
            <div className="chip-row mt-1">
              {DOCS.map((d) => <span key={d} className="chip"><Icon name="file" size={14} /> {d}</span>)}
            </div>
            <Link href="/mixed-container/" className="btn btn-outline mt-3">Mixed container service <Icon name="arrow-right" /></Link>
          </ScrollReveal>
        </div>
      </section>

      <FaqSection faqs={FAQS} eyebrow="Quality FAQ" title="Compliance questions" />
    </>
  );
}
