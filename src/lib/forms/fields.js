// The questions an event form can ask. The admin ticks which ones to show; custom questions are
// added as extra text fields. Keys are stable because they become the Excel columns.
// [English name (stored in Excel), ISO code (for translated names and flags), dialling code]
export const COUNTRY_META = [
  ['United Arab Emirates', 'AE', '971'], ['Saudi Arabia', 'SA', '966'], ['Qatar', 'QA', '974'], ['Kuwait', 'KW', '965'],
  ['Oman', 'OM', '968'], ['Bahrain', 'BH', '973'], ['India', 'IN', '91'], ['United States', 'US', '1'], ['Canada', 'CA', '1'],
  ['United Kingdom', 'GB', '44'], ['Australia', 'AU', '61'], ['New Zealand', 'NZ', '64'], ['Singapore', 'SG', '65'],
  ['Malaysia', 'MY', '60'], ['Indonesia', 'ID', '62'], ['Japan', 'JP', '81'], ['China', 'CN', '86'], ['Turkey', 'TR', '90'],
  ['Iran', 'IR', '98'], ['Iraq', 'IQ', '964'], ['Jordan', 'JO', '962'], ['Lebanon', 'LB', '961'], ['Egypt', 'EG', '20'],
  ['Morocco', 'MA', '212'], ['Germany', 'DE', '49'], ['Netherlands', 'NL', '31'], ['France', 'FR', '33'], ['Italy', 'IT', '39'],
  ['Spain', 'ES', '34'], ['Portugal', 'PT', '351'], ['Russia', 'RU', '7'], ['Kenya', 'KE', '254'], ['Uganda', 'UG', '256'],
  ['Tanzania', 'TZ', '255'], ['South Africa', 'ZA', '27'], ['Nigeria', 'NG', '234'], ['Ghana', 'GH', '233'],
  ['Mauritius', 'MU', '230'], ['Bangladesh', 'BD', '880'], ['Sri Lanka', 'LK', '94'], ['Nepal', 'NP', '977'],
  ['Brazil', 'BR', '55'], ['Mexico', 'MX', '52'], ['Other', '', ''],
];
export const COUNTRIES = COUNTRY_META.map(([name]) => name);

export const FIELD_LIBRARY = [
  { key: 'name', label: 'Your name', type: 'text', autoComplete: 'name', default: true, required: true },
  { key: 'company', label: 'Company', type: 'text', autoComplete: 'organization', default: true, required: true },
  { key: 'email', label: 'Email', type: 'email', autoComplete: 'email', default: true, required: true },
  { key: 'phone', label: 'Phone / WhatsApp', type: 'tel', autoComplete: 'tel', default: true },
  { key: 'country', label: 'Country', type: 'select', options: COUNTRIES, default: true, required: true },
  { key: 'city', label: 'City', type: 'text', autoComplete: 'address-level2' },
  { key: 'businessType', label: 'Business type', type: 'select', default: true, options: ['Importer / Distributor', 'Supermarket / Retail chain', 'Wholesaler', 'Food manufacturer', 'Restaurant / HoReCa', 'Trader / Agent', 'Other'] },
  { key: 'products', label: 'Products you are interested in', type: 'products', default: true },
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
