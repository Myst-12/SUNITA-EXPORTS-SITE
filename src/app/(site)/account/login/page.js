import AuthPage from '../AuthPage';

export const metadata = { title: 'Log in', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default function LoginPage({ searchParams }) {
  return <AuthPage mode="login" searchParams={searchParams} />;
}
