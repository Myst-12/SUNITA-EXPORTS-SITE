'use server';

import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { parseCostingWorkbook } from '@/lib/costing/sheet';
import { saveCosting } from '@/lib/costing/store';

export async function uploadCostingAction(formData) {
  if (!(await isAdmin())) redirect('/admin/');
  const back = (k, msg) => redirect(`/admin/quotation/?${k}=${encodeURIComponent(msg)}`);
  const file = formData.get('sheet');
  if (!file || typeof file === 'string' || !file.size) back('error', 'Choose the filled costing sheet first.');
  const { costing, error } = await parseCostingWorkbook(Buffer.from(await file.arrayBuffer()));
  if (error) back('error', error);
  try {
    await saveCosting({ ...costing, fileName: file.name, uploadedAt: new Date().toISOString() });
  } catch (e) {
    console.error(e);
    back('error', 'Could not save the sheet. If this is the first upload, the admin_data table still needs to be created (docs/costing-setup.md).');
  }
  back('note', 'Costing sheet uploaded. Quotes now use these figures.');
}
