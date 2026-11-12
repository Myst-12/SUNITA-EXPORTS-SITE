import Link from '@/components/Link';
import { notFound } from 'next/navigation';
import { TEXT } from '@/data/i18n';
import { langMarkets, langProducts } from '@/lib/intlData';
import { langAlternates } from '@/lib/i18n';
import ProductCards from '../../ProductCards';
import s from '../../intl.module.css';

// Only languages with market text (Arabic, for the Gulf and Egypt) have these pages. Every language gets the
// same list here (Next builds nothing when one language returns an empty list); the others render a 404.
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(TEXT.ar.markets).map((country) => ({ country }));

const find = async (params) => {
  const { lang, country } = await params;
  return [lang, langMarkets(lang).find((m) => m.slug === country)];
};

export async function generateMetadata({ params }) {
  const [lang, m] = await find(params);
  if (!m) return {};
  return { title: m.t.title, description: m.t.lead, alternates: langAlternates(lang, `/exports/${m.slug}/`) };
}

export default async function LangMarket({ params }) {
  const [lang, m] = await find(params);
  if (!m) notFound();
  const { ui, home } = TEXT[lang];
  return (
    <section className={s.page}>
      <div className="container" style={{ maxWidth: 960 }}>
        <nav className={s.crumbs}><Link href={`/${lang}/`}>{ui.nav[0][1]}</Link> / <Link href={`/${lang}/exports/`}>{ui.nav[2][1]}</Link> / <span>{m.t.name}</span></nav>
        <h1 className={s.h2}>{m.t.title}</h1>
        <p className={s.text}>{m.t.lead}</p>
        <ul className={s.list}>{m.t.points.map((t) => <li key={t}>{t}</li>)}</ul>
        <h2 className={s.h2} style={{ marginTop: 32 }}>{ui.portsTitle}</h2>
        <p className={s.text} lang="en" dir="ltr">{m.shippingPorts.join(' · ')}</p>
        <h2 className={s.h2} style={{ marginTop: 32 }}>{home.productsTitle}</h2>
        <ProductCards lang={lang} products={langProducts(lang).slice(0, 8)} />
        <p style={{ marginTop: 28 }}><Link href={`/${lang}/contact/`} className="btn btn-primary btn-lg">{ui.quote}</Link></p>
      </div>
    </section>
  );
}
