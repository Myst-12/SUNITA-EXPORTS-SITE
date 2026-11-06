'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Icon from './Icon';
import { whatsappLink, CONTACT } from '@/config/site';
import { categoryList } from '@/data/catalog/categories';
import { track } from '@/lib/track';
import styles from './WhatsAppButton.module.css';

const DIRECT = 'Hello Sunita Agri Exports, I am interested in importing from India. Please share your catalogue and a quotation.';
const SAVE_KEY = 'sx_wa_enquiry_v1';
const PRODUCTS = categoryList.map((c) => c.name);
const PACKING = ['Bulk bags (25 / 50 kg)', 'Jute bags', 'Retail consumer packs', 'Private label (my brand)', 'Cartons', 'Not sure yet'];

// Every field is optional; the message lists only what the buyer filled in.
const FIELDS = [
  { name: 'name', label: 'Your name', auto: 'name', placeholder: 'e.g. Ahmed Khan' },
  { name: 'company', label: 'Company', auto: 'organization', placeholder: 'e.g. Al Noor Trading' },
  { name: 'country', label: 'Country', auto: 'country-name', placeholder: 'e.g. UAE' },
  { name: 'port', label: 'Destination port', placeholder: 'e.g. Jebel Ali' },
  { name: 'product', label: 'Product interested in', list: 'products', placeholder: 'e.g. Turmeric powder', wide: true },
  { name: 'packing', label: 'Packing', list: 'packing', placeholder: 'e.g. 25 kg bags' },
  { name: 'quantity', label: 'Quantity', placeholder: 'e.g. 20 ft container' },
];

// `base` is the message of the link that was clicked (a product page asks about that product); the details go under it.
function buildMessage(v, base = DIRECT) {
  const lines = FIELDS.filter((f) => v[f.name]?.trim()).map((f) => `${f.label.replace('Your name', 'Name')}: ${v[f.name].trim()}`);
  if (!lines.length) return base;
  if (base !== DIRECT) return `${base}\n\n${lines.join('\n')}`;
  return `Hello Sunita Agri Exports, I would like a quotation.\n\n${lines.join('\n')}\n\nPlease share your best price and availability.`;
}

// Text of a wa.me link to our sales number, or null for any other link (a buyer's number in admin, the channel).
function ourWhatsAppText(a) {
  try {
    const u = new URL(a.href);
    if (!/^(wa\.me|api\.whatsapp\.com)$/.test(u.hostname)) return null;
    const phone = u.hostname === 'wa.me' ? u.pathname.slice(1) : u.searchParams.get('phone');
    if (phone?.replace(/\D/g, '') !== CONTACT.whatsapp) return null;
    const text = u.searchParams.get('text')?.trim();
    return !text || text === CONTACT.whatsappMessage ? DIRECT : text; // the site-wide default ends in "for", so use the full greeting
  } catch { return null; }
}

const load = () => { try { return JSON.parse(localStorage.getItem(SAVE_KEY)) || {}; } catch { return {}; } };
const save = (v) => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(v)); } catch {} };

/** WhatsApp button: opens a short, optional enquiry form so the first message already carries the buyer's details. */
export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [values, setValues] = useState({});
  const [base, setBase] = useState(DIRECT);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const firstRef = useRef(null);
  const id = useId();

  const show = (text = DIRECT) => {
    setBase(text);
    setValues(load());
    setClosing(false); setOpen(true);
    track('whatsapp_open');
    window.dispatchEvent(new CustomEvent('sx:panel', { detail: 'whatsapp' }));
  };
  const close = (refocus = true) => { setClosing(true); if (refocus) buttonRef.current?.focus(); };
  const toggle = () => (open && !closing ? close() : show());

  // Every WhatsApp link on the site (header, contact page, product pages…) opens this form first.
  const showRef = useRef(show);
  showRef.current = show;
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href]');
      if (!a || panelRef.current?.contains(a)) return;
      const text = ourWhatsAppText(a);
      if (text === null) return;
      e.preventDefault();
      showRef.current(text);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    firstRef.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === 'Escape' && close();
    const onOther = (e) => e.detail !== 'whatsapp' && close(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('sx:panel', onOther);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('sx:panel', onOther); };
  }, [open]);

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(() => { setOpen(false); setClosing(false); }, 400);
    return () => clearTimeout(t);
  }, [closing]);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const filled = FIELDS.some((f) => values[f.name]?.trim());

  const send = (e) => {
    e.preventDefault();
    save(values);
    track('whatsapp_send', { filled });
    window.open(whatsappLink(buildMessage(values, base)), '_blank', 'noopener,noreferrer');
    close();
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.fab}
        data-fab
        onClick={toggle}
        aria-expanded={open && !closing}
        aria-controls={open ? id : undefined}
        aria-label="Chat with us on WhatsApp"
      >
        <span className={styles.icons} data-open={open && !closing ? '' : undefined}>
          <Icon name="whatsapp" size={28} className={styles.iconWa} />
          <Icon name="close" size={24} className={styles.iconClose} />
        </span>
        <span className={styles.label}>Chat with us</span>
      </button>

      {open && (
        <div
          id={id}
          ref={panelRef}
          role="dialog"
          aria-labelledby={`${id}-t`}
          className={`${styles.panel} ${closing ? styles.panelOut : ''}`}
          onAnimationEnd={(e) => { if (e.target === e.currentTarget && closing) { setOpen(false); setClosing(false); } }}
        >
          <div className={styles.head}>
            <span className={styles.avatar}><Icon name="whatsapp" size={22} /></span>
            <div>
              <p id={`${id}-t`} className={styles.title}>Get a quotation on WhatsApp</p>
              <p className={styles.sub}>Sales team · usually replies within a few hours</p>
            </div>
            <button type="button" className={styles.close} onClick={() => close()} aria-label="Close">
              <Icon name="close" size={20} />
            </button>
          </div>

          <form className={styles.form} onSubmit={send}>
            <p className={styles.intro}>Share a few details so we can quote faster. <b>Every field is optional.</b></p>
            <div className={styles.grid}>
              {FIELDS.map((f, i) => (
                <div key={f.name} className={`${styles.field} ${f.wide ? styles.wide : ''}`}>
                  <label htmlFor={`${id}-${f.name}`}>{f.label}</label>
                  <input
                    ref={i === 0 ? firstRef : undefined}
                    id={`${id}-${f.name}`}
                    name={f.name}
                    value={values[f.name] || ''}
                    onChange={set(f.name)}
                    autoComplete={f.auto || 'off'}
                    list={f.list ? `${id}-${f.list}` : undefined}
                    placeholder={f.placeholder}
                    maxLength={120}
                    dir="auto"
                  />
                </div>
              ))}
            </div>
            <datalist id={`${id}-products`}>{PRODUCTS.map((p) => <option key={p} value={p} />)}</datalist>
            <datalist id={`${id}-packing`}>{PACKING.map((p) => <option key={p} value={p} />)}</datalist>

            <button type="submit" className={styles.send}>
              <Icon name="whatsapp" size={20} /> {filled ? 'Send enquiry on WhatsApp' : 'Open WhatsApp'}
            </button>
            <a
              className={styles.direct}
              href={whatsappLink(base)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { track('whatsapp_direct'); close(); }}
            >
              Skip and message us directly <Icon name="arrow-right" size={16} />
            </a>
            <p className={styles.note}>Opens WhatsApp with {CONTACT.whatsappDisplay}. Nothing is sent until you press send there.</p>
          </form>
        </div>
      )}
    </>
  );
}
