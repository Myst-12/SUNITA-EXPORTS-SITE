import { catalogueRedirects } from './src/data/catalog/redirects.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server mode (not static export) so the inquiry API route, image optimisation
  // and redirects work. Deploy target: Vercel (or any Node host).
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90], // 90 for the full-screen homepage hero
  },
  trailingSlash: true,
  async redirects() {
    return [
      { source: '/why-choose-us', destination: '/about/', permanent: true },
      { source: '/b2b-presence', destination: '/about/', permanent: true },
      { source: '/shipments', destination: '/certifications/#logistics', permanent: true },
      { source: '/quality', destination: '/certifications/', permanent: true },
      { source: '/exhibitions', destination: '/about/#exhibitions', permanent: true },
      { source: '/packaging', destination: '/private-label/#packaging', permanent: true },
      // Old site (sunitaexports.com) PHP URLs
      { source: '/:page(index|Products|products|contact|about)\\.php', destination: '/', permanent: true },
      ...catalogueRedirects.map(([source, destination]) => ({ source, destination, statusCode: 301 })),
    ];
  },
};

export default nextConfig;
