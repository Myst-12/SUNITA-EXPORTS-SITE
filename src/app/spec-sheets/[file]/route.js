import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { getAllProducts, getProduct, productUrl } from '@/data/products';
import { COMPANY, CONTACT, CERTIFICATIONS, SITE_URL } from '@/config/site';
import { containerLoadText, ON_REQUEST, SPEC_ON_REQUEST, SPEC_DISCLAIMER, FEED_NOTE, REGULATED_NOTE, FMCG_NOTE } from '@/lib/productDetails';

// One PDF technical specification per product, generated at build time (no external service).
// Layout follows the client's approved sample: identity table + photo, numbered sections, green-headed tables.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ file: `${p.slug}.pdf` }));
}

const GREEN = rgb(8 / 255, 102 / 255, 57 / 255);
const INK = rgb(0.1, 0.12, 0.11);
const MUTED = rgb(0.38, 0.42, 0.4);
const LINE = rgb(0.82, 0.85, 0.83);
const SOFT = rgb(0.955, 0.965, 0.958);
const WHITE = rgb(1, 1, 1);
const A4 = [595.28, 841.89];
const M = 36; // page margin
const W = A4[0] - 2 * M;
const FOOT = 64; // space reserved for the footer block

let logoBytes;
const issued = new Date();
const issuedLabel = issued.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

async function photoJpeg(p) {
  if (!p.image) return null;
  try {
    return await sharp(path.join(process.cwd(), 'public', p.image)).resize(480, 480, { fit: 'cover' }).jpeg({ quality: 82 }).toBuffer();
  } catch {
    return null;
  }
}

/** Stable document reference, e.g. SAE/SPEC/2026/DRIED-042. */
function docRef(p) {
  const index = getAllProducts().findIndex((x) => x.slug === p.slug) + 1;
  const stem = p.slug.split('-')[0].toUpperCase().slice(0, 8);
  return `SAE/SPEC/${issued.getFullYear()}/${stem}-${String(index).padStart(3, '0')}`;
}

function keyFeatures(p) {
  if (p.type === 'fmcg') {
    return [
      'Sourced from established Indian manufacturers we are authorised to supply.',
      'Export shelf life checked at dispatch; labelling for the destination market.',
      'Consolidated with bulk products in one mixed 20 ft or 40 ft container.',
      'Private label and custom pack sizes available on request.',
    ];
  }
  return [
    'Machine-cleaned and graded to buyer specification (destoner, gravity separator, Sortex).',
    p.steamSterilized && 'Steam sterilisation available for the USA, EU, Australia and New Zealand.',
    'Certificate of analysis for every lot; third-party inspection on request.',
    'Bulk, retail or private-label packing; can ship alone or in a mixed container.',
  ].filter(Boolean);
}

