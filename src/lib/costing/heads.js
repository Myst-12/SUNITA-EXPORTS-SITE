// Quotation calculator: the cost rows of the client's costing sheet, one list per packing type.
// The client saves his own options for each row (a name and a ₹ amount, e.g. "25 kg PP bag" ₹18) and picks them
// for each quote; nothing is filled in by us. Saved options live in the database (src/lib/costing/store.js).
// `freight` rows are added after profit (FOB → CFR).

const containerRows = (loading) => [
  { key: 'containerTransport', name: 'Container transport cost', unit: 'Per container' },
  { key: 'loading', name: 'Loading cost', unit: `Per ${loading}` },
  { key: 'thappi', name: 'Thappi cost', unit: 'Per container' },
  { key: 'inspection', name: 'Inspection cost', unit: 'Per container' },
  { key: 'fob', name: 'FOB charges', unit: 'THC + BL charges + other line charges + clearance' },
  { key: 'freight', name: 'Freight cost', unit: 'Per container', freight: true },
];

export const TABS = [
  {
    key: 'consumer',
    name: 'Consumer',
    productUnit: 'kg',
    heads: [
      { key: 'transport', name: 'Transport to warehouse', unit: 'Per bag' },
      { key: 'unloading', name: 'Unloading at warehouse', unit: 'Per bag' },
      { key: 'storage', name: 'Storage', unit: 'Per bag' },
      { key: 'chalni', name: 'Chalni or cleaning charges', unit: 'Per kg' },
      { key: 'pouch', name: 'Pouch cost', unit: 'Per pouch' },
      { key: 'carton', name: 'Carton cost', unit: 'Per carton' },
      { key: 'packingLabour', name: 'Packing labour', unit: 'Per pouch' },
      { key: 'label', name: 'Label cost', unit: 'Per label' },
      { key: 'labelLabour', name: 'Label labour for pasting', unit: 'Per label' },
      { key: 'tinLabel', name: 'Tin labelling cost', unit: 'Per tin' },
      { key: 'jarLabel', name: 'Jar labelling cost', unit: 'Per jar' },
      { key: 'screen', name: 'Screen printing cost', unit: 'Per packet' },
      { key: 'taping', name: 'Carton taping cost', unit: 'Per carton' },
      { key: 'strapping', name: 'Patti strapping cost', unit: 'Per carton' },
      ...containerRows('carton'),
    ],
  },
  {
    key: 'bulk',
    name: 'Bulk',
    productUnit: 'kg',
    heads: [
      { key: 'bag', name: 'Bag cost', unit: 'Per bag' },
      { key: 'transport', name: 'Transport to warehouse', unit: 'Per kg' },
      { key: 'crossing', name: 'Crossing', unit: 'Per bag' },
      { key: 'unloading', name: 'Unloading at warehouse', unit: 'Per bag' },
      { key: 'storage', name: 'Storage', unit: 'Per bag' },
      { key: 'packingLabour', name: 'Packing labour', unit: 'Per bag' },
      ...containerRows('bag'),
    ],
  },
  {
    key: 'fmcg',
    name: 'FMCG',
    productUnit: 'carton',
    heads: [
      { key: 'transport', name: 'Transport to warehouse', unit: 'Per carton' },
      { key: 'unloading', name: 'Unloading at warehouse', unit: 'Per carton' },
      { key: 'storage', name: 'Storage', unit: 'Per carton' },
      { key: 'cartonChange', name: 'Carton change cost', unit: 'Per carton' },
      { key: 'packLabel', name: 'Label on pouches cost', unit: 'Per label' },
      { key: 'packLabelLabour', name: 'Label labour for pasting', unit: 'Per label' },
      { key: 'cartonLabel', name: 'Label on carton cost', unit: 'Per label' },
      { key: 'cartonLabelLabour', name: 'Label labour for pasting on carton', unit: 'Per label' },
      { key: 'screen', name: 'Screen printing cost', unit: 'Per packet' },
      { key: 'gajjat', name: 'Gajjat making', unit: 'Per gajjat' },
      { key: 'boxPacking', name: 'Box packing', unit: 'Per box' },
      { key: 'shrink', name: 'Shrink wrap', unit: 'Per box' },
      { key: 'taping', name: 'Carton taping cost', unit: 'Per carton' },
      { key: 'strapping', name: 'Patti strapping cost', unit: 'Per carton' },
      ...containerRows('carton'),
    ],
  },
];

export const TAB = Object.fromEntries(TABS.map((t) => [t.key, t]));

/** FMCG products are always quoted as FMCG; everything else as Consumer or Bulk. */
export const tabsFor = (product) => (product.type === 'fmcg' ? ['fmcg'] : ['consumer', 'bulk']);
