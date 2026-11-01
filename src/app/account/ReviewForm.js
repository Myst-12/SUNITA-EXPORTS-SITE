'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Icon from '@/components/Icon';
import { reviewAction } from './actions';
import s from './account.module.css';

const WORDS = ['', 'Poor', 'Below expectations', 'Good', 'Very good', 'Excellent'];

function Submit() {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? 'Sending…' : 'Send review'}</button>;
}

/** Star rating and a few words about one order. Opens from the order card. */
export default function ReviewForm({ orderId, orderNumber, company }) {
  const [state, action] = useActionState(reviewAction, {});
  // The radios are uncontrolled so React's reset after a failed send puts back the submitted rating; this only drives the colours.
  const [rating, setRating] = useState(state.values?.rating || 0);
  const [hover, setHover] = useState(0);
  const shown = hover || rating;
  const id = (k) => `${orderId}-${k}`;

  return (
    <details className={s.reviewBox} open={Boolean(state.error)}>
      <summary className={s.reviewSum}><Icon name="star" size={18} /> Review this order</summary>
      <form action={action} className={s.reviewForm}>
        <input type="hidden" name="order" value={orderId} />
        <fieldset className={s.stars} onMouseLeave={() => setHover(0)}>
          <legend>Your rating for {orderNumber}</legend>
          <div className={s.starRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className={`${s.star} ${n <= shown ? s.starOn : ''}`} onMouseEnter={() => setHover(n)}>
                <input type="radio" name="rating" value={n} defaultChecked={state.values?.rating === n} onChange={() => setRating(n)} required className="visually-hidden" />
                <Icon name="star" size={30} />
                <span className="visually-hidden">{n} star{n === 1 ? '' : 's'}</span>
              </label>
            ))}
            <span className={s.starWord} aria-hidden="true">{WORDS[shown]}</span>
          </div>
        </fieldset>
        <div className="field">
          <label htmlFor={id('body')}>Your review</label>
          <textarea id={id('body')} name="body" required minLength={20} maxLength={1500} rows={4} defaultValue={state.values?.body || ''} dir="auto"
            placeholder="How were the products, packing, documents and communication? Any language is fine." />
        </div>
        {company && (
          <label className={s.check}>
            <input type="checkbox" name="show_company" defaultChecked={state.values ? state.values.showCompany : true} /> Show my company name ({company})
          </label>
        )}
        <p className={s.small}>Shown on our website with your first name, country and a “Verified buyer” label after our team reads it.</p>
        {state.error && <p className={s.err} role="alert">{state.error}</p>}
        <div><Submit /></div>
      </form>
    </details>
  );
}
