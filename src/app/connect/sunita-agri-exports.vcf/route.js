import { COMPANY, CONTACT, DIRECTORS, SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

// "Save contact" card for /connect/: the company with every number, plus each director's own number once filled in.
export function GET() {
  const a = CONTACT.address;
  const esc = (s) => s.replace(/[,;\\]/g, (c) => `\\${c}`);
  const num = (n) => `+${n.replace(/\D/g, '')}`;
  // Directors' lines labelled with their names, then any company number not already listed.
  const phones = () => {
    const list = DIRECTORS.filter((d) => d.phone).map((d) => ({ tel: num(d.phone), label: `${d.name} (${d.role})` }));
    for (const p of CONTACT.phones) if (!list.some((l) => l.tel === p.tel)) list.push({ tel: p.tel, label: p.label });
    return list;
  };
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:;${esc(COMPANY.name)};;;`,
    `FN:${esc(COMPANY.name)}`,
    `ORG:${esc(COMPANY.legalName)}`,
    ...phones().map((p, i) => `item${i + 1}.TEL;TYPE=CELL:${p.tel}\r\nitem${i + 1}.X-ABLabel:${esc(p.label)}`),
    `TEL;TYPE=WORK,VOICE:${CONTACT.landline.tel}`,
    `EMAIL;TYPE=WORK:${CONTACT.email}`,
    `URL:${SITE_URL}`,
    `ADR;TYPE=WORK:;;${esc(a.street)};${esc(a.city)};${esc(a.region)};${a.postalCode};${esc(a.country)}`,
    `NOTE:${esc(`${COMPANY.status}. Directors: ${DIRECTORS.map((d) => d.name).join(' and ')}.`)}`,
    'END:VCARD',
  ];
  return new Response(lines.join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8', 'Content-Disposition': 'attachment; filename="sunita-agri-exports.vcf"' },
  });
}
