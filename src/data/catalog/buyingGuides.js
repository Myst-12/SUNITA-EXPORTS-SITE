// Buying guides for the most-ordered products: how the grades differ and who each suits, when the crop arrives,
// and what moves the price. Shown as a "Buying guide" section on the product page. Grade names match the
// product's `grades`; values are typical trade practice, confirmed per contract and lot.
//
// Shape: { season: [[label, text], …], grades: [[grade, what it is, best for], …], price: [factor, …] }

export const BUYING_GUIDES = {
  'cumin-seeds': {
    season: [
      ['Sowing', 'November–December, in north Gujarat and western Rajasthan.'],
      ['Harvest and arrivals', 'February–April; arrivals at Unjha peak in March and April.'],
      ['Best time to book', 'Soon after arrivals, when choice of colour and cleanliness is widest.'],
    ],
    grades: [
      ['Singapore Grade (99% Purity)', 'Machine-cleaned, up to 1% admixture (mostly broken seed and dust).', 'Grinders and seasoning makers, where the seed is milled anyway.'],
      ['Europe Grade (99.5% Purity)', 'Cleaned further, fewer splits and lighter seed removed.', 'Whole-seed packers and wholesalers in Europe, the Gulf and Africa.'],
      ['Sortex Cleaned (99.9% Purity)', 'Optically sorted for colour; foreign matter around 0.1%.', 'Supermarket packs and buyers with strict EU or US limits.'],
    ],
    price: [
      'Size of the crop in Gujarat and Rajasthan: weather in January–February decides yield and colour.',
      'Arrival volumes at Unjha, which set the daily market price.',
      'Grade: each step from 99% to 99.9% adds cleaning cost and loss.',
      'Export demand from China, Bangladesh and the Gulf in the same season.',
      'Rupee–dollar exchange rate on the day of the contract.',
    ],
  },
  'coriander-seeds': {
    season: [
      ['Sowing', 'October–November, mainly in Rajasthan, Madhya Pradesh and Gujarat.'],
      ['Harvest and arrivals', 'February–April; Kota and Ramganj Mandi are the main markets.'],
      ['Best time to book', 'March–May, when the greenest new-crop seed is available.'],
    ],
    grades: [
      ['Eagle Grade', 'The greenest, brightest whole seed, few splits.', 'Whole-seed retail packs and premium blends.'],
      ['Scooter Grade', 'Slightly less green, well cleaned.', 'Grinders and general wholesale.'],
      ['Single Parrot', 'Greenish seed with some colour variation.', 'Grinding and value packs.'],
      ['Double Parrot', 'More colour variation, higher splits.', 'Grinding where colour of the seed matters less.'],
    ],
    price: [
      'Colour of the new crop: rain at harvest turns seed brown and narrows the green grades.',
      'Crop size in Rajasthan and Madhya Pradesh.',
      'Share of splits allowed: tighter limits mean more sorting.',
      'Demand from grinders in India and abroad in the same months.',
    ],
  },
  'turmeric-fingers': {
    season: [
      ['Planting', 'May–June, with the monsoon.'],
      ['Harvest and arrivals', 'January–April, after a 7–9 month crop; boiled, dried and polished before sale.'],
      ['Best time to book', 'March–May, when new-crop polished fingers reach Erode, Sangli and Nizamabad.'],
    ],
    grades: [
      ['Salem', 'Bright yellow-orange fingers with high curcumin.', 'Premium whole-finger buyers and colour-led grinding.'],
      ['Erode', 'Bright, well-polished fingers; the benchmark Indian trade grade.', 'Grinders and wholesalers in most markets.'],
      ['Rajapuri', 'Bold, plump fingers with deep colour (Sangli).', 'Markets that prefer large fingers and strong colour.'],
      ['Nizamabad', 'Good colour, competitively priced.', 'Grinders and price-led buyers.'],
    ],
    price: [
      'Curcumin content: higher curcumin earns a premium.',
      'Crop size in Tamil Nadu, Maharashtra and Telangana.',
      'Polish and finger-to-bulb ratio of the lot.',
      'Carry-over stock from the previous year.',
    ],
  },
  'turmeric-powder': {
    season: [
      ['Raw material', 'Ground from new-crop fingers, which arrive January–April.'],
      ['Availability', 'All year, ground to order from stored fingers.'],
      ['Best time to book', 'April–June, when new-crop fingers give the brightest colour.'],
    ],
    grades: [
      ['Alleppey Finger', 'High-curcumin powder with deep colour.', 'Colour-led uses and markets that ask for Alleppey.'],
      ['Erode Finger', 'Bright, consistent powder from Erode fingers.', 'Retail packs and general food use.'],
      ['Salem Finger', 'Bright yellow-orange powder with good curcumin.', 'Premium retail and blends.'],
      ['Rajapore Finger', 'Deep colour from bold Sangli fingers.', 'Buyers who want strong colour.'],
      ['Standard Ground Powder', 'Blended fingers ground to a set specification.', 'Food manufacturers and price-led buyers.'],
    ],
    price: [
      'Price of the fingers it is ground from.',
      'Curcumin level required (3% standard, up to about 5.5% premium).',
      'Mesh size, steam sterilisation and testing asked for.',
      'Packing: bulk bags or retail pouches.',
    ],
  },
  'red-chilli-powder': {
    season: [
      ['Raw material', 'Ground from dried chillies harvested December–April in Andhra Pradesh, Telangana and Karnataka.'],
      ['Availability', 'All year, from chillies kept in cold storage.'],
      ['Best time to book', 'February–May, when new-crop chillies give the best colour.'],
    ],
    grades: [
      ['Hot Chilli Powder', 'High pungency (SHU) from Teja and Guntur-type chillies.', 'Sauces, snacks and spicy blends.'],
      ['Medium Hot Chilli Powder', 'Balanced heat and colour.', 'Everyday retail packs and restaurants.'],
      ['Bright Red Mild Chilli (Kashmiri Type)', 'Deep red colour (high ASTA), mild heat.', 'Tandoori, curry colour and markets that want colour without heat.'],
    ],
    price: [
      'Chilli crop size and cold-storage stocks in Guntur and Khammam.',
      'Colour (ASTA) and pungency (SHU) asked for: high colour costs more.',
      'Aflatoxin and pesticide limits of your market.',
      'Steam sterilisation and mesh size.',
    ],
  },
  'guntur-chilli': {
    season: [
      ['Harvest', 'December–April in Andhra Pradesh and Telangana.'],
      ['Arrivals', 'Peak at the Guntur market yard from February to April; the rest of the year from cold storage.'],
      ['Best time to book', 'February–April for new crop with the best colour and gloss.'],
    ],
    grades: [
      ['With stem', 'Whole dried pods with the stem on.', 'Traders and markets that buy by appearance.'],
      ['Stemless', 'Stem removed; cleaner, less waste for grinding.', 'Grinders and powder makers.'],
    ],
    price: [
      'Crop size and cold-storage stocks in Guntur.',
      'Variety (334, S4/Sannam, S10): each has its own heat and colour.',
      'Colour, gloss and share of discoloured pods.',
      'Aflatoxin limits of your market, which narrow the usable lots.',
    ],
  },
  'green-cardamom': {
    season: [
      ['Harvest', 'August–February in the Idukki hills of Kerala, picked every 30–45 days.'],
      ['Auctions', 'Sold through Spices Board e-auctions at Bodinayakanur and Puttady all year.'],
      ['Best time to book', 'September–December, during peak picking.'],
    ],
    grades: [
      ['AGEB (Alleppey Green Extra Bold)', 'Largest pods, about 7 mm and above, deep green.', 'Premium retail and the Gulf coffee market.'],
      ['AGB (Alleppey Green Bold)', 'Bold pods, about 6–7 mm.', 'Wholesale and retail packs.'],
      ['AGS-1 (Alleppey Green Superior)', 'Smaller pods, good aroma.', 'Grinding, blends and price-led buyers.'],
      ['Cardamom Seeds (decorticated)', 'Seeds without the husk.', 'Food manufacturers and spice blenders.'],
    ],
    price: [
      'Monsoon rain in Kerala, which decides the size of the crop.',
      'Pod size and colour: bold green pods earn the most.',
      'Auction prices at Bodinayakanur and Puttady, which move weekly.',
      'Demand from the Gulf, especially before Ramadan.',
    ],
  },
  'black-pepper': {
    season: [
      ['Harvest', 'December–March in Kerala and Karnataka.'],
      ['Arrivals', 'January–April at Kochi; the rest of the year from stock.'],
      ['Best time to book', 'February–April for new crop.'],
    ],
    grades: [
      ['Malabar Garbled 1 (MG-1)', 'Cleaned berries, about 550 g/l density.', 'Whole-pepper retail and grinding.'],
      ['Malabar Garbled 2 (MG-2)', 'Slightly lighter berries, about 500 g/l.', 'Grinders and value packs.'],
      ['Tellicherry Extra Bold (TGSEB)', 'Largest berries, 4.75 mm and above.', 'Premium retail and gourmet buyers.'],
    ],
    price: [
      'Indian crop size and the world price set by Vietnam, Brazil and Indonesia.',
      'Bulk density and berry size: denser, larger berries cost more.',
      'Pesticide and mineral-oil limits of your market.',
      'Steam sterilisation for food manufacturers.',
    ],
  },
  'fennel-seeds': {
    season: [
      ['Sowing', 'October–November in Gujarat and Rajasthan.'],
      ['Harvest and arrivals', 'February–April; Unjha is the main market.'],
      ['Best time to book', 'March–May for the greenest new-crop seed.'],
    ],
    grades: [
      ['Abu Road (Vibrant Green)', 'Small, bright green, very aromatic seed from the Abu Road area.', 'Mukhwas, after-meal mixes and premium retail.'],
      ['Unjha Regular', 'Standard green seed, machine-cleaned.', 'Grinders and wholesale.'],
      ['Sortex Cleaned Premium', 'Optically sorted for colour and cleanliness.', 'Supermarket packs and strict EU or US buyers.'],
    ],
    price: [
      'Colour of the crop: rain at harvest turns seed dull.',
      'Seed size: finer, greener seed costs more.',
      'Crop size in Gujarat and Rajasthan.',
      'Cleaning level asked for.',
    ],
  },
  '1121-basmati-rice': {
    season: [
      ['Harvest', 'October–November in Punjab, Haryana and western Uttar Pradesh.'],
      ['Ageing', 'Basmati is usually aged 6–12 months before export, which improves cooking length.'],
      ['Best time to book', 'December–March for new crop; aged rice is available all year.'],
    ],
    grades: [
      ['1121 Raw Basmati', 'Milled without parboiling; longest cooked grain and strongest aroma.', 'Restaurants and home cooking in the Gulf, Europe and the USA.'],
      ['1121 Golden Sella (Parboiled)', 'Parboiled, golden colour; grains stay separate.', 'Kabsa, mandi and biryani in the Gulf; catering.'],
      ['1121 Creamy Sella', 'Parboiled, lighter cream colour.', 'Catering and buyers who want separate grains with a lighter colour.'],
      ['1121 Steam Basmati', 'Steamed before milling; firmer than raw, whiter than sella.', 'Markets between raw and sella, such as parts of Africa and Europe.'],
    ],
    price: [
      'Paddy price at harvest and the size of the basmati crop.',
      'Age of the rice: older rice costs more.',
      'Broken-grain percentage and sorting (Sortex) asked for.',
      'Minimum export price and other government rules on rice exports.',
      'Bag size and private-label packing.',
    ],
  },
  'hulled-white-sesame': {
    season: [
      ['Kharif crop', 'Sown June–July, harvested September–November (Gujarat, Rajasthan, Madhya Pradesh).'],
      ['Summer crop', 'Harvested April–June, mainly in Gujarat and West Bengal; often the whitest seed.'],
      ['Best time to book', 'October–December and May–July, after each harvest.'],
    ],
    grades: [
      ['Hulled, auto-dry process', 'Husk removed by machine and dried in a continuous dryer; even colour, low moisture.', 'Tahini, halwa and bakery makers who need consistent volume.'],
      ['Hulled, 99.95% purity', 'Cleaned and sorted to the highest purity, very low foreign matter.', 'Bakery toppings, retail packs and strict EU, US or Japan buyers.'],
    ],
    price: [
      'Size of the Indian crop and supply from African origins (Sudan, Nigeria, Ethiopia).',
      'Whiteness and purity asked for.',
      'Salmonella and pesticide limits of your market, which narrow the usable lots.',
      'Demand from tahini and halwa makers in the Middle East and from Japan, Korea and China.',
    ],
  },
  'natural-white-sesame': {
    season: [
      ['Kharif crop', 'Sown June–July, harvested September–November.'],
      ['Summer crop', 'Harvested April–June in Gujarat and West Bengal.'],
      ['Best time to book', 'October–December and May–July.'],
    ],
    grades: [
      ['Natural white 99/1', 'Machine-cleaned, about 99% purity.', 'Oil mills and bakeries.'],
      ['Natural white 99.95% (Sortex)', 'Optically sorted for colour, very low foreign matter.', 'Retail packs and strict import markets.'],
      ['Natural white 98/2', 'Cleaned to about 98% purity.', 'Crushing for oil and price-led buyers.'],
    ],
    price: [
      'Indian crop size and African supply in the same season.',
      'Purity and whiteness: Sortex-cleaned seed costs more.',
      'Oil content, for buyers who crush.',
      'Demand from China, which can move the world price quickly.',
    ],
  },
  'psyllium-husk': {
    season: [
      ['Sowing', 'November in north Gujarat and Rajasthan.'],
      ['Harvest and arrivals', 'February–April; Unjha is the world centre for psyllium processing.'],
      ['Best time to book', 'March–June, when new-crop seed is being processed.'],
    ],
    grades: [
      ['99%', 'Highest purity husk, very low light extraneous matter.', 'Pharmaceutical and premium supplement makers.'],
      ['98%', 'High purity, the standard export grade.', 'Fibre supplements and health-food packs.'],
      ['95%', 'Good purity at a lower price.', 'Food uses, bakery and some supplements.'],
      ['85%', 'Lower purity, more extraneous matter.', 'Animal feed and industrial uses.'],
    ],
    price: [
      'Seed crop size in Gujarat and Rajasthan, which swings with winter rain.',
      'Purity grade: each step up removes more light matter.',
      'Mesh size for husk powder.',
      'Microbiological testing and steam sterilisation for pharmaceutical buyers.',
    ],
  },
  'dehydrated-white-onion-flakes': {
    season: [
      ['Onion harvest', 'White onion is harvested February–May around Mahuva, Gujarat.'],
      ['Dehydration season', 'February–June, while fresh onions are available; the rest of the year from stock.'],
      ['Best time to book', 'March–June for new-season flakes with the lightest colour.'],
    ],
    grades: [
      ['A grade (light colour)', 'Creamy-white flakes, few dark or burnt pieces.', 'Seasoning makers, soups and retail packs.'],
      ['Commercial grade', 'Slightly more colour variation.', 'Further processing and price-led buyers.'],
    ],
    price: [
      'Fresh onion price and the size of the Mahuva crop.',
      'Colour and moisture of the flakes.',
      'Microbiological limits; steam sterilisation adds cost.',
      'Stocks carried from the previous season.',
    ],
  },
  'dehydrated-onion-powder': {
    season: [
      ['Raw material', 'Milled from white onion flakes dehydrated February–June in Mahuva, Gujarat.'],
      ['Availability', 'All year, milled from stored flakes.'],
      ['Best time to book', 'April–July for new-season colour.'],
    ],
    grades: [
      ['Fine powder (80–100 mesh)', 'Free-flowing, light-coloured powder.', 'Seasoning blends, snacks and sauces.'],
      ['Steam-sterilised powder', 'Lower microbial counts for ready-to-eat foods.', 'Food manufacturers with strict micro limits.'],
    ],
    price: [
      'Price of the flakes it is milled from.',
      'Mesh size and colour asked for.',
      'Steam sterilisation and testing.',
      'Anti-caking agents, if requested.',
    ],
  },
  'dehydrated-garlic-flakes': {
    season: [
      ['Garlic harvest', 'February–April in Gujarat and Madhya Pradesh.'],
      ['Dehydration season', 'March–July; the rest of the year from stock.'],
      ['Best time to book', 'April–July for new-season flakes.'],
    ],
    grades: [
      ['A grade (light, rootless)', 'Light-coloured flakes with roots removed.', 'Seasonings, retail packs and food service.'],
      ['Commercial grade', 'More colour variation, some root pieces.', 'Further processing and grinding.'],
    ],
    price: [
      'Fresh garlic price and crop size in Madhya Pradesh and Gujarat.',
      'Colour and root content of the flakes.',
      'Competition and prices from Chinese dehydrated garlic.',
      'Microbiological limits and steam sterilisation.',
    ],
  },
  'dehydrated-garlic-powder': {
    season: [
      ['Raw material', 'Milled from garlic flakes dehydrated March–July.'],
      ['Availability', 'All year, milled from stored flakes.'],
      ['Best time to book', 'May–August for new-season colour.'],
    ],
    grades: [
      ['Fine powder (80–100 mesh)', 'Free-flowing, light cream powder with strong flavour.', 'Seasoning blends, snacks and sauces.'],
      ['Steam-sterilised powder', 'Lower microbial counts for ready-to-eat foods.', 'Food manufacturers with strict micro limits.'],
    ],
    price: [
      'Price of the flakes it is milled from.',
      'Mesh size, colour and pungency asked for.',
      'Steam sterilisation and testing.',
      'World price of Chinese garlic powder.',
    ],
  },
  '1509-basmati-rice': {
    season: [
      ['Harvest', 'September–October; 1509 is an early variety, harvested before 1121.'],
      ['Ageing', 'Usually aged a few months before export for better cooking.'],
      ['Best time to book', 'November–March for new crop; aged rice all year.'],
    ],
    grades: [
      ['Raw', 'Milled without parboiling; long grain and good aroma.', 'Restaurants and retail where price matters more than 1121 length.'],
      ['Steam', 'Steamed before milling; firmer grain.', 'Buyers between raw and sella.'],
      ['Sella', 'Parboiled (white or golden); grains stay separate.', 'Catering, kabsa and biryani in the Gulf.'],
    ],
    price: [
      'Paddy price at harvest and the size of the basmati crop.',
      'Price gap to 1121, which buyers switch between.',
      'Broken-grain percentage and sorting asked for.',
      'Government rules on rice exports at the time.',
    ],
  },
  'kabuli-chickpeas': {
    season: [
      ['Sowing', 'October–November (rabi crop) in Madhya Pradesh and Maharashtra.'],
      ['Harvest and arrivals', 'February–April; Indore is the main market.'],
      ['Best time to book', 'March–June for new crop.'],
    ],
    grades: [
      ['Bold 9mm (42-44 count)', 'Largest seed, about 42–44 per ounce.', 'Retail packs, canning and premium markets.'],
      ['Medium 8mm (44-46 count)', 'Medium size, the most traded export grade.', 'Wholesale, hummus and food service.'],
      ['Small 7mm (58-60 count)', 'Smaller seed at a lower price.', 'Processing, flour and price-led buyers.'],
    ],
    price: [
      'Indian crop size and supply from Mexico, Russia and Turkey.',
      'Seed size: bolder chickpeas earn a premium.',
      'Import duties in buyer countries, which shift demand.',
      'Weather at harvest, which affects colour and size.',
    ],
  },
  'split-toor-dal': {
    season: [
      ['Harvest', 'December–February in Maharashtra and Karnataka.'],
      ['Processing', 'Hulled and split in dal mills (Latur, Akola, Gulbarga) all year.'],
      ['Best time to book', 'January–April for new crop.'],
    ],
    grades: [
      ['Polished', 'Split dal finished with oil or water polish; glossy look.', 'Retail packs for Indian and South Asian communities.'],
      ['Unpolished', 'No polish; natural, slightly duller look.', 'Health-food buyers and markets that prefer unpolished dal.'],
    ],
    price: [
      'Indian toor crop size and imports from East Africa and Myanmar.',
      'Government stock limits and export rules on pulses.',
      'Grain size and broken percentage.',
      'Polished or unpolished finish.',
    ],
  },
};

export const guideFor = (slug) => BUYING_GUIDES[slug] || null;
