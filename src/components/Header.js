'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import { CONTACT, COMPANY, whatsappLink } from '@/config/site';
import styles from './Header.module.css';

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about/', desc: 'Our story since 1994' },
  { label: 'Quality & Certifications', href: '/certifications/', desc: 'ISO, FSSAI, FDA, APEDA & more' },
  { label: 'Export Markets', href: '/exports/', desc: '40+ countries we ship to' },
  { label: 'Trade Fairs', href: '/about/#exhibitions', desc: 'Meet us at Gulfood' },
  { label: 'Buyer Guides', href: '/knowledge/', desc: 'How to import from India' },
  { label: 'FAQ', href: '/faq/', desc: 'MOQ, payment, shelf life' },
];

const SERVICE_LINKS = [
  { label: 'Mixed Container', href: '/mixed-container/', icon: 'container' },
  { label: 'Private Label', href: '/private-label/', icon: 'tag' },
  { label: 'Indian FMCG & Grocery', href: '/fmcg/', icon: 'package' },
];

const TOP_LINKS = [
  { label: 'Mixed Container', href: '/mixed-container/' },
  { label: 'Indian FMCG', href: '/fmcg/' },
  { label: 'Private Label', href: '/private-label/' },
];

export default function Header({ categories = [] }) {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu when the route changes (state reset during render, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setMobileSub(null);
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, '')));

  return (
    <>
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <p className={styles.topBarNote}>
            <Icon name="award" size={15} /> {COMPANY.status} · Exporting since {COMPANY.foundingYear}
          </p>
          <div className={styles.topBarLinks}>
            {CONTACT.phones.map((p, i) => (
              <a key={p.tel} href={`tel:${p.tel}`} data-secondary-phone={i > 0 || undefined}><Icon name="phone" size={14} />{p.display}</a>
            ))}
            <a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={14} />{CONTACT.email}</a>
          </div>
        </div>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.brand} aria-label={`${COMPANY.name} home`}>
            <img src="/images/logo-mark.png" alt="" width={44} height={44} className={styles.brandMark} />
            <span className={styles.brandText}>
              <span className={styles.brandName}>Sunita Agri Exports</span>
              <span className={styles.brandSub}>Since {COMPANY.foundingYear} · Mumbai, India</span>
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Main">
            <div className={styles.item}>
              <Link href="/products/" className={`${styles.link} ${isActive('/products') ? styles.active : ''}`}>
                Products <Icon name="chevron-down" size={15} />
              </Link>
              <div className={styles.mega}>
                <div className={styles.megaGrid}>
                  {categories.map((c) => (
                    <Link key={c.slug} href={`/products/${c.slug}/`} className={styles.megaLink}>
                      <img src={c.image} alt="" width={44} height={44} loading="lazy" />
                      <span>
                        <strong>{c.name}</strong>
                        <small>{c.count} products</small>
                      </span>
                    </Link>
                  ))}
                </div>
                <aside className={styles.megaAside}>
                  <p className={styles.megaTitle}>Services</p>
                  {SERVICE_LINKS.map((s) => (
                    <Link key={s.href} href={s.href} className={styles.megaService}>
                      <Icon name={s.icon} size={18} /> {s.label}
                    </Link>
                  ))}
                  <a href="/downloads/sunita-agri-exports-catalogue.pdf" className={`btn btn-outline btn-sm ${styles.megaBtn}`} download>
                    <Icon name="download" /> Download catalogue
                  </a>
                </aside>
              </div>
            </div>

            {TOP_LINKS.map((l) => (
              <div className={styles.item} key={l.href}>
                <Link href={l.href} className={`${styles.link} ${isActive(l.href) ? styles.active : ''}`}>{l.label}</Link>
              </div>
            ))}

            <div className={styles.item}>
              <button type="button" className={`${styles.link} ${COMPANY_LINKS.some((l) => isActive(l.href)) ? styles.active : ''}`}>
                Company <Icon name="chevron-down" size={15} />
              </button>
              <div className={styles.dropdown}>
                {COMPANY_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className={styles.dropLink}>
                    <strong>{l.label}</strong>
                    <small>{l.desc}</small>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.item}>
              <Link href="/contact/" className={`${styles.link} ${isActive('/contact') ? styles.active : ''}`}>Contact</Link>
            </div>
          </nav>

          <div className={styles.actions}>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={styles.waBtn} aria-label="Chat on WhatsApp">
              <Icon name="whatsapp" size={20} />
            </a>
            <Link href="/contact/" className={`btn btn-primary btn-sm ${styles.quoteBtn}`}>
              Get a Quote <Icon name="arrow-right" />
            </Link>
            <button
              type="button"
              className={styles.burger}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Icon name={open ? 'close' : 'menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`} aria-hidden={!open}>
        <nav className={styles.drawerNav} aria-label="Mobile">
          <button type="button" className={styles.drawerLink} onClick={() => setMobileSub(mobileSub === 'products' ? null : 'products')} aria-expanded={mobileSub === 'products'}>
            Products <Icon name="chevron-down" size={18} className={mobileSub === 'products' ? styles.rotate : ''} />
          </button>
          {mobileSub === 'products' && (
            <div className={styles.drawerSub}>
              <Link href="/products/" className={styles.drawerSubLink}><strong>All products</strong></Link>
              {categories.map((c) => (
                <Link key={c.slug} href={`/products/${c.slug}/`} className={styles.drawerSubLink}>
                  <img src={c.image} alt="" width={32} height={32} loading="lazy" /> {c.name}
                </Link>
              ))}
            </div>
          )}
          <Link href="/mixed-container/" className={styles.drawerLink}>Mixed Container</Link>
          <Link href="/fmcg/" className={styles.drawerLink}>Indian FMCG & Grocery</Link>
          <Link href="/private-label/" className={styles.drawerLink}>Private Label</Link>
          <button type="button" className={styles.drawerLink} onClick={() => setMobileSub(mobileSub === 'company' ? null : 'company')} aria-expanded={mobileSub === 'company'}>
            Company <Icon name="chevron-down" size={18} className={mobileSub === 'company' ? styles.rotate : ''} />
          </button>
          {mobileSub === 'company' && (
            <div className={styles.drawerSub}>
              {COMPANY_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={styles.drawerSubLink}>{l.label}</Link>
              ))}
            </div>
          )}
          <Link href="/contact/" className={styles.drawerLink}>Contact</Link>
        </nav>
        <div className={styles.drawerFoot}>
          <Link href="/contact/" className="btn btn-primary btn-block">Get a Quote</Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-block">
            <Icon name="whatsapp" /> WhatsApp us
          </a>
          <div className={styles.drawerContacts}>
            {CONTACT.phones.map((p, i) => (
              <a key={p.tel} href={`tel:${p.tel}`} data-secondary-phone={i > 0 || undefined}><Icon name="phone" size={15} /> {p.display}</a>
            ))}
            <a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={15} /> {CONTACT.email}</a>
          </div>
        </div>
      </div>
    </>
  );
}
