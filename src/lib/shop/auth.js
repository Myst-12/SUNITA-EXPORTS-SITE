import 'server-only';
import crypto from 'crypto';
import { promisify } from 'util';
import { cookies } from 'next/headers';
import { getCustomer } from './store';

// Buyer accounts: passwords hashed with scrypt, and a signed httpOnly cookie that holds the customer id.
// The signing secret is CUSTOMER_SECRET, or the admin secret/password when that is not set.
const COOKIE = 'sx_customer';
const DAYS = 60;
const scrypt = promisify(crypto.scrypt);
const secret = () => process.env.CUSTOMER_SECRET || process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || '';
const sign = (v) => crypto.createHmac('sha256', secret()).update(`customer:${v}`).digest('hex');

export const accountsConfigured = () => Boolean(secret());

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = (await scrypt(String(password), salt, 64)).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

export async function passwordOk(password, stored) {
  const [kind, salt, hash] = String(stored || '').split('$');
  if (kind !== 'scrypt' || !salt || !hash) return false;
  const got = await scrypt(String(password), salt, 64);
  const want = Buffer.from(hash, 'hex');
  return got.length === want.length && crypto.timingSafeEqual(got, want);
}

export async function startCustomerSession(id) {
  const value = `${id}.${Date.now() + DAYS * 864e5}`;
  (await cookies()).set(COOKIE, `${value}.${sign(value)}`, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: DAYS * 86400 });
}

export async function endCustomerSession() {
  (await cookies()).delete(COOKIE);
}

/** The logged-in buyer (without the password hash), or null. */
export async function currentCustomer() {
  if (!accountsConfigured()) return null;
  const [id, exp, sig] = ((await cookies()).get(COOKIE)?.value || '').split('.');
  if (!id || !exp || !sig || Number(exp) < Date.now()) return null;
  const good = sign(`${id}.${exp}`);
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null;
  const c = await getCustomer(id).catch(() => null);
  if (!c) return null;
  const { password_hash: _, ...rest } = c;
  return rest;
}

/** Only same-site paths are allowed as the page to return to after logging in. */
export const safeNext = (next) => (typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') ? next : '/account/');
