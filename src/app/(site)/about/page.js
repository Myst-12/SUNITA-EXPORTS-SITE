import Link from '@/components/Link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';
import Icon from '@/components/Icon';
import { COMPANY, EXHIBITIONS, CONTACT, DIRECTORS, yearsInBusiness } from '@/config/site';
import { certificates } from '@/data/certificates';
import { exportDestinations } from '@/data/countries';
import { HOME } from '@/data/home';
import { getAllProducts } from '@/data/products';
import s from '../pages.module.css';

export const metadata = {
  title: 'About Us: Food Exporter Since 2010',
  description:
    'Sunita Agri Exports, a Govt. recognised Star Export House in Mumbai, has exported Indian spices, rice, pulses and FMCG since 2010. Our story and trade fairs.',
  alternates: { canonical: '/about/' },
};

const VALUES = [
  { icon: 'shield', title: 'Quality first', text: 'Every lot is cleaned, graded and checked under experienced supervisors before it is packed.' },
  { icon: 'handshake', title: 'Commitment', text: 'Clear specifications, honest timelines and documents that clear customs the first time.' },
  { icon: 'users', title: 'Teamwork', text: 'One team in Mumbai coordinating sourcing, processing partners, packing and logistics for every order.' },
  { icon: 'globe', title: 'Serving the diaspora', text: 'We started by bringing authentic Indian flavours to Asian communities abroad — and still do.' },
];

// Only dated facts that can be shown (the founding year, documents, trade fairs). Add new ones as they happen.
const MILESTONES = [
  { when: String(COMPANY.foundingYear), what: 'Started exporting from Mumbai, serving the Asian community abroad with Indian foods, spices, pulses and provisions.' },
  { when: '2010s', what: 'Steady growth in the United States, Canada, Australia and Africa; consolidated (mixed) containers become our speciality.' },
  { when: 'FTP 2023', what: 'Recognised by the Government of India as a One Star Export House under Foreign Trade Policy 2023.' },
  { when: '2026', what: 'Exhibited at Gulfood, Dubai (Hall N10, stand N10-E23), alongside WorldFood Istanbul and Vietfood & Beverage.' },
  { when: 'Today', what: `${getAllProducts().length} products, ISO 22000, ISO 9001 and Kosher certified, shipping to ${COMPANY.countriesServed} countries.` },
];

// How an order is put together: a registered merchant exporter (APEDA, FSSAI) with two own factories in Unjha.
const MODEL = [
  { title: 'Source', text: 'We buy each crop from the region it is known for (cumin from Unjha, chilli from Guntur, turmeric from Erode and Nizamabad, cardamom and pepper from Kerala, basmati from Punjab and Haryana) through suppliers we have worked with for years.' },
  { title: 'Process', text: 'Cleaning, Sortex sorting, grading and grinding are done at our own two factories in Unjha (Gujarat) and at processing units in Guntur and Nizamabad, to the specification agreed with the buyer.' },
  { title: 'Check', text: 'Each lot is sampled and checked against the buyer’s specification before packing; a certificate of analysis goes with every shipment, and third-party lab reports can be arranged.' },
  { title: 'Pack & consolidate', text: 'Bulk bags, retail packs or private label. Many products are combined into one mixed container, planned by weight and volume.' },
  { title: 'Ship & document', text: `Loaded and sealed for ${CONTACT.port}, with the invoice, packing list, bill of lading, certificate of origin and phytosanitary certificates prepared by our team.` },
];

const QC = [
  'Specification agreed in writing before the order: purity, moisture, colour, volatile oil, mesh size, micro and pesticide limits.',
  'Samples from the lot you will receive, sent before shipment on request.',
  'Certificate of analysis with every lot; independent lab testing (e.g. pesticides, aflatoxin, micro) on request.',
  'Steam-sterilised spices for markets with strict microbiological limits.',
  'Food-safety management certified to ISO 22000 and quality management to ISO 9001.',
];

