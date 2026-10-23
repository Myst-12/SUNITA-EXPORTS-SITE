/**
 * JSON-LD Schema Generators
 * Sunita Agri Exports Pvt. Ltd.
 */

import { SITE_URL, COMPANY as SITE_COMPANY, CONTACT, SOCIAL } from '@/config/site';

const COMPANY = {
  name: SITE_COMPANY.legalName,
  legalName: SITE_COMPANY.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}${SITE_COMPANY.logo}`,
  phone: CONTACT.phones[0].tel,
  email: CONTACT.email,
  address: {
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.city,
    addressRegion: CONTACT.address.region,
    postalCode: CONTACT.address.postalCode,
    addressCountry: CONTACT.address.countryCode,
  },
  foundingDate: String(SITE_COMPANY.foundingYear),
  description: SITE_COMPANY.description,
  sameAs: SOCIAL.map((s) => s.url).filter(Boolean), // only profiles that exist
};

/** WebSite: the site's name for Google's site-name display. Homepage only. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_COMPANY.name,
    alternateName: COMPANY.legalName,
    url: `${SITE_URL}/`,
    inLanguage: 'en',
    publisher: { '@type': 'Organization', name: COMPANY.name, url: SITE_URL },
  };
}

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
      latitude: String(CONTACT.geo.lat),
      longitude: String(CONTACT.geo.lng),
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
