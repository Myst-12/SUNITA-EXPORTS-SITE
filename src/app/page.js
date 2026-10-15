import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';
import { categories, getAllProducts } from '@/data/products';
import { exportDestinations } from '@/data/countries';
import { COMPANY, CERTIFICATIONS, EXHIBITIONS, whatsappLink, yearsInBusiness, flagCode } from '@/config/site';
import { faqSchema } from '@/lib/schemas';
import styles from './home.module.css';

export const metadata = {
  title: { absolute: 'Indian Spices Exporter & Indian Grocery Supplier | Sunita Agri Exports, Mumbai' },
  description:
    'Sunita Agri Exports — Indian spices, rice, pulses and FMCG groceries exported from Mumbai since 1994 to 40+ countries. Mixed containers, private label, FOB/CIF quotes in 24 hours.',
  alternates: { canonical: '/' },
};

const FEATURED = ['turmeric-fingers', 'cumin-seeds', 'red-chilli', 'cardamom', 'black-pepper', 'traditional-basmati-rice', 'coriander-seeds', 'kalonji-nigella-seeds'];

const RIBBON = ['red-chilli', 'turmeric-fingers', 'cardamom', 'traditional-basmati-rice', 'star-anise', 'cinnamon', 'chana-dal', 'black-pepper', 'cloves', 'rajma-kidney-beans', 'sesame-seeds-white', 'garam-masala', 'jaggery', 'tea-beverages'];

const STEPS = [
  { icon: 'search', title: 'Share your list', text: 'Send product names, grades, pack sizes and destination port — or just a photo of your shelf.' },
  { icon: 'layers', title: 'We source & consolidate', text: 'Spices, staples and FMCG from our network, cleaned, packed and checked under one roof in Mumbai.' },
  { icon: 'ship', title: 'One container ships', text: 'A single 20 ft or 40 ft load, one set of documents, FOB / CFR / CIF to your port.' },
];

const FMCG_CHIPS = ['Snacks & namkeen', 'Biscuits & rusk', 'Instant food & mixes', 'Sweets', 'Tea & beverages', 'Pickles & pastes', 'Papad & fryums', 'Ghee & oils', 'Flours & atta', 'Pooja & incense', 'Personal care', 'Household'];

const PACKS = [
  { img: '/images/scenes/pack-kraft-pouch.webp', title: 'Retail pouches', text: '50 g – 5 kg stand-up & zipper pouches' },
  { img: '/images/scenes/warehouse-sacks.webp', title: 'Bulk bags', text: '25 / 50 kg PP, jute & paper bags' },
  { img: '/images/scenes/jars-shelf.webp', title: 'Jars & bottles', text: 'PET & glass for masalas, pickles, ghee' },
  { img: '/images/scenes/pack-cartons.webp', title: 'Export cartons', text: 'Master cartons, labels & barcodes' },
];

const PROCESS = [
  { img: '/images/scenes/farmer.webp', title: 'Source', text: 'Direct from growing belts — Unjha, Guntur, Kerala, Punjab and more.' },
  { img: '/images/scenes/market-sorting.webp', title: 'Clean & grade', text: 'Destoning, gravity separation, Sortex and pulverising to spec.' },
  { img: '/images/scenes/lab.webp', title: 'Test', text: 'Moisture, purity, ash & residue checks with CoA on every lot.' },
  { img: '/images/scenes/port-crane.webp', title: 'Pack & ship', text: 'Stuffed and sealed for Nhava Sheva with full export documents.' },
];

const HOME_FAQS = [
  {
    question: 'Can you ship spices, rice, pulses and Indian groceries in one container?',
    answer: 'Yes. Consolidated (mixed) containers are our speciality since 1994 — you can combine dozens of products and categories, from whole spices and basmati rice to snacks, pickles and pooja items, in a single 20 ft or 40 ft container with one set of documents.',
  },
  {
    question: 'What is the minimum order quantity?',
    answer: 'For a mixed load we work from one 20 ft container. For bulk single products the usual minimum is 1 metric ton per item. Trial orders and samples can be arranged for new buyers.',
  },
  {
    question: 'Do you offer private label packaging?',
    answer: 'Yes. We pack spices, masalas, rice, pulses and staples under your brand in retail pouches, jars and cartons from 50 g to 5 kg, as well as bulk 25–50 kg bags — with your artwork, labels and barcodes.',
  },
  {
    question: 'Which price terms do you quote?',
    answer: 'We quote FOB Nhava Sheva (Mumbai), CFR or CIF to your port. Because commodity prices move daily, every quote is prepared fresh for your product list, grades and quantity — usually within 24 hours.',
  },
  {
    question: 'Which countries do you export to?',
    answer: 'More than 40 countries, including the USA, Canada, UK, Australia, New Zealand, UAE, Saudi Arabia, Kuwait, Oman, Qatar, Singapore, Malaysia, Japan, Turkey and East Africa.',
  },
];

