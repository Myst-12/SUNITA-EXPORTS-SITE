import 'server-only';
import { send, notifyList, esc } from '@/lib/forms/mail';
import { CONTACT, COMPANY, SITE_URL } from '@/config/site';

const line = (it) => `${it.qty} ${it.unit} · ${it.code ? `#${it.code} ` : ''}${it.name}${it.pack ? ` · ${it.pack}` : ''}${it.brand ? ` · ${it.brand}` : ''}`;
const DETAIL_LABELS = [['port', 'Destination port'], ['incoterm', 'Price terms'], ['container', 'Container'], ['wanted', 'Wanted by'], ['notes', 'Notes']];

function itemsTable(items) {
  const cell = 'padding:6px 12px 6px 0;border-bottom:1px solid #e2e8e3;vertical-align:top';
  return `<table style="border-collapse:collapse;margin:8px 0 16px">
    <tr style="color:#5b6660;font-size:13px"><td style="${cell}">Product</td><td style="${cell}">Pack size</td><td style="${cell}">Brand</td><td style="${cell}">Quantity</td></tr>
    ${items.map((it) => `<tr><td style="${cell}"><b>${esc(it.name)}</b>${it.code ? ` <span style="color:#5b6660">#${esc(it.code)}</span>` : ''}</td><td style="${cell}">${esc(it.pack || '—')}</td><td style="${cell}">${esc(it.brand || '—')}</td><td style="${cell}"><b>${esc(it.qty)} ${esc(it.unit)}</b></td></tr>`).join('')}
  </table>`;
}

/** Instant alert to the client for every online order. */
export function sendOrderAlert(order) {
  const c = order.customer;
  const details = DETAIL_LABELS.map(([k, l]) => [l, order.details[k]]).filter(([, v]) => v);
  const wa = String(c.phone || '').replace(/\D/g, '');
  return send({
    to: notifyList(),
    reply_to: c.email,
    subject: `New order ${order.number}: ${c.company || c.name} (${c.country}) — ${order.items.length} product${order.items.length === 1 ? '' : 's'}`,
    text: `New online order ${order.number}\n\n${c.name}, ${c.company || ''}\n${c.email} · ${c.phone} · ${c.country}\n\n${order.items.map(line).join('\n')}\n\n${details.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nAll orders: ${SITE_URL}/admin/orders/`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1b2a22">
      <p style="margin:0 0 4px"><b>New online order ${esc(order.number)}</b></p>
      <p style="margin:0 0 12px;color:#5b6660">${esc(c.name)}${c.company ? `, ${esc(c.company)}` : ''} · ${esc(c.country)}<br>${esc(c.email)} · ${esc(c.phone)}</p>
      ${itemsTable(order.items)}
      ${details.map(([k, v]) => `<p style="margin:0 0 4px"><span style="color:#5b6660">${esc(k)}:</span> ${esc(v)}</p>`).join('')}
      <p style="margin:18px 0 0"><a href="${SITE_URL}/admin/orders/" style="color:#086639;font-weight:bold">Open orders in admin</a>${wa.length >= 8 ? ` &nbsp; <a href="https://wa.me/${wa}" style="color:#1faa53;font-weight:bold">Reply on WhatsApp</a>` : ''}</p>
    </div>`,
  });
}

/** Confirmation to the buyer. */
export function sendOrderConfirmation(order) {
  const c = order.customer;
  const first = String(c.name || '').split(' ')[0] || 'there';
  return send({
    to: [c.email],
    reply_to: CONTACT.email,
    subject: `We have your order ${order.number} — ${COMPANY.name}`,
    text: `Hello ${first},\n\nThank you for your order ${order.number}. Our export team will check availability and send you prices, the proforma invoice and shipping dates shortly.\n\n${order.items.map(line).join('\n')}\n\nYour orders: ${SITE_URL}/account/\nWhatsApp: ${CONTACT.quotePhone.display}\nEmail: ${CONTACT.email}\n\n${COMPANY.name}, Mumbai`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1b2a22;max-width:600px">
      <p>Hello ${esc(first)},</p>
      <p>Thank you for your order <b>${esc(order.number)}</b>. Our export team will check availability and send you prices, the proforma invoice and shipping dates shortly.</p>
      ${itemsTable(order.items)}
      <p><a href="${SITE_URL}/account/" style="color:#086639;font-weight:bold">See your orders</a></p>
      <p style="color:#5b6660">WhatsApp ${esc(CONTACT.quotePhone.display)} · ${esc(CONTACT.emails.join(' · '))}<br>${esc(COMPANY.name)}, Mumbai</p>
    </div>`,
  });
}

/** Alert to the client when a buyer writes a review, so it can be approved. */
export function sendReviewAlert(review) {
  const c = review.customer;
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  return send({
    to: notifyList(),
    reply_to: c.email,
    subject: `New review to approve: ${stars} from ${c.company || c.name} (${c.country})`,
    text: `${c.name}${c.company ? `, ${c.company}` : ''} (${c.country}) reviewed order ${review.order_number}: ${stars}\n\n${review.body}\n\nApprove or hide it: ${SITE_URL}/admin/reviews/`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1b2a22;max-width:600px">
      <p style="margin:0 0 4px"><b>New review to approve</b> <span style="color:#d99d00;font-size:18px">${stars}</span></p>
      <p style="margin:0 0 12px;color:#5b6660">${esc(c.name)}${c.company ? `, ${esc(c.company)}` : ''} · ${esc(c.country)} · order ${esc(review.order_number)}</p>
      <p style="margin:0 0 16px;white-space:pre-wrap">${esc(review.body)}</p>
      <p style="margin:0"><a href="${SITE_URL}/admin/reviews/" style="color:#086639;font-weight:bold">Approve or hide it in admin</a></p>
    </div>`,
  });
}
