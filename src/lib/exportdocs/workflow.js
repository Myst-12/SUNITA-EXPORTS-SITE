// The export-document workflow: one step per document, in the order the client makes them.
// Each step keeps its own copy of the details (a "snapshot"). Starting a step copies the latest earlier
// document, so later edits never change documents already made.

export const STEPS = [
  { slug: 'enquiry', name: 'Enquiry', short: 'Buyer request' },
  { slug: 'quotation', name: 'Quotation', short: 'Prices to buyer' },
  { slug: 'proforma', name: 'Proforma Invoice', short: 'Order confirmation' },
  { slug: 'custom', name: 'Custom Invoice', short: 'For customs / CHA' },
  { slug: 'custompacking', name: 'Custom Packing List', short: 'For customs / CHA' },
  { slug: 'vgm', name: 'VGM', short: 'Container weight' },
  { slug: 'selfsealing', name: 'Self Sealing', short: 'Stuffing certificate' },
  { slug: 'bl', name: 'BL Draft', short: 'To shipping line' },
  { slug: 'commercial', name: 'Commercial Invoice', short: 'For buyer and bank' },
  { slug: 'packing', name: 'Commercial Packing List', short: 'For buyer and bank' },
  { slug: 'boe', name: 'Bill of Exchange', short: 'Bank draft' },
  { slug: 'bank', name: 'Bank Covering Letter', short: 'Documents to bank' },
  { slug: 'disposal', name: 'Bank Disposal (Advance)', short: 'Advance received', extra: true },
  { slug: 'cargox', name: 'CargoX Invoice', short: 'Egypt ACID · Excel', extra: true, excel: true },
];
export const stepOf = (slug) => STEPS.find((x) => x.slug === slug);

// Which form sections each document shows. Options tune a section for that document.
export const SECTIONS = {
  enquiry: [['enqMeta'], ['paste', { kind: 'enquiry' }], ['parties', { consignee: 'Buyer' }], ['route', { only: ['destCountry', 'pod'] }], ['terms'], ['products', { mode: 'enquiry' }], ['notes']],
  quotation: [['quoteMeta'], ['paste', { kind: 'quotation' }], ['parties', { consignee: 'Buyer' }], ['route', { only: ['destCountry', 'pol', 'pod'] }], ['terms'], ['products', { mode: 'quote' }], ['quoteTerms']],
  proforma: [['piMeta'], ['parties', { buyer: true }], ['route'], ['terms'], ['products', { mode: 'full', consolidate: true }], ['advance'], ['piTerms']],
  custom: [['invMeta'], ['parties', { buyer: true, notify1: true, toOrder: true }], ['route', { vessel: true }], ['terms'], ['products', { mode: 'full', consolidate: true }], ['containers'], ['money']],
  custompacking: [['invMeta'], ['parties', { buyer: true, notify1: true, toOrder: true }], ['route', { vessel: true }], ['terms'], ['products', { mode: 'packing', consolidate: true }], ['containers']],
  vgm: [['invMeta', { short: true }], ['containers', { vgm: true }], ['vgm']],
  selfsealing: [['invMeta', { short: true }], ['containers'], ['seal']],
  bl: [['invMeta', { short: true }], ['parties', { notify1: true, notify2: true, toOrder: true }], ['route', { vessel: true }], ['shippingBill'], ['blExtra'], ['products', { mode: 'packing' }], ['containers']],
  commercial: [['invMeta'], ['parties', { buyer: true, notify1: true }], ['route', { vessel: true }], ['shippingBill', { bl: true }], ['terms'], ['products', { mode: 'full', consolidate: true }], ['containers']],
  packing: [['invMeta'], ['parties', { buyer: true, notify1: true }], ['route', { vessel: true }], ['shippingBill', { bl: true }], ['terms'], ['products', { mode: 'packing', consolidate: true }], ['containers']],
  boe: [['invMeta', { short: true }], ['parties', { consignee: 'Drawee (buyer)' }], ['route', { only: ['vessel'] }], ['shippingBill', { bl: true, sb: false }], ['boe'], ['products', { mode: 'full' }]],
  bank: [['invMeta', { short: true }], ['parties', { consignee: 'Consignee' }], ['shippingBill', { bl: true, sb: false }], ['terms', { only: ['payment', 'currency'] }], ['bankLetter'], ['products', { mode: 'full' }]],
  disposal: [['piMeta', { short: true }], ['parties', { consignee: 'Remitter (buyer)' }], ['disposal']],
  cargox: [['invMeta', { short: true }], ['parties', { consignee: 'Importer' }], ['route', { only: ['destCountry', 'pol', 'pod'] }], ['terms'], ['cargox'], ['products', { mode: 'full' }]],
};

