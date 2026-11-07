import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AR, AR_HOME } from '@/data/ar';
import { arMarkets, arProducts } from '@/lib/arData';
import { arAlternates } from '@/lib/i18n';
import s from '../../ar.module.css';

export const dynamicParams = false;
export const generateStaticParams = () => arMarkets().map((m) => ({ country: m.slug }));

const find = async (params) => { const { country } = await params; return arMarkets().find((m) => m.slug === country); };

export async function generateMetadata({ params }) {
  const m = await find(params);
  if (!m) return {};
  return { title: m.ar.title, description: `${m.ar.lead} عرض سعر خلال ٢٤ ساعة.`, alternates: arAlternates(`/exports/${m.slug}/`) };
}

export default async function ArabicMarket({ params }) {
  const m = await find(params);
  if (!m) notFound();
  return (
    <section className={s.page}>
      <div className="container" style={{ maxWidth: 900 }}>
        <nav className={s.crumbs}><Link href="/ar/">الرئيسية</Link> / <Link href="/ar/exports/">أسواق الخليج</Link> / <span>{m.ar.name}</span></nav>
        <h1 className={s.h2}>{m.ar.title}</h1>
        <p className={s.text}>{m.ar.lead}</p>
        <ul className={s.list}>{m.ar.points.map((t) => <li key={t}>{t}</li>)}</ul>
        <h2 className={s.h2} style={{ marginTop: 32 }}>موانئ الوصول</h2>
        <p className={s.text} lang="en" dir="ltr" style={{ textAlign: 'right' }}>{m.shippingPorts.join(' · ')}</p>
        <h2 className={s.h2} style={{ marginTop: 32 }}>{AR_HOME.productsTitle}</h2>
        <div className={s.cards}>
          {arProducts().slice(0, 6).map((p) => (
            <Link key={p.slug} href={`/ar/products/${p.category}/${p.slug}/`} className={s.prod}>
              <img src={p.image} alt={p.ar.name} loading="lazy" />
              <span><b>{p.ar.name}</b></span>
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 28 }}><Link href="/ar/contact/" className="btn btn-primary btn-lg">{AR.quote}</Link></p>
      </div>
    </section>
  );
}
