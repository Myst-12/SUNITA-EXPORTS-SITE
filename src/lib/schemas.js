/**
 * JSON-LD Schema Generators
 * Sunita Agri Exports Pvt. Ltd.
 */

const COMPANY = {
  name: 'Sunita Agri Exports Pvt. Ltd.',
  legalName: 'Sunita Agri Exports Pvt. Ltd.',
  url: 'https://www.sunitaexports.com',
  logo: 'https://www.sunitaexports.com/images/logo.png',
  phone: '+918169282942',
  email: 'sales@sunitaexports.com',
  address: {
    streetAddress: '1014, Ghanshyam Enclave, Laljipada, Link Road, Kandivali (West)',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400067',
    addressCountry: 'IN',
  },
  foundingDate: '1994',
  description:
    'Leading Indian exporter of premium spices, rice, pulses, oilseeds, and agri commodities serving importers and distributors across 40+ countries since 1994.',
  sameAs: [
    'https://www.linkedin.com/company/sunita-agri-exports',
    'https://www.facebook.com/sunitaagriexports',
  ],
};

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: COMPANY.url,
    logo: COMPANY.logo,
    foundingDate: COMPANY.foundingDate,
    description: COMPANY.description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY.phone,
      email: COMPANY.email,
      contactType: 'sales',
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'Worldwide',
    },
    address: {
      '@type': 'PostalAddress',
      ...COMPANY.address,
    },
    sameAs: COMPANY.sameAs,
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': COMPANY.url,
    name: COMPANY.name,
    url: COMPANY.url,
    logo: COMPANY.logo,
    image: COMPANY.logo,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    description: COMPANY.description,
    foundingDate: COMPANY.foundingDate,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      ...COMPANY.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.2042',
      longitude: '72.8347',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: COMPANY.sameAs,
  };
}

export function productSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image ? `${COMPANY.url}${product.image}` : undefined,
    brand: {
      '@type': 'Brand',
      name: COMPANY.name,
    },
    manufacturer: {
      '@type': 'Organization',
      name: COMPANY.name,
      url: COMPANY.url,
    },
    category: product.category || 'Agricultural Products',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      seller: {
        '@type': 'Organization',
        name: COMPANY.name,
      },
    },
    ...(product.sku ? { sku: product.sku } : {}),
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.description,
    image: post.image ? `${COMPANY.url}${post.image}` : undefined,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate || post.publishedDate,
    author: {
      '@type': 'Organization',
      name: COMPANY.name,
      url: COMPANY.url,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.name,
      logo: {
        '@type': 'ImageObject',
        url: COMPANY.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url ? `${COMPANY.url}${post.url}` : COMPANY.url,
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${COMPANY.url}${item.href}` : undefined,
    })),
  };
}
