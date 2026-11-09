import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { usingDatabase } from '@/lib/forms/store';
import { getAllProducts } from '@/data/products';
import { getCosting } from '@/lib/costing/store';
import { tabsFor } from '@/lib/costing/heads';
import Icon from '@/components/Icon';
import Calculator from './Calculator';
import { uploadCostingAction } from './actions';
import a from '../admin.module.css';
import s from './quotation.module.css';

export const metadata = { title: 'Quotation cost calculator' };

const ist = (iso) => new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

function Upload({ first }) {
  return (
    <form action={uploadCostingAction} className={s.upload}>
      <label className={a.label} htmlFor="sheet">{first ? 'Upload the filled sheet' : 'Upload a new sheet'} <span className={a.hint}>(.xlsx; replaces all figures)</span></label>
      <div className={s.uploadRow}>
        <input id="sheet" name="sheet" type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" required className={s.file} />
        <button type="submit" className="btn btn-primary">Upload</button>
      </div>
    </form>
  );
}

export default async function QuotationTool({ searchParams }) {
  if (!(await isAdmin())) redirect('/admin/');
  const { note, error } = await searchParams;
  let costing = null, failed = false;
  try { costing = await getCosting(); } catch (e) { console.error(e); failed = true; }
  const products = getAllProducts().map((p) => ({ slug: p.slug, name: p.name, cat: p.categoryName, tabs: tabsFor(p) }));
  const sum = costing?.summary;

  return (
    <div className={`container ${a.wrap}`}>
      <div className={a.head}>
        <div>
          <h1>Quotation cost calculator</h1>
          <p className={a.sub}>Pick a product and its packing, type today&apos;s buying price and your profit, and get FOB, CFR and CIF prices in USD.</p>
        </div>
      </div>

      {note && <p className={a.note}>{note}</p>}
      {error && <p className={a.warn}>{error}</p>}
      {failed && <p className={a.warn}>Could not load the costing sheet from the database. If this is the first time, the <b>admin_data</b> table still needs to be created (docs/costing-setup.md).</p>}
      {!usingDatabase && <p className={a.warn}>Test mode: the costing sheet is saved on this computer only.</p>}

      {costing ? (
        <Calculator costing={costing} products={products} />
      ) : (
        <div className={`${a.card} ${a.placeholder}`}>
          <span className="icon-tile turmeric" style={{ margin: 0 }}><Icon name="tag" /></span>
          <h2 className={a.h2}>Waiting for the costing sheet</h2>
          <p>The calculator works from the client&apos;s own figures: what each cost head costs and the packings he quotes in. The buying price is typed in for each quote, as it changes daily. Download the sheet, have it filled in, and upload it here.</p>
          <a href="/admin/quotation/sheet/" className="btn btn-outline" download><Icon name="download" /> Download blank sheet</a>
          <Upload first />
        </div>
      )}

      {costing && (
        <section className={`${a.card} ${s.sheetCard}`}>
          <h2 className={a.h2}>Costing sheet</h2>
          <p className={a.meta}>Uploaded {ist(costing.uploadedAt)}{costing.fileName ? ` · ${costing.fileName}` : ''}</p>
          {sum && (
            <ul className={s.summary}>
              {sum.rates.map((r, i) => (
                <li key={r.tab}><b>{r.tab}</b>{r.filled} of {r.of} costs · {sum.packings[i].n} {sum.packings[i].n === 1 ? 'packing' : 'packings'}</li>
              ))}
            </ul>
          )}
          <a href="/admin/quotation/sheet/" className="btn btn-outline" download><Icon name="download" /> Download sheet with these figures</a>
          <Upload />
        </section>
      )}
    </div>
  );
}
