'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import LanguageSwitcher from './LanguageSwitcher';
import { CONTACT, COMPANY, whatsappLink } from '@/config/site';
import styles from './Header.module.css';

const ABOUT_LINKS = [
  { label: 'About us', href: '/about/' },
  { label: 'Quality & certifications', href: '/certifications/' },
  { label: 'Export markets', href: '/exports/' },
  { label: 'Indian FMCG', href: '/fmcg/' },
  { label: 'Buyer guides', href: '/knowledge/' },
  { label: 'FAQ', href: '/faq/' },
];

const LINKS = [
  { label: 'Mixed Container', href: '/mixed-container/' },
  { label: 'Private Label', href: '/private-label/' },
];

export default function Header({ categories = [] }) {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const onHero = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
  const products = categories.filter((c) => !c.service);
  const clear = onHero && !scrolled && !open;
  const headerClass = [styles.header, onHero && styles.overlay, clear && styles.clear, scrolled && styles.scrolled].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.brand} aria-label={`${COMPANY.name} home`}>
            <img src="/images/logo-mark.png" alt="" width={40} height={40} className={styles.brandMark} />
            <span className={styles.brandText}>
              <span className={`${styles.brandName} notranslate`} translate="no">Sunita Agri Exports</span>
              <span className={styles.brandTag}>Govt. Recognised Star Export House</span>
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Main">
            <div className={styles.item}>
              <Link href="/products/" className={`${styles.link} ${isActive('/products') ? styles.active : ''}`}>
                Products <Icon name="chevron-down" size={14} />
              </Link>
              <div className={`${styles.dropdown} ${styles.dropWide}`}>
                {products.map((c) => (
                  <Link key={c.slug} href={c.href} className={styles.dropLink}>{c.name}</Link>
                ))}
                <Link href="/products/" className={`${styles.dropLink} ${styles.dropAll}`}>All products <Icon name="arrow-right" size={14} /></Link>
              </div>
            </div>

            {LINKS.map((l) => (
              <div className={styles.item} key={l.href}>
                <Link href={l.href} className={`${styles.link} ${isActive(l.href) ? styles.active : ''}`}>{l.label}</Link>
              </div>
            ))}

            <div className={styles.item}>
              <button type="button" className={`${styles.link} ${ABOUT_LINKS.some((l) => isActive(l.href)) ? styles.active : ''}`}>
                Company <Icon name="chevron-down" size={14} />
              </button>
              <div className={styles.dropdown}>
                {ABOUT_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className={styles.dropLink}>{l.label}</Link>
                ))}
              </div>
            </div>
          </nav>

          <div className={styles.actions}>
            <span className={styles.lang}><LanguageSwitcher /></span>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={styles.waBtn} aria-label="Chat on WhatsApp">
              <Icon name="whatsapp" size={19} />
            </a>
            <Link href="/contact/" className={`btn btn-sm ${clear ? 'btn-light' : 'btn-primary'} ${styles.quoteBtn}`}>
              Get a Quote
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
              {products.map((c) => (
                <Link key={c.slug} href={c.href} className={styles.drawerSubLink}>{c.name}</Link>
              ))}
            </div>
          )}
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={styles.drawerLink}>{l.label}</Link>
          ))}
          <button type="button" className={styles.drawerLink} onClick={() => setMobileSub(mobileSub === 'company' ? null : 'company')} aria-expanded={mobileSub === 'company'}>
            Company <Icon name="chevron-down" size={18} className={mobileSub === 'company' ? styles.rotate : ''} />
          </button>
          {mobileSub === 'company' && (
            <div className={styles.drawerSub}>
              {ABOUT_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={styles.drawerSubLink}>{l.label}</Link>
              ))}
            </div>
          )}
          <Link href="/contact/" className={styles.drawerLink}>Contact</Link>
        </nav>
        <div className={styles.drawerFoot}>
          <Link href="/contact/" className="btn btn-primary btn-block">Get a Quote</Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-block">
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
