import 'server-only';
import { EXPORTER as E, BANK_DOCS } from './company';
import { STAMP } from './stamp';
import { LOGO } from './logo';
import { docLines, totals, containerRows, money, kg, mt, dmy, amountWords, num, CURRENCY } from './calc';

// Each export document as a standalone A4 HTML page. The admin prints it or saves it as PDF from the browser.
export const DOCS = [
  { slug: 'proforma', name: 'Proforma Invoice' },
  { slug: 'custom', name: 'Custom Invoice' },
  { slug: 'commercial', name: 'Commercial Invoice' },
  { slug: 'packing', name: 'Packing List' },
  { slug: 'bl', name: 'BL Draft' },
  { slug: 'boe', name: 'Bill of Exchange' },
  { slug: 'vgm', name: 'VGM' },
  { slug: 'bank', name: 'Bank Covering Letter' },
  { slug: 'selfsealing', name: 'Self Sealing' },
  { slug: 'disposal', name: 'Bank Disposal (Advance Receipt)' },
  { slug: 'cargox', name: 'CargoX Invoice (Excel)', excel: true },
];

const esc = (v) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const br = (v) => esc(v).replace(/\n/g, '<br>');
const cur = (s) => CURRENCY[s.currency] || s.currency || 'US$';

const CSS = `
@page { size: A4; margin: 9mm; }
* { box-sizing: border-box; }
body { margin: 0; font: 9px/1.35 Verdana, Geneva, sans-serif; color: #000; background: #e9e9e6; }
.sheet { width: 192mm; margin: 12px auto; background: #fff; padding: 0; }
.page { padding: 0; }
.page + .page { break-before: page; margin-top: 24px; }
h1.t { text-align: center; font-size: 12px; font-weight: 700; margin: 0 0 3px; letter-spacing: .03em; }
.box { border: 1px solid #000; }
.g { display: grid; }
.c2 { grid-template-columns: 1fr 1fr; }
.cell { border: 1px solid #000; margin: -1px 0 0 -1px; padding: 3px 4px; min-height: 18px; }
.lab { font-size: 7px; color: #222; display: block; }
.val { font-weight: 400; }
b, .b { font-weight: 700; }
.ex { display: flex; gap: 8px; align-items: flex-start; }
.ex img { width: 46px; height: 46px; object-fit: contain; }
.ex .n { font-size: 10px; font-weight: 700; }
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #000; padding: 3px 4px; vertical-align: top; }
th { font-size: 7.5px; font-weight: 700; text-align: center; }
thead { display: table-header-group; }
tr { break-inside: avoid; }
.items td { border-top: 0; border-bottom: 0; }
.items tr:last-child td { border-bottom: 1px solid #000; }
.items .fill td { height: 40px; }
.r { text-align: right; } .ctr { text-align: center; }
.small { font-size: 7.5px; }
.sig { text-align: right; padding: 4px 8px; }
.sig img { width: 190px; display: inline-block; }
.sig .as { font-weight: 700; font-size: 8px; }
.words { font-weight: 700; }
.terms { font-size: 7.4px; line-height: 1.35; }
.terms ol { margin: 2px 0 0; padding-left: 16px; }
.letter { font-size: 10.5px; line-height: 1.55; padding: 14mm 10mm; }
.letter table td { border: 0; padding: 2px 4px; }
.kv td:first-child { width: 46%; }
.bar { position: sticky; top: 0; z-index: 2; display: flex; gap: 10px; align-items: center; justify-content: center; padding: 10px; background: #14251d; color: #fff; font: 600 13px system-ui, sans-serif; }
.bar button, .bar a { font: inherit; padding: 8px 16px; border-radius: 8px; border: 0; background: #c6e86b; color: #14251d; cursor: pointer; text-decoration: none; }
.bar a.ghost { background: transparent; color: #fff; border: 1px solid #ffffff55; }
@media print { body { background: #fff; } .sheet { margin: 0; width: auto; } .bar { display: none; } .page + .page { margin-top: 0; } }
`;

