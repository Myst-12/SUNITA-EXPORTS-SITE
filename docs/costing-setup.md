# Quotation cost calculator — setup

Admin page: `/admin/quotation/` · code: `src/lib/costing/`, `src/app/(site)/admin/quotation/`.

## How it is used
1. Search the product. FMCG products are quoted as **FMCG** automatically; for the rest pick **Consumer** or **Bulk**.
2. Fill the packing for one carton (one bag in Bulk): pack size, pieces per carton, labels per piece, number of cartons.
   Everything is worked out per carton, like the client's own price lists (e.g. the REO price list).
3. Type today's buying price (it changes daily), per kg, per piece or per carton.
4. Each box is one row of the client's costing sheet (bag cost, storage, thappi, freight…). **Add +** saves an option for
   that box: a name (e.g. "500 × 1000", "25 kg PP bag") and its ₹ amount. Saved options appear in the box's drop-down
   next time. The box's quantity for one carton comes from its unit: per kg → kg in a carton, per pouch/packet/tin/jar →
   pieces, per label → pieces × labels per piece, per carton/bag → 1, per container → shared over the number of cartons.
   Typing a quantity in the box overrides it (e.g. FOB charges per kg).
5. Profit % is added on all costs before freight → FOB. + Freight → CFR. + Insurance % of CFR → CIF (the final price).
   With the ₹-per-USD rate filled in, prices also show in USD: per carton, per kg, and for all the cartons.

Nothing is pre-filled: the client adds his own options. They are his internal costs, so they are kept in the database
(table below), **never in the code** — the repo is public. The dollar rate and insurance % are remembered in the browser.

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

The options are stored as one row, `key = 'quote-options'`. Without Supabase keys (localhost test mode) they are
saved to `.data/quote-options.json`.

## Rows per packing type
The rows come from the client's costing sheet (Bulk packing costs, Consumer, FMCG tabs) and live in
`src/lib/costing/heads.js`. Adding or renaming a row there keeps the options already saved for the other rows.
