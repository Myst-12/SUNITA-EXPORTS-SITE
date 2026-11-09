# Quotation cost calculator — setup

Admin page: `/admin/quotation/` · code: `src/lib/costing/`, `src/app/(site)/admin/quotation/`.

## How it is used
1. Search the product. FMCG products are quoted as **FMCG** automatically; for the rest pick **Consumer** or **Bulk**.
2. Type today's buying price (it changes daily) and, if wanted, × a quantity.
3. Each box is one row of the client's costing sheet (bag cost, storage, thappi, freight…). **Add +** saves an option for
   that box: a name (e.g. "500 × 1000", "25 kg PP bag") and its ₹ amount. Saved options appear in the box's drop-down
   next time. Each picked option can be × a quantity; its amount shows under the box.
4. Profit % is added on all costs before freight → FOB. + Freight → CFR. + Insurance % of CFR → CIF (the final price).
   With the ₹-per-USD rate filled in, prices also show in USD.

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
