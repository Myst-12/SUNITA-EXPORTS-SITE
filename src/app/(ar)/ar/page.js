import Link from 'next/link';
import { AR, AR_HOME } from '@/data/ar';
import { certificates } from '@/data/certificates';
import { arProducts, arMarkets } from '@/lib/arData';
import { arAlternates } from '@/lib/i18n';
import { whatsappLink } from '@/config/site';
import s from './ar.module.css';

export const metadata = {
  title: { absolute: `${AR.company} | مصدّر التوابل والأرز البسمتي الهندي إلى الخليج` },
  description: 'مصدّر هندي للتوابل والأرز البسمتي والبقوليات والمواد الغذائية من مومباي منذ ٢٠١٠، إلى الإمارات والسعودية وقطر والكويت وعُمان والبحرين ومصر. عرض سعر خلال ٢٤ ساعة.',
  alternates: arAlternates('/'),
};

export default function ArabicHome() {
  return (
    <>
      <section className={s.hero}>
        <img className={s.heroImg} src="/images/hero/spices-wood.webp" alt="أوعية من التوابل الهندية الملونة على طاولة خشبية" fetchPriority="high" />
        <div className="container">
          <h1>{AR_HOME.title}</h1>
          <p>{AR_HOME.lead}</p>
          <div className={s.actions}>
            <Link href="/ar/contact/" className="btn btn-light btn-lg">{AR.quote}</Link>
            <a href={whatsappLink('مرحباً، أرغب في عرض سعر.')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">{AR.whatsapp}</a>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={s.facts}>{AR_HOME.facts.map(([b, t]) => <div key={b}><b>{b}</b><span>{t}</span></div>)}</div>
      </div>

      <section className={s.section}>
        <div className="container">
          <h2 className={s.h2}>{AR_HOME.whyTitle}</h2>
          <div className={s.cards}>{AR_HOME.why.map(([h, p]) => <div key={h} className={s.card}><h3>{h}</h3><p>{p}</p></div>)}</div>
        </div>
      </section>

      <section className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.h2}>{AR_HOME.productsTitle}</h2>
          <div className={s.cards}>
            {arProducts().map((p) => (
              <Link key={p.slug} href={`/ar/products/${p.category}/${p.slug}/`} className={s.prod}>
                <img src={p.image} alt={p.ar.name} loading="lazy" />
                <span><b>{p.ar.name}</b><small lang="en" dir="ltr">{p.name}</small></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={s.section}>
        <div className="container">
          <h2 className={s.h2}>{AR_HOME.stepsTitle}</h2>
          <ol className={s.steps}>{AR_HOME.steps.map((t) => <li key={t}>{t}</li>)}</ol>
        </div>
      </section>

      <section className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.h2}>{AR_HOME.marketsTitle}</h2>
          <div className={s.chips}>{arMarkets().map((m) => <Link key={m.slug} href={`/ar/exports/${m.slug}/`}>{m.ar.name}</Link>)}</div>
          <h2 className={s.h2} style={{ marginTop: 36 }}>{AR_HOME.certsTitle}</h2>
          <p className={s.text} lang="en" dir="ltr" style={{ textAlign: 'right' }}>{certificates.map((c) => c.short).join(' · ')}</p>
        </div>
      </section>
    </>
  );
}
