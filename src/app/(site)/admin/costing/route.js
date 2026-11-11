import { NextResponse } from 'next/server';
import { isAdmin, costingTicket } from '@/lib/forms/auth';

// Opens the costing app, already signed in. Without COSTING_SSO_SECRET it opens the app's own login page.
const COSTING_URL = process.env.COSTING_URL || 'https://costing.sunitaexports.com';

export async function GET(request) {
  if (!(await isAdmin())) return NextResponse.redirect(new URL('/admin/', request.url));
  const ticket = costingTicket();
  const res = NextResponse.redirect(ticket ? `${COSTING_URL}/sso/?t=${ticket}` : `${COSTING_URL}/`);
  res.headers.set('Cache-Control', 'no-store');
  return res;
}
