import { CONTACT } from '@/config/site';

/** Shared by the product page and the PDF spec sheet so both always say the same thing. */

export const ON_REQUEST = 'On request';
export const SPEC_ON_REQUEST =
  'Full specification on request. We send the current specification and a certificate of analysis for the lot you are buying.';
export const FEED_NOTE = 'For animal feed use only. Not for human consumption.';
export const REGULATED_NOTE =
  'Export of this item is regulated (Indian export policy / CITES). It is supplied only from legal, documented sources with the required permits, and only where export is allowed.';
export const FMCG_NOTE =
  'Product family. Exact brands, pack sizes, units per carton and destination eligibility are confirmed with each order; we only offer brands we are authorised to supply.';
export const SPEC_DISCLAIMER = 'Values are typical. Final specifications are confirmed per contract and lot, with a certificate of analysis.';

export function containerLoadText(p) {
  const c = p.containerLoad;
  if (!c) return { twenty: ON_REQUEST, forty: ON_REQUEST };
  return { twenty: c.twenty || ON_REQUEST, forty: c.forty || ON_REQUEST };
}

/** Label/value rows for the "Product details" table. */
export function detailRows(p) {
  const load = containerLoadText(p);
  return [
    ['Product', p.name],
    p.botanicalName && ['Botanical / technical name', p.botanicalName],
    ['Category', p.subcategoryName && p.subcategoryName !== p.categoryName ? `${p.categoryName} › ${p.subcategoryName}` : p.categoryName],
    p.forms.length > 0 && [p.type === 'fmcg' ? 'Pack types' : 'Forms available', p.forms.join(', ')],
    p.grades.length > 0 && ['Varieties / grades', p.grades.join(', ')],
    ['Origin', p.origin ? (/^india|blended|roasted/i.test(p.origin) ? p.origin : `India — ${p.origin}`) : 'Confirmed per lot'],
    p.hsCode && ['HS code (indicative)', p.hsCode],
    ['Packing', p.packaging.join('; ')],
    p.type !== 'fmcg' && ['Container load, 20 ft', load.twenty],
    p.type !== 'fmcg' && ['Container load, 40 ft', load.forty],
    ['Shelf life', p.shelfLife || ON_REQUEST],
    ['Minimum order', p.type === 'fmcg' ? 'Mixed container; cartons per SKU on request' : '1 MT, or part of a mixed container'],
    ['Port & terms', `${CONTACT.port} · FOB, CFR, CIF`],
  ].filter(Boolean);
}
