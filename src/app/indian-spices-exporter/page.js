import SeoLanding from '@/components/SeoLanding';
import { COMPANY } from '@/config/site';

export const metadata = {
  title: 'Indian Spices Exporter — Whole Spices, Powders & Masalas from Mumbai',
  description: `Indian spices exporter since ${COMPANY.foundingYear}: turmeric, chilli, cumin, coriander, cardamom, black pepper and blended masalas in bulk or private label, shipped from Mumbai to the UAE, Saudi Arabia and 40+ countries.`,
  alternates: { canonical: '/indian-spices-exporter/' },
};

const SECTIONS = [
  {
    title: 'Spices sourced from India’s growing belts',
    paras: [
      `Sunita Agri Exports has exported Indian spices from Mumbai since ${COMPANY.foundingYear}. We buy from the regions each spice is known for — turmeric from Erode, Sangli and Nizamabad, chilli from Guntur and Byadgi, cumin from Unjha, cardamom from Kerala and pepper from the Malabar coast — then clean, grade and pack to your specification.`,
      'Whole spices, powders, blended masalas and cut or flaked spices are available in bulk bags for food manufacturers and repackers, or in retail packs under your own brand.',
    ],
  },
  {
    title: 'Quality you can check',
    paras: [
      'Every product has a spec sheet you can download from its page, and lab reports for moisture, colour (ASTA), curcumin, volatile oil, pesticides and microbiology can be shared before shipment. Steam-sterilised options are available for markets with strict micro limits.',
    ],
  },
  {
    title: 'Indian spices for the Gulf',
    paras: [
      'Gulf kitchens need whole green cardamom, black pepper, cumin, coriander, turmeric and Kashmiri chilli in large volumes. We ship spices to the UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain on short sea routes from Mumbai, with Arabic/English labels and the certificates GCC customs asks for — on their own or mixed with rice, pulses and groceries in one container.',
    ],
  },
];

const RANGE = [
  { title: 'Whole spices', text: 'Cumin, coriander, fennel, fenugreek, mustard, cardamom, pepper, cloves, chillies.', href: '/products/indian-spices/' },
  { title: 'Spice powders', text: 'Turmeric, red chilli, Kashmiri chilli, coriander, cumin and ginger powders.', href: '/products/indian-spices/' },
  { title: 'Blended masalas', text: 'Garam masala, chaat, sambar, biryani, chole and custom blends.', href: '/products/indian-spices/' },
  { title: 'Dehydrated onion & garlic', text: 'Flakes, kibbled, minced, granules and powder.', href: '/products/dehydrated-onion-garlic/' },
  { title: 'Herbs & botanicals', text: 'Ashwagandha, moringa, senna, triphala and 100+ Ayurvedic herbs.', href: '/products/herbs-botanicals/' },
  { title: 'Private label spices', text: 'Your brand, printed pouches and jars, packed in Mumbai.', href: '/private-label/' },
];

const FAQS = [
  { question: 'Which Indian spices do you export?', answer: 'Turmeric, red chilli, Kashmiri chilli, cumin, coriander, fennel, fenugreek, mustard, green and black cardamom, black pepper, cloves, cinnamon, bay leaf, ginger, ajwain and blended masalas, among 50+ spice products.' },
  { question: 'Can you supply spices under my brand?', answer: 'Yes. We pack spices in retail pouches, jars and bulk bags under your private label, with your design and your country’s labelling rules.' },
  { question: 'Do you share lab reports?', answer: 'Yes. Spec sheets are on every product page, and pre-shipment lab reports can be shared for moisture, colour, active content, pesticides and microbiology.' },
  { question: 'Do you export spices to the Middle East?', answer: 'Yes, the Gulf is our largest market — UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain — with Arabic/English labelling.' },
];

export default function Page() {
  return (
    <SeoLanding
      crumb="Indian Spices Exporter" href="/indian-spices-exporter/"
      eyebrow="Indian spice export · Mumbai"
      title="Indian spices exporter — whole, ground and blended"
      lead="Turmeric, chilli, cumin, cardamom, pepper and masalas sourced from India's growing belts, graded to your spec and shipped from Mumbai."
      image="/images/scenes/sacks-spices.webp" imageAlt="Sacks of Indian spices"
      quote="Indian spices"
      sections={SECTIONS} range={RANGE} rangeTitle="Our spice range"
      featured={['turmeric-powder', 'red-chilli-powder', 'cumin-seeds', 'coriander-seeds', 'green-cardamom', 'black-pepper', 'garam-masala', 'dried-red-chillies']}
      faqs={FAQS} faqTitle="Buying Indian spices"
    />
  );
}
