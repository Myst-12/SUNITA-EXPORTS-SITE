import 'server-only';
import ExcelJS from 'exceljs';
import { EXPORTER as E } from './company';
import { lineCalc, totals, num } from './calc';

// CargoX / Egypt ACID commercial invoice sheet, laid out like the template the buyer's broker sends.
// Quantities go in metric tons (TN); rate is per ton.
export async function buildCargoX(s) {
  const c = s.cargox || {};
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Invoice');
  const date = (v) => (v ? new Date(v) : null);
  const rows = [
    [E.name.toUpperCase(), E.address.join(' '), 'Registration # :', E.gst],
    ['City Code :', E.cityCode, 'Phone:', E.phone],
    ['Commercial Invoice', 'IN-India', 'Web Site :', E.web, 'Fax:', 0],
    ['Exporter Contact :', E.contactName, E.email],
    ['Export To:', String(s.consignee || '').split('\n')[0], 'Importer Contact :', c.contact, c.email, 'Phone:', c.phone],
    [' Address:', String(s.consignee || '').split('\n').slice(1).join(', '), 'Fax:', 0],
    [`${s.destCountry || 'Egypt'} Tax Code :`, c.taxCode, 'ACID #:', c.acid, 'Origin Port:', c.polCode, s.pol],
    ['Purchase Order #:', s.piNo, 'Purchase Order Date:', date(s.piDate), 'Destination Port:', c.podCode, s.pod],
    ['Invoice #:', s.invNo, 'Invoice Date:', date(s.invDate)],
    ['Currency:', s.currency || 'USD', 'Inco Term:', s.incoterm],
    [],
    ['#', 'Product Code', 'TradeMarkOwner/Manufacturer', 'Brand Name', 'Model', 'HS Tariff Code', 'Country of Origin', 'Description', 'Quantity', 'Qty Unit', 'Expiry Date', 'Unit Price', 'Gross Weight', 'Net Weight', 'Weight Unit', 'Total'],
  ];
  rows.forEach((r) => ws.addRow(r));
  ws.getRow(12).font = { bold: true };
  (s.lines || []).map(lineCalc).forEach((l, i) => {
    const hs = String(l.hs || '').replace(/\D/g, '');
    const tn = num(l.net) / 1000;
    ws.addRow([i + 1, hs, E.name.toUpperCase(), c.brand || 'SUNITA', i + 1, hs, 'IN', l.desc, Math.round(tn * 1000) / 1000, 'TN', date(l.exp), tn ? Math.round((l.amount / tn) * 100) / 100 : 0, Math.round(num(l.gross) / 10) / 100, Math.round(tn * 1000) / 1000, 'TN', l.amount]);
  });
  const t = totals(s.lines || []);
  ws.addRow([]);
  ws.addRow(['Invoice Subtotal', t.amount]);
  ws.addRow(['Freight Cost', num(s.freight) || null]);
  ws.addRow(['Insurance Cost', num(s.insurance)]);
  ws.addRow(['Other Costs', 0]);
  ws.addRow(['Total', t.amount]).font = { bold: true };
  ws.columns.forEach((col, i) => { col.width = [6, 14, 30, 12, 8, 14, 10, 30, 10, 8, 12, 11, 12, 11, 10, 13][i] || 14; });
  ws.eachRow((row) => row.eachCell((cell) => { if (cell.value instanceof Date) cell.numFmt = 'yyyy-mm-dd'; }));
  return wb.xlsx.writeBuffer();
}
