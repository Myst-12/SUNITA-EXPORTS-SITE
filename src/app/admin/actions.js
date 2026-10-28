'use server';

import { redirect } from 'next/navigation';
import { isAdmin, passwordMatches, startSession, endSession } from '@/lib/forms/auth';
import { createForm, getForm, setFormStatus, listResponses, deleteForm, updateForm } from '@/lib/forms/store';
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

// Reads the editor's fields; sends the admin back to `back` with an error if something is missing.
function readEditor(formData, back) {
  const title = String(formData.get('title') || '').trim().slice(0, 120);
  if (!title) redirect(`${back}?error=title`);
  const selected = formData.getAll('field').map(String);
  const required = FIELD_LIBRARY.filter((f) => formData.get(`req_${f.key}`)).map((f) => f.key);
  const fields = buildFields(selected, required, String(formData.get('custom') || '').split('\n'));
  if (!fields.length) redirect(`${back}?error=fields`);
  return { title, intro: String(formData.get('intro') || '').trim().slice(0, 600), fields };
}

export async function createFormAction(formData) {
  await requireAdmin();
  const form = await createForm(readEditor(formData, '/admin/forms/new/'));
  redirect(`/admin/forms/${form.id}/`);
}

export async function updateFormAction(formData) {
  await requireAdmin();
  const id = String(formData.get('id'));
  if (!(await getForm({ id }))) redirect('/admin/');
  await updateForm(id, readEditor(formData, `/admin/forms/${id}/edit/`));
  redirect(`/admin/forms/${id}/?note=${encodeURIComponent('Changes saved.')}`);
}

// Copy = same questions, new link and QR, no responses. Opens the editor so the heading can be changed.
export async function copyFormAction(formData) {
  await requireAdmin();
  const src = await getForm({ id: String(formData.get('id')) });
  if (!src) redirect('/admin/');
  const copy = await createForm({ title: `${src.title} (copy)`.slice(0, 120), intro: src.intro, fields: src.fields });
  redirect(`/admin/forms/${copy.id}/edit/`);
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
  redirect(`/admin/forms/?note=${encodeURIComponent(form ? `“${form.title}” and its responses were deleted.` : 'Form already deleted.')}`);
}
