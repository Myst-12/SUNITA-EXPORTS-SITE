// Longer copy for the markets buyers search for most (Gulf). Each country page renders `sections`,
// `featured` product slugs and `faqs` when present here; other markets use the short template only.
// Keep claims general: no fixed transit days, prices or MOQs unless the client confirms them.

const GULF_LABEL = 'GCC food labelling (GSO 9) needs Arabic on the label — bilingual Arabic/English packs or Arabic stickers applied in Mumbai before stuffing.';

export const MARKET_CONTENT = {
  uae: {
    featured: ['1121-basmati-rice', 'chana-dal', 'turmeric-powder', 'red-chilli-powder', 'snacks-namkeen', 'packaged-atta-flours', 'green-cardamom', 'biscuits-bakery'],
    sections: [
      {
        title: 'Indian grocery supplier for Dubai, Abu Dhabi and Sharjah',
        paras: [
          'Dubai is the trading hub of the Gulf, and most of what sells on Indian grocery shelves there — atta, rice, dals, masalas, snacks, sweets, pickles, tea and ghee — is shipped from Mumbai. Sunita Agri Exports supplies UAE importers, wholesalers in Al Ras and Deira, hypermarket buyers and restaurant suppliers with the complete range, in bulk or retail packs.',
          'Because Nhava Sheva to Jebel Ali is one of the shortest container routes out of India, UAE buyers can order smaller, more frequent mixed containers instead of tying up cash in large stock. Many of our customers also re-export from Jebel Ali to Oman, Bahrain, Africa and Central Asia.',
        ],
      },
      {
        title: 'Mixed containers: spices, rice, pulses and FMCG in one load',
        paras: [
          'Most UAE grocery importers buy from us as one consolidated 20 ft or 40 ft container: basmati and non-basmati rice, pulses, whole and ground spices, flours, and packaged Indian FMCG brands together. One supplier, one invoice, one set of documents — and one clearing at Jebel Ali.',
          GULF_LABEL,
        ],
      },
      {
        title: 'Documents for import into the UAE',
        paras: [
          'We prepare the commercial invoice, packing list, certificate of origin (chamber attested where required), health and phytosanitary certificates, and halal certificates for products that need them. Your clearing agent in Dubai receives a complete set before the vessel arrives, and products can be registered on Dubai Municipality’s system in your company’s name.',
        ],
      },
    ],
    faqs: [
      { question: 'Do you supply Indian FMCG brands to the UAE?', answer: 'Yes. We source genuine packaged products — snacks, biscuits, instant foods, sweets, tea, pickles, flours and personal care — from established Indian manufacturers, subject to brand and export availability, and ship them with spices, rice and pulses in one container.' },
      { question: 'Can I order a small mixed container for Dubai?', answer: 'Yes. Mixed 20 ft containers are the most common order from UAE buyers. Send your product list and we will plan the load.' },
      { question: 'Are your products labelled in Arabic?', answer: 'We supply bilingual Arabic/English labels or apply Arabic stickers in Mumbai, so the goods meet GCC labelling rules on arrival.' },
    ],
  },

  'saudi-arabia': {
    featured: ['1121-basmati-rice', 'golden-sella-rice', 'green-cardamom', 'black-pepper', 'chana-dal', 'red-lentils', 'cumin-seeds', 'snacks-namkeen'],
    sections: [
      {
        title: 'Basmati rice, spices and Indian groceries for Saudi Arabia',
        paras: [
          'Saudi Arabia is one of the largest buyers of Indian basmati in the world, and the kingdom’s kabsa and mandi kitchens run on 1121 sella rice, green cardamom and black pepper. We supply Saudi importers, wholesalers and catering companies in Jeddah, Riyadh and Dammam with rice, whole spices, pulses and packaged Indian foods.',
          'Rice can be packed in 5, 10, 20, 25, 39 and 40 kg bags under your brand, and spices in bulk or retail packs. Indian grocery items and FMCG brands for the large South Asian community can be added to the same container.',
        ],
      },
      {
        title: 'SFDA and SABER compliance',
        paras: [
          'Saudi customs is strict about labels and product registration. We prepare Arabic/English labels to SFDA rules, supply halal certificates where needed, and provide the documents your clearing agent needs for SABER. Shipments go to Jeddah Islamic Port or King Abdul Aziz Port, Dammam.',
          GULF_LABEL,
        ],
      },
    ],
    faqs: [
      { question: 'Which basmati rice do you export to Saudi Arabia?', answer: '1121 golden sella and white sella are the most popular, along with 1509 and traditional basmati. Rice can be packed under your own brand in the bag sizes Saudi buyers prefer.' },
      { question: 'Do you handle SFDA labelling?', answer: 'Yes. We prepare Arabic/English labels to SFDA rules and supply the certificates your clearing agent needs.' },
    ],
  },

  kuwait: {
    featured: ['1121-basmati-rice', 'turmeric-powder', 'chana-dal', 'whole-green-moong', 'snacks-namkeen', 'sweets-confectionery', 'garam-masala', 'packaged-atta-flours'],
    sections: [
      {
        title: 'Indian grocery and spice supplier for Kuwait',
        paras: [
          'Kuwait’s large Indian and South Asian community keeps steady demand for Indian staples: basmati and sona masoori rice, atta, dals, masalas, snacks and sweets. We supply Kuwaiti importers, co-operative societies and grocery wholesalers with the full range from Mumbai in mixed or full containers to Shuwaikh and Shuaiba.',
          GULF_LABEL,
        ],
      },
    ],
  },

  qatar: {
    featured: ['1121-basmati-rice', 'chana-dal', 'turmeric-powder', 'garam-masala', 'dairy-products', 'cooking-oils', 'snacks-namkeen', 'packaged-spices-masalas'],
    sections: [
      {
        title: 'Indian groceries for Doha’s hypermarkets and caterers',
        paras: [
          'Qatar’s hypermarkets, labour-camp caterers and restaurants buy Indian rice, pulses, spices, ghee and oils in large volumes. We ship consolidated containers to Hamad Port with catering-size packs for food service and retail packs for supermarkets, all with Arabic/English labelling.',
          GULF_LABEL,
        ],
      },
    ],
  },

  oman: {
    featured: ['1121-basmati-rice', 'turmeric-powder', 'red-chilli-powder', 'chana-dal', 'red-lentils', 'snacks-namkeen', 'packaged-atta-flours', 'coriander-seeds'],
    sections: [
      {
        title: 'Short-route supply from Mumbai to Muscat and Sohar',
        paras: [
          'Oman is among the closest container markets to Mumbai, so buyers can order frequent mixed loads of spices, rice, pulses and Indian FMCG without holding big stock. We ship to Sultan Qaboos (Muscat), Sohar and Salalah, with Arabic/English labelling and the health, phytosanitary and origin certificates Omani customs needs.',
        ],
      },
    ],
  },

  bahrain: {
    featured: ['1121-basmati-rice', 'chana-dal', 'turmeric-powder', 'garam-masala', 'snacks-namkeen', 'biscuits-bakery', 'packaged-atta-flours', 'tea-instant-beverages'],
    sections: [
      {
        title: 'Indian grocery exporter for Bahrain',
        paras: [
          'Bahrain’s Indian community is one of the largest in the Gulf for its size, and its supermarkets carry a full Indian aisle. We supply Bahraini importers and wholesalers with rice, pulses, spices, flours, snacks, sweets and tea in mixed containers to Khalifa Bin Salman Port, or via Jebel Ali transhipment.',
          GULF_LABEL,
        ],
      },
    ],
  },
};
