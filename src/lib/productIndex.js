import { productCategories, getAllProducts } from '@/data/products';

// Catalogue order: by category, then by group within the category.
const catIndex = Object.fromEntries(productCategories.map((c, i) => [c.slug, i]));
const subIndex = Object.fromEntries(productCategories.flatMap((c) => c.subcategories.map((s, i) => [`${c.slug}/${s.slug}`, i])));
const rank = (p) => [catIndex[p.category] ?? 99, subIndex[`${p.category}/${p.subcategory}`] ?? 99];

// Products each category shows on /products/ before a search or filter.
export const PREVIEW = 8;

// The light product list behind the /products/ search: what a card shows, plus one string of search-only words.
export function productIndex() {
  return getAllProducts()
    .map((p, i) => ({ p, i, r: rank(p) }))
    .sort((a, b) => a.r[0] - b.r[0] || a.r[1] - b.r[1] || a.i - b.i)
    .map(({ p }) => ({
      slug: p.slug,
      name: p.name,
      shortName: p.shortName,
      latin: p.latin,
      type: p.type,
      category: p.category,
      categoryName: p.categoryName,
      image: p.image,
      hsCode: p.hsCode || null,
      forms: p.forms.slice(0, 1), // the card shows only the first form
      q: [p.subcategoryName, ...p.forms.slice(1), ...p.grades].filter(Boolean).join(' ').toLowerCase(),
    }));
}
