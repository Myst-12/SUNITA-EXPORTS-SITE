import { redirect, notFound } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { getShipment, listShipments, listMasters } from '@/lib/exportdocs/store';
import { normalizeShipment } from '@/lib/exportdocs/workflow';
import { nextNumbers } from '@/lib/exportdocs/calc';
import ShipmentEditor from '../ShipmentEditor';

export const metadata = { title: 'Shipment' };

export default async function ShipmentPage({ params }) {
  if (!(await isAdmin())) redirect('/admin/');
  const { id } = await params;
  const [s, all, masters] = await Promise.all([getShipment(id), listShipments(), listMasters()]);
  if (!s) notFound();
  const others = all.filter((x) => x.id !== id).map(normalizeShipment);
  return <ShipmentEditor id={id} initial={normalizeShipment(s)} savedAt={s.updatedAt} numbers={nextNumbers(others)} masters={masters} />;
}
