import Link from 'next/link';
import { COMPANY, CONTACT, fullAddress, mapsLink } from '@/config/site';
import styles from './Footer.module.css';

const COMPANY_LINKS = [
  { label: 'About us', href: '/about/' },
  { label: 'Quality & certifications', href: '/certifications/' },
  { label: 'Export markets', href: '/exports/' },
  { label: 'Mixed container', href: '/mixed-container/' },
  { label: 'Private label', href: '/private-label/' },
  { label: 'Buyer guides', href: '/knowledge/' },
  { label: 'FAQ', href: '/faq/' },
];

export default function Footer({ categories = [] }) {
  const year = new Date().getFullYear();
  const products = categories.filter((c) => !c.service).slice(0, 6);
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.main}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brand}>
            <img src="/images/logo-mark.png" alt="" width={40} height={40} />
            <span>{COMPANY.legalName}</span>
          </Link>
          <p className={styles.about}>
            Indian spices, rice, pulses and groceries, exported from Mumbai since {COMPANY.foundingYear}. {COMPANY.status}.
          </p>
        </div>

        <div>
          <p className={styles.heading}>Products</p>
          <ul className={styles.list}>
            {products.map((c) => (
              <li key={c.slug}><Link href={c.href}>{c.name}</Link></li>
            ))}
            <li><Link href="/products/" className={styles.more}>All products</Link></li>
          </ul>
        </div>

        <div>
          <p className={styles.heading}>Company</p>
          <ul className={styles.list}>
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className={styles.heading}>Contact</p>
          <ul className={styles.list}>
            {CONTACT.phones.map((p, i) => (
              <li key={p.tel} data-secondary-phone={i > 0 || undefined}><a href={`tel:${p.tel}`}>{p.display}</a></li>
            ))}
            <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li><a href={mapsLink()} target="_blank" rel="noopener noreferrer" className={styles.address}>{fullAddress()}</a></li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {year} {COMPANY.legalName}</p>
        <p className={styles.bottomLinks}>
          <Link href="/privacy/">Privacy</Link>
          <Link href="/terms/">Terms</Link>
          <Link href="/credits/">Image credits</Link>
        </p>
      </div>
    </footer>
  );
}
