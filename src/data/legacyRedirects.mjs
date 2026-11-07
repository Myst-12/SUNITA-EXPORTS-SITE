// URLs of the old PHP/HTML site (sunitaexports.com before 2026), from the Wayback Machine and Search Console.
// Real pages go to their new equivalent; anything else old (.php, .asp, an old hack's web-shell uploads under
// /admin/upload/ and its /mtm/ spam pages) answers 410 Gone so Google drops it (see `goneRewrites`).
const MAP = {
  '/': ['index'],
  '/about/': ['about', 'about-us', 'aboutus', 'why-us', 'why-choose-us', 'whyus', 'company', 'profile', 'mission', 'vision', 'team', 'gallery'],
  '/contact/': ['contact', 'contact-us', 'contactus', 'Contactus', 'enquiry', 'inquiry'],
  '/products/': ['products', 'Products', 'product', 'sub_category', 'category', 'SelectProducts'],
  '/infrastructure/': ['infrastructure'],
  '/certifications/': ['certificate', 'certificates', 'certification', 'quality'],
  '/products/indian-spices/': ['spices'],
  '/products/rice/': ['rice'],
};

export const legacyRedirects = Object.entries(MAP).flatMap(([destination, pages]) =>
  pages.map((page) => ({ source: `/${page}.:ext(php|php7|html|htm|asp|aspx)`, destination, permanent: true })));

export const goneRewrites = [
  { source: '/:path*/:file([^/]+\\.(?:php\\d?|PHP\\d?|asp|aspx))', destination: '/gone/' },
  { source: '/:file([^/]+\\.(?:php\\d?|PHP\\d?|asp|aspx))', destination: '/gone/' },
  { source: '/mtm/:path*', destination: '/gone/' },
  { source: '/admin/upload/:path*', destination: '/gone/' },
];
