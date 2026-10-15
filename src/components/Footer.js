import Link from 'next/link';
import Icon from './Icon';
import { COMPANY, CONTACT, CERTIFICATIONS, fullAddress, whatsappLink, mapsLink } from '@/config/site';
import { exportDestinations } from '@/data/countries';
import styles from './Footer.module.css';

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about/' },
  { label: 'Quality & Certifications', href: '/certifications/' },
  { label: 'Shipping & Logistics', href: '/certifications/#logistics' },
  { label: 'Export Markets', href: '/exports/' },
  { label: 'Mixed Container', href: '/mixed-container/' },
  { label: 'Private Label', href: '/private-label/' },
  { label: 'Indian FMCG', href: '/fmcg/' },
  { label: 'Buyer Guides', href: '/knowledge/' },
  { label: 'FAQ', href: '/faq/' },
];

export default function Footer({ categories = [] }) {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <p className="eyebrow on-dark">Ready when you are</p>
            <h2 className={styles.ctaTitle}>Tell us what you need. Get an export quote within 24 hours.</h2>
          </div>
          <div className="btn-row">
            <Link href="/contact/" className="btn btn-primary btn-lg">Request a Quote <Icon name="arrow-right" /></Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
              <Icon name="whatsapp" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className={`container ${styles.main}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark}><img src="/images/logo-mark.png" alt="" width={44} height={44} /></span>
            <span>
              <strong>{COMPANY.legalName}</strong>
              <small>{COMPANY.status}</small>
            </span>
          </Link>
          <p className={styles.about}>
            Exporting Indian spices, rice, pulses, oilseeds, herbs and Indian groceries from Mumbai since {COMPANY.foundingYear}.
            One partner, any mix of products, one container — to {COMPANY.countriesServed} countries.
          </p>
          <a href="/downloads/sunita-agri-exports-catalogue.pdf" className={styles.download} download>
            <Icon name="download" size={18} /> Download product catalogue (PDF)
          </a>
        </div>

        <div>
          <p className={styles.heading}>Products</p>
          <ul className={styles.list}>
            {categories.map((c) => (
              <li key={c.slug}><Link href={`/products/${c.slug}/`}>{c.name}</Link></li>
            ))}
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
          <ul className={styles.contact}>
            <li>
              <Icon name="pin" size={18} />
              <a href={mapsLink()} target="_blank" rel="noopener noreferrer">{fullAddress()}</a>
            </li>
            {CONTACT.phones.map((p, i) => (
              <li key={p.tel} data-secondary-phone={i > 0 || undefined}><Icon name="phone" size={18} /><a href={`tel:${p.tel}`}>{p.display}<small>{p.label}</small></a></li>
            ))}
            <li><Icon name="mail" size={18} /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li><Icon name="clock" size={18} /><span>{CONTACT.hours}</span></li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className={styles.markets}>
          <span className={styles.heading}>Export markets</span>
          <div className={styles.marketLinks}>
            {exportDestinations.map((d) => (
              <Link key={d.slug} href={`/exports/${d.slug}/`}>{d.name}</Link>
            ))}
          </div>
        </div>
        <div className={styles.certs}>
          {CERTIFICATIONS.map((c) => (
            <span key={c.key} title={c.full}>{c.name}</span>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>© {year} {COMPANY.legalName}. All rights reserved.</p>
          <p className={styles.bottomLinks}>
            <Link href="/privacy/">Privacy</Link>
            <Link href="/terms/">Terms</Link>
            <Link href="/credits/">Image credits</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
