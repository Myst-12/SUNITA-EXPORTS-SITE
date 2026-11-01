'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/forms/auth';
import { setReviewStatus } from '@/lib/shop/store';
import { REVIEW_STATUSES } from '@/lib/shop/catalog';

const NOTE = { published: 'Review published on the FMCG page.', hidden: 'Review hidden from the website.', pending: 'Review moved back to “To approve”.' };

export async function setReviewStatusAction(formData) {
  if (!(await isAdmin())) redirect('/admin/');
  const status = String(formData.get('status'));
  const back = String(formData.get('back') || '');
  const filter = REVIEW_STATUSES.some((t) => t.key === back) ? `status=${back}&` : '';
  if (!REVIEW_STATUSES.some((t) => t.key === status)) redirect(`/admin/reviews/?${filter}`);
  const review = await setReviewStatus(String(formData.get('id')), status);
  revalidatePath('/fmcg');
  redirect(`/admin/reviews/?${filter}note=${encodeURIComponent(review ? NOTE[status] : 'Review not found.')}`);
}
