# Event forms — setup

Admin page: `/admin` · public forms: `/f/<form-name>` · code: `src/lib/forms/`, `src/app/admin/`, `src/app/f/`, `src/app/api/forms/`.

Works on any Node host that runs Next.js (Vercel, Netlify, Render, a VPS). Settings are the keys in `.env.example`.

## 1. Admin password
Set `ADMIN_PASSWORD` on the host (and in `.env.local` for localhost).

## 2. Database (Supabase, free)
1. supabase.com → New project.
2. SQL Editor → run:

```sql
create table forms (
  id uuid primary key,
  slug text unique not null,
  title text not null,
  intro text,
  fields jsonb not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  closed_at timestamptz
);
create table responses (
  id uuid primary key,
  form_id uuid not null references forms(id) on delete cascade,
  data jsonb not null,
  created_at timestamptz not null default now()
);
create index responses_form_id on responses(form_id);
-- Only the server (service key) reads and writes; block public access.
alter table forms enable row level security;
alter table responses enable row level security;
```

3. Project settings → API: copy the Project URL to `SUPABASE_URL` and the secret key (`sb_secret_…`, or the legacy `service_role` key) to `SUPABASE_SERVICE_KEY`. Keep the service key secret — host settings only, never in the code.

Without these two keys, responses go to `.data/forms.json` on the machine running the site. That is fine on localhost but is lost on serverless hosts.

## 3. Email (Resend, free 3,000/month)
1. resend.com → API keys → create one → `RESEND_API_KEY`.
2. `FORMS_NOTIFY_EMAIL` = where the Excel goes (comma-separate for several).
3. To send from `@sunitaexports.com`, verify the domain in Resend and set `FORMS_FROM_EMAIL`, e.g. `Sunita Agri Exports <forms@sunitaexports.com>`. Until then Resend's test sender only delivers to the Resend account's own email.

Without a key, closing a form saves the Excel to `.data/outbox/` instead of emailing it.

## 4. Online FMCG orders and buyer accounts
Buyers create an account at `/account/signup/`, add products on `/fmcg/#order`, and place the order at `/order/`. Orders appear in admin under **Orders** (`/admin/orders/`) with an Excel download. Code: `src/lib/shop/`, `src/app/account/`, `src/app/order/`, `src/app/admin/orders/`.

Run once in the Supabase SQL Editor:

```sql
create table customers (
  id uuid primary key,
  email text unique not null,
  name text not null,
  company text,
  phone text,
  country text,
  password_hash text not null,
  created_at timestamptz not null default now()
);
create table orders (
  id uuid primary key,
  number text unique not null,
  customer_id uuid not null references customers(id) on delete cascade,
  customer jsonb not null,
  items jsonb not null,
  details jsonb not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create index orders_customer_id on orders(customer_id);
alter table customers enable row level security;
alter table orders enable row level security;
```

### Buyer reviews
Buyers can review each order (not cancelled) from `/account/`. Reviews wait in admin under **Reviews** (`/admin/reviews/`) and appear on the homepage (`/#reviews`) once published. Run once:

```sql
create table reviews (
  id uuid primary key,
  customer_id uuid not null references customers(id) on delete cascade,
  order_id uuid unique not null references orders(id) on delete cascade,
  order_number text not null,
  customer jsonb not null,
  show_company boolean not null default true,
  rating int not null check (rating between 1 and 5),
  body text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
create index reviews_customer_id on reviews(customer_id);
alter table reviews enable row level security;
```

Buyer log-ins are signed with `CUSTOMER_SECRET` (any long random text). If it is not set, `ADMIN_PASSWORD` is used, so changing the admin password logs every buyer out. Each order emails the client (`FORMS_NOTIFY_EMAIL`) and the buyer through Resend.
