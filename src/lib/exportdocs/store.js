import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { sb, usingDatabase } from '@/lib/forms/store';

// Export-document shipments and masters. Both live in the Supabase table `shipments` (docs/export-docs-setup.md):
// masters are rows whose data has rec = 'master'. Without the database, a local JSON file (localhost only).
const FILE = path.join(process.cwd(), '.data', 'shipments.json');
const readFile = async () => { try { return JSON.parse(await fs.readFile(FILE, 'utf8')); } catch { return []; } };
const writeFile = async (rows) => { await fs.mkdir(path.dirname(FILE), { recursive: true }); await fs.writeFile(FILE, JSON.stringify(rows)); };

const toShipment = (row) => ({ ...row.data, id: row.id, createdAt: row.created_at, updatedAt: row.updated_at });

async function listRows(master) {
  if (usingDatabase) return sb(`shipments?select=id,data,created_at,updated_at&data->>rec=${master ? 'eq.master' : 'is.null'}&order=updated_at.desc`);
  return (await readFile()).filter((r) => (r.data.rec === 'master') === master).sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

export async function listShipments() {
  return (await listRows(false)).map(toShipment);
}

/** Every master, newest first: { id, type, ...fields }. */
export async function listMasters() {
  return (await listRows(true)).map((r) => { const { rec: _r, ...m } = r.data; return { ...m, id: r.id }; });
}
export async function saveMaster(id, type, fields) {
  const { id: _i, rec: _r, type: _t, ...clean } = fields;
  return saveShipment(id, { ...clean, rec: 'master', type });
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
