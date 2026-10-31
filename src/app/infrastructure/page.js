import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import x from './infrastructure.module.css';

export const metadata = {
  title: 'Infrastructure — Factories at Unjha, Guntur & Nizamabad',
  description:
    'Two factories at Unjha, Gujarat and processing units at Guntur (Andhra Pradesh) and Nizamabad (Telangana), with modern machinery for cleaning, Sortex sorting, hulling, grinding and packing.',
  alternates: { canonical: '/infrastructure/' },
};

// Which stages each unit runs. Shown as ticks in the facilities table.
const STAGES = ['Cleaning & Sortex', 'Hulling', 'Grinding', 'Packing'];
const UNITS = [
  { place: 'Unjha, Gujarat', unit: 'Factory 1', stages: ['Cleaning & Sortex', 'Packing'] },
  { place: 'Unjha, Gujarat', unit: 'Factory 2', stages: ['Cleaning & Sortex', 'Hulling', 'Packing'] },
  { place: 'Guntur, Andhra Pradesh', unit: 'Processing unit', stages: ['Grinding', 'Packing'] },
  { place: 'Nizamabad, Telangana', unit: 'Processing unit', stages: ['Grinding', 'Packing'] },
];

const GALLERY = [
  { img: '/images/infrastructure/processing-line.webp', alt: 'Cleaning and grading line with storage bins' },
  { img: '/images/infrastructure/colour-sorter.webp', alt: 'Optical colour sorter' },
  { img: '/images/infrastructure/warehouse-hall.webp', alt: 'Covered storage hall with bagged produce' },
  { img: '/images/infrastructure/sorting-line.webp', alt: 'Workers inspecting produce on a sorting line' },
  { img: '/images/infrastructure/hygiene-line.webp', alt: 'Staff in hairnets and gloves on a packing line' },
  { img: '/images/infrastructure/conveyor-line.webp', alt: 'Packing and conveyor line' },
  { img: '/images/infrastructure/quality-lab.webp', alt: 'Quality control laboratory' },
  { img: '/images/infrastructure/bag-store.webp', alt: 'Palletised bags in the warehouse' },
  { img: '/images/infrastructure/sack-store.webp', alt: 'Bagged goods stacked on pallets' },
  { img: '/images/scenes/warehouse-forklift.webp', alt: 'Forklift in the warehouse racking' },
  { img: '/images/scenes/warehouse-pallets.webp', alt: 'Pallet jack with sacks and crates' },
  { img: '/images/infrastructure/container-loading.webp', alt: 'Loading a container for export' },
];

export default function InfrastructurePage() {
  return (
    <>
      <section className={x.banner}>
        <Image src="/images/infrastructure/processing-line.webp" alt="" fill priority sizes="100vw" />
        <div className={`container ${x.bannerInner}`}>
          <Breadcrumb inline items={[{ label: 'Infrastructure', href: '/infrastructure/' }]} />
          <h1>Infrastructure</h1>
        </div>
      </section>

      <section className="section-sm">
        <div className={`container ${x.intro}`}>
          <p className="lead">
            We run two factories at Unjha in Gujarat and processing units at Guntur in Andhra Pradesh and Nizamabad in Telangana. Each is
            equipped with modern machinery for cleaning, Sortex colour sorting, hulling, grinding and packing, so every finished product
            meets international quality standards. Our quality checks include reports from internationally benchmarked laboratories.
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <h2 className={x.title}>Facilities</h2>
          <div className={x.tableWrap}>
            <table className={x.table}>
              <thead>
                <tr>
                  <th scope="col">Location</th>
                  {STAGES.map((st) => <th key={st} scope="col">{st}</th>)}
                </tr>
              </thead>
              <tbody>
                {UNITS.map((u) => (
                  <tr key={u.place + u.unit}>
                    <th scope="row">{u.place}<small>{u.unit}</small></th>
                    {STAGES.map((st) => (
                      <td key={st}>{u.stages.includes(st) ? <Icon name="check-circle" size={20} /> : <span aria-label="No">—</span>}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={x.note}>We also work with long-standing partner processors whose capacity is largely reserved for our orders.</p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <h2 className={x.title}>Inside our units</h2>
          <div className={x.gallery}>
            {GALLERY.map((g) => (
              <div key={g.img} className={x.shot}>
                <Image src={g.img} alt={g.alt} fill sizes="(max-width: 700px) 50vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <p className={x.closing}>Our strength is quality — from the market yard to the sealed container.</p>
        </div>
      </section>
    </>
  );
}
