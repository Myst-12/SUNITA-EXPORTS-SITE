import { isAdmin } from '@/lib/forms/auth';
import { logout } from './actions';
import { TOOLS } from './tools';
import AdminNav from './AdminNav';

export const metadata = { title: 'Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

// The bar is only a convenience: every admin page and route still checks isAdmin() itself.
export default async function AdminLayout({ children }) {
  return (
    <>
      {(await isAdmin()) && <AdminNav tools={TOOLS} logout={logout} />}
      {children}
    </>
  );
}
