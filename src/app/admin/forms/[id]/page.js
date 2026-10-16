import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import QRCode from 'qrcode';
import { isAdmin } from '@/lib/forms/auth';
import { getForm, listResponses } from '@/lib/forms/store';
import { formUrl } from '@/lib/forms/url';
import { closeFormAction, reopenFormAction, deleteFormAction, copyFormAction } from '../../actions';
import { formStats } from '@/lib/forms/stats';
import { SITE_URL } from '@/config/site';
import { CopyLink, LiveRefresh, ConfirmButton } from './AdminTools';
import s from '../../admin.module.css';

// Ready-to-send follow-up message for one buyer.
const followUp = (form, r) => `Hello ${r.data.name || ''}, this is Sunita Agri Exports — thank you for visiting us${form.title ? ` at ${form.title}` : ''}. Please tell us the products and quantities you need and we will send our best prices. Our range: ${SITE_URL}/products/`;
const waLink = (form, r) => { const n = String(r.data.phone || '').replace(/\D/g, ''); return n.length >= 8 ? `https://wa.me/${n}?text=${encodeURIComponent(followUp(form, r))}` : null; };

function Bars({ title, rows, total }) {
  if (!rows.length) return null;
  const max = Math.max(...rows.map(([, c]) => c));
  return (
    <div className={s.stat}>
      <h3>{title}</h3>
      {rows.map(([label, c]) => (
        <div key={label} className={s.bar}>
          <span className={s.barLabel}>{label}</span>
          <span className={s.barTrack}><span style={{ width: `${(c / max) * 100}%` }} /></span>
          <span className={s.barNum}>{c}{total ? <small> · {Math.round((c / total) * 100)}%</small> : null}</span>
        </div>
      ))}
    </div>
  );
}

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
  const stats = formStats(responses);
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
        <div className={s.headActions}>
          <Link href={`/admin/forms/${id}/edit/`} className="btn btn-outline">Edit</Link>
          <form action={copyFormAction}><input type="hidden" name="id" value={id} /><button type="submit" className="btn btn-outline">Copy</button></form>
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

      {stats.total > 0 && (
        <div className={s.card} style={{ marginTop: 14 }}>
          <h2 className={s.h2}>Dashboard</h2>
          <div className={s.kpis}>
            <div><b>{stats.total}</b><span>Total leads</span></div>
            <div><b>{stats.today}</b><span>Today</span></div>
            <div><b>{stats.withPhone}</b><span>With WhatsApp</span></div>
          </div>
          <div className={s.stats}>
            <Bars title="Leads per day" rows={stats.byDay} />
            <Bars title="Top countries" rows={stats.countries} total={stats.total} />
            <Bars title="Most asked-for products" rows={stats.products} />
            <Bars title="Business type" rows={stats.business} total={stats.total} />
          </div>
        </div>
      )}

      <div className={s.card} style={{ marginTop: 14 }}>
        <h2 className={s.h2}>Latest responses</h2>
        {latest.length === 0 ? <p className={s.meta} style={{ margin: '6px 0 0' }}>No responses yet. They appear here as soon as someone submits.</p> : (
          <div className={s.responses}>
            {latest.map((r) => (
              <div key={r.id} className={s.resp}>
                <b>{r.data.name || r.data.company || 'Response'}</b>
                {line(r) && <span>{line(r)}</span>}
                {r.data.products && <span>{r.data.products}</span>}
                <span>{ist(r.created_at, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                {(waLink(form, r) || r.data.email) && (
                  <div className={s.respActions}>
                    {waLink(form, r) && <a href={waLink(form, r)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">WhatsApp</a>}
                    {r.data.email && <a href={`mailto:${r.data.email}?subject=${encodeURIComponent(`Sunita Agri Exports — ${form.title}`)}&body=${encodeURIComponent(followUp(form, r))}`} className="btn btn-outline btn-sm">Email</a>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {responses.length > 20 && <p className={s.meta} style={{ marginTop: 10 }}>Showing the latest 20 — the Excel file has all {responses.length}.</p>}
      </div>

      <form action={deleteFormAction} className={`${s.card} ${s.danger}`}>
        <input type="hidden" name="id" value={id} />
        <p className={s.meta}>Delete this form and its {responses.length} response{responses.length === 1 ? '' : 's'} for good. Download the Excel first if you need it.</p>
        <ConfirmButton className={s.deleteBtn} message={`Delete “${form.title}” and all ${responses.length} responses? This cannot be undone.`}>Delete form</ConfirmButton>
      </form>
    </div>
  );
}
