import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { CONTACT } from '@/config/site';

// Emails the Excel file through Resend (RESEND_API_KEY). Without a key — e.g. on localhost — the
// file is saved to .data/outbox/ instead so the flow can still be tested.
export async function emailWorkbook({ form, count, buffer, filename }) {
  const to = (process.env.FORMS_NOTIFY_EMAIL || CONTACT.email).split(',').map((s) => s.trim()).filter(Boolean);
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
      from: process.env.FORMS_FROM_EMAIL || 'Sunita Agri Exports <onboarding@resend.dev>',
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
