import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/forms/auth';
import { getShipment } from '@/lib/exportdocs/store';
import { renderDoc } from '@/lib/exportdocs/render';
import { buildCargoX } from '@/lib/exportdocs/cargox';
import { normalizeShipment } from '@/lib/exportdocs/workflow';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  if (!(await isAdmin())) return NextResponse.redirect(new URL('/admin/', request.url));
  const { id, doc } = await params;
  const ship = await getShipment(id);
  if (!ship) return new NextResponse('Shipment not found', { status: 404 });
  const s = normalizeShipment(ship).docs[doc];
  if (!s) return new NextResponse('This document has not been started yet. Open the shipment and start it first.', { status: 404 });
  const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };
  if (doc === 'cargox') {
    const name = `cargox-${(s.invNo || s.piNo || 'invoice').replace(/[^A-Za-z0-9-]+/g, '-')}.xlsx`;
    return new NextResponse(await buildCargoX(s), { headers: { ...headers, 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': `attachment; filename="${name}"` } });
  }
  const html = renderDoc(s, doc, `/admin/docs/${id}/`);
  if (!html) return new NextResponse('Unknown document', { status: 404 });
  return new NextResponse(html, { headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } });
}