function shell(title, pages, back) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>${esc(title)}</title><style>${CSS}</style></head>
<body><div class="bar"><a class="ghost" href="${esc(back)}">← Back to shipment</a><span>${esc(title)}</span><button onclick="print()">Print / Save as PDF</button></div>
<div class="sheet">${pages.map((p) => `<div class="page">${p}</div>`).join('')}</div></body></html>`;
}

const exporterBlock = (withLogo = true) => `<div class="ex">${withLogo ? `<img src="${LOGO}" alt="">` : ''}<div><div class="n">${esc(E.name)}</div>${E.address.slice(0, 2).map(esc).join('<br>')}<br>${esc(E.address[2])} Phone : ${esc(E.phone)}<br>Email : ${esc(E.email)}</div></div>`;
const exporterLines = () => `<b>${esc(E.name)}</b><br>${E.address.slice(0, 2).map(esc).join('<br>')}<br>${esc(E.address[2])} Phone : ${esc(E.phone)}`;
const sig = (label = 'AUTHORISED SIGNATORY') => `<div class="sig"><img src="${STAMP}" alt="Signature"><div class="as">${label}</div></div>`;
const cell = (lab, val, extra = '') => `<div class="cell" ${extra}><span class="lab">${lab}</span><div class="val">${val || '&nbsp;'}</div></div>`;
const firstLine = (t) => String(t || '').split('\n')[0];
const boldFirst = (t) => { const [a, ...r] = String(t || '').split('\n'); return a ? `<b>${esc(a)}</b>${r.length ? `<br>${br(r.join('\n'))}` : ''}` : '&nbsp;'; };

function qtyUnit(lines) {
  const b = [...new Set(lines.map((l) => l.basis))];
  return b.length === 1 ? (b[0] === 'PKG' ? 'PKGS' : b[0]) : 'MT';
}
const qtyFmt = (l, mixed) => (l.basis === 'PKG' ? `${l.qty}${mixed ? ' PKGS' : ''}` : l.basis === 'KG' ? `${kg(l.qty)}${mixed ? ' KG' : ''}` : `${mt(l.qty)}${mixed ? ' MT' : ''}`);
const rateHead = (lines, s) => { const b = [...new Set(lines.map((l) => l.basis))]; return `Rate ${b.length === 1 ? (b[0] === 'MT' ? 'Per MT' : b[0] === 'KG' ? 'Per KG' : 'Per Pkg') : ''}<br>${cur(s)}`; };
const descCell = (l, origin) => `${esc(l.desc)}${l.note ? `<div class="small">(${esc(l.note)})</div>` : ''}${origin && l.origin ? `<div class="small">Product Origin : ${esc(l.origin)}</div>` : ''}`;
const packCell = (l) => esc(l.packing || (num(l.netPer) ? `${l.netPer} KG X 1 ${l.kind || 'BAG'}` : ''));

// ---------- Invoice-style documents ----------
function invoiceHeader(s, doc) {
  const pi = doc === 'proforma';
  const consignee = !pi && s.toOrder && (doc === 'custom' || doc === 'packing') ? '<b>TO THE ORDER OF</b>' : boldFirst(s.consignee);
  const buyer = s.buyer || (pi ? s.consignee : '');
  const right = [
    `<div class="g" style="grid-template-columns:1.6fr 1fr">${cell(pi ? 'Proforma Invoice No. &amp; Date' : 'Invoice No. &amp; Date', `<b>${esc(pi ? s.piNo : s.invNo)}</b> Dtd: ${esc(dmy(pi ? s.piDate : s.invDate))}`)}${cell(pi ? "Exporter's Ref" : '&nbsp;', `<b>IEC NO. : ${E.iec}</b>`)}</div>`,
    cell(pi ? 'Order No. &amp; Date' : "Buyer's Order No. &amp; Date", esc(s.buyerOrder)),
    `<div class="g" style="grid-template-columns:1.6fr 1fr">${cell(pi ? 'Other Ref. No.' : '&nbsp;', `${pi && s.otherRef ? `${esc(s.otherRef)}<br>` : ''}<b>GST NO. : ${E.gst}</b>`)}${cell('&nbsp;', pi ? '' : `<b>BANK AD CODE : ${E.adCode}</b>`)}</div>`,
    pi ? '' : cell('&nbsp;', `<b>FSSAI NO. : ${E.fssai}</b>${doc === 'commercial' ? `<br><b>REX NO. : ${E.rex}</b>` : ''}`),
    cell('Buyer (if other than consignee)', boldFirst(buyer)),
    `<div class="g c2">${cell('Country of Origin of Goods', esc(s.origin))}${cell('Country of Final Destination', esc(s.destCountry))}</div>`,
    cell('Terms of Delivery and Payment', `${esc(s.incoterm)} ${esc(s.incotermPlace)}<br>${doc === 'custom' ? 'PAYMENT : ' : ''}${br(s.payment)}`),
    pi ? cell('Our Bank Details', bankLines()) : '',
    doc === 'commercial' ? cell('&nbsp;', `S BILL No. : ${esc(s.sbNo)} &nbsp; Date : ${esc(dmy(s.sbDate))}<br>B/L No. : ${esc(s.blNo)} &nbsp; Date : ${esc(dmy(s.blDate))}`) : '',
  ].join('');
  const left = [
    cell('Exporter', exporterBlock()),
    cell('Consignee', consignee, 'style="min-height:70px"'),
    pi ? '' : cell('Notify :', boldFirst(s.notify1)),
    `<div class="g c2">${cell('Pre-Carriage by', esc(s.preCarriage))}${cell(pi ? 'Port of Loading' : 'Place of Receipt by Pre-carrier', esc(pi ? s.pol : s.placeReceipt))}</div>`,
    pi ? '' : `<div class="g c2">${cell('Vessel / Flight No.', esc(s.vessel))}${cell('Port of Loading', esc(s.pol))}</div>`,
    `<div class="g c2">${cell('Port of Discharge', esc(s.pod))}${cell('Final Destination', esc(s.finalDest))}</div>`,
    pi ? cell('Shipping Marks', br(s.marks)) : '',
  ].join('');
  return `<div class="g c2" style="margin:1px 0 0 1px">${`<div>${left}</div><div>${right}</div>`}</div>`;
}

function bankLines() {
  const b = E.bank;
  return `A/C Name : <b>${esc(b.accName)}</b><br>A/C Number : ${b.accNo}<br>Bank Name : ${esc(b.name)}<br>Address : ${esc(b.address)}<br>Swift Code : ${b.swift} &nbsp; IFSC CODE : ${b.ifsc}`;
}

function containerTable(s) {
  const rows = containerRows(s);
  if (!rows.length) return '';
  return `<table style="margin-top:6px"><thead><tr><th>Sr.<br>No.</th><th>No. of<br>Pkgs</th><th>Gross Wt.<br>KGS</th><th>Net Wt.<br>KGS</th><th>Container No.</th><th>Line Seal No.</th><th>Exporter Seal No.</th><th>Vehicle No.</th></tr></thead><tbody>