async function buildPdf(p) {
  const doc = await PDFDocument.create();
  doc.setTitle(`${p.name} — Technical specification — ${COMPANY.name}`);
  doc.setAuthor(COMPANY.legalName);
  doc.setSubject(`${p.name} export specification`);
  doc.setCreator(COMPANY.name);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const italic = await doc.embedFont(StandardFonts.HelveticaOblique);
  logoBytes ||= await readFile(path.join(process.cwd(), 'public/images/logo-mark.png'));
  const logo = await doc.embedPng(logoBytes);
  const photoBytes = await photoJpeg(p);
  const photo = photoBytes ? await doc.embedJpg(photoBytes) : null;

  // Standard PDF fonts only cover WinAnsi; swap anything else for a safe character.
  const safe = (f, s) => [...String(s)].map((ch) => { try { f.widthOfTextAtSize(ch, 10); return ch; } catch { return '-'; } }).join('');
  const wrap = (f, size, text, width) => {
    const lines = [];
    for (const para of safe(f, text).split('\n')) {
      let line = '';
      for (const word of para.split(/\s+/)) {
        const next = line ? `${line} ${word}` : word;
        if (f.widthOfTextAtSize(next, size) > width && line) { lines.push(line); line = word; } else line = next;
      }
      lines.push(line);
    }
    return lines;
  };
  const text = (pg, s, x, yy, size, f = font, color = INK) => pg.drawText(safe(f, s), { x, y: yy, size, font: f, color });
  const right = (pg, s, xr, yy, size, f = font, color = INK) => text(pg, s, xr - f.widthOfTextAtSize(safe(f, s), size), yy, size, f, color);

  let page, y;

  const newPage = () => {
    page = doc.addPage(A4);
    const top = A4[1] - M;
    page.drawImage(logo, { x: M, y: top - 34, width: 34, height: 34 });
    text(page, COMPANY.legalName.toUpperCase(), M + 44, top - 15, 13.5, bold, GREEN);
    text(page, `${COMPANY.status} · ISO 22000, FSSAI & APEDA · Mumbai, India · Since ${COMPANY.foundingYear}`, M + 44, top - 29, 7.8, font, MUTED);
    right(page, 'PRODUCT TECHNICAL SPECIFICATION', A4[0] - M, top - 12, 8.5, bold, GREEN);
    right(page, `Doc Ref: ${docRef(p)}`, A4[0] - M, top - 24, 7.5, font, MUTED);
    right(page, `Rev: 01 · Issued: ${issuedLabel}`, A4[0] - M, top - 34, 7.5, font, MUTED);
    page.drawRectangle({ x: M, y: top - 44, width: W, height: 1.6, color: GREEN });
    y = top - 58;
  };
  const ensure = (h) => { if (y - h < M + FOOT) newPage(); };

  const paragraph = (s, { f = font, size = 8.8, color = INK, gap = 3.4, indent = 0 } = {}) => {
    for (const line of wrap(f, size, s, W - indent)) {
      ensure(size + gap);
      text(page, line, M + indent, y, size, f, color);
      y -= size + gap;
    }
  };

  const heading = (s) => {
    ensure(44);
    y -= 6;
    text(page, s.toUpperCase(), M, y, 9.5, bold, GREEN);
    page.drawRectangle({ x: M, y: y - 4, width: W, height: 0.7, color: GREEN });
    y -= 14;
  };

  /** Two-column table. `head` adds a green header row (sample style). */
  const table = (rows, { head, labelW = 190, size = 8.4 } = {}) => {
    const pad = 3.6, lh = size + 2.4;
    const row = (k, v, { header = false, shade = false } = {}) => {
      const kf = header ? bold : font;
      const kl = wrap(kf, size, k, labelW - 2 * pad);
      const vl = wrap(header ? bold : font, size, v, W - labelW - 2 * pad);
      const h = Math.max(kl.length, vl.length) * lh + 2 * pad - 1;
      ensure(h);
      const top = y;
      if (header) page.drawRectangle({ x: M, y: top - h, width: W, height: h, color: GREEN });
      else if (shade) page.drawRectangle({ x: M, y: top - h, width: labelW, height: h, color: SOFT });
      page.drawRectangle({ x: M, y: top - h, width: W, height: 0.5, color: LINE });
      kl.forEach((l, j) => text(page, l, M + pad, top - pad - size + 1 - j * lh, size, kf, header ? WHITE : MUTED));
      vl.forEach((l, j) => text(page, l, M + labelW + pad, top - pad - size + 1 - j * lh, size, header ? bold : font, header ? WHITE : INK));
      y -= h;
    };
    if (head) row(head[0], head[1], { header: true });
    rows.forEach(([k, v]) => row(k, v, { shade: true }));
    y -= 6;
  };

  newPage();

  // ---- Identity block: 4 columns of label/value pairs + product photo ----
  const load = containerLoadText(p);
  const category = p.subcategoryName && p.subcategoryName !== p.categoryName ? `${p.categoryName} · ${p.subcategoryName}` : p.categoryName;
  const origin = p.origin ? (/^india|blended|roasted/i.test(p.origin) ? p.origin : `India (${p.origin})`) : 'India';
  const left = [
    ['Product Name', p.name],
    ['Botanical Name', p.botanicalName || '—'],
    ['Category / Class', category],
    [p.type === 'fmcg' ? 'Pack Types' : 'Commercial Form', p.forms.length ? p.forms.join(', ') : ON_REQUEST],
    ['Sourcing Origin', origin],
  ];
  const rightCol = [
    ['Product Code', `SAE-${p.slug.toUpperCase()}`],
    ['HS Code', p.hsCode || ON_REQUEST],
    ['Shelf Life', p.shelfLife || ON_REQUEST],
    ['Minimum Order', p.type === 'fmcg' ? 'Mixed container' : '1 MT or mixed load'],
    ['Port & Terms', 'Nhava Sheva · FOB/CFR/CIF'],
  ];
  const photoW = photo ? 108 : 0;
  const gridW = W - (photo ? photoW + 10 : 0);
  const colW = gridW / 2;
  const lw = 80, size = 7.8, pad = 3.6, lh = 9.6;
  const rowsH = left.map((l, i) => {
    const a = wrap(font, size, l[1], colW - lw - 2 * pad).length;
    const b = wrap(font, size, rightCol[i][1], colW - lw - 2 * pad).length;
    return Math.max(a, b, 1) * lh + 2 * pad;
  });
  const gridH = rowsH.reduce((a, b) => a + b, 0);
  const boxH = Math.max(gridH, photoW);
  const top = y;
  page.drawRectangle({ x: M, y: top - boxH, width: gridW, height: boxH, borderColor: LINE, borderWidth: 0.6 });
  let ry = top;
  left.forEach((l, i) => {
    const h = rowsH[i] + (i === left.length - 1 ? boxH - gridH : 0);
    [[l, M], [rightCol[i], M + colW]].forEach(([[k, v], x]) => {
      page.drawRectangle({ x, y: ry - h, width: lw, height: h, color: SOFT });
      text(page, k, x + pad, ry - pad - size + 1, size, bold, MUTED);
      wrap(font, size, v, colW - lw - 2 * pad).forEach((line, j) => text(page, line, x + lw + pad, ry - pad - size + 1 - j * lh, size, font, INK));
    });
    if (i > 0) page.drawRectangle({ x: M, y: ry, width: gridW, height: 0.5, color: LINE });
    ry -= h;
  });
  page.drawRectangle({ x: M + colW, y: top - boxH, width: 0.5, height: boxH, color: LINE });
  if (photo) {
    page.drawImage(photo, { x: A4[0] - M - photoW, y: top - photoW, width: photoW, height: photoW });
    if (boxH > photoW) y = top - boxH; else y = top - photoW;
  } else {
    y = top - boxH;
  }
  y -= 6;

  // ---- 1. General information ----
  heading('1. General product information & commercial profile');
  if (p.botanicalName && p.type !== 'fmcg') {
    paragraph(`${p.name} — ${p.botanicalName}`, { f: italic, size: 8.8, color: GREEN });
  }
  paragraph(p.description);
  y -= 4;
  const general = [
    p.grades.length > 0 && ['Commercial varieties / grades', p.grades.join(', ')],
    p.forms.length > 0 && [p.type === 'fmcg' ? 'Pack types' : 'Forms available', p.forms.join(', ')],
  ].filter(Boolean);
  table(general);
  const notes = [p.feedOnly && FEED_NOTE, p.regulated && REGULATED_NOTE, p.type === 'fmcg' && FMCG_NOTE].filter(Boolean);
  notes.forEach((n) => paragraph(`Note: ${n}`, { f: bold, size: 8 }));

  // ---- 2. Specifications ----
  const specs = Object.entries(p.specifications);
  heading('2. Physical & chemical specifications');
  if (specs.length) {
    table(specs, { head: ['Parameter', 'Typical value / export limit'] });
    paragraph(SPEC_DISCLAIMER, { size: 7.5, color: MUTED });
  } else {
    paragraph(SPEC_ON_REQUEST);
  }

  // ---- 3. Packing & logistics ----
  heading('3. Packing & shipping logistics');
  table([
    ['Standard export packaging', p.packaging.join('; ')],
    ['Custom / private label', 'Retail packs, custom bags and cartons with your artwork, language and barcodes'],
    p.type !== 'fmcg' && ['20 ft FCL container load', load.twenty],
    p.type !== 'fmcg' && ['40 ft FCL container load', load.forty],
    ['Storage conditions', p.type === 'fmcg' ? 'As stated on the pack label' : 'Cool, dry, well-ventilated store away from direct sunlight and moisture'],
    ['Product shelf life', p.shelfLife || ON_REQUEST],
  ].filter(Boolean));

  // ---- 4. Key quality features ----
  heading('4. Key quality features');
  keyFeatures(p).forEach((f) => {
    const lines = wrap(font, 8.6, f, W - 12);
    ensure(lines.length * 12);
    page.drawCircle({ x: M + 3, y: y + 2.6, size: 1.6, color: GREEN });
    lines.forEach((l, j) => text(page, l, M + 12, y - j * 12, 8.6));
    y -= lines.length * 12 + 1;
  });
  y -= 6;
  ensure(30);
  const acc = wrap(font, 7.8, `Accreditations & compliance: ${CERTIFICATIONS.map((c) => c.name).join(' · ')}. Pre-shipment inspection and certificate of analysis on request.`, W);
  acc.forEach((l, j) => {
    if (j === 0) {
      text(page, 'Accreditations & compliance:', M, y, 7.8, bold, INK);
      text(page, l.replace('Accreditations & compliance:', ''), M + bold.widthOfTextAtSize('Accreditations & compliance:', 7.8), y, 7.8, font, INK);
    } else text(page, l, M, y, 7.8, font, INK);
    y -= 10.5;
  });

  // ---- Footer on every page ----
  const pages = doc.getPages();
  pages.forEach((pg, i) => {
    const fy = M + 40;
    pg.drawRectangle({ x: M, y: fy + 12, width: W, height: 0.8, color: GREEN });
    text(pg, 'Issued by:', M, fy, 7.6, bold, INK);
    text(pg, 'Quality Assurance & Export Documentation Desk', M, fy - 10, 7.6, font, MUTED);
    text(pg, `${COMPANY.legalName}, Mumbai, India`, M, fy - 20, 7.6, font, MUTED);
    const cx = A4[0] / 2 + 20;
    text(pg, 'Trade desk:', cx, fy, 7.6, bold, INK);
    text(pg, `Email: ${CONTACT.email} · WhatsApp: ${CONTACT.quotePhone.display}`, cx, fy - 10, 7.6, font, MUTED);
    text(pg, `Web: ${SITE_URL.replace(/^https?:\/\//, '')}`, cx, fy - 20, 7.6, font, MUTED);
    const line = `${SITE_URL}${productUrl(p)} · © ${issued.getFullYear()} ${COMPANY.legalName} · Page ${i + 1} of ${pages.length}`;
    text(pg, line, M, M - 4, 6.8, font, MUTED);
  });

  return doc.save();
}

export async function GET(_req, { params }) {
  const { file } = await params;
  const p = getProduct(file.replace(/\.pdf$/, ''));
  if (!p || !file.endsWith('.pdf')) return new Response('Not found', { status: 404 });
  const bytes = await buildPdf(p);
  return new Response(bytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${p.slug}-specification-sunita-agri-exports.pdf"`,
    },
  });
}
