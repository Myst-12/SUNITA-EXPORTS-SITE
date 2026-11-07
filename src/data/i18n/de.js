// German text for the /de/ section. Facts (specs, images, HS codes) come from the English data.

const ui = {
  company: 'Sunita Agri Exports',
  status: 'Von der indischen Regierung anerkanntes Star Export House',
  nav: [['', 'Startseite'], ['products/', 'Produkte'], ['exports/', 'Märkte'], ['contact/', 'Angebot anfordern']],
  skip: 'Zum Inhalt',
  english: 'English',
  quote: 'Angebot anfordern',
  whatsapp: 'WhatsApp',
  hello: 'Hallo, ich hätte gern ein Angebot.',
  helloProduct: 'Hallo, ich hätte gern ein Angebot für: ',
  specs: 'Spezifikationen',
  hsCode: 'HS-Code',
  origin: 'Herkunft',
  india: 'Indien',
  grades: 'Verfügbare Qualitäten',
  packing: 'Verpackung',
  packingText: 'Säcke zu 25 und 50 kg als Bulkware oder Einzelhandelspackungen unter Ihrer eigenen Marke, mit Etikett in der Sprache Ihres Marktes.',
  specNote: 'Typische Werte; jede Lieferung erhält ein Analysezertifikat, und wir liefern auch nach Ihrer Spezifikation.',
  englishVersion: 'Englische Version und Datenblatt (PDF)',
  footer: 'Exporteur indischer Gewürze, Reis, Hülsenfrüchte und Lebensmittel aus Mumbai seit 2010.',
  productsHubText: 'Das sind unsere meistgefragten Produkte. Insgesamt führen wir über 380 Produkte: Sehen Sie sich den vollständigen Katalog auf Englisch an oder senden Sie uns Ihre Liste.',
  fullCatalogue: 'Vollständiger Katalog (Englisch)',
  sendList: 'Ihre Liste senden',
  exportsLead: 'Wir liefern in über 40 Länder. Zu jedem Markt unten gibt es einen ausführlichen Leitfaden (auf Englisch): Häfen, Kennzeichnung und Dokumente.',
  meta: {
    homeTitle: 'Sunita Agri Exports | Exporteur indischer Gewürze und Basmati-Reis',
    homeDesc: 'Indischer Exporteur von Gewürzen, Basmati-Reis, Hülsenfrüchten und Lebensmitteln aus Mumbai seit 2010. Volle oder gemischte Container, Eigenmarken, FOB/CIF-Angebot in 24 Stunden.',
    productsTitle: 'Produkte: Gewürze, Basmati-Reis und Hülsenfrüchte aus Indien',
    productsDesc: 'Kreuzkümmel, Kurkuma, Kardamom, schwarzer Pfeffer, Basmati-Reis 1121, Kichererbsen und indische Gewürzmischungen, lose oder unter Ihrer Marke.',
    exportsTitle: 'Exportmärkte',
    exportsDesc: 'Gewürze, Reis und Hülsenfrüchte aus Indien, verschifft ab Nhava Sheva (Mumbai) in über 40 Länder.',
    contactTitle: 'Angebot für indische Gewürze und Reis anfordern',
    contactDesc: 'Senden Sie Produktliste, Mengen und Zielhafen: FOB-, CFR- oder CIF-Angebot innerhalb von 24 Stunden.',
    product: (name) => `${name}: Exporteur aus Indien`,
    productDescEnd: ' FOB- und CIF-Angebot in 24 Stunden.',
  },
};

