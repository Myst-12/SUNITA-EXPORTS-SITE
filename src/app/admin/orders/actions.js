'use server';

import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { setOrderStatus } from '@/lib/shop/store';
import { STATUSES, statusLabel } from '@/lib/shop/catalog';

export async function setOrderStatusAction(formData) {
  if (!(await isAdmin())) redirect('/admin/');
  const status = String(formData.get('status'));
  const back = String(formData.get('back') || '');
  const filter = STATUSES.some((t) => t.key === back) ? `status=${back}&` : '';
  if (!STATUSES.some((t) => t.key === status)) redirect(`/admin/orders/?${filter}`);
  const order = await setOrderStatus(String(formData.get('id')), status);
  redirect(`/admin/orders/?${filter}note=${encodeURIComponent(order ? `${order.number} is now ${statusLabel(status).toLowerCase()}.` : 'Order not found.')}`);
}
