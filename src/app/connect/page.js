import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import SocialLinks from '@/components/SocialLinks';
import { COMPANY, CONTACT, DIRECTORS, SITE_URL, fullAddress, mapsLink, ukAddress, ukMapsLink, whatsappLink } from '@/config/site';
import styles from './connect.module.css';

// Digital business card opened by the QR code on page 2 of the printed brochure.
export const metadata = {
  title: 'Contact Our Directors',
  description: `Call or WhatsApp ${COMPANY.legalName} directors Alok Dhanuka and Ankit Dhanuka, Mumbai.`,
  alternates: { canonical: '/connect/' },
  robots: { index: false, follow: true },
};

const digits = (n) => n.replace(/\D/g, '');

export default function ConnectPage() {
  const site = SITE_URL.replace(/^https?:\/\//, '');
  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <header className={styles.head}>
          <Image src="/images/logo-mark.png" alt="" width={72} height={72} className={styles.logo} priority />
          <h1>{COMPANY.legalName}</h1>
          <p className={styles.status}>{COMPANY.status}</p>
          <p className={styles.since}>Exporters of Indian spices, rice, pulses &amp; groceries · Since {COMPANY.foundingYear}</p>
        </header>

        <div className={styles.people}>
          {DIRECTORS.map((d) => (
            <article key={d.name} className={styles.person}>
              <Image src={d.image} alt={d.name} width={320} height={400} className={styles.photo} priority />
              <div className={styles.who}>
                <h2>{d.name}</h2>
                <span className={styles.role}>{d.role}</span>
                {d.phone && <a className={styles.number} href={`tel:+${digits(d.phone)}`}>{d.phone}</a>}
              </div>
              <div className={styles.buttons}>
                {d.phone && (
                  <a className={styles.call} href={`tel:+${digits(d.phone)}`} aria-label={`Call ${d.name}`}>
                    <Icon name="phone" size={18} /> Call
                  </a>
                )}
                {d.whatsapp && (
                  <a className={styles.wa} href={`https://wa.me/${digits(d.whatsapp)}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${d.name}`}>
                    <Icon name="whatsapp" size={18} /> WhatsApp
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.quick}>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><span className={styles.qWa}><Icon name="whatsapp" size={22} /></span>WhatsApp</a>
          <a href={`mailto:${CONTACT.email}`}><span><Icon name="mail" size={22} /></span>Email</a>
          <a href="/connect/sunita-agri-exports.vcf" download><span><Icon name="download" size={22} /></span>Save contact</a>
          <Link href="/contact/"><span><Icon name="file" size={22} /></span>Get a quote</Link>
        </div>

        <dl className={styles.details}>
          <div>
            <dt><Icon name="mail" size={18} /> Email</dt>
            <dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd>
          </div>
          <div>
            <dt><Icon name="phone" size={18} /> Office</dt>
            <dd><a href={`tel:${CONTACT.landline.tel}`}>{CONTACT.landline.display}</a></dd>
          </div>
          <div>
            <dt><Icon name="globe" size={18} /> Website</dt>
            <dd><Link href="/">{site}</Link></dd>
          </div>
          <div>
            <dt><Icon name="pin" size={18} /> Office address</dt>
            <dd><a href={mapsLink()} target="_blank" rel="noopener noreferrer">{fullAddress()}</a></dd>
          </div>
          <div>
            <dt><Icon name="pin" size={18} /> UK office</dt>
            <dd><a href={ukMapsLink()} target="_blank" rel="noopener noreferrer">{ukAddress()}</a></dd>
          </div>
          <div>
            <dt><Icon name="clock" size={18} /> Hours</dt>
            <dd>{CONTACT.hours}</dd>
          </div>
        </dl>

        <div className={styles.social}>
          <SocialLinks label="Follow us" />
        </div>
      </div>
    </section>
  );
}
