import { Suspense } from 'react';
import { TEXT } from '@/data/i18n';
import { langAlternates } from '@/lib/i18n';
import { CONTACT, whatsappLink } from '@/config/site';
import QuoteForm from './QuoteForm';
import s from '../intl.module.css';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { meta } = TEXT[lang].ui;
  return { title: meta.contactTitle, description: meta.contactDesc, alternates: langAlternates(lang, '/contact/') };
}

export default async function LangContact({ params }) {
  const { lang } = await params;
  const { ui, contact } = TEXT[lang];
  return (
    <section className={s.page}>
      <div className="container">
        <h1 className={s.h2}>{contact.title}</h1>
        <p className={s.text} style={{ maxWidth: '60ch' }}>{contact.lead}</p>
        <Suspense><QuoteForm lang={lang} text={contact} /></Suspense>
        <h2 className={s.h2} style={{ marginTop: 40, fontSize: '1.2rem' }}>{contact.direct}</h2>
        <div className={s.actions}>
          <a href={whatsappLink(ui.hello)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">{ui.whatsapp}: <span dir="ltr">{CONTACT.whatsappDisplay}</span></a>
          {CONTACT.emails.map((e) => <a key={e} href={`mailto:${e}`} className="btn btn-outline" dir="ltr">{e}</a>)}
        </div>
      </div>
    </section>
  );
}
