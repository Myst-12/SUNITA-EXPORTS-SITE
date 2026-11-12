import Link from '@/components/Link';
import { TEXT } from '@/data/i18n';
import { langProducts } from '@/lib/intlData';
import { langAlternates } from '@/lib/i18n';
import ProductCards from '../ProductCards';
import s from '../intl.module.css';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { meta } = TEXT[lang].ui;
  return { title: meta.productsTitle, description: meta.productsDesc, alternates: langAlternates(lang, '/products/') };
}

export default async function LangProducts({ params }) {
  const { lang } = await params;
  const { ui, home } = TEXT[lang];
  return (
    <section className={s.page}>
      <div className="container">
        <nav className={s.crumbs}><Link href={`/${lang}/`}>{ui.nav[0][1]}</Link> / <span>{ui.nav[1][1]}</span></nav>
        <h1 className={s.h2}>{home.productsTitle}</h1>
        <p className={s.text}>{ui.productsHubText}</p>
        <div className={s.actions} style={{ marginBottom: 28 }}>
          <a href="/products/" hrefLang="en" className="btn btn-outline">{ui.fullCatalogue}</a>
          <Link href={`/${lang}/contact/`} className="btn btn-primary">{ui.sendList}</Link>
        </div>
        <ProductCards lang={lang} products={langProducts(lang)} />
      </div>
    </section>
  );
}
