// Spanish text for the /es/ section. Facts (specs, images, HS codes) come from the English data.

const ui = {
  company: 'Sunita Agri Exports',
  status: 'Star Export House reconocida por el Gobierno de la India',
  nav: [['', 'Inicio'], ['products/', 'Productos'], ['exports/', 'Mercados'], ['contact/', 'Solicitar cotización']],
  skip: 'Ir al contenido',
  english: 'English',
  quote: 'Solicitar cotización',
  whatsapp: 'WhatsApp',
  hello: 'Hola, quisiera una cotización.',
  helloProduct: 'Hola, quisiera una cotización de: ',
  specs: 'Especificaciones',
  hsCode: 'Código SA',
  origin: 'Origen',
  india: 'India',
  grades: 'Calidades disponibles',
  packing: 'Embalaje',
  packingText: 'Sacos de 25 y 50 kg a granel, o envases minoristas con su propia marca y etiquetado en el idioma de su mercado.',
  specNote: 'Valores típicos; cada envío incluye un certificado de análisis y podemos suministrar según su especificación.',
  englishVersion: 'Versión en inglés y ficha técnica (PDF)',
  footer: 'Exportador de especias, arroz, legumbres y alimentos de la India desde Bombay, desde 2010.',
  productsHubText: 'Estos son nuestros productos más solicitados. Tenemos más de 380 productos: consulte el catálogo completo en inglés o envíenos su lista.',
  fullCatalogue: 'Catálogo completo (inglés)',
  sendList: 'Enviar su lista',
  exportsLead: 'Enviamos a más de 40 países. Cada mercado de abajo tiene una guía detallada (en inglés): puertos, etiquetado y documentos.',
  meta: {
    homeTitle: 'Sunita Agri Exports | Exportador de especias y arroz basmati de la India',
    homeDesc: 'Exportador indio de especias, arroz basmati, legumbres y alimentos desde Bombay desde 2010. Contenedores completos o mixtos, marca propia, cotización FOB/CIF en 24 horas.',
    productsTitle: 'Productos: especias, arroz basmati y legumbres de la India',
    productsDesc: 'Comino, cúrcuma, cardamomo, pimienta negra, arroz basmati 1121, garbanzos y mezclas de especias indias, a granel o con su marca.',
    exportsTitle: 'Mercados de exportación',
    exportsDesc: 'Especias, arroz y legumbres de la India enviados a más de 40 países desde Nhava Sheva (Bombay).',
    contactTitle: 'Solicitar cotización de especias y arroz de la India',
    contactDesc: 'Envíe su lista de productos, cantidades y puerto de destino: cotización FOB, CFR o CIF en 24 horas.',
    product: (name) => `${name}: exportador de la India`,
    productDescEnd: ' Cotización FOB y CIF en 24 horas.',
  },
};

const specLabels = {
  Purity: 'Pureza', Moisture: 'Humedad', 'Volatile Oil': 'Aceite volátil', 'Total Ash': 'Cenizas totales',
  'Acid Insoluble Ash': 'Cenizas insolubles en ácido', 'Foreign Matter': 'Materias extrañas', 'Curcumin Content': 'Contenido de curcumina',
  'Lead (Pb)': 'Plomo (Pb)', Pungency: 'Picor (SHU)', 'ASTA Color': 'Color (ASTA)', 'Aflatoxin / Ochratoxin': 'Aflatoxina / ocratoxina',
  'Size (Diameter)': 'Calibre (diámetro)', Immaturity: 'Cápsulas inmaduras', 'Piperine Content': 'Contenido de piperina',
  'Density (Bulk Weight)': 'Densidad (peso a granel)', 'Mouldy Berries': 'Granos mohosos', Splits: 'Granos partidos', 'Damaged Seeds': 'Semillas dañadas',
  'Average Grain Length': 'Longitud media del grano', Admixture: 'Mezcla de variedades', 'Broken Grain': 'Granos quebrados', 'Chalky Grains': 'Granos yesosos',
  'Size (Count)': 'Calibre (conteo)', 'Weevilled/Damaged': 'Gorgojados / dañados', Salmonella: 'Salmonela', 'E. coli': 'E. coli',
};

