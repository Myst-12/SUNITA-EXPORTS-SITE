import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import QRCode from 'qrcode';
import { isAdmin } from '@/lib/forms/auth';
import { getForm } from '@/lib/forms/store';
import { formUrl } from '@/lib/forms/url';
import { COMPANY } from '@/config/site';
import s from '../../../admin.module.css';

// Big QR to hold up at the stand: visitors scan it straight from the phone screen.
export default async function ShowQr({ params }) {
  if (!(await isAdmin())) redirect('/admin/');
  const { id } = await params;
  const form = await getForm({ id });
  if (!form) notFound();
  const qr = await QRCode.toDataURL(await formUrl(form.slug), { width: 900, margin: 1, color: { dark: '#0f3d22' } });
  return (
    <div className={s.show}>
      <p style={{ fontWeight: 700, color: 'var(--green-700)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.8rem' }}>{COMPANY.name}</p>
      <h1>{form.title}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qr} alt="Scan to fill in the form" width={520} height={520} />
      <p>Scan with your phone camera</p>
      <Link href={`/admin/forms/${id}/`} className={s.back}>← Back</Link>
    </div>
  );
}
