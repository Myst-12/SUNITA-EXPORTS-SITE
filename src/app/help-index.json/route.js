import { COMPANY, CONTACT, CERTIFICATIONS, EXHIBITIONS, SITE_URL, fullAddress } from '@/config/site';
import { productCategories, getAllProducts, productUrl } from '@/data/products';
import { categorySummaries } from '@/data/catalog/categorySummaries';
import { getLocalNames } from '@/data/catalog/localNames';
import { faqs } from '@/data/faq';
import { PAGE_FAQS } from '@/data/pageFaqs';
import { exportDestinations } from '@/data/countries';
import { FMCG_TOTAL } from '@/lib/shop/fmcg';

export const dynamic = 'force-static';

// Everything the help search (src/components/HelpSearch.js) can answer from, built from the site's own data.
// Loaded only when a visitor opens the helper. `keywords` are searched but not shown.
export function GET() {
  const products = getAllProducts();
  const phones = CONTACT.phones.map((p) => `${p.display} (${p.label})`).join(', ');
  const docs = [
    {
      type: 'answer', title: 'Contact details', url: '/contact/',
      text: `Phone: ${phones}. Office: ${CONTACT.landline.display}. Email: ${CONTACT.email}. WhatsApp: +${CONTACT.whatsapp}. Hours: ${CONTACT.hours}. Address: ${fullAddress()}.`,
      keywords: 'contact phone number call email mail whatsapp address office location where reach talk hours timing',
    },
    {
      type: 'answer', title: 'Prices and quotes', url: '/contact/',
      text: 'Prices depend on grade, quantity, packing and destination, so we quote each order. Send your product list, quantities and destination port through the quote form or WhatsApp, and we reply with FOB and CFR / CIF prices within 24 hours.',
      keywords: 'price prices cost rate rates quotation quote pricing how much cheap per kg per ton offer',
    },
    {
      type: 'answer', title: `About ${COMPANY.name}`, url: '/about/',
      text: `${COMPANY.legalName} is a ${COMPANY.status} in Mumbai, exporting Indian spices, herbs, rice, pulses, oilseeds and Indian groceries since ${COMPANY.foundingYear} to ${COMPANY.countriesServed} countries. Directors: Alok Dhanuka and Ankit Dhanuka.`,
      keywords: 'about company who are you history founded established since year years old business owner director directors experience star export house',
    },
    {
      type: 'answer', title: 'Certifications', url: '/certifications/',
      text: `We hold: ${CERTIFICATIONS.map((c) => c.full).join('; ')}. Copies of every certificate are on our Certifications page.`,
      keywords: 'certificate certificates certification certified iso 22000 9001 kosher fssai apeda spices board halal licence license registration',
    },
    {
      type: 'answer', title: 'Countries we export to', url: '/exports/',
      text: `We ship to ${COMPANY.countriesServed} countries, including ${exportDestinations.map((d) => d.name).join(', ')}.`,
      keywords: 'countries country export markets ship to deliver worldwide where',
    },
    {
      type: 'answer', title: 'Order FMCG products online', url: '/fmcg/catalogue/',
      text: `Search our FMCG product list of ${FMCG_TOTAL.toLocaleString('en-IN')} products by brand or product, enter the cartons you need and add them to your order. Log in or create an account once to send it; our team then confirms prices, availability and shipping dates by email or WhatsApp.`,
      keywords: 'order online buy purchase shop cart basket checkout place order how to order website carton cartons fmcg grocery brands haldiram',
    },
    {
      type: 'answer', title: 'Your account and orders', url: '/account/',
      text: 'Log in to My account to see every order you have placed online and its status (new, confirmed, shipped). You need an account only to send an order; browsing the product list is open to everyone.',
      keywords: 'account login log in sign in sign up register password my orders order status track tracking',
    },
    {
      type: 'answer', title: 'FMCG product list in Excel', url: '/fmcg/catalogue/',
      text: 'Every FMCG category can be downloaded as an Excel sheet with item codes, packing, shelf life and carton weight. Fill in your quantities and email it to us, or order online.',
      keywords: 'excel xls xlsx sheet download price list product list catalogue catalog list of products',
    },
    {
      type: 'answer', title: 'Spec sheets', url: '/products/',
      text: 'Every product page has a downloadable specification sheet (PDF) with grades, specifications, packing and shelf life. Open the product and use “Download spec sheet”.',
      keywords: 'spec sheet specification specifications pdf datasheet technical data download catalogue catalog brochure',
    },
    ...EXHIBITIONS.map((e) => ({
      type: 'answer', title: `Meet us at ${e.name}`, url: '/about/',
      text: `We exhibit at ${e.name} ${e.edition}, ${e.venue}, ${e.city} — ${e.stand}.`,
      keywords: 'exhibition fair trade show expo stand booth meet visit gulfood',
    })),
    ...[...faqs.map((f) => ({ ...f, url: '/faq/' })), ...Object.entries(PAGE_FAQS).flatMap(([page, list]) => list.map((f) => ({ ...f, url: `/${page}/` })))]
      .map((f) => ({ type: 'faq', title: f.question, text: f.answer, url: f.url })),
    ...productCategories.map((c) => ({
      type: 'category', title: c.name, url: c.href,
      text: (categorySummaries[c.slug] || c.description).replace('{count}', c.productCount),
      keywords: (c.subcategories || []).map((s) => s.name).join(' '),
    })),
    ...products.map((p) => ({
      type: 'product', title: p.name, url: productUrl(p), text: p.description, category: p.categoryName,
      keywords: [p.subcategoryName, p.botanicalName, ...getLocalNames(p.slug).map(([, , name]) => name)].filter(Boolean).join(' '),
    })),
  ].map((d, id) => ({ id, ...d }));

  return Response.json({ site: SITE_URL, docs });
}
