/**
 * Product catalogue — generated from docs/product-taxonomy.xlsx (Category Master + Product List),
 * merged with the earlier hand-written specifications. Edit freely; this file is now the source.
 *
 * One entry per canonical product page. `category`/`subcategory` = primary listing (canonical URL);
 * `also` = extra listings in other categories (same page, no duplicate URL).
 * Only documented values go in `specifications`, `shelfLife`, `grades` and `containerLoad`;
 * missing values render as "on request". Internal IDs / verification statuses are deliberately not stored.
 * Text fields are English; translations can overlay them by slug later.
 */

export const products = [
  {
    "slug": "cumin-seeds",
    "name": "Cumin Seeds (Jeera)",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Cuminum cyminum",
    "hsCode": "0909.31",
    "origin": "Gujarat, Rajasthan",
    "forms": [
      "Whole seeds"
    ],
    "grades": [
      "Singapore Grade (99% Purity)",
      "Europe Grade (99.5% Purity)",
      "Sortex Cleaned (99.9% Purity)"
    ],
    "description": "Aromatic cumin seeds from the Unjha belt of Gujarat and from Rajasthan, machine-cleaned and Sortex-graded for whole-seed buyers, grinders and seasoning makers.",
    "specifications": {
      "Purity": "99.0% / 99.5% / 99.9% Sortex Cleaned",
      "Moisture": "Max 8.0%",
      "Volatile Oil": "Min 2.0% v/w",
      "Total Ash": "Max 8.5%",
      "Acid Insoluble Ash": "Max 1.5%",
      "Foreign Matter": "Max 0.1% (for 99.9% grade)"
    },
    "shelfLife": "24 months",
    "packaging": [
      "25kg PP Bags",
      "25kg Paper Bags",
      "Custom consumer packs"
    ],
    "image": "/images/products/cumin.webp",
    "gallery": [
      "/images/products/cumin.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "coriander-seeds",
    "name": "Coriander Seeds (Dhania)",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Coriandrum sativum",
    "hsCode": "0909.21",
    "origin": "Rajasthan, Madhya Pradesh, Gujarat",
    "forms": [
      "Whole seeds",
      "Splits"
    ],
    "grades": [
      "Eagle Grade",
      "Scooter Grade",
      "Single Parrot",
      "Double Parrot"
    ],
    "description": "Whole coriander seeds graded by colour and size (Eagle, Scooter, Parrot), with a sweet citrus aroma for grinding, pickling and spice blends.",
    "specifications": {
      "Moisture": "Max 9.0%",
      "Volatile Oil": "Min 0.5% v/w",
      "Total Ash": "Max 7.0%",
      "Acid Insoluble Ash": "Max 1.0%",
      "Splits": "Max 5.0% (for whole premium grade)",
      "Damaged Seeds": "Max 1.0%"
    },
    "shelfLife": "18 months",
    "packaging": [
      "20kg Multi-wall Paper Bags",
      "25kg PP Bags",
      "Custom consumer packs"
    ],
    "image": "/images/products/coriander.webp",
    "gallery": [
      "/images/products/coriander.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "fennel-seeds",
    "name": "Fennel Seeds (Saunf)",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Foeniculum vulgare",
    "hsCode": "0909.61",
    "origin": "Gujarat, Rajasthan",
    "forms": [
      "Whole seeds"
    ],
    "grades": [
      "Abu Road (Vibrant Green)",
      "Unjha Regular",
      "Sortex Cleaned Premium"
    ],
    "description": "Green fennel seeds from Gujarat and Rajasthan, sorted for colour and purity, used in spice blends, bakery, liquor and as an after-meal mouth freshener.",
    "specifications": {
      "Moisture": "Max 9.0%",
      "Volatile Oil": "Min 1.2% v/w",
      "Purity": "98% / 99% / 99.5% Sortex Cleaned",
      "Foreign Matter": "Max 0.1% (for premium Sortex)",
      "Damaged Seeds": "Max 1.0%"
    },
    "shelfLife": "24 months",
    "packaging": [
      "25kg PP Bags",
      "20kg Multi-wall Paper Bags"
    ],
    "image": "/images/products/fennel-seeds.webp",
    "gallery": [
      "/images/products/fennel-seeds.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "fenugreek-seeds",
    "name": "Fenugreek Seeds (Methi)",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Trigonella foenum-graecum",
    "hsCode": "0910.99",
    "origin": "Rajasthan, Madhya Pradesh",
    "forms": [
      "Whole seeds"
    ],
    "grades": [
      "Sortex Cleaned 99.5%",
      "Machine Cleaned 99%"
    ],
    "description": "Machine-cleaned and Sortex-graded fenugreek seeds with a bitter-sweet, maple-like aroma for curry powders, pickles and seasoning blends.",
    "specifications": {
      "Purity": "98% / 99% / 99.5% Sortex Cleaned",
      "Moisture": "Max 9.0%",
      "Total Ash": "Max 5.0%",
      "Foreign Matter": "Max 0.2% (for 99.5% grade)",
      "Other Seeds": "Max 0.5%"
    },
    "shelfLife": "24 months",
    "packaging": [
      "25kg PP Bags",
      "25kg Paper Bags"
    ],
    "image": "/images/products/fenugreek-seeds.webp",
    "gallery": [
      "/images/products/fenugreek-seeds.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "ajwain-seeds",
    "name": "Ajwain Seeds (Carom)",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Trachyspermum ammi",
    "hsCode": "0910.99",
    "origin": "Gujarat, Rajasthan",
    "forms": [
      "Whole seeds"
    ],
    "grades": [
      "Sortex Cleaned 99.5%",
      "Machine Cleaned 99%"
    ],
    "description": "Small ridged carom seeds with a sharp thyme-like aroma from their thymol content, used in breads, snacks, pickles and spice mixes.",
    "specifications": {
      "Moisture": "Max 8.0%",
      "Volatile Oil (Thymol)": "Min 2.5% v/w",
      "Purity": "99% / 99.5% Sortex Cleaned",
      "Foreign Matter": "Max 0.1% (premium grade)",
      "Other Crop Seeds": "Max 0.2%"
    },
    "shelfLife": "24 months",
    "packaging": [
      "25kg PP Bags",
      "25kg Paper Bags"
    ],
    "image": "/images/products/ajwain-seeds.webp",
    "gallery": [
      "/images/products/ajwain-seeds.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "mustard-seeds",
    "name": "Mustard Seeds",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "also": [
      {
        "category": "oilseeds",
        "subcategory": "groundnuts-other-oilseeds"
      }
    ],
    "type": "bulk",
    "botanicalName": "Brassica juncea (brown); Brassica spp. (yellow)",
    "hsCode": "1207.50",
    "origin": "Rajasthan, Haryana, Madhya Pradesh",
    "forms": [
      "Whole seeds"
    ],
    "grades": [
      "Small Brown Mustard (Rai)",
      "Bold Brown Mustard",
      "Yellow Mustard Seeds"
    ],
    "description": "Small and bold brown mustard (rai) and yellow mustard seeds, cleaned for tempering, pickling, mustard paste and oil milling.",
    "specifications": {
      "Purity": "99% / 99.5% Sortex Cleaned",
      "Moisture": "Max 8.0%",
      "Oil Content": "Min 38.0%",
      "Foreign Matter": "Max 0.5%",
      "Other Seeds": "Max 0.5%"
    },
    "shelfLife": "24 months",
    "packaging": [
      "25kg PP Bags",
      "50kg Jute Bags"
    ],
    "image": "/images/products/mustard-seeds.webp",
    "gallery": [
      "/images/products/mustard-seeds.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "black-pepper",
    "name": "Black Pepper",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Piper nigrum",
    "hsCode": "0904.11",
    "origin": "Kerala, Karnataka",
    "forms": [
      "Whole berries"
    ],
    "grades": [
      "Malabar Garbled 1 (MG-1)",
      "Malabar Garbled 2 (MG-2)",
      "Tellicherry Extra Bold (TGSEB)"
    ],
    "description": "Malabar and Tellicherry black pepper from the Western Ghats, graded by bulk density and berry size for grinders, packers and food manufacturers.",
    "specifications": {
      "Moisture": "Max 12.0%",
      "Piperine Content": "Min 4.0%",
      "Volatile Oil": "Min 1.5% v/w",
      "Density (Bulk Weight)": "500g/l - 550g/l - 600g/l (MG-1 & MG-2)",
      "Foreign Matter": "Max 0.5%",
      "Mouldy Berries": "Max 1.0%"
    },
    "shelfLife": "24 months",
    "packaging": [
      "25kg PP Bags",
      "25kg Paper Bags",
      "Custom consumer grinders and packs"
    ],
    "image": "/images/products/black-pepper.webp",
    "gallery": [
      "/images/products/black-pepper.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "green-cardamom",
    "name": "Green Cardamom",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Elettaria cardamomum",
    "hsCode": "0908.31",
    "origin": "Kerala, Tamil Nadu, Karnataka",
    "forms": [
      "Whole pods",
      "Seeds"
    ],
    "grades": [
      "AGEB (Alleppey Green Extra Bold)",
      "AGB (Alleppey Green Bold)",
      "AGS-1 (Alleppey Green Superior)",
      "Cardamom Seeds (decorticated)"
    ],
    "description": "Green cardamom pods from the Idukki hills, graded by diameter (6–8 mm+) and colour for retail, sweets, coffee and spice blends.",
    "specifications": {
      "Moisture": "Max 12.0%",
      "Volatile Oil": "Min 4.0% v/w",
      "Size (Diameter)": "6mm - 7mm - 8mm+ (Bold / Extra Bold)",
      "Immaturity": "Max 2.0% by count",
      "Thrips/Damaged": "Max 1.0% by count",
      "Foreign Matter": "Max 0.5%"
    },
    "shelfLife": "18 months",
    "packaging": [
      "10kg/20kg Cartons with inner poly lining",
      "Custom small boxes/pouches"
    ],
    "image": "/images/products/cardamom.webp",
    "gallery": [
      "/images/products/cardamom.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "black-cardamom",
    "name": "Black Cardamom (Badi Elaichi)",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Amomum subulatum",
    "hsCode": "0908.31",
    "origin": "Sikkim, Darjeeling (West Bengal)",
    "forms": [
      "Whole pods",
      "Seeds"
    ],
    "grades": [
      "Bold",
      "Medium",
      "Mixed"
    ],
    "description": "Large wrinkled pods cured over open fire for a deep smoky aroma, used in garam masala, biryani and slow-cooked meat dishes.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/products/black-cardamom.webp",
    "gallery": [
      "/images/products/black-cardamom.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "cloves",
    "name": "Cloves",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Syzygium aromaticum",
    "hsCode": "0907.10",
    "origin": "Tamil Nadu, Kerala, Karnataka",
    "forms": [
      "Whole buds"
    ],
    "grades": [
      "Lal Pari (Premium Grade)",
      "Handpicked Grade",
      "Standard Export Grade"
    ],
    "description": "Hand-picked, sun-dried clove buds sorted to remove headless cloves and stems, for whole-spice packs, grinding and blends.",
    "specifications": {
      "Moisture": "Max 12.0%",
      "Volatile Oil": "Min 15.0% v/w (rich in Eugenol)",
      "Headless Cloves": "Max 5.0% by count",
      "Stems/Khoker": "Max 1.0% by count",
      "Foreign Matter": "Max 0.5%"
    },
    "shelfLife": "24 months",
    "packaging": [
      "25kg PP Bags with inner liner",
      "Custom consumer cartons"
    ],
    "image": "/images/products/cloves.webp",
    "gallery": [
      "/images/products/cloves.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "cinnamon",
    "name": "Cinnamon",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Cinnamomum verum",
    "hsCode": "0906.11",
    "origin": "Kerala, Karnataka",
    "forms": [
      "Quills / sticks",
      "Broken pieces"
    ],
    "grades": [
      "Premium Quills (Cochin)",
      "Broken Cinnamon Bark"
    ],
    "description": "Cinnamon bark quills and broken pieces with a sweet, warm aroma, supplied whole or cut for retail packs, bakery and blends.",
    "specifications": {
      "Moisture": "Max 12.0%",
      "Volatile Oil": "Min 1.0% v/w",
      "Quill Diameter": "6mm - 15mm (depending on grade)",
      "Broken Quills": "Max 5.0%",
      "Foreign Matter": "Max 0.5%"
    },
    "shelfLife": "24 months",
    "packaging": [
      "20kg/25kg Cartons",
      "Custom consumer boxes"
    ],
    "image": "/images/products/cinnamon.webp",
    "gallery": [
      "/images/products/cinnamon.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "cassia",
    "name": "Cassia",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Cinnamomum cassia",
    "hsCode": "0906.19",
    "forms": [
      "Whole bark",
      "Broken pieces"
    ],
    "description": "Thick cassia bark with a stronger, more pungent flavour than true cinnamon — the bark most buyers use in curry blends and food manufacturing.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/products/cassia.webp",
    "gallery": [
      "/images/products/cassia.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "star-anise",
    "name": "Star Anise",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Illicium verum",
    "hsCode": "0909.61",
    "origin": "Northeast India",
    "forms": [
      "Whole stars",
      "Broken"
    ],
    "grades": [
      "Premium Hand-selected Whole (Sortex)",
      "Standard Export Grade"
    ],
    "description": "Whole star anise with eight-pointed pods and a liquorice aroma, used in biryani masala, Asian cooking and beverages.",
    "specifications": {
      "Moisture": "Max 10.0%",
      "Volatile Oil": "Min 2.5% v/w",
      "Broken/Fragments": "Max 5.0% by weight",
      "Seedless Pods": "Max 2.0% by weight",
      "Foreign Matter": "Max 0.5%"
    },
    "shelfLife": "24 months",
    "packaging": [
      "15kg Cartons with inner lining"
    ],
    "image": "/images/products/star-anise.webp",
    "gallery": [
      "/images/products/star-anise.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "bay-leaves",
    "name": "Bay Leaves (Tejpatta)",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Cinnamomum tamala",
    "hsCode": "0910.99",
    "origin": "Uttarakhand, Northeast India",
    "forms": [
      "Whole dried leaves",
      "Crushed"
    ],
    "grades": [
      "Premium Whole Green",
      "Standard Export Grade"
    ],
    "description": "Indian bay leaves (tejpatta) with a clove-cinnamon aroma — the leaf used in Indian rice and curry cooking, supplied whole or crushed.",
    "specifications": {
      "Moisture": "Max 10.0%",
      "Volatile Oil": "Min 1.0% v/w",
      "Color": "Light Green to Olive Green",
      "Broken Leaves": "Max 5.0% by weight",
      "Foreign Matter": "Max 0.5%"
    },
    "shelfLife": "12 months",
    "packaging": [
      "10kg/15kg pressed bales",
      "5kg Cartons"
    ],
    "image": "/images/products/bay-leaves.webp",
    "gallery": [
      "/images/products/bay-leaves.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "nutmeg",
    "name": "Nutmeg",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Myristica fragrans",
    "hsCode": "0908.11",
    "origin": "Kerala",
    "forms": [
      "Whole kernels (shelled)",
      "In-shell"
    ],
    "grades": [
      "ABCD (60/65 count per lb)",
      "Shrivelled"
    ],
    "description": "Kerala nutmeg graded by count per pound, supplied shelled or in shell for grinding, bakery and spice blends.",
    "specifications": {
      "Moisture": "Max 10.0%",
      "Volatile Oil": "Min 6.0% v/w (Nutmeg) / Min 10.0% v/w (Mace)",
      "Aflatoxin": "Strictly negative (tested as per EU standards)",
      "Foreign Matter": "Max 0.5%",
      "Mouldy kernels": "Max 1.0%"
    },
    "shelfLife": "24 months",
    "packaging": [
      "25kg Jute Bags with inner barrier liner",
      "20kg Cartons"
    ],
    "image": "/images/products/nutmeg.webp",
    "gallery": [
      "/images/products/nutmeg.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "mace",
    "name": "Mace (Javitri)",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Myristica fragrans (aril)",
    "hsCode": "0908.21",
    "origin": "Kerala",
    "forms": [
      "Whole blades",
      "Broken"
    ],
    "grades": [
      "Whole blades (premium red)",
      "Broken"
    ],
    "description": "The red aril that wraps the nutmeg seed, dried to a bright orange-red blade with a delicate, warm aroma for masalas and bakery.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/products/mace.webp",
    "gallery": [
      "/images/products/mace.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "dry-ginger",
    "name": "Dry Ginger (Sonth)",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Zingiber officinale",
    "hsCode": "0910.11",
    "origin": "Kerala, Northeast India",
    "forms": [
      "Whole dried rhizomes",
      "Sliced"
    ],
    "description": "Peeled, sun-dried ginger rhizomes (Cochin and Calicut types) for grinding, tea blends and spice manufacturing.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/products/dried-ginger.webp",
    "gallery": [
      "/images/products/dried-ginger.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "turmeric-fingers",
    "name": "Turmeric Fingers (Polished)",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Curcuma longa",
    "hsCode": "0910.30",
    "origin": "Maharashtra (Sangli), Telangana (Nizamabad), Tamil Nadu (Erode)",
    "forms": [
      "Whole polished fingers",
      "Bulbs"
    ],
    "grades": [
      "Salem",
      "Erode",
      "Rajapuri",
      "Nizamabad"
    ],
    "description": "Boiled, sun-dried and polished turmeric fingers from Sangli, Nizamabad and Erode, graded by curcumin for grinding units and repackers.",
    "specifications": {
      "Moisture": "Max 10%",
      "Curcumin": "2.5% – 5% (grade dependent)",
      "Foreign matter": "Max 1%"
    },
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/products/turmeric-fingers.webp",
    "gallery": [
      "/images/products/turmeric-fingers.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "dried-red-chillies",
    "name": "Dried Red Chillies",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Capsicum annuum",
    "hsCode": "0904.21",
    "origin": "Andhra Pradesh, Telangana, Karnataka, Madhya Pradesh",
    "forms": [
      "With stem",
      "Stemless"
    ],
    "grades": [
      "Guntur S4 (Sannam)",
      "Teja S17 (High Heat)",
      "Byadgi (High Color, Low Heat)",
      "Kashmiri (Bright Red, Mild Heat)"
    ],
    "description": "Whole dried red chillies across pungency (SHU) and colour (ASTA) profiles, from Guntur, Khammam, Byadgi and Madhya Pradesh.",
    "specifications": {
      "Moisture": "Max 11.0%",
      "Pungency (SHU)": "15,000 - 90,000 SHU (depending on variety)",
      "Color Value (ASTA)": "80 - 140 ASTA",
      "Total Ash": "Max 8.0%",
      "Acid Insoluble Ash": "Max 1.25%",
      "Foreign Matter": "Max 1.0%"
    },
    "shelfLife": "12 months (refrigerated recommended for color retention)",
    "packaging": [
      "10kg/15kg/25kg Jute Bags",
      "25kg PP Bags",
      "Custom consumer cartons"
    ],
    "image": "/images/products/red-chilli.webp",
    "gallery": [
      "/images/products/red-chilli.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "byadgi-chilli",
    "name": "Byadgi Chilli",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Capsicum annuum (Byadgi type)",
    "hsCode": "0904.21",
    "origin": "Karnataka (Haveri)",
    "forms": [
      "With stem",
      "Stemless"
    ],
    "description": "Wrinkled, deep-red Byadgi chilli from Karnataka, prized for colour with low heat — used for colour in masalas and for oleoresin extraction.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/products/byadgi-chilli.webp",
    "gallery": [
      "/images/products/byadgi-chilli.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "guntur-chilli",
    "name": "Guntur Chilli (Sannam S4)",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Capsicum annuum (Guntur Sannam)",
    "hsCode": "0904.21",
    "origin": "Andhra Pradesh (Guntur)",
    "forms": [
      "With stem",
      "Stemless"
    ],
    "description": "The classic Guntur Sannam (S4) chilli — medium-hot with good red colour, India's highest-volume export chilli.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/scenes/chilli-drying-tarp.webp",
    "gallery": [
      "/images/scenes/chilli-drying-tarp.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "teja-chilli",
    "name": "Teja Chilli (S17)",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Capsicum annuum (Teja)",
    "hsCode": "0904.21",
    "origin": "Telangana (Khammam), Andhra Pradesh",
    "forms": [
      "With stem",
      "Stemless"
    ],
    "description": "Small, very pungent Teja (S17) chilli, chosen when heat matters — for hot sauces, chilli powders and capsaicin extraction.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "steamSterilized": true
  },
  {
    "slug": "resham-patti-chilli",
    "name": "Resham Patti Chilli",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Capsicum annuum (Resham Patti)",
    "hsCode": "0904.21",
    "origin": "Gujarat",
    "forms": [
      "Stemless",
      "With stem"
    ],
    "description": "Medium-hot Resham Patti chilli with thin skin and bright colour, popular in Gujarati cooking and for blended chilli powders.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "steamSterilized": true
  },
  {
    "slug": "kashmiri-chilli",
    "name": "Kashmiri Chilli",
    "category": "indian-spices",
    "subcategory": "whole-spices",
    "type": "bulk",
    "botanicalName": "Capsicum annuum (Kashmiri type)",
    "hsCode": "0904.21",
    "origin": "Jammu & Kashmir, Karnataka",
    "forms": [
      "With stem",
      "Stemless"
    ],
    "description": "Mild Kashmiri-type chilli valued for its bright red colour rather than heat — used in tandoori marinades, curries and colour-led blends.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "steamSterilized": true
  },
  {
    "slug": "turmeric-powder",
    "name": "Turmeric Powder",
    "category": "indian-spices",
    "subcategory": "spice-powders",
    "type": "bulk",
    "botanicalName": "Curcuma longa",
    "hsCode": "0910.30",
    "origin": "Maharashtra, Telangana, Tamil Nadu",
    "forms": [
      "Ground powder"
    ],
    "grades": [
      "Alleppey Finger",
      "Erode Finger",
      "Salem Finger",
      "Rajapore Finger",
      "Standard Ground Powder"
    ],
    "description": "Turmeric powder ground from selected fingers, with a bright golden colour; tested for curcumin, lead and adulterants.",
    "specifications": {
      "Moisture": "Max 10.0%",
      "Curcumin Content": "Min 3.0% (premium grades up to 5.5%)",
      "Total Ash": "Max 8.0%",
      "Acid Insoluble Ash": "Max 1.0%",
      "Lead (Pb)": "Max 2.5 ppm",
      "Starch/Foreign Matter": "Nil (100% Pure)"
    },
    "shelfLife": "24 months",
    "packaging": [
      "25kg PP Bags",
      "50kg Jute Bags",
      "Custom consumer packaging (500g, 1kg, 5kg)"
    ],
    "image": "/images/products/turmeric.webp",
    "gallery": [
      "/images/products/turmeric.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "cumin-powder",
    "name": "Cumin Powder",
    "category": "indian-spices",
    "subcategory": "spice-powders",
    "type": "bulk",
    "botanicalName": "Cuminum cyminum",
    "hsCode": "0909.32",
    "origin": "Gujarat, Rajasthan",
    "forms": [
      "Ground powder"
    ],
    "description": "Cumin ground from cleaned seeds to a uniform mesh, for seasoning manufacturers, food service and retail packs.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "steamSterilized": true
  },
  {
    "slug": "coriander-powder",
    "name": "Coriander Powder",
    "category": "indian-spices",
    "subcategory": "spice-powders",
    "type": "bulk",
    "botanicalName": "Coriandrum sativum",
    "hsCode": "0909.22",
    "origin": "Rajasthan, Madhya Pradesh",
    "forms": [
      "Ground powder"
    ],
    "description": "Coriander powder milled from cleaned seeds for curry blends, sauces and retail packing.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/products/coriander-powder.webp",
    "gallery": [
      "/images/products/coriander-powder.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "red-chilli-powder",
    "name": "Red Chilli Powder",
    "category": "indian-spices",
    "subcategory": "spice-powders",
    "type": "bulk",
    "botanicalName": "Capsicum annuum",
    "hsCode": "0904.22",
    "origin": "Andhra Pradesh, Telangana, Karnataka",
    "forms": [
      "Ground powder"
    ],
    "grades": [
      "Hot Chilli Powder",
      "Medium Hot Chilli Powder",
      "Bright Red Mild Chilli (Kashmiri Type)"
    ],
    "description": "Red chilli powder blended to the buyer's heat (SHU) and colour (ASTA) target, tested for aflatoxin and Sudan dyes.",
    "specifications": {
      "Moisture": "Max 10.0%",
      "Pungency": "20,000 - 80,000 SHU (customized)",
      "ASTA Color": "80 - 130 ASTA (customized)",
      "Acid Insoluble Ash": "Max 1.25%",
      "Aflatoxin / Ochratoxin": "Below detection limit / FDA compliant",
      "Sudan Dye (1,2,3,4)": "Strictly Negative"
    },
    "shelfLife": "12 months",
    "packaging": [
      "25kg PP Bags with barrier lining",
      "Custom consumer packs"
    ],
    "image": "/images/products/chilli-powder.webp",
    "gallery": [
      "/images/products/chilli-powder.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "black-pepper-powder",
    "name": "Black Pepper Powder",
    "category": "indian-spices",
    "subcategory": "spice-powders",
    "type": "bulk",
    "botanicalName": "Piper nigrum",
    "hsCode": "0904.12",
    "origin": "Kerala, Karnataka",
    "forms": [
      "Ground powder",
      "Coarse cracked"
    ],
    "description": "Ground black pepper in fine or coarse mesh for seasoning, meat processing, food service and retail.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/products/black-pepper-powder.webp",
    "gallery": [
      "/images/products/black-pepper-powder.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "dry-ginger-powder",
    "name": "Dry Ginger Powder",
    "category": "indian-spices",
    "subcategory": "spice-powders",
    "type": "bulk",
    "botanicalName": "Zingiber officinale",
    "hsCode": "0910.12",
    "origin": "Kerala, Northeast India",
    "forms": [
      "Ground powder"
    ],
    "grades": [
      "Cochin Ginger (Unbleached)",
      "Calicut Ginger",
      "Finely Ground Ginger Powder"
    ],
    "description": "Fine powder milled from dried ginger, with a sharp, pungent flavour for bakery, beverages and spice blends.",
    "specifications": {
      "Moisture": "Max 10.0%",
      "Volatile Oil": "Min 1.5% v/w",
      "Total Ash": "Max 7.0%",
      "Water Soluble Extract": "Min 10.0%",
      "Cold Water Soluble Extract": "Min 12.0%",
      "Starch": "Max 60%"
    },
    "shelfLife": "24 months",
    "packaging": [
      "25kg PP Bags",
      "50kg Jute Bags",
      "Custom consumer pouches"
    ],
    "image": "/images/products/dry-ginger-powder.webp",
    "gallery": [
      "/images/products/dry-ginger-powder.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "fenugreek-powder",
    "name": "Fenugreek Powder",
    "category": "indian-spices",
    "subcategory": "spice-powders",
    "type": "bulk",
    "botanicalName": "Trigonella foenum-graecum",
    "hsCode": "0910.99",
    "origin": "Rajasthan, Madhya Pradesh",
    "forms": [
      "Ground powder"
    ],
    "description": "Fenugreek seed powder for curry powders, seasoning blends and food manufacturing.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "steamSterilized": true
  },
  {
    "slug": "fennel-powder",
    "name": "Fennel Powder",
    "category": "indian-spices",
    "subcategory": "spice-powders",
    "type": "bulk",
    "botanicalName": "Foeniculum vulgare",
    "hsCode": "0909.62",
    "origin": "Gujarat, Rajasthan",
    "forms": [
      "Ground powder"
    ],
    "description": "Fennel seed powder with a sweet, anise-like flavour for spice blends, bakery and confectionery.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "steamSterilized": true
  },
  {
    "slug": "mustard-powder",
    "name": "Mustard Powder",
    "category": "indian-spices",
    "subcategory": "spice-powders",
    "type": "bulk",
    "botanicalName": "Brassica spp.",
    "hsCode": "2103.30",
    "origin": "Rajasthan, Haryana",
    "forms": [
      "Ground powder"
    ],
    "description": "Ground mustard seed for prepared mustard, pickles, sauces and seasoning blends.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "steamSterilized": true
  },
  {
    "slug": "garam-masala",
    "name": "Garam Masala",
    "category": "indian-spices",
    "subcategory": "blended-spices-masalas",
    "type": "bulk",
    "botanicalName": "Spice blend",
    "hsCode": "0910.91",
    "origin": "Blended in India",
    "forms": [
      "Ground powder",
      "Whole mix"
    ],
    "grades": [
      "Standard Indian Blend",
      "Premium Export Quality",
      "Custom Formula"
    ],
    "description": "North Indian warm-spice blend of cumin, coriander, cardamom, cloves, cinnamon and pepper, made to standard or buyer-specific recipes.",
    "specifications": {
      "Moisture": "Max 8.0%",
      "Acid Insoluble Ash": "Max 1.5%",
      "Lead (Pb)": "Max 2.0 ppm",
      "Salmonella": "Absent in 25g",
      "E. coli": "Absent"
    },
    "shelfLife": "18 months",
    "packaging": [
      "25kg Paper Bags",
      "1kg/5kg Institutional packs",
      "Custom consumer boxes"
    ],
    "image": "/images/products/garam-masala.webp",
    "gallery": [
      "/images/products/garam-masala.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "kitchen-king-masala",
    "name": "Kitchen King Masala",
    "category": "indian-spices",
    "subcategory": "blended-spices-masalas",
    "type": "bulk",
    "botanicalName": "Spice blend",
    "hsCode": "0910.91",
    "origin": "Blended in India",
    "forms": [
      "Ground powder"
    ],
    "description": "An all-purpose vegetable and curry masala, supplied in bulk or retail packs to standard or private-label recipes.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "steamSterilized": true
  },
  {
    "slug": "biryani-masala",
    "name": "Biryani Masala",
    "category": "indian-spices",
    "subcategory": "blended-spices-masalas",
    "type": "bulk",
    "botanicalName": "Spice blend",
    "hsCode": "0910.91",
    "origin": "Blended in India",
    "forms": [
      "Ground powder"
    ],
    "grades": [
      "Standard",
      "Custom recipe"
    ],
    "description": "Aromatic blend for biryani and pulao with whole-spice notes of mace, star anise and cardamom.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "steamSterilized": true
  },
  {
    "slug": "chaat-masala",
    "name": "Chaat Masala",
    "category": "indian-spices",
    "subcategory": "blended-spices-masalas",
    "type": "bulk",
    "botanicalName": "Spice blend",
    "hsCode": "0910.91",
    "origin": "Blended in India",
    "forms": [
      "Ground powder"
    ],
    "grades": [
      "Standard",
      "Custom recipe"
    ],
    "description": "Tangy blend of dry mango (amchur), black salt, cumin and mint used on fruit, snacks and street food.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/products/chaat-masala.webp",
    "gallery": [
      "/images/products/chaat-masala.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "tea-masala",
    "name": "Tea Masala",
    "category": "indian-spices",
    "subcategory": "blended-spices-masalas",
    "type": "bulk",
    "botanicalName": "Spice blend",
    "hsCode": "0910.91",
    "origin": "Blended in India",
    "forms": [
      "Ground powder"
    ],
    "description": "Ginger, cardamom, cinnamon, clove and pepper blend for masala chai, for tea packers and food service.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "steamSterilized": true
  },
  {
    "slug": "curry-powder",
    "name": "Curry Powder",
    "category": "indian-spices",
    "subcategory": "blended-spices-masalas",
    "type": "bulk",
    "botanicalName": "Spice blend",
    "hsCode": "0910.91",
    "origin": "Blended in India",
    "forms": [
      "Ground powder"
    ],
    "grades": [
      "Madras Mild Curry",
      "Madras Hot Curry",
      "European Standard Blend"
    ],
    "description": "Madras-style curry powder in mild and hot versions, or blended to European and Caribbean buyer recipes.",
    "specifications": {
      "Moisture": "Max 9.0%",
      "Turmeric Content": "Approx 20-25%",
      "Acid Insoluble Ash": "Max 1.5%",
      "Aflatoxin": "EU Compliant (< 10 ppb)",
      "Yeasts & Molds": "Max 100 cfu/g"
    },
    "shelfLife": "18 months",
    "packaging": [
      "25kg PP Bags with inner barrier",
      "Custom retail tins and pouches"
    ],
    "image": "/images/products/curry-powder.webp",
    "gallery": [
      "/images/products/curry-powder.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "pav-bhaji-masala",
    "name": "Pav Bhaji Masala",
    "category": "indian-spices",
    "subcategory": "blended-spices-masalas",
    "type": "bulk",
    "botanicalName": "Spice blend",
    "hsCode": "0910.91",
    "origin": "Blended in India",
    "forms": [
      "Ground powder"
    ],
    "description": "Mumbai street-food blend for pav bhaji, supplied in bulk or retail packs.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "steamSterilized": true
  },
  {
    "slug": "chole-masala",
    "name": "Chole Masala",
    "category": "indian-spices",
    "subcategory": "blended-spices-masalas",
    "type": "bulk",
    "botanicalName": "Spice blend",
    "hsCode": "0910.91",
    "origin": "Blended in India",
    "forms": [
      "Ground powder"
    ],
    "description": "Dark, tangy blend for chickpea curries (chole / chana masala), made to standard or private-label recipes.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "steamSterilized": true
  },
  {
    "slug": "red-chilli-flakes",
    "name": "Red Chilli Flakes",
    "category": "indian-spices",
    "subcategory": "flakes-cut-spices",
    "type": "bulk",
    "botanicalName": "Capsicum annuum",
    "hsCode": "0904.22",
    "origin": "Andhra Pradesh, Karnataka",
    "forms": [
      "Flakes",
      "Coarse crushed"
    ],
    "description": "Red chilli flakes (crushed chilli), with or without seeds, from fine flakes to coarse crush — for pizza, seasoning blends, sauces, snacks and meat processing.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/products/red-chilli-flakes.webp",
    "gallery": [
      "/images/products/red-chilli-flakes.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "cut-turmeric",
    "name": "Cut Turmeric",
    "category": "indian-spices",
    "subcategory": "flakes-cut-spices",
    "type": "bulk",
    "botanicalName": "Curcuma longa",
    "hsCode": "0910.30",
    "origin": "Maharashtra, Telangana, Tamil Nadu",
    "forms": [
      "Cut / sliced pieces"
    ],
    "description": "Dried turmeric cut into pieces or slices for tea blends, extraction and grinding.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/products/cut-turmeric.webp",
    "gallery": [
      "/images/products/cut-turmeric.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "cut-ginger",
    "name": "Cut Ginger",
    "category": "indian-spices",
    "subcategory": "flakes-cut-spices",
    "type": "bulk",
    "botanicalName": "Zingiber officinale",
    "hsCode": "0910.11",
    "origin": "Kerala, Northeast India",
    "forms": [
      "Cut / sliced pieces"
    ],
    "description": "Dried ginger cut into pieces or tea-bag cut for herbal teas, extraction and grinding.",
    "packaging": [
      "25 kg PP or multi-wall paper bags with inner liner",
      "10–20 kg cartons",
      "Retail and private-label packs (50 g – 1 kg)"
    ],
    "image": "/images/products/cut-ginger.webp",
    "gallery": [
      "/images/products/cut-ginger.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "ashwagandha-root",
    "name": "Ashwagandha Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Withania somnifera",
    "hsCode": "1211.90",
    "origin": "Madhya Pradesh (Neemuch, Mandsaur), Rajasthan",
    "forms": [
      "Whole roots",
      "Cut roots",
      "Powder"
    ],
    "description": "Dried ashwagandha roots from the Neemuch–Mandsaur belt, supplied whole, cut or powdered for herbal and nutraceutical manufacturers.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/ashwagandha.webp",
    "gallery": [
      "/images/products/ashwagandha.webp"
    ]
  },
  {
    "slug": "shatavari-root",
    "name": "Shatavari Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Asparagus racemosus",
    "hsCode": "1211.90",
    "origin": "Madhya Pradesh, Chhattisgarh",
    "forms": [
      "Dried roots",
      "Powder"
    ],
    "description": "Dried shatavari root pieces and powder, used in traditional Ayurvedic formulations and herbal supplements.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "safed-musli",
    "name": "Safed Musli",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Chlorophytum borivilianum",
    "hsCode": "1211.90",
    "origin": "Madhya Pradesh, Maharashtra",
    "forms": [
      "Dried peeled roots",
      "Powder"
    ],
    "description": "Peeled and dried safed musli root tubers, graded by colour and thickness, for herbal manufacturers.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/safed-musli.webp",
    "gallery": [
      "/images/products/safed-musli.webp"
    ]
  },
  {
    "slug": "licorice-root",
    "name": "Licorice Root (Mulethi)",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Glycyrrhiza glabra",
    "hsCode": "1211.90",
    "forms": [
      "Root sticks",
      "Cut",
      "Powder"
    ],
    "description": "Sweet licorice root sticks, cut pieces and powder for herbal teas, confectionery and botanical extraction.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/licorice-root.webp",
    "gallery": [
      "/images/products/licorice-root.webp"
    ]
  },
  {
    "slug": "sarpagandha-root",
    "name": "Sarpagandha Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Rauvolfia serpentina",
    "hsCode": "1211.90",
    "forms": [
      "Dried roots"
    ],
    "description": "Dried sarpagandha roots for pharmaceutical and Ayurvedic use, supplied only from legally documented cultivated sources.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "regulated": true
  },
  {
    "slug": "kuth-root",
    "name": "Kuth Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Saussurea costus",
    "hsCode": "1211.90",
    "forms": [
      "Dried roots"
    ],
    "description": "Aromatic kuth (costus) root used in traditional medicine and perfumery — a CITES-listed species, supplied only with the required permits.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/kuth-root.webp",
    "gallery": [
      "/images/products/kuth-root.webp"
    ],
    "regulated": true
  },
  {
    "slug": "sariva",
    "name": "Sariva (Indian Sarsaparilla)",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Hemidesmus indicus",
    "hsCode": "1211.90",
    "forms": [
      "Dried roots"
    ],
    "description": "Slender, vanilla-scented roots of Indian sarsaparilla, used in Ayurvedic formulations and herbal beverages.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/sariva.webp",
    "gallery": [
      "/images/products/sariva.webp"
    ]
  },
  {
    "slug": "manjistha-root",
    "name": "Manjistha Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Rubia cordifolia",
    "hsCode": "1211.90",
    "forms": [
      "Dried roots / stems",
      "Powder"
    ],
    "description": "Red-coloured manjistha roots and stems, used in Ayurvedic formulations and as a natural dye.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "akarkara-root",
    "name": "Akarkara Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Anacyclus pyrethrum",
    "hsCode": "1211.90",
    "forms": [
      "Dried roots"
    ],
    "description": "Pellitory root with a tingling, pungent taste, used in traditional formulations and oral-care products.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "ipecac-root",
    "name": "Ipecac Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Carapichea ipecacuanha",
    "hsCode": "1211.90",
    "forms": [
      "Dried roots"
    ],
    "description": "Dried ipecac roots for pharmaceutical extraction, supplied against buyer specification.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "pushkarmool",
    "name": "Pushkarmool",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Inula racemosa",
    "hsCode": "1211.90",
    "origin": "Himalayan region",
    "forms": [
      "Dried roots"
    ],
    "description": "Aromatic dried roots of Inula racemosa, used in Ayurvedic formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "chitrak-root",
    "name": "Chitrak Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Plumbago zeylanica",
    "hsCode": "1211.90",
    "forms": [
      "Dried roots"
    ],
    "description": "Dried chitrak (white leadwort) roots for Ayurvedic and herbal manufacturers.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "kutja-root",
    "name": "Kutja Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Holarrhena pubescens",
    "hsCode": "1211.90",
    "forms": [
      "Dried roots / bark"
    ],
    "description": "Kutja root and bark, used in traditional Ayurvedic formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "nishoth-root",
    "name": "Nishoth Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Operculina turpethum",
    "hsCode": "1211.90",
    "forms": [
      "Dried roots"
    ],
    "description": "Dried nishoth (turpeth) roots for Ayurvedic and herbal manufacturers.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "kutki-root",
    "name": "Kutki Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Picrorhiza kurroa",
    "hsCode": "1211.90",
    "origin": "Himalayan region",
    "forms": [
      "Dried roots / rhizomes"
    ],
    "description": "Bitter kutki rhizomes used in Ayurveda — a restricted Himalayan species, supplied only from documented cultivated sources where export is permitted.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "regulated": true
  },
  {
    "slug": "tagar-root",
    "name": "Tagar Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Valeriana jatamansi",
    "hsCode": "1211.90",
    "origin": "Himalayan region",
    "forms": [
      "Dried roots"
    ],
    "description": "Aromatic Indian valerian (tagar) roots for herbal formulations and extraction.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "jatamansi-root",
    "name": "Jatamansi Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Nardostachys jatamansi",
    "hsCode": "1211.90",
    "origin": "Himalayan region",
    "forms": [
      "Dried rhizomes"
    ],
    "description": "Spikenard (jatamansi) rhizomes used in aromatherapy and Ayurveda — a CITES-listed species, supplied only with the required permits.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "regulated": true
  },
  {
    "slug": "pilizari-root",
    "name": "Pilizari Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "hsCode": "1211.90",
    "forms": [
      "Dried roots"
    ],
    "description": "Pilizari root for traditional Unani and Ayurvedic formulations; botanical identity and grade confirmed per lot.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "chobchini-root",
    "name": "Chobchini Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Smilax china",
    "hsCode": "1211.90",
    "forms": [
      "Dried roots / rhizomes"
    ],
    "description": "China root (chobchini) rhizome pieces used in Unani and Ayurvedic formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "pakhanved-root",
    "name": "Pakhanved Root",
    "category": "herbs-botanicals",
    "subcategory": "roots-root-products",
    "type": "bulk",
    "botanicalName": "Bergenia ciliata",
    "hsCode": "1211.90",
    "origin": "Himalayan region",
    "forms": [
      "Dried rhizomes"
    ],
    "description": "Pashanbhed (pakhanved) rhizomes from the Himalayan region, used in traditional formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "vacha",
    "name": "Vacha (Sweet Flag)",
    "category": "herbs-botanicals",
    "subcategory": "rhizomes",
    "type": "bulk",
    "botanicalName": "Acorus calamus",
    "hsCode": "1211.90",
    "forms": [
      "Dried rhizomes",
      "Powder"
    ],
    "description": "Aromatic dried rhizomes of sweet flag (vacha), used in Ayurveda and for aromatic extraction.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/vacha.webp",
    "gallery": [
      "/images/products/vacha.webp"
    ]
  },
  {
    "slug": "zedoary",
    "name": "Zedoary (Kachura)",
    "category": "herbs-botanicals",
    "subcategory": "rhizomes",
    "type": "bulk",
    "botanicalName": "Curcuma zedoaria",
    "hsCode": "1211.90",
    "forms": [
      "Dried slices",
      "Powder"
    ],
    "description": "Dried, sliced zedoary (white turmeric) rhizome with a camphor-ginger aroma, used in herbal and aromatic products.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "kapoor-kachri",
    "name": "Kapoor Kachri",
    "category": "herbs-botanicals",
    "subcategory": "rhizomes",
    "type": "bulk",
    "botanicalName": "Hedychium spicatum",
    "hsCode": "1211.90",
    "origin": "Himalayan region",
    "forms": [
      "Dried rhizome slices",
      "Powder"
    ],
    "description": "Fragrant dried rhizome slices of spiked ginger lily, used in herbal hair-care and aromatic formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "kulanjan",
    "name": "Kulanjan (Greater Galangal)",
    "category": "herbs-botanicals",
    "subcategory": "rhizomes",
    "type": "bulk",
    "botanicalName": "Alpinia galanga",
    "hsCode": "1211.90",
    "forms": [
      "Dried rhizomes",
      "Slices"
    ],
    "description": "Dried greater galangal rhizomes with a sharp, ginger-pine aroma for herbal formulations, teas and seasoning.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/kulanjan.webp",
    "gallery": [
      "/images/products/kulanjan.webp"
    ]
  },
  {
    "slug": "musta-nagarmotha",
    "name": "Musta (Nagarmotha)",
    "category": "herbs-botanicals",
    "subcategory": "rhizomes",
    "type": "bulk",
    "botanicalName": "Cyperus rotundus / Cyperus scariosus",
    "hsCode": "1211.90",
    "forms": [
      "Dried tubers",
      "Powder"
    ],
    "description": "Fragrant nut-grass tubers (musta / nagarmotha) used in Ayurveda, incense and perfumery.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "arjuna-bark",
    "name": "Arjuna Bark",
    "category": "herbs-botanicals",
    "subcategory": "barks-woods",
    "type": "bulk",
    "botanicalName": "Terminalia arjuna",
    "hsCode": "1211.90",
    "origin": "Madhya Pradesh, Chhattisgarh",
    "forms": [
      "Bark pieces",
      "Powder"
    ],
    "description": "Dried arjuna tree bark, cut or powdered, for Ayurvedic and herbal supplement manufacturers.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "ashoka-bark",
    "name": "Ashoka Bark",
    "category": "herbs-botanicals",
    "subcategory": "barks-woods",
    "type": "bulk",
    "botanicalName": "Saraca asoca",
    "hsCode": "1211.90",
    "forms": [
      "Bark pieces",
      "Powder"
    ],
    "description": "Dried ashoka bark for Ayurvedic formulations, identity-checked against common substitutes.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "daruharidra-stem",
    "name": "Daruharidra Stem",
    "category": "herbs-botanicals",
    "subcategory": "barks-woods",
    "type": "bulk",
    "botanicalName": "Berberis aristata",
    "hsCode": "1211.90",
    "origin": "Himalayan region",
    "forms": [
      "Stem / wood pieces"
    ],
    "description": "Yellow-wooded daruharidra (Indian barberry) stems used in Ayurveda and as a natural colourant.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "lodhra-bark",
    "name": "Lodhra Bark",
    "category": "herbs-botanicals",
    "subcategory": "barks-woods",
    "type": "bulk",
    "botanicalName": "Symplocos racemosa",
    "hsCode": "1211.90",
    "forms": [
      "Bark pieces",
      "Powder"
    ],
    "description": "Dried lodhra bark used in Ayurvedic formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "gambhari-bark",
    "name": "Gambhari Bark",
    "category": "herbs-botanicals",
    "subcategory": "barks-woods",
    "type": "bulk",
    "botanicalName": "Gmelina arborea",
    "hsCode": "1211.90",
    "forms": [
      "Bark pieces"
    ],
    "description": "Gambhari bark, one of the Dashamoola group used in traditional Ayurvedic formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "neem-bark",
    "name": "Neem Bark",
    "category": "herbs-botanicals",
    "subcategory": "barks-woods",
    "type": "bulk",
    "botanicalName": "Azadirachta indica",
    "hsCode": "1211.90",
    "forms": [
      "Bark pieces",
      "Powder"
    ],
    "description": "Dried neem bark, cut or powdered, for herbal and oral-care products.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "acacia-catechu",
    "name": "Acacia Catechu (Kattha)",
    "category": "herbs-botanicals",
    "subcategory": "barks-woods",
    "type": "bulk",
    "botanicalName": "Senegalia catechu",
    "forms": [
      "Heartwood extract",
      "Bark"
    ],
    "description": "Catechu (kattha) from the heartwood of Senegalia catechu, used in paan, tanning, dyeing and traditional formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/acacia-catechu.webp",
    "gallery": [
      "/images/products/acacia-catechu.webp"
    ]
  },
  {
    "slug": "devdaru",
    "name": "Devdaru (Deodar)",
    "category": "herbs-botanicals",
    "subcategory": "barks-woods",
    "type": "bulk",
    "botanicalName": "Cedrus deodara",
    "origin": "Himalayan region",
    "forms": [
      "Wood chips",
      "Powder"
    ],
    "description": "Aromatic deodar cedar wood chips and powder for herbal, incense and aromatic products, supplied in permitted forms.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "regulated": true
  },
  {
    "slug": "tulsi-leaves",
    "name": "Tulsi Leaves (Holy Basil)",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Ocimum tenuiflorum",
    "hsCode": "1211.90",
    "origin": "Uttar Pradesh, Madhya Pradesh",
    "forms": [
      "Dried leaves",
      "Tea-bag cut",
      "Powder"
    ],
    "description": "Dried holy basil leaves, whole, tea-bag cut or powdered, for herbal teas and wellness products.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "neem-leaves",
    "name": "Neem Leaves",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Azadirachta indica",
    "hsCode": "1211.90",
    "forms": [
      "Dried leaves",
      "Powder"
    ],
    "description": "Shade-dried neem leaves and leaf powder for herbal, cosmetic, oral-care and agricultural uses.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "gudmar-leaves",
    "name": "Gudmar Leaves",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Gymnema sylvestre",
    "hsCode": "1211.90",
    "forms": [
      "Dried leaves",
      "Powder"
    ],
    "description": "Dried gymnema (gudmar) leaves and powder for herbal supplement and tea manufacturers.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "brahmi",
    "name": "Brahmi",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Bacopa monnieri",
    "hsCode": "1211.90",
    "forms": [
      "Dried herb",
      "Powder"
    ],
    "description": "Dried whole brahmi herb and powder for Ayurvedic and nutraceutical manufacturers.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "bhringraj",
    "name": "Bhringraj",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Eclipta prostrata",
    "hsCode": "1211.90",
    "forms": [
      "Dried herb",
      "Powder"
    ],
    "description": "Dried bhringraj herb and powder, widely used in herbal hair oils and Ayurvedic formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "vasa-adusa",
    "name": "Vasa (Adusa)",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Justicia adhatoda",
    "hsCode": "1211.90",
    "forms": [
      "Dried leaves",
      "Powder"
    ],
    "description": "Dried vasa (Malabar nut) leaves used in Ayurvedic syrups and herbal formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "nirgundi",
    "name": "Nirgundi",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Vitex negundo",
    "hsCode": "1211.90",
    "forms": [
      "Dried leaves",
      "Powder"
    ],
    "description": "Dried nirgundi leaves for herbal oils and Ayurvedic formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "kalmegh",
    "name": "Kalmegh",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Andrographis paniculata",
    "hsCode": "1211.90",
    "forms": [
      "Dried herb",
      "Powder"
    ],
    "description": "Dried kalmegh (green chiretta) herb and powder for herbal and nutraceutical manufacturers.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "chirata",
    "name": "Chirata",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Swertia chirayita",
    "hsCode": "1211.90",
    "origin": "Himalayan region",
    "forms": [
      "Dried herb"
    ],
    "description": "Bitter Himalayan chirata herb used in Ayurveda — a restricted species, supplied only from documented cultivated sources where export is permitted.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "regulated": true
  },
  {
    "slug": "shankhpushpi",
    "name": "Shankhpushpi",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Convolvulus prostratus",
    "hsCode": "1211.90",
    "forms": [
      "Dried herb",
      "Powder"
    ],
    "description": "Dried shankhpushpi herb and powder for Ayurvedic syrups and herbal formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "punarnava",
    "name": "Punarnava",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Boerhavia diffusa",
    "hsCode": "1211.90",
    "forms": [
      "Dried herb / roots",
      "Powder"
    ],
    "description": "Dried punarnava herb and roots for Ayurvedic and herbal manufacturers.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "giloy",
    "name": "Giloy (Guduchi)",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Tinospora cordifolia",
    "hsCode": "1211.90",
    "forms": [
      "Dried stems",
      "Powder"
    ],
    "description": "Dried giloy (guduchi) stem pieces and powder for Ayurvedic and herbal supplement makers.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "moringa-leaves",
    "name": "Moringa Leaves",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Moringa oleifera",
    "hsCode": "1211.90",
    "origin": "Tamil Nadu, Andhra Pradesh",
    "forms": [
      "Dried leaves",
      "Tea-bag cut"
    ],
    "description": "Shade-dried moringa leaves, whole or tea-bag cut, for herbal teas and further milling.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/moringa-leaves.webp",
    "gallery": [
      "/images/products/moringa-leaves.webp"
    ]
  },
  {
    "slug": "spearmint",
    "name": "Spearmint",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Mentha spicata",
    "hsCode": "1211.90",
    "forms": [
      "Dried leaves",
      "Tea-bag cut"
    ],
    "description": "Dried spearmint leaves for herbal teas, seasoning and confectionery.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "peppermint",
    "name": "Peppermint",
    "category": "herbs-botanicals",
    "subcategory": "leaves-leaf-products",
    "type": "bulk",
    "botanicalName": "Mentha × piperita",
    "hsCode": "1211.90",
    "forms": [
      "Dried leaves",
      "Tea-bag cut"
    ],
    "description": "Dried peppermint leaves with a strong menthol note for herbal teas and flavouring.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "amla",
    "name": "Amla (Indian Gooseberry)",
    "category": "herbs-botanicals",
    "subcategory": "fruits-fruit-products",
    "type": "bulk",
    "botanicalName": "Phyllanthus emblica",
    "origin": "Uttar Pradesh (Pratapgarh), Rajasthan",
    "forms": [
      "Dried pieces",
      "Powder"
    ],
    "description": "Dried amla pieces and powder — the main ingredient of triphala and many Ayurvedic and hair-care products.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/amla.webp",
    "gallery": [
      "/images/products/amla.webp"
    ]
  },
  {
    "slug": "haritaki",
    "name": "Haritaki",
    "category": "herbs-botanicals",
    "subcategory": "fruits-fruit-products",
    "type": "bulk",
    "botanicalName": "Terminalia chebula",
    "origin": "Madhya Pradesh, Maharashtra",
    "forms": [
      "Whole dried fruit",
      "Powder"
    ],
    "description": "Dried haritaki (chebulic myrobalan) fruits and powder for Ayurvedic formulations and natural tanning.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/haritaki.webp",
    "gallery": [
      "/images/products/haritaki.webp"
    ]
  },
  {
    "slug": "bibhitaki",
    "name": "Bibhitaki (Baheda)",
    "category": "herbs-botanicals",
    "subcategory": "fruits-fruit-products",
    "type": "bulk",
    "botanicalName": "Terminalia bellirica",
    "forms": [
      "Whole dried fruit",
      "Powder"
    ],
    "description": "Dried bibhitaki (belleric myrobalan) fruits and powder, one of the three fruits of triphala.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/bibhitaki.webp",
    "gallery": [
      "/images/products/bibhitaki.webp"
    ]
  },
  {
    "slug": "bael",
    "name": "Bael Fruit",
    "category": "herbs-botanicals",
    "subcategory": "fruits-fruit-products",
    "type": "bulk",
    "botanicalName": "Aegle marmelos",
    "origin": "Uttar Pradesh, Madhya Pradesh",
    "forms": [
      "Dried slices",
      "Powder"
    ],
    "description": "Sun-dried bael fruit slices and powder for herbal beverages and Ayurvedic formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/bael.webp",
    "gallery": [
      "/images/products/bael.webp"
    ]
  },
  {
    "slug": "kokum",
    "name": "Kokum",
    "category": "herbs-botanicals",
    "subcategory": "fruits-fruit-products",
    "type": "bulk",
    "botanicalName": "Garcinia indica",
    "origin": "Konkan coast (Maharashtra, Goa)",
    "forms": [
      "Dried rind"
    ],
    "description": "Sun-dried kokum rind from the Konkan coast, used as a souring agent in coastal cooking and for kokum beverages.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/kokum.webp",
    "gallery": [
      "/images/products/kokum.webp"
    ]
  },
  {
    "slug": "vidanga",
    "name": "Vidanga",
    "category": "herbs-botanicals",
    "subcategory": "fruits-fruit-products",
    "type": "bulk",
    "botanicalName": "Embelia ribes",
    "hsCode": "1211.90",
    "forms": [
      "Dried fruit"
    ],
    "description": "Small dried vidanga berries used in Ayurvedic formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/vidanga.webp",
    "gallery": [
      "/images/products/vidanga.webp"
    ]
  },
  {
    "slug": "gokhru",
    "name": "Gokhru",
    "category": "herbs-botanicals",
    "subcategory": "fruits-fruit-products",
    "type": "bulk",
    "botanicalName": "Tribulus terrestris",
    "hsCode": "1211.90",
    "origin": "Rajasthan",
    "forms": [
      "Dried fruit",
      "Powder"
    ],
    "description": "Dried gokhru (Tribulus) fruits and powder for herbal and nutraceutical manufacturers.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "reetha-soapnut",
    "name": "Reetha (Soapnut)",
    "category": "herbs-botanicals",
    "subcategory": "fruits-fruit-products",
    "type": "bulk",
    "botanicalName": "Sapindus mukorossi",
    "hsCode": "1404.90",
    "forms": [
      "Whole dried fruit",
      "Deseeded shells",
      "Powder"
    ],
    "description": "Dried soapnut fruit — whole, deseeded or powdered — used as a natural cleanser in hair-care and eco-laundry products.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "black-himej",
    "name": "Black Himej (Bal Harad)",
    "category": "herbs-botanicals",
    "subcategory": "fruits-fruit-products",
    "type": "bulk",
    "botanicalName": "Terminalia chebula (immature fruit)",
    "forms": [
      "Whole dried fruit"
    ],
    "description": "Small, dark, immature haritaki fruits (bal harad) used in traditional formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/black-himej.webp",
    "gallery": [
      "/images/products/black-himej.webp"
    ]
  },
  {
    "slug": "garcinia-cambogia",
    "name": "Garcinia Cambogia",
    "category": "herbs-botanicals",
    "subcategory": "fruits-fruit-products",
    "type": "bulk",
    "botanicalName": "Garcinia gummi-gutta",
    "origin": "Kerala, Karnataka",
    "forms": [
      "Dried rind"
    ],
    "description": "Smoked and dried Malabar tamarind rind from Kerala and Karnataka, used in coastal cooking and as a raw material for extraction.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/garcinia-cambogia.webp",
    "gallery": [
      "/images/products/garcinia-cambogia.webp"
    ]
  },
  {
    "slug": "indrayan",
    "name": "Indrayan",
    "category": "herbs-botanicals",
    "subcategory": "fruits-fruit-products",
    "type": "bulk",
    "botanicalName": "Citrullus colocynthis",
    "hsCode": "1211.90",
    "origin": "Rajasthan, Gujarat",
    "forms": [
      "Dried fruit",
      "Pulp"
    ],
    "description": "Dried colocynth (indrayan) fruit and pulp for traditional formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "juniper-berry",
    "name": "Juniper Berry",
    "category": "herbs-botanicals",
    "subcategory": "fruits-fruit-products",
    "type": "bulk",
    "botanicalName": "Juniperus communis",
    "hsCode": "1211.90",
    "forms": [
      "Dried berries"
    ],
    "description": "Dried juniper berries for flavouring, herbal products and distillation.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "mucuna-seeds",
    "name": "Mucuna (Kaunch) Seeds",
    "category": "herbs-botanicals",
    "subcategory": "seeds-seed-products",
    "type": "bulk",
    "botanicalName": "Mucuna pruriens",
    "hsCode": "1211.90",
    "forms": [
      "Whole seeds",
      "Powder"
    ],
    "description": "Mucuna (kaunch beej) seeds, whole or powdered, for herbal and nutraceutical extraction.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/mucuna-seeds.webp",
    "gallery": [
      "/images/products/mucuna-seeds.webp"
    ]
  },
  {
    "slug": "malkangni-seeds",
    "name": "Malkangni Seeds",
    "category": "herbs-botanicals",
    "subcategory": "seeds-seed-products",
    "type": "bulk",
    "botanicalName": "Celastrus paniculatus",
    "hsCode": "1211.90",
    "forms": [
      "Whole seeds"
    ],
    "description": "Malkangni (jyotishmati) seeds used in Ayurvedic oils and formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/malkangni-seeds.webp",
    "gallery": [
      "/images/products/malkangni-seeds.webp"
    ]
  },
  {
    "slug": "neem-seeds",
    "name": "Neem Seeds",
    "category": "herbs-botanicals",
    "subcategory": "seeds-seed-products",
    "type": "bulk",
    "botanicalName": "Azadirachta indica",
    "hsCode": "1207.99",
    "forms": [
      "Whole seeds",
      "Kernels"
    ],
    "description": "Neem seeds and kernels for oil pressing and natural agricultural inputs.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/neem-seeds.webp",
    "gallery": [
      "/images/products/neem-seeds.webp"
    ]
  },
  {
    "slug": "nirmali-seeds",
    "name": "Nirmali Seeds",
    "category": "herbs-botanicals",
    "subcategory": "seeds-seed-products",
    "type": "bulk",
    "botanicalName": "Strychnos potatorum",
    "hsCode": "1211.90",
    "forms": [
      "Whole seeds"
    ],
    "description": "Nirmali (clearing-nut) seeds used traditionally to clear water and in herbal formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/nirmali-seeds.webp",
    "gallery": [
      "/images/products/nirmali-seeds.webp"
    ]
  },
  {
    "slug": "chironji-seeds",
    "name": "Chironji Seeds",
    "category": "herbs-botanicals",
    "subcategory": "seeds-seed-products",
    "type": "bulk",
    "botanicalName": "Buchanania cochinchinensis",
    "origin": "Madhya Pradesh, Chhattisgarh, Jharkhand",
    "forms": [
      "Kernels"
    ],
    "description": "Small almond-flavoured chironji kernels used in Indian sweets, kheer and bakery.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/chironji-seeds.webp",
    "gallery": [
      "/images/products/chironji-seeds.webp"
    ]
  },
  {
    "slug": "psyllium-seeds",
    "name": "Psyllium Seeds (Isabgol)",
    "category": "superfoods-functional-seeds",
    "subcategory": "psyllium-products",
    "also": [
      {
        "category": "herbs-botanicals",
        "subcategory": "seeds-seed-products"
      }
    ],
    "type": "bulk",
    "botanicalName": "Plantago ovata",
    "hsCode": "1211.90",
    "origin": "Gujarat (Unjha), Rajasthan",
    "forms": [
      "Whole seeds"
    ],
    "description": "Cleaned psyllium seeds from Gujarat and Rajasthan — India grows most of the world's psyllium.",
    "packaging": [
      "25 kg PP or paper bags with inner liner",
      "Retail and private-label packs"
    ],
    "image": "/images/products/psyllium-seeds.webp",
    "gallery": [
      "/images/products/psyllium-seeds.webp"
    ]
  },
  {
    "slug": "basil-seeds",
    "name": "Basil Seeds (Sabja / Tukmaria)",
    "category": "superfoods-functional-seeds",
    "subcategory": "moringa-functional-seeds",
    "also": [
      {
        "category": "herbs-botanicals",
        "subcategory": "seeds-seed-products"
      }
    ],
    "type": "bulk",
    "botanicalName": "Ocimum basilicum",
    "hsCode": "1207.99",
    "origin": "Gujarat, Rajasthan",
    "forms": [
      "Whole seeds"
    ],
    "grades": [
      "99% purity",
      "Sortex cleaned"
    ],
    "description": "Sweet basil seeds that swell into a soft gel in water — used in falooda, beverages and desserts across the Middle East and Asia.",
    "packaging": [
      "25 kg PP or paper bags with inner liner",
      "Retail and private-label packs"
    ],
    "image": "/images/products/basil-seeds.webp",
    "gallery": [
      "/images/products/basil-seeds.webp"
    ]
  },
  {
    "slug": "ambrette-seeds",
    "name": "Ambrette Seeds",
    "category": "herbs-botanicals",
    "subcategory": "seeds-seed-products",
    "type": "bulk",
    "botanicalName": "Abelmoschus moschatus",
    "hsCode": "1211.90",
    "forms": [
      "Whole seeds"
    ],
    "description": "Musk-scented ambrette seeds used in perfumery, flavouring and herbal products.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/ambrette-seeds.webp",
    "gallery": [
      "/images/products/ambrette-seeds.webp"
    ]
  },
  {
    "slug": "gymnema-seeds",
    "name": "Gymnema Seeds",
    "category": "herbs-botanicals",
    "subcategory": "seeds-seed-products",
    "type": "bulk",
    "botanicalName": "Gymnema sylvestre",
    "hsCode": "1211.90",
    "forms": [
      "Whole seeds"
    ],
    "description": "Gymnema seeds for cultivation and herbal manufacturers.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "moringa-seeds",
    "name": "Moringa Seeds",
    "category": "superfoods-functional-seeds",
    "subcategory": "moringa-functional-seeds",
    "also": [
      {
        "category": "herbs-botanicals",
        "subcategory": "seeds-seed-products"
      }
    ],
    "type": "bulk",
    "botanicalName": "Moringa oleifera",
    "hsCode": "1207.99",
    "origin": "Tamil Nadu, Andhra Pradesh",
    "forms": [
      "Whole seeds (in shell)",
      "Kernels"
    ],
    "description": "Moringa seeds for cultivation, oil pressing and water-treatment uses.",
    "packaging": [
      "25 kg PP or paper bags with inner liner",
      "Retail and private-label packs"
    ],
    "image": "/images/products/moringa-seeds.webp",
    "gallery": [
      "/images/products/moringa-seeds.webp"
    ]
  },
  {
    "slug": "saffron",
    "name": "Saffron (Kesar)",
    "category": "herbs-botanicals",
    "subcategory": "specialty-functional-botanicals",
    "type": "bulk",
    "botanicalName": "Crocus sativus",
    "hsCode": "0910.20",
    "origin": "Kashmir (Pampore)",
    "forms": [
      "Stigmas (threads)"
    ],
    "description": "Kashmir saffron threads graded by colour strength — supplied in small consumer packs or bulk to specification.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/saffron.webp",
    "gallery": [
      "/images/products/saffron.webp"
    ]
  },
  {
    "slug": "guggul-resin",
    "name": "Guggul Resin",
    "category": "herbs-botanicals",
    "subcategory": "gums-botanical-resins",
    "type": "bulk",
    "botanicalName": "Commiphora wightii",
    "hsCode": "1301.90",
    "origin": "Rajasthan, Gujarat",
    "forms": [
      "Resin lumps"
    ],
    "description": "Guggul gum resin for Ayurvedic and nutraceutical manufacturers and for incense.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "boswellia-resin",
    "name": "Boswellia (Shallaki) Resin",
    "category": "herbs-botanicals",
    "subcategory": "gums-botanical-resins",
    "type": "bulk",
    "botanicalName": "Boswellia serrata",
    "hsCode": "1301.90",
    "origin": "Madhya Pradesh, Rajasthan, Gujarat",
    "forms": [
      "Resin tears / lumps"
    ],
    "description": "Indian frankincense (shallaki) resin for extraction, herbal products and incense.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/boswellia-resin.webp",
    "gallery": [
      "/images/products/boswellia-resin.webp"
    ]
  },
  {
    "slug": "gum-arabic",
    "name": "Gum Arabic",
    "category": "herbs-botanicals",
    "subcategory": "gums-botanical-resins",
    "type": "bulk",
    "botanicalName": "Senegalia senegal",
    "hsCode": "1301.20",
    "forms": [
      "Kibbled",
      "Powder"
    ],
    "description": "Acacia gum used as an emulsifier and stabiliser in beverages, confectionery and pharmaceuticals.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/gum-arabic.webp",
    "gallery": [
      "/images/products/gum-arabic.webp"
    ]
  },
  {
    "slug": "tragacanth-gum",
    "name": "Tragacanth (Gond Katira)",
    "category": "herbs-botanicals",
    "subcategory": "gums-botanical-resins",
    "type": "bulk",
    "botanicalName": "Astragalus spp.; Indian katira from Cochlospermum / Sterculia spp.",
    "hsCode": "1301.90",
    "forms": [
      "Flakes / crystals"
    ],
    "description": "Gond katira crystals that swell into a jelly in water, used in summer drinks and confectionery; botanical source confirmed per lot.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/tragacanth-gum.webp",
    "gallery": [
      "/images/products/tragacanth-gum.webp"
    ]
  },
  {
    "slug": "karaya-gum",
    "name": "Karaya Gum",
    "category": "herbs-botanicals",
    "subcategory": "gums-botanical-resins",
    "type": "bulk",
    "botanicalName": "Sterculia urens",
    "hsCode": "1301.90",
    "origin": "Gujarat, Madhya Pradesh, Andhra Pradesh",
    "forms": [
      "Lumps",
      "Kibbled",
      "Powder"
    ],
    "description": "Karaya gum from India — the main world source — used as a stabiliser and in pharmaceutical and adhesive applications.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/karaya-gum.webp",
    "gallery": [
      "/images/products/karaya-gum.webp"
    ]
  },
  {
    "slug": "myrrh-resin",
    "name": "Myrrh (Hirabol) Resin",
    "category": "herbs-botanicals",
    "subcategory": "gums-botanical-resins",
    "type": "bulk",
    "botanicalName": "Commiphora myrrha",
    "hsCode": "1301.90",
    "forms": [
      "Resin lumps"
    ],
    "description": "Myrrh (hirabol) resin for incense, perfumery and traditional formulations.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/myrrh-resin.webp",
    "gallery": [
      "/images/products/myrrh-resin.webp"
    ]
  },
  {
    "slug": "dammar-resin",
    "name": "Dammar Resin",
    "category": "herbs-botanicals",
    "subcategory": "gums-botanical-resins",
    "type": "bulk",
    "botanicalName": "Shorea robusta",
    "hsCode": "1301.90",
    "forms": [
      "Resin lumps",
      "Powder"
    ],
    "description": "Sal dammar resin (ral) for incense, varnishes and traditional uses.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/dammar-resin.webp",
    "gallery": [
      "/images/products/dammar-resin.webp"
    ]
  },
  {
    "slug": "benzoin-resin",
    "name": "Benzoin (Loban) Resin",
    "category": "herbs-botanicals",
    "subcategory": "gums-botanical-resins",
    "type": "bulk",
    "botanicalName": "Styrax benzoin",
    "hsCode": "1301.90",
    "forms": [
      "Resin lumps"
    ],
    "description": "Benzoin (loban) resin for incense, perfumery and fixatives.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/benzoin-resin.webp",
    "gallery": [
      "/images/products/benzoin-resin.webp"
    ]
  },
  {
    "slug": "seedlac-shellac",
    "name": "Seedlac & Shellac",
    "category": "herbs-botanicals",
    "subcategory": "gums-botanical-resins",
    "type": "bulk",
    "botanicalName": "Lac resin (Kerria lacca)",
    "hsCode": "1301.10",
    "origin": "Jharkhand, Chhattisgarh, West Bengal",
    "forms": [
      "Seedlac",
      "Shellac flakes"
    ],
    "description": "Natural lac resin from India's lac belt — seedlac and refined shellac flakes for coatings, confectionery glaze and varnish.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/seedlac-shellac.webp",
    "gallery": [
      "/images/products/seedlac-shellac.webp"
    ]
  },
  {
    "slug": "shilajit-resin",
    "name": "Shilajit Resin",
    "category": "herbs-botanicals",
    "subcategory": "specialty-functional-botanicals",
    "type": "bulk",
    "botanicalName": "Mineral pitch (asphaltum)",
    "origin": "Himalayan region",
    "forms": [
      "Purified resin",
      "Powder"
    ],
    "description": "Purified Himalayan shilajit resin and powder for supplement and Ayurvedic manufacturers, tested per lot.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ],
    "image": "/images/products/shilajit-resin.webp",
    "gallery": [
      "/images/products/shilajit-resin.webp"
    ]
  },
  {
    "slug": "triphala",
    "name": "Triphala",
    "category": "herbs-botanicals",
    "subcategory": "specialty-functional-botanicals",
    "type": "bulk",
    "botanicalName": "Blend of Phyllanthus emblica, Terminalia chebula, Terminalia bellirica",
    "forms": [
      "Powder"
    ],
    "description": "The classic Ayurvedic blend of amla, haritaki and bibhitaki, supplied as powder in bulk or private-label packs.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "psyllium-husk",
    "name": "Psyllium Husk (Isabgol)",
    "category": "superfoods-functional-seeds",
    "subcategory": "psyllium-products",
    "also": [
      {
        "category": "herbs-botanicals",
        "subcategory": "specialty-functional-botanicals"
      }
    ],
    "type": "bulk",
    "botanicalName": "Plantago ovata",
    "hsCode": "1211.90",
    "origin": "Gujarat (Unjha), Rajasthan",
    "forms": [
      "Husk"
    ],
    "grades": [
      "99%",
      "98%",
      "95%",
      "85%"
    ],
    "description": "Psyllium husk in 85% to 99% purity grades for dietary fibre, pharmaceutical and food manufacturers.",
    "packaging": [
      "25 kg PP or paper bags with inner liner",
      "Retail and private-label packs"
    ],
    "image": "/images/products/psyllium-husk.webp",
    "gallery": [
      "/images/products/psyllium-husk.webp"
    ]
  },
  {
    "slug": "psyllium-husk-powder",
    "name": "Psyllium Husk Powder",
    "category": "superfoods-functional-seeds",
    "subcategory": "psyllium-products",
    "also": [
      {
        "category": "herbs-botanicals",
        "subcategory": "specialty-functional-botanicals"
      }
    ],
    "type": "bulk",
    "botanicalName": "Plantago ovata",
    "hsCode": "1211.90",
    "origin": "Gujarat (Unjha), Rajasthan",
    "forms": [
      "Powder (various mesh)"
    ],
    "grades": [
      "99%",
      "98%",
      "95%",
      "85%"
    ],
    "description": "Psyllium husk milled to fine powder in different mesh sizes and purities for supplements, bakery and pharma.",
    "packaging": [
      "25 kg PP or paper bags with inner liner",
      "Retail and private-label packs"
    ]
  },
  {
    "slug": "botanical-extracts",
    "name": "Botanical Extracts",
    "category": "herbs-botanicals",
    "subcategory": "specialty-functional-botanicals",
    "type": "bulk",
    "botanicalName": "Various",
    "hsCode": "1302.19",
    "forms": [
      "Powder extracts"
    ],
    "description": "Standardised and ratio extracts of Indian herbs, sourced to buyer specification with a certificate of analysis.",
    "packaging": [
      "20–25 kg PP or jute bags",
      "Pressed bales (leaves and herbs)",
      "Cartons with inner liner",
      "Private-label packs on request"
    ]
  },
  {
    "slug": "dehydrated-white-onion-flakes",
    "name": "Dehydrated White Onion Flakes",
    "category": "dehydrated-onion-garlic",
    "subcategory": "dehydrated-onion",
    "type": "bulk",
    "botanicalName": "Allium cepa",
    "hsCode": "0712.20",
    "origin": "Gujarat (Mahuva)",
    "forms": [
      "Flakes"
    ],
    "description": "Air-dried white onion flakes from Mahuva, Gujarat — India's dehydrated onion hub — for seasonings, soups, sauces and ready meals.",
    "specifications": {
      "Moisture": "Max 6.0%",
      "Hot Water Insoluble Ash": "Max 0.5%",
      "Total Plate Count (TPC)": "< 100,000 cfu/g (standard) / < 10,000 cfu/g (sterilized)",
      "Coliforms / E. coli": "Absent",
      "SO2 Content": "Max 50 ppm"
    },
    "shelfLife": "12 months",
    "packaging": [
      "20kg Multi-wall Paper Bags with inner PE liner",
      "25kg Kraft bags"
    ],
    "steamSterilized": true
  },
  {
    "slug": "dehydrated-onion-kibbled",
    "name": "Dehydrated Onion Kibbled",
    "category": "dehydrated-onion-garlic",
    "subcategory": "dehydrated-onion",
    "type": "bulk",
    "botanicalName": "Allium cepa",
    "hsCode": "0712.20",
    "origin": "Gujarat (Mahuva)",
    "forms": [
      "Kibbled pieces"
    ],
    "description": "Large kibbled (cut) pieces of dehydrated white onion for soups, sauces and food service.",
    "packaging": [
      "20–25 kg multi-wall paper bags or cartons with double PE liner",
      "Retail and private-label packs"
    ],
    "steamSterilized": true
  },
  {
    "slug": "dehydrated-onion-minced",
    "name": "Dehydrated Onion Minced",
    "category": "dehydrated-onion-garlic",
    "subcategory": "dehydrated-onion",
    "type": "bulk",
    "botanicalName": "Allium cepa",
    "hsCode": "0712.20",
    "origin": "Gujarat (Mahuva)",
    "forms": [
      "Minced (about 1–3 mm)"
    ],
    "description": "Minced dehydrated onion for seasoning blends, meat processing and instant foods.",
    "packaging": [
      "20–25 kg multi-wall paper bags or cartons with double PE liner",
      "Retail and private-label packs"
    ],
    "steamSterilized": true
  },
  {
    "slug": "dehydrated-onion-granules",
    "name": "Dehydrated Onion Granules",
    "category": "dehydrated-onion-garlic",
    "subcategory": "dehydrated-onion",
    "type": "bulk",
    "botanicalName": "Allium cepa",
    "hsCode": "0712.20",
    "origin": "Gujarat (Mahuva)",
    "forms": [
      "Granules"
    ],
    "description": "Free-flowing dehydrated onion granules for dry seasoning, rubs and snack coatings.",
    "packaging": [
      "20–25 kg multi-wall paper bags or cartons with double PE liner",
      "Retail and private-label packs"
    ],
    "steamSterilized": true
  },
  {
    "slug": "dehydrated-onion-powder",
    "name": "Dehydrated Onion Powder",
    "category": "dehydrated-onion-garlic",
    "subcategory": "dehydrated-onion",
    "type": "bulk",
    "botanicalName": "Allium cepa",
    "hsCode": "0712.20",
    "origin": "Gujarat (Mahuva)",
    "forms": [
      "Powder"
    ],
    "description": "Fine dehydrated onion powder for seasonings, sauces, soups and snack manufacturers.",
    "packaging": [
      "20–25 kg multi-wall paper bags or cartons with double PE liner",
      "Retail and private-label packs"
    ],
    "image": "/images/products/dehydrated-onion-powder.webp",
    "gallery": [
      "/images/products/dehydrated-onion-powder.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "dehydrated-garlic-flakes",
    "name": "Dehydrated Garlic Flakes",
    "category": "dehydrated-onion-garlic",
    "subcategory": "dehydrated-garlic",
    "type": "bulk",
    "botanicalName": "Allium sativum",
    "hsCode": "0712.90",
    "origin": "Gujarat, Madhya Pradesh",
    "forms": [
      "Flakes"
    ],
    "description": "Dehydrated garlic flakes (cloves and slices) for seasonings, sauces and further milling.",
    "specifications": {
      "Moisture": "Max 6.0%",
      "Acid Insoluble Ash": "Max 0.5%",
      "Foreign Matter": "Nil",
      "Yeasts & Molds": "Max 100 cfu/g",
      "Salmonella": "Absent in 25g"
    },
    "shelfLife": "12 months",
    "packaging": [
      "20kg/25kg Cartons with inner double polybag"
    ],
    "steamSterilized": true
  },
  {
    "slug": "dehydrated-garlic-minced",
    "name": "Dehydrated Garlic Minced",
    "category": "dehydrated-onion-garlic",
    "subcategory": "dehydrated-garlic",
    "type": "bulk",
    "botanicalName": "Allium sativum",
    "hsCode": "0712.90",
    "origin": "Gujarat, Madhya Pradesh",
    "forms": [
      "Minced"
    ],
    "description": "Minced dehydrated garlic for seasoning blends, marinades and ready meals.",
    "packaging": [
      "20–25 kg multi-wall paper bags or cartons with double PE liner",
      "Retail and private-label packs"
    ],
    "steamSterilized": true
  },
  {
    "slug": "dehydrated-garlic-granules",
    "name": "Dehydrated Garlic Granules",
    "category": "dehydrated-onion-garlic",
    "subcategory": "dehydrated-garlic",
    "type": "bulk",
    "botanicalName": "Allium sativum",
    "hsCode": "0712.90",
    "origin": "Gujarat, Madhya Pradesh",
    "forms": [
      "Granules"
    ],
    "description": "Free-flowing dehydrated garlic granules for seasonings, rubs and snack coatings.",
    "packaging": [
      "20–25 kg multi-wall paper bags or cartons with double PE liner",
      "Retail and private-label packs"
    ],
    "steamSterilized": true
  },
  {
    "slug": "dehydrated-garlic-powder",
    "name": "Dehydrated Garlic Powder",
    "category": "dehydrated-onion-garlic",
    "subcategory": "dehydrated-garlic",
    "type": "bulk",
    "botanicalName": "Allium sativum",
    "hsCode": "0712.90",
    "origin": "Gujarat, Madhya Pradesh",
    "forms": [
      "Powder"
    ],
    "description": "Fine dehydrated garlic powder for seasoning, sauce and snack manufacturers.",
    "packaging": [
      "20–25 kg multi-wall paper bags or cartons with double PE liner",
      "Retail and private-label packs"
    ],
    "image": "/images/products/dehydrated-garlic-powder.webp",
    "gallery": [
      "/images/products/dehydrated-garlic-powder.webp"
    ],
    "steamSterilized": true
  },
  {
    "slug": "desiccated-coconut",
    "name": "Desiccated Coconut",
    "category": "coconut-products",
    "subcategory": "dried-coconut-derivatives",
    "type": "bulk",
    "botanicalName": "Cocos nucifera",
    "hsCode": "0801.11",
    "origin": "Kerala, Tamil Nadu, Karnataka",
    "forms": [
      "Fine",
      "Medium"
    ],
    "description": "Dried, shredded white coconut kernel in fine and medium grades for bakery, confectionery and sweets.",
    "packaging": [
      "25 kg / 50 kg multi-wall paper or PP bags with inner liner",
      "Retail and private-label packs"
    ]
  },
  {
    "slug": "coconut-chips",
    "name": "Coconut Chips",
    "category": "coconut-products",
    "subcategory": "dried-coconut-derivatives",
    "type": "bulk",
    "botanicalName": "Cocos nucifera",
    "hsCode": "0801.19",
    "origin": "Kerala, Tamil Nadu, Karnataka",
    "forms": [
      "Chips"
    ],
    "description": "Thin dried coconut chips for snacking, cereals, bakery and confectionery.",
    "packaging": [
      "25 kg / 50 kg multi-wall paper or PP bags with inner liner",
      "Retail and private-label packs"
    ]
  },
  {
    "slug": "coconut-flakes",
    "name": "Coconut Flakes",
    "category": "coconut-products",
    "subcategory": "dried-coconut-derivatives",
    "type": "bulk",
    "botanicalName": "Cocos nucifera",
    "hsCode": "0801.19",
    "origin": "Kerala, Tamil Nadu, Karnataka",
    "forms": [
      "Flakes"
    ],
    "description": "Larger cut dried coconut flakes for granola, toppings and bakery.",
    "packaging": [
      "25 kg / 50 kg multi-wall paper or PP bags with inner liner",
      "Retail and private-label packs"
    ]
  },
  {
    "slug": "coconut-powder",
    "name": "Coconut Powder",
    "category": "coconut-products",
    "subcategory": "dried-coconut-derivatives",
    "type": "bulk",
    "botanicalName": "Cocos nucifera",
    "hsCode": "0801.19",
    "origin": "Kerala, Tamil Nadu, Karnataka",
    "forms": [
      "Powder"
    ],
    "description": "Finely ground dried coconut for sweets, curries, bakery and food manufacturing.",
    "packaging": [
      "25 kg / 50 kg multi-wall paper or PP bags with inner liner",
      "Retail and private-label packs"
    ]
  },
  {
    "slug": "copra",
    "name": "Copra",
    "category": "coconut-products",
    "subcategory": "dried-coconut-derivatives",
    "type": "bulk",
    "botanicalName": "Cocos nucifera",
    "hsCode": "1203.00",
    "origin": "Kerala, Tamil Nadu, Karnataka",
    "forms": [
      "Milling copra",
      "Edible (ball) copra"
    ],
    "description": "Dried coconut kernel — edible ball copra for cooking and sweets, and milling copra for coconut oil.",
    "packaging": [
      "25 kg / 50 kg multi-wall paper or PP bags with inner liner",
      "Retail and private-label packs"
    ],
    "image": "/images/products/copra.webp",
    "gallery": [
      "/images/products/copra.webp"
    ]
  },
  {
    "slug": "kabuli-chickpeas",
    "name": "Kabuli Chickpeas",
    "category": "pulses-legumes",
    "subcategory": "chickpeas-chana",
    "type": "bulk",
    "botanicalName": "Cicer arietinum",
    "hsCode": "0713.20",
    "origin": "Madhya Pradesh, Maharashtra",
    "forms": [
      "Whole"
    ],
    "grades": [
      "Bold 9mm (42-44 count)",
      "Medium 8mm (44-46 count)",
      "Small 7mm (58-60 count)"
    ],
    "description": "Large cream-coloured kabuli chickpeas graded by count (7–9 mm+) for canning, hummus, retail and food service.",
    "specifications": {
      "Size (Count)": "42-44 count (9mm) / 44-46 count (8mm) / 58-60 count (7mm)",
      "Moisture": "Max 12.0%",
      "Purity": "Min 99.0%",
      "Foreign Matter": "Max 0.2%",
      "Weevilled/Damaged": "Max 0.5%"
    },
    "shelfLife": "18 months",
    "packaging": [
      "25kg PP Bags",
      "50kg PP Bags",
      "Jute bags on request"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/kabuli-chana.webp",
    "gallery": [
      "/images/products/kabuli-chana.webp"
    ]
  },
  {
    "slug": "desi-chickpeas",
    "name": "Desi Chickpeas",
    "category": "pulses-legumes",
    "subcategory": "chickpeas-chana",
    "type": "bulk",
    "botanicalName": "Cicer arietinum (desi type)",
    "hsCode": "0713.20",
    "origin": "Madhya Pradesh, Rajasthan, Maharashtra",
    "forms": [
      "Whole"
    ],
    "description": "Small brown desi chickpeas for splitting into chana dal, milling into besan, and for retail packs.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/desi-chickpeas.webp",
    "gallery": [
      "/images/products/desi-chickpeas.webp"
    ]
  },
  {
    "slug": "kala-chana",
    "name": "Kala Chana (Black Chickpeas)",
    "category": "pulses-legumes",
    "subcategory": "chickpeas-chana",
    "type": "bulk",
    "botanicalName": "Cicer arietinum (desi type)",
    "hsCode": "0713.20",
    "origin": "Madhya Pradesh, Rajasthan",
    "forms": [
      "Whole"
    ],
    "description": "Dark brown whole desi chickpeas used in curries, salads and roasted snacks.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "chana-dal",
    "name": "Chana Dal",
    "category": "pulses-legumes",
    "subcategory": "chickpeas-chana",
    "type": "bulk",
    "botanicalName": "Cicer arietinum",
    "hsCode": "0713.20",
    "origin": "Madhya Pradesh, Rajasthan",
    "forms": [
      "Split, skinless"
    ],
    "grades": [
      "Bold Grade Chana Dal",
      "Standard Export Grade"
    ],
    "description": "Split and skinned desi chickpeas, polished and graded for retail packs, food service and besan milling.",
    "specifications": {
      "Purity": "Min 99.0%",
      "Moisture": "Max 12.0%",
      "Foreign Matter": "Max 0.5%",
      "Damaged/Weevilled Grains": "Max 1.0%",
      "Under-sized/Immature": "Max 2.0%"
    },
    "shelfLife": "12 months",
    "packaging": [
      "25kg PP Bags",
      "50kg PP Bags",
      "Custom retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/chana-dal.webp",
    "gallery": [
      "/images/products/chana-dal.webp"
    ]
  },
  {
    "slug": "roasted-chana",
    "name": "Roasted Chana (Bhuna Chana)",
    "category": "pulses-legumes",
    "subcategory": "chickpeas-chana",
    "type": "bulk",
    "botanicalName": "Cicer arietinum",
    "origin": "Madhya Pradesh, Rajasthan",
    "forms": [
      "With skin",
      "Without skin"
    ],
    "description": "Dry-roasted chickpeas, with or without skin, for snacking, namkeen manufacturers and chutneys.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "image": "/images/products/roasted-chana.webp",
    "gallery": [
      "/images/products/roasted-chana.webp"
    ]
  },
  {
    "slug": "whole-toor",
    "name": "Whole Toor (Pigeon Peas)",
    "category": "pulses-legumes",
    "subcategory": "pigeon-peas-tur-arhar",
    "type": "bulk",
    "botanicalName": "Cajanus cajan",
    "hsCode": "0713.60",
    "origin": "Maharashtra, Karnataka",
    "forms": [
      "Whole"
    ],
    "description": "Whole pigeon peas for dal mills, retail packs and food service.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/whole-toor.webp",
    "gallery": [
      "/images/products/whole-toor.webp"
    ]
  },
  {
    "slug": "split-toor-dal",
    "name": "Split Toor Dal",
    "category": "pulses-legumes",
    "subcategory": "pigeon-peas-tur-arhar",
    "type": "bulk",
    "botanicalName": "Cajanus cajan",
    "hsCode": "0713.60",
    "origin": "Maharashtra, Karnataka",
    "forms": [
      "Split, skinless (polished / unpolished)"
    ],
    "description": "Split and skinned pigeon peas (arhar dal), plain or oil-polished — India's everyday dal for sambar and curries.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/split-toor-dal.webp",
    "gallery": [
      "/images/products/split-toor-dal.webp"
    ]
  },
  {
    "slug": "whole-green-moong",
    "name": "Whole Green Moong",
    "category": "pulses-legumes",
    "subcategory": "green-gram-moong",
    "type": "bulk",
    "botanicalName": "Vigna radiata",
    "hsCode": "0713.31",
    "origin": "Rajasthan, Madhya Pradesh, Maharashtra",
    "forms": [
      "Whole"
    ],
    "description": "Whole green gram for sprouting, retail packs and dal mills, sorted for colour and size.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/moong-whole.webp",
    "gallery": [
      "/images/products/moong-whole.webp"
    ]
  },
  {
    "slug": "yellow-moong-dal",
    "name": "Yellow Moong Dal",
    "category": "pulses-legumes",
    "subcategory": "green-gram-moong",
    "type": "bulk",
    "botanicalName": "Vigna radiata",
    "hsCode": "0713.31",
    "origin": "Rajasthan, Madhya Pradesh",
    "forms": [
      "Split, skinless"
    ],
    "description": "Split and skinned green gram — quick-cooking yellow moong dal for retail and food service.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/yellow-moong-dal.webp",
    "gallery": [
      "/images/products/yellow-moong-dal.webp"
    ]
  },
  {
    "slug": "split-moong",
    "name": "Split Moong",
    "category": "pulses-legumes",
    "subcategory": "green-gram-moong",
    "type": "bulk",
    "botanicalName": "Vigna radiata",
    "hsCode": "0713.31",
    "origin": "Rajasthan, Madhya Pradesh",
    "forms": [
      "Split"
    ],
    "description": "Split green gram for dal, khichdi and snack manufacturers; skin-on or skinless as specified.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "moong-chilka",
    "name": "Moong Chilka",
    "category": "pulses-legumes",
    "subcategory": "green-gram-moong",
    "type": "bulk",
    "botanicalName": "Vigna radiata",
    "hsCode": "0713.31",
    "origin": "Rajasthan, Madhya Pradesh",
    "forms": [
      "Split, skin-on"
    ],
    "description": "Split green gram with the green skin left on (chilka) for dal and traditional recipes.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "whole-black-urad",
    "name": "Whole Black Urad",
    "category": "pulses-legumes",
    "subcategory": "black-gram-urad",
    "type": "bulk",
    "botanicalName": "Vigna mungo",
    "hsCode": "0713.31",
    "origin": "Madhya Pradesh, Maharashtra, Andhra Pradesh",
    "forms": [
      "Whole"
    ],
    "description": "Whole black gram (sabut urad) for dal makhani, retail packs and dal mills.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/urad-whole.webp",
    "gallery": [
      "/images/products/urad-whole.webp"
    ]
  },
  {
    "slug": "whole-white-urad",
    "name": "Whole White Urad",
    "category": "pulses-legumes",
    "subcategory": "black-gram-urad",
    "type": "bulk",
    "botanicalName": "Vigna mungo",
    "hsCode": "0713.31",
    "origin": "Madhya Pradesh, Maharashtra",
    "forms": [
      "Whole, skinless"
    ],
    "description": "Dehulled whole black gram with a creamy white kernel, for idli and dosa batters and retail.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/whole-white-urad.webp",
    "gallery": [
      "/images/products/whole-white-urad.webp"
    ]
  },
  {
    "slug": "urad-dal-split-with-skin",
    "name": "Urad Dal Split (with Skin)",
    "category": "pulses-legumes",
    "subcategory": "black-gram-urad",
    "type": "bulk",
    "botanicalName": "Vigna mungo",
    "hsCode": "0713.31",
    "origin": "Madhya Pradesh, Maharashtra",
    "forms": [
      "Split, skin-on"
    ],
    "description": "Split black gram with the black skin on (chilka urad) for dal and traditional recipes.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "dhuli-urad-dal",
    "name": "Urad Dal Split without Skin (Dhuli Urad)",
    "category": "pulses-legumes",
    "subcategory": "black-gram-urad",
    "type": "bulk",
    "botanicalName": "Vigna mungo",
    "hsCode": "0713.31",
    "origin": "Madhya Pradesh, Maharashtra",
    "forms": [
      "Split, skinless"
    ],
    "description": "Split and skinned white urad dal for idli, dosa, vada and papad manufacturers.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "urad-gota",
    "name": "Urad Gota",
    "category": "pulses-legumes",
    "subcategory": "black-gram-urad",
    "type": "bulk",
    "botanicalName": "Vigna mungo",
    "hsCode": "0713.31",
    "origin": "Madhya Pradesh, Maharashtra",
    "forms": [
      "Whole, skinless"
    ],
    "description": "Polished whole skinless urad (gota), graded for bold uniform size, used in batters and papad.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "urad-mogar",
    "name": "Urad Mogar",
    "category": "pulses-legumes",
    "subcategory": "black-gram-urad",
    "type": "bulk",
    "botanicalName": "Vigna mungo",
    "hsCode": "0713.31",
    "origin": "Madhya Pradesh, Maharashtra",
    "forms": [
      "Split, skinless"
    ],
    "description": "Skinless urad mogar for batters, papad and food manufacturers, graded to buyer specification.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "whole-masoor",
    "name": "Whole Masoor (Brown Lentils)",
    "category": "pulses-legumes",
    "subcategory": "lentils-masoor",
    "type": "bulk",
    "botanicalName": "Lens culinaris",
    "hsCode": "0713.40",
    "origin": "Madhya Pradesh, Uttar Pradesh",
    "forms": [
      "Whole, skin-on"
    ],
    "description": "Whole brown lentils with skin for soups, curries and retail packs.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "red-lentils",
    "name": "Red Lentils (Whole, Skinless)",
    "category": "pulses-legumes",
    "subcategory": "lentils-masoor",
    "type": "bulk",
    "botanicalName": "Lens culinaris",
    "hsCode": "0713.40",
    "origin": "Madhya Pradesh, Uttar Pradesh",
    "forms": [
      "Whole, skinless"
    ],
    "description": "Skinned whole red lentils (football masoor) for quick-cooking dal, soups and retail.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/red-lentils.webp",
    "gallery": [
      "/images/products/red-lentils.webp"
    ]
  },
  {
    "slug": "split-red-lentils",
    "name": "Split Red Lentils",
    "category": "pulses-legumes",
    "subcategory": "lentils-masoor",
    "type": "bulk",
    "botanicalName": "Lens culinaris",
    "hsCode": "0713.40",
    "origin": "Madhya Pradesh, Uttar Pradesh",
    "forms": [
      "Split, skinless"
    ],
    "description": "Split skinless red lentils (masoor dal) that cook in minutes — for retail, food service and soup makers.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/split-red-lentils.webp",
    "gallery": [
      "/images/products/split-red-lentils.webp"
    ]
  },
  {
    "slug": "green-peas",
    "name": "Dried Green Peas",
    "category": "pulses-legumes",
    "subcategory": "peas-beans-other-pulses",
    "type": "bulk",
    "botanicalName": "Pisum sativum",
    "hsCode": "0713.10",
    "origin": "Uttar Pradesh, Madhya Pradesh",
    "forms": [
      "Whole dried"
    ],
    "description": "Dried whole green peas for curries, snacks, soaking and canning.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/green-peas.webp",
    "gallery": [
      "/images/products/green-peas.webp"
    ]
  },
  {
    "slug": "white-peas",
    "name": "Dried White Peas (Vatana)",
    "category": "pulses-legumes",
    "subcategory": "peas-beans-other-pulses",
    "type": "bulk",
    "botanicalName": "Pisum sativum",
    "hsCode": "0713.10",
    "origin": "Madhya Pradesh, Uttar Pradesh",
    "forms": [
      "Whole dried"
    ],
    "description": "Dried white peas (safed vatana) for ragda, usal and snack manufacturers.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/white-peas.webp",
    "gallery": [
      "/images/products/white-peas.webp"
    ]
  },
  {
    "slug": "red-kidney-beans",
    "name": "Red Kidney Beans (Rajma)",
    "category": "pulses-legumes",
    "subcategory": "peas-beans-other-pulses",
    "type": "bulk",
    "botanicalName": "Phaseolus vulgaris",
    "hsCode": "0713.33",
    "origin": "Jammu & Kashmir, Himachal Pradesh, Maharashtra",
    "forms": [
      "Whole"
    ],
    "description": "Dark and light red kidney beans (rajma) graded by size and colour for retail and food service.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/red-kidney-beans.webp",
    "gallery": [
      "/images/products/red-kidney-beans.webp"
    ]
  },
  {
    "slug": "black-kidney-beans",
    "name": "Black Kidney Beans",
    "category": "pulses-legumes",
    "subcategory": "peas-beans-other-pulses",
    "type": "bulk",
    "botanicalName": "Phaseolus vulgaris",
    "hsCode": "0713.33",
    "forms": [
      "Whole"
    ],
    "description": "Black kidney beans for curries, salads and Latin-style dishes, graded by size.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "black-eyed-beans",
    "name": "Black-Eyed Beans (Lobia)",
    "category": "pulses-legumes",
    "subcategory": "peas-beans-other-pulses",
    "type": "bulk",
    "botanicalName": "Vigna unguiculata",
    "hsCode": "0713.35",
    "origin": "Karnataka, Maharashtra, Rajasthan",
    "forms": [
      "Whole"
    ],
    "description": "Cream-coloured cowpeas with a black eye (lobia) for curries, salads and canning.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/black-eyed-beans.webp",
    "gallery": [
      "/images/products/black-eyed-beans.webp"
    ]
  },
  {
    "slug": "moth-beans",
    "name": "Moth Beans",
    "category": "pulses-legumes",
    "subcategory": "peas-beans-other-pulses",
    "type": "bulk",
    "botanicalName": "Vigna aconitifolia",
    "hsCode": "0713.39",
    "origin": "Rajasthan",
    "forms": [
      "Whole"
    ],
    "description": "Small brown moth beans from Rajasthan for sprouting, usal and namkeen (bhujia) manufacturers.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "horse-gram",
    "name": "Horse Gram (Kulthi)",
    "category": "pulses-legumes",
    "subcategory": "peas-beans-other-pulses",
    "type": "bulk",
    "botanicalName": "Macrotyloma uniflorum",
    "hsCode": "0713.90",
    "origin": "Karnataka, Andhra Pradesh, Tamil Nadu",
    "forms": [
      "Whole"
    ],
    "description": "Hardy horse gram (kulthi) for soups, rasam and traditional recipes.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/horse-gram.webp",
    "gallery": [
      "/images/products/horse-gram.webp"
    ]
  },
  {
    "slug": "field-beans",
    "name": "Field Beans (Val)",
    "category": "pulses-legumes",
    "subcategory": "peas-beans-other-pulses",
    "type": "bulk",
    "botanicalName": "Lablab purpureus",
    "hsCode": "0713.90",
    "origin": "Karnataka, Gujarat",
    "forms": [
      "Whole",
      "Split"
    ],
    "description": "Dried field beans (val / avarai) whole or split for curries and traditional dishes.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "broad-beans",
    "name": "Broad (Fava) Beans",
    "category": "pulses-legumes",
    "subcategory": "peas-beans-other-pulses",
    "type": "bulk",
    "botanicalName": "Vicia faba",
    "hsCode": "0713.50",
    "forms": [
      "Whole"
    ],
    "description": "Dried broad (fava) beans for falafel, foul medames and soups.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/broad-beans.webp",
    "gallery": [
      "/images/products/broad-beans.webp"
    ]
  },
  {
    "slug": "adzuki-beans",
    "name": "Adzuki Beans",
    "category": "pulses-legumes",
    "subcategory": "peas-beans-other-pulses",
    "type": "bulk",
    "botanicalName": "Vigna angularis",
    "hsCode": "0713.32",
    "forms": [
      "Whole"
    ],
    "description": "Small red adzuki beans for sweet bean paste, soups and health-food packs.",
    "packaging": [
      "25 kg / 50 kg PP bags",
      "Jute bags on request",
      "Retail packs 500 g – 5 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/adzuki-beans.webp",
    "gallery": [
      "/images/products/adzuki-beans.webp"
    ]
  },
  {
    "slug": "traditional-basmati-rice",
    "name": "Traditional Basmati Rice",
    "category": "rice",
    "subcategory": "basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (Taraori, Basmati 370 and other traditional types)",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana, Uttar Pradesh",
    "forms": [
      "Raw",
      "Steam",
      "Sella"
    ],
    "description": "Traditional basmati varieties such as Taraori and Basmati 370, prized for aroma and taste, supplied aged as raw, steam or sella.",
    "packaging": [
      "1 / 5 / 10 / 20 / 25 kg bags",
      "Non-woven, BOPP & jute bags",
      "Private label"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/traditional-basmati-rice.webp",
    "gallery": [
      "/images/products/traditional-basmati-rice.webp"
    ]
  },
  {
    "slug": "1121-basmati-rice",
    "name": "1121 Basmati Rice",
    "category": "rice",
    "subcategory": "basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (Pusa Basmati 1121)",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana, Uttar Pradesh",
    "forms": [
      "Raw",
      "Steam",
      "White sella",
      "Golden sella"
    ],
    "grades": [
      "1121 Raw Basmati",
      "1121 Golden Sella (Parboiled)",
      "1121 Creamy Sella",
      "1121 Steam Basmati"
    ],
    "description": "Extra-long 1121 basmati with one of the longest cooked grains of any rice — the most traded basmati in the Gulf, supplied raw, steam and sella.",
    "specifications": {
      "Average Grain Length": "8.35 mm to 8.40 mm (pre-cooked)",
      "Moisture": "Max 12.0%",
      "Purity": "Min 95.0%",
      "Admixture": "Max 5.0%",
      "Broken Grain": "Max 1.0% (premium sorting)",
      "Chalky Grains": "Max 2.0% (Raw) / Nil (Sella)"
    },
    "shelfLife": "24 months (Aged Basmati)",
    "packaging": [
      "5kg/10kg/20kg/25kg BOPP Bags",
      "Non-woven fabric bags",
      "50kg PP Bags for bulk"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/basmati.webp",
    "gallery": [
      "/images/products/basmati.webp"
    ]
  },
  {
    "slug": "pusa-basmati-1121",
    "name": "Pusa Basmati 1121",
    "category": "rice",
    "subcategory": "basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (PB-1121)",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana, Uttar Pradesh",
    "forms": [
      "Raw",
      "Steam",
      "Sella"
    ],
    "description": "Pusa Basmati 1121 (PB-1121) is the notified variety name behind 1121 basmati; this page covers buyers who specify the variety by its official name.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "1509-basmati-rice",
    "name": "1509 Basmati Rice",
    "category": "rice",
    "subcategory": "basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (Pusa Basmati 1509)",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana, Uttar Pradesh",
    "forms": [
      "Raw",
      "Steam",
      "Sella"
    ],
    "description": "Early-maturing 1509 basmati with long slender grains, a value alternative to 1121 for many Gulf and European buyers.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "pusa-basmati-1509",
    "name": "Pusa Basmati 1509",
    "category": "rice",
    "subcategory": "basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (PB-1509)",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana, Uttar Pradesh",
    "forms": [
      "Raw",
      "Steam",
      "Sella"
    ],
    "description": "Pusa Basmati 1509 (PB-1509) is the notified variety name for 1509 basmati, offered raw, steam and sella.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "1718-basmati-rice",
    "name": "1718 Basmati Rice",
    "category": "rice",
    "subcategory": "basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (Pusa Basmati 1718)",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana",
    "forms": [
      "Raw",
      "Steam",
      "Sella"
    ],
    "description": "Pusa Basmati 1718, a newer 1121-type variety with improved disease resistance and similar long-grain quality.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "other-basmati-varieties",
    "name": "Other Basmati Varieties",
    "category": "rice",
    "subcategory": "basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana, Uttar Pradesh",
    "forms": [
      "Raw",
      "Steam",
      "Sella"
    ],
    "description": "Other basmati varieties sourced to buyer specification — tell us the variety, grain length and processing you need.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "ir64-rice",
    "name": "IR64 Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (IR64)",
    "hsCode": "1006.30",
    "origin": "Andhra Pradesh, Chhattisgarh, West Bengal",
    "forms": [
      "Raw",
      "Parboiled"
    ],
    "grades": [
      "IR64 Raw (5% Broken)",
      "IR64 Raw (25% Broken)",
      "IR64 Parboiled (5% Broken)"
    ],
    "description": "Long-grain IR64 non-basmati rice in 5% to 25% broken grades, raw or parboiled — a staple for African and Asian markets.",
    "specifications": {
      "Average Grain Length": "6.0 mm to 6.2 mm",
      "Moisture": "Max 14.0%",
      "Broken Grain": "5% Broken / 25% Broken (standard grades)",
      "Admixture": "Max 1.0%",
      "Chalky Grains": "Max 5.0%"
    },
    "shelfLife": "18 months",
    "packaging": [
      "25kg PP Bags",
      "50kg PP Bags",
      "Jute bags on request"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "ir36-rice",
    "name": "IR36 Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (IR36)",
    "hsCode": "1006.30",
    "origin": "Andhra Pradesh, Odisha, West Bengal",
    "forms": [
      "Raw",
      "Parboiled"
    ],
    "description": "Medium-long IR36 non-basmati rice, raw or parboiled, for price-sensitive markets.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "swarna-rice",
    "name": "Swarna Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (Swarna, MTU 7029)",
    "hsCode": "1006.30",
    "origin": "Andhra Pradesh, Odisha, Chhattisgarh",
    "forms": [
      "Raw",
      "Parboiled"
    ],
    "description": "Medium-grain Swarna (MTU 7029) rice, raw or parboiled, widely used in South Asian and African markets.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "sona-masuri-rice",
    "name": "Sona Masuri Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (Sona Masuri)",
    "hsCode": "1006.30",
    "origin": "Andhra Pradesh, Telangana, Karnataka",
    "forms": [
      "Raw",
      "Steam"
    ],
    "description": "Light, aromatic medium-grain Sona Masuri, the everyday rice of South Indian households abroad.",
    "packaging": [
      "5 / 10 / 20 / 25 kg bags",
      "Private label"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/sona-masoori.webp",
    "gallery": [
      "/images/products/sona-masoori.webp"
    ]
  },
  {
    "slug": "ponni-rice",
    "name": "Ponni Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (Ponni)",
    "hsCode": "1006.30",
    "origin": "Tamil Nadu",
    "forms": [
      "Raw",
      "Boiled"
    ],
    "description": "Medium-grain Ponni rice from Tamil Nadu, raw or boiled, for South Indian and Sri Lankan diaspora markets.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/ponni-rice.webp",
    "gallery": [
      "/images/products/ponni-rice.webp"
    ]
  },
  {
    "slug": "hmt-rice",
    "name": "HMT Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (HMT)",
    "hsCode": "1006.30",
    "origin": "Maharashtra, Madhya Pradesh, Chhattisgarh",
    "forms": [
      "Raw",
      "Steam"
    ],
    "description": "Fine, short-grain HMT rice with soft cooking quality, popular in Western and Central India.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "kolam-rice",
    "name": "Kolam Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (Kolam)",
    "hsCode": "1006.30",
    "origin": "Maharashtra, Gujarat",
    "forms": [
      "Raw",
      "Steam"
    ],
    "description": "Small-grain, soft-cooking Kolam rice from Maharashtra and Gujarat for everyday meals.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "pr11-rice",
    "name": "PR11 Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (PR 11)",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana",
    "forms": [
      "Raw",
      "Steam",
      "Sella"
    ],
    "description": "Long-grain PR 11 non-basmati from Punjab, raw, steam or sella, for value-led long-grain markets.",
    "packaging": [
      "25 / 50 kg PP bags",
      "Private label"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "pr14-rice",
    "name": "PR14 Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (PR 14)",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana",
    "forms": [
      "Raw",
      "Steam",
      "Sella"
    ],
    "description": "Long-grain PR 14 non-basmati from Punjab, raw, steam or sella.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "parmal-rice",
    "name": "Parmal Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (Parmal)",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana, Uttar Pradesh",
    "forms": [
      "Raw",
      "Parboiled"
    ],
    "description": "Parmal is the trade name for common long-grain non-basmati paddy from North India, supplied raw or parboiled.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "mtu-1010-rice",
    "name": "MTU 1010 Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (MTU 1010)",
    "hsCode": "1006.30",
    "origin": "Andhra Pradesh, Telangana",
    "forms": [
      "Raw",
      "Parboiled"
    ],
    "description": "Long slender MTU 1010 (Cottondora Sannalu) rice from Andhra Pradesh, raw or parboiled.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "rnr-rice",
    "name": "RNR Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (RNR 15048)",
    "hsCode": "1006.30",
    "origin": "Telangana",
    "forms": [
      "Raw",
      "Steam"
    ],
    "description": "RNR 15048 (Telangana Sona) — a fine-grain rice similar to Sona Masuri with soft cooking quality.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "bpt-rice",
    "name": "BPT Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (BPT 5204, Samba Mahsuri)",
    "hsCode": "1006.30",
    "origin": "Andhra Pradesh, Telangana",
    "forms": [
      "Raw",
      "Steam"
    ],
    "description": "BPT 5204 (Samba Mahsuri) — fine medium-grain rice prized in South India for taste and texture.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "jeera-samba-rice",
    "name": "Jeera Samba Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (Seeraga Samba)",
    "hsCode": "1006.30",
    "origin": "Tamil Nadu",
    "forms": [
      "Raw"
    ],
    "description": "Tiny, aromatic jeera samba (seeraga samba) grains used for Tamil and Kerala-style biryani.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "idli-rice",
    "name": "Idli Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.30",
    "origin": "Tamil Nadu, Andhra Pradesh",
    "forms": [
      "Parboiled"
    ],
    "description": "Short, bold parboiled rice chosen for soft idli and dosa batter.",
    "packaging": [
      "25 / 50 kg PP bags",
      "Private label"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "matta-rice",
    "name": "Matta Rice (Kerala Red Rice)",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (Palakkad Matta)",
    "hsCode": "1006.30",
    "origin": "Kerala (Palakkad)",
    "forms": [
      "Parboiled red rice"
    ],
    "description": "Bold, red-bran parboiled Matta rice from Palakkad, Kerala, the everyday rice of Kerala households worldwide.",
    "packaging": [
      "5 / 10 / 25 kg bags"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/matta-rice.webp",
    "gallery": [
      "/images/products/matta-rice.webp"
    ]
  },
  {
    "slug": "kalanamak-rice",
    "name": "Kalanamak Rice",
    "category": "rice",
    "subcategory": "non-basmati-rice",
    "type": "bulk",
    "botanicalName": "Oryza sativa (Kalanamak)",
    "hsCode": "1006.30",
    "origin": "Uttar Pradesh",
    "forms": [
      "Raw"
    ],
    "description": "Aromatic GI-tagged Kalanamak rice from eastern Uttar Pradesh, with black husk and a fragrant, soft cooked grain.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/kalanamak-rice.webp",
    "gallery": [
      "/images/products/kalanamak-rice.webp"
    ]
  },
  {
    "slug": "raw-white-rice",
    "name": "Raw White Rice",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.30",
    "origin": "India",
    "forms": [
      "Raw milled"
    ],
    "description": "Raw milled white rice of basmati or non-basmati varieties, polished and sorted to the buyer's broken percentage.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/non-basmati.webp",
    "gallery": [
      "/images/products/non-basmati.webp"
    ]
  },
  {
    "slug": "steam-rice",
    "name": "Steam Rice",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.30",
    "origin": "India",
    "forms": [
      "Steamed and milled"
    ],
    "description": "Paddy steamed before milling for firmer, non-sticky cooked grains, offered across basmati and non-basmati varieties.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "parboiled-rice",
    "name": "Parboiled Rice",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.30",
    "origin": "Andhra Pradesh, Tamil Nadu, West Bengal",
    "forms": [
      "Parboiled"
    ],
    "description": "Paddy soaked, steamed and dried before milling for a firm, separate cooked grain and higher nutrient retention.",
    "packaging": [
      "25 / 50 kg PP bags",
      "Private label"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/parboiled-rice.webp",
    "gallery": [
      "/images/products/parboiled-rice.webp"
    ]
  },
  {
    "slug": "white-sella-rice",
    "name": "White Sella Rice",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana",
    "forms": [
      "Parboiled (white sella)"
    ],
    "description": "Lightly parboiled sella rice with a white finish, mainly 1121 and 1509 basmati, popular in the Gulf.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "cream-sella-rice",
    "name": "Cream Sella Rice",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana",
    "forms": [
      "Parboiled (cream sella)"
    ],
    "description": "Parboiled sella rice with a light cream colour, firm texture and long cooked grain.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "golden-sella-rice",
    "name": "Golden Sella Rice",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.30",
    "origin": "Punjab, Haryana",
    "forms": [
      "Parboiled (golden sella)"
    ],
    "description": "Fully parboiled sella rice with a golden colour and very firm, separate grains for catering and food service.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "brown-rice",
    "name": "Brown Rice",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.20",
    "origin": "Punjab, Haryana",
    "forms": [
      "Husked, bran-on"
    ],
    "description": "Husked rice with the bran layer intact, available in basmati and non-basmati varieties.",
    "packaging": [
      "1 / 5 / 10 kg bags",
      "Private label"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/brown-rice.webp",
    "gallery": [
      "/images/products/brown-rice.webp"
    ]
  },
  {
    "slug": "unpolished-rice",
    "name": "Unpolished Rice",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.30",
    "origin": "India",
    "forms": [
      "Lightly milled, unpolished"
    ],
    "description": "Lightly milled rice with part of the bran retained, for health-food and retail buyers.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "broken-rice",
    "name": "Broken Rice",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.40",
    "origin": "India",
    "forms": [
      "Broken"
    ],
    "description": "Broken rice from basmati and non-basmati milling, graded by size for food processing and value markets.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "100-broken-rice",
    "name": "100% Broken Rice",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.40",
    "origin": "India",
    "forms": [
      "100% broken"
    ],
    "description": "Fully broken rice for brewing, rice flour, snacks and feed — supplied subject to India's current export rules.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "regulated": true
  },
  {
    "slug": "tibar-basmati",
    "name": "Tibar (Basmati Broken)",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.40",
    "origin": "Punjab, Haryana",
    "forms": [
      "Broken (about 3/4 grain)"
    ],
    "description": "Tibar is the largest basmati broken grade (about three-quarter grain) — basmati aroma at a lower price.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "dubar-basmati",
    "name": "Dubar (Basmati Broken)",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.40",
    "origin": "Punjab, Haryana",
    "forms": [
      "Broken (about 1/2 grain)"
    ],
    "description": "Dubar is the medium basmati broken grade (about half grain) for value packs and food service.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "mogra-basmati",
    "name": "Mogra (Basmati Broken)",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.40",
    "origin": "Punjab, Haryana",
    "forms": [
      "Broken (small)"
    ],
    "description": "Mogra is the small basmati broken grade, used for value retail packs, khichdi and food processing.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "mini-mogra-basmati",
    "name": "Mini Mogra (Basmati Broken)",
    "category": "rice",
    "subcategory": "processing-forms",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1006.40",
    "origin": "Punjab, Haryana",
    "forms": [
      "Broken (smallest)"
    ],
    "description": "Mini mogra is the smallest basmati broken grade, for rice flour, snacks and processing.",
    "packaging": [
      "5 / 10 / 20 / 25 kg BOPP or non-woven bags",
      "50 kg PP bags",
      "Private-label retail packs"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "chakki-atta",
    "name": "Whole Wheat Chakki Atta",
    "category": "flours-milling",
    "subcategory": "wheat-flour",
    "type": "bulk",
    "botanicalName": "Triticum aestivum",
    "hsCode": "1101.00",
    "origin": "Madhya Pradesh, Punjab",
    "forms": [
      "Stone-ground whole wheat flour"
    ],
    "description": "Stone-ground (chakki) whole wheat flour for soft rotis and chapatis, in bulk bags or retail packs.",
    "packaging": [
      "1 / 5 / 10 kg packs",
      "25 / 50 kg bags",
      "Private label"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "wheat-flour",
    "name": "Wheat Flour",
    "category": "flours-milling",
    "subcategory": "wheat-flour",
    "type": "bulk",
    "botanicalName": "Triticum aestivum",
    "hsCode": "1101.00",
    "origin": "Madhya Pradesh, Punjab",
    "forms": [
      "Milled flour"
    ],
    "description": "General-purpose milled wheat flour for bakery, food service and retail packs.",
    "packaging": [
      "25 kg / 50 kg PP or paper bags",
      "Retail packs 500 g – 10 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/wheat-flour.webp",
    "gallery": [
      "/images/products/wheat-flour.webp"
    ]
  },
  {
    "slug": "maida",
    "name": "Maida (Refined Wheat Flour)",
    "category": "flours-milling",
    "subcategory": "wheat-flour",
    "type": "bulk",
    "botanicalName": "Triticum aestivum",
    "hsCode": "1101.00",
    "origin": "Madhya Pradesh, Punjab",
    "forms": [
      "Refined flour"
    ],
    "description": "Fine, white refined wheat flour for bakery, naan, samosa and snack manufacturers.",
    "packaging": [
      "25 kg / 50 kg PP or paper bags",
      "Retail packs 500 g – 10 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/maida.webp",
    "gallery": [
      "/images/products/maida.webp"
    ]
  },
  {
    "slug": "sooji-rava",
    "name": "Sooji (Rava / Semolina)",
    "category": "flours-milling",
    "subcategory": "wheat-flour",
    "type": "bulk",
    "botanicalName": "Triticum aestivum / Triticum durum",
    "hsCode": "1103.11",
    "origin": "Madhya Pradesh, Punjab",
    "forms": [
      "Fine",
      "Medium",
      "Coarse"
    ],
    "description": "Wheat semolina (sooji / rava) in fine, medium and coarse grades for upma, halwa, idli and bakery.",
    "packaging": [
      "25 kg / 50 kg PP or paper bags",
      "Retail packs 500 g – 10 kg, private label available"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    }
  },
  {
    "slug": "besan",
    "name": "Besan (Gram Flour)",
    "category": "flours-milling",
    "subcategory": "pulse-rice-millet-flours",
    "type": "bulk",
    "botanicalName": "Cicer arietinum",
    "hsCode": "1106.10",
    "origin": "Madhya Pradesh, Rajasthan",
    "forms": [
      "Fine",
      "Coarse"
    ],
    "description": "Flour milled from chana dal for pakora, sev, ladoo and namkeen manufacturers.",
    "packaging": [
      "500 g / 1 kg / 2 kg packs",
      "25 kg bags",
      "Private label"
    ]
  },
  {
    "slug": "rice-flour",
    "name": "Fine Rice Flour",
    "category": "flours-milling",
    "subcategory": "pulse-rice-millet-flours",
    "type": "bulk",
    "botanicalName": "Oryza sativa",
    "hsCode": "1102.90",
    "origin": "Tamil Nadu, Andhra Pradesh",
    "forms": [
      "Fine flour"
    ],
    "description": "Finely milled rice flour for appam, idiyappam, bakery and gluten-free products.",
    "packaging": [
      "25 kg / 50 kg PP or paper bags",
      "Retail packs 500 g – 10 kg, private label available"
    ],
    "image": "/images/products/rice-flour.webp",
    "gallery": [
      "/images/products/rice-flour.webp"
    ]
  },
  {
    "slug": "bajra-flour",
    "name": "Bajra Flour (Pearl Millet)",
    "category": "flours-milling",
    "subcategory": "pulse-rice-millet-flours",
    "type": "bulk",
    "botanicalName": "Pennisetum glaucum",
    "hsCode": "1102.90",
    "origin": "Rajasthan, Gujarat",
    "forms": [
      "Flour"
    ],
    "description": "Pearl millet flour for bhakri and rotla, and for gluten-free and millet-based foods.",
    "packaging": [
      "25 kg / 50 kg PP or paper bags",
      "Retail packs 500 g – 10 kg, private label available"
    ]
  },
  {
    "slug": "jowar-flour",
    "name": "Jowar Flour (Sorghum)",
    "category": "flours-milling",
    "subcategory": "pulse-rice-millet-flours",
    "type": "bulk",
    "botanicalName": "Sorghum bicolor",
    "hsCode": "1102.90",
    "origin": "Maharashtra, Karnataka",
    "forms": [
      "Flour"
    ],
    "description": "Sorghum flour for jowar bhakri and gluten-free baking.",
    "packaging": [
      "25 kg / 50 kg PP or paper bags",
      "Retail packs 500 g – 10 kg, private label available"
    ],
    "image": "/images/products/jowar-flour.webp",
    "gallery": [
      "/images/products/jowar-flour.webp"
    ]
  },
  {
    "slug": "ragi-flour",
    "name": "Ragi Flour (Finger Millet)",
    "category": "flours-milling",
    "subcategory": "pulse-rice-millet-flours",
    "type": "bulk",
    "botanicalName": "Eleusine coracana",
    "hsCode": "1102.90",
    "origin": "Karnataka, Tamil Nadu",
    "forms": [
      "Flour"
    ],
    "description": "Finger millet flour for ragi mudde, porridge, baby foods and millet snacks.",
    "packaging": [
      "25 kg / 50 kg PP or paper bags",
      "Retail packs 500 g – 10 kg, private label available"
    ]
  },
  {
    "slug": "corn-flour",
    "name": "Corn Flour (Maize Flour)",
    "category": "flours-milling",
    "subcategory": "pulse-rice-millet-flours",
    "type": "bulk",
    "botanicalName": "Zea mays",
    "hsCode": "1102.20",
    "origin": "Karnataka, Madhya Pradesh, Bihar",
    "forms": [
      "Flour"
    ],
    "description": "Milled maize flour (makki atta) for rotis, bakery and snack manufacturers.",
    "packaging": [
      "50 kg PP bags",
      "Bulk containers"
    ],
    "image": "/images/products/corn-flour.webp",
    "gallery": [
      "/images/products/corn-flour.webp"
    ]
  },
  {
    "slug": "wheat-bran",
    "name": "Wheat Bran",
    "category": "flours-milling",
    "subcategory": "milling-by-products",
    "also": [
      {
        "category": "animal-bird-feed",
        "subcategory": "meals-milling-by-products"
      }
    ],
    "type": "bulk",
    "botanicalName": "Triticum aestivum (milling by-product)",
    "hsCode": "2302.30",
    "origin": "Madhya Pradesh, Punjab",
    "forms": [
      "Bran flakes"
    ],
    "description": "Wheat bran from flour milling, supplied as food-grade fibre or as a feed ingredient — the intended use is stated on every contract.",
    "packaging": [
      "25 kg / 50 kg PP or paper bags",
      "Retail packs 500 g – 10 kg, private label available"
    ],
    "image": "/images/products/wheat-bran.webp",
    "gallery": [
      "/images/products/wheat-bran.webp"
    ]
  },
  {
    "slug": "rice-bran",
    "name": "Rice Bran",
    "category": "flours-milling",
    "subcategory": "milling-by-products",
    "also": [
      {
        "category": "animal-bird-feed",
        "subcategory": "meals-milling-by-products"
      }
    ],
    "type": "bulk",
    "botanicalName": "Oryza sativa (milling by-product)",
    "hsCode": "2302.40",
    "origin": "Punjab, Andhra Pradesh, Chhattisgarh",
    "forms": [
      "Raw bran",
      "De-oiled bran"
    ],
    "description": "Rice bran from rice milling — raw, or de-oiled after oil extraction — mainly used in animal feed.",
    "packaging": [
      "50 kg PP bags",
      "Loose bulk in container on request"
    ],
    "image": "/images/products/rice-bran.webp",
    "gallery": [
      "/images/products/rice-bran.webp"
    ]
  },
  {
    "slug": "hulled-white-sesame",
    "name": "Hulled White Sesame",
    "category": "oilseeds",
    "subcategory": "sesame-seeds",
    "type": "bulk",
    "botanicalName": "Sesamum indicum",
    "hsCode": "1207.40",
    "origin": "Gujarat, Rajasthan, West Bengal",
    "forms": [
      "Hulled"
    ],
    "grades": [
      "Hulled, auto-dry process",
      "Hulled, 99.95% purity"
    ],
    "description": "Mechanically or auto-dry hulled white sesame, Sortex-cleaned for bakery, tahini and confectionery.",
    "specifications": {
      "Purity": "99.9% Sortex Cleaned",
      "Moisture": "Max 6.0%",
      "Oil Content": "Min 48.0% - 50.0%",
      "Free Fatty Acids (FFA)": "Max 1.0% - 1.5%",
      "Dark Seeds": "Max 0.05% (for Sortex grade)",
      "E. coli / Salmonella": "Absent"
    },
    "shelfLife": "12 months",
    "packaging": [
      "22.68kg (50 lbs) Paper Bags",
      "25kg PP Bags",
      "Custom bulk bags"
    ],
    "containerLoad": {
      "twenty": "approx. 18 MT",
      "forty": null
    },
    "image": "/images/products/sesame-seeds.webp",
    "gallery": [
      "/images/products/sesame-seeds.webp"
    ]
  },
  {
    "slug": "natural-white-sesame",
    "name": "Natural White Sesame",
    "category": "oilseeds",
    "subcategory": "sesame-seeds",
    "type": "bulk",
    "botanicalName": "Sesamum indicum",
    "hsCode": "1207.40",
    "origin": "Gujarat, Rajasthan, Madhya Pradesh",
    "forms": [
      "Natural (unhulled)"
    ],
    "description": "Unhulled natural white sesame seeds, cleaned and Sortex-graded for oil milling, bakery and roasting.",
    "packaging": [
      "25 kg / 50 kg PP or multi-wall paper bags",
      "Jumbo bags on request"
    ],
    "containerLoad": {
      "twenty": "approx. 18 MT",
      "forty": null
    }
  },
  {
    "slug": "black-sesame",
    "name": "Black Sesame",
    "category": "oilseeds",
    "subcategory": "sesame-seeds",
    "type": "bulk",
    "botanicalName": "Sesamum indicum (black)",
    "hsCode": "1207.40",
    "origin": "Gujarat, Madhya Pradesh, West Bengal",
    "forms": [
      "Natural (unhulled)"
    ],
    "description": "Natural black sesame seeds, cleaned and sorted for Japanese, Korean and Middle Eastern food markets.",
    "packaging": [
      "25 kg / 50 kg PP or multi-wall paper bags",
      "Jumbo bags on request"
    ],
    "containerLoad": {
      "twenty": "approx. 18 MT",
      "forty": null
    },
    "image": "/images/products/black-sesame.webp",
    "gallery": [
      "/images/products/black-sesame.webp"
    ]
  },
  {
    "slug": "raw-groundnuts",
    "name": "Raw Groundnuts (Peanuts)",
    "category": "oilseeds",
    "subcategory": "groundnuts-other-oilseeds",
    "type": "bulk",
    "botanicalName": "Arachis hypogaea",
    "hsCode": "1202.42",
    "origin": "Gujarat, Rajasthan",
    "forms": [
      "Shelled kernels (Bold, Java)",
      "In-shell"
    ],
    "description": "Shelled groundnut kernels in Bold (runner) and Java (Spanish) types, graded by count per ounce for snack, butter and confectionery buyers.",
    "packaging": [
      "25 kg / 50 kg PP or multi-wall paper bags",
      "Jumbo bags on request"
    ],
    "containerLoad": {
      "twenty": "approx. 18–19 MT",
      "forty": null
    },
    "image": "/images/products/groundnut.webp",
    "gallery": [
      "/images/products/groundnut.webp",
      "/images/products/peanuts.webp"
    ]
  },
  {
    "slug": "soybeans",
    "name": "Soybeans",
    "category": "oilseeds",
    "subcategory": "groundnuts-other-oilseeds",
    "type": "bulk",
    "botanicalName": "Glycine max",
    "hsCode": "1201.90",
    "origin": "Madhya Pradesh, Maharashtra, Rajasthan",
    "forms": [
      "Whole"
    ],
    "description": "Non-GM Indian soybeans for food processing, oil extraction and feed.",
    "packaging": [
      "25 kg / 50 kg PP or multi-wall paper bags",
      "Jumbo bags on request"
    ],
    "image": "/images/products/soybean.webp",
    "gallery": [
      "/images/products/soybean.webp"
    ]
  },
  {
    "slug": "cottonseed-meal",
    "name": "Cottonseed Meal",
    "category": "oilseeds",
    "subcategory": "oilseed-meals-de-oiled-cakes",
    "also": [
      {
        "category": "animal-bird-feed",
        "subcategory": "meals-milling-by-products"
      }
    ],
    "type": "bulk",
    "botanicalName": "Gossypium spp. (oilseed meal)",
    "hsCode": "2306.10",
    "origin": "Gujarat, Maharashtra",
    "forms": [
      "Meal",
      "Cake"
    ],
    "description": "De-oiled cottonseed meal and cake, a protein ingredient for cattle feed — for animal feed use only.",
    "packaging": [
      "50 kg PP bags",
      "Loose bulk in container on request"
    ],
    "feedOnly": true
  },
  {
    "slug": "mustard-meal",
    "name": "Mustard (Rapeseed) Meal",
    "category": "oilseeds",
    "subcategory": "oilseed-meals-de-oiled-cakes",
    "also": [
      {
        "category": "animal-bird-feed",
        "subcategory": "meals-milling-by-products"
      }
    ],
    "type": "bulk",
    "botanicalName": "Brassica juncea (oilseed meal)",
    "hsCode": "2306.41",
    "origin": "Rajasthan, Gujarat",
    "forms": [
      "De-oiled meal",
      "Oil cake"
    ],
    "grades": [
      "De-oiled mustard / rapeseed meal",
      "Mustard oil cake"
    ],
    "description": "De-oiled mustard / rapeseed meal and oil cake for cattle and poultry feed — for animal feed use only.",
    "specifications": {
      "Crude Protein": "Min 35.0% - 38.0% (depending on meal type)",
      "Moisture": "Max 10.0%",
      "Sand & Silica": "Max 2.5%",
      "Crude Fiber": "Max 12.0%",
      "Aflatoxin": "Max 20 ppb (strict feed standards)"
    },
    "shelfLife": "12 months",
    "packaging": [
      "50kg PP Bags",
      "Bulk container stuffing (loose)"
    ],
    "feedOnly": true
  },
  {
    "slug": "other-oilseed-meals",
    "name": "Other Oilseed Meals & De-oiled Cakes",
    "category": "oilseeds",
    "subcategory": "oilseed-meals-de-oiled-cakes",
    "type": "bulk",
    "botanicalName": "Various oilseed meals",
    "hsCode": "2306.90",
    "origin": "India",
    "forms": [
      "Meal",
      "Cake"
    ],
    "description": "Other oilseed meals and de-oiled cakes sourced to buyer specification for feed manufacturers — for animal feed use only.",
    "packaging": [
      "50 kg PP bags",
      "Loose bulk in container on request"
    ],
    "feedOnly": true
  },
  {
    "slug": "green-coffee-beans",
    "name": "Green Coffee Beans",
    "category": "indian-coffee",
    "subcategory": "coffee-products",
    "type": "bulk",
    "botanicalName": "Coffea arabica / Coffea canephora",
    "hsCode": "0901.11",
    "origin": "Karnataka (Chikmagalur, Coorg), Kerala (Wayanad), Tamil Nadu",
    "forms": [
      "Green beans (washed / unwashed)"
    ],
    "description": "Unroasted Indian coffee beans, shade-grown in the Western Ghats, supplied in standard Coffee Board grades for roasters.",
    "packaging": [
      "60 kg jute bags (green coffee)",
      "Hermetic liners on request",
      "Retail and private-label packs (roasted and ground)"
    ],
    "containerLoad": {
      "twenty": "approx. 19.2 MT (320 × 60 kg bags)",
      "forty": null
    },
    "image": "/images/products/green-coffee-beans.webp",
    "gallery": [
      "/images/products/green-coffee-beans.webp"
    ]
  },
  {
    "slug": "indian-arabica-coffee",
    "name": "Indian Arabica Coffee",
    "category": "indian-coffee",
    "subcategory": "coffee-products",
    "type": "bulk",
    "botanicalName": "Coffea arabica",
    "hsCode": "0901.11",
    "origin": "Karnataka (Chikmagalur), Tamil Nadu (Nilgiris, Shevaroys)",
    "forms": [
      "Plantation (washed)",
      "Cherry (natural)",
      "Monsooned"
    ],
    "grades": [
      "Plantation A (washed Arabica)",
      "Arabica Cherry AB (natural)",
      "Monsooned Malabar AA"
    ],
    "description": "Indian Arabica grown under shade — Plantation A, Arabica Cherry AB and Monsooned Malabar AA grades for speciality and commercial roasters.",
    "packaging": [
      "60 kg jute bags (green coffee)",
      "Hermetic liners on request",
      "Retail and private-label packs (roasted and ground)"
    ],
    "containerLoad": {
      "twenty": "approx. 19.2 MT (320 × 60 kg bags)",
      "forty": null
    }
  },
  {
    "slug": "indian-robusta-coffee",
    "name": "Indian Robusta Coffee",
    "category": "indian-coffee",
    "subcategory": "coffee-products",
    "type": "bulk",
    "botanicalName": "Coffea canephora",
    "hsCode": "0901.11",
    "origin": "Karnataka (Coorg), Kerala (Wayanad)",
    "forms": [
      "Parchment (washed)",
      "Cherry (natural)"
    ],
    "grades": [
      "Robusta Parchment AB (washed)",
      "Robusta Cherry AB (natural)",
      "Robusta Kaapi Royale"
    ],
    "description": "Indian Robusta — Robusta Parchment AB, Robusta Cherry AB and Kaapi Royale grades — for espresso blends and soluble coffee.",
    "packaging": [
      "60 kg jute bags (green coffee)",
      "Hermetic liners on request",
      "Retail and private-label packs (roasted and ground)"
    ],
    "containerLoad": {
      "twenty": "approx. 19.2 MT (320 × 60 kg bags)",
      "forty": null
    },
    "image": "/images/products/indian-robusta-coffee.webp",
    "gallery": [
      "/images/products/indian-robusta-coffee.webp"
    ]
  },
  {
    "slug": "roasted-coffee-beans",
    "name": "Roasted Coffee Beans",
    "category": "indian-coffee",
    "subcategory": "coffee-products",
    "type": "bulk",
    "botanicalName": "Coffea arabica / Coffea canephora",
    "hsCode": "0901.21",
    "origin": "Roasted in India",
    "forms": [
      "Whole roasted beans"
    ],
    "description": "Indian coffee roasted to the buyer's profile, in bulk or private-label retail packs.",
    "packaging": [
      "60 kg jute bags (green coffee)",
      "Hermetic liners on request",
      "Retail and private-label packs (roasted and ground)"
    ],
    "image": "/images/products/roasted-coffee-beans.webp",
    "gallery": [
      "/images/products/roasted-coffee-beans.webp"
    ]
  },
  {
    "slug": "ground-coffee",
    "name": "Ground Coffee",
    "category": "indian-coffee",
    "subcategory": "coffee-products",
    "type": "bulk",
    "botanicalName": "Coffea arabica / Coffea canephora",
    "hsCode": "0901.21",
    "origin": "Roasted in India",
    "forms": [
      "Ground (filter, espresso)"
    ],
    "description": "Ground Indian coffee, including South Indian filter coffee with or without chicory, in bulk or retail packs.",
    "packaging": [
      "60 kg jute bags (green coffee)",
      "Hermetic liners on request",
      "Retail and private-label packs (roasted and ground)"
    ],
    "image": "/images/products/ground-coffee.webp",
    "gallery": [
      "/images/products/ground-coffee.webp"
    ]
  },
  {
    "slug": "moringa-leaf-powder",
    "name": "Moringa Leaf Powder",
    "category": "superfoods-functional-seeds",
    "subcategory": "moringa-functional-seeds",
    "type": "bulk",
    "botanicalName": "Moringa oleifera",
    "hsCode": "1211.90",
    "origin": "Tamil Nadu, Andhra Pradesh",
    "forms": [
      "Powder"
    ],
    "description": "Fine green powder from shade-dried moringa leaves for supplements, smoothies and food fortification.",
    "packaging": [
      "25 kg PP or paper bags with inner liner",
      "Retail and private-label packs"
    ],
    "image": "/images/products/moringa-leaf-powder.webp",
    "gallery": [
      "/images/products/moringa-leaf-powder.webp"
    ]
  },
  {
    "slug": "feed-maize",
    "name": "Feed Maize (Corn)",
    "category": "animal-bird-feed",
    "subcategory": "feed-grains",
    "type": "bulk",
    "botanicalName": "Zea mays",
    "hsCode": "1005.90",
    "origin": "Karnataka, Bihar, Madhya Pradesh",
    "forms": [
      "Whole grain"
    ],
    "description": "Yellow maize for poultry and cattle feed manufacturers — for animal feed use only.",
    "packaging": [
      "50 kg PP bags",
      "Loose bulk in container on request",
      "Bird-feed retail packs on request"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "feedOnly": true
  },
  {
    "slug": "feed-sorghum",
    "name": "Feed Sorghum",
    "category": "animal-bird-feed",
    "subcategory": "feed-grains",
    "type": "bulk",
    "botanicalName": "Sorghum bicolor",
    "hsCode": "1007.90",
    "origin": "Maharashtra, Karnataka",
    "forms": [
      "Whole grain"
    ],
    "description": "Sorghum (jowar) grain for animal and poultry feed — for animal feed use only.",
    "packaging": [
      "50 kg PP bags",
      "Loose bulk in container on request",
      "Bird-feed retail packs on request"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/feed-sorghum.webp",
    "gallery": [
      "/images/products/feed-sorghum.webp"
    ],
    "feedOnly": true
  },
  {
    "slug": "feed-millet",
    "name": "Feed Millet",
    "category": "animal-bird-feed",
    "subcategory": "feed-grains",
    "type": "bulk",
    "botanicalName": "Pennisetum glaucum",
    "hsCode": "1008.29",
    "origin": "Rajasthan, Gujarat",
    "forms": [
      "Whole grain"
    ],
    "description": "Pearl millet (bajra) grain for poultry and animal feed — for animal feed use only.",
    "packaging": [
      "50 kg PP bags",
      "Loose bulk in container on request",
      "Bird-feed retail packs on request"
    ],
    "containerLoad": {
      "twenty": "approx. 24–25 MT",
      "forty": "approx. 26 MT (weight-limited)"
    },
    "image": "/images/products/feed-millet.webp",
    "gallery": [
      "/images/products/feed-millet.webp"
    ],
    "feedOnly": true
  },
  {
    "slug": "bird-feed-millet",
    "name": "Millet Seeds for Bird Feed",
    "category": "animal-bird-feed",
    "subcategory": "bird-feed-ingredients",
    "type": "bulk",
    "botanicalName": "Pennisetum glaucum / Setaria italica",
    "hsCode": "1008.29",
    "origin": "Rajasthan, Gujarat",
    "forms": [
      "Whole seeds"
    ],
    "description": "Cleaned millet seeds for bird-feed packers and pet-food manufacturers.",
    "packaging": [
      "50 kg PP bags",
      "Loose bulk in container on request",
      "Bird-feed retail packs on request"
    ],
    "image": "/images/products/bird-feed-millet.webp",
    "gallery": [
      "/images/products/bird-feed-millet.webp"
    ],
    "feedOnly": true
  },
  {
    "slug": "canary-seed",
    "name": "Canary Seed",
    "category": "animal-bird-feed",
    "subcategory": "bird-feed-ingredients",
    "type": "bulk",
    "botanicalName": "Phalaris canariensis",
    "hsCode": "1008.30",
    "forms": [
      "Whole seeds"
    ],
    "description": "Canary seed for bird-feed mixes and pet-food packers.",
    "packaging": [
      "50 kg PP bags",
      "Loose bulk in container on request",
      "Bird-feed retail packs on request"
    ],
    "image": "/images/products/canary-seed.webp",
    "gallery": [
      "/images/products/canary-seed.webp"
    ],
    "feedOnly": true
  },
  {
    "slug": "bird-feed-mix",
    "name": "Bird Feed Mix",
    "category": "animal-bird-feed",
    "subcategory": "bird-feed-ingredients",
    "type": "bulk",
    "botanicalName": "Seed blend",
    "origin": "India",
    "forms": [
      "Mixed seeds"
    ],
    "description": "Seed mixes for cage and wild birds, blended from millets and other seeds to the buyer's recipe.",
    "packaging": [
      "50 kg PP bags",
      "Loose bulk in container on request",
      "Bird-feed retail packs on request"
    ],
    "feedOnly": true
  },
  {
    "slug": "packaged-atta-flours",
    "name": "Packaged Atta & Flours",
    "category": "foodstuff-fmcg",
    "subcategory": "atta-flour",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs"
    ],
    "description": "Packaged atta, besan, rice flour, sooji and other Indian flours in retail packs for grocery importers.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ]
  },
  {
    "slug": "packaged-rice-staples",
    "name": "Packaged Rice & Staples",
    "category": "foodstuff-fmcg",
    "subcategory": "rice-staples",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs"
    ],
    "description": "Packaged basmati and non-basmati rice, poha, sago and other staples in retail packs.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ]
  },
  {
    "slug": "packaged-pulses-dals",
    "name": "Packaged Pulses & Dals",
    "category": "foodstuff-fmcg",
    "subcategory": "pulses-legumes",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs"
    ],
    "description": "Retail packs of toor, moong, urad, chana and masoor dal, plus whole pulses, for Indian grocery shelves.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ]
  },
  {
    "slug": "packaged-spices-masalas",
    "name": "Packaged Spices & Masalas",
    "category": "foodstuff-fmcg",
    "subcategory": "spices-masala",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs"
    ],
    "description": "Retail packs of ground spices, whole spices and ready masalas for Indian and ethnic grocery stores.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ]
  },
  {
    "slug": "biscuits-bakery",
    "name": "Biscuits & Bakery",
    "category": "foodstuff-fmcg",
    "subcategory": "biscuits-bakery",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs",
      "Cartons"
    ],
    "description": "Indian biscuits, cookies, rusk and toast in export cartons, consolidated with other groceries.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ],
    "image": "/images/products/biscuits.webp",
    "gallery": [
      "/images/products/biscuits.webp"
    ]
  },
  {
    "slug": "snacks-namkeen",
    "name": "Snacks & Namkeen",
    "category": "foodstuff-fmcg",
    "subcategory": "snacks-namkeen",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs",
      "Cartons"
    ],
    "description": "Bhujia, sev, mixtures, chips and other namkeen in long shelf-life packs.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ],
    "image": "/images/products/snacks.webp",
    "gallery": [
      "/images/products/snacks.webp"
    ]
  },
  {
    "slug": "sweets-confectionery",
    "name": "Sweets & Confectionery",
    "category": "foodstuff-fmcg",
    "subcategory": "sweets-desserts",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs",
      "Tins"
    ],
    "description": "Packaged Indian sweets, candies and confectionery with export-suitable shelf life.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ],
    "image": "/images/products/sweets.webp",
    "gallery": [
      "/images/products/sweets.webp"
    ]
  },
  {
    "slug": "ready-to-eat-instant-food",
    "name": "Ready-to-Eat & Instant Food",
    "category": "foodstuff-fmcg",
    "subcategory": "ready-to-eat",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs"
    ],
    "description": "Ready-to-eat curries, instant mixes and noodles for diaspora and convenience markets.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ],
    "image": "/images/products/noodles.webp",
    "gallery": [
      "/images/products/noodles.webp"
    ]
  },
  {
    "slug": "pickles-chutneys",
    "name": "Pickles & Chutneys",
    "category": "foodstuff-fmcg",
    "subcategory": "pickles-chutneys",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Jars",
      "Pouches"
    ],
    "description": "Mango, lime, mixed and other Indian pickles and chutneys in glass jars and pouches.",
    "packaging": [
      "300g/500g/1kg Glass and PET Jars",
      "5kg Institutional buckets",
      "Custom Private Label"
    ],
    "image": "/images/products/pickles.webp",
    "gallery": [
      "/images/products/pickles.webp"
    ]
  },
  {
    "slug": "papad-traditional-foods",
    "name": "Papad & Traditional Foods",
    "category": "foodstuff-fmcg",
    "subcategory": "papad",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs"
    ],
    "description": "Papad, fryums, khakhra and other traditional ready-to-cook foods.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ],
    "image": "/images/products/papad.webp",
    "gallery": [
      "/images/products/papad.webp"
    ]
  },
  {
    "slug": "tea-instant-beverages",
    "name": "Tea & Instant Beverages",
    "category": "foodstuff-fmcg",
    "subcategory": "tea",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs",
      "Tea bags"
    ],
    "description": "Packaged Indian tea, masala chai and instant beverage mixes.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ],
    "image": "/images/products/tea.webp",
    "gallery": [
      "/images/products/tea.webp"
    ]
  },
  {
    "slug": "packaged-coffee",
    "name": "Packaged Coffee",
    "category": "foodstuff-fmcg",
    "subcategory": "coffee",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs"
    ],
    "description": "Packaged Indian filter coffee, instant coffee and coffee-chicory blends in retail packs.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ]
  },
  {
    "slug": "beverages",
    "name": "Beverages",
    "category": "foodstuff-fmcg",
    "subcategory": "beverages",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Bottles",
      "Cans",
      "Tetra packs"
    ],
    "description": "Packaged Indian beverages and drink concentrates, subject to destination labelling rules.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ]
  },
  {
    "slug": "dairy-products",
    "name": "Dairy Products",
    "category": "foodstuff-fmcg",
    "subcategory": "dairy",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs",
      "Tins"
    ],
    "description": "Ghee and shelf-stable dairy products, offered only where the destination country allows import from India.",
    "packaging": [
      "200 ml – 15 L tins & bottles",
      "Private label"
    ],
    "image": "/images/products/ghee.webp",
    "gallery": [
      "/images/products/ghee.webp"
    ]
  },
  {
    "slug": "sauces-condiments",
    "name": "Sauces & Condiments",
    "category": "foodstuff-fmcg",
    "subcategory": "sauces",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Bottles",
      "Jars",
      "Pouches"
    ],
    "description": "Indian sauces, cooking pastes, chutneys and condiments in retail packs.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ]
  },
  {
    "slug": "jaggery",
    "name": "Jaggery (Balls & Powder)",
    "category": "foodstuff-fmcg",
    "subcategory": "jaggery",
    "type": "fmcg",
    "origin": "Maharashtra, Uttar Pradesh",
    "forms": [
      "Balls",
      "Blocks",
      "Powder"
    ],
    "description": "Unrefined cane jaggery in balls, blocks and powder, in bulk or retail packs.",
    "packaging": [
      "1 kg / 5 kg packs",
      "25 kg cartons",
      "Private label"
    ],
    "image": "/images/products/jaggery.webp",
    "gallery": [
      "/images/products/jaggery.webp"
    ]
  },
  {
    "slug": "makhana-healthy-snacks",
    "name": "Makhana & Healthy Snacks",
    "category": "foodstuff-fmcg",
    "subcategory": "healthy-snacks",
    "type": "fmcg",
    "origin": "Bihar",
    "forms": [
      "Raw makhana",
      "Roasted snacks"
    ],
    "description": "Phool makhana (fox nuts) — raw or roasted and flavoured — plus other better-for-you Indian snacks.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ]
  },
  {
    "slug": "personal-care",
    "name": "Personal Care Products",
    "category": "foodstuff-fmcg",
    "subcategory": "personal-care",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs"
    ],
    "description": "Indian hair oils, soaps, herbal cosmetics and other personal care products for diaspora markets.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ]
  },
  {
    "slug": "household-home-care",
    "name": "Household & Home Care",
    "category": "foodstuff-fmcg",
    "subcategory": "household-home-care",
    "type": "fmcg",
    "origin": "India",
    "forms": [
      "Retail packs"
    ],
    "description": "Household cleaning products, incense, pooja items and other home-care goods.",
    "packaging": [
      "Retail packs to brand or buyer specification",
      "Export master cartons",
      "Consolidated in mixed containers"
    ]
  },
  {
    "slug": "green-raisins",
    "name": "Green Raisins",
    "category": "raisins",
    "subcategory": "raisin-products",
    "type": "bulk",
    "botanicalName": "Vitis vinifera (Thompson Seedless)",
    "hsCode": "0806.20",
    "origin": "Maharashtra (Sangli, Nashik), Karnataka (Vijayapura)",
    "forms": [
      "Whole seedless"
    ],
    "grades": [
      "Green Raisins (AAA)"
    ],
    "description": "Shade-dried green raisins from Sangli and Nashik, graded by size and colour, the most popular Indian raisin abroad.",
    "specifications": {
      "Moisture": "13.0% - 15.0%",
      "Sulphur Dioxide (SO2)": "Max 1500 ppm (or low SO2 on request)",
      "Size (Count per 100g)": "250 - 320 count / 320 - 450 count (graded)",
      "Damaged / Moldy": "Max 1.0%",
      "Stems / Capstems": "Max 1 per kg"
    },
    "shelfLife": "12 months (refrigerated recommended)",
    "packaging": [
      "10kg Cartons with inner blue lining",
      "Custom retail bags (500g, 1kg)"
    ]
  },
  {
    "slug": "golden-raisins",
    "name": "Golden Raisins",
    "category": "raisins",
    "subcategory": "raisin-products",
    "type": "bulk",
    "botanicalName": "Vitis vinifera (Thompson Seedless)",
    "hsCode": "0806.20",
    "origin": "Maharashtra (Sangli, Nashik), Karnataka (Vijayapura)",
    "forms": [
      "Whole seedless"
    ],
    "description": "Golden raisins with a bright yellow-gold colour, processed and graded for retail, bakery and confectionery.",
    "packaging": [
      "10 kg / 15 kg cartons with inner liner",
      "Retail and private-label packs 250 g – 1 kg"
    ],
    "image": "/images/products/raisins.webp",
    "gallery": [
      "/images/products/raisins.webp"
    ]
  },
  {
    "slug": "black-raisins",
    "name": "Black Raisins",
    "category": "raisins",
    "subcategory": "raisin-products",
    "type": "bulk",
    "botanicalName": "Vitis vinifera",
    "hsCode": "0806.20",
    "origin": "Maharashtra (Sangli, Nashik), Karnataka (Vijayapura)",
    "forms": [
      "Seedless",
      "With seeds"
    ],
    "description": "Sun-dried black raisins, seedless or with seeds, for retail, bakery and traditional uses.",
    "packaging": [
      "10 kg / 15 kg cartons with inner liner",
      "Retail and private-label packs 250 g – 1 kg"
    ]
  },
  {
    "slug": "other-raisin-grades",
    "name": "Other Raisin Grades",
    "category": "raisins",
    "subcategory": "raisin-products",
    "type": "bulk",
    "botanicalName": "Vitis vinifera",
    "hsCode": "0806.20",
    "origin": "Maharashtra, Karnataka",
    "forms": [
      "Whole"
    ],
    "description": "Other raisin types, sizes and grades sourced to buyer specification — share the colour, size and moisture you need.",
    "packaging": [
      "10 kg / 15 kg cartons with inner liner",
      "Retail and private-label packs 250 g – 1 kg"
    ]
  }
];
