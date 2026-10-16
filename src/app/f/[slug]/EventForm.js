'use client';

import { useState } from 'react';
import { whatsappLink, CONTACT } from '@/config/site';
import s from './event.module.css';

// Phone-friendly keyboard and autofill hints per field type.
const HINTS = {
  email: { inputMode: 'email', autoCapitalize: 'off', autoCorrect: 'off', spellCheck: false },
  tel: { inputMode: 'tel' },
  url: { inputMode: 'url', autoCapitalize: 'off', autoCorrect: 'off', spellCheck: false },
  text: { autoCapitalize: 'words' },
};

export default function EventForm({ slug, fields }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    if (fd.get('_hp')) { setStatus('sent'); return; } // bots fill hidden fields
    setStatus('sending');
    setError('');
    try {
      const res = await fetch(`/api/forms/${slug}/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(fd)) });
      const json = await res.json().catch(() => ({}));
      if (res.ok) { formEl.reset(); setStatus('sent'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
      else { setStatus('error'); setError(json.error || 'Could not send. Please try again.'); }
    } catch {
      setStatus('error');
      setError('No internet connection. Please check it and tap Submit again.');
    }
  };

  if (status === 'sent') {
    return (
      <div className={s.done} role="status">
        <span className={s.tick} aria-hidden="true">✓</span>
        <h2>Thank you!</h2>
        <p>We’ve received your details and will contact you soon.</p>
        <div className={s.doneActions}>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">WhatsApp us · {CONTACT.quotePhone.display}</a>
          <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>Fill in for someone else</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={s.form}>
      {fields.map((f) => {
        const id = `f-${f.key}`;
        const label = <label htmlFor={id} className={s.label}>{f.label}{!f.required && <span className={s.opt}> (optional)</span>}</label>;
        if (f.type === 'textarea') return <div key={f.key}>{label}<textarea id={id} name={f.key} className={s.input} rows={3} required={f.required} maxLength={2000} /></div>;
        if (f.type === 'select') return (
          <div key={f.key}>{label}
            <select id={id} name={f.key} className={s.input} required={f.required} defaultValue="">
              <option value="" disabled={f.required}>Choose…</option>
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        );
        return (
          <div key={f.key}>{label}
            <input id={id} name={f.key} type={f.type} className={s.input} required={f.required} autoComplete={f.autoComplete} maxLength={300} enterKeyHint="next" {...(HINTS[f.type] || {})} />
          </div>
        );
      })}
      <div className={s.hp} aria-hidden="true"><label htmlFor="f-hp">Leave empty</label><input id="f-hp" name="_hp" tabIndex={-1} autoComplete="off" /></div>
      {status === 'error' && <p className={s.err} role="alert">{error}</p>}
      <button type="submit" className={`btn btn-primary btn-lg ${s.submit}`} disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Submit'}</button>
    </form>
  );
}
