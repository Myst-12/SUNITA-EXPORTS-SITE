import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { sb, usingDatabase } from '@/lib/forms/store';

// Buyer accounts and online orders. Same database as the event forms (Supabase, tables `customers` and
// `orders` and `reviews`, schema in docs/forms-setup.md); without it, a local JSON file for trying it on localhost.
export { usingDatabase };

const FILE = path.join(process.cwd(), '.data', 'shop.json');
async function readFile() {
  let db;
  try { db = JSON.parse(await fs.readFile(FILE, 'utf8')); } catch { db = {}; }
  return { customers: [], orders: [], reviews: [], ...db };
}
async function writeFile(db) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(db, null, 2));
}
const q = encodeURIComponent;

export async function getCustomer(id) {
  if (usingDatabase) return (await sb(`customers?select=*&id=eq.${q(id)}&limit=1`))[0] || null;
  return (await readFile()).customers.find((c) => c.id === id) || null;
}

export async function getCustomerByEmail(email) {
  if (usingDatabase) return (await sb(`customers?select=*&email=eq.${q(email)}&limit=1`))[0] || null;
  return (await readFile()).customers.find((c) => c.email === email) || null;
}

export async function createCustomer({ email, name, company, phone, country, password_hash }) {
  const row = { id: crypto.randomUUID(), email, name, company, phone, country, password_hash, created_at: new Date().toISOString() };
  if (usingDatabase) return (await sb('customers', { method: 'POST', body: JSON.stringify(row) }))[0];
  const db = await readFile();
  db.customers.push(row);
  await writeFile(db);
  return row;
}

/** Every buyer, newest first, without password hashes (admin). */
export async function listCustomers() {
  const rows = usingDatabase
    ? await sb('customers?select=id,email,name,company,phone,country,created_at&order=created_at.desc')
    : [...(await readFile()).customers].sort((a, b) => b.created_at.localeCompare(a.created_at));
  return rows.map(({ password_hash: _, ...c }) => c);
}

// SAE-261101-7F3A: date for the human, four hex characters so two orders on one day never clash.
const orderNumber = () => {
  const d = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }).replace(/-/g, '').slice(2);
  return `SAE-${d}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
};

/** customer is a snapshot of the buyer's details at order time, so later profile changes don't rewrite history. */
export async function createOrder({ customer, items, details }) {
  const row = {
    id: crypto.randomUUID(),
    number: orderNumber(),
    customer_id: customer.id,
    customer: { name: customer.name, company: customer.company, email: customer.email, phone: customer.phone, country: customer.country },
    items, details, status: 'new',
    created_at: new Date().toISOString(),
  };
  if (usingDatabase) return (await sb('orders', { method: 'POST', body: JSON.stringify(row) }))[0];
  const db = await readFile();
  db.orders.push(row);
  await writeFile(db);
  return row;
}

/** Orders newest first; all of them (admin) or one buyer's. */
export async function listOrders({ customerId } = {}) {
  if (usingDatabase) return sb(`orders?select=*${customerId ? `&customer_id=eq.${q(customerId)}` : ''}&order=created_at.desc`);
  const db = await readFile();
  return db.orders.filter((o) => !customerId || o.customer_id === customerId).sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function setOrderStatus(id, status) {
  if (usingDatabase) return (await sb(`orders?id=eq.${q(id)}`, { method: 'PATCH', body: JSON.stringify({ status }) }))[0];
  const db = await readFile();
  const o = db.orders.find((x) => x.id === id);
  if (o) o.status = status;
  await writeFile(db);
  return o;
}

// Reviews: one per order, by the buyer who placed it. The buyer's details are a snapshot, like orders.
export async function createReview({ customer, order, rating, body, showCompany }) {
  const row = {
    id: crypto.randomUUID(),
    customer_id: customer.id,
    order_id: order.id,
    order_number: order.number,
    customer: { name: customer.name, company: customer.company, email: customer.email, country: customer.country },
    show_company: showCompany,
    rating, body, status: 'pending',
    created_at: new Date().toISOString(),
  };
  if (usingDatabase) return (await sb('reviews', { method: 'POST', body: JSON.stringify(row) }))[0];
  const db = await readFile();
  db.reviews.push(row);
  await writeFile(db);
  return row;
}

/** Reviews newest first; all of them (admin) or one buyer's. */
export async function listReviews({ customerId } = {}) {
  if (usingDatabase) return sb(`reviews?select=*${customerId ? `&customer_id=eq.${q(customerId)}` : ''}&order=created_at.desc`);
  const db = await readFile();
  return db.reviews.filter((r) => !customerId || r.customer_id === customerId).sort((a, b) => b.created_at.localeCompare(a.created_at));
}

/** Published reviews for the public pages, trimmed to what is shown (no emails). Cached for 10 minutes. */
export async function listPublishedReviews() {
  const rows = usingDatabase
    ? await sb('reviews?select=id,rating,body,customer,show_company,created_at&status=eq.published&order=created_at.desc', { cache: 'force-cache', next: { revalidate: 600, tags: ['reviews'] } })
    : (await listReviews()).filter((r) => r.status === 'published');
  return rows.map((r) => {
    const [first, ...rest] = String(r.customer?.name || '').trim().split(/\s+/);
    const last = rest.at(-1);
    return {
      id: r.id, rating: r.rating, body: r.body, created_at: r.created_at,
      name: [first, last && `${last[0].toUpperCase()}.`].filter(Boolean).join(' ') || 'Buyer',
      company: r.show_company ? r.customer?.company || '' : '',
      country: r.customer?.country || '',
    };
  });
}

export async function setReviewStatus(id, status) {
  if (usingDatabase) return (await sb(`reviews?id=eq.${q(id)}`, { method: 'PATCH', body: JSON.stringify({ status }) }))[0];
  const db = await readFile();
  const r = db.reviews.find((x) => x.id === id);
  if (r) r.status = status;
  await writeFile(db);
  return r;
}
