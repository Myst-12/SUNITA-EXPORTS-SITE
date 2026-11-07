import { FMCG_CATEGORIES, fmcgItemsIn } from '@/lib/shop/fmcg';
import { buildCatalogueWorkbook } from '@/lib/shop/excel';

// One Excel file per category (and "all"), built once at deploy time: /fmcg/catalogue/excel/<category>/
export const dynamicParams = false;
export const generateStaticParams = () => [{ slug: 'all' }, ...FMCG_CATEGORIES.map((c) => ({ slug: c.slug }))];

export async function GET(_req, { params }) {
  const { slug } = await params;
  const cat = FMCG_CATEGORIES.find((c) => c.slug === slug);
  const title = cat ? cat.name : 'All FMCG products';
  const buffer = await buildCatalogueWorkbook(title, fmcgItemsIn(cat?.slug), { withCategory: !cat });
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="sunita-agri-exports-fmcg-${slug}.xlsx"`,
    },
  });
}