const products = {
  'cumin-seeds': { category: 'indian-spices', name: 'Semillas de comino', description: 'Comino aromático de la zona de Unjha (Gujarat) y de Rajastán, limpiado a máquina y clasificado con selector óptico (Sortex), para mayoristas, molineros y fabricantes de condimentos.', uses: 'Arroces, currys, mezclas de especias y panadería.' },
  'turmeric-powder': { category: 'indian-spices', name: 'Cúrcuma en polvo', description: 'Cúrcuma molida de rizomas secos de Erode, Sangli y Nizamabad, de color amarillo intenso y contenido de curcumina definido, sin colorantes ni aditivos.', uses: 'Currys, salsas, mezclas de especias e industria alimentaria.' },
  'red-chilli-powder': { category: 'indian-spices', name: 'Chile rojo en polvo', description: 'Chile rojo molido de chiles de Guntur y Byadgi, con picor y color (ASTA) ajustados a su pedido.', uses: 'Salsas, mezclas de especias, snacks y restauración.' },
  'green-cardamom': { category: 'indian-spices', name: 'Cardamomo verde', description: 'Cardamomo verde de Kerala, calibres de 6, 7 y 8 mm o más, de color verde y aroma intenso.', uses: 'Café, té, repostería y platos de arroz.' },
  'black-pepper': { category: 'indian-spices', name: 'Pimienta negra en grano', description: 'Pimienta negra de la costa de Malabar, densidades de 500, 550 y 600 g/l, con contenido de piperina definido.', uses: 'Molienda, mezclas de especias, embutidos y restauración.' },
  'coriander-seeds': { category: 'indian-spices', name: 'Semillas de cilantro', description: 'Semillas de cilantro de Rajastán y Gujarat, enteras o partidas, limpias y clasificadas para molienda y envasado.', uses: 'Mezclas de especias, encurtidos y embutidos.' },
  '1121-basmati-rice': { category: 'rice', name: 'Arroz basmati 1121', description: 'Arroz basmati 1121 de grano extralargo, blanco, vaporizado (sella) o dorado, con una longitud media superior a 8,3 mm antes de cocinar.', uses: 'Biryani, pilaf y restauración.' },
  'split-toor-dal': { category: 'pulses-legumes', name: 'Toor dal (guandú pelado y partido)', description: 'Guandú pelado y partido, limpio, pulido o sin pulir.', uses: 'Dal, sopas y tiendas de alimentación india.' },
  'kabuli-chickpeas': { category: 'pulses-legumes', name: 'Garbanzos Kabuli', description: 'Garbanzos blancos Kabuli de 7, 8 y 9 mm, limpios y calibrados.', uses: 'Hummus, falafel, conservas y platos preparados.' },
  'garam-masala': { category: 'indian-spices', name: 'Garam masala', description: 'Mezcla de especias india de comino, cilantro, pimienta negra, cardamomo, canela y clavo, a granel o con su marca.', uses: 'Restaurantes, cocinas centrales y envasado minorista.' },
};

const home = {
  title: 'Especias y arroz de la India, a todo el mundo',
  lead: 'Exportamos desde 2010 especias, arroz basmati, legumbres y alimentos de la India, en contenedores completos o mixtos, y con su propia marca si lo desea.',
  facts: [['Desde 2010', 'exportando'], ['40+ países', 'atendidos'], ['24 horas', 'para una cotización escrita'], ['1 tonelada', 'mínimo por producto a granel']],
  whyTitle: 'Por qué nos eligen los importadores',
  why: [
    ['Un solo contenedor mixto', 'Especias, arroz, legumbres y productos envasados en un mismo contenedor, con una factura y un juego de documentos.'],
    ['Su propia marca', 'Envases minoristas con su marca, etiquetados en el idioma y según las normas de su mercado.'],
    ['Calidad verificable', 'Ficha técnica de cada producto, certificado de análisis en cada envío y muestras antes del pedido.'],
    ['FOB, CFR o CIF', 'Cotización escrita en dólares estadounidenses en 24 horas tras recibir su solicitud.'],
  ],
  stepsTitle: 'Cómo se hace un pedido',
  steps: [
    'Usted envía la lista de productos, cantidades y puerto.',
    'Enviamos una cotización escrita en 24 horas.',
    'Enviamos muestras si desea comprobarlas primero.',
    'Factura proforma y anticipo; después, preparación y embalaje.',
    'Envío desde Nhava Sheva con todos los documentos de exportación.',
  ],
  productsTitle: 'Nuestros productos más solicitados',
  marketsTitle: 'Nuestros mercados',
  certsTitle: 'Certificaciones',
};

const contact = {
  title: 'Solicitar cotización',
  lead: 'Envíe la lista de productos, cantidades y puerto de destino: respondemos con una cotización escrita en 24 horas (de lunes a sábado).',
  fields: {
    name: 'Nombre', company: 'Empresa', email: 'Correo electrónico', phone: 'Teléfono / WhatsApp', country: 'País',
    products: 'Productos y cantidades', productsHint: 'Ej.: comino 99,5 % – 5 t, arroz basmati 1121 sella – 20 t',
    port: 'Puerto de destino', notes: 'Notas (embalaje, etiquetado, certificados)',
  },
  send: 'Enviar solicitud', sending: 'Enviando…',
  sent: 'Gracias, hemos recibido su solicitud. Nuestro equipo de exportación le responderá por correo en 24 horas.',
  error: 'No se pudo enviar. Inténtelo de nuevo o escríbanos por WhatsApp.',
  privacy: 'Sus datos se usan solo para responder a esta solicitud.',
  direct: 'O contáctenos directamente',
};

export default { ui, specLabels, products, home, contact };
