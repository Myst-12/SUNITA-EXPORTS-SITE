// Builds src/data/fmcg/catalogue.json from the FMCG product list Excel (default docs/fmcg-product-list.xlsx).
// Run after the client sends an updated sheet:  node scripts/import-fmcg-list.mjs [path/to/list.xlsx]
// Rows with "Show on website" = No are left out. Names are turned from ALL CAPS into readable title case.
import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

const SRC = process.argv[2] || 'docs/fmcg-product-list.xlsx';
const OUT = 'src/data/fmcg/catalogue.json';

const PACK = { PKTS: 'packets', PKT: 'packets', PICS: 'pieces', PIC: 'pieces', BOTL: 'bottles', 'P.BOTL': 'bottles', 'G.BOTL': 'glass bottles', JARS: 'jars', TINS: 'tins', DOZ: 'dozen', BOX: 'boxes', BOXES: 'boxes', 'T.PACK': 'tetra packs', DABI: 'boxes', POUCH: 'pouches', SETS: 'sets', CUPS: 'cups', TUBS: 'tubs', SLABS: 'slabs', RAVA: 'blocks', KG: 'kg' };
const SIZE = { GM: 'g', ML: 'ml', KG: 'kg', LTR: 'L', LB: 'lb', LBS: 'lb', STICKS: 'sticks', 'T.BAGS': 'tea bags', TABS: 'tablets', TAB: 'tablets', PICS: 'pieces', SACHETS: 'sachets', CAPS: 'capsules', TWIGS: 'twigs', ROLLS: 'rolls', PKTS: 'packets', LEAVES: 'leaves', STRIPS: 'strips', POUCH: 'pouches' };
const OUTER = { CRTN: 'carton', BAGS: 'bag', BAG: 'bag', DRUM: 'drum', JARS: 'jar', TINS: 'tin', PICS: 'piece', BOX: 'box', CAN: 'can', BOTL: 'bottle' };
const PLURAL = { box: 'Boxes', piece: 'Pieces' };
const KEEP_UPPER = new Set(['MDH', 'MTR', 'UT', 'KMA', 'DPS', 'KPS', 'DH', 'RTE', 'II', 'III', 'IV', 'XL', 'XXL', 'BB', 'ORS', 'NO.1', 'NO.2', 'NO.3', 'USA', 'UK', 'MSG', 'HMT', 'IR']);
const UNIT_WORD = { ML: 'ml', GM: 'g', GMS: 'g', KG: 'kg', KGS: 'kg', LTR: 'L', LTRS: 'L', LB: 'lb', LBS: 'lb', MM: 'mm', CM: 'cm' };

const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
function word(w) {
  if (KEEP_UPPER.has(w.replace(/[(),]/g, ''))) return w;
  const bare = w.replace(/[()]/g, '');
  if (UNIT_WORD[bare]) return w.replace(bare, UNIT_WORD[bare]);
  if (/\d/.test(w)) return w.toLowerCase();
  if (/^[A-Z](\.[A-Z])+\.?$/.test(w)) return w; // S.K, P.G
  // Capitalise each part of K-PRA, (ALPHONSO), SP.GARBADDAS; letters after an apostrophe stay lower (CHHEDA'S → Chheda's).
  return w.replace(/[A-Za-z]+/g, (m, i) => (w[i - 1] === "'" ? m.toLowerCase() : cap(m)));
}
const title = (s) => String(s || '').trim().replace(/\s+/g, ' ').split(' ').map(word).join(' ').replace(/ X /g, ' × ').replace(/ And /g, ' and ');
const num = (v) => (v === null || v === undefined || v === '' ? null : Number(v));
const text = (v) => (v === null || v === undefined ? '' : String(v.result ?? v.text ?? v).trim());

function packing({ n, unit, size, sizeUnit, outer }) {
  const o = OUTER[outer] || '';
  const u = PACK[unit] || unit.toLowerCase();
  if (size) return `${n} ${u} × ${size} ${SIZE[sizeUnit] || sizeUnit.toLowerCase()}${o ? ` per ${o}` : ''}`;
  if (unit === 'KG') return `${n} kg ${o || 'bag'}`;
  return `${n} ${n === 1 ? u.replace(/s$/, '') : u}${o ? ` per ${o}` : ''}`;
}
function orderUnit({ unit, outer }) {
  const o = OUTER[outer];
  if (o) return PLURAL[o] || `${cap(o)}s`;
  if (unit === 'KG') return 'Bags';
  return cap(PACK[unit] || unit);
}

const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(SRC);
const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const categories = [];
wb.getWorksheet('Categories').eachRow((row, i) => {
  if (i === 1 || !text(row.getCell(1).value)) return;
  categories.push({ slug: slug(text(row.getCell(1).value)), name: text(row.getCell(1).value), vol: num(row.getCell(3).value) || 2.5, count: 0 });
});
const catIndex = new Map(categories.map((c, i) => [c.name, i]));

const items = [];
const seen = new Map();
const skipped = [];
wb.getWorksheet('Products').eachRow((row, i) => {
  if (i === 1) return;
  const v = (c) => row.getCell(c).value;
  const code = text(v(1));
  if (!code) return;
  if (text(v(13)).toLowerCase() === 'no') return;
  const c = catIndex.get(text(v(2)));
  const n = num(v(5));
  if (c === undefined || !n) { skipped.push(`${code} ${text(v(4))}`); return; }
  const times = (seen.get(code) || 0) + 1;
  seen.set(code, times);
  const key = times > 1 ? `${code}-${times}` : code; // a few codes appear twice in the source list
  const p = { n, unit: text(v(6)).toUpperCase(), size: text(v(7)), sizeUnit: text(v(8)).toUpperCase(), outer: text(v(9)).toUpperCase() };
  categories[c].count++;
  // [key, category index, brand, product, packing, order unit, shelf life months, gross kg per carton]
  items.push([key, c, title(v(3)), title(v(4)), packing(p), orderUnit(p), num(v(10)), num(v(11))]);
});

mkdirSync(path.dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ source: path.basename(SRC), categories, items }));
console.log(`${items.length} products in ${categories.filter((c) => c.count).length} categories → ${OUT}`);
if (skipped.length) console.log(`Skipped ${skipped.length} rows without a category or units per carton:\n  ${skipped.slice(0, 20).join('\n  ')}`);
