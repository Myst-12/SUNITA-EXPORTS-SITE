export const dynamic = 'force-static';

import { categories } from '@/data/products';
import { blogPosts } from '@/data/blog';

export default function sitemap() {
  const baseUrl = 'https://www.sunitaexports.com';

  // Core pages
  const routes = [
    '',
    '/about',
    '/why-choose-us',
    '/products',
    '/certifications',
    '/shipments',
    '/b2b-presence',
    '/contact',
    '/faq',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Categories dynamic pages
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}/`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Products dynamic pages
  const productRoutes = [];
  categories.forEach((cat) => {
    cat.products.forEach((prod) => {
      productRoutes.push({
        url: `${baseUrl}/products/${cat.slug}/${prod.slug}/`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly',
        priority: 0.65,
      });
    });
  });

  // Blog posts dynamic pages
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
