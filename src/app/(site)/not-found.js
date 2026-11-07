import Link from 'next/link';
import Icon from '@/components/Icon';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, var(--green-50), #fffdf6)' }}>
      <div className="container container-narrow center">
        <span className="eyebrow">Error 404</span>
        <h1>This page has sailed.</h1>
        <p className="lead" style={{ marginInline: 'auto' }}>The page you are looking for has moved or no longer exists. Try our product catalogue or send us your requirement.</p>
        <div className="btn-row mt-3" style={{ justifyContent: 'center' }}>
          <Link href="/products/" className="btn btn-primary">Browse products <Icon name="arrow-right" /></Link>
          <Link href="/contact/" className="btn btn-outline">Get a quote</Link>
          <Link href="/" className="btn btn-outline">Home</Link>
        </div>
      </div>
    </section>
  );
}
