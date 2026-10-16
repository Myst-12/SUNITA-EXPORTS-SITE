'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/track';
import { whatsappLink, CONTACT } from '@/config/site';
import { COUNTRY_META } from '@/lib/forms/fields';
import { FORM_LANGS, RTL, BUSINESS_TYPES, strings, detectLang } from '@/lib/forms/i18n';
import s from './event.module.css';

const META = new Map(COUNTRY_META.map(([name, iso, dial]) => [name, { iso, dial }]));
const DIALS = COUNTRY_META.filter(([, iso]) => iso);
const flag = (iso) => (iso ? String.fromCodePoint(...[...iso].map((c) => 0x1f1a5 + c.charCodeAt(0))) : '');

// Phone-friendly keyboards and autofill per field type.
const HINTS = {
  email: { inputMode: 'email', autoCapitalize: 'off', autoCorrect: 'off', spellCheck: false },
  url: { inputMode: 'url', autoCapitalize: 'off', autoCorrect: 'off', spellCheck: false },
  text: { autoCapitalize: 'words' },
};

function regionName(lang, iso, fallback) {
  try { return new Intl.DisplayNames([lang], { type: 'region' }).of(iso) || fallback; } catch { return fallback; }
}

/** Search the catalogue (in the visitor's language too), tap to add; anything not listed can be typed. */
function ProductPicker({ id, t, lang, products, picks, value, onChange }) {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!query) return [];
    return products
      .filter((p) => !value.includes(p.n) && (p.n.toLowerCase().includes(query) || (p.l[lang] || '').toLowerCase().includes(query)))
      .slice(0, 8);
  }, [query, products, lang, value]);
  const add = (name) => { const v = name.trim(); if (v && !value.includes(v)) onChange([...value, v]); setQ(''); };
  const label = (name) => { const p = products.find((x) => x.n === name); return p?.l[lang] && lang !== 'en' ? p.l[lang] : name; };

  return (
    <div className={s.picker}>
      {value.length > 0 && (
        <div className={s.chips}>
          {value.map((v) => (
            <button key={v} type="button" className={s.chipOn} onClick={() => onChange(value.filter((x) => x !== v))} aria-label={`${t.remove} ${v}`}>
              {label(v)} <span aria-hidden="true">×</span>
            </button>
          ))}
        </div>
      )}
      <div className={s.searchRow}>
        <input id={id} className={s.input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} autoComplete="off" enterKeyHint="done"
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(matches[0]?.n || q); } }} />
        {q.trim() && <button type="button" className={`btn btn-outline ${s.addBtn}`} onClick={() => add(q)}>{t.add}</button>}
      </div>
      {query && (
        <ul className={s.suggest} role="listbox">
          {matches.map((p) => (
            <li key={p.n}>
              <button type="button" role="option" aria-selected="false" onClick={() => add(p.n)}>
                <b>{lang !== 'en' && p.l[lang] ? p.l[lang] : p.n}</b>
                <small>{lang !== 'en' && p.l[lang] ? `${p.n} · ` : ''}{p.c}</small>
              </button>
            </li>
          ))}
          {matches.length === 0 && <li className={s.noMatch}>{t.noMatch}</li>}
        </ul>
      )}
      {!query && picks.length > 0 && (
        <div className={s.chips}>
          {picks.filter((p) => !value.includes(p)).map((p) => <button key={p} type="button" className={s.chip} onClick={() => add(p)}>+ {p}</button>)}
        </div>
      )}
    </div>
  );
}

