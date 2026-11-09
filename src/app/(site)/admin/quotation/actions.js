'use server';

import crypto from 'crypto';
import { isAdmin } from '@/lib/forms/auth';
import { TAB } from '@/lib/costing/heads';
import { getOptions, saveOptions } from '@/lib/costing/store';

// Called from the calculator: each returns the row's options after the change, or { error }.
const rowOf = (tab, row) => TAB[tab]?.heads.some((h) => h.key === row);

export async function addOptionAction(tab, row, label, amount) {
  if (!(await isAdmin())) return { error: 'Please log in again.' };
  if (!rowOf(tab, row)) return { error: 'Unknown cost.' };
  const name = String(label || '').trim().slice(0, 80);
  const value = Number(amount);
  if (!name) return { error: 'Give it a name.' };
  if (!Number.isFinite(value) || value < 0) return { error: 'Enter the amount in ₹.' };
  try {
    const all = await getOptions();
    const option = { id: crypto.randomUUID().slice(0, 8), label: name, amount: value };
    const list = [...(all[tab]?.[row] || []), option];
    await saveOptions({ ...all, [tab]: { ...all[tab], [row]: list } });
    return { options: list, added: option.id };
  } catch (e) {
    console.error(e);
    return { error: 'Could not save. Try again.' };
  }
}

export async function removeOptionAction(tab, row, id) {
  if (!(await isAdmin())) return { error: 'Please log in again.' };
  if (!rowOf(tab, row)) return { error: 'Unknown cost.' };
  try {
    const all = await getOptions();
    const list = (all[tab]?.[row] || []).filter((o) => o.id !== id);
    await saveOptions({ ...all, [tab]: { ...all[tab], [row]: list } });
    return { options: list };
  } catch (e) {
    console.error(e);
    return { error: 'Could not remove. Try again.' };
  }
}
