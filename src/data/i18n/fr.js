// French text for the /fr/ section. Facts (specs, images, HS codes) come from the English data.

const ui = {
  company: 'Sunita Agri Exports',
  status: 'Star Export House reconnue par le gouvernement indien',
  nav: [['', 'Accueil'], ['products/', 'Produits'], ['exports/', 'Marchés'], ['contact/', 'Demander un devis']],
  skip: 'Aller au contenu',
  english: 'English',
  quote: 'Demander un devis',
  whatsapp: 'WhatsApp',
  hello: 'Bonjour, je souhaite recevoir un devis.',
  helloProduct: 'Bonjour, je souhaite un devis pour : ',
  specs: 'Spécifications',
  hsCode: 'Code SH',
  origin: 'Origine',
  india: 'Inde',
  grades: 'Qualités disponibles',
  packing: 'Emballage',
  packingText: 'Sacs de 25 et 50 kg pour le vrac, ou emballages de détail à votre marque, avec étiquetage dans la langue de votre marché.',
  specNote: 'Valeurs typiques ; un certificat d’analyse accompagne chaque expédition et nous pouvons livrer selon votre cahier des charges.',
  englishVersion: 'Version anglaise et fiche technique (PDF)',
  footer: 'Exportateur d’épices, de riz, de légumineuses et de produits alimentaires indiens depuis Mumbai, depuis 2010.',
  productsHubText: 'Voici nos produits les plus demandés. Notre gamme compte plus de 380 produits : consultez le catalogue complet en anglais ou envoyez-nous votre liste.',
  fullCatalogue: 'Catalogue complet (anglais)',
  sendList: 'Envoyer votre liste',
  exportsLead: 'Nous expédions vers plus de 40 pays. Chaque marché ci-dessous dispose d’un guide détaillé (en anglais) : ports, étiquetage et documents.',
  meta: {
    homeTitle: 'Sunita Agri Exports | Exportateur d’épices et de riz basmati d’Inde',
    homeDesc: 'Exportateur indien d’épices, de riz basmati, de légumineuses et de produits alimentaires depuis Mumbai depuis 2010. Conteneurs complets ou mixtes, marque privée, devis FOB/CIF sous 24 h.',
    productsTitle: 'Produits : épices, riz basmati et légumineuses d’Inde',
    productsDesc: 'Cumin, curcuma, cardamome, poivre noir, riz basmati 1121, pois chiches et mélanges d’épices indiens, en vrac ou sous votre marque.',
    exportsTitle: 'Marchés d’exportation',
    exportsDesc: 'Épices, riz et légumineuses d’Inde expédiés vers plus de 40 pays depuis Nhava Sheva (Mumbai).',
    contactTitle: 'Demander un devis pour des épices et du riz d’Inde',
    contactDesc: 'Envoyez votre liste de produits, les quantités et le port de destination : devis FOB, CFR ou CIF sous 24 heures.',
    product: (name) => `${name} : exportateur en Inde`,
    productDescEnd: ' Devis FOB et CIF sous 24 heures.',
  },
};

const specLabels = {
  Purity: 'Pureté', Moisture: 'Humidité', 'Volatile Oil': 'Huile essentielle', 'Total Ash': 'Cendres totales',
  'Acid Insoluble Ash': 'Cendres insolubles dans l’acide', 'Foreign Matter': 'Matières étrangères', 'Curcumin Content': 'Teneur en curcumine',
  'Lead (Pb)': 'Plomb (Pb)', Pungency: 'Piquant (SHU)', 'ASTA Color': 'Couleur (ASTA)', 'Aflatoxin / Ochratoxin': 'Aflatoxine / ochratoxine',
  'Size (Diameter)': 'Calibre (diamètre)', Immaturity: 'Capsules immatures', 'Piperine Content': 'Teneur en pipérine',
  'Density (Bulk Weight)': 'Densité (poids en vrac)', 'Mouldy Berries': 'Grains moisis', Splits: 'Grains cassés', 'Damaged Seeds': 'Graines endommagées',
  'Average Grain Length': 'Longueur moyenne du grain', Admixture: 'Mélange variétal', 'Broken Grain': 'Grains brisés', 'Chalky Grains': 'Grains crayeux',
  'Size (Count)': 'Calibre (nombre)', 'Weevilled/Damaged': 'Charançonnés / endommagés', Salmonella: 'Salmonelle', 'E. coli': 'E. coli',
};

