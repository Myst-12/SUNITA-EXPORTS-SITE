import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { listForms, usingDatabase } from '@/lib/forms/store';
import s from '../admin.module.css';

export const metadata = { title: 'Event forms' };

export default async function FormsTool({ searchParams }) {
  if (!(await isAdmin())) redirect('/admin/');
  const { note } = await searchParams;
  const forms = await listForms();
  return (
    <div className={`container ${s.wrap}`}>
      <div className={s.head}>
        <div>
          <h1>Event forms</h1>
          <p className={s.sub}>Make a form for an exhibition, show its QR code, and close it to get the Excel file by email.</p>
        </div>
        <div className={s.headActions}>
          <Link href="/admin/forms/new/" className="btn btn-primary btn-lg">+ New form</Link>
        </div>
      </div>

      {note && <p className={s.note}>{note}</p>}
      {!usingDatabase && <p className={s.warn}>Test mode: responses are saved on this computer only. Connect the database before using this at an exhibition.</p>}

      {forms.length === 0 ? (
        <p className={s.empty}>No forms yet. Click “New form” to make your first one.</p>
      ) : (
        <div className={s.list}>
          {forms.map((f) => (
            <Link key={f.id} href={`/admin/forms/${f.id}/`} className={s.row}>
              <div>
                <h2>{f.title}</h2>
                <span className={s.meta}><span className={`${s.badge} ${f.status === 'open' ? s.open : s.closed}`}>{f.status}</span> · {new Date(f.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
              </div>
              <div className={s.count}>{f.count}<small>responses</small></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
