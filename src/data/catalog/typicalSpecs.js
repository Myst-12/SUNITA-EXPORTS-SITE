// Typical specifications for products without their own list: one set per product group (category/subcategory),
// plus product values that differ from the group (markers, colour, size). These are usual trade values; final
// specifications are confirmed per contract and lot with a certificate of analysis (see SPEC_DISCLAIMER).
// Packaged FMCG is left out on purpose: specifications there belong to each brand.

const MICRO = { 'Total Plate Count': 'Max 100,000 cfu/g', 'E. coli': 'Absent in 1 g', Salmonella: 'Absent in 25 g' };
const HERB = { Moisture: 'Max 10.0%', 'Total Ash': 'Max 8.0%', 'Acid Insoluble Ash': 'Max 2.0%', 'Foreign Matter': 'Max 2.0%', Identity: 'Macroscopic, microscopic and TLC', 'Heavy metals': 'Within market limits; tested on request' };
const PULSE = { Moisture: 'Max 12.0%', 'Foreign Matter': 'Max 0.5%', 'Damaged / discoloured': 'Max 2.0%', 'Weevilled grains': 'Max 1.0%', 'Other edible grains': 'Max 1.0%', Cleaning: 'Machine-cleaned / Sortex' };
const SEEDSPICE = { Purity: '99% / 99.5% (Sortex on request)', Moisture: 'Max 10.0%', 'Total Ash': 'Max 9.0%', 'Acid Insoluble Ash': 'Max 1.5%', 'Foreign Matter': 'Max 1.0%' };
const POWDER = { Mesh: '40 – 80 mesh (to specification)', Moisture: 'Max 10.0%', 'Total Ash': 'Max 8.0%', 'Acid Insoluble Ash': 'Max 1.5%', ...MICRO };
const CHILLI = { Purity: null, Moisture: 'Max 11.0%', 'Broken pods': 'Max 5%', 'Loose seeds': 'Max 2%', Aflatoxin: 'Within market limits; tested per lot', 'Foreign Matter': 'Max 1.0%' };
const ONION = { Moisture: 'Max 6.0%', Colour: 'White to creamy', 'Dark specks / skins': 'Max 1%', ...MICRO };
const RICE = { Moisture: 'Max 14.0%', Broken: 'Max 5% (other grades on request)', Purity: 'Min 95%', 'Damaged / discoloured': 'Max 1.0%', 'Chalky grains': 'Max 3.0%', Cleaning: 'Sortex cleaned' };
const BASMATI = { 'Average grain length': 'Min 7.0 mm', Moisture: 'Max 13.0%', Broken: 'Max 1% / 2%', Purity: 'Min 90% basmati', 'Damaged / discoloured': 'Max 1.0%', Ageing: '6 – 12 months on request' };
const FLOUR = { Moisture: 'Max 13.0%', 'Total Ash': 'Max 1.5%', 'Acid Insoluble Ash': 'Max 0.1%', Mesh: 'To specification', ...MICRO };
const OILSEED = { Purity: 'Min 99%', Moisture: 'Max 8.0%', 'Oil content': 'To specification', 'Foreign Matter': 'Max 1.0%', 'Damaged seeds': 'Max 2.0%' };
const MEAL = { Protein: 'To specification', 'Fat / oil': 'Max 2.0%', Fibre: 'Max 12.0%', Moisture: 'Max 12.0%', 'Sand / silica': 'Max 2.5%', Aflatoxin: 'Max 50 ppb' };
const FEEDGRAIN = { Moisture: 'Max 14.0%', 'Foreign Matter': 'Max 2.0%', 'Damaged grains': 'Max 3.0%', 'Broken grains': 'Max 3.0%', Aflatoxin: 'Max 20 ppb' };
const BIRD = { Purity: 'Min 99%', Moisture: 'Max 12.0%', Dust: 'Max 0.5%', 'Foreign Matter': 'Max 1.0%', Germination: 'Treated / non-germinating on request' };
const GUM = { Moisture: 'Max 14.0%', 'Total Ash': 'Max 4.0%', 'Acid Insoluble Matter': 'Max 1.0%', 'Foreign Matter': 'Max 1.0%', Grade: 'Food / industrial / pharmaceutical' };
const EXTRACT = { Form: 'Fine powder', 'Loss on drying': 'Max 5.0%', Mesh: '80 mesh', 'Heavy metals': 'Max 10 ppm (total)', 'Total Plate Count': 'Max 10,000 cfu/g', 'Yeast & Mould': 'Max 100 cfu/g', Salmonella: 'Absent in 25 g' };
const JAGGERY = { Colour: 'Golden to brown', Moisture: 'Max 8.0%', Sucrose: '65% – 85%', 'Reducing sugars': '10% – 15%', 'Insoluble matter': 'Max 1.5%', Additives: 'Chemical-free on request' };
const COFFEE = { Moisture: 'Max 12.5%', 'Screen size': 'By grade (e.g. 17/18 for AA)', Defects: 'By grade', 'Foreign Matter': 'Max 0.5%', Cup: 'Clean; sample cupped before shipment' };