const specLabels = {
  Purity: 'Reinheit', Moisture: 'Feuchtigkeit', 'Volatile Oil': 'Ätherisches Öl', 'Total Ash': 'Gesamtasche',
  'Acid Insoluble Ash': 'Säureunlösliche Asche', 'Foreign Matter': 'Fremdbestandteile', 'Curcumin Content': 'Curcumingehalt',
  'Lead (Pb)': 'Blei (Pb)', Pungency: 'Schärfe (SHU)', 'ASTA Color': 'Farbe (ASTA)', 'Aflatoxin / Ochratoxin': 'Aflatoxin / Ochratoxin',
  'Size (Diameter)': 'Größe (Durchmesser)', Immaturity: 'Unreife Kapseln', 'Piperine Content': 'Piperingehalt',
  'Density (Bulk Weight)': 'Dichte (Schüttgewicht)', 'Mouldy Berries': 'Schimmelige Beeren', Splits: 'Bruch', 'Damaged Seeds': 'Beschädigte Samen',
  'Average Grain Length': 'Durchschnittliche Kornlänge', Admixture: 'Sortenbeimischung', 'Broken Grain': 'Bruchkorn', 'Chalky Grains': 'Kreidige Körner',
  'Size (Count)': 'Größe (Stückzahl)', 'Weevilled/Damaged': 'Käferbefall / beschädigt', Salmonella: 'Salmonellen', 'E. coli': 'E. coli',
};

const products = {
  'cumin-seeds': { category: 'indian-spices', name: 'Kreuzkümmel (Cumin), ganz', description: 'Aromatischer Kreuzkümmel aus der Region Unjha (Gujarat) und aus Rajasthan, maschinell gereinigt und optisch sortiert (Sortex), für Händler, Mühlen und Würzmittelhersteller.', uses: 'Reisgerichte, Currys, Gewürzmischungen und Backwaren.' },
  'turmeric-powder': { category: 'indian-spices', name: 'Kurkuma, gemahlen', description: 'Gemahlene Kurkuma aus getrockneten Rhizomen aus Erode, Sangli und Nizamabad, leuchtend gelb, mit definiertem Curcumingehalt, ohne Farb- oder Zusatzstoffe.', uses: 'Currys, Saucen, Gewürzmischungen und Lebensmittelindustrie.' },
  'red-chilli-powder': { category: 'indian-spices', name: 'Rotes Chilipulver', description: 'Gemahlener roter Chili aus Guntur- und Byadgi-Chilis, Schärfe und Farbe (ASTA) nach Ihren Vorgaben.', uses: 'Saucen, Gewürzmischungen, Snacks und Gastronomie.' },
  'green-cardamom': { category: 'indian-spices', name: 'Grüner Kardamom', description: 'Grüner Kardamom aus Kerala, Größen 6, 7 und 8 mm und mehr, kräftig grün und sehr aromatisch.', uses: 'Kaffee, Tee, Backwaren und Reisgerichte.' },
  'black-pepper': { category: 'indian-spices', name: 'Schwarzer Pfeffer, ganz', description: 'Schwarzer Pfeffer von der Malabarküste, Dichten von 500, 550 und 600 g/l, mit definiertem Piperingehalt.', uses: 'Vermahlung, Gewürzmischungen, Fleischwaren und Gastronomie.' },
  'coriander-seeds': { category: 'indian-spices', name: 'Koriandersamen', description: 'Koriandersamen aus Rajasthan und Gujarat, ganz oder gebrochen, gereinigt und sortiert für Vermahlung und Abpackung.', uses: 'Gewürzmischungen, Eingelegtes und Fleischwaren.' },
  '1121-basmati-rice': { category: 'rice', name: 'Basmati-Reis 1121', description: 'Extralanger Basmati-Reis 1121, weiß, parboiled (Sella) oder golden, mit einer durchschnittlichen Kornlänge von über 8,3 mm vor dem Kochen.', uses: 'Biryani, Pilaw und Gastronomie.' },
  'split-toor-dal': { category: 'pulses-legumes', name: 'Toor Dal (geschälte Straucherbsen)', description: 'Geschälte, halbierte Straucherbsen, gereinigt, poliert oder unpoliert.', uses: 'Dal, Suppen und indische Lebensmittelgeschäfte.' },
  'kabuli-chickpeas': { category: 'pulses-legumes', name: 'Kabuli-Kichererbsen', description: 'Weiße Kabuli-Kichererbsen in 7, 8 und 9 mm, gereinigt und kalibriert.', uses: 'Hummus, Falafel, Konserven und Fertiggerichte.' },
  'garam-masala': { category: 'indian-spices', name: 'Garam Masala', description: 'Indische Gewürzmischung aus Kreuzkümmel, Koriander, schwarzem Pfeffer, Kardamom, Zimt und Nelken, lose oder unter Ihrer Marke.', uses: 'Restaurants, Großküchen und Einzelhandelsabpackung.' },
};

