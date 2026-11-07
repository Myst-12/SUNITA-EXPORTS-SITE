'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import LanguagePrompt from './LanguagePrompt';
import { track } from '@/lib/track';
import { hrefFor } from '@/lib/langLinks';
import styles from './LanguageSwitcher.module.css';

// The site's own translated sections (no machine translation). `langPaths` maps each English path that has
// translations to its language codes; any other page offers the language's home page instead.
export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ru', label: 'Русский' },
];

// Clears the cookie the old Google Translate switcher left behind, on every domain level it may have used.
function clearOldTranslateCookie() {
  if (!/googtrans=/.test(document.cookie)) return;
  const parts = location.hostname.split('.');
  const expiry = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = `googtrans=; ${expiry}`;
  for (let i = 0; i < parts.length - 1; i++) {
    const d = parts.slice(i).join('.');
    document.cookie = `googtrans=; ${expiry}; domain=${d}`;
    document.cookie = `googtrans=; ${expiry}; domain=.${d}`;
  }
}

export default function LanguageSwitcher({ langPaths = {} }) {
  const path = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    clearOldTranslateCookie();
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <div ref={ref} className={styles.wrap}>
      <button type="button" className={styles.toggle} onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Change language" title="Change language">
        <Icon name="globe" size={16} />
        <span className={styles.full}>English</span>
        <span className={styles.short}>EN</span>
        <Icon name="chevron-down" size={14} className={`${styles.chev} ${open ? styles.chevOpen : ''}`} />
      </button>
      {open && (
        <ul className={styles.menu} aria-label="Choose language">
          <li className={styles.menuHead}>Language · اللغة · Langue · Idioma</li>
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              {l.code === 'en'
                ? <span className={`${styles.option} ${styles.current}`} aria-current="true">{l.label}</span>
                : <a href={hrefFor(l.code, path, langPaths)} hrefLang={l.code} lang={l.code} className={styles.option}
                    onClick={() => track('language_change', { language: l.code })}>{l.label}</a>}
            </li>
          ))}
        </ul>
      )}
      <LanguagePrompt path={path} langPaths={langPaths} />
    </div>
  );
}
