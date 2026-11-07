import { FIELD_LIBRARY } from '@/lib/forms/fields';
import s from './admin.module.css';

/** Heading, intro and question picker — shared by "New form" and "Edit form". */
export default function FormEditor({ action, form, error, submitLabel }) {
  const keys = new Set(form?.fields.map((f) => f.key));
  const req = new Set(form?.fields.filter((f) => f.required).map((f) => f.key));
  const custom = form?.fields.filter((f) => /^q\d+$/.test(f.key)).map((f) => f.label).join('\n') || '';

  return (
    <form action={action} className={s.stack}>
      {form && <input type="hidden" name="id" value={form.id} />}
      <div className={`${s.card} ${s.stack}`}>
        <div>
          <label htmlFor="title" className={s.label}>Heading</label>
          <input id="title" name="title" className={s.input} required maxLength={120} defaultValue={form?.title} placeholder="Gulfood Dubai 2026 — Buyer enquiry" />
        </div>
        <div>
          <label htmlFor="intro" className={s.label}>Message under the heading <span className={s.hint}>(optional)</span></label>
          <textarea id="intro" name="intro" className={s.input} rows={2} maxLength={600} defaultValue={form?.intro} placeholder="Thank you for visiting our stand! Leave your details and we’ll send prices within 24 hours." />
        </div>
      </div>

      <div className={s.card}>
        <span className={s.label}>Questions</span>
        <div className={s.questions}>
          {FIELD_LIBRARY.map((f) => (
            <div key={f.key} className={s.q}>
              <label className={s.qMain}>
                <input type="checkbox" className={s.check} name="field" value={f.key} defaultChecked={form ? keys.has(f.key) : f.default} />
                {f.label}
              </label>
              <label className={s.reqWrap}>
                Required
                <input type="checkbox" className={s.switch} name={`req_${f.key}`} defaultChecked={form ? req.has(f.key) : f.required} role="switch" aria-label={`${f.label} required`} />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={s.card}>
        <label htmlFor="custom" className={s.label}>Your own questions <span className={s.hint}>(optional, one per line)</span></label>
        <textarea id="custom" name="custom" className={s.input} rows={3} defaultValue={custom} placeholder={'Which hall are you visiting from?\nDo you need samples?'} />
      </div>

      {error === 'title' && <p className={s.err}>Please enter a heading.</p>}
      {error === 'fields' && <p className={s.err}>Tick at least one question.</p>}
      <button className={`btn btn-primary btn-lg ${s.submit}`} type="submit">{submitLabel}</button>
    </form>
  );
}
