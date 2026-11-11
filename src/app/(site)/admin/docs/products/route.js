import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/forms/auth';
import { getAllProducts, categories } from '@/data/products';
import { findFmcgItems } from '@/lib/shop/fmcg';

// Product search for the shipment editor: the bulk catalogue (with HS codes) and the FMCG list.
const norm = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ').trim();
let BULK;
function bulk() {
  if (BULK) return BULK;
  const sub = new Map();
  for (const c of categories) for (const x of c.subcategories || []) sub.set(x.slug, x.name);
  BULK = getAllProducts().filter((p) => p.type !== 'fmcg').map((p) => ({
    desc: p.name.replace(/\s*\(.*\)$/, '').toUpperCase(),
    hs: (p.hsCode || '').replace(/\./g, ''),
    group: (sub.get(p.subcategory) || '').toUpperCase(),
    origin: String(p.origin || '').split(',')[0].trim().toUpperCase(),
    source: 'Catalogue',
    hay: ` ${norm(`${p.name} ${p.slug} ${p.hsCode}`)}`,
  }));
  return BULK;
}

export async function GET(request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  const words = norm(new URL(request.url).searchParams.get('q')).split(' ').filter(Boolean);
  if (!words.length) return NextResponse.json({ items: [] });
  const hits = bulk().filter((p) => words.every((w) => p.hay.includes(` ${w}`))).slice(0, 15).map(({ hay: _, ...p }) => p);
  return NextResponse.json({ items: [...hits, ...findFmcgItems({ q: words.join(' '), per: 25 }).items.map((i) => ({
    desc: `${i.brand} ${i.product}`.toUpperCase(), hs: '', group: i.catName.toUpperCase(), origin: '', source: 'FMCG',
    packing: i.pack, kind: 'CTN', grossPer: i.wt || '', basis: 'PKG',
  }))] });
}
