// Full write-ups for the priority products: an overview, typical specifications for products that had none,
// and questions buyers ask about this product in particular. Shown on the product page; other products use
// their catalogue data only. Specifications are typical trade values, confirmed per contract and lot.
const q = (question, answer) => ({ question, answer });

export const PRODUCT_CONTENT = {
  'cumin-seeds': {
    overview: [
      'Indian cumin (jeera) is grown in north Gujarat and western Rajasthan and traded at Unjha, the largest seed-spice market in the world. We supply it whole, machine-cleaned and graded to the purity your market needs, from 99% Singapore grade for grinders to 99.9% Sortex-cleaned seed for supermarket packs in Europe and the USA.',
      'New-crop cumin arrives between February and April, when choice and colour are best. Every lot is sampled before you confirm and tested for moisture, volatile oil, ash, pesticide residues and microbiology against the limits of your country. Steam sterilisation is available for food manufacturers who need low microbial counts.',
    ],
    faqs: [
      q('Which cumin grade should I buy?', 'Grinders usually buy Singapore grade (99%), whole-seed packers buy Europe grade (99.5%) and premium retail or EU buyers buy Sortex-cleaned 99.9%. Tell us your use and market and we suggest the grade.'),
      q('When is the best time to buy Indian cumin?', 'New crop reaches Unjha from February to April. Prices and colour are usually best soon after harvest, so many buyers book part of their yearly need then.'),
      q('Can cumin be steam sterilised?', 'Yes. Steam treatment lowers total plate count, yeast and mould without chemicals, for seasonings and ready-to-eat foods.'),
    ],
  },
  'coriander-seeds': {
    overview: [
      'Indian coriander seed comes mainly from Rajasthan, Madhya Pradesh and Gujarat and is graded by colour and cleaning: Eagle (greenest), Scooter, single and double Parrot, and Badami for grinding. We supply whole seed and splits (dal) for grinders, blenders, pickle makers and mukhwas producers.',
      'The new crop arrives in March and April. Each lot is checked for moisture, purity, split percentage and volatile oil, and tested for pesticide residues against your market. Coriander powder is also available in mesh sizes to your specification.',
    ],
    faqs: [
      q('What is the difference between Eagle and Scooter coriander?', 'Eagle is the greenest, brightest seed, preferred for whole-seed retail. Scooter is slightly less green and widely used by grinders. Both are machine-cleaned.'),
      q('Do you supply coriander splits?', 'Yes, coriander dal (splits) for mukhwas, snacks and grinding, packed in 25 kg bags.'),
      q('Is coriander tested for pesticides?', 'Yes. Lots are tested against the residue limits of your country, including EU MRLs, and the report is shared before shipment.'),
    ],
  },
  'turmeric-fingers': {
    overview: [
      'We supply Indian turmeric fingers from the main origins: Erode and Salem in Tamil Nadu, Nizamabad in Telangana and Rajapuri from Maharashtra. Fingers are boiled, dried and polished, then graded for size, colour and curcumin, mostly for grinders, curcumin extractors and whole-spice packers.',
      'Curcumin usually ranges from about 2% to 5% depending on origin. Each lot can be tested for curcumin, moisture, ash, lead and other heavy metals, aflatoxins and pesticide residues. Unpolished fingers are available for clean-label and organic lines.',
    ],
    specs: { Curcumin: '2.0% – 5.0% (by origin)', Moisture: 'Max 10.0%', 'Total Ash': 'Max 7.0%', 'Acid Insoluble Ash': 'Max 1.5%', 'Foreign Matter': 'Max 1.0%', Lead: 'Within market limits; tested per lot' },
    faqs: [
      q('Which turmeric origin has the highest curcumin?', 'Rajapuri and Lakadong-type turmeric are known for high curcumin. Erode and Nizamabad are the volume origins. State your minimum curcumin and we match the origin.'),
      q('Do you test turmeric for lead?', 'Yes. Because of lead-chromate adulteration cases in some markets, many buyers ask for a heavy-metals test, and we share it with the certificate of analysis.'),
      q('Fingers or bulbs: which should I buy?', 'Fingers are preferred for grinding and whole sale; bulbs (the central rhizome) are cheaper and also ground.'),
    ],
  },
  'turmeric-powder': {
    overview: [
      'Our turmeric powder is milled from Indian turmeric fingers to the mesh size and colour you specify, for spice packers, food manufacturers and retail brands. It is sold on curcumin content, colour, moisture and cleanliness, with steam-sterilised powder available for foods that are not cooked again.',
      'Every lot ships with a certificate of analysis covering curcumin, moisture, ash, microbiology, aflatoxins and pesticide residues, and heavy metals including lead on request. Private-label retail packs from 50 g are available alongside 25 kg bulk bags.',
    ],
    faqs: [
      q('What curcumin level is available?', 'Standard powders are around 2–3% curcumin; higher-curcumin origins give 3–5%. Tell us your target and test method (spectrophotometric or HPLC).'),
      q('Is your turmeric powder free of added colour?', 'Yes. It is pure ground turmeric, and lots can be tested for lead chromate and other adulterants.'),
      q('What mesh sizes do you grind?', 'Commonly 60 to 80 mesh; finer or coarser to your specification.'),
    ],
  },
  'red-chilli-powder': {
    overview: [
      'Red chilli powder is ground from Indian chillies, blended to reach the colour (ASTA) and heat (SHU) you need. Byadgi and Kashmiri give colour with low heat; Guntur and Teja add heat. We grind for spice brands, snack seasoning makers, sauce producers and food service.',
      'Lots are tested for colour value, pungency, moisture, aflatoxins, microbiology and pesticide residues. Steam-sterilised powder is available, and retail private-label packs can be filled alongside bulk bags in one mixed container.',
    ],
    faqs: [
      q('Can you match a specific colour and heat?', 'Yes. Give us your target ASTA colour and SHU heat, or a sample, and we blend chilli varieties to match.'),
      q('How do you control aflatoxin in chilli powder?', 'Chillies are bought dry, stored dry and tested per lot; lots above your limit are rejected before grinding.'),
      q('Do you supply stemless chilli for powder?', 'Yes. Stemless chillies give a cleaner powder and are used for premium grades.'),
    ],
  },
  'guntur-chilli': {
    overview: [
      'Guntur chilli from Andhra Pradesh is the volume dried chilli of India, mainly the S4 Sannam / 334 type with medium-high heat and good red colour. Importers use it for chilli powder, sauces, pickles and general cooking, whole or crushed.',
      'Chillies are traded with stem or stemless, graded by colour, pod length and broken percentage. The new crop arrives from January, with peak trading from February to April. Each lot is tested for moisture, aflatoxins and pesticide residues.',
    ],
    specs: { 'Colour (ASTA)': '60 – 100', 'Pungency (SHU)': '25,000 – 40,000', Moisture: 'Max 11.0%', 'Broken pods': 'Max 5%', Aflatoxin: 'Within market limits; tested per lot', 'Foreign Matter': 'Max 1.0%' },
    faqs: [
      q('Stem or stemless Guntur chilli?', 'Both. Stemless costs more but saves labour and gives cleaner powder.'),
      q('How hot is Guntur Sannam chilli?', 'Typically about 25,000 to 40,000 SHU, varying by lot and season.'),
      q('When is the Guntur chilli season?', 'New crop from about January, with most trading from February to April.'),
    ],
  },
  'green-cardamom': {
    overview: [
      'Green cardamom from the Idukki hills of Kerala and neighbouring Tamil Nadu and Karnataka is sorted by pod size (8 mm and above, 7–8 mm, 6–7 mm) and by colour. Large green pods go to Gulf coffee and gifting markets; smaller sizes and seeds are used for grinding and food manufacturing.',
      'We check colour, litre weight, moisture and the share of open or empty pods, and test pesticide residues for EU-bound lots. Prices follow weather and auction results, so we confirm a price validity with each quote.',
    ],
    faqs: [
      q('What cardamom size do Gulf buyers prefer?', 'Most Gulf buyers prefer 7–8 mm and 8 mm+ bold green pods for coffee and gifting.'),
      q('What is litre weight in cardamom?', 'The weight of one litre of pods. Higher litre weight means fuller, better-developed pods.'),
      q('Do you supply cardamom seeds or powder?', 'Yes, decorticated seeds and powder for food makers, best bought in smaller, fresher lots.'),
    ],
  },
  'black-pepper': {
    overview: [
      'Indian black pepper from Kerala and Karnataka is known for its strong aroma and pungency. We supply it by bulk density (500, 550 and 570 g/l), garbled or ungarbled, and machine-cleaned or steam-sterilised for food manufacturers.',
      'The harvest runs from December to March. Lots are checked for moisture, light berries, piperine and volatile oil, and tested for microbiology, aflatoxins and pesticide residues. Black pepper powder in set mesh sizes is also available.',
    ],
    faqs: [
      q('What does 550 g/l mean for black pepper?', 'It is the bulk density: one litre weighs 550 g. Higher density means fuller berries and fewer light ones.'),
      q('What is garbled pepper?', 'Pepper cleaned further to remove stems, light berries and foreign matter, used for retail packing.'),
      q('Can you supply steam-sterilised pepper?', 'Yes, for seasonings and ready-to-eat foods that need low microbial counts.'),
    ],
  },
  'fennel-seeds': {
    overview: [
      'Indian fennel (saunf) comes mainly from Gujarat and Rajasthan, with the Unjha market as its trading centre. Buyers choose by colour (greener is premium), seed size and cleaning: Lucknowi-type fine seed for mouth fresheners, bolder seed for blends and grinding.',
      'New crop arrives from February to April. Each lot is checked for purity, moisture and volatile oil and tested for pesticide residues, which matter especially for EU buyers. We also supply fennel powder.',
    ],
    faqs: [
      q('Which fennel is best for mouth freshener?', 'Fine, green Lucknowi-type fennel, often Sortex-cleaned, is preferred for mukhwas and mouth fresheners.'),
      q('Is Indian fennel tested for EU residue limits?', 'Yes. Fennel is watched closely in the EU, so lots for Europe are tested against EU MRLs before shipment.'),
      q('Do you supply fennel powder?', 'Yes, ground to your mesh size, in bulk or retail packs.'),
    ],
  },
  'hulled-white-sesame': {
    overview: [
      'Hulled white sesame from Gujarat, Rajasthan and Madhya Pradesh is the standard seed for bun toppings, tahini, halva and confectionery. The hull is removed to give a white seed with a soft, nutty taste, then Sortex-cleaned to 99.95% purity for export.',
      'Sesame for the EU must meet strict Salmonella and pesticide limits, so every lot is tested and can be steam-treated. Bakeries usually take it in 25 kg paper bags with liners to keep out moisture and smells.',
    ],
    faqs: [
      q('What purity is your hulled sesame?', 'Typically 99.95% Sortex-cleaned for export; 99.90% is also available.'),
      q('Is hulled sesame tested for Salmonella?', 'Yes, every lot, and steam treatment is available for EU and bakery buyers.'),
      q('How much hulled sesame fits in a 20 ft container?', 'About 18–19 MT, depending on bag type.'),
    ],
  },
  'natural-white-sesame': {
    overview: [
      'Natural white sesame is cleaned whole seed with the hull on. It is used for oil pressing, some bakery toppings and confectionery such as chikki, and keeps longer than hulled seed. We supply it machine-cleaned or Sortex-cleaned from Gujarat, Rajasthan and Madhya Pradesh.',
      'Lots are checked for purity, moisture, free fatty acid and oil content, important for crushers, and tested for microbiology and pesticide residues. It ships in 25 kg or 50 kg PP bags.',
    ],
    specs: { Purity: '99.0% / 99.5% / 99.9% Sortex', Moisture: 'Max 6.0%', 'Oil content': 'Min 48%', 'Free Fatty Acid': 'Max 2.0%', Admixture: 'Max 1.0%', Salmonella: 'Absent in 25 g' },
    faqs: [
      q('Natural or hulled sesame: which do I need?', 'Natural sesame suits oil pressing and some confectionery; hulled sesame is the standard for bakery toppings and tahini.'),
      q('What oil content does natural sesame have?', 'Usually around 48–52%, which matters for crushers.'),
      q('Which bags do you use?', '25 kg or 50 kg PP bags, or paper bags on request.'),
    ],
  },
  'psyllium-husk': {
    overview: [
      'India grows nearly all of the world’s psyllium (isabgol), mainly in north Gujarat and Rajasthan. Psyllium husk is the seed’s thin outer coat, sold by purity from 85% to 99%: fibre supplements and pharmaceutical buyers take 98–99%, while feed and some food uses take lower grades.',
      'Buyers test swell volume, light extraneous matter, ash, moisture and microbiology. Husk is light and bulky, so a container carries less weight than for dense products; ask us for the expected load with your quote.',
    ],
    specs: { Purity: '85% / 95% / 98% / 99%', 'Swell volume': 'Min 40–50 ml/g (by grade)', 'Light extraneous matter': 'Max 1.0–15% (by grade)', Moisture: 'Max 10.0%', 'Total Ash': 'Max 4.0%', Salmonella: 'Absent in 25 g' },
    faqs: [
      q('What psyllium purity do supplement makers use?', 'Usually 98% or 99% husk, often as fine powder.'),
      q('What is swell volume?', 'How much the husk swells in water, a key measure of quality for fibre products.'),
      q('Do you supply psyllium husk powder?', 'Yes, in 40, 60 and 100 mesh.'),
    ],
  },
  'ashwagandha-root': {
    overview: [
      'Ashwagandha (Withania somnifera) root is one of the most traded Ayurvedic herbs. Most commercial root comes from cultivated fields in Madhya Pradesh and Rajasthan, around the Neemuch and Mandsaur markets. We supply whole root, cut root and powder for herbal, supplement and extraction buyers.',
      'Buyers usually check identity, foreign matter, moisture and ash, and test withanolides, heavy metals, pesticide residues and microbiology. Tell us whether you need root only (no stem) and any marker content, and we match the lot.',
    ],
    specs: { 'Botanical name': 'Withania somnifera (root)', 'Total withanolides': 'Typically 0.3% – 1.5% (tested on request)', Moisture: 'Max 10.0%', 'Total Ash': 'Max 7.0%', 'Acid Insoluble Ash': 'Max 1.0%', 'Foreign Matter': 'Max 2.0%' },
    faqs: [
      q('Is your ashwagandha cultivated?', 'Commercial ashwagandha root comes mainly from cultivated fields in Madhya Pradesh and Rajasthan.'),
      q('Can you test withanolides?', 'Yes, by HPLC through an accredited lab, on request.'),
      q('Which forms are available?', 'Whole root, cut root (tea-bag cut) and powder, in bulk bags.'),
    ],
  },
  'senna-leaves': {
    overview: [
      'Indian senna (Cassia angustifolia) is grown mainly in Tamil Nadu around Tirunelveli and in Gujarat. Leaves and pods are dried and sold whole, cut (TBC) or powdered to herbal tea makers, laxative and pharmaceutical manufacturers, and extractors.',
      'Quality is judged on colour, the share of stems and foreign matter, moisture and sennoside content. We can arrange sennoside testing by HPLC with pesticide, heavy-metal and microbiology reports.',
    ],
    specs: { 'Botanical name': 'Cassia angustifolia (leaf)', Sennosides: 'Typically 1.5% – 3.0% (tested on request)', Moisture: 'Max 10.0%', 'Foreign Matter': 'Max 2.0%', 'Total Ash': 'Max 12.0%', Colour: 'Greenish' },
    faqs: [
      q('Leaves or pods: what is the difference?', 'Both contain sennosides; pods are often higher. Leaves are used more in herbal teas.'),
      q('Can you supply tea-bag cut senna?', 'Yes, TBC and powder as well as whole leaves.'),
      q('Do you test sennosides?', 'Yes, by HPLC on request.'),
    ],
  },
  peppermint: {
    overview: [
      'Dried peppermint (Mentha piperita) leaves from northern India are sold whole, rubbed or tea-bag cut to herbal tea blenders, food manufacturers and cosmetic makers. Buyers look for a strong menthol aroma, green colour and low stem content.',
      'We check colour, aroma, moisture, foreign matter and essential-oil content, and test microbiology and pesticide residues against your market. Peppermint is light, so container loads depend on bag type.',
    ],
    specs: { 'Botanical name': 'Mentha × piperita (leaf)', 'Essential oil': 'Min 1.0% v/w', Moisture: 'Max 10.0%', 'Stems / foreign matter': 'Max 3.0%', 'Total Ash': 'Max 12.0%', Cut: 'Whole, rubbed or TBC' },
    faqs: [
      q('Peppermint or spearmint: which do I need?', 'Peppermint is stronger and cooler (menthol); spearmint is sweeter and milder (carvone). Tea blenders often use both.'),
      q('Do you supply tea-bag cut peppermint?', 'Yes, TBC as well as whole and rubbed leaves.'),
      q('Is peppermint tested for microbiology?', 'Yes, total plate count, yeast and mould, E. coli and Salmonella.'),
    ],
  },
  spearmint: {
    overview: [
      'Dried spearmint (Mentha spicata) leaves are milder and sweeter than peppermint, with a carvone aroma. Indian spearmint is used in herbal teas, Middle Eastern cooking, confectionery and oral-care products, supplied whole, rubbed or tea-bag cut.',
      'Lots are checked for green colour, aroma, moisture and stems, and tested for microbiology and pesticide residues. Spearmint packs well in a mixed container with other herbs and spices.',
    ],
    specs: { 'Botanical name': 'Mentha spicata (leaf)', 'Essential oil': 'Min 0.8% v/w', Moisture: 'Max 10.0%', 'Stems / foreign matter': 'Max 3.0%', 'Total Ash': 'Max 12.0%', Cut: 'Whole, rubbed or TBC' },
    faqs: [
      q('Where is spearmint used?', 'Herbal teas, Middle Eastern dishes and drinks, confectionery and oral-care products.'),
      q('Can spearmint ship with other herbs?', 'Yes, in a mixed container with herbs, spices and other products.'),
      q('Which cuts are available?', 'Whole, rubbed and tea-bag cut.'),
    ],
  },
  'dehydrated-white-onion-flakes': {
    overview: [
      'Dehydrated white onion flakes (kibbled) are made from white onions grown for drying around Mahuva in Gujarat. Flakes of about 8–20 mm are used in soups, sauces, noodles and ready meals, and are milled further into minced, granules and powder.',
      'Lots are checked for moisture, colour, dark specks and skins, and microbiology. Producers use optical sorters and metal detectors, and steam treatment is available for low microbial counts. Flakes ship in cartons with double polythene liners.',
    ],
    faqs: [
      q('What size are onion flakes?', 'Typically 8–20 mm; smaller cuts are chopped (3–5 mm), minced (1–3 mm), granules and powder.'),
      q('How long do dehydrated onion flakes keep?', 'About 12–24 months stored cool and dry in sealed liners.'),
      q('Where are they made?', 'Mainly in the Mahuva area of Gujarat, from white onions grown for dehydration.'),
    ],
  },
  'dehydrated-onion-powder': {
    overview: [
      'Dehydrated white onion powder is milled from dried Gujarat white onion to about 80–100 mesh. It dissolves into snack seasonings, instant soups, gravies, dressings and spice blends, giving onion flavour without moisture.',
      'Powder picks up moisture from the air, so it is packed in double polythene liners inside cartons and should be stored cool and dry. Lots are tested for moisture, mesh, colour and microbiology, with steam-treated powder available.',
    ],
    specs: { Mesh: '80 – 100 mesh', Moisture: 'Max 6.0%', Colour: 'White to creamy', 'Total Plate Count': 'Max 100,000 cfu/g (lower if steam-treated)', 'E. coli': 'Absent', Salmonella: 'Absent in 25 g' },
    faqs: [
      q('Does onion powder cake?', 'It can in humid air. It is packed in sealed double liners; keep it cool and dry after opening.'),
      q('Can onion powder be steam treated?', 'Yes, for seasonings and ready-to-eat foods needing low counts.'),
      q('What mesh is standard?', '80–100 mesh; other sizes on request.'),
    ],
  },
  'dehydrated-garlic-flakes': {
    overview: [
      'Dehydrated garlic flakes are made from Indian garlic, cleaned, sliced and dried, then sorted for colour and skins. They are used in ready meals, soups, pickles and seasonings, and milled into minced, granules and powder.',
      'We check moisture, colour, skins and root ends, and test microbiology. Garlic is packed in cartons with double liners to keep its aroma and stop moisture pick-up.',
    ],
    faqs: [
      q('What garlic cuts do you supply?', 'Flakes, chopped, minced, granules and powder.'),
      q('How should dehydrated garlic be stored?', 'Cool, dry and sealed; shelf life is usually 12–24 months.'),
      q('Is steam-treated garlic available?', 'Yes, on request for food manufacturers.'),
    ],
  },
  'dehydrated-garlic-powder': {
    overview: [
      'Dehydrated garlic powder is milled from dried Indian garlic to about 80–100 mesh, for seasonings, garlic bread mixes, sauces, dressings and processed foods. It gives a strong, consistent garlic flavour without peeling or chopping.',
      'Lots are tested for moisture, mesh, colour and microbiology, and packed in double polythene liners inside cartons. Steam-treated powder is available for ready-to-eat products.',
    ],
    specs: { Mesh: '80 – 100 mesh', Moisture: 'Max 6.0%', Colour: 'Creamy white', 'Total Plate Count': 'Max 100,000 cfu/g (lower if steam-treated)', 'E. coli': 'Absent', Salmonella: 'Absent in 25 g' },
    faqs: [
      q('What is garlic powder used for?', 'Seasonings, garlic bread mixes, sauces, dressings and processed foods.'),
      q('Does garlic powder lose aroma?', 'Slowly; keep it sealed, cool and dry and use within its shelf life.'),
      q('Can you pack garlic powder in retail jars?', 'Yes, under your own brand, alongside bulk cartons.'),
    ],
  },
  '1121-basmati-rice': {
    overview: [
      '1121 basmati, officially Pusa Basmati 1121 (PB-1121), has one of the longest cooked grains of any rice, often stretching past 20 mm. It is the benchmark basmati in Saudi Arabia, the UAE, Kuwait and other Gulf markets, and in restaurants worldwide.',
      'We supply it raw (white), steam, white sella and golden sella, aged and Sortex-cleaned, in bags from 1 kg retail to 50 kg. Specify average grain length, broken percentage, moisture, purity and crop year, and ask for a cooked-grain test from the sample before you confirm.',
    ],
    faqs: [
      q('Is 1121 the same as Pusa Basmati 1121?', 'Yes. Pusa Basmati 1121 (PB-1121) is the official variety name; the trade calls it 1121 basmati.'),
      q('Which 1121 form do Gulf buyers prefer?', 'Golden and white sella (parboiled) are popular with caterers and in the Gulf; raw and steam suit home cooking.'),
      q('How much 1121 basmati fits in a container?', 'About 24–25 MT in a 20 ft container, depending on bag size.'),
    ],
  },
  'ir64-rice': {
    overview: [
      'IR64 is a long-grain non-basmati rice grown across India and traded in volume, raw and parboiled, to Africa, the Middle East and Asia. It is chosen for value and consistency, with broken grades from 5% to 100% for different markets.',
      'Specify the form, broken percentage, moisture, Sortex cleaning and bag size. India’s export rules for non-basmati rice change from time to time, so we confirm the current position with each quote.',
    ],
    faqs: [
      q('What broken percentages are available?', 'Commonly 5%, 15% and 25% broken, and 100% broken for flour and feed.'),
      q('Raw or parboiled IR64?', 'Both. Parboiled is firmer and popular in West Africa; raw cooks softer.'),
      q('Are there export restrictions on IR64?', 'India sometimes changes rules for non-basmati rice. We confirm the current rules before you order.'),
    ],
  },
  'sona-masuri-rice': {
    overview: [
      'Sona Masuri is a light, medium-grain rice from Andhra Pradesh, Telangana and Karnataka, the everyday rice of South Indian homes. It is very popular in the USA, UK, Australia and the Gulf, sold raw, steam and as aged rice, often in 10 kg and 20 kg retail bags.',
      'Buyers specify the crop year and ageing, broken percentage, moisture and Sortex cleaning, and many pack under their own brand. Unpolished and brown Sona Masuri are available for health-food lines.',
    ],
    specs: { 'Grain length': '5.0 – 5.4 mm (average)', Broken: 'Max 2% / 5%', Moisture: 'Max 14.0%', Purity: 'Min 95%', 'Damaged / discoloured': 'Max 1.0%', Cleaning: 'Sortex cleaned' },
    faqs: [
      q('Is aged Sona Masuri better?', 'Aged rice (6–12 months) cooks fluffier and more separate, which most buyers prefer.'),
      q('Which bag sizes are available?', '1, 5, 10, 20 and 25 kg, including your own brand.'),
      q('Do you supply unpolished Sona Masuri?', 'Yes, unpolished and brown, for health-food ranges.'),
    ],
  },
  'chana-dal': {
    overview: [
      'Chana dal is split desi chickpea with the skin removed, a staple of Indian cooking and the base of besan (gram flour). We supply it in bulk and retail packs to Indian grocers, distributors and food makers, polished or unpolished.',
      'Specify moisture, foreign matter, damaged and weevilled grains and the polish you want. Chana dal packs well in a mixed container with other dals, rice and spices.',
    ],
    faqs: [
      q('Is chana dal the same as besan?', 'No. Chana dal is the split chickpea; besan is flour milled from it.'),
      q('Polished or unpolished chana dal?', 'Both. Some markets prefer unpolished as a natural product.'),
      q('Can chana dal ship in a mixed container?', 'Yes, with other dals, rice, spices and groceries.'),
    ],
  },
  makhana: {
    overview: [
      'Makhana (phool makhana, fox nuts) is the popped seed of the Euryale ferox water lily. Almost all of the world’s supply comes from the ponds of north Bihar around Darbhanga, Madhubani and Purnia. The seeds are harvested, roasted and popped by hand into light white puffs, then graded by size.',
      'Size is measured in “suta”: 4 suta is small, 5 suta medium, and 6 suta and above are the large, premium puffs used for retail and roasted snacks. Buyers check size, whiteness, moisture and the share of broken or unpopped seeds. Makhana is very light, so a container holds little weight; we quote by carton count.',
    ],
    specs: { Size: '4 suta / 5 suta / 6 suta+ (≈ 12–22 mm)', Moisture: 'Max 8.0%', Colour: 'White to off-white', 'Broken / unpopped': 'Max 5%', 'Foreign Matter': 'Max 0.5%', Origin: 'Bihar (Darbhanga, Madhubani, Purnia)' },
    faqs: [
      q('What does 6 suta mean in makhana?', 'Suta is the size grade. 6 suta and above are the largest puffs (about 19–22 mm), used for premium retail and roasted snacks.'),
      q('Do you supply roasted or flavoured makhana?', 'Yes. Raw popped makhana in bulk, and roasted or flavoured makhana in retail packs under your brand.'),
      q('How much makhana fits in a container?', 'Makhana is very light; a 40 ft container usually carries only about 4–6 MT. We quote by carton count with your order.'),
    ],
  },
  'jaggery-powder': {
    overview: [
      'Jaggery powder is unrefined cane sugar made by boiling sugarcane juice and drying it into a free-flowing powder, mostly in Maharashtra, Uttar Pradesh and Karnataka. It is used as a natural sweetener in baking, drinks, sweets and as a sugar replacement in health-food ranges.',
      'Buyers look at colour (golden to brown), moisture, sucrose and the absence of chemicals used for clarifying. Powder is less sensitive to humidity than blocks when well sealed, and ships in lined bags or retail pouches.',
    ],
    specs: { Colour: 'Golden to light brown', Moisture: 'Max 3.0%', Sucrose: '70% – 85%', 'Reducing sugars': '8% – 15%', 'Insoluble matter': 'Max 1.5%', Additives: 'Chemical-free on request' },
    faqs: [
      q('Is jaggery powder chemical-free?', 'Chemical-free jaggery is available; ask for it on the order and we confirm with the producer.'),
      q('Does jaggery powder go sticky?', 'Only if exposed to humid air. It is packed in moisture-proof liners; keep it sealed and dry.'),
      q('Can you pack jaggery powder under my brand?', 'Yes, in pouches or jars, alongside bulk bags.'),
    ],
  },
};

export const contentFor = (slug) => PRODUCT_CONTENT[slug] || null;
