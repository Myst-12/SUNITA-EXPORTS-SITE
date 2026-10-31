import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import { COMPANY } from '@/config/site';
import x from './infrastructure.module.css';

export const metadata = {
  title: 'Infrastructure — Factories at Unjha, Guntur & Nizamabad',
  description:
    'Two factories at Unjha, Gujarat and processing units at Guntur (Andhra Pradesh) and Nizamabad (Telangana), with modern machinery for cleaning, Sortex sorting, hulling, grinding and packing.',
  alternates: { canonical: '/infrastructure/' },
};

// Factory photographs only, twelve so the grid fills evenly at four and at two across.
const GALLERY = [
  { img: '/images/infrastructure/grinding-line.webp', alt: 'Grinding and sieving line' },
  { img: '/images/infrastructure/grinding-hall.webp', alt: 'Cleaning and grinding machinery in the factory hall' },
  { img: '/images/infrastructure/cleaning-plant.webp', alt: 'Cleaning plant with elevators and bins' },
  { img: '/images/infrastructure/pulveriser-line.webp', alt: 'Pulveriser and blending line' },
  { img: '/images/infrastructure/milling-floor.webp', alt: 'Milling floor with grinders and screw conveyors' },
  { img: '/images/infrastructure/processing-line.webp', alt: 'Cleaning and grading line with storage bins' },
  { img: '/images/infrastructure/colour-sorter.webp', alt: 'Optical colour sorter' },
  { img: '/images/infrastructure/warehouse-hall.webp', alt: 'Covered storage hall with bagged produce' },
  { img: '/images/infrastructure/sifter-line.webp', alt: 'Sifter, cyclone and pulveriser in the grinding plant' },
  { img: '/images/infrastructure/bag-store.webp', alt: 'Palletised bags in the warehouse' },
  { img: '/images/infrastructure/sack-store.webp', alt: 'Bagged goods stacked on pallets' },
  { img: '/images/infrastructure/container-loading.webp', alt: 'Loading a container for export' },
];

export default function InfrastructurePage() {
  return (
    <>
      <section className={x.head}>
        <div className="container">
          <Breadcrumb inline items={[{ label: 'Infrastructure', href: '/infrastructure/' }]} />
          <h1>Infrastructure</h1>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className={x.intro}>
            <p className="lead">
              Sunita Agri Exports processes what it ships. Since {COMPANY.foundingYear} we have built our own processing base in the towns where
              India’s spices are grown and traded: two factories at Unjha in Gujarat, the country’s largest seed-spice market, and processing
              units at Guntur in Andhra Pradesh for chillies and at Nizamabad in Telangana for turmeric.
            </p>
            <p>
              Working next to the market yards means produce is cleaned and graded within days of harvest, while its colour, aroma and oil
              content are at their best. Each unit runs modern machinery for every stage of the work — pre-cleaning and destoning, gravity
              separation, Sortex optical colour sorting, hulling, temperature-controlled grinding and sieving, blending, and packing in bulk,
              retail and private-label formats. Steam sterilisation is available for markets that require it.
            </p>
            <p>
              Quality is checked at every step. Lots are sampled when they arrive and again before dispatch, and our own checks are backed by
              reports from internationally accredited laboratories for moisture, purity, colour, aflatoxins, pesticide residues and
              microbiology — so the product in the container matches the agreed specification from the first bag to the last.
            </p>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <h2 className={x.title}>Inside our units</h2>
          <div className={x.gallery}>
            {GALLERY.map((g) => (
              <div key={g.img} className={x.shot}>
                <Image src={g.img} alt={g.alt} fill sizes="(max-width: 700px) 50vw, 25vw" />
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
