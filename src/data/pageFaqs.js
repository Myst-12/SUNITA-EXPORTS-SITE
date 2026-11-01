// FAQs shown on individual pages, keyed by page path. Kept here (not in the page files) so the site's
// help search can answer from them too.
import { COMPANY, CONTACT, fullAddress } from '@/config/site';

export const PAGE_FAQS = {
  'mixed-container': [
    { question: 'What is a mixed container?', answer: 'A mixed (consolidated) container is a single 20 ft or 40 ft shipping container carrying many different products — for example whole spices, basmati rice, dals, snacks and pickles — bought from one exporter on one invoice.' },
    { question: 'How many products can go in one container?', answer: 'There is no fixed limit. Our buyers typically combine 15 to 150 different items. We plan the load by weight and volume so the container is used efficiently and heavier goods are stowed safely.' },
    { question: 'What is the minimum for a mixed container?', answer: 'One 20 ft container. Within it, bulk items usually start from around 500 kg–1 MT and packaged goods from a few dozen cartons per SKU, depending on the product.' },
    { question: 'Which documents do I receive?', answer: 'Commercial invoice, packing list, bill of lading, certificate of origin, phytosanitary and fumigation certificates where required, and certificates of analysis for spices and food items.' },
    { question: 'How long does a mixed container take?', answer: 'Typically 2–4 weeks from order confirmation to sailing, depending on the list, private-label printing and vessel schedules. Transit time then depends on the destination.' },
  ],
  'indian-grocery-exporter': [
    { question: 'What Indian grocery products do you export?', answer: 'Rice, flours, pulses and dals, spices and masalas, snacks and namkeen, biscuits, sweets, instant foods, pickles, papad, tea and coffee, ghee, jaggery, makhana, and personal and home care products.' },
    { question: 'Can I mix many products in one container?', answer: 'Yes. Mixed containers are our speciality — packaged FMCG cartons, bulk spices, rice and pulses all in one 20 ft or 40 ft load, with one invoice and one set of documents.' },
    { question: 'Do you export Indian grocery brands?', answer: 'Yes, we source genuine branded products from established Indian manufacturers, subject to brand and export availability. We can also pack staples under your own label.' },
    { question: 'Which countries do you supply?', answer: `${COMPANY.countriesServed} countries, mainly the UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain, plus the USA, UK, Canada, Australia, Europe and Asia.` },
    { question: 'How do I get a price?', answer: 'Send your product list, quantities and destination port through the quote form or WhatsApp. We reply with FOB and CFR / CIF prices within 24 hours.' },
  ],
  'contact': [
    { question: 'How quickly will I get a quote?', answer: 'Usually within 24 hours on working days (Mon–Sat, IST). Complex mixed-container lists may take a little longer while we confirm availability.' },
    { question: 'Can I get samples before ordering?', answer: 'Yes. We send samples of spices, rice and pulses for quality approval. Courier charges are usually paid by the buyer and adjusted against the first order.' },
    { question: 'What payment terms do you accept?', answer: 'Typically T/T with an advance and the balance against shipping documents, or an irrevocable L/C at sight. Terms for repeat buyers are discussed case by case.' },
    { question: 'Can I visit your office in Mumbai?', answer: `Yes — our office is at ${fullAddress()}. Please message us first so the right person is available.` },
  ],
  'fmcg': [
    { question: 'Which Indian FMCG products do you export?', answer: 'Snacks and namkeen, biscuits, instant foods and mixes, sweets, tea and beverages, pickles and pastes, papad, ghee, flours, rice, dals, spices and masalas, pooja items, personal care and household products. We source genuine products from established Indian manufacturers, subject to brand and export availability, or pack under your private label.' },
    { question: 'Can I combine FMCG with spices and rice in one container?', answer: 'Yes — that is our speciality. Most of our grocery buyers order a mixed 20 ft or 40 ft container combining packaged foods with bulk or retail spices, rice and pulses.' },
    { question: 'How do you manage shelf life for sea shipments?', answer: 'We plan stock so products leave India with the maximum possible remaining shelf life, check manufacturing dates before stuffing and share batch details with the packing list.' },
    { question: 'Do you handle labelling for my country?', answer: 'We supply products with English labelling as standard and can arrange importer stickers, ingredient translations or private-label packs to meet your country’s food labelling rules.' },
  ],
  'knowledge': [
    { question: 'How do I import spices from India for the first time?', answer: 'Start with a clear product list and your country’s import requirements, request quotes and samples from a registered Indian exporter, agree specifications and Incoterms, and work with a local clearing agent. Many first-time importers start with a mixed container to test several products at once.' },
    { question: 'What is the difference between FOB, CFR and CIF?', answer: 'FOB means the price covers goods loaded on the vessel in India; you pay freight and insurance. CFR adds sea freight to your port. CIF adds both freight and marine insurance. Import duties and local charges are always paid by the buyer.' },
    { question: 'How long does sea shipping from India take?', answer: 'Roughly 5–10 days to the Gulf, 18–25 days to Europe and East Africa, 25–35 days to the US East Coast and 20–30 days to Australia, depending on the route and transhipment.' },
  ],
  'private-label': [
    { question: 'What is the minimum order for private label?', answer: 'It depends on the pack format and printing method. Many buyers start with one mixed container covering several SKUs. Printed laminate pouches usually need a minimum print run per design; stickers and labels allow smaller trial runs.' },
    { question: 'Can you design the packaging for us?', answer: 'Yes. We can work from your existing brand guidelines or coordinate artwork for new packs. You approve every design before printing.' },
    { question: 'Do you add barcodes and labelling for my country?', answer: 'Yes. We print your EAN/UPC barcodes, batch numbers, best-before dates, ingredient and allergen declarations and importer details as required by your market.' },
    { question: 'Can private label products be mixed with other items in one container?', answer: 'Absolutely. Private label packs can be combined with bulk spices, rice, pulses and other groceries in the same mixed container.' },
  ],
  'indian-spices-exporter': [
    { question: 'Which Indian spices do you export?', answer: 'Turmeric, red chilli, Kashmiri chilli, cumin, coriander, fennel, fenugreek, mustard, green and black cardamom, black pepper, cloves, cinnamon, bay leaf, ginger, ajwain and blended masalas, among 50+ spice products.' },
    { question: 'Can you supply spices under my brand?', answer: 'Yes. We pack spices in retail pouches, jars and bulk bags under your private label, with your design and your country’s labelling rules.' },
    { question: 'Do you share lab reports?', answer: 'Yes. Spec sheets are on every product page, and pre-shipment lab reports can be shared for moisture, colour, active content, pesticides and microbiology.' },
    { question: 'Do you export spices to the Middle East?', answer: 'Yes, the Gulf is our largest market — UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain — with Arabic/English labelling.' },
  ],
  'certifications': [
    { question: 'Can I see your certificates before ordering?', answer: `Yes. Our ISO 22000, ISO 9001, Kosher, FSSAI, APEDA, Spices Board, Star Export House and IEC certificates are on this page as PDFs. For anything else, email ${CONTACT.email} or ask on WhatsApp.` },
    { question: 'Do you offer steam-sterilised spices?', answer: 'Yes. Steam sterilisation can be arranged for spices and herbs destined for the USA, EU, UK, Australia and New Zealand to meet microbiological requirements.' },
    { question: 'Can you test for pesticide residues and aflatoxins?', answer: 'Yes. On request we arrange third-party testing at accredited laboratories against the limits of your destination market, and share the reports before shipment.' },
    { question: 'Which port do you ship from?', answer: `Most shipments sail from ${CONTACT.port}. Other Indian ports can be arranged depending on product origin.` },
  ],
};
