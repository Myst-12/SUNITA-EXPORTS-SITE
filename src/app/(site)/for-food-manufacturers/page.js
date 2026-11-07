import SeoLanding from '@/components/SeoLanding';
import { COMPANY } from '@/config/site';
import { PAGE_FAQS } from '@/data/pageFaqs';

export const metadata = {
  title: 'Bulk Indian Spices for Food Manufacturers',
  description: `Bulk Indian spices, dehydrated onion and garlic, seeds and pulses to your specification for food manufacturers and spice processors. Exporting since ${COMPANY.foundingYear}.`,
  alternates: { canonical: '/for-food-manufacturers/' },
};

const SECTIONS = [
  {
    title: 'Raw materials to your specification',
    paras: [
      'Seasoning makers, spice grinders, snack and ready-meal producers buy bulk ingredients from us: whole and ground spices, dehydrated onion and garlic, sesame, psyllium, seeds and pulses.',
      'Send your specification for purity, moisture, colour (ASTA), volatile oil, mesh size and micro or pesticide limits. We confirm the grade that meets it before we quote, and every lot ships with a certificate of analysis.',
    ],
  },
  {
    title: 'Clean, tested and safe for processing',
    paras: [
      'Material is machine-cleaned and Sortex-graded, and steam-sterilised options are available where your market has strict microbiological limits. Third-party lab reports can be arranged before shipment.',
      'Each product page has a downloadable specification sheet, so your quality team can check it before asking for samples.',
    ],
  },
  {
    title: 'Steady supply across the season',
    paras: [
      'For regular buyers we plan shipments across the crop year, in 25 kg or 50 kg lined bags or jumbo bags, in full containers or combined with other ingredients.',
    ],
  },
];

const RANGE = [
  { title: 'Whole spices', text: 'Cumin, coriander, fennel, fenugreek, pepper, chillies and turmeric fingers.', href: '/products/indian-spices/' },
  { title: 'Spice powders', text: 'Turmeric, chilli, coriander and cumin powders, ground to your mesh size.', href: '/products/indian-spices/' },
  { title: 'Dehydrated onion & garlic', text: 'Flakes, kibbled, minced, granules and powder.', href: '/products/dehydrated-onion-garlic/' },
  { title: 'Oilseeds', text: 'Hulled and natural sesame, black sesame and other seeds.', href: '/products/' },
  { title: 'Psyllium', text: 'Psyllium seeds, husk and husk powder.', href: '/products/' },
  { title: 'Herbs & botanicals', text: 'Ayurvedic herbs and powders for supplement makers.', href: '/products/herbs-botanicals/' },
];

export default function Page() {
  return (
    <SeoLanding
      crumb="For food manufacturers" href="/for-food-manufacturers/"
      eyebrow="For food manufacturers & processors"
      title="Bulk Indian ingredients, to your specification"
      lead="Spices, dehydrated onion and garlic, sesame and psyllium, graded and tested to your specification, with a certificate of analysis for every lot."
      image="/images/scenes/lab.webp" imageAlt="Quality testing in a food laboratory"
      quote="Bulk ingredients to specification"
      sections={SECTIONS} range={RANGE} rangeTitle="What manufacturers buy from us"
      featured={['cumin-seeds', 'coriander-seeds', 'turmeric-powder', 'red-chilli-powder', 'dehydrated-onion-powder', 'dehydrated-garlic-granules', 'hulled-white-sesame', 'psyllium-husk']}
      faqs={PAGE_FAQS['for-food-manufacturers']} faqTitle="Buying ingredients in bulk"
    />
  );
}
