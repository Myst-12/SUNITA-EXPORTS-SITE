import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { blogPosts } from '@/data/blog';

export const metadata = {
  title: 'Blog | Indian Spice Export Insights & Guides | Sunita Agri Exports',
  description: 'Expert guides and insights on importing Indian spices, rice, and agri commodities. Learn about certifications, documentation, and sourcing from India.',
};

export default function BlogIndexPage() {
  return (
    <>
      {/* ===== HERO HEADER ===== */}
      <section className="section-ivory section-padding" style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <span className="label gold-accent">Knowledge Hub</span>
            <h1>Trade Insights & Sourcing Guides</h1>
            <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Read our latest industry analysis, guides on international import regulations, quality certification reviews, and seasonal agricultural updates.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== ARTICLES LIST ===== */}
      <section className="section-white section-padding">
        <div className="container">
          <div className="grid-3" style={{ gap: 'var(--space-5)' }}>
            {blogPosts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 50}>
                <article className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', fontSize: '0.8rem', color: 'var(--color-mid)', marginBottom: 'var(--space-2)' }}>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 style={{ fontSize: '1.35rem', color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: 'var(--space-2)' }}>
                      <Link href={`/blog/${post.slug}`} style={{ hover: { color: 'var(--color-accent-dark)' } }}>
                        {post.title}
                      </Link>
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-mid)', lineHeight: '1.6', marginBottom: 'var(--space-4)' }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <div>
                    <Link href={`/blog/${post.slug}`} className="link-arrow" style={{ marginTop: 0 }}>
                      Read Article <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
