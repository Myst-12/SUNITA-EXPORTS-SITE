# Quotation cost calculator — setup

Admin page: `/admin/quotation/` · code: `src/lib/costing/`, `src/app/(site)/admin/quotation/`.

The calculator works from the client's own costing sheet: an amount per cost head (Bulk, Consumer, FMCG, as in
his original sheet), a packing list per packing type, the dollar rate and the insurance % for CIF. The product's
buying price changes daily, so it is typed into the calculator for each quote. These are internal figures, so they are **never put in the code** (the repo is public):
download the sheet from the admin page, fill it in, upload it there. It is stored in the database.

## Database table (once)
Supabase → SQL Editor → run:

```sql
create table admin_data (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
alter table admin_data enable row level security;
```

Without Supabase keys (localhost test mode) the sheet is saved to `.data/costing.json`.

## How a price is worked out (one container)
- Each cost = amount × how many of its unit fit in one container (kg, bags, cartons, packs, gajjats, boxes, or 1 per container).
  The counts come from the packing row: bags per container × bag size, or cartons per container × packs per carton × pack size.
- Consumer packing: "per bag" costs (transport, unloading, storage) are per bag the goods arrive in (column "Goods arrive in bags of (kg)").
- Optional costs (labels, tin/jar labelling, screen printing, chalni, strapping, carton change…) count only where the packing row says Yes.
- FOB cost = all costs except freight. FOB price = FOB cost + profit %. CFR = FOB + freight. CIF = CFR + insurance % of CFR.
- USD = ₹ ÷ the exchange rate in Settings. Prices are shown per container, per kg, and per bag / carton / pack.
- Some amounts depend on size, as in the packing contractor's rate chart: pouch packing labour by pack size,
  storage by bag/carton weight (up to 10 kg, up to 50 kg), loading and unloading (up to 25 kg, above), bulk
  repacking by bag size (10, 25, 50 kg), thappi by container (20 ft, 40 ft). Each size is its own row in the sheet
  and the calculator picks the row that fits the packing.
- A blank amount is listed as missing and the prices are marked incomplete; 0 means really zero.

## Which products use which costs
Loose products (spices, herbs, rice, pulses…) can be quoted in Bulk or Consumer packing; the buying price is per kg.
FMCG products are quoted in FMCG packing; the buying price is per carton. (`tabsFor` in `src/lib/costing/heads.js`.)
