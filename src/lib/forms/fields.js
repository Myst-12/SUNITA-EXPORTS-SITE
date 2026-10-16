// The questions an event form can ask. The admin ticks which ones to show; custom questions are
// added as extra text fields. Keys are stable because they become the Excel columns.
export const COUNTRIES = [
  'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'India', 'United States', 'Canada',
  'United Kingdom', 'Australia', 'New Zealand', 'Singapore', 'Malaysia', 'Japan', 'Turkey', 'Germany', 'Netherlands',
  'France', 'Italy', 'Spain', 'Kenya', 'Uganda', 'Tanzania', 'South Africa', 'Nigeria', 'Egypt', 'Other',
];

export const FIELD_LIBRARY = [
  { key: 'name', label: 'Your name', type: 'text', autoComplete: 'name', default: true, required: true },
  { key: 'company', label: 'Company', type: 'text', autoComplete: 'organization', default: true, required: true },
  { key: 'email', label: 'Email', type: 'email', autoComplete: 'email', default: true, required: true },
  { key: 'phone', label: 'Phone / WhatsApp', type: 'tel', autoComplete: 'tel', default: true },
  { key: 'country', label: 'Country', type: 'select', options: COUNTRIES, default: true, required: true },
  { key: 'city', label: 'City', type: 'text', autoComplete: 'address-level2' },
  { key: 'businessType', label: 'Business type', type: 'select', default: true, options: ['Importer / Distributor', 'Supermarket / Retail chain', 'Wholesaler', 'Food manufacturer', 'Restaurant / HoReCa', 'Trader / Agent', 'Other'] },
  { key: 'products', label: 'Products you are interested in', type: 'textarea', default: true },
  { key: 'quantity', label: 'Expected quantity', type: 'text' },
  { key: 'website', label: 'Company website', type: 'url', autoComplete: 'url' },
  { key: 'notes', label: 'Notes', type: 'textarea', default: true },
];

/** Builds the stored field list from the admin's choices. */
export function buildFields(selectedKeys, requiredKeys, customLines) {
  const picked = FIELD_LIBRARY.filter((f) => selectedKeys.includes(f.key)).map((f) => ({ ...f, required: requiredKeys.includes(f.key) }));
  const custom = customLines
    .map((l) => l.trim()).filter(Boolean).slice(0, 10)
    .map((label, i) => ({ key: `q${i + 1}`, label, type: 'text', required: false }));
  return [...picked, ...custom].map(({ default: _d, ...f }) => f);
}
