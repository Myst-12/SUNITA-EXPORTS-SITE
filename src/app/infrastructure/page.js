import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import FaqSection from '@/components/FaqSection';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';
import { COMPANY, whatsappLink } from '@/config/site';
import s from '../pages.module.css';
import x from './infrastructure.module.css';

export const metadata = {
  title: 'Infrastructure — Spice Processing Units at Unjha, Guntur & Nizamabad',
  description:
    'Two factories at Unjha, Gujarat and processing units at Guntur (Andhra Pradesh) and Nizamabad (Telangana): cleaning, colour sorting, grading, grinding and export packing, with lab reports from accredited laboratories.',
  alternates: { canonical: '/infrastructure/' },
};

const STATS = [
  { value: '2', label: 'factories at Unjha, Gujarat' },
  { value: '3', label: 'processing locations in India’s spice belts' },
  { value: 'Sortex', label: 'optical colour sorting on every line' },
  { value: 'Lab-tested', label: 'reports from accredited laboratories' },
];

// Each unit sits in the market town for the crop it handles, so produce is processed days, not weeks, after harvest.
const UNITS = [
  {
    place: 'Unjha, Gujarat',
    tag: '2 factories',
    img: '/images/infrastructure/processing-line.webp',
    alt: 'Cleaning and grading line with storage bins at the Unjha factory',
    text: 'Unjha is home to Asia’s largest seed-spice market. Our two factories here clean, sort, grade and pack cumin, fennel, coriander, fenugreek, ajwain, dill and psyllium straight from the market yard.',
    items: ['Cumin', 'Fennel', 'Coriander', 'Fenugreek', 'Ajwain', 'Psyllium'],
  },
  {
    place: 'Guntur, Andhra Pradesh',
    tag: 'Chilli unit',
    img: '/images/scenes/chilli-drying-tarp.webp',
    alt: 'Red chillies drying in the sun at Guntur',
    text: 'Guntur trades more dried chilli than anywhere else in India. Our unit here destems, grades and sorts chillies by colour and size, and grinds them into chilli powder and flakes.',
    items: ['334 / S4 chilli', 'Teja', 'Byadgi', 'Chilli powder', 'Chilli flakes'],
  },
  {
    place: 'Nizamabad, Telangana',
    tag: 'Turmeric unit',
    img: '/images/scenes/sacks-spices.webp',
    alt: 'Sacks of spices ready for processing',
    text: 'Nizamabad is one of India’s main turmeric markets. Fingers are polished, graded and checked for curcumin here, then milled into powder or cut into slices.',
    items: ['Turmeric fingers', 'Turmeric powder', 'Turmeric slices'],
  },
];

const PROCESS = [
  { title: 'Receiving & sampling', text: 'Every lot is sampled on arrival and checked for moisture, admixture and appearance before it is accepted.' },
  { title: 'Cleaning & destoning', text: 'Vibro sieves, aspirators and destoners remove dust, stones, stems and light foreign matter.' },
  { title: 'Optical colour sorting', text: 'Sortex colour sorters reject discoloured, damaged and off-type grains seed by seed.' },
  { title: 'Grading & sizing', text: 'Lots are graded to the purity, size and colour you specify — 99%, 99.5% or Singapore / Europe quality.' },
  { title: 'Grinding & sieving', text: 'Powders are milled at controlled temperature to keep colour and oil, then sieved to your mesh size.' },
  { title: 'Steam sterilisation', text: 'Available for spices and herbs bound for the USA, EU, UK, Australia and New Zealand.' },
  { title: 'Packing & checks', text: 'Packed in lined bags, cartons or retail packs, with batch coding and a final check before sealing.' },
  { title: 'Stuffing at Nhava Sheva', text: 'Containers are loaded and sealed with photos, ready for the full export paperwork.' },
];

const LAB = [
  'Moisture, purity and admixture on every lot',
  'Colour (ASTA), curcumin and volatile oil where the product needs it',
  'Pesticide residues and aflatoxins at accredited third-party laboratories',
  'Microbiology for steam-sterilised and ready-to-eat products',
  'Retained samples and batch records for traceability',
];

const GALLERY = [
  { img: '/images/infrastructure/colour-sorter.webp', alt: 'Optical colour sorter', caption: 'Optical colour sorting', big: true },
  { img: '/images/infrastructure/warehouse-hall.webp', alt: 'Covered storage hall with bagged produce', caption: 'Covered storage hall', tall: true },
  { img: '/images/infrastructure/sorting-line.webp', alt: 'Workers on a sorting line', caption: 'Hand inspection on the sorting line' },
  { img: '/images/infrastructure/conveyor-line.webp', alt: 'Packing and conveyor line', caption: 'Packing and conveying' },
  { img: '/images/infrastructure/bag-store.webp', alt: 'Palletised bags in a warehouse', caption: 'Palletised, ready to ship' },
];

const FAQS = [
  { question: 'Where are your factories?', answer: 'We have two factories at Unjha in Gujarat, and processing units at Guntur in Andhra Pradesh and Nizamabad in Telangana. Each sits in the main market town for the crops it handles.' },
  { question: 'Can I visit or see the factory before ordering?', answer: 'Yes. Buyers are welcome to visit by appointment, and we can arrange a live video walk-through of the line processing your order.' },
  { question: 'Do you test every shipment?', answer: 'Every lot is checked in-house for moisture, purity and appearance. On request we add reports from accredited third-party laboratories for pesticide residues, aflatoxins, microbiology and other parameters.' },
  { question: 'Can you process to my own specification?', answer: 'Yes. Purity, size, colour, mesh, moisture and packing are set to your specification and confirmed on a pre-shipment sample.' },
];

