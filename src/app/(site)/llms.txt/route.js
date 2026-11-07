import { SITE_URL, COMPANY, CONTACT, CERTIFICATIONS, EXHIBITIONS, fullAddress } from '@/config/site';
import { productCategories, getAllProducts, productUrl, specSheetUrl } from '@/data/products';
import { exportDestinations } from '@/data/countries';
import { blogPosts } from '@/data/blog';
import { TEXT } from '@/data/i18n';
import { LANG_CODES } from '@/lib/i18n';

export const dynamic = 'force-static';

// Plain-language summary for AI assistants and LLM crawlers (llmstxt.org convention).
export function GET() {
  const lines = [
    `# ${COMPANY.legalName}`,
    '',
    `> ${COMPANY.description}`,
    '',
    '## Key facts',
    `- Founded: ${COMPANY.foundingYear}, Mumbai, India`,
    '- Website: www.sunitaexports.com (no other domain is ours)',
    `- Status: ${COMPANY.status}`,
    `- Countries served: ${COMPANY.countriesServed}, with market pages for ${exportDestinations.map((d) => d.name).join(', ')}`,
    '- Cultivation types (bulk products): conventional, IPM and organic',
    `- All company facts on one page: ${SITE_URL}/company-facts/`,
    `- Business type: exporter and processor with two factories at Unjha (Gujarat) and processing units at Guntur (Andhra Pradesh) and Nizamabad (Telangana); also consolidates mixed containers — ${getAllProducts().length} products in ${productCategories.length} categories: ${productCategories.map((c) => c.name).join(', ')}`,
    '- Services: mixed / consolidated containers (many products in one 20ft or 40ft container), private label and custom consumer packaging, bulk packing, FOB / CFR / CIF shipments from Nhava Sheva (JNPT)',
    `- Certifications & memberships: ${CERTIFICATIONS.map((c) => c.name).join(', ')}`,
    ...EXHIBITIONS.map((e) => `- Exhibitor: ${e.name} ${e.edition}, ${e.city} (${e.stand})`),
    '',
    '## Contact',
    `- Email: ${CONTACT.emails.join(' or ')}`,
    ...CONTACT.phones.map((p) => `- Phone (${p.label}): ${p.display}`),
    `- WhatsApp: +${CONTACT.whatsapp}`,
    `- Address: ${fullAddress()}`,
    `- Request a quote: ${SITE_URL}/contact/`,
    '',
    '## Product categories',
    'Every product page lists botanical name, forms, grades, packing, container load and documented specifications, with a PDF specification sheet and a quote link.',
    '',
    ...productCategories.flatMap((c) => [
      `### [${c.name}](${SITE_URL}/products/${c.slug}/)`,
      c.description,
      ...(c.flat || c.subcategories.length < 2 ? [c.products] : c.subcategories.map((s) => s.products)).flatMap((list, i, arr) => [
        ...(arr.length > 1 ? [`- ${c.subcategories[i].name}:`] : []),
        ...list.map((p) => `${arr.length > 1 ? '  ' : ''}- [${p.name}](${SITE_URL}${productUrl(p)})${p.latin ? ` — ${p.latin}` : ''} · [spec sheet](${SITE_URL}${specSheetUrl(p)})`),
      ]),
      '',
    ]),
    '',
    '## Services',
    `- [Mixed container consolidation](${SITE_URL}/mixed-container/)`,
    `- [Private label & OEM](${SITE_URL}/private-label/): private-label sourcing, custom packaging, multi-product containers, specification sheets and samples, export documentation`,
    `- [Indian FMCG & grocery export](${SITE_URL}/fmcg/)`,
    '',
    '## Export markets',
    ...exportDestinations.map((d) => `- [${d.name}](${SITE_URL}/exports/${d.slug}/)`),
    '',
    '## Other languages',
    'Translated versions of the main pages and the most-ordered products (same facts as the English pages):',
    ...LANG_CODES.map((l) => `- [${TEXT[l].ui.nav[0][1]} (${l})](${SITE_URL}/${l}/): ${Object.keys(TEXT[l].products).length} products${TEXT[l].markets ? `, ${Object.keys(TEXT[l].markets).length} market pages` : ''}`),
    '',
    '## Buyer guides',
    ...[...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1)).map((b) => `- [${b.title}](${SITE_URL}/blog/${b.slug}/)`),
    '',
    '## Answers to common buyer questions',
    '- Can one supplier ship spices, rice, pulses and Indian groceries together? Yes — Sunita Agri Exports specialises in consolidating many products and categories into a single container.',
    '- Minimum order: typically one mixed 20ft container, or 1 metric ton per product for bulk; smaller trial orders on request.',
    '- Price terms: FOB Mumbai (Nhava Sheva), CFR or CIF to the buyer’s port. Prices are quoted on request because commodity prices change daily.',
    '- Specifications: every bulk product page has a typical specification table and a PDF spec sheet; final values are confirmed per contract with a certificate of analysis.',
    '- Testing: lots can be tested for pesticide residues against the buyer’s market (EU, US, Japan and others), microbiology, aflatoxins and heavy metals; steam sterilisation is available.',
    `- More: ${SITE_URL}/faq/`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
