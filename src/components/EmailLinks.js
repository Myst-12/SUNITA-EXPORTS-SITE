import { CONTACT } from '@/config/site';

/** Every company email as its own mailto link, separated by `sep` (or wrapped in `as` elements, e.g. list items). */
export default function EmailLinks({ sep = ' · ', as: Wrap, subject }) {
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  const links = CONTACT.emails.map((e) => <a key={e} href={`mailto:${e}${q}`}>{e}</a>);
  if (Wrap) return links.map((l) => <Wrap key={l.key}>{l}</Wrap>);
  return links.map((l, i) => <span key={l.key}>{i > 0 && sep}{l}</span>);
}
