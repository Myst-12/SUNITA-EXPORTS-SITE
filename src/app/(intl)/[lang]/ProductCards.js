import Link from '@/components/Link';
import s from './intl.module.css';

// Product cards in the visitor's language, with the English name underneath for reference.
export default function ProductCards({ lang, products }) {
  return (
    <div className={s.cards}>
      {products.map((p) => (
        <Link key={p.slug} href={`/${lang}/products/${p.category}/${p.slug}/`} className={s.prod}>
          <img src={p.image} alt={p.t.name} loading="lazy" />
          <span><b>{p.t.name}</b><small lang="en" dir="ltr">{p.name}</small></span>
        </Link>
      ))}
    </div>
  );
}
