'use client';

import { useEffect, useState } from 'react';
import styles from './LanguageSwitcher.module.css';

// "View this site in …?" in each language, with its Switch button. Shown once to visitors whose browser
// language is one we offer; never switches on its own, so crawlers and English readers always get English.
const ASK = {
  ar: ['عرض هذا الموقع بالعربية؟', 'تغيير'], fa: ['این سایت را به فارسی ببینید؟', 'تغییر'], iw: ['להציג את האתר בעברית?', 'החלפה'],
  ku: ['Vê malperê bi Kurdî bibînin?', 'Biguherîne'], es: ['¿Ver este sitio en español?', 'Cambiar'], pt: ['Ver este site em português?', 'Mudar'],
  fr: ['Afficher ce site en français ?', 'Changer'], de: ['Diese Seite auf Deutsch anzeigen?', 'Wechseln'], ru: ['Открыть сайт на русском?', 'Перейти'],
  id: ['Lihat situs ini dalam Bahasa Indonesia?', 'Ganti'], tr: ['Bu siteyi Türkçe görüntülemek ister misiniz?', 'Değiştir'],
  ja: ['このサイトを日本語で表示しますか？', '切り替える'], 'zh-CN': ['以中文浏览本网站？', '切换'], ko: ['이 사이트를 한국어로 보시겠습니까?', '전환'],
  ms: ['Lihat laman ini dalam Bahasa Melayu?', 'Tukar'], vi: ['Xem trang này bằng tiếng Việt?', 'Chuyển'], th: ['ดูเว็บไซต์นี้เป็นภาษาไทยไหม?', 'เปลี่ยน'],
  tl: ['Tingnan ang site na ito sa Filipino?', 'Lumipat'], sw: ['Ungependa kuona tovuti hii kwa Kiswahili?', 'Badilisha'],
  nl: ['Deze site in het Nederlands bekijken?', 'Wisselen'], it: ['Vuoi vedere questo sito in italiano?', 'Cambia'],
  hi: ['यह साइट हिन्दी में देखें?', 'बदलें'], ur: ['یہ سائٹ اردو میں دیکھیں؟', 'تبدیل کریں'], bn: ['এই সাইটটি বাংলায় দেখবেন?', 'বদলান'],
  gu: ['આ સાઇટ ગુજરાતીમાં જુઓ?', 'બદલો'], ta: ['இந்தத் தளத்தைத் தமிழில் பார்க்கவா?', 'மாற்று'], pa: ['ਇਹ ਸਾਈਟ ਪੰਜਾਬੀ ਵਿੱਚ ਦੇਖੋ?', 'ਬਦਲੋ'],
};
const ALIAS = { he: 'iw', zh: 'zh-CN', fil: 'tl' };
const KEY = 'lang-prompt-done';
const RTL = new Set(['ar', 'fa', 'iw', 'ur']);

function detect() {
  // ?lang-prompt=ar previews the bar for any language.
  const forced = new URLSearchParams(location.search).get('lang-prompt');
  if (forced) return ASK[forced] ? forced : null;
  if (navigator.webdriver || /bot|crawl|spider|lighthouse/i.test(navigator.userAgent)) return null;
  try { if (localStorage.getItem(KEY)) return null; } catch { return null; }
  for (const tag of navigator.languages || [navigator.language]) {
    const base = tag.toLowerCase().split('-')[0];
    if (base === 'en') return null; // they read English already
    const code = ALIAS[base] || base;
    if (ASK[code]) return code;
  }
  return null;
}

export default function LanguagePrompt({ current, onSwitch }) {
  const [code, setCode] = useState(null);

  useEffect(() => {
    if (current !== 'en') return;
    const t = setTimeout(() => setCode(detect()), 1200); // let the page settle first
    return () => clearTimeout(t);
  }, [current]);

  if (!code) return null;
  const done = () => { try { localStorage.setItem(KEY, '1'); } catch {} };
  const [question, yes] = ASK[code];

  return (
    <div className={`notranslate ${styles.prompt}`} translate="no" role="dialog" aria-label="Language">
      <p lang={code} dir={RTL.has(code) ? 'rtl' : 'ltr'}>{question}</p>
      <div className={styles.promptActions}>
        <button type="button" className={styles.promptYes} lang={code} onClick={() => { done(); onSwitch(code); }}>{yes}</button>
        <button type="button" className={styles.promptNo} onClick={() => { done(); setCode(null); }}>Keep English</button>
      </div>
    </div>
  );
}
