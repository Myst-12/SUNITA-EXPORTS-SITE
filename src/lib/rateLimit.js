import { headers } from 'next/headers';

// Simple per-IP limiter for logins and form posts. Counts live in the memory of each server instance, so it slows
// down password guessing and form spam from one address; it is not a hard global limit across all instances.
const buckets = new Map();

export async function clientIp() {
  const h = await headers();
  return (h.get('x-forwarded-for') || '').split(',')[0].trim() || h.get('x-real-ip') || 'unknown';
}

/** True when `key` has made more than `max` attempts in the last `windowMs`. Each call counts as one attempt. */
export function tooMany(key, max, windowMs) {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) for (const [k, v] of buckets) if (now - v[v.length - 1] > windowMs) buckets.delete(k);
  return hits.length > max;
}

export async function limited(scope, max, windowMs) {
  return tooMany(`${scope}:${await clientIp()}`, max, windowMs);
}
