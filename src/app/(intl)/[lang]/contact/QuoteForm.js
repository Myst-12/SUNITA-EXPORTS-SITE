'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { track } from '@/lib/track';
import { WEB3FORMS_KEY } from '@/config/site';
import s from '../intl.module.css';

const makeRef = () => `SX-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

// Short quote form for the translated sections; the email to the team is labelled in English.
export default function QuoteForm({ lang, text }) {
  const F = text.fields;
  const params = useSearchParams();
  const [d, setD] = useState({ name: '', company: '', email: '', phone: '', country: '', products: params?.get('product') || '', port: '', notes: '', website: '' });
  const [status, setStatus] = useState('idle');
  const [ref, setRef] = useState('');
  const set = (e) => setD((v) => ({ ...v, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (d.website) { setStatus('sent'); return; }
    setStatus('sending');
    const reference = ref || makeRef();
    setRef(reference);
    const lines = [['Reference', reference], ['Language', `${lang} site`], ['Name', d.name], ['Company', d.company], ['Email', d.email], ['Phone / WhatsApp', d.phone],
      ['Country', d.country], ['Products', d.products], ['Destination port', d.port], ['Notes', d.notes]];
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Quote request ${reference}] (${lang} site) ${d.products.slice(0, 50)} — ${d.company} (${d.country})`,
          from_name: `Sunita Exports Website (${lang})`,
          name: `${d.name} (${d.company})`, email: d.email, replyto: d.email,
          message: lines.map(([k, v]) => `${k}: ${v || '—'}`).join('\n'),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) { track('generate_lead', { form: `quote_${lang}`, country: d.country }); setStatus('sent'); } else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'sent') return <div className={s.ok} role="status">{text.sent} <span dir="ltr">({ref})</span></div>;

  const input = (name, type = 'text', required = false, extra = {}) => (
    <label>{F[name]}{required && ' *'}<input name={name} type={type} required={required} value={d[name]} onChange={set} {...extra} /></label>
  );

  return (
    <form className={s.form} onSubmit={submit}>
      <div className={s.row}>{input('name', 'text', true, { autoComplete: 'name' })}{input('company', 'text', true, { autoComplete: 'organization' })}</div>
      <div className={s.row}>{input('email', 'email', true, { autoComplete: 'email', dir: 'ltr' })}{input('phone', 'tel', false, { autoComplete: 'tel', dir: 'ltr' })}</div>
      <div className={s.row}>{input('country', 'text', true)}{input('port')}</div>
      <label>{F.products} *<textarea name="products" rows={4} required value={d.products} onChange={set} placeholder={F.productsHint} /></label>
      <label>{F.notes}<textarea name="notes" rows={3} value={d.notes} onChange={set} /></label>
      <div className={s.hp} aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" value={d.website} onChange={set} /></div>
      {status === 'error' && <p className={s.err} role="alert">{text.error}</p>}
      <div><button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>{status === 'sending' ? text.sending : text.send}</button></div>
      <p className={s.note}>{text.privacy}</p>
    </form>
  );
}
