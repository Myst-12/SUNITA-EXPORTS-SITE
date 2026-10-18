import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Icon from '@/components/Icon';
import { exportDestinations } from '@/data/countries';
import { COMPANY, flagCode } from '@/config/site';
import s from '../pages.module.css';

export const metadata = {
  title: 'Export Markets — Indian Spices & Grocery Exporter Worldwide',
  description:
    'Sunita Agri Exports ships Indian spices, rice, pulses and FMCG groceries to 40+ countries including the USA, Canada, UK, Australia, New Zealand, UAE, Saudi Arabia, Kuwait, Oman, Qatar, Singapore, Malaysia, Japan, Turkey and East Africa.',
  alternates: { canonical: '/exports/' },
};

export default function ExportsPage() {
  const regions = [...new Set(exportDestinations.map((d) => d.region))];
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Export Markets', href: '/exports/' }]}
        eyebrow="Global reach"
        title={`Shipping Indian food to ${COMPANY.countriesServed} countries`}
        lead={`Exporting from Mumbai since ${COMPANY.foundingYear}, with market-specific labelling, documents and port experience across North America, Europe, the Gulf, Asia, Oceania and Africa.`}
        image="/images/scenes/ship-aerial.webp"
        imageAlt="Container ship at sea"
      />
      <section className={`section ${s.tintLime}`}>
        <div className="container" style={{ display: 'grid', gap: 36 }}>
          {regions.map((r) => (
            <div key={r}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{r}</h2>
              <div className={s.cards}>
                {exportDestinations.filter((d) => d.region === r).map((d) => (
                  <Link key={d.slug} href={`/exports/${d.slug}/`} className={s.feature} style={{ display: 'block' }}>
                    <span className="icon-tile lime" style={{ fontWeight: 800, fontSize: '0.8rem' }}>{flagCode(d.flag)}</span>
                    <h3>{d.name}</h3>
                    <p>{d.keyProducts.slice(0, 3).join(' · ')}</p>
                    <span className="link-arrow mt-1">View market <Icon name="arrow-right" /></span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
