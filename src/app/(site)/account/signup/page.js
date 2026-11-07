import AuthPage from '../AuthPage';

export const metadata = { title: 'Create an account', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default function SignupPage({ searchParams }) {
  return <AuthPage mode="signup" searchParams={searchParams} />;
}
