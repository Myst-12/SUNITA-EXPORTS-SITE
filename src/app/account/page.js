import Link from 'next/link';
import { redirect } from 'next/navigation';
import { currentCustomer } from '@/lib/shop/auth';
import { listOrders, listReviews } from '@/lib/shop/store';
import { statusLabel } from '@/lib/shop/catalog';
import { CONTACT, whatsappLink } from '@/config/site';
import Icon from '@/components/Icon';
import ClearCart from './ClearCart';
import ReviewForm from './ReviewForm';
import { logoutAction } from './actions';
import s from './account.module.css';

export const metadata = { title: 'My account', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const date = (iso) => new Date(iso).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric' });

export default async function AccountPage({ searchParams }) {
  const me = await currentCustomer();
  if (!me) redirect('/account/login/');
  const { placed, reviewed } = await searchParams;
  let orders = [];
  let failed = false;
  try { orders = await listOrders({ customerId: me.id }); } catch (e) { console.error(e); failed = true; }
  // Reviews may not be set up yet; the order list still works without them.
  const reviews = await listReviews({ customerId: me.id }).catch(() => null);
  const reviewOf = Object.fromEntries((reviews || []).map((r) => [r.order_id, r]));

  return (
    <section className={s.page}>
      <div className="container">
        {placed && <ClearCart />}
        <div className={s.head}>
          <div>
            <h1>Hello, {me.name.split(' ')[0]}</h1>
            <p className={s.sub}>{[me.company, me.email, me.phone, me.country].filter(Boolean).join(' · ')}</p>
          </div>
          <div className={s.headActions}>
            <Link href="/fmcg/#order" className="btn btn-primary">New order <Icon name="arrow-right" /></Link>
            <form action={logoutAction}><button type="submit" className="btn btn-outline">Log out</button></form>
          </div>
        </div>

        {placed && (
          <div className={s.placed} role="status">
            <span className={s.placedIcon}><Icon name="check" size={22} /></span>
            <div>
              <b>Order {placed} is with our export team.</b>
              <p>We will confirm prices, availability and shipping dates by email or WhatsApp, usually within one working day.</p>
            </div>
          </div>
        )}

        {reviewed && (
          <div className={s.placed} role="status">
            <span className={s.placedIcon}><Icon name="star" size={20} /></span>
            <div>
              <b>Thank you for your review.</b>
              <p>Our team will read it and publish it on the website shortly.</p>
            </div>
          </div>
        )}

        <h2 className={s.h2} id="orders">Your orders</h2>
        {failed && <p className={s.err}>Your orders could not be loaded just now. Please refresh in a minute.</p>}
        {!failed && orders.length === 0 && (
          <div className={s.empty}>
            <p>No orders yet.</p>
            <Link href="/fmcg/#order" className="btn btn-primary">Start an FMCG order</Link>
          </div>
        )}
        <div className={s.orders}>
          {orders.map((o) => (
            <article key={o.id} className={s.order}>
              <header className={s.orderHead}>
                <div>
                  <b>{o.number}</b>
                  <span>{date(o.created_at)} · {o.items.length} product{o.items.length === 1 ? '' : 's'}</span>
                </div>
                <span className={`${s.badge} ${s[o.status] || ''}`}>{statusLabel(o.status)}</span>
              </header>
              <ul className={s.lines}>
                {o.items.map((it) => (
                  <li key={it.slug}>
                    <span>{it.name}{(it.pack || it.brand) && <small>{[it.pack, it.brand].filter(Boolean).join(' · ')}</small>}</span>
                    <b>{it.qty} {it.unit}</b>
                  </li>
                ))}
              </ul>
              {(o.details.port || o.details.incoterm) && (
                <p className={s.orderMeta}>{[o.details.port, o.details.incoterm, o.details.container, o.details.wanted && `wanted by ${o.details.wanted}`].filter(Boolean).join(' · ')}</p>
              )}
              {reviewOf[o.id] ? (
                <p className={s.reviewDone}>
                  <span className={s.reviewStars} role="img" aria-label={`${reviewOf[o.id].rating} out of 5 stars`}>{'★'.repeat(reviewOf[o.id].rating)}<span>{'★'.repeat(5 - reviewOf[o.id].rating)}</span></span>
                  Your review · {reviewOf[o.id].status === 'published' ? 'on the website' : reviewOf[o.id].status === 'hidden' ? 'not shown on the website' : 'waiting for approval'}
                </p>
              ) : reviews && o.status !== 'cancelled' && (
                <ReviewForm orderId={o.id} orderNumber={o.number} company={me.company} />
              )}
            </article>
          ))}
        </div>

        <p className={s.help}>
          Questions about an order? <a href={whatsappLink('Hello, I have a question about my order.')} target="_blank" rel="noopener noreferrer">WhatsApp us</a> or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
      </div>
    </section>
  );
}