${rows.map((c, i) => `<tr><td class="ctr">${i + 1}</td><td class="ctr">${esc(c.pkgs)}</td><td class="r">${kg(c.gross)}</td><td class="r">${kg(c.net)}</td><td class="ctr">${esc(c.no)}</td><td class="ctr">${esc(c.lineSeal)}</td><td class="ctr">${esc(c.exporterSeal)}</td><td class="ctr">${esc(c.vehicle)}</td></tr>`).join('')}</tbody></table>`;
}

function itemsTable(s, doc) {
  const lines = docLines(s.lines || [], s.consolidate?.[doc]);
  const mixed = new Set(lines.map((l) => l.basis)).size > 1;
  const u = mixed ? '' : qtyUnit(lines);
  const marks = br(s.marks);
  let head, row;
  if (doc === 'proforma') {
    head = `<th>No. of<br>Pkgs</th><th>Description Of Goods</th><th>HS Code</th><th>Packing</th><th>Master Packing<br>in KGS</th><th>Total<br>CBM</th><th>Total Weight<br>MT</th><th>Quantity<br>${u}</th><th>${rateHead(lines, s)}</th><th>Amount<br>${esc(s.incoterm)} ${cur(s)}</th>`;
    row = (l) => `<td class="ctr">${l.pkgs}</td><td>${descCell(l)}</td><td class="ctr">${esc(l.hs)}</td><td class="ctr">${packCell(l)}</td><td class="ctr">${l.netPer ? `${esc(l.netPer)} KG` : ''}</td><td class="r">${l.cbm ? mt(l.cbm) : ''}</td><td class="r">${mt(l.net / 1000)}</td><td class="r">${qtyFmt(l, mixed)}</td><td class="r">${money(l.rate)}</td><td class="r">${money(l.amount)}</td>`;
  } else if (doc === 'packing') {
    head = `<th>Marks &amp; Nos/<br>Cont. No.</th><th>No. &amp; Kind<br>of Pkgs.</th><th>Description Of Goods</th><th>HS Code</th><th>Packing</th><th>Master<br>Packing</th><th>Net Wt.<br>KGS</th><th>Gross Wt.<br>KGS</th><th>Quantity<br>${u}</th><th>Batch No.</th><th>Mfg. Dt.</th><th>Exp. Dt.</th>`;
    row = (l, i) => `<td class="small">${i === 0 ? marks : ''}</td><td class="ctr">${l.pkgs} ${esc(l.kind || '')}</td><td>${descCell(l)}</td><td class="ctr">${esc(l.hs)}</td><td class="ctr">${packCell(l)}</td><td class="ctr">${l.netPer ? `${esc(l.netPer)} KG` : ''}</td><td class="r">${kg(l.net)}</td><td class="r">${kg(l.gross)}</td><td class="r">${qtyFmt(l, mixed)}</td><td class="ctr">${esc(l.batch)}</td><td class="ctr">${esc(dmy(l.mfg))}</td><td class="ctr">${esc(dmy(l.exp))}</td>`;
  } else {
    const gst = doc === 'custom';
    head = `<th>Marks &amp; Nos/<br>Cont. No.</th><th>No. &amp; Kind<br>of Pkgs.</th><th>Description Of Goods</th><th>HS Code</th><th>Packing</th><th>Master<br>Packing</th><th>Total Weight<br>KGS</th>${gst ? '<th>GST<br>%</th>' : ''}<th>Quantity<br>${u}</th><th>${rateHead(lines, s)}</th><th>Amount<br>${cur(s)}</th>`;
    row = (l, i) => `<td class="small">${i === 0 ? marks : ''}</td><td class="ctr">${l.pkgs} ${esc(l.kind || '')}</td><td>${descCell(l, gst)}</td><td class="ctr">${esc(l.hs)}</td><td class="ctr">${packCell(l)}</td><td class="ctr">${l.netPer ? `${esc(l.netPer)} KG` : ''}</td><td class="r">${kg(l.net)}</td>${gst ? `<td class="ctr">${l.gst === '' || l.gst == null ? '' : esc(l.gst)}</td>` : ''}<td class="r">${qtyFmt(l, mixed)}</td><td class="r">${money(l.rate)}</td><td class="r">${money(l.amount)}</td>`;
  }
  const cols = (head.match(/<th>/g) || []).length;
  return `<table class="items" style="margin-top:-1px"><thead><tr>${head}</tr></thead><tbody>${lines.map((l, i) => `<tr>${row(l, i)}</tr>`).join('')}<tr class="fill">${'<td></td>'.repeat(cols)}</tr></tbody></table>`;
}

function invoice(s, doc, title) {
  const t = totals(s.lines || []);
  const pi = doc === 'proforma';
  const freight = num(s.freight), ins = num(s.insurance), adv = pi ? num(s.advance) : 0;
  const grand = Math.round((t.amount - adv) * 100) / 100;
  const sumRows = doc === 'packing' ? '' : `
    <table style="margin-top:-1px"><tr>
      <td style="width:62%"><span class="lab">Amount Chargeable (in Words)</span><div class="words">${esc(amountWords(grand, s.currency))}</div></td>
      <td><table class="small" style="border:0">${[
        ['Sub Total :', money(t.amount)],
        ...(doc === 'custom' ? [['Freight :', freight ? money(freight) : ''], ['Insurance :', ins ? money(ins) : '']] : []),
        ...(adv ? [['Less Advance :', money(adv)]] : []),
        [`<b>Total ${cur(s)}</b>`, `<b>${money(grand)}</b>`],
      ].map(([a, b]) => `<tr><td style="border:0">${a}</td><td class="r" style="border:0">${b}</td></tr>`).join('')}</table></td>
    </tr></table>`;
  const weights = `TOTAL NET WT. &nbsp;: ${pi ? `${mt(t.net / 1000)} MT` : `${kg(t.net)} KGS`}<br>TOTAL GROSS WT. : ${pi ? `${mt(t.gross / 1000)} MT` : `${kg(t.gross)} KGS`}<br>TOTAL PACKAGES &nbsp;: ${t.pkgs} ${esc(t.kind)}${pi && t.cbm ? `<br>TOTAL CBM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${mt(t.cbm)}` : ''}`;
  const customNotes = doc === 'custom' ? `${s.rodtep ? 'We intend to claim rewards under RoDTEP Scheme.<br>' : ''}${s.drawback ? 'Shipment is Under Drawback Scheme.<br>' : ''}${s.insurancePolicy ? `Insurance Policy No. : ${esc(s.insurancePolicy)}<br>` : ''}` : '';
  const terms = pi && s.terms?.length ? `<div class="cell terms" style="margin:-1px 0 0"><b>IMPORTANT TERMS AND CONDITIONS (1 - ${s.terms.length}) :</b><ol>${s.terms.filter(Boolean).map((x) => `<li>${esc(x)}</li>`).join('')}</ol></div>` : '';
  const bank = doc === 'commercial' ? `<div style="margin-top:4px"><span class="lab">Our Bank Details :</span>${bankLines()}</div>` : '';
  const foot = `<table style="margin-top:-1px"><tr><td style="width:55%">${weights}${bank}<div style="margin-top:6px">${customNotes}<span class="lab">Declaration:</span>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</div></td><td><span class="lab">Signature</span>${sig()}</td></tr></table>`;
  return `<h1 class="t">${title}</h1><div class="box" style="border:0">${invoiceHeader(s, doc)}${itemsTable(s, doc)}${pi ? '' : containerTable(s)}${sumRows}${terms}${foot}</div>`;
}

// ---------- BL draft ----------
function bl(s) {
  const t = totals(s.lines || []);
  const lines = docLines(s.lines || [], true);
  return `<div class="g c2" style="margin:1px 0 0 1px"><div>
  ${cell('Shipper', exporterLines() + `<br>Email : ${esc(E.email)}`)}
  ${cell('Consignee', br(s.toOrder ? `TO THE ORDER OF\n${s.consignee}` : s.consignee), 'style="min-height:80px"')}
  <div class="g c2">${cell('1. Notify Party', br(s.notify1))}${cell('2. Notify Party', br(s.notify2))}</div>
  <div class="g c2">${cell('Pre-Carriage by', esc(s.preCarriage))}${cell('Place of Receipt by Pre-carrier', esc(s.placeReceipt))}</div>
  <div class="g c2">${cell('Ocean Vessel', esc(s.vessel))}${cell('Port of Loading', esc(s.pol))}</div>
  <div class="g c2">${cell('Port of Discharge', esc(s.pod))}${cell('Final Destination', esc(s.finalDest))}</div>
  </div><div>
  <div class="cell" style="min-height:120px;text-align:center"><div style="font-size:14px;font-weight:700;letter-spacing:.2em;margin-top:6px">DRAFT</div><div style="font-size:12px;font-weight:700;margin-top:6px">BILL OF LADING</div><div style="font-weight:700">INSTRUCTION</div><div style="margin-top:10px">${br(s.shippingLine) || 'SHIPPING LINE ADDRESS'}</div></div>
  ${cell('Booking No.', esc(s.bookingNo))}
  <div class="g c2">${cell('Freight to be Paid AT', esc(s.freightAt))}${cell('No. of Original BLs', esc(s.originalBls))}</div>
  </div></div>
  <table style="margin-top:-1px"><thead><tr><th>Marks &amp; Nos/<br>Container No.</th><th>No &amp; Kind of Packages<br>Description Of Goods</th><th>H S Code</th><th>Net Weight</th><th>Gross Weight</th></tr></thead><tbody>
  <tr><td class="small" style="width:18%">${br(s.marks)}</td><td><b>${t.pkgs} ${esc(t.kind)}</b>${lines.map((l) => `<br>${esc(l.desc)}`).join('')}<br><br>Invoice No. &amp; Date : ${esc(s.invNo)} Dtd: ${esc(dmy(s.invDate))}<br>Shipping Bill No. &amp; Date : ${esc(s.sbNo)} Date : ${esc(dmy(s.sbDate))}<br>IEC NO. : ${E.iec} &nbsp; GST NO. : ${E.gst}<br>${s.incoterm === 'FOB' ? 'FREIGHT COLLECT' : 'FREIGHT PREPAID'}</td><td class="ctr">${lines.map((l) => esc(l.hs)).join('<br>')}</td><td class="r">${mt(t.net / 1000)} MT</td><td class="r">${mt(t.gross / 1000)} MT</td></tr>
  </tbody></table>${containerTable(s)}
  <table style="margin-top:6px"><tr><td>Total No. of Packages : <b>${t.pkgs} ${esc(t.kind)}</b></td><td>Total Net Wt. : <b>${kg(t.net)} KGS</b></td><td>Total Gr. Weight : <b>${kg(t.gross)} KGS</b></td></tr></table>${sig('SIGNATURE')}`;
}

// ---------- Bill of exchange (first and second) ----------
function boe(s) {
  const t = totals(s.lines || []);
  const one = (which, other) => `<div style="border:1px solid #000;padding:10mm 8mm;font-size:10.5px;line-height:1.7">
  <div style="text-align:center;font-weight:700;font-size:11px">${esc(E.name)}</div><div style="text-align:center">${E.address.map(esc).join(' ')} Phone : ${esc(E.phone)}</div>
  <div style="display:flex;justify-content:space-between;margin-top:12px"><b style="font-size:14px;letter-spacing:.12em">EXCHANGE</b><span>NO. <b>${esc(s.invNo)}</b><br>Date : ${esc(dmy(s.invDate))}</span></div>
  <p>FOR &nbsp;<b>${cur(s)} ${money(t.amount)}</b></p>
  <p>AT &nbsp;<b>${esc(s.boeTenor)}</b> DATE / SIGHT OF THIS <b>${which}</b> OF EXCHANGE (${other} OF THE SAME TENURE AND DATE BEING UNPAID)</p>
  <p>PAY TO THE ORDER OF &nbsp;<b>${esc(E.bank.name)} ${esc(E.bank.branch)}</b></p>
  <p>THE SUM OF &nbsp;<b>${esc(amountWords(t.amount, s.currency))}</b></p>
  <p>VALUE RECEIVED AND CHARGE THE SAME TO THE ACCOUNT OF &nbsp;<b>${t.pkgs} ${esc(t.kind)}</b></p>
  <p>PACKAGE SHIPPED BY S.S./AIR &nbsp;<b>${esc(s.vessel)}</b> &nbsp; INVOICE NO. <b>${esc(s.invNo)}</b> DT. : ${esc(dmy(s.invDate))}<br>B/L/AIR BILL NO. <b>${esc(s.blNo)}</b> DT. : ${esc(dmy(s.blDate))}</p>
  <p>CHARGES OF OVERSEAS CORRESPONDENT BANK TO BE COLLECTED FROM DRAWEE.</p>
  <div style="display:flex;justify-content:space-between;gap:20px"><div>To,<br><b>${br(s.drawee || s.buyer || s.consignee)}</b><br><br>Negotiated Through Bank :<br>${br(s.negotiatingBank || s.consigneeBank)}</div>${sig()}</div></div>`;
  return [one('FIRST', 'SECOND'), one('SECOND', 'FIRST')];
}

// ---------- VGM (one page per container) ----------
function vgm(s) {
  const rows = containerRows(s);
  const list = rows.length ? rows : [{ no: '', size: '20 Ft', gross: totals(s.lines || []).gross, tare: '' }];
  const v = s.vgm || {};
  return list.map((c) => {
    const total = num(c.gross) + num(c.tare);
    const items = [
      ['Name of the shipper', E.name],
      ['Shipper Registration/License No. (IEC No/CIN No) **', E.iec],
      ['Name and designation of official of the shipper authorized to sign document', `Designation : ${v.designation}<br>Name : ${esc(v.name)}`],
      ['24 x 7 contact details of authorized official of shipper', `Mob No: ${esc(v.mobile)}`],
      ['Container No.', esc(c.no)],
      ['Cargo Size (TEU/FEU/other)', esc(c.size)],
      ['Maximum permissible weight of container as per the CSC plate', esc(v.cscMax)],
      ['Verified gross mass of container (method-1)', `Gr. Wt.: ${kg(c.gross)} Kgs + Tare Wt.: ${kg(c.tare)} Kgs<br><b>Total Wt. : ${kg(total)} Kgs</b>`],
      ['Weighbridge registration no. &amp; Address of Weighbridge', br(v.weighbridge)],
      ['Date and time of weighing', esc(v.weighTime)],
      ['Weighing slip no.', esc(v.slipNo)],
      ['Type (Normal/Reefer/Hazardous/others)', esc(v.type)],
      ['If Hazardous UN NO.IMDG class', esc(v.hazard)],
    ];
    return `<div class="letter" style="padding:10mm 6mm"><div style="text-align:center;font-weight:700;font-size:13px">${esc(E.name)}</div><div style="text-align:center;font-weight:700;margin-bottom:10px">INFORMATION ABOUT VERIFIED GROSS MASS OF CONTAINER</div>
    <table><thead><tr><th style="width:7%">Sr. No.</th><th style="width:45%">Details of Information</th><th>Particulars</th></tr></thead><tbody>${items.map(([a, b], i) => `<tr><td class="ctr">${i + 1}*</td><td>${a}</td><td>${b || '&nbsp;'}</td></tr>`).join('')}</tbody></table>
    <div style="margin-top:14px;text-align:right">Signature of authorised person of shipper${sig(`Name - ${esc(v.name)}<br>Date: ${esc(dmy(v.date))}`)}</div></div>`;
  });
}

// ---------- Bank covering letter ----------
function bank(s) {
  const t = totals(s.lines || []);
  const recv = (s.receipts || []).filter((r) => r.ref || r.amount);
  const advance = recv.reduce((a, r) => a + num(r.amount), 0);
  const claim = Math.round((t.amount - advance) * 100) / 100;
  const ref = (k) => (k === 'inv' ? `${esc(s.invNo)} Dt: ${esc(dmy(s.invDate))}` : k === 'bl' ? `${esc(s.blNo)} Dt.: ${esc(dmy(s.blDate))}` : '');
  return `<div class="letter" style="padding:8mm 6mm;font-size:9.5px">
  <div style="text-align:center;font-weight:700;font-size:12px">EXPORT BILL DOCUMENT FOR RELEASE AGAINST PAYMENT</div>
  <div style="display:flex;justify-content:space-between;margin-top:10px"><div>To,<br>${br(s.bankTo)}</div><div>Date : ${esc(dmy(s.bankDate))}</div></div>
  <p style="text-align:center"><b>Sub.: ${esc(s.bankSubject)}</b></p><p>Dear Sir / Madam,</p>
  <table><thead><tr><th style="text-align:left">ENCLOSED DOCUMENTS LIST:</th><th></th><th>NO. OF COPIES</th></tr></thead><tbody>
  ${BANK_DOCS.map(([n, k, c]) => `<tr><td>• ${n}</td><td>${ref(k)}</td><td class="ctr">${c}</td></tr>`).join('')}</tbody></table>
  <table class="kv" style="margin-top:6px"><tbody>
  <tr><td>Payment Terms</td><td>: ${br(s.payment)}</td></tr><tr><td>IEC Code</td><td>: ${E.iec}</td></tr><tr><td>LC NO. AND DATE</td><td>: ${esc(s.lcNo)}</td></tr></tbody></table>
  <p style="margin-bottom:2px"><b>Advance Receipt Details</b></p>
  <table><thead><tr><th>Sr. No.</th><th>Bank Ref. No.</th><th>Date</th><th>Amount</th></tr></thead><tbody>
  ${(recv.length ? recv : [{ ref: 'NA', date: '', amount: 0 }]).map((r, i) => `<tr><td class="ctr">${i + 1}</td><td>${esc(r.ref)}</td><td class="ctr">${esc(dmy(r.date))}</td><td class="r">${cur(s)} ${money(r.amount)}</td></tr>`).join('')}</tbody></table>
  <p><b>Final Claim Amount ${cur(s)} ${money(claim)}</b><br>ALL BANK CHARGES OUTSIDE INDIA WILL BE IN BUYER / CONSIGNEE ACCOUNT.</p>
  <table class="kv"><tbody><tr><td>CONSIGNEE</td><td>: ${esc(firstLine(s.consignee))}</td></tr><tr><td>CONSIGNEE BANK DETAILS</td><td>${br(s.consigneeBank)}</td></tr></tbody></table>
  <p>Kindly note our following instructions<br>Documents to be released against payment of <b>${cur(s)} ${money(claim)}</b> full amount to the bank account details as mentioned below</p>
  <table class="kv"><tbody><tr><td colspan="2"><b>Exporter Bank Details :</b></td></tr><tr><td>Account Name</td><td>: ${esc(E.bank.accName)}</td></tr><tr><td>Account Number</td><td>: ${E.bank.accNo}</td></tr><tr><td>Bank Address</td><td>: ${esc(E.bank.address)}</td></tr><tr><td>SWIFT CODE-BIC</td><td>: ${E.bank.swift}</td></tr><tr><td>Packing Credit Account No.</td><td>:</td></tr><tr><td>EEFC A/C No.</td><td>:</td></tr></tbody></table>
  <p style="text-align:center;margin-bottom:2px"><b>(DECLARATION – CUM – UNDERTAKING (UNDER FEMA 1999)</b></p>
  <p style="font-size:8.5px;text-align:justify;margin-top:0">I/We hereby declare that the transaction the details of which are specifically mentioned in this request letter does not involve, and is not designed for the purpose of any contravention or evasion of the provisions of the Foreign Exchange Management Act 1999 or of any rules, regulation, notification, direction or order made thereunder. I/We also hereby agree and undertake to give such information/documents as will reasonably satisfy you about this transaction in terms of the above declaration. I/We also understand that if I/We refuse to comply with any such requirement or make only unsatisfactory compliance therewith, the bank shall refuse in writing to undertake the transaction and shall if it has reason to believe that any contravention/evasion is contemplated by me/us report the matter to Reserve Bank of India. I/We further declare that the undersigned has/have the authority to give this declaration and undertaking on behalf of the company.</p>
  <div style="display:flex;justify-content:space-between;align-items:flex-end"><span>Yours Faithfully,</span>${sig()}</div></div>`;
}

// ---------- Self sealing ----------
function selfSealing(s) {
  const c = s.containers?.[0] || {};
  return `<div class="letter"><div style="text-align:center;font-weight:700;font-size:14px;margin-bottom:12px">SELF – SEALING</div>
  <p style="text-align:center">${esc(E.selfSealing.circular)}</p><p style="text-align:center"><b>${esc(E.selfSealing.permission)}</b></p>
  <p>TYPE OF CONTAINER: &nbsp;<b>${esc(c.size || '')}</b></p>
  <p>Inspected Container No's Found empty inspected and checked qty / Packages, description, Weight which is as per the goods covered by this invoice and particulars amplified in the Packing List.</p>
  <p>"Certified that the Description and Value of the goods covered by this invoice have checked by me and the goods have been packed under my supervision.</p>
  <p>Container Stuffing Place: <b>${br(s.seal?.at)}</b></p>
  <p>INVOICE NO : <b>${esc(s.invNo)}</b> Dt: ${esc(dmy(s.invDate))}</p>${containerTable(s)}
  <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:20px"><div>Place : ${esc(s.seal?.place)}<br>Date : ${esc(dmy(s.seal?.date))}</div>${sig()}</div></div>`;
}

