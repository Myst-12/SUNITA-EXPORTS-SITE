import PageHero from '@/components/PageHero';
import { COMPANY, CONTACT, fullAddress } from '@/config/site';

export const metadata = {
  title: 'Privacy Policy',
  description: `How ${COMPANY.legalName} collects, uses and protects the information you share through this website.`,
  alternates: { canonical: '/privacy/' },
};

const UPDATED = '15 October 2026';

export default function PrivacyPage() {
  return (
    <>
      <PageHero compact crumbs={[{ label: 'Privacy Policy', href: '/privacy/' }]} title="Privacy Policy" lead={`Last updated ${UPDATED}.`} />
      <section className="section-sm">
        <div className="container container-narrow prose">
          <p>
            This policy explains how {COMPANY.legalName} (“we”, “us”), {fullAddress()}, handles personal information
            submitted through this website. We collect only what we need to answer trade enquiries.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li><strong>Enquiry details</strong> you enter in the quote form: name, company, email, phone or WhatsApp number, country, business type, products, quantities, port and notes.</li>
            <li><strong>Messages</strong> you send us by email or WhatsApp.</li>
            <li><strong>Basic technical data</strong> our hosting provider records automatically (such as IP address, browser type and pages requested) to keep the site secure and working.</li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry, prepare quotations, samples and shipments.</li>
            <li>To keep business records required for export and tax purposes.</li>
            <li>To protect the website against spam and abuse.</li>
          </ul>
          <p>We do not sell your information and we do not send marketing emails unless you ask us to.</p>

          <h2>Who we share it with</h2>
          <p>
            Your enquiry is delivered to our inbox through a form-delivery service (Web3Forms) and the site is hosted by
            Vercel. Once an order is placed, we share the details needed with logistics, inspection and banking partners
            to complete the shipment. These providers only process information to provide their service.
          </p>

          <h2>How long we keep it</h2>
          <p>Enquiries are kept for as long as needed to respond and follow up, and order records for the period required by law.</p>

          <h2>Your choices</h2>
          <p>
            You can ask us to see, correct or delete the personal information we hold about you by emailing{' '}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. We will respond within a reasonable time.
          </p>

          <h2>Cookies</h2>
          <p>This website does not use advertising or tracking cookies. If we add analytics in future, this page will be updated first.</p>

          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>, {CONTACT.phones[0].display}, {fullAddress()}.
          </p>
        </div>
      </section>
    </>
  );
}
