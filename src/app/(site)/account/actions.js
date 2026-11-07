'use server';

import { redirect } from 'next/navigation';
import { accountsConfigured, hashPassword, passwordOk, startCustomerSession, endCustomerSession, safeNext, currentCustomer } from '@/lib/shop/auth';
import { getCustomerByEmail, createCustomer, listOrders, listReviews, createReview } from '@/lib/shop/store';
import { sendReviewAlert } from '@/lib/shop/mail';
import { COUNTRIES } from '@/lib/forms/fields';
import { limited } from '@/lib/rateLimit';

const str = (fd, k, max = 120) => String(fd.get(k) || '').trim().slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WAIT = 'Too many attempts. Please wait a few minutes and try again.';
const DOWN = 'Accounts are not available right now. Please send your order on WhatsApp or email instead.';

export async function signupAction(_prev, fd) {
  const values = { name: str(fd, 'name'), company: str(fd, 'company'), email: str(fd, 'email').toLowerCase(), phone: str(fd, 'phone', 30), country: str(fd, 'country') };
  const fail = (error) => ({ error, values });
  if (!accountsConfigured()) return fail(DOWN);
  if (await limited('signup', 5, 60 * 60e3)) return fail(WAIT);
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
  if (await limited('login', 10, 15 * 60e3)) return fail(WAIT);
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

/** A buyer's review of one of their own orders (not cancelled, not reviewed yet). It waits for approval. */
export async function reviewAction(_prev, fd) {
  const me = await currentCustomer();
  if (!me) redirect('/account/login/');
  const rating = Number(fd.get('rating'));
  const body = String(fd.get('body') || '').trim().slice(0, 1500);
  const values = { rating, body, showCompany: fd.get('show_company') === 'on' };
  const fail = (error) => ({ error, values });
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return fail('Please choose a star rating.');
  if (body.length < 20) return fail('Please write a sentence or two about your order (at least 20 characters).');
  let review;
  try {
    const orderId = String(fd.get('order') || '');
    const order = (await listOrders({ customerId: me.id })).find((o) => o.id === orderId);
    if (!order || order.status === 'cancelled') return fail('This order cannot be reviewed.');
    if ((await listReviews({ customerId: me.id })).some((r) => r.order_id === orderId)) return fail('You have already reviewed this order.');
    review = await createReview({ customer: me, order, rating, body, showCompany: values.showCompany });
  } catch (e) {
    console.error(e);
    return fail('Your review could not be saved just now. Please try again in a minute.');
  }
  await sendReviewAlert(review);
  redirect('/account/?reviewed=1#orders');
}
