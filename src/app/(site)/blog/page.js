import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import Icon from '@/components/Icon';
import { blogPosts } from '@/data/blog';
import s from './blog.module.css';

export const metadata = {
  title: 'Blog: Spice & Food Export Guides',
  description: 'Guides and insights on importing Indian spices, rice and groceries: regulations, quality standards, sourcing calendars and compliance.',
  alternates: { canonical: '/blog/' },
};

const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

function Meta({ p }) {
  return (
    <p className={s.meta}>
      {p.tags?.[0] && <span className={s.tag}>{p.tags[0]}</span>}
      <time dateTime={p.date}>{fmt(p.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{p.readTime} read</span>
    </p>
  );
}

/** Newest post as a wide feature, the rest in a card grid. */
export default function BlogPage() {
  const [first, ...rest] = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: 'Blog', href: '/blog/' }]}
        eyebrow="Blog"
        title="Guides and insights for food importers"
        lead="Export regulations, quality standards, sourcing calendars and market notes from our team in Mumbai."
      />
      <section className="section" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
        <div className="container">
          {first && (
            <Link href={`/blog/${first.slug}/`} className={s.feature}>
              <div className={s.featureImg}><Image src={first.image} alt={first.title} fill priority sizes="(max-width: 860px) 100vw, 55vw" /></div>
              <div className={s.featureBody}>
                <Meta p={first} />
                <h2>{first.title}</h2>
                <p className={s.excerpt}>{first.excerpt}</p>
                <span className={s.read}>Read article <Icon name="arrow-right" size={16} /></span>
              </div>
            </Link>
          )}
          {rest.length > 0 && (
            <div className={s.grid}>
              {rest.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className={s.card}>
                  <div className={s.cardImg}><Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" /></div>
                  <div className={s.cardBody}>
                    <Meta p={p} />
                    <h3>{p.title}</h3>
                    <p className={s.excerpt}>{p.excerpt}</p>
                    <span className={s.read}>Read article <Icon name="arrow-right" size={16} /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
