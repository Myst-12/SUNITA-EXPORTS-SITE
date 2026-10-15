import PageHero from '@/components/PageHero';
import { COMPANY, CONTACT, fullAddress } from '@/config/site';

export const metadata = {
  title: 'Terms of Use',
  description: `Terms for using the ${COMPANY.legalName} website and its product information.`,
  alternates: { canonical: '/terms/' },
};

const UPDATED = '15 October 2026';

export default function TermsPage() {
  return (
    <>
      <PageHero compact crumbs={[{ label: 'Terms of Use', href: '/terms/' }]} title="Terms of Use" lead={`Last updated ${UPDATED}.`} />
      <section className="section-sm">
        <div className="container container-narrow prose">
          <p>
            By using this website you agree to these terms. The site is operated by {COMPANY.legalName}, {fullAddress()}.
          </p>

          <h2>Product information</h2>
          <p>
            Product descriptions, specifications, grades, packaging options, shelf life and HS codes are given in good
            faith for general information. They are typical values, not a contract. Final specifications, quantities,
            prices and delivery terms are agreed in writing for each order (proforma invoice or sales contract).
          </p>

          <h2>Prices and quotations</h2>
          <p>
            No prices are published on this website. Quotations are valid only for the period stated in them and depend on
            crop, market and freight conditions. A quotation is not a binding offer until confirmed in writing by both parties.
          </p>

          <h2>Images</h2>
          <p>
            Some photographs on this site are licensed stock images used for illustration and may not show our own
            products or facilities. See <a href="/credits/">image credits</a>.
          </p>

          <h2>Brands and trademarks</h2>
          <p>
            Where we supply branded products, they remain the trademarks of their owners and are supplied subject to
            availability for export. Our name and logo may not be used without permission.
          </p>

          <h2>Use of the site</h2>
          <p>
            Please do not misuse the website, attempt to access it without authorisation, or submit false or automated
            enquiries. We may block access that harms the site or other users.
          </p>

          <h2>Liability</h2>
          <p>
            We work to keep the information accurate and current but cannot guarantee it is complete or error-free. To the
            extent permitted by law, we are not liable for losses arising from reliance on website content alone. Trade
            terms for each order govern our responsibilities for that order.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of India, with courts in Mumbai having jurisdiction.</p>

          <h2>Contact</h2>
          <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> · {CONTACT.phones[0].display}</p>
        </div>
      </section>
    </>
  );
}
