import { redirect, notFound } from 'next/navigation';
import { isAdmin } from '@/lib/forms/auth';
import { getShipment } from '@/lib/exportdocs/store';
import { blankShipment } from '@/lib/exportdocs/company';
import { DOCS } from '@/lib/exportdocs/render';
import ShipmentEditor from '../ShipmentEditor';

export const metadata = { title: 'Shipment' };

export default async function ShipmentPage({ params }) {
  if (!(await isAdmin())) redirect('/admin/');
  const { id } = await params;
  const s = await getShipment(id);
  if (!s) notFound();
  const { id: _i, createdAt: _c, updatedAt, ...data } = s;
  return <ShipmentEditor id={id} initial={{ ...blankShipment(), ...data }} savedAt={updatedAt} docs={DOCS.map(({ slug, name, excel }) => ({ slug, name, excel: !!excel }))} />;
}
