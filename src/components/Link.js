import NextLink from 'next/link';

// Site-wide link that does not prefetch. Next.js prefetches every link that scrolls into view; on Vercel each
// prefetch is an ISR read (88 of them per homepage visit), which used up the free plan. The pages are static,
// so a click still opens fast. Pass prefetch={true} for the rare link that should load ahead.
export default function Link({ prefetch = false, ...props }) {
  return <NextLink prefetch={prefetch} {...props} />;
}
