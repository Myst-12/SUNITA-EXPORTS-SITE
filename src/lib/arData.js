import { getProduct } from '@/data/products';
import { exportDestinations } from '@/data/countries';
import { AR_PRODUCTS, AR_MARKETS } from '@/data/ar';

// Arabic words joined to the English facts (image, specs, ports), so numbers stay identical in both languages.
export const arProducts = () =>
  Object.entries(AR_PRODUCTS).map(([slug, ar]) => ({ ...getProduct(slug), ar })).filter((p) => p.slug);

export const arMarkets = () =>
  Object.entries(AR_MARKETS).map(([slug, ar]) => ({ ...exportDestinations.find((d) => d.slug === slug), ar })).filter((m) => m.slug);

// Western digits → Arabic-Indic, for counts set in Arabic text.
export const arNum = (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
