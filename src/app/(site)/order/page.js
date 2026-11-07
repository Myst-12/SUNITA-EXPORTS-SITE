import { redirect } from 'next/navigation';
import { currentCustomer } from '@/lib/shop/auth';
import { orderableProducts, UNITS, INCOTERMS, CONTAINERS } from '@/lib/shop/catalog';
import OrderReview from './OrderReview';
import s from '../account/account.module.css';

export const metadata = { title: 'Review your order', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function OrderPage() {
  const me = await currentCustomer();
  if (!me) redirect('/account/login/?next=/order/');
  return (
    <section className={s.page} style={{ background: 'var(--green-50)' }}>
      <div className="container">
        <div className={s.head}>
          <div>
            <h1>Review your order</h1>
            <p className={s.sub}>Check quantities, add where it ships, and send it to our export team.</p>
          </div>
        </div>
        <OrderReview products={orderableProducts()} units={UNITS} incoterms={INCOTERMS} containers={CONTAINERS} customer={me} />
      </div>
    </section>
  );
}
