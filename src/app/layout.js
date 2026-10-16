import { Fraunces, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Script from 'next/script';
import { SITE_URL, GA_ID } from '@/config/site';
import { organizationSchema as buildOrganizationSchema } from '@/lib/schemas';
import { categories } from '@/data/products';

const navCategories = categories.map((c) => ({ slug: c.slug, name: c.name, image: c.image, count: c.productCount, href: c.href, service: !!c.service }));

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport = {
  themeColor: '#086639',
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Indian Spices Exporter & Indian FMCG Supplier | Sunita Agri Exports, Mumbai',
    template: '%s | Sunita Agri Exports',
  },
  description: 'Sunita Agri Exports — Indian spices, rice, pulses and FMCG groceries exported from Mumbai since 2010 to 40+ countries. Mixed containers, private label, FOB/CIF. Request a quote.',
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
    url: SITE_URL,
    siteName: 'Sunita Agri Exports',
    title: 'Indian Spices Exporter & Indian FMCG Supplier | Sunita Agri Exports',
    description: 'Indian spices, rice, pulses and FMCG groceries exported from Mumbai since 2010 to 40+ countries.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunita Agri Exports — Premium Indian Spices & Agri Commodities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indian Spices Exporter & Indian FMCG Supplier | Sunita Agri Exports',
    description: 'Indian spices, rice, pulses and FMCG groceries exported from Mumbai since 2010 to 40+ countries.',
    images: ['/images/og-image.jpg'],
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
    canonical: '/',
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = buildOrganizationSchema();

  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header categories={navCategories} />
        <main id="main-content">
          {children}
        </main>
        <Footer categories={navCategories} />
        <WhatsAppButton />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
