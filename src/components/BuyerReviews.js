import { listPublishedReviews } from '@/lib/shop/store';
import s from './BuyerReviews.module.css';

const FIRST = 9;
const month = (iso) => new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

function Stars({ n, size = 18 }) {
  return (
    <span className={s.stars} role="img" aria-label={`${n} out of 5 stars`} style={{ fontSize: size }}>
      {'★'.repeat(n)}<span>{'★'.repeat(5 - n)}</span>
    </span>
  );
}

function Card({ r }) {
  return (
    <figure className={s.card}>
      <Stars n={r.rating} />
      <blockquote dir="auto">{r.body}</blockquote>
      <figcaption>
        <b>{r.name}</b>
        <span>{[r.company, r.country].filter(Boolean).join(', ')}</span>
        <small>Verified buyer · {month(r.created_at)}</small>
      </figcaption>
    </figure>
  );
}

/** Reviews written by buyers after ordering, shown once approved in admin. Renders nothing until there are some. */
export default async function BuyerReviews() {
  const reviews = await listPublishedReviews().catch(() => []);
  if (!reviews.length) return null;
  const avg = reviews.reduce((t, r) => t + r.rating, 0) / reviews.length;
  const rest = reviews.slice(FIRST);

  return (
    <section id="reviews" className="section" style={{ scrollMarginTop: 80 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Buyer reviews</span>
            <h2>What our buyers say</h2>
          </div>
          <div className={s.summary}>
            <b>{avg.toFixed(1)}</b>
            <div>
              <Stars n={Math.round(avg)} size={22} />
              <span className={s.summaryText}>{reviews.length} review{reviews.length === 1 ? '' : 's'} from buyers who ordered here</span>
            </div>
          </div>
        </div>
        <div className={s.grid}>
          {reviews.slice(0, FIRST).map((r) => <Card key={r.id} r={r} />)}
        </div>
        {rest.length > 0 && (
          <details className={s.more}>
            <summary className="btn btn-outline">Show all {reviews.length} reviews</summary>
            <div className={s.grid}>{rest.map((r) => <Card key={r.id} r={r} />)}</div>
          </details>
        )}
      </div>
    </section>
  );
}
