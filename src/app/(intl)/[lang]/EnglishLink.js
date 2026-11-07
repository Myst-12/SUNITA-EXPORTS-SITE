'use client';

import { usePathname } from 'next/navigation';

// "English" in the translated sections opens the same page in English (every translated page has one).
export default function EnglishLink({ lang, className, children }) {
  const path = (usePathname() || `/${lang}/`).replace(new RegExp(`^/${lang}(?=/|$)`), '') || '/';
  return <a href={path.endsWith('/') ? path : `${path}/`} hrefLang="en" lang="en" className={className}>{children}</a>;
}
