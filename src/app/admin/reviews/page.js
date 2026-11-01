import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { listReviews, usingDatabase } from '@/lib/shop/store';
import { REVIEW_STATUSES, reviewStatusLabel } from '@/lib/shop/catalog';
import { setReviewStatusAction } from './actions';
import s from '../admin.module.css';

export const metadata = { title: 'Reviews' };

const ist = (iso) => new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const BADGE = { pending: s.badgeNew, published: s.open, hidden: s.closed };
// The buttons offered for each status: publish what is waiting, hide what is live, bring back what was hidden.
const MOVES = { pending: [['published', 'Publish'], ['hidden', 'Hide']], published: [['hidden', 'Hide from website']], hidden: [['published', 'Publish'], ['pending', 'Move to “To approve”']] };

export default async function ReviewsTool({ searchParams }) {
  if (!(await isAdmin())) redirect('/admin/');
  const { status, note } = await searchParams;
  let reviews = [], failed = false;
  try { reviews = await listReviews(); } catch (e) { console.error(e); failed = true; }
  const shown = status ? reviews.filter((r) => r.status === status) : reviews;
  const live = reviews.filter((r) => r.status === 'published');
  const avg = live.length ? (live.reduce((t, r) => t + r.rating, 0) / live.length).toFixed(1) : '—';
  const filters = [{ key: '', label: 'All', n: reviews.length }, ...REVIEW_STATUSES.map((t) => ({ ...t, n: reviews.filter((r) => r.status === t.key).length }))];

  return (
    <div className={`container ${s.wrap}`}>
      <div className={s.head}>
        <div>
          <h1>Reviews</h1>
          <p className={s.sub}>Buyers can review an order from their account. A review appears on the homepage only after you publish it. Shown there with first name, country and company (if the buyer allowed it).</p>
        </div>
        <div className={s.headActions}>
          <Link href="/#reviews" className="btn btn-outline btn-lg" target="_blank">See on website</Link>
        </div>
      </div>

      {note && <p className={s.note}>{note}</p>}
      {failed && <p className={s.warn}>Could not load reviews from the database. If this is the first time, the <b>reviews</b> table still needs to be created (docs/forms-setup.md, step 4).</p>}
      {!usingDatabase && <p className={s.warn}>Test mode: reviews are saved on this computer only.</p>}

      <div className={s.tiles}>
        <div><b>{reviews.filter((r) => r.status === 'pending').length}</b><span>To approve</span></div>
        <div><b>{live.length}</b><span>On the website</span></div>
        <div><b>{avg}</b><span>Average rating (published)</span></div>
      </div>

      <nav className={s.filters} aria-label="Filter by status">
        {filters.map((f) => (
          <Link key={f.key || 'all'} href={f.key ? `/admin/reviews/?status=${f.key}` : '/admin/reviews/'} className={s.filter} aria-current={(status || '') === f.key ? 'true' : undefined}>
            {f.label} <span>{f.n}</span>
          </Link>
        ))}
      </nav>

      {shown.length === 0 ? (
        <p className={s.empty}>{reviews.length ? 'No reviews with this status.' : 'No reviews yet. Buyers can write one from their account after placing an order.'}</p>
      ) : (
        <div className={s.list}>
          {shown.map((r) => {
            const c = r.customer;
            return (
              <article key={r.id} className={s.reviewCard}>
                <header className={s.reviewHead}>
                  <span className={s.reviewStars} role="img" aria-label={`${r.rating} out of 5 stars`}>{'★'.repeat(r.rating)}<span>{'★'.repeat(5 - r.rating)}</span></span>
                  <span className={`${s.badge} ${BADGE[r.status] || ''}`}>{reviewStatusLabel(r.status)}</span>
                </header>
                <p className={s.reviewBody} dir="auto">{r.body}</p>
                <p className={s.meta}>
                  <b>{c.name}</b>{c.company && `, ${c.company}`}{r.show_company ? '' : ' (company not shown)'} · {c.country} · <a href={`mailto:${c.email}`}>{c.email}</a><br />
                  Order {r.order_number} · {ist(r.created_at)}
                </p>
                <form action={setReviewStatusAction} className={s.statusForm}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="back" value={status || ''} />
                  {MOVES[r.status]?.map(([to, label], i) => (
                    <button key={to} type="submit" name="status" value={to} className={`btn ${i === 0 && to === 'published' ? 'btn-primary' : 'btn-outline'}`}>{label}</button>
                  ))}
                </form>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
