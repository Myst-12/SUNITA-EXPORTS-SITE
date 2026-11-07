import Link from 'next/link';
import { AR, AR_HOME } from '@/data/ar';
import { arProducts } from '@/lib/arData';
import { arAlternates } from '@/lib/i18n';
import s from '../ar.module.css';

export const metadata = {
  title: 'المنتجات: توابل وأرز بسمتي وبقوليات هندية',
  description: 'كمون وكركم وهيل وفلفل أسود وأرز بسمتي ١١٢١ وحمص كابلي وبهارات هندية، بالجملة أو بعلامتك التجارية، من مومباي إلى الخليج.',
  alternates: arAlternates('/products/'),
};

export default function ArabicProducts() {
  return (
    <section className={s.page}>
      <div className="container">
        <nav className={s.crumbs}><Link href="/ar/">الرئيسية</Link> / <span>المنتجات</span></nav>
        <h1 className={s.h2}>{AR_HOME.productsTitle}</h1>
        <p className={s.text}>هذه أكثر منتجاتنا طلباً في الخليج. لدينا أكثر من ٣٨٠ منتجاً؛ للاطلاع على القائمة الكاملة <a href="/products/" hrefLang="en">تصفّح الكتالوج بالإنجليزية</a> أو <Link href="/ar/contact/">أرسل لنا قائمتك</Link>.</p>
        <div className={s.cards}>
          {arProducts().map((p) => (
            <Link key={p.slug} href={`/ar/products/${p.category}/${p.slug}/`} className={s.prod}>
              <img src={p.image} alt={p.ar.name} loading="lazy" />
              <span><b>{p.ar.name}</b><small lang="en" dir="ltr">{p.name}</small></span>
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 28 }}><Link href="/ar/contact/" className="btn btn-primary btn-lg">{AR.quote}</Link></p>
      </div>
    </section>
  );
}
