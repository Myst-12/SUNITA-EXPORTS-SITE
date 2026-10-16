import 'server-only';
import ExcelJS from 'exceljs';

/** One row per response, one column per question, plus the submission time. */
export async function buildWorkbook(form, responses) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Sunita Agri Exports';
  const ws = wb.addWorksheet('Responses', { views: [{ state: 'frozen', ySplit: 1 }] });
  ws.columns = [
    { header: 'Submitted (IST)', key: '_at', width: 20 },
    ...form.fields.map((f) => ({ header: f.label, key: f.key, width: f.type === 'textarea' ? 40 : 24 })),
  ];
  const ist = (iso) => new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  for (const r of responses) ws.addRow({ _at: ist(r.created_at), ...r.data });
  const head = ws.getRow(1);
  head.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  head.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F6B3A' } };
  ws.eachRow((row) => { row.alignment = { vertical: 'top', wrapText: true }; });
  ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: ws.columns.length } };
  return Buffer.from(await wb.xlsx.writeBuffer());
}

export const excelName = (form) => `${form.slug}-responses.xlsx`;
