import { findFmcgItems } from '@/lib/shop/fmcg';

// How many FMCG list products match a search, for the "Ask a question" helper.
export function GET(req) {
  const q = (new URL(req.url).searchParams.get('q') || '').slice(0, 80);
  const total = q.trim() ? findFmcgItems({ q, per: 1 }).total : 0;
  return Response.json({ total }, { headers: { 'Cache-Control': 'public, max-age=600' } });
}
