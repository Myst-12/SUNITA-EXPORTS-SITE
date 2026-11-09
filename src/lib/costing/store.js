import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { sb, usingDatabase } from '@/lib/forms/store';

// The client's saved options for each cost row of the quotation calculator, kept as one JSON value:
// { [tab]: { [row]: [{ id, label, amount }] } }. These are his internal costs, so they live in the database,
// never in the code. Table: docs/costing-setup.md.
const KEY = 'quote-options';
const FILE = path.join(process.cwd(), '.data', 'quote-options.json');

export async function getOptions() {
  if (usingDatabase) return (await sb(`admin_data?select=value&key=eq.${KEY}&limit=1`))[0]?.value || {};
  try { return JSON.parse(await fs.readFile(FILE, 'utf8')); } catch { return {}; }
}

export async function saveOptions(value) {
  if (usingDatabase) {
    return sb('admin_data?on_conflict=key', {
      method: 'POST',
      body: JSON.stringify({ key: KEY, value, updated_at: new Date().toISOString() }),
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    });
  }
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(value, null, 2));
}
