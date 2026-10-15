import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import FaqSection from '@/components/FaqSection';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';
import { whatsappLink } from '@/config/site';
import { getCategoryBySlug } from '@/data/products';
import s from '../pages.module.css';

export const metadata = {
  title: 'Private Label Spices & Indian Food Packaging',
  description:
    'Private label spices, masalas, rice, pulses and Indian foods packed in India under your brand. Retail pouches 50 g–5 kg, jars, cartons and bulk 25–50 kg bags with your artwork and barcodes.',
  alternates: { canonical: '/private-label/' },
};

const PACKS = [
  { img: '/images/scenes/pack-kraft-pouch.webp', title: 'Stand-up & zipper pouches', text: '50 g to 5 kg · kraft, matte or glossy laminates · window options' },
  { img: '/images/scenes/jars-shelf.webp', title: 'Jars & shaker bottles', text: 'PET and glass for masalas, seeds, pickles and ghee' },
  { img: '/images/scenes/pack-kraft-bag.webp', title: 'Paper & gusset bags', text: 'Retail and food-service bags for rice, flours and pulses' },
  { img: '/images/scenes/warehouse-sacks.webp', title: 'Bulk bags', text: '25 / 50 kg PP woven, jute and multi-wall paper bags with liners' },
  { img: '/images/scenes/pack-cartons.webp', title: 'Export cartons', text: '5-ply master cartons, printed or plain, with shipping marks' },
  { img: '/images/scenes/pack-boxes.webp', title: 'Mono cartons & gift packs', text: 'Printed boxes for masalas, tea and festive assortments' },
];

const PRODUCTS = ['Whole & ground spices', 'Masala blends & curry powders', 'Basmati & regional rice', 'Dals & pulses', 'Flours, besan & suji', 'Poha, sago & makhana', 'Seeds & superfoods', 'Herbs & herbal powders', 'Pickles & pastes', 'Tea & masala chai'];

const STEPS = [
  { title: 'Brief', text: 'Products, pack sizes, target market and price point. Share your brand guidelines or let us suggest formats.' },
  { title: 'Samples & specs', text: 'We send product samples and agree specifications — grade, mesh size, purity, moisture and shelf life.' },
  { title: 'Artwork & printing', text: 'You supply or approve artwork; we arrange printing with barcodes, batch coding and country labelling.' },
  { title: 'Production & QC', text: 'Cleaned, sterilised if needed, packed and checked. Lab reports and photos before dispatch.' },
];

const FAQS = [
  { question: 'What is the minimum order for private label?', answer: 'It depends on the pack format and printing method. Many buyers start with one mixed container covering several SKUs. Printed laminate pouches usually need a minimum print run per design; stickers and labels allow smaller trial runs.' },
  { question: 'Can you design the packaging for us?', answer: 'Yes. We can work from your existing brand guidelines or coordinate artwork for new packs. You approve every design before printing.' },
  { question: 'Do you add barcodes and labelling for my country?', answer: 'Yes. We print your EAN/UPC barcodes, batch numbers, best-before dates, ingredient and allergen declarations and importer details as required by your market.' },
  { question: 'Can private label products be mixed with other items in one container?', answer: 'Absolutely. Private label packs can be combined with bulk spices, rice, pulses and other groceries in the same mixed container.' },
];

export default function PrivateLabelPage() {
  const { services } = getCategoryBySlug('private-label-oem');
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Private Label', href: '/private-label/' }]}
        eyebrow="Private label & packaging"
        title="Your brand. Packed in India. Ready for your shelves."
        lead="Spices, masalas, rice, pulses and Indian staples packed under your label — from 50 g retail pouches to 50 kg bulk bags, with your artwork, barcodes and labelling."
        image="/images/scenes/pack-kraft-pouch.webp"
        imageAlt="Kraft stand-up pouch packaging"
      >
        <Link href="/contact/?product=Private%20label" className="btn btn-primary btn-lg">Start a private label project <Icon name="arrow-right" /></Link>
        <a href={whatsappLink('Hello, I am interested in private label packing.')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg"><Icon name="whatsapp" /> WhatsApp</a>
      </PageHero>

      <section id="services" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Private label &amp; OEM services</h2>
              <p className="lead">Services around every product in our catalogue — from one private-label SKU to a full mixed container.</p>
            </div>
          </div>
          <div className={s.steps}>
            {services.map((sv) => (
              <div key={sv.name} className={s.step}>
                <h3>{sv.href ? <Link href={sv.href}>{sv.name}</Link> : sv.name}</h3>
                <p>{sv.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packaging" className={`section ${s.tintCream}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Packaging options</span>
              <h2>Formats for retail, food service &amp; bulk</h2>
              <p className="lead">Choose the format that fits your market and price point — we help you balance shelf appeal, shelf life and freight cost.</p>
            </div>
          </div>
          <div className={s.cards}>
            {PACKS.map((p, i) => (
              <ScrollReveal key={p.title} delay={(i % 3) * 70}>
                <div className={s.imgCard}>
                  <div className={s.cardImg}><Image src={p.img} alt={p.title} fill sizes="(max-width: 640px) 100vw, 33vw" /></div>
                  <div className={s.cardBody}><h3>{p.title}</h3><p>{p.text}</p></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.split}`}>
          <ScrollReveal>
            <span className="eyebrow">What we pack</span>
            <h2>Private label across the Indian pantry</h2>
            <p className="lead">Build a complete own-brand range from one source — consistent quality, coordinated packaging and one shipment.</p>
            <div className="chip-row mt-2">
              {PRODUCTS.map((p) => <span key={p} className="chip chip-lime">{p}</span>)}
            </div>
            <ul className={s.checklist}>
              <li><Icon name="check-circle" size={18} /> Steam sterilisation for USA, EU, UK, Australia &amp; NZ</li>
              <li><Icon name="check-circle" size={18} /> Custom blends made to your recipe</li>
              <li><Icon name="check-circle" size={18} /> Lab reports &amp; CoA with every batch</li>
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className={`${s.img} ${s.imgTall}`}><Image src="/images/scenes/spice-jars-top.webp" alt="Spices in jars viewed from above" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section ${s.tintLime}`}>
        <div className="container">
          <div className="section-head center">
            <div>
              <span className="eyebrow">How it works</span>
              <h2>From brief to shelf-ready packs</h2>
            </div>
          </div>
          <div className={s.steps}>
            {STEPS.map((st) => (
              <div key={st.title} className={s.step}><h3>{st.title}</h3><p>{st.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} eyebrow="Private label FAQ" title="Questions brand owners ask" />
    </>
  );
}
