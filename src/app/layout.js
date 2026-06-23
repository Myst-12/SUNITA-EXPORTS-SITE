import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  metadataBase: new URL('https://www.sunitaexports.com'),
  title: {
    default: 'Indian Spices Exporter & Agri Commodities Supplier | Sunita Agri Exports, Mumbai',
    template: '%s | Sunita Agri Exports',
  },
  description: 'Sunita Agri Exports — 30+ years of exporting premium Indian spices, rice, pulses and agri commodities to 40+ countries. BRC, FDA, FSSAI, APEDA certified. Request a sample.',
  keywords: ['Indian spices exporter', 'spice supplier India', 'bulk spices', 'basmati rice exporter', 'agri commodities India', 'Mumbai exporter'],
  authors: [{ name: 'Sunita Agri Exports Pvt. Ltd.' }],
  creator: 'Sunita Agri Exports Pvt. Ltd.',
  publisher: 'Sunita Agri Exports Pvt. Ltd.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.sunitaexports.com',
    siteName: 'Sunita Agri Exports',
    title: 'Indian Spices Exporter & Agri Commodities Supplier | Sunita Agri Exports',
    description: 'Sunita Agri Exports — 30+ years of exporting premium Indian spices, rice, pulses and agri commodities to 40+ countries.',
    images: [
      {
        url: '/images/hero/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Sunita Agri Exports — Premium Indian Spices & Agri Commodities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indian Spices Exporter & Agri Commodities Supplier | Sunita Agri Exports',
    description: 'Sunita Agri Exports — 30+ years of exporting premium Indian spices, rice, pulses and agri commodities to 40+ countries.',
    images: ['/images/hero/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.sunitaexports.com',
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sunita Agri Exports Pvt. Ltd.',
    url: 'https://www.sunitaexports.com',
    logo: 'https://www.sunitaexports.com/images/logo.webp',
    foundingDate: '1994',
    description: 'Leading Indian exporter of premium spices, rice, pulses, oilseeds, and agri commodities to 40+ countries worldwide. BRC, FDA, FSSAI, ISO, and APEDA certified.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1014, Ghanshyam Enclave, Laljipada, Link Road, Kandivali (West)',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400067',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-8169282942',
        contactType: 'sales',
        email: 'sales@sunitaexports.com',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Hindi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-9004041889',
        contactType: 'customer service',
        email: 'info@sunitaexports.com',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    sameAs: [],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 20,
      maxValue: 25,
    },
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
