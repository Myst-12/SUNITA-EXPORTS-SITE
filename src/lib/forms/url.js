import 'server-only';
import { headers } from 'next/headers';

/** Public link to a form, on whatever domain the admin is using (localhost, Vercel or the real domain). */
export async function formUrl(slug) {
  const h = await headers();
  const host = h.get('x-forwarded-host') || h.get('host');
  const proto = h.get('x-forwarded-proto') || (host?.startsWith('localhost') ? 'http' : 'https');
  return `${proto}://${host}/f/${slug}/`;
}
