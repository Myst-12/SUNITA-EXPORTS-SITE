import Link from 'next/link';
import { isAdmin, adminConfigured } from '@/lib/forms/auth';
import { listForms, usingDatabase } from '@/lib/forms/store';
import { login, logout } from './actions';
import s from './admin.module.css';

export default async function AdminHome({ searchParams }) {
  const { error } = await searchParams;

  if (!(await isAdmin())) {
    return (
      <div className={`container ${s.wrap}`}>
        <form action={login} className={`${s.card} ${s.narrow} ${s.stack}`} style={{ marginTop: 24 }}>
          <div>
            <h1 style={{ fontSize: '1.7rem', margin: 0 }}>Event forms</h1>
            <p className={s.sub}>Admin login</p>
          </div>
          {!adminConfigured() && <p className={s.err}>ADMIN_PASSWORD is not set on the server yet.</p>}
          <div>
            <label htmlFor="password" className={s.label}>Password</label>
            <input id="password" name="password" type="password" className={s.input} required autoComplete="current-password" />
          </div>
          {error && <p className={s.err}>Wrong password.</p>}
          <button className={`btn btn-primary btn-lg ${s.submit}`} type="submit">Log in</button>
        </form>
      </div>
    );
  }

  const forms = await listForms();
  return (
    <div className={`container ${s.wrap}`}>
      <div className={s.head}>
        <div>
          <h1>Event forms</h1>
          <p className={s.sub}>Make a form for an exhibition, show its QR code, and close it to get the Excel file by email.</p>
        </div>
        <div className={s.headActions}>
          <Link href="/admin/new/" className="btn btn-primary btn-lg">+ New form</Link>
          <form action={logout}><button className="btn btn-outline btn-lg" type="submit">Log out</button></form>
        </div>
      </div>

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
