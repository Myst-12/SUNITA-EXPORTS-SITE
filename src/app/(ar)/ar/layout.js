import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import Link from 'next/link';
import '../../(site)/globals.css';
import Analytics from '@/components/Analytics';
import { SITE_URL, GA_ID, CONTACT, whatsappLink } from '@/config/site';
import { AR } from '@/data/ar';
import { LOCALES, arRobots } from '@/lib/i18n';
import s from './ar.module.css';

const plex = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '600', '700'], variable: '--font-ar', display: 'swap' });

export const viewport = { themeColor: '#ffffff', viewportFit: 'cover' };

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${AR.company} | مصدّر التوابل والأرز الهندي`, template: `%s | ${AR.company}` },
  openGraph: { type: 'website', locale: LOCALES.ar.ogLocale, siteName: AR.company, images: ['/images/og-image.jpg'] },
  robots: arRobots(),
};

// Arabic section: its own <html lang="ar" dir="rtl"> shell, header and footer.
export default function ArabicLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={plex.variable}>
      <body className={s.body}>
        <a href="#main-content" className="skip-link">انتقل إلى المحتوى</a>
        <header className={s.header}>
          <div className={`container ${s.headerInner}`}>
            <Link href="/ar/" className={s.brand}>
              <img src="/images/logo-mark-96.webp" alt="" width={40} height={40} />
              <span><b>{AR.company}</b><small>{AR.status}</small></span>
            </Link>
            <nav className={s.nav} aria-label="القائمة الرئيسية">
              {AR.nav.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
              <a href="/" hrefLang="en" lang="en" className={s.lang}>{AR.english}</a>
            </nav>
          </div>
        </header>
        {!LOCALES.ar.live && <p className={s.draft}>{AR.draft}</p>}
        <main id="main-content">{children}</main>
        <footer className={s.footer}>
          <div className={`container ${s.footerInner}`}>
            <div>
              <b>{AR.company}</b>
              <p>{AR.footer}</p>
              <p lang="en" dir="ltr">{AR.legalName}</p>
            </div>
            <div className={s.footerContact}>
              <a href={whatsappLink('مرحباً، أرغب في عرض سعر.')} target="_blank" rel="noopener noreferrer">{AR.whatsapp}: <span dir="ltr">{CONTACT.whatsappDisplay}</span></a>
              {CONTACT.emails.map((e) => <a key={e} href={`mailto:${e}`} dir="ltr">{e}</a>)}
            </div>
          </div>
        </footer>
        <Analytics gaId={GA_ID} />
      </body>
    </html>
  );
}
