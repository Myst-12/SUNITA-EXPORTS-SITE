import { isAdmin } from '@/lib/forms/auth';
import { listOrders, listCustomers } from '@/lib/shop/store';
import { buildOrdersWorkbook, ordersExcelName } from '@/lib/shop/excel';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdmin())) return new Response('Not allowed', { status: 401 });
  const [orders, customers] = await Promise.all([listOrders(), listCustomers()]);
  const buffer = await buildOrdersWorkbook(orders, customers);
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${ordersExcelName()}"`,
      'Cache-Control': 'no-store',
    },
  });
}
