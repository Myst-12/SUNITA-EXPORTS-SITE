import Link from 'next/link';
import { redirect } from 'next/navigation';
import { currentCustomer, safeNext } from '@/lib/shop/auth';
import { COUNTRIES } from '@/lib/forms/fields';
import AuthForm from './AuthForm';
import s from './account.module.css';

/** Shared shell for /account/login/ and /account/signup/. A buyer who is already logged in goes straight on. */
export default async function AuthPage({ mode, searchParams }) {
  const next = safeNext((await searchParams).next);
  if (await currentCustomer()) redirect(next);
  const signup = mode === 'signup';
  const other = `${signup ? '/account/login/' : '/account/signup/'}?next=${encodeURIComponent(next)}`;
  return (
    <section className={s.authWrap}>
      <div className={`container ${s.auth}`}>
        <div className={s.authIntro}>
          <h1>{signup ? 'Create your buyer account' : 'Log in to order'}</h1>
          <p className="lead">
            {signup
              ? 'One account to send FMCG orders straight to our export team and follow them from confirmation to shipment.'
              : 'Log in to place your order and see the status of earlier ones.'}
          </p>
          <ul className={s.perks}>
            <li>Order by the carton, pack or kilo — no quotation form first</li>
            <li>Our team confirms prices, availability and shipping dates</li>
            <li>Every order and its status in one place</li>
          </ul>
        </div>
        <div className={s.authCard}>
          <AuthForm mode={mode} next={next} countries={COUNTRIES} />
          <p className={s.switch}>
            {signup ? 'Already have an account?' : 'New buyer?'} <Link href={other}>{signup ? 'Log in' : 'Create an account'}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
