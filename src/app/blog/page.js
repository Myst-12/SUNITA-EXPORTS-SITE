import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { blogPosts } from '@/data/blog';
import s from '../pages.module.css';

export const metadata = {
  title: 'Blog — Indian Spice & Food Export Insights',
  description: 'Guides and insights on importing Indian spices, rice and groceries: regulations, quality standards, sourcing calendars and compliance.',
  alternates: { canonical: '/blog/' },
};

const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: 'Blog', href: '/blog/' }]}
        eyebrow="Insights"
        title="Export insights for food importers"
        lead="Regulations, quality, sourcing and market notes from our team in Mumbai."
      />
      <section className={`section ${s.tintLime}`}>
        <div className="container">
          <div className={s.cards}>
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className={s.imgCard}>
                <div className={s.cardImg}><Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 100vw, 33vw" /></div>
                <div className={s.cardBody}>
                  <span className="small text-muted" style={{ fontWeight: 700 }}>{fmt(p.date)} · {p.readTime} read</span>
                  <h3 className="mt-1">{p.title}</h3>
                  <p>{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
