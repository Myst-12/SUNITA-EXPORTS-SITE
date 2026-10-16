import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

// Event-form storage. Uses Supabase (Postgres, via its REST API) when SUPABASE_URL and
// SUPABASE_SERVICE_KEY are set; otherwise a local JSON file, which is fine for trying it on
// localhost but is NOT kept on serverless hosts. Schema: docs/forms-setup.md.
const SB_URL = process.env.SUPABASE_URL?.replace(/\/$/, '');
const SB_KEY = process.env.SUPABASE_SERVICE_KEY;
export const usingDatabase = Boolean(SB_URL && SB_KEY);

async function sb(pathAndQuery, init = {}) {
  const res = await fetch(`${SB_URL}/rest/v1/${pathAndQuery}`, {
    ...init,
    cache: 'no-store',
    // New-style secret keys (sb_secret_…) go in `apikey` only; legacy service_role JWTs also as Bearer.
    headers: { apikey: SB_KEY, ...(SB_KEY.startsWith('eyJ') ? { Authorization: `Bearer ${SB_KEY}` } : {}), 'Content-Type': 'application/json', Prefer: 'return=representation', ...init.headers },
  });
  if (!res.ok) throw new Error(`Database error ${res.status}: ${await res.text()}`);
  const text = await res.text(); // inserts with return=minimal come back with an empty body
  return text ? JSON.parse(text) : null;
}

const FILE = path.join(process.cwd(), '.data', 'forms.json');
async function readFile() {
  try { return JSON.parse(await fs.readFile(FILE, 'utf8')); } catch { return { forms: [], responses: [] }; }
}
async function writeFile(db) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(db, null, 2));
}

const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'form';

export async function listForms() {
  if (usingDatabase) {
    const rows = await sb('forms?select=*,responses(count)&order=created_at.desc');
    return rows.map(({ responses, ...f }) => ({ ...f, count: responses?.[0]?.count ?? 0 }));
  }
  const db = await readFile();
  return db.forms
    .map((f) => ({ ...f, count: db.responses.filter((r) => r.form_id === f.id).length }))
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getForm({ id, slug }) {
  if (usingDatabase) {
    const rows = await sb(`forms?select=*&${id ? `id=eq.${encodeURIComponent(id)}` : `slug=eq.${encodeURIComponent(slug)}`}&limit=1`);
    return rows[0] || null;
  }
  const db = await readFile();
  return db.forms.find((f) => (id ? f.id === id : f.slug === slug)) || null;
}

export async function createForm({ title, intro, fields }) {
  const form = {
    id: crypto.randomUUID(),
    slug: `${slugify(title)}-${crypto.randomBytes(2).toString('hex')}`,
    title, intro, fields, status: 'open',
    created_at: new Date().toISOString(), closed_at: null,
  };
  if (usingDatabase) return (await sb('forms', { method: 'POST', body: JSON.stringify(form) }))[0];
  const db = await readFile();
  db.forms.push(form);
  await writeFile(db);
  return form;
}

export async function setFormStatus(id, status) {
  const patch = { status, closed_at: status === 'closed' ? new Date().toISOString() : null };
  if (usingDatabase) return (await sb(`forms?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(patch) }))[0];
  const db = await readFile();
  const f = db.forms.find((x) => x.id === id);
  if (f) Object.assign(f, patch);
  await writeFile(db);
  return f;
}

export async function addResponse(formId, data) {
  const row = { id: crypto.randomUUID(), form_id: formId, data, created_at: new Date().toISOString() };
  if (usingDatabase) return sb('responses', { method: 'POST', body: JSON.stringify(row), headers: { Prefer: 'return=minimal' } });
  const db = await readFile();
  db.responses.push(row);
  await writeFile(db);
}

export async function listResponses(formId) {
  if (usingDatabase) return sb(`responses?select=*&form_id=eq.${encodeURIComponent(formId)}&order=created_at.asc`);
  const db = await readFile();
  return db.responses.filter((r) => r.form_id === formId).sort((a, b) => a.created_at.localeCompare(b.created_at));
}
