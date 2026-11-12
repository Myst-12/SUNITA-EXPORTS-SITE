import Link from '@/components/Link';
import { TEXT } from '@/data/i18n';
import { certificates } from '@/data/certificates';
import { exportDestinations } from '@/data/countries';
import { langProducts, langMarkets } from '@/lib/intlData';
import { langAlternates } from '@/lib/i18n';
import { whatsappLink } from '@/config/site';
import ProductCards from './ProductCards';
import s from './intl.module.css';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { meta } = TEXT[lang].ui;
  return { title: { absolute: meta.homeTitle }, description: meta.homeDesc, alternates: langAlternates(lang, '/') };
}

export default async function LangHome({ params }) {
  const { lang } = await params;
  const { ui, home } = TEXT[lang];
  const markets = langMarkets(lang);
  return (
    <>
      <section className={s.hero}>
        <img className={s.heroImg} src="/images/hero/spices-wood.webp" alt="" fetchPriority="high" />
        <div className="container">
          <h1>{home.title}</h1>
          <p>{home.lead}</p>
          <div className={s.actions}>
            <Link href={`/${lang}/contact/`} className="btn btn-light btn-lg">{ui.quote}</Link>
            <a href={whatsappLink(ui.hello)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">{ui.whatsapp}</a>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={s.facts}>{home.facts.map(([b, t]) => <div key={b}><b>{b}</b><span>{t}</span></div>)}</div>
      </div>

      <section className={s.section}>
        <div className="container">
          <h2 className={s.h2}>{home.whyTitle}</h2>
          <div className={s.cards}>{home.why.map(([h, p]) => <div key={h} className={s.card}><h3>{h}</h3><p>{p}</p></div>)}</div>
        </div>
      </section>

      <section className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.h2}>{home.productsTitle}</h2>
          <ProductCards lang={lang} products={langProducts(lang).slice(0, 12)} />
          <p style={{ marginTop: 20 }}><Link href={`/${lang}/products/`} className="btn btn-outline">{ui.nav[1][1]}</Link></p>
        </div>
      </section>

      <section className={s.section}>
        <div className="container">
          <h2 className={s.h2}>{home.stepsTitle}</h2>
          <ol className={s.steps}>{home.steps.map((t) => <li key={t}>{t}</li>)}</ol>
        </div>
      </section>

      <section className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.h2}>{home.marketsTitle}</h2>
          <div className={s.chips}>
            {markets.length
              ? markets.map((m) => <Link key={m.slug} href={`/${lang}/exports/${m.slug}/`}>{m.t.name}</Link>)
              : exportDestinations.map((d) => <a key={d.slug} href={`/exports/${d.slug}/`} hrefLang="en">{d.name}</a>)}
          </div>
          <h2 className={s.h2} style={{ marginTop: 36 }}>{home.certsTitle}</h2>
          <p className={s.text} lang="en" dir="ltr">{certificates.map((c) => c.short).join(' · ')}</p>
        </div>
      </section>
    </>
  );
}
