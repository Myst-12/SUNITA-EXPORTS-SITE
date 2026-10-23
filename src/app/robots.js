import { SITE_URL } from '@/config/site';

const PRIVATE = ['/admin/', '/f/', '/api/'];
// Search and AI crawlers named explicitly so it is clear they are welcome. A crawler with its own group
// ignores the * group, so each one repeats the private paths.
const NAMED_BOTS = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'Google-Extended', 'Applebot', 'Applebot-Extended'];

export default function robots() {
  return {
    rules: [
      ...NAMED_BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow: PRIVATE })),
      { userAgent: '*', allow: '/', disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
