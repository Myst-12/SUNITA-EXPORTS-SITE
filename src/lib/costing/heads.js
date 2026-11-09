// Quotation costing: the cost heads from the client's costing sheet, one list per packing type.
// No amounts live in the code (the repo is public); the client fills them into the costing sheet, which is
// uploaded in admin and kept in the database (src/lib/costing/store.js). The product's buying price changes
// daily, so it is typed into the calculator for each quote instead.
//
// `per` is what an amount is multiplied by for one container:
//   kg · bag (export bag) · rawBag (bag the goods arrive in) · pack (pouch, tin, jar, packet: one per pack)
//   carton · gajjat · box · container
// `optional` heads count only for packings that say "Yes" to them in the packing list.
// `freight` is left out of FOB and added for CFR and CIF.
// `by` + `slabs`: the amount depends on a size, as in the packing contractor's rate chart (e.g. storage up to
// 10 kg / up to 50 kg). Each slab is its own row in the sheet; the first slab whose `upTo` fits is used.
//   by: packG (pack size) · bagKg (export bag) · rawBagKg · cartonKg · container (20 or 40 ft)

const ABOVE = 1e9;
const slabsKg = (...limits) => limits.map((upTo, i) => ({
  upTo,
  name: upTo === ABOVE ? `above ${limits[i - 1]} kg` : i ? `above ${limits[i - 1]} up to ${upTo} kg` : `up to ${upTo} kg`,
}));
const LOAD_KG = slabsKg(25, ABOVE);
const STORE_KG = slabsKg(10, 50);
const THAPPI = { by: 'container', slabs: [{ upTo: 20, name: '20 ft' }, { upTo: 40, name: '40 ft' }] };

const containerHeads = (loading, by) => [
  { key: 'containerTransport', name: 'Container transport cost', unit: 'Per container', per: 'container' },
  { key: 'loading', name: 'Loading cost', unit: `Per ${loading}`, per: loading, by, slabs: LOAD_KG },
  { key: 'thappi', name: 'Thappi cost', unit: 'Per container', per: 'container', ...THAPPI },
  { key: 'inspection', name: 'Inspection cost', unit: 'Per container', per: 'container' },
  { key: 'fob', name: 'FOB charges', unit: 'Per container (THC + BL charges + other line charges + clearance)', per: 'container' },
  { key: 'freight', name: 'Freight cost', unit: 'Per container', per: 'container', freight: true },
];

const POUCH_G = [25, 250, 500, 1000, 2000, 5000, 10000, 50000].map((upTo, i, a) => ({
  upTo, name: i ? `pack above ${a[i - 1]} g up to ${upTo} g` : `pack up to ${upTo} g`,
}));

