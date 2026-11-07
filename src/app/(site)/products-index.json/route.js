import { productIndex } from '@/lib/productIndex';

export const dynamic = 'force-static';

// Full product list for the /products/ search, fetched only when a visitor searches or filters.
export function GET() {
  return Response.json(productIndex(), { headers: { 'X-Robots-Tag': 'noindex' } });
}
