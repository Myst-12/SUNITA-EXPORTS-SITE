import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { usingDatabase } from '@/lib/forms/store';
import { getAllProducts } from '@/data/products';
import { getOptions } from '@/lib/costing/store';
import { tabsFor } from '@/lib/costing/heads';
import Calculator from './Calculator';
import a from '../admin.module.css';

export const metadata = { title: 'Quotation cost calculator' };

const norm = (t) => t.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ').trim();

export default async function QuotationTool() {
  if (!(await isAdmin())) redirect('/admin/');
  let saved = {}, failed = false;
  try { saved = await getOptions(); } catch (e) { console.error(e); failed = true; }
  const products = getAllProducts().map((p) => ({ slug: p.slug, name: p.name, cat: p.categoryName, tabs: tabsFor(p), hay: ` ${norm(`${p.name} ${p.categoryName}`)}` }));

  return (
    <div className={`container ${a.wrap} ${a.wide}`}>
      <div className={a.head}>
        <div>
          <h1>Quotation cost calculator</h1>
          <p className={a.sub}>Search the product, choose Consumer, Bulk or FMCG, and fill each box. Use <b>Add +</b> to save an option with its price once; next time just pick it from the box.</p>
        </div>
      </div>
      {failed && <p className={a.warn}>Could not load the saved options from the database. If this is the first time, the <b>admin_data</b> table still needs to be created (docs/costing-setup.md).</p>}
      {!usingDatabase && <p className={a.warn}>Test mode: saved options are kept on this computer only.</p>}
      <Calculator products={products} saved={saved} />
    </div>
  );
}
