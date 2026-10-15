import { SITE_URL, COMPANY, CONTACT, CERTIFICATIONS, EXHIBITIONS, fullAddress } from '@/config/site';
import { categories } from '@/data/products';
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
    '- Business type: merchant exporter, processor and consolidator — spices, rice, pulses, oilseeds, herbs, dehydrated products and Indian FMCG groceries',
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
    ...categories.map((c) => `- [${c.name}](${SITE_URL}/products/${c.slug}/): ${c.products.map((p) => p.name).join('; ')}`),
    '',
    '## Services',
    `- [Mixed container consolidation](${SITE_URL}/mixed-container/)`,
    `- [Private label & packaging](${SITE_URL}/private-label/)`,
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
