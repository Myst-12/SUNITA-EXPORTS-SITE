'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Icon from './Icon';
import LanguagePrompt from './LanguagePrompt';
import { track } from '@/lib/track';
import styles from './LanguageSwitcher.module.css';

// Interim machine translation via the Google Translate widget, until real translated pages (Phase 3) replace it.
export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'fa', label: 'فارسی' },
  { code: 'iw', label: 'עברית' },
  { code: 'ku', label: 'Kurdî' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ru', label: 'Русский' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'ja', label: '日本語' },
  { code: 'zh-CN', label: '中文' },
  { code: 'ko', label: '한국어' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'th', label: 'ไทย' },
  { code: 'tl', label: 'Filipino' },
  { code: 'sw', label: 'Kiswahili' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'it', label: 'Italiano' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ur', label: 'اردو' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
];

const readLang = () => {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([a-z-]+)/i);
  return m ? m[1] : 'en';
};

// Google Translate may store its cookie on the bare host or any parent domain (e.g. .sunitaexports.com when
// the site is on www.), so clear/set it on every level — otherwise "back to English" silently fails.
const writeCookie = (value) => {
  const parts = location.hostname.split('.');
  const domains = [''];
  for (let i = 0; i < parts.length - 1; i++) {
    const d = parts.slice(i).join('.');
    domains.push(`; domain=${d}`, `; domain=.${d}`);
  }
  const expiry = '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  for (const domain of domains) document.cookie = `googtrans=${expiry}; path=/${domain}`;
  if (value) {
    document.cookie = `googtrans=${value}; path=/`;
    if (parts.length > 1) document.cookie = `googtrans=${value}; path=/; domain=.${parts.slice(-2).join('.')}`;
  }
};

// Google's script is only loaded when a non-English language is chosen, so English visitors pay nothing.
function loadGoogle() {
  if (window.google?.translate || document.getElementById('gt-script')) return;
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: LANGUAGES.slice(1).map((l) => l.code).join(','), autoDisplay: false },
      'google_translate_element'
    );
  };
  const s = document.createElement('script');
  s.id = 'gt-script';
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(s);
}

export default function LanguageSwitcher() {
  // The cookie only changes with a full reload, so there is nothing to subscribe to; the server always renders English.
  const lang = useSyncExternalStore(() => () => {}, readLang, () => 'en');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (readLang() !== 'en') loadGoogle();
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const choose = (code) => {
    setOpen(false);
    if (code === lang) return;
    track('language_change', { language: code });
    writeCookie(code === 'en' ? '' : `/en/${code}`);
    location.reload();
  };

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  const list = (
    <ul className={styles.menu} role="listbox" aria-label="Choose language">
      <li className={styles.menuHead}>Language · Idioma · اللغة · Langue</li>
      {LANGUAGES.map((l) => (
        <li key={l.code}>
          <button type="button" role="option" aria-selected={l.code === lang} lang={l.code}
            className={`${styles.option} ${l.code === lang ? styles.current : ''}`} onClick={() => choose(l.code)}>
            {l.label}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={ref} className={`notranslate ${styles.wrap}`} translate="no">
      <button type="button" className={styles.toggle} onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Change language" title="Change language">
        <Icon name="globe" size={16} />
        <span className={styles.full}>{current.label}</span>
        <span className={styles.short}>{lang.split('-')[0].toUpperCase()}</span>
        <Icon name="chevron-down" size={14} className={`${styles.chev} ${open ? styles.chevOpen : ''}`} />
      </button>
      {open && list}
      <LanguagePrompt current={lang} onSwitch={choose} />
      <div id="google_translate_element" hidden />
    </div>
  );
}
