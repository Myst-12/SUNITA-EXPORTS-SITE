import Link from 'next/link';
import { TEXT } from '@/data/i18n';
import { exportDestinations } from '@/data/countries';
import { langMarkets } from '@/lib/intlData';
import { langAlternates } from '@/lib/i18n';
import s from '../intl.module.css';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { meta } = TEXT[lang].ui;
  return { title: meta.exportsTitle, description: meta.exportsDesc, alternates: langAlternates(lang, '/exports/') };
}

// Languages with their own market pages list those; the others point to the English market guides.
export default async function LangMarkets({ params }) {
  const { lang } = await params;
  const { ui, home } = TEXT[lang];
  const markets = langMarkets(lang);
  return (
    <section className={s.page}>
      <div className="container">
        <nav className={s.crumbs}><Link href={`/${lang}/`}>{ui.nav[0][1]}</Link> / <span>{ui.nav[2][1]}</span></nav>
        <h1 className={s.h2}>{home.marketsTitle}</h1>
        <p className={s.text}>{ui.exportsLead}</p>
        <div className={s.cards}>
          {markets.length
            ? markets.map((m) => <Link key={m.slug} href={`/${lang}/exports/${m.slug}/`} className={s.card}><h3>{m.t.name}</h3><p>{m.t.lead}</p></Link>)
            : exportDestinations.map((d) => (
              <a key={d.slug} href={`/exports/${d.slug}/`} hrefLang="en" className={s.card}>
                <h3 lang="en">{d.name}</h3>
                <p lang="en" dir="ltr">{d.shippingPorts.join(' · ')}</p>
              </a>
            ))}
        </div>
        <p style={{ marginTop: 28 }}><Link href={`/${lang}/contact/`} className="btn btn-primary btn-lg">{ui.quote}</Link></p>
      </div>
    </section>
  );
}