export default function EventForm({ slug, title, intro, brand, open, fields, products, picks }) {
  const [lang, setLang] = useState('en');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [picked, setPicked] = useState([]);
  const [country, setCountry] = useState('');
  const [dial, setDial] = useState('');
  const [phone, setPhone] = useState('');
  const t = strings(lang);
  const dir = RTL.has(lang) ? 'rtl' : 'ltr';

  // Language and phone code from the visitor's browser (e.g. ar-AE → Arabic, +971).
  useEffect(() => {
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    const region = langs.map((l) => l.split('-')[1]).find(Boolean)?.toUpperCase();
    const hit = DIALS.find(([, iso]) => iso === region);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only values, read once after mount
    setLang(detectLang(langs));
    setDial(hit ? hit[2] : '971');
  }, []);

  const pickCountry = (name) => {
    setCountry(name);
    const m = META.get(name);
    if (m?.dial && !phone) setDial(m.dial);
  };

  const submit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    if (fd.get('_hp')) { setStatus('sent'); return; } // bots fill hidden fields
    const productsField = fields.find((f) => f.key === 'products');
    if (productsField?.required && picked.length === 0) { setStatus('error'); setError(`${t.fields.products}?`); return; }
    setStatus('sending');
    setError('');
    const body = Object.fromEntries(fd);
    if (fields.some((f) => f.key === 'phone')) body.phone = phone.trim() ? `+${dial} ${phone.trim()}` : '';
    if (productsField) body.products = picked.join(', ');
    try {
      const res = await fetch(`/api/forms/${slug}/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        track('event_form_submit', { form: title, language: lang, country: body.country || '' });
        track('generate_lead', { form: 'event', event: title });
        formEl.reset(); setPicked([]); setPhone(''); setCountry('');
        setStatus('sent'); window.scrollTo({ top: 0, behavior: 'smooth' });
      } else { setStatus('error'); setError(json.error || t.err); }
    } catch {
      setStatus('error');
      setError(t.netErr);
    }
  };

  const labelOf = (f) => t.fields[f.key] || f.label;

  return (
    <div className={s.card}>
      <div className={s.langs} role="group" aria-label="Language">
        {FORM_LANGS.map(([code, name]) => (
          <button key={code} type="button" lang={code} className={code === lang ? s.langOn : ''} aria-pressed={code === lang} onClick={() => setLang(code)}>{name}</button>
        ))}
      </div>

      <span className={s.brand}>{brand}</span>
      <h1 className={s.title}>{title}</h1>
      {intro && <p className={s.intro}>{intro}</p>}

      <div dir={dir} lang={lang}>
        {!open ? <p className={s.closed}>{t.closed}</p> : status === 'sent' ? (
          <div className={s.done} role="status">
            <span className={s.tick} aria-hidden="true">✓</span>
            <h2>{t.thanks}</h2>
            <p>{t.thanksText}</p>
            <div className={s.doneActions}>
              <Link href="/" className="btn btn-primary">{t.visit}</Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">{t.whatsapp} · <bdi dir="ltr">{CONTACT.quotePhone.display}</bdi></a>
              <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>{t.again}</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className={s.form}>
            {fields.map((f) => {
              const id = `f-${f.key}`;
              const label = <label htmlFor={id} className={s.label}>{labelOf(f)}{!f.required && <span className={s.opt}> ({t.optional})</span>}</label>;

              if (f.key === 'products') {
                return <div key={f.key}>{label}<ProductPicker id={id} t={t} lang={lang} products={products} picks={picks} value={picked} onChange={setPicked} /></div>;
              }
              if (f.key === 'phone') {
                return (
                  <div key={f.key}>{label}
                    <div className={s.phone} dir="ltr">
                      <select aria-label={t.code} className={`${s.input} ${s.dial}`} value={dial} onChange={(e) => setDial(e.target.value)}>
                        {DIALS.map(([name, iso, d]) => <option key={iso} value={d}>{flag(iso)} +{d} {iso}</option>)}
                      </select>
                      <input id={id} type="tel" inputMode="tel" autoComplete="tel-national" className={s.input} placeholder={t.number} required={f.required} maxLength={20}
                        value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d\s-]/g, ''))} />
                    </div>
                  </div>
                );
              }
              if (f.key === 'country') {
                return (
                  <div key={f.key}>{label}
                    <select id={id} name="country" className={s.input} required={f.required} value={country} onChange={(e) => pickCountry(e.target.value)}>
                      <option value="" disabled={f.required}>{t.choose}</option>
                      {f.options.map((o) => { const m = META.get(o); return <option key={o} value={o}>{m?.iso ? `${flag(m.iso)} ${regionName(lang, m.iso, o)}` : (lang === 'en' ? o : t.biz[6])}</option>; })}
                    </select>
                  </div>
                );
              }
              if (f.type === 'select') {
                const translated = f.key === 'businessType';
                return (
                  <div key={f.key}>{label}
                    <select id={id} name={f.key} className={s.input} required={f.required} defaultValue="">
                      <option value="" disabled={f.required}>{t.choose}</option>
                      {f.options.map((o) => { const i = BUSINESS_TYPES.indexOf(o); return <option key={o} value={o}>{translated && i >= 0 ? t.biz[i] : o}</option>; })}
                    </select>
                  </div>
                );
              }
              if (f.type === 'textarea') return <div key={f.key}>{label}<textarea id={id} name={f.key} className={s.input} rows={3} required={f.required} maxLength={2000} /></div>;
              return (
                <div key={f.key}>{label}
                  <input id={id} name={f.key} type={f.type} className={s.input} required={f.required} autoComplete={f.autoComplete} maxLength={300} enterKeyHint="next" dir={f.type === 'email' || f.type === 'url' ? 'ltr' : undefined} {...(HINTS[f.type] || {})} />
                </div>
              );
            })}
            <div className={s.hp} aria-hidden="true"><label htmlFor="f-hp">Leave empty</label><input id="f-hp" name="_hp" tabIndex={-1} autoComplete="off" /></div>
            {status === 'error' && <p className={s.err} role="alert">{error}</p>}
            <button type="submit" className={`btn btn-primary btn-lg ${s.submit}`} disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.submit}</button>
          </form>
        )}
      </div>
    </div>
  );
}