export const GROUP_SPECS = {
  'indian-spices/whole-spices': SEEDSPICE,
  'indian-spices/spice-powders': POWDER,
  'herbs-botanicals/roots-root-products': HERB,
  'herbs-botanicals/rhizomes': HERB,
  'herbs-botanicals/barks-woods': { ...HERB, 'Total Ash': 'Max 10.0%' },
  'herbs-botanicals/leaves-leaf-products': { ...HERB, 'Total Ash': 'Max 12.0%', 'Stems': 'Max 3.0%' },
  'herbs-botanicals/fruits-fruit-products': { ...HERB, 'Total Ash': 'Max 7.0%' },
  'herbs-botanicals/seeds-seed-products': { Purity: 'Min 98%', Moisture: 'Max 10.0%', 'Foreign Matter': 'Max 2.0%', 'Damaged seeds': 'Max 3.0%', Identity: 'Macroscopic check' },
  'herbs-botanicals/specialty-functional-botanicals': HERB,
  'herbs-botanicals/gums-botanical-resins': GUM,
  'herbs-botanicals/botanical-extracts': EXTRACT,
  'herbs-botanicals/henna-natural-dyes': { Mesh: '150 – 200 mesh', Moisture: 'Max 8.0%', 'Sand / silica': 'Max 1.0%', Additives: 'None (pure plant powder)' },
  'superfoods-functional-seeds/psyllium-products': { Purity: '85% – 99% (by grade)', Moisture: 'Max 10.0%', 'Total Ash': 'Max 4.0%', ...MICRO },
  'superfoods-functional-seeds/moringa-functional-seeds': { Purity: 'Min 99%', Moisture: 'Max 8.0%', 'Foreign Matter': 'Max 1.0%', ...MICRO },
  'superfoods-functional-seeds/quinoa-amaranth': { Purity: 'Min 99.5%', Moisture: 'Max 12.0%', 'Foreign Matter': 'Max 0.5%', Saponin: 'Washed; negative foam test', ...MICRO },
  'dehydrated-onion-garlic/dehydrated-onion': ONION,
  'dehydrated-onion-garlic/dehydrated-garlic': { ...ONION, Colour: 'Creamy white' },
  'coconut-products/dried-coconut-derivatives': { Moisture: 'Max 6.0%', 'Free Fatty Acid': 'Max 0.3%', 'Oil content': 'Min 60%', ...MICRO },
  'pulses-legumes/chickpeas-chana': PULSE,
  'pulses-legumes/pigeon-peas-tur-arhar': PULSE,
  'pulses-legumes/green-gram-moong': PULSE,
  'pulses-legumes/black-gram-urad': PULSE,
  'pulses-legumes/lentils-masoor': PULSE,
  'pulses-legumes/peas-beans-other-pulses': PULSE,
  'rice/basmati-rice': BASMATI,
  'rice/non-basmati-rice': RICE,
  'rice/processing-forms': RICE,
  'flours-milling/wheat-flour': FLOUR,
  'flours-milling/pulse-rice-millet-flours': FLOUR,
  'flours-milling/milling-by-products': MEAL,
  'oilseeds/sesame-seeds': OILSEED,
  'oilseeds/groundnuts-other-oilseeds': OILSEED,
  'oilseeds/oilseed-meals-de-oiled-cakes': MEAL,
  'indian-coffee/coffee-products': COFFEE,
  'animal-bird-feed/feed-grains': FEEDGRAIN,
  'animal-bird-feed/bird-feed-ingredients': BIRD,
  'animal-bird-feed/meals-milling-by-products': MEAL,
  'raisins/raisin-products': { Moisture: 'Max 16.0%', 'Size': 'By grade', 'Foreign Matter': 'Max 0.1%', 'Damaged / sugared': 'Max 2%', Cleaning: 'Washed, cleaned, oiled on request' },
  'jaggery-natural-sweeteners/jaggery-products': JAGGERY,
};

