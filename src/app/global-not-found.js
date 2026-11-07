import SiteLayout from './(site)/layout';
import NotFound from './(site)/not-found';

export const metadata = { title: 'Page not found | Sunita Agri Exports' };

// With a root layout per section (English, Arabic), URLs that match no page land here: the English site shell.
export default function GlobalNotFound() {
  return <SiteLayout><NotFound /></SiteLayout>;
}