export default function HomePage() {
  const all = getAllProducts();
  const featured = FEATURED.map((slug) => all.find((p) => p.slug === slug)).filter(Boolean);
  const totalProducts = all.length;
  const gulfood = EXHIBITIONS[0];
  const ribbon = RIBBON.map((slug) => all.find((p) => p.slug === slug)).filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS)) }} />

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <span className={`${styles.blob} ${styles.blobA}`} aria-hidden="true" />
        <span className={`${styles.blob} ${styles.blobB}`} aria-hidden="true" />
        <svg className={`${styles.leaf} ${styles.leafA}`} viewBox="0 0 64 64" aria-hidden="true"><path d="M8 56C8 26 26 8 56 8c0 30-18 48-48 48z" /><path d="M8 56 40 24" /></svg>
        <svg className={`${styles.leaf} ${styles.leafB}`} viewBox="0 0 64 64" aria-hidden="true"><path d="M8 56C8 26 26 8 56 8c0 30-18 48-48 48z" /><path d="M8 56 40 24" /></svg>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.heroBadge}><Icon name="award" size={16} /> {COMPANY.status} · Mumbai, India</span>
            <h1 className={styles.heroTitle}>
              Indian spices &amp; groceries, <span className={styles.heroAccent}>exported right</span> since {COMPANY.foundingYear}.
            </h1>
            <p className={styles.heroLead}>
              Whole &amp; ground spices, basmati rice, pulses and 100+ Indian food products — sourced, cleaned, packed and
              shipped from Mumbai. Mix any products in one container, under our brand or yours.
            </p>
            <div className="btn-row">
              <Link href="/contact/" className="btn btn-primary btn-lg">Get an Export Quote <Icon name="arrow-right" /></Link>
              <Link href="/products/" className="btn btn-outline btn-lg">Explore Products</Link>
            </div>
            <dl className={styles.heroStats}>
              <div><dt><CountUp value={yearsInBusiness()} suffix="+" /></dt><dd>years exporting</dd></div>
              <div><dt><CountUp value={parseInt(COMPANY.countriesServed, 10)} suffix="+" /></dt><dd>countries served</dd></div>
              <div><dt><CountUp value={totalProducts} suffix="+" /></dt><dd>products</dd></div>
              <div><dt>1</dt><dd>container, any mix</dd></div>
            </dl>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroImgMain}>
              <Image src="/images/scenes/hero-colour.webp" alt="Whole and ground Indian spices — turmeric, chilli, cinnamon, star anise and cardamom" fill priority sizes="(max-width: 900px) 100vw, 46vw" />
            </div>
            <div className={styles.heroImgSmall}>
              <Image src="/images/scenes/market-chilli-sacks.webp" alt="Dried red chillies in jute sacks" fill sizes="200px" />
            </div>
            <div className={`${styles.floatCard} ${styles.floatTop}`}>
              <span className="icon-tile lime"><Icon name="container" /></span>
              <div>
                <strong>Mixed containers</strong>
                <small>Spices + rice + FMCG in one load</small>
              </div>
            </div>
            <div className={`${styles.floatCard} ${styles.floatBottom}`}>
              <span className="icon-tile turmeric"><Icon name="calendar" /></span>
              <div>
                <strong>Meet us at {gulfood.name} {gulfood.edition}</strong>
                <small>{gulfood.stand}</small>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.certStrip} aria-label="Certifications and memberships">
          <div className="marquee">
            <div className="marquee-track">
              {[...CERTIFICATIONS, ...CERTIFICATIONS].map((c, i) => (
                <span key={`${c.key}-${i}`} className={styles.certItem} aria-hidden={i >= CERTIFICATIONS.length}>
                  <Icon name="shield" size={16} /> {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT RIBBON ===== */}
      <section className={styles.ribbon} aria-label="Popular export products">
        <div className="marquee">
          <div className={`marquee-track ${styles.ribbonTrack}`}>
            {[...ribbon, ...ribbon].map((p, i) => (
              <Link key={`${p.slug}-${i}`} href={`/products/${p.category}/${p.slug}/`} className={styles.ribbonItem} tabIndex={i >= ribbon.length ? -1 : undefined} aria-hidden={i >= ribbon.length}>
                <span className={styles.ribbonImg}><Image src={p.image} alt="" fill sizes="64px" /></span>
                <span>{p.name.split(' (')[0]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className={`section ${styles.tintLime}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Product catalogue</span>
              <h2>Everything an Indian food importer needs</h2>
              <p className="lead">{totalProducts}+ export-grade products across {categories.length} categories — bulk, retail or private label.</p>
            </div>
            <Link href="/products/" className="link-arrow">View all products <Icon name="arrow-right" /></Link>
          </div>

          <div className={styles.catGrid}>
            {categories.slice(0, 9).map((c, i) => (
              <ScrollReveal key={c.slug} delay={i * 40}>
                <Link href={`/products/${c.slug}/`} className={`${styles.catTile} ${i === 0 ? styles.catTileLarge : ''}`}>
                  <Image src={c.image} alt={c.name} fill sizes={i === 0 ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 50vw, 25vw'} />
                  <span className={styles.catShade} />
                  <span className={styles.catText}>
                    <strong>{c.name}</strong>
                    <small>{c.productCount} products <Icon name="arrow-right" size={14} /></small>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className={styles.catMore}>
            {categories.slice(9).map((c) => (
              <Link key={c.slug} href={`/products/${c.slug}/`} className="chip">{c.name} <span className="text-muted">· {c.productCount}</span></Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED SPICES ===== */}
      <section className={`section ${styles.tintGreen}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Best sellers</span>
              <h2>Spices buyers order most</h2>
              <p className="lead">Machine-cleaned, graded and tested. Steam sterilisation available for the USA, EU, Australia &amp; NZ.</p>
            </div>
            <Link href="/products/indian-spices/" className="link-arrow">All spices <Icon name="arrow-right" /></Link>
          </div>
          <div className="grid-4">
            {featured.map((p, i) => (
              <ScrollReveal key={p.slug} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MIXED CONTAINER ===== */}
      <section className={`section ${styles.mixed}`}>
        <div className={`container ${styles.split}`}>
          <ScrollReveal>
            <span className="eyebrow on-dark">Our speciality since 1994</span>
            <h2>One supplier. Many products. <span className={styles.lime}>One container.</span></h2>
            <p className={styles.mixedLead}>
              Small and mid-size importers shouldn’t need ten Indian suppliers. Tell us your list — spices, rice, pulses,
              snacks, pickles, pooja items — and we consolidate it into a single shipment.
            </p>
            <ol className={styles.steps}>
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="btn-row mt-3">
              <Link href="/mixed-container/" className="btn btn-accent">How mixed containers work <Icon name="arrow-right" /></Link>
              <a href={whatsappLink('Hello, I would like to plan a mixed container from India.')} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light"><Icon name="whatsapp" /> Send your list</a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className={styles.manifestWrap}>
            <div className={styles.manifestImg}>
              <Image src="/images/scenes/port-day.webp" alt="Shipping containers at port" fill sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
            <div className={styles.manifest}>
              <p className={styles.manifestTitle}><Icon name="container" size={18} /> Sample 20 ft mixed load</p>
              <ul>
                <li><span>Whole &amp; ground spices</span><b>4.0 MT</b></li>
                <li><span>Basmati &amp; Sona Masoori rice</span><b>6.0 MT</b></li>
                <li><span>Dals &amp; pulses</span><b>5.0 MT</b></li>
                <li><span>Snacks, papad &amp; sweets</span><b>420 ctns</b></li>
                <li><span>Pickles, pastes &amp; ghee</span><b>180 ctns</b></li>
              </ul>
              <p className={styles.manifestNote}>Illustrative — every load is planned to your list.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FMCG ===== */}
      <section className={`section ${styles.tintWarm}`}>
        <div className={`container ${styles.split}`}>
          <ScrollReveal className={styles.mosaic}>
            <div className={styles.mosaicA}><Image src="/images/scenes/grocery-shelf.webp" alt="Indian grocery snacks on store shelves" fill sizes="(max-width: 900px) 60vw, 28vw" /></div>
            <div className={styles.mosaicB}><Image src="/images/products/papad.webp" alt="Colourful Indian fryums" fill sizes="(max-width: 900px) 40vw, 18vw" /></div>
            <div className={styles.mosaicC}><Image src="/images/products/tea.webp" alt="Indian masala chai in clay cups" fill sizes="(max-width: 900px) 40vw, 18vw" /></div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <span className="eyebrow">Indian FMCG &amp; grocery</span>
            <h2>Stock a complete Indian aisle from one partner</h2>
            <p className="lead">
              Packaged foods, beverages and household essentials from established Indian manufacturers — or packed under your
              own label — with export shelf life and labelling for your market.
            </p>
            <div className="chip-row mt-2">
              {FMCG_CHIPS.map((c) => <span key={c} className="chip">{c}</span>)}
            </div>
            <div className="btn-row mt-3">
              <Link href="/fmcg/" className="btn btn-primary">Explore FMCG range <Icon name="arrow-right" /></Link>
              <Link href="/products/foodstuff-fmcg/" className="btn btn-outline">See products</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PRIVATE LABEL & PACKAGING ===== */}
      <section className={`section ${styles.tintCream}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Private label &amp; packaging</span>
              <h2>Your brand, packed in India</h2>
              <p className="lead">From 50 g retail pouches to 50 kg bulk bags — your artwork, your barcodes, export-ready cartons.</p>
            </div>
            <Link href="/private-label/" className="link-arrow">Private label service <Icon name="arrow-right" /></Link>
          </div>
          <div className="grid-4">
            {PACKS.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 60}>
                <figure className={styles.pack}>
                  <div className="media ratio-43"><Image src={p.img} alt={p.title} fill sizes="(max-width: 860px) 50vw, 25vw" /></div>
                  <figcaption>
                    <strong>{p.title}</strong>
                    <span>{p.text}</span>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className={`section ${styles.tintGreen}`}>
        <div className="container">
          <div className="section-head center">
            <div>
              <span className="eyebrow">Farm to port</span>
              <h2>Quality you can check at every step</h2>
              <p className="lead">Processing on destoner, gravity separator, Sortex and pulveriser lines — with lab reports for every shipment.</p>
            </div>
          </div>
          <div className={styles.process}>
            {PROCESS.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 70} className={styles.processItem}>
                <div className="media ratio-43"><Image src={s.img} alt={s.title} fill sizes="(max-width: 860px) 50vw, 25vw" /></div>
                <span className={styles.processNum}>0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </ScrollReveal>
            ))}
          </div>
          <div className="center mt-3">
            <Link href="/certifications/" className="link-arrow">Quality &amp; certifications <Icon name="arrow-right" /></Link>
          </div>
        </div>
      </section>

      {/* ===== GLOBAL REACH + EXHIBITION ===== */}
      <section className={`section ${styles.tintLime}`}>
        <div className={`container ${styles.reach}`}>
          <ScrollReveal className={styles.reachCopy}>
            <span className="eyebrow">Global reach</span>
            <h2>Shipping to {COMPANY.countriesServed} countries</h2>
            <p className="lead">Strongest in North America, the Gulf, Australia &amp; NZ and Africa — with labelling and documents for each market.</p>
            <div className={styles.countryGrid}>
              {exportDestinations.map((d) => (
                <Link key={d.slug} href={`/exports/${d.slug}/`} className={styles.country}>
                  <span className={styles.code} aria-hidden="true">{flagCode(d.flag)}</span> {d.name}
                </Link>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <article className={styles.expo}>
              <div className={styles.expoImg}>
                <Image src={gulfood.image} alt={`${gulfood.city} skyline`} fill sizes="(max-width: 900px) 100vw, 40vw" />
                <span className={styles.expoTag}>Exhibitor</span>
              </div>
              <div className={styles.expoBody}>
                <p className="eyebrow">Trade fairs</p>
                <h3>{gulfood.name} {gulfood.edition} · {gulfood.city}</h3>
                <p className="text-muted">{gulfood.venue}</p>
                <p className={styles.expoStand}><Icon name="pin" size={16} /> {gulfood.stand}</p>
                <Link href="/contact/" className="btn btn-primary btn-sm mt-2">Book a meeting <Icon name="arrow-right" /></Link>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className={`section ${styles.tintWarm}`}>
        <div className={`container ${styles.faqWrap}`}>
          <div>
            <span className="eyebrow">Buyer questions</span>
            <h2>Straight answers before you order</h2>
            <p className="lead">Still unsure? Our export team replies on WhatsApp and email within one business day.</p>
            <div className="btn-row mt-3">
              <Link href="/faq/" className="btn btn-outline">All FAQs</Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" /> Ask on WhatsApp</a>
            </div>
          </div>
          <div className="faq-list">
            {HOME_FAQS.map((f, i) => (
              <details key={f.question} className="faq-item" open={i === 0}>
                <summary>{f.question}</summary>
                <div className="faq-answer">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
