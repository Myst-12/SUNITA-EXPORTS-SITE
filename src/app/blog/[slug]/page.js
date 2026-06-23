import { blogPosts } from '@/data/blog';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';

// Generate static routes at compile time
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate SEO Metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} | Sunita Agri Exports`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.sunitaexports.com/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://www.sunitaexports.com/blog/${post.slug}/`,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h1>Article Not Found</h1>
        <p>The requested blog article could not be found.</p>
        <Link href="/blog" className="btn-primary" style={{ marginTop: '1rem' }}>
          Back to Blog
        </Link>
      </div>
    );
  }

  // Schema markup
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sunita Agri Exports Pvt. Ltd.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.sunitaexports.com/images/logo.webp',
      },
    },
    description: post.excerpt,
  };

  // Other related articles
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ===== BREADCRUMB ===== */}
      <Breadcrumb
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      {/* ===== ARTICLE LAYOUT ===== */}
      <section className="section-white section-padding">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ScrollReveal>
              <span className="label gold-accent">Industry Insights</span>
              <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
                {post.title}
              </h1>
              
              <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: '0.875rem', color: 'var(--color-mid)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
                <span>Published on: <strong>{post.date}</strong></span>
                <span>•</span>
                <span>By: <strong>{post.author}</strong></span>
                <span>•</span>
                <span>Read Time: <strong>{post.readTime}</strong></span>
              </div>
            </ScrollReveal>

            {/* Article Content */}
            <ScrollReveal>
              <article 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  lineHeight: '1.8',
                  fontSize: '1.075rem',
                  color: 'var(--color-dark)'
                }}
              />
            </ScrollReveal>

            {/* Article Footer & Navigation */}
            <ScrollReveal>
              <div style={{ marginTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>Internal Sourcing Links</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-mid)' }}>
                  Sunita Agri Exports is a certified provider of bulk commodities. Explore our key categories:
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
                  <Link href="/products/indian-spices" className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                    🌶️ Indian Spices
                  </Link>
                  <Link href="/products/rice" className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                    🍚 Basmati Rice
                  </Link>
                  <Link href="/faq" className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                    ❓ Sourcing FAQs
                  </Link>
                  <Link href="/contact" className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                    ✉️ Request Samples
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== RELATED ARTICLES ===== */}
      <section className="section-ivory section-padding" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 'var(--space-5)' }}>
            <h2>Related Articles</h2>
          </div>
          <div className="grid-2" style={{ gap: 'var(--space-4)', maxWidth: '800px', margin: '0 auto' }}>
            {relatedPosts.map((p) => (
              <ScrollReveal key={p.slug}>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', fontWeight: '600' }}>
                      <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-mid)' }}>{p.excerpt}</p>
                  </div>
                  <Link href={`/blog/${p.slug}`} className="link-arrow" style={{ marginTop: 'var(--space-2)' }}>
                    Read Article <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
