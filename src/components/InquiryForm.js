'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Icon from './Icon';
import { CONTACT, WEB3FORMS_KEY, whatsappLink } from '@/config/site';
import styles from './InquiryForm.module.css';

const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'New Zealand', 'United Arab Emirates', 'Saudi Arabia',
  'Kuwait', 'Oman', 'Qatar', 'Bahrain', 'Singapore', 'Malaysia', 'Japan', 'Turkey', 'Uganda', 'Kenya', 'Tanzania',
  'South Africa', 'Nigeria', 'Ghana', 'Mauritius', 'Germany', 'Netherlands', 'France', 'Italy', 'Spain', 'Egypt', 'Other',
];
const BUYER_TYPES = ['Importer / Distributor', 'Supermarket / Retail chain', 'Wholesaler / Cash & carry', 'Food manufacturer', 'Restaurant / HoReCa', 'Trader / Agent', 'Other'];
const PACKING = ['Bulk (25–50 kg)', 'Retail packs', 'Private label', 'Mixed container', 'Not sure yet'];
const TERMS = ['FOB Nhava Sheva', 'CFR', 'CIF', 'Not sure'];

const EMPTY = { name: '', company: '', email: '', phone: '', country: '', buyerType: '', productInterest: '', estimatedQuantity: '', packaging: '', incoterm: '', port: '', message: '', website: '' };

export default function InquiryForm() {
  const params = useSearchParams();
  const [data, setData] = useState({ ...EMPTY, productInterest: params?.get('product') || '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const set = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  const pick = (name, value) => setData((d) => ({ ...d, [name]: d[name] === value ? '' : value }));

  const submit = async (e) => {
    e.preventDefault();
    if (data.website) { setStatus('sent'); return; } // honeypot: bots fill hidden fields
    setStatus('sending');
    setError('');
    const fields = [
      ['Name', data.name], ['Company', data.company], ['Email', data.email], ['Phone / WhatsApp', data.phone],
      ['Country', data.country], ['Business type', data.buyerType], ['Products', data.productInterest],
      ['Quantity', data.estimatedQuantity], ['Packing', data.packaging], ['Price terms', data.incoterm],
      ['Destination port', data.port], ['Notes', data.message],
    ];
    try {
      // Sent from the browser: Web3Forms' free plan rejects server-side submissions.
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Quote request] ${data.productInterest.slice(0, 60)} — ${data.company} (${data.country})`,
          from_name: 'Sunita Exports Website',
          name: `${data.name} (${data.company})`,
          email: data.email,
          replyto: data.email,
          message: fields.map(([k, v]) => `${k}: ${v || '—'}`).join('\n'),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setStatus('sent');
      } else {
        setStatus('error');
        setError(json.message || 'Could not send your enquiry. Please try WhatsApp or email.');
      }
    } catch {
      setStatus('error');
      setError('Network error. Please check your connection, or contact us on WhatsApp.');
    }
  };

  const waSummary = `Hello Sunita Agri Exports, I'd like a quote.\nName: ${data.name}\nCompany: ${data.company}\nCountry: ${data.country}\nProducts: ${data.productInterest}\nQuantity: ${data.estimatedQuantity}\n${data.message}`;

  if (status === 'sent') {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}><Icon name="check" size={28} /></span>
        <h2>Thank you — enquiry received</h2>
        <p>Our export team will reply to <strong>{data.email}</strong> within 24 hours (Mon–Sat). For anything urgent, message us on WhatsApp.</p>
        <div className="btn-row">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" /> WhatsApp {CONTACT.quotePhone.display}</a>
          <button type="button" className="btn btn-outline" onClick={() => { setData(EMPTY); setStatus('idle'); }}>Send another enquiry</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={styles.form} noValidate={false}>
      <fieldset className={styles.group}>
        <legend>1 · What do you need?</legend>
        <div className="field">
          <label htmlFor="productInterest">Products *</label>
          <textarea id="productInterest" name="productInterest" rows={3} required value={data.productInterest} onChange={set}
            placeholder="e.g. Turmeric fingers (Salem), Cumin 99.5%, 1121 Basmati sella, Toor dal — or paste your full list" />
        </div>
        <div className={styles.row}>
          <div className="field">
            <label htmlFor="estimatedQuantity">Quantity</label>
            <input id="estimatedQuantity" name="estimatedQuantity" value={data.estimatedQuantity} onChange={set} placeholder="e.g. 1 × 20 ft FCL, 5 MT each" />
          </div>
          <div className="field">
            <label htmlFor="port">Destination port</label>
            <input id="port" name="port" value={data.port} onChange={set} placeholder="e.g. Jebel Ali, New York, Mombasa" />
          </div>
        </div>
        <div className="field">
          <span className={styles.pillLabel}>Packing</span>
          <div className={styles.pills}>
            {PACKING.map((p) => (
              <button key={p} type="button" className={data.packaging === p ? styles.pillOn : ''} aria-pressed={data.packaging === p} onClick={() => pick('packaging', p)}>{p}</button>
            ))}
          </div>
        </div>
        <div className="field">
          <span className={styles.pillLabel}>Price terms</span>
          <div className={styles.pills}>
            {TERMS.map((t) => (
              <button key={t} type="button" className={data.incoterm === t ? styles.pillOn : ''} aria-pressed={data.incoterm === t} onClick={() => pick('incoterm', t)}>{t}</button>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend>2 · About you</legend>
        <div className={styles.row}>
          <div className="field">
            <label htmlFor="name">Your name *</label>
            <input id="name" name="name" required autoComplete="name" value={data.name} onChange={set} />
          </div>
          <div className="field">
            <label htmlFor="company">Company *</label>
            <input id="company" name="company" required autoComplete="organization" value={data.company} onChange={set} />
          </div>
        </div>
        <div className={styles.row}>
          <div className="field">
            <label htmlFor="email">Business email *</label>
            <input id="email" name="email" type="email" required autoComplete="email" value={data.email} onChange={set} />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone / WhatsApp</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" value={data.phone} onChange={set} placeholder="+1 555 000 0000" />
          </div>
        </div>
        <div className={styles.row}>
          <div className="field">
            <label htmlFor="country">Country *</label>
            <select id="country" name="country" required value={data.country} onChange={set}>
              <option value="">Select country</option>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="buyerType">Business type</label>
            <select id="buyerType" name="buyerType" value={data.buyerType} onChange={set}>
              <option value="">Select</option>
              {BUYER_TYPES.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="message">Specifications or notes</label>
          <textarea id="message" name="message" rows={4} value={data.message} onChange={set}
            placeholder="Grades, purity, pack sizes, labelling, certificates or sterilisation needed…" />
        </div>
        {/* Honeypot for bots */}
        <div className={styles.hp} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={set} />
        </div>
      </fieldset>

      {status === 'error' && (
        <div className={styles.error} role="alert">
          <p>{error}</p>
          <a href={whatsappLink(waSummary)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm"><Icon name="whatsapp" /> Send this on WhatsApp</a>
        </div>
      )}

      <div className={styles.submitRow}>
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : <>Send enquiry <Icon name="arrow-right" /></>}
        </button>
        <p className={styles.privacy}>We reply within 24 hours. Your details are used only to answer this enquiry. See our <a href="/privacy/" className="text-green">privacy policy</a>.</p>
      </div>
    </form>
  );
}
