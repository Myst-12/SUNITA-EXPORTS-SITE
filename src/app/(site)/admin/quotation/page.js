import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import Icon from '@/components/Icon';
import s from '../admin.module.css';

export const metadata = { title: 'Quotation cost calculator' };

// Slot for the quotation cost calculator; the calculation rules come from the client later.
export default async function QuotationTool() {
  if (!(await isAdmin())) redirect('/admin/');
  return (
    <div className={`container ${s.wrap}`}>
      <div className={s.head}>
        <div>
          <h1>Quotation cost calculator</h1>
          <p className={s.sub}>Pick a product and get its export cost worked out automatically.</p>
        </div>
      </div>
      <div className={`${s.card} ${s.placeholder}`}>
        <span className="icon-tile turmeric" style={{ margin: 0 }}><Icon name="tag" /></span>
        <h2 className={s.h2}>Coming soon</h2>
        <p>This tool is being set up. Once the costing rules are agreed, you will be able to enter a product here and see the full cost for a quotation.</p>
        <Link href="/admin/" className="btn btn-outline">Back to dashboard</Link>
      </div>
    </div>
  );
}
