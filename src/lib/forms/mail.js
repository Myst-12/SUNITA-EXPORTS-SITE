import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { CONTACT, COMPANY, SITE_URL, whatsappLink } from '@/config/site';

// Emails the Excel file through Resend (RESEND_API_KEY). Without a key — e.g. on localhost — the
// file is saved to .data/outbox/ instead so the flow can still be tested.
const FROM = () => process.env.FORMS_FROM_EMAIL || 'Sunita Agri Exports <onboarding@resend.dev>';
const notifyList = () => (process.env.FORMS_NOTIFY_EMAIL || CONTACT.email).split(',').map((s) => s.trim()).filter(Boolean);
const esc = (v) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** Sends one email through Resend; never throws (a failed email must not break a form submission). */
async function send(payload) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, note: 'no RESEND_API_KEY' };
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM(), ...payload }),
    });
    if (!res.ok) { const d = await res.text(); console.error('Resend error', res.status, d); return { sent: false, note: d.slice(0, 200) }; }
    return { sent: true };
  } catch (e) {
    console.error('Resend error', e);
    return { sent: false, note: String(e) };
  }
}

/** Instant alert to the client for every new exhibition-form entry. */
export function sendLeadAlert(form, fields, data) {
  const rows = fields.map((f) => [f.label, data[f.key]]).filter(([, v]) => v);
  const name = data.name || data.company || 'New lead';
  const wa = String(data.phone || '').replace(/\D/g, '');
  return send({
    to: notifyList(),
    reply_to: data.email || undefined,
    subject: `New lead: ${name}${data.company && data.name ? `, ${data.company}` : ''}${data.country ? ` (${data.country})` : ''} — ${form.title}`,
    text: `New response to "${form.title}"\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1b2a22">
      <p style="margin:0 0 12px"><b>New response to “${esc(form.title)}”</b></p>
      <table style="border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#5b6660;vertical-align:top">${esc(k)}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`).join('')}</table>
      ${wa.length >= 8 ? `<p style="margin:18px 0 0"><a href="https://wa.me/${wa}" style="background:#25d366;color:#fff;padding:10px 16px;border-radius:999px;text-decoration:none;font-weight:bold">Reply on WhatsApp</a></p>` : ''}
    </div>`,
  });
}

/** Thank-you email to the visitor (only when they gave an email). */
export function sendThankYou(form, data) {
  if (!data.email) return Promise.resolve({ sent: false, note: 'no visitor email' });
  const first = String(data.name || '').split(' ')[0];
  return send({
    to: [data.email],
    reply_to: CONTACT.email,
    subject: `Thank you for visiting ${COMPANY.name}`,
    text: `Hello ${first || 'there'},\n\nThank you for visiting us${form.title ? ` at ${form.title}` : ''}. We have received your details and our export team will contact you soon with prices and specifications.\n\nOur full product range: ${SITE_URL}/products/\nWhatsApp: ${CONTACT.quotePhone.display}\nEmail: ${CONTACT.email}\n\n${COMPANY.name}, Mumbai`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1b2a22;max-width:560px">
      <p>Hello ${esc(first || 'there')},</p>
      <p>Thank you for visiting us${form.title ? ` at <b>${esc(form.title)}</b>` : ''}. We have received your details and our export team will contact you soon with prices and specifications.</p>
      <p style="margin:22px 0">
        <a href="${SITE_URL}/products/" style="background:#086639;color:#fff;padding:11px 18px;border-radius:999px;text-decoration:none;font-weight:bold">See our products</a>
        &nbsp;
        <a href="${esc(whatsappLink())}" style="background:#25d366;color:#fff;padding:11px 18px;border-radius:999px;text-decoration:none;font-weight:bold">WhatsApp us</a>
      </p>
      <p style="color:#5b6660;font-size:13px">${esc(COMPANY.name)} · Mumbai, India · ${esc(CONTACT.quotePhone.display)} · ${esc(CONTACT.email)}</p>
    </div>`,
  });
}

export async function emailWorkbook({ form, count, buffer, filename }) {
  const to = notifyList();
  const subject = `${form.title} — ${count} response${count === 1 ? '' : 's'} (Excel attached)`;
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    const dir = path.join(process.cwd(), '.data', 'outbox');
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, filename), buffer);
    return { sent: false, to, note: `Email not set up yet (no RESEND_API_KEY). Saved to .data/outbox/${filename}.` };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM(),
      to,
      subject,
      text: `The form "${form.title}" has been closed with ${count} response${count === 1 ? '' : 's'}.\n\nThe responses are attached as an Excel file.`,
      attachments: [{ filename, content: buffer.toString('base64') }],
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    console.error('Resend error', res.status, detail);
    const why = res.status === 403 && /testing emails/.test(detail)
      ? 'the email domain is not verified on Resend yet, so it can only send to the Resend account owner'
      : `the email service returned an error (${res.status})`;
    return { sent: false, to, note: `The Excel could not be emailed because ${why}. Use “Download Excel” below instead.` };
  }
  return { sent: true, to, note: `Excel emailed to ${to.join(', ')}.` };
}
