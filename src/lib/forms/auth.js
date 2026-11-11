import 'server-only';
import crypto from 'crypto';
import { cookies } from 'next/headers';

// One shared admin password (ADMIN_PASSWORD). A signed, httpOnly cookie keeps the admin logged in.
const COOKIE = 'sx_admin';
const DAYS = 30;
const secret = () => `${process.env.ADMIN_PASSWORD || ''}:${process.env.ADMIN_SECRET || 'sunita-forms'}`;
const sign = (v) => crypto.createHmac('sha256', secret()).update(v).digest('hex');

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export function passwordMatches(input) {
  const a = Buffer.from(String(input));
  const b = Buffer.from(process.env.ADMIN_PASSWORD || '');
  return adminConfigured() && a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function startSession() {
  const exp = String(Date.now() + DAYS * 864e5);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: DAYS * 86400 });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

// One-minute ticket that signs the admin into the costing app (costing.sunitaexports.com) without its own
// password. Both sides share COSTING_SSO_SECRET; returns null when it isn't set.
export function costingTicket() {
  const key = process.env.COSTING_SSO_SECRET;
  if (!key) return null;
  const payload = `${Date.now() + 60e3}.${crypto.randomBytes(12).toString('hex')}`;
  return `${payload}.${crypto.createHmac('sha256', key).update(payload).digest('hex')}`;
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const v = (await cookies()).get(COOKIE)?.value || '';
  const [exp, sig] = v.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = sign(exp);
  return sig.length === good.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good));
}
