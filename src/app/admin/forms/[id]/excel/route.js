import { isAdmin } from '@/lib/forms/auth';
import { getForm, listResponses } from '@/lib/forms/store';
import { buildWorkbook, excelName } from '@/lib/forms/excel';

export const dynamic = 'force-dynamic';

export async function GET(_req, { params }) {
  if (!(await isAdmin())) return new Response('Not allowed', { status: 401 });
  const { id } = await params;
  const form = await getForm({ id });
  if (!form) return new Response('Not found', { status: 404 });
  const buffer = await buildWorkbook(form, await listResponses(id));
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${excelName(form)}"`,
      'Cache-Control': 'no-store',
    },
  });
}
