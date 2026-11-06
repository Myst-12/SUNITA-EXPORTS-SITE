// Longer market copy for non-Gulf countries: what sells, the import rules and labels, documents and ports,
// buyer FAQs, and links to the official regulator so buyers can check the rules themselves.
// Rules are summarised in general terms; importers should confirm current requirements with their broker.

const src = (label, url) => ({ label, url });

export const MARKET_CONTENT_WORLD = {
  usa: {
    featured: ['turmeric-powder', 'cumin-seeds', '1121-basmati-rice', 'sona-masuri-rice', 'black-pepper', 'chana-dal', 'snacks-namkeen', 'garam-masala'],
    sections: [
      { title: 'Indian spices and groceries for US importers', paras: [
        'The United States is one of the largest buyers of Indian spices and the home of a large Indian community, so demand runs from bulk turmeric, cumin, chilli and pepper for spice packers to basmati, Sona Masuri, dals and branded snacks for Indian grocery chains. We ship full containers of single products and mixed containers for distributors and stores.',
      ] },
      { title: 'FDA rules for importing food from India', paras: [
        'Food shipped to the US must come from a facility registered with the FDA, and the FDA must receive Prior Notice before the shipment arrives. The US importer is responsible under the Foreign Supplier Verification Program (FSVP) for checking that the foreign supplier meets US safety standards. Spices are often sampled for Salmonella and filth, so many buyers ask for steam-sterilised spices and a certificate of analysis.',
        'Retail packs need US-style labels: product name, net quantity in both US and metric units, ingredients, a Nutrition Facts panel, allergen statements (including sesame) and the name of the importer or distributor. We can print compliant labels or apply stickers before shipping.',
      ] },
      { title: 'Documents and ports', paras: [
        'We send the commercial invoice, packing list, bill of lading, certificate of origin, phytosanitary certificate where required, and lab reports, and provide the details your broker needs for Prior Notice. We quote CFR / CIF to New York / New Jersey, Savannah, Houston, Los Angeles / Long Beach and inland points such as Chicago.',
      ] },
    ],
    faqs: [
      { question: 'Who files FDA Prior Notice for shipments from India?', answer: 'Usually your customs broker files it before arrival. We provide the product, facility and shipment details they need.' },
      { question: 'Do spices need steam sterilisation for the US?', answer: 'It is not mandatory for every product, but US buyers often require it to meet Salmonella limits. We supply steam-sterilised spices on request.' },
      { question: 'Can you ship FDA-compliant retail packs?', answer: 'Yes. We print or sticker labels with US units, Nutrition Facts, ingredients, allergens and importer details.' },
    ],
    sources: [src('US FDA: Importing food products into the United States', 'https://www.fda.gov/food/food-imports-exports/importing-food-products-united-states'), src('US FDA: Prior Notice of imported foods', 'https://www.fda.gov/food/importing-food-products-united-states/prior-notice-imported-foods')],
  },
  uk: {
    featured: ['turmeric-powder', 'cumin-seeds', '1121-basmati-rice', 'chana-dal', 'red-lentils', 'snacks-namkeen', 'garam-masala', 'packaged-atta-flours'],
    sections: [
      { title: 'Indian food supplier for UK importers and cash-and-carries', paras: [
        'The UK has one of the oldest Indian food trades in Europe, from spice importers and curry-house suppliers to cash-and-carries and supermarket world-food aisles. Buyers take bulk spices, basmati, dals, flours and branded Indian groceries, often in one mixed container.',
      ] },
      { title: 'UK import rules after Brexit', paras: [
        'Food from India is checked under UK rules set by the Food Standards Agency and Defra. Some Indian products are on the UK’s list of high-risk food and feed with increased checks at the border, and high-risk goods must be pre-notified through the IPAFFS system before arrival. Pesticide-residue limits follow UK law, which is close to EU limits, so lab reports should be tested against UK MRLs.',
        'Retail labels must be in English and show the name, ingredients with the 14 allergens emphasised, net quantity, best-before date, storage conditions, country of origin and a UK food business address.',
      ] },
      { title: 'Documents and ports', paras: [
        'We prepare the commercial invoice, packing list, bill of lading, certificate of origin, phytosanitary and health certificates where required, and lab reports. We quote to Felixstowe, Southampton and London Gateway.',
      ] },
    ],
    faqs: [
      { question: 'Do Indian spices face extra checks in the UK?', answer: 'Some products from India are on the UK high-risk list with a set rate of border checks. We test lots against UK limits before shipping to reduce the risk of a hold.' },
      { question: 'Do you label for the UK market?', answer: 'Yes. English labels with UK allergen rules and your UK address, printed or applied in India.' },
      { question: 'Can you send mixed containers to Felixstowe?', answer: 'Yes, spices, rice, pulses and FMCG together in one 20 ft or 40 ft container.' },
    ],
    sources: [src('UK Food Standards Agency: importing food', 'https://www.food.gov.uk/business-guidance/importing-food'), src('GOV.UK: importing high-risk food and feed', 'https://www.gov.uk/guidance/importing-high-risk-food-and-feed-not-of-animal-origin')],
  },
  canada: {
    featured: ['1121-basmati-rice', 'sona-masuri-rice', 'chana-dal', 'split-toor-dal', 'turmeric-powder', 'cumin-seeds', 'snacks-namkeen', 'packaged-atta-flours'],
    sections: [
      { title: 'Indian grocery and spice supplier for Canada', paras: [
        'Canada’s large South Asian community in Toronto, Vancouver, Calgary and Montreal keeps strong demand for basmati, Sona Masuri, dals, atta, spices and branded snacks. Distributors and grocery chains usually order mixed containers that carry their whole Indian range.',
      ] },
      { title: 'CFIA rules: licence and bilingual labels', paras: [
        'Under the Safe Food for Canadians Regulations, most Canadian food importers need a Safe Food for Canadians licence from the Canadian Food Inspection Agency (CFIA) and must keep preventive controls and traceability records for what they import.',
        'Retail labels must be bilingual, English and French, and include the common name, net quantity in metric units, ingredients, allergens, a Nutrition Facts table and the Canadian dealer’s name and address. We can print bilingual labels or apply stickers before shipping.',
      ] },
      { title: 'Documents and ports', paras: [
        'We supply the commercial invoice (or Canada Customs Invoice details), packing list, bill of lading, certificate of origin, phytosanitary certificate where required and lab reports. We quote to Vancouver, Montreal and Halifax, and inland to Toronto by rail.',
      ] },
    ],
    faqs: [
      { question: 'Does my company need a CFIA licence to import from you?', answer: 'Most food importers in Canada need a Safe Food for Canadians licence. We supply the documents you need to keep your records.' },
      { question: 'Can labels be in English and French?', answer: 'Yes. We print bilingual labels or apply bilingual stickers in India.' },
      { question: 'Which port is best for Toronto?', answer: 'Most Toronto cargo moves via Montreal or Vancouver and then by rail. We quote both routings.' },
    ],
    sources: [src('Canadian Food Inspection Agency: importing food', 'https://inspection.canada.ca/en/importing-food-plants-animals/food-imports'), src('CFIA: food labelling requirements', 'https://inspection.canada.ca/en/food-labels/labelling')],
  },
  australia: {
    featured: ['turmeric-powder', 'cumin-seeds', 'chana-dal', 'red-lentils', '1121-basmati-rice', 'snacks-namkeen', 'garam-masala', 'packaged-atta-flours'],
    sections: [
      { title: 'Indian spices and groceries for Australian importers', paras: [
        'Australia has one of the fastest-growing Indian communities, centred on Melbourne, Sydney, Brisbane and Perth. Importers buy spices, dals, rice, flours and branded snacks, and mixed containers are the usual way to bring the whole range in.',
      ] },
      { title: 'Biosecurity and food standards', paras: [
        'Australia has some of the strictest biosecurity rules in the world. Import conditions for each product are set in the Department of Agriculture’s BICON system: many plant products need a phytosanitary certificate, some seeds and spices must be treated or non-viable, and wooden pallets must be ISPM-15 treated. Food is also checked under the Imported Food Inspection Scheme.',
        'Labels must meet the Food Standards Australia New Zealand (FSANZ) Code, with English labelling, ingredients, allergens, a nutrition information panel, country-of-origin labelling and the Australian supplier’s details.',
      ] },
      { title: 'Documents and ports', paras: [
        'We check BICON conditions for every product before you order, and send the commercial invoice, packing list, bill of lading, certificate of origin (including for the India–Australia trade agreement), phytosanitary and treatment certificates and lab reports. We quote to Melbourne, Sydney, Brisbane, Fremantle and Adelaide.',
      ] },
    ],
    faqs: [
      { question: 'Can every Indian spice be imported into Australia?', answer: 'Most can, but conditions differ by product in BICON. Some seeds need treatment or a non-viability certificate. We check before you order.' },
      { question: 'Does the India–Australia trade agreement lower duty?', answer: 'Many goods qualify for lower or zero duty with a valid certificate of origin under the agreement. We issue it with the shipment.' },
      { question: 'Do you use ISPM-15 pallets?', answer: 'Yes, or we floor-load bags with no wood to avoid timber inspections.' },
    ],
    sources: [src('Australian Government BICON: import conditions', 'https://bicon.agriculture.gov.au/'), src('Australian Government: Imported Food Inspection Scheme', 'https://www.agriculture.gov.au/biosecurity-trade/import/goods/food/inspection-testing')],
  },
  'new-zealand': {
    featured: ['turmeric-powder', 'cumin-seeds', 'chana-dal', '1121-basmati-rice', 'snacks-namkeen', 'garam-masala', 'packaged-atta-flours', 'green-cardamom'],
    sections: [
      { title: 'Indian food supplier for New Zealand', paras: [
        'New Zealand’s Indian community in Auckland, Wellington and Christchurch buys the full Indian grocery range. Importers usually combine spices, rice, pulses and packaged foods in one container to keep freight per carton low.',
      ] },
      { title: 'MPI import rules and labels', paras: [
        'Food imports are regulated by New Zealand’s Ministry for Primary Industries (MPI). Importers must be registered food importers, and plant products must meet MPI import health standards, which can require phytosanitary certificates or treatment. Some foods of higher risk need extra clearance at the border.',
        'Labels follow the joint FSANZ Food Standards Code shared with Australia: English labels, ingredients, allergens, nutrition information and the New Zealand importer’s details.',
      ] },
      { title: 'Documents and ports', paras: [
        'We send the commercial invoice, packing list, bill of lading, certificate of origin, phytosanitary certificate where required and lab reports. We quote to Auckland, Tauranga and Lyttelton.',
      ] },
    ],
    faqs: [
      { question: 'Do I need to be a registered food importer in NZ?', answer: 'Yes, MPI requires food importers to be registered. We provide the supplier documents you need.' },
      { question: 'Are labels for Australia and NZ the same?', answer: 'Largely, as both use the FSANZ code, but importer details differ. We can label for either market.' },
      { question: 'Can you ship mixed containers to Auckland?', answer: 'Yes, with spices, rice, pulses and FMCG together.' },
    ],
    sources: [src('New Zealand MPI: importing food', 'https://www.mpi.govt.nz/import/food/'), src('FSANZ: Food Standards Code', 'https://www.foodstandards.gov.au/food-standards-code')],
  },
  singapore: {
    featured: ['turmeric-powder', 'black-pepper', 'chana-dal', 'ponni-rice', 'snacks-namkeen', 'garam-masala', 'green-cardamom', 'red-chilli-powder'],
    sections: [
      { title: 'Indian spices and groceries for Singapore', paras: [
        'Singapore is both a large Indian-food market, with Little India and many restaurants, and a re-export hub for South-East Asia. Importers buy spices, South Indian rice such as Ponni, dals, snacks and sweets, often in mixed containers.',
      ] },
      { title: 'SFA licences and permits', paras: [
        'Food imports are regulated by the Singapore Food Agency (SFA). Importers need a licence or registration from the SFA, and each consignment needs an import permit applied for through the TradeNet system. Labels must be in English and show the product name, ingredients, allergens, net quantity, date marking and the local importer’s name and address.',
      ] },
      { title: 'Documents and port', paras: [
        'We send the commercial invoice, packing list, bill of lading, certificate of origin, health or phytosanitary certificates where required and lab reports. Shipments go to the Port of Singapore.',
      ] },
    ],
    faqs: [
      { question: 'Who applies for the Singapore import permit?', answer: 'The licensed Singapore importer applies through TradeNet for each consignment. We send the documents needed.' },
      { question: 'Do you supply South Indian rice to Singapore?', answer: 'Yes, Ponni, Sona Masuri, idli rice and others, raw or boiled.' },
      { question: 'Can you ship to Singapore for re-export?', answer: 'Yes, and we can label for the final market if you tell us where the goods are going.' },
    ],
    sources: [src('Singapore Food Agency: importing food', 'https://www.sfa.gov.sg/food-import-export/commercial-food-imports')],
  },
  malaysia: {
    featured: ['turmeric-powder', 'cumin-seeds', 'chana-dal', 'ponni-rice', 'red-chilli-powder', 'snacks-namkeen', 'garam-masala', 'green-cardamom'],
    sections: [
      { title: 'Indian food supplier for Malaysia', paras: [
        'Malaysia’s Indian community and its love of curry keep steady demand for spices, chilli, dals, rice, snacks and sweets. Importers in Klang Valley, Penang and Johor buy bulk spices for grinding and branded groceries for retail.',
      ] },
      { title: 'Import rules, halal and labels', paras: [
        'Imported food is checked by Malaysia’s Ministry of Health under the Food Act and Food Regulations, and plant products also pass through MAQIS quarantine with phytosanitary certificates. Halal certification from a body recognised by JAKIM is important for many buyers.',
        'Labels must be in Bahasa Malaysia or English, with the product name, ingredients, net quantity, date marking and the importer’s details.',
      ] },
      { title: 'Documents and ports', paras: [
        'We provide the commercial invoice, packing list, bill of lading, certificate of origin (including under the ASEAN–India agreement), phytosanitary and halal certificates where needed and lab reports. We quote to Port Klang, Penang and Pasir Gudang.',
      ] },
    ],
    faqs: [
      { question: 'Do your products have halal certificates for Malaysia?', answer: 'Halal certificates from recognised bodies are available for many products; tell us which ones you need.' },
      { question: 'Does the ASEAN–India agreement reduce duty?', answer: 'Many goods qualify with a valid certificate of origin under the agreement. We issue it with the shipment.' },
      { question: 'Which Malaysian ports do you ship to?', answer: 'Port Klang, Penang and Pasir Gudang, and others on request.' },
    ],
    sources: [src('Malaysia Ministry of Health: Food Safety and Quality Division', 'https://hq.moh.gov.my/fsq/'), src('MAQIS: Malaysian Quarantine and Inspection Services', 'https://www.maqis.gov.my/')],
  },
  japan: {
    featured: ['hulled-white-sesame', 'black-sesame', 'turmeric-powder', 'cumin-seeds', 'black-pepper', 'green-cardamom', 'curry-powder', 'psyllium-husk'],
    sections: [
      { title: 'Indian sesame, spices and curry ingredients for Japan', paras: [
        'Japan buys Indian sesame for food manufacturing, spices and curry-powder ingredients for its large curry industry, and psyllium for health foods. Japanese buyers are known for strict quality checks, so consistent, well-documented lots matter more than price.',
      ] },
      { title: 'Food Sanitation Act and residue limits', paras: [
        'Under Japan’s Food Sanitation Act, every food import must be notified to a quarantine station of the Ministry of Health, Labour and Welfare (MHLW) at the port, and may be inspected. Japan uses a positive-list system for pesticide residues, with a default limit of 0.01 ppm for substances without a set limit, so lab testing against Japanese limits is essential.',
        'Retail labels must be in Japanese, usually applied by the importer, with the product name, ingredients, allergens, net content, best-before date and importer details.',
      ] },
      { title: 'Documents and ports', paras: [
        'We send the commercial invoice, packing list, bill of lading, certificate of origin (including under the India–Japan CEPA), phytosanitary certificate and lab reports tested against Japanese limits. We quote to Tokyo, Yokohama, Nagoya, Osaka and Kobe.',
      ] },
    ],
    faqs: [
      { question: 'Can you test against Japan’s residue limits?', answer: 'Yes. Lots for Japan are tested against Japanese MRLs, including the 0.01 ppm default, before shipment.' },
      { question: 'Do you supply sesame for Japanese food makers?', answer: 'Yes, hulled and natural white sesame and black sesame, Sortex-cleaned and tested.' },
      { question: 'Does the India–Japan CEPA lower duty?', answer: 'Many goods qualify with a valid certificate of origin under the agreement.' },
    ],
    sources: [src('MHLW Japan: imported foods safety', 'https://www.mhlw.go.jp/english/topics/importedfoods/')],
  },
  turkey: {
    featured: ['hulled-white-sesame', 'natural-white-sesame', 'cumin-seeds', 'black-pepper', 'red-chilli-powder', 'chana-dal', 'turmeric-powder', 'green-cardamom'],
    sections: [
      { title: 'Indian sesame and spices for Türkiye', paras: [
        'Türkiye is a large buyer of sesame for tahini and halva, and of spices such as cumin, pepper and chilli for its food industry. Buyers are mostly processors who need consistent, clean lots in bulk.',
      ] },
      { title: 'Import rules and labels', paras: [
        'Food imports are controlled by Türkiye’s Ministry of Agriculture and Forestry, which checks documents and samples at the border. Residue and contaminant limits are closely aligned with EU rules, so testing to EU-style limits is a good guide. Retail labels must be in Turkish.',
      ] },
      { title: 'Documents and ports', paras: [
        'We send the commercial invoice, packing list, bill of lading, certificate of origin, phytosanitary certificate and lab reports. We quote to Mersin, Istanbul (Ambarlı) and İzmir.',
      ] },
    ],
    faqs: [
      { question: 'Do you supply sesame for tahini makers?', answer: 'Yes, hulled sesame at 99.95% Sortex purity, tested for Salmonella and residues.' },
      { question: 'Which Turkish ports do you ship to?', answer: 'Mersin, Istanbul (Ambarlı) and İzmir.' },
      { question: 'Are lots tested for residues?', answer: 'Yes, against limits close to EU MRLs, which Türkiye largely follows.' },
    ],
    sources: [src('Republic of Türkiye Ministry of Agriculture and Forestry', 'https://www.tarimorman.gov.tr/')],
  },
  europe: {
    featured: ['turmeric-powder', 'cumin-seeds', 'hulled-white-sesame', 'psyllium-husk', 'black-pepper', 'fennel-seeds', '1718-basmati-rice', 'dehydrated-white-onion-flakes'],
    sections: [
      { title: 'Indian spices, seeds and botanicals for the EU', paras: [
        'European buyers take Indian spices, sesame, psyllium, herbs and dehydrated onion for food manufacturing, plus basmati and groceries for retail. The EU has the strictest residue and contaminant rules of any of our markets, so every lot is tested before it ships.',
      ] },
      { title: 'EU residue limits and border controls', paras: [
        'Pesticide residues must meet EU maximum residue levels (Regulation (EC) No 396/2005), which are often set at the lowest level a lab can measure. Some products from India are listed under Regulation (EU) 2019/1793 for increased border checks or special conditions, which can require an official certificate and lab report with each consignment. Ethylene oxide is banned in food in the EU.',
        'Shipments are pre-notified through the EU’s TRACES system (CHED-D) where required, and retail labels must follow Regulation (EU) No 1169/2011, in the language of the country of sale.',
      ] },
      { title: 'Documents and ports', paras: [
        'We provide the commercial invoice, packing list, bill of lading, certificate of origin, phytosanitary certificate, official certificates where 2019/1793 applies and lab reports tested to EU limits. We quote to Rotterdam, Antwerp, Hamburg, Felixstowe and other EU ports.',
      ] },
    ],
    faqs: [
      { question: 'Are Indian spices tested against EU MRLs?', answer: 'Yes, every lot for Europe is tested against EU maximum residue levels before shipment.' },
      { question: 'What is Regulation 2019/1793?', answer: 'An EU rule that sets increased border checks or special conditions for certain foods from certain countries. If your product is listed for India, we arrange the official certificate and lab report.' },
      { question: 'Do you avoid ethylene oxide?', answer: 'Yes. Spices are steam-treated, never ethylene oxide, which is banned in the EU.' },
    ],
    sources: [src('European Commission: EU pesticide residues database', 'https://food.ec.europa.eu/plants/pesticides/eu-pesticides-database_en'), src('EUR-Lex: Regulation (EU) 2019/1793', 'https://eur-lex.europa.eu/eli/reg_impl/2019/1793/oj')],
  },
  'east-africa': {
    featured: ['1121-basmati-rice', 'ir64-rice', 'parboiled-rice', 'chana-dal', 'split-toor-dal', 'turmeric-powder', 'snacks-namkeen', 'packaged-spices-masalas'],
    sections: [
      { title: 'Indian rice, pulses and groceries for East Africa', paras: [
        'Kenya, Uganda and Tanzania buy Indian rice, pulses, spices and packaged foods for both their Indian communities and the wider market. Mombasa is the main gateway, with goods moving inland to Nairobi and Kampala.',
      ] },
      { title: 'PVoC certificates and standards', paras: [
        'Kenya and Uganda run Pre-Export Verification of Conformity (PVoC) programmes: many goods need a Certificate of Conformity from an approved inspection body before shipping, issued against KEBS (Kenya) or UNBS (Uganda) standards. Plant products also need phytosanitary certificates, checked by KEPHIS in Kenya.',
      ] },
      { title: 'Documents and ports', paras: [
        'We arrange PVoC inspection, the Certificate of Conformity, the commercial invoice, packing list, bill of lading, certificate of origin and phytosanitary certificate. We quote to Mombasa and Dar es Salaam, with transit cargo for Uganda via Mombasa.',
      ] },
    ],
    faqs: [
      { question: 'Do you arrange PVoC certificates for Kenya and Uganda?', answer: 'Yes. We book the inspection in India so the Certificate of Conformity is ready before shipping.' },
      { question: 'Can you ship to Kampala?', answer: 'Yes, via Mombasa with transit documents to Uganda.' },
      { question: 'Do you supply parboiled rice for East Africa?', answer: 'Yes, IR64 and other parboiled rice in 25 and 50 kg bags.' },
    ],
    sources: [src('Kenya Bureau of Standards: PVoC', 'https://www.kebs.org/'), src('KEPHIS: Kenya Plant Health Inspectorate Service', 'https://www.kephis.org/')],
  },
  germany: {
    featured: ['turmeric-powder', 'cumin-seeds', 'psyllium-husk', 'hulled-white-sesame', 'black-pepper', 'fennel-seeds', 'ashwagandha-root', 'dehydrated-white-onion-flakes'],
    sections: [
      { title: 'Indian spices and botanicals for German buyers', paras: [
        'Germany is Europe’s largest food market and a major buyer of spices, herbs, psyllium and botanicals for its food, tea and supplement industries. German buyers expect full documentation and tight residue control, and many prefer organic or IPM-grown lots.',
      ] },
      { title: 'EU rules, applied in Germany', paras: [
        'Food from India must meet EU law: EU maximum residue levels, contaminant limits and, for listed products, the increased checks of Regulation (EU) 2019/1793. In Germany, food controls are run by the federal states under the Federal Office of Consumer Protection and Food Safety (BVL). Retail labels must be in German and follow EU Regulation 1169/2011.',
      ] },
      { title: 'Documents and ports', paras: [
        'We provide the full EU document set with lab reports tested to EU limits, and quote to Hamburg and Bremerhaven, or Rotterdam and Antwerp with onward transport.',
      ] },
    ],
    faqs: [
      { question: 'Do you supply organic spices to Germany?', answer: 'Yes, organic and IPM-grown lots with the certificates German buyers require.' },
      { question: 'Do you ship to Hamburg?', answer: 'Yes, to Hamburg and Bremerhaven, or via Rotterdam and Antwerp.' },
      { question: 'Can labels be in German?', answer: 'Yes, German retail labels to EU rules, printed or applied in India.' },
    ],
    sources: [src('BVL: Federal Office of Consumer Protection and Food Safety', 'https://www.bvl.bund.de/EN/'), src('European Commission: EU pesticide residues database', 'https://food.ec.europa.eu/plants/pesticides/eu-pesticides-database_en')],
  },
  netherlands: {
    featured: ['turmeric-powder', 'cumin-seeds', 'hulled-white-sesame', 'psyllium-husk', 'dehydrated-white-onion-flakes', 'black-pepper', '1121-basmati-rice', 'chana-dal'],
    sections: [
      { title: 'Rotterdam: the gateway for Indian food into Europe', paras: [
        'Much of Europe’s spice, seed and dried-ingredient trade passes through the Netherlands, where Rotterdam’s importers, traders and processors clean, blend and redistribute across the EU. Dutch buyers take bulk spices, sesame, psyllium, dehydrated onion and rice for onward sale.',
      ] },
      { title: 'EU rules, applied in the Netherlands', paras: [
        'Food from India must meet EU maximum residue levels, contaminant limits and, for listed products, Regulation (EU) 2019/1793 border checks. In the Netherlands, controls are carried out by the Netherlands Food and Consumer Product Safety Authority (NVWA). Goods cleared in Rotterdam can move freely within the EU.',
      ] },
      { title: 'Documents and port', paras: [
        'We provide the full EU document set and lab reports tested to EU limits, and quote to Rotterdam, with onward delivery across Europe arranged by your forwarder.',
      ] },
    ],
    faqs: [
      { question: 'Can goods cleared in Rotterdam be sold across the EU?', answer: 'Yes. Once cleared in the Netherlands, goods move freely within the EU single market.' },
      { question: 'Do you supply processors who clean and blend?', answer: 'Yes, bulk lots in the grades processors ask for, with lab reports per lot.' },
      { question: 'Which port do you ship to?', answer: 'Rotterdam, and Antwerp on request.' },
    ],
    sources: [src('NVWA: Netherlands Food and Consumer Product Safety Authority', 'https://english.nvwa.nl/'), src('EUR-Lex: Regulation (EU) 2019/1793', 'https://eur-lex.europa.eu/eli/reg_impl/2019/1793/oj')],
  },
  'south-africa': {
    featured: ['1121-basmati-rice', 'chana-dal', 'split-toor-dal', 'turmeric-powder', 'red-chilli-powder', 'garam-masala', 'snacks-namkeen', 'packaged-spices-masalas'],
    sections: [
      { title: 'Indian food supplier for South Africa', paras: [
        'South Africa has one of the largest Indian-origin communities outside Asia, centred on Durban, with strong demand for spices, masalas, rice, dals and snacks. Wholesalers and retailers buy bulk spices for local packing as well as branded Indian groceries.',
      ] },
      { title: 'Import permits and labels', paras: [
        'Plant products may need an import permit from South Africa’s Department of Agriculture before shipping, together with a phytosanitary certificate. Imported foodstuffs must meet the labelling regulations under the Foodstuffs, Cosmetics and Disinfectants Act, with English labels, ingredients, allergens and the importer’s details.',
      ] },
      { title: 'Documents and ports', paras: [
        'We send the commercial invoice, packing list, bill of lading, certificate of origin, phytosanitary certificate and lab reports, matched to your import permit. We quote to Durban and Cape Town.',
      ] },
    ],
    faqs: [
      { question: 'Do I need an import permit for spices?', answer: 'Some plant products need a permit from the Department of Agriculture. Check with your agent; we match our documents to the permit.' },
      { question: 'Do you ship to Durban?', answer: 'Yes, Durban is our main South African port, with Cape Town on request.' },
      { question: 'Can you supply masalas for local packing?', answer: 'Yes, bulk masalas and spice powders in 25 kg bags, or retail packs under your brand.' },
    ],
    sources: [src('South Africa Department of Agriculture: plant health imports', 'https://www.dalrrd.gov.za/')],
  },
  egypt: {
    featured: ['hulled-white-sesame', 'natural-white-sesame', 'cumin-seeds', 'black-pepper', 'turmeric-powder', 'broad-beans', 'red-lentils', 'green-cardamom'],
    sections: [
      { title: 'Indian sesame, spices and pulses for Egypt', paras: [
        'Egypt is a large buyer of Indian sesame for tahini and halawa, spices such as cumin, pepper and turmeric, and pulses including lentils and fava beans. Most buyers are processors and wholesalers importing in full containers.',
      ] },
      { title: 'NFSA rules and Arabic labels', paras: [
        'Food imports into Egypt are controlled by the National Food Safety Authority (NFSA), which inspects and samples shipments at the port. Importers must be registered, and retail packs need Arabic labelling with the product name, ingredients, net weight, production and expiry dates and importer details.',
      ] },
      { title: 'Documents and ports', paras: [
        'We send the commercial invoice, packing list, bill of lading, certificate of origin (chamber attested where required), phytosanitary certificate and lab reports. We quote to Alexandria, Damietta, Port Said and Sokhna.',
      ] },
    ],
    faqs: [
      { question: 'Do you supply sesame for Egyptian tahini makers?', answer: 'Yes, hulled and natural sesame, Sortex-cleaned and tested.' },
      { question: 'Which Egyptian ports do you ship to?', answer: 'Alexandria, Damietta, Port Said and Sokhna.' },
      { question: 'Can you provide Arabic labels?', answer: 'Yes, Arabic labels or stickers applied before shipping.' },
    ],
    sources: [src('Egypt National Food Safety Authority (NFSA)', 'https://www.nfsa.gov.eg/')],
  },
};
