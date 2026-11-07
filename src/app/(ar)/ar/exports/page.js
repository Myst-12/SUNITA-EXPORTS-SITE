import Link from 'next/link';
import { AR, AR_HOME } from '@/data/ar';
import { arMarkets } from '@/lib/arData';
import { arAlternates } from '@/lib/i18n';
import s from '../ar.module.css';

export const metadata = {
  title: 'التصدير إلى الخليج ومصر',
  description: 'نصدّر التوابل والأرز البسمتي والبقوليات الهندية إلى الإمارات والسعودية والكويت وعُمان وقطر والبحرين ومصر، بحاويات كاملة أو مختلطة.',
  alternates: arAlternates('/exports/'),
};

export default function ArabicMarkets() {
  return (
    <section className={s.page}>
      <div className="container">
        <nav className={s.crumbs}><Link href="/ar/">الرئيسية</Link> / <span>أسواق الخليج</span></nav>
        <h1 className={s.h2}>{AR_HOME.marketsTitle}</h1>
        <div className={s.cards}>
          {arMarkets().map((m) => (
            <Link key={m.slug} href={`/ar/exports/${m.slug}/`} className={s.card}>
              <h3>{m.ar.name}</h3>
              <p>{m.ar.lead}</p>
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 28 }}><Link href="/ar/contact/" className="btn btn-primary btn-lg">{AR.quote}</Link></p>
      </div>
    </section>
  );
}
