import Link from 'next/link';
import { isAdmin, adminConfigured } from '@/lib/forms/auth';
import { listForms, listAllResponses, usingDatabase } from '@/lib/forms/store';
import { formStats } from '@/lib/forms/stats';
import { getAllProducts } from '@/data/products';
import { CONTACT, GA_ID } from '@/config/site';
import Icon from '@/components/Icon';
import { login } from './actions';
import { TOOLS } from './tools';
import PasswordInput from './PasswordInput';
import s from './admin.module.css';

const ist = (iso, opts) => new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', ...opts });
// Company (when the name is already the heading) and country.
const who = (r) => [r.data.name && r.data.company, r.data.country].filter(Boolean).join(' · ');
const countSince = (responses, days) => {
  const from = Date.now() - days * 864e5;
  return responses.filter((r) => new Date(r.created_at).getTime() >= from).length;
};

function Bars({ title, rows }) {
  if (!rows.length) return null;
  const max = Math.max(...rows.map(([, c]) => c));
  return (
    <div className={s.stat}>
      <h3>{title}</h3>
      {rows.map(([label, c]) => (
        <div key={label} className={s.bar}>
          <span className={s.barLabel}>{label}</span>
          <span className={s.barTrack}><span style={{ width: `${(c / max) * 100}%` }} /></span>
          <span className={s.barNum}>{c}</span>
        </div>
      ))}
    </div>
  );
}

// Forms and responses; a database outage shows a message instead of breaking the whole dashboard.
async function loadLeads() {
  try {
    const [forms, responses] = await Promise.all([listForms(), listAllResponses()]);
    return { forms, responses };
  } catch (e) {
    console.error(e);
    return { forms: [], responses: [], failed: true };
  }
}

function Login({ error }) {
  return (
    <div className={`container ${s.wrap}`}>
      <form action={login} className={`${s.card} ${s.narrow} ${s.stack}`} style={{ marginTop: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', margin: 0 }}>Admin</h1>
          <p className={s.sub}>Sunita Agri Exports · log in to continue</p>
        </div>
        {!adminConfigured() && <p className={s.err}>ADMIN_PASSWORD is not set on the server yet.</p>}
        <div>
          <label htmlFor="password" className={s.label}>Password</label>
          <PasswordInput id="password" name="password" required autoComplete="current-password" />
        </div>
        {error && <p className={s.err}>Wrong password.</p>}
        <button className={`btn btn-primary btn-lg ${s.submit}`} type="submit">Log in</button>
      </form>
    </div>
  );
}

export default async function AdminHome({ searchParams }) {
  const { error } = await searchParams;
  if (!(await isAdmin())) return <Login error={error} />;

  const { forms, responses, failed } = await loadLeads();
  const stats = formStats(responses);
  const lastWeek = countSince(responses, 7);
  const openForms = forms.filter((f) => f.status === 'open');
  const formTitle = Object.fromEntries(forms.map((f) => [f.id, f.title]));
  const recent = responses.slice(0, 6);

  const products = getAllProducts();

  const toolStatus = {
    forms: failed ? 'Database not reachable' : `${openForms.length} open · ${forms.length} form${forms.length === 1 ? '' : 's'} · ${responses.length} response${responses.length === 1 ? '' : 's'}`,
  };

  const sbRef = process.env.SUPABASE_URL?.match(/^https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];
  const links = [
    { label: 'Website home', href: '/' },
    { label: 'All products', href: '/products/' },
    { label: 'Get a quote page', href: '/contact/' },
    { label: 'Contact card (brochure QR)', href: '/connect/' },
    { label: 'Sitemap', href: '/sitemap.xml' },
    { label: 'Email inbox', href: 'https://mail.google.com/', external: true },
    { label: 'Google Search Console', href: 'https://search.google.com/search-console', external: true },
    GA_ID && { label: 'Google Analytics', href: 'https://analytics.google.com/', external: true },
    sbRef && { label: 'Forms database (Supabase)', href: `https://supabase.com/dashboard/project/${sbRef}`, external: true },
  ].filter(Boolean);

  return (
    <div className={`container ${s.wrap} ${s.wide}`}>
      <div className={s.head}>
        <div>
          <h1>Dashboard</h1>
          <p className={s.sub}>{ist(new Date().toISOString(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {failed && <p className={s.warn}>Could not reach the forms database, so lead numbers are missing. Try again in a minute.</p>}
      {!usingDatabase && <p className={s.warn}>Test mode: form responses are saved on this computer only.</p>}

      <div className={s.tiles}>
        <div><b>{lastWeek}</b><span>Leads in the last 7 days</span></div>
        <div><b>{stats.today}</b><span>Leads today</span></div>
        <div><b>{openForms.length}</b><span>Forms open now</span></div>
        <div><b>{products.length}</b><span>Products in catalogue</span></div>
      </div>

      <section className={s.section}>
        <h2 className={s.h2}>Tools</h2>
        <div className={s.tools}>
          {TOOLS.map((t) => (
            <Link key={t.slug} href={t.href} className={`${s.tool} ${t.soon ? s.toolSoon : ''}`}>
              <span className={`icon-tile ${t.soon ? 'turmeric' : ''}`}><Icon name={t.icon} /></span>
              <span className={s.toolBody}>
                <b>{t.name}</b>
                <span>{t.description}</span>
                {t.soon ? <span className={s.soon}>Coming soon</span> : toolStatus[t.slug] && <small>{toolStatus[t.slug]}</small>}
              </span>
              <Icon name="chevron-right" size={20} className={s.toolArrow} />
            </Link>
          ))}
        </div>
      </section>

      <div className={s.dash}>
        <section className={s.card}>
          <div className={s.cardHead}>
            <h2 className={s.h2}>Latest leads in forms</h2>
            {forms.length > 0 && <Link href="/admin/forms/" className={s.more}>All forms</Link>}
          </div>
          {recent.length === 0 ? (
            <p className={s.meta} style={{ margin: '6px 0 0' }}>No leads yet. Responses to your event forms show up here.</p>
          ) : (
            <div className={s.responses}>
              {recent.map((r) => (
                <Link key={r.id} href={`/admin/forms/${r.form_id}/`} className={`${s.resp} ${s.respLink}`}>
                  <b>{r.data.name || r.data.company || 'Response'}</b>
                  {who(r) && <span>{who(r)}</span>}
                  <span>{formTitle[r.form_id] || 'Form'} · {ist(r.created_at, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                </Link>
              ))}
            </div>
          )}
          <p className={s.meta} style={{ margin: '14px 0 0' }}>Quote requests from the website go straight to {CONTACT.email} and are not stored here.</p>
        </section>

        <div className={s.stack} style={{ alignContent: 'start' }}>
          <section className={s.card}>
            <h2 className={s.h2}>What buyers ask for</h2>
            {stats.total === 0 ? (
              <p className={s.meta} style={{ margin: '6px 0 0' }}>Countries and products appear once forms get responses.</p>
            ) : (
              <div className={s.stats} style={{ marginTop: 10 }}>
                <Bars title="Top countries" rows={stats.countries} />
                <Bars title="Most asked-for products" rows={stats.products} />
              </div>
            )}
          </section>

          <section className={s.card}>
            <h2 className={s.h2}>Quick links</h2>
            <ul className={s.links}>
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {l.label}<Icon name={l.external ? 'arrow-up-right' : 'arrow-right'} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
