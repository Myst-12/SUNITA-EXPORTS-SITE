// Visitor-facing text for event forms. Answers are always stored in English (values, not labels),
// so the Excel file stays readable whatever language the visitor used. The heading, intro and
// custom questions are shown exactly as the admin typed them.

export const FORM_LANGS = [
  ['en', 'English'], ['ar', 'العربية'], ['hi', 'हिन्दी'], ['fr', 'Français'], ['es', 'Español'],
  ['ru', 'Русский'], ['zh', '中文'], ['tr', 'Türkçe'], ['de', 'Deutsch'], ['pt', 'Português'],
];
export const RTL = new Set(['ar']);

const BIZ = ['Importer / Distributor', 'Supermarket / Retail chain', 'Wholesaler', 'Food manufacturer', 'Restaurant / HoReCa', 'Trader / Agent', 'Other'];

const T = {
  en: {
    optional: 'optional', choose: 'Choose…', submit: 'Submit', sending: 'Sending…', code: 'Code', number: 'Phone number',
    search: 'Search or type a product', add: 'Add', noMatch: 'Not in the list? Type it and tap Add.', remove: 'Remove',
    thanks: 'Thank you!', thanksText: 'We’ve received your details and will contact you soon.',
    whatsapp: 'WhatsApp us', again: 'Fill in for someone else', visit: 'Visit our website',
    closed: 'This form is closed. Thank you for your interest — please contact us on WhatsApp or by email.',
    netErr: 'No internet connection. Please check it and tap Submit again.', err: 'Could not send. Please try again.',
    fields: { name: 'Your name', company: 'Company', email: 'Email', phone: 'Phone / WhatsApp', country: 'Country', city: 'City', businessType: 'Business type', products: 'Products you are interested in', quantity: 'Expected quantity', website: 'Company website', notes: 'Notes' },
    biz: BIZ,
  },
  ar: {
    optional: 'اختياري', choose: 'اختر…', submit: 'إرسال', sending: 'جارٍ الإرسال…', code: 'الرمز', number: 'رقم الهاتف',
    search: 'ابحث عن منتج أو اكتبه', add: 'إضافة', noMatch: 'غير موجود في القائمة؟ اكتبه واضغط إضافة.', remove: 'إزالة',
    thanks: 'شكراً لك!', thanksText: 'تم استلام بياناتك وسنتواصل معك قريباً.',
    whatsapp: 'راسلنا على واتساب', again: 'تعبئة النموذج لشخص آخر', visit: 'زيارة موقعنا',
    closed: 'تم إغلاق هذا النموذج. شكراً لاهتمامك — يرجى التواصل معنا عبر واتساب أو البريد الإلكتروني.',
    netErr: 'لا يوجد اتصال بالإنترنت. يرجى التحقق ثم الضغط على إرسال مرة أخرى.', err: 'تعذّر الإرسال. يرجى المحاولة مرة أخرى.',
    fields: { name: 'الاسم', company: 'الشركة', email: 'البريد الإلكتروني', phone: 'الهاتف / واتساب', country: 'الدولة', city: 'المدينة', businessType: 'نوع النشاط', products: 'المنتجات التي تهمك', quantity: 'الكمية المتوقعة', website: 'موقع الشركة', notes: 'ملاحظات' },
    biz: ['مستورد / موزع', 'سوبرماركت / سلسلة متاجر', 'تاجر جملة', 'مصنّع أغذية', 'مطعم / فنادق وتموين', 'تاجر / وكيل', 'أخرى'],
  },
  hi: {
    optional: 'वैकल्पिक', choose: 'चुनें…', submit: 'भेजें', sending: 'भेजा जा रहा है…', code: 'कोड', number: 'फ़ोन नंबर',
    search: 'उत्पाद खोजें या लिखें', add: 'जोड़ें', noMatch: 'सूची में नहीं है? लिखें और जोड़ें दबाएँ।', remove: 'हटाएँ',
    thanks: 'धन्यवाद!', thanksText: 'हमें आपकी जानकारी मिल गई है, हम जल्द ही आपसे संपर्क करेंगे।',
    whatsapp: 'व्हाट्सऐप करें', again: 'किसी और के लिए भरें', visit: 'हमारी वेबसाइट देखें',
    closed: 'यह फ़ॉर्म बंद हो गया है। रुचि के लिए धन्यवाद — कृपया व्हाट्सऐप या ईमेल से संपर्क करें।',
    netErr: 'इंटरनेट कनेक्शन नहीं है। कृपया जाँचें और फिर से भेजें दबाएँ।', err: 'भेजा नहीं जा सका। कृपया फिर से कोशिश करें।',
    fields: { name: 'आपका नाम', company: 'कंपनी', email: 'ईमेल', phone: 'फ़ोन / व्हाट्सऐप', country: 'देश', city: 'शहर', businessType: 'व्यवसाय का प्रकार', products: 'आपकी रुचि के उत्पाद', quantity: 'अनुमानित मात्रा', website: 'कंपनी की वेबसाइट', notes: 'टिप्पणी' },
    biz: ['आयातक / वितरक', 'सुपरमार्केट / रिटेल चेन', 'थोक व्यापारी', 'खाद्य निर्माता', 'रेस्टोरेंट / होरेका', 'ट्रेडर / एजेंट', 'अन्य'],
  },
  fr: {
    optional: 'facultatif', choose: 'Choisir…', submit: 'Envoyer', sending: 'Envoi…', code: 'Indicatif', number: 'Numéro de téléphone',
    search: 'Rechercher ou saisir un produit', add: 'Ajouter', noMatch: 'Pas dans la liste ? Saisissez-le puis Ajouter.', remove: 'Retirer',
    thanks: 'Merci !', thanksText: 'Nous avons bien reçu vos coordonnées et vous contacterons rapidement.',
    whatsapp: 'Écrivez-nous sur WhatsApp', again: 'Remplir pour une autre personne', visit: 'Visiter notre site',
    closed: 'Ce formulaire est fermé. Merci de votre intérêt — contactez-nous sur WhatsApp ou par e-mail.',
    netErr: 'Pas de connexion internet. Vérifiez-la puis appuyez à nouveau sur Envoyer.', err: 'Envoi impossible. Veuillez réessayer.',
    fields: { name: 'Votre nom', company: 'Société', email: 'E-mail', phone: 'Téléphone / WhatsApp', country: 'Pays', city: 'Ville', businessType: 'Type d’activité', products: 'Produits qui vous intéressent', quantity: 'Quantité prévue', website: 'Site web de la société', notes: 'Remarques' },
    biz: ['Importateur / Distributeur', 'Supermarché / Chaîne de magasins', 'Grossiste', 'Fabricant alimentaire', 'Restaurant / CHR', 'Négociant / Agent', 'Autre'],
  },
  es: {
    optional: 'opcional', choose: 'Elegir…', submit: 'Enviar', sending: 'Enviando…', code: 'Código', number: 'Número de teléfono',
    search: 'Busca o escribe un producto', add: 'Añadir', noMatch: '¿No está en la lista? Escríbelo y pulsa Añadir.', remove: 'Quitar',
    thanks: '¡Gracias!', thanksText: 'Hemos recibido sus datos y nos pondremos en contacto pronto.',
    whatsapp: 'Escríbanos por WhatsApp', again: 'Rellenar para otra persona', visit: 'Visitar nuestra web',
    closed: 'Este formulario está cerrado. Gracias por su interés — contáctenos por WhatsApp o correo electrónico.',
    netErr: 'Sin conexión a internet. Compruébela y pulse Enviar de nuevo.', err: 'No se pudo enviar. Inténtelo de nuevo.',
    fields: { name: 'Su nombre', company: 'Empresa', email: 'Correo electrónico', phone: 'Teléfono / WhatsApp', country: 'País', city: 'Ciudad', businessType: 'Tipo de negocio', products: 'Productos que le interesan', quantity: 'Cantidad prevista', website: 'Web de la empresa', notes: 'Notas' },
    biz: ['Importador / Distribuidor', 'Supermercado / Cadena minorista', 'Mayorista', 'Fabricante de alimentos', 'Restaurante / HORECA', 'Comerciante / Agente', 'Otro'],
  },
  ru: {
    optional: 'необязательно', choose: 'Выберите…', submit: 'Отправить', sending: 'Отправка…', code: 'Код', number: 'Номер телефона',
    search: 'Найдите или введите товар', add: 'Добавить', noMatch: 'Нет в списке? Введите и нажмите «Добавить».', remove: 'Удалить',
    thanks: 'Спасибо!', thanksText: 'Мы получили ваши данные и скоро свяжемся с вами.',
    whatsapp: 'Написать в WhatsApp', again: 'Заполнить за другого человека', visit: 'Перейти на наш сайт',
    closed: 'Эта форма закрыта. Спасибо за интерес — свяжитесь с нами в WhatsApp или по почте.',
    netErr: 'Нет подключения к интернету. Проверьте его и нажмите «Отправить» снова.', err: 'Не удалось отправить. Попробуйте ещё раз.',
    fields: { name: 'Ваше имя', company: 'Компания', email: 'Эл. почта', phone: 'Телефон / WhatsApp', country: 'Страна', city: 'Город', businessType: 'Вид деятельности', products: 'Интересующие товары', quantity: 'Ожидаемый объём', website: 'Сайт компании', notes: 'Примечания' },
    biz: ['Импортёр / Дистрибьютор', 'Супермаркет / Розничная сеть', 'Оптовик', 'Пищевой производитель', 'Ресторан / HoReCa', 'Трейдер / Агент', 'Другое'],
  },
  zh: {
    optional: '选填', choose: '请选择…', submit: '提交', sending: '提交中…', code: '区号', number: '电话号码',
    search: '搜索或输入产品', add: '添加', noMatch: '列表中没有？输入后点“添加”。', remove: '移除',
    thanks: '谢谢！', thanksText: '我们已收到您的信息，会尽快与您联系。',
    whatsapp: 'WhatsApp 联系我们', again: '为他人填写', visit: '访问我们的网站',
    closed: '此表单已关闭。感谢您的关注——请通过 WhatsApp 或电子邮件联系我们。',
    netErr: '没有网络连接。请检查后再次点击提交。', err: '提交失败，请重试。',
    fields: { name: '您的姓名', company: '公司', email: '电子邮箱', phone: '电话 / WhatsApp', country: '国家', city: '城市', businessType: '业务类型', products: '感兴趣的产品', quantity: '预计数量', website: '公司网站', notes: '备注' },
    biz: ['进口商 / 经销商', '超市 / 零售连锁', '批发商', '食品生产商', '餐厅 / 酒店餐饮', '贸易商 / 代理', '其他'],
  },
  tr: {
    optional: 'isteğe bağlı', choose: 'Seçin…', submit: 'Gönder', sending: 'Gönderiliyor…', code: 'Kod', number: 'Telefon numarası',
    search: 'Ürün arayın veya yazın', add: 'Ekle', noMatch: 'Listede yok mu? Yazıp Ekle’ye dokunun.', remove: 'Kaldır',
    thanks: 'Teşekkürler!', thanksText: 'Bilgilerinizi aldık, en kısa sürede sizinle iletişime geçeceğiz.',
    whatsapp: 'WhatsApp’tan yazın', again: 'Başkası için doldur', visit: 'Web sitemizi ziyaret edin',
    closed: 'Bu form kapatıldı. İlginiz için teşekkürler — lütfen WhatsApp veya e-posta ile bize ulaşın.',
    netErr: 'İnternet bağlantısı yok. Kontrol edip tekrar Gönder’e dokunun.', err: 'Gönderilemedi. Lütfen tekrar deneyin.',
    fields: { name: 'Adınız', company: 'Şirket', email: 'E-posta', phone: 'Telefon / WhatsApp', country: 'Ülke', city: 'Şehir', businessType: 'İşletme türü', products: 'İlgilendiğiniz ürünler', quantity: 'Tahmini miktar', website: 'Şirket web sitesi', notes: 'Notlar' },
    biz: ['İthalatçı / Distribütör', 'Süpermarket / Perakende zinciri', 'Toptancı', 'Gıda üreticisi', 'Restoran / HoReCa', 'Tüccar / Acente', 'Diğer'],
  },
  de: {
    optional: 'optional', choose: 'Auswählen…', submit: 'Absenden', sending: 'Wird gesendet…', code: 'Vorwahl', number: 'Telefonnummer',
    search: 'Produkt suchen oder eingeben', add: 'Hinzufügen', noMatch: 'Nicht in der Liste? Eingeben und Hinzufügen tippen.', remove: 'Entfernen',
    thanks: 'Vielen Dank!', thanksText: 'Wir haben Ihre Angaben erhalten und melden uns bald.',
    whatsapp: 'Per WhatsApp schreiben', again: 'Für eine andere Person ausfüllen', visit: 'Unsere Website besuchen',
    closed: 'Dieses Formular ist geschlossen. Danke für Ihr Interesse — kontaktieren Sie uns per WhatsApp oder E-Mail.',
    netErr: 'Keine Internetverbindung. Bitte prüfen und erneut auf Absenden tippen.', err: 'Senden fehlgeschlagen. Bitte erneut versuchen.',
    fields: { name: 'Ihr Name', company: 'Firma', email: 'E-Mail', phone: 'Telefon / WhatsApp', country: 'Land', city: 'Stadt', businessType: 'Geschäftsart', products: 'Gewünschte Produkte', quantity: 'Erwartete Menge', website: 'Firmenwebsite', notes: 'Anmerkungen' },
    biz: ['Importeur / Distributor', 'Supermarkt / Handelskette', 'Großhändler', 'Lebensmittelhersteller', 'Restaurant / Gastronomie', 'Händler / Agent', 'Sonstiges'],
  },
  pt: {
    optional: 'opcional', choose: 'Escolher…', submit: 'Enviar', sending: 'Enviando…', code: 'Código', number: 'Número de telefone',
    search: 'Pesquise ou digite um produto', add: 'Adicionar', noMatch: 'Não está na lista? Digite e toque em Adicionar.', remove: 'Remover',
    thanks: 'Obrigado!', thanksText: 'Recebemos os seus dados e entraremos em contato em breve.',
    whatsapp: 'Fale conosco no WhatsApp', again: 'Preencher para outra pessoa', visit: 'Visitar o nosso site',
    closed: 'Este formulário está fechado. Obrigado pelo interesse — fale conosco por WhatsApp ou e-mail.',
    netErr: 'Sem conexão à internet. Verifique e toque em Enviar novamente.', err: 'Não foi possível enviar. Tente novamente.',
    fields: { name: 'Seu nome', company: 'Empresa', email: 'E-mail', phone: 'Telefone / WhatsApp', country: 'País', city: 'Cidade', businessType: 'Tipo de negócio', products: 'Produtos de interesse', quantity: 'Quantidade prevista', website: 'Site da empresa', notes: 'Observações' },
    biz: ['Importador / Distribuidor', 'Supermercado / Rede varejista', 'Atacadista', 'Fabricante de alimentos', 'Restaurante / Food service', 'Trader / Agente', 'Outro'],
  },
};

export const BUSINESS_TYPES = BIZ;
export const strings = (lang) => T[lang] || T.en;

/** Picks the visitor's language from their browser, falling back to English. */
export function detectLang(languages = []) {
  for (const tag of languages) {
    const base = tag.toLowerCase().split('-')[0];
    if (base === 'en') return 'en';
    if (T[base]) return base;
  }
  return 'en';
}
