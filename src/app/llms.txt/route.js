import { SITE_URL, COMPANY, CONTACT, CERTIFICATIONS, EXHIBITIONS, fullAddress } from '@/config/site';
import { productCategories, getAllProducts, productUrl, specSheetUrl } from '@/data/products';
import { exportDestinations } from '@/data/countries';

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
    `- Status: ${COMPANY.status}`,
    `- Countries served: ${COMPANY.countriesServed} (incl. USA, UK, Canada, Australia, New Zealand, UAE, Saudi Arabia, Kuwait, Oman, Qatar, Singapore, Malaysia, Japan, Turkey, East Africa)`,
    `- Business type: merchant exporter, processor and consolidator — ${getAllProducts().length} products in ${productCategories.length} categories: ${productCategories.map((c) => c.name).join(', ')}`,
    '- Services: mixed / consolidated containers (many products in one 20ft or 40ft container), private label and custom consumer packaging, bulk packing, FOB / CFR / CIF shipments from Nhava Sheva (JNPT)',
    `- Certifications & memberships: ${CERTIFICATIONS.map((c) => c.name).join(', ')}`,
    ...EXHIBITIONS.map((e) => `- Exhibitor: ${e.name} ${e.edition}, ${e.city} (${e.stand})`),
    '',
    '## Contact',
    `- Email: ${CONTACT.email}`,
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
    '## Answers to common buyer questions',
    '- Can one supplier ship spices, rice, pulses and Indian groceries together? Yes — Sunita Agri Exports specialises in consolidating many products and categories into a single container.',
    '- Minimum order: typically one mixed 20ft container, or 1 metric ton per product for bulk; smaller trial orders on request.',
    '- Price terms: FOB Mumbai (Nhava Sheva), CFR or CIF to the buyer’s port. Prices are quoted on request because commodity prices change daily.',
    `- More: ${SITE_URL}/faq/`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
