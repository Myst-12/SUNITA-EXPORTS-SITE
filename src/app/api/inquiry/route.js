import { NextResponse } from 'next/server';
import { CONTACT } from '@/config/site';

const FIELDS = [
  ['name', 'Name'],
  ['company', 'Company'],
  ['email', 'Email'],
  ['phone', 'Phone / WhatsApp'],
  ['country', 'Country'],
  ['buyerType', 'Business type'],
  ['productInterest', 'Products'],
  ['estimatedQuantity', 'Quantity'],
  ['packaging', 'Packing'],
  ['incoterm', 'Price terms'],
  ['port', 'Destination port'],
  ['message', 'Notes / specifications'],
];

const clean = (v) => String(v ?? '').slice(0, 4000).trim();

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (clean(data.website)) return NextResponse.json({ success: true });

  const d = Object.fromEntries(FIELDS.map(([k]) => [k, clean(data[k])]));
  if (!d.name || !d.company || !d.email || !d.country || !d.productInterest) {
    return NextResponse.json({ success: false, error: 'Please fill in name, company, email, country and products.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
    return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const subject = `[Quote request] ${d.productInterest.slice(0, 60)} — ${d.company} (${d.country})`;
  const body = [
    'New quote request from the Sunita Agri Exports website',
    '------------------------------------------------------',
    ...FIELDS.map(([k, label]) => `${label}: ${d[k] || '—'}`),
  ].join('\n');

  try {
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (web3Key) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: web3Key, subject, from_name: 'Sunita Exports Website', name: `${d.name} (${d.company})`, email: d.email, replyto: d.email, message: body }),
      });
      const json = await res.json();
      if (json.success) return NextResponse.json({ success: true });
      console.error('Web3Forms error', json);
      return NextResponse.json({ success: false, error: 'Email service error. Please try WhatsApp.' }, { status: 502 });
    }

    if (process.env.RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: process.env.RESEND_FROM || 'Sunita Exports <onboarding@resend.dev>', to: [CONTACT.email], reply_to: d.email, subject, text: body }),
      });
      if (res.ok) return NextResponse.json({ success: true });
      console.error('Resend error', await res.text());
      return NextResponse.json({ success: false, error: 'Email service error. Please try WhatsApp.' }, { status: 502 });
    }
  } catch (err) {
    console.error('Inquiry send failed', err);
    return NextResponse.json({ success: false, error: 'Could not send right now. Please try WhatsApp.' }, { status: 502 });
  }

  // No email provider configured yet (see risks.txt — Web3Forms key pending).
  console.log('[Inquiry received — no email key configured]\n' + body);
  return NextResponse.json({ success: false, needsApiKey: true, error: 'Email service not configured yet.' }, { status: 503 });
}