// Values that differ from the group for a particular product.
export const PRODUCT_SPECS = {
  // Spices
  'black-cardamom': { Size: '15 mm+ / 12–15 mm', Moisture: 'Max 12.0%', 'Volatile Oil': 'Min 1.5% v/w' },
  cassia: { Thickness: '1 – 3 mm bark', 'Volatile Oil': 'Min 1.5% v/w', Moisture: 'Max 13.0%' },
  mace: { Colour: 'Orange-red', 'Volatile Oil': 'Min 5.0% v/w', Moisture: 'Max 10.0%' },
  'dry-ginger': { Moisture: 'Max 12.0%', 'Volatile Oil': 'Min 1.5% v/w', 'Total Ash': 'Max 8.0%' },
  'byadgi-chilli': { ...CHILLI, 'Colour (ASTA)': '150 – 200', 'Pungency (SHU)': '8,000 – 15,000' },
  'teja-chilli': { ...CHILLI, 'Colour (ASTA)': '60 – 90', 'Pungency (SHU)': '75,000 – 100,000' },
  'resham-patti-chilli': { ...CHILLI, 'Colour (ASTA)': '80 – 120', 'Pungency (SHU)': '20,000 – 30,000' },
  'kashmiri-chilli': { ...CHILLI, 'Colour (ASTA)': '120 – 180', 'Pungency (SHU)': '1,000 – 2,000' },
  'wrinkled-273-chilli': { ...CHILLI, 'Colour (ASTA)': '80 – 120', 'Pungency (SHU)': '15,000 – 25,000' },
  'endo-5-chilli': { ...CHILLI, 'Colour (ASTA)': '80 – 110', 'Pungency (SHU)': '20,000 – 35,000' },
  'red-chilli-flakes': { Purity: null, 'Particle size': '1 – 5 mm (to specification)', Moisture: 'Max 10.0%', 'Seed content': 'With or without seeds', ...MICRO },
  'chilli-seeds': { Purity: 'Min 98%', Moisture: 'Max 10.0%', 'Oil content': '18% – 22%' },
  'cut-turmeric': { Curcumin: '2.0% – 4.0%', Moisture: 'Max 10.0%', 'Cut size': '3 – 5 mm or TBC' },
  'cut-ginger': { 'Volatile Oil': 'Min 1.5% v/w', Moisture: 'Max 10.0%', 'Cut size': '3 – 5 mm or TBC' },
  tamarind: { Purity: null, 'Acid Insoluble Ash': null, Moisture: 'Max 20.0%', 'Seeds & fibre': 'Max 2% (seedless pulp)', Acidity: '12% – 16% (as tartaric acid)' },
  'shahi-jeera': { Purity: 'Min 99%', 'Volatile Oil': 'Min 3.0% v/w', Moisture: 'Max 10.0%' },
  'nigella-seeds': { Purity: '99% / 99.5% Sortex', Moisture: 'Max 8.0%', 'Volatile Oil': 'Min 0.5% v/w' },
  'kitchen-king-masala': { ...POWDER, Recipe: 'Standard or buyer formula' },
  'biryani-masala': { ...POWDER, Recipe: 'Standard or buyer formula' },
  'chaat-masala': { ...POWDER, Recipe: 'Standard or buyer formula', Salt: 'Contains black salt' },
  'tea-masala': { ...POWDER, Recipe: 'Standard or buyer formula' },
  'pav-bhaji-masala': { ...POWDER, Recipe: 'Standard or buyer formula' },
  'chole-masala': { ...POWDER, Recipe: 'Standard or buyer formula' },
  // Herbs: markers
  'shatavari-root': { Saponins: 'Min 3% (tested on request)' },
  'safed-musli': { Saponins: 'Min 3% (tested on request)', Colour: 'White, peeled' },
  'licorice-root': { Glycyrrhizin: 'Min 2.5% (tested on request)' },
  'sarpagandha-root': { 'Total alkaloids': 'Min 0.15% (tested on request)', Documentation: 'Cultivated source and export permit' },
  'kuth-root': { Documentation: 'Cultivated source and CITES permit' },
  'jatamansi-root': { Documentation: 'Cultivated source and CITES permit' },
  'kutki-root': { Documentation: 'Cultivated source and export permit' },
  'coleus-root': { Forskolin: 'Min 0.5% (tested on request)' },
  'vetiver-root': { 'Root length': '15 – 30 cm', Aroma: 'Earthy, characteristic' },
  'arjuna-bark': { Tannins: 'Min 15% (tested on request)' },
  'daruharidra-stem': { Berberine: 'Min 2% (tested on request)' },
  'acacia-catechu': { Catechin: 'To specification', Moisture: 'Max 12.0%' },
  'tulsi-leaves': { 'Essential oil': 'Min 0.5% v/w', Cut: 'Whole, TBC or powder' },
  'gudmar-leaves': { 'Gymnemic acids': 'Min 1% (tested on request)' },
  brahmi: { Bacosides: 'Min 2% (tested on request)' },
  kalmegh: { Andrographolides: 'Min 1% (tested on request)' },
  'moringa-leaves': { Colour: 'Green', Protein: '20% – 28%' },
  'senna-pods': { Sennosides: 'Min 2.5% (tested on request)' },
  'senna-leaf-powder': { Sennosides: 'Min 1.5% (tested on request)', Mesh: '60 – 80 mesh' },
  'curry-leaves': { Colour: 'Green', Moisture: 'Max 10.0%' },
  lemongrass: { Citral: 'Characteristic aroma', Cut: 'Cut or TBC' },
  'stevia-leaves': { 'Steviol glycosides': 'Min 8% (tested on request)' },
  'gotu-kola': { Asiaticoside: 'Min 0.5% (tested on request)' },
  'green-tea-leaves': { 'Leaf grade': 'By grade (loose leaf / TBC)', Moisture: 'Max 7.0%' },
  'basil-leaves': { ...MICRO, Colour: 'Green' },
  rosemary: { ...MICRO, 'Essential oil': 'Min 1.0% v/w' },
  oregano: { ...MICRO, 'Essential oil': 'Min 1.5% v/w' },
  thyme: { ...MICRO, 'Essential oil': 'Min 1.0% v/w' },
  sage: { ...MICRO, 'Essential oil': 'Min 1.0% v/w' },
  amla: { Tannins: 'Min 10% (tested on request)', 'Vitamin C': 'Tested on request' },
  haritaki: { Tannins: 'Min 20% (tested on request)' },
  'garcinia-cambogia': { HCA: '10% – 16% in rind (tested on request)' },
  'reetha-soapnut': { Saponins: 'Min 10% in shells', 'Shell share': 'Deseeded on request' },
  kokum: { Colour: 'Dark purple', Acidity: 'Characteristic' },
  'tamarind-kernel-powder': { Viscosity: 'To specification', Protein: 'Min 15%', Moisture: 'Max 8.0%' },
  'tamarind-pulp-powder': { Acidity: 'Min 10% (as tartaric acid)', Moisture: 'Max 5.0%' },
  'mucuna-seeds': { 'L-DOPA': 'Min 4% (tested on request)' },
  'neem-seeds': { 'Oil content': '35% – 45% (kernel)', Azadirachtin: 'Tested on request' },
  'karanj-seeds': { 'Oil content': '27% – 35%' },
  'mahua-seeds': { 'Oil content': '35% – 45% (kernel)' },
  'sal-seeds': { 'Fat content': '15% – 20%' },
  'chironji-seeds': { Moisture: 'Max 6.0%', Purity: 'Min 99%', 'Broken kernels': 'Max 5%' },
  'red-gunja-seeds': { Use: 'Non-food only (toxic if eaten)' },
  saffron: { Grade: 'ISO 3632 category I/II', 'Crocin (colouring strength)': 'Min 190', Moisture: 'Max 12.0%', 'Floral waste': 'Max 0.5%' },
  'shilajit-resin': { 'Fulvic acid': 'Min 20% (tested on request)', 'Heavy metals': 'Within market limits' },
  triphala: { Blend: '1 : 1 : 1 amla, haritaki, bibhitaki', Tannins: 'Min 15% (tested on request)', ...MICRO },
  'botanical-extracts': { Marker: 'Herb-specific, to specification' },
  // Gums
  'gum-arabic': { Solubility: 'Fully water soluble', Viscosity: 'To specification' },
  'guar-gum': { Viscosity: '3,500 – 5,500 cps (1%, 24 h)', Mesh: '200 mesh', Protein: 'Max 5.0%' },
  'karaya-gum': { Viscosity: 'To specification', 'Volatile acidity': 'Min 14%' },
  'seedlac-shellac': { 'Wax content': 'Max 0.5% (dewaxed grades)', Colour: 'By grade', 'Hot alcohol insolubles': 'Max 1.0%' },
  // Extracts: marker per product
  'curcumin-extract': { Curcuminoids: 'Min 95% (HPLC)' },
  'ashwagandha-extract': { Withanolides: '1.5% / 2.5% / 5% (HPLC)' },
  'gymnema-extract': { 'Gymnemic acids': '25% / 75%' },
  'bacopa-extract': { Bacosides: '20% / 50% (HPLC)' },
  'andrographis-extract': { Andrographolides: '10% / 30% (HPLC)' },
  'ginger-extract': { Gingerols: '5% (powder) / oleoresin to specification' },
  'fenugreek-extract': { Saponins: '50% (to specification)' },
  'garcinia-extract': { HCA: '50% – 60%' },
  'forskolin-extract': { Forskolin: '10% / 20% (HPLC)' },
  'senna-extract': { Sennosides: '20% (HPLC)' },
  'moringa-extract': { Ratio: '10 : 1 (to specification)' },
  'green-tea-extract': { Polyphenols: '50% – 98%', EGCG: 'To specification' },
  'aloe-vera-extract': { Ratio: '200 : 1', Aloin: 'Max 0.1 ppm (decolourised)' },
  papain: { 'Enzyme activity': '100 – 1,200 TU/mg (by grade)' },
  // Henna
  'baq-henna-powder': { Lawsone: 'Min 2.5%', Mesh: '200+ mesh, triple sifted' },
  'henna-powder': { Lawsone: 'Min 1.5%' },
  'henna-leaves': { Lawsone: 'Min 1.5%', Moisture: 'Max 10.0%' },
  'herbal-henna-hair-colour': { Shades: 'Black, brown, burgundy, natural', Ingredients: 'To formula' },
  'henna-cones': { Paste: 'Natural or instant', 'Cone size': 'To specification' },
  // Superfoods
  'psyllium-husk-powder': { Mesh: '40 / 60 / 100 mesh', 'Swell volume': 'Min 40 ml/g' },
  'moringa-leaf-powder': { Colour: 'Green', Protein: '20% – 28%', Mesh: '80 mesh' },
  'basil-seeds': { 'Swell ratio': 'Min 1 : 30' },
  // Dehydrated onion and garlic: particle sizes
  'dehydrated-onion-kibbled': { 'Particle size': '8 – 20 mm' },
  'dehydrated-onion-minced': { 'Particle size': '1 – 3 mm' },
  'dehydrated-onion-granules': { 'Particle size': '0.2 – 1 mm' },
  'dehydrated-red-onion-flakes': { Colour: 'Red-purple', 'Particle size': 'Flakes 8 – 20 mm; other cuts on request' },
  'dehydrated-pink-onion-flakes': { Colour: 'Pink', 'Particle size': 'Flakes 8 – 20 mm; other cuts on request' },
  'red-onion-powder': { Mesh: '80 – 100 mesh', Colour: 'Pink-brown' },
  'pink-onion-powder': { Mesh: '80 – 100 mesh', Colour: 'Light pink' },
  'spray-dried-onion-powder': { Mesh: '100 mesh', Carrier: 'Maltodextrin (to specification)' },
  'dehydrated-garlic-minced': { 'Particle size': '1 – 3 mm' },
  'dehydrated-garlic-granules': { 'Particle size': '0.2 – 1 mm' },
  'spray-dried-garlic-powder': { Mesh: '100 mesh', Carrier: 'Maltodextrin (to specification)' },
  // Coconut
  'desiccated-coconut': { Moisture: 'Max 3.0%', Grade: 'Fine / medium', Colour: 'White' },
  'dry-copra': { Moisture: 'Max 6.0%', 'Oil content': 'Min 65%' },
  cocopeat: { 'Electrical conductivity': '< 0.5 mS/cm (washed)', Moisture: 'Max 15.0%', Expansion: '12 – 15 L per kg', 'Free Fatty Acid': null, 'Oil content': null, 'Total Plate Count': null, 'E. coli': null, Salmonella: null },
  // Pulses
  'kala-chana': { Colour: 'Dark brown to black' },
  'roasted-chana': { Moisture: 'Max 5.0%', Roast: 'Even, crunchy' },
  'red-kidney-beans': { Size: 'By type (Chitra, Jammu, dark red)' },
  'broad-beans': { Size: 'By grade' },
  // Rice
  'traditional-basmati-rice': { 'Average grain length': 'Min 6.8 mm', Aroma: 'Strong' },
  '1509-basmati-rice': { 'Average grain length': 'Min 8.0 mm' },
  '1718-basmati-rice': { 'Average grain length': 'Min 8.2 mm' },
  'ponni-rice': { 'Grain length': '5.0 – 5.5 mm' },
  'idli-rice': { Type: 'Parboiled, short bold' },
  'matta-rice': { Type: 'Parboiled red rice' },
  'jeera-samba-rice': { 'Grain length': '3.5 – 4.5 mm', Aroma: 'Characteristic' },
  'broken-rice': { Broken: 'By grade (25% – 100%)' },
  '100-broken-rice': { Broken: '100%' },
  'tibar-basmati': { Broken: 'About 3/4 grain' },
  'dubar-basmati': { Broken: 'About 1/2 grain' },
  'mogra-basmati': { Broken: 'Small pieces' },
  'mini-mogra-basmati': { Broken: 'Smallest pieces' },
  'brown-rice': { Milling: 'Husked, bran on' },
  // Flours
  maida: { 'Total Ash': 'Max 0.6%', Protein: '9% – 11%' },
  'chakki-atta': { 'Total Ash': 'Max 2.0%', 'Gluten (wet)': 'Min 25%' },
  'sooji-rava': { Granulation: 'Fine / medium / coarse' },
  besan: { Mesh: '60 – 80 mesh', Protein: 'Min 20%' },
  'corn-starch': { Moisture: 'Max 13.0%', pH: '4.5 – 7.0', Whiteness: 'Min 90%', 'Total Ash': 'Max 0.15%' },
  'indian-wheat': { Protein: '11% – 13%', 'Test weight': 'Min 76 kg/hl', Moisture: 'Max 12.0%', 'Total Ash': null, 'Acid Insoluble Ash': null, Mesh: null, 'Total Plate Count': null, 'E. coli': null, Salmonella: null },
  'wheat-bran': { Protein: '14% – 16%', Fibre: '10% – 12%' },
  'rice-bran': { 'Oil content': '14% – 18% (raw)', Protein: '12% – 14%' },
  // Oilseeds and meals
  'black-sesame': { Purity: '99% / 99.5%', 'Oil content': 'Min 46%', 'Brown seeds': 'Max 3%' },
  'raw-groundnuts': { Count: '38/42 … 80/90 per oz (Bold / Java)', Moisture: 'Max 7.0%', Aflatoxin: 'Max 4 ppb (EU) / 20 ppb' },
  soybeans: { 'Oil content': 'Min 18%', Protein: 'Min 35%', Moisture: 'Max 12.0%', GMO: 'Non-GM' },
  'niger-seeds': { Purity: 'Min 99%', Germination: 'Heat-treated for bird food on request' },
  'flax-seeds': { 'Oil content': 'Min 38%', Purity: '99% / 99.5%' },
  'sunflower-seeds': { 'Oil content': 'Confectionery / oil grades' },
  'safflower-seeds': { 'Oil content': 'Min 30%' },
  'cottonseed-meal': { Protein: 'Min 38%' },
  'other-oilseed-meals': { Protein: 'By meal type' },
  // Feed meals
  'soybean-meal': { Protein: 'Min 46% – 48%', 'Urease activity': 'Max 0.3 pH rise' },
  'de-oiled-rice-bran': { Protein: 'Min 14%', 'Sand / silica': 'Max 3.0%' },
  'groundnut-cake': { Protein: 'Min 45%', Aflatoxin: 'Max 50 ppb' },
  'corn-gluten-meal': { Protein: 'Min 60%' },
  'microfine-guar-meal': { Protein: 'Min 50%' },
  'roasted-guar-korma-meal': { Protein: 'Min 55%' },
  'toasted-guar-korma-meal': { Protein: 'Min 50%' },
  'guar-churi-meal': { Protein: 'Min 35%' },
  'cassia-tora-meal': { Protein: 'Min 18%' },
  'feed-maize': { Moisture: 'Max 14.0%', Protein: 'Min 7.5%' },
  'maize-grits': { 'Particle size': 'Coarse / medium / fine', Fat: 'Max 1.0%' },
  // Coffee
  'roasted-coffee-beans': { Roast: 'Light to dark', Moisture: 'Max 3.0%', Defects: null, 'Screen size': null },
  'ground-coffee': { Roast: 'Light to dark', Grind: 'Filter / espresso', Chicory: 'To blend', Moisture: 'Max 3.0%', Defects: null, 'Screen size': null },
  // Raisins
  'golden-raisins': { Colour: 'Golden yellow' },
  'black-raisins': { Colour: 'Black', Seeds: 'Seedless or with seeds' },
  // Jaggery
  'liquid-jaggery': { Brix: '75 – 80 °Bx', Moisture: 'Max 25.0%' },
  'organic-jaggery': { Certification: 'Organic certificate per shipment' },
  'jaggery-chikki': { Composition: 'Jaggery with peanut / sesame / nuts', Moisture: 'Max 3.0%' },
};

/** Typical specifications for a product without its own: its group's set, adjusted for the product. */
export function typicalSpecs(p) {
  const group = GROUP_SPECS[`${p.category}/${p.subcategory}`];
  const own = PRODUCT_SPECS[p.slug];
  if (!group && !own) return {};
  const merged = { ...(group || {}), ...(own || {}) };
  return Object.fromEntries(Object.entries(merged).filter(([, v]) => v)); // null removes a group value
}
