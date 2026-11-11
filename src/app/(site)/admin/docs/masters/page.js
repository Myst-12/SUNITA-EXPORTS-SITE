import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { listMasters } from '@/lib/exportdocs/store';
import MastersManager from './MastersManager';

export const metadata = { title: 'Masters' };

export default async function MastersPage() {
  if (!(await isAdmin())) redirect('/admin/');
  let masters = [], failed = false;
  try { masters = await listMasters(); } catch (e) { console.error(e); failed = true; }
  return <MastersManager initial={masters} failed={failed} />;
}
