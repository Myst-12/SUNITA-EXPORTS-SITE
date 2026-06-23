'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const categories = [
  { name: 'Indian Spices', slug: 'indian-spices', icon: '🌶️' },
  { name: 'Blended Spices & Masalas', slug: 'blended-spices', icon: '🫙' },
  { name: 'Rice', slug: 'rice', icon: '🍚' },
  { name: 'Pulses & Grains', slug: 'pulses-grains', icon: '🫘' },
  { name: 'Oilseeds', slug: 'oilseeds', icon: '🌻' },
  { name: 'Herbs', slug: 'herbs', icon: '🌿' },
  { name: 'Dehydrated Products', slug: 'dehydrated-products', icon: '🧅' },
  { name: 'Fruits & Vegetables', slug: 'fruits-vegetables', icon: '🍎' },
  { name: 'Foodstuff & FMCG', slug: 'foodstuff-fmcg', icon: '🛒' },
  { name: 'Animal & Bird Feed', slug: 'animal-bird-feed', icon: '🐄' },
  { name: 'Raisins & Dry Fruits', slug: 'raisins-dry-fruits', icon: '🍇' },
];

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileActiveSub, setMobileActiveSub] = useState(null); // 'about' or 'products' or null
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsMobileOpen(false);
    setMobileActiveSub(null);
  }, [pathname]);

  const toggleMobileSub = (menuName) => {
    if (mobileActiveSub === menuName) {
      setMobileActiveSub(null);
    } else {
      setMobileActiveSub(menuName);
    }
  };

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <ul className={styles.topBarContact}>
            <li>
              <span>📞</span>
              <a href="tel:+918169282942">+91 8169282942</a>
            </li>
            <li>
              <span>📞</span>
              <a href="tel:+919004041889">+91 9004041889</a>
            </li>
            <li>
              <span>✉️</span>
              <a href="mailto:sales@sunitaexports.com">sales@sunitaexports.com</a>
            </li>
          </ul>
          <div>
            <span className={styles.topBarTagline}>Est. 1994 • 30+ Years of Excellence</span>
          </div>
        </div>
      </div>

      {/* ===== MAIN NAVIGATION ===== */}
      <header className={`${styles.header} ${isSticky ? styles.headerSticky : ''}`}>
        <div className={`container ${styles.navContainer}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span>SUNITA AGRI EXPORTS</span>
            <span className={styles.logoSub}>Pvt. Ltd. • ISO 22000 & BRC Certified</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <div className={styles.navItem}>
              <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}>
                Home
              </Link>
            </div>

            <div className={styles.navItem}>
              <button className={`${styles.navLink} ${pathname.startsWith('/about') || pathname.startsWith('/why-choose-us') ? styles.navLinkActive : ''}`}>
                About <span>▾</span>
              </button>
              <div className={styles.dropdown}>
                <Link href="/about" className={styles.dropdownLink}>Our Story</Link>
                <Link href="/why-choose-us" className={styles.dropdownLink}>Why Choose Us</Link>
              </div>
            </div>

            <div className={styles.navItem}>
              <Link href="/products" className={`${styles.navLink} ${pathname.startsWith('/products') ? styles.navLinkActive : ''}`}>
                Products <span>▾</span>
              </Link>
              <div className={styles.megaMenu}>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products/${cat.slug}`}
                    className={styles.megaMenuLink}
                  >
                    <span className={styles.megaMenuIcon} aria-hidden="true">{cat.icon}</span>
                    <span className={styles.megaMenuName}>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.navItem}>
              <Link href="/certifications" className={`${styles.navLink} ${pathname === '/certifications/' ? styles.navLinkActive : ''}`}>
                Certifications
              </Link>
            </div>

            <div className={styles.navItem}>
              <Link href="/shipments" className={`${styles.navLink} ${pathname === '/shipments/' ? styles.navLinkActive : ''}`}>
                Shipments
              </Link>
            </div>

            <div className={styles.navItem}>
              <Link href="/b2b-presence" className={`${styles.navLink} ${pathname === '/b2b-presence/' ? styles.navLinkActive : ''}`}>
                B2B Presence
              </Link>
            </div>

            <div className={styles.navItem}>
              <Link href="/contact" className={`${styles.navLink} ${pathname === '/contact/' ? styles.navLinkActive : ''}`}>
                Contact
              </Link>
            </div>
            
            <div className={styles.headerCTA}>
              <Link href="/contact" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                Get a Quote
              </Link>
            </div>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`${styles.hamburger} ${isMobileOpen ? styles.hamburgerActive : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>

          {/* Mobile Navigation Drawer */}
          <div className={`${styles.mobileOverlay} ${isMobileOpen ? styles.mobileOverlayOpen : ''}`}>
            <ul className={styles.mobileNavList}>
              <li>
                <Link href="/" className={styles.mobileNavLink}>Home</Link>
              </li>
              <li>
                <button
                  className={styles.mobileNavLink}
                  onClick={() => toggleMobileSub('about')}
                  style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
                >
                  About <span>{mobileActiveSub === 'about' ? '▴' : '▾'}</span>
                </button>
                {mobileActiveSub === 'about' && (
                  <ul className={styles.mobileSubList}>
                    <li><Link href="/about" className={styles.mobileSubLink}>Our Story</Link></li>
                    <li><Link href="/why-choose-us" className={styles.mobileSubLink}>Why Choose Us</Link></li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  className={styles.mobileNavLink}
                  onClick={() => toggleMobileSub('products')}
                  style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
                >
                  Products <span>{mobileActiveSub === 'products' ? '▴' : '▾'}</span>
                </button>
                {mobileActiveSub === 'products' && (
                  <ul className={styles.mobileSubList}>
                    <li><Link href="/products" className={styles.mobileSubLink}>All Categories</Link></li>
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <Link href={`/products/${cat.slug}`} className={styles.mobileSubLink}>
                          {cat.icon} {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link href="/certifications" className={styles.mobileNavLink}>Certifications</Link>
              </li>
              <li>
                <Link href="/shipments" className={styles.mobileNavLink}>Shipments</Link>
              </li>
              <li>
                <Link href="/b2b-presence" className={styles.mobileNavLink}>B2B Presence</Link>
              </li>
              <li>
                <Link href="/contact" className={styles.mobileNavLink}>Contact</Link>
              </li>
            </ul>
            <div className={styles.mobileCTA}>
              <Link href="/contact" className="btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
