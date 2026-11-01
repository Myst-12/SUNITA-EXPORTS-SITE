import 'server-only';
import data from '@/data/fmcg/catalogue.json';

// The FMCG product list buyers order from (built from the client's Excel by scripts/import-fmcg-list.mjs).
// Each item: key (item code), category, brand, product, packing text, order unit, shelf life, gross kg per carton.
export const FMCG_CATEGORIES = data.categories.filter((c) => c.count);

const norm = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ').trim();
const ITEMS = data.items.map(([key, c, brand, product, pack, unit, shelf, wt]) => {
  const cat = data.categories[c];
  return { key, cat: cat.slug, catName: cat.name, brand, product, pack, unit, shelf, wt, vol: cat.vol, hay: ` ${norm(`${brand} ${product} ${cat.name} ${pack} ${key}`)}` };
});
const BY_KEY = new Map(ITEMS.map((i) => [i.key, i]));
const strip = ({ hay: _, ...i }) => i;

export const FMCG_TOTAL = ITEMS.length;
export const getFmcgItem = (key) => { const i = BY_KEY.get(String(key)); return i ? strip(i) : null; };

// Every word of the search must start a word in the brand, product, category or packing ("haldi bhuj", "basmati 5 kg").
function matching(q) {
  const words = norm(q).split(' ').filter(Boolean);
  if (!words.length) return ITEMS;
  const hits = ITEMS.filter((i) => words.every((w) => i.hay.includes(` ${w}`)));
  const brandFirst = (i) => (norm(i.brand).startsWith(words[0]) ? 0 : 1);
  return hits.sort((a, b) => brandFirst(a) - brandFirst(b)); // stable: keeps the list's own order within each group
}

/** One page of products for a search and/or category, plus how many match in each category. */
export function findFmcgItems({ q = '', cat = '', page = 1, per = 40 } = {}) {
  const all = matching(q);
  const counts = {};
  for (const i of all) counts[i.cat] = (counts[i.cat] || 0) + 1;
  const list = cat ? all.filter((i) => i.cat === cat) : all;
  const pages = Math.max(1, Math.ceil(list.length / per));
  const p = Math.min(Math.max(1, Math.floor(page) || 1), pages);
  return { items: list.slice((p - 1) * per, p * per).map(strip), total: list.length, all: all.length, counts, page: p, pages };
}
