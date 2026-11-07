'use client';

import { useEffect, useState } from 'react';
import styles from './LanguageSwitcher.module.css';
import { hrefFor } from '@/lib/langLinks';

// "View this site in …?" in each language, with its Switch button. Shown once to visitors whose browser
// language is one we offer; never switches on its own, so crawlers and English readers always get English.
const ASK = {
  ar: ['عرض هذه الصفحة بالعربية؟', 'نعم'], fr: ['Voir ce site en français ?', 'Oui'], es: ['¿Ver este sitio en español?', 'Sí'],
  de: ['Diese Seite auf Deutsch ansehen?', 'Ja'], ru: ['Открыть сайт на русском?', 'Да'],
};
const KEY = 'lang-prompt-done';
const RTL = new Set(['ar']);

function detect() {
  // ?lang-prompt=ar previews the bar for any language.
  const forced = new URLSearchParams(location.search).get('lang-prompt');
  if (forced) return ASK[forced] ? forced : null;
  if (navigator.webdriver || /bot|crawl|spider|lighthouse/i.test(navigator.userAgent)) return null;
  try { if (localStorage.getItem(KEY)) return null; } catch { return null; }
  for (const tag of navigator.languages || [navigator.language]) {
    const base = tag.toLowerCase().split('-')[0];
    if (base === 'en') return null; // they read English already
    const code = base;
    if (ASK[code]) return code;
  }
  return null;
}

export default function LanguagePrompt({ path, langPaths }) {
  const [code, setCode] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setCode(detect()), 1200); // let the page settle first
    return () => clearTimeout(t);
  }, []);

  if (!code) return null;
  const done = () => { try { localStorage.setItem(KEY, '1'); } catch {} };
  const [question, yes] = ASK[code];

  return (
    <div data-lang-prompt className={`notranslate ${styles.prompt}`} translate="no" role="dialog" aria-label="Language">
      <p lang={code} dir={RTL.has(code) ? 'rtl' : 'ltr'}>{question}</p>
      <div className={styles.promptActions}>
        <a href={hrefFor(code, path, langPaths)} hrefLang={code} className={styles.promptYes} lang={code} onClick={done}>{yes}</a>
        <button type="button" className={styles.promptNo} onClick={() => { done(); setCode(null); }}>Keep English</button>
      </div>
    </div>
  );
}
