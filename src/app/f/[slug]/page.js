import { notFound } from 'next/navigation';
import { getForm } from '@/lib/forms/store';
import { productOptions, quickPicks } from '@/lib/forms/products';
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
  const hasProducts = form.fields.some((f) => f.key === 'products');
  return (
    <div className={`container ${s.wrap}`}>
      <EventForm
        slug={form.slug}
        title={form.title}
        intro={form.intro}
        brand={COMPANY.name}
        open={form.status === 'open'}
        fields={form.fields}
        products={hasProducts ? productOptions() : []}
        picks={hasProducts ? quickPicks() : []}
      />
    </div>
  );
}
