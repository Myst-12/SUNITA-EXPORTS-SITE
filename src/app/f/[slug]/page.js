import { notFound } from 'next/navigation';
import { getForm } from '@/lib/forms/store';
import { COMPANY } from '@/config/site';
import EventForm from './EventForm';
import s from './event.module.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const form = await getForm({ slug });
  return { title: form?.title || 'Form', robots: { index: false, follow: false } };
}

export default async function PublicForm({ params }) {
  const { slug } = await params;
  const form = await getForm({ slug });
  if (!form) notFound();
  const open = form.status === 'open';
  return (
    <div className={`container ${s.wrap}`}>
      <div className={s.card}>
        <span className={s.brand}>{COMPANY.name}</span>
        <h1 className={s.title}>{form.title}</h1>
        {form.intro && <p className={s.intro}>{form.intro}</p>}
        {open ? <EventForm slug={form.slug} fields={form.fields} /> : (
          <p className={s.closed}>This form is closed. Thank you for your interest — please contact us on WhatsApp or by email.</p>
        )}
      </div>
    </div>
  );
}
