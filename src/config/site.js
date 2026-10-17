/**
 * Single source of truth for company details, contact info and site-wide settings.
 * Change the domain here (or via NEXT_PUBLIC_SITE_URL) once it is purchased.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sunitaexports.com').replace(/\/$/, '');

// Leave empty until the GA4 property exists; analytics only loads when set.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Web3Forms access key. Public by design: the free plan only accepts submissions sent from the
// visitor's browser, so the key ships in the page. It can only send mail to the owner's inbox.
export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'bb355377-a175-45ce-9c0a-e68317f53d47';

export const COMPANY = {
  name: 'Sunita Agri Exports',
  legalName: 'Sunita Agri Exports Pvt. Ltd.',
  shortName: 'Sunita Exports',
  tagline: 'Giving superior quality products to the world',
  foundingYear: 2010,
  status: 'Govt. Recognised Star Export House',
  countriesServed: '40+',
  description:
    'Mumbai-based exporter of Indian spices, rice, pulses, oilseeds, herbs, dehydrated products and Indian FMCG groceries since 2010. Govt. recognised Star Export House shipping consolidated and full containers to 40+ countries.',
  logo: '/images/logo-mark.png',
};

export const yearsInBusiness = () => new Date().getFullYear() - COMPANY.foundingYear;

export const CONTACT = {
  email: 'sunitaexportsindia@gmail.com',
  phones: [
    { label: 'Sales & WhatsApp', display: '+91 81692 82942', tel: '+918169282942' },
    { label: 'Sales', display: '+91 90040 41889', tel: '+919004041889' },
  ],
  // Only number shown on the Get a Quote page (owner instruction).
  quotePhone: { display: '+91 81692 82942', tel: '+918169282942' },
  landline: { display: '+91 22 2869 7453', tel: '+912228697453' },
  whatsapp: '918169282942',
  whatsappMessage: 'Hello Sunita Agri Exports, I would like a quotation for',
  hours: 'Mon – Sat, 10:00 – 19:00 IST',
  address: {
    street: '1014, Ghanshyam Enclave, Laljipada, Link Road, Kandivali (West)',
    city: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400067',
    country: 'India',
    countryCode: 'IN',
  },
  geo: { lat: 19.2042, lng: 72.8347 },
  mapsQuery: 'Ghanshyam Enclave, Laljipada, Link Road, Kandivali West, Mumbai 400067',
  port: 'Nhava Sheva (JNPT), Mumbai',
};

export const fullAddress = () => {
  const a = CONTACT.address;
  return `${a.street}, ${a.city} – ${a.postalCode}, ${a.region}, ${a.country}`;
};

export const whatsappLink = (text = CONTACT.whatsappMessage) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const mapsEmbedUrl = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapsQuery)}&output=embed`;

export const mapsLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapsQuery)}`;

// Shown as badges. Owner decision: display all (see risks.txt).
export const CERTIFICATIONS = [
  { key: 'iso', name: 'ISO 22000', full: 'ISO 22000 Food Safety Management' },
  { key: 'iso-9001', name: 'ISO 9001', full: 'ISO 9001:2015 Quality Management System' },
  { key: 'fssai', name: 'FSSAI', full: 'Food Safety and Standards Authority of India' },
  { key: 'fda', name: 'US FDA Registered', full: 'US Food & Drug Administration – Food Facility Registration' },
  { key: 'apeda', name: 'APEDA', full: 'Agricultural & Processed Food Products Export Development Authority' },
  { key: 'spices-board', name: 'Spices Board India', full: 'Spices Board, Ministry of Commerce, Govt. of India' },
  { key: 'fieo', name: 'FIEO', full: 'Federation of Indian Export Organisations' },
  { key: 'brc', name: 'BRCGS', full: 'BRC Global Standard for Food Safety' },
  { key: 'kosher', name: 'Kosher', full: 'Kosher Certification' },
  { key: 'imc', name: 'IMC', full: "Indian Merchants' Chamber" },
  { key: 'star', name: 'Star Export House', full: 'Govt. of India Recognised Star Export House' },
];

// Real trade-fair participation. Add more as the client confirms them.
export const EXHIBITIONS = [
  {
    name: 'Gulfood',
    city: 'Dubai, UAE',
    venue: 'Dubai World Trade Centre',
    edition: '2026',
    stand: 'Hall N10 · Stand N10-E23',
    image: '/images/scenes/dubai.webp',
    verified: true,
  },
];

// Social profiles. Paste each URL when the client shares it; an icon only appears on the live site once its URL is set
// (in local development all icons show so the layout can be checked).
export const SOCIAL = [
  { name: 'LinkedIn', icon: 'linkedin', url: '' },
  { name: 'Instagram', icon: 'instagram', url: '' },
  { name: 'Facebook', icon: 'facebook', url: '' },
];

// "🇺🇸" -> "US" (emoji flags don't render on Windows, so we show codes instead).
export const flagCode = (flag = '') =>
  [...flag].map((c) => String.fromCharCode(c.codePointAt(0) - 0x1f1e6 + 65)).join('');
