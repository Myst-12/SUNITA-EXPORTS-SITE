import fs from 'node:fs';
import path from 'node:path';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Image Credits',
  description: 'Credits and licences for photographs used on the Sunita Agri Exports website.',
  alternates: { canonical: '/credits/' },
  robots: { index: false, follow: true },
};

// Parses the markdown tables in public/images/CREDITS.md at build time.
function readCredits() {
  const md = fs.readFileSync(path.join(process.cwd(), 'public/images/CREDITS.md'), 'utf8');
  const rows = [];
  for (const line of md.split('\n')) {
    if (!line.startsWith('| ') || line.startsWith('| File') || line.startsWith('|---')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length === 2) rows.push({ file: cells[0], author: 'Unsplash contributor', licence: 'Unsplash License', source: cells[1] });
    if (cells.length === 4) rows.push({ file: cells[0], author: cells[1] || 'Unknown', licence: cells[2], source: cells[3] });
  }
  return rows;
}

export default function CreditsPage() {
  const rows = readCredits();
  return (
    <>
      <PageHero compact crumbs={[{ label: 'Image credits', href: '/credits/' }]} eyebrow="Credits" title="Image credits" lead="Product photographs are supplied by Sunita Agri Exports or are AI-generated illustrations. Some other photographs on this site are licensed stock images; we thank the photographers below." />
      <section className="section-sm">
        <div className="container">
          <div style={{ overflowX: 'auto', border: '1px solid var(--line)', borderRadius: 14 }}>
            <table className="spec-table" style={{ minWidth: 640 }}>
              <thead>
                <tr><th>Image</th><th>Author</th><th>Licence</th><th>Source</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.file}>
                    <td>{r.file.replace('.webp', '')}</td>
                    <td>{r.author}</td>
                    <td>{r.licence}</td>
                    <td><a href={r.source} target="_blank" rel="noopener noreferrer nofollow" className="text-green">View</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
