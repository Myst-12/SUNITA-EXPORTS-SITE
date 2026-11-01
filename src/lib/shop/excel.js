import 'server-only';
import ExcelJS from 'exceljs';
import { statusLabel } from './catalog';

const ist = (iso) => new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

function sheet(wb, name, columns, rows) {
  const ws = wb.addWorksheet(name, { views: [{ state: 'frozen', ySplit: 1 }] });
  ws.columns = columns;
  rows.forEach((r) => ws.addRow(r));
  const head = ws.getRow(1);
  head.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  head.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F6B3A' } };
  ws.eachRow((row) => { row.alignment = { vertical: 'top', wrapText: true }; });
  ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: columns.length } };
}

/** Sheet 1: one row per product line, so it filters and pivots by buyer or product. Sheet 2: the buyers. */
export async function buildOrdersWorkbook(orders, customers) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Sunita Agri Exports';
  sheet(wb, 'Orders', [
    { header: 'Order no.', key: 'number', width: 17 },
    { header: 'Placed (IST)', key: 'at', width: 20 },
    { header: 'Status', key: 'status', width: 11 },
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Company', key: 'company', width: 24 },
    { header: 'Email', key: 'email', width: 28 },
    { header: 'Phone', key: 'phone', width: 17 },
    { header: 'Country', key: 'country', width: 16 },
    { header: 'Item code', key: 'code', width: 10 },
    { header: 'Product', key: 'product', width: 28 },
    { header: 'Pack size', key: 'pack', width: 16 },
    { header: 'Brand', key: 'brand', width: 16 },
    { header: 'Quantity', key: 'qty', width: 10 },
    { header: 'Unit', key: 'unit', width: 9 },
    { header: 'Destination port', key: 'port', width: 20 },
    { header: 'Price terms', key: 'incoterm', width: 18 },
    { header: 'Container', key: 'container', width: 20 },
    { header: 'Wanted by', key: 'wanted', width: 13 },
    { header: 'Notes', key: 'notes', width: 40 },
  ], orders.flatMap((o) => o.items.map((it) => ({
    number: o.number, at: ist(o.created_at), status: statusLabel(o.status),
    ...o.customer,
    code: it.code || '', product: it.name, pack: it.pack, brand: it.brand, qty: it.qty, unit: it.unit,
    port: o.details.port, incoterm: o.details.incoterm, container: o.details.container, wanted: o.details.wanted, notes: o.details.notes,
  }))));
  const count = orders.reduce((m, o) => m.set(o.customer_id, (m.get(o.customer_id) || 0) + 1), new Map());
  sheet(wb, 'Buyers', [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Company', key: 'company', width: 24 },
    { header: 'Email', key: 'email', width: 28 },
    { header: 'Phone', key: 'phone', width: 17 },
    { header: 'Country', key: 'country', width: 16 },
    { header: 'Signed up (IST)', key: 'at', width: 20 },
    { header: 'Orders', key: 'orders', width: 9 },
  ], customers.map((c) => ({ ...c, at: ist(c.created_at), orders: count.get(c.id) || 0 })));
  return Buffer.from(await wb.xlsx.writeBuffer());
}

export const ordersExcelName = () => `sunita-orders-${new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })}.xlsx`;

/** A category of the FMCG product list as a sheet buyers can fill in and send back. */
export async function buildCatalogueWorkbook(title, items, { withCategory = false } = {}) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Sunita Agri Exports';
  sheet(wb, 'Products', [
    { header: 'Item code', key: 'key', width: 10 },
    ...(withCategory ? [{ header: 'Category', key: 'catName', width: 24 }] : []),
    { header: 'Brand', key: 'brand', width: 18 },
    { header: 'Product', key: 'product', width: 40 },
    { header: 'Packing', key: 'pack', width: 28 },
    { header: 'Order unit', key: 'unit', width: 10 },
    { header: 'Shelf life (months)', key: 'shelf', width: 10 },
    { header: 'Gross weight per carton (kg)', key: 'wt', width: 12 },
    { header: 'Your quantity', key: 'qty', width: 11 },
  ], items);
  const info = wb.addWorksheet('How to order');
  info.columns = [{ width: 110 }];
  [
    `${title}: ${items.length.toLocaleString('en-IN')} products from Sunita Agri Exports, Mumbai.`,
    '',
    'Fill in "Your quantity" (in cartons or bags, as shown under Order unit) and email the sheet to us, or order online at www.sunitaexports.com/fmcg/catalogue/.',
    'Packing, shelf life and weights are from our supplier list and may change; your proforma invoice confirms them. Brand names belong to their owners.',
  ].forEach((line, i) => { const r = info.addRow([line]); if (i === 0) r.font = { bold: true, size: 13 }; });
  return wb.xlsx.writeBuffer();
}
