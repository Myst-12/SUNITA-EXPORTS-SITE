import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { sb, usingDatabase } from '@/lib/forms/store';

// Export-document shipments. Supabase table `shipments` (docs/export-docs-setup.md) when the database is
// configured; otherwise a local JSON file (fine on localhost, not kept on Vercel).
const FILE = path.join(process.cwd(), '.data', 'shipments.json');
const readFile = async () => { try { return JSON.parse(await fs.readFile(FILE, 'utf8')); } catch { return []; } };
const writeFile = async (rows) => { await fs.mkdir(path.dirname(FILE), { recursive: true }); await fs.writeFile(FILE, JSON.stringify(rows)); };

const toShipment = (row) => ({ ...row.data, id: row.id, createdAt: row.created_at, updatedAt: row.updated_at });

export async function listShipments() {
  const rows = usingDatabase
    ? await sb('shipments?select=id,data,created_at,updated_at&order=updated_at.desc')
    : (await readFile()).sort((a, b) => b.updated_at.localeCompare(a.updated_at));
  return rows.map(toShipment);
}

export async function getShipment(id) {
  if (usingDatabase) {
    const rows = await sb(`shipments?id=eq.${encodeURIComponent(id)}&select=id,data,created_at,updated_at`);
    return rows?.[0] ? toShipment(rows[0]) : null;
  }
  const row = (await readFile()).find((r) => r.id === id);
  return row ? toShipment(row) : null;
}

export async function saveShipment(id, data) {
  const { id: _i, createdAt: _c, updatedAt: _u, ...clean } = data;
  const now = new Date().toISOString();
  if (usingDatabase) {
    if (id) {
      await sb(`shipments?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify({ data: clean, updated_at: now }), headers: { Prefer: 'return=minimal' } });
      return id;
    }
    const rows = await sb('shipments', { method: 'POST', body: JSON.stringify({ data: clean }) });
    return rows[0].id;
  }
  const rows = await readFile();
  if (id) {
    const r = rows.find((x) => x.id === id);
    if (r) { r.data = clean; r.updated_at = now; }
  } else {
    id = crypto.randomUUID();
    rows.push({ id, data: clean, created_at: now, updated_at: now });
  }
  await writeFile(rows);
  return id;
}

export async function deleteShipment(id) {
  if (usingDatabase) return sb(`shipments?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE', headers: { Prefer: 'return=minimal' } });
  await writeFile((await readFile()).filter((r) => r.id !== id));
}
