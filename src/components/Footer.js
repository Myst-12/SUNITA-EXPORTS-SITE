import Link from 'next/link';
import { COMPANY, CONTACT, fullAddress, mapsLink } from '@/config/site';
import SocialLinks from './SocialLinks';
import styles from './Footer.module.css';

const COMPANY_LINKS = [
  { label: 'About us', href: '/about/' },
  { label: 'Quality & certifications', href: '/certifications/' },
  { label: 'Export markets', href: '/exports/' },
  { label: 'Indian grocery exporter', href: '/indian-grocery-exporter/' },
  { label: 'Indian spices exporter', href: '/indian-spices-exporter/' },
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
          <SocialLinks tone="mist" />
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

      <div className={`container ${styles.qrRow}`}>
        <div className={styles.qrCard}>
          <img src="/images/contact-qr.png" alt="QR code: scan to save Sunita Agri Exports contact details" width={176} height={176} />
        </div>
        <div className={styles.qrText}>
          <p className={styles.heading}>Save our contact</p>
          <p>Scan with your phone camera to add Alok and Ankit Dhanuka’s numbers and email to your contacts in one step.</p>
          <a href="/downloads/sunita-agri-exports-contact-qr.pdf" target="_blank" rel="noopener noreferrer" className={styles.more}>Download printable QR (PDF)</a>
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
