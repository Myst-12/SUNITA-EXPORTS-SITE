'use server';

import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { getShipment, saveShipment, deleteShipment, listMasters, saveMaster } from '@/lib/exportdocs/store';
import { normalizeShipment, MASTER_TYPES } from '@/lib/exportdocs/workflow';
import { readMessage } from '@/lib/exportdocs/parse';

export async function createShipmentAction(formData) {
  if (!(await isAdmin())) redirect('/admin/');
  const from = String(formData.get('from') || '');
  let data = { title: '', docs: {}, made: {} };
  if (from) {
    const src = await getShipment(from);
    // Copy: the same buyer and products for a repeat order. Starts as a new enquiry from the latest document.
    if (src) {
      const n = normalizeShipment(src);
      const latest = Object.values(n.docs).at(-1);
      if (latest) {
        const { sbNo: _a, sbDate: _b, blNo: _c, blDate: _d, bookingNo: _e, vessel: _f, invNo: _g, piNo: _h, quoteNo: _i, enqNo: _j, receipts: _k, containers: _l, ...keep } = latest;
        data = { title: `${n.title || ''} (copy)`.trim(), docs: { enquiry: keep }, made: { enquiry: new Date().toISOString() } };
      }
    }
  }
  const id = await saveShipment(null, data);
  redirect(`/admin/docs/${id}/`);
}

export async function saveShipmentAction(id, data) {
  if (!(await isAdmin())) return { ok: false, error: 'You are signed out. Log in again in another tab, then save.' };
  try {
    await saveShipment(id, { title: data.title || '', docs: data.docs || {}, made: data.made || {} });
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Could not save. Please try again.' };
  }
}

export async function deleteShipmentAction(formData) {
  if (!(await isAdmin())) redirect('/admin/');
  await deleteShipment(String(formData.get('id')));
  redirect('/admin/docs/?note=Shipment deleted.');
}

// ---- masters ----
export async function saveMasterAction(id, type, fields) {
  if (!(await isAdmin())) return { ok: false, error: 'You are signed out.' };
  if (!MASTER_TYPES[type]) return { ok: false, error: 'Unknown list.' };
  const main = MASTER_TYPES[type].fields[0][0];
  if (!String(fields[main] || '').trim()) return { ok: false, error: `${MASTER_TYPES[type].fields[0][1]} is required.` };
  try {
    const newId = await saveMaster(id || null, type, fields);
    return { ok: true, master: { ...fields, type, id: newId } };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Could not save. Please try again.' };
  }
}

export async function deleteMasterAction(id) {
  if (!(await isAdmin())) return { ok: false, error: 'You are signed out.' };
  await deleteShipment(id);
  return { ok: true };
}

// ---- paste a WhatsApp / email message ----
export async function readMessageAction(kind, text) {
  if (!(await isAdmin())) return { ok: false, error: 'You are signed out.' };
  if (!String(text || '').trim()) return { ok: false, error: 'Paste the message first.' };
  try {
    const result = await readMessage(kind, String(text).slice(0, 20000), await listMasters());
    return { ok: true, result };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Could not read the message. Fill the details by hand.' };
  }
}
