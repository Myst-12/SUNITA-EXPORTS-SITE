'use server';

import { redirect } from 'next/navigation';
import { accountsConfigured, hashPassword, passwordOk, startCustomerSession, endCustomerSession, safeNext } from '@/lib/shop/auth';
import { getCustomerByEmail, createCustomer } from '@/lib/shop/store';
import { COUNTRIES } from '@/lib/forms/fields';

const str = (fd, k, max = 120) => String(fd.get(k) || '').trim().slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DOWN = 'Accounts are not available right now. Please send your order on WhatsApp or email instead.';

export async function signupAction(_prev, fd) {
  const values = { name: str(fd, 'name'), company: str(fd, 'company'), email: str(fd, 'email').toLowerCase(), phone: str(fd, 'phone', 30), country: str(fd, 'country') };
  const fail = (error) => ({ error, values });
  if (!accountsConfigured()) return fail(DOWN);
  if (!values.name || !values.company || !values.phone) return fail('Please fill in your name, company and phone number.');
  if (!EMAIL.test(values.email)) return fail('Please enter a valid email address.');
  if (!COUNTRIES.includes(values.country)) return fail('Please choose your country.');
  const password = String(fd.get('password') || '');
  if (password.length < 8) return fail('Your password needs at least 8 characters.');
  let customer;
  try {
    if (await getCustomerByEmail(values.email)) return fail('An account with this email already exists. Log in instead.');
    customer = await createCustomer({ ...values, password_hash: await hashPassword(password) });
  } catch (e) {
    console.error(e);
    return fail(DOWN);
  }
  await startCustomerSession(customer.id);
  redirect(safeNext(String(fd.get('next') || '')));
}

export async function loginAction(_prev, fd) {
  const email = str(fd, 'email').toLowerCase();
  const fail = (error) => ({ error, values: { email } });
  if (!accountsConfigured()) return fail(DOWN);
  let customer;
  try {
    customer = await getCustomerByEmail(email);
  } catch (e) {
    console.error(e);
    return fail(DOWN);
  }
  if (!customer || !(await passwordOk(String(fd.get('password') || ''), customer.password_hash))) return fail('Wrong email or password.');
  await startCustomerSession(customer.id);
  redirect(safeNext(String(fd.get('next') || '')));
}

export async function logoutAction() {
  await endCustomerSession();
  redirect('/account/login/');
}
