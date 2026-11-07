// Translated sections of the site. English lives at the root (/products/…); each other language
// sits under its own prefix with the same slugs (/ar/products/…), so every page maps one-to-one.
import { TEXT } from '@/data/i18n';

export const LOCALES = {
  ar: { dir: 'rtl', ogLocale: 'ar_AE' },
  fr: { dir: 'ltr', ogLocale: 'fr_FR' },
  es: { dir: 'ltr', ogLocale: 'es_ES' },
  de: { dir: 'ltr', ogLocale: 'de_DE' },
  ru: { dir: 'ltr', ogLocale: 'ru_RU' },
};
export const LANG_CODES = Object.keys(LOCALES);

// English paths that have a version in each language.
const PATHS = Object.fromEntries(LANG_CODES.map((l) => [l, new Set([
  '/', '/products/', '/exports/', '/contact/',
  ...Object.keys(TEXT[l].markets || {}).map((s) => `/exports/${s}/`),
  ...Object.entries(TEXT[l].products).map(([s, p]) => `/products/${p.category}/${s}/`),
])]));

export const hasLang = (lang, path) => PATHS[lang].has(path);
export const langPath = (lang, path) => `/${lang}${path}`;

// { englishPath: [codes] } for every translated page, small enough to send to the language switcher.
export function langPathIndex() {
  const index = {};
  for (const l of LANG_CODES) for (const p of PATHS[l]) (index[p] ||= []).push(l);
  return index;
}

// hreflang map for an English path: English, every language that has the page, and x-default → English.
export function languagesFor(path) {
  const languages = { en: path };
  for (const l of LANG_CODES) if (hasLang(l, path)) languages[l] = langPath(l, path);
  languages['x-default'] = path;
  return languages;
}

// `alternates` for an English page.
export function enAlternates(path) {
  const languages = languagesFor(path);
  return Object.keys(languages).length > 2 ? { canonical: path, languages } : { canonical: path };
}

// `alternates` for a translated page: self-canonical plus the same hreflang set.
export const langAlternates = (lang, path) => ({ canonical: langPath(lang, path), languages: languagesFor(path) });