const products = {
  'cumin-seeds': { category: 'indian-spices', name: 'Graines de cumin', description: 'Cumin aromatique de la région d’Unjha (Gujarat) et du Rajasthan, nettoyé mécaniquement et trié au trieur optique (Sortex), pour les négociants, broyeurs et fabricants d’assaisonnements.', uses: 'Riz, currys, mélanges d’épices, pains et conserves.' },
  'turmeric-powder': { category: 'indian-spices', name: 'Curcuma en poudre', description: 'Curcuma moulu à partir de rhizomes séchés d’Erode, de Sangli et de Nizamabad, d’un jaune vif, à teneur en curcumine définie, sans colorant ni additif.', uses: 'Currys, sauces, mélanges d’épices et industrie agroalimentaire.' },
  'red-chilli-powder': { category: 'indian-spices', name: 'Piment rouge en poudre', description: 'Piment rouge moulu à partir de piments de Guntur et de Byadgi, avec piquant et couleur (ASTA) ajustés à votre demande.', uses: 'Sauces, mélanges d’épices, snacks et restauration.' },
  'green-cardamom': { category: 'indian-spices', name: 'Cardamome verte', description: 'Cardamome verte du Kerala, calibres 6, 7 et 8 mm et plus, d’une belle couleur verte et très parfumée.', uses: 'Café, thé, pâtisseries et plats de riz.' },
  'black-pepper': { category: 'indian-spices', name: 'Poivre noir en grains', description: 'Poivre noir de la côte de Malabar, densités de 500, 550 et 600 g/l, à teneur en pipérine définie.', uses: 'Broyage, mélanges d’épices, charcuterie et restauration.' },
  'coriander-seeds': { category: 'indian-spices', name: 'Graines de coriandre', description: 'Graines de coriandre du Rajasthan et du Gujarat, entières ou concassées, nettoyées et triées pour le broyage et le conditionnement.', uses: 'Mélanges d’épices, conserves et charcuterie.' },
  '1121-basmati-rice': { category: 'rice', name: 'Riz basmati 1121', description: 'Riz basmati 1121 à grain extra-long, blanc, étuvé (sella) ou doré, d’une longueur moyenne supérieure à 8,3 mm avant cuisson.', uses: 'Biryani, pilafs et restauration.' },
  'split-toor-dal': { category: 'pulses-legumes', name: 'Toor dal (pois d’Angole décortiqués)', description: 'Pois d’Angole décortiqués et cassés, nettoyés, polis ou non polis.', uses: 'Dal, soupes et épiceries indiennes.' },
  'kabuli-chickpeas': { category: 'pulses-legumes', name: 'Pois chiches Kabuli', description: 'Pois chiches blancs Kabuli de 7, 8 et 9 mm, nettoyés et calibrés.', uses: 'Houmous, falafels, conserves et plats cuisinés.' },
  'garam-masala': { category: 'indian-spices', name: 'Garam masala', description: 'Mélange d’épices indien à base de cumin, coriandre, poivre noir, cardamome, cannelle et clou de girofle, en vrac ou sous votre marque.', uses: 'Restaurants, cuisines centrales et conditionnement de détail.' },
};

const home = {
  title: 'Épices et riz d’Inde, expédiés dans le monde entier',
  lead: 'Nous exportons depuis 2010 épices, riz basmati, légumineuses et produits alimentaires indiens, en conteneurs complets ou mixtes, et sous votre marque si vous le souhaitez.',
  facts: [['Depuis 2010', 'à l’export'], ['40+ pays', 'desservis'], ['24 heures', 'pour un devis écrit'], ['1 tonne', 'minimum par produit en vrac']],
  whyTitle: 'Pourquoi les importateurs nous choisissent',
  why: [
    ['Un seul conteneur mixte', 'Épices, riz, légumineuses et produits emballés dans un même conteneur, avec une seule facture et un seul jeu de documents.'],
    ['Votre marque', 'Emballages de détail à votre marque, étiquetés dans la langue et selon les règles de votre marché.'],
    ['Une qualité vérifiable', 'Fiche technique pour chaque produit, certificat d’analyse à chaque expédition, échantillons avant commande.'],
    ['FOB, CFR ou CIF', 'Devis écrit en dollars américains sous 24 heures après réception de votre demande.'],
  ],
  stepsTitle: 'Comment se passe une commande',
  steps: [
    'Vous envoyez la liste des produits, les quantités et le port.',
    'Nous envoyons un devis écrit sous 24 heures.',
    'Nous envoyons des échantillons si vous souhaitez les vérifier.',
    'Facture pro forma et acompte, puis préparation et emballage.',
    'Expédition depuis Nhava Sheva avec tous les documents d’export.',
  ],
  productsTitle: 'Nos produits les plus demandés',
  marketsTitle: 'Nos marchés',
  certsTitle: 'Certifications',
};

const contact = {
  title: 'Demander un devis',
  lead: 'Envoyez la liste des produits, les quantités et le port de destination : nous répondons avec un devis écrit sous 24 heures (du lundi au samedi).',
  fields: {
    name: 'Nom', company: 'Société', email: 'E-mail', phone: 'Téléphone / WhatsApp', country: 'Pays',
    products: 'Produits et quantités', productsHint: 'Ex. : cumin 99,5 % – 5 t, riz basmati 1121 sella – 20 t',
    port: 'Port de destination', notes: 'Remarques (emballage, étiquetage, certificats)',
  },
  send: 'Envoyer la demande', sending: 'Envoi…',
  sent: 'Merci, nous avons bien reçu votre demande. Notre équipe export vous répondra par e-mail sous 24 heures.',
  error: 'L’envoi a échoué. Réessayez ou contactez-nous sur WhatsApp.',
  privacy: 'Vos données servent uniquement à répondre à cette demande.',
  direct: 'Ou contactez-nous directement',
};

export default { ui, specLabels, products, home, contact };
