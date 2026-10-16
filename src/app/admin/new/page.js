import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { createFormAction } from '../actions';
import FormEditor from '../FormEditor';
import s from '../admin.module.css';

export default async function NewForm({ searchParams }) {
  if (!(await isAdmin())) redirect('/admin/');
  const { error } = await searchParams;
  return (
    <div className={`container ${s.wrap}`}>
      <Link href="/admin/" className={s.back}>← All forms</Link>
      <div className={s.head}>
        <div>
          <h1>New form</h1>
          <p className={s.sub}>Visitors see the heading and the questions you tick, in their own language.</p>
        </div>
      </div>
      <FormEditor action={createFormAction} error={error} submitLabel="Create form" />
    </div>
  );
}
