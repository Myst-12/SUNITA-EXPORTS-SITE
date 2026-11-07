import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AR, SPEC_LABELS } from '@/data/ar';
import { arProducts } from '@/lib/arData';
import { arAlternates } from '@/lib/i18n';
import { SITE_URL, whatsappLink } from '@/config/site';
import s from '../../../ar.module.css';

export const dynamicParams = false;
export const generateStaticParams = () => arProducts().map((p) => ({ category: p.category, product: p.slug }));

const find = async (params) => {
  const { category, product } = await params;
  return arProducts().find((p) => p.slug === product && p.category === category);
};

export async function generateMetadata({ params }) {
  const p = await find(params);
  if (!p) return {};
  const path = `/products/${p.category}/${p.slug}/`;
  return {
    title: `${p.ar.name} للتصدير من الهند`,
    description: `${p.ar.description.slice(0, 120)} عرض سعر FOB وCIF خلال ٢٤ ساعة.`,
    alternates: arAlternates(path),
    openGraph: { title: `${p.ar.name} | ${AR.company}`, images: p.image ? [p.image] : undefined },
  };
}

export default async function ArabicProduct({ params }) {
  const p = await find(params);
  if (!p) notFound();
  const specs = Object.entries(p.specifications || {});
  const path = `/products/${p.category}/${p.slug}/`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'Product', name: p.ar.name, alternateName: p.name, inLanguage: 'ar',
    description: p.ar.description, url: `${SITE_URL}/ar${path}`, image: p.image ? `${SITE_URL}${p.image}` : undefined,
    brand: { '@type': 'Brand', name: 'Sunita Agri Exports' }, countryOfOrigin: { '@type': 'Country', name: 'India' },
  };

  return (
    <section className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="container">
        <nav className={s.crumbs}><Link href="/ar/">الرئيسية</Link> / <Link href="/ar/products/">المنتجات</Link> / <span>{p.ar.name}</span></nav>
        <div className={s.pgrid}>
          <img className={s.pimg} src={p.image} alt={p.ar.name} fetchPriority="high" />
          <div>
            <h1>{p.ar.name}</h1>
            <p className={s.latin} lang="en" dir="ltr">{p.name}{p.botanicalName ? ` · ${p.botanicalName}` : ''}</p>
            <p className={s.text}>{p.ar.description}</p>
            <p className={s.text}>{p.ar.uses}</p>
            <dl className={s.meta}>
              {p.hsCode && <><dt>{AR.hsCode}</dt><dd dir="ltr">{p.hsCode}</dd></>}
              <dt>{AR.origin}</dt><dd>الهند</dd>
              {p.grades?.length > 0 && <><dt>{AR.grades}</dt><dd lang="en" dir="ltr" style={{ textAlign: 'right' }}>{p.grades.join(' · ')}</dd></>}
            </dl>
            <div className={s.actions}>
              <Link href={`/ar/contact/?product=${encodeURIComponent(p.ar.name)}`} rel="nofollow" className="btn btn-primary btn-lg">{AR.quote}</Link>
              <a href={whatsappLink(`مرحباً، أرغب في عرض سعر: ${p.ar.name}`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">{AR.whatsapp}</a>
            </div>
          </div>
        </div>

        {specs.length > 0 && (
          <div style={{ marginTop: 40, maxWidth: 820 }}>
            <h2 className={s.h2}>{AR.specs}</h2>
            <table className={s.table}><tbody>{specs.map(([k, v]) => <tr key={k}><th scope="row">{SPEC_LABELS[k] || k}</th><td>{v}</td></tr>)}</tbody></table>
            <p className={s.note}>{AR.specNote}</p>
          </div>
        )}

        <div style={{ marginTop: 32, maxWidth: 820 }}>
          <h2 className={s.h2}>{AR.packing}</h2>
          <p className={s.text}>{AR.packingText}</p>
          <p className={s.note}><a href={path} hrefLang="en">English version and specification sheet (PDF)</a></p>
        </div>
      </div>
    </section>
  );
}
