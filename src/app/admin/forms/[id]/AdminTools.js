'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function CopyLink({ url }) {
  const [copied, setCopied] = useState(false);
  return (
    <button type="button" className="btn btn-outline" style={{ flex: 'none', minHeight: 48 }} onClick={() => navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); })}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

/** Refreshes the response count while the form is open. */
export function LiveRefresh({ seconds = 15 }) {
  const router = useRouter();
  useEffect(() => {
    const t = setInterval(() => router.refresh(), seconds * 1000);
    return () => clearInterval(t);
  }, [router, seconds]);
  return null;
}

export function ConfirmButton({ children, message, className }) {
  return <button type="submit" className={className} onClick={(e) => { if (!confirm(message)) e.preventDefault(); }}>{children}</button>;
}
