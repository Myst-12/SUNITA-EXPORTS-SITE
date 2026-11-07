import { Suspense } from 'react';
import { AR, AR_CONTACT } from '@/data/ar';
import { arAlternates } from '@/lib/i18n';
import { CONTACT, whatsappLink } from '@/config/site';
import ArabicQuoteForm from './ArabicQuoteForm';
import s from '../ar.module.css';

export const metadata = {
  title: 'اطلب عرض سعر للتوابل والأرز الهندي',
  description: 'أرسل قائمة المنتجات والكميات وميناء الوصول، واحصل على عرض سعر FOB أو CFR أو CIF خلال ٢٤ ساعة. واتساب ‎+91 81692 82942.',
  alternates: arAlternates('/contact/'),
};

export default function ArabicContact() {
  return (
    <section className={s.page}>
      <div className="container">
        <h1 className={s.h2}>{AR_CONTACT.title}</h1>
        <p className={s.text} style={{ maxWidth: '60ch' }}>{AR_CONTACT.lead}</p>
        <Suspense><ArabicQuoteForm /></Suspense>
        <h2 className={s.h2} style={{ marginTop: 40, fontSize: '1.2rem' }}>{AR_CONTACT.direct}</h2>
        <div className={s.actions}>
          <a href={whatsappLink('مرحباً، أرغب في عرض سعر.')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">{AR.whatsapp}: <span dir="ltr">{CONTACT.whatsappDisplay}</span></a>
          {CONTACT.emails.map((e) => <a key={e} href={`mailto:${e}`} className="btn btn-outline" dir="ltr">{e}</a>)}
        </div>
      </div>
    </section>
  );
}
