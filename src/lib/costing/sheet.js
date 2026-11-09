import 'server-only';
import ExcelJS from 'exceljs';
import { TABS, SETTINGS } from './heads';

// The costing sheet the client fills in: the cost heads of their own sheet with an Amount column (one row per
// size where the rate depends on it), a packing list per packing type, and the exchange rate. The product's
// buying price is not here: it changes daily and is typed into the calculator. Downloaded blank (or with the
// current figures) from admin, filled in, uploaded back. Hidden "key" columns let rows be matched on upload
// even if names are edited.

const GREEN = 'FF1F6B3A';
const FILL = 'FFFFF7DD'; // cells to fill in
const costSheet = (t) => `${t.name.replace(' packing', '')} costs`;
const packSheet = (t) => `${t.name.replace(' packing', '')} packing list`;

function styleHead(ws) {
  const head = ws.getRow(1);
  head.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  head.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN } };
  head.alignment = { vertical: 'middle', wrapText: true };
  head.height = 32;
}
const toFill = (cell) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: FILL } }; };

export async function buildCostingWorkbook(costing) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Sunita Agri Exports';

  const read = wb.addWorksheet('Read me');
  read.columns = [{ width: 110 }];
  [
    'Quotation costing sheet',
    '',
    'Fill in the yellow cells, save, and upload this file in admin → Quotation → Upload filled sheet.',
    'All amounts in Indian rupees (₹). Leave a cell empty if you do not know it yet; the calculator lists what is missing.',
    'Put 0 for a cost that is really zero.',
    '',
    '• Bulk costs, Consumer costs, FMCG costs: one amount per cost, in the unit shown. Where a cost depends on',
    '   size (storage, loading, packing labour, thappi…) there is one row per size; the calculator picks the right one.',
    '• The product buying price is not in this sheet: it changes daily, so you type it in the calculator.',
    '• Bulk / Consumer / FMCG packing list: one row per packing you quote in, e.g. "25 kg PP bag, 20 ft".',
    '   Container: 20 ft or 40 ft. The "…?" columns: Yes if that cost applies to this packing.',
    '• Settings: the dollar rate, and the insurance % used for CIF prices.',
    '',
    'Do not delete the hidden columns or rename the tabs.',
  ].forEach((line, i) => { const r = read.addRow([line]); if (i === 0) r.font = { bold: true, size: 14 }; });

  for (const t of TABS) {
    const ws = wb.addWorksheet(costSheet(t), { views: [{ state: 'frozen', ySplit: 1 }] });
    ws.columns = [
      { header: 'Cost', key: 'name', width: 38 },
      { header: 'Unit', key: 'unit', width: 44 },
      { header: 'Amount (₹)', key: 'amount', width: 14 },
      { header: 'key', key: 'key', hidden: true },
      { header: 'Note', key: 'note', width: 50 },
    ];
    for (const h of t.rows) {
      const r = ws.addRow({ name: h.name, unit: h.unit, amount: costing?.rates?.[t.key]?.[h.key] ?? null, key: h.key, note: costing?.notes?.[t.key]?.[h.key] ?? null });
      toFill(r.getCell('amount'));
    }
    styleHead(ws);
  }

  for (const t of TABS) {
    const ws = wb.addWorksheet(packSheet(t), { views: [{ state: 'frozen', ySplit: 1 }] });
    ws.columns = t.packing.map((c) => ({ header: c.name, key: c.key, width: c.key === 'name' ? 30 : Math.max(12, Math.min(22, c.name.length + 2)) }));
    const rows = costing?.packings?.[t.key] || [];
    rows.forEach((p) => ws.addRow(Object.fromEntries(t.packing.map((c) => [c.key, c.yes ? (p[c.key] ? 'Yes' : 'No') : p[c.key] ?? null]))));
    // 30 rows ready to fill, with drop-downs for the container and the Yes/No columns.
    for (let i = 2; i <= Math.max(rows.length + 1, 31); i++) {
      t.packing.forEach((c, j) => {
        const cell = ws.getRow(i).getCell(j + 1);
        toFill(cell);
        if (c.key === 'container') cell.dataValidation = { type: 'list', allowBlank: true, formulae: ['"20 ft,40 ft"'] };
        if (c.yes) cell.dataValidation = { type: 'list', allowBlank: true, formulae: ['"Yes,No"'] };
      });
    }
    styleHead(ws);
  }

  const ss = wb.addWorksheet('Settings');
  ss.columns = [{ header: 'Setting', key: 'name', width: 40 }, { header: 'Value', key: 'value', width: 14 }, { header: 'key', key: 'key', hidden: true }];
  for (const st of SETTINGS) toFill(ss.addRow({ name: st.name, value: costing?.settings?.[st.key] ?? null, key: st.key }).getCell('value'));
  styleHead(ss);

  return Buffer.from(await wb.xlsx.writeBuffer());
}

