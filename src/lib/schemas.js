/**
 * JSON-LD Schema Generators
 * Sunita Agri Exports Pvt. Ltd.
 */

import { SITE_URL, COMPANY as SITE_COMPANY, CONTACT, SOCIAL, LISTINGS, DIRECTORS } from '@/config/site';
import { certificates } from '@/data/certificates';
import { exportDestinations } from '@/data/countries';
import { productCategories } from '@/data/products';

const COMPANY = {
  name: SITE_COMPANY.legalName,
  legalName: SITE_COMPANY.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}${SITE_COMPANY.logo}`,
  phone: CONTACT.phones[0].tel,
  email: CONTACT.emails,
  address: {
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.city,
    addressRegion: CONTACT.address.region,
    postalCode: CONTACT.address.postalCode,
    addressCountry: CONTACT.address.countryCode,
  },
  ukAddress: {
    streetAddress: CONTACT.ukOffice.street,
    addressLocality: CONTACT.ukOffice.city,
    addressRegion: CONTACT.ukOffice.region,
    postalCode: CONTACT.ukOffice.postalCode,
    addressCountry: CONTACT.ukOffice.countryCode,
  },
  foundingDate: String(SITE_COMPANY.foundingYear),
  description: SITE_COMPANY.description,
  sameAs: [...SOCIAL.map((s) => s.url).filter(Boolean), ...LISTINGS], // only profiles that exist
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
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    alternateName: [SITE_COMPANY.name, SITE_COMPANY.shortName],
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
    address: [
      { '@type': 'PostalAddress', ...COMPANY.address },
      { '@type': 'PostalAddress', ...COMPANY.ukAddress },
    ],
    sameAs: COMPANY.sameAs,
    // Who runs it, what it knows and where it sells: the facts AI assistants use to describe a company.
    employee: DIRECTORS.map((d) => ({ '@type': 'Person', name: d.name, jobTitle: d.role })),
    knowsAbout: productCategories.map((c) => c.name),
    areaServed: exportDestinations.map((d) => ({ '@type': 'Place', name: d.name })),
    hasCertification: certificates.map((c) => ({ '@type': 'Certification', name: c.name, description: c.what, issuedBy: { '@type': 'Organization', name: c.issuer } })),
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${COMPANY.url}/#business`,
    name: COMPANY.name,
    url: COMPANY.url,
    logo: COMPANY.logo,
    image: COMPANY.logo,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    description: COMPANY.description,
    foundingDate: COMPANY.foundingDate,
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
      opens: '10:00', // CONTACT.hours: Mon – Sat, 10:00 – 19:00 IST
      closes: '19:00',
    },
    areaServed: 'Worldwide',
    sameAs: COMPANY.sameAs,
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
