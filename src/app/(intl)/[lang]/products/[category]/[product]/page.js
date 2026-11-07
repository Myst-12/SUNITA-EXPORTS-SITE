import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TEXT } from '@/data/i18n';
import { langProducts } from '@/lib/intlData';
import { langAlternates } from '@/lib/i18n';
import { SITE_URL, whatsappLink } from '@/config/site';
import s from '../../../intl.module.css';

export const dynamicParams = false;
export async function generateStaticParams({ params }) {
  const { lang } = await params;
  return langProducts(lang).map((p) => ({ category: p.category, product: p.slug }));
}

const find = async (params) => {
  const { lang, category, product } = await params;
  return [lang, langProducts(lang).find((p) => p.slug === product && p.category === category)];
};

export async function generateMetadata({ params }) {
  const [lang, p] = await find(params);
  if (!p) return {};
  const { ui } = TEXT[lang];
  return {
    title: ui.meta.product(p.t.name),
    description: `${p.t.description.slice(0, 120)}${ui.meta.productDescEnd}`,
    alternates: langAlternates(lang, `/products/${p.category}/${p.slug}/`),
    openGraph: { title: `${p.t.name} | ${ui.company}`, images: p.image ? [p.image] : undefined },
  };
}

export default async function LangProduct({ params }) {
  const [lang, p] = await find(params);
  if (!p) notFound();
  const { ui, specLabels } = TEXT[lang];
  const specs = Object.entries(p.specifications || {});
  const path = `/products/${p.category}/${p.slug}/`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'Product', name: p.t.name, alternateName: p.name, inLanguage: lang,
    description: p.t.description, url: `${SITE_URL}/${lang}${path}`, image: p.image ? `${SITE_URL}${p.image}` : undefined,
    brand: { '@type': 'Brand', name: 'Sunita Agri Exports' }, countryOfOrigin: { '@type': 'Country', name: 'India' },
  };

  return (
    <section className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="container">
        <nav className={s.crumbs}><Link href={`/${lang}/`}>{ui.nav[0][1]}</Link> / <Link href={`/${lang}/products/`}>{ui.nav[1][1]}</Link> / <span>{p.t.name}</span></nav>
        <div className={s.pgrid}>
          <img className={s.pimg} src={p.image} alt={p.t.name} fetchPriority="high" />
          <div>
            <h1>{p.t.name}</h1>
            <p className={s.latin} lang="en" dir="ltr">{p.name}{p.botanicalName ? ` · ${p.botanicalName}` : ''}</p>
            <p className={s.text}>{p.t.description}</p>
            <p className={s.text}>{p.t.uses}</p>
            <dl className={s.meta}>
              {p.hsCode && <><dt>{ui.hsCode}</dt><dd dir="ltr">{p.hsCode}</dd></>}
              <dt>{ui.origin}</dt><dd>{ui.india}</dd>
              {p.grades?.length > 0 && <><dt>{ui.grades}</dt><dd lang="en" dir="ltr">{p.grades.join(' · ')}</dd></>}
            </dl>
            <div className={s.actions}>
              <Link href={`/${lang}/contact/?product=${encodeURIComponent(p.t.name)}`} rel="nofollow" className="btn btn-primary btn-lg">{ui.quote}</Link>
              <a href={whatsappLink(`${ui.helloProduct}${p.t.name}`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">{ui.whatsapp}</a>
            </div>
          </div>
        </div>

        {specs.length > 0 && (
          <div style={{ marginTop: 40, maxWidth: 820 }}>
            <h2 className={s.h2}>{ui.specs}</h2>
            <table className={s.table}><tbody>{specs.map(([k, v]) => <tr key={k}><th scope="row">{specLabels[k] || k}</th><td>{v}</td></tr>)}</tbody></table>
            <p className={s.note}>{ui.specNote}</p>
          </div>
        )}

        <div style={{ marginTop: 32, maxWidth: 820 }}>
          <h2 className={s.h2}>{ui.packing}</h2>
          <p className={s.text}>{ui.packingText}</p>
          <p className={s.note}><a href={path} hrefLang="en">{ui.englishVersion}</a></p>
        </div>
      </div>
    </section>
  );
}
