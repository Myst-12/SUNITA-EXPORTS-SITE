export const dynamic = 'force-static';

import { productCategories, getAllProducts, productUrl } from '@/data/products';
import { blogPosts } from '@/data/blog';
import { exportDestinations } from '@/data/countries';
import { SITE_URL } from '@/config/site';

// lastmod is only given where we know when the page really changed (blog posts). A build date on every URL
// teaches Google to ignore lastmod, so other pages leave it out.
export default function sitemap() {
  const baseUrl = SITE_URL;

  // Core pages
  const routes = [
    '',
    '/about',
    '/products',
    '/certifications',
    '/infrastructure',
    '/exports',
    '/contact',
    '/faq',
    '/blog',
    '/fmcg',
    '/fmcg/catalogue',
    '/indian-grocery-exporter',
    '/indian-spices-exporter',
    '/mixed-container',
    '/private-label',
    '/knowledge',
    '/company-facts',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Categories dynamic pages
  const categoryRoutes = productCategories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}/`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Product pages (canonical URL only, even when a product is listed in two categories)
  const productRoutes = getAllProducts().map((prod) => ({
    url: `${baseUrl}${productUrl(prod)}`,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  // Country destinations dynamic pages
  const countryRoutes = exportDestinations.map((country) => ({
    url: `${baseUrl}/exports/${country.slug}/`,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Blog posts dynamic pages
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: post.updated || post.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...categoryRoutes, ...productRoutes, ...countryRoutes, ...blogRoutes];
}
