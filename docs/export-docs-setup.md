# Export documents: database setup (one time)

The admin tool at /admin/docs/ saves shipments in Supabase. Run this once in Supabase → SQL Editor:

```sql
create table shipments (
  id uuid primary key default gen_random_uuid(),
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table shipments enable row level security; -- only the server (service key) reads and writes it
```

Without the table, saving shows an error. On localhost without Supabase keys, shipments are kept in .data/shipments.json.