// Fields a document needs before it is complete; shown as "Needs …" on the step.
const has = (v) => Boolean(String(v ?? '').trim());
const lines = (s) => (s.lines || []).length > 0;
const container = (s) => (s.containers || []).some((c) => has(c.no));
export const NEEDS = {
  enquiry: [['buyer', (s) => has(s.consignee)], ['products', lines]],
  quotation: [['quotation no.', (s) => has(s.quoteNo)], ['buyer', (s) => has(s.consignee)], ['products', lines]],
  proforma: [['proforma no.', (s) => has(s.piNo)], ['consignee', (s) => has(s.consignee)], ['products', lines]],
  custom: [['invoice no.', (s) => has(s.invNo)], ['products', lines], ['container no.', container]],
  custompacking: [['invoice no.', (s) => has(s.invNo)], ['products', lines], ['container no.', container]],
  vgm: [['container no.', container], ['tare weight', (s) => (s.containers || []).some((c) => has(c.tare))]],
  selfsealing: [['container no.', container], ['stuffing place', (s) => has(s.seal?.at)]],
  bl: [['consignee', (s) => has(s.consignee)], ['vessel', (s) => has(s.vessel)], ['container no.', container], ['SB no.', (s) => has(s.sbNo)]],
  commercial: [['invoice no.', (s) => has(s.invNo)], ['products', lines], ['SB no.', (s) => has(s.sbNo)], ['B/L no.', (s) => has(s.blNo)]],
  packing: [['invoice no.', (s) => has(s.invNo)], ['products', lines], ['B/L no.', (s) => has(s.blNo)]],
  boe: [['invoice no.', (s) => has(s.invNo)], ['B/L no.', (s) => has(s.blNo)], ['vessel', (s) => has(s.vessel)]],
  bank: [['invoice no.', (s) => has(s.invNo)], ['B/L no.', (s) => has(s.blNo)], ['consignee bank', (s) => has(s.consigneeBank)]],
  disposal: [['amount received', (s) => has(s.disposal?.amount)], ['date received', (s) => has(s.disposal?.received)]],
  cargox: [['invoice no.', (s) => has(s.invNo)], ['ACID no.', (s) => has(s.cargox?.acid)], ['products', lines]],
};
export const missing = (slug, snap) => (NEEDS[slug] || []).filter(([, ok]) => !ok(snap)).map(([n]) => n);

/** Old shipments (one flat set of details) become a shipment whose proforma holds those details. */
export function normalizeShipment(data) {
  if (data.docs) return { title: data.title || '', docs: data.docs, made: data.made || {} };
  const { title = '', ...rest } = data;
  return { title, docs: rest.lines ? { proforma: rest } : {}, made: {} };
}

/** The latest document made before `slug` in the workflow (the one a new step copies from). */
export function previousMade(docs, slug) {
  const i = STEPS.findIndex((x) => x.slug === slug);
  for (let k = i - 1; k >= 0; k--) if (docs[STEPS[k].slug]) return STEPS[k].slug;
  return STEPS.slice(i + 1).find((x) => docs[x.slug])?.slug || null;
}

// Masters: saved lists picked from in the forms.
export const MASTER_TYPES = {
  party: { name: 'Parties', one: 'party', hint: 'Buyers, consignees and notify parties', fields: [['name', 'Company name'], ['address', 'Address', 'area'], ['country', 'Country'], ['taxId', 'Tax / TIN / TRN no.'], ['phone', 'Phone'], ['email', 'Email'], ['bank', 'Bank details (for bank letters)', 'area']] },
  product: { name: 'Products', one: 'product', hint: 'Description, HS code, packing, weights and default rate', fields: [['desc', 'Description'], ['hs', 'HS code'], ['group', 'Group (for consolidation)'], ['packing', 'Packing text, e.g. 25 KG X 1 PP BAG'], ['kind', 'Package type'], ['netPer', 'Net kg per package'], ['grossPer', 'Gross kg per package'], ['cbmPer', 'CBM per package'], ['rate', 'Default rate'], ['basis', 'Rate per (MT / KG / PKG)'], ['gst', 'GST %'], ['origin', 'Origin state']] },
  port: { name: 'Ports', one: 'port', hint: 'Loading and discharge ports', fields: [['name', 'Port name'], ['code', 'Code, e.g. INNSA'], ['country', 'Country']] },
  place: { name: 'Stuffing places & weighbridges', one: 'place', hint: 'For self sealing and VGM', fields: [['name', 'Name'], ['address', 'Address', 'area'], ['kind', 'Type (Stuffing place / Weighbridge)']] },
  line: { name: 'Shipping lines', one: 'shipping line', hint: 'Printed on the BL draft', fields: [['name', 'Name'], ['address', 'Address', 'area']] },
};
export const partyText = (p) => [p.name, p.address, p.country, p.taxId && `TAX ID: ${p.taxId}`, p.phone && `TEL: ${p.phone}`, p.email && `Email: ${p.email}`].filter(Boolean).join('\n');
export const placeText = (p) => [p.name, p.address].filter(Boolean).join('\n');
