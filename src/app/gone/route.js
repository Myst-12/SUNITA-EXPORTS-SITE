// 410 Gone for old-site URLs with no new equivalent (see src/data/legacyRedirects.mjs).
export const dynamic = 'force-static';

export function GET() {
  return new Response('Gone. This page belonged to the old website. Visit https://www.sunitaexports.com/', {
    status: 410,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
