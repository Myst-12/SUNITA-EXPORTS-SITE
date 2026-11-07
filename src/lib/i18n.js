// Translated sections of the site. English lives at the root (/products/…); each other language
// sits under its own prefix with the same slugs (/ar/products/…), so every page maps one-to-one.
//
// A language stays out of search (noindex, no hreflang, not in the sitemap) until a native speaker
// has approved its text: set `live: true` only then.
export const LOCALES = {
  ar: { live: true, name: 'العربية', hreflang: 'ar', ogLocale: 'ar_AE' },
};

// English paths that have an Arabic version (filled from the Arabic data so the two never drift).
import { AR_PATHS } from '@/data/ar';

export const hasAr = (path) => AR_PATHS.has(path);
export const arPath = (path) => `/ar${path}`;

// `alternates` for an English page: its canonical, plus hreflang to the Arabic page once Arabic is live.
export function enAlternates(path) {
  if (!LOCALES.ar.live || !hasAr(path)) return { canonical: path };
  return { canonical: path, languages: { en: path, ar: arPath(path), 'x-default': path } };
}

// `alternates` for an Arabic page: self-canonical, plus hreflang back to English once live.
export function arAlternates(path) {
  const ar = arPath(path);
  if (!LOCALES.ar.live) return { canonical: ar };
  return { canonical: ar, languages: { en: path, ar, 'x-default': path } };
}

export const arRobots = () => (LOCALES.ar.live ? { index: true, follow: true } : { index: false, follow: true });
