import { getProduct } from '@/data/products';
import { exportDestinations } from '@/data/countries';
import { TEXT } from '@/data/i18n';

// Translated words joined to the English facts (image, specs, ports), so numbers match in every language.
export const langProducts = (lang) =>
  Object.entries(TEXT[lang].products).map(([slug, t]) => ({ ...getProduct(slug), t })).filter((p) => p.slug);

export const langMarkets = (lang) =>
  Object.entries(TEXT[lang].markets || {}).map(([slug, t]) => ({ ...exportDestinations.find((d) => d.slug === slug), t })).filter((m) => m.slug);
