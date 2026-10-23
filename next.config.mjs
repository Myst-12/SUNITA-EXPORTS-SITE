import { catalogueRedirects } from './src/data/catalog/redirects.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server mode (not static export) so the inquiry API route and redirects work. Deploy target: Vercel (or any Node host).
  // Images: sizes are made ahead of time by scripts/size-images.mjs and picked by a custom loader,
  // so Vercel does no image resizing (its free plan stops at 5,000 a month).
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.js',
    qualities: [75, 90],
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
      { source: '/:page(Products|products)\\.php', destination: '/products/', permanent: true },
      { source: '/:page(contact)\\.php', destination: '/contact/', permanent: true },
      { source: '/:page(about)\\.php', destination: '/about/', permanent: true },
      { source: '/:page(index)\\.php', destination: '/', permanent: true },
      ...catalogueRedirects.map(([source, destination]) => ({ source, destination, statusCode: 301 })),
    ];
  },
};

export default nextConfig;
