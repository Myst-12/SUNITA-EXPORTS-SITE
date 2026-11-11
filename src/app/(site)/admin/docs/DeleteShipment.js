'use client';

import { deleteShipmentAction } from './actions';

/** Delete button that asks first. `label` names the shipment in the question. */
export default function DeleteShipment({ id, label, className, style, children = "Delete" }) {
  return (
    <form action={deleteShipmentAction} onSubmit={(e) => { if (!confirm(`Delete "${label}"? Its details and documents will be removed and this cannot be undone.`)) e.preventDefault(); }}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className={className} style={style}>{children}</button>
    </form>
  );
}
