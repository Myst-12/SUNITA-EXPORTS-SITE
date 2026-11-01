import { getCategoryBySlug } from '@/data/products';

// What buyers can order online: the FMCG range. Units are what a grocery importer counts in.
export const ORDER_CATEGORY = 'foodstuff-fmcg';
export const UNITS = ['Cartons', 'Packs', 'Kg'];
export const INCOTERMS = ['FOB Nhava Sheva', 'CFR (to my port)', 'CIF (to my port)', 'Not sure yet'];
export const CONTAINERS = ['20 ft container', '40 ft container', 'Part container (LCL)', 'Not sure yet'];
export const STATUSES = [
  { key: 'new', label: 'New' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'cancelled', label: 'Cancelled' },
];
export const statusLabel = (key) => STATUSES.find((s) => s.key === key)?.label || key;

// Buyer reviews wait for approval in admin before they appear on the site.
export const REVIEW_STATUSES = [
  { key: 'pending', label: 'To approve' },
  { key: 'published', label: 'Published' },
  { key: 'hidden', label: 'Hidden' },
];
export const reviewStatusLabel = (key) => REVIEW_STATUSES.find((s) => s.key === key)?.label || key;

/** The orderable products, trimmed to what the order cards need. */
export function orderableProducts() {
  return (getCategoryBySlug(ORDER_CATEGORY)?.products || []).map((p) => ({
    slug: p.slug,
    name: p.name,
    image: p.image,
    description: p.description,
    packaging: p.packaging || [],
  }));
}
