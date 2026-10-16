import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { getForm } from '@/lib/forms/store';
import { updateFormAction } from '../../../actions';
import FormEditor from '../../../FormEditor';
import s from '../../../admin.module.css';

export default async function EditForm({ params, searchParams }) {
  if (!(await isAdmin())) redirect('/admin/');
  const { id } = await params;
  const { error } = await searchParams;
  const form = await getForm({ id });
  if (!form) notFound();
  return (
    <div className={`container ${s.wrap}`}>
      <Link href={`/admin/forms/${id}/`} className={s.back}>← Back to form</Link>
      <div className={s.head}>
        <div>
          <h1>Edit form</h1>
          <p className={s.sub}>The link and QR code stay the same. Answers already collected are kept.</p>
        </div>
      </div>
      <FormEditor action={updateFormAction} form={form} error={error} submitLabel="Save changes" />
    </div>
  );
}
