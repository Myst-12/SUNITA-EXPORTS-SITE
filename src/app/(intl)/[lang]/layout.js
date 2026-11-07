import { IBM_Plex_Sans_Arabic, Manrope } from 'next/font/google';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import '../../(site)/globals.css';
import Analytics from '@/components/Analytics';
import { SITE_URL, GA_ID, CONTACT, whatsappLink } from '@/config/site';
import { TEXT } from '@/data/i18n';
import { LOCALES, LANG_CODES } from '@/lib/i18n';
import { organizationSchema } from '@/lib/schemas';
import EnglishLink from './EnglishLink';
import s from './intl.module.css';

const arabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '600', '700'], variable: '--font-intl', display: 'swap' });
const latin = Manrope({ subsets: ['latin', 'latin-ext', 'cyrillic'], variable: '--font-intl', display: 'swap' });

export const dynamicParams = false;
export const generateStaticParams = () => LANG_CODES.map((lang) => ({ lang }));
export const viewport = { themeColor: '#ffffff', viewportFit: 'cover' };

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = TEXT[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.ui.meta.homeTitle, template: `%s | ${t.ui.company}` },
    openGraph: { type: 'website', locale: LOCALES[lang].ogLocale, siteName: t.ui.company, images: ['/images/og-image.jpg'] },
  };
}

// Translated sections: their own <html lang dir> shell, header and footer, one per language prefix.
export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const t = TEXT[lang];
  if (!t) notFound();
  const { ui } = t;
  return (
    <html lang={lang} dir={LOCALES[lang].dir} className={(lang === 'ar' ? arabic : latin).variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      </head>
      <body className={s.body}>
        <a href="#main-content" className="skip-link">{ui.skip}</a>
        <header className={s.header}>
          <div className={`container ${s.headerInner}`}>
            <Link href={`/${lang}/`} className={s.brand}>
              <img src="/images/logo-mark-96.webp" alt="" width={40} height={40} />
              <span><b>{ui.company}</b><small>{ui.status}</small></span>
            </Link>
            <nav className={s.nav} aria-label={ui.nav[0][1]}>
              {ui.nav.map(([href, label]) => <Link key={href} href={`/${lang}/${href}`}>{label}</Link>)}
              <EnglishLink lang={lang} className={s.lang}>{ui.english}</EnglishLink>
            </nav>
          </div>
        </header>
        <main id="main-content">{children}</main>
        <footer className={s.footer}>
          <div className={`container ${s.footerInner}`}>
            <div>
              <b>{ui.company}</b>
              <p>{ui.footer}</p>
              <p lang="en" dir="ltr">Sunita Agri Exports Pvt. Ltd. · Mumbai, India</p>
            </div>
            <div className={s.footerContact}>
              <a href={whatsappLink(ui.hello)} target="_blank" rel="noopener noreferrer">{ui.whatsapp}: <span dir="ltr">{CONTACT.whatsappDisplay}</span></a>
              {CONTACT.emails.map((e) => <a key={e} href={`mailto:${e}`} dir="ltr">{e}</a>)}
            </div>
          </div>
        </footer>
        <Analytics gaId={GA_ID} />
      </body>
    </html>
  );
}
