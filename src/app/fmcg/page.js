import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import ProductCard from '@/components/ProductCard';
import FaqSection from '@/components/FaqSection';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';
import { getCategoryBySlug } from '@/data/products';
import { COMPANY, whatsappLink } from '@/config/site';
import s from '../pages.module.css';

export const metadata = {
  title: 'Indian FMCG Exporter — Indian Grocery & Packaged Food Supplier',
  description:
    'Export of Indian FMCG and grocery products: snacks, biscuits, instant food, sweets, tea, pickles, papad, ghee, flours, pooja and personal care — consolidated with spices, rice and pulses in mixed containers from Mumbai.',
  alternates: { canonical: '/fmcg/' },
};

const RANGE = [
  { icon: 'package', title: 'Snacks & namkeen', text: 'Bhujia, sev, mixtures, chips, khakhra and roasted snacks in long shelf-life packs.' },
  { icon: 'box', title: 'Biscuits, rusk & cakes', text: 'Glucose, cream, digestive and nankhatai biscuits, rusks and tea cakes.' },
  { icon: 'clock', title: 'Instant & ready-to-eat', text: 'Noodles, vermicelli, idli/dosa and dessert mixes, ready-to-eat curries.' },
  { icon: 'star', title: 'Sweets & confectionery', text: 'Tinned rasgulla and gulab jamun, soan papdi, toffees and candies.' },
  { icon: 'leaf', title: 'Tea, coffee & beverages', text: 'CTC and leaf tea, masala chai, instant coffee, sherbets and syrups.' },
  { icon: 'flask', title: 'Pickles, pastes & sauces', text: 'Mango and lime pickles, ginger-garlic paste, chutneys and cooking sauces.' },
  { icon: 'layers', title: 'Flours, rice & dals', text: 'Atta, besan, suji, poha, basmati and regional rice, every everyday dal.' },
  { icon: 'thermometer', title: 'Ghee & dairy', text: 'Cow and buffalo ghee and shelf-stable dairy, where the destination allows import from India.' },
  { icon: 'sparkle', title: 'Pooja & festive', text: 'Agarbatti, dhoop, camphor and festive items for Diwali, Navratri and Eid.' },
  { icon: 'users', title: 'Personal & home care', text: 'Herbal toiletries, soaps, household cleaners and utensils.' },
];

const BUYERS = [
  { title: 'Indian & Asian grocery stores', text: 'Fill every aisle — from atta and dals to snacks and pooja items — with one supplier and one container.' },
  { title: 'Supermarkets & world-food aisles', text: 'Curated SKU lists with English labels, barcodes and shelf-life planning for mainstream retail.' },
  { title: 'Distributors & wholesalers', text: 'Regular consolidated loads and stable lead times for onward distribution in your region.' },
  { title: 'Restaurants & caterers', text: 'Bulk spices, rice, ghee, pastes and staples in catering pack sizes.' },
];

const FAQS = [
  { question: 'Which Indian FMCG products do you export?', answer: 'Snacks and namkeen, biscuits, instant foods and mixes, sweets, tea and beverages, pickles and pastes, papad, ghee, flours, rice, dals, spices and masalas, pooja items, personal care and household products. We source genuine products from established Indian manufacturers, subject to brand and export availability, or pack under your private label.' },
  { question: 'Can I combine FMCG with spices and rice in one container?', answer: 'Yes — that is our speciality. Most of our grocery buyers order a mixed 20 ft or 40 ft container combining packaged foods with bulk or retail spices, rice and pulses.' },
  { question: 'How do you manage shelf life for sea shipments?', answer: 'We plan stock so products leave India with the maximum possible remaining shelf life, check manufacturing dates before stuffing and share batch details with the packing list.' },
  { question: 'Do you handle labelling for my country?', answer: 'We supply products with English labelling as standard and can arrange importer stickers, ingredient translations or private-label packs to meet your country’s food labelling rules.' },
];

export default function FmcgPage() {
  const cat = getCategoryBySlug('foodstuff-fmcg');
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Indian FMCG', href: '/fmcg/' }]}
        eyebrow="Indian FMCG & grocery export"
        title="Stock a complete Indian aisle from one Mumbai partner"
        lead={`Packaged foods, beverages, staples and household essentials — consolidated with spices, rice and pulses into one container. Trusted by grocery importers since ${COMPANY.foundingYear}.`}
        image="/images/scenes/grocery-shelf.webp"
        imageAlt="Indian snacks and grocery products on store shelves"
      >
        <Link href="/contact/?product=Indian%20FMCG%20mixed%20container" className="btn btn-primary btn-lg">Send your SKU list <Icon name="arrow-right" /></Link>
        <a href={whatsappLink('Hello, I want to import Indian FMCG / grocery products.')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg"><Icon name="whatsapp" /> WhatsApp</a>
      </PageHero>

      <section className={`section ${s.tintLime}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">The range</span>
              <h2>Everything an Indian grocery shelf needs</h2>
              <p className="lead">Hundreds of SKUs across ten categories — choose ready brands available for export, or your own label.</p>
            </div>
          </div>
          <div className={s.features}>
            {RANGE.map((r, i) => (
              <ScrollReveal key={r.title} delay={(i % 4) * 60}>
                <div className={s.feature}>
                  <span className={`icon-tile ${i % 3 === 1 ? 'lime' : i % 3 === 2 ? 'turmeric' : ''}`}><Icon name={r.icon} /></span>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.split}`}>
          <ScrollReveal>
            <div className={s.img}><Image src="/images/scenes/supermarket-aisle.webp" alt="Supermarket aisle stocked with packaged food" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <span className="eyebrow">How it works</span>
            <h2>One list. One container. One invoice.</h2>
            <p className="lead">Instead of chasing ten Indian suppliers, send us one list. We source, check dates, pack and consolidate everything for a single shipment.</p>
            <ul className={s.checklist}>
              <li><Icon name="check-circle" size={18} /> Mix cartons of 50+ SKUs with bulk spices, rice &amp; dals</li>
              <li><Icon name="check-circle" size={18} /> Manufacturing dates checked before stuffing</li>
              <li><Icon name="check-circle" size={18} /> One packing list, one set of export documents</li>
              <li><Icon name="check-circle" size={18} /> FOB Nhava Sheva, CFR or CIF to your port</li>
            </ul>
            <Link href="/mixed-container/" className="btn btn-outline mt-3">How mixed containers work <Icon name="arrow-right" /></Link>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section ${s.tintWarm}`}>
        <div className="container">
          <div className="section-head center">
            <div>
              <span className="eyebrow">Who we supply</span>
              <h2>Built for grocery importers of every size</h2>
            </div>
          </div>
          <div className={s.steps}>
            {BUYERS.map((b) => (
              <div key={b.title} className={s.step}><h3>{b.title}</h3><p>{b.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      {cat && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Product pages</span>
                <h2>Browse FMCG categories</h2>
              </div>
              <Link href="/products/foodstuff-fmcg/" className="link-arrow">See all <Icon name="arrow-right" /></Link>
            </div>
            <div className="grid-4">
              {cat.products.slice(0, 8).map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}

      <FaqSection faqs={FAQS} eyebrow="FMCG export FAQ" title="Importing Indian groceries" />
    </>
  );
}
