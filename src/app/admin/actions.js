'use server';

import { redirect } from 'next/navigation';
import { isAdmin, passwordMatches, startSession, endSession } from '@/lib/forms/auth';
import { createForm, getForm, setFormStatus, listResponses, deleteForm } from '@/lib/forms/store';
import { buildFields, FIELD_LIBRARY } from '@/lib/forms/fields';
import { buildWorkbook, excelName } from '@/lib/forms/excel';
import { emailWorkbook } from '@/lib/forms/mail';

async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/');
}

export async function login(formData) {
  if (!passwordMatches(formData.get('password') || '')) redirect('/admin/?error=1');
  await startSession();
  redirect('/admin/');
}

export async function logout() {
  await endSession();
  redirect('/admin/');
}

export async function createFormAction(formData) {
  await requireAdmin();
  const title = String(formData.get('title') || '').trim().slice(0, 120);
  if (!title) redirect('/admin/new/?error=title');
  const selected = formData.getAll('field').map(String);
  const required = FIELD_LIBRARY.filter((f) => formData.get(`req_${f.key}`)).map((f) => f.key);
  const fields = buildFields(selected, required, String(formData.get('custom') || '').split('\n'));
  if (!fields.length) redirect('/admin/new/?error=fields');
  const form = await createForm({ title, intro: String(formData.get('intro') || '').trim().slice(0, 600), fields });
  redirect(`/admin/forms/${form.id}/`);
}

// Closing a form stops new responses and immediately emails the Excel file.
export async function closeFormAction(formData) {
  await requireAdmin();
  const id = String(formData.get('id'));
  const form = await setFormStatus(id, 'closed');
  if (!form) redirect('/admin/');
  const responses = await listResponses(id);
  const result = await emailWorkbook({ form, count: responses.length, buffer: await buildWorkbook(form, responses), filename: excelName(form) });
  redirect(`/admin/forms/${id}/?note=${encodeURIComponent(`Form closed. ${result.note}`)}`);
}

export async function reopenFormAction(formData) {
  await requireAdmin();
  const id = String(formData.get('id'));
  if (!(await getForm({ id }))) redirect('/admin/');
  await setFormStatus(id, 'open');
  redirect(`/admin/forms/${id}/?note=${encodeURIComponent('Form reopened — it is accepting responses again.')}`);
}

export async function deleteFormAction(formData) {
  await requireAdmin();
  const id = String(formData.get('id'));
  const form = await getForm({ id });
  if (form) await deleteForm(id);
  redirect(`/admin/?note=${encodeURIComponent(form ? `“${form.title}” and its responses were deleted.` : 'Form already deleted.')}`);
}
