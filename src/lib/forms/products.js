import 'server-only';
import { getAllProducts, categories } from '@/data/products';
import { getLocalNames } from '@/data/catalog/localNames';
import { FORM_LANGS } from './i18n';

const LANG_CODES = new Set(FORM_LANGS.map(([c]) => c));

/**
 * Product suggestions for the event form's search box: { n: English name, c: category, l: {lang: local name} }.
 * The English name is what gets stored, so the Excel file stays in English.
 */
export function productOptions() {
  const seen = new Set();
  const list = [];
  for (const p of getAllProducts()) {
    if (seen.has(p.name)) continue;
    seen.add(p.name);
    const l = {};
    for (const [code, , local] of getLocalNames(p.slug)) if (LANG_CODES.has(code)) l[code] = local.split(' (')[0];
    list.push({ n: p.name, c: p.categoryName || '', l });
  }
  return list;
}

/** Category names, offered as one-tap chips before the visitor types anything. */
export const quickPicks = () => categories.filter((c) => !c.service).map((c) => c.name);
