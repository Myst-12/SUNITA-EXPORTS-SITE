import SeoLanding from '@/components/SeoLanding';
import { COMPANY } from '@/config/site';

export const metadata = {
  title: 'Indian Grocery Exporter & Wholesale Supplier — Mumbai, India',
  description: `Indian grocery exporter since ${COMPANY.foundingYear}: rice, atta, dals, spices, snacks, sweets, tea, ghee and branded Indian FMCG in mixed containers from Mumbai to the UAE, Saudi Arabia, the Gulf and 40+ countries.`,
  alternates: { canonical: '/indian-grocery-exporter/' },
};

const SECTIONS = [
  {
    title: 'A complete Indian grocery range from one exporter',
    paras: [
      `Sunita Agri Exports is a Mumbai-based Indian grocery exporter and Govt. recognised Star Export House, supplying importers, wholesalers, supermarkets and restaurant suppliers since ${COMPANY.foundingYear}. Instead of buying rice from one supplier, spices from another and packaged foods from a third, our buyers send one list and receive one container.`,
      'The range covers everything on an Indian grocery shelf: basmati and regional rice, atta and flours, every everyday dal, whole and ground spices, ready masalas, snacks and namkeen, biscuits, sweets, tea and coffee, pickles, papad, ghee, plus personal and home care. Products are sourced from established Indian manufacturers — branded where export availability allows, or packed under your own label.',
    ],
  },
  {
    title: 'Mixed containers built around your shelf',
    paras: [
      'Most grocery importers buy from us as a mixed 20 ft or 40 ft container. We combine cartons of 50+ FMCG SKUs with bulk or retail packs of rice, pulses and spices, check manufacturing dates before stuffing so products arrive with the longest shelf life, and send one packing list and one set of export documents.',
      'Prices are quoted FOB Nhava Sheva (Mumbai), or CFR / CIF to your port. Send your product list on the quote form or WhatsApp and we reply within 24 hours.',
    ],
  },
  {
    title: 'Indian grocery supplier for the Middle East',
    paras: [
      'The Gulf is our biggest market. Mumbai to Jebel Ali, Dammam, Hamad, Shuwaikh, Sohar and Khalifa Bin Salman are short sea routes, so Gulf buyers can order smaller, more frequent mixed loads. We supply Arabic/English labelling or Arabic stickers for GCC rules, halal certificates where required, and the full document set your clearing agent needs.',
    ],
  },
];

const RANGE = [
  { title: 'Rice', text: '1121, 1509 and traditional basmati, sella rice, sona masoori, ponni and more.', href: '/products/rice/' },
  { title: 'Pulses & dals', text: 'Chana, toor, moong, urad, masoor, rajma, kabuli chana and every split dal.', href: '/products/pulses-legumes/' },
  { title: 'Spices & masalas', text: 'Whole spices, powders and blended masalas in bulk or retail packs.', href: '/products/indian-spices/' },
  { title: 'Flours', text: 'Chakki atta, maida, besan, sooji, rice and millet flours.', href: '/products/flours-milling/' },
  { title: 'Packaged Indian FMCG', text: 'Snacks, biscuits, sweets, instant food, pickles, papad, tea, ghee.', href: '/fmcg/' },
  { title: 'Private label', text: 'Your brand on rice, atta, dals and spices, packed in Mumbai.', href: '/private-label/' },
];

const FAQS = [
  { question: 'What Indian grocery products do you export?', answer: 'Rice, flours, pulses and dals, spices and masalas, snacks and namkeen, biscuits, sweets, instant foods, pickles, papad, tea and coffee, ghee, jaggery, makhana, and personal and home care products.' },
  { question: 'Can I mix many products in one container?', answer: 'Yes. Mixed containers are our speciality — packaged FMCG cartons, bulk spices, rice and pulses all in one 20 ft or 40 ft load, with one invoice and one set of documents.' },
  { question: 'Do you export Indian grocery brands?', answer: 'Yes, we source genuine branded products from established Indian manufacturers, subject to brand and export availability. We can also pack staples under your own label.' },
  { question: 'Which countries do you supply?', answer: `${COMPANY.countriesServed} countries, mainly the UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain, plus the USA, UK, Canada, Australia, Europe and Asia.` },
  { question: 'How do I get a price?', answer: 'Send your product list, quantities and destination port through the quote form or WhatsApp. We reply with FOB and CFR / CIF prices within 24 hours.' },
];

export default function Page() {
  return (
    <SeoLanding
      crumb="Indian Grocery Exporter" href="/indian-grocery-exporter/"
      eyebrow="Indian grocery export · Mumbai"
      title="Indian grocery exporter for importers and supermarkets"
      lead="Rice, dals, spices, flours and branded Indian FMCG — consolidated in one container from Mumbai to the Gulf and 40+ countries."
      image="/images/scenes/grocery-store.webp" imageAlt="Indian grocery store shelves"
      quote="Indian grocery mixed container"
      sections={SECTIONS} range={RANGE} rangeTitle="Everything for an Indian grocery aisle"
      featured={['1121-basmati-rice', 'chakki-atta', 'chana-dal', 'turmeric-powder', 'snacks-namkeen', 'biscuits-bakery', 'pickles-chutneys', 'tea-instant-beverages']}
      faqs={FAQS} faqTitle="Importing Indian groceries"
    />
  );
}
