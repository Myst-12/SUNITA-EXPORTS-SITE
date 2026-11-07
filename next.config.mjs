import { catalogueRedirects } from './src/data/catalog/redirects.mjs';
import { legacyRedirects, goneRewrites } from './src/data/legacyRedirects.mjs';

/** @type {import('next').NextConfig} */
// Security headers on every response. The CSP is limited to rules that cannot break the site's scripts, maps or
// analytics: no framing by other sites, no plugins, no <base> hijacking, forms post only to us or Web3Forms.
const SECURITY_HEADERS = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com; upgrade-insecure-requests" },
];
// Private areas: never indexed, even if someone links to them.
const NOINDEX = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];

const nextConfig = {
  experimental: { globalNotFound: true }, // one 404 page for both the English and Arabic root layouts
  // Server mode (not static export) so the inquiry API route and redirects work. Deploy target: Vercel (or any Node host).
  // Images: sizes are made ahead of time by scripts/size-images.mjs and picked by a custom loader,
  // so Vercel does no image resizing (its free plan stops at 5,000 a month).
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.js',
    qualities: [75, 90],
    // Only widths that exist as files: the pre-made sizes plus one for the ~1200px originals. Next's defaults
    // (up to 3840) listed the same original five times in every srcset.
    deviceSizes: [640, 828, 1200],
    imageSizes: [256, 384],
  },
  trailingSlash: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/:path*', headers: SECURITY_HEADERS },
      ...['/admin/:path*', '/account/:path*', '/order/:path*', '/f/:path*'].map((source) => ({ source, headers: NOINDEX })),
    ];
  },
  // Old-site URLs with no equivalent answer 410 Gone (Next applies the redirects below first).
  async rewrites() {
    return { beforeFiles: goneRewrites };
  },
  async redirects() {
    return [
      { source: '/why-choose-us', destination: '/about/', permanent: true },
      { source: '/b2b-presence', destination: '/about/', permanent: true },
      { source: '/shipments', destination: '/certifications/#logistics', permanent: true },
      { source: '/quality', destination: '/certifications/', permanent: true },
      { source: '/exhibitions', destination: '/about/#exhibitions', permanent: true },
      { source: '/packaging', destination: '/private-label/#packaging', permanent: true },
      ...legacyRedirects, // old PHP/HTML site pages that have a new equivalent
      ...catalogueRedirects.map(([source, destination]) => ({ source, destination, statusCode: 301 })),
    ];
  },
};

export default nextConfig;
