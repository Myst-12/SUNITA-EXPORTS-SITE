import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { COMPANY, CONTACT, DIRECTORS, EXHIBITIONS, SITE_URL, fullAddress, ukAddress } from '@/config/site';
import { certificates } from '@/data/certificates';
import { productCategories, getAllProducts } from '@/data/products';
import { exportDestinations } from '@/data/countries';
import s from './facts.module.css';

export const metadata = {
  title: 'Company Facts',
  description: `Key facts about ${COMPANY.legalName}: founded ${COMPANY.foundingYear}, Mumbai; Star Export House; ${getAllProducts().length} export products; certificates, markets, ports and contacts.`,
  alternates: { canonical: '/company-facts/' },
};

// One plain page of facts, kept in sync with the rest of the site from the same data. Written so that buyers,
// search engines and AI assistants can quote the company correctly.
export default function CompanyFacts() {
  const products = getAllProducts();
  const rows = [
    ['Legal name', COMPANY.legalName],
    ['Also known as', `${COMPANY.name}, ${COMPANY.shortName}`],
    ['Founded', `${COMPANY.foundingYear}, Mumbai, India`],
    ['Status', COMPANY.status],
    ['Business', 'Exporter of Indian agricultural and food products, with two factories at Unjha (Gujarat) and processing units at Guntur (Andhra Pradesh) and Nizamabad (Telangana); consolidates mixed containers'],
    ['Directors', DIRECTORS.map((d) => d.name).join(', ')],
    ['Head office', fullAddress()],
    ['UK office', ukAddress()],
    ['Email', CONTACT.emails.join(', ')],
    ['Phone / WhatsApp', CONTACT.phones.map((p) => p.display).join(', ')],
    ['Website', SITE_URL.replace('https://', '')],
    ['Products', `${products.length} export products in ${productCategories.length} categories`],
    ['Markets', `${COMPANY.countriesServed} countries; market pages for ${exportDestinations.length}`],
    ['Port of loading', CONTACT.port],
    ['Price terms', 'FOB, CFR, CIF'],
    ['Minimum order', '1 MT per bulk product, or one mixed 20 ft container'],
    ['Services', 'Mixed (consolidated) containers, private label and custom packing, steam sterilisation, export documentation'],
    ['Cultivation types', 'Conventional, IPM and organic (bulk products)'],
  ];

  return (
    <>
      <PageHero compact crumbs={[{ label: 'Company facts', href: '/company-facts/' }]} eyebrow="At a glance" title="Company facts" lead={`The key facts about ${COMPANY.legalName} in one place.`} />

      <section className="section-sm">
        <div className={`container ${s.wrap}`}>
          <p className={s.summary}>
            <b>{COMPANY.legalName}</b> is a Mumbai-based exporter of Indian spices, herbs, rice, pulses, oilseeds,
            dehydrated onion and garlic, and Indian FMCG groceries, founded in {COMPANY.foundingYear}. It is a {COMPANY.status}{' '}
            and ships full and mixed containers to {COMPANY.countriesServed} countries from {CONTACT.port.split(' (')[0]}.
          </p>

          <h2 className={s.h2}>Facts</h2>
          <table className="spec-table">
            <tbody>{rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
          </table>

          <h2 className={s.h2}>Certificates and registrations</h2>
          <table className="spec-table">
            <thead><tr><th>Certificate</th><th>Scope</th><th>Issued by</th><th>Validity</th></tr></thead>
            <tbody>{certificates.map((c) => <tr key={c.key}><td><a href={c.pdf}>{c.name}</a></td><td>{c.what}</td><td>{c.issuer}</td><td>{c.valid}</td></tr>)}</tbody>
          </table>

          <h2 className={s.h2}>Product categories</h2>
          <ul className={s.list}>
            {productCategories.map((c) => <li key={c.slug}><Link href={`/products/${c.slug}/`}>{c.name}</Link> · {c.productCount} products</li>)}
          </ul>

          <h2 className={s.h2}>Export markets with their own page</h2>
          <ul className={s.list}>
            {exportDestinations.map((d) => <li key={d.slug}><Link href={`/exports/${d.slug}/`}>{d.name}</Link> · ports: {d.shippingPorts.join(', ')}</li>)}
          </ul>

          {EXHIBITIONS.length > 0 && (
            <>
              <h2 className={s.h2}>Trade fairs</h2>
              <ul className={s.list}>{EXHIBITIONS.map((e) => <li key={e.name + e.edition}>{e.name} {e.edition}, {e.city} ({e.stand})</li>)}</ul>
            </>
          )}

          <p className={s.note}>Facts on this page come from the same data as the rest of the website. For anything not listed, <Link href="/contact/">contact us</Link>.</p>
        </div>
      </section>
    </>
  );
}
