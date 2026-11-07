'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Icon from './Icon';
import { track } from '@/lib/track';
import { useBasket, clearBasket } from '@/lib/enquiryBasket';
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

const COURIER = ['We will pay the courier', 'Please quote the courier'];
const MODES = [['quote', 'Price quote'], ['sample', 'Sample request']];

const EMPTY = { name: '', company: '', email: '', phone: '', country: '', buyerType: '', estimatedQuantity: '', packaging: '', incoterm: '', courier: '', port: '', message: '', website: '' };
const LINE = { product: '', qty: '' };

// Short reference the buyer can quote back: SX-YYMMDD-XXXX.
const makeRef = () => `SX-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

export default function InquiryForm({ product = '' }) {
  const params = useSearchParams();
  const [mode, setMode] = useState(params?.get('type') === 'sample' ? 'sample' : 'quote');
  const [data, setData] = useState(EMPTY);
  const [lines, setLines] = useState([{ ...LINE, product: params?.get('product') || product }]);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [ref, setRef] = useState('');
  const sample = mode === 'sample';
  // On the quote page, products collected with "Add to quote list" fill the product lines (once).
  const basket = useBasket();
  const fromBasket = useRef(false);
  useEffect(() => {
    if (product || fromBasket.current || !basket.ready || !basket.items.length) return;
    fromBasket.current = true;
    setLines((ls) => {
      const kept = ls.filter((l) => l.product.trim());
      const have = new Set(kept.map((l) => l.product.toLowerCase()));
      return [...kept, ...basket.items.filter((i) => !have.has(i.name.toLowerCase())).map((i) => ({ ...LINE, product: i.name }))];
    });
  }, [product, basket.ready, basket.items]);

  const set = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  const pick = (name, value) => setData((d) => ({ ...d, [name]: d[name] === value ? '' : value }));
  const setLine = (i, k, v) => setLines((ls) => ls.map((l, j) => (j === i ? { ...l, [k]: v } : l)));
  const filled = lines.filter((l) => l.product.trim());
  const productList = filled.map((l) => (l.qty ? `${l.product} (${l.qty})` : l.product)).join('; ');

  const submit = async (e) => {
    e.preventDefault();
    if (data.website) { setStatus('sent'); return; } // honeypot: bots fill hidden fields
    setStatus('sending');
    setError('');
    const reference = ref || makeRef();
    setRef(reference);
    const fields = [
      ['Reference', reference], ['Request', sample ? 'Sample request' : 'Price quote'],
      ['Name', data.name], ['Company', data.company], ['Email', data.email], ['Phone / WhatsApp', data.phone],
      ['Country', data.country], ['Business type', data.buyerType],
      ['Products', filled.map((l, i) => `\n  ${i + 1}. ${l.product}${l.qty ? ` — ${l.qty}` : ''}`).join('')],
      ['Total quantity', data.estimatedQuantity], ['Packing', data.packaging],
      sample ? ['Courier', data.courier] : ['Price terms', data.incoterm],
      [sample ? 'Courier address (city, country)' : 'Destination port', data.port], ['Notes', data.message],
    ];
    try {
      // Sent from the browser: Web3Forms' free plan rejects server-side submissions.
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[${sample ? 'Sample request' : 'Quote request'} ${reference}] ${productList.slice(0, 60)} — ${data.company} (${data.country})`,
          from_name: 'Sunita Exports Website',
          name: `${data.name} (${data.company})`,
          email: data.email,
          replyto: data.email,
          message: fields.map(([k, v]) => `${k}: ${v || '—'}`).join('\n'),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        track('generate_lead', { form: mode, country: data.country, products: productList.slice(0, 100) });
        if (fromBasket.current) clearBasket();
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

  const waSummary = `Hello Sunita Agri Exports, I'd like ${sample ? 'a sample' : 'a quote'}${ref ? ` (ref ${ref})` : ''}.\nName: ${data.name}\nCompany: ${data.company}\nCountry: ${data.country}\nProducts: ${productList}\nQuantity: ${data.estimatedQuantity}\n${data.message}`;

  if (status === 'sent') {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}><Icon name="check" size={28} /></span>
        <h2>Thank you — {sample ? 'sample request' : 'enquiry'} received</h2>
        {ref && <p>Your reference: <strong>{ref}</strong>. Please quote it in any reply.</p>}
        <p>Our export team will reply to <strong>{data.email}</strong> within 24 hours (Mon–Sat). For anything urgent, message us on WhatsApp.</p>
        <div className="btn-row">
          <a href={whatsappLink(`Hello, following up on ${ref}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" /> WhatsApp {CONTACT.quotePhone.display}</a>
          <button type="button" className="btn btn-outline" onClick={() => { setData(EMPTY); setLines([{ ...LINE }]); setRef(''); setStatus('idle'); }}>Send another enquiry</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={styles.form} noValidate={false}>
      <div className={styles.modes} role="radiogroup" aria-label="Type of request">
        {MODES.map(([k, label]) => (
          <button key={k} type="button" role="radio" aria-checked={mode === k} className={mode === k ? styles.modeOn : ''} onClick={() => setMode(k)}>{label}</button>
        ))}
      </div>

      <fieldset className={styles.group}>
        <legend>1 · {sample ? 'Which samples?' : 'What do you need?'}</legend>
        <div className={styles.lines}>
          {lines.map((l, i) => (
            <div key={i} className={styles.line}>
              <div className="field">
                <label htmlFor={`product-${i}`}>{i === 0 ? 'Product *' : `Product ${i + 1}`}</label>
                <input id={`product-${i}`} required={i === 0} value={l.product} onChange={(e) => setLine(i, 'product', e.target.value)}
                  placeholder={i === 0 ? 'e.g. Cumin seeds 99.5%' : 'e.g. Turmeric powder'} />
              </div>
              <div className="field">
                <label htmlFor={`qty-${i}`}>{sample ? 'Sample size' : 'Quantity'}</label>
                <input id={`qty-${i}`} value={l.qty} onChange={(e) => setLine(i, 'qty', e.target.value)} placeholder={sample ? 'e.g. 500 g' : 'e.g. 5 MT'} />
              </div>
              {lines.length > 1 && (
                <button type="button" className={styles.lineRemove} aria-label={`Remove product ${i + 1}`} onClick={() => { const gone = basket.items.find((b) => b.name === l.product); if (gone) basket.remove(gone.slug); setLines((ls) => ls.filter((_, j) => j !== i)); }}>×</button>
              )}
            </div>
          ))}
          {lines.length < 15 && (
            <button type="button" className={styles.lineAdd} onClick={() => setLines((ls) => [...ls, { ...LINE }])}>+ Add another product</button>
          )}
        </div>
        <div className={styles.row}>
          {!sample && (
            <div className="field">
              <label htmlFor="estimatedQuantity">Total / container</label>
              <input id="estimatedQuantity" name="estimatedQuantity" value={data.estimatedQuantity} onChange={set} placeholder="e.g. 1 × 20 ft mixed container" />
            </div>
          )}
          <div className="field">
            <label htmlFor="port">{sample ? 'Courier to (city, country)' : 'Destination port'}</label>
            <input id="port" name="port" value={data.port} onChange={set} placeholder={sample ? 'e.g. Dubai, UAE' : 'e.g. Jebel Ali, New York, Mombasa'} />
          </div>
        </div>
        {sample && (
          <div className="field">
            <span className={styles.pillLabel}>Courier</span>
            <div className={styles.pills}>
              {COURIER.map((c) => (
                <button key={c} type="button" className={data.courier === c ? styles.pillOn : ''} aria-pressed={data.courier === c} onClick={() => pick('courier', c)}>{c}</button>
              ))}
            </div>
          </div>
        )}
        <div className="field">
          <span className={styles.pillLabel}>Packing</span>
          <div className={styles.pills}>
            {PACKING.map((p) => (
              <button key={p} type="button" className={data.packaging === p ? styles.pillOn : ''} aria-pressed={data.packaging === p} onClick={() => pick('packaging', p)}>{p}</button>
            ))}
          </div>
        </div>
        {!sample && <div className="field">
          <span className={styles.pillLabel}>Price terms</span>
          <div className={styles.pills}>
            {TERMS.map((t) => (
              <button key={t} type="button" className={data.incoterm === t ? styles.pillOn : ''} aria-pressed={data.incoterm === t} onClick={() => pick('incoterm', t)}>{t}</button>
            ))}
          </div>
        </div>}
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
          {status === 'sending' ? 'Sending…' : <>{sample ? 'Request samples' : 'Send enquiry'} <Icon name="arrow-right" /></>}
        </button>
        <p className={styles.privacy}>We reply within 24 hours. Your details are used only to answer this enquiry. See our <a href="/privacy/" className="text-green">privacy policy</a>.</p>
      </div>
    </form>
  );
}
