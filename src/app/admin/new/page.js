import { redirect } from 'next/navigation';

// Old address of the form editor (before the admin had more than one tool).
export default function OldNewForm() {
  redirect('/admin/forms/new/');
}
