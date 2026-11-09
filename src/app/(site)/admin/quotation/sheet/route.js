import { isAdmin } from '@/lib/forms/auth';
import { getCosting } from '@/lib/costing/store';
import { buildCostingWorkbook } from '@/lib/costing/sheet';

export const dynamic = 'force-dynamic';

// The costing sheet to fill in: blank the first time, afterwards with the figures uploaded last.
export async function GET() {
  if (!(await isAdmin())) return new Response('Not allowed', { status: 401 });
  let costing = null;
  try { costing = await getCosting(); } catch (e) { console.error(e); }
  const buffer = await buildCostingWorkbook(costing);
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${costing ? 'quotation-costing-sheet' : 'quotation-costing-sheet-blank'}.xlsx"`,
      'Cache-Control': 'no-store',
    },
  });
}
