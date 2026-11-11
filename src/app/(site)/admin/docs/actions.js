'use server';

import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { listShipments, getShipment, saveShipment, deleteShipment } from '@/lib/exportdocs/store';
import { blankShipment } from '@/lib/exportdocs/company';
import { nextNumbers } from '@/lib/exportdocs/calc';

export async function createShipmentAction(formData) {
  if (!(await isAdmin())) redirect('/admin/');
  const from = String(formData.get('from') || '');
  const all = await listShipments();
  const today = new Date().toISOString().slice(0, 10);
  let data = { ...blankShipment(), ...nextNumbers(all), piDate: today, invDate: today };
  if (from) {
    const src = await getShipment(from);
    // Copy: same buyer, products and terms; new numbers, dates and empty shipping details.
    if (src) data = { ...src, ...nextNumbers(all), piDate: today, invDate: today, title: `${src.title || ''} (copy)`.trim(), sbNo: '', sbDate: '', blNo: '', blDate: '', bookingNo: '', vessel: '', receipts: [], containers: blankShipment().containers };
  }
  const id = await saveShipment(null, data);
  redirect(`/admin/docs/${id}/`);
}

export async function saveShipmentAction(id, data) {
  if (!(await isAdmin())) return { ok: false, error: 'You are signed out. Log in again in another tab, then save.' };
  try {
    await saveShipment(id, data);
    return { ok: true, at: new Date().toISOString() };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Could not save. Check that the shipments table exists (docs/export-docs-setup.md).' };
  }
}

export async function deleteShipmentAction(formData) {
  if (!(await isAdmin())) redirect('/admin/');
  await deleteShipment(String(formData.get('id')));
  redirect('/admin/docs/?note=Shipment deleted.');
}
