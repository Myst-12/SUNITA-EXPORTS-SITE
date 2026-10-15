import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { getAllProducts, getProduct, productUrl } from '@/data/products';
import { COMPANY, CONTACT, SITE_URL, fullAddress } from '@/config/site';
import { detailRows, SPEC_ON_REQUEST, SPEC_DISCLAIMER, FEED_NOTE, REGULATED_NOTE, FMCG_NOTE } from '@/lib/productDetails';

// One PDF specification sheet per product, generated at build time (no external service).
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ file: `${p.slug}.pdf` }));
}

const GREEN = rgb(8 / 255, 102 / 255, 57 / 255);
const INK = rgb(0.07, 0.13, 0.1);
const MUTED = rgb(0.39, 0.44, 0.42);
const LINE = rgb(0.85, 0.89, 0.86);
const SOFT = rgb(0.945, 0.969, 0.945);
const A4 = [595.28, 841.89];
const M = 48; // page margin

let logoBytes;

async function buildPdf(p) {
  const doc = await PDFDocument.create();
  doc.setTitle(`${p.name} — Specification sheet — ${COMPANY.name}`);
  doc.setAuthor(COMPANY.legalName);
  doc.setSubject(`${p.name} export specification`);
  doc.setCreator(COMPANY.name);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const italic = await doc.embedFont(StandardFonts.HelveticaOblique);
  logoBytes ||= await readFile(path.join(process.cwd(), 'public/images/logo-mark.png'));
  const logo = await doc.embedPng(logoBytes);

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

  const W = A4[0] - 2 * M;
  const FOOT = 92;
  let page, y;

  const header = () => {
    page = doc.addPage(A4);
    const top = A4[1] - M;
    page.drawImage(logo, { x: M, y: top - 44, width: 44, height: 44 });
    page.drawText(COMPANY.legalName, { x: M + 56, y: top - 18, size: 15, font: bold, color: GREEN });
    page.drawText(safe(font, `${COMPANY.status} · Mumbai, India · Since ${COMPANY.foundingYear}`), { x: M + 56, y: top - 34, size: 9, font, color: MUTED });
    const label = 'PRODUCT SPECIFICATION SHEET';
    page.drawText(label, { x: A4[0] - M - bold.widthOfTextAtSize(label, 8), y: top - 18, size: 8, font: bold, color: GREEN });
    page.drawRectangle({ x: M, y: top - 58, width: W, height: 2, color: GREEN });
    y = top - 82;
    footer();
  };

  const footer = () => {
    const y0 = M + 46;
    page.drawRectangle({ x: M, y: y0 + 8, width: W, height: 0.6, color: LINE });
    const lines = [
      `${COMPANY.legalName} · ${fullAddress()}`,
      `${CONTACT.phones.map((ph) => ph.display).join(' / ')} · WhatsApp +${CONTACT.whatsapp} · ${CONTACT.email}`,
      `${SITE_URL}${productUrl(p)}`,
    ];
    lines.forEach((l, i) => {
      const t = safe(font, l);
      const size = font.widthOfTextAtSize(t, 8) > W ? 7 : 8;
      page.drawText(t, { x: M, y: y0 - 6 - i * 11, size, font, color: i === 2 ? GREEN : MUTED });
    });
  };

  const ensure = (h) => { if (y - h < M + FOOT) header(); };

  const paragraph = (text, { f = font, size = 10, color = INK, gap = 4, indent = 0 } = {}) => {
    for (const line of wrap(f, size, text, W - indent)) {
      ensure(size + gap);
      page.drawText(line, { x: M + indent, y, size, font: f, color });
      y -= size + gap;
    }
  };

  const heading = (text) => {
    ensure(40);
    y -= 10;
    page.drawText(safe(bold, text), { x: M, y, size: 12, font: bold, color: GREEN });
    y -= 22;
  };

  const table = (rows) => {
    const labelW = 160, pad = 5, size = 9.5, lh = 12;
    rows.forEach(([k, v], i) => {
      const kl = wrap(bold, size, k, labelW - 2 * pad);
      const vl = wrap(font, size, v, W - labelW - 2 * pad);
      const h = Math.max(kl.length, vl.length) * lh + 2 * pad;
      ensure(h);
      const top = y + 10; // y is a text baseline; rows are laid out from their top edge
      if (i % 2 === 0) page.drawRectangle({ x: M, y: top - h, width: W, height: h, color: SOFT });
      kl.forEach((l, j) => page.drawText(l, { x: M + pad, y: top - pad - 8 - j * lh, size, font: bold, color: MUTED }));
      vl.forEach((l, j) => page.drawText(l, { x: M + labelW + pad, y: top - pad - 8 - j * lh, size, font, color: INK }));
      y -= h;
    });
    y -= 8;
  };

  header();

  // Title block
  for (const line of wrap(bold, 20, p.name, W)) { page.drawText(line, { x: M, y, size: 20, font: bold, color: INK }); y -= 24; }
  if (p.botanicalName && p.type !== 'fmcg') { paragraph(p.botanicalName, { f: italic, size: 11, color: GREEN }); }
  y -= 4;
  paragraph(p.description, { size: 10.5, gap: 4.5 });

  const notes = [p.feedOnly && FEED_NOTE, p.regulated && REGULATED_NOTE, p.type === 'fmcg' && FMCG_NOTE].filter(Boolean);
  notes.forEach((t) => { y -= 4; paragraph(`Note: ${t}`, { f: bold, size: 9, color: INK }); });

  heading('Product details');
  table(detailRows(p).filter(([k]) => k !== 'Product'));

  const specs = Object.entries(p.specifications);
  heading(specs.length ? 'Typical specifications' : 'Specifications');
  if (specs.length) {
    table(specs);
    paragraph(SPEC_DISCLAIMER, { size: 8.5, color: MUTED });
  } else {
    paragraph(SPEC_ON_REQUEST, { size: 10 });
  }

  heading('Request a quotation');
  paragraph(`Send grade, packing, quantity and destination port to ${CONTACT.email} or WhatsApp ${CONTACT.quotePhone.display}. We quote FOB, CFR or CIF, usually within 24 hours.`, { size: 10 });
  paragraph(`${SITE_URL}/contact/?product=${encodeURIComponent(p.name)}`, { size: 9, color: GREEN });

  // Page numbers
  const pages = doc.getPages();
  pages.forEach((pg, i) => {
    const t = `Page ${i + 1} of ${pages.length} · Issued ${new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
    pg.drawText(t, { x: A4[0] - M - font.widthOfTextAtSize(t, 7.5), y: M - 6, size: 7.5, font, color: MUTED });
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
