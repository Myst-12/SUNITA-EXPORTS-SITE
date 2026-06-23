import Link from 'next/link';
import styles from './Footer.module.css';

const categories = [
  { name: 'Indian Spices', slug: 'indian-spices' },
  { name: 'Blended Spices', slug: 'blended-spices' },
  { name: 'Rice', slug: 'rice' },
  { name: 'Pulses & Grains', slug: 'pulses-grains' },
  { name: 'Oilseeds', slug: 'oilseeds' },
  { name: 'Herbs', slug: 'herbs' },
  { name: 'Dehydrated Products', slug: 'dehydrated-products' },
  { name: 'Fruits & Vegetables', slug: 'fruits-vegetables' },
  { name: 'Foodstuff & FMCG', slug: 'foodstuff-fmcg' },
  { name: 'Animal Feed', slug: 'animal-bird-feed' },
  { name: 'Raisins & Dry Fruits', slug: 'raisins-dry-fruits' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* ===== TOP FOOTER ROWS ===== */}
      <div className={`container section-padding ${styles.footerTop}`}>
        {/* Col 1: About */}
        <div className={styles.colInfo}>
          <Link href="/" className={styles.infoLogo}>
            SUNITA EXPORTS
          </Link>
          <span className={styles.infoBadge}>Since 1994 • 30+ Years</span>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            Sunita Agri Exports Pvt. Ltd. is a premier exporter of premium Indian spices, rice, pulses, and agri-commodities. Certified under BRCGS, US FDA, ISO 22000, and APEDA.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h3 className={styles.title}>Company</h3>
          <ul className={styles.linksList}>
            <li className={styles.link}><Link href="/">Home</Link></li>
            <li className={styles.link}><Link href="/about">Our Story</Link></li>
            <li className={styles.link}><Link href="/why-choose-us">Why Us</Link></li>
            <li className={styles.link}><Link href="/certifications">Certifications</Link></li>
            <li className={styles.link}><Link href="/shipments">Shipments</Link></li>
            <li className={styles.link}><Link href="/b2b-presence">B2B Presence</Link></li>
            <li className={styles.link}><Link href="/contact">Contact</Link></li>
            <li className={styles.link}><Link href="/faq">FAQ</Link></li>
            <li className={styles.link}><Link href="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* Col 3: Categories */}
        <div>
          <h3 className={styles.title}>Commodities</h3>
          <ul className={styles.linksList}>
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.slug} className={styles.link}>
                <Link href={`/products/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
            <li className={styles.link}>
              <Link href="/products" style={{ fontWeight: '600', color: 'var(--color-gold)' }}>View All (11) →</Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact */}
        <div>
          <h3 className={styles.title}>Contact Details</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">📍</span>
              <span>
                1014, Ghanshyam Enclave, Laljipada, Link Road, Kandivali (West), Mumbai – 400 067, Maharashtra, India.
              </span>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">📞</span>
              <div>
                <a href="tel:+918169282942" style={{ display: 'block' }}>+91 8169282942</a>
                <a href="tel:+919004041889" style={{ display: 'block' }}>+91 9004041889</a>
              </div>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">✉️</span>
              <div>
                <a href="mailto:sales@sunitaexports.com" style={{ display: 'block' }}>sales@sunitaexports.com</a>
                <a href="mailto:info@sunitaexports.com" style={{ display: 'block' }}>info@sunitaexports.com</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* ===== BOTTOM COPYRIGHTS ===== */}
      <div style={{ backgroundColor: '#0c1e0e', padding: '1.5rem 0' }}>
        <div className={`container ${styles.footerBottom}`}>
          <p>© 2026 Sunita Agri Exports Pvt. Ltd. All Rights Reserved. Co. Reg: 1994/Restructured 2007.</p>
          <ul className={styles.bottomLinks}>
            <li className={styles.bottomLink}><Link href="/sitemap.xml">Sitemap</Link></li>
            <li className={styles.bottomLink}><Link href="/contact">Inquire</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