// Cell → plain value (formulas give their last result, rich text its text).
function val(cell) {
  let v = cell?.value;
  if (v && typeof v === 'object') v = 'result' in v ? v.result : 'richText' in v ? v.richText.map((r) => r.text).join('') : 'text' in v ? v.text : null;
  return v ?? null;
}
function toNum(v) {
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  const s = String(v ?? '').replace(/[₹,\s]|rs\.?|inr/gi, '');
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
const isYes = (v) => /^(y|yes|true|1|✓|✔)$/i.test(String(v ?? '').trim());
const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** Reads a filled costing sheet. Returns { costing, summary } or { error }. */
export async function parseCostingWorkbook(buffer) {
  const wb = new ExcelJS.Workbook();
  try { await wb.xlsx.load(buffer); } catch { return { error: 'Could not open that file. Upload the costing sheet as an .xlsx file.' }; }
  const sheet = (name) => wb.worksheets.find((w) => norm(w.name) === norm(name));
  if (!TABS.some((t) => sheet(costSheet(t)))) {
    return { error: 'This is not the costing sheet. Download the sheet from this page, fill it in and upload that file.' };
  }

  // Rows of a "name | … | value | key" sheet, matched on the hidden key, or on the name if the key is gone.
  const keyed = (ws, list, valueCol, keyCol) => {
    const out = {};
    ws?.eachRow((row, i) => {
      if (i === 1) return;
      const k = String(val(row.getCell(keyCol)) ?? '');
      const item = list.find((h) => h.key === k) || list.find((h) => norm(h.name) === norm(val(row.getCell(1))));
      if (item) out[item.key] = toNum(val(row.getCell(valueCol)));
    });
    return out;
  };

  const rates = Object.fromEntries(TABS.map((t) => [t.key, keyed(sheet(costSheet(t)), t.rows, 3, 4)]));
  const settings = keyed(sheet('Settings'), SETTINGS, 2, 3);
  // Notes the client keeps next to an amount (where a rate came from), kept so they come back on download.
  const notes = Object.fromEntries(TABS.map((t) => {
    const out = {};
    sheet(costSheet(t))?.eachRow((row, i) => {
      const k = String(val(row.getCell(4)) ?? '');
      const note = String(val(row.getCell(5)) ?? '').trim();
      if (i > 1 && note && t.rows.some((r) => r.key === k)) out[k] = note;
    });
    return [t.key, out];
  }));

  const packings = {};
  for (const t of TABS) {
    const ws = sheet(packSheet(t));
    const cols = {};
    ws?.getRow(1).eachCell((cell, i) => {
      const c = t.packing.find((x) => norm(x.name) === norm(val(cell)));
      if (c) cols[c.key] = i;
    });
    const rows = [];
    ws?.eachRow((row, i) => {
      if (i === 1) return;
      const get = (k) => (cols[k] ? val(row.getCell(cols[k])) : null);
      const name = String(get('name') ?? '').trim();
      if (!name) return;
      const p = { id: `${t.key}-${rows.length + 1}`, name, container: String(get('container') ?? '').trim() };
      for (const c of t.packing) if (c.n) p[c.key] = toNum(get(c.key)); else if (c.yes) p[c.key] = isYes(get(c.key));
      rows.push(p);
    });
    packings[t.key] = rows;
  }

  const filled = (o) => Object.values(o).filter((v) => v != null).length;
  const summary = {
    rates: TABS.map((t) => ({ tab: t.name, filled: filled(rates[t.key]), of: t.rows.length })),
    packings: TABS.map((t) => ({ tab: t.name, n: packings[t.key].length })),
  };
  return { costing: { rates, settings, notes, packings, summary }, summary };
}
