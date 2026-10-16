import { categoryList } from './catalog/categories.js';
import { products as productList } from './catalog/products.js';
import { productImages } from './catalog/images.js';

/**
 * Catalogue API used by pages. Data lives in ./catalog/ (categories + products).
 * A product has one canonical URL (/products/<primary category>/<slug>/) and can be listed in
 * further categories through `also`.
 */

const catBySlug = Object.fromEntries(categoryList.map((c) => [c.slug, c]));
const subName = (cat, sub) => catBySlug[cat]?.subcategories.find((s) => s.slug === sub)?.name || '';

const clip = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s\S*$/, '') + '…');

export const shortName = (name) => name.split(' (')[0];
export const productUrl = (p) => `/products/${p.category}/${p.slug}/`;
export const specSheetUrl = (p) => `/spec-sheets/${p.slug}.pdf`;
export const quoteUrl = (p) => `/contact/?product=${encodeURIComponent(p.name)}`;

function normalize(raw) {
  // Approved catalogue photos (client-supplied or generated) take precedence over the original stock images.
  const image = productImages[raw.slug] || raw.image;
  const p = image === raw.image ? raw : { ...raw, image, gallery: [image] };
  const n = shortName(p.name);
  // Scientific name worth showing next to the product name (not "Spice blend", "Various"…).
  const latin = p.botanicalName && p.type !== 'fmcg' && !/blend|various/i.test(p.botanicalName) ? p.botanicalName : null;
  const lead = latin ? `${p.name} (${latin})` : p.name;
  return {
    forms: [],
    grades: [],
    specifications: {},
    gallery: p.image ? [p.image] : [],
    ...p,
    shortName: n,
    latin,
    categoryName: catBySlug[p.category].name,
    subcategoryName: subName(p.category, p.subcategory),
    image: p.image || null,
    metaTitle: p.type === 'fmcg' ? `${n} for Export — Indian FMCG Supplier` : `${n} Exporter from India — Bulk Supplier`,
    metaDescription: clip(`${lead} from India. ${p.description}`, 158),
  };
}

const all = productList.map(normalize);
const bySlug = Object.fromEntries(all.map((p) => [p.slug, p]));

// Related: same subcategory first, then the rest of the primary category.
all.forEach((p) => {
  const sameSub = all.filter((q) => q !== p && q.category === p.category && q.subcategory === p.subcategory);
  const sameCat = all.filter((q) => q !== p && q.category === p.category && q.subcategory !== p.subcategory);
  const i = sameSub.findIndex((q) => all.indexOf(q) > all.indexOf(p));
  const ordered = i > 0 ? [...sameSub.slice(i), ...sameSub.slice(0, i)] : sameSub;
  p.relatedProducts = [...ordered, ...sameCat].slice(0, 4).map((q) => q.slug);
});

const listedIn = (p, cat) => p.category === cat || (p.also || []).some((a) => a.category === cat);
const subIn = (p, cat) => (p.category === cat ? p.subcategory : p.also.find((a) => a.category === cat).subcategory);

export const categories = categoryList.map((c) => {
  const products = c.service ? [] : all.filter((p) => listedIn(p, c.slug));
  const subcategories = c.subcategories
    ? c.subcategories.map((s) => ({ ...s, products: products.filter((p) => subIn(p, c.slug) === s.slug) })).filter((s) => s.products.length)
    : [];
  return { ...c, href: c.href || `/products/${c.slug}/`, products, subcategories, productCount: products.length };
});

export const productCategories = categories.filter((c) => !c.service);

export function getAllCategories() {
  return categories.map(({ products, subcategories, ...cat }) => cat);
}

export function getCategoryBySlug(slug) {
  return categories.find((cat) => cat.slug === slug);
}

/** Only the canonical category/slug pair resolves (no duplicate URLs). */
export function getProductBySlug(categorySlug, productSlug) {
  const p = bySlug[productSlug];
  return p && p.category === categorySlug ? p : null;
}

export function getProduct(slug) {
  return bySlug[slug] || null;
}

export function getAllProducts() {
  return all;
}

export function getRelatedProducts(productSlugs) {
  return productSlugs.map((s) => bySlug[s]).filter(Boolean);
}
