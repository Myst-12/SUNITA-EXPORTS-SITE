import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import { blogPosts } from '@/data/blog';
import { BLOG_PRODUCTS } from '@/data/blogProducts';
import { getAllProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { articleSchema } from '@/lib/schemas';
import { CONTACT, whatsappLink } from '@/config/site';
import styles from './post.module.css';
import { seoTitle } from '@/lib/seoTitle';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Article not found' };
  return {
    title: seoTitle(post.title),
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, images: [{ url: post.image }], publishedTime: post.date },
  };
}

const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const more = blogPosts.filter((p) => p.slug !== post.slug);
  const all = getAllProducts();
  const products = (BLOG_PRODUCTS[post.slug] || []).map((s) => all.find((p) => p.slug === s)).filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({ ...post, publishedDate: post.date, url: `/blog/${post.slug}/` })) }} />
      <article>
        <header className={styles.head}>
          <div className="container container-narrow">
            <Breadcrumb inline items={[{ label: 'Blog', href: '/blog/' }, { label: post.title.split(':')[0], href: `/blog/${post.slug}/` }]} />
            <div className="chip-row">{post.tags?.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.meta}>{fmt(post.date)} · {post.readTime} read · {post.author}</p>
          </div>
        </header>
        <div className="container container-narrow">
          <div className={styles.cover}><Image src={post.image} alt={post.title} fill priority sizes="(max-width: 900px) 100vw, 860px" /></div>
          <div className={`prose ${styles.body}`} dangerouslySetInnerHTML={{ __html: post.content }} />
          <aside className={styles.cta}>
            <div>
              <strong>Planning your next shipment from India?</strong>
              <p>Send your product list — we reply with FOB / CIF prices within 24 hours.</p>
            </div>
            <div className="btn-row">
              <Link href="/contact/" className="btn btn-primary">Get a quote <Icon name="arrow-right" /></Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" /> {CONTACT.whatsappDisplay}</a>
            </div>
          </aside>
        </div>
      </article>

      {products.length > 0 && (
        <section className="section-sm">
          <div className="container">
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Products in this guide</h2>
            <div className="grid-4">{products.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="section-sm section-soft">
          <div className="container container-narrow">
            <h2 style={{ fontSize: '1.4rem' }}>More guides</h2>
            <div className={styles.more}>
              {more.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className={styles.moreItem}>
                  <span className={styles.moreImg}><Image src={p.image} alt="" fill sizes="96px" /></span>
                  <span><strong>{p.title}</strong><small>{p.readTime} read</small></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