export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Infrastructure', href: '/infrastructure/' }]}
        eyebrow="Infrastructure"
        title="Our factories in India’s spice belts"
        lead={`Two factories at Unjha in Gujarat and processing units at Guntur and Nizamabad, with state-of-the-art machinery for cleaning, colour sorting, grading, grinding and export packing — so every lot leaves at international quality standards. In export since ${COMPANY.foundingYear}.`}
        image="/images/infrastructure/processing-line.webp"
        imageAlt="Processing line and storage bins at the Unjha factory"
      >
        <Link href="/contact/?product=Factory%20visit" className="btn btn-primary btn-lg">Book a factory visit <Icon name="arrow-right" /></Link>
        <a href={whatsappLink('Hello, I would like a video walk-through of your factory.')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg"><Icon name="whatsapp" /> Video walk-through</a>
      </PageHero>

      <section className="section-sm">
        <div className="container">
          <div className={s.stats}>
            {STATS.map((st) => (
              <div key={st.label} className={`${s.stat} ${x.stat}`}><strong>{st.value}</strong><span>{st.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${s.tintLime}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Processing where the crops are traded</h2>
              <p className="lead">Each unit sits in the market town for the crops it handles, so produce is cleaned and graded within days of reaching the mandi.</p>
            </div>
          </div>
          <div className={x.units}>
            {UNITS.map((u, i) => (
              <ScrollReveal key={u.place} delay={i * 80}>
                <article className={x.unit}>
                  <div className={x.unitImg}>
                    <Image src={u.img} alt={u.alt} fill sizes="(max-width: 900px) 100vw, 33vw" />
                    <span className={x.unitTag}>{u.tag}</span>
                  </div>
                  <div className={x.unitBody}>
                    <h3><Icon name="pin" size={18} /> {u.place}</h3>
                    <p>{u.text}</p>
                    <div className="chip-row">{u.items.map((it) => <span key={it} className="chip">{it}</span>)}</div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Inside our units</h2>
              <p className="lead">Machinery chosen for one job: export lots that look, test and cook the same from the first bag to the last.</p>
            </div>
          </div>
          <div className={x.gallery}>
            {GALLERY.map((g) => (
              <figure key={g.img} className={`${x.shot} ${g.big ? x.big : ''} ${g.tall ? x.tall : ''}`}>
                <Image src={g.img} alt={g.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${x.dark}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <h2>From market yard to sealed container</h2>
              <p className="lead">Eight stages every lot passes through before it ships from Mumbai.</p>
            </div>
          </div>
          <div className={`${s.steps} ${s.stepsDark} ${x.process}`}>
            {PROCESS.map((st, i) => (
              <ScrollReveal key={st.title} delay={(i % 4) * 60}>
                <div className={s.step}><h3>{st.title}</h3><p>{st.text}</p></div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.split}`}>
          <ScrollReveal>
            <div className={`${s.img} ${s.imgTall}`}><Image src="/images/infrastructure/quality-lab.webp" alt="Laboratory analysis under a microscope" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2>Quality control you can check</h2>
            <p className="lead">Our quality norms include reports from internationally benchmarked laboratories, so you can verify every claim before the container sails.</p>
            <ul className={s.checklist}>
              {LAB.map((l) => <li key={l}><Icon name="check-circle" size={18} /> {l}</li>)}
            </ul>
            <div className="btn-row mt-2">
              <Link href="/certifications/" className="btn btn-outline">See our certifications <Icon name="arrow-right" /></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section ${s.tintLime}`}>
        <div className={`container ${s.split}`}>
          <ScrollReveal>
            <h2>Storage that protects the crop</h2>
            <p className="lead">Covered, ventilated halls keep lots dry and separated by product and grade until they are packed.</p>
            <ul className={s.checklist}>
              <li><Icon name="check-circle" size={18} /> Bags stacked on pallets, off the floor and away from walls</li>
              <li><Icon name="check-circle" size={18} /> Lots kept apart by product, grade and buyer</li>
              <li><Icon name="check-circle" size={18} /> Regular pest control and fumigation before export</li>
              <li><Icon name="check-circle" size={18} /> First-in, first-out stock rotation</li>
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className={s.img}><Image src="/images/infrastructure/sack-store.webp" alt="Bagged produce stacked on pallets in a warehouse" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className={s.band}>
            <div className={x.cta}>
              <div>
                <h2>See your order being processed</h2>
                <p>Visit us at Unjha, Guntur or Nizamabad, or ask for a live video walk-through and pre-shipment samples.</p>
              </div>
              <div className="btn-row">
                <Link href="/contact/?product=Factory%20visit" className="btn btn-light">Book a visit <Icon name="arrow-right" /></Link>
                <a href={whatsappLink('Hello, I would like a video walk-through of your factory.')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" /> WhatsApp us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} eyebrow="Infrastructure FAQ" title="Questions buyers ask about our units" />
    </>
  );
}