const WHY = [
  { title: 'One-stop sourcing', text: 'Spices, rice, pulses, oilseeds, herbs, dehydrated products and FMCG from one exporter.' },
  { title: 'Consolidation experts', text: 'Years of planning mixed containers for importers who need range, not just volume.' },
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
        title="Bringing India’s flavours to the world since 2010"
        lead={`${COMPANY.legalName} is a ${COMPANY.status} exporting Indian spices, rice, pulses, herbs and Indian groceries — one stop for all your food requirements from India.`}
        image="/images/scenes/market-sorting.webp"
        imageAlt="Spices being sorted and packed"
      />

      <section className={`section-sm ${s.tintLime}`}>
        <div className="container">
          <div className={s.stats}>
            <div className={s.stat}><strong><CountUp value={yearsInBusiness()} suffix="+" /></strong><span>years in export</span></div>
            <div className={s.stat}><strong><CountUp value={parseInt(COMPANY.countriesServed, 10)} suffix="+" /></strong><span>countries served</span></div>
            <div className={s.stat}><strong><CountUp value={total} /></strong><span>products listed</span></div>
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
              <p>Sunita Agri Exports was established in {COMPANY.foundingYear} with one intent: to serve the Asian community all over the world — especially everyone who loves Indian food and flavours. From the start we dealt in food, spices, pulses and general provisions.</p>
              <p>Over the years the business has grown substantially, especially in the United States, Canada, Australia and Africa, promoting Indian tastes worldwide. Today we specialise in exports of Indian spices, rice and branded products, products in our customers’ own brands, and customised consumer packaging.</p>
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
            <span className="eyebrow">Our journey</span>
            <h2>From one container to {COMPANY.countriesServed} countries</h2>
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

      <section className="section" id="leadership">
        <div className="container">
          <div className="section-head"><div><span className="eyebrow">Leadership</span><h2>The people you deal with</h2></div></div>
          <div className={s.leaders}>
            {DIRECTORS.map((d) => (
              <figure key={d.name} className={s.leader}>
                <div className={s.leaderImg}><Image src={d.image} alt={`${d.name}, ${d.role}, ${COMPANY.legalName}`} fill sizes="(max-width: 700px) 100vw, 320px" /></div>
                <figcaption>
                  <strong>{d.name}</strong>
                  <span>{d.role}, {COMPANY.legalName}</span>
                  {d.whatsapp && <a href={`https://wa.me/${d.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={15} /> {d.whatsapp}</a>}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-3" style={{ maxWidth: '62ch' }}>Buyers deal with the directors directly, from the first quote to the shipping documents. There is no agent in between.</p>
        </div>
      </section>

      <section className={`section ${s.tintLime}`} id="how-we-work">
        <div className="container">
          <div className="section-head"><div><span className="eyebrow">How we work</span><h2>A merchant exporter, explained</h2></div></div>
          <p style={{ maxWidth: '68ch' }}>We are registered with APEDA and FSSAI as a <strong>merchant exporter</strong>. That means we are not tied to one farm or one mill: we source each product where it is best, process it in our own two factories in Unjha or at specialist units, check it, and put it all on one invoice and one set of documents. You get one accountable supplier for a whole range.</p>
          <ol className={`${s.steps} mt-3`} style={{ listStyle: 'none', padding: 0 }}>
            {MODEL.map((m, i) => <li key={m.title} className={s.step}><h3>{i + 1}. {m.title}</h3><p>{m.text}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="section" id="quality">
        <div className={`container ${s.split}`}>
          <div>
            <span className="eyebrow">Quality control</span>
            <h2>How we make sure the container matches the sample</h2>
            <ul className="mt-3" style={{ display: 'grid', gap: 10, paddingLeft: '1.1em' }}>{QC.map((q) => <li key={q}>{q}</li>)}</ul>
            <Link href="/certifications/" className="link-arrow mt-3">Quality and logistics in detail <Icon name="arrow-right" /></Link>
          </div>
          <div>
            <span className="eyebrow">Certificates &amp; registrations</span>
            <ul className={s.certList}>
              {certificates.map((c) => (
                <li key={c.key}><a href={c.pdf} target="_blank" rel="noopener noreferrer"><strong>{c.name}</strong><span>{c.valid}</span></a></li>
              ))}
            </ul>
            <p className="small text-muted">Each links to the certificate PDF. Exports to {exportDestinations.length} key markets are covered in our <Link href="/exports/">market guides</Link>.</p>
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
            <h2>Meet us at trade fairs</h2>
            <p>We exhibit at international food fairs every year — Gulfood in Dubai, WorldFood Istanbul and Vietfood &amp; Beverage in Vietnam — to meet importers face to face and show samples. Tell us which fair you are visiting and we will set a time at our stand.</p>
            {EXHIBITIONS.map((e) => (
              <div key={e.name} className="mt-3" style={{ padding: 18, borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)' }}>
                <span className="chip chip-dark"><Icon name="calendar" size={14} /> Last exhibited · {e.edition}</span>
                <h3 className="mt-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.4rem' }}>{e.name} · {e.city}</h3>
                <p style={{ margin: 0 }}>{e.venue}</p>
                <p style={{ margin: '0.3rem 0 0', color: 'var(--lime-400)', fontWeight: 700 }}><Icon name="pin" size={15} /> {e.stand}</p>
              </div>
            ))}
            <Link href="/contact/" className="btn btn-accent mt-3">Ask about our next fair <Icon name="arrow-right" /></Link>
          </div>
          <div className={s.img}><Image src="/images/exhibitions/stand-n10-e23.webp" alt="Sunita Agri Exports stand N10-E23 at Gulfood, Dubai" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
        </div>
        <div className={`container ${s.fairPhotos}`}>
          {HOME.exhibitions.photos.slice(1, 9).map((p) => (
            <figure key={p.src}><div><Image src={p.src} alt={p.alt} fill sizes="(max-width: 700px) 50vw, 25vw" /></div><figcaption>{p.caption}</figcaption></figure>
          ))}
        </div>
      </section>
    </>
  );
}
