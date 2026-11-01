'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import PasswordInput from '@/app/admin/PasswordInput';
import { signupAction, loginAction } from './actions';
import s from './account.module.css';

function Submit({ children }) {
  const { pending } = useFormStatus();
  return <button className={`btn btn-primary btn-lg ${s.submit}`} type="submit" disabled={pending}>{pending ? 'Please wait…' : children}</button>;
}

/** Sign-up and log-in forms. Typed values come back with an error, so nothing has to be typed twice. */
export default function AuthForm({ mode, next, countries }) {
  const signup = mode === 'signup';
  const [state, action] = useActionState(signup ? signupAction : loginAction, { values: {} });
  const v = state.values || {};
  return (
    <form action={action} className={s.form}>
      <input type="hidden" name="next" value={next} />
      {signup && (
        <div className={s.row}>
          <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" required autoComplete="name" defaultValue={v.name} /></div>
          <div className="field"><label htmlFor="company">Company</label><input id="company" name="company" required autoComplete="organization" defaultValue={v.company} /></div>
        </div>
      )}
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" defaultValue={v.email} /></div>
      {signup && (
        <div className={s.row}>
          <div className="field"><label htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+971 50 123 4567" defaultValue={v.phone} /></div>
          <div className="field">
            <label htmlFor="country">Country</label>
            <select id="country" name="country" required autoComplete="country-name" defaultValue={v.country || ''}>
              <option value="" disabled>Choose…</option>
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      )}
      <div className="field">
        <label htmlFor="password">Password{signup && <span className={s.hint}> · at least 8 characters</span>}</label>
        <PasswordInput id="password" name="password" required minLength={signup ? 8 : undefined} autoComplete={signup ? 'new-password' : 'current-password'} />
      </div>
      {state.error && <p className={s.err} role="alert">{state.error}</p>}
      <Submit>{signup ? 'Create account' : 'Log in'}</Submit>
    </form>
  );
}
