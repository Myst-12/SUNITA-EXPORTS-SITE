import QRCode from 'qrcode';
import { isAdmin } from '@/lib/forms/auth';
import { getForm } from '@/lib/forms/store';
import { formUrl } from '@/lib/forms/url';

export const dynamic = 'force-dynamic';

export async function GET(_req, { params }) {
  if (!(await isAdmin())) return new Response('Not allowed', { status: 401 });
  const { id } = await params;
  const form = await getForm({ id });
  if (!form) return new Response('Not found', { status: 404 });
  const png = await QRCode.toBuffer(await formUrl(form.slug), { width: 1200, margin: 2, color: { dark: '#0f3d22' } });
  return new Response(png, { headers: { 'Content-Type': 'image/png', 'Content-Disposition': `attachment; filename="${form.slug}-qr.png"`, 'Cache-Control': 'no-store' } });
}
