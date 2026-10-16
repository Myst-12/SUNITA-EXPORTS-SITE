import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import QRCode from 'qrcode';
import { isAdmin } from '@/lib/forms/auth';
import { getForm, listResponses } from '@/lib/forms/store';
import { formUrl } from '@/lib/forms/url';
import { closeFormAction, reopenFormAction } from '../../actions';
import { CopyLink, LiveRefresh, ConfirmButton } from './AdminTools';
import s from '../../admin.module.css';

const ist = (iso, opts) => new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', ...opts });

export default async function FormDetail({ params, searchParams }) {
  if (!(await isAdmin())) redirect('/admin/');
  const { id } = await params;
  const { note } = await searchParams;
  const form = await getForm({ id });
  if (!form) notFound();
  const responses = await listResponses(id);
  const url = await formUrl(form.slug);
  const qr = await QRCode.toDataURL(url, { width: 600, margin: 1, color: { dark: '#0f3d22' } });
  const open = form.status === 'open';
  const latest = [...responses].reverse().slice(0, 20);
  const line = (r) => [r.data.company, r.data.country, r.data.email || r.data.phone].filter(Boolean).join(' · ');

  return (
    <div className={`container ${s.wrap}`}>
      {open && <LiveRefresh />}
      <Link href="/admin/" className={s.back}>← All forms</Link>
      <div className={s.head}>
        <div>
          <span className={`${s.badge} ${open ? s.open : s.closed}`}>{form.status}</span>
          <h1 style={{ marginTop: 8 }}>{form.title}</h1>
          <p className={s.sub}>
            <b style={{ color: 'var(--ink)' }}>{responses.length}</b> response{responses.length === 1 ? '' : 's'}
            {open ? ' · updates live' : form.closed_at ? ` · closed ${ist(form.closed_at, { dateStyle: 'medium', timeStyle: 'short' })}` : ''}
          </p>
        </div>
      </div>

      {note && <p className={s.note}>{note}</p>}

      <div className={s.detail}>
        <div className={`${s.card} ${s.qrCard}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qr} alt={`QR code for ${form.title}`} width={300} height={300} />
          <div className={s.btnGrid} style={{ width: '100%' }}>
            <Link href={`/admin/forms/${id}/show/`} className={`btn btn-primary ${s.btnFull}`}>Show QR full screen</Link>
            <a href={`/admin/forms/${id}/qr/`} className={`btn btn-outline ${s.btnFull}`}>Download QR to print</a>
          </div>
        </div>

        <div className={`${s.card} ${s.stack}`}>
          <div>
            <h2 className={s.h2}>Form link</h2>
            <p className={s.meta} style={{ margin: '0 0 10px' }}>Send it on WhatsApp or email.</p>
            <div className={s.link}>
              <input readOnly value={url} className={s.input} aria-label="Form link" />
              <CopyLink url={url} />
            </div>
          </div>
          <div className={s.btnGrid}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Open form</a>
            <a href={`/admin/forms/${id}/excel/`} className="btn btn-outline">Download Excel</a>
          </div>
          <div>
            <h2 className={s.h2}>{open ? 'Finished at the exhibition?' : 'This form is closed'}</h2>
            <p className={s.meta} style={{ margin: '0 0 12px' }}>
              {open ? 'Closing stops new responses and emails you the Excel file straight away.' : 'Visitors now see a “form closed” message. You can reopen it any time.'}
            </p>
            <form action={open ? closeFormAction : reopenFormAction}>
              <input type="hidden" name="id" value={id} />
              {open
                ? <ConfirmButton className={`btn btn-primary btn-lg ${s.submit}`} message="Close this form and email the Excel file?">Close form &amp; email Excel</ConfirmButton>
                : <button type="submit" className={`btn btn-outline btn-lg ${s.submit}`}>Reopen form</button>}
            </form>
          </div>
        </div>
      </div>

      <div className={s.card} style={{ marginTop: 14 }}>
        <h2 className={s.h2}>Latest responses</h2>
        {latest.length === 0 ? <p className={s.meta} style={{ margin: '6px 0 0' }}>No responses yet. They appear here as soon as someone submits.</p> : (
          <div className={s.responses}>
            {latest.map((r) => (
              <div key={r.id} className={s.resp}>
                <b>{r.data.name || r.data.company || 'Response'}</b>
                {line(r) && <span>{line(r)}</span>}
                <span>{ist(r.created_at, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
          </div>
        )}
        {responses.length > 20 && <p className={s.meta} style={{ marginTop: 10 }}>Showing the latest 20 — the Excel file has all {responses.length}.</p>}
      </div>
    </div>
  );
}
