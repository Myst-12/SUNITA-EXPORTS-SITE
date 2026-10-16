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
