'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/track';
import styles from './Analytics.module.css';

const KEY = 'analytics-consent'; // 'granted' | 'denied'
const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const save = (v) => { try { localStorage.setItem(KEY, v); } catch {} };

function loadGa(id) {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
}

// Taps that matter to an exporter, tracked from anywhere on the site without touching each link.
function onClick(e) {
  const a = e.target.closest?.('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  const where = { page: location.pathname };
  if (/wa\.me|whatsapp\.com/.test(href)) track('whatsapp_click', where);
  else if (href.startsWith('tel:')) track('phone_click', where);
  else if (href.startsWith('mailto:')) track('email_click', where);
  else if (href.includes('/spec-sheets/')) track('spec_sheet_download', { ...where, file: href.split('/').filter(Boolean).pop() });
  else if (href.endsWith('.pdf')) track('brochure_download', { ...where, file: href.split('/').pop() });
}

/** Cookie consent bar + Google Analytics (loaded only after "Accept"). Off on admin pages. */
export default function Analytics({ gaId }) {
  const path = usePathname() || '';
  const admin = path.startsWith('/admin');
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    if (!gaId || admin) return;
    const choice = read();
    if (choice === 'granted') { loadGa(gaId); return; }
    if (choice === 'denied') return;
    // Wait until the "view in your language?" bar is gone so the two never overlap.
    const t = setInterval(() => { if (!document.querySelector('[data-lang-prompt]')) { setAsk(true); clearInterval(t); } }, 1500);
    return () => clearInterval(t);
  }, [gaId, admin]);

  useEffect(() => {
    if (!gaId || admin) return;
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [gaId, admin]);

  if (!ask || admin) return null;
  const answer = (v) => { save(v); setAsk(false); if (v === 'granted') loadGa(gaId); };
  return (
    <div className={`notranslate ${styles.bar}`} translate="no" role="dialog" aria-label="Cookies">
      <p>We use analytics cookies to see which pages buyers find useful. No ads, no selling of data. <a href="/privacy/">Privacy</a></p>
      <div className={styles.actions}>
        <button type="button" className={styles.yes} onClick={() => answer('granted')}>Accept</button>
        <button type="button" className={styles.no} onClick={() => answer('denied')}>Decline</button>
      </div>
    </div>
  );
}
