import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import FaqSection from '@/components/FaqSection';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';
import { FMCG_CATEGORIES, FMCG_TOTAL } from '@/lib/shop/fmcg';
import c from './catalogue/catalogue.module.css';
import { COMPANY, whatsappLink } from '@/config/site';
import s from '../pages.module.css';
import { PAGE_FAQS } from '@/data/pageFaqs';

export const metadata = {
  title: 'Indian FMCG & Grocery Exporter',
  description:
    'Indian FMCG and grocery export: snacks, biscuits, instant food, sweets, tea, pickles, ghee and personal care, shipped with spices and rice in mixed containers.',
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

const FAQS = PAGE_FAQS['fmcg'];

export default function FmcgPage() {
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
        <Link href="#order" className="btn btn-primary btn-lg">Order online <Icon name="arrow-right" /></Link>
        <Link rel="nofollow" href="/contact/?product=Indian%20FMCG%20mixed%20container" className="btn btn-outline btn-lg">Send your SKU list</Link>
        <a href={whatsappLink('Hello, I want to import Indian FMCG / grocery products.')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg"><Icon name="whatsapp" /> WhatsApp</a>
      </PageHero>

      <section id="order" className="section" style={{ scrollMarginTop: 80 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Order online</span>
              <h2>Order from {FMCG_TOTAL.toLocaleString('en-IN')} FMCG products</h2>
              <p className="lead">Search by brand or product, enter the cartons you need and send your order. Log in once to send it; our team confirms prices, availability and shipping dates.</p>
            </div>
            <Link href="/account/" className="link-arrow">Your orders <Icon name="arrow-right" /></Link>
          </div>
          <form action="/fmcg/catalogue/" className={c.bigSearch} role="search">
            <label htmlFor="fmcg-search" className="visually-hidden">Search FMCG products</label>
            <input id="fmcg-search" name="q" type="search" placeholder="Search a brand or product, e.g. Haldiram bhujia" maxLength={80} />
            <button type="submit" className="btn btn-primary btn-lg">Search</button>
          </form>
          <div className={c.catGrid}>
            {FMCG_CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/fmcg/catalogue/?c=${cat.slug}`} className={c.catTile}><b>{cat.name}</b><span>{cat.count.toLocaleString('en-IN')} products</span></Link>
            ))}
            <Link href="/fmcg/catalogue/" className={`${c.catTile} ${c.catAll}`}><b>See the full list</b><span>{FMCG_TOTAL.toLocaleString('en-IN')} products</span></Link>
          </div>
        </div>
      </section>

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

      <FaqSection faqs={FAQS} eyebrow="FMCG export FAQ" title="Importing Indian groceries" />
    </>
  );
}
