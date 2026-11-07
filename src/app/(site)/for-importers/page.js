import SeoLanding from '@/components/SeoLanding';
import { COMPANY, CONTACT } from '@/config/site';
import { PAGE_FAQS } from '@/data/pageFaqs';

export const metadata = {
  title: 'Indian Food Supplier for Importers',
  description: `Supplier of Indian spices, rice, pulses and groceries for importers and distributors since ${COMPANY.foundingYear}. Mixed containers, private label, FOB/CIF quotes in 24 hours.`,
  alternates: { canonical: '/for-importers/' },
};

const SECTIONS = [
  {
    title: 'One supplier for your whole Indian range',
    paras: [
      'Importers and distributors buy from us to cover a full Indian range from one supplier: whole and ground spices, basmati and non-basmati rice, pulses and dals, flours, snacks and packaged groceries.',
      'Bulk lines and retail cartons can travel together in one 20 ft or 40 ft mixed container, on one invoice and one set of documents. That lets you carry more lines without tying up cash in full loads of each.',
    ],
  },
  {
    title: 'How an order works',
    paras: [
      'You send your product list, quantities and port. We reply within 24 hours with a written FOB, CFR or CIF offer and confirm grades and packing. Samples are sent by courier if you want to check them first.',
      `Once the contract and advance are agreed, we pack, load and ship from ${CONTACT.port.split(' (')[0]}, and send the full shipping documents for customs clearance at your end.`,
    ],
  },
  {
    title: 'Your brand or ours',
    paras: [
      'Retail packs can carry your own label, with the language, nutrition panel and barcode your market requires. We can also supply branded Indian grocery products for distributors who serve ethnic stores and supermarkets.',
    ],
  },
];

const RANGE = [
  { title: 'Spices & masalas', text: 'Whole, ground and blended spices in bulk or retail packs.', href: '/products/indian-spices/' },
  { title: 'Rice', text: '1121, 1509 and traditional basmati, plus non-basmati rice.', href: '/products/' },
  { title: 'Pulses & dals', text: 'Toor, moong, chana, urad, masoor and chickpeas.', href: '/products/' },
  { title: 'FMCG groceries', text: 'Snacks, sweets, pickles, instant foods and household brands.', href: '/fmcg/' },
  { title: 'Mixed containers', text: 'Many products in one container, planned by weight and volume.', href: '/mixed-container/' },
  { title: 'Private label', text: 'Your brand on our products, packed in Mumbai.', href: '/private-label/' },
];

export default function Page() {
  return (
    <SeoLanding
      crumb="For importers" href="/for-importers/"
      eyebrow="For importers & distributors"
      title="Your Indian food range from one supplier"
      lead="Spices, rice, pulses and groceries in full or mixed containers, with FOB, CFR or CIF quotes within 24 hours."
      image="/images/scenes/warehouse-pallets.webp" imageAlt="Pallets of packed goods in a warehouse"
      quote="Indian food range for import"
      sections={SECTIONS} range={RANGE} rangeTitle="What importers buy from us"
      featured={['cumin-seeds', 'turmeric-powder', '1121-basmati-rice', 'split-toor-dal', 'kabuli-chickpeas', 'red-chilli-powder', 'green-cardamom', 'garam-masala']}
      faqs={PAGE_FAQS['for-importers']} faqTitle="Buying as an importer"
    />
  );
}
