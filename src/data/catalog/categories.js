/**
 * The 14 approved main categories (docs/product-taxonomy.xlsx → Category Master), in display order.
 * `subcategories` lists only the subcategories that have products in the Product List sheet.
 * Private Label & OEM is a service area, not a product range: it links to /private-label/.
 */

export const categoryList = [
  {
    slug: 'indian-spices',
    name: 'Indian Spices',
    shortName: 'Spices',
    image: '/images/catalog/categories/indian-spices.webp',
    description:
      'Whole spices, spice powders, masala blends and cut spices from India’s main growing regions — machine-cleaned, Sortex-graded and steam-sterilised on request.',
    metaTitle: 'Indian Spices Exporter — Whole, Ground & Blended Spices',
    metaDescription:
      'Exporter of Indian whole spices, spice powders, masalas and chilli varieties: cumin, coriander, turmeric, black pepper, cardamom, Guntur, Teja and Byadgi chilli. Bulk and private label.',
    subcategories: [
      { slug: 'whole-spices', name: 'Whole Spices' },
      { slug: 'spice-powders', name: 'Spice Powders & Masalas' },
    ],
  },
  {
    slug: 'herbs-botanicals',
    name: 'Herbs & Botanicals',
    shortName: 'Herbs',
    image: '/images/catalog/categories/herbs-botanicals.webp',
    description:
      'Roots, rhizomes, barks, leaves, fruits, seeds, gums and resins used by herbal, Ayurvedic, cosmetic and extraction companies — identity-checked by botanical name.',
    metaTitle: 'Indian Herbs & Botanicals Exporter — Roots, Leaves, Gums & Resins',
    metaDescription:
      'Ashwagandha, shatavari, amla, haritaki, tulsi, moringa, guggul, gum karaya and 100+ Indian herbs and botanicals, supplied by botanical name in bulk.',
    subcategories: [
      { slug: 'roots-root-products', name: 'Roots & Root Products' },
      { slug: 'rhizomes', name: 'Rhizomes' },
      { slug: 'barks-woods', name: 'Barks & Woods' },
      { slug: 'leaves-leaf-products', name: 'Leaves & Leaf Products' },
      { slug: 'fruits-fruit-products', name: 'Fruits & Fruit Products' },
      { slug: 'seeds-seed-products', name: 'Seeds & Seed Products' },
      { slug: 'gums-botanical-resins', name: 'Gums & Botanical Resins' },
      { slug: 'botanical-extracts', name: 'Botanical Extracts' },
      { slug: 'henna-natural-dyes', name: 'Henna & Natural Dyes' },
      { slug: 'specialty-functional-botanicals', name: 'Specialty & Functional Botanicals' },
    ],
  },
  {
    slug: 'dehydrated-onion-garlic',
    name: 'Dehydrated Onion & Garlic',
    shortName: 'Dehydrated',
    image: '/images/catalog/categories/dehydrated-onion-garlic.webp',
    description:
      'Dehydrated white onion and garlic from Gujarat in every standard cut — flakes, kibbled, minced, granules and powder — for seasoning and food manufacturers.',
    metaTitle: 'Dehydrated Onion & Garlic Exporter — Flakes, Minced, Granules, Powder',
    metaDescription:
      'Dehydrated white onion flakes, kibbled, minced, granules and powder, and dehydrated garlic flakes, minced, granules and powder from Mahuva, Gujarat.',
    subcategories: [
      { slug: 'dehydrated-onion', name: 'Dehydrated Onion' },
      { slug: 'dehydrated-garlic', name: 'Dehydrated Garlic' },
    ],
  },
  {
    slug: 'coconut-products',
    name: 'Coconut Products',
    shortName: 'Coconut',
    image: '/images/catalog/categories/coconut-products.webp',
    description:
      'Desiccated coconut and dry copra from Kerala, Tamil Nadu and Karnataka, and cocopeat blocks — for bakery, sweets, oil mills and growers.',
    metaTitle: 'Coconut Products Exporter India — Desiccated Coconut, Dry Copra, Cocopeat',
    metaDescription:
      'Exporter of desiccated coconut, edible and milling dry copra, and cocopeat blocks from South India, in bulk and private-label packs.',
    subcategories: [{ slug: 'dried-coconut-derivatives', name: 'Coconut Products' }],
  },
  {
    slug: 'pulses-legumes',
    name: 'Pulses & Legumes',
    shortName: 'Pulses',
    image: '/images/catalog/categories/pulses-legumes.webp',
    description:
      'Chickpeas, pigeon peas, moong, urad, lentils, peas and beans — whole or split, skin-on or skinless, polished or unpolished — cleaned and graded for export.',
    metaTitle: 'Indian Pulses & Lentils Exporter — Chana, Toor, Moong, Urad, Masoor',
    metaDescription:
      'Kabuli and desi chickpeas, chana dal, toor dal, moong, urad, masoor, rajma, lobia and other Indian pulses in 25/50 kg bags or retail packs.',
    subcategories: [
      { slug: 'chickpeas-chana', name: 'Chickpeas / Chana' },
      { slug: 'pigeon-peas-tur-arhar', name: 'Pigeon Peas / Tur / Arhar' },
      { slug: 'green-gram-moong', name: 'Green Gram / Moong' },
      { slug: 'black-gram-urad', name: 'Black Gram / Urad' },
      { slug: 'lentils-masoor', name: 'Lentils / Masoor' },
      { slug: 'peas-beans-other-pulses', name: 'Peas, Beans & Other Pulses' },
    ],
  },
  {
    slug: 'rice',
    name: 'Rice',
    shortName: 'Rice',
    image: '/images/catalog/categories/rice.webp',
    description:
      'Basmati varieties (1121, 1509, 1718, traditional) and non-basmati varieties (IR64, Sona Masuri, Ponni and more), in raw, steam, parboiled, sella, brown and broken forms.',
    metaTitle: 'Basmati & Non-Basmati Rice Exporter India — 1121, 1509, IR64, Sona Masuri',
    metaDescription:
      'Indian rice exporter: 1121, 1509, 1718 and traditional basmati; IR64, Sona Masuri, Ponni, Matta and other non-basmati; raw, steam, parboiled, sella and broken.',
    subcategories: [
      { slug: 'basmati-rice', name: 'Basmati Rice' },
      { slug: 'non-basmati-rice', name: 'Non-Basmati Rice' },
      { slug: 'processing-forms', name: 'Processing Forms' },
    ],
  },
  {
    slug: 'flours-milling',
    name: 'Flours & Milling Products',
    shortName: 'Flours',
    image: '/images/catalog/categories/flours-milling.webp',
    description:
      'Chakki atta, maida, sooji, besan, rice flour and millet flours, plus wheat and rice bran — food-grade and feed-grade products clearly separated.',
    metaTitle: 'Indian Flour Exporter — Atta, Maida, Sooji, Besan, Millet Flours',
    metaDescription:
      'Whole wheat chakki atta, wheat flour, maida, sooji (rava), besan, rice flour, bajra, jowar, ragi and corn flour, plus wheat and rice bran, from India.',
    subcategories: [
      { slug: 'wheat-flour', name: 'Wheat Flour' },
      { slug: 'pulse-rice-millet-flours', name: 'Pulse, Rice & Millet Flours' },
      { slug: 'milling-by-products', name: 'Milling By-products' },
    ],
  },
  {
    slug: 'oilseeds',
    name: 'Oilseeds & Oilseed Products',
    shortName: 'Oilseeds',
    image: '/images/catalog/categories/oilseeds.webp',
    description:
      'Hulled and natural white sesame, black sesame, groundnuts, mustard seeds and soybeans, plus oilseed meals and de-oiled cakes for feed manufacturers.',
    metaTitle: 'Sesame, Groundnut & Oilseed Exporter India — Seeds and Meals',
    metaDescription:
      'Hulled white sesame, natural sesame, black sesame, raw groundnuts, soybeans, cottonseed meal and mustard meal exported from India.',
    subcategories: [
      { slug: 'sesame-seeds', name: 'Sesame Seeds' },
      { slug: 'groundnuts-other-oilseeds', name: 'Groundnuts & Other Oilseeds' },
      { slug: 'oilseed-meals-de-oiled-cakes', name: 'Oilseed Meals & De-oiled Cakes' },
    ],
  },
  {
    slug: 'indian-coffee',
    name: 'Indian Coffee',
    shortName: 'Coffee',
    image: '/images/catalog/categories/indian-coffee.webp',
    description:
      'Shade-grown Indian Arabica and Robusta from Karnataka, Kerala and Tamil Nadu — green beans in Coffee Board grades, and roasted or ground coffee.',
    metaTitle: 'Indian Coffee Exporter — Green Arabica & Robusta, Roasted, Ground',
    metaDescription:
      'Indian green coffee beans (Arabica Plantation, Cherry, Monsooned Malabar; Robusta Parchment, Cherry, Kaapi Royale), roasted beans and ground coffee.',
    subcategories: [{ slug: 'coffee-products', name: 'Coffee Products' }],
  },
  {
    slug: 'superfoods-functional-seeds',
    name: 'Superfoods & Functional Seeds',
    shortName: 'Superfoods',
    image: '/images/catalog/categories/superfoods-functional-seeds.webp',
    description:
      'Psyllium seeds, husk and husk powder, moringa seeds and leaf powder, basil seeds, white and red quinoa and amaranth — ingredients for health-food, supplement and beverage brands.',
    metaTitle: 'Psyllium Husk, Moringa, Quinoa & Amaranth Exporter India',
    metaDescription:
      'Psyllium husk 85–99% purity, psyllium husk powder and seeds, moringa leaf powder, moringa seeds, basil (sabja) seeds, white and red quinoa and amaranth (rajgira) seeds exported from India.',
    subcategories: [
      { slug: 'psyllium-products', name: 'Psyllium Products' },
      { slug: 'moringa-functional-seeds', name: 'Moringa & Functional Seeds' },
      { slug: 'quinoa-amaranth', name: 'Quinoa & Amaranth' },
    ],
  },
  {
    slug: 'animal-bird-feed',
    name: 'Animal & Bird Feeds',
    shortName: 'Feeds',
    image: '/images/catalog/categories/animal-bird-feed.webp',
    description:
      'Feed maize, sorghum and millet, oilseed meals, brans and bird-feed seeds — sold for animal feed use only and labelled that way on every contract.',
    metaTitle: 'Animal Feed & Bird Feed Ingredients Exporter India',
    metaDescription:
      'Feed maize, feed sorghum, feed millet, cottonseed meal, mustard meal, rice bran, wheat bran, bird-feed millet, canary seed and seed mixes from India.',
    subcategories: [
      { slug: 'feed-grains', name: 'Feed Grains' },
      { slug: 'meals-milling-by-products', name: 'Meals & Milling By-products' },
      { slug: 'bird-feed-ingredients', name: 'Bird Feed Ingredients' },
    ],
  },
  {
    slug: 'foodstuff-fmcg',
    name: 'Foodstuff & FMCG',
    shortName: 'FMCG',
    image: '/images/catalog/categories/foodstuff-fmcg.webp',
    description:
      'Packaged Indian groceries for importers and supermarkets — flours, staples, snacks, sweets, ready-to-eat, pickles, tea, oils, personal and home care — consolidated with bulk products in one container.',
    metaTitle: 'Indian FMCG & Grocery Exporter — Packaged Food for Importers',
    metaDescription:
      'Indian FMCG and grocery export: packaged atta, rice, dals, masalas, biscuits, namkeen, sweets, ready-to-eat, pickles, papad, tea, coffee, oils, jaggery and makhana.',
    flat: true, // one product family per subcategory, so the page lists families without subcategory headings
    note: 'These are product families. Exact brands, pack sizes, units per carton and destination eligibility are confirmed with each order — we only offer brands we are authorised to supply.',
    subcategories: [
      { slug: 'atta-flour', name: 'Atta & Flour' },
      { slug: 'rice-staples', name: 'Rice & Staples' },
      { slug: 'pulses-legumes', name: 'Pulses & Legumes' },
      { slug: 'spices-masala', name: 'Spices & Masala' },
      { slug: 'biscuits-bakery', name: 'Biscuits & Bakery' },
      { slug: 'snacks-namkeen', name: 'Snacks & Namkeen' },
      { slug: 'sweets-desserts', name: 'Sweets & Desserts' },
      { slug: 'ready-to-eat', name: 'Ready-to-Eat' },
      { slug: 'pickles-chutneys', name: 'Pickles & Chutneys' },
      { slug: 'papad', name: 'Papad' },
      { slug: 'tea', name: 'Tea' },
      { slug: 'coffee', name: 'Coffee' },
      { slug: 'beverages', name: 'Beverages' },
      { slug: 'dairy', name: 'Dairy' },
      { slug: 'sauces', name: 'Sauces' },
      { slug: 'jaggery', name: 'Jaggery' },
      { slug: 'healthy-snacks', name: 'Healthy Snacks' },
      { slug: 'personal-care', name: 'Personal Care' },
      { slug: 'household-home-care', name: 'Household & Home Care' },
    ],
  },
  {
    slug: 'jaggery-natural-sweeteners',
    name: 'Jaggery & Natural Sweeteners',
    shortName: 'Jaggery',
    image: '/images/catalog/categories/jaggery-natural-sweeteners.webp',
    description:
      'Cane jaggery in blocks, cubes, powder and liquid, plus organic, palm, date-palm and coconut jaggery — unrefined Indian sweeteners in bulk, retail or private-label packs.',
    metaTitle: 'Jaggery Exporter from India — Blocks, Cubes, Powder & Organic Jaggery',
    metaDescription:
      'Exporter of Indian jaggery: gur blocks, jaggery cubes, jaggery powder, organic jaggery, liquid jaggery, palm jaggery, date-palm jaggery and coconut sugar.',
    subcategories: [{ slug: 'jaggery-products', name: 'Jaggery Products' }],
  },
  {
    slug: 'raisins',
    name: 'Raisins',
    shortName: 'Raisins',
    image: '/images/catalog/categories/raisins.webp',
    description:
      'Green, golden and black raisins from Sangli, Nashik and Vijayapura, graded by size, colour and moisture for retail, bakery and confectionery buyers.',
    metaTitle: 'Indian Raisins Exporter — Green, Golden & Black Raisins',
    metaDescription:
      'Exporter of Indian green raisins, golden raisins and black raisins from Sangli and Nashik, graded and packed in 10–15 kg cartons or retail packs.',
    subcategories: [{ slug: 'raisin-products', name: 'Raisin Products' }],
  },
  {
    slug: 'private-label-oem',
    name: 'Private Label & OEM',
    shortName: 'Private Label',
    image: '/images/scenes/pack-kraft-pouch.webp',
    href: '/private-label/',
    service: true,
    description:
      'Private-label sourcing, custom packaging, multi-product containers, samples and export documentation — services around the products above, not separate products.',
    services: [
      { name: 'Private label sourcing', text: 'Indian food products packed under your brand, with your artwork, barcodes and label language.' },
      { name: 'Custom packaging', text: 'Pouches, jars, cartons and bags in the sizes your market needs, from 50 g retail packs to 50 kg sacks.' },
      { name: 'Multi-product container planning', text: 'Many products and categories combined in one 20 ft or 40 ft container.', href: '/mixed-container/' },
      { name: 'Specifications & samples', text: 'Specification sheets for every product and pre-shipment samples on request.' },
      { name: 'Export documentation', text: 'Invoice, packing list, certificate of origin, phytosanitary and health certificates, CoA and buyer-specific documents.' },
    ],
  },
];
