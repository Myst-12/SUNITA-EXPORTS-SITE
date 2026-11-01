import Link from 'next/link';
import Icon from '@/components/Icon';
import OrderBar from '@/components/OrderBar';
import { FMCG_CATEGORIES, FMCG_TOTAL, findFmcgItems } from '@/lib/shop/fmcg';
import { whatsappLink } from '@/config/site';
import CatalogueSearch from './CatalogueSearch';
import AddItem from './AddItem';
import s from './catalogue.module.css';

export const metadata = {
  title: 'Indian FMCG product list — order by the carton',
  description: `${FMCG_TOTAL.toLocaleString('en-IN')} Indian grocery, snack, spice, personal care, pooja and household products with carton packing and shelf life. Search by brand, add cartons and send your order.`,
  alternates: { canonical: '/fmcg/catalogue/' },
};

const fmt = (n) => n.toLocaleString('en-IN');

export default async function FmcgCatalogue({ searchParams }) {
  const sp = await searchParams;
  const q = String(sp.q || '').slice(0, 80);
  const cat = FMCG_CATEGORIES.find((c) => c.slug === sp.c);
  const res = findFmcgItems({ q, cat: cat?.slug, page: Number(sp.page) || 1 });
  const href = ({ c = cat?.slug, page } = {}) => {
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (c) p.set('c', c);
    if (page > 1) p.set('page', page);
    return `/fmcg/catalogue/${p.size ? `?${p}` : ''}`;
  };
  const chips = FMCG_CATEGORIES.map((c) => ({ ...c, n: q ? res.counts[c.slug] || 0 : c.count })).filter((c) => c.n || c.slug === cat?.slug);
  const from = (res.page - 1) * 40 + 1;

  return (
    <section className={s.page}>
      <div className="container">
        <div className={s.head}>
          <div>
            <h1>FMCG product list</h1>
            <p className={s.sub}>{fmt(FMCG_TOTAL)} Indian groceries, snacks, spices, personal care, pooja and household products, packed by the carton. Add the cartons you need and send the order; our team confirms prices, availability and shipping dates.</p>
          </div>
          <Link href="/account/" className="link-arrow">Your orders <Icon name="arrow-right" /></Link>
        </div>

        <CatalogueSearch q={q} cat={cat?.slug || ''} />

        <nav className={s.chips} aria-label="Categories">
          <Link href={href({ c: '' })} className={s.chip} aria-current={!cat ? 'true' : undefined}>All <span>{fmt(q ? res.all : FMCG_TOTAL)}</span></Link>
          {chips.map((c) => (
            <Link key={c.slug} href={href({ c: c.slug })} className={s.chip} aria-current={c.slug === cat?.slug ? 'true' : undefined}>{c.name} <span>{fmt(c.n)}</span></Link>
          ))}
        </nav>

        <div className={s.countRow}>
          <p className={s.count} aria-live="polite">
            {res.total ? <>{res.pages > 1 ? `${fmt(from)}–${fmt(from + res.items.length - 1)} of ` : ''}<b>{fmt(res.total)}</b> product{res.total === 1 ? '' : 's'}</> : 'No products'}
            {cat && <> in <b>{cat.name}</b></>}{q && <> for “{q}”</>}
          </p>
          <a href={`/fmcg/catalogue/excel/${cat?.slug || 'all'}/`} className={s.excel} download>
            <Icon name="download" size={18} /> Excel: {cat ? cat.name : 'all products'} ({fmt(cat ? cat.count : FMCG_TOTAL)})
          </a>
        </div>

        {res.total === 0 ? (
          <div className={s.none}>
            <p>Nothing matches{q ? ` “${q}”` : ''}{cat ? ` in ${cat.name}` : ''}. Try a shorter word or another spelling, or tell us what you need.</p>
            <div className={s.noneActions}>
              {cat && <Link href={href({ c: '' })} className="btn btn-outline">Search all categories</Link>}
              <a href={whatsappLink(`Hello, I am looking for: ${q || ''}`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" /> Ask on WhatsApp</a>
            </div>
          </div>
        ) : (
          <ul className={s.list}>
            {res.items.map((i) => {
              const name = i.brand ? `${i.brand} ${i.product}` : i.product;
              return (
                <li key={i.key} className={s.row}>
                  <div className={s.info}>
                    <p className={s.name}>{i.brand && <b>{i.brand}</b>} {i.product}</p>
                    <p className={s.meta}>
                      <span>{i.pack}</span>
                      {i.shelf && <span>{i.shelf} months shelf life</span>}
                      {i.wt && <span>{i.wt} kg gross</span>}
                      {!cat && <span className={s.cat}>{i.catName}</span>}
                    </p>
                  </div>
                  <AddItem item={{ key: i.key, name, pack: i.pack, unit: i.unit, wt: i.wt, vol: i.vol }} />
                </li>
              );
            })}
          </ul>
        )}

        {res.pages > 1 && (
          <nav className={s.pager} aria-label="Pages">
            {res.page > 1 ? <Link href={href({ page: res.page - 1 })} className="btn btn-outline" scroll>Previous</Link> : <span />}
            <span>Page {res.page} of {fmt(res.pages)}</span>
            {res.page < res.pages ? <Link href={href({ page: res.page + 1 })} className="btn btn-outline" scroll>Next</Link> : <span />}
          </nav>
        )}

        <p className={s.note}>Packing, shelf life and weights are from our supplier list and may change; your proforma invoice confirms them. Brand names belong to their owners.</p>
      </div>
      <OrderBar />
    </section>
  );
}
