'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Logo link: goes home, and on the homepage itself scrolls back to the top.
export default function HomeLink({ onClick, ...props }) {
  const pathname = usePathname();
  return (
    <Link
      href="/"
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (pathname === '/') {
          e.preventDefault();
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        }
      }}
    />
  );
}
