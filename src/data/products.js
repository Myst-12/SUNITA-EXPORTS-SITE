import { categoryList } from './catalog/categories.js';
import { products as baseProducts } from './catalog/products.js';
import { addedProducts, renamedProducts } from './catalog/products-added.js';
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

const productList = [...baseProducts, ...addedProducts].map((p) => (renamedProducts[p.slug] ? { ...p, name: renamedProducts[p.slug] } : p));

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
    origin: 'India', // owner: every product is listed with origin India
    shortName: n,
    latin,
    categoryName: catBySlug[p.category].name,
    subcategoryName: subName(p.category, p.subcategory),
    image: p.image || null,
    // Short enough that Google shows the whole title with the " | Sunita Agri Exports" suffix (about 60 characters).
    metaTitle: p.type === 'fmcg' ? `${n} for Export from India` : `${n} Exporter from India`,
    metaDescription: clip(`${lead} from India. ${p.description}`, 158),
  };
}

const all = productList.map(normalize);
const bySlug = Object.fromEntries(all.map((p) => [p.slug, p]));

// Related: the same crop in other forms first (turmeric fingers → turmeric powder), then the same subcategory,
// then the rest of the primary category.
const GENERIC = new Set(['seeds', 'seed', 'powder', 'whole', 'dried', 'dehydrated', 'indian', 'flakes', 'extract', 'leaves', 'leaf', 'root', 'roots', 'organic', 'natural', 'split', 'with', 'without', 'skin', 'packaged', 'export', 'grade', 'fine', 'coarse', 'crushed', 'ground', 'bulk', 'other', 'mixed', 'premium', 'flowers', 'flower', 'bark', 'gum', 'polished', 'unpolished', 'black', 'white', 'green', 'yellow', 'brown', 'golden', 'pink', 'small', 'large', 'sweet']);
const words = (p) => new Set(p.shortName.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3 && !GENERIC.has(w)));
const wordsBySlug = Object.fromEntries(all.map((p) => [p.slug, words(p)]));
all.forEach((p) => {
  const mine = wordsBySlug[p.slug];
  const sameCrop = all.filter((q) => q !== p && [...wordsBySlug[q.slug]].some((w) => mine.has(w)));
  const sameSub = all.filter((q) => q !== p && q.category === p.category && q.subcategory === p.subcategory);
  const sameCat = all.filter((q) => q !== p && q.category === p.category && q.subcategory !== p.subcategory);
  const i = sameSub.findIndex((q) => all.indexOf(q) > all.indexOf(p));
  const ordered = i > 0 ? [...sameSub.slice(i), ...sameSub.slice(0, i)] : sameSub;
  p.relatedProducts = [...new Set([...sameCrop.slice(0, 2), ...ordered, ...sameCat])].slice(0, 4).map((q) => q.slug);
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