// ---------- Bank disposal for advance receipt (two pages) ----------
function disposal(s) {
  const d = s.disposal || {};
  const amt = `${cur(s)} ${money(d.amount)}`;
  const head = `<div style="text-align:center"><b style="font-size:12px">${esc(E.name)}</b><br>${E.address.map(esc).join(' ')}<br>Phone : ${esc(E.phone)} &nbsp; Email : ${esc(E.email)}</div><p style="text-align:right">Date : ${esc(dmy(d.date))}</p>`;
  const to = `<p>To,<br>The Branch Manager,<br>${br(s.bankTo)}</p>`;
  const p1 = `<div class="letter">${head}${to}<p style="text-align:center"><b>Sub: Submission of disposal instruction application for handling foreign remittance</b></p>
  <p>Ref: Current / Cash Credit Account No. : ${E.bank.accNo}</p><p>Dear Sir,<br>With reference to the above we hereby submitting disposal instruction for handling foreign remittance as we have received <b>${amt}</b> from our Foreign remitter / Importer: <b>${esc(d.remitter || firstLine(s.consignee))}</b> against Proforma No. : <b>${esc(s.piNo)}</b> Dtd: ${esc(dmy(s.piDate))}</p>
  <p>We request you to kindly forward this form along with your letter to ${esc(d.isb)} branch for credit of <b>${amt}</b> received on ${esc(dmy(d.received))} to our above account.</p><p>Kindly do the needful.</p><p>Thanking You,</p>${sig()}</div>`;
  const p2 = `<div class="letter">${head}<p style="text-align:center"><b>DISPOSAL INSTRUCTION FOR HANDLING FOREIGN INWARD REMITTANCE</b></p>${to}
  <p>In reference to the credit of <b>${amt}</b> Dated : ${esc(dmy(d.received))} received in our name. We furnish below the purpose of remittance and supporting documents for your necessary action.</p>
  <p>1) Currency and Amount in FCY received : <b>${amt}</b></p><p>Purpose for which amount is received : ${esc(d.purpose || `Advance against Proforma Invoice No. ${s.piNo} Dtd: ${dmy(s.piDate)}`)}</p>
  <p>2) We request you to credit the amount to our Account no.: ${E.bank.accNo}</p><p>3) Details of underlying transaction with documentary evidence: Proforma Invoice</p>
  <p style="font-size:9px;text-align:justify">I /We confirm and undertake that the transaction details of which are mentioned above does not involve, and is not designed for the purpose of any contravention or evasion of the provision of the foreign exchange management act 1999 or of any rule, regulation, notification, direction or order made there under. I/We also hereby agree and undertake to give such information/documents as will reasonably satisfy you about this transaction in terms of the above declaration. I/We also undertake that if I/We refuse to comply with any such requirement or make only unsatisfactory compliance herewith, the bank shall refuse in writing to undertake the transaction and shall, if it has reason to believe that any contravention/evasion is contemplated by me/us, report the matter to RBI. I/We further declare that the undersigned has the authority to give this application, declaration and undertaking on behalf of the firm/company.</p>
  <p style="text-align:right">IEC Code : ${E.iec}</p><div style="display:flex;justify-content:space-between;align-items:flex-end"><span>Place : Mumbai</span>${sig()}</div></div>`;
  return [p1, p2];
}

export function renderDoc(s, slug, back) {
  const doc = DOCS.find((d) => d.slug === slug);
  if (!doc || doc.excel) return null;
  const title = `${doc.name} – ${s.invNo || s.piNo || s.title || 'Shipment'}`;
  const pages = {
    proforma: () => [invoice(s, 'proforma', 'PROFORMA INVOICE')],
    custom: () => [invoice(s, 'custom', 'CUSTOM INVOICE')],
    commercial: () => [invoice(s, 'commercial', 'COMMERCIAL INVOICE')],
    packing: () => [invoice(s, 'packing', 'PACKING LIST')],
    bl: () => [bl(s)],
    boe: () => boe(s),
    vgm: () => vgm(s),
    bank: () => [bank(s)],
    selfsealing: () => [selfSealing(s)],
    disposal: () => disposal(s),
  }[slug]();
  return shell(title, pages, back);
}