const home = {
  title: 'Gewürze und Reis aus Indien, weltweit geliefert',
  lead: 'Seit 2010 exportieren wir indische Gewürze, Basmati-Reis, Hülsenfrüchte und Lebensmittel, in vollen oder gemischten Containern und auf Wunsch unter Ihrer eigenen Marke.',
  facts: [['Seit 2010', 'im Export'], ['40+ Länder', 'beliefert'], ['24 Stunden', 'bis zum schriftlichen Angebot'], ['1 Tonne', 'Mindestmenge je Bulkprodukt']],
  whyTitle: 'Warum Importeure bei uns kaufen',
  why: [
    ['Ein gemischter Container', 'Gewürze, Reis, Hülsenfrüchte und verpackte Waren in einem Container, mit einer Rechnung und einem Satz Dokumente.'],
    ['Ihre Eigenmarke', 'Einzelhandelspackungen unter Ihrer Marke, gekennzeichnet in der Sprache und nach den Regeln Ihres Marktes.'],
    ['Prüfbare Qualität', 'Datenblatt für jedes Produkt, Analysezertifikat für jede Lieferung, Muster vor der Bestellung.'],
    ['FOB, CFR oder CIF', 'Schriftliches Angebot in US-Dollar innerhalb von 24 Stunden nach Ihrer Anfrage.'],
  ],
  stepsTitle: 'So läuft eine Bestellung ab',
  steps: [
    'Sie senden Produktliste, Mengen und Hafen.',
    'Wir senden innerhalb von 24 Stunden ein schriftliches Angebot.',
    'Auf Wunsch senden wir vorab Muster.',
    'Proformarechnung und Anzahlung, dann Vorbereitung und Verpackung.',
    'Verschiffung ab Nhava Sheva mit allen Exportdokumenten.',
  ],
  productsTitle: 'Unsere meistgefragten Produkte',
  marketsTitle: 'Unsere Märkte',
  certsTitle: 'Zertifikate',
};

const contact = {
  title: 'Angebot anfordern',
  lead: 'Senden Sie Produktliste, Mengen und Zielhafen: Wir antworten innerhalb von 24 Stunden mit einem schriftlichen Angebot (Montag bis Samstag).',
  fields: {
    name: 'Name', company: 'Firma', email: 'E-Mail', phone: 'Telefon / WhatsApp', country: 'Land',
    products: 'Produkte und Mengen', productsHint: 'z. B. Kreuzkümmel 99,5 % – 5 t, Basmati 1121 Sella – 20 t',
    port: 'Zielhafen', notes: 'Hinweise (Verpackung, Etikett, Zertifikate)',
  },
  send: 'Anfrage senden', sending: 'Wird gesendet…',
  sent: 'Vielen Dank, Ihre Anfrage ist eingegangen. Unser Exportteam antwortet Ihnen innerhalb von 24 Stunden per E-Mail.',
  error: 'Senden fehlgeschlagen. Bitte erneut versuchen oder uns über WhatsApp schreiben.',
  privacy: 'Ihre Daten werden nur zur Beantwortung dieser Anfrage verwendet.',
  direct: 'Oder direkt Kontakt aufnehmen',
};

export default { ui, specLabels, products, home, contact };
