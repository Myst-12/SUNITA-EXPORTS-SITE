'use client';

import { useState } from 'react';
import s from './admin.module.css';

const Eye = ({ off }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="m3 3 18 18" />}
  </svg>
);

export default function PasswordInput(props) {
  const [show, setShow] = useState(false);
  return (
    <div className={s.pw}>
      <input {...props} type={show ? 'text' : 'password'} className={s.input} autoCapitalize="off" autoCorrect="off" spellCheck={false} />
      <button type="button" className={s.eye} onClick={() => setShow((v) => !v)} aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show}>
        <Eye off={show} />
      </button>
    </div>
  );
}