export const TABS = [
  {
    key: 'bulk',
    name: 'Bulk packing',
    priceUnit: 'kg',
    heads: [
      { key: 'bag', name: 'Bag cost', unit: 'Per bag', per: 'bag' },
      { key: 'transport', name: 'Transport to warehouse', unit: 'Per kg', per: 'kg' },
      { key: 'crossing', name: 'Crossing', unit: 'Per bag', per: 'bag' },
      { key: 'unloading', name: 'Unloading at warehouse', unit: 'Per bag', per: 'bag', by: 'bagKg', slabs: LOAD_KG },
      { key: 'storage', name: 'Storage', unit: 'Per bag', per: 'bag', by: 'bagKg', slabs: STORE_KG },
      { key: 'packingLabour', name: 'Packing labour (repacking)', unit: 'Per bag', per: 'bag', by: 'bagKg', slabs: slabsKg(10, 25, 50) },
      { key: 'stitching', name: 'Double stitching', unit: 'Per bag', per: 'bag', optional: true },
      ...containerHeads('bag', 'bagKg'),
    ],
    // Columns of this tab's packing list. `n`: a number; `yes`: a Yes/No for an optional head.
    packing: [
      { key: 'bagKg', name: 'Bag size (kg)', n: true },
      { key: 'perContainer', name: 'Bags per container', n: true },
    ],
  },
  {
    key: 'consumer',
    name: 'Consumer packing',
    priceUnit: 'kg',
    heads: [
      { key: 'transport', name: 'Transport to warehouse', unit: 'Per bag', per: 'rawBag' },
      { key: 'unloading', name: 'Unloading at warehouse', unit: 'Per bag', per: 'rawBag', by: 'rawBagKg', slabs: LOAD_KG },
      { key: 'storage', name: 'Storage', unit: 'Per bag', per: 'rawBag', by: 'rawBagKg', slabs: STORE_KG },
      { key: 'bagCutting', name: 'Bag cutting (pouch cutting)', unit: 'Per bag', per: 'rawBag' },
      { key: 'chalni', name: 'Chalni or cleaning charges', unit: 'Per kg', per: 'kg', optional: true },
      { key: 'pouch', name: 'Pouch cost', unit: 'Per pouch', per: 'pack', optional: true },
      { key: 'carton', name: 'Carton cost', unit: 'Per carton', per: 'carton' },
      { key: 'packingLabour', name: 'Packing labour', unit: 'Per pouch', per: 'pack', by: 'packG', slabs: POUCH_G },
      { key: 'label', name: 'Label cost', unit: 'Per label', per: 'pack', optional: true },
      { key: 'labelLabour', name: 'Label labour for pasting', unit: 'Per label', per: 'pack', optional: true },
      { key: 'tinLabel', name: 'Tin labelling cost', unit: 'Per tin', per: 'pack', optional: true },
      { key: 'jarLabel', name: 'Jar labelling cost', unit: 'Per jar', per: 'pack', optional: true },
      { key: 'screen', name: 'Screen printing cost', unit: 'Per packet', per: 'pack', optional: true },
      { key: 'outerSticker', name: 'Outer box stickering', unit: 'Per carton', per: 'carton', optional: true },
      { key: 'taping', name: 'Carton taping cost', unit: 'Per carton', per: 'carton' },
      { key: 'strapping', name: 'Patti strapping cost', unit: 'Per carton', per: 'carton', optional: true },
      ...containerHeads('carton', 'cartonKg'),
    ],
    packing: [
      { key: 'packG', name: 'Pack size (g)', n: true },
      { key: 'packsPerCarton', name: 'Packs per carton', n: true },
      { key: 'perContainer', name: 'Cartons per container', n: true },
      { key: 'rawBagKg', name: 'Goods arrive in bags of (kg)', n: true },
    ],
  },
  {
    key: 'fmcg',
    name: 'FMCG',
    priceUnit: 'carton',
    heads: [
      { key: 'transport', name: 'Transport to warehouse', unit: 'Per carton', per: 'carton' },
      { key: 'unloading', name: 'Unloading at warehouse', unit: 'Per carton', per: 'carton', by: 'cartonKg', slabs: LOAD_KG },
      { key: 'storage', name: 'Storage', unit: 'Per carton', per: 'carton', by: 'cartonKg', slabs: STORE_KG },
      { key: 'cartonChange', name: 'Carton change cost', unit: 'Per carton', per: 'carton', optional: true },
      { key: 'packLabel', name: 'Label on pouches cost', unit: 'Per label', per: 'pack', optional: true },
      { key: 'packLabelLabour', name: 'Label labour for pasting', unit: 'Per label', per: 'pack', optional: true },
      { key: 'cartonLabel', name: 'Label on carton cost', unit: 'Per label', per: 'carton', optional: true },
      { key: 'cartonLabelLabour', name: 'Label labour for pasting on carton', unit: 'Per label', per: 'carton', optional: true },
      { key: 'screen', name: 'Screen printing cost', unit: 'Per packet', per: 'pack', optional: true },
      { key: 'gajjat', name: 'Gajjat making', unit: 'Per gajjat', per: 'gajjat' },
      { key: 'boxPacking', name: 'Box packing', unit: 'Per box', per: 'box' },
      { key: 'shrink', name: 'Shrink wrap', unit: 'Per box', per: 'box' },
      { key: 'taping', name: 'Carton taping cost', unit: 'Per carton', per: 'carton' },
      { key: 'strapping', name: 'Patti strapping cost', unit: 'Per carton', per: 'carton', optional: true },
      ...containerHeads('carton', 'cartonKg'),
    ],
    packing: [
      { key: 'packsPerCarton', name: 'Packs per carton', n: true },
      { key: 'cartonKg', name: 'Weight per carton (kg)', n: true },
      { key: 'gajjatsPerCarton', name: 'Gajjats per carton', n: true },
      { key: 'boxesPerCarton', name: 'Boxes per carton', n: true },
      { key: 'perContainer', name: 'Cartons per container', n: true },
    ],
  },
];

// Every packing list also has a name and container size first, and a Yes/No column per optional head.
// A head with slabs becomes one sheet row per slab, keyed "<head>@<upTo>".
for (const t of TABS) {
  t.packing = [
    { key: 'name', name: 'Packing name' },
    { key: 'container', name: 'Container' },
    ...t.packing,
    ...t.heads.filter((h) => h.optional).map((h) => ({ key: h.key, name: `${h.name}?`, yes: true })),
  ];
  for (const h of t.heads) if (h.slabs) h.slabs = h.slabs.map((s) => ({ ...s, key: `${h.key}@${s.upTo}` }));
  t.rows = t.heads.flatMap((h) => (h.slabs ? h.slabs.map((s) => ({ key: s.key, name: `${h.name}, ${s.name}`, unit: h.unit })) : [h]));
}

export const TAB = Object.fromEntries(TABS.map((t) => [t.key, t]));

export const SETTINGS = [
  { key: 'usdRate', name: 'Exchange rate (₹ per 1 USD)' },
  { key: 'insurancePct', name: 'Insurance for CIF (% of CFR value)' },
];

/** Which packing types a catalogue product can be quoted in. */
export const tabsFor = (product) => (product.type === 'fmcg' ? ['fmcg'] : ['bulk', 'consumer']);
