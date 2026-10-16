import { getForm, addResponse } from '@/lib/forms/store';

export const dynamic = 'force-dynamic';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req, { params }) {
  const { slug } = await params;
  const form = await getForm({ slug });
  if (!form) return Response.json({ error: 'Form not found.' }, { status: 404 });
  if (form.status !== 'open') return Response.json({ error: 'This form is closed.' }, { status: 410 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') return Response.json({ error: 'Invalid submission.' }, { status: 400 });
  if (body._hp) return Response.json({ ok: true }); // honeypot

  // Keep only this form's questions, trimmed and length-limited.
  const data = {};
  for (const f of form.fields) {
    const v = String(body[f.key] ?? '').trim().slice(0, f.type === 'textarea' ? 2000 : 300);
    if (f.required && !v) return Response.json({ error: `Please fill in “${f.label}”.` }, { status: 400 });
    if (v && f.type === 'email' && !EMAIL.test(v)) return Response.json({ error: 'Please enter a valid email.' }, { status: 400 });
    if (v && f.type === 'select' && !f.options.includes(v)) return Response.json({ error: `Please choose a valid “${f.label}”.` }, { status: 400 });
    data[f.key] = v;
  }
  await addResponse(form.id, data);
  return Response.json({ ok: true });
}
